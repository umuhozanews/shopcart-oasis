import { Link, useNavigate } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Phone, Search, ShoppingCart, User, X } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { categories } from '@/lib/products';
import { useProducts } from '@/lib/product-store';
import { useSiteSettings } from '@/lib/site-settings-store';
import hippoLogo from '@/assets/hippo-logo.png';

const ANNOUNCEMENTS = [
  { label: 'HOT DEALS', text: 'iPhone 16 Pro Max — Special Price This Week Only!', link: '/deals' },
  { label: 'HOT STOCK', text: 'Samsung Galaxy S25 Ultra — Limited Units Available', link: '/category/phones' },
  { label: 'NEW PRICES', text: 'Samsung Galaxy A Series — Prices Slashed Up to 20%', link: '/category/phones' },
  { label: 'FREE DELIVERY', text: 'Free Delivery on All Orders Across Rwanda', link: '/' },
  { label: 'NEW ARRIVALS', text: 'Tecno & Infinix Latest Models — Now In Stock', link: '/category/phones' },
  { label: 'HOT DEALS', text: 'Accessories Bundle Deals — Save Big on Galaxy Buds', link: '/category/accessories' },
];

export function TopBar() {
  const s = useSiteSettings();
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ANNOUNCEMENTS.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const ann = ANNOUNCEMENTS[idx];

  return (
    <div className="hidden bg-primary text-primary-foreground md:block overflow-hidden">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-2 opacity-90">
          <Phone size={12} />
          <a href={`tel:${s.topbarPhone.replace(/\s/g, '')}`} className="hover:underline">{s.topbarPhone}</a>
        </div>

        <div
          className="flex items-center gap-2 transition-all duration-300"
          style={{ opacity: visible ? 0.95 : 0, transform: visible ? 'translateY(0)' : 'translateY(-6px)' }}
        >
          <span className="rounded-full bg-primary-foreground/25 px-2 py-0.5 text-[10px] font-extrabold tracking-widest">
            {ann.label}
          </span>
          <span>{ann.text}</span>
          <span className="mx-1 opacity-40">|</span>
          <Link to={ann.link} className="underline underline-offset-2 font-semibold hover:opacity-80 transition">
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
    <header className="sticky top-0 z-40">
      <TopBar />

      {/* Glass liquid nav pill */}
      <div className="px-3 pb-2 pt-1.5">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/55 bg-white/80 shadow-[0_8px_32px_rgba(0,61,41,0.12)] backdrop-blur-xl ring-1 ring-inset ring-white/60 transition-all duration-300 dark:border-white/8 dark:bg-background/85 dark:shadow-[0_8px_32px_rgba(0,0,0,0.28)] dark:ring-white/5">
          {/* Top shimmer line for liquid glass look */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" aria-hidden="true" />

          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 md:px-6">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <img src={logoSrc} alt={s.siteName} className="h-12 w-auto object-contain" />
            </Link>

            {/* Nav */}
            <nav className="hidden items-center justify-center gap-1 text-sm font-medium text-foreground/80 lg:flex">
              {/* Categories dropdown */}
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setShowCategories((v) => !v)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                  Categories <ChevronDown size={14} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                </button>
                {showCategories && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-52 rounded-2xl border border-white/60 bg-white/85 p-2 shadow-xl backdrop-blur-xl ring-1 ring-inset ring-white/50 dark:border-white/10 dark:bg-background/90 dark:ring-white/5">
                    {categoriesWithCounts.map((c) => (
                      <Link
                        key={c.slug}
                        to="/category/$slug"
                        params={{ slug: c.slug }}
                        onClick={() => setShowCategories(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-all duration-150"
                      >
                        {c.name}
                        <span className="text-xs text-muted-foreground">{c.count}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/deals" className="rounded-full px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all duration-200">Deals</Link>
              <Link to="/about" className="rounded-full px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all duration-200">About</Link>
              <Link to="/shipping" className="rounded-full px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all duration-200">Delivery</Link>
              <Link to="/contact" className="rounded-full px-4 py-2 hover:bg-primary/10 hover:text-primary transition-all duration-200">Contact Us</Link>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="relative hidden xl:block">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-56 rounded-full border border-white/50 bg-white/50 py-2 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all dark:border-white/10 dark:bg-white/5 dark:focus:bg-white/10"
                />
              </form>
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1 md:gap-2">
              {/* Mobile search toggle */}
              <button
                className="xl:hidden rounded-full p-2 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                onClick={() => setShowSearch((v) => !v)}
                aria-label="Search"
              >
                {showSearch ? <X size={20} /> : <Search size={20} />}
              </button>

              <Link
                to={isAdminAuthenticated() ? '/admin' : '/login'}
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary md:flex transition-all duration-200"
              >
                <User size={18} />
                {isAdminAuthenticated() ? 'Dashboard' : 'Account'}
              </Link>

              <Link
                to="/checkout"
                className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200"
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
            <form onSubmit={handleSearch} className="border-t border-white/40 px-5 py-3 lg:hidden dark:border-white/10">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-full rounded-full border border-white/50 bg-white/50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all dark:border-white/10 dark:bg-white/5"
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}
