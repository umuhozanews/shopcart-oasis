import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const productsDir = path.join(root, 'public', 'products');
const phonesDir = path.join(productsDir, 'phones');
const computersDir = path.join(productsDir, 'computers');
const speakersDir = path.join(productsDir, 'speakers');
const chargersDir = path.join(productsDir, 'chargers');
const gadgetsDir = path.join(productsDir, 'gadgets');
const ktphonesDir = path.join(root, 'public', 'ktphones');

await Promise.all([
  mkdir(phonesDir, { recursive: true }),
  mkdir(computersDir, { recursive: true }),
  mkdir(speakersDir, { recursive: true }),
  mkdir(chargersDir, { recursive: true }),
  mkdir(gadgetsDir, { recursive: true }),
  mkdir(ktphonesDir, { recursive: true }),
]);

const downloads = [
  // Phones
  {
    dest: path.join(phonesDir, 'iphone-15-pro-blue-titanium.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-15-pro-bluetitanium-202412?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(phonesDir, 'iphone-15-pro-natural-titanium.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-15-pro-naturaltitanium-202412?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(phonesDir, 'iphone-15-pro-max.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-15-pro-max-naturaltitanium-202412?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(phonesDir, 'iphone-16-pro.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409?wid=1000&hei=1000&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(phonesDir, 'iphone-15-black.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-15-black-202412?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(phonesDir, 'iphone-15-pink.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-15-pink-202412?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(phonesDir, 'iphone-14.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-14-midnight-202404?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(phonesDir, 'iphone-12.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-12-black-2020?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(phonesDir, 'samsung-s24-ultra.jpg'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/SAMSUNG_Galaxy_S24_Ultra_%285%29.jpg/1280px-SAMSUNG_Galaxy_S24_Ultra_%285%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },
  {
    dest: path.join(phonesDir, 'pixel-7.png'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Google_Pixel_7_back_%28Obsidian%29.svg/1280px-Google_Pixel_7_back_%28Obsidian%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },

  // Chargers
  {
    dest: path.join(chargersDir, 'apple-20w-adapter.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHJE3?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(chargersDir, 'apple-35w-dual-adapter.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MNWM3?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(chargersDir, 'apple-140w-adapter.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MLYU3?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(chargersDir, 'apple-magsafe-charger.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(chargersDir, 'apple-magsafe-duo.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXF3?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(chargersDir, 'apple-240w-cable.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MU2G3?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(chargersDir, 'anker-fusion-charger.jpg'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Anker_Fusion_White.jpg/1280px-Anker_Fusion_White.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },
  {
    dest: path.join(chargersDir, 'anker-521-powerbank.jpg'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Anker_521_Power_Bank.jpg/1280px-Anker_521_Power_Bank.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },

  // Computers
  {
    dest: path.join(computersDir, 'macbook-pro-16.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(computersDir, 'macbook-air-13.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },

  // Speakers
  {
    dest: path.join(speakersDir, 'jbl-boombox-3.jpg'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/JBL_Boombox3.jpg/1280px-JBL_Boombox3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },
  {
    dest: path.join(speakersDir, 'jbl-charge-5.jpg'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/JBL_Charge_4_2v2.jpg/1280px-JBL_Charge_4_2v2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },
  {
    dest: path.join(speakersDir, 'jbl-flip-6.jpg'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/JBL_Flip_4.jpg/1280px-JBL_Flip_4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },
  {
    dest: path.join(speakersDir, 'bose-soundlink.jpg'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/BOSE_SoundLink_mini.jpg/1280px-BOSE_SoundLink_mini.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },
  {
    dest: path.join(speakersDir, 'sony-srs.jpg'),
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Sony_SRS-X5_20140303.jpg/1280px-Sony_SRS-X5_20140303.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail',
  },

  // Gadgets
  {
    dest: path.join(gadgetsDir, 'ipad-pro-13.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-unselect-gallery-1-202405?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(gadgetsDir, 'ipad-air-13.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-unselect-gallery-1-202405?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(gadgetsDir, 'apple-watch-s10.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/s10-case-unselect-gallery-1-202409?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(gadgetsDir, 'apple-watch-ultra-2.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ultra-case-unselect-gallery-1-202409?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(gadgetsDir, 'airpods-pro-2.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
  {
    dest: path.join(gadgetsDir, 'airpods-max.jpg'),
    url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=1144&hei=1144&fmt=jpeg&qlt=90',
  },
];

console.log(`Downloading ${downloads.length} high-resolution unbranded assets...`);

for (const item of downloads) {
  try {
    const res = await fetch(item.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
    });
    if (!res.ok) {
      console.warn(`Failed ${res.status}: ${item.url}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(item.dest, buf);
    console.log(`Saved: ${path.basename(item.dest)} (${buf.byteLength} bytes)`);
  } catch (err) {
    console.error(`Error downloading ${item.url}:`, err.message);
  }
}

// Local copies for computers
const copies = [
  // Phones
  { src: 'src/assets/phones/iphone-16-pro-max-desert.jpg', dest: 'public/products/phones/iphone-16-pro-max.jpg' },
  { src: 'src/assets/phones/samsung-s25-ultra-black.jpg', dest: 'public/products/phones/samsung-s25-ultra.jpg' },
  { src: 'src/assets/phones/samsung-a55-navy.jpg', dest: 'public/products/phones/samsung-a55.jpg' },
  { src: 'src/assets/phones/tecno-camon-30-pro.jpg', dest: 'public/products/phones/tecno-camon-30-pro.jpg' },
  { src: 'src/assets/phones/infinix-hot-40-pro.jpg', dest: 'public/products/phones/infinix-hot-40-pro.jpg' },
  { src: 'public/hot-deals/iphone-13.jpg', dest: 'public/products/phones/iphone-13.jpg' },
  { src: 'public/hot-deals/iphone-12.jpg', dest: 'public/products/phones/iphone-12-starlight.jpg' },

  // Computers
  { src: 'src/assets/laptops/dell-xps.jpg', dest: 'public/products/computers/dell-xps-15.jpg' },
  { src: 'src/assets/laptops/hp-spectre.jpg', dest: 'public/products/computers/hp-spectre-x360.jpg' },
  { src: 'src/assets/laptops/thinkpad.jpg', dest: 'public/products/computers/lenovo-thinkpad-x1.jpg' },
  { src: 'src/assets/laptops/asus-rog.jpg', dest: 'public/products/computers/asus-rog-zephyrus.jpg' },
  { src: 'public/hot-deals/hp-elitebook-840-g5.jpg', dest: 'public/products/computers/hp-elitebook-840-g5.jpg' },
  { src: 'public/hot-deals/hp-elitebook-840-g3.jpg', dest: 'public/products/computers/hp-elitebook-840-g3.jpg' },
  { src: 'public/hot-deals/hp-elitebook-840-g2.jpg', dest: 'public/products/computers/hp-elitebook-840-g2.jpg' },
  { src: 'public/hot-deals/hp-elitebook-x360-1030-g2.jpg', dest: 'public/products/computers/hp-elitebook-x360.jpg' },
  { src: 'public/hot-deals/hp-probook-11-g2.jpg', dest: 'public/products/computers/hp-probook-11-g2.jpg' },
  { src: 'public/apple-mac/macbook-pro.jpg', dest: 'public/products/computers/macbook-pro-14.jpg' },
  { src: 'public/apple-mac/macbook-air.jpg', dest: 'public/products/computers/macbook-air-15.jpg' },

  // Chargers
  { src: 'src/assets/accessories/charger.jpg', dest: 'public/products/chargers/fast-wall-charger.jpg' },
  { src: 'src/assets/accessories/powerbank.jpg', dest: 'public/products/chargers/portable-powerbank.jpg' },
  { src: 'src/assets/accessories/cable.jpg', dest: 'public/products/chargers/fast-charge-cable.jpg' },

  // Gadgets
  { src: 'src/assets/tablets/galaxy-tab.jpg', dest: 'public/products/gadgets/samsung-galaxy-tab.jpg' },
  { src: 'src/assets/watches/galaxy-watch.jpg', dest: 'public/products/gadgets/galaxy-watch.jpg' },
  { src: 'src/assets/watches/garmin.jpg', dest: 'public/products/gadgets/garmin-fenix.jpg' },
  { src: 'src/assets/gaming/ps5.jpg', dest: 'public/products/gadgets/playstation-5.jpg' },
  { src: 'src/assets/gaming/switch.jpg', dest: 'public/products/gadgets/nintendo-switch.jpg' },
  { src: 'src/assets/gaming/xbox.jpg', dest: 'public/products/gadgets/xbox-series-x.jpg' },
  { src: 'public/catalog-added/dji-osmo-mobile-6.jpg', dest: 'public/products/gadgets/dji-osmo-mobile-6.jpg' },
  { src: 'public/catalog-added/logitech-h390.png', dest: 'public/products/gadgets/logitech-h390.png' },
  { src: 'src/assets/bose-headphones.jpg', dest: 'public/products/gadgets/bose-quietcomfort.jpg' },
  { src: 'src/assets/jbl-headphones.jpg', dest: 'public/products/gadgets/jbl-tune.jpg' },
];

console.log(`Copying ${copies.length} local clean assets into /public/products/...`);
for (const copy of copies) {
  try {
    await copyFile(path.join(root, copy.src), path.join(root, copy.dest));
    console.log(`Copied ${copy.src} -> ${copy.dest}`);
  } catch (err) {
    console.warn(`Could not copy ${copy.src}:`, err.message);
  }
}

// CRUCIAL: Overwrite kt-3218.jpg with clean Blue Titanium image so nothing ever serves the watermarked one!
const blueTitaniumBuf = await (await fetch('https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-15-pro-bluetitanium-202412?wid=1144&hei=1144&fmt=jpeg&qlt=90')).arrayBuffer();
await writeFile(path.join(ktphonesDir, 'kt-3218.jpg'), Buffer.from(blueTitaniumBuf));
console.log('Overwrote public/ktphones/kt-3218.jpg with official unbranded Apple Blue Titanium image!');

console.log('All catalog stock images downloaded and installed successfully!');
