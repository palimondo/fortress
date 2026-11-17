<!-- The record-landing workflow's evidence of PLAN.md at abb18ec0a: its headings, the lines that the batch added (c1ce2a35e..7858d0e97) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

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
  - 41: Phase 4. The switch-over (58 lines)
  - 99: Phase 5. microGPT compiles (20 lines)
  - 119: Phase 6. microGPT fast (12 lines)
- 131: Pavol's answers, in the order they are needed (81 lines)
- 212: Work that can start now, with no decision (23 lines)
- 235: Off the path, parked (44 lines)
  - 279: Phase 3's candidates at its end (24 lines)
  - 303: Climb batch N's first run, listed for his review (9 lines)
  - 312: Climb batch 6.5b, listed for his review (10 lines)
  - 322: Climb batch 7b, listed for his review (23 lines)
  - 345: Climb batch 8, listed for his review (17 lines)
  - 362: Climb batch 9, listed for his review (27 lines)
  - 389: Climb batch 10, listed for his review (16 lines)
  - 405: Climb batch 11, listed for his review (13 lines)
  - 418: Climb batch 12, listed for his review (15 lines)
  - 433: Climb batch 13, listed for his review (21 lines)
  - 454: Climb batch 14, listed for his review (16 lines)
  - 470: Climb batch 15, listed for his review (20 lines)
  - 490: Climb batch 15b, listed for his review (4 lines)
  - 494: Climb batch 16, listed for his review (10 lines)
  - 504: Climb batch 17, listed for his review (14 lines)
  - 518: Climb batch 18, listed for his review (15 lines)
  - 533: Climb batch 19, listed for his review (20 lines)
  - 553: Climb batch 20, listed for his review (16 lines)
  - 569: Climb batch 21, listed for his review (18 lines)
  - 587: Climb batch 21b, listed for his review (12 lines)
  - 599: Climb batch 22, listed for his review (13 lines)
  - 612: Climb batch 22c, listed for his review (22 lines)
  - 634: Climb batch 23, listed for his review (12 lines)
  - 646: Climb batch 24, listed for his review (16 lines)
  - 662: Climb batch 25, listed for his review (16 lines)
  - 678: Climb batch 26, listed for his review (17 lines)
  - 695: Climb batch 27, listed for his review (22 lines)
  - 717: Climb batch 28, listed for his review (24 lines)
  - 741: Climb batch 29, listed for his review (29 lines)
  - 770: Climb batch 29b, listed for his review (15 lines)
  - 785: Climb batch 30, listed for his review (14 lines)
  - 799: Climb batch 32, listed for his review (23 lines)
  - 822: Climb batch 31, listed for his review (27 lines)
  - 849: Not classified, to check (13 lines)
- 862: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 879: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 891: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, c1ce2a35e..7858d0e97

- PLAN.md:141, under "Pavol's answers, in the order they are needed":

Before the switch-over, raised by climb batch 31's rung M (`compile-ladder/climb-batch-31/RECORD.md`):

- PLAN.md:143, under "Pavol's answers, in the order they are needed":

96. M.skeptic.1 of climb batch 31's rung M (rows 573 and 1038): an object's dispatch method tests the receiver in place of the argument where `self` is not first, and since rung M such a class loads, so `mark(1, Pq)` answers 3 with no error where walk answers 1; before the rung the class did not load. Should the repair, in `compiler/OverloadSet.java`, come before the switch-over? Default: no rung is planned for it; the two rows stay open with their expected failures. Evidence: `ProjectFortress/compiler_tests/XXXFunctionalMethodSelfSecondReceiverTested.fss:8-18`; `explorations/compile-ladder/rung-method-forwarders/SKEPTIC.md`, "Findings".

- PLAN.md:822, under "Off the path, parked > Climb batch 31, listed for his review":

### Climb batch 31, listed for his review

- PLAN.md:824, under "Off the path, parked > Climb batch 31, listed for his review":

