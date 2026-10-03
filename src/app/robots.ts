import type { MetadataRoute } from "next";
import { baseUrl, isLiveSite } from "@/lib/site-url";

/* Evaluated once at build time, which is what both of these already were.
   Declaring it lets the static preview build emit them as plain files. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // A preview deployment is shut out entirely — see src/lib/site-url.ts.
  if (!isLiveSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
