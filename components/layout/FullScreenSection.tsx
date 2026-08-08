import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type FullScreenSectionProps = {
  children: ReactNode;
  className?: string;
};

export default function FullScreenSection({
  children,
  className,
}: FullScreenSectionProps) {
  return (
    <section
      className={cn(
        "flex min-h-screen items-center justify-center bg-luxury-bg px-6 py-16 sm:px-10",
        className,
      )}
    >
      {children}
    </section>
  );
}
