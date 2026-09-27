<!-- Written 2026-09-27 by a delegated measurement worker: answer 11 of the plan (coordinator/POSITIONS.md, 2026-09-26, "answer 11"), the full distance to the switch-over measured once after climb batch 6 landed and before phase 3 is briefed, and the question of what the report-only distance stage of phase 3's gates costs. Tree: main at 2851e5086, whose sources are those of d65892d34 (rung R; the flat number tower of d846e3644 beneath it; no commit since touches Library/ or ProjectFortress/). Method: switch-over-distance.md's, repeated with its own scripts, unchanged, in a worktree of its own with shadow classes and one private cache per run; nothing tracked outside switch-over-distance-flat/ was changed. Every command is in switch-over-distance-flat/run-all.sh; the derived tables in switch-over-distance-flat/tables.sh. -->

# The distance to the switch-over, measured on the flat library

The terms are those of `switch-over-distance.md` ("Terms"): the count stage, the api and component layers, the early return, walk's setting and the compile path's setting, a distinct error. One more here:
- *Site*: an error's kind and location (file and line, two for a pair), with the lines of the 2026-09-26 tables carried to today's files by a line map (`compare-sites.py`). Two trees are compared by site because a message that lists candidate declarations changes when a candidate's type changes, while the obligation at the site does not.

## The answers

