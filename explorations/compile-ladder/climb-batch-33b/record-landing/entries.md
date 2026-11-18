<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that c79985147..8c13a52ec added, changed or removed (the batch 33b, landed at ba3c7c876, and the landing's own steps to 8c13a52ec), written by evidence.py. -->

# The entries that the range changed

- The batch, c79985147..ba3c7c876: 22 entries: F-38, F-53, F-86, F-128, F-180, F-240, F-268, F-301, F-302, F-307, F-315, F-320, F-321, F-330, F-338, F-351, F-369, F-379, F-388, F-389, F-390, F-391
- After the landing, ba3c7c876..8c13a52ec: 0 entries
- Now over 600 characters: 19 of 22: F-53, F-86, F-128, F-180, F-240, F-301, F-302, F-307, F-315, F-320, F-321, F-330, F-351, F-369, F-379, F-388, F-389, F-390, F-391

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-38, changed

- Size: at the base 505 characters; at the landing 505 characters; now 505 characters.
- Section now: "The checker and the one library".

At the base:

- F-38 **The compiled dispatcher chooses an overload arm generic in a size by the value's size, and the arm reads its size.** Called with an argument typed `Any`, the dispatcher reads the size off the value's descriptor. The checker's return-type rule compares the arms' own sizes (row 410). The dispatcher skips a size parameter's bound (`compiler/OverloadSet.java:1501-1502`). Gated by `compiler_tests/NatRtDisp`, `NatRtDispSize` and `NatRtDispTrait`. Detail: `perf-probes/nat/size-probes.md` section 2.

Now:

- F-38 **The compiled dispatcher chooses an overload arm generic in a size by the value's size, and the arm reads its size.** Called with an argument typed `Any`, the dispatcher reads the size off the value's descriptor. The checker's return-type rule compares the arms' own sizes (row 410). The dispatcher skips a size parameter's bound (`compiler/OverloadSet.java:1561-1562`). Gated by `compiler_tests/NatRtDisp`, `NatRtDispSize` and `NatRtDispTrait`. Detail: `perf-probes/nat/size-probes.md` section 2.

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

## F-53, changed

- Size: at the base 1376 characters; at the landing 1377 characters; now 1377 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 33's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 33b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-18 06:40Z · rewritten · by climb batch 33b commit stage: the last landed gate is climb batch 33b's: compile-ladder/climb-batch-33b/gate/distance.txt lines #total 0, #crash none and its first line's 14 components, and checker-count.txt lines #total 0 and #crash none; the per-site list holds no site

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-86, changed

- Size: at the base 783 characters; at the landing 912 characters; now 912 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-86 **The compiled checker types a varargs parameter as the team's `ImmutableArray[\T, ZZ32\]`, and applies a varargs declaration by the specification's expansion rule.** The rule reads such a declaration as one declaration for each number of arguments that it can take (`Specification/basic/overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters"). Over the interpreter's library, a body uses the parameter as that array. The compiled library declares no `ImmutableArray`, so under it each use of such a parameter is refused (row 604). The code generator refuses varargs (row 624). Gated by `compiler_tests/Varargs*`, and the refusals by the `XXXVarargs*` tests of rows 604 and 624. Detail: `compile-ladder/rung-checker-defects/REPORT.md` section 4.

Now:

- F-86 **The compiled checker types a varargs parameter as the team's `ImmutableArray[\T, ZZ32\]`, and applies a varargs declaration by the specification's expansion rule.** The rule reads such a declaration as one declaration for each number of arguments that it can take (`Specification/basic/overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters"). Over the interpreter's library, a body uses the parameter as that array. The compiled library declares no `ImmutableArray`, so under it each use of such a parameter is refused (row 604). Against the compiler's library the code generator refuses varargs, naming the missing type; under the selection it compiles them (F-390). Gated by `compiler_tests/Varargs*`, and the refusals by the `XXXVarargs*` tests of row 604 and of the code generator against the prelude. Detail: `compile-ladder/rung-checker-defects/REPORT.md` section 4.

History blocks of the range:

- Written by the gather: 2026-11-18 05:36Z · rewritten · from `explorations/compile-ladder/rung-varargs/REPORT.md`, "The convention as built" · by climb batch 33b gather: row 624 fixed under the selection by rung G; the prelude still refuses varargs (cites [S2])

Report sections that the entry cites: [S3] `Specification/basic/overloading.tex`, "Applicability for Functionals with Varargs and Keyword Parameters".

## F-128, changed

- Size: at the base 873 characters; at the landing 1200 characters; now 1200 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-128 **Under `walk`, the interpreter converts by coercion at its three kinds of type check.** They are a parameter, a varargs parameter included; an overloaded call that no declaration fits without coercion, which walk then dispatches again; and a typed binding or assignment. Walk chooses the coercion by the run-time value (P-59). Not converted, as measured: a value other than a numeral at a declared return (row 387; a numeral converts there, F-341), a coercion with its own static parameter, unless it is a numeral coercion (row 513), and an overloaded function's tuple parameter or a tuple-typed field (row 395). Not converted, by the code, and not measured: a varargs or keyword element of the specification's tuple coercion, and its arrow coercion. Gated by `tests/Coercion*RungC.fss`. Detail: `compile-ladder/rung-interp-coercion/REPORT.md` sections 1, 5 and 9.

Now:

- F-128 **Under `walk`, the interpreter converts by coercion at its three kinds of type check.** They are a parameter, a varargs parameter included; an overloaded call that no declaration fits without coercion, which walk then dispatches again; and a typed binding or assignment. Walk chooses the coercion by the run-time value (P-59). Not converted, as measured: a value other than a numeral at a declared return (row 387; a numeral converts there, F-341), a coercion with its own static parameter, unless it is a numeral coercion (row 513), an overloaded function's tuple parameter or a tuple-typed field (row 395), and a function argument by the arrow coercion, where the call fails, 'Unification error: Closure/Constructor for callWide param 1 (f:ZZ32->ZZ64) got arg ...' (row 1083, `tests/XXXArrowCoercionFnArgument.fss`); the compiled path converts that one (`compiler_tests/ArrowCoercionFnExprCompiled.test`), but not to a function type of no parameters (row 1084). Not converted, by the code, and not measured: a varargs or keyword element of the specification's tuple coercion. Gated by `tests/Coercion*RungC.fss`. Detail: `compile-ladder/rung-interp-coercion/REPORT.md` sections 1, 5 and 9.

History blocks of the range:

- Written by the gather: 2026-11-18 05:34Z · rewritten · from `explorations/compile-ladder/rung-closure-name-once/SKEPTIC.md`, "3. My programs" · by climb batch 33b gather: rung W's skeptic measured the arrow coercion that the entry listed as not measured (cites [S4])

## F-180, changed

- Size: at the base 2337 characters; at the landing 2337 characters; now 2337 characters, over 600.
- Section now: "The territory map".

At the base:

- F-180 **`import java` is wired on walk through `ForeignComponentWrapper` and `ClosureMaker`, but four gaps stop it and no test uses it.** In a probe, six small Java patches closed the five gaps the tree then had, two of them for gap 4. A component with two declarations bound through `import java` then printed on walk what the compiled path prints. Gap 1, the type table, is closed on the tree: in walk's world the three-argument `NamingCzar.fortressTypeForForeignJavaType`, which walk's repository reaches for a written `import java` (`repository/GraphRepository.java:957`), reads a Java type as the one library's (`compiler/NamingCzar.java:365-368`; F-298), so a component with one such import now stops at gap 3, 'Non-top-level reference to imported …' (row 845). P-58 chose another way: a `builtinPrimitive("…")` body whose string names a static Java method in `nativeHelpers/`. Its compiled half is built, the rewrite of such a body into a call before the type checker (F-298); so is walk's half, a loader of such a method beside the glue classes (F-299). Two findings bear on any binding that both paths share. First, a helper raises a Fortress exception by naming a class of the compiled prelude, such as `fortress.CompilerBuiltin$IntegerOverflow`. Walk has no such class: its loader of a `builtinPrimitive` helper translates the raise into the library's exception (F-299), but through a written `import java` walk ends the run with a `FortressImplementationError`, unless the probe's patch for gap 5 (`gap5-helper-raise.patch`) translates the raise. Second, by reading, a helper whose parameters or results are compiled-path classes, such as `FZZ32Vector`, cannot take walk's values. The probe's closure converts only Java's numbers, booleans, strings and `BigInteger`, and the helper classes had 50 such parameters or results when read once with `javap`, before `nativeHelpers/simpleIntLiteralArith.java` was deleted; walk's loader refuses at load a binding whose declared type no Java type carries (F-299). Detail: `perf-probes/prelude/natives-shape.md` section 1 (the gaps and walk's half); `perf-probes/prelude/natives-binding-probe.md` section 1 (the compiled half; its section 2 measures the `import java` form, which P-58 did not take); `compile-ladder/rung-natives-compiled/SKEPTIC.md`, "My programs, old against new".

Now:

- F-180 **`import java` is wired on walk through `ForeignComponentWrapper` and `ClosureMaker`, but four gaps stop it and no test uses it.** In a probe, six small Java patches closed the five gaps the tree then had, two of them for gap 4. A component with two declarations bound through `import java` then printed on walk what the compiled path prints. Gap 1, the type table, is closed on the tree: in walk's world the three-argument `NamingCzar.fortressTypeForForeignJavaType`, which walk's repository reaches for a written `import java` (`repository/GraphRepository.java:957`), reads a Java type as the one library's (`compiler/NamingCzar.java:367-370`; F-298), so a component with one such import now stops at gap 3, 'Non-top-level reference to imported …' (row 845). P-58 chose another way: a `builtinPrimitive("…")` body whose string names a static Java method in `nativeHelpers/`. Its compiled half is built, the rewrite of such a body into a call before the type checker (F-298); so is walk's half, a loader of such a method beside the glue classes (F-299). Two findings bear on any binding that both paths share. First, a helper raises a Fortress exception by naming a class of the compiled prelude, such as `fortress.CompilerBuiltin$IntegerOverflow`. Walk has no such class: its loader of a `builtinPrimitive` helper translates the raise into the library's exception (F-299), but through a written `import java` walk ends the run with a `FortressImplementationError`, unless the probe's patch for gap 5 (`gap5-helper-raise.patch`) translates the raise. Second, by reading, a helper whose parameters or results are compiled-path classes, such as `FZZ32Vector`, cannot take walk's values. The probe's closure converts only Java's numbers, booleans, strings and `BigInteger`, and the helper classes had 50 such parameters or results when read once with `javap`, before `nativeHelpers/simpleIntLiteralArith.java` was deleted; walk's loader refuses at load a binding whose declared type no Java type carries (F-299). Detail: `perf-probes/prelude/natives-shape.md` section 1 (the gaps and walk's half); `perf-probes/prelude/natives-binding-probe.md` section 1 (the compiled half; its section 2 measures the `import java` form, which P-58 did not take); `compile-ladder/rung-natives-compiled/SKEPTIC.md`, "My programs, old against new".

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

Report sections that the entry cites: [S5] `compile-ladder/rung-natives-compiled/SKEPTIC.md`, "My programs, old against new".

## F-240, changed

- Size: at the base 2201 characters; at the landing 2202 characters; now 2202 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 80 s and its distance stage 137 s at the last landed gate, climb batch 33's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 87 s), over fourteen components, ran at a start load of 0.50, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 150 s (96 s) at 0.31 at climb batch 31b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-33/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 65 s and its distance stage 117 s at the last landed gate, climb batch 33b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 75 s), over fourteen components, ran at a start load of 0.08, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 137 s (87 s) at 0.50 at climb batch 33's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-33b/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-18 06:40Z · rewritten · by climb batch 33b commit stage: count stage about 65 s, from the file times of the gate's log (checker-count/run.txt minus javac.txt, 63 s); distance stage from compile-ladder/climb-batch-33b/gate/distance.txt lines #seconds 117 FortressLibrary 75, #machine load at start 0.08 and its first line's 14 components; compared against climb batch 33's 137 s (87 s) at 0.50

## F-268, changed

- Size: at the base 598 characters; at the landing 598 characters; now 598 characters.
- Section now: "The checker and the one library".

At the base:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6616-6620`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

Now:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6690-6694`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

Report sections that the entry cites: [S6] `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why".

## F-301, changed

- Size: at the base 1509 characters; at the landing 1715 characters; now 1715 characters, over 600.
- Section now: "Execution model".

At the base:

- F-301 **On the compiled path a native helper is called through a generated wrapper over the box classes, and once the loop is hot C2 inlines the whole path, so the call costs nothing of its own.** A binding `builtinPrimitive("pkg.Class.method")` and a written `import java` alias call compile to the same bytes: an `invokestatic` of `native.pkg.Class.method`, a class the compiled path writes into `nativewrapper_cache/`, which unboxes each argument with `getValue`, calls the helper and boxes its result with `make`, a new box each time (`compiler/nativeInterface/FortressMethodAdapter.java:303-327`; `compiler/runtimeValues/FZZ32.java:32-34`). A functional method such as `ZZ32`'s `+` reaches the wrapper through the dispatcher, an interface call, the springboard and the trait's static body. C2 inlines all of these frames, the helper, `make` and the box's constructor chain; only C1's profiling code refuses the helper and the chain's deep frames. Escape analysis then removes every temporary box, a helper's result passed into another helper among them, and one box stays per assignment to a mutable variable per iteration: 16 bytes for a `ZZ32`, 24 for an `RR64`. The library's form and the prelude's allocate the same. Observed once on one small program, `perf-probes/helper-calls/HelperCalls.fss`, by `javap`, C2's inlining log and the bytes that JFR counted, with no timing, on a machine shared at a load of 20 to 25; no test checks it. Detail: `perf-probes/helper-calls/REPORT.md` sections 2 to 5.

Now:

- F-301 **On the compiled path a native helper is called through a generated wrapper over the box classes, and once the loop is hot C2 inlines the whole path, so the call costs nothing of its own.** A binding `builtinPrimitive("pkg.Class.method")` and a written `import java` alias call compile to the same bytes: an `invokestatic` of `native.pkg.Class.method`, a class the compiled path writes into `nativewrapper_cache/`, which unboxes each argument with `getValue`, calls the helper and boxes its result with `make`, a new box each time (`compiler/nativeInterface/FortressMethodAdapter.java:303-327`; `compiler/runtimeValues/FZZ32.java:40-48`, where `make` reaches the class of the prelude's value object through a method handle, F-388). On the trait form of the prelude's number types, a functional method such as `ZZ32`'s `+` reaches the wrapper through the dispatcher, an interface call, the springboard and the trait's static body. C2 inlines all of these frames, the helper, `make` and the box's constructor chain; only C1's profiling code refuses the helper and the chain's deep frames. Escape analysis then removes every temporary box, a helper's result passed into another helper among them, and one box stays per assignment to a mutable variable per iteration: 16 bytes for a `ZZ32`, 24 for an `RR64`. The library's form and the prelude's allocate the same. Observed once, on that form and not on the number types' object form (F-388), on one small program, `perf-probes/helper-calls/HelperCalls.fss`, by `javap`, C2's inlining log and the bytes that JFR counted, with no timing, on a machine shared at a load of 20 to 25; no test checks it. Detail: `perf-probes/helper-calls/REPORT.md` sections 2 to 5.

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: rung N makes the prelude's number types value objects over payload classes (F-388): FZZ32.make re-anchored, the observation's code named

## F-302, changed

- Size: at the base 1324 characters; at the landing 1331 characters; now 1331 characters, over 600.
- Section now: "Execution model".

At the base:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. The prelude's `+` reaches `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. By reading, the one library's `ZZ32` springboard chain is two classes longer than the prelude's, `ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any` (`Library/FortressLibrary.fss:846`, `:742`, `:381`, `:357`) against `ZZ32`, `Number`, `Object`, `Any` (`LibraryBuiltin/CompilerBuiltin.fsi:210`), since a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5892-5899`). If `FZZ32` extends the one library's springboard after the switch-over, the margin is 2 frames; not measured, since nothing on `main` runs against the one library yet. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

Now:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. On the trait form of the prelude's number types, their `+` reaches `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. The chains measured are those of that form, whose box extended its trait's springboard, and a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5956-5963`). The prelude's box is now the class of its value object, over the payload class `FZZ32`, which extends `FValue` and no springboard (`compiler/runtimeValues/FZZ32.java:22`; F-388), so its constructor chain no longer follows the type's `extends` entries; the one library's seven are not yet written so (fork N4), and the depth on the object form is not measured. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: rung N makes the prelude's number types value objects over payload classes (F-388): the springboard chain read against the trait form is no longer the box's; a line citation re-anchored by content

## F-307, changed

- Size: at the base 1106 characters; at the landing 1106 characters; now 1106 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-307 **The small rest's eight native bindings name their helpers of `nativeHelpers/`, and walk's values are unchanged: `ZZ64`'s and `ZZ`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`.** They are in the objects `ZZ64`, `ZZ` and `NN64` of `Library/FortressLibrary.fss` (`:951`, `:1170`, `:1063`), in `NN32` and `Char` of `LibraryBuiltin/FortressBuiltin.fss`, and the top-level `char` of `Library/FortressLibrary.fss`; the four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types (`compiler/NamingCzar.java:369-380`). `signed` above the signed half wraps, as a low-bits name does (F-331), and `char` keeps a code point outside 0 to 1114111, as the glue classes did (row 857). The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` on helpers, beside overloads over `String` that flatten (F-299). Test: `tests/NativeHelperFamilySmallWalk.fss` and `compiler_tests/NativeHelperFamilySmallCompiled`. Detail: `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

Now:

- F-307 **The small rest's eight native bindings name their helpers of `nativeHelpers/`, and walk's values are unchanged: `ZZ64`'s and `ZZ`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`.** They are in the objects `ZZ64`, `ZZ` and `NN64` of `Library/FortressLibrary.fss` (`:951`, `:1170`, `:1063`), in `NN32` and `Char` of `LibraryBuiltin/FortressBuiltin.fss`, and the top-level `char` of `Library/FortressLibrary.fss`; the four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types (`compiler/NamingCzar.java:371-382`). `signed` above the signed half wraps, as a low-bits name does (F-331), and `char` keeps a code point outside 0 to 1114111, as the glue classes did (row 857). The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` on helpers, beside overloads over `String` that flatten (F-299). Test: `tests/NativeHelperFamilySmallWalk.fss` and `compiler_tests/NativeHelperFamilySmallCompiled`. Detail: `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

Report sections that the entry cites: [S7] `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

## F-315, changed

- Size: at the base 1210 characters; at the landing 1452 characters; now 1452 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3352-3354`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars` stops next at a varargs call (row 624). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

Now:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3373-3375`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars`, which a varargs call stopped, is emitted by the measure of F-34's setting on rung G's code of climb batch 33b, since the code generator compiles varargs against the one library (F-390; `compile-ladder/rung-varargs/REPORT.md`, "The measure (on a scratch copy of the rung's code)"). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: rung G compiles varargs under the selection and its measure emits stringifyChars (rung-varargs/REPORT.md, The measure); a line citation that climb batch 33b's hunks moved, re-anchored by content

Report sections that the entry cites: [S8] `compile-ladder/rung-varargs/REPORT.md`, "The measure (on a scratch copy of the rung's code)"; [S9] `reviews/batch-25-review.md`, "Where the text, the brief or the principles split".

## F-320, changed

- Size: at the base 1452 characters; at the landing 1608 characters; now 1608 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-320 **The code generator compiles a block's local functions as closures, the group recursive and mutually recursive without a mutable cell.** Each local function of a block is a closure class made as a function expression's, bound under its name in the block's environment, so a call of it and its use as a value go through the closure; it reaches itself as its own `this` and each sibling through a field of its class that the block sets once, after the whole group is made and before the body runs (`compiler/codegen/CodeGen.java`). It refuses three forms that the specification allows, each after the checker passes the program, with its own message: a local function with static parameters of its own, two of one name in a block, and the `atomic` modifier (row 304); a varargs one stops at 'Can't compile VarArgs yet' (row 624). Under the switch-over's setting, measured once on `dbf4825e0`'s code, all nine of the library's declarations that stopped at 'Can't compile LetFn' emit, by the probe of F-34 on that code. Gated by `compiler_tests/LocalFunctionCallCompiled`, `LocalFunctionValueCompiled`, `LocalFunctionRecursiveCompiled`, `LocalFunctionCaptureCompiled` and `LocalFunctionGenericContextCompiled`, their `tests/LocalFunction*Walk` guards, and `XXXLocalFunctionGenericCompiled`, `XXXLocalFunctionOverloadedCompiled` and `XXXLocalFunctionAtomicCompiled`. Detail: `compile-ladder/rung-codegen-local-functions/REPORT.md` sections 1 and 5.

Now:

- F-320 **The code generator compiles a block's local functions as closures, the group recursive and mutually recursive without a mutable cell.** Each local function of a block is a closure class made as a function expression's, bound under its name in the block's environment, so a call of it and its use as a value go through the closure; it reaches itself as its own `this` and each sibling through a field of its class that the block sets once, after the whole group is made and before the body runs (`compiler/codegen/CodeGen.java`). It refuses three forms that the specification allows, each after the checker passes the program, with its own message: a local function with static parameters of its own, two of one name in a block, and the `atomic` modifier (row 304); a varargs one stops at 'Can't compile VarArgs yet' against the compiler's prelude, which declares no `ImmutableArray`, and compiles under the selection (F-390; `one_library_tests/OneLibraryVarargsLocalFunction.test`). Under the switch-over's setting, measured once on `dbf4825e0`'s code, all nine of the library's declarations that stopped at 'Can't compile LetFn' emit, by the probe of F-34 on that code. Gated by `compiler_tests/LocalFunctionCallCompiled`, `LocalFunctionValueCompiled`, `LocalFunctionRecursiveCompiled`, `LocalFunctionCaptureCompiled` and `LocalFunctionGenericContextCompiled`, their `tests/LocalFunction*Walk` guards, and `XXXLocalFunctionGenericCompiled`, `XXXLocalFunctionOverloadedCompiled` and `XXXLocalFunctionAtomicCompiled`. Detail: `compile-ladder/rung-codegen-local-functions/REPORT.md` sections 1 and 5.

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: rung G lifts forLetFn's refusal of varargs; row 624 is closed (OneLibraryVarargsLocalFunction.test)

## F-321, changed

- Size: at the base 1593 characters; at the landing 1593 characters; now 1593 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-321 **Against the interpreter's prelude the checker reads the whole helper class that a binding names, so a binding of a helper of `nativeHelpers/systemOps` fails it.** `systemOps.getArgs` answers an `FStringVector` (`nativeHelpers/systemOps.java:24`), which `NamingCzar` maps to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:337-338`), a type that the interpreter's `FortressBuiltin` does not declare. So a component whose binding names any `systemOps` helper stops: 'FortressBuiltin.StringVector is undefined.' A binding passes the checker only where every method of its helper class maps to the one library's types; `FlatString`'s line separator names `stringOps.lineSeparator` for this reason. No binding of the one library names `systemOps`: `System`'s `getEnvironment` and `getProperty` name `stringOps`, and its `args` names `programArgs` (F-337). `CompilerSystem` still imports `systemOps`' `getArgs` and `getProperty` (`Library/CompilerSystem.fss:13-14`). Checked alone on `ee14222d`, the checker over `System` against the one library reports no error, '### rc=0'; neither stage of the gate reads `System`. No test checks it: the compiled tests check against the compiler's prelude, which declares `StringVector`. Shown by the distance stage with `Library/FlatString.fss`'s `natLineSeparator` naming `systemOps.lineSeparator`: 'FortressBuiltin.StringVector is undefined.', 'File FlatString.fss has 1 error.' Detail: `compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went"; `compile-ladder/rung-system-natives/REPORT.md`, "The checker over System".

Now:

- F-321 **Against the interpreter's prelude the checker reads the whole helper class that a binding names, so a binding of a helper of `nativeHelpers/systemOps` fails it.** `systemOps.getArgs` answers an `FStringVector` (`nativeHelpers/systemOps.java:24`), which `NamingCzar` maps to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:339-340`), a type that the interpreter's `FortressBuiltin` does not declare. So a component whose binding names any `systemOps` helper stops: 'FortressBuiltin.StringVector is undefined.' A binding passes the checker only where every method of its helper class maps to the one library's types; `FlatString`'s line separator names `stringOps.lineSeparator` for this reason. No binding of the one library names `systemOps`: `System`'s `getEnvironment` and `getProperty` name `stringOps`, and its `args` names `programArgs` (F-337). `CompilerSystem` still imports `systemOps`' `getArgs` and `getProperty` (`Library/CompilerSystem.fss:13-14`). Checked alone on `ee14222d`, the checker over `System` against the one library reports no error, '### rc=0'; neither stage of the gate reads `System`. No test checks it: the compiled tests check against the compiler's prelude, which declares `StringVector`. Shown by the distance stage with `Library/FlatString.fss`'s `natLineSeparator` naming `systemOps.lineSeparator`: 'FortressBuiltin.StringVector is undefined.', 'File FlatString.fss has 1 error.' Detail: `compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went"; `compile-ladder/rung-system-natives/REPORT.md`, "The checker over System".

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

Report sections that the entry cites: [S10] `compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went"; [S11] `compile-ladder/rung-system-natives/REPORT.md`, "The checker over System".

## F-330, changed

- Size: at the base 1083 characters; at the landing 1083 characters; now 1083 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-330 **Walk carries `FortressLibrary`'s `JavaBufferedWriter` in a Java `FortressBufferedWriter`, and `stdOut`, `stdErr`, `Writer` and `BufferedWriter` are plain Fortress objects over it.** The trait's `write`s, `flush` and `close` and its three factories, over a file name, standard output and standard error, are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:2072-2081`, `:2094-2099`); walk's loader carries the trait by its name through `FortressBuiltin`'s private native object `JavaBufferedWriterObject` (`interpreter/glue/StaticNativeApp.java:70`), and the checker's walk-world table reads `FortressBufferedWriter` and `FortressBufferedReader` as the one library's traits (`compiler/NamingCzar.java:486-487`). A missing file raises the library's `FileNotFoundException`, which a `catch` sees. `FileWriteStream` is a plain `WriteStream` over `JavaBufferedWriter` too, with its `flush` (F-332). Test: `tests/NativeHelperWriterWalk`, `compiler_tests/NativeHelperFamilyWriterCompiled`. Detail: `compile-ladder/rung-io-writer/REPORT.md`, "What changed and why".

Now:

- F-330 **Walk carries `FortressLibrary`'s `JavaBufferedWriter` in a Java `FortressBufferedWriter`, and `stdOut`, `stdErr`, `Writer` and `BufferedWriter` are plain Fortress objects over it.** The trait's `write`s, `flush` and `close` and its three factories, over a file name, standard output and standard error, are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:2072-2081`, `:2094-2099`); walk's loader carries the trait by its name through `FortressBuiltin`'s private native object `JavaBufferedWriterObject` (`interpreter/glue/StaticNativeApp.java:70`), and the checker's walk-world table reads `FortressBufferedWriter` and `FortressBufferedReader` as the one library's traits (`compiler/NamingCzar.java:488-489`). A missing file raises the library's `FileNotFoundException`, which a `catch` sees. `FileWriteStream` is a plain `WriteStream` over `JavaBufferedWriter` too, with its `flush` (F-332). Test: `tests/NativeHelperWriterWalk`, `compiler_tests/NativeHelperFamilyWriterCompiled`. Detail: `compile-ladder/rung-io-writer/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

Report sections that the entry cites: [S12] `compile-ladder/rung-io-writer/REPORT.md`, "What changed and why".

## F-338, changed

- Size: at the base 824 characters; at the landing 592 characters; now 592 characters.
- Section now: "The checker and the one library".

At the base:

- F-338 **The code generator compiles an object or trait whose first supertrait is an imported api's trait, also where a later supertrait gives a same-named method.** `dumpMethodChaining` reads the first supertrait's methods through `CodeGen.firstSupertraitMethods`, which names the trait of the supertrait's own declarations as the extends clause names it; `STypesUtil.allMethods` names it as the api's declaration does, without the api, and the code generator's trait table, over the component, finds such a name only in the component and the four prelude apis (`TraitTable.scala:72-101`). The same root still stops `methodsNamed` at a type-assumption call (row 940). Test: `TraitTableApiTraitCompiled`; row 940's `XXXAsIfApiTraitCompiled`. Detail: `compile-ladder/rung-codegen-trait-table/REPORT.md`, sections 1, 2 and 6.

Now:

- F-338 **The code generator compiles an object or trait whose first supertrait is an imported api's trait, also where a later supertrait gives a same-named method.** `dumpMethodChaining` reads the first supertrait's methods through `CodeGen.firstSupertraitMethods`, which names the trait of the supertrait's own declarations as the extends clause names it; `STypesUtil.allMethods` gives them that name itself (F-391), so the rename gives each entry the name it already has. Test: `TraitTableApiTraitCompiled`. Detail: `compile-ladder/rung-codegen-trait-table/REPORT.md`, sections 1, 2 and 6.

History blocks of the range:

- Written by the gather: 2026-11-18 05:39Z · rewritten · from `explorations/compile-ladder/rung-api-method-index/REPORT.md`, "What changed and why" · by climb batch 33b gather: rung R: allMethods names an api's trait with its api, and row 940 is fixed (cites [S13])

## F-351, changed

- Size: at the base 1768 characters; at the landing 1768 characters; now 1768 characters, over 600.
- Section now: "Execution model".

At the base:

- F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314`,`compiler/codegen/CodeGen.java:2047-2079` (`forAtomicBlock`), `:2389-2393` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

Now:

- F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314`,`compiler/codegen/CodeGen.java:2067-2099` (`forAtomicBlock`), `:2409-2413` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

Report sections that the entry cites: [S14] `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

## F-369, changed

- Size: at the base 1875 characters; at the landing 1875 characters; now 1875 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6825`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). The checker checks a local tuple binding's declared names beside untyped names in the same way (row 1029, fixed; `compiler_tests/LocalTupleBindingMixedTypes`, `XXXLocalTupleBindingMixedRefused`), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

Now:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6899`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). The checker checks a local tuple binding's declared names beside untyped names in the same way (row 1029, fixed; `compiler_tests/LocalTupleBindingMixedTypes`, `XXXLocalTupleBindingMixedRefused`), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

History blocks of the range:

- Written by the merged-diff review: 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

Report sections that the entry cites: [S15] `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why".

## F-379, changed

- Size: at the base 1602 characters; at the landing 1618 characters; now 1618 characters, over 600.
- Section now: "The library's arrays and algebra".

At the base:

- F-379 **The one library and walk declare `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` each as one value object, and a program's object below one is refused at load.** P-178's one-library half holds: the objects are `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`, and walk builds their native values from the glue classes of the same names, such as `interpreter/glue/prim/ZZ32.java`, found by a table (`interpreter/evaluator/BuildEnvironments.java:459-470`). No `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` is declared in the library or used by walk's Java; a typecase arm at one of those names is refused on both paths, 'Int is undefined.' (row 959, fixed; F-382). So `asif` at one of the five is the identity, and `object Mine extends ZZ32` is refused, 'Attempt to extend object type ZZ32'. Walk's load check reads pairs over the five as over objects: a valid generic-beside-plain pair at `ZZ64` loads (row 550, fixed), and so do two kinds of invalid pair: a plain declaration with no written return type beside a generic one (row 1044), and two plain lists whose more specific one returns a type not below the other's, against the Subtype Rule, such as `f(x: Number): ZZ32` beside `f(x: ZZ64): String` (row 697). With `NN32` and `RR32`, objects already, seven of the eight number types are objects, `QQ` the trait; the compiler's prelude keeps its open traits (row 1003). Tests: `tests/NumberTypesAreObjectsWalk.fss`, `tests/NumberTypeExtendRefusedWalk.fss`. Detail: `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" and "What a program sees differently".

Now:

- F-379 **The one library and walk declare `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` each as one value object, and a program's object below one is refused at load.** P-178's one-library half holds: the objects are `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`, and walk builds their native values from the glue classes of the same names, such as `interpreter/glue/prim/ZZ32.java`, found by a table (`interpreter/evaluator/BuildEnvironments.java:459-470`). No `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` is declared in the library or used by walk's Java; a typecase arm at one of those names is refused on both paths, 'Int is undefined.' (row 959, fixed; F-382). So `asif` at one of the five is the identity, and `object Mine extends ZZ32` is refused, 'Attempt to extend object type ZZ32'. Walk's load check reads pairs over the five as over objects: a valid generic-beside-plain pair at `ZZ64` loads (row 550, fixed), and so do two kinds of invalid pair: a plain declaration with no written return type beside a generic one (row 1044), and two plain lists whose more specific one returns a type not below the other's, against the Subtype Rule, such as `f(x: Number): ZZ32` beside `f(x: ZZ64): String` (row 697). With `NN32` and `RR32`, objects already, seven of the eight number types are objects, `QQ` the trait; the compiler's prelude declares the same seven as value objects (F-388). Tests: `tests/NumberTypesAreObjectsWalk.fss`, `tests/NumberTypeExtendRefusedWalk.fss`. Detail: `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" and "What a program sees differently".

History blocks of the range:

- Written by the gather: 2026-11-18 05:30Z · rewritten · from `explorations/compile-ladder/rung-number-payload-objects/REPORT.md`, "What changed and why" · by climb batch 33b gather: row 1003 fixed by rung N: the prelude declares the seven as value objects (cites [S16])

Report sections that the entry cites: [S17] `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why".

## F-388, added

- Size: at the base none; at the landing 1334 characters; now 1334 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-388 **The compiler's prelude declares its seven number types as value objects, whose classes the code generator writes over the run time's payload classes.** `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64` are `value object`s in `CompilerBuiltin`; each object's class extends the abstract payload class `compiler/runtimeValues/F<T>`, which holds the JVM value. Descriptors, stamped instances and the RTTI's `className()` name the type by the payload class, while the RTTI's class stays the object's, so that the type lies below its traits at run time; a dotted call casts its receiver to the object's class; `F<T>.make` reaches the object's class's `make` by the name that `LibraryNames` gives, for the prelude only (the one library's seven have no rows yet, fork N4). So a program's object below a number type is refused at the compile, an overloading at `ZZ32` beside one at a program's trait is valid, a `typecase` clause at such a trait over a number is refused as unreachable (row 1081), and a number type named as a value does not compile (row 1082). Tests: `compiler_tests/NumberObjectsCompiled.test`, `compiler_tests/XXXNumberTypeExtendRefusedCompiled.test`, `compiler_tests/ComprisesMeetGenericTrait.test`. Detail: `compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)".

