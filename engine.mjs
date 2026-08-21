export const pressureProfiles = {
  legal: {
    id: "legal",
    label: "Contract pressure",
    signal: "Legal's median review age doubled overnight. Three non-standard deals are inside the closing window.",
    briefing: "The segmentation rollout changed approval paths while Legal is already saturated.",
    initial: { sellerMinutes: 470, dealsAtRisk: 7, integrity: 58, trust: 66 },
  },
  data: {
    id: "data",
    label: "Forecast contamination",
    signal: "The board forecast moved by $2.8M without matching opportunity activity.",
    briefing: "Old and new segment definitions are both feeding downstream rollups.",
    initial: { sellerMinutes: 430, dealsAtRisk: 5, integrity: 42, trust: 69 },
  },
  agent: {
    id: "agent",
    label: "Unsafe automation",
    signal: "A seller agent performed 19 CRM writes after its policy bundle went stale.",
    briefing: "The agent can act faster than the approval controls around it.",
    initial: { sellerMinutes: 390, dealsAtRisk: 5, integrity: 50, trust: 61 },
  },
  adoption: {
    id: "adoption",
    label: "Field revolt",
    signal: "Enterprise AEs created a private spreadsheet to bypass the new routing process.",
    briefing: "The system is technically live, but the field no longer trusts the process.",
    initial: { sellerMinutes: 520, dealsAtRisk: 6, integrity: 61, trust: 43 },
  },
};

