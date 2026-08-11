import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [[rooms]] = await Promise.all([
      db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM rooms"),
    ]);
    const [[gallery]] = await db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM gallery_images");
    const [[attractions]] = await db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM attractions");
    const [[amenities]] = await db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM amenities");
    const [[pages]] = await db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) AS active FROM pages");
    const [[hero]] = await db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM hero_slides");
    const [[enquiries]] = await db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count, SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed FROM enquiries");
    const [recent] = await db.query("SELECT id, enquiry_type, full_name, email, room_slug, status, created_at FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 6");

    return NextResponse.json({
      rooms, gallery, attractions, amenities, pages, hero, enquiries, recent,
    });
  } catch (error) {
    console.error("Admin dashboard query failed:", error);
    return NextResponse.json({ error: "Could not load dashboard statistics." }, { status: 500 });
  }
}
