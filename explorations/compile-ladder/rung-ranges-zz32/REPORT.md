# Rung J: scalar ranges over ZZ32 (climb batch 7R, `rung-ranges-zz32`)

problem: the integer family of the compiled checker's errors over the one library, 276 of the distance stage's 940, most of them in the range code generic over `I`, and the count stage's `RangeInternals` row of 42 (`explorations/reviews/numerics-plan-coordinator/measure-C.md:91-173`; `explorations/compile-ladder/rung-ranges-zz32/probes/checker-count-preedit.txt:9`)
spec: `Specification/basic/expressions/ranges.tex:42-72` (explicit ranges of "integer values", no width named), with `Specification/basic/conversions-coercions.tex:363-365` ("types named by type parameters *do not have coercions*"); for the checker fix `Specification/basic/expressions/case.tex:47-51`
precedent: the compiler library's ranges over `ZZ32` alone (`Library/CompilerLibrary.fsi:143`, `:173-174`); the team's own "Actually want" operators without the dummy (`Library/FortressLibrary.fss:3952-3957`); the library's `excludes { Number, String }` on `Rank1`-`Rank3` and the arrays (`Library/FortressLibrary.fss:1708-1714`, `:2411`); walk's own `Contains` test of a `case` guard (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:415`)
deviation: the dummy `0 asif ZZ32` arguments and the helpers' throwaway parameters are removed, where measurement C's shadow kept them (`Library/FortressLibrary.fss:3904-3950`, `Library/RangeInternals.fss:1377-1440`); `Range` excludes `String` as well as `Number`, in the component only as the team placed `Number` (`Library/FortressLibrary.fss:3708`); the `case` site tests the guard's ancestors for `Contains` in the one-library world, where the team's commented form asks for a `Generator` with an inference variable (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:871-878`); the split two- and three-dimensional `opr ::(l, s)` keep the team's body `(l:):s` (`Library/FortressLibrary.fss:3982-3984`); the specification's ranges speak of any integer, the library now takes `ZZ32` only, which rung U writes (`Specification/basic/expressions/ranges.tex:42-44`)
historical: `Library/RangeInternals.fsi`, `Library/RangeInternals.fss`, `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`, `Library/Random.fsi`, `Library/Random.fss`, `ProjectFortress/src/com/sun/fortress/compiler/Types.java`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`, `ProjectFortress/tests/RangePrototype.fss` (the line ranges are in section 4; the first line the rung edits is `Library/RangeInternals.fsi:14`)

## 0. What was inherited, and what was re-verified

The batch was relaunched. The branch held four commits of the earlier attempt:
- `81ffe33d0`: the two new tests and the pre-edit count;
- `964fb32fd`: the rename of `XXXRangeSizeZZ64RungO.fss` alone;
- `ff8c43834`: the library edit, the restated tests and the base captures;
- `db29d9f1e`: the checker fix, with the three distance tables, the count tables and the probe captures.

The worktree held the base's `Library/` and the base's four test files, restored for the comparison's third pass (base B), which had finished with 422 logs. It also held uncommitted script changes and captures: the demo and microGPT comparisons and `rangeOperators`'s trace. The harness refused this session's write of this file and of `record.md`; the gather writes both from the rung's structured result, and the lists handed to Pavol are also in `probes/lists-for-pavol.txt`.

Re-verified by this session, not taken from the logs:
- The tree put back at the edit; `git diff 26c5d3dd7 -- Library` equals the committed edit.
- The count stage, run again on the tree: the same table, total 10 (`probes/checker-count-postedit-rerun.txt`).
- The distance stage, run again on the tree: 627, with its `errors.tsv` identical site for site to the committed one (`probes/distance-postedit-rerun.txt`; 842 s, load 2.65 at the start).
- The pre-edit tables against the base's landed gate:
  - the count table is identical to `explorations/compile-ladder/climb-batch-7/gate/checker-count.txt`;
  - the distance table gives `DISTANCE SAME 940` against `explorations/compile-ladder/climb-batch-7/gate/distance.txt`.
- The case probe after the fix, on the re-run's shadow classes (`probes/case-probe-fix-rerun.txt`).
- The comparison, computed from the three passes' logs (`probes/passes/compare-3pass.txt`, `unstable-3pass.txt`). The passes themselves are the earlier attempt's runs (one JVM per test, private caches), whose logs were on disk.
- The five demos whose exit code differed at the 120 s cut, re-run to the end on both libraries (`probes/demos/rerun-compare.txt`). The earlier attempt's re-runs had been killed at 324 s and were discarded.
- The guard test, the refusal test, the four restated files and `rangeOperators`, through the `testSystem` harness on the final tree: 7 of 7 OK (`probes/harness-final.txt`).

Taken from the earlier attempt's committed captures and not re-run:
- the pre-edit and library-only distance runs (the latter needs the build without the fix);
- the microGPT checks (37 to 40 minutes each);
- the ladder subset;
- the compiled `case` tests;
- the base runs of the new tests;
- `rangeOperators`'s trace, which is re-read in section 7, with its cause established by reading and by four new probes.

New in this session:
- `rangeOperators`'s cause (section 7);
- the guard test's two `String` operators (home 1);
- the walk probes of the shared bound (home 3);
- the cross-path probe and the compiled expected-failure test of `IN` on a range (home 2);
- this report and the record.

## 1. The answers this rung follows

Section 1 of `explorations/coordinator/CLIMB-BATCH-7R.md` asks no question. Read from the record:
- rows 450 and 451 stay open: their tests are restated and still fail at their `ZZ32` lines;
- row 452 closes: its test is restated and promoted to a plain test;
- the `Character` crash is left for batch 8 or later.

## 2. Where the fix belongs

- **The ranges** belong in the one library's range code: `Library/RangeInternals.fsi`/`.fss` and the operator block of `Library/FortressLibrary.fsi`/`.fss`.
  - The map's ranges row places the interpreter site in the `FortressLibrary.fsi` range traits and `RangeInternals.fss` (`explorations/coordinator/map/spec-to-implementation.md:257`).
  - The compiled path's own ranges are in `CompilerLibrary`, which the library route closes to new declarations (POSITIONS 2026-09-21, the library route).
  - Nothing in the interpreter's Java or the checker needs to change for the ranges themselves: the checker already takes a `ZZ32` parameter through the library's coercion, and walk dispatches on the declared types.
- **The crash** belongs in the checker's `case` rule, `Functionals.scala`'s `SCaseExpr`; the map's `case` row places the checker site there (`spec-to-implementation.md:248`).
  - That rule asks `Types.makeGeneratorZZ32Type` (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:129-131`) for a trait that only the compiler library declares (`Library/CompilerLibrary.fsi:111`).
  - The desugarer only reads the operator the checker chose (`compiler/desugarer/CaseExprDesugarer.java:89`), so the fix belongs at the choice.

## 3. Precedent search

**Ranges over `ZZ32`.** Three precedents:
- the compiler library: `trait Range extends GeneratorZZ32 excludes { Number, String, Boolean, Character }`, `opr :(lo:ZZ32, hi:ZZ32): Range` and `opr #(lo:ZZ32, sz:ZZ32): Range` (`Library/CompilerLibrary.fsi:143`, `:173-174`);
- the one library's own comment on what its point operators "Actually want", `opr (x:I)#[\I\] : LeftRange[\I\] = LeftRange[\I\](x)` and three more, with no dummy (`Library/FortressLibrary.fss:3952-3957`);
- measurement C's shadow, `explorations/reviews/numerics-plan-coordinator/probes-C/z32.py` ("a measurement shadow, not a proposed edit"), which the edit runs unchanged as its step 2 (section 4).

**The dummy device.** The base has one way:
- 18 calls with 36 `0 asif ZZ32` arguments, "to ensure that the result type is at least ZZ32" (base `Library/RangeInternals.fss:1420-1421`, `Library/FortressLibrary.fss:3905-3981`);
- the array getters' 12 literal `0` arguments in 6 calls.

