import { Phone } from "lucide-react";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

type PhoneButtonProps = {
  className?: string;
  onClick?: () => void;
  label?: string;
};

export default function PhoneButton({ className, onClick, label }: PhoneButtonProps) {
  return (
    <a
      href={siteConfig.phoneHref}
      onClick={onClick}
      aria-label={`Call ${siteConfig.phone}`}
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-[#F8F8F5]/20 px-4 py-2.5 font-body text-xs font-medium tracking-[0.08em] text-[#F8F8F5] transition-all duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A]",
        className,
      )}
    >
      <Phone size={15} strokeWidth={1.75} />
      <span className="whitespace-nowrap">{label ?? siteConfig.phone}</span>
    </a>
  );
}
