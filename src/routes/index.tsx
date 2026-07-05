import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { categories } from '@/lib/products';
import { useProducts } from '@/lib/product-store';
import { Toaster } from '@/components/ui/sonner';
import { JsonLd, SITE_URL } from '@/components/JsonLd';
import heroWoman from '@/assets/hero-woman.jpg';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Hippo Technology — Phones & Gadgets Rwanda' },
      { name: 'description', content: 'Shop iPhones, Samsung, Tecno, Infinix and top gadgets at Hippo Technology Rwanda. Free delivery, genuine products, 30-day returns.' },
      { property: 'og:title', content: 'Hippo Technology — Your World, Upgraded.' },
      { property: 'og:description', content: 'Rwanda\'s premier destination for phones and gadgets. Free delivery on all orders.' },
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
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-accent">
          <div className="grid grid-cols-1 items-center gap-6 p-8 md:grid-cols-2 md:p-14">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
                Free Delivery Across Rwanda
              </span>
              <h1 className="max-w-md font-display text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl">
                Top Phones &amp; Gadgets Delivered Across Rwanda
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/product/$id"
                  params={{ id: 'iphone-16-pro-max' }}
                  className="inline-flex items-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                >
                  Buy Now
                </Link>
                <Link
                  to="/deals"
                  className="inline-flex items-center rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
                >
                  See All Deals
                </Link>
              </div>
            </div>
            <div className="relative flex justify-end">
              <img
                src={heroWoman}
                alt="Woman wearing premium headphones"
                width={640}
                height={640}
                className="h-64 w-64 rounded-3xl object-cover shadow-lg sm:h-80 sm:w-80 md:h-96 md:w-96"
              />
            </div>
          </div>
        </section>

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
            {['iphone', 'samsung', 'budget', 'accessories'].map((slug) => {
              const cat = categories.find((c) => c.slug === slug);
              return (
                <button
                  key={slug}
                  onClick={() => setActiveCategory(slug)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    activeCategory === slug
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background text-foreground/80 hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat?.name ?? slug}
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
              {activeCategory === 'all' ? 'All Products' : categories.find((c) => c.slug === activeCategory)?.name ?? 'Products'}
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
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                className="flex items-center gap-3 rounded-2xl bg-surface-muted p-4 ring-1 ring-border/60 transition hover:ring-primary/40 hover:shadow-sm"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-background text-primary">
                  <span className="text-xs font-bold">{c.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.count} items</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