The library's comment names the way it wanted instead.

**An overload pair of a range and a string.** Four places already exclude it:
- the one library's `Range` excludes `Number`, with the team's comment "Important or the strided factories can't overload!" (base `Library/FortressLibrary.fss:3708`);
- the compiler library's `Range` excludes `{ Number, String, Boolean, Character }` (`Library/CompilerLibrary.fsi:143`);
- the one library's `Rank1`-`Rank3` exclude `{ …, Number, String }` (`Library/FortressLibrary.fss:1708-1714`; api `Library/FortressLibrary.fsi:1143-1149`);
- the arrays exclude `{ Number, String }` (`Library/FortressLibrary.fss:2215`, `:2411`, `:2785`).

The api writes the clause for `Rank` and the arrays but none for `Range` (`Library/FortressLibrary.fsi:2095`): the team placed `Range`'s exclusion in the component only.

**The crash's site.** Four precedents:
- the team's stopgap: "It should use a parameterized Generator type but it is not yet supported. Instead, we use GeneratorZZ32 for now" (525264af1, 2009-10-02), with `Types.makeGeneratorType(NF.make_InferenceVarType(span))` left commented beside each use (now `Functionals.scala:874`);
- the checker already builds that parameterized form for a generator clause (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:103-106`);
- the world switch re-points four names between the two libraries, `STRING`, `JAVASTRING`, `EXCEPTION` and `CHECKED_EXCEPTION` (`Types.java:77-88`), and `WellKnownNames.areCompilerLibraries()` tells the worlds apart (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:141-143`);
- walk's own rule for a `case` without an operator asks whether the guard's value extends the generic trait `Contains` (`Evaluator.java:415`, `Glue.extendsGenericTrait(match.type(), WellKnownNames.containsTypeName)`).

**The same defect elsewhere.** The defect is a type the checker names that one world's library does not declare. Counted over `Types.java`'s makers and statics and their uses in `scala_src/`, there are two sites in the one-library direction, `GeneratorZZ32` and `Character`, and in the compiler world's direction `Region` and the five of the last bullet:
- `makeGeneratorZZ32Type`, used once (`Functionals.scala:873`): fixed here for the one-library world.
- `Types.CHARACTER` (`Types.java:65`), used for every character literal (`Misc.scala:464`). It crashes five declarations of the one library and is left for batch 8 or later (a new row, section 10).
- `Types.REGION` (`Types.java:70`, `FortressLibrary.Region`), used for an `at` expression (`Misc.scala:424`). The compiler library does not declare it: the reverse direction, reached by no test here.
- In the same reverse direction, the compiler libraries declare none of `Thread` (`Types.java:101`, `makeThreadType`, used for `spawn` at `Misc.scala:445`), `Generator` (`Types.java:122`, `Misc.scala:106`), `Condition` (`Types.java:145`, `Misc.scala:105`), and `Array` and `ImmutableArray` (`Types.java:46`, `:49`). All of them retire with the compiler library, so no row is opened for them.

`Types.JAVASTRING` is re-pointed to a name the one library does not declare either, but nothing outside `Types.java` reads it (grep of `ProjectFortress/src`).

## 4. The edit

**The library.** Files and lines:
- `Library/RangeInternals.fsi` and `.fss`, whole;
- `Library/FortressLibrary.fsi:2206-2265`;
- `Library/FortressLibrary.fss:2128`, `:2154`, `:2414`, `:2506`, `:2795-2796`, `:2877-2878`, `:3708`, `:3904-3984`;
- `Library/Random.fsi:49`, `:51`, `:258`, and `Random.fss:55`, `:58`, `:370`.

The edit is made by `explorations/compile-ladder/rung-ranges-zz32/respell.py`, and every step asserts its count:
1. **Row 358's bounds aligned.** The range parameters bounded `AnyIntegral`, or unbounded, in the component are made `Integral[\I\]` as in the api (`explorations/perf-probes/prelude/distance-triage/variants.py BOUNDS`, unchanged), so that step 2 finds the same parameters on both sides.
2. **Measurement C's `z32.py`, unchanged.**
   - Every static parameter of `RangeInternals` and of `FortressLibrary`'s operator block that is bounded `Integral[\X\]` or `AnyIntegral` is removed and its name replaced by `ZZ32`: 95 declarations and 173 parameters in each `RangeInternals` file, 18 and 36 in each `FortressLibrary` file.
   - Every written static argument list of those names is shortened: in `RangeInternals`, in `FortressLibrary`'s bounds getters and `zeroIndices`, and in `Random`.
   - The three point operators `opr (x:I):[\I\]`, `opr (l:I)::[\I\]` and `opr ::[\I\](l:I,s:I)` are split into the `ZZ32`, pair and triple shapes that `#` and `:` have.
3. **The dummy device dropped.** Removed: the 18 helpers' throwaway first parameters (`_:ZZ32` after step 2), in api and component; the operators' 36 `0 asif ZZ32` arguments; the array getters' 12 leading `0` arguments. The two doc comments that describe the device now read "Helpers for #." and "Helpers for :." (`Library/RangeInternals.fss:1377`, `:1385`).
4. **The team's comment restored** at `Library/Random.fss:54`, which step 2 had rewritten.
5. **`Range` excludes `{ Number, String }`** in the component (`Library/FortressLibrary.fss:3708`); see section 7.

**What stays generic, and why:**
- The public range traits (`Range`, `PartialRange`, …, `StridedFullRange`): their parameter is an index type, which the arrays and the two- and three-dimensional ranges instantiate at tuples (the decision).
- `openRange[\I\]()`, `opr :[\I\](r: Range[\I\], stride:I)`, `opr :[\I\](r: FullRange[\I\], stride:I)` and `opr #[\I\](r: PartialRange[\I\], size:I)`: their `I` is that index type.
- `RangeInternals`' `checkSelection[\R extends Range[\I\], I\]`, which the public traits call with their own `I`.
- `tupleFlatten[\I,J,K\]`, a tuple utility with no bound.
- `UniformDistribution[\T\]`, which `ProjectFortress/tests/RandomTest.fss:53`, `:69` and `:85` instantiate at `ZZ32`.

**Checks after the edit:**
- No parameter bounded `Integral` or `AnyIntegral` is left in either `RangeInternals` file (grep: 0 and 0).
- A written static argument of a `RangeInternals` name appears nowhere in `Library/`, `ProjectFortress/LibraryBuiltin/`, the tests, the demos, `explorations/run-c4/src/` or `explorations/apl/mg/`, except `checkSelection`'s three calls in the public traits (grep over the 77 names of the base api).
- No body's algorithm changes. Every body is the base's with `I` read as `ZZ32`, including the devices that made a value of type `I` (`xx = x-x`, `Library/RangeInternals.fss:1400`).

**Decisions inside the rung**, each with the ways not taken:
- *The dummy arguments are gone, and the helpers' throwaway parameters with them.*
  - Ways: keep them, as measurement C did (the checker refuses each: class I2, 18 on the base); respell them as the operators' own first arguments (measurement C's tree 1); or drop them, as the library's comment wants.
  - With `ZZ32` in every position there is no instantiation left to force, so the device has no job: dropped.
  - Measured: I2 went 20 → 2. The 2 left are `List.fss`'s `fill` pair, not the device.
- *The point operators are split into three shapes, as `#` and `:` are.*
  - The way not taken: keep them generic (`opr (x:I):[\I\]`), which after batch N would bind `I` to the numeral's own type and build a `LeftRange` over it.
  - Split, as measurement C did, so that a numeral meets a `ZZ32` parameter and the library's coercion.
