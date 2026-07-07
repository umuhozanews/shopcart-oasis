import { useSyncExternalStore } from 'react';
import type { CartItem } from './cart-store';
import { saveServerDb } from './server-db';

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
  sync(orders: Order[]) {
    write(orders);
  },
  add(order: Omit<Order, 'id' | 'date' | 'status'>): Order {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [newOrder, ...read()];
    write(updated);
    saveServerDb({ orders: updated }).catch((err) =>
      console.error('Failed to sync added order to server:', err)
    );
    return newOrder;
  },
  updateStatus(id: string, status: Order['status']): void {
    const updated = read().map((o) => (o.id === id ? { ...o, status } : o));
    write(updated);
    saveServerDb({ orders: updated }).catch((err) =>
      console.error('Failed to sync updated order to server:', err)
    );
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
