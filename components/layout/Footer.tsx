"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import FooterColumn from "@/components/layout/FooterColumn";
import Newsletter from "@/components/layout/Newsletter";
import ScrollToTop from "@/components/layout/ScrollToTop";
import SocialIcons from "@/components/layout/SocialIcons";
import { footerContent } from "@/data/footer";
import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #0B0F14 100%)",
      }}
    >
      {/* Abstract mountain silhouette divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 overflow-hidden opacity-40"
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 120L120 70L240 100L360 40L480 90L600 20L720 80L840 30L960 95L1080 50L1200 100L1320 60L1440 90V120H0Z"
            fill="#C9A24A"
            fillOpacity="0.12"
          />
          <path
            d="M0 120L160 85L320 105L480 65L640 100L800 55L960 100L1120 70L1280 105L1440 80V120H0Z"
            fill="#C9A24A"
            fillOpacity="0.08"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10"
        >
          {/* Column 1 — brand */}
          <FooterColumn>
            <Image
              src="/images/logo/logo.png"
              alt={siteConfig.brand}
              width={200}
              height={80}
              className="h-14 w-auto"
            />
            <p className="mt-5 font-body text-sm font-light leading-relaxed text-[#B9B9B9]">
              {footerContent.description}
            </p>
            <div className="mt-6">
              <SocialIcons />
            </div>
          </FooterColumn>

          {/* Column 2 — quick links */}
          <FooterColumn heading="Quick Links">
            <ul className="space-y-3">
              {footerContent.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center font-body text-sm font-light text-[#B9B9B9] transition-colors duration-300 hover:text-[#C9A24A]"
                  >
                    <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#C9A24A] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Column 3 — contact information */}
          <FooterColumn heading="Contact Information">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C9A24A]" />
                <a
                  href={siteConfig.phoneHref}
                  className="font-body text-sm font-light text-[#B9B9B9] transition-colors duration-300 hover:text-[#C9A24A]"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C9A24A]" />
                <a
                  href={siteConfig.emailHref}
                  className="font-body text-sm font-light text-[#B9B9B9] transition-colors duration-300 hover:text-[#C9A24A]"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C9A24A]" />
                <span className="font-body text-sm font-light leading-relaxed text-[#B9B9B9]">
                  {siteConfig.brand}
                  <br />
                  Mussoorie
                  <br />
                  Uttarakhand
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C9A24A]" />
                <span className="font-body text-sm font-light leading-relaxed text-[#B9B9B9]">
                  Check-in: {siteConfig.checkIn}
                  <br />
                  Check-out: {siteConfig.checkOut}
                </span>
              </li>
            </ul>
          </FooterColumn>

          {/* Column 4 — newsletter */}
          <FooterColumn>
            <Newsletter />
          </FooterColumn>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center gap-4 border-t border-[#C9A24A]/25 pt-8 text-center lg:mt-20 lg:flex-row lg:justify-between lg:text-left"
        >
          <p className="font-body text-xs font-light text-[#B9B9B9]">
            {footerContent.bottomBar.copyright}
          </p>
          <p className="font-body text-xs font-light text-[#B9B9B9]">
            {footerContent.bottomBar.tagline}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerContent.legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-body text-xs font-light text-[#B9B9B9] transition-colors duration-300 hover:text-[#C9A24A]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <ScrollToTop />
    </footer>
  );
}
