import { useSyncExternalStore } from 'react';
import { products as staticProducts, type Product } from './products';
import { saveServerDb } from './server-db';

const KEY = 'shopcart_products_v3';
const listeners = new Set<() => void>();
let cache: Product[] | null = null;

function read(): Product[] {
  if (cache !== null) return cache;
  if (typeof window === 'undefined') return staticProducts;
  try {
    const raw = localStorage.getItem(KEY);
    let products = raw ? (JSON.parse(raw) as Product[]) : staticProducts;
    
    // Migrate old legacy categories to new ones so the site won't break
    let migrated = false;
    products = products.map((p) => {
      let category = p.category;
      let breadcrumb = p.breadcrumb || [];
      if (category === 'iphone' || category === 'samsung' || category === 'budget' || category === 'smartphones') {
        category = 'phones';
        breadcrumb = ['Electronics', 'Phones'];
        migrated = true;
      } else if (category === 'headphones') {
        category = 'accessories';
        breadcrumb = ['Electronics', 'Accessories'];
        migrated = true;
      } else if (!['phones', 'computer', 'accessories', 'tablets', 'smart-watches', 'gaming'].includes(category)) {
        category = 'phones';
        breadcrumb = ['Electronics', 'Phones'];
        migrated = true;
      }
      if (migrated) {
        return { ...p, category, breadcrumb };
      }
      return p;
    });

    if (migrated) {
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
  sync(products: Product[]) {
    write(products);
  },
  add(p: Product) {
    const updated = [...read(), p];
    write(updated);
    saveServerDb({ data: { products: updated } }).catch((err) =>
      console.error('Failed to sync added product to server:', err)
    );
  },
  update(id: string, patch: Partial<Pick<Product, 'name' | 'tagline' | 'price' | 'stock' | 'image' | 'category' | 'breadcrumb'>>) {
    const updated = read().map((p) => (p.id === id ? { ...p, ...patch } : p));
    write(updated);
    saveServerDb({ data: { products: updated } }).catch((err) =>
      console.error('Failed to sync updated product to server:', err)
    );
  },
  delete(id: string) {
    const updated = read().filter((p) => p.id !== id);
    write(updated);
    saveServerDb({ data: { products: updated } }).catch((err) =>
      console.error('Failed to sync deleted product to server:', err)
    );
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
