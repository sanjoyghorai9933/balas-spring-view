import {
  Armchair,
  Bed,
  Car,
  Coffee,
  Droplets,
  EggFried,
  Maximize2,
  Mountain,
  Phone,
  Sparkles,
  Tv,
  Users,
  Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Accordion from "@/components/shared/Accordion";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import RoomCard from "@/components/rooms/RoomCard";
import RoomGallery from "@/components/rooms/RoomGallery";
import WhatsAppIcon from "@/components/layout/WhatsAppIcon";
import { roomsContent as fallbackRoomsContent } from "@/data/rooms";
import { roomsPageContent } from "@/data/rooms-page";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { getRoomFromDatabase, getRoomsFromDatabase } from "@/lib/cmsRooms";
import type { Room } from "@/types/rooms";

const AMENITY_ICONS: Record<string, LucideIcon> = {
  "Free WiFi": Wifi,
  "Mountain View": Mountain,
  "Smart TV": Tv,
  "24×7 Hot Water": Droplets,
  "Room Service": Coffee,
  "Private Sit-out": Armchair,
  "Extra Bedding": Bed,
  "Family Friendly": Users,
};

type RoomPageParams = { slug: string };

async function getRoom(slug: string): Promise<Room | undefined> {
  return getRoomFromDatabase(slug);
}

export function generateStaticParams(): RoomPageParams[] {
  return fallbackRoomsContent.rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RoomPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoom(slug);

  if (!room) {
    return buildMetadata({
      title: "Room Not Found",
      description: "This room could not be found.",
      path: `/rooms/${slug}`,
    });
  }

  return buildMetadata({
    title: room.title,
    description: room.description,
    path: `/rooms/${room.slug}`,
    image: room.heroImage.src,
  });
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<RoomPageParams>;
}) {
  const { slug } = await params;
  const room = await getRoom(slug);

  if (!room) notFound();

  const allRooms = await getRoomsFromDatabase();
  const similarRooms = allRooms.filter((r) => r.id !== room.id);

  return (
    <main>
      <Navbar />

      <PageHero
        eyebrow={room.subtitle}
        title={room.title}
        subtitle={`Starting From ₹${room.priceFrom.toLocaleString("en-IN")} / Night`}
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Rooms", href: "/rooms" },
          { label: room.title },
        ]}
        backgroundImage={room.heroImage.src}
      />
      <div className="flex justify-center bg-[#0F1720] pb-16 sm:pb-20">
        <Link
          href={`/book-now?room=${encodeURIComponent(room.slug)}`}
          className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm"
        >
          Book Now
        </Link>
      </div>

      <div className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <RoomGallery images={room.galleryImages} roomTitle={room.title} />

          <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-[62%_38%] lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl">{room.title}</h2>
              <div aria-hidden="true" className="my-6 h-px w-16 bg-[#C9A24A]" />
              <p className="font-body text-sm font-light leading-relaxed text-[#0F1720]/65 sm:text-base">{room.longDescription}</p>

              <h3 className="mt-10 font-display text-xl font-medium text-[#0F1720]">Amenities</h3>
              <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {room.amenities.map((amenity) => {
                  const Icon = AMENITY_ICONS[amenity] ?? Sparkles;
                  return (
                    <li key={amenity} className="flex items-center gap-2.5 rounded-xl border border-[#0F1720]/8 bg-white/70 px-4 py-3">
                      <Icon size={16} strokeWidth={1.5} className="shrink-0 text-[#C9A24A]" />
                      <span className="font-body text-xs text-[#0F1720]/75 sm:text-sm">{amenity}</span>
                    </li>
                  );
                })}
              </ul>

              <h3 className="mt-12 font-display text-xl font-medium text-[#0F1720]">Room Information</h3>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { icon: Maximize2, label: "Room Size", value: room.size },
                  { icon: Users, label: "Guests", value: room.occupancy },
                  { icon: Bed, label: "Bed Type", value: room.bedType },
                  { icon: Mountain, label: "Mountain View", value: "Included" },
                  { icon: Wifi, label: "Free WiFi", value: "Included" },
                  { icon: EggFried, label: "Breakfast", value: "Available" },
                  { icon: Car, label: "Parking", value: "Free" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-[#0F1720]/8 bg-white/70 p-5 text-center shadow-[0_12px_35px_-20px_rgba(15,23,32,0.2)]">
                    <Icon size={20} strokeWidth={1.5} className="mx-auto text-[#C9A24A]" />
                    <p className="mt-3 font-body text-xs uppercase tracking-[0.12em] text-[#0F1720]/50">{label}</p>
                    <p className="mt-1 font-display text-sm font-medium text-[#0F1720]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-32 lg:h-fit">
              <div className="rounded-[28px] border border-[#C9A24A]/25 bg-[#111827] p-7 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.5)] sm:p-8">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#F8F8F5]/50">Starting From</p>
                <p className="mt-2 font-display text-3xl font-light text-[#F8F8F5]">
                  ₹{room.priceFrom.toLocaleString("en-IN")}
                  <span className="font-body text-sm font-light text-[#F8F8F5]/50"> / Night</span>
                </p>

                <Link href={`/book-now?room=${encodeURIComponent(room.slug)}`} className="mt-6 flex w-full items-center justify-center rounded-sm bg-[#C9A24A] px-6 py-3.5 font-body text-xs font-medium uppercase tracking-[0.2em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_40px_-10px_rgba(201,162,74,0.5)]">Book Now</Link>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <a href={siteConfig.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2fe077]"><WhatsAppIcon size={14} />WhatsApp</a>
                  <a href={siteConfig.phoneHref} className="flex items-center justify-center gap-2 rounded-sm border border-[#F8F8F5]/25 px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-[#F8F8F5] transition-all duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A]"><Phone size={14} strokeWidth={1.75} />Call</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]">MORE OPTIONS</p>
            <h2 className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">Similar Rooms</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {similarRooms.map((similarRoom) => <RoomCard key={similarRoom.id} room={similarRoom} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]">{roomsPageContent.faqs.eyebrow}</p>
            <h2 className="mt-5 font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl">{roomsPageContent.faqs.heading}</h2>
            <div aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#C9A24A]" />
          </div>
          <div className="mt-12 text-[#0F1720]"><Accordion items={roomsPageContent.faqs.items} /></div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
