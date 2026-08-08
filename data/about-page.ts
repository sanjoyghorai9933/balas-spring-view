import { Heart, MapPin, Mountain, Sparkles, Users, Wallet } from "lucide-react";

import type { AboutPageContent } from "@/types/about-page";

export const aboutPageContent: AboutPageContent = {
  hero: {
    eyebrow: "ABOUT US",
    title: "Our Story of Mountain Hospitality",
    subtitle:
      "Get to know the retreat behind the valley views — our story, our values and what makes a stay with us feel like home.",
  },
  story: {
    eyebrow: "OUR STORY",
    heading: "A Retreat Built on Mountain Hospitality",
    paragraphs: [
      "Bala's Spring View by Vista Hills began with a simple idea — to share the quiet beauty of Mussoorie's hills with travellers seeking rest, warmth and an honest welcome.",
      "Since opening in 2024, we've grown into a boutique mountain retreat known for comfortable rooms, attentive service and a setting that changes color with every season.",
      "Every detail, from warm wood interiors to home-style hospitality, is shaped by one goal: making every guest feel like they've arrived somewhere personal, not just another hotel.",
    ],
    image: {
      src: "/images/about/exterior.jpg",
      alt: "Bala's Spring View exterior in the hills of Mussoorie",
    },
  },
  mission: {
    title: "Our Mission",
    description:
      "To offer genuine mountain hospitality through comfortable stays, attentive service and thoughtful details — making every guest's time in Mussoorie feel effortless and personal.",
  },
  vision: {
    title: "Our Vision",
    description:
      "To become Mussoorie's most loved boutique retreat — a place travellers return to, and recommend, for its warmth, comfort and breathtaking valley views.",
  },
  whyChooseUs: {
    eyebrow: "WHY CHOOSE US",
    heading: "What Sets Our Stay Apart",
    subtitle:
      "A few reasons our guests keep coming back to Bala's Spring View.",
    items: [
      {
        icon: MapPin,
        title: "Prime Mountain Location",
        description: "Perched in the hills of Mussoorie, close to Mall Road and Kempty Falls.",
      },
      {
        icon: Heart,
        title: "Personalized Hospitality",
        description: "Warm, attentive service that treats every guest like family.",
      },
      {
        icon: Sparkles,
        title: "Premium Comfort",
        description: "Thoughtfully furnished rooms with modern amenities throughout.",
      },
      {
        icon: Users,
        title: "Family Friendly",
        description: "Spacious rooms and a welcoming atmosphere for groups and families.",
      },
      {
        icon: Mountain,
        title: "Breathtaking Views",
        description: "Valley and mountain views from many of our rooms and balconies.",
      },
      {
        icon: Wallet,
        title: "Genuine Value",
        description: "Luxury comfort and hospitality at honest, fair pricing.",
      },
    ],
  },
  journey: {
    eyebrow: "OUR JOURNEY",
    heading: "The Bala's Spring View Story So Far",
    subtitle: "A young retreat, growing one happy guest at a time.",
    milestones: [
      {
        year: "2024",
        title: "Bala's Spring View Opens",
        description:
          "Bala's Spring View by Vista Hills welcomes its first guests to the hills of Mussoorie.",
      },
      {
        year: "2025",
        title: "Rooms & Comfort Upgraded",
        description:
          "Rooms refreshed with premium furnishings, modern amenities and warmer interiors.",
      },
      {
        year: "2026",
        title: "150+ Happy Guests & Counting",
        description:
          "A growing community of guests and a 4.9 average rating reflect our commitment to hospitality.",
      },
    ],
  },
  galleryStrip: {
    eyebrow: "A GLIMPSE INSIDE",
    heading: "Life at Bala's Spring View",
    images: [
      { src: "/images/about/exterior.jpg", alt: "Hotel exterior" },
      { src: "/images/gallery/gallery2.jpg", alt: "Deluxe bedroom" },
      { src: "/images/gallery/gallery3.jpg", alt: "Mountain backdrop views" },
      { src: "/images/about/balcony.jpg", alt: "Balcony with mountain view" },
      { src: "/images/gallery/gallery8.jpg", alt: "Hotel lobby" },
      { src: "/images/gallery/gallery6.jpg", alt: "Hotel facilities" },
    ],
  },
  cta: {
    heading: "Ready for Your Mountain Getaway?",
    subtitle: "Come experience the hospitality our guests keep coming back for.",
    buttonLabel: "Book Your Stay",
    href: "/book-now",
  },
};
