import { createServerFn } from '@tanstack/react-start';
import { loadDbOnServer } from './server-db';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const SYSTEM_PROMPT = `You are Hippo, AI assistant for Hippo Technology — Rwanda's top electronics store in Kigali. Be friendly and concise (2-3 sentences max).

PRODUCTS & PRICES (RWF):
iPhone 16 Pro Max 1,900,000 | Samsung S25 Ultra 1,650,000 | iPhone 15 128GB 1,250,000 | iPhone 14 128GB 950,000 | Samsung A55 5G 650,000 | Tecno Camon 30 Pro 300,000 | Infinix Hot 40 Pro 195,000 | Galaxy Buds3 Pro 250,000

POLICIES: Free delivery Rwanda | Free 30-day returns | 100% genuine products | Pay: cash/MTN/Airtel on delivery | 1-3 days delivery
CONTACT: WhatsApp +250 793 051 054 | Kigali Rwanda

If unsure, refer to WhatsApp. Never invent info.`;

export const sendChatMessage = createServerFn({ method: 'POST' })
  .handler(async ({ data }: { data: { messages: ChatMessage[] } }) => {
    const db = await loadDbOnServer();
    const apiKey = db.settings.geminiApiKey?.trim();

    if (!apiKey) {
      return {
        reply:
          "I'm not fully set up yet. Please contact us on WhatsApp at +250 793 051 054 — we're happy to help!",
      };
    }

    // Keep only last 6 messages to stay within free tier token limits
    const recent = data.messages.slice(-6);
    const contents = recent.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
          }),
        }
      );

      const body = await res.text();

      if (res.status === 429) {
        return { reply: "I'm receiving a lot of messages right now — please try again in a moment! Or WhatsApp us directly at +250 793 051 054 😊" };
      }

      if (!res.ok) {
        console.error('Gemini error:', res.status, body);
        return { reply: "The AI is temporarily unavailable. Please contact us on WhatsApp at +250 793 051 054 — we're happy to help!" };
      }

      const json = JSON.parse(body) as {
        candidates?: { content?: { parts?: { text: string }[] } }[];
      };
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      return { reply: text ?? "Sorry, I couldn't process that. Please WhatsApp us at +250 793 051 054." };

    } catch (err) {
      console.error('Chat error:', err);
      return {
        reply: 'I ran into a technical issue. Please reach us on WhatsApp at +250 793 051 054 and we will help you right away!',
      };
    }
  });
