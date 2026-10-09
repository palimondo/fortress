# Rung V (climb batch 13): a bound list that names a closed trait (a crash), a tight juxtaposition's expected type (row 660), and fork 2's library half, held

problem: the fork 2 judgement's measurement of the array family's two-trait bound on a library copy, three `#crash` stage rows 'class com.sun.fortress.nodes.UnionType cannot be cast to class com.sun.fortress.nodes.BaseType' and the 23 arithmetic and block sites (`explorations/reviews/array-fork2-judgement.md:116-142`; `explorations/compile-ladder/gate/distance-sites.tsv`), and row 660 with its expected failure `XXXInferTightJuxtContext` (`explorations/fortress-gap-ledger.md:189`)
spec: a type parameter's `extends` clause (`Specification/basic/trait-parameters.tex:44-50`), and a set of overloaded declarations with static parameters checked by three rules over the instances that their bounds allow (`Specification/advanced/overloading.tex:531-559`); the expected type of a call written by tight juxtaposition or as an operator application (`Specification/basic/inference.tex:149-151`)
precedent: the loose juxtaposition and the repeated operator in the same file. Each tries the multifix application without the expected type and keeps the expected type's check where that check succeeds. Each gives the expected type to the left-associated fallback (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala:176-197`, `:390-403`). A bound list is kept element by element, each a `BaseType`, in the team's overloading and abstract-method checkers (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:212`, `AbstractMethodChecker.scala:143`). For the held library half: `MaxSumReductionPair`'s two-trait bound (`Library/FortressLibrary.fss:3262`).
deviation: `boundsSubstitution` no longer meets a bound list into one type. It keeps the list without `Any` and duplicates, where the team's code kept the conjuncts of the meet. It checks a variable against each bound in turn and takes a bound that the variable was itself given as proved (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:471-495`)
deviation: the tight juxtaposition's left-associated fallback still checks each inner binary application on its own, as the team's code did, and gives the expected type to the outermost one only. The loose juxtaposition builds the whole fold and checks it once (`impls/Operators.scala:376-385` against `:185-196`)
deviation: fork 2's library half was built (d3d31b5b2) and then taken back (816251130): the family's bound, the scalar block's bounds and `matrix(v)`'s `v.zero`. With it, the checker-count stage does not finish within its 900 s limit (section 7). The library files are the base's.
historical: ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala, Specification/appendices/changes.tex

## 1. What changed, and why

- **The crash (NEW-V-1).** `TypeSchemaAnalyzer.boundsSubstitution` (David Chase, 2012, "TODO: FIX THIS FOR OPS") built each image variable's bound list from `conjuncts(imageTa.meet(e))` and cast every conjunct to `BaseType` (`TypeSchemaAnalyzer.scala:474-477` at a1a75716a). Take a bound list in which one bound is a trait with a `comprises` clause and another bound excludes one of its listed types. The analyzer's meet of that list is a union of intersections. So the cast threw whenever the overloading checker compared two overloads that carry such a list (`reduceED` `:421`, `normalizeED` `:216`, `subtypeEDInner` `:171`).
  - The bounds are now kept as the list they are, each already a `BaseType`, without `Any` and duplicates (`:471-480`).
  - The final check asks, bound by bound, that each variable's image is below each of its bounds' images. It asks no proof for a bound that the image variable was itself given (`:482-495`).
  - The revival's earlier change in this method, which keeps the size parameters as they are (3f297441c), stays.
- **Row 660.** The `SMathPrimary` case gives its expected type to a tight juxtaposition of items none of which is a function (`impls/Operators.scala:362-386`).
  - The multifix application is tried without the expected type. Where it applies, it is checked again with the expected type, and that check is kept if it succeeds.
  - Otherwise the binary applications are left-associated. The inner ones are checked as before, and the outermost with the expected type.
  - This is the loose juxtaposition's form since climb batch 11's rung E, and the repeated operator's since batch 12's rung C.
