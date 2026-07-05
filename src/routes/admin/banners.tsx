import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import {
  Plus, Trash2, Check, X, Upload, ChevronUp, ChevronDown, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { useBanners, bannerStore, type HeroSlide, type StockPopup } from '@/lib/banner-store';
import heroWoman from '@/assets/hero-woman.jpg';

export const Route = createFileRoute('/admin/banners')({
  component: AdminBanners,
});

async function processImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX = 1600;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width >= height) { height = Math.round((height * MAX) / width); width = MAX; }
        else { width = Math.round((width * MAX) / height); height = MAX; }
      }
      const c = document.createElement('canvas');
      c.width = width; c.height = height;
      const ctx = c.getContext('2d')!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      resolve(c.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Load failed')); };
    img.src = url;
  });
}

function ImagePicker({
  value, onChange, fallback, label = 'Image',
}: {
  value: string; onChange: (v: string) => void; fallback?: string; label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const preview = value || fallback;

  async function pick(file: File) {
    if (!file.type.startsWith('image/')) { setErr('Select an image file.'); return; }
    setErr(''); setBusy(true);
    try { onChange(await processImage(file)); }
    catch { setErr('Failed to process. Try another file.'); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      <input ref={ref} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) pick(f); e.target.value = ''; }} />
      <div className="flex items-start gap-3">
        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-surface-muted">
          {preview
            ? <img src={preview} alt="" className="h-full w-full object-cover" />
            : <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">No image</div>}
          {value && (
            <button type="button" onClick={() => onChange('')}
              className="absolute top-0.5 right-0.5 grid h-5 w-5 place-items-center rounded-full bg-destructive text-white hover:bg-destructive/80">
              <X size={10} />
            </button>
          )}
        </div>
        <div>
          <button type="button" onClick={() => ref.current?.click()} disabled={busy}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface-muted transition">
            {busy ? <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" /> : <Upload size={12} />}
            {busy ? 'Processing…' : 'Upload'}
          </button>
          {err && <p className="mt-1 text-[11px] text-destructive">{err}</p>}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary transition" />
    </label>
  );
}

const BLANK_SLIDE: Omit<HeroSlide, 'id'> = {
  imageData: '',
  badge: '',
  title: '',
  subtitle: '',
  buttonText: 'Shop Now',
  buttonLink: '/category/all',
};

function SlideCard({
  slide, index, total,
  onChange, onDelete, onMoveUp, onMoveDown,
}: {
  slide: HeroSlide; index: number; total: number;
  onChange: (s: HeroSlide) => void;
  onDelete: () => void; onMoveUp: () => void; onMoveDown: () => void;
}) {
  function set<K extends keyof HeroSlide>(key: K, val: HeroSlide[K]) {
    onChange({ ...slide, [key]: val });
  }

  return (
    <div className="rounded-2xl bg-background ring-1 ring-border/60 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">Slide {index + 1}</span>
        <div className="flex items-center gap-1">
          <button onClick={onMoveUp} disabled={index === 0}
            className="grid h-7 w-7 place-items-center rounded-lg border border-border hover:bg-surface-muted disabled:opacity-30 transition">
            <ChevronUp size={13} />
          </button>
          <button onClick={onMoveDown} disabled={index === total - 1}
            className="grid h-7 w-7 place-items-center rounded-lg border border-border hover:bg-surface-muted disabled:opacity-30 transition">
            <ChevronDown size={13} />
          </button>
          <button onClick={onDelete}
            className="grid h-7 w-7 place-items-center rounded-lg border border-border hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <ImagePicker
        label="Slide Image"
        value={slide.imageData}
        onChange={(v) => set('imageData', v)}
        fallback={heroWoman}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Badge text" value={slide.badge} onChange={(v) => set('badge', v)}
          placeholder="New Arrival" />
        <Field label="Button text" value={slide.buttonText} onChange={(v) => set('buttonText', v)}
          placeholder="Shop Now" />
        <div className="sm:col-span-2">
          <Field label="Title *" value={slide.title} onChange={(v) => set('title', v)}
            placeholder="Top Phones & Gadgets…" />
        </div>
        <div className="sm:col-span-2">
          <Field label="Subtitle" value={slide.subtitle} onChange={(v) => set('subtitle', v)}
            placeholder="Short description" />
        </div>
        <div className="sm:col-span-2">
          <Field label="Button link" value={slide.buttonLink} onChange={(v) => set('buttonLink', v)}
            placeholder="/category/all or /product/iphone-16-pro-max" />
        </div>
      </div>
    </div>
  );
}

function AdminBanners() {
  const data = useBanners();
  const [slides, setSlides] = useState<HeroSlide[]>(data.slides);
  const [popup, setPopup] = useState<StockPopup>(data.popup);
  const [slidesDirty, setSlidesDirty] = useState(false);
  const [popupDirty, setPopupDirty] = useState(false);
  const [slidesSaved, setSlidesSaved] = useState(false);
  const [popupSaved, setPopupSaved] = useState(false);

  function updateSlide(i: number, s: HeroSlide) {
    const next = slides.map((sl, idx) => idx === i ? s : sl);
    setSlides(next); setSlidesDirty(true);
  }
  function deleteSlide(i: number) {
    setSlides(slides.filter((_, idx) => idx !== i)); setSlidesDirty(true);
  }
  function moveSlide(i: number, dir: -1 | 1) {
    const next = [...slides];
    const j = i + dir;
    [next[i], next[j]] = [next[j], next[i]];
    setSlides(next); setSlidesDirty(true);
  }
  function addSlide() {
    setSlides([...slides, { ...BLANK_SLIDE, id: `slide-${Date.now()}` }]);
    setSlidesDirty(true);
  }
  function saveSlides() {
    bannerStore.saveSlides(slides);
    setSlidesDirty(false); setSlidesSaved(true);
    setTimeout(() => setSlidesSaved(false), 2000);
  }

  function setPopupField<K extends keyof StockPopup>(key: K, val: StockPopup[K]) {
    setPopup((prev) => ({ ...prev, [key]: val }));
    setPopupDirty(true);
  }
  function savePopup() {
    bannerStore.savePopup(popup);
    setPopupDirty(false); setPopupSaved(true);
    setTimeout(() => setPopupSaved(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Banners & Promotions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage the homepage slider and new-stock popup</p>
      </div>

      {/* ── Hero Slider ────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Hero Slider</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Add multiple slides — they auto-rotate every 5 seconds</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={addSlide}
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-surface-muted transition">
              <Plus size={14} /> Add Slide
            </button>
            <button onClick={saveSlides} disabled={!slidesDirty}
              className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition">
              <Check size={14} />
              {slidesSaved ? 'Saved!' : 'Save Slides'}
            </button>
          </div>
        </div>

        {slides.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border py-14 text-center text-sm text-muted-foreground">
            No slides yet —{' '}
            <button onClick={addSlide} className="text-primary underline underline-offset-2">add your first slide</button>
          </div>
        ) : (
          <div className="space-y-4">
            {slides.map((slide, i) => (
              <SlideCard
                key={slide.id}
                slide={slide}
                index={i}
                total={slides.length}
                onChange={(s) => updateSlide(i, s)}
                onDelete={() => deleteSlide(i)}
                onMoveUp={() => moveSlide(i, -1)}
                onMoveDown={() => moveSlide(i, 1)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── New Stock Popup ────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">New Stock Popup</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Shown once per session when visitors land on the homepage</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPopupField('enabled', !popup.enabled)}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-surface-muted transition"
            >
              {popup.enabled
                ? <><ToggleRight size={18} className="text-primary" /> Enabled</>
                : <><ToggleLeft size={18} className="text-muted-foreground" /> Disabled</>}
            </button>
            <button onClick={savePopup} disabled={!popupDirty}
              className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition">
              <Check size={14} />
              {popupSaved ? 'Saved!' : 'Save Popup'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-background ring-1 ring-border/60 p-6 space-y-5">
          {!popup.enabled && (
            <div className="rounded-xl bg-surface-muted px-4 py-2.5 text-xs text-muted-foreground">
              Popup is currently <strong>disabled</strong> — visitors won't see it until you enable it.
            </div>
          )}

          <ImagePicker
            label="Popup Image (optional)"
            value={popup.imageData}
            onChange={(v) => setPopupField('imageData', v)}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Title" value={popup.title}
                onChange={(v) => setPopupField('title', v)}
                placeholder="New Stock Just Arrived!" />
            </div>
            <div className="sm:col-span-2">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Message</span>
                <textarea
                  value={popup.message}
                  onChange={(e) => setPopupField('message', e.target.value)}
                  rows={3}
                  placeholder="Fresh iPhones & accessories now in store…"
                  className="mt-1 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary transition"
                />
              </label>
            </div>
            <Field label="Button text" value={popup.buttonText}
              onChange={(v) => setPopupField('buttonText', v)}
              placeholder="Shop New Arrivals" />
            <Field label="Button link" value={popup.buttonLink}
              onChange={(v) => setPopupField('buttonLink', v)}
              placeholder="/category/all" />
          </div>

          {/* Preview */}
          {(popup.title || popup.message) && (
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Preview</p>
              <div className="mx-auto max-w-xs rounded-2xl bg-surface-muted ring-1 ring-border/60 overflow-hidden">
                {popup.imageData && (
                  <img src={popup.imageData} alt="" className="h-32 w-full object-cover" />
                )}
                <div className="px-5 py-4">
                  <div className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary mb-2">
                    New Arrival
                  </div>
                  <p className="text-sm font-bold">{popup.title}</p>
                  {popup.message && <p className="mt-1 text-xs text-muted-foreground">{popup.message}</p>}
                  <div className="mt-3 flex gap-2">
                    <div className="flex-1 rounded-full bg-primary py-1.5 text-center text-xs font-semibold text-primary-foreground">
                      {popup.buttonText || 'Shop Now'}
                    </div>
                    <div className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
                      Later
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
