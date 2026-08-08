export type GalleryFilterKey = "all" | "rooms" | "exterior" | "views" | "facilities" | "night";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: Exclude<GalleryFilterKey, "all">;
  aspect: "portrait" | "tall" | "square" | "landscape";
};

export type GalleryFilter = {
  key: GalleryFilterKey;
  label: string;
};

export type GalleryContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  filters: GalleryFilter[];
  images: GalleryImage[];
  viewAllCta: {
    label: string;
    href: string;
  };
};
