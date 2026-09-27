# Rung R: an unknown size in an overload set (`rung-unknown-size-arm`)

- problem: an overload set whose most specific arm has a size nothing at the call fixes compiles, and the compiled run reaches that arm with the size unbound (`SkDeadTop` prints 1, `SkDeadVal` dies), row 400: explorations/compile-ladder/rung-nat-checker/probes/skeptic/dead-arms.txt:44-95
- spec: the sized arm is applicable, its static parameters inferred only where they occur in the parameter type, and it is the most specific, so it is the arm the rules pick (Specification/basic/overloading.tex:170-175, :262-295); a size is a value a body reads (Specification/basic/trait-parameters.tex:82-86); the chapter assumes every static variable of a call instantiated or inferred and says nothing of one that is not (Specification/basic/overloading.tex:137-138); a variable bound to an overloaded function dispatches the same way (Specification/basic/functions.tex:38-40, :209-216); Pavol's answer 12 settles the unknown size, the call is refused: explorations/coordinator/POSITIONS.md:162
- precedent: the in-file shape of a refused call, `errors.signal(errorFactory.makeApplicationError(...)); return None`, at ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:454-457, with rung N's no-context error reused with its text unchanged: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:249-259
- deviation: the refusal is placed where the arm is discarded, in `checkApplication` (Functionals.scala:464-473), not in `STypesUtil.isDynamicallyApplicable` as the batch record's evidence names, because that function only ever sees arms already statically applicable (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1156-1160); the would-be candidate is built only when a size is among the unknown static arguments (Functionals.scala:251), since for a type parameter the solver binds `BottomType` instead of leaving it unknown; `NoContextError` gains one optional field in a file outside `scala_src/`: ProjectFortress/src/com/sun/fortress/exceptions/ApplicationError.scala:156-164
- historical: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala (lines 249-259, 464-473) and ProjectFortress/src/com/sun/fortress/exceptions/ApplicationError.scala (lines 110-119, 156-164), both of the original 2012 tree, to be flagged at commit time: explorations/protocol.md:126-127

## Summary

The compiled checker now refuses a call when the arm the overloading rules would pick has a size the call cannot fix. It uses rung N's message, "Could not infer static argument nat n without context", which is answer 12. That closes row 400's compiled half except where the unknown size occurs in the arm's own parameter type (section 5). The refusal sits in `Functionals.checkApplication`, the one place where a failed arm of an overload set was discarded. It reaches a function call, a call through a function value, a method invocation and an operator. It is gated by three expected-failure compile tests (`XXXNatUnknownSizeArm`, `XXXNatUnknownSizeVal`, `XXXNatUnknownSizeFnValue`), and a guard test (`NatKnownSizeArm`) keeps the shapes that must still compile. The expected-failure walk tests that rows 416 and 418 owed are written. The checker count is 125, unchanged (measured on the base; on the landed tree it is 62, also unchanged, `explorations/compile-ladder/climb-batch-6/followup-R/gate/checker-count.txt`). No compiled test and no ladder file moved except the rung's own tests.

What the refusal leaves alone, as re-measured in the repair round (section 15) and by the second skeptic:

- **An arm whose unknown size occurs in its own parameter type, row 400.** The refusal needs the arm's inferred parameter type to be free of the unknown size, so such an arm is dropped as before: `ea[\nat n\](f: Box[\n\] -> ZZ32)` beside `ea(f: Any)`, called with a function of type `Any -> ZZ32`, gives walk 1 and compiled 2 before and after the edit (the second skeptic's `Sk2ArrowDomain`; section 5, D8). Row 400 stays open for this shape.
- **The dynamic form, row 446.** A call whose argument's static type is `Any` is not refused. At run time both paths send a `ZZ32` value to the sized arm, and where that arm reads its size the compiled run dies with a Java `NumberFormatException: For input string: "n"`.
- **A type parameter that occurs only in the return type, row 447.** It is bound to `BottomType`, not left unknown, and the compiled run dies loading the instantiation. No overload is needed for this.
- **An overloaded function bound to a variable, row 448.** It crashes the code generator whether or not an arm is sized. The refusal pre-empts that crash for the shape it refuses; it does not repair it. `XXXOverloadedFnValue` pins it as an expected failure.
- **A numeral argument.** It takes the `Any` arm compiled and the sized arm under walk. The specification favours the compiled run, and that conflicts with row 79's scoring of the same mechanism. It is recorded as a note on row 79.

## 1. What this rung is, and what it inherited

The answers this rung follows: section 1's question (Q1, the team test lines under the flat tower) does not change this rung. The decision it builds is answer 12 (`explorations/coordinator/POSITIONS.md:162`): "A size the call cannot fix is an error at that call. It reaches into overload sets: when the arm the rules would pick has a size the call cannot fix, the call is refused with the same 'could not infer' error instead of the arm being dropped, which closes row 400." The reasoning is `explorations/reviews/overloading-judgement.md` section 5.

The branch `wip/rung-unknown-size-arm` was fresh at the first launch: `git log e5414f5bf..HEAD` was empty, the worktree clean and `tmp/` absent, so nothing was inherited. The repair round inherited the first pass's six milestones (`60b451f65` to `5399af552`), the skeptic's two (`de23d6127`, `62b89de19`) and the judge's (`bff9ccb35`). It re-verified them as follows:

- The build is the rung's checker: `XXXNatUnknownSizeArm` gave " Saw expected failure" before anything else ran.
- The rung's three first-pass compiler tests pass again (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt:46-80`).
- The skeptic's untouched-checker shadow, `tmp/sk-base/classes`, still reproduces the untouched behaviour: the function-value crash and `SkDynZZ32`'s 1, 2 (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:2-18`, `:63-69`).

The harness refused this agent's write of `REPORT.md` in both rounds, so the file is not on the branch; this text is carried in the structured result for the gather. It is the first pass's report, corrected by the repair round.

Machine for every timing and capture of the first pass: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, cpu MHz 2100.000, load 2.70 3.35 3.26 when the rung started (it rose to 8 to 10 while the other rung of the pair ran), openjdk 25.0.4, `FORTRESS_THREADS=1` (`explorations/compile-ladder/rung-unknown-size-arm/probes/machine.txt`). Baseline `ant compileAll` took 46 s. The library-order cache rebuild took 95 s (AnyType 15, CompilerBuiltin 55, CompilerLibrary 22, CompilerAlgebra 1, CompilerSystem 2), and 134 s after the edit at load 8 to 10. The repair round ran on the same machine, load 7.35 6.66 6.12 at its first measurement, with the same JDK and `FORTRESS_THREADS=1`; each of its captures carries its own machine line at its head. The repair round changed no source file, so it ran no `ant compileAll` and no cache rebuild.

## 2. Where the fix belongs

The feature's row in `explorations/coordinator/map/spec-to-implementation.md:214` ("multiple dispatch, overload resolution") puts the static side in the checker and dispatch in `compiler/OverloadSet.java`. The row for `nat` and `int` parameters (`:233`) says the wall is the checker. Answer 12 is a checker rule at the call, so the fix is in the checker's resolution of a call. Nothing in code generation, the run time or walk changes.

Where the checker drops the arm, read and then measured:

- Every application the checker resolves goes through one method, `checkApplication` (`Functionals.scala:438-476`). The callers are the function call (`:705`), the method invocation (`:615`), the subscript (`:586`), the operator (`:772`), the single-argument form (`:423`) and a case clause's comparison (`:856`). The application of a function value (`f(z)`, the `S_RewriteFnApp` case at `:695`) is the function-call site `:704`, whose message kind is "function application" (`ApplicationError.scala:44-45`). `checkApplication` runs `checkApplicable` on each arm (`:449`). It keeps the arms that returned a candidate and the errors of the rest (`:450-451`), and reports the errors only when no arm is left (`:454-457`). So when one arm fails and another succeeds, the failure is discarded there. This is the one site at which a failed arm of an overload set disappears.
- A sized arm whose size nothing fixes fails in `checkApplicableWithInference` with rung N's no-context error (`Functionals.scala:249-259`, before this rung `:246-251`). Inference succeeds and the arguments check, but the size is still an inference variable among the static arguments (`hasSizeInferenceVars`, `STypesUtil.scala:809-813`).
- The batch record's evidence names `STypesUtil.isDynamicallyApplicable` (`STypesUtil.scala:1101-1132`), by reading. It is called only from `rewriteApplicand` (`:1159`), over `pruneMethodCandidates(candidates, sma)` (`:1156`), and `candidates` there are the survivors of `checkApplication` (`Functionals.scala:705`, `:716`). The sized arm of `SkDeadTop` never reaches it: it has already failed at `:249-259` and been discarded at `:450-451`. The condition at `:1125-1129` decides which of the statically applicable arms are recorded as reachable at run time; it cannot refuse a call on an arm it never sees. So the refusal goes where the discard is, in `checkApplication`, and the measurement agrees: with the refusal there, `SkDeadTop`'s and `SkDeadVal`'s shapes are refused (section 6).

The judgement's section 5.2 names `STypesUtil.scala:1125-1129` as the site, by reading; the reading above places it at `Functionals.scala:450-457`. This is the rung's deviation from the record's evidence, not from the decision, whose text is carried out as written.

## 3. Precedent search

Has the team already solved "an arm fails, another succeeds, and the failure must still be reported"? No: none of the checker's application sites above refuses a call while a candidate exists. These are the shapes found and used:

- **Refusing a call:** `errors.signal(errorFactory.makeApplicationError(overloadingErrors)); return None` (`Functionals.scala:454-457`). The new refusal is the same two lines over the arms it refuses, so the message has the checker's usual form, "Could not check call to function ee" (or "Could not check function application" for a call through a value), then one line per refused arm.
- **The no-context error:** rung N's `makeNoContextError` (`ApplicationError.scala:110-119`) and `NoContextError` (`:156-171`), their text unchanged, as answer 12 asks ("the same 'could not infer' error").
- **"More specific":** `moreSpecificCandidate` (`STypesUtil.scala:1068-1096`), which `checkApplication` already uses to sort (`Functionals.scala:461`). It prefers an arm applicable without coercion and otherwise compares domains with `CoercionOracle.moreSpecific`, which is strict, "no less specific and unequal" (`CoercionOracle.scala:71-73`). So an arm whose domain equals the chosen arm's is not "more specific". That case stays with the declaration check, which already refuses it (`UkEqual`, section 8).
- **The other drop site:** the other place the checker drops an arm with uninstantiated parameters is `isDynamicallyApplicable` (`STypesUtil.scala:1125-1129`), one site. It is untouched, for the reason in section 2.

Sites where a failed arm is silently discarded: one (`Functionals.scala:450-451`), reached by all six application sites. The edit covers all six through it. The differential shows the function, function-value, method and operator forms refused (section 8).

For the code generator's crash on an overloaded function value (row 448, repair round), the team marked the spot. The branch of `CodeGen.forFnRef` for a non-generic reference opens with "If it's an overloaded type, oy." (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3605`). The field that branch relies on is commented "paramCount communicates this information from call to function reference" (`:1517-1519`). The rung does not repair it (section 10).

