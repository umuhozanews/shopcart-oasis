import { Link } from "@tanstack/react-router";
import { ChevronDown, Phone, Search, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function TopBar() {
  return (
    <div className="hidden bg-primary text-primary-foreground md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-2 opacity-90">
          <Phone size={12} /> +001234567890
        </div>
        <div className="opacity-90">
          Get 50% Off on Selected Items{" "}
          <span className="mx-2 opacity-50">|</span>
          <Link to="/" className="underline underline-offset-2">
            Shop Now
          </Link>
        </div>
        <div className="flex items-center gap-4 opacity-90">
          <span className="flex items-center gap-1">
            Eng <ChevronDown size={12} />
          </span>
          <span className="flex items-center gap-1">
            Location <ChevronDown size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const cart = useCart();
  const count = cart.reduce((n, i) => n + i.qty, 0);

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <TopBar />
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 md:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <ShoppingCart size={20} className="fill-destructive/70" />
          </div>
          <span className="text-lg font-bold tracking-tight text-primary">
            Shopcart
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 text-sm font-medium text-foreground/80 lg:flex">
          <button className="flex items-center gap-1 hover:text-primary">
            Categories <ChevronDown size={14} />
          </button>
          <Link to="/" className="hover:text-primary">
            Deals
          </Link>
          <Link to="/" className="hover:text-primary">
            What's New
          </Link>
          <Link to="/" className="hover:text-primary">
            Delivery
          </Link>
          <div className="relative ml-4 hidden xl:block">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              placeholder="Search Product"
              className="w-72 rounded-full border border-input bg-surface-muted py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-background"
            />
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-5">
          <button className="hidden items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary md:flex">
            <User size={18} /> Account
          </button>
          <Link
            to="/checkout"
            className="relative flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary"
          >
            <div className="relative">
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
