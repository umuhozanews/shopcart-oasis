import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "@/lib/products";

export default defineTool({
  name: "get_product",
  title: "Get product details",
  description:
    "Get full details for one smartphone by product id, including tagline, colors, price, and stock.",
  inputSchema: {
    id: z.string().min(1).describe("Product id, e.g. 'iphone-16-pro-max'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const product = products.find((p) => p.id === id);
    if (!product) {
      return {
        content: [{ type: "text", text: `No product found with id "${id}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      structuredContent: { product },
    };
  },
});
