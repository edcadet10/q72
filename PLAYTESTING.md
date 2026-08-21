# Playtesting Q-72

Q-72's automated checks cannot establish whether the game is compelling. The next decision depends on five independent human playtests.

## Who to recruit

Recruit people interested in at least one of these areas: Revenue Operations, GTM Systems, sales leadership, technical program management, or systems-oriented games. Avoid testing only with project contributors.

## Run the session

1. Give the participant the live link and say only: “Please play this once as you naturally would. I will not help unless the game is broken.”
2. Do not explain the scoring model, endings, or preregistered threshold.
3. Note whether they finish without help.
4. Ask them to complete the in-game 11-item miniPXI immediately after the ending.
5. Let them download their evidence JSON. The game uploads nothing.
6. Ask one neutral follow-up: “What, if anything, would make you choose to play again?”

Do not collect names, employer names, customer data, or confidential examples. A participant may share their JSON privately with the test coordinator or summarize it in a [playtest report](https://github.com/edcadet10/q72/issues/new?template=playtest.yml).

## Decision rule

After five independent sessions, retract the compelling-gameplay claim if either:

- fewer than four people complete without help; or
- fewer than four people score both miniPXI Curiosity and Enjoyment at `+1` or higher.

Replay intent and interview comments are diagnostic evidence, not substitutes for this boundary. Record failures as faithfully as successes. The full preregistration and structural checks are in [VALIDATION.md](./VALIDATION.md).
