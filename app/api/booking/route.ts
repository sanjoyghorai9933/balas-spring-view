import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DESTINATION_EMAIL = process.env.BOOKING_TO || "info@balasvistahills.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ["fullName", "phone", "email", "checkIn", "checkOut", "roomType"];
    const missing = required.filter((key) => !String(body[key] ?? "").trim());

    if (missing.length) {
      return NextResponse.json({ error: "Please complete all required booking fields." }, { status: 400 });
    }

    const checkIn = new Date(`${body.checkIn}T00:00:00`);
    const checkOut = new Date(`${body.checkOut}T00:00:00`);
    if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime()) || checkOut <= checkIn) {
      return NextResponse.json({ error: "Check-out must be after check-in." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASSWORD;
    const from = process.env.SMTP_FROM || user;

    if (!host || !user || !password || !from) {
      console.error("Booking email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD and SMTP_FROM.");
      return NextResponse.json({ error: "Booking email service is not configured yet." }, { status: 503 });
    }

    const fields = [
      ["Guest", body.fullName],
      ["Phone", body.phone],
      ["Email", body.email],
      ["Check-in", body.checkIn],
      ["Check-out", body.checkOut],
      ["Adults", body.adults ?? "2"],
      ["Children", body.children ?? "0"],
      ["Room", body.roomType],
      ["Number of rooms", body.numberOfRooms ?? "1"],
      ["Promo code", body.promoCode || "—"],
      ["Special requests", body.specialRequests || "—"],
    ] as const;

    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#222"><h2>New Booking Enquiry</h2>${fields.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(String(value))}</p>`).join("")}<p style="color:#777;font-size:12px">Submitted from the Bala's Spring View by Vista Hills website.</p></div>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: password },
    });

    await transporter.sendMail({
      from,
      to: DESTINATION_EMAIL,
      replyTo: body.email,
      subject: `New booking enquiry — ${body.fullName} — ${body.checkIn}`,
      html,
      text: fields.map(([label, value]) => `${label}: ${String(value)}`).join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking SMTP email failed:", error);
    return NextResponse.json({ error: "We couldn't send your booking request. Please try WhatsApp or email instead." }, { status: 502 });
  }
}
