export type RoomImage = {
  src: string;
  alt: string;
};

export type Room = {
  id: string;
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: RoomImage;
  heroImage: RoomImage;
  galleryImages: RoomImage[];
  size: string;
  occupancy: string;
  bedType: string;
  amenities: string[];
  priceFrom: number;
  href: string;
};

export type RoomsContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  rooms: Room[];
  viewAllCta: {
    label: string;
    href: string;
  };
};
