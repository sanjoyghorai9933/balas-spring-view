import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { roomsContent } from "@/data/rooms";
import { getAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/db";
import { replaceRoomGallery } from "@/lib/roomAdmin";

type ExistingRoomRow = RowDataPacket & { id: number };

export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    let imported = 0;
    for (const [index, room] of roomsContent.rooms.entries()) {
      const [existing] = await db.query<ExistingRoomRow[]>("SELECT id FROM rooms WHERE slug = ? LIMIT 1", [room.slug]);
      let roomId: number;

      if (existing.length) {
        roomId = existing[0].id;
      } else {
        const [result] = await db.execute<ResultSetHeader>(
          `INSERT INTO rooms (slug, name, category, subtitle, short_description, description, long_description, size, bed_type, price_from, max_adults, max_children, amenities_json, cover_image_url, sort_order, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            room.slug,
            room.title,
            room.category,
            room.subtitle,
            room.description,
            room.description,
            room.longDescription,
            room.size,
            room.bedType,
            room.priceFrom,
            Number(room.occupancy.match(/\d+/)?.[0] || 2),
            0,
            JSON.stringify(room.amenities),
            room.heroImage.src,
            index,
          ],
        );
        roomId = result.insertId;
        imported += 1;
      }

      await replaceRoomGallery(
        roomId,
        room.galleryImages.map((image) => ({ image_url: image.src, alt_text: image.alt })),
      );
    }

    return NextResponse.json({ ok: true, imported, message: imported ? `Imported ${imported} existing room(s).` : "Existing rooms were already imported." });
  } catch (error) {
    console.error("Room seed failed:", error);
    return NextResponse.json({ error: "Could not import the existing rooms. Make sure the room migration has been run." }, { status: 500 });
  }
}
