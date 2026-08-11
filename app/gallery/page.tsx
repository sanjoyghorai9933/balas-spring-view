import type { Metadata } from "next";
import Link from "next/link";

import AboutStatCard from "@/components/about/AboutStatCard";
import GalleryMasonryGrid from "@/components/gallery/GalleryMasonryGrid";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import { buildMetadata } from "@/lib/metadata";
import { getGalleryImagesFromDatabase } from "@/lib/cmsGallery";
import type { GalleryFilter } from "@/types/gallery";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Explore Bala's Spring View by Vista Hills through our rooms, mountain views and unforgettable experiences.",
  path: "/gallery",
  image: "/images/about/exterior.jpg",
});

const galleryPageFilters: GalleryFilter[] = [
  { key: "all", label: "All" },
  { key: "rooms", label: "Rooms" },
  { key: "exterior", label: "Exterior" },
  { key: "views", label: "Mountain Views" },
  { key: "facilities", label: "Facilities" },
  { key: "night", label: "Night View" },
];

const stats = [
  { icon: "👥", value: "150+", label: "Happy Guests" },
  { icon: "🛏", value: "50+", label: "Luxury Rooms" },
  { icon: "📸", value: "1000+", label: "Photos Captured" },
  { icon: "⭐", value: "4.9★", label: "Google Rating" },
];

export default async function GalleryPage() {
  const images = await getGalleryImagesFromDatabase();

  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow="EXPLORE"
        title="Gallery"
        subtitle="Explore Bala's Spring View through our rooms, mountain views, and unforgettable experiences."
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
        backgroundImage="/images/about/exterior.jpg"
      />
      <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <GalleryMasonryGrid images={images} filters={galleryPageFilters} />
        </div>
      </section>
      <section className="bg-[#F8F6F2] px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 sm:grid-cols-4">
          {stats.map((stat, index) => <AboutStatCard key={stat.label} index={index} {...stat} />)}
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#0F1720] px-6 py-24 text-center sm:px-10 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/about/exterior.jpg')" }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0F1720]/70 via-[#0F1720]/90 to-[#0F1720]" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">Ready to Experience Bala&apos;s Spring View?</h2>
          <div className="mt-9"><Link href="/book-now" className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm">Book Your Stay</Link></div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
