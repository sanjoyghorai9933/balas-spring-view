"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { aboutPageContent } from "@/data/about-page";

export default function AboutCta() {
  const { cta } = aboutPageContent;

  return (
    <section className="relative overflow-hidden bg-[#0F1720] px-6 py-24 sm:px-10 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#0F1720]/70 via-[#0F1720]/90 to-[#0F1720]"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.14 } },
        }}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl"
        >
          {cta.heading}
        </motion.h2>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="mt-4 font-body text-sm font-light leading-relaxed text-[#F8F8F5]/65 sm:text-base"
        >
          {cta.subtitle}
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="mt-9"
        >
          <Link
            href={cta.href}
            className="inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_45px_-10px_rgba(201,162,74,0.55)] sm:text-sm"
          >
            {cta.buttonLabel}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
