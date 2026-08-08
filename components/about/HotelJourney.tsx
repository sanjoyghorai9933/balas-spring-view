"use client";

import { motion, type Variants } from "framer-motion";

import { aboutPageContent } from "@/data/about-page";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HotelJourney() {
  const { journey } = aboutPageContent;

  return (
    <section className="bg-[#0E141B] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-5xl">
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
            {journey.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#F8F8F5] sm:text-4xl"
          >
            {journey.heading}
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
            {journey.subtitle}
          </motion.p>
        </motion.div>

        <div className="relative mt-16 lg:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-2 bottom-2 w-px bg-[#C9A24A]/25 sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="space-y-12">
            {journey.milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={itemVariants}
                  className={`relative flex items-start gap-6 pl-10 sm:pl-0 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A24A]/50 bg-[#0E141B] sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C9A24A]" />
                  </div>

                  <div className="hidden flex-1 sm:block" />

                  <div
                    className={`flex-1 rounded-2xl border border-[#C9A24A]/20 bg-[#111827]/60 p-6 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)] sm:p-7 ${
                      isEven ? "sm:text-right" : "sm:text-left"
                    }`}
                  >
                    <span className="font-display text-2xl font-light text-[#C9A24A]">
                      {milestone.year}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-medium text-[#F8F8F5] sm:text-xl">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 font-body text-sm font-light leading-relaxed text-[#F8F8F5]/60">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
