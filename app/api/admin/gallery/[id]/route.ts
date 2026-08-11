import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await request.json()) as { title?: string; image_url?: string; alt_text?: string; category?: string; aspect?: string; sort_order?: number; is_active?: boolean };
  if (!body.image_url?.trim()) return NextResponse.json({ error: "Image is required." }, { status: 400 });
  await db.execute(
    "UPDATE gallery_images SET title=?, image_url=?, alt_text=?, category=?, aspect=?, sort_order=?, is_active=? WHERE id=?",
    [body.title?.trim() || null, body.image_url.trim(), body.alt_text?.trim() || null, body.category || "facilities", body.aspect || "landscape", Number(body.sort_order) || 0, body.is_active === false ? 0 : 1, Number(id)],
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.execute("DELETE FROM gallery_images WHERE id=?", [Number(id)]);
  return NextResponse.json({ ok: true });
}
