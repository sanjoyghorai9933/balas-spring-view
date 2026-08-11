import { db } from "@/lib/db";

export async function replaceRoomGallery(roomId: number, value: unknown) {
  const images = Array.isArray(value) ? value : [];
  await db.execute("DELETE FROM room_images WHERE room_id = ?", [roomId]);
  for (const [index, item] of images.entries()) {
    const image = item as { image_url?: unknown; alt_text?: unknown };
    const imageUrl = String(image.image_url ?? "").trim();
    if (!imageUrl) continue;
    await db.execute(
      "INSERT INTO room_images (room_id, image_url, alt_text, sort_order) VALUES (?, ?, ?, ?)",
      [roomId, imageUrl, String(image.alt_text ?? "").trim() || null, index],
    );
  }
}
