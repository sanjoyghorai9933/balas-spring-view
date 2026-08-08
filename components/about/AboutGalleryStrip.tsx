"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { aboutPageContent } from "@/data/about-page";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AboutGalleryStrip() {
  const { galleryStrip } = aboutPageContent;

  return (
    <section className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
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
            {galleryStrip.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl"
          >
            {galleryStrip.heading}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-16 lg:grid-cols-6 lg:gap-5"
        >
          {galleryStrip.images.map((image) => (
            <motion.div
              key={image.src}
              variants={tileVariants}
              whileHover={{ scale: 1.04 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(15,23,32,0.3)]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 45vw, 16vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex justify-center lg:mt-14"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-sm border border-[#C9A24A] px-8 py-3.5 font-body text-xs font-medium uppercase tracking-[0.22em] text-[#0F1720] transition-all duration-300 hover:bg-[#C9A24A] hover:shadow-[0_10px_30px_rgba(201,162,74,0.35)] sm:text-sm"
          >
            View Full Gallery
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
