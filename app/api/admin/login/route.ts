import { NextResponse } from "next/server";
import { createAdminSession, credentialsMatch } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim() ?? "";
    const password = body.password ?? "";

    if (!email || !password || !credentialsMatch(email, password)) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await createAdminSession(email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Admin login is not configured correctly." }, { status: 500 });
  }
}
