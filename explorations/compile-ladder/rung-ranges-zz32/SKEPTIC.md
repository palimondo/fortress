# Skeptic of rung J (climb batch 7R, `rung-ranges-zz32`)

**Verdict: approved, with required corrections.** The library edit is what the report says it is, byte for byte; the count stage and the distance stage reproduce; the new and restated tests pass through the harness; every range over another integer width I tried is refused. The corrections are about the checker fix's reach and the record's wording. The fix picks `∈` for a `case` guard whose type is a trait with `Contains` among its ancestors. For a guard typed by a type variable or by a union of range types it quietly picks `=`, where `Specification/basic/expressions/case.tex:47-51` gives `∈`. The report calls the rule "the specification's rule", and that claim is wider than the code. Four rows are recommended: one for the fix's reach, and three for defects beside the rung that it did not measure.

Worktree `/home/user/fortress-ranges` at `03a06cfa3`, clean. Every capture under `probes/skeptic/` carries its machine line (4 CPUs, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4, `FORTRESS_THREADS=1` unless stated, the load at its start). Rung U ran beside every run.

## 1. The library edit is the script

I copied the base's `Library/` and `ProjectFortress/LibraryBuiltin/` (`git show 26c5d3dd7:…`, 116 files) and ran the rung's `explorations/compile-ladder/rung-ranges-zz32/respell.py` on the copy. It printed its own count checks, and all six library files came out identical with the tree: `RangeInternals.fsi`/`.fss`, `FortressLibrary.fsi`/`.fss` and `Random.fsi`/`.fss` (`cmp`, no difference). The two scripts it calls, `explorations/perf-probes/prelude/distance-triage/variants.py` and `explorations/reviews/numerics-plan-coordinator/probes-C/z32.py`, are unchanged on the branch (`git diff 26c5d3dd7 HEAD -- explorations/reviews explorations/perf-probes` is empty). So the whole library diff is the script's five steps, and the review of the edit is a review of those steps. I read them against the decision; section 12 has the result.

The `FortressLibrary.fsi` diff has two hunks, both inside the range operator block (`:2204-2236`, `:2252-2268`). No public range trait's header or type parameter changes. The one header edit is in the component: `Range` now `excludes { Number, String }` (`Library/FortressLibrary.fss:3708`).

## 2. The recorded failure and pass: the count stage

- **Pre-edit.** `probes/checker-count-preedit.txt` (`#total 22`) was committed in `81ffe33d0`, which carries the two new tests and no library file. It is identical with `explorations/compile-ladder/climb-batch-7/gate/checker-count.txt` (diff empty but for the machine row). So it is what the base printed.
- **Post-edit, my run.** `explorations/coordinator/tools/checker-count/run.sh` on the tree gave `#total 10` (`probes/skeptic/checker-count-skeptic.txt`; machine `probes/skeptic/machine-count.txt`; 33 s, load 2.08). The table is identical with `probes/checker-count-postedit.txt` but for the machine row.
- **What moved.** The `RangeInternals` api's errors went 21 → 9 (row 42 → 18). The 12 that went are all "Invalid overloading of CAP in API RangeInternals" (a tally of `probes/checker-count-preedit-errors.txt` against `checker-count-postedit-errors.txt`). What stays is `IN` 1, `map` 2, `openRangeHelper` 3 and `every`/`atMost` 3. The stage ran from a private scratch cache, so the move is the edit's and not a cache's.
- **Check 10.** The table's `#total 10` equals the total in the report, in `record.md` and in the structured result. `#crash none` did not move, so `expectedCheckerCrash` is not needed.
- **Confirmed against the batch record:** the `FortressLibrary` api still stops at its one early error, `AnyIntegral`'s `comprises` clause (`Library/FortressLibrary.fsi:436`). Its overloading rows therefore do not reach this stage. `CLIMB-BATCH-7R.md` sections 3 and 4 expected them there "since batch 7's H", and on this base that is not so. The worker's reading is right.

## 3. The distance stage

