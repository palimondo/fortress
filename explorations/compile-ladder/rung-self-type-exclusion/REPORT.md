# Rung X (rung-self-type-exclusion): the self type and the bounds in the overloading check's exclusion test (P-157)

- problem: with symbolic operators checked, the compiled checker refuses 8 pairs between `AdditiveGroup`'s `+` and `-` and the library's generic scalar block, though no call fits both (F-245; `explorations/perf-probes/self-type-exclusion/REPORT.md:63-100`, the full check's `L1 8` row, the sites at `FortressLibrary.fsi:267-268` against `:2702-2708` and `FortressLibrary.fss:361-362` against `:4906-4912`).
- spec: `Specification/advanced/overloading.tex:582-588` ("each static parameter stands for any type within its bound", the existential reduction of "Declarations with Static Parameters"); `Specification/basic/traits.tex:285-302` (a self-type parameter, and every extender a subtype of its static argument for it).
- precedent: P-152's `emptyED`, a second way to be valid beside `subtypeED` in `OverloadingOracle.excludes` (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:327`, landed `14e91723f`); `subtypeEDMemo` behind `fortress.schema.subtype.cache` for the memo (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:53`, `:148`); `FunctionalMethod.parameters()`, which makes the self parameter plain while `ast()` keeps its `TraitSelfType` (`ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java:41-67`, `:152-166`), read as `C[\X\] & X` by `removeSelf` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:567-580`).
- deviation: the exclusion test alone reads `self` in a signature as `C[\X\] & X`, where the specification says the signature keeps `T` "which overloading and the choice of a declaration at a call read" (`Specification/basic/expressions/var-ref.tex:77-79`, `Specification/basic/traits.tex:599-602`); the test reads a parameter's bounds only where it stands at the top of the meet, a parameter inside a static argument as it is (`TypeSchemaAnalyzer.scala:456-486`); the checker now accepts row 713's pair, which Appendix I lists as not settled and walk refuses at load (`Specification/appendices/changes.tex:4135-4140`; `ProjectFortress/tests/OverloadTwoBoundsClosedTraitExclusionWalk.test:1`).
- historical: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala, ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala, ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala, Specification/appendices/changes.tex

Branch `wip/rung-self-type-exclusion`, cut from `00f2e1bdc`, seeded from `/home/user/fortress-base21` (the seeding script exited 0; the base build's `HEAD` is `aa5ff2423`, whose code is the base's: `git diff --name-only aa5ff2423 00f2e1bdc -- ProjectFortress Library build.xml Specification` prints nothing), pushed. Commits: `7213c6b03` (the nine tests), `e402f9e29` (the change, the promoted test and the walk guard), `236d16362` (the speed pass), `070b88000` (Appendix I). The harness refused this agent's write of REPORT.md and record.md; their text is the rung's result.

## 1. What changed and why

P-157: `Vector` and `Matrix` stay additive groups, and the overloading check's exclusion test reads a self-typed trait's `self` as `C[\X\] & X` and its existential reduction reads the static parameters' bounds; specificity and the Return Type Rule keep the plain signatures. Probe A1's two patches, taken as they are in substance (decision 1):

- **Shadow (i), the self type in the exclusion test only** (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala`):
  - `toFunctionArrows` (`:127-134`) and `toFunctionalMethodArrows` (`:175-182`) make the plain arrow as before and pass it through `selfTyped` (`:561-569`), which, for a functional method whose own parameters (`FunctionalMethod.ast`) differ from `parameters()`, that is whose self type was read from the F-bound, makes a second arrow from the own parameters by the same steps (the trait's replacer and the own static parameters renamed apart) and keeps it in an identity map keyed by the plain arrow (`:560`).
  - `validOverloadingInner`'s exclusion test reads it: `oa.excludes(forExclusion(fa), forExclusion(ga))` (`:614`; `forExclusion`, `:570-573`).
  - Specificity (`oa.lteq`), `functionalMethodsAtOnePosition`, the Meet Rule, the coverage rule, the fancy rule, the duplicate check and the Return Type Rule read the plain arrows. A self type from a `comprises` clause is untouched (F-225): its own parameters equal `parameters()`.
- **Shadow (ii), the bounds in the exclusion test's reduction only** (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:448-543`):
  - `withBounds` (`:456-486`) reads each type parameter standing at the top of the meet (the meet itself, a tuple's element, a member of an intersection or union, the parts of a self type) as the meet of its declared bounds, never as `X & B` (the solver's recursion, NEW-X-1).
  - `emptyWithBounds` (`:488-525`): the constraint of `reduceED` (the body off Bottom and the bounds) gets one more conjunct, the bounded body off Bottom; the meet is empty when that constraint is False, or when each disjunct's equalities, as the unifier takes them, leave the body below Bottom under the merged bounds (`boundsSubstitution`). A disjunct that does not unify, or whose images break a bound, counts as not empty.
  - `meetEmptyWithBounds` (`:527-543`) renames the two domains apart and tests their unreduced meet; `OverloadingOracle.excludes` takes it as a third way to be valid, after `subtypeED` and `emptyED` (`OverloadingOracle.scala:326-327`). The oracle's `excludes` is called from `validOverloadingInner` only (`grep -rn 'excludes(' ProjectFortress/src/com/sun/fortress --include=*.scala --include=*.java`), so no other rule reads it. Not the global variant.
- **The speed pass** (`236d16362`, section 5): a memo of `meetEmptyWithBounds` per analyzer behind `subtypeED`'s switch, and the test that neither domain has static parameters before the two alpha renamings (`TypeSchemaAnalyzer.scala:527-543`).
- **Removed from the probe's patches**: the `PROBE` markers, `probeDebug` and the `-Dprobe.excdebug` output; `withBounds` and `emptyWithBounds` made private; the comment on (i) rewritten without record pointers.
- **Row 713's pair** (decision 3): the change accepts `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)`, where `K comprises { A, B, C }`, `Z excludes { A, B }` and `C extends Z` but not `R`. Under (ii), `T` at the top of the meet reads as `K & R[\#T\]`; with `Z`, the normal form expands `K` to `C`, and the object `C` excludes `R[\#T\]`. The pair is valid by the specification's rule, each parameter "within its bound" (`overloading.tex:582-588`), and compiles, links and runs: `XXXOverloadTwoBoundsClosedTraitExclusion` turned red, so it is promoted to `ProjectFortress/compiler_tests/OverloadTwoBoundsClosedTraitExclusion.{fss,test}` (compile, link, run, PASS), its one comment line respelled to the acceptance, its assertions kept. Walk refuses the same pair at load; `ProjectFortress/tests/OverloadTwoBoundsClosedTraitExclusionWalk.{fss,test}` pins that (`load_exception_contains=fails the Meet Rule`).
- **Appendix I** (`070b88000`): the two entries the brief names (section 7).

The promoted test's comment line, before: "A generic declaration whose type parameter is bounded by a trait with a comprises clause and by a bound naming the parameter, beside a declaration on a trait that excludes only the listed types that meet that bound, is refused as an invalid overloading."; after: "... is a valid overloading, since the only listed type that could meet both is outside the bound, and each call runs the declaration its argument selects (overloading.tex, section "Declarations with Static Parameters")." Its two `assert`s and `println("PASS")` are unchanged; its `.test` was `compile` with `compile_err_contains=Invalid overloading of f` and is now `compile`, `link`, `run`, `run_out_contains=PASS`.

## 2. The tests, their failing runs and their passing runs

Nine compiled tests in `ProjectFortress/compiler_tests/`, each a component of A1's section 5 (its common lines, one declaration, `run(): () = ()`), with the word operator `PLUS`:

| # | Test | A1's name | Kind | Base | After |
|---|---|---|---|---|---|
| 1 | `ExclusionSelfTypeBoundsScalarRight` | VecPairs | typecheck | red, 'Invalid overloading of PLUS' | green |
| 2 | `ExclusionSelfTypeScalarRight` | VecPairsC | typecheck | red | green |
| 3 | `ExclusionBoundsScalarLeft` | VecPairsLeft | typecheck | red | green |
| 4 | `ExclusionVectorScalarBlock` | VecLib | typecheck | red, 4 errors | green |
| 5 | `ExclusionScalarLeftPlain` | VecPairsLeftC | typecheck | green | green |
| 6 | `XXXExclusionSelfTypeSharedLeft` | NegLeft | compile, `compile_err_contains` | green | green |
| 7 | `XXXExclusionSelfTypeSharedRight` | NegRight | compile, `compile_err_contains` | green | green |
| 8 | `XXXExclusionBoundsMeetAtObject` | NegShared | compile, `compile_err_contains` | green | green |
| 9 | `XXXExclusionExcludingBoundsBox` | tint (row 786) | compile, `compile_err_contains=Invalid overloading of tint in component ...` | green | green |

**The failing run**, on the base's code, before the change was first built (2026-10-23T13:38:58Z; the build of the change began at 13:41):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests <the nine .test files>
        Invalid overloading of PLUS in component ExclusionSelfTypeBoundsScalarRight:
    File ExclusionVectorScalarBlock.fss has 4 errors.
    1) ProjectFortress/compiler_tests/ExclusionSelfTypeBoundsScalarRight(...)junit.framework.AssertionFailedError: Must satisfy FAIL or fail should not appear in output typecheck
    FAILURES!!!
    Tests run: 9,  Failures: 4,  Errors: 0

Tests 1 to 4 failed, 5 passed, 6 to 9 printed `Saw expected failure`.

**The first XXX test shown red on a deliberate fix**, through the harness: `XXXExclusionSelfTypeSharedLeft.fss` with its generic declaration replaced by a comment for one run, then restored (`cmp` against the saved copy):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxxred ProjectFortress/compiler_tests XXXExclusionSelfTypeSharedLeft.test
     Saw failure, but did not satisfy compile_err_contains; expected
    1) ProjectFortress/compiler_tests/XXXExclusionSelfTypeSharedLeft(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

**The promoted test** `OverloadTwoBoundsClosedTraitExclusion` on the old code, through the harness (2026-10-23T13:45:39Z):

    (cd ProjectFortress && explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base21 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/OverloadTwoBoundsClosedTraitExclusion.test)
        Invalid overloading of f in component OverloadTwoBoundsClosedTraitExclusion:
    FAILURES!!!
    Tests run: 3,  Failures: 3,  Errors: 0

**The walk guard** `OverloadTwoBoundsClosedTraitExclusionWalk` asserts today's behaviour and comes with no fix: `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/OverloadTwoBoundsClosedTraitExclusionWalk.fss ProjectFortress/tests/OverloadTwoBoundsClosedTraitExclusionWalk.test` gives `OK Saw expected refusal at load` and `OK (1 test)`.

**The passing run**, the last after the last change of code (`236d16362`), `ant testQuick`:

    BUILD SUCCESSFUL
    Total time: 7 minutes 36 seconds
    fast-compiler: Tests run: 1293, Failures: 0, Errors: 0, Skipped: 0
    fast-library: Tests run: 86, Failures: 0, Errors: 0, Skipped: 0
    fast-othercompiler: Tests run: 263, Failures: 0, Errors: 0, Skipped: 0

In its log, tests 1 to 5 are `OK`, 6 to 9 `Saw expected failure`, and `OverloadTwoBoundsClosedTraitExclusion`'s compile and link `OK` and its run `Passed`. The compiler track is 1293 against climb batch 20's gate 1282: nine new cases, and the promoted test's three cases where the `XXX` test had one. Walk's suite is not run: no code of walk or of a shared phase changed (the skill's tests-running.md, "When to run a whole suite"); the one walk test added ran through the harness.

**The solver's recursion (NEW-X-1) is not met** by the form of (ii) built: tests 1 and 3, the probe's `VecPairs` and `VecPairsLeft`, on which the `keepvar` form overflowed the stack, typecheck in 100 ms and 96 ms in `ant testQuick`, and every stage below finished with `#crash none`.

## 3. Where the fix belongs, and the precedent search

- **The place.** The map's B.7, overloading: the compiled checker's `OverloadingChecker` and its oracle; both rules are of the checker alone, which walk does not run (walk's own Meet Rule check is `interpreter/evaluator/values/OverloadedFunction.java:759-940`). The brief names the three files; none is a file another rung of this run edits.
- **Precedent.** P-152's rung added `emptyED` as a second way to be valid in the same expression (`OverloadingOracle.scala:327`); (ii) is a third, as A1 measured, beside it. The sites in `OverloadingOracle.scala` and `OverloadingChecker.scala` that ask whether two arrows exclude: one, `validOverloadingInner`'s, live (`OverloadingChecker.scala:614`), and its commented-out copy (`:628`); the `Functional` form of `excludes` (`OverloadingOracle.scala:316-320`) delegates to the arrow form. So 1 site, and the change reaches it.
- **The ways the checker offered**, for (i): the second arrow beside the plain one (taken, A1's); the self type written into `parameters()` (refused: P-146 keeps the signatures plain, and the self-typed bodies judgement measured 18 Return Type errors that way, `explorations/reviews/self-typed-bodies-judgement.md:181-204`); a field on `FunctionalMethod` (a file outside the brief's list). For (ii): the bounds read in the constraint generator, one more conjunct (taken, A1's); the bounds in every reduction (the global variant, refused by the brief); the solver's unifier taught to derive equalities from an upper bound and a non-exclusion (`Formula.scala`, every inference); the parameter kept beside its bounds (`X & B`, which recurses, NEW-X-1).

## 4. The stages

No path of the edit is under the folders that cannot move a stage (`git diff --name-only 00f2e1bdc` names three `scala_src/` files), so both stock stages ran once on the final code (`236d16362`), from the tree's root:

- **The count stage**, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-self-type-exclusion/checker-count-postedit.txt tmp/rung-self-type-exclusion/cc-post`: `#total 3`, `#locations 3`, `#crash none`; `diff` against `explorations/compile-ladder/climb-batch-20/gate/checker-count.txt` prints nothing.
- **The distance stage**, `explorations/coordinator/tools/distance/run.sh tmp/rung-self-type-exclusion/distance-postedit.txt tmp/rung-self-type-exclusion/dist-post`, `#seconds 191 FortressLibrary 136`, load at start 2.53:

      explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-20/gate/distance.txt tmp/rung-self-type-exclusion/distance-postedit.txt
      DISTANCE SAME   5

  By row against `explorations/compile-ladder/gate/distance-sites.tsv` (kind, location and message, tree paths masked): identical. No site moved.
- **The full-check distance stage**, the test of the 8 sites: `explorations/perf-probes/symbolic-operators-2/run-shadow.sh tmp/rung-self-type-exclusion/full-check.txt tmp/rung-self-type-exclusion/full-check catch`, 274 s wall, `#seconds 259 FortressLibrary 194`, load at start 3.23, `#shadow every shadow edit matched the tracked sources`, `#crash none`:

      #total	183
      #kind	overloading	174
      #kind	other/overloading	3
      #class	M1	174	overloading: the Meet Rule

  Against the planner's `explorations/compile-ladder/plan-21/probes/full-check-base.tsv` (191), `python3 explorations/perf-probes/array-sites/compare-sites.py`:

      landed 191 now 183
      GONE	overloading	FortressLibrary.fsi:L,FortressLibrary.fsi:L	Invalid overloading of + in API FortressLibrary: [\T extends AdditiveGroup[\T\]\](AdditiveGroup[\T\], T)->T @ ... and [\T extends Number AdditiveGroup[\T\], I\](Array[\T,I\], T)->Array[\T,I\] @ ...

  and seven more `GONE` lines, the api's `+` and `-` with the scalar on either side and the component's four; no line comes; the export errors' 43 entries are the same. The `L1` class is gone.
  - **The fancy rule's three errors, a change of wording**, as A1 found under (i): before, `fsi:1654` against `:1619`, `:1660` against `:269`, `:1767` against `:268`; after, `fsi:1654` against `:267`, `:1770` against `:1741`, `:1657` against `:268`. Count, kind and unit unchanged; the rule reads only `lteq` on the plain arrows.
  - **The caught crash**, on `||` in List's api and component and String's component, `E is not in the kind env` at `List.fsi:56:27`, `List.fss:106:13` and `List.fsi:56:27`: the spans the earlier probe printed on the plain full check (`explorations/perf-probes/symbolic-operators-2/REPORT.md:57`); only the kind-environment dump's fresh names differ.
- **The count stage under the full check**, A1's `explorations/perf-probes/self-type-exclusion/count.sh tmp/rung-self-type-exclusion/count-full.txt tmp/rung-self-type-exclusion/count-full full`, 82 s: `#total 98`, `#locations 35`, `#crash none`, A1's 98 under both shadows against 102 without.

No table is committed: the gate's tables on the merged tree are the record.

## 5. The checker's time (P-148)

The count stage, one run each, in one session, each started in the background with the skill's command (`time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`), under `nice -n 19`. Machine: `nproc` 4, Intel Xeon Processor @ 2.10 GHz, 2100 MHz, JDK 25.0.4.1, `FORTRESS_THREADS=1`, other agents' JVMs beside it.

| Run | Code | Started (UTC) | Load at start | real | user |
|---|---|---|---|---|---|
| base | the base build `/home/user/fortress-base21` | 13:39:49 | 0.24 | 95 s | 139 s |
| change | `e402f9e29` | 13:58:00 | 8.32 | 108 s | 131 s |
| pass | `236d16362` | 14:05:14 | 1.77 | 85 s | 132 s |

- **The results are the same.** `diff tmp/count/base.txt tmp/count/change.txt` and `diff tmp/count/change.txt tmp/count/pass.txt` print nothing; the three `run.txt` files, each tree's path replaced by `TREE`, are equal (`diff` prints nothing). No stall: `#crash none` each time; nor under the full check (section 4), so the stall path the self-typed bodies judgement watched did not show.
- **No slowdown of several times.** I do not analyse the differences.
- **The profile.** The stock stage never calls the new test: an instrumented copy (a counter on `meetEmptyWithBounds`, compiled ahead of the build in `tmp/`) printed nothing, its object never initialised; `selfTyped` has 0 of 5,111 JFR samples. Under the full check (the instrumented copy with the full-check shadow), `meetEmptyWithBounds` was called 99 times, 4 of them true, for 4.2 s; with JFR, 467 of 5,111 samples (9.1 %) are inside it, and 93 % of those in `Formula.negate` (`Formula.scala:858`, `:863`), the negation of `ta.equivalent(ieB, BOTTOM)`: a second split showed that negation at 943 to 1,179 ms a call on the scalar block's three heavy calls, the other negation at 1 to 2 ms, the rest under 40 ms. The stage's top frames are the checker's own normalizer: `TypeAnalyzer.pNorm` 67.4 % inclusive, `Statics.anyHash` 6.5 % and `BoxesRunTime.equals2` 6.1 % self.
- **The pass.** The 95 calls with no static parameters on either side return before the two alpha renamings; the heavy calls with static parameters reuse an answer for the same two domains in one analyzer. Making the negation itself cheaper is a change of `Formula.scala`, every inference's solver, outside this rung's files; dropping either negation changes the constraint the disjuncts are read from, so the results could change (decision 6).
- **The audit**, an instrumented copy (`tmp/`, never the tree) that computes each reused answer again and compares, on the full-check count stage: `@@AUDIT meetEmptyWithBounds memo: computed=3 reuses=1 differences=0`, `#total 98`. On the stock stage the memo is never reached.
- `ant testQuick` ran once after the pass (section 2).

## 6. Old against new

- **A1's 35 compiled test files in scope** (`compiler_tests/SelfType*`, `XXXSelfType*`, `OverloadGeneric*`, `GenericPair*`, `*Comprises*`, 52 tests) **with the team's `XXX10k` and `AfterTypeChecking`**, 150 tests in one JVM: on the old code through `old-fortress.sh ... junit` and on the change through `junit.sh`. New: `OK (150 tests)`. Old: 147 of 150, the three red ones `XXXComprisesGenericRenamed`, `XXXComprisesGenericUnlisted` and `Compiled10.k`, whose `compile_err_equals` pins a path under `FORTRESS_HOME` that the old code, run from the base build on my tree's files, prints with my tree's path. With paths, times, the identity hash and `junit.sh`'s 240-character cut masked, the printed diagnostics are the same; no file's output changes.
- **Row 713's pair**: refused on the old code ('Invalid overloading of f'), accepted and run on the new (section 2). Walk refuses it at load on the new tree, 'fails the Meet Rule' (walk is unchanged).
- **The ladder subset**: `XXXGenericOverload.fss` (run), `XXXGenericOverload2.fss` (link) and `XXXextendOprParam2.fss` (typecheck), the files whose recorded first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names overloading or a self-typed trait's operator; the newest landed `ladder.tsv` (climb batch 20) does not run them. Each keeps the baseline's phase. `XXXextendOprParam2.fss`'s first error is now 'Ill-formed type: Altoid[\Chicken,EGG\]' where the baseline has 'The inherited abstract method OPLUS...'; the old code prints the same 'Ill-formed type' (`old-fortress.sh ... compile`), so the move predates this rung. The eighteen microGPT components: `diff <(mg_phases explorations/compile-ladder/climb-batch-20/gate/ladder/microgpt-phase.md) <(mg_phases tmp/rung-self-type-exclusion/ladder/microgpt-phase.md)` prints nothing (all eighteen at disambiguate).

## 7. What the specification settles, and the text changed

- **The self type.** `traits.tex:285-302` gives `self` the type `T ∩ X` in the bodies and requires every extender to be a subtype of its static argument for `X`; so every value that a functional method of `T` takes as `self` is an `X`, and reading it so where two domains are tested for a shared value is sound. The signature keeps `T` (`var-ref.tex:77-79`, `traits.tex:599-602`); those two sentences say overloading reads it, which the exclusion test no longer does (section 8).
- **The bounds.** `overloading.tex:582-588` reads each static parameter "for any type within its bound", and the type group's existential reduction solves the non-emptiness condition with the bounds (`Papers/Types/exc-reduction.tick:40-46`, `:68`): the bounds reading is the specification's rule, which the checker's solver did not apply. The team's `reduceED` conjoined the bounds ("Add bounds (even if we can't use them very well yet)", `TypeSchemaAnalyzer.scala:382-389` at the base), but its unifier takes equalities only from a lower bound equal to an upper bound (`Formula.scala:684-698`).
- **Row 713 and tint.** Appendix I's "Passages not yet revised" calls not settled whether two parameter types exclude where only static arguments that a bound rules out could meet them (`changes.tex:4135-4140`). P-157's bounds reading accepts row 713's pair, where the bound rules out `C`; tint stays refused, since `Box[\BottomType\]` is an instance of both domains (row 786's open question).
- **The text changed**, in the revision form, in `Specification/appendices/changes.tex` only, as the brief asks:
  - The entry "The type of self in a trait with a self-type parameter": its rationale gains the exclusion test's reading of `self` as `T ∩ X`, the extender rule that makes it sound, and the 8 pairs it clears (`:4028-4043`), and the reasoning's pointer to this report (`:4047-4051`); its effect says the signatures keep `T` except in the test of exclusion (`:4055-4059`).
  - The entry "Overloading with static parameters": its rationale gains the bounds reading by the decision of 23 October 2026, with the 2011 paper's reduction (`:2852-2859`); its effect gains the test's reading of the bounds, the library's scalar `+` it accepts, and row 713's pair it accepts where walk refuses (`:2921-2934`); the tint sentence says the test reads the bounds and `Box[\BottomType\]` is an instance of both (`:2956-2959`).
  - No main-text passage changed, so no new `\revision` box; the preamble's paragraph (`Specification/fortress/preamble.tex:54-64`) stays true. The specification built (`./ant genSource && ./ant tex`, both `BUILD SUCCESSFUL`); `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0, and the skill's grep prints 44 both on this text and on the base's `changes.tex` built the same way (its matches are the log's echo of the warning macro, not warnings). The build's files were removed (`git clean -fXq -- Specification`).
- **No decision record**: the section asks for none; the reasoning is here.

## 8. Sentences made false

The specification:

1. `Specification/basic/expressions/var-ref.tex:77-79`: "the \KWD{self} parameter keeps the type `\EXP{T}' in the signature of each method declaration, which overloading and the choice of a declaration at a call read." The exclusion test of overloading reads `T ∩ X`.
2. `Specification/basic/traits.tex:599-602` (the `revival-self-type` box): "this remains the type of the \KWD{self} parameter in the declaration's signature, which overloading and the choice of a declaration at a call read". The same.
3. `Specification/appendices/changes.tex:4135-4140` ("Passages not yet revised"): "the compiled type checker takes them to exclude where the static argument that the two parameter types force is a named type that fails the bound, and not where it would reason through the ancestors of the parameter types". It now also takes row 713's pair to exclude, reading `T`'s bounds at the top of the meet.

The record and the skill (for the gather):

4. `.claude/skills/fortress-repo/references/compiler.md:77`: "the checker reads no bounds of static parameters when it reads exclusion over the whole tuple of parameter types. So it refuses `tint`...". It reads them at the top of the meet; it refuses `tint` because `Box[\Bottom\]` is an instance of both.
5. `.claude/skills/fortress-repo/references/revival-changes.md:40`: "In `T`'s bodies, `self` has the intersection type of `T[\X\]` and `X`; signatures keep `T[\X\]`." True of the signatures, but the exclusion test of overloading reads `T[\X\] & X`; the sentence should say so.
6. F-225 (`explorations/coordinator/FACTS.md:91`): "the methods' signatures keep `self` at the plain trait type `C[\X\]`": true, but the overloading check's exclusion test now reads `C[\X\] & X`.
7. F-227 (`FACTS.md:93`): "(row 713, contested; `compiler_tests/XXXOverloadTwoBoundsClosedTraitExclusion` pins the refusal)". The checker accepts the pair, and the test is promoted.
8. F-245 (`FACTS.md:104`): "132 wait on two designs that the curator decides" and "a vector plus a number beside a vector plus a vector (8)": the 8 clear under the full check with this change, the design P-157 (with the full check off, nothing moves).
9. Row 713's claim, "the compiled checker refuses, as an invalid overloading, ...", and its reproducer; row 786's note "its `emptyED` reads no bounds" (record.md gives both rows' new lines).
10. (Added by the skeptic.) F-258 (`FACTS.md:178`): "The checker: `OverloadingOracle.excludes` asks `TypeSchemaAnalyzer.emptyED` beside `subtypeED` ...: the existential reduction's first premise alone, its bounds not read." `excludes` now also asks `meetEmptyWithBounds`, which reads the bounds (`OverloadingOracle.scala:327`).
11. (Added by the skeptic.) `explorations/coordinator/PLAN.md:419` (C.skeptic.1 of climb batch 15's rung C): "the checker refuses it as an invalid overloading" and "Default: today's refusal, pinned by `ProjectFortress/compiler_tests/XXXOverloadTwoBoundsClosedTraitExclusion.test`". The checker accepts the pair, and the test is promoted to `OverloadTwoBoundsClosedTraitExclusion`.

The Appendix I effects of the two entries edited were corrected in place (section 7).

## 9. Points to report

1. **A1's patches**: taken in substance, applied with `git apply` on the base; their probe markers and debug output removed, two helpers made private, the comment on (i) rewritten, and the speed pass added (decision 1). `OverloadingChecker.scala` gains three declarations beside the memo (`:552-573`), outside the three methods the brief names, as A1's patch has them.
2. **Compiled tests before and after**: section 2's table (four red to green, one green, four `XXX` green); A1's 35 files in scope and `XXX10k`, `AfterTypeChecking`, 150 tests, output unchanged (section 6). **One verdict changed**: `XXXOverloadTwoBoundsClosedTraitExclusion`, which pinned row 713's contested refusal, now compiles; promoted to `OverloadTwoBoundsClosedTraitExclusion` (compile, link, run PASS), with walk's refusal pinned by `tests/OverloadTwoBoundsClosedTraitExclusionWalk`. Row 713 is `CONTESTED`, its default the refusal (`explorations/coordinator/PLAN.md:419`, "C.skeptic.1"); the change follows P-157's bounds reading (decision 3, the first question for the curator).
3. **The full-check table**: 191 to 183, the 8 gone and none come; the fancy rule's three errors and the caught crash as in section 4. The stock tables: count 3 and distance 5, identical. The count stage under the full check: 98.
4. **The count stage's seconds**: base 95 s, change 108 s, pass 85 s, the results the same; no stall (section 5).
5. **The new row and the notes**: NEW-X-1; row 584's note (no room in the row: record.md); row 786's new line; also row 713's new line.
6. **Sentences made false**: section 8; the sentences edited: section 7.
7. **Ladder and microGPT**: no file's phase or first error changes by this rung (section 6).
8. **Files beyond those named**: `ProjectFortress/tests/OverloadTwoBoundsClosedTraitExclusionWalk.{fss,test}`, a walk test (no walk code), and the promoted test's rename in `compiler_tests/`. No edit of the library, of walk or of `TypeAnalyzer.scala`.

## 10. Decisions

No POSITIONS entry covers 2 to 9; P-157 covers 1 and 3 in part. I acted on the readings given.

1. **A1's two patches, as they are in substance.** Ways not taken: (i) through a field of `FunctionalMethod` (a file outside the list) or with the self type written into `parameters()` (against P-146's plain signatures, and the judgement's 18 Return Type errors, `explorations/reviews/self-typed-bodies-judgement.md:181-204`); (ii) in every reduction (the brief refuses the global variant); (ii) in the solver's unifier (`Formula.scala`, every inference); the parameter kept beside its bounds (recursion, NEW-X-1). Evidence: A1's measurements (`perf-probes/self-type-exclusion/REPORT.md` sections 3 to 7) and mine (sections 2, 4, 6).
2. **`validOverloadingMemo`'s key left on the plain arrows.** The second arrow is a function of the plain arrow (the same trait, replacer and own parameters), so a key cannot join two pairs whose exclusion arrows differ. Way not taken: the second arrows added to the key.
3. **Row 713's pair accepted, and its pin promoted.** Ways not taken: keep the refusal by not reading a bound through a closed trait's expansion (a rule the specification does not have, which would also cut the `Numb comprises { Rr, Zz }` shape of test 4); stop. Evidence: P-157 has the exclusion test read the bounds; `overloading.tex:582-588` reads each parameter within its bound; the pair is empty at every instance (a value of both would be a `C`, which is no `R`); the checker accepted it before climb batch 15's normal form (F-227). The row stays `CONTESTED` for walk, which refuses it at load. Reversible: the promotion is two renamed files.
4. **Walk's refusal pinned by a walk test** of today's behaviour (home 3), not left as notes only: a gated test can observe it (`load_exception_contains`).
5. **The tests' names by topic** (`Exclusion...`, `XXXExclusion...`), where A1's names were probe names; each `XXX` refusal test with `compile_err_contains`, the form of the folder's refusal tests; `tint`'s with "Invalid overloading of tint in component ...". NegShared and tint are written without the common lines, which they do not use.
6. **The speed pass**: the memo and the early test only. Ways not taken: computing the cheap negation first and stopping on False (no gain: in all three heavy calls neither negation alone is False, only their conjunction); dropping the first negation, implied by the second (changes the disjuncts read); a memo across analyzers (49 of 99 calls repeat an equal pair globally, but analyzers differ in their environment, so an answer is not known to carry). Evidence: section 5.
7. **The full check's comparison by `compare-sites.py`** against the planner's table, line numbers masked, and by hand for the fancy rule and the crash; A1's `sites.py` needs the base's `run.txt`, which is not on disk.
8. **The old code's run of the 150 tests from my tree's files**, so that the same `.fss` files are compared; the three red results are the old run's path pins, not verdicts (section 6).
9. **The ladder subset**: the three files named in section 6, chosen by their first error in the baseline's `ladder.tsv`; the gate's 85 not run.

## 11. Defects and their homes

- **The 8 pairs and tests 1 to 4** (the exclusion test's two gaps): repaired here, home 1, the plain gated tests 1 to 4 and the full-check stage.
- **Row 713's checker half** (the refusal of a valid pair): repaired here, home 1, `OverloadTwoBoundsClosedTraitExclusion`.
- **Row 713's walk half** (walk refuses the pair at load, 'fails the Meet Rule'): home 3, contested (Appendix I lists the question as not settled for the language; P-157 settles the checker's exclusion test only): the walk test `OverloadTwoBoundsClosedTraitExclusionWalk` asserts today's refusal, and the row's new line.
- **Row 786's tint**: unchanged, home 3 (contested): `XXXExclusionExcludingBoundsBox` holds the checker's refusal beside the walk test the row names; the row's new line.
- **The solver's recursion** on an inference variable beside its F-bound: home 3, NEW-X-1, `NEGATIVE-BOUNDED`, reproducer A1's report; no program of the plain checker is known to reach it, and no gated test can hold a `StackOverflowError` of a shadow.
- (Added by the skeptic.) **Walk's half of the vector pairs**: walk refuses at load a program's generic operators between an array of a number type and a number, on either side, beside a self-typed additive group's own operator, 'with generic type, at least one pair of parameters must have excluding types', which the checker now accepts and runs (P-157): home 2, the gated `ProjectFortress/tests/XXXExclusionVectorScalarWalk.fss` and NEW-X-2 (record.md); measured by the skeptic (SKEPTIC.md, section 4).

## 12. For FACTS

- **The fact.** The compiled checker's overloading exclusion test reads the `self` of a functional method of a trait whose self type comes from its F-bound as `C[\X\] & X`, and each static parameter at the top of the two domains' meet as its declared bounds; specificity, the Meet Rule, the coverage rule, the fancy rule and the Return Type Rule keep the plain signatures, and no other rule reads the test.
- **What it means for the work.** `Vector` and `Matrix` stay additive groups beside the scalar block under the full check (P-157); the full check's distance falls from 191 to 183 with no library line, and the count stage under it from 102 to 98. `tint` stays refused (row 786); row 713's pair is accepted and runs, and walk refuses it at load.
- **The number.** 8: the full-check distance stage's `L1` class, gone.
- **The tests.** `compiler_tests/Exclusion*`, `XXXExclusion*`, `OverloadTwoBoundsClosedTraitExclusion`; `tests/OverloadTwoBoundsClosedTraitExclusionWalk`; the full-check stage, `run-shadow.sh ... catch`, `#total 183`.
- **The detail.** Sections 1, 2 and 4 of this report.

## 13. Commands worked out

- **A cost split under JFR without the text dump**: two single-file Java programs over `jdk.jfr.consumer.RecordingFile`, run with `java File.java <recording>`: one aggregates `jdk.ExecutionSample` by top frame and inclusively, with the share of named methods; the other gives, for the samples whose stack holds a method, the frames at one or more levels below its outermost occurrence, with line numbers. JFR on the count stage: a copy of `checker-count/run.sh` whose `java` line gains `-XX:FlightRecorderOptions:stackdepth=512 -XX:StartFlightRecording=filename=<f>,settings=profile,dumponexit=true`, beside A1's `EXTRA_CP` edit.
- **An instrumented or audited class ahead of the build on the count stage**: A1's `count.sh` edit of `run.sh` (`-cp "${EXTRA_CP:+$EXTRA_CP:}$SCRATCH/classes:$CP"`), with `EXTRA_CP` naming a folder where scalac compiled the instrumented `TypeSchemaAnalyzer.scala` and `shadow.py`'s full-check `OverloadingChecker.scala` together.
- **The old code on compiled tests whose `compile_err_equals` pins a path**: such a test is red when the old code runs my tree's file, since the pin names `FORTRESS_HOME`; compare the printed diagnostics with the paths masked.
