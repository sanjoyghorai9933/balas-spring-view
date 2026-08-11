"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ImageItem = { id: number; title: string | null; image_url: string; alt_text: string | null; category: string; aspect: string; sort_order: number; is_active: number };
type Form = Omit<ImageItem, "id" | "is_active"> & { is_active: boolean };

const emptyForm: Form = { title: "", image_url: "", alt_text: "", category: "facilities", aspect: "landscape", sort_order: 0, is_active: true };
const categories = ["rooms", "exterior", "views", "facilities", "night"];
const aspects = ["landscape", "portrait", "tall", "square"];

export default function GalleryManager() {
  const [items, setItems] = useState<ImageItem[]>([]);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/gallery", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load gallery.");
      setItems(data);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not load gallery."); }
    finally { setLoading(false); }
  }

  useEffect(() => { void load(); }, []);

  function edit(item: ImageItem) {
    setEditingId(item.id);
    setForm({ ...item, is_active: Boolean(item.is_active) });
    setFile(null);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() { setEditingId(null); setForm(emptyForm); setFile(null); setMessage(""); }

  async function upload() {
    if (!file) return form.image_url;
    const data = new FormData();
    data.append("file", file);
    data.append("folder", "gallery");
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Image upload failed.");
    return result.url as string;
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setMessage("");
    try {
      const imageUrl = await upload();
      if (!imageUrl.trim()) throw new Error("Please upload an image or enter an image URL.");
      const payload = { ...form, image_url: imageUrl };
      const response = await fetch(editingId ? `/api/admin/gallery/${editingId}` : "/api/admin/gallery", { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save gallery image.");
      setMessage(editingId ? "Gallery image updated." : "Gallery image added."); reset(); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Something went wrong."); }
    finally { setSaving(false); }
  }

  async function importExisting() {
    setSeeding(true); setMessage("");
    try {
      const response = await fetch("/api/admin/gallery/seed", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not import gallery.");
      setMessage(result.message); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not import gallery."); }
    finally { setSeeding(false); }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this gallery image?")) return;
    const response = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (response.ok) { setMessage("Gallery image deleted."); await load(); }
  }

  return (
    <main className="min-h-screen bg-[#0c0b0a] px-5 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/admin" className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">← Dashboard</Link><h1 className="mt-2 font-[var(--font-cormorant)] text-4xl">Gallery</h1><p className="mt-2 text-sm text-white/50">Manage gallery photos, categories, layout and visibility.</p></div>
          <div className="flex gap-3"><button type="button" onClick={importExisting} disabled={seeding} className="rounded-lg border border-[#c7a56a]/40 px-4 py-2 text-sm text-[#e2c98f] disabled:opacity-50">{seeding ? "Importing…" : "Import Existing Gallery"}</button>{editingId && <button type="button" onClick={reset} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel edit</button>}</div>
        </div>
        {message && <div className="mb-6 rounded-lg border border-[#c7a56a]/30 bg-[#c7a56a]/10 px-4 py-3 text-sm text-[#e2c98f]">{message}</div>}

        <form onSubmit={save} className="rounded-2xl border border-white/10 bg-[#151311] p-6">
          <h2 className="font-[var(--font-cormorant)] text-2xl">{editingId ? "Edit Gallery Image" : "Add Gallery Image"}</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="text-sm">Title<input value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Alt text<input value={form.alt_text || ""} onChange={e => setForm({ ...form, alt_text: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm md:col-span-2">Upload image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] || null)} className="mt-2 block w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm" /></label>
            <label className="text-sm md:col-span-2">Or image URL<input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="/images/gallery/gallery1.jpg" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Category<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-[#151311] px-3 py-3">{categories.map(x => <option key={x} value={x}>{x}</option>)}</select></label>
            <label className="text-sm">Layout<select value={form.aspect} onChange={e => setForm({ ...form, aspect: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-[#151311] px-3 py-3">{aspects.map(x => <option key={x} value={x}>{x}</option>)}</select></label>
            <label className="text-sm">Display order<input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="flex items-center gap-3 pt-7 text-sm"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} /> Active on website</label>
          </div>
          <button disabled={saving} className="mt-6 rounded-lg bg-[#c7a56a] px-6 py-3 text-sm font-medium text-[#17130d] disabled:opacity-50">{saving ? "Saving…" : editingId ? "Update Image" : "Add Image"}</button>
        </form>

        <section className="mt-8"><h2 className="font-[var(--font-cormorant)] text-2xl">Current Gallery</h2>{loading ? <p className="mt-4 text-white/50">Loading…</p> : items.length === 0 ? <p className="mt-4 text-white/50">No database gallery images yet.</p> : <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#151311]"><img src={item.image_url} alt={item.alt_text || item.title || "Gallery image"} className="h-56 w-full object-cover" /><div className="p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium">{item.title || "Untitled image"}</h3><p className="mt-1 text-xs uppercase tracking-wider text-[#c7a56a]">{item.category} · {item.aspect}</p></div><span className="text-xs text-white/40">#{item.sort_order}</span></div><div className="mt-4 flex gap-3"><button onClick={() => edit(item)} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Edit</button><button onClick={() => remove(item.id)} className="rounded-lg border border-red-400/20 px-4 py-2 text-sm text-red-300">Delete</button></div></div></article>)}</div>}</section>
      </div>
    </main>
  );
}
