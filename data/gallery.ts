import type { GalleryContent } from "@/types/gallery";

export const galleryContent: GalleryContent = {
  eyebrow: "GALLERY",
  heading: "Discover Bala's Spring View",
  subtitle:
    "Explore our beautiful rooms, mountain views and memorable moments through our gallery.",
  filters: [
    { key: "all", label: "All" },
    { key: "rooms", label: "Rooms" },
    { key: "exterior", label: "Exterior" },
    { key: "views", label: "Views" },
    { key: "facilities", label: "Facilities" },
  ],
  images: [
    {
      id: "gallery1",
      src: "/images/gallery/gallery1.jpg",
      alt: "Bala's Spring View — hotel exterior",
      category: "exterior",
      aspect: "landscape",
    },
    {
      id: "gallery2",
      src: "/images/gallery/gallery2.jpg",
      alt: "Bala's Spring View — deluxe bedroom",
      category: "rooms",
      aspect: "tall",
    },
    {
      id: "gallery3",
      src: "/images/gallery/gallery3.jpg",
      alt: "Bala's Spring View — mountain backdrop",
      category: "views",
      aspect: "portrait",
    },
    {
      id: "gallery4",
      src: "/images/gallery/gallery4.jpg",
      alt: "Bala's Spring View — family suite bedroom",
      category: "rooms",
      aspect: "square",
    },
    {
      id: "gallery5",
      src: "/images/gallery/gallery5.jpg",
      alt: "Bala's Spring View — reception area",
      category: "facilities",
      aspect: "landscape",
    },
    {
      id: "gallery6",
      src: "/images/gallery/gallery6.jpg",
      alt: "Bala's Spring View — parking area",
      category: "facilities",
      aspect: "square",
    },
    {
      id: "gallery7",
      src: "/images/gallery/gallery7.jpg",
      alt: "Bala's Spring View — premium bedroom",
      category: "rooms",
      aspect: "tall",
    },
    {
      id: "gallery8",
      src: "/images/gallery/gallery8.jpg",
      alt: "Bala's Spring View — lobby",
      category: "facilities",
      aspect: "portrait",
    },
    {
      id: "gallery9",
      src: "/images/gallery/gallery9.jpg",
      alt: "Bala's Spring View — outdoor terrace view",
      category: "views",
      aspect: "landscape",
    },
  ],
  viewAllCta: {
    label: "View Full Gallery",
    href: "/gallery",
  },
};
