<!-- Climb batch 14, rung A (rung-argument-context): the compiled checker retries a call written as another call's argument against each declaration's parameter type, under P-51 (item 48 (b), row 455) and P-49; the probe's wide patch applied as is, row 455's faces and row 535's call compiled and run, the inference chapter and its Appendix I entry revised in the S1 form. Written by the rung's worker (Opus) in /home/user/fortress-argctx, branch wip/rung-argument-context, cut from 5bf8a7c84 and seeded from the batch's base build /home/user/fortress-base14. -->

# Rung A: a call written as another call's argument

- problem: row 455's two argument faces, `takesBox64(wrapT(3))` and `takesBox64(mk())`, refused by the compiled checker at `BoxT[\IntLiteral\]` and `BoxT[\Object\]`, and row 535's pinned refusal of `k(pk0(Tri, Sq))` at `BoxT[\Any\]` (`ProjectFortress/compiler_tests/XXXInferContextDrops.fss:10-11` and `XXXInferLoneUnionClosedTrait.fss:11` at the base; now `InferCallArgumentContext.fss:15-16` and `InferLoneUnionClosedTrait.fss:16`); P-51 decides the repair.
- spec: `Specification/basic/expressions/var-ref.tex:38-40` (the static arguments "are statically inferred from the context of the function call") and the list of contexts, `Specification/basic/inference.tex:129-154` after this rung.
- precedent: the probe's wide patch, `explorations/reviews/argument-context-probe.md:38-161`, built on the checker's own retry of an unchecked argument under an expected type, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:510-537` (`inferFnExprParams`), and of the loose juxtaposition, `impls/Operators.scala:181-184`.
- deviation: none from the probe's patch, applied with `git apply` at its three hunks (offset 13); from the specification's spelling, an argument that writes its static arguments is retried too, to the same type (`Functionals.scala:903-908`), and a tie among retried declarations is refused with the not-applicable message (`Functionals.scala:892-895`), which the new paragraph spells as the call typed without an expected type (`Specification/basic/inference.tex:191-202`).
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:660-909`, `Specification/basic/inference.tex:142-333`, `Specification/appendices/changes.tex:2061-2272`.

## 1. What changed, and why

P-51: "When the checker's attempts at a call keep none, an argument that is a call with inferred static arguments is checked again, with each candidate's parameter type as its expected type. The trigger is wide." P-49: a declaration that fits the call as written is never passed over.

The checker typed every argument of a call without an expected type (`partitionArgs`, `Functionals.scala:96-102`, through `checkExprIfCheckable`), then tried the call's declarations in P-49's order (`Functionals.scala:733-738`). So a type parameter of an argument that only its result mentions took its bound (`mk()` gave `BoxT[\Object\]`), one that only a numeral fixes took the numeral's type (`wrapT(3)` gave `BoxT[\IntLiteral\]`), and the call was refused.

The edit, one file, 94 lines added and 1 removed, the probe's patch unchanged:

- `typedApplication` (`Functionals.scala:650-661`) types the arguments and hands them to `typedApplicationOfChecked` (`:668-836`), the old body, with a `retry` switch.
- When no attempt is kept (`:739-742`), and only then, `retypedApplication` (`:850-896`) runs before today's fallback. It takes the arguments whose checked form is a call carrying static arguments (`retypable`, `:903-908`: a function application, an operator application or a method invocation). For each declaration in turn it checks each such argument again with the parameter type at its position as its expected type, a generic declaration's parameter type first instantiated from the other arguments and the call's expected type alone (`:863-874`, `:875-881`); it then checks the call against that one declaration with the arguments so typed (`:882-887`), and the declaration counts when the call's type converts to the expected type. Of those that count, the one more specific on its declared parameter types than every other wins, with its arguments (`:889-895`); otherwise the call goes on exactly as before.
- The mechanism is the checker's own: a `TryChecker` checks an unchecked argument again under an expected type, as `inferFnExprParams` does for a function literal (`:510-537`) and the loose juxtaposition for its multifix application (`Operators.scala:181-184`). A nested argument retries by recursion.

