# Climb batch 15, rung C (rung-checker-bounds): the checker's normal form over a variable, and its local function groups

- problem: the distance stage's site `squaredNorm(me)`, 'Could not check call to function squaredNorm', and its crash row in `Array3` (`explorations/compile-ladder/gate/distance-sites.tsv:15`; `explorations/compile-ladder/climb-batch-14/gate/distance.txt:27`), with the four expected failures of rows 686, 687, 689 and 690 (`ProjectFortress/compiler_tests/XXX*TwoBoundsClosedTrait.test` at ee1aa1a95).
- spec: `Specification/basic/inference.tex:56-58` ("A declaration with static parameters is applicable to a call ... if some instance of it whose static arguments satisfy their bounds is applicable to the call"); for row 680, `Specification/basic/functions.tex:597-598` ("locally declared functions in a single scope are allowed to be overloaded and mutually recursive").
- precedent: the type-variable case of `pSubInner`, which reads a variable's bound through `pNorm` under a history entry (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:200-236`), and its inference-variable case (`:189`); for row 680's held line, Thunker's priming of a trait's and an object's methods with a TryChecker over the checker that holds them (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala:63-77`, `:103-116`).
- deviation: the team's expansion of a closed trait into its listed types is kept for a meet of ground types, which the type group's figures do not have: no rule of `Papers/Types/fig-subtype.tick:1-133` or `fig-meet.tick` reads a `comprises` clause (`TypeAnalyzer.scala:708-735`); no deviation from the probe's patches.
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala` (`a874948ac`, `:632-641`); `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala` was edited and then put back to the base's text, so it is not edited on the branch.

## 1. What changed, and why

The base is ee1aa1a95. The branch holds one edit of the checker, in `TypeAnalyzer.scala`, from the checker probe's two patches (`explorations/perf-probes/checker-bound-defects/patches/rows-686-687-689-690-normal-form.patch` and `sibling-ground-bound.patch`), applied unchanged (`4356454a2`):

- **The normal form** (`normConjunct`, `TypeAnalyzer.scala:708-735`). A closed trait among the conjuncts of an intersection is replaced by the types its `comprises` clause lists that another conjunct excludes only where that conjunct names no type variable and no inference variable (`excludedListed`, `:713-714`). A bound such as `K ∩ R[\T\]` therefore stays the intersection as written, the redundancy branch drops `K` beside a `T` whose bound implies it, and no union the checker builds over such a bound holds a variable. This is the condition under which the POPL 2019 paper proves matching complete (`research/extracts/ParkPOPL2019-extract.md`, section 6), the type group's late word (P-26). Before the edit, `K ∩ R[\$T\]` became `OR(AND(A,R[$T]),AND(B,R[$T]))`, and the union rule split it before the variable's bound was read (the probe's section 2.2). One change clears rows 686, 687, 689 and 690.
- **The union cases** (`pSubInner`, `TypeAnalyzer.scala:165-180`, before the union rule at `:181-182`, both only where the check is not negated). An inference variable below a union takes the union as one upper bound (`:168`), so the inference-variable rule of `fig-subtype.tick` comes before its union rule. A type variable below a union is also tried through its bound, with the type-variable case's history entry (`:171-180`). This clears the ground sibling (NEW-C-1): `g[\T extends { K, Q }\](x: T): T = h(x)` with `trait Q excludes { C }`, where `K ∩ Q` is ground and still expanded to `OR(A,B)`. The solver then takes the intersection of the upper bounds, here the union, which is the bound: P-48.

Row 680's line (`row-680-local-function-group.patch`, `makeTryChecker(this)` to `makeTryChecker(newChecker)` in the `SLetFn` case, `impls/Decls.scala:414`) was applied, built and tested (`3216343f6`), and then held (`e75bb538b`). With it, and with `__bigOperator`'s `body(i)` typed for one run only, the count stage checked the library component whole and took 809 s, past the 690 s that the batch record sets for landing it (section 6). The line is valid and its tests passed on it (section 2). Its tests stay in the tree as expected failures keyed on today's crashes.

## 2. The tests: the failing run and the passing run

All are in `ProjectFortress/compiler_tests/`. They were written first (`d7bf79b07`) and run through the harness on the base's code before the edit was first built:

- the four expected failures promoted, `git mv` without the prefix, each `compile`, `link`, `run`, `run_out_contains=PASS`: `InferCallerTwoBoundsClosedTrait` (686), `CoerceTwoBoundsClosedTrait` (687), `CallerParamTwoBoundsClosedTrait` (689), `ReturnRuleTwoBoundsClosedTrait` (690);
- `CallerParamTwoGroundBoundsClosedTrait`, the sibling (`repro/BoundsGround.fss`), a plain run test asserting its two values;
- row 680's three: `LocalFunctionSiblingInLoop` and `LocalFunctionSiblingCall` (typecheck), from `repro/LocalSiblingInLoop.fss` and `LocalSiblingDirect.fss`, and `XXXLocalFunctionRecursiveUntypedReturn` (compile, keyed `reference cycle`), from `repro/LocalRecursiveUntyped.fss`;
- `SelfTypeReturnSelfAtTraitRun`, review-routed.1's test of row 695's bound: `trait Animal extends Shape[\Animal\]` and `object Cat extends { Animal, Shape[\Animal\] }`; `twin(Cat).tag` is printed and asserted, keyed `run_out_contains=cat`.

The failing run was on the base's code at 2026-10-14T10:56:40Z, before the first build of the edit (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests <the 9 files and the 3 kept tests>`):

    . compile ProjectFortress/compiler_tests/InferCallerTwoBoundsClosedTrait ...InferCallerTwoBoundsClosedTrait.fss:13:48-50:
        - [\T extends K R[\T\]\]Box[\T\]->T is not applicable to an argument of type Box[\T\].
    F. compile ProjectFortress/compiler_tests/CallerParamTwoGroundBoundsClosedTrait ** bug! Applied a substitution to an And and got an Or
    F. typecheck ProjectFortress/compiler_tests/LocalFunctionSiblingInLoop ** bug! TryChecker returned an untyped expr: FnExpr at ...LocalFunctionSiblingInLoop.fss:8.9
    Tests run: 30,  Failures: 18,  Errors: 0

