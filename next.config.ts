import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Photography is served from a remote CDN so the repo stays light.
    // Swap this for your own asset host when real Nisu Travel photography is available.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 828, 1080, 1280, 1920, 2560],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
