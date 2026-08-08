import Link from "next/link";

import { cn } from "@/lib/cn";

type HeroButtonProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function HeroButton({
  href,
  label,
  variant = "primary",
  className,
}: HeroButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-w-[11rem] items-center justify-center rounded-sm px-7 py-3.5 font-body text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 sm:min-w-[12rem] sm:text-sm",
        variant === "primary" &&
          "bg-[#C9A24A] text-[#0F1720] hover:bg-[#d9b563] hover:shadow-[0_8px_28px_rgba(201,162,74,0.45)]",
        variant === "secondary" &&
          "border border-[#C9A24A]/70 bg-transparent text-[#F8F8F5] hover:border-[#C9A24A] hover:bg-[#C9A24A]/10",
        className,
      )}
    >
      {label}
    </Link>
  );
}
