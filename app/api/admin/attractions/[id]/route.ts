import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

async function auth() { return getAdminSession(); }

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  if (!body.name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  await db.execute(
    `UPDATE attractions SET slug=?, name=?, description=?, distance=?, drive_time=?, best_time_to_visit=?, maps_url=?, image_url=?, sort_order=?, is_active=? WHERE id=?`,
    [body.slug?.trim() || null, body.name.trim(), body.description?.trim() || null, body.distance?.trim() || null,
      body.drive_time?.trim() || null, body.best_time_to_visit?.trim() || null, body.maps_url?.trim() || null,
      body.image_url?.trim() || null, Number(body.sort_order) || 0, body.is_active === false ? 0 : 1, Number(id)],
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.execute("DELETE FROM attractions WHERE id=?", [Number(id)]);
  return NextResponse.json({ ok: true });
}