Beyond the probe's measurement: a reduction's desugaring writes its big operator as a call, `BIG LAST()`, that is an argument of `__bigOperator` (`explorations/compile-ladder/rung-instance-bound/REPORT.md`, section 4), so the retry gives it the reduction's expected type. With the bound `Number`, `s: ZZ32 = BIG LAST[j <- lo#n] (3 j)` was refused, "Right-hand side has type Number, but declared type is ZZ32.", and now compiles and gives 9 (section 5). An F-bounded big operator is still refused, and with no expected type the bound stands (section 5). That is half of row 425; the other half, the element type from the clauses, stands.

## 2. The tests: their failure on the base, and their pass

Compiled tests, `ProjectFortress/compiler_tests/`:

- `InferCallArgumentContext` (from `XXXInferContextDrops`, renamed with `git mv`): row 455's two faces, compiled and run, each instance read by a `typecase` on the box at run time and pinned with `run_out_equals`.
- `InferLoneUnionClosedTrait` (from `XXXInferLoneUnionClosedTrait`): row 535's `k(pk0(Tri, Sq))`, compiled and run, its instance `BoxT[Fig]` pinned; a revival test's pin changed, from the refusal to the run.
- `InferCallArgumentOverloaded`: `over(mk())` and `over5(mk(), Tri)`, the `Tri` arm winning as more specific.
- `InferCallArgumentGeneric`: `kindOf(mk(), z64)` with `ZZ64` expected, and `pair(mk(), b64)`.
- `InferCallArgumentForms`: `takesBox64(idB(idB(mk())))`, `Taker.take(mk())`, `mk() BOXOP 3`, `takesBox64(BoxT(1))`.
- `InferCallArgumentKeepsFit`: `over3(mk())` keeps its `Any` arm (P-49); a guard, green on the base and after.
- `XXXInferCallArgumentControls`: `takesBox64(mkS())`, `takesBox64(wrapT("s"))`, `takesBox32(wrapT(z64))` and `over2(mk())`'s tie, refused before and after; pinned by the error count and by a `compile_err_WImatches` over each refusal's location and message.
- `InferBigOperatorExpectedType`: the reduction above, its value asserted.

The failing run, before the edit was first built (the tree was the base build's, its tests only changed; `f3b05db67` is the tests' commit):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests InferCallArgumentContext.test InferLoneUnionClosedTrait.test InferCallArgumentOverloaded.test InferCallArgumentGeneric.test InferCallArgumentForms.test InferCallArgumentKeepsFit.test XXXInferCallArgumentControls.test
    # junit.sh base 2026-10-14T02:53:18Z; nproc 4; ... tree 5bf8a7c84 with the next rung applied, not yet committed
    - BoxT[\ZZ64\]->String is not applicable to an argument of type BoxT[\IntLiteral\].
    - BoxT[\ZZ64\]->String is not applicable to an argument of type BoxT[\Object\].
    - BoxT[\Fig\]->String is not applicable to an argument of type BoxT[\Any\].
    Tests run: 19,  Failures: 15,  Errors: 0

The 15 failures are the compile, link and run cases of the five plain tests that the base refuses; `InferCallArgumentKeepsFit`'s three and the controls' one passed. `InferCallArgumentGeneric` was refused at `:21`, "Right-hand side has type Object, but declared type is ZZ64.", and at `:24`, "[\U extends Object\](BoxT[\U\], BoxT[\U\])->String is not applicable to an argument of type (BoxT[\Object\], BoxT[\ZZ64\])."; `InferCallArgumentForms` at its four lines, the method invocation "Could not check method invocation Taker.take" and the operator "Could not check call to operator BOXOP" among them.

