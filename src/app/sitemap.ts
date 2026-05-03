import type { MetadataRoute } from "next";
import { nitzanProjects } from "@/data/nitzan-projects";

const BASE = "https://www.nitzantregerman.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Each project entry includes its poster image — Google reads `images` per
  // entry as an inline image sitemap, which surfaces project thumbnails in
  // Google Image search and large-image SERP previews.
  const projectEntries: MetadataRoute.Sitemap = nitzanProjects.map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
    images: [`${BASE}${p.thumbnail}`],
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
      images: [`${BASE}/assets/images/showreel-poster.jpg`],
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
      images: [`${BASE}/assets/images/nitzan-portrait-01.webp`],
    },
    {
      url: `${BASE}/site-map`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...projectEntries,
  ];
}
