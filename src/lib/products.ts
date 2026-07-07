import iphone16BlackImg from "@/assets/phones/iphone-16-pro-max-black.jpg";
import iphone16WhiteImg from "@/assets/phones/iphone-16-pro-max-white.jpg";
import iphone16DesertImg from "@/assets/phones/iphone-16-pro-max-desert.jpg";
import samsungS25BlackImg from "@/assets/phones/samsung-s25-ultra-black.jpg";
import samsungS25SilverImg from "@/assets/phones/samsung-s25-ultra-silver.jpg";
import iphone15PinkImg from "@/assets/phones/iphone-15-pink.jpg";
import iphone15YellowImg from "@/assets/phones/iphone-15-yellow.jpg";
import iphone15BlackImg from "@/assets/phones/iphone-15-black.jpg";
import iphone14Img from "@/assets/phones/iphone-14.jpg";
import samsungA55NavyImg from "@/assets/phones/samsung-a55-navy.jpg";
import samsungA55LilacImg from "@/assets/phones/samsung-a55-lilac.jpg";
import tecnoCamon30ProImg from "@/assets/phones/tecno-camon-30-pro.jpg";
import infinixHot40ProImg from "@/assets/phones/infinix-hot-40-pro.jpg";
import galaxyBuds3ProImg from "@/assets/phones/galaxy-buds3-pro.jpg";
import computerImg from "@/assets/computer.jpg";

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
    image: iphone16BlackImg,
    stock: 8,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Black Titanium", hex: "#3a3a3a", image: iphone16BlackImg },
      { name: "White Titanium", hex: "#e5e5e5", image: iphone16WhiteImg },
      { name: "Desert Titanium", hex: "#c8a882", image: iphone16DesertImg },
    ],
  },
  {
    id: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    tagline: "AI-powered flagship with built-in S Pen, 200MP camera and Snapdragon 8 Elite for Galaxy.",
    price: 1650000,
    rating: 4.9,
    reviews: 64,
    image: samsungS25BlackImg,
    stock: 6,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Titanium Black", hex: "#1a1a1a", image: samsungS25BlackImg },
      { name: "Titanium Silver", hex: "#c0c0c0", image: samsungS25SilverImg },
    ],
  },
  {
    id: "iphone-15",
    name: "iPhone 15 128GB",
    tagline: "Dynamic Island, 48MP main camera and USB-C charging in a beautiful colour-infused glass design.",
    price: 1250000,
    rating: 4.8,
    reviews: 112,
    image: iphone15PinkImg,
    stock: 14,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Pink", hex: "#f4b3ae", image: iphone15PinkImg },
      { name: "Yellow", hex: "#f5d86d", image: iphone15YellowImg },
      { name: "Black", hex: "#1a1a1a", image: iphone15BlackImg },
    ],
  },
  {
    id: "iphone-14",
    name: "iPhone 14 128GB",
    tagline: "Emergency SOS via satellite, Crash Detection and the powerful A15 Bionic chip. Great value.",
    price: 950000,
    rating: 4.7,
    reviews: 143,
    image: iphone14Img,
    stock: 18,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
  },
  {
    id: "samsung-galaxy-a55",
    name: "Samsung Galaxy A55 5G",
    tagline: "Premium mid-range with 50MP triple camera, 5G, IP67 water resistance and smooth 120Hz display.",
    price: 650000,
    rating: 4.6,
    reviews: 89,
    image: samsungA55NavyImg,
    stock: 22,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Awesome Navy", hex: "#1a2a4a", image: samsungA55NavyImg },
      { name: "Awesome Lilac", hex: "#b4a0d0", image: samsungA55LilacImg },
    ],
  },
  {
    id: "tecno-camon-30-pro",
    name: "Tecno Camon 30 Pro",
    tagline: "50MP RGBW portrait camera, vivid AMOLED display and 5000mAh battery built for Africa.",
    price: 300000,
    rating: 4.4,
    reviews: 56,
    image: tecnoCamon30ProImg,
    stock: 30,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
  },
  {
    id: "infinix-hot-40-pro",
    name: "Infinix Hot 40 Pro",
    tagline: "6.78\" FHD+ display, 108MP camera and massive 5000mAh battery at an unbeatable price.",
    price: 195000,
    rating: 4.3,
    reviews: 74,
    image: infinixHot40ProImg,
    stock: 40,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
  },
  {
    id: "samsung-galaxy-buds3-pro",
    name: "Samsung Galaxy Buds3 Pro",
    tagline: "Intelligent ANC, 360° Audio and up to 30 hours total playback. Premium wireless earbuds.",
    price: 250000,
    rating: 4.7,
    reviews: 48,
    image: galaxyBuds3ProImg,
    stock: 25,
    category: "accessories",
    breadcrumb: ["Electronics", "Accessories"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categories = [
  { name: "Phones", slug: "phones", count: 7, image: iphone16BlackImg },
  { name: "Computer", slug: "computer", count: 0, image: computerImg },
  { name: "Accessories", slug: "accessories", count: 1, image: galaxyBuds3ProImg },
  { name: "All Products", slug: "all", count: products.length, image: samsungS25BlackImg },
];
