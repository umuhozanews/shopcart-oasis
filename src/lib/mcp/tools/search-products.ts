import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "@/lib/products";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Search smartphones by free-text query against name, tagline, and category. Optional price range in RWF.",
  inputSchema: {
    query: z.string().optional().describe("Free-text search string."),
    min_price: z.number().nonnegative().optional().describe("Minimum price in RWF."),
    max_price: z.number().nonnegative().optional().describe("Maximum price in RWF."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, min_price, max_price }) => {
    const q = query?.toLowerCase().trim() ?? "";
    const results = products.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.tagline} ${p.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (min_price != null && p.price < min_price) return false;
      if (max_price != null && p.price > max_price) return false;
      return true;
    });
    const rows = results.map((p) => ({
      id: p.id,
      name: p.name,
      price_rwf: p.price,
      category: p.category,
      stock: p.stock,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { results: rows, count: rows.length },
    };
  },
});
