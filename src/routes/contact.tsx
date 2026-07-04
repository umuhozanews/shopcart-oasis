import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Us — Hippo Technology' },
      { name: 'description', content: 'Get in touch with Hippo Technology. Call, email, or visit us in Kigali, Rwanda.' },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function setField(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-14">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight">Get in Touch</h1>
          <p className="mt-3 text-muted-foreground">We'd love to hear from you. Our team responds within 24 hours.</p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
          {/* Form */}
          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-muted p-16 text-center ring-1 ring-border/60">
              <CheckCircle2 size={52} className="text-green-500 mb-4" />
              <h2 className="text-xl font-bold">Message sent!</h2>
              <p className="mt-2 text-muted-foreground">We'll get back to you at {form.email} within 24 hours.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl bg-background p-8 ring-1 ring-border/60 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Your Name" placeholder="Jane Doe" value={form.name} onChange={setField('name')} required />
                <Field label="Email Address" placeholder="you@example.com" type="email" value={form.email} onChange={setField('email')} required />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Subject</label>
                <select
                  value={form.subject}
                  onChange={setField('subject')}
                  required
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
                >
                  <option value="">Select a topic</option>
                  <option>Order inquiry</option>
                  <option>Product question</option>
                  <option>Shipping & delivery</option>
                  <option>Returns & warranty</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={setField('message')}
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm"
              >
                Send Message
              </button>
            </form>
          )}

          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: Phone, label: 'Phone', value: '0798989741', href: 'tel:0798989741' },
              { icon: Mail, label: 'Email', value: 'info@hippotech.rw', href: 'mailto:info@hippotech.rw' },
              { icon: MapPin, label: 'Address', value: 'KG 501 St, Kigali, Rwanda', href: '#' },
              { icon: Clock, label: 'Hours', value: 'Mon–Sat: 8am – 6pm', href: '#' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-start gap-4 rounded-2xl bg-surface-muted p-5 ring-1 ring-border/60 hover:ring-primary/40 transition"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</div>
                  <div className="mt-0.5 font-medium text-foreground">{value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label, placeholder, type = 'text', value, onChange, required,
}: {
  label: string; placeholder?: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
      />
    </label>
  );
}
