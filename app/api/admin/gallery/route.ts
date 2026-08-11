import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [rows] = await db.query("SELECT id, title, image_url, alt_text, category, aspect, sort_order, is_active, created_at, updated_at FROM gallery_images ORDER BY sort_order ASC, id ASC");
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json()) as { title?: string; image_url?: string; alt_text?: string; category?: string; aspect?: string; sort_order?: number; is_active?: boolean };
  if (!body.image_url?.trim()) return NextResponse.json({ error: "Image is required." }, { status: 400 });
  const [result] = await db.execute(
    "INSERT INTO gallery_images (title, image_url, alt_text, category, aspect, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [body.title?.trim() || null, body.image_url.trim(), body.alt_text?.trim() || null, body.category || "facilities", body.aspect || "landscape", Number(body.sort_order) || 0, body.is_active === false ? 0 : 1],
  );
  return NextResponse.json({ id: (result as { insertId: number }).insertId }, { status: 201 });
}
