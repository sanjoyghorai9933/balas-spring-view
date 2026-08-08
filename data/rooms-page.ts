import { Clock, Coffee, Tv, Users, Wifi, Wind } from "lucide-react";

import type { RoomsPageContent } from "@/types/rooms-page";

export const roomsPageContent: RoomsPageContent = {
  hero: {
    eyebrow: "OUR ROOMS",
    title: "Luxury Accommodation for Every Traveller",
    subtitle:
      "Choose from our thoughtfully designed rooms, each offering modern comfort, elegant interiors and beautiful mountain surroundings.",
  },
  includedAmenities: {
    eyebrow: "IN EVERY ROOM",
    heading: "Included With Your Stay",
    subtitle: "Every room at Bala's Spring View comes with these comforts as standard.",
    items: [
      { label: "Free High-Speed WiFi", icon: Wifi },
      { label: "Smart TV", icon: Tv },
      { label: "24×7 Hot Water", icon: Wind },
      { label: "Room Service", icon: Coffee },
      { label: "Flexible Check-in", icon: Clock },
      { label: "Family Friendly", icon: Users },
    ],
  },
  compare: {
    eyebrow: "COMPARE ROOMS",
    heading: "Find Your Perfect Room",
    subtitle: "A quick side-by-side look to help you choose.",
    rows: [
      { label: "Room Size", values: ["220 sq ft", "280 sq ft", "380 sq ft"] },
      { label: "Occupancy", values: ["2 Guests", "2–3 Guests", "4–5 Guests"] },
      { label: "Mountain View", values: [true, true, true] },
      { label: "Balcony", values: [false, true, true] },
      { label: "Breakfast", values: [true, true, true] },
      { label: "WiFi", values: [true, true, true] },
      { label: "Price", values: ["From ₹2,999", "From ₹3,999", "From ₹5,499"] },
    ],
  },
  faqs: {
    eyebrow: "ROOM FAQS",
    heading: "Frequently Asked Questions",
    items: [
      {
        question: "What time is check-in and check-out?",
        answer:
          "Check-in is from 1:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be requested and is subject to availability.",
      },
      {
        question: "Do you provide extra beds for children?",
        answer:
          "Yes, extra beds can be arranged for an additional charge — just let us know the number of guests when booking so we can prepare the right room.",
      },
      {
        question: "Is breakfast included in the room price?",
        answer:
          "Meal inclusions vary by rate plan. Please mention your preference in the booking form or contact us directly to confirm what's included with your rate.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Cancellation terms depend on how far in advance you cancel. Full details are available on our Cancellation Policy page.",
      },
      {
        question: "Do you allow pets?",
        answer:
          "Please get in touch with us directly before booking if you're travelling with a pet, so we can confirm what's possible for your stay.",
      },
    ],
  },
};
