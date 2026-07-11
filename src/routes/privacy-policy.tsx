import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield } from 'lucide-react';

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Hippo Technology' },
      { name: 'description', content: 'Learn how Hippo Technology collects, uses, and protects your personal information.' },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="flex items-center gap-4 mb-2">
          <Shield size={28} className="text-primary" />
          <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
        </div>
        <p className="mt-2 text-muted-foreground">Last updated: {new Date().getFullYear()}</p>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">1. Information We Collect</h2>
            <p>When you place an order or contact us, we may collect your name, phone number, email address, and delivery address. We also collect basic usage data to improve our website.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">2. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To process and deliver your orders</li>
              <li>To communicate order updates and support</li>
              <li>To improve our products and services</li>
              <li>To send promotional messages (only with your consent)</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">3. Information Sharing</h2>
            <p>We do not sell or share your personal information with third parties except delivery partners who need it to fulfil your order. All partners are bound by confidentiality.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">4. Data Security</h2>
            <p>We take reasonable steps to protect your personal data against unauthorized access or disclosure. All transactions are handled securely.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">5. Cookies</h2>
            <p>Our website uses essential cookies to ensure proper functionality such as your shopping cart. We do not use tracking cookies for advertising purposes.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or request deletion of your personal data at any time. Contact us at <a href="mailto:info@hippotech.rw" className="text-primary underline">info@hippotech.rw</a> to exercise these rights.</p>
          </section>

          <section className="rounded-2xl bg-surface-muted p-7 ring-1 ring-border/60">
            <h2 className="font-semibold text-base text-foreground mb-3">7. Contact</h2>
            <p>For privacy-related questions, contact us at <a href="mailto:info@hippotech.rw" className="text-primary underline">info@hippotech.rw</a> or call <a href="tel:+250798464448" className="text-primary underline">+250 798 464 448</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
