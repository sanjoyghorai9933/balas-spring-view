"use client";

import { motion, type Variants } from "framer-motion";
import { Maximize2, Mountain, Users, Wifi } from "lucide-react";
import Image from "next/image";

import type { Room } from "@/types/rooms";

type RoomCardProps = {
  room: Room;
  variants?: Variants;
};

export default function RoomCard({ room, variants }: RoomCardProps) {
  return (
    <motion.article
      variants={variants}
      className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-[#C9A24A]/25 bg-[#111922] shadow-[0_25px_70px_-25px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A24A]/60 hover:shadow-[0_35px_90px_-25px_rgba(201,162,74,0.25)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={room.image.src}
          alt={room.image.alt}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0E141B]/70 via-transparent to-transparent"
        />
        <div className="absolute left-5 top-5 rounded-full border border-[#F8F8F5]/20 bg-[#0E141B]/50 px-3.5 py-1.5 font-body text-[10px] font-medium uppercase tracking-[0.25em] text-[#F8F8F5] backdrop-blur-sm">
          From ₹{room.priceFrom.toLocaleString("en-IN")} / Night
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-light text-[#F8F8F5] sm:text-2xl">
          {room.category}
        </h3>
        <p className="mt-3 font-body text-sm font-light leading-relaxed text-[#F8F8F5]/60">
          {room.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[#F8F8F5]/10 py-5">
          <div className="flex items-center gap-2 text-[#F8F8F5]/70">
            <Maximize2 size={15} strokeWidth={1.5} className="text-[#C9A24A]" />
            <span className="font-body text-xs">{room.size}</span>
          </div>
          <div className="flex items-center gap-2 text-[#F8F8F5]/70">
            <Users size={15} strokeWidth={1.5} className="text-[#C9A24A]" />
            <span className="font-body text-xs">{room.occupancy}</span>
          </div>
          <div className="flex items-center gap-2 text-[#F8F8F5]/70">
            <Wifi size={15} strokeWidth={1.5} className="text-[#C9A24A]" />
            <span className="font-body text-xs">Free WiFi</span>
          </div>
          <div className="flex items-center gap-2 text-[#F8F8F5]/70">
            <Mountain size={15} strokeWidth={1.5} className="text-[#C9A24A]" />
            <span className="font-body text-xs">Mountain View</span>
          </div>
        </div>

        <div className="mt-6 flex flex-1 items-end gap-3">
          <a
            href={room.href}
            className="inline-flex flex-1 items-center justify-center rounded-sm border border-[#F8F8F5]/25 px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-[#F8F8F5] transition-all duration-300 hover:border-[#C9A24A] hover:bg-[#C9A24A]/10 hover:text-[#C9A24A]"
          >
            View Details
          </a>
          <a
            href={`/book-now?room=${encodeURIComponent(room.slug)}`}
            className="inline-flex flex-1 items-center justify-center rounded-sm bg-[#C9A24A] px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_10px_30px_rgba(201,162,74,0.4)]"
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.article>
  );
}
