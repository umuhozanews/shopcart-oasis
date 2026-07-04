import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/lib/product-store';
import { Toaster } from '@/components/ui/sonner';
import { Tag } from 'lucide-react';

export const Route = createFileRoute('/deals')({
  head: () => ({
    meta: [
      { title: 'Deals & Offers — Hippo Technology' },
      { name: 'description', content: 'Shop the best deals on premium headphones and electronics at Hippo Technology. Up to 50% off.' },
    ],
  }),
  component: Deals,
});

function Deals() {
  const products = useProducts();
  // Show products under $100 as "deals"
  const deals = products.filter((p) => p.price < 100);
  const featured = products.filter((p) => p.price >= 100);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {/* Banner */}
        <section className="rounded-3xl bg-primary text-primary-foreground px-8 py-12 text-center mb-12">
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
              <Tag size={12} /> Limited Time Offers
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Grab Up to 50% Off</h1>
          <p className="mt-3 opacity-90 max-w-md mx-auto">
            Premium audio at unbeatable prices. Deals change weekly — don't miss out.
          </p>
        </section>

        {/* Under $100 deals */}
        {deals.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold tracking-tight">Under $100</h2>
              <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                {deals.length} deals
              </span>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {deals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Featured (higher-end) */}
        {featured.length > 0 && (
          <section>
            <h2 className="text-xl font-bold tracking-tight mb-6">Premium Picks</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
