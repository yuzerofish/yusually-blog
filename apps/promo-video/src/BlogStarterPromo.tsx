import "@fontsource-variable/inter/index.css";
import {
  ArchiveIcon,
  BookOpenIcon,
  CheckIcon,
  CloudIcon,
  DatabaseIcon,
  ImageIcon,
  MessageSquareTextIcon,
  PenLineIcon,
  RocketIcon,
  RssIcon,
  ServerIcon,
  Share2Icon,
  ShieldCheckIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Html5Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION = 1260;

const fontStack =
  '"Inter Variable", Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';
const monoStack =
  '"SFMono-Regular", "SF Mono", "Cascadia Code", "PingFang SC", "Microsoft YaHei", monospace';

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

type SceneProps = {
  end: number;
  start: number;
};

type Feature = {
  icon: LucideIcon;
  label: string;
  tone: string;
};

const features: Feature[] = [
  { icon: PenLineIcon, label: "可视化写作后台", tone: "#f5f5f5" },
  { icon: MessageSquareTextIcon, label: "内置评论审核", tone: "#8bd3ff" },
  { icon: ImageIcon, label: "R2 图床", tone: "#ffb86b" },
  { icon: RssIcon, label: "RSS 自动生成", tone: "#b6f26f" },
];

const stackItems = [
  { label: "Workers", value: "10 万次请求 / 天", icon: ServerIcon, color: "#ff8a34" },
  { label: "D1 数据库", value: "5 GB + 500 万次读 / 天", icon: DatabaseIcon, color: "#6ee7ff" },
  { label: "R2 图床", value: "10 GB，下载免费", icon: CloudIcon, color: "#f8d84a" },
  { label: "KV 缓存", value: "10 万次读 / 天", icon: ShieldCheckIcon, color: "#90f08c" },
];

const aiSteps = ["获取 Cloudflare 授权", "生成资源配置", "部署 Worker", "打开 /admin 写作"];

const themes = [
  { name: "黑白极简", colors: ["#f4f4f1", "#111111", "#d7d7d2"] },
  { name: "产品蓝", colors: ["#e7f1ff", "#1d4ed8", "#94a3b8"] },
  { name: "暖调长文", colors: ["#fff3e2", "#cc6b2c", "#6b5b4e"] },
  { name: "高反差", colors: ["#141414", "#f3f3f3", "#ff4f2e"] },
];

export const BlogStarterPromo = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", color: "#f7f7f4", fontFamily: fontStack }}>
      <SoundBed />
      <Atmosphere />
      <IntroScene start={0} end={174} />
      <ProductScene start={130} end={390} />
      <CloudflareScene start={350} end={600} />
      <AiScene start={560} end={810} />
      <OwnershipScene start={770} end={990} />
      <ThemeScene start={950} end={1140} />
      <FinalScene start={1090} end={VIDEO_DURATION} />
    </AbsoluteFill>
  );
};

function SoundBed() {
  return (
    <>
      <Html5Audio src={staticFile("audio/blog-starter-music.wav")} volume={0.34} />
      {[116, 338, 548, 762, 942, 1088].map((from) => (
        <Sequence from={from} key={`whoosh-${from}`} layout="none">
          <Html5Audio src={staticFile("audio/whoosh.wav")} volume={0.2} />
        </Sequence>
      ))}
      {[150, 398, 604, 820, 1022, 1128].map((from) => (
        <Sequence from={from} key={`hit-${from}`} layout="none">
          <Html5Audio src={staticFile("audio/hit.wav")} volume={0.22} />
        </Sequence>
      ))}
      {[610, 648, 686, 724, 868, 906, 944].map((from) => (
        <Sequence from={from} key={`click-${from}`} layout="none">
          <Html5Audio src={staticFile("audio/click.wav")} volume={0.18} />
        </Sequence>
      ))}
      <Sequence from={1110} layout="none">
        <Html5Audio src={staticFile("audio/shimmer.wav")} volume={0.24} />
      </Sequence>
    </>
  );
}

