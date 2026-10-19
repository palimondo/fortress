<!-- Probe of 2026-10-17: how big a fix to walk's generic-method static-argument gap (ledger entry 21) is, and whether it makes the team's generic distribute (variant L4) safe under walk. The probe workers returned their reports as text, as their briefs asked; this file holds them word for word, from the session transcript (lines 35311 and 35380) with the harness's indent removed: the first, by the Opus probe agent `a5a54e653b1af2a13`, returned at 11:54 UTC on 2026-10-17, is everything above section 8; the second, by the Opus probe agent `a6713794ff264f288`, returned at 12:25 UTC, is section 8. The coordinating session's record worker wrote them here on 2026-10-19, in place of the coordinator's condensed text (`2a630c2ff`, `67ae27a10`). Notes that cite this report's sections 1 to 6 by number cite that text, whose sections 1 to 5 are Q1 to Q5 here and whose section 6 is "Defects"; the second report's own section numbers are those of that text too. The worktree /home/user/fortress-probe-distribute, branch wip/probe-generic-distribute, holds the fix as commit fd7056abf, whose code landed as climb batch 17's rung W (`743eb5286`), and L4 with the checker shadow, uncommitted. -->

# Walk's generic-method static arguments, with the team's generic distribute: a measurement

## Report: walk's generic-method static-argument gap (ledger row 21) with the team's generic `distribute` (L4)

Worktree `/home/user/fortress-probe-distribute`, branch `wip/probe-generic-distribute`. My fix is commit `fd7056abf` on that branch, on top of `07c83a40a`. Nothing was pushed. L4 and the checker shadow are still uncommitted in the worktree, as I found them.

I ran everything under `nice -n 19`, one JVM at a time, each start with at least 6 GB available. Machine: nproc 4, Xeon 2.1 GHz, OpenJDK 25.0.4.1. `FORTRESS_THREADS` was 1 for direct runs and 4 inside the harness. I did not run the count stage or the distance stage. I took no timings.

To run "base", I put `Library/FortressLibrary.fss` back to HEAD for a while, then put L4 back from its saved diff and checked it was byte-identical (`git diff | diff - tmp/q21/L4-lib.patch`). The no-fix build has the base's own implementation stamp, `b68e5461…`.

### Q1. On base, which cases fail under walk

`harness-one.sh` on the three XXX tests (`XXXMethodStaticArgRungT`, `XXXExpectedTypeFixRungT`, `XXXDispatchGenericMethodBesidePlain`): `OK Saw expected exception` three times, `OK (3 tests)`.

I promoted the XXX test to a plain-named copy, `MethodStaticArgInference.fss`. On base it is red:
```
Unification error: Closure/Constructor for get param 1 (b:Box[\T@…MethodStaticArgInference.fss:8:1-10:2\]) got arg Box[\ZZ32\] of type Box[\ZZ32\]
Tests run: 1,  Failures: 1,  Errors: 0
```

My probes, run with `tmp/q21/run-progs.sh base`, programs in `tmp/q21/progs/`:

| Case | Result on base |
|---|---|
| `O.get(Box[\ZZ32\](z))` (MBoxObj) | FAIL: the same "Unification error … got arg Box[\ZZ32\]" |
| Generic receiver: `Hd[\String\]("s").get(Box[\ZZ32\](z))` (MBoxGenRecv) | FAIL: the same Unification error |
| Vector: `V.first(vector[\ZZ32,3\](7))` (MVector) | FAIL: "…first param 1 (v:Vector[\T@…,3\]) got arg __DefaultVector[\ZZ32,3\]" |
| Plain argument: `O.id(z)` (MPlain) | FAIL: "InterpreterBug: Symbolic type T@… is being matched to value 3: ZZ32" |
| Lone generic inherited from a trait: `Mx[\ZZ32\].distribute(Sm[\ZZ32\])` (MTraitLone) | FAIL: Unification error |
| The same generic beside a plain overload: `Sm[\ZZ32\].distribute(Sm[\ZZ32\])` (MTraitOver) | FAIL: "Failed to find any matching overload, args = (Sm[\ZZ32\])" |
| Plain overload beside it (MTraitPlain) | PASS: `some` |
| Size: `Box[\3\](7).idx(Box[\2\](5))` (MSize) | FAIL: "…idx param 1 (b:Box[\j\]) got arg Box[\2\]" |
| Size from a Vector (MSizeVector) | FAIL: Unification error |
| Mixed widths: `HolderR.sameR(z, w)` (MMixed) | FAIL: "Symbolic type T … matched to value 3: ZZ32". The top-level function `sameF(z, w)` prints `[3:ZZ64,4:ZZ64]` |
| Nested SUM of SUMs (FuseSumSum) | PASS: `11, 11` |
| Nested MAX of MAXes (FuseMaxMax) | PASS: `3, 3` |

