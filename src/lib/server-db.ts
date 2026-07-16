import { createServerFn } from '@tanstack/react-start';
import { products as staticProducts, type Product } from './products';
import { SETTINGS_DEFAULTS, type SiteSettings } from './site-settings-store';
import { DEFAULT_SLIDES, DEFAULT_POPUP, type HeroSlide, type StockPopup } from './banner-store';
import type { Order } from './order-store';

export type DbState = {
  products: Product[];
  settings: SiteSettings;
  slides: HeroSlide[];
  popup: StockPopup;
  orders: Order[];
};

// In-memory cache — fast for repeated reads within same function instance
let globalServerMemoryDb: DbState | null = null;
// True only when the cache was populated from blob/disk (not just defaults)
let globalFromPersistence = false;

const BLOB_PATH = 'hippo-tech-db.json';

function getInitialDbState(): DbState {
  return {
    products: staticProducts,
    settings: SETTINGS_DEFAULTS,
    slides: DEFAULT_SLIDES,
    popup: DEFAULT_POPUP,
    orders: [],
  };
}

function hasBlobToken(): boolean {
  return !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

async function loadFromBlob(): Promise<DbState | null> {
  try {
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: BLOB_PATH });
    if (blobs.length === 0) return null;
    const res = await fetch(blobs[0].url);
    if (!res.ok) return null;
    return (await res.json()) as DbState;
  } catch (err) {
    console.warn('Could not load from Vercel Blob:', err);
    return null;
  }
}

async function saveToBlob(state: DbState): Promise<void> {
  const { put, list: blobList, del } = await import('@vercel/blob');
  console.log('[blob] saveToBlob: BLOB_STORE_ID=', process.env.BLOB_STORE_ID ? 'set' : 'missing', 'BLOB_READ_WRITE_TOKEN=', process.env.BLOB_READ_WRITE_TOKEN ? 'set' : 'missing', 'VERCEL_OIDC_TOKEN=', process.env.VERCEL_OIDC_TOKEN ? 'set' : 'missing');
  const { blobs } = await blobList({ prefix: BLOB_PATH });
  console.log('[blob] list returned', blobs.length, 'blobs');
  if (blobs.length > 0) {
    await del(blobs.map((b) => b.url));
  }
  const result = await put(BLOB_PATH, JSON.stringify(state), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  });
  console.log('[blob] put succeeded, url=', result.url);
}

export async function loadDbOnServer(): Promise<DbState> {
  if (globalServerMemoryDb !== null) return globalServerMemoryDb;

  let state = getInitialDbState();
  let fromPersistence = false;

  if (hasBlobToken()) {
    // Production / Vercel: load from Blob storage
    const blobState = await loadFromBlob();
    if (blobState) {
      state = {
        products: blobState.products || state.products,
        settings: blobState.settings ? { ...SETTINGS_DEFAULTS, ...blobState.settings } : state.settings,
        slides: blobState.slides || state.slides,
        popup: blobState.popup ? { ...DEFAULT_POPUP, ...blobState.popup } : state.popup,
        orders: blobState.orders || state.orders,
      };
      fromPersistence = true;
    }
  } else {
    // Local dev: load from db.json on disk
    try {
      const fs = await import('fs');
      const path = await import('path');
      const DB_FILE = path.resolve(process.cwd(), 'db.json');

      if (fs.existsSync(DB_FILE)) {
        const content = fs.readFileSync(DB_FILE, 'utf8');
        const parsed = JSON.parse(content);

        let products = parsed.products || state.products;
        products = products.map((p: Product & { category: string; breadcrumb: string[] }) => {
          let category = p.category;
          let breadcrumb = p.breadcrumb || [];
          if (['iphone', 'samsung', 'budget', 'smartphones'].includes(category)) {
            category = 'phones';
            breadcrumb = ['Electronics', 'Phones'];
          } else if (category === 'headphones') {
            category = 'accessories';
            breadcrumb = ['Electronics', 'Accessories'];
          } else if (!['phones', 'computer', 'accessories', 'tablets', 'smart-watches', 'gaming'].includes(category)) {
            category = 'phones';
            breadcrumb = ['Electronics', 'Phones'];
          }
          return { ...p, category, breadcrumb };
        });

        state = {
          products,
          settings: parsed.settings ? { ...SETTINGS_DEFAULTS, ...parsed.settings } : state.settings,
          slides: parsed.slides || state.slides,
          popup: parsed.popup ? { ...DEFAULT_POPUP, ...parsed.popup } : state.popup,
          orders: parsed.orders || state.orders,
        };
        fromPersistence = true;
      }
    } catch (err) {
      console.error('Error loading db.json, using defaults:', err);
    }
  }

  globalServerMemoryDb = state;
  globalFromPersistence = fromPersistence;
  return state;
}

async function saveDbOnServer(state: DbState) {
  globalServerMemoryDb = state;

  if (hasBlobToken()) {
    // Production / Vercel: persist to Blob storage so all instances and cold starts see it
    try {
      await saveToBlob(state);
      globalFromPersistence = true;
    } catch (err) {
      console.error('[blob] WRITE FAILED:', err instanceof Error ? err.message : String(err));
    }
  } else {
    // Local dev: persist to db.json on disk
    try {
      const fs = await import('fs');
      const path = await import('path');
      const DB_FILE = path.resolve(process.cwd(), 'db.json');
      fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf8');
      globalFromPersistence = true;
    } catch (err) {
      console.warn('Could not write db.json to disk (filesystem might be read-only), keeping in server memory:', err);
    }
  }
}

export const getServerDb = createServerFn({ method: 'GET' }).handler(async () => {
  const state = await loadDbOnServer();
  return { ...state, _fromPersistence: globalFromPersistence };
});

export const saveServerDb = createServerFn({ method: 'POST' })
  .inputValidator((data: Partial<DbState>) => data)
  .handler(async ({ data }) => {
    const current = await loadDbOnServer();
    const updated = { ...current, ...data };
    await saveDbOnServer(updated);
    return { success: true };
  });
