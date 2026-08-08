"use client";

import { motion, type Variants } from "framer-motion";

import { roomsPageContent } from "@/data/rooms-page";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function IncludedAmenities() {
  const { includedAmenities } = roomsPageContent;

  return (
    <section className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]"
          >
            {includedAmenities.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl"
          >
            {includedAmenities.heading}
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
            {includedAmenities.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6"
        >
          {includedAmenities.items.map(({ label, icon: Icon }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex flex-col items-center gap-3 rounded-2xl border border-[#0F1720]/8 bg-white/70 px-4 py-7 text-center shadow-[0_15px_40px_-20px_rgba(15,23,32,0.2)]"
            >
              <div className="inline-flex rounded-full border border-[#C9A24A]/25 bg-[#C9A24A]/10 p-3">
                <Icon size={20} strokeWidth={1.5} className="text-[#C9A24A]" />
              </div>
              <span className="font-body text-xs font-medium leading-snug text-[#0F1720]/75">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