The controls' expected failure, the first `XXX` test the rung adds, shown red on a deliberate fix (its four calls given written static arguments for one run, then restored, `cmp` identical):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh red-check ProjectFortress/compiler_tests XXXInferCallArgumentControls.test
    1) ...XXXInferCallArgumentControls(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

`InferBigOperatorExpectedType`, written after the edit was built, failed on the old code through the harness:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base14 /home/user/fortress-argctx/tmp/old-caches junit /home/user/fortress-argctx/ProjectFortress/compiler_tests/InferBigOperatorExpectedType.test
    .../InferBigOperatorExpectedType.fss:30:15-39:
        Right-hand side has type Number, but declared type is ZZ32.
    Tests run: 3,  Failures: 3,  Errors: 0

The passes, on the final code (`778ab8db1`, the edit; nothing in the checker changed after it):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh edit1 ProjectFortress/compiler_tests InferCallArgumentContext.test InferLoneUnionClosedTrait.test InferCallArgumentOverloaded.test InferCallArgumentGeneric.test InferCallArgumentForms.test InferCallArgumentKeepsFit.test XXXInferCallArgumentControls.test
    OK (19 tests)
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh bigop ProjectFortress/compiler_tests InferBigOperatorExpectedType.test InferBigOperatorUnwritten.test
    OK (6 tests)

and the suite, `ant testQuick`, which ran all of them but `InferBigOperatorExpectedType` (written after its file list was read): `BUILD SUCCESSFUL`, compiler track 1,135 tests, othercompiler 263, library 86, each with 0 failures (section 6).

The runs printed, as pinned: `takesBox64(wrapT(3)) -> BoxT[ZZ64]`, `takesBox64(mk()) -> BoxT[ZZ64]`, `k(pk0(Tri, Sq)) -> BoxT[Fig]`, `over(mk()) -> over(BoxT[ZZ64]) BoxT[ZZ64]`, `over5(mk(), Tri) -> over5(BoxT[ZZ64], Tri) BoxT[ZZ64]`, `kindOf's box: BoxT[ZZ64]`, `kindOf(mk(), z64) -> 7`, `pair(mk(), b64) -> BoxT[ZZ64] and BoxT[ZZ64]`, each of the four forms `BoxT[ZZ64]`, and `over3(mk()) -> over3(Any) BoxT[Object]`.

Walk, `ProjectFortress/tests/XXXInferCallArgumentWalk.fss`, an expected failure (section 10):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-argctx/tmp/rung-argument-context/h1 ProjectFortress/tests/XXXInferCallArgumentWalk.fss
     OK Saw expected exception
    OK (1 test)

Run directly (`cd ProjectFortress && ../bin/fortress tests/XXXInferCallArgumentWalk.fss`): "Unification error: Closure/Constructor for takesBox64 param 1 (b:BoxT[\ZZ64\]) got arg BoxT[\Any\] of type BoxT[\Any\]" at `:15:12-26`.

## 3. Where the fix belongs, the ways, and the precedent

`explorations/coordinator/map/compile-path-walkthrough.md`, "How it walks the tree": the checker is bidirectional, and every call form (function application, method invocation, operator application, subscript) goes to `Functionals`; `typedApplication` is where they meet (its callers: `Functionals.scala:597`, `:638`, `:1038`, `:1224`). Walk has no static types; the fix is the compiled checker's alone (`modules-and-phases.md`, B.6).

The ways the checker offers:

1. The wide retry inside `typedApplication`, after the attempts keep none (taken: P-51).
2. The narrow retry: only an argument whose own declaration has a type parameter its parameter types do not mention (the probe, "The narrow trigger"). Not taken: P-51 decides wide; it leaves `takesBox64(wrapT(3))` refused.
3. Typing every argument under each declaration's parameter type before the attempts. Not taken: it reverses P-49's order, and an overloaded call has no one parameter type before its choice.
4. One inference across the inner and outer calls' static parameters (fork 2's third way). Not taken: a solver change in `STypesUtil`, not this rung's file, and no decision asks for it.
5. The library writing the static argument, `mk[\ZZ64\]()`. Not taken: the library's own practice is the standard (Appendix I, "The contexts that give a call an expected type", Rationale).

Precedent: the same defect, a context that drops the expected type, was repaired before by passing it on with a `TryChecker` retry: the loose juxtaposition and the two multifix applications in `Operators.scala` (3 sites: `:181-184`, `:369-372`, `:399-402`), and in `Functionals.scala` one site before this rung, `inferFnExprParams` (`:510-537`). The retry here is a fourth form of it, as the probe built it.

## 4. What the specification settles, and the text changed

The text gave the context already: an identifier reference's static arguments "are statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:38-40`), and a declaration is chosen on its declared parameter types, then instantiated (`inference.tex`, "The Static Arguments of a Call", Choice and Instantiation). The chapter's list of contexts left the argument of another call out, and named it in the item of what it does not yet describe.

