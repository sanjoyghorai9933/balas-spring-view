import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const body = await request.json() as { slug?: string; title?: string; content?: string; meta_title?: string; meta_description?: string; is_published?: boolean };
  const slug = body.slug?.trim().toLowerCase().replace(/^\/+|\/+$/g, "").replace(/\s+/g, "-");
  if (!slug || !body.title?.trim()) return NextResponse.json({ error: "Slug and title are required." }, { status: 400 });
  await db.execute("UPDATE pages SET slug = ?, title = ?, content = ?, meta_title = ?, meta_description = ?, is_published = ? WHERE id = ?", [slug, body.title.trim(), body.content?.trim() || null, body.meta_title?.trim() || null, body.meta_description?.trim() || null, body.is_published === false ? 0 : 1, Number(id)]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  await db.execute("DELETE FROM pages WHERE id = ?", [Number(id)]);
  return NextResponse.json({ ok: true });
}
