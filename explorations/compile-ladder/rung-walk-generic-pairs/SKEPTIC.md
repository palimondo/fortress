# Rung G of climb batch 17: the skeptic's check

Verdict: approved, with one fix of the change and corrections of the record; no fix is contested.

The head judged is the worker's `b5a497c04`. My commits: `4dab0533d` (the worker's REPORT.md and record.md from the run's journal), `36afa7eb1` (the fix, section 2), `4ec3235e2` (the correction of `XXXDispatchTwoCommonParentsWalk`, section 4), `754a6aa37` (REPORT.md and record.md corrected, section 4), and this file.

## 1. What I checked

1. Count and distance. `git diff --name-only 3aea3da53f57c9062d2b9a9bab4e5d14060a088f...HEAD` lists only `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, files of `ProjectFortress/tests/`, `Specification/advanced/overloading.tex`, `Specification/appendices/changes.tex` and `explorations/`, before my fix and after it. Neither stage can move, and the report says neither ran (REPORT.md section 11). The compiled checker is not touched, so I ran no count stage.
2. Test first, in the worker's transcript (one transcript, `agent-a88725b8d143da844.jsonl`). The tests were written at 15:40:03 and 15:40:07 (`ubQhPZ`, `nYpdq5`) and renamed before; the failing run `q2ntjp` started at 15:40:17 and ended by 15:40:31 (`nTCUGN`): `FAILURES!!!` / `Tests run: 6,  Failures: 5,  Errors: 0`, with 'with generic type, at least one pair of parameters must have excluding types' for the three load tests and 'Missing expected refusal at load' for the two same-domain tests (`tmp/rung-walk-generic-pairs/h-base.txt:14,58,62`). The first edit of Java is 15:42:07 (`Jo8V1n`), the last 15:42:32 (`MAn4FE`), the build 15:42:39 to 15:43:44 (`QMakd1`, `HgLvFr`). The passing run `z4pWrL` started at 15:44:01, after the last change of code: `OK (27 tests)`. Then `ant testSystem` (`H6AtZs`, 158 / 154 / 157 / 163, `BUILD SUCCESSFUL`) and the specification edits from 15:55. The order holds, and `recordedFailure` and `recordedPass` quote those runs.
3. The diff, line by line, against the section, `Specification/advanced/overloading.tex:531-660` and P-45 and P-152. The widening (`OverloadedFunction.java:766`) and the equal-domains refusal (`:533-540`, `sameDeclaredDomains` `:806-822`) do what the report says. The Return Type branch it reuses does not read the rule over every instance (section 2).
4. Precedent. The worker's precedent is right: `genericPairValid`, climb batch 16's reading (F-238). The site the widening exposes has a precedent on the other path: ledger row 536, the compiled checker's Return Type Rule "checked one solved instance of the less specific declaration where the paper asks for every instance", fixed in `e2f1aa7e8` by keeping the outer declaration's unforced static parameters free (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:83-127`). My fix follows that reading in walk's terms.
5. The tests. Each is named by its topic and carries one comment line; the specification citations name a file and a section that say what the message says (`DispatchRenamedGenericArmWalk.fss:30,32` cite `Specification/basic/overloading.tex`, sections "Principles of Overloading" and "Overloading Resolution", both present at `:55` and `:291`). Two assertion messages of the promoted tests still say "row 159" (`DispatchRenamedGenericArmWalk.fss:30`, `DispatchSwappedGenericArmWalk.fss:28`); a message, not a comment, so I left them.
6. My own programs, under walk and compiled, old against new (section 3).
7. The homes of every defect (section 5).
8. The ledger: `ledger.py find` for "No Duplicates", "Return Type Rule", "multiple declarations same parameter type", "duplicate entry" and the test names; rows 536, 550, 589 and 537 bear on the rung (sections 2 to 5).
9. The report's provenance lines, each opened: `Specification/basic/overloading.tex:100-110` says the declared-domain reading; `OverloadedFunction.java:801`, `:781-783` at the base are `genericPairValid` and `plainInside && genInside`; `:628` and the team's `:573` at `a874948ac` are the equal-lists message. True as written. Its sentences that were false are corrected (section 4).
10. Competing declarations: `grep -rlw` over `ProjectFortress/tests`, `ProjectFortress/compiler_tests` and `ProjectFortress/src/com/sun/fortress` finds each name the rung and I add (`GenericPairNestedBoundsWalk`, `GenericMethodBesideConditionedMethodWalk`, `DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk`, `GenericReturnRuleOuterParamWalk`, `GenericReturnRuleInvariantWalk`, `GenericReturnRuleHoldsWalk`, `sameDeclaredDomains`, `declaredInside`, `returnRuleAtEveryInstance`, `fixedByArgument`) only in its own file. My first draft added a `mentions` that the file already had (`OverloadedFunction.java:1144` at b5a497c04, `:1222` after the fix); I removed mine before the build and call the file's.
11. The failure-mode question: section 6.

