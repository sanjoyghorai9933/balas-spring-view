"use client";

import { useEffect, useState } from "react";

export type SiteSettings = {
  site_name: string;
  tagline: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  maps_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  booking_email: string;
};

const fallback: SiteSettings = {
  site_name: "Bala's Spring View by Vista Hills",
  tagline: "A peaceful mountain stay in Mussoorie",
  phone: "",
  email: "info@balasvistahills.com",
  whatsapp: "",
  address: "",
  maps_url: "",
  instagram_url: "",
  facebook_url: "",
  youtube_url: "",
  booking_email: "info@balasvistahills.com",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(fallback);

  useEffect(() => {
    let active = true;
    fetch("/api/content/settings", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : fallback)
      .then((data) => { if (active) setSettings({ ...fallback, ...data }); })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  return settings;
}

export function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function whatsappHref(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "https://wa.me/";
}
