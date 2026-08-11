"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Slide = {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_label: string | null;
  cta_href: string | null;
  sort_order: number;
  is_active: number;
};

type FormState = Omit<Slide, "id" | "is_active"> & { is_active: boolean };

const emptyForm: FormState = {
  title: "",
  subtitle: "",
  image_url: "",
  cta_label: "Book Your Stay",
  cta_href: "/book-now",
  sort_order: 0,
  is_active: true,
};

export default function HeroManager() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/admin/hero", { cache: "no-store" });
    if (response.ok) setSlides(await response.json());
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  function startEdit(slide: Slide) {
    setEditingId(slide.id);
    setForm({ ...slide, is_active: Boolean(slide.is_active) });
    setFile(null);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setMessage("");
  }

  async function uploadImage() {
    if (!file) return form.image_url;
    const data = new FormData();
    data.append("file", file);
    data.append("folder", "hero");
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Image upload failed.");
    return result.url as string;
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const imageUrl = await uploadImage();
      if (!imageUrl.trim()) throw new Error("Please upload an image or enter an image URL.");
      const payload = { ...form, image_url: imageUrl };
      const response = await fetch(editingId ? `/api/admin/hero/${editingId}` : "/api/admin/hero", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save banner.");
      setMessage(editingId ? "Banner updated successfully." : "Banner added successfully.");
      reset();
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function importExisting() {
    setSeeding(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/hero/seed", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not import existing banners.");
      setMessage(result.message);
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not import existing banners.");
    } finally {
      setSeeding(false);
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this banner?")) return;
    const response = await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
    if (response.ok) await load();
  }

  return (
    <main className="min-h-screen bg-[#0c0b0a] px-5 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">← Dashboard</Link>
            <h1 className="mt-2 font-[var(--font-cormorant)] text-4xl">Hero & Banners</h1>
            <p className="mt-2 text-sm text-white/50">Upload, edit, enable and reorder homepage hero slides.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={importExisting} disabled={seeding} className="rounded-lg border border-[#c7a56a]/40 px-4 py-2 text-sm text-[#e2c98f] disabled:opacity-50">{seeding ? "Importing…" : "Import Existing Banners"}</button>
            {editingId && <button onClick={reset} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel edit</button>}
          </div>
        </div>

        {message && <div className="mb-6 rounded-lg border border-[#c7a56a]/30 bg-[#c7a56a]/10 px-4 py-3 text-sm text-[#e2c98f]">{message}</div>}

        <form onSubmit={save} className="rounded-2xl border border-white/10 bg-[#151311] p-6">
          <h2 className="font-[var(--font-cormorant)] text-2xl">{editingId ? "Edit Banner" : "Add Banner"}</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="text-sm">Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Subtitle<input value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm md:col-span-2">Upload image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-2 block w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm" /></label>
            <label className="text-sm md:col-span-2">Or image URL<input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="/images/hero/hero-bg.jpg" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Button label<input value={form.cta_label || ""} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Button link<input value={form.cta_href || ""} onChange={(e) => setForm({ ...form, cta_href: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Order<input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="flex items-center gap-3 pt-7 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active on website</label>
          </div>
          <button disabled={saving} className="mt-6 rounded-lg bg-[#c7a56a] px-6 py-3 text-sm font-medium text-[#17130d] disabled:opacity-50">{saving ? "Saving…" : editingId ? "Update Banner" : "Add Banner"}</button>
        </form>

        <section className="mt-8">
          <h2 className="font-[var(--font-cormorant)] text-2xl">Current Banners</h2>
          {loading ? <p className="mt-4 text-white/50">Loading…</p> : slides.length === 0 ? <p className="mt-4 text-white/50">No database banners yet. Use “Import Existing Banners” to bring in the current website banners.</p> : (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {slides.map((slide) => (
                <article key={slide.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#151311]">
                  <img src={slide.image_url} alt={slide.title} className="h-56 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4"><div><h3 className="font-[var(--font-cormorant)] text-2xl">{slide.title}</h3><p className="mt-1 text-sm text-white/50">{slide.subtitle || "No subtitle"}</p></div><span className={`rounded-full px-3 py-1 text-xs ${slide.is_active ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-white/40"}`}>{slide.is_active ? "Active" : "Hidden"}</span></div>
                    <div className="mt-5 flex gap-3"><button onClick={() => startEdit(slide)} className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-[#c7a56a]">Edit</button><button onClick={() => remove(slide.id)} className="rounded-lg border border-red-400/20 px-4 py-2 text-sm text-red-300">Delete</button></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
