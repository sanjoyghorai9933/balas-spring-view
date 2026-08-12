import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [rows] = await db.query(
    "SELECT id, title, subtitle, image_url, cta_label, cta_href, sort_order, is_active, created_at, updated_at FROM hero_slides ORDER BY sort_order ASC, id ASC",
  );
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    title?: string;
    subtitle?: string;
    image_url?: string;
    cta_label?: string;
    cta_href?: string;
    sort_order?: number;
    is_active?: boolean;
  };

  if (!body.title?.trim() || !body.image_url?.trim()) {
    return NextResponse.json({ error: "Title and image are required." }, { status: 400 });
  }

  const sortOrder = Number.isFinite(body.sort_order) ? Number(body.sort_order) : 0;
  const [result] = await db.execute(
    `INSERT INTO hero_slides (title, subtitle, image_url, cta_label, cta_href, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      body.title.trim(),
      body.subtitle?.trim() || null,
      body.image_url.trim(),
      body.cta_label?.trim() || null,
      body.cta_href?.trim() || null,
      sortOrder,
      body.is_active === false ? 0 : 1,
    ],
  );

  return NextResponse.json({ id: (result as { insertId: number }).insertId }, { status: 201 });
}