The 18 failures are the compile, link and run cases of the five run tests, the two typecheck tests and the recursive case. The recursive case failed with 'Saw wrong failure. compile', the base saying 'Result of typechecking still contains intermediate nodes'. `SelfTypeReturnSelfAtTraitRun` passed on the base ('cat', 'PASS'), as review-routed.1 asks. The kept `OverloadTwoBoundsClosedTrait`, `OverloadTwoBoundsClosedFamily` and `InferUnionInstanceArg` passed too.

With all three patches (later committed as `4356454a2` and `3216343f6`), the same list gave `OK (30 tests)` (11:00:27Z). The recursive case gave 'Cannot infer type for function fact(n:ZZ32) because it has reference cycle: fact(n:ZZ32), fact(n:ZZ32)' and 'Saw expected failure'. The first expected failure added, `XXXLocalFunctionRecursiveUntypedReturn`, was shown red with `fact(n: ZZ32): ZZ32` written for one run and then restored. It reported 'Did not satisfy compile_err_contains; expected reference cycle', the compile stopping at the code generator's 'Can't compile LetFn' (`junit.sh xxxred`, 11:05:44Z).

After row 680's line was held (`e75bb538b`), its two typecheck tests became expected failures. `XXXLocalFunctionSiblingInLoop` is keyed `typecheck_err_contains=TryChecker returned an untyped expr`, and `XXXLocalFunctionSiblingCall` is keyed `Result of typechecking still contains intermediate nodes`. The recursive case's key became `Result of typechecking still contains intermediate nodes`. The re-keyed recursive case was shown red again with the return type written for one run: 'Did not satisfy compile_err_contains; expected Result of typechecking still contains intermediate nodes' (`junit.sh xxxred2`, 11:31:31Z).