The changed passages, in the S1 form (P-95, P-96), with the reason and the way back for each:

1. The list of contexts, `Specification/basic/inference.tex:142-154`. Original (the base, `:142-148`): "...is then a subtype where the type of each clause is; and as the body of a `label` expression ..., is then a subtype where each of those types is." New: the `label` clause is followed by "and as an argument of a call that this section does not accept with its arguments typed without an expected type, where the argument is itself a call that does not write its static arguments, the parameter type at the argument's position of each declaration of the enclosing call in turn, instantiated, where that declaration has static parameters, by the arguments that are not so typed and by the expected type of the enclosing call alone, as described below." Reason: P-51. The condition is "not accepted", not "no declaration applicable", because the checker retries whenever no attempt is kept, which includes a declaration applicable to the call whose result does not fit the expected type: `kindOf(mk(), z64)` with `ZZ64` expected was accepted at `U = Object` and refused by its binding, "Right-hand side has type Object, but declared type is ZZ64." (section 2's base run). Way back: the clause removed, the item restored.
2. Its box, `inference.tex:158-174`: the existing `revival-expected-contexts` box gains a sentence for the third revision (`:169-174`), as the `label` revision extended it.
3. A new paragraph after the instance's rule, `inference.tex:191-215`, with its own box (`:216-218`): the arguments are typed first without an expected type; where the section accepts no instance, each argument that is a call not writing its static arguments is typed again once per declaration; the enclosing call invokes, of the declarations applicable with the arguments so typed and whose return types fit, the one more specific than every other on their declared parameter types, else it is typed as before; so a declaration applicable as written is never passed over; the example `takes(mk())` against `over(mk())`. Reason: the list says which type; the choice among declarations each with its own typed arguments needed a sentence the list cannot hold, and P-49's guarantee is part of the rule. It is normative text beyond the list (a point to report, section 8). Way back: the paragraph and its box removed.
4. The item, `inference.tex:318-319`. Original (`:277-278`): "an expected type in any context other than those listed above, such as an argument of another call or the body of a `for` loop;". New: "... such as the body of a `for` loop;". Its box, `:325-333`, names the text of 9 October 2026 among those that named an argument of another call. Way back: the words restored.
5. Appendix I, "The contexts that give a call an expected type" (`Specification/appendices/changes.tex:2043-2275`): a third revision in the Change (`:2061-2076`); in the Rationale (`:2124-2161`) the decision of 9 October 2026, the quotation of `var-ref.tex`, the two faces and row 455, why the retry runs only where the call is not accepted otherwise, the narrow trigger as the way not taken, the reversal, and this report and the probe as the full reasoning; in the Effect (`:2171-2191`, `:2212-2216`) the sentence "It still gives no expected type to an argument of another call (row~455 of the revival's gap ledger), as the item of the list says." replaced by what the checker now does, the tie's message, the reduction's big operator (row 425), and walk's departure (row 705, for the gather to number); in the Original text (`:2219-2220`, `:2259-2272`) the new paragraph named as new, and the list's end and the item before the third revision. The decision's date is that of `4dc35f685`, which recorded his "Q48(b) wide, go ahead" at about 21:57 UTC on 9 October 2026.

The front matter's paragraph (`Specification/fortress/preamble.tex:54-64`) stays true. The specification built: `cd Specification/fortress && ./ant genSource && ./ant tex`, both `BUILD SUCCESSFUL`. The skill's grep of `fortress.log` for undefined or multiply defined references and undefined control sequences matched 41 lines, all `x@warning {Reference `#1' on page \thepage \space undefined}`, the macro's own definition in the log's trace; no `LaTeX Warning:` line; the labels cited resolve (`sec:idn-ref`, `sec:reduction-expr`, `sec:revival-expected-contexts` in `fortress.aux`). The build's ignored files were removed with `git clean -fXq -- Specification`.

## 5. Old against new

Each program below ran on the new code in this tree and on the old code through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base14 /home/user/fortress-argctx/tmp/old-caches`:

- The tests of section 2: the base refusals quoted there, and the new code's runs.
- Row 425's shape with the bound `Number` (the program of `InferBigOperatorExpectedType`): old "Right-hand side has type Number, but declared type is ZZ32.", rc 255; new rc 0, the run prints `PASS` (its `assert(s, 9, ...)` holds).
- The same with an F-bounded big operator, `[\T extends StandardTotalOrder[\T\]\]` in place of `Number`: old and new alike, "Could not check call to operator BIG LAST - [\T extends CompilerAlgebra.StandardTotalOrder[\T\]\]()->Red[\T\] is not applicable to an argument of type ().", rc 255: the inner call has no instance, so the argument is untyped and the retry is not reached.
- The same with no expected type, `t = BIG LAST[j <- lo#n] (3 j)`: rc 0 on both.
- The seven files of the ladder subset whose result differs from the baseline (section 6): the same first error, or a pass, on old and new.

Walk (unchanged by the rung), on the compiled tests' programs: `InferCallArgumentContext` fails at `:15`, "Unification error: Closure/Constructor for takesBox64 param 1 (b:BoxT[\ZZ64\]) got arg BoxT[\Int\] of type BoxT[\Int\]"; `InferLoneUnionClosedTrait` "got arg BoxT[\Any\]"; `InferCallArgumentOverloaded` "Failed to find any matching overload, args = (BoxT[\Any\])"; `InferCallArgumentKeepsFit` prints `over3(mk()) -> over3(Any) another instance` (walk's `BoxT[\Any\]`, the compiled path's `BoxT[\Object\]` being row 412's bound).

## 6. The suite, the count, the distance and the ladder

`ant testQuick`, once, on the final code (`778ab8db1`; tests to `7d64af062`):

    ant testQuick
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 405.223 sec
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 438.352 sec
    [junit] Tests run: 1135, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 668.685 sec
    BUILD SUCCESSFUL
    Total time: 11 minutes 14 seconds

The compiler track rose from 1,118 (`climb-batch-13b/gate/summary.txt`) by 17: the two promoted tests from one case to three each (+4), and the five new tests' 13 cases. The two expected failures the brief names turned plain; no other verdict changed. `InferLooseJuxtContext`, `InferRepeatedOperatorContext`, `InferTightJuxtContext`, `InferCoercionShapes`, `InferBigOperatorUnwritten`, the `InferResultOnly*`, `InferLone*` and `Infer*Context` tests pass; `XXXNatArithInferChecker` (row 681), `XXXNatOpenOverloadChecker` (row 682) and `XXXNatMismatchChecker` still "Saw expected failure".

The count, once on the final code, against `climb-batch-13b/gate/checker-count.txt`:

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-argument-context/checker-count-postedit.txt tmp/rung-argument-context/cc-post
    diff explorations/compile-ladder/climb-batch-13b/gate/checker-count.txt tmp/rung-argument-context/checker-count-postedit.txt
    (no output, rc 0)
    #total	1

The one error is item 47's, `Library/FortressLibrary.fss:1311:10`, "Missing parameter type for i", as before.

The distance, once on the final code, in the background, against `climb-batch-13b/gate/distance.txt`:

    explorations/coordinator/tools/distance/run.sh tmp/rung-argument-context/distance-postedit.txt tmp/rung-argument-context/dist-post
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-13b/gate/distance.txt tmp/rung-argument-context/distance-postedit.txt
    DISTANCE SAME   85

Every `#kind` and `#class` row is equal, and the same two `#crash` rows stand (`FortressLibrary.fss:1311:10`, item 47's; the `TryChecker` bug at `FortressLibrary.fss:2923`). Per site, the run's error list against `explorations/compile-ladder/gate/distance-sites.tsv`, by location and message: 85 and 85, 0 cleared, 0 new. The rung edits no library file, so no line moved under the per-site list (row 577). The table's `#seconds` row read 1,644, FortressLibrary 937 (13b's landed run: 2,246 and 1,318, at another load; not a comparison): the retry does not slow the library's check measurably.

The ladder subset (`gate.md`, "The ladder regression", its last paragraph): the 48 files of the baseline's `ladder.tsv` (`baseline-2026-09-19`) in the `typecheck` phase whose first error is a call refusal or a type mismatch ("Could not check call", "Could not check method invocation", "has type", "Could not assign an expression of type"), none of them in the gate's pass list, run with the drivers copied to the rung's `tmp/` and compared with the baseline's rows. 41 are unchanged; 7 differ from the baseline (`FailInference2`, typecheck to pass; `expTest`, to disambiguate; `overloadTest6`, to codegen, "Can't compile VarArgs yet"; `restTest`, `restTest2`, `restTest2a`, to the varargs refusal; `simpleExp`, to "Ambiguous coercion in call to operator ^"), and each of the 7 gives the same result on the old code: no ladder file moves by this rung.

## 7. Sentences of the specification made false

The rung edits only the passages of section 4. These others say what the compiled checker does with a reduction's big operator, and the retry changes it where the reduction has an expected type (section 5); the gather corrects them:

- `Specification/basic/inference.tex:342-345` (the `revival-inference` box): "A reduction's big operator is an argument of the call that the reduction's desugaring makes, so no expected type reaches it: the compiled type checker instantiates a generic big operator whose static argument the reduction does not write at its bound (row~425 of the revival's gap ledger)." Now the expected type reaches it, as a call written as an argument, where the instance at the bound gives the reduction a type that does not fit it.
- `Specification/basic/expressions/reductions.tex:37-41` (the `revival-reductions` box): "the compiled type checker, when it checks the libraries this specification describes, takes the bound of the big operator's static parameter, which is not the element type: a bound such as \TYP{Number} gives the reduction that type". Now, where the reduction has an expected type that the bound's type does not fit, it takes the expected type; the sentence's second half, "a bound that mentions the static parameter itself gives no instance that applies, so that the reduction is refused (row~425)", stays true.
- `Specification/appendices/changes.tex:1053-1057` (the entry "Reductions whose element type nothing fixes"): "...it now takes the parameter's bound, which is not the element type (row~425)." The same correction; its `:1072`, "The compiled type checker still refuses that form (row~425).", stays true, the form being the F-bounded one.

No Appendix I Effect or note on walk becomes false: walk is unchanged, and the chapter's walk box, "It does not yet fix a type parameter by the expected type" (`inference.tex`, the `revival-inference` box after the Dispatch example), still holds.

## 8. Points to report

- Normative text changed beyond the list of contexts, its item and the Appendix I entry: the new paragraph after the instance's rule, `Specification/basic/inference.tex:191-219` (section 4, item 3). Reversible.
- The probe's forks 2, 4 and 5 as built, the patch's way: fork 2, a generic enclosing declaration is instantiated from the arguments not retried and the call's expected type alone, a parameter only retried arguments fix taking its bound (`Functionals.scala:863-874`); fork 4, a tie among the retried declarations returns no result, and the call is refused with today's not-applicable message (`:892-895`; `XXXInferCallArgumentControls.fss:17` and its `compile_err_WImatches`); fork 5, an argument that writes its static arguments is retried, to the same type, and passed over (`:879`, `:903-908`). No departure from the probe's patch. Reversible.
- A call whose chosen instance changes, beyond the probe's measurement: a reduction's big operator, a call written as an argument of `__bigOperator`, takes the reduction's expected type where the instance at its bound does not fit; `s: ZZ32 = BIG LAST[j <- lo#n] (3 j)` with the bound `Number` was refused and now runs (`ProjectFortress/compiler_tests/InferBigOperatorExpectedType.fss:30`; section 5). Reversible.
- Not reached: no compiled test's verdict changed but the two the brief names; no ladder file moved; no count or distance site moved; no retried argument displaced a declaration that accepted the call (`over3(mk())` keeps its `Any` arm, `InferCallArgumentKeepsFit.fss:17`, and the retry runs only when no attempt is kept, `Functionals.scala:739-742`); no checker file but `Functionals.scala` was edited.

## 9. Decisions

1. The probe's wide patch applied as is (`git apply`, three hunks at offset 13). Not taken: the narrow trigger (P-51 is wide); typing arguments under each parameter type before the attempts (against P-49's order); a joint solver over nested calls (another file, no decision); the library writing static arguments (Appendix I, "The contexts that give a call an expected type", Rationale). Evidence: P-51, P-49, the probe's sections 2, 3 and 6.
2. Forks 2, 4 and 5 built as the patch has them, as the brief directs. Not taken: fixing the outer parameters from each retried argument's own first type (fork 2's third way); an ambiguity message by `signalAmbiguity` (fork 4); a syntactic check that skips arguments that write their static arguments (fork 5). Evidence: the brief's "The answers this rung follows"; `XXXInferCallArgumentControls`.
3. The promoted tests named by topic: `InferCallArgumentContext`, beside `InferLooseJuxtContext`, `InferTightJuxtContext` and `InferRepeatedOperatorContext`; `InferLoneUnionClosedTrait` keeps its topic, the lone parameter fixed by a closed trait's objects. Not taken: `InferContextDrops`, which names the defect.
4. Each instance read at run time by a `typecase` on the box, pinned by `run_out_equals`. Not taken: a constant string from the chosen declaration, as row 535's test had (it shows the declaration, not the instance); the compiler library's `assert`, which compares only `ZZ32`, `String` and `Character` (`Library/CompilerLibrary.fsi:45-47`).
5. The probe's shapes in four tests by topic, and a guard of its own (`InferCallArgumentKeepsFit` passes on the base, so it cannot share a program that the base refuses). Not taken: one program, whose one refusal would hide which shapes fail.
6. The controls as one `XXX` compile test, the folder's form of a right refusal (`XXXInferNarrowing`, `XXXInferAmbiguousCoercion`), pinned by the count and by one `compile_err_WImatches` over the four locations and messages (`FileTests.java:181-187`). Not taken: four tests, one per control; the count alone.
7. Row 425's half that the retry repairs gets a plain test, `InferBigOperatorExpectedType`, with its failing run on the old code. Not taken: leaving it unmeasured; editing the three boxes that describe it (section 7), which are outside this rung's passages and are the gather's.
8. Walk's departure gets a new row, 705, and an expected failure, `XXXInferCallArgumentWalk`. Not taken: a note on row 510 alone, whose claim is a typed binding, another site of walk (its notes name `LHSEvaluator` and `BuildEnvironments`).
9. The text: the context added to the list in one clause, with the condition "not accepted" (section 4, item 1), and a paragraph after the instance's rule for the choice among declarations, with boxes; the existing `revival-expected-contexts` boxes extended, as the `label` revision extended them. Not taken: the probe's one clause holding the choice too (its section 5), which the list's sentence cannot carry; a new Appendix I entry (the brief amends the existing one).
10. The decision's date written as 9 October 2026, from `4dc35f685`. Not taken: P-51's numbering date, 13 October, the record's and not the decision's.
11. The full reasoning in this report, which the entry cites, as its earlier revisions cite their reports; no `decision-record.md`, which the rung's section does not ask for.

