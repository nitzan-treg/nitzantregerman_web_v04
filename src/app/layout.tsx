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

const siteUrl = "https://nitzantregerman.com";

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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <GSAPProvider>
          <NitzanShell>{children}</NitzanShell>
        </GSAPProvider>
      </body>
    </html>
  );
}
