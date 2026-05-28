import type { LayoutPreset, SupportedLocale, ThemePreset } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { PaletteIcon } from "lucide-react";

type StylePresetId = "maker-shelf" | "apple-shelf" | "editorial-shelf";

export type StylePresetOption = {
  id: StylePresetId;
  themePreset: ThemePreset;
  layoutPreset: LayoutPreset;
  label: Record<SupportedLocale, string>;
};

const defaultStylePreset: StylePresetOption = {
  id: "maker-shelf",
  themePreset: "maker",
  layoutPreset: "shelf",
  label: {
    en: "Maker Shelf",
    zh: "黑白架",
  },
};

export const stylePresetOptions: StylePresetOption[] = [
  defaultStylePreset,
  {
    id: "apple-shelf",
    themePreset: "apple",
    layoutPreset: "shelf",
    label: {
      en: "Apple Dev",
      zh: "Apple Dev",
    },
  },
  {
    id: "editorial-shelf",
    themePreset: "editorial",
    layoutPreset: "shelf",
    label: {
      en: "Editorial",
      zh: "编辑杂志",
    },
  },
];

export function StylePresetCycleButton({
  locale,
  nextPreset,
}: {
  readonly locale: SupportedLocale;
  readonly nextPreset: StylePresetOption;
}) {
  const label =
    locale === "zh" ? `切换到 ${nextPreset.label.zh}` : `Switch to ${nextPreset.label.en}`;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="px-2.5"
      aria-label={label}
      title={label}
      data-style-preset-switcher
    >
      <PaletteIcon className="size-4" />
      <span data-style-preset-label className="sr-only">
        {nextPreset.label[locale]}
      </span>
    </Button>
  );
}

export function StylePresetRuntimeScript({
  initialPreset,
  locale,
}: {
  readonly initialPreset: StylePresetOption;
  readonly locale: SupportedLocale;
}) {
  const payload = JSON.stringify({
    initialId: initialPreset.id,
    locale,
    presets: stylePresetOptions,
  }).replaceAll("<", "\\u003c");

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(() => {
  const config = ${payload};
  const presets = config.presets;
  const labelLocale = config.locale === "zh" ? "zh" : "en";
  let activeId = config.initialId;

  function getPreset(id) {
    return presets.find((preset) => preset.id === id) || presets[0];
  }

  function getCurrentPreset(root) {
    return (
      presets.find(
        (preset) =>
          preset.themePreset === root.dataset.themePreset &&
          preset.layoutPreset === root.dataset.layoutPreset,
      ) || getPreset(activeId)
    );
  }

  function getNextPreset(preset) {
    const index = presets.findIndex((item) => item.id === preset.id);
    return presets[(index + 1) % presets.length] || presets[0];
  }

  function updateButton(button, nextPreset) {
    const label =
      labelLocale === "zh"
        ? "切换到 " + nextPreset.label.zh
        : "Switch to " + nextPreset.label.en;
    button.setAttribute("aria-label", label);
    button.setAttribute("title", label);
    const visibleLabel = button.querySelector("[data-style-preset-label]");
    if (visibleLabel) {
      visibleLabel.textContent = nextPreset.label[labelLocale];
    }
  }

  function updateButtons(root) {
    const nextPreset = getNextPreset(getCurrentPreset(root));
    document.querySelectorAll("[data-style-preset-switcher]").forEach((button) =>
      updateButton(button, nextPreset),
    );
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest("[data-style-preset-switcher]");
    if (!button) return;
    const root = button.closest("[data-theme-preset][data-layout-preset]");
    if (!root) return;
    event.preventDefault();
    const nextPreset = getNextPreset(getCurrentPreset(root));
    root.dataset.themePreset = nextPreset.themePreset;
    root.dataset.layoutPreset = nextPreset.layoutPreset;
    activeId = nextPreset.id;
    updateButtons(root);
  });

  const root = document.querySelector("[data-theme-preset][data-layout-preset]");
  if (root) updateButtons(root);
})();`,
      }}
    />
  );
}

export function resolveStylePreset(themePreset: ThemePreset, layoutPreset: LayoutPreset) {
  return (
    stylePresetOptions.find(
      (preset) => preset.themePreset === themePreset && preset.layoutPreset === layoutPreset,
    ) ??
    stylePresetOptions.find((preset) => preset.themePreset === themePreset) ??
    defaultStylePreset
  );
}

export function getNextStylePreset(currentPreset: StylePresetOption) {
  const currentIndex = stylePresetOptions.findIndex((preset) => preset.id === currentPreset.id);
  return stylePresetOptions[(currentIndex + 1) % stylePresetOptions.length] ?? defaultStylePreset;
}
