import type { FileRoutesByTo } from "../routeTree.gen";
import type { Locale } from "~/paraglide/runtime";

type RoutePath = keyof FileRoutesByTo;

// Routes that should NOT be localized
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const excludedPaths = ["api"] as const;

type PublicRoutePath = Exclude<
  RoutePath,
  `${string}${(typeof excludedPaths)[number]}${string}`
>;

interface TranslatedPathname {
  pattern: string;
  localized: [Locale, string][];
}

function toUrlPattern(path: string) {
  return (
    path
      // catch-all
      .replace(/\/\$$/, "/:path(.*)?")
      // optional parameters: {-$param}
      .replace(/\{-\$([a-zA-Z0-9_]+)\}/g, ":$1?")
      // named parameters: $param
      .replace(/\$([a-zA-Z0-9_]+)/g, ":$1")
      // remove trailing slash
      .replace(/\/+$/, "")
  );
}

function createTranslatedPathnames(
  input: Record<PublicRoutePath, Record<Locale, string>>,
): TranslatedPathname[] {
  return Object.entries(input).map(([pattern, locales]) => ({
    pattern: toUrlPattern(pattern),
    localized: Object.entries(locales).map(
      ([locale, path]) =>
        [
          locale as Locale,
          locale === "en"
            ? toUrlPattern(path)
            : `/${locale}${toUrlPattern(path)}`,
        ] satisfies [Locale, string],
    ),
  }));
}

export const translatedPathnames = createTranslatedPathnames({
  "/": {
    en: "/",
    ar: "/",
  },
  "/about": {
    en: "/about",
    ar: "/about-us",
  },
});
