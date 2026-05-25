import { defineI18n } from "fumadocs-core/i18n";
import type { I18nProviderProps } from "fumadocs-ui/contexts/i18n";

export const docsLocales = [
  { locale: "en", name: "English" },
  { locale: "zh", name: "中文" },
] as const;

export type DocsLocale = (typeof docsLocales)[number]["locale"];

export const docsI18n = defineI18n({
  languages: ["en", "zh"],
  defaultLanguage: "en",
  hideLocale: "default-locale",
});

export function resolveDocsLocale(locale?: string): DocsLocale | undefined {
  return docsLocales.some((item) => item.locale === locale) ? (locale as DocsLocale) : undefined;
}

export function getDocsUrl(slugs: string[], locale: DocsLocale) {
  const path = ["docs", ...slugs].filter(Boolean).join("/");
  return locale === "en" ? `/${path}` : `/zh/${path}`;
}

const zhTranslations: I18nProviderProps["translations"] = {
  search: "搜索",
  searchNoResult: "没有找到结果",
  searchOpen: "打开搜索",
  searchClose: "关闭搜索",
  toc: "目录",
  tocNoHeadings: "暂无标题",
  tocInline: "本页目录",
  lastUpdate: "最后更新",
  chooseLanguage: "选择语言",
  nextPage: "下一页",
  previousPage: "上一页",
  chooseTheme: "选择主题",
  editOnGithub: "在 GitHub 编辑",
  themeToggle: "切换主题",
  themeLight: "浅色",
  themeDark: "深色",
  themeSystem: "跟随系统",
  codeBlockCopy: "复制代码",
  codeBlockCopied: "已复制",
  headingCopyAnchor: "复制锚点链接",
  sidebarOpen: "打开侧边栏",
  sidebarCollapse: "收起侧边栏",
  menuToggle: "打开菜单",
};

export function getDocsI18nProvider(locale: DocsLocale): Omit<I18nProviderProps, "children"> {
  return {
    locale,
    locales: [...docsLocales],
    translations: locale === "zh" ? zhTranslations : undefined,
  };
}
