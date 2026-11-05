import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = 'https://www.hippotech.rw';
const catalogSource = await readFile(path.join(root, 'src/lib/kt-catalog.ts'), 'utf8');
const productArray = catalogSource.match(/export const ktProducts = (\[[\s\S]*?\]) as const;/);
if (!productArray) throw new Error('Could not read the product catalog for the sitemap.');
const parseArray = (str) => new Function(`return ${str}`)();
const products = parseArray(productArray[1]);
const curatedSource = await readFile(path.join(root, 'src/lib/curated-catalog.ts'), 'utf8');
const curatedArray = curatedSource.match(/export const curatedProducts: Product\[\] = (\[[\s\S]*?\]);/);
if (!curatedArray) throw new Error('Could not read curated products for the sitemap.');
const curatedProducts = parseArray(curatedArray[1]);
const allProducts = [...products, ...curatedProducts];
const categories = [...new Set(allProducts.map((product) => product.category).filter(Boolean))];
const today = new Date().toISOString().slice(0, 10);

const paths = [
  '/',
  '/deals',
  '/about',
  '/contact',
  '/faq',
  '/shipping',
  '/returns',
  '/terms',
  '/privacy-policy',
  ...categories.map((category) => `/category/${category}`),
  ...allProducts.map((product) => `/product/${product.id}`),
];

const entries = [...new Set(paths)].map((route) =>
  `  <url>\n    <loc>${site}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

await writeFile(path.join(root, 'public/sitemap.xml'), xml, 'utf8');
console.log(`Generated sitemap with ${entries.length} canonical pages.`);
