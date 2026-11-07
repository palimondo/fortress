# Running and reviewing a batch

The batch workflow is `explorations/coordinator/climb-batch-workflow.js` and its manual, `climb-batch-workflow.md` beside it. Its stages run in this order: the scatter of the rungs, the rung workers, the skeptics, the judges and the repair round, the gather, the merged-diff review, the gate, and the commit stage. Read a stage's section of the manual when you reach it: `facts-extract.sh 'doc:explorations/coordinator/climb-batch-workflow.md#<heading>'`.

**batch record**
: `explorations/coordinator/CLIMB-BATCH-<N>.md`, written by the planner before the launch. Its rung sections are the workers' briefs; its other sections are for the curator.

**base**
: Commit that the batch starts from.

**gather**
: Stage that merges the rungs and folds their reports and record lines into the tree.

**merged-diff review**
: Review of the gathered diff, beside the gate, of the records, the reserved points and the routing.

**repair round**
: One round of fixes after the merged-diff review or the gate.

**commit stage**
: Last stage, which commits the landed tree and runs the pass of `references/record.md`.

**reserved point**
: Point that a batch record keeps for the curator, such as a model or APL line beyond the approved ones, or an interpreter output that a rung cannot explain.

**revival page**
: Page that tells where the revival stands: `explorations/coordinator/process-engineering/revival-story.md` and its rendered `revival-story.html`, published at the URL that `explorations/coordinator/tools/revival-page/update.py` names, with a GitHub Pages copy under `docs/revival-story/`.

**checker count**
: Errors that the compiled checker reports on the interpreter's library, up to each component's first error.

**distance**
: All the compiled checker's errors on the interpreter's library, which must reach zero before the switch-over, the move of the compiled path onto the interpreter's library. The gate's distance stage counts them (`explorations/coordinator/tools/distance/run.sh`), and FACTS holds the current value.

## The go

- The batches of PLAN's phase 3 run on a standing go, in PLAN's order. Launch each when the batch before it has landed and its own batch record has no open question.
- Put into a batch record every piece of work on PLAN's road that moves the project forward and is well defined: its decisions are taken. A new deliverable still waits for its go (`SKILL.md`, "The curator's role and decisions"). A piece that is not well defined waits. A well-defined piece waits only if it would put the batch's merge at risk. Two rungs put it at risk if the gather cannot merge their edits of one file or one declaration cleanly. A pair that merges cleanly but changes one behaviour two ways, or where one needs the other's result, goes in one batch only if one lands only with the other (the manifest's `landsOnlyWith`).
- If a question that the batch record raises is consequential (`SKILL.md`), put it to the curator first. Otherwise decide it and put it on the review list. While the curator is away, overnight, take its recommended default and put it on the review list. If that default would reverse a decision of the curator, hold that batch, and launch the repair batch (`explorations/coordinator/REPAIR-BATCH.md`) in its place.
- Have one Fable review read each coming batch record before the launch, with a go in advance. It is written for the curator in place of reading the record. Treat its questions as the batch record's.

## The workflow

- Between batches, improve the script and the manual where a batch showed a problem.
- Let every step spend the fewest workers that it needs.
- Build the base once, yourself, in a worktree where nobody compiles or runs (`args.baseBuild`). Every rung worktree is seeded from it (`explorations/coordinator/tools/seed-worktree.sh`), never built clean.
- No stage runs a build, a suite or a measurement again on a code state that another stage ran, and no agent reads again a log that has not changed.
- Let the planner give each rung its mission briefing, from the territory map (`explorations/coordinator/map/`), in neutral words: "the decisions on record", not the curator's name. Require no answers from the worker about how it searched.
- At each landing, report the share of briefed agents that read the briefing at all. Aim for all of them. By the brief's order, none reads it in its first turn.

## The roles

