const state = {
  research: null,
  theme: "",
  sort: "heat",
  query: "",
  cardsExpanded: false,
  themesExpanded: false,
};

const $ = (selector) => document.querySelector(selector);
const CARD_PREVIEW_LIMIT = 8;
const THEME_PREVIEW_LIMIT = 6;

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

function setThemeVars(accent) {
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--bg2", mixBackground(accent));
}

function mixBackground(accent) {
  const map = {
    "#00d4d8": "#101719",
    "#ffb000": "#19140a",
    "#d7ff60": "#13190d",
    "#ff4d2e": "#1a0d0a",
    "#8fe1ff": "#0d151a",
  };
  return map[accent] || "#12140f";
}

function sourceMap() {
  return Object.fromEntries(state.research.sources.map((source) => [source.id, source]));
}

function comedianMatches(item) {
  const themeMatch = !state.theme || item.themes.includes(state.theme);
  const text = [
    item.name,
    item.role,
    item.style,
    item.targets.join(" "),
    item.themes.join(" "),
    item.shows.join(" "),
  ]
    .join(" ")
    .toLowerCase();
  const queryMatch = !state.query || text.includes(state.query.toLowerCase());
  return themeMatch && queryMatch;
}

function sortedComedians() {
  const items = state.research.comedians.filter(comedianMatches);
  const sorters = {
    heat: (a, b) => b.heat - a.heat,
    stage: (a, b) => b.stageMinutes - a.stageMinutes,
    name: (a, b) => a.name.localeCompare(b.name, "zh-Hans-CN"),
  };
  return items.sort(sorters[state.sort] || sorters.heat);
}

function renderHeroSummary() {
  const summary = state.research.summary;
  $("#heroSample").textContent = summary.sampleSize;
  $("#heroMinutes").textContent = formatNumber(summary.totalEstimatedStageMinutes);
  $("#heroHeat").textContent = summary.averageHeat;
}

function renderTimeline() {
  const mount = $("#timelineMount");
  mount.innerHTML = state.research.timeline
    .map(
      (item) => `
        <article class="year-card chapter" data-year="${item.year}" data-title="${item.title}" data-accent="${item.accent}" style="--card-accent:${item.accent}">
          <img src="${item.image}" alt="">
          <div class="year-number">${item.year}</div>
          <div class="year-body">
            <p class="kicker">${item.metric}</p>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
            <div class="name-strip">${item.names.map((name) => `<span>${name}</span>`).join("")}</div>
            ${item.goldenQuote ? `<div class="year-quote"><blockquote>${item.goldenQuote.quote}</blockquote><cite>—— ${item.goldenQuote.by}</cite></div>` : ""}
          </div>
        </article>
      `,
    )
    .join("");
}

function renderQuoteStrip() {
  const strip = $("#quoteStrip");
  const goldenQuotes = state.research.goldenQuotes || {};
  if (!state.theme || !goldenQuotes[state.theme]) {
    strip.hidden = true;
    return;
  }
  const qs = goldenQuotes[state.theme];
  strip.hidden = false;
  strip.innerHTML = qs
    .map(
      (q) =>
        `<div class="quote-item"><blockquote>${q.quote}</blockquote><cite>—— ${q.by}</cite></div>`,
    )
    .join("");
}

function renderChips() {
  const mount = $("#themeChips");
  const chips = ["", ...state.research.themes];
  mount.innerHTML = chips
    .map((theme) => {
      const label = theme || "全部";
      return `<button class="chip" type="button" data-theme="${theme}" aria-pressed="${state.theme === theme}">${label}</button>`;
    })
    .join("");

  mount.querySelectorAll(".chip").forEach((button) => {
    button.addEventListener("click", () => {
      state.theme = button.dataset.theme;
      state.cardsExpanded = false;
      renderAtlas();
      initScrollEffects();
    });
  });
}

function cardTemplate(item) {
  const sources = sourceMap();
  const quote = item.quotes?.[0] || item.style;
  const initials = item.name.slice(0, 2);
  const sourceLinks = item.sources
    .map((id) => sources[id])
    .filter(Boolean)
    .map(
      (source) =>
        `<a href="${source.url}" target="_blank" rel="noreferrer">${source.publisher} ${source.year}</a>`,
    )
    .join(" · ");

  return `
    <article class="comedian-card" tabindex="0" data-name="${item.name}">
      <div class="card-quote-mark">“</div>
      <blockquote class="card-main-quote">${quote}</blockquote>
      <div class="tag-row">${item.targets
        .slice(0, 5)
        .map((target) => `<span>${target}</span>`)
        .join("")}</div>
      <div class="card-person">
        <span class="avatar">${initials}</span>
        <div>
          <h3>${item.name}</h3>
          <div class="role">${item.role} · ${item.stageRange} · heat ${item.heat}</div>
        </div>
      </div>
      <div class="card-quotes">${(item.quotes || []).map((q) => `<blockquote>${q}</blockquote>`).join("")}</div>
      <div class="card-detail">
        <strong>代表舞台</strong><br>${item.shows.join(" / ")}<br><br>
        <strong>热度依据</strong><br>${item.heatDrivers.join("；")}<br><br>
        <strong>来源</strong><br>${sourceLinks}
      </div>
    </article>
  `;
}

