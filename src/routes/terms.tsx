import { createFileRoute, Link } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText } from 'lucide-react';

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: [
      { title: 'Terms & Conditions — Hippo Technology' },
      { name: 'description', content: 'Read the terms and conditions for shopping at Hippo Technology Rwanda.' },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="flex items-center gap-4 mb-2">
          <FileText size={28} className="text-primary" />
          <h1 className="text-3xl font-extrabold tracking-tight">Terms & Conditions</h1>
        </div>
        <p className="mt-2 text-muted-foreground">By using our website or placing an order, you agree to these terms.</p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">1. General</h2>
            <p>These terms govern your use of the Hippo Technology website and any purchases made through it. Hippo Technology is based in Kigali, Rwanda and sells original electronics and tech products.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">2. Product Authenticity</h2>
            <p>All products sold by Hippo Technology are genuine and sourced from authorized distributors or manufacturers. We do not sell counterfeit or imitation products. Each product listing clearly states its condition (new or refurbished).</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">3. Pricing & Payments</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>All prices are in Rwandan Francs (RWF) and include applicable taxes</li>
              <li>Prices may change without prior notice</li>
              <li>Payment is accepted via mobile money, bank transfer, and cash on delivery</li>
              <li>Orders are confirmed only after payment verification</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">4. Delivery</h2>
            <p>We deliver across Rwanda. Delivery timelines depend on your location. You will be contacted to arrange delivery after your order is confirmed. See our <Link to="/shipping" className="text-primary underline">Shipping Policy</Link> for details.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">5. Returns & Warranty</h2>
            <p>We offer a 30-day return policy and manufacturer warranty on all products. See our <Link to="/returns" className="text-primary underline">Returns & Warranty</Link> page for full details.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">6. Limitation of Liability</h2>
            <p>Hippo Technology is not liable for any indirect, incidental, or consequential damages arising from the use of our products beyond the scope of applicable warranty and return policies.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">7. Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time. Continued use of our website after changes are posted constitutes your acceptance of the new terms.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">8. Contact</h2>
            <p>For any questions about these terms, contact us at <a href="mailto:info@hippotech.rw" className="text-primary underline">info@hippotech.rw</a> or via our <Link to="/contact" className="text-primary underline">Contact page</Link>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
