import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nitzan Tregerman — 3D Animation & VFX",
    short_name: "Nitzan Tregerman",
    description:
      "Portfolio of Nitzan Tregerman, freelance motion designer and visual effects artist.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/assets/images/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/assets/images/favicon-256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/images/favicon-256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
