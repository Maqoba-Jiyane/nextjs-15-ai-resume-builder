import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'h5michasrvlf7i7o.public.blob.vercel-storage.com'}, {protocol: 'https', hostname: 'images.unsplash.com'}, {protocol: 'https', hostname: 'cdn.pixabay.com'}]
  }
};

export default nextConfig;
