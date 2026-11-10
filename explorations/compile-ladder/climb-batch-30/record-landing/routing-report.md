<!-- The routing writer's report for climb batch 30's record landing: one line for each change of `owed.md` whose writer is `routing`, with the file, what was done and its ground, then the "Needed by" lines and kinds that the workflow set, the moves to (a), the defaults that the record does not hold, and the changes for the coordinator. -->

# The routing after climb batch 30's landing

Files changed: `explorations/coordinator/PLAN.md`, `PLAN-history.md`, `review-queue.md`, `map/modules-and-phases.md` and `map/compile-path-walkthrough.md`. `INDEX.md` needed no change. Nothing is committed.

PLAN line numbers below are those of the worktree before this routing, as `owed.md` gives them. Every line that left PLAN or changed in it stands word for word in `PLAN-history.md`, under "Climb batch 30's landing, 2026-11-10" and the heading that it stood under: 42 lines out, 42 found there by a whole-line comparison. This session may not start Python, so the counts below are from `grep` over each section. The workflow's round 1 ran `plan-moves.py`, `queue-check.py` and `check-index.sh`, and each passed (`mech-1.md`).

## The changes

- C26 | PLAN.md:9 | rewritten | 7 of 7 to climb batch 30; the demos 51 of 52 at the gather, with `Generator2Demo` and row 986 (`owed.md`).
- C27 | PLAN.md:10 | rewritten | the last landed gate is climb batch 30's (`d89fc0fda4`); what the batch built, with F-348 to F-351; the review's section 1.
- C28 | PLAN.md:11 | rewritten | nine lines, to climb batch 30.
- C29 | PLAN.md:12 | rewritten | the state after the landing: the three findings at their defaults, his numeral answer into POSITIONS, then climb batch 30b on his go of 07:4x. The old sentence on the Fable review is not carried over; the line names the review's steps 5 and 7 instead.
- C30 | PLAN.md, phase 4, after :49 | a new line | the batch's own line, with its landing commit and its review.
- C31 | PLAN.md:61 | rewritten | rows 889 to 892; row 888 closed by rung X.
- C32 | PLAN.md:66 | moved | row 971 is closed by `f36a651243`.
- C33 | PLAN.md:71 | moved | rows 947 and 951 are closed by `76b21f4981`.
- C35 | PLAN.md:89 | rewritten | item 408 and the clause on item 77 are out; items 488, 500 and 501 are named as due before the next batch or at their defaults.
- C36 | PLAN.md:91 | rewritten | nine batches, to climb batch 30.
- C37 | PLAN.md:106 | rewritten | row 497 closed; row 322's present case is for climb batch 30b's rung Y. Fix round: the line no longer says that a `typecase` in an arm compiles; it says that a named `typecase` clause there has no gated test, which rung Y adds (`check.md`, C37; F-134).
- C38 | PLAN.md:119 | rewritten | three parts built by rung P; three parts stay for the first batch after the switch-over: the grain's value, row 982's end and the analyzer's judgement. Fix round: the line names row 987.
- C39 | PLAN.md, "Off the path, parked", after :248 | three new lines | rows 983 and 640, and the analyzer's two defects. Fix round: the analyzer's line opens with "Row 987:" (`check.md`, C39; `mech-1.md`, `ledger.py add`).
- C40 | PLAN.md:132 to :134 | moved | item 74 and its group line; row 933 closed by `594da41299`. With it, PLAN.md:693, the opening paragraph of climb batch 28's list, lost "item 74 above, review-queue item 408" (rewritten, its old text moved).
- C41 | review-queue item 408 | moved to (a), "Answered by a landed fix or a closed row" | row 933 closed by `594da41299`; its line left the head's "Before the switch-over".
- C42 | PLAN.md:136 to :138 | moved | item 76 and its group line; his go of 07:4x UTC on 2026-11-10. With it, PLAN.md:719, the opening paragraph of climb batch 29's list, lost "with item 76, which comes before the next batch" (rewritten, its old text moved).
- C43 | review-queue item 449 | moved to (a), "Answered by a decision of his" | his go of 07:4x, quoted from `BOOT.md` at `4f66eaab35`, line 13.
- C44 | PLAN.md:140 to :142 | moved | item 77 and its group line; his answer of 11:3x UTC on 2026-11-10.
- C45 | review-queue item 487 | moved to (a), "Answered by a decision of his" | his answer of 11:3x, quoted from `HELD.md`, "Held in chat (2026-11-10)".
- C46 | PLAN.md:144 to :148 | moved | items 78 and 79 and their group line; rung N built both. With it, PLAN.md:750, the opening paragraph of climb batch 29b's list, now says that he answered question 1 and that rung N built the two repairs (rewritten, its old text moved).
- C47 | review-queue item 488 | rewritten, open in (b), "Code generation and the run time" | fork N1 as landed, the review's four ways, the 40 ms, "Needed by" as the review states it.
- C48 | PLAN.md, "Pavol's answers" | three new items, 80, 81 and 82, under a new group line | one for each finding, each a pointer to its queue item: 500, 488 and 501.
- C49 | review-queue item 489 | rewritten, moved from (b) to (c), "Numbers and numerals" | fork N2 as landed, told, to confirm or reverse; routine by `owed.md`.
- C50 | review-queue.md | filed as item 500, in (b), "Code generation and the run time" | the review's finding 1 and fork G.
- C51 | review-queue.md | filed as item 501, in (b), "Code generation and the run time" | the review's finding 3. Fix round: its "Home" names rows 987 and 982, and its way (a) names row 987.
- C52 | PLAN.md:769 | cut to a pointer | item 81 above and review-queue item 488.
- C53 | PLAN.md:770 | cut to a pointer; filed as item 502, in (b), "Numbers and numerals" | row 980, no default on record.
- C54 | PLAN.md:771 | cut to a pointer; filed as item 503, in (c), "Walk's checks at load" | row 981 and fork N3.
- C55 | PLAN.md:772 | cut to a pointer; filed as item 504, in (b), "Code generation and the run time" | row 984.
- C56 | PLAN.md:773 | cut to a pointer; filed as item 505, in (b), "Code generation and the run time" | the restart in place of the throw.
- C57 | PLAN.md:774 | cut to a pointer; filed as item 506, in (b), "Code generation and the run time" | row 985, no default on record.
- C58 | PLAN.md:775 | cut to a pointer; filed as item 507, in (c), "Tests and the team's demos" | row 986, told.
- C59 | PLAN.md:776 | moved | the three sentences of POSITIONS are this run's C18 to C20.
- C61 | PLAN.md:767 | rewritten | the pointer form of climb batch 29b's paragraph; names items 80 to 82.
- C62 | review-queue.md; PLAN.md, after :777 | filed as item 508, in (c), "How batches run"; one new line in PLAN's list | forks N4, P3, P4, X1 to X4, B1 and B2.
- C63 | PLAN.md, "Pavol's answers"; review-queue.md | two new items, 83 and 84, under a new group line; filed as items 509 and 510, in (b), "Code generation and the run time" | D1 and D2 of the parallelism review, not yet asked.
- C64 | PLAN.md, "Pavol's answers"; review-queue.md | a new item, 85; filed as item 511, in (c), "Code generation and the run time" | row 876, CONTESTED.
- C65 | PLAN.md:699 | moved | rows 934, 937 and 888 closed by `594da41299`.
- C66 | review-queue item 413 | moved to (a), "Answered by a landed fix or a closed row" | the same rows and commit.
- C67 | review-queue item 418; PLAN.md:704 | rewritten, open in (c) | fork X5 built the item's other way; the default is now as landed.
- C68 | PLAN.md:711 | moved | both rows closed.
- C69 | review-queue item 425 | moved to (a), "Answered by a landed fix or a closed row" | rows 934 and 937 closed by `594da41299`.
- C70 | review-queue item 459; PLAN.md:729 | rewritten | row 967 closed; the default is the text's reading as landed; item 502 named beside it. The item's citation `literals.tex:189-190` is now `:209-210`, read in the tree.
- C71 | review-queue item 457; PLAN.md:728 | rewritten | row 958 closed; a float numeral on either side.
- C72 | review-queue item 470; PLAN.md:740 | rewritten | his answer on item 487, and climb batch 30b's equality rung.
- C73 | PLAN.md:755 | moved | row 974 closed by `f36a651243`.
- C74 | review-queue item 493 | moved to (a), "Answered by a landed fix or a closed row" | row 974 and `f36a651243`; item 503 holds what stands.
- C75 | review-queue item 495; PLAN.md:757 | rewritten | rung N deleted walk's leftovers; the comment and the glue are left. Fix round: the item's opening states walk's code and the prelude's comments in the past, under "Until climb batch 30's rung N (`f36a651243`)". Read in the tree: the comment in `CodeGen.java` stands, now at `:6550`; the prelude's two comments no longer name `IntLiteral`; of the test's two messages, only `NumeralTypesWalk.fss:41` names the deleted pairs (`check.md`, C75).
- C76 | PLAN.md:758 | moved | the two tests are built.
- C77 | PLAN.md:759 | rewritten | the test is for climb batch 30b's equality rung.
- C78 | review-queue items 450, 461 and 462 | rewritten, their "Needed by" lines | item 449 is answered.
- C79 | review-queue.md, "When each item is needed" | rewritten | the opening paragraph gains this routing; the counts are 185 open, 74 consequential and 111 routine; "The next batch" holds 500, 488, 501, 403, 335 and 406; a new group holds 489 and 502 to 511; the groups of climb batches 28, 29 and 29b follow their items.
- C80 | review-queue items 408, 413, 425, 449, 487, 488, 489 and 493 | repointed | each "Home" names PLAN-history, "Climb batch 30's landing, 2026-11-10", and the heading and item that moved.
- C81 | `map/modules-and-phases.md:423`; `map/compile-path-walkthrough.md:519-522` | rewritten | `MainWrapper.main` as it stands at `d89fc0fda4`: `:94` sets the arguments, `:30-46` and `:95` initialize the classes, `:96-98` invoke `main`, read in the tree.

