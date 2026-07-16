import { useSyncExternalStore } from "react";

const STORAGE_KEY = "hippo_wishlist";

function load(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function save(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

let liked = load();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const wishlistStore = {
  toggle(id: string) {
    const next = new Set(liked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    liked = next;
    save(liked);
    emit();
  },
  has(id: string) {
    return liked.has(id);
  },
  get() {
    return liked;
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useWishlist() {
  return useSyncExternalStore(
    wishlistStore.subscribe,
    () => wishlistStore.get(),
    () => new Set<string>()
  );
}