The items for him that run 1 of climb batch 31 (`coordinator/CLIMB-BATCH-31.md`: rungs M, K, L, A, V and X, all six landed) left (`compile-ladder/climb-batch-31/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"). M.skeptic.1 is item 96 under "Pavol's answers"; gather.1 is the gather's own. None holds the batch: each is as landed until he answers.

- PLAN.md:826, under "Off the path, parked > Climb batch 31, listed for his review":

- M.worker.1 and the first part of M.skeptic.2 of climb batch 31's rung M (row 1037): is an object valid that reaches one trait's method along two paths, one of them through a trait that declares the method again at the same parameter types, running the lower trait's declaration, or must the object declare the method itself? By the text of the traits chapter the object inherits both declarations; walk and the code generator run the lower one, and the checker accepts the plain form and refuses the self-typed generic one. Default: as landed, the lower declaration runs, the row open. Evidence: `ProjectFortress/compiler_tests/TraitMethodDiamondRedeclaredCompiled.fss:8-22`; `Specification/basic/traits.tex:584-590`.

- PLAN.md:827, under "Off the path, parked > Climb batch 31, listed for his review":

- M.worker.2 and the second part of M.skeptic.2 of climb batch 31's rung M: the gatherings for the dispatch methods still compare domains as schemas over each trait's own bounds; should a later rung bring them onto the comparison at the instance, which changes the declarations that a dispatch method holds? Default: left as they are; no rung is planned. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1574`; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:500` and `:1171`.

- PLAN.md:828, under "Off the path, parked > Climb batch 31, listed for his review":

- L.worker.1 and L.skeptic.1 of climb batch 31's rung L (row 1039): who builds the exit out of an `atomic` block? The compiled handler and walk both discard the block's writes, and the specification retains them. Default: not built, the row open with its two expected failures; no rung is planned. Evidence: `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:293-314`; `Specification/basic/expressions/atomic.tex:60-63`; `ProjectFortress/compiler_tests/XXXExitOutOfAtomicCompiled.fss:7`; `ProjectFortress/tests/XXXExitOutOfAtomicWalk.fss:7`.

- PLAN.md:829, under "Off the path, parked > Climb batch 31, listed for his review":

- L.worker.2 and L.skeptic.2 of climb batch 31's rung L (rows 1040 and 1041, the second CONTESTED): is an exit that passes a `try` a `LabelException` that a `catch` clause may take, as walk's `try` has it and both libraries declare, or no exception, as the specification reads and the compiled path now does? Default: as landed, the compiled path follows the specification and walk's answer is row 1040. Evidence: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1453-1456`; `Library/FortressLibrary.fsi:1234`; `Library/CompilerLibrary.fss:191`; `Specification/basic/expressions/label.tex:52-78`; `ProjectFortress/tests/XXXExitThroughCatchWalk.fss:7`.

- PLAN.md:830, under "Off the path, parked > Climb batch 31, listed for his review":

- L.worker.3 and L.skeptic.3 of climb batch 31's rung L (row 340), told: the natural spelling of a search, `exit found with i` beside a last `-1`, does not compile until row 340 is repaired; a program binds the number to a typed variable first. Default: as landed. Evidence: `ProjectFortress/compiler_tests/XXXLabelNumeralValueCompiled.fss:5`; `explorations/compile-ladder/plan-31/probes/planner/PLabel.fss:3-10`.

- PLAN.md:831, under "Off the path, parked > Climb batch 31, listed for his review":

- L.worker.4 and L.skeptic.4 of climb batch 31's rung L, with fork L1 (row 1042, CONTESTED): which evaluation does an exit leave where its label block is evaluated more than once? Fork L1 gives each evaluation its own identity and the rung built it (102); walk takes the innermost running evaluation of that name (104); the specification scopes the target statically and can be read for either. Default: as landed, fork L1, the test asserting the compiled answer. Evidence: `ProjectFortress/compiler_tests/LabelEvaluationIdentityCompiled.fss:5`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:636-640`; `Specification/basic/expressions/label.tex:39-46` and `:61-66`.

- PLAN.md:832, under "Off the path, parked > Climb batch 31, listed for his review":

- V.worker.1 and V.skeptic.1 of climb batch 31's rung V (row 1044): should walk's load check refuse, at an object type, a more specific declaration that writes no return type beside a generic one, as it does at a trait type (row 785), or load it unjudged? Default: as landed, loaded unjudged, the row open with its expected failure. Evidence: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:520-521`; `ProjectFortress/tests/GenericBesidePlainObjectNoReturnTypeWalk.fss:7`; `ProjectFortress/tests/XXXGenericBesidePlainObjectNoReturnTypeWalk.fss:7`.

- PLAN.md:833, under "Off the path, parked > Climb batch 31, listed for his review":

- V.worker.2 and V.skeptic.2 of climb batch 31's rung V (row 1045): the team's `tests/XXXNonValueOfValue.fss` is green for a reason other than the one it was written for, 'Variable f is not defined.'; repair the team's test, or delete it for `tests/NonValueBelowValueTypeWalk.fss`, which holds the refusal? Default: the team's test left as it is, the row open. Evidence: `ProjectFortress/tests/XXXNonValueOfValue.fss:18`.

- PLAN.md:834, under "Off the path, parked > Climb batch 31, listed for his review":

- V.worker.3 of climb batch 31's rung V, told: the Effect of the entry `revival-expected-contexts` named row 1019 alone for the places where walk keeps a generic function; the rung's skeptic corrected it, and it now names the declared return type and the field of an object, row 1036. Default: as landed. Evidence: `Specification/appendices/changes.tex:2718-2720`; `Specification/basic/inference.tex:266-268`.

- PLAN.md:835, under "Off the path, parked > Climb batch 31, listed for his review":

- X.worker.1 and X.skeptic.1 of climb batch 31's rung X (row 542): the row's second pair as written, `f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]`, stays refused, now by the positional rule that P-45 keeps and not by the Return Type Rule; the language's rules allow it. Does row 542 close whole, or does the pair get a row of its own under the positional restriction? Default: the row closes whole, the pair pinned by its expected failure; as a functional method of the generic object it compiles and runs. Evidence: `ProjectFortress/compiler_tests/XXXOverloadGenericObjectDomainByPosition.test:3`; `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:201-215`; `Specification/advanced/overloading.tex:644-651`.

- PLAN.md:836, under "Off the path, parked > Climb batch 31, listed for his review":

- X.worker.2 and X.skeptic.2 of climb batch 31's rung X (row 1048): should the Return Type Rule also set aside the instances that cannot meet at a tuple of object types, and read a trait whose `comprises` clause lists one object as that object (P-60), as the prelude's number types are until the merge? The tuple pair is settled by the specification and recorded as row 1048; the arrow pair must stay refused; the one-object `comprises` clause is not decided. Default: as landed, the object type alone. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:146-150`; `ProjectFortress/compiler_tests/XXXOverloadReturnTupleDomain.test:3`; `Specification/basic/types-vals-vars.tex:537`.

