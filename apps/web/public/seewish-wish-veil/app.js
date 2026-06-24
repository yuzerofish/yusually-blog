(() => {
  "use strict";

  const canvas = document.getElementById("wishCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  const cameraVideo = document.getElementById("cameraBackground");
  const startOverlay = document.getElementById("startOverlay");
  const startButton = document.getElementById("startButton");
  const permissionNote = document.getElementById("permissionNote");
  const mediaInput = document.getElementById("mediaInput");
  const flipCameraButton = document.getElementById("flipCamera");
  const scaleSlider = document.getElementById("scaleSlider");
  const toggleUIButton = document.getElementById("toggleUI");
  const stateLine = document.getElementById("stateLine");

  const restoreForce = 0.0011;
  window.restoreForce = restoreForce;

  const state = {
    dpr: 1,
    width: 0,
    height: 0,
    cols: 36,
    rows: 22,
    points: [],
    springs: [],
    veil: { x: 0, y: 0, width: 0, height: 0 },
    pointer: null,
    releasePulse: 0,
    media: null,
    mediaUrl: "",
    mediaKind: "placeholder",
    mediaAspect: 1.6,
    assetTexture: null,
    placeholderTexture: null,
    zoom: 1,
    stream: null,
    facingMode: "user",
    uiHidden: false,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    lastTime: performance.now(),
  };

  const dropDescription =
    "Drop state: The vision canvas slowly returns to its original position with a soft glowing rebound, as if a floating wish veil is settling back into calm.";

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function pointIndex(col, row) {
    return row * (state.cols + 1) + col;
  }

  function pointAt(col, row) {
    return state.points[pointIndex(col, row)];
  }

  function createPlaceholderTexture() {
    const texture = document.createElement("canvas");
    texture.width = 1600;
    texture.height = 1000;
    const g = texture.getContext("2d");

    const base = g.createLinearGradient(0, 0, texture.width, texture.height);
    base.addColorStop(0, "rgba(255, 219, 242, 0.94)");
    base.addColorStop(0.44, "rgba(200, 234, 255, 0.92)");
    base.addColorStop(1, "rgba(225, 213, 255, 0.96)");
    g.fillStyle = base;
    g.fillRect(0, 0, texture.width, texture.height);

    const veil = g.createLinearGradient(
      0,
      texture.height * 0.12,
      texture.width,
      texture.height * 0.88,
    );
    veil.addColorStop(0, "rgba(255, 255, 255, 0.54)");
    veil.addColorStop(0.35, "rgba(255, 211, 239, 0.34)");
    veil.addColorStop(0.72, "rgba(182, 228, 255, 0.38)");
    veil.addColorStop(1, "rgba(255, 255, 255, 0.42)");
    g.fillStyle = veil;
    g.fillRect(0, 0, texture.width, texture.height);

    g.save();
    g.globalAlpha = 0.18;
    g.strokeStyle = "rgba(255, 255, 255, 0.72)";
    g.lineWidth = 2;
    for (let y = 80; y < texture.height; y += 62) {
      g.beginPath();
      g.moveTo(0, y);
      for (let x = 0; x <= texture.width; x += 80) {
        const wave = Math.sin(x * 0.008 + y * 0.015) * 12;
        g.lineTo(x, y + wave);
      }
      g.stroke();
    }
    g.restore();

    state.placeholderTexture = texture;
  }

  function loadGeneratedTexture() {
    const image = new Image();
    image.onload = () => {
      state.assetTexture = image;
    };
    image.src = "./assets/wish-veil-texture.png";
  }

  function getMediaAspect() {
    if (state.mediaKind === "image" && state.media) {
      return state.media.naturalWidth / state.media.naturalHeight;
    }
    if (
      state.mediaKind === "video" &&
      state.media &&
      state.media.videoWidth &&
      state.media.videoHeight
    ) {
      return state.media.videoWidth / state.media.videoHeight;
    }
    return 1.6;
  }

  function getTextureSource() {
    if (state.mediaKind === "image" && state.media) {
      return state.media;
    }
    if (state.mediaKind === "video" && state.media && state.media.readyState >= 2) {
      return state.media;
    }
    return state.assetTexture || state.placeholderTexture;
  }

  function getTextureSize(source) {
    if (source instanceof HTMLVideoElement) {
      return { width: source.videoWidth || 1280, height: source.videoHeight || 720 };
    }
    if (source instanceof HTMLImageElement) {
      return {
        width: source.naturalWidth || source.width,
        height: source.naturalHeight || source.height,
      };
    }
    return { width: source.width, height: source.height };
  }

  function computeVeilRect() {
    const aspect = getMediaAspect();
    state.mediaAspect = aspect;

    const edge = Math.max(18, Math.min(state.width, state.height) * 0.045);
    const maxWidth = Math.min(state.width * 0.85 * state.zoom, state.width - edge * 2);
    const maxHeight = Math.min(state.height * 0.55 * state.zoom, state.height - edge * 2);
    let width = maxWidth;
    let height = width / aspect;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspect;
    }

    return {
      x: (state.width - width) / 2,
      y: state.height * 0.48 - height / 2,
      width,
      height,
    };
  }

  function addSpring(a, b, stiffness = 0.16) {
    const pa = state.points[a];
    const pb = state.points[b];
    const dx = pb.homeX - pa.homeX;
    const dy = pb.homeY - pa.homeY;
    state.springs.push({
      a,
      b,
      rest: Math.hypot(dx, dy),
      stiffness,
    });
  }

  function rebuildVeilGrid() {
    state.veil = computeVeilRect();
    const density = state.width < 680 ? 28 : 38;
    state.cols = density;
    state.rows = clamp(Math.round((state.veil.height / state.veil.width) * density), 13, 30);
    state.points = [];
    state.springs = [];

    for (let row = 0; row <= state.rows; row += 1) {
      for (let col = 0; col <= state.cols; col += 1) {
        const u = col / state.cols;
        const v = row / state.rows;
        const baseX = state.veil.x + u * state.veil.width;
        const baseY = state.veil.y + v * state.veil.height;
        const edgeAmp = Math.min(state.veil.width, state.veil.height) * 0.016;
        const interiorAmp = edgeAmp * 0.34;
        const topWave = row === 0 ? Math.sin(u * Math.PI * 3.2 + 0.35) * edgeAmp : 0;
        const bottomWave = row === state.rows ? Math.sin(u * Math.PI * 2.8 + 1.1) * edgeAmp : 0;
        const sideWave =
          col === 0 || col === state.cols
            ? Math.sin(v * Math.PI * 2.6 + (col === 0 ? 0.8 : 2.1)) * edgeAmp * 0.42
            : 0;
        const x =
          baseX +
          sideWave +
          Math.sin(u * Math.PI * 2 + v * Math.PI * 2.4) * interiorAmp * Math.sin(v * Math.PI);
        const y =
          baseY +
          topWave +
          bottomWave +
          Math.cos(u * Math.PI * 2.6 + v * Math.PI * 2) * interiorAmp * Math.sin(u * Math.PI);
        state.points.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          col,
          row,
        });
      }
    }

    for (let row = 0; row <= state.rows; row += 1) {
      for (let col = 0; col <= state.cols; col += 1) {
        const current = pointIndex(col, row);
        if (col < state.cols) addSpring(current, pointIndex(col + 1, row), 0.14);
        if (row < state.rows) addSpring(current, pointIndex(col, row + 1), 0.14);
        if (col < state.cols && row < state.rows)
          addSpring(current, pointIndex(col + 1, row + 1), 0.08);
        if (col > 0 && row < state.rows) addSpring(current, pointIndex(col - 1, row + 1), 0.08);
      }
    }
  }

  function resizeCanvas() {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    canvas.width = Math.round(state.width * state.dpr);
    canvas.height = Math.round(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    createPlaceholderTexture();
    rebuildVeilGrid();
  }

  function relaxSprings() {
    for (let pass = 0; pass < 2; pass += 1) {
      for (const spring of state.springs) {
        const a = state.points[spring.a];
        const b = state.points[spring.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.hypot(dx, dy) || 0.0001;
        const change = ((distance - spring.rest) / distance) * spring.stiffness;
        const offsetX = dx * change * 0.5;
        const offsetY = dy * change * 0.5;
        a.x += offsetX;
        a.y += offsetY;
        b.x -= offsetX;
        b.y -= offsetY;
      }
    }
  }

  function stepPhysics(now) {
    const dt = clamp((now - state.lastTime) / 16.67, 0.35, 2);
    state.lastTime = now;

    const releaseGravity = state.reducedMotion ? 0 : state.releasePulse * 0.018;
    const idleForce = state.reducedMotion ? 0 : 0.00018;
    const damping = Math.pow(0.986, dt);

    for (const point of state.points) {
      const rowWeight = 0.45 + point.row / state.rows;
      point.vx += (point.homeX - point.x) * restoreForce * dt;
      point.vy += (point.homeY - point.y) * restoreForce * dt;
      point.vy += releaseGravity * rowWeight * dt;
      point.vy += Math.sin(now * 0.00115 + point.col * 0.42 + point.row * 0.21) * idleForce * dt;
      point.vx *= damping;
      point.vy *= damping;
      point.x += point.vx * dt;
      point.y += point.vy * dt;
    }

    relaxSprings();

    if (state.releasePulse > 0) {
      state.releasePulse *= Math.pow(0.992, dt);
      if (state.releasePulse < 0.008) state.releasePulse = 0;
    }
  }

  function nudgeVeil(x, y, dx, dy, impulse = 1) {
    const radius = Math.max(120, Math.min(state.veil.width, state.veil.height) * 0.38);
    for (const point of state.points) {
      const distance = Math.hypot(point.x - x, point.y - y);
      if (distance > radius) continue;
      const falloff = (1 - distance / radius) ** 2;
      const rowWeight = 0.72 + (point.row / state.rows) * 0.38;
      point.x += dx * falloff * impulse;
      point.y += dy * falloff * impulse * rowWeight;
      point.vx += dx * falloff * 0.045 * impulse;
      point.vy += dy * falloff * 0.045 * impulse * rowWeight;
    }
  }

  function eventPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function insideVeil(x, y) {
    const padding = 42;
    return (
      x >= state.veil.x - padding &&
      x <= state.veil.x + state.veil.width + padding &&
      y >= state.veil.y - padding &&
      y <= state.veil.y + state.veil.height + padding
    );
  }

  function handlePointerDown(event) {
    const point = eventPoint(event);
    if (!insideVeil(point.x, point.y)) return;
    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    state.pointer = {
      id: event.pointerId,
      x: point.x,
      y: point.y,
    };
    state.releasePulse = 0;
    nudgeVeil(point.x, point.y, 0, 9, 0.55);
    stateLine.textContent = "The wish veil is being gently pulled.";
  }

  function handlePointerMove(event) {
    if (!state.pointer || state.pointer.id !== event.pointerId) return;
    event.preventDefault();
    const point = eventPoint(event);
    const dx = clamp(point.x - state.pointer.x, -34, 34);
    const dy = clamp(point.y - state.pointer.y, -34, 34);
    state.pointer.x = point.x;
    state.pointer.y = point.y;
    nudgeVeil(point.x, point.y, dx, dy, 0.95);
  }

  function releasePointer(event) {
    if (!state.pointer || state.pointer.id !== event.pointerId) return;
    event.preventDefault();
    canvas.releasePointerCapture(event.pointerId);
    state.pointer = null;
    state.releasePulse = 1;
    stateLine.textContent = dropDescription;
  }

  function traceVeilPath() {
    ctx.beginPath();
    const topLeft = pointAt(0, 0);
    ctx.moveTo(topLeft.x, topLeft.y);
    for (let col = 1; col <= state.cols; col += 1) {
      const p = pointAt(col, 0);
      ctx.lineTo(p.x, p.y);
    }
    for (let row = 1; row <= state.rows; row += 1) {
      const p = pointAt(state.cols, row);
      ctx.lineTo(p.x, p.y);
    }
    for (let col = state.cols - 1; col >= 0; col -= 1) {
      const p = pointAt(col, state.rows);
      ctx.lineTo(p.x, p.y);
    }
    for (let row = state.rows - 1; row > 0; row -= 1) {
      const p = pointAt(0, row);
      ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
  }

  function drawVeilGlow() {
    ctx.save();
    traceVeilPath();
    ctx.shadowColor = "rgba(156, 127, 255, 0.42)";
    ctx.shadowBlur = 46;
    ctx.fillStyle = "rgba(229, 219, 255, 0.18)";
    ctx.fill();
    ctx.restore();
  }

  function drawTexturedCell(source, sx, sy, sw, sh, p00, p10, p11, p01) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p00.x, p00.y);
    ctx.lineTo(p10.x, p10.y);
    ctx.lineTo(p11.x, p11.y);
    ctx.lineTo(p01.x, p01.y);
    ctx.closePath();
    ctx.clip();
    ctx.transform(
      (p10.x - p00.x) / sw,
      (p10.y - p00.y) / sw,
      (p01.x - p00.x) / sh,
      (p01.y - p00.y) / sh,
      p00.x,
      p00.y,
    );
    ctx.drawImage(source, sx, sy, sw, sh, 0, 0, sw, sh);
    ctx.restore();
  }

  function drawTextureCells(source, alpha, compositeOperation = "source-over") {
    if (!source) return;

    const { width: textureWidth, height: textureHeight } = getTextureSize(source);
    const cellWidth = textureWidth / state.cols;
    const cellHeight = textureHeight / state.rows;

    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = compositeOperation;

    for (let row = 0; row < state.rows; row += 1) {
      for (let col = 0; col < state.cols; col += 1) {
        const p00 = pointAt(col, row);
        const p10 = pointAt(col + 1, row);
        const p11 = pointAt(col + 1, row + 1);
        const p01 = pointAt(col, row + 1);
        drawTexturedCell(
          source,
          col * cellWidth,
          row * cellHeight,
          cellWidth,
          cellHeight,
          p00,
          p10,
          p11,
          p01,
        );
      }
    }

    ctx.restore();
  }

  function drawVeilTexture() {
    const source = getTextureSource();
    drawTextureCells(source, state.mediaKind === "placeholder" ? 0.9 : 0.74);

    if (state.mediaKind !== "placeholder" && state.assetTexture) {
      drawTextureCells(state.assetTexture, 0.18, "screen");
    }
  }

  function drawPlaceholderPrompt() {
    if (state.mediaKind !== "placeholder") return;

    ctx.save();
    traceVeilPath();
    ctx.clip();
    const centerX = state.veil.x + state.veil.width * 0.5;
    const centerY = state.veil.y + state.veil.height * 0.51;
    const maxWidth = state.veil.width * 0.86;
    let fontSize = clamp(state.veil.width * 0.048, 16, 34);
    let lines = [];

    const wrapPrompt = () => {
      const words = "What image is appearing in your mind?".split(" ");
      const result = [];
      let current = "";
      for (const word of words) {
        const next = current ? `${current} ${word}` : word;
        if (ctx.measureText(next).width <= maxWidth || !current) {
          current = next;
        } else {
          result.push(current);
          current = word;
        }
      }
      if (current) result.push(current);
      return result;
    };

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    do {
      ctx.font = `760 ${fontSize}px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      lines = wrapPrompt();
      if (lines.length <= 2 || fontSize <= 14) break;
      fontSize -= 1;
    } while (fontSize > 14);

    const lineHeight = fontSize * 1.18;
    const startY = centerY - ((lines.length - 1) * lineHeight) / 2;
    ctx.shadowColor = "rgba(255, 255, 255, 0.82)";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "rgba(43, 38, 76, 0.72)";
    lines.forEach((line, index) => {
      ctx.fillText(line, centerX, startY + index * lineHeight, maxWidth);
    });
    ctx.restore();
  }

  function drawVeilOverlay(now) {
    ctx.save();
    traceVeilPath();
    const glow = ctx.createLinearGradient(
      state.veil.x,
      state.veil.y,
      state.veil.x + state.veil.width,
      state.veil.y + state.veil.height,
    );
    glow.addColorStop(0, "rgba(255, 232, 247, 0.34)");
    glow.addColorStop(0.46, "rgba(186, 232, 255, 0.2)");
    glow.addColorStop(1, "rgba(225, 213, 255, 0.34)");
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = glow;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 0.75;

    for (let row = 0; row <= state.rows; row += 4) {
      ctx.beginPath();
      const first = pointAt(0, row);
      ctx.moveTo(first.x, first.y);
      for (let col = 1; col <= state.cols; col += 1) {
        const p = pointAt(col, row);
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }

    for (let col = 0; col <= state.cols; col += 5) {
      ctx.beginPath();
      const first = pointAt(col, 0);
      ctx.moveTo(first.x, first.y);
      for (let row = 1; row <= state.rows; row += 1) {
        const p = pointAt(col, row);
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    traceVeilPath();
    const shimmerX = state.reducedMotion
      ? state.veil.x + state.veil.width * 0.56
      : state.veil.x + ((now * 0.025) % (state.veil.width * 1.6)) - state.veil.width * 0.3;
    const shimmer = ctx.createLinearGradient(
      shimmerX - 80,
      state.veil.y,
      shimmerX + 80,
      state.veil.y + state.veil.height,
    );
    shimmer.addColorStop(0, "rgba(255, 255, 255, 0)");
    shimmer.addColorStop(0.5, "rgba(255, 255, 255, 0.24)");
    shimmer.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = shimmer;
    ctx.fill();
    ctx.restore();

    ctx.save();
    traceVeilPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.68)";
    ctx.lineWidth = 1.2;
    ctx.shadowColor = "rgba(191, 232, 255, 0.72)";
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.restore();

    drawPlaceholderPrompt();
  }

  function drawFrame(now) {
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    ctx.clearRect(0, 0, state.width, state.height);
    stepPhysics(now);
    drawVeilGlow();
    drawVeilTexture();
    drawVeilOverlay(now);
    requestAnimationFrame(drawFrame);
  }

  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Camera is not available in this browser.");
    }

    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
      state.stream = null;
    }

    const constraints = {
      audio: false,
      video: {
        facingMode: { ideal: state.facingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    };

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    }

    state.stream = stream;
    cameraVideo.srcObject = stream;
    document.body.classList.add("camera-ready");
    document.body.classList.toggle("mirror-camera", state.facingMode === "user");
    await cameraVideo.play();
  }

  async function handleStart() {
    startButton.disabled = true;
    startButton.textContent = "Starting";
    permissionNote.textContent = "Requesting camera access.";

    try {
      await startCamera();
      permissionNote.textContent = "Camera is ready.";
    } catch (error) {
      permissionNote.textContent = "Camera was not available, but the wish veil is ready.";
      document.body.classList.remove("camera-ready");
    }

    startOverlay.classList.add("is-hidden");
    startButton.disabled = false;
    startButton.textContent = "Start";
  }

  async function flipCamera() {
    state.facingMode = state.facingMode === "user" ? "environment" : "user";
    flipCameraButton.disabled = true;
    try {
      await startCamera();
      stateLine.textContent =
        state.facingMode === "user"
          ? "Front camera glow is active."
          : "Back camera glow is active.";
    } catch (error) {
      stateLine.textContent = "Camera could not be flipped on this device.";
    } finally {
      flipCameraButton.disabled = false;
    }
  }

  function clearMediaUrl() {
    if (state.mediaUrl) {
      URL.revokeObjectURL(state.mediaUrl);
      state.mediaUrl = "";
    }
  }

  function loadImage(file) {
    clearMediaUrl();
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      state.media = image;
      state.mediaUrl = url;
      state.mediaKind = "image";
      state.mediaAspect = image.naturalWidth / image.naturalHeight;
      rebuildVeilGrid();
      stateLine.textContent = "Image is appearing on the wish veil.";
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      stateLine.textContent = "The image could not be loaded.";
    };
    image.src = url;
  }

  function loadVideo(file) {
    clearMediaUrl();
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.addEventListener(
      "loadedmetadata",
      () => {
        state.media = video;
        state.mediaUrl = url;
        state.mediaKind = "video";
        state.mediaAspect = video.videoWidth / video.videoHeight;
        rebuildVeilGrid();
        video.play().catch(() => undefined);
        stateLine.textContent = "Video is appearing on the wish veil.";
      },
      { once: true },
    );
    video.addEventListener(
      "error",
      () => {
        URL.revokeObjectURL(url);
        stateLine.textContent = "The video could not be loaded.";
      },
      { once: true },
    );
  }

  function handleMediaInput(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (file.type.startsWith("image/")) {
      loadImage(file);
    } else if (file.type.startsWith("video/")) {
      loadVideo(file);
    } else {
      stateLine.textContent = "Please upload an image or video.";
    }
    event.target.value = "";
  }

  function handleScaleInput(event) {
    state.zoom = Number(event.target.value);
    rebuildVeilGrid();
  }

  function toggleUI() {
    state.uiHidden = !state.uiHidden;
    document.body.classList.toggle("ui-hidden", state.uiHidden);
    toggleUIButton.textContent = state.uiHidden ? "UI" : "Hide";
    toggleUIButton.setAttribute("aria-label", state.uiHidden ? "Show controls" : "Hide controls");
  }

  function preventMobileZoom() {
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchmove",
      (event) => {
        if (event.touches.length > 1) event.preventDefault();
      },
      { passive: false },
    );
    document.addEventListener(
      "touchend",
      (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) event.preventDefault();
        lastTouchEnd = now;
      },
      { passive: false },
    );
    for (const name of ["gesturestart", "gesturechange", "gestureend"]) {
      document.addEventListener(name, (event) => event.preventDefault(), { passive: false });
    }
  }

  function bindEvents() {
    startButton.addEventListener("click", handleStart);
    flipCameraButton.addEventListener("click", flipCamera);
    mediaInput.addEventListener("change", handleMediaInput);
    scaleSlider.addEventListener("input", handleScaleInput);
    toggleUIButton.addEventListener("click", toggleUI);

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", releasePointer);
    canvas.addEventListener("pointercancel", releasePointer);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("orientationchange", () => setTimeout(resizeCanvas, 120));
    window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", (event) => {
      state.reducedMotion = event.matches;
    });
  }

  function exposeDebugHooks() {
    window.__seewishDebug = {
      get mediaKind() {
        return state.mediaKind;
      },
      get restoreForce() {
        return restoreForce;
      },
      veil() {
        return {
          x: state.veil.x,
          y: state.veil.y,
          width: state.veil.width,
          height: state.veil.height,
          aspect: state.veil.width / state.veil.height,
          mediaAspect: state.mediaAspect,
          cols: state.cols,
          rows: state.rows,
        };
      },
      samplePoints() {
        let maxDistance = 0;
        let totalDistance = 0;
        for (const point of state.points) {
          const distance = Math.hypot(point.x - point.homeX, point.y - point.homeY);
          maxDistance = Math.max(maxDistance, distance);
          totalDistance += distance;
        }
        const center = pointAt(Math.floor(state.cols / 2), Math.floor(state.rows / 2));
        return {
          maxDistance,
          averageDistance: totalDistance / state.points.length,
          centerOffset: {
            x: center.x - center.homeX,
            y: center.y - center.homeY,
          },
        };
      },
    };
  }

  createPlaceholderTexture();
  loadGeneratedTexture();
  resizeCanvas();
  bindEvents();
  exposeDebugHooks();
  preventMobileZoom();
  requestAnimationFrame(drawFrame);
})();
