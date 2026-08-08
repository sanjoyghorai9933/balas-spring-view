import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageHero from "@/components/layout/PageHero";
import AboutCta from "@/components/about/AboutCta";
import AboutGalleryStrip from "@/components/about/AboutGalleryStrip";
import HotelJourney from "@/components/about/HotelJourney";
import MissionVision from "@/components/about/MissionVision";
import StorySection from "@/components/about/StorySection";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import { aboutPageContent } from "@/data/about-page";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Discover the story, mission and values behind Bala's Spring View by Vista Hills — a boutique mountain retreat in Mussoorie.",
  path: "/about",
  image: "/images/about/exterior.jpg",
});

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHero
        eyebrow={aboutPageContent.hero.eyebrow}
        title={aboutPageContent.hero.title}
        subtitle={aboutPageContent.hero.subtitle}
        breadcrumbItems={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <StorySection />
      <MissionVision />
      <WhyChooseUs />
      <HotelJourney />
      <AboutGalleryStrip />
      <AboutCta />
      <Footer />
    </main>
  );
}
