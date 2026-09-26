<!-- Written 2026-09-26 by a delegated worker (W1 of coordinator/PLAN.md, "the true distance to the switch-over"), for the plan's phase 3, "the checker at a true zero", and the switch-over after it: the gate's checker-count stage reports 125 errors and the record said that count cannot see the whole distance, so the distance itself is measured here on today's tree, rather than inferred. Tree: the sources of b628871a2 (HEAD 8f806ba67 when the runs began; no commit since touches Library/ or ProjectFortress/). Nothing tracked outside switch-over-distance/ was changed: probe-only shadow classes put ahead of ProjectFortress/build on the classpath, one private cache per run (-Dfortress.caches), library copies in a scratch directory. Every command is in switch-over-distance/run-all.sh; the derived tables in switch-over-distance/tables.sh. -->

# The distance to the switch-over, measured

**Terms.**
- *The count stage*: the gate's checker-count stage, `coordinator/tools/checker-count/run.sh`. It runs the compile path's checker over the interpreter's library and prints one number, 125 today.
- *Api layer*, *component layer*: the checker checks each api (`.fsi`) and then each component (`.fss`) that implements one. The count stage prints only api errors; no component of the library has ever been checked by it.
- *Early return*: `StaticChecker.checkCompilationUnit` stops checking a compilation unit at the first stage that reports an error (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:191-193`, `:200-201`, `:269-272`, `:276-279`), and the type-check phase checks no component at all when any api failed (`compiler/phases/TypeCheckPhase.java:45-46`).
- *Walk's setting*, *the compile path's setting*: the desugaring switches of `Shell.useInterpreterLibraries()` (`Shell.java:379-386`: `extends Object` pre-desugaring off, compiled-expression desugaring off) and of `fortress compile` (`Shell.java:371-377`, `:404`: `extends Object` on; compiled-expression desugaring left at its default, on, `Shell.java:1285`). Under the compile path's setting every static parameter with no bound gets `extends Object` (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:134-148`).
- *Distinct error*: one location and one message. The same error printed by two stages or two runs is counted once, as the count stage's own total counts a set.
- *FLAT*, *FLATN*: the two flattened copies of `reviews/mie-probes/keep/make-flat-lib.py` (14 declaration headers; the number tower as siblings under `Number`, widening by `coerce`). FLAT also drops `Number`'s operator declarations; FLATN keeps them.

## The answers

1. **Everything the checker reports, today: 2.52K distinct errors under walk's setting, 2.36K under the compile path's, against the count stage's 125.** Of these, 551 (walk) are in the twelve prelude apis and 1.97K in their twelve components; 9 more declarations crash the checker under either setting. The count stage runs walk's setting (§ 2.1). By kind, § 2.3.
2. **The count stage sees 5 % of it.** Behind the `FortressLibrary` api's early return wait 426 overloading and return-type errors; behind the components, which it never checks, 1.97K.
3. **Code generation no longer runs as it did on 2026-09-20.** `desugar-codegen.md`'s method stops on today's tree before code generation, in overload rewriting on `FortressLibrary` (`BottomType` has no comparison) and in desugaring on `RangeInternals` (a `case` on a declaration the checker crashed on). With both stepped around: 312 declarations emitted, 266 refused, 10 of the refusals on declarations the checker passed (§ 3).
4. **The overload dispatch generator finishes**: about 475 s of code generation on a loaded machine, against 1.05K s without finishing on 2026-09-20. It refuses 131 of 283 overload sets, 119 of them the number tower's, 12 a size in an overload arm (§ 4).
5. **After the flattening**: the count stage reads 44, measured by the gate's own script on FLAT, as the inventory inferred. The whole api layer goes 551 → 193 (walk). `FortressLibrary`'s component and the apis together go 1.84K → between 850 and 1.05K under walk's setting, 1.75K → between 755 and 964 under the compile path's (§ 5).
6. **The three biggest items**, § 6: the library's component bodies, about 700 type errors never counted before; the overloading and return-type rules on the library's own declarations, about 360 that the flattening leaves under the compile path's setting (615 under walk's); and the compile path's `extends Object` bound, 371 errors that walk's setting hides and the flattening does not touch.

## 1. How it was measured

