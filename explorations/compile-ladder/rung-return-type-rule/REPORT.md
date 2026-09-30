# Rung C: the return-type rule and the positional rule (climb batch 7b)

*Gather's note (climb batch 7b): the provisional ledger rows 534 to 541 are cited by their final numbers, 536 to 543; section 14's sibling count and the scope of the functional-method case in sections 10 and 12 are as the second skeptic's corrections 1 and 3 ask.*

problem: explorations/compile-ladder/rung-nat-checker/probes/SubOvSwapTRun.fss:9
spec: Specification/basic/overloading.tex:100-107
precedent: ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:92-100 at 811053f15
deviation: a static parameter of the less specific declaration stays quantified unless the domains force it equal to its solution, where rung N's precedent kept only an unsolved size quantified (OverloadingOracle.scala:133-152)
deviation: the positional rule compares return types under the identification by position only for two declarations with as many static parameters of their own, and only when the Return Type Rule holds (OverloadingOracle.scala:161-175, OverloadingChecker.scala:552-555)
deviation: the Meet Rule's closed-trait case is a coverage query local to overload checking, for ground functions and functional methods, cutting the overlap by comprises clauses as normConjunct's one-clause rule does and not through the shared normalizer (OverloadingOracle.scala:177-239, TypeAnalyzer.scala:645-655)
deviation: a tie of unconverted candidates in a family without static parameters is typed by the meet of their return types, where the base took the sort's head (Functionals.scala:686-693)
historical: ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:83, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:479, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:632

