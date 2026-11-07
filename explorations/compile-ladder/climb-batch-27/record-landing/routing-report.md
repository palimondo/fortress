<!-- The routing writer's report for climb batch 27's record-landing: one line for each change of owed.md whose writer is routing, with what was done in PLAN, PLAN-history, the review queue, INDEX or another note, and its ground. -->

# The routing of climb batch 27's landing

The files changed: `explorations/coordinator/PLAN.md`, `explorations/coordinator/PLAN-history.md` (a new last section, "Climb batch 27's landing, 2026-11-07"), `explorations/coordinator/review-queue.md`, `explorations/compile-ladder/climb-batch-27/RECORD.md` and `explorations/coordinator/map/spec-to-implementation.md`. INDEX is unchanged. The landing's date is 2026-11-07 (`git log -1 --format=%cs a2f0b5cf2`).

The new review-queue items are 373 to 405, numbered after 372 in the order of `owed.md`: C71 373, C72 374, C73 375, C74 376, C75 377, C76 378, C77 to C89 379 to 391, C90 to C100 392 to 402, C105 403, C106 404, C107 405.

Checked by hand, since the shell here refuses `queue-check.py` and `plan-moves.py` without approval:
- Every line taken out of PLAN stands word for word among the lines that PLAN-history gained (`git diff -U0` of both files, then `grep -Fxv -f`): no line missing. PLAN-history lost no line.
- The queue's sections hold the items that their headings count, and the head's lines add up to 107 open items, 48 consequential and 59 routine.

## One line per change