## 4. The specification, and the decision

- **Applicability:** "A declaration f(P) is applicable to a call f(C) if the call is in the scope of the declaration and C <: P. If the parameter type P includes static parameters, they are inferred ... before checking the applicability of the declaration to the call" (`Specification/basic/overloading.tex:170-175`). For `ee[\nat n\](x: ZZ32)` and `z: ZZ32`, `P` is `ZZ32` and holds no static parameter, so the arm is applicable.
- **Resolution:** among the declarations applicable at run time, the call takes one that no other applicable declaration is more specific than. "More specific" means a strict subtype of the parameter types, with static parameters inferred before the comparison (`overloading.tex:262-295`). `ZZ32` is a strict subtype of `Any`, so the sized arm is the one the rules pick, and it is also what run-time dispatch did (`SkDeadTop` printed 1 compiled).
- **A function value:** "Single variables may be bound to functions including overloaded functions" (`Specification/basic/functions.tex:38-40`). A call through such a value "is 'dispatched' to the declaration associated with the most specific type of T applicable to A" (`:209-216`). So `f = ee; f(z)` means the sized arm too, and answer 12 reaches it.
- **A size is a value:** a `nat` parameter may "appear in any context that a variable of type ℕ32 can appear" (`Specification/basic/trait-parameters.tex:82-86`), so a body reads it (`SkDeadVal`'s `= n`).
- **The chapter's own assumption:** "We assume throughout this chapter that all static variables in functional calls have been instantiated or inferred" (`overloading.tex:137-138`). A call that leaves `n` unknown is outside it. The inference chapter is a placeholder (`Specification/basic/inference.tex:15`) that asks whether inference may produce `BottomType` for a static parameter (`:24-25`). The later Types chapter agrees that nothing at a call can supply such a parameter: a static parameter that does not appear in the quantified type's constituent type can be removed from it (`Documentation/Specification/Prose/Language/types.tick:764-767`).

The specification therefore settles which arm the call means and is silent on what an unknown size then does. Pavol's answer 12 decides it: the call is refused. The rung implements that decision for the arm the rules pick at the call's static argument type. When an applicable arm is more specific than every candidate and the call does not fix its size, the call is an error.

## 5. The edit

Two Scala files, 31 lines added and 5 removed (`git diff --numstat e5414f5bf -- ProjectFortress/src`: ApplicationError.scala 11 and 4, Functionals.scala 20 and 1). The repair round changed no source file.

- `ProjectFortress/src/com/sun/fortress/exceptions/ApplicationError.scala:110-119`, `:156-164`: `NoContextError` and its factory take one optional field, `unfixedSize: Option[AppCandidate] = None`. It holds the candidate the arm would have been had its size been known. The message is unchanged.
- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:249-259`: the error carries that candidate when three things hold: the no-context error is raised, a size is among the unknown static arguments, and the arm's inferred domain holds no inference variable. The candidate records the inferred arrow, the static arguments, the checked arguments, the overloading and the functional.
- `Functionals.scala:464-473`: after the candidates are sorted, the call is refused if any discarded arm carries such a candidate and is more specific than every candidate (`moreSpecificCandidate`). The refusal lists the errors of those arms, and `checkApplication` returns `None`, as it does when no arm applies.

The candidate is built only when a size is among the unknown static arguments (the condition `hasSizeInferenceVars(sargs)` at `:251`), because answer 12 is about sizes. For a type parameter that nothing at the call fixes, the solver binds `BottomType` rather than leaving an inference variable (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:524`, `STypesUtil.scala:1937-1940`). So such an arm is a candidate, not a no-context error. See decision D3 in section 9, and row 447 in section 10.

The third condition, that the arm's inferred domain hold no inference variable (`!hasInferenceVars(resultArrow.getDomain)` at `:251`), has a cost the first pass did not measure. An arm whose unknown size occurs in its own parameter type, in a position the argument does not constrain, carries no candidate; the filter at `:466-469` never sees it, and it is dropped as before. The second skeptic measured it (`explorations/compile-ladder/rung-unknown-size-arm/SKEPTIC.md`, second judgement, sections D and N): with `ea[\nat n\](f: Box[\n\] -> ZZ32): ZZ32 = 1` beside `ea(f: Any): ZZ32 = 2`, `ea(fn (b: Any): ZZ32 => 3)` gives walk 1 and compiled 2 before and after the edit (`Sk2ArrowDomain`), although the sized arm is applicable, since an arrow type is contravariant in its parameter type (`Specification/basic/types-vals-vars.tex:411-421`), and the most specific; alone it is refused with rung N's message (`Sk2ArrowDomainSingle`). With the body `= n` walk dies with "undefined variable [n]" and the compiled run prints 2 (`Sk2ArrowDomainVal`). The captures are `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-diff.txt:3-16` and `:159-198`. See D8 in section 9, and row 400 in section 10.

## 6. The tests, the recorded failure and the recorded pass

Written first, before the edit (commit `60b451f65`):

