import { createServerFn } from '@tanstack/react-start';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

// ─── Business info ────────────────────────────────────────────────────────────
const BIZ = {
  name: 'Hippo Technology',
  fullName: 'Hippo Technology Ltd',
  tagline: 'Premium Electronic Devices Store — Your World, Upgraded',
  phones: ['+250 793 051 054', '+250 788 749 709', '+250 798 464 448'],
  whatsapp: '+250 798 464 448',
  whatsappLink: 'https://wa.me/250798464448',
  email: 'info@hippotech.rw',
  address: 'Tajyire Building, Near Makuza Plaza, Kigali, Rwanda',
  instagram: '@hippotechnologyltd',
  facebook: 'facebook.com/hippotechnologyltd',
  tiktok: 'vm.tiktok.com/ZS9MMny4QCwP5-DBcAo',
  whatsappChannel: 'whatsapp.com/channel/0029Vb5wSRe8aKvLIZH3Le1o',
  delivery: 'Free delivery anywhere in Rwanda within 1–3 business days',
  payment: 'Cash, MTN Mobile Money, or Airtel Money — all paid on delivery',
  returns: '30-day free returns on all products',
  warranty: 'All products are 100% genuine with manufacturer warranty',
  hours: 'Monday – Saturday, 8:00 AM – 6:00 PM',
};

// ─── Product catalogue ────────────────────────────────────────────────────────
type Product = { names: string[]; label: string; price: number; category: string };