- **Machine**: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz (`cpu MHz` 2100.000), JDK 25.0.4, `FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`; three other workers ran beside these runs (load average 2.5-7 at the starts, printed at the head of every capture). No timing here is compared across sessions; the dispatch run's machine is in § 4.
- **Driver**: `switch-over-distance/Distance.java`, built only from public `Shell` entry points, as the count stage's `WorldFlip.java` is. It runs the compiler's own phase order through the type checker (`-order check`) or through code generation (`-order full`), under either setting.
- **Shadows** (`make-shadows.sh`): desugar-codegen's five, unchanged (`perf-probes/prelude/desugar-codegen/shadow-patch.py`: the component checked one top-level declaration at a time under `-Dprobe.tolerant`, code generation caught per declaration, dispatch generation skipped under `-Dprobe.skipOverloads`), and three edits of this probe (`add-patch.py`):
  - `-Dprobe.all`: every stage of `checkCompilationUnit` runs whatever the earlier ones reported; a stage that crashes is caught and printed; every error each stage adds is printed on one line with its stage;
  - `-Dprobe.componentOnly`: the apis are checked as the tracked method does, so a small component's run does not repeat the apis' long check (`FortressLibrary.fss`'s own runs check the apis with every stage);
  - two switches for code generation, § 3.
- **Overload memo off** in every run: `-Dfortress.analyzer.overload.cache=false` (FACTS § The checker and the one library, the memo defect).
- **Controls**:
  - the compiler's own prelude, `CompilerLibrary.fss`, under the compile path's setting with every stage run: 162 declarations checked, every stage of every unit 0 errors (`r03-control-compilerlib.out`);
  - the driver with every probe switch off reproduces the count stage's 125 (`r02-repro.out`); the count stage itself gives 125 with the memo on and off (`r01-count-stage.txt`, `r01-count-stage-memo-off.txt`);
  - **the checker is not deterministic on this library.** The same run over an unchanged copy of the library (`L0`) against the run over the tree, both under walk's setting: 1.83K and 1.84K distinct errors, 68 going and 80 appearing (`compare-control-tree-L0-walk.txt`). All of them are in the number tower: which pair of `There are multiple declarations of F with the same parameter type` the overloading checker reports, and which supertype a join in the tower infers (`ZZ64`, `ZZ` or `QQ`). Counts below carry about ±1 % from this; the kinds and families do not move.

## 2. Everything the checker reports

### 2.1 Which setting the count stage uses

Walk's. `WorldFlip.java:37` calls `Shell.useInterpreterLibraries()`, which turns `extends Object` pre-desugaring and compiled-expression desugaring off (`Shell.java:379-386`), and nothing after it turns them back on (`WorldFlip.java:38-41`). The inventory's inference (`coordinator/open-items-2026-09-26.md`, B2) is confirmed by reading. Measured: the stage's 125 are exactly this probe's walk-setting api errors that come before each api's first early return (§ 2.2).

### 2.2 The layers

| | walk's setting | the compile path's setting |
|---|---|---|
| the count stage (the api errors before each early return) | 125 | 231, the same driver with every probe switch off (`r02-repro-compile.out`); the stage itself has no switch for this setting |
| the api layer, every stage | 551 | 628 |
| the twelve components, every stage | 1,972 | 1,731 |
| **total, distinct** | **2,523** | **2,359** |
| declarations the checker crashes on | 9 | 9, and one stage crash |

By compilation unit (`errors-walk.txt`, `errors-compile.txt`, last table):

| unit | walk | compile |
|---|---|---|
| api `FortressLibrary` | 481 | 499 |
| api `RangeInternals` | 39 | 111 |
| api `NativeArray` | 22 | 4 |
| api `FortressBuiltin` | 9 | 10 |
| apis `List`, `Stream` | 0 | 4 |
| component `FortressLibrary` | 1,274 | 1,123 |
| component `RangeInternals` | 320 | 401 |
| component `FortressBuiltin` | 208 | 31 |
| component `String` | 79 | 85 |
| components `List`, `FlatString`, `Writer`, `NativeArray`, `NatReflect`, `Stream` | 91 | 91 |
| components `AnyType`, `TypeProxy` | 0 | 0 |

**What waits behind the `FortressLibrary` api's early return.** Its 55 errors come from the acyclic-hierarchy check (`StaticChecker.java:219`), so the api stops at `:269-272`, before the overloading checker (`:275`). Run anyway, that checker reports 178 overloading and 248 return-type errors on the api (`r1-walk-FortressLibrary.out`, `@@SC STAGE` lines). The other apis stop later or not at all: `RangeInternals` and `NativeArray` reach the overloading checker today, which is why their 39 and 22 are in the count.

**Per declaration**, `FortressLibrary.fss`'s 446 top-level declarations: 277 clean, 164 with errors, 5 crashes under walk's setting; 287, 154, 5 under the compile path's (FACTS, rung N, records 286, 155, 5).

### 2.3 By kind

Distinct errors, the twelve apis and the twelve components:

| kind | walk | compile |
|---|---|---|
| exclusion: "X excludes Y but it extends Y", "Types X and Y exclude each other" | 126 | 126 |
| `comprises` | 3 | 3 |
| overloading: "Invalid overloading of F", "multiple declarations of F with the same parameter type" | 707 | 458 |
| return type: "the return type of … should be a subtype of …" | 577 | 571 |
| an inherited abstract method with no implementation | 20 | 32 |
| `bound Object`: a static argument that does not satisfy the added bound | 0 | 371 |
| other well-formedness | 90 | 90 |
| the components' own type errors (§ 2.5) | 988 | 697 |
| export: a component that does not match its api | 12 | 11 |
| **total** | **2,523** | **2,359** |

- **Exclusion, 126**: the 62 api errors of the count (`FortressLibrary` 53, `FortressBuiltin` 9) and the same declarations again in the two components, 64. All but four are the multiple instantiation exclusion's four groups, the number tower, the comparisons, `Maybe` and the reductions (FACTS § The checker and the one library); the four are `RelationalPredicateCondition`'s `excludes Condition[\()\]` (`FortressLibrary.fsi:2530`, `.fss:4453`) and two of its subtraits (`.fss:4470`, `:4480`).
- **`comprises`, 3**: `QQ`'s ellipsis (`FortressLibrary.fsi:409`), the `AnyIntegral` closure (`.fsi:412`), and the closure again in the component (`.fss:615`).
- **Abstract methods, 20 and 32**: in `RangeInternals`'s range objects, `CAP` inherited from `Range` at a tuple instantiation (`Range[\(I, J)\]`) 6, `IN` from `Contains` 10 and `|_|` 2; `MultiplicativeRing[\Number\]`'s `one` in `Float` and `FloatLiteral` 2; under the compile path's setting also 12 in `FortressLibrary`'s component, among them `Generator[\PossibleReductionPair[\R\]\]`'s `generate` (`.fss:2889`).
- **`bound Object`, 371**: 339 are a tuple type as a static argument (`Condition[\()\]`, `Indexed[\(I, E),I\]`, `Generator[\(T,U)\]`), 26 are `Any`. `desugar-codegen.md` § 4.3's 712 were raw lines in the apis; the distinct count there today is 156, and 215 more in the components.
- **Other well-formedness, 90**: 58 ill-formed `RangeInternals` range types (`CompactFullRange3D` 15, `CompactFullRange2D` 10, …), 21 `Vector`/`Matrix` arguments that do not satisfy `T extends Number`, 11 `Arithmetic on nat static arguments is not supported`.
- **Export, 12**: one or two per component, together about 70 declarations whose api and component texts differ (a different extends clause 17, a different method 36, missing trait members 9, a different excludes clause 2, different modifiers 2, different parameters or static parameters 2), and three components that do not define every api declaration (`FortressLibrary`'s `immutableArray` at `.fsi:1357-1358`, `partition` at `:1387`, the sized `DOT` at `:1513`; `List.concat`; `RangeInternals.emptyScalarRange`).

### 2.4 Overloading and return types, by family

Every overloading error is a pair of declarations that the checker cannot separate: neither is more specific, their domains do not exclude, and no declaration sits on their meet (the Subtype Rule and the Meet Rule, `Specification/advanced/overloading.tex:149-166`, `:224-260`). The subclass is read off the message by `errors.py`, by `perf-probes/nat/triage/classify.py`'s test:

| subclass | walk | compile |
|---|---|---|
| `fill`, a function-taking declaration against a value-taking one (triage's e1) | 244 | 0 |
| `fill`, two of one kind from the two sides of the array traits' diamond (triage's c) | 58 | 58 |
| "multiple declarations with the same parameter type", the tower's operators (`BITAND` … `RSHIFT`, `DOT`, `BY`, `LEXICO`, `narrow`, `widen`, `numerator`, …) | 180 | 182 |
| the static-parameter sentence: the two declarations' static parameters differ (`Specification/basic/overloading.tex:100-107`; `CAP`, `IN`, `seq`, `MIN`/`MAX`, `juxtaposition`, `openRangeHelper`, `CMP`) | 85 | 78 |
| the rest, same static parameters, no meet: the Meet Rule (`FORWARD_CMP` 38, `map` 15, `IN` 12, `combine2D`/`combine3D` 14, `CAP` 10, `generate` 7, `lift` 6, `ivmap` 6, …) | 140 | 140 |
| **overloading** | **707** | **458** |

**The compile path's setting removes every crossed `fill` pair.** With `E extends Object`, a value-taking `fill(v:E)` excludes an arrow-taking `fill(f:I->E)`, which walk's unbounded `E` does not, since `E` may itself be an arrow (triage.md § 3, e1). The 58 diamond pairs stay.

**Return type, 577 and 571**: `juxtaposition` 132, `DOT` 96, `BY` 22, `MIN`/`MAX`/`CMP` 19 each, twelve integer operators (`BITAND` … `RSHIFT`, `CHOOSE`, `DIV`, `GCD`, `LCM`, `MOD`, `REM`) 16 each, `narrow` 14; the rest 5 or fewer each (`seq`, `SQCAP`, `partitionL`, `MINMAX`, `shift`, `round`, `distribute`, `atMost`, `empty`, `array1`/`array2`, …). The flat copy removes 531 of the 570 in `FortressLibrary` and its apis (§ 5), so they are the tower's.

### 2.5 The components' own type errors

Never counted before: the count stage checks no component, and the per-declaration fates on record count declarations, not errors. Coarsely grouped (`errors-walk.tsv`, `errors-compile.tsv`, kind `typecheck`):

| group | walk | compile |
|---|---|---|
| a call whose arguments fit no declaration ("Could not check call to …") | 322 | 356 |
| `builtinPrimitive("…")`: "Could not infer static argument T without context" | 319 | 0 |
| a body whose type is not the declared return type | 137 | 133 |
| no such method or getter | 69 | 90 |
| a method invocation or application that fits no declaration | 55 | 43 |
| a generator's filter not typed `Boolean` | 28 | 33 |
| a binding or an assignment | 25 | 23 |
| another static argument not inferred | 22 | 0 |
| other (`typecase` clause unreachable, `throw` of a non-exception, …) | 11 | 19 |
| **total** | **988** | **697** |

- **The 319 native bindings** are all the `builtinPrimitive` calls of the twelve components: `FortressBuiltin` 179, `FortressLibrary` 108, `FlatString` 14, `Writer` 11, `NativeArray` 7. The checker takes no context from the declared return type, so `T` stays unsolved (`scala_src/typechecker/impls/Functionals.scala:249-250`, `exceptions/ApplicationError.scala:155-164`); under the compile path's setting `T extends Object` and the same calls check. They go with the natives batch in any case.
- **The rest, about 670**, is the library's bodies as the compiled checker reads them. Many are the tower again (a body of type `QQ` declared `ZZ32`; `CMP` on `(Number & {RR64}, Number)`); the flat copy removes only 43 of `FortressLibrary`'s 426 net, so most are not (§ 5).

### 2.6 Crashes

Nine declarations crash the checker under both settings (`errors-walk.txt`, last table):
- the five FACTS names: `__bigOperator` (`FortressLibrary.fss:1124`), `Array2` and `Array3` (`:2295`, `:2668`), an untyped local parameter; `strToInt` and `strToFloat` (`:4185`, `:4204`), `Not in the trait table: FortressBuiltin.Character`;
- **three more on `Character`**, in components the record had not checked: `FortressBuiltin.fss:37` and `:574`, `String.fss:322`. `Types.CHARACTER` is not re-pointed at the interpreter's prelude (`compiler/Types.java:65`, `:83-88`; FACTS, zero.md's three-line fix);
- **one new site**: `ExtentScalarRange` (`RangeInternals.fss:377`), `Not in the trait table: FortressLibrary.GeneratorZZ32`. A `case` with no comparison operator (`case ex of 1 => …`, `:382`) makes the checker ask whether the value is a `GeneratorZZ32` (`scala_src/typechecker/impls/Functionals.scala:851-857`, via `compiler/Types.java:129-131`), a type only the compiler's prelude declares (`Library/CompilerLibrary.fsi:111`). Any such `case` in a program checked against the interpreter's prelude crashes the same way (inferred from the code, not probed separately).

Also a stage crash under the compile path's setting: the variance checker on `Stream`'s component, `OptionUnwrapException` (`r1-compile-Stream.out`).

### 2.7 The two settings side by side

The compile path's setting adds 371 `bound Object` errors and 12 abstract-method errors, and removes 244 crossed `fill` pairs, 319 `builtinPrimitive` errors and 22 other uninferred static arguments; smaller moves elsewhere (34 more inapplicable calls, 21 more missing methods) leave it 164 fewer in all. The switch-over keeps the compile path's setting (`coordinator/library-route-judgement.md:37`), so its column is the one that counts; the count stage, on walk's, cannot see either change.

## 3. Desugaring and code generation

`desugar-codegen.md`'s method (2), re-run as it was: the compile path's setting, the checker caught per declaration with its early returns kept, dispatch generation skipped (`r2-*`).
- **`FortressBuiltin.fss`** reaches code generation: 17 emitted, 24 refused, none on a declaration the checker passed (`r2-codegen-FortressBuiltin.classified.txt`).
- **`FortressLibrary.fss` stops after the checker**, with one error: `subtypeCompareTo(class com.sun.fortress.nodes.BottomType class com.sun.fortress.nodes.BottomType) is not implemented!` (`r2-codegen-FortressLibrary.out`). Overload rewriting sorts the overloadings an operator reference may call by their types (`compiler/OverloadRewriteVisitor.java:80`, `:193`), and two of them carry `BottomType`, which `NodeComparator` does not compare (`nodes_util/NodeComparator.java:431-471`). The stack (`r5-codegen-FortressLibrary.out`, `@@NC BOTTOM`) runs through an operator reference in a generator clause. That the `BottomType` is a static argument the checker inferred as the bottom type is inferred, not traced. On 2026-09-20 this phase passed with no diagnostic.
- **`RangeInternals.fss` dies in desugaring**: `CaseExprDesugarer.forCaseClauses` (`compiler/desugarer/CaseExprDesugarer.java:57`) unwraps a missing annotation on the `case` of `ExtentScalarRange`, the declaration the checker crashed on (§ 2.6).

Two probe switches step past both (`add-patch.py`; `r5-*`): desugaring applied one declaration at a time when it fails on the whole component, the failing declaration kept undesugared (`-Dprobe.tolerant`); two `BottomType`s compare equal (`-Dprobe.bottomCompare`).

| | `FortressLibrary.fss` | `RangeInternals.fss` | 2026-09-20, `FortressLibrary.fss` |
|---|---|---|---|
| declarations emitted | 312 | 53 | 275 |
| refused | 266 | 103 | 313 |
| of which on a declaration the checker passed | **10** | 0 | 5 |
| on one it reported errors on | 151 | 64 | 96 |
| on one it crashed on | 5 | 1 | 112 |
| on an overload declaration synthesized by overload rewriting | 100 | 38 | 100 |

Refusals by class (`FortressLibrary.fss`, `r5-codegen-FortressLibrary.classified.txt`): a missing type annotation 184; no visitor for `Juxt` 38, for `AsIfExpr` 3, `Label` 2, `LetFn` 1; a malformed overload set 23; a type reference or descriptor 10; the kind environment or trait table 3; an intersection-typed receiver 1; a `forbid` clause 1. `canCompile` refused nothing.

- **The ten on declarations the checker passed**:
  - seven are a size as a static argument, "Only emitting RTTI for types right now": `__DefaultVector`, `TransposedArray2`, `Col`, `Row` (`FortressLibrary.fss:2210`, `:2431`, `:2479`, `:2490`) and `Rank1`, `Rank2`, `Rank3` in their extends clauses (`:1605`, `:1608`, `:1611`). The run-time size rung's work (design B);
  - two `AsIfExpr`, a type ascription with no visitor in the code generator: `SequentialGenerator` (`:1183`) and `SimpleMappedSeqGenerator` (`:3437`). New: before rung N these declarations did not check clean;
  - one method call on an intersection-typed receiver, `__filter` (`:1104`), as on 2026-09-20.
- **The 23 malformed overload sets** (7 on 2026-09-20) are all the tower's functional methods (`=`, `<`, `-`, `numerator`, `denominator`, `widen`, `|_|`, `MOD`, `CMP`, …), "Probable cause is a functional method and top level function with same signature" (`compiler/OverloadSet.java:402`).
- The desugaring fallback failed on one declaration only, `ExtentScalarRange`.

## 4. The overload dispatch generator

**It finishes, well inside the cap.** With dispatch generation left on and everything else as in § 3's second run, the whole run took 840 s: the checker and desugaring 363 s, then code generation, dispatch generation included, from 10:47:23 to 10:55:18 UTC, about 475 s (`r3-dispatch.watch.txt`, `r3-dispatch.out`). The watcher's 30-minute cap on code generation was never reached. On 2026-09-20 the same generator ran 1.05K s without emitting a declaration and was stopped by hand (`desugar-codegen.md` § 3, caveat 3).

- **Machine** (protocol § 6): `nproc` 4; `Intel(R) Xeon(R) Processor @ 2.10GHz`, `cpu MHz` 2100.000; load average at the start 5.19 4.24 3.99, with three other workers running; JDK 25.0.4; `FORTRESS_THREADS=1`; `-Xmx4g -Xss64m`; JFR with its `profile` settings throughout. One run, so the seconds are an order of magnitude, not a measurement to compare.
- **What it refused: 131 overload sets**, of the 283 that the skipping run passed over (`r5-codegen-FortressLibrary.out`, the `sets=` of its `@@CG OVLSKIP` lines):
  - 119 "apparently malformed overload set not rejected … Probable cause is a functional method and top level function with same signature" (`compiler/OverloadSet.java:402`), every one on the number tower's operators and functions (`=`, `+`, `-`, `<`, `DIV`, `MOD`, `DOT`, `BY`, juxtaposition, the integer operators, …). The first seven are the seven of 2026-09-20, `denominator`, `narrow`, `numerator`, `partitionL`, `round`, `unsigned`, `widen`;
  - 12 "Only handling some static args of generic types" (`OverloadSet.java:1199`): an overload arm generic in a size, which design B's dispatcher change covers (FACTS § The checker and the one library, the size probes).
  - Otherwise the declarations fare as in § 3: 314 emitted, 265 refused, the same 10 on declarations the checker passed (`r3-dispatch.classified.txt`).
- **Where the time goes** (`r3-dispatch.jfr-codegen.txt`, 43.7K samples in the code-generation window):
  - 71 % of the samples have the exclusion test `TypeAnalyzer.pExc` on the stack, 67 % its comprises-clause check (`checkCC`), 30 % its multiple-instantiation clause (`checkP`), 19 % `comprisesClause`; 17 % the overloading oracle's `lteq`;
  - self time is 62 % the Scala tree walker `Walker.walk`, inside type substitution (`TypeAnalyzerUtil.substitute`, 19 % inclusive) and self-type removal (`TypeAnalyzer.removeSelf`, 22 %);
  - JFR keeps 64 frames of a stack, and 78 % of the window's samples are cut before the phase's own frame. Of the 12.0K that reach it, 45 % are in `CodeGen.generateTopLevelOverloads`, dispatch generation proper; 18 % in `CodeGen`'s constructor, which computes each trait's inherited methods; the rest in the trait and object passes.
- **Why it now finishes** is inferred, not measured: on 2026-09-20 the time was in the same exclusion test (`pExc`, `excludesClause`), and since then the trait table memoizes `parents` and `excludesClause` (`d28cf74d0`; FACTS § The checker and the one library), and rung N took the checker's crashes from 112 declarations to 5. A run with that memo off (`FORTRESS_ANALYZER_CLAUSES_CACHE=false`) would separate the two; it was not made.

## 5. The flattened copy

`keep/make-flat-lib.py` still applies to today's tree: every one of its edits finds its text exactly once. Measured on FLAT and FLATN with the probe's every-stage run (`r4-*`) and, for the count, with the gate's own driver through `keep/count-variant.sh` (`r4-count-stage-on-copies.txt`, memo off):

| | tree | FLAT | FLATN |
|---|---|---|---|
| the count stage | 125 | **44** | 44 |
| the api layer, every stage, walk | 551 | 193 | 221 |
| the api layer, every stage, compile | 628 | 270 | 298 |
| `FortressLibrary`'s component and the apis, walk | 1,837 (L0) | not checkable | 1,049 |
| the same, compile | 1,751 | not checkable | 964 |

- **The count after the flattening is 44**, as the inventory inferred: the `FortressLibrary` api keeps one error, `RelationalPredicateCondition`'s `excludes Condition[\()\]`, and so still stops before its overloading checker; `NativeArray`'s 22 `fill` pairs and `RangeInternals`'s 21 stay.
- **FLAT's component cannot be checked**: it stops at name resolution, `Operator prefix SQRT is not defined` (`FortressLibrary.fss:2242` of the copy), because FLAT drops `Number`'s declarations and nothing restates `SQRT` on `RR64` yet (`price-keep-the-rule.md` § 6 lists it among the rewrite's parts). FLATN keeps them, so its component checks, but it also keeps `Number`'s catch-alls beside the leaves' own operators, which the real flattening drops. So FLATN over-counts: 199 of its errors (walk) are new beside the tree's, most of them `MIN`, `MAX`, `CMP`, `MINMAX`, `round`, `DOT`, `BY` and juxtaposition between `Number`'s declaration and a leaf's (`compare-L0-FLATN-walk.txt`, "appear"). What stays from the tree is 850 (walk) and 755 (compile); the estimate for `FortressLibrary` and its apis after the flattening is therefore **850 to 1.05K under walk's setting and 755 to 964 under the compile path's**.
- **What the flattening removes** (walk, `FortressLibrary` and the apis, 987 errors): 531 return-type, 215 overloading (the "same parameter type" pairs, `combine2D`/`combine3D`, part of `CAP`), 124 of the component's type errors, 113 exclusion, 3 `comprises`.
- **What stays** (walk, 850): 463 overloading (`fill` 300, `FORWARD_CMP` 38, `IN` 26, `CAP` 24, `map` 15, `seq` 14, the sentence's `MIN`/`MAX` 12, `generate` 7, `lift` 6, `ivmap` 6, 15 more), 302 of the component's type errors, 41 well-formedness, 39 return-type (`MIN`/`MAX`, `distribute`, `seq`, `shift`, `empty`, `array1`/`array2`, …), the four `RelationalPredicateCondition` exclusion errors and one export error.
- **Not measured under the flattening**: the other eleven components (698 errors today under walk, 608 under the compile path's), since the copies change only `FortressLibrary` and `FortressBuiltin`. Taking them as unchanged, the whole library after the flattening is about 1.55K to 1.75K errors under walk's setting and 1.35K to 1.55K under the compile path's (inferred).
- The flat copy checks 2.4 times faster: 534 s for FLATN against 1.23K-1.32K s for the tree (walk), on the same busy machine.

## 6. The three biggest items between today and a switch-over

By the compile path's setting, which the switch-over keeps, and after the flattening:

1. **The library's bodies, about 700 errors, never counted and not designed as rungs.** 697 type errors in the twelve components today (§ 2.5), of which the flattening removes little (49 net of `FortressLibrary`'s 329 in FLATN under this setting); 9 declarations that crash the checker, six of them on two names only the compiler's prelude declares (`Character`, `GeneratorZZ32`); and 12 export mismatches between each component and its api. This is where most of the distance is, and the count stage cannot see any of it.
2. **The overloading rules on the library's own declarations, about 360 after the flattening.** In FLATN's `FortressLibrary` and apis under the compile path's setting: the `fill` diamond 56, the static-parameter sentence 84 (Pavol's open decision, PLAN.md item 9), the Meet Rule pairs 136 (`FORWARD_CMP`, `IN`, `map`, `generate`, `lift`, `ivmap`, …), and 82 return-type errors; FLATN's `Number` catch-alls add some of the sentence and return-type ones. The crossed `fill` pairs that W3 addresses are 244 under walk's setting and none under the compile path's.
3. **The compile path's `extends Object` bound, 371 errors**, 263 of them still in FLATN's `FortressLibrary` and apis: every generic instantiated at a tuple type or at `Any`. Walk's setting, and so the count stage, shows none.

Beside these, smaller: the dispatch generator's 131 refused overload sets (§ 4), 119 of them the tower's, which the flattening should take with it (inferred; no flat copy was compiled); code generation's two new stops before it is reached (§ 3), and its ten refusals on checked declarations, seven of them the run-time size rung's; the five crash sites on record and the four found here.

## 7. What this does not settle

- **The flattening estimate is a range, and only for `FortressLibrary` and its apis.** FLAT's component does not resolve; FLATN keeps `Number`'s catch-alls. The real flattening (batch 6) replaces them and adds `coerce` sites; its count is neither copy's.
- **The checker's own nondeterminism** (§ 1, controls) moves every count by about 1 %.
- **Nothing is triaged below the family.** The subclasses of § 2.4 are read off the messages mechanically (`errors.py`'s `overload_sub`); which of the 140 Meet Rule pairs a declaration fixes and which need a checker change (triage.md § 4: `FORWARD_CMP` and `IN` do) is not re-measured on today's tree.
- **The components' type errors are grouped, not classified** by cause (tower, library defect, checker limit).
- **The two code-generation stops** are stepped around by probe switches, not fixed; whether the `BottomType` comes from the checker's inference is inferred.
- No gate was run; nothing here changes the tree.

## Files

Under `switch-over-distance/`:

| file | what |
|---|---|
| `run-all.sh` | every run, by step (`build`, `count`, `control`, `check`, `codegen`, `codegen2`, `dispatch`, `flat`) |
| `tables.sh` | the derived captures from a finished work directory |
| `Distance.java` | the driver |
| `make-shadows.sh`, `add-patch.py` | the shadow classes: desugar-codegen's five, and this probe's edits |
| `errors.py`, `compare.py` | every distinct error of a set of runs, classified; two sets compared error by error |
| `watch-dispatch.sh`, `jfr-stacks.py` | the dispatch run's thread sampler and cap; the JFR summary |
| `r01-*.txt`, `r02-repro.out`, `r02-repro-compile.out` | the count stage as it runs, memo on and off; the driver reproducing it, and the same under the compile path's setting |
| `r03-control-compilerlib.out` | the compiler's own prelude, every stage, 0 errors |
| `r1-walk-*.out`, `r1-compile-*.out` | the twelve components, every stage and declaration, each setting |
| `r2-codegen-*` | desugar-codegen's method as it was |
| `r5-codegen-*` | the same with the two switches, with `classify.py`'s tables |
| `r3-dispatch.out`, `.classified.txt`, `.watch.txt` | the dispatch run, its declarations classified, and the main thread's top frames every 30 s |
| `r3-dispatch.jfr-codegen.txt`, `.jfr-frames.txt`, `.hot-methods.txt` | its JFR samples: the code-generation window, the whole run, and `jfr view hot-methods` |
| `r4-*.out`, `r4-count-stage-on-copies.txt` | the flat copies |
| `errors-walk.*`, `errors-compile.*` | every distinct error, and the tallies, for the tree under each setting |
| `errors-FLAT-*`, `errors-FLATN-*`, `errors-L0-walk.txt`, `errors-*-FortressLibrary.txt` | the same for the copies and for `FortressLibrary`'s runs alone |
| `compare-*.txt` | the control and the three flat comparisons |

The `r*.out` captures omit the one-line-per-error dump (`@@SC ERR`), whose errors are in the tables with the message cut at 160 characters; `run-all.sh` and `tables.sh` reproduce both in full.
