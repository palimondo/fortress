<!-- The routing writer's report for climb batch 29b's record-landing: what each routing change of owed.md did to PLAN, PLAN-history, the review queue and the two maps, with its ground, and what is left for the coordinator. -->

# The routing of climb batch 29b's landing

Files changed: `explorations/coordinator/PLAN.md`, `PLAN-history.md`, `review-queue.md`, `map/spec-to-implementation.md` and `map/dormant-code.md`. INDEX is unchanged: `checks.md` names no note without an INDEX line. PLAN-history gained one section, "Climb batch 29b's landing, 2026-11-10", with an opening paragraph and five headings. It holds every PLAN line that this routing moved or changed, copied by `sed` from the PLAN at `f629cd2dd`, so each is word for word.

This session may not run `python3`, so I checked the rules of `plan-moves.py` and `queue-check.py` by hand. The workflow's round 1 then ran them: both pass (`mech-1.md`).

## The fix round

`check.md` named five failures in my homes. Each is fixed:
- C77 (fidelity): PLAN's line on row 971 now reads "Fork A6's default for when it is built, the task pool started before the program's classes load ... is not built". It no longer reads as the batch's default, way (c).
- C78 (coverage): the paragraph of "Climb batch 29, listed for his review" now reads "with item 76, which comes before the next batch". Its old text is in PLAN-history, under "Climb batch 29, listed for his review".
- C86 (routing): item 77's group line now reads "Before the next batch, raised by climb batch 29b's rungs (...)". Its old text is in PLAN-history, under "Pavol's answers, in the order they are needed". This settles the decision that I had left open.
- C90 (fidelity): the line of item 450 now quotes P-176's "filled when the class loads", not P-174's lost words.
- C96 (routing): the ground below now names the commits.

Both old lines were checked against the PLAN at `f629cd2dd` with `grep -x -F`. Each stands in PLAN-history word for word.

