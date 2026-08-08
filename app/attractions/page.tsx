import {
  Bus,
  Camera,
  CloudSun,
  ParkingCircle,
  Route,
  ShieldCheck,
  Shirt,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import AttractionDetailCard from "@/components/attractions/AttractionDetailCard";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/shared/Reveal";
import { attractionsContent } from "@/data/attractions";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Explore Mussoorie",
  description:
    "Discover the most beautiful attractions around Bala's Spring View by Vista Hills — Kempty Falls, Mall Road, Gun Hill, Lal Tibba and more.",
  path: "/attractions",
  image: "/images/gallery/gallery3.jpg",
});

type Itinerary = {
  title: string;
  icon: LucideIcon;
  stops: { time: string; label: string }[];
};

const itineraries: Itinerary[] = [
  {
    title: "One-Day Trip",
    icon: Route,
    stops: [
      { time: "Morning", label: "Kempty Falls" },
      { time: "Afternoon", label: "Gun Hill & Mall Road" },
      { time: "Evening", label: "Company Garden" },
    ],
  },
  {
    title: "Two-Day Trip",
    icon: Route,
    stops: [
      { time: "Day 1", label: "Mall Road, Gun Hill & Company Garden" },
      { time: "Day 2", label: "Kempty Falls, Lal Tibba & George Everest Peak" },
    ],
  },
  {
    title: "Weekend Trip",
    icon: Route,
    stops: [
      { time: "Day 1", label: "Arrival, check-in & Mall Road" },
      { time: "Day 2", label: "Kempty Falls & Company Garden" },
      { time: "Day 3", label: "Lal Tibba, George Everest Peak & departure" },
    ],
  },
];

const travelTips = [
  {
    icon: CloudSun,
    title: "Weather",
    description: "Mussoorie stays cool year-round — pleasant summers and cold, occasionally snowy winters.",
  },
  {
    icon: Shirt,
    title: "Clothing",
    description: "Pack light layers for the day and a warm jacket for evenings, especially between October and March.",
  },
  {
    icon: Bus,
    title: "Local Transport",
    description: "Taxis and shared cabs are readily available; most attractions are a short drive from the hotel.",
  },
  {
    icon: ParkingCircle,
    title: "Parking",
    description: "Free on-site parking is available at the hotel; some attractions have limited paid parking nearby.",
  },
  {
    icon: Camera,
    title: "Photography Tips",
    description: "Early morning and golden hour light offer the clearest mountain views for photos.",
  },
  {
    icon: ShieldCheck,
    title: "Safety Tips",
    description: "Hill roads can be winding — travel during daylight where possible and keep warm clothing handy.",
  },
];

const restaurants = [
  {
    name: "Landour Bakehouse",
    cuisine: "Cafe & Bakery",
    description: "A cosy Landour institution known for fresh bakes, coffee and a relaxed hillside setting.",
  },
  {
    name: "Kalsang Restaurant",
    cuisine: "Tibetan & Chinese",
    description: "A long-standing local favourite for momos, thukpa and other Tibetan comfort food.",
  },
  {
    name: "Lovely Omelette Centre",
    cuisine: "Street Food",
    description: "A well-known Mall Road stop for quick, hearty egg dishes and classic street snacks.",
  },
];

