<!-- A map of every record of the phase 3 exit review and the layers that grew from it (2026-10-24 to 10-28), with a judgement on whether they form one process and a proposal for the curator, not done, on where they should live; written 2026-10-28 by an Opus worker from INDEX, git and the files' headers. -->

# The records of the phase 3 exit review: map and proposal

## Summary

The records are one process with six layers. They sit in ten places: two review folders, two probe folders, the post-mortem folder, the conversations folder, climb batch 22c's record and probe folder, the boot note, and one review-queue item. About 1.34M characters are tracked, in 87 commits since the hold of 10-24. Inside each folder, the rule of evidence beside a results file holds. Across folders it fails: the salvage has no results file, so its three files sit in the foundations review's evidence folder, and the post-mortem sits apart from the review it examines. The rule of one home fails twice: the exit judgement's open asks and 22c's questions wait only in the boot note, not in the review queue; and no file names the process as a whole. PLAN names neither the review nor 22c.

Proposal, for the curator: leave the files where they are. Add one README, `reviews/phase3-exit/README.md`, that lists the layers with their files, and give it one INDEX line. Move the open asks into the review queue. Cost about 0.3M to 0.5M tokens written. A move into one folder breaks about 50 live citations (FACTS, the ledger, 22c's generator) and 16 in history files that may not change. It costs about 1.5M to 3M tokens written. I recommend the README.

## 1. The map

Sizes are characters. "Coordinator" is the coordinating session (Opus 5.5, then Fable 5.1 from about 05:50 UTC on 10-28).

**Before the process (inputs and context)**

- `coordinator/CLIMB-BATCH-23.md` (77K) and `climb-batch-23-review.md` (29K), 10-24. Batch 23's record, held at his word at 11:36 UTC on 10-24 for a review between the phases. Context, not a layer.
- `perf-probes/export-abstract-codegen/` (38K), 10-24 05:39. Row 816's probe. Opus. Input.

**`reviews/phase3-exit/`** (163K, 3 files, 10-24)

- `decisions-evidence.md` (66K): the entries against the designers' word. Opus. The review.
- `zero-audit.md` (47K): phase 3's zero, measured. Opus. The review.
- `judgement.md` (50K): the exit judgement. Fable. The judgement.

**The judgement's follow-ups**

- `perf-probes/anyintegral-comprises-where/REPORT.md` (18K), 10-24 16:23. A probe on the judgement's question. Opus. The judgement.
- Filings, not files: `e21ab5389`, `081099714`, `e15da7608`, and P-158 (`edbd0d4f5`, `5da8144e4`). The judgement.

**The foundations round** (10-26, in `reviews/foundations/` unless named)

- `bound-archaeology.md` (62K): step 1, the implicit bound's history. Sonnet scout. The review (foundations round).
- `perf-probes/bound-any-compiled/REPORT.md` (31K): step 1, the bound `Any` on the compiled path. Opus probe. The review.
- `tenets-evidence.md` (98K): step 2, the nine tenets' grounds by layer. Opus. The review.
- `prelude-lens.md` (44K): the changes against the compiler's prelude. Opus. The review.
- `judgement.md` (55K): the foundations judgement. Fable. The judgement. Its routing `0d2206c5f` filed rows, facts and queue item 278. Its page: https://claude.ai/artifact/6VahEN8k6uySguRuxcTWJk.
- `rewrite-results.md` (7K): the 13 texts and the trap test's result. Coordinator. The rewrite.

**`reviews/foundations/evidence/`** (498K, 31 files)

- `trap-test/` (136K, 6 files), 10-26: scenarios and key (Opus, key reconciled by the coordinator), two readers' answers and blind grades (Opus). The rewrite.
- `rewrite/` (330K, 22 files), 10-26: the clarity run `wf_36572c60-a05`, chunks `c1/` and `c2/` (Opus writer, cold readers, checker and judge), `combined.apply` (coordinator). `run-brief.md` (8K), the coordinator's run brief, copied in on 10-27. The rewrite.
- `salvage-inventory.md` (11K), 10-27: the work since 10-26 06:11 UTC, with tiers. Sonnet. The salvage.
- `salvage-findings.md` (16K), 10-27: the reports' findings per entry. Sonnet. The salvage.
- `salvage-sort.md` (4K), 10-28: the findings sorted, for the scope ask he refused. Coordinator. The salvage.

**Climb batch 22c** (10-26)

- `coordinator/CLIMB-BATCH-22c.md` (101K): the batch that closes phase 3. Opus planner. The batch's plan.
- `coordinator/climb-batch-22c-review.md` (30K): review in place. Fable. The batch's plan.
- `compile-ladder/plan-22c/` (105K, 10 files): the manifest generator and the planner's probes. Opus planner. The batch's plan.

**`conversations/02-phase3-exit-foundations.md`** (20K), 10-26 07:57, section 9 added 17:43. The dialogue of 10-25 18:50 to 10-26 17:40 UTC. Coordinator. It spans layers 1 to 4.

**`coordinator/postmortem-2026-10-28/`** (111K tracked, 6 files, 10-28). The post-mortem.

- `account.md` (28K): why the rewrite failed, how to run the corrections. Opus, under revision.
- `evidence/map.md` (9K): the librarian's map. Opus.
- `evidence/timeline-10-26-to-10-28.md` (20K), `last-consolidation.md` (19K), `tools-and-skills-history.md` (20K), `scope-recheck.md` (16K). Sonnet scouts.
- Not committed, in progress at 10:42 UTC: `evidence/.brief-genesis.md.tmp` (24K, Sonnet), `evidence/haiku-and-row-816.md` (Opus), and this file (Opus).

**Live state files**

- `coordinator/BOOT.md` (20K): rewritten whole 50 times since 10-24 11:30. It is the only home of the salvage's narrative and of the open asks. All layers.
- `coordinator/HELD.md`: his lines of 10-27 and 10-28 on this process, among them 10:39, which asked for this map. Salvage and post-mortem.
- `coordinator/review-queue.md`: item 278 only (a cast's exception kind). The judgement.
- `coordinator/PLAN.md`: row 816's repair line only.

**Off the tree**: `tmp/record-writer/foundations/*.json`, the scratchpad's briefs, and the rejected texts page, https://claude.ai/artifact/5noPHbJmZg41UWT74HGxno.

## 2. The layers

1. **The review** (10-24 11:36 to 10-24 15:09; second round 10-26 06:11 to 08:10). Asked: is the zero of climb batch 22 one the switch-over can use, and do the decisions and defaults bend the designers' word? His questions of 10-25 and 10-26 added the foundations round: do the nine tenets hold? Produced: the evidence maps, the audit, the archaeology, two probes, the prelude sweep. Left open: nothing; it fed the judgements.
2. **The judgement** (10-24 15:09; 10-26 08:23). Asked: what to correct before phase 4. Produced: the zero true for the twelve, not for the switch-over; row 816 reversed (P-158); filings in the ledger and FACTS; item 278; the verdict page. Left open, in the boot note only: P-75's withdrawal; the texts of P-146, P-154, P-156, P-68, P-79 and P-155; P-58's informed yes; the judgement's ask 2; the `AnyIntegral` and code-generation probes' questions; the one-word asks on P-42, P-26 and P-43.
3. **The rewrite** (10-26 08:27 to 12:13). Asked, at his yes: two sentences for P-37 and P-26, the judgement to flag others. Produced: 13 rewritten entries, a trap test at 12 of 12, the texts page. He rejected the texts between 19:08 and 19:26 UTC. Nothing entered POSITIONS. Left open: the corrections themselves.
4. **The batch's plan** (10-26 10:21 to 12:14). Asked, by his framing of 07:30 UTC: close phase 3 cleanly. Produced: 22c's record, its review and its probes, ready on his answers. Left open: questions 2 and 3 and the batch's go, in the boot note only.
5. **The salvage** (10-27 07:12 to 10-28 05:57). Asked: keep the review's sound work as small, targeted corrections. Produced: the inventory, the findings, the sort, the hook undone (`18788035c`). His "No. No go" at 07:47 on 10-27 refused a plan; he could not decipher the scope ask of 10-28. Left open: no correction written; no results file.
6. **The post-mortem** (10-28 07:42 onward). Asked: what bent the run brief, and how to run the corrections now. Produced: the map, four scout files, the account. Left open: the account's revision after his corrections of 09:56 and 10:28; the brief's genesis; the Haiku question.

## 3. Judgement

These records are one process. Each layer has a cause in the layer before it, and the post-mortem's own aim is to run the salvage's corrections. The batch's plan is a branch: it is the review's product for the tree, and it runs by the batch practice.

Where the rules hold:

- Each file has one home, by its kind (reviews, probes, dialogue, batch). I found no file held twice.
- The evidence rule holds inside the rewrite (`rewrite-results.md` with `evidence/rewrite/` and `evidence/trap-test/`), inside the post-mortem (`account.md` with `evidence/`), and inside the batch (`plan-22c/` by the batch's own rule).

Where they fail:

- The salvage's three files sit in the foundations review's `evidence/`, but no results file there draws on them. By the rule they are working files of a run whose results file does not exist yet.
- The review steps (both evidence maps, the zero audit, the archaeology, the prelude sweep, two probes) are reports that the judgements draw on, so by the rule's letter they are evidence. They sit at top level with INDEX lines, as in the other review folders, and FACTS cites the zero audit as a result. This fails the letter, not the purpose.
- No file names the process. Its 15 INDEX lines are spread over four parts of INDEX. The post-mortem sits in `coordinator/`, apart from the review it examines.
- The skill makes the review queue the one home of each item that waits on him. The exit judgement's open asks and 22c's questions wait only in the boot note. The boot note also carries the salvage's history, which each rewrite of a state file loses.
- PLAN does not name the review, its judgements or 22c. Its "Next" still names phase 4's first batch.

## 4. Proposal for the curator (not done)

**Option A: consolidate in one folder.** Make `reviews/phase3-exit/` the home. Move `reviews/foundations/` to `reviews/phase3-exit/foundations/` and `coordinator/postmortem-2026-10-28/` to `reviews/phase3-exit/postmortem/`. Move the three salvage files to `reviews/phase3-exit/salvage/evidence/`, under a new results note. Leave the batch's record, the probes and the dialogue in their kinds' homes. Then repoint about 50 live citations: FACTS (5, by `record.py`), the ledger (9, by `ledger.py`), the queue (2), 22c's record (15) and generator (3), INDEX (about 15), BOOT, PLAN, the dialogue, and the moved files' own cross-references. The 16 citations in `FACTS-history.md`, `POSITIONS-history.md` and the ledger's history may not change, so they dangle unless the old folders keep a redirect file. Do not move before 22c lands: its generator reads these paths. INDEX would then hold one line for the folder's README and the moved lines repointed. Cost: one Opus worker, about 1.5M to 3M tokens written, an estimate.

**Option B: leave the files, add one index note.** Write `reviews/phase3-exit/README.md`, about 5K: the six layers in order, each with its files, its results file, what it left open, and pointers to 22c's record and the post-mortem. Its INDEX line: "`explorations/reviews/phase3-exit/README.md`: The phase 3 exit review as one process, 2026-10-24 onward: its six layers (the exit and foundations reviews, their judgements, the rejected POSITIONS rewrite, climb batch 22c's record, the salvage, the rewrite's post-mortem), each with its files and what it left open." Also make the open asks of layers 2 and 4 review-queue items, and give the corrections run its results file beside the salvage's evidence, in `reviews/foundations/`. Cost: about 0.3M to 0.5M tokens written, an estimate.

**Recommendation: option B.** The files sit in the homes that their kinds give them. What is missing is one place that shows the process, and the README gives it. A move costs about five times as much, leaves citations dangling in history files that may not change, and puts 22c's launch at risk.
