import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { getNextConfigRedirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  async redirects() {
    return getNextConfigRedirects();
  },
  images: {
    // Allow all image formats including GIFs (used by some WordPress subsite products)
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      // Wildcard covers all Garnish Multisite subdomains automatically
      {
        protocol: 'https',
        hostname: '**.garnishmusicproduction.com',
        pathname: '/wp-content/uploads/**',
      },
      // Main www site
      {
        protocol: 'https',
        hostname: 'www.garnishmusicproduction.com',
        pathname: '**',
      },
      // Local Docker fallback
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default withPayload(nextConfig);