- The skeptic checks a rung's result after its worker, and builds nothing to check. It reads from the worker's transcript whether the test came first and failed. It runs its own small programs on the rung's build, and on the base through `explorations/coordinator/tools/old-fortress.sh` with a private caches folder. Where the rung changes the compiled checker, the skeptic also runs the count stage itself, on the base build and on the worker's commits, as `fortress-repo`'s `compiler.md`, "The checker's time", gives a reviewer. That run is the one exception to this bullet and to the rule that no stage measures a code state again.
- It checks the result against the library's way, the ledger, sibling sites and the decisions on record, and fixes what it finds, test first.
- A judge rules only on a fix that the skeptic marks contested, on a rung that the skeptic refuses, or on a rung whose worker reported that it could not go on. The first ruling runs on Opus, a second on Fable (`judgeTier`). A settled fix lands with the review and the gate as its check. Reaching a reserved point, or a file outside what the rung's section of the batch record names, does not make a settled fix contested: it lands, and the point or the file goes on the review list. A point that cannot be undone holds the batch.
- No batch compares the printed outputs of the suites' test programs, and no baseline is run to compare against.

## The checker count and the distance

Until the switch-over lands, the gate of every batch reports the checker count and the distance. Neither turns the gate red.

- If a rung's test is the checker count or the distance, it takes the last landed gate's tables as its starting values.
- If every file that a rung changes lies outside what the two measures read, the rung runs neither and lists those files (`STAGE_BLIND`). Its skeptic checks the list against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- The gate's comparisons hide Java line numbers, identity hashes and moved library positions. Put every difference that they hid on the review list. Put there too each line of the team's tests that a rung rewrote to keep its checked value, with its before and after.

## Reserved points and repairs

- A reversible reserved point does not hold the batch. The batch lands with the point's default, and the point goes on the review list.
- An output that the base already varies from run to run, with the test's verdict unchanged, is a ledger row.
- After its one repair round, a merged-diff review that still blocks does not hold a batch whose gate is green. Its findings go on the review list, for the batch after. The review runs once in each batch.
- A repair after the gate runs the gate again only if it changes what the gate reads (its part in `fortress-repo`).
- If the gate over a merged batch is red, do not bisect. Find the cause as a whole, and rework that part in the merged batch. If the gate is still red after its repair, the batch does not land: put it to the curator at once, as a hold.

## While it runs

- At a boot, read the batch record's sections for the curator, the run's journal (`references/delegating.md`) at the run ID in the check-in file (below), and the times of its agents' transcripts in the session's `subagents/workflows/<run>/`.
- The rungs, their skeptics and their judges work in their own worktrees, and do not read the main tree. The gather and the stages after it work there, and the gather needs `git status --porcelain` to print nothing. So until the gather starts, commit in the main tree as usual, by named paths, and push at once. From the gather's start until the batch's push, change nothing there. Keep `origin/main` at or behind the main tree's head, or git refuses the commit stage's push. So push `main` from no other tree. From the main tree, push nothing that the batch committed: the commit stage pushes it.
- Before the launch, name the check-in file in the boot note: `<scratchpad>/batch<N>/checkins.txt`, where `<N>` is the batch's number. After the launch, write the run's ID and each armed check-in's ID in that file. If the scratchpad loses a check-in's ID, find the check-in again with `list_triggers`.
- Workers push to their own `wip/` branches as they go. A branch holds only what `main` is to hold (`fortress-repo`, its committing part).
- If a process stop or the usage limit ends the run, resume it (`references/delegating.md`). The limit drops no rung.

## The landing

The landing check is `ledger.py landing-check BASE`, run by the gather and by the merged-diff review on the batch's base. It reports a row that breaks the template, an `XXX` test removed while a row that is not closed names it, a row that is not closed though a commit says it fixed it, and a FACTS or POSITIONS entry that disagrees with a row's status. A finding the base already had counts too. The gather clears each finding before its commit, through `rewrite`, `close` or `note`, or by a reworded entry. The merged-diff review clears any that is left in its corrections commit. So a batch lands only when the check prints nothing.