1. **Everything the checker reports, today: 1,736 distinct errors under walk's setting, 1,527 under the compile path's, against 2,523 and 2,359 on 2026-09-26.** The count stage reads 62, 3.6 % of the walk figure (5 % on 2026-09-26). The api layer went 551 → 223 (walk) and 628 → 297 (compile); the twelve components 1,972 → 1,513 and 1,731 → 1,230. Eight declarations crash the checker, from nine (§ 2).
2. **What went is the number tower's, and what stays is almost all of what the 2026-09-26 note listed as not the tower's.** Measured by site (walk): 986 sites went, 199 appeared, 1,537 stayed. Gone: 505 return-type sites, 212 overloading sites (169 of them the tower's "same parameter type" pairs), 88 exclusion sites, 174 sites of the components' own type errors. Appeared: 167 type-error sites, 113 of them in `RangeInternals`, where generic code compares or adds a type-parameter integral and a literal (`ex > 0`, `lo + 1`), and 21 new native bindings under walk's setting (§ 2.3). The flattened copy's estimate of 2026-09-26, 1.55K-1.75K (walk) and 1.35K-1.55K (compile) for the whole library, held: both measured totals are inside it, near its top.
3. **Code generation**: `FortressLibrary.fss` emits 326 declarations and refuses 225, 4 of them on declarations the checker passed (2 `AsIfExpr`, 1 `LetFn`, 1 an intersection-typed receiver); the `BottomType` stop of 2026-09-26 is gone without the probe's switch, the seven size refusals are gone (rung Z), and so are the 23 malformed overload sets (§ 3).
4. **The dispatch generator finishes** in about 210 s of code generation, one run on a loaded machine, and refuses 12 overload sets of 198, from 131 of 283: all 12 "a functional method and top level function with same signature", ten on the comparisons and `Maybe`, two at a leaf (§ 4).
5. **The distance stage**: one full run under the compile path's setting took about 24 minutes here, as twelve JVMs (1,440 s) or as one (1,431 s), on a machine at load 13-18, and the one-JVM run under walk's setting 14 minutes as the load fell to 7; the smallest run that reports the whole distance is the one-JVM run of all twelve components, which reproduces the twelve runs within the checker's run-to-run variation (§ 5). Which setting it should run follows batch 7's Q1: under its default (a), bound `Any`, a third setting measured here once, 1,747 errors, walk's figure and 12 abstract-method errors.
6. **Measured and inferred.** Every count in this note is measured from the captures beside it, except where a sentence says "inferred": the causes named for the typecheck changes in `RangeInternals`, the reason the `GeneratorZZ32` crash is no longer reached, and anything said about a setting not run.

## 1. How it was measured

- **Machine** (protocol, principle 2): `nproc` 4; `Intel(R) Xeon(R) Processor @ 2.10GHz`, `cpu MHz` 2100.000; JDK 25.0.4; `FORTRESS_THREADS=1`; `-Xmx4g -Xss64m`. Other work ran throughout: the batch in `/home/user/fortress-overflow` (four to six JVMs at a time) and a planning worker, and up to three of this probe's own runs at once. Load average at the start of the runs: 7.4 to 18.9, printed at the head of every capture. **No timing here is a comparison**, with 2026-09-26's or with another timing in this note.
- **Tree**: the worktree `/home/user/fortress-distance` of `main` at 2851e5086, built there by `ant compileAll` after `ProjectFortress/build` was copied in.
- **Method**: `switch-over-distance/run-all.sh`'s steps, repeated by `switch-over-distance-flat/run-all.sh`, which uses that directory's `Distance.java`, `make-shadows.sh`, `add-patch.py`, `errors.py`, `watch-dispatch.sh` and `jfr-stacks.py` and `desugar-codegen/classify.py` unchanged. Every shadow edit still finds its text exactly once in today's sources (`r00-make-shadows.txt`). The overloading memo is off in every run (`-Dfortress.analyzer.overload.cache=false`). Additions: `DistanceMulti.java` (the twelve components in one JVM, § 5), `compare-across.py` (the 2026-09-26 tables against today's, error by error with line numbers removed), `compare-sites.py` (by site, above) and `typecheck-groups.py` (§ 2.5's groups).
- **Controls**:
  - the count stage as the gate runs it reads 62 with the memo on and off (`r01-count-stage.txt`, `r01-count-stage-memo-off.txt`), as the landed table (`compile-ladder/climb-batch-6/followup-R/gate/checker-count.txt`); the driver with every probe switch off reproduces it (`r02-repro.out`, "has 62 errors");
  - the compiler's own prelude, every stage: 162 declarations, every stage of every unit 0 errors, no crash (`r03-control-compilerlib.out`);
  - **rung F's run against today's.** Rung F's capture of the `FortressLibrary` run under walk's setting, on its branch before rung R (`compile-ladder/rung-flat-tower/probes/distance/walk-flat.txt`), read by the same `errors.py`: 1,055 distinct errors; today's run, 1,051. 1,047 are the same error; the 8 that go and the 4 that appear are all of the kind the 2026-09-26 note measured between two runs of one tree: which pair of `LEXICO` or `SQCAP` declarations the checker reports as "multiple declarations with the same parameter type", and which type a join infers for an array body ("Function body has type `Array1[\T,0,s0\]`" against "`Array[\T,ZZ32\]`"). The per-stage counts are equal except the component's type check, 459 against 455. So rung R's edit moved nothing on this run beyond that variation; its effect and the variation are not separated;
  - the 2026-09-26 tables re-read by `typecheck-groups.py` give that note's § 2.5 groups, with one error of 988 in another group (the tables' messages are cut at 160 characters, and one "static argument not inferred" message is cut before those words).

## 2. Everything the checker reports

### 2.1 The layers

| | walk, 09-26 | walk, today | compile, 09-26 | compile, today |
|---|---|---|---|---|
| the count stage (api errors before each early return) | 125 | **62** | 231 | **184** |
| the api layer, every stage | 551 | 223 | 628 | 297 |
| the twelve components, every stage | 1,972 | 1,513 | 1,731 | 1,230 |
| **total, distinct** | **2,523** | **1,736** | **2,359** | **1,527** |
| declarations the checker crashes on | 9 | 8 | 9, and a stage crash | 8, and the same stage crash |

The compile path's figure for the count stage is the driver with every probe switch off under that setting (`r02-repro-compile.out`); the stage itself has no switch for it.

By compilation unit (`errors-walk.txt`, `errors-compile.txt`, last table; an error both an api and a component print is under the api):

