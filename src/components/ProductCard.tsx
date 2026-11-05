import { Link, useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { cartStore } from "@/lib/cart-store";
import { wishlistStore, useWishlist } from "@/lib/wishlist-store";
import { formatRWF } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const navigate = useNavigate();
  const liked = wishlist.has(product.id);

  return (
    <div className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-shadow hover:shadow-lg hover:shadow-primary/5">
      <div className="relative isolate aspect-square w-full shrink-0 overflow-hidden bg-surface-muted">
        <Link to="/product/$id" params={{ id: product.id }} className="block h-full w-full">
          <img
            src={product.image}
            onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/product-image-fallback.svg'; }}
            alt={product.name}
            loading="lazy"
            width={512}
            height={512}
            className="block h-full w-full object-contain p-3 transition-transform duration-500 sm:p-4 sm:group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => wishlistStore.toggle(product.id)}
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-border transition hover:bg-background sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <Heart
            size={16}
            className={liked ? "fill-destructive text-destructive" : ""}
          />
        </button>
      </div>

      <div className="relative z-0 flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
        {product.condition && (
          <span className={`self-start max-w-full truncate rounded-full px-2 py-1 text-[10px] font-bold shadow-sm sm:text-[11px] ${
            product.condition === 'used'
              ? 'bg-amber-100 text-amber-700'
              : product.condition === 'dubai'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-green-100 text-green-700'
          }`}>
            {product.condition === 'used'
              ? 'Used - Open Box'
              : product.condition === 'dubai'
                ? 'Dubai - Open Box'
                : 'Brand New - Sealed'}
          </span>
        )}
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-3">
          <div className="min-w-0">
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:text-primary sm:line-clamp-1"
            >
              {product.name}
            </Link>
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
              {product.tagline}
            </p>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <div className="text-sm font-bold text-foreground">
              {formatRWF(product.price)}
            </div>
            <div className="mt-1">
              {product.stock > 0 ? (
                <span className="text-[10px] font-semibold text-green-600">✅ In Stock</span>
              ) : (
                <span className="text-[10px] font-semibold text-red-500">❌ Out of Stock</span>
              )}
            </div>
          </div>
        </div>
        <button
          disabled={product.stock === 0}
          onClick={() => {
            cartStore.add({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            });
            navigate({ to: '/checkout' });
          }}
          className="mt-auto w-full rounded-full border border-primary/60 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:self-start sm:px-5 sm:py-1.5"
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
