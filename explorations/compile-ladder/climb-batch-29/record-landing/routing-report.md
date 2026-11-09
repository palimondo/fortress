<!-- The routing writer's report for climb batch 29's record-landing: one line for each change of owed.md whose writer is routing, with the file and line, what was done and its ground, then the "Needed by" lines set, the kinds set by the workflow, the moves to (a), the defaults the record does not hold, and the changes for the coordinator. -->

# The routing writer's report, climb batch 29

The files changed: `explorations/coordinator/PLAN.md` (64 lines in, 75 out), `PLAN-history.md` (120 lines in, none out) and `review-queue.md` (367 lines in, 108 out). INDEX is unchanged, since `checks.md` names no note without an INDEX line. Line numbers are the new PLAN's unless "old" is written. Each line that left PLAN or changed in it stands word for word in `PLAN-history.md`, under "Climb batch 29's landing, 2026-11-09" (the date of `7daf51fe8`) and under its PLAN heading. I checked that with `git diff -U0` and `comm`: no removed line of PLAN is missing from PLAN-history, and PLAN-history lost no line. I could not run `plan-moves.py`, `queue-check.py` or `check-index.sh`, since this session may not run `python3`. So I checked the queue by hand: the section counts, the head's counts, and that the head names each open item once.

The fix round: `mech-1.md` ran `plan-moves.py`, `queue-check.py` and `check-index.sh`, and each passes. `check.md` failed fourteen changes in my homes, and each is fixed below, marked "(fix round)": C93, C96, C107 and C113 in PLAN, C169 in queue item 478, and C98 to C104, C119 and C129 in this report, where C119's change also reaches PLAN-history's intro. After the fixes, the 72 lines taken out of PLAN all stand in PLAN-history, and PLAN-history still lost no line. `cold-read.md` reads the entries writer's text and holds nothing in my homes.

## The changes