export const stages = [
  {
    id: "triage",
    kicker: "Decision 01 · Contain or accelerate",
    title: "The forecast moved. Nobody agrees why.",
    prompt:
      "The new Enterprise threshold went live in Salesforce at 08:00. Finance, Legal, and Compensation are still using the old definition. Sales wants the queue cleared now.",
    options: [
      {
        id: "map",
        label: "Trace the whole chain",
        owner: "RevOps + Systems",
        cost: 10,
        description: "Pause implementation work and reconcile object lineage, owners, rollups, approvals, and compensation inputs.",
        delta: { sellerMinutes: 70, dealsAtRisk: 1, integrity: 13, trust: 6 },
        flags: { mapped: true },
        response: "You trade immediate throughput for a shared picture of the failure. Finance confirms two segment definitions are active.",
      },
      {
        id: "freeze",
        label: "Freeze every automated write",
        owner: "Systems + Security",
        cost: 7,
        description: "Stop flows and agents, preserve evidence, and force all exceptions into a visible queue.",
        delta: { sellerMinutes: 95, dealsAtRisk: 1, integrity: 18, trust: 2 },
        flags: { frozen: true },
        response: "The blast radius stops growing, but sellers now see a wall of blocked deals and start escalating in public channels.",
      },
      {
        id: "bridge",
        label: "Open a manual deal bridge",
        owner: "Deal Desk",
        cost: 6,
        description: "Pull closing deals into a human-run lane while the underlying rollout keeps moving.",
        delta: { sellerMinutes: -125, dealsAtRisk: -2, integrity: -11, trust: 4 },
        flags: { bridge: true, dataDebt: true },
        response: "AEs get a visible path to close, but the bridge creates records that must be reconciled after quarter-end.",
      },
      {
        id: "delegate",
        label: "Let the selling agent reconcile",
        owner: "AI Operations",
        cost: 3,
        description: "Temporarily expand the agent's write scope so it can repair ownership and approval fields at machine speed.",
        delta: { sellerMinutes: -175, dealsAtRisk: -2, integrity: -15, trust: -7 },
        flags: { agentWrite: true, unsafeWrites: 2 },
        response: "The queue drops quickly. The agent also changes records whose notes contain untrusted instructions.",
      },
    ],
  },
  {
    id: "forecast",
    kicker: "Decision 02 · The downstream clock",
    title: "Compensation locks in 18 hours.",
    prompt:
      "Finance finds duplicate forecast rollups. Compensation will snapshot account segments tonight. Fixing one without the other could pay sellers against a number leadership later retracts.",
    options: [
      {
        id: "reconcile",
        label: "Rebuild the revenue truth set",
        owner: "Finance + Data",
        cost: 12,
        description: "Recalculate the quarter from opportunity events and publish one versioned segment mapping.",
        delta: { sellerMinutes: 35, dealsAtRisk: 1, integrity: 19, trust: 5 },
        flags: { forecastFixed: true, compMapped: true },
        response: "The number gets smaller and more defensible. Sales leadership now has to explain the correction upstream.",
      },
      {
        id: "exceptions",
        label: "Protect only the closing cohort",
        owner: "Sales + Deal Desk",
        cost: 8,
        description: "Create a signed exception lane for deals expected to close this quarter and defer the rest.",
        delta: { sellerMinutes: -95, dealsAtRisk: -2, integrity: -7, trust: 5 },
        flags: { exceptionLane: true, dataDebt: true },
        response: "The hottest deals move. Everyone outside the cohort now needs a clear rule for why they were excluded.",
      },
      {
        id: "rollback",
        label: "Roll back the segment release",
        owner: "GTM Systems",
        cost: 10,
        description: "Restore the previous model everywhere and reschedule the transformation after close.",
        delta: { sellerMinutes: 65, dealsAtRisk: 1, integrity: 23, trust: -8 },
        flags: { rolledBack: true },
        response: "Systems regain consistency. The field hears that another major RevOps launch did not survive contact with quarter-end.",
      },
      {
        id: "dual-control",
        label: "Install dual control",
        owner: "Systems + RevOps",
        cost: 9,
        description: "Allow suggested fixes, but require a business owner and systems owner to approve every write batch.",
        delta: { sellerMinutes: -45, dealsAtRisk: -1, integrity: 11, trust: 7 },
        flags: { agentRestricted: true, unsafeWrites: 0 },
        response: "Throughput recovers without returning full autonomy. The new approval queue becomes the operational bottleneck.",
      },
    ],
  },
  {
    id: "collision",
    kicker: "Decision 03 · The hidden dependency",
    title: "A strategic quote contains poisoned context.",
    prompt:
      "Legal discovers instructions embedded in an imported account note. The seller agent treated them as policy and waived a review step. Meanwhile, six legitimate deals are waiting.",
    options: [
      {
        id: "quarantine",
        label: "Quarantine and audit the agent",
        owner: "Security + Systems",
        cost: 10,
        description: "Revoke write access, inspect every action trace, and restore affected records from the event log.",
        delta: { sellerMinutes: 55, dealsAtRisk: 1, integrity: 21, trust: 8 },
        flags: { agentQuarantined: true, unsafeWrites: 0 },
        response: "The unsafe path is contained and fully reconstructable. Sales absorbs another delay while the audit runs.",
      },
      {
        id: "cell",
        label: "Stand up an exception cell",
        owner: "Sales + Finance + Legal",
        cost: 14,
        description: "Embed one decision-maker from each function and process the closing queue synchronously.",
        delta: { sellerMinutes: -85, dealsAtRisk: -3, integrity: 5, trust: 8 },
        flags: { exceptionCell: true },
        response: "Decisions happen in minutes instead of handoffs. The cell works, but it cannot become the permanent operating model.",
      },
      {
        id: "grandfather",
        label: "Grandfather every open quote",
        owner: "Sales Leadership",
        cost: 4,
        description: "Honor the old rules for anything already in pipeline and resolve the control gap next quarter.",
        delta: { sellerMinutes: -125, dealsAtRisk: -3, integrity: -19, trust: -11 },
        flags: { policyBreach: true, dataDebt: true },
        response: "The quarter gets easier immediately. Finance and Legal now own exceptions they did not approve.",
      },
      {
        id: "migrate",
        label: "Complete the hard migration",
        owner: "Systems + Compensation",
        cost: 16,
        description: "Update every downstream object and rule to the new segment model before another deal moves.",
        delta: { sellerMinutes: 60, dealsAtRisk: 1, integrity: 25, trust: 3 },
        flags: { cleanMigration: true, compMapped: true },
        response: "The architecture becomes coherent. Sellers watch precious closing time disappear into the migration window.",
      },
    ],
  },
  {
    id: "landing",
    kicker: "Decision 04 · Make it land",
    title: "Leadership asks for one go/no-go answer.",
    prompt:
      "The system can technically continue. The field still needs to know what changes today, what waits, who can override, and what evidence will decide whether the rollout expands.",
    options: [
      {
        id: "canary",
        label: "Run a measured canary",
        owner: "Enablement + RevOps",
        cost: 12,
        description: "Release to one segment with office hours, named escalation owners, telemetry, and an explicit rollback threshold.",
        delta: { sellerMinutes: -35, dealsAtRisk: -1, integrity: 9, trust: 12 },
        flags: { canary: true, trained: true },
        response: "The transformation survives in a bounded cohort. Leadership gets evidence instead of a ceremonial launch date.",
      },
      {
        id: "launch",
        label: "Declare full launch",
        owner: "Executive Sponsor",
        cost: 4,
        description: "Keep the date, publish a short FAQ, and make teams resolve exceptions through normal channels.",
        delta: { sellerMinutes: -85, dealsAtRisk: 1, integrity: -9, trust: -13 },
        flags: { fullLaunch: true },
        response: "The program is green on the status slide. The workaround channels light up again within the hour.",
      },
      {
        id: "hold",
        label: "Hold through quarter close",
        owner: "Revenue Leadership",
        cost: 6,
        description: "Keep the stable path, defer the rollout, and accept a controlled amount of seller friction.",
        delta: { sellerMinutes: 75, dealsAtRisk: 1, integrity: 11, trust: -5 },
        flags: { held: true },
        response: "The quarter closes on known rules. The transformation loses momentum and must earn another launch window.",
      },
      {
        id: "truth",
        label: "Publish the uncomfortable truth",
        owner: "Program Lead",
        cost: 8,
        description: "State what failed, which deals are protected, where human approval remains, and when the next decision occurs.",
        delta: { sellerMinutes: -20, dealsAtRisk: 0, integrity: 5, trust: 18 },
        flags: { transparent: true },
        response: "The message creates no miracle, but teams stop guessing and route exceptions through one accountable path.",
      },
    ],
  },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const clone = (value) => JSON.parse(JSON.stringify(value));

function profileAdjustment(profileId, stageId, actionId) {
  const adjustment = { sellerMinutes: 0, dealsAtRisk: 0, integrity: 0, trust: 0 };

  if (profileId === "legal") {
    if (actionId === "bridge") {
      adjustment.dealsAtRisk -= 2;
      adjustment.integrity += 10;
      adjustment.trust += 3;
    }
    if (actionId === "exceptions") {
      adjustment.dealsAtRisk -= 2;
      adjustment.integrity += 5;
    }
    if (actionId === "cell") adjustment.dealsAtRisk -= 1;
    if (actionId === "grandfather") adjustment.trust -= 6;
    if (stageId === "triage" && actionId === "map") adjustment.dealsAtRisk += 1;
  }

  if (profileId === "data") {
    if (actionId === "map") adjustment.integrity += 10;
    if (actionId === "reconcile") {
      adjustment.sellerMinutes -= 100;
      adjustment.dealsAtRisk -= 2;
      adjustment.integrity += 9;
      adjustment.trust += 4;
    }
    if (actionId === "migrate") {
      adjustment.sellerMinutes -= 150;
      adjustment.dealsAtRisk -= 4;
      adjustment.integrity += 10;
      adjustment.trust += 5;
    }
    if (actionId === "bridge" || actionId === "exceptions") adjustment.integrity -= 7;
  }

  if (profileId === "agent") {
    if (actionId === "freeze") adjustment.integrity += 10;
    if (actionId === "delegate") adjustment.integrity -= 12;
    if (actionId === "dual-control") adjustment.trust += 6;
    if (actionId === "quarantine") {
      adjustment.sellerMinutes -= 130;
      adjustment.dealsAtRisk -= 1;
      adjustment.integrity += 5;
      adjustment.trust += 8;
    }
  }

  if (profileId === "adoption") {
    if (actionId === "bridge") {
      adjustment.sellerMinutes -= 40;
      adjustment.trust += 18;
    }
    if (actionId === "exceptions") {
      adjustment.sellerMinutes -= 30;
      adjustment.trust += 14;
    }
    if (actionId === "cell") adjustment.trust += 12;
    if (actionId === "truth") {
      adjustment.sellerMinutes -= 70;
      adjustment.integrity += 5;
      adjustment.trust += 15;
    }
    if (actionId === "canary") adjustment.trust += 4;
    if (actionId === "freeze" || actionId === "rollback") adjustment.trust -= 6;
  }

  return adjustment;
}

export function createGame(profileId = "data") {
  const profile = pressureProfiles[profileId] ?? pressureProfiles.data;
  return {
    version: 1,
    profileId: profile.id,
    stageIndex: 0,
    hoursRemaining: 72,
    metrics: clone(profile.initial),
    flags: {},
    decisions: [],
    timeline: [
      {
        hour: 72,
        title: "SEV-1 · Segment rollout collision",
        body: profile.signal,
        tone: "critical",
      },
    ],
    lastDelta: null,
    complete: false,
  };
}

export function getCurrentStage(state) {
  return stages[state.stageIndex] ?? null;
}

export function applyDecision(state, actionId) {
  if (state.complete) throw new Error("The scenario is already complete.");
  const stage = getCurrentStage(state);
  const action = stage?.options.find((option) => option.id === actionId);
  if (!stage || !action) throw new Error(`Unknown action '${actionId}'.`);

  const next = clone(state);
  const adjustment = profileAdjustment(next.profileId, stage.id, action.id);
  const previousMetrics = clone(next.metrics);
  const delta = {};

  for (const key of Object.keys(next.metrics)) {
    const proposedDelta = (action.delta[key] ?? 0) + (adjustment[key] ?? 0);
    next.metrics[key] += proposedDelta;
  }

  next.metrics.sellerMinutes = clamp(next.metrics.sellerMinutes, 0, 1200);
  next.metrics.dealsAtRisk = clamp(next.metrics.dealsAtRisk, 0, 12);
  next.metrics.integrity = clamp(next.metrics.integrity, 0, 100);
  next.metrics.trust = clamp(next.metrics.trust, 0, 100);
  for (const key of Object.keys(next.metrics)) {
    delta[key] = next.metrics[key] - previousMetrics[key];
  }
  next.hoursRemaining = clamp(next.hoursRemaining - action.cost, 0, 72);
  Object.assign(next.flags, action.flags ?? {});

  if (action.id === "dual-control" || action.id === "quarantine") {
    next.flags.unsafeWrites = 0;
  }

  next.decisions.push({
    stageId: stage.id,
    actionId: action.id,
    label: action.label,
    owner: action.owner,
    cost: action.cost,
    delta,
  });
  next.timeline.unshift({
    hour: next.hoursRemaining,
    title: action.label,
    body: action.response,
    tone: action.id === "delegate" || action.id === "grandfather" ? "warning" : "normal",
  });
  next.lastDelta = delta;
  next.stageIndex += 1;
  next.complete = next.stageIndex >= stages.length;

  if (next.complete) {
    const outcome = getOutcome(next);
    next.timeline.unshift({
      hour: next.hoursRemaining,
      title: outcome.title,
      body: outcome.summary,
      tone: outcome.tone,
    });
  }

  return next;
}

export function calculateScore(state) {
  let score = 0;
  score += state.metrics.integrity * 0.28;
  score += state.metrics.trust * 0.22;
  score += (1 - state.metrics.sellerMinutes / 1200) * 20;
  score += ((12 - state.metrics.dealsAtRisk) / 12) * 20;
  score += (state.hoursRemaining / 72) * 5;
  if (state.flags.policyBreach) score -= 18;
  if ((state.flags.unsafeWrites ?? 0) > 0) score -= 16;
  if (state.flags.dataDebt) score -= 6;
  if (state.flags.canary) score += 5;
  if (state.flags.transparent) score += 4;
  return Math.round(clamp(score, 0, 100));
}

export function getOutcome(state) {
  const { dealsAtRisk, integrity, trust } = state.metrics;
  const unsafe = (state.flags.unsafeWrites ?? 0) > 0;

  if (unsafe || state.flags.policyBreach) {
    return {
      id: "control-failure",
      title: "CONTROL FAILURE",
      tone: "critical",
      summary: "The number moved, but the organization cannot defend how. Unauthorized or ungoverned decisions survive into close.",
    };
  }
  if (dealsAtRisk <= 2 && integrity >= 76 && trust >= 70) {
    return {
      id: "controlled-landing",
      title: "CONTROLLED LANDING",
      tone: "success",
      summary: "The closing cohort moves through a governed path, the data is reconcilable, and the field knows what happens next.",
    };
  }
  if (dealsAtRisk <= 2 && integrity < 64) {
    return {
      id: "poisoned-win",
      title: "THE POISONED WIN",
      tone: "warning",
      summary: "Deals close, but next quarter inherits contradictory records, unexplained overrides, and a repair program.",
    };
  }
  if (integrity >= 82 && dealsAtRisk >= 5) {
    return {
      id: "clean-miss",
      title: "THE CLEAN MISS",
      tone: "warning",
      summary: "The system is defensible and the quarter is not. Sellers lost the window while the organization optimized for correctness.",
    };
  }
  if (trust >= 78 && dealsAtRisk <= 4) {
    return {
      id: "coordinated-recovery",
      title: "COORDINATED RECOVERY",
      tone: "success",
      summary: "Not every defect is fixed, but the organization is aligned on exceptions, ownership, and the next irreversible decision.",
    };
  }
  if (state.flags.dataDebt && dealsAtRisk <= 4) {
    return {
      id: "workaround-economy",
      title: "THE WORKAROUND ECONOMY",
      tone: "warning",
      summary: "Human heroics protect the quarter. Their spreadsheets and one-off rules now compete with the official operating model.",
    };
  }
  return {
    id: "fog",
    title: "QUARTER-END FOG",
    tone: "critical",
    summary: "No single failure sinks the program, but unresolved dependencies leave every team working from a different truth.",
  };
}

export function buildEvidence(state, survey = {}) {
  return {
    schema: "q72.playtest.v1",
    completedAt: new Date().toISOString(),
    profile: state.profileId,
    completion: state.complete,
    outcome: getOutcome(state).id,
    score: calculateScore(state),
    finalMetrics: clone(state.metrics),
    decisions: clone(state.decisions),
    miniPXI: clone(survey.miniPXI ?? {}),
    replayIntent: survey.replayIntent ?? null,
  };
}