export default function AttractionsPage() {
  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow="MUSSOORIE"
        title="Explore Mussoorie"
        subtitle="Discover the most beautiful attractions around Bala's Spring View by Vista Hills."
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "Attractions" }]}
        backgroundImage="/images/gallery/gallery3.jpg"
      />
      <div className="flex justify-center bg-[#0F1720] pb-16 sm:pb-20">
        <Link
          href="/book-now"
          className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm"
        >
          Book Your Stay
        </Link>
      </div>

      {/* Attraction sections */}
      <section className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-6xl space-y-20 lg:space-y-28">
          {attractionsContent.attractions.map((attraction, index) => (
            <AttractionDetailCard key={attraction.id} attractionId={attraction.id} index={index} />
          ))}
        </div>
      </section>

      {/* Travel Planner */}
      <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]">
              TRAVEL PLANNER
            </p>
            <h2 className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">
              Plan Your Perfect Trip
            </h2>
            <div aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#C9A24A]/70" />
            <p className="font-body text-sm font-light leading-relaxed text-[#F8F8F5]/60 sm:text-base">
              Recommended itineraries to make the most of your time in Mussoorie.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-3">
            {itineraries.map(({ title, icon: Icon, stops }, index) => (
              <Reveal key={title} delay={index * 0.1}>
                <div className="h-full rounded-[28px] border border-[#C9A24A]/20 bg-[#111827]/60 p-8 shadow-[0_25px_65px_-25px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A24A]/40 bg-[#C9A24A]/10">
                      <Icon size={18} strokeWidth={1.5} className="text-[#C9A24A]" />
                    </span>
                    <h3 className="font-display text-xl font-light text-[#F8F8F5]">
                      {title}
                    </h3>
                  </div>

                  <div className="relative mt-7 space-y-6 border-l border-[#C9A24A]/25 pl-6">
                    {stops.map((stop) => (
                      <div key={stop.time} className="relative">
                        <span className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-[#C9A24A]" />
                        <p className="font-body text-xs uppercase tracking-[0.15em] text-[#C9A24A]">
                          {stop.time}
                        </p>
                        <p className="mt-1 font-body text-sm font-light text-[#F8F8F5]/75">
                          {stop.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]">
              GOOD TO KNOW
            </p>
            <h2 className="mt-5 font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl">
              Travel Tips
            </h2>
            <div aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#C9A24A]" />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {travelTips.map(({ icon: Icon, title, description }, index) => (
              <Reveal key={title} delay={index * 0.08}>
                <div className="h-full rounded-2xl border border-[#0F1720]/8 bg-white/70 p-6 shadow-[0_15px_45px_-20px_rgba(15,23,32,0.2)] sm:p-7">
                  <div className="inline-flex rounded-lg border border-[#C9A24A]/25 bg-[#C9A24A]/10 p-3">
                    <Icon size={20} strokeWidth={1.5} className="text-[#C9A24A]" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium text-[#0F1720]">
                    {title}
                  </h3>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-[#0F1720]/60">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Restaurants (optional) */}
      <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]">
              WHERE TO EAT
            </p>
            <h2 className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">
              Nearby Restaurants
            </h2>
            <div aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#C9A24A]/70" />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-3">
            {restaurants.map((restaurant, index) => (
              <Reveal key={restaurant.name} delay={index * 0.1}>
                <div className="h-full rounded-2xl border border-[#C9A24A]/20 bg-[#111827]/60 p-7 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)]">
                  <div className="inline-flex rounded-lg border border-[#C9A24A]/25 bg-[#C9A24A]/10 p-3">
                    <UtensilsCrossed size={20} strokeWidth={1.5} className="text-[#C9A24A]" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium text-[#F8F8F5]">
                    {restaurant.name}
                  </h3>
                  <p className="mt-1 font-body text-xs uppercase tracking-[0.15em] text-[#C9A24A]">
                    {restaurant.cuisine}
                  </p>
                  <p className="mt-3 font-body text-sm leading-relaxed text-[#F8F8F5]/60">
                    {restaurant.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center font-body text-xs font-light text-[#F8F8F5]/40">
            Recommendations only — please confirm current hours before visiting.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[#0F1720] px-6 py-24 text-center sm:px-10 sm:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/gallery/gallery3.jpg')" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0F1720]/70 via-[#0F1720]/90 to-[#0F1720]"
        />

        <Reveal className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">
            Ready to Explore Mussoorie?
          </h2>
          <div className="mt-9">
            <Link
              href="/book-now"
              className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm"
            >
              Book Your Stay
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
