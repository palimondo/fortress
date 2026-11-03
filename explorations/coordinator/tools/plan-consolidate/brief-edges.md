<!-- The edges of PLAN's consolidation of 2026-11-03: the writer's part (PLAN's header comment with the pass's base commit, the "Next" bullet of "Where we stand", the history's opening paragraph, and the review queue's "Home:" lines that the script cannot repoint), after the fix round. The coordinator's mechanical part (line 173's move, the repointing that the script can do) is in README.md, step 8. Sent to writer stream 1, resumed (README.md, step 8). The coordinator puts the pass's base commit for AT. -->

# The edges of PLAN's consolidation of 2026-11-03

The four chunks are written, checked and fixed, and filled into PLAN in the worktree `/home/user/fortress-plan-3`. The pass's base commit, the commit that the worktree was made at, is AT. The coordinator has run two mechanical steps already:

- Line 173 of `8ab0dcd48`, "PLAN's own consolidation" under "Work that can start now, with no decision", has moved word for word to PLAN-history, under the pass's heading. The pass closes it.
- Each review-queue "Home:" clause that named one moved line under one heading now reads `PLAN-history, "Moved at the consolidation of 2026-11-03", under "HEADING", WORDS`. The script did this.

The common brief's register, fidelity and report rules hold for this task. You write four things.

## 1. PLAN's header comment, line 1

Write it in `/home/user/fortress-plan-3/tmp/plan-consolidate/edges.lines`, as an entry `@1` and then the new line 1, whole. The old line 1 is in PLAN-history, under "The preamble, above the title". Keep it word for word, and add one sentence before its last sentence ("Sizes are in batches and rungs, never days."), in the form that the consolidation of 2026-10-30 used: PLAN was consolidated a third time on 2026-11-03, by the same method, on the inventory `process-engineering/plan-consolidation-2026-11-03/inventory.md`; each line that changed moved word for word to PLAN-history.md, under "Moved at the consolidation of 2026-11-03"; a line citation PLAN.md:N made before it reads from AT (git show AT:explorations/coordinator/PLAN.md). The record cites PLAN by line in about 1,400 places, so this sentence is what keeps those citations readable. Keep the comment one line.

## 2. The "Next" bullet of "Where we stand"

Write it in the same file, as an entry `@13` and then the new bullet, whole. The script put in the inventory's section 5 text for "Where we stand", and marked its "Next" bullet. Bring that bullet up to date from the boot note, `explorations/coordinator/BOOT.md`, as it reads now: its state line and its "Next, for the coordinator, in order". Keep the bullet's form: `- **Next.** `, then what comes next in his order, then "What is in flight is `coordinator/BOOT.md`." PLAN's consolidation is landing with this pass: name what comes after it, not the pass itself. Keep it about the length of section 5's bullet (about 900 characters at most). Write no clock time that the boot note does not give.

## 3. The opening paragraph of the history section

The script wrote one paragraph under "## Moved at the consolidation of 2026-11-03", at the end of `explorations/coordinator/PLAN-history.md`. Extend it with Edit, in that paragraph only, as the consolidation of 2026-10-30 did (`PLAN-history.md`, its paragraph under "## Moved at the consolidation of 2026-10-30, after phase 3's close"). Say, in a few plain sentences, by count and by kind: the closed lines moved (built, answered or stale), with the duplicates; the lines cut to one line, with their homes by kind; the split lines; the lines kept with an edit (the stale citations, lines 45 to 47 cut to their commit and review, the header); "Where we stand" cut by the inventory's section 5; and line 173, closed by this pass. Take the numbers from `/home/user/fortress-plan-3/tmp/plan-consolidate/checks-edges.txt`, which the coordinator wrote, not from memory. Name no line that stayed. Change nothing else in PLAN-history.

## 4. The review queue's "Home:" lines that the script left

The coordinator's last run of `plan-consolidate.py pointers` is in `checks-edges.txt`. Each `FAIL review-queue.md:N, PLAN, ...` line there is a "Home:" clause that found its PLAN line before the pass and finds none now. Repoint each one with Edit in `explorations/coordinator/review-queue.md`, in that clause only:

- If its line was dropped as a duplicate, point to the line that was kept, in PLAN, by that line's heading and first words: line 55 to "Pavol's answers, in the order they are needed", item 31; line 234 to "Climb batch 23, listed for his review", C.skeptic.1; line 429 to "Phase 5. microGPT compiles", the dispatcher's line; line 440 to "Climb batch 15, listed for his review", Call 1, rung B; line 527 to "Climb batch 19, listed for his review", gather.2; line 565 to "Phase 3's candidates at its end", Row 808.
- If its line moved, point to PLAN-history in the form above: `PLAN-history, "Moved at the consolidation of 2026-11-03", under "HEADING", WORDS`.
- If its line was cut and the cut line lost the words that the clause cites, change the clause's words to the cut line's opening, in PLAN. Say each such case in your report: the fix round should have kept the words.

Also read the clauses that the script could not test: grep the queue for `PLAN, "` with the headings of the lines that left PLAN. Review-queue item 210 cites line 440 as "Call 1, below, and Call 1, rung B", and item 190 cites line 527 as "the post-batch review's entry on it": repoint both to the kept line. Change nothing in the queue but these clauses: no item's text, part, number, count or "Needed by".

## Your report

The new line 1 and the new "Next" bullet, whole; the paragraph's new sentences; each clause that you repointed, with its queue line and its old and new text; anything that you could not do, and why.
