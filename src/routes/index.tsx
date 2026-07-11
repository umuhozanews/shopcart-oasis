import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ChevronDown, SlidersHorizontal, ShieldCheck, Award, Truck, Lock, MessageCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { HeroSlider } from '@/components/HeroSlider';
import { StockPopup } from '@/components/StockPopup';
import { categories, brands } from '@/lib/products';
import { useProducts } from '@/lib/product-store';
import { Toaster } from '@/components/ui/sonner';
import { JsonLd, SITE_URL } from '@/components/JsonLd';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Hippo Technology — Original Smartphones & Electronics in Rwanda' },
      { name: 'description', content: 'Shop original iPhones, Samsung, Google Pixel, Xiaomi, Huawei, Tecno and Infinix smartphones, laptops, tablets, accessories and more at Hippo Technology Rwanda. Genuine products, warranty, fast delivery.' },
      { property: 'og:title', content: 'Hippo Technology — Original Smartphones & Electronics in Rwanda' },
      { property: 'og:description', content: 'Rwanda\'s premier destination for original smartphones and electronics. Genuine products, warranty available, fast delivery across Rwanda.' },
      { property: 'og:url', content: SITE_URL },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/` }],
  }),
  component: Home,
});

const siteLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hippo Technology',
    url: SITE_URL,
    logo: `${SITE_URL}/hippo-logo.png`,
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

const SORT_OPTIONS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

function Home() {
  const allProducts = useProducts();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('Featured');
  const [showSort, setShowSort] = useState(false);

  const categoriesWithCounts = categories.map((c) => ({
    ...c,
    count: c.slug === 'all'
      ? allProducts.length
      : allProducts.filter((p) => p.category === c.slug).length,
  }));

  const filtered = activeCategory === 'all'
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'Price: Low to High') return a.price - b.price;
    if (sort === 'Price: High to Low') return b.price - a.price;
    if (sort === 'Top Rated') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={siteLd} />
      <Toaster position="top-right" />
      <Header />

      <main className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
        {/* Hero Slider */}
        <HeroSlider />
        <StockPopup />

        {/* Category filter pills */}
        <section className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background text-foreground/80 hover:border-primary hover:text-primary'
              }`}
            >
              All
            </button>
            {categoriesWithCounts.filter((c) => c.slug !== 'all').map((c) => {
              return (
                <button
                  key={c.slug}
                  onClick={() => setActiveCategory(c.slug)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    activeCategory === c.slug
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background text-foreground/80 hover:border-primary hover:text-primary'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
            <Link
              to="/category/$slug"
              params={{ slug: 'all' }}
              className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary"
            >
              Browse All <SlidersHorizontal size={12} />
            </Link>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSort((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary"
            >
              {sort} <ChevronDown size={14} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl bg-background p-1.5 shadow-xl ring-1 ring-border/60 z-30">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSort(opt); setShowSort(false); }}
                    className={`w-full rounded-xl px-3 py-2 text-left text-xs font-medium transition hover:bg-surface-muted ${sort === opt ? 'text-primary' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Products */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {activeCategory === 'all' ? 'All Products' : categoriesWithCounts.find((c) => c.slug === activeCategory)?.name ?? 'Products'}
              <span className="ml-2 text-sm font-normal text-muted-foreground">({sorted.length})</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
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
                <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-background ring-1 ring-border/60">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={112}
                    height={112}
                    className="h-full w-full object-contain p-1.5"
                  />
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
      </main>

      <Footer />
    </div>
  );
}
