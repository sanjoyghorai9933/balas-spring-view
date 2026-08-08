import type { LucideIcon } from "lucide-react";

export type Amenity = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type AmenitiesContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  amenities: Amenity[];
  cta: {
    label: string;
    href: string;
  };
};
