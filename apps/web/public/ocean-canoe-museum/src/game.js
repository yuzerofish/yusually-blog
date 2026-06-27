"use strict";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const ui = {
  questCount: document.querySelector("#quest-count"),
  questText: document.querySelector("#quest-text"),
  speaker: document.querySelector("#speaker"),
  dialogue: document.querySelector("#dialogue-text"),
  prompt: document.querySelector("#interaction-prompt"),
  exhibitCard: document.querySelector("#exhibit-card"),
  cardKicker: document.querySelector("#card-kicker"),
  cardTitle: document.querySelector("#card-title"),
  cardBody: document.querySelector("#card-body"),
  closeCard: document.querySelector("#close-card"),
  journal: document.querySelector("#journal"),
  journalClose: document.querySelector("#journal-close"),
  tabs: Array.from(document.querySelectorAll(".tab")),
  navButtons: Array.from(document.querySelectorAll(".bottom-nav button")),
  itemButtons: Array.from(document.querySelectorAll(".item-slot:not(.empty)")),
  boatName: document.querySelector("#boat-name"),
  boatLength: document.querySelector("#boat-length"),
  boatUse: document.querySelector("#boat-use"),
  boatCulture: document.querySelector("#boat-culture"),
  boatReason: document.querySelector("#boat-reason"),
  unlockCount: document.querySelector("#unlock-count"),
};

const BASE = { width: 1691, height: 930 };
const referenceImage = new Image();
let referenceReady = false;
referenceImage.onload = () => {
  referenceReady = true;
};
referenceImage.src = "assets/reference-game-ui.png";

function loadAsset(src) {
  const image = new Image();
  image.src = src;
  return image;
}

const assets = {
  player: loadAsset("assets/generated/player-explorer.png"),
};

const state = {
  player: { x: 630, y: 350, speed: 170, facing: 1, walkPhase: 0 },
  keys: new Set(),
  currentHotspot: null,
  cardOpen: false,
  journalOpen: true,
  activeTab: "boats",
  unlocked: new Set(["canoe", "sail"]),
};

const hotspots = [
  {
    id: "canoe",
    x: 386,
    y: 266,
    radius: 300,
    title: "船身长度故事：斐济 · 瓦卡独木舟",
    kicker: "了解船身长度",
    detail: {
      length: "12.6 米",
      use: "远航 / 运输 / 探索",
      culture: "斐济（太平洋）",
      reason: "长船身能安排划手、食物、淡水和交换物",
    },
    bodyHtml: `
      <div class="length-story">
        <p><strong>先不要看数字，先用脚步量。</strong>玩家从船头走到船尾，会发现这不是一条“放大的小船”，而是一段需要走完的空间。</p>
        <div class="length-scale" aria-label="船身长度比例">
          <span></span><span></span><span></span>
          <small>1 人</small><small>5 人</small><small>10 人以上</small>
        </div>
        <p>船身越长，越能安排更多划手，也能放下水、食物、工具、交换物、帆和绳索。远航需要的不是“更大看起来厉害”，而是把整个旅程装进同一艘船。</p>
        <p>所以这条瓦卡独木舟的 12.6 米，是第一版展品数据；日志里还会记录大型远航/仪式独木舟可达 20 米以上，部分资料记录到二三十米。</p>
      </div>
    `,
    dialogue: "这就是船身长度的故事：你走过的不只是木头，而是划手、食物、淡水和航海知识的位置。",
  },
  {
    id: "sail",
    x: 1062,
    y: 278,
    radius: 108,
    title: "三角帆与风向",
    kicker: "航海符号",
    detail: {
      length: "帆面约 5 米",
      use: "借风前进 / 调整航向",
      culture: "太平洋群岛航海传统",
      reason: "用帆角读取风，让船在不同风向里保持前进",
    },
    body: "帆不是装饰。帆面角度会改变受风方式，玩家之后会用帆布纹样解锁风向谜题。",
    dialogue: "帆的角度决定船怎样吃风。下一间展厅，我们会让风线穿过航路。",
  },
  {
    id: "stars",
    x: 720,
    y: 520,
    radius: 104,
    title: "星象导航区",
    kicker: "星象线索",
    detail: {
      length: "夜航线索 1/3",
      use: "辨认方位 / 连接岛屿",
      culture: "群岛航海知识",
      reason: "把星星升落的位置变成可记忆的方向",
    },
    body: "地面星盘把星座、岛屿和船桨符号连成路线。正确连接后，博物馆地图会点亮第一条海路。",
    dialogue: "夜里没有路牌，星星就是路标。先记住这条星线。",
  },
  {
    id: "wave",
    x: 235,
    y: 495,
    radius: 98,
    title: "海浪投影室",
    kicker: "海浪投影室",
    detail: {
      length: "投影节点 1/5",
      use: "潮汐 / 洋流 / 记忆",
      culture: "海洋生态叙事",
      reason: "把船、浪和群岛路线叠在一起，解释远航环境",
    },
    body: "海浪投影会在最终关卡中变成洋流图层。玩家需要把船桨、帆布纹样和星图放进投影台。",
    dialogue: "这里不是背景动画。海浪会告诉你，哪条路顺流，哪条路需要等待。",
  },
  {
    id: "story",
    x: 1028,
    y: 520,
    radius: 96,
    title: "岛民故事墙",
    kicker: "岛屿故事",
    detail: {
      length: "故事页 1/5",
      use: "记录岛屿与航海记忆",
      culture: "太平洋岛民故事",
      reason: "让船只不只是工程，也承载人、地点和迁徙经验",
    },
    body: "故事墙会把展品变成图鉴里的岛屿故事。每解开一个故事，最终太平洋航线图就多一个节点。",
    dialogue: "每艘船都有目的地，也有人记得它为什么出发。",
  },
];

