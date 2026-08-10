import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import HeroManager from "./HeroManager";

export default async function AdminHeroPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return <HeroManager />;
}
