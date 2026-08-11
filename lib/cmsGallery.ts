import type { RowDataPacket } from "mysql2/promise";

import { galleryContent as fallbackGalleryContent } from "@/data/gallery";
import { db } from "@/lib/db";
import type { GalleryContent, GalleryImage } from "@/types/gallery";

type GalleryRow = RowDataPacket & {
  id: number;
  title: string | null;
  image_url: string;
  alt_text: string | null;
  category: string | null;
  aspect: string | null;
  sort_order: number;
  is_active: number;
};

function toImage(row: GalleryRow): GalleryImage {
  return {
    id: String(row.id),
    src: row.image_url,
    alt: row.alt_text || row.title || "Bala's Spring View gallery image",
    category: (row.category || "facilities") as GalleryImage["category"],
    aspect: (row.aspect || "landscape") as GalleryImage["aspect"],
  };
}

export async function getGalleryImagesFromDatabase(): Promise<GalleryImage[]> {
  try {
    const [rows] = await db.query<GalleryRow[]>(
      "SELECT id, title, image_url, alt_text, category, aspect, sort_order, is_active FROM gallery_images WHERE is_active = 1 ORDER BY sort_order ASC, id ASC",
    );
    if (!rows.length) return fallbackGalleryContent.images;
    return rows.map(toImage);
  } catch (error) {
    console.error("CMS gallery read failed; using static gallery fallback.", error);
    return fallbackGalleryContent.images;
  }
}

export async function getGalleryContentFromDatabase(): Promise<GalleryContent> {
  return { ...fallbackGalleryContent, images: await getGalleryImagesFromDatabase() };
}
