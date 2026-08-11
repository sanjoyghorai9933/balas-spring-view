import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

const defaults = [
  ["Free Wi-Fi", "High-speed Wi-Fi available for guests.", "wifi"],
  ["Free Parking", "On-site parking for guests.", "parking"],
  ["Mountain Views", "Beautiful views of the surrounding hills.", "mountain"],
  ["Room Service", "Convenient in-room dining service.", "room-service"],
  ["Daily Housekeeping", "Daily cleaning and room care.", "housekeeping"],
  ["Hot & Cold Water", "Hot and cold running water available.", "droplets"],
  ["Restaurant", "On-site dining for guests.", "utensils"],
  ["24/7 Assistance", "Guest assistance whenever you need it.", "headphones"],
];

export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [existing] = await db.query("SELECT name FROM amenities");
  const names = new Set((existing as Array<{ name: string }>).map((row) => row.name.toLowerCase()));
  let imported = 0;
  for (let i = 0; i < defaults.length; i += 1) {
    const [name, description, icon] = defaults[i];
    if (names.has(name.toLowerCase())) continue;
    await db.execute("INSERT INTO amenities (name, description, icon, sort_order, is_active) VALUES (?, ?, ?, ?, 1)", [name, description, icon, i]);
    imported += 1;
  }
  return NextResponse.json({ message: imported ? `Imported ${imported} standard amenity(s).` : "Amenities are already imported." });
}
