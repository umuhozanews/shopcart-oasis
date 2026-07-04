import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';
import { useOrders, orderStore, type Order } from '@/lib/order-store';

export const Route = createFileRoute('/admin/orders')({
  component: AdminOrders,
});

const ALL_STATUSES: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

function AdminOrders() {
  const orders = useOrders();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all');

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-background py-24 ring-1 ring-border/60">
          <Package size={40} className="text-muted-foreground/40 mb-4" />
          <p className="text-sm text-muted-foreground">No orders yet</p>
          <p className="mt-1 text-xs text-muted-foreground">Orders will appear here once customers place them.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="mt-1 text-sm text-muted-foreground">{orders.length} total orders</p>
        </div>
        {/* Status filter */}
        <div className="flex flex-wrap gap-2">
          {(['all', ...ALL_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filter === s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground/70 ring-1 ring-border hover:ring-primary/40'
              }`}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              {s !== 'all' && (
                <span className="ml-1 opacity-70">
                  ({orders.filter((o) => o.status === s).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-background ring-1 ring-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Order ID</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">
                  Date
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">Total</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                    No orders with status "{filter}"
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <>
                    <tr
                      key={order.id}
                      className="border-b border-border hover:bg-surface-muted/40 transition"
                    >
                      <td className="px-5 py-3.5 font-mono text-sm font-medium">{order.id}</td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <div className="font-medium">{order.customer.name || '—'}</div>
                        <div className="text-xs text-muted-foreground">{order.customer.email || ''}</div>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground hidden md:table-cell">
                        {new Date(order.date).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            orderStore.updateStatus(order.id, e.target.value as Order['status'])
                          }
                          className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ${STATUS_STYLES[order.status]}`}
                        >
                          {ALL_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => setExpanded((prev) => (prev === order.id ? null : order.id))}
                          className="text-muted-foreground hover:text-foreground transition"
                          aria-label="Toggle details"
                        >
                          {expanded === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </td>
                    </tr>

                    {expanded === order.id && (
                      <tr key={`${order.id}-detail`} className="border-b border-border">
                        <td colSpan={6} className="bg-surface-muted/40 px-5 py-5">
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Items */}
                            <div>
                              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Items ({order.items.reduce((n, i) => n + i.qty, 0)})
                              </h3>
                              <div className="space-y-2.5">
                                {order.items.map((item) => (
                                  <div
                                    key={item.id + (item.color ?? '')}
                                    className="flex items-center gap-3"
                                  >
                                    <img
                                      src={item.image}
                                      alt=""
                                      className="h-9 w-9 flex-shrink-0 rounded-lg bg-background object-contain p-1"
                                    />
                                    <div className="min-w-0 flex-1">
                                      <div className="truncate text-sm font-medium">
                                        {item.name}
                                        {item.color && (
                                          <span className="ml-1 text-muted-foreground">
                                            ({item.color})
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        ${item.price.toFixed(2)} × {item.qty}
                                      </div>
                                    </div>
                                    <span className="flex-shrink-0 text-sm font-semibold">
                                      ${(item.price * item.qty).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Customer + Summary */}
                            <div className="space-y-4">
                              <div>
                                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                  Delivery Address
                                </h3>
                                <div className="text-sm space-y-0.5">
                                  <div className="font-medium">{order.customer.name || '—'}</div>
                                  {order.customer.address && (
                                    <div className="text-muted-foreground">
                                      {order.customer.address}
                                    </div>
                                  )}
                                  {(order.customer.city || order.customer.zip) && (
                                    <div className="text-muted-foreground">
                                      {[order.customer.city, order.customer.zip]
                                        .filter(Boolean)
                                        .join(', ')}
                                    </div>
                                  )}
                                  {order.customer.mobile && (
                                    <div className="text-muted-foreground">{order.customer.mobile}</div>
                                  )}
                                  {order.customer.email && (
                                    <div className="text-muted-foreground">{order.customer.email}</div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                  Payment
                                </h3>
                                <div className="text-sm">{order.paymentMethod}</div>
                              </div>

                              <div className="rounded-xl bg-background p-3 space-y-1.5">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Subtotal</span>
                                  <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Shipping</span>
                                  <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Tax (8%)</span>
                                  <span>${order.tax.toFixed(2)}</span>
                                </div>
                                <div className="my-1.5 h-px bg-border" />
                                <div className="flex justify-between text-sm font-bold">
                                  <span>Total</span>
                                  <span>${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
