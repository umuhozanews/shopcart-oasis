import { createFileRoute, Link } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Truck, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/shipping')({
  head: () => ({
    meta: [
      { title: 'Shipping & Delivery — Hippo Technology' },
      { name: 'description', content: 'Free shipping on all orders within Rwanda. Kigali delivery in 1–2 days, nationwide 2–4 days.' },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight">Shipping & Delivery</h1>
        <p className="mt-3 text-muted-foreground">All orders ship free within Rwanda. Here's everything you need to know.</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: Truck, title: 'Free Delivery', desc: 'Free on every order, no minimum spend required.' },
            { icon: Clock, title: '1–4 Business Days', desc: 'Kigali: 1–2 days. Nationwide: 2–4 days.' },
            { icon: MapPin, title: 'Rwanda-Wide', desc: 'We deliver to all provinces and districts.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-surface-muted p-6 ring-1 ring-border/60 text-center">
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-primary/10">
                <Icon size={20} className="text-primary" />
              </div>
              <div className="font-semibold">{title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          <Section title="Delivery Zones & Timeframes">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 text-left font-semibold">Zone</th>
                  <th className="py-3 text-left font-semibold">Delivery Time</th>
                  <th className="py-3 text-left font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                {[
                  ['Kigali City', '1–2 business days', 'Free'],
                  ['Northern Province', '2–3 business days', 'Free'],
                  ['Southern Province', '2–3 business days', 'Free'],
                  ['Eastern Province', '2–4 business days', 'Free'],
                  ['Western Province', '3–4 business days', 'Free'],
                ].map(([zone, time, cost]) => (
                  <tr key={zone}>
                    <td className="py-3">{zone}</td>
                    <td className="py-3">{time}</td>
                    <td className="py-3 font-semibold text-green-600">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Order Processing">
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                'Orders placed before 2pm on business days ship the same day.',
                'Orders placed after 2pm or on weekends ship the next business day.',
                'You will receive an SMS confirmation once your order is dispatched.',
                'Our delivery team will call you before arrival.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Payment on Delivery">
            <p className="text-sm text-muted-foreground">
              Cash on delivery is available for all orders. You can also prepay via card, MTN MoMo,
              Airtel Money, or bank transfer and skip the wait. Payment is only collected once you've
              inspected and accepted your order.
            </p>
          </Section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Have questions about your delivery?</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="tel:0798989741" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
              Call 0798989741
            </a>
            <Link to="/contact" className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-surface-muted transition">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
      <h2 className="text-base font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
