import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

/**
 * Builds consistent per-page metadata (title, description, OpenGraph, Twitter)
 * sharing the same brand voice across every route. Image paths are relative
 * and resolve against `metadataBase` set in the root layout.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/images/hero/hero-bg.jpg",
}: BuildMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.brand}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.brand,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
