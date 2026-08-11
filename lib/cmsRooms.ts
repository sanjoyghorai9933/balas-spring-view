import type { RowDataPacket } from "mysql2/promise";

import { roomsContent as fallbackRoomsContent } from "@/data/rooms";
import { db } from "@/lib/db";
import type { Room, RoomsContent } from "@/types/rooms";

type RoomRow = RowDataPacket & {
  id: number;
  slug: string;
  name: string;
  category: string | null;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  long_description: string | null;
  size: string | null;
  bed_type: string | null;
  price_from: string | number | null;
  max_adults: number;
  max_children: number;
  amenities_json: string | string[] | null;
  cover_image_url: string | null;
  sort_order: number;
  is_active: number;
};

type ImageRow = RowDataPacket & {
  room_id: number;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
};

function parseAmenities(value: RoomRow["amenities_json"]): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function toRoom(row: RoomRow, images: ImageRow[]): Room {
  const gallery = images
    .filter((image) => image.room_id === row.id)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((image) => ({ src: image.image_url, alt: image.alt_text || row.name }));

  const fallback = fallbackRoomsContent.rooms.find((room) => room.slug === row.slug);
  const cover = row.cover_image_url || gallery[0]?.src || fallback?.image.src || "/images/rooms/room1.jpeg";
  const occupancy = row.max_children > 0
    ? `${row.max_adults} Adults + ${row.max_children} Children`
    : `${row.max_adults} Guests`;

  return {
    id: row.slug,
    slug: row.slug,
    category: row.category || row.name,
    title: row.name,
    subtitle: row.subtitle || fallback?.subtitle || "A comfortable mountain stay",
    description: row.short_description || row.description || fallback?.description || "",
    longDescription: row.long_description || row.description || fallback?.longDescription || row.short_description || "",
    image: { src: cover, alt: row.name },
    heroImage: { src: cover, alt: `${row.name} at Bala's Spring View` },
    galleryImages: gallery.length ? gallery : [{ src: cover, alt: row.name }],
    size: row.size || fallback?.size || "",
    occupancy,
    bedType: row.bed_type || fallback?.bedType || "",
    amenities: parseAmenities(row.amenities_json),
    priceFrom: Number(row.price_from || 0),
    href: `/rooms/${row.slug}`,
  };
}

export async function getRoomsFromDatabase(): Promise<Room[]> {
  try {
    const [rows] = await db.query<RoomRow[]>(
      "SELECT id, slug, name, category, subtitle, short_description, description, long_description, size, bed_type, price_from, max_adults, max_children, amenities_json, cover_image_url, sort_order, is_active FROM rooms WHERE is_active = 1 ORDER BY sort_order ASC, id ASC",
    );
    if (!rows.length) return fallbackRoomsContent.rooms;

    const [images] = await db.query<ImageRow[]>(
      "SELECT room_id, image_url, alt_text, sort_order FROM room_images ORDER BY room_id ASC, sort_order ASC, id ASC",
    );
    return rows.map((row) => toRoom(row, images));
  } catch (error) {
    console.error("CMS rooms read failed; using static room fallback.", error);
    return fallbackRoomsContent.rooms;
  }
}

export async function getRoomsContentFromDatabase(): Promise<RoomsContent> {
  return { ...fallbackRoomsContent, rooms: await getRoomsFromDatabase() };
}

export async function getRoomFromDatabase(slug: string): Promise<Room | undefined> {
  try {
    const [rows] = await db.query<RoomRow[]>(
      "SELECT id, slug, name, category, subtitle, short_description, description, long_description, size, bed_type, price_from, max_adults, max_children, amenities_json, cover_image_url, sort_order, is_active FROM rooms WHERE slug = ? AND is_active = 1 LIMIT 1",
      [slug],
    );
    if (!rows.length) return fallbackRoomsContent.rooms.find((room) => room.slug === slug);

    const [images] = await db.query<ImageRow[]>(
      "SELECT room_id, image_url, alt_text, sort_order FROM room_images WHERE room_id = ? ORDER BY sort_order ASC, id ASC",
      [rows[0].id],
    );
    return toRoom(rows[0], images);
  } catch (error) {
    console.error("CMS room read failed; using static room fallback.", error);
    return fallbackRoomsContent.rooms.find((room) => room.slug === slug);
  }
}
