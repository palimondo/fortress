<!-- The record-landing workflow's evidence of PLAN.md at 00bde0ee4: its headings, the lines that the batch added (a1c244be3..295c215c2) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

# PLAN.md

Print a section with `facts-extract.sh 'doc:explorations/coordinator/PLAN.md#HEADING'`, from the worktree.

## Its headings, with their lines

- 7: Where we stand (8 lines)
- 15: The principle for the batches (6 lines)
- 21: The phases (2 lines)
  - 23: Phase 1. Batch 5: what is decided and shares nothing (4 lines)
  - 27: Phase 2. Batch 6: the tower flips, the specification with it (4 lines)
  - 31: Phase 2b. The repair batch from the conformance reviews (4 lines)
  - 35: Phase 3. The checker at a true zero (6 lines)
  - 41: Phase 4. The switch-over (62 lines)
  - 103: Phase 5. microGPT compiles (20 lines)
  - 123: Phase 6. microGPT fast (13 lines)
- 136: Pavol's answers, in the order they are needed (93 lines)
- 229: Work that can start now, with no decision (23 lines)
- 252: Off the path, parked (46 lines)
  - 298: Phase 3's candidates at its end (23 lines)
  - 321: Climb batch N's first run, listed for his review (9 lines)
  - 330: Climb batch 6.5b, listed for his review (10 lines)
  - 340: Climb batch 7b, listed for his review (21 lines)
  - 361: Climb batch 8, listed for his review (17 lines)
  - 378: Climb batch 9, listed for his review (27 lines)
  - 405: Climb batch 10, listed for his review (16 lines)
  - 421: Climb batch 11, listed for his review (13 lines)
  - 434: Climb batch 12, listed for his review (15 lines)
  - 449: Climb batch 13, listed for his review (21 lines)
  - 470: Climb batch 14, listed for his review (16 lines)
  - 486: Climb batch 15, listed for his review (20 lines)
  - 506: Climb batch 15b, listed for his review (4 lines)
  - 510: Climb batch 16, listed for his review (10 lines)
  - 520: Climb batch 17, listed for his review (14 lines)
  - 534: Climb batch 18, listed for his review (15 lines)
  - 549: Climb batch 19, listed for his review (20 lines)
  - 569: Climb batch 20, listed for his review (16 lines)
  - 585: Climb batch 21, listed for his review (18 lines)
  - 603: Climb batch 21b, listed for his review (12 lines)
  - 615: Climb batch 22, listed for his review (13 lines)
  - 628: Climb batch 22c, listed for his review (22 lines)
  - 650: Climb batch 23, listed for his review (12 lines)
  - 662: Climb batch 24, listed for his review (16 lines)
  - 678: Climb batch 25, listed for his review (16 lines)
  - 694: Climb batch 26, listed for his review (17 lines)
  - 711: Climb batch 27, listed for his review (22 lines)
  - 733: Climb batch 28, listed for his review (24 lines)
  - 757: Climb batch 29, listed for his review (29 lines)
  - 786: Climb batch 29b, listed for his review (15 lines)
  - 801: Climb batch 30, listed for his review (14 lines)
  - 815: Climb batch 32, listed for his review (22 lines)
  - 837: Climb batch 31, listed for his review (30 lines)
  - 867: Climb batch 31b, listed for his review (16 lines)
  - 883: Climb batch 33, listed for his review (15 lines)
  - 898: Climb batch 33b, listed for his review (12 lines)
  - 910: Climb batch 34, listed for his review (14 lines)
  - 924: Climb batch 34b, listed for his review (9 lines)
  - 933: Not classified, to check (13 lines)
- 946: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 963: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 975: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, a1c244be3..295c215c2

- PLAN.md:9, under "Where we stand":