Not mine, and left: C34, C60, C87 and C88 stay as `owed.md` says.

## The section counts of the queue

- (b): "Numbers and numerals" 16; "Code generation and the run time" 15.
- (c): "Walk's checks at load" 2; "Numbers and numerals" 15; "Sizes and arrays" 4; "Tests and the team's demos" 5; "Code generation and the run time" 8; "How batches run" 38; "The record, its tools and the repository" 12.
- (a): "Answered by a decision of his" 98; "Answered by a landed fix or a closed row" 48.

## The "Needed by" lines that I set

Each carries "(set by the landing workflow)":

- 489, 502, 503, 505, 506, 507, 508, 511, 418, 459, 461 and 495: no planned work.
- 504: with the answer to item 510.
- 509 and 510: no planned work; no rung needs either, by the batch's record.
- 450: before the names batch; climb batch 30b's rung C builds row 957's compiled half first.
- 462: with climb batch 30b's rung C.

Taken as the review states them: 488, 500 and 501, "before the next batch, or at the default as landed".

## The kinds that `owed.md` marks as set by the workflow

- 489 (C49): routine. It moved from (b) to (c) for that reason.
- 506 (C57): consequential.
- 507 (C58): routine.
- 509 and 510 (C63): consequential.
- 511 (C64): routine.

