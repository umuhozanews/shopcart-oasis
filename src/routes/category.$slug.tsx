import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/lib/product-store';
import { Toaster } from '@/components/ui/sonner';
import { categories, brands } from '@/lib/products';

export const Route = createFileRoute('/category/$slug')({
  loader: ({ params }) => {
    let slug = params.slug;
    if (slug === 'iphone' || slug === 'samsung' || slug === 'budget' || slug === 'smartphones') {
      slug = 'phones';
    }
    const cat = categories.find((c) => c.slug === slug);
    if (!cat && slug !== 'all') throw notFound();
    return { slug };
  },
  head: ({ loaderData }) => {
    let slug = loaderData?.slug;
    if (slug === 'iphone' || slug === 'samsung' || slug === 'budget' || slug === 'smartphones') {
      slug = 'phones';
    }
    const cat = categories.find((c) => c.slug === slug);
    const name = cat?.name ?? 'All Products';
    return {
      meta: [
        { title: `${name} — Hippo Technology` },
        { name: 'description', content: `Shop ${name} at Hippo Technology. Free delivery across Rwanda.` },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center">
      <div className="text-center">
        <p className="font-semibold">Category not found</p>
        <Link to="/" className="mt-3 inline-block text-primary underline">Back to shop</Link>
      </div>
    </div>
  ),
  component: CategoryPage,
});

const PRICE_RANGES = [
  { label: 'Under 100k', min: 0, max: 100000 },
  { label: '100k – 500k', min: 100000, max: 500000 },
  { label: '500k – 1M', min: 500000, max: 1000000 },
  { label: '1M – 2M', min: 1000000, max: 2000000 },
  { label: 'Over 2M', min: 2000000, max: Infinity },
];

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  let normalizedSlug = slug;
  if (slug === 'iphone' || slug === 'samsung' || slug === 'budget' || slug === 'smartphones') {
    normalizedSlug = 'phones';
  }
  const cat = categories.find((c) => c.slug === normalizedSlug);
  const allProducts = useProducts();

  const [query, setQuery] = useState('');
  const [priceRange, setPriceRange] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const categoriesWithCounts = categories.map((c) => ({
    ...c,
    count: c.slug === 'all' ? allProducts.length : allProducts.filter((p) => p.category === c.slug).length,
  }));

  const baseFiltered = useMemo(
    () => (normalizedSlug === 'all' ? allProducts : allProducts.filter((p) => p.category === normalizedSlug)),
    [allProducts, normalizedSlug],
  );

  const filtered = useMemo(() => {
    return baseFiltered.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.tagline.toLowerCase().includes(query.toLowerCase())) return false;
      if (priceRange !== null) {
        const r = PRICE_RANGES[priceRange];
        if (p.price < r.min || p.price > r.max) return false;
      }
      if (selectedBrand && !p.name.toLowerCase().startsWith(selectedBrand.toLowerCase())) return false;
      return true;
    });
  }, [baseFiltered, query, priceRange, selectedBrand]);

  const clearAll = () => {
    setQuery('');
    setPriceRange(null);
    setSelectedBrand(null);
  };

  const hasFilters = query || priceRange !== null || selectedBrand;

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{cat?.name ?? 'All Products'}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Categories */}
            <div className="rounded-2xl bg-surface-muted p-5 ring-1 ring-border/60">
              <h3 className="mb-3 text-sm font-bold">Categories</h3>
              <ul className="space-y-1.5">
                {categoriesWithCounts.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                        c.slug === normalizedSlug || (normalizedSlug === 'all' && c.slug === 'all')
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'hover:bg-background text-foreground/80'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className={`text-xs ${c.slug === normalizedSlug ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {c.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="rounded-2xl bg-surface-muted p-5 ring-1 ring-border/60">
              <h3 className="mb-3 text-sm font-bold">Price Range</h3>
              <div className="space-y-2">
                {PRICE_RANGES.map((r, i) => (
                  <label key={r.label} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === i}
                      onChange={() => setPriceRange(i)}
                      className="accent-primary"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
                {priceRange !== null && (
                  <button onClick={() => setPriceRange(null)} className="mt-1 text-xs text-primary underline">
                    Clear price
                  </button>
                )}
              </div>
            </div>

            {/* Brands */}
            <div className="rounded-2xl bg-surface-muted p-5 ring-1 ring-border/60">
              <h3 className="mb-3 text-sm font-bold">Brands</h3>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => setSelectedBrand(selectedBrand === b.name ? null : b.name)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      selectedBrand === b.name
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background text-foreground/80 ring-1 ring-border/60 hover:ring-primary/40'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Main */}
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <h1 className="text-2xl font-extrabold tracking-tight">{cat?.name ?? 'All Products'}</h1>
              <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border/60">
                {filtered.length} products
              </span>
            </div>

            {/* Search */}
            <div className="mb-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="search"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-surface-muted py-3 pl-11 pr-4 text-sm outline-none ring-1 ring-border/60 focus:ring-primary"
              />
            </div>

            {hasFilters && (
              <div className="mb-4 flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">Showing {filtered.length} of {baseFiltered.length} products</span>
                <button onClick={clearAll} className="flex items-center gap-1 text-primary hover:underline">
                  <X size={14} /> Clear all
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="py-24 text-center text-muted-foreground">
                <p className="text-lg font-medium">No products match your filters.</p>
                <button onClick={clearAll} className="mt-4 text-primary underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
