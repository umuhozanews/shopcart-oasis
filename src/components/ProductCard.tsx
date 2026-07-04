import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { cartStore } from "@/lib/cart-store";
import { StarRating } from "./StarRating";
import { toast } from "sonner";
import { formatRWF } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border/60 transition-shadow hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-square overflow-hidden bg-surface-muted">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={512}
            height={512}
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => setLiked((v) => !v)}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-border transition hover:bg-background"
        >
          <Heart
            size={16}
            className={liked ? "fill-destructive text-destructive" : ""}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="line-clamp-1 text-sm font-semibold text-foreground hover:text-primary"
            >
              {product.name}
            </Link>
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
              {product.tagline}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-sm font-bold text-foreground">
              {formatRWF(product.price)}
            </div>
          </div>
        </div>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <button
          onClick={() => {
            cartStore.add({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            });
            toast.success(`${product.name} added to cart`);
          }}
          className="mt-auto self-start rounded-full border border-primary/60 px-5 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