The passing run is the last after the last change of code (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests <the 12 files>`, 11:31:06Z, on `e75bb538b`'s code):

    OK (30 tests)

The four unit classes keep their verdicts on the final code (`ant testOnly -DtestPattern=X`): `TypeAnalyzerJUTest` 4, `TypeSchemaAnalyzerJUTest` 4, `FormulaJUTest` 5 and `ConstraintJUTest` 4 tests, each 'Failures: 0, Errors: 0'. They gave the same counts on the code with all three patches.

## 3. Where the fix belongs, and the precedent search

- **The place.** `explorations/coordinator/map/modules-and-phases.md`, B.6: the component's check builds a `TypeAnalyzer` before `STypeChecker` runs. The feature table's rows for `comprises` and local declarations name the checker's `TypeHierarchyChecker.scala`, `ExclusionOracle.scala` and `Decls.scala:405-418` (`spec-to-implementation.md:194`, `:201`). The probe traced the four rows to `normConjunct`, the sibling to the union rule (its sections 2.2 and 2.5), and row 680 to the thunks' priming (its section 4). No library edit can serve: the library's declarations are valid as written (`Library/FortressLibrary.fss:2493`; `plane` at `:2916`).
- **The ways** the checker offers for rows 686 to 690 and the sibling:
  - (a) the normal form expands only over ground conjuncts (taken);
  - (b) the union rule's two cases (taken, for the sibling);
  - (c) the expansion removed altogether, which also clears the sibling (the probe's quick loop) but loses the team's ground meets;
  - (d) a guard in `Formula.slv` that solves an `Or` branch by branch, which clears 687 only and turns 689 into 686's refusal (the probe's section 2.3);
  - (e) the union cases alone, which clear 687 and the sibling only (section 2.5).
- **Precedents counted.**
  - In `TypeAnalyzer.scala`, four places read a `comprises` clause: `pSubInner`'s trait-below-union case (`:161`), its sized-trait case (`:299`), the exclusion check (`:490`), and `normConjunct` (`:716`, `:719`). Only `normConjunct` builds a type, a union, from the clause; the other three build formulas.
  - A variable's bound is read in two cases, each under a history entry: the type variable on the left (`:200-236`, `:184-220` at the base) and its mirror on the right (`:237-258`, `:221-242` at the base). The sibling's second case follows the first.
  - For row 680, `Thunker.scala` primes functionals at three places: a variable declaration (`:44`, with no group to add), a trait (`:72`) and an object (`:111`). The last two prime with a TryChecker over the checker extended with the methods in scope. The `SLetFn` case is the only one that primes with the checker before its group is added.

## 4. What the specification settles

- Rows 686 to 690 and the sibling: a generic declaration is applicable if some instance within its bounds is (`basic/inference.tex:56-58`), and `T` is such an instance in each of the five programs. The Return Type Rule is checked on the meet of the domains (`Papers/Types/journal/justificationOfRTR.tex:313-322`), now `T`. Walk runs all five (the probe's section 2.1).
- Row 680: the local functions of one block are mutually recursive (`basic/functions.tex:597-598`), so `plane`'s call of `row` is in scope when `plane`'s return type is inferred.
- The recursive case: the compiled checker refuses a cycle of inferred return types (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala:264`), as the team's own expected failure pins at top level (`ProjectFortress/compiler_tests/XXX5bn.test`). The specification asks for inference over every elided type (`basic/components/type-inference.tex`, section "Type Inference for Components") and does not describe it. The test pins today's crash until row 680's line lands, and the refusal after that.

## 5. Old against new

- The 12 test files ran on the base's code (the failing run, the tree before its first build) and on the new code (the passing run). The five run tests go from a refusal or a crash to `PASS`, and the kept three are `PASS` on both.
- Two files of the ladder subset have a first error that differs from the 2026-09-19 baseline: `commonSuper.fss` and `GenericFnWithExcludes.fss`. They were compiled with the old code (`old-fortress.sh /home/user/fortress-base15 tmp/rung-checker-bounds/old-caches compile X.fss`, from a copy in `tmp/`). Its output equals the new code's line for line, paths masked, with 'No such method Object.me.' and 'No such method U.f.' first. So the move predates this rung.

## 6. The measures

All ran on 4 cores, `Intel(R) Xeon(R) Processor @ 2.10GHz`, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Other rungs' builds and suites ran beside them.

**The count stage, three runs.**

