import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

const pages = [
  { slug: "about", title: "About Bala's Spring View", content: "Bala's Spring View by Vista Hills is a peaceful mountain stay in Mussoorie, created for guests who value comfort, fresh air and beautiful Himalayan surroundings.", meta_title: "About Bala's Spring View by Vista Hills", meta_description: "Learn about Bala's Spring View by Vista Hills and our mountain hospitality in Mussoorie." },
  { slug: "contact", title: "Contact Us", content: "Get in touch with Bala's Spring View by Vista Hills for reservations, availability and general enquiries.", meta_title: "Contact Bala's Spring View", meta_description: "Contact Bala's Spring View by Vista Hills for bookings and enquiries." },
  { slug: "privacy-policy", title: "Privacy Policy", content: "We respect your privacy and use information submitted through this website only to respond to enquiries, reservations and related guest-service requests.", meta_title: "Privacy Policy", meta_description: "Privacy policy for Bala's Spring View by Vista Hills." },
  { slug: "terms-and-conditions", title: "Terms & Conditions", content: "Bookings, cancellations, check-in, check-out and other stay conditions are subject to the property's current policies and the terms communicated at the time of reservation.", meta_title: "Terms & Conditions", meta_description: "Terms and conditions for stays and bookings at Bala's Spring View by Vista Hills." },
  { slug: "cancellation-policy", title: "Cancellation Policy", content: "Cancellation and refund terms depend on the booking details and rate selected. Please confirm the applicable policy with the property before completing a reservation.", meta_title: "Cancellation Policy", meta_description: "Cancellation and refund policy for Bala's Spring View by Vista Hills." },
];

export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let imported = 0;
  for (const page of pages) {
    const [existing] = await db.query("SELECT id FROM pages WHERE slug = ? LIMIT 1", [page.slug]);
    if ((existing as unknown[]).length) continue;
    await db.execute("INSERT INTO pages (slug, title, content, meta_title, meta_description, is_published) VALUES (?, ?, ?, ?, ?, 1)", [page.slug, page.title, page.content, page.meta_title, page.meta_description]);
    imported += 1;
  }
  return NextResponse.json({ message: imported ? `Imported ${imported} page(s).` : "All existing pages are already imported." });
}