- C40 | `PLAN.md:9` | rewritten: "to climb batch 27", `reviews/batch-27-review.md`; "(F-283; item 73)" now "(F-283; row 921)", since item 73 left PLAN | the review, section 5.
- C41 | `PLAN.md:10` | rewritten: climb batch 27's gate (`a2f0b5cf2`, pushed at `209192b67`), the distance 0 with two crash rows (F-54; row 929); 341 of 443 and 102 (F-299, F-32); "Neither stage reads `System`'s two helper strings" in place of "304 of the 306", a count that the record does not hold for the merged tree; the code generator's `asif` (F-325); P-160's two steps built (F-318, F-324) | finding E.
- C42 | `PLAN.md:11` | rewritten: climb batches 23 to 27, phase 4's first five lines, climb batch 27 at `a2f0b5cf2`, pushed at `209192b67` | finding E; `HELD.md:26`.
- C43 | `PLAN.md:12` | rewritten: climb batch 27 landed; then climb batch 28 at his go of 10:4x UTC on 2026-11-07, as the review states it, with rungs S and T by item 377, P-161's rung (fork I2) and N4's reader rung (fork W1); item 354 no longer named | finding E; the review, "The steps due before the next batch", 5; `coordinator/CLIMB-BATCH-27.md`, forks I2 and W1.
- C44 | `PLAN.md`, phase 4, after climb batch 26's line | new line: "**Climb batch 27**, phase 4's fifth batch, landed 2026-11-07 at `a2f0b5cf2`, pushed at `209192b67`; its review is `reviews/batch-27-review.md`." | the review, Part 4.
- C45 | `PLAN.md:46` | moved | `a97d60dc6`; F-324.
- C46 | `PLAN.md:47` | rewritten: "Since climb batch 27, 341 of the 443 live bindings name helpers and 102 still name glue classes (F-299, F-32)." | RECORD.md, "The count of the bindings".
- C47 | `PLAN.md:48` | rewritten: the clause on `FlatString`'s two now reads "and `FlatString`'s `=` and `flatConcat` at a `Char` with climb batch 27's rung F (F-323)" | `e4872ad93`; F-323.
- C48 | `PLAN.md:49` | moved; one line stays: all but `ZZ32`'s `big` moved (F-308, F-311, F-313, F-323, F-326 to F-328), `big` with P-161's rung | `0122a399a`, `e4872ad93`, `5ae581c4a`, `598331c0d`.
- C49 | `PLAN.md:50` | moved; one line stays, since no other line holds it: `CC64` compares field by field under walk (F-326), its compiled `=` waits for the switch-over (fork E9), and the second stress test's pointer to phase 5 | `598331c0d`; the record, fork E9.
- C50 | `PLAN.md:51` | moved | `0122a399a`; F-327.
- C51 | `PLAN.md:52` | moved | `e4872ad93`; F-323.
- C52 | `PLAN.md:53` | moved | `fc860b655`; F-329.
- C53 | `PLAN.md:54` | rewritten: "rows 872, 915 and 927, a `Char` past U+FFFF" | rows.md, rows 872, 915, 927.
- C54 | `PLAN.md:57` | moved; its `FileWriteStream` goes to the reader rung's line (C55) | `c21780408`; F-330.
- C55 | `PLAN.md:58` | rewritten: the reader rung takes `FileWriteStream` and its 5 bindings (row 926; review-queue item 373); "F-32's 143 becomes 107" now "the 36 are gone (F-32 holds the count)" | the review, Part 1, split 1.
- C56 | `PLAN.md:62` | rewritten: "climb batch 27's merged tree is not measured"; row 818 narrowed by rung G (F-325) | `8caa399e8`; the review, Part 4.
- C57 | `PLAN.md:67` | rewritten: row 321 holds the prelude's `Object` only (row 321; F-328); the tuple question kept word for word from "his word on the device" on, with "Asked with it" now "Asked". A row-321 clause stays, though owed.md moves the built half: row 321 is still open, narrowed to the prelude's `Object`, and this line is its PLAN home beside the tuple question | `5ae581c4a`; rows.md, row 321.
- C58 | `PLAN.md:88` | rewritten: "Its first five batches, climb batches 23 to 27, landed" | the landing.
- C59 | `PLAN.md:124` | moved, with its intro line `:122` | P-162; `0122a399a`, `e4872ad93`.
- C60 | `PLAN.md:128` | moved, with its intro line `:126` | P-163; `fc860b655`.
- C61 | `PLAN.md:138` | moved | his go of 14:0x UTC on 2026-11-07, `HELD.md:26`.
- C62 | `PLAN.md:681` | rewritten: the header in climb batch 26's form, the review's additions named, "items 68 to 72 above, review-queue items 377 and 373 to 376", and the pointer to PLAN-history's section | item 73 answered (C61).
- C63 | `PLAN.md:696` | moved | its stale lines are this run's C18 to C26 (entries) and C41 to C58 (routing).
- C64 | `PLAN.md:630` | moved | his word of 05:51 UTC on 2026-11-06, "OPtIoN 6! The one sane option." (P-161; review-queue item 338 in (a)); PLAN-history's "Answered:" list cites the same.
- C65 | `PLAN.md:637` | moved | his decision between 08:5x and 09:3x UTC on 2026-11-06 (P-162; item 331 in (a)); PLAN-history's "Answered:" list cites the same.
- C66 | `PLAN.md:638` | moved | his decision between 08:5x and 09:3x UTC on 2026-11-06 (P-162; item 332 in (a)); PLAN-history's "Answered:" list cites the same.
- C67 | `PLAN.md:645` | rewritten: row 861's form is in PLAN-history's new section; "Nothing on the path waits on them." | P-163; `fc860b655`.
- C68 | `PLAN.md:658` | moved | his word of about 10:1x UTC on 2026-11-06, "regarding the char question, I guess D" (P-163; item 354 in (a)); PLAN-history's "Answered:" list cites the same.
- C69 | `PLAN.md:669` | moved | his decision between 08:5x and 09:3x UTC on 2026-11-06 (P-162; item 361 in (a)); PLAN-history's "Answered:" list cites the same.
- C70 | `PLAN.md:673` | moved | `e4872ad93`; F-323.
- C71 | `PLAN.md:142` | cut to a pointer; filed as item 373, (b), "Code generation and the run time". Fix round: the PLAN pointer and the queue's head line now read "No default on record for fork W5; as landed, it moves with the reader rung.", as the item's body does | item 69; the review, Part 1, split 1.
- C72 | `PLAN.md:146` | cut to a pointer; filed as item 374, (b), "Overloading and the Meet Rule" | item 70.
- C73 | `PLAN.md:147` | cut to a pointer; filed as item 375, (c), "Code generation and the run time" | item 71.
- C74 | `PLAN.md:148` | cut to a pointer; filed as item 376, (c), "Code generation and the run time" | item 72.
- C75 | `PLAN.md:136` | cut to a pointer; filed as item 377, (c), "How batches run" | item 68; the review, section 7, point 2; `BOOT.md`, its state line.
- C76 | queue (a), "Answered by a decision of his" | filed as item 378, citing his go of 05:5x UTC on 2026-11-07, "The batch is pre-approved for launch after Fable review." (`HELD.md:31`) | the record's Question 1.
- C77 to C89 | `PLAN.md:683` to `:695` | each cut to a pointer; filed as items 379 to 391: 379 (c) overloading; 380 (c) numbers; 381, 382, 383, 384, 385 (c) the library's strings; 386 (c) the record; 387 (c) tests; 388 (c) the specification's text; 389 and 391 (c) how batches run; 390 (b) tests and the team's demos | PLAN lines `:683` to `:695`.
- C90 | `PLAN.md`, climb batch 27's list | new line for the record's forks, naming items 392 to 400 and 402; item 392 filed, (c), how batches run | the record, section 3.
- C91 to C98 | queue | filed as items 393 to 400, (c), how batches run, one per rung: N, I, F, C, W, A, E, G | the record, section 3.
- C99 | `PLAN.md`, climb batch 27's list, beside E.worker.2 | new line; filed as item 401, (c), the library's strings | the record, fork E7; row 923.
- C100 | queue | filed as item 402, (c), the library's strings; named in the PLAN forks line | the record, fork A6; row 916.
- C101 | queue item 371 | its Landed line gains rung E's fork E6; its default and "Needed by" now the switch-over batch, as fork E6 states; its head line moved from the next batch's group to "Before the switch-over"; it stays open | the record, fork E6.
- C102 | queue item 363 | moved to (a), "Answered by a landed fix or a closed row", citing `e4872ad93` and F-323 | rung F.
- C103 | queue item 372 | its Landed line and its head line rewritten: the five public (fork A3), walk's ilk names their traits since rung A (`5ae581c4a`; F-328); stays open before the switch-over | the record's "Left for the coordinator".
- C104 | queue head | rewritten: line 5 names this routing; the counts 107 open, 48 consequential, 59 routine; "The next batch and the natives' batches" rewritten with 377, 403 and 373, 363 gone, 371 moved; "Before the switch-over" gains 371 and 374 to 376; a new group, "Climb batch 27's defaults, for his review", with 26 items | the review, Part 4.
- C105 | `PLAN.md`, climb batch 27's list | new line; filed as item 403, (b), how batches run | finding A.
- C106 | `PLAN.md`, climb batch 27's list | new line; filed as item 404, (c), the record | finding B; `HELD.md:35` (05:1x) and `:26`.
- C107 | `PLAN.md`, climb batch 27's list | new line; filed as item 405, (c), how batches run | the record, section 3, "Points the batch lists for him".
- C108 | `PLAN.md`, phase 4, after the line on row 578 for Q-walk | new line on rows 919, 920 and 922, with Q-walk's device for `asif`, unless a walk rung takes them sooner. Fix round: its last clause now reads "review-queue item 390 holds judge.1's note that row 921 was fixed before row 919, which the batch that fixes row 919 builds on" | the review, Part 4; rows.md; item 390.
- C109 | `PLAN.md`, phase 4, after the line on the rewrite's limits | new line on row 929, with its way through, pointing to item 403 | rows.md, row 929.
- C110 | `RECORD.md:158` | a note after the paragraph, the record's text kept | finding G.
- C111 | `RECORD.md:256` | a note after the paragraph, the record's text kept | `HELD.md:26`.
- C112 | `map/spec-to-implementation.md:259` | rewritten: the code generator's cell names `CodeGen.forAsIfExpr:6428`, `assumedReceiverCall:6545` and `assumedArgumentsCall:6566`, and the three refused forms (F-325); the status names them; the rows cell 818. Checked in `CodeGen.java`: the desugarer handles `as` only (`TypeAscriptionDesugarer.java:21`, `forAsExpr`) | RECORD.md, "Left for the coordinator".

