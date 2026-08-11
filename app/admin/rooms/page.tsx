import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/adminAuth";
import RoomManager from "./RoomManager";

export default async function AdminRoomsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <RoomManager />;
}
