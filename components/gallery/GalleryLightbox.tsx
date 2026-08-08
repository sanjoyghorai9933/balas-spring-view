"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

import type { GalleryImage } from "@/types/gallery";

const pad = (n: number) => String(n).padStart(2, "0");

type GalleryLightboxProps = {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const image = images[index];
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E141B]/92 p-4 backdrop-blur-sm sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Photo gallery lightbox"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#F8F8F5]/25 bg-[#0E141B]/60 text-[#F8F8F5] transition-colors duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A]"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F8F8F5]/25 bg-[#0E141B]/60 text-[#F8F8F5] transition-colors duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A] sm:left-6"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F8F8F5]/25 bg-[#0E141B]/60 text-[#F8F8F5] transition-colors duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A] sm:right-6"
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>

        <motion.div
          key={image.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
          className="relative h-[70vh] w-full max-w-4xl overflow-hidden rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="90vw"
            className="object-contain bg-[#0E141B]"
            priority
          />
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[#F8F8F5]/15 bg-[#0E141B]/60 px-4 py-1.5 font-body text-[11px] tracking-[0.2em] text-[#F8F8F5]/80">
          {pad(index + 1)} / {pad(images.length)}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
