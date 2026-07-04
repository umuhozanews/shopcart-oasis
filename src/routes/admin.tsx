import { createFileRoute, Outlet, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Package, ShoppingBag, LogOut, ExternalLink } from 'lucide-react';
import { isAdminAuthenticated, adminLogout } from '@/lib/admin-auth';
import hippoLogo from '@/assets/hippo-logo.png';

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
});

function AdminLayout() {
  const [ready, setReady] = useState(false);
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
    if (!isAdminAuthenticated()) {
      window.location.href = '/login';
    } else {
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  function handleLogout() {
    adminLogout();
    window.location.href = '/login';
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  ];

  return (
    <div className="flex min-h-screen bg-surface-muted">
      {/* Sidebar */}
      <aside className="hidden w-60 flex-col bg-background border-r border-border md:flex">
        <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border">
          <img src={hippoLogo} alt="Hippo Technology" className="h-10 w-auto object-contain" />
          <div>
            <div className="text-xs font-extrabold leading-tight tracking-tight text-foreground">HIPPO</div>
            <div className="text-[10px] font-bold leading-tight text-primary">TECHNOLOGY</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? path === href : path.startsWith(href);
            return (
              <Link
                key={href}
                to={href as '/admin' | '/admin/products' | '/admin/orders'}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:bg-surface-muted hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-0.5">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/60 hover:bg-surface-muted hover:text-foreground transition"
          >
            <ExternalLink size={16} />
            View Store
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/60 hover:bg-destructive/10 hover:text-destructive transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile header */}
        <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3 md:hidden">
          <div className="flex items-center gap-2">
            <img src={hippoLogo} alt="Hippo Technology" className="h-8 w-auto object-contain" />
            <div>
              <div className="text-xs font-extrabold leading-tight text-foreground">HIPPO</div>
              <div className="text-[10px] font-bold leading-tight text-primary">TECHNOLOGY</div>
            </div>
          </div>
          <button onClick={handleLogout} className="text-muted-foreground hover:text-destructive transition">
            <LogOut size={18} />
          </button>
        </header>

        {/* Mobile nav */}
        <nav className="flex border-b border-border bg-background md:hidden">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? path === href : path.startsWith(href);
            return (
              <Link
                key={href}
                to={href as '/admin' | '/admin/products' | '/admin/orders'}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition border-b-2 ${
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-5 md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
