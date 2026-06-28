const root = document.documentElement;
const stage = document.getElementById("stage");
const baseVideo = document.getElementById("baseVideo");
const fxVideo = document.getElementById("fxVideo");
const slider = document.getElementById("phaseSlider");
const phaseValue = document.getElementById("phaseValue");
const timecode = document.getElementById("timecode");
const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

const videos = [baseVideo, fxVideo];
const DRAG_DISTANCE_MULTIPLIER = 3.2;
const WHEEL_PHASE_STEP = 0.00016;
const WHEEL_SIDE_STEP = 0.00011;
const informationPhrases = [
  "正在加载你的脸",
  "情绪噪声过载",
  "身份样本校验",
  "记忆切片下坠",
  "视觉权限收束",
  "面具同步失败",
  "信号暴雨进入",
  "呼吸频率采样",
  "MASK_07 / LOAD_FACE",
  "TRACE: HUMAN_CONTOUR",
  "SIGNAL RAIN // NO EXIT",
  "FRAGMENT INDEX 01101",
  "WIND PRESSURE +++",
  "0xA9 0x11 0xAF 0x07"
];

let phase = Number(slider.value) / 1000;
let duration = 5.088;
let dpr = 1;
let curtains = [];
let fragments = [];
let dragging = false;
let dragStartX = 0;
let dragStartPhase = 0;
let seekFrame = 0;
let userPausedMusic = false;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function formatTime(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const minutes = Math.floor(safeValue / 60);
  const seconds = Math.floor(safeValue % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function syncVideoTime(targetTime) {
  cancelAnimationFrame(seekFrame);
  seekFrame = requestAnimationFrame(() => {
    videos.forEach((video) => {
      if (Number.isFinite(video.duration) && Math.abs(video.currentTime - targetTime) > 0.035) {
        video.currentTime = targetTime;
      }
    });
  });
}

function setPhase(nextPhase, shouldSeek = true) {
  phase = clamp(nextPhase);
  const percent = `${(phase * 100).toFixed(1)}%`;
  const targetTime = duration * phase;

  slider.value = Math.round(phase * 1000);
  phaseValue.textContent = `${Math.round(phase * 100)}%`;
  timecode.textContent = `${formatTime(targetTime)} / ${formatTime(duration)}`;

  root.style.setProperty("--split", percent);
  root.style.setProperty("--storm", phase.toFixed(3));
  root.style.setProperty("--base-scale", (1.015 + phase * 0.05).toFixed(3));
  root.style.setProperty("--base-x", `${(0.5 - phase) * 12}px`);
  root.style.setProperty("--base-bright", (0.62 + phase * 0.22).toFixed(3));
  root.style.setProperty("--base-sat", (0.76 + phase * 0.2).toFixed(3));
  root.style.setProperty("--fx-scale", (1.035 + phase * 0.11).toFixed(3));
  root.style.setProperty("--fx-x", `${-3 - phase * 22}px`);
  root.style.setProperty("--fx-blur", `${(phase * 1.55).toFixed(2)}px`);
  root.style.setProperty("--fx-opacity", (0.28 + phase * 0.56).toFixed(3));
  root.style.setProperty("--fx-contrast", (1.12 + phase * 0.92).toFixed(3));
  root.style.setProperty("--canvas-opacity", (0.88 - phase * 0.22).toFixed(3));

  if (shouldSeek) {
    syncVideoTime(targetTime);
  }
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(rect.width * dpr));
  canvas.height = Math.max(1, Math.round(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const curtainCount = Math.max(92, Math.round(rect.width / 9));
  curtains = Array.from({ length: curtainCount }, (_, index) => ({
    x: Math.random() * (rect.width + 90) - 45,
    width: Math.random() > 0.72 ? 10 + Math.random() * 24 : 1.5 + Math.random() * 8,
    length: rect.height * (0.36 + Math.random() * 0.66),
    offset: Math.random() * (rect.height + 700),
    speed: 0.038 + Math.random() * 0.12,
    phrase: informationPhrases[index % informationPhrases.length],
    fontSize: 6 + Math.random() * 4,
    tone: Math.random(),
    solid: Math.random() > 0.64,
    bits: Array.from({ length: 28 }, () => ({
      y: Math.random(),
      h: 2 + Math.random() * 46,
      w: 0.25 + Math.random() * 1.15,
      x: Math.random() * 1.5,
      alpha: 0.2 + Math.random() * 0.72,
      text: Math.random() > 0.42
    }))
  }));

  const fragmentCount = Math.max(46, Math.round(rect.width / 24));
  fragments = Array.from({ length: fragmentCount }, (_, index) => ({
    x: Math.random() * rect.width,
    y: Math.random() * rect.height,
    speed: 0.18 + Math.random() * 0.6,
    drift: 0.4 + Math.random() * 1.8,
    size: 8 + Math.random() * 7,
    text: informationPhrases[index % informationPhrases.length],
    tone: Math.random()
  }));
}

function drawCurtain(now, width, height) {
  const pressure = clamp(1.05 - phase * 0.88, 0.34, 1.05);
  const topFog = ctx.createLinearGradient(0, 0, 0, height * 0.72);
  topFog.addColorStop(0, `rgba(244, 247, 245, ${0.12 + pressure * 0.18})`);
  topFog.addColorStop(0.38, `rgba(12, 14, 16, ${0.08 + pressure * 0.18})`);
  topFog.addColorStop(1, "rgba(5, 6, 8, 0)");
  ctx.fillStyle = topFog;
  ctx.fillRect(0, 0, width, height * 0.74);

  curtains.forEach((column, index) => {
    const cycle = height + column.length + 260;
    const y = ((now * column.speed + column.offset) % cycle) - column.length - 130;
    const fallSkew = Math.sin(now * 0.0012 + index) * (2 + pressure * 8);
    const x = column.x + fallSkew + (phase - 0.25) * index * 0.015;
    const visibleLength = column.length * (0.82 + pressure * 0.36);
    const columnAlpha = clamp(0.18 + pressure * 0.58 + column.tone * 0.18, 0.16, 0.92);

    ctx.save();
    ctx.beginPath();
    ctx.rect(x - 2, Math.min(y, 0), column.width + 5, visibleLength + 150);
    ctx.clip();

    if (column.solid) {
      const isDark = column.tone > 0.44;
      ctx.fillStyle = isDark
        ? `rgba(0, 3, 6, ${0.22 + pressure * 0.54})`
        : `rgba(244, 247, 245, ${0.2 + pressure * 0.42})`;
      ctx.fillRect(x, y, column.width, visibleLength);
    }

    column.bits.forEach((bit, bitIndex) => {
      const bitY = y + bit.y * visibleLength;
      if (bitY < -50 || bitY > height + 30) {
        return;
      }

      const pulse = 0.76 + Math.sin(now * 0.006 + index + bitIndex) * 0.24;
      const alpha = clamp(bit.alpha * columnAlpha * pulse, 0.08, 0.86);

      if (bit.text) {
        const whiteInk = column.tone < 0.48;
        ctx.font = `${column.fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
        ctx.fillStyle = whiteInk
          ? `rgba(236, 241, 240, ${alpha})`
          : `rgba(0, 4, 8, ${alpha})`;
        ctx.fillText(column.phrase, x + 1, bitY);
      } else {
        const blockWidth = Math.max(1, column.width * bit.w);
        ctx.fillStyle = column.tone > 0.5
          ? `rgba(0, 3, 6, ${alpha})`
          : `rgba(244, 247, 245, ${alpha})`;
        ctx.fillRect(x + bit.x, bitY, blockWidth, bit.h);
      }
    });

    const edgeAlpha = clamp(columnAlpha * pressure, 0.1, 0.68);
    ctx.fillStyle = `rgba(255, 255, 255, ${edgeAlpha * 0.34})`;
    ctx.fillRect(x + column.width - 1, y, 1, visibleLength);
    ctx.restore();
  });
}

function drawFragments(now, width, height) {
  ctx.globalCompositeOperation = "screen";
  fragments.forEach((drop, index) => {
    const speed = drop.speed * (0.56 + phase * 2.05);
    const wind = (phase - 0.16) * 0.07 * now * drop.drift;
    const x = (drop.x + wind + Math.sin(now * 0.0011 + index) * 20 + width * 3) % (width + 140) - 70;
    const y = (drop.y + now * 0.033 * speed) % (height + 80) - 40;
    const alpha = 0.08 + phase * 0.34 + Math.sin(now * 0.003 + index) * 0.06;
    const hue = drop.tone > 0.82 ? "255, 184, 92" : drop.tone > 0.62 ? "239, 93, 114" : "120, 242, 255";

    ctx.font = `${drop.size + phase * 4}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.fillStyle = `rgba(${hue}, ${clamp(alpha, 0.03, 0.46)})`;
    ctx.fillText(drop.text, x, y);

    if (index % 4 === 0) {
      ctx.fillRect(x - phase * 38, y + 4, 28 + phase * 84, 1);
    }
  });
  ctx.globalCompositeOperation = "source-over";
}

function drawRain(now) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  ctx.clearRect(0, 0, width, height);
  drawCurtain(now, width, height);
  drawFragments(now, width, height);
  requestAnimationFrame(drawRain);
}

function handlePointerMove(event) {
  if (!dragging) {
    return;
  }
  const rect = stage.getBoundingClientRect();
  const travel = rect.width * DRAG_DISTANCE_MULTIPLIER;
  setPhase(dragStartPhase + (event.clientX - dragStartX) / travel);
}

function updateMusicButton() {
  const isPlaying = !music.paused;
  musicToggle.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute("aria-label", isPlaying ? "暂停背景音乐" : "播放背景音乐");
  musicToggle.title = isPlaying ? "暂停背景音乐" : "播放背景音乐";
}

async function playMusicFromGesture() {
  if (userPausedMusic || !music.paused) {
    return;
  }

  try {
    await music.play();
  } catch {
    // Browsers may still block sound until a direct gesture; the button remains available.
  } finally {
    updateMusicButton();
  }
}

async function tryAutoplayMusic() {
  if (userPausedMusic || !music.paused) {
    return;
  }

  try {
    await music.play();
  } catch {
    // Some browsers block unmuted autoplay; gesture playback remains as a fallback.
  } finally {
    updateMusicButton();
  }
}

function initVideo(video) {
  video.pause();
  video.muted = true;
  video.playsInline = true;
}

videos.forEach((video) => {
  initVideo(video);
  video.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(baseVideo.duration)) {
      duration = baseVideo.duration;
    }
    stage.classList.add("is-loaded");
    setPhase(phase);
  });
});

slider.addEventListener("input", () => {
  playMusicFromGesture();
  setPhase(Number(slider.value) / 1000);
});

stage.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, input")) {
    return;
  }
  playMusicFromGesture();
  dragging = true;
  dragStartX = event.clientX;
  dragStartPhase = phase;
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener("pointermove", handlePointerMove);

stage.addEventListener("pointerup", (event) => {
  dragging = false;
  stage.releasePointerCapture(event.pointerId);
});

stage.addEventListener("pointercancel", () => {
  dragging = false;
});

stage.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    playMusicFromGesture();
    setPhase(phase + event.deltaY * WHEEL_PHASE_STEP + event.deltaX * WHEEL_SIDE_STEP);
  },
  { passive: false }
);

music.volume = 0.72;
music.autoplay = true;
musicToggle.addEventListener("pointerdown", (event) => {
  event.stopPropagation();
});

musicToggle.addEventListener("click", async () => {
  try {
    if (music.paused) {
      userPausedMusic = false;
      await music.play();
    } else {
      userPausedMusic = true;
      music.pause();
    }
  } finally {
    updateMusicButton();
  }
});

music.addEventListener("play", updateMusicButton);
music.addEventListener("pause", updateMusicButton);
music.addEventListener("canplay", tryAutoplayMusic, { once: true });
window.addEventListener("load", tryAutoplayMusic);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    tryAutoplayMusic();
  }
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
setPhase(phase, false);
tryAutoplayMusic();
setTimeout(tryAutoplayMusic, 350);
setTimeout(tryAutoplayMusic, 1200);
requestAnimationFrame(drawRain);
