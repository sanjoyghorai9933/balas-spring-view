import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");
  const q = searchParams.get("q");
  const conditions: string[] = [];
  const params: unknown[] = [];
  if (status && ["new", "contacted", "confirmed", "cancelled", "archived"].includes(status)) { conditions.push("status = ?"); params.push(status); }
  if (type && ["booking", "contact"].includes(type)) { conditions.push("enquiry_type = ?"); params.push(type); }
  if (q?.trim()) { conditions.push("(full_name LIKE ? OR email LIKE ? OR phone LIKE ? OR room_slug LIKE ?)"); const term = `%${q.trim()}%`; params.push(term, term, term, term); }
  const sql = `SELECT id, enquiry_type, full_name, phone, email, check_in, check_out, adults, children, room_slug, rooms_count, special_requests, source, status, created_at, updated_at FROM enquiries ${conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""} ORDER BY created_at DESC, id DESC`;
  const [rows] = await db.query(sql, params);
  return NextResponse.json(rows);
}
