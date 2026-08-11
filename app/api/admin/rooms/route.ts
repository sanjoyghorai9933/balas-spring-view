import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/db";
import { replaceRoomGallery } from "@/lib/roomAdmin";

function jsonArray(value: unknown) {
  if (!Array.isArray(value)) return JSON.stringify([]);
  return JSON.stringify(value.map((item) => String(item).trim()).filter(Boolean));
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [rooms] = await db.query("SELECT * FROM rooms ORDER BY sort_order ASC, id ASC");
  const [images] = await db.query("SELECT id, room_id, image_url, alt_text, sort_order FROM room_images ORDER BY room_id ASC, sort_order ASC, id ASC");
  const imageRows = images as Array<Record<string, unknown>>;
  const result = (rooms as Array<Record<string, unknown>>).map((room) => ({
    ...room,
    gallery_images: imageRows.filter((image) => Number(image.room_id) === Number(room.id)),
  }));

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = String(body.slug ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    if (!slug || !name) return NextResponse.json({ error: "Room name and slug are required." }, { status: 400 });

    const [result] = await db.execute(
      `INSERT INTO rooms (slug, name, category, subtitle, short_description, description, long_description, size, bed_type, price_from, max_adults, max_children, amenities_json, cover_image_url, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        name,
        String(body.category ?? name).trim(),
        String(body.subtitle ?? "").trim() || null,
        String(body.short_description ?? "").trim() || null,
        String(body.description ?? "").trim() || null,
        String(body.long_description ?? "").trim() || null,
        String(body.size ?? "").trim() || null,
        String(body.bed_type ?? "").trim() || null,
        Number(body.price_from || 0),
        Math.max(1, Number(body.max_adults || 2)),
        Math.max(0, Number(body.max_children || 0)),
        jsonArray(body.amenities),
        String(body.cover_image_url ?? "").trim() || null,
        Number(body.sort_order || 0),
        body.is_active === false ? 0 : 1,
      ],
    );

    const roomId = Number((result as { insertId: number }).insertId);
    await replaceRoomGallery(roomId, body.gallery_images);
    return NextResponse.json({ id: roomId }, { status: 201 });
  } catch (error) {
    console.error("Room create failed:", error);
    const message = error instanceof Error && error.message.includes("Duplicate") ? "That room slug already exists." : "Could not create room.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
