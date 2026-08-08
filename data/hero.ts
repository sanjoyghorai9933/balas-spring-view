import type { HeroContent } from "@/types/hero";

export const heroContent: HeroContent = {
  eyebrow: "WELCOME TO",
  title: "Bala's Spring View",
  brandLine: "BY VISTA HILLS",
  tagline: "A Perfect View. A Perfect Stay.",
  description:
    "Experience peaceful mountain hospitality in Mussoorie with luxury rooms, breathtaking valley views and modern comfort.",
  primaryCta: {
    label: "Book Your Stay",
    href: "/book-now",
  },
  secondaryCta: {
    label: "Explore Rooms",
    href: "/rooms",
  },
  backgroundImage: "/images/hero/hero-bg.jpg",
  images: [
    {
      src: "/images/hero/exterior-sunset.jpg",
      alt: "Bala's Spring View — exterior at golden hour",
      tint: "warm",
    },
    {
      src: "/images/hero/deluxe-room.jpg",
      alt: "Bala's Spring View — Deluxe Room",
    },
    {
      src: "/images/hero/family-room.jpg",
      alt: "Bala's Spring View — Family Room",
    },
    {
      src: "/images/hero/balcony-view.jpg",
      alt: "Bala's Spring View — balcony view",
    },
    {
      src: "/images/hero/hotel-front.jpg",
      alt: "Bala's Spring View — hotel front",
    },
    {
      src: "/images/hero/night-exterior.jpg",
      alt: "Bala's Spring View — exterior by night",
      tint: "night",
    },
  ],
};
