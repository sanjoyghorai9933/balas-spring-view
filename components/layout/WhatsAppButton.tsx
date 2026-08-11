"use client";

import { useSiteSettings, whatsappHref } from "@/lib/useSiteSettings";
import { cn } from "@/lib/cn";
import WhatsAppIcon from "@/components/layout/WhatsAppIcon";

type WhatsAppButtonProps = { className?: string; onClick?: () => void; message?: string; label?: string; variant?: "icon" | "solid" };

export default function WhatsAppButton({ className, onClick, message, label, variant = "icon" }: WhatsAppButtonProps) {
  const settings = useSiteSettings();
  const baseHref = whatsappHref(settings.whatsapp);
  const href = message ? `${baseHref}?text=${encodeURIComponent(message)}` : baseHref;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} aria-label="Chat on WhatsApp" className={cn(variant === "solid" ? "inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 font-body text-xs font-medium uppercase tracking-[0.15em] text-[#0E141B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#35df74]" : "inline-flex items-center justify-center rounded-sm border border-[#F8F8F5]/20 p-2.5 text-[#F8F8F5] transition-all duration-300 hover:border-[#25D366] hover:text-[#25D366]", className)}>
      <WhatsAppIcon size={variant === "solid" ? 16 : 17} />
      {label && <span>{label}</span>}
    </a>
  );
}
