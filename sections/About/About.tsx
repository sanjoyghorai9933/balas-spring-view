"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

import AboutStatCard from "@/components/about/AboutStatCard";
import { aboutContent } from "@/data/about";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[45%_55%] lg:gap-20">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="lg:sticky lg:top-32"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl font-light uppercase leading-tight tracking-[0.03em] text-[#0F1720] sm:text-4xl md:text-[2.75rem]"
            >
              {aboutContent.heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-5 font-display text-lg font-light italic text-[#0F1720]/70 sm:text-xl"
            >
              {aboutContent.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              aria-hidden="true"
              className="my-8 h-px w-20 bg-[#C9A24A]"
            />

            <div className="space-y-5">
              {aboutContent.paragraphs.map((paragraph) => (
                <motion.p
                  key={paragraph.slice(0, 24)}
                  variants={fadeUp}
                  className="font-body text-sm font-light leading-relaxed text-[#0F1720]/65 sm:text-base"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-px w-10 bg-[#C9A24A]/60" />
              <span className="font-body text-xs font-medium uppercase tracking-[0.35em] text-[#C9A24A]">
                {aboutContent.since}
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div>
            {/* Collage */}
            <div className="relative flex flex-col gap-4 lg:block lg:h-[560px] xl:h-[620px]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn(0)}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] shadow-[0_30px_80px_-25px_rgba(15,23,32,0.35)] lg:absolute lg:right-0 lg:top-0 lg:aspect-auto lg:h-[62%] lg:w-[82%]"
              >
                <Image
                  src={aboutContent.images.exterior.src}
                  alt={aboutContent.images.exterior.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-4 lg:contents">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn(0.2)}
                  className="relative z-10 aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_80px_-25px_rgba(15,23,32,0.35)] lg:absolute lg:bottom-0 lg:left-0 lg:aspect-auto lg:h-[48%] lg:w-[50%]"
                >
                  <Image
                    src={aboutContent.images.bedroom.src}
                    alt={aboutContent.images.bedroom.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 24vw"
                    className="object-cover"
                  />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeIn(0.35)}
                  className="relative z-20 aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_80px_-25px_rgba(15,23,32,0.4)] lg:absolute lg:-bottom-5 lg:right-0 lg:aspect-auto lg:h-[42%] lg:w-[46%]"
                >
                  <Image
                    src={aboutContent.images.balcony.src}
                    alt={aboutContent.images.balcony.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 22vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-12">
              {aboutContent.stats.map((stat, index) => (
                <AboutStatCard key={stat.label} index={index} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex justify-center lg:mt-20"
        >
          <a
            href={aboutContent.cta.href}
            className="inline-flex items-center justify-center rounded-sm border border-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:bg-[#C9A24A] hover:shadow-[0_10px_30px_rgba(201,162,74,0.35)] sm:text-sm"
          >
            {aboutContent.cta.label}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
