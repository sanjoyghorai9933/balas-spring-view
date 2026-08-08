"use client";

import { motion, type Variants } from "framer-motion";

import { aboutPageContent } from "@/data/about-page";

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyChooseUs() {
  const { whyChooseUs } = aboutPageContent;

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
            {whyChooseUs.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl"
          >
            {whyChooseUs.heading}
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
            {whyChooseUs.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-3"
        >
          {whyChooseUs.items.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-[#0F1720]/8 bg-white/70 p-6 shadow-[0_15px_45px_-20px_rgba(15,23,32,0.2)] transition-all duration-300 hover:border-[#C9A24A]/50 hover:bg-white hover:shadow-[0_25px_55px_-20px_rgba(201,162,74,0.3)] sm:p-7"
            >
              <div className="inline-flex rounded-lg border border-[#C9A24A]/25 bg-[#C9A24A]/10 p-3">
                <Icon size={22} strokeWidth={1.5} className="text-[#C9A24A]" />
              </div>
              <h3 className="mt-5 font-display text-lg font-medium text-[#0F1720] sm:text-xl">
                {title}
              </h3>
              <p className="mt-2.5 font-body text-sm leading-relaxed text-[#0F1720]/60">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
