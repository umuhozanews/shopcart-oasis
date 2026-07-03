import { useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
  qty: number;
};

let items: CartItem[] = [];
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
    emit();
  },
  remove(id: string, color?: string) {
    const key = id + (color ?? "");
    items = items.filter((i) => i.id + (i.color ?? "") !== key);
    emit();
  },
  setQty(id: string, color: string | undefined, qty: number) {
    const key = id + (color ?? "");
    items = items.map((i) =>
      i.id + (i.color ?? "") === key ? { ...i, qty: Math.max(1, qty) } : i
    );
    emit();
  },
  clear() {
    items = [];
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
