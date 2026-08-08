import { NextResponse } from "next/server";

const DESTINATION_EMAIL = "info@balasvistahills.com";

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

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.BOOKING_FROM_EMAIL;

    if (!apiKey || !from) {
      console.error("Booking email is not configured. Set RESEND_API_KEY and BOOKING_FROM_EMAIL.");
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

    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#222"><h2>New Booking Enquiry</h2>${fields.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(String(value))}</p>`).join("")}<p style="color:#777;font-size:12px">Submitted from the Balas Vista Hills website.</p></div>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [DESTINATION_EMAIL],
        reply_to: body.email,
        subject: `New booking enquiry — ${body.fullName} — ${body.checkIn}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend booking email failed:", errorText);
      return NextResponse.json({ error: "We couldn't send your booking request. Please try WhatsApp or email instead." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking request failed:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again or contact us directly." }, { status: 500 });
  }
}
