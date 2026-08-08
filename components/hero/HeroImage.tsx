"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

import type { HeroSlideTint } from "@/types/hero";

type HeroImageProps = {
  images: { src: string; alt: string; tint?: HeroSlideTint }[];
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function HeroImage({ images }: HeroImageProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <div className="group relative h-[420px] w-full overflow-hidden rounded-[36px] border border-[#C9A24A]/50 shadow-[0_50px_130px_-30px_rgba(0,0,0,0.7)] lg:h-[780px]">
        <div className="h-full w-full" ref={emblaRef}>
          <div className="relative h-full w-full">
            {images.map((image, index) => (
              <div
                key={image.src}
                className="absolute inset-0 h-full w-full overflow-hidden"
              >
                <div
                  className="absolute inset-0 h-full w-full transition-transform duration-[6000ms] ease-out"
                  style={{
                    transform: index === selectedIndex ? "scale(1.09)" : "scale(1)",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="object-cover"
                  />
                  {image.tint === "warm" && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#7a3a12]/35 via-[#C9A24A]/10 to-transparent mix-blend-multiply"
                    />
                  )}
                  {image.tint === "night" && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[#0B1220]/45 mix-blend-multiply"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1720]/55 via-transparent to-transparent"
        />

        {/* Navigation arrows — visible on hover only */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F8F8F5]/30 bg-[#0F1720]/50 text-[#F8F8F5] opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A24A] hover:bg-[#0F1720]/70 hover:text-[#C9A24A] group-hover:opacity-100"
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={scrollNext}
          className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F8F8F5]/30 bg-[#0F1720]/50 text-[#F8F8F5] opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A24A] hover:bg-[#0F1720]/70 hover:text-[#C9A24A] group-hover:opacity-100"
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>

        {/* Image counter */}
        <div className="absolute right-5 top-5 z-20 rounded-full border border-[#F8F8F5]/20 bg-[#0F1720]/50 px-3 py-1.5 font-body text-[11px] font-medium tracking-[0.15em] text-[#F8F8F5] backdrop-blur-sm">
          {pad(selectedIndex + 1)} / {pad(images.length)}
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className="group/dot flex items-center justify-center p-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  index === selectedIndex
                    ? "w-6 bg-[#C9A24A]"
                    : "w-1.5 bg-[#F8F8F5]/50 group-hover/dot:bg-[#F8F8F5]/80"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Floating glass card — rating & guest count */}
        <div className="absolute bottom-5 left-5 z-20 rounded-2xl border border-[#F8F8F5]/15 bg-[#0F1720]/40 px-5 py-3.5 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="fill-[#C9A24A] text-[#C9A24A]" />
            <span className="font-body text-sm font-medium text-[#F8F8F5]">
              4.9
            </span>
            <span className="font-body text-[11px] text-[#F8F8F5]/70">
              Google Rating
            </span>
          </div>
          <div className="mt-1 font-body text-[11px] uppercase tracking-[0.15em] text-[#C9A24A]">
            150+ Happy Guests
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[#C9A24A]/10 blur-3xl sm:-inset-10"
      />
    </motion.div>
  );
}
