import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile higher up the disk must not be taken as the workspace root
  turbopack: { root: path.resolve(".") },
};

export default nextConfig;
