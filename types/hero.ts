export type HeroSlideTint = "warm" | "night" | null;

export type HeroContent = {
  eyebrow: string;
  title: string;
  brandLine: string;
  tagline: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  backgroundImage: string;
  images: {
    src: string;
    alt: string;
    tint?: HeroSlideTint;
  }[];
};
