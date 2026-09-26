# Rung C, `rung-interp-coercion`: the skeptic's second judgement

Re-judgement after the repair round, on `wip/rung-interp-coercion` at `69d3eb799` (base `47437c65f`). The first judgement refused the rung; the judge ruled the repair; the worker made it in `d7f559170` (tests captured failing), `8878e0e45` (the edit), `2b3e7e397` and `69d3eb799` (stay-green, tuple differentials, javap). Every capture of this judgement is under `explorations/compile-ladder/rung-interp-coercion/probes/skeptic/`, prefixed `sk2-`, and opens with its machine line: nproc 4, Intel(R) Xeon(R) Processor @ 2.80GHz, 2800.212 MHz, openjdk 25.0.4, the load average at the start, and `FORTRESS_THREADS` per section. No timing is recorded here.

**Verdict: approved, with two required corrections.** Both are record corrections; no source or test file changes.

## 0. The provenance block

`REPORT.md` and `record.md` do not exist. The worker reports that its harness refused `.md` writes, and its record lines are in its structured result. This judgement's own write of `SKEPTIC.md` was not refused. This is the precedent of batch 3.5 (`explorations/compile-ladder/climb-batch-3.5/RECORD.md:13`): the gather writes the files from the structured results. So the five-line block cannot be opened yet; that is correction 1. What the block must carry was checked against the tree:
- historical: the diff edits seven files of the 2012 tree, each present at `a874948ac`: `interpreter/env/LazilyEvaluatedCell.java`, `interpreter/evaluator/BaseEnv.java`, `BuildEnvironments.java`, `LHSEvaluator.java`, `interpreter/evaluator/values/NonPrimitive.java`, `OverloadedFunction.java`, `OverloadedMethod.java`. `values/Coercions.java` is new. The worker's `historicalFiles` lists exactly the seven.
- spec: every citation the worker gives is under `Specification/basic/` or `Specification/advanced/`; none is under `library/apis/`.
- The file:line citations of the repair were opened: `OverloadedFunction.java:760`, `:776` (the cache), `:792` (the call to `bestMatchWithCoercion`, the team's TODO at `47437c65f`), `:841`; `Coercions.java:76-82`, `:88-116`, `:124-135`, `:199-230`; `OverloadedMethod.java:28`, `:48`, `:56-63`; `VarCodeGen.java:547`, `:730`; `NamingCzar.java:1415-1419`; `CodeGen.java:784`, `:826-831`; `FileTests.java:384-404`, `:534-537`, `:583-585`, `:999-1012`. Each says what the worker says.

## 1. The recorded failure

`probes/red-repair.txt`, committed in `d7f559170` before the edit commit `8878e0e45`, on the build of the first pass (no source change between `386e7423a` and `d7f559170`: `git diff --stat` of `ProjectFortress/src` is empty). `:4` `CoercionRedispatchRungC` fails `g(Wide) =/= g(WideOf)`; `:25` `CoercionBindRungC` fails at `topPair`; `:42` `XXXCoercionStaticNarrowRungC` fails as it must; `:64-73` every expression printed. The requirement is met.

## 2. The diff

The repair round changes three files. `Coercions.CoercedCall.applyInnerPossiblyGeneric` now converts and hands the converted arguments to the owning `OverloadedFunction`'s own `applyInnerPossiblyGeneric` (`Coercions.java:228-230`), the team's ordinary path with its cache and its functional-method refinement (`OverloadedFunction.java:758-780`); `OverloadedMethod.applyMethod` converts and calls itself again (`:56-63`). `Coercions.coerce` gains the element-by-element tuple case (`:88-116`), returning null on a size mismatch, a varargs element, or an element that does not convert, so those stay the loud errors they were (`probes/tuple-limits.txt:54-70`).

It cannot loop: each converted value has passed `typeMatch` against the target's domain type (`Coercions.java:78`), the unconverted positions matched plainly in `bestMatchWithCoercion`, so `bestMatchInternal` on the converted list finds the target or a more specific overload and the coercion pass is not re-entered. The one other cast of a `bestMatch` result, `OverloadedMethod.getApplicableMethod` (`:47-53`), is reached only from `FunctionalMethod.getApplicableClosure` (`FunctionalMethod.java:55-68`), whose arguments already matched the functional method plainly, and the object's method set holds that same declaration. `CoercedCall` is immutable and goes into the cache through `cache.syncPut`; the method path caches nothing (`mcache` is written nowhere). The edit does what the worker says and only that.

**The one clause the record does not engage.** `conversions-coercions.tex:532-536` ends "and the declaration with parameter type $T$ is applied to the call". Read alone it says the first pass's behaviour. The repair's reading, the judge's ruling, is that this names the static call's declaration, as for any call, and run-time dispatch then chooses among it and the declarations more specific than it (`advanced/overloading.tex:73-78`, `:466-468`; `basic/overloading.tex:263-276`), because the rewriting inserts an explicit `coerce` call into an ordinary call (`conversions-coercions.tex:253-265`) and what is "applied at run time" is "the statically chosen coercion" (`:567-570`). The spec's own example (`:572-604`) is consistent with that reading, since there the coerced value is an `A`, which excludes `B`. The compiled path takes the same reading (`probes/skeptic/diff-1.txt:21`, `:28`, and `sk2-diff-2.txt:109`, `:115` below). The reading is sound, but `CoercionRedispatchRungC.fss:36` cites `:532-536` for "the most specific declaration for its run-time type is applied", and the worker's specification list paraphrases `:532-536` without the clause. A reader who opens the citation meets a sentence that reads against the assertion. That is correction 2.

## 3. The precedent search

Adequate. The repair calls the team's two dispatch paths instead of the first pass's copy of the refinement. The worker counted the sites that applied the choice made before conversion: two, both repaired. It also checked the only other `bestMatch` caller that casts. The tuple case follows the pairing `FTypeTuple.subtypeOf` already does. The compiled `XXX` check lines follow `XXXUnionReturnRungS.test` and `XXXCoercionAnyOverloadRungC.test`. The worker measured the reason for the link twin: a run test does not compile (`probes/compiled-xxx-tuplevar.txt`).

## 4. The tests

`CoercionRedispatchRungC.fss` exercises the defect I raised: an even `NarrowOf` converts to `WideOf` and must reach `g(WideOf)`, an odd one converts to `WideOdd` and must reach `g(Wide)`. This covers the function, the method, the functional method on its converted `self`, and a parallel `SUM`. `CoercionBindRungC.fss:34-39` covers the tuple-typed local and top-level variable. Each of the sixteen new `.fss` test files has exactly one comment line, at `:4` (`:1` in `compiler_tests/XXXCoercionGenericFnCompiledRungC.fss`). It points at `REPORT.md`, which does not exist yet (correction 1).

My re-run on the tree as committed (`sk2-rung-tests-rerun.txt`) gives the following. The six plain tests `PASS` at `FORTRESS_THREADS=1` and `=4`. The six `XXX` tests fail at both counts as the record says. `XXXCoercionStaticRungC` answers 4 against 3. `XXXCoercionStaticNarrowRungC` answers `g(NarrowOf)` against `g(Wide)`. `XXXCoercionReturnRungC`, `XXXCoercionGenericFnRungC` and `XXXCoercionGenericTraitRungC` fail as in the first pass. `XXXCoercionTupleOverloadRungC` fails at the field assignment. Its second assertion (the overloaded function's tuple parameter) is not reached while the first fails. Both go through the same site, `bestMatchWithCoercion` asking `coercionFor` about a tuple type (the setter is an overloaded method, `sk2-rung-tests-rerun.txt:54-57`), so one repair flips both and one file is enough.

## 5. The competing-declaration grep

The six names this round adds (`CoercionRedispatchRungC`, `XXXCoercionStaticNarrowRungC`, `XXXCoercionTupleOverloadRungC`, `XXXTupleLocalVarCompiledRungC`, `XXXTupleVarFieldCompiledRungC`, `TupleVarCompiledRungCLink`) were grepped across `tests/`, `compiler_tests/`, `library_tests/`, `Library/` and `src/com/sun/fortress/`. Each is found only in its own `.fss` and its own `.test` or link `.test`. `class Coercions`, `CoercedCall`, `bestMatchWithCoercion`, `bestMatchWithoutCoercion`, `coerceToDeclared` and `coerceTuple` are each declared once under `src/com/sun/fortress/`. No clash.

## 6. The record fragment

Checked line by line against the tree:
- The FACTS lines are true as written: the three checks, the cache at `OverloadedFunction.java:760-776`, `mcache` written nowhere, and the three stay-green tests identical once normalised (`probes/stay-green-repair.txt:26-28`, `:121-123`).
- The row 19 note appends to the existing row (`explorations/fortress-gap-ledger.md:133`) and renumbers nothing. The base ledger ends at 386, and 387-397 are marked provisional for the gather.
- The row 340 and 391 appends are word for word from my first judgement.
- Rows 396 and 397 cite the codegen sites, and those sites say what the rows say.
- The batch record's premise that overloaded methods share the cache (`CLIMB-BATCH-4.md:65`; `:79` names only the function cache) is wrong, as the worker says: at `47437c65f`, `OverloadedMethod.java:50` calls `bestMatch` and nothing writes `mcache`. The gather should carry that correction.
- The gate expectation, `testSystem` +12 and the compiler track +7, is right. Twelve `tests/` files are added, and the seven compiler-track cases are one link, one run, one compile, a two-component link and two runs. `fortress.unittests.noopt=true` (`default_repository/configuration:51`) means no `runOpt` twins.

## 7. The three homes

- **Home 1.** Re-dispatch, function and method (my SkRedispatch, SkRedispatchMethod): `CoercionRedispatchRungC.fss:36-43`, and I saw it pass at 1 and 4 threads. The tuple-typed binding (my SkTupleArrow): `CoercionBindRungC.fss:34-39`, which passes.
- **Home 2.** `XXXCoercionStaticNarrowRungC.fss` (my SkStaticNarrow, route A's price) and `XXXCoercionTupleOverloadRungC.fss` (row 395) are `XXX`-named files in `tests/`, which need no `.test` (`FACTS.md:59`), and the harness reads both as expected failures (`probes/xxx-harness-repair.txt`, "Saw expected exception"). The compiled `XXXTupleLocalVarCompiledRungC` and `XXXTupleVarFieldCompiledRungC` have `.test` files whose checks hold only while the defect does: a fix prints `REACHED` or drops the named error, fails the check, and so turns red whatever the name (`FileTests.java:534-537`, `:583-585`). Both were shown red on a stand-in fix (`probes/compiled-xxx-tuplevar.txt:368-369`, `:390-391`).
- **No gated test possible.** R1, R2 and R4 (rows 392, 393, and the append to 391) have a static error as the specification's answer. No `XXX` form is green while the compile or walk wrongly succeeds (`FileTests.java:384-404`, and a plain test would be red today), so they are ledger rows with committed probes. R5 (row 394) is a defect of the specification's text. R3 is appended to row 340.

## 8. The count table

No count table. The rung does not set `testIsStage`, its tail names none, and the brief declares the checker count 103, unchanged (`CLIMB-BATCH-4.md:73`). The worker's structured report also declares 103. The manifest's `expectedCheckerCount` is 103, a prediction: the rung touches neither the compiled checker nor `Library/`.

## 9. The differentials of this judgement

Each probe is a program the worker did not write. It was run under `walk` at `FORTRESS_THREADS=1` and `=4`, then `fortress compile` and `fortress run` at 1 and 4, through the rung's `diff-both.sh`. The two thread columns agree in every probe.

| probe | walk, 1 and 4 threads | compiled, 1 and 4 threads | verdict |
|---|---|---|---|
| `Sk2MultiTag`: `k(Wide, Tag)`/`k(WideOf, TagOf)`, `k(NarrowOf(2), TagOf)` | `k(WideOf, TagOf)` (`sk2-diff-2.txt:95`, `:101`) | `k(WideOf, TagOf)` (`:109`, `:115`) | agree: a coerced position is re-dispatched with a plain position beside it |
| `Sk2InheritedMethod`: `pick(Wide)` in a trait, `pick(WideOf)` in the object, dotted, through a `Base`-typed receiver, and functional `combine` | `Obj.pick(WideOf)`, `Base.pick(Wide)` for an object without the override, `Obj.combine(WideOf)`; `SUM` 1000 (`sk2-diff-1.txt:73-90`) | the same (`:93-110`) | agree |
| `Sk2CountOnce`: an atomic counter in `coerce`, 1000 calls each through an overloaded function, an overloaded method, and a mix of plain and converting arguments in one `SUM` | sums 1500, 1500, 4500; the coercion ran exactly 1000 times in each (`sk2-diff-1.txt:112-121`) | the same (`:124-133`) | agree: one conversion per call, none lost or doubled at 4 threads, and a cached coerced choice is not applied to an argument that needs none |
| `Sk2TupleShapes`: nested tuple type, a single tuple parameter given two arguments or one tuple, a tuple parameter beside a plain one, a parallel `SUM` | 1 2 3; 9; 13; 6; 500500 (`sk2-diff-2.txt:2-15`) | the same (`:18-31`) | agree. The first attempt, `sk2-diff-1.txt:135-163`, was my syntax error (a nested tuple pattern) |
| `Sk2Oplus`: `opr OPLUS(Wide, Wide)`/`(WideOf, WideOf)`, both positions converted | `OPLUS(WideOf, WideOf)`; `SUM` 1000 (`sk2-diff-4.txt:2-11`) | the same (`:14-23`) | agree |
| `Sk2MultiArg`: `h(Wide, Object)`/`h(WideOf, ZZ32)`, `h(NarrowOf(2), 5)` | `h(WideOf, ZZ32)` (`sk2-diff-1.txt:3`, `:12`) | `h(Wide, Object)` (`:23`, `:48`), then `NoSuchMethodError` at the plain `h(WideOf(4), 7)` (`:38`, `:63`) | diverge; see below |
| `Sk2PlainMulti`: the same pair, no coercion anywhere | `w: Wide = WideOf(1); h(w, 5)` is `h(WideOf, ZZ32)` (`sk2-diff-2.txt:34`, `:39`) | `h(Wide, Object)` (`:46`, `:70`), then `NoSuchMethodError` at `h(WideOf(3), 5)` (`:60`, `:84`) | diverge, not a coercion matter |
| `Sk2PlainObj`: `g1(Object)`/`g1(ZZ32)`, and `h2(Wide, Object)`/`h2(WideOf, String)` | `o: Object = 5; g1(o)` is `g1(ZZ32)`, `g1(5)` is `g1(ZZ32)`, `h2` is `h2(WideOf, String)` (`sk2-diff-3.txt:2-13`) | `h2` agrees; `g1(o)` is `g1(Object)` (`:19`, `:44`) and `g1(5)` is `NoSuchMethodError` for a dispatcher `g1{…}(Object)` (`:32`, `:57`) | diverge; isolated to a `ZZ32` parameter beside an `Object` one |

**The divergence, under rule 4.** The specification settles it in walk's favour. A call dispatches among the declarations applicable at run time (`basic/overloading.tex:263-276`). The most specific of them is more specific than the static choice (`advanced/overloading.tex:466-468`). So `g1(o)` with `o` holding 5 is `g1(ZZ32)`, and a plain `g1(5)` must run. `Sk2PlainMulti` and `Sk2PlainObj` show it without any coercion, so the defect lies outside this rung's files, in the compiled path's overload dispatch. Walk is right, and this is the fourth outcome: the rung lands, and a row is owed against the compiled path (recommended below). Where the second parameter is a reference type, the compiled path re-dispatches a coerced argument exactly as walk now does (`Sk2MultiTag`, `h2`).

## 10. The failure-mode question

The repair round turns three loud failures into values:
- A tuple-typed declaration, parameter or assignment whose non-matching elements each have a coercion used to raise "Type mismatch binding", "RHS expression type … is not assignable" or "Unification error". It now holds the tuple converted element by element, with an element already of its type kept. That is the value `conversions-coercions.tex:694-705` gives.
- A size mismatch, a varargs element, or an element with no coercion is still the same loud error (`probes/tuple-limits.txt:54-70`).
- A coerced overloaded call no longer applies the pre-chosen overload silently. It dispatches the converted value, and a coercion that returns a non-member of its target stays loud (`Coercions.java:78-79`).
- Across the rung, "Failed to find any matching overload" becomes a converted call where a coercion applies. Where two apply with no most specific, it is a new loud "Ambiguous coercion".

No loud failure became a quiet value the specification does not give.

## 11. What stays with Pavol

The stay-green stop (`CLIMB-BATCH-4.md:77`) is met to the letter by `XXXimmutableTopLevel` (Java line numbers), `taskTrace2` and `taskTrace3` (identity hashes). Nothing converts in any of them. The worker's "FOR PAVOL 1" carries it, and the gather must put it in front of him. The judge did not lift that stop, and this judgement does not lift it either.

## Required corrections

1. The gather writes `explorations/compile-ladder/rung-interp-coercion/REPORT.md` and `record.md` from the worker's structured result, as in batch 3.5. `REPORT.md` opens with the five-line provenance block, and its historical: line names the seven 2012-tree files of section 0. The one comment line of each new test (`tests/CoercionRedispatchRungC.fss:4` and the eleven others, and the four compiler-track `.fss`) points at that file.
2. `REPORT.md`'s specification derivation quotes `Specification/basic/conversions-coercions.tex:532-536` in full, including "and the declaration with parameter type $T$ is applied to the call". It must record, as the judge's decision, the reading that names the static call's declaration, which run-time dispatch refines (`advanced/overloading.tex:73-78`, `:466-468`; `basic/overloading.tex:263-276`; `conversions-coercions.tex:253-265`, `:567-570`). The rejected alternative is to apply exactly that declaration, as the first pass did, and the record says why it was rejected. The worker's specification list at present paraphrases `:532-536` without the clause.

## Recommended row

**On the compiled path, an overloaded function with a `ZZ32` parameter beside an `Object` parameter does not dispatch at run time, and a call with a `ZZ32` argument dies with `NoSuchMethodError`.** With `g1(y: Object)` and `g1(y: ZZ32)`, `o: Object = 5; g1(o)` prints `g1(Object)`, and `g1(5)` fails with `java.lang.NoSuchMethodError` for a dispatcher method `g1{…}(fortress.CompilerBuiltin$Object)` that was never emitted (`explorations/compile-ladder/rung-interp-coercion/probes/skeptic/sk2-diff-3.txt:19`, `:32`, at 1 and 4 threads `:44`, `:57`). The same happens in a two-parameter family `h(x: Wide, y: Object)`/`h(x: WideOf, y: ZZ32)`, where `w: Wide = WideOf(1); h(w, 5)` prints `h(Wide, Object)` and `h(WideOf(3), 5)` dies the same way (`sk2-diff-2.txt:46`, `:60`). Walk answers `g1(ZZ32)` and `h(WideOf, ZZ32)` (`sk2-diff-3.txt:5-6`, `sk2-diff-2.txt:34`, `:36`). With `String` in place of `ZZ32` the compiled run dispatches correctly (`sk2-diff-3.txt:17-18`). No coercion is involved.
- Status: NEGATIVE-VERIFIED, an implementation gap in code generation of overload dispatch.
- Specification: `basic/overloading.tex:263-276`, `advanced/overloading.tex:466-468`.
- Probes: `probes/skeptic/Sk2PlainObj.fss`, `Sk2PlainMulti.fss`.
- Fix location, not established: where the compiled path builds the dispatcher of an overload set whose member types include `ZZ32` (`compiler/OverloadSet.java`). Not built or measured.
