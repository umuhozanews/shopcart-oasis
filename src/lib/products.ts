// Phone imports
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

// Tablet imports
import ipadProImg from "@/assets/tablets/ipad-pro.jpg";
import ipadAirImg from "@/assets/tablets/ipad-air.jpg";
import galaxyTabImg from "@/assets/tablets/galaxy-tab.jpg";
import xiaomiPadImg from "@/assets/tablets/xiaomi-pad.jpg";
import huaweiMatePadImg from "@/assets/tablets/huawei-matepad.jpg";

// Laptop imports
import macbookProImg from "@/assets/laptops/macbook-pro.jpg";
import macbookAirImg from "@/assets/laptops/macbook-air.jpg";
import dellXpsImg from "@/assets/laptops/dell-xps.jpg";
import hpSpectreImg from "@/assets/laptops/hp-spectre.jpg";
import thinkpadImg from "@/assets/laptops/thinkpad.jpg";
import asusRogImg from "@/assets/laptops/asus-rog.jpg";

// Watch imports
import appleWatchImg from "@/assets/watches/apple-watch.jpg";
import galaxyWatchImg from "@/assets/watches/galaxy-watch.jpg";
import huaweiWatchImg from "@/assets/watches/huawei-watch.jpg";
import xiaomiBandImg from "@/assets/watches/xiaomi-band.jpg";
import garminImg from "@/assets/watches/garmin.jpg";

// Accessory imports
import chargerImg from "@/assets/accessories/charger.jpg";
import cableImg from "@/assets/accessories/cable.jpg";
import powerbankImg from "@/assets/accessories/powerbank.jpg";
import caseImg from "@/assets/accessories/case.jpg";
import screenProtectorImg from "@/assets/accessories/screen-protector.jpg";
import airpodsImg from "@/assets/accessories/airpods.jpg";

// Gaming imports
import ps5Img from "@/assets/gaming/ps5.jpg";
import xboxImg from "@/assets/gaming/xbox.jpg";
import switchImg from "@/assets/gaming/switch.jpg";
import headsetImg from "@/assets/gaming/headset.jpg";
import controllerImg from "@/assets/gaming/controller.jpg";
import vrHeadsetImg from "@/assets/gaming/vr-headset.jpg";

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
  specs?: Record<string, string>;
};