function Atmosphere() {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame % 360, [0, 360], [-35, 35], clamp);

  return (
    <AbsoluteFill>
      <div
        style={{
          ...absolute(0, 0, "100%", "100%"),
          background:
            "linear-gradient(115deg, rgba(255,255,255,0.08), transparent 28%, rgba(80,164,255,0.08) 52%, transparent 74%)",
          opacity: 0.9,
          transform: `translateX(${sweep}px)`,
        }}
      />
      <div
        style={{
          ...absolute(0, 0, "100%", "100%"),
          background:
            "radial-gradient(circle at 50% 8%, rgba(255,255,255,0.16), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 46%, rgba(255,255,255,0.07))",
        }}
      />
      <div
        style={{
          ...absolute(0, 0, "100%", "100%"),
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "linear-gradient(180deg, transparent, black 18%, black 74%, transparent)",
          opacity: 0.38,
          transform: `translateY(${interpolate(frame % 180, [0, 180], [0, 96], clamp)}px)`,
        }}
      />
    </AbsoluteFill>
  );
}

function IntroScene({ start, end }: SceneProps) {
  const frame = useCurrentFrame();
  const opacity = fadeWindow(frame, start, end, 34);
  const titleScale = interpolate(frame, [start, start + 70], [0.88, 1], {
    ...clamp,
    easing: ease,
  });
  const markProgress = interpolate(frame, [start + 20, start + 92], [0, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <SceneLayer opacity={opacity}>
      <div
        style={{
          ...absolute(126, 106, 186, 186),
          opacity: markProgress,
          transform: `scale(${0.86 + markProgress * 0.14})`,
        }}
      >
        <ProductGlyph progress={markProgress} size={186} />
      </div>
      <div
        style={{
          ...absolute(126, 342, 1460, 470),
          transform: `translateY(${interpolate(frame, [start, start + 56], [84, 0], {
            ...clamp,
            easing: ease,
          })}px) scale(${titleScale})`,
          transformOrigin: "left center",
        }}
      >
        <p style={eyebrowStyle}>BLOG STARTER</p>
        <h1 style={{ ...heroTitleStyle, maxWidth: 1280 }}>搭建你的永久精神家园</h1>
        <p style={{ ...bodyStyle, maxWidth: 840 }}>
          Cloudflare 原生个人博客系统。写作、评论、图床、RSS 和 AI 初始化流程，开箱即用。
        </p>
      </div>
      <div style={{ ...absolute(126, 900, 820, 44), opacity: fadeIn(frame, start + 92, 26) }}>
        <LightTrack progress={interpolate(frame, [start + 92, end - 24], [0, 1], clamp)} />
      </div>
    </SceneLayer>
  );
}

function ProductScene({ start, end }: SceneProps) {
  const frame = useCurrentFrame();
  const opacity = fadeWindow(frame, start, end, 34);
  const lift = interpolate(frame, [start, start + 72], [104, 0], { ...clamp, easing: ease });

  return (
    <SceneLayer opacity={opacity}>
      <div style={{ ...absolute(108, 120, 720, 820), transform: `translateY(${lift}px)` }}>
        <p style={eyebrowStyle}>产品体验</p>
        <h2 style={sectionTitleStyle}>全功能站点，直接开始写。</h2>
        <p style={{ ...bodyStyle, maxWidth: 650 }}>
          真正的数据库、真正的后台、真实可迁移的内容。博客不是临时主页，是你长期经营的发布系统。
        </p>
        <div style={{ display: "grid", gap: 18, marginTop: 52 }}>
          {features.map((feature, index) => (
            <FeatureRow
              feature={feature}
              index={index}
              key={feature.label}
              start={start + 74 + index * 14}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          ...absolute(824, 128, 900, 704),
          transform: `perspective(1800px) rotateY(${interpolate(
            frame,
            [start, start + 120],
            [8, -5],
            {
              ...clamp,
              easing: ease,
            },
          )}deg) rotateX(${interpolate(frame, [start, start + 120], [5, 0], clamp)}deg) translateY(${lift}px)`,
          transformOrigin: "center center",
        }}
      >
        <ProductInterface start={start + 34} />
      </div>
    </SceneLayer>
  );
}

function CloudflareScene({ start, end }: SceneProps) {
  const frame = useCurrentFrame();
  const opacity = fadeWindow(frame, start, end, 34);
  const local = Math.max(0, frame - start);

  return (
    <SceneLayer opacity={opacity}>
      <div style={{ ...absolute(128, 114, 860, 340) }}>
        <p style={eyebrowStyle}>免费边界</p>
        <h2 style={{ ...sectionTitleStyle, fontSize: 78 }}>无需服务器，无需续费。</h2>
      </div>
      <div style={{ ...absolute(112, 558, 800, 290) }}>
        <p style={{ ...bodyStyle, maxWidth: 780 }}>
          Workers、D1、R2、KV 由 Cloudflare 托管。个人博客的日常访问量，通常远低于免费额度。
        </p>
      </div>
      <div style={{ ...absolute(968, 140, 860, 760) }}>
        {stackItems.map((item, index) => {
          const Icon = item.icon;
          const reveal = interpolate(local, [index * 22, index * 22 + 52], [0, 1], {
            ...clamp,
            easing: ease,
          });
          const angle = -22 + index * 14;

          return (
            <div
              key={item.label}
              style={{
                ...absolute(66 + index * 64, 60 + index * 130, 640, 138),
                alignItems: "center",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.055))",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 8,
                boxShadow: `0 38px 90px rgba(0,0,0,0.3), 0 0 ${50 + index * 14}px ${item.color}20`,
                display: "flex",
                gap: 26,
                opacity: reveal,
                padding: "0 34px",
                transform: `translateX(${(1 - reveal) * 130}px) rotate(${angle * (1 - reveal)}deg)`,
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  backgroundColor: `${item.color}20`,
                  border: `1px solid ${item.color}66`,
                  borderRadius: 8,
                  color: item.color,
                  display: "flex",
                  height: 72,
                  justifyContent: "center",
                  width: 72,
                }}
              >
                <Icon size={38} strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontSize: 40, fontWeight: 760, lineHeight: 1 }}>{item.label}</div>
                <div style={{ color: "#c8c8c2", fontSize: 24, marginTop: 10 }}>{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ ...absolute(1116, 748, 430, 64), opacity: fadeIn(frame, start + 120, 24) }}>
        <LightTrack progress={interpolate(frame, [start + 120, end - 40], [0, 1], clamp)} />
      </div>
    </SceneLayer>
  );
}

function AiScene({ start, end }: SceneProps) {
  const frame = useCurrentFrame();
  const opacity = fadeWindow(frame, start, end, 34);
  const local = Math.max(0, frame - start);

  return (
    <SceneLayer opacity={opacity}>
      <div style={{ ...absolute(108, 112, 760, 430) }}>
        <p style={eyebrowStyle}>AI 初始化 Skill</p>
        <h2 style={{ ...sectionTitleStyle, whiteSpace: "pre-line" }}>
          跟 AI 聊几句，{"\n"}博客自动上线。
        </h2>
      </div>
      <div style={{ ...absolute(104, 598, 688, 300) }}>
        {aiSteps.map((step, index) => {
          const visible = interpolate(local, [64 + index * 36, 92 + index * 36], [0, 1], {
            ...clamp,
            easing: ease,
          });

          return (
            <div
              key={step}
              style={{
                alignItems: "center",
                color: visible > 0.95 ? "#f7f7f4" : "#7c7c76",
                display: "flex",
                fontSize: 29,
                fontWeight: 650,
                gap: 18,
                marginBottom: 24,
                opacity: 0.28 + visible * 0.72,
                transform: `translateX(${(1 - visible) * -42}px)`,
              }}
            >
              <span
                style={{
                  alignItems: "center",
                  backgroundColor: visible > 0.95 ? "#f7f7f4" : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 8,
                  color: visible > 0.95 ? "#050505" : "#f7f7f4",
                  display: "flex",
                  height: 42,
                  justifyContent: "center",
                  width: 42,
                }}
              >
                <CheckIcon size={26} strokeWidth={2.2} />
              </span>
              {step}
            </div>
          );
        })}
      </div>
      <div style={{ ...absolute(830, 132, 860, 716) }}>
        <AiTerminal start={start + 34} />
      </div>
    </SceneLayer>
  );
}

function OwnershipScene({ start, end }: SceneProps) {
  const frame = useCurrentFrame();
  const opacity = fadeWindow(frame, start, end, 34);
  const progress = interpolate(frame, [start + 30, start + 170], [0, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <SceneLayer opacity={opacity}>
      <div style={{ ...absolute(108, 104, 820, 360) }}>
        <p style={eyebrowStyle}>内容所有权</p>
        <h2 style={sectionTitleStyle}>博客是原点，平台是出口。</h2>
        <p style={{ ...bodyStyle, maxWidth: 780 }}>
          文章、图片、评论、设置都能导出。先沉淀在自己的站点，再分发到更多平台。
        </p>
      </div>
      <div
        style={{
          ...absolute(150, 560, 510, 280),
          transform: `translateY(${(1 - progress) * 42}px)`,
        }}
      >
        <ContentCard title="长期文章" meta="Markdown · 标签 · 封面" />
        <ContentCard title="读者评论" meta="审核 · 关键词 · AI 辅助" offset={74} />
        <ContentCard title="媒体资源" meta="R2 存储 · 可迁移归档" offset={148} />
      </div>
      <div style={{ ...absolute(760, 510, 420, 180), opacity: progress }}>
        <FlowLine progress={progress} />
      </div>
      <div style={{ ...absolute(1220, 420, 520, 360), opacity: fadeIn(frame, start + 92, 30) }}>
        <PlatformCluster progress={progress} />
      </div>
      <div
        style={{
          ...absolute(1200, 800, 430, 90),
          alignItems: "center",
          color: "#d7d7d0",
          display: "flex",
          fontSize: 28,
          fontWeight: 680,
          gap: 16,
          opacity: fadeIn(frame, start + 142, 22),
        }}
      >
        <ArchiveIcon color="#f8d84a" size={38} />
        随时导出，随时带走
      </div>
    </SceneLayer>
  );
}

function ThemeScene({ start, end }: SceneProps) {
  const frame = useCurrentFrame();
  const opacity = fadeWindow(frame, start, end, 34);

  return (
    <SceneLayer opacity={opacity}>
      <div style={{ ...absolute(108, 104, 800, 310) }}>
        <p style={eyebrowStyle}>内置风格</p>
        <h2 style={sectionTitleStyle}>四套预设主题，随时重塑。</h2>
      </div>
      <div
        style={{
          ...absolute(112, 450, 1660, 404),
          display: "grid",
          gap: 22,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {themes.map((theme, index) => {
          const reveal = interpolate(frame, [start + index * 22, start + 70 + index * 22], [0, 1], {
            ...clamp,
            easing: ease,
          });

          return (
            <ThemePreview
              index={index}
              key={theme.name}
              name={theme.name}
              palette={theme.colors}
              reveal={reveal}
            />
          );
        })}
      </div>
      <p
        style={{
          ...absolute(112, 898, 960, 50),
          color: "#bdbdb6",
          fontSize: 28,
          fontWeight: 520,
          opacity: fadeIn(frame, start + 112, 28),
        }}
      >
        默认黑白极简，也可以用 AI 工具改成任意风格。
      </p>
    </SceneLayer>
  );
}

function FinalScene({ start, end }: SceneProps) {
  const frame = useCurrentFrame();
  const opacity = fadeWindow(frame, start, end, 28);
  const reveal = interpolate(frame, [start, start + 84], [0, 1], { ...clamp, easing: ease });

  return (
    <SceneLayer opacity={opacity}>
      <div
        style={{
          ...absolute(0, 0, "100%", "100%"),
          background:
            "linear-gradient(180deg, transparent, rgba(255,255,255,0.05)), radial-gradient(circle at 50% 42%, rgba(255,255,255,0.16), transparent 34%)",
        }}
      />
      <div
        style={{
          ...absolute(0, 198, "100%", 646),
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          transform: `translateY(${(1 - reveal) * 52}px)`,
        }}
      >
        <ProductGlyph progress={reveal} size={148} />
        <h2 style={{ ...heroTitleStyle, fontSize: 112, marginTop: 44 }}>Blog Starter</h2>
        <p style={{ ...bodyStyle, fontSize: 38, marginTop: 24, maxWidth: 940 }}>
          从第一篇文章开始，拥有自己的互联网资产。
        </p>
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 8,
            color: "#f3f3ed",
            fontFamily: monoStack,
            fontSize: 30,
            marginTop: 56,
            padding: "22px 34px",
          }}
        >
          github.com/01mvp/blog-starter
        </div>
      </div>
    </SceneLayer>
  );
}

function FeatureRow({ feature, index, start }: { feature: Feature; index: number; start: number }) {
  const frame = useCurrentFrame();
  const Icon = feature.icon;
  const opacity = fadeIn(frame, start, 26);

  return (
    <div
      style={{
        alignItems: "center",
        background: "rgba(255,255,255,0.065)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderRadius: 8,
        display: "flex",
        gap: 18,
        height: 78,
        opacity,
        padding: "0 24px",
        transform: `translateX(${(1 - opacity) * -44}px)`,
        width: 520 + index * 22,
      }}
    >
      <Icon color={feature.tone} size={34} strokeWidth={1.9} />
      <span style={{ fontSize: 29, fontWeight: 680 }}>{feature.label}</span>
    </div>
  );
}

function ProductInterface({ start }: { start: number }) {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [start, start + 56], [0, 1], { ...clamp, easing: ease });
  const cursor = interpolate(frame % 120, [0, 60, 120], [0.1, 1, 0.1], clamp);

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #f7f7f2, #dadad2)",
        border: "1px solid rgba(255,255,255,0.72)",
        borderRadius: 8,
        boxShadow: "0 70px 140px rgba(0,0,0,0.46)",
        height: "100%",
        opacity: reveal,
        overflow: "hidden",
        transform: `scale(${0.92 + reveal * 0.08})`,
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          background: "#101010",
          color: "#f8f8f2",
          display: "flex",
          fontSize: 22,
          fontWeight: 680,
          height: 72,
          padding: "0 28px",
        }}
      >
        <div style={{ display: "flex", gap: 10, marginRight: 28 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
            <span
              key={color}
              style={{
                backgroundColor: color,
                borderRadius: 8,
                display: "block",
                height: 14,
                width: 14,
              }}
            />
          ))}
        </div>
        01MVP Blog Starter
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "230px 1fr", height: 632 }}>
        <div style={{ background: "#171717", color: "#dcdcd6", padding: 26 }}>
          {["概览", "文章", "评论", "资源", "设置"].map((item, index) => (
            <div
              key={item}
              style={{
                alignItems: "center",
                backgroundColor: index === 1 ? "#f6f6ef" : "transparent",
                borderRadius: 8,
                color: index === 1 ? "#111" : "#d0d0ca",
                display: "flex",
                fontSize: 22,
                fontWeight: 650,
                height: 48,
                marginBottom: 12,
                padding: "0 16px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
        <div style={{ background: "#efefe8", color: "#111", padding: 32 }}>
          <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr 320px" }}>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #deded7",
                borderRadius: 8,
                minHeight: 548,
                padding: 30,
              }}
            >
              <div style={{ color: "#777", fontSize: 19, fontWeight: 650, marginBottom: 18 }}>
                Markdown 编辑器
              </div>
              <div style={{ fontSize: 42, fontWeight: 780, lineHeight: 1.12 }}>
                在 Cloudflare 上设计长期可用的个人发布系统
                <span style={{ opacity: cursor }}>|</span>
              </div>
              <div style={{ display: "grid", gap: 14, marginTop: 32 }}>
                {[640, 580, 690, 520, 600].map((width, index) => (
                  <div
                    key={width}
                    style={{
                      background: index === 0 ? "#111" : "#deded7",
                      borderRadius: 8,
                      height: index === 0 ? 14 : 12,
                      opacity: index === 0 ? 0.92 : 1,
                      width,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
                {["Cloudflare", "AI 工作流", "个人站点"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "#f2f2ec",
                      border: "1px solid #d8d8d0",
                      borderRadius: 8,
                      color: "#555",
                      fontSize: 18,
                      fontWeight: 650,
                      padding: "9px 12px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gap: 18 }}>
              <MetricTile label="已发布" value="128" />
              <MetricTile label="评论待审" value="12" />
              <MetricTile label="R2 资源" value="3.8 GB" />
              <MetricTile label="RSS" value="Ready" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #deded7",
        borderRadius: 8,
        height: 122,
        padding: 22,
      }}
    >
      <div style={{ color: "#777", fontSize: 18, fontWeight: 650 }}>{label}</div>
      <div style={{ color: "#111", fontSize: 36, fontWeight: 780, marginTop: 12 }}>{value}</div>
    </div>
  );
}

function AiTerminal({ start }: { start: number }) {
  const frame = useCurrentFrame();
  const lines = [
    "deploy blog-starter --site Jackie Notes",
    "✓ 创建 D1 数据库",
    "✓ 创建 R2 图床",
    "✓ 写入站点配置",
    "✓ 部署到 Cloudflare Workers",
    "站点已上线  /admin 已就绪",
  ];

  return (
    <div
      style={{
        background: "linear-gradient(145deg, rgba(18,18,18,0.98), rgba(38,38,36,0.94))",
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 8,
        boxShadow: "0 70px 140px rgba(0,0,0,0.52)",
        height: "100%",
        overflow: "hidden",
        padding: 30,
      }}
    >
      <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
            <span
              key={color}
              style={{
                backgroundColor: color,
                borderRadius: 8,
                display: "block",
                height: 14,
                width: 14,
              }}
            />
          ))}
        </div>
        <div style={{ color: "#9d9d96", fontFamily: monoStack, fontSize: 18 }}>AI Init Skill</div>
      </div>
      <div style={{ display: "grid", gap: 20, marginTop: 48 }}>
        {lines.map((line, index) => {
          const visible = interpolate(
            frame,
            [start + index * 34, start + 24 + index * 34],
            [0, 1],
            {
              ...clamp,
              easing: ease,
            },
          );
          const isCommand = index === 0;
          const isDone = line.startsWith("✓");

          return (
            <div
              key={line}
              style={{
                alignItems: "center",
                color: isCommand ? "#f8d84a" : isDone ? "#a7f58f" : "#f7f7f0",
                display: "flex",
                fontFamily: monoStack,
                fontSize: index === lines.length - 1 ? 30 : 26,
                fontWeight: index === lines.length - 1 ? 760 : 540,
                opacity: visible,
                transform: `translateY(${(1 - visible) * 26}px)`,
              }}
            >
              <span style={{ color: "#666", marginRight: 18 }}>{isCommand ? "$" : ">"}</span>
              {line}
            </div>
          );
        })}
      </div>
      <div
        style={{
          alignItems: "center",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 8,
          bottom: 30,
          display: "flex",
          gap: 16,
          left: 30,
          padding: "18px 22px",
          position: "absolute",
          right: 30,
        }}
      >
        <WandSparklesIcon color="#8bd3ff" size={30} />
        <span style={{ color: "#d8d8d2", fontSize: 24, fontWeight: 650 }}>
          从需求到上线，一条指令完成。
        </span>
      </div>
    </div>
  );
}

function ContentCard({
  meta,
  offset = 0,
  title,
}: {
  meta: string;
  offset?: number;
  title: string;
}) {
  return (
    <div
      style={{
        background: "#f8f8f2",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 8,
        boxShadow: "0 30px 70px rgba(0,0,0,0.22)",
        color: "#101010",
        height: 112,
        left: offset * 0.18,
        padding: 22,
        position: "absolute",
        top: offset,
        width: 440,
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 780 }}>{title}</div>
      <div style={{ color: "#6b6b64", fontSize: 19, fontWeight: 620, marginTop: 14 }}>{meta}</div>
    </div>
  );
}

function PlatformCluster({ progress }: { progress: number }) {
  const chips = [
    { label: "公众号", icon: Share2Icon, color: "#6ee7ff" },
    { label: "知乎", icon: BookOpenIcon, color: "#8bd3ff" },
    { label: "小红书", icon: SparklesIcon, color: "#ff6b91" },
    { label: "Newsletter", icon: RocketIcon, color: "#f8d84a" },
  ];

  return (
    <div style={{ position: "relative" }}>
      {chips.map((chip, index) => {
        const Icon = chip.icon;
        return (
          <div
            key={chip.label}
            style={{
              alignItems: "center",
              background: "rgba(255,255,255,0.1)",
              border: `1px solid ${chip.color}66`,
              borderRadius: 8,
              color: "#f8f8f2",
              display: "flex",
              fontSize: 28,
              fontWeight: 720,
              gap: 18,
              height: 78,
              left: (index % 2) * 206,
              padding: "0 22px",
              position: "absolute",
              top: Math.floor(index / 2) * 116,
              transform: `scale(${0.88 + progress * 0.12})`,
              width: 184,
            }}
          >
            <Icon color={chip.color} size={30} />
            {chip.label}
          </div>
        );
      })}
    </div>
  );
}

function ThemePreview({
  index,
  name,
  palette,
  reveal,
}: {
  index: number;
  name: string;
  palette: string[];
  reveal: number;
}) {
  const [background, accent, muted] = palette;

  return (
    <div
      style={{
        background,
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 8,
        boxShadow: "0 34px 80px rgba(0,0,0,0.26)",
        color: index === 3 ? "#f8f8f2" : "#111",
        opacity: reveal,
        overflow: "hidden",
        padding: 28,
        transform: `translateY(${(1 - reveal) * 80}px)`,
      }}
    >
      <div
        style={{
          background: accent,
          borderRadius: 8,
          height: 112,
          marginBottom: 24,
          width: "100%",
        }}
      />
      <div style={{ fontSize: 30, fontWeight: 800 }}>{name}</div>
      <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
        {[0.82, 0.66, 0.92].map((ratio, lineIndex) => (
          <div
            key={ratio}
            style={{
              background: lineIndex === 0 ? accent : muted,
              borderRadius: 8,
              height: lineIndex === 0 ? 14 : 11,
              opacity: lineIndex === 0 ? 0.9 : 0.55,
              width: `${ratio * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProductGlyph({ progress, size }: { progress: number; size: number }) {
  const inner = size * 0.58;

  return (
    <div
      style={{
        alignItems: "center",
        border: "1px solid rgba(255,255,255,0.22)",
        borderRadius: 8,
        boxShadow: "0 0 80px rgba(255,255,255,0.16)",
        display: "flex",
        height: size,
        justifyContent: "center",
        position: "relative",
        width: size,
      }}
    >
      <div
        style={{
          background: "#f7f7f2",
          borderRadius: 8,
          height: inner,
          opacity: progress,
          position: "absolute",
          transform: `rotate(${45 * progress}deg) scale(${0.82 + progress * 0.18})`,
          width: inner,
        }}
      />
      <div
        style={{
          background: "#050505",
          borderRadius: 8,
          height: inner * 0.54,
          opacity: progress,
          position: "absolute",
          transform: `rotate(${45 * progress}deg)`,
          width: inner * 0.54,
        }}
      />
    </div>
  );
}

function LightTrack({ progress }: { progress: number }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.12)",
        borderRadius: 8,
        height: 3,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg, transparent, #f8f8f2, transparent)",
          height: "100%",
          transform: `translateX(${progress * 100 - 20}%)`,
          width: "35%",
        }}
      />
    </div>
  );
}

function FlowLine({ progress }: { progress: number }) {
  return (
    <div style={{ height: 160, position: "relative", width: 410 }}>
      <div
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.14), rgba(255,255,255,0.72))",
          borderRadius: 8,
          height: 4,
          left: 0,
          position: "absolute",
          top: 80,
          transform: `scaleX(${progress})`,
          transformOrigin: "left center",
          width: 380,
        }}
      />
      <Share2Icon
        color="#f8f8f2"
        size={56}
        style={{
          left: progress * 340,
          opacity: progress,
          position: "absolute",
          top: 52,
        }}
      />
    </div>
  );
}

function SceneLayer({ children, opacity }: { children: ReactNode; opacity: number }) {
  return (
    <AbsoluteFill style={{ opacity, transform: `translateZ(0)`, willChange: "opacity, transform" }}>
      {children}
    </AbsoluteFill>
  );
}

function fadeWindow(frame: number, start: number, end: number, fade = 24) {
  return Math.min(fadeIn(frame, start, fade), fadeOut(frame, end, fade));
}

function fadeIn(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [0, 1], { ...clamp, easing: ease });
}

function fadeOut(frame: number, end: number, duration: number) {
  return interpolate(frame, [end - duration, end], [1, 0], { ...clamp, easing: ease });
}

function absolute(
  left: number | string,
  top: number | string,
  width: number | string,
  height: number | string,
) {
  return {
    height,
    left,
    position: "absolute",
    top,
    width,
  } satisfies CSSProperties;
}

const eyebrowStyle: CSSProperties = {
  color: "#a6a69f",
  fontSize: 25,
  fontWeight: 760,
  letterSpacing: 0,
  lineHeight: 1,
  margin: 0,
  textTransform: "uppercase",
};

const heroTitleStyle: CSSProperties = {
  color: "#f8f8f2",
  fontSize: 126,
  fontWeight: 830,
  letterSpacing: 0,
  lineHeight: 0.96,
  margin: "28px 0 0",
};

const sectionTitleStyle: CSSProperties = {
  color: "#f8f8f2",
  fontSize: 84,
  fontWeight: 820,
  letterSpacing: 0,
  lineHeight: 1.02,
  margin: "26px 0 0",
};

const bodyStyle: CSSProperties = {
  color: "#c8c8c1",
  fontSize: 31,
  fontWeight: 520,
  letterSpacing: 0,
  lineHeight: 1.38,
  margin: "34px 0 0",
};
