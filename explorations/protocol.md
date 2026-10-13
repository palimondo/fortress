<!-- Retired: the collaboration protocol, whose rules now live in the `coordinator` and `fortress-repo` skills; its last full text is in git. -->

# Collaboration protocol (retired)

This file is retired. Its rules now live in two skills, by part.

The `coordinator` skill (`.claude/skills/coordinator/`), for the coordinating session:

- The opening paragraph and "What keeps going wrong" (purposes govern, a rule weighed by what it protects against what it costs, a side remark, a one-off go): `SKILL.md`, "The curator's role and decisions". The failures behind the rules: its `references/sources.md`.
- The first hard rule (the curator's go, a batch's go, Fable workers, reversible stops, a standing go): `SKILL.md`, "The curator's role and decisions"; `references/batch.md`, "The go" and "Reserved points and repairs"; `references/delegating.md`, "Which tier runs what".
- The last hard rule (no dialog tool) and principle 3 (the ask, the register, pages, restate and hold, the clock, quiet times): `SKILL.md`, "Talking to the curator".
- Principle 2's nine steps, and principle 4 (PLAN's order, forks probed, idle time): `references/road.md`. The deeper pass, and the search of the record before an ask: `SKILL.md`, "The curator's role and decisions".
- Principle 5 (delegation, the bounded boot, tiers, briefs): `SKILL.md`, "The standing goal" and "The boot"; `references/delegating.md`.
- Principle 6 (the record): `SKILL.md`, "The record: what goes where"; `references/record.md`.
- The skeptic's reading of test first: `references/batch.md`, "The roles".

The `fortress-repo` skill (`.claude/skills/fortress-repo/`), for every worker:

- The hard rules on what is committed and pushed (a model named by its tier, copyrighted PDFs and decks, the push order, the commit footer, only your own paths and no scratch): `references/committing.md`.
- The hard rule on the gate and test first: `references/gate.md`; `SKILL.md`, "Rules for every task"; `references/tests-writing.md`.
- Principle 1 (no self-credit, authorship reconstructed, provenance in commit messages, every claim cited, the team's later word): `SKILL.md`, "Rules for every task"; `references/committing.md`; `references/exploring.md`, "Weighing the sources". A model line shown to the curator as a diff: POSITIONS, P-87.
- Principle 2's method (one change at a time, reproduce before explaining, timings with their machine, no timing of walk): `SKILL.md`, "Rules for every task"; `references/records.md`, "Timings and citations"; `references/interpreter.md`, "Running a program".

The container and the transcript backup are the `cloud-container` skill. The batch workflow's stages are `explorations/coordinator/climb-batch-workflow.md`. The rule on `HANDOVER.md` and uploaded ZIPs was dropped at the curator's word (`fortress-repo`'s `references/sources.md`).

The protocol's last full text is in git at every commit before the one that retired it, such as `9ef30490c`: `git show 9ef30490c:explorations/protocol.md`.
