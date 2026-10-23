# Rung X (rung-self-type-exclusion): the skeptic's verdict

Climb batch 21, run 1. The rung builds probe A1's two shadows into the compiled checker's overloading exclusion test only (P-157): a self-typed trait's `self` read as `C[\X\] & X`, and each static parameter at the top of the two domains' meet read as its declared bounds. Judged at the worker's head `070b88000` (code of `236d16362`); my commits follow it. Verdict: **approved**, with three corrections, none contested.

## 1. What I checked

1. **The tables, against the worker's files.** Count stage `#total 3`, `#crash none`, equal to climb batch 20's gate table (`diff` prints nothing); distance stage `#total 5`, `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-20/gate/distance.txt <the worker's distance table>` prints `DISTANCE SAME   5`. The full-check distance stage `#total 183`, `#crash none`, `#shadow every shadow edit matched the tracked sources`; `python3 explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/plan-21/probes/full-check-base.tsv <the worker's errors.tsv>`:

       landed 191 now 183
       GONE	overloading	FortressLibrary.fsi:L,FortressLibrary.fsi:L	Invalid overloading of + in API FortressLibrary: [\T extends AdditiveGroup[\T\]\](AdditiveGroup[\T\], T)->T @ ...
       export 'are not matched by the declarations': landed 43 entries, now 43

   with eight `GONE` lines (the api's and the component's `+` and `-`, scalar on either side) and no `COME`. The caught crash keeps its three spans, `List.fsi:56:27`, `List.fss:106:13`, `List.fsi:56:27`, those of `explorations/perf-probes/symbolic-operators-2/REPORT.md:57`. The count stage under the full check: `#total 98`, `#locations 35`, `#crash none`.
2. **The count stage myself**, on the base build and on the worker's head, in one session, each with the skill's command (`time explorations/coordinator/tools/checker-count/run.sh $W/count/$N.txt $W/count/$N`, under `nice -n 19`), the base from `/home/user/fortress-base21`, the head from the rung's worktree, whose build is `236d16362`'s (the last `ant` run, `ant testQuick`, built it; only `Specification/` changed after). Machine: `nproc` 4, Intel Xeon Processor @ 2.10 GHz, JDK 25.0.4.1, `FORTRESS_THREADS=1`.

       base  # start 2026-10-23T15:19:10Z load 0.64 1.75 3.46    real 1m22.762s   #total 3   #crash none
       head  # start 2026-10-23T15:21:56Z load 0.70 1.63 3.16    real 1m21.509s   #total 3   #crash none

   The two tables are equal (`diff` prints nothing), and the two `run.txt` files are equal with each tree's path replaced by `TREE`. My head's table and masked `run.txt` also equal the worker's `change` run's, the run before its speed pass. The worker's 95 s, 108 s and 85 s are mine in order of size: no slowdown of several times, no stall.
3. **Test first**, in the worker's transcript (`agent-a0c1284bc9e4077d5.jsonl`): the nine tests written by heredoc at 13:38:10 to 13:38:42; the failing run `ONE_JVM=1 ... junit.sh base ProjectFortress/compiler_tests <the nine>` started 13:38:58 (call `dTCdmZ`) and read complete at 13:39:12 (`zDZqWd`), on the seeded base build: 'Invalid overloading of PLUS in component ExclusionSelfTypeBoundsScalarRight', 'File ExclusionVectorScalarBlock.fss has 4 errors.', `Tests run: 9,  Failures: 4` with 6 to 9 'Saw expected failure'; the patches applied at 13:39:56 (`kUfkGB`); the first build at 13:42:28 (`sdwgpv`). The promoted test red on the old code through `old-fortress.sh ... junit` at 13:45:39 (`uGGaJo`). The last code edit, the speed pass, at 13:58:32 (`gBcrve`), built at 14:00:06; the passing run `ant testQuick` started 14:06:52 after commit `236d16362` (`8kQZpo`): `BUILD SUCCESSFUL`, `Total time: 7 minutes 36 seconds`, compiler 1293/0, library 86/0, othercompiler 263/0. The order holds.
4. **The diff, line by line.** It does what the section asks and no more: `toFunctionArrows` and `toFunctionalMethodArrows` pass the plain arrow through `selfTyped`, which keeps a second arrow from `FunctionalMethod.ast`'s own parameters only where they differ from `parameters()`, that is only for a self type read from the F-bound (`ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java:41-54`, `:152-166`); only `validOverloadingInner`'s exclusion test reads it (`OverloadingChecker.scala:614`), the single live caller of the oracle's `excludes` (grep of `excludes(` over `ProjectFortress/src/com/sun/fortress`: the other hits are `TypeAnalyzer`'s and `ExclusionOracle`'s own `excludes` and the commented copy at `:628`). The bounds reading is a third way to be valid in `OverloadingOracle.excludes` (`:327`), not the global variant, and reads each parameter as its bounds alone (`TypeSchemaAnalyzer.scala:456-486`), never as `X & B`. I read it for soundness:
   - The added conjunct is implied by the first at every instance within the bounds: `withBounds` replaces a parameter only at covariant places (the meet, a tuple's elements, an intersection's or union's members, a self type's parts), never inside a static argument or an arrow.
   - A disjunct is read empty only where the body is below Bottom under the unifier's substitution, and the unifier takes an equality only from a type that is both a lower and an upper bound of the variable (`getEquality`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:684-698`), so every solution of the disjunct is an instance of that substitution, the paper's most general unifier (`Papers/Types/exc-reduction.tick:45-50`). A disjunct that does not unify, or whose images break a bound, is read not empty: the conservative side.
   - The memo is keyed by the two domains, whose equality includes their static parameters and bounds (`ProjectFortress/src/com/sun/fortress/nodes/TypeInfo.java:58-73`), in one analyzer, and each trait or object gets its own oracle and analyzer over its extended environment (`OverloadingChecker.scala:380-383`), so an answer is not reused across environments. `validOverloadingMemo`'s key on the plain arrows (the worker's decision 2) holds: the key carries the self position, and the plain arrow fixes the trait, so it fixes whether a second arrow exists.
