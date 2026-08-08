import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

import WhatsAppIcon from "@/components/layout/WhatsAppIcon";

type WhatsAppButtonProps = {
  className?: string;
  onClick?: () => void;
};

export default function WhatsAppButton({ className, onClick }: WhatsAppButtonProps) {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label="Chat on WhatsApp"
      className={cn(
        "inline-flex items-center justify-center rounded-sm border border-[#F8F8F5]/20 p-2.5 text-[#F8F8F5] transition-all duration-300 hover:border-[#25D366] hover:text-[#25D366]",
        className,
      )}
    >
      <WhatsAppIcon size={17} />
    </a>
  );
}
