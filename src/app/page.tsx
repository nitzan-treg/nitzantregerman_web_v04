import { nitzanProjects } from "@/data/nitzan-projects";
import HomeClient from "./HomeClient";

const siteUrl = "https://www.nitzantregerman.com";

// Server-rendered JSON-LD: ItemList enumerates every project on the home grid
// so Google can understand the page as a portfolio collection. Reinforces the
// CreativeWork nodes on each individual /work/<slug> page and may enable
// sitelinks under the main result.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/#home`,
  url: siteUrl,
  isPartOf: { "@id": `${siteUrl}/#website` },
  about: { "@id": `${siteUrl}/#person` },
  inLanguage: "en",
  mainEntity: {
    "@type": "ItemList",
    name: "Selected work — Nitzan Tregerman",
    numberOfItems: nitzanProjects.length,
    itemListElement: nitzanProjects
      .slice()
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/work/${p.slug}`,
        name: p.title,
      })),
  },
};

export default function NitzanHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
