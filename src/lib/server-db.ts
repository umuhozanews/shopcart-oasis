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

// In-memory cache for server-side state (acts as fallback if filesystem is read-only)
let globalServerMemoryDb: DbState | null = null;

function getInitialDbState(): DbState {
  return {
    products: staticProducts,
    settings: SETTINGS_DEFAULTS,
    slides: DEFAULT_SLIDES,
    popup: DEFAULT_POPUP,
    orders: [],
  };
}

async function loadDbOnServer(): Promise<DbState> {
  if (globalServerMemoryDb !== null) {
    return globalServerMemoryDb;
  }

  let state = getInitialDbState();
  try {
    const fs = await import('fs');
    const path = await import('path');
    const DB_FILE = path.resolve(process.cwd(), 'db.json');

    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf8');
      const parsed = JSON.parse(content);
      
      // Migrate old categories to new ones so the site won't break
      let products = parsed.products || state.products;
      products = products.map((p: any) => {
        let category = p.category;
        let breadcrumb = p.breadcrumb || [];
        if (category === 'iphone' || category === 'samsung' || category === 'budget' || category === 'smartphones') {
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
    }
  } catch (err) {
    console.error('Error loading db.json, using defaults:', err);
  }

  globalServerMemoryDb = state;
  return state;
}

async function saveDbOnServer(state: DbState) {
  globalServerMemoryDb = state;
  try {
    const fs = await import('fs');
    const path = await import('path');
    const DB_FILE = path.resolve(process.cwd(), 'db.json');
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.warn('Could not write db.json to disk (filesystem might be read-only), keeping in server memory:', err);
  }
}

// Server functions to get and save data
export const getServerDb = createServerFn({ method: 'GET' })
  .handler(async () => {
    return await loadDbOnServer();
  });

export const saveServerDb = createServerFn({ method: 'POST' })
  .inputValidator((data: Partial<DbState>) => data)
  .handler(async ({ data }) => {
    const current = await loadDbOnServer();
    const updated = { ...current, ...data };
    await saveDbOnServer(updated);
    return { success: true };
  });
