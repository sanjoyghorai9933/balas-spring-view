import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import CompareRoomsSection from "@/components/rooms/CompareRoomsSection";
import IncludedAmenities from "@/components/rooms/IncludedAmenities";
import RoomsFaqSection from "@/components/rooms/RoomsFaqSection";
import RoomsListingSection from "@/components/rooms/RoomsListingSection";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Luxury Rooms & Suites",
  description:
    "Explore Deluxe, Premium Deluxe and Family Suite rooms at Bala's Spring View by Vista Hills — luxury mountain accommodation in Mussoorie.",
  path: "/rooms",
  image: "/images/about/exterior.jpg",
});

export default function RoomsPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow="OUR ROOMS"
        title="Luxury Rooms & Suites"
        subtitle="Choose the perfect accommodation for your mountain escape."
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
        backgroundImage="/images/about/exterior.jpg"
      />
      <div className="flex justify-center bg-[#0F1720] pb-16 sm:pb-20">
        <Link
          href="/book-now"
          className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm"
        >
          Book Your Stay
        </Link>
      </div>

      <RoomsListingSection />
      <CompareRoomsSection />
      <IncludedAmenities />

      <section className="relative overflow-hidden bg-[#0F1720] px-6 py-24 text-center sm:px-10 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/images/about/exterior.jpg')" }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0F1720]/70 via-[#0F1720]/90 to-[#0F1720]" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">Ready for an unforgettable stay?</h2>
          <p className="mt-4 font-body text-sm font-light leading-relaxed text-[#F8F8F5]/65 sm:text-base">Reserve your room at Bala&apos;s Spring View and wake up to the hills of Mussoorie.</p>
          <div className="mt-9">
            <Link href="/book-now" className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm">Book Now</Link>
          </div>
        </div>
      </section>

      <RoomsFaqSection />
      <Footer />
    </main>
  );
}
