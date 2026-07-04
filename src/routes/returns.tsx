import { createFileRoute, Link } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RotateCcw, CheckCircle2, XCircle } from 'lucide-react';

export const Route = createFileRoute('/returns')({
  head: () => ({
    meta: [
      { title: 'Returns & Warranty — Hippo Technology' },
      { name: 'description', content: '30-day hassle-free returns and manufacturer warranty on all Hippo Technology products.' },
    ],
  }),
  component: Returns,
});

function Returns() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="flex items-center gap-4 mb-2">
          <RotateCcw size={28} className="text-primary" />
          <h1 className="text-3xl font-extrabold tracking-tight">Returns & Warranty</h1>
        </div>
        <p className="mt-2 text-muted-foreground">Shop with confidence — 30-day returns, no questions asked.</p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base mb-4">Return Policy</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                '30-day return window from date of delivery',
                'Items must be unused and in original packaging',
                'Free return collection — we pick up from your location',
                'Full refund issued within 3–5 business days',
                'Exchanges available for different color or model',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base mb-4">What Cannot Be Returned</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                'Items used beyond initial inspection',
                'Products with missing original packaging or accessories',
                'Items damaged by misuse or accident',
                'Customised or personalised products',
                'Items purchased during clearance sales (marked as final sale)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle size={16} className="mt-0.5 shrink-0 text-destructive" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
          <h2 className="font-semibold text-base mb-4">Warranty Information</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 text-sm">
            {[
              { label: 'Manufacturer Warranty', value: '1 year on all products' },
              { label: 'Our Guarantee', value: '30 days satisfaction' },
              { label: 'Support', value: '0798989741 (Mon–Sat)' },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-background p-4 ring-1 ring-border/60">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</div>
                <div className="mt-1 font-semibold text-foreground">{value}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            To make a warranty claim, contact us with your order ID and a description of the defect.
            We'll arrange repair, replacement, or refund within 5–7 business days.
          </p>
        </div>

        <div className="mt-10 rounded-2xl bg-primary/5 border border-primary/20 p-7">
          <h2 className="font-semibold">How to initiate a return</h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal list-inside">
            <li>Contact us by phone or via the contact form below.</li>
            <li>Provide your order ID and the reason for return.</li>
            <li>We'll schedule a free collection from your address.</li>
            <li>Once received and inspected, your refund is processed within 3–5 days.</li>
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="tel:0798989741" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
              Call 0798989741
            </a>
            <Link to="/contact" className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-surface-muted transition">
              Contact Form
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
