import {
  Car,
  Cctv,
  Droplets,
  Mountain,
  Tv,
  Users,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";

import type { AmenitiesContent } from "@/types/amenities";

export const amenitiesContent: AmenitiesContent = {
  eyebrow: "LUXURY AMENITIES",
  title: "Everything You Need for a Comfortable Stay",
  subtitle:
    "Enjoy modern comforts, warm hospitality and beautiful mountain surroundings at Bala's Spring View.",
  amenities: [
    {
      title: "Free High-Speed WiFi",
      description: "Stay connected with complimentary high-speed internet throughout the property.",
      icon: Wifi,
    },
    {
      title: "Free Parking",
      description: "Secure, complimentary parking for a seamless arrival experience.",
      icon: Car,
    },
    {
      title: "Mountain View Rooms",
      description: "Wake up to breathtaking panoramic vistas of the Mussoorie hills.",
      icon: Mountain,
    },
    {
      title: "Family Friendly",
      description: "A warm, welcoming atmosphere perfect for families and group getaways.",
      icon: Users,
    },
    {
      title: "24×7 Hot Water",
      description: "Reliable hot water supply available around the clock, every day.",
      icon: Droplets,
    },
    {
      title: "Room Service",
      description: "Thoughtful in-room service delivered with premium hospitality.",
      icon: UtensilsCrossed,
    },
    {
      title: "Smart TV",
      description: "Modern in-room entertainment for relaxed evenings indoors.",
      icon: Tv,
    },
    {
      title: "CCTV Security",
      description: "Round-the-clock surveillance for your safety and peace of mind.",
      icon: Cctv,
    },
  ],
  cta: {
    label: "Book Your Stay",
    href: "/book-now",
  },
};
