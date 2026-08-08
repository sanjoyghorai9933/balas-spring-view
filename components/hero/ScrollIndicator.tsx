"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

type ScrollIndicatorProps = {
  targetId?: string;
};

export default function ScrollIndicator({
  targetId = "#about",
}: ScrollIndicatorProps) {
  return (
    <motion.a
      href={targetId}
      aria-label="Scroll to explore"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[#F8F8F5]/70 transition-colors duration-300 hover:text-[#C9A24A]"
    >
      <span className="font-body text-[10px] uppercase tracking-[0.35em]">
        Scroll
      </span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={20} strokeWidth={1.5} />
      </motion.span>
    </motion.a>
  );
}
