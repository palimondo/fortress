<!-- The record-landing workflow's evidence of PLAN.md at a6e73b8d6: its headings, the lines that the batch added (160925800..d3747846c) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

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
  - 41: Phase 4. The switch-over (59 lines)
  - 100: Phase 5. microGPT compiles (20 lines)
  - 120: Phase 6. microGPT fast (12 lines)
- 132: Pavol's answers, in the order they are needed (90 lines)
- 222: Work that can start now, with no decision (23 lines)
- 245: Off the path, parked (44 lines)
  - 289: Phase 3's candidates at its end (24 lines)
  - 313: Climb batch N's first run, listed for his review (9 lines)
  - 322: Climb batch 6.5b, listed for his review (10 lines)
  - 332: Climb batch 7b, listed for his review (21 lines)
  - 353: Climb batch 8, listed for his review (17 lines)
  - 370: Climb batch 9, listed for his review (27 lines)
  - 397: Climb batch 10, listed for his review (16 lines)
  - 413: Climb batch 11, listed for his review (13 lines)
  - 426: Climb batch 12, listed for his review (15 lines)
  - 441: Climb batch 13, listed for his review (21 lines)
  - 462: Climb batch 14, listed for his review (16 lines)
  - 478: Climb batch 15, listed for his review (20 lines)
  - 498: Climb batch 15b, listed for his review (4 lines)
  - 502: Climb batch 16, listed for his review (10 lines)
  - 512: Climb batch 17, listed for his review (14 lines)
  - 526: Climb batch 18, listed for his review (15 lines)
  - 541: Climb batch 19, listed for his review (20 lines)
  - 561: Climb batch 20, listed for his review (16 lines)
  - 577: Climb batch 21, listed for his review (18 lines)
  - 595: Climb batch 21b, listed for his review (12 lines)
  - 607: Climb batch 22, listed for his review (13 lines)
  - 620: Climb batch 22c, listed for his review (22 lines)
  - 642: Climb batch 23, listed for his review (12 lines)
  - 654: Climb batch 24, listed for his review (16 lines)
  - 670: Climb batch 25, listed for his review (16 lines)
  - 686: Climb batch 26, listed for his review (17 lines)
  - 703: Climb batch 27, listed for his review (22 lines)
  - 725: Climb batch 28, listed for his review (24 lines)
  - 749: Climb batch 29, listed for his review (29 lines)
  - 778: Climb batch 29b, listed for his review (15 lines)
  - 793: Climb batch 30, listed for his review (14 lines)
  - 807: Climb batch 32, listed for his review (22 lines)
  - 829: Climb batch 31, listed for his review (32 lines)
  - 861: Climb batch 31b, listed for his review (18 lines)
  - 879: Climb batch 33, listed for his review (12 lines)
  - 891: Not classified, to check (13 lines)
- 904: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 921: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 933: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, 160925800..d3747846c

- PLAN.md:12, under "Where we stand":

- **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the switch-over met sixteen walls on the way to three small compiled programs against the one library (F-352; `compile-ladder/plan-31/probes/switch-rehearsal.md`). The plan review sorted them into walls that a test against the prelude can show today and walls that only the switch shows, and put two orders of the remaining work, the whole switch-over first or the model's slice first (`reviews/plan-review-2026-11-10.md`, sections 7.1 and 7.2). Probe Y showed one build serving both libraries, which the second order needs (F-353). The pure-Java microGPT is written and timed (F-355, F-356), and the first compiled loop against the one library is of the order of 100 times from Java (F-358). The carriers' review gives the ways in which a run-time class carries a built-in type (`reviews/carriers-ways-2026-11-13.md`; F-359, F-379), and a probe merged the five number traits with their objects in scratch (F-361). Their rows are 988 to 1000 of the gap ledger. His decision of 2026-11-16 on the built-in number types is taken: each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` is one `value object` under its own name, and walk's native number objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` go, on both paths before the switch-over (P-178; review-queue items 371, 372 and 515, answered). The one library's half is built: climb batch 31b's rung O merged the five in the one library and walk (`f6e24650e7`; F-379), and the merge is phase 4's line on it. The prelude's half is in no run, and the prelude keeps its traits (row 1003); its way, fork H2, is settled by P-178: way (b), built once for both libraries (review-queue item 577, answered). His decision on the order of the remaining work is taken: the rest of the switch-over takes microGPT's slice first, one build serving both libraries by a second set of the run time's value classes (P-33; review-queue item 512, answered), and item 521, the form of that second set, now arises. No decision of his is open on the carriers of the built-in types that P-178 does not cover (review-queue item 513): `Boolean` and `Char` stay one `value object` each, the Java-backed traits are decided (P-164, P-169), and for `String` nothing is his to decide; what is left is a builder's work with the merge of P-178. For the prelude's trait forms of `Boolean`, `Character`, `NN32` and `RR32` the coordinator applies P-178's reason and the one library's object stands, for his review, not asked (item 514). The other questions of these sources are items 516 to 524, 526 and 527. Of the merge's, 516, 518 and 519 landed at the record's defaults with run 2 and stay open for his review, reviewed after the landing by his word of 06:4x UTC on 2026-11-17 (the review list of climb batch 31b, below); 517 and 520 are in the queue's part (a), since run 1 closed their rows 997, 998 and 542.

