import type { TestimonialsContent } from "@/types/testimonials";

export const testimonialsContent: TestimonialsContent = {
  eyebrow: "TESTIMONIALS",
  heading: "What Our Guests Say",
  subtitle: "Hear from guests who enjoyed their stay at Bala's Spring View.",
  testimonials: [
    {
      id: "rahul-sharma",
      name: "Rahul Sharma",
      location: "Delhi",
      review:
        "A beautiful property with breathtaking valley views. Rooms were clean, staff was extremely polite and the stay was unforgettable.",
      stayDuration: "2 Nights Stay",
      initials: "RS",
    },
    {
      id: "priya-verma",
      name: "Priya Verma",
      location: "Noida",
      review:
        "The mountain view from our balcony was amazing. Everything was neat and the hospitality exceeded expectations.",
      stayDuration: "3 Nights Stay",
      initials: "PV",
    },
    {
      id: "ankit-singh",
      name: "Ankit Singh",
      location: "Lucknow",
      review:
        "Perfect family stay. Spacious rooms, peaceful surroundings and delicious food.",
      stayDuration: "4 Nights Stay",
      initials: "AS",
    },
    {
      id: "sneha-kapoor",
      name: "Sneha Kapoor",
      location: "Chandigarh",
      review:
        "Very clean rooms and wonderful hospitality. Definitely visiting again.",
      stayDuration: "2 Nights Stay",
      initials: "SK",
    },
    {
      id: "mohit-jain",
      name: "Mohit Jain",
      location: "Jaipur",
      review: "Best hotel experience in Mussoorie for this budget.",
      stayDuration: "1 Night Stay",
      initials: "MJ",
    },
    {
      id: "neha-gupta",
      name: "Neha Gupta",
      location: "Dehradun",
      review: "Excellent location with modern rooms and friendly staff.",
      stayDuration: "2 Nights Stay",
      initials: "NG",
    },
  ],
  googleRating: {
    value: "4.9",
    label: "Based on 150+ Happy Guests",
    cta: {
      label: "Read Google Reviews",
      href: "https://www.google.com/maps/search/?api=1&query=Bala%27s+Spring+View+Mussoorie+reviews",
    },
  },
};
