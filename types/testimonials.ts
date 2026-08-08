export type Testimonial = {
  id: string;
  name: string;
  location: string;
  review: string;
  stayDuration: string;
  initials: string;
};

export type TestimonialsContent = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  testimonials: Testimonial[];
  googleRating: {
    value: string;
    label: string;
    cta: {
      label: string;
      href: string;
    };
  };
};
