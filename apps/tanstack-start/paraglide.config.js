/** @type {import("@inlang/paraglide-js").CompilerOptions} */
export const paraglideConfig = {
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
      pattern: "/ui-showcase",
      localized: [
        ["en", "/ui-showcase"],
        ["ar", "/ar/ui-showcase"],
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
};
