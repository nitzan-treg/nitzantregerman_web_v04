import type { MetadataRoute } from "next";
import { nitzanProjects } from "@/data/nitzan-projects";

const BASE = "https://www.nitzantregerman.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    ...nitzanProjects.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
