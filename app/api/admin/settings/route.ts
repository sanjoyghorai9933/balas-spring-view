import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

const allowed = ["site_name","tagline","phone","email","whatsapp","address","maps_url","instagram_url","facebook_url","youtube_url","booking_email"];
const defaults: Record<string,string> = {
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

async function ensureTable() {
  await db.execute(`CREATE TABLE IF NOT EXISTS site_settings (setting_key VARCHAR(80) PRIMARY KEY, setting_value TEXT NULL, updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`);
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await ensureTable();
    const [rows] = await db.query("SELECT setting_key, setting_value FROM site_settings");
    const values = { ...defaults } as Record<string,string>;
    for (const row of rows as { setting_key:string; setting_value:string|null }[]) if (allowed.includes(row.setting_key)) values[row.setting_key] = row.setting_value ?? "";
    return NextResponse.json(values);
  } catch (error) {
    console.error("Settings GET failed:", error);
    return NextResponse.json({ error: "Could not load site settings." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await ensureTable();
    const body = (await request.json()) as Record<string, unknown>;
    for (const key of allowed) {
      const value = typeof body[key] === "string" ? body[key].trim() : "";
      await db.execute("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)", [key, value]);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Settings PUT failed:", error);
    return NextResponse.json({ error: "Could not save site settings." }, { status: 500 });
  }
}
