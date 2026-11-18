<!-- The record-landing workflow's evidence of PLAN.md at 8c13a52ec: its headings, the lines that the batch added (c79985147..ba3c7c876) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

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
  - 41: Phase 4. The switch-over (60 lines)
  - 101: Phase 5. microGPT compiles (20 lines)
  - 121: Phase 6. microGPT fast (13 lines)
- 134: Pavol's answers, in the order they are needed (93 lines)
- 227: Work that can start now, with no decision (23 lines)
- 250: Off the path, parked (45 lines)
  - 295: Phase 3's candidates at its end (23 lines)
  - 318: Climb batch N's first run, listed for his review (9 lines)
  - 327: Climb batch 6.5b, listed for his review (10 lines)
  - 337: Climb batch 7b, listed for his review (21 lines)
  - 358: Climb batch 8, listed for his review (17 lines)
  - 375: Climb batch 9, listed for his review (27 lines)
  - 402: Climb batch 10, listed for his review (16 lines)
  - 418: Climb batch 11, listed for his review (13 lines)
  - 431: Climb batch 12, listed for his review (15 lines)
  - 446: Climb batch 13, listed for his review (21 lines)
  - 467: Climb batch 14, listed for his review (16 lines)
  - 483: Climb batch 15, listed for his review (20 lines)
  - 503: Climb batch 15b, listed for his review (4 lines)
  - 507: Climb batch 16, listed for his review (10 lines)
  - 517: Climb batch 17, listed for his review (14 lines)
  - 531: Climb batch 18, listed for his review (15 lines)
  - 546: Climb batch 19, listed for his review (20 lines)
  - 566: Climb batch 20, listed for his review (16 lines)
  - 582: Climb batch 21, listed for his review (18 lines)
  - 600: Climb batch 21b, listed for his review (12 lines)
  - 612: Climb batch 22, listed for his review (13 lines)
  - 625: Climb batch 22c, listed for his review (22 lines)
  - 647: Climb batch 23, listed for his review (12 lines)
  - 659: Climb batch 24, listed for his review (16 lines)
  - 675: Climb batch 25, listed for his review (16 lines)
  - 691: Climb batch 26, listed for his review (17 lines)
  - 708: Climb batch 27, listed for his review (22 lines)
  - 730: Climb batch 28, listed for his review (24 lines)
  - 754: Climb batch 29, listed for his review (29 lines)
  - 783: Climb batch 29b, listed for his review (15 lines)
  - 798: Climb batch 30, listed for his review (14 lines)
  - 812: Climb batch 32, listed for his review (22 lines)
  - 834: Climb batch 31, listed for his review (30 lines)
  - 864: Climb batch 31b, listed for his review (16 lines)
  - 880: Climb batch 33, listed for his review (15 lines)
  - 895: Climb batch 33b, listed for his review (11 lines)
  - 906: Not classified, to check (13 lines)
- 919: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 936: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 948: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, c79985147..ba3c7c876

- PLAN.md:895, under "Off the path, parked > Climb batch 33b, listed for his review":

### Climb batch 33b, listed for his review

- PLAN.md:897, under "Off the path, parked > Climb batch 33b, listed for his review":

