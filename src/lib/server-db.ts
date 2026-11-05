import { createServerFn } from '@tanstack/react-start';
import { products as staticProducts, type Product } from './products';
import { SETTINGS_DEFAULTS, type SiteSettings } from './site-settings-store';
import { DEFAULT_SLIDES, DEFAULT_POPUP, type HeroSlide, type StockPopup } from './banner-store';
import type { Order } from './order-store';
import { verifyAdminSession } from './admin-session';

export type DbState = {
  products: Product[];
  settings: SiteSettings;
  slides: HeroSlide[];
  popup: StockPopup;
  orders: Order[];
  removedProductIds?: string[];
};

// In-memory cache for local dev (no blob token). Production always reads fresh
// from blob so multiple Vercel instances never serve stale data to each other.
let globalServerMemoryDb: DbState | null = null;
let globalFromPersistence = false;

const BLOB_PATH = 'hippo-tech-db.json';

function getInitialDbState(): DbState {
  return {
    products: staticProducts,
    removedProductIds: [],
    settings: SETTINGS_DEFAULTS,
    slides: DEFAULT_SLIDES,
    popup: DEFAULT_POPUP,
    orders: [],
  };
}

function mergeCatalogProducts(savedProducts: Product[], removedProductIds: string[] = []): Product[] {
  const removed = new Set(removedProductIds);
  const ids = new Set<string>();
  const names = new Set<string>();
  const merged: Product[] = [];
  for (const product of [...staticProducts, ...savedProducts]) {
    if (removed.has(product.id)) continue;
    const name = product.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (ids.has(product.id) || names.has(name)) continue;
    ids.add(product.id);
    names.add(name);
    merged.push(product);
  }
  return merged;
}

function hasBlobToken(): boolean {
  return !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

async function loadFromBlob(): Promise<DbState | null> {
  try {
    const { list, get } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: BLOB_PATH });
    if (blobs.length === 0) return null;

    // Use the SDK's get() so OIDC / token auth is handled automatically,
    // rather than a raw fetch() which fails when BLOB_READ_WRITE_TOKEN is absent.
    const result = await get(blobs[0].url, { access: 'private' });
    if (!result || result.statusCode !== 200 || !result.stream) {
      console.warn('[server-db] blob get failed, status:', result?.statusCode);
      return null;
    }

    const chunks: Buffer[] = [];
    for await (const chunk of result.stream as AsyncIterable<Uint8Array>) {
      chunks.push(Buffer.from(chunk));
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as DbState;
  } catch (err) {
    console.error('[server-db] Could not load from Vercel Blob:', err);
    return null;
  }
}

async function saveToBlob(state: DbState): Promise<void> {
  const { put } = await import('@vercel/blob');
  await put(BLOB_PATH, JSON.stringify(state), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
  });
}