- PLAN.md:837, under "Off the path, parked > Climb batch 31, listed for his review":

- X.worker.3 and X.skeptic.3 of climb batch 31's rung X: the dispatcher's cast of an arm's result to a range that is a static parameter is in `compiler/OverloadSet.java`, a file outside the rung's named ones; the skeptic found it sound and needed for the accepted pair to run. Keep it, or take it out and record the run as an expected failure? Default: kept, as landed (F-376). Evidence: `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1958-1971`.

- PLAN.md:838, under "Off the path, parked > Climb batch 31, listed for his review":

- X.skeptic.4 of climb batch 31's rung X (row 1049), told: walk loads the invalid pair of a generic declaration beside a plain one over an arrow type; the skeptic wrote no gated test, since rung V edits that load check in the same batch. The gather ran the skeptic's program on the tree with rung V applied: the pair loads still, so an expected-failure walk test can now be written. Default: the row open, no test yet. Evidence: `explorations/compile-ladder/rung-return-rule-object/SKEPTIC.md`, "Fix 1, a correction (commit 092490bfb8)"; `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The tests on the merged tree".

- PLAN.md:839, under "Off the path, parked > Climb batch 31, listed for his review":

- K.skeptic.1 of climb batch 31's rung K, with fork K1: the fork's consequence, 'so a call that verifies today keeps its bytecode', does not hold at a declared trait type strictly below self's trait, where the rung adds a `checkcast` and the base ran without one, the verifier not checking an interface type. Keep the cast there, or narrow it to object types, which a type variable's instance does not show until the template is expanded? Default: as landed, the cast kept; it cannot fail, since the checker's reading says that the value has the type. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7436-7459`; `explorations/compile-ladder/rung-comprises-cast/SKEPTIC.md`, "The reserved point: a cast at a place that verifies today"; `explorations/coordinator/CLIMB-BATCH-31.md:581`.

