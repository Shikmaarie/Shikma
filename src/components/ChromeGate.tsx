"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Hides the site header and footer on campaign landing pages (`/lp/*`).
 *
 * A landing page has exactly one job, and a full navigation bar is a set of
 * exits from it. Landing pages therefore carry their own slim header and
 * closing block instead.
 */
export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/lp")) return null;
  return <>{children}</>;
}
