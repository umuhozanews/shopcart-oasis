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

// In-memory cache — used only in local dev when filesystem is read-only.
// In production (Railway) we always load fresh from disk so all instances stay in sync.
let globalServerMemoryDb: DbState | null = null;
let globalFromPersistence = false;

async function getDbPath() {
  const path = await import('path');
  const dir = process.env.DB_DIR ?? process.cwd();
  return path.join(dir, 'db.json');
}

async function getUploadsDir() {
  const path = await import('path');
  return process.env.UPLOADS_DIR ?? path.join(process.cwd(), 'data', 'uploads');
}

function getInitialDbState(): DbState {
  return {
    products: staticProducts,
    settings: SETTINGS_DEFAULTS,
    slides: DEFAULT_SLIDES,
    popup: DEFAULT_POPUP,
    orders: [],
  };
}

async function loadFromDisk(): Promise<DbState | null> {
  try {
    const fs = await import('fs');
    const DB_FILE = await getDbPath();
    if (!fs.existsSync(DB_FILE)) return null;
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content) as DbState;
  } catch {
    return null;
  }
}

async function saveToDisk(state: DbState): Promise<void> {
  const fs = await import('fs');
  fs.writeFileSync(await getDbPath(), JSON.stringify(state, null, 2), 'utf8');
}

export async function loadDbOnServer(): Promise<DbState> {
  // Always try disk first — ensures every request sees the latest saved data
  // regardless of which server instance handled the last write.
  // In-memory cache is only used as fallback when db.json doesn't exist yet.
  const diskState = await loadFromDisk();

  if (diskState) {
    const defaults = getInitialDbState();
    const state: DbState = {
      products: diskState.products || defaults.products,
      settings: diskState.settings ? { ...SETTINGS_DEFAULTS, ...diskState.settings } : defaults.settings,
      slides: diskState.slides || defaults.slides,
      popup: diskState.popup ? { ...DEFAULT_POPUP, ...diskState.popup } : defaults.popup,
      orders: diskState.orders || defaults.orders,
    };

    // Migrate legacy categories
    state.products = state.products.map((p: Product & { category: string; breadcrumb: string[] }) => {
      let { category, breadcrumb = [] } = p;
      if (['iphone', 'samsung', 'budget', 'smartphones'].includes(category)) {
        category = 'phones'; breadcrumb = ['Electronics', 'Phones'];
      } else if (category === 'headphones') {
        category = 'accessories'; breadcrumb = ['Electronics', 'Accessories'];
      } else if (!['phones', 'computer', 'accessories', 'tablets', 'smart-watches', 'gaming'].includes(category)) {
        category = 'phones'; breadcrumb = ['Electronics', 'Phones'];
      }
      return { ...p, category, breadcrumb };
    });

    globalServerMemoryDb = state;
    globalFromPersistence = true;
    return state;
  }

  // No disk file yet — use in-memory cache (populated by first save) or defaults
  if (globalServerMemoryDb !== null) return globalServerMemoryDb;
  const state = getInitialDbState();
  globalServerMemoryDb = state;
  globalFromPersistence = false;
  return state;
}

async function saveDbOnServer(state: DbState) {
  globalServerMemoryDb = state;
  try {
    await saveToDisk(state);
    globalFromPersistence = true;
  } catch (err) {
    console.warn('[server-db] Could not write db.json (read-only?), keeping in memory:', err);
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

// Upload a product image: saves to disk and returns a URL path.
export const saveImage = createServerFn({ method: 'POST' })
  .inputValidator((data: { base64: string; filename: string }) => data)
  .handler(async ({ data }) => {
    const fs = await import('fs');
    const path = await import('path');

    const uploadsDir = await getUploadsDir();
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const isPng = data.base64.startsWith('data:image/png');
    const ext = isPng ? 'png' : 'jpg';
    const safeName = data.filename
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-z0-9-]/gi, '-')
      .toLowerCase()
      .slice(0, 60);
    const filename = `${Date.now()}-${safeName}.${ext}`;
    const filePath = path.join(uploadsDir, filename);

    const [, base64Data] = data.base64.split(',');
    const buffer = Buffer.from(base64Data ?? data.base64, 'base64');
    fs.writeFileSync(filePath, buffer);

    return { url: `/uploads/${filename}` };
  });