- **My run of the tree.** `explorations/coordinator/tools/distance/run.sh`, setting `any`, took 790 s from load 2.14 (`probes/skeptic/distance-skeptic.txt`). It gave `#total 627` and `DISTANCE SAME 627` against `probes/distance-postedit.txt` (`probes/skeptic/distance-compare-post-skeptic.txt`). Apart from `#seconds` and `#machine` the two tables are identical. The error sites are identical as well: `sort`ed, my `errors.tsv` (`probes/skeptic/distance-skeptic-errors.txt`) and `probes/distance/errors-postedit.txt` do not differ. Against the pre-edit table my run reads `DISTANCE DOWN 940 -> 627` (`probes/skeptic/distance-compare-pre-skeptic.txt`). Every class, kind and unit move the report states matches the tables.
- **Pre-edit.** `compare.sh` gives `DISTANCE SAME 940` between `probes/distance-preedit.txt` and batch 7's landed `explorations/compile-ladder/climb-batch-7/gate/distance.txt`, a table the worker did not make.
- **Library-only, not re-run.** It needs a build without the fix. In its place I compiled the base's `Functionals.scala` alone against the tree's build (`probes/skeptic/sk-base-checker.sh`) and ran my one-library case probe through it (`probes/skeptic/sk-case-op-base.txt`). All eight `case` declarations crash with "Not in the trait table: FortressLibrary.GeneratorZZ32", the crash the library-only table shows at `ExtentScalarRange`.
- **Crash rows: 9 before, 9 after.** They are the same declarations; the two `Character` rows move by the one added line. `ExtentScalarRange`'s crash is not in my table.
- **The five new sites.** I agree that `RangeInternals.fss:145`, `:1399`, `:1407` and `:1415` are unmasked: the base stopped those declarations at their numerals. I also agree that the split `opr ::(l, s)` forms at `FortressLibrary.fss:3982-3984` add 2 errors, whose message the base carried once at `:3983`.
  - The report says `FortressLibrary.fss:3241` (`opr BIG MAXNUM`, class BR) belongs to a family "which varies from run to run". Three runs of this tree put it at the same site: the worker's two and mine. FACTS.md, "The true distance to the switch-over", says it otherwise: rung B "found repeated runs of one setup identical site for site, the varying families BR, V2 and O1 moving between setups".
  - The BR set changed from `{3341, 3234, 3416, 3204, 130, 1535, 1550}` to `{3341, 3234, 3241, 3436, 130, 1550}`. None of these declarations names a range.
  - So the site moves with the setup and is stable between runs of one tree. That makes it a variation-family move caused by the library change as a whole, not by anything range-specific. It is accounted for, but the wording needs fixing (required correction 2).

## 4. The checker fix: which operator it chooses

The worker's evidence for the fix is `probes/CaseProbeJ.fss`, whose two declarations go from crashing to "errors=0". That does not show which operator was chosen. `checkOp` runs under `DummyApplicationErrorFactory` and returns the operator unrewritten when the application fails (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:851-858`), so a wrong choice also reports no error.

