import path from "node:path";
import { fileURLToPath } from "node:url";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const config = withNextIntl({
  reactCompiler: true,
  transpilePackages: ["@repo/ui"],
  typescript: { ignoreBuildErrors: true },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.alias["@"] = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "src",
    );
    return webpackConfig;
  },
});

export default config;
