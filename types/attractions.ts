import type { LucideIcon } from "lucide-react";

export type Attraction = {
  id: string;
  name: string;
  distance: string;
  driveTime: string;
  bestTimeToVisit: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  mapsUrl: string;
  icon: LucideIcon;
};

export type AttractionsContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  attractions: Attraction[];
  cta: {
    label: string;
    href: string;
  };
};