The problem line is row 398's permuting override, `sub[\U, V\](m: ZZ32): Dn[\V, U\]`, which the base's checker accepts and whose compiled run dies with `ClassCastException` (`explorations/compile-ladder/rung-nat-checker/probes/compile-probes.txt:29-33`); defect 2 is the same rule's other face, the paper's `GenPlainRTR`, accepted and refused by the JVM verifier (`explorations/reviews/overload-static-params-ways.md:264-269`).
- The specification line is the sentence answer 9 removes (overloads may not differ in static parameters). Read with it: `Specification/advanced/overloading.tex:95-103` (the same sentence in the other chapter), `:162-166` (the Subtype Rule's return types), `:247-307` (the Meet Rule for functions and its `comprises` example). Answer 9 revises the chapters to the 2011 model the checker runs; the rule over every instance is the paper's (`Papers/Types/rules.tick:174-180`, checked by the special arrow, `Papers/Types/overloading-check.tick:167-172`). Rung S writes the new text; this rung builds the rules.
- The precedent line is rung N's `escaped` sizes in `satisfiesReturnTypeRule` at `811053f15`: an unsolved size of the less specific declaration kept as its own parameter in the special arrow. This rung generalises it to every static parameter the domains do not force.
- The Meet Rule's device reuses the one-clause rule of `normConjunct` (`TypeAnalyzer.scala:645-655`) and the exclusion and clause helpers beside it, without changing them; the call typing extends rung I's ambiguity check (`Functionals.scala:688-752` at `811053f15`).
- Historical: the three Scala files are the 2012 tree's. The tests are new files in `ProjectFortress/compiler_tests/`, and the two renamed ones (`XXXComprisesMeetCompiled`, `XXXInferLoneBoundUnion`) were created by climb batches 7C and N.

Below, `R/` stands for `explorations/compile-ladder/rung-return-type-rule/`. The decision record the batch asks of this rung is `R/decision-record.md`. The harness refused the first pass's write of `R/REPORT.md`; this file is that pass's text, carried in its structured result, with the corrections its judge asked for (the precedent line above, the defect table of section 9, section 13) and the repair round's section 14. Line numbers in `OverloadingOracle.scala` are those of the repair round's tree; the other two Scala files are unchanged by it.

## 1. What I inherited and what I re-verified

The branch carried three commits from an earlier attempt whose container stopped before its report: `0d002d8c8` (the tests alone), `4ada6fa29` (the edit), `f065994f6` (the positional rule's scope and its place after the Return Type Rule). The worktree was clean. Its scratch held the count, distance and ladder runs on the final build (none of the build's classes is newer than 23:37 on 2026-09-29; the count ran at 23:41, the distance from 23:41 to 23:54, the ladder from 23:49), a copy of the base's classes built from `811053f15`'s three Scala files, and its harness and probe logs.

Re-run in this session, on the committed tree:
- the library cache rebuilt from empty in library order under the edited checker: AnyType 19 s, CompilerBuiltin 66 s, CompilerLibrary 25 s, CompilerAlgebra 2 s, CompilerSystem 1 s, each exit 0;
- the rung's 29 `.test` files and the two originals they replace, through the harness in one JVM on the base's classes and caches (section 4);
- all 479 `.test` files of `compiler_tests/` and all 23 of `library_tests/`, through the harness in one JVM on the edit (section 6);
- the probe differential, 32 programs compiled and run on the base's checker and on the edit, and the walk differential on 12 of them (section 6);
- a second distance run on the edit, for the attribution of its body-check moves (section 7).

Read and checked rather than re-run: the count run and the first distance run, whose full outputs I compared with the last landed gate's table and per-site list myself; the ladder run, whose 85 raw outputs I compared with the baseline's file by file (section 7).

## 2. Where the fix belongs, and the precedent

- **Where.** The overloading rules are checked by `OverloadingChecker.checkOverloading` through `OverloadingOracle` (`explorations/coordinator/map/modules-and-phases.md`, B.7): the Return Type Rule in `OverloadingOracle.satisfiesReturnTypeRule`, called by `returnTypeCheck` (`OverloadingChecker.scala:540-556`) and by `coveredBy`, the export checker's filter (`:655-656`); the pairwise validity in `validOverloadingInner` (`:465-479`), whose refusal row 492 meets. A call's type is set in `impls/Functionals.scala` at the four sites that read the head candidate's return type. No code-generation or interpreter file is involved: the defects of the compiled run that the tests pin (defect 3, rows 494, 496, 499) are phase 5's, and walk is rung W's.
- **Precedent for the Return Type Rule.** Three versions in the file: the stock rule (one solution, rung N's `escaped` sizes, `OverloadingOracle.scala:81-117` at `811053f15`), and two of the team's commented out (`:120-145` and below), the paper's theorem with every parameter quantified. P1 measured the latter refusing the prelude's `nest` overloads in every compiled program (`explorations/compile-ladder/plan-7b/probes/P1.md` section 3). The shape copied is rung N's: one more condition under which a parameter stays quantified.
- **Precedent for the Meet Rule's case.** `meetRule` scans the family for a declaration below both (`OverloadingChecker.scala:501-522`); `normConjunct` already shrinks a closed conjunct by its clause when another conjunct excludes a listed type, which the comprises judgement measured working on the compiled path (`MeetViaExclusion`, compiled `PASS`; `explorations/reviews/comprises-type-level-judgement.md` section 2). The coverage query does the same cut for every closed conjunct, locally, and reuses `comprisesClause`, `definitelyExcludes` and `lteq` as they are.
- **Precedent for the typing, and the count of sites.** The base typed a call by `bestArrow.getRange` at four sites (`Functionals.scala:889`, `:925`, `:1013`, `:1075` at `811053f15`); all four now take the call type `typedApplication` returns (`:931`, `:967`, `:1055`, `:1117`). The fifth caller of `checkApplication`, the case expression's comparison (`:1194`), types no expression; it reaches the new call type only through the expected-type check.
- **Precedent for the tests.** The two-file form of a run-time defect is rung G's `DispatchMethodArmRungGLink.test` with `XXXDispatchMethodArmRungG.test`; the refusal tests pin a message with `compile_err_contains`, as `XXXNatUnknownSizeArm` does.

## 3. What changed

`OverloadingOracle.scala`:
- `satisfiesReturnTypeRule` (`:83-127`) replaces a static parameter of the less specific declaration by its solution only where `forcedArgs` (`:133-152`) finds the domain relation's constraint, with the parameters' upper bounds, implying it equal to the solution (`Formula.implies`); every other one, an unsolved size among them, stays quantified in the special arrow, whose domain is the meet of the first domain with the second declaration's own domain, the forced parameters substituted. Since the repair round a kept parameter's bound is read with the forced parameters' solutions (`:107-110`; section 14).
- `satisfiesPositionalRule` (`:161-175`): for two declarations with as many static parameters of their own, the kinds agree position by position and the more specific one's return type is a subtype of the other's with the other's own parameters read as its own by position.
- `coversOverlap` (`:177-239`): the Meet Rule's closed-trait case, `R/decision-record.md` section 3; since the repair round a functional method's self type is cut by its trait's clause (`:215`; section 14).

`OverloadingChecker.scala`:
- `validOverloadingInner` (`:475-479`): after the Subtype, Meet and exclusion tests, `coverageRule` (`:527-538`), which passes `coversOverlap` the declarations of the same self position below both.
- `returnTypeCheck` (`:540-556`): the positional rule's refusal, only when the Return Type Rule holds and the first declaration is more specific:

      For sub,
      the static parameters of [\U extends Object, V extends Object\](Dn[\U0,V0\], ZZ32)->Dn[\V,U\] @ ... should correspond position by position
          to those of [\U extends Object, V extends Object\](Up[\U0,V0\], ZZ32)->Up[\U,V\] @ ...:
          of the same kinds, with a return type that is a subtype of the other's under that correspondence.

`Functionals.scala`: `typedApplication` (`:632-794`) is `checkApplication` with the call's type beside the candidates (`checkApplication` and `checkApplication` of an argument are wrappers, `:564-620`). The call type is the most specific candidate's return type, or, for a tie `tieType` (`:686-691`) accepts, the meet of the tied candidates' return types; it is what each attempt's expected-type check reads (`kept`, `:694-695`) and what the four sites write into the expression. `minimal` (`:682`) and the helpers it needs moved up unchanged from the ambiguity check. The ambiguity check's rules (the numeral tie, the same-types tie, the signalled coercion tie) are the base's.

Nothing else: `git diff --stat 811053f15 HEAD -- ProjectFortress/src` lists the three files. `TypeAnalyzer.scala`, `TypeHierarchyChecker.scala`, `compiler/StaticChecker.java` and every file outside `scala_src/` are unchanged.

## 4. The tests, and their failure on the base

Every new test is in `ProjectFortress/compiler_tests/`, named by its topic, its one comment line saying what it checks.

| test | shape | base | edit |
|---|---|---|---|
| `XXXOverloadReturnEveryInstance` (compile, `compile_err_contains=the return type of Round->Round @`) | `GenPlainRTR`: `ident[\T extends Shape\](x: T): T` beside `ident(x: Round): Round` | compiles: "Saw failure, but did not satisfy compile_err_contains", the wrong failure | refused on the Return Type Rule: expected failure |
| `XXXOverloadPermutedStaticParams` (compile, `...should correspond position by position`) | `SubOvSwapTRun`, row 398 | wrong failure | refused by the positional rule |
| `OverloadGenericBesidePlain` (compile, link, run) | `GenPlainSub`: prints `circle`, `generic`, `circle` | `PASS` | `PASS` |
| `OverloadGenericAgreeByPosition` (compile, link, run) | the override keeping its order, run at the written arguments | `PASS` | `PASS` |
| `OverloadTwoGenericBareLink` + `XXXOverloadTwoGenericBare` (run, `REACHED`) | defect 3, `GenBoundedFixU` | links; run dies "Unable to read serialized data" | the same |
| `ComprisesMeetCompiled` (renamed from `XXXComprisesMeetCompiled`, program unchanged but its name) | row 492, the Meet Rule's example | "Invalid overloading of f" | `PASS` |
| `XXXComprisesMeetNoCover` (compile, "Invalid overloading of f") | `MeetViaExclusionNoV` | refused | refused |
| `XXXComprisesMeetUncovered`, `XXXComprisesMeetUnexcluded` (compile, the same key) | the example without `f(V)`; without `U excludes W` | refused | refused |
| `ComprisesBetweenTwoClosed` (compile, link, run) | `BetweenTwoClosed`, `g: G[\ZZ32\]` | "Invalid overloading of f" | prints `f(g) =  3`, `PASS` |
| `CoverageReturnGood`, `CoverageReturnGoodReversed` (compile, link, run) | the addendum's acceptance program, and with its two broad declarations reversed | "Right-hand side has type ..." | `PASS` |
| `CoverageReturnExpected` (compile, link, run) | the call between checked against two expected types | two errors | `PASS` |
| `XXXCoverageReturnBad` (compile, `the return type of V->LeftResult @`, and `compile_err_does_not_contain=Invalid overloading of choose`) | the addendum's refused program | wrong failure: a body error | refused on the Return Type Rule |
| `GenericBesidePlainZZ32Link` + `XXXGenericBesidePlainZZ32` (run) | row 496, `PlainBesideZZ32` | run dies, `ClassCastException` on the `ZZ32` spelling | the same |
| `GenericBesidePlainStaticLink` + `XXXGenericBesidePlainStatic` (run) | row 496, `PbgStatic` | the two exact-type calls pass; the `Any` call dies, `ClassCastException` on `Marker⟦X⟧` | the same |
| `GenericPositionalBoxLink` + `XXXGenericPositionalBox` (run) | row 499, `SkPosBox`: asserts `box` | `any =/= box` | the same |
| `GenericPositionalFixedLink` + `XXXGenericPositionalFixed` (run) | row 499, `SkPosFixed`: asserts `fixed` | `tag =/= fixed` | the same |
| `GenericInstanceUnfixedLink` + `XXXGenericInstanceUnfixed` (run) | the paper's instance against the value's type: asserts `Box[\Number\]` | makes `Box⟦ZZ32⟧` and dies casting it to `Box⟦T⟧` | the same |
| `OverloadExistentialMeetLink` + `XXXOverloadExistentialMeet` (run) | the paper's `ArrayList`/`List` set | links; run dies "Unable to read serialized data" | the same |
| `InferLoneBound` (compile, link, run; rewritten from `XXXInferLoneBoundUnion`) | `pick[\T extends Number\](w, r)` is a `BoxT[\Number\]` | `PASS` | `PASS` |
| `XXXInferLoneUnbounded` (compile, `...(BoxT[\\OR(ZZ64,RR64)\\], BoxT[\\Any\\])`) | `same(pick0(w, r), a)`, `a: BoxT[\Any\]` | refused at the union | the same |

Every row that pins a defect fails on the base. The base run, all 29 `.test` files in one JVM over the base's classes (`811053f15`'s three Scala files built into a copy of the build; the run step, a separate `bin/fortress run`, with `FORTRESS_CACHES` pointing at the base's caches), `java -cp <base classes> com.sun.fortress.Shell junit ProjectFortress/compiler_tests/{29 files}`:

    . compile ProjectFortress/compiler_tests/XXXOverloadReturnEveryInstance
     Saw failure, but did not satisfy compile_err_contains; expected
    the return type of Round->Round @
        Invalid overloading of f in component ComprisesMeetCompiled:
    Tests run: 45,  Failures: 18,  Errors: 0

The 18 failures are the compile, link and run of `ComprisesBetweenTwoClosed`, `ComprisesMeetCompiled`, `CoverageReturnExpected`, `CoverageReturnGood` and `CoverageReturnGoodReversed`, and the wrong failures of `XXXCoverageReturnBad`, `XXXOverloadPermutedStaticParams` and `XXXOverloadReturnEveryInstance`; every other test passes, the expected failures as expected. The two originals the rung replaces pass on the base as expected failures (`XXXComprisesMeetCompiled`, "Invalid overloading of f"; `XXXInferLoneBoundUnion`, `(BoxT[\OR(ZZ64,RR64)\], BoxT[\Number\])`), `OK (2 tests)`.

The base's typing of the call between is not only order-dependent but unstable. In that run `CoverageReturnGood`'s compile reports "Right-hand side has type LeftResult, but declared type is RightResult" (line 25) and its link, the same program in the same JVM, "Right-hand side has type RightResult, but declared type is LeftResult" (line 24). The sort's head flips.

The first expected failures of each kind were shown going red on a deliberate local change by the earlier attempt, and I read its log: stand-in copies of `XXXInferLoneUnbounded` (bound `Number`), `XXXComprisesMeetNoCover` (with `f(V)`) and `XXXGenericPositionalFixed` (asserting today's `tag`), run through the harness with `GenericPositionalFixedLink`: "Saw wrong failure" twice and "Did not see expected failure", `Tests run: 4,  Failures: 3`.

The pass, on the edit, all 479 `.test` files of `compiler_tests/` in one JVM:

    Time: 304.184
    OK (902 tests)

## 5. The boundaries the rung keeps

- **The shared analyzer.** `TypeAnalyzer.scala` is not in the diff: `subtype`, `meet`, `equivalent`, `normConjunct` and the normalizer are the base's. `coversOverlap` has one caller, `coverageRule` (`grep -rn coversOverlap ProjectFortress/src` gives the definition and that call). A coverage result is a boolean the overloading check reads and nothing else; no subtype, assignment or equivalence verdict can move through it. `SkBetweenAssign` keeps its refusal, "Right-hand side has type G[\ZZ32\], but declared type is V", and so does `OwnClauseBetween` ("Right-hand side has type M, but declared type is V"), base and edit alike.
- **Astra's boundary.** The intersection typing applies only in a family without static parameters (`groundFamily`, `Functionals.scala:683`), so never to a generic declaration that needs a run-time instantiation; `G[\ZZ32\]` is an instantiated argument type and in the ground case. The scope is narrower than the boundary, which excludes only generic declarations that may run: a family with a generic declaration that cannot apply to the argument keeps the head of a sort (section 14, D6).
- **Coercion.** A tie that involves a coercion the call needs or a promoted candidate keeps batch N's rules; rung I's tie tests keep their verdicts (section 6).
- **The Return Type Rule is a premise.** `XXXCoverageReturnBad` is refused on it:

      For choose,
      the return type of V->LeftResult @ ProjectFortress/compiler_tests/CoverageReturnBad.fss:20:1-36 should be a subtype of the
          return type of T->RightResult @ ProjectFortress/compiler_tests/CoverageReturnBad.fss:19:1-37

  and not on "Invalid overloading of choose", which its key forbids.
- **Row 487.** The coverage argument assumes that a closed trait's values all belong to its listed types. The compiled checker does not enforce that across components (`TypeHierarchyChecker.everyKnownSubtypeListed` sees the trait table it has). This rung does not repair it, does not edit `TypeHierarchyChecker.scala`, and claims coverage only for the programs its tests show.
- **No stack overflow.** The search is a work list with cycle detection and a cap whose excess is a refusal; no run of this session met an overflow.

## 6. The lists run after the edit

All on the committed tree, the library cache rebuilt from empty first:
- **`compiler_tests/`, all 479 `.test` files, one JVM**: `OK (902 tests)`. The gate of the base was green, so no verdict of a test that existed before moved; the verdicts that moved are the rung's own (the new tests, `XXXComprisesMeetCompiled` renamed, `XXXInferLoneBoundUnion` rewritten). This covers the brief's lists: the 35 of the 43 generic-overload tests that a `.test` file drives; rung G's (`DispatchRenamedArmRungG`, `DispatchSwappedArmRungG`, `DispatchZZ32ArmRungG` with their link tests, `XXXDispatchMethodArmRungG` with `DispatchMethodArmRungGLink`); rung N's and rung Z's sized tests (46 `Nat*` and `XXXNat*` files); rung I's ties (`InferBetweenTie`, `InferNumeralTie`, `XXXInferAmbiguousCoercion`, `XXXInferSigmaTie`); batch N's inference tests (`XXXInferUnionCoercedArg`, `XXXInferUnionInstanceArg`, `XXXInferResultOnlyAny`, `XXXInferResultOnlyCoerced`). The harness reports compile, link and run as separate tests, so the checker's verdict and the run's are apart.
- **`library_tests/`, all 23 `.test` files, one JVM**: `OK (86 tests)`.
- **The eight generic-overload programs no `.test` file drives** (`Compiled10.Comprehensions4`, `Compiled17dd`, `Compiled17f`, `Compiled17g`, `Compiled18`, `Compiled180`, `Compiled240`, `Compiled250`): compiled and run on the base's checker and on the edit, outputs identical.
- **The probe differential**, 32 programs compiled and run by the base's checker and by the edit (the answer-9 shapes, row 491's two programs, the comprises shapes, rows 496 and 499, the `ArrayList`/`List` set, `XXXGenericOverload2`, the eight programs above, the acceptance pair). Outputs identical but for the rung's intended changes: `GenPlainRTR` refused on the Return Type Rule (base: `VerifyError: Bad return type`); `PermuteReturn` and `SubOvSwapTRun` refused by the positional rule (base: `ClassCastException`); `PermuteOverride` refused on the Return Type Rule on both; `MeetExample` and `BetweenTwoClosed` compile and print `f(g) =  3` (base: "Invalid overloading of f"); `CoverageReturnGood` and its reversal print `PASS`; `CoverageReturnBad` refused on the Return Type Rule. Two runs, the earlier attempt's and this session's, give the same differential.
- **Row 491's two programs, compiled**: `BetweenTwoClosed` from "Invalid overloading of f" to `f(g) =  3`; `SkBetweenAssign` refused before and after with the same message.
- **The walk differential** (walk runs no code of this rung's edit): `GenPlainRTR` refused at load ("at least one pair of parameters must have excluding types"); `PermuteReturn` and `SubOvSwapTRun` refused at the binding ("RHS expression type Dn[\ZZ64,Boolean\] is not assignable to LHS type Up[\Boolean,ZZ64\]"); `AgreeByPosition` `PASS`; `GenPlainSub` prints `generic` three times (defect 1, rung W's); `MeetExample`, `BetweenTwoClosed` and both acceptance programs refused at load, "first parameters t:[T] and s:[S] are unrelated" (row 492's walk half, rung W's); `SkPosBox` answers `any` four times, `SkPosFixed` refused at load (row 159); the `ArrayList`/`List` set refused at load, "have parameters with generic type, at least one pair of parameters must have excluding types". So walk and the checker now agree on the refusals of answer 9's two rules, and disagree on the comprises shapes and the paper's set, which the specification as revised accepts.

## 7. The measurements

- **The checker count** (`explorations/coordinator/tools/checker-count/run.sh`, run once on the edit): 75 to 77, the crash row `none` before and after, `#shadow matches the tracked StaticChecker`. The before is climb batch 6.5b's gate table (`explorations/compile-ladder/climb-batch-6.5b/gate/checker-count.txt`); `git log e3214cbf1..811053f15 -- Library/ ProjectFortress/` prints nothing, so the base has not changed under it. The two new errors are the ones P1 predicted, the Return Type Rule over every instance refusing `NoReductionPair`'s and `SomeReductionPair`'s `cond` against `Condition`'s:

      For cond,
      the return type of [\G\](NoReductionPair[\R\], PossibleReductionPair[\R\]->G, ()->G)->G @ Library/FortressLibrary.fsi:1834:5-1835:1 should be a subtype of the
          return type of [\G\](Condition[\SomeReductionPair[\R\]\], SomeReductionPair[\R\]->G, ()->G)->G @ Library/FortressLibrary.fsi:866:5-868:57

  and the same for `SomeReductionPair`'s at `:1841`. The api declares `PossibleReductionPair[\R\] extends Condition[\SomeReductionPair[\R\]\]` where the component declares `Condition[\PossibleReductionPair[\R\]\]`; rung L's api line makes the api say what the component says, and the merged tree should show neither. The `FortressLibrary` row goes 132 to 138 and the locations 62 to 65 (the row counts each error more than once; the three new locations are `:1834`, `:1841` and `:866`). No other library declaration is newly refused, and none newly accepted: the positional rule refuses nothing on the library, and the coverage case accepts no library pair (the overloading kind is 148 before and after on the distance stage).
- **The distance stage** (`explorations/coordinator/tools/distance/run.sh`, setting `any`): 624 to 626, `DISTANCE UP 624 -> 626 (+2)`, the return-type kind 29 to 31, class R3 27 to 29, unit `api FortressLibrary` 66 to 68: the two `cond` errors. Per site against the gate's `distance-sites.tsv`, the only other moves are in the big-operator family BR, the component's body errors, whose kind total is unchanged (387): the two `BIG ||` messages at `FortressLibrary.fss:304` and `:314` respelled, `:3368` new, `:3463` gone and `:3443` new, `:1569` gone. A second run on the same build (937 s, load 4.9 at its start) gives the same table and the same per-site list, site for site. The family moves between setups (FACTS.md, "The true distance to the switch-over"), and climb batch 7C's rung Y moved these same `BIG ||` messages by adding checker queries in another pass (row 488); this edit adds queries in the overloading pass and its new call typing does not reach the family's generic big operators. The base was not run in this setup (POSITIONS 2026-09-28, rungs re-running measurements), so whether the setup or the new queries moved them is not settled; a note on row 488.
- **The ladder**, the 85 files of `explorations/compile-ladder/baseline-2026-09-19/pass-list.txt` under the subset driver (a copy in the rung's scratch, its root private): 85 compile and run, each exit 0, against the gate's 85 at pass (`explorations/compile-ladder/climb-batch-6.5b/gate/ladder/ladder.tsv`). Their standard outputs equal the baseline's captures file by file but for the timing line of `nestedTransactions1`, `2` and `4` ("Operation took 284.13861ms" against "306.831538ms"). No file moved.

## 8. What the specification settles

- The Return Type Rule over every instance: the paper (`Papers/Types/rules.tick:174-180`), which answer 9 adopts. `GenPlainRTR`'s pair fails it at `T = Circle`, and the base's compiled run fails verification.
- The permuted override: refused by the chapters as they stand (`Specification/advanced/overloading.tex:95-103`, `Specification/basic/overloading.tex:100-107`) and by answer 9's positional rule; the paper would accept it (`explorations/reviews/overloading-judgement.md` section 8), which is why item 1.3 makes the rule a restriction of the compiled implementation.
- The Meet Rule's example: valid (`Specification/advanced/overloading.tex:282-307`, "V = S ∩ T", which item 26's decision restates at the level of values).
- The call between: typed by the intersection of its candidates' return types (item 26's decision; rung S's text).
- Rows 496 and 499: the declaration the value selects runs, at the instance the paper's rule gives (item 30's decision and the paper's instance rule); where the value fixes a parameter at an invariant position, as in all four programs, that instance is the value's.
- The instance where the value does not fix the parameter: the declared bound under the call's static return type (the paper's instance rule): `Box[\Number\]` for `XXXGenericInstanceUnfixed`.
- The lone type parameter: its bound, `Any` if none (the paper's instance rule; rung S's revision of the inference chapter).
- The paper's `ArrayList`/`List` set: valid by the paper's rules, which answer 9 adopts.

## 9. Every defect measured, and its home

| defect | home | where |
|---|---|---|
| Defect 2: the Return Type Rule checked one solved instance | 1, repaired | `XXXOverloadReturnEveryInstance` |
| Row 398: an override permuting its static parameters | 1, repaired | `XXXOverloadPermutedStaticParams`, `OverloadGenericAgreeByPosition` beside it |
| Row 492, the checker's half: the Meet Rule's `comprises` example refused | 1, repaired | `ComprisesMeetCompiled`, `ComprisesBetweenTwoClosed`, `CoverageReturnGood`, `CoverageReturnGoodReversed`, `CoverageReturnExpected`, with `XXXCoverageReturnBad` and the three `XXXComprisesMeet*` controls |
| The base's typing of a call between, the sort's head, varying with declaration order and within one JVM | 1, repaired | `CoverageReturnGood` and `CoverageReturnGoodReversed` |
| Defect 3: code generation for two generic declarations with different bounds, "Unable to read serialized data" | 2 | `OverloadTwoGenericBareLink` + `XXXOverloadTwoGenericBare`; phase 5 |
| Row 496: a generic beside a plain declaration dies at run time (the `ZZ32` spelling; the cast to `Marker⟦X⟧`) | 2 | `GenericBesidePlainZZ32Link` + `XXXGenericBesidePlainZZ32`, `GenericBesidePlainStaticLink` + `XXXGenericBesidePlainStatic`; phase 5 |
| Row 499: the template dispatcher answers `any` and `tag` | 2 | `GenericPositionalBoxLink` + `XXXGenericPositionalBox`, `GenericPositionalFixedLink` + `XXXGenericPositionalFixed`; phase 5 |
| The compiled path instantiates a generic declaration reached only at run time at the value's type, where the text gives the bound under the call's static return type | 2 | `GenericInstanceUnfixedLink` + `XXXGenericInstanceUnfixed`; phase 5 (the dispatcher needs the call's static return type, `OverloadSet.java:2048`); a new row |
| The paper's `ArrayList`/`List` set: accepted by the checker; the run dies with defect 3's message | 2 | `OverloadExistentialMeetLink` + `XXXOverloadExistentialMeet`; a note on defect 3's row |
| Row 516, the unbounded case: the checker's union where the text gives `Any` | 2 | `XXXInferLoneUnbounded`; batch 8's checker rung |
| `XXXGenericPositionalBox`'s direct call answers `box` or `any` depending on the compiling JVM, on the base as well (below) | 2 for the answer (its first assertion); the variation a note on row 499 | the same test |
| Walk refuses the paper's `ArrayList`/`List` set at load | 2 is owed by walk's corpus, which this rung does not edit | a provisional row, for rung W or the gather |
| The BR family's body-check sites move on the distance stage | 3, as row 488 records it | a note on row 488 |
| D1 (the skeptic's): a kept static parameter whose bound names a forced one, refused with an internal error, "X is not in the kind env" | 1, repaired in the repair round | `OverloadBoundNamesForced` |
| D2 (the skeptic's): a method call on the intersection-typed result of a call between two closed traits crashes code generation, `CodeGen.java:6236` | 2, phase 5 | `XXXCoverageReturnMethodCall`; row 540 |
| D3 (the skeptic's): generic inference on an intersection-typed argument keeps one conjunct | 2, batch 8's checker rung (the shared solver is a stop here) | `XXXCoverageReturnInferred`; row 541 |
| D4 (the skeptic's): functional methods declared in the closed traits not covered, the self type not cut | 1, repaired in the repair round | `ComprisesMeetFunctionalMethod`, with `XXXComprisesMeetFunctionalMethodUncovered` |
| D5 (the skeptic's): the Return Type Rule as built stricter than the paper on an object domain | 2, for Pavol | `XXXOverloadReturnObjectDomain`; row 542 |
| D6 (the skeptic's): the intersection typing's scope, the whole family ground, narrower than Astra's boundary | 2, for Pavol (the judge's decision) | `XXXCoverageReturnGenericFamily`; row 543 |

The direct call's variation, measured on the base: the pair `GenericPositionalBoxLink.test` and `XXXGenericPositionalBox.test` alone, four times through the harness on the base's classes, fails its first assertion each time,

    FAIL:  any =/= box; a direct call on a Box[Blue] gets the declaration on Box

while in the 29-test base run the same assertion passes and the third fails ("any =/= box; a Box[Blue] through the generic caller"). By reading, the checker compares the two generic candidates on their instances, `Box[\Blue\]` both, a tie of equal parameter types that keeps the sort's head (`Functionals.scala:741-749` at `811053f15`, "among candidates with one parameter type, keeps the sort's head"); when the head is `f[\T\]` at `T = Box[\Blue\]`, rung G's dispatcher tests `f[\U\]` at `U = Box[\Blue\]` by position and answers `any`. The conversion decision compares declarations on their declared domains, which gives `f[\U\](x: Box[\U\])`. The test prints `REACHED` first, so its verdict does not depend on which assertion fails first.

## 10. The decisions, in short

Each is in `R/decision-record.md` with its candidates and evidence.
1. The Return Type Rule over every instance is the judgement's construction, a parameter kept quantified unless forced, not the team's commented-out theorem (which refuses the prelude's `nest`).
2. The positional rule applies to two declarations with as many static parameters of their own, of the same kinds, and is reported only when the Return Type Rule holds. The first build, applying it to every pair with static parameters, refused the team's `Compiled12.invariantInference` (the harness on that build over the listed tests):

       the static parameters of [\X1 extends Object, X extends X1\](T[\X\], Any, X1->X)->String @ ProjectFortress/compiler_tests/Compiled12.invariantInference.fss:55:1-56:30 should correspond position by position
           to those of [\X extends Object\](T[\X\], Any, Any)->String @ ProjectFortress/compiler_tests/Compiled12.invariantInference.fss:53:1-69:

   and gave `XXXNatRetSizeChecker` a fourth error beside its pinned three. The compiled dispatcher reads an arm by position only when it has as many static parameters as the template (`OverloadSet.java:1344-1346`).
3. The Meet Rule's closed-trait case lives in `OverloadingOracle.scala`, not `TypeAnalyzer.scala`; it covers ground functions and functional methods, a functional method's self type read as its trait since the repair round (the judge's decision, section 14); dotted methods and generic families are refused as before. For functional methods, coverage is judged in each trait or object that provides the two declarations, over the declarations that type provides, as the Meet Rule for functional methods is worded (`Specification/advanced/overloading.tex:396-411` at `811053f15`; `coverageRule`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:527-538`): so a trait between the two closed traits that provides both and declares no covering method is refused, "Invalid overloading of choose in trait M" (the second skeptic's `SkFnBetween`, which walk runs), though the functions' form of the same family (`CoverageReturnGood`) is accepted.
4. The intersection typing requires the whole family ground, narrower than Astra's boundary, which excludes only generic declarations that may run; kept by the judge against narrowing it to the declarations that may run (section 14, D6).
5. `XXXInferLoneUnbounded` writes `extends Any` (the compile path's implicit bound is `Object`, row 412, under which `BoxT[\Any\]` is ill-formed: "The static argument Any does not satisfy the corresponding bound Object" on the base); `XXXGenericInstanceUnfixed` writes the bound `Number` and a `Key` parameter.
6. Three controls and `CoverageReturnExpected` beside the brief's tests.

## 11. What comes back to Pavol

- **The two refusals' messages**: section 3 (the positional rule) and section 5 (the Return Type Rule, the form it always had).
- **Library declarations newly refused**: `NoReductionPair`'s and `SomeReductionPair`'s `cond` (section 7), rung L's api line; no other.
- **Compiled tests or ladder files that moved**: none but the rung's own.
- **Row 492**: the checker's half repaired; `XXXComprisesMeetCompiled` renamed `ComprisesMeetCompiled`; the acceptance pair passes in both declaration orders and the bad program is refused on the Return Type Rule. The fallback's condition was not met: no change to the shared subtyping, meet, equivalence or normalizer, no generic instantiation, no closure enforcement.
- **Under Q4 = (1)**: row 499's two programs are still accepted, with their expected failures. `XXXGenericOverload2`'s written instantiation `g = f[\A, B\]`, which instantiates the two declarations by position into `(A, B, B)` and `(B, A, A)`, neither below the other: the checker on this tree accepts the program (compile exit 0, base and edit), since a reference with no argument is not an application and rung I's ambiguity check does not see it; the compiled run prints "FAIL: should have failed in generic overloading of f" and dies, "Unable to read serialized data" for the overload `f`. Evidence for the domain-condition question, not repaired.
- **Under the paper's instance rule**: the pair's compiled run makes `Box⟦ZZ32⟧`, the value's type, and dies casting it to `Box⟦T⟧` (row 496's cast), base and edit; the checker accepts the paper's `ArrayList`/`List` set, base and edit, and its run dies with defect 3's message; `InferLoneBound` passes and `XXXInferLoneUnbounded` is refused at the union, base and edit.
- **The repair round's points**: section 14, "For Pavol".
- **The dynamic-applicability annotation** (`STypesUtil.isDynamicallyApplicable`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1118-1148`) is left as it is. The plain-beside-generic judgement reads it as read by nothing (`explorations/reviews/plain-beside-generic-judgement.md:29`). By my reading it is read on the compile path: `rewriteApplicand` (`STypesUtil.scala:1176`) puts the overloadings it keeps into the reference's `newOverloadings` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/SExprUtil.scala:124-150`), and `OverloadRewriteVisitor.forFnRefOnly` reads that list when not for the interpreter (`ProjectFortress/src/com/sun/fortress/compiler/OverloadRewriteVisitor.java:107`) to name the call's overload set, which `OverloadRewritingPhase` runs with `forInterpreter` false (`ProjectFortress/src/com/sun/fortress/compiler/phases/OverloadRewritingPhase.java:33`). How row 496's generic declaration is still reached at run time from a call resolved to the plain one was not traced here.

## 12. For the gather

- S's text against these tests: the positional rule as built applies to two declarations with as many static parameters of their own (decision 2); the coverage case to ground functions and functional methods, the self type of a functional method included (decision 3); for functional methods, coverage judged in each type that provides the two declarations, over the declarations that type provides, so that `SkFnBetween` (the acceptance family as functional methods, with a trait `M` between the closed traits that declares nothing) is refused in `M` while the functions' form is accepted: a point S's text has to match (the second skeptic's correction 3); the intersection typing to a family without static parameters, narrower than Astra's boundary (decision 4). A statement of S's broader than these is a mismatch to settle by the decisions, or to report.
- `ComprisesMeetCompiled.fss` keeps its message's citation `Specification/advanced/overloading.tex:282-307`; if S's edit moves those lines, the re-anchoring applies to the renamed file. `XXXInferLoneBoundUnion.fss` is deleted on this branch (rewritten as `InferLoneBound.fss` and `XXXInferLoneUnbounded.fss`, which cite no specification line); an S re-anchor of its message is moot.
- The count and the distance read this rung's and rung L's edits; the `cond` errors are this rung's and L's api line removes them.
- Walk's refusal of the paper's `ArrayList`/`List` set (row 539) needs a walk expected failure in `ProjectFortress/tests/` if rung W's tree still refuses it; this rung does not edit that directory.

## 13. Stops

None met, by the first pass or by the repair round (section 14). No stop file is edited (`git diff --name-only 811053f15 HEAD` lists the three Scala files, `compiler_tests/` and the rung's own directory), no library declaration is newly refused other than the `cond` pair, no verdict of a test that existed moved but the two the section names, `SkBetweenAssign` and `BetweenTwoClosed` moved only as the section says, `CoverageReturnBad` is refused and `CoverageReturnGood` passes in both orders, rung I's tie tests keep their verdicts, no stack overflow, no ladder file moved, no walk edit, and no rule beyond the paper's three, the positional rule and item 26's closed-trait case of the Meet Rule.

## 14. The repair round

The rung's skeptic refused it once (`R/SKEPTIC.md`, `6545e19c4`), and its judge ruled a repair (`R/JUDGE.md`, `43740c8fb`). This section is the repair round's; sections 1 to 13 are the first pass's, corrected where the ruling asked.

### What the ruling required

- **D1, the refusal ground.** `satisfiesReturnTypeRule` extended the analyzer with the less specific declaration's kept static parameters as declared, so a kept parameter bounded by a forced one named a variable the analyzer did not hold. Repair it, with a plain test of the skeptic's `SkRtrDangling2` shape (home 1).
- **D4.** `coversOverlap`'s `listed` read only a trait type, so a functional method declared in the closed traits (its self parameter a `TraitSelfType`) was not covered, though the record claimed functional methods. Repair it by one case reading a self type by its named trait, with a plain test and a control (home 1), or else narrow the claim (home 2).
- **D2, D3, D5 and D6.** An expected-failure compile test each, and rows 540 to 543.
- The provenance block's precedent line "at 811053f15", `REPORT.md` written, `record.md` and `decision-record.md` corrected, the count and the distance measured once on the final build, the ladder not re-run.

What I inherited: the branch at `43740c8fb`, the worktree clean. The build was HEAD's: every class under `ProjectFortress/build/com/sun/fortress/scala_src/` was written after the three Scala files were last restored, and `OverloadingOracle.class` carries `coversOverlap`, `forcedArgs` and `satisfiesPositionalRule`, which the base has not (`javap -p`). So the new tests ran on it before the edit, with no rebuild.

### The tests first, and their failure on the pre-repair head

In `ProjectFortress/compiler_tests/`, one comment line each, committed alone as `e2e4d2f32`:
- `OverloadBoundNamesForced` (compile, link, run, `run_out_contains=PASS`): `g[\X, Y extends Box[\X\]\](x: Box[\X\], y: Y): String` beside `g(x: Box[\ZZ32\], y: SubBox): String`, asserting `plain` for `(PlainBox[\ZZ32\], SubBox)` and `generic` for `(PlainBox[\ZZ32\], PlainBox[\ZZ32\])`.
- `ComprisesMeetFunctionalMethod` (compile, link, run, `run_out_contains=PASS`): `tag(self): ZZ32` declared `= 1` in `S comprises { U, V }`, `= 2` in `T comprises { V, W }`, `= 3` in `V extends { S, T }`, with `U extends S excludes W`, asserting `tag(s) = 3` for `s: S = Vo`.
- `XXXComprisesMeetFunctionalMethodUncovered` (compile, `compile_err_contains=Invalid overloading of tag`): the same program with no `tag` in `V`.

`ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh repair-pre ProjectFortress/compiler_tests OverloadBoundNamesForced.test ComprisesMeetFunctionalMethod.test XXXComprisesMeetFunctionalMethodUncovered.test`, on the pre-repair head:

    . compile ProjectFortress/compiler_tests/OverloadBoundNamesForced ProjectFortress/compiler_tests/OverloadBoundNamesForced.fss:10:6-7:
    X$7 is not in the kind env [Y$8 -> KindBinding(Y$8,Y$8 extends Box[\X$7\])][][]
        Invalid overloading of tag in component ComprisesMeetFunctionalMethod:
     Saw expected failure
    Tests run: 7,  Failures: 6,  Errors: 0

The six failures are the compile, link and run of the two plain tests; the control is counted an expected failure. It is refused three times: in the component, and in `V` and `Vo`, which inherit the two declarations.

### The edit

Only `OverloadingOracle.scala`: the `kept` line moved below `str` and changed, one case added, and two comments reworded (`git diff --stat 43740c8fb 8341b87f5 -- ProjectFortress/src`: 7 insertions, 4 deletions):
- **D1** (`:107-110`). `str` is built from the forced parameters first, and `kept` is the unforced parameters with `str` applied, `str.replaceStaticParam(p)` (`ProjectFortress/src/com/sun/fortress/compiler/typechecker/StaticTypeReplacer.java:117-119`). With `replaceStaticParams` false by default (`:65`), that visit is `NodeUpdateVisitor.forStaticParam`, which rebuilds the parameter's extends clause through the replacer (`ProjectFortress/src/com/sun/fortress/nodes/NodeUpdateVisitor.java:5532-5540`), so no `NodeFactory.makeStaticParam` fallback was needed. The team's precedent for the same call is `STypesUtil.fullyReplacedMethodDomain` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1547-1550`), which reads a method's static parameters under a replacer. The where clause stays `None`, as on the base (`:112`, `:115`).
- **D4** (`:215`). `listed` gains `case ts: TraitSelfType => listed(ts.getNamed)`, so a self type is cut by its named trait's clause, its static arguments substituted by the same `comprisesClause` path. A value of `S & {U, V}` is a value of `S` (`TypeAnalyzer.removeSelf` reads it as `S ∩ (U ∪ V)`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:486-498`), so the parts hold every value of the overlap. The fallback to home 2 was not needed: both tests pass, the control stays refused, and no settled verdict moved (below).

**The sibling count (rule 2).** The three edited Scala files extend a type analyzer with static parameters at 12 sites: `OverloadingOracle.scala:45`, `:84`, `:85`, `:112`, `:134`, `:136`, `:166`, `:167`, `:170`, `:375` (twice), and `OverloadingChecker.scala:288`. (`Functionals.scala:1140` and `:1145` extend the checker with a function expression's value parameters, not static parameters.) At two of them the list is a declaration's static parameters after some of that declaration's own parameters were substituted away:
- `:112`, D1's site, now repaired.
- `:170`, `satisfiesPositionalRule`, which extends `y`'s lifted parameters after `y`'s own were replaced by `x`'s. A lifted parameter is the enclosing trait's, and its bound is written in the trait's header, where the method's own parameters are not in scope. So it cannot name a replaced parameter.

The other ten extend a whole list, with nothing substituted: `forcedArgs` (`:134`, `:136`), the alpha-renamings (`:84`, `:85`, `:166`, `:167`), `compare` (`:375`), the trait's parameters (`OverloadingChecker.scala:288`), and the helper `extend` (`:45`). So the judge's count of one holds for the defect, and the shape occurs once more, where it cannot dangle.

### The home-2 tests, and the stand-in

In `ProjectFortress/compiler_tests/`, each an `XXX` compile test whose program asserts the specification's answer and prints `PASS`. They were written after the edit but run on the build before it: the classes were not yet rebuilt, so this is the pre-repair head.
- `XXXCoverageReturnMethodCall` (`compile_exception_contains=IntersectionType cannot be cast`): `CoverageReturnGood`'s family with `left()` in `LeftResult` and `right()` in `RightResult`, asserting `choose(m).left()` is `"left"` and `choose(m).right()` is `"right"`. The crash is a `RuntimeException` that neither clause of `Shell.compileWithErrorHandling` catches, so it reaches the harness's exception stream, not the error stream. The key is therefore `compile_exception_contains`, and the component's name carries the `XXX` (FACTS, "A thrown `CompilerError` takes a third path through the test harness").
- `XXXCoverageReturnInferred` (`compile_err_contains=but declared type is`): `pass[\X\](x: X): X = x`, `y = pass(choose(m))`, `l: LeftResult = y`, `r: RightResult = y`.
- `XXXOverloadReturnObjectDomain` (`compile_err_contains=the return type of Circle->Circle @`): `ident[\T\](x: T): T` beside `ident(x: Circle): Circle` with `object Circle` and `object Square`, and `c: Circle = ident(Circle)`, `s: Square = ident(Square)`.
- `XXXCoverageReturnGenericFamily` (`compile_err_contains=but declared type is`): `CoverageReturnGood`'s family with `object Box[\X\]` and `choose[\X\](b: Box[\X\]): BothResult`, and `left: LeftResult = choose(m)`, `right: RightResult = choose(m)`.

`ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh repair-home2-pre ProjectFortress/compiler_tests XXXCoverageReturnMethodCall.test XXXCoverageReturnInferred.test XXXOverloadReturnObjectDomain.test XXXCoverageReturnGenericFamily.test`:

    . compile ProjectFortress/compiler_tests/XXXCoverageReturnMethodCall java.lang.ClassCastException: class com.sun.fortress.nodes.IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedTyp
     OK Saw expected exception
        Right-hand side has type RightResult, but declared type is LeftResult.
    OK (4 tests)

The batch's first `XXX` test keyed on an exception is shown red on a stand-in: a copy of `XXXCoverageReturnMethodCall` in the rung's scratch, with `takeLeft(choose(m))` and `takeRight(choose(m))` in place of the method calls. `ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh repair-standin-pre tmp/rung-return-type-rule/repair/standin XXXCoverageReturnMethodCall.test`:

    . compile tmp/rung-return-type-rule/repair/standin/XXXCoverageReturnMethodCall 
     Saw failure, but did not satisfy compile_exception_contains; expected
    IntersectionType cannot be cast
    Tests run: 1,  Failures: 1,  Errors: 0

The stand-in compiles, and the harness fails it. The judge expected the words "missing expected failure". The source gives this one instead: a compile that succeeds leaves the exception key unmet, so `trueFailure` is set and the harness reports "Saw failure, but did not satisfy" and fails with "Saw wrong failure" (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:396-398`). It reports "Missing expected failure" (`:400`) only when no key is unmet. Either way the test is red, which is what the stand-in has to show.

### The rebuild and the runs after the edit

`ant compileAll`: exit 0, 23 s, `BUILD SUCCESSFUL`, and `default_repository/caches/global.map` restored. Then the library-order cache rebuild from an emptied `default_repository/caches`, each step exit 0: AnyType 14 s, CompilerBuiltin 64 s, CompilerLibrary 26 s, CompilerAlgebra 2 s, CompilerSystem 1 s. The prelude compiles in library order. The rebuilt `OverloadingOracle$$anonfun$4.class` calls `replaceStaticParam`, and `OverloadingOracle.class` names `TraitSelfType`.

The rung's 29 `.test` files and this round's 7, in one JVM (`ONE_JVM=1 ... junit.sh repair-rung36 ProjectFortress/compiler_tests <the 36 files>`):

    . compile ProjectFortress/compiler_tests/OverloadBoundNamesForced  OK (time = 287ms)
    . compile ProjectFortress/compiler_tests/ComprisesMeetFunctionalMethod  OK (time = 396ms)
    . run ProjectFortress/compiler_tests/OverloadBoundNamesForced (500ms) plain
    . run ProjectFortress/compiler_tests/ComprisesMeetFunctionalMethod (276ms) tag(s) =  3
    OK (56 tests)

Every plain test passes, and every `XXX` test is counted an expected failure: `Saw expected failure` for the control, `XXXCoverageReturnInferred`, `XXXOverloadReturnObjectDomain` and `XXXCoverageReturnGenericFamily`, and `OK Saw expected exception` for `XXXCoverageReturnMethodCall`. `XXXOverloadReturnEveryInstance` and `XXXOverloadPermutedStaticParams` keep their refusals, as the skeptic's first correction required.

All 486 `.test` files of `compiler_tests/`, one JVM: `OK (913 tests)`, `Time: 356.26`, the first pass's 902 and this round's 11 commands. All 23 of `library_tests/`, one JVM: `OK (86 tests)`. No settled verdict moved.

The two assertions of `ComprisesMeetFunctionalMethod` and `OverloadBoundNamesForced` are the home-1 checks of D4 and D1. Two probes in the rung's scratch vary D1's shape, both compiled and run on the final build:
- a generic more specific declaration, `g[\Z\](x: Box[\Z\], y: SubBox[\Z\])`, beside `g[\X, Y extends Box[\X\]\]`, which prints `sub   generic` and `PASS`;
- a chain of bounds, `g[\X, Y extends Box[\X\], W extends Y\]`, beside `g(Box[\ZZ32\], SubBox, SubBox)`, which prints `plain   generic` and `PASS`.

The seven new component names occur nowhere else in `ProjectFortress/tests/`, the `*_tests/` directories or `ProjectFortress/src/com/sun/fortress/` (`grep -rl` for each name, the test's own two files excluded: 0 files each). The traits they declare are local to their components.

### The measurements, once on the final build

- **The checker count** (`explorations/coordinator/tools/checker-count/run.sh`): `#total 77`, `#crash none`, `#shadow matches the tracked StaticChecker`. The table is identical to the first build's, and against the gate's 75 (`explorations/compile-ladder/climb-batch-6.5b/gate/checker-count.txt`) the only difference is the `cond` pair: `FortressLibrary` 132 to 138, locations 62 to 65. The full output has no "kind env" error and no stack overflow. `git log e3214cbf1..811053f15 -- Library/ ProjectFortress/` prints nothing, so the gate's table is still the before.
- **The distance stage** (`explorations/coordinator/tools/distance/run.sh`, setting `any`): `#total 626`, overloading 148, return type 31, class M1 109. The table is the first build's line for line, apart from the timing and machine lines. The per-site list is identical, site for site, to both runs of the first build.
- **Against the gate's `distance-sites.tsv`**: the two `cond` sites (`FortressLibrary.fsi:1834`, `:1841` against `:866`) and the BR family's moves already on row 488's note: `:304` and `:314` respelled, `:3368` new, `:3463` gone and `:3443` new, `:1569` gone.
- **No library pair is newly accepted by D4's case, and none newly refused.** The overloading kind is 148 on the gate's table and here, and the per-site list is the first build's. D1 turns an internal error into the rule's verdict; the library had no such error before.
- **The ladder was not re-run.** Every one of its 85 files compiles and runs on the first build (section 7), and the repair only turns refusals into acceptances (D4) or an internal error into the rule's verdict (D1), so it cannot make a file that compiles fail.

### The defects of this round and their homes

| defect | home | where |
|---|---|---|
| D1: a kept parameter bounded by a forced one, refused with "X is not in the kind env" | 1, repaired | `OverloadBoundNamesForced` |
| D4: functional methods declared in the closed traits not covered | 1, repaired | `ComprisesMeetFunctionalMethod`, `XXXComprisesMeetFunctionalMethodUncovered` |
| D2: a method call on the intersection-typed result crashes code generation (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6236`, the receiver's type cast to `NamedType`) | 2, phase 5 | `XXXCoverageReturnMethodCall`; row 540 |
| D3: generic inference on an intersection-typed argument keeps one conjunct | 2, batch 8's checker rung | `XXXCoverageReturnInferred`; row 541 |
| D5: the Return Type Rule as built stricter than the paper on an object domain | 2, for Pavol | `XXXOverloadReturnObjectDomain`; row 542 |
| D6: the intersection typing's scope, the whole family ground | 2, for Pavol | `XXXCoverageReturnGenericFamily`; row 543 |

One fact beyond the skeptic's: the conjunct D3 keeps, and the head D6 keeps, varied between two runs of one program, across two builds that differ only in this round's edits, which touch no typing. Before the rebuild, `XXXCoverageReturnInferred` refused line 28 ("Right-hand side has type RightResult, but declared type is LeftResult"). After it, the same program refused line 29 ("... type LeftResult, but declared type is RightResult"). `XXXCoverageReturnGenericFamily` flipped the same way (lines 28 and 27). This matches the first pass's finding that the base's head flipped between compile and link in one JVM (section 4). Both tests are keyed on "but declared type is", which matches either answer. The rows say the choice varies from run to run, not only with declaration order.

### Stops

None met in the repair round:
- The edit is in `OverloadingOracle.scala` alone.
- `TypeAnalyzer.scala`, `TypeHierarchyChecker.scala` and `StaticChecker.java` are unchanged.
- No library declaration is newly refused (count 77 and distance 626, both the `cond` pair), and no verdict of a settled test moved (913 and 86).
- There is no stack overflow in the meet search.
- `SkBetweenAssign` is untouched, since the typing is unchanged by this round.
- The intersection typing is not extended.
- There is no walk edit.

### For Pavol

The first pass's list stands (section 11). The ruling adds these:
- **D5.** The Return Type Rule as built for answer 9 (the overloading judgement's construction, section 3.5) is stricter than the paper where the more specific declaration's domain is an object type. It refuses `ident[\T\](x: T): T` beside `ident(x: Circle): Circle` with `object Circle`, and `f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]` with `object Box[\U\]`. The reason is that it checks instances whose domain meet is `Bottom`, which the paper sets aside (`Papers/Types/rules.tick:174-180`), and an object type excludes every type that is not its supertype (`Specification/basic/types-vals-vars.tex:255-258`). On the base both compiled and died with `VerifyError: Bad return type`. The candidates:
  - keep the refusal, as now (`XXXOverloadReturnObjectDomain`, row 542);
  - or refine `satisfiesReturnTypeRule` to set such instances aside, a type-theoretic change to a decided rule, for batch 8 or later.
- **D6, a decision of the judge's.** The intersection typing stays limited to families none of whose declarations has static parameters (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:683`). That is narrower than Astra's boundary, which excludes only generic declarations that may run. So a family with a generic member that cannot run for the argument keeps the head of a sort, which follows declaration order and varies from run to run (`XXXCoverageReturnGenericFamily`, row 543).
  - The candidate rejected: narrow the condition to the declarations whose domain does not provably exclude the argument's static type (`OverloadingOracle.excludes`).
  - Its cost: the intersection type reaches more ties, the library's among them, and code generation crashes on a method call on it (row 540).
- **D4, a decision of the judge's.** The coverage check reads a functional method's self type by its trait (home 1), instead of narrowing the claim. The extension worked, so the claim of the record, "functions and functional methods", is now true.
- **The coercion tie, from the skeptic.** A call between two closed traits whose other argument needs the same coercion for every candidate is an "Ambiguous coercion" error under batch N's rule as landed (`Functionals.scala:780-789`). This is `choose(S, ZZ64)`, `choose(T, ZZ64)` and `choose(V, ZZ64)` called with a `ZZ32`. The proof addendum's "once a conversion is fixed" reading would type it by the intersection. C's section keeps batch N's rule. Whether an identical coercion on every candidate counts as fixed is a question for Pavol.
