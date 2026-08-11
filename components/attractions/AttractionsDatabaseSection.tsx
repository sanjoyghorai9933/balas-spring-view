import { db } from "@/lib/db";
import { attractionsContent } from "@/data/attractions";
import AttractionDetailCard from "./AttractionDetailCard";

type Row = { id: number; slug: string | null; name: string; description: string | null; distance: string | null; drive_time: string | null; best_time_to_visit: string | null; maps_url: string | null; image_url: string | null };

function fallback() {
  return attractionsContent.attractions.map((a) => ({ id: a.id, name: a.name, distance: a.distance, driveTime: a.driveTime, bestTimeToVisit: a.bestTimeToVisit, description: a.description, image: a.image, mapsUrl: a.mapsUrl }));
}

export default async function AttractionsDatabaseSection() {
  let items: ReturnType<typeof fallback> = fallback();
  try {
    const [rows] = await db.query("SELECT id, slug, name, description, distance, drive_time, best_time_to_visit, maps_url, image_url FROM attractions WHERE is_active=1 ORDER BY sort_order ASC, id ASC");
    const dbRows = rows as Row[];
    if (dbRows.length) items = dbRows.map((r) => ({ id: r.id, name: r.name, distance: r.distance, driveTime: r.drive_time, bestTimeToVisit: r.best_time_to_visit, description: r.description, image: r.image_url ? { src: r.image_url, alt: r.name } : null, mapsUrl: r.maps_url }));
  } catch { /* Keep static content as a safe fallback if DB is unavailable. */ }
  return <div className="mx-auto max-w-6xl space-y-20 lg:space-y-28">{items.map((attraction, index) => <AttractionDetailCard key={attraction.id} attraction={attraction} index={index} />)}</div>;
}
