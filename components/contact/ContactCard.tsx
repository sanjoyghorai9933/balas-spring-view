"use client";

import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export const contactCardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type ContactCardCta = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "default" | "whatsapp";
};

type ContactCardProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  cta?: ContactCardCta;
};

export default function ContactCard({
  icon: Icon,
  title,
  children,
  cta,
}: ContactCardProps) {
  return (
    <motion.div
      variants={contactCardVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-[#C9A24A]/25 bg-[#111827]/60 p-6 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-[#C9A24A]/60 hover:shadow-[0_25px_60px_-20px_rgba(201,162,74,0.25)] sm:p-7"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A24A]/30 bg-[#C9A24A]/10">
          <Icon size={19} strokeWidth={1.5} className="text-[#C9A24A]" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-medium text-[#F8F8F5] sm:text-lg">
            {title}
          </h3>
          <div className="mt-2 font-body text-sm font-light leading-relaxed text-[#B9B9B9]">
            {children}
          </div>

          {cta && (
            <a
              href={cta.href}
              target={cta.external ? "_blank" : undefined}
              rel={cta.external ? "noopener noreferrer" : undefined}
              className={cn(
                "mt-4 inline-flex items-center justify-center rounded-sm px-5 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5",
                cta.variant === "whatsapp"
                  ? "bg-[#25D366] text-[#0E141B] hover:bg-[#2fe077] hover:shadow-[0_10px_25px_rgba(37,211,102,0.35)]"
                  : "bg-[#C9A24A] text-[#0E141B] hover:bg-[#d9b563] hover:shadow-[0_10px_25px_rgba(201,162,74,0.35)]",
              )}
            >
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