- `ProjectFortress/compiler_tests/XXXNatUnknownSizeArm.fss` and `.test`: `SkDeadTop`'s shape; `compile`, `compile_err_contains=Could not infer static argument nat n without context.`
- `ProjectFortress/compiler_tests/XXXNatUnknownSizeVal.fss` and `.test`: `SkDeadVal`'s shape, where the sized body reads `n`; the same check line.
- `ProjectFortress/compiler_tests/NatKnownSizeArm.fss` and `.test` (compile, link, run, `run_out_contains=PASS`): the shapes that must still compile and run, each an assertion. They are a sized arm that is not the one the rules pick (`dd[\nat n\](x: Any)` beside `dd(x: ZZ32)`, where `dd(z)` is 2), a written size (`ev[\5\](z)` is 5), a sized arm that is not applicable (`ev("s")` and `eb("s")` are 2), and a size fixed by the argument's type (`eb(Box[\7\](0))` is 7). A third compiler test is decision D4.
- `ProjectFortress/tests/XXXNatSizeExclusionWalk.fss` (row 416, home 2): `g(b: Tg[\3\])` beside `g(b: Tg[\4\])` is a valid overloading that dispatches on the size. The file asserts 3 and 4, and the message cites `Specification/basic/types-vals-vars.tex:218-237`. By instantiation exclusion `Tg[\3\]` and `Tg[\4\]` exclude each other, and without coercion incompatibility is exclusion (`Specification/advanced/overloading.tex:182`), so the pair meets the overloading rules.
- `ProjectFortress/tests/XXXNatBigSizeWalk.fss` (row 418, home 2): `size64(Box[\4294967295\](0))` reads back 4294967295 and `size64(Box[\3000000000\](0))` reads back 3000000000, as `ZZ64`; each value is printed and then asserted equal, each message citing `trait-parameters.tex:84-85`. As the rung wrote it, the first size was 4294967296 and its message also cited `Specification/basic/expressions/constant.tex:96`; it was restated at the landing, for the reason in section 7, and the captures below that name 4294967296 are of the file as the rung wrote it.
  - After the pre-edit capture this file was respelled from `assert(x, y, message)` to `assert(x = y, message)`, with the value printed first. The three-argument form over `ZZ64` is in the interpreter's library (`Library/FortressLibrary.fsi:234`) and not in the compiler's (`Library/CompilerLibrary.fsi:35-49`), so the compile path refused the file (`explorations/compile-ladder/rung-unknown-size-arm/probes/walkxxx-compiled-first-spelling.txt`). Both libraries declare the Boolean form (`FortressLibrary.fsi:230`, `CompilerLibrary.fsi:36`).
  - The file now compiles and passes on the compile path, which is the specification's answer (`explorations/compile-ladder/rung-unknown-size-arm/probes/walkxxx-paths.txt`).

Written in the repair round (commit `29aeb8e44`):

- `ProjectFortress/compiler_tests/XXXNatUnknownSizeFnValue.fss` and `.test`: `SkFnValue`'s shape, `f = ee; f(z)` for `SkDeadTop`'s pair; `compile`, `compile_err_WIcontains=Could not check function application - Could not infer static argument nat n without context.` The key is whitespace-insensitive containment (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:155-163`), and it pins the site as well as answer 12's message. It is a new file, not a line in `XXXNatUnknownSizeArm.fss`, because that file's recorded failure is on its committed content.
- `ProjectFortress/compiler_tests/XXXOverloadedFnValue.fss` and `.test` (home 2, row 448): `f = hh` for `hh(x: ZZ32): ZZ32 = 1` beside `hh(x: Any): ZZ32 = 2`. It asserts the specification's answers, `f(z)` is 1 and `f("s")` is 2, each message citing `functions.tex:38-40, :209-216`. The `.test` reads `compile`, `compile_exception_contains=IndexOutOfBoundsException`, the form of `compiler_tests/XXXNatBoundDisp.test`. Decision D7 gives the shape and the pin.

**Recorded failure** (`explorations/compile-ladder/rung-unknown-size-arm/probes/pre-edit-tests.txt`, the untouched checker):

- `XXXNatUnknownSizeArm`: " Saw failure, but did not satisfy compile_err_contains; expected" / "Could not infer static argument nat n without context." / `Tests run: 1,  Failures: 1` (`AssertionFailedError: Saw wrong failure. compile`).
  - The program compiled (exit 0, `explorations/compile-ladder/rung-unknown-size-arm/probes/diff-before.txt:2-3`). The check line was not met, and the harness counts that as a failure of the expected-failure test.
  - The record expected the words "missing expected failure". For an `XXX` test with a check key, the harness prints this line instead, whether or not the command failed (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:384-402`): a missed key is `trueFailure`, reported as "Saw wrong failure".
  - Either way the test is red on the untouched tree. This is the rung's showing of its first `XXX` file red.
- `XXXNatUnknownSizeVal`: the same.
- `NatKnownSizeArm`: `OK (3 tests)`, PASS. It guards what must not change.
- The two walk files through `SystemJUTest -Dtests=<a scratch copy>`: both give `OK Saw expected exception`.
  - `XXXNatSizeExclusionWalk` fails with row 416's message, "first parameters b:[Tg[\4\]] and b:[Tg[\3\]] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present".
  - `XXXNatBigSizeWalk`, in its first spelling, fails with row 418's silent form, "FAIL: a Int: 0 =/= a Long: 4294967296". Respelled, it prints 0 and fails at the first assertion, "FAIL: row 418; ...". `explorations/compile-ladder/rung-unknown-size-arm/probes/post-edit-tests.txt` records this; walk is untouched by the edit, so that capture stands before and after it.
  - Restated at the landing (section 7), it fails at the size itself, loudly, "Negative nats are unNATural: -1", and the harness reads that as the expected failure, " OK Saw expected exception" (`explorations/compile-ladder/climb-batch-6/followup-R/row418-test.txt`).
- `XXXNatUnknownSizeFnValue` (repair round), under the untouched checker, is red through the harness: " Did not satisfy compile_err_WIcontains; expected" / "Could not check function application - Could not infer static argument nat n without context." / `java.lang.IndexOutOfBoundsException: Index 0 out of bounds for length 0` / `Tests run: 1,  Failures: 1` (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt:2-15`).
  - The run puts the skeptic's shadow, `tmp/sk-base/classes`, first on the classpath. The compile runs in-process (`FileTests.java:689-691`), so the harness checks the untouched checker.
  - The compile threw, which lacks the pinned text, and an `XXX` test whose exception misses its key fails (`FileTests.java:341-349`). The same compile without the harness is `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:67-69`.

The walk files' harness path was shown red (`explorations/compile-ladder/rung-unknown-size-arm/probes/walk-xxx-red.txt`). A scratch copy of `XXXNatBigSizeWalk.fss`, with the size 7 in place of both large sizes, which walk reads correctly, was run through `SystemJUTest`: "PASS", " Missing expected failure ", `Tests run: 1,  Failures: 1`. No walk file was edited; the copy lives under `tmp/`. The restated file was shown red the same way at the landing (`explorations/compile-ladder/climb-batch-6/followup-R/row418-test.txt`).

**Recorded pass** (`explorations/compile-ladder/rung-unknown-size-arm/probes/post-edit-tests.txt`, the edit, after `ant compileAll` and the library-order rebuild; re-run in the repair round, `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt:25-80`):

- `XXXNatUnknownSizeArm`: " Saw expected failure", `OK (1 test)`, with the refusal:

      ProjectFortress/compiler_tests/XXXNatUnknownSizeArm.fss:10:13-16:
          Could not check call to function ee
          - Could not infer static argument nat n without context.
      File XXXNatUnknownSizeArm.fss has 1 error.

- `XXXNatUnknownSizeVal`: " Saw expected failure", `OK (1 test)`:

      ProjectFortress/compiler_tests/XXXNatUnknownSizeVal.fss:10:13-16:
          Could not check call to function ev
          - Could not infer static argument nat n without context.
      File XXXNatUnknownSizeVal.fss has 1 error.

- `XXXNatUnknownSizeFnValue` (repair round): " Saw expected failure", `OK (1 test)`:

      ProjectFortress/compiler_tests/XXXNatUnknownSizeFnValue.fss:11:13-15:
          Could not check function application
          - Could not infer static argument nat n without context.
      File XXXNatUnknownSizeFnValue.fss has 1 error.

- `NatKnownSizeArm`: `OK (3 tests)`, PASS.
- The two walk files: `OK Saw expected exception` for both (walk is untouched), `XXXNatBigSizeWalk` in its respelled form.

**The home-2 test of row 448** (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt`):

