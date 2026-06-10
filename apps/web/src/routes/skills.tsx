import { localizeSiteSettings } from "@repo/core";
import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpenIcon,
  CameraIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapIcon,
  SparklesIcon,
} from "lucide-react";

import { SiteShell } from "#/components/site-shell";
import { $getAboutPageData } from "#/lib/cms-server";
import { getCurrentLocale } from "#/lib/i18n";

export const Route = createFileRoute("/skills")({
  loader: () => $getAboutPageData(),
  head: () => {
    const locale = getCurrentLocale();
    return {
      meta: [
        {
          title: locale === "zh" ? "技能库" : "Skills Portfolio",
        },
        {
          name: "description",
          content:
            locale === "zh"
              ? "Yusualy 的 Claude Code 技能库全景 — 视频管线、数据可视化、内容创作、人物视角等 6 大分类 40+ 技能。"
              : "Yusually's Claude Code skills portfolio — 40+ skills across 6 categories including video pipeline, data visualization, content creation, and more.",
        },
      ],
    };
  },
  component: SkillsPage,
});

type SkillGroup = {
  category: string;
  icon: string;
  title: string;
  skills: { name: string; desc: string }[];
};

const skillsData: SkillGroup[] = [
  {
    category: "video",
    icon: "🎬",
    title: "视频管线",
    skills: [
      { name: "text-to-video-skill", desc: "文本→口播同步双视频全链路（Remotion + Hyperframes）" },
      { name: "video", desc: "视频基础能力" },
      { name: "video-hyperframes", desc: "Hyperframes / Remotion 兼容的连续帧动画" },
      { name: "video-voiceover-sync", desc: "AI 语音旁白与视频帧逐句同步" },
      { name: "video-audio", desc: "视频音频处理" },
      { name: "video-init", desc: "视频项目初始化" },
      { name: "video-config", desc: "视频配置管理" },
      { name: "video-preview", desc: "视频预览" },
      { name: "video-merge", desc: "视频合并" },
      { name: "video-i2v", desc: "图生视频 / image-to-video" },
      { name: "video-i2v-from-storyboard", desc: "从分镜图生成视频" },
      { name: "video-i2i", desc: "图生图 / image-to-image" },
      { name: "video-t2i", desc: "文生图 / text-to-image" },
      { name: "video-quick-create", desc: "快速创建视频" },
      { name: "video-text-storyboard", desc: "文本分镜生成" },
      { name: "video-upload", desc: "视频上传" },
      { name: "video-downloader", desc: "视频下载" },
      { name: "video-publish-douyin", desc: "抖音发布" },
      { name: "video-publish-kuaishou", desc: "快手发布" },
    ],
  },
  {
    category: "history",
    icon: "📜",
    title: "历史排位赛",
    skills: [
      { name: "history-video-maker", desc: "历史排名数据视频渲染引擎" },
      { name: "history-video-publisher", desc: "自动选题+渲染+发布全流程 SOP" },
      { name: "shape-of-world-treemap-video", desc: "世界的形状 Treemap 知识短视频" },
    ],
  },
  {
    category: "hot",
    icon: "🔥",
    title: "热点 & 社交发布",
    skills: [
      { name: "laohan-redian", desc: "AI 热点三路并行抓取（AIHOT+opencli+抖音）" },
      { name: "social-push", desc: "社交内容推送" },
      { name: "rednote-skill", desc: "小红书笔记 skill" },
      { name: "xiaohongshu-publisher", desc: "小红书自动发布器" },
      { name: "xhs-cli", desc: "小红书 CLI 工具" },
      { name: "maishou", desc: "内容创作相关" },
    ],
  },
  {
    category: "baoyu",
    icon: "🖼️",
    title: "宝宇内容创作",
    skills: [
      { name: "baoyu-comic", desc: "漫画风格插图生成" },
      { name: "baoyu-cover-image", desc: "文章封面图生成（9种色板/6种渲染风格）" },
      { name: "baoyu-format-markdown", desc: "Markdown 格式美化" },
      { name: "baoyu-infographic", desc: "信息图生成" },
      { name: "baoyu-markdown-to-html", desc: "Markdown → HTML 转换" },
      { name: "baoyu-url-to-markdown", desc: "URL 抓取并转为 Markdown" },
    ],
  },
  {
    category: "perspective",
    icon: "🧠",
    title: "人物视角",
    skills: [
      { name: "huashu-nuwa", desc: "女娲造人 — 深度调研→思维框架→可运行 Skill" },
      { name: "annie-yi-perspective", desc: "伊能静（Annie Yi）思维框架与表达方式" },
      { name: "dashu-perspective", desc: "大S（徐熙媛）思维框架与表达方式" },
      { name: "feynman-perspective", desc: "理查德·费曼思维框架" },
      { name: "munger-perspective", desc: "查理·芒格思维框架" },
      { name: "steve-jobs-perspective", desc: "史蒂夫·乔布斯思维框架" },
    ],
  },
  {
    category: "other",
    icon: "🧩",
    title: "其他",
    skills: [
      { name: "chart-visualization", desc: "AntV 数据可视化图表生成" },
      { name: "swiftui-swipe-delete", desc: "SwiftUI 左滑删除/右滑撤销交互" },
      { name: "chinese-editorial-report", desc: "中文编辑报告/调研报告排版" },
    ],
  },
];

function SkillsPage() {
  const data = Route.useLoaderData();
  const locale = getCurrentLocale();
  const siteSettings = localizeSiteSettings(data.siteSettings, locale);
  const isZh = locale === "zh";
  const totalSkills = skillsData.reduce((sum, g) => sum + g.skills.length, 0);

  return (
    <SiteShell siteSettings={siteSettings}>
      <div className="bg-background">
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
            <p className="text-sm font-semibold tracking-wide text-link uppercase">
              {isZh ? "Claude Code" : "Claude Code"}
            </p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
              {isZh ? "技能库" : "Skills Portfolio"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              {isZh
                ? `${totalSkills} 个可调用技能，覆盖 ${skillsData.length} 大分类。从视频生成到数据分析，从内容创作到人物洞察。`
                : `${totalSkills} invocable skills across ${skillsData.length} categories — from video generation to data analysis, content creation to character insights.`}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
          <div className="grid gap-8">
            {skillsData.map((group) => (
              <section
                key={group.category}
                className="rounded-lg border border-border bg-muted/20 p-5"
              >
                <div className="mb-4 flex items-center gap-3 border-b border-border pb-3">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold">{group.title}</h2>
                    <p className="text-xs text-muted-foreground">
                      {group.skills.length} {isZh ? "个技能" : "skills"}
                    </p>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="rounded-md border border-border bg-background p-3 text-sm transition hover:border-link/30"
                    >
                      <p className="font-mono text-xs font-medium text-link">{skill.name}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
