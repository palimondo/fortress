# Delegating

## What goes to a worker

- Everything but judgement, by default: exploration, tracing, surveys, big searches, and reading reports, transcripts, ledger rows and source. The worker returns a summary.
- Work with no dependency on what is running starts at once.
- Idle time goes to the parked research in PLAN. A new deliverable is discussed with the curator before it is made. What needs the curator's own machine is parked, not simulated.
- Before a thing is done a new way, the record is searched for how it was done last time.
- A fork a probe can settle is probed before the batch is briefed, so that the decision is the curator's and the worker gets a clean task. A decision is never left to a worker to be reviewed after the fact.

## Which tier runs what

- Opus runs the workers, as many as the work needs, pinned by the tier's alias rather than a version. Sonnet runs archaeology: digging through the history, the transcripts and old records.
- Fable, the top tier, is used only at decision points, sparingly, on a condensed brief, so that it does not gather its own context through many tool calls.
- A decision that touches two or more of the specification, the interpreter and the compiler is made in two steps: cheaper workers gather cited evidence into a condensed brief, then the judgement runs at the top tier.
- The coordinating session runs on Opus, keeping Fable's pool for judgements and reviews. It moves to Fable only at the curator's word.

## Fable without asking, and with the curator's yes

- **Without asking.** A Fable judgement on a design question that touches two or more of the specification, the library and the implementation, once an Opus worker's evidence or list of ways is on file and a search of the record does not settle it. The curator learns of it when the judgement is put to them in the ask form.
- **Standing pre-approvals.** A judge's second ruling on the same rung or merged tree (the first ruling runs on Opus), and the top-tier review of a batch record.
- **Only with the curator's yes.** Every other Fable worker: a question about the coordinator's own conduct or a new kind of process choice; one whose recommendation would reverse a decision of the curator's; one where the curator wants Fable and Opus working apart.

## A brief

- It names its reader and its question, and states the problem, never the expected answer.
- It points at the research and documents on file instead of restating them, so that nothing on record is rediscovered.
- It hands over what the record has measured as findings to cite, with their sources, never as claims to verify by running them again; it never tells a worker to distrust the record. It names the one thing that is new to measure and asks only for that. A finding is measured again only when the tree has changed under it, and the brief says what changed.
- On a design fork, the worker is kept clean of the coordinator's options, not of its measurements: it reads its question first, lists every way the language and the library offer, answers a rule that blocks an option with how the library gets around it, and measures only where no record answers.
- A briefing written for a batch speaks of "the decisions on record", never of a person, and sets the worker no required questions about its search: it says where the ground is unfamiliar, and the worker then works on its task.
- Each rung of a batch gets a mission briefing drawn from the territory map, which its agents read in their first turn. How it is built and carried is the batch manual's, `explorations/coordinator/climb-batch-workflow.md`, "Shared prefix"; the share of agents that use it is measured by the review after the batch.
- It names the stops it reserves: the points the work must report as met. What else the report holds is the report contract, which the brief does not restate.

## After every landed batch

One combined review, by one Opus worker that only reads: conformance (each rung against the decisions on record and the designers' intent), the process measures (misses by kind, those of items in the rung's own briefing, map use, briefing cost, measurements repeated, tokens written by role) and the routing check (every finding has a home). The coordinator files what it finds in PLAN at the landing, each finding at the home it names. The earlier reviews are `explorations/reviews/batch-*-review.md`.

## Watching what it launches

Only a long or large run the coordinator launches outside a batch, such as a probe that builds and runs suites for an hour or more, is launched with an estimate and watched against it, as the `remote-container` skill's agents part says. Watching the spend is the coordinator's: no brief asks a worker to measure, project or cap its own token spend. The coordinator reads it from the agents' transcripts:

    explorations/coordinator/tools/spend.py <since-epoch> <transcript-or-directory>...

Ordinary workers carry no monitoring procedure, and no ask is added before a probe.

## Estimates

- Sizes in the units the project has measured: a rung, a worker session, a check run. Never in days or weeks.
- Costs in tokens, never in money, counting only what is written: cache writes and new input. Cache reads are not counted.
