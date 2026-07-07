import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { Check, Plus, Trash2, Upload, ImageIcon, X, RotateCcw } from 'lucide-react';
import { useSiteSettings, siteSettingsStore, SETTINGS_DEFAULTS } from '@/lib/site-settings-store';
import hippoLogo from '@/assets/hippo-logo.png';
import heroWomanImg from '@/assets/hero-woman.jpg';

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettings,
});

async function processImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX = 1600;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width >= height) { height = Math.round((height * MAX) / width); width = MAX; }
        else { width = Math.round((width * MAX) / height); height = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Failed to load image')); };
    img.src = objectUrl;
  });
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-background p-6 ring-1 ring-border/60 space-y-5">
      <h2 className="text-sm font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
      />
    </label>
  );
}

function AdminSettings() {
  const saved = useSiteSettings();
  const [form, setForm] = useState({ ...saved });
  const [dirty, setDirty] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError] = useState('');
  const logoRef = useRef<HTMLInputElement>(null);

  const [aboutStoryImageUploading, setAboutStoryImageUploading] = useState(false);
  const [aboutStoryImageError, setAboutStoryImageError] = useState('');
  const aboutStoryImageRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  function save() {
    siteSettingsStore.save(form);
    setDirty(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  }

  function reset() {
    if (!window.confirm('Reset all settings to defaults? This cannot be undone.')) return;
    siteSettingsStore.reset();
    setForm({ ...SETTINGS_DEFAULTS });
    setDirty(false);
  }

  async function handleLogoFile(file: File) {
    if (!file.type.startsWith('image/')) { setLogoError('Please select an image file.'); return; }
    setLogoError('');
    setLogoUploading(true);
    try {
      const data = await processImage(file);
      set('logoData', data);
    } catch {
      setLogoError('Failed to process image. Try another file.');
    } finally {
      setLogoUploading(false);
    }
  }

  async function handleAboutStoryImageFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setAboutStoryImageError('Please select an image file.');
      return;
    }
    setAboutStoryImageError('');
    setAboutStoryImageUploading(true);
    try {
      const data = await processImage(file);
      set('aboutStoryImageData', data);
    } catch {
      setAboutStoryImageError('Failed to process image. Try another file.');
    } finally {
      setAboutStoryImageUploading(false);
    }
  }

  function addPhone() {
    set('phones', [...form.phones, '']);
  }

  function updatePhone(i: number, v: string) {
    const next = [...form.phones];
    next[i] = v;
    set('phones', next);
  }

  function removePhone(i: number) {
    set('phones', form.phones.filter((_, idx) => idx !== i));
  }

  const logoPreview = form.logoData || hippoLogo;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Site Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Edit store identity, contact info, and banner text</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-surface-muted transition"
          >
            <RotateCcw size={14} />
            Reset defaults
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition"
          >
            <Check size={14} />
            {savedFlash ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Store Identity */}
      <Section title="Store Identity">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Logo */}
          <div>
            <span className="block text-xs font-medium text-muted-foreground mb-2">Logo</span>
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogoFile(f); e.target.value = ''; }}
            />
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 flex-shrink-0 rounded-xl border border-border bg-surface-muted overflow-hidden">
                <img src={logoPreview} alt="Logo preview" className="h-full w-full object-contain p-2" />
                {form.logoData && (
                  <button
                    type="button"
                    onClick={() => set('logoData', '')}
                    className="absolute top-0.5 right-0.5 grid h-5 w-5 place-items-center rounded-full bg-destructive text-white hover:bg-destructive/80 transition"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => logoRef.current?.click()}
                  disabled={logoUploading}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface-muted transition"
                >
                  {logoUploading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Upload size={14} />
                  )}
                  {logoUploading ? 'Processing…' : 'Upload Logo'}
                </button>
                <p className="text-[11px] text-muted-foreground">PNG or JPG recommended. Transparent background works best.</p>
                {logoError && <p className="text-xs text-destructive">{logoError}</p>}
              </div>
            </div>
          </div>

          {/* Name & subtitle */}
          <div className="space-y-4">
            <Field
              label="Store Name"
              value={form.siteName}
              onChange={(v) => set('siteName', v)}
              placeholder="HIPPO"
            />
            <Field
              label="Store Subtitle"
              value={form.siteSubtitle}
              onChange={(v) => set('siteSubtitle', v)}
              placeholder="TECHNOLOGY"
            />
          </div>

          {/* Tagline */}
          <div className="sm:col-span-2">
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Footer Tagline</span>
              <textarea
                value={form.siteTagline}
                onChange={(e) => set('siteTagline', e.target.value)}
                rows={2}
                placeholder="Short description shown in the footer"
                className="mt-1 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary transition"
              />
            </label>
          </div>
        </div>
      </Section>

      {/* Top Banner */}
      <Section title="Top Banner">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Phone shown in top bar"
            value={form.topbarPhone}
            onChange={(v) => set('topbarPhone', v)}
            placeholder="0798989741"
          />
          <Field
            label="Promo message"
            value={form.topbarPromo}
            onChange={(v) => set('topbarPromo', v)}
            placeholder="Get 50% Off on Selected Items"
          />
        </div>
      </Section>

      {/* Contact Details */}
      <Section title="Contact Details">
        <div className="space-y-4">
          <div>
            <span className="block text-xs font-medium text-muted-foreground mb-2">Phone Numbers</span>
            <div className="space-y-2">
              {form.phones.map((phone, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={phone}
                    onChange={(e) => updatePhone(i, e.target.value)}
                    placeholder="+250 7XX XXX XXX"
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
                  />
                  <button
                    onClick={() => removePhone(i)}
                    disabled={form.phones.length === 1}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive disabled:opacity-30 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={addPhone}
                className="flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                <Plus size={12} />
                Add phone number
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Email address"
              value={form.email}
              onChange={(v) => set('email', v)}
              placeholder="info@hippotech.rw"
              type="email"
            />
            <Field
              label="Physical address"
              value={form.address}
              onChange={(v) => set('address', v)}
              placeholder="Tajyire Building, Near Makuza Plaza, Kigali"
            />
          </div>
        </div>
      </Section>

      {/* Social & WhatsApp */}
      <Section title="Social &amp; WhatsApp">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="WhatsApp number (digits only)"
            value={form.whatsapp}
            onChange={(v) => set('whatsapp', v)}
            placeholder="250798464448"
          />
          <Field
            label="WhatsApp Channel URL"
            value={form.whatsappChannel}
            onChange={(v) => set('whatsappChannel', v)}
            placeholder="https://whatsapp.com/channel/..."
          />
          <Field
            label="Instagram URL"
            value={form.instagramUrl}
            onChange={(v) => set('instagramUrl', v)}
            placeholder="https://www.instagram.com/..."
          />
          <Field
            label="Instagram handle"
            value={form.instagramHandle}
            onChange={(v) => set('instagramHandle', v)}
            placeholder="@hippotechnologyltd"
          />
          <Field
            label="TikTok URL"
            value={form.tiktokUrl}
            onChange={(v) => set('tiktokUrl', v)}
            placeholder="https://vm.tiktok.com/..."
          />
        </div>
      </Section>

      {/* About Page Customization */}
      <Section title="About Page Customization">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Hero Title"
              value={form.aboutHeroTitle}
              onChange={(v) => set('aboutHeroTitle', v)}
              placeholder="Your World, Upgraded."
            />
            <Field
              label="Story Title"
              value={form.aboutStoryTitle}
              onChange={(v) => set('aboutStoryTitle', v)}
              placeholder="Our Story"
            />
          </div>

          <div>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Hero Description</span>
              <textarea
                value={form.aboutHeroDesc}
                onChange={(e) => set('aboutHeroDesc', e.target.value)}
                rows={2}
                placeholder="Short description shown under the hero title"
                className="mt-1 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary transition"
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Story Text Content (separate paragraphs with blank lines)</span>
              <textarea
                value={form.aboutStoryText}
                onChange={(e) => set('aboutStoryText', e.target.value)}
                rows={6}
                placeholder="Write your company story here..."
                className="mt-1 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary transition"
              />
            </label>
          </div>

          {/* About Page Story Image */}
          <div>
            <span className="block text-xs font-medium text-muted-foreground mb-2">Story Image</span>
            <input
              ref={aboutStoryImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleAboutStoryImageFile(f);
                e.target.value = '';
              }}
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative h-32 aspect-video sm:h-36 flex-shrink-0 rounded-xl border border-border bg-surface-muted overflow-hidden">
                <img
                  src={form.aboutStoryImageData || heroWomanImg}
                  alt="Story preview"
                  className="h-full w-full object-cover"
                />
                {form.aboutStoryImageData && (
                  <button
                    type="button"
                    onClick={() => set('aboutStoryImageData', '')}
                    className="absolute top-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-destructive text-white hover:bg-destructive/80 transition"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => aboutStoryImageRef.current?.click()}
                  disabled={aboutStoryImageUploading}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-surface-muted transition"
                >
                  {aboutStoryImageUploading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  ) : (
                    <Upload size={14} />
                  )}
                  {aboutStoryImageUploading ? 'Processing…' : 'Upload Story Image'}
                </button>
                <p className="text-[11px] text-muted-foreground">
                  PNG or JPG recommended. Displays as a premium cover image next to your story.
                </p>
                {aboutStoryImageError && <p className="text-xs text-destructive">{aboutStoryImageError}</p>}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer Customization */}
      <Section title="Footer Customization">
        <div className="space-y-4">
          <Field
            label="Copyright Text (use {year} for current year)"
            value={form.footerCopyright}
            onChange={(v) => set('footerCopyright', v)}
            placeholder="© {year} Hippo Technology Ltd. All rights reserved."
          />
        </div>
      </Section>

      {/* Sticky save bar when dirty */}
      {dirty && (
        <div className="sticky bottom-4 flex justify-end">
          <div className="flex items-center gap-3 rounded-2xl bg-background px-5 py-3 shadow-xl ring-1 ring-border/60">
            <span className="text-sm text-muted-foreground">You have unsaved changes</span>
            <button
              onClick={save}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              <Check size={14} />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
