import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cartStore, useCart } from "@/lib/cart-store";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Shopcart" },
      { name: "description", content: "Review your items and complete your Shopcart order." },
    ],
  }),
  component: Checkout,
});

const payments = [
  "Cash on Delivery",
  "Shopcart Card",
  "Paypal",
  "Credit or Debit card",
];

function Checkout() {
  const items = useCart();
  const [payment, setPayment] = useState(payments[0]);
  const [coupon, setCoupon] = useState("");

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-surface-muted">
      <Toaster position="top-right" />
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review your items and complete your order.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <section className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
              <h2 className="text-sm font-semibold">Review Item And Shipping</h2>
              <div className="mt-4 divide-y divide-border">
                {items.length === 0 ? (
                  <div className="py-10 text-center text-sm text-muted-foreground">
                    Your cart is empty.{" "}
                    <Link to="/" className="text-primary underline">
                      Continue shopping
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id + (item.color ?? "")}
                      className="grid grid-cols-[64px_1fr_auto] items-center gap-4 py-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        width={128}
                        height={128}
                        className="h-16 w-16 rounded-xl bg-surface-muted object-contain p-1"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.color ? `Color: ${item.color} · ` : ""}Qty {item.qty}
                        </div>
                        <div className="mt-2 inline-flex items-center rounded-full border border-border">
                          <button
                            onClick={() => cartStore.setQty(item.id, item.color, item.qty - 1)}
                            className="grid h-7 w-7 place-items-center"
                            aria-label="Decrease"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => cartStore.setQty(item.id, item.color, item.qty + 1)}
                            className="grid h-7 w-7 place-items-center"
                            aria-label="Increase"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                        <button
                          onClick={() => cartStore.remove(item.id, item.color)}
                          className="mt-2 text-muted-foreground hover:text-destructive"
                          aria-label="Remove"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
              <h2 className="text-sm font-semibold">Delivery Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" placeholder="Jane Doe" />
                <Field label="Mobile" placeholder="+1 234 567 890" />
                <Field label="Address" placeholder="Street address" className="sm:col-span-2" />
                <Field label="City" placeholder="City" />
                <Field label="Zip Code" placeholder="00000" />
                <Field label="Email" placeholder="you@example.com" className="sm:col-span-2" />
              </div>
            </section>

            <section className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
              <h2 className="text-sm font-semibold">Payment Details</h2>
              <div className="mt-4 space-y-2">
                {payments.map((p) => (
                  <label
                    key={p}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      payment === p
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === p}
                      onChange={() => setPayment(p)}
                      className="accent-primary"
                    />
                    {p}
                  </label>
                ))}
              </div>
              {payment === "Credit or Debit card" && (
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Card Number" placeholder="1234 5678 9012 3456" className="sm:col-span-2" />
                  <Field label="Cardholder Name" placeholder="Jane Doe" />
                  <Field label="Expiry / CVV" placeholder="MM/YY  ·  123" />
                </div>
              )}
            </section>
          </div>

          <aside className="h-fit space-y-4 rounded-2xl bg-background p-6 ring-1 ring-border/60 lg:sticky lg:top-28">
            <h2 className="text-sm font-semibold">Order Summary</h2>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter Coupon Code"
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={() => coupon && toast.success("Coupon applied")}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Apply
              </button>
            </div>

            <div className="space-y-2 pt-2 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Shipping" value="Free" />
              <Row label="Tax (estimated)" value={`$${(subtotal * 0.08).toFixed(2)}`} />
              <div className="my-3 h-px bg-border" />
              <Row label="Total" value={`$${(subtotal * 1.08).toFixed(2)}`} bold />
            </div>

            <button
              disabled={items.length === 0}
              onClick={() => {
                cartStore.clear();
                toast.success("Order placed! Thank you.");
              }}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-50"
            >
              Place Order
            </button>
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
}: {
  label: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
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
