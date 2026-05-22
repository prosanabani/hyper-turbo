import { Button } from "@repo/ui/components/button";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { CircleChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

/**
 * Home page. SSG by default (no dynamic data).
 * Metadata is built per-locale for SEO (title, description, canonical).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return buildPageMetadata({
    description: t("metaDescription"),
    locale,
    path: locale,
    title: t("metaTitle"),
  });
}

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className="mx-auto px-4 py-10">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mx-auto text-lg">{t("tagline")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/destinations">
              <CircleChevronRight aria-hidden className="size-5" />
              {t("ctaDestinations")}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">{t("about")}</Link>
          </Button>
        </div>
      </section>

      {/* Short intro */}
      <section
        aria-labelledby="intro-heading"
        className="border-border bg-card text-muted-foreground rounded-lg border p-6"
      >
        <h2
          className="text-foreground mb-2 text-xl font-semibold"
          id="intro-heading"
        >
          {t("introHeading")}
        </h2>
        <p>{t("introBody")}</p>
      </section>
    </div>
  );
}
