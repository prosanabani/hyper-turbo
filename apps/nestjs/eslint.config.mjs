import { nestJsLintConfig } from "@repo/eslint-config/nestjs";

/** Use the config file's directory (= package root with `tsconfig.json`), never `import.meta.url`. */
export default nestJsLintConfig(import.meta.dirname);
