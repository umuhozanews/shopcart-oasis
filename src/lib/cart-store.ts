import { useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  qty: number;
};

const STORAGE_KEY = "hippo_cart";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

let items: CartItem[] = load();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const cartStore = {
  add(item: Omit<CartItem, "qty">, qty = 1) {
    const key = item.id + (item.color ?? "");
    const existing = items.find((i) => i.id + (i.color ?? "") === key);
    if (existing) existing.qty += qty;
    else items = [...items, { ...item, qty }];
    save(items);
    emit();
  },
  remove(id: string, color?: string) {
    const key = id + (color ?? "");
    items = items.filter((i) => i.id + (i.color ?? "") !== key);
    save(items);
    emit();
  },
  setQty(id: string, color: string | undefined, qty: number) {
    const key = id + (color ?? "");
    items = items.map((i) =>
      i.id + (i.color ?? "") === key ? { ...i, qty: Math.max(1, qty) } : i
    );
    save(items);
    emit();
  },
  clear() {
    items = [];
    save(items);
    emit();
  },
  get() {
    return items;
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useCart() {
  return useSyncExternalStore(
    cartStore.subscribe,
    () => items,
    () => items
  );
}
