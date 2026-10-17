# Climb batch 17, rung L: the team's generic `distribute` live, the fusion pairs' method conditions, the identities' cast and `embiggen` typed

- problem: the distance stage's sites of rows 433, 436 and 631 (`explorations/compile-ladder/gate/distance-sites.tsv:5-6`, `:10`, `:40-41` and `:47-50`, the per-site list's rows at `FortressLibrary.fss:3233`, `:3421` to `:3424`, `:3367`, `:3384` and `:3715` this rung clears) and row 677's reproducer, `ProjectFortress/compiler_tests/XXXWhereBoundChecker.test:3` at 3aea3da53
- spec: `Specification/basic/trait-parameters.tex:333`, "Where Clauses": "Static parameters may have constraints placed on them in a \KWD{where} clause", a trait constraint being "the identifier of a naked type variable, followed by \KWD{extends}" and its bounds (`:350`)
- precedent: the generic-distribute probe's L4 and its checker shadow, the where-clause probe's B.2 (`explorations/perf-probes/generic-distribute/REPORT.md:25-118`); the team's commented generic (`Library/FortressLibrary.fss:3235` at 3aea3da53); the identities' own branches, `cast[\T\](v)` (`Library/FortressLibrary.fss:3367`); for `embiggen`, the team's `BIG MINNUM`, `BigReduction[\RR64,RR64\](MapReduceReduction[\RR64\](...))` (`Library/FortressLibrary.fss:3476-3478`)
- deviation: the generic's result is over its own `K`, not the team's `[\R\]`, by Emoto's comment (`Library/Generator2.fss:172`); `leftDistribute` and `rightDistribute` take the same `K` (`Library/FortressLibrary.fss:3224`, `:3228`), beyond the team's text; `embiggen` answers `BigReduction[\T,T\]` over `MapReduceReduction`, not row 631's `Comprehension[\T,T,T,T\]` over a retyped `MIMapReduceReduction` (`Library/FortressLibrary.fss:3711-3712`); the callers' apis are retyped with their components (`Library/Map.fsi:108`, `Library/IntMap.fsi:87`, `Library/PrefixMap.fsi:114`), beyond the brief's file list
- historical: `Library/FortressLibrary.fsi:2152`, `Library/FortressLibrary.fss:3224`, `Library/IntMap.fsi:87`, `Library/IntMap.fss:738`, `Library/Map.fsi:108`, `Library/Map.fss:197`, `Library/PrefixMap.fsi:114`, `Library/PrefixMap.fss:419`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:44`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:189`

Commits on `wip/rung-library-distribute`: `686ce2583` (the three tests first), `cdd25b95d` (the change: the checker and the library), `a95aabd2c` (the expected failure of NEW-L-2), and this report's commit.

## 1. What changed and why

**The checker, B.2 of the where shadow** (P-151: "a method's `where` condition bounds its static parameters"; row 677).

- `KindEnv.scala:44-59`: the two `extend` methods that take a `where` clause add `KindEnv.constraintBounds(this, declared, where)` to the bindings they declare.
- `KindEnv.scala:108-128`: `constraintBounds`, a new member of `object KindEnv` right after `makeFresh`. For each type variable `X` that a trait constraint `X extends B` names, found among the declaration's bindings or outside them (a method's condition on its trait's parameter), it rebinds `X` with `B` added to its bounds. Inside the declaration, a method of the bound is found on a value of `X`.
- `STypesUtil.scala:189-204`, in `makeArrowFromFunctional`: a constraint on the declaration's own static parameter is folded into that parameter's bound in the declaration's arrow, so a call is checked against it.

The code is the probe's own, byte for byte, except for one doc comment on `constraintBounds`. Neither file changed between the probe's base and 3aea3da53.

