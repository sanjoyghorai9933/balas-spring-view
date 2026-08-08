import { siteConfig } from "@/data/site";

import WhatsAppIcon from "@/components/layout/WhatsAppIcon";

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bala's Spring View on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1118] sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon size={30} />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
