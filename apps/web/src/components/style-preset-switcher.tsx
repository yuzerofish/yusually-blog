import type { LayoutPreset, SupportedLocale, ThemePreset } from "@repo/core";
import { Button } from "@repo/ui/components/button";
import { PaletteIcon } from "lucide-react";

type StylePresetId = "maker-shelf" | "apple-shelf" | "claude-shelf" | "brutalist-shelf";

type StylePresetOption = {
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
    en: "Monochrome",
    zh: "黑白极简",
  },
};

export const stylePresetOptions: StylePresetOption[] = [
  defaultStylePreset,
  {
    id: "apple-shelf",
    themePreset: "apple",
    layoutPreset: "shelf",
    label: {
      en: "Apple Rounded",
      zh: "苹果圆角",
    },
  },
  {
    id: "claude-shelf",
    themePreset: "claude",
    layoutPreset: "shelf",
    label: {
      en: "Warm Editorial",
      zh: "暖调人文",
    },
  },
  {
    id: "brutalist-shelf",
    themePreset: "brutalist",
    layoutPreset: "shelf",
    label: {
      en: "Brutalist",
      zh: "野兽派",
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
  const label = getStylePresetSwitchLabel(locale, nextPreset);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      data-style-preset-switcher
    >
      <PaletteIcon className="size-4" />
      <span data-style-preset-label className="sr-only">
        {nextPreset.label[locale]}
      </span>
    </Button>
  );
}

function getStylePresetSwitchLabel(locale: SupportedLocale, nextPreset: StylePresetOption) {
  return locale === "zh" ? `切换到 ${nextPreset.label.zh}` : `Switch to ${nextPreset.label.en}`;
}

function getPresetForAttributes(themePreset?: string, layoutPreset?: string) {
  return (
    stylePresetOptions.find(
      (preset) => preset.themePreset === themePreset && preset.layoutPreset === layoutPreset,
    ) ??
    stylePresetOptions.find((preset) => preset.themePreset === themePreset) ??
    defaultStylePreset
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

  function getPreset(id) {
    return presets.find((preset) => preset.id === id) || presets[0];
  }

  function getPresetForAttributes(themePreset, layoutPreset) {
    return (
      presets.find(
        (preset) => preset.themePreset === themePreset && preset.layoutPreset === layoutPreset,
      ) ||
      presets.find((preset) => preset.themePreset === themePreset) ||
      presets[0]
    );
  }

  let activeId = config.initialId;

  function getCurrentPreset(root) {
    return (
      getPresetForAttributes(root.dataset.themePreset, root.dataset.layoutPreset) ||
      getPreset(activeId)
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
    button.removeAttribute("title");
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

  function applyPreset(root, preset) {
    root.dataset.themePreset = preset.themePreset;
    root.dataset.layoutPreset = preset.layoutPreset;
    activeId = preset.id;
    updateButtons(root);
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest("[data-style-preset-switcher]");
    if (!button) return;

    const root = button.closest("[data-theme-preset][data-layout-preset]");
    if (!root) return;

    event.preventDefault();
    applyPreset(root, getNextPreset(getCurrentPreset(root)));
  });

  window.addEventListener("blogcms:site-settings-updated", (event) => {
    const root = document.querySelector("[data-theme-preset][data-layout-preset]");
    const detail = event.detail || {};
    if (!root || !detail.themePreset) return;
    applyPreset(root, getPresetForAttributes(detail.themePreset, detail.layoutPreset));
  });

  const root = document.querySelector("[data-theme-preset][data-layout-preset]");
  if (root) updateButtons(root);
})();`,
      }}
    />
  );
}

export function resolveStylePreset(themePreset: ThemePreset, layoutPreset: LayoutPreset) {
  return getPresetForAttributes(themePreset, layoutPreset);
}

export function getNextStylePreset(currentPreset: StylePresetOption) {
  const currentIndex = stylePresetOptions.findIndex((preset) => preset.id === currentPreset.id);
  return stylePresetOptions[(currentIndex + 1) % stylePresetOptions.length] ?? defaultStylePreset;
}
