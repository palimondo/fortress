<!-- The record-landing workflow's evidence of PLAN.md at 99035e231: its headings, the lines that the batch added (b5a758846..61b50cd34) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

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
  - 41: Phase 4. The switch-over (65 lines)
  - 106: Phase 5. microGPT compiles (20 lines)
  - 126: Phase 6. microGPT fast (13 lines)
- 139: Pavol's answers, in the order they are needed (82 lines)
- 221: Work that can start now, with no decision (23 lines)
- 244: Off the path, parked (46 lines)
  - 290: Phase 3's candidates at its end (23 lines)
  - 313: Climb batch N's first run, listed for his review (9 lines)
  - 322: Climb batch 6.5b, listed for his review (10 lines)
  - 332: Climb batch 7b, listed for his review (20 lines)
  - 352: Climb batch 8, listed for his review (17 lines)
  - 369: Climb batch 9, listed for his review (24 lines)
  - 393: Climb batch 10, listed for his review (16 lines)
  - 409: Climb batch 11, listed for his review (12 lines)
  - 421: Climb batch 12, listed for his review (13 lines)
  - 434: Climb batch 13, listed for his review (20 lines)
  - 454: Climb batch 14, listed for his review (16 lines)
  - 470: Climb batch 15, listed for his review (20 lines)
  - 490: Climb batch 15b, listed for his review (4 lines)
  - 494: Climb batch 16, listed for his review (10 lines)
  - 504: Climb batch 17, listed for his review (14 lines)
  - 518: Climb batch 18, listed for his review (14 lines)
  - 532: Climb batch 19, listed for his review (18 lines)
  - 550: Climb batch 20, listed for his review (16 lines)
  - 566: Climb batch 21, listed for his review (18 lines)
  - 584: Climb batch 21b, listed for his review (12 lines)
  - 596: Climb batch 22, listed for his review (13 lines)
  - 609: Climb batch 22c, listed for his review (21 lines)
  - 630: Climb batch 23, listed for his review (12 lines)
  - 642: Climb batch 24, listed for his review (15 lines)
  - 657: Climb batch 25, listed for his review (16 lines)
  - 673: Climb batch 26, listed for his review (9 lines)
  - 682: Climb batch 27, listed for his review (7 lines)
  - 689: Climb batch 28, listed for his review (8 lines)
  - 697: Climb batch 29, listed for his review (16 lines)
  - 713: Climb batch 29b, listed for his review (7 lines)
  - 720: Climb batch 30, listed for his review (10 lines)
  - 730: Climb batch 32, listed for his review (10 lines)
  - 740: Climb batch 31, listed for his review (11 lines)
  - 751: Climb batch 31b, listed for his review (7 lines)
  - 758: Climb batch 33, listed for his review (8 lines)
  - 766: Climb batch 33b, listed for his review (7 lines)
  - 773: Climb batch 34, listed for his review (6 lines)
  - 779: Climb batch 34b, listed for his review (6 lines)
  - 785: Climb batch 35, listed for his review (14 lines)
  - 799: Climb batch 35b, listed for his review (12 lines)
  - 811: Climb batch 36, listed for his review (13 lines)
  - 824: Not classified, to check (13 lines)
- 837: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 854: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 866: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, b5a758846..61b50cd34

- PLAN.md:811, under "Off the path, parked > Climb batch 36, listed for his review":

### Climb batch 36, listed for his review

- PLAN.md:813, under "Off the path, parked > Climb batch 36, listed for his review":