- **Fork 2's library half, built and held (Q13.2).** It was built as the judgement's default (d3d31b5b2): `T extends { Number, MultiplicativeRing[\T\] }` on 29 lines of `Library/FortressLibrary.fss` and 32 of `.fsi`, a bound per operator on the scalar block (8 and 8 lines), and `v.zero` off the diagonal in `matrix(v)`. It was measured, then taken back (816251130).
  - With the crash gone, the api's overloading check runs. Over the two-trait bound it takes about 17 minutes of a full core, where the base takes seconds, and the checker-count stage stops at 900 s (section 7).
  - The cause is in `TypeAnalyzer.scala`, rung N's file this batch. Every subtype query on a variable with that bound list expands `Number`'s `comprises` clause (NEW-V-5).
  - So the 23 sites and row 437 stay. The curator's question is in section 10.
- **The specification.** Appendix I's entry "The contexts that give a call an expected type" now says that the checker gives the tight juxtaposition its expected type, with the date and row 660 (`Specification/appendices/changes.tex:2077-2088`).

## 2. The tests first: the failing runs and the passing runs

All failing runs ran on the base's code. The tree held the base's seeded build until the first scratch compile of the edit, after 16:50 UTC. The library sources were the base's until about 16:51 UTC.

- `OverloadTwoBoundsClosedTrait` (compile, link, run). It was first written as `XXXOverloadTwoBoundsClosedTrait` with `compile_exception_contains=UnionType cannot be cast`.
  - It was green on the base.
  - It was red on a deliberate fix: the object `C` removed, so that no listed type of `K` is outside `R`. Then it was restored.
  - It was promoted before the edit.
  - The brief's shape, `K comprises { A, B }` with both objects below `R`, does not crash. The analyzer expands a closed trait only where another bound excludes one of its listed types, so the test adds `object C extends K`.

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base2 ProjectFortress/compiler_tests XXXOverloadTwoBoundsClosedTrait.test XXXCoerceTwoBoundsClosedTrait.test
      # junit.sh base2 2026-10-09T16:48:51Z; ... tree a1a75716a with the next rung applied, not yet committed
       Saw failure, but did not satisfy compile_exception_contains; expected
      1) ProjectFortress/compiler_tests/XXXOverloadTwoBoundsClosedTrait(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
      Tests run: 2,  Failures: 1,  Errors: 0

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base3 ProjectFortress/compiler_tests OverloadTwoBoundsClosedTrait.test
      # junit.sh base3 (2026-10-09T16:49:41Z)
       UNEXPECTED exception
      java.lang.ClassCastException: class com.sun.fortress.nodes.UnionType cannot be cast to class com.sun.fortress.nodes.BaseType (...)
      Tests run: 3,  Failures: 3,  Errors: 0

- `InferTightJuxtContext` (compile, link, run). It was promoted from `XXXInferTightJuxtContext` by `git mv`, with `a(a)(a)` asserted beside `a(a)`:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests XXXOverloadTwoBoundsClosedTrait.test XXXInferCallerTwoBoundsClosedTrait.test XXXCoerceTwoBoundsClosedTrait.test InferTightJuxtContext.test
      # junit.sh base 2026-10-09T16:48:33Z
      ProjectFortress/compiler_tests/InferTightJuxtContext.fss:13:23-25:
          Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].
      ProjectFortress/compiler_tests/InferTightJuxtContext.fss:15:25-30:
          Right-hand side has type BoxV[\Object\], but declared type is BoxV[\String\].

- `XXXInferCallerTwoBoundsClosedTrait` (the brief's second test, with a container argument like the norm's) and `XXXCoerceTwoBoundsClosedTrait` (a third, which the probes found).
  - Both are green on the base ('Saw expected failure' in runs `base` and `base2` above).
  - Both are still green after the fix, so their causes are elsewhere. Each keeps a row (section 9).
  - `XXXInferCallerTwoBoundsClosedTrait` was shown red on a deliberate fix: `h[\T\](x)` written, `junit.sh redcheck` at 18:44:04Z, 'Saw wrong failure. compile'. Then it was restored.
