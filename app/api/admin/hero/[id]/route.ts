import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

type Context = { params: Promise<{ id: string }> };

async function authorized() {
  return Boolean(await getAdminSession());
}

export async function PUT(request: Request, context: Context) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
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

  const sortOrder = typeof body.sort_order === "number" && Number.isFinite(body.sort_order) ? body.sort_order : 0;
  const active = body.is_active === false ? 0 : 1;
  const idNumber = Number(id);

  await db.execute(
    `UPDATE hero_slides SET title = ?, subtitle = ?, image_url = ?, cta_label = ?, cta_href = ?, sort_order = ?, is_active = ? WHERE id = ?`,
    [
      body.title.trim(),
      body.subtitle?.trim() || null,
      body.image_url.trim(),
      body.cta_label?.trim() || null,
      body.cta_href?.trim() || null,
      sortOrder,
      active,
      idNumber,
    ],
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, context: Context) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  await db.execute("DELETE FROM hero_slides WHERE id = ?", [Number(id)]);
  return NextResponse.json({ ok: true });
}