| unit | walk, 09-26 → today | compile, 09-26 → today |
|---|---|---|
| api `FortressLibrary` | 481 → 180 | 499 → 195 |
| api `RangeInternals` | 39 → 21 | 111 → 93 |
| api `NativeArray` | 22 → 22 | 4 → 4 |
| api `FortressBuiltin` | 9 → 0 | 10 → 1 |
| apis `List`, `Stream` | 0 → 0 | 4 → 4 |
| component `FortressLibrary` | 1,274 → 828 | 1,123 → 643 |
| component `RangeInternals` | 320 → **343** | 401 → **430** |
| component `FortressBuiltin` | 208 → 193 | 31 → 12 |
| component `String` | 79 → 72 | 85 → 77 |
| components `List`, `FlatString`, `Writer`, `NativeArray`, `NatReflect`, `Stream` | 91 → 77 | 91 → 68 |
| components `AnyType`, `TypeProxy` | 0 → 0 | 0 → 0 |

**What waits behind the `FortressLibrary` api's early return**: the api stops at its hierarchy stage with 19 errors (the 18 exclusion errors and `AnyIntegral`'s `comprises` error of the count), and behind it the overloading checker reports 161 (walk): 140 overloading and 21 return-type errors, against 426 on 2026-09-26.

**Per declaration**, `FortressLibrary.fss`'s 451 top-level declarations (446 on 2026-09-26): 291 clean, 155 with errors, 5 crashes under walk's setting (277, 164, 5 then); 309, 137, 5 under the compile path's (287, 154, 5) (`layers.txt`).

**Beside rung F's measurement.** Rung F ran only the `FortressLibrary` run under walk's setting (the twelve apis every stage and `FortressLibrary`'s component), before and after its edit (`compile-ladder/rung-flat-tower/probes/distance/stage-counts.txt`):

| the `FortressLibrary` run, walk | 09-26 | rung F, before | rung F, after | today |
|---|---|---|---|---|
| distinct errors (`errors.py`) | 1,825 | 1,827 | 1,055 | 1,051 |
| the component total the checker prints (not deduplicated) | 3,188 | 3,186 | 1,948 | 1,940 |

The 1,948 FACTS records for rung F is the printed total, exactly twice the sum of the component's per-stage error lines (974 in rung F's run, 970 today), which themselves repeat an error printed by two stages; the distinct figure for the run, apis included, is 1,055.

### 2.2 By kind

| kind | walk, 09-26 → today | compile, 09-26 → today |
|---|---|---|
| exclusion | 126 → 38 | 126 → 38 |
| `comprises` | 3 → 2 | 3 → 2 |
| overloading | 707 → 501 | 458 → 251 |
| return type | 577 → 91 | 571 → 85 |
| an inherited abstract method with no implementation | 20 → 18 | 32 → 30 |
| `bound Object` | 0 → 0 | 371 → 372 |
| other well-formedness | 90 → 93 | 90 → 93 |
| the components' own type errors (§ 2.5) | 988 → 981 | 697 → 645 |
| export | 12 → 12 | 11 → 11 |
| **total** | **2,523 → 1,736** | **2,359 → 1,527** |

### 2.3 What changed, and why