- PLAN.md:840, under "Off the path, parked > Climb batch 31, listed for his review":

- gather.1 of climb batch 31's gather, with review.1 of its merged-diff review and judge-review.1 of the review's judge (row 1051), told, and one placing asked: rung M's record left an object that extends a self-typed trait directly, whose body is `mx(self, other: T): T = if lt(other, self) then self else other end`, to rung K; on the merged tree that body still fails the JVM's verification at an object instance, 'Bad return type', since rung K casts no arm of a conditional (row 1051, noted). The one library's `MIN`, `MAX` and `MINMAX` of `StandardTotalOrder` have that shape, so the wall stands for a type that extends it once a program compiles against the one library. Default: the row open; `forIf` is one line for a later rung, by rung K's handover. Evidence: `Library/FortressLibrary.fss:291-294`; `explorations/compile-ladder/rung-method-forwarders/REPORT.md`, "The self-return at an object type"; `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The tests on the merged tree". The judge's repair named row 1051 in the Effect of Appendix I's entry on `self` in a self-typed trait and built no cast (`Specification/appendices/changes.tex:4445-4449`; `explorations/compile-ladder/climb-batch-31/JUDGE-review.md`, "For the curator", judge.1). Asked: the review and the gather want the rung for the conditional arm in `CodeGen.forIf` before the switch-over; nothing on record places it, and the placing is his (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7450`).

- PLAN.md:841, under "Off the path, parked > Climb batch 31, listed for his review":

- review-routed.1 of climb batch 31's merged-diff review (row 1051), a test owed by the next batch: the row's expected failure, `compiler_tests/XXXComprisesValueAtConditionalArmRun`, holds the conditional arm at a listed type only, and nothing gated holds it at a self-type parameter, the shape of the one library's `MIN` and `MAX` that the gather measured on the merged tree. The next rung that touches `CodeGen.forIf` or `castToTypeBelow` writes first an expected-failure run test with its link test, a trait `Tord[\T extends Tord[\T\]\]` with `mx(self, other: T): T = if lt(other, self) then self else other end` and an object that extends it, and names it in row 1051. Evidence: `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The gather's own point"; `ProjectFortress/compiler_tests/XXXComprisesValueAtConditionalArmRun.fss:5-7`; `Library/FortressLibrary.fss:291-294`.

- PLAN.md:842, under "Off the path, parked > Climb batch 31, listed for his review":

- review-routed.2 of climb batch 31's merged-diff review (row 1049), a test owed by the next batch: the row has no gated test, and the entry of X.skeptic.4 above says why one can now be written. The next rung that touches walk's load check writes an expected-failure walk test of `ident[\T\](x: T): T` beside `ident(x: Circle -> Circle): (Circle -> Circle)`, which loads where the Return Type Rule refuses it, and names it as the row's reproducer. Evidence: `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The tests on the merged tree"; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:511-527`.

- PLAN.md:843, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-review.2 of climb batch 31's merged-diff review's judge, told, not asked: the `fortress-repo` skill still says that a compiled body of a self-typed trait that returns `self` fails the JVM's verification (row 695), which rung K's commit `6df780a7d0` fixed; rows 1050 and 1051 are what stands. Default: left for the skill writer, the file being the coordinating session's to edit. Evidence: `.claude/skills/fortress-repo/references/revival-changes.md:41`; `explorations/fortress-gap-ledger.md:988` (row 695, FIXED); `explorations/compile-ladder/climb-batch-31/JUDGE-review.md`, "For the curator", judge.2.

- PLAN.md:844, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-gate.1 of climb batch 31's gate judge (row 1046), a decision taken where the record does not settle it: the row's defect is settled by the specification, for which the skill asks a gated `XXX` test, but the gate was red on that test, since the compile reaches the checker's crash or not by what the same JVM compiled before; the repair withdrew the test and keeps the row and a probe. Keep it so, decide the tie in the checker in a rung of its own, or run each compile test in a JVM of its own? Default: as repaired, the defect ungated until the tie is decided; reversible, and it does not hold the push. Evidence: `explorations/compile-ladder/climb-batch-31/JUDGE-gate.md`, "For the curator", 1; `explorations/compile-ladder/rung-return-rule-object/probes/XXXOverloadGenericObjectTwoParams.fss:8-12`; `.claude/skills/fortress-repo/references/tests-writing.md`, "How a defect is recorded".

