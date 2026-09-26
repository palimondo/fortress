# Rung N (`rung-nat-checker`): the first skeptic's judgement

**Verdict: refused.** The one thing that must change: two behaviours this rung repairs are not pinned by any gated assertion, and the three-homes rule puts both in home 1. (a) The `ExportChecker.equalIntExprs` edit (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:645-646`) has no test at all. With only that file taken back to `47437c65f`, a component that exports its own api with a sized function is refused with "Missing declarations: {unbox[\nat k\](b:SkSizedApi.Box[\k\]):ZZ32 ...}", and with the edit it checks clean (`explorations/compile-ladder/rung-nat-checker/probes/skeptic/export-ab.txt:3-11`). (b) `XXXNatArithChecker.test` says `compile_err_contains=Arithmetic on nat static arguments is not supported by the type checker`. That string is in the declaration-level message and in the use-site message alike (`explorations/compile-ladder/rung-nat-checker/probes/skeptic/junit-rerun.txt:101-102`, `:107-108`), so the use-site check that REPORT.md section 6 counts as home 1 (`TypeWellFormedChecker.scala:144-145`) could be deleted and the test would stay green. Each needs a gated assertion that goes red without its edit, and that has to be shown before the next judgement. Everything else below is a correction for the same repair round, or a recommended row.

Inherited state: branch `wip/rung-nat-checker` at `6ee779492`, five worker commits past `47437c65f`, working tree clean. `ProjectFortress/build` is newer than every edited source (the Scala classes date from 02:02:23, and the last source edit, `OverloadingOracle.scala`, is from 02:01:32). The five library components are in `default_repository/caches/bytecode_cache`. I did not rebuild. All my runs used `FORTRESS_THREADS=1` on one machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.80GHz, 2800.212 MHz, JDK 25. The load average at the start of each run is in the first lines of its capture. I recorded no timings of my own.

## 0. The provenance block

It has five lines: problem, spec, precedent, deviation, historical. I opened every cited line.
- problem: `NatInferredChecker.fss:14` is the `unbox` assertion in the first commit's version too (`git show 9e014be3e:…`). `junit-before.txt:4` is `java.lang.Error: Not yet implemented` and `:185` is the `VarType`→`IntExpr` `ClassCastException`. `checker-count-before.txt:16` is the `#crash` row as quoted.
- spec: `Specification/basic/trait-parameters.tex:68-90` (nat and int parameters, and "instantiated at runtime with numeric values" at `:82`). `Specification/advanced/overloading.tex:95-103` (static parameters identical up to α-equivalence, then ignored) and `:158-170` (the Subtype Rule). Both are prose chapters, not `library/apis/`.
- precedent: `Fortress.ast:1593` is `_InferenceVarOp(Object id);` in the edited file. `Formula.scala:61` is `OPrimitive`, `:805` is `oEquivalent`, `:355-371` are `oSimplify`, `oContradiction` and `oTrivial`, and `:640-642` is the op `makeSub`. `IntNat.java:126-146` is `unifyStaticArg`, with the three cases the report names. `STypesUtil.scala:333-345` is `staticParamToArg`. `keep-size-params.patch` is 22 lines.
- deviation: points to section 5, which lists them.
- historical: it names every 2012-tree file the net diff edits: `Fortress.ast`, the 30 node files (26 changed, 4 new, and I counted them in `git diff --stat`), `FortressAst.scala`, `NodeFactory.java`, `ApplicationError.scala`, `FnNameInfo.java` and the ten `scala_src` files.

Nothing is missing.

## 1. The recorded failure

It exists, and it was captured before the edit. Commit `9e014be3e` holds only the nine tests, `junit-before.txt` and `checker-count-before.txt`, and no source file. All nine tests are red at `NI.nyi` or at the `ClassCastException`. For the final ten files, `junit-before-final.txt` uses the worker's classpath shadow of the eleven unedited sources. Its written-out case reproduces the real pre-edit line (`:18` against `junit-before.txt:185`). My own `typecheck` runs on that shadow crash the same way on every sized probe (for example `probes/skeptic/differential-1.txt:31-33`), so the shadow does stand in for the pre-edit checker.

## 2. The diff

I read it line by line. It does what section 1 of the report says. The node, `NodeFactory.make_InferenceVarInt` and the Formula size track match the op track's shape. `TypeAnalyzer.pEqv(IntExpr, IntExpr)` replaces the old `(_: IntArg, _: IntArg) => pTrue()`. `keep-size-params` is the patch without its switch. The `OverloadingOracle` binding, `FnNameInfo.boundsFor`, `TypeWellFormedChecker`, `Functionals` together with `ApplicationError`, and `ExportChecker` are each as described. The comments added to the source explain code; none of them records provenance.

Points I checked and did not find wrong:
- Capture between the two declarations' sizes in the new binding. `satisfiesReturnTypeRule` alpha-renames both arrows with the global fresh-name counter (`SNodeUtil.scala:192-203`, `:344-375`), so an escaped size of `g` cannot share a name with one of `f`'s. My probe that looked like a capture (`SkCapture`, `differential-2.txt:3-18`) turned out to be phase masking: once the call is removed the pair is refused (`SkCapDecl`, `differential-3.txt:106-112`), and so are the distinct-name and type twins (`:128-134`, `:172-178`).
- `normalizeUA` now puts size parameters after type parameters (`TypeSchemaAnalyzer.scala:484-488`). `SkOrder`, with `[\nat n, T\]`, still refuses the one bad pair and accepts the two good ones (`differential-2.txt:126-132`).

## 3. The precedent search

The report finds the two inference-variable nodes and the equality-only op track, and it follows them. It counts the kind-blind static-argument sites: two (`AbstractMethodChecker.scala:83` and `FnNameInfo.boundsFor`). My grep for `makeTypeArg` or `makeVarType` built from a static parameter under `scala_src/` and `compiler/` finds no third kind-blind site. The other hits make fresh type parameters (`CodeGen.java:2426`, `FnNameInfo.java:77`) or are already kind-guarded (`TypeCheckerResult.java:164`).

The ledger search missed one row. Provisional row 388's first half, "`walk` cannot infer a generic method's own static argument", is already ledger row 21, "static arguments on a generic *method* cannot be inferred (`x.zip(y)` needs `x.zip[\V\](y)`)", which is a `walk` probe (`explorations/spec-probes/p8_omit.fss` imports `List`). See the corrections.

## 4. The tests

I re-ran all ten, plus `AfterTypeChecking`, `XXX1p`, `XXX5z`, `Compiled12.invariantInference`, `NatArgRungSLink` and `XXXNatArgRungS`, each `.test` in its own JVM (`probes/skeptic/junit-rerun.sh`, capture `probes/skeptic/junit-rerun.txt`). Results:
- The three plain tests each print `OK (1 test)` (`:7`, `:15`, `:23`).
- The two exception-shaped tests print `OK Saw expected exception` (`:28`, `:37`).
- The five refusal tests print `Saw expected failure` (`:51`, `:75`, `:92`, `:113`, `:124`). Their counts are `has 1 error` (DispRTR), `3 errors` (RetSize, all three pairs listed), `3 errors` (Mismatch) and `4 errors` (Arith).
- `AfterTypeChecking` prints `OK (97 tests)` (`:234`), `Compiled12.invariantInference` prints `OK (6 tests)` (`:293`), and `XXXNatArgRungS` still gives `Saw expected failure` (`:312`).

The harness makes an `XXX` compile test with `compile_err_contains` demand a failure that carries that message (`FileTests.java:384-404`). A refusal for another reason is red, and so is a clean compile. So the RetSize and Mismatch tests do pin each of their pairs through the error count.

What the tests do not pin: the use-site arithmetic check (see the verdict) and the `ExportChecker` edit (see the verdict). Each test file carries one comment line and no essay. Two control assertions in `XXXNatDispArmChecker.fss` (the scalar arm and the catch-all) carry no citation, and `XXXNatOverrideChecker.fss` cites `Library/FortressLibrary.fsi` without a line. Both are minor.

## 5. The competing-declaration grep

Every name the edit adds (the 18 in report section 12, plus `nImplies`, `nMerge`, `nUnit`, `nSimplify`, `nContradiction` and `nTrivial`) occurs under `ProjectFortress/src` only in the edited files and the generated `nodes/` (`git grep -lw`). The node's hand-written parity sites match `_InferenceVarOp`'s: `NodeFactory`, `Formula`, `TypeAnalyzer` and `STypesUtil`. The report's check of the test component names against both corpora holds, and none of my probe names (`Sk*`) collides.

## 6. record.md

- FACTS line 1. True as written, and its sources exist. One precision is owed: the "several-sizes-at-one-call" program is `NatInferredChecker`'s `dot`.
- FACTS line 2. True. My `SkRetEsc`/`SkRetEscT` and `SkCapDecl`/`SkCapDeclT` probes show sizes and types refused alike (`differential-1.txt:176-227`, `differential-3.txt:106-194`).
- FACTS line 3 and row 387. True and sourced (`compile-probes.txt:29-33`, `walk-probes.txt:50-69`). The row is new; I found no ledger row on the return-type rule or on permuted parameters.
- The note on row 307 does not renumber anything and cites real files.
- Row 388: the method half duplicates row 21 (section 3).
- Row 389 is new, and its A/B is on file.
- The "What comes back to Pavol" bullet on row 387 says "for type parameters today". It should also say that sizes reach this acceptance after this rung, through `keep-size-params`.

## 7. The three homes

| defect | the rung's home | checked |
|---|---|---|
| no size rule (row 307) | 1 | the three plain tests pass; I re-ran them |
| any two sizes equal | 1 | Mismatch and RetSize pass, with pinned counts |
| return-type rule refuses a size-generic arm | 1 | DispArm passes; `xxx-goes-red-no-keep.txt` shows it red without `keep-size-params` |
| `subarray` override refused | 1 | Override passes; the same capture shows it red |
| existential reading accepts `SubOvOneSize` | 1 | RetSize's third pair is listed among the 3 errors (`junit-rerun.txt:58-79`) |
| use-site arithmetic refused only as "not applicable" | 1 | **not pinned**: the test's string also matches the declaration error (verdict (b)) |
| `ExportChecker.equalIntExprs` always false | not named by the rung | **no test**; I measured it (verdict (a)) |
| `OverloadSet.java:1199`, `CodeGen.java:5793`, `3$RTTIc` | 2 | `XXXNatDispArmChecker` and `XXXNatOverrideChecker` are red before the edit (`junit-before-final.txt:41-68`) and green after; `XXXNatArgRungS` keeps its verdict (`junit-rerun.txt:312`) |
| arithmetic, `bool` inference | 2 | `XXXNatArithChecker` and `XXXNatBoolChecker` are expected failures |
| `SubOvSwap` | fourth case, row 387 | the reasoning holds: `SubOvSwap` is the shape the batch record excepts (a size-generic arm beside a less specific sibling, admitted by `keep-size-params`; build 1 accepts it and no-keep refuses the whole shape), and the type twin is accepted already |
| `walk` method inference, `bool` | 3, row 388 | the captures are committed; the method half is row 21 |
| six library declarations | fourth case and 3, row 389 | the captures are committed |

## 8. The count table

The table is `probes/checker-count-after.txt`: `#total 125` (`:14`) and `#crash none` (`:16`). REPORT.md section 7 says 125, record.md says 125, and the structured report says 125. The manifest's expectedCheckerCount, which is a prediction, is 125. All four agree. `NativeArray` is 44 (`:8`), and `checker-count-diff.txt` adds exactly 22 `Invalid overloading of fill` errors and no `Arithmetic` error.

## 9. The differential (my own programs, `probes/skeptic/`)

Every program ran under walk, `fortress typecheck` and `fortress compile`, then under `typecheck` on the unedited checker (the worker's shadow `tmp/base-classes`). The programs without a size also ran compiled. The runners are `run-probes.sh`, `run-api.sh` and `run-export-ab.sh`. The unedited checker crashed on every sized program, except `SkLitTrait`, which it called "multiple declarations ... with the same parameter type" (`differential-3.txt:29-33`: the old any-two-sizes-equal rule).

| program | walk | compiled checker (landed) | reading |
|---|---|---|---|
| `SkSquare`: `trace[\nat n\](m: Mat[\n,n\])` on `Mat[\3,3\]`, `Mat[\3,4\]` | 7, then a refusal at run time | refuses the `3,4` call (`differential-1.txt:46-50`) | agree |
| `SkMixed`: `[\T, nat n\]` inferred together; a `Vec[\String,4\]` bound to `Vec[\String,5\]` | four, w, then a refusal | refuses only the binding (`:92-95`) | agree |
| `SkIntKind`: `int` parameters | 7, 8, then a refusal | refuses only `IBox[\5\]` as `IBox[\6\]` (`:117-120`) | agree |
| `SkExtends`: `object O extends T[\3\]` passed as `T[\4\]` | 7, then a refusal | refuses `f4(O)` (`:151-155`) | agree |
| `SkUnion`: `unbox(if c then Box[\3\] else Box[\4\])` | 1, 1 | refuses: the argument is `OR(Box[\4\],Box[\3\])` (`:65-69`) | the specification types the call statically, and no `k` fits the union; walk checks no types (rule 4, outcome 2, nothing owed: this is walk's known nature) |
| `SkCtx`: a size from the expected type only, with its type twin | the type twin fails at run time (`BOTTOM`) | refuses both kinds alike (`:13-20`) | agree; sizes behave as types |
| `SkRetEsc`/`SkRetEscT`: a free size or type only in the less specific return | walk refuses the overloading | refuses both alike (`:166-227`) | agree |
| `SkOrder`: size before type parameter | h | refuses `hb` only (`differential-2.txt:126-132`) | agree |
| `SkNoSize2` (no size) | a refusal at run time for the `IntLiteral` field | the same binding refused statically, before and after (`:157-176`) | the verdicts before and after are identical |
| `SkLitOverload`: `g(Box[\3\])`, `g(Box[\4\])`, where `Box` is an object | 3, 4 | accepts (`differential-1.txt:134-137`) | agree; exclusion comes through `checkO` |
| `SkLitTrait`: the same on a generic trait `Tg` | refuses | refuses: "Invalid overloading of g" (`differential-3.txt:13-19`) | agree, but see the next row |
| `SkLitTraitT`: the type twin, `Tt[\ZZ32\]` and `Tt[\String\]` | refuses | **accepts, and the compiled run prints 3, 4** (`:45-52`) | sizes and types part in the checker: `checkP`'s instantiation exclusion handles `STypeArg` only (`TypeAnalyzer.scala:455-468`, the team's "Todo: Handle int, nat, bool args" at `:460`). Recommended row 2 |
| `SkLitArgT`/`SkLitArgN`: a generic call whose `ZZ32` parameter takes a numeral | 6, 6, 6 and 6, 6 | refuses the inferred call as "not applicable to ... IntLiteral", while the non-generic and written-out forms pass (`:60-64`, `:88-92`); the same before the edit for types (`:78-82`) | the specification converts at arguments (`conversions-coercions.tex:101-102`); pre-existing for types and now reached by sizes. Recommended row 1 |
| `SkDeadArm`/`SkDeadArmT`: a dead-size arm `dd[\nat n\](x: Any)` beside `dd(x: ZZ32)` | 2, 1 | the size version refuses `dd("s")` ("Could not infer static argument nat n without context", `dead-arms.txt:7-12`); the type version accepts and runs 2, 1 (`:34-41`) | decision 3 makes sizes stricter than types, and the report does not say so. The type track kills an unsolved variable to `BOTTOM` (`STypesUtil.scala:1937-1940`) |
| `SkDeadTop`: the dead-size arm is the **more** specific one, `ee[\nat n\](x: ZZ32)` beside `ee(x: Any)` | 1, 2 | **accepts, and the compiled run prints 1, 2** (`:48-55`): the checker drops the dead arm as not applicable, and run-time dispatch still selects it | decision 3's error does not hold in an overload set |
| `SkDeadVal`: the same with the body `= n` | fails: "undefined variable [n]" | **accepts**; the compiled run dies with `NoClassDefFoundError: SkDeadVal$n` (`:84-95`) | an unknown size reaches a value with no static error. The specification is silent on inference (`inference.tex:15`), and Pavol's rule says such a size is an error. Recommended row 3 |
| `SkBoolArm`: `g[\bool b\](Flag[\b\])` beside `g(x: ZZ32)`, calling `g(5)` | 5 | refuses the program at the declaration's `bool b` (`differential-1.txt:278-281`) | the named limit, reported at the declaration, not at the call |
| `SkBoolMany`: a `bool` inference call plus two ordinary type errors | refuses at run time | **reports 1 error** (`:302-305`); the control with the `bool` argument written out reports the 2 others (`bool-control.txt:13-18`) | the thrown `TypeError` stops the component's expression checking and hides every other error in it |
| `api/SkSizedApi`: a component that exports its own sized api, plus a user | 7 | checks and compiles (`differential-2.txt:181-186`); without the `ExportChecker` edit, "Missing declarations" (`export-ab.txt:3-8`) | the edit is load-bearing and ungated (verdict (a)) |

Thread counts: only `FORTRESS_THREADS=1`. The diff touches no mutable variable, field, atomic block or library state, so the brief's single thread applies.

## 10. The failure-mode question

The report has no account of it. Measured:
- **`NI.nyi` for `nat`/`int`.** It becomes an inference variable. When the variable is solved, the value is the size. When it is not, the single-arm case gets a named error (`SkDeadArm`). In an overload set it is **quiet**: the arm counts as not applicable, and run-time dispatch still runs it (`SkDeadTop` prints 1; `SkDeadVal` dies at run time with `NoClassDefFoundError: SkDeadVal$n`, where no static error was given).
- **`NI.nyi` for `bool`/`dim`/`unit`.** It becomes a thrown `TypeError`. That is still loud, but it is placed at the declaration's parameter and it hides the component's other errors (`SkBoolMany`: 1 error reported, 3 present).
- **`ClassCastException` in `FnNameInfo.boundsFor` and `AbstractMethodChecker`.** It becomes the size's own `IntRef`. In the erased schema that is the parameter's own symbol, the value `java.md:36-38` read out of the class files (`Box⟦j⟧`, `Box⟦k⟧`). This one is quiet and consistent on both sides.
- **`ExportChecker.equalIntExprs = false`.** It becomes symbol-and-literal equality. Before the edit the `false` was never reached, because the checker crashed first (`differential-2.txt:187-189`); with the edit alone reverted it gives a false "Missing declarations".
- **`(IntArg, IntArg) => pTrue()`.** This was already a quiet wrong answer: `SkLitTrait` became "same parameter type" before the edit. It becomes equality.

The quiet case that costs diagnosability is the dead-size arm in an overload set.

## Corrections for the repair round

1. Add a gated compiler test for the `ExportChecker` repair: an api with a sized object and a sized function, and its component, compiling clean. Show it red with only `ExportChecker.scala` taken back (`probes/skeptic/run-export-ab.sh` does exactly that for the typecheck).
2. Pin the use-site arithmetic check. For example, make `XXXNatArithChecker.test` read `compile_err_contains=File XXXNatArithChecker.fss has 4 errors.`, or match the text "Ill-formed static argument". Show that it goes red with `TypeWellFormedChecker.scala:144-145` removed.
3. REPORT.md section 11 says an overload set told apart by two literal sizes "is refused as ambiguous". That is true for a generic trait (`SkLitTrait`). It is false for an object (`SkLitOverload` is accepted through `checkO`). The type twin on a trait is accepted (`SkLitTraitT`). Correct the sentence and cite the probes.
4. REPORT.md decision 3 and "What comes back to Pavol" need three additions:
   - In an overload set, the no-context rule removes the dead-size arm from static resolution, while run-time dispatch still selects it (`SkDeadTop`, `SkDeadVal`). So "compiled calls to functions with a dead size are refused" holds only when no other arm applies.
   - A dead type parameter at a call passes (`SkDeadArmT`, killed to `BOTTOM`, `STypesUtil.scala:1937-1940`) where a dead size is refused. Decision 3 makes sizes stricter than types.
   - The array review's E2 names "the interpreter's `BottomType` rule" (`explorations/reviews/array-design-review.md:181`), so the reading of "reaches a name" is the rung's decision and should be put to Pavol as one.
5. Add the failure-mode account (section 10 above) to REPORT.md. It must cover the `bool`/`dim`/`unit` error's placement and its masking of the other errors, and the value that `boundsFor` now yields.
6. record.md, row 388: the method half is ledger row 21. Append the size twin, and the fact that the compiled checker infers both kinds, to row 21 as a note, and open a new row only for `bool` inference, or fold that into the same note.
7. record.md, "What comes back to Pavol", row 387: say "for type parameters today and, through `keep-size-params`, for sizes after this rung".
8. REPORT.md section 12: "three times" is followed by four durations, and the build and library-compile timings carry no machine line (`explorations/protocol.md` section 6).
