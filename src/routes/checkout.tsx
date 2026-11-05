import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cartStore, useCart } from "@/lib/cart-store";
import { orderStore } from "@/lib/order-store";
import { Minus, Plus, Trash2, CheckCircle2, ShieldCheck } from "lucide-react";
import { productStore } from "@/lib/product-store";
import { formatRWF } from "@/lib/currency";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { siteSettingsStore } from "@/lib/site-settings-store";
import type { CartItem } from "@/lib/cart-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Hippo Technology" },
      { name: "description", content: "Review your items and complete your Hippo Technology order." },
    ],
  }),
  component: Checkout,
});

type CustomerForm = {
  name: string;
  mobile: string;
  address: string;
  city: string;
  email: string;
};

const emptyForm: CustomerForm = {
  name: "",
  mobile: "",
  address: "",
  city: "",
  email: "",
};

function buildOrderMessage(
  orderId: string,
  customer: CustomerForm,
  items: CartItem[],
  subtotal: number,
  total: number
): string {
  const lines = items
    .map((i) => {
      const prod = productStore.getById(i.id);
      const condition = i.condition ?? prod?.condition;
      const specs = i.specs ?? prod?.specs;

      let condText = "";
      if (condition === "dubai") condText = "🇦🇪 Dubai Open Box (Import)";
      else if (condition === "used") condText = "🔄 Second Hand (Certified Pre-Owned)";
      else if (condition === "new") condText = "🆕 Brand New (Factory Sealed Box)";

      const specList = specs
        ? Object.entries(specs)
            .map(([k, v]) => `   • ${k}: ${v}`)
            .join("\n")
        : "";

      return [
        `• *${i.name}*${i.color ? ` (${i.color})` : ""} x${i.qty} — ${formatRWF(i.price * i.qty)}`,
        condText ? `  Condition: ${condText}` : "",
        specList ? `  Full Specifications:\n${specList}` : "",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  return [
    `*New Order ${orderId}*`,
    "",
    "*Ordered Items & Detailed Specifications*",
    lines,
    "",
    `Subtotal: ${formatRWF(subtotal)}`,
    `*Total: ${formatRWF(total)}*`,
    "",
    "*Customer Details*",
    `Name: ${customer.name}`,
    `Mobile: ${customer.mobile}`,
    customer.address ? `Address: ${customer.address}` : "",
    customer.city ? `City: ${customer.city}` : "",
    customer.email ? `Email: ${customer.email}` : "",
    "Payment: Cash on Delivery",
    "Delivery: Free across Rwanda",
  ]
    .filter(Boolean)
    .join("\n");
}

function Checkout() {
  const items = useCart();
  const [customer, setCustomer] = useState<CustomerForm>(emptyForm);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [waLink, setWaLink] = useState("");

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const tax = 0;
  const total = subtotal;

  function setField(key: keyof CustomerForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setCustomer((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function placeOrder() {
    if (!customer.name.trim() || !customer.mobile.trim()) {
      toast.error("Please enter your name and mobile number.");
      return;
    }

    const order = orderStore.add({
      customer,
      items,
      paymentMethod: "Cash on Delivery",
      subtotal,
      tax,
      total,
    });

    const message = buildOrderMessage(
      order.id,
      customer,
      items,
      subtotal,
      total
    );
    const waNumber = siteSettingsStore.get().whatsapp;
    const link = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    cartStore.clear();
    setOrderId(order.id);
    setWaLink(link);
    setPlaced(true);
    toast.success("Order placed! Sending details to Hippo Technology…");

    // Forward the order straight to the shop's WhatsApp so the admin is notified.
    window.open(link, "_blank", "noopener,noreferrer");
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-surface-muted">
        <Header />
        <main className="mx-auto max-w-lg px-4 py-20 text-center">
          <CheckCircle2 size={56} className="mx-auto text-green-500 mb-5" />
          <h1 className="text-2xl font-bold tracking-tight">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Your order <span className="font-mono font-semibold text-foreground">{orderId}</span> has
            been placed.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            To confirm your order and delivery, please send the order details to us on WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1ebe5b]"
              >
                Confirm on WhatsApp
              </a>
            )}
            <Link
              to="/"
              className="inline-flex items-center rounded-full border border-primary px-8 py-3 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-muted">
      <Toaster position="top-right" />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review your items and complete your order.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {/* Cart items */}
            <section className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
              <h2 className="text-sm font-semibold">Review Items &amp; Shipping</h2>
              <div className="mt-4 divide-y divide-border">
                {items.length === 0 ? (
                  <div className="py-10 text-center text-sm text-muted-foreground">
                    Your cart is empty.{" "}
                    <Link to="/" className="text-primary underline">
                      Continue shopping
                    </Link>
                  </div>
                ) : (
                  items.map((item) => {
                    const prod = productStore.getById(item.id);
                    const condition = item.condition ?? prod?.condition;
                    const specs = item.specs ?? prod?.specs;
                    const specEntries = specs ? Object.entries(specs) : [];

                    return (
                      <div
                        key={item.id + (item.color ?? "")}
                        className="py-4 space-y-3 border-b border-border last:border-b-0"
                      >
                        <div className="grid grid-cols-[64px_1fr_auto] items-start gap-4">
                          <img
                            src={item.image}
                            onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "/product-image-fallback.svg"; }}
                            alt={item.name}
                            className="h-16 w-16 rounded-xl bg-surface-muted object-contain p-1"
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-foreground">{item.name}</div>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              {condition === "dubai" ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                                  🇦🇪 Dubai Open Box
                                </span>
                              ) : condition === "used" ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                                  🔄 Second Hand · Tested
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-700">
                                  🆕 Brand New · Sealed
                                </span>
                              )}
                              {item.color && (
                                <span className="text-xs text-muted-foreground">
                                  Color: {item.color}
                                </span>
                              )}
                            </div>
                            <div className="mt-2.5 inline-flex items-center rounded-full border border-border">
                              <button
                                onClick={() => cartStore.setQty(item.id, item.color, item.qty - 1)}
                                className="grid h-7 w-7 place-items-center hover:text-primary transition"
                                aria-label="Decrease"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-semibold">{item.qty}</span>
                              <button
                                onClick={() => cartStore.setQty(item.id, item.color, item.qty + 1)}
                                className="grid h-7 w-7 place-items-center hover:text-primary transition"
                                aria-label="Increase"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-foreground">{formatRWF(item.price * item.qty)}</div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">
                              {formatRWF(item.price)} each
                            </div>
                            <button
                              onClick={() => cartStore.remove(item.id, item.color)}
                              className="mt-2 text-muted-foreground hover:text-destructive transition"
                              aria-label="Remove"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Whole technical specifications for this phone / device */}
                        {specEntries.length > 0 && (
                          <div className="rounded-xl border border-border/70 bg-surface-muted/60 p-3.5">
                            <div className="mb-2.5 flex items-center justify-between text-xs font-bold text-foreground">
                              <span className="flex items-center gap-1.5 text-primary">
                                <ShieldCheck size={14} />
                                Full Technical Specifications
                              </span>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                                Complete Specs Breakdown
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                              {specEntries.map(([k, v]) => (
                                <div key={k} className="flex items-baseline justify-between border-b border-border/30 pb-1">
                                  <span className="text-muted-foreground font-medium pr-2">{k}:</span>
                                  <span className="text-foreground font-semibold text-right">{v}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* Delivery form */}
            <section className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
              <h2 className="text-sm font-semibold">Delivery Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  placeholder="Full name"
                  value={customer.name}
                  onChange={setField("name")}
                />
                <Field
                  label="Mobile"
                  placeholder="07XX XXX XXX"
                  value={customer.mobile}
                  onChange={setField("mobile")}
                />
                <Field
                  label="Address"
                  placeholder="Street / area"
                  className="sm:col-span-2"
                  value={customer.address}
                  onChange={setField("address")}
                />
                <Field
                  label="City"
                  placeholder="Kigali"
                  value={customer.city}
                  onChange={setField("city")}
                />
                <Field
                  label="Email (optional)"
                  placeholder="Email"
                  className="sm:col-span-2"
                  value={customer.email}
                  onChange={setField("email")}
                />
              </div>
            </section>

          </div>

          {/* Order summary */}
          <aside className="h-fit space-y-4 rounded-2xl bg-background p-6 ring-1 ring-border/60 lg:sticky lg:top-28">
            <h2 className="text-sm font-semibold">Order Summary</h2>

            <div className="space-y-2 pt-2 text-sm">
              <Row label="Subtotal" value={formatRWF(subtotal)} />
              <Row label="Shipping" value="Free" />
              <div className="my-3 h-px bg-border" />
              <Row label="Total" value={formatRWF(total)} bold />
            </div>

            <button
              disabled={items.length === 0}
              onClick={placeOrder}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
            >
              Place Order
            </button>

            {items.length > 0 && (
              <p className="text-center text-xs text-muted-foreground">
                By placing your order you agree to our terms of service.
              </p>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Field({
  label,
  placeholder,
  className = "",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
      />
    </label>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-bold" : "text-muted-foreground"}>{label}</span>
      <span className={bold ? "text-base font-bold" : "font-medium"}>{value}</span>
    </div>
  );
}
