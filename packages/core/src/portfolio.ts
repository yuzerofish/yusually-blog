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
    id: "sun-glint-lagoon",
    title: "Sun Glint Lagoon",
    titleZh: "太阳直射水面",
    description:
      "Interactive Three.js lagoon study with image-based water color, animated sun glints, glassy surface distortion, and shallow-water caustic motion.",
    descriptionZh:
      "一个基于 Three.js 的清澈礁湖水面实验：图像取色、太阳直射高光、玻璃感水面扰动，以及浅水焦散的缓慢流动。",
    href: "/sun-glint-lagoon/",
    cta: "Open",
    ctaZh: "体验",
    category: "Visual Lab",
    categoryZh: "视觉实验",
    iconName: "CameraIcon",
    newTab: true,
  },
  {
    id: "seewish-wish-veil",
    title: "SeeWish Wish Veil",
    titleZh: "SeeWish 愿望光幕",
    description:
      "Interactive vision-board prototype with a soft glowing canvas. Upload an image or video, pull the translucent veil, and watch it settle back with slow cloth-like physics.",
    descriptionZh:
      "一个用于愿景板的互动原型：上传图片或视频后，媒体会显影在柔光半透明光幕上。拖拽时产生柔软拉扯，松手后缓慢回到平静状态。",
    href: "/seewish-wish-veil/",
    cta: "Open",
    ctaZh: "体验",
    category: "Visual Lab",
    categoryZh: "视觉实验",
    iconName: "CameraIcon",
    newTab: true,
  },
  {
    id: "information-rain",
    title: "Information Rain",
    titleZh: "信息暴雨",
    description:
      "An interactive audiovisual web piece where a still video portrait is pressed under falling data curtains, slow scrubbing, fogged facial loading, and a low-frequency ambient score.",
    descriptionZh:
      "一个交互式视听网页作品：静止人像被下坠的信息幕压住，滑动时缓慢推进雾中面具、横向风感和低频氛围音乐。",
    href: "/information-rain/",
    cta: "Open",
    ctaZh: "体验",
    category: "Visual Lab",
    categoryZh: "视觉实验",
    iconName: "CameraIcon",
    newTab: true,
  },
  {
    id: "data-tide",
    title: "Data Tide",
    titleZh: "数据潮汐",
    description:
      "A scroll-driven audiovisual web piece built from a short AI video scene: the page scrubs through a pressed data-rain portrait while the original soundtrack loops underneath.",
    descriptionZh:
      "一个由 AI 视频片段生成的滚动视听网页作品：页面用滚动擦动时间轴，让被信息雨压住的人像缓慢变化，并保留原视频声音作为配乐。",
    href: "/data-tide/",
    cta: "Open",
    ctaZh: "体验",
    category: "Visual Lab",
    categoryZh: "视觉实验",
    iconName: "CameraIcon",
    newTab: true,
  },
  {
    id: "grasping-sand-hand",
    title: "Grasping Sand Hand",
    titleZh: "握沙之手",
    description:
      "A zen scroll-driven web piece: a fist releases sand into an empty palm as the scene shifts from dark tension into soft lavender light.",
    descriptionZh:
      "一个带禅意的滚动网页作品：握紧的拳头慢慢放开沙子，场景从阴郁僵硬过渡到柔软淡紫的空掌状态。",
    href: "/grasping-sand-hand/",
    cta: "Open",
    ctaZh: "体验",
    category: "Visual Lab",
    categoryZh: "视觉实验",
    iconName: "CameraIcon",
    newTab: true,
  },
  {
    id: "life-props",
    title: "Wonder Life Props",
    titleZh: "奇思妙想人生道具",
    description:
      "A dark, playful card-drawing gallery inspired by imaginative fictional props. Draw a strange life prop, read its origin and usage, and face ordinary days with a lighter mindset.",
    descriptionZh:
      "一个黑色抽卡式人生道具展示柜：从具体场景、情绪和荒诞想象里提炼道具，抽一张卡，用更有趣的心态面对普通生活。",
    href: "/life-props/",
    cta: "Draw",
    ctaZh: "抽一张",
    category: "Life",
    categoryZh: "生活",
    iconName: "BookOpenIcon",
    newTab: true,
  },
  {
    id: "talk-shower",
    title: "Talk Shower",
    titleZh: "Talk Shower 脱口秀样本库",
    description:
      "Scrollable research product for five years of Chinese stand-up: performers, stage time, heat, styles, satire targets, source logs, and interactive filters.",
    descriptionZh:
      "一个关于中国脱口秀过去五年的滚动研究产品：演员、上场时间、热度、风格、嘲讽对象、资料来源与交互筛选。",
    href: "/talk-shower/",
    cta: "Explore",
    ctaZh: "查看样本",
    category: "Research",
    categoryZh: "研究",
    iconName: "BarChart3Icon",
    newTab: true,
  },
  {
    id: "novel-to-comic-lab",
    title: "Novel-to-Comic Lab",
    titleZh: "小说转漫画分镜实验",
    description:
      "A personal note about adapting my favorite novel into cinematic comic frames, crediting the book-to-comic Skill inspiration and keeping the full comic private for rights reasons.",
    descriptionZh:
      "一篇关于把最喜欢的小说改成漫画分镜的个人说明：记录 book-to-comic Skill 灵感来源，并因版权边界只公开动机与说明，不发布连续漫画正文。",
    href: "/novel-to-comic-lab/",
    cta: "Read",
    ctaZh: "查看说明",
    category: "Process",
    categoryZh: "方法",
    iconName: "BookOpenIcon",
    newTab: true,
  },
  {
    id: "true-waterway",
    title: "The Real Way of Water",
    titleZh: "真实的水之道",
    description:
      "Immersive visual essay connecting Avatar: The Way of Water to real Pacific canoe cultures, museum objects, craft knowledge, and oceanic identity.",
    descriptionZh:
      "一页沉浸式视觉叙事：从太平洋帆船、独木舟和博物馆物件出发，重新理解《阿凡达：水之道》背后的真实海洋文明。",
    href: "/true-waterway/",
    cta: "Read",
    ctaZh: "进入",
    category: "Essay",
    categoryZh: "视觉叙事",
    iconName: "CameraIcon",
    newTab: true,
  },
  {
    id: "ocean-fish-nursery",
    title: "Ocean Fish Nursery",
    titleZh: "海底养鱼场",
    description:
      "Playable browser mini game about raising fish under the sea. Feed baby fish, keep the water clean, grow gold fish, and sell them for coins, with AI-generated pixel-style assets.",
    descriptionZh:
      "一个可以直接在浏览器游玩的海底养鱼小游戏：投喂小鱼、保持水质、养成金鱼并卖出赚钱，同时展示了用 AI 生成像素风素材和 Canvas 实现玩法的过程。",
    href: "/ocean-fish-nursery/",
    cta: "Play",
    ctaZh: "开始养鱼",
    category: "Game",
    categoryZh: "小游戏",
    iconName: "BarChart3Icon",
    newTab: true,
  },
  {
    id: "ocean-canoe-museum",
    title: "Ocean Canoe Museum",
    titleZh: "海洋文化寻船记",
    description:
      "Playable educational museum game prototype about Pacific canoe culture. Explore canoe exhibits, unlock the voyage journal, collect AI-generated pixel assets, and learn why boat length matters for ocean travel.",
    descriptionZh:
      "一个可玩的海洋文化博物馆探索原型：调查独木舟展品、解锁航海日志、收集 AI 生成的像素素材，并通过船身长度故事理解远航船只为什么要这样建造。",
    href: "/ocean-canoe-museum/",
    cta: "Play",
    ctaZh: "开始探索",
    category: "Game",
    categoryZh: "小游戏",
    iconName: "BookOpenIcon",
    newTab: true,
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
    id: "webgl-watercolor-tool",
    title: "WebGL Watercolor Tool",
    titleZh: "WebGL 水彩流场",
    description:
      "Interactive browser-based watercolor canvas with pigment diffusion, paper pressure, color drift, randomized pigment, PNG export, and WebGL fallback handling.",
    descriptionZh:
      "一个网页端交互水彩画布，支持颜料扩散、纸面压力、色彩漂移、随机颜料、PNG 导出和 WebGL 降级提示。",
    href: "/webgl-watercolor-tool/",
    cta: "Paint",
    ctaZh: "体验",
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
