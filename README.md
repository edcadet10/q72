# Q-72

[![Tests](https://github.com/edcadet10/q72/actions/workflows/ci.yml/badge.svg)](https://github.com/edcadet10/q72/actions/workflows/ci.yml)
[![Deploy](https://github.com/edcadet10/q72/actions/workflows/pages.yml/badge.svg)](https://github.com/edcadet10/q72/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

**[Play the five-minute prototype](https://edcadet10.github.io/q72/)** · [Pitch a scenario](https://github.com/edcadet10/q72/issues/new?template=scenario.yml) · [Report a playtest](https://github.com/edcadet10/q72/issues/new?template=playtest.yml)

Q-72 is an open-source quarter-end incident simulator for people who operate revenue systems. Instead of building another seller copilot, it makes the player accountable for the cross-functional consequences of changing the system around sellers.

The first scenario starts 72 hours before quarter close. A segment rollout has split Salesforce, forecasting, compensation, and approvals across two definitions. The player makes four decisions while seller time, deal risk, data integrity, and field trust move in different directions.

There is no hidden perfect answer. Each intervention helps one part of the business and creates pressure elsewhere; the game remembers those choices and resolves them into one of seven endings.

## Why this is different

Most AI-for-sales demos optimize a single task. Q-72 is a playable systems test: can you coordinate Sales, RevOps, Finance, Legal, and GTM Systems while the clock and the incentives disagree?

The project turns the work of a technical GTM program manager into a reusable simulation engine. New scenarios can model quoting failures, territory collisions, forecast disputes, CRM migrations, or unsafe automation without requiring access to a real company's data.

## Run the vertical slice

```bash
npm start
```

Open <http://localhost:4173>.

No package installation, API key, CRM account, or external service is required.

## What is being tested

The repository does not claim that the game is compelling yet. Automated tests establish consequence diversity, not player enjoyment. [VALIDATION.md](./VALIDATION.md) contains the preregistered kill criterion and [PLAYTESTING.md](./PLAYTESTING.md) explains how to collect the missing human evidence.

Run the deterministic checks with:

```bash
npm test
```

## Contribution surface

The intended collaboration model is scenario-first. Contributors can add pressure profiles, decisions, deterministic consequence rules, ending conditions, accessibility improvements, and adapters for synthetic CRM traces.

- [Pitch a new incident](https://github.com/edcadet10/q72/issues/new?template=scenario.yml) without writing code.
- [Run a playtest](./PLAYTESTING.md) and report what happened.
- Fix an issue marked [`good first issue`](https://github.com/edcadet10/q72/labels/good%20first%20issue).
- Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

Project decisions and maintainer responsibilities are documented in [GOVERNANCE.md](./GOVERNANCE.md).

## Design rule

LLMs may animate stakeholders or generate adversarial incidents. They never score their own performance; observable state transitions determine the outcome.

## Current status

This is a deliberately narrow vertical slice, not a finished game. All 1,024 possible runs terminate, all actions move multiple business metrics, seven endings are reachable, and the best move varies by pressure profile and decision stage. The next gate is five independent human playtests under the preregistered rule.

## License

[MIT](./LICENSE)
