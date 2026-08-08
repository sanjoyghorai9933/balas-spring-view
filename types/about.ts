export type AboutStat = {
  icon: string;
  value: string;
  label: string;
};

export type AboutImage = {
  src: string;
  alt: string;
};

export type AboutContent = {
  heading: string;
  subtitle: string;
  paragraphs: string[];
  since: string;
  images: {
    exterior: AboutImage;
    bedroom: AboutImage;
    balcony: AboutImage;
  };
  stats: AboutStat[];
  cta: {
    label: string;
    href: string;
  };
};