- PLAN.md:845, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-gate.2 of climb batch 31's gate judge (rows 499, 1047 and 1046), a defect with no place in the plan by name: a call tied among generic candidates whose instances have one parameter type is resolved by the order of the overloadings, which varies with what the JVM compiled before, and the suite shuffles its files with the clock as seed, so any gated test whose verdict hangs on that head can turn red in some order. Asked: where is the checker's tie repaired? The entry on row 499 above places its dispatcher half in phase 5 only; row 499's history names the repair, a comparison on declared domains. Default: no rung is planned. The gate's `ant testFast` printed 'FORTRESS_UNITTESTS_SEED=1a1e78bd82d_16', so the red order may be replayable; not checked by a run. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1104-1108`; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:1236` and `:1255-1257`; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/CompilerJUTest.java:42-43`; `explorations/compile-ladder/climb-batch-31/JUDGE-gate.md`, "For the curator", 2.

- PLAN.md:846, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-gate.3 of climb batch 31's gate judge, told, not ruled and not traced: the call `b: Box[\Square\] = keep(Box[\Square\](Square))` of the gated test `OverloadReturnObjectDomain` is fitted at `Box[\Square\]` by both the top-level `keep[\T\]` and `Box[\U\]`'s functional method `keep(self)`, and the test asserts 'keep Box'. It was green in the three suite histories on record; whether its verdict can vary with the head of the tie is not established. Default: the test as landed; whoever takes the tie's repair traces it first. Evidence: `ProjectFortress/compiler_tests/OverloadReturnObjectDomain.fss:10`, `:16` and `:26`; `explorations/compile-ladder/climb-batch-31/JUDGE-gate.md`, "For the curator", 3.

- PLAN.md:847, under "Off the path, parked > Climb batch 31, listed for his review":

- judge-gate.4 of climb batch 31's gate judge, two tool remarks, neither red: the gate brief's `atomic_runs` returns 1 whenever the summary holds '# testFast: BUILD FAILED', though the atomic runs were 72 of 72 PASS; and the harness prints 'Saw failure, but did not satisfy' also where the command did not fail, without the exit code, which is why the gate could not say what the compile did. Default: both left as they are; the first is the batch script's, between batches. Evidence: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:399-408`; `explorations/compile-ladder/climb-batch-31/JUDGE-gate.md`, "For the curator", 4.


## The lines added after the landing, 7858d0e97..abb18ec0a

None.

## The other lines that name a changed entry or row

