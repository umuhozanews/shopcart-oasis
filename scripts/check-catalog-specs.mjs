import { ktProducts } from "../src/lib/kt-catalog.ts";
import fs from "node:fs";

console.log(`Total products in ktProducts: ${ktProducts.length}`);

// Group phones by modelKey
const phoneModels = {};
for (const p of ktProducts) {
  if (p.category === "phones" && p.modelKey) {
    if (!phoneModels[p.modelKey]) phoneModels[p.modelKey] = [];
    phoneModels[p.modelKey].push(p);
  }
}

console.log(`Unique phone models: ${Object.keys(phoneModels).length}`);
for (const [key, variants] of Object.entries(phoneModels)) {
  const conditions = variants.map((v) => `${v.condition}: ${v.price.toLocaleString()} RWF`);
  console.log(`- ${key}: [${conditions.join(", ")}]`);
}

// Check for any competitor brand 'ktphones' references in catalog files
const catalogRaw = fs.readFileSync("src/lib/kt-catalog.ts", "utf8");
if (catalogRaw.includes("ktphones.com")) {
  console.error("FAIL: Found ktphones.com in kt-catalog.ts!");
  process.exit(1);
} else {
  console.log("PASS: 0 references to ktphones.com in catalog!");
}

// Check sample specifications
const sample = ktProducts.find((p) => p.modelKey === "iphone-12" && p.condition === "dubai");
console.log("\nSample Dubai iPhone 12:", {
  id: sample.id,
  name: sample.name,
  price: sample.price,
  condition: sample.condition,
  specs: sample.specs,
});

const sampleNew = ktProducts.find((p) => p.modelKey === "iphone-15-pro" && p.condition === "new");
console.log("\nSample Brand New iPhone 15 Pro:", {
  id: sampleNew.id,
  name: sampleNew.name,
  price: sampleNew.price,
  condition: sampleNew.condition,
  specs: sampleNew.specs,
});