By site, walk's setting (`compare-sites-walk.txt`; the compile path's in `compare-sites-compile.txt`, the same picture): 986 sites went, 199 appeared, 1,537 stayed, 248 of these with a reworded message. Error by error, with line numbers removed and messages compared whole (`compare-0926-walk.txt`, `compare-0926-compile.txt`), more moves (1,147 go, 360 appear under walk's setting), because a candidate list in a message changed.
- **Exclusion, 126 → 38.** The tower's 88 went: the number types' own (`FortressLibrary` 70, among them the reductions' `DistributesOver` group, `FortressBuiltin` 18). What stays is the count stage's 18 in the api and 20 in the component: `TotalComparison` and its three objects, `AnyMaybe`, `Maybe`, `Just` and `Nothing`, and `RelationalPredicateCondition` (one in the api, three in the component, with two of its subtraits). Batch 7's rung H is briefed on them.
- **`comprises`, 3 → 2.** `QQ`'s ellipsis error went; `AnyIntegral`'s closure stays in the api (`FortressLibrary.fsi:431`) and the component (`.fss:644`), at moved lines.
- **Overloading, 707 → 501 and 458 → 251.** 169 of the 180 "multiple declarations with the same parameter type" went, the tower's (`DOT`, `BY`, juxtaposition, the integer operators, `narrow`, `widen`, …), and 43 Meet-Rule pairs of `RangeInternals` (`combine2D` 14, `combine3D` 14, `CAP` 15; why the flattening separates these was not traced). 14 "same parameter type" pairs stay (walk; 15 compile): `LEXICO` 7, `SQCAP` 4, `INVERSE` 3, the comparisons' and `Maybe`'s. Six sites appeared: an `IN` pair of `RangeInternals` (in its api, its component and `FortressLibrary`'s), and `INVERSE` and `LEXICO` pairs that are the variation of § 1. By subclass, § 2.4.
- **Return type, 577 → 91 and 571 → 85.** The tower's went, 505 sites, 511 errors (by error: juxtaposition 132, `DOT` 96, `BY` 22, twelve integer operators 16 each, `narrow` 14, `MIN` and `MAX` 14 each, …). 19 sites appeared, all in `FortressLibrary`: `MIN` and `MAX` 8 each, where a leaf's or `StandardTotalOrder`'s declaration is compared with `StandardMinMax`'s (`FortressLibrary.fss:260-261` against `:279-280` and `:421-422`); `distribute` 2, rung F's restated fusion pairs (`:2974` against `:3154`, `:3156`); `unsigned` 1 (`.fsi:458` against `:542`).
- **Abstract methods, 20 → 18.** `MultiplicativeRing[\Number\]`'s `one` in `Float` and `FloatLiteral` went; the 18 of `RangeInternals` stay (under the compile path's setting also the 12 of `FortressLibrary`).
- **`bound Object`, 371 → 372**: 340 a tuple as a static argument, 26 `Any`, 6 other. The same sites but 5 gone and 6 new (4 in `List`).
- **Other well-formedness, 90 → 93.** Four appeared at rung F's restated fusion pairs, `MaxReduction`, `MinReduction`, `MaxSumReductionPair`, `MinSumReductionPair` with `T` not satisfying `StandardMax[\T\]` or `StandardMin[\T\]` (`FortressLibrary.fss:3138`, `:3144`, `:3154`, `:3156`; ledger row 433).
- **The components' own type errors, 988 → 981 and 697 → 645**, but not the same errors: 174 sites went and 167 appeared (walk).
  - Went: the tower's bodies (operators on the old intersections such as `NN64 & {UnsignedLong, NN32}`, `QQ` bodies declared `ZZ32`, `QQ` assigned to an `I`, `get` at `ZZ64`, …): `FortressLibrary` 67 sites, `RangeInternals` 72, `List` 15, `String` 11, `FortressBuiltin` 8.
  - Appeared: 21 native bindings under walk's setting, the calls batch 6 added (`builtinPrimitive(` calls 109 → 126 in `FortressLibrary.fss`, 227 → 231 in `FortressBuiltin.fss`); and, in `RangeInternals`, 114 sites, most of them a comparison or arithmetic between a value of a type parameter `I extends Integral[\I\]` and a literal (`ex > 0`, `str > 0`, `lo + 1`, `|ex|`), whose candidates now list only the leaves' declarations (`((NN64 & {UnsignedLong}), NN64)->Boolean is not applicable to an argument of type (I, IntLiteral)`), and the generator filters built on them ("Filter expressions in generator clauses must have type Boolean", 28 → 61). **Inferred**: these checked before through `Number`'s catch-all declarations, which the flattening removed, and the compiled checker converts no literal to a type parameter; this is the body-level shift rung F reported for the array bodies ("the obligation is unchanged, its message is not", `compile-ladder/rung-flat-tower/REPORT.md` § 13), here with new sites.
- **Export, 12 and 11**: unchanged.

### 2.4 Overloading and return types, by family

