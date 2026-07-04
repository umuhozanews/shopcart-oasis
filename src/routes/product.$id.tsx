import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarRating } from "@/components/StarRating";
import { products } from "@/lib/products";
import { useProduct } from "@/lib/product-store";
import { cartStore } from "@/lib/cart-store";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { formatRWF } from "@/lib/currency";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id) ?? null;
    return { product, productId: params.id };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.product
      ? [
          { title: `${loaderData.product.name} — Hippo Technology` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — Hippo Technology` },
          { property: "og:description", content: loaderData.product.tagline },
        ]
      : [{ title: "Product — Hippo Technology" }],
  }),
  component: PDP,
});

function PDP() {
  const { product: loaderProduct, productId } = Route.useLoaderData();
  const storeProduct = useProduct(productId);
  const product = storeProduct ?? loaderProduct;

  const [colorIdx, setColorIdx] = useState(0);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <div className="text-center">
          <p className="text-lg font-semibold">Product not found</p>
          <Link to="/" className="mt-3 inline-block text-primary underline">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const activeColor = product.colors?.[colorIdx];
  const mainImage = activeColor?.image ?? product.image;

  const addToCart = (buyNow?: boolean) => {
    cartStore.add(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: mainImage,
        color: activeColor?.name,
      },
      qty
    );
    toast.success(`${product.name} added to cart`);
    if (buyNow) window.location.href = "/checkout";
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {product.breadcrumb.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              <Link to="/" className="hover:text-primary">
                {b}
              </Link>
              <ChevronRight size={12} className="opacity-50" />
            </span>
          ))}
          <span className="font-medium text-foreground">{product.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden rounded-3xl bg-surface-muted ring-1 ring-border/60">
              <img
                key={mainImage}
                src={mainImage}
                alt={product.name}
                width={800}
                height={800}
                className="aspect-square w-full object-contain p-8 transition-opacity duration-300"
              />
            </div>
            {product.colors && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    aria-label={c.name}
                    className={`overflow-hidden rounded-2xl bg-surface-muted ring-2 transition ${
                      i === colorIdx ? "ring-primary" : "ring-transparent hover:ring-border"
                    }`}
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      width={200}
                      height={200}
                      className="aspect-square w-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {product.tagline}
            </p>
            <div className="mt-3">
              <StarRating rating={product.rating} reviews={product.reviews} />
            </div>

            <div className="my-6 h-px bg-border" />

            <div>
              <div className="text-2xl font-bold text-foreground">
                {formatRWF(product.price)}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Free delivery across Rwanda
              </p>
            </div>

            <div className="my-6 h-px bg-border" />

            {product.colors && (
              <div>
                <h3 className="text-sm font-semibold">Choose a Color</h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColorIdx(i)}
                      aria-label={c.name}
                      className={`grid h-9 w-9 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-background transition ${
                        i === colorIdx ? "ring-primary" : "ring-transparent"
                      }`}
                    >
                      <span
                        className="h-7 w-7 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="my-6 h-px bg-border" />

            <div className="flex flex-wrap items-center gap-6">
              <div className="inline-flex items-center rounded-full border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-11 w-11 place-items-center text-foreground/70 hover:text-primary"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-11 w-11 place-items-center text-foreground/70 hover:text-primary"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="text-sm">
                Only <span className="font-bold text-warning">{product.stock} items</span>{" "}
                Left!
                <div className="text-muted-foreground">Don't miss it</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(true)}
                className="min-w-40 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
              >
                Buy Now
              </button>
              <button
                onClick={() => addToCart(false)}
                className="min-w-40 rounded-full border border-primary bg-transparent px-8 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-border p-4">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 text-primary" size={20} />
                  <div>
                    <div className="text-sm font-semibold">Free Delivery</div>
                    <p className="text-xs text-muted-foreground">
                      Free delivery across Rwanda on all orders
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <div className="flex items-start gap-3">
                  <RotateCcw className="mt-0.5 text-primary" size={20} />
                  <div>
                    <div className="text-sm font-semibold">Return Delivery</div>
                    <p className="text-xs text-muted-foreground">
                      Free 30-day returns.{" "}
                      <Link to="/returns" className="underline">
                        Details
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
