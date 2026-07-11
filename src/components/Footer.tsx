import { Link } from '@tanstack/react-router';
import { Phone, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react';
import hippoLogo from '@/assets/hippo-logo.png';
import { useSiteSettings } from '@/lib/site-settings-store';

export function Footer() {
  const s = useSiteSettings();
  const logoSrc = s.logoData || hippoLogo;

  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt={s.siteName}
              className={`h-14 w-auto object-contain ${s.logoData ? '' : 'brightness-0 invert'}`}
            />
          </div>
          <p className="mt-4 max-w-xs text-sm opacity-80">{s.siteTagline}</p>
          <div className="mt-4 flex items-start gap-2 text-sm opacity-90">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>{s.address}</span>
          </div>
          {/* Social */}
          <div className="mt-5 flex items-center gap-3">
            {s.facebookUrl && (
              <a
                href={s.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
              >
                <Facebook size={18} />
              </a>
            )}
            <a
              href={s.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
            >
              <Instagram size={18} />
            </a>
            <a
              href={s.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Channel"
              className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
            >
              <MessageCircle size={18} />
            </a>
            {s.tiktokUrl && (
              <a
                href={s.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-primary-foreground/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-sm font-semibold">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li><Link to="/category/$slug" params={{ slug: 'phones' }} className="hover:opacity-100 hover:underline">Smartphones</Link></li>
            <li><Link to="/category/$slug" params={{ slug: 'tablets' }} className="hover:opacity-100 hover:underline">Tablets</Link></li>
            <li><Link to="/category/$slug" params={{ slug: 'computer' }} className="hover:opacity-100 hover:underline">Laptops</Link></li>
            <li><Link to="/category/$slug" params={{ slug: 'smart-watches' }} className="hover:opacity-100 hover:underline">Smart Watches</Link></li>
            <li><Link to="/category/$slug" params={{ slug: 'accessories' }} className="hover:opacity-100 hover:underline">Accessories</Link></li>
            <li><Link to="/category/$slug" params={{ slug: 'gaming' }} className="hover:opacity-100 hover:underline">Gaming</Link></li>
            <li><Link to="/deals" className="hover:opacity-100 hover:underline">Deals & Offers</Link></li>
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
            <li><Link to="/about" className="hover:opacity-100 hover:underline">About Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:opacity-100 hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:opacity-100 hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold">Get in Touch</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            {s.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 hover:opacity-100 hover:underline"
                >
                  <Phone size={14} className="shrink-0" />
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${s.email}`}
                className="hover:opacity-100 hover:underline"
              >
                {s.email}
              </a>
            </li>
            <li>
              <a
                href={s.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-100 hover:underline"
              >
                <Instagram size={14} className="shrink-0" />
                {s.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-5 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <span>
            {s.footerCopyright
              ? s.footerCopyright.replace('{year}', String(new Date().getFullYear()))
              : `© ${new Date().getFullYear()} ${s.siteName} ${s.siteSubtitle} Ltd. All rights reserved.`}
          </span>
          <span>
            Website by{' '}
            <span className="font-semibold opacity-100">GACONDO TECH</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
