import { Button } from "@repo/ui/components/button";
import { useTheme } from "@repo/ui/lib/theme-provider";
import { cn } from "@repo/ui/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { m } from "#/paraglide/messages.js";

const themeModes = ["light", "dark", "system"] as const;

export function ThemeToggle({ className, ...props }: ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();
  const nextTheme = themeModes[(themeModes.indexOf(theme) + 1) % themeModes.length];
  const themeLabels = {
    light: m.theme_light(),
    dark: m.theme_dark(),
    system: m.theme_system(),
  };
  const Icon = theme === "light" ? SunIcon : theme === "dark" ? MoonIcon : MonitorIcon;

  return (
    <Button
      {...props}
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(nextTheme)}
      aria-label={`${m.theme_toggle()}: ${themeLabels[theme]}`}
      title={`${themeLabels[theme]} -> ${themeLabels[nextTheme]}`}
      className={cn(className)}
    >
      <Icon className="size-4" />
      <span className="sr-only">{m.theme_toggle()}</span>
    </Button>
  );
}