5. **Precedent.** P-152's `emptyED` beside `subtypeED` (`OverloadingOracle.scala:327`) for the place; `subtypeEDMemo` behind `fortress.schema.subtype.cache` (`TypeSchemaAnalyzer.scala:53`, `:148-163`) for the memo. No device invented where the tree has one.
6. **The tests.** Each exercises its pair; each has one comment line; names by topic; no competing declaration of any new name (the Scala names occur only in the three files; the eleven test names only at their own files, in both test corpora and in the other rungs' branches). Two citations named a chapter as a section (fix 1).
7. **My differential** (section 4), compiled and under walk, new code and old.
8. **The ledger and the sibling sites**: `ledger.py find` on 'duplicate entry', 'codegen bounds', 'walk generic type excluding', 'walk refuses load generic' and others; the sibling site on the other path is walk's load check, which my programs measured (fix 2). Dotted methods do not reach the change: their receiver is no parameter of the exclusion test.
9. **The report**: its five provenance lines opened (`overloading.tex:582-588`, `traits.tex:285-302`, `var-ref.tex:77-79`, `traits.tex:599-602`, `changes.tex:4135-4140`, `OverloadingOracle.scala:327`, `TypeSchemaAnalyzer.scala:53`, `:148`, `:456-486`, `FunctionalMethod.java:41-67`, `:152-166`, `TypeAnalyzer.scala:567-580`, `FortressLibrary.fsi:267-268`, `:2702-2708`, `FortressLibrary.fss:361-362`, `:4906-4912`): each says what it is cited for. The whole-suite run is `ant testQuick` on `236d16362`, whose code is the head's. NEW-X-1's citations (`Formula.scala:282`, `:287-292`, `:308-314`, `TypeAnalyzer.scala:779`) are right; the three drafted rows pass `ledger.py check --rows` but for the placeholder number; row 584 is 1,191 characters (`ledger.py show 584`), so its note waits. Two sentences made false were missing (fix 2) and one time was off (fix 3).
10. **The failure-mode question**: the change turns refusals into acceptances, as P-157 asks; no throw or crash becomes a value. A unifier that fails reads as not empty, which keeps the refusal.

## 2. Old against new, on the worker's runs

The 35 files in scope with `XXX10k` and `AfterTypeChecking`: `OK (150 tests)` on the change, and on the old code 147 of 150 with the three red results `compile_err_equals` pins of a path under `FORTRESS_HOME`; with paths masked, the printed diagnostics are the same. The ladder subset and the eighteen microGPT components: `diff <(mg_phases explorations/compile-ladder/climb-batch-20/gate/ladder/microgpt-phase.md) <(mg_phases <the worker's microgpt-phase.md>)` prints nothing.

## 3. Row 713

The bounds reading accepts row 713's pair, which the base refused by the default of a question still open (`explorations/coordinator/PLAN.md:419`, C.skeptic.1). I agree with the worker's reading: P-157 has the exclusion test's reduction read the static parameters' bounds, and with `T` read as `K & R[\T\]` the meet with `Z` is `C & R[\T\]`, which no value inhabits; the main text reads each static parameter "for any type within its bound" (`Specification/advanced/overloading.tex:582-588`). The PLAN item is a default, not a decision on record, and the promotion is reversible (two renamed files), so it lands and is the curator's question (forCurator). Its walk half, home 3 with `tests/OverloadTwoBoundsClosedTraitExclusionWalk`, is the worker's.

## 4. My programs

Under `tmp/rung-self-type-exclusion/skeptic/p/` (scratch). Each compiled with `bin/fortress compile` and run with `bin/fortress run` on the rung's build with a private copy of its caches, and on the old code with `/home/user/fortress-base21/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base21 /home/user/fortress-selfexc/tmp/old-caches compile P.fss` then `run P`; walk on both (walk is unchanged: `git diff --quiet 00f2e1bdc HEAD -- ProjectFortress/src/com/sun/fortress/interpreter`).

| Program | Its overloads | New, compiled | Old, compiled | Walk (new = old) |
|---|---|---|---|---|
| `SkVecRun` (below) | `AddG`'s `PLUS` beside the generic `Arry`/number block, both sides | runs: `Rr+Rr`, `Vv+Vv`, `Arry+T`, `T+Arry`, `PASS` | 'Invalid overloading of PLUS', 2 errors | refused at load, 'with generic type, at least one pair of parameters must have excluding types' |
| `SkSubSelfRun` | a self-typed `Ring[\T\] extends AddG[\T\]` with `TIMES`, a generic block on the right and a plain one on the left | runs: `Mm*Mm`, `Arry*T`, `Rr*Arry`, `Rr*Rr`, `PASS` | 'Invalid overloading of BY' | refused at load, the same message |
| `SkMixSelfRun` | `Mon[\X extends AddG[\X\]\] extends AddG[\X\]`, the second form of a self-type parameter, beside a plain `TIMES(x: Arry[\Rr\], y: Rr)` | runs: `Mm*Mm`, `Arry*Rr`, `PASS` | 'Invalid overloading of BY' | runs, `PASS` |
| `SkSelfTraitImplNeg` | the block bounded by `AddG` only, with a trait `Tw extends { Arry[\Tw\], AddG[\Tw\] }` | refused, 'Invalid overloading of PLUS' | refused | refused at load |
| `SkFBoundOverlap` | `h[\T extends AddG[\T\]\](x: T, y: AnyAddG)` beside `h(x: AnyAddG, y: Rr)`, which meet at `(Rr, Rr)` | refused | refused | refused, 'fails the Meet Rule' |
| `SkFBoundTwoRun` | `h[\T extends AddG[\T\]\](x: T, y: T)` beside `h(x: Rr, y: Vv)` | runs: `same`, `rv`, `PASS` | the same | the same |
| `SkFreeParamNeg` | `o[\T\](x: P[\T\], b: Box[\T\])` beside `o[\T, U\](x: Q[\U\], b: Box[\T\])` | refused | refused | refused, 'fails the Meet Rule' |
| `SkBoundsOpen` | `g[\T extends A\](x: Box[\T\], y: T)` beside `g[\T extends B\]`, `A` and `B` open traits | refused | refused | refused |
| `SkBoundsExcludeRun` | the same with `A excludes { B }` | accepted; code generation stops, `ZipException: duplicate entry: SkBoundsExcludeRun?$g...` | the same | runs: `a`, `b`, `PASS` |
| `SkTintValueRun` | `tint[\T extends Red\](x: Box[\T\], y: T)` beside `tint[\T extends Blue\]`, objects | accepted; the same `duplicate entry` | the same | runs: `red`, `blue`, `PASS` |

`SkVecRun`, `SkSubSelfRun`, `SkMixSelfRun` and `SkFBoundTwoRun` print the same at `FORTRESS_THREADS=1` and `=4` on the new code. No wrong acceptance: every pair that a value or an open extension could meet stays refused. The two `duplicate entry` stops are row 537's ("with both parameters named `T` code generation stops on a duplicate class name"), on the old code as on the new, and both programs were already accepted by the base's checker: no new home.

`SkVecRun`, the library's shape in a program:

    trait AnyAddG end
    trait AddG[\T extends AddG[\T\]\] extends AnyAddG
        opr PLUS(self, other: T): String
    end
    trait Numb end
    trait HasRk excludes { Numb } end
    object Rr extends { Numb, AddG[\Rr\] }
        opr PLUS(self, other: Rr): String = "Rr+Rr"
    end
    trait Arry[\E\] extends HasRk end
    object Vv extends { Arry[\Rr\], AddG[\Vv\] }
        opr PLUS(self, other: Vv): String = "Vv+Vv"
    end
    opr PLUS[\T extends { Numb, AddG[\T\] }\](x: Arry[\T\], y: T): String = "Arry+T"
    opr PLUS[\T extends { Numb, AddG[\T\] }\](y: T, x: Arry[\T\]): String = "T+Arry"

with `run()` asserting `Rr PLUS Rr`, `Vv PLUS Vv`, `Vv PLUS Rr` and `Rr PLUS Vv`. Walk on it, `bin/fortress SkVecRun.fss`:

    PLUS[\T extends Numb AddG[\T\]\](x:Arry[\T\],y:T):FortressLibrary.String.../SkVecRun.fss:18:1-80 and
    AddG[\T extends AddG[\T\]\](uninstantiated)[\T extends AddG[\T\]\].PLUS(self:(AddG[\T\] & {T}),other:T):FortressLibrary.String.../SkVecRun.fss:6:5-7:1 have p
    with generic type, at least one pair of parameters must have excluding types

`SkVecLeftWalk` and `SkVecRightWalk`, each pair alone, are refused the same way.

## 5. Findings and fixes

All three are corrections; none is a defect of the change, none is contested.

1. **Two citations named a chapter as a section** (`ProjectFortress/compiler_tests/ExclusionSelfTypeScalarRight.fss:4`, `ExclusionScalarLeftPlain.fss:4`): `overloading.tex, section "Overloaded Functional Declarations"` is the chapter's title (`Specification/advanced/overloading.tex:12`); the rule the comment states, that declarations whose parameter types exclude are a valid overloading, is the section "Incompatibility Rule" (`:210-258`). Respelled; each file keeps one comment line. Commit `c360464e8`. Passing: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skep ProjectFortress/compiler_tests ExclusionSelfTypeScalarRight.test ExclusionScalarLeftPlain.test`: `typecheck ... OK`, twice, `OK (2 tests)`. Settled by the skill's rule that a test cites the specification by file and section (`tests-writing.md`, "Names, comments, citations").
2. **Walk's half of the vector pairs was not recorded**, and two sentences made false were not listed. With the change the checker accepts and runs a program's generic array/number operators beside a self-typed additive group's own operator; walk refuses the same program at load (section 4). P-157 decides that these pairs stand, "though no call fits both", so walk's refusal is a departure: home 2, the gated expected failure `ProjectFortress/tests/XXXExclusionVectorScalarWalk.fss`, and row NEW-X-2 drafted in `record.md`, in section 4 of the ledger beside rows 539 and 779, which record walk's like refusals of valid generic sets in the same way. Also listed as made false: F-258 (`FACTS.md:178`, "its bounds not read") and `explorations/coordinator/PLAN.md:419` (the checker refuses row 713's pair, pinned by the old `XXX` name). Commit `820d7c893`. The test through the harness:
   - on the head: `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/.../h1 ProjectFortress/tests/XXXExclusionVectorScalarWalk.fss`: `. interpret .../XXXExclusionVectorScalarWalk`, ` OK Saw expected exception`, `OK (1 test)`; the direct run names the refusal, 'with generic type, at least one pair of parameters must have excluding types';
   - on the base's code: `FORTRESS_HOME=/home/user/fortress-base21 /home/user/fortress-base21/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/.../old-harness <tree>/ProjectFortress/tests/XXXExclusionVectorScalarWalk.fss`: ` OK Saw expected exception`, `OK (1 test)`;
   - red with `AddG`'s operator removed for one run, then restored (`cmp` clean): `PASS`, `junit.framework.AssertionFailedError: Expected failure or exception, saw none.`, `Tests run: 1,  Failures: 1,  Errors: 0`.
   Settled by P-157 (the pairs stand) and the skill's rule that every measured defect is recorded (`tests-writing.md`, "How a defect is recorded"); the walk test is a path beyond the section's files, listed as a point to report.
3. **The report's time of the first build** (`REPORT.md:46`): "13:41"; the transcript starts it at 13:42:28. Commit `4aa105c03`.

My commits change no Java or Scala, so no suite runs for them; the gate runs every suite on the merged tree.

## 6. Where I differ from the worker's account

- Decision 4 and section 11 put row 713's walk half in home 3 as contested; I put the vector pairs' walk half in home 2, because P-157 decides those very pairs, where it reaches row 713's only through its rule.
- The report's tables are those of the worker's head; I ran no count or distance stage after my corrections, which change no code.

## 7. Verdict

**approved.** The change is P-157 as the section states it, test first, correct by my reading and my programs, and as fast as the base; the record, with my three corrections, is honest. Left for the gather: NEW-X-1 and NEW-X-2 to be filed; row 584's note (no room); Appendix I's "Overloading with static parameters" to name walk's departure on the vector pairs by NEW-X-2's number once it has one; the sentences made false outside `changes.tex` (REPORT.md section 8, items 1 to 11).
