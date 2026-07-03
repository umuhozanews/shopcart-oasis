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
};

export const products: Product[] = [
  {
    id: "airpods-max",
    name: "Airpods- Max",
    tagline:
      "a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
    price: 549,
    monthly: 99.99,
    rating: 5,
    reviews: 121,
    image: airpodsPink,
    stock: 12,
    breadcrumb: ["Electronics", "Audio", "Headphones", "Shop Headphones by type"],
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
    name: "Wireless Earbuds, IPX8",
    tagline: "Organic Cotton, fairtrade certified",
    price: 89.99,
    rating: 5,
    reviews: 121,
    image: earbudsBlack,
    stock: 24,
    breadcrumb: ["Electronics", "Audio", "Earbuds"],
  },
  {
    id: "bose-bt-earphones",
    name: "Bose BT Earphones",
    tagline: "Table with air purifier, stained veneer/black",
    price: 289,
    rating: 4.5,
    reviews: 121,
    image: bose,
    stock: 8,
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
  {
    id: "vivefox-headphones",
    name: "VIVEFOX Headphones",
    tagline: "Wired Stereo Headsets With Mic",
    price: 39,
    rating: 5,
    reviews: 121,
    image: red,
    stock: 30,
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
  {
    id: "jbl-tune-600btnc",
    name: "JBL TUNE 600BTNC",
    tagline: "Premium Bone Conduction Open Ear Bluetooth",
    price: 59,
    rating: 5,
    reviews: 121,
    image: jbl,
    stock: 15,
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
  {
    id: "tagry-bluetooth",
    name: "TAGRY Bluetooth",
    tagline: "256, 8 core GPU, 8 GB",
    price: 109,
    rating: 5,
    reviews: 121,
    image: gaming,
    stock: 20,
    breadcrumb: ["Electronics", "Audio", "Earbuds"],
  },
  {
    id: "monster-mnflex",
    name: "Monster MNFLEX",
    tagline: "Flex Active Noise Canceling Bluetooth",
    price: 89.75,
    rating: 5,
    reviews: 121,
    image: bone,
    stock: 18,
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
  {
    id: "mpow-ch6",
    name: "Mpow CH6",
    tagline: "Kids Headphones",
    price: 569,
    rating: 5,
    reviews: 121,
    image: kids,
    stock: 10,
    breadcrumb: ["Electronics", "Audio", "Headphones"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const categories = [
  { name: "Furniture", count: 240 },
  { name: "Headphone", count: 240 },
  { name: "Shoe", count: 240 },
  { name: "Bag", count: 240 },
  { name: "Laptop", count: 240 },
  { name: "Book", count: 240 },
];