const CATALOGUE: Product[] = [
  // Phones
  { names: ['iphone 16 pro max', 'iphone 16 pro', 'iphone 16'], label: 'iPhone 16 Pro Max', price: 1900000, category: 'phones' },
  { names: ['s25 ultra', 'galaxy s25 ultra', 'samsung s25 ultra', 'samsung s25'], label: 'Samsung Galaxy S25 Ultra', price: 1650000, category: 'phones' },
  { names: ['iphone 15'], label: 'iPhone 15 128GB', price: 1250000, category: 'phones' },
  { names: ['iphone 14'], label: 'iPhone 14 128GB', price: 950000, category: 'phones' },
  { names: ['galaxy a55', 'samsung a55', 'a55'], label: 'Samsung Galaxy A55 5G', price: 650000, category: 'phones' },
  { names: ['camon 30', 'tecno camon'], label: 'Tecno Camon 30 Pro', price: 300000, category: 'phones' },
  { names: ['hot 40', 'infinix hot 40', 'infinix'], label: 'Infinix Hot 40 Pro', price: 195000, category: 'phones' },
  // Tablets
  { names: ['ipad pro', 'ipad pro m4'], label: 'Apple iPad Pro M4', price: 1600000, category: 'tablets' },
  { names: ['ipad air', 'ipad air m2'], label: 'Apple iPad Air M2', price: 950000, category: 'tablets' },
  { names: ['ipad mini', 'ipad mini 2024'], label: 'Apple iPad mini', price: 720000, category: 'tablets' },
  { names: ['tab s9 ultra', 'galaxy tab s9 ultra', 'samsung tab s9 ultra'], label: 'Samsung Galaxy Tab S9 Ultra', price: 1400000, category: 'tablets' },
  { names: ['tab s9 fe', 'galaxy tab s9 fe', 'samsung tab s9 fe'], label: 'Samsung Galaxy Tab S9 FE', price: 620000, category: 'tablets' },
  { names: ['tab a9', 'galaxy tab a9', 'samsung tab a9'], label: 'Samsung Galaxy Tab A9+', price: 320000, category: 'tablets' },
  { names: ['xiaomi pad 6', 'pad 6 pro', 'xiaomi pad'], label: 'Xiaomi Pad 6 Pro', price: 480000, category: 'tablets' },
  { names: ['redmi pad', 'redmi pad se'], label: 'Xiaomi Redmi Pad SE', price: 220000, category: 'tablets' },
  { names: ['matepad 11', 'huawei matepad 11'], label: 'Huawei MatePad 11.5', price: 520000, category: 'tablets' },
  { names: ['matepad se', 'huawei matepad se'], label: 'Huawei MatePad SE', price: 280000, category: 'tablets' },
  { names: ['lenovo tab p12', 'tab p12'], label: 'Lenovo Tab P12', price: 450000, category: 'tablets' },
  { names: ['lenovo tab m10', 'tab m10'], label: 'Lenovo Tab M10', price: 180000, category: 'tablets' },
  { names: ['oppo pad', 'pad air 2'], label: 'OPPO Pad Air 2', price: 260000, category: 'tablets' },
  // Laptops
  { names: ['macbook pro 16', 'macbook pro m4 16'], label: 'MacBook Pro 16 M4', price: 3200000, category: 'laptops' },
  { names: ['macbook pro 14', 'macbook pro m4 14', 'macbook pro'], label: 'MacBook Pro 14 M4', price: 2400000, category: 'laptops' },
  { names: ['macbook air 15', 'macbook air m3 15'], label: 'MacBook Air 15 M3', price: 1800000, category: 'laptops' },
  { names: ['macbook air 13', 'macbook air m3', 'macbook air'], label: 'MacBook Air 13 M3', price: 1400000, category: 'laptops' },
  { names: ['xps 15', 'dell xps 15'], label: 'Dell XPS 15', price: 2200000, category: 'laptops' },
  { names: ['xps 13', 'dell xps 13', 'dell xps'], label: 'Dell XPS 13', price: 1500000, category: 'laptops' },
  { names: ['dell inspiron', 'inspiron 15'], label: 'Dell Inspiron 15', price: 750000, category: 'laptops' },
  { names: ['hp spectre', 'spectre x360'], label: 'HP Spectre x360', price: 1800000, category: 'laptops' },
  { names: ['hp elitebook', 'elitebook 840'], label: 'HP EliteBook 840', price: 1300000, category: 'laptops' },
  { names: ['hp pavilion', 'pavilion 15'], label: 'HP Pavilion 15', price: 700000, category: 'laptops' },
  { names: ['thinkpad x1', 'thinkpad x1 carbon', 'lenovo thinkpad'], label: 'Lenovo ThinkPad X1 Carbon', price: 2000000, category: 'laptops' },
  { names: ['thinkpad t14'], label: 'Lenovo ThinkPad T14', price: 1400000, category: 'laptops' },
  { names: ['ideapad', 'ideapad slim', 'lenovo ideapad'], label: 'Lenovo IdeaPad Slim 5', price: 650000, category: 'laptops' },
  { names: ['rog strix', 'asus rog', 'rog g16'], label: 'ASUS ROG Strix G16', price: 1900000, category: 'laptops' },
  { names: ['zenbook', 'asus zenbook'], label: 'ASUS ZenBook 14', price: 1100000, category: 'laptops' },
  // Watches & bands
  { names: ['apple watch series 10', 'watch series 10', 'apple watch 10'], label: 'Apple Watch Series 10', price: 550000, category: 'watches' },
  { names: ['apple watch ultra', 'watch ultra 2'], label: 'Apple Watch Ultra 2', price: 950000, category: 'watches' },
  { names: ['apple watch se', 'watch se'], label: 'Apple Watch SE', price: 320000, category: 'watches' },
  { names: ['galaxy watch 7', 'samsung watch 7'], label: 'Samsung Galaxy Watch 7', price: 420000, category: 'watches' },
  { names: ['galaxy watch ultra', 'samsung watch ultra'], label: 'Samsung Galaxy Watch Ultra', price: 780000, category: 'watches' },
  { names: ['galaxy fit 3', 'samsung fit 3', 'fit3'], label: 'Samsung Galaxy Fit 3', price: 90000, category: 'watches' },
  { names: ['huawei watch gt', 'watch gt 4', 'gt 4'], label: 'Huawei Watch GT 4', price: 280000, category: 'watches' },
  { names: ['huawei watch fit', 'watch fit 3', 'huawei fit'], label: 'Huawei Watch Fit 3', price: 130000, category: 'watches' },
  { names: ['xiaomi band', 'smart band 8', 'mi band'], label: 'Xiaomi Smart Band 8', price: 55000, category: 'watches' },
  { names: ['xiaomi watch', 'watch s3'], label: 'Xiaomi Watch S3', price: 180000, category: 'watches' },
  { names: ['garmin fenix', 'fenix 7'], label: 'Garmin Fenix 7', price: 850000, category: 'watches' },
  { names: ['forerunner', 'garmin forerunner', 'forerunner 265'], label: 'Garmin Forerunner 265', price: 480000, category: 'watches' },
  { names: ['amazfit gtr', 'gtr 4', 'amazfit'], label: 'Amazfit GTR 4', price: 160000, category: 'watches' },
  // Accessories
  { names: ['airpods pro', 'airpods pro 2'], label: 'Apple AirPods Pro 2', price: 380000, category: 'accessories' },
  { names: ['airpods 4', 'airpods'], label: 'Apple AirPods 4', price: 220000, category: 'accessories' },
  { names: ['galaxy buds fe', 'buds fe', 'samsung buds'], label: 'Samsung Galaxy Buds FE', price: 95000, category: 'accessories' },
  { names: ['galaxy buds3', 'buds3 pro', 'galaxy buds 3'], label: 'Samsung Galaxy Buds3 Pro', price: 250000, category: 'accessories' },
  { names: ['anker 20000', 'powercore 20000', 'anker powerbank'], label: 'Anker PowerCore 20000', price: 55000, category: 'accessories' },
  { names: ['anker 10000', 'powercore 10000'], label: 'Anker PowerCore 10000', price: 32000, category: 'accessories' },
  { names: ['anker nano', 'anker 30w', 'anker charger'], label: 'Anker Nano 30W Charger', price: 28000, category: 'accessories' },
  { names: ['baseus gan', 'baseus 65w', 'baseus'], label: 'Baseus GaN 65W Charger', price: 35000, category: 'accessories' },
  { names: ['belkin boost', 'belkin 3-in-1', 'wireless charger'], label: 'Belkin BoostCharge 3-in-1', price: 85000, category: 'accessories' },
  { names: ['otterbox', 'defender case'], label: 'OtterBox Defender Case', price: 45000, category: 'accessories' },
  { names: ['uag', 'uag monarch', 'monarch case'], label: 'UAG Monarch Case', price: 55000, category: 'accessories' },
  { names: ['spigen', 'spigen case'], label: 'Spigen Clear Case', price: 15000, category: 'accessories' },
  // Gaming
  { names: ['ps5 pro', 'playstation 5 pro', 'playstation pro'], label: 'PlayStation 5 Pro', price: 1200000, category: 'gaming' },
  { names: ['ps5', 'ps5 slim', 'playstation 5', 'playstation'], label: 'PlayStation 5 Slim', price: 850000, category: 'gaming' },
  { names: ['dualsense', 'ps5 controller', 'playstation controller'], label: 'Sony DualSense Controller', price: 95000, category: 'gaming' },
  { names: ['xbox series x', 'xbox x'], label: 'Microsoft Xbox Series X', price: 780000, category: 'gaming' },
  { names: ['xbox series s', 'xbox s', 'xbox'], label: 'Microsoft Xbox Series S', price: 450000, category: 'gaming' },
  { names: ['nintendo switch oled', 'switch oled'], label: 'Nintendo Switch OLED', price: 480000, category: 'gaming' },
  { names: ['nintendo switch lite', 'switch lite', 'nintendo switch'], label: 'Nintendo Switch Lite', price: 280000, category: 'gaming' },
  { names: ['meta quest 3', 'quest 3', 'vr headset', 'meta vr'], label: 'Meta Quest 3', price: 650000, category: 'gaming' },
  { names: ['meta quest 3s', 'quest 3s'], label: 'Meta Quest 3S', price: 420000, category: 'gaming' },
  { names: ['razer blackshark', 'blackshark v2'], label: 'Razer BlackShark V2 Pro', price: 220000, category: 'gaming' },
  { names: ['razer kraken', 'kraken v3'], label: 'Razer Kraken V3', price: 130000, category: 'gaming' },
  { names: ['arctis nova', 'steelseries arctis'], label: 'SteelSeries Arctis Nova 7', price: 200000, category: 'gaming' },
  { names: ['logitech g pro', 'g pro wireless'], label: 'Logitech G Pro Wireless', price: 110000, category: 'gaming' },
];

