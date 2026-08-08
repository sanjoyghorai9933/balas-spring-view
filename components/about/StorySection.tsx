"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

import { aboutPageContent } from "@/data/about-page";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StorySection() {
  const { story } = aboutPageContent;

  return (
    <section className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] shadow-[0_30px_80px_-25px_rgba(15,23,32,0.35)] lg:order-2"
        >
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
          className="lg:order-1"
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]"
          >
            {story.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl"
          >
            {story.heading}
          </motion.h2>
          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="my-7 h-px w-20 bg-[#C9A24A]"
          />
          <div className="space-y-5">
            {story.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                variants={fadeUp}
                className="font-body text-sm font-light leading-relaxed text-[#0F1720]/65 sm:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