- **Runs.** microGPT runs under walk: its quick walk check gave both programs 7 of 7 at every landing from climb batch 11 to climb batch 32, at both runs of climb batch 31, at both runs of climb batch 33 and at climb batch 34's run 1 (each gate's `summary.txt`, its `# microgpt-walk` line; `compile-ladder/climb-batch-31/gate/summary.txt`; for climb batch 31b, climb batch 33 and climb batch 33b, their commit stages, `reviews/batch-31b-review.md`, `reviews/batch-33-review.md` and `reviews/batch-33b-review.md`, section 4; for climb batch 34, its commit stage, `reviews/batch-34-review.md`, section 5). The 52 team demos reach their end, except that `Generator2Demo` stops with `IntegerOverflow` on some of its random data, on the base too: 52 of 52 on the merged trees of climb batch 34's run 1, of both runs of climb batch 33, of climb batch 32 and of both runs of climb batch 31 at their gathers, and 51 of 52 on climb batch 30's (F-283; row 986; `compile-ladder/climb-batch-31/RECORD.md`, `compile-ladder/climb-batch-31b/RECORD.md`, `compile-ladder/climb-batch-33/RECORD.md`, `compile-ladder/climb-batch-33b/RECORD.md` and `compile-ladder/climb-batch-34/RECORD.md`, "The tests on the merged tree"). Walk is not timed (`coordinator/PLAN-history.md`, "The timed pairs of the walk check dropped, 2026-10-23"). On the compiled path microGPT's 18 components stop at name resolution until the switch-over (F-97). Under `FORTRESS_LIBRARY=one` the compile command reads the one library, and since climb batch 34b a program compiled so can run, as one that prints a line of text does, against the one library's jars, which the onelibrary track compiles first (F-381, F-396; rows 874 and 1062 closed); a varargs call, `println` of a number and `=` of two strings do not run yet (rows 1091, 1098 and 994). In a scratch tree switched onto the one library, three small programs ran compiled, one that prints a line, one over an `Array1` and a dot product in the program's own loop; no matrix, none of the library's own array algebra and no microGPT (F-352). The scratch tree's hacks did not land as such.

- PLAN.md:924, under "Off the path, parked > Climb batch 34b, listed for his review":

### Climb batch 34b, listed for his review

- PLAN.md:926, under "Off the path, parked > Climb batch 34b, listed for his review":

