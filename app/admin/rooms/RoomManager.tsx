"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type GalleryImage = { id?: number; image_url: string; alt_text: string | null; sort_order: number };
type Room = {
  id: number;
  slug: string;
  name: string;
  category: string | null;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  long_description: string | null;
  size: string | null;
  bed_type: string | null;
  price_from: number | string | null;
  max_adults: number;
  max_children: number;
  amenities_json: string | string[] | null;
  cover_image_url: string | null;
  sort_order: number;
  is_active: number;
  gallery_images: GalleryImage[] | string;
};

type FormState = {
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  short_description: string;
  description: string;
  long_description: string;
  size: string;
  bed_type: string;
  price_from: string;
  max_adults: number;
  max_children: number;
  amenities: string[];
  cover_image_url: string;
  sort_order: number;
  is_active: boolean;
  gallery_images: GalleryImage[];
};

const emptyForm: FormState = {
  slug: "",
  name: "",
  category: "",
  subtitle: "",
  short_description: "",
  description: "",
  long_description: "",
  size: "",
  bed_type: "",
  price_from: "",
  max_adults: 2,
  max_children: 0,
  amenities: [],
  cover_image_url: "",
  sort_order: 0,
  is_active: true,
  gallery_images: [],
};

function parseGallery(value: Room["gallery_images"]): GalleryImage[] {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value) as GalleryImage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseAmenities(value: Room["amenities_json"]): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

