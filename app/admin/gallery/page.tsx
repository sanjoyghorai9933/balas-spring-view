import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import GalleryManager from "./GalleryManager";

export default async function AdminGalleryPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <GalleryManager />;
}
