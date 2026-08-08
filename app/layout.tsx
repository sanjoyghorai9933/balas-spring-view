import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import FloatingWhatsAppButton from "@/components/layout/FloatingWhatsAppButton";
import { siteConfig } from "@/data/site";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// TODO: replace with the real production domain once available.
const SITE_URL = "https://balasspringview.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.brand,
    template: `%s | ${siteConfig.brand}`,
  },
  description:
    "A premium luxury retreat nestled in the hills — Bala's Spring View by Vista Hills.",
  openGraph: {
    title: siteConfig.brand,
    description:
      "A premium luxury retreat nestled in the hills — Bala's Spring View by Vista Hills.",
    siteName: siteConfig.brand,
    images: [{ url: "/images/hero/hero-bg.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brand,
    description:
      "A premium luxury retreat nestled in the hills — Bala's Spring View by Vista Hills.",
    images: ["/images/hero/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
