import { createFileRoute, Link } from '@tanstack/react-router';
import { Package, ShoppingBag, DollarSign, Clock, Users, TrendingUp } from 'lucide-react';
import { formatRWF } from '@/lib/currency';
import { useProducts } from '@/lib/product-store';
import { useOrders } from '@/lib/order-store';
import { useVisits, visitorStore } from '@/lib/visitor-store';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function AdminDashboard() {
  const products = useProducts();
  const orders = useOrders();
  useVisits(); // subscribe to updates
  const [todayVisits, setTodayVisits] = useState(0);
  const [weekVisits, setWeekVisits] = useState(0);
  const [topPages, setTopPages] = useState<{ path: string; count: number }[]>([]);

  useEffect(() => {
    setTodayVisits(visitorStore.todayCount());
    setWeekVisits(visitorStore.weekCount());
    setTopPages(visitorStore.topPages());
  }, []);

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pending = orders.filter((o) => o.status === 'pending').length;

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Revenue', value: formatRWF(revenue), icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Pending Orders', value: pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Visits Today', value: todayVisits, icon: Users, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Visits This Week', value: weekVisits, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of your store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl bg-background p-5 ring-1 ring-border/60">
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
              <div className={`grid h-9 w-9 place-items-center rounded-xl ${bg} flex-shrink-0`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {orders.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No orders yet — they appear here once customers place orders.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {orders.slice(0, 6).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <div className="font-mono text-sm font-medium">{order.id}</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">{order.customer.name}</div>
                  </div>
                  <div className="ml-4 flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm font-semibold">{formatRWF(order.total)}</span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visitor top pages */}
        <div className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Top Pages</h2>
            <span className="text-xs text-muted-foreground">{weekVisits} visits this week</span>
          </div>
          {topPages.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No visitor data yet — pages will appear as customers browse the store.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {topPages.map(({ path, count }) => (
                <div key={path} className="flex items-center justify-between py-3">
                  <span className="font-mono text-sm text-foreground truncate max-w-[180px]">{path || '/'}</span>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="h-1.5 w-20 rounded-full bg-surface-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.min(100, (count / (topPages[0]?.count || 1)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products snapshot */}
      <div className="rounded-2xl bg-background p-6 ring-1 ring-border/60">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Products</h2>
          <Link to="/admin/products" className="text-xs text-primary hover:underline">Manage</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-xl bg-surface-muted p-3">
              <img
                src={p.image}
                alt={p.name}
                className="h-10 w-10 flex-shrink-0 rounded-lg bg-background object-contain p-1"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{p.name}</div>
                <div className={`text-xs ${p.stock <= 5 ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                  Stock: {p.stock}
                </div>
              </div>
              <span className="flex-shrink-0 text-sm font-semibold">{formatRWF(p.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
