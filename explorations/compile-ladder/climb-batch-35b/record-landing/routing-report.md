<!-- The routing writer's report for climb batch 35b's record-landing: what it did to PLAN, PLAN-history and the review queue for each change of owed.md whose writer is routing, and what it leaves for the coordinator. -->

# The routing writer's report, climb batch 35b

The worktree is `/home/user/fortress-landing-35b` at `9d5d21bf57`. Nothing is committed. Line numbers are those of `PLAN.md` at `9d5d21bf57`, as `plan.md` gives them.

## One line per change

- C18 | `PLAN.md:9`, "Runs." | rewritten: microGPT's 7 of 7 now runs "of climb batch 34 and of climb batch 35", the commit stages name `reviews/batch-35b-review.md`, section 6, the demos read "52 of 52 on the merged trees of both runs of climb batch 35", and `compile-ladder/climb-batch-35b/RECORD.md` joins the records | ground: `climb-batch-35b/gate/summary.txt:155-158`; RECORD, "The tests on the merged tree" ('demos: 52 run, 52 reached their end').
- C19 | `PLAN.md:10`, "The live thread." | rewritten: "At the last landed gate, climb batch 35b's (`1caac80b3b`, run 2 of `coordinator/CLIMB-BATCH-35.md`, its gate on `f23f91938d`)", in the form that `revival-page/update.py:99` parses, with `compile-ladder/climb-batch-35b/gate/`. One new sentence says what run 2 built (F-403, F-405, F-375, F-341, F-406, F-377), and one names the rows that it closed. The pointer for what the two paths still do differently gains `reviews/batch-35b-review.md`, section 5, "Each closed row, path by path". I also changed run 1's "its gate's repair fixed row 1100" to "its gate's repair landed for row 1100 (`b7b5b0c02b`), which stays open". owed.md does not name that clause; its ground is C23's (row 1100 open, the review, Part 5) | ground: owed.md C19; the review, sections 5 and 6.
- C20 | `PLAN.md:11`, "Landed." | rewritten: "both runs of climb batch 35 (phase 4's first eighteen lines), the last at `1caac80b3b` on 2026-11-23" | ground: `git log -1 --format=%cs 1caac80b3b` gives 2026-11-23.
- C21 | `PLAN.md:12` | left: it names each settled item as settled | ground: owed.md C21.
- C22 | `PLAN.md:13`, "Next." | rewritten: run 2 landed at `1caac80b3b`, its review `9d5d21bf57`; before the batch after, the base build and F-34's measure, `seed-worktree.sh` copying `build-one`, the coordinator's checks of L.worker.1 and E.skeptic.2, and the script and the manual (the review, "The steps due before the batch after"); the list is phase 4's climb batch 35b line, with item 616 before row 1098; item 608 "held in its first three batches, climb batches 34b, 35 and 35b". The findings of climb batches 33, 31b, 32 and 30 are unchanged | ground: owed.md C22; the review, section 4 and "The steps due before the batch after".
- C23 | `PLAN.md:58`, climb batch 34b's line | rewritten: "row 1100, the dispatch that follows the JVM's history, has climb batch 35's gate repair (`b7b5b0c02b`) and stays open, in the list beside row 935's order (`reviews/batch-35b-review.md`, Part 5)" | ground: the review, Part 5; `ledger:1100`, NEGATIVE-VERIFIED (owed.md).
- C24 | `PLAN.md:59`, climb batch 35's line | rewritten: "without row 1100" removed; "Its run 2 is climb batch 35b, rungs E, L and M, the next line, which holds the list for the batch after. The list that its review gave (...)" | ground: the review, Part 4 and Part 5.
- C25 | `PLAN.md`, new line after `:59` | added: "- **Climb batch 35b**, phase 4's eighteenth batch, landed 2026-11-23 at `1caac80b3b`, ...; its review is `reviews/batch-35b-review.md`.", in the form of `update.py:111`, with the list for the batch after in the order of owed.md C25. Rows 1118, 1122, 1126 and 1127 have their home there. Row 1119 stays with the prelude (P-38) | ground: the review, Part 4 and Part 5.
- C26 | `PLAN.md:72`, F-34's line | rewritten: "row 1100, open, with climb batch 35's gate repair, `b7b5b0c02b`" | ground: C23's.
- C27 | `PLAN.md:74`, the rehearsal's walls | rewritten: "and row 1100 stays open with its gate repair (`b7b5b0c02b`)". In the same line, "row 996 is in the list for the batch after (climb batch 35's line)" now names "climb batch 35b's line", since the list moved there (C24, C25). owed.md does not name that second pointer | ground: C23's; C25.
- C28 | `PLAN.md:97` | left: it marks item 91 as closed | ground: owed.md C28.
- C29 | `PLAN.md:119`, phase 5 | rewritten: "rows 559 (...), 564, 565, 594, 643 and 724 (walk's side, row 723). Climb batch 35b's rung M closed row 815 (`08860c527f`; F-406), and its checker sibling, row 770, stays open." | ground: owed.md C29; rows.md, rows 815 and 770.
- C30, C31 | `PLAN.md:37`, `:75`, `:241`, `:302`, `:741`, `:752` | left: each holds | ground: owed.md.
- C32 | `PLAN.md:801`, E.worker.1 | moved whole to PLAN-history: the coordinator's choice, not his | ground: the review, Part 1, finding 3, and Part 4.
- C33 | `PLAN.md:802`, E.worker.2 | moved whole to PLAN-history: the coordinator's tool fix | ground: the review, Part 1, finding 3; process finding 3.
- C34, C35, C37, C38 | `PLAN.md:803`, `:804`, `:806`, `:807` | left: C34 and C37 inform him and need no queue item; C35 and C38 wait for the coordinator's checks | ground: owed.md.
- C36 | `PLAN.md:805`, E.skeptic.3 | rewritten: it gains "Its route: the correction in the revision form, with the next batch that edits `Specification/basic-lib/booleans.tex` (`reviews/batch-35b-review.md`, section 2)." | ground: the review, section 2.
- C39 | `PLAN.md:808`, L.worker.2 and three other ids | rewritten: "walk now refuses a numeral type written in a `comprises` clause, and P-174 names row 1124 where it named row 981, in the words that the rung proposed"; the question is "Should they keep that row?"; the default is "as landed, row 1124 open with its expected failure" | ground: owed.md C13 and C39. This line holds only once the entries writer's C13 lands in P-174.
- C40 | `PLAN.md:809`, gather.1 | rewritten: the default gains "first among this run's rows in the list for the batch after (phase 4, climb batch 35b's line)" | ground: the review, Part 5, 1.
- C41 | `PLAN.md:810`, review.1 | rewritten: "No default on record; recommendation: ..." becomes "The batch's own correction, owed by the skill's rule: the first rung that edits either entry names rows 1123 and 1124 and the `comprises` clause, a change of text with no test, in the list for the batch after (phase 4, climb batch 35b's line)." | ground: the review, Part 1, finding 5; `references/specification.md:22`.
- C42 | `PLAN-history.md`, new section "## Climb batch 35b's landing, 2026-11-23" | added at the end: a three-point summary, then the 15 lines that left PLAN or changed in it, word for word from `git show HEAD:explorations/coordinator/PLAN.md`, under "Where we stand" (`:9`, `:10`, `:11`, `:13`), "Phase 4. The switch-over" (`:58`, `:59`, `:72`, `:74`), "Phase 5. microGPT compiles" (`:119`) and "Climb batch 35b, listed for his review" (`:801`, `:802`, `:805`, `:808`, `:809`, `:810`). `git diff --unified=0` of PLAN shows 15 lines out, the same 15 | ground: the routing's rule.
- C43 | `review-queue.md:900`, item 503 | rewritten: "row 981 holds them" becomes "row 1124 holds them" | ground: rows.md, rows 981 and 1124.
- C44 | `review-queue.md:1404`, item 493 | rewritten: "(row 981)" becomes "(row 1124)"; its "Home" keeps rows 974 and 981 | ground: C43's.
- C45, C49, C50 | the queue | left: no new item, by the queue's head (his choice of 11:2x UTC on 2026-11-23); the counts are unchanged | ground: owed.md.
- C46 | `review-queue.md:117` and `:751`, item 608 | rewritten: the head's line says "held in its first three batches"; the item's "Landed" gains "Held in its third batch, climb batch 35b: every worker echoed its `Expected failure:` line in the call that first ran its test (`reviews/batch-35b-review.md`, section 4)." It stays open | ground: the review, section 4.
- C47 | `review-queue.md:732`, item 616 | rewritten: "Needed by" now points to "phase 4, climb batch 35b's line; `reviews/batch-35b-review.md`, Part 5" | ground: the review, Part 4 and Part 5.
- C48 | `review-queue.md:15`, the head's group | rewritten: "PLAN, phase 4, climb batch 35b's line, its list"; the group's name and its count of 1 are unchanged | ground: C25.
- C51, C52 | INDEX, `CLIMB-BATCH-35.md:788` | left: nothing owed | ground: owed.md; `checks.md` names no note without an INDEX line and no citation of PLAN by line number.