| subclass (`errors.py`'s `overload_sub`) | walk, 09-26 → today | compile, 09-26 → today |
|---|---|---|
| `fill`, a function-taking declaration against a value-taking one | 244 → 244 | 0 → 0 |
| `fill`, two of one kind from the array traits' diamond | 58 → 58 | 58 → 58 |
| "multiple declarations with the same parameter type" | 180 → **14** | 182 → **15** |
| the static-parameter sentence (`CAP` 36, `IN` 14 or 6, `seq` 10 or 11, `MIN`/`MAX` 12, `openRangeHelper` 6, `CMP` 4, juxtaposition 3) | 85 → 85 | 78 → 78 |
| the rest, the Meet Rule (`FORWARD_CMP` 38, `IN` 15, `map` 15, `generate` 7, `ivmap` 6, `lift` 6, `seq` 4, `cross` 3, juxtaposition 3, `copy` 2, `nest` 1) | 140 → 100 | 140 → 100 |
| **overloading** | **707 → 501** | **458 → 251** |

**Return type, 91 and 85**: `CMP` 19, `MAX` 16, `MIN` 16, `SQCAP` 8, `atMost` 4, `shift` 4, `seq` 4 or 3, and 1 or 2 each for `array1`, `array2`, `array3` (walk only), `distribute`, `every`, `split`, `splitWithOffsets`, `subarray`, `filter`, `map`, `relation`, `target`, `unsigned`.

### 2.5 The components' own type errors

`typecheck-groups.txt`, from the uncut tables:

| group | walk, 09-26 → today | compile, 09-26 → today |
|---|---|---|
| a call whose arguments fit no declaration | 322 → 307 | 356 → 323 |
| `builtinPrimitive`: "Could not infer static argument T without context" | 319 → 340 | 0 → 0 |
| a body whose type is not the declared return type | 137 → 119 | 133 → 112 |
| no such method or getter | 69 → 73 | 90 → 89 |
| a method invocation or application that fits no declaration | 55 → 39 | 43 → 32 |
| a generator's filter not typed `Boolean` | 28 → 61 | 33 → 61 |
| a binding or an assignment | 25 → 8 | 23 → 8 |
| another static argument not inferred | 22 → 24 | 0 → 0 |
| other | 11 → 10 | 19 → 20 |
| **total** | **988 → 981** | **697 → 645** |

Of the 645 under the compile path's setting, `FortressLibrary` has 272, `RangeInternals` 259, `String` 69, `List` 29, the rest 16 (`errors-compile.txt`, last table).

### 2.6 Crashes

Eight declarations crash the checker under both settings (`errors-walk.txt`, `errors-compile.txt`, last table), from nine:
- `Character`, five: `strToInt` and `strToFloat` (`FortressLibrary.fss:4248`, `:4267`), `FortressBuiltin.fss:37` and `:583`, `String.fss:322`, "Not in the trait table: `FortressBuiltin.Character`", as on 2026-09-26;
- `__bigOperator` (`FortressLibrary.fss:1220`), "Type is not inferred", as on 2026-09-26;
- `Array2` and `Array3` (`:2391`, `:2764`), the same untyped local parameter as on 2026-09-26, reported now at the loop that calls it: "TryChecker returned an untyped expr: `fn (i) => do r := r // " " row(i) end`" (`:2409`, `:2800`, the local `row(i)` at `:2400`), where 2026-09-26 reported "Missing parameter type for i" at the local function.
- **`ExtentScalarRange` (`RangeInternals.fss:377`) no longer crashes; the site is hidden, not fixed.** Its declaration is now checked, with 42 errors under walk's setting, among them its `case ex of 1 => …` clauses' own `str > 0` (`:386-387`). The checker returns from a `case` whose subexpressions did not all check before it asks whether the value is a `GeneratorZZ32` (`scala_src/typechecker/impls/Functionals.scala:839`, the test at `:871`), so the `GeneratorZZ32` lookup that crashed is not reached (inferred from the code). It returns once those clauses check. Desugaring still fails on this declaration (§ 3).

The stage crash under the compile path's setting stays: the variance checker on `Stream`'s component, `OptionUnwrapException`.

### 2.7 The two settings side by side

The compile path's setting adds 372 `bound Object` errors and 12 abstract-method errors, and removes the 244 crossed `fill` pairs, the 340 `builtinPrimitive` errors and 24 other uninferred static arguments; it is 209 fewer in all (164 on 2026-09-26). Which column is the switch-over's is open: the library route kept the compile path's setting (`coordinator/library-route-judgement.md:37`), and answer 11 names it; but batch 7's Q1, default (a), would take the bound `Any` at the switch-over, which is neither column (§ 5).

## 3. Code generation

`desugar-codegen.md`'s method (2) as `run-all.sh` scripts it: the compile path's setting, the checker caught per declaration with its early returns kept, dispatch generation skipped. The script's `r2` runs no longer reproduce 2026-09-26's `r2` exactly: `-Dprobe.tolerant` also turns on `add-patch.py`'s per-declaration desugaring, which was added to that script after its `r2` runs, so today's `r2` differs from `r5` only by the `BottomType` switch.

- **`FortressLibrary.fss` reaches code generation without the `BottomType` switch.** `r2` and `r5` give the same result, and the switch never fires in `r5` (no `@@NC BOTTOM` line): overload rewriting no longer meets two `BottomType`s. Why is not traced; the 2026-09-26 stack ran through an operator reference in a generator clause, and rung F changed the tower's operators.
- **`RangeInternals.fss` still fails in desugaring on `ExtentScalarRange`** (`@@DS FAIL`, `CaseExprDesugarer`, `OptionUnwrapException`), the declaration whose checker crash is now hidden (§ 2.6); the per-declaration fallback steps around it as on 2026-09-26.

| | `FortressLibrary.fss`, 09-26 → today | `RangeInternals.fss`, 09-26 → today | `FortressBuiltin.fss`, 09-26 → today |
|---|---|---|---|
| declarations emitted | 312 → **326** | 53 → 56 | 17 → 17 |
| refused | 266 → **225** | 103 → 97 | 24 → 17 |
| of which on a declaration the checker passed | 10 → **4** | 0 → 0 | 0 → 0 |
| on one it reported errors on | 151 → 138 | 64 → 62 | |
| on one it crashed on | 5 → 5 | 1 → 0 | |
| on an overload declaration synthesized by overload rewriting | 100 → 78 | 38 → 35 | |
| overload sets whose dispatch generation was skipped | 283 → 198 | | |

(`r5-codegen-FortressLibrary.classified.txt`, `r5-codegen-RangeInternals.classified.txt`, `r2-codegen-FortressBuiltin.classified.txt`.)

- **Refusals by class, `FortressLibrary.fss`**: a missing type annotation 175 (160 + 15 in the pre-pass); no visitor for `Juxt` 39, `AsIfExpr` 3, `Label` 2, `LetFn` 1; `VarArgs` 2 and a static argument of a generic in an extends clause 1; `forbid` 1; an intersection-typed receiver 1. **No malformed overload set** (23 on 2026-09-26, all the tower's functional methods).
- **The four on declarations the checker passed**: `AsIfExpr` in `SequentialGenerator` (`:1279`) and `SimpleMappedSeqGenerator` (`:3500`), as on 2026-09-26; `__filter` (`:1200`), a method call on an intersection-typed receiver, as on 2026-09-20; and `LetFn` in `ReadableArray1` (`:2126`), a declaration the checker had reported errors on before.
- **The seven size refusals are gone**: `__DefaultVector`, `TransposedArray2`, `Col`, `Row`, `Rank1`, `Rank2`, `Rank3` are emitted (`@@CG OK`), since sizes are carried at run time as descriptors (climb batch 5 rung Z, `e893a3e00`).

## 4. The overload dispatch generator

**It finishes, and refuses 12 overload sets, from 131.** The run of § 3 with dispatch generation left on, under JFR, took 610 s: the checker and desugaring about 400 s, then code generation, dispatch generation included, from 10:49:57 to 10:53:26 UTC, about 210 s (`r3-dispatch.watch.txt`, `r3-dispatch.out`). Machine as § 1, load average 15.65 at the start, three other runs of this probe beside it; one run, an order of magnitude, not a comparison with 2026-09-26's 475 s.
- **What it refused**: 12 overload sets of the 198 that the skipping run passed over (`r5-codegen-FortressLibrary.out`, the `sets=` of its `@@CG OVLSKIP` lines; 131 of 283 on 2026-09-26), every one "apparently malformed overload set not rejected … Probable cause is a functional method and top level function with same signature" (`compiler/OverloadSet.java:408`): `=` 5, `>=` 2, `LEXICO` 2, `SQCAP` 2, `INVERSE` 1 (`r3-dispatch.out`, `@@CG OVLFAIL`). Ten are on the comparisons and on `Maybe` and `UniqueItem`, the families of the 18 exclusion errors; two start at a leaf, `ZZ32`'s `=` and `RR64`'s `>=`. The 119 tower sets and the 12 "Only handling some static args of generic types" (a size in an overload arm) are gone.
- Otherwise the declarations fare as in § 3: 325 emitted, 228 refused, the same 4 on declarations the checker passed (`r3-dispatch.classified.txt`).
- **Where the time goes** (`r3-dispatch.jfr-codegen.txt`, 16.0K samples in the code-generation window): 60 % of the samples reach the phase's own frame (JFR keeps 64 frames); 37 % have the exclusion test `TypeAnalyzer.pExc` on the stack, 33 % its comprises-clause check; 31 % the overloading oracle's `lteq`; 24 % `CodeGen.generateTopLevelOverloads`, dispatch generation proper; self time is 78 % the Scala tree walker `Walker.walk`.

## 5. The distance stage for phase 3's gates

**One full run takes about 24 minutes on this machine as it was loaded, whichever way it is run.** The compile path's setting, the twelve components, every stage, memo off:
- as twelve JVMs (`check-compile`, the method above): 1,440 s, `FortressLibrary` 770 s, `RangeInternals` 305 s, the other ten 365 s;
- as one JVM with one private cache (`stage`, `DistanceMulti.java`, `r6-stage-compile.out`): 1,431 s, `FortressLibrary` 977 s, `RangeInternals` 258 s, the other ten 158 s, the rest start-up.
Load average 13 to 18 at the starts, with one to three other runs of this probe beside each and the overflow batch throughout; the two are not a comparison of the two ways. The same one-JVM run under walk's setting, started last (`stage-walk`, `r6-stage-walk.out`), took 850 s, `FortressLibrary` 587 s: load 14.8 at its start and 6.5 at its end, with no other run of this probe beside it after its second minute. So the stage costs between about 14 and 24 minutes on this machine, by its load; on an idle one, less, not measured.

**The smallest run that reports the whole distance is that one JVM run**: one command (`run-all.sh <work-dir> build stage`), the twelve components with `FortressLibrary` first, whose target checks the twelve apis with every stage, then the other eleven with the apis checked the tracked way.
- It reports what the twelve runs report, within the checker's run-to-run variation: 1,531 distinct errors against 1,527; every unit's count equal except `FortressLibrary`'s (api 195 → 196, component 643 → 646); the 23 errors that go and the 27 that appear are all of the variation's kind (which pair of `LEXICO`, `SQCAP` or `INVERSE` declarations is named, the order of a union's members in a message, the type a join infers for an array body); the same eight crashes and the same stage crash (`compare-stage-compile.txt`).
- Nothing smaller reports the whole distance. The `FortressLibrary` target alone reports 940 of the 1,527 and misses the other eleven components' 587; and it is the part that takes the time (two thirds of the run), so leaving out a small component saves seconds (`AnyType`, `TypeProxy`, `Stream` and `NatReflect` take under 3 s each in the one-JVM run).
- A report-only stage should compare by kind and unit, or by site (`compare-sites.py`), not by error: the variation moves a few errors of a run every time (1,527 against 1,531 here; 1,736 against 1,738 for the one-JVM run under walk's setting, `compare-stage-walk.txt`; 1,055 against 1,051 in the rung F control of § 1), always in the families named above, and the kind counts do not move except the components' type errors, by 2 to 4.
- The shadows are made from the tracked sources at every build, by text edits that must each match exactly once (`make-shadows.sh`, `r00-make-shadows.txt`), so a tracked edit that moves an anchor stops the build; there is no copied source to go stale silently, which is what the count stage's `#shadow` row guards.
- Code generation is not in it: § 3's per-declaration run adds about 8 minutes, § 4's dispatch run about 10, on this machine as loaded.

**Which setting the stage should run is open.** Answer 11 names the compile path's (`coordinator/POSITIONS.md`, 2026-09-26). Batch 7's Q1, default (a), would bound an unbounded type parameter by `Any`, and the switch-over would then take walk's bound for the compiled path (`coordinator/CLIMB-BATCH-7.md` § 1, Q1). The compiled path would keep its compiled-expression desugaring, which code generation relies on for `case` and type ascriptions (`compiler/Desugarer.java:124`, `:141`; inferred that it is kept). That is a third setting, neither column of § 2: `-setting any` of `DistanceMulti.java`, bound `Any`, compiled-expression desugaring on. Measured once (`stage-any`, `r6-stage-any.out`, `errors-stage-any.txt`): **1,747 distinct errors**, walk's 1,736 and the compile path's 12 abstract-method errors of `FortressLibrary`'s component (inferred: from the compiled-expression desugaring's `AbstractDesugarer`, which marks a bodyless function abstract, `compiler/desugarer/AbstractDesugarer.java:40-46`), one export error fewer, the variance checker's stage crash on `Stream`, the rest the variation (`compare-walk-any.txt`). The 340 `builtinPrimitive` errors and the 244 crossed `fill` pairs stay under it; the 372 `bound Object` errors do not arise. So under (a) the stage runs `stage-any`, and walk's column is within a dozen errors of it; under (b), `stage`. Both would double the stage.

## 6. What this does not settle

- **The checker's run-to-run variation** moves a run's distinct count by 2 to 4 errors on the flat library (§ 5, three pairs of runs), in the comparisons' and `Maybe`'s pairs and in the joins of array bodies; 2026-09-26 measured about 1 % on the nested tower. Three pairs are not a distribution.
- **Rung R's effect** is not separated from that variation on the one run rung F also made.
- **The causes of the new `RangeInternals` type errors** are read off their messages, not traced.
- **Why the `BottomType` stop and the `combine2D`/`combine3D`/`CAP` Meet-Rule pairs went** is not traced.
- No gate was run; nothing here changes the tree.

## Files

Under `switch-over-distance-flat/`:

| file | what |
|---|---|
| `run-all.sh` | every run, by step (`build`, `count`, `control`, `check`, `codegen`, `codegen2`, `dispatch`, `stage`, `stage-walk`, `stage-any`) |
| `tables.sh` | the derived captures from a finished work directory |
| `DistanceMulti.java` | the twelve components in one JVM, under any of three settings |
| `compare-across.py`, `compare-sites.py`, `typecheck-groups.py` | the two trees compared error by error and site by site; § 2.5's groups |
| `r00-make-shadows.txt` | the shadow build, every edit applied |
| `r01-*.txt`, `r02-repro*.out` | the count stage as it runs, memo on and off; the driver reproducing it, and the same under the compile path's setting |
| `r03-control-compilerlib.out` | the compiler's own prelude, every stage, 0 errors |
| `r1-walk-*.out`, `r1-compile-*.out` | the twelve components, every stage and declaration, each setting |
| `r2-codegen-*`, `r5-codegen-*` | code generation per declaration, with `classify.py`'s tables |
| `r3-dispatch.*` | the dispatch run, its declarations classified, the watcher's samples and the JFR summaries |
| `r6-stage-*.out` | the one-JVM runs of § 5 |
| `errors-*.txt`, `errors-walk.tsv`, `errors-compile.tsv` | every distinct error and the tallies (the messages in the `.tsv` cut at 160 characters, as on 2026-09-26) |
| `compare-0926-*.txt`, `compare-sites-*.txt`, `typecheck-groups.txt`, `layers.txt` | the comparisons with 2026-09-26, the groups, the layers and per-declaration fates |

The `r*.out` captures omit the one-line-per-error dump (`@@SC ERR`) and the stack-trace lines; `run-all.sh` and `tables.sh` reproduce both.
