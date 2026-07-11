import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronDown } from 'lucide-react';

export const Route = createFileRoute('/faq')({
  head: () => ({
    meta: [
      { title: 'FAQ — Hippo Technology' },
      { name: 'description', content: 'Frequently asked questions about orders, shipping, returns, and products at Hippo Technology.' },
    ],
  }),
  component: FAQ,
});

const faqs = [
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery within Kigali takes 1–2 business days. Nationwide delivery takes 2–4 business days. We offer free delivery on all orders.',
  },
  {
    q: 'Are all products genuine?',
    a: 'Yes. Every product sold by Hippo Technology is 100% authentic and sourced directly from authorized distributors. We never sell counterfeits.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day return policy on all unused items in original packaging. Simply contact us and we\'ll arrange collection and a full refund or exchange.',
  },
  {
    q: 'Do products come with warranty?',
    a: 'All products come with the manufacturer\'s warranty (typically 1 year). We also offer our own satisfaction guarantee for 30 days from purchase.',
  },
  {
    q: 'Can I pay on delivery?',
    a: 'Yes! Cash on delivery is available for all orders within Rwanda. You can also pay by card, mobile money (MTN MoMo / Airtel), or bank transfer.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order is dispatched, you\'ll receive an SMS with tracking details. You can also contact us at +250 793 051 054 for a real-time update.',
  },
  {
    q: 'Can I cancel or modify my order?',
    a: 'Orders can be cancelled or modified within 2 hours of placement. After dispatch, cancellation is not possible but you can initiate a return on delivery.',
  },
  {
    q: 'Do you ship outside Rwanda?',
    a: 'Currently we ship within Rwanda only. East Africa shipping is coming soon. Contact us for special arrangements.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-3 text-muted-foreground">Can't find an answer? <Link to="/contact" className="text-primary underline">Contact us</Link>.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-surface-muted ring-1 ring-border/60 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold hover:text-primary transition"
              >
                {faq.q}
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-muted-foreground transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-primary/5 border border-primary/20 px-8 py-7 text-center">
          <h3 className="font-semibold">Still have questions?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Our team is ready to help.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="tel:+250793051054" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
              Call +250 793 051 054
            </a>
            <Link to="/contact" className="rounded-full border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5 transition">
              Send a message
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
