import { routing } from "./routing";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const { default: messages } = (await import(
    `../../messages/${locale}.json`
  )) as { default: Record<string, unknown> };

  return {
    locale,
    messages,
  };
});
