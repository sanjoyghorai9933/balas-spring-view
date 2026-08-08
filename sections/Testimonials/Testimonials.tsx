"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import GoogleIcon from "@/components/testimonials/GoogleIcon";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { testimonialsContent } from "@/data/testimonials";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Fade(),
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const testimonials = testimonialsContent.testimonials;

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

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="testimonials" className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-5xl">
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
            {testimonialsContent.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl md:text-[2.75rem]"
          >
            {testimonialsContent.heading}
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
            {testimonialsContent.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mt-16 lg:mt-20"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="relative min-h-[560px] sm:min-h-[460px] lg:min-h-[420px]">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="absolute inset-0 h-full w-full">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 z-10 flex h-11 w-11 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F8F8F5]/20 bg-[#0E141B]/70 text-[#F8F8F5] opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A] group-hover:translate-x-0 group-hover:opacity-100 sm:-left-4 lg:-left-14"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 translate-x-2 items-center justify-center rounded-full border border-[#F8F8F5]/20 bg-[#0E141B]/70 text-[#F8F8F5] opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A] group-hover:translate-x-0 group-hover:opacity-100 sm:-right-4 lg:-right-14"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>

          {/* Pagination dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => scrollTo(index)}
                className="group/dot flex items-center justify-center p-1"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    index === selectedIndex
                      ? "w-6 bg-[#C9A24A]"
                      : "w-1.5 bg-[#F8F8F5]/30 group-hover/dot:bg-[#F8F8F5]/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Google rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 flex max-w-md flex-col items-center gap-4 rounded-2xl border border-[#F8F8F5]/10 bg-[#131b24] px-8 py-8 text-center shadow-[0_25px_60px_-25px_rgba(0,0,0,0.5)] lg:mt-20"
        >
          <div className="flex items-center gap-2">
            <GoogleIcon size={20} />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-[#C9A24A] text-[#C9A24A]" />
              ))}
            </div>
            <span className="font-display text-xl font-medium text-[#F8F8F5]">
              {testimonialsContent.googleRating.value}
            </span>
          </div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-[#F8F8F5]/50">
            {testimonialsContent.googleRating.label}
          </p>
          <a
            href={testimonialsContent.googleRating.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center rounded-sm border border-[#C9A24A] px-7 py-3.5 font-body text-xs font-medium uppercase tracking-[0.2em] text-[#F8F8F5] transition-all duration-300 hover:bg-[#C9A24A] hover:text-[#0E141B] hover:shadow-[0_10px_30px_rgba(201,162,74,0.35)]"
          >
            {testimonialsContent.googleRating.cta.label}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