C65 (row 960's condition) is the entries writer's. Its other way, a PLAN line beside review-routed.1 and .2, applies only if the note's size forbids the condition. I added no line.

## One line per change

- C67, PLAN.md:9, "Runs.": rewritten. 7 of 7 and 52 of 52 now name climb batch 29b, its review's section 7 and "Confirmations". Ground: the review, Confirmations; section 7.
- C68, PLAN.md:10, "The live thread.": rewritten. The last gate is climb batch 29b's (`a2be3e9e1`, its `gate/` folder). Climb batch 29 is named for the default, the fold and the strings, and climb batch 29b for the static numerals (P-174, P-176). The differences now point to `reviews/batch-29b-review.md`, section 2. Ground: the review, Part 4.
- C69, PLAN.md:11, "Landed.": rewritten to climb batches 23 to 29b, eight lines, climb batch 29b at `a2be3e9e1`. Ground: `git log -1 a2be3e9e1` (2026-11-10).
- C70, PLAN.md:12, "Next.": rewritten. It names this record-landing, then his answers to findings 1, 2 and 3 and item 77 (items 76 to 79; queue items 449 and 487 to 489), then the next batch by finding 3's option (a) or by phase 4. Its sentences on item 74, the Fable review and items 265 and 267 stand as they were. Ground: the review, "The steps due before the next batch", 1 to 5.
- C71, PLAN.md, new line after the line for climb batch 29: "Climb batch 29b, phase 4's eighth batch, landed 2026-11-10 at `a2be3e9e1`", with its review. Ground: the review, Part 4.
- C72, C73, C74, PLAN.md:72-74, forks F5, F6 and F7: moved to PLAN-history under "Phase 4. The switch-over". Ground: item 482 in (a), his words of 16:40 and 17:14 UTC on 2026-11-09; built by `a26e74f5c`.
- C75, PLAN.md:91, the phase's closing paragraph: rewritten to "Its first eight batches, climb batches 23 to 29b, landed".
- C76, PLAN.md, new line in phase 4 where the F5 to F7 lines stood, after the names line: the compiled fold of the one library's own numeral coercions, first checked when the compiled path reads the one library, `AnyIntegral`'s among them. Ground: the record, fork A1, way (ii), and section 2, "What the batch leaves out"; the review, Part 4, "New lines owed".
- C77, PLAN.md, new line in phase 4, after the line on rows 82 and 938 (`spawn`'s threads): row 971 and fork A6, with finding 1's weight. PLAN has no line on the switch-over's start-up work, which `owed.md` names as the place. So the line stands beside the other line on compiled tasks. Ground: the review, Findings, 1; row 971; the record, fork A6.
- C78, PLAN.md:136-138, item 75 and its group line: moved to PLAN-history under "Pavol's answers, in the order they are needed". Ground: item 448 in (a), his word of 17:28 UTC on 2026-11-09; built by `a26e74f5c`, rows 961 and 968 closed at `c6ef2f0b8`.
- C79, PLAN.md:142, item 76: rewritten to finding 3's list. Rows 961, 968 and 362 are closed and row 957 is narrowed. The rows that stand are 958, 962, 963, 966, 967, 446, 974, 442, 971 and 973. The ways are (a), (b) and (c), with no default on record, and the review recommends (a). Its group line stands as it was.
- C80, PLAN.md:146, item 77: "Review-queue item 487." added at its end.
- C81, PLAN.md:89, his answers before the switch-over: 476 and 482 taken out (both in (a)), so the list holds the queue's 27. Its tail now names item 77's queue item, 487, before the next batch, in place of item 75's.
- C85, PLAN.md, new group after item 77, "Before the next batch, raised by climb batch 29b's post-batch review", with item 78 (finding 1, queue item 488) and item 79 (finding 2, queue item 489).
- C86, review-queue: filed as item 487, in (b) "Numbers and numerals". Default: the probe's state, as landed.
- C87, review-queue: filed as item 488, in (b) "Code generation and the run time". Default: fork A6's, as landed, way (c).
- C88, review-queue: filed as item 489, in (b) "Numbers and numerals". Default: (b), as landed (rung A's decision 11).
- C89, C91, C92, C98, PLAN.md:719, :727, :729, :749 (the lines of items 443, 456, 458 and 478): moved to PLAN-history under "Climb batch 29, listed for his review". Ground: each item in (a), his confirmation of 16:02 UTC on 2026-11-09 (478 also his words of 13:22).
- C90, PLAN.md:721 (item 450): rewritten. The question is now one value for each instance at a place whose type names a type parameter. Since climb batch 29b, a place whose type names no type variable is one object. Ground: row 957 as rewritten; `compiler_tests/NumeralCoercionGenericTypeCompiled.test`.
- C93, PLAN.md:733 (item 462): "keeps `IntLiteral`" became "keeps its own numeral type, as `NaturalNumeral[\1,10,7\]`". Ground: row 963 as rewritten.
- C94, PLAN.md:741 (item 470): rewritten. Since the `=` pairs went, `u = 0` is `false` under walk too, so the question stands beside item 77. Ground: rows 966 and 973.
- C95, PLAN.md:745 (item 473): rewritten. The text now says that `Literal` is not built, the radix being `r` (`literals.tex:146-159`; fork A4).
- C96, C97, PLAN.md:746 and :747, review-routed.1 and .2 of climb batch 29: moved to PLAN-history. Ground for C96, built: row 968's repair by `a26e74f5c8`, the row closed at `c6ef2f0b80`, its reproducer `tests/NumeralStaticDesignWalk.fss` passing. Ground for C97, stale: the `=` pairs were deleted, so row 973 makes the respelling's `true` false. Item 495 now carries the messages of `NumeralTypesWalk.fss:41-42`.
- C99, PLAN.md:754-761, climb batch 29b's list: the paragraph was rewritten to the list's form, with the review's lines and items 77 to 79 named. The lines :756 to :761 were cut to one line each, with what is asked, the default and a pointer to items 490 to 495. Their full text is now in those items. The ledger citations `:570` and `:492` became rows 581 and 694. Lines :763 and :764 stand, as work lines.
- C100 to C105, review-queue: filed as items 490 (row 581) and 495 (walk's leftovers) in (c) "Numbers and numerals", 491 (the hierarchy) and 492 (the dates) in (c) "The specification's text", 493 (row 974) in (c) "Walk's checks at load", and 494 (row 694) in (c) "Overloading and the Meet Rule".
- C106, PLAN.md:762, review.3: moved to PLAN-history. This holds only if the entries writer's C21 and C25 to C50 land. When I wrote, FACTS.md was not yet changed in the worktree. If any of them does not land, the line comes back to PLAN with what is left.
- C107, PLAN.md:761, review.1: the review's additions are in item 495: the class comment of `Numerals` (`:46-57`), `bestMatchForNumerals` (`OverloadedFunction.java:2306-2309`), `FOrdinaryObject.seqv` at every `SEQV`, `CodeGen.java:6482`'s comment, and the messages of `NumeralTypesWalk.fss:41-42`. The PLAN line is cut to a pointer (C99).
- C108 to C111, PLAN.md, four new lines after :764, and review-queue items 496 (the forks) and 499 (the team's lines) in (c) "How batches run", 497 (the three readings) and 498 (walk's default by Java) in (c) "Numbers and numerals".
- C112, review-queue head: a sentence for this routing added to the prose. The counts are now 179 open, 70 consequential and 109 routine. "The next batch" is now 7 (6, 1): 487 to 489 were added, 449's line was rewritten (C113), and its prose names 449 and 487 to 489. A new group, "Climb batch 29b's defaults, for his review", holds 490 to 499: 10 (0, 10). The lines of 450 and 470 under "Before the switch-over" and of 462, 473 and 479 under climb batch 29's group follow their items. Theme counts: (b) "Numbers and numerals" 18, "Code generation and the run time" 9; (c) "Overloading and the Meet Rule" 4, "Walk's checks at load" 2, "Numbers and numerals" 14, "The specification's text" 6, "How batches run" 37.
- C113, item 449: rewritten to finding 3's scope, with the closed rows, the rows that stand and ways (a) to (c). Its "Needed by" stands.
- C114, item 450: its body was rewritten. A place whose type names no type variable is one object. A place at a type parameter is evaluated at each use, and fork A5 was not built. The `CodeGen.java:7189` citation is now the method's name, since A's hunks moved the line. Home: fork A5 added.
- C115, item 462: the title's "keeps `IntLiteral`" became "keeps its own numeral type, as `NaturalNumeral[\1,10,7\]`".
- C116, item 470: rewritten. `=/=` now follows walk's `=`, so the item stands beside item 487. Its other way no longer names an operand beside the `=` pairs, which are gone. Home: row 973 and item 487 added.
- C117, item 473: rewritten. The question is now `Literal[\v\]` not built. The other way, which waited on row 969's rewrite, is now `Literal[\v\]` declared, as the Working Draft has it. Its "Needed by" tail on row 969 was dropped, since that rewrite landed.
- C118, item 477: "the landed getters go with row 969" became "climb batch 29b's rung A deleted the landed getters, and row 969 is closed (`c6ef2f0b8`)", in the past tense.
- C119, item 475: "the landed forks go with row 969" became a statement that N7 to N10's landed forms went with row 969, and that N11 stays until the names batch's clean-up.
- C120, item 479: C6 is built by climb batch 29b (`a26e74f5c`), and rows 961 and 968 are closed. The title, Landed and cost lines were changed to match.
- C121, item 448 in (a): "The repair goes with the rebuild ..." became "built ... (`a26e74f5c`), rows 961 and 968 closed (`c6ef2f0b8`)". Its Home is now PLAN-history. Its decision and his words are unchanged.
- C122, items 443, 456, 458, 478 and 482 in (a): each Home now names PLAN-history, "Climb batch 29b's landing, 2026-11-10", under the heading where the line stood.
- C123, `map/spec-to-implementation.md:166`, `:288`, `:378`, `:382`, `:414`: each cell that names the prelude's `IntLiteral` or `FloatLiteral` now says that the type is gone since `a26e74f5c`. The map is a survey of the tree before it was changed, so I left its other figures alone.
- C124, `map/dormant-code.md:350`, `:483` and `:357`: repointed to `binary.tex:3000-3081` and `conversions-coercions.tex:275-281, 622-624, 852-859`.
- C82, C83, C84, C125 to C135 (writer none): left, as `owed.md` gives.

## The "Needed by" lines that I set

Each is marked "(set by the landing workflow)".
- 490, 491, 492, 493, 494, 497, 498, 499: no planned work.
- 496: before the switch-over, where fork A1's fold first reads the one library's coercions (`owed.md`, C108).

These are taken as the record or the review states them:
- 487, 488, 489: before the next batch (the review's step 1).
- 495: the next batch that edits walk's numerals or the prelude's `assert` (the line's default).

## The kinds that the workflow set

`owed.md` marks these as routine, set by the workflow: 490 (C100), 492 (C102), 493 (C103), 494 (C104), 495 (C105), 498 (C110), 499 (C111). The record states 491, 496 and 497 as routine (section 3, "None of the forks below is consequential"). The record or the review states 487, 488 and 489 as consequential.

## Items moved to (a)

None. Item 448 was already in (a) and stays there.

## Defaults that the record does not hold

- 498: no default on record. It landed as walk's own Java.
- 449: no default on record. It stays as it was.

## For the coordinator

- BOOT.md: its "Running" line for this record-landing. Its step 7, "The asks that stay": 449 is now re-scoped by finding 3, and 487 to 489 (item 77 and findings 1 and 2) come first, one per message. Its "Next" moves to the next batch by the review's step 5. Its morning-report line should name 487 to 489 and 449.
- HELD.md: nothing owed.
- One small change beyond C112's ground: the head's "The next batch" prose said "climb batch 29's gate read no crash" for 403. I changed it to climb batch 29b's gate, which also read no crash (the review, Confirmations).
- C106 depended on the entries writer's C21 and C25 to C50. `mech-1.md` shows that they apply, so the move holds.
