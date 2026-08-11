"use client";

import { motion } from "framer-motion";
import { useSiteSettings, whatsappHref } from "@/lib/useSiteSettings";
import WhatsAppIcon from "@/components/layout/WhatsAppIcon";

type IconProps = { size?: number; className?: string };
function InstagramIcon({ size = 16, className }: IconProps) { return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>; }
function FacebookIcon({ size = 16, className }: IconProps) { return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden="true"><path d="M14.5 8.5h2V5.6c-.35-.05-1.54-.15-2.93-.15-2.9 0-4.88 1.78-4.88 5.05v2.6H6v3.3h3.7V21h3.4v-4.6h3.16l.5-3.3h-3.66v-2.24c0-.95.26-1.6 1.4-1.6Z" fill="currentColor"/></svg>; }
function GoogleBusinessIcon({ size = 16, className }: IconProps) { return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" className={className} aria-hidden="true"><path d="M20.5 12.2c0-.65-.06-1.28-.17-1.88H12v3.56h4.77c-.2 1.12-.84 2.07-1.8 2.7v2.26h2.9c1.7-1.57 2.63-3.88 2.63-6.64Z" fill="currentColor"/><path d="M12 21c2.43 0 4.47-.8 5.96-2.16l-2.9-2.26c-.81.54-1.85.86-3.06.86-2.35 0-4.34-1.58-5.05-3.72H3.96v2.33A9 9 0 0 0 12 21Z" fill="currentColor"/><path d="M6.95 12.72a5.4 5.4 0 0 1 0-3.39V7h-3a9 9 0 0 0 0 8.05l3-2.33Z" fill="currentColor"/><path d="M12 6.6c1.32 0 2.51.46 3.44 1.35l2.58-2.58C16.46 3.9 14.42 3 12 3A9 9 0 0 0 3.95 7l3 2.33C7.66 7.18 9.65 6.6 12 6.6Z" fill="currentColor"/></svg>; }

export default function SocialIcons() {
  const settings = useSiteSettings();
  const socials = [
    { label: "Instagram", href: settings.instagram_url, Icon: InstagramIcon },
    { label: "Facebook", href: settings.facebook_url, Icon: FacebookIcon },
    { label: "Google Business", href: settings.maps_url, Icon: GoogleBusinessIcon },
    { label: "WhatsApp", href: whatsappHref(settings.whatsapp), Icon: WhatsAppIcon },
  ].filter((item) => item.href && item.href !== "https://wa.me/");

  return <div className="flex items-center gap-3">{socials.map(({ label, href, Icon }) => <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ y: -4, scale: 1.08 }} transition={{ duration: 0.25 }} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F8F8F5]/15 text-[#F8F8F5]/70 transition-colors duration-300 hover:border-[#C9A24A] hover:text-[#C9A24A]"><Icon size={16}/></motion.a>)}</div>;
}
