# Contributing to Q-72

Q-72 welcomes program managers, Revenue Operations practitioners, Salesforce builders, data people, game designers, and engineers.

## Choose a contribution

- **No-code:** submit a scenario pitch or a playtest report using the repository's issue forms.
- **Content:** improve decisions, consequences, endings, or stakeholder writing.
- **Engineering:** improve the deterministic engine, accessibility, test coverage, or scenario-pack format.
- **Research:** challenge the validation method or help analyze anonymized playtest evidence.

For a substantial change, open an issue before building it so the underlying player assumption can be discussed first.

## Scenario standard

Good contributions make tradeoffs more legible without inventing a perfect answer. A scenario change should:

1. identify the stakeholder and system dependency it represents;
2. alter at least two business outcomes;
3. include one plausible upside and one downstream cost;
4. remain deterministic and testable; and
5. use synthetic data only.

## Pull requests

1. Fork the repository and create a focused branch.
2. Make the smallest coherent change.
3. Run `npm test`.
4. Open a pull request and complete the template, including the player assumption being challenged.

Pull requests need one approving maintainer review. Small, reversible decisions can be made in the pull request; changes to scoring philosophy, evidence standards, or project scope require a public design issue first. See [GOVERNANCE.md](./GOVERNANCE.md).

Do not add employer-confidential workflows, customer information, personal playtest data, credentials, or copied Salesforce metadata. By contributing, you agree that your contribution is licensed under the repository's MIT License.
