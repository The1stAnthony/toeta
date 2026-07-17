import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://toeta.app";
  const now = new Date();
  return [
    { url: base,               lastModified: now, changeFrequency: "daily",  priority: 1.0 },
    { url: `${base}/dashboard`, lastModified: now, changeFrequency: "daily",  priority: 0.9 },
    { url: `${base}/wheel`,     lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];
}
