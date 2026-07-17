"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

/** Oculta el footer público en las rutas del panel de administración. */
export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return <Footer />;
}
