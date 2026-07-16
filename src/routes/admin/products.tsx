import { createFileRoute } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { Plus, Pencil, Trash2, X, Check, Upload, ImageIcon } from 'lucide-react';
import { useProducts, productStore } from '@/lib/product-store';
import { saveImageToBlob } from '@/lib/server-db';
import type { Product } from '@/lib/products';
import { formatRWF } from '@/lib/currency';

export const Route = createFileRoute('/admin/products')({
  component: AdminProducts,
});

// Compress and convert uploaded image to base64
async function processImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX = 1600; // max dimension in px — sharp HD quality
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width >= height) {
          height = Math.round((height * MAX) / width);
          width = MAX;
        } else {
          width = Math.round((width * MAX) / height);
          height = MAX;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Failed to load image')); };
    img.src = objectUrl;
  });
}

type FormState = {
  name: string;
  tagline: string;
  price: string;
  stock: string;
  imageData: string; // base64 or URL — main image
  category: string;
  condition: 'new' | 'dubai' | 'used';
  inStock: boolean;
  galleryFront: string;
  galleryBack: string;
  gallerySide: string;
};

const blank: FormState = {
  name: '', tagline: '', price: '', stock: '', imageData: '',
  category: 'phones', condition: 'new', inStock: true,
  galleryFront: '', galleryBack: '', gallerySide: '',
};

