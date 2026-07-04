export type ColorOption = { name: string; hex: string; image: string };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  colors?: ColorOption[];
  stock: number;
  breadcrumb: string[];
  category: string;
};

export const products: Product[] = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    tagline: "The most powerful iPhone ever. Titanium design, A18 Pro chip, and a pro camera system with 5x optical zoom.",
    price: 1900000,
    rating: 5,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&q=80",
    stock: 8,
    category: "iphone",
    breadcrumb: ["Electronics", "Smartphones", "iPhone"],
    colors: [
      { name: "Black Titanium", hex: "#3a3a3a", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&q=80" },
      { name: "White Titanium", hex: "#e5e5e5", image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&auto=format&q=80" },
      { name: "Desert Titanium", hex: "#c8a882", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&q=80" },
    ],
  },
  {
    id: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    tagline: "AI-powered flagship with built-in S Pen, 200MP camera and Snapdragon 8 Elite for Galaxy.",
    price: 1650000,
    rating: 4.9,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&q=80",
    stock: 6,
    category: "samsung",
    breadcrumb: ["Electronics", "Smartphones", "Samsung"],
    colors: [
      { name: "Titanium Black", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&q=80" },
      { name: "Titanium Silver", hex: "#c0c0c0", image: "https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?w=800&auto=format&q=80" },
    ],
  },
  {
    id: "iphone-15",
    name: "iPhone 15 128GB",
    tagline: "Dynamic Island, 48MP main camera and USB-C charging in a beautiful colour-infused glass design.",
    price: 1250000,
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&auto=format&q=80",
    stock: 14,
    category: "iphone",
    breadcrumb: ["Electronics", "Smartphones", "iPhone"],
    colors: [
      { name: "Pink", hex: "#f4b3ae", image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&auto=format&q=80" },
      { name: "Yellow", hex: "#f5d86d", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&q=80" },
      { name: "Black", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&q=80" },
    ],
  },
  {
    id: "iphone-14",
    name: "iPhone 14 128GB",
    tagline: "Emergency SOS via satellite, Crash Detection and the powerful A15 Bionic chip. Great value.",
    price: 950000,
    rating: 4.7,
    reviews: 143,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&q=80",
    stock: 18,
    category: "iphone",
    breadcrumb: ["Electronics", "Smartphones", "iPhone"],
  },
  {
    id: "samsung-galaxy-a55",
    name: "Samsung Galaxy A55 5G",
    tagline: "Premium mid-range with 50MP triple camera, 5G, IP67 water resistance and smooth 120Hz display.",
    price: 650000,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?w=800&auto=format&q=80",
    stock: 22,
    category: "samsung",
    breadcrumb: ["Electronics", "Smartphones", "Samsung"],
    colors: [
      { name: "Awesome Navy", hex: "#1a2a4a", image: "https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?w=800&auto=format&q=80" },
      { name: "Awesome Lilac", hex: "#b4a0d0", image: "https://images.unsplash.com/photo-1573920111312-04f1b25c6b85?w=800&auto=format&q=80" },
    ],
  },
  {
    id: "tecno-camon-30-pro",
    name: "Tecno Camon 30 Pro",
    tagline: "50MP RGBW portrait camera, vivid AMOLED display and 5000mAh battery built for Africa.",
    price: 300000,
    rating: 4.4,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1573920111312-04f1b25c6b85?w=800&auto=format&q=80",
    stock: 30,
    category: "budget",
    breadcrumb: ["Electronics", "Smartphones", "Budget"],
  },
  {
    id: "infinix-hot-40-pro",
    name: "Infinix Hot 40 Pro",
    tagline: "6.78\" FHD+ display, 108MP camera and massive 5000mAh battery at an unbeatable price.",
    price: 195000,
    rating: 4.3,
    reviews: 74,
    image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&auto=format&q=80",
    stock: 40,
    category: "budget",
    breadcrumb: ["Electronics", "Smartphones", "Budget"],
  },
  {
    id: "samsung-galaxy-buds3-pro",
    name: "Samsung Galaxy Buds3 Pro",
    tagline: "Intelligent ANC, 360° Audio and up to 30 hours total playback. Premium wireless earbuds.",
    price: 250000,
    rating: 4.7,
    reviews: 48,
    image: "https://images.unsplash.com/photo-1610945264803-c22b62831524?w=800&auto=format&q=80",
    stock: 25,
    category: "accessories",
    breadcrumb: ["Electronics", "Accessories", "Earbuds"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categories = [
  { name: "Smartphones", slug: "smartphones", count: 7 },
  { name: "iPhone", slug: "iphone", count: 3 },
  { name: "Samsung", slug: "samsung", count: 3 },
  { name: "Budget Phones", slug: "budget", count: 2 },
  { name: "Accessories", slug: "accessories", count: 1 },
  { name: "All Products", slug: "all", count: products.length },
];
