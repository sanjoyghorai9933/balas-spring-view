import type { AboutContent } from "@/types/about";

export const aboutContent: AboutContent = {
  heading: "About Bala's Spring View",
  subtitle: "Experience peaceful mountain hospitality in Mussoorie.",
  paragraphs: [
    "Every room at Bala's Spring View is thoughtfully designed for comfort — premium furnishings, warm wood finishes and modern amenities create a refined space to relax after a day exploring the hills.",
    "Set high in the hills of Mussoorie, our windows and balconies open onto sweeping valley and mountain views, framing a different shade of the landscape with every season.",
    "Beyond the setting, it's our hospitality that guests remember most — a family-friendly atmosphere, warm and attentive service, and small thoughtful touches that make every stay feel personal.",
  ],
  since: "Since 2024",
  images: {
    exterior: {
      src: "/images/about/exterior.jpg",
      alt: "Bala's Spring View — hotel exterior in the hills of Mussoorie",
    },
    bedroom: {
      src: "/images/about/bedroom.jpg",
      alt: "Bala's Spring View — premium bedroom interior",
    },
    balcony: {
      src: "/images/about/balcony.jpg",
      alt: "Bala's Spring View — balcony with mountain view",
    },
  },
  stats: [
    { icon: "⭐", value: "4.9", label: "Rating" },
    { icon: "👨‍👩‍👧", value: "1500+", label: "Guests" },
    { icon: "🛏", value: "Premium", label: "Rooms" },
    { icon: "📍", value: "Mussoorie", label: "Location" },
  ],
  cta: {
    label: "Discover More",
    href: "/rooms",
  },
};