1. With all three patches (`3216343f6`), started 11:06:47Z at load 0.57: the table equals climb batch 14's, `#total 1`, `#crash none`. Its error is `Library/FortressLibrary.fss:1314:10: Missing parameter type for i`. 379 s.
2. With all three patches, and with `body(i)` at `Library/FortressLibrary.fss:1314` written `body(i: I): L` for that run only and restored after it (`git status` printed nothing).
   - Started 11:13:23Z at load 3.13; the load rose to 9.69 at 11:18:53Z and was 5.91 at the end.
   - Every api 0, `#total 43`, `#locations 40`, `#crash none`; **809 s**.
   - The api checks ended at about 11:17:46Z, the run log's last write before the component's errors: about 263 s for the apis and 546 s for the component.
   - The 43 errors are the component's 44 typecheck and wellformed sites of `explorations/compile-ladder/gate/distance-sites.tsv` less `:2493`. By location: `:130`, `:642` three, `:643`, `:1342`, `:1942`, `:2405`-`:2411` five, `:2430`, `:2441`, `:2464` two, `:2466`, `:2468`, `:2567`, `:2571`, `:2709`-`:2713` four, `:2773`, `:2778`, `:2816`, `:2837` two, `:2840`, `:3230`, `:3247`, `:3268`, `:3274`, `:3284`, `:3286`, `:3578`, `:4235`, `:4241`, `:4260`, `:4261`, `:4407`, `:4423`.
   - None lies in `Array3` (`:2886-2999`): nothing was hidden behind row 680's crash.
   - 809 s is past the 690 s of the batch record, so row 680's line was not landed.
3. On the final code (`e75bb538b`: the normal form and the sibling), started 11:31:55Z at load 3.43: the table equals climb batch 14's (`diff` prints nothing), `#total 1`, 378 s.

In runs 1 and 3 the count table does not differ from climb batch 14's. Run 2 is the stage that checks the component whole, which the gate's stage does only once both `body(i)` and row 680's line land.

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-checker-bounds/checker-count-postedit.txt tmp/rung-checker-bounds/cc-post
    #total	1
    #crash	none
    # seconds 378

Against batch 14's gate (under 5 minutes) and the 900 s limit, runs 1 and 3 show no measurable effect of the normal form on the api checks, which row 688's memo bounds (280 to 390 s in climb batches 13b and 14).

**The distance stage** ran once, on the final code, started 11:38:23Z beside this rung's own `ant testQuick`, so its time is not comparable with batch 14's 1714 s:

    explorations/coordinator/tools/distance/run.sh tmp/rung-checker-bounds/distance-postedit.txt tmp/rung-checker-bounds/dist-post
    #total	53
    #crash	decl	TraitDecl FortressLibrary.fss:2886:1-2999:2	InterpreterBug	** bug! TryChecker returned an untyped expr: FnExpr at FortressLibrary.fss:2922.13 ...
    #seconds	2350	FortressLibrary 1436

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-14/gate/distance.txt tmp/rung-checker-bounds/distance-postedit.txt
    DISTANCE DOWN   54 -> 53 (-1)
        kind typecheck               41 -> 40     (-1)
        class OT                     15 -> 14     (-1)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary     48 -> 47     (-1)

**The sites, by row and line.** `tmp/rung-checker-bounds/dist-post/errors.tsv` was compared against `explorations/compile-ladder/gate/distance-sites.tsv` by kind, unit, location and message (`diff` of the sorted columns 1, 4, 6, 7). One row goes: `typecheck component FortressLibrary FortressLibrary.fss:2493 Could not check call to function squaredNorm - [\T extends Number MultiplicativeRing[\T\], nat s0\]Vector[\T,s0\]->T is not applicable to an argument of type Vector[\T,k\].` None comes, so 54 rows become 53. The rung edits no library line, so no line moved (row 577). Both crash rows stay: `body(i)`'s, and row 680's, whose line is held.

**The suites.** `ant testQuick` ran once on the final code (11:38:23Z to 11:53:16Z, 'BUILD SUCCESSFUL', 'Total time: 14 minutes 53 seconds'):

    fast-compiler       Tests run: 1190, Failures: 0, Errors: 0, Skipped: 0
    fast-library        Tests run: 86, Failures: 0, Errors: 0, Skipped: 0
    fast-othercompiler  Tests run: 263, Failures: 0, Errors: 0, Skipped: 0

Climb batch 14's gate had 1173, 86 and 263, with no failure (`explorations/compile-ladder/climb-batch-14/gate/summary.txt`). The compiler track's 17 extra cases are this rung's: two more for each of the four promotions (link and run), three for each of the two new run tests, and one for each of the three new expected failures. No other compiled test changed its verdict. `testSystem` was not run: the edit is the checker's, which walk does not run.

**The ladder subset** (`gate.md`, "The ladder regression", its end). The drivers were copied to `tmp/rung-checker-bounds/ladder/`, with two copies of the caches made after the library order. The subset is the 12 files of the baseline's `ladder.tsv` whose first error names what the rung touched:

