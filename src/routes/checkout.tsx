import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cartStore, useCart } from "@/lib/cart-store";
import { orderStore } from "@/lib/order-store";
import { Minus, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Hippo Technology" },
      { name: "description", content: "Review your items and complete your Hippo Technology order." },
    ],
  }),
  component: Checkout,
});

const PAYMENTS = ["Cash on Delivery", "Shopcart Card", "Paypal", "Credit or Debit card"];

type CustomerForm = {
  name: string;
  mobile: string;
  address: string;
  city: string;
  zip: string;
  email: string;
};

const emptyForm: CustomerForm = {
  name: "",
  mobile: "",
  address: "",
  city: "",
  zip: "",
  email: "",
};

function Checkout() {
  const items = useCart();
  const [payment, setPayment] = useState(PAYMENTS[0]);
  const [coupon, setCoupon] = useState("");
  const [customer, setCustomer] = useState<CustomerForm>(emptyForm);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  function setField(key: keyof CustomerForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setCustomer((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function placeOrder() {
    const order = orderStore.add({
      customer,
      items,
      paymentMethod: payment,
      subtotal,
      tax,
      total,
    });
    cartStore.clear();
    setOrderId(order.id);
    setPlaced(true);
    toast.success("Order placed! Thank you for shopping with us.");
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
          <Link
            to="/"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
          >
            Continue Shopping
          </Link>
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
                  items.map((item) => (
                    <div
                      key={item.id + (item.color ?? "")}
                      className="grid grid-cols-[64px_1fr_auto] items-center gap-4 py-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
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
                        <div className="text-sm font-bold">${(item.price * item.qty).toFixed(2)}</div>
                        <button
                          onClick={() => cartStore.remove(item.id, item.color)}
                          className="mt-2 text-muted-foreground hover:text-destructive transition"
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

            {/* Delivery form */}
            <section className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
              <h2 className="text-sm font-semibold">Delivery Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="Name"
                  placeholder="Jane Doe"
                  value={customer.name}
                  onChange={setField("name")}
                />
                <Field
                  label="Mobile"
                  placeholder="+1 234 567 890"
                  value={customer.mobile}
                  onChange={setField("mobile")}
                />
                <Field
                  label="Address"
                  placeholder="Street address"
                  className="sm:col-span-2"
                  value={customer.address}
                  onChange={setField("address")}
                />
                <Field
                  label="City"
                  placeholder="City"
                  value={customer.city}
                  onChange={setField("city")}
                />
                <Field
                  label="Zip Code"
                  placeholder="00000"
                  value={customer.zip}
                  onChange={setField("zip")}
                />
                <Field
                  label="Email"
                  placeholder="you@example.com"
                  className="sm:col-span-2"
                  value={customer.email}
                  onChange={setField("email")}
                />
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
              <h2 className="text-sm font-semibold">Payment Details</h2>
              <div className="mt-4 space-y-2">
                {PAYMENTS.map((p) => (
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
                  <Field
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    className="sm:col-span-2"
                    value=""
                    onChange={() => {}}
                  />
                  <Field label="Cardholder Name" placeholder="Jane Doe" value="" onChange={() => {}} />
                  <Field label="Expiry / CVV" placeholder="MM/YY  ·  123" value="" onChange={() => {}} />
                </div>
              )}
            </section>
          </div>

          {/* Order summary */}
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
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
              >
                Apply
              </button>
            </div>

            <div className="space-y-2 pt-2 text-sm">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Shipping" value="Free" />
              <Row label="Tax (8%)" value={`$${tax.toFixed(2)}`} />
              <div className="my-3 h-px bg-border" />
              <Row label="Total" value={`$${total.toFixed(2)}`} bold />
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
