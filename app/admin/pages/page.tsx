import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import PagesManager from "./PagesManager";

export default async function AdminPagesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <PagesManager />;
}