function fmt(n: number) {
  return n.toLocaleString('en-RW') + ' RWF';
}

function matchProduct(q: string): Product | null {
  const lower = q.toLowerCase();
  // Longer name matches first (more specific)
  const sorted = [...CATALOGUE].sort((a, b) => {
    const aMax = Math.max(...a.names.map((n) => n.length));
    const bMax = Math.max(...b.names.map((n) => n.length));
    return bMax - aMax;
  });
  for (const p of sorted) {
    if (p.names.some((n) => lower.includes(n))) return p;
  }
  return null;
}

function byCategory(cat: string): Product[] {
  return CATALOGUE.filter((p) => p.category === cat);
}

function catalogueBlock(cat: string, emoji: string): string {
  const icon: Record<string, string> = {
    phones: '📱',
    tablets: '📱',
    laptops: '💻',
    watches: '⌚',
    accessories: '🎧',
    gaming: '🎮',
  };
  const ic = icon[cat] || emoji;
  return byCategory(cat)
    .map((p) => `${ic} ${p.label} — from ${fmt(p.price)}`)
    .join('\n');
}

function budgetSuggestions(budget: number): Product[] {
  return CATALOGUE.filter((p) => p.price <= budget).sort((a, b) => b.price - a.price).slice(0, 5);
}

