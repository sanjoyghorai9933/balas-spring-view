"use client";

import { motion, type Variants } from "framer-motion";
import { useMemo, useState } from "react";

import RoomCard from "@/components/rooms/RoomCard";
import type { Room } from "@/types/rooms";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type RoomsGridProps = {
  rooms: Room[];
};

export default function RoomsGrid({ rooms }: RoomsGridProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(rooms.map((room) => room.category)))],
    [rooms],
  );
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredRooms = useMemo(
    () =>
      activeFilter === "All"
        ? rooms
        : rooms.filter((room) => room.category === activeFilter),
    [rooms, activeFilter],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {categories.map((category) => {
          const isActive = category === activeFilter;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className="relative rounded-full px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 sm:text-[13px]"
            >
              {isActive && (
                <motion.span
                  layoutId="rooms-filter-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-[#C9A24A]"
                />
              )}
              <span
                className={`relative z-10 ${
                  isActive ? "text-[#0E141B]" : "text-[#F8F8F5]/60 hover:text-[#F8F8F5]"
                }`}
              >
                {category}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeFilter}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
      >
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} variants={cardVariants} />
        ))}
      </motion.div>
    </div>
  );
}
