import { ktCategories, ktProducts } from './kt-catalog.ts';
import { curatedCategories, curatedProducts } from './curated-catalog.ts';
import { hippotechProducts } from './hippotech-catalog.ts';
import { appleMacProducts } from './apple-mac-catalog.ts';
import { hotDealProducts } from './hot-deals-catalog.ts';

export type ColorOption = { name: string; hex: string; image: string };
export type GalleryImage = { label: string; src: string };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: GalleryImage[];
  colors?: ColorOption[];
  rating?: number;
  reviewsCount?: number;
  badge?: string;
  stock: number;
  breadcrumb: string[];
  category: string;
  condition?: 'new' | 'dubai' | 'used';
  modelKey?: string;
  specs?: Record<string, string>;
};

// Merge catalogs with priority given to ktProducts (our primary clean, unbranded catalog with transparent Dubai & Brand New formulas).
const productIds = new Set<string>();
const productNames = new Set<string>();
const allCatalogProducts: Product[] = [];

for (const p of [...ktProducts, ...curatedProducts, ...hotDealProducts, ...hippotechProducts, ...appleMacProducts]) {
  const normalizedName = p.name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (productIds.has(p.id) || productNames.has(normalizedName)) continue;
  productIds.add(p.id);
  productNames.add(normalizedName);
  allCatalogProducts.push(p);
}

export const products: Product[] = allCatalogProducts.map((product) => ({
  ...product,
  breadcrumb: [...product.breadcrumb],
}));

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categories = (() => {
  const raw = [...ktCategories.slice(0, -1), ...curatedCategories, ktCategories[ktCategories.length - 1]];
  const seen = new Set<string>();
  return raw.filter((c) => {
    if (seen.has(c.slug)) return false;
    seen.add(c.slug);
    return true;
  });
})();

export const brands = [
  { name: "Apple",     slug: "apple" },
  { name: "Samsung",   slug: "samsung" },
  { name: "Google",    slug: "google-pixel" },
  { name: "JBL",       slug: "jbl" },
  { name: "Anker",     slug: "anker" },
  { name: "Bose",      slug: "bose" },
  { name: "Marshall",  slug: "marshall" },
  { name: "Xiaomi",    slug: "xiaomi" },
  { name: "Huawei",    slug: "huawei" },
  { name: "Tecno",     slug: "tecno" },
  { name: "Infinix",   slug: "infinix" },
  { name: "Sony",      slug: "sony" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Nintendo",  slug: "nintendo" },
  { name: "Dell",      slug: "dell" },
  { name: "HP",        slug: "hp" },
  { name: "Lenovo",    slug: "lenovo" },
  { name: "ASUS",      slug: "asus" },
];
