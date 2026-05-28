import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { LanguagesIcon } from "lucide-react";

import { setCurrentLocale } from "#/lib/i18n";
import { m } from "#/paraglide/messages.js";
import { getLocale } from "#/paraglide/runtime.js";

const locales = [
  { locale: "en", label: m.language_english },
  { locale: "zh", label: m.language_zh },
] as const;

export function LanguageToggle() {
  const currentLocale = getLocale();

  return (
    <DropdownMenu>
      <Button render={<DropdownMenuTrigger />} variant="ghost" size="icon-sm">
        <LanguagesIcon className="size-4" />
        <span className="sr-only">{m.language()}</span>
      </Button>
      <DropdownMenuContent align="end">
        {locales.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.locale}
            checked={currentLocale === item.locale}
            onCheckedChange={(checked) => checked && setCurrentLocale(item.locale)}
          >
            {item.label()}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
