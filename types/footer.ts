export type FooterLink = {
  label: string;
  href: string;
};

export type FooterContent = {
  description: string;
  quickLinks: FooterLink[];
  legalLinks: FooterLink[];
  newsletter: {
    heading: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
    privacyNote: string;
  };
  bottomBar: {
    copyright: string;
    tagline: string;
  };
};
