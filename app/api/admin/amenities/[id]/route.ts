import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const body = (await request.json()) as { name?: string; description?: string; icon?: string; sort_order?: number; is_active?: boolean };
  if (!body.name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  await db.execute(
    "UPDATE amenities SET name = ?, description = ?, icon = ?, sort_order = ?, is_active = ? WHERE id = ?",
    [body.name.trim(), body.description?.trim() || null, body.icon?.trim() || null, Number(body.sort_order) || 0, body.is_active === false ? 0 : 1, Number(id)],
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  await db.execute("DELETE FROM amenities WHERE id = ?", [Number(id)]);
  return NextResponse.json({ ok: true });
}
