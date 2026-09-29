<!-- A review of the batch script's rewrite to the post-mortem's practice (`3a4aabdd3` to `fe5eaee2e`, the whole change `git diff 4bdcb9d20 fe5eaee2e`), written the evening of 2026-09-29, before batch 7b runs under it. It judges the rewrite against synthesis.md's sections 1, 2, 4 and 5, and judges the rewriter's own readings. Nothing was measured and no build was run: the evidence is the diff, the script around the changed stages, and stub runs of the script spliced with batch 7b's generated block, in the session's scratchpad (`review/scen.js`, `review/old.js`). The tracked script was not changed. Reader: the coordinator, before the launch. -->

# The rewritten batch script, reviewed before batch 7b

The short answer. The rewrite does what sections 1 and 2 say in almost every stage. It parses as the Workflow harness parses it. In 21 stubbed paths and one resume, no path stalls or loops, no prompt carries `undefined`, and no agent is told to commit scratch. Every path that lands has had a gate run on the tree it lands. Two defects must be fixed before the launch, and a third thing is a precondition owned by the work on 7b's record:

1. Removing the second review also removed the only stage that read a merged-tree repair's result. A stop that repair meets no longer holds the push, and a repair that dies or stops lands with its code finding listed nowhere.
2. Rung S is a specification rung that has no test able to fail. The new test-first check gives it no way through, where the old stand-in (committed build logs) is now forbidden scratch.
3. Batch 7b's block, as committed at `eeb76c902`, still asks the rungs for the removed practice. The edits in progress in the tree remove this.

## Findings, most severe first

### 1. Blocking: no stage reads the merged-tree repair's result beyond the paths it changed

Where: `explorations/coordinator/climb-batch-workflow.js:2744`, `const heldBy = pushHeldBy(approved, review)`. Also `:2667` and `:2674`, where `report.repairReview = await callAgent(...)` is followed only by `const after = repairRerun(report.repairReview, ...)`.

What goes wrong, in two parts:

- **A stop the repair meets holds nothing.** The repair's result has a `stopsMet` field, because `MERGED_REPAIR_SCHEMA` extends `RUNG_SCHEMA`, but `pushHeldBy` (`:2072`) reads only the landed rungs and the review. In the stub run where the review's repair meets a stop no decision lifts (A10), the batch pushes. Run on the pre-rewrite script, the same case holds the push (old.js), because there the second review's check 10 read the repair's commit. The manual says that was the second review's reason to exist: "a stop the repair met and did not report is one only this review's check 10 finds" (`climb-batch-workflow.md`, "Rules weighed", item 2, now marked superseded). The synthesis keeps the held push "as now" in sections 1 and 5.
- **A repair that does not finish leaves no trace.** The repair can return nothing after three attempts (A11). It can also return `stopped` with nothing changed (A12). Either way, the batch lands on a gate of the unrepaired tree, and the code finding the judge upheld appears nowhere: `forPavol` is empty. The pre-rewrite flow listed it as `review2-blocking.1` (old.js). In A12 the commit prompt's step 1a also describes the stopped repair as one "that changed test files and records only".

Fix, a few lines:

- Pass the merged repairs to the push rule, `pushHeldBy(approved, review, [report.repairReview, report.repairGate])`, and read each repair's `stopsMet` the way the rungs' are read.
- When the review's repair returns nothing, reports `stopped`, or reports `landed` false, push `numbered('review-unrepaired', review.blockingCode)` into `mergedItems`. Do not hold the push for it: Pavol's rule of 2026-09-29 is that a review still blocking after its repair does not hold a green batch.

### 2. Blocking: a specification rung has no route through the new test-first check

Where, in the script:

- The skeptic's check 3 for a rung without `testIsStage` (`:1328`): "Check out the worker's test-only commit, or put the new test on the base alone, and run it through the harness ... A test you cannot see fail on the base is refused - this is not negotiable".
- The worker's step 3 (`:1280`): "Run it through the harness BEFORE the edit exists and see it fail. Commit the test alone."

Where, in batch 7b's record: rung S sets `testIsStage: false`, and its section says "**How it is checked.** No test can go red for a prose edit." and "**For the skeptic.** There is no program to run both ways."

What goes wrong: earlier specification rungs met the old check with a stand-in. Rung S of batch 5, for example, committed the base build's logs in a first commit that touched only `explorations/` (`compile-ladder/rung-spec-route-a/SKEPTIC.md:16`, "What stands in for it was captured before any edit, in the first commit"). Under the new practice those logs are scratch that is never committed, and nothing takes their place. So S's worker is told to write a failing test first, and S's skeptic is told that a missing failure cannot be negotiated. The likely result is a refusal with a judge and a repair round on S, or an invented test. This is the petty stop the post-mortem set out to remove.

