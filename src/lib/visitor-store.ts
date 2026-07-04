import { useSyncExternalStore } from 'react';

const KEY = 'shopcart_visits';
const listeners = new Set<() => void>();
let cache: Visit[] | null = null;

export type Visit = { path: string; ts: number };

function read(): Visit[] {
  if (cache !== null) return cache;
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as Visit[]) : [];
    return cache;
  } catch {
    cache = [];
    return cache;
  }
}

export const visitorStore = {
  record(path: string) {
    if (typeof window === 'undefined') return;
    const visits = read();
    const trimmed = [...visits, { path, ts: Date.now() }].slice(-500);
    cache = trimmed;
    localStorage.setItem(KEY, JSON.stringify(trimmed));
    listeners.forEach((l) => l());
  },
  getAll: read,
  todayCount() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return read().filter((v) => v.ts >= start.getTime()).length;
  },
  weekCount() {
    const start = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return read().filter((v) => v.ts >= start).length;
  },
  topPages() {
    const counts: Record<string, number> = {};
    read().forEach((v) => { counts[v.path] = (counts[v.path] ?? 0) + 1; });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([path, count]) => ({ path, count }));
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useVisits() {
  return useSyncExternalStore(
    visitorStore.subscribe,
    () => read(),
    () => [],
  );
}
