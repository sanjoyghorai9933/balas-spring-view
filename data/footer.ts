import type { FooterContent } from "@/types/footer";

export const footerContent: FooterContent = {
  description:
    "Bala's Spring View by Vista Hills is a premium mountain retreat offering luxury accommodation, breathtaking Himalayan views and unforgettable hospitality.",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Rooms", href: "/rooms" },
    { label: "Amenities", href: "/#amenities" },
    { label: "Gallery", href: "/gallery" },
    { label: "Nearby Attractions", href: "/attractions" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Contact", href: "/contact" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cancellation Policy", href: "/cancellation-policy" },
  ],
  newsletter: {
    heading: "Stay Updated",
    description:
      "Receive special offers, seasonal packages and travel updates.",
    placeholder: "Your email address",
    buttonLabel: "Subscribe",
    privacyNote: "We respect your privacy.",
  },
  bottomBar: {
    copyright: "© 2026 Bala's Spring View by Vista Hills. All Rights Reserved.",
    tagline: "Designed with ❤️ for Mountain Hospitality.",
  },
};
