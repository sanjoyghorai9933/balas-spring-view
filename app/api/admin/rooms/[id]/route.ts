import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/adminAuth";
import { db } from "@/lib/db";
import { replaceRoomGallery } from "@/lib/roomAdmin";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const roomId = Number(id);
  if (!Number.isInteger(roomId) || roomId < 1) return NextResponse.json({ error: "Invalid room id." }, { status: 400 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = String(body.slug ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    if (!slug || !name) return NextResponse.json({ error: "Room name and slug are required." }, { status: 400 });

    await db.execute(
      `UPDATE rooms SET slug = ?, name = ?, category = ?, subtitle = ?, short_description = ?, description = ?, long_description = ?, size = ?, bed_type = ?, price_from = ?, max_adults = ?, max_children = ?, amenities_json = ?, cover_image_url = ?, sort_order = ?, is_active = ? WHERE id = ?`,
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
        JSON.stringify(Array.isArray(body.amenities) ? body.amenities.map((item) => String(item).trim()).filter(Boolean) : []),
        String(body.cover_image_url ?? "").trim() || null,
        Number(body.sort_order || 0),
        body.is_active === false ? 0 : 1,
        roomId,
      ],
    );

    await replaceRoomGallery(roomId, body.gallery_images);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Room update failed:", error);
    const message = error instanceof Error && error.message.includes("Duplicate") ? "That room slug already exists." : "Could not update room.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const roomId = Number(id);
  if (!Number.isInteger(roomId) || roomId < 1) return NextResponse.json({ error: "Invalid room id." }, { status: 400 });

  await db.execute("DELETE FROM rooms WHERE id = ?", [roomId]);
  return NextResponse.json({ ok: true });
}
