# Q-72 gameplay claim preregistration

## Claim

The five-minute Q-72 vertical slice is compelling enough for target users to complete and want to explore again.

## Human kill criterion

Run five independent playtests with people interested in Revenue Operations, GTM Systems, sales leadership, or technical program management. Retract the claim if either:

- fewer than four participants complete the scenario without help; or
- fewer than four participants score both miniPXI Curiosity and Enjoyment at `+1` or higher.

The replay-intent question is collected as descriptive evidence but is not part of this preregistered boundary.

## Structural precondition

Before human testing, reject the vertical slice if any of these checks fail:

- every possible four-decision sequence terminates;
- every decision changes at least two business metrics;
- fewer than four materially different endings are reachable; or
- fewer than three opening moves occur among the best-scoring strategies across the four pressure profiles; or
- any decision stage has fewer than two actions represented among the best-scoring strategies across the four pressure profiles.

Structural success does not prove enjoyment. It only establishes that the prototype has enough consequence diversity to justify human testing.

## Iteration record

The first automated run was rejected because the score saturated at 100, creating false ties. After recalibration, the opening-move check passed, but one second-stage action was optimal for every pressure profile. That observation was used to preregister the stage-level diversity check above before the consequence model was revised again.

## Instrument

The prototype embeds the 11-item miniPXI verbatim, uses its `-3` to `+3` response scale, randomizes item order, and measures immediately after play. Playtest evidence is stored locally and downloaded as JSON; the prototype uploads nothing.

Sources:

- [miniPXI paper](https://doi.org/10.1145/3549507)
- [PXI user guide](https://playerexperienceinventory.org/docs)
