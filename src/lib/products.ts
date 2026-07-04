import airpodsPink from "@/assets/airpods-pink.jpg";
import airpodsGray from "@/assets/airpods-gray.jpg";
import airpodsGreen from "@/assets/airpods-green.jpg";
import airpodsSilver from "@/assets/airpods-silver.jpg";
import airpodsBlue from "@/assets/airpods-blue.jpg";
import earbudsBlack from "@/assets/earbuds-black.jpg";
import bose from "@/assets/bose-headphones.jpg";
import red from "@/assets/red-headphones.jpg";
import jbl from "@/assets/jbl-headphones.jpg";
import gaming from "@/assets/gaming-earbuds.jpg";
import bone from "@/assets/bone-headphones.jpg";
import kids from "@/assets/kids-headphones.jpg";

export type ColorOption = { name: string; hex: string; image: string };

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  monthly?: number;
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
    id: "airpods-max",
    name: "Airpods Max",
    tagline:
      "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
    price: 549,
    monthly: 99.99,
    rating: 5,
    reviews: 121,
    image: airpodsPink,
    stock: 12,
    category: "headphones",
    breadcrumb: ["Electronics", "Audio", "Headphones"],
    colors: [
      { name: "Pink", hex: "#f4b3ae", image: airpodsPink },
      { name: "Space Gray", hex: "#3a3a3c", image: airpodsGray },
      { name: "Green", hex: "#b8cdb3", image: airpodsGreen },
      { name: "Silver", hex: "#e5e5e5", image: airpodsSilver },
      { name: "Sky Blue", hex: "#5a7b95", image: airpodsBlue },
    ],
  },
  {
    id: "wireless-earbuds-ipx8",
    name: "Wireless Earbuds IPX8",
    tagline: "Waterproof wireless earbuds with deep bass and 8-hour playtime.",
    price: 89.99,
    rating: 5,
    reviews: 121,
    image: earbudsBlack,
    stock: 24,
    category: "earbuds",
    breadcrumb: ["Electronics", "Audio", "Earbuds"],
  },
  {
    id: "bose-bt-earphones",
    name: "Bose BT Earphones",
    tagline: "World-class noise cancellation meets legendary Bose sound.",
    price: 289,
    rating: 4.5,
    reviews: 121,
    image: bose,
    stock: 8,
    category: "headphones",
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
  {
    id: "vivefox-headphones",
    name: "VIVEFOX Headphones",
    tagline: "Wired stereo headset with built-in microphone for crystal-clear calls.",
    price: 39,
    rating: 5,
    reviews: 121,
    image: red,
    stock: 30,
    category: "headphones",
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
  {
    id: "jbl-tune-600btnc",
    name: "JBL TUNE 600BTNC",
    tagline: "Active noise cancellation with powerful JBL Pure Bass sound.",
    price: 59,
    rating: 5,
    reviews: 121,
    image: jbl,
    stock: 15,
    category: "headphones",
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
  {
    id: "tagry-bluetooth",
    name: "TAGRY Bluetooth Earbuds",
    tagline: "True wireless stereo earbuds with touch control and charging case.",
    price: 109,
    rating: 5,
    reviews: 121,
    image: gaming,
    stock: 20,
    category: "earbuds",
    breadcrumb: ["Electronics", "Audio", "Earbuds"],
  },
  {
    id: "monster-mnflex",
    name: "Monster MNFLEX",
    tagline: "Flex active noise canceling Bluetooth headphones with 30hr battery.",
    price: 89.75,
    rating: 5,
    reviews: 121,
    image: bone,
    stock: 18,
    category: "headphones",
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
  {
    id: "mpow-ch6",
    name: "Mpow CH6 Kids Headphones",
    tagline: "Safe volume-limited headphones designed for children aged 3–15.",
    price: 29.99,
    rating: 5,
    reviews: 121,
    image: kids,
    stock: 10,
    category: "kids",
    breadcrumb: ["Electronics", "Audio", "Kids"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categories = [
  { name: "Headphones", slug: "headphones", count: 6 },
  { name: "Earbuds", slug: "earbuds", count: 2 },
  { name: "Kids Audio", slug: "kids", count: 1 },
  { name: "Wireless", slug: "wireless", count: 5 },
  { name: "Gaming", slug: "gaming", count: 2 },
  { name: "All Products", slug: "all", count: products.length },
];
