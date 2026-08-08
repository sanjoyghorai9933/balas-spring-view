"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/cn";
import type { Amenity } from "@/types/amenities";

export const amenityCardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type AmenityCardProps = Amenity & {
  className?: string;
};

export default function AmenityCard({
  title,
  description,
  icon: Icon,
  className,
}: AmenityCardProps) {
  return (
    <motion.article
      variants={amenityCardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[#0F1720]/8 bg-white/70 p-6 shadow-[0_15px_45px_-20px_rgba(15,23,32,0.2)] transition-all duration-300 hover:border-[#C9A24A]/50 hover:bg-white hover:shadow-[0_25px_55px_-20px_rgba(201,162,74,0.3)] sm:p-7",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#C9A24A]/10 blur-2xl transition-all duration-500 group-hover:bg-[#C9A24A]/20"
      />

      <div className="relative">
        <div className="mb-5 inline-flex rounded-lg border border-[#C9A24A]/25 bg-[#C9A24A]/10 p-3 transition-all duration-300 group-hover:border-[#C9A24A]/60 group-hover:bg-[#C9A24A]/20">
          <Icon
            size={22}
            strokeWidth={1.5}
            className="text-[#C9A24A] transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <h3 className="font-display text-lg font-medium text-[#0F1720] sm:text-xl">
          {title}
        </h3>

        <p className="mt-2.5 font-body text-sm leading-relaxed text-[#0F1720]/60 transition-colors duration-300 group-hover:text-[#0F1720]/80">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
