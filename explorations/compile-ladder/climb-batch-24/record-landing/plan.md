<!-- The record-landing workflow's evidence of PLAN.md at 43cd61b62: its headings, the lines that the batch added (b0f6cd6b7..25238e60c) or that came after the landing, and the other lines that name a changed entry or row, written by evidence.py. -->

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
  - 43: Phase 4. The switch-over (39 lines)
  - 82: Phase 5. microGPT compiles (18 lines)
  - 100: Phase 6. microGPT fast (9 lines)
- 109: Pavol's answers, in the order they are needed (56 lines)
- 165: Work that can start now, with no decision (28 lines)
- 193: Off the path, parked (42 lines)
  - 235: Phase 3's candidates at its end (22 lines)
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
  - 497: Climb batch 18, listed for his review (17 lines)
  - 514: Climb batch 19, listed for his review (22 lines)
  - 536: Climb batch 20, listed for his review (19 lines)
  - 555: Climb batch 21, listed for his review (23 lines)
  - 578: Climb batch 21b, listed for his review (13 lines)
  - 591: Climb batch 22, listed for his review (15 lines)
  - 606: Climb batch 22c, listed for his review (23 lines)
  - 629: Climb batch 23, listed for his review (19 lines)
  - 648: Climb batch 24, listed for his review (15 lines)
  - 663: Not classified, to check (22 lines)
- 685: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 702: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 714: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, b0f6cd6b7..25238e60c

- PLAN.md:143, under "Pavol's answers, in the order they are needed":

Before `FlatString`'s five bindings move onto helpers, raised by climb batch 24 (`compile-ladder/climb-batch-24/RECORD.md`):

- PLAN.md:145, under "Pavol's answers, in the order they are needed":

