"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo, useState } from "react";

import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import GalleryTile from "@/components/gallery/GalleryTile";
import { galleryContent } from "@/data/gallery";
import type { GalleryFilterKey } from "@/types/gallery";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterKey>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === "all") return galleryContent.images;
    return galleryContent.images.filter((image) => image.category === activeFilter);
  }, [activeFilter]);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + filteredImages.length) % filteredImages.length;
    });
  const showNext = () =>
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % filteredImages.length;
    });

  return (
    <section
      id="gallery"
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
            {galleryContent.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl md:text-[2.75rem]"
          >
            {galleryContent.heading}
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
            {galleryContent.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 lg:mt-14"
        >
          <GalleryFilters
            filters={galleryContent.filters}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 columns-1 gap-5 sm:columns-2 sm:gap-6 lg:mt-14 lg:columns-3"
          >
            {filteredImages.map((image, index) => (
              <GalleryTile
                key={image.id}
                image={image}
                onOpen={() => setLightboxIndex(index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex justify-center lg:mt-20"
        >
          <a
            href={galleryContent.viewAllCta.href}
            className="inline-flex items-center gap-2 rounded-sm border border-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#F8F8F5] transition-all duration-300 hover:bg-[#C9A24A] hover:text-[#0E141B] hover:shadow-[0_10px_30px_rgba(201,162,74,0.35)] sm:text-sm"
          >
            {galleryContent.viewAllCta.label}
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </section>
  );
}
