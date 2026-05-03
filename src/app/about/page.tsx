import type { Metadata } from "next";
import { nitzanProfile } from "@/data/nitzan-projects";
import AboutClient from "./AboutClient";

const siteUrl = "https://www.nitzantregerman.com";
const pageUrl = `${siteUrl}/about`;
const portraitUrl = `${siteUrl}/assets/images/nitzan-portrait-01.webp`;

const description = `${nitzanProfile.bio} ${nitzanProfile.expertise}`.slice(0, 200);

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "profile",
    url: pageUrl,
    title: "About — Nitzan Tregerman",
    description,
    images: [{ url: portraitUrl, width: 1200, height: 1200, alt: "Nitzan Tregerman" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Nitzan Tregerman",
    description,
    images: [portraitUrl],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: pageUrl,
  mainEntity: { "@id": `${siteUrl}/#person` },
  inLanguage: "en",
};

export default function NitzanAboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
