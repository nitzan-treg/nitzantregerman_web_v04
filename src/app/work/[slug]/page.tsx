import { notFound } from "next/navigation";
import { nitzanProjects, type NitzanProject } from "@/data/nitzan-projects";
import ProjectDetailClient from "./ProjectDetailClient";

/* ── Static params for all project slugs ──────────────── */

export function generateStaticParams() {
  return nitzanProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 16 async params — we resolve synchronously via .then in the
  // returned object, but for generateMetadata we can use the sync lookup
  // pattern since this runs at build time.
  return params.then(({ slug }) => {
    const project = nitzanProjects.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title} — Nitzan Tregerman`,
      description: project.description,
    };
  });
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

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prev}
      nextProject={next}
    />
  );
}
