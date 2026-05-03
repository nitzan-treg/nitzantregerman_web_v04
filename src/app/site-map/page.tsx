import type { Metadata } from "next";
import Link from "next/link";
import { nitzanProjects } from "@/data/nitzan-projects";

const siteUrl = "https://www.nitzantregerman.com";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Every page on Nitzan Tregerman's portfolio — home, about, and every project.",
  alternates: { canonical: `${siteUrl}/sitemap` },
  robots: { index: true, follow: true },
};

export default function SitemapPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-32 sm:px-10 md:px-12">
      <h1 className="text-brand-text mb-10 text-3xl font-light tracking-tight md:text-5xl">
        Sitemap
      </h1>

      <section className="mb-12">
        <h2 className="text-brand-muted mb-4 text-sm font-medium uppercase tracking-wider">
          Main pages
        </h2>
        <ul className="space-y-2 text-lg">
          <li>
            <Link href="/" className="text-brand-text hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-brand-text hover:underline">
              About
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-brand-muted mb-4 text-sm font-medium uppercase tracking-wider">
          Work
        </h2>
        <ul className="space-y-2 text-lg">
          {nitzanProjects
            .slice()
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="text-brand-text hover:underline"
                >
                  {p.title}
                </Link>
                <span className="text-brand-muted"> — {p.subtitle}</span>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
