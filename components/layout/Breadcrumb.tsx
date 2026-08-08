import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 font-body text-xs uppercase tracking-[0.15em]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-[#F8F8F5]/55 transition-colors duration-300 hover:text-[#C9A24A]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-[#C9A24A]" : "text-[#F8F8F5]/55"}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  size={12}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-[#F8F8F5]/30"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
