"use client";

import { Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import type { GalleryImage } from "@/types/gallery";
import type { RoomImage } from "@/types/rooms";

type RoomGalleryProps = {
  images: RoomImage[];
  roomTitle: string;
};

export default function RoomGallery({ images, roomTitle }: RoomGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // GalleryLightbox is reused as-is; category/aspect aren't used by the
  // component itself, only required by its shared type, so we fill in
  // sensible defaults here rather than modifying that component.
  const lightboxImages: GalleryImage[] = images.map((image, index) => ({
    id: `${roomTitle}-${index}`,
    src: image.src,
    alt: image.alt,
    category: "rooms",
    aspect: "landscape",
  }));

  const active = images[activeIndex];

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Open photo gallery"
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[28px] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.5)]"
      >
        <Image
          src={active.src}
          alt={active.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-[#0E141B]/0 opacity-0 transition-all duration-300 group-hover:bg-[#0E141B]/45 group-hover:opacity-100"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A24A]/60 bg-[#0E141B]/60">
            <Expand size={20} strokeWidth={1.5} className="text-[#C9A24A]" />
          </span>
        </div>
      </button>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show photo ${index + 1}`}
            className={`relative aspect-[4/3] overflow-hidden rounded-xl transition-all duration-300 ${
              index === activeIndex
                ? "ring-2 ring-[#C9A24A]"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="20vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <GalleryLightbox
          images={lightboxImages}
          index={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() =>
            setActiveIndex((current) => (current - 1 + images.length) % images.length)
          }
          onNext={() => setActiveIndex((current) => (current + 1) % images.length)}
        />
      )}
    </div>
  );
}
