import { NextResponse } from "next/server";

import { heroContent } from "@/data/hero";
import { getAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/db";

export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    let imported = 0;

    for (const [index, image] of heroContent.images.entries()) {
      const [existing] = await db.query<{ id: number }[]>(
        "SELECT id FROM hero_slides WHERE image_url = ? LIMIT 1",
        [image.src],
      );

      if (existing.length) continue;

      await db.execute(
        `INSERT INTO hero_slides (title, subtitle, image_url, cta_label, cta_href, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [
          heroContent.title,
          image.alt,
          image.src,
          index === 0 ? heroContent.primaryCta.label : null,
          index === 0 ? heroContent.primaryCta.href : null,
          index,
        ],
      );
      imported += 1;
    }

    return NextResponse.json({
      ok: true,
      imported,
      message: imported
        ? `Imported ${imported} existing hero banner(s).`
        : "Existing hero banners were already imported.",
    });
  } catch (error) {
    console.error("Hero seed failed:", error);
    return NextResponse.json(
      { error: "Could not import the existing hero banners." },
      { status: 500 },
    );
  }
}
