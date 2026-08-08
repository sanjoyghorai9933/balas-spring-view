import Link from "next/link";

import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
};

export default function NavLink({
  href,
  label,
  className,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative font-body text-[13px] font-light uppercase tracking-[0.18em] text-[#F8F8F5]/85 transition-colors duration-300 hover:text-[#C9A24A]",
        "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C9A24A] after:transition-all after:duration-300 hover:after:w-full",
        className,
      )}
    >
      {label}
    </Link>
  );
}
