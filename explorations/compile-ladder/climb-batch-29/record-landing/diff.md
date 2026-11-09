<!-- The judge's account of climb batch 29's record-landing (7daf51fe8): one line per change that changed a file; 154 applied, 2 held. -->

# Climb batch 29's record-landing

## FACTS

- C1, F-32, the pass: `IntLiteral`'s 29 left with it. Ground: RECORD.md, "The count of the bindings".
- C4, C5, F-57, F-73, the pass: walk's rule reordered; row 506's clause no longer a third refusal. Ground: F-341; row 506.
- C6, C38, F-74, made false: walk's default by value is P-173's, not temporary; "F-74 is why P-76's walk half waits" cut. Ground: F-341, F-344.
- C9, F-118, the pass: its title bound to two `IntLiteral` values beyond `ZZ64`. Ground: row 328.
- C15, C26, F-151, F-304, the pass: how each landed, to history. Ground: the merged-diff review.
- C17, F-229, the pass: row 722 "the same cast in `openRange`". Ground: row 722.
- C21, F-262, the pass: title "a positive exponent from a negative one"; the fold "up to 4096 (F-339)". Ground: F-339.
- C23, F-278, the pass: climb batch 21's count and distance to history. Ground: F-53.
- C24, F-285, the pass: `PureList`'s subscript at `ZZ32` and `String`; lines re-anchored. Ground: rows.md, row 824.
- C32, F-341, the pass: the example `h = 0.5` for `h: QQ = 1/2`. Ground: F-339; the review, split 13.
- C40, F-122, made false: a numeral near a tie rounds "by P-173's tie reading (P-172; the guard ...)", not "against the specification". Ground: row 360 FIXED.
- C41, F-128, made false: "a value other than a numeral at a declared return (row 387; a numeral converts there, F-341)". Ground: row 387.
- C42, F-327, made false: 374; `:780-825`, `:401-427`. Ground: F-299.
- C43 to C46, F-173, F-272, F-78, F-334, stale: moved lines. Ground: the review, correction A.
- C47, F-240's history: a note on the load beside its timed stages; entry unchanged. Ground: the review, section 2.
- C48 to C71, the 24 entries that owed.md names, F-35 to F-332, stale: lines re-anchored. Ground: `git diff -U0 b430f9f42 7daf51fe8`.

## POSITIONS (his rule of 2026-10-31)

- C72, P-165, made false: "`RR64` and `NaturalNumeral` (P-174)" becomes "`RR64`, `NaturalNumeral` and `RadixPointNumeral` (P-174)"; "`numbers.tex:46-54`" becomes "`:56-73`"; decision unchanged. Ground: `FortressLibrary.fsi:489`; his "P-165 included" of 09:3x (`BOOT.md:10`); item 478.
- C73, P-171, stale: "`constant.tex:81-85`" becomes "`:118-122`"; decision unchanged. Ground: the review, correction B.
- C74, P-76, made false, cut only: "a numeral at an `NN32` or `NN64` binding (row 454), a numeral beyond `ZZ32`'s range at an `RR64` binding (row 443), and" goes; decision unchanged. Ground: rows 443, 454 FIXED, `3de571bac7`.
- C75, P-172, made false: " (row 862: the compiled path rounds two or three times)" goes; "a parameter and a field" becomes "a parameter, a field and a declared return type"; "(`FortressBuiltin.fsi:44`)" becomes "(`FortressBuiltin.fsi:44` at `b430f9f42`)"; decision unchanged. Ground: row 862 FIXED; F-341.
- C76, P-173, made false, cut only: " through `QQ`'s `=` pair" goes; decision unchanged. Ground: F-339; the review, split 13.
- C77, P-169, made false: "leave the library" becomes "left the library"; "are Fortress text over its `asZZ` (F-331)" becomes "left with it"; decision unchanged. Ground: `3de571bac7`; F-32, F-299.
- C78, P-154, made false, cut only: "; it waits until walk runs the checker (P-12) or row 364, walk's typing of a generic at its argument's run-time class, is fixed" goes; decision unchanged. Ground: row 364 FIXED, `12292add28` (F-344).
- C79 to C81, P-166, P-163, P-175, stale: "`.fss:565`, `.fsi:223`" becomes "`.fss:548`, `.fsi:200`" and "`:648`" "`:655`"; "`:665`" "`:598`"; "`CodeGen.java:6939`" "`:7062`"; decision unchanged. Ground: N's, F's and C's hunks.