function renderCards() {
  const items = sortedComedians();
  const visibleItems = state.cardsExpanded ? items : items.slice(0, CARD_PREVIEW_LIMIT);
  $("#resultCount").textContent = `${visibleItems.length} / ${items.length} actors`;
  $("#activeTheme").textContent = state.theme || "ALL THEMES";
  $("#cardsMount").innerHTML = visibleItems.map(cardTemplate).join("");

  const toggle = $("#cardsToggle");
  toggle.hidden = items.length <= CARD_PREVIEW_LIMIT;
  toggle.textContent = state.cardsExpanded ? "收起演员卡" : `展开全部 ${items.length} 张演员卡`;
  toggle.setAttribute("aria-expanded", String(state.cardsExpanded));

  $("#cardsMount")
    .querySelectorAll(".comedian-card")
    .forEach((card, index) => {
      card.classList.add(`paper-${(index % 6) + 1}`);
    });

  $("#cardsMount")
    .querySelectorAll(".comedian-card")
    .forEach((card) => {
      const toggle = () => card.classList.toggle("is-open");
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });
}

function renderRanks() {
  const top = sortedComedians().slice(0, 6);
  $("#stageRank").innerHTML = top
    .map((item) => `<li>${item.name} <span>${item.stageRange}</span></li>`)
    .join("");
}

function renderThemeMap() {
  const comedians = state.research.comedians;
  const goldenQuotes = state.research.goldenQuotes || {};
  const allNodes = state.research.themes.map((theme) => {
    const names = comedians
      .filter((item) => item.themes.includes(theme))
      .sort((a, b) => b.heat - a.heat)
      .slice(0, 4)
      .map((item) => item.name);
    const qs = (goldenQuotes[theme] || []).slice(0, 2);
    const quotesHtml = qs.length
      ? `<div class="theme-quotes">${qs.map((q) => `<blockquote>${q.quote}</blockquote>`).join("")}</div>`
      : "";
    return { theme, names, quotesHtml };
  });
  const nodes = state.themesExpanded ? allNodes : allNodes.slice(0, THEME_PREVIEW_LIMIT);
  $("#themeMap").innerHTML = nodes
    .map(
      (node) =>
        `<div class="theme-node"><strong>${node.theme}</strong><i></i><span>${node.names.join(" / ")}</span>${node.quotesHtml}</div>`,
    )
    .join("");
  $("#themeMap")
    .querySelectorAll(".theme-node")
    .forEach((node, index) => {
      node.classList.add(`theme-paper-${(index % 6) + 1}`);
    });

  const toggle = $("#themeToggle");
  if (toggle) {
    toggle.hidden = allNodes.length <= THEME_PREVIEW_LIMIT;
    toggle.textContent = state.themesExpanded ? "收起主题卡" : `展开全部 ${allNodes.length} 个主题`;
    toggle.setAttribute("aria-expanded", String(state.themesExpanded));
  }
}

function renderSources() {
  $("#sourcesMount").innerHTML = state.research.sources
    .map(
      (source) => `
        <article class="source-item">
          <span>${source.publisher} · ${source.year}</span>
          <a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a>
          <p>${source.usedFor.join(" / ")}</p>
        </article>
      `,
    )
    .join("");
}

function renderAtlas() {
  renderChips();
  renderQuoteStrip();
  renderCards();
  renderRanks();
}

function updateStickyFromChapter(chapter) {
  const year = chapter.dataset.year || "DATA";
  const title = chapter.dataset.title || "样本库";
  const accent = chapter.dataset.accent || "#00d4d8";
  const timelineItem = state.research.timeline.find((item) => item.year === year);

  $("#badgeYear").textContent = year;
  $("#badgeTitle").textContent = title;
  $("#stickyTitle").textContent = timelineItem ? `${year} / ${timelineItem.metric}` : title;
  $("#stickyBody").textContent = timelineItem
    ? timelineItem.body
    : "演员矩阵会把上场时间、热度、风格和嘲讽对象拆成可查询字段。";
  $("#stickyNames").innerHTML = (
    timelineItem?.names ||
    sortedComedians()
      .slice(0, 6)
      .map((item) => item.name)
  )
    .map((name) => `<span>${name}</span>`)
    .join("");
  setThemeVars(accent);
}

let scrollInitialized = false;

function initScrollEffects() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) updateStickyFromChapter(entry.target);
        });
      },
      { threshold: 0.45 },
    );
    document.querySelectorAll(".chapter").forEach((chapter) => observer.observe(chapter));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  document.querySelectorAll(".chapter").forEach((chapter) => {
    ScrollTrigger.create({
      trigger: chapter,
      start: "top 58%",
      end: "bottom 42%",
      onEnter: () => updateStickyFromChapter(chapter),
      onEnterBack: () => updateStickyFromChapter(chapter),
    });
  });

  gsap.utils.toArray(".year-card").forEach((card) => {
    gsap.fromTo(
      card,
      { y: 56, opacity: 0.72 },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          end: "top 34%",
          scrub: 0.8,
        },
      },
    );
  });

  if (!scrollInitialized) {
    gsap.from(".hero-copy > *", {
      y: 28,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
    });
    scrollInitialized = true;
  }
}

async function boot() {
  const response = await fetch("api/research.json");
  state.research = await response.json();

  renderHeroSummary();
  renderTimeline();
  renderAtlas();
  renderThemeMap();
  renderSources();
  updateStickyFromChapter(document.querySelector(".chapter"));
  initScrollEffects();

  $("#sortSelect").addEventListener("change", (event) => {
    state.sort = event.target.value;
    state.cardsExpanded = false;
    renderAtlas();
  });

  $("#searchInput").addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    state.cardsExpanded = false;
    renderAtlas();
  });

  $("#cardsToggle").addEventListener("click", () => {
    state.cardsExpanded = !state.cardsExpanded;
    renderCards();
  });

  $("#themeToggle").addEventListener("click", () => {
    state.themesExpanded = !state.themesExpanded;
    renderThemeMap();
  });
}

boot().catch((error) => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div style="padding:16px;background:#260b08;color:#fff">Data load failed: ${error.message}</div>`,
  );
});
