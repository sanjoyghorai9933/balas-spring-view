"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const footerColumnVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type FooterColumnProps = {
  heading?: string;
  children: ReactNode;
  className?: string;
};

export default function FooterColumn({
  heading,
  children,
  className,
}: FooterColumnProps) {
  return (
    <motion.div variants={footerColumnVariants} className={className}>
      {heading && (
        <h3 className="font-display text-sm font-medium uppercase tracking-[0.25em] text-[#C9A24A]">
          {heading}
        </h3>
      )}
      <div className={heading ? "mt-6" : undefined}>{children}</div>
    </motion.div>
  );
}
