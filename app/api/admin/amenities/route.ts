import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [rows] = await db.query("SELECT id, name, description, icon, sort_order, is_active, created_at, updated_at FROM amenities ORDER BY sort_order ASC, id ASC");
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json()) as { name?: string; description?: string; icon?: string; sort_order?: number; is_active?: boolean };
  if (!body.name?.trim()) return NextResponse.json({ error: "Name is required." }, { status: 400 });
  const [result] = await db.execute(
    "INSERT INTO amenities (name, description, icon, sort_order, is_active) VALUES (?, ?, ?, ?, ?)",
    [body.name.trim(), body.description?.trim() || null, body.icon?.trim() || null, Number(body.sort_order) || 0, body.is_active === false ? 0 : 1],
  );
  return NextResponse.json({ id: (result as { insertId: number }).insertId }, { status: 201 });
}