- `ArrayElementAlgebra` (walk). As written for the library half, it asserted these values: an integer vector's `dot`, `scale` and sum; a float vector's `dot` and `scale`; an integer matrix product; the block's `MIN`, `MAX`, `+` and `-` with `ZZ32` and `RR64` arrays; and `matrix(v)` for `RR64`, `NN32` and `NN64`. Its failing run, before any library edit:

      explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-array-bound/h1 ProjectFortress/tests/ArrayElementAlgebra.fss
      # harness-one 2026-10-09T16:49:24Z
      Unification error: Closure/Constructor for init0 param 2 (v:NN32) got arg 0: ZZ32 of type Int
      .../tests/ArrayElementAlgebra.fss:53:10-33:
      Tests run: 1,  Failures: 1,  Errors: 0

  - An `RR32` assertion was added after the library edit. It was seen failing on the old code at 16:55:23Z, 'Unification error: Closure/Constructor for init0 param 2 (v:RR32) got arg 0: ZZ32 of type Int' at `:52`: `FORTRESS_HOME=/home/user/fortress-base13 /home/user/fortress-base13/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-array-bound/old-harness $PWD/ProjectFortress/tests/ArrayElementAlgebra.fss`.
  - With the library half, the test passed (16:53:26Z, `OK (11 tests)` with the array tests below).
  - With the half held, its `matrix(v)` assertions for `RR32`, `NN32` and `NN64` are taken out. It is now a test that comes with no fix. It pins what an integer and a float element type must keep under the held bound.

The passing runs, on the final code (816251130):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests OverloadTwoBoundsClosedTrait.test InferTightJuxtContext.test XXXInferCallerTwoBoundsClosedTrait.test XXXCoerceTwoBoundsClosedTrait.test InferLooseJuxtContext.test InferRepeatedOperatorContext.test XXXInferContextDrops.test XXXLooseJuxtMultifixExpectedType.test
    # junit.sh final 2026-10-09T18:08:02Z
    OK (16 tests)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-array-bound/h3 ProjectFortress/tests/{ArrayElementAlgebra,vectorOps,matrixOps,ArrayScalarExtension,ArrayOperatorsBesideLibrary,FlatTowerRungF,TabulateRungA,sparseMatrix,RationalTest,IntegerOrderNumerals,GenericBesidePlainTwoBounds}.fss
    # harness-one 2026-10-09T18:05:38Z; the library files the base's
    OK (11 tests)

## 3. Whole suites

- `ant testQuick` on the final code (816251130), after its last edit:
  - compiler: 'Tests run: 1093, Failures: 0, Errors: 0'
  - library: 'Tests run: 86, Failures: 0'
  - othercompiler: 'Tests run: 263, Failures: 0'
  - 'BUILD SUCCESSFUL', 'Total time: 11 minutes 38 seconds'.

  Against batch 12's gate (`explorations/compile-ladder/climb-batch-12/gate/summary.txt`: 1086, 86, 263), the compiler track gained 7: `OverloadTwoBoundsClosedTrait` 3, `InferTightJuxtContext` 3 for `XXXInferTightJuxtContext`'s 1, `XXXInferCallerTwoBoundsClosedTrait` 1, `XXXCoerceTwoBoundsClosedTrait` 1. In this run `XXXInferContextDrops` and `XXXLooseJuxtMultifixExpectedType` say 'Saw expected failure', and `InferLooseJuxtContext` and `InferRepeatedOperatorContext` pass.
