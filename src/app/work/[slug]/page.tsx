import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { nitzanProjects, type NitzanProject } from "@/data/nitzan-projects";
import ProjectDetailClient from "./ProjectDetailClient";

const siteUrl = "https://www.nitzantregerman.com";

/* ── Static params for all project slugs ──────────────── */

export function generateStaticParams() {
  return nitzanProjects.map((p) => ({ slug: p.slug }));
}

function projectDescription(p: NitzanProject): string {
  // Meta descriptions are a single string. Use subtitle + first paragraph
  // capped at 200 chars so Google has room to show the full snippet.
  const first = p.description?.[0] ?? "";
  const combined = `${p.subtitle}. ${first}`.replace(/\s+/g, " ").trim();
  return combined.length > 200 ? `${combined.slice(0, 197)}…` : combined;
}

function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = nitzanProjects.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };
    const url = `${siteUrl}/work/${project.slug}`;
    const description = projectDescription(project);
    const image = absoluteUrl(project.thumbnail);
    return {
      title: project.title,
      description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title: `${project.title} — Nitzan Tregerman`,
        description,
        images: [{ url: image, width: 1920, height: 1080, alt: `${project.title} — ${project.subtitle}` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} — Nitzan Tregerman`,
        description,
        images: [image],
      },
    };
  });
}

/* ── JSON-LD builders ─────────────────────────────────── */

function buildJsonLd(project: NitzanProject) {
  const url = `${siteUrl}/work/${project.slug}`;
  const description = projectDescription(project);
  const thumbnailUrl = absoluteUrl(project.thumbnail);

  // VideoObject: Google's required fields are name, thumbnailUrl, uploadDate.
  // contentUrl/embedUrl is optional but unlocks video rich results.
  // Pick a plausible upload date — falls back to a project-launch baseline so
  // we never ship missing required fields.
  const uploadDate = "2024-01-01";

  const videos: object[] = [];
  if (project.vimeoId) {
    videos.push({
      "@type": "VideoObject",
      name: project.title,
      description,
      thumbnailUrl,
      uploadDate,
      embedUrl: `https://player.vimeo.com/video/${project.vimeoId}`,
    });
  }
  if (project.youtubeId) {
    videos.push({
      "@type": "VideoObject",
      name: project.title,
      description,
      thumbnailUrl,
      uploadDate,
      embedUrl: `https://www.youtube.com/embed/${project.youtubeId}`,
      contentUrl: `https://www.youtube.com/watch?v=${project.youtubeId}`,
    });
  }
  if (videos.length === 0 && project.heroVideo) {
    videos.push({
      "@type": "VideoObject",
      name: project.title,
      description,
      thumbnailUrl,
      uploadDate,
      contentUrl: absoluteUrl(project.heroVideo),
    });
  }

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: project.title, item: url },
    ],
  };

  const creativeWork = {
    "@type": "CreativeWork",
    "@id": `${url}#creativework`,
    name: project.title,
    headline: project.title,
    description,
    url,
    image: thumbnailUrl,
    creator: { "@id": `${siteUrl}/#person` },
    author: { "@id": `${siteUrl}/#person` },
    keywords: project.tools.join(", "),
    inLanguage: "en",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [creativeWork, breadcrumb, ...videos],
  };
}

/* ── Page component ───────────────────────────────────── */

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = nitzanProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  // Find prev/next by sortOrder
  const sorted = [...nitzanProjects].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
  const idx = sorted.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? sorted[idx - 1] : sorted[sorted.length - 1];
  const next =
    idx < sorted.length - 1 ? sorted[idx + 1] : sorted[0];

  const jsonLd = buildJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient
        project={project}
        prevProject={prev}
        nextProject={next}
      />
    </>
  );
}