// ─── Intent matching ──────────────────────────────────────────────────────────

function buildReply(userText: string): string {
  const q = userText.toLowerCase().trim();

  // ── Greeting ──────────────────────────────────────────────────────────────
  if (q.match(/^(hi|hello|hey|good\s*(morning|afternoon|evening)|salut|muraho|bonjour|oya|yego)\b/i)) {
    return `Hello! 👋 Welcome to ${BIZ.name}!\n\nI'm Hippo, your virtual assistant. I can help you with:\n• 📱 Phones, Tablets & Laptops\n• ⌚ Smartwatches & Accessories\n• 🎮 Gaming gear\n• 🚚 Delivery, payment & returns\n• 📞 Contact & location\n\nWhat are you looking for today?`;
  }

  // ── About / who are you ────────────────────────────────────────────────────
  if (q.match(/who are you|what are you|about (you|hippo|this (site|shop|store|website))|tell me about|your (name|company|shop|store|business)|what is (hippo|this)/i)) {
    return `We are ${BIZ.fullName} 🦛\n\n${BIZ.tagline}.\n\nWe sell 100% genuine electronics — smartphones, tablets, laptops, smartwatches, gaming consoles, accessories and more — with free delivery anywhere in Rwanda.\n\n📍 ${BIZ.address}\n📞 ${BIZ.phones[0]}\n📧 ${BIZ.email}\n\nAll products come with manufacturer warranty and our 30-day free return policy.`;
  }

  // ── Website name ─────────────────────────────────────────────────────────
  if (q.match(/name of (your|this|the) (website|site|shop|store)|website name|site name|shop name/i)) {
    return `Our website is **Hippo Technology** — hippotech.rw 🦛\n\nWe are Rwanda's premium electronics store. You can also find us on:\n• Instagram: ${BIZ.instagram}\n• Facebook: ${BIZ.facebook}\n• WhatsApp Channel: ${BIZ.whatsappChannel}`;
  }

  // ── Specific product price ────────────────────────────────────────────────
  const product = matchProduct(q);
  if (product && q.match(/price|cost|how much|kugura|nishimbuzi|yarangwa/i)) {
    return `The ${product.label} starts at **${fmt(product.price)}** 🏷️\n\nFree delivery anywhere in Rwanda (1–3 days). Pay on delivery — cash, MTN MoMo, or Airtel Money.\n\n📲 Order via WhatsApp: ${BIZ.whatsapp}`;
  }
  if (product) {
    return `The **${product.label}** is available at ${BIZ.name}, starting from **${fmt(product.price)}** 🏷️\n\nCategory: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}\n✅ 100% genuine | 🚚 Free delivery | 💳 Pay on delivery\n\n📲 WhatsApp us to order: ${BIZ.whatsapp}`;
  }

  // ── Budget queries ("under 500k", "I have 200,000", "budget") ────────────
  const budgetMatch = q.match(/(\d[\d,\.]*)\s*(k\b|,000|000)?\s*(rwf|frw|francs?)?/i);
  if (budgetMatch && q.match(/budget|afford|under|below|less than|within|around|have|got/i)) {
    let raw = budgetMatch[1].replace(/[,\.]/g, '');
    let budget = parseInt(raw);
    if (budgetMatch[2]?.toLowerCase() === 'k') budget *= 1000;
    if (budget > 0 && budget < 100) budget *= 1000; // treat "500" as 500,000
    const suggestions = budgetSuggestions(budget);
    if (suggestions.length === 0) {
      return `Hmm, we don't have products starting below ${fmt(budget)} right now. Our most affordable options start from 8,000 RWF (screen protectors) to 22,000 RWF (chargers).\n\n📲 WhatsApp us at ${BIZ.whatsapp} — we'll find something that works for you!`;
    }
    return `With a budget of **${fmt(budget)}**, here are our best options:\n\n${suggestions.map((p) => `• ${p.label} — ${fmt(p.price)}`).join('\n')}\n\n🚚 Free delivery | 💳 Pay on delivery\n📲 WhatsApp: ${BIZ.whatsapp}`;
  }

  // ── Category: phones ─────────────────────────────────────────────────────
  if (q.match(/phone|smartphone|mobile|(what|which|show).*(phone|mobile)/i) && !q.match(/phone number|contact/i)) {
    return `Here are our smartphones 📱\n\n${catalogueBlock('phones', '📱')}\n\n🚚 Free delivery across Rwanda | 💳 Pay on delivery\n📲 Order via WhatsApp: ${BIZ.whatsapp}`;
  }

  // ── Category: tablets ─────────────────────────────────────────────────────
  if (q.match(/tablet|ipad|(what|which|show).*(tablet|ipad)/i)) {
    return `Here are our tablets 📱\n\n${catalogueBlock('tablets', '📱')}\n\n🚚 Free delivery | 💳 Pay on delivery\n📲 Order: ${BIZ.whatsapp}`;
  }

  // ── Category: laptops ─────────────────────────────────────────────────────
  if (q.match(/laptop|computer|macbook|notebook|(what|which|show).*(laptop|computer)/i)) {
    return `Here are our laptops 💻\n\n${catalogueBlock('laptops', '💻')}\n\n🚚 Free delivery | 💳 Pay on delivery\n📲 Order: ${BIZ.whatsapp}`;
  }

  // ── Category: watches ─────────────────────────────────────────────────────
  if (q.match(/watch|smartwatch|wearable|band|fitband|(what|which|show).*(watch|wearable)/i)) {
    return `Here are our smartwatches & fitness bands ⌚\n\n${catalogueBlock('watches', '⌚')}\n\n🚚 Free delivery | 💳 Pay on delivery\n📲 Order: ${BIZ.whatsapp}`;
  }

  // ── Category: accessories ─────────────────────────────────────────────────
  if (q.match(/accessory|accessories|earbuds|earphones|airpods|charger|powerbank|case|screen protector/i)) {
    return `Here are our accessories 🎧\n\n${catalogueBlock('accessories', '🎧')}\n\n🚚 Free delivery | 💳 Pay on delivery\n📲 Order: ${BIZ.whatsapp}`;
  }

  // ── Category: gaming ──────────────────────────────────────────────────────
  if (q.match(/gaming|game|playstation|ps5|xbox|nintendo|switch|console|vr|quest|razer|headset/i)) {
    return `Here are our gaming products 🎮\n\n${catalogueBlock('gaming', '🎮')}\n\n🚚 Free delivery | 💳 Pay on delivery\n📲 Order: ${BIZ.whatsapp}`;
  }

  // ── Full catalogue ────────────────────────────────────────────────────────
  if (q.match(/all (products?|items?|stock|catalog)|what do you (have|sell|stock)|show (me )?(everything|all)|catalog|catalogue|list/i)) {
    return `Here's everything we carry at ${BIZ.name} 🛒\n\n📱 PHONES\n${catalogueBlock('phones', '📱')}\n\n📱 TABLETS\n${catalogueBlock('tablets', '📱')}\n\n💻 LAPTOPS\n${catalogueBlock('laptops', '💻')}\n\n⌚ WATCHES & BANDS\n${catalogueBlock('watches', '⌚')}\n\n🎧 ACCESSORIES\n${catalogueBlock('accessories', '🎧')}\n\n🎮 GAMING\n${catalogueBlock('gaming', '🎮')}\n\n🚚 Free delivery | 💳 Pay on delivery\n📲 Order: ${BIZ.whatsapp}`;
  }

  // ── Contact / phone number ────────────────────────────────────────────────
  if (q.match(/contact|phone number|call|reach|whatsapp|number/i)) {
    return `You can reach ${BIZ.name} here 📲\n\n📞 ${BIZ.phones.join('\n📞 ')}\n💬 WhatsApp: ${BIZ.whatsapp}\n📧 Email: ${BIZ.email}\n\nWe're available Monday–Saturday, 8 AM–6 PM. WhatsApp is the fastest way to get a response!`;
  }

  // ── Location / address ────────────────────────────────────────────────────
  if (q.match(/where|location|address|find you|visit|come to|direction/i)) {
    return `📍 Find us at:\n**${BIZ.address}**\n\nYou can visit us in person or shop online and get free delivery anywhere in Rwanda!\n\n📞 ${BIZ.phones[0]}\n💬 WhatsApp: ${BIZ.whatsapp}`;
  }

  // ── Delivery ──────────────────────────────────────────────────────────────
  if (q.match(/deliver|shipping|ship|how long|arrival|receive|kigali|upcountry/i)) {
    return `🚚 Delivery at ${BIZ.name}:\n\n• **Free delivery** anywhere in Rwanda\n• Arrives in **1–3 business days**\n• Pay on delivery — no upfront payment needed\n• We deliver to Kigali, Musanze, Huye, Rubavu, Butare, and all provinces\n\n💳 Payment: Cash, MTN Mobile Money, or Airtel Money`;
  }

  // ── Payment / MoMo ───────────────────────────────────────────────────────
  if (q.match(/pay|payment|mtn|airtel|mobile money|momo|cash|how to pay/i)) {
    return `💳 Payment methods at ${BIZ.name}:\n\n• Cash on delivery\n• MTN Mobile Money\n• Airtel Money\n\n✅ You only pay when your order arrives — no upfront payment required!`;
  }

  // ── Returns / warranty ───────────────────────────────────────────────────
  if (q.match(/return|refund|exchange|warranty|guarantee|broken|faulty|damaged|repair/i)) {
    return `✅ Our guarantee:\n\n• **30-day free returns** on all products\n• All items are **100% genuine** with manufacturer warranty\n• If anything is wrong, WhatsApp us at ${BIZ.whatsapp} and we'll fix it fast\n\nYour satisfaction is our priority 🦛`;
  }

  // ── Social media ─────────────────────────────────────────────────────────
  if (q.match(/instagram|facebook|tiktok|social|follow/i)) {
    return `Follow ${BIZ.name} on social media 📲\n\n• Instagram: ${BIZ.instagram}\n• Facebook: ${BIZ.facebook}\n• TikTok: ${BIZ.tiktok}\n• WhatsApp Channel: ${BIZ.whatsappChannel}\n\nFollow us for daily deals, new arrivals, and tech tips!`;
  }

  // ── Hours / working hours ─────────────────────────────────────────────────
  if (q.match(/open|hours|working hours|time|schedule|when/i)) {
    return `🕐 ${BIZ.name} is open:\n**${BIZ.hours}**\n\nFor urgent enquiries, WhatsApp us at ${BIZ.whatsapp} — we respond quickly even outside hours!`;
  }

  // ── Thanks ────────────────────────────────────────────────────────────────
  if (q.match(/thank|thanks|merci|asante|murakoze/i)) {
    return `You're welcome! 😊 Happy to help. Feel free to ask anything else — we're always here for you.\n\n📲 ${BIZ.whatsapp} | 📧 ${BIZ.email}`;
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  return `Thanks for your message! 🦛 I'm not sure I understood that perfectly.\n\nYou can ask me about:\n• 📱 Specific phones, tablets, laptops, watches\n• 💰 Budget ("phones under 500,000 RWF")\n• 🚚 Delivery, payment & returns\n• 📍 Our location\n• 📞 Contact numbers\n\nOr reach us directly on WhatsApp: **${BIZ.whatsapp}** — we respond fast!`;
}

export const sendChatMessage = createServerFn({ method: 'POST' })
  .inputValidator((data: { messages: ChatMessage[] }) => data)
  .handler(async ({ data }) => {
    const last = data.messages[data.messages.length - 1];
    const reply = buildReply(last?.content ?? '');
    return { reply };
  });
