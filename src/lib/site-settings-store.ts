import { useSyncExternalStore } from 'react';
import {
  SHOP_PHONES,
  SHOP_WHATSAPP,
  WHATSAPP_CHANNEL,
  INSTAGRAM_URL,
  SHOP_ADDRESS,
} from './contact';

export type SiteSettings = {
  siteName: string;
  siteSubtitle: string;
  siteTagline: string;
  logoData: string; // base64 data-url, or '' to use static asset
  topbarPhone: string;
  topbarPromo: string;
  phones: string[];
  whatsapp: string; // digits only, e.g. "250798464448"
  whatsappChannel: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  address: string;
};

export const SETTINGS_DEFAULTS: SiteSettings = {
  siteName: 'HIPPO',
  siteSubtitle: 'TECHNOLOGY',
  siteTagline:
    'Premium Electronic Devices Store. Your World, Upgraded — genuine electronics and audio gear with free delivery across Rwanda.',
  logoData: '',
  topbarPhone: '0798989741',
  topbarPromo: 'Get 50% Off on Selected Items',
  phones: SHOP_PHONES,
  whatsapp: SHOP_WHATSAPP,
  whatsappChannel: WHATSAPP_CHANNEL,
  instagramUrl: INSTAGRAM_URL,
  instagramHandle: '@hippotechnologyltd',
  email: 'info@hippotech.rw',
  address: SHOP_ADDRESS,
};

const KEY = 'hippo_site_settings_v1';
const listeners = new Set<() => void>();
let cache: SiteSettings | null = null;

function read(): SiteSettings {
  if (cache !== null) return cache;
  if (typeof window === 'undefined') return SETTINGS_DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...SETTINGS_DEFAULTS, ...JSON.parse(raw) } : SETTINGS_DEFAULTS;
    return cache;
  } catch {
    cache = SETTINGS_DEFAULTS;
    return cache;
  }
}

function write(settings: SiteSettings): void {
  cache = settings;
  localStorage.setItem(KEY, JSON.stringify(settings));
  listeners.forEach((l) => l());
}

export const siteSettingsStore = {
  get: read,
  save(patch: Partial<SiteSettings>) {
    write({ ...read(), ...patch });
  },
  reset() {
    cache = SETTINGS_DEFAULTS;
    localStorage.removeItem(KEY);
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useSiteSettings(): SiteSettings {
  return useSyncExternalStore(
    siteSettingsStore.subscribe,
    () => read(),
    () => SETTINGS_DEFAULTS,
  );
}