- a reference cycle: `testTest2`, `tupleTest3`, `XXXimmutableTopLevel`, `overloadGenericNon`, `wrapZZ`;
- a local function: `funny`, `simplify1` ('Can't compile LetFn');
- a `comprises` clause: `atomicList`;
- a union or a generic `excludes`: `Exception`, `LabelTest`, `commonSuper`, `GenericFnWithExcludes`.

None is in the landed `ladder.tsv`, so each was compared with the baseline's. Ten are at the same phase with the same first error (`funny` and `simplify1` but for the tree's path). `commonSuper` and `GenericFnWithExcludes` are at the same phase, `typecheck`, with another first error that the old code gives too (section 5). No ladder file moved.

## 7. Sentences of the specification made false

None. The search: `grep -rn` over `Specification/` for rows 680 and 686 to 690, and for the messages 'Applied a substitution to an And and got an Or', 'TryChecker returned an untyped expr' and 'Result of typechecking still contains intermediate nodes'.

- The only hit is the rationale of `revival-paramtype` (`Specification/appendices/changes.tex:3324-3329`). It gives the crash messages of rows 620 to 622 as history before that change, and it stays true. With row 680's line held, the crash it names still occurs at a sibling call.
- The Appendix I passages on row 518 (`changes.tex:1944-1946`: such an argument "was refused ... It now follows the chapter") and on row 695 (`:3570-3574`: the parameter "at an object type fails") stay true. `SelfTypeReturnSelfAtTraitRun` now guards the second from the other side.
- The entries on closed traits and covering (`changes.tex:2755-2770`, `:2858-2870`) speak of meets of ground traits, whose expansion the change keeps.
- `basic/inference.tex` and `advanced/overloading.tex` make no claim on the normal form.

## 8. Points to report

- **Count tables and row 680's line.** Run 1: 379 s, count 1. Run 3 (final): 378 s, count 1, the table equal to batch 14's. Run 2, the component's own errors: 43 in 809 s, past 690 s. **Row 680's line did not land** (`e75bb538b`). Evidence: section 6.
- **A patch changed from the probe's.** None. The normal-form and sibling patches are on the branch as the probe wrote them (`4356454a2`). Row 680's patch was applied unchanged and then held by the 690 s rule, not changed. `InferUnionInstanceArg` keeps its verdict, `PASS` (the passing run; `fast-compiler` 0 failures).
- **A site beyond `:2493` and the crash row.** None comes or goes. The crash row stays, its line held (section 6).
- **A compiled test whose verdict changes beyond the promotions and the new tests, or a ladder file that moves.** None (section 6).
- **A specification sentence made false.** None (section 7).
- **A checker file edited beyond the two, or a library or walk edit.** None on the branch. `impls/Decls.scala` was edited (`3216343f6`) and put back (`e75bb538b`). `Library/FortressLibrary.fss:1314` was changed for run 2 only, restored, and never committed.

## 9. Decisions

1. **Row 680's line held.** The count over the whole component took 809 s, past the record's 690 s (section 6, run 2).
   - Taken: the record's own rule, "If it prints no total or takes more than 690 s, do not land row 680's line: land the normal form and the sibling, and report" (`explorations/coordinator/CLIMB-BATCH-15.md:154`).
   - Not taken: landing it on the reading that the run's load (3 to 9 on 4 cores, beside other rungs' suites) explains the excess, since the 690 s margin was set for load.
   - Not taken: running the stage again on a quieter machine. The record makes run 2 "the batch's one measure of that stage", and a second try would choose among measures.
   - Not taken: the library's workaround `plane(k: ZZ32): () =`. The line is valid as written (the probe's section 4), and the library is not this rung's.
2. **Row 680's tests kept as expected failures**, keyed on today's crashes (home 2: the specification settles it, `basic/functions.tex:597-598`). Not taken: dropping them and handing them over, which leaves the row's reproducer `none`; plain tests, which would be red; expected failures with no key, which would stay green across the repair and so not show it.
3. **The recursive case keyed on its crash, not deleted.** When row 680's line lands it turns red, 'Did not satisfy compile_err_contains', and the repair re-keys it to `reference cycle`, the checker's rule for a cycle (`Thunker.scala:264`, `XXX5bn.test`). Not taken: deleting it until then; keying it on `reference cycle`, which is red today.
4. **The two code changes in two commits** (`4356454a2`, `3216343f6`), so that row 680's line could be held by one revert. Not taken: one commit, which a hold would have split.
5. **The promotions keep `compile`** beside `link` and `run`, as their neighbours `OverloadTwoBoundsClosedTrait` and `InferUnionInstanceArg` do. Not taken: `link` and `run` only, which the skill's run-time pair uses.
6. **Test names.** Each new name sits beside its family. Not taken: the probe's file names (`BoundsGround`, `LocalRecursiveUntyped`), which name no topic.
   - `CallerParamTwoGroundBoundsClosedTrait` for the sibling, beside `CallerParamTwoBoundsClosedTrait`, whose shape it shares with a ground second bound.
   - `XXXLocalFunctionRecursiveUntypedReturn`, beside the landed `XXXLocalFunctionUntypedParam*`.
   - `SelfTypeReturnSelfAtTraitRun`, beside `XXXSelfTypeReturnSelfRun`.
