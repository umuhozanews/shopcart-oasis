import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/lib/product-store';
import { Toaster } from '@/components/ui/sonner';
import { categories } from '@/lib/products';

export const Route = createFileRoute('/category/$slug')({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat && params.slug !== 'all') throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const cat = categories.find((c) => c.slug === loaderData?.slug);
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

function CategoryPage() {
  const { slug } = Route.useLoaderData();
  const cat = categories.find((c) => c.slug === slug);
  const allProducts = useProducts();

  const filtered = slug === 'all' || slug === 'wireless' || slug === 'gaming'
    ? filterBySlugs(allProducts, slug)
    : allProducts.filter((p) => p.category === slug);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{cat?.name ?? 'All Products'}</span>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight">{cat?.name ?? 'All Products'}</h1>
          <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border/60">
            {filtered.length} products
          </span>
        </div>

        {/* Category links */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                c.slug === slug
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-muted text-foreground hover:bg-primary/10 hover:text-primary ring-1 ring-border/60'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            <p className="text-lg font-medium">No products found in this category.</p>
            <Link to="/" className="mt-4 inline-block text-primary underline">View all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function filterBySlugs(products: ReturnType<typeof useProducts>, slug: string) {
  if (slug === 'all') return products;
  if (slug === 'wireless') return products.filter((p) => p.category === 'headphones' || p.category === 'earbuds');
  if (slug === 'gaming') return products.filter((p) => p.id.includes('gaming') || p.id.includes('tagry'));
  return products.filter((p) => p.category === slug);
}
