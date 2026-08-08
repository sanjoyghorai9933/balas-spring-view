import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://balasvistahills.com";
const SITE_DESCRIPTION =
  "Bala's Spring View by Vista Hills — a premium hillside retreat in Mussoorie, Uttarakhand, with comfortable rooms, scenic views, and a peaceful stay.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0B0F14",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.brand,
    template: `%s | ${siteConfig.brand}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Bala's Spring View",
    "Vista Hills",
    "Mussoorie hotel",
    "Mussoorie stay",
    "hotel in Mussoorie",
    "Mussoorie Uttarakhand",
    "hillside retreat Mussoorie",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.brand,
    description: SITE_DESCRIPTION,
    siteName: siteConfig.brand,
    url: SITE_URL,
    images: [{ url: "/images/hero/hero-bg.jpg", width: 1200, height: 630, alt: siteConfig.brand }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.brand,
    description: SITE_DESCRIPTION,
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
