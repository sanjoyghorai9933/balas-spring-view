"use client";

import { motion } from "framer-motion";

import type { GalleryFilter, GalleryFilterKey } from "@/types/gallery";

type GalleryFiltersProps = {
  filters: GalleryFilter[];
  active: GalleryFilterKey;
  onChange: (key: GalleryFilterKey) => void;
};

export default function GalleryFilters({
  filters,
  active,
  onChange,
}: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {filters.map((filter) => {
        const isActive = filter.key === active;

        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onChange(filter.key)}
            className="relative rounded-full px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 sm:text-[13px]"
          >
            {isActive && (
              <motion.span
                layoutId="gallery-filter-pill"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 rounded-full bg-[#C9A24A]"
              />
            )}
            <span
              className={`relative z-10 ${
                isActive ? "text-[#0E141B]" : "text-[#F8F8F5]/60 hover:text-[#F8F8F5]"
              }`}
            >
              {filter.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
