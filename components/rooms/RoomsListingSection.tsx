import RoomsListingClient from "@/components/rooms/RoomsListingClient";
import { getRoomsContentFromDatabase } from "@/lib/cmsRooms";

export default async function RoomsListingSection() {
  const content = await getRoomsContentFromDatabase();
  return <RoomsListingClient content={content} />;
}