### Q2. The smallest fix

The smallest fix is part A, one file: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java`, +21 −1.
- When an object holds a generic method, it holds a "symbolic instance": a copy at placeholder static arguments.
- Part A changes `applyInnerPossiblyGeneric`. When the method called is such a symbolic instance (`MethodInstance` with symbolic `instArgs`), it now gets the real instance from `EvaluatorBase.inferAndInstantiateGenericFunction(args, generator, generator.evaluationEnv)`. That is the function path's own inference.
- I pass `evaluationEnv` rather than `getWithin()` because a trait's `GenericMethod` has an empty member environment as its "within" (`new BetterEnv(at)`, `FTypeTrait.java:47`).

With part A, `harness-one.sh` gives: `MethodStaticArgInference … REACHED / PASS / OK (time = 429ms)`, and the other two XXX tests are still expected failures (`OK (3 tests)`).

Q3 showed that part A is not enough, so I added part B in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, +25 −8:
- When an overloaded method set chooses an overload (`bestMatchInternal`, `bestMatchWithCoercion`, and the re-instantiation step), a symbolic method instance is now treated as its generic method.
- This goes through two helpers, `genericOf` and `inferenceEnv`. For real generic functions they return the same values as before.

The whole patch (`fd7056abf`, also saved as `tmp/q21/walk-fix-AB.patch`; part A alone as `tmp/q21/walk-fix-A-only.patch`):
- 2 Java files, +46 −9;
- the rename `XXXMethodStaticArgRungT.fss` → `MethodStaticArgInference.fss`, which changes 1 line (the `component` line).

### Q3. The nested cases with the fix and L4

With part A only, plus L4:
- `MaxMax naive over inits: 3` / `MaxMax fused over inits: 3`: right.
- `SumSum naive over inits: 11`, then `Library/Generator2.fss:73:94-107: Failed to find any matching overload, args = (SumReduction[\ZZ32\])`: still broken, because `SumReduction`'s `distribute` is overloaded.

With parts A and B, plus L4, with the team's trace lines live (`tmp/variant.py L4 G0 trace`):
- SumSum `11, 11` and MaxMax `3, 3`. Both are right and take the naive path.
- The three fused pairs still fuse, with one "use efficient" trace line each: MaxSum `6, 6`, MinSum `1, 1`, SumProd `10, 10`.
- `distributes(Sum,Sum)` false, `distributes(Max,Max)` false, `SumReduction.distribute(SumReduction)` false, `MaxReduction.distribute(SumReduction)` false.

All of these match the base values in `explorations/perf-probes/generic-distribute/REPORT.md` section 5. I re-checked them after the last rebuild.

### Q4. Entry 21's cases: which the fix covers

Covered, measured with parts A and B:
- **Sizes:** MSize gives `idx: 7`, `sz: 2`; MSizeVector gives `len: 3`; `compiler_tests/NatMethodChecker.fss` run under walk prints `PASS`.
- **Mixed widths:** `sameR(z, w)` gives `[3:ZZ64,4:ZZ64]`, the same as walk's function path. The compiled path answers `[3:ZZ32,4:ZZ64]` according to `rung-inference-walk/SKEPTIC.md`; I did not re-measure that.
- **Box, Vector and plain arguments, the trait-inherited generic, and the overloaded receiver.**
- **Bounds:** a library bound on a trait's generic method (MTraitNum: `5`, `Just(5)`) and a bound naming an object's own parameter (MObjBound: `picked`).
- **One caveat:** a lone `T` taken from a ZZ32 argument becomes `Int`. `O.wrap(z)` gives `Box[\Int\]`, exactly as the top-level `wrapF(z)` does. That is ledger row 364, not new.

Still failing, with a rough size of the fix:
1. **The expected type fixes the static argument** (`XXXExpectedTypeFixRungT`). `Fac.mk()` gives `BoxT[\Any\]`, and so does the function `mkF()`. The run stops with "Type mismatch binding BoxT[\Any\] (type BoxT[\Any\]) to $f (type BoxT[\ZZ64\])". A fix would carry the declared type into the inference, as walk's `BigOperatorHint` already does for reductions: an expected-type case for calls in `Evaluator.evalAt`, unifying it with the declared return type in `EvaluatorBase`, passing it through `DottedMethodApplication` and `OverloadedFunction`, and the field and assignment sites. Roughly 4–5 files. The function path has the same gap.
2. **A generic method beside a plain one in the object's own declarations** (`XXXDispatchGenericMethodBesidePlain`). Load still stops with "Missing type T" at `:11:38`, because `GenericMethod.finishInitializing` evaluates the parameter types without the method's own static parameters. A fix would bind them symbolically there, make the symbolic instance for a generic inside an overload set in `Constructor.accumulateEnvMethods`, and teach the load-time order checks in `OverloadedFunction` about generic dotted methods; part B then dispatches it. Roughly 3–4 files: `GenericMethod.java`, `Constructor.java`, `BuildEnvironments.java`, `OverloadedFunction.java`.
3. **`bool` static parameters.** The method form stops on base and with the fix alike, even with the static argument written, before any call returns: "InterpreterBug: subtypeCompareTo(class …BoolArg class …BoolArg) is not implemented!" (MBoolE and MBoolI). This is new defect D1 below. The function form fails "Cannot unify Flag[\true\] … with Flag[\b\]", which is row 307's walk half. A fix needs a BoolArg comparison in `nodes_util/NodeComparator.java` and bool unification in walk's type code (as `IntNat`/`FTypeNat` do for sizes). Roughly 2–3 files.
4. **Outside row 21, unchanged:** explicit static arguments on an overloaded receiver, row 744 (`RtGenKWh`: "Don't actually resolve overloading of generic methods yet."). A fix would be in `DottedMethodApplication.typeApply`, probably 1 file.
5. **New defect D2, also on base:** a generic trait's method whose own parameter is bounded by the trait's parameter (`pick[\K extends R\]` in `trait Tr[\R\]`) stops at the extending object with "Missing type R".

### Q5. Walk tests and microGPT

I found the tests with two greps over `ProjectFortress/tests/*.fss` and took their union, 66 files:
- `grep -lE '\.[a-zA-Z_][a-zA-Z0-9_]*\[\\'`: dotted calls that write static arguments, 44 files;
- `grep -lE '^\s+(getter |setter )?[a-zA-Z_][a-zA-Z0-9_]*\[\\[^]]*\\\]\s*\('`: indented generic declarations, 41 files.

| Code state | Command | Result |
|---|---|---|
| A+B, L4 | `harness-one.sh` on the 66 | `OK (66 tests)`: 57 pass and 9 XXX expected failures |
| No fix, L4 | the same | `Tests run: 66, Failures: 2`: MethodStaticArgInference (expected) and **LibraryOverloadFamilies** |
| A+B, L4 | whole system suite, its four shards in sequence (`tmp/q21/sys-shards.sh`, SystemJUTest with `-Dfortress.suite.shard=i/4`) | `OK (155)`, `OK (160)`, `OK (154)`, `OK (160)`: 629, all green |
| A+B, L4 | microGPT quick pair, in sequence (`tmp/mg-seq.sh`) | Flat `VERDICT: 7 PASS, 0 FAIL of 7`, `rc=0`; Apl `7 PASS, 0 FAIL of 7`, `rc=0` |

LibraryOverloadFamilies fails under L4 without the fix:
```
LibraryOverloadFamilies.fss:37:12-62: Failed to find any matching overload, args = (ProdReduction[\ZZ32\]), overload = { distribute(r:MinReduction[\T\]) … distribute(r:MaxReduction[\T\]) …
```
Line 37 is `SumReduction[\ZZ32\].distribute(ProdReduction[\ZZ32\])`.

Results that changed against base:
- `XXXMethodStaticArgRungT` now passes. Under its XXX name it would go red, so I promoted it.
- `LibraryOverloadFamilies` is green on base, red with L4 alone, and green with L4 plus the fix.

Nothing else changed. The first exception line of each of the 9 XXX tests is the same with and without the fix.

### Defects

- **D1 (new):** under walk, an object method with its own `bool` static parameter stops with the `subtypeCompareTo` BoolArg InterpreterBug, written or inferred. Same on base. The compiled path was not run. Proposed row, section 2:
  `| ? | under walk, an object whose method has a bool static parameter of its own stops with 'InterpreterBug: subtypeCompareTo(class com.sun.fortress.nodes.BoolArg class com.sun.fortress.nodes.BoolArg) is not implemented!' at the method's parameter type, also where the call writes the static argument: unflag[\bool b\](f: Flag[\b\]) in object O, O.unflag[\true\](Flag[\true\](7)) | NEGATIVE-VERIFIED | implementation gap (walk) | basic/trait-parameters.tex, "Bool Parameters" | none | generic-method static-argument probe | siblings 21, 307. nodes_util/NodeComparator.java has no BoolArg comparison. The same on 07c83a40a's code. Compiled path not run. |`
  It needs an XXX test (kind 2).
- **D2 (new, sibling of fixed row 567):** a trait's generic method bounded by the trait's parameter gives "Missing type R" at the extending object. Same on base. Proposed row:
  `| ? | under walk, a generic trait's method whose own static parameter is bounded by the trait's parameter stops at the object extending the trait, 'Missing type R': pick[\K extends R\](x: K) in trait Tr[\R\], object Ob extends Tr[\Shape\] | NEGATIVE-VERIFIED | implementation gap (walk) | basic/traits.tex, "Method Declarations" | none | generic-method static-argument probe | sibling of 567 (functional methods, fixed). The same on 07c83a40a's code, before any call. A library bound, or an object's own bound, runs. |`
  It needs an XXX test (kind 2).
- **Row 21:** the probe fix closes its type, size, mixed-width, trait and overloaded-receiver cases. It stays open for the expected type, the generic beside a plain method at load, and bool. Row 364 carries over to methods.
- **F-248 is wrong** where it says "no suite test reaches it": `LibraryOverloadFamilies` reaches it (Q5).

### Decisions

1. I went past the smallest fix (part A) and added part B, because Q3 measured that A alone leaves SumSum broken. No POSITIONS entry covers this.
2. Inference runs in `GenericMethod.evaluationEnv`, not `getWithin()`, because of the empty member environment of trait methods.
3. I promoted the XXX test as `MethodStaticArgInference.fss`. That name is my choice.
4. I ran the whole walk suite on top of the brief's grep set, as the skill asks for a walk Java edit. I ran its shards one after another to keep one JVM at a time.

### For FACTS

- **Walk infers a generic dotted method's own static arguments with a two-file change.**
  - Detail: `DottedMethodApplication.java` +21/−1 and `OverloadedFunction.java` +25/−8 (probe commit `fd7056abf`, not landed).
  - What it means: with L4 it makes the nested reductions answer 11 and 3, keeps the three fused pairs fused, and keeps all 629 walk tests and microGPT's quick pair passing. Part A alone fixes the XXX test and the lone MAX case, not the overloaded SUM case.
  - The test that would fail if this stopped holding: `ProjectFortress/tests/MethodStaticArgInference.fss`.
  - Report sections: Q2, Q3, Q5.
- **L4 without the walk fix breaks the gated test `LibraryOverloadFamilies`.** Its line 37, `SumReduction.distribute(ProdReduction)`, fails "Failed to find any matching overload". This corrects F-248. Report section: Q5.

### Commands I worked out

- `tmp/q21/run-progs.sh <label> [names]` (with `PROGS=progs4` for the second set): each probe under walk, niced and in sequence, writing a summary file.
- `tmp/q21/sys-shards.sh <label>`: testSystem's four shards, one JVM at a time.

### Unresolved

- The worktree's `default_repository/caches` were emptied by my builds ("started again, empty"). The library order is needed before any compiled run or distance stage there.
- I did not measure part A alone on `LibraryOverloadFamilies`; by its shape (an overloaded receiver, like SumSum) it would still fail.
- I did not measure what `Fac.mk()` returned on base.
- The compiled path was not run for D1 or D2.
- Part B re-infers on every overloaded method call (`OverloadedMethod` has no cache). No timing was taken, as the skill forbids walk timings.

### Questions for the curator

1. If the walk fix lands with L4, does it land as A+B, or as A alone? A alone leaves overloaded receivers, and with them `LibraryOverloadFamilies` under L4 (by shape, not measured), failing.
2. Should L4 be held until the walk fix lands, since without it a gated test goes red?

## 8. Part A alone, with L4 (second probe, 2026-10-17)

Probe q21-A: part A of the walk fix alone, with L4 and the checker shadow, in /home/user/fortress-probe-distribute (branch wip/probe-generic-distribute)

**Answer: no.** Part A alone, with L4, does not make the overloaded-receiver cases work, and `LibraryOverloadFamilies` still fails at line 37. Part B (`OverloadedFunction.java`) is needed. Every case still fails where the receiver's `distribute` is an overloaded method set (the inherited generic `distribute[\K\]` beside plain overloads) and only the generic overload fits the argument. All of them fail with "Failed to find any matching overload". In the probe's report this is the case "the same generic beside a plain overload" (section 1). It is also section 2's last bullet ("Part A alone is not enough … over `SumReduction`'s overloaded `distribute`") and section 3's first bullet. The test fails exactly as it does with no fix and L4 (section 5): part A changes nothing for it.

I followed the machine rules: everything under `nice -n 19`, one JVM of mine at a time, each started with 13 to 15 GB available. No timings taken. Neither the count stage nor the distance stage was run.

## Step 1: state recorded
- HEAD was `fd7056abf91822449cddc5dd4e4e4d927ffcc7a8`.
- I saved the uncommitted diff as `/home/user/fortress-probe-distribute/tmp/q21/state-before-q21A.patch` (md5 b7e06aff6ce65e281cd5045d12025894). It touches three files: `Library/FortressLibrary.fss`, `KindEnv.scala` and `STypesUtil.scala`.
- Its Library part is identical to `tmp/q21/L4-lib.patch`, and its `ProjectFortress/src` part to `tmp/q21/checker-shadow.patch`.
- No untracked files outside `tmp/`. Caches were empty: no `bytecode_cache`.

## Step 2: part B removed
- I ran `git restore --source=07c83a40a --worktree` on `OverloadedFunction.java` only. Nothing was staged.
- The diff against `07c83a40a`:
  - Its `interpreter/evaluator/values/` part has the same content as `walk-fix-A-only.patch` (`DottedMethodApplication.java`, +21 −1).
  - Its Library part equals `L4-lib.patch`; its Scala part equals `checker-shadow.patch`.
- **One extra difference:** commit `fd7056abf` also renames `ProjectFortress/tests/XXXMethodStaticArgRungT.fss` to `MethodStaticArgInference.fss` (one line changed). I kept it, since the brief said to reverse only `OverloadedFunction.java`.

## Step 3: build and runs
**Build.** `ant compileAll` gave BUILD SUCCESSFUL and "Caches … started again, empty". All five compiles of the library order exited 0, and all five jars are present (log `tmp/q21/libord-Aonly-q21.txt`).

**a. `LibraryOverloadFamilies.fss` with `harness-one.sh`: FAILS**, "Tests run: 1, Failures: 1".
```
LibraryOverloadFamilies.fss:37:12-62:
Failed to find any matching overload, args = (ProdReduction[\ZZ32\]), overload = {
	distribute(r:MaxReduction[\T\]):... FortressLibrary.fss:3418:5-3419:28
	distribute(r:MinReduction[\T\]):... FortressLibrary.fss:3420:5-3421:28
	distribute[\K\](r:ActualReduction[\R,K\]):PossibleReductionPair[\K\]... FortressLibrary.fss:3233:5-3234:28}:OverloadedMethod
```
- Line 37 is `none = SumReduction[\ZZ32\].distribute(ProdReduction[\ZZ32\])`.
- Line 36, `ProdReduction.distribute(SumReduction)`, passes: a plain overload fits it.
- This is the same message as the earlier no-fix-L4 run (`tmp/q21/q5-nofix-L4.txt`, line 98).

**b. The probe programs** (`run-progs.sh q21-A-L4`, all 19 of `tmp/q21/progs`; summary in `tmp/q21/out/q21-A-L4/SUMMARY.txt`):

| Program | rc | Output |
|---|---|---|
| FuseSumSum (sum of sums over `inits`) | 1 | `SumSum naive over inits: 11`, then the fused call fails at `Library/Generator2.fss:73:94-107` (`distributes` → `r.distribute(q)`): "Failed to find any matching overload, args = (SumReduction[\ZZ32\])", the same three-overload set |
| FuseMaxMax (maximum of maxima) | 0 | `3`, `3` |
| MTraitOver (`Sm[\ZZ32\].distribute(Sm[\ZZ32\])`) | 1 | `MTraitOver.fss:20:32-61: Failed to find any matching overload, args = (Sm[\ZZ32\]), overload = { distribute[\K\](r:Red[\R,K\]):Pair[\K\] …:9:5-59, distribute(r:Mx[\T\]):Pair[\Lifted[\T\]\] …:13:5-73}:OverloadedMethod` |
| DSumSum (`SumReduction.distribute(SumReduction).holds`) | 1 | `DSumSum.fss:10:25-74: Failed to find any matching overload, args = (SumReduction[\ZZ32\])` |
| GSumSum (`distributes(Sum, Sum)`) | 1 | `Generator2.fss:73:94-107: Failed to find any matching overload, args = (SumReduction[\ZZ32\])` |

Everything else passes with the values of the earlier parts-A-and-B run:
- FuseMaxSum 6/6, FuseMinSum 1/1, FuseSumProd 10/10.
- DMaxSum false, GMaxMax false.
- MTraitLone (lone inherited generic, no overload): `none`, `NoPair[ZZ32]`. MTraitPlain: `some`.
- MBoxGenRecv, MBoxObj, MMixed, MPlain, MSize, MSizeVector and MVector are as before.

These outputs match the earlier probe's own A-L4 run (`tmp/q21/out/A-L4`).

**c. The 66 walk test files.** I rebuilt the list with the two greps:
- `grep -lE '\.[A-Za-z_][A-Za-z0-9_]*\[\\'` gives 44 files.
- `grep -lE '^\s+[A-Za-z_][A-Za-z0-9_]*\[\\[^]]*\\\]\s*\('` gives 41 files.
- Their union is 66, identical to `tmp/q21/grep-union.txt`.

I ran all 66 in one `harness-one.sh` JVM: "Tests run: 66, Failures: 1, Errors: 0".
- 56 pass.
- 9 XXX tests show "Saw expected exception": XXXExpectedTypeFixRungT, XXXGenericFunctionalMethodBesidePlainWalk, XXXAbstractMethodGenericBodyWalk, XXXgenericMethod1/2/3, XXXDispatchGenericMethodBesidePlain, XXXCoercionOwnStaticRungK and XXXUniformDistributionRangeType.
- 1 fails: `LibraryOverloadFamilies`, first error line `LibraryOverloadFamilies.fss:37:12-62: Failed to find any matching overload, args = (ProdReduction[\ZZ32\])`.
- `MethodStaticArgInference` passes (REACHED, PASS), so part A covers it.
- For comparison, the earlier parts-A-and-B run had 57 pass and 9 expected failures.

Log: `tmp/q21/q21A-66.txt`.

**d. microGPT's quick pair.** `mg-run.sh` starts both programs at once. To keep to one JVM at a time, I ran its exact per-program commands in sequence with a copy, `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/mg-seq.sh`. The copy has the timing removed, and each program starts only when at least 6 GB is free.
- MicroGptFlatQuick: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, rc=0.
- MicroGptAplQuick: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, rc=0.

Output in `tmp/q21/mg-q21A/`.

## Step 4: answer
- With part A alone and L4, these overloaded-receiver cases fail:
  - `SumReduction.distribute(ProdReduction)`: `LibraryOverloadFamilies` line 37.
  - `SumReduction.distribute(SumReduction)`: DSumSum directly, and GSumSum and FuseSumSum's fused call through `distributes` at `Generator2.fss:73`.
  - `Sm[\ZZ32\].distribute(Sm[\ZZ32\])`: MTraitOver.
- First error line: `LibraryOverloadFamilies.fss:37:12-62: Failed to find any matching overload, args = (ProdReduction[\ZZ32\])`.
- `LibraryOverloadFamilies` does not pass.
- Part A covers the non-overloaded cases: maximum of maxima, the lone inherited generic, the three fused pairs, `MethodStaticArgInference`, and microGPT's quick pair.
- Part B is needed for any receiver whose generic `distribute` sits in an overloaded method set.

## Step 5: worktree restored
- I backed up the run's diff to `tmp/q21/state-q21A-run.patch`, ran `git restore --source=HEAD --worktree -- .`, then `git apply tmp/q21/state-before-q21A.patch`.
- I checked the result against step 1:
  - HEAD is `fd7056abf`.
  - The new `git diff` is byte-identical to `state-before-q21A.patch` (same md5), and still equals `L4-lib.patch` plus `checker-shadow.patch`.
  - The walk sources match `fd7056abf`. Nothing is staged.
- `FileReadWrite.fss`, during run c, wrote an untracked `ProjectFortress/testFile.txt`. It was not there at step 1, so I deleted it. `git status` now shows only the three modified files.
- I also ran `ant compileAll` again (BUILD SUCCESSFUL), so `ProjectFortress/build/` holds `fd7056abf`'s parts A and B again. That build printed "Caches … started again, empty", which is how the caches were at step 1. The library order is needed before any compiled run there.
- The logs and the harness caches (`tmp/q21/h-q21A.cache`, `h-q21A66.cache`) stay under the gitignored `tmp/q21/`.