So I added one line after the choice that prints it. This is a copy of the tree's `Functionals.scala` compiled alone against `ProjectFortress/build` (`probes/skeptic/sk-instrument.sh`), put ahead of the distance stage's shadow classes (`probes/skeptic/sk-case-op.sh`, the rung's `case-probe.sh` with that one change). I ran it over my own `probes/skeptic/SkCaseGuards.fss`, eight `case` expressions without an operator.

| guard (condition `x: ZZ32` unless named) | base | the fix, one-library world | walk | compiler's world |
|---|---|---|---|---|
| literal `1` | crash | `=` | one | — |
| `1:3` (`CompactFullRange[\ZZ32\]`) | crash | **∈** | low | ∈ (`Range`) |
| a type variable `R extends Range[\ZZ32\]` | crash | **`=`** | in (∈) | **∈** (`R extends Range`) |
| a union, `if b then 1:3 else 5#` | crash | **`=`** | in (∈) | — |
| `g: Generator[\ZZ32\]` | crash | ∈ | in | ∈ (`GeneratorZZ32`) |
| `c: Contains[\ZZ32\]` | crash | ∈ | in | — |
| a range guard with a `Range[\ZZ32\]` condition | crash | `=` | same | — |
| `"abc"` with a `String` condition | crash | `=` | abc | — |

Sources: base `probes/skeptic/sk-case-op-base.txt`; the fix `probes/skeptic/sk-case-op-fix.txt` (each line `@@CASEOP … op=… matchType=… rewritten=…`); walk `probes/skeptic/SkCaseGuards-walk.txt` (identical on the base's library and the tree's); the compiler's world `probes/skeptic/SkCaseGuardsC.fss` with `probes/skeptic/sk-compile-op-C.txt`, which is `fortress compile` with the same instrumented class.

- **What the fix gets right.** Six of the eight are the specification's answer. The range guard gets `∈`, which is what `ExtentScalarRange` needed.
- **Where it falls short.** `case.tex:47-51`: "If the type of the guarding expression is a subtype of type `Contains` and the condition expression does not, the default operator is ∈". A type variable bounded by `Range[\ZZ32\]` is such a subtype, and so is a union of two ranges. The fix answers `=` for both.
  - The cause: `isContainsSubtype` tests `ancestors(tt) + tt` only for a `TraitType` and answers `false` for every other type (`Functionals.scala:875-878`).
  - The compiler's world picks `∈` for the type-variable guard, because `isSubtype` reads the bound (`sk-compile-op-C.txt`, `matchType=R … op=IN`). Walk picks `∈` for both at run time, since it tests the guard's value (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:415`).
  - The `=` is not reported: `rewritten=true` in both lines, since `=` applies to `(ZZ32, R)`. After the switch-over such a program compiles and the clause never matches.
- **What the claims should say.** The report says "This is the specification's rule … It is also walk's own test", and row 476's draft says "which is walk's own test". Both need the narrowing (required correction 1). The defect needs a row (recommended row 1). Its home is the probe, for the reason the crash's home is: no program can yet be compiled against the one library.
- **The team's parameterized form, measured.** I replaced the one-library branch with `isSubtype(t, FortressLibrary.Contains[\<inference variable>\])` (`probes/skeptic/sk-instrument-alt.sh`), the shape of the generator-clause check at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:103-106`. It answers `false` for all eight guards, `Contains[\ZZ32\]` itself included (`probes/skeptic/sk-case-op-alt.txt`), because the two-argument `isSubtype` is `isTrue(analyzer.subtype(…))` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala:282-283`). The worker was right to reject that form, and the team's 2009 note, "not yet supported", still holds.
- **A precedent the report does not cite.** The checker already handles a trait name that one world lacks in a graceful way: an array literal looks `Array` up in the trait table and signals "Type Array is not available" when it is missing (`Misc.scala:806-811`). The worker's branch on `WellKnownNames.areCompilerLibraries()` is a second way. Both are sound; this is not a defect.

## 5. Walk against the compiled run (my program)

`probes/skeptic/SkJDiff.fss`, run with the rung's `cross-path.sh`, walk on the tree's library against the compiled path (`probes/skeptic/SkJDiff-cross-t1.txt`):

| probe | walk | compiled | specification |
|---|---|---|---|
| count of `seq(3#-2)`, `seq(7#0)` | 0, 0 | 0, 0 | `ranges.tex:64-65`: max(0,n) |
| sum of `seq(5:5)`, `seq((-3):2)` | 5, -3 | 5, -3 | `:47` |
| `for i <- seq(1:10), i > 6` sum | 34 | 34 | |
| nested `for i <- seq(0#3)`, `j <- seq(i:2)` count | 6 | 6 | |
| `case 3 of 2:4 => …` | in 2:4 | **outside** | `case.tex:47-51`, `ranges.tex:94` |
| `(1:3) = (1#3)` | true | **false** | `ranges.tex:97-99`: compared as sets |
| `(3:1) = (5:4)` (both empty) | true | **false** | the same |
| `(2:4) = (2:5)` | false | false | |

- **The loops agree.**
- **The two divergences are the compiler library's stubs.** Both fall under rule 4's fourth outcome: the specification settles against the compiled run, and the repair is outside this rung, since the compiler library takes no new declaration before the switch-over (POSITIONS 2026-09-21, the library route).
  - `case 3 of 2:4` is row 479's `IN` stub, `opr IN(x:ZZ32, self): Boolean = false` (`Library/CompilerLibrary.fss:311`). The compiled checker picks `∈` for the range guard (`sk-compile-op-C.txt`), so a compiled `case` over a range guard never matches. Row 479's draft states this "by reading"; it is now measured.
  - Range equality is a second stub two lines below: `opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean = false` (`Library/CompilerLibrary.fss:314`). No row names it, and the rung did not count it beside row 479's stub. Recommended row 2.
- **`SUM` without a static argument.** My first version of the program stopped under walk at `SUM[i <- 1:4] i` with "Unification error: Closure/Constructor for join param 1 (a:BOTTOM)" (`probes/skeptic/SkJDiff-with-sum-cross-t1.txt`). The base's library stops the same way (`probes/skeptic/SkSumPlain.fss`, `SkSumPlain-walk-base.txt`). That is row 424, not this rung.

## 6. Walk, the base's library against the tree's, at 1 and 4 threads

`probes/skeptic/SkJWalk.fss` covers the following:
- the specification's two size examples, `|3:7| = 5` and `|1:100:2| = 50` (`ranges.tex:105-106`);
- a parallel `SUM[\ZZ32\]` over `1:1000`, and an atomic parallel sum over `1:100`;
- a descending strided range `10:1:-3` with its size and `IN`, and the empty `1:10:-1`;
- `(3::2)#4` and two `CAP`s;
- `<` and `=` on ranges;
- the `bounds` getters of 1-, 2- and 3-dimensional arrays, which the edit respelled, with index loops over `m.indices` and `c.indices`.

It was run on both libraries by `probes/skeptic/sk-walk2.sh` (the base as a `-Dfortress.source.path` copy, as the rung's `walk-copy.sh` does) at `FORTRESS_THREADS=1` and `=4` (`probes/skeptic/SkJWalk-t1.txt`, `SkJWalk-t4.txt`). The base's library and the tree's print the same at both thread counts, and the values are the specification's.

My first four-thread run differed on one line. My probe's 3-D index loop wrote a shared variable from a parallel `for` without `atomic`, so the difference was my race and not the library's. With `atomic` both libraries print 36. I did not keep that capture.

The restated lines against the base: the rung's `probes/RestatedLinesProbe.fss` prints `PASS 3 3 CompactFullParScalarRange(1,3) CompactFullParScalarRange(1,3)` on both libraries (`probes/skeptic/restated-lines-base-tree.txt`).

## 7. A range over another width is refused

Ten one-form probes, `probes/skeptic/wide/*.fss`, each with its `.txt`, were run on both libraries.

**Refused on the tree, where the base built them:**

| probe | form | the tree's refusal |
|---|---|---|
| `SkWideHash` | ZZ64 `#` | "Failed to find any matching overload" at the construction |
| `SkWideNN32Colon` | NN32 `:` | the same |
| `SkWideBig` | ZZ `:` | the same |
| `SkWideLeft` | ZZ64 postfix `#` | the same |
| `SkWidePair` | a pair with a ZZ64 component | the same |
| `SkWideSeq` | `seq` over ZZ64 | the same |
| `SkWideOpenRange` | `openRange[\ZZ64\]()` | refused inside the library, at `openRangeHelper` (`Library/FortressLibrary.fss:3961`) |

`openRange[\ZZ64\]()` is the one refusal that is reported at a library position rather than at the user's call.

**Refused on both libraries:**
- `SkWideStride`: a ZZ64 stride on a ZZ32 range;
- `SkWidePartialSize`: a ZZ64 size on a partial range.

**Accepted on the tree, where the base refused it, and quietly wrong:**
- `SkWideUniform`, `UniformDistribution[\ZZ64\](1:3)`.
- The base refuses it: "Unification error: … param 1 ($range:FullScalarRange[\ZZ64\]) got arg CompactFullParScalarRange[\ZZ32\]".
- The tree builds it. `min` and `generate[\ZZ64\]` return `1`, and `typecase … of ZZ64` says it is not a `ZZ64`: a `ZZ32` returned as a declared `T = ZZ64` (`probes/skeptic/wide/SkWideUniform.txt`).
- The cause: `UniformDistribution[\T\](range:FullScalarRange)` no longer ties `T` to its range (`Library/Random.fss:370`, `Library/Random.fsi:258`). The record prescribed this shape ("`UniformDistribution` keeping its own parameter", `CLIMB-BATCH-7R.md` section 3, J, "Files it may touch").
- The report names the typing slip by reading only. This is a loud failure become a quiet value. Recommended row 4 gives a shape that keeps `T` tied: the public `FullRange[\T\]`, which keeps its index type.

## 8. The tests

- **Harness.** The `testSystem` harness (`run-harness.sh`) over `RangeZZ32RungJ`, `XXXRangeWideRungJ`, `RangeSizeRungO`, `XXXRangeBoundsRungO`, `XXXSeqRangeTopRungO`, `XXXRangeEmptyHashRungO`, `RangePrototype` and `rangeOperators` gives "OK (8 tests)"; the four `XXX` files report "Saw expected exception" (`probes/skeptic/harness-skeptic.txt`).
- **The guard test's home-1 assertions,** run on both libraries:
  - on the base, `RangeZZ32RungJ.fss` is refused at its `String` operator pair against `opr #[\I\](r: PartialRange[\I\], size:I)`; on the tree it exits 0 (`probes/skeptic/guard-base-tree.txt`);
  - the base's two-dimensional `openRange` stops with "Generic instantiation (size) mismatch" at `RangeInternals.fss:1485`; the tree prints `OpenRange2D(1,1)` (`probes/skeptic/SkOpen2D.fss`, `SkOpen2D.txt`).
- **Comment lines.** Each new or restated revival test carries one comment line, pointing at the rung's `REPORT.md`, which the gather writes.
- **The restated lines.** They are `XXXRangeBoundsRungO.fss:19-20`, `XXXSeqRangeTopRungO.fss:19`, `:21-22` and `RangeSizeRungO.fss:1`, `:3`, `:10`, `:17`.
  - I read `:20` and `:21-22` as the `ZZ64` lines: they consume the `ZZ64` range, and the record counts the `for` over it among them.
  - `:1` and `:3` are row 452's rename.
  - `RangePrototype.fss` is the one team test changed: 85 lines, the line count unchanged.
- **The compiled expected-failure pair** `XXXRangeInRungJ` has the shape of row 453's pair (`SeqHashBoundsRungOLink.test`, `XXXSeqHashBoundsRungO.test`). `probes/xxx-in-red.txt` shows it red on a local fix of the stub and back.

## 9. Precedent and sibling sites

- **Ranges over `ZZ32`, the dummy device, the `excludes` clause.** The worker found the precedents: `Library/CompilerLibrary.fsi:143`, `:173-174`; `Library/FortressLibrary.fss:3952-3957`, `:1708-1714`, `:2215`, `:2411`, `:2785`, all opened and saying what the report says. The clause follows the one library's `Rank1`-`Rank3` and arrays.
- **Checker names absent from one world.** The report counts three sites: `GeneratorZZ32`, `Character` and `Region`, with `JavaString` unread. The one-library direction is complete. The other direction is not: besides `Region`, the compiler libraries declare none of the following, and the report should give the full count (required correction 3). All of them retire with the compiler library, so no row is needed.
  - `Thread` (`Types.java:101`, `makeThreadType`, used for `spawn` at `Misc.scala:445`);
  - `Generator` (`Types.java:122`, `Misc.scala:106`);
  - `Condition` (`Types.java:145`, `Misc.scala:105`);
  - `Array` and `ImmutableArray` (`Types.java:46`, `:49`).
- **Row 479's stub.** Its sibling, the `=` stub at `Library/CompilerLibrary.fss:314`, is two lines below it (section 5; recommended row 2).
- **The `case` rule the rung edited has a second crash.** An extremum expression, `case most > of …`, calls `Types.makeTotalOperatorOrder` (`Functionals.scala:893-899`), whose body is `NI.nyi()` (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:363-368`).
  - Measured: `probes/skeptic/SkExtremum.fss` prints `most > picks three` under walk. `fortress compile` dies with "java.lang.Error: Not yet implemented" (`probes/skeptic/SkExtremum-cross.txt`).
  - The same line is reached in the one-library world. The specification defines the construct (`Specification/basic/expressions/case.tex:74-115`).
  - `ProjectFortress/tests/caseTest.fss:33-85` uses it under walk only. No ledger row names it (grep for "makeTotalOperatorOrder", "extremum", "case most": none). Recommended row 3.
- **Walk's shared symbolic instantiation (the draft's row 478).** The four probes reproduce as captured. I read `FGenericFunction.java:43-62` and `NodeComparator.java:402-404` as the report does.
  - The report places the row in home 3 and says the chapter is silent. As the chapter stands, `Specification/basic/overloading.tex:100-107` makes every one of the four probe sets a static error, so the three that walk accepts are wrong against the text, and the one it refuses is right by accident.
  - The home-3 placement still holds, since answer 9 (POSITIONS 2026-09-26) removes that sentence and its model is not yet written. The row's text should say so rather than call the text silent (recommended wording in required correction 4).

## 10. Competing names

- `RangeZZ32RungJ`, `XXXRangeWideRungJ`, `RangeSizeRungO`, `XXXRangeInRungJ` and `RangeInRungJLink` are each declared or named only in their own files, across `ProjectFortress/` (every test corpus), `Library/` and `SpecData/`.
- `isContainsType` appears only in `Types.java` and `Functionals.scala`.
- The old name `XXXRangeSizeZZ64RungO` appears only in documents and two earlier rungs' count lists. No gate list names it.

## 11. The record fragment

- **The FACTS line on ranges.** Its counts are true as measured: 22 → 10; 940 → 627 (626 library-only); crash rows 9 → 9; the class moves; 390 / 7 / 4 / 20 of 422.
- **Two statements need correcting:**
  - the `case` sentence, "asks whether the guard's type has `Contains` among its ancestors (`case.tex:47-51`)", implies the specification's rule and needs the narrowing (correction 1);
  - "1 is the BR family, which varies from run to run" (correction 2).
- **One statement stands.** "Under walk, a range over `ZZ64`, `NN32`, `NN64` or `ZZ` stops at its construction" is true for every form I tried (section 7). `UniformDistribution[\ZZ64\]` over a `ZZ32` range is a different matter, a distribution and not a range (recommended row 4).
- **Ledger notes.**
  - Rows 358, 450, 451, 452 and 453 exist, and the notes append without renumbering. The line numbers they cite hold on the tree: `RangeInternals.fss:1379`, `:1381`, `:1383`, `:953-958`, `:1040`, `:1048`, `:1120-1124`, `:1261`-`:1283`; `FortressLibrary.fss:3892-3896`.
  - Row 476's draft needs correction 1. Row 479's draft can cite `probes/skeptic/SkJDiff-cross-t1.txt` for the `case` consequence in place of "By reading".

## 12. The decisions on record

The ranges decision (POSITIONS 2026-09-27, the numerics plans, decision 1), checked clause by clause:
- **`RangeInternals` and the range operators of `FortressLibrary` lose their integer type parameter.** Yes. The script's own check leaves only `checkSelection`, `tupleFlatten`, `openRange` and the two index-typed operators.
- **Multi-dimensional ranges are tuples of `ZZ32` ranges.** Yes (`Range2D`, `Range3D`).
- **The public range traits stay generic in their index type.** Yes.
- **The crash is fixed beside the change.** Yes, for trait-typed guards (section 4).
- **The three expected-failure range tests and `RangePrototype` are restated.** Yes.
- **A range over another integer type becomes a static error, and a wider counter is written as a `ZZ32` loop that widens its index.** Yes, under walk as a dispatch failure (section 7); `RangeZZ32RungJ.fss:87-92` gates the loop.
- **The batch record's other items:** rows 450 and 451 stay open, row 452 closes, and `Character` is left. They are read as the record reads them.
- **Nothing contradicts a decision.** The narrowness in section 4 states the decision's "fixed beside it" more narrowly than the specification the fix cites. That is a correction of the record, not a contradiction.

## 13. The three homes

| defect | home | status |
|---|---|---|
| the base's 2-D `openRange` | 1 | asserted at `RangeZZ32RungJ.fss:94`; fails on the base (`SkOpen2D.txt`), passes on the tree (`harness-skeptic.txt`) |
| `Range` not excluding `String` | 1 | asserted at `:95-96`; refused on the base (`guard-base-tree.txt`), passes on the tree. As the worker says, walk's check needs a fresh analysis of `FortressLibrary`, so a warm `testSystem` shard may not exercise it; `rangeOperators.fss` holds it too |
| the `CAP` and integer families, row 358 | 1 | the count table; reproduced |
| row 452 | 1 | `RangeSizeRungO.fss` passes; `XXXRangeWideRungJ.fss` is an expected failure at the construction |
| the compiled `IN` stub | 2 | the `XXX` pair; red on a local fix (`probes/xxx-in-red.txt`) |
| walk's shared symbolic instantiation | 3 | four probes with captures; a row (correction 4 on its wording) |
| the `GeneratorZZ32` crash | 3's form | the case probe and the distance crash row; reproduced from the base's rule (`sk-case-op-base.txt`) |
| the `Character` crash | 3 | the five rows of the distance tables; reproduced in mine |
| **the fix's `=` for type-variable and union guards** (mine) | 3's form, as the crash | `SkCaseGuards.fss` with `sk-case-op-fix.txt`, `SkCaseGuards-walk.txt`, `SkCaseGuardsC.fss` with `sk-compile-op-C.txt`; recommended row 1 |
| **the compiled `=` stub on ranges** (mine) | 2 by the specification; deferred like row 479 | `SkJDiff.fss` with `SkJDiff-cross-t1.txt`; recommended row 2 |
| **the extremum `case`'s `NI.nyi()`** (mine) | 2 by the specification | `SkExtremum.fss` with `SkExtremum-cross.txt`; recommended row 3 |
| **`UniformDistribution[\T\]` no longer tied to its range** (mine) | 3 (a library typing slip the specification does not address) | `wide/SkWideUniform.fss` with `.txt`; recommended row 4 |

## 14. Loud to quiet

- **The checker crash.** In the one-library world it becomes an operator choice. For trait-typed guards the choice is the specification's.
  - For a guard typed by a type variable bounded by a `Contains`, or by a union of `Contains` types, the value is `=`. The specification's value is `∈`, and walk and, for the type variable, the compiler's world give `∈`.
  - Nothing reports it. A compiled program would run with a clause that never matches.
  - Today no program is compiled against the one library, so no run shows it yet.
- **`UniformDistribution[\ZZ64\]`.** Its unification error under walk becomes a `ZZ32` value returned as a declared `ZZ64`.
- **In the other direction, as intended.** A range over `ZZ64`, `NN32` or `ZZ` goes from running to "Failed to find any matching overload" at its construction; `openRange[\ZZ64\]()` fails inside the library.

## 15. Thread counts

- The walk probes of section 6 ran at 1 and 4 threads. That covers parallel range loops, a parallel `SUM` and `atomic` accumulation, since the range bodies step local variables.
- The other probes ran at 1: the edit changes no mutable state, transaction or library write.
- The compiled runs ran at 1.

## 16. The microGPT checks

Re-run on the tree from empty private caches with the rung's `mg-run.sh`, both at once, `FORTRESS_THREADS=1`, from 09:06Z at load 2.80:
- `MicroGptFlatCheck` reports "40 PASS, 0 FAIL of 40" in 791 s, and `MicroGptAplCheck` the same in 835 s (`probes/skeptic/mg-skeptic-MicroGptFlatCheck.txt`, `mg-skeptic-MicroGptAplCheck.txt`).
- With the machine line, the Rats! temporary paths, the `total` line and the `(N ms)` timings masked, both outputs are identical to the worker's base runs and to its edit runs (`probes/skeptic/mg-compare-skeptic.txt`, 0 differing lines in each of the four comparisons). Every printed loss and gradient value is unchanged.
- The times are not a comparison: the worker's runs were made under other loads.

## Stops

None of the stops the batch record reserves for Pavol is met:
- every changed walk output in the comparison is accounted for;
- `RangePrototype.fss` is the only team test changed;
- the restated revival lines are their `ZZ64`/`NN32` lines and row 452's rename;
- no public range trait's type parameter is removed;
- no file the count or distance stages shadow is edited, and `StaticChecker.java`, `interpreter/` and the `Character` site are untouched;
- no compiled test's verdict changes in the subset or in the `case` tests;
- the one CAUSED distance site is a BR move, accounted for as a variation family (correction 2 fixes its wording);
- no line of `explorations/run-c4/src/` or `explorations/apl/mg/` is touched.

## Required corrections

1. **The checker fix's reach.** Required in REPORT.md section 4 ("This is the specification's rule … It is also walk's own test"), section 5, the FACTS line's `case` sentence and row 476's notes ("which is walk's own test").
   - State what the one-library branch tests: the guard's type when it is a trait type, and that type's ancestors. For any other type, a type variable or a union among them, it answers `=`.
   - State that for a type variable bounded by a `Contains`, or a union of `Contains` types, this differs from `case.tex:47-51`, from walk (`Evaluator.java:415`, on the value) and, for the type variable, from the compiler's world.
   - Cite `probes/skeptic/sk-case-op-fix.txt`, `SkCaseGuards-walk.txt` and `sk-compile-op-C.txt`.
   - Open recommended row 1 for it, homed in those probes as the crash is.
2. **The BR site.** In REPORT.md section 6 and the FACTS line, replace "a family that varies from run to run" / "which varies from run to run" at `FortressLibrary.fss:3241`.
   - The replacement: the BR family moves between setups and is identical between runs of one setup (FACTS.md, "The true distance to the switch-over", rung B's finding). This site is the same in three runs of the tree, the worker's two and `probes/skeptic/distance-skeptic-errors.txt`, and its declaration names no range.
3. **The sibling count.** In REPORT.md section 3, "there are three sites" is incomplete in the compiler world's direction. Add `Thread` (`Types.java:101`, `Misc.scala:445`), `Generator` (`Types.java:122`, `Misc.scala:106`), `Condition` (`Types.java:145`, `Misc.scala:105`), and `Array` and `ImmutableArray` (`Types.java:46`, `:49`), which the compiler libraries do not declare, or say that the count covers only the one-library direction.
4. **Row 478's specification column.** Say that `overloading.tex:100-107` makes every one of the four probe sets an error, so walk's acceptance of three of them is wrong against the text as it stands. Say that the row is home 3 because answer 9 (POSITIONS 2026-09-26) removes that sentence and its model is not yet written, not because the text is silent.

## Recommended rows

Numbered provisionally after rung J's 476-479; the gather assigns the numbers. Paths under `compile-ladder/` are relative to `explorations/`.

1. **The one-library `case` rule's reach (required to open, correction 1).**
   - Claim: in the one-library world the compiled checker's `case` without a comparison operator picks `=` for a guard typed by a type variable bounded by a `Contains`, or by a union of `Contains` types, where the specification gives ∈.
   - Mechanism: rung J's rule tests `ancestors(tt) + tt` for `Contains` only when the guard's type is a `TraitType`, and answers `false` otherwise (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:871-878`, `Types.isContainsType` at `ProjectFortress/src/com/sun/fortress/compiler/Types.java:133-139`).
   - Instances: for `varGuard[\R extends Range[\ZZ32\]\](r: R, x: ZZ32) = case x of r => … end`, and for a guard `(if b then 1:3 else 5#)` of type `OR(LeftRange[\ZZ32\],CompactFullRange[\ZZ32\])`, it chooses `=`. `=` applies to `(ZZ32, R)` without error, so the clause would never match in a compiled program.
   - Status: NEGATIVE-VERIFIED. Class: checker defect. Specification: `Specification/basic/expressions/case.tex:47-51`.
   - Reproducer: `compile-ladder/rung-ranges-zz32/probes/skeptic/SkCaseGuards.fss` with:
     - `sk-case-op-fix.txt`: `op==` for `matchType=R` and for the union;
     - `SkCaseGuards-walk.txt`: walk prints `in in` for both;
     - `SkCaseGuardsC.fss` with `sk-compile-op-C.txt`: the compiler's world, `op=IN` for `matchType=R`;
     - `sk-case-op-base.txt`: every one crashed before rung J;
     - `sk-case-op-alt.txt`: the team's parameterized form answers `false` for every guard.
   - Found by: ours (climb batch 7R, rung J's skeptic, 2026-09-28).
   - Fix: in the same helper, answer a type variable through its declared bounds, a union through all its members, an intersection through any member.
   - Home: the probe, as row 476's is, since no program is compiled against the one library before the switch-over.
2. **The compiled path's range equality.**
   - Claim: on the compiled path every range equality is `false`. The compiler library declares `opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean = false` (`Library/CompilerLibrary.fss:314`), two lines below row 479's `IN` stub (`:311`). `(1:3) = (1#3)` and `(3:1) = (5:4)` print `false` compiled and `true` under walk.
   - Status: NEGATIVE-VERIFIED. Class: library bug (the compiler prelude against the specification). Specification: `Specification/basic/expressions/ranges.tex:97-99` (ranges compare as sets of integers with `=`).
   - Reproducer: `compile-ladder/rung-ranges-zz32/probes/skeptic/SkJDiff.fss` with `SkJDiff-cross-t1.txt`.
   - Found by: ours (climb batch 7R, rung J's skeptic, 2026-09-28).
   - Notes: the compiler library takes no new declaration before the switch-over (POSITIONS 2026-09-21, the library route), and the one library's `=` replaces this one then. The gated expected failure, if wanted before, is row 479's two-file shape asserting `(1:3) = (1#3)`.
3. **Extremum expressions on the compiled path.**
   - Claim: `case most > of … end` stops the compiled checker with `java.lang.Error: Not yet implemented`. The `case` rule's extremum branch calls `Types.makeTotalOperatorOrder` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:893-899`), whose body is `NI.nyi()` (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:363-368`), in both worlds. Walk runs it and prints `most > picks three`.
   - Status: NEGATIVE-VERIFIED. Class: checker gap. Specification: `Specification/basic/expressions/case.tex:74-115`.
   - Reproducer: `compile-ladder/rung-ranges-zz32/probes/skeptic/SkExtremum.fss` with `SkExtremum-cross.txt`.
   - Found by: ours (climb batch 7R, rung J's skeptic, 2026-09-28).
   - Notes: `ProjectFortress/tests/caseTest.fss:33-85` uses extremum expressions under walk; no compiled test does. Neither library declares a `TotalOperatorOrder`. The gated expected failure is an `XXX` compiled test of `SkExtremum`'s shape.
4. **`UniformDistribution[\T\]` under walk.**
   - Claim: `UniformDistribution[\T\]` returns `ZZ32` values as a declared `T` for any `T`. Since rung J it takes `range:FullScalarRange`, a `ZZ32` range, and its own `T` is no longer tied to it (`Library/Random.fss:370`, `Library/Random.fsi:258`). `UniformDistribution[\ZZ64\](1:3)` builds, and `min` and `generate[\ZZ64\]` return `1`, which `typecase … of ZZ64` says is not a `ZZ64`. On the base the same call was refused with a unification error.
   - Status: NEGATIVE-VERIFIED. Class: library defect (a declared type its body does not meet). Specification: none on the object; the ranges are `ZZ32` by the ranges decision (POSITIONS 2026-09-27, the numerics plans, decision 1).
   - Reproducer: `compile-ladder/rung-ranges-zz32/probes/skeptic/wide/SkWideUniform.fss` with `SkWideUniform.txt`.
   - Found by: ours (climb batch 7R, rung J's skeptic, 2026-09-28).
   - Notes: only `ProjectFortress/tests/RandomTest.fss:53`, `:69` and `:85` instantiate it, at `ZZ32`. The fix is one of two:
     - take the public `FullRange[\T\]`, which keeps its index type, so that `T` is the range's own element type again (whether the body's `|range|` and `range[i]` check through it is to be measured);
     - or drop `T` for `ZZ32`, which changes three lines of the team's `RandomTest`.
