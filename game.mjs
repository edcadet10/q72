import {
  applyDecision,
  buildEvidence,
  calculateScore,
  createGame,
  getCurrentStage,
  getOutcome,
  pressureProfiles,
} from "./engine.mjs";

const metricMeta = {
  sellerMinutes: { label: "Seller minutes lost", good: "down", suffix: "m" },
  dealsAtRisk: { label: "Deals at risk", good: "down", suffix: "" },
  integrity: { label: "Data integrity", good: "up", suffix: "%" },
  trust: { label: "Field trust", good: "up", suffix: "%" },
};

const miniPXI = [
  ["appeal", "I liked the look and feel of the game"],
  ["challenge", "The game was not too easy and not too hard to play"],
  ["control", "It was easy to know how to perform actions in the game"],
  ["goals", "The goals of the game were clear to me"],
  ["progress", "The game gave clear feedback on my progress towards the goals"],
  ["autonomy", "I felt free to play the game in my own way"],
  ["curiosity", "I wanted to explore how the game evolved"],
  ["immersion", "I was fully focused on the game"],
  ["mastery", "I felt I was good at playing this game"],
  ["meaning", "Playing the game was meaningful to me"],
  ["enjoyment", "I had a good time playing this game"],
];

const labels = [
  "Strongly disagree",
  "Disagree",
  "Slightly disagree",
  "Neutral",
  "Slightly agree",
  "Agree",
  "Strongly agree",
];

let state;
let startedAt;

const byId = (id) => document.getElementById(id);
const profileFromUrl = () => {
  const requested = new URLSearchParams(window.location.search).get("profile");
  if (requested && pressureProfiles[requested]) return requested;
  const ids = Object.keys(pressureProfiles);
  return ids[Math.floor(Math.random() * ids.length)];
};

