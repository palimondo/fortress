# Skeptic, rung R (`rung-unknown-size-arm`), first judgement

This file holds both judgements of rung R. The first, which refused, follows as it was written. The second, which approves with one required correction, begins at the heading "Skeptic, rung R (`rung-unknown-size-arm`), second judgement" below it; its sections are lettered, so "section 9" still means the first judgement's section 9.

**Verdict: refused.** The one thing that must change: the record's account of the forms the refusal leaves alone rests on two mis-measurements, and it must be re-measured and rewritten before it reaches `FACTS.md`, the ledger and Pavol. Provisional row 431 says the compiled dispatch never reaches a sized arm from a call whose argument is typed `Any`. Its probes pass a numeral, which the compile path carries as `IntLiteral`. With a genuine `ZZ32` in the `Any` variable, the compiled run does dispatch to the dead-size arm, as walk does, and dies with `NumberFormatException: For input string: "n"` when the arm reads the size. Provisional row 432 says an arm whose type parameter occurs only in its return type is dropped from static resolution. The single arm alone, with no overload, compiles and dies the same way (`java/lang/Object$RTTIc`), so no drop is involved. Decisions D3 and D6, the new FACTS entry's sentence on rows 431 and 432, and the report sections that repeat them rest on these two readings. The edit itself, its tests and its measurements hold up; the details are below. Section 12 lists what the repair round must do. That includes one gated test owed by this review's own measurement: the edit also repairs a compiler crash on a call through a function value.

Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, cpu MHz 2100.000, load 5.16 6.21 6.80 when this review started (each capture's header gives the load at its own start), openjdk 25.0.4, `FORTRESS_THREADS=1` (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/machine.txt`). One thread only: the edit touches no mutable variable, field, atomic block or library state. It changes a checker decision, and the probes' bodies are pure.

The branch had six worker commits, `60b451f65` to `5399af552`, and a clean worktree. `REPORT.md` is not on the branch, because the harness refused the worker's write. I checked the report text the worker carried in its structured result (`reportText`).

## 0. The provenance block

All five lines are present, and each citation was opened with `sed -n`:

- problem: `explorations/compile-ladder/rung-nat-checker/probes/skeptic/dead-arms.txt:44-95`. `SkDeadTop` prints 1, 2 compiled; `SkDeadVal` dies with `NoClassDefFoundError: SkDeadVal$n`. Holds.
- spec: `Specification/basic/overloading.tex:170-175` is applicability, with static parameters inferred before the check. `:262-295` is resolution: the most specific applicable declaration at run time, a strict subtype, static parameters inferred before the comparison. `:137-138` is the chapter's assumption that every static variable is instantiated or inferred. `Specification/basic/trait-parameters.tex:82-86` says a `nat` appears where an ℕ32 variable can. `explorations/coordinator/POSITIONS.md:162` is answer 12. All hold, and none of them cites `library/apis/`.
- precedent: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:454-457` (edited file) is the refusal shape. `:249-259` is the no-context error with its new candidate. Both hold.
- deviation: `Functionals.scala:464-473` is the new refusal. `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1156-1160` shows `pruneMethodCandidates` over the survivors, with `isDynamicallyApplicable` at `:1159`. `ProjectFortress/src/com/sun/fortress/exceptions/ApplicationError.scala:156-164` is the new field. All hold.
- historical: both edited files exist at `a874948ac` (`git cat-file -e`). `explorations/protocol.md:126-127` is the rule that edits under the original tree are flagged at commit time. Holds.

Other citations I opened hold: `CoercionOracle.scala:72-73` (`moreSpecific`, strict); `STypesUtil.scala:809-813` (`hasSizeInferenceVars`), `:1068-1096`, `:1937-1940` (`killIvars` to `BOTTOM`); `FileTests.java:384-402`; `Documentation/Specification/Prose/Language/types.tick:764-767`; `Specification/basic/inference.tex:15`, `:24-25`; `Specification/basic/types-vals-vars.tex:218-237`; `Specification/advanced/overloading.tex:182`; `Specification/basic/expressions/constant.tex:96`; `Specification/basic/expressions/literals.tex:83-86`; `explorations/coordinator/map/spec-to-implementation.md:214`, `:233`; `explorations/coordinator/climb-batch-workflow.js:1117`, `:1202`; `explorations/reviews/overload-static-params-ways.md:253-254`, `:272-274`.

## 1. The recorded failure

`explorations/compile-ladder/rung-unknown-size-arm/probes/pre-edit-tests.txt` is committed in `60b451f65`, which touches no source file. The edit is `65a2bcb19`. The capture shows both `XXX` compile tests red on the untouched checker: " Saw failure, but did not satisfy compile_err_contains", then `Tests run: 1,  Failures: 1`. The harness prints that line, rather than "Missing expected failure", for an `XXX` test whose check key is missed even when the compile exits 0. I confirmed this at `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:377-402`: `trueFailure` is evaluated before the `shouldFail` branch. The capture also has `NatKnownSizeArm` PASS and both walk `XXX` files "OK Saw expected exception". The failure is recorded.

## 2. The diff

Two files, 31 lines added and 5 removed. The edit does what the report says, and nothing more:

- `Functionals.scala:249-259` builds the would-be candidate only when a size is among the unknown static arguments and the inferred domain holds no inference variable. `newArgs.map(_.left.get)` is safe there, because `:240` has already returned when any argument is unchecked. The lifted static arguments are not prepended to that candidate, as `checkApplicable:166-168` does for a real one. That costs nothing, because the candidate is used only in `moreSpecificCandidate`, which reads the arrow and the arguments (`STypesUtil.scala:1071-1087`).
- `Functionals.scala:464-473` refuses when a discarded arm's candidate is `moreSpecificCandidate` than every candidate. Because an overload set that passes the declaration rules has a unique most specific applicable declaration (`Specification/basic/overloading.tex:288-291`), "more specific than every candidate" is exactly "the arm the rules pick" there (D5). My `SkNotMeet` confirms that a sized arm below one candidate but not below the most specific one still compiles.
- `ApplicationError.scala` gains one defaulted field and one defaulted parameter, so every existing construction site is unchanged. `NoContextError` is constructed only in `makeNoContextError` and matched only at `Functionals.scala:467` (grep over `ProjectFortress/src/com/sun/fortress/`, Scala and Java).
- `DummyApplicationErrorFactory` (`ApplicationError.scala:250-255`), used by the case-clause site `Functionals.scala:853-857`, is unaffected. There a refusal is `None`, which the site already treats as "not applicable".

The edit in `exceptions/ApplicationError.scala` is outside the directory the record's "Files it may touch" names. It is not a stop of R's section or of the intro, no rung of this batch owns the file, and it is declared as D2 with its alternative. I accept D2.

## 3. The precedent search

Correct. There is one site where a failed arm is discarded (`Functionals.scala:450-451`), and all six application sites reach it (`:423`, `:586`, `:615`, `:705`, `:772`, `:856`; I grepped `checkApplication(` over `scala_src/` and found no seventh). The refusal shape (`:454-457`) and rung N's error, with its text unchanged, are reused, and so is the existing `moreSpecificCandidate`. The precedent reused here is a shape, not a repair of a defect, so there are no sibling sites to count beyond the one discard.

## 4. The tests

- `ProjectFortress/compiler_tests/XXXNatUnknownSizeArm` and `XXXNatUnknownSizeVal` are exactly `SkDeadTop`'s and `SkDeadVal`'s shapes, pinned by `compile_err_contains` on rung N's message. I ran them myself after the edit and both print " Saw expected failure", `OK (1 test)`. `NatKnownSizeArm` gives `OK (3 tests)`, PASS (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/own-tests.txt`).
- Each of the five files carries one comment line pointing at `REPORT.md`, with no provenance essay. `NatKnownSizeArm`'s assert messages carry specification lines.
- The walk `XXX` files: I ran them through `SystemJUTest` on a scratch copy and both print "OK Saw expected exception". A scratch copy of `XXXNatSizeExclusionWalk.fss` with the pair declared on the objects, which walk accepts, prints PASS then " Missing expected failure " and `Failures: 1`. So the harness path is red on a passing `XXX` file for this file too (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/walk-xxx.txt`). No walk file was edited.
- Row 418's first assertion (4294967296) rests on `constant.tex:96`: a `nat` denotes a `NaturalStatic` value, and no width is stated. The spec column of row 418 itself settles only 3000000000, an ℕ32 value (`trait-parameters.tex:84-85`). The worker says so in its section 7. The basis is thinner than for the second assertion, but it is what the batch record asked for. This is a finding, not a correction.

## 5. Competing names

`grep -rlE 'NatUnknownSize|NatKnownSizeArm|NatSizeExclusionWalk|NatBigSizeWalk'` over `ProjectFortress/` (every corpus and `src/`) and `Library/`, in `.fss`, `.fsi`, `.test`, `.java` and `.scala` files, finds only the rung's eight files. The names `unfixedSize` and `unfixed` occur only at the edit.

## 6. `record.md`

The FACTS amendment quotes an existing sentence verbatim (`explorations/coordinator/FACTS.md:62`, "In an overload set such an arm is dropped instead (row 400)."). The `XXX` harness entry is true as written (`FileTests.java:377-402`). The ledger notes cite rows 400, 416 and 418, which exist, without renumbering. The new rows are provisional 431 and 432 after the last row, 430. That much is sound. But the new FACTS entry's sentence "An arm whose unknown parameters are all types keeps the drop (row 432), and a call whose argument's static type lies above the sized arm's domain still compiles, the compiled dispatch never selecting the arm while walk does (row 431)" is false on both counts, and so are rows 431 and 432 as written (section 9). A reader six months from now would find the opposite.

## 7. The three homes

- Row 400's compiled half (home 1): the two gated `XXX` compile tests pass, and I ran them (section 4).
- Rows 416 and 418 (home 2): `XXX`-named `.fss` files in `ProjectFortress/tests/`, expected to fail, which I checked through the harness (section 4). The interpreter corpus needs no `.test` file (FACTS.md, "An `XXX*.fss` in the interpreter corpus IS a gated expected-failure test").
- Rows 431 and 432 (home 3): committed `.txt` captures and a written row exist, and the specification is indeed silent on an unbound size (`overloading.tex:137-138`; `inference.tex:24-25` asks exactly whether inference may give `BottomType` for a static parameter). But what the rows describe is not what the probes show (section 9).
- This review's own measurements. The corrected dynamic form (`SkDynZZ32Val`) and the corrected return-type case (`SkTypeRangeSingle`) belong in home 3, as the rewritten rows 431 and 432, because the specification is silent on an unbound size and on a `BottomType` instance (`overloading.tex:137-138`, `inference.tex:24-25`). `SkFnValue`'s compiler crash is repaired by the edit, so it is home 1 and owes a gated test (section 12, item 4). The numeral split (`SkLiteralArg`) is settled by the specification against walk, so it owes an `XXX` walk test once its row is opened; the declared-type context (`SkCtx*`) is silent, so it is home 3. Both are recommended rows (section 13), outside this rung's scope.

## 8. The count table

The rung's committed table, `explorations/compile-ladder/rung-unknown-size-arm/probes/checker-count-after.txt`, reads `#total 125`, `#crash none`, `#shadow matches the tracked StaticChecker`. The report, `record.md` and the structured result each declare 125. The manifest's `expectedCheckerCount` of 125 is a prediction, and it was met. There is no mismatch. The stage checks the apis only, and its full output stops before any component body (`tmp/cc-after/run.txt`), so the rung's call-site rule cannot move it, on this tree or on F's.

## 9. The differential

Seventeen programs of my own are in `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/`. Each was walked, compiled with the untouched checker and run, then compiled with the rung's checker and run. For the untouched checker, the two files of `e5414f5bf` were compiled by scalac into `tmp/sk-base/classes` and put first on the classpath, and that "before" reproduces `SkDeadTop`'s 1, 2 (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.txt:4-20`). The driver is `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.sh` and the capture is `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.txt`.

| program | shape | walk | compiled before | compiled after | outcome |
|---|---|---|---|---|---|
| `SkMeet` (`:21-35`) | `fm[\nat n\](ZZ32, ZZ32)`, the meet of `fm(ZZ32, Any)` and `fm(Any, ZZ32)` | 1 | 1 | refused | the specification plus answer 12 favour the refusal; walk's half is left by the decision |
| `SkNotMeet` (`:36-55`) | `ff[\nat n\](ZZ32, Any)` beside `(Any, ZZ32)`, `(ZZ32, ZZ32)`, `(Any, Any)` | 3, 2, 4 | 3, 2, 4 | 3, 2, 4 | agree; D5 holds, and an arm that is not the most specific is not refused |
| `SkIntParam` (`:79-95`) | an `int` size | 1 | 1 | refused, "int i" | as `SkMeet`; the rule reaches `int` as well as `nat` |
| `SkTypeAndSize` (`:120-134`) | `ex[\T, nat n\](x: T)` beside `ex(x: Any)` | 1 | 1 | refused | as `SkMeet` |
| `SkGenericCaller` (`:135-151`) | size fixed by an enclosing static parameter, `ev[\m\](x)` | 4, 6 | 4, 6 | 4, 6 | agree; a written size still compiles |
| `SkJuxt` (`:152-166`) | `ee z` | 1 | 1 | refused | as `SkMeet`; juxtaposition reaches the rule |
| `SkFnValue` (`:167-179`) | `f = ee; f(z)` | 1 | compiler crash, `IndexOutOfBoundsException` | refused, "Could not check function application" | as `SkMeet`; a crash of the compiler became a diagnostic |
| `SkLiteralArg` (`:180-195`) | `ee(5)` | 1 | 2 | 2 | divergence, unchanged by the rung. A numeral has its own type (`literals.tex:132-141`), and a declaration applicable without coercion is selected (`conversions-coercions.tex:455-458`), so `ee(x: Any)` is the rules' pick and the compiled 2 is the specification's answer. Walk carries the numeral as `ZZ32`. The specification settles it against the interpreter: recommended row |
| `SkCtxFix`, `SkCtxSingle`, `SkCtxArg` (`:56-78`, `:96-119`, `:196-218`) | a size fixed only by the declared type of the variable or of the enclosing call's parameter | fails, `BOTTOM` | refused (before: "Right-hand side has type Any" for the overloaded one) | refused, "without context" | both paths refuse; the checker does not use a declared type as context for a static argument (`SkCtxType`, `:281-304`, the type twin, infers `BottomType`). The specification is silent (`inference.tex:15`). Recommended row, low |
| `SkSubscript` (`:219-237`) | a sized subscript operator | syntax error | syntax error | syntax error | the subscript site cannot be given a sized arm of its own by this syntax; not measured further |
| **`SkDynZZ32`** (`:238-254`) | `ee(a)` for `a: Any = z`, `z: ZZ32`; then `ee(l)` for `l: Any = 5` | 1, 1 | **1**, 2 | **1**, 2 | the compiled run **does** dispatch to the dead-size arm when the value is a `ZZ32`. Its 2 appears only for the numeral. This contradicts row 431 |
| **`SkDynZZ32Val`** (`:255-280`) | `ev(a)` with the body `= n`, `a: Any = z` | `undefined variable [n]` | **`NumberFormatException: For input string: "n"`** | the same | a compiled run-time crash with an undiagnosable message, which the refusal does not reach (D6). The specification is silent on the unbound size (`overloading.tex:137-138`): home 3, as rewritten row 431 |
| **`SkTypeRangeSingle`** (`:305-326`) | `et[\T\](x: ZZ32): BoxT[\T\]` **alone**, `r: Any = et(z)` | other | **`NoClassDefFoundError: java/lang/Object$RTTIc`** | the same | the crash row 432 attributes to an overload drop happens with no overload at all. The checker applies the arm with `T` as `BottomType` (`SkCtxType:295-300` shows the instance `BoxT[\BottomType\]`), and the compiled run has no descriptor for it. Silent (`inference.tex:24-25`): home 3, as rewritten row 432 |
| `SkTypeRangeWhich` (`:327-339`) | the overloaded pair, `s = et(z); s.v` | 1 | checker error `subtypeCompareTo(BottomType, BottomType) is not implemented` | the same | a `BottomType` instance reaches the checker in the overloaded case too, as `checkApplicable`'s per-arm evaluation (`Functionals.scala:449`) implies; the generic arm is a candidate, not a dropped one |

The rung's own three checks for the skeptic hold. Walk still prints 1 for `SkDeadTop` while the compiled checker refuses it. A set whose sized arm is not the rules' pick compiles and runs as before (`SkNotMeet`, and the rung's `UkDeadArm`, `UkCoerce` and `NatKnownSizeArm`). A written size compiles (`SkGenericCaller`, `UkWritten`).

The rung's 44 nearest compiler tests, re-run by me through its `explorations/compile-ladder/rung-unknown-size-arm/probes/near-tests.sh`, have verdicts identical to its `explorations/compile-ladder/rung-unknown-size-arm/probes/near-after.txt` (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/near-rerun.txt`). I did not re-run the 106-file ladder subset; I read its compare file.

### What is wrong in the record

- **Row 431.** `UkDynAny` and `UkDynAnyVal` initialise `a: Any = 5`. On the compile path that holds an `IntLiteral` (ledger row 79's mechanism), to which the `ZZ32` arm is not applicable at run time, so the compiled 2 is numeral typing, not a dispatcher that "never dispatches to that arm". With `a: Any = z`, the compiled run prints 1, as walk does, and with the size read it dies with `NumberFormatException: For input string: "n"` (`SkDynZZ32`, `SkDynZZ32Val`, before and after alike). The row's defect statement, its "divergence" class, its spec column ("the dispatch rule ... picks the sized arm" is wrong for the numeral probes, which the specification sends to the `Any` arm) and its candidates ("keep the compiled dispatcher's skip": there is no skip) must be rewritten. The same goes for D6's measured basis ("the compiled dispatch never selecting the arm") and for the FACTS clause.
- **Row 432.** "An arm whose type parameter occurs only in its return type is dropped from static resolution while the compiled run reaches it" is not what happens. The single arm compiles, so `checkApplicable` returns a candidate for it (the same per-arm computation runs in the overloaded case, `Functionals.scala:449`). The crash is a `BottomType` instantiation with no run-time descriptor, and it has nothing to do with overloading. The row is not "the type analog of row 400". D3's sentence "an arm whose unknown parameters are all types keeps today's drop" is not shown by this probe or by any other in the rung; the condition at `Functionals.scala:251` restricts the candidate to sizes, and whether a type-only arm ever reaches `NoContextError` is unmeasured.

## 10. The failure-mode question

The rung replaces no loud failure with a quiet value; it goes the other way. A quiet wrong answer (`SkDeadTop`, `SkMeet`, `SkJuxt`, `SkIntParam`, `SkTypeAndSize` each print the sized arm's 1 compiled), run-time crashes (`SkDeadVal`'s `NumberFormatException`, `UkRange`'s `NoClassDefFoundError: n$RTTIc`) and a compiler crash (`SkFnValue`'s `IndexOutOfBoundsException`) each become the compile-time error "Could not infer static argument nat n without context." For the overloaded `SkCtxFix`, one refusal replaces another ("Right-hand side has type Any" becomes "Could not infer ... without context", where a declared type is present but not used as context). The loud but undiagnosable failure that remains is the dynamic form, `SkDynZZ32Val`'s `NumberFormatException: For input string: "n"`, which the rung leaves as it was (D6).

## 11. Stops

None met. `compiler/StaticChecker.java` is untouched (`#shadow` matches), and there is no walk edit: `git diff e5414f5bf...HEAD` touches no file under `interpreter/`, `Library/`, `ProjectFortress/LibraryBuiltin/` or `Specification/`. No file of F or T is touched. The checker count is unchanged; the 44 nearest compiler tests and the ladder subset did not move.

## 12. For the repair round

1. Re-measure the dynamic form with a `ZZ32`-typed value (`SkDynZZ32.fss` and `SkDynZZ32Val.fss` here, or the worker's own), and rewrite provisional row 431: the defect (both paths dispatch to the dead-size arm; the compiled run dies with `NumberFormatException: For input string: "n"` when it reads the size), its class, its spec column (`overloading.tex:262-276` picks the sized arm at run time for a `ZZ32` value; `:137-138` is silent on the unbound size; home 3) and its candidates (extend the call-site refusal; refuse at the declaration an arm whose size occurs in no parameter type, the E3 and sentence route; a Fortress run-time error at the arm in place of `NumberFormatException`). Re-describe `UkDynAny` and `UkDynAnyVal` as the numeral split.
2. Rewrite provisional row 432 from `SkTypeRangeSingle`: a type parameter that occurs only in the return type is instantiated as `BottomType`, and the compiled run dies with `NoClassDefFoundError: java/lang/Object$RTTIc` when the body builds that instance; no overload is needed; walk prints `other`; silent (`inference.tex:24-25`), home 3. Drop "the type analog of row 400" there and in row 400's note.
3. Restate D3 (the candidate is built for sizes only; that a type-only arm "keeps the drop" is unmeasured) and D6 (not refused because answer 12 was reasoned on the static pick, not because the compiled dispatch skips the arm). Correct the new FACTS entry's sentence on rows 431 and 432, and the report's summary, divergences list and sections 8 (the `UkDynAny`, `UkDynAnyVal` and `UkTypeRange` readings), 9, 10 and 13 to match.
4. `SkFnValue`'s compiler crash (`IndexOutOfBoundsException` on the untouched checker for `f = ee; f(z)`) is a defect this review measured and the rung's edit repairs, so it is home 1: a gated expected-failure compile test on that shape, pinned by `compile_err_contains` on "Could not check function application" (the message the edit gives, `diff.txt:176-177`), is in place and passing before the second skeptic runs.

## 13. Recommended rows (not required corrections)

- A numeral argument dispatches differently on the two paths. For `ee[\nat n\](x: ZZ32)` beside `ee(x: Any)`, `ee(5)` is 1 under walk and 2 compiled (`SkLiteralArg`), and so is `ee(l)` for `l: Any = 5` (`SkDynZZ32`, second line). The specification gives a numeral its own type (`literals.tex:132-141`) and selects a declaration applicable without coercion (`conversions-coercions.tex:455-458`), which favours the compiled run. This is the dispatch face of row 79's mechanism, which the ledger scores the other way for `typecase`, so the gather may prefer a note on row 79 to a new row.
- Neither path fixes a static argument from a declared type. `b: Box[\3\] = mk(z)` and `take3(mk(z))` for `mk[\nat n\](x: ZZ32): Box[\n\]` are refused compiled, "Could not infer static argument nat n without context", and fail under walk with `Box[\BOTTOM\]`. The type twin infers `BottomType` (`SkCtxSingle`, `SkCtxArg`, `SkCtxType`). The specification is silent (`inference.tex:15`), so this would be home 3, a design limit of the inference. Low priority.

# Skeptic, rung R (`rung-unknown-size-arm`), second judgement

**Verdict: approved, with one required correction.** The repair round did what the judge ruled (`explorations/compile-ladder/rung-unknown-size-arm/JUDGE.md` section 5). Rows 431 and 432 are rewritten from the `ZZ32`-valued and single-arm measurements, and D3 and D6 are restated. The refusal at a call through a function value is gated as home 1 (`XXXNatUnknownSizeFnValue`). Instruction 5 was measured and gave "pre-empts, does not repair", and that crash has home 2 (`XXXOverloadedFnValue`) and provisional row 433. The source edit is the one the first judgement read, unchanged. My own differential found one shape the refusal does not reach while the record says it does: a sized arm whose unknown size occurs in its own parameter type, in a position the argument does not constrain, is still dropped (`Sk2ArrowDomain`). The code says why: the would-be candidate is built only when the arm's inferred domain holds no inference variable (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:251`). That is a limit of an edit that is right where it applies, not an error in it. It needs the record narrowed and row 400 kept open for that shape, not another round; section N says exactly what changes.

Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, cpu MHz 2100.000, load 0.08 0.57 3.35 when this judgement's runs started (2026-09-27T03:18:47Z), openjdk 25.0.4, `FORTRESS_THREADS=1`. One thread only: the edit touches no mutable variable, field, atomic block or library state, and every probe body is pure.

## A. What I read and ran

- `git log e5414f5bf..HEAD`: the worker's six first-pass milestones, the first judgement's two, the judge's one and the repair round's three (`29aeb8e44`, `61d884668`, `75b98471d`). The worktree was clean.
- `git diff de23d6127 HEAD -- ProjectFortress/src ProjectFortress/tests` and the three first-pass compiler tests: empty. The source edit, the two walk tests and the first-pass compiler tests are what the first judgement verified and ran.
- The repair round's net change (`git diff bff9ccb35..HEAD`): four test files, four probes, three captures, two scripts and `record.md`.
- `REPORT.md` is not on the branch, because the harness refused the worker's write again. I checked the report text the worker carried in its structured result.
- I ran the rung's five compiler tests through the harness under the rung's checker, and the repair round's two under the untouched checker's shadow (`tmp/sk-base/classes` first on the classpath, as in the first judgement). The driver is `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-tests.sh` and the capture `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-tests.txt`.
- I wrote sixteen programs of my own (`probes/skeptic/Sk2*.fss`) and ran each through the first judgement's driver, `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.sh`: walk, compile with the shadow and run, compile with the rung's checker and run. The capture is `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-diff.txt`. One run without the stack filter is `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-fnarg-stack.txt`.

## B. The provenance block (check 0)

Five lines, each citation opened again with `sed -n`:

- problem: `explorations/compile-ladder/rung-nat-checker/probes/skeptic/dead-arms.txt:44-95`. `SkDeadTop` walks to 1, 2, and `SkDeadVal` dies compiled with `NoClassDefFoundError: SkDeadVal$n`. Holds.
- spec: `Specification/basic/overloading.tex:137-138` (the chapter assumes every static variable instantiated or inferred), `:170-175` (applicability, static parameters inferred first), `:262-295` (run-time dispatch to a declaration no other applicable one is more specific than); `Specification/basic/trait-parameters.tex:82-86`; `Specification/basic/functions.tex:38-40` ("Single variables may be bound to functions including overloaded functions") and `:209-216` (a call "is 'dispatched' to the declaration associated with the most specific type of T applicable to A"); `explorations/coordinator/POSITIONS.md:162`, answer 12. All hold, and none is under `library/apis/`.
- precedent: `Functionals.scala:454-457` and `:249-259`. Hold.
- deviation: `Functionals.scala:464-473`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1156-1160`, `ProjectFortress/src/com/sun/fortress/exceptions/ApplicationError.scala:156-164`. Hold.
- historical: both edited files are of the 2012 tree; `explorations/protocol.md:126-127`. Holds.

The repair round's other citations hold as well:

- `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:155-163` is the `_WIcontains` key, and `:341-361` prints " OK Saw expected exception" for a met exception key. The in-process compile is `Shell.subMain` at `:691`; the report's `:689-691` is two lines early, which is cosmetic.
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: `:1517-1519` is `paramCount`, initially -1, and `:3603-3605` is the non-generic branch with "If it's an overloaded type, oy.". `:6364`, `:6383` and `:6388` are the three assignments, and `:6128`/`:6216` and `:6484`/`:6511` save and restore it.
- `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`: `:592` is `tys.get(0)`, `:624` is `getSignature`, `:692` says "GREATER THAN ZERO", `:708-714` skip an arrow of another arity, and `:724` is the call of `join`.
- `MethodInstantiater.java:227` and `InstantiatingClassloader.java:199-202` agree with the committed stack traces.

## C. The recorded failure (check 1)

- The first pass's is `probes/pre-edit-tests.txt`, in `60b451f65`. That commit adds only tests and that capture, and the edit is `65a2bcb19`. The first judgement verified it.
- The repair round's home-1 test is red under the untouched checker through the harness, in the worker's `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt:2-15`. I reproduced it: `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-tests.txt:53-64` reads " Did not satisfy compile_err_WIcontains", the `IndexOutOfBoundsException`, then `Tests run: 1,  Failures: 1`.

Every home-1 test of the rung has a recorded failure.

## D. The diff (check 2), and what one of its conditions leaves out

The edit is unchanged since the first judgement, and it does what the report says. One of its conditions has a consequence that the report states but does not follow through. At `Functionals.scala:251` the would-be candidate is built only `if (hasSizeInferenceVars(sargs) && !hasInferenceVars(resultArrow.getDomain))`. An arm whose unknown size stays in its inferred domain carries no candidate. The filter at `:466-469` then never sees it, and it is dropped as before. Measured (section K):

- `Sk2ArrowDomain`: `ea[\nat n\](f: Box[\n\] -> ZZ32): ZZ32 = 1` beside `ea(f: Any): ZZ32 = 2`, called as `ea(fn (b: Any): ZZ32 => 3)`.
  - The sized arm is applicable. Arrow types are contravariant in their parameter type (`Specification/basic/types-vals-vars.tex:411-421`), so `Any -> ZZ32` is a subtype of `Box[\n\] -> ZZ32` for every `n`.
  - It is more specific than `ea(f: Any)`, so it is the arm the rules pick (`overloading.tex:262-295`).
  - Alone, it is refused with rung N's message before and after the edit (`Sk2ArrowDomainSingle`). So it fails only because its size is unknown.
  - Beside `ea(f: Any)` it is dropped: walk prints 1, and the compiled run prints 2 before and after.
- `Sk2ArrowDomainVal`, the same pair with the body `= n`: walk fails loudly with "undefined variable [n]", while the compiled run prints 2, quietly, before and after.

Answer 12 says "when the arm the rules would pick has a size the call cannot fix, the call is refused ... instead of the arm being dropped" (`POSITIONS.md:162`), and this arm is still dropped. The report's section 5 names the domain condition as one of three conditions. No decision of section 9 names it, says what it costs, or gives the alternative. So four claims are too broad by this one shape:

- the FACTS entry's "It now refuses the call when such an arm is more specific than every candidate";
- "closing row 400's compiled half", in row 400's note and status, in the handover line and in the report's summary;
- the report's section 8, "The rung's refusal holds on every one of them".

The report does not say why the condition is there. By reading, the candidate's domain would be compared by `moreSpecificCandidate` (`STypesUtil.scala:1068-1096`). Whether `CoercionOracle.moreSpecific` compares a domain that holds a size variable soundly is unmeasured.

## E. The precedent search (check 3)

It stands as the first judgement found it: one discard site, all six application sites reaching it, the in-file refusal shape, rung N's error with its text unchanged, and `moreSpecificCandidate`. For row 433, the team's own marks are where the report puts them (`CodeGen.java:3605`, `:1517-1519`). No precedent here repaired a defect, so no count of sibling sites is owed.

## F. The tests (check 4)

- Under the rung's checker (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-tests.txt`):
  - `XXXNatUnknownSizeArm` (`:2-11`), `XXXNatUnknownSizeVal` (`:13-22`) and `XXXNatUnknownSizeFnValue` (`:24-33`) each print the refusal, " Saw expected failure" and `OK (1 test)`.
  - `XXXOverloadedFnValue` prints " OK Saw expected exception" (`:35-41`).
  - `NatKnownSizeArm` gives `OK (3 tests)` and PASS (`:43-51`).
- Under the shadow, `XXXNatUnknownSizeFnValue` is red (`:53-64`). `XXXOverloadedFnValue` gives " OK Saw expected exception" (`:66-72`), so that defect does not depend on the edit.
- `XXXNatUnknownSizeFnValue` exercises the refusal at the function-application site. Its pin, `Could not check function application - Could not infer static argument nat n without context.`, names both the site and answer 12's message; both a crash and a clean compile miss it.
- `XXXOverloadedFnValue`:
  - It pins the exception's class only. D7's reason holds: on JDK 8, `ArrayList.get` words the message "Index: 0, Size: 0".
  - Its asserts carry the specification's answers, 1 and 2, citing `functions.tex:38-40, :209-216`.
  - The worker showed its harness path red on a scratch copy (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt:81-110`). It is not shown red on a fix, because none is known, as with row 420.
- Each new test file carries one comment line, pointing at `REPORT.md`, and no provenance essay.

## G. Competing names (check 5)

- `grep -rlE 'NatUnknownSize|NatKnownSizeArm|NatSizeExclusionWalk|NatBigSizeWalk|OverloadedFnValue'` over `ProjectFortress/` (both corpora, every `*_tests/` directory and `src/`) and `Library/`, in `.fss`, `.fsi`, `.test`, `.java` and `.scala` files, finds the rung's twelve files and nothing else.
- Over `ProjectFortress/src/com/sun/fortress/`, `unfixedSize` and `unfixed` occur only at the edit. `NoContextError` is constructed only in `makeNoContextError` and matched only at `Functionals.scala:467`.
- My probe names (`Sk2*`) occur nowhere in `ProjectFortress/` or `Library/`.

## H. `record.md` (check 6)

- The judge's instructions 6 to 9 are carried out:
  - rows 431 and 432 are rewritten, and "type analog", "never dispatches" and the dispatcher-skip candidate are gone (grep);
  - the notes on rows 79 and 21 are appended;
  - the FACTS sentence is replaced, the function-value site is listed, and the text says "pre-empts ... does not repair".
- Row 431 against `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:2-42` and `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.txt:136-171`: it holds.
- Row 432 against `repair-diff.txt:43-62` and `repair-stacks.txt:174-203`: it holds.
  - The crash is in the static initializer of the instantiated arrow class, which `run` loads (`SkTypeRangeSingle.fss:9`), and the cause's first frame outside the JDK is `InstantiatingClassloader.java:202`.
  - The worker's departure from the judge's "when the body builds" is right.
- Row 433 against `repair-diff.txt:63-132` and `repair-stacks.txt:2-133`: it holds as far as it goes. Section K adds a second face it does not name (recommended row 1).
- The ledger's last row is 430, and 431 to 433 are provisional. Rows 21, 79, 400, 416 and 418 exist, and nothing is renumbered.
- The new entry on the harness is true (`FileTests.java:341-361`, `:377-402`).
- One claim is false for a measured program: section D, and correction N.

## I. The three homes (check 7)

The rung's homes, checked:

- Home 1: the three `XXX` compile tests pass, and I ran them (section F). The function-value test's assertion was in place before this judgement ran.
- Home 2: `XXXNatSizeExclusionWalk` and `XXXNatBigSizeWalk`, run through the harness in the first judgement and unchanged since. `XXXOverloadedFnValue`: its name, its `.test` and its verdict under both checkers, checked here.
- Home 3: rows 431 and 432, with committed `.txt` captures. The specification's silence is cited: `overloading.tex:137-138`, and `Specification/basic/inference.tex:24-25`.
- The numeral split is a note on row 79 with no gated test, and the declared-type context is a note on row 21. Both are the judge's decisions, with the departure stated.

My own measurements:

- **`Sk2ArrowDomain`** is row 400's defect in a shape the edit does not reach. Its home is 3:
  - The specification is silent on a size a call leaves unknown ("We assume throughout this chapter that all static variables in functional calls have been instantiated or inferred", `overloading.tex:137-138`), and it is answer 12 that decides.
  - The only gated form this harness offers for "the compiler must refuse this call" is an `XXX` test pinned on the refusal. That test would be red today, so no expected-failure form exists for this shape.
  - The probes are committed: `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2ArrowDomain.fss`, `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2ArrowDomainSingle.fss` and `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2ArrowDomainVal.fss`. The captures are `sk2-diff.txt:3-16` and `:159-198`.
  - The row is 400, which stays open for this shape (correction N).
- **`Sk2FnValueArg`** is row 433's defect with a second face. Its home 2 is `XXXOverloadedFnValue`, which a fix of the defect turns red. Recommended row 1 adds the face.
- **`Sk2InheritedPlain`**: walk accepts a dotted-method overloading that the Meet Rule refuses. It is outside this rung, and it is recommended row 2.
- **`Sk2CoercePlain`** reproduces row 390 (`NoSuchMethodError` for the dispatcher `=ec{...}(Any)`). Nothing is new.

## J. The count table (check 8)

The rung's committed table, `explorations/compile-ladder/rung-unknown-size-arm/probes/checker-count-after.txt:14-17`, reads `#total 125`, `#crash none` and `#shadow matches the tracked StaticChecker`. The report, `record.md` and the structured result each declare 125. The manifest's `expectedCheckerCount` of 125 is the prediction, and it was met. There is no mismatch. The repair round changed no source file, so the table stands.

## K. The differential

Every row is from `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-diff.txt`, at the lines given, except where another file is named.

| program | shape | walk | compiled before | compiled after | outcome |
|---|---|---|---|---|---|
| `Sk2ArrowDomain` (`:3-16`) | `ea[\nat n\](f: Box[\n\] -> ZZ32): ZZ32 = 1` beside `ea(f: Any): ZZ32 = 2`; `ea(fn (b: Any): ZZ32 => 3)` | 1 | 2 | 2 | **not refused**: the arm the rules pick is dropped as before (section D) |
| `Sk2ArrowDomainSingle` (`:159-174`) | the sized arm alone | 1 | refused, no context | refused, the same | control: the arm fails only because of its size |
| `Sk2ArrowDomainVal` (`:175-198`) | the pair with the body `= n`; `ea(g)`, then `ea(a)` for `a: Any = g` | `undefined variable [n]` | 2, 2 | 2, 2 | walk is loud and compiled is quiet, unchanged by the rung |
| `Sk2SubtypeFix` (`:17-33`) | `es[\nat n\](x: Sz[\n\]): ZZ32 = n` beside `es(x: Any): ZZ32 = 0`; `es(Three)` for `object Three extends Sz[\3\]`, then `es("s")` | 3, 0 | 3, 0 | 3, 0 | agree: a size fixed through a supertype of the argument's type is not refused |
| `Sk2Partial` (`:34-48`) | `ep[\nat n, nat m\](b: Box[\m\]): ZZ32 = m` beside `ep(x: Any): ZZ32 = 0`; `ep(Box[\3\](0))` | 3 | 3 | refused, naming `n` only | `m` is fixed and `n` is not; answer 12 |
| `Sk2GenericBound` (`:49-63`) | `ee[\nat n\](x: Tr)` beside `ee(x: Any)`, called from `g[\T extends Tr\](x: T): ZZ32 = ee(x)` | 1 | 1 | refused inside `g` | the rules pick the sized arm for `T`; answer 12 |
| `Sk2ObjSize` (`:124-138`) | methods `m[\nat n\](x: ZZ32): ZZ32 = k` and `m(x: Any): ZZ32 = 2` of `object Bx[\nat k\]`; `Bx[\3\](0).m(z)` | 3 | 3 | refused, "method invocation Bx[\3\].m" | the object's size is known and the method's is not; answer 12 |
| `Sk2Nested` (`:109-123`) | `ee(ee(z))` for `SkDeadTop`'s pair | 1 | 1 | refused once, at the inner call | one error, no cascade and no crash |
| `Sk2AllSized` (`:139-157`) | every arm sized: `ee[\nat n\](x: ZZ32)`, `ee[\nat m\](x: Any)` | 1 | refused, both named | the same | control: no candidate, so rung N's refusal, unchanged |
| `Sk2Coerce` (`:64-77`) | `ec[\nat n\](x: ZZ64)` beside `ec(x: Any)`; `ec(z)` for `z: ZZ32` | 1 | 2 | 2 | rightly not refused (see the list below). Walk's 1 comes from its number tower, which rung F flattens, and is F's to measure |
| `Sk2CoercePlain` (`:231-247`) | the same pair without the size | 1 | `NoSuchMethodError` for the dispatcher `=ec{...}(Any)` | the same | row 390, unchanged by the rung |
| `Sk2Inherited` (`:78-98`), `Sk2InheritedPlain` (`:249-270`) | `m[\nat n\](x: ZZ32)`, or `m(x: ZZ32)`, in `trait Tm`, and `m(x: Any)` in `object Om extends Tm`; `Om.m(z)`, `Om.m("s")` | 1, 2 | refused at the declaration, "Invalid overloading of m in trait Om" | the same | does not depend on the size; recommended row 2 |
| `Sk2FnValueOther` (`:99-108`) | `f = ee` for `SkDeadTop`'s pair, applied only to `"s"` | 2 | `IndexOutOfBoundsException` | the same | the refusal pre-empts row 433's crash only where the call reaches the sized arm, as the record says |
| `Sk2FnValueArg` (`:199-218`; `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-fnarg-stack.txt`) | `hh(x: ZZ32): ZZ32 = 1`, `hh(x: Any): ZZ32 = 2`, `app2(g: ZZ32 -> ZZ32, x: ZZ32): ZZ32 = g(x)`; `println(app2(hh, z))` | 1 | compiles; the run dies with "Unable to read serialized data for AbstractIntersection??, recommend you delete the Fortress bytecode cache and relink" | the same | row 433's second face; recommended row 1 |
| `Sk2FnValueArgTop` (`:219-229`) | `r = app2(hh, z); println(r)` | 1 | `IndexOutOfBoundsException` | the same | row 433 as written |

The outcomes, by rule 4:

- **`Sk2Partial`, `Sk2GenericBound`, `Sk2ObjSize` and `Sk2Nested`:** the specification with answer 12 settles each against the compiled run before the edit. The edit gives the refusal. Walk's half is left by the decision (row 400).
- **`Sk2ArrowDomain` and `Sk2ArrowDomainVal`:** the same settlement, but the edit does not reach them.
  - Strictly this is the first outcome, repair, since the fix is in this rung's own condition.
  - It is taken as a deferral with home 3 because this is the rung's last judgement, and the edit is right wherever it applies. Correction N states the gap.
- **`Sk2Coerce`:** the `Any` arm applies without coercion and is selected first (`Specification/basic/conversions-coercions.tex:455-458`). `moreSpecificCandidate` gives an arm that needs no coercion precedence (`STypesUtil.scala:1085-1094`), so the sized arm, which needs one, is not more specific, and the call is rightly not refused. The compiled 2 is the specification's answer.
- **`Sk2InheritedPlain`:** the Meet Rule for dotted methods (`Specification/advanced/overloading.tex:344-356`) settles it against walk. It is outside this rung, so it is recommended row 2.
- **`Sk2FnValueArg`:** the specification settles it against the compiled run (`functions.tex:209-216`). The repair lies outside this rung, in code generation and the run time, so it goes to row 433 (recommended row 1).

The rung's three checks for the skeptic hold again:

- walk still runs the refused shapes (`Sk2Partial` 3, `Sk2GenericBound` 1, `Sk2ObjSize` 3);
- a sized arm that the rules do not pick, or whose size the argument fixes, still compiles (`Sk2SubtypeFix`, `Sk2Coerce`, `NatKnownSizeArm`);
- a written size compiles (`NatKnownSizeArm`, section F).

## L. The failure-mode question

No loud failure becomes a quiet value. The refusal turns quiet values into a compile-time error: `SkDeadTop`'s 1, `Sk2Partial`'s 3, `Sk2GenericBound`'s 1 and `Sk2ObjSize`'s 3. It does the same to run-time crashes and to a compiler crash. The quiet value that remains is `Sk2ArrowDomainVal`'s compiled 2, where walk fails loudly. It predates the rung, and the rung leaves it as it was.

## M. Stops

None met.

- `compiler/StaticChecker.java` is untouched: `#shadow` matches the tracked `StaticChecker`.
- There is no walk edit: `git diff e5414f5bf...HEAD` touches no file under `interpreter/`, `Library/`, `ProjectFortress/LibraryBuiltin/` or `Specification/`, and no file of F or T.
- No library declaration is newly refused: the checker count and its full output are identical.
- No compiled test's verdict changed other than the rung's own. The repair round's two tests are new, and `XXXOverloadedFnValue` gives the same verdict under both checkers.
- No ladder file moved.

## N. The required correction

Narrow every claim that the refusal reaches every sized arm the rules pick to the arms whose inferred parameter type does not hold the unknown size, and keep row 400 open for the rest. In detail:

1. **The FACTS entry "The compiled checker refuses a call whose most specific arm has a size the call cannot fix".** After "It now refuses the call when such an arm is more specific than every candidate, with rung N's message, ...", add: "The refusal needs the arm's parameter type to be free of the unknown size (`Functionals.scala:251`). An arm whose unknown size occurs in its own parameter type, in a position the argument does not constrain, is still dropped, and the compiled run takes the other arm: `ea[\nat n\](f: Box[\n\] -> ZZ32)` beside `ea(f: Any)`, called with a function of type `Any -> ZZ32` (row 400; `compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-diff.txt:3-16`, `:159-198`)."
2. **Row 400's appended note.**
   - "Compiled half fixed in climb batch 6 rung R" becomes "Compiled half fixed in climb batch 6 rung R for an arm whose unknown size does not occur in its parameter type".
   - Append: "Still open compiled: an arm whose unknown size occurs in its own parameter type is dropped as before, because the would-be candidate is built only when the inferred domain holds no inference variable (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:251`). With `ea[\nat n\](f: Box[\n\] -> ZZ32): ZZ32 = 1` beside `ea(f: Any): ZZ32 = 2`, `ea(fn (b: Any): ZZ32 => 3)` gives walk 1 and compiled 2, before and after the rung. With the body `= n`, walk dies with 'undefined variable [n]' and the compiled run prints 2. The sized arm alone is refused with rung N's message (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2ArrowDomain.fss`, `Sk2ArrowDomainVal.fss`, `Sk2ArrowDomainSingle.fss`; `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-diff.txt:3-16`, `:159-198`). Home 3: the specification is silent on an unknown size (`Specification/basic/overloading.tex:137-138`), and answer 12 decides. The fix is in that condition: build the candidate with the size variable left in the domain. That needs `moreSpecificCandidate` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1068-1096`) to compare a domain that holds one, which is unmeasured."
   - The status column becomes "NEGATIVE-VERIFIED (at `e5414f5bf`), POSITIVE-VERIFIED (the compiled half's fix, for an arm whose unknown size does not occur in its parameter type); compiled half open for one whose does (`Sk2ArrowDomain`); walk's half open".
3. **The handover line.** "closing row 400's compiled half" becomes "closing row 400's compiled half except where the unknown size occurs in the arm's own parameter type".
4. **The report, as the gather writes it from the worker's text.**
   - In the summary, qualify "That closes row 400's compiled half" in the same words as item 3.
   - In section 5, say what the third condition costs, citing `Sk2ArrowDomain`.
   - In section 8, qualify "The rung's refusal holds on every one of them" with `Sk2ArrowDomain`.
   - In section 9, add a decision D8: the domain condition, its consequence (`Sk2ArrowDomain`), and the alternative (build the candidate with the size variable in the domain, unmeasured).
   - In section 10, row 400's entry: the compiled half is open for that shape, home 3.
   - In section 13, add one item for Pavol: the shape, and that row 400 stays open for it.

## O. Recommended rows (not required corrections)

1. **Row 433, notes column, append:** "Climb batch 6 rung R's second skeptic, 2026-09-27: an overloaded function passed as an argument shows a second face. With `hh(x: ZZ32): ZZ32 = 1`, `hh(x: Any): ZZ32 = 2` and `app2(g: ZZ32 -> ZZ32, x: ZZ32): ZZ32 = g(x)`:
   - `r = app2(hh, z)` as a statement crashes the code generator as this row says.
   - `println(app2(hh, z))` compiles, and the compiled run dies with `java.lang.Error: Unable to read serialized data for AbstractIntersection??, recommend you delete the Fortress bytecode cache and relink`, caused by `Resource not found : AbstractIntersection??.xlation`. The first frame outside the JDK is `InstantiatingClassloader.xlationForFunctionOrGeneric(InstantiatingClassloader.java:2512)`, reached while `run` defines a class that refers to that name.
   - Walk prints 1 for both, which is the specification's dispatch (`Specification/basic/functions.tex:209-216`).

   By reading, the difference is `paramCount`. A single argument sets it to 1 before the argument is generated (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6388`), and a tuple argument sets it only after its elements (`:6383`). So an overloaded function value inside `println(...)` meets 1 and gets through `forFnRef`, while at statement level it meets -1 and crashes. The message's advice is wrong: the component's caches were removed before the compile. The fix therefore includes the run time's class for an intersection-typed function value, not only `forFnRef` (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2FnValueArg.fss`, `Sk2FnValueArgTop.fss`; `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-diff.txt:199-229`, `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-fnarg-stack.txt`)." The probes that establish it are `Sk2FnValueArg` and `Sk2FnValueArgTop`.
2. **New row:**
   - **Defect:** "under `walk`, an overloading of a dotted method across inheritance that the Meet Rule refuses is accepted and dispatched". `m(x: ZZ32): ZZ32 = 1` in `trait Tm` and `m(x: Any): ZZ32 = 2` in `object Om extends Tm` run under walk and print 1 and 2 for `Om.m(z)` and `Om.m("s")`. The compiled checker refuses the pair: "Invalid overloading of m in trait Om: (Om, Any)->ZZ32 and (Tm, ZZ32)->ZZ32". The same holds with a size on the trait's arm.
   - **Status:** NEGATIVE-VERIFIED.
   - **Class:** implementation gap (interpreter).
   - **Specification:** the Meet Rule for dotted methods (`Specification/advanced/overloading.tex:344-356`) makes the pair valid only with a declaration for `(Om, ZZ32)` that `Om` provides. Neither `(Om, Any)` nor `(Tm, ZZ32)` is below the other, and `ZZ32` and `Any` are not incompatible.
   - **Evidence:** `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2InheritedPlain.fss` and `Sk2Inherited.fss`; `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-diff.txt:78-98`, `:249-270`.
   - **Home:** the harness has no expected-failure form that is green today for "walk must refuse this declaration", so the home is the gather's to choose. It is outside this rung. The probe is `Sk2InheritedPlain`.