If the batch's push is held for the curator, take steps 1 to 3 at once on the local commits. Only these wait: the push, the parts of step 3's routing check that need the pushed hashes, and step 4, since the record-landing workflow pushes `main` itself. After the curator's go, push the batch yourself, by `fortress-repo`'s committing part. The review's commit of step 3 goes with that push. Then run step 4.

1. Sweep the batch agents' to-dos from the session's shared task list: `explorations/coordinator/tools/sweep-tasks.py --delete`. If another workflow still runs, add `--running`, which removes only the completed tasks. The agents write these to-dos themselves, and the harness shows the whole list to every agent.
2. Name each decision that landed in one line, and put the items for the curator on the review list.
3. Have one Opus reviewer, which only reads, check the landed changes against the decisions on record and the library's way; measure misses by kind, the briefing's use and cost, and re-measuring; and run the routing check (the manual, "After the landing: the coordinator's routing"). Have the review's section on cost count the tokens written in three spans, each on its own. Give the reviewer each span as two times, read from the commits and the workflow journals:

   - the landing work of the batch before: from its commit stage's last commit to the end of its record-landing workflow;
   - the preparation: from then to the launch of the batch under review;
   - the run: from that launch to its commit stage's last commit, which stands also while the push is held.

   Have the reviewer count a span as `spend.py` from its start less `spend.py` from its end, over the same folders. A transcript then counts in the span where it last changed.
4. After the post-batch review is committed, run the record-landing workflow (`explorations/coordinator/tools/record-landing/README.md`). It brings FACTS, POSITIONS, INDEX, PLAN and the review queue in line with the landing. Its Land stage, the step that lands its commits on `main`, also pushes them. Then it runs the orientation workflow in update mode itself, on the entries that the landing added or changed. The orientation workflow writes new text for each section of `fortress-repo`'s `revival-changes.md` that these entries touch. Next, the workflow has the skill writer install the sections that the orientation judge accepts. The writer also brings in line the sentences of `fortress-repo`'s `SKILL.md` and other parts that the landing's changes to FACTS and POSITIONS made false, and no others. A new rule, or a change of a rule's meaning, is not made in the workflow: the writer lists it for you in its reports, `writer-1.md` and `writer-2.md` in `explorations/compile-ladder/climb-batch-N/skills/`. After the workflow ends, judge each such rule on its merits: what it protects against what it costs, its ground, and whether the skill already covers it. Then take it or drop it. Give the rules that you take to your own skill writer. They land after their cold read and the writer's fixes (`references/skill-rewrite.md`, "The method"). Name the rules that you dropped, with their reasons, in one line of the message that sends the curator the one line for the page of `fortress-repo` changes (below). The workflow runs a cold read of the writer's changes, and the writer fixes its flags. Then it has a worker update the page of `fortress-repo` changes (`references/skill-rewrite.md`, "The method", step 7), and pushes the writer's commits, as its Land stage pushes the record's. Last, if every push went through, it updates the revival page with `update.py`, commits and pushes the files that the script names, and republishes the page. No step of yours comes between. Its result gives one line: the commits and the link of the page of `fortress-repo` changes (the README, "The skill update"), then the revival page's commit and version (the README, "The revival page"). If the landing made no sentence of the skill false and the orientation judge did not run, no writer starts, and the line names only the revival page. While the workflow runs, start no skill-writer task of your own on `fortress-repo`.

   Then read the workflow's commits on `main`, as the README's "Landing its result" says. If the result's `stopped` is set, take the step that the README gives for it there, or, for the revival page, in "The revival page": a stopped push leaves the commits on the local `main`, for you to push or take off. If a page's agent could not publish, the line names that page's files and URL: publish them yourself by that URL. File the orientation update's held sections, in its `queue.md`, in the review queue. Ask whether you would have done anything differently. Tell the curator of its POSITIONS changes as `SKILL.md`, "Quiet times", says. Send the curator the one line for the page of `fortress-repo` changes (`SKILL.md`, "The curator's role and decisions") when "Quiet times" allows: while the curator is away, hold it with the reports of skill changes. Once the reviews show the workflow sound, stop this review, and rely on what the workflow does.
