import { Link, useNavigate } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Phone, Search, ShoppingCart, User, X } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { categories } from '@/lib/products';
import { useProducts } from '@/lib/product-store';
import { useSiteSettings } from '@/lib/site-settings-store';
import hippoLogo from '@/assets/hippo-logo.png';

export function TopBar() {
  const s = useSiteSettings();
  return (
    <div className="hidden bg-primary text-primary-foreground md:block">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-2 opacity-90">
          <Phone size={12} />
          <a href={`tel:${s.topbarPhone}`} className="hover:underline">{s.topbarPhone}</a>
        </div>
        <div className="opacity-90">
          {s.topbarPromo}{' '}
          <span className="mx-2 opacity-50">|</span>
          <Link to="/deals" className="underline underline-offset-2">
            Shop Now
          </Link>
        </div>
        <div className="flex items-center gap-4 opacity-90">
          <span className="flex items-center gap-1">Eng <ChevronDown size={12} /></span>
          <span className="flex items-center gap-1">Rwanda <ChevronDown size={12} /></span>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const cart = useCart();
  const count = cart.reduce((n, i) => n + i.qty, 0);
  const navigate = useNavigate();
  const s = useSiteSettings();
  const logoSrc = s.logoData || hippoLogo;
  const [query, setQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const products = useProducts();
  const categoriesWithCounts = categories.map((c) => ({
    ...c,
    count: c.slug === 'all'
      ? products.length
      : products.filter((p) => p.category === c.slug).length,
  }));

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setShowCategories(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: '/search', search: { q: query.trim() } });
      setShowSearch(false);
      setQuery('');
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <TopBar />
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img src={logoSrc} alt={s.siteName} className="h-12 w-auto object-contain" />
          <div className="hidden sm:block">
            <div className="text-base font-extrabold leading-tight tracking-tight text-foreground">{s.siteName}</div>
            <div className="text-sm font-bold leading-tight text-primary">{s.siteSubtitle}</div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center justify-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
          {/* Categories dropdown */}
          <div ref={catRef} className="relative">
            <button
              onClick={() => setShowCategories((v) => !v)}
              className="flex items-center gap-1 hover:text-primary transition"
            >
              Categories <ChevronDown size={14} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
            </button>
            {showCategories && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl bg-background p-2 shadow-xl ring-1 ring-border/60 z-50">
                {categoriesWithCounts.map((c) => (
                  <Link
                    key={c.slug}
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setShowCategories(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm hover:bg-surface-muted hover:text-primary transition"
                  >
                    {c.name}
                    <span className="text-xs text-muted-foreground">{c.count}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/deals" className="hover:text-primary transition">Deals</Link>
          <Link to="/about" className="hover:text-primary transition">About</Link>
          <Link to="/shipping" className="hover:text-primary transition">Delivery</Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative hidden xl:block">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-64 rounded-full border border-input bg-surface-muted py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-background transition"
            />
          </form>
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          {/* Mobile search toggle */}
          <button
            className="xl:hidden text-foreground/70 hover:text-primary transition"
            onClick={() => setShowSearch((v) => !v)}
            aria-label="Search"
          >
            {showSearch ? <X size={20} /> : <Search size={20} />}
          </button>

          <Link
            to={isAdminAuthenticated() ? '/admin' : '/login'}
            className="hidden items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary md:flex transition"
          >
            <User size={18} />
            {isAdminAuthenticated() ? 'Dashboard' : 'Account'}
          </Link>

          <Link
            to="/checkout"
            className="relative flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition"
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

      {/* Mobile search bar */}
      {showSearch && (
        <form onSubmit={handleSearch} className="border-t border-border px-4 py-3 lg:hidden">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-input bg-surface-muted py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </form>
      )}
    </header>
  );
}