## 10. Defects and their homes

- Row 455's argument faces: home 1, repaired; `InferCallArgumentContext` (and the shapes' tests). The row can close by `778ab8db1` with that test.
- Row 535's pinned refusal: home 1, repaired; `InferLoneUnionClosedTrait` (the row is already FIXED; a note).
- Row 425, a plain-bounded big operator under an expected type: home 1, repaired; `InferBigOperatorExpectedType`. Its other half, the element type from the clauses and the F-bounded big operator, stands (a note).
- Walk gives a call written as another call's argument no expected type: home 2, the chapter now settles it; `ProjectFortress/tests/XXXInferCallArgumentWalk.fss`, and the new row 705 (record.md).

## 11. Commands worked out

- The probe's patch out of its note: `awk '/^### The patch \(wide\), against fe74fb738/{f=1} f&&/^```diff/{p=1;next} p&&/^```/{exit} p{print}' explorations/reviews/argument-context-probe.md > tmp/rung-argument-context/wide.patch`, then `git apply --check -v` and `git apply`.
- The ladder subset's list: `awk -F'\t' 'NR>1 && $4=="typecheck"' explorations/compile-ladder/baseline-2026-09-19/ladder.tsv | awk -F'\t' '$11 ~ /Could not check call|Could not check method invocation|has type|Could not assign an expression of type/ {print $1"\t"$2}'`.
- The per-site comparison: a `collections.Counter` over (location, message) of the run's `errors.tsv` and of `explorations/compile-ladder/gate/distance-sites.tsv`, and `diff` of their sorted kind and location columns: no difference.

## 12. Machine

nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2,100 MHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1` in the shell (the harness and the suites force 4). Other rungs' agents shared the machine; the loads at each run's start are in its first line. No timing here is a comparison.
