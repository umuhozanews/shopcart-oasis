import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "@/lib/products";

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List all smartphones available in the Hippo Technology store, including price (RWF), stock, rating, and category.",
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe("Optional category filter (e.g. 'iphone', 'samsung')."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const filtered = category
      ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
      : products;
    const rows = filtered.map((p) => ({
      id: p.id,
      name: p.name,
      price_rwf: p.price,
      category: p.category,
      stock: p.stock,
      rating: p.rating,
      reviews: p.reviews,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { products: rows },
    };
  },
});
