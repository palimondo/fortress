# Running and reviewing a batch

The batch workflow's script and its manual, `explorations/coordinator/climb-batch-workflow.md`, hold each stage. Read a stage's section of the manual when you reach it: `facts-extract.sh 'doc:explorations/coordinator/climb-batch-workflow.md#<heading>'`. This part holds what you decide around them. How to brief and resume the agents is `references/delegating.md`.

**batch record**
: `explorations/coordinator/CLIMB-BATCH-<name>.md`. Its rung sections are the workers' briefs. Its other sections are for the curator.

**base**
: Commit that the batch starts from.

**skeptic**
: Agent that checks a rung's result after its worker.

**judge**
: Agent that rules on a rung where the skeptic and the worker disagree.

**gate**
: Full check of the merged tree before it lands (the `fortress-repo` skill, its gate part).

**reversible stop**
: Point that a batch record reserves for the curator and that can be undone.

## The go

- The phase-3 batches run on a standing go, in PLAN's order. Launch each when the one before has landed and its record has no question open.
- Put a question that a batch record raises to the curator first. Overnight, take its recommended default and list it for review. If that default would reverse a decision of the curator, hold that batch, and let the repair batch take the slot.
- A top-tier review in place of a coming batch record needs no further ask.

## The workflow

- Improve the script and the manual whenever a batch shows a problem.
- Let every step spend the fewest workers that it needs, and measure nothing that the record holds.
- Weigh each rule of the workflow by what it costs against what it protects.
- Before the launch, consolidate FACTS (`references/record.md`).
- Build the base once, yourself, before the launch, in a worktree where nobody compiles or runs (`args.baseBuild`). Every rung worktree is seeded from it (`explorations/coordinator/tools/seed-worktree.sh`), never built clean.
- No stage runs a build, a suite or a measurement again on a code state that another stage ran.
- Let the planner give each rung its mission briefing from the map, in neutral words: "the decisions on record", not the curator's name. Ask the worker no required questions about its search. At each landing, report the share of agents that used the briefing.

## The roles

- The skeptic builds nothing to check. It reads from the worker's transcript whether the test came first and failed. It runs its own small programs on the rung's build, and on the base through `explorations/coordinator/tools/old-fortress.sh` with a private caches folder.
- The skeptic checks the result against the library's way, the ledger, sibling sites and the decisions on record. It fixes what it finds itself, test first.
- A judge rules only on a fix that the skeptic marks contested, a rung that the skeptic refuses, or a worker's stop. The first ruling runs on Opus, a second on Fable (`judgeTier`). A settled fix lands with the review and the gate as its check.
- No batch compares the corpus's printed outputs, and no baseline is run to compare against.

## The checker count and the distance

The gate measures the checker count in every batch, and the distance to the switch-over in the phase-3 batches. Neither turns the gate red (P-39).

- A rung whose test is one of these stages takes the last landed gate's tables as its before.
- A rung whose paths all lie where the stages cannot read runs neither stage, and lists the paths (`STAGE_BLIND` in the script). Its skeptic checks the paths against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- List for the curator every difference that a comparison masks, and every team test line that was respelled, with its before and after.

## Stops and repairs

- A reversible stop does not hold the batch. It lands, it is listed for the curator's review, and the next batch goes ahead.
- An output that the untouched tree already varies from run to run, with the test's verdict unchanged, is a ledger row, not a stop.
- After its one repair round, a merged-diff review that still blocks does not hold a batch whose gate is green. Its findings go to the next batch and are listed for review. The review stays inside the batch, once.
- A repair after the gate runs the gate again only if it changes what the gate reads (the `fortress-repo` skill, its gate part).
- If the gate over a merged batch is red, do not bisect. Find the cause as a whole, and rework that part in the merged batch. A red gate after its repair stops the batch.

## While it runs

- Say nothing to the curator (the core, "Quiet times").
- Workers push to their own `wip/` branches as they go. A branch holds only what `main` is to hold (the `fortress-repo` skill, its committing part).- If the process stops or the usage limit stops the run, resume it (`references/delegating.md`). A usage limit decides nothing.

## The landing

1. Fold the batch's entries into FACTS (`references/record.md`, "The pass").
2. Have the writer update `fortress-repo`'s `references/revival-changes.md`, so that the next batch reads it fresh (`references/skill-rewrite.md`).
3. Name each decision that landed in one line, and list the items for the curator in PLAN under the batch.
4. Run one review, by an Opus reviewer that only reads: conformance, the process measures against `explorations/reviews/process-review-6b-7-7R.md`, and the routing check.
5. File what the review finds in PLAN (the manual, "After the landing: the coordinator's routing").
