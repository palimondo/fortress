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
- A brief for a judgement on a type rule names the team's later sources, so that the judge weighs them beside the papers of 2011 and 2012:
  - the extract of the POPL 2019 paper: `research/extracts/ParkPOPL2019-extract.md`;
  - the recheck of the decisions against that paper: `explorations/reviews/decisions-review/popl-recheck.md`;
  - the section "After the repository" of `explorations/coordinator/map/design-intent-sources.md`.
- It names the points to report: the kinds of change or finding that the curator wants to review. The work goes on when it reaches one; the report lists it. What else the report holds is the report contract, which the brief does not restate.
- It tells the worker to load the `fortress-repo` skill, which holds that contract: a worker that only reads and reports would not load it on its own.

## The batch workflow's measurements

The batch workflow's gate (`explorations/coordinator/climb-batch-workflow.js`, its manual `climb-batch-workflow.md`) adds two measurements to the suites. The checker count is the errors that the compiled checker reports on the one library before each api's early return; it is red only on a new crash line, a stale shadow or a missing total. The distance to the switch-over is every error over all the prelude's apis and components; it is reported, never red. Their tools are under `explorations/coordinator/tools/checker-count/` and `distance/`, and the script's prompts say how to run them. They are the ladder's metrics: workers meet them only through the workflow or a brief that names them, never through the `fortress-repo` skill.

## After every landed batch

One combined review, by one Opus worker that only reads: conformance (each rung against the decisions on record and the designers' intent), the process measures (misses by kind, those of items in the rung's own briefing, map use, briefing cost, measurements repeated, tokens written by role) and the routing check (every finding has a home). The coordinator files what it finds in PLAN at the landing, each finding at the home it names. The earlier reviews are `explorations/reviews/batch-*-review.md`.

The batch writes no skill text. After the landing, and before the next launch, update the skills:

1. Give the skill writer one task: the batch record's section "Revival changes, for the skill writer", and the skill sentences that the review lists as false.
2. Launch a cold read of the changed parts. Give its agent only the skill and the brief `explorations/coordinator/skill-cold-read-brief.md`.
3. Give the writer the cold read's flags to fix.
4. Push the writer's commits.

An answer of the curator that confirms a landed default changes no skill text. An answer that reverses a default changes the code in a batch, and the skill after that batch lands.

## Watching what it launches

If you launch a long or large run outside a batch, give it an estimate and watch it against the estimate. An example is a probe that builds and runs suites for an hour or more.

- If the run passes its estimate, react: give the worker an instruction, or end the run.
- In its brief, say what keeps it efficient. That includes how the worker waits: it polls a long run in steps under 270 s, or it hands the run to a script and ends its turn.
- Watch the spend yourself. No brief asks a worker to measure, project or cap its own token spend. Read the spend from the agents' transcripts:

      explorations/coordinator/tools/spend.py <since-epoch> <transcript-or-directory>...

Give ordinary workers no monitoring procedure. Add no ask before a probe.

## Estimates

- Sizes in the units the project has measured: a rung, a worker session, a check run. Never in days or weeks.
- Costs in tokens, never in money, counting only what is written: cache writes and new input. Cache reads are not counted.
