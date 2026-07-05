// Central place for Hippo Technology contact details.

// wa.me format: country code + number, no "+" or spaces or leading zero.
export const SHOP_WHATSAPP = "250798464448";
export const SHOP_WHATSAPP_DISPLAY = "+250 798 464 448";

export const SHOP_PHONES = [
  "+250 793 051 054",
  "+250 788 749 709",
  "+250 798 464 448",
];

export const INSTAGRAM_URL = "https://www.instagram.com/hippotechnologyltd/";
export const WHATSAPP_CHANNEL =
  "https://whatsapp.com/channel/0029Vb5wSRe8aKvLIZH3Le1o";

export const SHOP_ADDRESS = "Tajyire Building, Near Makuza Plaza, Kigali";

export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${SHOP_WHATSAPP}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
