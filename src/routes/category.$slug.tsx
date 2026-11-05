import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/lib/product-store';
import { Toaster } from '@/components/ui/sonner';
import { categories } from '@/lib/products';

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
    const description = slug === 'phones'
      ? 'Shop phones in Kigali and across Rwanda at Hippo Technology. Browse smartphones with free delivery nationwide.'
      : `Shop ${name} at Hippo Technology in Kigali, Rwanda. Browse our electronics and enjoy free delivery across Rwanda.`;
    return {
      meta: [
        { title: `${name} — Hippo Technology` },
        { name: 'description', content: description },
        { name: 'keywords', content: `${name}, ${name} Kigali, ${name} Rwanda, electronics shop Kigali, Hippo Technology` },
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

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  let normalizedSlug = slug;
  if (slug === 'iphone' || slug === 'samsung' || slug === 'budget' || slug === 'smartphones') {
    normalizedSlug = 'phones';
  }
  const cat = categories.find((c) => c.slug === normalizedSlug);
  const allProducts = useProducts();

  const [query, setQuery] = useState('');
  const baseFiltered = useMemo(
    () => (normalizedSlug === 'all' ? allProducts : allProducts.filter((p) => p.category === normalizedSlug)),
    [allProducts, normalizedSlug],
  );

  const filtered = useMemo(() => {
    return baseFiltered.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.tagline.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [baseFiltered, query]);

  const clearAll = () => {
    setQuery('');
  };

  const hasFilters = query;

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
                <button onClick={clearAll} className="text-primary hover:underline">
                  Clear search
                </button>
              </div>
            )}

            {filtered.length === 0 ? (
              baseFiltered.length === 0 ? (
                <section className="rounded-3xl bg-surface-muted px-6 py-16 text-center ring-1 ring-border/60 sm:px-12">
                  <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-primary/10 text-2xl" aria-hidden="true">
                    {normalizedSlug === 'gimbal' ? '🎥' : normalizedSlug === 'airpods-pro-2gen' ? '🎧' : normalizedSlug === 'headset' ? '🎧' : '🛍️'}
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{cat?.name ?? 'Our collection'}</p>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">This collection is coming soon</h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    We’re preparing products for this category. In the meantime, browse the items currently available in the Hippo shop.
                  </p>
                  <Link
                    to="/category/$slug"
                    params={{ slug: 'all' }}
                    className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                  >
                    Browse all products
                  </Link>
                </section>
              ) : (
                <div className="py-24 text-center text-muted-foreground">
                  <p className="text-lg font-medium">No products match your filters.</p>
                  <button onClick={clearAll} className="mt-4 text-primary underline">Clear filters</button>
                </div>
              )
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
