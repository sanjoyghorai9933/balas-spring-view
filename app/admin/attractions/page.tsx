import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import AttractionsManager from "./AttractionsManager";

export default async function AdminAttractionsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <AttractionsManager />;
}
