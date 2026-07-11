export type ColorOption = { name: string; hex: string; image: string };
export type GalleryImage = { label: string; src: string };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description?: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  colors?: ColorOption[];
  gallery?: GalleryImage[];
  stock: number;
  breadcrumb: string[];
  category: string;
  specs?: Record<string, string>;
};

export const products: Product[] = [];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categories = [
  { name: "Smartphones",   slug: "phones",        emoji: "📱" },
  { name: "Tablets",       slug: "tablets",       emoji: "📟" },
  { name: "Laptops",       slug: "computer",      emoji: "💻" },
  { name: "Smart Watches", slug: "smart-watches", emoji: "⌚" },
  { name: "Accessories",   slug: "accessories",   emoji: "🎧" },
  { name: "Gaming",        slug: "gaming",        emoji: "🎮" },
  { name: "All Products",  slug: "all",           emoji: "🛍️" },
];

export const brands = [
  { name: "Apple",     slug: "apple" },
  { name: "Samsung",   slug: "samsung" },
  { name: "Google",    slug: "google-pixel" },
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
