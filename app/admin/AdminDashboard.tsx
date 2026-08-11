"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const sections = [
  { href: "/admin/hero", title: "Hero & Banners", description: "Manage homepage hero slides and images." },
  { href: "/admin/rooms", title: "Rooms", description: "Add rooms, prices, descriptions and images." },
  { href: "/admin/gallery", title: "Gallery", description: "Upload and organize property photos." },
  { href: "/admin/attractions", title: "Attractions", description: "Manage nearby places and information." },
  { href: "/admin/amenities", title: "Amenities", description: "Manage amenities shown across the site." },
  { href: "/admin/pages", title: "Pages", description: "Manage editable page content and SEO." },
  { href: "/admin/enquiries", title: "Enquiries", description: "View, update and export booking enquiries." },
  { href: "/admin/settings", title: "Settings", description: "Manage contact and property settings." },
];

type DashboardData = {
  rooms: { total: number; active: number | null };
  gallery: { total: number; active: number | null };
  attractions: { total: number; active: number | null };
  amenities: { total: number; active: number | null };
  pages: { total: number; active: number | null };
  hero: { total: number; active: number | null };
  enquiries: { total: number; new_count: number | null; confirmed: number | null };
  recent: { id: number; enquiry_type: string; full_name: string; email: string | null; room_slug: string | null; status: string; created_at: string }[];
};

const emptyData: DashboardData = {
  rooms: { total: 0, active: 0 }, gallery: { total: 0, active: 0 }, attractions: { total: 0, active: 0 },
  amenities: { total: 0, active: 0 }, pages: { total: 0, active: 0 }, hero: { total: 0, active: 0 },
  enquiries: { total: 0, new_count: 0, confirmed: 0 }, recent: [],
};

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();
  const [data, setData] = useState<DashboardData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/dashboard", { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Could not load dashboard.");
        setData(payload);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Could not load dashboard."))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const stats = [
    { label: "New enquiries", value: data.enquiries.new_count ?? 0, detail: `${data.enquiries.total ?? 0} total`, href: "/admin/enquiries", urgent: (data.enquiries.new_count ?? 0) > 0 },
    { label: "Confirmed", value: data.enquiries.confirmed ?? 0, detail: "Confirmed bookings", href: "/admin/enquiries" },
    { label: "Rooms", value: data.rooms.active ?? 0, detail: `${data.rooms.total ?? 0} total`, href: "/admin/rooms" },
    { label: "Hero banners", value: data.hero.active ?? 0, detail: `${data.hero.total ?? 0} total`, href: "/admin/hero" },
    { label: "Gallery photos", value: data.gallery.active ?? 0, detail: `${data.gallery.total ?? 0} total`, href: "/admin/gallery" },
    { label: "Attractions", value: data.attractions.active ?? 0, detail: `${data.attractions.total ?? 0} total`, href: "/admin/attractions" },
    { label: "Amenities", value: data.amenities.active ?? 0, detail: `${data.amenities.total ?? 0} total`, href: "/admin/amenities" },
    { label: "Published pages", value: data.pages.active ?? 0, detail: `${data.pages.total ?? 0} total`, href: "/admin/pages" },
  ];

  return (
    <main className="min-h-screen bg-[#0c0b0a] text-white">
      <header className="border-b border-white/10 bg-[#11100e]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <div><p className="text-xs uppercase tracking-[0.28em] text-[#c7a56a]">Bala&apos;s Spring View</p><h1 className="mt-1 font-[var(--font-cormorant)] text-3xl">Admin Dashboard</h1></div>
          <div className="flex items-center gap-3"><span className="hidden text-sm text-white/50 sm:block">{email}</span><button onClick={logout} className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-[#c7a56a] hover:text-[#c7a56a]">Logout</button></div>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.22em] text-[#c7a56a]">Overview</p><h2 className="mt-1 font-[var(--font-cormorant)] text-3xl">Property at a glance</h2></div>{loading && <span className="text-xs text-white/40">Updating…</span>}</div>
        {error && <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200">{error}</div>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => <Link key={stat.label} href={stat.href} className={`rounded-xl border bg-[#151311] p-5 transition hover:-translate-y-0.5 hover:border-[#c7a56a]/60 ${stat.urgent ? "border-[#c7a56a]/50" : "border-white/10"}`}><div className="flex items-start justify-between gap-3"><p className="text-sm text-white/50">{stat.label}</p>{stat.urgent && <span className="rounded-full bg-[#c7a56a] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#17130d]">New</span>}</div><p className="mt-2 text-3xl font-medium text-[#e2c98f]">{stat.value}</p><p className="mt-1 text-xs text-white/35">{stat.detail}</p></Link>)}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-[#151311] p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">Inbox</p><h2 className="mt-1 font-[var(--font-cormorant)] text-2xl">Recent enquiries</h2></div><Link href="/admin/enquiries" className="text-xs uppercase tracking-[0.15em] text-[#c7a56a]">View all →</Link></div><div className="mt-5 divide-y divide-white/5">{data.recent.length === 0 ? <p className="py-8 text-center text-sm text-white/40">No enquiries received yet.</p> : data.recent.map((item) => <Link key={item.id} href="/admin/enquiries" className="flex items-center justify-between gap-4 py-4 first:pt-0 hover:bg-white/[0.02]"><div className="min-w-0"><p className="truncate text-sm">{item.full_name}</p><p className="mt-1 truncate text-xs text-white/40">{item.enquiry_type} · {item.room_slug || item.email || "Website enquiry"}</p></div><div className="shrink-0 text-right"><span className="rounded-md border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wider text-white/60">{item.status}</span><p className="mt-1 text-[10px] text-white/30">{new Date(item.created_at).toLocaleDateString()}</p></div></Link>)}</div></div>
          <div className="rounded-2xl border border-white/10 bg-[#151311] p-6"><p className="text-xs uppercase tracking-[0.2em] text-[#c7a56a]">Quick actions</p><h2 className="mt-1 font-[var(--font-cormorant)] text-2xl">Manage website</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">{sections.map((section) => <Link key={section.href} href={section.href} className="flex items-center justify-between rounded-lg border border-white/10 px-4 py-3 transition hover:border-[#c7a56a]/50"><span className="text-sm">{section.title}</span><span className="text-[#c7a56a]">→</span></Link>)}</div></div>
        </div>
      </section>
    </main>
  );
}