The items for him that climb batch 33b, run 2 of `coordinator/CLIMB-BATCH-33.md` (rungs N, W, G and R, all four landed), left (`compile-ladder/climb-batch-33b/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"), and the reserved points its rungs reached, each landed at its default. None holds a launch.

- PLAN.md:899, under "Off the path, parked > Climb batch 33b, listed for his review":

- N.worker.1 and N.skeptic.2 of climb batch 33b's rung N (row 1081, CONTESTED): should the compiled checker refuse as unreachable a `typecase` clause whose type the selector's static type excludes? Since the prelude's `ZZ32` is an object, `typecase x of Shape => ...` for `x: ZZ32` and a program's trait `Shape` gives 'The typecase clause, Shape, is unreachable.', where the base compiled it and printed 'integer', as walk does; the specification's `typecase` section names no such static error, and its note declines one for a clause after a more specific one. Default: as landed, the refusal kept with a test of today's behaviour and the row `CONTESTED`. Evidence: `Specification/basic/expressions/typecase.tex:114-120`; `ProjectFortress/compiler_tests/XXXTypecaseArmExcludedRefused.test:1-3`.

- PLAN.md:900, under "Off the path, parked > Climb batch 33b, listed for his review":

- N.skeptic.1, N.judge.1 and N.judge.2 of climb batch 33b's rung N (row 1082): what does a built-in number type's name denote as a value, as in `x: Object = ZZ32`? `objects.tex` makes an object declaration without value parameters a singleton, which does not fit a type with many values; walk on the one library answers the type's zero ('ZZ32 0', 'RR64 0.0'); on the base the checker refused the name, 'Variable 'ZZ32' not found.'. The ways: (a) a static error on both paths, one rung, with row 1082 `CONTESTED` until then; (b) the type's zero on both paths, one rung; (c) the code generator's wall, 'Can't compile the number type ZZ32 as a value yet', until one is chosen. The one library's seven meet the same question when they take form 2 (fork N4). Default: (c), as landed, the judge upholding the skeptic's fix `eabbfc918b`, and row 1082 `NEGATIVE-VERIFIED` with its expected failure, a status the judge took. Evidence: `Specification/basic/objects.tex:212-217`; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7016-7020`; `ProjectFortress/compiler_tests/XXXNumberTypeAsValueCompiled.test:3`; `explorations/compile-ladder/rung-number-payload-objects/JUDGE.md`.

- PLAN.md:901, under "Off the path, parked > Climb batch 33b, listed for his review":

- Rung N of climb batch 33b, its reserved points, each landed at its default (as landed). N.reserved.1: the team's test `Compiled6.bx` takes a second message, 'Objects can only extend traits.', for its object expression `object extends { ZZ32 }` beside the error it pinned (`ProjectFortress/compiler_tests/XXX6bx.test:16-18`). N.reserved.2: a `typecase` clause at a program's trait over a `ZZ32` selector, which compiled and printed 'integer' on the base, is refused as unreachable (`ProjectFortress/compiler_tests/XXXTypecaseArmExcludedRefused.test:3`); its question is N.worker.1's entry above.

- PLAN.md:902, under "Off the path, parked > Climb batch 33b, listed for his review":

- G.worker.1 of climb batch 33b's rung G: under the selection, each index of a varargs array is made as `FZZ32.make(j)`, the code generator's one conversion of a JVM int to a `ZZ32`, where `init`'s descriptor names `fortress/FortressLibrary$ZZ32`; the one library's numeral sites have the same mismatch today, passing `FZZ` values to `coerce_ZZ32?natural`. Should the rung of fork N4, which gives the one library's numbers their carriers, list the varargs indices among its sites? Default: no rung holds it yet; row 1062 names the mismatch. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7903-7905`, `:4663-4669`.

- PLAN.md:903, under "Off the path, parked > Climb batch 33b, listed for his review":

- G.worker.2 of climb batch 33b's rung G (row 1085), told: a spread argument, `f(1, ys...)`, is dropped before either path evaluates it, in walk's `Evaluator.forTupleExpr` and in the checker's `getArgList`, both shared areas outside the rung's files, so the specification's examples `f(1, [2 3]...)` run on neither path. Its repair has no rung yet. Default: as landed, the expected failure under walk. Evidence: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1471-1473`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:87`; `ProjectFortress/tests/XXXVarargsSpreadArgument.fss:1`.

- PLAN.md:904, under "Off the path, parked > Climb batch 33b, listed for his review":

- Rung R of climb batch 33b, its reserved points, each a change of which declaration a call or a dispatch method reaches, each landed at its default (as landed). R.reserved.1: a compiled call at a type assumption of an imported api's trait whose method has a body there, on an object that overrides it, ran the object's body on the base ('pd') and runs the trait's after ('sd'), as walk does and as `Specification/basic/expressions/type-annotation.tex:45-54` gives (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7205`, `:7246`; `ProjectFortress/compiler_tests/AsIfApiTraitOverrideCompiled.test:1`). R.reserved.2: at the prelude's `String`, `("ab" asif String) < ("cd" asif String)` printed true on the base, from `JavaString`'s body, and prints false after, from the prelude's placeholder body (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:393`). R.reserved.3: beside a local trait of the simple name of an imported api's trait, the compiled dispatch of the api trait's functional method `tag(O, L)` died on the base, 'StackOverflowError', and reaches the api trait's body after, as walk does (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:148-163`; `ProjectFortress/compiler_tests/ApiTraitShadowedNameCompiled.test:1`).


## The lines added after the landing, ba3c7c876..8c13a52ec

None.

## The other lines that name a changed entry or row

- PLAN.md:9, under "Where we stand", 1539 characters, names row 1062: row 1062).
- PLAN.md:10, under "Where we stand", 4998 characters, names F-53, F-320, F-321, F-338, F-351, F-369, F-379: At the last landed gate, climb batch 33's (`d3747846c1`, its run 1, its gate on `41894ec7d6`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53; | and six repairs of the compiled transaction (F-351). | and the compiled top-level tuple binding (F-369). | F-379); | but `System`, `File` and `Reader` are outside the fourteen, so no gate stage checks them (F-321, F-290; | Since climb batch 27's rung G it compiles a type assumption at a receiver, at a call whose every dispatched argument is one, and as a value, and since climb batch 28's rung T an object whose first supertrait is an imported api's trait (row 733) (F-320, F-325, F-338).
- PLAN.md:12, under "Where we stand", 3327 characters, names F-379 and row 1003: F-359, F-379), and a probe merged the five number traits with their objects in scratch (F-361). | F-379), and the merge is phase 4's line on it. | The prelude's half is in no run, and the prelude keeps its traits (row 1003);
- PLAN.md:37, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:55, under "The phases > Phase 4. The switch-over", 855 characters, names row 1062: The list for the batch after is the record's (`coordinator/CLIMB-BATCH-33.md`, "For the batch after, in this order"), and the review adds rows to it (`reviews/batch-33-review.md`, Part 4 and Part 5): row 1062, a program compiled under the selector does not run, with item 1, whose first program that runs on the one library is its test (`one_library_tests/XXXOneLibraryRunHalf`);
- PLAN.md:57, under "The phases > Phase 4. The switch-over", 314 characters, names F-307: - N1 and N2, A's 154 and B's 59: those moved are in F-299, F-303 and F-305 to F-307, the string family's 18 with climb batch 26's rung T (F-299), and `FlatString`'s `=` and `flatConcat` at a `Char` with climb batch 27's rung F (F-323);
- PLAN.md:62, under "The phases > Phase 4. The switch-over", 376 characters, names F-330: - N4's two rungs (P-164) are built: the writer rung in climb batch 27 (F-330), and the reader rung, with `FileWriteStream`, in climb batch 28 (F-332), so the 36 are gone (F-32).
- PLAN.md:68, under "The phases > Phase 4. The switch-over", 2741 characters, names F-338 and rows 315, 624, 940, 942: Row 733, closed by climb batch 28's rung T, has its root in rows 940 and 942 (F-338), which the trait table's search by the prelude's names hides for the prelude's types; | Each kind is in its ledger row: varargs 10, nine and `Stream`'s `WriteStream` (row 624), the kind environment 4 (rows 822 and 812, closed by climb batch 33's rung V), a closure class written twice 2 (row 315), and an intersection as a receiver 1 (row 540, closed by its rung I).
- PLAN.md:69, under "The phases > Phase 4. The switch-over", 548 characters, names row 624: - Varargs (row 624) waits for a program compiled against the one library: its refusal reproduces under the prelude, but the repair has no test there, since the checker types a varargs parameter as the one library's `ImmutableArray[\T,ZZ32\]`, which the prelude does not declare.
- PLAN.md:70, under "The phases > Phase 4. The switch-over", 3149 characters, names F-379 and rows 315, 624, 866, 942, 995, 1062: F-379), so the wall of the five number traits is gone there; | ...olean`, `Char`, `NN32`, `RR32`, `FlatString`), the five number traits with one object each below them, whose bodies a carrier of the trait's class lacks, the second name that a carried type has in its RTTI (row 995), a carried parent named as a superinterface (row 866), the two array stores with no compiled value (row 874) and the Java stubs;... | ...e number traits with one object each below them, whose bodies a carrier of the trait's class lacks, the second name that a carried type has in its RTTI (row 995), a carried parent named as a superinterface (row 866), the two array stores with no compiled value (row 874) and the Java stubs;... | row 942); | The selector is on `main` since climb batch 33's rung S (F-381): under `FORTRESS_LIBRARY=one` the compile command reads the one library, and a program compiled so does not run yet (row 1062). | Of rows 624, 81 and 315 on the path of a program that prints one line, run 1 closed row 81 (`3f7fd72814`), and rows 624 and 315 stand. | the prelude's half and row 866 wait for way (b) of fork H2, which P-178 settles (the next line;
- PLAN.md:71, under "The phases > Phase 4. The switch-over", 1305 characters, names F-379 and row 1003: F-379), after run 1's two repairs of walk and its row 542 (forks O2 and O5, review-queue item 578). | row 1003): each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` is one `value object` under its own name, and `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` leave the library and walk. | It closed row 550, repaired row 886's `UnsignedLong` half, rewrote rows 1003 and 1000, and noted rows 551 and 959. | it is now the whole of P-178 that is left (row 1003).
- PLAN.md:72, under "The phases > Phase 4. The switch-over", 428 characters, names F-320 and row 304: - Row 304, with the code generator's later rungs, beside F-34's kinds: since climb batch 26's rung L the code generator compiles a local function, but refuses three forms that the specification allows, a local function with static parameters of its own, two of one name in a block, and the `atomic` modifier, each with its `XXX` test (F-320).
- PLAN.md:114, under "The phases > Phase 5. microGPT compiles", 1488 characters, names F-320 and rows 304, 496: - The code generator's other gaps on microGPT's path, each row its own home: the APL base's `typecase` (row 340), by reading (C4's two local functions in `step` have the shapes that compile since climb batch 26's rung L, F-320; | row 304 holds the forms still refused); | generic dotted methods' dispatch (row 495), a dispatcher that is not a template (row 496), and row 499's answers, repaired beside row 496's (review-queue item 159 (closed at the cleanup of 2026-11-05: settled));
- PLAN.md:271, under "Off the path, parked", 310 characters, names row 496: - Climb batch 6.5's rung G's dispatch change answers differently for a class it was not measured on (`SkPosBox`, `SkPosFixed`), a defect of the template dispatcher (row 499), repaired in phase 5 beside row 496's;
- PLAN.md:309, under "Off the path, parked > Phase 3's candidates at its end", 109 characters, names row 698: - Not candidates: rows 698 (the switch-over), 699, 706 and 537 (phase 5) and 705 (closed by the switch-over).
- PLAN.md:369, under "Off the path, parked > Climb batch 8, listed for his review", 246 characters, names row 566: - Stop met and lifted, rung O's "a compiled test whose verdict changes other than by O's intent": row 546's functional-method program, valid by the Meet Rule for Functional Methods, is accepted and dies at run time (row 566).
- PLAN.md:652, under "Off the path, parked > Climb batch 23, listed for his review", 364 characters, names F-180: - C.skeptic.1 of climb batch 23's rung C (row 845): fork 5's reading also reaches walk's own written `import java`, which now stops at F-180's gap 3 where it stopped at gap 1;
- PLAN.md:700, under "Off the path, parked > Climb batch 26, listed for his review", 923 characters, names row 304: ...md:95`, `:99`, `:102`, `:107` and `:116` (T: a helper parameter declared `String` is refused, the library's `FlatString` carries `self`), and `references/compiler.md:41` (L: a local function compiles but in row 304's three forms)....
- PLAN.md:747, under "Off the path, parked > Climb batch 28, listed for his review", 198 characters, names rows 940, 942: - T.worker.2 and T.skeptic.2 of climb batch 28's rung T (rows 940 and 942): fix row 940 in `CodeGen.methodsNamed`, or once in `STypesUtil.gatherMethods`? No default on record.
- PLAN.md:882, under "Off the path, parked > Climb batch 33, listed for his review", 1333 characters, names row 1061: row 1061, whose home is run 2's rung R;

## The lines that look stale at 8c13a52ec

From `plan-moves.py --stale-at 8c13a52ec`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 512, 515, 577. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:70, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - What the rehearsal met and no other line of this phase holds (F-352; `compile-ladder/plan-31/probes/switch-rehearsal.md`, section 6). Walls that only the swit
LOOK PLAN.md:71, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - The merge of the five number types with their objects, before the switch-over, on both paths (P-178; row 1003): each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64
LOOK PLAN.md:93, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:248, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
LOOK PLAN.md:877, under "Climb batch 31b, listed for his review": list: it names items in (a) among open ones: 519. The line: - Forks T1, O6, O7, E1 and E2 of climb batch 31's record, run 2, taken at the planner's defaults with his go of 2026-11-17 06:39 UTC, which put no question to h