## 2. The fix: the Return Type Rule at one instance (a defect of the change)

**Finding.** The widened `validOnDeclaredDomains` sends every refused pair of two own generics to `genericPairValid`, whose Return Type branch compares the inner declaration's return type with the outer's at the one instance that walk's inference finds holding the inner's declared domain (`OverloadedFunction.java:852-853` at b5a497c04). The Return Type Rule asks it "for every instance of $d_2$ that is applicable" to every argument of $d_1$ (`Specification/advanced/overloading.tex:555-559`). An argument below the inner's declared domain can select a smaller instance of the outer, so walk loaded pairs the rule refuses, and that the base refused and the compiled checker refuses:

    cd tmp/rung-walk-generic-pairs/skeptic && /home/user/fortress-genpairs/bin/fortress SkRetInst.fss        # on b5a497c04
    A Circle
    B Square
    rc=0

    $OLD compile CRetInst.fss                                                                              # the same pair, compiled
    For f,
    the return type of [\U extends Round\](U, Round)->Round @ CRetInst.fss:10:1-48 should be a subtype of the
        return type of [\T extends Shape\](T, T)->T @ CRetInst.fss:9:1-39

`SkRetInst` is `f[\T extends Shape\](x: T, y: T): T` beside `f[\U extends Round\](x: U, y: Round): Round`: for two Circles the outer's instance at Circle returns a Circle, and the inner returns only a Round. `SkRetListPlain`, `f[\T extends Shape\](x: T): Box[\T\]` beside `f[\U extends Round\](x: U): Box[\U\]`, loaded the same way ('A Circle', 'B Square'), and the checker refuses it ('the return type of [\U extends Round\]U->Box[\U\] ... should be a subtype of the return type of [\T extends Shape\]T->Box[\T\]'): for a Circle the outer's instance at Shape returns a `Box[\Shape\]`. Both were refused on the base ('with generic type, at least one pair of parameters must have excluding types'). This turns a refusal into a quiet acceptance of a program the specification refuses, and walk and the checker then disagree, against P-45's "so that walk and the checker accept the same pairs".

**The ways.** (a) Leave `genericPairValid` as it is and record the departure: walk would then accept invalid programs. (b) Port the checker's whole reading (`OverloadingOracle.scala:83-127`): solve the outer's static parameters from the inclusion, keep the unforced ones free, and check the inner arrow below the special arrow at the meet; walk has no meet of symbolic types or arrow-schema subtyping, so this is a new subsystem. (c) Keep the one-instance check and accept it only where that instance stands for every applicable instance, which a reading of the parameter types decides; otherwise refuse, as the base did. I took (c).

**The fix** (`36afa7eb1`, `returnRuleAtEveryInstance` and `fixedByArgument`, `OverloadedFunction.java:867-937`, called at `:854-859`): the holding instance stands for every applicable instance when each static parameter of the outer that its return type names is fixed by a static argument of one of its parameter types (no type extends two instances of one generic type), or the outer returns that type parameter itself, whose least applicable instance is the join of the argument's types at the parameters it is the type of, and the inner either returns a type parameter of its own that is the type of no other parameters (its instance is the join of a part of those types), or has at one of those positions an object type below which its return type lies (an object type has no other non-Bottom subtype). It calls the file's own `mentions` (`:1222`). It changes no team line: `genericPairValid` is the revival's (`git blame -L 840,860 3aea3da53 -- .../OverloadedFunction.java`: 21 lines of `9879d4386`).

**Settled by** `Specification/advanced/overloading.tex:555-559` ("for every instance of $d_2$ that is applicable to it, some instance of $d_1$ is applicable to it whose return type is a subtype of the return type of that instance of $d_2$"), the section's "by the No Duplicates, Return Type and Meet Rules", and P-45 ("by the checker's rules ... so that walk and the checker accept the same pairs"). The worker's decision 4 argues for reusing `genericPairValid`'s reading rather than a new one; it argues the form, not that such pairs load, and the fix keeps that reading wherever it is exact.

