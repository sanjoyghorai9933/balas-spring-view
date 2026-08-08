"use client";

import { motion, type Variants } from "framer-motion";

import Breadcrumb, { type BreadcrumbItem } from "@/components/layout/Breadcrumb";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  breadcrumbItems: BreadcrumbItem[];
  backgroundImage?: string;
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbItems,
  backgroundImage = "/images/hero/hero-bg.jpg",
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[48vh] items-center overflow-hidden bg-[#0F1720] pt-28 pb-16 sm:min-h-[52vh] sm:pt-32 lg:pt-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#0F1720]/95 via-[#0F1720]/80 to-[#0F1720]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <Breadcrumb items={breadcrumbItems} className="mb-6 flex justify-center" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-light leading-tight text-[#F8F8F5] sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mt-5 font-body text-sm font-light leading-relaxed text-[#F8F8F5]/65 sm:text-base"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
