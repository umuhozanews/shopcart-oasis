import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, Truck, HeadphonesIcon, Star, ChevronDown } from 'lucide-react';
import { useSiteSettings } from '@/lib/site-settings-store';
import hippoTeamImg from '@/assets/hippo-team.jpg';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Us — Hippo Technology' },
      { name: 'description', content: 'Learn about Hippo Technology — Rwanda\'s premier destination for original smartphones and electronics.' },
    ],
  }),
  component: About,
});

const faqs = [
  { q: 'How long does delivery take?', a: 'Standard delivery within Kigali takes 1–2 business days. Nationwide delivery takes 2–4 business days. We offer free delivery on all orders.' },
  { q: 'Are all products genuine?', a: 'Yes. Every product sold by Hippo Technology is 100% authentic and sourced directly from authorized distributors. We never sell counterfeits.' },
  { q: 'What payment methods do you accept?', a: 'We accept cash on delivery, MTN MoMo, Airtel Money, bank transfer, and card payments.' },
  { q: 'Do products come with warranty?', a: 'All products come with the manufacturer\'s warranty (typically 1 year). We also offer our own 30-day satisfaction guarantee.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all unused items in original packaging. Contact us and we\'ll arrange collection and a full refund or exchange.' },
  { q: 'Do you ship outside Rwanda?', a: 'Currently we ship within Rwanda only. Contact us for special arrangements.' },
];

function About() {
  const s = useSiteSettings();
  const storyImage = s.aboutStoryImageData || hippoTeamImg;
  const storyParagraphs = s.aboutStoryText.split('\n\n').filter(Boolean);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-20 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              {s.aboutHeroTitle}
            </h1>
            <p className="mt-5 text-lg opacity-90 max-w-xl mx-auto">
              {s.aboutHeroDesc}
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
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              {/* Left Column: Text */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">{s.aboutStoryTitle}</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {storyParagraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
              
              {/* Right Column: Custom Image */}
              <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden border border-border/80 bg-background shadow-md">
                <img
                  src={storyImage}
                  alt={s.aboutStoryTitle}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-surface-muted ring-1 ring-border/60 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold hover:text-primary transition"
                >
                  {faq.q}
                  <ChevronDown size={16} className={`shrink-0 text-muted-foreground transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-6 py-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            More questions? <Link to="/faq" className="text-primary underline">See full FAQ</Link> or <Link to="/contact" className="text-primary underline">contact us</Link>.
          </p>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 pb-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Ready to upgrade your world?</h2>
          <p className="mt-3 text-muted-foreground">Explore our full range of original smartphones and electronics.</p>
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
