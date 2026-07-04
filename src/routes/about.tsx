import { createFileRoute, Link } from '@tanstack/react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, Truck, HeadphonesIcon, Star } from 'lucide-react';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Us — Hippo Technology' },
      { name: 'description', content: 'Learn about Hippo Technology — Rwanda\'s premier destination for premium audio and electronics.' },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Your World, Upgraded.
            </h1>
            <p className="mt-5 text-lg opacity-90 max-w-xl mx-auto">
              Hippo Technology is Rwanda's leading destination for premium audio gear, electronics, and
              tech accessories — curated for how you live, work, and play.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight">Why Choose Hippo Technology?</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Star, title: 'Premium Quality', desc: 'We carry only genuine, top-rated products from the world\'s leading audio brands.' },
              { icon: Shield, title: 'Warranty Protected', desc: 'Every product comes with manufacturer warranty and our own satisfaction guarantee.' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Free nationwide delivery on all orders. Most items arrive within 1–3 business days.' },
              { icon: HeadphonesIcon, title: 'Expert Support', desc: 'Our audio specialists are available to help you find the perfect product for your needs.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-surface-muted p-6 ring-1 ring-border/60 text-center">
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="bg-surface-muted py-20 px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight">Our Story</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hippo Technology was founded with a simple mission: make world-class electronics accessible to
                everyone in Rwanda. We noticed that premium audio products — the kind that genuinely improve
                your day — were hard to find locally, often counterfeit, or massively overpriced.
              </p>
              <p>
                We changed that. By building direct relationships with authorized distributors and manufacturers,
                we bring you authentic products at fair prices, backed by real warranties and real support.
              </p>
              <p>
                Today we serve thousands of customers across Rwanda, from Kigali to the countryside, with a
                growing catalog of headphones, earbuds, speakers, and accessories. We're just getting started.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Ready to upgrade your world?</h2>
          <p className="mt-3 text-muted-foreground">Explore our full range of premium audio and electronics.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-primary px-8 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
