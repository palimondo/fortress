# The two roles and their records

The coordinator is two things and keeps two records. In both it is also the analyst: when something went wrong, it finds out what happened and why, and proposes the way forward.

## Orchestrator

It keeps what a worker, or its own next incarnation after a compaction, needs to act:

- `explorations/coordinator/FACTS.md`: what is established about the language, the library, the run-time and the container, each fact in a few lines with its source and its test, the detail left in the report it cites.
- `explorations/coordinator/INDEX.md`: one line per standalone note, searched before any fact is called absent.
- `explorations/coordinator/PLAN.md`: the phases, the open issues in the order they need deciding, the parked items, and each batch's items listed for the curator's review.
- The first section of `explorations/microgpt-run-c-handover.md`: where the work stands.
- The boot note, line 7 of `explorations/coordinator/postmortem-2026-09-19/held-list.md`. Its one purpose is to tell the coordinator after a compaction what is in flight: what is running, what to do when it completes, and the question waiting on the curator if one is. It also gives the session's process's last start and the next stop the platform's cap brings (the `cloud-container` skill).

## Executive assistant

It keeps the project on track and the curator out of the wall of text:

- The open issues and their order, in PLAN. They are brought to the curator one at a time; nothing the curator must decide is held only in the coordinator's context.
- `explorations/coordinator/POSITIONS.md`: what the curator has decided and already knows, so that nothing is re-asked or re-explained. It is not a log of what the curator said.
- `explorations/coordinator/review-queue.md`: every item waiting for the curator's word or review across the record, merged, each with its home, its state and its default, in the order it needs the curator. The coordinator keeps it current as items are answered.
- The held list, below the boot note, while the curator reads turn by turn (`talking.md`).

Its standing goal is to model what the curator already knows and where the curator's context has gaps, and to fill those gaps with the fewest relevant facts, at the level the decision needs.

## How the records are kept

- One home per thing. The curator's words are written once, in POSITIONS, and only where they are the position; every other file points to the entry.
- FACTS and POSITIONS say what holds now: no dates, no rung or commit names, no account of what changed or what corrected what. A wrong line is rewritten in place, never footnoted or marked superseded. The provenance, every earlier text verbatim and the curator's quotes at their dates, goes to `FACTS-history.md` and `POSITIONS-history.md` beside them.
- A worker or the coordinator may append an entry with a date, a quote or a commit in it. Each consolidation moves that provenance to the history and rewrites the entry without it, losing nothing. FACTS is consolidated before each batch launches, since its agents read it; POSITIONS at each landing and whenever the curator replaces a decision. Before a consolidation is committed, this shows every entry of the file at the base verbatim in the file or in its history:

      explorations/coordinator/tools/check-verbatim.py <base> <file> <history>

- An entry is cited by its bold title, or by its opening words where it has none. A title stays verbatim when its entry is rewritten; where the title no longer holds, the entry says so and states the present.
- A fact enters in the commit that establishes it; a decision in the next commit after the curator states it.
- At each landing, a change that the `fortress-repo` skill's `references/revival-changes.md` covers is added to that part: the original, the resolution and the reason, under the point of "Fortress as a language" that it qualifies. Its provenance goes to that skill's `references/sources.md`.
- A remark is not a decision, and neither is a one-off go: a go or a push is written nowhere, the launch or the commit being its trace. A change to how the work is done is the line that states the rule, rewritten where it lives. A question is answered where its answer belongs.
- The boot note is rewritten whole at every change, never appended to.
- Agents working beside each other do not edit the shared records; they write the lines for them in their reports as finished prose. The coordinator folds those lines in. It reviews a worker's commits after they land and fixes by a further commit.
- What a worker did, and in what order, is read from its transcript, which the backup keeps; nothing is committed to show it.
- The rule against committing a model identifier governs what the agents themselves write and push. A record that names a model on purpose, a transcript or an index among them, is not stripped of it.