History blocks of the range:

- Written by the gather: 2026-11-18 05:30Z · added · from `explorations/compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)" · by climb batch 33b gather (cites [S18])

Report sections that the entry cites: [S18] `compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)".

## F-389, added

- Size: at the base none; at the landing 1303 characters; now 1303 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-389 **A function expression's class, and a local function's, is named by its component and source span; a later one of the component at a span already named takes the name with `#2`, `#3`, in the order in which the code generator meets them.** The thunk that a conditional operator makes of its right operand takes the operand's span, and where the operand is a reduction, so does the reduction's outer closure `fn (reduction, unit) => ...`; the thunk is met first and keeps the span's name. So does the thunk that a binding `if` makes of its else part, where the else part is a reduction, and the function expression that an arrow coercion wraps around a function expression argument, met before the argument; three at one span take `#2` and `#3`. The set of names is one per compile of a component (`NamingCzar.gensymArrowClassName`, `CodeGen.closureClassNames`), so the names are the same from compile to compile and under another hash mode; a generic one's class file is `...#k⟦⟧`. On the one library this lets `LexicographicOrder` be emitted. Tests: `compiler_tests/ConditionalReductionCompiled.test`, `compiler_tests/ArrowCoercionFnExprCompiled.test`, `one_library_tests/OneLibraryConditionalReduction.test`. Detail: `compile-ladder/rung-closure-name-once/REPORT.md`, "4. The naming as built".

