import { compile } from "@inlang/paraglide-js";
import { paraglideConfig } from "../paraglide.config.js";

await compile({
  ...paraglideConfig,
  cleanOutdir: false,
});
