import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GSAPProvider from "@/components/animation/GSAPProvider";
import NitzanShell from "./NitzanShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.nitzantregerman.com";

export const metadata: Metadata = {
  title: {
    default: "Nitzan Tregerman — 3D Animation & VFX",
    template: "%s — Nitzan Tregerman",
  },
  description:
    "A motion designer and compositor creating 3D animation with Houdini, Blender, and After Effects.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nitzan Tregerman",
    title: "Nitzan Tregerman — 3D Animation & VFX",
    description:
      "A motion designer and compositor creating 3D animation with Houdini, Blender, and After Effects.",
    url: siteUrl,
    images: [
      {
        url: "/assets/images/showreel-poster.jpg",
        width: 1920,
        height: 1080,
        alt: "Nitzan Tregerman — 3D Animation & VFX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitzan Tregerman — 3D Animation & VFX",
    description:
      "A motion designer and compositor creating 3D animation with Houdini, Blender, and After Effects.",
    images: ["/assets/images/showreel-poster.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/images/favicon-256.png", sizes: "256x256", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/assets/images/favicon-256.png",
  },
};

// JSON-LD: Person + WebSite entities. Helps Google build a Knowledge Graph
// node for "Nitzan Tregerman", which powers autocomplete on partial queries
// (e.g. "nitzan t") and the right-side info panel on branded searches.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Nitzan Tregerman",
      alternateName: ["Nitzan Treger", "treger_man"],
      url: siteUrl,
      image: `${siteUrl}/assets/images/nitzan-portrait-01.webp`,
      jobTitle: "Motion Designer & VFX Artist",
      description:
        "Freelance 3D animator, motion graphics and visual effects artist specializing in SideFX Houdini, Blender, and After Effects.",
      knowsAbout: [
        "3D Animation",
        "Visual Effects",
        "SideFX Houdini",
        "Blender",
        "After Effects",
        "Procedural Generation",
        "Motion Graphics",
        "Compositing",
        "VEX",
      ],
      sameAs: [
        "https://linkedin.com/in/nitzan-tregerman-72699b16a/",
        "https://github.com/nitzan-treg",
        "https://youtube.com/@nitzantregerman",
        "https://vimeo.com/user105531305",
        "https://instagram.com/treger_man/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Nitzan Tregerman",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GSAPProvider>
          <NitzanShell>{children}</NitzanShell>
        </GSAPProvider>
      </body>
    </html>
  );
}