63. W.worker.1 and W.skeptic.1 of climb batch 24's rung W: when `FlatString`'s five glue bindings move onto helpers (the record's fork 17), should walk's loader identify the declaring type of a method by its declaration rather than by its name? Rung W gives `FlatString` and `JavaString` no carrier of `self`, since a program can give its own type either name and the name check would let it pass (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:88`; `ProjectFortress/tests/NativeHelperUncarriedSelfFlatStringWalk.fss:5-7`), so on this tree a library binding to a helper in a method of `FlatString` would stop every program at load. The way not taken in the rung: an identity check of the declaring type, by its declaration's file or against the library's environment, heavier and dependent on the source path or the order of loading. No default on record. Evidence: `compile-ladder/rung-natives-self/REPORT.md:252`.

- PLAN.md:648, under "Off the path, parked > Climb batch 24, listed for his review":

### Climb batch 24, listed for his review

- PLAN.md:650, under "Off the path, parked > Climb batch 24, listed for his review":

The items for him that climb batch 24 (`coordinator/CLIMB-BATCH-24.md`, rungs F, Z, S, K, W, G and H, phase 4's second batch, the natives' next families with the code generator's header `where` clauses) left (`compile-ladder/climb-batch-24/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"). One line for each point, opening with the ids it holds: what is asked or told, its default, and where its evidence is. Each is built at a default or needs none, and each is reversible. Rung W's question, which must be answered before `FlatString`'s five bindings move, is item 63 under "Pavol's answers, in the order they are needed".

- PLAN.md:652, under "Off the path, parked > Climb batch 24, listed for his review":

- F.worker.1 and F.skeptic.1 of climb batch 24's rung F (row 863, `CONTESTED`): does "For floating-point results, division by zero produces a NaN value according to the rules of IEEE 754." (`Specification/basic/operators/opr-overview.tex:167-168`, as in the Working Draft) mean NaN, or IEEE 754's infinity for a nonzero dividend, which both paths give and the team's `infinity : RR64 = 1.0 / 0.0` (`Library/Constants.fss:17`) and `ProjectFortress/tests/realArith.fss:78` rely on? Default: the row `CONTESTED`, neither of rung F's guards asserting a nonzero value divided by zero; if IEEE 754 governs, a later prose rung revises the sentence. Evidence: `compile-ladder/rung-natives-float/REPORT.md:114`.

- PLAN.md:653, under "Off the path, parked > Climb batch 24, listed for his review":

- K.worker.1 and K.skeptic.1 of climb batch 24's rung K, told, not asked: P-73's last clause, "and at `CHOOSE` (row 521)" (`coordinator/POSITIONS.md:80`), is false once rung K lands, since the compiled `CHOOSE` past its table raises `IntegerOverflow` (`compiler_tests/ChooseTableCompiledRungE` passes, 'OK (7 tests)'); the decision stands, and only the clause goes. Default: none on record; the entry stands until he rewords it, or the record pass on his word. Evidence: `compile-ladder/rung-natives-choose/REPORT.md:258`.

- PLAN.md:654, under "Off the path, parked > Climb batch 24, listed for his review":

- Z.worker.1 and Z.skeptic.1 of climb batch 24's rung Z: is walk's `unsigned` of a negative `ZZ64` (and `ZZ32`) specified? `Specification/basic-lib/basic-integers.tex:36-45` names only `narrow`'s wrap and says that every other conversion is written explicitly, with no result for `unsigned` of a negative value; today `unsigned(-1)` on `ZZ64` is 18446744073709551615 on both codes, and climb batch 23's guard asserts `unsigned(-1) = 4294967295` on `ZZ32` (`ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss:45`), where rung Z's guard leaves it unasserted by the record's fork 5 (`ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss:76-77`). Beside item 31 and row 856, whose notes leave keep-the-low-bits-or-raise to row 502. Default: none on record; today's values stand. Evidence: `compile-ladder/rung-natives-integers/REPORT.md:162`.

- PLAN.md:655, under "Off the path, parked > Climb batch 24, listed for his review":

- S.worker.1 and S.skeptic.1 of climb batch 24's rung S (row 857): which answer does the one library's `char` take for a code point outside 0 to 1114111? Walk's `char` keeps the value (`Library/FortressLibrary.fss:4540`, naming `nativeHelpers/simpleChar.java:63`, as the glue class `Char$Chr` did), and so does a compiled binding of the same helper ('cp  122   55296   1114111   -1   1114112'), so after the switch-over both paths keep it; the compiler's prelude's `makeCharacter` raises `IntegerOverflow` there, "Really should be IndexOutOfRange" (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1058-1062`); the specification names no such conversion. Ways: keep the value, raise `IntegerOverflow` as the prelude does, or raise another exception. Default until asked: today's behaviour, pinned by `ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss`. Evidence: `compile-ladder/rung-natives-small/REPORT.md:223`.

- PLAN.md:656, under "Off the path, parked > Climb batch 24, listed for his review":

- G.skeptic.1 of climb batch 24's rung G (row 867): a function or method whose own `where` clause introduces a `where`-clause variable was refused at compile on the base ('Don't know how to compile this kind of FnDecl.'); it now compiles and links, and its compiled call dies with `NoClassDefFoundError` (`ProjectFortress/compiler_tests/XXXWhereVariableCallCompiled.fss:16-21`). Should the code generator keep refusing that form at compile time, by testing `header.getWhereClause().unwrap().getBindings()` in `forFnDecl`'s guard (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2966`), until the template carries the variable? Default: as landed, the deferred `XXX` run pair, the record's course for the trait guard's `VerifyError` (fork 13); no library declaration has the form (`Library/SkipList.fss:103` holds one in a comment). Evidence: `compile-ladder/rung-codegen-where/SKEPTIC.md:115`.

- PLAN.md:657, under "Off the path, parked > Climb batch 24, listed for his review":

- gather.1 of climb batch 24, told, not asked: rung G makes two sentences of POSITIONS false. P-151's "Row 701: the code generator's half." (`coordinator/POSITIONS.md:63`) and P-156's "after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701)" (`coordinator/POSITIONS.md:67`): the code generator compiles a declaration whose own header carries a `where` clause (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2966-2972`, `:4103-4111`, `:5022-5027`; `ProjectFortress/compiler_tests/WhereBoundMethodCompiled.fss`), and row 701 keeps only the contract half. The decisions stand. Default: none on record; each sentence stands until he rewords it. Evidence: `compile-ladder/rung-codegen-where/REPORT.md:122-141`.

