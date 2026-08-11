import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [rows] = await db.query("SELECT id, slug, title, content, meta_title, meta_description, is_published FROM pages ORDER BY title ASC, id ASC");
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { slug?: string; title?: string; content?: string; meta_title?: string; meta_description?: string; is_published?: boolean };
  const slug = body.slug?.trim().toLowerCase().replace(/^\/+|\/+$/g, "").replace(/\s+/g, "-");
  if (!slug || !body.title?.trim()) return NextResponse.json({ error: "Slug and title are required." }, { status: 400 });
  try {
    const [result] = await db.execute("INSERT INTO pages (slug, title, content, meta_title, meta_description, is_published) VALUES (?, ?, ?, ?, ?, ?)", [slug, body.title.trim(), body.content?.trim() || null, body.meta_title?.trim() || null, body.meta_description?.trim() || null, body.is_published === false ? 0 : 1]);
    return NextResponse.json({ id: (result as { insertId: number }).insertId }, { status: 201 });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && (error as { code?: string }).code === "ER_DUP_ENTRY") return NextResponse.json({ error: "A page with this slug already exists." }, { status: 409 });
    throw error;
  }
}
