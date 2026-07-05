import { useSyncExternalStore } from 'react';

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
    imageData: '',
    badge: 'Free Delivery Across Rwanda',
    title: 'Top Phones & Gadgets Delivered Across Rwanda',
    subtitle: 'Genuine products, best prices, 30-day returns.',
    buttonText: 'Shop Now',
    buttonLink: '/category/all',
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

const KEY = 'hippo_banners_v1';
const listeners = new Set<() => void>();
let cache: BannerData | null = null;

function read(): BannerData {
  if (cache !== null) return cache;
  if (typeof window === 'undefined') return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
    return cache;
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
  save(patch: Partial<BannerData>) {
    write({ ...read(), ...patch });
  },
  saveSlides(slides: HeroSlide[]) {
    write({ ...read(), slides });
  },
  savePopup(popup: StockPopup) {
    write({ ...read(), popup });
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