export async function loadDbOnServer(): Promise<DbState> {
  if (hasBlobToken()) {
    // Production: always load fresh from blob so every Vercel function instance
    // sees the latest data regardless of which instance last wrote.
    const blobState = await loadFromBlob();
    if (blobState) {
      const state: DbState = {
        products: mergeCatalogProducts(blobState.products || staticProducts, blobState.removedProductIds || []),
        removedProductIds: blobState.removedProductIds || [],
        settings: blobState.settings ? { ...SETTINGS_DEFAULTS, ...blobState.settings } : SETTINGS_DEFAULTS,
        slides: blobState.slides || DEFAULT_SLIDES,
        popup: blobState.popup ? { ...DEFAULT_POPUP, ...blobState.popup } : DEFAULT_POPUP,
        orders: blobState.orders || [],
      };

      // Migrate legacy categories
      state.products = state.products.map((p: Product & { category: string; breadcrumb: string[] }) => {
        let { category, breadcrumb = [] } = p;
        if (['iphone', 'samsung', 'budget', 'smartphones'].includes(category)) {
          category = 'phones'; breadcrumb = ['Electronics', 'Phones'];
        } else if (category === 'headphones') {
          category = 'accessories'; breadcrumb = ['Electronics', 'Accessories'];
        } else if (!['phones', 'computer', 'accessories', 'tablets', 'smart-watches', 'gaming', 'speakers', 'ring-light', 'gimbal', 'airpods-pro-2gen', 'headset'].includes(category)) {
          category = 'phones'; breadcrumb = ['Electronics', 'Phones'];
        }
        return { ...p, category, breadcrumb };
      });

      globalServerMemoryDb = state;
      globalFromPersistence = true;
      return state;
    }

    // Blob exists but empty — use defaults
    globalServerMemoryDb = getInitialDbState();
    globalFromPersistence = false;
    return globalServerMemoryDb;
  }

  // Local dev: use in-memory cache (filesystem may be read-only)
  if (globalServerMemoryDb !== null) return globalServerMemoryDb;

  let state = getInitialDbState();
  let fromPersistence = false;

  try {
    const fs = await import('fs');
    const path = await import('path');
    const DB_FILE = path.resolve(process.cwd(), 'db.json');

    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      const parsed = JSON.parse(content);

      let products = parsed.products || state.products;
      products = products.map((p: Product & { category: string; breadcrumb: string[] }) => {
        let { category, breadcrumb = [] } = p;
        if (['iphone', 'samsung', 'budget', 'smartphones'].includes(category)) {
          category = 'phones'; breadcrumb = ['Electronics', 'Phones'];
        } else if (category === 'headphones') {
          category = 'accessories'; breadcrumb = ['Electronics', 'Accessories'];
        } else if (!['phones', 'computer', 'accessories', 'tablets', 'smart-watches', 'gaming', 'speakers', 'ring-light', 'gimbal', 'airpods-pro-2gen', 'headset'].includes(category)) {
          category = 'phones'; breadcrumb = ['Electronics', 'Phones'];
        }
        return { ...p, category, breadcrumb };
      });

      state = {
        products: mergeCatalogProducts(products, parsed.removedProductIds || []),
        removedProductIds: parsed.removedProductIds || [],
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

  globalServerMemoryDb = state;
  globalFromPersistence = fromPersistence;
  return state;
}

async function saveDbOnServer(state: DbState) {
  globalServerMemoryDb = state;

  if (hasBlobToken()) {
    try {
      await saveToBlob(state);
      globalFromPersistence = true;
    } catch (err) {
      console.error('Could not write to Vercel Blob:', err instanceof Error ? err.message : String(err));
      globalServerMemoryDb = null;
      throw new Error('Could not save the store data. Check the Vercel Blob connection and try again.');
    }
  } else {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const DB_FILE = path.resolve(process.cwd(), 'db.json');
      fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf8');
      globalFromPersistence = true;
    } catch (err) {
      console.warn('Could not write db.json (filesystem read-only?), keeping in memory:', err);
      throw new Error('Could not save the store data. Try again.');
    }
  }
}

export const getServerDb = createServerFn({ method: 'GET' }).handler(async () => {
  const state = await loadDbOnServer();
  return { ...state, _fromPersistence: globalFromPersistence };
});

export const saveServerDb = createServerFn({ method: 'POST' })
  .inputValidator((data: Partial<DbState> & { adminToken?: string }) => data)
  .handler(async ({ data }) => {
    const isAdminMutation = data.products !== undefined || data.settings !== undefined || data.slides !== undefined || data.popup !== undefined;
    if (isAdminMutation && !(await verifyAdminSession(data.adminToken))) {
      throw new Error('Your admin session has expired. Sign in again to save changes.');
    }
    const current = await loadDbOnServer();
    const { adminToken: _adminToken, removedProductIds: _removedProductIds, ...changes } = data;
    const removedProductIds = new Set(current.removedProductIds || []);
    if (data.products) {
      const currentIds = new Set(data.products.map((product) => product.id));
      for (const product of staticProducts) {
        if (currentIds.has(product.id)) removedProductIds.delete(product.id);
        else removedProductIds.add(product.id);
      }
    }
    const updated: DbState = {
      ...current,
      ...changes,
      removedProductIds: [...removedProductIds],
    };
    if (data.products) updated.products = mergeCatalogProducts(data.products, updated.removedProductIds);
    await saveDbOnServer(updated);
    return { success: true };
  });

// Upload a product image to Vercel Blob (public) and return its URL.
// Falls back to returning the base64 data URL in local dev (no blob token).
export const saveImageToBlob = createServerFn({ method: 'POST' })
  .inputValidator((data: { base64: string; filename: string; adminToken?: string }) => data)
  .handler(async ({ data }) => {
    if (!(await verifyAdminSession(data.adminToken))) {
      throw new Error('Your admin session has expired. Sign in again to upload images.');
    }
    if (!hasBlobToken()) {
      return { url: data.base64 };
    }
    try {
      const { put } = await import('@vercel/blob');
      // Decode base64 data URL → Blob (Web API, available in Edge/Node/Cloudflare).
      // Never use Buffer (Node-only) or fetch(dataUrl) (not supported in Edge).
      const [header, base64Data] = data.base64.split(',');
      const mime = header?.match(/:(.*?);/)?.[1] ?? 'image/jpeg';
      const binary = atob(base64Data ?? data.base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob = new Blob([bytes], { type: mime });
      // The blob store is private-only — use access:'private' and serve
      // images through /api/img proxy which handles SDK auth transparently.
      const result = await put(`product-images/${data.filename}`, blob, {
        access: 'private',
        contentType: mime,
        addRandomSuffix: true,
      });
      return { url: `/api/img?url=${encodeURIComponent(result.url)}` };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[server-db] Image blob upload failed:', msg);
      throw new Error(`Image upload failed: ${msg}`);
    }
  });
