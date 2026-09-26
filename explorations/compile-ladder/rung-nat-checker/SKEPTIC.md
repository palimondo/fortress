# Rung N (`rung-nat-checker`): the skeptic's judgements

**Second judgement (2026-09-26, after the repair round): approved, with two required corrections to the record.** It is the section "Second judgement" at the end of this file. The first judgement follows unchanged. Its section numbers (0 to 10, then "Corrections for the repair round") are the ones `JUDGE.md` and `REPORT.md` cite.

## First judgement: refused

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

# Second judgement: approved, with two required corrections

**Verdict: approved.** Both grounds of the first refusal are closed. Each now has a gated test, and I watched each go red without its edit. (a) `ProjectFortress/compiler_tests/NatExportChecker` passes on the landed build (`explorations/compile-ladder/rung-nat-checker/probes/skeptic/r2-tests.txt:2-7`). With only `ExportChecker.scala` of `47437c65f` first on the classpath it fails with "Missing declarations: {unbox[\nat k\](b:NatExportChecker.Box[\k\]):ZZ32 ...}" (`:55-61`). (b) `XXXNatArithChecker.test` is pinned to `File XXXNatArithChecker.fss has 4 errors.` and to `Ill-formed static argument: 2+1`. It passes (`:10-28`), and it goes red with either of its two checks deleted (the worker's `explorations/compile-ladder/rung-nat-checker/probes/arith-pin-red.txt:3-5` and `:17-20`, `:31-33` and `:45-48`; I read both shadow diffs in that capture). The repair round changed no file under `ProjectFortress/src/`, `Library/` or `ProjectFortress/astgen/`: `git diff --stat 9733887cc..HEAD` lists only test files and the rung's own directory. So the diff I read line by line in the first judgement is the diff that lands. The two corrections below are corrections to the record. Neither changes a verdict of the checker.

Inherited state: branch `wip/rung-nat-checker` at `cef0bead4`, with three worker commits after the judge's ruling (`9733887cc`), and the working tree clean. `ProjectFortress/build` is the landed build: its Scala classes date from 02:02:23 and the last source edit from 02:01:32, and I did not rebuild. The five library components are in `default_repository/caches/bytecode_cache`. All my runs used `FORTRESS_THREADS=1` on one machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.80GHz, 2800.212 MHz, openjdk 25.0.4. The load average at the start of each run is on the first line of its capture. I recorded no timings.

## R0. The provenance block

The block still has five lines. The repair round changed none of the files it cites, and I re-opened each cited line with `sed -n`:
- problem: `NatInferredChecker.fss:14` is the `unbox` assertion citing row 307. `junit-before.txt:4` is `java.lang.Error: Not yet implemented`, `:185` is the `VarType` to `IntExpr` `ClassCastException`, and `checker-count-before.txt:16` is the `#crash` row.
- spec: `trait-parameters.tex:68-90` and `advanced/overloading.tex:95-103`, `:158-170`. These are prose chapters; `Specification/` is unchanged since `47437c65f`.
- precedent: `Fortress.ast:1593` is `_InferenceVarOp(Object id);`. In `Formula.scala`, `:61` is `OPrimitive`, `:805` is `oEquivalent`, `:355` is `oSimplify` and `:640-642` is the op `makeSub`. `IntNat.java:126-127` opens `unifyStaticArg`, `STypesUtil.scala:333` is `staticParamToArg`, and `keep-size-params.patch` has 22 lines.
- deviation: points to section 5.
- historical: the repair round edited no file of the 2012 tree. Its edits are the rung's own new test files and records, so the line is complete as it was.

One gap, correction 1. The `spec:` line does not name the standard of the `ExportChecker.equalIntExprs` repair, which the repair round made a home-1 repair. That standard is `Specification/basic/components/apis.tex:250-256`. I read `:236-270`: "The header and type of $d'$ must be the same as the header and type of $d$."

## R1. The recorded failure

The first pass's recorded failure stands: `junit-before.txt`, committed at `9e014be3e` before any source edit. The repair round's two new tests were written after the edit, so their red runs are classpath-shadow runs, as the judge ordered:
- both tests are red at `NI.nyi` on the unedited checker (`probes/repair-before.txt:2-14`, `:15-28`);
- `NatExportChecker` is red with only the export checker taken back (`probes/export-test-ab.txt:3-18`);
- the re-pinned arithmetic test is red with either check removed (`probes/arith-pin-red.txt`).

I re-ran the export A/B myself (`probes/skeptic/r2-tests.txt:55-61`). With `javap -c` I checked the shadow's `equalIntExprs`: it is `iconst_0; ireturn`, the constant `false` of `47437c65f`.

## R2. The repair round's diff

The round changed only test files, and I read each one.
- `NatExportChecker.fsi`, `.fss` and `.test`: one comment line each. The component exports `{ NatExportChecker, Executable }`, and the `.test` drives `compile` only. So the gated check is the checker's verdict against the api. The `run()` assertion is not executed by the gate, and a compiled run would stop at load like every sized program today (`SrExpOk`, `probes/skeptic/r2-export.txt:58-65`, `3$RTTIc`).
- `XXXNatArithChecker.test`: two keys. No other `compiler_tests/*.test` combines `_contains` with `_WIcontains` (grep). The harness checks each key on its own (`FileTests.java:147-161`), and the landed run satisfies both (`r2-tests.txt:17-24`).
- `XXXNatLitArgChecker.fss`: one comment line, two controls and two defect assertions. The message cites `conversions-coercions.tex:102-103`. I read `:88-112`, and `:102-103` is "arguments to functionals and constructors where the corresponding parameters have declared types".
- `XXXNatOverrideChecker.fss:16`: the message now cites `Library/FortressLibrary.fsi:1403`, which is `subarray` of `trait ReadableArray1` (`:1395`).

The net diff `47437c65f...HEAD` touches no stop file of the batch. A grep for `StaticChecker.java`, `runtimeSystem/`, `runtimeValues/`, `CodeGen.java`, `OverloadSet.java`, `Library/` and `interpreter/` over the file list prints nothing.

## R3. The precedent search

The round adds what it was missing. The ledger search found row 21 (`explorations/fortress-gap-ledger.md:135`), and `REPORT.md` section 3 now says the first pass missed it. For the test shape, the round cites the api-plus-component precedent `ExportVarRungXApi`; `compiler_tests/` holds 37 other `.fsi` files. No repair round precedent is involved in code, since no source changed.

## R4. The tests

I ran them myself, each `.test` in its own JVM with its cache entries deleted before and after (`probes/skeptic/r2-tests.sh`, capture `probes/skeptic/r2-tests.txt`):
- `NatExportChecker`: `OK (1 test)` (`:7`);
- `XXXNatArithChecker`: 4 errors, including the use-site error, and `Saw expected failure` (`:23-24`);
- `XXXNatLitArgChecker`: 2 errors, exactly the two inferred calls at lines 15 and 16, and `Saw expected failure` (`:31-39`);
- `XXXNatOverrideChecker`: `OK Saw expected exception` (`:48`);
- `NatExportChecker` with the export checker taken back: `FAIL` with "Missing declarations" (`:55-61`).

The worker's full re-run of all twelve tests plus the size regression tests (`probes/repair-junit.txt`) gives the verdicts section 6 of `REPORT.md` states. I checked every verdict line there.

Two limits of the tests, neither required:
- `NatExportChecker` gates the false refusal that was repaired. It does not gate the refusal of a mismatch. My `SrExpMis` shows that a mismatch is still refused (R9), but an `equalIntExprs` that answered `true` would pass every gated test.
- `XXXNatLitArgChecker` pins the error count, not the message.

## R5. The competing-declaration grep

`git grep -lw` for `NatExportChecker` and `XXXNatLitArgChecker` over the whole tree finds only their own five files. That covers `ProjectFortress/src/com/sun/fortress/`, `ProjectFortress/tests/` and every `*_tests/` directory. `scale`, `scaleT`, `plain`, `BoxT` and `unbox` are declared nowhere in the compiled prelude (`Library/CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem` and `ProjectFortress/LibraryBuiltin/`). My `Sr*` probe names occur nowhere else.

## R6. record.md

- The count line is true: 321 tracked `.test` files at HEAD against 309 at `47437c65f` (`git ls-files`, `git ls-tree`).
- The FACTS line is true and sourced. It names the export checker's repair and `NatExportChecker`, the `BOTTOM` contrast, and `dot`.
- The note on row 307: `explorations/fortress-gap-ledger.md:318` is row 307, and every line it cites says what the note says.
- The note on row 21 (`:135` is row 21). I checked each citation: `walk-tests.txt:8-16` is `NatMethodChecker` under walk (a size), and `:42-52` is `XXXNatBoolChecker`. In `walk-probes.txt`, `:2-10` is `MethInferT`, `:11-14` is `FnInferNatVsType`, `:15-17` is `BoolWritten` and `:70-78` is `MethInferPlain`. `compile-probes.txt:23-24` and `:34-35` are the two compiles with `exit=0`. The worker is right that the judge's cited ranges did not hold these cases, and it followed the capture.
- Rows 387 and 389-392 are provisional. The ledger ends at row 386 (`:397`), and nothing is renumbered or moved.
- Row 390's specification cell says "silent", and that is half right: correction 2.
- Row 391 is true as written, but narrower than what I measured: recommended row A.

## R7. The three homes

| defect | home in the record | checked |
|---|---|---|
| `ExportChecker.equalIntExprs` always `false` | 1, `NatExportChecker` | ran green; ran red with the edit taken back (`r2-tests.txt:2-7`, `:55-61`) |
| use-site arithmetic unpinned | 1, `XXXNatArithChecker` re-pinned | ran green (`r2-tests.txt:10-28`); red with each check deleted (`arith-pin-red.txt`) |
| numeral at an inferred generic call | 2, `XXXNatLitArgChecker`, row 391 | `XXX` name; `.test` has `compile` and `compile_err_contains=... 2 errors.`; the harness demands that failure (`FileTests.java:384-404`), so a repair turns it red; ran it (`r2-tests.txt:31-43`); walk prints `PASS` (`litarg-test.txt:26-28`) |
| dead-size arm dropped in an overload set | 3, row 390 | captures committed (`probes/skeptic/dead-arms.txt`, `probes/deadval-written.txt`); the report says the specification is silent on inference and cites the placeholder chapter. My grep of `Specification/basic` and `advanced` for `infer` finds no inference rule outside that chapter, but it finds the applicability definition, which speaks to half the question: correction 2 |
| `checkP` has no size case | recorded, row 392 | conforms to the committed prose (the judge's grep; `types-vals-vars.tex:184-189`) |
| `bool`/`dim`/`unit` error thrown at the declaration | note on row 307 | the kind limit stays gated by `XXXNatBoolChecker` |
| walk's method and `bool` inference | note on row 21, 388 withdrawn | citations checked (R6) |
| the same numeral refusal at a method invocation and at a constructor call (mine, R9) | 2 by the same test: one shared site | recommended row A amends row 391 |
| a negative `int` size is inexpressible on the compiled path (mine, R9) | 2 by the arithmetic limit's test | recommended row B, a sentence for the row 307 note |

## R8. The count table

The table is `probes/checker-count-after.txt`: `#total 125` (`:14`) and `#crash none` (`:16`). `REPORT.md` section 7 says 125, `record.md:13` says 125, and the structured report says 125. The manifest's expectedCheckerCount is **125**, a prediction, and it matches. The repair round changed no source, so the table stands. In both tables the total is half the sum of the per-api rows (206 and 103 before, 250 and 125 after), the tool's own de-duplication, so it is no finding against the rung.

## R9. The differential (my own programs, written for this judgement)

Every program ran under walk, then `fortress typecheck`, `compile` and `run` on the landed build, then `typecheck` on the unedited checker (`tmp/base-classes`). The api probes also ran with only the export checker taken back (`tmp/sk-export-base`). The runners are `probes/skeptic/r2-probes.sh` and `r2-common.sh`.

| program | walk | compiled (landed) | reading |
|---|---|---|---|
| `api2/SrExpOk`: an api with a literal size `same3(b: Box[\3\])` and two sizes `two[\nat k, nat j\]` | 1, 8 | checks and compiles; the run stops at load with `3$RTTIc` (`r2-export.txt:50-65`); with the export checker taken back, both declarations are "Missing" (`:69-76`) | agree on the verdict; the load failure is the run-time rung's (`XXXNatArgRungS`) |
| `api2/SrExpMis`: the component differs from its api by a literal (`Box[\4\]` for `Box[\3\]`), by a symbol for a literal, and by a renamed size, each with its type twin | prints 1, 2, 3 | refuses exactly the five mismatched declarations and accepts `same3` (`r2-export.txt:7-17`); taken back, `same3` is missing too (`:38-49`) | the specification settles against walk (`apis.tex:256`, the same header), and walk checks no exports. That is the nature rule 4 of the brief states, so no row is owed. A renamed size is refused exactly as a renamed type parameter is: sizes read as types |
| `SrLocalArith`: `x: Box[\1 + 2\] = Box[\3\](7)` | 7 | the named arithmetic error at the local annotation, plus the follow-on assignment error (`r2-differential.txt:31-38`) | the limit `XXXNatArithChecker` gates; the declared-type check reaches local annotations too |
| `SrNegInt`: `IBox[\-2\]` for an `int` parameter | syntax error | syntax error (`r2-differential.txt:2-27`) | agree; the grammar has no negative `IntVal` (`Specification/appendices/grammars/concrete-syntax.tex:533-547`) |
| `SrNegSub`: `IBox[\0 - 2\]` | 5, 6 | refused as arithmetic, 4 errors; the message says "nat" for an `int` parameter (`r2-negsub.txt:6-20`) | the specification sides with walk (`constant.tex:23-24`), under the gated limit. So on the compiled path an `int` size can no longer be negative anywhere: recommended row B |
| `SrLitMeth`: a generic method `pair[\nat j\](c: Box[\j\], m: ZZ32)` and its type twin `pairT`, each called with a `ZZ32` variable and with a numeral | fails at the first call: row 21, a method's static argument (`r2-differential.txt:56-64`) | accepts both variable calls and refuses both numeral calls, "not applicable to an argument of type (Box[\2\], IntLiteral)" (`:65-73`) | the specification settles it against the compiled checker (`conversions-coercions.tex:102-103`). Row 391's defect at a method invocation: recommended row A |
| `SrLitCtor`: `Pair(Box[\3\](1), 3)` with `object Pair[\nat k\](b: Box[\k\], m: ZZ32)`, and its type twin `PairT` | 3, 3, 3, 3 | accepts the variable forms and refuses both numeral forms (`r2-differential.txt:98-106`) | the same, and the sentence names constructors explicitly. Recommended row A |
| `SrDeadMeth`: `dead[\nat n\]()` and `deadT[\U\]()`, methods of a sized object | 7, 7 | `deadT` accepted; `dead` refused, "Could not infer static argument nat n without context" (`r2-differential.txt:129-134`) | decision 3 (a) holds for methods too: sizes stricter than types, under a silent specification. Already recorded as the rung's decision |

On the unedited checker every program with a size crashes: at `NI.nyi`, or at the `VarType` or `TraitType` to `IntExpr` `ClassCastException` (`r2-differential.txt:53-55`, `:147-149`). The exception is the two `SrNeg*` programs: `SrNegInt` stops at the parser, and `SrNegSub` crashes at `NI.nyi` like the rest (`r2-negsub.txt:42-44`).

Thread counts: `FORTRESS_THREADS=1` only. The diff touches no mutable variable, field, atomic block or library state, so the single thread of the brief applies.

## R10. The failure-mode question

The repair round replaced nothing, so no loud failure became quiet in this round. `REPORT.md` section 13 now gives the account the first judgement asked for. I checked it against the source: the throw is at `STypesUtil.scala:565-567`, `killIvars` at `:1937-1940`, and the no-context block at `Functionals.scala:246-251`. I also checked it against my first-round captures, and it is accurate. The one quiet path is still an arm dropped from an overload set (row 390). One small addition: the arithmetic error is loud, but its text says "nat" for an `int` parameter too (`TypeWellFormedChecker.scala:41-42`, `r2-negsub.txt:8-12`).

## R11. What the specification says about row 390

`Specification/basic/overloading.tex:170-175`: "A declaration $\f(\Ps)$ is applicable to a call $\f(\Cs)$ if ... $\Cs \Ovrsubtype \Ps$. If the parameter type $\Ps$ includes static parameters, they are inferred ... before checking the applicability." The dotted-method twin is `:202-207`. I read `:130-215`. In `SkDeadTop`, the dropped arm `ee[\nat n\](x: ZZ32)` has the parameter type `ZZ32`, which contains no static parameter. So by this definition the arm's applicability to `ee(z)` does not depend on `n`: it is applicable, and it is more specific than `ee(x: Any)`. That is the arm run-time dispatch selects (`probes/skeptic/dead-arms.txt:44-55`, which prints 1). The checker's static drop departs from the applicability rule. What the specification leaves open is only the uninstantiated `n` that follows: `:137-138` assumes every static variable instantiated or inferred, and `inference.tex:15`, `:24-25` leave that question open. Home 3 therefore stands, because the program's outcome is not settled: a no-context error under decision 3, or a run under the types' `BOTTOM`. The pair is also one `:100-107` refuses. But the row should not call the specification simply silent. Of the row's three candidate fixes, the third ("report the no-context error when the dropped arm would be the most specific") is the one that agrees with both the applicability rule and decision 3.

## Required corrections (for the commit stage)

1. **`REPORT.md:4` and `record.md:4`, the `spec:` line of the provenance block:** add `Specification/basic/components/apis.tex:250-256` as the standard of the `ExportChecker.equalIntExprs` repair, which the repair round made a home-1 repair gated by `NatExportChecker`. The block is where each edit's standard is stated, and this edit answers to a different chapter from the rest.
2. **`record.md:52`, row 390's `spec citation` cell, and the matching home cell of `REPORT.md:146`:** add `Specification/basic/overloading.tex:170-175`, with the sentence from R11. Applicability is `C <: P`, inferring only the static parameters that occur in `P`. The dropped arm's `P` is `ZZ32`, so it is applicable and the most specific, which is what run-time dispatch selects. The specification is silent only on the uninstantiated size that follows (`:137-138`; `inference.tex:15`, `:24-25`). Keep the row in home 3. In its notes, say that the third candidate fix is the one consistent with that rule and with decision 3. A row that later readers cite as "silent" must not hide the clause that decides half of its question.

Neither correction changes a test or a source file, so no test needs re-running.

## Recommended rows (the gather opens or refuses each)

- **A. Amend provisional row 391 (claim and reproducer).** Add: "The same refusal occurs at a generic method invocation, `Box[\3\](1).pair(Box[\2\](2), 3)` with `pair[\nat j\](c: Box[\j\], m: ZZ32)`, and its type twin, and at a generic object's constructor call, `Pair(Box[\3\](1), 3)` with `object Pair[\nat k\](b: Box[\k\], m: ZZ32)`, and its type twin. In each case the call with a `ZZ32` variable in place of the numeral checks. Walk prints 3 for all four constructor calls, and it fails the method calls for the reason of row 21. All three call kinds reach one site: `checkApplication` (`Functionals.scala:430-441`, from `SMethodInvocation` at `:581-596` and `S_RewriteFnApp` at `:676-686`), then `checkApplicable` (`:125`), then `checkApplicableWithInference`, which is documented 'with static argument inference and no coercion' (`:170-173`) and fails at `:222-225`. So `XXXNatLitArgChecker` gates all three." Probes: `explorations/compile-ladder/rung-nat-checker/probes/skeptic/SrLitMeth.fss` and `SrLitCtor.fss`; capture `explorations/compile-ladder/rung-nat-checker/probes/skeptic/r2-differential.txt:56-124`.
- **B. A sentence to append to the note on row 307.** "On the compiled path an `int` static parameter can now be instantiated only by a non-negative literal or another parameter. The grammar has no negative literal (`Specification/appendices/grammars/concrete-syntax.tex:533-547`), so `IBox[\-2\]` is a syntax error under both paths. `IBox[\0 - 2\]` is arithmetic, refused by name where walk runs it, and the named error says 'nat' for an `int` parameter (`TypeWellFormedChecker.scala:41-42`). This is covered by the arithmetic limit `XXXNatArithChecker` gates." Probes: `explorations/compile-ladder/rung-nat-checker/probes/skeptic/SrNegInt.fss` and `SrNegSub.fss`; captures `probes/skeptic/r2-differential.txt:2-27` and `probes/skeptic/r2-negsub.txt`.

## Minor, not required

- `REPORT.md:204` says "No `ant testFast` or `ant testSystem`." twice.
- `XXXNatOverrideChecker.fss:16` cites `FortressLibrary.fsi:1403`. Rung K edits four declarations of that file, so the gather should check the line after the merge. The worker says so too.

*At the gather of climb batch 4, the provisional rows took their final numbers: 387 → 398, 389 → 399, 390 → 400, 391 → 401, 392 → 402; the withdrawn 388 is not a landed row of this rung (the ledger's row 388 is rung C's). The text above keeps the numbers it was written with.*