## The ledger

- C86, row 893, stale: `changes.tex:4105-4110` becomes `:4291-4292`. Ground: the review, section 3.
- C87, row 961, stale: the fold at `:373-377 at 7daf51fe8`. Ground: F's hunks.
- C88, row 965, stale: `FortressLibrary.fsi:2707`. Ground: N's hunks.
- C89, row 579, made false: "Repair: `Integral`'s api states the three; a numeral's case is not measured." Ground: F-79; `3de571bac7`.

## PLAN

- Rewritten, stale: 17 (C90 to C93, C95, C105, C112, C115 to C117, C121 to C126, C140).
- Built: 13; moved, C98 to C104, C114, C120; cut to what stays, C96, C97, C113; climb batch 29's line, C94.
- Stale, moved: 2 (C119, row 360's line; C129, the list's first paragraph).
- Answered, moved: 8 (C130 to C134, C136 to C138).
- New: 10 (C106 to C111; C128, item 76; the lines of C165, C169, C177).
- Cut to a pointer: 26 (C127, C141 to C165). Cut to the open half: 2 (C135, C139).
- Beyond the sort, applied: phase 4's paragraph at seven batches (`:91`); the bare-numerals line moved, item 444 in (a).
- C93's "Next": the landing's updates; his answers on items 448, 449; then climb batch 30 by phase 4's order or finding 4's (a).

## The review queue

- C127, C128, items 448, 449, new, consequential: repair 3 against walk's negative numeral; the nine unplanned differences; no default on record; needed before the next batch.
- C141 to C164, items 450 to 473, new, default as landed unless named: 450 once per class (the component's class; the names batch); 451 exact radix fold; 452 the fold's environment (none; the next fold rung); 453 `run_exits_nonzero`; 454 `ZZ`'s `zero`; 455 `10^k`'s tie (`ZZ32` base; the switch-over); 456 N7's departure; 457 `RR32` operand; 458 P-168's exception (across both); 459 infinity (none; with 449); 460 `ee(5)` (way a; with item 35); 461 a size of 2^31 (none; with 449); 462 `typecase` selector (left; with 449); 463 written-only; 464 `'a' || 'b'` (left); 465 G3's name; 466 `FlatString` ilk (kept); 467 `LanguageTypeInstancesWalk`; 468 `typeOf` (none); 469 `Ratio` (none); 470 `=/=` (departure; the switch-over); 471 `Index` (way a); 472 row 966 filed; 473 `Literal[\v\]` (T's text).
- C165 to C177, items 474 to 486, new, as landed: forks of the batch (474), N (475), N1 and N3 (476, 477; the names batch), N4 (478), C (479), C4 (480), F (481), F5 to F7 (482; the names batch), G, S, T (483 to 485); the points for his sight (486).
- Consequential: 448 to 450, 455, 458 to 461, 463, 466, 468, 470, 471, 473, 476 to 478, 480, 482; the rest routine. A "Needed by" not named above: no planned work, set by the landing workflow.
- C135, C139, items 443, 447: cut to the open half, the landed C2 and F4; (b) to (c).
- C130 to C134, C136 to C138, items 438 to 442, 444 to 446, to (a): his defaults of 23:3x, built.
- C180, the head: 173 open, 72 consequential, 101 routine. C181 to C187, items 403, 406, 437, 224, 76, 372, 380: brought to the tree, open.

## INDEX and the other notes

- None changed.

## Held