History blocks of the range:

- Written by the gather: 2026-11-18 05:34Z · added · from `explorations/compile-ladder/rung-closure-name-once/REPORT.md`, "4. The naming as built" · by climb batch 33b gather (cites [S19])

Report sections that the entry cites: [S19] `compile-ladder/rung-closure-name-once/REPORT.md`, "4. The naming as built".

## F-390, added

- Size: at the base none; at the landing 1488 characters; now 1488 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-390 **The code generator passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]` of the library in use, made at the call or in a dispatch method's branch; against the compiler's prelude, which declares no such type, it refuses the declaration.** The varargs part of a domain is one JVM parameter after the plain ones (`NamingCzar.varargsParamType`); the array is made by `__immutableFactory1` and filled in order with `init`, as walk makes it (`CodeGen.evalVarargsArgs`, `emitVarargsArray`); a single argument of tuple type passes its elements; a call goes to the dispatch method of its arity where another declaration of the name takes as many arguments, by the expansion rule (`OverloadSet.VarargsExpansion`). Under the selection it still stops on a varargs method, or a varargs function with static parameters, beside another declaration of its name with as many parameters (row 1086), and a spread argument is dropped on both paths (row 1085). So under the selection varargs no longer stands on a program's path (`println`, `assert`); no program runs on the one library yet (row 1062). Tests: `one_library_tests/OneLibraryVarargsCount.test`, `OneLibraryVarargsOverloaded.test`, `OneLibraryVarargsMethod.test`, `OneLibraryVarargsOperator.test`, `OneLibraryVarargsLocalFunction.test`; the prelude's `compiler_tests/XXXVarargsCodeGeneration.test` and `XXXVarargsMethodCodeGeneration.test`. Detail: `compile-ladder/rung-varargs/REPORT.md`, "The convention as built".

History blocks of the range:

- Written by the gather: 2026-11-18 05:36Z · added · from `explorations/compile-ladder/rung-varargs/REPORT.md`, "The convention as built" · by climb batch 33b gather (cites [S2])

Report sections that the entry cites: [S2] `compile-ladder/rung-varargs/REPORT.md`, "The convention as built".

## F-391, added

- Size: at the base none; at the landing 1248 characters; now 1248 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-391 **The code generator gathers a trait's methods with entries that name each trait as the trait table finds it, so a method of an imported api's trait is found by its api, and no compiled test reaches the trait table's search by the prelude's names.** `STypesUtil.gatherMethods` names the trait of a type's own declarations by the name the table was asked for, and the special arrow of a functional method names its trait with the api of its self type (`STypesUtil.nameBySelfType`). So an object's overload beside a method inherited from an api's trait, a call at an assumption of such a trait and the one library's `Array1` compile; a call at an assumption runs the trait's body, also over an object's override (`CodeGen.hasBodyInItsTrait`), except a method of a generic trait whose parameter has the trait's type parameter, where the code generator stops (row 1088). Tests: `compiler_tests/ApiTraitOverloadCompiled.test`, `ApiTraitShadowedNameCompiled.test`, `AsIfApiTraitCompiled.test`, `AsIfApiTraitOverrideCompiled.test`, `IntersectionApiTraitCompiled.test`, `one_library_tests/OneLibraryArray1.test`. Detail: `compile-ladder/rung-api-method-index/REPORT.md`, "What changed and why" and "The trait table's search by the prelude's names".

History blocks of the range:

- Written by the gather: 2026-11-18 05:39Z · added · from `explorations/compile-ladder/rung-api-method-index/REPORT.md`, "What changed and why" · by climb batch 33b gather (cites [S13])

Report sections that the entry cites: [S13] `compile-ladder/rung-api-method-index/REPORT.md`, "What changed and why".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

`facts-extract.sh 'doc:.claude/skills/coordinator/references/batch.md#The checker count and the distance'`

.claude/skills/coordinator/references/batch.md:58-65, 844 bytes.

~~~~
## The checker count and the distance

Until the switch-over lands, the gate of every batch reports the checker count and the distance. Neither turns the gate red.

- If a rung's test is the checker count or the distance, it takes the last landed gate's tables as its starting values.
- If every file that a rung changes lies outside what the two measures read, the rung runs neither and lists those files (`STAGE_BLIND`). Its skeptic checks the list against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- The gate's comparisons hide Java line numbers, identity hashes and moved library positions. Put every difference that they hid on the review list. Put there too each line of the team's tests that a rung rewrote to keep its checked value, with its before and after.
~~~~

## [S2] explorations/compile-ladder/rung-varargs/REPORT.md, "The convention as built"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-varargs/REPORT.md#The convention as built'`