## "Needed by" lines that I set

None. I filed no new queue item.

## Kinds that owed.md marks as set by the workflow

None for my changes. owed.md C38 sets a "Needed by" for L.worker.1 only if the coordinator's check leaves it open. I filed no item for it.

## Items moved to (a)

None.

## Defaults that the record does not hold

None that I wrote. E.skeptic.2 (`PLAN.md:804`) and E.skeptic.3 (`:805`) keep "No default on record", as the batch states it.

## The checks

- `mech-1.md`: `plan-moves.py` passes, with 15 lines out of PLAN and the same 15 in PLAN-history. `queue-check.py` passes, with 605 items, 0 new and 92 open. `check-index.sh` passes.
- `check.md`, round 1: each routing change, C18 to C52, passes. Its one failure, C7 (F-403), is the entries writer's. The fix round changes nothing in PLAN, PLAN-history, the queue or INDEX.
- The LOOK lines `:12`, `:98` and `:242` are `:12`, `:97` and `:241` at `9d5d21bf57`, shifted by one line by C25's new line. They are C21, C28 and C31, and each stays for the reason that `owed.md` gives.

## For the coordinator

- **The boot note (`BOOT.md`).** "Running" and "Next" still name climb batch 35b as coming. They should name run 2 as landed at `1caac80b3b`, its review committed (`9d5d21bf57`), and the batch after with the list of phase 4's climb batch 35b line. The note's "Held for him" takes P-174's old and new words (owed.md, "For the coordinator").
- **The held list (`HELD.md`).** Nothing of this routing changes it.
- **Phase 4's closing paragraph (`PLAN.md:103` at `9d5d21bf57`)** says that both runs of climb batch 34 landed, and it names neither run of climb batch 35. It was stale before this landing, and owed.md does not name it. I left it.
- **The two checks (C35, C38).** If E.skeptic.2 or L.worker.1 stays open after your check, it becomes a queue item in (b), and the head's counts change. If the record settles one, its line moves to PLAN-history and its repair goes into climb batch 35b's list.
- **`PLAN.md:808` depends on C13.** It says that P-174 names row 1124. If the entries writer's change of P-174 does not land, this line is false.
