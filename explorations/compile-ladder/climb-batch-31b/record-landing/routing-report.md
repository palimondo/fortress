<!-- The routing writer's report for climb batch 31b's record-landing: one line for each change of owed.md whose writer is routing, with what PLAN, PLAN-history, the review queue and the batch file hold after it, and the points for the coordinator. -->

# The routing of climb batch 31b's landing

Line numbers in PLAN are those at `257cae950`, as `owed.md` gives them. Every line that left PLAN or changed in it stands word for word in `PLAN-history.md`, under the new section "Climb batch 31b's landing, 2026-11-17" (landing date from `git log -1 --format=%cs 00dd16a89`), under the heading that it stood under. I checked this with `grep -Fxv` of the old PLAN against the new PLAN and PLAN-history: no line is missing. I could not run `plan-moves.py`, `queue-check.py` or `check-index.sh`: this session may not run Python or write by shell. I counted each theme's items with a read-only grep instead.

## The changes

- C92 | PLAN.md:9, "Runs" | rewritten: the walk check at both runs of climb batch 31 (run 2's at its commit stage), and 52 of 52 demos on both runs' merged trees | `RECORD.md:46`; the review, section 4.
- C93 | PLAN.md:10, "The live thread" | rewritten: the last landed gate is climb batch 31b's (`00dd16a891`, gate on `4fdabc2ae8`), in the form that `update.py` parses; run 2's F-378, F-379, F-380; 373 of 401 bindings; the code generator's count 21 before run 2, none after, 17 expected | F-53, F-299, F-34; the review, section 3.
- C94 | PLAN.md:11, "Landed" | rewritten: both runs of climb batch 31, phase 4's first twelve lines, 31b at `00dd16a891` | the review's header.
- C95 | PLAN.md:12, "Probed" | rewritten: the one library's half built at `f6e24650e7` (F-379), the prelude's half in no run; 516, 518 and 519 landed at the defaults, open for his review; the part on items 371, 372 and 515 kept | F-379; row 1003.
- C96 | PLAN.md:13, "Next" | rewritten: 31b landed, its review at `257cae950`, run 1's record-landing ended at 08:31; this run, then the skill step before the batch after; the measure (17 expected); the script's fixes; row 1049's test and the trace; the review's order 512, 577, 572; finding 1 holds nothing (item 101); items 528, 530 and 533 kept as in (a) | the review, "The steps due before the batch after", 4 to 9.
- C97 | PLAN.md:53, climb batch 31's line | rewritten to point to the next line; a new line `- **Climb batch 31b**, phase 4's twelfth batch, landed 2026-11-17 at `00dd16a891`` added after it | the review's header and Part 1, "PLAN".
- C98 | PLAN.md:54, the natives line | rewritten: "Since climb batch 31b's rung O, 373 of the 401" | F-299.
- C99 | PLAN.md:66, F-34's line | rewritten: 21 in 6 kinds before run 2, by kind; 17 expected after run 2, not measured; rows 819, 992 and 832 closed by `06cd094706`; the clauses "its record expects 19 to 21", "due before run 2", "takes off 4", "row 992 is rung T's" and "row 832 stands beside row 992" gone | the review, section 3; rows.md rows 819, 992, 832.
- C100 | PLAN.md:68, the rehearsal's walls | rewritten: row 992 closed by rung T; the five merged in the one library, the prelude's half and row 866 with fork H2; the 'IncompatibleClassChangeError' by reading; forks O1, O3, O4 at defaults, open | the review, Part 5, item 577.
- C101 | PLAN.md:69, the merge's line | rewritten: the one library's half built (`f6e24650e7`), what it closed, rewrote and noted; the prelude's half is fork H2, the whole of P-178 left; O1, O3, O4 at defaults, open | F-379; the record, "Cost and time", run 2's rows.
- C102 | PLAN.md:82, the prelude's own defects | rewritten: row 528's second test `XXXNumeralEqualsRR32Compiled`, row 1059 with `XXXNumeralNotEqualsFloatCompiled`, and a pointer to item 101 | rows.md row 1059; the review, Part 4.
- C104 | PLAN.md:95, his answers needed | rewritten: 518 and 519 landed at the defaults, open for his review; item 586 added | the review, Part 1.
- C105 | PLAN.md:97, phase 4's closing paragraph | rewritten: both runs of climb batch 31 landed | the review's header.
- C106 | PLAN.md:145, the heading of items 97 and 98 | rewritten: "Landed at the record's defaults with run 2 of climb batch 31, for his review" | the review, Part 1, "PLAN".
- C107 | PLAN.md:147, item 97 | rewritten: `round(self):ZZ64` landed (`FortressLibrary.fss:548`); still review-queue item 518, open | the review, section 2, O3.
- C108 | PLAN.md:148, item 98 | rewritten: the merge did not wait; `NumberPrintTest.fss:31`, `:35` respelled, two arms never taken; item 519 open | the review, section 2, O4.
- C109 | PLAN.md:152, item 99 | rewritten: "a fourth rung of run 2" gone; its place follows item 512 | the review, Part 5.
- C110 | PLAN.md, "Pavol's answers" | added: a heading "Holding no launch, raised by climb batch 31b's post-batch review" and item 101, finding 1, pointer to review-queue item 586 | the review, Part 1, finding 1.
- C112 | PLAN.md:284, climb batch 32's rows | rewritten: rows 1014, 1030 and 1031 taken out; rows 1013, 1028 and 1005 stay | rows.md, closed by `d3095ca77f`.
- C113 | PLAN.md:300, row 959 | rewritten: it reaches the five removed names, its weight grows, second in the list for the batch after, item 519 | the review, Part 5, 2.
- C114 | PLAN.md:303, item 18's candidates | rewritten: a sentence that row 697 now reaches the five types, pointing to item 589 | the review, Part 4.
- C115 | PLAN.md:348, row 550 | moved to PLAN-history (built) | rows.md row 550, fixed by `f6e24650e`.
- C116 | PLAN.md:659, climb batch 24's question 2 | rewritten: "three more bindings, `UnsignedLong`'s then and `NN64`'s since climb batch 31b's rung O" | F-308.
- C117 | PLAN.md:824, climb batch 32's review-routed.2 | moved to PLAN-history (built by rung E, `d3095ca77f`) | `RECORD.md:264`.
- C118 | PLAN.md:840, row 1043 | rewritten: rung E ran the three kin; rows 1043 and 340 keep their tests unchanged | `RECORD.md:72`.
- C119 | PLAN.md:847, fork V4 | rewritten: rung O made `ZZ64` an object and promoted the test; row 550 fixed | rows.md row 550.
- C120 | PLAN.md:854, review-routed.2 | rewritten: owed by the batch after; run 2's gather did not hold it | `RECORD.md:265`.
- C121 | PLAN.md:866, the 31b group's opening | rewritten in the form of run 1's opening (PLAN.md:833) | the review, Part 4.
- C124 | PLAN.md:868 cut to a pointer; filed as item 579, (b), "Sizes and arrays" | the review, section 2, T.worker.1.
- C125 | PLAN.md:869 cut to a pointer; filed as item 580, (c), "The specification's text" | the review, section 2.
- C126 | PLAN.md:870 cut to a pointer; filed as item 581, (c), "Tests and the team's demos" | the review, section 2.
- C127 | PLAN.md:871 cut to a pointer; filed as item 582, (c), "Tests and the team's demos" | the review, section 2.
- C128 | PLAN.md:872 cut to a pointer; filed as item 583, (c), "How batches run" | the review, section 2, review.1.
- C129 | new PLAN line in the 31b group; filed as item 584, (c), "Code generation and the run time" | the review, Part 4, its line word for word.
- C130 | new PLAN line; filed as item 585, (c), "Walk's checks at load" | the review, Part 4.
- C131 | new PLAN line for row 1059; filed as item 586, (b), "Numbers and numerals" | the review, Part 1, finding 1, and Part 4.
- C132 | new PLAN line; filed as item 587, (c), "Numbers and numerals" | the review, Part 4.
- C133 | new PLAN line; filed as item 588, (c), "How batches run" | the review, section 2 and Part 4.
- C134 | new PLAN line; filed as item 589, (c), "Walk's checks at load" | the review, section 2 and Part 1.
- C136 | review-queue item 516 | rewritten: Landed is `FortressLibrary` with walk's table (`BuildEnvironments.java:455-470`, `f6e24650e7`); its question no longer opens "If ... are merged"; Home gains the review; new Needed by; stays open in (b) | the review, section 2, O1.
- C137 | review-queue item 518 | rewritten: its text and Landed give the one `round(self):ZZ64`; Home gains the review; new Needed by; stays open in (b) | the review, section 2, O3.
- C138 | review-queue item 519 | rewritten: Landed gives the merge without waiting and the respelled test's two dead arms; the other way and its cost no longer name run 2; new Needed by; stays open in (c) | the review, section 2, O4.
- C139 | review-queue head and "When each item is needed" | rewritten: a sentence on this routing in the head; 518 and 519 out of "The next batch and the natives' batches", 516 out of the probes' group; a new group "Climb batch 31b's defaults and open questions" with 516, 518, 519 and 579 to 589; the probes' and climb batch 31's group texts brought in line; counts 247 open, 92 consequential, 155 routine | the items as filed.
- C140 | review-queue item 577 | rewritten: a passage that H2 is now the whole of P-178 left, and that way (b) touches item 512; Home gains the review; question and default unchanged | the review, Part 5.
- C141 | review-queue item 578 | rewritten: "Run 2's other forks, T1, O6, O7, E1 and E2, are item 588" | C133.
- C142 | review-queue item 572 and its line in the first section | rewritten: the integer types are value objects below the trait now (`FortressLibrary.fss:846`, `:951`, `:1063`, `:1170`); its place follows item 512; way 1b moot | the review, Part 5.
- C143 | review-queue item 512 | rewritten: the review's three changes added; Home gains the review; Needed by unchanged | the review, Part 5.
- C144 | review-queue item 563 | rewritten: rung E ran the three tests, each unchanged; the other way no longer names rung E; new Needed by | `RECORD.md:72`.
- C145 | review-queue item 564 | rewritten: such pairs at the five types load unjudged now, `pick(a: ZZ64) = 2` | rows.md row 1044.
- C146 | review-queue item 568 | rewritten: rung O made `ZZ64` an object, row 550 fixed; stays open on X1 | rows.md row 550.
- C147 | review-queue item 570 | rewritten: the test is owed by the batch after; run 2's gather did not hold it | `RECORD.md:265`.
- C148 | review-queue item 544 | rewritten: N1's compiled tests written by rung E | `RECORD.md:264`.
- C149 | review-queue item 513 | rewritten: F-360 is F-379 (twice); Landed: the one library no longer declares the five pairs, the prelude does; row 866 closes with the prelude's half (item 577) | F-379; rows.md row 866.
- C150 | review-queue item 515, in (a) | rewritten: built for the one library at `f6e24650e7`, the prelude's half not; F-360 is F-379; stays answered | F-379.
- C151 | review-queue item 371, in (a) | rewritten: built for the one library; the prelude keeps its traits | F-379.
- C152 | review-queue item 372, in (a) | rewritten: the five objects left `FortressBuiltin` and walk | F-379.
- C153 | review-queue item 79, in (a) | rewritten: row 550 held the defect; rung O fixed it | rows.md row 550.
- C154 | `CLIMB-BATCH-31.md:568`, item 4 | rewritten: rows 1054, 1055 and 1056 added | the review, Part 4 and Part 5, 4.
- C155 | `CLIMB-BATCH-31.md:570`, item 6 | rewritten: row 1060 added | the review, Part 5, 6.
- C156 | `CLIMB-BATCH-31.md:571`, item 7 | rewritten: "Row 1035; row 571 is fixed by run 1's rung M." | the review, Part 5, 7.

## The fix round

`check.md` failed five of my changes. `mech-1.md` passes every check, and `cold-read.md` reads the entries writer's text only. I fixed each failure as `check.md` corrects it:

- C92 | PLAN.md:9 | the demos' source now cites both records, `compile-ladder/climb-batch-31/RECORD.md` and `compile-ladder/climb-batch-31b/RECORD.md`, so run 1's 52 of 52 keeps its source.
- C93 | PLAN.md:10 | "where 17 is expected if rung T's four pass their next wall", with the review's condition.
- C96 | PLAN.md:13 | the same condition on the 17.
- C108 | PLAN.md:149, item 98 | the line now opens with the ask: is an arm at a removed name acceptable until row 959 is repaired, with the two respelled arms kept? It names the other way: row 959 first, and the two arms deleted.
- C117 | this report | the move's line names the commit, `d3095ca77f`.

These lines changed only text that this run wrote. Their texts at `257cae950` already stand in PLAN-history, so PLAN-history did not change.

## The "Needed by" lines that I set

Each is marked "(set by the landing workflow)".

- 516, 579, 580, 581, 582, 583, 588 and 589: no planned work.
- 518: no planned work; P-68's rung after the switch-over.
- 519: when the batch after climb batch 31 is planned, with row 959.
- 563: no planned work.
- 584: when the batch after climb batch 31 is planned, with item 4 of its list.
- 585: no planned work; the next rung on walk's load check.
- 586: before the switch-over, when the prelude and the gap go.
- 587: when the batch after climb batch 31 is planned, with item 6 of its list.

## The kinds that owed.md marks as set by the workflow

- Items 581 (C126), 583 (C128), 584 (C129), 585 (C130), 587 (C132) and 589 (C134): routine, (c).
- I chose each new item's theme section. No source gives it.

## Items moved to (a)

None. Items 516, 518 and 519 stay open in (b) and (c): the batch file's "answered at forks O1 to O5" (`CLIMB-BATCH-31.md:986`) is a default that the batch took, not his word. His go of 06:39 UTC put no question to him. I searched POSITIONS' titles for "subscripted assignment", "subscript", "third exception", "fork T1" and "prelude", and INDEX for "31b". No title or line holds his answer on these items. "prelude" finds P-38, "The compiler prelude's own text is not repaired". P-38 supports the default of item 586 and does not answer its question. `owed.md` records the same result for C124 and C131. So each new item is open.

## Defaults that the record does not hold

None. Each default is the record's or the review's, as landed. The PLAN line of the forks of run 2 (item 588) says that his go "put no question to him". The review's own line says "on his word of 2026-11-17 06:39 UTC". I changed the wording so that a reader cannot take the line as his answer.

## Points for the coordinator

- `BOOT.md` (C179): it should say that run 2 landed at `00dd16a891` and that its review is at `257cae950`. It should name this record-landing, and the review's steps 1, 4, 6, 7, 8 and 9 that are still due. I did not edit it.
- `HELD.md` (C180): this landing needs no change. The report on P-169's history, a heading "Held in chat (2026-11-07)", predates the base.
- `CLIMB-BATCH-31.md:986` (C178): "items 516 to 520 answered at forks O1 to O5" is not his answer. Items 516, 518 and 519 stay open. I did not edit it, since `owed.md` gives it no writer.
- Review-queue item 574's "Needed by" still names "the trace of `OverloadReturnObjectDomain.fss:26` before run 2". The trace is still owed, now before the batch after. `owed.md` does not list this line, so I left it.
- Decisions not taken:
  - Items 97 and 98 stay under "Pavol's answers" as open for his review, with their heading reworded. The other way was to move them to PLAN-history as answered. That would call a default his word.
  - The lines of run 2's items for him are cut to pointers, as run 1's lines were. The other way kept the long lines and added only "Review-queue item N", as `owed.md`'s note on the new items allows.
  - I wrote no history in the queue's header comment (line 1). The routing sentence is in "When each item is needed", as for the earlier landings.
