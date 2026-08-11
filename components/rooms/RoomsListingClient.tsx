"use client";

import { motion, type Variants } from "framer-motion";

import RoomsGrid from "@/components/rooms/RoomsGrid";
import type { RoomsContent } from "@/types/rooms";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function RoomsListingClient({ content }: { content: RoomsContent }) {
  return (
    <section id="all-rooms" className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={fadeUp} className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]">{content.eyebrow}</motion.p>
          <motion.h2 variants={fadeUp} className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl">{content.heading}</motion.h2>
          <motion.div variants={fadeUp} aria-hidden="true" className="mx-auto my-7 h-px w-20 bg-[#C9A24A]/70" />
          <motion.p variants={fadeUp} className="font-body text-sm font-light leading-relaxed text-[#F8F8F5]/60 sm:text-base">{content.subtitle}</motion.p>
        </motion.div>

        <div className="mt-14 lg:mt-16">
          <RoomsGrid rooms={content.rooms} />
        </div>
      </div>
    </section>
  );
}
