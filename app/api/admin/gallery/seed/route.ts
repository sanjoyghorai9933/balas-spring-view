import { NextResponse } from "next/server";
import { galleryContent } from "@/data/gallery";
import { getAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/db";

export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    let imported = 0;
    for (const [index, image] of galleryContent.images.entries()) {
      const [existing] = await db.query<{ id: number }[]>("SELECT id FROM gallery_images WHERE image_url = ? LIMIT 1", [image.src]);
      if (existing.length) continue;
      await db.execute(
        "INSERT INTO gallery_images (title, image_url, alt_text, category, aspect, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)",
        [image.alt, image.src, image.alt, image.category, image.aspect, index],
      );
      imported += 1;
    }
    return NextResponse.json({ ok: true, imported, message: imported ? `Imported ${imported} existing gallery image(s).` : "Existing gallery images were already imported." });
  } catch (error) {
    console.error("Gallery seed failed:", error);
    return NextResponse.json({ error: "Could not import the existing gallery. Run db/gallery_migration.sql first." }, { status: 500 });
  }
}
