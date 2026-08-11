import { NextResponse } from "next/server";

import { getRoomsContentFromDatabase } from "@/lib/cmsRooms";

export async function GET() {
  const content = await getRoomsContentFromDatabase();
  return NextResponse.json(content, {
    headers: { "Cache-Control": "no-store" },
  });
}