- An earlier `ant testQuick`, on d3d31b5b2 (way (a) of section 4 and the library half), had the same counts, all green, in 10 minutes 10 seconds.
- `ant testSystem` on d3d31b5b2 (the library half) was 'BUILD SUCCESSFUL', 136 + 137 + 140 + 142 = 555 tests, no failures: batch 12's 554 and `ArrayElementAlgebra`.
- The final code differs from the base only in the checker's Scala, the tests and the specification. No walk or library code changed, so no `ant testSystem` was run on it. The walk tests above were run instead.

## 4. Where the fix belongs, and the precedent search

- **The crash.** Its site is the cast (`TypeSchemaAnalyzer.scala:474-477` at the base).
  - The map's section B.7 sends the compiled path's overloading check through the type checker's oracle (`explorations/coordinator/map/modules-and-phases.md:365-375`). The stack runs `OverloadingChecker.checkOverloading` (`OverloadingChecker.scala:440-441`), then `OverloadingOracle.equiv` (`OverloadingOracle.scala:74`), then `TypeSchemaAnalyzer.subtypeED` (`:157`).
  - The checker's Scala holds eight casts to `BaseType`. Only this one cast the conjuncts of a meet. The other cast in its file (`:465`) casts bound images, each a `BaseType` by construction.
  - No row, FACTS entry or earlier rung repaired this method. The judgement read the fix (`array-fork2-judgement.md:162`).