- PLAN.md:658, under "Off the path, parked > Climb batch 24, listed for his review":

- H.worker.1 and H.skeptic.1 of climb batch 24's rung H: the steps owed for rung C's limits, review-routed.1 and the post-batch review's finding 5 (the two entries under "Climb batch 23, listed for his review" above), are owed to "the next rung that edits the natives' rewrite", and rung H edits it (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:97-159`) but did not take them, since its section does not name them. Does the step stay with the next rung that edits the rewrite, or come to rung H as a follow-up? Default: the next rung that edits the rewrite, as the batch record says; its sentence (`coordinator/CLIMB-BATCH-24.md:431`) is corrected to say so. Evidence: `compile-ladder/rung-natives-hard/REPORT.md:163`.

- PLAN.md:659, under "Off the path, parked > Climb batch 24, listed for his review":

- review-routed.1 of climb batch 24's merged-diff review, a test owed, not a question, for the next batch that edits the natives' rewrite or row 865: row 865 (on the compiled path a `builtinPrimitive` string naming a helper in a local function or an object expression's method is not rewritten, 'Variable builtinPrimitive is not defined.') has reproducer `none`, and its notes owe a compiled `XXX` test. The specification's printed comment settles it ("The compiler, before type checking, rewrites the body into a call of the helper", `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19`), and the compile's refusal is observable, so it is home 2 (`.claude/skills/fortress-repo/references/tests-writing.md`, "How a defect is recorded", item 2). Owed: an `XXX` compile test over the row's program, a `run()` that declares the local `g(x: ZZ32): ZZ32` bound to `simpleIntArith.intNeg` and prints `g(4)`, with `compile` and `compile_err_contains=Variable builtinPrimitive is not defined`, seen through `junit.sh`, and the row's reproducer set to it. It holds nothing. Evidence: `explorations/fortress-gap-ledger.md:875`; `compile-ladder/rung-natives-self/SKEPTIC.md:108`, `:119`.

- PLAN.md:660, under "Off the path, parked > Climb batch 24, listed for his review":

- review-routed.2 of climb batch 24's merged-diff review, a test owed, not a question, for the next batch that edits the compiled path's integer types or row 866: row 866 (a program's `object MyNum extends ZZ32` compiles, and its run dies at class load, 'IncompatibleClassChangeError: ... can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface') has reproducer `none`, and its notes owe a compiled `XXX` pair. A program that the checker accepts and that fails linkage at run time is home 2 (`.claude/skills/fortress-repo/references/tests-writing.md`, "How a defect is recorded", item 2). Owed: the run pair over the row's program, `NameLink.test` with `link` and `XXXName.test` with `run` and `run_out_does_not_contain=REACHED`, since the skeptic's run died at class load before its first `println` ('before' not printed; "Writing an `XXX` test"), run in one call of `junit.sh`, and the row's reproducer set to it. It holds nothing. Evidence: `explorations/fortress-gap-ledger.md:876`; `compile-ladder/rung-natives-self/SKEPTIC.md:109`.

- PLAN.md:661, under "Off the path, parked > Climb batch 24, listed for his review":

- review-routed.3 of climb batch 24's merged-diff review, a test owed, not a question, for the next batch that edits the checker's overloading check or row 871: row 871 has reproducer `none`, its notes saying that no gated test can pass while the checker accepts its first pair, `pick[\U\](u: U): String where { U extends Named }` beside `pick(z: ZZ32): String`. Its second face, which rung G's skeptic added, can be pinned: the checker refuses `h[\U\](u: U): String where { U extends A }` beside the same with `B`, `A excludes { B }`, 'There are multiple declarations of h with the same parameter type: U', where P-151 makes the pair its header twin, which the checker accepts. Owed: an `XXX` compile test of that pair with `compile` and `compile_err_contains=There are multiple declarations of h with the same parameter type`, seen through `junit.sh`, and the row's reproducer set to it (`.claude/skills/fortress-repo/references/tests-writing.md`, "Writing an `XXX` test", the refusal at compile time). It holds nothing. Evidence: `explorations/fortress-gap-ledger.md:498`; `compile-ladder/rung-codegen-where/SKEPTIC.md:56-58`.


## The lines added after the landing, 25238e60c..43cd61b62

None.

## The other lines that name a changed entry or row

- PLAN.md:9, under "Where we stand", 1125 characters, names F-299: At climb batch 23's landing, the first at which walk's `ZZ32` arithmetic runs through helpers of `nativeHelpers/` (F-299), both programs gave '7 PASS, 0 FAIL of 7' (`reviews/batch-23-review.md`, section 5), and all 52 team demos ran to their end under walk on its merged tree (F-283;
- PLAN.md:11, under "Where we stand", 2864 characters, names F-32, F-53, F-240, F-298, F-299 and row 336: F-53, F-288, F-289), now with the 21 bindings that name helpers read as calls of their helpers and checked against the helpers' Java signatures; | F-298; | F-299, F-32; | The count stage took about 155 s and the distance stage 240 s there (F-240). | rows 796 and 336).
- PLAN.md:39, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:45, under "The phases > Phase 4. The switch-over", 543 characters, names F-53, F-298, F-299: review `reviews/batch-23-review.md`): the count 0 and the distance 0 over the fourteen, '#crash none', now with 21 bindings read as calls of their helpers (F-53, F-298, F-299);
- PLAN.md:46, under "The phases > Phase 4. The switch-over", 771 characters, names rows 521, 846: ...23-review.md`, "The steps due before the next batch", 6), its planner sorts into families the 83 bindings left that can name their helper as a bare string, and the 109 that cannot into their ways, and meets row 846 for a binding over `String` (item 62), row 521 for `CHOOSE`, the stand-in table for `NN32`, `NN64` and `Char`, and the distance stage as the only stage that reads `FortressBuiltin`'s bindings.... | ...atch", 6), its planner sorts into families the 83 bindings left that can name their helper as a bare string, and the 109 that cannot into their ways, and meets row 846 for a binding over `String` (item 62), row 521 for `CHOOSE`, the stand-in table for `NN32`, `NN64` and `Char`, and the distance stage as the only stage that reads `FortressBuiltin`'s bindings....
- PLAN.md:47, under "The phases > Phase 4. The switch-over", 1035 characters, names F-32, F-299: Every native binding becomes a `builtinPrimitive` call naming a static helper of `nativeHelpers/`, which both paths run (P-58), since the compiled path cannot reuse walk's glue classes (F-32). | D2, 42 with no compiled analogue (F-32; | Since climb batch 23, 21 bindings name helpers and 428 still name glue classes (F-299).
- PLAN.md:48, under "The phases > Phase 4. The switch-over", 286 characters, names F-298, F-299: The compiled path rewrites such a body at the parse into a call of its helper, on every repository but walk's, the gate's two stages among them (F-298; | walk loads the helper beside its glue classes (F-299).
- PLAN.md:49, under "The phases > Phase 4. The switch-over", 751 characters, names F-32, F-299: N1's first family moved 21 of the 104: 19 of `ZZ32`'s operators and functions and `Int`'s `asString` and `asExprString` (F-299). | F-32).
- PLAN.md:51, under "The phases > Phase 4. The switch-over", 1167 characters, names rows 336, 521, 846, 847, 848: - The families that wait on a known obstacle, each with its home: `ZZ32`'s `CHOOSE` with row 521's helper fix, since its helper ends walk's run past its table; | the bindings over `String` after his answer to item 62 (row 846; | row 336's rest, `REM` and `MOD` by zero (new helpers, N3) and `ZZ64`'s and `ZZ`'s `DIV` (their families' rungs), with row 848, its siblings on `NN32`, `NN64` and `ZZ`, each on its helper or by a zero test; | row 847, a helper string in a method of a type that no Java type carries, which walk loads, a walk rung's fix that tells the loader the declaring type and refuses such a binding at load;
- PLAN.md:52, under "The phases > Phase 4. The switch-over", 801 characters, names row 521: `CHOOSE` past its helper's safe-bound table raises `IntegerOverflow` (row 521);
- PLAN.md:55, under "The phases > Phase 4. The switch-over", 221 characters, names F-32: - N4, D1's 36, the I/O objects: a Java-backed writer type and `stdOut` first, since every program's `println` writes through `Writer`'s natives (F-32), then `File`'s 15 and `Reader`'s 10 (`natives-shape.md`, section 3).
- PLAN.md:57, under "The phases > Phase 4. The switch-over", 144 characters, names F-32: P-84, P-85), and `Thread`, `Reflect` and `printTaskTrace`, off microGPT's path (F-32).
- PLAN.md:59, under "The phases > Phase 4. The switch-over", 1564 characters, names F-34 and row 701: - The code generator over the one library (F-34): under the switch-over's setting it refuses 52 declarations of the library's twelve components, all of them declarations that the checker passes, measured once on climb batch 22's code (`reviews/phase3-exit/zero-audit.md`, "Part C. | ...each kind has a ledger row, among them a local function (row 304), varargs (row 624), "Not in the trait table" (row 733), a header `where` clause (row 701), and rows 818 to 823, `asif`, a postfix operator on a tuple operand, `Any` as a static argument in an `extends` clause, `try` with `forbid`, the kind env in a generic function's `typecase` and the `test` ...
- PLAN.md:60, under "The phases > Phase 4. The switch-over", 789 characters, names row 701: - Row 701, the code generator's refusal of a declaration whose own header carries a `where` clause: five walls in the twelve, four of them lines the revival added, `SumReduction`'s `distribute`s (P-151), `BoundedRange.atMost` (P-156) and `AnyList`'s and `NatParam`'s restored `comprises ...
- PLAN.md:62, under "The phases > Phase 4. The switch-over", 892 characters, names F-53: F-53's definition is unchanged (`reviews/batch-23-review.md`, finding 6).
- PLAN.md:63, under "The phases > Phase 4. The switch-over", 940 characters, names F-32: F-32), which `natives-shape.md` puts with `NativeArray` after the switch-over (section 3).
- PLAN.md:141, under "Pavol's answers, in the order they are needed", 469 characters, names row 846: W.worker.1 and W.skeptic.1 of climb batch 23's rung W (row 846): under walk a native bound over `String`, glue class or helper alike, receives a non-flat string's type name in place of its characters; | the next family that moves such a binding meets row 846.
- PLAN.md:156, under "Pavol's answers, in the order they are needed", 621 characters, names F-270: A size known only at run time: built at 4a, the judgement's default, while his answer is pending (F-270, the opening as built);
- PLAN.md:183, under "Work that can start now, with no decision", 1619 characters, names F-34, F-53, F-240, F-281: the commit stage searched for them in each run, in climb batch 22 swapped F-53's numbers by word over its list of the five sites ("Its 0 are:"), and left F-240 false for a third landing. | Name F-53, F-66 and F-240 by number in the commit stage's brief (`coordinator/climb-batch-workflow.js:1360`) and the manual; | have the stage write F-240's two figures from `distance.txt` and the count stage's call times, and hand F-53's sentences that list the sites, and the other entries that a zero or a moved figure makes false (in climb batch 22, F-281, F-34, F-245 and F-61), to the coordinator. | Met at a fourth landing in climb batch 22c: the commit stage named F-240 false and left it, and FACTS was brought to the gate after the post-batch review (`6985743ce`; | Met at a fifth landing in climb batch 23: the commit stage changed F-53's title to name the batch and named F-240 false and left it, and F-240 was brought to the gate after the post-batch review (`1e6a93a04`;
- PLAN.md:233, under "Off the path, parked", 574 characters, names F-298: - Row 845, from climb batch 23's rung C's skeptic: under walk a component that writes `import java` of a helper now stops at F-180's gap 3, 'Non-top-level reference to imported …', where it stopped at gap 1, since fork 5's stand-in reading reaches walk's own repository (F-180, F-298).
- PLAN.md:253, under "Off the path, parked > Phase 3's candidates at its end", 2373 characters, names rows 677, 701, 812: Landed by climb batch 17 (phase 3, item 15): a method's `where` condition as a bound (row 677) with the team's generic `distribute` over its own `K` (row 433), `SUM`'s fusion with `MAX` and `MIN` kept (F-250); | and the code generator's half (row 701), in phase 4 before the names batch (phase 4, row 701's line), with row 812 beside it, the code generator's crash before that refusal on a generic trait that defines a member of a trait whose `comprises` clause lists a type at a `where`-clause variable.
- PLAN.md:450, under "Off the path, parked > Climb batch 15, listed for his review", 2469 characters, names rows 307, 336, 701: Climb batch 17's gather met the same limits (its gather.1): nine of the records' notes refused (rows 682, 701 and 307 of rung A, 373 and 101 of rung G, 744 and 567 of rung W, 727 and 675 of rung C) and four with no room by the records (rows 510, 364, 723 and 307 of rung W), their texts in `compile-ladder/climb-batch-17/RECORD.md:165-183`; | Climb batch 18's gather met the same limits (its gather.1): eleven of the records' notes refused, rows 470 and 701 (full) and 677 (closed) of rung K, and row 21 (closed) and rows 539, 713, 550, 740, 219, 416 and 364 (full) of rung W, their texts in `compile-ladder/climb-batch-18/RECORD.md:140-155`. | Climb batch 20's gather met the same limits (its gather.1): five of the records' notes refused, rows 441, 523, 533 and 336 (full) of rung I and row 465 (full) of rung A, their texts in `compile-ladder/climb-batch-20/RECORD.md`, "Ledger notes not written";
- PLAN.md:508, under "Off the path, parked > Climb batch 18, listed for his review", 359 characters, names F-181 and row 701: F-181 says what is measured. | - X.worker.5 of climb batch 18's rung X, with the fourth of X.skeptic.3's points: row 701's claim overstates, since the code generator compiles a declaration whose `extends` entry carries a `where` clause;
- PLAN.md:511, under "Off the path, parked > Climb batch 18, listed for his review", 942 characters, names rows 677, 701: - gather.1 of climb batch 18's gather: eleven of the records' ledger notes refused, for length or a closed row: walk's renamed refusal for rows 539, 713, 550, 740, 219 and 416, row 364 left as it was, row 470's `where`-clause variables cleared by written static arguments, row 701's compile stop, and rows 677 and 21, closed;
- PLAN.md:631, under "Off the path, parked > Climb batch 23, listed for his review", 1453 characters, names row 336: then, from its post-batch review (`reviews/batch-23-review.md`, finding 1 and Part 4), the record's two questions, taken at their defaults with his go, the planner's readings on which the zero with the moved bindings rests, the record's forks and its points for his sight, the method that rung C's skeptic added to a team test file, and the steps owed for rung C's other limits and for rows 336 and 848.
- PLAN.md:643, under "Off the path, parked > Climb batch 23, listed for his review", 927 characters, names rows 336, 848: ...- The post-batch review's finding 7 (`reviews/batch-23-review.md`), a step owed, not a question, for the next batch that edits rows 336 or 848: both rows' reproducer is `none`, though `Specification/basic/operators/opr-overview.tex:164-165` settles them ("For integer results, division by zero throws a DivisionByZero."), since rung W's skeptic... | ...ic/operators/opr-overview.tex:164-165` settles them ("For integer results, division by zero throws a DivisionByZero."), since rung W's skeptic took the skill's case "as when walk crashes on the program" for row 848, as row 336 had it (`compile-ladder/rung-natives-walk/SKEPTIC.md:102`).... | .../opr-overview.tex:164-165` settles them ("For integer results, division by zero throws a DivisionByZero."), since rung W's skeptic took the skill's case "as when walk crashes on the program" for row 848, as row 336 had it (`compile-ladder/rung-natives-walk/SKEPTIC.md:102`)....
- PLAN.md:645, under "Off the path, parked > Climb batch 23, listed for his review", 388 characters, names rows 846, 847: `compile-ladder/climb-batch-23/RECORD.md`, "Points to report"), with walk's `ZZ32` `DIV` by zero raising `DivisionByZero` and the two quiet values that a program's own helper binding can now give (rows 846 and 847).
