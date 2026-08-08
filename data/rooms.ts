import type { RoomsContent } from "@/types/rooms";

export const roomsContent: RoomsContent = {
  eyebrow: "OUR ROOMS",
  heading: "Luxury Accommodation for Every Traveller",
  subtitle:
    "Choose from our thoughtfully designed rooms, each offering modern comfort, elegant interiors and beautiful mountain surroundings.",
  rooms: [
    {
      id: "deluxe-room",
      slug: "deluxe-room",
      category: "Deluxe Room",
      title: "Deluxe Room",
      subtitle: "Warm comfort with a view",
      description:
        "A refined retreat with warm wood interiors, plush bedding and large windows framing the valley.",
      longDescription:
        "The Deluxe Room pairs warm wood interiors with plush, hotel-grade bedding and large windows that frame the surrounding valley. Thoughtfully laid out for comfort, it's an easy, restful base for exploring Mussoorie — with modern conveniences tucked in throughout so nothing feels like it's missing from home.",
      image: {
        src: "/images/rooms/room1.jpeg",
        alt: "Deluxe Room at Bala's Spring View",
      },
      heroImage: {
        src: "/images/rooms/room1.jpeg",
        alt: "Deluxe Room at Bala's Spring View — wide view",
      },
      galleryImages: [
        { src: "/images/rooms/room1.jpeg", alt: "Deluxe Room bed and window view" },
        { src: "/images/rooms/bedroom4.jpeg", alt: "Deluxe Room seating area" },
        { src: "/images/rooms/bathroom1.jpeg", alt: "Deluxe Room bathroom" },
        { src: "/images/rooms/bedroom10.jpeg", alt: "Deluxe Room additional view" },
      ],
      size: "220 sq ft",
      occupancy: "2 Guests",
      bedType: "1 King Bed",
      amenities: ["Free WiFi", "Mountain View", "Smart TV", "24×7 Hot Water", "Room Service"],
      priceFrom: 2999,
      href: "/rooms/deluxe-room",
    },
    {
      id: "premium-deluxe-room",
      slug: "premium-deluxe-room",
      category: "Premium Deluxe Room",
      title: "Premium Deluxe Room",
      subtitle: "More space, more comfort",
      description:
        "A more spacious suite with premium furnishings and a private sit-out, ideal for a relaxed mountain escape.",
      longDescription:
        "Designed for a slower, more relaxed stay, the Premium Deluxe Room offers extra space, premium furnishings and a private sit-out where the hills feel just a step away. It's an ideal choice for travellers who want a little more room to unwind between days out exploring Mussoorie.",
      image: {
        src: "/images/rooms/room2.jpeg",
        alt: "Premium Deluxe Room at Bala's Spring View",
      },
      heroImage: {
        src: "/images/rooms/room2.jpeg",
        alt: "Premium Deluxe Room at Bala's Spring View — wide view",
      },
      galleryImages: [
        { src: "/images/rooms/room2.jpeg", alt: "Premium Deluxe Room bed and interiors" },
        { src: "/images/rooms/bedroom6.jpeg", alt: "Premium Deluxe Room bedroom" },
        { src: "/images/rooms/bathroom2.jpeg", alt: "Premium Deluxe Room bathroom" },
        { src: "/images/rooms/room10.jpeg", alt: "Premium Deluxe Room balcony access" },
      ],
      size: "280 sq ft",
      occupancy: "2–3 Guests",
      bedType: "1 King Bed + Sofa Bed",
      amenities: [
        "Free WiFi",
        "Mountain View",
        "Private Sit-out",
        "Smart TV",
        "Room Service",
      ],
      priceFrom: 3999,
      href: "/rooms/premium-deluxe-room",
    },
    {
      id: "family-suite",
      slug: "family-suite",
      category: "Family Suite",
      title: "Family Suite",
      subtitle: "Room for the whole family",
      description:
        "Generous living space designed for families, with extra bedding options and panoramic hill views.",
      longDescription:
        "Built with families in mind, the Family Suite offers generous living space, flexible extra-bedding options and panoramic hill views. Whether you're travelling with kids, parents or the whole group, there's enough room to spread out and still feel comfortably together.",
      image: {
        src: "/images/rooms/room3.jpeg",
        alt: "Family Suite at Bala's Spring View",
      },
      heroImage: {
        src: "/images/rooms/room3.jpeg",
        alt: "Family Suite at Bala's Spring View — wide view",
      },
      galleryImages: [
        { src: "/images/rooms/room3.jpeg", alt: "Family Suite bed and interiors" },
        { src: "/images/rooms/bedroom9.jpeg", alt: "Family Suite bedroom area" },
        { src: "/images/rooms/bedroom11.jpeg", alt: "Family Suite additional bedding area" },
        { src: "/images/amenities/bathroom.jpeg", alt: "Family Suite bathroom" },
      ],
      size: "380 sq ft",
      occupancy: "4–5 Guests",
      bedType: "2 Queen Beds",
      amenities: [
        "Free WiFi",
        "Mountain View",
        "Private Sit-out",
        "Extra Bedding",
        "Family Friendly",
      ],
      priceFrom: 5499,
      href: "/rooms/family-suite",
    },
  ],
  viewAllCta: {
    label: "View All Rooms",
    href: "/rooms",
  },
};