- C90 | PLAN.md:9 | rewritten: the walk check from climb batch 11 to 29, 52 of 52 on climb batch 29's merged tree | the review, section 5 and "Confirmations".
- C91 | PLAN.md:10 | rewritten: climb batch 29's gate at `7daf51fe8`, 0 and 0 with no crash; 374 of 402, `Reflect`'s 28 the only glue; one sentence on what the batch built, pointing to the review's section 7. I also changed "the merged tree is not measured" to "no merged tree since climb batch 26's rung L is measured", since the review's section 6 says that climb batch 29's is not measured either | F-53, F-32, F-299; RECORD.md, "The count of the bindings".
- C92 | PLAN.md:11 | rewritten: climb batches 23 to 29, seven lines, climb batch 29 at `7daf51fe8`.
- C93 | PLAN.md:12 | rewritten: climb batch 29 landed and its review committed (`bedcfc4a1b`); then the record-landing, the orientation update and the skill update; his answers to findings 1 and 4 (items 75 and 76, queue items 448 and 449); then climb batch 30 by phase 4's order or finding 4's option (a), cited as `reviews/batch-29-review.md`, Findings, 4, option (a) (fix round); item 74 before the compiled transaction | the review, "The steps due before the next batch", 1 to 5.
- C94 | PLAN.md:48 | new line: climb batch 29, phase 4's seventh batch, landed 2026-11-09 at `7daf51fe8`, its review | the review, Part 4.
- C95 | PLAN.md:49 | rewritten: "Since climb batch 29, 374 of the 402 ... only `Reflect`'s 28" | RECORD.md, "The count of the bindings".
- C96 | PLAN.md:54 | cut to N3's open part: the built `IntLiteral` clause is out, its old text in PLAN-history (fix round) | `3de571bac7`; F-32, F-331.
- C97 | PLAN.md:56 | rewritten: N5's numeral sentence cut to "It holds no numeral binding since climb batch 29 (F-32)."; its other parts stay | row 578 closed.
- C98 to C104 | old PLAN.md:68-74 | moved, built: the line "Climb batch 29, the literals" and its six sub-lines; its half lines not built (C99's fork F6, C100's fork F5) have the new lines of C106 and C107. Each by its commit: C98 the landing of the six rungs, `7daf51fe8`; C99 the library and the checker, N's `3de571bac7` and C's `53a6074ed7`; C100 the fold, F's `955cad76df`; C101 walk's numerals, N's `3de571bac7`; C102 row 364's way A, G's `12292add28`; C103 the strings, S's `e53480fc6e`; C104 the specification, T's `4978a9b16e`.
- C105 | PLAN.md:69 | rewritten as a line of its own: "Not in climb batch 29, for the budget (his go of 23:3x UTC on 2026-11-08): ..." | the review, Part 4.
- C106 | PLAN.md:72 | new line: fork F5, the compiled four numbers, for the names batch; points to item 482 | the record, fork F5, section 5; the review, section 7, 2.
- C107 | PLAN.md:73 | new line: fork F6, the pairs' compiled fold, with fork F6's own reason: no compiled test can show it before the switch-over, and after it a pair's body converts the numeral object correctly unfolded (fix round); item 482 | fork F6; the review, section 7, 3.
- C108 | PLAN.md:74 | new line: fork F7, a compiled `QQ` place and the compiled numeral `SEQV`; item 482 | fork F7; the review, section 7, 4.
- C109 | PLAN.md:75 | new line: fork N11, walk's two unused glue classes, for the names batch's clean-up; item 475 | fork N11; the review, section 6.
- C110 | PLAN.md:255 | new line under "Phase 3's candidates at its end", after row 936's: row 959, with `XXXTypecaseUndefinedArmWalk`, for the same walk rung as rows 806, 611 and 936 | row 959; the review, Part 4.
- C111 | PLAN.md:77 | new line after the prelude's defects: row 965, which retires with the prelude | row 965; P-38; the review, section 7.
- C112 | PLAN.md:79 | rewritten: row 579's device; "`IntLiteral` stating its own" named as a type that the one library no longer has | F-79; the review, Part 4.
- C113 | PLAN.md:85 | rewritten: Q-walk's numeral half built by rung N (`3de571bac7`), which closed row 443, and rung C's `53a6074ed7` closed row 486 (fix round); both out of its list; row 387's conversion narrowed to values that are not numerals; walk's `ZZ64` for a large size pointed to row 962, item 461. I dropped "walk's numeral is never a value of a numeral type", which N1 made false. The LOOK on item 91 needed nothing | rows 443 and 486; row 387's note.
- C114 | old PLAN.md:87 | moved: row 578's line | `3de571bac7`; row 578 closed.
- C115 | PLAN.md:89 | rewritten: the list gains 450, 455, 460, 470, 476, 477 and 482, the new items that the queue's head puts before the switch-over, and names item 448 (item 75's) as needed before the next batch. 448 stays out of the list itself, so that the list matches the head's group | the review, Part 4, "`:93`".
- C116 | PLAN.md:104 | rewritten: "(F-229; row 729)", row 721 out | row 721 closed by `12292add28`.
- C117 | PLAN.md:108 | rewritten: item 245 out of the list, with "item 245 is answered by P-76 and P-173" | `review-queue.md:1567` at the base.
- C119 | old PLAN.md:214 | moved, stale by a landed change: row 360 fixed by `69427e942`, settled by P-173. No word of his is on this item: the round sentence that applies P-173's tie rule is the coordinator's (`40680b856d`), still to tell him. PLAN-history's intro says so (fix round).
- C120 | old PLAN.md:240 | moved: row 325's faces, built | `53a6074ed7`; row 325 closed.
- C121 | PLAN.md:249 | rewritten: walk's half of conditional extension waited on row 364, which rung G fixed (F-344), so it can come as a walk rung of its own | the record, "Left out, each with its home".
- C122 | PLAN.md:258 | rewritten: rows 364, 721 and 722 out of item 18's open list; row 717, narrowed, stays | rows.md.
- C123 | PLAN.md:273 | rewritten: Q-walk's row 387 line; walk converts a numeral at a declared return type since rung N, and the line holds other values | `953d050966`; `tests/ZZOneGetterWalk.fss`.
- C124 | PLAN.md:444 | rewritten: walk's inferred `Int` gave a plain array until rung G, which made walk infer `ZZ32` and give a vector | F-229; row 721.
- C125 | PLAN.md:445 | rewritten: the plain array stays for a user type below `Number`; at a walk-inferred `ZZ32`, `ZZ64` or `RR64` it was plain until rung G | row 721 closed; `tests/ArrayInferredElementVectorWalk.fss`.
- C126 | PLAN.md:547 | rewritten: walk's half "waited" on row 364, which rung G fixed (F-344).
- C127 | PLAN.md:140 | cut to a pointer, item 75, and filed as queue item 448, (b), "Numbers and numerals" | the review, Findings, 1; rows 961 and 968.
- C128 | PLAN.md:142 | new item 76 under a new heading "Before the next batch, raised by climb batch 29's post-batch review", and filed as queue item 449, (b), "Numbers and numerals" | the review, Findings, 4.
- C129 | old PLAN.md:713 | moved, stale by the landed rungs (`7daf51fe8`): each of the ten defaults is built (C130 to C139), so "wanted before its rung lands" is past.
- C130 to C134 | old PLAN.md:715-719 | moved; queue items 438 to 442 moved to (a), "Answered by a decision of his" | his yes of 23:3x on 2026-11-08 (`HELD.md:22`); P-173, P-174.
- C135 | old PLAN.md:720 | cut to its open half, now PLAN.md:716; queue item 443 rewritten to its open half with the landed default C2, and moved from (b) to (c), "Numbers and numerals", as routine by the record | the record, section 2, point 1.
- C136 to C138 | old PLAN.md:721-723 | moved; queue items 444 to 446 moved to (a) | `HELD.md:22`; P-174, P-168, P-173.
- C139 | old PLAN.md:724 | cut to its open half, now PLAN.md:717; queue item 447 rewritten with the landed default F4, moved from (b) to (c) | the record, section 2, point 2.
- C140 | old PLAN.md:726 | rewritten as the list's one paragraph, PLAN.md:713, in the form of climb batch 28's, with "The ones that wait on him before the switch-over are under 'Pavol's answers' above" kept and items 75 and 76 named.
- C141 to C164 | old PLAN.md:728-750 and :754 | each cut to a pointer line, PLAN.md:718-741, and filed as queue items 450 to 473: 450 (b, code generation), 451 (c, numbers), 452 (c, numbers), 453 (c, tests), 454 (c, numbers), 455 (b, overloading), 456 and 457 (c, numbers), 458 and 459 (b, numbers), 460 and 461 (b, sizes), 462 (c, numbers), 463 (b, numbers), 464 (c, strings), 465 (c, walk's choice of declaration), 466 (b, strings), 467 (c, tests), 468 (b, numbers), 469 (c, numbers), 470 (b, strings), 471 (b, numbers), 472 (c, specification), 473 (b, specification).
- C165 | old PLAN.md:751, :752, :753 and :755 | cut to one pointer line, PLAN.md:740, to item 474 (c, how batches run), which holds the whole batch's forks 1 to 8 and gather.1, .3, .4 and .6; one new line for the forks, PLAN.md:744, naming items 474 to 485 | the review, Part 4.
- C166 to C176 | queue items 475 to 485 | filed: 475 (N's forks), 476 (N1, b), 477 (N3, b), 478 (N4, b), 479 (C's forks), 480 (C4, b, overloading), 481 (F's forks), 482 (F5 to F7, b, code generation), 483 (G's), 484 (S's), 485 (T's); the per-rung items are in (c), "How batches run" | the record, sections 2 and 3; the review, "The decisions consequential for him".
- C169 | PLAN.md:745 | new line for fork N4, item 478. In item 478, "P-165's list names `NaturalNumeral` and not `RadixPointNumeral`" now reads "named ... until this landing added it, under his rule of 2026-10-31; his to confirm here", since C72 changed P-165 (fix round).
- C177 | PLAN.md:746 | new line for the record's points, filed as item 486 (c, how batches run) | the review, Part 4.
- C180 | review-queue.md:5-222, the head | rewritten: a sentence on this routing; the counts, 173 open, 72 consequential and 101 routine; 448 and 449 in "The next batch"; the numeral group cut to 443 and 447 with its line rewritten; 450, 455, 460, 470, 476, 477 and 482 in "Before the switch-over"; a new group "Climb batch 29's defaults, for his review" with the other 30 new items.
- C181 | item 403 | rewritten: climb batch 29's gate reads `#crash none` too; its "Needed by" stands; its head line rewritten in the group's prose.
- C182 | item 406 | rewritten: the numerals' 24 "left", in rung N (`3de571bac7`), in its text, its "Landed:" and its cost; its head line names their removal.
- C183 | item 437 | rewritten: `Reflect`'s 28 are the only glue bindings, 28 of 402; its "Needed by" and its head line follow.
- C184, C185 | items 224 and 76 | rewritten: the rung waited on row 364, which rung G fixed (F-344), so it can come after G.
- C186 | item 372 | rewritten: row 364 closed, walk reads the nine at their traits, a `typecase` arm `Int` still matches `3` (F-344); its `FortressBuiltin.fsi` lines `:41`, `:128`, `:131`, `:197`, `:200`, checked against the file.
- C187 | item 380 | rewritten: climb batch 29's gather revised the effect to 374 of 402 in rung N's commit.

Beyond `owed.md`:
- PLAN.md:91, phase 4's closing paragraph | rewritten: "Its first seven batches, climb batches 23 to 29, landed". The sort did not list it; the paragraph was stale at the landing.
- Old PLAN.md:166, under "Pavol's answers", "For his review" | moved: the line on two bare numerals printed apart, whose only pointer is item 444. Item 444 is now in (a), and rung N respelled `NumberPrintTest.fss:16` by its default. The sort did not list it.

## The "Needed by" lines that I set

Each is marked "(set by the landing workflow)" in its item:
- Before the names batch: 450, 476 and 477.
- Before the switch-over: 455 and 470; 460 with item 35.
- With the answer to 449: 459, 461 and 462.
- The next rung that edits the fold: 452.
- No planned work: 443, 447, 451, 453, 454, 456, 457, 458, 463, 464, 465, 466, 467, 468, 469, 471, 472, 473, 474, 475, 478, 479, 480, 481, 483, 484, 485 and 486. As the review states them, not marked: 448 and 449 (before the next batch) and 482 (the names batch, as the record states it).

## The kinds that `owed.md` marks as set by the workflow

Consequential: 450, 455, 459, 460, 461, 466, 468, 470 and 471. Routine: 451, 452, 453, 454, 456, 457, 462, 464, 465, 467, 469, 472 and 486.

## The items moved to (a)

To "Answered by a decision of his", each with his yes of 23:3x UTC on 2026-11-08, "Yeah. Option one.", to the defaults for the judgement's open items (`HELD.md:22`), and the entry that now states it: 438 (P-173), 439 (P-174), 440 (P-174), 441 (P-173), 442 (P-173), 444 (no entry; his yes and the item's own default), 445 (P-174, P-168) and 446 (P-173). Each names the rung and fork that built it. The review routed them only as "built at their defaults". The sorter routed them to (a). Their defaults were the coordinator's, and he said yes to each before the batch built it. No item went to "Answered by a landed fix or a closed row".

## The defaults that the record does not hold

No default on record, written so in the item: 448 (beyond fork C6's, which the landed tree departs from), 449, 452, 459, 461, 468 and 469. I invented no default.

## The changes for the coordinator

- `BOOT.md`: its "Next" and "Running" move past the record-landing. Its point 7's queue items for N1, N3 and N4 are 476 to 478, the PLAN lines for F5 to F7 and N11 are PLAN.md:72-75, and items 443 and 447 carry C2 and F4. "Waiting on him" gains items 448 and 449 first, then 473 (finding 2), and 478, 458 and 463 (finding 3's three readings).
- `HELD.md`: nothing from this routing.
- The queue's (a) moves of 438 to 442 and 444 to 446 follow the sort, which named them as a departure from the review's routing. Confirm them, or move them back to the numeral group, open.
- Items 443 and 447 moved from (b) to (c), as routine by the record. They stay in their own group in the head, as the sort asked.
- I put item 450 in "Before the switch-over", since its "Needed by" is before the names batch; the sort's list for that group did not name it.
- The two PLAN lines beyond the sort, above.
