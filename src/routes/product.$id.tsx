import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Product, GalleryImage } from "@/lib/products";
import { useProduct } from "@/lib/product-store";
import { cartStore } from "@/lib/cart-store";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { formatRWF } from "@/lib/currency";
import { JsonLd, SITE_URL } from "@/components/JsonLd";

function brandFor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("iphone")) return "Apple";
  if (n.includes("samsung") || n.includes("galaxy")) return "Samsung";
  if (n.includes("tecno")) return "Tecno";
  if (n.includes("infinix")) return "Infinix";
  return "Hippo Technology";
}

// ---------------------------------------------------------------------------
// Apple-style image gallery
// ---------------------------------------------------------------------------
function ProductGallery({
  images,
  activeIdx,
  onSelect,
}: {
  images: GalleryImage[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  const active = images[activeIdx] ?? images[0];
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < images.length - 1;

  return (
    <div>
      {/* ── Main image ── */}
      <div className="relative overflow-hidden rounded-3xl bg-surface-muted ring-1 ring-border/60">
        {/* Prev arrow */}
        {images.length > 1 && (
          <button
            onClick={() => canPrev && onSelect(activeIdx - 1)}
            disabled={!canPrev}
            aria-label="Previous view"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground/70 shadow backdrop-blur transition hover:bg-background hover:text-primary disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Right arrow */}
        {images.length > 1 && (
          <button
            onClick={() => canNext && onSelect(activeIdx + 1)}
            disabled={!canNext}
            aria-label="Next view"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground/70 shadow backdrop-blur transition hover:bg-background hover:text-primary disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        )}

        <img
          key={active.src}
          src={active.src}
          alt={active.label}
          width={800}
          height={800}
          className="aspect-square w-full object-contain p-10 transition-opacity duration-200"
        />

        {/* View label badge */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-black/40 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {active.label}
            </span>
          </div>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                aria-label={`View ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIdx ? "w-4 bg-primary" : "w-1.5 bg-foreground/30 hover:bg-foreground/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.label}
              onClick={() => onSelect(i)}
              className="group shrink-0 flex flex-col items-center gap-1.5"
            >
              <div
                className={`overflow-hidden rounded-2xl ring-2 transition ${
                  i === activeIdx
                    ? "ring-primary"
                    : "ring-transparent hover:ring-border"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  loading="lazy"
                  width={120}
                  height={120}
                  className="h-[72px] w-[72px] object-contain p-1.5"
                />
              </div>
              <span
                className={`text-[11px] leading-none ${
                  i === activeIdx ? "font-semibold text-primary" : "text-muted-foreground"
                }`}
              >
                {img.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------
export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    return { product: null as Product | null, productId: params.id };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.product
      ? [
          { title: `${loaderData.product.name} — Hippo Technology` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — Hippo Technology` },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:type", content: "product" },
          { property: "og:image", content: loaderData.product.image },
          { property: "og:url", content: `${SITE_URL}/product/${loaderData.product.id}` },
        ]
      : [{ title: "Product — Hippo Technology" }],
    links: loaderData?.product
      ? [{ rel: "canonical", href: `${SITE_URL}/product/${loaderData.product.id}` }]
      : [],
  }),
  component: PDP,
});

function PDP() {
  const { product: loaderProduct, productId } = Route.useLoaderData();
  const storeProduct = useProduct(productId);
  const product = storeProduct ?? loaderProduct;

  const [galleryIdx, setGalleryIdx] = useState(0);
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

  // Build gallery: explicit gallery > derive from colors > single image
  const galleryImages: GalleryImage[] = product.gallery && product.gallery.length > 0
    ? product.gallery
    : product.colors && product.colors.length > 0
      ? product.colors.map((c) => ({ label: c.name, src: c.image }))
      : [{ label: product.name, src: product.image }];

  // The active color tracks the gallery index when gallery = colors
  const activeColor = product.colors?.[galleryIdx];
  const mainImage = galleryImages[galleryIdx]?.src ?? product.image;

  const handleSelect = (i: number) => {
    setGalleryIdx(i);
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    image: product.image,
    sku: product.id,
    brand: { "@type": "Brand", name: brandFor(product.name) },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.id}`,
      priceCurrency: "RWF",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

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

  const specs = product.specs ? Object.entries(product.specs) : [];
  const descParagraphs = product.description?.split("\n\n") ?? [];

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={productLd} />
      <Toaster position="top-right" />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {product.breadcrumb.map((b: string, i: number) => (
            <span key={i} className="flex items-center gap-1">
              {i === 0 ? (
                <Link to="/" className="hover:text-primary">{b}</Link>
              ) : (
                <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-primary">{b}</Link>
              )}
              <ChevronRight size={12} className="opacity-50" />
            </span>
          ))}
          <span className="font-medium text-foreground">{product.name}</span>
        </nav>

        {/* ── Product grid ── */}
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left — Gallery */}
          <div>
            <ProductGallery
              images={galleryImages}
              activeIdx={galleryIdx}
              onSelect={handleSelect}
            />

            {/* Color swatches — shown separately when product has an explicit gallery */}
            {product.gallery && product.colors && (
              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold">Colour</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      aria-label={c.name}
                      title={c.name}
                      className={`grid h-9 w-9 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-background transition ${
                        i === galleryIdx ? "ring-primary scale-110" : "ring-transparent hover:ring-border"
                      }`}
                      onClick={() => setGalleryIdx(i)}
                    >
                      <span className="h-7 w-7 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Info */}
          <div>
            {/* Condition badge */}
            <div className="mb-3">
              {product.condition === 'used' ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                  🔄 Used · Open Box
                </span>
              ) : product.condition === 'dubai' ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  🇦🇪 Dubai · Open Box
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  🆕 Brand New · Sealed
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
              {product.tagline}
            </p>
            <div className="my-6 h-px bg-border" />

            {/* Price */}
            <div>
              <div className="text-2xl font-bold text-foreground">{formatRWF(product.price)}</div>
              <p className="mt-1 text-xs text-muted-foreground">Free delivery across Rwanda</p>
            </div>

            <div className="my-6 h-px bg-border" />

            {/* Colour selector — only when gallery = colours */}
            {!product.gallery && product.colors && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold">
                  Colour — <span className="font-normal text-muted-foreground">{galleryImages[galleryIdx]?.label}</span>
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  {product.colors.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => handleSelect(i)}
                      aria-label={c.name}
                      className={`grid h-9 w-9 place-items-center rounded-full ring-2 ring-offset-2 ring-offset-background transition ${
                        i === galleryIdx ? "ring-primary scale-110" : "ring-transparent hover:ring-border"
                      }`}
                    >
                      <span className="h-7 w-7 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock status */}
            <div className="mb-4">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  ✅ In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                  ❌ Out of Stock
                </span>
              )}
            </div>

            {/* Qty selector — only when in stock */}
            {product.stock > 0 && (
              <div className="flex flex-wrap items-center gap-6">
                <div className="inline-flex items-center rounded-full border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease"
                    className="grid h-11 w-11 place-items-center text-foreground/70 hover:text-primary"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase"
                    className="grid h-11 w-11 place-items-center text-foreground/70 hover:text-primary"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => addToCart(true)}
                disabled={product.stock === 0}
                className="min-w-40 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Buy Now
              </button>
              <button
                onClick={() => addToCart(false)}
                disabled={product.stock === 0}
                className="min-w-40 rounded-full border border-primary bg-transparent px-8 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add to Cart
              </button>
            </div>

            {/* Delivery / returns badges */}
            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-border p-4">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 text-primary" size={20} />
                  <div>
                    <div className="text-sm font-semibold">Free Delivery</div>
                    <p className="text-xs text-muted-foreground">Free delivery across Rwanda on all orders</p>
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
                      <Link to="/returns" className="underline">Details</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        {descParagraphs.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">About this product</h2>
            <div className="mt-6 max-w-3xl space-y-4">
              {descParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-7 text-foreground/80">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* ── Specifications ── */}
        {specs.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">Specifications</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? "bg-surface-muted/50" : "bg-background"}>
                      <td className="w-2/5 px-5 py-3.5 font-medium text-foreground/70 md:w-1/3">{key}</td>
                      <td className="px-5 py-3.5 font-semibold text-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
