import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import AmenitiesManager from "./AmenitiesManager";

export default async function AdminAmenitiesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <AmenitiesManager />;
}
