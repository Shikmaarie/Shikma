"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Keeps the site header and footer off standalone landing pages.
 *
 * A campaign landing page has exactly one thing to offer, and site navigation
 * next to it is just a set of exits. Those pages render their own minimal
 * chrome instead — brand lockup at the top, legal links at the bottom.
 *
 * This gate rather than a second root layout: a route group with its own root
 * layout would mean moving every existing page into a group and maintaining
 * two copies of the <html> shell, fonts and metadata.
 *
 * `children` is passed through rather than imported here, so the server
 * components it wraps stay server components.
 */
const BARE_ROUTES = ["/partnerships"];

export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const bare = BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return bare ? null : <>{children}</>;
}
