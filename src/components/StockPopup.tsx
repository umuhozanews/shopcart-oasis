import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useBanners } from '@/lib/banner-store';

const SESSION_KEY = 'hippo_popup_shown';

export function StockPopup() {
  const { popup } = useBanners();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!popup.enabled) return;
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) return;
    const id = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, '1');
    }, 1200);
    return () => clearTimeout(id);
  }, [popup.enabled]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={popup.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-background shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 transition"
        >
          <X size={16} />
        </button>

        {/* Image */}
        {popup.imageData && (
          <div className="h-48 w-full overflow-hidden bg-accent">
            <img
              src={popup.imageData}
              alt={popup.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary mb-3">
            New Arrival
          </div>
          <h2 className="text-lg font-bold leading-snug text-foreground">{popup.title}</h2>
          {popup.message && (
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{popup.message}</p>
          )}
          <div className="mt-5 flex gap-2">
            {popup.buttonText && popup.buttonLink && (
              <Link
                to={popup.buttonLink as '/'}
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-primary py-2.5 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                {popup.buttonText}
              </Link>
            )}
            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground/70 hover:bg-surface-muted transition"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
