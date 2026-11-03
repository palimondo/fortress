<!-- The record-landing workflow's evidence of PLAN.md at c3a16b0bc: its headings, the lines that the batch added (97a416b18..11d2d8764) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

# PLAN.md

Print a section with `facts-extract.sh 'doc:explorations/coordinator/PLAN.md#HEADING'`, from the worktree.

## Its headings, with their lines

- 7: Where we stand (8 lines)
- 15: The principle for the batches (8 lines)
- 23: The phases (2 lines)
  - 25: Phase 1. Batch 5: what is decided and shares nothing (4 lines)
  - 29: Phase 2. Batch 6: the tower flips, the specification with it (4 lines)
  - 33: Phase 2b. The repair batch from the conformance reviews (4 lines)
  - 37: Phase 3. The checker at a true zero (6 lines)
  - 43: Phase 4. The switch-over (41 lines)
  - 84: Phase 5. microGPT compiles (18 lines)
  - 102: Phase 6. microGPT fast (9 lines)
- 111: Pavol's answers, in the order they are needed (56 lines)
- 167: Work that can start now, with no decision (25 lines)
- 192: Off the path, parked (42 lines)
  - 234: Phase 3's candidates at its end (23 lines)
  - 257: Climb batch N's first run, listed for his review (11 lines)
  - 268: Climb batch 6.5b, listed for his review (10 lines)
  - 278: Climb batch 7b, listed for his review (23 lines)
  - 301: Climb batch 8, listed for his review (19 lines)
  - 320: Climb batch 9, listed for his review (27 lines)
  - 347: Climb batch 10, listed for his review (16 lines)
  - 363: Climb batch 11, listed for his review (14 lines)
  - 377: Climb batch 12, listed for his review (16 lines)
  - 393: Climb batch 13, listed for his review (22 lines)
  - 415: Climb batch 14, listed for his review (19 lines)
  - 434: Climb batch 15, listed for his review (27 lines)
  - 461: Climb batch 15b, listed for his review (6 lines)
  - 467: Climb batch 16, listed for his review (12 lines)
  - 479: Climb batch 17, listed for his review (18 lines)
  - 497: Climb batch 18, listed for his review (16 lines)
  - 513: Climb batch 19, listed for his review (22 lines)
  - 535: Climb batch 20, listed for his review (19 lines)
  - 554: Climb batch 21, listed for his review (23 lines)
  - 577: Climb batch 21b, listed for his review (13 lines)
  - 590: Climb batch 22, listed for his review (15 lines)
  - 605: Climb batch 22c, listed for his review (22 lines)
  - 627: Climb batch 23, listed for his review (14 lines)
  - 641: Climb batch 24, listed for his review (24 lines)
  - 665: Climb batch 25, listed for his review (15 lines)
  - 680: Not classified, to check (22 lines)
- 702: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 719: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 731: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, 97a416b18..11d2d8764