- **Row 660.** Its site is the `SMathPrimary` case (the feature table's row for juxtaposition, `explorations/coordinator/map/spec-to-implementation.md:277`). `Operators.scala` tries a multifix application in three places:
  - the loose juxtaposition (`:182-184`), given the expected type by rung E;
  - the repeated operator (`:400-403`), given it by rung C;
  - this one (`:370-372`), the last.
- **The ways for the bound list:**
  - (a) keep the team's meet, and fall back to the list where a conjunct is not a `BaseType` (built first, d3d31b5b2);
  - (b) never meet the list, and check it bound by bound (the judgement's reading; built);
  - (c) catch the cast and fail the reduction, so that `normalizeED` returns the type unreduced;
  - (d) change how the analyzer normalizes a closed trait in a meet (`TypeAnalyzer.scala:648-656`, rung N's file).

  (b) was taken (section 10).

## 5. What the specification settles, and the text changed

- **The crash.** A type parameter may have an `extends` clause (`trait-parameters.tex:44-50`). A set of overloaded declarations with static parameters is checked by the No Duplicates, Meet and Return Type rules, over the instances that its bounds allow (`overloading.tex:531-559`). So the checker must decide such a pair, not crash on it, and NEW-V-1 is a gap repaired.
- **Row 660.** A call written by tight juxtaposition or as an operator application has the expected type (`inference.tex:149-151`). A tight juxtaposition of items none of which is a function is the application of the juxtaposition operator (`Specification/basic/operators/juxtameaning.tex:145-175`). So row 660 is a gap repaired.
- **Fork 2.** The specification's elements of vectors and matrices are numbers (`Specification/basic/expressions/aggregate.tex:152-170`; `Specification/preliminaries/overview.tex:917`). The library's bounds are the library's. With the half held, nothing there changes.
- **The text changed.** Appendix I's entry "The contexts that give a call an expected type", its Effect, in the S1 form of the entry's earlier amendments (`changes.tex:2077-2088`). The sentence that the checker 'still gives none to the juxtaposition operator application that a tight juxtaposition ... stands for (row 660)' now states what the checker does. It ends 'Until 9 October 2026 it gave none there (row 660)' and names this report.
  - The chapter's own sentence already gave the tight juxtaposition the expected type, so no callout changes, and the front matter's paragraph stays true.
  - The specification build (`./ant genSource && ./ant tex`) ended 'BUILD SUCCESSFUL' twice. It wrote the PDF, and its log holds no LaTeX warning of an undefined reference, a multiply defined label or an undefined control sequence.

## 6. Programs run old against new

- **`matrix(v)` under walk,** for nine element types and values. A probe printed `v.asString || " : " || v.ilkName` of the off-diagonal entry. It ran on the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base13 $PWD/tmp/old-caches ProbeWalkArraysOld.fss`) and on the library half (d3d31b5b2):

  | element type | off-diagonal, base | off-diagonal, library half |
  |---|---|---|
  | `RR64`, `matrix(2.0)` | `0.0 : Float` | `0.0 : FloatLiteral` |
  | `RR64`, `matrix(r2 + r2)` | `0.0 : Float` | `0.0 : FloatLiteral` |
  | `ZZ64` | `0 : Long` | `0 : Long` |
  | `QQ` | `0 : Ratio` | `0 : Ratio` |
  | `ZZ32` | `0 : Int` | `0 : Int` |
  | `ZZ` | `0 : BigNum` | `0 : BigNum` |
  | `RR32` | refused: 'Unification error ... (v:RR32) got arg 0: ZZ32 of type Int' | `0.0 : RR32` |
  | `NN32` | refused (row 437) | `0 : NN32` |
  | `NN64` | refused (row 437) | `0 : UnsignedLong` |

  The half is held, so none of these lands. They are what it changes when it does. `RR32` is refused on the base too, which row 437 does not name.
- **The eight programs of the ladder subset (section 8),** compiled on the old code and on the new: every error message is the same in each file.

## 7. The checker count and the distance

- **Final code (816251130), the count.**
  - `explorations/coordinator/tools/checker-count/run.sh tmp/rung-array-bound/checker-count-postedit.txt tmp/rung-array-bound/cc-post` (18:11:47 to 18:14:56 UTC, under other agents' suites).
  - The table equals `explorations/compile-ladder/climb-batch-12/gate/checker-count.txt` byte for byte: 'FortressLibrary 2', '#total 1', '#crash none'.
- **Final code, the distance.**
  - `explorations/coordinator/tools/distance/run.sh tmp/rung-array-bound/distance-postedit.txt tmp/rung-array-bound/dist-post`.
  - '#total 153', '#seconds 1177 FortressLibrary 666' (against 739 s at batch 12's gate), '#machine nproc=4; Intel(R) Xeon(R) Processor @ 2.10GHz; load at start 1.44 4.30 6.00; openjdk 25.0.4.1; FORTRESS_THREADS=1'.
  - Another agent's distance stage started during the run.
  - The three `#crash decl` rows are the landed ones (`:1304`, `:2500`, `:2899`). No `#crash` stage row came.
  - `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt tmp/rung-array-bound/distance-postedit.txt` prints 'DISTANCE SAME   153'.
  - By row, `tmp/rung-array-bound/dist-post/errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`, keyed by location and message (row 577): 0 gone, 0 come. Keyed by location and the whole message: 0 and 0 as well. No site moved. In particular `:2399` did not come, and the factory sites `:2454` and `:2831` are unchanged.
- **The held library half (d3d31b5b2's library files on the final checker).** The count stage's own checker command was run without its 900 s limit. Its commands are `checker-count/run.sh:61-71`, with `timeout -k 10 3600` in place of `900`.
  - First run, 17:47:05 to 18:05:06 UTC: `checkApi FortressLibrary` from 17:47:1x to between 18:03:39 and 18:04:09. The load was 5 to 13, from other agents' suites.
  - Second run, with the library half reapplied for it and then taken back, 18:45:06 to 19:03:11 UTC: `checkApi FortressLibrary` from 18:45:1x to 19:02:2x. The JVM held a full core: 'ELAPSED 17:15 TIME 00:17:29'.
  - Both runs ended with '@@PROBE checkApi FortressLibrary -> errors=2' and 'File FortressLibrary.fss has 1 error.' (the `isLeftZero` Meet Rule error), so the count is unchanged at 1. Both took about 17 minutes against the stage's 900 s.
  - An earlier run with way (a), through the stage itself (`checker-count/run.sh`), started at 17:10:46. It was still in `checkApi FortressLibrary` when I stopped it at about 17:24.
  - Thread dumps of the slow runs (`jstack` on the `java` process) put the time in `TypeAnalyzer.pSubInner`, at the case of a variable on the right, where `pNorm` normalizes the intersection of its bounds (`TypeAnalyzer.scala:224`). From there they run through `normConjunct` (`:648-649`), which expands `Number`'s `comprises` clause because `IntLiteral` excludes `MultiplicativeRing[\T\]`, into `dExc` and `pExc` (`:402-472`), recursively through the `comprises` trees.
  - The callers were `TypeSchemaAnalyzer.reduceED` (`:370`), `subEDsolution` (`:194`, `:198`) and, before the shortcut of way (b), `boundsSubstitution`'s own check.
  - No distance stage ran on the half. On 09-29 the same bound took the stage's FortressLibrary to 3,825 s against 704 s (`explorations/reviews/array-design-ways.md:324`).
- No table is committed: the gate's tables on the merged tree are the record.

## 8. The ladder subset

- The subset holds the eight files whose recorded first error in the baseline names juxtaposition or a declared type's mismatch: `tests/` `ImplicitBlocks`, `InferTest`, `genericTest3`, `rangeOperators`, `ho`, `objectTest8`, `simpleExp` and `XXXTypeError`.
- It ran after the edit only, twice (on d3d31b5b2, and on the final code), with the drivers copied under `tmp/rung-array-bound/ladder*/` (`gate.md`, "The ladder regression").
- Every file stays at `typecheck` with the baseline's first error (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`), except `simpleExp`. Its first error is now 'Ambiguous coercion in call to operator ^ ...' where the baseline has 'Right-hand side has type ZZ32, but declared type is RR64.' The old code gives the same 'Ambiguous coercion' error, so an earlier batch moved it, not this rung.
- None of the eight is in the landed `ladder.tsv`'s pass list. No ladder file moved by this change.

## 9. Defects, each with its home

- **NEW-V-1**, the crash in `boundsSubstitution`: home 1, repaired; `OverloadTwoBoundsClosedTrait`.
- **Row 660**, the tight juxtaposition: home 1, repaired; `InferTightJuxtContext`.
- **NEW-V-3**, a refused call, 'not applicable to an argument of type Box[\T\]'. The call's argument carries the caller's own two-bound type parameter: the form of the norm's call at `Library/FortressLibrary.fss:2483` on the judgement's library copy.
  - Home 2, `XXXInferCallerTwoBoundsClosedTrait`. The specification settles that the call is applicable: some instance within the bounds applies (`inference.tex:56-58`). The program runs once the static argument is written.
  - Its cause is not `boundsSubstitution`: the refusal stands after the fix, at `Functionals.scala:721`.
- **NEW-V-4**, a crash in `Formula.slv` (`Formula.scala:593`), 'Applied a substitution to an And and got an Or', on a call that converts a numeral beside such a parameter. Home 2, `XXXCoerceTwoBoundsClosedTrait`, for the same reason. `Formula.scala` is rung N's file.
- **NEW-V-5**, the analyzer's cost on a variable bounded by `{ Number, MultiplicativeRing[\T\] }`: home 3, a row only, since no gated test can wait 17 minutes. Its notes give the command and the times. `TypeAnalyzer.scala` is rung N's file.
- **NEW-V-2**, the two factory sites (`Library/FortressLibrary.fss:2454`, `:2831`): home 3, a row, as the brief gives it. Its reproducer is the distance stage's per-site list. `TypeWellFormedChecker.scala` is rung N's file. Not traced further.
- **Row 437**, `matrix(v)`: stays open with the library half. A note adds that `RR32` is refused too.

## 10. Decisions, and the questions left

1. **The tests' closed trait gains a third object.**
   - Chosen: `K comprises { A, B, C }`, with `object C extends K` outside `R`.
   - Not taken: the brief's `K comprises { A, B }`, which compiles clean on the base, so it tests nothing.
   - Evidence: `normConjunct` expands a closed conjunct only where another conjunct excludes one of its listed types (`TypeAnalyzer.scala:648-656`).
2. **The crash test's calls pass a typed `ZZ32`.**
   - Chosen: `f(A, z)` with `z: ZZ32`.
   - Not taken: `f(A, 1)`, which crashes earlier, in `Formula.slv`, on the base and after the fix (NEW-V-4, which has its own test); `f[\A\](A, 1)`, which hides the inference.
   - Evidence: the probes `ProbeCallB` (checks) and `ProbeCallC` (crashes) on the base.
3. **`boundsSubstitution` never meets the list (way (b)).**
   - Not taken: (a) the meet with a fallback. It was built first and was green in `ant testQuick`, but it forms two meets of a closed trait per reduction, and the slow run's thread dumps showed its meet check among the hot frames.
   - Not taken: (c) failing the reduction, which leaves the overloading check with unreduced domains and hides the crash instead of deciding the pair.
   - Not taken: (d) the analyzer's normalization, in rung N's file.
   - The bound-by-bound check, and the shortcut for a bound that the variable was given, are sound by the type parameter's own declaration.
   - Its cost: a bound list is no longer simplified (a bound above another stays). No compiled test's verdict shows it (section 3).
4. **The tight juxtaposition's fallback checks the inner applications as before.**
   - Not taken: building the whole fold and checking it once with the expected type, as the loose juxtaposition does. The team's per-step loop is kept, and only its last step changes.
   - Evidence: `InferTightJuxtContext`'s `a(a)(a)`.
5. **Fork 2's library half is held.** This is a deviation from the brief, which builds it at the default.
   - Chosen: the library files stay the base's. The built half stays in the branch's history (d3d31b5b2). The 23 sites, the `:2399` site and row 437 stay.
   - Not taken: (i) landing it. That takes the checker-count stage past its 900 s limit, so the batch's gate and every later one would have no count. It would also take the distance stage's FortressLibrary to about 3,800 s, by the 09-29 measurement, near the stage's 5,400 s limit (`explorations/coordinator/tools/distance/run.sh:119`).
   - Not taken: (ii) landing only the scalar block's bounds or only `matrix(v)`. The block's bounds are two-trait bounds with `Number` on `+`, `-`, `MIN` and `MAX`, whose overload sets are larger than the family's, so the same expansion would follow. `v.zero` under `T extends Number` names a getter that `Number` does not declare.
   - Evidence: section 7.
   - It can be undone by reapplying d3d31b5b2's library diff once NEW-V-5 is repaired.
6. **`ArrayElementAlgebra` keeps only what the base runs.**
   - Not taken: an `XXX` walk test for row 437. The row's specification citation is silent and walk stops on the program, so its home is the row only (`tests-writing.md`, "How a defect is recorded", item 3).

Questions for the curator (decisions not taken):

- **Q-V1. Fork 2's library half waits on the analyzer.**
  - The question: land the family's two-trait bound now and accept a count stage that cannot finish; or first wait for a checker rung that repairs NEW-V-5 in `TypeAnalyzer.scala`, so that a subtype query on a variable does not expand its bounds' `comprises` clauses again at every query; or choose another bound.
  - The sources: the judgement of 2026-10-08 (`array-fork2-judgement.md` section 4), which read that the crash fix would remove the 09-29 cost; this rung's measurement of 2026-10-09 (section 7), which shows that the cost is the analyzer's, not `boundsSubstitution`'s; and the 09-29 measurement (`array-design-ways.md:324`).
  - The solutions: (1) a checker rung on `TypeAnalyzer.scala`'s normalization first, then d3d31b5b2's library diff unchanged; (2) land the diff now, raise the count stage's limit, and accept a gate about an hour longer; (3) a bound without `Number`, which walk's load check refused on 09-29 (`array-design-ways.md` section 7).
  - (1) keeps the current behaviour until then.
- **Q-V2. The crash test's shape.** The brief's shape, `K comprises { A, B }` with both objects below `R`, does not reproduce the crash. The rung added `object C` outside `R` (`ProjectFortress/compiler_tests/OverloadTwoBoundsClosedTrait.fss:6-9`). Confirm that the shape stands for the record.

## 11. Points to report

- **The norm's call at `FortressLibrary.fss:2483` still refused after the fix, with its trace.** Reached in its test form, `XXXInferCallerTwoBoundsClosedTrait`.
  - After the fix, `bin/fortress compile -debug stacktrace XXXInferCallerTwoBoundsClosedTrait.fss` prints 'Could not check call to function h - [\T extends K R[\T\]\]Box[\T\]->T is not applicable to an argument of type Box[\T\].'
  - The trace: at `ApplicationErrorFactory.makeApplicationError(ApplicationError.scala:89)`, `Functionals.typedApplication(Functionals.scala:721)`, `Functionals.typedApplicationOfArg(Functionals.scala:584)`, `Functionals.checkExprFunctionals(Functionals.scala:1051)`.
  - The library line itself is not a site while the half is held. Row NEW-V-3.
- **The stage's FortressLibrary time against 739 s.**
  - Final code: 666 s (section 7).
  - With the held half: the count stage's checker alone spends about 17 minutes in `checkApi FortressLibrary`.
- **A value that walk prints changes, `matrix(v)` for `NN32` and `NN64` among them.** Measured on the held half only (section 6). Nothing of it lands.
- **Fork 2's library half built and taken back** (d3d31b5b2, 816251130): the brief's 23 sites, `:2399` and row 437 are unchanged. A point of the same kind as the brief's list, since it departs from the rung's planned scope. It is reversible.
- **Not reached:**
  - No compiled test's verdict changed other than by the rung's intent (section 3), and no ladder file moved (section 8).
  - No `#crash` stage row came, and no site came (section 7).
  - No operator application or call chooses another declaration: the per-site list is identical, and `ant testQuick` is green.
  - No array declaration was edited beyond the family's bound lines, `matrix(v)` and the block, and those edits are taken back.
  - No checker file of rung N's was edited, and no walk file.

## 12. Sentences of the specification that this change makes false

- `Specification/appendices/changes.tex:2077-2081` at the base, the Effect of "The contexts that give a call an expected type": 'It still gives none to the \KWD{juxtaposition} operator application that a tight juxtaposition of items none of which is a function stands for ... (row~660).' It is amended here (`changes.tex:2077-2088`).
- No other. `grep -rn 'row~660\|tight juxtaposition' Specification/` finds only that entry, the chapter's sentence that this change makes true (`inference.tex:149-151`), the entry's quotation of it (`changes.tex:2104`), another entry's sentence on the chapter's rule (`changes.tex:1627`) and the juxtaposition chapter.
- No sentence names `boundsSubstitution`, a bound list's crash or the arrays' bound.
- One FACTS sentence is made false, and record.md rewrites it: "The compiled checker gives a call its expected type ...", on the tight juxtaposition. The FACTS entry "Route A's generic container obligations still need body-level checks" omits `RR32` from row 437's types.

## 13. Commands worked out

- **The count stage's checker without its 900 s limit, to time it.** The two commands of `explorations/coordinator/tools/checker-count/run.sh:61-71`, with `timeout -k 10 3600` in place of `900`, into `tmp/rung-array-bound/cc-long*/`. A shell loop beside it wrote the time, `/proc/loadavg` and the last `@@PROBE` line every 30 s.
- **A thread dump of a stage's checker.** Run `jstack <pid>` on the `java` process itself, never on the `timeout` process that wraps it: `timeout` passes the signal on, then kills the run after its `-k` grace. Two trial runs were lost that way.

## 14. Revival change

None (record.md, "Revival change").