Fix, one sentence in each of the two places, or once in S's section while its re-anchoring is open:

> A rung whose section says no test can go red for its edit (a prose edit of `Specification/`) makes no test-only commit. Its section's own check stands in: the specification built on the base and on the branch, with the text diff quoted in REPORT.md with its commands. The skeptic builds both itself and does not refuse for a failure no test can show.

### 3. Blocking, owned by items 63-64 (not the rewriter's): 7b's block as committed still asks for the removed practice

Where: the block that `gen7b.py` generates from the record as committed at `eeb76c902`. It still contains:

- `gen7b.py:235`, "every list a rung hands Pavol is also a capture under probes/" (the sentence of item 11);
- `:236`, the three-pass comparison and deleting its caches;
- W's and L's "**The comparison.**" paragraphs, with the two microGPT checks "before and after", the machine line, and "pass caches deleted once captured";
- W's "**What comes back to Pavol.**", which asks for "The changed outputs with their causes" and "the two microGPT checks' result";
- W's and C's "captured failing on the base" and "that capture is the recorded failure";
- `:233`, the gather rebuilding the specification PDF, which the commit stage now also does (item 38): two builds of the same PDF.

Under the rewritten prefix, each rung's tail would contradict its brief. When this was written, uncommitted edits in the tree to `CLIMB-BATCH-7.md`, `gen7b.py`, `lists7b.py` and `check7b.js` had already removed the comparison paragraphs, the `probes/` sentence and the gather's build. The launch waits until those edits land and `gen7b.py` and `check7b.js` report no problems on the landed record.

### 4. Not blocking: a process stop in the commit stage, resumed, can start the microGPT programs twice

Where: the commit stage's step 4 (`:2141`), "Start the two microGPT programs under walk on the landed tree in the background". Its guard exists only in `recoverCommit` (`:2412`): "If ... microgpt-walk.txt exists, the earlier attempt took step 4".

What goes wrong: a run resumed with `resumeFromRunId` takes every finished call from the journal and runs the unfinished commit stage live, with its plain prompt. The retry head and the recovery list are given only to attempts 2 and 3 inside one run. In the stub resume (A18), 11 calls came from the journal and the commit ran live with no retry head. Background shell runs survive a process stop (FACTS, "A restart of the session's own process kills its background runs ..."). A second `mg-run.sh` would therefore `rm -rf` the private caches of the programs already running, truncate their output files, and put four 4 GB JVMs on the box at once.

Fix: put the guard in step 4 itself, as `[ -e tmp/gate-batch-<N>/microgpt-walk.txt ] || run_bg ...`.

### 5. Not blocking: the review's routed findings are recorded nowhere in the tree

Where: `reviewRole`, "you return in routed, each with the step the next batch owes ... it goes to the next batch and is listed for Pavol" (`:1728`), and the run's `mergedItems.push(...numbered('review-routed', routedFindings))` (`:2620`).

What goes wrong: the routed findings reach only the run's result, as items with `inPlan` false (R2, A15). The review is not told to put them into `PLAN.md`. `RECORD.md` is closed to them: the gather writes it before the review, and the commit stage adds only the hashes, the gate's summary line and "Not pushed.". An owed test that the next batch must write therefore lives only in the journal until the coordinator's landing report copies it.

Fix: tell the review to put each routed finding into `PLAN.md` by `PLAN_RULE`, as `review-routed.1`, `.2` in the order of `routed`, and to list the ids in `pavolItems`.

### 6. Not blocking: the review's second rule still lets it fix source itself

Where: `reviewRole`, "## Two rules because the gate is running beside you" (`:1730`, `:1736`): "if a correction genuinely needs a source file, make it and report it rather than leaving it". This stands against the rewritten "A defect whose repair touches a path outside explorations/ that is not a test file ... you do NOT fix; you return it in blockingCode".

What goes wrong: a review that follows the older sentence repairs code with no judge. The gate does run again (A14), so nothing lands ungated, but the judge that the synthesis keeps for a code finding is skipped.

Fix: "Keep your own fixes inside explorations/: a correction that needs any other path goes in blockingCode or routed."

### 7. Not blocking: two refusal rules now contradict each other

- The worker's step 10 (`:1288`) says "Your skeptic opens every line the block cites and refuses the rung if one is missing or does not say what the block says". The rewritten check 2 (`:1325`) makes that "a required correction, not a refusal".
- For a `testIsStage` rung, check 3 (`:1327`) refuses a rung "whose report's diff is not the diff of those two tables". Check 10 (`:1341`) says "A mismatch between the table and the report is a finding for repair, not a stop".