- PLAN.md:52, under "The phases > Phase 4. The switch-over":

  - The families that wait on a known obstacle, each with its home: `Char`'s `asExprString`, whose helper changes a value under walk, with row 861's answer (climb batch 24's fork 18; `CLIMB-BATCH-24.md`, section 4, "Left out, each with its home"), the last of rung H's four since climb batch 25's rung U moved `UnsignedLong`'s two string getters and `NN64`'s prefix `DOTMINUS` with `NN32`'s `CHOOSE` (F-313); the bindings over `String` after his answer to item 62 (row 846; review-queue item 310, default neither, the next family that moves such a binding meets the row), climb batch 24's two top-level ones among them (item 327); `FlatString`'s five after item 340, since walk's loader gives `FlatString` no carrier of `self` and would refuse them at load, with row 864 beside it, a walk rung of the natives: a helper bound in a dotted method of a generic trait or object that no Java type carries is refused only where an instance's method is made, not at load; row 872, with the string family: `Char`'s `asString` of a character past U+FFFF answers the one-character string of its low 16 bits under walk's glue, its helper and the compiled prelude alike (`ProjectFortress/tests/CharAsStringSupplementaryWalk.fss`); and a declaration with a varargs parameter, which the rewrite leaves a call of `builtinPrimitive` (row 849; gather.1 under "Climb batch 23, listed for his review", default as landed).

- PLAN.md:665, under "Off the path, parked > Climb batch 25, listed for his review":

### Climb batch 25, listed for his review

- PLAN.md:667, under "Off the path, parked > Climb batch 25, listed for his review":

The items for him that climb batch 25 (`coordinator/CLIMB-BATCH-25.md`, rungs D, P, A, R, U, N and C, phase 4's third batch, the natives' N3 families with three walls of the code generator) left (`compile-ladder/climb-batch-25/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"). Nothing on the path waits on them.

- PLAN.md:669, under "Off the path, parked > Climb batch 25, listed for his review":

- D.worker.1 and D.skeptic.2 of climb batch 25's rung D, with P.worker.2 and the second question of P.skeptic.1 of its rung P (row 880, `CONTESTED`): which reading of `nextUp` and `nextDown` at a signed zero governs on `RR64` and `RR32`: IEEE 754-2008's nextUp, the smallest subnormal (Java's `Math.nextUp`, and the apis' "next higher IEEE float"), or the successor in IEEE's totalOrder that the team's `DirectedRounding` gives, under which `nextUp` of `-0.0` is `0.0`? The operators chapter's `MIN` and `MAX` order `-0` below `+0` (`Specification/basic/operators/opr-overview.tex:252`). Default: today's values, asserted by `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss`. Evidence: `ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127` (the `float` twin `:25-41`); `Library/FortressLibrary.fsi:323-326`; `explorations/compile-ladder/rung-natives-float-bits/REPORT.md:111`, `SKEPTIC.md:37`.

- PLAN.md:670, under "Off the path, parked > Climb batch 25, listed for his review":

- D.skeptic.1 of climb batch 25's rung D: the batch spells its square-root roundings two ways, rung D's `doubleSqrtUp` and `doubleSqrtDown` after the glue classes and rung P's `floatSQRTUp` and `floatSQRTDown` after `floatSQRT`, both under the batch's fork 2 (`coordinator/CLIMB-BATCH-25.md:81`); should one spelling be chosen? Default: both as landed. Evidence: `explorations/compile-ladder/rung-natives-float-bits/SKEPTIC.md:36`.

- PLAN.md:671, under "Off the path, parked > Climb batch 25, listed for his review":

- P.worker.1 and the first question of P.skeptic.1 of climb batch 25's rung P: which ASCII operator is the specification's "round toward positive infinity" addition (and product), `PLUS_UP`, bound to the NaN-free helper, which answers `+Infinity` at `inf + -inf`, or `IEEE_PLUS_UP`, bound to the IEEE one, which answers NaN? The text names `\upplus` with no ASCII spelling (`Specification/basic/operators/opr-overview.tex:216-218`, `:184-186`). Default: the team's two families as they bind (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:291`, `:311`), the guards asserting walk's values for both (`ProjectFortress/tests/NativeHelperFamilyRR32Walk.fss:335`, `:429`). Evidence: `explorations/compile-ladder/rung-natives-rr32/REPORT.md:128`.

- PLAN.md:672, under "Off the path, parked > Climb batch 25, listed for his review":

- U.worker.1 and U.skeptic.1 of climb batch 25's rung U (row 885, `CONTESTED`): should a binding over `NN32`, `NN64` or `Char` to a helper with several methods of one name and arity compile on the compiled path, the rewrite picking the overload whose Java types carry the declared types, as walk does, and composing its transfers, or stay refused as today? No library binding names such a helper. Default: as landed, refused, pinned by `ProjectFortress/compiler_tests/XXXNativeHelperOverloadedNN32Compiled.test:3`. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:135-145`, `:196-206` (`soleMethod`); `explorations/compile-ladder/rung-natives-unsigned/REPORT.md:147`.

- PLAN.md:673, under "Off the path, parked > Climb batch 25, listed for his review":

- N.worker.1 of climb batch 25's rung N (row 887): should a later rung give `ZZ`'s `CHOOSE` the specification's 0 at `k < 0` or `k > n` for a natural `n`? The repair is one guard in `simpleArbitraryPrecisionArith.choose`; it would move walk's values at those pairs, and at a negative `n` it would answer review-queue item 333. Default: as landed, the glue's 1 kept by the batch's fork 7, pinned by `ProjectFortress/tests/XXXChooseZZOutOfRangeWalk.fss:9`. Evidence: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleArbitraryPrecisionArith.java:164-177`; `Specification/basic-lib/basic-integers.tex:611`; `explorations/compile-ladder/rung-natives-divisors/REPORT.md:188`.

- PLAN.md:674, under "Off the path, parked > Climb batch 25, listed for his review":

- C.worker.1 and C.skeptic.2 of climb batch 25's rung C (its D6): the code generator's modifier guard now admits `test` on methods as well as top-level functions (measured: `test mt()` on an object compiles and runs, 'O 7'), while the specification's note speaks only of a top-level function of type `() -> ()` (`Specification/basic/tests.tex:36-55`) and the parser's method modifiers admit `test` (`ProjectFortress/src/com/sun/fortress/nodes_util/Modifiers.java:151-154`). Default: as landed, the wider guard, as the trait guard admits `test` for traits and objects (`Modifiers.java:146-149`); a narrower check is the way not taken. Evidence: `explorations/compile-ladder/rung-codegen-walls/REPORT.md:128`; `SKEPTIC.md:27`.

- PLAN.md:675, under "Off the path, parked > Climb batch 25, listed for his review":

- C.skeptic.1 of climb batch 25's rung C (row 890): should the new `forbid` path run a `try`'s `finally` clause now, ahead of the general repair? The base already skips `finally` when an exception leaves the `try` block, and the `forbid` path inherits that order; the repair is `forTry`'s emission of `finally` on every abrupt path. Default: as landed, recorded by `ProjectFortress/compiler_tests/XXXFinallyOnEscape.test`, not fixed for one abrupt path of three. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2075-2085`; `Specification/basic/expressions/try.tex`, "Try Expressions"; `explorations/compile-ladder/rung-codegen-walls/SKEPTIC.md:63`.

- PLAN.md:676, under "Off the path, parked > Climb batch 25, listed for his review":

- C.worker.2 and C.skeptic.3 of climb batch 25's rung C, a step refused, not a question of the language: the automatic permission check refused running walk guards with the base build's own `harness-one.sh` (`FORTRESS_HOME=/home/user/fortress-base25`), the route the `fortress-repo` skill's `references/worktrees.md`, "Running the old code", gives for interpreter tests on the old code; an allow rule would let a later rung show a walk guard on the old code that way. Default: none on record; the rung showed its walk guards on the base's build in its own tree before the edit. Evidence: `explorations/compile-ladder/rung-codegen-walls/REPORT.md:116`.

- PLAN.md:677, under "Off the path, parked > Climb batch 25, listed for his review":

- gather.1 of climb batch 25, told, not asked: rungs D and P met one defect, `nextUp` at a signed zero, and each wrote a reproducer of one file name and a row; the gather merged the two files into one holding both sides' assertions and made the rows one, row 880, its claim widened to `RR32`. Default: as landed. Evidence: `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss:1-22`; `explorations/compile-ladder/climb-batch-25/RECORD.md`, "Conflicts".

- PLAN.md:678, under "Off the path, parked > Climb batch 25, listed for his review":

- gather.2 of climb batch 25, told, not asked: four sentences of the `fortress-repo` skill are false on the merged tree and the batch writes no skill text: `references/compiler.md:44` (the modifier guard admits `test`, rung C), `:86` (`self` of `UnsignedLong` takes the `NN64` transfer, rung U), `references/interpreter.md:89` and `references/library.md:56` ("most" bindings name glue classes; 161 of 449 do). Default: the skill writer rewrites them from the batch record. Evidence: `explorations/compile-ladder/climb-batch-25/RECORD.md`, "Left for the coordinator and the skill writer".


## The lines added after the landing, 11d2d8764..c3a16b0bc

None.

## The other lines that name a changed entry or row

- PLAN.md:9, under "Where we stand", 1124 characters, names F-303: At climb batch 24's landing, the first at which walk's float arithmetic runs through helpers of `nativeHelpers/` (F-303), both programs gave '7 PASS, 0 FAIL of 7' (`reviews/batch-24-review.md`, section 5), and all 52 team demos ran to their end under walk on its merged tree (F-283;
- PLAN.md:11, under "Where we stand", 3319 characters, names F-24, F-32, F-53, F-240, F-299, F-303, F-305, F-306, F-308 and rows 336, 848: F-53, F-288, F-289), now with the 173 bindings that name helpers read as calls of their helpers; | F-303); | F-305; | F-306); | F-308; | So 173 of the library's 449 live bindings name helpers and 276 still name glue classes (F-299, F-32), and under walk `DIV` by zero on `ZZ64`, `ZZ`, `NN32` and `NN64` raises `DivisionByZero`, as on `ZZ32` (F-24), while `REM` and `MOD` by zero still end the run (rows 336 and 848). | F-299; | The count stage took about 150 s and the distance stage 198 s there (F-240). | their guards do (F-308;
- PLAN.md:39, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:45, under "The phases > Phase 4. The switch-over", 543 characters, names F-53, F-298, F-299: review `reviews/batch-23-review.md`): the count 0 and the distance 0 over the fourteen, '#crash none', now with 21 bindings read as calls of their helpers (F-53, F-298, F-299);
- PLAN.md:46, under "The phases > Phase 4. The switch-over", 648 characters, names F-53, F-298, F-299: review `reviews/batch-24-review.md`): the count 0 and the distance 0 over the fourteen, '#crash none', now with 173 bindings read as calls of their helpers (F-53, F-298, F-299);
- PLAN.md:47, under "The phases > Phase 4. The switch-over", 980 characters, names rows 326, 336, 848, 860: rung H's four left on glue classes, as rows 326, 860 and 861 are fixed; | beside them N3's `REM` and `MOD` helpers (rows 336 and 848) and the integer conversions after his answer (`reviews/integer-conversions-evidence.md`).
- PLAN.md:48, under "The phases > Phase 4. The switch-over", 1042 characters, names F-32, F-299: Every native binding becomes a `builtinPrimitive` call naming a static helper of `nativeHelpers/`, which both paths run (P-58), since the compiled path cannot reuse walk's glue classes (F-32). | D2, 42 with no compiled analogue (F-32; | Since climb batch 24, 173 bindings name helpers and 276 still name glue classes (F-299, F-32).
- PLAN.md:49, under "The phases > Phase 4. The switch-over", 286 characters, names F-298, F-299: The compiled path rewrites such a body at the parse into a call of its helper, on every repository but walk's, the gate's two stages among them (F-298; | walk loads the helper beside its glue classes (F-299).
- PLAN.md:50, under "The phases > Phase 4. The switch-over", 1047 characters, names F-32, F-299, F-303, F-305: climb batch 24 moved 76 more: `Float`'s 30, `ZZ64`'s 21 with its `CHOOSE`, `ZZ`'s 16, `ZZ32`'s `CHOOSE`, and the small rest's eight (F-299, F-303, F-305 to F-307). | F-32).
- PLAN.md:51, under "The phases > Phase 4. The switch-over", 1263 characters, names F-308: review-queue item 326, with its cost: the transfers are identities, so only a binding's guards check that it names the unsigned helper), and rung H moved 76 (F-308);
- PLAN.md:56, under "The phases > Phase 4. The switch-over", 221 characters, names F-32: - N4, D1's 36, the I/O objects: a Java-backed writer type and `stdOut` first, since every program's `println` writes through `Writer`'s natives (F-32), then `File`'s 15 and `Reader`'s 10 (`natives-shape.md`, section 3).
- PLAN.md:58, under "The phases > Phase 4. The switch-over", 144 characters, names F-32: P-84, P-85), and `Thread`, `Reflect` and `printTaskTrace`, off microGPT's path (F-32).
- PLAN.md:60, under "The phases > Phase 4. The switch-over", 1705 characters, names F-34 and rows 624, 820, 821, 823: - The code generator over the one library (F-34): under the switch-over's setting it refused 52 declarations of the library's twelve components, all of them declarations that the checker passes, measured once on climb batch 22's code (`reviews/phase3-exit/zero-audit.md`, "Part C. | four of them stopped first at a header `where` clause, which the code generator compiles since climb batch 24's rung G, so the present count is unmeasured (F-34, F-181); | each other kind has a ledger row, among them a local function (row 304), varargs (row 624), "Not in the trait table" (row 733), and rows 818 to 823, `asif`, a postfix operator on a tuple operand, `Any` as a static argument in an `extends` clause, `try` with `forbid`, the kind env in a generic function's `typecase` and the `test` modifier (`perf-probes/codegen-distance/REPORT.md`, sections 2 to 6).
- PLAN.md:61, under "The phases > Phase 4. The switch-over", 1089 characters, names F-34: With the code-generator rungs that the planner sizes from the 52 refusals (F-34;
- PLAN.md:64, under "The phases > Phase 4. The switch-over", 892 characters, names F-53: F-53's definition is unchanged (`reviews/batch-23-review.md`, finding 6).
- PLAN.md:65, under "The phases > Phase 4. The switch-over", 940 characters, names F-32: F-32), which `natives-shape.md` puts with `NativeArray` after the switch-over (section 3).
- PLAN.md:68, under "The phases > Phase 4. The switch-over", 630 characters, names row 454: and its `RR32`, rows 528 (`Equality[\RR32\]` without an `=`, gated by `ProjectFortress/library_tests/XXXRR32EqualityRungV.fss`, whose two `RR32` bindings of a numeral are respelled with `narrow(...)` then, or it fails for row 454's reason) and 529 (`RR32` with `RR32` answering `RR64`);
- PLAN.md:232, under "Off the path, parked", 574 characters, names F-298: - Row 845, from climb batch 23's rung C's skeptic: under walk a component that writes `import java` of a helper now stops at F-180's gap 3, 'Non-top-level reference to imported …', where it stopped at gap 1, since fork 5's stand-in reading reaches walk's own repository (F-180, F-298).
- PLAN.md:270, under "Off the path, parked > Climb batch 6.5b, listed for his review", 446 characters, names row 529: Row 528, which rung V put to him with no default, is on phase 4's line on the prelude's own defects with row 529, its default the switch-over by the one-library decision of 2026-09-21 (`reviews/batch-6.5b-review.md`, finding 3).
- PLAN.md:369, under "Off the path, parked > Climb batch 11, listed for his review", 199 characters, names row 650: - Should the code generator accept the modifier `override` (row 650), and what must compiled dispatch then do with a declaration a type no longer provides (row 694)? No default.
- PLAN.md:450, under "Off the path, parked > Climb batch 15, listed for his review", 2469 characters, names row 336: Climb batch 20's gather met the same limits (its gather.1): five of the records' notes refused, rows 441, 523, 533 and 336 (full) of rung I and row 465 (full) of rung A, their texts in `compile-ladder/climb-batch-20/RECORD.md`, "Ledger notes not written";
- PLAN.md:629, under "Off the path, parked > Climb batch 23, listed for his review", 1769 characters, names rows 336, 848: then, from its post-batch review (`reviews/batch-23-review.md`, finding 1 and Part 4), the record's two questions, taken at their defaults with his go, the planner's readings on which the zero with the moved bindings rests, the record's forks and its points for his sight, the method that rung C's skeptic added to a team test file, and the steps owed for rung C's other limits and for rows 336 and 848. | the two questions, forks 5 and 2 and gather.2, which he answered on 2026-10-31 (review-queue items 306 to 308 and 312), and the step owed for rows 336 and 848, which climb batch 24 built, are in `PLAN-history.md`, "Climb batch 24's landing, 2026-10-31".
- PLAN.md:652, under "Off the path, parked > Climb batch 24, listed for his review", 1760 characters, names F-308 and row 865: and a declared type is read by its simple name, so a program's own trait named `NN32` or `Char` would be composed as the library's, which has no home but the report (F-308 holds the first two). | And row 865, measured by rung W's skeptic: a helper string in a local function or an object expression's method is not rewritten, its `XXX` test owed as review-routed.1 below. | and review-routed.1's test for row 865.
- PLAN.md:653, under "Off the path, parked > Climb batch 24, listed for his review", 1179 characters, names row 865: - review-routed.1 of climb batch 24's merged-diff review, a test owed, not a question, for the next batch that edits the natives' rewrite or row 865: row 865 (on the compiled path a `builtinPrimitive` string naming a helper in a local function or an object expression's method is not rewritten, 'Variable builtinPrimitive is not defined.') has reproducer `none`, and its notes owe a compiled `XXX` test.
- PLAN.md:654, under "Off the path, parked > Climb batch 24, listed for his review", 1077 characters, names row 866: - review-routed.2 of climb batch 24's merged-diff review, a test owed, not a question, for the next batch that edits the compiled path's integer types or row 866: row 866 (a program's `object MyNum extends ZZ32` compiles, and its run dies at class load, 'IncompatibleClassChangeError: ...

## The lines that look stale at c3a16b0bc

From `plan-moves.py --stale-at c3a16b0bc`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:98, under "Phase 5. microGPT compiles": list: against the queue's "Before microGPT compiles", it lacks 323, 324, 325, which the queue's list holds. The line: - His answers needed before microGPT compiles: review-queue items 3, 6, 29, 31, 37, 50, 54, 58, 93, 158, 159, 206, 216, 223, 237, 263, 277, 284 and 320 (the que
LOOK PLAN.md:190, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280c "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: a resume gives each unfinished agent the retry's head, which names its earlier launch's transcript