**Tests**, through the harness:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-generic-pairs/skeptic/h-head \
        ProjectFortress/tests/GenericReturnRuleOuterParamWalk.fss ProjectFortress/tests/GenericReturnRuleOuterParamWalk.test \
        ProjectFortress/tests/GenericReturnRuleInvariantWalk.fss ProjectFortress/tests/GenericReturnRuleInvariantWalk.test \
        ProjectFortress/tests/GenericReturnRuleHoldsWalk.fss
    # 17:08:18 UTC, on b5a497c04's build, before my edit
    . interpret tmp/rung-walk-generic-pairs/skeptic/h-head/tests/GenericReturnRuleOuterParamWalk
     Missing expected refusal at load
    . interpret tmp/rung-walk-generic-pairs/skeptic/h-head/tests/GenericReturnRuleInvariantWalk
     Missing expected refusal at load
    Tests run: 3,  Failures: 2,  Errors: 0

`GenericReturnRuleHoldsWalk` (two valid shapes, `lead` whose inner returns its own type parameter and `pin` whose inner returns the object type of a parameter) was green there and guards the fix against refusing them. The build of the fix ran 17:09:52 to 17:10:46 (`BUILD SUCCESSFUL`). Then, at 17:11:00, the three tests with the six of the rung, their `.test` files, the 21 tests the brief and the report keep, the corrected `XXXDispatchTwoCommonParentsWalk`, `XXXGenericOverload`, `XXXGenericOverload2`, `XXXGenericOverload3` and `XXXGenericInstanceReturnOnlyWalk`:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-generic-pairs/skeptic/h-fix <the 35 programs and their .test files>
    OK (35 tests)