function formatDelta(key, value) {
  if (!value) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}${metricMeta[key].suffix}`;
}

function isGoodDelta(key, value) {
  if (!value) return null;
  return metricMeta[key].good === "up" ? value > 0 : value < 0;
}

function renderMetrics() {
  byId("clock").textContent = `T−${state.hoursRemaining}h`;
  byId("clock").classList.toggle("urgent", state.hoursRemaining <= 30);

  for (const [key, meta] of Object.entries(metricMeta)) {
    const card = document.querySelector(`[data-metric="${key}"]`);
    card.querySelector(".metric-value").textContent = `${state.metrics[key]}${meta.suffix}`;
    const delta = state.lastDelta?.[key] ?? 0;
    const deltaNode = card.querySelector(".metric-delta");
    deltaNode.textContent = state.lastDelta ? formatDelta(key, delta) : "baseline";
    deltaNode.className = "metric-delta";
    const good = isGoodDelta(key, delta);
    if (good === true) deltaNode.classList.add("positive");
    if (good === false) deltaNode.classList.add("negative");
  }
}

function renderTimeline() {
  byId("timeline").innerHTML = state.timeline
    .map(
      (item) => `
        <li class="timeline-item ${item.tone}">
          <span class="timeline-hour">T−${item.hour}h</span>
          <div><strong>${item.title}</strong><p>${item.body}</p></div>
        </li>`,
    )
    .join("");
}

function renderDependencyMap() {
  const active = new Set();
  if (state.flags.mapped || state.stageIndex > 0) active.add("salesforce");
  if (state.flags.forecastFixed || state.stageIndex > 1) active.add("finance");
  if (state.flags.compMapped || state.stageIndex > 1) active.add("comp");
  if (state.flags.exceptionCell || state.stageIndex > 2) active.add("legal");
  if (state.flags.trained || state.flags.transparent) active.add("field");
  if (state.flags.agentWrite || state.flags.agentRestricted || state.flags.agentQuarantined) active.add("agent");
  document.querySelectorAll(".map-node").forEach((node) => {
    node.classList.toggle("active", active.has(node.dataset.node));
  });
}

function renderDecision() {
  const stage = getCurrentStage(state);
  if (!stage) return renderEnding();

  byId("stage-kicker").textContent = stage.kicker;
  byId("stage-title").textContent = stage.title;
  byId("stage-prompt").textContent = stage.prompt;
  byId("actions").innerHTML = stage.options
    .map(
      (option, index) => `
        <button class="action-card" data-action="${option.id}">
          <span class="action-index">0${index + 1}</span>
          <span class="action-copy">
            <span class="action-label">${option.label}</span>
            <span class="action-description">${option.description}</span>
            <span class="action-owner">${option.owner}</span>
          </span>
          <span class="action-cost">−${option.cost}h</span>
        </button>`,
    )
    .join("");

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => choose(button.dataset.action));
  });
}

function choose(actionId) {
  document.querySelectorAll("[data-action]").forEach((button) => (button.disabled = true));
  state = applyDecision(state, actionId);
  render();
}

function renderEnding() {
  const outcome = getOutcome(state);
  byId("decision-panel").classList.add("hidden");
  byId("ending-panel").classList.remove("hidden");
  byId("outcome-label").textContent = outcome.title;
  byId("outcome-label").dataset.tone = outcome.tone;
  byId("outcome-summary").textContent = outcome.summary;
  byId("score").textContent = calculateScore(state);
  byId("decision-recap").innerHTML = state.decisions
    .map(
      (decision) => `
        <li><span>${decision.label}</span><small>${decision.owner} · ${decision.cost}h</small></li>`,
    )
    .join("");
  buildSurvey();
}

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function buildSurvey() {
  byId("survey-items").innerHTML = shuffled(miniPXI)
    .map(
      ([id, question]) => `
        <fieldset class="survey-item" data-construct="${id}">
          <legend>${question}</legend>
          <div class="scale" role="radiogroup" aria-label="${question}">
            ${labels
              .map(
                (label, index) => `
                  <label title="${label}">
                    <input type="radio" name="${id}" value="${index - 3}" required>
                    <span>${index - 3}</span>
                  </label>`,
              )
              .join("")}
          </div>
          <div class="scale-labels"><span>Strongly disagree</span><span>Strongly agree</span></div>
        </fieldset>`,
    )
    .join("");
}

function collectSurvey() {
  const form = byId("playtest-form");
  if (!form.reportValidity()) return null;
  const data = new FormData(form);
  const values = {};
  for (const [id] of miniPXI) values[id] = Number(data.get(id));
  return { miniPXI: values, replayIntent: data.get("replay") };
}

function downloadEvidence() {
  const survey = collectSurvey();
  if (!survey) return;
  const evidence = {
    ...buildEvidence(state, survey),
    startedAt,
    durationSeconds: Math.round((Date.now() - new Date(startedAt).getTime()) / 1000),
  };
  const history = JSON.parse(localStorage.getItem("q72.playtests") || "[]");
  history.push(evidence);
  localStorage.setItem("q72.playtests", JSON.stringify(history));
  const blob = new Blob([JSON.stringify(evidence, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `q72-playtest-${state.profileId}-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  byId("saved-note").textContent = "Evidence saved locally and downloaded. No data was uploaded.";
}

function render() {
  renderMetrics();
  renderTimeline();
  renderDependencyMap();
  renderDecision();
  const progress = Math.min(state.stageIndex, 4);
  byId("progress-fill").style.width = `${(progress / 4) * 100}%`;
  byId("progress-label").textContent = `${progress} / 4 decisions`;
}

function startGame() {
  const profileId = profileFromUrl();
  state = createGame(profileId);
  startedAt = new Date().toISOString();
  const profile = pressureProfiles[profileId];
  byId("profile-label").textContent = profile.label;
  byId("profile-signal").textContent = profile.signal;
  byId("profile-briefing").textContent = profile.briefing;
  byId("start-screen").classList.add("hidden");
  byId("game-screen").classList.remove("hidden");
  render();
}

function resetGame() {
  const url = new URL(window.location.href);
  url.searchParams.delete("profile");
  window.location.href = url.toString();
}

byId("start-button").addEventListener("click", startGame);
byId("download-evidence").addEventListener("click", downloadEvidence);
byId("replay-button").addEventListener("click", resetGame);
