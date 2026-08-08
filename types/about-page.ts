import type { LucideIcon } from "lucide-react";

export type WhyChooseUsItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type JourneyMilestone = {
  year: string;
  title: string;
  description: string;
};

export type GalleryStripImage = {
  src: string;
  alt: string;
};

export type AboutPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  story: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    image: { src: string; alt: string };
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  whyChooseUs: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: WhyChooseUsItem[];
  };
  journey: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    milestones: JourneyMilestone[];
  };
  galleryStrip: {
    eyebrow: string;
    heading: string;
    images: GalleryStripImage[];
  };
  cta: {
    heading: string;
    subtitle: string;
    buttonLabel: string;
    href: string;
  };
};
