import { Link } from '@tanstack/react-router';
import { Phone } from 'lucide-react';
import hippoLogo from '@/assets/hippo-logo.png';

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img src={hippoLogo} alt="Hippo Technology" className="h-14 w-auto object-contain brightness-0 invert" />
            <div>
              <div className="text-base font-extrabold leading-tight tracking-tight">HIPPO</div>
              <div className="text-sm font-bold leading-tight opacity-80">TECHNOLOGY</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-80">
            Your World, Upgraded. Premium electronics and audio gear, curated for the way you live.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm opacity-90">
            <Phone size={14} />
            <a href="tel:0798989741" className="hover:underline">0798989741</a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-sm font-semibold">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/category/$slug" params={{ slug: 'headphones' }} className="hover:opacity-100 hover:underline">Headphones</Link></li>
            <li><Link to="/category/$slug" params={{ slug: 'earbuds' }} className="hover:opacity-100 hover:underline">Earbuds</Link></li>
            <li><Link to="/deals" className="hover:opacity-100 hover:underline">Deals & Offers</Link></li>
            <li><Link to="/category/$slug" params={{ slug: 'all' }} className="hover:opacity-100 hover:underline">All Products</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold">Support</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/contact" className="hover:opacity-100 hover:underline">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:opacity-100 hover:underline">Shipping & Delivery</Link></li>
            <li><Link to="/returns" className="hover:opacity-100 hover:underline">Returns & Warranty</Link></li>
            <li><Link to="/faq" className="hover:opacity-100 hover:underline">FAQ</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/about" className="hover:opacity-100 hover:underline">About Us</Link></li>
            <li><a href="tel:0798989741" className="hover:opacity-100 hover:underline">0798989741</a></li>
            <li><a href="mailto:info@hippotech.rw" className="hover:opacity-100 hover:underline">info@hippotech.rw</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs opacity-70">
          © {new Date().getFullYear()} Hippo Technology. All rights reserved. — Your World, Upgraded.
        </div>
      </div>
    </footer>
  );
}