- `XXXOverloadedFnValue` gives `java.lang.IndexOutOfBoundsException: Index 0 out of bounds for length 0`, " OK Saw expected exception", `OK (1 test)`. This holds under the untouched checker (`:16-24`) and under the rung's (`:37-45`), so the defect does not depend on the edit.
- The harness prints "OK Saw expected exception" and not "Saw expected failure", because the compile throws (`FileTests.java:341-361`).
- It is not shown red on a fix, because no fix is known; row 420's test is the precedent. Its harness path is shown red on a scratch copy whose `hh` has only the `Any` arm, so that nothing is overloaded (`tmp/fnvalue-red/`, printed at `:81-97`). That copy compiles cleanly, and the harness reports " Saw failure, but did not satisfy compile_exception_contains; expected" / "IndexOutOfBoundsException" / `Tests run: 1,  Failures: 1` (`:98-110`).

The refusals, with the method, operator, return-type and two-arm forms, are extracted in `explorations/compile-ladder/rung-unknown-size-arm/probes/refusals.txt`; the function-value form is at `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:70-75`.

## 7. Derivation for row 418's test

`trait-parameters.tex:84-85` says a `nat` parameter may appear "in any context that a variable of type ℕ32 can appear". 4294967295 and 3000000000 are ℕ32 values, and a `ZZ64` result is such a context, so that passage settles both assertions. Walk fails both loudly, because it reads the size as a signed 32-bit integer: 4294967295 as -1, "Negative nats are unNATural: -1" (row 418). The test goes red only when both read back, which is row 418 closed.

