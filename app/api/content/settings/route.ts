import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const defaults = {
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

export async function GET() {
  try {
    const [rows] = await db.query("SELECT setting_key, setting_value FROM site_settings");
    const values = { ...defaults } as Record<string, string>;
    for (const row of rows as { setting_key: string; setting_value: string | null }[]) {
      if (row.setting_key in values) values[row.setting_key] = row.setting_value ?? "";
    }
    return NextResponse.json(values, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Public settings GET failed:", error);
    return NextResponse.json(defaults, { headers: { "Cache-Control": "no-store" } });
  }
}
