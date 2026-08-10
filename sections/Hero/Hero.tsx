"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import HeroButton from "@/components/hero/HeroButton";
import HeroImage from "@/components/hero/HeroImage";
import ScrollIndicator from "@/components/hero/ScrollIndicator";
import { heroContent as fallbackHero } from "@/data/hero";

type CmsSlide = {
  id: number;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_label: string | null;
  cta_href: string | null;
  sort_order: number;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const [slides, setSlides] = useState<CmsSlide[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/content/hero", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : []))
      .then((data: CmsSlide[]) => {
        if (active && Array.isArray(data)) setSlides(data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const hero = slides.length
    ? {
        ...fallbackHero,
        title: slides[0].title,
        tagline: slides[0].subtitle || fallbackHero.tagline,
        backgroundImage: slides[0].image_url,
        primaryCta: {
          label: slides[0].cta_label || fallbackHero.primaryCta.label,
          href: slides[0].cta_href || fallbackHero.primaryCta.href,
        },
        images: slides.map((slide) => ({ src: slide.image_url, alt: slide.title })),
      }
    : fallbackHero;

  return (
    <section id="home" ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-[#0F1720]">
      <motion.div aria-hidden="true" style={{ y: bgY }} className="absolute inset-0 -top-[10%] h-[120%] bg-cover bg-center bg-no-repeat">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${hero.backgroundImage}')` }} />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#0F1720]/95 via-[#0F1720]/75 to-[#0F1720]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#0F1720] via-[#0F1720]/40 to-transparent lg:via-[#0F1720]/20" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pt-32 pb-24 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:pt-40 lg:pb-16">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p variants={itemVariants} className="font-body text-[11px] font-medium uppercase tracking-[0.4em] text-[#C9A24A] sm:text-xs">{hero.eyebrow}</motion.p>
          <motion.h1 variants={itemVariants} className="mt-5 font-display text-5xl font-light leading-[1.1] tracking-[0.02em] text-[#F8F8F5] sm:mt-6 sm:text-6xl md:text-7xl lg:text-[5.5rem]">{hero.title}</motion.h1>
          <motion.div variants={itemVariants} aria-hidden="true" className="my-6 h-px w-16 bg-[#C9A24A]/70 sm:my-7 sm:w-20" />
          <motion.p variants={itemVariants} className="font-body text-xs font-medium uppercase tracking-[0.4em] text-[#C9A24A] sm:text-sm">{hero.brandLine}</motion.p>
          <motion.p variants={itemVariants} className="mt-6 font-display text-xl font-light italic tracking-wide text-[#F8F8F5] sm:mt-7 sm:text-2xl md:text-3xl">&ldquo;{hero.tagline}&rdquo;</motion.p>
          <motion.p variants={itemVariants} className="mt-6 max-w-xl font-body text-sm font-light leading-relaxed text-[#F8F8F5]/70 sm:mt-7 sm:text-base md:text-lg">{hero.description}</motion.p>
          <motion.div variants={itemVariants} className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:mt-11 sm:w-auto sm:flex-row sm:justify-start sm:gap-5">
            <HeroButton href={hero.primaryCta.href} label={hero.primaryCta.label} variant="primary" />
            <HeroButton href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant="secondary" />
          </motion.div>
        </motion.div>
        <HeroImage images={hero.images} />
      </div>
      <ScrollIndicator />
    </section>
  );
}
