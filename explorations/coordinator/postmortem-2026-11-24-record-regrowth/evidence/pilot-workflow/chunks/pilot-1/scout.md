# Scout, chunk pilot-1 (FACTS, base 2d1614aaee)

## F-374
Title: "A compiled object's `var` field lives in a cell" (FACTS line 284)
Files: Library/Lazy.fss ok; compile-ladder/rung-atomic-expr-field/REPORT.md ok
Rows (status at HEAD): 112 NEGATIVE-VERIFIED, 319 FIXED, 322 NEGATIVE-VERIFIED, 641 NEGATIVE-BOUNDED, 875 FIXED, 1043 NEGATIVE-VERIFIED
Detail (headings): compile-ladder/rung-atomic-expr-field/REPORT.md "What changed and why" FOUND | compile-ladder/rung-atomic-expr-field/REPORT.md "The bytecode" FOUND
Title written (-S): none | last -S: none
Line first/last changed (-G): 5a076e9bc1 2026-11-17 Compile an atomic expression, and keep an object's var field in a ce | 1e9b2cf9c4 2026-11-17 Record: climb batch 31b's points for a writer, items 513, 514, 518,  (3 commits)
History "- F-374" texts: 2; sizes 1596-1746; first 7961 (1596 ch, 2026-11-17 07:11Z); last 8538 (1746 ch, 2026-11-17 17:58Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-351
Title: "A compiled transaction validates itself and every ancestor, and" (FACTS line 30)
Files: runtimeSystem/Transaction.java ok; compile-ladder/rung-compiled-transaction/REPORT.md ok; compiler/codegen/CodeGen.java ok; runtimeSystem/BaseTask.java ok
Tests: AtomicNestedSameBodyCompiled ok; NestedAtomicAbortCompiled ok; AtomicNestedViewCompiled ok; AtomicSharedReadsCompiled ok; AtomicThrowRevertsCompiled ok; AtomicNestedReadsKeptCompiled ok; NestedTryInnerCatch ok; ArrayStoreJUTest ok
Rows (status at HEAD): 984 NEGATIVE-VERIFIED
Detail (headings): compile-ladder/rung-compiled-transaction/REPORT.md "What changed and why" FOUND
Title written (-S): f78da2650a 2026-11-10 Record landing of climb batch 30: FACTS, POSITIONS and the ledger br | last -S: f78da2650a 2026-11-10 Record landing of climb batch 30: FACTS, POSITIONS and the ledger br
Line first/last changed (-G): 594da41299 2026-11-10 The compiled transaction: a block's own writes, the sets its threads | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (10 commits)
History "- F-351" texts: 7; sizes 1768-1894; first 7341 (1783 ch, 2026-11-10 13:49Z); last 9546 (1894 ch, 2026-11-23 16:08Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-279
Title: "Under walk an `Array2` or `Array3` based above zero" (FACTS line 318)
Files: Library/FortressLibrary.fss ok; compile-ladder/rung-slices-list-equality/REPORT.md ok
Tests: Array2SliceAtNonzeroBase ok; Array3SliceAtNonzeroBase ok; XXXArray2ShiftedSlice ok
Rows (status at HEAD): 808 NEGATIVE-VERIFIED
Detail (headings): compile-ladder/rung-slices-list-equality/REPORT.md ok
Title written (-S): none | last -S: none
Line first/last changed (-G): ff19305cca 2026-10-23 Array2 and Array3 slices based above zero read their own elements, a | caa5363d72 2026-11-17 Fold the review's corrections (8 commits)
History "- F-279" texts: 7; sizes 766-766; first 4493 (766 ch, 2026-10-24 03:37Z); last 8406 (766 ch, 2026-11-17 10:04Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-157
Title: "An array is a trait with `get` and `put`," (FACTS line 313)
Files: reviews/c4-flatarrays-review.md ok; run-c4/probes/vocabulary/diag-override.md ok
Rows (status at HEAD): 298 POSITIVE-VERIFIED, 299 POSITIVE-VERIFIED
Detail (headings): reviews/c4-flatarrays-review.md ok | run-c4/probes/vocabulary/diag-override.md "Result" FOUND
Title written (-S): 8ab10d9de3 2026-09-15 Coordinator's knowledge base: explorations/coordinator/ (README, FAC | last -S: f29f7273c7 2026-10-13 FACTS: chunk F1 consolidated, F-7 to F-29, F-97 to F-114 and F-203
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | e06bd068e7 2026-10-22 FACTS: clarity chunks f13 to f16 applied as judged (nine entries hel (3 commits)
History "- F-157" texts: 2; sizes 592-641; first 1403 (641 ch, 2026-10-13 18:57Z); last 3889 (592 ch, 2026-10-22 12:13Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-63
Title: "The one library's api declares `String`'s `split` and `splitWithOffsets`" (FACTS line 68)
Files: Library/FortressLibrary.fsi ok; compile-ladder/rung-library-defects/REPORT.md ok
Rows (status at HEAD): none
Detail (headings): compile-ladder/rung-library-defects/REPORT.md "Summary" FOUND | compile-ladder/rung-library-defects/REPORT.md "Decisions" FOUND | compile-ladder/rung-library-defects/REPORT.md "Defects and their homes" FOUND
Title written (-S): 4feafe6fae 2026-10-13 FACTS: the checker section's second slice consolidated to what a dec | last -S: 4feafe6fae 2026-10-13 FACTS: the checker section's second slice consolidated to what a dec
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (13 commits)
History "- F-63" texts: 10; sizes 486-1265; first 867 (933 ch, 2026-10-13 18:16Z); last 8340 (1265 ch, 2026-11-17 10:04Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-286
Title: "The api's `String` writes `abstract` on every member that" (FACTS line 131)
Files: Library/FortressLibrary.fsi ok; Library/FortressLibrary.fss ok; Library/List.fsi ok; ProjectFortress/tests/StringMembersPromisedWalk.fss ok; compile-ladder/rung-string-members/REPORT.md ok
Rows (status at HEAD): 607 NEGATIVE-VERIFIED
Detail (headings): compile-ladder/rung-string-members/REPORT.md ok
Title written (-S): none | last -S: none
Line first/last changed (-G): c8e013fafa 2026-10-24 String's api writes abstract on its bodyless and undeclared members, | caa5363d72 2026-11-17 Fold the review's corrections (7 commits)
History "- F-286" texts: 6; sizes 1146-1389; first 4797 (1389 ch, 2026-10-30 01:32Z); last 8370 (1146 ch, 2026-11-17 10:04Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: [88, 129]; POSITIONS lines: none

## F-297
Title: "The compiled export check asks the component to declare" (FACTS line 140)
Files: scala_src/typechecker/ExportChecker.scala ok; compile-ladder/rung-abstract-declared/JUDGE.md ok; compile-ladder/rung-abstract-declared/REPORT.md ok
Rows (status at HEAD): 841 NEGATIVE-VERIFIED, 842 NEGATIVE-VERIFIED
Detail (headings): compile-ladder/rung-abstract-declared/REPORT.md ok | compile-ladder/rung-abstract-declared/JUDGE.md ok
Title written (-S): 031c38bbcf 2026-10-23 The export check matches an api's members by name and header and rea | last -S: cc47b637d8 2026-10-30 The export check counts every api member again, and the library's co
Line first/last changed (-G): cc47b637d8 2026-10-30 The export check counts every api member again, and the library's co | f470e902b9 2026-11-17 Fold the review's corrections (2 commits)
History "- F-297" texts: 1; sizes 1680-1680; first 8734 (1680 ch, 2026-11-17 22:28Z); last 8734 (1680 ch, 2026-11-17 22:28Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: [129]; POSITIONS lines: none

## F-64
Title: "The compiled checker refuses every type that an api" (FACTS line 69)
Files: compile-ladder/rung-library-defects/REPORT.md ok
Rows (status at HEAD): 354 NEGATIVE-VERIFIED
Detail (headings): compile-ladder/rung-library-defects/REPORT.md "Defects and their homes" FOUND
Title written (-S): a7ced6764e 2026-09-22 The five plain api defects of the interpreter library repaired | last -S: 9c3a9fe03a 2026-11-24 FACTS: chunk checker-1 consolidated by the method of 2026-10-13
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (5 commits)
History "- F-64" texts: 2; sizes 540-1253; first 873 (1253 ch, 2026-10-13 18:16Z); last 2999 (540 ch, 2026-10-22 11:56Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: [68, 77]; POSITIONS lines: none

## F-240
Title: "The checker's count stage takes about 65 s and" (FACTS line 111)
Files: compile-ladder/climb-batch-36/gate/distance.txt ok; reviews/batch-16-review.md ok; reviews/batch-17-review.md ok; reviews/batch-21b-review.md ok; reviews/batch-22-review.md ok; reviews/batch-22c-review.md ok; reviews/batch-23-review.md ok; reviews/batch-24-review.md ok; reviews/batch-25-review.md ok; reviews/batch-26-review.md ok; reviews/batch-27-review.md ok; reviews/batch-31-review.md ok; reviews/batch-32-review.md ok
Rows (status at HEAD): none
Detail (headings): reviews/batch-31-review.md ok | reviews/batch-32-review.md ok | reviews/batch-27-review.md ok | reviews/batch-26-review.md ok | reviews/batch-25-review.md ok | reviews/batch-24-review.md ok | reviews/batch-23-review.md ok | reviews/batch-22c-review.md ok | reviews/batch-22-review.md ok | reviews/batch-21b-review.md ok | reviews/batch-17-review.md ok | reviews/batch-16-review.md ok
Title written (-S): 7a58250bfe 2026-10-16 FACTS and POSITIONS after climb batch 16's landing and the probes of | last -S: d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation
Line first/last changed (-G): 7a58250bfe 2026-10-16 FACTS and POSITIONS after climb batch 16's landing and the probes of | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (37 commits)
History "- F-240" texts: 34; sizes 595-2366; first 2617 (595 ch, 2026-10-17 19:33Z); last 9918 (2202 ch, 2026-11-24

## F-111
Title: "The checker-count and distance stages read only the compiler's" (FACTS line 201)
Files: coordinator/tools/checker-count/WorldFlip.java ok; compiler/phases/PhaseOrder.java ok; coordinator/tools/distance/DistanceMulti.java ok; coordinator/tools/distance/run.sh ok
Rows (status at HEAD): none
Detail (headings): none
Title written (-S): d1c53a36dc 2026-09-29 FACTS consolidated before climb batch 7b: batch 6.5b's gate and the  | last -S: 16bbe6072d 2026-10-22 FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (8 commits)
History "- F-111" texts: 5; sizes 603-1538; first 1775 (1538 ch, 2026-10-13 19:03Z); last 4937 (1181 ch, 2026-10-30 05:58Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-43
Title: "The overloading checker's memo hides some errors, and which" (FACTS line 48)
Files: scala_src/typechecker/OverloadingChecker.scala ok; perf-probes/nat/triage.md ok
Rows (status at HEAD): none
Detail (headings): none
Title written (-S): 3072a043a3 2026-10-13 FACTS: the checker section's first slice consolidated to what a deci | last -S: 3072a043a3 2026-10-13 FACTS: the checker section's first slice consolidated to what a deci
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (6 commits)
History "- F-43" texts: 3; sizes 312-734; first 993 (734 ch, 2026-10-13 18:38Z); last 3327 (312 ch, 2026-10-22 12:03Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-179
Title: "Tasks and transactions are implemented twice, in `interpreter/evaluator/` and" (FACTS line 351)
Files: coordinator/map/modules-and-phases.md ok
Rows (status at HEAD): 302 FIXED
Detail (headings): coordinator/map/modules-and-phases.md "B.11 The runtime" FOUND
Title written (-S): 8765fd78e1 2026-09-16 Territory map: synthesis (path in dependency order, loop, touch-this | last -S: 8765fd78e1 2026-09-16 Territory map: synthesis (path in dependency order, loop, touch-this
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | 9ef0b13a8a 2026-10-13 FACTS: chunk F4 consolidated, F-150 to F-186 (2 commits)
History "- F-179" texts: 1; sizes 210-210; first 1511 (210 ch, 2026-10-13 18:57Z); last 1511 (210 ch, 2026-10-13 18:57Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-102
Title: "An `XXX*.fss` in the interpreter corpus is a gated" (FACTS line 193)
Files: tests/unit_tests/FileTests.java ok; ProjectFortress/tests/XXXImportImportCollision.fss ok; .claude/skills/fortress-repo/references/tests-writing.md ok
Rows (status at HEAD): none
Detail (headings): none
Title written (-S): none | last -S: none
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (7 commits)
History "- F-102" texts: 4; sizes 477-1068; first 1721 (1068 ch, 2026-10-13 19:03Z); last 8770 (783 ch, 2026-11-17 22:28Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-103
Title: "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot" (FACTS line 194)
Files: compile-ladder/rung-tryatomic/REPORT.md ok; .claude/skills/fortress-repo/references/tests-writing.md ok
Rows (status at HEAD): none
Detail (headings): compile-ladder/rung-tryatomic/REPORT.md "The measured defect, and its home" FOUND
Title written (-S): none | last -S: none
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (5 commits)
History "- F-103" texts: 2; sizes 557-1077; first 1733 (1077 ch, 2026-10-13 19:03Z); last 3555 (557 ch, 2026-10-22 12:06Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: [193]; POSITIONS lines: none

## F-104
Title: "A thrown `CompilerError` takes a third path through the" (FACTS line 195)
Files: compile-ladder/climb-batch-2/REPAIR-review.md ok; .claude/skills/fortress-repo/references/compiler.md ok
Rows (status at HEAD): none
Detail (headings): compile-ladder/climb-batch-2/REPAIR-review.md ok
Title written (-S): none | last -S: none
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (5 commits)
History "- F-104" texts: 2; sizes 568-884; first 1739 (884 ch, 2026-10-13 19:03Z); last 3561 (568 ch, 2026-10-22 12:06Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-383
Title: "Walk's harness counts a static error that a phase" (FACTS line 210)
Files: tests/unit_tests/FileTests.java ok; compile-ladder/rung-typecase-unbound-arm/REPORT.md ok; ProjectFortress/tests/TypecaseUndefinedArmWalk.test ok
Rows (status at HEAD): none
Detail (headings): compile-ladder/rung-typecase-unbound-arm/REPORT.md "10. Decisions" FOUND
Title written (-S): 18240c9d85 2026-11-17 A typecase arm at a name that no declaration defines is refused on b | last -S: d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation
Line first/last changed (-G): 18240c9d85 2026-11-17 A typecase arm at a name that no declaration defines is refused on b | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (4 commits)
History "- F-383" texts: 1; sizes 526-526; first 8902 (526 ch, 2026-11-18 00:16Z); last 8902 (526 ch, 2026-11-18 00:16Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## F-108
Title: "The interpreter's overload-ambiguity message names its two declarations in" (FACTS line 199)
Files: compile-ladder/rung-wrap-operators/JUDGE.md ok
Rows (status at HEAD): none
Detail (headings): none
Title written (-S): eb83706de5 2026-09-26 Rung D's notes folded: rows 403, 348 and 379, two FACTS lines, the h | last -S: d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation
Line first/last changed (-G): a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories re | d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation (8 commits)
History "- F-108" texts: 5; sizes 504-909; first 1763 (909 ch, 2026-10-13 19:03Z); last 9762 (878 ch, 2026-11-24 01:48Z)
History lines with the title words under other numbers/prose: none
Cited in FACTS lines: none; POSITIONS lines: none

## The sorting map's lines for these entries

Data from the sorting map, /home/user/fortress-pilot/explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-map/map.json (MAP.md beside it, sections 3 to 5), and the claims files beside it. For each entry: the map's line, which gives its disposition; the subjects of its claims, each with the entry that owns it; where each part goes; its claims as the claims file numbers them. Each other entry is marked as in this chunk or not.

### F-374
- The map's line: F-374 · split: keeps "the compiled runtime: the cells of mutable variables and var fields" (owner) · parts: "the compiled runtime: transactions and atomic expressions" (7, 8) to F-351 · out: history 4; detail 11 · defects: row 641 (5); row 1043 (8); row 112 (10).
- Shape: several subjects. Disposition: split.
- Subjects of its claims: R-cells "the compiled runtime: the cells of mutable variables and var fields", owner F-374 (claims 1, 2, 3, 5, 6, 9, 10, 11, 12, 13); R-tx "the compiled runtime: transactions and atomic expressions", owner F-351 (claims 4, 7, 8).
- A part goes to another entry: claims 7, 8, subject "the compiled runtime: transactions and atomic expressions", owner F-351, to F-351 (in this chunk).
- Claims to move out of the entry, by kind: history 4; detail 11; tests 12.
- Defect: claim 5, ledger row 641.
- Defect: claim 8, ledger row 1043.
- Defect: claim 10, ledger row 112.
- Group of overlap O2, "The transaction check on a mutable local": the check at each use of a mutable local in a loop (row 641); with F-12 (not in this chunk, chunk runtime), F-40 (not in this chunk, chunk sizes), F-358 (not in this chunk, chunk runtime).
- Group of overlap O19, "Exits and transactions": an exit out of an atomic block (rows 1041, 322); with F-351 (in this chunk), F-373 (not in this chunk, chunk runtime), F-401 (not in this chunk, chunk runtime).
- Group of overlap O79, "Equality": =/=, SEQV, Number's equality; with F-131 (not in this chunk, chunk integers), F-280 (not in this chunk, chunk integers), F-324 (not in this chunk, chunk integers), F-326 (not in this chunk, chunk integers), F-328 (not in this chunk, chunk natives), F-341 (not in this chunk, chunk numerals), F-343 (not in this chunk, chunk numerals), F-366 (not in this chunk, chunk numerals).
- Sent here by the map: claim 6 of F-12 (not in this chunk, chunk runtime), subject "the compiled runtime: the cells of mutable variables and var fields", owner F-374.
- Its claims, from claims-landed-3.md, word for word:

~~~
## F-374 "A compiled object's `var` field lives in a cell that the object holds, and an atomic expression is its body in an atomic block"

Claims:
1. On the compiled path a `var` value parameter or `var` field of an object is a `MutableFValue` cell in a `public final` JVM field, made by the constructor — the code generator: var fields — property
2. Each read and write checks `BaseTask.inATransaction()` and goes through the transaction or the cell, by the code of a top-level `var`, and a loop body or function expression in the object's method captures the cell — the code generator: var fields — property
3. The batch's planner chose the cell as a default, and the curator has not decided it — the code generator: var fields — choice
4. So an `atomic` block tracks a `var` field (row 319, fixed) — the compiled runtime: transactions — history
5. Every access of a `var` field pays the transaction check, outside `atomic` too (row 641) — the code generator: var fields — defect (row 641)
6. A field without `var` holds its value and has no check — the code generator: var fields — property
7. `atomic e` is compiled by `CodeGen.forAtomicBlock` on the block that holds `e` (row 875, fixed), with the block's limits (row 322) — the code generator: atomic expressions — property
8. A numeral as an atomic expression's value at a place of declared type is refused or fails verification, since the checker carries no declared type into it (row 1043) — the checker: atomic expressions — defect (row 1043)
9. So a change of the transaction's variable code reaches fields with no second edit, and a new kind of nested context must capture a var field's cell as it does a top-level `var`'s — the code generator: var fields — property
10. A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), is not strictly equivalent to another built alike: `V(1) === V(1)` is `false` — the code generator: var fields — defect (row 112)
11. The one library declares one such object, `Lazy` (`Library/Lazy.fss:18`) — the library: value objects with var fields — detail
12. Tests: three compiled tests — the code generator: var fields — tests
13. Detail in `rung-atomic-expr-field/REPORT.md` — the code generator: var fields — pointer

Overlap:
- 1, 2, 6, 9: F-353 (`MutableFValue` among the classes named against a prelude class); F-377 ("An assignment from outside an object to its `var` field passes the value at the field's type", F-406). Searched [MutableFValue], [`var` field]. Skill: `compiler.md:103`, `SKILL.md:124`.
- 3: none found. Searched [chose the cell].
- 5: F-358 ("the transaction check and the box on the accumulator (F-12, row 641)"); F-12 (the transaction check on a top-level `var` accumulator). Searched [row 641].
- 7: F-373 (row 322 on a label block). Searched [row 875], [row 322].
- 8: none found. Searched [row 1043].
- 10: F-330 (a worker avoided a buffer in a `var` field). Searched [row 112], [Lazy]. Skill: `compiler.md:152` states 10.

Checks: sound as checked; rows 319 and 875 FIXED; rows 112, 322, 1043 NEGATIVE-VERIFIED; row 641 NEGATIVE-BOUNDED; agree.

Shape: several subjects (the code generator: var fields; the code generator: atomic expressions; the checker: atomic expressions), with a planner's choice.
Title: two facts joined by "and", the `var` field's cell and `atomic e`; the body serves both, and adds the `value`-object equivalence gap.
~~~

### F-351
- The map's line: F-351 · split: keeps "the compiled runtime: transactions and atomic expressions" (owner) · parts: "the code generator: label and exit" (6) to F-373 · out: detail 8 · defects: row 984 (7) · check: cites a thing that is gone.
- Shape: one subject. Disposition: split.
- Subjects of its claims: R-tx "the compiled runtime: transactions and atomic expressions", owner F-351 (claims 1, 2, 3, 4, 5, 7, 8, 9); G-exit "the code generator: label and exit", owner F-373 (claims 6).
- A part goes to another entry: claim 6, subject "the code generator: label and exit", owner F-373, to F-373 (not in this chunk, chunk runtime).
- Claims to move out of the entry, by kind: detail 8; tests 9.
- Defect: claim 7, ledger row 984.
- Today's checks: cites a thing that is gone or moved.
- Group of overlap O19, "Exits and transactions": an exit out of an atomic block (rows 1041, 322); with F-373 (not in this chunk, chunk runtime), F-374 (in this chunk), F-401 (not in this chunk, chunk runtime).
- Sent here by the map: claim 4 of F-333 (not in this chunk, chunk natives), subject "the compiled runtime: transactions and atomic expressions", owner F-351.
- Its claims, from claims-exec.md, word for word:

~~~
### F-351, "A compiled transaction validates itself and every ancestor ..."

1. Claims
   - C1. A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names. Subject: the compiled runtime: transactions. Kind: property.
   - C2. A transaction records no read of its own write, an ancestor's write with that write, a committed value with that value, an empty array element with a mark. Subject: the compiled runtime: transactions. Kind: property.
   - C3. Validation runs at a read after the global lock moved and at a commit that missed the lock. Subject: the compiled runtime: transactions. Kind: property.
   - C4. The block's handler ends the transaction, restarts it for an abort naming it or none, commits on a `LabelExit` and throws it on (F-401), and throws all else after handing reads to the parent. Subject: the compiled runtime: transactions. Kind: property.
   - C5. A nested commit hands its parent its reads and writes. Subject: the compiled runtime: transactions. Kind: property.
   - C6. The exception-table entry of a block or `try` follows its body, so a nested one is taken first. Subject: the code generator: exception tables. Kind: property.
   - C7. A nested block sees a plain write by another thread that runs its outer block (row 984). Subject: the compiled runtime: transactions. Kind: defect (row 984).
   - C8. Source lines in `Transaction.java`, `BaseTask.java`, `CodeGen.java`. Kind: detail.
   - C9. Nine tests. Kind: tests.
2. Overlaps: C1-C5: none found for validation (searched "validates", "Transaction.java"). C4: F-401 [exit commits the block's transaction, `leaveTransaction`], F-373 [`LabelExit`]. C6: none found (searched "exception-table"). C7: none found (searched "row 984"). F-374 [atomic expression is its body in an atomic block] touches the subject.
3. Checks: cites a thing that is gone or moved: `CodeGen.java:2148-2180` (`forAtomicBlock` now `:2142`/`:2155`), `forTry` now `:2485`, `ArrayStoreJUTest` not under `tests/` (stale; scout). Rest sound (row 984 agrees).
4. Shape: one subject (transactions) with C6 beside it. Title matches; the body serves it.
~~~

### F-279
- The map's line: F-279 · rewritten in place: "the library: array views and slices" (owner F-157) · out: detail 2 · defects: row 808 (3, 4).
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: L-views "the library: array views and slices", owner F-157 (claims 1, 2, 3, 4, 5, 6).
- Claims to move out of the entry, by kind: detail 2; tests 5.
- Defect: claim 3, ledger row 808.
- Defect: claim 4, ledger row 808.
- Its claims, from claims-arrays.md, word for word:

~~~
## F-279, "Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, except a shifted `Array2`."

- Claims:
  1. [property] {walk: array slices} `Array2.subarray` and `Array3.subarray` hand their 0-based views the offset less the base, and `Array3`'s `[:]` passes its base, as `Array1`'s do.
  2. [detail] {walk: array slices} `FortressLibrary.fss:2999`, `:3401`, `:3380`, `:2711`, `:3083`.
  3. [defect] {walk: array slices} `SubArray2`'s `subarray` subtracts the output base, so a slice of a shifted `Array2` reads the wrong elements (row 808).
  4. [defect] {walk: array slices} A shift of a slice, column, row or shifted `Array2` ends in `ArrayIndexOutOfBoundsException` (row 808).
  5. [tests] {walk: array slices} `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`.
  6. [pointer] Detail in `rung-slices-list-equality/REPORT.md`.
- Overlaps:
  - 1: F-35, F-68 (`subarray`'s size parameters, another subject) [subarray].
  - 3, 4: none found [row 808, SubArray2].
- Checks: all line cites hold; tests found; row 808 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: one subject (walk: array slices).
- Title: states the rule and its exception; the body serves it.
~~~

### F-157
- The map's line: F-157 · rewritten in place: "the library: array views and slices" (owner) · out: history 3 · defects: row 298 (4); row 299 (5).
- Shape: several subjects. Disposition: rewritten.
- Subjects of its claims: L-views "the library: array views and slices", owner F-157 (claims 1, 2, 3, 4, 5, 6).
- Claims to move out of the entry, by kind: history 3.
- Defect: claim 4, ledger row 298.
- Defect: claim 5, ledger row 299.
- Its claims, from claims-arrays.md, word for word:

~~~
## F-157, "An array is a trait with `get` and `put`, and a view is an object that implements it over other storage ..."

- Claims:
  1. [property] {the library: array views} An array is a trait with `get` and `put`, and a view is an object that implements it over other storage, as `TransposedMatrix` is.
  2. [property] {walk: array views} Under walk a subtype of `Matrix` that overrides `mul` gets its own product through the library's juxtaposition and `DOT`, with no api line.
  3. [history] {walk: array views} The override was measured under walk only.
  4. [defect] {the library: array views} At `b176a4b79`, the row slice `m[i,:]` took five times as long as a six-line user view (row 298).
  5. [defect] {the library: array views} The library's product with a plain `Matrix` diagonal view took 13 times a row-scaling operator at n = 16, and 58 to 63 times at n = 64 (row 299, which says 54).
  6. [pointer] Detail in `reviews/c4-flatarrays-review.md` and `run-c4/probes/vocabulary/diag-override.md`.
- Overlaps:
  - 1: F-90 (names `TransposedMatrix` in the family) [TransposedMatrix]; none for the idiom.
  - 2: F-90 (`Matrix`'s `mul`) [mul`]; none for the override.
  - 4, 5: none found [row 298, row 299].
- Checks: commit and rows found; rows 298, 299 POSITIVE-VERIFIED; the entry notes row 299's 54 (scout 4). No stale finding.
- Shape: several subjects: the library: array views; walk: array views.
- Title: states the idiom; the timings (4-5) answer what views cost, another question.
~~~

### F-63
- The map's line: F-63 · split: keeps "the library: the api's members against its components" (owner F-286) · parts: "the checker: comprises clauses and closed traits" (8) to F-64 · out: history 5, 7 · check: false today, cites a thing that is gone, unsettled.
- Shape: mostly history or plan. Disposition: split.
- Subjects of its claims: L-apialign "the library: the api's members against its components", owner F-286 (claims 1, 2, 3, 4, 5, 6, 7); C-compr "the checker: comprises clauses and closed traits", owner F-72 (claims 8).
- A part goes to another entry: claim 8, subject "the checker: comprises clauses and closed traits", owner F-72, to F-64 (in this chunk).
- Claims to move out of the entry, by kind: history 5, 7.
- Today's checks: cites a thing that is gone or moved; false today; unsettled, to investigate.
- Group of overlap O7, "The ellipsis comprises": the refusal of a type that extends a trait whose comprises has ... (row 354); with F-64 (in this chunk), F-72 (not in this chunk, chunk comprises).
- Group of overlap O56, "The export check and abstract members": the rule, rows 834, 839, 842, the abstract members counted; with F-83 (not in this chunk, chunk arrays), F-281 (not in this chunk, chunk overloading), F-282 (not in this chunk, chunk export), F-286 (in this chunk), F-287 (not in this chunk, chunk export), F-288 (not in this chunk, chunk export), F-294 (not in this chunk, chunk export), F-297 (in this chunk).
- Its claims, from claims-checker-2.md, word for word:

~~~
## F-63 "The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract"

Claims:
1. The api declares `String`'s `split` and `splitWithOffsets` once, abstract. *the library: api declarations* | property
2. `List` redeclares no `zip`; the inherited `ZeroIndexed.zip` serves. *the library: api declarations* | property
3. `Condition.map` returns `Condition[\G\]`, the component's type. *the library: api declarations* | property
4. `QQ` is closed by `comprises { ... }`, since its one value type `Ratio` is private. *the library: api declarations* | property
5. In their earlier forms the pair and `List`'s `zip` made the checker refuse the api; the other repairs tried read the same count. *the library: api declarations* | history
6. The forms kept follow the specification's export rules (the report's Decisions). *the library: api declarations* | choice
7. The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check, and no test gates the edit. *the library: api declarations* | history
8. No api-declared type extends `QQ`, so F-64's refusal does not arise. *the checker: ellipsis comprises* | property

Overlap:
- 1: F-286 (the api writes `abstract` on `split`, `splitWithOffsets`), F-297 (the 12 members the component lacked, among them both). Searched "splitWithOffsets".
- 2: none found (F-396 names `zip` for another point). Searched "zip".
- 3: none found. Searched "Condition.map", "Condition[\G\]".
- 4, 8: F-64 (row 354), F-72. Searched "comprises { ... }", "row 354".
- 6: none found. Searched "export rules".

Checks: claim 1's reason (the component defines neither `split`) is stale since `cc47b637d8`, the form holds: false today (SC, F-63, pilot). "No test gates that edit" stale in part: false today (SC, F-63). The report's `QQ` clause differs from the tree: cites a thing that is gone (SC). The ground of the `Condition.map` error (override rule or export check) is unsettled (SC). The referents of claims 5 and 7 are not in the entry: unsettled (SC). The cited line of `trait Condition` moved, now `:1008`: cites a thing that is gone (SC; S2). Same claim as F-286 and F-297, rows 355 and 357 not named: unsettled (SC). Rows 355 and 357 are open (SC, F-63).

Shape: several subjects inside the library's api (four separate repairs) and mostly history. Title: four api forms; the body tells how each came about, which serves the title only in part.
~~~

### F-286
- The map's line: F-286 · rewritten in place: "the library: the api's members against its components" (owner) · cut: copied gate value (4) · defects: row 607 (5) · check: cites a thing that is gone.
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: L-apialign "the library: the api's members against its components", owner F-286 (claims 1, 2, 3, 5, 6, 7); H-values "the gate: the values of the checker count and the distance", owner F-53 (claims 4).
- Claims to move out of the entry, by kind: tests 6.
- Defect: claim 5, ledger row 607.
- Today's checks: cites a thing that is gone or moved.
- Group of overlap O56, "The export check and abstract members": the rule, rows 834, 839, 842, the abstract members counted; with F-63 (in this chunk), F-83 (not in this chunk, chunk arrays), F-281 (not in this chunk, chunk overloading), F-282 (not in this chunk, chunk export), F-287 (not in this chunk, chunk export), F-288 (not in this chunk, chunk export), F-294 (not in this chunk, chunk export), F-297 (in this chunk).
- Sent here by the map: claims 5, 6, 7 of F-282 (not in this chunk, chunk export), subject "the library: the api's members against its components", owner F-286.
- Sent here by the map: claim 2 of F-287 (not in this chunk, chunk export), subject "the library: the api's members against its components", owner F-286.
- Its claims, from claims-checker-4.md, word for word:

~~~
## F-286 "The api's `String` writes `abstract` on every member that its component's trait leaves without a body"

1. The api's `String` writes 14 members `abstract`, and the component's trait declares all 14 without a body. — *the library: export alignment*; kind: **property**; overlap: F-282 ("the 66 members written `abstract`, `String`'s nine among them"), F-297 (seven of the same members), F-63 (`split` and `splitWithOffsets` abstract); checks: `.fsi:2583`, `.fss:4596` found, ranges not walked (scout).
2. `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14 under walk. — *the library: string objects*; kind: **property**; overlap: none found (searched `StringMembersPromised`); checks: test found (scout).
3. `String`'s `excludes` is `{ Number, Char, AnyMultiplicativeRing }` on both sides, and `AnyList` states its exclusion of `String` itself. — *the library: export alignment*; kind: **property**; overlap: F-282 (same); checks: stale: `List.fsi:55` is a comment; the line is `:57` (cites a thing that moved).
4. So `String` has no entry in the export error (F-282). — *the harness and the gate: distance and count*; kind: **property**; overlap: F-282, F-83; checks: sound (scout).
5. `CatString`'s `rangeContains` answers what its halves answer, so it carries row 607's miss. — *the library: string objects*; kind: **defect** (row 607); overlap: F-83 (row 607); checks: row 607 NEGATIVE-VERIFIED (scout).
6. Gated by `StringMembersPromisedWalk.fss` and the per-site list. — kind: **tests**; checks: found (scout).
7. Detail in `rung-string-members` report. — kind: **pointer**.

- Shape: one subject (the library: export alignment), with the string objects.
- Title: claims 1 and 2; the body serves it. F-282 and F-297 count the same members differently (9, 7, 14).
~~~

### F-297
- The map's line: F-297 · split: keeps "the checker: the export check and types taken from the api" (owner F-282) · parts: "the library: the api's members against its components" (2) to F-286 · out: detail 3, 6 · defects: row 842 (5); row 841 (7).
- Shape: one subject. Disposition: split.
- Subjects of its claims: C-export "the checker: the export check and types taken from the api", owner F-282 (claims 1, 3, 4, 5, 7, 8, 9); L-apialign "the library: the api's members against its components", owner F-286 (claims 2, 6).
- A part goes to another entry: claim 2, subject "the library: the api's members against its components", owner F-286, to F-286 (in this chunk).
- Claims to move out of the entry, by kind: detail 3, 6; tests 8.
- Defect: claim 5, ledger row 842.
- Defect: claim 7, ledger row 841.
- Group of overlap O51, "Omitted types": a type left out taken from the api (rows 405, 1032); with F-232 (not in this chunk, chunk export), F-254 (not in this chunk, chunk export), F-266 (not in this chunk, chunk export), F-370 (not in this chunk, chunk export), F-371 (not in this chunk, chunk harness).
- Group of overlap O56, "The export check and abstract members": the rule, rows 834, 839, 842, the abstract members counted; with F-63 (in this chunk), F-83 (not in this chunk, chunk arrays), F-281 (not in this chunk, chunk overloading), F-282 (not in this chunk, chunk export), F-286 (in this chunk), F-287 (not in this chunk, chunk export), F-288 (not in this chunk, chunk export), F-294 (not in this chunk, chunk export).
- Its claims, from claims-checker-4.md, word for word:

~~~
## F-297 "The compiled export check asks the component to declare each member its api writes `abstract`"

1. The export check asks the component to declare each api member written `abstract`, at the api's header, with or without a body. — *the checker: export check*; kind: **property**; overlap: F-282 (same rule), F-294 (the specification's rule), library.md:46-48; checks: sound (scout).
2. The `FortressLibrary` component declares them all. — *the library: export alignment*; kind: **property**; overlap: F-282 ("the 66 members written `abstract`"); checks: sound (scout).
3. `equalListMembers` counts every api member and matches an abstract one through `equalAbstractMember`, the team's 2009 comparison, with two refusal messages. — *the checker: export check*; kind: **detail**; checks: `:831`, `:863` agree (scout).
4. An abstract getter is also met by a non-`hidden`, non-`private` component field of its name and type, since a field declaration declares its getter. — *the checker: export check*; kind: **property**; overlap: F-282 (same), library.md:46-48; checks: `:867`, `traits.tex:722` agree (scout).
5. An api's field met by a component's getter stays refused (row 842). — *the checker: export check*; kind: **defect** (row 842); overlap: F-294 (row 842); checks: row 842 NEGATIVE-VERIFIED (scout).
6. The 12 members the traits lacked (named) are declared bodyless; the prelude declares its 85. — *the library: export alignment*; kind: **detail**; overlap: F-286 (`String`'s members).
7. Walk compares no component with its apis (row 841). — *walk: export check*; kind: **defect** (row 841); overlap: F-370 (row 841); checks: row 841 NEGATIVE-VERIFIED (scout).
8. Gated by five `compiler_tests` and the per-site list. — kind: **tests**; checks: found (scout).
9. Detail in `rung-abstract-declared` report and `JUDGE.md`. — kind: **pointer**.

- Shape: one subject (the checker: export check), with the library's match.
- Title: claims 1 and 2; the body serves it. F-282 says nearly all of it.
~~~

### F-64
- The map's line: F-64 · split: keeps "the checker: comprises clauses and closed traits" (owner F-72) · parts: "the specification: comprises clauses" (4) to F-171 · defects: row 354 (1).
- Shape: mostly a defect. Disposition: split.
- Subjects of its claims: C-compr "the checker: comprises clauses and closed traits", owner F-72 (claims 1, 2, 3, 5); S-compr "the specification: comprises clauses", owner F-171 (claims 4).
- A part goes to another entry: claim 4, subject "the specification: comprises clauses", owner F-171, to F-171 (not in this chunk, chunk comprises).
- Claims to move out of the entry, by kind: tests 5.
- Defect: claim 1, ledger row 354.
- Group of overlap O7, "The ellipsis comprises": the refusal of a type that extends a trait whose comprises has ... (row 354); with F-63 (in this chunk), F-72 (not in this chunk, chunk comprises).
- Its claims, from claims-checker-2.md, word for word:

~~~
## F-64 "The compiled checker refuses every type that an api declares ... that extends a trait whose `comprises` clause has `...`"

Claims:
1. The checker refuses every api-declared type that extends a trait whose `comprises` has `...`, listed or not (row 354). *the checker: ellipsis comprises* | defect (row 354)
2. So `comprises { T, ... }` cannot stand in an api that declares `T`. *the checker: ellipsis comprises* | property
3. The refusal runs only when the checker checks an api, so a component's types may extend such a trait. *the checker: ellipsis comprises* | property
4. The specification allows `...` in an api and a listed extender; only a draft note refuses it, and a release build leaves draft notes out. *the specification: ellipsis comprises* | property
5. `XXX3q` and `XXX10p` pin the refusal, so a fix for listed types turns them red. *the checker: ellipsis comprises* | tests

Overlap:
- 1: F-72 ("leaves the ellipsis refusal of F-64 (row 354, open)"), F-63. Searched "row 354", "ellipsis".
- 4: F-171 (the specification's reading of `comprises`). Searched "traits.tex".

Checks: tests found; row 354 NEGATIVE-VERIFIED, agrees; `traits.tex` heading found (S2). No SC finding.

Shape: mostly a defect (the checker: ellipsis comprises, row 354). Title: the refusal; the body serves it.
~~~

### F-240
- The map's line: F-240 · rewritten in place: "the gate: how the count and distance stages run" (owner F-111) · out: history 2, 3, 5; detail 1, 4.
- Shape: mostly history or plan. Disposition: rewritten.
- Subjects of its claims: H-stages "the gate: how the count and distance stages run", owner F-111 (claims 1, 2, 3, 4, 5, 6, 7, 8).
- Claims to move out of the entry, by kind: history 2, 3, 5; detail 1, 4.
- Group of overlap O53, "Memos and speed": the memos, the 8,000-byte limit, the stage times; with F-43 (in this chunk), F-65 (not in this chunk, chunk export), F-94 (not in this chunk, chunk comprises), F-231 (not in this chunk, chunk export), F-235 (not in this chunk, chunk export), F-236 (not in this chunk, chunk export).
- Its claims, from claims-checker-3.md, word for word:

~~~
## F-240 "The checker's count stage takes about 65 s and its distance stage 117 s"

1. At climb batch 36's gate the count stage took about 65 s and the distance stage 117 s. — *the harness and the gate: stage times*; kind: **detail**; checks: times not in a file the scout read; `distance.txt` of batch 36 exists (scout).
2. At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos make most of the difference. — *the harness and the gate: stage times*; kind: **history**.
3. The rise from about 90 s at batch 21b is the library check now run past its type errors into the export check, by one rung run each. — *the harness and the gate: stage times*; kind: **history**.
4. Checking every symbolic operator costs the count stage about 15 to 25 %. — *the harness and the gate: stage times*; kind: **detail**.
5. From batch 22's gate to 26's the stage stayed between 150 s and 180 s; both halved at batch 27's, cause not measured. — *the harness and the gate: stage times*; kind: **history**.
6. The count table records no seconds, so times come from the gate log's file times, and the distance stage ran under `testFast`'s load. — *the harness and the gate: stage times*; kind: **property** (how the time is read); overlap: none found (searched "file times"); checks: sound (scout).
7. Load can lengthen a stage more than twofold (217 s at load 3.3 against 574 s at 4.6 to 5.3), so times compare only under like load. — *the harness and the gate: stage times*; kind: **property**; overlap: none found (searched "load average"); checks: sound (scout).
8. Source the gate log; detail in twelve batch reviews. — kind: **pointer**.

- Shape: mostly history or plan (a time log of the gate), one subject (the harness and the gate: stage times).
- Title: claim 1, a measurement of one gate; the body is its log over batches, not a property; claims 6 and 7 are the only lasting rules.
~~~

### F-111
- The map's line: F-111 · rewritten in place: "the gate: how the count and distance stages run" (owner) · out: detail 3, 6 · check: false today, cites a thing that is gone.
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: H-stages "the gate: how the count and distance stages run", owner F-111 (claims 1, 2, 3, 4, 5, 6).
- Claims to move out of the entry, by kind: detail 3, 6.
- Today's checks: cites a thing that is gone or moved; false today.
- Group of overlap O28, "The checker count and the distance": the values at the last gate, the fourteen against the twelve, how the stages run; with F-42 (not in this chunk, chunk export), F-43 (in this chunk), F-53 (not in this chunk, chunk export), F-54 (not in this chunk, chunk export), F-61 (not in this chunk, chunk runtime), F-66 (not in this chunk, chunk export), F-245 (not in this chunk, chunk overloading), F-281 (not in this chunk, chunk overloading), F-285 (not in this chunk, chunk inference), F-287 (not in this chunk, chunk export), F-288 (not in this chunk, chunk export), F-289 (not in this chunk, chunk export), F-290 (not in this chunk, chunk export), F-295 (not in this chunk, chunk export), F-296 (not in this chunk, chunk overloading).
- Sent here by the map: the whole of F-289 (not in this chunk, chunk export), merged into it.
- Sent here by the map: claim 5 of F-203 (not in this chunk, chunk harness), subject "the gate: how the count and distance stages run", owner F-111.
- Its claims, from claims-harness.md, word for word:

~~~
### F-111, "The checker-count and distance stages read only the compiler's phases ..."

1. Claims
   - C1. The checker-count and distance stages read only the compiler's phases, so edits under the specification, documentation, tests, walk's evaluator and natives, or `explorations/` outside their folders cannot move their counts. Subject: the tools: checker-count and distance stages. Kind: property.
   - C2. Both stages run the compiled checker on the interpreter's library, not on the tests. Subject: the tools: checker-count and distance stages. Kind: property.
   - C3. The count stage runs `PhaseOrder.compilerPhaseOrder`; the distance stage its first six phases. Subject: the tools: checker-count and distance stages. Kind: detail.
   - C4. None of these phases is walk's own, and compiler code that names walk's classes does not change the checker's report. Subject: the tools: checker-count and distance stages. Kind: property.
   - C5. The library names walk's natives in strings, a glue class or a helper read through the compiled rewrite (F-298, F-299). Subject: the tools: checker-count and distance stages. Kind: property.
   - C6. Evidence read in the code, not measured; file lines. Kind: detail.
2. Overlaps: C1-C2: F-53 [the distance and the checker count], F-66 [checker-count table], F-34, F-289 [distance stage]; coordinator `batch.md:63` (`STAGE_BLIND`) builds on it (pilot). C5: F-298, F-299. Searched "WorldFlip": only F-111.
3. Checks: C3 false today: since 2026-10-24 the count stage stops after the type check, as the distance stage does; `WorldFlip.java:25`, `:42` cite moved lines (stale; pilot). C1's conclusion holds (pilot); the "cannot move" claim not measured (pilot, "could not check").
4. Shape: one subject (the stages). Title matches; C3 and C6 are a code tour.
~~~

### F-43
- The map's line: F-43 · rewritten in place: "the checker: speed, memos and memory" (owner F-65) · cut: copied gate value (4) · defects: no row named (1, 3).
- Shape: mostly a defect. Disposition: rewritten.
- Subjects of its claims: C-speed "the checker: speed, memos and memory", owner F-65 (claims 1, 2, 3); H-values "the gate: the values of the checker count and the distance", owner F-53 (claims 4).
- Defect: claim 1, ledger row .
- Defect: claim 3, ledger row .
- Group of overlap O28, "The checker count and the distance": the values at the last gate, the fourteen against the twelve, how the stages run; with F-42 (not in this chunk, chunk export), F-53 (not in this chunk, chunk export), F-54 (not in this chunk, chunk export), F-61 (not in this chunk, chunk runtime), F-66 (not in this chunk, chunk export), F-111 (in this chunk), F-245 (not in this chunk, chunk overloading), F-281 (not in this chunk, chunk overloading), F-285 (not in this chunk, chunk inference), F-287 (not in this chunk, chunk export), F-288 (not in this chunk, chunk export), F-289 (not in this chunk, chunk export), F-290 (not in this chunk, chunk export), F-295 (not in this chunk, chunk export), F-296 (not in this chunk, chunk overloading).
- Group of overlap O29, "The overloading memo": whether the memo keeps every input or hides errors across traits; with F-80 (not in this chunk, chunk overloading).
- Group of overlap O53, "Memos and speed": the memos, the 8,000-byte limit, the stage times; with F-65 (not in this chunk, chunk export), F-94 (not in this chunk, chunk comprises), F-231 (not in this chunk, chunk export), F-235 (not in this chunk, chunk export), F-236 (not in this chunk, chunk export), F-240 (in this chunk).
- Its claims, from claims-checker-1.md, word for word:

~~~
## F-43 "The overloading checker's memo hides some errors"

Claims:
1. The overloading checker's memo hides some errors, which ones changing from build to build. *the checker: overloading memo* | defect (no row)
2. It keeps a "valid" verdict per pair, so a pair valid for one inheriting trait is taken as valid for the next, in hash-set order. *the checker: overloading memo* | property
3. The memo is on by default, so a plain `fortress compile` can miss these errors. *the checker: overloading memo* | defect (no row)
4. `-Dfortress.analyzer.overload.cache=false` turns it off, and the gate's count and distance stages set it. *the harness and the gate: checker count and distance* | property

Overlap:
- 1 to 3: F-80 ("the checker's overloading memo is keyed on all the inputs of the check, so a pair accepted at the top level is not reused unchecked"), which reads against claim 2. Searched "memo", "overload.cache".
- 4: none found. Searched "overload.cache".

Checks: `OverloadingChecker.scala:79` (typechecker copy) agrees; `distance.txt` of climb batch 36 carries the property (S1). No SC finding.

Shape: one subject (the checker: overloading memo), mostly a defect without a row. Title: the memo hides errors and the gate turns it off; the body serves it.
~~~

### F-179
- The map's line: F-179 · stays as it is: "the repository: two runtimes" (owner).
- Shape: one subject. Disposition: stays.
- Subjects of its claims: P-runtimes "the repository: two runtimes", owner F-179 (claims 1, 2, 3).
- Its claims, from claims-arrays.md, word for word:

~~~
## F-179, "Tasks and transactions are implemented twice, in `interpreter/evaluator/` and in `runtimeSystem/`, independently."

- Claims:
  1. [property] {the repository: two runtimes} Tasks and transactions are implemented twice, in `interpreter/evaluator/` and `runtimeSystem/`, independently.
  2. [property] {the repository: two runtimes} A fix in one copy does not reach the other: row 302's fix is in the compiled copy only.
  3. [pointer] Detail in `coordinator/map/modules-and-phases.md`, "B.11".
- Overlaps:
  - 1: none in FACTS [runtimeSystem names it for other questions]; the skill's `SKILL.md:111` says it word for word (scout 5).
  - 2: none found [row 302].
- Checks: directories found; row 302 FIXED, consistent (scout 4). No stale finding.
- Shape: one subject (the repository: two runtimes).
- Title: states the fact; the body serves it.
~~~

### F-102
- The map's line: F-102 · rewritten in place: "the harness: XXX tests and refusals at load" (owner) · out: detail 5 · check: beyond its support.
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: H-xxx "the harness: XXX tests and refusals at load", owner F-102 (claims 1, 2, 3, 4, 5).
- Claims to move out of the entry, by kind: detail 5.
- Today's checks: beyond its support.
- Group of overlap O69, "XXX tests and refusals": the load_ key and the XXX rule; with F-103 (in this chunk), F-104 (in this chunk), F-383 (in this chunk).
- Its claims, from claims-harness.md, word for word:

~~~
### F-102, "An `XXX*.fss` in the interpreter corpus is a gated expected-failure test."

1. Claims
   - C1. `SystemJUTest` marks a `tests/` file whose name starts with `XXX` as one that must fail, and the suite goes red when it passes. Subject: the harness and the gate: XXX tests. Kind: property.
   - C2. Such a test needs a `.test` file only to name a refusal at load (F-29: the load check and its `load_exception_contains` key). Subject: the harness and the gate: XXX tests. Kind: property.
   - C3. An `XXX` test that imports an api with its component takes them from `test_library/`. Subject: the harness and the gate: test imports. Kind: property.
   - C4. The compiled corpora's rule differs (F-103). Kind: pointer.
   - C5. Source: `FileTests.java` lines; skill pointer. Kind: detail.
2. Overlaps: C1-C2: F-383 [refusal at load, `load_` keys], F-103 [`XXX` in compiled corpora]. C3: F-119 [`test_library`, other subject]. Skill `tests-writing.md:39-45`, `:72-79` (pilot).
3. Checks: C2's pointer is beyond its support: F-29 does not hold the `load_exception_contains` key; F-383 does (stale; pilot). Rest sound.
4. Shape: one subject (XXX tests). Title matches.
~~~

### F-103
- The map's line: F-103 · stays as it is: "the harness: XXX tests and refusals at load" (owner F-102).
- Shape: one subject. Disposition: stays.
- Subjects of its claims: H-xxx "the harness: XXX tests and refusals at load", owner F-102 (claims 1, 2, 3, 4, 5).
- Group of overlap O69, "XXX tests and refusals": the load_ key and the XXX rule; with F-102 (in this chunk), F-104 (in this chunk), F-383 (in this chunk).
- Its claims, from claims-harness.md, word for word:

~~~
### F-103, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` cannot express ..."

1. Claims
   - C1. In `compiler_tests/` and `library_tests/` the `XXX` mechanism cannot express, in one `.test` file, a program that compiles and then fails at run time. Subject: the harness and the gate: XXX tests. Kind: property.
   - C2. The `XXX` prefix of a `.test` file's name makes every command it drives a must-fail. Subject: the harness and the gate: XXX tests. Kind: property.
   - C3. So such a defect needs two `.test` files: a plain one that drives `link`, and an `XXX` one that drives `run`. Subject: the harness and the gate: XXX tests. Kind: property.
   - C4. A compile-stage failure needs one `XXX` compile test. Subject: the harness and the gate: XXX tests. Kind: property.
   - C5. An `XXX` compile test with `compile_err_contains` whose program compiles is red: "Saw wrong failure". Subject: the harness and the gate: XXX tests. Kind: property.
2. Overlaps: F-383 [a compiled refusal test is `XXX`-named], F-102, F-104 [`XXX` component]. Searched "Saw wrong failure": only F-103. Skill `tests-writing.md:75`, `:78`, `:103-113` (pilot).
3. Checks: sound; evidence kind unstated (pilot).
4. Shape: one subject. Title matches.
~~~

### F-104
- The map's line: F-104 · split: keeps "the harness: XXX tests and refusals at load" (owner F-102) · parts: "the harness: check keys" (1) to F-98; "the code generator: what it refuses against the one library" (2) to F-34.
- Shape: one subject. Disposition: split.
- Subjects of its claims: H-keys "the harness: check keys", owner F-98 (claims 1); G-walls "the code generator: what it refuses against the one library", owner F-34 (claims 2); H-xxx "the harness: XXX tests and refusals at load", owner F-102 (claims 3, 4, 5).
- A part goes to another entry: claim 1, subject "the harness: check keys", owner F-98, to F-98 (not in this chunk, chunk harness).
- A part goes to another entry: claim 2, subject "the code generator: what it refuses against the one library", owner F-34, to F-34 (not in this chunk, chunk runtime).
- Group of overlap O69, "XXX tests and refusals": the load_ key and the XXX rule; with F-102 (in this chunk), F-103 (in this chunk), F-383 (in this chunk).
- Its claims, from claims-harness.md, word for word:

~~~
### F-104, "A thrown `CompilerError` takes a third path through the test harness ..."

1. Claims
   - C1. The harness checks three streams of a command: output, error output and a thrown exception. Subject: the harness and the gate: check keys. Kind: property.
   - C2. `Shell` does not catch a `CompilerError` from the code generator, such as a code-generator wall. Subject: the code generator: walls. Kind: property.
   - C3. The harness reads it as an exception of the component that `tests=` names, with `compile_exception_*` keys. Subject: the harness and the gate: XXX tests. Kind: property.
   - C4. If that component's name holds `XXX`, a link or compile exception is green whatever the `.test` file is called; only an unmet key makes it red. Subject: the harness and the gate: XXX tests. Kind: property.
   - C5. A `compile_exception_contains` key pins the wall's text, so the test turns red when the wall goes or changes. Subject: the harness and the gate: XXX tests. Kind: property.
2. Overlaps: none in FACTS (searched "CompilerError", "compile_exception", "sayWhat"); F-103 near. Skill `tests-writing.md:77`, `:108`; `compiler.md:38` (pilot).
3. Checks: sound; evidence kind unstated (pilot: `Shell.java` names no `CompilerError`; 36 tests use the key and passed at batch 36).
4. Shape: one subject (XXX tests and check streams). Title matches.
~~~

### F-383
- The map's line: F-383 · stays as it is: "the harness: XXX tests and refusals at load" (owner F-102).
- Shape: several subjects. Disposition: stays.
- Subjects of its claims: H-xxx "the harness: XXX tests and refusals at load", owner F-102 (claims 1, 2, 3).
- Claims to move out of the entry, by kind: tests 2.
- Group of overlap O69, "XXX tests and refusals": the load_ key and the XXX rule; with F-102 (in this chunk), F-103 (in this chunk), F-104 (in this chunk).
- Its claims, from claims-harness.md, word for word:

~~~
### F-383, "Walk's harness counts a static error that a phase raises before the run ... as a refusal at load ..."

1. Claims
   - C1. Walk's harness counts a static error raised by a phase before the run, such as the disambiguator's, as a refusal at load, so a `load_` key test passes on it. Subject: the harness and the gate: refusals at load. Kind: property.
   - C2. Source: `InterpreterTest.thrownAtLoad`; test `TypecaseUndefinedArmWalk.test`. Kind: tests.
   - C3. A compiled refusal test is still `XXX`-named: a plain compile test is red whenever the compile reports errors. Subject: the harness and the gate: XXX tests. Kind: property.
2. Overlaps: C1: F-102 [`load_exception_contains`, refusal at load], F-239, F-375 ["refusal at load", other subjects]. C3: F-103 [compile-stage failure needs one `XXX` compile test]. Skill `tests-writing.md:45`, `:107` (pilot).
3. Checks: sound (pilot: `FileTests.java:875-885`; the test's key). Ownership fails: C3 is F-103's subject (pilot).
4. Shape: several subjects (refusals at load; XXX tests). Title matches C1.
~~~

### F-108
- The map's line: F-108 · split: keeps "both paths: deterministic order" (owner F-232) · parts: "the harness: XXX tests and refusals at load" (4) to F-102 · defects: row 430 (1).
- Shape: one subject. Disposition: split.
- Subjects of its claims: B-order "both paths: deterministic order", owner F-232 (claims 1, 2, 3); H-xxx "the harness: XXX tests and refusals at load", owner F-102 (claims 4).
- A part goes to another entry: claim 4, subject "the harness: XXX tests and refusals at load", owner F-102, to F-102 (in this chunk).
- Defect: claim 1, ledger row 430.
- Group of overlap O63, "Candidate order and hashes": the linear extension, identity hashes, order of emitted code; with F-76 (not in this chunk, chunk overloading), F-232 (not in this chunk, chunk export), F-334 (not in this chunk, chunk export), F-354 (not in this chunk, chunk export), F-377 (not in this chunk, chunk comprises), F-396 (not in this chunk, chunk runtime), F-408 (not in this chunk, chunk export).
- Its claims, from claims-harness.md, word for word:

~~~
### F-108, "The interpreter's overload-ambiguity message names its two declarations in an order that is not a property of the program."

1. Claims
   - C1. Walk's overload-ambiguity message names its two declarations in an order that varies from run to run as `bin/fortress` and the suites run walk. Subject: walk: ambiguity message order. Kind: defect (row 430).
   - C2. With three JVM flags set together the order is fixed for a given library, and a library edit can flip it. Subject: walk: ambiguity message order. Kind: property.
   - C3. Which of the three fixes the order is not known. Subject: walk: ambiguity message order. Kind: property.
   - C4. The harness reads only that the `XXX` test fails, and no gate stage compares the message (P-103). Subject: the harness and the gate: XXX tests. Kind: property.
2. Overlaps: C1: F-232 [row 430, walk's `_WrappedFValue` identity hash]. Searched "ambiguity": only F-108. Skill `interpreter.md:109` (pilot).
3. Checks: sound; consistency fails with the skill, whose `interpreter.md:109` names one core as the cause (pilot; stale's skill list: the skill is wrong).
4. Shape: one subject (ambiguity message order). Title matches.
~~~

