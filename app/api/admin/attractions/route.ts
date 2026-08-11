import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [rows] = await db.query(
    "SELECT id, slug, name, description, distance, drive_time, best_time_to_visit, maps_url, image_url, sort_order, is_active FROM attractions ORDER BY sort_order ASC, id ASC",
  );
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!body.name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  const [result] = await db.execute(
    `INSERT INTO attractions (slug, name, description, distance, drive_time, best_time_to_visit, maps_url, image_url, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [body.slug?.trim() || null, body.name.trim(), body.description?.trim() || null, body.distance?.trim() || null,
      body.drive_time?.trim() || null, body.best_time_to_visit?.trim() || null, body.maps_url?.trim() || null,
      body.image_url?.trim() || null, Number(body.sort_order) || 0, body.is_active === false ? 0 : 1],
  );
  return NextResponse.json({ id: (result as { insertId: number }).insertId }, { status: 201 });
}
