import { Compass, MountainSnow, ShoppingBag, Telescope, Trees, Waves } from "lucide-react";

import type { AttractionsContent } from "@/types/attractions";

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const attractionsContent: AttractionsContent = {
  eyebrow: "NEARBY ATTRACTIONS",
  heading: "Explore the Best of Mussoorie",
  subtitle:
    "Stay close to Mussoorie's most loved destinations while enjoying peaceful mountain hospitality.",
  attractions: [
    {
      id: "kempty-falls",
      name: "Kempty Falls",
      distance: "12 km",
      driveTime: "25 mins",
      bestTimeToVisit: "Morning (8–11 AM) to avoid crowds",
      description:
        "One of the region's most iconic waterfalls, cascading from a height amid the hills — a refreshing escape for a half-day trip.",
      image: {
        src: "/images/attractions/kempty.jpg",
        alt: "Kempty Falls near Mussoorie",
      },
      mapsUrl: mapsSearch("Kempty Falls Mussoorie"),
      icon: Waves,
    },
    {
      id: "mall-road",
      name: "Mall Road",
      distance: "6 km",
      driveTime: "15 mins",
      bestTimeToVisit: "Evening, for a lively atmosphere",
      description:
        "Mussoorie's lively promenade, lined with cafes, local handicrafts and sweeping valley views — perfect for an evening stroll.",
      image: {
        src: "/images/attractions/mall-road.jpg",
        alt: "Mall Road, Mussoorie",
      },
      mapsUrl: mapsSearch("Mall Road Mussoorie"),
      icon: ShoppingBag,
    },
    {
      id: "gun-hill",
      name: "Gun Hill",
      distance: "7 km",
      driveTime: "18 mins",
      bestTimeToVisit: "Sunset, for panoramic views",
      description:
        "The second-highest peak in Mussoorie, reached by cable car, offering panoramic views of the Himalayan range.",
      image: {
        src: "/images/attractions/gun-hill.jpg",
        alt: "Gun Hill, Mussoorie",
      },
      mapsUrl: mapsSearch("Gun Hill Mussoorie"),
      icon: MountainSnow,
    },
    {
      id: "company-garden",
      name: "Company Garden",
      distance: "4 km",
      driveTime: "10 mins",
      bestTimeToVisit: "Late morning to afternoon",
      description:
        "A well-maintained garden with manicured lawns, a small lake and joy rides — a relaxed outing for the whole family.",
      image: {
        src: "/images/attractions/company-garden.jpg",
        alt: "Company Garden, Mussoorie",
      },
      mapsUrl: mapsSearch("Company Garden Mussoorie"),
      icon: Trees,
    },
    {
      id: "lal-tibba",
      name: "Lal Tibba",
      distance: "10 km",
      driveTime: "20 mins",
      bestTimeToVisit: "Early morning, for clear mountain views",
      description:
        "The highest point in Mussoorie, known for telescope views of the snow-capped Himalayan peaks on a clear day.",
      image: {
        src: "/images/attractions/lal-tibba.jpg",
        alt: "Lal Tibba, Mussoorie",
      },
      mapsUrl: mapsSearch("Lal Tibba Mussoorie"),
      icon: Telescope,
    },
    {
      id: "george-everest",
      name: "George Everest Peak",
      distance: "8 km",
      driveTime: "18 mins",
      bestTimeToVisit: "Morning to midday for clearer visibility",
      description:
        "The historic ruins of Sir George Everest's residence, set against a dramatic hillside with sweeping valley views.",
      image: {
        src: "/images/attractions/george-everest.jpg",
        alt: "George Everest Peak, Mussoorie",
      },
      mapsUrl: mapsSearch("George Everest Peak Mussoorie"),
      icon: Compass,
    },
  ],
  cta: {
    label: "Plan Your Trip",
    href: "/contact",
  },
};
