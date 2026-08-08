"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";

import ContactCard from "@/components/contact/ContactCard";
import { siteConfig } from "@/data/site";

/**
 * Self-contained client component: icons (React component references) can't
 * be passed as props from a Server Component page, so this renders the full
 * card set itself rather than receiving icon props from app/contact/page.tsx.
 */
export default function ContactInfoCards() {
  return (
    <div className="space-y-5">
      <ContactCard
        icon={Phone}
        title="Phone"
        cta={{ label: "Call Now", href: siteConfig.phoneHref }}
      >
        {siteConfig.phone}
      </ContactCard>

      <ContactCard
        icon={MessageCircle}
        title="WhatsApp"
        cta={{
          label: "Chat on WhatsApp",
          href: siteConfig.whatsappHref,
          external: true,
          variant: "whatsapp",
        }}
      >
        {siteConfig.phone}
      </ContactCard>

      <ContactCard
        icon={Mail}
        title="Email"
        cta={{ label: "Send Email", href: siteConfig.emailHref }}
      >
        {siteConfig.email}
      </ContactCard>

      <ContactCard icon={MapPin} title="Address">
        {siteConfig.address.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </ContactCard>

      <ContactCard icon={Clock} title="Hotel Timings">
        <span className="block">Check-in: {siteConfig.checkIn}</span>
        <span className="block">Check-out: {siteConfig.checkOut}</span>
      </ContactCard>

      <ContactCard icon={Star} title="Google Rating">
        <span className="flex items-center gap-1 text-[#C9A24A]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className="fill-[#C9A24A] text-[#C9A24A]" />
          ))}
          <span className="ml-1 font-body text-sm text-[#F8F8F5]">
            {siteConfig.googleRating}
          </span>
        </span>
        <span className="mt-1 block">{siteConfig.googleReviewsCount}</span>
      </ContactCard>
    </div>
  );
}
