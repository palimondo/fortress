# Skeptic: rung I (climb batch 8), the paper's instance rule and the order of attempts

Verdict: **approved, with four required corrections** (section 9). The checker change does what the two decisions say, every promoted, new and rewritten test fails on the base and passes at the head through the harness, and the text states what the checker does. The rung did not find, and so does not report, that its rule turns two shapes of program that the base compiled and ran into runs that die loading an instance at an intersection type (section 5). The defect's home exists (`XXXCoverageReturnInferred`, row 559), but one of the two routes to it has no test, and the Effect of the Appendix I entry, the report and row 559 describe only the other.

Branch `wip/rung-instance-bound` at `6a348e255`; base `493b4076f`. The structured report's `recordText` was not given to this skeptic, and the branch carries no `record.md`, so check 8 could not be run (section 8).

## 1. The failure on the base, and the pass at the head, seen by this skeptic

The head's tests on the base's checker: `git checkout 493b4076f -- ProjectFortress/src`, `ant compileAll`, the library-order rebuild, then the harness (a copy of `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh` by way of the worker's copy) over the rung's 21 `.test` files and the controls `InferLoneBound` and `InferNumeralTie`:

    ONE_JVM=1 bash tmp/rung-instance-bound/skeptic/junit.sh skeptic-base ProjectFortress/compiler_tests InferResultOnlyCoercedLink.test ... XXXInferResultOnlyNoContext.test InferLoneBound.test InferNumeralTie.test
    F. run ProjectFortress/compiler_tests/InferResultOnlyCoerced (595ms) java.lang.NoClassDefFoundError
    Caused by: java.lang.NoClassDefFoundError: java/lang/Object$RTTIc
    F. compile ProjectFortress/compiler_tests/InferResultOnlyOverloaded Type checker generated.:0:0:
    subtypeCompareTo(class com.sun.fortress.nodes.BottomType class com.sun.fortress.nodes.BottomType) is not implemented!
    F. compile ProjectFortress/compiler_tests/XXXInferLoneUnionClosedTrait  Saw failure, but did not satisfy compile_err_contains; expected
    F. run ProjectFortress/compiler_tests/InferContextKeepsFit (630ms) FAIL:  99 =/= 1; a: V = k(NOf(1)) runs the generic k, ...
    F. run ProjectFortress/compiler_tests/InferLoneBoundThree (451ms) java.lang.NoSuchMethodError ... Union$RTTIc.factory(RTTI, RTTI, RTTI)
    Tests run: 38,  Failures: 27,  Errors: 0

Every test of the rung fails on the base except the five link tests of run defects (`InferResultOnlyCoercedLink`, `InferContextKeepsFitLink`, `ExpectedTypeChoiceLink`, `ExpectedTypeFnChoiceLink`, `InferLoneBoundThreeLink`), which compile on the base by design; the two controls pass. `XXXCoverageReturnInferred`'s run fails on the base ("Failed to satisfy run_err_contains"), the compile having been refused, "Right-hand side has type RightResult, but declared type is LeftResult."; `XXXInferResultOnlyNoContext` fails on the base with the base's other refusal, "Could not infer static argument T extends Any without context." The quotes match the report's section 2.

The head, after `git checkout HEAD -- ProjectFortress/src`, `ant compileAll` and the library-order rebuild (`javap` shows `solveToBounds` in the built `Formula$`):

    ONE_JVM=1 bash tmp/rung-instance-bound/skeptic/junit.sh skeptic-head ProjectFortress/compiler_tests <the same 23 files>
    . compile ProjectFortress/compiler_tests/XXXInferLoneUnionClosedTrait ... Saw expected failure
    . run ProjectFortress/compiler_tests/CoverageReturnInferred ... Saw expected failure (Exit code != 0)
    OK (38 tests)

The worker's one whole-suite run (compiler track "Tests run: 972,  Failures: 1", the failure `XXXUnionOfThreeRungK` turning green; library track "OK (86 tests)") ran on `f97debd88` with an uncommitted instrumentation patch applied and its trace property set (`tmp/rung-instance-bound/tracks-run.txt`, `instrumentation.patch`); the patch only reads `tried` and writes a log, though it forces all four attempts to be evaluated. `git diff --stat f97debd88 HEAD -- ProjectFortress/src` is empty, so the run's code is the head's but for that patch; the report says so. Read, not repeated. The compiler corpus's stages, counted from the `.test` files: 686 on the base, 700 at the head, so 959 becomes 973 as the report says.

## 2. The provenance block

Five lines. Each cited line opened with `sed -n` or `git show 493b4076f:...`: `XXXInferResultOnlyCoerced.fss:32` at the base is `d = describe(q(NOf(1)))`; `Functionals.scala:696` at the base is the attempts list; `inference.tex:89-94`, `:199-204`, `:241-242` at the base are the bound's sentence, the list item on a parameter nothing fixes, and the draft note's third item; `conversions-coercions.tex:472-476` is section "Coercion Resolution"'s first sentences; `Formula.scala:524-550` at the base is the per-variable binding with `killIvars`; at the head `Formula.scala:496` is `solveToBounds`, `Functionals.scala:703-708` the attempts, `inference.tex:239-245` the callout on the compiled path's `Object`, `:99-118` the new item, `STypesUtil.scala:1965-1969` `topIvars`, `TypeAnalyzer.scala:137-138` the new case, `changes.tex:2545-2548` the new sentence of "Passages not yet revised". The historical line lists every file of the 2012 tree the diff edits. No correction.

## 3. The diff, read against the passages

- `Formula.slv` gains a mode. Under it a type inference variable whose lower bounds are all `BottomType` or mention inference variables takes `ta.meet` of its upper bounds free of inference variables, an empty meet is no solution (`return None`), and the trivially true formula and the unifier's leftovers bind `Any` (`topIvars`). The result still passes `cMap(nc, sub)` (`Formula.scala:566-568`), so a binding that breaks a dropped upper bound with inference variables is refused, not accepted. This is the extract's solving step (section 4.2: "the intersection of the upper bounds", "never instantiates method type parameters with Bottom") within the decision's scope, a parameter the arguments do not fix; a parameter with a named lower bound keeps the join, which is the chapter's lone-parameter rule.
- The three call-inference sites take the mode (`STypesUtil.scala:946`, `:1067`, `Functionals.scala:371`); `TypeSchemaAnalyzer.scala:141`, `:194` and `addParamTypes` (`STypesUtil.scala:263`, a lambda's parameter types from its expected domain, not static arguments) keep `solve`. D1 is sound.
- The promotion offers `None` beside the named candidates (`Functionals.scala:349`). `SkUnionCtx` (section 4) shows the meet with the context: `b: BoxT[\Number\] = pick0(w, r)` runs at `Number`, and with no context at `Object` (row 412's bound).
- `typedApplication`'s order (`Functionals.scala:703-716`): the fallback set is the base's (the attempts with the context, or for `f(x)` those without it), and the attempt by subtyping with the context sits second (D4). `SkLambdaCtx` is the case D4 names: `b: BoxT[\String\] = wrapF(fn x => x + 10)` is typed only by that attempt and runs, `b.v = 11`.
- `TypeAnalyzer.pSubInner`'s new case (`:137-138`) applies wherever an inference variable is the upper side, in `TypeSchemaAnalyzer`'s questions too, which are rung O's area. The compiler track was green with it; the merged gate is where O's and I's edits meet.
- The text: the new item (`inference.tex:99-118`) states what `solveToBounds` does; the callout after the list (`:239-256`) states the compiled path's `Object` and the reduction's big operator, and answers the draft note, which stays; the chapter's "The expected type" paragraph already gave the instance the new order gives (its example `b: ZZ64 = id(3)`), so it needed no change, and `InferCoercionShapes.fss:78` now runs at that instance. The Effect of Appendix I's entry is right on what it states and silent on section 5.

The edit is as small as its tests need. Nothing outside the rung's files.

## 4. Differentials: this skeptic's own programs

Each compiled and run (`bin/fortress compile`, `bin/fortress run`) and walked (`bin/fortress FILE.fss`), with `tmp/rung-instance-bound/skeptic/probe.sh`, at `FORTRESS_THREADS=1`: no rung edit touches mutable state, a field, an atomic block or a library write, so one thread. Base runs were on the base build of section 1 (`base-probes.txt`), head runs on the head build (`head-probes*.txt`).

| program | base, compiled | head, compiled | walk | which side the specification takes |
|---|---|---|---|---|
| `SkMeetTraits`: `mk[\T extends A\](): T = cast[\T\](Both)`, `g(): B = mk()`, traits `A`, `B` unrelated | `g: Both` | `REACHED`, then `Unable to read serialized data for Intersection??` | `CastError` (row 424, `BottomType`) | `T` = `A ∩ B` (the new item): the checker is right, the run time is not (row 559); **a program that ran on the base now dies** |
| `SkInterRan`: `idy[\X\](x: X): X` applied to `choose(m)`, typed `LeftResult ∩ RightResult` | `idy: BothResult` | dies at load, before output, `Intersection??` | `idy: BothResult` | `X` = the intersection (the lone-parameter item, one argument): walk's output; **a program that ran on the base now dies** |
| `SkMeetThrow`: as `SkMeetTraits` with `mk` throwing, `try describe(g()) catch` | not run | `REACHED`, then `Intersection??` | `g: caught` | walk's output |
| `SkNumOnly`: `stopN[\T extends Number\](s): T`, `f1(): ZZ32 = stopN("a")`, `f3(): RR64` | `VerifyError: Bad return type` (`FZZ32`) | `f1: -1`, `f3: -2.5` | the same | repaired |
| `SkNumStr`: as above, `f2(): String = stopN("b")` | `VerifyError` | refused, "Function body has type Number, but declared return type is String." | runs (`f2` never called) | a static error: `Number excludes { String }` (`CompilerBuiltin.fsi:96`), the meet is empty and `Number` does not convert; walk has no static check |
| `SkThrowArg`: `wrap(throw InvalidRange)`, `pick(z, z)` | compile crash, `subtypeCompareTo(BottomType, BottomType) is not implemented!` | runs, `pick(z, z): BoxT[ZZ32]` | `pick(z, z): other` | the compiled run; walk's instance is the run-time class `Int` (`println(one(z))` prints `BoxT[\Int\]`), the narrower instance the interpreter callout already names |
| `SkUnionCtx`: unbounded `pick0(w, r)`, with and without `b: BoxT[\Number\]` | `BoxT[Number]`; no context `other` (the union) | `BoxT[Number]`; `BoxT[Object]` | `BoxT[Number]` both | `Number`; `Any` with no context, the compiled path's `Object` being row 412 and walk's `Number` row 516's walk half |
| `SkLambdaCtx`: `wrapF[\U\](f: ZZ32 -> ZZ32): BoxT[\U\]`, with and without context | compile crash, `subtypeCompareTo` | `b.v = 11`, `c.v = 21` | `RHS expression type BoxT[\BOTTOM\] is not assignable to LHS type BoxT[\String\]` | the compiled run; walk is row 424 |
| `SkMethodResult`: generic methods `O.mk()`, `O.st` under a declared `ZZ32` | compile crash, `subtypeCompareTo` | `x.v = 3`, `y.v = 3`, `n = -3` | `BoxT[\T@...\] is not assignable to LHS type BoxT[\ZZ32\]` | the compiled run; walk is row 21 |
| `SkNoCtxIf`: unbounded `stopU`, `chk(c): () = if c then stopU("bad") end` | compiles; run `VerifyError: Bad return type ... FVoid` | refused, "An 'if' clause without corresponding 'else' has type Object instead of type ()." | `chk done` | silent (the chapter's list: no expected type in an `if` without `else`); home 3, row 560 |
| `SkUnitObj`: unbounded `stopU`, `u0(): () = stopU("u")` | not run | refused, "Function body has type Object, but declared return type is ()." | `caught` | `Any` gives `()`; the compiled path's `Object` (row 412), as the callout says |
| `SkUnitAny`: `stopA[\T extends Any\]`, `u1(): () = stopA("u")` | not run | `caught` | `caught` | agree |
| `SkOverPass` / `SkOverPassAny`: an overloaded function passed to `idy[\X\]` / `idy[\X extends Any\]` | refused / dies, `AbstractIntersection??.xlation` | refused / dies, `Intersection??.xlation` | `h(3) = 4` | not a regression; the instance at an intersection of arrows is row 559's (and row 448's family) |

Rule 4's outcomes: `SkMeetTraits`, `SkInterRan`, `SkMeetThrow` and `SkOverPassAny`: the specification settles against the compiled run, whose checker is right and whose run time is not (row 559, home 2). `SkLambdaCtx`, `SkMethodResult`, `SkMeetTraits` under walk: settled against walk, rows 424 and 21, open. `SkNoCtxIf`: silent, the rung's home 3. `SkNumStr`: walk accepts what the text refuses, walk having no static checker. Nothing found by these probes contradicts the chapter's new text.

## 5. The finding: two routes by which the rule now produces an instance the compiled run time cannot load

The two stack traces end at the same site, `InstantiatingClassloader.xlationForFunctionOrGeneric` (`ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:2519`), by different paths:

    bin/fortress run SkInterRan      (head)
    Exception in thread "main" java.lang.Error: Unable to read serialized data for Intersection??, ...
    	at ...InstantiatingClassloader.xlationForFunctionOrGeneric(InstantiatingClassloader.java:2519)
    	at ...InstantiatingClassloader.xlationForGeneric(InstantiatingClassloader.java:2492)
    	at ...MainWrapper.main(MainWrapper.java:64)

    bin/fortress run SkMeetTraits    (head)
    REACHED
    java.lang.Error: java.lang.Error: Unable to read serialized data for Intersection??, ...
    	at ...InstantiatingClassloader.xlationForFunctionOrGeneric(InstantiatingClassloader.java:2519)
    	at ...InstantiatingClassloader.xlationForGeneric(InstantiatingClassloader.java:2487)
    	at ...InstantiatingClassloader.instantiateAbstractArrow(InstantiatingClassloader.java:1566)

- Route 1, row 541's repair: an argument whose static type is an intersection now fixes a bare type parameter at the whole intersection. The rung's own program was refused on the base, and the report calls the result "now compiles but dies at load". But a program that does not use the result at both conjuncts was accepted on the base at one conjunct and ran: `SkInterRan` printed `idy: BothResult` on the base and dies before any output at the head.
- Route 2, the instance rule itself: a parameter nothing fixes whose declared bound and expected type are traits that neither extend nor exclude each other takes their meet, an intersection. `SkMeetTraits` ran on the base (the instance at `BottomType`) and printed `g: Both`; at the head it dies at the call, through `instantiateAbstractArrow`. No test holds this route: `XXXCoverageReturnInferred` reaches the loader through `xlationForGeneric` from `MainWrapper` only.

The specification gives the intersection in both (`Specification/basic/inference.tex`, section "The Static Arguments of a Call", the lone-parameter item and the new item), so the checker is right and the defect is the run time's, row 559's, home 2. The Effect of the Appendix I entry says that calls whose run failed over `BottomType` "now run" and that the run time does not load "an instance at an intersection type, which the last of them gives (row 559)" (`Specification/appendices/changes.tex:1740-1741`); it does not say that the rule gives such an instance by a second route, nor that programs that ran on the base now die. Required corrections 1 to 3.

The 29 one-library refusals the report lists are the opposite movement, and smaller in cost than the report's wording suggests: `SkNoCtxIf`'s shape, accepted on the base at `BottomType`, failed JVM verification at load ("VerifyError: Bad return type ... FVoid"), and `SkNumOnly`'s did ("... FZZ32"), so where the head refuses a result-only call in a `()` position or with no expected type, the base's acceptance was a verification failure deferred to run time, not a working call. For Pavol, beside the worker's entry.

## 6. The tests themselves

Each file carries one comment line; each message cites a file and a section, never a line, and each named section says what the message says: `inference.tex`, "The Static Arguments of a Call" (`:47`); `conversions-coercions.tex`, "Coercion Resolution" (`:470`, a declaration applicable without coercion is selected first); `reductions.tex`, "Summations and Other Reduction Expressions" (`:12`, the reduction as a call of its big operator); `overloading.tex`, "Applicability to Named Functional Calls" (`:129`). Each test exercises its row's mechanism: on the base each fails with its row's own message (section 1). D6 is right, and the record's instruction could not be carried out as written: a plain `.test` whose compile fails is a failure whatever its keys (`FileTests.java:377-381` sets `anyFails` on `rc != 0`, `:405-416` fails it), so a refusal can only be an `XXX` file (`:932`, `:384-399`). The same holds for `XXXInferResultOnlyNoContext`, whose `XXX` name marks a refusal it pins (home 3), not a defect the text settles. Not corrected: `CoverageReturnInferred.fss:1` says the instance "runs", which is what the `XXX` run test expects once row 559 is repaired.

One message the rung's change made false: `compiler_tests/InferCoercionShapes.fss:79`, "a numeral converted at the argument under the expected type", for `c: ZZ64 = idt(3)`, which the rung's own trace shows now instantiates `idt` at `IntLiteral` and converts the result (`tmp/rung-instance-bound/moved.log`: "InferCoercionShapes.fss:78:15-19 | context ZZ64 | old: ZZ64->ZZ64 sargs=List(ZZ64) | new: IntLiteral->IntLiteral sargs=List(IntLiteral)"). The worker left it as "not this rung's file"; the rung may rewrite files in `compiler_tests/`, and a gated message that states what the build no longer does is a defect of the record. Required correction 4.

## 7. Precedent, competing declarations, count tables

- Precedent: the worker found the one per-variable binding site and its dual, counted the solver's six callers, both `killIvars` uses in `Formula.scala` (`:534`, `:553`, the heuristic's trial map left) and the other `BOTTOM` sites (`STypesUtil.scala:1007`, the declared upper bounds; `Formula.scala:315-322`, simplification). Nothing missed.
- Competing declarations: each new component name is declared once across `ProjectFortress/tests/`, every `*_tests/`, `Library/` and `LibraryBuiltin/`; `solveToBounds` and `topIvars` occur only in `Formula.scala` and `STypesUtil.scala`; `BIG LAST` only in its test; no file outside `explorations/` names a removed test.
- Tables: `tmp/rung-instance-bound/stages/checker-count.txt` `#total 59`, `#crash none`, the report's 59, identical to `climb-batch-7b/gate/checker-count.txt`; `distance.txt` `#total 623` against the landed 598, the report's figures. `git log b0eb41516..493b4076f -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing, `b0eb41516` being the commit that landed 7b's table. The site lists (36 came, 11 gone) add up to the report's classes. The two unattributed bodies (`FortressLibrary.fss:1557`, `:3271`) are the second bodies of `BIG SQCAP` and `BIG MAXNUM`, present in `climb-batch-7C/gate/distance-sites.tsv` and partly in `climb-batch-N`'s, so the report's "come and go" is borne out.

## 8. The record

`record.md` is not on the branch and its text was not passed to this skeptic, so the FACTS entry and the ledger notes could not be checked. The gather checks there that row 559's text names both routes of section 5 with `SkInterRan` and `SkMeetTraits` (required correction 3), that row 512 is closed by `InferLoneBoundThree`, and that no row is renumbered.

## 9. Required corrections

1. A home-2 pair for route 2: a program by topic in `ProjectFortress/compiler_tests/` of `SkMeetThrow`'s shape (`mk[\T extends A\](): T` throwing, `g(): B = mk()` for traits `A` and `B` that neither extend nor exclude each other, `REACHED` printed before the call), a plain link test and an `XXX` run test with `run_out_contains=REACHED` and `run_err_contains=Intersection`, its message citing `inference.tex`, section "The Static Arguments of a Call". At the head it compiles and its run prints `REACHED` and dies with "Unable to read serialized data for Intersection??" through `instantiateAbstractArrow`; walk prints `g: caught`, the specification's output.
2. `Specification/appendices/changes.tex`, the Effect of "The inference of a call's static arguments" (`:1740-1741`): the sentence on row 559 to name both routes, an argument whose static type is an intersection and a parameter nothing fixes whose declared bound and expected type meet at an intersection of two traits, and to say that a program the compiled path ran at one conjunct or at `BottomType` before this revision now dies loading that instance.
3. `REPORT.md` sections 7 and 10 and `record.md`'s row 559: the same two routes, with `SkInterRan` and `SkMeetTraits` (section 4's lines and the commands), and the regression stated as such.
4. `ProjectFortress/compiler_tests/InferCoercionShapes.fss:79`: the message to say what the call now does, the numeral's own instance with its result converted to `ZZ64`, citing `Specification/basic/inference.tex`, section "The Static Arguments of a Call"; the assertion `c = three` unchanged.

## 10. Loud failures that became values

- "Could not infer static argument T extends Any without context." becomes the instance at `Any` (`eAny()` a `BoxA[\Any\]`; `InferResultOnlyAny`).
- The checker's crash `subtypeCompareTo(BottomType, BottomType) is not implemented!` and the loads that died over `BottomType` (`NoClassDefFoundError: java/lang/Object$RTTIc`, `VerifyError: Bad return type`) become runs at the bound: `SkThrowArg`, `SkLambdaCtx`, `SkMethodResult`, `SkNumOnly`, `InferResultOnlyCoerced` ("other"), `InferResultOnlyAny` (`c1: -1`).
- The union refusals of rows 515, 516 and 518 become instances at the bound (`Object` unbounded on the compiled path, `Any` written).
- The order changes values without any failure: 99 becomes 1 (`InferContextKeepsFit`), 105 becomes 5 (`ExpectedTypeChoice`, `ExpectedTypeFnChoice`).

Each value is the one the chapter gives. The opposite movement, from a value to a loud failure, is section 5's two routes and the 29 library refusals.

## 11. Stops

The worker's one, `XXXUnionOfThreeRungK` turning green: by the rule ("never the union of the arguments' types"), listed because the record did not name the test; lifted by the decision on the paper's instance rule and by "Reversible stops do not hold a batch". No other stop of the record's intro for rung I is met: no compiled test's verdict changed but the rung's, no edit to answer 9's rules (`moreSpecificCandidate` untouched) or to O's files, no binding but the bounds, normative text only in the named passages, no walk file.
