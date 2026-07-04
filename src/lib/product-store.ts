import { useSyncExternalStore } from 'react';
import { products as staticProducts, type Product } from './products';

const KEY = 'shopcart_products';
const listeners = new Set<() => void>();
let cache: Product[] | null = null;

function read(): Product[] {
  if (cache !== null) return cache;
  if (typeof window === 'undefined') return staticProducts;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Product[]) : staticProducts;
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
  add(p: Product) {
    write([...read(), p]);
  },
  update(id: string, patch: Partial<Pick<Product, 'name' | 'tagline' | 'price' | 'stock' | 'image'>>) {
    write(read().map((p) => (p.id === id ? { ...p, ...patch } : p)));
  },
  delete(id: string) {
    write(read().filter((p) => p.id !== id));
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
