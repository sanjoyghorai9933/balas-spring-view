"use client";

import Link from "next/link";
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

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#0c0b0a] text-white">
      <header className="border-b border-white/10 bg-[#11100e]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#c7a56a]">Bala&apos;s Spring View</p>
            <h1 className="mt-1 font-[var(--font-cormorant)] text-3xl">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/50 sm:block">{email}</span>
            <button onClick={logout} className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:border-[#c7a56a] hover:text-[#c7a56a]">
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Rooms", "/admin/rooms"],
            ["Gallery", "/admin/gallery"],
            ["Enquiries", "/admin/enquiries"],
            ["Settings", "/admin/settings"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="rounded-xl border border-white/10 bg-[#151311] p-5 transition hover:border-[#c7a56a]/60">
              <p className="text-sm text-white/50">Manage</p>
              <p className="mt-1 text-lg text-[#c7a56a]">{label}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="group rounded-2xl border border-white/10 bg-[#151311] p-6 transition hover:-translate-y-0.5 hover:border-[#c7a56a]/60">
              <h2 className="font-[var(--font-cormorant)] text-2xl group-hover:text-[#c7a56a]">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/50">{section.description}</p>
              <span className="mt-5 inline-block text-xs uppercase tracking-[0.2em] text-[#c7a56a]">Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
