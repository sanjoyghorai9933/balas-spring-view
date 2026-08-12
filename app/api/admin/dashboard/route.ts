import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

type CountRow = RowDataPacket & {
  total: number;
  active: number | null;
};

type EnquiryCountRow = RowDataPacket & {
  total: number;
  new_count: number | null;
  confirmed: number | null;
};

type RecentEnquiry = RowDataPacket & {
  id: number;
  enquiry_type: string;
  full_name: string;
  email: string | null;
  room_slug: string | null;
  status: string;
  created_at: string | Date;
};

const emptyCount: CountRow = { total: 0, active: 0 } as CountRow;
const emptyEnquiries: EnquiryCountRow = { total: 0, new_count: 0, confirmed: 0 } as EnquiryCountRow;

async function countQuery(sql: string): Promise<CountRow> {
  const [[row]] = await db.query<CountRow[]>(sql);
  return row ?? emptyCount;
}

async function enquiryCountQuery(): Promise<EnquiryCountRow> {
  const [[row]] = await db.query<EnquiryCountRow[]>(
    "SELECT COUNT(*) AS total, SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count, SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) AS confirmed FROM enquiries",
  );
  return row ?? emptyEnquiries;
}

async function recentQuery(): Promise<RecentEnquiry[]> {
  const [rows] = await db.query<RecentEnquiry[]>(
    "SELECT id, enquiry_type, full_name, email, room_slug, status, created_at FROM enquiries ORDER BY created_at DESC, id DESC LIMIT 6",
  );
  return rows;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const queries = [
    ["rooms", () => countQuery("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM rooms")],
    ["gallery", () => countQuery("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM gallery_images")],
    ["attractions", () => countQuery("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM attractions")],
    ["amenities", () => countQuery("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM amenities")],
    ["pages", () => countQuery("SELECT COUNT(*) AS total, SUM(CASE WHEN is_published = 1 THEN 1 ELSE 0 END) AS active FROM pages")],
    ["hero", () => countQuery("SELECT COUNT(*) AS total, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active FROM hero_slides")],
    ["enquiries", enquiryCountQuery],
    ["recent", recentQuery],
  ] as const;

  const results = await Promise.allSettled(queries.map(([, query]) => query()));
  const values = results.map((result) => result.status === "fulfilled" ? result.value : null);
  const warnings = results.flatMap((result, index) => result.status === "rejected" ? [queries[index][0]] : []);

  if (warnings.length === queries.length) {
    console.error("Admin dashboard database connection failed:", results[0].status === "rejected" ? results[0].reason : "Unknown error");
    return NextResponse.json({ error: "Could not connect to the database. Check the production database connection settings." }, { status: 500 });
  }

  const data = {
    rooms: (values[0] as CountRow | null) ?? emptyCount,
    gallery: (values[1] as CountRow | null) ?? emptyCount,
    attractions: (values[2] as CountRow | null) ?? emptyCount,
    amenities: (values[3] as CountRow | null) ?? emptyCount,
    pages: (values[4] as CountRow | null) ?? emptyCount,
    hero: (values[5] as CountRow | null) ?? emptyCount,
    enquiries: (values[6] as EnquiryCountRow | null) ?? emptyEnquiries,
    recent: (values[7] as RecentEnquiry[] | null) ?? [],
  };

  return NextResponse.json({
    ...data,
    warnings,
    warning: warnings.length ? `Some dashboard sections could not be loaded: ${warnings.join(", ")}.` : undefined,
  });
}
