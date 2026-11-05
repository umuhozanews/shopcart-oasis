import { createFileRoute, Link } from '@tanstack/react-router';
import { ShieldCheck, Award, Truck, Lock, MessageCircle } from 'lucide-react';
import phoneImg from '@/assets/phones/iphone-15-pink.jpg';
import tabletImg from '@/assets/tablets/ipad-air.jpg';
import laptopImg from '@/assets/laptops/macbook-air.jpg';
import watchImg from '@/assets/watches/apple-watch.jpg';
import accessoryImg from '@/assets/accessories/airpods.jpg';
import gamingImg from '@/assets/gaming/ps5.jpg';
import chargerImg from '@/assets/accessories/charger.jpg';

const CATEGORY_IMAGES: Record<string, string> = {
  phones: phoneImg,
  tablets: tabletImg,
  computer: laptopImg,
  'smart-watches': watchImg,
  accessories: accessoryImg,
  gaming: gamingImg,
  chargers: chargerImg,
  speakers: '/products/speakers/jbl-boombox-3.jpg',
  gimbal: '/products/gadgets/dji-osmo-mobile-6.jpg',
};
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { HeroSlider } from '@/components/HeroSlider';
import { StockPopup } from '@/components/StockPopup';
import { categories, brands } from '@/lib/products';
import { useProducts } from '@/lib/product-store';
import { Toaster } from '@/components/ui/sonner';
import { JsonLd, SITE_URL } from '@/components/JsonLd';
import { INSTAGRAM_URL, SHOP_ADDRESS, SHOP_PHONES } from '@/lib/contact';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Phone Shop in Kigali, Rwanda | Hippo Technology' },
      { name: 'description', content: 'Looking for phones in Kigali or across Rwanda? Shop smartphones, laptops and accessories at Hippo Technology in Kigali, with free delivery nationwide.' },
      { name: 'keywords', content: 'phone shop Kigali, best phone shop in Kigali, phones in Kigali, phone shop Rwanda, phones in Rwanda, buy phones in Kigali, smartphones Rwanda, electronics shop Kigali, Hippo Technology' },
      { property: 'og:title', content: 'Phone Shop in Kigali, Rwanda | Hippo Technology' },
      { property: 'og:description', content: 'Shop smartphones, laptops and accessories at Hippo Technology in Kigali. Free delivery across Rwanda.' },
      { property: 'og:url', content: SITE_URL },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/` }],
  }),
  component: Home,
});

const siteLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: 'Hippo Technology',
    url: SITE_URL,
    logo: `${SITE_URL}/hippo-logo.png`,
    telephone: SHOP_PHONES[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SHOP_ADDRESS,
      addressLocality: 'Kigali',
      addressCountry: 'RW',
    },
    sameAs: [INSTAGRAM_URL],
    areaServed: { '@type': 'Country', name: 'Rwanda' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hippo Technology',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
];

function Home() {
  const allProducts = useProducts();

  const categoriesWithCounts = categories.map((c) => ({
    ...c,
    count: c.slug === 'all'
      ? allProducts.length
      : allProducts.filter((p) => p.category === c.slug).length,
  }));

  const sorted = allProducts;

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={siteLd} />
      <Toaster position="top-right" />
      <Header />

      <main className="w-full pt-6">
        {/* Hero Slider */}
        <HeroSlider />
        <div className="mx-auto max-w-7xl px-4 md:px-6">
        <StockPopup />

        <section className="mt-7 rounded-2xl border border-primary/10 bg-surface-muted px-5 py-5 sm:px-7 sm:py-6">
          <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">Looking for a phone shop in Kigali?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Hippo Technology offers smartphones, laptops and accessories from our Kigali store at {SHOP_ADDRESS}. Shop online for free delivery across Rwanda.
          </p>
          <Link to="/category/$slug" params={{ slug: 'phones' }} className="mt-3 inline-flex min-h-10 items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Browse phones
          </Link>
        </section>

        {/* Deals */}
        <section className="mt-8 rounded-3xl bg-[#edf4ed] p-4 sm:p-6 lg:p-7">
        <section className="mt-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Hot deals
              <span className="ml-2 text-sm font-normal text-muted-foreground">({sorted.length})</span>
            </h2>
          </div>
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-muted py-24 text-center">
              <span className="text-5xl">📦</span>
              <p className="mt-4 text-base font-semibold text-foreground">No products yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Products will appear here once the admin adds them.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {sorted.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
        </section>

        {/* Categories */}
        <section className="mt-16 mb-4">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Browse by Category</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categoriesWithCounts.filter((c) => c.slug !== 'all').map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="flex items-center gap-3 rounded-2xl bg-surface-muted p-4 ring-1 ring-border/60 transition hover:ring-primary/40 hover:shadow-sm"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/60">
                  {CATEGORY_IMAGES[c.slug] ? (
                    <img src={CATEGORY_IMAGES[c.slug]} alt={c.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-background text-3xl">{c.emoji}</div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.count} items</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Shop by Brand */}
        <section className="mt-12">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Shop by Brand</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to="/search"
                search={{ q: brand.name }}
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground/80 ring-1 ring-border/60 transition hover:ring-primary/40 hover:text-primary hover:shadow-sm"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section className="mt-12 mb-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: ShieldCheck, title: "Genuine Products", desc: "100% authentic devices" },
              { icon: Award, title: "Warranty Available", desc: "Manufacturer warranty" },
              { icon: Truck, title: "Fast Delivery", desc: "Across Rwanda" },
              { icon: Lock, title: "Secure Payments", desc: "Safe & trusted checkout" },
              { icon: MessageCircle, title: "Customer Support", desc: "Mon–Sat, 8am–8pm" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2 rounded-2xl bg-surface-muted p-5 ring-1 ring-border/60 text-center">
                <Icon size={24} className="text-primary" />
                <div className="text-sm font-semibold">{title}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            ))}
          </div>
        </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
