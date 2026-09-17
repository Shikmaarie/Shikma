import type { MetadataRoute } from "next";
import { baseUrl, isLiveSite } from "@/lib/site-url";

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
