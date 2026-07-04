import { createFileRoute, Link } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/lib/product-store';
import { Toaster } from '@/components/ui/sonner';
import { Search } from 'lucide-react';

export const Route = createFileRoute('/search')({
  validateSearch: (search) => ({
    q: typeof search.q === 'string' ? search.q : '',
  }),
  head: ({ match }) => {
    const q = (match.search as { q?: string }).q ?? '';
    return {
      meta: [
        { title: q ? `"${q}" — Hippo Technology Search` : 'Search — Hippo Technology' },
        { name: 'description', content: `Search results for ${q} at Hippo Technology.` },
      ],
    };
  },
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const allProducts = useProducts();

  const results = q.trim()
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.tagline.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()),
      )
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {q ? `Results for "${q}"` : 'Search Products'}
          </h1>
          {q && (
            <p className="mt-1 text-sm text-muted-foreground">
              {results.length} product{results.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {!q ? (
          <div className="py-24 text-center text-muted-foreground">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p>Enter a search term to find products.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-24 text-center">
            <Search size={40} className="mx-auto mb-4 text-muted-foreground opacity-30" />
            <p className="text-lg font-medium">No results for "{q}"</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search or browse our categories.</p>
            <Link to="/" className="mt-5 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
