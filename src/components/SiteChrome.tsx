"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Landing pages deliberately run without the site header and footer: they have
 * a single call to action, and site navigation only gives the visitor ways to
 * leave before they take it.
 */
const BARE_ROUTES = ["/connections"];

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isBare = BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isBare) return null;

  return <>{children}</>;
}
