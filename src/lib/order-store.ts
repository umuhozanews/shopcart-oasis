import { useSyncExternalStore } from 'react';
import type { CartItem } from './cart-store';

export type Order = {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer: {
    name: string;
    email: string;
    mobile: string;
    address: string;
    city: string;
    zip: string;
  };
  items: CartItem[];
  paymentMethod: string;
  subtotal: number;
  tax: number;
  total: number;
};

const KEY = 'shopcart_orders';
const listeners = new Set<() => void>();
let cache: Order[] | null = null;

function read(): Order[] {
  if (cache !== null) return cache;
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Order[]) : [];
    return cache;
  } catch {
    cache = [];
    return cache;
  }
}

function write(orders: Order[]): void {
  cache = orders;
  localStorage.setItem(KEY, JSON.stringify(orders));
  listeners.forEach((l) => l());
}

export const orderStore = {
  getAll: read,
  add(order: Omit<Order, 'id' | 'date' | 'status'>): Order {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'pending',
    };
    write([newOrder, ...read()]);
    return newOrder;
  },
  updateStatus(id: string, status: Order['status']): void {
    write(read().map((o) => (o.id === id ? { ...o, status } : o)));
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useOrders() {
  return useSyncExternalStore(
    orderStore.subscribe,
    () => read(),
    () => [],
  );
}
