import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/products";
import { Toaster } from "@/components/ui/sonner";
import heroWoman from "@/assets/hero-woman.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const filters = [
  "Headphone Type",
  "Price",
  "Review",
  "Color",
  "Material",
  "Offer",
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Header />

      <main className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-accent">
          <div className="grid grid-cols-1 items-center gap-6 p-8 md:grid-cols-2 md:p-14">
            <div>
              <h1 className="max-w-md font-display text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl">
                Grab Upto 50% Off On Selected Headphone
              </h1>
              <Link
                to="/product/$id"
                params={{ id: "airpods-max" }}
                className="mt-6 inline-flex items-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Buy Now
              </Link>
            </div>
            <div className="relative flex justify-end">
              <img
                src={heroWoman}
                alt="Woman wearing headphones"
                width={640}
                height={640}
                className="h-64 w-64 rounded-3xl object-cover shadow-lg sm:h-80 sm:w-80 md:h-96 md:w-96"
              />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary"
              >
                {f} <ChevronDown size={14} />
              </button>
            ))}
            <button className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary">
              All Filters <SlidersHorizontal size={12} />
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground/80 hover:border-primary hover:text-primary">
            Sort by <ChevronDown size={14} />
          </button>
        </section>

        {/* Products */}
        <section className="mt-8">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Headphones For You!
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mt-16">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Popular Categories
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-3 rounded-2xl bg-surface-muted p-4 ring-1 ring-border/60 transition hover:ring-primary/40"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-background text-primary">
                  <span className="text-xs font-bold">
                    {c.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.count} items Available
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
