"use client";

import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import Image from "next/image";

import type { GalleryImage } from "@/types/gallery";

const aspectClass: Record<GalleryImage["aspect"], string> = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

type GalleryTileProps = {
  image: GalleryImage;
  onOpen: () => void;
};

export default function GalleryTile({ image, onOpen }: GalleryTileProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative mb-5 block w-full cursor-pointer overflow-hidden rounded-[28px] shadow-[0_20px_55px_-20px_rgba(0,0,0,0.55)] transition-shadow duration-300 hover:shadow-[0_28px_70px_-20px_rgba(201,162,74,0.25)] sm:mb-6 ${aspectClass[image.aspect]}`}
      aria-label={`Open photo: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-[#0E141B]/0 opacity-0 transition-all duration-300 group-hover:bg-[#0E141B]/55 group-hover:opacity-100"
      >
        <span className="flex flex-col items-center gap-2 text-[#F8F8F5]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A24A]/60 bg-[#0E141B]/60">
            <Expand size={18} strokeWidth={1.5} className="text-[#C9A24A]" />
          </span>
          <span className="font-body text-[11px] font-medium uppercase tracking-[0.25em]">
            View Photo
          </span>
        </span>
      </div>
    </motion.button>
  );
}