function ImageUploader({
  value,
  onChange,
  label = 'Product Image',
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    setError('');
    setUploading(true);
    let base64: string;
    try {
      base64 = await processImage(file);
    } catch {
      setUploading(false);
      setError('Could not read this image. Try converting it to JPEG or PNG first.');
      return;
    }
    try {
      const safeName = file.name.replace(/[^a-z0-9.-]/gi, '-').toLowerCase();
      const { url } = await saveImageToBlob({ data: { base64, filename: safeName } });
      onChange(url);
    } catch (err) {
      console.error('Image upload failed:', err);
      setError('Upload failed — check your connection and try again.');
    } finally {
      setUploading(false);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <span className="block text-xs font-medium text-muted-foreground mb-1">{label}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />

      {value ? (
        <div className="relative w-full aspect-square max-w-[180px] rounded-xl overflow-hidden border border-border bg-surface-muted group">
          <img src={value} alt="Product" className="h-full w-full object-contain p-2" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-xl"
          >
            <div className="flex flex-col items-center gap-1 text-white text-xs font-medium">
              <Upload size={18} />
              Change
            </div>
          </button>
          <button
            type="button"
            onClick={() => { onChange(''); }}
            className="absolute top-1.5 right-1.5 grid h-6 w-6 place-items-center rounded-full bg-destructive text-white shadow hover:bg-destructive/80 transition"
          >
            <X size={12} />
          </button>
          {/* Hidden overlay trigger */}
          <div
            className="absolute inset-0 cursor-pointer opacity-0"
            onClick={() => inputRef.current?.click()}
          />
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 w-full h-32 rounded-xl border-2 border-dashed border-border bg-surface-muted hover:border-primary/60 hover:bg-primary/5 cursor-pointer transition"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-xs">Processing…</span>
            </div>
          ) : (
            <>
              <ImageIcon size={24} className="text-muted-foreground opacity-50" />
              <div className="text-center">
                <p className="text-xs font-medium text-foreground">Click to upload or drag & drop</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">JPG, PNG, WEBP — from phone or computer</p>
              </div>
            </>
          )}
        </div>
      )}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function AdminProducts() {
  const products = useProducts();
  const [editId, setEditId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<FormState>(blank);

  function setField(key: keyof FormState) {
    return (v: string) => setForm((prev) => ({ ...prev, [key]: v }));
  }

  function startEdit(p: Product) {
    setEditId(p.id);
    const g = p.gallery ?? [];
    setForm({
      name: p.name,
      tagline: p.tagline,
      price: String(p.price),
      stock: String(p.stock),
      imageData: p.image,
      category: p.category || 'phones',
      condition: p.condition || 'new',
      inStock: p.stock > 0,
      galleryFront: g.find((x) => x.label === 'Front View')?.src ?? '',
      galleryBack:  g.find((x) => x.label === 'Back View')?.src  ?? '',
      gallerySide:  g.find((x) => x.label === 'Side View')?.src  ?? '',
    });
    setShowAdd(false);
  }

  function buildGallery(main: string) {
    const views: { label: string; key: 'galleryFront' | 'galleryBack' | 'gallerySide' }[] = [
      { label: 'Front View', key: 'galleryFront' },
      { label: 'Back View',  key: 'galleryBack'  },
      { label: 'Side View',  key: 'gallerySide'  },
    ];
    const gallery = views
      .filter((v) => form[v.key])
      .map((v) => ({ label: v.label, src: form[v.key] }));
    // If no gallery views uploaded, fall back to main image as single entry
    return gallery.length > 0 ? gallery : [{ label: 'Main', src: main }];
  }

  function saveEdit() {
    if (!editId) return;
    const image = form.imageData || undefined;
    productStore.update(editId, {
      name: form.name.trim() || undefined,
      tagline: form.tagline,
      price: parseFloat(form.price) || 0,
      stock: form.inStock ? (parseInt(form.stock, 10) || 1) : 0,
      image,
      category: form.category,
      condition: form.condition,
      gallery: image ? buildGallery(image) : undefined,
      breadcrumb: ['Electronics', form.category.charAt(0).toUpperCase() + form.category.slice(1)],
    });
    setEditId(null);
    setForm(blank);
  }

  function cancelEdit() {
    setEditId(null);
    setForm(blank);
  }

  function openAdd() {
    setShowAdd(true);
    setForm(blank);
    setEditId(null);
  }

  function saveAdd() {
    const name = form.name.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const mainImage = form.imageData || 'https://placehold.co/800x800/f5f5f5/999999?text=Product';
    const newProduct: Product = {
      id: `${slug}-${Date.now()}`,
      name,
      tagline: form.tagline,
      price: parseFloat(form.price) || 0,
      stock: form.inStock ? (parseInt(form.stock, 10) || 1) : 0,
      rating: 5,
      reviews: 0,
      image: mainImage,
      gallery: buildGallery(mainImage),
      breadcrumb: ['Electronics', form.category.charAt(0).toUpperCase() + form.category.slice(1)],
      category: form.category,
      condition: form.condition,
    };
    productStore.add(newProduct);
    setShowAdd(false);
    setForm(blank);
  }

  function handleDelete(id: string) {
    if (window.confirm('Delete this product? This cannot be undone.')) {
      productStore.delete(id);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} products in your store</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showAdd && (
        <div className="rounded-2xl bg-background p-6 ring-2 ring-primary/30 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">New Product</h2>
            <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Product Name *" placeholder="e.g. iPhone 16 Pro" value={form.name} onChange={setField('name')} />
            <FormField label="Price (RWF) *" placeholder="1250000" type="number" min="0" step="1" value={form.price} onChange={setField('price')} />
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
              <textarea
                value={form.tagline}
                onChange={(e) => setField('tagline')(e.target.value)}
                placeholder="Short product description shown on product pages"
                rows={2}
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary transition"
              />
            </div>
            <FormField label="Stock" placeholder="0" type="number" min="0" value={form.stock} onChange={setField('stock')} />
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setField('category')(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
              >
                <option value="phones">Smartphones</option>
                <option value="tablets">Tablets</option>
                <option value="computer">Laptops</option>
                <option value="smart-watches">Smart Watches</option>
                <option value="accessories">Accessories</option>
                <option value="gaming">Gaming</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Condition *</label>
              <div className="mt-1 flex gap-3">
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary">
                  <input
                    type="radio"
                    name="condition-add"
                    value="new"
                    checked={form.condition === 'new'}
                    onChange={() => setField('condition')('new')}
                    className="accent-primary"
                  />
                  🆕 Brand New · Sealed
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
                  <input
                    type="radio"
                    name="condition-add"
                    value="dubai"
                    checked={form.condition === 'dubai'}
                    onChange={() => setField('condition')('dubai')}
                    className="accent-blue-500"
                  />
                  🇦🇪 Dubai · Open Box
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50 has-[:checked]:text-amber-700">
                  <input
                    type="radio"
                    name="condition-add"
                    value="used"
                    checked={form.condition === 'used'}
                    onChange={() => setField('condition')('used')}
                    className="accent-amber-500"
                  />
                  🔄 Used · Open Box
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Availability *</label>
              <div className="mt-1 flex gap-3">
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50 has-[:checked]:text-green-700">
                  <input
                    type="radio"
                    name="stock-add"
                    checked={form.inStock}
                    onChange={() => setForm((f) => ({ ...f, inStock: true }))}
                    className="accent-green-600"
                  />
                  ✅ In Stock
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-red-400 has-[:checked]:bg-red-50 has-[:checked]:text-red-600">
                  <input
                    type="radio"
                    name="stock-add"
                    checked={!form.inStock}
                    onChange={() => setForm((f) => ({ ...f, inStock: false }))}
                    className="accent-red-500"
                  />
                  ❌ Out of Stock
                </label>
              </div>
            </div>
            <ImageUploader value={form.imageData} onChange={setField('imageData')} />
            <div className="sm:col-span-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Additional Views <span className="font-normal opacity-60">(optional — helps customers see all angles)</span>
              </p>
              <div className="grid grid-cols-3 gap-3">
                <ImageUploader value={form.galleryFront} onChange={setField('galleryFront')} label="Front View" />
                <ImageUploader value={form.galleryBack}  onChange={setField('galleryBack')}  label="Back View"  />
                <ImageUploader value={form.gallerySide}  onChange={setField('gallerySide')}  label="Side View"  />
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              onClick={saveAdd}
              disabled={!form.name.trim()}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition"
            >
              <Check size={14} />
              Save Product
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-surface-muted transition"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Form (full panel) */}
      {editId && (
        <div className="rounded-2xl bg-background p-6 ring-2 ring-primary/30 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Edit Product</h2>
            <button onClick={cancelEdit} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Product Name" placeholder="Product name" value={form.name} onChange={setField('name')} />
            <FormField label="Price (RWF)" placeholder="1250000" type="number" min="0" step="1" value={form.price} onChange={setField('price')} />
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
              <textarea
                value={form.tagline}
                onChange={(e) => setField('tagline')(e.target.value)}
                placeholder="Short product description"
                rows={2}
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary transition"
              />
            </div>
            <FormField label="Stock" placeholder="0" type="number" min="0" value={form.stock} onChange={setField('stock')} />
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setField('category')(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
              >
                <option value="phones">Smartphones</option>
                <option value="tablets">Tablets</option>
                <option value="computer">Laptops</option>
                <option value="smart-watches">Smart Watches</option>
                <option value="accessories">Accessories</option>
                <option value="gaming">Gaming</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Condition *</label>
              <div className="mt-1 flex gap-3">
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary">
                  <input
                    type="radio"
                    name="condition-edit"
                    value="new"
                    checked={form.condition === 'new'}
                    onChange={() => setField('condition')('new')}
                    className="accent-primary"
                  />
                  🆕 Brand New · Sealed
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
                  <input
                    type="radio"
                    name="condition-edit"
                    value="dubai"
                    checked={form.condition === 'dubai'}
                    onChange={() => setField('condition')('dubai')}
                    className="accent-blue-500"
                  />
                  🇦🇪 Dubai · Open Box
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50 has-[:checked]:text-amber-700">
                  <input
                    type="radio"
                    name="condition-edit"
                    value="used"
                    checked={form.condition === 'used'}
                    onChange={() => setField('condition')('used')}
                    className="accent-amber-500"
                  />
                  🔄 Used · Open Box
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Availability *</label>
              <div className="mt-1 flex gap-3">
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50 has-[:checked]:text-green-700">
                  <input
                    type="radio"
                    name="stock-edit"
                    checked={form.inStock}
                    onChange={() => setForm((f) => ({ ...f, inStock: true }))}
                    className="accent-green-600"
                  />
                  ✅ In Stock
                </label>
                <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition has-[:checked]:border-red-400 has-[:checked]:bg-red-50 has-[:checked]:text-red-600">
                  <input
                    type="radio"
                    name="stock-edit"
                    checked={!form.inStock}
                    onChange={() => setForm((f) => ({ ...f, inStock: false }))}
                    className="accent-red-500"
                  />
                  ❌ Out of Stock
                </label>
              </div>
            </div>
            <ImageUploader value={form.imageData} onChange={setField('imageData')} label="Product Image (upload to replace)" />
            <div className="sm:col-span-2">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Additional Views <span className="font-normal opacity-60">(optional)</span>
              </p>
              <div className="grid grid-cols-3 gap-3">
                <ImageUploader value={form.galleryFront} onChange={setField('galleryFront')} label="Front View" />
                <ImageUploader value={form.galleryBack}  onChange={setField('galleryBack')}  label="Back View"  />
                <ImageUploader value={form.gallerySide}  onChange={setField('gallerySide')}  label="Side View"  />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveEdit}
              className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
            >
              <Check size={14} />
              Save Changes
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-surface-muted transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-2xl bg-background ring-1 ring-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted">
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground">Product</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground hidden lg:table-cell">Description</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground hidden md:table-cell">Condition</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">Price</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground hidden sm:table-cell">Stock</th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <span className="text-4xl">📦</span>
                    <p className="mt-3 text-sm font-semibold text-foreground">No products yet</p>
                    <p className="mt-1 text-xs text-muted-foreground">Click "Add Product" above to add your first product.</p>
                  </td>
                </tr>
              )}
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface-muted/40 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-12 w-12 flex-shrink-0 rounded-lg bg-surface-muted object-contain p-1"
                      />
                      <div className="min-w-0">
                        <div className="truncate font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground font-mono">{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell max-w-xs">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{p.tagline}</p>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    {p.condition === 'used' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                        🔄 Used · Open Box
                      </span>
                    ) : p.condition === 'dubai' ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                        🇦🇪 Dubai · Open Box
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        🆕 Brand New · Sealed
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold">{formatRWF(p.price)}</td>
                  <td className="px-5 py-3 text-right hidden sm:table-cell">
                    {p.stock > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                        ✅ In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                        ❌ Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => startEdit(p)}
                        title="Edit"
                        className="rounded-lg border border-border p-1.5 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        title="Delete"
                        className="rounded-lg border border-border p-1.5 hover:bg-destructive/10 hover:border-destructive/40 hover:text-destructive transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label, placeholder, type = 'text', value, onChange, min, step,
}: {
  label: string; placeholder?: string; type?: string;
  value: string; onChange: (v: string) => void; min?: string; step?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} min={min} step={step}
        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary transition"
      />
    </label>
  );
}
