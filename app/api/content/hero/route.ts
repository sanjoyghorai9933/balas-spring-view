import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query(
    `SELECT id, title, subtitle, image_url, cta_label, cta_href, sort_order
     FROM hero_slides
     WHERE is_active = 1
     ORDER BY sort_order ASC, id ASC`,
  );
  return NextResponse.json(rows, {
    headers: { "Cache-Control": "no-store" },
  });
}
