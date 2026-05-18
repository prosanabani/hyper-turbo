import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/",
          localized: [
            ["en", "/"],
            ["ar", "/ar"],
          ],
        },
        {
          pattern: "/about",
          localized: [
            ["en", "/about"],
            ["ar", "/ar/about-us"],
          ],
        },
        {
          pattern: "/api/:path(.*)?",
          localized: [
            ["en", "/api/:path(.*)?"],
            ["ar", "/api/:path(.*)?"],
          ],
        },
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/:path(.*)?"],
            ["ar", "/ar/:path(.*)?"],
          ],
        },
      ],
    }),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    nitro(),
    tanstackStart(),
    viteReact(),
    tailwindcss(),
  ],
});
