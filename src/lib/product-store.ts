import { useSyncExternalStore } from 'react';
import { products as staticProducts, type Product } from './products';
import { saveServerDb } from './server-db';
import { getAdminSessionToken } from './admin-auth';

const KEY = 'shopcart_products_v6';
const CATALOG_IMPORT_KEY = 'shopcart_clean_catalog_imported_v6';
const APPLE_MAC_IMPORT_KEY = 'shopcart_apple_mac_catalog_imported_v3';
const listeners = new Set<() => void>();
let cache: Product[] | null = null;

function uniqueProducts(products: Product[]): Product[] {
  const ids = new Set<string>();
  const names = new Set<string>();
  return products.filter((product) => {
    const name = product.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (ids.has(product.id) || !name || names.has(name)) return false;
    ids.add(product.id);
    names.add(name);
    return true;
  });
}

function mergeImportedCatalog(products: Product[]): Product[] {
  if (typeof window === 'undefined') return products;

  let merged = products;
  if (localStorage.getItem(CATALOG_IMPORT_KEY) !== '1') {
    merged = uniqueProducts([...staticProducts, ...merged]);
    localStorage.setItem(CATALOG_IMPORT_KEY, '1');
  }
  if (localStorage.getItem(APPLE_MAC_IMPORT_KEY) !== '1') {
    const appleMacProducts = staticProducts.filter((product) => product.id.startsWith('apple-'));
    merged = uniqueProducts([...merged, ...appleMacProducts]);
    localStorage.setItem(APPLE_MAC_IMPORT_KEY, '1');
  }
  if (merged.length !== products.length) localStorage.setItem(KEY, JSON.stringify(merged));
  return merged;
}

function read(): Product[] {
  if (cache !== null) return cache;
  if (typeof window === 'undefined') return staticProducts;
  try {
    const raw = localStorage.getItem(KEY);
    let products = uniqueProducts(mergeImportedCatalog(raw ? (JSON.parse(raw) as Product[]) : staticProducts));
    
    // Migrate old legacy categories and heal broken image URLs
    let migrated = false;
    products = products.map((p) => {
      let { category, breadcrumb = [], image } = p;
      const staticMatch = staticProducts.find((s) => s.id === p.id);

      // If image is missing or was pointing to suspended /api/img proxy, heal with static asset
      if ((!image || image.startsWith('/api/img')) && staticMatch?.image) {
        image = staticMatch.image;
        migrated = true;
      }

      if (category === 'iphone' || category === 'samsung' || category === 'budget' || category === 'smartphones') {
        category = 'phones';
        breadcrumb = ['Electronics', 'Phones'];
        migrated = true;
      } else if (category === 'headphones') {
        category = 'accessories';
        breadcrumb = ['Electronics', 'Accessories'];
        migrated = true;
      } else if (![
        'phones',
        'computer',
        'accessories',
        'tablets',
        'smart-watches',
        'gaming',
        'speakers',
        'ring-light',
        'gimbal',
        'airpods-pro-2gen',
        'headset',
        'chargers',
      ].includes(category)) {
        category = 'phones';
        breadcrumb = ['Electronics', 'Phones'];
        migrated = true;
      }
      if (migrated) {
        return { ...p, category, breadcrumb, image };
      }
      return p;
    });

    if (migrated) {
      localStorage.setItem(KEY, JSON.stringify(products));
    }

    if (raw && products.length !== (JSON.parse(raw) as Product[]).length) {
      localStorage.setItem(KEY, JSON.stringify(products));
    }

    cache = products;
    return cache;
  } catch {
    cache = staticProducts;
    return cache;
  }
}

function write(products: Product[]): void {
  cache = products;
  localStorage.setItem(KEY, JSON.stringify(products));
  listeners.forEach((l) => l());
}

export const productStore = {
  getAll: read,
  getById: (id: string) => read().find((p) => p.id === id),
  sync(products: Product[], removedProductIds: string[] = []) {
    localStorage.setItem(CATALOG_IMPORT_KEY, '1');
    localStorage.setItem(APPLE_MAC_IMPORT_KEY, '1');
    const removed = new Set(removedProductIds);
    write(uniqueProducts(products.filter((product) => !removed.has(product.id))));
  },
  async add(p: Product) {
    const previous = read();
    const updated = [...previous, p];
    write(updated);
    try {
      await saveServerDb({ data: { products: updated, adminToken: getAdminSessionToken() ?? undefined } });
    } catch (err) {
      write(previous);
      throw err;
    }
  },
  async update(id: string, patch: Partial<Pick<Product, 'name' | 'tagline' | 'price' | 'stock' | 'image' | 'gallery' | 'category' | 'breadcrumb' | 'condition'>>) {
    const previous = read();
    const updated = previous.map((p) => (p.id === id ? { ...p, ...patch } : p));
    write(updated);
    try {
      await saveServerDb({ data: { products: updated, adminToken: getAdminSessionToken() ?? undefined } });
    } catch (err) {
      write(previous);
      throw err;
    }
  },
  async delete(id: string) {
    const previous = read();
    const updated = previous.filter((p) => p.id !== id);
    write(updated);
    try {
      await saveServerDb({ data: { products: updated, adminToken: getAdminSessionToken() ?? undefined } });
    } catch (err) {
      write(previous);
      throw err;
    }
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useProducts() {
  return useSyncExternalStore(
    productStore.subscribe,
    () => read(),
    () => staticProducts,
  );
}

export function useProduct(id: string) {
  const all = useProducts();
  return all.find((p) => p.id === id);
}
