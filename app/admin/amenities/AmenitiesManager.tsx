"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Amenity = { id: number; name: string; description: string | null; icon: string | null; sort_order: number; is_active: number };
type Form = Omit<Amenity, "id" | "is_active"> & { is_active: boolean };
const emptyForm: Form = { name: "", description: "", icon: "", sort_order: 0, is_active: true };

export default function AmenitiesManager() {
  const [items, setItems] = useState<Amenity[]>([]);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/amenities", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load amenities.");
      setItems(data);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not load amenities."); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  function edit(item: Amenity) {
    setEditingId(item.id);
    setForm({ ...item, is_active: Boolean(item.is_active) });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function reset() { setEditingId(null); setForm(emptyForm); setMessage(""); }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setMessage("");
    try {
      const response = await fetch(editingId ? `/api/admin/amenities/${editingId}` : "/api/admin/amenities", {
        method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save amenity.");
      setMessage(editingId ? "Amenity updated." : "Amenity added."); reset(); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Something went wrong."); }
    finally { setSaving(false); }
  }

  async function importDefaults() {
    setSeeding(true); setMessage("");
    try {
      const response = await fetch("/api/admin/amenities/seed", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not import amenities.");
      setMessage(result.message); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not import amenities."); }
    finally { setSeeding(false); }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this amenity?")) return;
    const response = await fetch(`/api/admin/amenities/${id}`, { method: "DELETE" });
    if (response.ok) { setMessage("Amenity deleted."); await load(); }
  }

  return (
    <main className="min-h-screen bg-[#0c0b0a] px-5 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/admin" className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">← Dashboard</Link><h1 className="mt-2 font-[var(--font-cormorant)] text-4xl">Amenities</h1><p className="mt-2 text-sm text-white/50">Manage hotel amenities shown across the website.</p></div>
          <div className="flex gap-3"><button type="button" onClick={importDefaults} disabled={seeding} className="rounded-lg border border-[#c7a56a]/40 px-4 py-2 text-sm text-[#e2c98f] disabled:opacity-50">{seeding ? "Importing…" : "Import Existing Amenities"}</button>{editingId && <button type="button" onClick={reset} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel edit</button>}</div>
        </div>
        {message && <div className="mb-6 rounded-lg border border-[#c7a56a]/30 bg-[#c7a56a]/10 px-4 py-3 text-sm text-[#e2c98f]">{message}</div>}

        <form onSubmit={save} className="rounded-2xl border border-white/10 bg-[#151311] p-6">
          <h2 className="font-[var(--font-cormorant)] text-2xl">{editingId ? "Edit Amenity" : "Add Amenity"}</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="text-sm">Name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Icon name<input value={form.icon || ""} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="wifi, parking, mountain" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm md:col-span-2">Description<textarea value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Display order<input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="flex items-center gap-3 pt-7 text-sm"><input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} /> Active on website</label>
          </div>
          <button disabled={saving} className="mt-6 rounded-lg bg-[#c7a56a] px-6 py-3 text-sm font-medium text-[#17130d] disabled:opacity-50">{saving ? "Saving…" : editingId ? "Update Amenity" : "Add Amenity"}</button>
        </form>

        <section className="mt-8"><h2 className="font-[var(--font-cormorant)] text-2xl">Current Amenities</h2>{loading ? <p className="mt-4 text-white/50">Loading…</p> : items.length === 0 ? <p className="mt-4 text-white/50">No database amenities yet.</p> : <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map(item => <article key={item.id} className="rounded-2xl border border-white/10 bg-[#151311] p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium">{item.name}</h3><p className="mt-1 text-xs uppercase tracking-wider text-[#c7a56a]">{item.icon || "no icon"} · #{item.sort_order}</p></div><span className={`text-xs ${item.is_active ? "text-emerald-300" : "text-white/30"}`}>{item.is_active ? "Active" : "Hidden"}</span></div>{item.description && <p className="mt-3 text-sm leading-relaxed text-white/55">{item.description}</p>}<div className="mt-4 flex gap-3"><button onClick={() => edit(item)} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Edit</button><button onClick={() => remove(item.id)} className="rounded-lg border border-red-400/20 px-4 py-2 text-sm text-red-300">Delete</button></div></article>)}</div>}</section>
      </div>
    </main>
  );
}
