"use client";

import { motion, type Variants } from "framer-motion";

import AttractionCard from "@/components/attractions/AttractionCard";
import { attractionsContent } from "@/data/attractions";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Attractions() {
  return (
    <section
      id="attractions"
      className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-32 lg:py-36"
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
            {attractionsContent.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl md:text-[2.75rem]"
          >
            {attractionsContent.heading}
          </motion.h2>

          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="mx-auto my-7 h-px w-20 bg-[#C9A24A]"
          />

          <motion.p
            variants={fadeUp}
            className="font-body text-sm font-light leading-relaxed text-[#0F1720]/60 sm:text-base"
          >
            {attractionsContent.subtitle}
          </motion.p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {attractionsContent.attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex justify-center lg:mt-20"
        >
          <a
            href={attractionsContent.cta.href}
            className="inline-flex items-center gap-2 rounded-sm border border-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:bg-[#C9A24A] hover:shadow-[0_10px_30px_rgba(201,162,74,0.35)] sm:text-sm"
          >
            {attractionsContent.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
