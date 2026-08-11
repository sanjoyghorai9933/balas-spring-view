import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

const statuses = ["new", "contacted", "confirmed", "cancelled", "archived"] as const;

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = (await request.json()) as { status?: string };
  if (!body.status || !statuses.includes(body.status as typeof statuses[number])) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  await db.execute("UPDATE enquiries SET status = ? WHERE id = ?", [body.status, id]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.execute("DELETE FROM enquiries WHERE id = ?", [id]);
  return NextResponse.json({ ok: true });
}
