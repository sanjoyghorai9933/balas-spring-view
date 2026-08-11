import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

function csvCell(value: unknown) { const text = value == null ? "" : String(value); return `"${text.replaceAll('"', '""')}"`; }

export async function GET() {
  const session = await getAdminSession();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });
  const [rows] = await db.query("SELECT id, enquiry_type, full_name, phone, email, check_in, check_out, adults, children, room_slug, rooms_count, special_requests, source, status, created_at FROM enquiries ORDER BY created_at DESC, id DESC");
  const fields = ["id", "enquiry_type", "full_name", "phone", "email", "check_in", "check_out", "adults", "children", "room_slug", "rooms_count", "special_requests", "source", "status", "created_at"];
  const body = [fields.join(","), ...(rows as Record<string, unknown>[]).map(row => fields.map(field => csvCell(row[field])).join(","))].join("\r\n");
  return new NextResponse(body, { status: 200, headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="balas-vista-enquiries-${new Date().toISOString().slice(0,10)}.csv"` } });
}
