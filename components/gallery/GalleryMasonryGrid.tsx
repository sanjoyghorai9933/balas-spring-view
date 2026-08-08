"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import GalleryTile from "@/components/gallery/GalleryTile";
import type { GalleryFilter, GalleryFilterKey, GalleryImage } from "@/types/gallery";

type GalleryMasonryGridProps = {
  images: GalleryImage[];
  filters: GalleryFilter[];
};

export default function GalleryMasonryGrid({ images, filters }: GalleryMasonryGridProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterKey>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === "all") return images;
    return images.filter((image) => image.category === activeFilter);
  }, [images, activeFilter]);

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
    <div>
      <GalleryFilters filters={filters} active={activeFilter} onChange={setActiveFilter} />

      <AnimatePresence mode="wait">
        {filteredImages.length > 0 ? (
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
        ) : (
          <motion.p
            key={`${activeFilter}-empty`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-16 text-center font-body text-sm font-light text-[#F8F8F5]/50"
          >
            More photos from this category are coming soon.
          </motion.p>
        )}
      </AnimatePresence>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </div>
  );
}
