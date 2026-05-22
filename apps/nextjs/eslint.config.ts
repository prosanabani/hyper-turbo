import { baseConfig } from "@repo/eslint-config/base";
import { nextjsConfig } from "@repo/eslint-config/nextjs";
import { reactConfig } from "@repo/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message: "Please import from `@/i18n/navigation` instead.",
            },
          ],
          patterns: [
            {
              group: ["next/navigation"],
              importNames: [
                "redirect",
                "permanentRedirect",
                "useRouter",
                "usePathname",
              ],
              message: "Please import from `@/i18n/navigation` instead.",
            },
          ],
        },
      ],
    },
  },
);
