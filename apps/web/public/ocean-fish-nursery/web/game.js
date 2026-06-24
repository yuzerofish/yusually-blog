(() => {
  const canvas = document.querySelector("#game");
  const ctx = canvas.getContext("2d");
  const ui = {
    coins: document.querySelector("#coins"),
    fishCount: document.querySelector("#fishCount"),
    adultCount: document.querySelector("#adultCount"),
    day: document.querySelector("#day"),
    water: document.querySelector("#water"),
    notice: document.querySelector("#notice"),
    intro: document.querySelector("#intro"),
    startGame: document.querySelector("#startGame"),
    helpButton: document.querySelector("#helpButton"),
    infoButton: document.querySelector("#infoButton"),
    infoPanel: document.querySelector("#infoPanel"),
    closeInfo: document.querySelector("#closeInfo"),
    tools: Array.from(document.querySelectorAll("[data-tool]")),
    actions: Array.from(document.querySelectorAll("[data-action]")),
  };

  const W = 960;
  const H = 640;
  const play = { x: 110, y: 84, w: 740, h: 438 };
  const assets = {
    bg: "assets/generated/ocean_background.png",
    orange: "assets/sprites/fish_orange.png",
    blue: "assets/sprites/fish_blue.png",
    pink: "assets/sprites/fish_pink.png",
    green: "assets/sprites/fish_green.png",
    gold: "assets/sprites/fish_gold.png",
    food: "assets/sprites/food.png",
    seaweed: "assets/sprites/seaweed.png",
    coral: "assets/sprites/coral.png",
    shell: "assets/sprites/shell.png",
    bubble: "assets/sprites/bubble.png",
  };

  const state = {
    loaded: false,
    coins: 120,
    day: 1,
    water: 100,
    tool: "feed",
    fish: [],
    food: [],
    decor: [],
    bubbles: [],
    ripples: [],
    last: performance.now(),
    images: {},
    noticeTimer: 0,
  };

  const babyKeys = ["orange", "blue", "pink", "green"];

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function randomPoint(pad = 34) {
    return {
      x: rand(play.x + pad, play.x + play.w - pad),
      y: rand(play.y + pad, play.y + play.h - pad),
    };
  }

  function loadImages() {
    const jobs = Object.entries(assets).map(
      ([key, src]) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            state.images[key] = img;
            resolve();
          };
          img.onerror = () => reject(new Error(`Failed to load ${src}`));
          img.src = src;
        }),
    );

    return Promise.all(jobs);
  }

  function init() {
    addDecor("coral", 178, 450, 0.28);
    addDecor("seaweed", 225, 180, 0.23);
    addDecor("seaweed", 770, 184, 0.2);
    addDecor("coral", 610, 140, 0.19);
    addDecor("shell", 760, 448, 0.2);

    for (let i = 0; i < 5; i += 1) addFish(randomPoint());
    for (let i = 0; i < 6; i += 1) addBubble(randomPoint(), rand(0.06, 0.12));
    updateHud();
  }

  function addFish(pos) {
    const key = babyKeys[Math.floor(Math.random() * babyKeys.length)];
    state.fish.push({
      x: pos.x,
      y: pos.y,
      target: randomPoint(),
      key,
      adult: false,
      facesRight: true,
      speed: rand(25, 46),
      hunger: rand(0.05, 0.36),
      growth: rand(0, 18),
      scale: rand(0.18, 0.23),
      flip: false,
      bob: rand(0, Math.PI * 2),
    });
  }

  function addFood(x, y) {
    if (state.coins < 3) {
      flash("金币不够");
      return;
    }

    state.coins -= 3;
    state.food.push({
      x,
      y,
      ttl: 16,
      spin: rand(-0.18, 0.18),
      scale: rand(0.08, 0.12),
    });
    addBubble({ x, y: y - 18 }, 0.08);
    addRipple(x, y);
    flash("饲料放好了，小鱼会游过来");
    updateHud();
  }

  function addDecor(type, x, y, scale = rand(0.18, 0.24)) {
    state.decor.push({
      type,
      x,
      y,
      scale,
      rot: rand(-0.08, 0.08),
    });
  }

  function buyFish() {
    if (state.coins < 35) {
      flash("金币不够");
      return;
    }

    state.coins -= 35;
    const p = randomPoint();
    addFish(p);
    addBubble(p, 0.12);
    flash("新小鱼来了，记得投喂");
    updateHud();
  }

  function placeKelp(x, y) {
    if (state.coins < 12) {
      flash("金币不够");
      return;
    }

    state.coins -= 12;
    state.water = Math.min(100, state.water + 5);
    addDecor("seaweed", x, y, rand(0.17, 0.23));
    addRipple(x, y);
    flash("海草会帮助水质变好");
    updateHud();
  }

  function cleanWater() {
    if (state.coins < 18) {
      flash("金币不够");
      return;
    }

    state.coins -= 18;
    state.water = Math.min(100, state.water + 32);
    for (let i = 0; i < 8; i += 1) addBubble(randomPoint(), rand(0.07, 0.13));
    flash("水变干净了");
    updateHud();
  }

  function nextDay() {
    state.day += 1;
    const adultCount = state.fish.filter((f) => f.adult).length;
    const income = adultCount * 18 + state.fish.length * 2;
    state.coins += income;
    state.water = Math.max(20, state.water - 8 - state.food.length * 2);
    state.food = [];
    state.fish.forEach((fish) => {
      fish.hunger = Math.min(1, fish.hunger + 0.25);
    });
    flash(`过了一天，收入 +${income}`);
    updateHud();
  }

  function sellAdult(x, y) {
    let best = null;
    let bestDistance = 72;
    state.fish.forEach((fish) => {
      if (!fish.adult) return;
      const d = Math.hypot(fish.x - x, fish.y - y);
      if (d < bestDistance) {
        best = fish;
        bestDistance = d;
      }
    });

    if (!best) {
      flash("先把小鱼喂成金鱼");
      return;
    }

    state.fish = state.fish.filter((fish) => fish !== best);
    state.coins += 65;
    addBubble(best, 0.15);
    flash("卖出金鱼 +65");
    updateHud();
  }

  function mature(fish) {
    fish.adult = true;
    fish.key = "gold";
    fish.facesRight = false;
    fish.speed = 32;
    fish.scale = 0.2;
    state.coins += 20;
    addBubble(fish, 0.13);
    flash("小鱼长成金鱼了");
  }

  function addBubble(pos, scale) {
    state.bubbles.push({
      x: pos.x + rand(-10, 10),
      y: pos.y + rand(-8, 8),
      startY: pos.y,
      life: rand(2.0, 3.3),
      age: 0,
      scale,
      drift: rand(-10, 10),
    });
  }

  function addRipple(x, y) {
    state.ripples.push({ x, y, age: 0, life: 0.7 });
  }

  function update(dt) {
    state.noticeTimer = Math.max(0, state.noticeTimer - dt);

    state.food.forEach((food) => {
      food.ttl -= dt;
      food.spin += dt * 0.35;
    });
    const spoiled = state.food.filter((food) => food.ttl <= 0).length;
    if (spoiled) {
      state.water = Math.max(20, state.water - spoiled * 3);
      state.food = state.food.filter((food) => food.ttl > 0);
      updateHud();
    }

    state.fish.forEach((fish) => updateFish(fish, dt));

    state.bubbles.forEach((bubble) => {
      bubble.age += dt;
      bubble.y -= dt * 22;
      bubble.x += Math.sin(bubble.age * 2.2) * dt * bubble.drift;
    });
    state.bubbles = state.bubbles.filter((bubble) => bubble.age < bubble.life);

    state.ripples.forEach((ripple) => {
      ripple.age += dt;
    });
    state.ripples = state.ripples.filter((ripple) => ripple.age < ripple.life);

    if (Math.random() < dt * 0.7) addBubble(randomPoint(), rand(0.05, 0.11));
  }

  function updateFish(fish, dt) {
    fish.hunger = clamp(fish.hunger + dt * (0.014 + (100 - state.water) * 0.00022), 0, 1);

    const nearest = nearestFood(fish);
    let target = fish.target;
    if (nearest && fish.hunger > 0.15) {
      target = nearest;
    } else if (distance(fish, target) < 12) {
      fish.target = randomPoint();
      target = fish.target;
    }

    const dx = target.x - fish.x;
    const dy = target.y - fish.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = fish.speed * (1 - fish.hunger * 0.38);
    fish.x += (dx / len) * speed * dt;
    fish.y += (dy / len) * speed * dt;
    fish.x = clamp(fish.x, play.x + 24, play.x + play.w - 24);
    fish.y = clamp(fish.y, play.y + 24, play.y + play.h - 24);
    fish.bob += dt * 4.4;

    if (Math.abs(dx) > 2) {
      fish.flip = fish.facesRight ? dx < 0 : dx > 0;
    }

    if (nearest && distance(fish, nearest) < 24) {
      state.food = state.food.filter((food) => food !== nearest);
      fish.hunger = Math.max(0, fish.hunger - 0.46);
      fish.growth += 26 * clamp(state.water / 100, 0.45, 1);
      addBubble({ x: fish.x, y: fish.y - 18 }, 0.1);
      if (!fish.adult && fish.growth >= 100) mature(fish);
      updateHud();
    }
  }

  function nearestFood(fish) {
    let best = null;
    let bestDistance = Infinity;
    state.food.forEach((food) => {
      const d = (food.x - fish.x) ** 2 + (food.y - fish.y) ** 2;
      if (d < bestDistance) {
        best = food;
        bestDistance = d;
      }
    });
    return best;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawBackground();
    drawPlayArea();

    const drawables = [
      ...state.decor.map((item) => ({ y: item.y, type: "decor", item })),
      ...state.food.map((item) => ({ y: item.y, type: "food", item })),
      ...state.fish.map((item) => ({ y: item.y, type: "fish", item })),
      ...state.bubbles.map((item) => ({ y: item.y, type: "bubble", item })),
    ].sort((a, b) => a.y - b.y);

    drawables.forEach((entry) => {
      if (entry.type === "decor") drawDecor(entry.item);
      if (entry.type === "food") drawFood(entry.item);
      if (entry.type === "fish") drawFish(entry.item);
      if (entry.type === "bubble") drawBubble(entry.item);
    });

    drawRipples();
    drawWaterTint();
  }

  function drawBackground() {
    const img = state.images.bg;
    const scale = Math.max(W / img.width, H / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
  }

  function drawPlayArea() {
    ctx.save();
    ctx.fillStyle = "rgba(211, 255, 235, 0.08)";
    ctx.strokeStyle = "rgba(208, 255, 247, 0.34)";
    ctx.lineWidth = 3;
    roundedRect(play.x, play.y, play.w, play.h, 14);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawDecor(item) {
    const img = state.images[item.type];
    drawImageCentered(img, item.x, item.y, item.scale, false, item.rot, 1);
  }

  function drawFood(item) {
    const img = state.images.food;
    const alpha = clamp(item.ttl / 2, 0.25, 1);
    drawImageCentered(img, item.x, item.y, item.scale, false, item.spin, alpha);
  }

  function drawFish(fish) {
    const img = state.images[fish.key];
    const waterHealth = clamp(state.water / 100, 0.55, 1);
    const bob = Math.sin(fish.bob) * 2.2;
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.filter = `saturate(${80 + waterHealth * 45}%) brightness(${90 + waterHealth * 12}%)`;
    drawImageCentered(img, fish.x, fish.y + bob, fish.scale, fish.flip, 0, 1);
    ctx.restore();

    if (fish.hunger > 0.72) {
      ctx.save();
      ctx.fillStyle = "rgba(255, 245, 156, 0.88)";
      ctx.font = "700 18px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("!", fish.x, fish.y - 34);
      ctx.restore();
    }
  }

  function drawBubble(bubble) {
    const img = state.images.bubble;
    const alpha = clamp(1 - bubble.age / bubble.life, 0, 0.55);
    drawImageCentered(img, bubble.x, bubble.y, bubble.scale, false, 0, alpha);
  }

  function drawRipples() {
    ctx.save();
    state.ripples.forEach((ripple) => {
      const t = ripple.age / ripple.life;
      ctx.strokeStyle = `rgba(221, 255, 248, ${0.36 * (1 - t)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(ripple.x, ripple.y, 18 + t * 28, 8 + t * 13, 0, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawWaterTint() {
    if (state.water > 62) return;
    const t = (62 - state.water) / 42;
    ctx.save();
    ctx.fillStyle = `rgba(28, 98, 88, ${0.18 * t})`;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawImageCentered(img, x, y, scale, flip, rotation, alpha) {
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    if (flip) ctx.scale(-1, 1);
    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
  }

  function roundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function updateHud() {
    const adultCount = state.fish.filter((fish) => fish.adult).length;
    ui.coins.textContent = Math.round(state.coins);
    ui.fishCount.textContent = state.fish.length;
    ui.adultCount.textContent = adultCount;
    ui.day.textContent = `${state.day}天`;
    ui.water.textContent = `${Math.round(state.water)}%`;
  }

  function flash(text) {
    ui.notice.textContent = text;
    ui.notice.classList.remove("is-pop");
    requestAnimationFrame(() => ui.notice.classList.add("is-pop"));
    window.clearTimeout(flash.timer);
    flash.timer = window.setTimeout(() => {
      ui.notice.classList.remove("is-pop");
      ui.notice.textContent = hintForTool(state.tool);
    }, 1400);
  }

  function labelForTool(tool) {
    return { feed: "投喂", kelp: "种海草", sell: "卖金鱼" }[tool] || "投喂";
  }

  function hintForTool(tool) {
    return (
      {
        feed: "选“投喂”，点海面放饲料",
        kelp: "选“种海草”，点海面放海草",
        sell: "选“卖金鱼”，点金鱼出售",
      }[tool] || "选“投喂”，点海面放饲料"
    );
  }

  function setTool(tool) {
    state.tool = tool;
    ui.tools.forEach((button) => {
      const active = button.dataset.tool === tool;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    flash(hintForTool(tool));
  }

  function showIntro() {
    ui.intro.classList.remove("is-hidden");
  }

  function hideIntro() {
    ui.intro.classList.add("is-hidden");
    flash(hintForTool(state.tool));
  }

  function showInfo() {
    ui.infoPanel.classList.remove("is-hidden");
  }

  function hideInfo() {
    ui.infoPanel.classList.add("is-hidden");
  }

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    const client = event.touches ? event.touches[0] : event;
    return {
      x: ((client.clientX - rect.left) / rect.width) * W,
      y: ((client.clientY - rect.top) / rect.height) * H,
    };
  }

  function inPlay(point) {
    return (
      point.x >= play.x &&
      point.x <= play.x + play.w &&
      point.y >= play.y &&
      point.y <= play.y + play.h
    );
  }

  function handlePointer(event) {
    event.preventDefault();
    const p = canvasPoint(event);
    if (!inPlay(p)) return;

    if (state.tool === "feed") addFood(p.x, p.y);
    if (state.tool === "kelp") placeKelp(p.x, p.y);
    if (state.tool === "sell") sellAdult(p.x, p.y);
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - state.last) / 1000);
    state.last = now;
    if (state.loaded) {
      update(dt);
      draw();
    }
    requestAnimationFrame(loop);
  }

  canvas.addEventListener("pointerdown", handlePointer);
  ui.startGame.addEventListener("click", hideIntro);
  ui.helpButton.addEventListener("click", showIntro);
  ui.infoButton.addEventListener("click", showInfo);
  ui.closeInfo.addEventListener("click", hideInfo);
  ui.infoPanel.addEventListener("click", (event) => {
    if (event.target === ui.infoPanel) hideInfo();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideInfo();
  });

  ui.tools.forEach((button) => {
    button.addEventListener("click", () => setTool(button.dataset.tool));
  });

  ui.actions.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "buyFish") buyFish();
      if (action === "clean") cleanWater();
      if (action === "nextDay") nextDay();
    });
  });

  loadImages()
    .then(() => {
      state.loaded = true;
      init();
      requestAnimationFrame(loop);
    })
    .catch((error) => {
      ui.notice.textContent = "素材加载失败";
      console.error(error);
    });
})();
