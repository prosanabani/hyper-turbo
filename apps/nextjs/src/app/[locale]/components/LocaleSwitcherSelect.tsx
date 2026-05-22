"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import * as React from "react";

const SUPPORTED_LOCALES: Locale[] = ["en", "ar"];

export default function LocaleSwitcherSelect() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onLocaleChange(nextLocale: string) {
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale as Locale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isPending} variant="default">
          {t("language")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup onValueChange={onLocaleChange} value={locale}>
          {SUPPORTED_LOCALES.map((loc) => (
            <DropdownMenuRadioItem key={loc} value={loc}>
              {loc.toUpperCase()}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
