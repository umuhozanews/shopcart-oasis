import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Instagram, Phone, Search, ShoppingCart, Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-store';
import { categories } from '@/lib/products';
import { useSiteSettings } from '@/lib/site-settings-store';
import hippoLogo from '@/assets/hippo-logo-white.png';

export function Header() {
  const cart = useCart();
  const count = cart.reduce((total, item) => total + item.qty, 0);
  const navigate = useNavigate();
  const settings = useSiteSettings();
  const [query, setQuery] = useState('');
  const navigationCategories = categories.filter((category) => category.slug !== 'all');

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim()) return;
    navigate({ to: '/search', search: { q: query.trim() } });
    setQuery('');
  }

  return (
    <header className="shadow-sm">
      <div className="bg-[#103c2b] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 text-sm font-medium md:flex-row md:justify-between md:gap-5 md:px-6 md:py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2 text-sm md:text-base"><Truck size={18} /> Free delivery across Rwanda</span>
            <span className="rounded-full bg-emerald-200 px-4 py-1.5 text-center text-sm font-extrabold text-[#103c2b] md:px-5 md:py-2 md:text-base">10% OFF when you buy on our website</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a href={`tel:${settings.topbarPhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-sm md:text-base hover:text-emerald-200">
              <Phone size={17} /> {settings.topbarPhone}
            </a>
            <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm md:text-base hover:text-emerald-200">
              <Instagram size={17} /> {settings.instagramHandle}
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#1c6b47] to-[#12452f] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:flex-nowrap md:gap-7 md:px-6 md:py-5">
          <div className="flex shrink-0 items-center gap-2">
            <Link to="/" aria-label="Hippo Technology home" className="block shrink-0">
              <img src={hippoLogo} alt="Hippo Technology" className="h-10 w-auto object-contain md:h-14" />
            </Link>
            <span className="hidden whitespace-nowrap text-sm xl:inline">Deliver to Rwanda</span>
          </div>

          <form onSubmit={handleSearch} className="relative order-3 w-full md:order-none md:flex-1 md:max-w-xl">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              className="w-full rounded-md bg-white py-3 pl-4 pr-14 text-base text-gray-900 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-emerald-200"
            />
            <button type="submit" aria-label="Search products" className="absolute inset-y-0 right-0 flex items-center rounded-r-md bg-[#238653] px-4 text-white hover:bg-[#1b7044]">
              <Search size={21} />
            </button>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-2 text-sm md:gap-4 md:text-base">
            <Link to="/checkout" className="flex items-center gap-1.5 text-white hover:text-cyan-100">
              <ShoppingCart size={22} />
              <span>Cart ({count})</span>
            </Link>
          </div>
        </div>
      </div>

      <nav aria-label="Product categories" className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl overflow-x-auto px-3 md:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex w-max min-w-full items-center gap-5 whitespace-nowrap py-3 text-xs font-semibold text-gray-800 sm:gap-8 sm:py-4 sm:text-[15px] md:text-base">
            <li className="shrink-0"><Link to="/" className="hover:text-cyan-600">Home</Link></li>
            <li className="shrink-0"><Link to="/deals" className="hover:text-cyan-600">Deals</Link></li>
            {navigationCategories.map((category) => (
              <li key={category.slug} className="shrink-0">
                <Link to="/category/$slug" params={{ slug: category.slug }} className="hover:text-cyan-600">{category.name.toUpperCase()}</Link>
              </li>
            ))}
            <li className="shrink-0"><Link to="/about" className="hover:text-cyan-600">Our story</Link></li>
            <li className="shrink-0"><Link to="/shipping" className="hover:text-cyan-600">Delivery</Link></li>
            <li className="shrink-0"><Link to="/contact" className="hover:text-cyan-600">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
