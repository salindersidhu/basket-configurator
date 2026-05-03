import type { NextConfig } from "next";
import { execSync } from "child_process";

const hash = execSync("git rev-parse --short HEAD").toString().trim();
const version = require("./package.json").version;

const nextConfig: NextConfig = {
  transpilePackages: ["three-bvh-csg"],

  env: {
    NEXT_PUBLIC_VERSION: version,
    NEXT_PUBLIC_COMMIT_HASH: hash,
  },
};

export default nextConfig;
