
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/data/site";


export default function NavbarLogo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/images/logo/logo.png"
        alt={siteConfig.brand}
        width={520}
        height={200}
        priority
        className="h-16 w-auto transition-transform duration-300 hover:scale-105 sm:h-20 lg:h-24"
      />
    </Link>
  );
}