const tabContent = {
  boats: {
    name: "船身长度：斐济 · 瓦卡独木舟",
    length: "12.6 米",
    use: "远航 / 运输 / 探索",
    culture: "斐济（太平洋）",
    reason: "长船身能安排划手、食物、淡水和交换物",
  },
  stories: {
    name: "岛屿故事墙",
    length: "故事页 1/5",
    use: "记录迁徙、交换与海上记忆",
    culture: "太平洋岛民故事",
    reason: "把航海知识放回人和社区的故事里",
  },
  symbols: {
    name: "帆角与风向符号",
    length: "符号 2/8",
    use: "判断顺风、侧风与转向",
    culture: "航海符号系统",
    reason: "让玩家用图案理解风，而不是只读说明文字",
  },
  stars: {
    name: "星象线索",
    length: "线索 1/3",
    use: "夜航方位与岛屿连接",
    culture: "群岛导航经验",
    reason: "把星星升落位置转化为可以记住的路线",
  },
};

function resizeCanvas() {
  canvas.width = BASE.width;
  canvas.height = BASE.height;
  ctx.imageSmoothingEnabled = false;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function updateJournal(data) {
  ui.boatName.textContent = data.name;
  ui.boatLength.textContent = data.length;
  ui.boatUse.textContent = data.use;
  ui.boatCulture.textContent = data.culture;
  ui.boatReason.textContent = data.reason;
}

function activateTab(tabName) {
  state.activeTab = tabName;
  ui.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  updateJournal(tabContent[tabName]);
}

function openHotspot(hotspot) {
  if (!hotspot) return;
  state.cardOpen = true;
  state.unlocked.add(hotspot.id);
  ui.cardKicker.textContent = hotspot.kicker;
  ui.cardTitle.textContent = hotspot.title;
  ui.cardBody.innerHTML = hotspot.bodyHtml ?? hotspot.body;
  ui.exhibitCard.classList.remove("hidden");
  ui.speaker.textContent = "库拉馆长";
  ui.dialogue.innerHTML = hotspot.dialogue;
  ui.questText.textContent = hotspot.id === "canoe" ? "已理解船身长度" : "记录船只故事";
  updateJournal({
    name: hotspot.title,
    ...hotspot.detail,
  });
  ui.unlockCount.textContent = `${Math.min(state.unlocked.size, 5)}/5`;
}

function closeHotspot() {
  state.cardOpen = false;
  ui.exhibitCard.classList.add("hidden");
}

function update(dt) {
  let dx = 0;
  let dy = 0;
  if (state.keys.has("ArrowLeft") || state.keys.has("KeyA")) dx -= 1;
  if (state.keys.has("ArrowRight") || state.keys.has("KeyD")) dx += 1;
  if (state.keys.has("ArrowUp") || state.keys.has("KeyW")) dy -= 1;
  if (state.keys.has("ArrowDown") || state.keys.has("KeyS")) dy += 1;

  if (!state.cardOpen && (dx || dy)) {
    const length = Math.hypot(dx, dy) || 1;
    state.player.x = clamp(state.player.x + (dx / length) * state.player.speed * dt, 130, 1218);
    state.player.y = clamp(state.player.y + (dy / length) * state.player.speed * dt, 230, 650);
    state.player.facing = dx < 0 ? -1 : dx > 0 ? 1 : state.player.facing;
    state.player.walkPhase += dt * 9;
  }

  const nearest = hotspots
    .map((hotspot) => ({ hotspot, distance: distance(state.player, hotspot) }))
    .filter((item) => item.distance < item.hotspot.radius)
    .sort((a, b) => a.distance - b.distance)[0];

  state.currentHotspot = nearest?.hotspot ?? null;
  ui.prompt.textContent = state.currentHotspot?.id === "canoe" ? "E 了解船身长度" : "E 查看展品";
  ui.prompt.classList.toggle("hidden", !state.currentHotspot || state.cardOpen);
}

function rect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function strokeRect(x, y, w, h, color, width = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.strokeRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function text(label, x, y, size = 22, color = "#ffd46e", weight = 800, align = "left") {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px "PingFang SC", "Microsoft YaHei", sans-serif`;
  ctx.textAlign = align;
  ctx.fillText(label, x, y);
  ctx.textAlign = "left";
}

function drawScene() {
  if (referenceReady) {
    ctx.drawImage(referenceImage, 0, 0, BASE.width, BASE.height);
    drawInteractiveLayer();
    return;
  }

  drawMuseumBase();
  drawBackWall();
  drawCanoeExhibit();
  drawSailExhibit();
  drawWaveRoom();
  drawStarZone();
  drawStoryWall();
  drawDisplayCases();
  drawHotspots();
  drawCharacters();
  drawVignette();
}

function drawInteractiveLayer() {
  drawHotspots();
  drawPlayer(state.player.x, state.player.y);
}

function drawMuseumBase() {
  const gradient = ctx.createLinearGradient(0, 0, 0, BASE.height);
  gradient.addColorStop(0, "#07111b");
  gradient.addColorStop(0.33, "#1b2d37");
  gradient.addColorStop(1, "#06111a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, BASE.width, BASE.height);

  rect(0, 0, 1260, 930, "#132936");
  for (let x = 0; x < 1260; x += 48) {
    rect(x, 0, 2, 930, "rgba(255,255,255,0.045)");
  }
  for (let y = 0; y < 930; y += 48) {
    rect(0, y, 1260, 2, "rgba(255,255,255,0.045)");
  }

  rect(0, 0, 1260, 72, "rgba(0,0,0,0.48)");
  rect(0, 678, 1260, 252, "rgba(2,9,14,0.62)");
}

function drawBackWall() {
  rect(230, 42, 820, 142, "#24343d");
  rect(260, 68, 230, 76, "#143946");
  rect(760, 68, 230, 76, "#143946");
  drawPixelWave(280, 88, 190, 42);
  drawPixelWave(780, 88, 190, 42);
  rect(560, 52, 190, 58, "#5b3a1e");
  strokeRect(560, 52, 190, 58, "#9b6a31", 3);
  text("海洋文化寻船记", 585, 90, 28, "#e9b64f", 900);
  rect(585, 122, 140, 70, "#17485f");
  drawIslandWindow(600, 132);
  drawBanner(505, 72, "⚓");
  drawBanner(792, 72, "✦");
}

function drawBanner(x, y, mark) {
  rect(x, y, 34, 112, "#12395c");
  strokeRect(x, y, 34, 112, "#9b6a31", 2);
  text(mark, x + 17, y + 60, 26, "#e8d7a2", 900, "center");
}

function drawIslandWindow(x, y) {
  rect(x, y, 110, 48, "#5fc4e9");
  rect(x, y + 26, 110, 22, "#1b6e95");
  ctx.fillStyle = "#2f8b4f";
  ctx.beginPath();
  ctx.moveTo(x + 34, y + 32);
  ctx.quadraticCurveTo(x + 54, y + 5, x + 82, y + 32);
  ctx.closePath();
  ctx.fill();
}

function drawPixelWave(x, y, w, h) {
  for (let i = 0; i < 8; i += 1) {
    rect(x + i * 22, y + Math.sin(i) * 5 + 20, 42, 8, "rgba(80,211,229,0.28)");
  }
  rect(x, y + h - 8, w, 8, "rgba(80,211,229,0.34)");
}

function labelBox(x, y, label) {
  rect(x, y, 150, 38, "rgba(42,25,11,0.95)");
  strokeRect(x, y, 150, 38, "#9b6a31", 2);
  text(label, x + 75, y + 26, 22, "#ffd46e", 900, "center");
}

function platform(x, y, w, h) {
  rect(x, y, w, h, "#7a4c23");
  strokeRect(x, y, w, h, "#20140b", 5);
  rect(x + 10, y + 10, w - 20, h - 20, "#6a4020");
  for (let px = x + 24; px < x + w; px += 64) {
    rect(px, y + h - 28, 8, 36, "#1b120b");
  }
}

function drawCanoeExhibit() {
  platform(155, 178, 430, 170);
  labelBox(300, 118, "独木舟展厅");
  drawCanoe(190, 224, 335, 70);
  drawInfoStand(520, 285);
}

function drawCanoe(x, y, w, h) {
  ctx.fillStyle = "#6f3a18";
  ctx.beginPath();
  ctx.moveTo(x, y + h * 0.58);
  ctx.quadraticCurveTo(x + w * 0.12, y + h * 0.06, x + w * 0.52, y + h * 0.22);
  ctx.quadraticCurveTo(x + w * 0.9, y + h * 0.04, x + w, y + h * 0.48);
  ctx.quadraticCurveTo(x + w * 0.82, y + h, x + w * 0.16, y + h * 0.83);
  ctx.quadraticCurveTo(x + w * 0.04, y + h * 0.78, x, y + h * 0.58);
  ctx.fill();
  ctx.strokeStyle = "#e0a94d";
  ctx.lineWidth = 4;
  ctx.stroke();
  for (let i = 0; i < 8; i += 1) {
    rect(x + 46 + i * 34, y + 24, 6, 38, "#2b160b");
  }
}

function drawSailExhibit() {
  platform(900, 178, 310, 180);
  labelBox(1030, 120, "船帆展厅");
  rect(1015, 176, 8, 138, "#b9823a");
  ctx.fillStyle = "#e8d4a1";
  ctx.beginPath();
  ctx.moveTo(1024, 180);
  ctx.lineTo(1160, 288);
  ctx.lineTo(982, 306);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#c57a35";
  ctx.lineWidth = 5;
  ctx.stroke();
  drawInfoStand(1186, 286);
}

function drawWaveRoom() {
  rect(80, 430, 300, 175, "rgba(8, 50, 75, 0.9)");
  strokeRect(80, 430, 300, 175, "#1b485d", 6);
  rect(104, 458, 252, 100, "#1a7198");
  for (let i = 0; i < 10; i += 1) {
    rect(110 + i * 24, 514 - Math.sin(i) * 16, 54, 12, "rgba(212,244,255,0.72)");
  }
  labelBox(150, 420, "海浪投影室");
}

function drawStarZone() {
  rect(520, 430, 325, 178, "rgba(12, 64, 80, 0.9)");
  strokeRect(520, 430, 325, 178, "#8b6a32", 4);
  labelBox(620, 410, "星象导航区");
  ctx.strokeStyle = "#d2a54f";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(682, 516, 75, 0, Math.PI * 2);
  ctx.stroke();
  for (let a = 0; a < 12; a += 1) {
    const angle = (a / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(682, 516);
    ctx.lineTo(682 + Math.cos(angle) * 75, 516 + Math.sin(angle) * 75);
    ctx.stroke();
  }
  text("✦", 682, 526, 36, "#ffd46e", 900, "center");
}

function drawStoryWall() {
  platform(880, 440, 285, 150);
  labelBox(970, 405, "岛民故事墙");
  for (let i = 0; i < 4; i += 1) {
    rect(920 + i * 48, 468, 36, 42, "#8f6c39");
    strokeRect(920 + i * 48, 468, 36, 42, "#33200f", 2);
  }
  rect(930, 532, 128, 28, "#2f6f87");
}

function drawDisplayCases() {
  const cases = [
    [470, 635, "船桨"],
    [635, 635, "帆布纹样"],
    [800, 635, "星图"],
    [965, 635, "木箱"],
  ];
  for (const [x, y, label] of cases) {
    rect(x, y, 145, 82, "rgba(220, 244, 255, 0.22)");
    strokeRect(x, y, 145, 82, "#b7894d", 3);
    rect(x + 8, y + 58, 130, 20, "#70491f");
    text(label, x + 72, y + 102, 16, "#e7c777", 800, "center");
  }
}

function drawInfoStand(x, y) {
  rect(x, y, 42, 34, "#e7d7a9");
  strokeRect(x, y, 42, 34, "#4a2c11", 2);
  rect(x + 8, y + 10, 26, 3, "#6f4c24");
  rect(x + 8, y + 18, 22, 3, "#6f4c24");
}

function drawHotspots() {
  for (const hotspot of hotspots) {
    const active = state.currentHotspot?.id === hotspot.id;
    const pulse = Math.sin(performance.now() / 220 + hotspot.x) * 0.2 + 0.8;
    ctx.fillStyle = active ? "#ffd46e" : `rgba(88, 215, 229, ${pulse})`;
    ctx.beginPath();
    ctx.arc(hotspot.x, hotspot.y, active ? 13 : 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = active ? "rgba(255, 212, 110, 0.62)" : "rgba(88, 215, 229, 0.28)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(hotspot.x, hotspot.y, active ? 30 : 22, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawCharacters() {
  drawPlayer(state.player.x, state.player.y);
}

function drawPlayer(x, y) {
  const bob = Math.sin(state.player.walkPhase) * 2;
  if (!assets.player.complete) return;
  ctx.save();
  if (state.player.facing < 0) {
    ctx.translate(x, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(assets.player, -96, y - 126 + bob, 192, 192);
  } else {
    ctx.drawImage(assets.player, x - 96, y - 126 + bob, 192, 192);
  }
  ctx.restore();
}

function drawVignette() {
  const gradient = ctx.createRadialGradient(650, 410, 180, 650, 410, 830);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,0.48)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, BASE.width, BASE.height);
}

function render() {
  ctx.clearRect(0, 0, BASE.width, BASE.height);
  drawScene();
}

let lastFrame = performance.now();
function tick(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  update(dt);
  render();
  requestAnimationFrame(tick);
}

window.addEventListener("keydown", (event) => {
  state.keys.add(event.code);
  if (event.code === "KeyE" && !state.cardOpen) openHotspot(state.currentHotspot);
  if (event.code === "Escape" && state.cardOpen) closeHotspot();
  if (event.code === "KeyJ") {
    state.journalOpen = !state.journalOpen;
    ui.journal.classList.toggle("hidden", !state.journalOpen);
  }
});

window.addEventListener("keyup", (event) => {
  state.keys.delete(event.code);
});

ui.closeCard.addEventListener("click", closeHotspot);
ui.journalClose.addEventListener("click", () => {
  state.journalOpen = false;
  ui.journal.classList.add("hidden");
});

ui.tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateTab(tab.dataset.tab));
});

ui.navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    ui.navButtons.forEach((item) => item.classList.toggle("active", item === button));
    if (button.dataset.view === "journal") {
      state.journalOpen = true;
      ui.journal.classList.remove("hidden");
    }
    if (button.dataset.view === "map") {
      ui.speaker.textContent = "库拉馆长";
      ui.dialogue.innerHTML = "地图上的金色节点，就是已经点亮的展区。蓝色标记是你现在的位置。";
    }
  });
});

ui.itemButtons.forEach((button) => {
  button.addEventListener("click", () => {
    ui.speaker.textContent = "库拉馆长";
    ui.dialogue.innerHTML = `${button.dataset.item}已经写进航海日志。它会在最终航线图里派上用场。`;
  });
});

resizeCanvas();
activateTab("boats");
requestAnimationFrame(tick);
