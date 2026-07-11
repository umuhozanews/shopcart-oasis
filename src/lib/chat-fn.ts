import { createServerFn } from '@tanstack/react-start';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const PRODUCTS = [
  { names: ['iphone 16 pro max', 'iphone 16 pro', 'iphone 16'], price: '1,900,000 RWF', label: 'iPhone 16 Pro Max' },
  { names: ['samsung s25 ultra', 'galaxy s25 ultra', 's25 ultra', 'samsung s25'], price: '1,650,000 RWF', label: 'Samsung Galaxy S25 Ultra' },
  { names: ['iphone 15'], price: '1,250,000 RWF', label: 'iPhone 15 128GB' },
  { names: ['iphone 14'], price: '950,000 RWF', label: 'iPhone 14 128GB' },
  { names: ['samsung a55', 'galaxy a55', 'a55'], price: '650,000 RWF', label: 'Samsung Galaxy A55 5G' },
  { names: ['tecno camon 30', 'camon 30'], price: '300,000 RWF', label: 'Tecno Camon 30 Pro' },
  { names: ['infinix hot 40', 'hot 40'], price: '195,000 RWF', label: 'Infinix Hot 40 Pro' },
  { names: ['galaxy buds', 'buds3', 'buds 3'], price: '250,000 RWF', label: 'Samsung Galaxy Buds3 Pro' },
];

function matchProduct(q: string) {
  const lower = q.toLowerCase();
  for (const p of PRODUCTS) {
    if (p.names.some((n) => lower.includes(n))) return p;
  }
  return null;
}

function buildReply(userText: string): string {
  const q = userText.toLowerCase();

  // Product price query — match any message that names a product
  const product = matchProduct(q);
  if (product) {
    return `The ${product.label} is priced at ${product.price}. We offer free delivery across Rwanda within 1–3 days. Want to order? WhatsApp us at +250 793 051 054! 😊`;
  }

  // Phone catalog
  if (q.match(/what (phones?|products?|items?|do you (have|sell|stock))/i) || q.match(/show.*(phones?|products?)/i) || q.includes('catalog') || q.includes('catalogue') || q.includes('list')) {
    return `Here's what we currently have:\n\n📱 iPhone 16 Pro Max — 1,900,000 RWF\n📱 Samsung S25 Ultra — 1,650,000 RWF\n📱 iPhone 15 128GB — 1,250,000 RWF\n📱 iPhone 14 128GB — 950,000 RWF\n📱 Samsung A55 5G — 650,000 RWF\n📱 Tecno Camon 30 Pro — 300,000 RWF\n📱 Infinix Hot 40 Pro — 195,000 RWF\n🎧 Galaxy Buds3 Pro — 250,000 RWF\n\nAll products are 100% genuine. WhatsApp us to order! 🛒`;
  }

  // Delivery
  if (q.match(/deliver|shipping|ship|how long|arrival|receive/i)) {
    return `We deliver free anywhere in Rwanda! Orders typically arrive within 1–3 business days. You pay on delivery — cash, MTN Mobile Money, or Airtel Money. 🚚`;
  }

  // Returns / warranty
  if (q.match(/return|refund|exchange|warranty|broken|faulty|damaged/i)) {
    return `We offer free 30-day returns on all products. If anything is wrong, contact us on WhatsApp at +250 793 051 054 and we'll sort it out right away! ✅`;
  }

  // Payment
  if (q.match(/pay|payment|mtn|airtel|mobile money|cash/i)) {
    return `We accept cash, MTN Mobile Money, and Airtel Money — all paid on delivery. No upfront payment needed! 💳`;
  }

  // Location / address
  if (q.match(/where|location|address|find you|visit|come to/i)) {
    return `We're based at Tajyire Building, near Makuza Plaza, Kigali. You can also shop online and get free delivery across Rwanda! 📍`;
  }

  // Contact
  if (q.match(/contact|whatsapp|call|phone number|reach/i)) {
    return `You can reach us on WhatsApp at +250 793 051 054 — we're available daily and respond quickly! 📲`;
  }

  // Greetings
  if (q.match(/^(hi|hello|hey|good morning|good afternoon|good evening|salut|muraho)\b/i)) {
    return `Hello! 👋 I'm Hippo, your assistant at Hippo Technology. Ask me about our phones, prices, delivery, or anything else — I'm here to help!`;
  }

  // Thanks
  if (q.match(/thank|thanks|merci|asante/i)) {
    return `You're welcome! Feel free to ask anything else. You can also reach us on WhatsApp at +250 793 051 054 anytime. 😊`;
  }

  // Fallback
  return `Great question! For the most accurate answer, please reach us on WhatsApp at +250 793 051 054 — our team responds quickly and will be happy to help! 🦛`;
}

export const sendChatMessage = createServerFn({ method: 'POST' })
  .handler(async ({ data }: { data: { messages: ChatMessage[] } }) => {
    const last = data.messages[data.messages.length - 1];
    const reply = buildReply(last?.content ?? '');
    return { reply };
  });
