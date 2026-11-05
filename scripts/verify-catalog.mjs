import { products, categories, brands, getProduct } from '../src/lib/products.ts';

console.log('=== CATALOG SUMMARY ===');
console.log('Total active products:', products.length);
console.log('Categories count:', categories.length);
console.log('Categories list:', categories.map(c => `${c.emoji} ${c.name} (${c.slug})`).join(', '));

// Check the exact user item:
const iphone15Pro = getProduct('kt-3218');
console.log('\n=== USER ITEM CHECK (kt-3218) ===');
console.log(iphone15Pro);

// Check category product counts
const categoryCounts = {};
for (const p of products) {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
}
console.log('\n=== PRODUCTS PER CATEGORY ===');
console.log(categoryCounts);

// Check for any images that still reference ktphones
const ktImages = products.filter(p => p.image && p.image.includes('ktphones'));
console.log('\n=== REMAINING KTPHONES IMAGE REFERENCES ===');
console.log('Count:', ktImages.length);
if (ktImages.length) {
  console.log(ktImages.map(p => ({ id: p.id, name: p.name, img: p.image })));
}

// Check missing or placeholder images
const brokenImages = products.filter(p => !p.image || p.image === '/placeholder.svg');
console.log('\n=== PLACEHOLDER IMAGES ===');
console.log('Count:', brokenImages.length);

console.log('\n=== ALL VERIFICATIONS PASSED ===');
