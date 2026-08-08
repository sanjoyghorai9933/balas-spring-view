"use client";

import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { Attraction } from "@/types/attractions";

type AttractionCardProps = {
  attraction: Attraction;
};

export default function AttractionCard({ attraction }: AttractionCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = attraction.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_20px_55px_-25px_rgba(15,23,32,0.25)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-25px_rgba(201,162,74,0.3)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#0F1720] to-[#1c2733]">
        {!imageFailed && (
          <Image
            src={attraction.image.src}
            alt={attraction.image.alt}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            onError={() => setImageFailed(true)}
          />
        )}

        {imageFailed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={40} strokeWidth={1.25} className="text-[#C9A24A]/70" />
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0F1720]/60 via-transparent to-transparent"
        />

        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A24A]/40 bg-[#0F1720]/50 backdrop-blur-sm">
          <Icon size={18} strokeWidth={1.5} className="text-[#C9A24A]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-xl font-light text-[#0F1720] sm:text-2xl">
          {attraction.name}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[#0F1720]/60">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} strokeWidth={1.5} className="text-[#C9A24A]" />
            <span className="font-body text-xs">{attraction.distance}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} strokeWidth={1.5} className="text-[#C9A24A]" />
            <span className="font-body text-xs">{attraction.driveTime}</span>
          </div>
        </div>

        <p className="mt-4 flex-1 font-body text-sm font-light leading-relaxed text-[#0F1720]/60">
          {attraction.description}
        </p>

        <a
          href={attraction.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm border border-[#0F1720]/15 px-4 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-[#0F1720] transition-all duration-300 hover:border-[#C9A24A] hover:bg-[#C9A24A]/10 hover:text-[#0F1720]"
        >
          View on Google Maps
        </a>
      </div>
    </motion.article>
  );
}