- *The two- and three-dimensional `opr ::(l, s)` keep the team's body `(l:):s`.*
  - The checker cannot apply `opr :[\I\](r: Range[\I\], stride:I)` to `(LeftRange[\…\], …)` in any shape. It failed once on the base, at the generic form (base `Library/FortressLibrary.fss:3983`), and fails once per form after (`:3982-3984`). So the split adds two errors of the message the base already had.
  - Ways not taken: keep the one generic form (one error, but batch N's numeral problem above); or write the bodies through `leftScalarRange` and `LeftRange2D`/`LeftRange3D` directly (the team's "Actually want" form, which would also type as the declared `LeftRange`). That is a body change belonging to the range methods' declared-type family (RG), batch 8's by the record's section 5.
  - Kept, and counted in section 6.
- *`openRangeHelper` keeps its three arrow-typed overloads.*
  - Its device is batch 7b's rung L's (the record's section 5).
  - After the edit its three overloads read `()->ZZ32`, `()->(ZZ32,ZZ32)` and `()->(ZZ32,ZZ32,ZZ32)`, and the checker still refuses them as a family: 3 on the count stage and 6 on the distance stage, as before.
  - `openRange[\I\]()` is unchanged.
- *`Range` excludes `String` in the component only* (section 7).
- *`UniformDistribution[\T\](range:FullScalarRange)` keeps its own parameter*, as the brief asks. Its body, `just range.lower` for a declared `Just[\T\]`, is now typed `ZZ32` against `T` for any `T` other than `ZZ32`; only `RandomTest` instantiates it, at `ZZ32`.
- *The tests' names:*
  - the refusal test `XXXRangeWideRungJ.fss`;
  - the guard test `RangeZZ32RungJ.fss`;
  - row 452's test renamed `RangeSizeRungO.fss`, keeping its provenance in the name and dropping the `XXX` and the width;
  - the compiled test `XXXRangeInRungJ.fss`, with `RangeInRungJLink.test` and `XXXRangeInRungJ.test`.

**The checker fix.** Files and lines: `ProjectFortress/src/com/sun/fortress/compiler/Types.java:133-139`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:15` and `:866-883`.
- In the compiler's world the test is unchanged, `isSubtype(t, Types.makeGeneratorZZ32Type(span))`, with the commented parameterized form kept beside it.
- In the one-library world (`WellKnownNames.areCompilerLibraries()` false), the rule asks whether the guard's type and the condition's type, or one of their ancestors, is an instance of the generic trait `Contains`.
  - `Types.isContainsType` compares the trait's name with `fortressLibrary() + "." + containsTypeName`.
  - A type that is not a trait type answers false.
- The operator is then chosen as before: `IN` when the guard is a `Contains` and the condition is not, `=` otherwise.
- For a guard whose type is a trait type this is the specification's rule: "If the type of the guarding expression is a subtype of type `Contains` and the condition expression does not, the default operator is ∈; otherwise, it is =" (`Specification/basic/expressions/case.tex:47-51`). The one-library branch tests the guard's type only when it is a trait type, and that type's ancestors, and answers `=` for any other type.
  - For a guard typed by a type variable bounded by a `Contains`, or by a union of `Contains` types, it picks `=`. That differs from `case.tex:47-51`, which gives ∈; from walk, which tests the guard's value (`Evaluator.java:415`) and picks ∈; and, for the type variable, from the compiler's world, whose `isSubtype` reads the bound and picks ∈ (the skeptic's `probes/skeptic/sk-case-op-fix.txt`, `SkCaseGuards-walk.txt`, `sk-compile-op-C.txt`).
  - `=` applies to such a guard without error, so nothing reports it, and a compiled clause of that shape would never match. Row 480 holds it, homed in those probes as the crash is (section 10).
- The edit outside the `case` rule's lines is the import of `WellKnownNames` at `Functionals.scala:15` and the helper in `Types.java`.
- Ways not taken:
  - re-pointing `makeGeneratorZZ32Type` to `Generator[\ZZ32\]` in the one-library world: a `Generator` is not what the specification asks, and a `Contains` that is not a `Generator` would get `=`;
  - the team's parameterized form against an inference variable: `Generator` again, and the team's own note that it is not supported;
  - a static re-pointed by `useFortressLibraries()`: the one library has no non-generic counterpart of `GeneratorZZ32`, and `Contains[\T\]` needs its argument.
- `Types.CHARACTER` is not touched.

## 5. What the specification settles

- **The ranges' width: nothing.**
  - "Assume that a, b, and c are expressions that produce integer values" (`Specification/basic/expressions/ranges.tex:42-44`; read `:37-110`). The sets are at `:47`, `:54-56` and `:64-65`, and the size at `:103-106`.
  - The draft's own examples build `ZZ64` and `ZZ` ranges (FACTS.md, "The specification never wrote static-argument inference, a numeral's type hierarchy or a range's integer width").
  - The decision settles the width (POSITIONS.md, 2026-09-27, the numerics plans, decision 1), and rung U writes it into the chapter.
- **Why generic range code cannot be checked.** "Types named by type parameters *do not have coercions*" (`Specification/basic/conversions-coercions.tex:363-365`; read `:267-387`), so a numeral never becomes an `I`. A `ZZ32` parameter takes a numeral through the library's coercion.
- **The `case` rule**: `Specification/basic/expressions/case.tex:47-51` (read `:25-75`), quoted above. The fix follows it in the one-library world for a guard whose type is a trait type. For a guard typed by a type variable bounded by a `Contains`, or by a union of `Contains` types, it answers `=` where the rule gives ∈, as walk (`Evaluator.java:415`, on the value) and, for the type variable, the compiler's world do not (section 4; `probes/skeptic/sk-case-op-fix.txt`, `SkCaseGuards-walk.txt`, `sk-compile-op-C.txt`; row 480).
- **`Range` and `String` excluding each other**: "If a trait T excludes a trait U, the two traits are mutually exclusive … the exclusion relation is symmetric" (`Specification/basic/traits.tex:223-233`; read `:215-260`).
- **Whether a `String` operator may overload a generic range operator: not settled by the text as it stands.**
  - `Specification/basic/overloading.tex:100-107` makes it "an error for their static parameters to differ … or for one declaration to have static parameters and another to not have them". Every such set in the library breaks this, for example `opr #()` beside `opr #[\I\](r: PartialRange[\I\], size:I)`, on the base as after.
  - Answer 9 removes that sentence in favour of the type group's 2011 model, whose exclusion rules read each declaration's own bounds (POSITIONS.md, 2026-09-26, answer 9). The model is not yet written into the chapter.
- **`IN` on a range**: `ranges.tex:94`, with `:47` and `:64-65`: 4 is in `2:6`, and 6 is in `3#4`.

## 6. The tests: the recorded failure and the recorded pass

**The count stage** (the manifest's `testIsStage`).
- Before: total **22** (`probes/checker-count-preedit.txt`), identical to batch 7's landed table.
- After: total **10** (`probes/checker-count-postedit.txt`); a re-run is identical (`probes/checker-count-postedit-rerun.txt`).
- The library alone, before the fix, gave the same 10 (`probes/checker-count-library-only.txt`): the fix is in a component, which this stage does not check.

| row | before | after | why |
|---|---|---|---|
| `RangeInternals` | 42 | 18 | The 12 `CAP` overloading errors of the `Range2D`/`Range3D`/`ScalarRange` family are gone (each row counts an error twice). Left: `IN`'s pair (1), `openRangeHelper`'s three (3), the `every`/`atMost` return types (3), and `map`'s pair in the two sequential ranges (2), as `cc-errors.py` shows over the two runs. |
| `FortressLibrary` | 2 | 2 | Its one error is still `AnyIntegral`'s `comprises` clause (`Library/FortressLibrary.fsi:436`), so the api stops at its hierarchy pass and its overloading and return-type checks do not run on this stage. The operator block's new pairs are therefore not on it: the brief expected them there after batch 7's H, but on this base they are not. |
| every other api | 0 | 0 | |
| `#total` | 22 | 10 | |
| `#locations` | 19 | 13 | |
| `#crash` | none | none | |

The manifest needs `expectedCheckerCount: 10`. The crash line does not move, so it needs no `expectedCheckerCrash`.

**The distance stage** (gate step 9, setting `any`): three runs, and a re-run of the last.

| run | total | capture | time and load at the start |
|---|---|---|---|
| before the edit | **940** | `probes/distance-preedit.txt` (`DISTANCE SAME` against batch 7's landed table) | 835 s, load 1.62 |
| the library edited, the checker not | **626** | `probes/distance-library-only.txt` | 2,369 s, load 6.94 |
| the fix in | **627** | `probes/distance-postedit.txt` | 867 s, load 4.77 |
| re-run of the fix, site for site | **627** | `probes/distance-postedit-rerun.txt` | 842 s, load 2.65 |

The runs are compared with `explorations/coordinator/tools/distance/compare.sh` (`probes/distance/compare-pre-libonly.txt`, `compare-libonly-post.txt`, `compare-pre-post.txt`) and site by site with `sites.py` (`probes/distance/sites-pre-libonly.txt`, `sites-pre-post.txt`).
- **The crash, the recorded failure of the fix.**
  - The library-only table has a tenth crash row: `ObjectDecl RangeInternals.fss:363:1-442:2 RuntimeException Not in the trait table: FortressLibrary.GeneratorZZ32 @ RangeInternals.fss:370:13-386:10`. That is `ExtentScalarRange`'s `case ex of 1 => …` (`Library/RangeInternals.fss:369-386`).
  - After the fix the row is gone, and the declaration checks with one error: `No such method Range[\ZZ32\].intersectWithExtent` (`:425`).
  - On the base the declaration had 38 errors (measurement C counted 37 on its copy), this one among them, at `:439`. The other 37 are cleared by `ZZ32`.
- **The crash rows before and after: 9 and 9** (8 declarations, plus `Stream`'s variance stage). The two `Character` rows in `FortressLibrary.fss` move from `:4265` and `:4284` to `:4266` and `:4285`, with the component's net one added line; they are the same declarations.
- **By kind:** overloading 184 → 148; abstract method 30 → 14; well-formedness 93 → 36; body type errors 591 → 388; export 11 → 10; `comprises` 2 and return type 29 unchanged.
- **By class:**
  - the integer family 276 → 17: I1 82 → 4, I2 20 → 2, I3 148 → 8, I5 15 → 0, I6 8 → 0, I4 3 → 3;
  - D2 18 → 2: `IN`'s and `CAP`'s missing instances at the range objects;
  - L1 81 → 39: the `CAP` family of 36 and the `openRangeHelper` pair's relabelling among them;
  - TS 8 → 0: the tuple shifts' messages merge once `I` and `J` both read `ZZ32`;
  - RG 29 → 18: 13 relabelled OT, because their messages no longer carry static arguments (measurement C's reading);
  - BR 11 → 10; X1 11 → 10; M1 103 → 109; OT 124 → 143;
  - NM 54 → 54. It was 53 in the library-only run, where the crash hid the `intersectWithExtent` error; the error is back after the fix.
- **By unit:** api `RangeInternals` 21 → 9; component `RangeInternals` 330 → 76; component `FortressLibrary` 408 → 361; every other unit unchanged.
- **By site** (`sites-pre-post.txt`): 298 sites of the base are gone; 622 after-sites stand at a site that held an error before (4 of them matched by message where the line map missed them); 5 sites are new. Each new site, read:
  - `FortressLibrary.fss:3241`, `opr BIG MAXNUM(g: Generator[\RR64\])`: "Function body has type RR64, but declared return type is BigReduction[\RR64,RR64\]".
    - The mechanical rule marks it CAUSED, since the declaration held no error in this run of the base.
    - It is class BR, big operators' bodies typed at their element. The BR family moves between setups and is identical between runs of one setup (FACTS.md, "The true distance to the switch-over", rung B's finding). This site is the same in three runs of this tree, the two here and the skeptic's (`probes/skeptic/distance-skeptic-errors.txt`).
    - The declaration names no range and nothing the edit touched. It is not caused by the edit.
  - `RangeInternals.fss:145` and `:1399`, `:1407`, `:1415`: marked UNMASKED.
    - `:145` is `ScalarRange.truncL`, a body typed `Range[\ZZ32\]` against a declared `ScalarRangeWithLeft`.
    - `:1399`, `:1407` and `:1415` are the three extent helpers, whose `if` joins a `CompactFull…Range` and an `Extent…Range` into a union against a declared `ExtentRange`.
    - On the base these declarations stopped at their numeral errors (`x=0` with `x: I`). With `ZZ32` the checker reaches the join.
    - `CompactFullParScalarRange` is a `FullRange[\ZZ32\]` and not an `ExtentRange[\ZZ32\]` (`Library/FortressLibrary.fss:3793`, `:3872`), so for a zero extent the helpers return a value that is not of their declared type: a library slip the base already had.
    - These are four of measurement C's eight "slips of the shadow".
  - Hidden in the KEPT count by the hunk map: `FortressLibrary.fss:3982-3984` hold three "Could not check call to operator :" errors, where the base held one at `:3983`. These are the split `opr ::(l, s)` forms (section 4), so the edit causes 2 errors there: two more of measurement C's eight slips.
  - Measurement C's other two slips, `openRangeHelper`'s arrow overloads as Meet Rule errors, show as the six `openRangeHelper` rows, now labelled by their family (`probes/distance/errors-postedit.txt:156-161`), at the sites of the base's six.
  - So the new errors the edit causes are 2, both accounted for. The rest are unmasked slips of the library and one site of the BR family, which moves between setups and is identical between runs of one setup.

The gate's distance stage declares nothing. The record states the move 940 → 627, with the crash rows unchanged in number.

**The refusal test**, `ProjectFortress/tests/XXXRangeWideRungJ.fss`: a `ZZ64` range, `widen(one):widen(three)`, then `PASS`.
- On the base, walk builds the range and prints `PASS` (`probes/refusal-walk-base.txt`), and the `testSystem` harness reports "Missing expected failure", one failure (`probes/refusal-harness-base.txt`). This shows the file red on the library that accepts the range.
- After the edit, walk stops at the range: "Failed to find any matching overload, args = (1: ZZ64,3: ZZ64)" at `XXXRangeWideRungJ.fss:10:12-20` (`probes/refusal-walk-edit.txt`). The harness sees the expected exception (`probes/harness-edit.txt`, `probes/harness-final.txt`).

**The guard test**, `ProjectFortress/tests/RangeZZ32RungJ.fss`.
- What it covers, each value the base's own (`probes/GuardProbe.fss` with `GuardProbe-base.txt`):
  - every form the operators build over `ZZ32`: `#`, `:` and `::`; left, right, extent and open; one, two and three dimensions; strided and `seq`;
  - a range that starts with a numeral;
  - `IN`, `CAP`, `|r|`, `.size`, `asString` and `asDebugString`;
  - a `ZZ32` loop that widens its index into a `ZZ64` sum, and a `SUM[\ZZ32\]` over `1#n`.
- It passes on the tree (`probes/guard-walk-edit.txt`, `guard-walk-edit2.txt`, `harness-final.txt`).
- It does not pass on the base, because of two defects this rung repairs. Each carries its own assertions (home 1, section 10):
  - The two-dimensional `openRange`. The base's `openRangeHelper` wrote `OpenRange2D[\I\](1,1)`, one static argument for two parameters ("Generic instantiation (size) mismatch", base `Library/RangeInternals.fss:1485`; `probes/guard-walk-base.txt`).
  - The test's own `opr #(x: String, y: String)` and `opr #(x: String, y: ZZ32)` beside the library's generic `opr #[\I\](r: PartialRange[\I\], size:I)`. Walk refuses the pair on the base, and on the edit without `Range`'s `String` exclusion; it accepts it with the exclusion (`probes/guard-walk-base2.txt`, `guard-walk-noexclusion.txt`, `guard-walk-edit2.txt`).
- Two conditions limit that check:
  - Walk checks a program's declaration against the library's only for a name the program declares at least twice (FACTS.md, "The library's scalar extension is eight generic declarations"); hence the test's two declarations.
  - It checks only on a run that analyses `FortressLibrary` afresh (rows 98 and 342). A private cache does that; a warm shard of `testSystem` may not. The captures here are cold.

**The four restated files.** Each changed line, before and after (every line is also in `probes/restated-lines.txt`):
- `ProjectFortress/tests/XXXRangeBoundsRungO.fss` (row 450): its `ZZ64` range and the line that reads it.
  - `:19` `wideTop = (lMax - widen(2)) # widen(three)` → `wideTop = 0 # three`
  - `:20` `wideTopSize = wideTop.size` → `wideTopSize = SUM[\ZZ32\][k <- wideTop, (lMax - widen(2)) + widen(k) <= lMax] 1`
- `ProjectFortress/tests/XXXSeqRangeTopRungO.fss` (row 451): its `ZZ64` range and the loop over it.
  - `:19` `wideTop = seq(lLo:lMax)` → `wideTop = seq(0:2)`
  - `:21` `for i <- wideTop do` → `for k <- wideTop do`
  - `:22` `assert(i >= lLo, "ranges.tex:47")` → `assert(lLo + widen(k) >= lLo, "ranges.tex:47")`
- `ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss` → `ProjectFortress/tests/RangeSizeRungO.fss` (row 452, `git mv`). It is restated to what a program holding `ZZ64` and `NN32` bounds writes: a `ZZ32` range of converted bounds.
  - `:1` `(*) explorations/compile-ladder/rung-overflow-natives/REPORT.md` → `(*) explorations/compile-ladder/rung-ranges-zz32/REPORT.md`
  - `:3` `component XXXRangeSizeZZ64RungO` → `component RangeSizeRungO`
  - `:10` `r = widen(one):widen(three)` → `r = narrow(widen(one)):narrow(widen(three))`
  - `:17` `rN = uOne:uThree` → `rN = signed(uOne):signed(uThree)`
- `ProjectFortress/tests/RangePrototype.fss` (the team's): 85 of its 635 lines, with the line count unchanged, respelled by `respell-prototype.py`, which applies the edit's two rules to the test.
  - 5 of its own declarations lose `[\I extends Integral[\I\]\]`, with `I` read as `ZZ32`.
  - 80 lines lose written static arguments of `RangeInternals` names (`open[\ZZ32\]()` → `open()`, `Range2D[\ZZ32,ZZ32\]` → `Range2D`).
  - Its unbounded `dumpShow[\I\](r:Range[\I\])` keeps its parameter, as the public `Range` does. Its comment at `:19` is unchanged.

How the restated files behave:
- The two `XXX` files fail at the same `ZZ32` line before and after (`probes/passes/compare-3pass.txt`):
  - `XXXRangeBoundsRungO`, with `IntegerOverflow` at `sized1Range`'s `lo+ex-1` (base `Library/RangeInternals.fss:1423`, now `:1379`);
  - `XXXSeqRangeTopRungO`, at the sequential step (base `:1081`, now `:1048`).
- Their restated lines are not reached there, so they were run alone: `probes/RestatedLinesProbe.fss` prints `PASS 3 3 CompactFullParScalarRange(1,3) CompactFullParScalarRange(1,3)` (`probes/restated-lines-base.txt`).
- The restated `RangeSizeRungO` prints `PASS` on the base (`probes/range-size-restated-base.txt`) and after (`probes/harness-final.txt`).
- `RangePrototype` prints the same before and after (the comparison: SAME) and passes the harness.

**The compiled path.** The compiler tests of a `case` without a comparison operator (the earlier attempt's grep of `ProjectFortress/compiler_tests/`: `Compiled140`, `Compiled280`, `Compiled5.at`, `Compiled9.ah`, `Compiled9.ai`) were run in the compiler's world before and after the fix (`probes/compiled-case-base.txt`, `compiled-case-fix.txt`). The two captures are identical but for the harness's time line.
- `Compiled140` compiles and prints `SUCCESS`.
- `Compiled280`, named by no `.test` file, fails to compile at its `import Set` in both (`ImmutableArray is undefined`, the compiler library's gap), so it never reaches its `case`.
- Its compiler-world twin `Compiled9.ah`, gated by `AfterTypeChecking.test`, typechecks in both, as `Compiled9.ai` does.
- `XXX5at.test` sees its expected failure in both.

In the one-library world, `probes/CaseProbeJ.fss` has two `case` expressions without an operator, one with a literal guard and one with a range guard.
- On the base's shadow classes both declarations crash with "Not in the trait table" (`probes/case-probe-base.txt`).
- After the fix both check with no error (`probes/case-probe-fix.txt`, `case-probe-fix-rerun.txt`).
- No program can be compiled against the one library yet, so this probe and the distance stage's crash row are the fix's record (home 3, by the record's instruction).

**Walk against the compiled run**, for the shapes both libraries have (`probes/CrossRangeJ.fss`, `probes/cross-path.txt`, `cross-path.sh`).
- The sums and counts of `seq` over `3#4`, `2:6`, `5:4`, `0#4` and `10:1` agree: 18, 20, 0, 14, 0.
- `4 IN (2:6)` and `6 IN (3#4)` are true under walk and false compiled.
  - The compiler library's `GeneratorZZ32` declares `opr IN(x:ZZ32, self): Boolean = false` (`Library/CompilerLibrary.fss:311`), and its `FilteredRange` does not override it. So on the compiled path no integer is in any range.
  - The specification settles it (`ranges.tex:94`, `:47`, `:64-65`).
  - The repair is not this rung's: the compiler library takes no new declaration before the switch-over (POSITIONS 2026-09-21, the library route), and the one library's `IN` replaces it at the switch-over. Home 2 (section 10).
- The compiled output's second space after `sum` is row 76.

**The ladder subset**: `run-subset.sh` over the 23 files of `subset.txt` (the range tests, the `case` tests, and the files whose first recorded error names a range operator), before and after (`probes/ladder-before/`, `probes/ladder-after/`, `probes/ladder-compare.txt`).
- 22 files keep their exit codes and first messages.
- Row 452's file keeps its phase and exit code 255, with a new first message: "Range has no getter called size" in place of "Could not check call to operator :", since its `:` now finds a `ZZ32` operator.
- No file moves down.

## 7. `rangeOperators`: cause and repair

On measurement C's copy, `ProjectFortress/tests/rangeOperators.fss` exits 1. Walk's overload check pairs the test's `opr #(x:String, y:String)` (`:20`) with the kept `opr #[\I\](r: PartialRange[\I\], size:I)`: "with generic type, at least one pair of parameters must have excluding types" (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:527`).

**The cause.** The pair was traced with walk's own exclusion dump switched on, in a copy of `OverloadedFunction.java` ahead of the build (`ro-trace.sh`, `probes/rangeoperators/ro-trace.txt`). It was run on the base, on the edit, and on the edit without the `String` exclusion (`tmp/j1`).
- **On the base the pair is judged distinct at its second parameters.**
  - The test's `String` is compared with the generic operator's `I`, whose supertypes the dump prints as `[AnyIntegral]`: "Other excludes", `distinct=true`.
  - But that operator's `I` has no bound. The dump names the variable `I@…FortressLibrary.fss:3905`, which is the base's first `opr #[\I extends AnyIntegral\](lo:I, ex:I)`.
  - So walk read the partial-range operator's `I` with that other declaration's bound.
- **Why, by reading.**
  - For its overload checks, walk makes one symbolic instantiation per generic function and caches it in `symbolicStaticsByPartition` (`FGenericFunction.java:43-62`), under the team's note "TODO This is not quite right, because we risk identifying two functions whose where clauses are interpreted differently".
  - The cache is keyed by `GenericComparer`: the function's name and its static parameter list (`GenericFunctionOrMethod.java:44-58`). The list's elements compare by name alone (`ProjectFortress/src/com/sun/fortress/nodes_util/NodeComparator.java:87-94`, `:136-138`, `:402-404`).
  - So every generic `#` whose list is `[I]` shares one entry, and whichever is instantiated first gives the others its bound.
  - The same cache serves generic constructors (`GenericConstructor.java:170-178`): two sites in all.
- **On the edit**, no other `#` has the list `[I]`, so the partial-range `#` gets its own `I`, bounded by `Any`. `String` against `PartialRange[\I\]` does not exclude, and `String` against `I` does not either, so the pair is refused (the `j1` run, rc 1). The edit did not make the program invalid; it stopped walk from borrowing a bound.
- **Four probes of the mechanism alone** (`probes/rangeoperators/Bound*.fss`, each with its `.txt`) declare `f[\I extends AnyIntegral\](x: I, y: I)`, `f[\I\](x: I, y: I, z: I)` and `f(x: String, y: String)`:
  - with the bounded declaration first and both parameters named `I`, walk refuses the set (`BoundBoundedFirstSameName.txt`);
  - in the other order it accepts the set;
  - with the unbounded declaration's parameter renamed `J`, it accepts the set in both orders and prints `integer pair / string pair / triple`.
  - The verdict depends on the parameter's name and on the declarations' order, which only a shared entry explains.

**The repair**, by the library's own means: `Range` excludes `{ Number, String }` in the component (`Library/FortressLibrary.fss:3708`).
- This is the one library's clause with the team's comment, widened by `String`, as its `Rank` and array traits and the compiler library's `Range` write it (section 3).
- `String` and `PartialRange[\I\]` then exclude each other, so the pair is distinct at its first parameters, whatever bound `I` gets (`ro-trace.txt`, the tree's run: `distinct=true`, rc 0).
- `rangeOperators.fss` keeps every line and its exit code: 0 in all three passes, and in `probes/harness-final.txt`.
- The clause stays in the component, where the team put `Number`. The api's `Range` (`Library/FortressLibrary.fsi:2095`) still declares no exclusion; the compiled checker reads the api, so it will need the clause there once the one library is its prelude (a note on the new row, section 10).
- Ways not taken:
  - adding `Boolean` and `Character`, as the compiler library lists them: no test needs them, and `Character` is not a one-library name;
  - the clause in the api too: the team's placement for this trait, and a change the count and distance stages read;
  - keeping `opr #[\I\](r: PartialRange[\I\], size:I)` bounded: its `I` is an index type, a tuple for the two- and three-dimensional ranges, so no integer bound fits it.

The base defect this uncovers is walk's, and gets a new row (section 10).

## 8. The comparison, the demos and the microGPT checks

**The interpreter corpus.** `count-run.sh` ran the 422 files of `count-list.txt` (every `.fss` of `ProjectFortress/tests/` except the two new tests), one JVM per test pinned to one core, with private caches, in three passes (`probes/passes/machine-*.txt`, `pass-timing.txt`):
- base A: 04:46-04:58Z, load 5.73;
- the edit: 05:45-06:20Z, load 6.94, with the library at `ff8c43834`, before the checker fix, which walk does not run;
- base B: 07:21-07:38Z, load 26.88, with the base's library and test files restored in the tree.

The passes were compared by `compare-normalised.py` (batch 5's normalisation: Java line numbers, identity hashes, and the edit run's positions in edited files mapped back through the edit's own line map) and by `unstable-check.py` (`probes/passes/compare-3pass.txt`, `unstable-3pass.txt`).
- **390 same**, and **7 same once positions are mapped**: `XXXArrayLiteralArgRungC`, `XXXFnRenderRungS`, `XXXSeqRangeTopRungO`, `XXXTupleSevenRungS`, `XXXUnwrittenSumRungF`, `XXXloopError` and `XXXseqLoopError` print the same messages at moved lines of `FortressLibrary.fss` and `RangeInternals.fss`.
- **4 changed**, each with its cause:
  - `BadBounds.fss` (a team test), exit 0 in all three passes. It prints `b.bounds.ilkName` (`:24`, `:45`), the name of the bounds object's type: `CompactFullRange2D[\ZZ32,ZZ32\]` and `CompactFullRange3D[\ZZ32,ZZ32,ZZ32\]` on the base, `CompactFullRange2D` and `CompactFullRange3D` after, since those objects lost their static parameters. No line of the test changes.
  - `XXXRangeBoundsRungO.fss` and `XXXRangeEmptyHashRungO.fss` (row 450's), exit 1 in all three passes: the same `IntegerOverflow` at `sized1Range`'s `lo+ex-1`, whose line was rewritten (base `RangeInternals.fss:1423:39`, now `:1379:34`, with the caller's span at `FortressLibrary.fss:3905`).
  - `XXXInheritedOverload.fss`, exit 1 in all three passes: its two ambiguous overloads are named in the other order (row 430). Listed as unstable.
- **20 unstable**, where the two base runs differ:
  - 16 fall within the base's own variation: every line where the edit differs from base A is a line where base B differs too (`unstable-3pass.txt`);
  - `taskTrace3` equals both base runs once positions are mapped;
  - `TreapTest` has random priorities (`Library/Treap.fss:181`, `randomZZ32`), and all three runs differ;
  - `abortBlock` varies with thread interleaving (A and B differ at 1,632 lines);
  - `QuickCheckTest` shrinks at random. The edit's run reached the runner's 600 s cut (rc 124), while base B took 286 s under load 26.9. Four more runs of the edit ended rc 0 in 109 to 128 s, against two base runs of 96 and 98 s (`probes/quickcheck/`). Their shrink counts ran from 3,093 to 8,065, against the base's 385 and 1,089, so the time follows the random shrink, not the library.
- **The renamed file**, compared by hand: `XXXRangeSizeZZ64RungO` stops at `|r|`'s `typecase` ("given Long") in both base runs; `RangeSizeRungO` prints `REACHED` and `PASS`, exit 0.
- Every test on the brief's list keeps its exit code, 0 in all three passes: `RangeTest`, `subArray`, `StringTests`, `array3test`, `RandomTest`, `rangeOperators`, `FlatTowerRungF`, and `RangePrototype`, whose output is the same.

**The demos** that use a range: the 56 of `demo-list.txt`, one pass before and one after, each cut at 120 s (`extra-run.sh`; `probes/demos/machine-base.txt`, `machine-edit.txt`; compared by `demos-compare.py` in `probes/demos/demos-compare.txt`).
- 26 are the same.
- 9 print the same messages at moved library lines.
- 18 were cut at 120 s, with one output a prefix of the other.
  - 5 of them had different exit codes at the cut: `BirdCount1p`, `BirdCount1v`, `BirdCount1w`, `HeapShakedown` and `IntegrationStats`.
  - Run to the end with the base's library copy and the edit's side by side (900 s bound, load 8.6 to 11), all five end with exit 1 on both, with the same messages at moved lines (`probes/demos/rerun-compare.txt`, `rerun/`).
- 3 changed, each for a cause outside the library:
  - `Generator2Demo`: random inputs (`ProjectFortress/demos/Generator2Demo.fss:62-64`);
  - `SatEx`: a `nanoTime` difference in its message (`SatEx.fss:15-21`);
  - `conjGrad`: a random matrix (`conjGrad.fss:27`, `:29`, `:42`).

**The microGPT checks**, from an empty cache (`mg-run.sh`, `probes/mg/`).
- `MicroGptFlatCheck` and `MicroGptAplCheck` report 40 PASS, 0 FAIL of 40, before and after.
- The flat check's printed values are identical. The APL check differs only in two Rats! temporary paths (`probes/mg/mg-compare.txt`).
- Base: 2,348 s and 2,387 s at load 4.05. Edit: 2,193 s and 2,220 s at load 5.67. This is not a timing comparison.

## 9. Grep for competing names

The names this rung adds are the components `RangeZZ32RungJ`, `XXXRangeWideRungJ`, `RangeSizeRungO` and `XXXRangeInRungJ`, and the Java method `Types.isContainsType`.
- None is declared anywhere else in `ProjectFortress/` (every `*_tests` directory and `tests/`), in `Library/`, or in `ProjectFortress/src/com/sun/fortress/` (grep).
- The old name `XXXRangeSizeZZ64RungO` remains only in documents: FACTS.md, the ledger, the batch records, measurement C, and two rungs' count lists. None of them is a test or a source.

## 10. Every measured defect and its home

1. **Home 1: repaired here, and asserted in the rung's own test.**
   - **The base's two-dimensional `openRange`**: `openRangeHelper` wrote `OpenRange2D[\I\](1,1)` (base `Library/RangeInternals.fss:1485`).
     - Asserted at `RangeZZ32RungJ.fss:94`, with the message `ranges.tex:82`.
     - Fails on the base (`probes/guard-walk-base.txt`); passes after.
   - **`Range` not excluding `String`**, so that a program's own two `String` `#` operators beside the library's generic `opr #[\I\](r: PartialRange[\I\], size:I)` are refused (on the base, and on the edit without the clause).
     - Declared at `RangeZZ32RungJ.fss:6-7` and asserted at `:95-96`, with the message `traits.tex:223-233`.
     - Refused on the base and without the clause; passes with it (`probes/guard-walk-base2.txt`, `guard-walk-noexclusion.txt`, `guard-walk-edit2.txt`).
     - `rangeOperators.fss` gates it too: it exits 1 without the clause (`probes/rangeoperators/ro-trace.txt`).
   - **The checker's integer and `CAP` families (the decision's subject), and row 358's bound mismatch** (its parameters are gone): gated by the count stage's table, which the manifest makes the rung's test.
   - **Row 452, `|r|` of a `ZZ64` or `NN32` range**: no such range can be built. Its restated test `RangeSizeRungO.fss` passes, and the refusal test `XXXRangeWideRungJ.fss` fails at the construction.
2. **Home 2: deferred, and the specification settles it.**
   - **The compiled path's `IN` on a range is always false** (`Library/CompilerLibrary.fss:311`).
     - Gated by `ProjectFortress/compiler_tests/XXXRangeInRungJ.fss` with `RangeInRungJLink.test` (link, passes) and `XXXRangeInRungJ.test` (run, `run_out_contains=REACHED`, an expected failure): the two-file shape of rows 348 and 453.
     - Commands: `fortress junit compiler_tests/RangeInRungJLink.test` and `fortress junit compiler_tests/XXXRangeInRungJ.test`.
     - Shown red on a deliberate local fix of the stub (`probes/xxx-in-red.txt`, `xxx-in-red.sh`). The fix gave `FilteredRange` an `opr IN(x:ZZ32, self): Boolean = lo <= x AND x <= hi AND p(x)`, and the three compiler-library components were recompiled into a private cache. The run printed "PASS" and "Did not see expected failure", one failure; with the fix undone, the expected failure came back.
     - This is the rung's first `XXX` file in `compiler_tests/`. Its first in the interpreter corpus, `XXXRangeWideRungJ.fss`, was shown red on the base's library (`probes/refusal-harness-base.txt`).
   - **The compiled path's range equality is always `false`** (`Library/CompilerLibrary.fss:314`; row 481, measured by the skeptic).
     - Gated, on the judge's ruling at the merged-diff review, by `ProjectFortress/compiler_tests/XXXRangeEqRungJ.fss` with `RangeEqRungJLink.test` (link, passes) and `XXXRangeEqRungJ.test` (run, `run_out_contains=REACHED`, an expected failure); shown red on a local fix of the stub (section 14).
   - **An extremum expression stops the compiled checker** (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:363-368`; row 482, measured by the skeptic).
     - Gated, on the same ruling, by `ProjectFortress/compiler_tests/XXXExtremumRungJ.fss` with `XXXExtremumRungJ.test` (compile, `compile_exception_contains=Not yet implemented`, an expected failure); walk passes the same file (section 14).
3. **Home 3: deferred, and the specification is silent.**
   - **Walk's shared symbolic instantiation** (section 7). Probes: `probes/rangeoperators/Bound*.fss` with their captures, and `ro-trace.txt`.
     - `Specification/basic/overloading.tex:100-107` makes every one of the four probe sets an error: static parameters may not differ, nor may one declaration have them and another not. So walk's acceptance of three of them is wrong against the text as it stands, and its refusal of the fourth is right by accident.
     - The row is home 3 because answer 9 (POSITIONS.md, 2026-09-26) removes that sentence in favour of the 2011 model, whose rules read each declaration's own bounds, and that model is not yet written into the chapter; not because the text is silent. When its specification rung lands, the probe `BoundBoundedFirstSameName.fss` becomes the expected-failure test.
   - **The `GeneratorZZ32` crash, fixed here.** No program can yet be compiled against the one library, and the count stage never reaches a component. So, as the record instructs, its record is:
     - the distance stage's crash row, before and after;
     - `probes/CaseProbeJ.fss` with `case-probe-base.txt`, `case-probe-fix.txt` and `case-probe-fix-rerun.txt`.
   - **The fix's reach** (found by the skeptic): for a guard typed by a type variable bounded by a `Contains`, or by a union of `Contains` types, the one-library branch answers `=` where `Specification/basic/expressions/case.tex:47-51` gives ∈ (section 4). Its home is the skeptic's probes, as the crash's is: `probes/skeptic/SkCaseGuards.fss` with `sk-case-op-fix.txt`, `SkCaseGuards-walk.txt`, and `SkCaseGuardsC.fss` with `sk-compile-op-C.txt`; row 480.
   - **The `Character` crash**: `Types.CHARACTER` is not re-pointed, and five declarations crash. The evidence is `explorations/perf-probes/prelude/switch-over-distance.md` section 2.6 and the five `Character` rows of this rung's three distance tables. Left for batch 8 or later.
4. **Unrepaired, and not new:**
   - the extent helpers' and `ScalarRange.truncL`'s declared types (section 6): class RG, the range methods' declared-type family, batch 8's by the record's section 5;
   - the split `opr ::` bodies (section 4): the same family.

## 11. Ledger rows

- Opened, numbered provisionally from 476 (the gather assigns the final numbers, J before U):
  - 476: the `GeneratorZZ32` crash, opened and closed;
  - 477: the `Character` crash, open;
  - 478: walk's shared symbolic instantiation, open;
  - 479: the compiled `IN` stub, open.
- The gather kept the four numbers as final, and opened the skeptic's four recommended rows after them: 480, the `case` fix's reach; 481, the compiled path's range equality; 482, extremum expressions on the compiled path; 483, `UniformDistribution[\T\]` no longer tied to its range.
- Closed: 452 and 358.
- Notes appended to 450, 451 and 453.

The text is in `record.md`.

## 12. Not done

- The ladder's 85 files were not run whole; the gate runs them. The subset of 23 shows no move, and the compiler world's branch of the `case` fix is the base's two lines, unchanged.
- The pre-edit and library-only distance runs and the microGPT checks were not repeated by this session (section 0).
- The skeptic's own checks are left to it: the three distance tables re-run, walk against the compiled run for `seq` and `IN` beyond `CrossRangeJ`, and every restated line checked value by value.
- The api's `Range` header still declares no exclusion (section 7).

## 13. Machine

Every capture carries its machine line (`machine.sh`: date, `nproc`, CPU model and MHz, load, JDK, `FORTRESS_THREADS`, HEAD and the tree's status). The box has 4 CPUs (Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz), openjdk 25.0.4, and `FORTRESS_THREADS=1`. Another batch's rung ran beside every run; the loads at the starts, given above, range from 1.6 to 26.9.

## 14. Repair after the merged-diff review

The merged-diff review found that rows 481 and 482, which this rung's skeptic measured and placed in home 2 (`SKEPTIC.md:198-199`), had landed without their gated tests. The judge ruled a repair (`explorations/compile-ladder/climb-batch-7R/JUDGE-review.md`, committed as `d7424cb28`), and the repair ran on `main` at `d7424cb28`, after the gate had finished. Nothing outside `ProjectFortress/compiler_tests/` and `explorations/` changed.

**The five files**, in `ProjectFortress/compiler_tests/`, each with the one comment line pointing at this report; the assert messages cite the specification's lines as they read at `9c46c2206`:
- `XXXRangeEqRungJ.fss` prints `REACHED`, asserts `(1:3) = (1#3)` (`:8`, "ranges.tex:124-126, :51, :68-69"), `(3:1) = (5:4)` (`:9`, both empty) and `NOT ((2:4) = (2:5))` (`:10`, which keeps the file failing under a `=` that answers `true` always), and prints `PASS`.
- `RangeEqRungJLink.test`: `link` of that file; it passes.
- `XXXRangeEqRungJ.test`: `run` with `run_out_contains=REACHED`; an expected failure. With the link test, row 479's two-file shape.
- `XXXExtremumRungJ.fss`: `pick()` is `case most > of 1 => "one"; 3 => "three"; 2 => "two" end`, and `run` asserts `pick() = "three"` ("case.tex:107-112") and prints `PASS`.
- `XXXExtremumRungJ.test`: `compile` with `compile_exception_contains=Not yet implemented`, the shape of `XXXTryAtomicCodegenRungB.test`; an expected failure whose failure is named, so that a change that moves the crash elsewhere turns it red.

**The commands**, from the repository root, with `J=explorations/compile-ladder/rung-ranges-zz32` and `R=explorations/compile-ladder/climb-batch-7R/repair`:
- The names: `grep -rn 'RangeEqRungJ\|ExtremumRungJ' ProjectFortress Library SpecData --include=*.fss --include=*.fsi --include=*.test --include=*.java --include=*.scala > $R/competing-names.txt`.
- Walk and compiled, each from a private cache: `bash $J/cross-path.sh ProjectFortress/compiler_tests/XXXRangeEqRungJ.fss > $R/cross-path-eq.txt 2>&1`, and the same for `XXXExtremumRungJ.fss` into `$R/cross-path-extremum.txt`.
- The harness, with the red demonstration: `bash $R/junit-new.sh $R/junit-new.txt`, in the background. `junit-new.sh` is `xxx-in-red.sh` adapted: its own private cache (`tmp/xxx-repair-7r`), `junit` over the test names it is given, and three phases, the tree as it stands, a deliberate local fix of `=` in the compiler library, and the fix undone. The fix replaces `Library/CompilerLibrary.fss:314`, `opr =(left:GeneratorZZ32, right:GeneratorZZ32): Boolean = false`, with a body that compares the two ranges' elements joined by `seqgenerate(StringConcatenation, …)` (declared at `:308`), recompiles `CompilerLibrary`, `CompilerAlgebra` and `CompilerSystem` into the private cache, and is undone by `git checkout`. One addition to `xxx-in-red.sh`'s `relib`: it prints a compile's output when the compile fails; no compile failed.

**The captures**, each under `explorations/compile-ladder/climb-batch-7R/repair/` and each headed by its machine line:
- `competing-names.txt:1-5`: five lines, all in the five new files; no other file names either component.
- `cross-path-eq.txt`: walk prints `REACHED` and `PASS`, `walk rc=0` (`:3-5`); compiled, `compile rc=0` (`:7`), then `REACHED` and `FAIL:  ranges.tex:124-126, :51, :68-69`, the message of `XXXRangeEqRungJ.fss:8` alone, and `run rc=1` (`:8-11`). The capture drops stack lines; the harness's capture shows the frame at `:8` (`junit-new.txt:16`). This is the shape of `probes/skeptic/SkJDiff-cross-t1.txt`.
- `cross-path-extremum.txt`: walk prints `PASS`, `walk rc=0` (`:3-4`); compiled, `java.lang.Error: Not yet implemented` and `compile rc=1` (`:6-7`), and the run finds no class, `run rc=1` (`:8-12`). This is the shape of `probes/skeptic/SkExtremum-cross.txt`.
- `junit-new.txt`, phase 1, the tree as it stands (`:1-33`): the link test OK (`:3`, `:7`); `XXXRangeEqRungJ` prints `REACHED`, fails at `XXXRangeEqRungJ.fss:8` (`:11-16`), "Saw expected failure" (`:18`), OK (1 test) (`:22`); `XXXExtremumRungJ` "java.lang.Error: Not yet implemented" and "OK Saw expected exception" (`:26-27`), OK (1 test) (`:31`).
- `junit-new.txt`, phase 2, the local fix (`:34-60`): one file changed, 3 insertions and 1 deletion (`:35-36`); the three compiles rc=0 (`:37-39`); the link test OK (`:41`, `:45`); the run prints `REACHED` and `PASS`, "Did not see expected failure", and the harness reports one failure (`:49-58`). The file goes red exactly when `=` compares ranges as sets, the empty pair included.
- `junit-new.txt`, phase 3, the fix undone (`:61-87`): the three compiles rc=0 (`:62-64`); the link test OK (`:66`, `:70`); `REACHED`, the failure at `:8`, "Saw expected failure", OK (1 test) (`:74-85`).
- `junit-new.sh`: the script. After it, `git status --short Library ProjectFortress default_repository` listed only the five new files, and `default_repository/caches` held the same 67 files, none newer than the ruling.

**No red demonstration for row 482**, as the ruling holds (`JUDGE-review.md`, section 3): the deliberate fix would be two Java sites and a rebuild. The walk run of the same file (`cross-path-extremum.txt:3-4`) shows that its one assertion is the answer where the construct is implemented.

**The machine.** `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4 (2026-07-21), `FORTRESS_THREADS=1`. The load average was 0.22 0.51 1.87 at the first capture's start (`cross-path-eq.txt:1`, 10:59:08 UTC), and 0.36 to 1.43 at the later starts, each in its capture's machine line. No `ant` target, no gate and no interpreter pass beyond the two walk runs ran.

**The gate's expectation.** `ant testFast` alone, with nothing built first: the compiler track at 784 (781 and the three new `.test` files) with 0 failures, and the other tracks as the gate recorded them. `testSystem` 425, the checker table (10, crash none), the distance stage 627, the atomic runs, the ladder and the microGPT comparison stand, since none of them reads `ProjectFortress/compiler_tests/`.

**Fallbacks.** None was taken: the caches were current, the local fix compiled at the first attempt, and `XXXExtremumRungJ` showed the expected exception with the key as written.

**Where the repair departs from the ruling's text**, with the line that settles it (`explorations/compile-ladder/climb-batch-7R/REPAIR-review.md`): row 482's note cites `CaseExprDesugarer.java:89-92`, since the `throw` is at `:92`; and it says that a fix of the checker's extremum rule alone, not of `makeTotalOperatorOrder` alone, moves the failure to the desugarer, since no library declares a `TotalOperatorOrder` for the rule's subtype test (`Functionals.scala:894-899`).