The suites the fix reaches, once, on its code state (the code of `36afa7eb1`):

    ant testSystem      Tests run: 156 / 157 / 158 / 164, Failures: 0, Errors: 0 (635: the worker's 632 and my three files); BUILD SUCCESSFUL; Total time: 3 minutes 6 seconds
    ant testSpecData    Tests run: 130, Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 57 seconds

and the model, since the fix can refuse a family at load: `explorations/coordinator/tools/mg-run.sh tmp/rung-walk-generic-pairs/skeptic/mg G17skeptic` printed 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' for `MicroGptFlatQuick` (rc=0, 40 s) and for `MicroGptAplQuick` (rc=0, 48 s). The three-way merge with rung W's head `ca1a6896e` is clean (`git merge-tree --write-tree HEAD origin/wip/rung-walk-method-sargs` exits 0).

The fix is conservative: a pair whose holding instance it cannot show to stand for every instance is refused, as on the base, so the widening loads fewer pairs than the rule allows in shapes I could not show valid; I found no valid pair it refuses among my programs.

## 3. My programs, old against new

Under `tmp/rung-walk-generic-pairs/skeptic/` (scratch). Walk new is `bin/fortress P.fss` in the rung's tree at FORTRESS_THREADS=1 (b5a497c04, then the fix); old is `/home/user/fortress-base17/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base17 /home/user/fortress-genpairs/tmp/old-caches P.fss`; compiled is the same tool's `compile` and `run`, the old code, which is also the new compiled code since the rung changes nothing the compiled path runs (the new tree's caches were emptied by its build, and I compile no library). The fixed code's runs of `SkRetInst`, `SkHolds`, `SkMeetCross`, `SkSameOne` and `SkRetInstOk` at FORTRESS_THREADS=4 print what they print at 1; the diff's one field change is the removal of `withdrawn`, a field of the per-pair comparison object.

| program | walk, base | walk, b5a497c04 | walk, the fix | compiled | the specification |
|---|---|---|---|---|---|
| `SkRetInst` (above) | refused, excluding types | loads, `Circle`, `Square` | refused, excluding types | refused, the Return Type Rule | refused |
| `SkRetListPlain` (`Box`) | refused | loads | refused | refused, the Return Type Rule | refused |
| `SkRetInstOk`: inner `f[\U extends Round\](x: U, y: Shape): U` | refused | loads, `Circle`, `Circle`, `Square` | the same | compiles, runs | valid |
| `SkHolds` (`lead`, `pin`) | refused | loads, `Circle`, `Square`, `Circle`, `Square` | the same | | valid |
| `SkMeetCross`: `f[\T\](x: T, y: ZZ32)`, `f[\U\](x: ZZ32, y: U)`, `f(x: ZZ32, y: ZZ32)` | refused | `both`, `left`, `right` | the same | `both`, `left`, `right` | valid (Meet) |
| `SkMeetCrossNone`, without the third | refused | refused | | | refused |
| `SkDupTT`: `f[\T\](x: T, y: T)` beside `f[\U, V\](x: U, y: V)` | refused | refused | refused | refused, 'multiple declarations of f with the same parameter type: (T, T)' | refused (equal domains) |
| `SkDupTTBound`, both bounded by `Wide` | refused | refused | | | refused |
| `SkSameOne`: `f[\T extends Wide\](a: T)` beside `f(a: Wide)` | loads, `generic` | refused, the same types | the same | refused, 'multiple declarations of f with the same parameter type: T' | refused |
| `SkAnyOne`: `g[\T\](a: T)` beside `g(a: Any)` | loads, `generic` | refused, the same types | the same | compiles, runs `generic` | refused (NEW-G-1) |
| `SkInsideStrict`: `f[\T extends Mid\](a: T, b: T)` beside `f(a: Wide, b: Wide)` | `mid`, `wide` | the same | | `mid`, `wide` | valid |
| `SkBoxInv`: `f[\T extends Wide\](a: T, b: Box[\T\])` beside `f(a: Wide, b: Box[\Wide\])` | `plain`, `generic` | the same | | | valid |
| `SkFruitStrict`: `g[\T extends Fruit\](a: T, b: T)` beside `g(a: Any, b: Any)` at `g(Apple, Cherry)` | `plain` | `plain` | | `generic` | `generic` (row 589) |
| copy of `XXXDispatchTwoCommonParentsWalk` (`g[\T\]` beside `g(a: Any, b: Any)`) | runs `plain`, its FAIL | refused, the same types | | compiles, runs `generic` (`CTwoParents`) | refused (equal domains) |
| copy of `XXXGenericOverload` (team) | refused, excluding types | loads, prints 'FAIL: should have failed in generic overloading of f' | the same | compiles (`CGenOv`); the run dies, 'Unable to read serialized data' (row 537) | valid (P-45) |
| copy of `XXXGenericOverload2` (team) | refused | loads, prints its FAIL line, then stops at its `f[\A, B\]`: '(first) a is more specific than (second) b but ...' | the same | `CGenOv2` without that line compiles, runs `2` | valid at load |
| copy of `XXXGenericOverload3` (team) | refused at lines 22 and 23, excluding types | refused at lines 21 and 22, 'fails because their parameter lists have the same types' | | | refused (equal domains) |
| copies of `XXXGenericInstanceReturnOnlyWalk`, `XXXGenericBesidePlainReturnParam`, `XXXGenericBesidePlainReturnRule` | as new | the same failures | | | |
| one program per library api that no walk test imports (`Containment`, `FortressAst`, `FortressAstUtil`, `FortressSyntax`, `GeneratorLibrary`, `Lazy`, `OneShotFlag`, `Reader`, `SetClosure`, `StatDigest`, `Testable`, `TypeProxy`) | each 'loaded X', `GeneratorLibrary` stopped by a name clash with `CompilerAlgebra` | the same | | | |
| copies of `not_passing_yet/GenericOverload4` and `SymbolicOverloadBug` | as new | the same | | | |

The compiled column was run for `CSameOne`, `CTie`, `CTiePlain`, `CFruitPair`, `CAnyOne`, `CTwoParents`, `CFruitStrict`, `CMeetCross`, `CDupTT`, `CInsideStrict`, `CWhich`, `CGenOv`, `CGenOv2`, `CRetInst`, `CRetInstOk`, `CRetList` under `comp/`. `CWhich`, the specification's allowed `which` pair, stops the compile on a duplicate class entry, row 537's face for two parameters both named `T`.

## 4. Corrections

- `XXXDispatchTwoCommonParentsWalk` (row 589, `4ec3235e2`). Its pair, `g[\T\](a: T, b: T)` beside `g(a: Any, b: Any)`, has equal declared domains, so the rung's change refuses it at load, as the No Duplicates Rule does (`Specification/advanced/overloading.tex:548-549`), and the expected failure stayed green by that refusal and no longer by row 589's dispatch defect. Bounding `T` by `Fruit` makes the generic declaration strictly more specific, and walk still runs the plain one (`SkFruitStrict`). Through the harness: on the base's code (`FORTRESS_HOME=/home/user/fortress-base17 /home/user/fortress-base17/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-generic-pairs/skeptic/h-base ...`, 17:11:43) 'FAIL: J5/0:plain =/= J7/0:generic; ...' / ' OK Saw expected exception'; on the fix the same (`h-fix`); with the expected value set to `"plain"` for one run (17:12:08) ' Missing expected failure' / 'Tests run: 1,  Failures: 1,  Errors: 0', then restored. On the same base run, `GenericReturnRuleOuterParamWalk` and `GenericReturnRuleInvariantWalk` were green (refused for no excluding pair) and `GenericReturnRuleHoldsWalk` red (the base refuses its pairs). Settled by the No Duplicates Rule above; the path is outside the section's files (section 7).
- REPORT.md section 8 (`754a6aa37`): its "No ... team test ... is refused" left out two team tests that newly load, and its "A walk test whose verdict changes ...: none" was false (section 3's copies of the team's three tests and of row 589's). Its line citations past `genericPairValid` carry `b5a497c04` and the fix's numbers; the decisions keep the worker's numbers (decision 2's `:2084-2091` is `:2162-2169` after the fix).
- record.md (`754a6aa37`): the FACTS entry gets the Return Type reading and the bound `Any`; F-238's "with its return type below at the holding instance" is listed as half false; row 539's note cites `matchApart` at `36afa7eb1` (`:1088`); row 589's note (71 characters, the room left) and its claim, which only `close --claim` rewrites, for the gather; the new row NEW-G-1 (section 5), linted: `ledger.py check --rows` printed '1 rows, 0 fail the template'; the revival change names the refused and the loaded shapes.

## 5. Defects and their homes

- The Return Type Rule at one instance (section 2): home 1, repaired in `36afa7eb1`; `GenericReturnRuleOuterParamWalk`, `GenericReturnRuleInvariantWalk`, `GenericReturnRuleHoldsWalk`.
- NEW-G-1, the compiled checker's acceptance of `g[\T\](a: T)` beside `g(a: Any)` and of `g[\T\](a: T, b: T)` beside `g(a: Any, b: Any)`, pairs the No Duplicates Rule refuses and walk now refuses; with a bound below `Any` the checker refuses (`CFruitPair`, `CTiePlain`, `CSameOne`): home 3 with reproducer `none`, since an XXX compile test of the refusal is red while the program compiles (the skill's tests-writing.md, "How `XXX` works"), as rows 470 and 691 are recorded. The row is in record.md.
- Row 589: home 2, its test corrected (section 4).
- Row 537: the compiled `which` pair and `CGenOv`'s run; known, unchanged.
- The rung's own homes (rows 159, 742, 549 home 1; 539, 416 home 2; 101, 341, 740, 741, 697) are as the report gives them.

## 6. The failure-mode question

The rung turns refusals at load into loads for the pairs of row 159, and loads into refusals for rows 742 and 549. On b5a497c04 it also turned two refusals the specification asks for into quiet loads (section 2), which the fix turns back. With the fix, the shapes the widening newly loads that I ran are valid by the specification and agree with the compiled checker where it compiles them (table above), except `SkAnyOne`'s and `CTwoParents`'s pairs, which walk now refuses and the checker accepts (NEW-G-1, the checker's defect). `sameDeclaredDomains` gives a refusal, never a value.

## 7. Where I differ from the worker

- Decision 4 (reuse `genericPairValid`'s reading as it is): its Return Type branch is not the rule over every instance, so the widening needed the fix of section 2.
- Its section 8 found no walk test whose verdict changed; four expected failures changed their reason (section 3), one of them, row 589's, so that it no longer recorded its row.
- The rest of its decisions I take as made; decision 1's mutual-inclusion test is what the section asks for, and every case I ran agrees with it.

Points to report that the rung reaches with my commits: the team's `XXXGenericOverload` and `XXXGenericOverload2` newly load under walk (`ProjectFortress/tests/XXXGenericOverload.fss:24-26`, `XXXGenericOverload2.fss:24-25`) and `XXXGenericOverload3`'s refusal changes its pair and message (`XXXGenericOverload3.fss:21-23`), all three green before and after; `XXXDispatchTwoCommonParentsWalk`, a test outside the section's files, is corrected (`ProjectFortress/tests/XXXDispatchTwoCommonParentsWalk.fss:1,11`); three new walk tests (`GenericReturnRuleOuterParamWalk.fss`, `GenericReturnRuleInvariantWalk.fss`, `GenericReturnRuleHoldsWalk.fss`); the fix changes walk's pair check in the one file named, no team line; F-238 is half false once more. The microGPT quick pair passes on the fix, and no model line changes.

For the curator: the team's `XXXGenericOverload` says "Should not compile" (`ProjectFortress/tests/XXXGenericOverload.fss:15`) of a set that P-45's reading finds valid (each inside or meeting the others), which walk now loads and the compiled checker accepts (`CGenOv`); it stays green only because its run prints its FAIL line. `XXXGenericOverload2` the same, ending at run time at its `f[\A, B\]`, whose two instances `(A, B, B)` and `(B, A, A)` walk then refuses as an overloading. Whether these two of the team's expected failures stay as the team wrote them, or become tests of what the sets do under P-45, is a choice about the team's tests that I did not make.