## The moves to (a)

- 449, a decision of his: his go of 07:4x UTC on 2026-11-10, "numeral batch as my go, but together with the parallelism work."
- 487, a decision of his: his answer of 11:3x UTC on 2026-11-10, "I think one is fine and I don't think I have categorically excluded it before."
- 408, a closed row: row 933, `594da41299`.
- 413, closed rows: rows 934, 937 and 888, `594da41299`.
- 425, closed rows: rows 934 and 937, `594da41299`.
- 493, a closed row: row 974, `f36a651243`.

## The defaults that the record does not hold

Items 502, 506, 509, 510 and 511 say "No default on record". Item 504's default is the record's: open, not repaired.

## For the coordinator

- The analyzer's row is row 987. The fix round put the number into PLAN's parked line, PLAN's phase 6 line and review-queue item 501.
- The boot note: its "Next" as PLAN's "Next" now reads; its "the compiled transaction's repairs, which answer review-queue item 408" is a move to (a) by the closed row.
- The held list: his go of 07:4x is not in it. Item 449's entry in (a) cites `BOOT.md` at `4f66eaab35`, line 13.
- Item 489's move to (c) follows `owed.md`'s kind. The review lists fork N2 among "The decisions consequential for him". Confirm the kind.
- Three paragraphs of PLAN changed that `owed.md` does not list: the opening paragraphs of the lists of climb batches 28, 29 and 29b, each of which named an item that moved.
- Item 495 names one leftover that no batch holds: the message of `ProjectFortress/tests/NumeralTypesWalk.fss:41`.
- The fix round changed four failures of `check.md`: C37, C39 (with C38 and C51) and C75. C3 and C6 are the entries writer's, and `cold-read.md` reads the entries writer's text. The mechanical checks of round 1 all passed (`mech-1.md`); this session cannot run them again after the fixes. The fixes take no line of the base's PLAN out and change no item's number, part or count.
