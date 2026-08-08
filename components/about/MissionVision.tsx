"use client";

import { motion, type Variants } from "framer-motion";
import { Compass, Target } from "lucide-react";

import { aboutPageContent } from "@/data/about-page";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MissionVision() {
  const { mission, vision } = aboutPageContent;

  const cards = [
    { ...mission, icon: Target },
    { ...vision, icon: Compass },
  ];

  return (
    <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2"
      >
        {cards.map(({ title, description, icon: Icon }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-[28px] border border-[#C9A24A]/25 bg-[#111827]/60 p-9 shadow-[0_25px_65px_-25px_rgba(0,0,0,0.55)] sm:p-11"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A24A]/40 bg-[#C9A24A]/10">
              <Icon size={22} strokeWidth={1.5} className="text-[#C9A24A]" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-light text-[#F8F8F5]">
              {title}
            </h3>
            <p className="mt-4 font-body text-sm font-light leading-relaxed text-[#F8F8F5]/60 sm:text-base">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
