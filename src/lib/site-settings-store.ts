import { useSyncExternalStore } from 'react';
import {
  SHOP_PHONES,
  SHOP_WHATSAPP,
  WHATSAPP_CHANNEL,
  INSTAGRAM_URL,
  SHOP_ADDRESS,
} from './contact';
import { saveServerDb } from './server-db';

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
  tiktokUrl: string;
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
  tiktokUrl: 'https://vm.tiktok.com/ZS9MMny4QCwP5-DBcAo/',
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
  const merged = { ...SETTINGS_DEFAULTS, ...settings };
  cache = merged;
  localStorage.setItem(KEY, JSON.stringify(merged));
  listeners.forEach((l) => l());
}

export const siteSettingsStore = {
  get: read,
  sync(settings: SiteSettings) {
    write(settings);
  },
  save(patch: Partial<SiteSettings>) {
    const updated = { ...read(), ...patch };
    write(updated);
    saveServerDb({ data: { settings: updated } }).catch((err) =>
      console.error('Failed to sync settings changes to server:', err)
    );
  },
  reset() {
    cache = SETTINGS_DEFAULTS;
    localStorage.removeItem(KEY);
    listeners.forEach((l) => l());
    saveServerDb({ data: { settings: SETTINGS_DEFAULTS } }).catch((err) =>
      console.error('Failed to sync settings reset to server:', err)
    );
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
