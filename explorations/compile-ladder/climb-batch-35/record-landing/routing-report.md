<!-- The routing writer's report for climb batch 35's record-landing, run 1: what each routing change of owed.md became in PLAN, PLAN-history, the review queue and INDEX, with its ground. -->

# The routing of climb batch 35's landing

Files changed: `explorations/coordinator/PLAN.md` (994 lines to 844), `explorations/coordinator/PLAN-history.md` (3,141 lines to 3,415, one new section) and `explorations/coordinator/review-queue.md` (13 lines changed). INDEX is unchanged.

The new PLAN-history section is "## Climb batch 35's landing, 2026-11-23" (the date from `git log -1 --format=%cs 0a83a70498`). It holds, word for word, each of the 175 lines that left PLAN or changed in it, under the heading that each stood under in PLAN, in PLAN's order. The lines were copied with `sed -n` from PLAN at `efb603dce1`, not retyped.

## The changes, one line each

- C44, PLAN "Where we stand", "Runs.": rewritten. It adds climb batch 35's run 1 to the walk check and the demos, with the review's section 6 and the batch record. Ground: owed.md; RECORD:43.
- C45, "The live thread.": rewritten. The last landed gate is climb batch 35's (`0a83a70498`, its gate on `b7b5b0c02b`), in the form that `update.py` parses. It adds what run 1 built (F-397 to F-401), the eight rows closed, and row 1100 fixed. The section 1 pointer is now the batch 35 review. "Review-queue item 295 waits for his word" became the landed reading with F-294. Ground: owed.md; rows.md; the triage's verdict on item 295.
- C46, "Landed.": rewritten. It now says phase 4's first seventeen lines, the last at `0a83a70498` on 2026-11-23.
- C47, "Probed": rewritten. The clause "open for his review as landed (review-queue item 521)" is gone. I also changed two clauses that owed.md did not name, since the triage made them false. Item 514 is now "in the queue's part (a)". Items 516 and 518 are now in part (a): 516 not consequential (F-379), 518 settled by P-68. Ground: the queue's part (a), items 514, 516, 518 and 521.
- C48, "Next.": rewritten. It names the run 1 landing, the review `efb603dce1`, the record-landing, and the steps before run 2. It names the list for the batch after, item 616 before that batch, and item 608 held in two batches. The clauses on F-34's measure, item 597, item 572, fork O3, and items 265 and 267 are gone. Items 592, 586, 525 and 529, and items 80 to 82, stay.
- C49, phase 3's line on the zero: rewritten. The reading is landed and not consequential (F-294; P-180). "He has not confirmed" and "needed before the switch-over" are gone.
- C50, phase 4: a new line after climb batch 34b's line, in the form that `update.py` parses. It opens "- **Climb batch 35**, phase 4's seventeenth batch, landed 2026-11-23 at `0a83a70498`". It holds the list for the batch after as the review's Part 5 gives it. This gives rows 1104, 1108, 1109, 1110 and 1111 a home.
- C51, climb batch 34b's line: rewritten. Row 1100 left the list, fixed by `b7b5b0c02b`.
- C52, F-34's line: rewritten. The refusals are rows 1091 and 1099, and row 1100 is fixed.
- C53, the rehearsal's line: rewritten. It covers row 1100 fixed and row 996 in the list for the batch after, without item 522. It also says that F-379 states fork O1 and that P-68 settles fork O3 (row 1000), without items 516 and 518.
- C54, the merge's line: rewritten. Item 578 became F-372 to F-377. Items 516 and 518 became F-379 and row 1000.
- C55, the names line: the pointer to item 360 is gone; F-322 stays.
- C56, fork N11's line: "Review-queue item 475." is gone.
- C57, the Q-walk line: items 80 and 81 left its list.
- C58, walk's type assumptions: the clause on item 390 is now "row 921 is fixed (`4445d848b`; F-283)".
- C59, his answers before the switch-over: the list is now the queue's 17. Items 108, 295, 360, 376 and 558, and the clause on item 572, are gone.
- C60, phase 5's line on generic and functional methods: rows 571 and 573 left the list. Row 571 is fixed (F-372). Row 573 is closed by rung S (`1db0e878c8`; F-399). Row 815 is named as climb batch 35b's rung M's.
- C61, his answers before microGPT compiles: item 58 is gone. I added item 545, since the queue's "Before microGPT compiles" holds 12 items and the line named 11 without it.
- C62, C63: items 71 and 72 under "Pavol's answers" moved.
- C64: item 96 moved. The group line above it, "Before the switch-over, raised by climb batch 31's rung M", moved with it, since no item stayed under it.
- C65: left. Item 100 already points to item 562.
- C66: items 91 to 95 moved. Items 89 and 90 and their group line stay.
- C67: left. The gather's half of that finding still waits.
- C68, the strided range (parked): "Review-queue item 108." is gone, and the line says that P-180 makes row 661's repair due.
- C69, the fortress operations (parked): "Review-queue items 554 and 555." is gone.
- C70, walk's conditional extension: item 76 left the list of items that wait on the rung.
- C71, item 18's other candidates: the pointer to the climb batch 31b line and item 589 became row 697, with P-180.
- C72, `where` clauses: the pointer to item 178 is gone.
- C73 to C83: moved (climb batch 11's `override` question; climb batch 12's Q2; climb batch 30's N.worker.3 and its forks; climb batch 32's D.worker.1 and its forks; climb batch 31's L.worker.1, row 1053 and its forks of run 1; climb batch 31b's rows 1057 and 1058; climb batch 33's forks of run 1).
- C84, C86, C87, C91, C92: left, as owed.md says.
- C85, W.judge.1: rewritten. Its default now says that its repair is first in the list for the batch after, by P-180.
- C88, O.worker.2: rewritten as told, not asked. P-151 settles it, and P-180 repairs row 1107. The default puts the repair in the list for the batch after, with rows 1106, 1108 and 1109.
- C89, A.worker.1: cut to a pointer to review-queue item 562. The line keeps what is asked and the default, the commit. Its old text is in PLAN-history.
- C90, gather.1: repointed. Its `PLAN.md:149`, `:428`, `:445` and `:844` now name the four lines in PLAN-history's new section, by heading.
- C93, judge-gate.2: moved. It is the coordinator's choice (see below).
- C94, judge-gate.3: rewritten. The remaining orders are a rung under P-180, and item 574 is in part (a). The default is that rung, in the list for the batch after. Its words "climb batch 31's judge-gate.2 above" are gone, since that line moved (C201).
- C95, review-queue item 562: its text, "Landed", "The other way", "Its cost", "Home", and its line in the head gained A.worker.1's atomic case. The default is the commit, as landed. "Needed by" is unchanged. The item stays in (b).
- C96, item 592: "Home" gained rows 964 and 963, fixes that follow its answer.
- C97: left; already done.
- C98, item 473: the false sentence became "Since climb batch 35's rung R, both paths keep a radix-point numeral's digits as written (`6f0e48f187`; row 960 closed; F-397)." "Home" now reads "rows 960 and 969, both closed".
- C99, item 608: "Landed" gained "Held in its second batch, climb batch 35". Its head line says "held in its first two batches". It stays open.
- C100, the queue's head: the group and its count now read "The batch after climb batch 35b", pointing to "Next" and to phase 4's climb batch 35 line. In the fix round, item 616's "Needed by" changed to the same batch.
- C101: no items filed. See the changes for the coordinator.
- C102, C103, C104: nothing owed.
- C105: the PLAN-history section, written as above.
- C106 to C232: moved, each word for word under its own "listed for his review" heading. In climb batch 19's list, the blank line after the moved line went too, so that no two blank lines stand together.

## "Needed by" lines that I set

None. No new queue item was filed.

## Kinds that owed.md marks as set by the workflow

None.

## Items moved to part (a)

None.

## Defaults that the record does not hold

None. Each default that I wrote is the one that the review, the batch record or the triage states.

## Doubts, and what I did not do

- I ran no check in round 1, since `python3` needs an approval here. The round's mechanical checks (`mech-1.md`) then ran: `plan-moves.py` passes, and `check-index.sh` passes. By count: PLAN lost 151 lines (147 moved, 3 blank, and the group line above item 96) and changed 27. The history gained the 148 moved lines and the 27 old texts, with their headings.
- The PLAN lines that still name review-queue items 516, 518 or 521 elsewhere were not searched beyond the lines that owed.md names and line 12. The `LOOK` lines of `plan-moves.py` will show any that is left.
- The new section's opening paragraph names the triage of 2026-11-23 as a source of the moves, since owed.md routes C106 to C232 from it.

## The fix round

`check.md` found two failures in my homes. `mech-1.md` found one more that is not mine.

- C100, review-queue item 616, a routing failure: its "Needed by" named the batch after climb batch 34b, which has passed. It now reads: "Needed by: the batch after climb batch 35b, whose list holds row 1098 once it has its default (PLAN, "Where we stand", "Next", and phase 4, climb batch 35's line; `reviews/batch-35-review.md`, Part 5)." This is the correction that `check.md` gives.
- C105, PLAN-history's new section, a fidelity failure: its opening list said that climb batch 35 built T.worker.2 of climb batch 28 and gather.1 of climb batch 31. Earlier batches built them. I took both out of that parenthesis. The list's last clause, on the lines whose queue item left at the triage, holds both.
- `queue-check.py` fails on two lines of the queue's head. The cause is that the tool parses an older form of the counts. The head had the same form at the base, so the counts are unchanged by this run. I left the head as it was. The tool or the head's form is the coordinator's.

## For the coordinator

- C101: the review's Part 4 and its steps due before run 2, step 3, ask for one queue item for run 1's forks, and for the eleven entries of `PLAN.md:936-946` as items, "until his yes to the process review's B1". I followed the queue's head, by his choice of 11:2x UTC: only A.worker.1 entered the queue, inside item 562. Confirm this, or file the items as the review asks.
- C93: judge-gate.2 moved out of his list as the coordinator's choice: whether a rung that changes the checker or the code generator runs `ant testOneLibrary` at its end. Process finding 2 proposes that run 2's rungs M and E run it.
- `BOOT.md` and `HELD.md` need these changes: the boot note's "Next" should match PLAN's new "Next". The held list's line of 11:2x leaves "its exact words wait for his yes" on the queue rule, which C101 reads one way.
- Row 1100's close (`ledger.py close 1100 --commit b7b5b0c02b ...`) is owed before run 2. PLAN's "Next" names it as a step.
