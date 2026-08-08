import Link from "next/link";

import { cn } from "@/lib/cn";

type BookNowButtonProps = {
  className?: string;
  onClick?: () => void;
};

export default function BookNowButton({
  className,
  onClick,
}: BookNowButtonProps) {
  return (
    <Link
      href="/book-now"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-sm bg-[#C9A24A] px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.2em] text-[#0F1720] transition-all duration-300 hover:bg-[#d9b563] hover:shadow-[0_4px_20px_rgba(201,162,74,0.4)]",
        className,
      )}
    >
      Book Now
    </Link>
  );
}