const phones: Product[] = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    tagline: "The most powerful iPhone ever. Titanium design, A18 Pro chip, and a pro camera system with 5x optical zoom.",
    price: 1900000, rating: 5, reviews: 87, image: iphone16BlackImg, stock: 8,
    category: "phones", breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Black Titanium", hex: "#3a3a3a", image: iphone16BlackImg },
      { name: "White Titanium", hex: "#e5e5e5", image: iphone16WhiteImg },
      { name: "Desert Titanium", hex: "#c8a882", image: iphone16DesertImg },
    ],
    specs: {
      "Display": "6.9\" Super Retina XDR OLED, 2868×1320, 460 ppi, ProMotion 120Hz",
      "Processor": "Apple A18 Pro — 6-core CPU, 6-core GPU",
      "RAM": "8 GB",
      "Storage": "256 GB / 512 GB / 1 TB",
      "Main Camera": "48 MP main + 48 MP ultra-wide + 12 MP 5× telephoto",
      "Front Camera": "12 MP TrueDepth with autofocus",
      "Battery": "4,685 mAh — 27W wired, 25W MagSafe wireless",
      "Network": "5G, Wi-Fi 7, Bluetooth 5.3, NFC, Ultra Wideband",
      "Operating System": "iOS 18",
      "Water Resistance": "IP68 — 6 m for 30 minutes",
      "Dimensions": "163.0 × 77.6 × 8.25 mm",
      "Weight": "227 g",
    },
  },
  {
    id: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    tagline: "AI-powered flagship with built-in S Pen, 200MP camera and Snapdragon 8 Elite for Galaxy.",
    price: 1650000, rating: 4.9, reviews: 64, image: samsungS25BlackImg, stock: 6,
    category: "phones", breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Titanium Black", hex: "#1a1a1a", image: samsungS25BlackImg },
      { name: "Titanium Silver", hex: "#c0c0c0", image: samsungS25SilverImg },
    ],
    specs: {
      "Display": "6.9\" Dynamic AMOLED 2X, 3088×1440, 505 ppi, 120Hz adaptive",
      "Processor": "Snapdragon 8 Elite for Galaxy — 3.53 GHz",
      "RAM": "12 GB",
      "Storage": "256 GB / 512 GB / 1 TB",
      "Main Camera": "200 MP main + 12 MP ultra-wide + 10 MP 3× + 50 MP 5× telephoto",
      "Front Camera": "12 MP",
      "Battery": "5,000 mAh — 45W wired, 15W wireless, 4.5W reverse",
      "Network": "5G, Wi-Fi 7, Bluetooth 5.4, NFC, UWB",
      "Operating System": "Android 15 — One UI 7",
      "Stylus": "Built-in S Pen",
      "Water Resistance": "IP68 — 2 m for 30 minutes",
      "Dimensions": "162.8 × 77.6 × 8.2 mm",
      "Weight": "218 g",
    },
  },
  {
    id: "iphone-15",
    name: "iPhone 15 128GB",
    tagline: "Dynamic Island, 48MP main camera and USB-C in a beautiful colour-infused glass design.",
    price: 1250000, rating: 4.8, reviews: 112, image: iphone15PinkImg, stock: 14,
    category: "phones", breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Pink", hex: "#f4b3ae", image: iphone15PinkImg },
      { name: "Yellow", hex: "#f5d86d", image: iphone15YellowImg },
      { name: "Black", hex: "#1a1a1a", image: iphone15BlackImg },
    ],
    specs: {
      "Display": "6.1\" Super Retina XDR OLED, 2556×1179, 460 ppi, 60Hz",
      "Processor": "Apple A16 Bionic — 6-core CPU, 5-core GPU",
      "RAM": "6 GB",
      "Storage": "128 GB / 256 GB / 512 GB",
      "Main Camera": "48 MP main + 12 MP ultra-wide",
      "Front Camera": "12 MP TrueDepth with autofocus",
      "Battery": "3,349 mAh — 20W wired, 15W MagSafe wireless",
      "Network": "5G, Wi-Fi 6, Bluetooth 5.3, NFC",
      "Operating System": "iOS 18",
      "Charging": "USB-C",
      "Water Resistance": "IP68 — 6 m for 30 minutes",
      "Dimensions": "147.6 × 71.6 × 7.8 mm",
      "Weight": "171 g",
    },
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
    specs: {
      "Display": "6.1\" Super Retina XDR OLED, 2532×1170, 460 ppi, 60Hz",
      "Processor": "Apple A15 Bionic — 6-core CPU, 5-core GPU",
      "RAM": "6 GB",
      "Storage": "128 GB / 256 GB / 512 GB",
      "Main Camera": "12 MP main + 12 MP ultra-wide",
      "Front Camera": "12 MP TrueDepth",
      "Battery": "3,279 mAh — 20W wired, 15W MagSafe wireless",
      "Network": "5G, Wi-Fi 6, Bluetooth 5.3, NFC",
      "Operating System": "iOS 18",
      "Safety": "Emergency SOS via Satellite, Crash Detection",
      "Water Resistance": "IP68 — 6 m for 30 minutes",
      "Dimensions": "146.7 × 71.5 × 7.8 mm",
      "Weight": "172 g",
    },
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
    specs: {
      "Display": "6.6\" Super AMOLED, 2340×1080 FHD+, 120Hz adaptive",
      "Processor": "Samsung Exynos 1480 — 4nm octa-core",
      "RAM": "8 GB",
      "Storage": "128 GB / 256 GB (expandable microSD)",
      "Main Camera": "50 MP main + 12 MP ultra-wide + 5 MP macro",
      "Front Camera": "32 MP",
      "Battery": "5,000 mAh — 25W wired",
      "Network": "5G, Wi-Fi 6, Bluetooth 5.3, NFC",
      "Operating System": "Android 14 — One UI 6.1",
      "Water Resistance": "IP67",
      "Dimensions": "161.1 × 77.1 × 8.2 mm",
      "Weight": "213 g",
    },
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
    specs: {
      "Display": "6.78\" AMOLED, 2400×1080 FHD+, 144Hz",
      "Processor": "MediaTek Helio G99 Ultimate — 6nm octa-core",
      "RAM": "8 GB / 12 GB",
      "Storage": "256 GB (expandable microSD)",
      "Main Camera": "50 MP RGBW main + 50 MP portrait + 2 MP depth",
      "Front Camera": "50 MP",
      "Battery": "5,000 mAh — 45W wired fast charging",
      "Network": "4G LTE, Wi-Fi 5, Bluetooth 5.3",
      "Operating System": "Android 14 — HiOS 14",
      "Dimensions": "165.6 × 75.8 × 7.7 mm",
      "Weight": "193 g",
    },
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
    specs: {
      "Display": "6.78\" IPS LCD, 2460×1080 FHD+, 120Hz",
      "Processor": "MediaTek Helio G99 — 6nm octa-core",
      "RAM": "8 GB",
      "Storage": "256 GB (expandable microSD)",
      "Main Camera": "108 MP main + 2 MP depth",
      "Front Camera": "32 MP",
      "Battery": "5,000 mAh — 45W wired fast charging",
      "Network": "4G LTE, Wi-Fi 5, Bluetooth 5.3",
      "Operating System": "Android 14 — XOS 14",
      "Dimensions": "168.2 × 76.6 × 7.9 mm",
      "Weight": "195 g",
    },
  },
];

