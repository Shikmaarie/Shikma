"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the site chrome on standalone pages.
 *
 * The registration form is sent to parents as a link of its own — Racheli's
 * nav, cart and footer have nothing to do with it, so they stay out of the way.
 */
const STANDALONE = ["/rishum"];

export default function ChromeGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (STANDALONE.some((prefix) => pathname?.startsWith(prefix))) return null;
  return <>{children}</>;
}
