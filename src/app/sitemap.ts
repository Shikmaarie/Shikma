import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { baseUrl as base, isLiveSite } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // Nothing to offer a crawler that is not allowed to crawl us anyway.
  if (!isLiveSite) return [];

  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...["about", "programs", "wealth", "club", "books", "contact", "store"].map(
      (path) => ({
        url: `${base}/${path}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }),
    ),
    ...products.map((p) => ({
      url: `${base}/store/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["terms", "privacy", "accessibility"].map((doc) => ({
      url: `${base}/legal/${doc}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
