import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";

const attractions = [
  ["kempty-falls", "Kempty Falls", "12 km", "25 mins", "Morning (8–11 AM) to avoid crowds", "Kempty Falls Mussoorie", "One of the region's most iconic waterfalls, cascading from a height amid the hills — a refreshing escape for a half-day trip.", "/images/attractions/kempty.jpg"],
  ["mall-road", "Mall Road", "6 km", "15 mins", "Evening, for a lively atmosphere", "Mall Road Mussoorie", "Mussoorie's lively promenade, lined with cafes, local handicrafts and sweeping valley views — perfect for an evening stroll.", "/images/attractions/mall-road.jpg"],
  ["gun-hill", "Gun Hill", "7 km", "18 mins", "Sunset, for panoramic views", "Gun Hill Mussoorie", "The second-highest peak in Mussoorie, reached by cable car, offering panoramic views of the Himalayan range.", "/images/attractions/gun-hill.jpg"],
  ["company-garden", "Company Garden", "4 km", "10 mins", "Late morning to afternoon", "Company Garden Mussoorie", "A well-maintained garden with manicured lawns, a small lake and joy rides — a relaxed outing for the whole family.", "/images/attractions/company-garden.jpg"],
  ["lal-tibba", "Lal Tibba", "10 km", "20 mins", "Early morning, for clear mountain views", "Lal Tibba Mussoorie", "The highest point in Mussoorie, known for telescope views of the snow-capped Himalayan peaks on a clear day.", "/images/attractions/lal-tibba.jpg"],
  ["george-everest", "George Everest Peak", "8 km", "18 mins", "Morning to midday for clearer visibility", "George Everest Peak Mussoorie", "The historic ruins of Sir George Everest's residence, set against a dramatic hillside with sweeping valley views.", "/images/attractions/george-everest.jpg"],
];

export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let imported = 0;
  for (let i = 0; i < attractions.length; i++) {
    const [slug, name, distance, driveTime, bestTime, mapQuery, description, imageUrl] = attractions[i];
    const [existing] = await db.query("SELECT id FROM attractions WHERE slug=? OR name=? LIMIT 1", [slug, name]);
    if ((existing as unknown[]).length) continue;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(String(mapQuery))}`;
    await db.execute(
      `INSERT INTO attractions (slug,name,description,distance,drive_time,best_time_to_visit,maps_url,image_url,sort_order,is_active) VALUES (?,?,?,?,?,?,?,?,?,1)`,
      [slug, name, description, distance, driveTime, bestTime, mapsUrl, imageUrl, i],
    );
    imported++;
  }
  return NextResponse.json({ message: imported ? `Imported ${imported} existing attraction(s).` : "All existing attractions are already imported." });
}