Fix: in step 10, "... and asks for a correction if one is missing ...". In check 3, refuse only when the post-edit table cannot be reproduced; a report whose diff differs is a required correction.

Check 2's move from refusal to correction was not on the rewriter's list. It is sound under section 1's rule, "Refuses only for the change or the test".

### 8. Not blocking: home 2 still asks the report to cite captures

Where: the prefix, home 2 (`:1187`), "and the report cites both captures", against "What you cite" (`:1210`), "never cite a file under tmp/". The rewriter left this conflict open, as it said.

Fix: "and the report quotes each run's verdict line with its command".

### 9. Not blocking: `git worktree remove --force` discards what it need not

Where: the commit stage's step 5 (`:2144`), "git worktree remove --force <worktree> (its tmp/ goes with it; ...)".

What goes wrong: git removes an ignored `tmp/` without `--force`. Checked on git 2.43: a worktree whose only extra files are under an ignored `/tmp/` is removed, and one with an untracked file is refused with "contains modified or untracked files, use --force to delete it". So `--force` adds only one thing: the silent loss of uncommitted or untracked work. The step's own check, "nothing ahead of its origin", does not see that work. This is item 39 implemented as written; the synthesis assumed the flag was needed.

Fix: drop `--force`. A worktree git refuses to remove is named in the result with its `git status --short`, and the coordinator decides.

### 10. Not blocking: a `testIsStage` rung's post-edit step comes before its edit

Where: the rung worker's order of work for a `testIsStage` rung. Step 3 (`:1265`), "After the edit, run the stage once ... Start the distance stage in the background at once", comes before step 4, "Make the edit" (`:1282`), and step 5, "Rebuild".

What goes wrong: the old step 2 ran the stage before the edit, so "after the edit" read as a forward reference. Now step 3 is the first action after the briefing. A worker that takes the steps in order runs the post-edit stage on the base. Alternatively, it starts the 13-to-24-minute distance stage before its last edit or its rebuild. Rung L of 7b is such a rung.

Fix: "3. After steps 4 and 5, ...", or move the paragraph below step 5.

### 11. Not blocking: the skeptic's run on the base leaves its worktree off the branch

Where: check 3 (`:1328`), "Check out the worker's test-only commit ... Then run it at the branch's head".

What goes wrong: nothing tells the skeptic to return to the branch and rebuild before its own differentials and its commit. A `SKEPTIC.md` committed on a detached HEAD does not reach the branch. The gather still writes the file from `skepticText`, so the text is not lost.

Fix: add "then git checkout <branch> and rebuild before your own programs".

### 12. Not blocking, and not new: a merged-diff review that dies lands the batch with nothing said

Where: the run's end (`:2744`). When the review returns nothing after three attempts, the batch lands with no merged-diff review, and nothing in the result says so (A13). The pre-rewrite script did the same for the first review (old.js). But it held the push when the second review returned nothing, and there is now no later look inside the batch.

Fix: `if (!review) heldBy.push('review: the merged-diff review returned nothing ...')`, or at least an item for the coordinator.

## The rewriter's readings

- **Item 11 not done:** sound. `:894` is inside batch 6.5b's embedded MANIFEST block (lines 58 to 902), which the splice replaces. The same sentence is at `gen7b.py:235`, still there at `eeb76c902` (finding 3).
- **Item 8, the decision record:** sound, and needed. S's section asks for "a decision record in the rung's own directory", and the gather's step 6 (item 28) lands `decision-record.md`.
- **Item 13, the distance stage always started:** sound. Section 1 says a `testIsStage` rung "starts the distance stage in the background at the edit". The order of the steps is finding 10.
- **Item 17, the ladder driver copied into `tmp/SLUG/ladder/`:** sound.
  - `run-subset.sh` hard-codes `OUT="$FORTRESS_HOME/explorations/compile-ladder/repair-r1-atomic-static"` (`:33`) and reads `$OUT/subset.txt` (`:136`). Run where it stands, it would write into its own tracked folder in the worktree.
  - A copy three levels down keeps the relative `source .../../../explorations/experiment/env.sh` working, as the gate's copy does.
- **Item 28, `record.md` out of the index after folding:** sound. The branch's patch is applied with `git apply --3way --index`, so the file is staged and must leave the index as well as the tree. The main-tree judges and the review now read "the lines folded from its record.md" (checked in the rendered prompts).
- **Items 31-32, the checks renumbered, `checkerRows` removed, the count-table check moved:** sound.
  - No code reads `checkerRows` or a review check by its number.
  - Manual line 78 records the renumbering.
  - The check's text is in the manual's "After the landing" section, for the coordinator to carry into 7b's post-batch brief.
