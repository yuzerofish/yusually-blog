const stage = document.querySelector("#scrubStage");
const video = document.querySelector("#scrubVideo");
const scoreAudio = document.querySelector("#scoreAudio");
const soundToggle = document.querySelector("#soundToggle");
const progressBar = document.querySelector("#progressBar");
const frameLabel = document.querySelector("#frameLabel");
const durationLabel = document.querySelector("#durationLabel");
const params = new URLSearchParams(window.location.search);
const isRecording = params.get("record") === "1";

const state = {
  duration: 3.966,
  targetTime: 0,
  displayedTime: 0,
  hasMetadata: false,
  scoreEnabled: false,
  reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function formatTime(seconds) {
  return seconds.toFixed(2).padStart(5, "0");
}

function stageProgress() {
  if (state.reduceMotion) return 0;
  const rect = stage.getBoundingClientRect();
  const scrollable = Math.max(1, stage.offsetHeight - window.innerHeight);
  return clamp(-rect.top / scrollable, 0, 1);
}

function updateLabels(progress) {
  document.documentElement.style.setProperty("--progress", progress.toFixed(5));
  frameLabel.textContent = formatTime(state.displayedTime);
  durationLabel.textContent = formatTime(state.duration);
}

function seekVideo() {
  if (isRecording) return;
  const progress = stageProgress();
  const usableDuration = Math.max(0.1, state.duration - 0.04);
  state.targetTime = progress * usableDuration;

  const drift = state.targetTime - state.displayedTime;
  state.displayedTime += drift * 0.22;

  if (state.hasMetadata && Math.abs(video.currentTime - state.displayedTime) > 0.018) {
    video.currentTime = state.displayedTime;
  }

  updateLabels(progress);
  requestAnimationFrame(seekVideo);
}

function primeVideo() {
  video.pause();
  video.currentTime = 0.001;
  state.duration = Number.isFinite(video.duration) ? video.duration : state.duration;
  state.hasMetadata = true;
  updateLabels(stageProgress());
}

async function setScrubProgressForExport(progress) {
  const safeProgress = clamp(progress, 0, 1);
  const usableDuration = Math.max(0.1, state.duration - 0.04);
  const nextTime = safeProgress * usableDuration;
  state.targetTime = nextTime;
  state.displayedTime = nextTime;
  document.documentElement.style.setProperty("--progress", safeProgress.toFixed(5));
  frameLabel.textContent = formatTime(nextTime);
  durationLabel.textContent = formatTime(state.duration);

  if (!state.hasMetadata) return;
  await new Promise((resolve) => {
    const timeout = window.setTimeout(resolve, 400);
    const done = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    video.addEventListener("seeked", done, { once: true });
    video.currentTime = nextTime;
  });
}

function updateSoundToggle() {
  soundToggle.setAttribute("aria-pressed", String(state.scoreEnabled));
  soundToggle.setAttribute("aria-label", state.scoreEnabled ? "关闭原声" : "开启原声");
}

async function enableScore() {
  try {
    scoreAudio.volume = 0.78;
    await scoreAudio.play();
    state.scoreEnabled = true;
  } catch (error) {
    state.scoreEnabled = false;
  }
  updateSoundToggle();
}

function disableScore() {
  scoreAudio.pause();
  state.scoreEnabled = false;
  updateSoundToggle();
}

function toggleScore() {
  if (state.scoreEnabled) {
    disableScore();
    return;
  }
  enableScore();
}

video.addEventListener("loadedmetadata", primeVideo, { once: true });
video.addEventListener("canplay", () => video.pause());
soundToggle.addEventListener("click", toggleScore);

if (video.readyState >= 1) {
  primeVideo();
}

if (isRecording) {
  document.body.classList.add("is-recording");
  window.setScrubProgressForExport = setScrubProgressForExport;
}

window.addEventListener(
  "pointerdown",
  (event) => {
    video.play().then(() => video.pause()).catch(() => {});
    if (!event.target.closest("#soundToggle")) {
      enableScore();
    }
  },
  { once: true, passive: true }
);

updateLabels(0);
updateSoundToggle();
if (!isRecording) {
  requestAnimationFrame(seekVideo);
}
