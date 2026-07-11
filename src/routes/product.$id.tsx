import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ChevronRight as BreadChev, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StarRating } from "@/components/StarRating";
import { products } from "@/lib/products";
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

function ProductViewer({ image, name }: { image: string; name: string }) {
  const rotYRef = useRef(0);
  const rotXRef = useRef(-6);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef(0);

  const [rotY, setRotY] = useState(0);
  const [rotX, setRotX] = useState(-6);
  const [dragging, setDragging] = useState(false);
  const [interacted, setInteracted] = useState(false);

  // Auto-rotation — runs as long as component is mounted
  useEffect(() => {
    function tick(ts: number) {
      const dt = Math.min(ts - (lastTsRef.current || ts), 50);
      lastTsRef.current = ts;

      if (!draggingRef.current && !pausedRef.current) {
        rotYRef.current += dt * 0.022;
        setRotY(rotYRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const startDrag = useCallback((x: number, y: number) => {
    draggingRef.current = true;
    setDragging(true);
    setInteracted(true);
    lastPosRef.current = { x, y };
  }, []);

  const moveDrag = useCallback((x: number, y: number) => {
    if (!lastPosRef.current) return;
    const dx = x - lastPosRef.current.x;
    const dy = y - lastPosRef.current.y;
    lastPosRef.current = { x, y };
    rotYRef.current += dx * 0.55;
    rotXRef.current = Math.max(-30, Math.min(20, rotXRef.current - dy * 0.3));
    setRotY(rotYRef.current);
    setRotX(rotXRef.current);
  }, []);

  const endDrag = useCallback(() => {
    draggingRef.current = false;
    setDragging(false);
    lastPosRef.current = null;
  }, []);

  const setHovered = useCallback((v: boolean) => {
    pausedRef.current = v;
  }, []);

  const rotateBy = (deg: number) => {
    rotYRef.current += deg;
    setRotY(rotYRef.current);
    setInteracted(true);
  };

  const reset = () => {
    rotYRef.current = 0;
    rotXRef.current = -6;
    setRotY(0);
    setRotX(-6);
  };

  return (
    <div className="select-none">
      {/* Viewer stage */}
      <div className="relative">
        {/* 360° badge */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          <RotateCcw size={11} />
          360°
        </div>

        <div
          className="relative overflow-hidden rounded-3xl ring-1 ring-border/60"
          style={{
            background: "radial-gradient(ellipse at 50% 35%, hsl(var(--surface-muted)) 0%, hsl(var(--background)) 100%)",
            perspective: "1400px",
            cursor: dragging ? "grabbing" : "grab",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { endDrag(); setHovered(false); }}
          onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
          onMouseMove={(e) => { if (draggingRef.current) moveDrag(e.clientX, e.clientY); }}
          onMouseUp={endDrag}
          onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={(e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={endDrag}
        >
          {/* Product image with 3D transform */}
          <div
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transformStyle: "preserve-3d",
              transition: dragging ? "none" : "transform 0.08s linear",
              willChange: "transform",
            }}
          >
            <img
              src={image}
              alt={name}
              draggable={false}
              width={800}
              height={800}
              className="aspect-square w-full object-contain p-10"
            />
          </div>

          {/* Ground shadow */}
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/15 blur-2xl"
            style={{ width: "55%", height: "28px" }}
          />

          {/* First-use hint */}
          {!interacted && (
            <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
              <span className="animate-pulse rounded-full bg-black/40 px-4 py-1.5 text-xs text-white backdrop-blur-sm">
                Drag to rotate
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Controls — left arrow · label · right arrow · reset */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => rotateBy(-90)}
          aria-label="Rotate left"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground/60 transition hover:border-primary hover:text-primary"
        >
          <ChevronLeft size={17} />
        </button>
        <span className="px-2 text-xs text-muted-foreground">View all sides</span>
        <button
          onClick={() => rotateBy(90)}
          aria-label="Rotate right"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground/60 transition hover:border-primary hover:text-primary"
        >
          <ChevronRight size={17} />
        </button>
        <button
          onClick={reset}
          aria-label="Reset view"
          className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground/60 transition hover:border-primary hover:text-primary"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
}

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

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    image: product.image,
    sku: product.id,
    brand: { "@type": "Brand", name: brandFor(product.name) },
    ...(product.reviews > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews,
          },
        }
      : {}),
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

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={productLd} />
      <Toaster position="top-right" />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {product.breadcrumb.map((b: string, i: number) => (
            <span key={i} className="flex items-center gap-1">
              <Link to="/" className="hover:text-primary">
                {b}
              </Link>
              <BreadChev size={12} className="opacity-50" />
            </span>
          ))}
          <span className="font-medium text-foreground">{product.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* 360° Viewer + color thumbnails */}
          <div>
            {/* Remount viewer when image changes so rotation resets cleanly */}
            <ProductViewer key={mainImage} image={mainImage} name={product.name} />

            {/* Color thumbnails */}
            {product.colors && (
              <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {product.colors.map((c: { name: string; hex: string; image: string }, i: number) => (
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

          {/* Info panel */}
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
                  {product.colors.map((c: { name: string; hex: string; image: string }, i: number) => (
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

        {/* Specifications */}
        {specs.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Specifications
            </h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([key, value], i) => (
                    <tr
                      key={key}
                      className={i % 2 === 0 ? "bg-surface-muted/50" : "bg-background"}
                    >
                      <td className="w-2/5 px-5 py-3.5 font-medium text-foreground/70 md:w-1/3">
                        {key}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-foreground">
                        {value}
                      </td>
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
