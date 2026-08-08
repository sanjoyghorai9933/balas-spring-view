"use client";

import { BadgeCheck, Quote, Star } from "lucide-react";

import GoogleIcon from "@/components/testimonials/GoogleIcon";
import type { Testimonial } from "@/types/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col items-center rounded-[28px] border border-[#C9A24A]/25 bg-[#131b24] px-7 py-10 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:px-12 sm:py-12">
      <div
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A24A]/40 bg-gradient-to-br from-[#C9A24A]/25 to-[#C9A24A]/5 font-display text-lg font-medium text-[#C9A24A]"
      >
        {testimonial.initials}
      </div>

      <h3 className="mt-5 font-display text-lg font-light text-[#F8F8F5] sm:text-xl">
        {testimonial.name}
      </h3>
      <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-[#F8F8F5]/50">
        {testimonial.location}
      </p>

      <div className="mt-4 flex items-center gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-[#C9A24A] text-[#C9A24A]"
          />
        ))}
      </div>

      <Quote
        size={26}
        strokeWidth={1.25}
        aria-hidden="true"
        className="mt-5 text-[#C9A24A]/40"
      />
      <p className="mt-3 max-w-lg font-body text-base font-light italic leading-relaxed text-[#F8F8F5]/80 sm:text-lg">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <span className="rounded-full border border-[#F8F8F5]/15 bg-[#F8F8F5]/5 px-3.5 py-1.5 font-body text-[11px] tracking-[0.1em] text-[#F8F8F5]/70">
          {testimonial.stayDuration}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F8F8F5]/15 bg-[#F8F8F5]/5 px-3.5 py-1.5">
          <GoogleIcon size={13} />
          <span className="font-body text-[11px] tracking-[0.1em] text-[#F8F8F5]/70">
            Google
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A24A]/30 bg-[#C9A24A]/10 px-3.5 py-1.5">
          <BadgeCheck size={13} className="text-[#C9A24A]" />
          <span className="font-body text-[11px] tracking-[0.1em] text-[#C9A24A]">
            Verified Guest
          </span>
        </span>
      </div>
    </div>
  );
}
