import type { LucideIcon } from "lucide-react";

import type { AccordionItem } from "@/components/shared/Accordion";

export type CompareRow = {
  label: string;
  values: (string | boolean)[];
};

export type RoomsPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  includedAmenities: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: { label: string; icon: LucideIcon }[];
  };
  compare: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    rows: CompareRow[];
  };
  faqs: {
    eyebrow: string;
    heading: string;
    items: AccordionItem[];
  };
};