explorations/compile-ladder/rung-varargs/REPORT.md:22-57, 4462 bytes, cut at 2500.

~~~~
## The convention as built

- **The JVM parameters of a varargs declaration**: its plain parameters, then one parameter of the descriptor of `ImmutableArray[\T, ZZ32\]` of the library in use. From `javap -c -p` on `one_library_tests/OneLibraryVarargsCount`'s jar:

      public static fortress.FortressLibrary$ZZ32 count(fortress.FortressLibrary$\=ImmutableArray?fortress\|FortressLibrary\%ZZ32,fortress\|FortressLibrary\%ZZ32?);

  A trait's method has the same parameter in its interface, its default body and its forwarders (`OneLibraryVarargsMethod$Tagger`, `$Tagger$DefaultTraitMethods`):

      public abstract fortress.FortressLibrary$ZZ32 tag(fortress.FortressLibrary$String, fortress.FortressLibrary$\=ImmutableArray?fortress\|FortressLibrary\%ZZ32,fortress\|FortressLibrary\%ZZ32?);
      public static fortress.FortressLibrary$ZZ32 tag(OneLibraryVarargsMethod$Tagger, fortress.FortressLibrary$String, fortress.FortressLibrary$\=ImmutableArray?...);

- **Where the array is made**: at the call, where the name has no other declaration of the call's number of arguments; in the dispatch method's branch for the varargs declaration, where it has one.
- **How a call of each arity reaches the varargs declaration** (`one_library_tests/OneLibraryVarargsOverloaded`, `check(Boolean)`, `check(Boolean, String)`, `check(Any, Any, Any...)`, and the library's `assert` of the same three shapes): `check(z, z)` calls the dispatch method `check(Any;Any)`, which tests `FBoolean` and `String` and otherwise makes an empty array and calls `check(Any;Any;ImmutableArray)`; `check(z, z, "a")` and `check(z, z, "a", z)` make arrays of one and two and call `check(Any;Any;ImmutableArray)`; `check(b, "m")` calls `check(FBoolean;String)`. The library's `assert(z, z)` calls `FortressLibrary.assert(Any;Any)`, the dispatch method that `FortressLibrary` writes at two arguments; `assert(z, z, "a")` makes its array at the call. From the same `javap`:

      static check(fortress.AnyType$Any, fortress.AnyType$Any): instanceof FBoolean ... invokestatic check:(LFBoolean;Lfortress/FortressLibrary$String;) ... invokeinterface "\=Arrow??,...ImmutableArray1?fortress\|AnyType\%Any,0,0??".apply ... invokestatic check:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;Lfortress/FortressLibrary$\=ImmutableArray?...;)
      251: invokestatic  #201  // Method fortress/FortressLibrary.assert:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;)Lcom/sun/fortress/compiler/runtimeValues/FVoid;
      296: invokestatic  #229  // M
