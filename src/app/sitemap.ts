import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
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
    {
      url: `${base}/event/independence`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
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
