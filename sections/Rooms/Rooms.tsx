"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

import RoomCard from "@/components/rooms/RoomCard";
import { roomsContent as fallbackRoomsContent } from "@/data/rooms";
import type { RoomsContent } from "@/types/rooms";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Rooms() {
  const [content, setContent] = useState<RoomsContent | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadRooms = async () => {
      try {
        const response = await fetch("/api/content/rooms", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });

        if (!response.ok) throw new Error(`Rooms API returned ${response.status}`);

        const data = (await response.json()) as RoomsContent;
        if (!cancelled) setContent(data);
      } catch (error) {
        console.error("Failed to load live rooms; using static fallback.", error);
        if (!cancelled) setContent(fallbackRoomsContent);
      }
    };

    loadRooms();
    return () => {
      cancelled = true;
    };
  }, []);

  const roomsContent = content ?? fallbackRoomsContent;

  return (
    <section
      id="rooms"
      className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]"
          >
            {roomsContent.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl md:text-[2.75rem]"
          >
            {roomsContent.heading}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="mx-auto my-7 h-px w-20 bg-[#C9A24A]/70"
          />

          <motion.p
            variants={fadeUp}
            className="font-body text-sm font-light leading-relaxed text-[#F8F8F5]/60 sm:text-base"
          >
            {roomsContent.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8"
        >
          {content === null ? (
            <div className="col-span-full py-8 text-center font-body text-sm text-[#F8F8F5]/50">
              Loading rooms…
            </div>
          ) : roomsContent.rooms.length > 0 ? (
            roomsContent.rooms.map((room) => (
              <RoomCard key={room.id} room={room} variants={cardVariants} />
            ))
          ) : (
            <div className="col-span-full py-8 text-center font-body text-sm text-[#F8F8F5]/50">
              No rooms are currently available.
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex justify-center lg:mt-20"
        >
          <a
            href={roomsContent.viewAllCta.href}
            className="inline-flex items-center gap-2 rounded-sm border border-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#F8F8F5] transition-all duration-300 hover:bg-[#C9A24A] hover:text-[#0E141B] hover:shadow-[0_10px_30px_rgba(201,162,74,0.35)] sm:text-sm"
          >
            {roomsContent.viewAllCta.label}
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
