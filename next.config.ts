import type { NextConfig } from "next";

const videoCDN = process.env.NEXT_PUBLIC_VIDEO_CDN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [256, 640],
    minimumCacheTTL: 2678400,
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    if (!videoCDN) return [];
    return [
      {
        source: "/assets/videos/:path*",
        destination: `${videoCDN}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