- **Item 34, the judge runs whenever `blockingCode` is non-empty:** sound.
  - The synthesis says "only when blockingCode is non-empty", so `approved` is rightly not consulted.
  - `review-routed.N` ids appear (R2, A15).
  - A missing test for a text mismatch is a test owed, which section 2(b) routes.
- **Items 36 and 39, the microGPT start as step 4, also when the push is held:** sound. With a held push, the landed local tree is the one to measure.
- **The 5,400 s timeout:** sound. The 4,761 s and 4,792 s were measured on the same box as rung E's passes, at load 8 to 36 (`compile-ladder/rung-rr32-sibling/REPORT.md`, section 14). A timeout would show as `rc=124` in the file. Resume is finding 4.
- **The merged-tree repair's captures under `tmp/gate-batch-<N>/`:** sound. The "# repair-tests" lines of `summary.txt` no longer carry a path, and the schema's `capture` says "not committed".
- **Home 2 left conflicting:** a defect, finding 8, with its fix.

## The scenarios run

All runs used copies in the session's scratchpad. The tracked script was not touched. Batch 7b's block was generated from the record as committed at `eeb76c902`, with `OUT7B` pointing into scratch and without `--paste`.

- **The rewriter's `check.sh`:** the harness parse is ok and `node --check` is ok. Its `check7b.js` run reported 5 problems against its own `out7b/`. The cause is that the block there (generated at 22:09) no longer matched the record, which `eeb76c902` changed at 22:26. Regenerated into scratch: `gen7b.py` wrote 653 lines, and `check7b.js` reported 0 problems. The script, and the script spliced with the block, both parse as an async function body with the export taken out.
- **The rewriter's `stubrun.js`:** its seven merged-tree cases all passed.
- **`review/scen.js`:** 21 paths through the spliced script plus one resume, with every agent stubbed. The results:
  - R1 every agent approves: lands.
  - R2 the review routes a tests-only finding: no judge, lands, item `review-routed.1`.
  - R5 a code finding whose repair changes a checker source: the gate runs again, lands.
  - A1 W's skeptic refuses twice: W `dropped`, listed to the gather as not landed; the rest lands.
  - A2 C dropped by its judge: S `withheld` by `landsOnlyWith`; both are listed to the gather; the rest lands.
  - A3 every rung dropped: "no rung approved", no gather.
  - A4 L stops, its judge rules a continuation, the resumed worker lands.
  - A5 a red gate whose judge rules stop: not landed, item `judge-gate.1`.
  - A6 a red gate whose judge dies on all three attempts: not landed.
  - A7 a code finding whose repair turns the gate red, then a code repair and a second gate that is green: lands. The gate's judge ran at the second tier.
  - A8 as A7 with the second gate red too: "gate red twice", not landed.
  - A9 a red gate beside the review, answered by the review repair's tests-only runs: no gate judge, step 1a written, lands.
  - A10 the review repair meets an unlifted stop: pushes. Finding 1.
  - A11 the review repair dies: lands, with the finding unlisted. Finding 1.
  - A12 the review repair stops with nothing changed: lands, with the finding unlisted, and step 1a written as for a tests-only repair. Finding 1.
  - A13 the review dies: lands, nothing said. Finding 12.
  - A14 the review fixes a test file itself: the gate runs again, lands.
  - A15 routed and code findings, the judge rules land: lands, items `review-routed.1`, `.2` and `judge-review-land.1`.
  - A16 the gather is unresolved: stops after the gather.
  - A17 a skeptic's unlifted stop: push held, step 4 still starts the programs, step 5 keeps the worktrees.
  - A19 W's worker dies on all three attempts: W `worker-died`, the rest lands.
  - A20 the gate cannot run: "gate could not run".
  - A18, the resume: the run was stopped inside the commit stage and resumed from its journal. 11 of 12 calls came from the journal. The commit ran live with the plain prompt and no retry head. Finding 4.
  - Across every path: no prompt holds `undefined`, `[object Object]` or `NaN`, and no skeptic prompt carries the worker's `reportText` or `recordText`.
- **`review/old.js`:** A10 to A13 run on the pre-rewrite script (`4bdcb9d20`), spliced with the same block, with the second review stubbed as its brief asks it to act. This tells a regression from old behaviour:
  - A10: push held by the repair's stop.
  - A11 and A12: land with `review2-blocking.1` listed.
  - A13: lands with nothing said, as now.
- **Not run:** `plan-n/manifest/checkn.js`, which expects the removed second review.
