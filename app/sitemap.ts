import type { MetadataRoute } from "next";
import { CUISINES } from "@/lib/cuisines";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://toeta.app";
  const now = new Date();
  const cuisineEntries: MetadataRoute.Sitemap = CUISINES.map((c) => ({
    url: `${base}/cuisine/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: base,                lastModified: now, changeFrequency: "daily",  priority: 1.0 },
    { url: `${base}/dashboard`, lastModified: now, changeFrequency: "daily",  priority: 0.9 },
    { url: `${base}/wheel`,     lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`,     lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`,   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,     lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    ...cuisineEntries,
  ];
}