**The library** (P-151; item 56's default; rows 433, 436, 631).

- `ActualReduction` (`Library/FortressLibrary.fss:3219-3235`): the live `distribute(r: Any): PossibleReductionPair[\R\] = NoReductionPair[\R\]` and the team's commented generic over `R` are replaced by the generic over its own `K`, `distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\] = NoReductionPair[\K\]` (`:3233-3234`). `leftDistribute` and `rightDistribute` take `[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\]` and still answer `distribute(r)` (`:3224`, `:3228`). The hack's comment line stays (`:3232`). This is L4 of `explorations/perf-probes/generic-distribute/REPORT.md` section 2.
- `SumReduction` (`:3414-3422`): `distribute(r: MaxReduction[\T\]) ... where { T extends StandardMax[\T\] }` and `distribute(r: MinReduction[\T\]) ... where { T extends StandardMin[\T\] }` (`:3418`, `:3420`).
- The identities: `additiveIdentity`'s `else => 0` and `multiplicativeIdentity`'s `else => 1` become `else => cast[\T\](0)` and `else => cast[\T\](1)` (`:3377`, `:3394`), as the where-clause probe's A.2.3 has it.
- `embiggen` (`:3711-3712`, api `Library/FortressLibrary.fsi:2152`): `embiggen[\T\](j:(T,T)->T, z:T) : BigReduction[\T,T\] = BigReduction[\T,T\](MapReduceReduction[\T\](j,z))`.
  - Its callers: `Library/Map.fss:197`, `:201`, `:203`, `:207` and `Library/Map.fsi:108`, `:112`; `Library/IntMap.fss:738`, `:742`, `:744`, `:748` and `Library/IntMap.fsi:87`, `:91`; `Library/PrefixMap.fss:419`, `:423`, `:425`, `:429` and `Library/PrefixMap.fsi:114`, `:118`.
  - Each nullary `BIG UNION` (the api's `BIG CUP` in `IntMap.fsi`) and `BIG UPLUS` is declared `BigReduction[\X,X\]` where it was `Comprehension[\X,X,Any,Any\]`.
  - Each one-argument form's `__bigOperatorSugar[\X,X,Any,Any\]` is written `[\X,X,X,X\]`, as `Set.fss:119` writes its own.
  - `Library/Pairs.fss:75-113` and `ProjectFortress/tests/WordCountSmall.fss:74-82` already declare `BigReduction[\X,X\]` for `embiggen`'s result and are unchanged.

Not built here, as the brief says: checking a method's condition on its trait's parameter at a dotted call (F-244's hole). It is recorded as NEW-L-1.

## 2. The tests: the failing run, then the passing run

Tests (`ProjectFortress/compiler_tests/`):

- `WhereBoundMethodChecker` (`typecheck`): a method's `where` condition on its object's parameter bounds it inside the method, so `x.show()` is found. This is the probe's file, with "trait's" in its comment corrected to "object's".
- `XXXWhereBoundFunctionCall` (`compile`, `compile_err_contains=is not applicable to an argument of type String`): `g("s")` for `g[\U\](u: U): String where { U extends Shows }` is refused.
- `XXXWhereBoundChecker`, row 677's reproducer, rekeyed from the checker's 'No such method U.f.' to the code generator's wall, `compile_exception_contains=Don't know how to compile this kind of FnDecl` (row 701). Its comment now says that the function compiles.
- `XXXWhereVariableBoundCall` (`compile`, `compile_err_contains=is not applicable to an argument of type (O, P)`): NEW-L-2's expected failure, written after the change that measured it (section 11).

The failing run, on the base's code at 13:36:19 UTC, before the edit was first built (the first build began after 13:38):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests WhereBoundMethodChecker.test XXXWhereBoundFunctionCall.test XXXWhereBoundChecker.test
    . typecheck ProjectFortress/compiler_tests/WhereBoundMethodChecker ProjectFortress/compiler_tests/WhereBoundMethodChecker.fss:12:48-54:
        No such method T.show.
    . compile ProjectFortress/compiler_tests/XXXWhereBoundFunctionCall ... No such method U.show. ... Saw failure, but did not satisfy compile_err_contains
    . compile ProjectFortress/compiler_tests/XXXWhereBoundChecker ... No such method U.f. ... Saw failure, but did not satisfy compile_exception_contains
    Tests run: 3,  Failures: 3,  Errors: 0

The first `XXX` test added, `XXXWhereBoundFunctionCall`, shown red on a deliberate fix: for one run its call became `g(S)`, with an object `S` that extends `Shows`; the file was then restored.

    $ ONE_JVM=1 .../junit.sh reddemo ProjectFortress/compiler_tests XXXWhereBoundFunctionCall.test
     Did not satisfy compile_err_contains; expected
    is not applicable to an argument of type String
        Don't know how to compile this kind of FnDecl. node = g[\U extends Object\](u:U):String
    Tests run: 1,  Failures: 1,  Errors: 0

The passing run, the last after the last change of code (`cdd25b95d`, with `a95aabd2c`'s test), at 14:13:14 UTC:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests WhereBoundMethodChecker.test XXXWhereBoundFunctionCall.test XXXWhereBoundChecker.test XXXWhereVariableBoundCall.test
    . typecheck ProjectFortress/compiler_tests/WhereBoundMethodChecker  OK (time = 1607ms)
     Saw expected failure
     OK Saw expected exception
     Saw expected failure
    OK (4 tests)

The library part's test is the distance stage, site by site (section 7). The walk tests that guard it ran after the edit through `harness-one.sh`, 19 files in one JVM at 13:45 UTC:

- They keep their verdicts: `GeneratorDeclarations`, `Generator2Test`, `ExclusionRemainderRungH`, `WordCountSmall`, `XXXEmptyGroupSumRungF`, `MapTest`, `UnwrittenBigOperatorsWalk`, `UnwrittenListMapComprehensionWalk`, `UnwrittenSetBigOperatorsWalk`, the eight `IntMap*` tests and `PairsRunRangesWalk`.
- `LibraryOverloadFamilies` fails at its line 37, as expected (section 8).

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh .../h1 ProjectFortress/tests/GeneratorDeclarations.fss ... ProjectFortress/tests/PairsRunRangesWalk.fss
    . interpret .../XXXEmptyGroupSumRungF
    FortressException: CastError
     OK Saw expected exception
    Tests run: 19,  Failures: 1,  Errors: 0

## 3. Where the fix belongs, and the precedent search

The checker reads a `where` clause in `KindEnv`: the territory map's "where clauses" row says "`staticenv/KindEnv.scala:126` ... type bindings handled in `TypeAnalyzer.extendJ`" (`explorations/coordinator/map/spec-to-implementation.md:237`).

- `TypeAnalyzer.extend` reaches it through `env.extend(params, where)` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:952`, `:955`).
- The overloading checker, the type checker and the thunker reach it through the same call.
- A call is checked against the declaration's arrow, which `makeArrowFromFunctional` builds.

These are the probe's two places, and the brief's.

The library's way, by kind:

- The generic over `K`: the team's own commented line (`Library/FortressLibrary.fss:3235` at 3aea3da53) and Emoto's comment (`Library/Generator2.fss:172`). Every pair in the library fits `K` as its lift type: `MaxSumReductionPair[\T\] extends ReductionPair[\T,Maybe[\T\]\]` (`Library/FortressLibrary.fss:3402-3403`), and `ProdReduction`'s overload answers `PossibleReductionPair[\T\]` (`:3434`).
- The method condition: the team's form `where { T extends B }` on a declaration (`Specification/basic/trait-parameters.tex:350`). `MaxSumReductionPair`'s own bound `{ AdditiveGroup[\T\], StandardMax[\T\] }` (`:3402`) is what the condition supplies.
- The cast: the identities' eight other branches are each `cast[\T\](...)` (`:3365-3376`). No other numeral fallback stands in the two functions: 2 sites, both changed.
- `embiggen`:
  - The library writes a nullary big operator over a monoid as `BigReduction[\T,T\](R)`, answering `BigReduction[\T,T\]`, when its body and unwrap are the identity. `grep -n '^opr BIG [^(]*()' Library/*.fss` finds 20: `SUM`, `PROD`, `BIG AND`, `BIG OR`, `BIG BITXOR`, `BIG LEXICO`, `BIG SQCAP`, `BIG SQCUP`, `BIG MIN`, `BIG MAX`, `BIG MINNUM`, `BIG MAXNUM`, `List`'s and `PureList`'s `BIG CONCAT`, `Set`'s `BIG UNION` and `BIG INTERSECTION`, and `PrefixSet`'s three.
  - The library writes `Comprehension` where the body or the unwrap is not the identity: `BIG ||`, `BIG //`, `BIG MINMAX`, the tuple min-max operators and `BIG RELATION`.
  - The team's `BIG MINNUM` and `BIG MAXNUM` (`:3476-3478`, `:3483-3485`) are exactly `embiggen`'s body over `RR64`: `BigReduction[\RR64,RR64\](MapReduceReduction[\RR64\](fn ..., 0.0/0.0))`.
  - Two team callers already declare that type for `embiggen`'s result (`Library/Pairs.fss:75`, `:106`, `:112`; `ProjectFortress/tests/WordCountSmall.fss:74`, `:81`).
  - The team's note when it added `embiggen`, commit `183015086` (jmaessen, 2008-04-28): "it's impossible for us to provide a definition that actually works today and that will also pass static type checking; when the time comes it will be more expedient and smart to rip out the hacks and use the proper type information instead". `MIMapReduceReduction` is that hack: the `Any`-typed twin of the typed `MapReduceReduction`, which already existed (`Library/FortressLibrary.fss:3688`).

Where a precedent repaired the same defect:

- The identities' numeral fallback stands at 2 sites in its file, and both changed.
- `embiggen` is the one `Comprehension[\T,T,Any,Any\]` result in `FortressLibrary.fss`.
- Its 6 callers in three files are the only big operators in the library declared `Comprehension[\X,X,Any,Any\]`, outside the compiler's files (`grep -rn 'Any,Any\\\]' Library/*.fs?`).

## 4. What the specification settles

- A trait constraint bounds the variable it names inside the declaration (`Specification/basic/trait-parameters.tex:333-353`). So `x.show()` in a method whose condition says `T extends Shows` is well typed, and `MaxReduction[\T\]` is well formed in an overload whose condition says `T extends StandardMax[\T\]`.
- A call to a declaration with a constraint on its own static parameter applies only to arguments that meet it (the same section; `Specification/basic/inference.tex`, "The Static Arguments of a Call"). So `g("s")` is refused.
- The Return Type Rule is read over every instance of a generic declaration (`Specification/advanced/overloading.tex:555-560`, "Declarations with Static Parameters"). So only the generic over `K` passes beside `SumReduction`'s overloads (`explorations/perf-probes/generic-distribute/REPORT.md` section 3).
- The team's note "where clauses ... are not supported yet" (`Specification/basic/functions.tex:15-19`) stays true. The code generator refuses a declaration with a `where` clause (row 701), as `XXXWhereBoundChecker` now shows.
- The specification is silent on the identities' fallback for a non-number `T` (row 436, F-243), and on `embiggen`, a library helper with no entry.

## 5. Old against new

Each program ran under walk on the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base17 <worktree>/tmp/old-caches P.fss`) and on the new (`bin/fortress P.fss`), from a scratch folder. The outputs were compared with the two trees' paths masked.

| Program | Old | New |
|---|---|---|
| `MapUnionProbe`: `BIG UNION` and `BIG UPLUS` of `Map`s, with and without static arguments, empty, declared | `{0\|->0, 1\|->10, 2\|->20}`, `{x\|->1, y\|->1}`, `{0\|->v0, ...}`, `{} size 0`, `{a\|->1, b\|->3}` | the same, byte for byte |
| `IntMapUnionProbe`: `IntMap`'s `BIG UNION`, `BIG UPLUS`, clause form | `{ 1 \|-> a, 2 \|-> b, 3 \|-> c } size 3` twice, `{ 0 \|-> v0, ... }` | the same |
| `PairsProbe`: `runRanges`, `BIG UNIONPLUS`, `BIG UNIONCAT` | `<\|[0,1,2,3]\|>`, `{a\|->3, b\|->3}`, `{a\|-><\|1, 2\|>}` | the same |
| `NestedSumProbe`: `__bigOperator2` of `MAX` over `SUM`s and of `SUM` over `SUM`s over `inits <\|1, 3, 2\|>` | `max of sums 6`, `true`, `true`, `sum of sums 11` | `6`, `true`, `true`, then "Failed to find any matching overload, args = (SumReduction[\ZZ32\])" at `Library/Generator2.fss:73:94-107` (F-248; rung W's fix) |
| `PrefixMapUnionProbe` | refused at load: "Overloading of BIG CUP[...]() ... PrefixSet.fss:425 and BIG CUP[...]() ... PrefixMap.fss:419 fails" | the same, at the new declared type (row 101) |
| `ExplicitDistributeProbe`: `SumReduction[\ZZ32\].distribute[\Maybe[\ZZ32\]\](MaxReduction[\ZZ32\])` | "Don't actually resolve overloading of generic methods yet." | the same (row 744) |
| `XXXEmptyGroupSumRungF` (the suite's test) | a `ProgramError` at `FortressLibrary.fss:1315` (where-clause probe A.2.3) | `FortressException: CastError`; both "OK Saw expected exception" |

On the compiled path, `bin/fortress typecheck` with private caches:

| Program | Old | New |
|---|---|---|
| `WhereBoundDottedCall`: `Holder[\String\]("s").showIt()`, `showIt(): String where { T extends Shows }` | "No such method T.show." | no error, exit 0 (NEW-L-1); the compile then stops in the code generator, "Don't know how to compile this kind of FnDecl. node = showIt():String" |
| `WhereVarBoundCall`: `g(O,P1)`, `g[\U,V\](u:U, v:V): String where [\nat n\]{U extends {X[\n\]}, V extends {Y[\n\]}}`, `O` an `X[\1\]`, `P1` a `Y[\1\]` | "No such method U.f." and "No such method V.f." | "[\U extends Object X[\n\], V extends Object Y[\n\]\](U, V)->String is not applicable to an argument of type (O, P1)" (NEW-L-2); walk prints `OP1` |

No team program's walk value moved: the maps, pairs and identities give the base's answers. The nested reduction is not the one change of walk behaviour (the skeptic's correction; `SKEPTIC.md` section 3 has the programs and their output):

- On this branch alone the generic `distribute` stops every dotted call that writes no static argument, the lone inherited generic's included: `MaxReduction[\ZZ32\].distribute(SumReduction[\ZZ32\])` answered "none" on the base and now stops, 'Unification error ... (r:ActualReduction[\ZZ32,K...\]) got arg SumReduction[\ZZ32\]'. Rung W's part A covers it (walk-generic-static REPORT section 8).
- A program that writes the nullary operators' old static arguments, `__bigOperatorSugar[\Map[\String,ZZ32\],Map[\String,ZZ32\],Any,Any\](BIG UNION[\String,ZZ32\](), g)`, ran on the base and now stops, '... got arg BigReduction[\Map[\String,ZZ32\],Map[\String,ZZ32\]\]'; written `[\X,X,X,X\]`, it stopped on the base and now runs. No program in the tree writes either.
- The identities' fallback ends in `CastError` also in a filtered `SUM` over a user group, which joins the identity: `SUM[\M5\][i <- 1#4, i > 2] M5(i)` ended in 'Unification error ... join param 1 (a:M5) got arg 0: ZZ32'.
- The nullary operator's reduction prints `mapReduceReduction` for `MIMapReduceReduction from embiggen`.

## 6. The checker's time (P-148)

The machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Each run ran once, in one session, while the other rung's agent worked beside them.

| Run | Tree | Load at start | `real` | Table |
|---|---|---|---|---|
| `base` | `/home/user/fortress-base17`, 3aea3da53 | 0.17 0.53 0.37 | 1m10.888s | `#total 39`, `#locations 38` |
| `change` | this tree, `cdd25b95d` | 3.14 5.27 3.28 | 1m22.296s | `#total 32`, `#locations 31` |
| `pass` | this tree, `cdd25b95d` (the pass changed no code) | 0.81 3.14 2.91 | 1m19.717s | `#total 32`, `#locations 31` |

    $ time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N      (N = base, from the base build; N = change, from this tree)
    $ time explorations/coordinator/tools/checker-count/run.sh tmp/rung-library-distribute/checker-count-postedit.txt tmp/rung-library-distribute/cc-post      (pass, the brief's after run)

No slowdown of several times: 71 s, 82 s and 80 s, the base run on the quietest machine.

**The base against the change.** The tables:

    $ diff base.txt change.txt
    14,15c14,15
    < #total	39
    < #locations	38
    ---
    > #total	32
    > #locations	31

The `run.txt` files were compared with each tree's path replaced by `TREE`, and the change's `FortressLibrary.fss` positions from its line 3235 on mapped back by the edit's 3 removed lines. The change's output is the base's with exactly 7 errors gone and the total line changed, nothing else:

- `:3367` and `:3384`: "Function body has type OR(IntLiteral,T), but declared return type is T."
- `:3421` to `:3424`: the four "Ill-formed type: ... does not satisfy the corresponding bound StandardMax[\T\]" (or `StandardMin[\T\]`).
- `:3715`: "Could not check call to function Comprehension ...".
- The total: `File FortressLibrary.fss has 39 errors.` against `32 errors.`

The `:130` error of row 737 is in both outputs, once.

**The profile.** One JFR run of the change's checker over the library, in the count stage's own java line with `-XX:FlightRecorderOptions:stackdepth=2048 -XX:StartFlightRecording=...,settings=profile,dumponexit=true`, read with `jfr print --events jdk.ExecutionSample --stack-depth 2048`: 5,936 samples.

- Stacks holding `KindEnv.constraintBounds`: 0.
- Stacks holding `KindEnv.extend`: 5 (0.08%).
- Stacks holding `STypesUtil$.makeArrowFromFunctional`: 62 (1.04%). Of these, 53 sit under `Functional.getReturnType()` at its line 160, the existing return-type thunk, and 2 at the fold's lines.
- The top leaf frames: `Walker.walkCases7$` 5.26%, `Walker.walkCases2` 3.87%, `scala.runtime.Statics.anyHash` 3.86%, `Walker.walkCases0` 3.84%, `BoxesRunTime.equals2` 3.52%, `Walker.walkCases5` 3.47%, `Walker.walkCases4` 3.18%, `List.prependedAll` 3.17%, `Walker.walkCases3` 3.00%, `ASTGenHelper$.scalaify` 2.98%.

**The second pass.** The profile shows no gain in the two declarations the pass may touch: together they are under 0.2% of the samples. So the pass makes no edit, as `compiler.md`, "The checker's time", step 3 says for a profile that shows none. The pass reuses no answer, so it needs no audit.

**The change against the pass.** The `pass` run is the brief's after run on the final code:

    $ diff tmp/count/change.txt tmp/rung-library-distribute/checker-count-postedit.txt && echo TABLES-SAME
    TABLES-SAME
    $ diff change-norm.txt post-norm.txt && echo RUNTXT-SAME      (both run.txt files, the tree's path replaced by TREE)
    RUNTXT-SAME

`ant testQuick` ran once on this one code state (section 9).

## 7. The count and the distance

**The count**: 39 to 32, as the diff of the tables above shows. Its before is the base run, whose total equals that of climb batch 16's landed `explorations/compile-ladder/climb-batch-16/gate/checker-count.txt`. The count is not declared for this rung.

**The distance**: one run on the final code (`explorations/coordinator/tools/distance/run.sh tmp/rung-library-distribute/distance-postedit.txt tmp/rung-library-distribute/dist-post`, 208 s, `#crash none`, `#shadow every shadow edit matched the tracked sources`), against climb batch 16's landed table:

    $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-16/gate/distance.txt tmp/rung-library-distribute/distance-postedit.txt
    DISTANCE DOWN   49 -> 40 (-9)
        kind return-type              2 -> 0      (-2)
        kind wellformed               4 -> 0      (-4)
        kind typecheck               40 -> 37     (-3)
        class R3                      2 -> 0      (-2)  return type: other declared-type slips
        class F1                      4 -> 0      (-4)  reductions: fusion pairs' bound (row 433)
        class I3                      2 -> 0      (-2)  integers in generic code: a numeral where a type parameter is expected
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        unit component FortressLibrary     43 -> 34     (-9)

Site by site: the run's `errors.tsv` was read against `explorations/compile-ladder/gate/distance-sites.tsv` by kind, location (the edit's line shift mapped back) and message (positions masked), by row and not by class. 9 sites are gone and none is new.

| Site (base lines) | Kind | Row |
|---|---|---|
| `FortressLibrary.fss:3233,:3421`, "For distribute, the return type of (SumReduction[\T\], MaxReduction[\T\])->... should be a subtype of the return type of (ActualReduction[\T,T\], Any)->PossibleReductionPair[\T\]" | return-type | 433 |
| `FortressLibrary.fss:3233,:3423`, the same for `MinReduction` | return-type | 433 |
| `:3421` `MaxReduction[\T\]`, `:3422` `MaxSumReductionPair[\T\]`, `:3423` `MinReduction[\T\]`, `:3424` `MinSumReductionPair[\T\]`, "Ill-formed type ... does not satisfy the corresponding bound" | wellformed | 433 |
| `:3367`, `:3384`, "Function body has type OR(IntLiteral,T), but declared return type is T." | typecheck (I3) | 436 |
| `:3715`, "Could not check call to function Comprehension - [\T, T, Any, Any\](Any->T, ActualReduction[\Any,Any\], T->Any)->... is not applicable to any type of the form (_->_, MIMapReduceReduction[\T\], _->_)" | typecheck (BR) | 631 |

**`:130`.** `FortressLibrary.fss:130`, "Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\]", is in both lists and in both count runs. Row 737's order did not move here, though it moved in the probe. So the distance is 40, not the 39 by reading. The three export errors' messages are unchanged.

## 8. Under walk, alone and with W

This branch alone fails one gated line under walk, as the brief and section 8 of the walk-generic-static probe's report say:

    $ ant testSystem      (on cdd25b95d)
    ProgramError: .../ProjectFortress/tests/LibraryOverloadFamilies.fss:37:12-62:
    Failed to find any matching overload, args = (ProdReduction[\ZZ32\]), overload = {
    	distribute(r:MaxReduction[\T\]):PossibleReductionPair[\Maybe[\T\]\] ... Library/FortressLibrary.fss:3418:5-3419:28
    	distribute[\K\](r:ActualReduction[\R,K\]):PossibleReductionPair[\K\] ... Library/FortressLibrary.fss:3233:5-3234:28
    	distribute(r:MinReduction[\T\]):PossibleReductionPair[\Maybe[\T\]\] ... Library/FortressLibrary.fss:3420:5-3421:28}:OverloadedMethod

Line 37 is `none = SumReduction[\ZZ32\].distribute(ProdReduction[\ZZ32\])`. It is the only red line of the four shards. Nothing was changed to make it pass:

- Rung W's parts A and B, which this branch does not hold, infer the generic method's static argument (row 21).
- With them, the probe ran the whole system suite green (walk-generic-static REPORT section 8, generic-distribute REPORT section 5).
- The same cause stops a nested reduction through `__bigOperator2` whose inner reduction has no fused pair (`NestedSumProbe`, section 5; F-248). No suite test reaches it on this branch.

## 9. Suites and the ladder subset

All on `cdd25b95d`, one code state, since the pass made no edit:

    $ ant testQuick
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0      (library)
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0     (othercompiler)
    [junit] Tests run: 1226, Failures: 0, Errors: 0, Skipped: 0    (compiler)
    BUILD SUCCESSFUL
    Total time: 6 minutes 29 seconds

    $ ant testSystem
    [junit] Tests run: 162 / 154 / 157 / 157, Failures: 0 / 0 / 0 / 1      (630, the one failure LibraryOverloadFamilies, section 8)
    BUILD FAILED
    Total time: 6 minutes 27 seconds

    $ ant testSpecData
    [junit] Tests run: 130, Failures: 0, Errors: 0, Skipped: 0
    BUILD SUCCESSFUL

The compiler track's 1226 is climb batch 16's 1224 plus this rung's two new compiled test cases. `XXXWhereVariableBoundCall` came after and ran through `junit.sh` (section 2).

**The ladder subset.** The drivers were copied under `tmp/rung-library-distribute/ladder/` as `gate.md`, "The ladder regression", says, with copies of the tree's caches, and run after the edit only. The subset:

- the files whose recorded first error in the baseline names something the change touched: `tests/GenericFnWithExcludes.fss` (a `where` clause), `Generator2Test.fss` (`ActualReduction`), `IntMapTest.fss` (`Comprehension`), `generatorTest.fss` (`SumReduction`) and `not_working_library_tests/GenTest5.fss` (an ill-formed reduction type);
- the three ladder files at `typecheck` whose source holds a `where` clause: `XXXHashtable.fss`, `XXXextendOprParam2.fss` and `conditionalExtension.fss`.

None of them is in the landed `explorations/compile-ladder/climb-batch-16/gate/ladder/ladder.tsv`, which holds its 85 pass-list files, so each is compared with `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`. Every phase is the baseline's: no DOWN, no MISSING, no UP. First errors that moved within their phase:

- `GenericFnWithExcludes.fss`, `typecheck`: "non-type where clause bindings: Not yet implemented" in the baseline; now "Could not check call to function g - [\U extends Object X[\n\], V extends Object Y[\n\]\](U, V)->() is not applicable to an argument of type (O, P)" at its `:44`.
  - This change's fold makes the refusal.
  - Its `O` is an `X[\1\]` and its `P` a `Y[\2\]` (`ProjectFortress/tests/GenericFnWithExcludes.fss:24-34`), so no `n` meets both constraints, and the refusal is the specification's answer for this program. The team's test expects the call to run and print `PASS` (`ProjectFortress/tests/GenericFnWithExcludes.fss:44-45`), as walk runs it (the skeptic's addition).
  - The same mechanism refuses a call that some `n` meets (NEW-L-2).
- `IntMapTest.fss`, `disambiguate`: "Comprehension is undefined." in the baseline, now "ImmutableArray is undefined.". `IntMap.fsi` no longer names `Comprehension` (`:87`, `:91`).
- `generatorTest.fss` ("Variable" is now "Function SumReduction is not defined.") and `GenTest5.fss` (the first of its ill-formed types is now `TestCondition[\()\]`; it holds no `where` clause) moved since the baseline through changes made before this rung, by reading: this change touches neither the disambiguator nor those files.

## 10. Sentences made false

In `Specification/`, none found. Grepped:

- `grep -rn 'embiggen\|distribute\|additiveIdentity\|MapReduceReduction\|PossibleReductionPair' Specification --include=*.tex`: the library's helpers have no entry.
- The `where` entries of Appendix I (`Specification/appendices/changes.tex:127-240`, `:1465-1484`), which are about `where`-clause variables in `extends` clauses and rung A's opening of a type variable.
- `Specification/basic/functions.tex:15-19`, which stays true (section 4).

The specification build generates api listings from `Map.fsi`, `IntMap.fsi`, `PrefixMap.fsi` and `FortressLibrary.fsi`. They show the new declared types, but they are the library itself, not sentences.

In the record, as revival-change material (record.md):

- F-242, "`SUM`'s fusion pairs with `MAX` and `MIN` hold six sites of the distance": they hold none now.
- F-244, "The narrow `where` forms, built as shadow patches in the checker": the method-condition form is now built in the tree; its dotted-call hole is NEW-L-1.
- F-248, "Under walk, the team's generic `distribute` over `K` ... stops a nested reduction with no fused pair": true of this branch alone, false once rung W's fix lands with it.
- F-243, "Of the distance's 13 `where`-clause sites, library edits with no new language clear 12": 8 of the 13 are gone (the fusion pairs' 6 and the identities' 2). The fusion pairs stay, cleared by a method condition and the generic, not by dropping them.
- F-53: the distance is 40 and the count 32 on this branch.

## 11. Points to report

- **`LibraryOverloadFamilies` at its line 37** on this branch alone: "Failed to find any matching overload, args = (ProdReduction[\ZZ32\])" at `ProjectFortress/tests/LibraryOverloadFamilies.fss:37`. No other red line in `ant testSystem`, `testQuick` or `testSpecData` (section 9).
- **The distance and count tables, site by site, and `:130`**: distance 49 to 40, count 39 to 32, the 9 sites of section 7, nothing new. `:130` stayed (`Library/FortressLibrary.fss:130`).
- **Each count run's seconds**: base 70.9 s, change 82.3 s, pass 79.7 s (section 6).
- **`embiggen`'s way, `WordCountSmall`'s line, walk values**: `embiggen` answers `BigReduction[\T,T\](MapReduceReduction[\T\](j,z))` (`Library/FortressLibrary.fss:3711-3712`). The team test `ProjectFortress/tests/WordCountSmall.fss:74-82` is unchanged, since it already declares `BigReduction[\Map[\String,ZZ32\], Map[\String,ZZ32\]\]`, and it passes; `Library/Pairs.fss:75-113` is likewise unchanged. No team program's walk value moved; a program that writes the operators' old static arguments does (section 5).
- **NEW-L-1**, its program and output: section 5, `WhereBoundDottedCall`; record.md.
- **NEW-L-2**, a defect this change introduces at a call: `ProjectFortress/compiler_tests/XXXWhereVariableBoundCall.fss:17-20`; record.md, and a question for the curator.
- **Team lines changed in the library** (base lines):
  - `Library/FortressLibrary.fss:3224`, `:3228`, `:3233-3237` (now `:3233-3234`), `:3714-3715`, and `Library/FortressLibrary.fsi:2152`;
  - not the team's but the revival's (the skeptic's correction, by `git blame` at 3aea3da53): the identities' fallbacks `:3380` and `:3397`, from `d846e3644`, which wrote `additiveIdentity` and `multiplicativeIdentity`, and `SumReduction`'s two overloads `:3421` and `:3423`, made generic in `d846e3644` and retyped in `aadd02f23`; the team's `SumReduction` was over `Number`, `distribute(r: MaxReduction[\Number\]): PossibleReductionPair[\AnyMaybe\]`, with `empty(): Number = 0` (`Library/FortressLibrary.fss:3021-3039` at a874948ac);
  - `Library/Map.fss:197`, `:201`, `:203`, `:207`; `Library/Map.fsi:108`, `:112`;
  - `Library/IntMap.fss:738`, `:742`, `:744`, `:748`; `Library/IntMap.fsi:87`, `:91`;
  - `Library/PrefixMap.fss:419`, `:423`, `:425`, `:429`; `Library/PrefixMap.fsi:114`, `:118`.
- **The api left as it is**: `ActualReduction` in `Library/FortressLibrary.fsi:1877-1891` (the X1 export error's message is unchanged) and `MIMapReduceReduction` in `:2140-2143`.
- **A checker file edited beyond the two named, or any walk edit**: none. The checker edits are in `KindEnv.scala` and `STypesUtil.scala` only, and nothing under `interpreter/` changed.
- **Beyond the brief's file list**: the three callers' apis, `Library/Map.fsi:108`, `Library/IntMap.fsi:87` and `Library/PrefixMap.fsi:114` (decision 3). `Library/Pairs.fss` and `WordCountSmall.fss` are on the list and left unchanged (decision 2).

No step taken cannot be undone or acts against a decision on record.

## 12. Decisions

1. **The library as L4, the checker as B.2, both the probes' own.**
   - Ways not taken: the team's generic over `R` (L1, L2: the two return-type sites stay, and L1 stops every program at load under walk); the generic over `K` without the forwarders (L3: two new errors); dropping the fusion pairs (P-151 keeps them); B.1 and B.3 of the shadow (rung A's, and not this batch's).
   - Evidence: `explorations/perf-probes/generic-distribute/REPORT.md` sections 1, 4 and 9; P-151; item 56's default.
2. **`embiggen` answers `BigReduction[\T,T\](MapReduceReduction[\T\](j,z))`, with `j: (T,T)->T`.**
   - Ways not taken: (a) row 631's and the brief's form, `MIMapReduceReduction[\R\] extends MonoidReduction[\R\]` with `j: (R,R)->R` and `embiggen` answering `Comprehension[\T,T,T,T\]`; (b) that retyped `MIMapReduceReduction` inside a `BigReduction`; (c) the result typed and `j` left `(Any,Any)->T`, which the contravariant arrow would admit but which leaves the parameters of the callers' lambdas at `Any`.
   - Evidence: P-27, and the library's 20 `BigReduction[\T,T\](R)` big operators (section 3). The team's `BIG MINNUM` (`Library/FortressLibrary.fss:3476-3478`) has the same body over `RR64`. jmaessen's note in `183015086`: "rip out the hacks and use the proper type information instead".
   - The team's own callers already declare `BigReduction` (`Library/Pairs.fss:75`, `ProjectFortress/tests/WordCountSmall.fss:74`). So (a) would change seven more team lines: three in `Pairs.fss`, two in `Pairs.fsi` and two in the team test.
   - (a) or (b) would also change `MIMapReduceReduction` in the component and its api (`Library/FortressLibrary.fsi:2140-2143`), or else add it to the X1 export error.
   - Walk's instance of the operator is the same for both result types. `resultArgOf` reads the element and result type as argument 0 of a `BigReduction` and as arguments 0 and 1 of a `Comprehension` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:272-290`), and section 5's maps give the base's answers.
   - `MIMapReduceReduction` stays: the api declares it and `ProjectFortress/tests/GeneratorDeclarations.fss:46` uses it. Whether to keep it is a question for the curator.
3. **The callers' apis retyped with their components** (`Library/Map.fsi:108`, `:112`; `Library/IntMap.fsi:87`, `:91`; `Library/PrefixMap.fsi:114`, `:118`). The brief names the components only.
   - Way not taken: the components alone, which leaves each api declaring `Comprehension[\X,X,Any,Any\]` for a component that answers `BigReduction[\X,X\]`.
   - The one-argument forms' `__bigOperatorSugar[\X,X,Any,Any\]` is written `[\X,X,X,X\]`, as `Set.fss:119` writes it, because static arguments are invariant and a `BigReduction[\X,X\]` is a `BigOperator[\X,X,X,X\]` (`Library/FortressLibrary.fss:3337`).
4. **The identities' fallback by `cast[\T\]`** (P-151; where-clause probe A.2.3).
   - Ways not taken: `fail`, which stops where the numeral answered; `HasIdentity` (P-78), not built; leaving the sites.
   - It changes no walk value: only a non-number `T` reaches the fallback, and for such a `T` the numeral was never a `T`. `XXXEmptyGroupSumRungF` stays an expected failure, with `CastError` in place of the `ProgramError`.
5. **The second pass makes no edit.** The profile puts the two declarations under 0.2% of the samples (section 6).
   - Way not taken: an early return in `constraintBounds` when the clause has no trait constraint, which would skip one `NestedKindEnv` with no gain the profile can show.
   - Evidence: `compiler.md`, "The checker's time", step 3.
6. **The fold kept as the probe built it, with NEW-L-2 recorded.** A constraint whose bound names a `where`-clause variable is folded too, but the arrow does not bind the variable, so no call applies.
   - Ways not taken: (a) fold only a constraint whose bounds name no `where`-clause variable. The call is then not checked, as on the base, and the checker accepts `GenericFnWithExcludes`'s `g(O,P)`, which no `n` meets. (b) Add the `where`-clause variables to the arrow's static parameters, so that a call infers them. That edits the arrow, which the code generator and the overloading checker read, and it is the opening of `where`-clause variables at a call, which is rung A's work for a `comprises` clause.
   - Evidence: the brief, "Drop the probe's comments; keep its meaning"; section 9 on `GenericFnWithExcludes`. No library declaration has such a constraint, so neither the distance nor the count moves either way.
   - A question for the curator.
7. **Test names.**
   - `WhereBoundMethodChecker` is the probe's.
   - The call refusal is `XXXWhereBoundFunctionCall`, a new name. The probe's `XXXWhereBoundCallChecker` held both calls, and its dotted half is NEW-L-1, a refusal not made.
   - `XXXWhereBoundChecker` keeps its name, rekeyed as the brief says.
8. **The ladder subset** of section 9, chosen by the baseline's first errors and by the `where` clauses at `typecheck`. MicroGPT's eighteen components were not compiled, since none holds a `where` clause or names a changed declaration.
9. **microGPT not run.**
   - The brief does not ask for it.
   - Its sources reach none of the changed declarations: `grep -ln 'BIG UNION\|BIG UPLUS\|embiggen\|import Map\|import IntMap\|import Pairs\|distribute\|__bigOperator2' explorations/run-c4/src/*.fss explorations/apl/mg/*.fss` prints nothing.
   - The probe ran its quick pair 7 of 7 each with L4 (generic-distribute REPORT section 1).

## 13. Defects and their homes

- **Row 433** (the fusion pairs' four unmet bounds and two results): home 1, repaired. Its test is the distance stage (its 6 sites gone, section 7), with `GeneratorDeclarations` keeping the fused answers under walk. The gather closes it.
- **Row 677** (the checker reads no `where` constraint as a bound): home 1, repaired; tests `WhereBoundMethodChecker` and `XXXWhereBoundFunctionCall`. Its reproducer `XXXWhereBoundChecker` is rekeyed to the code generator's wall and cited to row 701. The gather closes it.
- **Row 436** (the empty sum's missing zero): not repaired, but its two distance sites clear. A note.
- **Row 631** (`embiggen` unwraps `Any`): home 1, repaired. Its site `:3715` is gone, and the walk tests of section 2 keep their verdicts. The gather closes it.
- **NEW-L-1** (a method's condition on its trait's parameter is not checked at a dotted call): home 3. It is a refusal not made, so it can have no green expected failure: the row only, reproducer none, the program and the output in its notes.
- **NEW-L-2** (a call is refused when a `where`-clause variable bounds the function's parameters): home 2, since the specification settles that the call applies at `n = 1`. `XXXWhereVariableBoundCall` is keyed on today's refusal. It turns red when the checker accepts the call, which then stops in the code generator (row 701).
- **Row 101's instances** (a component that imports `Map` and `IntMap`, or one that imports `PrefixMap`, stops at load on two nullary `BIG CUP`): measured on the old and new code, unchanged; a note. No program can import `PrefixMap` under walk, so its retyping is checked by reading only.
- **Row 21 / F-248** on this branch alone (section 8): rung W's; a note.
- **Row 744**: the library's own `distribute` with a written static argument stops as it did on the base; a note.

## 14. Commands worked out

- The site comparison of section 7: a Python reading of the kind, location and message columns of the two `errors.tsv` files, then a multiset difference. The location's `FortressLibrary.fss` line is raised by 3 from 3235 on, and the message's positions are masked.
- The `run.txt` comparison of section 6: the tree's path is replaced by `TREE`, then the same line map is applied to every `FortressLibrary.fss:L:C-L:C` position.
- The profile of section 6: the count stage's java line, run by hand with the JFR flags above and the change run's compiled driver classes first on the class path. A Python script then counts the samples whose stacks hold a frame, and the leaf frames.