// ---------- Helpers for bulk generation ----------
type Seed = { brand: string; model: string; image: string; base: number; rating: number };

function makeCategory(
  categorySlug: string,
  breadcrumb: string[],
  seeds: Seed[],
  variants: string[],
  taglineFn: (brand: string, model: string, variant: string) => string,
): Product[] {
  const out: Product[] = [];
  seeds.forEach((s, i) => {
    variants.forEach((v, j) => {
      const priceJitter = ((i * 7 + j * 13) % 9) * 15000 - 60000;
      const price = Math.max(50000, Math.round((s.base + priceJitter) / 5000) * 5000);
      const idBase = `${s.brand}-${s.model}-${v}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      out.push({
        id: `${categorySlug}-${idBase}`,
        name: `${s.brand} ${s.model} ${v}`.trim(),
        tagline: taglineFn(s.brand, s.model, v),
        price,
        rating: Math.max(3.8, Math.min(5, s.rating - ((j % 4) * 0.1))),
        reviews: 20 + ((i * 11 + j * 7) % 180),
        image: s.image,
        stock: 5 + ((i * 3 + j * 5) % 40),
        category: categorySlug,
        breadcrumb,
      });
    });
  });
  return out;
}

// ---------- Tablets ----------
const tabletSeeds: Seed[] = [
  { brand: "Apple", model: "iPad Pro M4", image: ipadProImg, base: 1600000, rating: 5 },
  { brand: "Apple", model: "iPad Air M2", image: ipadAirImg, base: 950000, rating: 4.8 },
  { brand: "Apple", model: "iPad mini", image: ipadAirImg, base: 720000, rating: 4.7 },
  { brand: "Samsung", model: "Galaxy Tab S9 Ultra", image: galaxyTabImg, base: 1400000, rating: 4.9 },
  { brand: "Samsung", model: "Galaxy Tab S9 FE", image: galaxyTabImg, base: 620000, rating: 4.6 },
  { brand: "Samsung", model: "Galaxy Tab A9+", image: galaxyTabImg, base: 320000, rating: 4.4 },
  { brand: "Xiaomi", model: "Pad 6 Pro", image: xiaomiPadImg, base: 480000, rating: 4.5 },
  { brand: "Xiaomi", model: "Redmi Pad SE", image: xiaomiPadImg, base: 220000, rating: 4.3 },
  { brand: "Huawei", model: "MatePad 11.5", image: huaweiMatePadImg, base: 520000, rating: 4.6 },
  { brand: "Huawei", model: "MatePad SE", image: huaweiMatePadImg, base: 280000, rating: 4.3 },
  { brand: "Lenovo", model: "Tab P12", image: xiaomiPadImg, base: 450000, rating: 4.4 },
  { brand: "Lenovo", model: "Tab M10", image: huaweiMatePadImg, base: 180000, rating: 4.2 },
  { brand: "OPPO", model: "Pad Air 2", image: xiaomiPadImg, base: 260000, rating: 4.3 },
];
const tabletVariants = ["Wi-Fi 128GB", "Wi-Fi 256GB", "Cellular 128GB", "Wi-Fi 64GB"];
const tablets = makeCategory(
  "tablets",
  ["Electronics", "Tablets"],
  tabletSeeds,
  tabletVariants,
  (b, m, v) => `${b} ${m} tablet — ${v}. Stunning display, all-day battery and productivity built in.`,
);

// ---------- Laptops / Computers ----------
const laptopSeeds: Seed[] = [
  { brand: "Apple", model: "MacBook Pro 16 M4", image: macbookProImg, base: 3200000, rating: 5 },
  { brand: "Apple", model: "MacBook Pro 14 M4", image: macbookProImg, base: 2400000, rating: 4.9 },
  { brand: "Apple", model: "MacBook Air 15 M3", image: macbookAirImg, base: 1800000, rating: 4.9 },
  { brand: "Apple", model: "MacBook Air 13 M3", image: macbookAirImg, base: 1400000, rating: 4.8 },
  { brand: "Dell", model: "XPS 15", image: dellXpsImg, base: 2200000, rating: 4.8 },
  { brand: "Dell", model: "XPS 13", image: dellXpsImg, base: 1500000, rating: 4.7 },
  { brand: "Dell", model: "Inspiron 15", image: dellXpsImg, base: 750000, rating: 4.4 },
  { brand: "HP", model: "Spectre x360", image: hpSpectreImg, base: 1800000, rating: 4.7 },
  { brand: "HP", model: "EliteBook 840", image: hpSpectreImg, base: 1300000, rating: 4.6 },
  { brand: "HP", model: "Pavilion 15", image: hpSpectreImg, base: 700000, rating: 4.3 },
  { brand: "Lenovo", model: "ThinkPad X1 Carbon", image: thinkpadImg, base: 2000000, rating: 4.8 },
  { brand: "Lenovo", model: "ThinkPad T14", image: thinkpadImg, base: 1400000, rating: 4.6 },
  { brand: "Lenovo", model: "IdeaPad Slim 5", image: thinkpadImg, base: 650000, rating: 4.4 },
  { brand: "ASUS", model: "ROG Strix G16", image: asusRogImg, base: 1900000, rating: 4.7 },
  { brand: "ASUS", model: "ZenBook 14", image: dellXpsImg, base: 1100000, rating: 4.5 },
];
const laptopVariants = ["8GB / 256GB SSD", "16GB / 512GB SSD", "16GB / 1TB SSD", "32GB / 1TB SSD"];
const laptops = makeCategory(
  "computer",
  ["Electronics", "Laptops"],
  laptopSeeds,
  laptopVariants,
  (b, m, v) => `${b} ${m} laptop — ${v}. Fast, reliable and built for demanding work and play.`,
);

// ---------- Smart Watches ----------
const watchSeeds: Seed[] = [
  { brand: "Apple", model: "Watch Series 10", image: appleWatchImg, base: 550000, rating: 4.9 },
  { brand: "Apple", model: "Watch Ultra 2", image: appleWatchImg, base: 950000, rating: 4.9 },
  { brand: "Apple", model: "Watch SE", image: appleWatchImg, base: 320000, rating: 4.7 },
  { brand: "Samsung", model: "Galaxy Watch 7", image: galaxyWatchImg, base: 420000, rating: 4.7 },
  { brand: "Samsung", model: "Galaxy Watch Ultra", image: galaxyWatchImg, base: 780000, rating: 4.8 },
  { brand: "Samsung", model: "Galaxy Fit 3", image: xiaomiBandImg, base: 90000, rating: 4.4 },
  { brand: "Huawei", model: "Watch GT 4", image: huaweiWatchImg, base: 280000, rating: 4.6 },
  { brand: "Huawei", model: "Watch Fit 3", image: xiaomiBandImg, base: 130000, rating: 4.4 },
  { brand: "Xiaomi", model: "Smart Band 8", image: xiaomiBandImg, base: 55000, rating: 4.3 },
  { brand: "Xiaomi", model: "Watch S3", image: huaweiWatchImg, base: 180000, rating: 4.4 },
  { brand: "Garmin", model: "Fenix 7", image: garminImg, base: 850000, rating: 4.8 },
  { brand: "Garmin", model: "Forerunner 265", image: garminImg, base: 480000, rating: 4.7 },
  { brand: "Amazfit", model: "GTR 4", image: huaweiWatchImg, base: 160000, rating: 4.4 },
];
const watchVariants = ["40mm", "44mm", "GPS", "GPS + Cellular"];
const watches = makeCategory(
  "smart-watches",
  ["Electronics", "Smart Watches"],
  watchSeeds,
  watchVariants,
  (b, m, v) => `${b} ${m} smartwatch — ${v}. Advanced health tracking, GPS and always-on display.`,
);

// ---------- Accessories ----------
const accessorySeeds: Seed[] = [
  { brand: "Apple", model: "20W USB-C Adapter", image: chargerImg, base: 25000, rating: 4.7 },
  { brand: "Apple", model: "USB-C to Lightning Cable", image: cableImg, base: 18000, rating: 4.6 },
  { brand: "Apple", model: "AirPods Pro 2", image: airpodsImg, base: 380000, rating: 4.9 },
  { brand: "Apple", model: "AirPods 4", image: airpodsImg, base: 220000, rating: 4.7 },
  { brand: "Samsung", model: "25W Super Fast Charger", image: chargerImg, base: 22000, rating: 4.5 },
  { brand: "Samsung", model: "Galaxy Buds FE", image: airpodsImg, base: 95000, rating: 4.5 },
  { brand: "Anker", model: "PowerCore 20000", image: powerbankImg, base: 55000, rating: 4.8 },
  { brand: "Anker", model: "PowerCore 10000", image: powerbankImg, base: 32000, rating: 4.7 },
  { brand: "Anker", model: "Nano 30W Charger", image: chargerImg, base: 28000, rating: 4.6 },
  { brand: "Baseus", model: "GaN 65W Charger", image: chargerImg, base: 35000, rating: 4.5 },
  { brand: "Belkin", model: "BoostCharge 3-in-1", image: chargerImg, base: 85000, rating: 4.6 },
  { brand: "Spigen", model: "Clear Case", image: caseImg, base: 15000, rating: 4.5 },
  { brand: "OtterBox", model: "Defender Case", image: caseImg, base: 45000, rating: 4.7 },
  { brand: "UAG", model: "Monarch Case", image: caseImg, base: 55000, rating: 4.7 },
  { brand: "Nillkin", model: "CamShield Case", image: caseImg, base: 18000, rating: 4.4 },
  { brand: "Amazfit", model: "Tempered Glass", image: screenProtectorImg, base: 8000, rating: 4.4 },
  { brand: "Belkin", model: "InvisiGlass Ultra", image: screenProtectorImg, base: 18000, rating: 4.6 },
];
const accessoryVariants = ["Universal", "iPhone", "Samsung", "Pro"];
const accessories = makeCategory(
  "accessories",
  ["Electronics", "Accessories"],
  accessorySeeds,
  accessoryVariants,
  (b, m, v) => `${b} ${m} — ${v} edition. Original accessory, tested for durability and daily use.`,
);
accessories.unshift({
  id: "samsung-galaxy-buds3-pro",
  name: "Samsung Galaxy Buds3 Pro",
  tagline: "Intelligent ANC, 360° Audio and up to 30 hours total playback. Premium wireless earbuds.",
  price: 250000, rating: 4.7, reviews: 48, image: galaxyBuds3ProImg, stock: 25,
  category: "accessories", breadcrumb: ["Electronics", "Accessories"],
  specs: {
    "Driver": "10.5 mm two-way (woofer + tweeter)",
    "ANC": "Intelligent Active Noise Cancellation (3-mic)",
    "Audio": "360° Audio, Dolby Head Tracking",
    "Codec": "Samsung Seamless Codec, AAC, SBC",
    "Earbud Battery": "6 hours (ANC on) / 7 hours (ANC off)",
    "Case Battery": "Up to 30 hours total with case",
    "Connectivity": "Bluetooth 5.4, LE Audio",
    "Water Resistance": "IPX7 (earbuds) / IPX2 (case)",
    "Controls": "Touch + voice commands (Bixby)",
    "Dimensions (earbud)": "19.0 × 20.5 × 18.0 mm",
    "Weight (earbud)": "5.5 g each",
    "Charging": "USB-C + Qi wireless",
  },
});

// ---------- Gaming ----------
const gamingSeeds: Seed[] = [
  { brand: "Sony", model: "PlayStation 5 Slim", image: ps5Img, base: 850000, rating: 4.9 },
  { brand: "Sony", model: "PlayStation 5 Pro", image: ps5Img, base: 1200000, rating: 4.9 },
  { brand: "Sony", model: "DualSense Controller", image: controllerImg, base: 95000, rating: 4.8 },
  { brand: "Sony", model: "Pulse 3D Headset", image: headsetImg, base: 180000, rating: 4.7 },
  { brand: "Microsoft", model: "Xbox Series X", image: xboxImg, base: 780000, rating: 4.8 },
  { brand: "Microsoft", model: "Xbox Series S", image: xboxImg, base: 450000, rating: 4.6 },
  { brand: "Microsoft", model: "Xbox Wireless Controller", image: controllerImg, base: 85000, rating: 4.7 },
  { brand: "Nintendo", model: "Switch OLED", image: switchImg, base: 480000, rating: 4.8 },
  { brand: "Nintendo", model: "Switch Lite", image: switchImg, base: 280000, rating: 4.6 },
  { brand: "Meta", model: "Quest 3", image: vrHeadsetImg, base: 650000, rating: 4.7 },
  { brand: "Meta", model: "Quest 3S", image: vrHeadsetImg, base: 420000, rating: 4.6 },
  { brand: "Razer", model: "BlackShark V2 Pro", image: headsetImg, base: 220000, rating: 4.7 },
  { brand: "Razer", model: "Kraken V3", image: headsetImg, base: 130000, rating: 4.5 },
  { brand: "SteelSeries", model: "Arctis Nova 7", image: headsetImg, base: 200000, rating: 4.7 },
  { brand: "Logitech", model: "G Pro Wireless", image: controllerImg, base: 110000, rating: 4.6 },
];
const gamingVariants = ["Standard", "Bundle", "Digital Edition", "Pro Edition"];
const gaming = makeCategory(
  "gaming",
  ["Electronics", "Gaming"],
  gamingSeeds,
  gamingVariants,
  (b, m, v) => `${b} ${m} — ${v}. Next-gen gaming performance, immersive audio and pro-level control.`,
);

export const products: Product[] = [
  ...phones,
  ...tablets,
  ...laptops,
  ...watches,
  ...accessories,
  ...gaming,
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

const count = (slug: string) => products.filter((p) => p.category === slug).length;

export const categories = [
  { name: "Smartphones", slug: "phones", count: count("phones"), image: iphone16BlackImg },
  { name: "Tablets", slug: "tablets", count: count("tablets"), image: ipadProImg },
  { name: "Laptops", slug: "computer", count: count("computer"), image: macbookProImg },
  { name: "Smart Watches", slug: "smart-watches", count: count("smart-watches"), image: appleWatchImg },
  { name: "Accessories", slug: "accessories", count: count("accessories"), image: airpodsImg },
  { name: "Gaming", slug: "gaming", count: count("gaming"), image: ps5Img },
  { name: "All Products", slug: "all", count: products.length, image: computerImg },
];

export const brands = [
  { name: "Apple", slug: "apple" },
  { name: "Samsung", slug: "samsung" },
  { name: "Google Pixel", slug: "google-pixel" },
  { name: "Xiaomi", slug: "xiaomi" },
  { name: "Huawei", slug: "huawei" },
  { name: "Tecno", slug: "tecno" },
  { name: "Infinix", slug: "infinix" },
  { name: "Sony", slug: "sony" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Nintendo", slug: "nintendo" },
  { name: "Dell", slug: "dell" },
  { name: "HP", slug: "hp" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "ASUS", slug: "asus" },
];
