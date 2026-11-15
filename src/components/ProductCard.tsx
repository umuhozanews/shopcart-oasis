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
        <div className="mt-auto flex flex-wrap gap-2">
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
            className="rounded-full border border-primary/60 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:py-1.5"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <a
            href={`https://wa.me/250788749709?text=${encodeURIComponent(
              `Hi! I'd like to order:\n\n📱 *${product.name}*${product.condition ? `\n🏷️ Condition: ${product.condition === 'used' ? 'Used - Open Box' : product.condition === 'dubai' ? 'Dubai - Open Box' : 'Brand New - Sealed'}` : ''}\n💰 Price: ${formatRWF(product.price)}\n🔗 https://www.hippotech.rw/product/${product.id}\n\nPlease confirm availability.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#1ebe5d] sm:px-4 sm:py-1.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
