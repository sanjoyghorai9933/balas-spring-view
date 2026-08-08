"use client";

import { motion } from "framer-motion";

import type { AboutStat } from "@/types/about";

type AboutStatCardProps = AboutStat & {
  index: number;
};

export default function AboutStatCard({
  icon,
  value,
  label,
  index,
}: AboutStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl border border-[#0F1720]/8 bg-white/60 p-5 text-center shadow-[0_10px_40px_-15px_rgba(15,23,32,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A24A]/40 hover:shadow-[0_18px_50px_-15px_rgba(201,162,74,0.25)] sm:p-6"
    >
      <span className="text-2xl sm:text-3xl">{icon}</span>
      <p className="mt-3 font-display text-xl font-medium text-[#0F1720] sm:text-2xl">
        {value}
      </p>
      <p className="mt-1 font-body text-[11px] uppercase tracking-[0.2em] text-[#0F1720]/50">
        {label}
      </p>
    </motion.div>
  );
}
