"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { id: number; slug: string | null; name: string; description: string | null; distance: string | null; drive_time: string | null; best_time_to_visit: string | null; maps_url: string | null; image_url: string | null; sort_order: number; is_active: number };
type Form = Omit<Item, "id" | "is_active"> & { is_active: boolean };
const emptyForm: Form = { slug: "", name: "", description: "", distance: "", drive_time: "", best_time_to_visit: "", maps_url: "", image_url: "", sort_order: 0, is_active: true };

export default function AttractionsManager() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Form>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try { const r = await fetch("/api/admin/attractions", { cache: "no-store" }); const d = await r.json(); if (!r.ok) throw new Error(d.error || "Could not load attractions."); setItems(d); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Could not load attractions."); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  function reset() { setEditingId(null); setForm(emptyForm); setFile(null); }
  function edit(item: Item) { setEditingId(item.id); setForm({ ...item, is_active: Boolean(item.is_active) }); setFile(null); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function upload() {
    if (!file) return form.image_url;
    const data = new FormData(); data.append("file", file); data.append("folder", "attractions");
    const r = await fetch("/api/admin/upload", { method: "POST", body: data }); const d = await r.json();
    if (!r.ok) throw new Error(d.error || "Image upload failed."); return d.url as string;
  }

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setMessage("");
    try {
      const imageUrl = await upload();
      const payload = { ...form, image_url: imageUrl };
      const r = await fetch(editingId ? `/api/admin/attractions/${editingId}` : "/api/admin/attractions", { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error || "Could not save attraction.");
      setMessage(editingId ? "Attraction updated." : "Attraction added."); reset(); await load();
    } catch (e) { setMessage(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setSaving(false); }
  }

  async function importExisting() {
    setImporting(true); setMessage("");
    try { const r = await fetch("/api/admin/attractions/seed", { method: "POST" }); const d = await r.json(); if (!r.ok) throw new Error(d.error || "Import failed."); setMessage(d.message); await load(); }
    catch (e) { setMessage(e instanceof Error ? e.message : "Import failed."); }
    finally { setImporting(false); }
  }

  async function remove(id: number) { if (!window.confirm("Delete this attraction?")) return; const r = await fetch(`/api/admin/attractions/${id}`, { method: "DELETE" }); if (r.ok) { setMessage("Attraction deleted."); await load(); } }

  return <main className="min-h-screen bg-[#0c0b0a] px-5 py-8 text-white lg:px-8"><div className="mx-auto max-w-7xl">
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><div><Link href="/admin" className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">← Dashboard</Link><h1 className="mt-2 font-[var(--font-cormorant)] text-4xl">Attractions</h1><p className="mt-2 text-sm text-white/50">Manage nearby places, distances, descriptions, maps and photos.</p></div><div className="flex gap-3"><button onClick={importExisting} disabled={importing} className="rounded-lg border border-[#c7a56a]/40 px-4 py-2 text-sm text-[#e2c98f] disabled:opacity-50">{importing ? "Importing…" : "Import Existing Attractions"}</button>{editingId && <button onClick={reset} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel edit</button>}</div></div>
    {message && <div className="mb-6 rounded-lg border border-[#c7a56a]/30 bg-[#c7a56a]/10 px-4 py-3 text-sm text-[#e2c98f]">{message}</div>}
    <form onSubmit={save} className="rounded-2xl border border-white/10 bg-[#151311] p-6"><h2 className="font-[var(--font-cormorant)] text-2xl">{editingId ? "Edit Attraction" : "Add Attraction"}</h2><div className="mt-5 grid gap-5 md:grid-cols-2">
      <label className="text-sm">Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="text-sm">Slug<input value={form.slug||""} onChange={e=>setForm({...form,slug:e.target.value})} placeholder="kempty-falls" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="text-sm">Distance<input value={form.distance||""} onChange={e=>setForm({...form,distance:e.target.value})} placeholder="12 km" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="text-sm">Drive time<input value={form.drive_time||""} onChange={e=>setForm({...form,drive_time:e.target.value})} placeholder="25 mins" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="text-sm md:col-span-2">Best time to visit<input value={form.best_time_to_visit||""} onChange={e=>setForm({...form,best_time_to_visit:e.target.value})} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="text-sm md:col-span-2">Description<textarea rows={4} value={form.description||""} onChange={e=>setForm({...form,description:e.target.value})} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="text-sm md:col-span-2">Google Maps URL<input value={form.maps_url||""} onChange={e=>setForm({...form,maps_url:e.target.value})} placeholder="https://www.google.com/maps/search/?api=1&query=..." className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="text-sm md:col-span-2">Upload image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setFile(e.target.files?.[0]||null)} className="mt-2 block w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm" /></label>
      <label className="text-sm md:col-span-2">Or image URL<input value={form.image_url||""} onChange={e=>setForm({...form,image_url:e.target.value})} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="text-sm">Display order<input type="number" value={form.sort_order} onChange={e=>setForm({...form,sort_order:Number(e.target.value)})} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
      <label className="flex items-center gap-3 pt-7 text-sm"><input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked})}/> Active on website</label>
    </div><button disabled={saving} className="mt-6 rounded-lg bg-[#c7a56a] px-6 py-3 text-sm font-medium text-[#17130d] disabled:opacity-50">{saving ? "Saving…" : editingId ? "Update Attraction" : "Add Attraction"}</button></form>
    <section className="mt-8"><h2 className="font-[var(--font-cormorant)] text-2xl">Current Attractions</h2>{loading?<p className="mt-4 text-white/50">Loading…</p>:items.length===0?<p className="mt-4 text-white/50">No database attractions yet.</p>:<div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map(item=><article key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#151311]"><div className="h-48 bg-black/20">{item.image_url&&<img src={item.image_url} alt={item.name} className="h-full w-full object-cover"/>}</div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium">{item.name}</h3><p className="mt-1 text-xs text-[#c7a56a]">{item.distance||"Distance not set"} · {item.drive_time||"Drive time not set"}</p></div><span className="text-xs text-white/40">#{item.sort_order}</span></div><p className="mt-3 line-clamp-3 text-sm leading-6 text-white/50">{item.description||"No description"}</p><div className="mt-4 flex gap-3"><button onClick={()=>edit(item)} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Edit</button><button onClick={()=>remove(item.id)} className="rounded-lg border border-red-400/20 px-4 py-2 text-sm text-red-300">Delete</button></div></div></article>)}</div>}</section>
  </div></main>;
}
