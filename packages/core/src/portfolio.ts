export type PortfolioItem = {
  readonly id: string;
  readonly title: string;
  readonly titleZh: string;
  readonly description: string;
  readonly descriptionZh: string;
  readonly href: string;
  readonly cta: string;
  readonly ctaZh: string;
  readonly category: string;
  readonly categoryZh: string;
  readonly iconName: string;
  readonly newTab?: boolean;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "traveltrace",
    title: "TravelTrace",
    titleZh: "TravelTrace",
    description:
      "Interactive travel journal and route visualization platform. Built with React + Mapbox to trace journeys, pin memories, and share adventures through elegant map interfaces.",
    descriptionZh:
      "交互式旅行日记与路线可视化平台。用 React + Mapbox 搭建，记录旅程、标记回忆，通过优雅的地图界面分享冒险故事。",
    href: "https://traveltrace.life",
    cta: "View",
    ctaZh: "查看",
    category: "Maps",
    categoryZh: "地图",
    iconName: "MapIcon",
  },
  {
    id: "shape-of-world",
    title: "Shape of World",
    titleZh: "Shape of World",
    description:
      "Treemap data exploration platform that visualizes how the world is composed — GDP, population, trade, and more. Beautiful, interactive data maps.",
    descriptionZh:
      "Treemap 数据探索平台，用可视化图表展示世界的构成 — GDP、人口、贸易等。通过美观的交互式地图观察复杂数据。",
    href: "https://shapeof.world",
    cta: "View",
    ctaZh: "查看",
    category: "Data",
    categoryZh: "数据",
    iconName: "GlobeIcon",
  },
  {
    id: "self-media-research",
    title: "Self-Media Research",
    titleZh: "自媒体运营全维度调研",
    description:
      "Comprehensive research report on self-media operations across major Chinese platforms in 2025–2026. Deep analysis of content strategies, monetization models, and platform algorithms.",
    descriptionZh:
      "2025–2026 年中国主流平台自媒体运营的全维度研究报告。深度分析内容策略、变现模式和平台算法机制。",
    href: "/self-media-report/自媒体运营全维度调研整合.html",
    cta: "Read",
    ctaZh: "阅读",
    category: "Research",
    categoryZh: "研究",
    iconName: "BookOpenIcon",
    newTab: true,
  },
  {
    id: "feeling-my-own-waves",
    title: "Feeling My Own Waves",
    titleZh: "感受自己的浪",
    description:
      "A full narrative from snorkeling to life — a story about trust, rhythm, and self-discovery. Turning a life-changing experience into a product.",
    descriptionZh:
      "从浮潜到人生的完整叙事 —— 一篇关于信任、节奏和自我发现的文章。每个人的生命体验都可以被做成产品。",
    href: "/blog/感受自己的浪",
    cta: "Read",
    ctaZh: "阅读",
    category: "Life",
    categoryZh: "生活",
    iconName: "CameraIcon",
  },
  {
    id: "us-immigration-data-viz",
    title: "US Immigration Data Viz",
    titleZh: "US Immigration 数据可视化",
    description:
      "US population growth and immigration origins data visualization project with interactive charts and demographic trends.",
    descriptionZh: "美国人口增长与移民来源的数据可视化项目，通过交互式图表展示人口变迁趋势。",
    href: "https://shapeof.world",
    cta: "View",
    ctaZh: "查看",
    category: "Data",
    categoryZh: "数据",
    iconName: "BarChart3Icon",
  },
  {
    id: "skills-portfolio",
    title: "Skills Portfolio",
    titleZh: "Skills 技能库",
    description:
      "Interactive skill directory showcasing all Claude Code skills — video pipeline, content creation, perspectives, and more. Browseable with search and category filters.",
    descriptionZh:
      "交互式技能库目录，展示全部 Claude Code 自定义技能 — 视频管线、内容创作、人物视角等。支持搜索和分类筛选。",
    href: "/skills-portfolio/",
    cta: "Explore",
    ctaZh: "探索",
    category: "Tools",
    categoryZh: "工具",
    iconName: "BarChart3Icon",
    newTab: true,
  },
  {
    id: "snorkeling-philosophy",
    title: "Snorkeling Philosophy",
    titleZh: "浮潜哲学",
    description:
      "A first-person, full-screen underwater website. Open it and you're in the water. Turning a life-changing experience into an immersive product.",
    descriptionZh:
      "一个关于浮潜的、第一人称的、全屏入水的网站。打开它，你就下水了。每个人的生命体验都可以被做成产品。",
    href: "https://traveltrace.life",
    cta: "Dive In",
    ctaZh: "下水体验",
    category: "Life",
    categoryZh: "生活",
    iconName: "CameraIcon",
  },
];