As the rung wrote it, the first size was 4294967296, which is 2^32 and not an ℕ32 value. The rung derived that it reads back from `Specification/basic/expressions/constant.tex:96` ("A nat parameter denotes a value that has type NaturalStatic") beside the passage, and walk read it as 0 with no error, the silent form. On 2026-09-27 Pavol decided that a `nat` parameter is an ℕ32 value, as `trait-parameters.tex:82-90` says, and that a larger one is refused (`explorations/coordinator/POSITIONS.md`, 2026-09-27, a size's range). So at the landing the first size became 4294967295, the largest ℕ32 value, and the `constant.tex` citation was dropped. The compiled run of the restated file prints 4294967295, 3000000000 and PASS, and walk fails at the size (`explorations/compile-ladder/climb-batch-6/followup-R/row418-test.txt`). What a size beyond ℕ32 does on either path is the repair batch's item, not this test's (`explorations/coordinator/PLAN.md`, phase 2b).

## 8. Measurements

**The checker count** (`explorations/coordinator/tools/checker-count/run.sh`, private caches): before is `explorations/compile-ladder/rung-unknown-size-arm/probes/checker-count-before.txt`, after is `explorations/compile-ladder/rung-unknown-size-arm/probes/checker-count-after.txt`.

- Both read `#total 125`, `#locations 71`, `#crash none`, `#shadow matches the tracked StaticChecker`. Per api: FortressBuiltin 18, FortressLibrary 110, NativeArray 44, RangeInternals 78, all others 0.
- The two tables are byte-identical, and so are the two full checker outputs, 462 lines each, with no "Could not infer" line in either (`explorations/compile-ladder/rung-unknown-size-arm/probes/checker-count-compare.txt`).
- The measured total is 125, as predicted, and the crash row did not move. The repair round changed no source file, so the count stands.

**The compiler tests nearest the edit** (`explorations/compile-ladder/rung-unknown-size-arm/probes/near-tests.sh`: every `compiler_tests/Nat*.test` and `XXXNat*.test`, 44 files, each in its own JVM):

- Before (`explorations/compile-ladder/rung-unknown-size-arm/probes/near-before.txt`): 42 OK, and this rung's two `XXX` tests red. After (`explorations/compile-ladder/rung-unknown-size-arm/probes/near-after.txt`): 44 OK.
- The only verdicts that changed are the rung's own two tests, red to green. The skeptic re-ran all 44 and got identical verdicts (`explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/near-rerun.txt`).
- Among the 44 are `NatInferredChecker`, `NatWrittenChecker`, `NatMethodChecker`, `NatExportChecker`, `NatDispArmChecker` and every `NatRt*` test.
- Also among them are the expected failures `XXXNatAmbigChecker`, `XXXNatArithChecker`, `XXXNatBoolChecker`, `XXXNatBoundDisp`, `XXXNatDispRTRChecker`, `XXXNatExcludeChecker`, `XXXNatExtendsTwice`, `XXXNatLitArgChecker`, `XXXNatMismatchChecker`, `XXXNatRetSizeChecker`, `XXXNatRtMethBoth` and `XXXNatRtTask`.
- A first before-run removed each test's caches before it ran. That also removed what a run-only `XXX` test's `Link` twin had built, and three such tests failed for that reason alone. The script was corrected to leave those caches, and the committed capture is the second run.
- The repair round's two new tests were measured on their own (section 6).

**The checker regressions rung N's skeptic re-ran**, after the edit only (`explorations/compile-ladder/rung-unknown-size-arm/probes/reg-after.txt`):

- `AfterTypeChecking`: `OK (97 tests)`. It runs the checker over the programs its `tests=` line names, among them the sized `Compiled1.ah`, `Compiled1.av` and `Compiled6.af`.
- `XXX1p` and `XXX5z`: "Saw expected failure".
- `Compiled12.invariantInference`: `OK (6 tests)`.
- Their before is the last landed gate, green.

**The ladder subset:**

- The driver is `explorations/compile-ladder/rung-unknown-size-arm/run-subset.sh`, this rung's copy of `repair-r1-atomic-static/run-subset.sh`. It sets env.sh's variables without env.sh's `rm`, uses the private root `tmp/ladder-arm`, and rebuilds the library into that root before each pass.
- The subset is 106 lines (`explorations/compile-ladder/rung-unknown-size-arm/subset.txt`): the 85 files of `explorations/compile-ladder/baseline-2026-09-19/pass-list.txt`, and the 21 files of the two corpora that declare a `nat` or `int` parameter and are not on that list.
- Before is `explorations/compile-ladder/rung-unknown-size-arm/probes/ladder/results-before.txt` and after is `explorations/compile-ladder/rung-unknown-size-arm/probes/ladder/results-after.txt`. They are compared file by file in `explorations/compile-ladder/rung-unknown-size-arm/probes/ladder/compare.txt`, by `explorations/compile-ladder/rung-unknown-size-arm/probes/ladder/compare.sh`.
- 88 of 106 files compile and run with exit 0 both before and after, all 85 of the pass list among them. No file moved in either phase.
- Every run's stdout is the same once the gate's own mask is applied. The mask covers the timing line of the three `nestedTransactions` programs (`explorations/coordinator/climb-batch-workflow.js:1117`, "Operation took <time>ms").
- The 18 files that stop at compile stop with the same exit before and after. 16 print the same compile output. Two (`objectCC_staticParams`, `tparams2`, the same checker crash both times) differ only in the line numbers of `Functionals.scala` stack frames, which the edit moves.

**The two walk tests on both paths** (`explorations/compile-ladder/rung-unknown-size-arm/probes/walkxxx-paths.txt`):

- Compiled, `XXXNatSizeExclusionWalk` prints PASS, and `XXXNatBigSizeWalk` as the rung wrote it prints 4294967296, 3000000000 and PASS; restated at the landing, it prints 4294967295, 3000000000 and PASS (`explorations/compile-ladder/climb-batch-6/followup-R/row418-test.txt`).
- Walked, the first is refused with row 416's message, and the second prints 0 and fails; restated, it fails at the size, "Negative nats are unNATural: -1".
- The compiled run gives the specification's answer in both, so the divergence is walk's, as rows 416 and 418 say.

**The differential, walk against the compiled run.**

- Sources: the first pass is `explorations/compile-ladder/rung-unknown-size-arm/probes/diff.sh`, before `explorations/compile-ladder/rung-unknown-size-arm/probes/diff-before.txt`, after `explorations/compile-ladder/rung-unknown-size-arm/probes/diff-after.txt`, programs in `explorations/compile-ladder/rung-unknown-size-arm/probes/diff/`. The repair round is `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt`, by the skeptic's `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.sh`, whose "before" is the untouched checker's shadow. Walk is the same before and after, since no walk file changed.
- Rows marked (skeptic) are the skeptic's programs in `probes/skeptic/`, first measured in `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.txt`. Those marked (repair) were written or re-run in the repair round.

| program | shape | compiled before | compiled after | walk |
|---|---|---|---|---|
| `XXXNatUnknownSizeArm` | `SkDeadTop`: `ee[\nat n\](x: ZZ32) = 1`, `ee(x: Any) = 2`; `ee(z)`, `ee("s")` | 1, 2 | refused | 1, 2 |
| `XXXNatUnknownSizeVal` | `SkDeadVal`: the sized body `= n` | `NumberFormatException: For input string: "n"` | refused | `undefined variable [n]` |
| `NatKnownSizeArm` | section 6 | PASS | PASS | PASS |
| `UkDeadArm` | `dd[\nat n\](x: Any)`, `dd(x: ZZ32)`; `dd(z)` | 2 | 2 | 2 |
| `UkCoerce` | `ec[\nat n\](x: ZZ64)`, `ec(x: ZZ32)`; `ec(z)` | 2 | 2 | 2 |
| `UkWritten` | `ev[\5\](z)`, `ev("s")` | 5, 2 | 5, 2 | 5, 2 |
| `UkMethod` | the pair as methods of an object; `O.m(z)`, `O.m("s")` | 1, 2 | refused ("method invocation O.m") | 1, 2 |
| `UkOp` | the pair as `opr OPLUS`; `z OPLUS z`, `"s" OPLUS z` | 1, 2 | refused ("call to operator OPLUS") | 1, 2 |
| `UkRange` | `er[\nat n\](x: ZZ32): Box[\n\]`, `er(x: Any): Any` | `NoClassDefFoundError: n$RTTIc` | refused | `other` |
| `UkTwoArms` | `et[\nat n\](x: ZZ32)`, `et[\nat m, nat p\](x: Number)`, `et(x: Any)` | 1 | refused, both sized arms named | 1 |
| `UkEqual` | `eq[\nat n\](x: ZZ32)`, `eq(x: ZZ32)` | refused at the declaration ("multiple declarations of eq with the same parameter type") | the same | refused ("the same types") |
| `UkDynAny` | `SkDeadTop`'s pair; `ee(a)` for `a: Any` holding the numeral 5, then "s" | 2, 2 | 2, 2 | 1, 2 |
| `UkDynAnyVal` | `SkDeadVal`'s pair; `ev(a)` for `a: Any` holding the numeral 5 | 2 | 2 | `undefined variable [n]` |
| `UkTypeRange` | `et[\T\](x: ZZ32): BoxT[\T\]`, `et(x: Any): Any`; `et(z)` | `NoClassDefFoundError: java/lang/Object$RTTIc` | the same | `other` |
| `SkDynZZ32` (skeptic, repair) | `SkDeadTop`'s pair; `ee(a)` for `a: Any = z`, `z: ZZ32`; then `ee(l)` for `l: Any = 5` | 1, 2 | 1, 2 | 1, 1 |
| `SkDynZZ32Val` (skeptic, repair) | `SkDeadVal`'s pair; `ev(a)` for `a: Any = z` | `NumberFormatException: For input string: "n"` | the same | `undefined variable [n]` |
| `SkTypeRangeSingle` (skeptic, repair) | `et[\T\](x: ZZ32): BoxT[\T\]` alone; `r: Any = et(z)` | `NoClassDefFoundError: java/lang/Object$RTTIc` | the same | `other` |
| `XXXNatUnknownSizeFnValue` (repair; the skeptic's `SkFnValue`) | `SkDeadTop`'s pair; `f = ee; f(z)` | compiler crash, `IndexOutOfBoundsException` | refused ("function application") | 1 |
| `UkFnDead` (repair) | `dd[\nat n\](x: Any) = 1`, `dd(x: ZZ32) = 2`; `f = dd; f(z)` | compiler crash, `IndexOutOfBoundsException` | the same | 2 |
| `UkFnPlain` (repair) | `hh(x: ZZ32) = 1`, `hh(x: Any) = 2`, no size; `f = hh; f(z)`, `f("s")` | compiler crash, `IndexOutOfBoundsException` | the same | 1, 2 |
| `UkFnSingle` (repair) | `inc(x: ZZ32) = x + 1` alone; `f = inc; f(z)` | 6 | 6 | 6 |
| `UkFnLambda` (repair) | `UkFnPlain`'s pair; `f = fn (x: Any): ZZ32 => hh(x)`; `f(z)`, `f("s")` | 1, 2 | 1, 2 | 1, 2 |

How the rows read, corrected in the repair round:

- **`UkDynAny` and `UkDynAnyVal`** put a numeral in the `Any` variable. The compile path carries a numeral as `IntLiteral` (row 79's mechanism), so at run time the `ZZ32` arm is not applicable to it, and the compiled 2 is the numeral split, not a dispatcher that skips the arm. With a `ZZ32` value in the variable (`SkDynZZ32`), both paths print 1: the compiled run does dispatch to the sized arm. Where that arm reads its size (`SkDynZZ32Val`), the compiled run dies with `NumberFormatException: For input string: "n"`. That is row 446, rewritten. The numeral split is a note on row 79.
- **`UkTypeRange`** is not a drop. The single arm alone (`SkTypeRangeSingle`) compiles and dies the same way, because the solver binds `T` to `BottomType` and the arm is a candidate (row 447, rewritten).
- **`XXXNatUnknownSizeFnValue`**: the edit turns a compiler crash into the refusal. But `UkFnDead`, whose sized arm is not the rules' pick, and `UkFnPlain`, which has no size at all, crash identically before and after the edit, while a single-arm function value compiles (`UkFnSingle`). So the crash belongs to code generation for an overloaded function value, and the refusal pre-empts it only for the shape it refuses (row 448, and section 15 on the judge's instruction 5).

The skeptic's three checks are in the table:

- Walk still runs `SkDeadTop` and prints 1 while the compiled checker refuses it.
- A set whose sized arm is not the one the rules pick still compiles and runs as before (`UkDeadArm`, `UkCoerce`, `NatKnownSizeArm`).
- A call that writes the size still compiles (`UkWritten`).

`UkTwoArms` names both sized arms because each is more specific than the one candidate; the rules pick the `ZZ32` arm. The skeptic's other programs (`SkMeet`, `SkNotMeet`, `SkIntParam`, `SkTypeAndSize`, `SkGenericCaller`, `SkJuxt`, `SkLiteralArg`, the `SkCtx*` programs, `SkSubscript`, `SkTypeRangeWhich`) and their readings are in `explorations/compile-ladder/rung-unknown-size-arm/SKEPTIC.md` section 9. The rung's refusal holds on every one of them: it refuses where the rules pick a sized arm with an unfixed size that does not occur in the arm's parameter type, and changes nothing elsewhere. The second skeptic's `Sk2ArrowDomain` is the shape whose size does occur there, and the refusal does not reach it (section 5, D8).

**The stack traces** (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.txt`, by `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.sh`, unfiltered). The first frame outside the JDK in each:

- **The `IndexOutOfBoundsException`** of the shadow's compile of `XXXNatUnknownSizeFnValue.fss` (`:2-45`), and of `UkFnDead` (`:46-89`) and `UkFnPlain` (`:90-133`) under the rung's checker: `com.sun.fortress.compiler.OverloadSet.join(OverloadSet.java:592)`. It is reached through `getRange` (`:724`), `getSignature` (`:624`), `CodeGen.resolveMethodAndSignature` (`CodeGen.java:1509`) and `CodeGen.forFnRef` (`CodeGen.java:3608`), inside `CodeGenerationPhase`. The three traces are identical.
- **The `NumberFormatException`** of `SkDynZZ32Val`'s run (`:136-171`): `com.sun.fortress.runtimeSystem.MethodInstantiater.visitMethodInsn(MethodInstantiater.java:227)`, in the cause. `MethodInstantiater` parses the instantiated size's text as a `BigInteger` and meets the parameter name `n`. It is reached from `InstantiatingClassloader.readAndExpandGenericThing` (`:406`) while `SkDynZZ32Val.ev`, the overload's dispatcher, loads the sized arm's instantiation for `run` (`SkDynZZ32Val.fss:10`).
- **The `NoClassDefFoundError`** of `SkTypeRangeSingle`'s run (`:174-203`): the static initializer of the generated class `\=AbstractArrow?com|sun|fortress|compiler|runtimeValues|FZZ32,SkTypeRangeSingle%BoxT?java|lang|Object??`. That class is the instantiated arrow type `ZZ32 -> BoxT[\Object\]`, with `BottomType` carried as `java/lang/Object`. `run` loads it for the call, and `et`'s body is not on the stack. Its cause's first frame outside the JDK is `com.sun.fortress.runtimeSystem.InstantiatingClassloader.loadClass(InstantiatingClassloader.java:202)`, which hands `java.lang.Object$RTTIc` to the system loader.

**Divergences between walk and the compiled run**, with the side the specification favours:

- **`SkDeadTop` and its function, method, operator, juxtaposition, `int` and two-arm forms:** walk 1, compiled refused. The specification and answer 12 favour the refusal. Walk's half is left by the decision (row 400).
- **`SkDynZZ32Val`:** walk `undefined variable [n]`, compiled `NumberFormatException`. Both paths reach the arm, and both fail loudly. The specification is silent on an unbound size (`overloading.tex:137-138`), so this is row 446, home 3.
- **`SkTypeRangeSingle` and `UkTypeRange`:** walk `other`, compiled `NoClassDefFoundError`. The specification is silent on a `BottomType` instance (`inference.tex:24-25`), so this is row 447, home 3.
- **`UkFnPlain` and `UkFnDead`:** walk gives the specification's 1, 2 and 2; compiled crashes the compiler. The specification favours walk (`functions.tex:38-40`, `:209-216`), so this is row 448, home 2.
- **`SkLiteralArg`, `UkDynAny`, `UkDynAnyVal` and `SkDynZZ32`'s second line:** walk 1, compiled 2. The specification's reading favours the compiled run (`literals.tex:132-141`, `conversions-coercions.tex:472-475`), against row 79's scoring. It gets a note on row 79 (the judge's decision).
- **Rows 416 and 418:** walk refuses, or reads 0; compiled gives the specification's answer. Home 2.

## 9. Decisions taken inside the rung

- **D1. The refusal is placed in `checkApplication`, not in `isDynamicallyApplicable`.**
  - Alternative: the record's site, `STypesUtil.scala:1125-1129`.
  - Not taken because that code never sees the arm (section 2). A refusal there would need the whole set re-examined against arms that are not statically applicable, which is a different rule (row 446, candidate (a)).
- **D2. `NoContextError` carries the would-be candidate, in `exceptions/ApplicationError.scala`, a file outside `scala_src/`.**
  - The record's list of files this rung may touch names the checker files under `scala_src/`. This file holds the checker's application errors and is written in Scala, and no rung of the batch owns it.
  - Alternative inside `scala_src/`: have `checkApplicableWithInference` return a candidate whose static arguments still hold an inference variable, and turn it back into a no-context error in `checkApplication` when it loses or stands alone.
  - Not taken because the message would then be rebuilt from the candidate's overloading, which is absent for an applicand that is not a named functional (`Functionals.scala:536-540`), and with the lifted static arguments prepended. The chosen form keeps rung N's error object and its message exactly as they were.
- **D3. The candidate is built for sizes only.**
  - It is built only when a size is among the unknown static arguments (`Functionals.scala:251`), because answer 12 is about sizes ("A size the call cannot fix").
  - For a type parameter the solver binds `BottomType` (`Formula.scala:524`, `STypesUtil.scala:1937-1940`), so no type-only arm was seen dropped. The measured type case, `SkTypeRangeSingle` and `UkTypeRange`, is an arm that is a candidate with `T` as `BottomType` (row 447). Whether any type-only arm ever reaches the no-context error is unmeasured.
  - Alternative: build the candidate for any unknown parameter. It would change nothing for the measured type shapes, which never raise the error; refusing them needs the no-context rule itself extended to types. That is row 447's first candidate, and a decision beyond answer 12.
  - The first pass's statement that type-only arms "keep today's drop" was wrong, and the repair round corrects it (section 15).
- **D4. Further compiler tests beside the record's two.**
  - The record predicts the compiler track rising by two. It rises by five: `XXXNatUnknownSizeArm`, `XXXNatUnknownSizeVal`, the guard `NatKnownSizeArm`, and in the repair round `XXXNatUnknownSizeFnValue` (the refusal at a call through a value, home 1) and `XXXOverloadedFnValue` (row 448, home 2).
  - Without the guard, nothing gated says that a sized arm the rules do not pick, or a written size, still compiles: the nearest tests all fix their sizes from the argument's type (`NatRtDisp`, `NatRtDispSize`, `NatDispArmChecker`).
  - Alternative: the two tests only, leaving those shapes to probes.
  - The gate is red on a count that falls, not on one that rises (`explorations/coordinator/climb-batch-workflow.js:1202`).
- **D5. "More specific than every candidate", not "more specific than the sorted head".** `sortWith` over a partial order leaves the head arbitrary when two candidates are unrelated. Requiring the unfixed arm to beat each candidate is the rule's own wording: a declaration that no other applicable declaration is more specific than (`overloading.tex:274-276`). The skeptic's `SkNotMeet` shows that an arm below one candidate but not below the most specific one still compiles.
- **D6. The dynamic form is not refused (row 446).**
  - A call whose argument's static type lies above the sized arm's domain (`a: Any`) still compiles.
  - It is not refused because answer 12 was reasoned on the static pick, and for the static type `Any` the rules pick `ee(x: Any)`, the only arm applicable to it (`overloading.tex:170-175`). A refusal here would also reach calls whose values never select the arm.
  - The compiled run does reach the arm for a `ZZ32` value (`SkDynZZ32` prints 1), and where the arm reads its size it dies with `NumberFormatException: For input string: "n"` (`SkDynZZ32Val`).
  - Alternative: refuse it too, as "a size the call cannot fix is an error at that call" could be read. Extending the refusal beyond the static pick is Pavol's to decide. The measurement and the three options are row 446's.
  - The first pass's ground, that the compiled dispatch never selects the arm, was a numeral misread and is corrected (section 15).
- **D7 (repair round). Row 448's home-2 test has `UkFnPlain`'s shape and is pinned on the exception's class name only.**
  - Shape: the crash does not depend on a size (`UkFnPlain` has none), so the test is named for what fails, an overloaded function value, and not for sizes.
  - Alternatives: `UkFnDead`'s sized shape, which would tie the row to sizes it does not need; or pinning the whole message, "Index 0 out of bounds for length 0".
  - Why not the message: that text is what `ArrayList.get` says on JDK 11 and later. JDK 8, which also builds and gates green (CLAUDE.md, "Build and run"), words it differently ("Index: 0, Size: 0"), so a message pin would turn the test red on JDK 8 with the defect unchanged.
  - The form, `compile` with `compile_exception_contains`, is the judge's and `XXXNatBoundDisp.test`'s. A program that compiled would miss the key and go red (shown, section 6).
- **D8 (the second skeptic's correction N, made at the landing). The would-be candidate is built only when the arm's inferred domain holds no inference variable.**
  - The condition is at `Functionals.scala:251`. Its consequence is section 5's last paragraph: an arm whose unknown size occurs in its own parameter type is dropped as before, and `Sk2ArrowDomain` gives walk 1 and compiled 2 before and after the edit.
  - The report gave no reason for the condition. By the second skeptic's reading, the candidate's domain is compared by `moreSpecificCandidate` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1068-1096`), and whether `CoercionOracle.moreSpecific` compares a domain that holds a size variable soundly is unmeasured.
  - Alternative: build the candidate with the size variable left in the domain. It needs that comparison measured first.
  - Not taken at the landing: the edit is right wherever it applies, and the second skeptic's approval asks that the record be narrowed, not the edit changed. Row 400 stays open for the shape, home 3.

Two further decisions are the judge's, executed here (`explorations/compile-ladder/rung-unknown-size-arm/JUDGE.md` section 4):

- The numeral split is recorded as a note on row 79 with no gated test. The rejected alternatives were an `XXX` walk test asserting 2, and a new row. This departs from the three homes, because the conflict is between the specification's reading and a standing ledger verdict, not a silent specification.
- The declared-type-context limit is a note on row 21, not a new row.

## 10. Every defect measured, and its home

- **Row 400, the compiled half:** repaired here, but for one shape (the sub-item below). Home 1: `XXXNatUnknownSizeArm`, `XXXNatUnknownSizeVal` and `XXXNatUnknownSizeFnValue`, gated, each pinned on the no-context message, the last also on the function-application site. They are expected-failure tests by construction: a compile that fails with that message is the behaviour the decision asks for. Walk's half (`SkDeadTop` prints 1, `SkDeadVal` "undefined variable [n]") is left by the decision until the library's 25 dead sizes are gone (`explorations/reviews/overloading-judgement.md` section 10, item 5).
  - The compiled half stays open for an arm whose unknown size occurs in its own parameter type (`Sk2ArrowDomain`, D8). Home 3: the specification is silent on an unknown size (`overloading.tex:137-138`), and answer 12 decides. The probes are `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2ArrowDomain.fss`, `Sk2ArrowDomainSingle.fss` and `Sk2ArrowDomainVal.fss`, and the captures `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/sk2-diff.txt:3-16`, `:159-198`.
- **The refusal at a call through a function value** (`SkFnValue`, the skeptic's measurement): home 1, `XXXNatUnknownSizeFnValue`, in place and passing (section 6). It is the rung's behaviour at the function-application site (`functions.tex:209-216` with answer 12). The compiler crash that shape used to raise is not repaired, only pre-empted: see row 448.
- **Row 416** (walk refuses `g(Tg[\3\])` beside `g(Tg[\4\])`): not repaired here, because a walk edit is a stop for this rung. Home 2, because the specification settles it: `ProjectFortress/tests/XXXNatSizeExclusionWalk.fss`, failing as expected.
- **Row 418** (walk reads a `nat` as a signed 32-bit integer): not repaired here. Home 2: `ProjectFortress/tests/XXXNatBigSizeWalk.fss`, failing as expected (section 7).
- **Row 446, the dynamic form of row 400:** a call whose argument's static type lies above the domain of a sized arm with an unfixed size compiles.
  - At run time both paths dispatch a `ZZ32` value to that arm: `SkDynZZ32` prints 1 on both.
  - Where the arm reads its size (`SkDynZZ32Val`), the compiled run dies with `NumberFormatException: For input string: "n"` at `MethodInstantiater.java:227`, a Java-level message naming no Fortress construct, and walk dies with `undefined variable [n]`.
  - Home 3, because the specification is silent. Run-time dispatch picks the sized arm (`overloading.tex:262-276`), but the chapter assumes the call's static variables inferred (`:137-138`), and answer 12 rules on the static pick.
  - Probes: `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/SkDynZZ32.fss` and `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/SkDynZZ32Val.fss`. Captures: `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.txt:238-280`, `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:2-42` and `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.txt:136-171`.
  - Candidates: (a) extend the call-site refusal; (b) refuse the dead size at its declaration (E3); (c) a Fortress run-time error at `MethodInstantiater.java:227`.
- **Row 447:** a type parameter that occurs only in the return type, with nothing at the call to fix it, is bound to `BottomType`, and the call compiles.
  - The compiled run dies with `NoClassDefFoundError: java/lang/Object$RTTIc` while `run` loads the instantiated arrow class `ZZ32 -> BoxT[\Object\]`, and walk prints `other`. No overload is needed (`SkTypeRangeSingle`); the overloaded `UkTypeRange` dies the same way.
  - Home 3: `BottomType` is not first-class (`types-vals-vars.tex:508-515`), and whether inference may produce it for a static parameter is the placeholder chapter's open question (`inference.tex:24-25`).
  - It contradicts the overloading judgement's premise that a dead type parameter "can never be observed" (`explorations/reviews/overloading-judgement.md:213`).
  - Probes: `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/SkTypeRangeSingle.fss` and `explorations/compile-ladder/rung-unknown-size-arm/probes/diff/UkTypeRange.fss`. Captures: `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/diff.txt:305-339`, `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:43-62` and `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.txt:174-203`.
- **Row 448 (repair round):** an overloaded function bound to a variable crashes the code generator with `IndexOutOfBoundsException` in `OverloadSet.join` (`OverloadSet.java:592`), sized or not, before and after the rung (`UkFnPlain`, `UkFnDead`).
  - Home 2, because the specification settles it (`functions.tex:38-40`, `:209-216`): `ProjectFortress/compiler_tests/XXXOverloadedFnValue`, " OK Saw expected exception" under both checkers.
  - It is not shown red on a fix, because no fix is known (row 420's precedent); its harness path is shown red on a scratch copy.
  - By reading, the value-position branch of `CodeGen.forFnRef` (`CodeGen.java:3603`) chooses a signature by `paramCount`. Only an application sets that field, and it is otherwise -1 (`:1517-1519`). `getRange` requires it to be positive (`OverloadSet.java:692`) and skips every arrow of another arity (`:708-714`).
  - Workaround, measured: bind a lambda (`UkFnLambda`).
- **The numeral split** (`SkLiteralArg`; `UkDynAny`, `UkDynAnyVal`; `SkDynZZ32`'s second line): walk 1, compiled 2.
  - The specification's reading favours the compiled run (`literals.tex:132-141`, `conversions-coercions.tex:472-475`), which conflicts with row 79's scoring of the same mechanism for `typecase`, a scoring with no specification citation.
  - The home is a note on row 79 with no gated test, by the judge's decision. That departs from the three homes because of the conflict, not a silence, and it goes to Pavol.
  - The note also records that the ways note's defect 4 (`explorations/reviews/overload-static-params-ways.md:272-274`) was measured with numerals (`explorations/reviews/overload-static-params-ways/probes/NatArmViaAny.fss:9`, `NatArmNoParam.fss:9`, `NatArmDispatcher.fss:11`) and is this split.
- **No declared-type context for a static argument** (`SkCtxFix`, `SkCtxSingle`, `SkCtxArg`, `SkCtxType`): both paths refuse. Home 3, since the inference chapter is a placeholder (`inference.tex:15`). The home is a note on row 21, by the judge's decision.

The three `nestedTransactions` timing lines and the two moved stack-frame line numbers of section 8 are not defects. The first is what the gate already masks; the second is the edit's own line shift.

## 11. Competing names

- The rung adds no Fortress declaration outside its seven test components.
- `grep -rln` for their names (`NatUnknownSize`, `NatKnownSizeArm`, `NatSizeExclusionWalk`, `NatBigSizeWalk`, `OverloadedFnValue`) searched `ProjectFortress/` (both corpora, every `*_tests/` directory among them, and `src/`) and `Library/`, in `.fss`, `.fsi`, `.test`, `.java` and `.scala` files. It finds only the rung's twelve new files.
- The repair round's probe names (`UkFnDead`, `UkFnPlain`, `UkFnSingle`, `UkFnLambda`) occur nowhere in those trees.
- The Scala names added are a field (`unfixedSize`) and a local (`unfixed`). `grep -rn` over `ProjectFortress/src/com/sun/fortress/` finds them only at the edit.
- `NoContextError` is constructed only by `makeNoContextError` (`ApplicationError.scala:119`) and matched only at the new site (`Functionals.scala:467`), in Scala or Java.

## 12. Stops

None met.

- `compiler/StaticChecker.java` is untouched: the checker count's `#shadow` row still reads "matches the tracked StaticChecker".
- No walk file and no file under `Library/`, `ProjectFortress/LibraryBuiltin/`, `interpreter/` or `Specification/` is touched.
- No library declaration is newly refused: the checker count and its full output are identical, and the compiler's own library rebuilt without error after the edit.
- No compiled test changed verdict other than the rung's own two. The repair round's two tests are new, and `XXXOverloadedFnValue` gives the same verdict under the untouched checker as under the rung's.
- No ladder file moved down (`explorations/compile-ladder/rung-unknown-size-arm/probes/ladder/compare.txt`).

Editing `exceptions/ApplicationError.scala`, outside the directory the record lists, is not among the stops; it is decision D2. The repair round added files only under `ProjectFortress/compiler_tests/` and this directory.

## 13. What comes back to Pavol

- **The refusals' messages:** "Could not check call to function ee / - Could not infer static argument nat n without context.", the same for `ev`, and "Could not check function application / - Could not infer static argument nat n without context." for a call through a function value. They are in section 6, `explorations/compile-ladder/rung-unknown-size-arm/probes/refusals.txt` and `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt:25-36`.
- **Nothing else moved:** no compiled test and no ladder file changed except the rung's own tests, red to green (`explorations/compile-ladder/rung-unknown-size-arm/probes/near-after.txt`, `explorations/compile-ladder/rung-unknown-size-arm/probes/ladder/compare.txt`).
- **Row 446, rewritten:** `ee(a)` for `a: Any` holding a `ZZ32` is not refused, which is D6 kept as a decision. Both paths run the sized arm, and where it reads its size the compiled run dies with a Java `NumberFormatException` "n". His choice among three: extend the call-site refusal; refuse the dead size at its declaration (E3); or raise a Fortress-level error at the arm (`MethodInstantiater.java:227`).
- **Row 447, rewritten:** a type parameter that occurs only in the return type is bound to `BottomType`, and the compiled run crashes loading the instantiation. This contradicts the overloading judgement's premise, "A dead type parameter becomes bottom and can never be observed" (`explorations/reviews/overloading-judgement.md:213`), which is part of why answer 12 treats sizes and types differently.
- **Row 448, new:** an overloaded function bound to a variable crashes the code generator (`OverloadSet.join`) whether or not it is sized. The refusal pre-empts the crash only for the refused shape. It is gated as an expected failure (`XXXOverloadedFnValue`), and the workaround is a lambda.
- **The numeral split, a decision taken under a conflict (the judge's):** `ee(5)` gives 1 under walk and 2 compiled. The specification's reading favours the compiled run, and row 79 scores the same mechanism the other way for `typecase`, citing no passage. It is recorded as a note on row 79 with no gated test, pending his reconciliation of a numeral's run-time type. This departs from the three-homes rule. The ways note's defect 4 is the same split.
- **A minor decision (the judge's):** the declared-type-context limit is a note on row 21, not a new row.
- **Row 400 stays open for one shape:** an arm whose unknown size occurs in its own parameter type, in a position the argument does not constrain, is dropped as before (`ea[\nat n\](f: Box[\n\] -> ZZ32)` beside `ea(f: Any)`: walk 1, compiled 2; D8). The fix is in the condition at `Functionals.scala:251`, and it waits on a measurement of `moreSpecificCandidate` over a domain that holds a size variable.
- **A correction to the batch record's evidence:** it placed the drop in `isDynamicallyApplicable`; the drop is in `checkApplication` (section 2, D1).

## 14. Files

- Changed: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:249-259`, `:464-473`; `ProjectFortress/src/com/sun/fortress/exceptions/ApplicationError.scala:110-119`, `:156-164`. The repair round changed no source file.
- New tests: `ProjectFortress/compiler_tests/XXXNatUnknownSizeArm.{fss,test}`, `ProjectFortress/compiler_tests/XXXNatUnknownSizeVal.{fss,test}`, `ProjectFortress/compiler_tests/NatKnownSizeArm.{fss,test}`, `ProjectFortress/compiler_tests/XXXNatUnknownSizeFnValue.{fss,test}` (repair round), `ProjectFortress/compiler_tests/XXXOverloadedFnValue.{fss,test}` (repair round), `ProjectFortress/tests/XXXNatSizeExclusionWalk.fss`, `ProjectFortress/tests/XXXNatBigSizeWalk.fss`.
- This directory: `record.md`, `run-subset.sh`, `subset.txt`, `SKEPTIC.md` and `JUDGE.md` (the review's), and `probes/` (scripts, probe programs, captures, all `.txt`). The repair round's captures are `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt`, `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.txt` and `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt`, by `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.sh` and `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.sh`. The new probes are in `probes/diff/`: `UkFnDead.fss`, `UkFnPlain.fss`, `UkFnSingle.fss`, `UkFnLambda.fss`.
- `REPORT.md`: the harness refused this agent's write of the file in both rounds. The text is carried in the structured result for the gather.

## 15. Repair round

The skeptic refused the first pass (`explorations/compile-ladder/rung-unknown-size-arm/SKEPTIC.md`), and the judge ruled repair (`explorations/compile-ladder/rung-unknown-size-arm/JUDGE.md`). The edit, its placement, D2, D4, D5, the recorded failure and pass, the checker count and the walk tests stood. The record's account of what the refusal leaves alone did not.

What changed:

1. **Row 446 rewritten.** The first pass measured the dynamic form with a numeral in the `Any` variable (`UkDynAny.fss:8`, `UkDynAnyVal.fss:8`) and read the compiled 2 as a dispatcher that never selects the sized arm. With a `ZZ32` value the compiled run prints 1 as walk does, and with the size read it dies with `NumberFormatException` "n" (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:2-42`). The row, D6's ground and the FACTS sentence now say so. `UkDynAny` and `UkDynAnyVal` moved to the row-79 note.
2. **Row 447 rewritten.** The first pass read the crash of `UkTypeRange` as an overload drop. `SkTypeRangeSingle`, the arm alone, crashes the same way (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:43-62`), because the solver binds `BottomType` (`Formula.scala:524`). "The type analog of row 400" is removed from the row, from row 400's note and from the handover line. D3 is restated.
3. **The refusal at a call through a function value is gated:** `XXXNatUnknownSizeFnValue`, red under the untouched checker through the harness and passing under the rung's (section 6).
4. **The judge's instruction 5 was measured, and it gave the second outcome.** `UkFnDead` and `UkFnPlain` still crash on the rung's checker with the same trace as the untouched run of `XXXNatUnknownSizeFnValue`, first frame `OverloadSet.join(OverloadSet.java:592)` (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.txt:2-133`). So the edit pre-empts the crash for the refused shape and does not repair it. "Pre-empted" is what the report and the FACTS text say. The crash has home 2, `XXXOverloadedFnValue`, and row 448.
5. **Notes appended:** on row 79 (the numeral split, with the conflict stated, and the ways note's numeral probes) and on row 21 (declared-type context).

Where this round departs from the judge's instructions, with the source that settles it:

- **The home-2 test prints " OK Saw expected exception", not " Saw expected failure" as instruction 5 has it.** The harness takes that branch whenever the compile throws and the `exception` key is met (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:341-361`). `XXXNatBoundDisp`, the form the judge named, prints the same line. The check is the same: a compile that no longer throws misses the key and goes red (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-tests.txt:98-110`).
- **Row 447's crash is not "when the body builds `BoxT[\BottomType\]`" (instruction 7).** It happens in the static initializer of the instantiated arrow class `ZZ32 -> BoxT[\Object\]`, which `run` loads for the call, before `et`'s body runs. `et` is not on the stack (`explorations/compile-ladder/rung-unknown-size-arm/probes/repair-stacks.txt:174-203`). The row says that.
- **Instruction 5 names `IndexOutOfBoundsException` as the pin, and the pin keeps that and nothing more** (D7): the message text differs between JDK 8 and later JDKs.
- **Beyond the instructions, the round added two probes and one capture.** `UkFnSingle` is the single-arm control that localises the crash to overloading. `UkFnLambda` measures the workaround. The harness run of `XXXNatUnknownSizeFnValue` under the untouched checker is a recorded failure through the harness, beside the shadow's bare compile in `explorations/compile-ladder/rung-unknown-size-arm/probes/repair-diff.txt:67-69`.
- **The row-79 note also records the ways note's numeral probes.** The ways note's defect 4 (`explorations/reviews/overload-static-params-ways.md:272-274`), which the first pass cited as an earlier measurement of row 446, was measured with numerals too (`explorations/reviews/overload-static-params-ways/probes/NatArmViaAny.fss:9`, `NatArmNoParam.fss:9`, `NatArmDispatcher.fss:11`). Row 446 no longer cites it.

*Row numbers and the landing: rung R landed as a follow-up to climb batch 6 (`d65892d34`). Its provisional rows 431, 432 and 433 are the ledger's rows 446, 447 and 448, and this file cites them so; the ledger's rows 431-433 are rung F's. The second skeptic's correction N, row 418's restated test and the chapter citation moved by rung T's commit were made at the landing (`explorations/compile-ladder/climb-batch-6/RECORD.md`, rung R, "Landed as a follow-up").*