- C7, F-79, the pass: past 600, it grows 1247 to 1268 by the cold reader's four getter names, which a pass does not owe; its title, broader than its body, stands.
- C39, F-169, made false: past 600, it grows 1238 to 1262; the owed sentence and callout explain about 7, "; F-79 names them" the rest; its `IntLiteral` sentence stands.

## For the curator

- Needs his word: items 448, 449 first; unchanged till he answers, P-174's `Literal[\v\]` (C82, 473), repair 3 (C83, 448), written-only (C84, 463), P-168 (C85, 458); P-165's list (C72, 478).
- POSITIONS changed under his rule, words above: P-76, P-154, P-163, P-165, P-166, P-169, P-171, P-172, P-173, P-175.
- Defaults the record does not hold: 448, 449, 452, 459, 461, 468, 469.
- "Needed by" set by the workflow: 443, 447, 450 to 481, 483 to 486; 448, 449, 482 as the review and the record state them.
- Kinds set by the workflow: consequential 450, 455, 459, 460, 461, 466, 468, 470, 471; routine 451 to 454, 456, 457, 462, 464, 465, 467, 469, 472, 486.
- To (a), "Answered by a decision of his": 438 to 442, 444 to 446, by his "Yeah. Option one." of 23:3x UTC on 2026-11-08 (`HELD.md:22`).

## For the coordinator

- owed.md's last section: the skill sentences; the POSITIONS to name; the asks; process findings; his 09:3x word in the boot note only; the routing's departures; `cites.md`.
- The routing report: boot note point 7 is items 476 to 478, PLAN `:72-75`; "Waiting on him" gains 448, 449, 473, 478, 458, 463.
- Held: F-79, F-169, for the next pass.
- Outside the sort: F-137's P-76 reading; F-276's folded example; P-76's "and the interpreter's library"; P-172's `1/2 = 0.5`.

## Checks

- reset: the six record files at fa630b65f.
- words-subset.py, the cut-only lines (P-76, P-173, P-154): pass.
- words-subset.py, POSITIONS lines: exit 1, information.
- record.py apply final.apply: pass, 54 blocks. apply.py final.rewrite: pass. No rows.add.
- record.py check --base fa630b65f: pass.
- ledger.py check: pass. ledger.py landing-check b430f9f42: pass.
- check-index.sh: pass.
- plan-moves.py: pass; LOOK `PLAN.md:85` (C113) and `:205` (C118) kept.
- queue-check.py: pass; 39 new, 173 open.
- lengths.py: pass; 8 past 600 grew, each by its owed clause.
- git diff --stat fa630b65f: 9 files.

## Next

- The two commits: the workflow result's `land.commits` gives them as landed on `main`.
- `Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/orientation/orientation.js', args: { mode: 'update', out: '/home/user/fortress/explorations/compile-ladder/climb-batch-29/orientation/', stream: 'orientation-b29', facts: ['F-32', 'F-35', 'F-44', 'F-53', 'F-55', 'F-57', 'F-58', 'F-63', 'F-73', 'F-74', 'F-78', 'F-79', 'F-84', 'F-85', 'F-102', 'F-118', 'F-122', 'F-123', 'F-128', 'F-131', 'F-137', 'F-138', 'F-140', 'F-151', 'F-168', 'F-170', 'F-173', 'F-175', 'F-228', 'F-229', 'F-240', 'F-249', 'F-253', 'F-262', 'F-263', 'F-268', 'F-272', 'F-276', 'F-278', 'F-279', 'F-283', 'F-285', 'F-286', 'F-299', 'F-302', 'F-303', 'F-304', 'F-305', 'F-306', 'F-307', 'F-311', 'F-312', 'F-315', 'F-326', 'F-327', 'F-328', 'F-330', 'F-331', 'F-332', 'F-334', 'F-339', 'F-340', 'F-341', 'F-342', 'F-343', 'F-344', 'F-345', 'F-346', 'P-76', 'P-154', 'P-163', 'P-165', 'P-166', 'P-169', 'P-171', 'P-172', 'P-173', 'P-175'] } })`