Also changed, for consistency with C101 and C104: `PLAN.md:86`, the list of his answers needed before the switch-over, gains items 371, 372 and 374 to 376, since the queue's "Before the switch-over" holds them; 372 was missing from it before this landing. The old line is in PLAN-history.

## The "Needed by" lines set by this workflow

- 390: before the batch that fixes row 919.
- 403: before the next batch's gate.
- 379 to 389, 391 to 402, 404 and 405: no planned work.

The others are as the record or PLAN states them: 373 before the batch that moves N4's reader side (PLAN item 69); 374 to 376 before the switch-over (PLAN items 70 to 72); 377 before the next batch (PLAN item 68); 371 before the switch-over (the record, fork E6).

## The kinds that owed.md marks as set by the workflow

Consequential: 373 (it bends P-164's order), 374 (it reads the overloading rules anew across an import), 390 (a way the record does not settle). Routine: 375, 376, 377, 379 to 389, 391, 401, 404. 403 is consequential as the review states it; 392 to 400, 402 and 405 are routine as the record states it.

## Items moved to (a)

- 378, to "Answered by a decision of his": his go of 05:5x UTC on 2026-11-07, `HELD.md:31`.
- 363, to "Answered by a landed fix or a closed row": `e4872ad93` (F-323).

## Defaults that the record does not hold

- 373: no default on record for fork W5 (the review, Part 1, split 1); the item gives "as landed, it moves with the reader rung", PLAN item 69's text.
- 374: no default on record.
- 377: no default on record for the disk; as landed, the coordinator's call.
- 404: no default on record; as landed, pushed as is.

## Decisions not taken

- Item 390's theme: put in (b) "Tests and the team's demos", since the order was chosen to keep a demo running (P-79). The other homes: (b) "Code generation and the run time", or a new (b) theme for walk's evaluation.
- Item 373's theme: (b) "Code generation and the run time". The other home: (b) "The library's generators, strings and comparisons".
- Item 403's group: "The next batch and the natives' batches", since its "Needed by" is the next batch's gate. The other home: "Before the switch-over", where P-39's report-only distance ends.
- Item 371's Landed line and its default were rewritten beside its "Needed by", which `owed.md` alone names, since the default "decide with the rung that fixes what `SEQV` means" no longer holds after that rung. The other way: the "Needed by" line only, with the old default kept.

## For the coordinator

- `BOOT.md`: its "Waiting on him" names PLAN's items 69 to 72; their queue numbers are 373 to 376, and 377 (the disk), 403 (finding A) and 404 (finding B) join them. Its step 2 and step 3 as `owed.md` says.
- `HELD.md`: nothing written. The natives judgement of 10:5x waits for its POSITIONS entry and its queue item, as `owed.md` says.
- "Next" in PLAN names his go of 10:4x UTC on 2026-11-07 for climb batch 28. The review states it, and the checker found it in `coordinator/BOOT.md:20`, "Climb batch 28, on his go of 10:4x"; the held list has no 10:4x line for it.
- The checks `queue-check.py`, `plan-moves.py` and `check-index.sh` did not run in this session; `mech-1.md` ran them in round 1, and each passed.

## The fix round

`check.md` named eight failures in the routing's homes; each is fixed as it corrects them:
- C64, C65, C66, C68 and C69: PLAN-history's "Answered:" list and this report now cite his word on each item with its time.
- C71: the default lines of item 373 in PLAN and in the queue's head.
- C108: the last clause of PLAN's line on rows 919, 920 and 922.
- C57: this report gives the reason that a row-321 clause stays.

Not mine: the FACTS and POSITIONS failures (C3, C14 to C16, C21, C23, C26, C32, C33) and `cold-read.md`, which are the entries writer's. The checker's notes on F-310 and F-306 are for the coordinator.