~~~~

## [S3] Specification/basic/overloading.tex, "Applicability for Functionals with Varargs and Keyword Parameters"

`facts-extract.sh 'doc:Specification/basic/overloading.tex#Applicability for Functionals with Varargs and Keyword Parameters'`

Specification/basic/overloading.tex:246-287, 2302 bytes.

~~~~
\section{Applicability for Functionals with Varargs and Keyword Parameters}
\seclabel{applicability-with-special-params}

The basic idea for handling varargs and keyword
parameters is that we
can think of a functional declaration that has such parameters as
though it were (possibly infinitely) many declarations, one for each
set of arguments it may be called with.  In other words, we expand
these declarations so that there exists a declaration for each number
of arguments that can be passed to it.


A declaration with a varargs parameter corresponds to an infinite
number of declarations, one for every number of arguments that may be
passed to the varargs parameter.  In practice, we can bound that
number by the maximum number of arguments that the functional is
called with anywhere in the program (in other words, a given program
will contain only a finite number of calls with different numbers of
arguments).  The expansion described here is a conceptual one to
simplify the description of the semantics; we do not expect a real
implementation to actually expand these declarations at compile time.
%
For example, the following declaration:
%f(x : ZZ, y : ZZ, z : ZZ...):ZZ
\begin{Fortress}
\(f(x \mathrel{\mathtt{:}} \mathbb{Z}, y \mathrel{\mathtt{:}} \mathbb{Z}, z \mathrel{\mathtt{:}} \mathbb{Z}\ldots)\COLONOP\mathbb{Z}\)
\end{Fortress}
would be expanded into:
%f(x : ZZ, y : ZZ):ZZ
%f(x : ZZ, y : ZZ, z1 : ZZ):ZZ
%f(x : ZZ, y : ZZ, z1 : ZZ, z2 : ZZ):ZZ
%f(x : ZZ, y : ZZ, z1 : ZZ, z2 : ZZ, z3 : ZZ):ZZ
%...
\begin{Fortress}
\(f(x \mathrel{\mathtt{:}} \mathbb{Z}, y \mathrel{\mathtt{:}} \mathbb{Z})\COLONOP\mathbb{Z}\)\\
\(f(x \mathrel{\mathtt{:}} \mathbb{Z}, y \mathrel{\mathtt{:}} \mathbb{Z}, z_{1} \mathrel{\mathtt{:}} \mathbb{Z})\COLONOP\mathbb{Z}\)\\
\(f(x \mathrel{\mathtt{:}} \mathbb{Z}, y \mathrel{\mathtt{:}} \mathbb{Z}, z_{1} \mathrel{\mathtt{:}} \mathbb{Z}, z_{2} \mathrel{\mathtt{:}} \mathbb{Z})\COLONOP\mathbb{Z}\)\\
\(f(x \mathrel{\mathtt{:}} \mathbb{Z}, y \mathrel{\mathtt{:}} \mathbb{Z}, z_{1} \mathrel{\mathtt{:}} \mathbb{Z}, z_{2} \mathrel{\mathtt{:}} \mathbb{Z}, z_{3} \mathrel{\mathtt{:}} \mathbb{Z})\COLONOP\mathbb{Z}\)\\
\(\ldots\)
\end{Fortress}
A declaration with a varargs parameter is applicable to a call if
any one of the expanded declarations is applicable.
~~~~

## [S4] explorations/compile-ladder/rung-closure-name-once/SKEPTIC.md, "3. My programs"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-closure-name-once/SKEPTIC.md#3. My programs'`

explorations/compile-ladder/rung-closure-name-once/SKEPTIC.md:34-52, 4276 bytes, cut at 2500.

~~~~
## 3. My programs

All under the rung's `tmp/rung-closure-name-once/skeptic/`, run with the setup lines and `nice -n 19`. The old code: `/home/user/fortress-base38/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 <K>/old-caches compile P.fss`, then `... run P`; walk `... <K>/old-walk-caches P.fss`; under the selector with `FORTRESS_LIBRARY=one` and `<K>/old-caches-one`. The new code: `FORTRESS_CACHES=<K>/new-caches bin/fortress compile P.fss`, then `run P`; walk with `<K>/new-walk-caches`; the selector with `<K>/new-caches-one`, a copy of the tree's `caches-one`. `FORTRESS_THREADS=1`, and 4 where said.

| program | what it holds | walk, old and new | compiled, old | compiled, new |
|---|---|---|---|---|
| P1 `SkShared` (prelude) | `n ADDLAZY: (SUM ...)` in a top-level variable, nested twice, in two local functions, an object's dotted and functional methods, a generic trait's method at two instances | `topv=6`, `nested(4)=14`, `twice(4)=14`, `viaLocal(4)=26`, `sumTo=14`, `weigh=9`, `IntBag=10`, `StrBag=6` | 'duplicate entry: SkShared$\=fn@7\!26-40.class', exit 1 | the same eight values, at 1 and at 4 threads; walk at 4 threads the same |
| P2 `SkNames` (prelude) | function expressions, nested, a generic local function, a group of two local functions, two reductions, `AND:`, none sharing a span | `inc=6`, `compose=10`, `keep=k`, `sums=10`, `flags=T`, `isEv=T` | the same | the same; the jars of old and new: 'names equal: True; entries whose bytes differ: 0' (16 entries) |
| P2b the team's `LocalFunctionGenericContextCompiled` (copied) | local functions in generic contexts | | `PASS` | `PASS`; 'names equal: True; entries whose bytes differ: 0' (26 entries) |
| P3 `SkSharedOne` (selector) | `if x <- m then x else (SUM[i <- 0#n] i) end`; `AND:` of `OR:` of `BIG OR` and `BIG AND`; a local function so | `pickJust=3`, `pickNothing=6`, `both=true`, `deep=false`, `local=true` | 'duplicate entry: SkSharedOne$\=fn@5\!64-78.class', exit 1 | compiles; the jar holds `fn@5:64-78` and `fn@5:64-78#2` |
| P4 `SkElseBare` (selector) | `if x <- m then x else SUM[i <- 0#n] i end` | `orSumNothing=6`, `orSumJust=3` | 'duplicate entry: SkElseBare$\=fn@5\!64-81.class' | compiles: `fn@5:64-81`, `fn@5:64-81#2` |
| P5 `SkArrowCoerce` (prelude) | `callWide(fn (y: ZZ32): ZZ32 => y + 1, 4)` for `callWide(f: ZZ32 -> ZZ64, x: ZZ32): ZZ64 = f(x)` | 'Unification error: Closure/Constructor for callWide param 1 (f:ZZ32->ZZ64) got arg FnExpr ... ZZ32->ZZ32' | 'duplicate 
~~~~

## [S5] explorations/compile-ladder/rung-natives-compiled/SKEPTIC.md, "My programs, old against new"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-compiled/SKEPTIC.md#My programs, old against new'`

explorations/compile-ladder/rung-natives-compiled/SKEPTIC.md:21-33, 3565 bytes, cut at 2500.

~~~~
## My programs, old against new

Commands, from `tmp/rung-natives-compiled/skeptic/p/`: the new code `$FORTRESS_HOME/bin/fortress compile P.fss`, `... run P` and `... P.fss` (walk) with `FORTRESS_CACHES` and `-Dfortress.caches` a private copy of the worktree's caches; the old code `/home/user/fortress-base23/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 /home/user/fortress-natives-compiled/tmp/old-caches compile P.fss`, `... run P` and `... P.fss`.