- PLAN.md:96, under "The phases > Phase 4. The switch-over":

- His answers needed before the switch-over: review-queue items 2, 21, 30, 35, 36, 39, 108, 212, 229, 230, 281, 295, 319, 339, 360, 374 to 376, 450, 455, 460, 477 and 558 (the queue's "Before the switch-over"), each with its default there or none; review-queue items 488, 500 and 501, the findings of climb batch 30's review, and items 525 and 529, those of climb batch 32's review, before the next batch or at their defaults; item 572, its finding 1, taken by the coordinator at 1a, the first rung of the batch after, and open for his review; and item 586, finding 1 of climb batch 31b's review, at its default as landed until he answers; the phase 3 exit judgement recommends a default for those of them that it read (section 5.2).

- PLAN.md:863, under "Off the path, parked > Climb batch 31b, listed for his review":

The items for him that run 2 of climb batch 31 (`coordinator/CLIMB-BATCH-31.md`: rungs T, O and E, all three landed) left (`compile-ladder/climb-batch-31b/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"); then, from its post-batch review (`reviews/batch-31b-review.md`, Part 4), the lines that the group lacked: rows 1054 to 1060, the record's forks of run 2, and the reserved points that rung O reached. Finding 1 of the review is item 101 under "Pavol's answers". Forks O3 and O4, findings 3 and 4 of climb batch 31's review, landed at the planner's defaults and are reviewed after the landing, by his word of 06:4x UTC on 2026-11-17, so they are lines of this list (items 97 and 98 under "Pavol's answers" until then). None of the lines below holds a launch. One line for each point, opening with the ids it holds: what is asked or told, its default, and its review-queue item, which holds its text, the other way, its cost and its evidence; the lines' texts before this routing are in `PLAN-history.md`, "Climb batch 31b's landing, 2026-11-17".

- PLAN.md:874, under "Off the path, parked > Climb batch 31b, listed for his review":

- Fork O3 of climb batch 31's record, run 2, with finding 3 of climb batch 31's review (row 1000): `round` of an `RR64` answers a `ZZ64`, the body that ran before the merge, one `round(self):ZZ64` (`Library/FortressLibrary.fss:548`); the other way is a `ZZ`, as P-68 gives. Default: as landed, the planner's default; the review recommended it. Review-queue item 518.

- PLAN.md:875, under "Off the path, parked > Climb batch 31b, listed for his review":

- Fork O4 of climb batch 31's record, run 2, with finding 4 of climb batch 31's review (row 959): the merge did not wait for row 959, so a `typecase` arm at a removed name such as `Int` takes every value, and the team's `tests/NumberPrintTest.fss:31` and `:35` were respelled `ZZ` and `NN64`, two arms that can never be taken. The other way: row 959 first, and the two arms deleted. Default: as landed, the planner's default; row 959 stays second in the list for the batch after; the review recommended it. Review-queue item 519.

- PLAN.md:879, under "Off the path, parked > Climb batch 33, listed for his review":

### Climb batch 33, listed for his review

- PLAN.md:881, under "Off the path, parked > Climb batch 33, listed for his review":

The items for him that run 1 of climb batch 33 (`coordinator/CLIMB-BATCH-33.md`: rungs S, D, V, Q, I and C, all six landed) left (`compile-ladder/climb-batch-33/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`").

- PLAN.md:883, under "Off the path, parked > Climb batch 33, listed for his review":

- S.worker.1 and S.skeptic.1 of climb batch 33's rung S, with fork S1: `-Dfortress.library=one` selects the one library in a JVM, but `bin/fortress_classpath` and `bin/run_classpath` read only `FORTRESS_LIBRARY`, so the property passed in `JAVA_FLAGS` gives the compile `default_repository/caches-one` and the run's class path `default_repository/caches`. Keep the property for a JVM started without the scripts, or drop it so that the variable is the one selector? Default: kept, as built. Evidence: `compile-ladder/rung-library-selector/REPORT.md:225`; `ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:290-291`, `bin/run_classpath:27-31`.

- PLAN.md:884, under "Off the path, parked > Climb batch 33, listed for his review":

- S.skeptic.2 of climb batch 33's rung S: the team's sweeps `testUntil` and `testCruiseControl`, which `testNightly` runs, take every `*JUTest` class without the selection, so each now reports one failure of `OneLibraryJUTest`, where `testFast`'s misc track leaves the class out. Leave it out of those sweeps too, or keep the failure as a pointer? Nothing on record decides, and no gate step runs them. Default: as built. Evidence: `compile-ladder/rung-library-selector/SKEPTIC.md:91`; `build.xml:1262`, `:1285-1320`, `:1358-1397`.

- PLAN.md:885, under "Off the path, parked > Climb batch 33, listed for his review":

- D.worker.1 and D.skeptic.1 of climb batch 33's rung D, with fork D1 (row 1064, CONTESTED): should an element of a tuple arm at a name that no declaration defines be refused too, which ends the team's tuple-of-names binding form `(x, y) =>`? For: the chapter's grammar reads `( TypeList )` as types, and an old program's `(Int, ZZ32) =>` takes every first element with no message. Against: the team built and tested the form, and the chapter defers patterns to the pattern-matching proposal. Default: as landed, the form kept and the row open. Evidence: `compile-ladder/rung-typecase-unbound-arm/REPORT.md:191`; `ProjectFortress/tests/TypecaseTupleArmUndefinedNameBindsWalk.fss`; `Specification/basic/expressions/typecase.tex:15`, `:69-71`.

- PLAN.md:886, under "Off the path, parked > Climb batch 33, listed for his review":

- V.worker.1 and V.skeptic.1 of climb batch 33's rung V (row 1068): the chapter's `typecase` grammar has no names inside a clause, and its note defers patterns to the pattern-matching proposal, yet the parser, the checker, walk and now the code generator bind a tuple pattern's names, and the one library writes them. Should the specification state the form? If the chapter is held silent on them, as row 498 has it, row 1068's expected-failure walk test, which reads `typecase.tex:93-94` and `:107-109` as binding each name to its element, becomes a row alone. No default on record; as landed, the test kept. Evidence: `compile-ladder/rung-kind-env-generic/REPORT.md:4`, `compile-ladder/rung-kind-env-generic/SKEPTIC.md:64`; `Specification/basic/expressions/typecase.tex:15`, `:66-67`; `Library/List.fss:94`.

- PLAN.md:887, under "Off the path, parked > Climb batch 33, listed for his review":

- V.worker.2 of climb batch 33's rung V, with fork I1: the one library's `app` calls a generic method on `List[\E\] ∩ List[\T\]` in its arms 2 and 3, two instances of one generic trait that each declare `appendRC`, neither below the other, and fork I1's words, the conjunct that declares or inherits the method, the most specific where several do, do not say which to take there. Rung I takes the first in the intersection's order where none is most specific. Default: as rung I built it. Evidence: `compile-ladder/rung-kind-env-generic/REPORT.md:99`; `Library/List.fss:96-97`.

- PLAN.md:888, under "Off the path, parked > Climb batch 33, listed for his review":

- Q.skeptic.1 of climb batch 33's rung Q, with fork Q1: rung Q casts an arm that is `self` at the conditional's own type, also where the conditional stands at a trait type at which the verifier needs no cast, so `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`. Should the compiled code cast `self` only where the verifier needs it? It is the conditional's form of K.skeptic.1's question in climb batch 31's group above (review-queue item 571), F-377's open line. Default: as landed, the cast kept. Evidence: `compile-ladder/rung-self-arm-closure/SKEPTIC.md:38`, `:92`.

- PLAN.md:889, under "Off the path, parked > Climb batch 33, listed for his review":

- review-routed.1 of climb batch 33's merged-diff review: no gated test calls a method on a `typecase` tuple pattern's name typed by an intersection that none of its conjuncts lies below, where rung V's binding, which stores each name at its pattern's type (`CodeGen.bindElementsAndGenerateClauseBody`), meets rung I's cast of the receiver to one conjunct (`CodeGen.intersectionMethodOwner`): the form of the one library's `app` arms 2 and 3 (`Library/List.fss:96-97`). The next batch owes a compiled test of it, a plain and a generic method in a generic function of `app`'s shape, and, if it fails, an `XXX` pair and a row in its place. Evidence: `ProjectFortress/compiler_tests/TypecaseGenericArmsCompiled.fss:20-22` reads the names only through a generic function; `ProjectFortress/compiler_tests/TypecaseBinderMethodCall.fss:14-48` calls them on single binders; `compile-ladder/rung-kind-env-generic/REPORT.md:99`.


## The lines added after the landing, d3747846c..a6e73b8d6

None.

## The other lines that name a changed entry or row

- PLAN.md:9, under "Where we stand", 1243 characters, names F-283, F-352: The 52 team demos reach their end, except that `Generator2Demo` stops with `IntegerOverflow` on some of its random data, on the base too: 52 of 52 on the merged trees of climb batch 32 and of both runs of climb batch 31 at their gathers, and 51 of 52 on climb batch 30's (F-283; | no matrix, none of the library's own array algebra and no microGPT (F-352).
- PLAN.md:10, under "Where we stand", 4376 characters, names F-53, F-225, F-318, F-351, F-363, F-369, F-372, F-374, F-375, F-377, F-379, F-380: At the last landed gate, climb batch 31b's (`00dd16a891`, run 2 of climb batch 31, its gate on `4fdabc2ae8`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53; | and six repairs of the compiled transaction (F-351). | a superscript after a dotted access and after a parenthesised call (F-363); | and the compiled top-level tuple binding (F-369). | Climb batch 31's run 1 built, on the compiled path, each inherited method written once and a body inherited through an api's trait (F-372), `label` and `exit` (F-373), `atomic` as an expression and an object's `var` field in a cell (F-374), the cast of `self` (F-377, F-225), and the Return Type Rule at an object type with the dispatcher's cast (F-75, F-376); | and, under walk, its two repairs that come before the merge (F-375). | Climb batch 31b, its run 2, built on the compiled path a method whose one parameter is a tuple (F-378) and a numeral that ends a block converted where it stands (F-380), and merged the five number types with their objects in the one library and walk (P-178; | F-379); | P-160's two steps are built: walk's load check reads a program's generic operators between an array and a number beside a self-typed additive group's own (F-318), and `Number` has no `comprises` clause, `asFloat` or `=` (F-324).
- PLAN.md:37, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53, F-289: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:53, under "The phases > Phase 4. The switch-over", 608 characters, names rows 1050, 1051, 1052: The list for the batch after is the record's (`coordinator/CLIMB-BATCH-31.md`, "For the batch after, in this order"), with rows 1051, 1050 and 1052 first, taken by the coordinator at 1a of finding 1 (item 99 under "Pavol's answers"), and its first item, the prelude's half of the merge, by way (b) for both libraries, sized by a probe, since P-178 settles fork H2 (review-queue item 577, answered).
- PLAN.md:62, under "The phases > Phase 4. The switch-over", 2226 characters, names F-352: the rehearsal carried it in `FJavaString` by a hack, and its class cannot be stubbed in Java under the component's name (F-352;
- PLAN.md:67, under "The phases > Phase 4. The switch-over", 2265 characters, names rows 540, 812, 822: Each kind is in its ledger row: varargs 10, nine and `Stream`'s `WriteStream` (row 624), the kind environment 4 (rows 822 and 812), a closure class written twice 2 (row 315), and an intersection as a receiver 1 (row 540). | behind a first wall can stand a second, as row 812's crash behind `ArrayList`'s, which rung T's `CodeGen.genericMethodTakesOneParameter` now reaches.
- PLAN.md:69, under "The phases > Phase 4. The switch-over", 2582 characters, names F-352, F-379 and row 1051: - What the rehearsal met and no other line of this phase holds (F-352; | F-379), so the wall of the five number traits is gone there; | Whether the library's classes now pass the JVM's verifier is not measured (row 1051;
- PLAN.md:70, under "The phases > Phase 4. The switch-over", 1252 characters, names F-379 and row 959: F-379), after run 1's two repairs of walk and its row 542 (forks O2 and O5, review-queue item 578). | Forks O1, O3 and O4 landed at their defaults, open for his review: the five in `FortressLibrary` with walk's table, `round` of an `RR64` a `ZZ64`, and a `typecase` arm at a removed name that takes every value until row 959 is repaired (review-queue items 516, 518 and 519).
- PLAN.md:72, under "The phases > Phase 4. The switch-over", 328 characters, names F-181 and row 812: F-181 holds the built `where` half. | - Row 701, the code generator's refusal of a function or method with a contract: its half that stays goes with the code-generator rungs, beside rows 812 and 867 (review-queue item 341 (closed at the cleanup of 2026-11-05: learning));
- PLAN.md:76, under "The phases > Phase 4. The switch-over", 555 characters, names F-293: F-290, F-293);
- PLAN.md:80, under "The phases > Phase 4. The switch-over", 2125 characters, names F-296: Until it lands, `fortress compile` still bounds by `Object` a type parameter written without a bound in a generic that concatenates its value onto a `String` or prints it, for the prelude's `||`, `print` and `println` (F-296).
- PLAN.md:98, under "The phases > Phase 4. The switch-over", 1862 characters, names F-353: probe Y puts the second road's extra cost at two rungs, perhaps three, and about 200 s a gate, F-353).
- PLAN.md:113, under "The phases > Phase 5. microGPT compiles", 1447 characters, names row 540: a method call on a result typed by an intersection, the method's owner found among the conjuncts and the checker's typing not weakened (row 540);
- PLAN.md:114, under "The phases > Phase 5. microGPT compiles", 427 characters, names row 559: - The code generator's gaps on generic and functional methods, intersections and varargs, each row its own home: rows 559 (no run-time class for an intersection type;
- PLAN.md:148, under "Pavol's answers, in the order they are needed", 679 characters, names rows 1050, 1051, 1052: Finding 1: after the merge every built-in integer type has the shape of `StandardTotalOrder`'s `MIN` and `MAX`, which fails the JVM's verification at an object instance (row 1051, with rows 1050 and 1052).
- PLAN.md:239, under "Work that can start now, with no decision", 680 characters, names F-283: - Climb batch 21b's review, finding 7, the review's proposal: the manual's gather step runs the 52 team demos on the merged tree whenever a landed rung edits walk, `Library/` or `ProjectFortress/LibraryBuiltin/` (F-283, by P-79), with the demo driver of `compile-ladder/rung-team-demos/REPORT.md`, section 13, in the background while it folds;
- PLAN.md:284, under "Off the path, parked", 539 characters, names rows 1005, 1028: row 1028, the export check of a variable declared by `:=`; | row 1005, a subscript followed by a superscript stops the compile, which Part 5 puts with the batch after, as the checker's.
- PLAN.md:286, under "Off the path, parked", 610 characters, names row 1020: row 1020, a local function with static parameters of its own;
- PLAN.md:295, under "Off the path, parked > Phase 3's candidates at its end", 222 characters, names row 868: - Rows 868, 869 and 870, from climb batch 24's rung G's skeptic: walk's defects of `where` clauses that the compiled path reads, each row with its `XXX` test;
- PLAN.md:300, under "Off the path, parked > Phase 3's candidates at its end", 645 characters, names row 959: - Row 959, opened by climb batch 29's rung N: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value;
- PLAN.md:309, under "Off the path, parked > Phase 3's candidates at its end", 454 characters, names rows 812, 868: rows 774, 777, 470, 868 to 870, 812 and 701;
- PLAN.md:358, under "Off the path, parked > Climb batch 8, listed for his review", 273 characters, names row 559: - Row 559, a regression of climb batch 8's rung I: the compiled run time loads no instance at an intersection type, so two shapes that ran die at load;
- PLAN.md:764, under "Off the path, parked > Climb batch 29, listed for his review", 296 characters, names row 964: - C.skeptic.4 of climb batch 29's rung C (rows 963 and 964): a numeral as a `typecase`'s selector keeps its own numeral type, as `NaturalNumeral[\1,10,7\]`, on the compiled path;
- PLAN.md:819, under "Off the path, parked > Climb batch 32, listed for his review", 326 characters, names row 1029: - D.worker.1, D.worker.3 and D.skeptic.2 of climb batch 32's rung D (rows 1026, 152 and 1029): walk's top-level tuple binding, whose right side runs once for each name and once more;
- PLAN.md:831, under "Off the path, parked > Climb batch 31, listed for his review", 843 characters, names rows 1050, 1052: then, from its post-batch review (`reviews/batch-31-review.md`, Part 4), the lines that the group lacked: rows 1043, 1050, 1052 and 1053, fork V4, fork H2 and the record's forks.
- PLAN.md:849, under "Off the path, parked > Climb batch 31, listed for his review", 590 characters, names row 1051: ...- gather.1 of climb batch 31's gather, with review.1 of its merged-diff review and judge-review.1 of the review's judge (row 1051), told, and one placing taken by the coordinator: a self-typed trait's body `mx(self, other: T): T = if lt(other, self) then self else other end` still fails the JVM's verification at an object instance on...
- PLAN.md:850, under "Off the path, parked > Climb batch 31, listed for his review", 376 characters, names rows 1050, 1051, 1052: - Rows 1050 and 1052 of climb batch 31's rung K, told: a closure that returns `self` at a listed type or as the self parameter fails verification, and a default body that calls a method on a value of the self parameter dies with `ClassCircularityError` where the object lists the trait first. | Default: the rows open, with row 1051's rung.
- PLAN.md:851, under "Off the path, parked > Climb batch 31, listed for his review", 948 characters, names row 1051: ...- review-routed.1 of climb batch 31's merged-diff review (row 1051), a test owed by the rung of item 99 above, since no rung of run 2 is given `CodeGen.forIf` or `castToTypeBelow` (`reviews/batch-31-review.md`, Part 4): the row's expected failure, `compiler_tests/XXXCompr... | That rung writes first an expected-failure run test with its link test, a trait `Tord[\T extends Tord[\T\]\]` with `mx(self, other: T): T = if lt(other, self) then self else other end` and an object that extends it, and names it in row 1051.
- PLAN.md:853, under "Off the path, parked > Climb batch 31, listed for his review", 611 characters, names rows 1050, 1051: rows 1050 and 1051 are what stands.
- PLAN.md:870, under "Off the path, parked > Climb batch 31b, listed for his review", 481 characters, names row 540: Default: with rows 540 and 818, item 4 of the list for the batch after (`coordinator/CLIMB-BATCH-31.md`, "For the batch after, in this order").
- PLAN.md:873, under "Off the path, parked > Climb batch 31b, listed for his review", 268 characters, names row 1060: - Row 1060 of climb batch 31b's rung E, told: compiled, a numeral that ends a block after a local declaration, bound with no declared type, keeps its numeral type.

## The lines that look stale at a6e73b8d6

From `plan-moves.py --stale-at a6e73b8d6`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 512, 515, 577. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:13, under "Where we stand": list: it names items in (a) among open ones: 528, 530, 533. The line: - **Next.** Climb batch 31b, run 2 of climb batch 31, landed (phase 4's twelfth line) at `00dd16a891`, on his go of 06:39 UTC on 2026-11-17, which took its fork
LOOK PLAN.md:69, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - What the rehearsal met and no other line of this phase holds (F-352; `compile-ladder/plan-31/probes/switch-rehearsal.md`, section 6). Walls that only the swit
LOOK PLAN.md:70, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - The merge of the five number types with their objects, before the switch-over, on both paths (P-178; row 1003): each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64
LOOK PLAN.md:92, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:243, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on
