import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // Readable class names in dev and consistent server/client class names for SSR
    styledComponents: true,
  },
};

export default nextConfig;
