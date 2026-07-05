import { defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";
import getProduct from "./tools/get-product";
import searchProducts from "./tools/search-products";

export default defineMcp({
  name: "hippo-technology-mcp",
  title: "Hippo Technology Store",
  version: "0.1.0",
  instructions:
    "Tools for browsing the Hippo Technology smartphone store catalog. Use `list_products` to see everything, `search_products` to filter by keyword or price (RWF), and `get_product` for full details of one product by id.",
  tools: [listProducts, getProduct, searchProducts],
});
