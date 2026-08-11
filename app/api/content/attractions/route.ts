import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, slug, name, description, distance, drive_time, best_time_to_visit, maps_url, image_url, sort_order FROM attractions WHERE is_active=1 ORDER BY sort_order ASC, id ASC",
    );
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
