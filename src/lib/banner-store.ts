import { useSyncExternalStore } from 'react';
import { saveServerDb } from './server-db';
import iphone16Img from '@/assets/phones/iphone-16-pro-max-black.jpg';
import samsungS25Img from '@/assets/phones/samsung-s25-ultra-black.jpg';
import iphone15Img from '@/assets/phones/iphone-15-pink.jpg';
import samsungA55Img from '@/assets/phones/samsung-a55-navy.jpg';
import infinixImg from '@/assets/phones/infinix-hot-40-pro.jpg';

export type HeroSlide = {
  id: string;
  imageData: string; // base64 or URL
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

export type StockPopup = {
  enabled: boolean;
  imageData: string;
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
};

export type BannerData = {
  slides: HeroSlide[];
  popup: StockPopup;
};

export const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 'default-1',
    imageData: iphone16Img,
    badge: 'HOT DEALS',
    title: 'iPhone 16 Pro Max — Special Price This Week!',
    subtitle: 'Titanium design, A18 Pro chip, 5x optical zoom. Grab yours before stock runs out.',
    buttonText: 'Shop Now',
    buttonLink: '/category/phones',
  },
  {
    id: 'default-2',
    imageData: samsungS25Img,
    badge: 'HOT STOCK',
    title: 'Samsung Galaxy S25 Ultra — Limited Units!',
    subtitle: 'AI-powered flagship with built-in S Pen and 200MP camera. Only a few left.',
    buttonText: 'Buy Now',
    buttonLink: '/category/phones',
  },
  {
    id: 'default-3',
    imageData: iphone15Img,
    badge: 'NEW PRICES',
    title: 'iPhone 15 — New Lower Price, Same Great Power',
    subtitle: 'Dynamic Island, 48MP camera & USB-C. Now more affordable than ever.',
    buttonText: 'See Price',
    buttonLink: '/category/phones',
  },
  {
    id: 'default-4',
    imageData: samsungA55Img,
    badge: 'BEST VALUE',
    title: 'Samsung Galaxy A55 5G — Premium Mid-Range',
    subtitle: '50MP triple camera, 5G, IP67 water resistance & 120Hz display at an unbeatable price.',
    buttonText: 'Shop Now',
    buttonLink: '/category/phones',
  },
  {
    id: 'default-5',
    imageData: infinixImg,
    badge: 'NEW ARRIVALS',
    title: 'Tecno & Infinix — Latest Models Now In Stock',
    subtitle: 'Flagship features at budget prices. 108MP cameras, massive batteries, fast charging.',
    buttonText: 'Explore',
    buttonLink: '/category/phones',
  },
];

export const DEFAULT_POPUP: StockPopup = {
  enabled: false,
  imageData: '',
  title: 'New Stock Just Arrived!',
  message: 'Fresh iPhones, Samsung & accessories now in store. Limited units — grab yours before it sells out.',
  buttonText: 'Shop New Arrivals',
  buttonLink: '/category/all',
};

const DEFAULTS: BannerData = {
  slides: DEFAULT_SLIDES,
  popup: DEFAULT_POPUP,
};

const KEY = 'hippo_banners_v2';
const listeners = new Set<() => void>();
let cache: BannerData | null = null;

function read(): BannerData {
  if (cache !== null) return cache;
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
    return cache!;
  } catch {
    cache = DEFAULTS;
    return cache;
  }
}

function write(data: BannerData): void {
  cache = data;
  localStorage.setItem(KEY, JSON.stringify(data));
  listeners.forEach((l) => l());
}

export const bannerStore = {
  get: read,
  sync(slides: HeroSlide[], popup: StockPopup) {
    write({ slides, popup });
  },
  save(patch: Partial<BannerData>) {
    const updated = { ...read(), ...patch };
    write(updated);
    saveServerDb({ data: { slides: updated.slides, popup: updated.popup } }).catch((err) =>
      console.error('Failed to sync banners changes to server:', err)
    );
  },
  saveSlides(slides: HeroSlide[]) {
    const updated = { ...read(), slides };
    write(updated);
    saveServerDb({ data: { slides } }).catch((err) =>
      console.error('Failed to sync slides changes to server:', err)
    );
  },
  savePopup(popup: StockPopup) {
    const updated = { ...read(), popup };
    write(updated);
    saveServerDb({ data: { popup } }).catch((err) =>
      console.error('Failed to sync popup changes to server:', err)
    );
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useBanners(): BannerData {
  return useSyncExternalStore(
    bannerStore.subscribe,
    () => read(),
    () => DEFAULTS,
  );
}
