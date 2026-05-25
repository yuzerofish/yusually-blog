import type { SupportedLocale } from "@repo/core";
import { resolveLocale } from "@repo/core";

import { getLocale, setLocale, type Locale } from "#/paraglide/runtime.js";

export function getCurrentLocale(): SupportedLocale {
  return resolveLocale(getLocale());
}

export function setCurrentLocale(locale: SupportedLocale) {
  setLocale(locale as Locale);
}
