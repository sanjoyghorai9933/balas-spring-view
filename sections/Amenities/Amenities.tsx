"use client";

import { motion, type Variants } from "framer-motion";

import AmenityCard from "@/components/amenities/AmenityCard";
import { amenitiesContent } from "@/data/amenities";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Amenities() {
  return (
    <section
      id="amenities"
      className="bg-[#F8F6F2] px-6 py-24 sm:px-10 sm:py-32 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={headerVariants}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A]">
              {amenitiesContent.eyebrow}
            </p>
            <h2 className="mt-5 font-display text-3xl font-light leading-tight text-[#0F1720] sm:text-4xl md:text-[2.75rem]">
              {amenitiesContent.title}
            </h2>
            <div
              aria-hidden="true"
              className="mx-auto my-7 h-px w-20 bg-[#C9A24A]"
            />
            <p className="font-body text-sm font-light leading-relaxed text-[#0F1720]/60 sm:text-base">
              {amenitiesContent.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-4 lg:gap-6"
          >
            {amenitiesContent.amenities.map((amenity) => (
              <AmenityCard key={amenity.title} {...amenity} />
            ))}
          </motion.div>

          <motion.div
            variants={headerVariants}
            className="mt-16 flex justify-center lg:mt-20"
          >
            <a
              href={amenitiesContent.cta.href}
              className="group inline-flex items-center gap-2 rounded-sm bg-[#C9A24A] px-9 py-4 font-body text-xs font-medium uppercase tracking-[0.25em] text-[#0F1720] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d9b563] hover:shadow-[0_15px_40px_-10px_rgba(201,162,74,0.5)] sm:text-sm"
            >
              {amenitiesContent.cta.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
