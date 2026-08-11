"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PageItem = { id: number; slug: string; title: string; content: string | null; meta_title: string | null; meta_description: string | null; is_published: number };
type Form = Omit<PageItem, "id" | "is_published"> & { is_published: boolean };
const emptyForm: Form = { slug: "", title: "", content: "", meta_title: "", meta_description: "", is_published: true };

export default function PagesManager() {
  const [items, setItems] = useState<PageItem[]>([]);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/pages", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load pages.");
      setItems(data);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not load pages."); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  function edit(item: PageItem) {
    setEditingId(item.id);
    setForm({ ...item, is_published: Boolean(item.is_published) });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function reset() { setEditingId(null); setForm(emptyForm); setMessage(""); }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setMessage("");
    try {
      const response = await fetch(editingId ? `/api/admin/pages/${editingId}` : "/api/admin/pages", {
        method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save page.");
      setMessage(editingId ? "Page updated." : "Page added."); reset(); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Something went wrong."); }
    finally { setSaving(false); }
  }

  async function importDefaults() {
    setSeeding(true); setMessage("");
    try {
      const response = await fetch("/api/admin/pages/seed", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not import pages.");
      setMessage(result.message); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not import pages."); }
    finally { setSeeding(false); }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this page?")) return;
    const response = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
    if (response.ok) { setMessage("Page deleted."); await load(); }
  }

  return (
    <main className="min-h-screen bg-[#0c0b0a] px-5 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/admin" className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">← Dashboard</Link><h1 className="mt-2 font-[var(--font-cormorant)] text-4xl">Pages</h1><p className="mt-2 text-sm text-white/50">Manage editable page content and SEO metadata.</p></div>
          <div className="flex gap-3"><button type="button" onClick={importDefaults} disabled={seeding} className="rounded-lg border border-[#c7a56a]/40 px-4 py-2 text-sm text-[#e2c98f] disabled:opacity-50">{seeding ? "Importing…" : "Import Existing Pages"}</button>{editingId && <button type="button" onClick={reset} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel edit</button>}</div>
        </div>
        {message && <div className="mb-6 rounded-lg border border-[#c7a56a]/30 bg-[#c7a56a]/10 px-4 py-3 text-sm text-[#e2c98f]">{message}</div>}

        <form onSubmit={save} className="rounded-2xl border border-white/10 bg-[#151311] p-6">
          <h2 className="font-[var(--font-cormorant)] text-2xl">{editingId ? "Edit Page" : "Add Page"}</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="text-sm">Slug<input required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="about" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Title<input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm md:col-span-2">Content<textarea value={form.content || ""} onChange={e => setForm({ ...form, content: e.target.value })} rows={12} placeholder="Page content. Plain text/HTML is stored as-is." className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3 font-mono text-sm" /></label>
            <label className="text-sm">Meta title<input value={form.meta_title || ""} onChange={e => setForm({ ...form, meta_title: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Meta description<input value={form.meta_description || ""} onChange={e => setForm({ ...form, meta_description: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="flex items-center gap-3 pt-2 text-sm"><input type="checkbox" checked={form.is_published} onChange={e => setForm({ ...form, is_published: e.target.checked })} /> Published</label>
          </div>
          <button disabled={saving} className="mt-6 rounded-lg bg-[#c7a56a] px-6 py-3 text-sm font-medium text-[#17130d] disabled:opacity-50">{saving ? "Saving…" : editingId ? "Update Page" : "Add Page"}</button>
        </form>

        <section className="mt-8"><h2 className="font-[var(--font-cormorant)] text-2xl">Current Pages</h2>{loading ? <p className="mt-4 text-white/50">Loading…</p> : items.length === 0 ? <p className="mt-4 text-white/50">No database pages yet.</p> : <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id} className="rounded-2xl border border-white/10 bg-[#151311] p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium">{item.title}</h3><p className="mt-1 text-xs uppercase tracking-wider text-[#c7a56a]">/{item.slug}</p></div><span className={`text-xs ${item.is_published ? "text-emerald-300" : "text-white/30"}`}>{item.is_published ? "Published" : "Draft"}</span></div><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">{item.content || "No content yet."}</p><div className="mt-4 flex gap-3"><button onClick={() => edit(item)} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Edit</button><button onClick={() => remove(item.id)} className="rounded-lg border border-red-400/20 px-4 py-2 text-sm text-red-300">Delete</button></div></article>)}</div>}</section>
      </div>
    </main>
  );
}
