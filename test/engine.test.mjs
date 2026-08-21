import assert from "node:assert/strict";
import test from "node:test";
import {
  applyDecision,
  calculateScore,
  createGame,
  getCurrentStage,
  getOutcome,
  pressureProfiles,
  stages,
} from "../engine.mjs";

function enumerate(profileId) {
  const completed = [];
  const visit = (state) => {
    const stage = getCurrentStage(state);
    if (!stage) {
      completed.push(state);
      return;
    }
    for (const option of stage.options) visit(applyDecision(state, option.id));
  };
  visit(createGame(profileId));
  return completed;
}

test("every possible decision sequence terminates", () => {
  for (const profileId of Object.keys(pressureProfiles)) {
    const runs = enumerate(profileId);
    assert.equal(runs.length, 4 ** stages.length);
    assert.ok(runs.every((run) => run.complete));
  }
});

test("every action changes at least two business metrics in every reachable state", () => {
  const frontier = Object.keys(pressureProfiles).map((profileId) => createGame(profileId));
  for (let index = 0; index < stages.length; index += 1) {
    const nextFrontier = [];
    for (const state of frontier.splice(0)) {
      for (const option of getCurrentStage(state).options) {
        const next = applyDecision(state, option.id);
        const changed = Object.values(next.lastDelta).filter((value) => value !== 0).length;
        assert.ok(changed >= 2, `${state.profileId}/${stages[index].id}/${option.id} changed only ${changed} metrics`);
        nextFrontier.push(next);
      }
    }
    frontier.push(...nextFrontier);
  }
});

test("the simulator exposes at least four materially different endings", () => {
  const endings = new Set();
  for (const profileId of Object.keys(pressureProfiles)) {
    for (const run of enumerate(profileId)) endings.add(getOutcome(run).id);
  }
  assert.ok(endings.size >= 4, `Only ${endings.size} endings were reachable`);
});

test("one opening move is not uniquely optimal across every pressure profile", () => {
  const winningOpeners = new Set();
  for (const profileId of Object.keys(pressureProfiles)) {
    const runs = enumerate(profileId);
    const bestScore = Math.max(...runs.map(calculateScore));
    for (const run of runs.filter((candidate) => calculateScore(candidate) === bestScore)) {
      winningOpeners.add(run.decisions[0].actionId);
    }
  }
  assert.ok(winningOpeners.size >= 3, `Only ${winningOpeners.size} opening moves appear in optimal strategies`);
});

test("every decision stage has context-dependent optimal actions", () => {
  const optimalActionsByStage = stages.map(() => new Set());
  for (const profileId of Object.keys(pressureProfiles)) {
    const runs = enumerate(profileId);
    const bestScore = Math.max(...runs.map(calculateScore));
    for (const run of runs.filter((candidate) => calculateScore(candidate) === bestScore)) {
      run.decisions.forEach((decision, index) => optimalActionsByStage[index].add(decision.actionId));
    }
  }
  optimalActionsByStage.forEach((actions, index) => {
    assert.ok(actions.size >= 2, `${stages[index].id} has only ${actions.size} optimal action across all profiles`);
  });
});
