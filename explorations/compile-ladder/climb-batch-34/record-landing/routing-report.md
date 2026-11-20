<!-- The routing writer's report for climb batch 34's run 1: what each routing change of owed.md did to PLAN, PLAN-history, the review queue and the map, with the Needed-by lines it set, the item it moved to (a) and the changes left for the coordinator. -->

# The routing of climb batch 34's run 1

PLAN lines are numbered as at `f7c6c2cae`. New queue items are 606 to 615. This session could not run Python. In round 1 I checked the counts and the moved lines with `grep`; `mech-1.md` then ran `queue-check.py` and `plan-moves.py`, and both pass.

## One line per change

- C29 | `PLAN.md:9`, "Runs." | rewritten: the walk check and the demos now name climb batch 34's run 1, with its review's section 5 and its `RECORD.md` | `gate/summary.txt:155-158`; RECORD:46.
- C30 | `PLAN.md:10`, "The live thread." | rewritten: the last landed gate is climb batch 34's (`285efad802`, its gate on `3ccd236f01`); a sentence on what run 1 built (F-392, F-393, F-325, F-394, F-395) and the rows it closed (993, 1076, 1078, 1090); the code generator refuses no declaration; the assumption forms gain rung P's partial call; "what the two paths still do differently" points at `reviews/batch-34-review.md`, section 1 | the review, Part 4 and section 4.
- C31 | `PLAN.md:11`, "Landed." | rewritten: phase 4's first fifteen lines, the last at `285efad802` on 2026-11-20 | C34.
- C33 | `PLAN.md:13`, "Next." | rewritten: run 1 landed, its review `2ea1ad1648`, the measure `8f7604e42c` with none refused; run 2, climb batch 34b, rung C, after the orientation and skill updates and the manifest worker; the rehearsal patch's pieces still to name; his word on A1 before run 2's briefs (item 608), holding no launch; item 597's default stands. The line's text from "Finding 1 of climb batch 33's review" on is unchanged | the review, Part 4, Part 5 and "The steps due".
- C34, C47 | `PLAN.md`, new line 57, phase 4 | added: climb batch 34's line, in the form that `update.py` parses; rows 1093, 1094 and 1097 and P.judge.1's form join item 3 of the list for the batch after | the review, Part 4 and Part 5.
- C35 | `PLAN.md:69`, F-34's line | rewritten: no declaration refused on `285efad802`, 754 emitted, against 1 on climb batch 33b's (row 1076, closed by rung T's `8e4cc0c16d`) and 13 on climb batch 33's run 1; the second zero reached on the patched scratch tree, row 874 the one wall, which climb batch 34b takes. The figure for climb batch 31b's run left the line | `measure-285efad802.txt`; the review, section 4.
- C36 | `PLAN.md:71`, the rehearsal's walls | rewritten: row 993 leaves the list of walls; the last sentence says that rung G closed it (`51d6c49eb`), that row 874 goes with climb batch 34b, and that row 994 is item 1 of climb batch 34's list | rows.md, row 993.
- C38 | `PLAN.md:73`, row 304 | rewritten: "beside F-34's kinds" cut, since F-34 has no kinds now | F-34 after C2.
- C40 | `PLAN.md:100`, the closing paragraph | rewritten: climb batch 34's run 1 landed; run 2, climb batch 34b, is planned (`CLIMB-BATCH-34.md`, section 4, rung C) | owed.md gave "section C"; the record's rungs are its section 4.
- C77 | `PLAN.md:98`, his answers before the switch-over | rewritten: "374 to 376" is now "374, 376" | C53.
- C42 | `PLAN.md:142`, item 71 | rewritten to the review's text, word for word | the review, section 2.
- C43 | `PLAN.md:143`, item 72 | rewritten: "It is item 71's kind of question, and may merge with it." No merge made | the review, section 2 (:61).
- C45 | `PLAN.md:874` and `:905` | rewritten: rows 1055 and 1056 with item 3 of climb batch 34's list, row 1054 with its item 2; row 1088 with item 3 | `CLIMB-BATCH-34.md`, "For the batch after, in this order".
- C46 | `PLAN.md`, new line 296, "Off the path, parked" | added: row 1092, with the speed roadmap's `float` step, beside item 4; default parked | the review, Part 4 (:347); `ledger:1092`.
- C48 | `PLAN.md:910`, the group's opening | rewritten: names the lines that the review added, and that each line ends with its queue item and its old text is in PLAN-history | climb batch 33b's opening at `:898`.
- C49 | `PLAN.md:913`, G.worker.1 | rewritten as told: the departure from P-146 and P-157 at row 1094, older than the batch; its repair with item 3; a getter so redeclared compiles (F-394); review-queue item 610 | the review, section 2 and Part 1, finding 3.
- C50 | `PLAN.md`, new line under "Climb batch 34, listed for his review" | added: the record's forks of run 1 that no other item holds, item 606 | the review, Part 4 (:349).
- C51 | `PLAN.md`, new line under the same heading | added: finding A1, its three ways, the review's recommendation, default way 1, item 608 | the review, Part 1, A1.
- C62 to C68 | `PLAN.md:912`, `:914` to `:918` | rewritten: each line gains its review-queue item (609, 611, 613, 612, 614, 615). `:917`'s evidence `PLAN.md:142` is repointed to "Pavol's answers", item 71 | checks.md, the one citation by line number.
- C52 | `PLAN-history.md`, new section "Climb batch 34's landing, 2026-11-20" | added: a head of three lines, then the earlier texts of PLAN lines 9, 10, 11, 13, 69, 71, 73, 98, 100, 142, 143, 874, 905, 910 and 912 to 918, word for word, copied by `sed` from `f7c6c2cae`, each under the heading it stood under | climb batch 33b's section at `:2974`.
- C53 | queue item 375 | rewritten: its question as item 71's new text; its body, "Landed:" line (fork P1, `bd933455e3`, fork P2), "The other way" without the built dispatch, its Home by member (`forAsIfExpr`, `assumedArgumentsCall`, `partiallyAssumedCall`), and "Needed by: when item 3 of climb batch 34's list for the batch after is planned ... (set by the landing workflow)". Its head line moved from "Before the switch-over" to climb batch 34's group | the review, section 2.
- C54 | queue item 376 | rewritten: one sentence, "It is item 375's kind of question, and may merge with it."; its default and Needed by unchanged.
- C55 | queue item 400 | rewritten: one sentence on fork P1; it stays open as landed.
- C56 | queue items 584 and 602, and the two group paragraphs | rewritten: 584's default and Needed by to items 2 and 3 of climb batch 34's list; 602's default, its head line and Needed by to item 3; the paragraph of climb batch 31b's group for 584; the paragraph of climb batch 33's group for 597, 601 and 602.
- C57 | queue item 603 | rewritten: "Its cost" now places row 1088 with item 3 of climb batch 34's list.
- C58 | queue item 597 | rewritten: Needed by, "until climb batch 34b's landing, when it goes to part (a) if the fourteen components then compile to jars (set by the landing workflow)".
- C59 | queue | filed as item 606, (c), "How batches run".
- C60 | queue | filed as item 607, in (a), "Answered by a decision of his".
- C61 | queue | filed as item 608, (b), "How batches run", consequential.
- C62 | queue | filed as item 609, (c), "Code generation and the run time".
- C63 | queue | filed as item 610, (c), "The checker's typing and inference".
- C64 | queue | filed as item 611, (c), "The checker's typing and inference".
- C65 | queue | filed as item 612, (c), "The library's generators, strings and comparisons".
- C66 | queue | filed as item 613, (c), "Overloading and the Meet Rule".
- C67 | queue | filed as item 614, (c), "Code generation and the run time".
- C68 | queue | filed as item 615, (c), "The specification's text".
- C69 | queue head | rewritten: a sentence on this routing at the end of the head's history paragraph; a new group "Climb batch 34's defaults and open questions, for his review; later work needs a few of them", after climb batch 33's group, holding 375, 606 and 608 to 615; Counts 268 open, 94 consequential, 174 routine; "Before the switch-over" 22 (19, 3); the new group 10 (1, 9). Section counts: (b) "How batches run" 3; (c) "The checker's typing" 7, "Overloading" 9, "The library's generators" 11, "The specification's text" 13, "Code generation" 26, "How batches run" 47; (a) "Answered by a decision of his" 109.
- C75 | `map/spec-to-implementation.md:259` | rewritten: `forAsIfExpr`, `assumedReceiverCall` and `assumedArgumentsCall` cited by member, without line numbers | RECORD, "Left for the coordinator", 5; checked in `CodeGen.java` (`:7128`, `:7245`, `:7266`).
- C32, C37, C39, C41, C44, C70 to C74 | left: owed.md gives them weight none, writer none.
- C76 | left: writer none, the coordinator's.

## The fix round

`mech-1.md` finds no failure in my homes: `plan-moves.py`, `queue-check.py` and `check-index.sh` pass. `cold-read.md` reads only the entries. `check.md` names two failures of fidelity in my homes, and I fixed both as it corrects them:
- C33 | `PLAN.md:13`, "Next." | rewritten: "and "Both runs" at 14:5x" is now "and "Both runs" at 14:44", the time of his message (14:44:55Z). The error came from the ground in `owed.md` and the review's "For the curator".
- C51 | `PLAN.md`, the line of finding A1 | rewritten: "four of the claims were corrected after the landing (`f7c6c2caec`)" is now "the skeptics corrected four of the claims, and `f7c6c2caec` the other four after the landing", as item 608 says.

The review's "For the curator" (`reviews/batch-34-review.md:409`) still gives 14:5x for "Both runs". It is not my home: a change for the coordinator.

## The "Needed by" lines that I set

Each is marked "(set by the landing workflow)" in the queue. Their sources are owed.md's grounds.
- 375 and 609: when item 3 of climb batch 34's list for the batch after is planned, with row 818's other forms.
- 584: when the batch after climb batch 34 is planned, with items 2 and 3 of its list.
- 597: until climb batch 34b's landing, when it goes to part (a) if the fourteen components then compile to jars.
- 602: when the batch after climb batch 34 is planned, with item 3 of its list.
- 606, 612 and 615: no planned work.
- 610: when item 3 of climb batch 34's list is planned, with the checker's other gaps.
- 611 and 613: when a stage checks the library's other components. The review's Part 5, 3, states the wait for the rows; the line for the items is mine.
- 614: with item 375.

Item 608's "Needed by" is the review's ("The steps due before the batch after", 2), taken as stated, without the mark.

## The kinds that owed.md marks as set by the workflow

- Item 606: B1 to B3 are "ordering only", by the review; their kind as routine is the workflow's.

## The item moved to (a)

- Item 607, fork L1, in "Answered by a decision of his": his words in chat at 14:3x UTC on 2026-11-20, "Regarding the choice. I don't care. Test first is not a dogmatic religion, but a pragmatic practice. Deal with it! Go to launch", as P-102's history holds them (block 2026-11-20 14:38Z). The fallback never ran.

## Defaults that the record does not hold

- Row 1092's parked line: "Default: parked, with that step." The section's opening gives parking as the default of every line there; no source names a default for the row.
- Items 610, 612 and 615, "The other way": "None asked". The record gives no other way for them.
- Item 611, "The other way: Repaired now", from the question's own words. Item 614, "Item 71 closed by him", from gather.1's default, "restated or closed by him".

## Decisions not taken

- Item 375's head line: I moved it from "Before the switch-over" to climb batch 34's group, since its new Needed by is item 3 of that batch's list. The other way keeps it in "Before the switch-over" and changes only the counts' reasons.
- Items 71 and 72 (queue 375 and 376) stay apart, each with a pointer to the other. The other way is the merge, which the review allows; it changes two of his open questions, so I left it.
- Item 610 (G.worker.1) stays open in (c) as "told". P-146 and P-157 answer its question, but only its batch is open. The other way files it in (a), "Answered by a decision of his", citing P-146 (2026-10-13 23:37 UTC) and P-157 (2026-10-23 13:03 UTC); owed.md gives it a Needed by, so I kept it open.

## Changes for the coordinator

- The boot note: its line for run 1's landing gives "1093 to 1096 opened"; the batch opened 1093 to 1097, and the coordinator filed 1092 during the run. It moves on when this workflow ends.
- The held list: no change. His rule of 2026-11-18 15:4x stays held there beside item 608.
- Run 2's section (C76): `CLIMB-BATCH-34.md`, section 4, rung C, step 3, still names no pieces of the rehearsal patch.
- The review's "For the curator" (`:409`) gives "Both runs" at 14:5x; his message is at 14:44:55Z.