- `SkBind.fss`: a zero-argument helper (`simpleOverload.bar`), a three-argument one (`stringOps.substring`), two Java overloads of different arity under one alias (`simpleOverload.duo(String)`, `duo(int,int)`), a top-level `opr OPLUS`, a trait's getter and functional `opr OTIMES`, a generic object's dotted method, an overflow caught. New, compiled, at `FORTRESS_THREADS=1` and `=4`, the same lines: 'bar', 'bc', 'baz q', 'baz 9', '7', 'Box', 'true', 'false', 'GBox[\ZZ32\]' twice, '-1', 'PASS'. Old, compiled: 'Variable builtinPrimitive is not defined.' at each binding. Walk, old: 'JavaString is undefined.' (walk's world has no `JavaString`).
- `SkBindW.fss` (`less` and `OPLUS` over `ZZ32`): walk old and new, the same, 'Native class com.sun.fortress.nativeHelpers.simpleIntArith.intLT not found.', rc 1 (the switch keeps walk off; rung W's loader is not here). New, compiled: 'true', '7', 'PASS'.
- `SkApi.fsi`, `SkApi.fss` and `SkUse.fss`: helper bindings in an exporting component, used from another. New: compile rc 0, link rc 0, run 'true', 'false', 'true', 'false', 'PASS' at 1 and 4 threads. Old: 'Variable builtinPrimitive is not defined.' twice.
- `SkMixed.fss`: a written `import java com.sun.fortress.nativeHelpers.{simpleIntArith.intLT => jLT}` beside a binding of the same helper. New, compiled: 'true', 'false', 'PASS'. Old: 'Variable builtinPrimitive is not defined.' at the binding.
- `SkErr.fss`: a misnamed class, then a misnamed method. New: 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArithX.intOverflowingAdd', 'File SkErr.fss has 1 error.' Old: 'Variable builtinPrimitive is not defined.' twice, 'File SkErr.fss has 2 errors.'
- `SkVarargs.fss`: a varargs declaration naming a helper. New and old: 'Variable builtinPrimitive is not defined.'
- `SkWalkJava.fss`: a written `import java ... {simpleIntArith.intLT => jLT}` and `println(jLT(1, 2))`, `println(jLT(3, 2))`. Compiled, old and new: 'true', 'false'. **Walk, old**: 'FortressBuiltin.ZZ32 is undef
~~~~

## [S6] explorations/compile-ladder/rung-codegen-walls/REPORT.md, "1. What changed, and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-walls/REPORT.md#1. What changed, and why'`

explorations/compile-ladder/rung-codegen-walls/REPORT.md:9-18, 3508 bytes, cut at 2500.

~~~~
## 1. What changed, and why

Three changes in `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and one helper that the second needs, nothing else of the original tree:

- `generateTypeReference`, its `AnyType` branch (base `:5795-5796`, now `:5845-5851`): it was empty and fell through to the throw 'Only handling some static args of generic types in extends clause' (base `:5802`). It now calls `generateTypeReference` with Any's own name, `NodeFactory.makeId(span, WellKnownNames.anyTypeLibrary(), WellKnownNames.anyTypeName)`, and no static arguments, and continues, as the `TraitType` branch does for a trait (`:5835-5837`). For a name without static arguments the method emits `GETSTATIC <its RTTI class>.ONLY` (`:5759-5767`), here `fortress/AnyType$Any$RTTIc.ONLY`, the field that the bootstrap class declares (`ProjectFortress/src/fortress/AnyType.java`, `RTTIc.ONLY`). The `BottomType`, `SelfType` and `AbbreviatedType` branches stay empty, each still ending in the throw (`:5833-5834`, `:5843-5844`, `:5852-5853`, throw `:5857`).
- `forTry` (base `:2019-2073`, now `:2019-2087`): the throw 'NYI: Forbid clauses are not yet implemented' (base `:2029-2030`) is gone. After the catch clauses, which are unchanged, each type of the forbid clause is tested in turn, as a catch clause tests its type (`DUP`, `FException.getValue`, `InstantiatingClassloader.generalizedInstanceOf`, `IFEQ`); on a match the exception's value is passed to `throwForbiddenException`. The rethrow (`ATHROW`) and the label `done` move out of the `if (catchClauses.isSome())` block (`:2041`, `:2078-2081`) and are emitted when the try has a catch clause or a forbid clause, so a try with neither emits what it emitted before.
- `throwForbiddenException` (new, `:2089-2122`): with the exception's value on the stack, it finds `ForbiddenException`'s constructor in the api index of `WellKnownNames.fortressLibrary()` (the component's own index when it is that library), takes its parameter type and its result, casts the value to the parameter's class, calls the constructor's static method through `idToPackageClassAndName` and `NamingCzar.jvmMethodDesc`, as a source call of `ForbiddenException(e)` is emitted, wraps the result in an `FException` as `forThrow` does (`NEW`, `DUP_X1`, `SWAP`, `INVOKESPECIAL`) and throws it. The api's own types are named unqualified in its index, so the descriptor is made with the library's api as the default: with the program's api the first run asked for `ForbidC
~~~~

## [S7] explorations/compile-ladder/rung-natives-small/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-small/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-small/REPORT.md:11-34, 2834 bytes, cut at 2500.

~~~~
## What changed and why

Under P-58, each native binding's string names a static helper of `nativeHelpers/`. The bindings move one family at a time, and from the step that moves a binding, the compiled checker reads it against the helper's Java signature. This rung moves the small rest: 8 strings, by the planner's `rung-S.patch` taken as it is.

| declaration | was | now |
|---|---|---|
| `value object Long`, `getter asString()` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:379-380`) | `Long$ToString` | `simpleLongArith.longToString` |
| `value object Long`, `getter asExprString()` (`:381-382`) | `Long$ToString` | `simpleLongArith.longToString` |
| `value object NN32`, `signed(self):ZZ32` (`:469-470`) | `NN32$ToInt` | `simpleUnsignedIntArith.makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType` |
| `value object BigNum`, `getter asString()` (`:566-567`) | `BigNum$ToString` | `simpleArbitraryPrecisionArith.toString` |
| `value object BigNum`, `getter asExprString()` (`:568-569`) | `BigNum$ToString` | `simpleArbitraryPrecisionArith.toString` |
| `value object Char`, `getter codePoint()` (`:616-617`) | `Char$CodePoint` | `simpleChar.charCodePointWithSpecialCompilerHackForCharacterArgumentType` |
| `trait NN64`, `signed(self):ZZ64` (`Library/FortressLibrary.fss:985-986`) | `UnsignedLong$ToLong` | `simpleUnsignedLongArith.makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType` |
| top-level `char(a:ZZ32):Char` (`Library/FortressLibrary.fss:4540`) | `Char$Chr` | `simpleChar.charMakeCharacterWithSpecialCompilerHackForCharacterResultType` |

Each helper computes what its glue class computed:

- `Long.toString(x)`: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:19-21`, against `interpreter/glue/prim/Long.java:262-266`.
- `b.toString()`: `simpleArbitraryPrecisionArith.java:26-28`, against `BigNum.java:274-278`.
- The identity on the `int` or `long`: `simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`, `simpleChar.java:57` and `:63`, against `NN32.java:239-243`, `UnsignedLong.java:239-243` and `Char.java:159-169`.

Walk carries `NN32` and `Char` in an `int` and `NN64` in a `long`, and answers each by the declared result (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:205-224`; F-299). So `char` answers a `Char`, and `signed` a `ZZ32` or `ZZ64`, as their glue classes did. The checker reads `int` as `NN32` or `Char`, and `long` as `NN64`, only for the six special names (`ProjectFo
~~~~

## [S8] explorations/compile-ladder/rung-varargs/REPORT.md, "The measure (on a scratch copy of the rung's code)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-varargs/REPORT.md#The measure (on a scratch copy of the rung's code)'`

explorations/compile-ladder/rung-varargs/REPORT.md:92-101, 1589 bytes.

~~~~
## The measure (on a scratch copy of the rung's code)

`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh /home/user/fortress-varargs-measure <tree>/tmp/rung-varargs/measure`, the scratch worktree seeded at `888c20dd93` and removed after; 208 s:

    refused declarations 3 | emitted (OK lines) 751 | component failures 0
    kinds 2
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  ClassCastException: com.sun.fortress.nodes.VarType to com.sun.fortress.nodes.TraitType  [FortressLibrary 1]

against 13 refused and 745 emitted on `d3747846c1` (F-34). The ten of varargs are all emitted: `assert`, `deny`, `Generator2`, `<|_|>`, `CatString`, `EmptyString`, `SubString`, `stringifyChars`, `FlatString` and `WriteStream` (the measure's `@@CG OK` lines). Nothing stops `Generator2` or `CatString` behind varargs: the stand-in's 'Error trying to close method scope' in `Generator2` and 'Index 0 out of bounds for length 0' in `CatString` were the varargs parameter in the body and an operator's application of a varargs declaration, which the rung builds (the second is `OneLibraryVarargsOperator`'s failure on the base). What remains is the closure class twice (row 315, rung W) and `__bigOperator2` (row 1076). The measure skips the dispatch methods. The later commit `4526151e00` changes only a generic varargs declaration in an overload set, which none of the fourteen components declares (their varargs declarations are `assert` and `deny`, without static parameters, and `<|`, `print`, `println`, each alone).
~~~~

## [S9] explorations/reviews/batch-25-review.md, "Where the text, the brief or the principles split"

`facts-extract.sh 'doc:explorations/reviews/batch-25-review.md#Where the text, the brief or the principles split'`

explorations/reviews/batch-25-review.md:173-187, 5369 bytes, cut at 2500.

~~~~
### Where the text, the brief or the principles split

**1. Shared helpers repaired the prelude's values, where P-38's title says its defects are not repaired (rung U; fork 5).** P-38: "The compiler prelude's defects are not repaired: they go with it at the switch-over." (`POSITIONS.md:35`). Rung U fixed `simpleUnsignedLongArith.unsignedLongToString` and `unsignedLongWrappingNeg`, which the one library's bindings now name and the prelude binds too, so the prelude's `NN64` printing and its prefix `BOXMINUS` changed with them: 'BOXMINUS 1: 1' became 'BOXMINUS 1: 18446744073709551615' (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:825`, `:832`; `RECORD.md`, "Points to report", U; F-313). Fork 5 names the change (`CLIMB-BATCH-25.md:84`), and the record's "No question for the curator" says no fork bends a decision of his (`:72-74`); neither it nor the Fable review weighs P-38. The decision's body names the prelude's own text, its `Maybe` block, its `REM` guard and its reversed spellings, which stand; the helpers and the run-time classes `FNN32` and `FNN64` outlive the prelude, and the one library needs them right (P-58; P-37, "settles which files survive, not the designs inside them"). Climb batch 24's rung K did the same for the prelude's compiled `CHOOSE` (rows 521 and 855), read under P-37 (`reviews/batch-24-review.md`, rung K, standard 3). Default: as landed. So P-38's title is false in effect for rows 326's and 860's prelude halves, and for 521 and 855 before them; the decision stands for the prelude's text (finding 4).

**2. `nextUp` and `nextDown` at a signed zero (rungs D and P; row 880).** IEEE 754-2008's nextUp of `-0.0` is the smallest positive subnormal, as Java's `Math.nextUp` gives; the team's `DirectedRounding.nextUp`, which both glue classes and both rungs' helpers call, gives the successor in IEEE's totalOrder, `0.0` (`ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127`, its `float` twin `:25-41`). The specification names no `nextUp`; its one word on the signed zeros, "-0 is considered to be smaller than +0", is said of `MIN` and `MAX` (`Specification/basic/operators/opr-overview.tex:252`; skeptic D, "Homes"). Row 880 is `CONTESTED`, and `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` pins today's values. D.worker.1 with P.worker.2 (`PLAN.md:669`). Default: today's values.

**3. The `test` modifier on a method (rung C; its D6).** The specification's note gives `test` to a top-level function of type `() -> ()
~~~~

## [S10] explorations/compile-ladder/rung-string-natives/REPORT.md, "A site that came, and went"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-string-natives/REPORT.md#A site that came, and went'`

explorations/compile-ladder/rung-string-natives/REPORT.md:165-175, 1062 bytes.

~~~~
### A site that came, and went

The first distance run, on `19e9dbda5`, where `natLineSeparator` named `systemOps.lineSeparator`:

    ### target Library/FlatString.fss componentOnly=true
    Internally generated library name, in source code NamingCzar.:0:0:
        FortressBuiltin.StringVector is undefined.
    File FlatString.fss has 1 error.
    #total	none: 1 target(s) stopped with errors the stage does not count: Library/FlatString.fss rc=-1 (File FlatString.fss has 1 error.)

Traced to its binding: the checker reads the whole class that a binding names, and `systemOps.getArgs` answers an `FStringVector` (`nativeHelpers/systemOps.java:29`), which `NamingCzar` maps to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:339-340`), a type that the interpreter's prelude does not declare. The line separator moved to `stringOps` (`8b6fca9b5`), and the stage came back to 0. The count stage, which reads only `FortressLibrary`, gave 0 on both code states. `System`'s two natives name `systemOps` still, and neither stage reads `System` (row 895).
~~~~

## [S11] explorations/compile-ladder/rung-system-natives/REPORT.md, "The checker over System"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-system-natives/REPORT.md#The checker over System'`

explorations/compile-ladder/rung-system-natives/REPORT.md:92-110, 1161 bytes.

~~~~
## The checker over System

The planner's command (section 5, probe 3), with `-Djava.io.tmpdir` added, on the final code `ee14222d`:

    SCR=$PWD/tmp/sys-check; mkdir -p $SCR/classes $SCR/caches
    CP=$(bin/fortress_classpath | tail -1)
    javac -nowarn -cp "$CP" -d $SCR/classes explorations/coordinator/tools/checker-count/WorldFlip.java \
        explorations/coordinator/tools/checker-count/shadow-src/com/sun/fortress/compiler/StaticChecker.java
    java -Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp -Dfortress.caches=$SCR/caches -Dfortress.analyzer.overload.cache=false \
        -cp $SCR/classes:$CP WorldFlip -stop check Library/System.fss

Its last lines:

    @@PROBE checkApi System -> errors=0
    @@PROBE checkApi com.sun.fortress.nativeHelpers -> errors=0
    @@PROBE checkComponent System
    ### rc=0

No error line: the checker reads `System` whole, as control B. Its before is the record's, not run again: 'FortressBuiltin.StringVector is undefined.', 'File System.fss has 1 error.' (`plan-28/PROBES.md:93-97`); and the first half alone is control A's two errors, at `Library/System.fss:29` and `:35` (`PROBES.md:99-103`), not built apart here.
~~~~

## [S12] explorations/compile-ladder/rung-io-writer/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-io-writer/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-io-writer/REPORT.md:9-33, 5698 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-io-writer`: `3b3e83d59` (the change and its two tests), `85236bf98` (an expected failure for a defect measured on the way).

- `Library/FortressLibrary.fsi:1204-1224`, `.fss:1874-1897`, beside `IOFailure`: `object FileNotFoundException extends CheckedException`, with `asString` "File not found" (fork W4); `trait JavaBufferedWriter excludes { String, Number, Boolean, Char, JavaBufferedReader }` with `write(s: FlatString)`, `write(c: Char)`, `flush()` and `close()` as public natives on `fileOps.jbwWriteString`, `jbwWriteChar`, `jbwFlush` and `jbwClose`, and `write(s: String)`, which flattens by a `typecase` on `asFlatString` and calls the native, as `printlnWithThread` does; `trait JavaBufferedReader`, with the mirror excludes clause and no methods (fork W1); the factories `makeJavaBufferedWriter(name: FlatString)` on `jbwOpen`, and `makeJavaBufferedStdOut()` and `makeJavaBufferedStdErr()` on the new helpers.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:738-741` (the object at :740), at the component's end: `private object JavaBufferedWriterObject extends JavaBufferedWriter end`. Its native constructor, the new `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/JavaBufferedWriterObject.java`, registers itself in its Java constructor, as the glue's `Writer` does, so that it is ready when the environment is built; its nested class `Value` is walk's value of the trait and holds a `FortressBufferedWriter`. Walk makes the object's own singleton as it initialises the component (the first run of my test stopped at `FortressBuiltin.fss:740:1-741:2` while `makeNativeObject` raised an error), so `makeNativeObject` answers a `Value` that holds no writer, which no helper is passed. No `builtinPrimitive` string names the constructor.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`: `javaFor` carries `JavaBufferedWriter` by name in `FortressBufferedWriter` (:51-69); `carried` admits that class (:97-101); `unbox` takes the writer out of a `JavaBufferedWriterObject.Value` (:292-295) and `box` makes one from a helper's result (:318). `javaForSelf(String)` already falls through to `javaFor`; only its comment names the trait (:106). A program cannot declare a type of the name, since `FortressLibrary` declares it (`interpreter.md`, "What walk checks").
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:490-491`: the walk-world table maps `FortressBufferedReader` to `Fort
~~~~

## [S13] explorations/compile-ladder/rung-api-method-index/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-api-method-index/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-api-method-index/REPORT.md:14-34, 4262 bytes, cut at 2500.

~~~~
## What changed and why

The code generator asks the trait table, made over the component it compiles, for every trait that an entry of a trait's methods names. A trait of an imported api is in that table only under its api's name (`TraitTable.scala:68-110`). Two places of `STypesUtil` made entries that name such a trait without its api:

1. **`STypesUtil.gatherMethods(tt_name, ...)`** (private), which `allMethods`, `allMethodsNotIdenticallyCovered` and `properlyInheritedMethods` share: it gave the trait's own declarations the type `declaredMethods(ti.ast.getHeader.getName, ...)`, the name of the declaration's header, which in an api's declaration has no api (`STypesUtil.scala:1652` at the base). It now gives them `tt_name`, the name by which the trait table found the trait (`:1666`). `removeIdenticallyCoveredMethods` compares the traits of two methods of one name, `analyzer.lteq(tt2, tt)` (`:1602`), and stopped on the bare name: rows 940 and 1061, and the intersection's owner search that rung I added (`CodeGen.intersectionMethodOwner`, `:7617`).
2. **`STypesUtil.makeSpecialArrowFromFunctionalMethod`**: the special arrow of a functional method, which `OverloadingOracle.lteq` compares (`OverloadingOracle.scala:58-59`), named `f.declaringTrait`, which the index of an api's trait gives without the api, while the declaration's self type names the trait with it. A debug run of the first launch printed, for row 942's program: `DBG special arrow tag declaringTrait api=() text=B selfType=self(ApiTraitOverloadApi.B) ...`. The arrow now names the trait by `nameBySelfType`, the header's name with the api of the self type where the self type names a trait of that text in an api (`STypesUtil.scala:148`, `:150-163`): row 942, whose stack is `OverloadSet.fLessSpecThanG` ← `split` ← `CodeGen.generateTopLevelOverloads` ← `forObjectDeclPrePass`.

Each change alone, in a scratch class folder ahead of the build (`tmp/`, the base's `STypesUtil.scala` with one change put in), linking the three compiled tests and compiling row 1061's under the selection:

    gather ApiTraitOverloadCompiled link: Exception in thread "main" java.lang.RuntimeException: Not in the trait table: B
    gather AsIfApiTraitCompiled link: Exception in thread "main" java.lang.RuntimeException: Not in the trait table: S
    gather IntersectionApiTraitCompiled link: clean
    gather OneLibraryArray1 compile (one): clean
    arrow ApiTraitOverloadCompiled link: clean
    arrow AsIfApiTraitCompiled link
~~~~

## [S14] explorations/compile-ladder/rung-compiled-transaction/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-compiled-transaction/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-compiled-transaction/REPORT.md:11-45, 6801 bytes, cut at 2500.

~~~~
## What changed and why

The compiled path runs an `atomic` block as a transaction of one global sequence lock, buffered writes and validation by value (`runtimeSystem/Transaction.java`), inside a handler that `CodeGen.forAtomicBlock` writes. Six repairs, by declaration:

1. **The handlers of nested blocks and of nested try** (rows 934, 937, 888). `CodeGen.forAtomicBlock` (`CodeGen.java:1782-1814`) and `CodeGen.forTry` (`:2104-2120`) now call `visitTryCatchBlock` after the body's code. The JVM takes the first entry of the exception table that covers a throw, so the entry of a block or a try nested in the body, written when the body is visited, now comes first. `startTransaction` is emitted by `forAtomicBlock` itself, before the range, so the handler runs only when the block's transaction is the task's current one; `forAtomicBlockHelper` (`:1769-1773`) emits the body and `endTransaction`.
2. **A block's own writes** (row 933, fork X1). `Transaction.TXReadLocation` (`Transaction.java:228-248`) returns the transaction's own write before anything else and records nothing for it. A read of an ancestor's write is recorded with that write, and `validateReads` (`:255-268`) compares it with the nearest ancestor's write now, else with the committed value.
3. **A nested block's view** (row 950, fork X3). `Transaction.TXValidate` (`:275-284`) validates the transaction and then each ancestor, at one time of the global lock. `TXAbort` (`:186-189`) throws `TransactionAbortException(this)`, so the abort names the transaction whose read failed, which can be an ancestor of the one that found it. `BaseTask.leaveTransaction` (`BaseTask.java:273-294`) ends the block's own transaction and returns, so that the block starts again, only for an abort of that transaction; an abort that names an ancestor is thrown on.
4. **The shared sets** (row 949, fork X2). Every iteration of a read set or a write set is inside `synchronized` on that set: validation (`Transaction.java:256`), the write-back of a top-level commit (`:332`), the merge of reads (`:341`) and of writes (`:357`) into a parent. `Hashtable`'s own methods take the same monitor, so a put by another thread of the block waits for the iteration. A read and its record are one step under the read set's lock (`:237-246`).
5. **Two initializations of one element** (row 466's note, fork X5). The read of an element that holds nothing is recorded as `EMPTY` (`Transaction.java:77-80`, `:244`), a mark that validation reads as null (`:264
~~~~

## [S15] explorations/compile-ladder/rung-tuple-binding/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-tuple-binding/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-tuple-binding/REPORT.md:13-24, 2543 bytes, cut at 2500.

~~~~
## What changed and why

**The checker** (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:272-277`). A top-level variable's type is read lazily: `Thunker.primeVariables` gives each name of a declaration a thunk that checks the whole declaration once and takes the name's element out of the right side's type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala:198-205`). The checker has a case of its own for a binding of several names to a tuple expression of as many elements (`Decls.scala:250`). It checks each element against its name, then builds a new tuple from the checked elements with `ExprFactory.makeTupleExpr`, which gives the tuple no type. So the thunk read no type, for every name. That is where the names' types were lost. A reference to a name without a type returns its expression unchecked and reports nothing (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:634`): this is row 474's "accepted anywhere" and its block that ends without an error, and the unchecked expression is the intermediate node of row 988's stop. The repair gives the rebuilt tuple the tuple type of its checked elements. The case for any other right side, a call or a variable, already typed its names; it is not changed, and neither is a single binding or a local tuple binding.

**The code generator** (`CodeGen.java:6481-6570`). `forVarDeclPrePass` threw for a left side of more than one name. It now hands such a declaration to `forTupleVarDeclPrePass`:

- the right side becomes the value of one hidden top-level variable of the right side's tuple type, a class `<Component>$tuple$<first name>` made by the same `generateVarDeclInnerClass` that makes every top-level variable's class;
- each name gets its own class, as a top-level variable has, whose initializer reads the hidden variable's field and calls the tuple's typed getter for its element; a mutable name's field holds a `MutableFValue` cell, as a single mutable variable's does;
- `addTopLevelVarBinding` registers each name's binding before any code is generated, as it does for a single variable, so a name is visible to initializers above it and to importing components under the usual class name;
- a wildcard `_` binds nothing and gets no class; the hidden class is named after the first name that is no wildcard, and a binding of wildcards only emits nothing.

`generateVarDeclInnerClass` gained an overload that takes the code that pushes the value; th
~~~~

## [S16] explorations/compile-ladder/rung-number-payload-objects/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-payload-objects/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-number-payload-objects/REPORT.md:17-38, 5779 bytes, cut at 2500.

~~~~
## What changed and why

P-178 makes each built-in number type one `value object` on both paths before the switch-over, the prelude by P-37's second exception; its detail, the carriers' review's way D, takes way C's machinery, and form 2 inside it: the code generator writes the object's class over a small hand-written payload class that extends nothing generated. The commits, on `wip/rung-number-payload-objects`: `d226bed17c` (tests first), `b9aa895753` (the change), `6465bd6678` (row 496's ZZ32 test promoted), `18f5a81d9b` (an expected failure measured on the way, row 1080), `c29eae9933` (a test of today's refusal of an excluded `typecase` clause, row 1081).

1. **The prelude's text.** `CompilerBuiltin.fsi:103`, `:147`, `:210`, `:273`, `:332`, `:401`, `:444` and `CompilerBuiltin.fss:516`, `:577`, `:662`, `:753`, `:818`, `:893`, `:955`: `trait ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] } excludes { ZZ64, RR32, RR64 }` becomes `value object ZZ32 extends { Number, Equality[\ZZ32\], StandardTotalOrder[\ZZ32\] }`, and the same for `ZZ`, `ZZ64`, `NN32`, `NN64`, `RR64` and `RR32`. Each `excludes` clause goes, since an object excludes every type that is not its supertype (`types-vals-vars.tex:288`). No body changed: `git diff c799851472 -- ProjectFortress/LibraryBuiltin` shows 14 lines, the seven headers in each file.
2. **The payload classes.** `runtimeValues/FZZ32.java` and its six siblings become `public abstract class FZZ32 extends FValue`, with the value field, a protected constructor, `getValue()`, `toString()` and the rest as before (`asString`, `makeSize`, `plus`, `make(BigInteger)` where the base had them). `make(x)` calls the object's class's static `make` through a method handle (fork N2), held in a nested `Make` class; the nested `RTTIc.ONLY`, which the run time reads for a static argument named by the payload class (`runtimeSystem/MethodInstantiater.java:137-141`), is the object's class's static `RTTI`. Both are found by the name that the new `runtimeValues/LibraryNames.java` gives (`:30-32`): `fortress.CompilerBuiltin$ZZ32` where the compiled path reads the prelude, and none where `WellKnownNames.compiledPathUsesOneLibrary` selects the one library (fork N4), where a value made raises 'The number type ZZ32 of the library that the compiled path reads is not compiled over ...FZZ32'. The stub file `src/fortress/CompilerBuiltin.java` loses its seven interfaces (70 lines); the build's dependency pass removed their old class files 
~~~~

## [S17] explorations/compile-ladder/rung-number-objects/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-objects/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-number-objects/REPORT.md:15-75, 10096 bytes, cut at 2500.

~~~~
## What changed and why

P-178 asks that each built-in number type be one `value object` under its own name, as `NN32` and `RR32` already are, and that walk's native objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` go. The one library had the pattern `trait ZZ32 ... excludes {...} comprises { Int }` with `value object Int extends ZZ32` in `FortressBuiltin`; a program could not name the object as a type to good effect, but it could extend the trait (row 551), and the trait's 56 bodies through `asFloat(self)` ran only under `asif RR64`.

### The library's text, by file (`git diff --numstat -M 647163a9c4 HEAD`)

| File | Added | Deleted | What |
|---|---|---|---|
| `Library/FortressLibrary.fss` | 164 | 80 | five `trait X ... excludes ... comprises { O }` become `value object X ...`; each takes its object's members |
| `Library/FortressLibrary.fsi` | 11 | 21 | the five headers; `abstract` off the five `asFloat` |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` | 1 | 186 | the five objects deleted; `RR32`'s `opr ^(self, b:Float)` names `RR64` (`:191`) |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` | 1 | 15 | the five objects' declarations deleted; `RR32`'s `^` at `RR64` (`:107`) |
| `Library/ReflectiveQuickCheck.fss` | 4 | 4 | the comment of `adaptType`: its example `Float` below `RR64` becomes `FlatString` below `String` |

The members each type took from its object (the merge was made by a script that matched members by name and parameter types, the object's `Float` read as `RR64`):

- `ZZ32` (`Library/FortressLibrary.fss:846`) from `Int`: the getters `asString` and `asExprString` (`simpleIntArith.intToString`), placed after `one`, since an object's getters stand before its methods; the body of `asFloat` (`intToDouble`) in place of the trait's abstract declaration.
- `ZZ64` (`:951`) from `Long`: `asString`, `asExprString` (`longToString`), `asFloat` (`longToDouble`).
- `ZZ` (`:1170`) from `BigNum`: `asString`, `asExprString` (`simpleArbitraryPrecisionArith.toString`), `asFloat` (`toDouble`).
- `NN64` (`:1063`) from `UnsignedLong`: the getters `zero` and `one`, which the trait lacked, and `asString`, `asExprString` (`unsignedLongToString`), before the trait's first getter; `asFloat` (`unsignedLongToDouble`).
- `RR64` (`:384`) from `Float`, 61 bindings: the getters `asString` and `asExprString` (new, after `one`); the bodies of the getters `isNaN`, `isInfinite`, `rawBits`, `signBit`, `nextUp`, `nextDown`; `asFloat(self) = self`; `nar
~~~~

## [S18] explorations/compile-ladder/rung-number-payload-objects/REPORT.md, "The design as built (a point to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-payload-objects/REPORT.md#The design as built (a point to report)'`

explorations/compile-ladder/rung-number-payload-objects/REPORT.md:40-46, 1684 bytes.

~~~~
## The design as built (a point to report)

- **The payload classes:** `FZZ32`, `FZZ64`, `FZZ`, `FNN32`, `FNN64`, `FRR32`, `FRR64` in `compiler/runtimeValues/`, each `abstract` over `FValue`, holding `int`, `long`, `BigInteger` (made from its digits), `int`, `long`, `float`, `double`.
- **The table of payload objects:** `NamingCzar.payloadObjects` (`NamingCzar.java:615-623`), seven rows of the prelude's api `CompilerBuiltin`.
- **What the code generator writes for such an object:** a final class `fortress/CompilerBuiltin$T` extending the payload class and implementing the traits of its `extends` clause and `ValueObjectMark`; a constructor `(payload)V`; `static make(payload)` answering the payload class's type; forwarders for every trait's bodies; its own methods as instance methods; `getRTTI()` and the static `RTTI` field; an RTTI class whose `javaRep` is the object's class and whose `className()` names the payload class.
- **How Java code makes a value:** `FZZ32.make(int)` (and its siblings), which the wrapper generator (`compiler/nativeInterface/FortressMethodAdapter.java:139-155`), the helpers and the class loader's sizes (`FZZ32.makeSize`) call, reaches `fortress.CompilerBuiltin$ZZ32.make` through the method handle that `LibraryNames.factory` finds, by name, with the payload class's loader, without initialising the class.
- **The one name of a payload object's type:** the payload class, `com/sun/fortress/compiler/runtimeValues/FZZ32`, in every descriptor, in every stamped instance (`Box⟦com|sun|fortress|compiler|runtimeValues|FZZ32⟧`) and in the RTTI's `className()`. Only the class that holds the methods and the static `RTTI` field is the object's.
~~~~

## [S19] explorations/compile-ladder/rung-closure-name-once/REPORT.md, "4. The naming as built"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-closure-name-once/REPORT.md#4. The naming as built'`

explorations/compile-ladder/rung-closure-name-once/REPORT.md:88-99, 1710 bytes.

~~~~
## 4. The naming as built

- The thunk keeps today's name: `forFnExpr` names its class (`CodeGen.java:3954`) before it compiles the body (`:3989`), and the reduction's closure is inside that body, so the code generator meets the thunk first. The reduction's closure is `...#2`.
- The ordinal follows the order in which `forFnExpr` and `localFunctionClosure` are entered for the component. Two function expressions at one span lie in one declaration's body, one inside the other, so their order is the tree's; the order in which the code generator writes a class's methods or a dispatch method's tests (row 996) does not enter. The set is a `HashSet` that is only added to; its order is never read.
- The set is made with the component's `CodeGen` (`CodeGen.java:423`), so the names are the same from compile to compile, also in a JVM that compiled other components first, as the test suites' JVMs do.
- Shown: each test program compiled cold twice, once with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0`, each in a fresh copy of the caches, the jars compared by `zipfile` (unzip rewrites the backslashes of the mangled names): the same 14 entries for `ConditionalReductionCompiled` and the same 10 for `OneLibraryConditionalReduction`, and every entry's bytes the same; both runs of the compiled program printed `PASS`.

      ConditionalReductionCompiled$\=fn@11\!64-89#2⟦⟧.class 51eff2df98 same bytes
      ConditionalReductionCompiled$\=fn@11\!64-89⟦⟧.class 4babf078d9 same bytes
      ConditionalReductionCompiled$\=fn@7\!36-50#2.class 867298951c same bytes
      ConditionalReductionCompiled$\=fn@7\!36-50.class f59505a2c9 same bytes
        entries whose bytes differ between the modes: 0 []
~~~~