The items for him that climb batch 34b, run 2 of `coordinator/CLIMB-BATCH-34.md` (rung C, landed), left (`compile-ladder/climb-batch-34b/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"), and the reserved points its rung reached, each landed at its default. None holds a launch.

- PLAN.md:928, under "Off the path, parked > Climb batch 34b, listed for his review":

- C.worker.1 and C.skeptic.1 of climb batch 34b's rung C (row 1098, `CONTESTED`): which export rule holds? The text asks that the parameter types of the satisfying declarations together make up the exported declaration's, so the one library's component would declare `print`, `println` and `errorPrintln` at `Number` and `Boolean`; the team note beside it lets a wider declaration satisfy it, as the checker does, so the code generator would call or bridge to that covering declaration. Until one is chosen, a compiled `println(q)` of a `QQ` against the one library dies, 'NoSuchMethodError', where walk prints the half; row 834 asks the same of return types. No default on record; as landed, neither rule built, the row `CONTESTED` with its expected failure. Evidence: `Specification/basic/components/source-code.tex:356-361`, `:364-369`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:281-285`; `Library/FortressLibrary.fsi:2725-2730` against `Library/FortressLibrary.fss:4798-4810`; `ProjectFortress/one_library_tests/XXXOneLibraryRunHalf.test:1-4`.

- PLAN.md:929, under "Off the path, parked > Climb batch 34b, listed for his review":

- C.worker.2, C.skeptic.2 and C.skeptic.3 of climb batch 34b's rung C, with fork C3 (rows 1101 and 1102): how is `FValue.asString` typed in each set of run-time classes? Fork C3 types it at `FValue` in both; the rung did so in the second set only, since in the first it made `compiler_tests/Compiled17a` die: compiled generic code reaches a number's `asString` through the payload class's bridge, typed at the prelude's `String`. In the second set the same bridge leaves a generic `u.asString` at `U extends ZZ32` without a method (row 1101), and an uncaught exception's report and every Java `toString` of a one-library value read the run time's placeholder (row 1102); typing it at the library's `String` fixes both in a scratch run, but makes `FValue.toString` recurse on a `CatString`, whose `asString` is itself. The ways: that typing with a `toString` that reads a non-flat string; the code generator calling a number's getter through the object's class in place of the payload class's bridge, for one set or both; or keep. Default: kept, as landed, the first set at the prelude's `String` and the second at `FValue`. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:27`; `ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/FValue.java:27-33`; `Library/FortressLibrary.fss:4599`; `ProjectFortress/one_library_tests/XXXOneLibraryRunGenericAsString.test:1-4`; `explorations/compile-ladder/rung-first-run-one-library/SKEPTIC.md:42-46`.

- PLAN.md:930, under "Off the path, parked > Climb batch 34b, listed for his review":

- C.skeptic.4 of climb batch 34b's rung C (row 994): fork B2's premise, that only `Arr` and `Dot` meet row 994, does not hold on the compiled one library: every `=` of two strings or two booleans and every `<` of two strings meets it, with the verifier on. Does row 994's repair, four places in `OverloadSet.java`, come before the batch after? Default: in the batch after, as item 1 of the record's list for it puts rows 994 and 1091 first. Evidence: `explorations/coordinator/CLIMB-BATCH-34.md:395`, `:343`; `ProjectFortress/one_library_tests/XXXOneLibraryRunStringEquality.test:1-4`; `explorations/fortress-gap-ledger.md:1060`.

- PLAN.md:931, under "Off the path, parked > Climb batch 34b, listed for his review":

- Rung C of climb batch 34b, its reserved points, each a run test against the one library that runs and prints another line than walk, landed at its default (as landed); on the base each program died at its first class of the one library, 'NoClassDefFoundError: fortress/FortressLibrary$String'. C.reserved.1: a program whose `IntegerOverflow` no `catch` takes prints walk's 'REACHED' and exits non-zero with 'FortressException: class fortress.FortressLibrary$IntegerOverflow with string Bogus value from FValue.asString()' on standard error, where walk reports 'IntegerOverflow' with its context (row 1102). C.reserved.2: a program that compares a caught `IntegerOverflow` with its object by `SEQV` prints 'FAIL: the caught IntegerOverflow is the object IntegerOverflow' after 'REACHED', where walk prints 'PASS', since the run time makes a second instance of an exception object that a helper raises, as it does against the prelude on the base (row 1103). Evidence: `ProjectFortress/one_library_tests/OneLibraryUncaughtRaise.test:7`; `ProjectFortress/one_library_tests/XXXOneLibraryRunHelperRaiseSingleton.test:1-4`; `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:49-51`, `:66-69`; `explorations/compile-ladder/rung-first-run-one-library/SKEPTIC.md:34-35`.


## The lines added after the landing, 295c215c2..00bde0ee4

None.

## The other lines that name a changed entry or row

- PLAN.md:10, under "Where we stand", 6070 characters, names F-34, F-53, F-381, F-388, F-390 and row 874: At the last landed gate, climb batch 34's (`285efad802`, its run 1, its gate on `3ccd236f01`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53; | Climb batch 33's run 1 built the library selector, under which the compile command reads the one library (F-381), and refused a `typecase` arm at an undefined name on both paths (F-382); | Climb batch 33b, its run 2, built the prelude's seven number types as value objects over hand-written payload classes (F-388), one class name for each function expression at a shared span (F-389), varargs under the selection (F-390) and a method of an imported api's trait found by its api (F-391); | F-379, F-388). | The code generator refuses no declaration of the fourteen components on climb batch 34's landed code, against 1 on climb batch 33b's, `__bigOperator2` (row 1076), measured on a patched scratch tree, since on the tree as it stands it stops three components whole at row 874 (F-34;
- PLAN.md:12, under "Where we stand", 3449 characters, names F-352, F-353, F-388: The rehearsal of the switch-over met sixteen walls on the way to three small compiled programs against the one library (F-352; | Probe Y showed one build serving both libraries, which the second order needs (F-353). | F-388;
- PLAN.md:13, under "Where we stand", 2029 characters, names F-34: F-34).
- PLAN.md:37, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:55, under "The phases > Phase 4. The switch-over", 826 characters, names row 1062: The list for the batch after is the record's (`coordinator/CLIMB-BATCH-33.md`, "For the batch after, in this order"), and the review adds rows to it (`reviews/batch-33-review.md`, Part 4 and Part 5): row 1062, a program compiled under the selector does not run, with item 1, whose first program that runs on the one library is its test (`one_library_tests/XXXOneLibraryRunHalf`);
- PLAN.md:65, under "The phases > Phase 4. The switch-over", 2226 characters, names F-352 and row 874: the rehearsal carried it in `FJavaString` by a hack, and its class cannot be stubbed in Java under the component's name (F-352; | With N5 goes row 874: in the one library's world the code generator refuses the whole of `FortressLibrary` and `FortressBuiltin` at the wrappers of the helper classes that their bindings name (`reviews/batch-25-review.md`, Part 4, "New rows"). | Beside row 874 goes row 368, the wrapper generator's refusal of a helper class with a method whose type has no Fortress counterpart, since the names work gives the helpers' types their Fortress names.
- PLAN.md:70, under "The phases > Phase 4. The switch-over", 2703 characters, names F-34 and row 874: ...- The code generator over the one library (F-34): under the switch-over's setting it refuses no declaration of the fourteen components on climb batch 34's landed code (`285efad802`), 754 emitted, with no component failure, against 1 on climb batch 33b's (... | `compile-ladder/plan-31/probes/planner/codegen-measure.sh` patches a scratch worktree first, since the tree as it stands stops three components whole at row 874, so the count cannot be taken before the names work or without that patch. | The judgement calls this phase 4's second zero, the code generator's over the same components as the checker's (section 6): it is reached on the patched scratch tree, and on the tree as it stands row 874's wrappers are the one wall, which climb batch 34b takes.
- PLAN.md:71, under "The phases > Phase 4. The switch-over", 563 characters, names F-390: F-390;
- PLAN.md:72, under "The phases > Phase 4. The switch-over", 3255 characters, names F-352, F-381, F-388 and rows 874, 994, 995, 1062: - What the rehearsal met and no other line of this phase holds (F-352; | The selector is on `main` since climb batch 33's rung S (F-381): under `FORTRESS_LIBRARY=one` the compile command reads the one library, and a program compiled so does not run yet (row 1062). | F-388; | F-388). | Walls that only the switch shows: the carriers beyond N5's table, that is the types that are objects in the one library (`Boolean`, `Char`, `NN32`, `RR32`, `FlatString`), the second name that a carried type other than the seven number types has in its RTTI (row 995), the two array stores with no compiled value (row 874) and the Java stubs; | the dispatch method's package in `OverloadSet` (row 994); | row 874 goes with its run 2, climb batch 34b, and row 994 is item 1 of its list for the batch after (`coordinator/CLIMB-BATCH-34.md`, "For the batch after, in this order").
- PLAN.md:73, under "The phases > Phase 4. The switch-over", 1552 characters, names F-388: F-388).
- PLAN.md:101, under "The phases > Phase 4. The switch-over", 2047 characters, names F-353: probe Y puts the second road's extra cost at two rungs, perhaps three, and about 200 s a gate, F-353).
- PLAN.md:117, under "The phases > Phase 5. microGPT compiles", 487 characters, names F-390: against the prelude varargs stays refused (F-390).
- PLAN.md:720, under "Off the path, parked > Climb batch 27, listed for his review", 240 characters, names F-336: - W.skeptic.3 of climb batch 27's rung W: should the library's exceptions carry the helper's message? Since climb batch 28's rung H a compiled helper's raise carries it and walk's does not (F-336).
- PLAN.md:824, under "Off the path, parked > Climb batch 32, listed for his review", 286 characters, names row 1017: - N.worker.2, N.skeptic.1 and N.skeptic.3 of climb batch 32's rung N (row 1017): the numeral converted into `NN32` for `w = 0` with `w: NN64`, a numeral beside a bare type parameter, and `y = 300` for a program's `Byte`.
- PLAN.md:905, under "Off the path, parked > Climb batch 33b, listed for his review", 801 characters, names row 1062: row 1062 names the mismatch.

## The lines that look stale at 00bde0ee4

From `plan-moves.py --stale-at 00bde0ee4`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 512, 515, 577. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:72, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - What the rehearsal met and no other line of this phase holds (F-352; `compile-ladder/plan-31/probes/switch-rehearsal.md`, section 6). Walls that only the swit
LOOK PLAN.md:73, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - The merge of the five number types with their objects, before the switch-over, on both paths (P-178; row 1003): each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64
LOOK PLAN.md:95, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:250, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on
