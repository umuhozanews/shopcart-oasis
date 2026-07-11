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

const phones: Product[] = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    tagline: "The most powerful iPhone ever. Titanium design, A18 Pro chip, and a pro camera system with 5x optical zoom.",
    description: "The iPhone 16 Pro Max is Apple's most advanced smartphone ever made. Built from aerospace-grade titanium — stronger and lighter than steel — it pairs with the industry's toughest Ceramic Shield glass for a device that's as beautiful as it is durable.\n\nPowering everything is the Apple A18 Pro chip, the first 3-nanometre chip designed for smartphones. It drives Apple Intelligence, a suite of AI features built into iOS 18 that helps you write, summarise, and create — privately and securely on-device.\n\nThe pro camera system reaches new heights: a 48 MP Main camera with a larger sensor captures incredible detail in any light, a 48 MP Ultra Wide covers wide scenes with razor-sharp precision, and a 12 MP 5× Telephoto with tetraprism optics brings distant subjects close without losing quality. Shoot ProRes video at 4K 120fps or log-encoded footage for professional colour grading.\n\nThe 6.9-inch Super Retina XDR display with ProMotion adapts from 1Hz to 120Hz automatically, making scrolling feel silky-smooth while saving battery. With a 4,685 mAh cell and 27W MagSafe charging, the iPhone 16 Pro Max keeps up with even the busiest day.",
    price: 1900000, rating: 5, reviews: 87, image: iphone16BlackImg, stock: 8,
    category: "phones", breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Black Titanium", hex: "#3a3a3a", image: iphone16BlackImg },
      { name: "White Titanium", hex: "#e5e5e5", image: iphone16WhiteImg },
      { name: "Desert Titanium", hex: "#c8a882", image: iphone16DesertImg },
    ],
    gallery: [
      { label: "Front View",  src: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg" },
      { label: "Back View",   src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-1.jpg" },
      { label: "Side View",   src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-2.jpg" },
      { label: "Angle View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-3.jpg" },
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
    description: "The Samsung Galaxy S25 Ultra is the ultimate Android powerhouse, combining bleeding-edge performance with Galaxy AI to reshape what's possible on a smartphone.\n\nAt its core is the Snapdragon 8 Elite for Galaxy — the fastest chip ever placed in an Android device — running at up to 3.53GHz. It handles everything effortlessly: intensive gaming, multi-tasking, real-time AI translation, and 8K video recording without breaking a sweat.\n\nThe integrated S Pen — thinner and more precise than any previous generation — makes the S25 Ultra a true creative tool. Write notes, annotate documents, sketch ideas, or sign contracts with the natural feel of ink on paper. Galaxy AI can then summarise, translate, and act on what you've written.\n\nThe 200MP main camera is the highest resolution ever on a Galaxy, capturing extraordinary detail. A 50MP 5× periscope telephoto and 12MP 3× zoom give you a complete telephoto range, while the 12MP Ultra Wide covers sweeping landscapes with crisp clarity.\n\nThe titanium frame and Armor Aluminium corners give the S25 Ultra a premium rigidity, while the 6.9-inch Dynamic AMOLED 2X display with 2,600 nits peak brightness is visible even in harsh sunlight.",
    price: 1650000, rating: 4.9, reviews: 64, image: samsungS25BlackImg, stock: 6,
    category: "phones", breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Titanium Black", hex: "#1a1a1a", image: samsungS25BlackImg },
      { name: "Titanium Silver", hex: "#c0c0c0", image: samsungS25SilverImg },
    ],
    gallery: [
      { label: "Front View",  src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra-sm-s938.jpg" },
      { label: "Back View",   src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-sm-s938-1.jpg" },
      { label: "Side View",   src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-sm-s938-2.jpg" },
      { label: "Angle View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-sm-s938-3.jpg" },
      { label: "S Pen View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s25-ultra-sm-s938-4.jpg" },
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
    description: "The iPhone 15 marks a new era for iPhone with the arrival of Dynamic Island and USB-C. Dynamic Island is a fluid, interactive space at the top of the display that adapts to show you alerts, Live Activities, and ongoing tasks — from navigation to music — without interrupting what you're doing.\n\nSwitching to USB-C means you can now use the same cable for your iPhone, Mac, and iPad. Transfer photos at up to 480 Mbps, connect to external monitors, and charge from any USB-C power source including your MacBook charger.\n\nThe all-new 48MP Main camera captures four times more information than before. Shoot in full 48MP resolution for stunning detail in photos you can crop and zoom deeply. Portrait mode now works automatically — the camera detects people, pets, and objects and retains depth information so you can adjust focus after the shot.\n\nThe colour-infused glass design is available in five beautiful shades that go all the way through the material — not just a surface coat. Wrapped in Ceramic Shield on the front and backed by the most durable iPhone glass ever on the back, the iPhone 15 looks stunning and stays that way.",
    price: 1250000, rating: 4.8, reviews: 112, image: iphone15PinkImg, stock: 14,
    category: "phones", breadcrumb: ["Electronics", "Phones"],
    colors: [
      { name: "Pink", hex: "#f4b3ae", image: iphone15PinkImg },
      { name: "Yellow", hex: "#f5d86d", image: iphone15YellowImg },
      { name: "Black", hex: "#1a1a1a", image: iphone15BlackImg },
    ],
    gallery: [
      { label: "Front View",  src: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg" },
      { label: "Back View",   src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg" },
      { label: "Side View",   src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-2.jpg" },
      { label: "Angle View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-3.jpg" },
      { label: "USB-C View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-4.jpg" },
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
    description: "The iPhone 14 brings life-saving technology and powerful performance at outstanding value. Emergency SOS via satellite means that even when you're far from a cell tower — in a remote area, on a mountain, or out at sea — you can contact emergency services. Crash Detection uses sensors and algorithms to automatically call for help if you're in a serious car accident.\n\nPowering the iPhone 14 is the A15 Bionic chip, the same chip found in the iPhone 13 Pro Max — a 6-core CPU, 5-core GPU, and 16-core Neural Engine that handles every task with ease. Games run smoothly, videos export quickly, and computational photography happens in real time.\n\nThe 12MP dual camera system features Photonic Engine — Apple's deep fusion of hardware and software — that delivers up to 2× better performance in low light on the Main camera and up to 2× improvement on the Ultra Wide. Cinematic mode brings Hollywood-style shallow depth of field to your videos, now upgraded to shoot at 4K 30fps.\n\nWith IP68 water resistance, an all-day battery, and the beautiful Super Retina XDR display, the iPhone 14 delivers the full iPhone experience at a price that makes it accessible to more people in Rwanda.",
    price: 950000,
    rating: 4.7,
    reviews: 143,
    image: iphone14Img,
    stock: 18,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
    gallery: [
      { label: "Front View",  src: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg" },
      { label: "Back View",   src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-3.jpg" },
      { label: "Side View",   src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-2.jpg" },
    ],
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
    description: "The Samsung Galaxy A55 5G brings premium features to an accessible price, proving that you don't need a flagship budget to get a flagship-level experience.\n\nThe 6.6-inch Super AMOLED display runs at a smooth 120Hz adaptive refresh rate — scrolling through social media, watching videos, and playing games all feel buttery-smooth. Vision Booster technology ensures the screen is readable even under bright sunlight.\n\nThe 50MP triple camera system is led by a high-resolution main sensor, joined by a 12MP Ultra Wide and a 5MP macro lens for extreme close-up detail. The 32MP front camera takes stunning selfies with natural skin tones and Galaxy AI-powered editing tools.\n\nWith 5G connectivity, you get blazing-fast download speeds for streaming, video calls, and cloud gaming. The 5,000 mAh battery keeps you going all day, and 25W fast charging gets you back up quickly when you need it. IP67 water resistance means you can take it into the rain or pool without worry.\n\nAvailable in Awesome Navy and Awesome Lilac — two colours that stand out from the crowd.",
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
    gallery: [
      { label: "Front View",  src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg" },
      { label: "Back View",   src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-1.jpg" },
      { label: "Side View",   src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a55-2.jpg" },
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
    description: "The Tecno Camon 30 Pro is purpose-built for African users — powerful, vivid, and long-lasting. Tecno partnered with RGBW sensor technology for the 50MP main camera, adding a White pixel alongside Red, Green, and Blue to capture 60% more light. The result: portraits that are sharper, brighter, and more true-to-life even in the challenging lighting of Rwandan evenings.\n\nA second 50MP portrait camera with a depth sensor creates professional bokeh effects for stunning subject isolation. The 50MP front camera means your selfies are just as impressive as your rear shots — every face captured in detail.\n\nThe 6.78-inch AMOLED display runs at 144Hz, one of the highest refresh rates in its price class, making every scroll and animation feel premium. Colours pop with deep blacks and vivid saturation that makes photos and videos truly come alive.\n\nThe 5,000 mAh battery combined with 45W fast charging means you can go from 0 to 70% in about 30 minutes — essential when you're on the go. Running HiOS 14 on Android 14, the Camon 30 Pro is optimised for local network conditions, low-storage environments, and the apps Rwandans actually use.",
    price: 300000,
    rating: 4.4,
    reviews: 56,
    image: tecnoCamon30ProImg,
    stock: 30,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
    gallery: [
      { label: "Front View",  src: "https://fdn2.gsmarena.com/vv/bigpic/tecno-camon-30-pro-new.jpg" },
      { label: "Back View",   src: "https://fdn2.gsmarena.com/vv/pics/tecno/tecno-camon-30-pro-1.jpg" },
      { label: "Side View",   src: "https://fdn2.gsmarena.com/vv/pics/tecno/tecno-camon-30-pro-2.jpg" },
    ],
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
    description: "The Infinix Hot 40 Pro redefines what's possible under 200,000 RWF. Leading the spec sheet is a 108MP main camera — a resolution once reserved for phones costing three times as much — that captures enormous amounts of detail you can crop, zoom, and print large without losing sharpness.\n\nThe 6.78-inch FHD+ display with a 120Hz refresh rate is one of the largest and smoothest screens in this price range. Watching movies, playing mobile games, or scrolling through content feels premium and immersive. The 500-nit peak brightness keeps the screen clear in outdoor conditions.\n\nRunning Android 14 with XOS 14, the Hot 40 Pro is optimised for performance on mid-range hardware. The MediaTek Helio G99 processor handles multitasking, gaming, and everyday apps without stuttering, while 8GB RAM keeps multiple apps open simultaneously.\n\nThe 5,000 mAh battery with 45W fast charging is the headline feature for daily users — charge fully in under an hour and use all day without anxiety. A 32MP front camera completes the package for video calls and social media. For anyone wanting a complete, capable smartphone experience in Rwanda without stretching the budget, the Infinix Hot 40 Pro is the clear choice.",
    price: 195000,
    rating: 4.3,
    reviews: 74,
    image: infinixHot40ProImg,
    stock: 40,
    category: "phones",
    breadcrumb: ["Electronics", "Phones"],
    gallery: [
      { label: "Front View",  src: "https://fdn2.gsmarena.com/vv/bigpic/infinix-hot-40-pro.jpg" },
      { label: "Back View",   src: "https://fdn2.gsmarena.com/vv/pics/infinix/infinix-hot-40-pro-1.jpg" },
      { label: "Side View",   src: "https://fdn2.gsmarena.com/vv/pics/infinix/infinix-hot-40-pro-2.jpg" },
      { label: "Angle View",  src: "https://fdn2.gsmarena.com/vv/pics/infinix/infinix-hot-40-pro-3.jpg" },
    ],
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
type Seed = {
  brand: string; model: string; image: string; base: number; rating: number;
  gallery?: GalleryImage[];
  description?: string;
  specs?: Record<string, string>;
};

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
        ...(s.gallery && { gallery: s.gallery }),
        ...(s.description && { description: s.description }),
        ...(s.specs && { specs: s.specs }),
      });
    });
  });
  return out;
}

// ---------- Tablets ----------
const tabletSeeds: Seed[] = [
  {
    brand: "Apple", model: "iPad Pro M4", image: ipadProImg, base: 1600000, rating: 5,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-11-2024.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-11-2024-2.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-2024-3.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-pro-11-2024-5.jpg" },
    ],
    description: "The iPad Pro with M4 is the ultimate iPad — impossibly thin at just 5.1 mm yet more powerful than most laptops. The M4 chip brings desktop-class performance with a 10-core CPU and GPU, enabling pro workflows like video editing, 3D rendering, and on-device AI with ease. The Ultra Retina XDR OLED display is the best ever on an iPad, delivering vivid colours, true blacks, and 1000 nits sustained brightness. Apple Pencil Pro support unlocks pixel-perfect illustration and note-taking. This is the thinnest Apple product ever made.",
    specs: {
      "Display": "11\" / 13\" Ultra Retina XDR OLED, ProMotion 120Hz, 1000 nits sustained",
      "Processor": "Apple M4 — 10-core CPU, 10-core GPU",
      "RAM": "8 GB / 16 GB unified memory",
      "Storage": "256 GB / 512 GB / 1 TB / 2 TB",
      "Camera": "12 MP Wide main + 10 MP Ultra Wide",
      "Front Camera": "12 MP landscape TrueDepth (Center Stage)",
      "Battery": "Up to 10 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3, USB-C Thunderbolt 4",
      "Operating System": "iPadOS 17",
      "Stylus": "Apple Pencil Pro compatible",
      "Biometrics": "Face ID",
      "Thickness": "5.1 mm — thinnest Apple product ever",
    },
  },
  {
    brand: "Apple", model: "iPad Air M2", image: ipadAirImg, base: 950000, rating: 4.8,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air-m2-2024.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-air-m2-2024-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-air-m2-2024-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-air-m2-2024-3.jpg" },
    ],
    description: "The iPad Air with M2 is the most versatile iPad in Apple's lineup — powerful enough for professional work, thin enough for everyday carry. Available in 11-inch and 13-inch sizes, both feature the all-screen Liquid Retina design with Touch ID and support for Apple Pencil Pro. The M2 chip handles video editing, AR apps, and heavy multitasking with ease. The landscape front camera makes video calls feel natural. Available in five beautiful colours including Blue, Purple, and Starlight.",
    specs: {
      "Display": "11\" / 13\" Liquid Retina IPS, 2360×1640 / 2732×2048, 500–600 nits",
      "Processor": "Apple M2 — 8-core CPU, 10-core GPU",
      "RAM": "8 GB unified memory",
      "Storage": "128 GB / 256 GB / 512 GB / 1 TB",
      "Camera": "12 MP Wide main",
      "Front Camera": "12 MP landscape Center Stage",
      "Battery": "Up to 10 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3, USB-C",
      "Operating System": "iPadOS 17",
      "Stylus": "Apple Pencil Pro compatible",
      "Biometrics": "Touch ID (top button)",
    },
  },
  {
    brand: "Apple", model: "iPad mini", image: ipadAirImg, base: 720000, rating: 4.7,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-mini-2024.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-mini-2024-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-mini-2024-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-ipad-mini-2024-3.jpg" },
    ],
    description: "The iPad mini 2024 is the most portable full-power iPad Apple makes. Featuring the A17 Pro chip — the same silicon found in iPhone 15 Pro — it handles any app, game, or creative task with ease in the palm of your hand. The 8.3-inch Liquid Retina display fits comfortably in one hand yet offers far more screen than any smartphone. With Apple Pencil Pro support for note-taking, Wi-Fi 6E connectivity, and all-day battery life, the iPad mini is the perfect companion for reading, sketching, and on-the-go productivity.",
    specs: {
      "Display": "8.3\" Liquid Retina IPS, 2266×1488, 326 ppi, True Tone, P3 wide colour",
      "Processor": "Apple A17 Pro — 6-core CPU, 6-core GPU, 16-core Neural Engine",
      "RAM": "8 GB unified memory",
      "Storage": "128 GB / 512 GB",
      "Camera": "12 MP Wide main",
      "Front Camera": "12 MP landscape Center Stage",
      "Battery": "19.3 Wh — up to 10 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3, USB-C",
      "Operating System": "iPadOS 18",
      "Stylus": "Apple Pencil Pro compatible",
      "Biometrics": "Touch ID (top button)",
    },
  },
  {
    brand: "Samsung", model: "Galaxy Tab S9 Ultra", image: galaxyTabImg, base: 1400000, rating: 4.9,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9-ultra-5g.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-ultra-5g-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-ultra-5g-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-ultra-5g-3.jpg" },
    ],
    description: "The Samsung Galaxy Tab S9 Ultra is the most powerful Android tablet money can buy. Its extraordinary 14.6-inch Dynamic AMOLED 2X display — the largest ever on a Galaxy Tab — delivers 120Hz smoothness, HDR10+ brilliance, and 420 ppi sharpness certified for professional colour work. The built-in S Pen transforms the Tab S9 Ultra into a genuine pen-and-paper replacement for notes, sketches, and annotations. Snapdragon 8 Gen 2 processing handles 4K video editing and gaming without compromise. IP68 rated — fully waterproof.",
    specs: {
      "Display": "14.6\" Dynamic AMOLED 2X, 2960×1848, 120Hz adaptive, 420 ppi, HDR10+",
      "Processor": "Snapdragon 8 Gen 2 for Galaxy — 3.36 GHz",
      "RAM": "12 GB / 16 GB",
      "Storage": "256 GB / 512 GB / 1 TB",
      "Camera": "13 MP Wide + 8 MP Ultra Wide",
      "Front Camera": "12 MP + 12 MP Ultra Wide",
      "Battery": "11200 mAh — 45W wired, 15W wireless",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3, USB-C 3.2, optional 5G",
      "Operating System": "Android 13 — One UI 5.1",
      "Stylus": "Built-in S Pen",
      "Water Resistance": "IP68",
    },
  },
  {
    brand: "Samsung", model: "Galaxy Tab S9 FE", image: galaxyTabImg, base: 620000, rating: 4.6,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s9-fe.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-fe-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-fe-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-s9-fe-3.jpg" },
    ],
    description: "The Samsung Galaxy Tab S9 FE brings the Galaxy Tab experience to an affordable price without losing the features that matter most. The 10.9-inch 120Hz display is vivid and bright for streaming, reading, and gaming. Exynos 1380 processing, Samsung DeX desktop mode, and an S Pen included in the box deliver remarkable productivity at this price point. IP68 water resistance and an 8000 mAh battery that lasts over 14 hours round out a compelling package.",
    specs: {
      "Display": "10.9\" LCD TFT, 2304×1440, 120Hz",
      "Processor": "Samsung Exynos 1380 — 5nm octa-core",
      "RAM": "6 GB / 8 GB",
      "Storage": "128 GB / 256 GB (expandable microSD)",
      "Camera": "8 MP main",
      "Front Camera": "10 MP",
      "Battery": "8000 mAh — 25W wired",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.3, USB-C, optional 5G",
      "Operating System": "Android 13 — One UI 5.1",
      "Stylus": "S Pen included",
      "Water Resistance": "IP68",
    },
  },
  {
    brand: "Samsung", model: "Galaxy Tab A9+", image: galaxyTabImg, base: 320000, rating: 4.4,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a9-plus.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-a9-plus-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-tab-a9-plus-2.jpg" },
    ],
    description: "The Samsung Galaxy Tab A9+ is the ideal family tablet — large, capable, and priced for everyone. Its 11-inch FHD+ display with a quad-speaker setup and Dolby Atmos makes movies and music genuinely impressive. Whether for children's education, streaming entertainment, or casual browsing, the Tab A9+ handles everyday tasks smoothly with Snapdragon 695 processing. Up to 512 GB expandable storage means there is room for everything. A dependable tablet that delivers Samsung quality at an accessible price.",
    specs: {
      "Display": "11\" IPS LCD, 1920×1200 FHD+, 90Hz",
      "Processor": "Snapdragon 695 — 6nm octa-core",
      "RAM": "4 GB / 8 GB",
      "Storage": "64 GB / 128 GB / 256 GB (expandable microSD)",
      "Camera": "8 MP main",
      "Front Camera": "5 MP",
      "Battery": "7040 mAh — 15W wired",
      "Connectivity": "Wi-Fi 5, Bluetooth 5.1, USB-C, optional 5G",
      "Operating System": "Android 13 — One UI 5.1",
      "Audio": "Quad speakers with Dolby Atmos",
    },
  },
  {
    brand: "Xiaomi", model: "Pad 6 Pro", image: xiaomiPadImg, base: 480000, rating: 4.5,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-pad-6-pro.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-6-pro-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-pad-6-pro-2.jpg" },
    ],
    description: "The Xiaomi Pad 6 Pro is a high-performance tablet that punches far above its price. Powered by the Snapdragon 8+ Gen 1 — the same chip found in flagship phones — it handles intensive gaming, video editing, and multitasking with professional speed. The 11-inch IPS LCD display runs at 144Hz, one of the highest refresh rates in the Android tablet space, making gaming and scrolling exceptionally smooth. Four Harman Kardon-tuned speakers with Dolby Atmos create a cinema-quality audio experience.",
    specs: {
      "Display": "11\" IPS LCD, 2880×1800 WQHD+, 144Hz, 309 ppi",
      "Processor": "Snapdragon 8+ Gen 1 — 4nm octa-core",
      "RAM": "8 GB / 12 GB",
      "Storage": "256 GB / 512 GB",
      "Camera": "50 MP main",
      "Front Camera": "20 MP",
      "Battery": "8600 mAh — 67W wired HyperCharge",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3, USB-C 3.1",
      "Operating System": "Android 13 — MIUI 14 for Pad",
      "Audio": "Quad Harman Kardon speakers, Dolby Atmos",
    },
  },
  {
    brand: "Xiaomi", model: "Redmi Pad SE", image: xiaomiPadImg, base: 220000, rating: 4.3,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-pad-se.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-se-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-pad-se-2.jpg" },
    ],
    description: "The Xiaomi Redmi Pad SE proves affordable does not have to mean compromised. Its 11-inch FHD+ display with 90Hz refresh rate is large, bright, and comfortable for extended viewing. Quad speakers with Dolby Atmos create a rich soundscape for movies and music. The Snapdragon 680 processor handles streaming, online classes, and everyday apps smoothly. With an 8000 mAh battery that lasts two full days and up to 256 GB of storage, the Redmi Pad SE is perfect for students and families seeking maximum value.",
    specs: {
      "Display": "11\" IPS LCD, 2000×1200 FHD+, 90Hz",
      "Processor": "Snapdragon 680 — 6nm octa-core",
      "RAM": "4 GB / 6 GB / 8 GB",
      "Storage": "128 GB / 256 GB (expandable microSD)",
      "Camera": "8 MP main",
      "Front Camera": "5 MP",
      "Battery": "8000 mAh — 18W wired",
      "Connectivity": "Wi-Fi 5, Bluetooth 5.0, USB-C",
      "Operating System": "Android 13 — MIUI 14",
      "Audio": "Quad speakers, Dolby Atmos",
    },
  },
  {
    brand: "Huawei", model: "MatePad 11.5", image: huaweiMatePadImg, base: 520000, rating: 4.6,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/huawei-matepad-115.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-matepad-115-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-matepad-115-2.jpg" },
    ],
    description: "The Huawei MatePad 11.5 combines a large, paper-like display with strong processing power for an outstanding writing and reading experience. The 11.5-inch 120Hz display with anti-glare coating reduces eye strain during long reading sessions, and HUAWEI M-Pencil support makes note-taking feel natural. Snapdragon 7 Gen 1 delivers responsive performance across creative apps, productivity tools, and media. Four speakers with HUAWEI Histen audio technology fill your space with rich, balanced sound.",
    specs: {
      "Display": "11.5\" IPS LCD, 2200×1440 WUXGA+, 120Hz, 224 ppi",
      "Processor": "Snapdragon 7 Gen 1 — 4nm octa-core",
      "RAM": "6 GB / 8 GB",
      "Storage": "128 GB / 256 GB",
      "Camera": "13 MP main",
      "Front Camera": "8 MP",
      "Battery": "7700 mAh — 22.5W wired",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.1, USB-C",
      "Operating System": "HarmonyOS 3.1",
      "Stylus": "HUAWEI M-Pencil (2nd gen) compatible",
      "Audio": "Quad speakers with Histen 8.0",
    },
  },
  {
    brand: "Huawei", model: "MatePad SE", image: huaweiMatePadImg, base: 280000, rating: 4.3,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/huawei-matepad-se.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-matepad-se-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-matepad-se-2.jpg" },
    ],
    description: "The Huawei MatePad SE is a dependable everyday tablet with a clean design and honest performance. Its 10.4-inch display is comfortable for reading, video calls, and streaming, while the long-lasting 5100 mAh battery keeps it running through a full day of use. Ideal for children's education, online classes, and casual entertainment. AppGallery provides access to thousands of applications including popular social and productivity tools. A no-nonsense, affordable option for families in Rwanda.",
    specs: {
      "Display": "10.4\" IPS LCD, 2000×1200 FHD+, 60Hz",
      "Processor": "Snapdragon 680 — 6nm octa-core",
      "RAM": "3 GB / 4 GB / 6 GB",
      "Storage": "32 GB / 64 GB / 128 GB (expandable microSD)",
      "Camera": "5 MP main",
      "Front Camera": "5 MP",
      "Battery": "5100 mAh — 10W wired",
      "Connectivity": "Wi-Fi 5, Bluetooth 5.1, USB-C",
      "Operating System": "HarmonyOS 3",
      "Audio": "Dual speakers",
    },
  },
  {
    brand: "Lenovo", model: "Tab P12", image: xiaomiPadImg, base: 450000, rating: 4.4,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/lenovo-tab-p12.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-tab-p12-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-tab-p12-2.jpg" },
    ],
    description: "The Lenovo Tab P12 is a large-screen entertainment powerhouse with a 12.7-inch 3K display that makes movies and games look stunning. MediaTek Dimensity 7050 processing with up to 8 GB RAM handles multitasking and gaming smoothly. The optional keyboard cover and precision pen transform it into a portable productivity hub. Four JBL-tuned speakers with Dolby Atmos fill a room with rich, cinematic sound. A versatile tablet that excels at both work and play in a clean, premium design.",
    specs: {
      "Display": "12.7\" IPS LCD, 2944×1840 3K, 60Hz, 274 ppi",
      "Processor": "MediaTek Dimensity 7050 — 6nm octa-core",
      "RAM": "8 GB",
      "Storage": "128 GB / 256 GB (expandable microSD)",
      "Camera": "13 MP main",
      "Front Camera": "8 MP",
      "Battery": "10200 mAh — 30W wired",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.1, USB-C 2.0",
      "Operating System": "Android 13",
      "Audio": "Quad JBL speakers, Dolby Atmos",
      "Accessories": "Keyboard and Precision Pen optional",
    },
  },
  {
    brand: "Lenovo", model: "Tab M10", image: huaweiMatePadImg, base: 180000, rating: 4.2,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/lenovo-tab-m10-plus-gen-3.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-tab-m10-plus-gen-3-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/lenovo/lenovo-tab-m10-plus-gen-3-2.jpg" },
    ],
    description: "The Lenovo Tab M10 is a reliable, affordable tablet ideal for children, families, and light everyday use. Its 10.1-inch FHD+ display is comfortable for reading, video calls, and online classes. With optional 4G LTE you stay connected without Wi-Fi. The durable build withstands daily family life, and Google Kids Space makes it a safe, engaging learning tool for younger users. Lenovo's update promise ensures the software stays current long after purchase.",
    specs: {
      "Display": "10.1\" IPS LCD, 1920×1200 FHD+, 60Hz",
      "Processor": "MediaTek Helio G85 — 12nm octa-core",
      "RAM": "3 GB / 4 GB",
      "Storage": "32 GB / 64 GB / 128 GB (expandable microSD)",
      "Camera": "8 MP main",
      "Front Camera": "5 MP",
      "Battery": "5000 mAh — 10W wired",
      "Connectivity": "Wi-Fi 5, Bluetooth 5.0, USB-C, optional 4G LTE",
      "Operating System": "Android 13",
      "Audio": "Dual speakers, Dolby Atmos",
    },
  },
  {
    brand: "OPPO", model: "Pad Air 2", image: xiaomiPadImg, base: 260000, rating: 4.3,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/oppo-pad-air-2.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-pad-air-2-1.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-pad-air-2-2.jpg" },
    ],
    description: "The OPPO Pad Air 2 offers premium-feeling design at a refreshingly affordable price. The 10.36-inch 2K display with 90Hz refresh rate is ideal for streaming, reading, and gaming. Snapdragon 685 processing handles everyday tasks and popular apps smoothly. With up to 256 GB expandable storage and a large 8000 mAh battery that delivers over 12 hours of continuous use, the Pad Air 2 is a confident all-day companion for work and entertainment.",
    specs: {
      "Display": "10.36\" IPS LCD, 2000×1200, 90Hz",
      "Processor": "Snapdragon 685 — 6nm octa-core",
      "RAM": "4 GB / 6 GB / 8 GB",
      "Storage": "128 GB / 256 GB (expandable microSD)",
      "Camera": "8 MP main",
      "Front Camera": "5 MP",
      "Battery": "8000 mAh — 18W wired",
      "Connectivity": "Wi-Fi 5, Bluetooth 5.0, USB-C",
      "Operating System": "Android 13 — ColorOS 13.1",
    },
  },
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
  {
    brand: "Apple", model: "MacBook Pro 16 M4", image: macbookProImg, base: 3200000, rating: 5,
    description: "The MacBook Pro 16-inch with M4 Pro or M4 Max is the definitive professional laptop. Thundering performance meets extraordinary battery life — up to 24 hours — in an all-day machine that handles the most demanding workflows: 8K video editing, compiling massive codebases, and running complex ML models simultaneously. The Liquid Retina XDR display with 1600 nits peak brightness and ProMotion 120Hz is the best laptop screen ever made. Six-speaker spatial audio fills a room. Built for professionals who will not accept compromise.",
    specs: {
      "Display": "16.2\" Liquid Retina XDR, 3456×2234, ProMotion 120Hz, 1600 nits peak",
      "Processor": "Apple M4 Pro / M4 Max — up to 16-core CPU, 40-core GPU",
      "RAM": "24 GB / 48 GB / 64 GB / 128 GB unified memory",
      "Storage": "512 GB / 1 TB / 2 TB / 4 TB / 8 TB SSD",
      "Ports": "3× Thunderbolt 4, HDMI 2.1, SD card, MagSafe 3, 3.5mm",
      "Battery": "100 Wh — up to 24 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3",
      "Operating System": "macOS Sequoia",
      "Audio": "6-speaker array with spatial audio + 3-mic array",
      "Weight": "2.14 kg",
    },
  },
  {
    brand: "Apple", model: "MacBook Pro 14 M4", image: macbookProImg, base: 2400000, rating: 4.9,
    description: "The MacBook Pro 14-inch with M4 brings professional power into a more portable form. The compact Liquid Retina XDR display is just as stunning as the 16-inch — ProMotion 120Hz, 1600 nits peak, exceptional colour accuracy. The M4 chip delivers desktop-level performance across video editing, code compilation, and AI inference, all while providing up to 22 hours of battery life. At 1.55 kg, this is a professional laptop you can genuinely carry all day and use all day.",
    specs: {
      "Display": "14.2\" Liquid Retina XDR, 3024×1964, ProMotion 120Hz, 1600 nits peak",
      "Processor": "Apple M4 / M4 Pro / M4 Max — up to 14-core CPU",
      "RAM": "16 GB / 24 GB / 48 GB / 96 GB unified memory",
      "Storage": "512 GB / 1 TB / 2 TB / 4 TB SSD",
      "Ports": "3× Thunderbolt 4, HDMI 2.1, SD card, MagSafe 3, 3.5mm",
      "Battery": "72.4 Wh — up to 22 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3",
      "Operating System": "macOS Sequoia",
      "Weight": "1.55 kg",
    },
  },
  {
    brand: "Apple", model: "MacBook Air 15 M3", image: macbookAirImg, base: 1800000, rating: 4.9,
    description: "The MacBook Air 15-inch with M3 is the best large-screen thin-and-light laptop on the market. Its 15.3-inch Liquid Retina display offers a spacious canvas for creative work and multitasking inside the world's thinnest 15-inch laptop. The M3 chip handles everyday tasks, photo editing, and light video work with ease, while the completely fanless design keeps it absolutely silent. With up to 18 hours of battery life and instant wake from sleep, it is always ready when you are.",
    specs: {
      "Display": "15.3\" Liquid Retina IPS, 2880×1864, 224 ppi, 500 nits",
      "Processor": "Apple M3 — 8-core CPU, 10-core GPU",
      "RAM": "8 GB / 16 GB / 24 GB unified memory",
      "Storage": "256 GB / 512 GB / 1 TB / 2 TB SSD",
      "Ports": "2× Thunderbolt 3, MagSafe 3, 3.5mm",
      "Battery": "66.5 Wh — up to 18 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3",
      "Operating System": "macOS Sequoia",
      "Weight": "1.51 kg",
    },
  },
  {
    brand: "Apple", model: "MacBook Air 13 M3", image: macbookAirImg, base: 1400000, rating: 4.8,
    description: "The MacBook Air 13-inch with M3 is the laptop that changed what we expect from portable computers. Featherlight at just 1.24 kg, it slips into any bag yet delivers performance that rivals machines three times its price. The M3 chip is 60% faster than M1 and handles everyday work, creative tasks, and light video editing without breaking a sweat. The fanless design means absolute silence. With MagSafe charging and 18-hour battery life, this remains the benchmark for all other laptops.",
    specs: {
      "Display": "13.6\" Liquid Retina IPS, 2560×1664, 224 ppi, 500 nits",
      "Processor": "Apple M3 — 8-core CPU, 10-core GPU",
      "RAM": "8 GB / 16 GB / 24 GB unified memory",
      "Storage": "256 GB / 512 GB / 1 TB / 2 TB SSD",
      "Ports": "2× Thunderbolt 3, MagSafe 3, 3.5mm",
      "Battery": "52.6 Wh — up to 18 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3",
      "Operating System": "macOS Sequoia",
      "Weight": "1.24 kg",
    },
  },
  {
    brand: "Dell", model: "XPS 15", image: dellXpsImg, base: 2200000, rating: 4.8,
    description: "The Dell XPS 15 is the premier Windows laptop for creative professionals who refuse to compromise. An edge-to-edge 15.6-inch OLED display with near-zero bezels delivers stunning 3.5K resolution with DCI-P3 wide colour and 400 nits brightness. Intel Core Ultra processors paired with NVIDIA GeForce RTX graphics power video editing, 3D rendering, and gaming without thermal throttling. CNC-machined aluminium and carbon fibre construction feel as premium as the spec sheet. A creative powerhouse for demanding professionals.",
    specs: {
      "Display": "15.6\" OLED / IPS, up to 3456×2160, 60/120Hz, 100% DCI-P3",
      "Processor": "Intel Core Ultra 5 / 7 (Meteor Lake)",
      "RAM": "16 GB / 32 GB / 64 GB DDR5",
      "Storage": "512 GB / 1 TB / 2 TB NVMe SSD",
      "GPU": "Intel Iris Xe / NVIDIA GeForce RTX 4060–4070 Laptop",
      "Ports": "2× Thunderbolt 4, USB-A, SD card, 3.5mm",
      "Battery": "86 Wh — up to 13 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.4",
      "Operating System": "Windows 11 Home / Pro",
      "Weight": "1.86 kg",
    },
  },
  {
    brand: "Dell", model: "XPS 13", image: dellXpsImg, base: 1500000, rating: 4.7,
    description: "The Dell XPS 13 has earned its reputation as the gold standard for compact premium laptops. Virtually bezel-free, the 13.4-inch InfinityEdge display dominates the lid while the laptop fits into a smaller footprint than most 12-inch machines. Intel Core Ultra processors deliver excellent everyday performance, and up to 64 GB LPDDR5 RAM with Thunderbolt 4 make it a serious productivity tool. Available in FHD+, OLED, or touch variants — all delivering stunning clarity in a truly pocket-friendly form.",
    specs: {
      "Display": "13.4\" IPS / OLED, up to 2800×1800, 60/120Hz, touch optional",
      "Processor": "Intel Core Ultra 5 / 7 (Meteor Lake)",
      "RAM": "16 GB / 32 GB / 64 GB LPDDR5",
      "Storage": "512 GB / 1 TB / 2 TB NVMe SSD",
      "Ports": "2× Thunderbolt 4, 3.5mm",
      "Battery": "55 Wh — up to 12 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.4",
      "Operating System": "Windows 11 Home / Pro",
      "Weight": "1.17 kg",
    },
  },
  {
    brand: "Dell", model: "Inspiron 15", image: dellXpsImg, base: 750000, rating: 4.4,
    description: "The Dell Inspiron 15 is a dependable workhorse that delivers everything needed for everyday computing at an honest price. Whether for students, home users, or office professionals, the Inspiron 15 handles word processing, spreadsheets, video calls, browsing, and light multimedia without complaint. The 15.6-inch FHD display is comfortable for all-day use, and the full-size keyboard makes extended typing productive. A reliable, well-priced laptop backed by Dell's service network.",
    specs: {
      "Display": "15.6\" IPS FHD, 1920×1080, 60Hz, 250 nits, anti-glare",
      "Processor": "Intel Core i5 / i7 (13th Gen) or AMD Ryzen 5 / 7",
      "RAM": "8 GB / 16 GB DDR4",
      "Storage": "256 GB / 512 GB / 1 TB NVMe SSD",
      "GPU": "Intel Iris Xe / AMD Radeon (integrated)",
      "Ports": "USB-A ×2, USB-C, HDMI, SD card, 3.5mm",
      "Battery": "54 Wh — up to 8 hours",
      "Connectivity": "Wi-Fi 5 / 6, Bluetooth 5.0",
      "Operating System": "Windows 11 Home",
      "Weight": "1.68 kg",
    },
  },
  {
    brand: "HP", model: "Spectre x360", image: hpSpectreImg, base: 1800000, rating: 4.7,
    description: "The HP Spectre x360 is HP's crown jewel — a 2-in-1 convertible that flips and folds to adapt to how you work. The stunning OLED display with optional HP Sure View privacy screen works in laptop, tent, display, and full tablet mode. Intel EVO-certified with Core Ultra processors, it delivers fast, responsive performance with all-day battery life. The premium CNC-machined chassis with gem-cut chamfered edges makes it one of the most beautiful Windows laptops ever made. HP Tilt Pen included.",
    specs: {
      "Display": "14\" / 16\" OLED / IPS, up to 2880×1800, 120Hz, touch",
      "Processor": "Intel Core Ultra 5 / 7 (Meteor Lake) — Intel EVO certified",
      "RAM": "16 GB / 32 GB LPDDR5",
      "Storage": "512 GB / 1 TB / 2 TB NVMe SSD",
      "Ports": "2× Thunderbolt 4, USB-A, HDMI 2.1, microSD, 3.5mm",
      "Battery": "83 Wh — up to 17 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.4",
      "Operating System": "Windows 11 Home",
      "Form Factor": "360° convertible 2-in-1 with HP Tilt Pen",
      "Weight": "1.68 kg",
    },
  },
  {
    brand: "HP", model: "EliteBook 840", image: hpSpectreImg, base: 1300000, rating: 4.6,
    description: "The HP EliteBook 840 is a business laptop built for professionals who demand reliability, security, and performance in equal measure. MIL-STD-810H military-grade durability means it survives drops, dust, and extreme temperatures. HP Wolf Security provides enterprise-grade protection at the firmware level including HP Sure Start BIOS and HP Sure Click. Intel vPro capability enables IT remote management. A serious machine for serious business, trusted by corporations worldwide.",
    specs: {
      "Display": "14\" IPS, 1920×1080 / 2560×1600, 60Hz, up to 1000 nits",
      "Processor": "Intel Core Ultra 5 / 7 vPro (Meteor Lake)",
      "RAM": "16 GB / 32 GB / 64 GB DDR5",
      "Storage": "256 GB / 512 GB / 1 TB / 2 TB NVMe SSD",
      "Ports": "2× Thunderbolt 4, 2× USB-A, HDMI 2.0, SD card, 3.5mm",
      "Battery": "53 Wh — up to 14 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3, optional 4G LTE",
      "Operating System": "Windows 11 Pro",
      "Durability": "MIL-STD-810H (12 tests)",
      "Security": "HP Wolf Security, vPro, fingerprint reader, IR camera",
      "Weight": "1.38 kg",
    },
  },
  {
    brand: "HP", model: "Pavilion 15", image: hpSpectreImg, base: 700000, rating: 4.3,
    description: "The HP Pavilion 15 delivers reliable performance for students and everyday users at an accessible price. With a choice of Intel or AMD processors, it handles schoolwork, office tasks, web browsing, and streaming comfortably. The 15.6-inch FHD IPS anti-glare display is easy on the eyes during long sessions. Micro-edge bezels, a full-size keyboard with a number pad, and a wide range of ports make it a practical everyday companion. Excellent value for families and first-time laptop buyers.",
    specs: {
      "Display": "15.6\" IPS FHD, 1920×1080, 60Hz, 250 nits, anti-glare",
      "Processor": "Intel Core i5 / i7 or AMD Ryzen 5 / 7",
      "RAM": "8 GB / 16 GB DDR4",
      "Storage": "256 GB / 512 GB / 1 TB NVMe SSD",
      "GPU": "Intel Iris Xe / AMD Radeon (integrated)",
      "Ports": "USB-A ×2, USB-C, HDMI 1.4b, SD card, 3.5mm",
      "Battery": "41 Wh — up to 8 hours",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.0",
      "Operating System": "Windows 11 Home",
      "Weight": "1.75 kg",
    },
  },
  {
    brand: "Lenovo", model: "ThinkPad X1 Carbon", image: thinkpadImg, base: 2000000, rating: 4.8,
    description: "The Lenovo ThinkPad X1 Carbon is one of the most trusted business laptops in the world — and for good reason. Its ultra-light carbon fibre chassis has carried executives and engineers through gruelling schedules without ever failing. MIL-SPEC tested, completely silent under light load, and featuring the legendary ThinkPad keyboard — arguably the best on any laptop — the X1 Carbon pairs extreme reliability with Intel Core Ultra processors and weighs just 1.12 kg. A professional machine with a decade-long reputation for excellence.",
    specs: {
      "Display": "14\" IPS / OLED, 1920×1200 / 2880×1800, up to 400 nits, anti-glare",
      "Processor": "Intel Core Ultra 5 / 7 vPro (Meteor Lake)",
      "RAM": "16 GB / 32 GB / 64 GB LPDDR5",
      "Storage": "256 GB / 512 GB / 1 TB / 2 TB NVMe SSD",
      "Ports": "2× Thunderbolt 4, 2× USB-A 3.2, HDMI 2.1, 3.5mm",
      "Battery": "57 Wh — up to 15 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3, optional 5G",
      "Operating System": "Windows 11 Pro",
      "Durability": "MIL-STD-810H (12 tests)",
      "Weight": "from 1.12 kg",
    },
  },
  {
    brand: "Lenovo", model: "ThinkPad T14", image: thinkpadImg, base: 1400000, rating: 4.6,
    description: "The Lenovo ThinkPad T14 is the backbone of enterprise computing worldwide — a practical, dependable 14-inch business laptop that gets everything right without unnecessary fuss. Intel and AMD options ensure compatibility with any corporate environment, while vPro and AMD PRO platforms enable IT management. The ThinkPad keyboard, TrackPoint, fingerprint reader, IR camera, and privacy shutter are all present and correct. Ideal for business professionals who need a reliable daily driver built to last for years.",
    specs: {
      "Display": "14\" IPS, 1920×1200 / 2560×1600, 60Hz, 300 nits",
      "Processor": "Intel Core Ultra 5 / 7 or AMD Ryzen 5 / 7 PRO",
      "RAM": "8 GB / 16 GB / 32 GB / 48 GB DDR5",
      "Storage": "256 GB / 512 GB / 1 TB NVMe SSD",
      "Ports": "2× Thunderbolt 4, 2× USB-A, HDMI 2.0, SD card, 3.5mm",
      "Battery": "52.5 Wh — up to 14 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3",
      "Operating System": "Windows 11 Pro",
      "Security": "Fingerprint reader, IR camera, privacy shutter",
      "Weight": "1.39 kg",
    },
  },
  {
    brand: "Lenovo", model: "IdeaPad Slim 5", image: thinkpadImg, base: 650000, rating: 4.4,
    description: "The Lenovo IdeaPad Slim 5 is the ideal laptop for students and young professionals who want a stylish, capable machine without paying flagship prices. The slim aluminium design looks and feels premium, while FHD or 2.5K display options are bright and accurate for everyday content. The latest Intel Core or AMD Ryzen processors handle university coursework, light creative work, and multitasking with ease. The backlit keyboard and long battery life make it comfortable for full days of study.",
    specs: {
      "Display": "14\" / 16\" IPS, 1920×1080 FHD / 2560×1600 2.5K, 60–90Hz, 300–350 nits",
      "Processor": "Intel Core i5 / i7 (13th Gen) or AMD Ryzen 5 / 7 7000 series",
      "RAM": "8 GB / 16 GB LPDDR5",
      "Storage": "256 GB / 512 GB / 1 TB NVMe SSD",
      "Ports": "USB-A ×2, USB-C (PD), HDMI 2.0, 3.5mm",
      "Battery": "60 Wh — up to 12 hours",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.1",
      "Operating System": "Windows 11 Home",
      "Weight": "1.46 kg",
    },
  },
  {
    brand: "ASUS", model: "ROG Strix G16", image: asusRogImg, base: 1900000, rating: 4.7,
    description: "The ASUS ROG Strix G16 is engineered for one thing: winning. The 16-inch QHD+ display runs at up to 240Hz with 3ms response time — every frame renders with the clarity and speed that gives you a competitive edge. An Intel Core HX or AMD Ryzen HX processor paired with up to NVIDIA GeForce RTX 4090 Laptop GPU and 32 GB DDR5 RAM makes this a portable desktop replacement for the most demanding titles. ROG Intelligent Cooling with MUX Switch unlocks the full GPU headroom for maximum frame rates.",
    specs: {
      "Display": "16\" IPS QHD+, 2560×1600, up to 240Hz, 3ms, 500 nits, 100% DCI-P3",
      "Processor": "Intel Core i9 HX (13th Gen) or AMD Ryzen 9 HX",
      "RAM": "16 GB / 32 GB DDR5-4800",
      "Storage": "512 GB / 1 TB / 2 TB NVMe SSD (PCIe 4.0)",
      "GPU": "NVIDIA GeForce RTX 4070–4090 Laptop",
      "Ports": "2× USB-A 3.2, USB-C (PD), HDMI 2.1, 3.5mm, RJ-45",
      "Battery": "90 Wh",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3",
      "Operating System": "Windows 11 Home",
      "RGB": "Per-key Aura Sync RGB keyboard",
      "Weight": "2.3 kg",
    },
  },
  {
    brand: "ASUS", model: "ZenBook 14", image: dellXpsImg, base: 1100000, rating: 4.5,
    description: "The ASUS ZenBook 14 brings effortless performance to a travel-friendly form. The compact 14-inch OLED display with 2.8K resolution is extraordinary for its size — vivid, pin-sharp, and calibrated for professional colour accuracy. Intel Core Ultra processing with Intel Arc graphics handles productivity, light creative work, and casual gaming at comfortable frame rates. The ASUS ErgoSense keyboard, NumberPad 2.0 built into the touchpad, and a starting weight of 1.39 kg make it ideal for professionals always on the move.",
    specs: {
      "Display": "14\" OLED, 2880×1800 2.8K, 60/90Hz, 550 nits, 100% DCI-P3",
      "Processor": "Intel Core Ultra 5 / 7 (Meteor Lake) with Intel Arc Graphics",
      "RAM": "16 GB / 32 GB LPDDR5",
      "Storage": "512 GB / 1 TB NVMe SSD",
      "Ports": "2× Thunderbolt 4, USB-A, HDMI 2.1, 3.5mm",
      "Battery": "75 Wh — up to 14 hours",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.3",
      "Operating System": "Windows 11 Home / Pro",
      "Feature": "ASUS NumberPad 2.0 in touchpad",
      "Weight": "1.39 kg",
    },
  },
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
  {
    brand: "Apple", model: "Watch Series 10", image: appleWatchImg, base: 550000, rating: 4.9,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/apple-watch-series10.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-series10-4.jpg" },
    ],
    description: "The Apple Watch Series 10 is the thinnest Apple Watch ever, featuring a larger display than any previous model while being notably lighter on the wrist. Jet Black polished aluminium makes it feel as premium as much more expensive timepieces. Sleep apnea detection is a first for Apple Watch — monitoring your breathing across multiple nights for early warning signs. The always-on Retina display is 40% brighter than Series 8. Water-resistant to 50 metres with fast water ejection for swimmers.",
    specs: {
      "Display": "Always-on LTPO3 OLED Retina, up to 2000 nits",
      "Processor": "Apple S10 SiP",
      "Storage": "32 GB",
      "Case": "46mm / 42mm aluminium or titanium",
      "Sensors": "Heart rate, ECG, SpO2, skin temperature, accelerometer, gyroscope, altimeter",
      "Health": "Sleep apnea detection, Crash Detection, Fall Detection, Emergency SOS",
      "Battery": "Up to 18 hours (36 hours Low Power Mode)",
      "Connectivity": "Bluetooth 5.3, Wi-Fi 802.11n, NFC, optional LTE",
      "Water Resistance": "50 metres WR",
      "Operating System": "watchOS 11",
    },
  },
  {
    brand: "Apple", model: "Watch Ultra 2", image: appleWatchImg, base: 950000, rating: 4.9,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/apple-watch-ultra2.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-ultra2-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-ultra2-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-ultra2-3.jpg" },
    ],
    description: "The Apple Watch Ultra 2 is built for athletes and adventurers who push beyond conventional limits. A Grade 5 titanium case with sapphire crystal is rated to 100 metres water resistance — more than any other Apple Watch. Precision dual-frequency GPS acquires satellite signals three times faster for accurate navigation in remote terrain. The 2000-nit peak brightness display is readable in direct sunlight. An extended 60-hour battery life in Low Power Mode means it is there for every ultramarathon, alpine summit, and deep dive.",
    specs: {
      "Display": "Always-on LTPO3 OLED Retina, 49mm, 2000 nits peak",
      "Processor": "Apple S9 SiP with 64-bit dual-core CPU",
      "Storage": "64 GB",
      "Case": "49mm Grade 5 titanium with flat sapphire crystal",
      "Sensors": "Dual-freq L1+L5 GPS, heart rate, ECG, SpO2, depth gauge, water temperature",
      "Health": "Crash Detection, Fall Detection, Emergency SOS, satellite SOS",
      "Battery": "36 hours (60 hours Low Power Mode)",
      "Connectivity": "Bluetooth 5.3, Wi-Fi 802.11n, NFC, LTE",
      "Water Resistance": "100 metres (ISO 22810 + EN 13319 dive)",
      "Operating System": "watchOS 11",
    },
  },
  {
    brand: "Apple", model: "Watch SE", image: appleWatchImg, base: 320000, rating: 4.7,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/apple-watch-8se-2022.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-8se-2022-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-8se-2022-2.jpg" },
    ],
    description: "The Apple Watch SE is the most affordable way to experience Apple Watch — and it does not feel like a compromise. Crash Detection and Fall Detection are life-saving features that make the SE especially valuable for older family members living independently. Family Setup lets parents manage the watch for children without an iPhone. Heart rate monitoring, sleep tracking, and activity rings keep you moving every day. A fantastic entry point to the Apple Watch ecosystem at an accessible price.",
    specs: {
      "Display": "Retina LTPO OLED, 1000 nits",
      "Processor": "Apple S8 SiP",
      "Storage": "32 GB",
      "Case": "40mm / 44mm aluminium",
      "Sensors": "Heart rate, accelerometer, gyroscope, altimeter, compass",
      "Health": "Crash Detection, Fall Detection, Emergency SOS",
      "Battery": "Up to 18 hours",
      "Connectivity": "Bluetooth 5.0, Wi-Fi 802.11n, NFC, optional LTE",
      "Water Resistance": "50 metres WR",
      "Operating System": "watchOS 11",
    },
  },
  {
    brand: "Samsung", model: "Galaxy Watch 7", image: galaxyWatchImg, base: 420000, rating: 4.7,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch7.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch7-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch7-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch7-4.jpg" },
    ],
    description: "The Samsung Galaxy Watch 7 advances health monitoring to a new level with the industry-first BioActive Sensor 3.0 — combining advanced PPG, electrical heart signals, and bioelectrical impedance for the most complete health picture in a consumer smartwatch. Real-time sleep coaching, personalised training plans powered by Galaxy AI, and Energy Score tracking help you understand and optimise your body across sleep, exercise, and recovery. Up to 40 hours battery and MIL-STD-810H certified.",
    specs: {
      "Display": "Super AMOLED, 40mm: 1.47\" / 44mm: 1.5\", sapphire crystal",
      "Processor": "Exynos W1000 — 3nm 5-core",
      "RAM": "2 GB",
      "Storage": "32 GB",
      "Sensors": "BioActive Sensor 3.0 (PPG, ECG, BIA), accelerometer, gyroscope, barometer",
      "Health": "Blood pressure, body composition, sleep coaching, irregular rhythm notification",
      "Battery": "300 mAh / 425 mAh — up to 40 hours",
      "Connectivity": "Bluetooth 5.3, Wi-Fi 2.4/5GHz, NFC, optional LTE",
      "Water Resistance": "5 ATM + IP68, MIL-STD-810H",
      "Operating System": "Wear OS 5.0 + One UI Watch 6",
    },
  },
  {
    brand: "Samsung", model: "Galaxy Watch Ultra", image: galaxyWatchImg, base: 780000, rating: 4.8,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch-ultra.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch-ultra-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch-ultra-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-watch-ultra-3.jpg" },
    ],
    description: "The Samsung Galaxy Watch Ultra is the company's most rugged and capable smartwatch, designed for serious athletes and outdoor adventurers. The 47mm titanium frame with a distinctive square face and double-curved display is Samsung's boldest watch design — unmistakably premium. MIL-STD-810H rated with 10 ATM water resistance, it tracks over 100 exercise types with precision. Galaxy AI delivers personalised health insights. The fastest-charging Galaxy smartwatch ever reaches 45% in just 30 minutes.",
    specs: {
      "Display": "1.47\" Super AMOLED, 480×480, sapphire crystal, 3000 nits",
      "Processor": "Exynos W1000 — 3nm 5-core",
      "RAM": "2 GB",
      "Storage": "32 GB",
      "Sensors": "BioActive Sensor 3.0, accelerometer, gyroscope, barometer, thermometer",
      "Health": "ECG, blood pressure, body composition, GPS L1+L5, emergency siren",
      "Battery": "590 mAh — up to 60 hours (Power Save mode)",
      "Connectivity": "Bluetooth 5.3, Wi-Fi 6, NFC, LTE",
      "Water Resistance": "10 ATM + IP68, MIL-STD-810H",
      "Operating System": "Wear OS 5.0 + One UI Watch 6.1",
    },
  },
  {
    brand: "Samsung", model: "Galaxy Fit 3", image: xiaomiBandImg, base: 90000, rating: 4.4,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-fit3.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-fit3-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-fit3-2.jpg" },
    ],
    description: "The Samsung Galaxy Fit 3 is the most stylish fitness band Samsung has made — featuring a 1.6-inch AMOLED display in a slim metal body that looks more like a smartwatch than a tracker. It monitors over 100 workout modes, tracks sleep stages, and delivers up to 13 days of battery life in a swimproof wearable you can wear 24/7. Real-time heart rate alerts and SpO2 monitoring keep an eye on your health throughout the day. Comprehensive health tracking at an accessible price.",
    specs: {
      "Display": "1.6\" Super AMOLED, 256×402, always-on option",
      "Storage": "256 MB",
      "Sensors": "Accelerometer, gyroscope, optical heart rate, SpO2",
      "Health": "Heart rate, blood oxygen, sleep tracking, stress monitoring, 100+ workouts",
      "Battery": "208 mAh — up to 13 days",
      "Connectivity": "Bluetooth 5.0",
      "Water Resistance": "5 ATM",
      "Operating System": "RTOS",
      "Compatibility": "Android 6.0+",
    },
  },
  {
    brand: "Huawei", model: "Watch GT 4", image: huaweiWatchImg, base: 280000, rating: 4.6,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/huawei-watch-gt-4.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-watch-gt-4-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-watch-gt-4-2.jpg" },
      { label: "Angle View", src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-watch-gt-4-3.jpg" },
    ],
    description: "The Huawei Watch GT 4 combines extraordinary battery life with comprehensive health monitoring in an elegant circular design. Huawei TruSeen 5.5+ optical sensing continuously tracks heart rate, SpO2, skin temperature, and stress throughout the day. The AMOLED display with sapphire glass surpasses most watches in clarity and brightness. With up to 14 days of battery life — or 7 days with GPS active — the GT 4 outlasts virtually every comparable smartwatch on the market.",
    specs: {
      "Display": "1.43\" / 1.32\" AMOLED, 466×466, sapphire glass, 1000 nits",
      "Processor": "Kirin A2",
      "Storage": "4 GB",
      "Sensors": "TruSeen 5.5+ PPG, ECG, accelerometer, gyroscope, barometer, thermometer",
      "Health": "Heart rate, SpO2, blood pressure, ECG, sleep stages, stress",
      "GPS": "L1 + L5 dual-frequency GPS",
      "Battery": "524 mAh (46mm) — up to 14 days",
      "Connectivity": "Bluetooth 5.2, NFC",
      "Water Resistance": "5 ATM",
      "Operating System": "HarmonyOS 4",
    },
  },
  {
    brand: "Huawei", model: "Watch Fit 3", image: xiaomiBandImg, base: 130000, rating: 4.4,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/huawei-watch-fit-3.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-watch-fit-3-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-watch-fit-3-2.jpg" },
    ],
    description: "The Huawei Watch Fit 3 brings a sporty square design with a large 1.82-inch AMOLED display to the fitness tracker segment. Advanced workout auto-detection starts tracking automatically, and built-in GPS accurately logs outdoor runs, hikes, and cycles. Over 100 workout modes, continuous heart rate monitoring, and SpO2 tracking are complemented by a comfortable strap that is easy to swap. Up to 10 days of battery life makes it a true set-and-forget health companion.",
    specs: {
      "Display": "1.82\" AMOLED, 390×450, always-on option",
      "Sensors": "Optical heart rate, SpO2, accelerometer, gyroscope, barometer",
      "Health": "Heart rate, blood oxygen, sleep tracking, stress, 100+ workouts",
      "GPS": "Built-in GPS",
      "Battery": "370 mAh — up to 10 days",
      "Connectivity": "Bluetooth 5.0",
      "Water Resistance": "5 ATM",
      "Operating System": "LiteOS",
    },
  },
  {
    brand: "Xiaomi", model: "Smart Band 8", image: xiaomiBandImg, base: 55000, rating: 4.3,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-smart-band-8.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-smart-band-8-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-smart-band-8-2.jpg" },
    ],
    description: "The Xiaomi Smart Band 8 is the most feature-packed fitness band at its price — AMOLED display, 16-day battery life, and comprehensive health tracking in a band that costs less than dinner. The 1.62-inch AMOLED display is bright and readable in sunlight. Over 150 sports modes, continuous heart rate and SpO2 monitoring, and sleep stage tracking give you actionable health data without the cost of a smartwatch. Available in multiple strap colours. The easiest health upgrade for your lifestyle.",
    specs: {
      "Display": "1.62\" AMOLED, 192×490, 600 nits",
      "Sensors": "Optical heart rate, SpO2, accelerometer, gyroscope",
      "Health": "Heart rate, blood oxygen, sleep tracking, stress, 150+ sports modes",
      "Battery": "190 mAh — up to 16 days",
      "Connectivity": "Bluetooth 5.2",
      "Water Resistance": "5 ATM",
      "Compatibility": "Android 6.0+ / iOS 10.0+",
    },
  },
  {
    brand: "Xiaomi", model: "Watch S3", image: huaweiWatchImg, base: 180000, rating: 4.4,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-watch-s3.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-watch-s3-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-watch-s3-2.jpg" },
    ],
    description: "The Xiaomi Watch S3 features a unique interchangeable bezel system — swap the bezel ring to completely transform the look of the watch in seconds, giving you versatility across every occasion from the gym to the boardroom. The 1.43-inch AMOLED display with sapphire glass is bright and durable. HyperOS provides fluid health monitoring, GPS navigation, and app support. With 15-day battery life, dual-band GPS, and 5 ATM water resistance, the Watch S3 is a compelling stylish alternative to more expensive smartwatches.",
    specs: {
      "Display": "1.43\" AMOLED, 466×466, sapphire glass, 600 nits",
      "RAM": "2 GB",
      "Storage": "32 GB",
      "Sensors": "Optical heart rate, SpO2, ECG, accelerometer, gyroscope, barometer, thermometer",
      "Health": "Heart rate, blood oxygen, ECG, sleep tracking, stress monitoring",
      "GPS": "L1 + L5 dual-band GPS",
      "Battery": "486 mAh — up to 15 days",
      "Connectivity": "Bluetooth 5.2, Wi-Fi 2.4GHz, NFC",
      "Water Resistance": "5 ATM",
      "Feature": "Interchangeable bezel system",
    },
  },
  {
    brand: "Garmin", model: "Fenix 7", image: garminImg, base: 850000, rating: 4.8,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/garmin-fenix-7.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/garmin/garmin-fenix-7-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/garmin/garmin-fenix-7-2.jpg" },
    ],
    description: "The Garmin Fenix 7 is the gold standard for outdoor adventure smartwatches — worn by endurance athletes, mountaineers, trail runners, and expeditions that require a watch that never fails. The solar-charging lens extends battery life to an extraordinary 57 days in smartwatch mode. Multi-band GPS with TopoActive maps provides turn-by-turn navigation in the most remote terrain. Advanced training metrics — Training Readiness, Body Battery, HRV Status — keep you performing at your peak. Built from stainless steel and sapphire crystal for a lifetime of use.",
    specs: {
      "Display": "1.3\" MIP transreflective, 260×260, sunlight-readable",
      "Storage": "32 GB (maps)",
      "Sensors": "Multi-band GPS (L1+L5), heart rate, SpO2, barometer, compass, gyroscope, thermometer",
      "Health": "Body Battery, HRV Status, Training Readiness, VO2 Max, sleep tracking",
      "Battery": "Up to 18 days standard / 57 days solar smartwatch mode",
      "Connectivity": "Bluetooth 5.0, ANT+, Wi-Fi",
      "Water Resistance": "10 ATM",
      "Navigation": "TopoActive maps, turn-by-turn navigation",
      "Weight": "79 g (stainless)",
    },
  },
  {
    brand: "Garmin", model: "Forerunner 265", image: garminImg, base: 480000, rating: 4.7,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/garmin-forerunner-265.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/garmin/garmin-forerunner-265-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/garmin/garmin-forerunner-265-2.jpg" },
    ],
    description: "The Garmin Forerunner 265 is the definitive running smartwatch — scientifically designed to help you run better, recover smarter, and perform longer. The first Forerunner with an AMOLED display combines beautiful all-day aesthetics with precision sports performance. Training Readiness assesses your sleep, recovery, load, and stress to give a daily score telling you exactly how hard to push. Pace Pro with ClimbPro helps you execute race strategy perfectly. Up to 13 days battery in smartwatch mode, 20 hours GPS.",
    specs: {
      "Display": "1.3\" AMOLED, 416×416, always-on option, 1000 nits",
      "Storage": "4 GB",
      "Sensors": "Multi-band GPS (L1+L5), heart rate, pulse oximeter, barometer, compass, gyroscope",
      "Health": "VO2 Max, Training Readiness, Body Battery, HRV Status, sleep, recovery time",
      "Battery": "Up to 13 days smartwatch / 20 hours GPS",
      "Connectivity": "Bluetooth, ANT+, Wi-Fi",
      "Water Resistance": "5 ATM",
      "Weight": "47 g",
    },
  },
  {
    brand: "Amazfit", model: "GTR 4", image: huaweiWatchImg, base: 160000, rating: 4.4,
    gallery: [
      { label: "Front View", src: "https://fdn2.gsmarena.com/vv/bigpic/amazfit-gtr-4.jpg" },
      { label: "Side View",  src: "https://fdn2.gsmarena.com/vv/pics/amazfit/amazfit-gtr-4-1.jpg" },
      { label: "Back View",  src: "https://fdn2.gsmarena.com/vv/pics/amazfit/amazfit-gtr-4-2.jpg" },
    ],
    description: "The Amazfit GTR 4 packages serious smartwatch features into a classic round case at a fraction of competitor prices. The 1.43-inch AMOLED display with a traditional round dial looks premium on the wrist. Zepp OS provides a growing ecosystem of apps, watch faces, and Zepp Coach AI-powered fitness plans. Dual-band GPS with 150+ sports modes and continuous health monitoring covering heart rate, SpO2, stress, and sleep make it remarkably comprehensive. Up to 14 days of battery life seals the deal.",
    specs: {
      "Display": "1.43\" AMOLED, 466×466, 1000 nits, anti-fingerprint coating",
      "RAM": "1 GB",
      "Storage": "2.3 GB",
      "Sensors": "BioTracker 4.0 PPG, accelerometer, gyroscope, barometer, geomagnetic, ambient light",
      "Health": "Heart rate, SpO2, stress, sleep tracking, PAI health assessment",
      "GPS": "Dual-band GPS (L1+L5), GLONASS, Galileo, BeiDou",
      "Battery": "475 mAh — up to 14 days smartwatch",
      "Connectivity": "Bluetooth 5.0, Wi-Fi 2.4GHz",
      "Water Resistance": "5 ATM",
    },
  },
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
  {
    brand: "Apple", model: "20W USB-C Adapter", image: chargerImg, base: 25000, rating: 4.7,
    description: "The Apple 20W USB-C Power Adapter is the fastest single-port charger for iPhone and AirPods. Compatible with all USB-C devices, it delivers 20W of power to charge iPhone 15 to 50% in around 30 minutes when paired with a USB-C cable. Compact enough to slip into any pocket, the fold-flat plug makes it ideal for travel. Genuine Apple quality ensures reliable charging without overheating or damaging your device.",
    specs: {
      "Output": "20W (9V/2.2A, 5V/3A)",
      "Connector": "USB-C",
      "Compatibility": "iPhone, iPad, AirPods, MacBook (low wattage), all USB-C devices",
      "Plug": "Fold-flat (UK adapter)",
      "Colour": "White",
      "Dimensions": "45 × 45 × 29 mm",
      "Weight": "42 g",
    },
  },
  {
    brand: "Apple", model: "USB-C to Lightning Cable", image: cableImg, base: 18000, rating: 4.6,
    description: "The Apple USB-C to Lightning Cable is the essential connection between your Lightning iPhone and modern USB-C chargers or MacBooks. Woven nylon braid provides durability far beyond the standard cable, resisting fraying and tangling through years of daily use. MFi-certified, ensuring compatibility with all Apple accessories and preventing the charging errors seen with uncertified cables. Available in 1 m and 2 m lengths.",
    specs: {
      "Connector 1": "USB-C",
      "Connector 2": "Lightning",
      "Length": "1 m / 2 m",
      "Construction": "Braided nylon",
      "Certification": "MFi-certified (Made for iPhone)",
      "Compatibility": "iPhone up to iPhone 14 series, AirPods with Lightning case",
    },
  },
  {
    brand: "Apple", model: "AirPods Pro 2", image: airpodsImg, base: 380000, rating: 4.9,
    description: "The AirPods Pro 2 are the best earbuds Apple has ever made, combining Active Noise Cancellation twice as powerful as the original Pro with a Transparency mode so natural you will forget you are wearing earbuds. The Apple H2 chip delivers incredibly low latency for video and gaming. Adaptive Audio blends ANC and Transparency dynamically based on your environment. Up to 6 hours per charge and 30 hours total with the MagSafe case. IP54 rated dust and water resistance protects earbuds and case alike.",
    specs: {
      "Chip": "Apple H2",
      "ANC": "Adaptive Active Noise Cancellation (2× AirPods Pro 1st gen)",
      "Modes": "ANC, Adaptive Transparency, Off",
      "Audio": "Personalised Spatial Audio, Adaptive EQ",
      "Battery": "6 hours per earbud / 30 hours total with case",
      "Connectivity": "Bluetooth 5.3",
      "Case Charging": "USB-C / MagSafe / Qi",
      "Water Resistance": "IP54 (earbuds + case)",
      "Health": "Hearing health features, volume monitoring",
    },
  },
  {
    brand: "Apple", model: "AirPods 4", image: airpodsImg, base: 220000, rating: 4.7,
    description: "The AirPods 4 are the most advanced standard AirPods ever made with a completely redesigned fit that works without ear tips across a wider range of ear shapes. Active Noise Cancellation is now available on standard AirPods for the first time. The H2 chip delivers improved audio with richer bass and cleaner highs. At just 20 g per earbud they are lighter than any previous AirPods. With USB-C case and up to 5 hours listening per charge, AirPods 4 are the wireless earbuds for everyday life.",
    specs: {
      "Chip": "Apple H2",
      "ANC": "Optional (AirPods 4 with ANC model)",
      "Audio": "Personalised Spatial Audio, Adaptive EQ",
      "Battery": "5 hours per earbud / 30 hours total with case",
      "Connectivity": "Bluetooth 5.3",
      "Case Charging": "USB-C / Qi wireless (ANC model)",
      "Water Resistance": "IPX4 (earbuds) / IPX4 case (ANC model)",
      "Fit": "Open-ear — no ear tips required",
      "Weight": "20 g per earbud",
    },
  },
  {
    brand: "Samsung", model: "25W Super Fast Charger", image: chargerImg, base: 22000, rating: 4.5,
    description: "The Samsung 25W Super Fast Charger is engineered to get your Galaxy phone from empty to 50% in around 30 minutes. USB-C with Adaptive Fast Charging delivers 25W to compatible Galaxy devices while being smart enough to provide safe, efficient charging to any USB-C device. The compact travel-friendly design folds flat and includes built-in protections against overheating, overcurrent, and overvoltage. The essential charger for any Galaxy S, A, or Z series phone.",
    specs: {
      "Output": "25W (9V/2.77A, 5V/3A)",
      "Connector": "USB-C",
      "Technology": "Samsung Adaptive Fast Charging (AFC), PD 3.0",
      "Compatibility": "Galaxy S/A/Z series and all USB-C devices",
      "Protections": "Overtemperature, overcurrent, overvoltage",
      "Weight": "55 g",
    },
  },
  {
    brand: "Samsung", model: "Galaxy Buds FE", image: airpodsImg, base: 95000, rating: 4.5,
    description: "The Samsung Galaxy Buds FE (Fan Edition) brings Galaxy audio quality and Active Noise Cancellation to a more accessible price. The large 11 mm dynamic driver delivers rich, punchy sound that belies the price. ANC powered by three microphones blocks out ambient noise effectively, while Ambient Sound mode keeps you aware of your surroundings. Two-device simultaneous connection and deep Galaxy Wearable app integration make it the natural companion for any Galaxy phone.",
    specs: {
      "Driver": "11 mm single dynamic",
      "ANC": "Active Noise Cancellation (3-mic)",
      "Codec": "Samsung Scalable, AAC, SBC",
      "Battery": "6 hours per earbud / 21 hours total with case",
      "Connectivity": "Bluetooth 5.2",
      "Water Resistance": "IPX4",
      "Controls": "Touch on stem",
      "Compatibility": "Android 7.0+ / iOS 10.0+",
    },
  },
  {
    brand: "Anker", model: "PowerCore 20000", image: powerbankImg, base: 55000, rating: 4.8,
    description: "The Anker PowerCore 20000 is one of the most trusted power banks in the world. Its enormous 20,000 mAh capacity charges a smartphone almost five times, a tablet once and a half, or keeps multiple devices topped up on extended travel. Two USB-A outputs and one USB-C port allow three devices to charge simultaneously. PowerIQ 3.0 intelligently identifies each device and delivers the fastest possible charge. A portable power station for international travel, camping, and long-haul flights.",
    specs: {
      "Capacity": "20,000 mAh",
      "Input": "USB-C (18W PD)",
      "Output": "USB-A ×2 (12W each) + USB-C (20W PD)",
      "Max Output": "20W (USB-C PD)",
      "Technology": "PowerIQ 3.0, Trickle Charging Mode",
      "Safety": "MultiProtect — surge, temperature, overcharge protection",
      "Recharge Time": "~6.5 hours (18W PD input)",
      "Weight": "356 g",
    },
  },
  {
    brand: "Anker", model: "PowerCore 10000", image: powerbankImg, base: 32000, rating: 4.7,
    description: "The Anker PowerCore 10000 is the perfect everyday carry power bank — slim enough for a shirt pocket, light enough to forget it is there, and powerful enough to fully recharge any smartphone more than twice. USB-C input for quick recharging and USB-A output with PowerIQ 2.0 make it universally compatible. Anker's reputation for safety and reliability is built into every cell and circuit. The ideal companion for a day out without access to a power outlet.",
    specs: {
      "Capacity": "10,000 mAh",
      "Input": "USB-C (18W PD)",
      "Output": "USB-A (12W PowerIQ 2.0)",
      "Technology": "PowerIQ 2.0, VoltageBoost",
      "Safety": "MultiProtect (11 built-in protections)",
      "Recharge Time": "~4.5 hours",
      "Weight": "180 g",
      "Dimensions": "92 × 60 × 22 mm",
    },
  },
  {
    brand: "Anker", model: "Nano 30W Charger", image: chargerImg, base: 28000, rating: 4.6,
    description: "The Anker Nano 30W charger proves that small does not mean slow. This single-port USB-C charger is one-quarter the size of a MacBook charger yet delivers 30W of GaN-powered output — enough to charge a MacBook at moderate speed and a modern iPhone at full speed. ActiveShield technology monitors temperature 3 million times per day and adjusts output to protect your device. Lightweight at just 55 g, it is the ideal compact charger for travel and everyday use.",
    specs: {
      "Output": "30W (PD 3.0, 9V/3A, 5V/3A)",
      "Connector": "USB-C",
      "Technology": "GaN II, Anker ActiveShield temperature monitoring",
      "Compatibility": "iPhone, MacBook (light load), iPad, Android, Nintendo Switch",
      "Dimensions": "40 × 40 × 30 mm",
      "Weight": "55 g",
    },
  },
  {
    brand: "Baseus", model: "GaN 65W Charger", image: chargerImg, base: 35000, rating: 4.5,
    description: "The Baseus GaN 65W charger is a multi-device powerhouse in a palm-sized package. Two USB-C ports and one USB-A port allow simultaneous charging of three devices at once — up to 65W for your laptop, 20W for your phone, and 22.5W for a third device. GaN (Gallium Nitride) technology makes it 40% smaller than traditional chargers at the same wattage. The ideal desktop charger for anyone managing a laptop, phone, and tablet throughout the day.",
    specs: {
      "Total Output": "65W (C1: 45W / C2: 20W / A: 22.5W)",
      "Connectors": "USB-C ×2 + USB-A ×1",
      "Technology": "GaN III, PD 3.0, Quick Charge 4.0",
      "Compatibility": "MacBook, iPad, iPhone, Android, Samsung, laptops up to 65W",
      "Dimensions": "68 × 37 × 37 mm",
      "Weight": "120 g",
    },
  },
  {
    brand: "Belkin", model: "BoostCharge 3-in-1", image: chargerImg, base: 85000, rating: 4.6,
    description: "The Belkin BoostCharge Pro 3-in-1 Wireless Charging Pad with MagSafe charges your iPhone, Apple Watch, and AirPods simultaneously on one surface — no cables required. The MagSafe module snaps magnetically to the back of your iPhone and delivers up to 15W of fast wireless power. The Apple Watch charger maintains fast-charge compatibility. One cable from the wall powers three devices. Belkin's Made for Apple certification guarantees full compatibility.",
    specs: {
      "Compatibility": "iPhone 12–16 (MagSafe), Apple Watch, AirPods",
      "iPhone Output": "Up to 15W (MagSafe)",
      "Apple Watch Output": "Up to 5W fast charge",
      "AirPods Output": "Up to 5W",
      "Connection": "USB-C (adapter included)",
      "Certification": "Made for Apple (MFi)",
      "Material": "Vegan leather / silicone pad",
    },
  },
  {
    brand: "Spigen", model: "Clear Case", image: caseImg, base: 15000, rating: 4.5,
    description: "The Spigen Ultra Hybrid Clear Case is designed to show off your phone's original colour while protecting it from everyday drops and scratches. Military-Grade (MIL-STD-810G) certified drop protection is achieved through a hard PC back and flexible TPU bumper with Air Cushion Technology that absorbs and disperses impact at the corners. Non-yellowing UV-resistant materials maintain crystal clarity for years. Precision cutouts align perfectly with all buttons, cameras, and ports.",
    specs: {
      "Material": "PC back + TPU bumper with Air Cushion Technology",
      "Protection": "MIL-STD-810G tested (up to 1.5 m drops)",
      "Feature": "Non-yellowing UV-resistant coating",
      "Bumper Thickness": "2.5 mm",
      "Compatibility": "iPhone and Samsung (multiple models — specify at purchase)",
      "Weight": "~30–40 g",
    },
  },
  {
    brand: "OtterBox", model: "Defender Case", image: caseImg, base: 45000, rating: 4.7,
    description: "The OtterBox Defender is legendary in the protective case world — a four-layer fortress that has survived construction sites, factory floors, and outdoor adventures. Port covers keep out dust and debris, a built-in screen protector shields against scratches, and a swappable outer slipcover with holster belt clip provides hands-free carry. Drop tested to military standards well beyond MIL-STD-810G. When you need maximum protection, there is no alternative.",
    specs: {
      "Material": "Polycarbonate inner shell + TPE outer shell",
      "Protection": "MIL-STD-810G (3× the military standard drop requirement)",
      "Layers": "4-layer construction",
      "Features": "Built-in screen protector, port covers, belt clip holster",
      "Compatibility": "iPhone and Samsung (multiple models — specify at purchase)",
      "Weight": "~90–120 g",
    },
  },
  {
    brand: "UAG", model: "Monarch Case", image: caseImg, base: 55000, rating: 4.7,
    description: "The UAG Monarch is the flagship of Urban Armor Gear's lineup — a premium case for those who refuse to choose between protection and sophistication. Five layers of honeycomb-patterned armour are wrapped in top-grain leather with metal hardware accents, creating a case that looks as good as it protects. Military-grade MIL-STD-810G drop tested to 4.88 metres. Trusted by armed forces, emergency responders, and business executives worldwide. Available in Carbon Fibre, Kevlar, and Leather finishes.",
    specs: {
      "Material": "Top-grain leather / carbon fibre / Kevlar (varies by finish)",
      "Protection": "MIL-STD-810G (4.88 m drop test)",
      "Layers": "5-layer composite construction",
      "Hardware": "Metal accent screws and buttons",
      "Compatibility": "iPhone 13/14/15/16 Pro / Pro Max, Samsung Galaxy S series",
      "Weight": "~60–80 g",
    },
  },
  {
    brand: "Nillkin", model: "CamShield Case", image: caseImg, base: 18000, rating: 4.4,
    description: "The Nillkin CamShield Case solves the most overlooked privacy problem on modern phones — the rear camera. A built-in sliding mechanism instantly covers or reveals the camera with a satisfying click, preventing unwanted camera access in sensitive environments. The frosted PC back provides grip and a premium matte look that resists fingerprints. Slim, lightweight, and compatible with wireless charging. An elegant, affordable solution for privacy-conscious professionals.",
    specs: {
      "Material": "Frosted PC back + TPU bumper frame",
      "Feature": "Sliding camera shutter cover",
      "Finish": "Matte frosted anti-fingerprint",
      "Wireless Charging": "Compatible",
      "Compatibility": "Multiple iPhone and Samsung models (specify at purchase)",
      "Total Thickness": "~8.5 mm",
      "Weight": "~25–35 g",
    },
  },
  {
    brand: "Amazfit", model: "Tempered Glass", image: screenProtectorImg, base: 8000, rating: 4.4,
    description: "This premium tempered glass screen protector provides 9H hardness protection for your smartphone display — the highest rating possible for tempered glass, resisting keys, coins, and scratches. Anti-fingerprint oleophobic coating keeps the surface clean and smooth. Ultra-thin 0.33 mm profile preserves full touchscreen sensitivity and display clarity. Case-friendly curved edges align precisely with the screen boundary. Easy, bubble-free installation with included alignment frame. Two protectors included per pack.",
    specs: {
      "Hardness": "9H tempered glass",
      "Thickness": "0.33 mm",
      "Coating": "Oleophobic anti-fingerprint + anti-scratch",
      "Transparency": "99.9%",
      "Installation": "Alignment frame included (bubble-free)",
      "Pack Contents": "2× screen protectors",
      "Compatibility": "Multiple iPhone and Samsung models (specify at purchase)",
    },
  },
  {
    brand: "Belkin", model: "InvisiGlass Ultra", image: screenProtectorImg, base: 18000, rating: 4.6,
    description: "Belkin InvisiGlass Ultra is the premium screen protection for users who want the absolute best. Made from aerospace-grade mineral glass — harder and more scratch-resistant than standard tempered glass — it maintains the exceptional colour accuracy and brightness of your display. The oleophobic coating matches the smooth, oil-repellent surface of Apple's own screens, cleaning with a single wipe. Optically matched to the native display for zero distortion. Backed by Belkin's lifetime replacement guarantee.",
    specs: {
      "Material": "Aerospace-grade alumino-silicate mineral glass",
      "Hardness": "9H",
      "Thickness": "0.2 mm",
      "Coating": "Multi-layer oleophobic + anti-scratch",
      "Touch Compatibility": "3D touch / Force Touch compatible",
      "Clarity": "Optically matched to device display",
      "Guarantee": "Lifetime Belkin replacement warranty",
      "Compatibility": "iPhone (multiple models) / iPad",
    },
  },
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
  {
    brand: "Sony", model: "PlayStation 5 Slim", image: ps5Img, base: 850000, rating: 4.9,
    description: "The PlayStation 5 Slim is the smallest, lightest PS5 ever — 30% smaller than the launch model — while delivering identical next-gen performance. The custom AMD RDNA 2 GPU drives games at up to 4K 120fps with hardware ray tracing that transforms lighting in supported titles. The ultra-fast custom NVMe SSD virtually eliminates load screens. Tempest 3D AudioTech creates precise spatial sound without specialist headphones. The DualSense controller's haptic feedback and adaptive triggers add a physical dimension to gameplay unlike anything before it.",
    specs: {
      "CPU": "AMD Zen 2 — 8-core, 3.5 GHz (variable)",
      "GPU": "AMD RDNA 2 — 10.28 TFLOPS, 36 CUs",
      "RAM": "16 GB GDDR6",
      "Storage": "1 TB NVMe SSD (custom)",
      "Optical": "Ultra HD Blu-ray (disc model) / Digital Edition (disc-free)",
      "Resolution": "Up to 4K 120fps, 8K output supported",
      "Ray Tracing": "Hardware-accelerated",
      "Audio": "Tempest 3D AudioTech",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.1, USB-A ×2, USB-C ×1, HDMI 2.1",
    },
  },
  {
    brand: "Sony", model: "PlayStation 5 Pro", image: ps5Img, base: 1200000, rating: 4.9,
    description: "The PlayStation 5 Pro is Sony's most powerful console ever. The upgraded GPU is 45% faster than the base PS5, enabling PlayStation Spectral Super Resolution (PSSR) to upscale games to crisp 4K with AI-powered clarity. More titles run at stable 60 fps or 120 fps than on any previous PlayStation. Wi-Fi 7 ensures lag-free online gaming. The same DualSense controller brings industry-leading haptic feedback and adaptive triggers to your hands. For gamers who demand the absolute best.",
    specs: {
      "CPU": "AMD Zen 2 — 8-core, up to 3.85 GHz",
      "GPU": "AMD RDNA 4 — 33.5 TFLOPS (45% faster than PS5)",
      "RAM": "16 GB GDDR6 (576 GB/s bandwidth)",
      "Storage": "2 TB NVMe SSD (custom)",
      "Resolution": "Up to 4K (PSSR upscaling) / 8K output",
      "Feature": "PlayStation Spectral Super Resolution (PSSR)",
      "Connectivity": "Wi-Fi 7, Bluetooth 5.1, USB-A ×3, USB-C ×1, HDMI 2.1",
      "Release": "November 2024",
    },
  },
  {
    brand: "Sony", model: "DualSense Controller", image: controllerImg, base: 95000, rating: 4.8,
    description: "The Sony DualSense wireless controller redefined what a game controller could be. Haptic feedback replaces simple rumble motors with precise, nuanced sensations — feel the crunch of gravel underfoot, the resistance of a bowstring, the texture of different surfaces. Adaptive triggers physically change resistance mid-game: pulling a heavy bow, braking on ice, firing different weapons — all have unique physical feel. A built-in microphone means you can chat without a headset. Nothing else feels like playing with a DualSense.",
    specs: {
      "Connection": "Wireless Bluetooth 5.1 / USB-C wired",
      "Haptics": "High-fidelity haptic motors (not rumble)",
      "Triggers": "Adaptive triggers with variable resistance (L2/R2)",
      "Touchpad": "Multi-touch clickable touchpad",
      "Motion": "Built-in gyroscope and accelerometer",
      "Microphone": "Built-in + 3.5mm headphone jack",
      "Battery": "Up to 12 hours — USB-C fast charge",
      "Weight": "280 g",
      "Compatibility": "PS5 (full features), PC (partial)",
    },
  },
  {
    brand: "Sony", model: "Pulse 3D Headset", image: headsetImg, base: 180000, rating: 4.7,
    description: "The Sony Pulse 3D wireless headset is designed specifically to work with the PlayStation 5's Tempest 3D AudioTech engine, rendering every sound with true three-dimensional position. Pinpoint enemy footsteps behind you, above you, or approaching from below with uncanny precision. Dual noise-cancelling microphones reduce ambient noise for clear voice chat during multiplayer sessions. The fold-flat design and 12-hour wireless battery make it the natural companion for long gaming sessions.",
    specs: {
      "Audio": "3D Audio (Tempest AudioTech optimised) + Stereo",
      "Driver": "40mm",
      "Microphone": "Dual hidden noise-cancelling microphones",
      "Connection": "USB Wireless Adaptor (2.4GHz) + 3.5mm wired",
      "Battery": "12 hours wireless — USB-C charging",
      "Weight": "295 g",
      "Controls": "Chat/Game volume blend, mic mute",
      "Compatibility": "PS5 (3D audio), PS4 (stereo), PC/Mac (stereo)",
    },
  },
  {
    brand: "Microsoft", model: "Xbox Series X", image: xboxImg, base: 780000, rating: 4.8,
    description: "The Xbox Series X is Microsoft's most powerful console ever — built around a custom AMD processor delivering true 4K gaming at up to 120 fps. The 12 TFLOPS GPU with DirectX 12 Ultimate enables hardware ray tracing for physically accurate lighting. The 1 TB custom NVMe SSD eliminates load screens entirely, and Quick Resume suspends and resumes multiple games simultaneously in seconds. Xbox Game Pass Ultimate provides hundreds of games on day one. Whisper-quiet operation in a compact tower design.",
    specs: {
      "CPU": "Custom AMD Zen 2 — 8-core, 3.8 GHz",
      "GPU": "Custom AMD RDNA 2 — 12 TFLOPS, 52 CUs",
      "RAM": "16 GB GDDR6",
      "Storage": "1 TB Custom NVMe SSD",
      "Optical": "4K UHD Blu-ray",
      "Resolution": "Up to 4K 120fps, 8K capable",
      "Feature": "Quick Resume (multi-game suspend/resume)",
      "Connectivity": "Wi-Fi 5 dual-band, Bluetooth 5.0, USB-A ×3, HDMI 2.1",
    },
  },
  {
    brand: "Microsoft", model: "Xbox Series S", image: xboxImg, base: 450000, rating: 4.6,
    description: "The Xbox Series S is the most compact next-gen console — roughly the size of a paperback book — and the most affordable way to play Xbox games at 1440p with up to 120 fps. Sharing the same CPU as the Series X with a scaled GPU, it delivers a genuine next-gen experience for single-screen gaming. No optical drive keeps costs down; all games download from the Xbox store or stream via Game Pass. Quick Resume switches between multiple games instantly. Perfect for new gamers or a second console.",
    specs: {
      "CPU": "Custom AMD Zen 2 — 8-core, 3.6 GHz",
      "GPU": "Custom AMD RDNA 2 — 4 TFLOPS, 20 CUs",
      "RAM": "10 GB GDDR6",
      "Storage": "512 GB Custom NVMe SSD",
      "Resolution": "1440p / up to 120fps / 4K upscaling",
      "Format": "All-digital (no optical drive)",
      "Feature": "Quick Resume (multi-game suspend/resume)",
      "Connectivity": "Wi-Fi 5, Bluetooth 5.0, USB-A ×3, HDMI 2.1",
    },
  },
  {
    brand: "Microsoft", model: "Xbox Wireless Controller", image: controllerImg, base: 85000, rating: 4.7,
    description: "The Xbox Wireless Controller is the result of years of refinement and feedback from millions of gamers. Textured grip on the back and triggers provides secure control during intense sessions. The Share button captures screenshots and video with a single press. Bluetooth 5.2 connects to Xbox consoles, PC, tablets, phones, and cloud gaming. USB-C charging with up to 40 hours of battery life per charge. The most compatible gaming controller available across every platform.",
    specs: {
      "Connection": "Xbox Wireless (2.4GHz) + Bluetooth 5.2 + USB-C wired",
      "Vibration": "Dual rumble motors + impulse triggers",
      "Grip": "Textured trigger, bumper, and rear grip",
      "Battery": "~40 hours (2× AA) / rechargeable pack optional",
      "Audio": "3.5mm headphone jack",
      "Compatibility": "Xbox Series X|S, Xbox One, PC, Android, iOS",
      "Weight": "287 g",
    },
  },
  {
    brand: "Nintendo", model: "Switch OLED", image: switchImg, base: 480000, rating: 4.8,
    description: "The Nintendo Switch OLED is the premium portable gaming console featuring a vibrant 7-inch OLED screen that makes handheld gaming look extraordinary. Vivid colours and deep blacks bring beloved Nintendo titles — Zelda, Mario Kart, Pokémon, Animal Crossing — to life in your hands. The improved kickstand spans the full width of the console for stable tabletop play, and enhanced audio fills a room. Dock it to your TV for full living room play or undock for instant portable gaming anywhere in Rwanda.",
    specs: {
      "Display": "7\" OLED, 1280×720 handheld / 1080p TV mode",
      "Processor": "NVIDIA Custom Tegra (ARM-based)",
      "RAM": "4 GB",
      "Storage": "64 GB (expandable microSD)",
      "Battery": "4310 mAh — 4.5 to 9 hours",
      "Connectivity": "Wi-Fi 802.11ac, Bluetooth 4.1, USB-C",
      "TV Output": "Up to 1080p via dock",
      "Audio": "Stereo speakers (enhanced)",
      "Weight": "320 g (with Joy-Con)",
    },
  },
  {
    brand: "Nintendo", model: "Switch Lite", image: switchImg, base: 280000, rating: 4.6,
    description: "The Nintendo Switch Lite is a dedicated handheld gaming console built entirely for portable play. Its compact, lightweight form is more comfortable for small hands and long travel sessions. All Nintendo Switch game cards are compatible, and it comes in cheerful colours appealing to players of all ages. Integrated controls provide a solid feel for action games and platformers. At a lower price than Switch OLED, it is the ideal entry point to Nintendo's incredible game library for players who want pure handheld gaming.",
    specs: {
      "Display": "5.5\" IPS LCD, 1280×720",
      "Processor": "NVIDIA Custom Tegra",
      "RAM": "4 GB",
      "Storage": "32 GB (expandable microSD)",
      "Battery": "3570 mAh — 3 to 7 hours",
      "Connectivity": "Wi-Fi 802.11ac, Bluetooth 4.1",
      "Controls": "Integrated (non-detachable)",
      "Game Compatibility": "Nintendo Switch games (handheld-compatible titles)",
      "Weight": "275 g",
    },
  },
  {
    brand: "Meta", model: "Quest 3", image: vrHeadsetImg, base: 650000, rating: 4.7,
    description: "The Meta Quest 3 is the most powerful standalone mixed reality headset available, bridging the virtual and real worlds with full-colour passthrough at 4.3 megapixels per eye. Snapdragon XR2 Gen 2 runs native VR apps and games at resolutions and frame rates that feel genuinely comfortable for extended sessions. Pancake lens technology produces a dramatically slimmer headset than its predecessors. Touch Plus controllers with haptic feedback provide intuitive interaction. Hundreds of games, fitness apps, and social experiences make this the VR headset to get.",
    specs: {
      "Display": "Dual LCD Pancake Lens, 2064×2208 per eye, 90/120Hz, 110° FOV",
      "Processor": "Snapdragon XR2 Gen 2",
      "RAM": "8 GB LPDDR5",
      "Storage": "128 GB / 512 GB",
      "Passthrough": "Full-colour mixed reality (4.3 MP per eye)",
      "Battery": "~2.5 hours active use",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.2, USB-C 3.0",
      "Audio": "Integrated 3D spatial audio",
      "Weight": "515 g",
    },
  },
  {
    brand: "Meta", model: "Quest 3S", image: vrHeadsetImg, base: 420000, rating: 4.6,
    description: "The Meta Quest 3S is the most affordable full-featured mixed reality headset Meta makes — bringing the power of Quest 3 to a lower price with fresnel lenses instead of pancake optics. The same Snapdragon XR2 Gen 2 processor, the same full-colour passthrough, and access to the same vast library of Quest content make the 3S a compelling entry point to standalone VR. Perfect for families and first-time VR users who want the complete mixed reality experience without the Quest 3 price tag.",
    specs: {
      "Display": "Dual LCD Fresnel Lens, 1832×1920 per eye, 90/120Hz, 96° FOV",
      "Processor": "Snapdragon XR2 Gen 2",
      "RAM": "8 GB LPDDR5",
      "Storage": "128 GB / 256 GB",
      "Passthrough": "Full-colour mixed reality",
      "Battery": "~2.5 hours active use",
      "Connectivity": "Wi-Fi 6E, Bluetooth 5.2, USB-C 3.0",
      "Audio": "Integrated spatial audio",
      "Weight": "514 g",
    },
  },
  {
    brand: "Razer", model: "BlackShark V2 Pro", image: headsetImg, base: 220000, rating: 4.7,
    description: "The Razer BlackShark V2 Pro is a professional-grade wireless gaming headset adopted by top esports players worldwide. The TriForce Titanium 50mm driver splits the diaphragm into three zones for independently tuned bass, mid, and treble — delivering audio that is both immersive for gaming and accurate enough for competitive play. The HyperClear Super Wideband microphone captures voice with streaming-quality clarity. 70-hour battery life and Razer's ultra-low-latency 2.4GHz wireless provide freedom without compromise.",
    specs: {
      "Driver": "Razer TriForce Titanium 50mm (3-zone diaphragm)",
      "Microphone": "Razer HyperClear Super Wideband — detachable",
      "Connection": "Razer HyperSpeed Wireless 2.4GHz + Bluetooth 5.2 + 3.5mm",
      "Battery": "Up to 70 hours wireless",
      "Weight": "320 g",
      "Ear Cushions": "Memory foam + breathable mesh",
      "Audio": "THX Spatial Audio (PC software)",
      "Compatibility": "PC, PlayStation (via 3.5mm), mobile",
    },
  },
  {
    brand: "Razer", model: "Kraken V3", image: headsetImg, base: 130000, rating: 4.5,
    description: "The Razer Kraken V3 brings the signature Kraken comfort into the modern era with upgraded TriForce Titanium drivers for the richest, most accurate audio the series has ever produced. Memory foam ear cushions with flow-through HyperSoft material keep ears cool during marathon gaming sessions. The Hypersense haptic motor in the ear cups translates in-game explosions and impacts into physical vibrations for a more immersive experience. USB plug-and-play means no driver installation — just connect and play.",
    specs: {
      "Driver": "Razer TriForce Titanium 50mm",
      "Microphone": "Razer HyperClear Cardioid — retractable",
      "Connection": "USB-A / USB-C",
      "Haptics": "Razer Hypersense haptic feedback",
      "Weight": "325 g",
      "Ear Cushions": "HyperSoft flow-through memory foam",
      "RGB": "Razer Chroma RGB (10-zone)",
      "Compatibility": "PC, Mac (limited), Nintendo Switch (USB-C)",
    },
  },
  {
    brand: "SteelSeries", model: "Arctis Nova 7", image: headsetImg, base: 200000, rating: 4.7,
    description: "The SteelSeries Arctis Nova 7 is the most versatile wireless gaming headset available, simultaneously connecting to two sources — console and PC, or phone and console — via dual-mode wireless and Bluetooth. The Nova Acoustic System redesigns the drivers from the ground up for a wider soundstage and cleaner bass than any previous Arctis. The ClearCast Gen 2 bidirectional microphone delivers broadcast-quality voice clarity. 38 hours of wireless battery life and the legendary Arctis ski goggle suspension headband for all-day comfort.",
    specs: {
      "Driver": "SteelSeries Nova Acoustic 40mm",
      "Microphone": "ClearCast Gen 2 bidirectional — retractable",
      "Connection": "2.4GHz USB-A Wireless + Bluetooth 5.0 + 3.5mm",
      "Multi-Stream": "Simultaneous 2-device connection",
      "Battery": "Up to 38 hours wireless",
      "Weight": "338 g",
      "Headband": "Ski goggle suspension (adjustable)",
      "Compatibility": "PC, PlayStation, Xbox, Nintendo Switch, mobile",
    },
  },
  {
    brand: "Logitech", model: "G Pro Wireless", image: controllerImg, base: 110000, rating: 4.6,
    description: "The Logitech G Pro Wireless was engineered in collaboration with professional esports players who demanded wireless performance without any latency penalty. LIGHTSPEED wireless technology achieves a 1ms report rate — identical to a wired connection — while freeing you from cable drag. The lightweight 133 g shell suits palm, claw, and fingertip grip styles. The HERO 25K sensor tracks at up to 25,600 DPI with zero smoothing, filtering, or acceleration. A mouse that professionals trust on the world's biggest stages.",
    specs: {
      "Sensor": "HERO 25K (25,600 DPI max, 400 IPS, 40G)",
      "Connection": "LIGHTSPEED Wireless 1ms + USB-C wired",
      "Buttons": "6 programmable (including 4 side buttons)",
      "Battery": "Up to 60 hours wireless",
      "Polling Rate": "1000Hz (1ms)",
      "Weight": "133 g (without cable)",
      "Software": "Logitech G HUB",
      "Compatibility": "PC (Windows / macOS)",
    },
  },
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
