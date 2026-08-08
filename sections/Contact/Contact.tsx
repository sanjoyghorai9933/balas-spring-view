"use client";

import { motion, type Variants } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone, Star } from "lucide-react";

import BookingForm from "@/components/contact/BookingForm";
import ContactCard from "@/components/contact/ContactCard";
import GoogleMap from "@/components/contact/GoogleMap";
import { contactContent } from "@/data/contact";
import { siteConfig } from "@/data/site";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0E141B] px-6 py-28 sm:px-10">
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
            {contactContent.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl md:text-[2.75rem]"
          >
            {contactContent.heading}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="mx-auto my-7 h-px w-20 bg-[#C9A24A]/70"
          />

          <motion.p
            variants={fadeUp}
            className="font-body text-sm font-light leading-relaxed text-[#B9B9B9] sm:text-base"
          >
            {contactContent.subtitle}
          </motion.p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-20 lg:grid-cols-[45%_55%] lg:gap-20">
          {/* LEFT — contact info cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="space-y-5"
          >
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

            <ContactCard icon={Clock} title="Check In / Check Out">
              <span className="block">Check In: {siteConfig.checkIn}</span>
              <span className="block">Check Out: {siteConfig.checkOut}</span>
            </ContactCard>

            <ContactCard icon={Star} title="Google Rating">
              <span className="flex items-center gap-1 text-[#C9A24A]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-[#C9A24A] text-[#C9A24A]" />
                ))}
                <span className="ml-1 font-body text-sm text-[#F8F8F5]">
                  {siteConfig.googleRating} / 5
                </span>
              </span>
              <span className="mt-1 block">{siteConfig.googleReviewsCount}</span>
            </ContactCard>
          </motion.div>

          {/* RIGHT — booking form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-[#C9A24A]/25 bg-[#111827]/70 p-7 shadow-[0_35px_90px_-30px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-10"
          >
            <BookingForm footnote={contactContent.bookingFootnote} />
          </motion.div>
        </div>

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 lg:mt-28"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="font-display text-2xl font-light text-[#F8F8F5] sm:text-3xl">
              {contactContent.map.title}
            </h3>
            <p className="mt-3 font-body text-sm font-light leading-relaxed text-[#B9B9B9] sm:text-base">
              {contactContent.map.subtitle}
            </p>
          </div>

          <div className="mt-10">
            <GoogleMap
              embedSrc={contactContent.map.embedSrc}
              title={contactContent.map.title}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