export default function RoomManager() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/rooms", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load rooms.");
      setRooms(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load rooms.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  const isEditing = editingId !== null;
  const formTitle = useMemo(() => isEditing ? "Edit Room" : "Add Room", [isEditing]);

  function startEdit(room: Room) {
    setEditingId(room.id);
    setForm({
      slug: room.slug,
      name: room.name,
      category: room.category || room.name,
      subtitle: room.subtitle || "",
      short_description: room.short_description || "",
      description: room.description || "",
      long_description: room.long_description || room.description || "",
      size: room.size || "",
      bed_type: room.bed_type || "",
      price_from: String(room.price_from ?? ""),
      max_adults: room.max_adults,
      max_children: room.max_children,
      amenities: parseAmenities(room.amenities_json),
      cover_image_url: room.cover_image_url || "",
      sort_order: room.sort_order,
      is_active: Boolean(room.is_active),
      gallery_images: parseGallery(room.gallery_images),
    });
    setCoverFile(null);
    setGalleryFiles([]);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setEditingId(null);
    setForm(emptyForm);
    setCoverFile(null);
    setGalleryFiles([]);
    setMessage("");
  }

  async function upload(file: File, folder: string) {
    const data = new FormData();
    data.append("file", file);
    data.append("folder", folder);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Image upload failed.");
    return result.url as string;
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      let coverUrl = form.cover_image_url;
      if (coverFile) coverUrl = await upload(coverFile, "rooms");

      const newGallery = [...form.gallery_images];
      for (const file of galleryFiles) {
        const url = await upload(file, "rooms");
        newGallery.push({ image_url: url, alt_text: form.name, sort_order: newGallery.length });
      }

      if (!coverUrl && newGallery[0]?.image_url) coverUrl = newGallery[0].image_url;
      if (!coverUrl) throw new Error("Please add a cover image or image URL.");

      const payload = { ...form, cover_image_url: coverUrl, gallery_images: newGallery };
      const response = await fetch(editingId ? `/api/admin/rooms/${editingId}` : "/api/admin/rooms", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save room.");
      setMessage(editingId ? "Room updated successfully." : "Room added successfully.");
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
      const response = await fetch("/api/admin/rooms/seed", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not import existing rooms.");
      setMessage(result.message);
      await load();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not import existing rooms.");
    } finally {
      setSeeding(false);
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this room? Its room images will also be removed from the database.")) return;
    const response = await fetch(`/api/admin/rooms/${id}`, { method: "DELETE" });
    if (response.ok) {
      setMessage("Room deleted.");
      await load();
    }
  }

  function removeGallery(index: number) {
    setForm((current) => ({ ...current, gallery_images: current.gallery_images.filter((_, itemIndex) => itemIndex !== index) }));
  }

  return (
    <main className="min-h-screen bg-[#0c0b0a] px-5 py-8 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">← Dashboard</Link>
            <h1 className="mt-2 font-[var(--font-cormorant)] text-4xl">Rooms</h1>
            <p className="mt-2 text-sm text-white/50">Manage room details, pricing, amenities and room galleries.</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={importExisting} disabled={seeding} className="rounded-lg border border-[#c7a56a]/40 px-4 py-2 text-sm text-[#e2c98f] disabled:opacity-50">{seeding ? "Importing…" : "Import Existing Rooms"}</button>
            {isEditing && <button type="button" onClick={reset} className="rounded-lg border border-white/10 px-4 py-2 text-sm">Cancel edit</button>}
          </div>
        </div>

        {message && <div className="mb-6 rounded-lg border border-[#c7a56a]/30 bg-[#c7a56a]/10 px-4 py-3 text-sm text-[#e2c98f]">{message}</div>}

        <form onSubmit={save} className="rounded-2xl border border-white/10 bg-[#151311] p-6">
          <h2 className="font-[var(--font-cormorant)] text-2xl">{formTitle}</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="text-sm">Room name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Slug<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} placeholder="deluxe-room" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Subtitle<input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm md:col-span-2">Short description<textarea rows={2} value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm md:col-span-2">Long description<textarea rows={5} value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Room size<input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} placeholder="220 sq ft" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Bed type<input value={form.bed_type} onChange={(e) => setForm({ ...form, bed_type: e.target.value })} placeholder="1 King Bed" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Price from (₹)<input type="number" min="0" value={form.price_from} onChange={(e) => setForm({ ...form, price_from: e.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Max adults<input type="number" min="1" max="20" value={form.max_adults} onChange={(e) => setForm({ ...form, max_adults: Number(e.target.value) })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Max children<input type="number" min="0" max="20" value={form.max_children} onChange={(e) => setForm({ ...form, max_children: Number(e.target.value) })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm">Display order<input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="flex items-center gap-3 pt-7 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} /> Active on website</label>
            <div className="md:col-span-2">
              <p className="text-sm">Amenities</p>
              <input value={form.amenities.join(", ")} onChange={(e) => setForm({ ...form, amenities: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} placeholder="Free WiFi, Mountain View, Smart TV" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" />
              <p className="mt-1 text-xs text-white/35">Separate amenities with commas.</p>
            </div>
            <label className="text-sm md:col-span-2">Cover image upload<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} className="mt-2 block w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm" /></label>
            <label className="text-sm md:col-span-2">Or cover image URL<input value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} placeholder="/images/rooms/room1.jpeg" className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3" /></label>
            <label className="text-sm md:col-span-2">Add multiple room gallery images<input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))} className="mt-2 block w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm" /></label>
          </div>

          {form.gallery_images.length > 0 && (
            <div className="mt-6">
              <p className="text-sm">Current gallery</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {form.gallery_images.map((image, index) => (
                  <div key={`${image.image_url}-${index}`} className="relative overflow-hidden rounded-lg border border-white/10">
                    <img src={image.image_url} alt={image.alt_text || form.name} className="h-28 w-full object-cover" />
                    <button type="button" onClick={() => removeGallery(index)} className="absolute right-2 top-2 rounded bg-black/75 px-2 py-1 text-xs text-red-300">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button disabled={saving} className="mt-6 rounded-lg bg-[#c7a56a] px-6 py-3 text-sm font-medium text-[#17130d] disabled:opacity-50">{saving ? "Saving…" : isEditing ? "Update Room" : "Add Room"}</button>
        </form>

        <section className="mt-8">
          <h2 className="font-[var(--font-cormorant)] text-2xl">Current Rooms</h2>
          {loading ? <p className="mt-4 text-white/50">Loading…</p> : rooms.length === 0 ? <p className="mt-4 text-white/50">No database rooms yet. Click Import Existing Rooms to migrate the current three rooms.</p> : (
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room) => (
                <article key={room.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#151311]">
                  <img src={room.cover_image_url || "/images/rooms/room1.jpeg"} alt={room.name} className="h-52 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3"><div><h3 className="font-[var(--font-cormorant)] text-2xl">{room.name}</h3><p className="mt-1 text-xs text-white/40">/{room.slug}</p></div><span className={`rounded-full px-3 py-1 text-xs ${room.is_active ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-white/40"}`}>{room.is_active ? "Active" : "Hidden"}</span></div>
                    <p className="mt-3 text-sm text-white/55">From ₹{Number(room.price_from || 0).toLocaleString("en-IN")}</p>
                    <p className="mt-1 text-xs text-white/35">{parseGallery(room.gallery_images).length} gallery image(s)</p>
                    <div className="mt-5 flex gap-3"><button onClick={() => startEdit(room)} className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-[#c7a56a]">Edit</button><button onClick={() => remove(room.id)} className="rounded-lg border border-red-400/20 px-4 py-2 text-sm text-red-300">Delete</button><Link href={`/rooms/${room.slug}`} target="_blank" className="rounded-lg border border-white/10 px-4 py-2 text-sm">View</Link></div>
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
