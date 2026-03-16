import type { NextConfig } from "next";

function getStrapiRemotePattern() {
  const rawUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;
  if (!rawUrl) {
    return [];
  }

  try {
    const url = new URL(rawUrl);

    return [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port,
        pathname: "/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: getStrapiRemotePattern(),
  },
};

export default nextConfig;
