import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { adminLogin, isAdminAuthenticated } from '@/lib/admin-auth';
import hippoLogo from '@/assets/hippo-logo.png';

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'Admin Login — Hippo Technology' }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      window.location.href = '/admin';
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = adminLogin(email, password);
    if (ok) {
      window.location.href = '/admin';
    } else {
      setError('Invalid email or password.');
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-surface-muted px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <img src={hippoLogo} alt="Hippo Technology" className="h-20 w-auto object-contain" />
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">HIPPO TECHNOLOGY</h1>
            <p className="text-xs font-medium text-primary italic">Your World, Upgraded.</p>
          </div>
          <p className="text-sm text-muted-foreground">Sign in to manage your store</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-background p-8 ring-1 ring-border/60 shadow-sm space-y-4"
        >
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@shopcart.com"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Password</span>
            <div className="relative mt-1">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary transition"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </label>

          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:opacity-60 transition"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

        </form>
      </div>
    </div>
  );
}