The items for him that climb batch 36, run 1 of `coordinator/CLIMB-BATCH-36.md` (rungs K, G, N and C, all four landed), left (`compile-ladder/climb-batch-36/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"). None holds a launch. Its one reserved point, G.reserved.1, not consequential, is listed in that record for the landing's one line, not here.

- PLAN.md:814, under "Off the path, parked > Climb batch 36, listed for his review":

- N.worker.1 and N.skeptic.1 of climb batch 36's rung N (row 1132, opened by the rung): on the compiled path, should a numeral coercion's number at a call go, as a numeral does (P-173, P-46), to the most specific declaration that its conversion reaches? That needs the checker to check a coercion's body at each numeral's four numbers, where it checks it once; walk already follows the rule. Default: as landed, the built reading, under which a number is a `ZZ` at a call that a declaration takes so, row 1132 open with its expected failure. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:884-898` (`typedApplication`); `ProjectFortress/compiler_tests/XXXNumeralCoercionNumberAtCallCompiled.fss:16-18`; `ProjectFortress/tests/NumeralCoercionNumberAtCallWalk.fss:16-17`; `explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md:161`.

- PLAN.md:815, under "Off the path, parked > Climb batch 36, listed for his review":

- N.skeptic.2 of climb batch 36's rung N (rows 1131 and 1132, opened by the rung): P-180 has a defect fixed, not only recorded in the ledger; should a later batch build the two departures that the rung leaves with expected failures? Row 1131 needs the checker to read another component's checked numeral coercion, which the worker built and removed because its refusal hung on the order of the compiles (D6); its symptom is `IntegerOverflow` when the class initializes at an integer type, and a silent infinity at `RR64` or `RR32`. Row 1132 needs a coercion's body checked once per numeral. Default: as landed, both rows open with their expected failures, their repair a later rung's by P-180. Evidence: `explorations/coordinator/POSITIONS.md:32`; `explorations/compile-ladder/rung-numeral-coercion-body/SKEPTIC.md:115`; `explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md:136`; `ProjectFortress/compiler_tests/XXXNumeralCoercionNumberInfinityImported.fss:8-9`; `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ.java:66-69`.

- PLAN.md:816, under "Off the path, parked > Climb batch 36, listed for his review":

- G.worker.1 and G.skeptic.1 of climb batch 36's rung G (row 1135, opened by its skeptic): walk's load check now refuses a numeral type written as a return type, a variable's or a field's type, but reads none written as a static parameter's bound, in an `excludes`, `throws` or `where` clause, a `typecase` arm or a type ascription, which the text excludes and the checker refuses at every place but a parameter's type. Measured for the bound and the arm: walk loads and runs both, old and new. Decision not taken: (a) walk refuses every place that the checker refuses, before the switch-over; (b) these stay the checker's once walk runs it (P-12), row 1135 recording the departure until then; (c) the departure marked deliberate. No default on record; as landed, (b)'s row is open with two expected failures. Evidence: `Specification/basic/expressions/literals.tex:280-283`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1212-1261`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:67-71`; `ProjectFortress/tests/XXXNumeralTypeBoundWalk.fss`, `XXXNumeralTypeTypecaseWalk.fss`; `explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md:168`, `SKEPTIC.md:35`.

- PLAN.md:817, under "Off the path, parked > Climb batch 36, listed for his review":

- K.worker.1 and K.skeptic.1 of climb batch 36's rung K (row 1136, opened by its skeptic, `CONTESTED`): fork K3 makes a tie that the rules leave a static error, but the rung leaves to the overloading check a tie among the unit's own declarations or among duplicates, so that its refusal, which gated tests pin (the team's `XXX7e.test` by `compile_err_equals`), stays the one reported. The skeptic found the exception's premise failing: two generic declarations at excluding bounds, a set the overloading check accepts, called at a type bounded by both, compile and take the first by place in the unit, and are refused 'Ambiguous call to function f' when they come from an api. Is that the reading of K3, or should the error stand in the unit too, the pinned messages changed, or the first be kept across units? No default on record; as landed, the exception, row 1136 open. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1185-1219` (`head`, `ofThisUnit`, `duplicates`), `:1211-1213`; `ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:269-279`; `ProjectFortress/compiler_tests/GenericTieInUnitFirstByPlace.fss:34-45`, `GenericTieImportedAmbiguous.fss:6`; `explorations/compile-ladder/rung-checker-most-specific/REPORT.md:227`, `SKEPTIC.md:35`.

- PLAN.md:818, under "Off the path, parked > Climb batch 36, listed for his review":

- K.worker.2 of climb batch 36's rung K (row 770, rewritten by the rung), told: the export check refuses an api whose trait and an object below it both declare a functional method of one name and parameter type, with or without a `comprises` clause ('due to different method num', 'Asbtract method num ... is not declared in the API'), where the overloading check now accepts the pair; the refusal is untraced, and no rung holds it. Default: as landed, row 770 open, its repair a later rung's by P-180. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:791-800`, `:829-850`; `ProjectFortress/compiler_tests/XXXApiFunctionalMethodOfComprisedObject.test`; `explorations/compile-ladder/rung-checker-most-specific/REPORT.md:228`.

- PLAN.md:819, under "Off the path, parked > Climb batch 36, listed for his review":

- K.worker.3 of climb batch 36's rung K (row 1094, rewritten by the rung), told: row 1094 now holds the dotted form in a trait whose `comprises` clause lists types too: the revised `Specification/basic/expressions/var-ref.tex:70-74` keeps the trait's type "in the signature of each method declaration", from which the overloading check departs for a dotted method (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:214`, `:733-734`). Its repair is not scheduled. Default: as landed, row 1094 open with `XXXSelfTypedMethodNarrowedReturn` and `XXXComprisesDottedMethodNarrowedReturn`. Evidence: `explorations/compile-ladder/rung-checker-most-specific/REPORT.md:229`.

- PLAN.md:820, under "Off the path, parked > Climb batch 36, listed for his review":

- K.skeptic.2 of climb batch 36's rung K (row 879, `CONTESTED`, closed by the batch): row 879's question, "plain trait (P-146) or intersection" in a `comprises T` trait's signatures, is answered by fork K1's default, and the gather closed it with `--settled` naming the fork. Is a batch fork's default enough to settle a `CONTESTED` row, or should P-146 be widened to the `comprises` case? Fork K1 itself waits for him as review-queue item 621. Default: as landed, row 879 closed by `ProjectFortress/compiler_tests/ComprisesOwnParameterNarrowedReturn.fss:13-21`; reopened if item 621 goes the other way. Evidence: `explorations/coordinator/CLIMB-BATCH-36.md:425`; `explorations/compile-ladder/rung-checker-most-specific/SKEPTIC.md:59`.

- PLAN.md:821, under "Off the path, parked > Climb batch 36, listed for his review":

- review.1 of climb batch 36's merged-diff review, told: P-60's last sentence, "Rows 543 and 551: the compiled checker gives no call an intersection type where any declaration of the family has static parameters, ...", is false since rung K: the checker types such a call by the intersection where no declaration more specific than a tied one that the call may run has static parameters, the boundary that Appendix I's entry `revival-meet` states, and row 543 is closed. Neither the batch record's list for the record-landing nor the gather's record names it; the record-landing brings it in line, as it does P-174's two sentences. Default: as landed, P-60 unedited until then. Evidence: `explorations/coordinator/POSITIONS.md:59`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1006-1015` (`tieType`); `Specification/appendices/changes.tex:3745-3755`; `ProjectFortress/compiler_tests/CoverageReturnGenericFamily.fss`; `explorations/coordinator/CLIMB-BATCH-36.md:791-809`.

- PLAN.md:822, under "Off the path, parked > Climb batch 36, listed for his review":

- judge-review.1 of climb batch 36's judge on the merged-diff review (row 724): row 724, the code generator's 'ClassCastException: FunctionalMethod cannot be cast to Method' on an object that overloads a functional method with static parameters beside a plain one, is named in no Appendix I effect, as row 1123 was until the judge's repair named it; row 1123's program stops at it when compiled. The omission predates this batch and no review routed it, and rung C changed `OverloadSet.java` this batch, so a clause on the compiled path first needs its program run on the merged tree. Should the first rung that edits the entry "Overloading with static parameters" name row 724 in its effect, or should a repair name it now, at the cost of one compiled run? Default: the judge's way, the first rung in a later batch that edits the entry names it with its row; not taken into this batch's repair. Evidence: `explorations/fortress-gap-ledger.md:548`, `:479`; `Specification/appendices/changes.tex:3105-3143`; `explorations/compile-ladder/climb-batch-36/JUDGE-review.md:33`.


## The lines added after the landing, 61b50cd34..99035e231

None.

## The other lines that name a changed entry or row

- PLAN.md:9, under "Where we stand", 1404 characters, names F-34, F-352, F-396 and rows 994, 1091, 1099: The code generator refuses no declaration of the fourteen components that the distance stage checks, and every gate compiles them to jars (F-34). | Since climb batch 34b, a program compiled so can run against those jars, as one that prints a line of text does (F-381, F-396). | In a scratch tree switched onto the one library, three small programs ran compiled, but no matrix, none of the library's own array algebra and no microGPT (F-352). | A varargs call, a reduction over a range, `println` of a number and `=` of two strings do not run yet (rows 1091, 1099, 1098 and 994).
- PLAN.md:10, under "Where we stand", 919 characters, names F-53: At the last landed gate, climb batch 35b's (`1caac80b3b`, run 2 of `coordinator/CLIMB-BATCH-35.md`, its gate on `f23f91938d`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53;
- PLAN.md:12, under "Where we stand", 842 characters, names F-352, F-396: F-352, F-353, F-355, F-356, F-358, F-359, F-361). | The work now rests on these decisions of his: P-178, each built-in number type one `value object` under its own name, which both libraries now build (F-379, F-388, F-396);
- PLAN.md:37, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:57, under "The phases > Phase 4. The switch-over", 718 characters, names row 1094: `reviews/batch-34-review.md`, Part 5): rows 1093, 1094 and 1097, checker gaps that the run opened, and P.judge.1's form, with row 818's other forms, join item 3;
- PLAN.md:58, under "The phases > Phase 4. The switch-over", 866 characters, names rows 935, 994, 1091, 1099, 1100: Its review changes the list for the batch after (Part 5): row 1099, a method written twice in `FullScalarRange`'s class, joins item 1 with rows 994 and 1091, row 994 first, then `Arr` and `Dot` as run tests; | row 1100, the dispatch that follows the JVM's history, has climb batch 35's gate repair (`b7b5b0c02b`) and stays open, in the list beside row 935's order (`reviews/batch-35b-review.md`, Part 5);
- PLAN.md:59, under "The phases > Phase 4. The switch-over", 965 characters, names rows 499, 935, 994, 1046, 1047, 1091, 1099, 1100: The list that its review gave (`reviews/batch-35-review.md`, Part 5): climb batch 34b's list stands, rows 994 and 1091, then `Arr` and `Dot` as run tests, then rows 1098 to 1103; | row 935's order by the declarations' spans, with rows 499, 1046 and 1047's tests, and row 996's order beside it (judge-gate.3 there);
- PLAN.md:60, under "The phases > Phase 4. The switch-over", 1500 characters, names rows 499, 935, 994, 1046, 1047, 1091, 1099, 1100, 1112, 1122, 1124, 1125, 1127: The list for the batch after (`reviews/batch-35b-review.md`, Part 5): climb batch 34b's list stands, rows 994 and 1091, then `Arr` and `Dot` as run tests, then rows 1098 to 1103, row 1098 after review-queue item 616's default; | row 994 now also stands where `QQ.isFinite` stops, at `=/=` (rung M's skeptic, `SkOneQQ`). | row 935's order by the declarations' spans, with rows 499, 1046 and 1047's tests, and beside it row 996's order and row 1100, open, whose test guards the gate repair only under `-XX:hashCode=0`; | Then this run's rows, by P-180 and in this order: row 1125 with row 1122; | row 1127 with row 1112; | row 1124 with P-12's step or a rung, as the coordinator routes item 503's other forms;
- PLAN.md:67, under "The phases > Phase 4. The switch-over", 509 characters, names F-396: Under the selection, since climb batch 34b's rung C, the second set's `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits and the boxed-type table's two entries name its types, and the helpers' raise strings name an exception by its simple name, which each set's `LibraryNames` maps (F-396;
- PLAN.md:68, under "The phases > Phase 4. The switch-over", 1334 characters, names F-396: F-388, F-396).
- PLAN.md:73, under "The phases > Phase 4. The switch-over", 3123 characters, names F-34, F-396 and rows 1091, 1099, 1100: ...- The code generator over the one library (F-34): under the switch-over's setting it refuses no declaration of the fourteen components on climb batch 34's landed code (`285efad802`), 754 emitted, with no component failure, against 1 on climb batch 33b's (... | F-34). | F-396; | what stands between its jars and a run are classes that do not load or pass the verifier (rows 1091 and 1099; | row 1100, open, with climb batch 35's gate repair, `b7b5b0c02b`), and the compiled tests are cleared before the prelude is deleted with its tests kept (P-37;
- PLAN.md:74, under "The phases > Phase 4. The switch-over", 742 characters, names F-390 and rows 994, 1091: F-390; | What waits is its run test, `XXXOneLibraryRunVarargs`, with row 1091, `ImmutableArray1`'s `copy` written twice, and row 994 behind it (item 1 of the list for the batch after), and beside it row 1086, an overloaded varargs method or a generic varargs function.
- PLAN.md:75, under "The phases > Phase 4. The switch-over", 3550 characters, names F-352, F-396 and rows 994, 1091, 1099, 1100: - What the rehearsal met and no other line of this phase holds (F-352; | Walls that only the switch shows, built under the selection by climb batch 34b's rung C (F-396): the carriers beyond N5's table, that is the types that are objects in the one library (`Boolean`, `Char`, `NN32`, `RR32`, `FlatString`), now over payload classes; | F-396). | the onelibrary track runs with the verifier on, and rows 1091 and 1099 are its first refusals, and row 1100 stays open with its gate repair (`b7b5b0c02b`) (F-396). | The hand-written run-time classes are now abstract payload classes, and under the selection the second set's `LibraryNames` names the one library's seven over them (F-388, F-396). | the dispatch method's package in `OverloadSet` (row 994); | climb batch 34b's rung C closed row 874 (`f6469d96ec`), and row 994 is item 1 of the list for the batch after (`coordinator/CLIMB-BATCH-34.md`, "For the batch after, in this order";
- PLAN.md:76, under "The phases > Phase 4. The switch-over", 1480 characters, names F-377, F-396: F-372 to F-377). | Climb batch 34b's rung C wrote the one library's seven over the same payload classes, fork N4 (F-388, F-396);
- PLAN.md:89, under "The phases > Phase 4. The switch-over", 819 characters, names row 528: its `RR32`, rows 528 and 529, row 528 with the respelling of its test and a second test, `XXXNumeralEqualsRR32Compiled`; | whether P-37 takes a third exception for rows 528 and 1059 is item 101 under "Pavol's answers".
- PLAN.md:119, under "The phases > Phase 5. microGPT compiles", 1488 characters, names row 499: generic dotted methods' dispatch (row 495), a dispatcher that is not a template (row 496), and row 499's answers, repaired beside row 496's (review-queue item 159 (closed at the cleanup of 2026-11-05: settled));
- PLAN.md:120, under "The phases > Phase 5. microGPT compiles", 642 characters, names F-390, F-406 and row 770: F-406), and its checker sibling, row 770, stays open. | against the prelude varargs stays refused (F-390).
- PLAN.md:153, under "Pavol's answers, in the order they are needed", 420 characters, names row 528: Finding 1, fork E2 of run 2 (rows 528 and 1059): until the switch-over, compiled against the prelude, `c = 0` for `c: RR32` overflows the stack, and `=/=` at `RR32` and at `RR64` is refused, where walk answers.
- PLAN.md:265, under "Off the path, parked", 310 characters, names row 499: - Climb batch 6.5's rung G's dispatch change answers differently for a class it was not measured on (`SkPosBox`, `SkPosFixed`), a defect of the template dispatcher (row 499), repaired in phase 5 beside row 496's;
- PLAN.md:299, under "Off the path, parked > Phase 3's candidates at its end", 317 characters, names row 780: P-45's walk rows 779, 780, 787 and 788 beside them.
- PLAN.md:303, under "Off the path, parked > Phase 3's candidates at its end", 461 characters, names rows 762, 770, 780: - The other candidates of item 18, each with what it waits on, are in `coordinator/CLIMB-BATCH-20.md`, section 4: open among them, rows 444, 665, 691, 697, 700, 714, 716, 717, 719, 723, 725, 728, 746, 755 to 757, 760 to 764, 768, 770, 776 to 781, 785 and 787 to 790.
- PLAN.md:324, under "Off the path, parked > Climb batch 6.5b, listed for his review", 446 characters, names row 528: Row 528, which rung V put to him with no default, is on phase 4's line on the prelude's own defects with row 529, its default the switch-over by the one-library decision of 2026-09-21 (`reviews/batch-6.5b-review.md`, finding 3).
- PLAN.md:687, under "Off the path, parked > Climb batch 27, listed for his review", 318 characters, names F-334: - Finding A of the post-batch review, the distance's two crash rows in `Char` (row 929, closed by climb batch 28's rung K, F-334): for later gates, the distance report-only, as P-39 has it, or a crash that no rung declared red in the distance as in the count? Default: report-only, the record's.
- PLAN.md:694, under "Off the path, parked > Climb batch 28, listed for his review", 209 characters, names row 935: - K.worker.1 and K.skeptic.1 of climb batch 28's rung K (row 935): should the order of a call's overloadings, which a tie follows, become a property of the program? No default on record.
- PLAN.md:756, under "Off the path, parked > Climb batch 31b, listed for his review", 297 characters, names row 528: Default: retires with the prelude, beside rows 528 and 529;
- PLAN.md:771, under "Off the path, parked > Climb batch 33b, listed for his review", 1245 characters, names F-396: The one library's seven meet the same question since they took form 2 with climb batch 34b's rung C (F-388, F-396).
- PLAN.md:796, under "Off the path, parked > Climb batch 35, listed for his review", 744 characters, names row 1100: The repair ran it: the same build compiled `QQ`'s calls at `Ratio` in ant's onelibrary JVM and at `QQ` in one-JVM runs, so no rung's logic was the cause and no rung was dropped (row 1100).
- PLAN.md:797, under "Off the path, parked > Climb batch 35, listed for his review", 1025 characters, names rows 499, 935, 1046, 1047, 1100: The repair made one kind of tie free of the order, a tie that self's type makes in a trait that comprises an object (row 1100); | the checker's other ties still keep the first candidate in the overloadings' identity-hash order (row 935), and the code generator's orders still follow the hashes (row 996). | P-180 makes the remaining orders a rung (review-queue item 574, in part (a)): row 935's order by the declarations' spans, with rows 499, 1046 and 1047's tests, and row 996's order beside it. | Evidence: `explorations/fortress-gap-ledger.md` rows 935, 996 and 1100;
- PLAN.md:807, under "Off the path, parked > Climb batch 35b, listed for his review", 886 characters, names row 1124: row 1124, opened by it), one point: walk now refuses a numeral type written in a `comprises` clause, and P-174 names row 1124 where it named row 981, in the words that the rung proposed. | Should they keep that row? Default: as landed, row 1124 open with its expected failure.
- PLAN.md:808, under "Off the path, parked > Climb batch 35b, listed for his review", 1207 characters, names row 1125: - gather.1 of climb batch 35b's gather (row 1125, opened by rung L's skeptic), told: rung L turns a loud failure of the base into a quiet wrong value for one shape. | Default: as landed, row 1125 open with its expected failure, its repair a later rung's by P-180, first among this run's rows in the list for the batch after (phase 4, climb batch 35b's line).
- PLAN.md:809, under "Off the path, parked > Climb batch 35b, listed for his review", 1397 characters, names rows 1122, 1124, 1125: - review.1 of climb batch 35b's merged-diff review, told: two departures that rung L recorded are named in no Appendix I effect, where the gather named rows 1122, 1125 and 1126 in theirs. | row 1124, walk loading a numeral type written as a return type, a variable's or a field's type, is named nowhere in the entry "The numeral types, their conversion and their default", whose sentence on walk's refusals at load names the `extends` clause and static arguments but not the `comprises` clause that walk now refuses. | The batch's own correction, owed by the skill's rule: the first rung that edits either entry names rows 1123 and 1124 and the `comprises` clause, a change of text with no test, in the list for the batch after (phase 4, climb batch 35b's line).

## The lines that look stale at 99035e231

From `plan-moves.py --stale-at 99035e231`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:98, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:242, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on