- PLAN.md:10, under "Where we stand", 3329 characters, names F-53: At the last landed gate, climb batch 32's (`567c36dadc`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53;
- PLAN.md:37, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:53, under "The phases > Phase 4. The switch-over", 1460 characters, names rows 81, 319, 322, 571, 695, 732, 875, 990, 991: Run 1: M, one method written once and a body inherited through an api's trait (rows 990, 732, 571); | L, `label` and `exit`, and a name of its own for each closure class (rows 81, 315); | A, `atomic` as an expression and a mutable field inside a transaction (rows 875, 319); | K, the cast at a `comprises` type (rows 991, 695). | Behind the first compiled matrix, from climb batch 30b: `tryatomic` on both paths, an `atomic` block as a later argument (row 322), row 497's test, and the numerals' parser leftovers (rows 960, 963, 957). | For the batch after it, in its record's order: the kind environment (rows 812, 822), the intersection as a receiver and the partial type assumption (rows 540, 818), the code generator's stable order (row 996), varargs, and row 571's own shape if M leaves it open.
- PLAN.md:66, under "The phases > Phase 4. The switch-over", 1933 characters, names rows 81, 732, 875, 890, 990, 991: Each kind is in its ledger row: varargs 8 (row 624), `label` 4 (row 81), the kind environment 4 (rows 822 and 812), the range operators over pairs and triples 4 (row 819), a closure class written twice 2 (row 315), an intersection as a receiver 1 (row 540), and `atomic` as an expression 1 (row 875); | The count does not see a class that is emitted and fails when it loads: rows 990, 991, 992 and 732, which that batch's rungs M, K and T repair. | rows 889 to 892 are from climb batch 25's rung C (climb batch 30's rung X closed row 888, the nested `try`), with row 890 in review-queue item 350 (closed at the cleanup of 2026-11-05: settled);
- PLAN.md:68, under "The phases > Phase 4. The switch-over", 1970 characters, names rows 81, 990, 991: Walls that a test against the prelude shows, which climb batch 31 takes: the methods written twice into 27 classes of the library (row 990), the missing cast that stops the library's static initializer at `QQ` (row 991), and the tuple index type, the wall of every matrix (row 992). | Rows 624, 81 and 315 stand on the path of a program that prints one line.
- PLAN.md:69, under "The phases > Phase 4. The switch-over", 2077 characters, names rows 542, 550, 997, 998: row 550; | Two repairs of the interpreter come first, since both defects stand today at `NN32` and `RR32` and the merge brings them to the types that every program uses: a generic method of a trait whose type parameter is bounded by a value type (row 997), and the load check that loads a generic declaration beside a plain one over an object type against the Return Type Rule (row 998). | Then the checker's row 542, before the switch-over (the same note, "Estimate in rungs, tests first, on both paths"). | His, not taken: where the five live, whether the two repairs come first, `round` of an `RR64`, a `typecase` arm at a removed name, and row 542's place (review-queue items 516 to 520).
- PLAN.md:112, under "The phases > Phase 5. microGPT compiles", 1447 characters, names rows 322, 340: - The code generator's other gaps on microGPT's path, each row its own home: the APL base's `typecase` (row 340), by reading (C4's two local functions in `step` have the shapes that compile since climb batch 26's rung L, F-320; | and row 322, an `atomic` block or a `try` as a call's later argument, which runs in order and not as a task;
- PLAN.md:122, under "The phases > Phase 6. microGPT fast", 772 characters, names row 641: - The transaction checks around mutable variables (row 641): the compiled code checks for a transaction before every read and write of a mutable variable, outside `atomic` too, about 1 to 2 ns a check, 64 % of a loop over an array with mutable locals and 9 to 15 % of a scalar accumulator loop (`perf-probes/transactions/REPORT.md`).
- PLAN.md:293, under "Off the path, parked > Phase 3's candidates at its end", 271 characters, names row 695: - The other candidates of item 18, each with what it waits on, are in `coordinator/CLIMB-BATCH-20.md`, section 4: open among them, rows 444, 665, 691, 695, 697, 700, 714, 716, 717, 719, 723, 725, 728, 746, 755 to 757, 760 to 764, 768, 770, 776 to 781, 785 and 787 to 790.
- PLAN.md:326, under "Off the path, parked > Climb batch 7b, listed for his review", 240 characters, names row 542: - The compiled Return Type Rule is stricter than the POPL 2019 paper where the more specific declaration's domain is an object type (row 542);
- PLAN.md:339, under "Off the path, parked > Climb batch 7b, listed for his review", 198 characters, names row 550: - Row 550: walk's lifted return rule keeps `pickFirst` refused, stricter than answer 9's rule over every instance;
- PLAN.md:530, under "Off the path, parked > Climb batch 18, listed for his review", 413 characters, names row 550: the rename moves row 550's note that cites it.
- PLAN.md:672, under "Off the path, parked > Climb batch 25, listed for his review", 259 characters, names row 890: - C.skeptic.1 of climb batch 25's rung C (row 890): should the new `forbid` path run a `try`'s `finally` clause now, ahead of the general repair? Default: as landed, recorded and not fixed.

## The lines that look stale at abb18ec0a

From `plan-moves.py --stale-at abb18ec0a`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 515. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:13, under "Where we stand": list: it names items in (a) among open ones: 528, 530, 533, 547. The line: - **Next.** Climb batch 32 landed (phase 4's tenth line), and its post-batch review is committed (`c0c35b4f9e`). Its record-landing routes the review's list, an
LOOK PLAN.md:91, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:233, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on
