"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import BookNowButton from "@/components/layout/BookNowButton";
import NavLink from "@/components/layout/NavLink";
import NavbarLogo from "@/components/layout/NavbarLogo";
import PhoneButton from "@/components/layout/PhoneButton";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "Nearby", href: "/attractions" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    if (mobileOpen) window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        // Mobile/tablet: sticky so the navbar keeps its own layout space and
        // cannot overlap the hero/content while scrolling. Desktop keeps the
        // existing overlay behavior.
        "sticky top-0 z-50 w-full transition-all duration-500 xl:fixed xl:inset-x-0 xl:top-0",
        scrolled
          ? "border-b border-[#F8F8F5]/5 bg-[#0F1720]/85 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:h-24 sm:px-6 lg:h-28 lg:px-10">
        <NavbarLogo />

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} label={link.label} />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <PhoneButton className="!hidden xl:!inline-flex" />
          <WhatsAppButton className="!hidden xl:!inline-flex" />
          <BookNowButton className="!hidden xl:!inline-flex" />

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-sm p-2 text-[#F8F8F5] transition-colors duration-300 hover:text-[#C9A24A] xl:hidden"
          >
            {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "max-h-[calc(100dvh-5rem)] overflow-x-hidden overflow-y-auto overscroll-contain border-t border-[#F8F8F5]/5 bg-[#0F1720]/95 backdrop-blur-md transition-all duration-500 sm:max-h-[calc(100dvh-6rem)] xl:hidden",
          mobileOpen ? "opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-6 px-5 py-7 sm:px-6 sm:py-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                onClick={closeMobileMenu}
              />
            </li>
          ))}
          <li className="flex items-center gap-3 pt-2">
            <PhoneButton onClick={closeMobileMenu} className="flex-1 justify-center" />
            <WhatsAppButton onClick={closeMobileMenu} />
          </li>
          <li>
            <BookNowButton
              className="w-full text-center"
              onClick={closeMobileMenu}
            />
          </li>
        </ul>
      </div>
    </header>
  );
}
