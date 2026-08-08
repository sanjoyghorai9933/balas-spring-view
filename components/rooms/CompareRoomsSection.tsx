"use client";

import { motion, type Variants } from "framer-motion";

import CompareRoomsTable from "@/components/rooms/CompareRoomsTable";
import { roomsPageContent } from "@/data/rooms-page";
import { roomsContent } from "@/data/rooms";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CompareRoomsSection() {
  const { compare } = roomsPageContent;

  return (
    <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl">
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
            {compare.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl"
          >
            {compare.heading}
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
            {compare.subtitle}
          </motion.p>
        </motion.div>

        <div className="mt-14 lg:mt-16">
          <CompareRoomsTable rooms={roomsContent.rooms} rows={compare.rows} />
        </div>
      </div>
    </section>
  );
}