7. **The normal form keeps the team's expansion for ground meets** (the probe's decision, its section 10).
   - Not taken: removing the expansion. It also clears the sibling, but it was never run through the tracks and it changes every ground meet with a closed trait.
   - Not taken: a guard in `slv` (section 3).
   - No decision of the curator covers the analyzer's normal form. The reading acted on is P-26's POPL 2019 condition, which the change keeps.
8. **The ladder subset** is the 12 files of section 6. Not taken: an empty subset (no first error names the normal form); the whole ladder (the gate's).

## 10. Defects, each with its home

- **Rows 686, 687, 689, 690**: home 1, repaired (`4356454a2`). Tests: `InferCallerTwoBoundsClosedTrait`, `CoerceTwoBoundsClosedTrait`, `CallerParamTwoBoundsClosedTrait`, `ReturnRuleTwoBoundsClosedTrait`. The cause is the normal form over a variable (section 1). Row 686's claim also covers a ground second bound, whose face stays refused: it closes with its claim narrowed, and the ground face is NEW-C-2 (the skeptic's correction, `SKEPTIC.md`).
- **The ground sibling, NEW-C-1**: home 1, repaired (`4356454a2`). Test: `CallerParamTwoGroundBoundsClosedTrait`. A new row (record.md), to add and close at once.
- **Row 680**: home 2, deferred; its repair was measured and held. Tests: `XXXLocalFunctionSiblingInLoop` (its reproducer from now on) and `XXXLocalFunctionSiblingCall`. Its claim and its note "A compiler-world program of the same shape typechecks" are false. `plane`'s body is well typed; the group's thunks are primed without the group (`impls/Decls.scala:414`); and the two compiled tests crash the checker on the base. The corrected claim is in record.md.
- **The recursive local function with no return type**, 'Result of typechecking still contains intermediate nodes': row 680's mechanism, home 2 under row 680. Test: `XXXLocalFunctionRecursiveUntypedReturn`. With the line, it gets the cycle refusal.
- **Row 695's bound at a trait type**: no defect. `SelfTypeReturnSelfAtTraitRun` guards it.
- **What the normal form gives up** (the probe's section 2.4): the exclusion of a meet over a variable from a type that excludes each remaining listed type but neither conjunct. No test, track or site shows a case; the skeptic's program shows one, an overloading the base accepted and the head refuses, on a question that Appendix I lists as not settled: NEW-C-3, `XXXOverloadTwoBoundsClosedTraitExclusion` (`SKEPTIC.md`).
- **A self-bounded type parameter that no argument fixes** (the skeptic's measure, `SKEPTIC.md`): `mk(A)` for `mk[\T extends R[\T\]\](x: K)` is refused as not applicable on the base and the head; with `{ K, R[\T\] }` as the bound the base crashed and the head refuses. Home 2: NEW-C-4, `XXXInferUnfixedSelfBoundedParam`.

## 11. For FACTS

record.md holds the new fact on the normal form and the union cases, and the corrections of F-94, F-53 and F-54.

## 12. Commands worked out

- The count stage's time, which its table does not print: the brief's nohup line with `s=$(date +%s)` before `run.sh` and `echo "# seconds $(( $(date +%s) - s ))"` after it, and a machine line first.
- The per-site comparison: `diff <(grep -v '^#' explorations/compile-ladder/gate/distance-sites.tsv | cut -f1,4,6,7 | sort) <(grep -v '^#' tmp/rung-checker-bounds/dist-post/errors.tsv | cut -f1,4,6,7 | sort)`.
- The ladder subset's comparison with the baseline, file by file: `awk -F'\t'` over the baseline's and the run's `ladder.tsv`, columns 4 (phase) and 11 (first error).
