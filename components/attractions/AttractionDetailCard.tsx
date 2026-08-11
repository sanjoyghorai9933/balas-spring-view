"use client";

import { motion } from "framer-motion";
import { CalendarClock, Check, Clock, MapPin, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Attraction = { id: string | number; name: string; distance?: string | null; driveTime?: string | null; bestTimeToVisit?: string | null; description?: string | null; image?: { src: string; alt: string } | null; mapsUrl?: string | null };
type AttractionDetailCardProps = { attraction: Attraction; index: number };

export default function AttractionDetailCard({ attraction, index }: AttractionDetailCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [added, setAdded] = useState(false);
  const isReversed = index % 2 === 1;
  return (
    <motion.article initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${isReversed ? "lg:[direction:rtl]" : ""}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0F1720] to-[#1c2733] shadow-[0_30px_80px_-25px_rgba(15,23,32,0.35)] lg:[direction:ltr]">
        {attraction.image?.src && !imageFailed && <Image src={attraction.image.src} alt={attraction.image.alt || attraction.name} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" onError={() => setImageFailed(true)} />}
        {(!attraction.image?.src || imageFailed) && <div className="absolute inset-0 flex items-center justify-center"><MapPin size={48} strokeWidth={1.25} className="text-[#C9A24A]/70" /></div>}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0F1720]/50 via-transparent to-transparent" />
      </div>
      <div className="lg:[direction:ltr]">
        <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A24A]/40 bg-[#C9A24A]/10"><MapPin size={19} strokeWidth={1.5} className="text-[#C9A24A]" /></span><h3 className="font-display text-2xl font-light text-[#0F1720] sm:text-3xl">{attraction.name}</h3></div>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[#0F1720]/60">
          {attraction.distance && <div className="flex items-center gap-1.5"><MapPin size={14} strokeWidth={1.5} className="text-[#C9A24A]" /><span className="font-body text-xs">{attraction.distance}</span></div>}
          {attraction.driveTime && <div className="flex items-center gap-1.5"><Clock size={14} strokeWidth={1.5} className="text-[#C9A24A]" /><span className="font-body text-xs">{attraction.driveTime}</span></div>}
          {attraction.bestTimeToVisit && <div className="flex items-center gap-1.5"><CalendarClock size={14} strokeWidth={1.5} className="text-[#C9A24A]" /><span className="font-body text-xs">{attraction.bestTimeToVisit}</span></div>}
        </div>
        {attraction.description && <p className="mt-5 font-body text-sm font-light leading-relaxed text-[#0F1720]/65 sm:text-base">{attraction.description}</p>}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          {attraction.mapsUrl && <a href={attraction.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-sm border border-[#0F1720]/15 px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-[#0F1720] transition-all duration-300 hover:border-[#C9A24A] hover:bg-[#C9A24A]/10">View on Google Maps</a>}
          <button type="button" onClick={() => setAdded(current => !current)} className={`inline-flex items-center justify-center gap-1.5 rounded-sm px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${added ? "bg-[#C9A24A] text-[#0F1720]" : "border border-[#C9A24A] text-[#0F1720] hover:bg-[#C9A24A]/10"}`}>{added ? <Check size={14} strokeWidth={2} /> : <Plus size={14} strokeWidth={2} />}{added ? "Added to Trip" : "Add to My Trip"}</button>
        </div>
      </div>
    </motion.article>
  );
}
