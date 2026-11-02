<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that b0f6cd6b7..43cd61b62 added, changed or removed (the batch 24, landed at 25238e60c, and the landing's own steps to 43cd61b62), written by evidence.py. -->

# The entries that the range changed

- The batch, b0f6cd6b7..25238e60c: 17 entries: F-24, F-32, F-34, F-53, F-132, F-181, F-240, F-270, F-281, F-298, F-299, F-303, F-304, F-305, F-306, F-307, F-308
- After the landing, 25238e60c..43cd61b62: 0 entries
- Now over 600 characters: 17 of 17: F-24, F-32, F-34, F-53, F-132, F-181, F-240, F-270, F-281, F-298, F-299, F-303, F-304, F-305, F-306, F-307, F-308

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-24, changed

- Size: at the base 868 characters; at the landing 1058 characters; now 1058 characters, over 600.
- Section now: "Execution model".

At the base:

- F-24 **Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees.** It throws a `FortressError` that holds the exception's object, as `Int.overflow()` does for `IntegerOverflow` (F-132; row 347, fixed). A native bound to a helper of `nativeHelpers/` raises the library's own exception where the helper raises a class of the compiled prelude, such as `fortress.CompilerBuiltin$DivisionByZero`, so `ZZ32`'s `DIV` by zero raises `DivisionByZero` (F-299). Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes, so a division by zero elsewhere ends the run (rows 336, 848). Gated by the `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`, and for a helper by `tests/NativeHelperRaiseWalk.fss` and `tests/ZZ32DivisionByZeroWalk.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` section 4.1.

Now:

- F-24 **Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees.** It throws a `FortressError` that holds the exception's object, as `Int.overflow()` does for `IntegerOverflow` (F-132; row 347, fixed). A native bound to a helper of `nativeHelpers/` raises the library's own exception where the helper raises a class of the compiled prelude, such as `fortress.CompilerBuiltin$DivisionByZero`, so `DIV` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raises `DivisionByZero` (F-299, F-306, F-308). Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes, so a division by zero elsewhere ends the run (rows 336, 848). Gated by the `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`, and for a helper by `tests/NativeHelperRaiseWalk.fss`, `tests/ZZ32DivisionByZeroWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `tests/NN32DivisionByZeroWalk.fss` and `tests/NN64DivisionByZeroWalk.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` section 4.1.

History blocks of the range:

- Written by the gather: 2026-10-31 15:16Z · rewritten · from `explorations/compile-ladder/rung-natives-integers/REPORT.md`, "Sentences made false" · by climb batch 24 gather: rung Z: ZZ64 and ZZ DIV by zero raise DivisionByZero (cites [S1])
- Written by the gather: 2026-10-31 15:25Z · rewritten · from `explorations/compile-ladder/rung-natives-hard/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: rung H: NN32 and NN64 DIV by zero raise DivisionByZero (cites [S2])
- Written by the merged-diff review: 2026-10-31 15:57Z · rewritten · by climb batch 24 merged-diff review: a missing comma between two of its tests

## F-32, changed

- Size: at the base 2068 characters; at the landing 2069 characters; now 2069 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that most of the one library's native bindings name: of its 449 live bindings, 428 name one.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 21 that name one). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 24 are `IntLiteral`'s five conversions `asZZ32` to `asZZ` and 19 of its operators (`FortressBuiltin.fss:489-554`), 4 among the 154 and 20 among the 158; none of them can move yet, since their helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76; row 578). Every program's output needs `Writer`'s natives, among the 36 I/O methods, since `println` writes through a native `Writer`. MicroGPT also needs `nanoTime`, which needs a new helper, since the compiled one returns `RR64`; `getProgramArgsPrim`, which `System` calls as it loads; and `NativeArray`. The last two have no compiled analogue. The 42 with no analogue: `NativeArray` waits for the array decision on how a float vector's `double[]` store goes (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path. Detail: `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

Now:

- F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that most of the one library's native bindings name: of its 449 live bindings, 276 name one.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 173 that name one). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 24 are `IntLiteral`'s five conversions `asZZ32` to `asZZ` and 19 of its operators (`FortressBuiltin.fss:489-554`), 4 among the 154 and 20 among the 158; none of them can move yet, since their helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76; row 578). Every program's output needs `Writer`'s natives, among the 36 I/O methods, since `println` writes through a native `Writer`. MicroGPT also needs `nanoTime`, which needs a new helper, since the compiled one returns `RR64`; `getProgramArgsPrim`, which `System` calls as it loads; and `NativeArray`. The last two have no compiled analogue. The 42 with no analogue: `NativeArray` waits for the array decision on how a float vector's `double[]` store goes (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path. Detail: `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

History blocks of the range:

- Written by the gather: 2026-10-31 15:12Z · rewritten · from `explorations/compile-ladder/rung-natives-float/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung F's 30 (cites [S3])
- Written by the gather: 2026-10-31 15:15Z · rewritten · from `explorations/compile-ladder/rung-natives-choose/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: the count with rung K's two (cites [S4])
- Written by the gather: 2026-10-31 15:16Z · rewritten · from `explorations/compile-ladder/rung-natives-integers/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung Z's 36 (cites [S1])
- Written by the gather: 2026-10-31 15:18Z · rewritten · from `explorations/compile-ladder/rung-natives-small/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung S's eight (cites [S5])
- Written by the gather: 2026-10-31 15:25Z · rewritten · from `explorations/compile-ladder/rung-natives-hard/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: the count with rung H's 76, the merged tree's (cites [S2])

## F-34, changed

- Size: at the base 1165 characters; at the landing 1202 characters; now 1202 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-34 **Under the switch-over's setting the code generator refuses 52 declarations of the library's twelve components, all of them declarations that the checker passes.** Measured once on climb batch 22's code (`2bff2fe23`), with the checker's failures caught per declaration and the bound `Any`, the distance stage's setting: `FortressLibrary` 28, `RangeInternals` 11, `List` and `String` 5 each, and `FlatString`, `Stream` and `NatReflect` 1 each. A declaration counts at its first wall, and no emitted class was run, so after the switch-over the code generator stands between the library and bytecode at 52 declarations at least. Each kind has a ledger row; the kinds include a local function (row 304), varargs (row 624), `asif` (row 818), "Not in the trait table" (row 733) and a header `where` clause (row 701). On climb batch 21b's base (`aa5c67d48`) the dispatch generator refused none of `FortressLibrary`'s 178 overload sets. No test checks it, since the gate's distance stage runs no code generation. Detail: `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4", item 4; `perf-probes/codegen-distance/REPORT.md`, sections 2 to 6.

Now:

- F-34 **Under the switch-over's setting the code generator refuses 52 declarations of the library's twelve components, all of them declarations that the checker passes.** Measured once on climb batch 22's code (`2bff2fe23`), with the checker's failures caught per declaration and the bound `Any`, the distance stage's setting: `FortressLibrary` 28, `RangeInternals` 11, `List` and `String` 5 each, and `FlatString`, `Stream` and `NatReflect` 1 each. A declaration counts at its first wall, and no emitted class was run, so after the switch-over the code generator stands between the library and bytecode at 52 declarations at least. Each kind has a ledger row; the kinds include a local function (row 304), varargs (row 624), `asif` (row 818), "Not in the trait table" (row 733) and a header `where` clause, which the code generator now compiles (F-181). On climb batch 21b's base (`aa5c67d48`) the dispatch generator refused none of `FortressLibrary`'s 178 overload sets. No test checks it, since the gate's distance stage runs no code generation. Detail: `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4", item 4; `perf-probes/codegen-distance/REPORT.md`, sections 2 to 6.

History blocks of the range:

- Written by the gather: 2026-10-31 15:22Z · rewritten · from `explorations/compile-ladder/rung-codegen-where/REPORT.md`, "7. Sentences made false" · by climb batch 24 gather: rung G: the header where clause no longer a wall (cites [S6])

Report sections that the entry cites: [S7] `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4".

## F-53, changed

- Size: at the base 1701 characters; at the landing 1701 characters; now 1701 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 23's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 24's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-10-31 16:07Z · rewritten · by climb batch 24 commit stage: the landed figures of climb batch 24 gate, read from explorations/compile-ladder/climb-batch-24/gate/distance.txt (#distance line: setting compile, 14 components; #total 0) and checker-count.txt (#total 0): the distance 0 to 0, the count 0 to 0; the last landed gate's batch 23 to 24 in the title; numbers only

Report sections that the entry cites: [S8] `references/batch.md`, "The checker count and the distance".

## F-132, changed

- Size: at the base 1196 characters; at the landing 1187 characters; now 1187 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-132 **Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow` when the result does not fit, as the specification says.** It builds P-73. Every arithmetic operation on a fixed width whose result can leave its type raises it, `^`, `CHOOSE` and `LCM` included, and a program can catch it. Three kinds of operation raise nothing: the wrapping operators (F-130) and `narrow`, the written conversion of a `ZZ64` to `ZZ32` or an `NN64` to `NN32` (P-72), which keep the low bits; and the shifts `LSHIFT` and `RSHIFT`, which lose the bits shifted out (F-125). Gated by `tests/FixedWidthOverflowRungB.fss` (`+`, `-`, `DOT` (`·`), `DIV`, negation and absolute value, on the four fixed widths) and `tests/PowChooseLcmRungE.fss` (`^`, `CHOOSE` and `LCM`). The compiled path is outside this fact. Its known gaps: the compiler prelude's ranges raise `IntegerOverflow` where their bounds sum beyond `ZZ32` (row 453); `^` saturates, throws an uncatchable Java exception or adds (rows 523 to 525); and `CHOOSE` past its helper's table dies with a Java exception (row 521). Detail: `compile-ladder/rung-overflow-natives/REPORT.md` section 13; `compile-ladder/rung-size-range/REPORT.md` section 12.

Now:

- F-132 **Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow` when the result does not fit, as the specification says.** It builds P-73. Every arithmetic operation on a fixed width whose result can leave its type raises it, `^`, `CHOOSE` and `LCM` included, and a program can catch it. Three kinds of operation raise nothing: the wrapping operators (F-130) and `narrow`, the written conversion of a `ZZ64` to `ZZ32` or an `NN64` to `NN32` (P-72), which keep the low bits; and the shifts `LSHIFT` and `RSHIFT`, which lose the bits shifted out (F-125). Gated by `tests/FixedWidthOverflowRungB.fss` (`+`, `-`, `DOT` (`·`), `DIV`, negation and absolute value, on the four fixed widths) and `tests/PowChooseLcmRungE.fss` (`^`, `CHOOSE` and `LCM`). The compiled path is outside this fact. Its known gaps: the compiler prelude's ranges raise `IntegerOverflow` where their bounds sum beyond `ZZ32` (row 453); and `^` saturates, throws an uncatchable Java exception or adds (rows 523 to 525). Its `CHOOSE` raises `IntegerOverflow` as walk's does (F-305). Detail: `compile-ladder/rung-overflow-natives/REPORT.md` section 13; `compile-ladder/rung-size-range/REPORT.md` section 12.

History blocks of the range:

- Written by the gather: 2026-10-31 15:15Z · rewritten · from `explorations/compile-ladder/rung-natives-choose/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: row 521 fixed by rung K (cites [S4])

## F-181, changed

- Size: at the base 1197 characters; at the landing 1592 characters; now 1592 characters, over 600.
- Section now: "The territory map".

At the base:

- F-181 **The code generator refuses every function, method, object and trait declaration that carries a `where` clause in its own header, and every function or method with a contract (row 701).** A `where` clause on an `extends` entry, and a trait's or object's contract, do not reach this refusal; F-255 says how each path reads them (rows 774 and 781). The `fortress-repo` skill's `references/compiler.md`, "What the compiled path cannot compile yet", gives this refusal and the constructs that the code generator has no case for, a local function among them (row 304). An array comprehension has no case either. In a probe, a scratch copy of `CodeGen.java` let a `where` clause that only binds static parameters past the trait guard. A component with a trait of the shape of the library's `NatParam`, `trait NatP comprises { Nn[\n\] } where [\ nat n \]`, then compiled and ran; its clause binds a size and states no constraint. `compiler_tests/XXXNatOpenRun`, which reads such a value's size from its run-time descriptor at a call, compiled and failed verification (row 307). Detail: `coordinator/map/spec-to-implementation.md` section 3; `perf-probes/where-clauses/REPORT.md` A.7 (the probe).

Now:

- F-181 **The code generator compiles a function, method, object or trait declaration that carries a `where` clause in its own header, emitting nothing for the clause, and refuses every function or method with a contract (row 701).** The clause's constraints are the checker's. A trait's or object's contract does not reach the refusal: the disambiguator drops it (row 781); F-255 says how each path reads a `where` clause on an `extends` entry (row 774). Walk checks a function's `requires` clause and raises `CallerViolation`. The `fortress-repo` skill's `references/compiler.md`, "What the compiled path cannot compile yet", gives the refusal and the constructs that the code generator has no case for, a local function among them (row 304); an array comprehension has no case either. A trait whose `comprises` clause lists a type at a `where`-clause size, of `NatParam`'s shape, compiles; a call that opens its value to the size fails verification (row 307). Where a generic type that such a clause lists gives a member's body, the code generator crashes first (row 812). A function's or method's own clause that introduces a `where`-clause variable compiles, and the compiled call dies with `NoClassDefFoundError` (row 867). Tests: `compiler_tests/WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`; `XXXFunctionContractCodeGeneration`; the `XXXNatOpenRun` pair; the `XXXWhereVariableCallCompiled` pair. Detail: `compile-ladder/rung-codegen-where/REPORT.md`, sections 1, 2 and 5.

History blocks of the range:

- Written by the gather: 2026-10-31 15:22Z · rewritten · from `explorations/compile-ladder/rung-codegen-where/REPORT.md`, "1. What changed, and why" · by climb batch 24 gather: rung G record.md, FACTS.md: the where half of row 701 fixed (cites [S9])

Report sections that the entry cites: [S10] `references/compiler.md`, "What the compiled path cannot compile yet".

## F-240, changed

- Size: at the base 1812 characters; at the landing 1833 characters; now 1833 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 155 s and its distance stage 240 s at the last landed gate, climb batch 23's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 23's it stayed between about 150 s and 170 s, which no batch moved beyond noise: on climb batch 22c's base the stage took 163 to 179 s in six runs, at loads of 0.15 to 1.37, and on climb batch 23's trees 130 to 161 s, at loads of up to 7.6. The count table records no seconds, so its time is the gate's call times; the distance stage (`FortressLibrary` 174 s), over fourteen components, ran at a load of 1.54, against 238 s (174 s) at 1.70 at climb batch 22c's. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the gate's call times and `compile-ladder/climb-batch-23/gate/distance.txt`. Detail: `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 150 s and its distance stage 198 s at the last landed gate, climb batch 24's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 23's it stayed between about 150 s and 170 s, which no batch moved beyond noise: on climb batch 22c's base the stage took 163 to 179 s in six runs, at loads of 0.15 to 1.37, and on climb batch 23's trees 130 to 161 s, at loads of up to 7.6. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 152 s), over fourteen components, ran at a load of 1.84, against 240 s (174 s) at 1.54 at climb batch 23's. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-24/gate/distance.txt`. Detail: `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-10-31 16:07Z · rewritten · by climb batch 24 commit stage: the landed figures of climb batch 24 gate: the count stage about 150 s, 152 s from the file times of the gate's log, the count stage's start (16:01:12 UTC) to its last write (16:03:44 UTC); the distance stage 198 s (FortressLibrary 152 s) from explorations/compile-ladder/climb-batch-24/gate/distance.txt, its #seconds line, at a load of 1.84, the first load of its #machine line, over 14 components, its #distance line; compared against climb batch 23's 240 s (174 s) at 1.54, which F-240 gave before; the batch 23 to 24 in the title and in the cited path; the source named as the file times of the gate's log in place of its call times; numbers only

## F-270, changed

- Size: at the base 1610 characters; at the landing 1676 characters; now 1676 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-270 **The compiled checker opens a value of a trait whose `comprises` clause lists a type at a `where`-clause size: it gives each listed type's `nat` and `int` `where`-clause sizes a fresh name for the call.** In `trait NatParam comprises { N[\n\] } where [\ nat n \]`, a `NatParam` passed where `N[\$n\]` is expected, `$n` being the checker's inference variable for the called function's size parameter, binds `$n` to the fresh size, and the call's result type carries it. An opened size is not known to differ from any size. Walk's `comprises` check at load reads such a size as any size, the same at each of its places; at a call, walk binds the argument's own size. This is way 4a of fork 3 of the array design, a size known only at run time: the checker reads such a size as fixed for that call, not as unknown. P-85 leaves the array design's three questions open with no default; the third stands on this ground, and way 4a is the one way built on it. The code generator does not compile such a trait: "Can't compile TraitDecl NatParamT" (row 307; `compiler_tests/XXXNatOpenRun`). In row 682's program, with `trait NatParamT comprises { Nt[\n\] } where [\nat n\]`, the checker refuses `f(x: NatParamT)` beside `f[\nat n\](x: Nt[\n\])` as two declarations of one parameter type, where walk runs the pair (row 682, contested). F-251 holds the same opening for a type variable. Gated by `compiler_tests/NatOpenChecker`, and under walk by `tests/NatOpenWalk` and `NatOpenUnlistedExtender`. Detail: `compile-ladder/rung-size-expressions/REPORT.md` section 1, "Fork 3, way 4a, under Q13.3", and section 12.

Now:

- F-270 **The compiled checker opens a value of a trait whose `comprises` clause lists a type at a `where`-clause size: it gives each listed type's `nat` and `int` `where`-clause sizes a fresh name for the call.** In `trait NatParam comprises { N[\n\] } where [\ nat n \]`, a `NatParam` passed where `N[\$n\]` is expected, `$n` being the checker's inference variable for the called function's size parameter, binds `$n` to the fresh size, and the call's result type carries it. An opened size is not known to differ from any size. Walk's `comprises` check at load reads such a size as any size, the same at each of its places; at a call, walk binds the argument's own size. This is way 4a of fork 3 of the array design, a size known only at run time: the checker reads such a size as fixed for that call, not as unknown. P-85 leaves the array design's three questions open with no default; the third stands on this ground, and way 4a is the one way built on it. The code generator compiles such a trait, and a compiled call that opens its value to the size fails the JVM's verification (row 307; `compiler_tests/XXXNatOpenRun`, with `NatOpenRunLink.test`). In row 682's program, with `trait NatParamT comprises { Nt[\n\] } where [\nat n\]`, the checker refuses `f(x: NatParamT)` beside `f[\nat n\](x: Nt[\n\])` as two declarations of one parameter type, where walk runs the pair (row 682, contested). F-251 holds the same opening for a type variable. Gated by `compiler_tests/NatOpenChecker`, and under walk by `tests/NatOpenWalk` and `NatOpenUnlistedExtender`. Detail: `compile-ladder/rung-size-expressions/REPORT.md` section 1, "Fork 3, way 4a, under Q13.3", and section 12.

History blocks of the range:

- Written by the gather: 2026-10-31 15:22Z · rewritten · from `explorations/compile-ladder/rung-codegen-where/REPORT.md`, "7. Sentences made false" · by climb batch 24 gather: rung G: the trait compiles; its call fails verification (cites [S6])

## F-281, changed

- Size: at the base 1460 characters; at the landing 1501 characters; now 1501 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-281 **The compiled checker checks the overloading of every operator, symbolic ones included; with them checked, the distance and the count are 0, with no crash (F-53).** Its three loops, over the top-level set, a trait's provided methods and their overriding return types, read `isCheckedName`, which admits every operator (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:766-773`); the export check reads every operator too, each under its declared name only (F-287). An on-demand import adds an api's declarations once, and leaves out a name its `except` clause lists; the check still reads an on-demand api's declaration of a name the component imports by name from another api (row 813), and an `except` that lists an operator leaves it imported on both paths (row 814). Outside its trait, a self type whose `comprises` clause lists types at a `where`-clause variable is read as the trait type (`TypeAnalyzer.selfComprised`), so `AnyList`'s `||` is checked; such a program still stops in the code generator (row 812; row 701). So the distance stage is the full check of F-245. Gated by `compiler_tests/XXXSymbolicOperatorOverloadUnrelated`, `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `OperatorPrefixInfixImport` and `ImportExceptOverload`, and by the stages ('#total 0', '#crash none'; '#total 0'). Detail: `compile-ladder/rung-symbolic-check/REPORT.md` sections 1, 3 and 5.

Now:

- F-281 **The compiled checker checks the overloading of every operator, symbolic ones included; with them checked, the distance and the count are 0, with no crash (F-53).** Its three loops, over the top-level set, a trait's provided methods and their overriding return types, read `isCheckedName`, which admits every operator (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:766-773`); the export check reads every operator too, each under its declared name only (F-287). An on-demand import adds an api's declarations once, and leaves out a name its `except` clause lists; the check still reads an on-demand api's declaration of a name the component imports by name from another api (row 813), and an `except` that lists an operator leaves it imported on both paths (row 814). Outside its trait, a self type whose `comprises` clause lists types at a `where`-clause variable is read as the trait type (`TypeAnalyzer.selfComprised`), so `AnyList`'s `||` is checked; such a program still stops in the code generator where a listed generic type gives a member's body (row 812). So the distance stage is the full check of F-245. Gated by `compiler_tests/XXXSymbolicOperatorOverloadUnrelated`, `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `OperatorPrefixInfixImport` and `ImportExceptOverload`, and by the stages ('#total 0', '#crash none'; '#total 0'). Detail: `compile-ladder/rung-symbolic-check/REPORT.md` sections 1, 3 and 5.

History blocks of the range:

- Written by the gather: 2026-10-31 15:22Z · rewritten · from `explorations/compile-ladder/rung-codegen-where/REPORT.md`, "7. Sentences made false" · by climb batch 24 gather: rung G: row 701's half gone (cites [S6])

## F-298, changed

- Size: at the base 1897 characters; at the landing 2156 characters; now 2156 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-298 **A `builtinPrimitive` body whose string names a static helper of `nativeHelpers/` compiles on the compiled path as a call of that helper.** At the parse, on every repository but walk's (`Shell.specificRepository`, `Shell.java:102-103`), a body that is exactly `builtinPrimitive("pkg.Class.method")`, its string under `com.sun.fortress.nativeHelpers.` and naming a public static method, becomes a call through a synthetic `import java` of the helper, `self` first for a method of a trait or object, so the checker checks the declaration against the helper's Java signature (P-58; `compiler/BuiltinPrimitiveRewriter.java:46-64`, `:87-123`; `compiler/Parser.java:157-159`, `:329-330`). A string under that package that names no public static method is a static error at the string, 'builtinPrimitive names no static helper: …'; every other string, the glue classes among them, stays a call of `builtinPrimitive[\T\](javaClass:String):T` (`LibraryBuiltin/FortressBuiltin.fsi:30`), which the checker types at the declared return type, the body's expected type (`scala_src/typechecker/impls/Decls.scala:217-221`), against no Java signature, and so does a declaration with a varargs parameter (row 849). In walk's world the checker reads the helper's Java types as the one library's, `int` as `ZZ32`, `String` as `String` (`compiler/NamingCzar.java:369-372`, `:464-505`), and so does walk's own reading of a written `import java` (F-180; row 845). Such a body compiles to the same bytes as a written `import java` alias call, through the helper's generated wrapper (F-301). Test: `compiler_tests/NativeHelperBindingCompiled`, with `XXXNativeHelperMisfitCompiled`, `XXXNativeHelperMisspeltCompiled` and `XXXNativeHelperOutsidePackageCompiled`; the reading in walk's world, `NamingCzarJUTest.testForeignOneLibrary`. Detail: `compile-ladder/rung-natives-compiled/REPORT.md`, "What changed and why".

Now:

- F-298 **A `builtinPrimitive` body whose string names a static helper of `nativeHelpers/` compiles on the compiled path as a call of that helper.** At the parse, on every repository but walk's (`Shell.specificRepository`, `Shell.java:102-103`), a body that is exactly `builtinPrimitive("pkg.Class.method")`, its string under `com.sun.fortress.nativeHelpers.` and naming a public static method, becomes a call through a synthetic `import java` of the helper, `self` first for a method of a trait or object, so the checker checks the declaration against the helper's Java signature (P-58; `compiler/BuiltinPrimitiveRewriter.java:54-72`, `:97-159`; `compiler/Parser.java:157-159`, `:329-330`). A string under that package that names no public static method is a static error at the string, 'builtinPrimitive names no static helper: …'; every other string, the glue classes among them, stays a call of `builtinPrimitive[\T\](javaClass:String):T` (`LibraryBuiltin/FortressBuiltin.fsi:30`), which the checker types at the declared return type, the body's expected type (`scala_src/typechecker/impls/Decls.scala:217-221`), against no Java signature, and so does a declaration with a varargs parameter (row 849). In walk's world the checker reads the helper's Java types as the one library's, `int` as `ZZ32`, `String` as `String` (`compiler/NamingCzar.java:369-372`, `:464-505`), and so does walk's own reading of a written `import java` (F-180; row 845); where the declaration gives `NN32`, `NN64` or `Char` to a position whose Java `int` or `long` the checker reads as `ZZ32` or `ZZ64`, the rewrite puts the matching transfer helper around that argument or the call, so the checker reads the composition (F-308). Such a body compiles to the same bytes as a written `import java` alias call, through the helper's generated wrapper (F-301). Test: `compiler_tests/NativeHelperBindingCompiled`, with `XXXNativeHelperMisfitCompiled`, `XXXNativeHelperMisspeltCompiled` and `XXXNativeHelperOutsidePackageCompiled`; the reading in walk's world, `NamingCzarJUTest.testForeignOneLibrary`. Detail: `compile-ladder/rung-natives-compiled/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-10-31 15:25Z · rewritten · from `explorations/compile-ladder/rung-natives-hard/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: rung H: the transfers (cites [S2])
- Written by the merged-diff review: 2026-10-31 15:57Z · rewritten · by climb batch 24 merged-diff review: the rewriter's citations moved by rung H's hunk: rewrite() is now :54-72 and fn() :97-159 (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java)

Report sections that the entry cites: [S11] `compile-ladder/rung-natives-compiled/REPORT.md`, "What changed and why".

## F-299, changed

- Size: at the base 1620 characters; at the landing 2789 characters; now 2789 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 21 of the one library's 449 live bindings name one.** The loader (`interpreter/glue/StaticNativeApp.java`, reached from `NativeApp.checkAndLoadNative`, `interpreter/glue/NativeApp.java:194-201`) takes the helper's overload whose Java parameter and result types carry the declared types, `self` first, carries each value at its declared type, and refuses at load a string under `com.sun.fortress.nativeHelpers.` that names no static method, fits no overload, or has a declared parameter or result type that no Java type carries. It reads a method's `self` only by the helper's Java type, so a binding in a method of a program's own type loads (row 847). It raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. The 21: 19 of trait `ZZ32`'s operators and functions (`Library/FortressLibrary.fss:741-810`) and `Int`'s `asString` and `asExprString` (`LibraryBuiltin/FortressBuiltin.fss:371`, `:373`); the other 428 still name glue classes, `ZZ32`'s `CHOOSE` among them (row 521). With F-298 the compiled checker reads the 21 against their helpers' Java signatures from this step on (P-58). A native over `String`, helper or glue class alike, receives a non-flat string's type name (row 846). Test: `tests/NativeHelperBindingWalk.fss`, with `NativeHelperFamilyZZ32Walk`, `NativeHelperRaiseWalk`, `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk` and `ZZ32DivisionByZeroWalk`. Detail: `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why".

Now:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 173 of the one library's 449 live bindings name one.** The loader (`interpreter/glue/StaticNativeApp.java`, reached from `NativeApp.checkAndLoadNative`, `interpreter/glue/NativeApp.java:200-207`) takes the helper's overload whose Java parameter and result types carry the declared types, `self` first, carries each value at its declared type, and refuses at load a string under `com.sun.fortress.nativeHelpers.` that names no static method, fits no overload, or has a declared parameter or result type that no Java type carries. For a method it is told the declaring type, `MethodClosure`'s definer or `FunctionalMethod`'s self type: it refuses at load a type that no Java type carries ('no Java type carries Holder, the type of self.'), and takes only an overload whose first Java parameter is that type's carrier, read by the type's name for fifteen types of `FortressLibrary` and `FortressBuiltin` whose names no program can give its own types, `FlatString` and `JavaString` not among them (`StaticNativeApp.java:81-95`). A dotted method of a generic trait or object is refused only where an instance is made (row 864). The check reads the declaring type, not `self`'s run-time type, so a program's object that extends a carried trait against its `comprises` clause, which walk loads (row 551), still reaches the helper with a value that no Java type carries. It raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. The 173: 20 of trait `ZZ32`'s operators and functions, its `CHOOSE` among them (`Library/FortressLibrary.fss:741-810`; F-305), 21 of trait `ZZ64`'s, its `CHOOSE` among them (`:831-905`), and 16 of trait `ZZ`'s (`:1007-1076`; F-306), `Int`'s `asString` and `asExprString` (`LibraryBuiltin/FortressBuiltin.fss:371`, `:373`), `Float`'s 30 (F-303), the small rest's eight (F-307), and `NN32`'s 20, `NN64`'s 17 and `Char`'s 39 (F-308); the other 276 still name glue classes. With F-298 the compiled checker reads the 173 against their helpers' Java signatures from this step on (P-58). A native over `String`, helper or glue class alike, receives a non-flat string's type name (row 846). Test: `tests/NativeHelperBindingWalk.fss`, with `NativeHelperFamilyZZ32Walk`, `NativeHelperRaiseWalk`, `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyIntegersWalk`, `ZZ64DivisionByZeroWalk`, `ZZDivisionByZeroWalk`, and for `self` `NativeHelperUncarriedSelfWalk` with its six siblings `NativeHelperUncarriedSelf*Walk`. Detail: `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-10-31 15:12Z · rewritten · from `explorations/compile-ladder/rung-natives-float/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung F's 30 (cites [S3])
- Written by the gather: 2026-10-31 15:15Z · rewritten · from `explorations/compile-ladder/rung-natives-choose/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: the count with rung K's two CHOOSE bindings; row 521 fixed by rung K (cites [S4])
- Written by the gather: 2026-10-31 15:16Z · rewritten · from `explorations/compile-ladder/rung-natives-integers/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung Z's 36 (cites [S1])
- Written by the gather: 2026-10-31 15:16Z · rewritten · by climb batch 24 gather: a comma lost in the previous rewrite put back
- Written by the gather: 2026-10-31 15:18Z · rewritten · from `explorations/compile-ladder/rung-natives-small/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung S's eight (cites [S5])
- Written by the gather: 2026-10-31 15:19Z · rewritten · from `explorations/compile-ladder/rung-natives-self/REPORT.md`, "What changed and why" · by climb batch 24 gather: rung W record.md, FACTS: the row-847 sentence replaced by the check of self; row 847 fixed by rung W (cites [S12])
- Written by the gather: 2026-10-31 15:25Z · rewritten · from `explorations/compile-ladder/rung-natives-hard/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: the count with rung H's 76, the merged tree's (cites [S2])

Report sections that the entry cites: [S13] `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; [S12] `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why".

## F-303, added

- Size: at the base none; at the landing 1403 characters; now 1403 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-303 **Walk carries a declared `Float` in a Java `double`, as it carries `RR64`, so a helper binding with a parameter or result declared `Float` loads; `Float`'s 30 bindings that fit a helper name `simpleDoubleArith`'s, and every value they give under walk is the glue classes'.** `javaFor` names `Float` beside `RR64` (`interpreter/glue/StaticNativeApp.java:51`); without it walk refused such a binding at load, 'no Java type carries the declared type of parameter a.' The 30 are `Float`'s `asString`, `asExprString`, `|self|`, the five comparisons, unary `-`, `+`, `-`, `DOT`, `TIMES`, juxtaposition, `/`, `SQRT`, `^` at a `Float` and at an `RR64` exponent, the eight elementary functions, `floor`, `ceiling`, `truncate` and `round` (`LibraryBuiltin/FortressBuiltin.fss:55-193`); its other 32 have no fitting helper and still name glue classes: the predicates `isNaN` and `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, the 18 directed roundings, `^` at `RR32` and `AnyIntegral`, `atan2`, and the floor and ceiling brackets `|\self/|` and `|/self\|` (`LibraryBuiltin/FortressBuiltin.fss:60-189`). F-299 counts the bindings that name a helper. Test: `tests/NativeHelperFloatCarriedWalk.fss`, with `tests/NativeHelperFamilyFloatWalk.fss` and `compiler_tests/NativeHelperFamilyFloatCompiled`. Detail: `compile-ladder/rung-natives-float/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-10-31 15:12Z · added · from `explorations/compile-ladder/rung-natives-float/REPORT.md`, "What changed and why" · by climb batch 24 gather: rung F record.md, For FACTS (cites [S14])
- Written by the merged-diff review: 2026-10-31 15:57Z · rewritten · by climb batch 24 merged-diff review: the list of Float's 32 bindings left on glue classes named 26 of them; now all 32, as LibraryBuiltin/FortressBuiltin.fss:60-189 holds them

Report sections that the entry cites: [S14] `compile-ladder/rung-natives-float/REPORT.md`, "What changed and why".

## F-304, added

- Size: at the base none; at the landing 873 characters; now 873 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-304 **On the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings, not one, so a numeral of 16 or 17 significant digits can become a neighbouring double; walk rounds once.** `CodeGen.forFloatLiteralExpr` emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` (`compiler/codegen/CodeGen.java:1994-2004`), so compiled `0.9999999999999999` is 1.0; walk reads a radix-ten numeral's text with `Double.valueOf`. The specification asks "at most one floating-point rounding error" (`basic/expressions/literals.tex:187-190`). A compiled test compares such a double by its string, or uses a numeral with a zero integer part and at most 15 digits after the point. Test: `compiler_tests/XXXFloatNumeralOneRounding` (row 862). Detail: `compile-ladder/rung-natives-float/REPORT.md`, "Defects, each with its home".

History blocks of the range:

- Written by the gather: 2026-10-31 15:12Z · added · from `explorations/compile-ladder/rung-natives-float/REPORT.md`, "Defects, each with its home" · by climb batch 24 gather: rung F record.md, For FACTS (cites [S15])

Report sections that the entry cites: [S15] `compile-ladder/rung-natives-float/REPORT.md`, "Defects, each with its home".

## F-305, added

- Size: at the base none; at the landing 1407 characters; now 1407 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-305 **`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths, and the helper is exact, raises `IntegerOverflow` where the binomial coefficient does not fit, and shares no state between calls.** It builds P-73. Trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose` (`Library/FortressLibrary.fss:789`, `:882`), which the compiler's prelude binds too, `NN32`'s compiled `CHOOSE` through the `ZZ64` helper; `NN32`'s binding in the one library stays on its glue class. Past their safe-bound tables every coefficient overflows, from `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`, and the helpers raise `IntegerOverflow` there (`nativeHelpers/simpleIntArith.java:210-213`, `simpleLongArith.java:183-186`); each slow-path call has its own scratch array (`simpleIntArith.java:162-163`, `simpleLongArith.java:136-137`), so calls in parallel no longer corrupt each other. Swept against the exact value, 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs give walk's glue arithmetic. Test: `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`; the guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`. Detail: `compile-ladder/rung-natives-choose/REPORT.md`, sections 1, 2 and 5.

History blocks of the range:

- Written by the gather: 2026-10-31 15:15Z · added · from `explorations/compile-ladder/rung-natives-choose/REPORT.md`, "1. What changed and why" · by climb batch 24 gather: rung K record.md, FACTS entry the rung earns (cites [S16])
- Written by the merged-diff review: 2026-10-31 15:57Z · rewritten · by climb batch 24 merged-diff review: the two pairs of citations were swapped: the raise past the table is at simpleIntArith.java:210-213 and simpleLongArith.java:183-186, the scratch arrays at :162-163 and :136-137

## F-306, added

- Size: at the base none; at the landing 1152 characters; now 1152 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-306 **Under walk, trait `ZZ64`'s 20 and trait `ZZ`'s 16 native bindings name helpers of `nativeHelpers/`, keep every value the glue classes gave, and their `DIV` by zero throws `DivisionByZero`.** The 36 (`Library/FortressLibrary.fss:831-905`, `:1007-1076`) name 28 helpers of `simpleLongArith`, `simpleIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`, those that the compiler's prelude binds for the same operations; `ZZ64`'s four wrapping bindings name the wrapping helpers that the prelude binds under its `BOX` spellings (row 348). `longOverflowingDiv` and `div` raise the library's `DivisionByZero` under walk (F-24); `REM` and `MOD` still name glue classes and end the run at a zero divisor (row 336). A `ZZ` helper takes only a `BigNum` value, since walk's loader unboxes a `BigInteger` by `getBigInteger`; walk's coercions convert another integer operand first. Test: `tests/NativeHelperFamilyIntegersWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `compiler_tests/NativeHelperFamilyIntegersCompiled`. Detail: `compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-10-31 15:16Z · added · from `explorations/compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why" · by climb batch 24 gather: rung Z record.md, For FACTS (cites [S17])

Report sections that the entry cites: [S17] `compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why".

## F-307, added

- Size: at the base none; at the landing 960 characters; now 960 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-307 **The small rest's eight native bindings name their helpers of `nativeHelpers/`, and walk's values are unchanged: `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`.** They are at `LibraryBuiltin/FortressBuiltin.fss:380`, `:382`, `:470`, `:567`, `:569`, `:617` and `Library/FortressLibrary.fss:986`, `:4540`; the four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types (`compiler/NamingCzar.java:373-384`). `signed` above the signed half wraps, and `char` keeps a code point outside 0 to 1114111, as the glue classes did (rows 856, 857). The top-level `printlnWithThread` and `getProperty`, declared over `String`, stay on their glue class (row 846). Test: `tests/NativeHelperFamilySmallWalk.fss` and `compiler_tests/NativeHelperFamilySmallCompiled`. Detail: `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-10-31 15:17Z · added · from `explorations/compile-ladder/rung-natives-small/REPORT.md`, "What changed and why" · by climb batch 24 gather: rung S record.md, For FACTS (cites [S18])

Report sections that the entry cites: [S18] `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

## F-308, added

- Size: at the base none; at the landing 2330 characters; now 2330 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-308 **A `builtinPrimitive` binding over `NN32`, `NN64` or `Char` whose helper takes or answers a Java `int` or `long` compiles on the compiled path through the six transfer helpers, and `NN32`'s 20, `NN64`'s 17 and `Char`'s 39 bindings name their helpers.** At the parse the compiled path's rewrite (F-298) reads each position's declared type, `self` by its non-generic owner, and where the helper's `int` or `long` is read as `ZZ32` or `ZZ64` and the declaration says `NN32`, `NN64` or `Char`, it puts the matching transfer, `makeZZ32FromNN32…`, `makeNN32FromZZ32…`, `charCodePoint…`, `charMakeCharacter…`, `makeZZ64FromNN64…` or `makeNN64FromZZ64…`, around that argument or around the call, as the prelude composes them (`compiler/BuiltinPrimitiveRewriter.java:113-157`, `:176-206`; `LibraryBuiltin/CompilerBuiltin.fss:768`); walk carries the types by the declaration and needs no change. A helper overloaded at its arity gets no transfer, and `self` in a generic owner gets none (`compiler/BuiltinPrimitiveRewriter.java:91`, `:124-127`); every other position of such a binding still takes its transfer. The transfers are identities, so the composition checks whatever the helper computes: a declaration over `NN32` bound to the signed `simpleIntArith.intLT` compiles and answers `true` for 2^31 < 1, as walk answers it, where the checker refused it before (`compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode"); the walk and compiled guards, not the checker, check that each of the 76 names the unsigned helper. With it, the 76 name their helpers (`LibraryBuiltin/FortressBuiltin.fss:391-466`, `:612-722`; `Library/FortressLibrary.fss:917-984`; F-299 counts them), the count and the distance stay 0 and 0, and under walk `NN32`'s and `NN64`'s `DIV` by zero throw `DivisionByZero`, no other value moving; six of the 82 over these types stay on glue classes (rows 326, 860, 861; `NN32`'s `asFloat` and `CHOOSE`). Test: `compiler_tests/NativeHelperTransferCompiled`, with `NativeHelperFamilyNN32Compiled`, `NativeHelperFamilyNN64Compiled`, `NativeHelperFamilyCharCompiled`; under walk `tests/NativeHelperFamilyNN32Walk`, `NativeHelperFamilyNN64Walk`, `NativeHelperFamilyCharWalk`, `NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`. Detail: `compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-10-31 15:24Z · added · from `explorations/compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why" · by climb batch 24 gather: rung H record.md, FACTS.md (cites [S19])

Report sections that the entry cites: [S20] `compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode"; [S19] `compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/compile-ladder/rung-natives-integers/REPORT.md, "Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-integers/REPORT.md#Sentences made false'`

explorations/compile-ladder/rung-natives-integers/REPORT.md:137-145, 1841 bytes.

~~~~
## Sentences made false

- `Specification/appendices/changes.tex:4466-4473`, the Appendix I entry "A native binding that names a static helper", its Effect: "Twenty-one of the 449 bindings of \library\ name a helper: nineteen of the trait \EXP{\mathbb{Z}32}, ..." and "The other 428 still name a glue class, which the compiled code cannot call." With this rung alone, 57 name a helper and 392 a glue class.
- `Specification/appendices/changes.tex:4483-4486`, the same Effect: "\EXP{\mathbb{Z}32}'s \OPR{REM} and \OPR{MOD}, the three on \EXP{\mathbb{Z}64}, and \EXP{\div} on \EXP{\mathbb{Z}}, which still name glue classes, end the run with a Java exception at a divisor of zero (row~336 ...)": `ZZ64`'s `DIV` and `ZZ`'s `DIV` now throw `DivisionByZero`; `ZZ32`'s `REM` and `MOD` and `ZZ64`'s `REM` and `MOD` still end the run. The gather rewrites the Effect (fork 7).
- Row 336's claim, "`DIV`, `REM` and `MOD` by zero on `ZZ64`, and `DIV` by zero on `ZZ` end the run": rewritten in `record.md`.
- F-32's counts, "of its 449 live bindings, 428 name one" (a glue class), and F-299's "21 of the one library's 449 live bindings name one" (a helper) with its list of the 21: with this rung, 392 and 57.
- F-24's "so `ZZ32`'s `DIV` by zero raises `DivisionByZero`" stays true but is incomplete: `ZZ64`'s and `ZZ`'s `DIV` too, with their tests.

`opr-overview.tex:164-165` becomes true for `ZZ64`'s and `ZZ`'s `DIV`. No `\revision` or `\note{}` box of the specification speaks of walk's integer division by zero (`grep -rn -i 'by zero' Specification/ --include=*.tex` names only the listings, the operators chapter and the Appendix I entry). The `fortress-repo` skill's `references/interpreter.md`, "Natives", "`ZZ32`'s `DIV` by zero raises `DivisionByZero` in this way.", stays true and could name `ZZ64` and `ZZ` (the record's "Revival change").
~~~~

## [S2] explorations/compile-ladder/rung-natives-hard/REPORT.md, "8. Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-hard/REPORT.md#8. Sentences made false'`

explorations/compile-ladder/rung-natives-hard/REPORT.md:112-123, 2557 bytes, cut at 2500.

~~~~
## 8. Sentences made false

- `Specification/appendices/changes.tex:4466-4473`, the Effect of "A native binding that names a static helper": "Twenty-one of the 449 bindings of \library\ name a helper: …" and "The other 428 still name a glue class, which the compiled code cannot call." On this tree 97 name a helper and 352 a glue class; the 76 are `NN32`'s 20, `NN64`'s 17 and `Char`'s 39.
- `changes.tex:4484-4488`: "… and so do \EXP{\div}, \OPR{REM} and \OPR{MOD} on \EXP{\mathbb{N}32} and \EXP{\mathbb{N}64} …": `DIV` on `NN32` and `NN64` now throws `DivisionByZero`; `REM` and `MOD` on them still end the run. (The Effect is the gather's, fork 7.)
- Row 848's claim (`explorations/fortress-gap-ledger.md:547`): "`DIV`, `REM` and `MOD` by zero on `NN32` and `NN64` … end the run": `DIV` no longer does (rewritten in `record.md`).
- F-298 (`explorations/coordinator/FACTS.md:133`): "In walk's world the checker reads the helper's Java types as the one library's, `int` as `ZZ32`, `String` as `String`": still true of the reading, but a binding over `NN32`, `NN64` or `Char` is now checked as a composition through the transfers, which the entry does not say.
- F-299's count (`FACTS.md:134`): "21 of the one library's 449 live bindings name one" and "the other 428 still name glue classes": 97 and 352 on this tree.
- F-32's count (`FACTS.md:30`): "of its 449 live bindings, 428 name one": 352 on this tree.
- The `fortress-repo` skill's `compiler.md`, "Natives" (`.claude/skills/fortress-repo/references/compiler.md:85`): "So a binding over `NN32`, `NN64` or `Char` that names any other helper is a type error for the checker." It is no longer: the rewrite composes it with the transfers, and the checker reads the composition; a binding over these types whose helper's Java type is no `int` or `long` where the declaration says `NN32`, `NN64` or `Char`, or whose helper is overloaded at its arity, still is.
- The batch record's left-out line, "Rung C's limits and review-routed.1 … for the next rung that edits the natives' rewrite; no rung of this batch does." (`explorations/coordinator/CLIMB-BATCH-24.md:431`): this rung edits that rewrite (section 12).

Stays true: `builtinPrimitive`'s comment, "The compiler, before type checking, rewrites the body into a call of the helper, which the type checker checks against the helper's Java signature" (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19`): the body is still a call of the helper, inside its transfers; and `opr-overv
~~~~

## [S3] explorations/compile-ladder/rung-natives-float/REPORT.md, "Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float/REPORT.md#Sentences made false'`

explorations/compile-ladder/rung-natives-float/REPORT.md:79-86, 1384 bytes.

~~~~
## Sentences made false

- `Specification/appendices/changes.tex:4466-4472`, the entry "A native binding that names a static helper", its Effect: "Twenty-one of the 449 bindings of \library\ name a helper: nineteen of the trait ℤ32, … and the getters asString and asExprString of the interpreter's object Int." With this rung, 51, `Float`'s 30 among them. The gather's (fork 7).
- `Specification/appendices/changes.tex:4473`: "The other 428 still name a glue class, which the compiled code cannot call." 398 with this rung.
- `explorations/coordinator/FACTS.md:30`, F-32: "of its 449 live bindings, 428 name one" and "F-299 holds the 21 that name one".
- `explorations/coordinator/FACTS.md:134`, F-299: its title, "21 of the one library's 449 live bindings name one", and "The 21: … the other 428 still name glue classes".
- `.claude/skills/fortress-repo/references/interpreter.md:92-94`, "Natives": "Walk carries each declared type of a helper's binding in one Java type: … `RR64` in `double`; …": `Float` is carried in `double` too; and `:100`, a refusal where "The result type, or a parameter type other than `self`'s, is not in the list above": the list now holds `Float`.
- No sentence of `Specification/basic` or `Specification/basic-lib`; `builtinPrimitive`'s printed comment (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`) holds no count and stays true.
~~~~

## [S4] explorations/compile-ladder/rung-natives-choose/REPORT.md, "8. Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-choose/REPORT.md#8. Sentences made false'`

explorations/compile-ladder/rung-natives-choose/REPORT.md:244-260, 1893 bytes.

~~~~
## 8. Sentences made false

The specification's. The gather rewrites the Appendix I Effect once (fork 7):
- `Specification/appendices/changes.tex:4466`: "Twenty-one of the 449 bindings of \library\ name a helper: nineteen of the trait ZZ32, its operators ...". This rung adds trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE`.
- `Specification/appendices/changes.tex:4473`: "The other 428 still name a glue class, which the compiled code cannot call."
- `Specification/appendices/changes.tex:4474-4477`: "Among them is ZZ32's CHOOSE: its helper throws a Java ArrayIndexOutOfBoundsException, which no catch sees, where the binomial coefficient is past the helper's table, instead of an IntegerOverflow (row 521 of the revival's gap ledger)."

No other sentence of `Specification/` names the helpers, their table, or rows 521 and 855 (`grep -rn '521\|855\|ArrayIndexOutOfBounds\|safe-bound' Specification/ --include=*.tex`). The `CHOOSE` entry and the operator overview were true of walk, and now become true of the compiled path.

The record's, for the gather:
- row 521's claim (`explorations/fortress-gap-ledger.md:538`) and row 855's (`:548`): both close;
- F-299 (`explorations/coordinator/FACTS.md:134`): "21 of the one library's 449 live bindings name one" and "the other 428 still name glue classes, `ZZ32`'s `CHOOSE` among them (row 521)";
- F-32 (`FACTS.md:30`): "of its 449 live bindings, 428 name one";
- F-132 (`FACTS.md:174`): "and `CHOOSE` past its helper's table dies with a Java exception (row 521)";
- P-73 (`explorations/coordinator/POSITIONS.md:80`): "and the compiled path departs from it at `^` (rows 523 to 525) and at `CHOOSE` (row 521)". Its `CHOOSE` clause is false;
- PLAN (`explorations/coordinator/PLAN.md:51`): "`ZZ32`'s `CHOOSE` with row 521's helper fix", among the families that wait;
- PLAN `:52`: `XXXChooseTableCompiledRungE` "is promoted when it passes". It now is.
~~~~

## [S5] explorations/compile-ladder/rung-natives-small/REPORT.md, "Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-small/REPORT.md#Sentences made false'`

explorations/compile-ladder/rung-natives-small/REPORT.md:186-195, 1057 bytes.

~~~~
## Sentences made false

On this rung's tree, 29 of the 449 bindings name a helper and 420 a glue class. These sentences are made false:

- `Specification/appendices/changes.tex:4466`: "Twenty-one of the 449 bindings of \library\ name a helper: nineteen of the trait \EXP{\mathbb{Z}32}, … and the getters \VAR{asString} and \VAR{asExprString} of the interpreter's object \TYP{Int}." This is the gather's to correct (fork 7).
- `Specification/appendices/changes.tex:4473`: "The other 428 still name a glue class, which the compiled code cannot call." This is the gather's to correct (fork 7).
- F-32's title, "of its 449 live bindings, 428 name one", and its clause "F-299 holds the 21 that name one".
- F-299's title, "21 of the one library's 449 live bindings name one", and its sentence "The 21: 19 of trait `ZZ32`'s operators and functions … and `Int`'s `asString` and `asExprString` …; the other 428 still name glue classes".

`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`, `builtinPrimitive`'s comment, holds no count and stays true.
~~~~

## [S6] explorations/compile-ladder/rung-codegen-where/REPORT.md, "7. Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-where/REPORT.md#7. Sentences made false'`

explorations/compile-ladder/rung-codegen-where/REPORT.md:122-140, 3628 bytes, cut at 2500.

~~~~
## 7. Sentences made false

The specification (Appendix I Effects; the gather corrects them, since the rung edits no `Specification/` file):

- `Specification/appendices/changes.tex:255-257`, entry "Conditional extension", Effect: "The code generator compiles a declaration whose \KWD{extends} clause has such a clause; it refuses one that carries a \KWD{where} clause of its own (row~701)." Its second half is false.
- `Specification/appendices/changes.tex:1672-1673`, entry "The traits that extend a closed trait", Effect: "The code generator does not yet compile a trait with a \KWD{where} clause or read a size off an argument at a call (rows~307 and~701)." Its first half is false; the second stays true (row 307).
- `Specification/appendices/changes.tex:4268-4271`, entry "The index type of a subscript", Effect: "The code generator refuses a method with a \KWD{where} clause of its own (row~701 of the revival's gap ledger), so after the switch-over \TYP{BoundedRange}'s \VAR{atMost} waits on that row, beside the two \VAR{distribute} methods of \library's sum reduction." False.

The record and the skill (the gather's and the skill writer's):

- F-181 (`explorations/coordinator/FACTS.md:249`): "The code generator refuses every function, method, object and trait declaration that carries a `where` clause in its own header" (record.md gives its rewrite).
- F-34 (`FACTS.md:31`): "the kinds include … a header `where` clause (row 701)", a measurement at `2bff2fe23`; the kind is gone from the code generator.
- F-281 (`FACTS.md:120`): "such a program still stops in the code generator (row 812; row 701)": row 701's half is false; row 812's stands where a listed generic type gives a member's body.
- F-270 (`FACTS.md:206`): "The code generator does not compile such a trait: "Can't compile TraitDecl NatParamT" (row 307; `compiler_tests/XXXNatOpenRun`).": the trait compiles, and the call that opens its size fails verification (added by the skeptic, `SKEPTIC.md`).
- P-151 (`POSITIONS.md:63`): "Row 701: the code generator's half."
- P-156 (`POSITIONS.md:67`): "the code generator refuses a `where` clause in a declaration's header", and "after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701)".
- `PLAN.md:59`: "a header `where` clause (row 701)" among the code generator's kinds; `PLAN.md:249`: "and the code generator's half (row 701), in phase 4 before the names batch".
- The skill
~~~~

## [S7] explorations/reviews/phase3-exit/zero-audit.md, "Part C. The debt carried into phase 4"

`facts-extract.sh 'doc:explorations/reviews/phase3-exit/zero-audit.md#Part C. The debt carried into phase 4'`

explorations/reviews/phase3-exit/zero-audit.md:259-299, 4477 bytes, cut at 2500.

~~~~
## Part C. The debt carried into phase 4

In order of what it costs after the switch-over. "Now" is before it, when no compiled client reads the one library.

1. **P-42's flip of the compiled path's implicit bound.** Home: P-42, row 412. No PLAN line names the step.
   - Now: nothing.
   - After: the zero holds only if `fortress compile` takes walk's pre-desugaring. Under today's `compile` setting the twelve give 685 errors (A.3). The 27 compiled tests that import `CompilerSystem`, and their siblings, were never run with the bound `Any`.
2. **Row 782's 9 operators, and the check that cannot read operators.** Home: row 782; PLAN phase 4's names line.
   - Now: nothing.
   - After: every compiled `#` and `:` call reached through the api, so every compiled range loop, dies with `NoSuchMethodError` (A.4). `BIG ||`, `BIG |||` and list comprehensions likewise.
   - To fix: the 10 lines, measured clean by the checker, and the check's double key, a checker change.
3. **The natives.** Home: phase 4's first step; `CLIMB-BATCH-23.md`.
   - 449 live bindings (A 154, B 59, C 158, D1 36, D2 42), 393 of them in the twelve. The checker reads none until rung C.
   - Now: walk's values only.
   - After: the switch-over waits on all of them, and microGPT needs `Writer`'s natives, `nanoTime`, `getProgramArgsPrim` and `NativeArray` (F-32).
4. **Code generation over the twelve.** Home: F-34; PLAN phase 4's last bullet and phase 5; rows 304, 733, 818 to 823, 624.
   - Measured again on `main`, `DistanceMulti -order full -setting any` with dispatch skipped, as F-34 ran it: **52 declarations refused**: `FortressLibrary` 28, `RangeInternals` 11, `List` 5, `String` 5, `FlatString`, `Stream` and `NatReflect` 1 each. 666 `@@CG OK` lines; the checker passes all 52. F-34's 58 were on `aa5c67d48`.
   - The kinds: local functions (`LetFn`), varargs, `asif`, `label`, "Not in the trait table" (4 kinds ×2), `forbid`, "not in the kind env" ×3, two duplicate closure names (`ZipException`), and row 701's five.
   - After: the first wall between the library and bytecode.
5. **Row 701, the code generator's `where` clauses.** Home: PLAN's phase-3 `where`-clauses line, "after the switch-over"; review-queue item 182.
   - Its five walls in the twelve, four of them revival lines (B.4). The first wall `fortress compile` meets in `FortressLibrary` is `SumReduction`'s `distribute`.
6. **`List`'s two imports, unchecked.** Home: none on record; new.
   - `CovariantCollection` has 12 errors and 2 crashes
~~~~

## [S8] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

`facts-extract.sh 'doc:.claude/skills/coordinator/references/batch.md#The checker count and the distance'`

.claude/skills/coordinator/references/batch.md:54-61, 827 bytes.

~~~~
## The checker count and the distance

The gate reports the checker count in every batch, and the distance in phase 3. Neither turns the gate red.

- If a rung's test is the checker count or the distance, it takes the last landed gate's tables as its starting values.
- If every file that a rung changes lies outside what the two measures read, the rung runs neither and lists those files (`STAGE_BLIND`). Its skeptic checks the list against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- The gate's comparisons hide Java line numbers, identity hashes and moved library positions. Put every difference that they hid on the review list. Put there too each line of the team's tests that a rung rewrote to keep its checked value, with its before and after.
~~~~

## [S9] explorations/compile-ladder/rung-codegen-where/REPORT.md, "1. What changed, and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-where/REPORT.md#1. What changed, and why'`

explorations/compile-ladder/rung-codegen-where/REPORT.md:9-15, 1900 bytes.

~~~~
## 1. What changed, and why

The three guards of `compiler/codegen/CodeGen.java` lose their `header.getWhereClause().isNone() &&` condition: `forFnDecl` (base `:2967`), `forObjectDeclPrePass` (base `:4107`) and `forTraitDecl` (base `:5027`). Each keeps its contract condition, `header.getContract().isNone()` (now `:2970`, `:4107`, `:5026`), and the object's and trait's throws conditions (`:4106`, `:5025`). Nothing is emitted for a `where` clause: its constraints are the checker's, which checks them before the code generator runs (fork 12). Nothing else in `CodeGen` was needed for the emission: the code generator already extends its type analyzer with a declaration's `where` clause (`CodeGen.java:1878`, `:5103`), and a generic declaration is compiled as a template whatever its clause. The diff is three deleted lines (`git diff b0f6cd6b7 -- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`).

So a function whose `where` clause bounds its type parameter, a method of a generic trait or object whose `where` clause bounds the type's parameter (`SumReduction`'s `distribute`, `BoundedRange.atMost`), an object's own `where` clause, a trait's dotted and functional methods with bodies under such a clause, a generic method's clause on its own parameter, and a trait whose `comprises` clause lists a generic object at a `where`-clause type variable (`AnyList`'s form) all compile, link and run. A trait that lists a type at a `where`-clause size (`NatParam`'s form) now compiles too; a call that opens such a value to its size then fails the JVM's verification (row 307's wall behind this one).

The commits, on `wip/rung-codegen-where`: `eb2aba6b4` (three tests, the promotion), `41b9326ec` (the object test), `11ee497b1` (the fix and the run pair), `9173ceb89` (the contract `XXX` test), `db22125d9` (the trait-method test), and the report's and record's commits after them.
~~~~

## [S10] .claude/skills/fortress-repo/references/compiler.md, "What the compiled path cannot compile yet"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/compiler.md#What the compiled path cannot compile yet'`

.claude/skills/fortress-repo/references/compiler.md:36-48, 1463 bytes.

~~~~
## What the compiled path cannot compile yet

For a construct that it cannot compile yet, the code generator calls `sayWhat` or throws another `CompilerError`. Such a call or throw is a code-generator wall. The code generator has no case for these constructs:

- `label` and `exit`, `spawn`, and `atomic` used as an expression;
- a local function declaration, and an object expression;
- an array literal, such as `[1 2 3]`.

It also refuses a function or method with a contract (`requires`, `ensures`, `invariant`). It compiles a declaration whose own header or `extends` entry has a `where` clause, and emits nothing for the clause. A call of a function or method whose own clause introduces a `where`-clause variable links, but dies at run time with `NoClassDefFoundError` (ledger row 867). The disambiguator, which both paths run, drops a trait's or object's contract, so the code generator never sees one, and walk does not check one either (ledger row 781). It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private` and `abstract`, such as `override` (ledger row 650).

The compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`. Its `for` loops, comprehensions and reductions work over `ZZ32` ranges only. Its reductions give a `ZZ32` or a `String`.

Until the switch-over, a compiled test uses none of these. If a test needs one, write it as an `XXX` test that names the wall (`tests-writing.md`).
~~~~

## [S11] explorations/compile-ladder/rung-natives-compiled/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-compiled/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-compiled/REPORT.md:14-33, 5068 bytes, cut at 2500.

~~~~
## What changed and why

P-58 gives the compiled path half of the native binding: at the parse, before the checker, a library body that is exactly `builtinPrimitive("…")`, whose string names a static Java method of `nativeHelpers/`, becomes a synthetic `import java` of the helper and a call, and a string that names no helper is refused. Row 309 is the gap it closes: the compiled path had no counterpart of `builtinPrimitive` at all.

- `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:1-139`, new. `rewrite` (`:46-64`) walks a component's top-level declarations and the members of its traits and objects. `fn` (`:87-123`) takes a declaration whose body is the tight juxtaposition of `builtinPrimitive` and a string literal, the shape the parser makes for `builtinPrimitive("…")` and walk recognizes (`NativeApp.java:170-188`). A string under `com.sun.fortress.nativeHelpers.` (`:95`) that names a public static method of a class that loads becomes `builtinPrimitive_Class_method(args)`, the arguments the parameters in order, `self` first for a method of a trait or object (`:103-109`), and the component gains `import java pkg.{Class.method => builtinPrimitive_Class_method, …}` (`:53-62`). A string under that package that names no public static method throws the static error 'builtinPrimitive names no static helper: <the string>' at the string (`:96-99`). Every other string, walk's glue classes among them, is left alone, so its body stays a call of `builtinPrimitive` (row 560). A declaration with a varargs parameter is left alone (`:105`).
- `ProjectFortress/src/com/sun/fortress/compiler/Parser.java:329-330`: `parseFileConvertExn` rewrites each parsed unit. `:157-159`: `importCollector` returns the whole rewritten component for a `.fss` file whose text holds `"com.sun.fortress.nativeHelpers.`, because the repository makes the foreign api from the import collector's view of the file (`ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java:448-451`, `readCUFor` at `:1022-1025`).
- `ProjectFortress/src/com/sun/fortress/Shell.java:102-103`: `specificRepository` turns the rewrite on for every repository but walk's (`interpreterCache`), so the compile commands, `fortress junit` and the gate's two stages rewrite, and walk does not.
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:369-372`, `:464-505`: the three-argument `fortressTypeForForeignJavaType`, which `ForeignJava` and the wrapper generator call, reads a J
~~~~

## [S12] explorations/compile-ladder/rung-natives-self/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-self/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-self/REPORT.md:12-29, 3104 bytes, cut at 2500.

~~~~
## What changed and why

Walk's native loader read a method's `self` only by the helper's Java type. `StaticNativeApp.find` checked a `self` slot only for being a Java type that it carries, because the closures never told `NativeApp.checkAndLoadNative` which type declares the method (row 847). Now:

- `MethodClosure`'s two constructors pass their `definer`, and `FunctionalMethod`'s two pass their self type. They go through two new constructors of `FunctionClosure` (`FunctionClosure.java:61-71`) to `NativeApp.checkAndLoadNative(defn, isFunctionalMethod, declarer)` (`NativeApp.java:169`), which hands the type's name to `StaticNativeApp.find(s, defn, declarer)` (`NativeApp.java:201`). The two-argument `checkAndLoadNative` passes no type (`NativeApp.java:164-166`), so a top-level function, a local function and a function expression load as before.
- `StaticNativeApp.javaForSelf` (`StaticNativeApp.java:81-95`) gives the Java type that carries `self` for a declaring type. It covers `javaFor`'s names except `FlatString`, `JavaString` and `()`, plus the objects `Int`, `Long`, `UnsignedLong`, `Float` and `BigNum`.
- `find` with a declaring type (`StaticNativeApp.java:112-160`) refuses at load a type that `javaForSelf` does not carry (`:137-141`), with the message 'Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries Holder, the type of self.' It takes only an overload that takes `self` first (`:147`) at that carrier (`:154`).

The planner's `rung-W.patch` applied clean. It is the whole change except for two lines:

1. **Self first.** The patch took `self`'s carrier only where the overload had one parameter more than the declaration (`off == 1`). So under a declaring type, a dotted method's helper that does not take `self` still loaded, and its call failed. Under a declaring type an overload must now take `self` first (`StaticNativeApp.java:147`, `:154`). This is the rule that the brief and fork 4 give ("takes only an overload whose first Java parameter is that carrier") and that `FortressBuiltin.fsi:19` states ("%self% first").
2. **Two names left out.** The patch carried `self` by `javaFor`'s names, which include `FlatString` and `JavaString`. A program can give its own type either name:
   - `JavaString` is declared only in the compiler's prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:52`).
   - `FlatString` is declared in the component `FlatString` (`Library/FlatString.fss:34`), whose name the disambigua
~~~~

## [S13] explorations/compile-ladder/rung-natives-walk/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-walk/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-walk/REPORT.md:15-34, 4473 bytes, cut at 2500.

~~~~
## What changed and why

- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`, new, 225 lines: a `NativeMeth` for a string `com.sun.fortress.nativeHelpers.Class.method`. `find` (`:87-128`) loads the class, collects its public static methods of that name, and refuses at load: 'Native helper class … not found.', 'Native helper … names no static method of ….', '…: no Java type carries the declared type of parameter ….', '…: no Java type carries the declared result type.', '… has no overload that fits the declaration's types.', '… has N overloads that fit ….'. A method fits when its Java parameters are the declaration's at the Java types that carry them (`javaFor`, `:47-58`), one more in front for a dotted method's `self` (fork 9), `self` first for a functional method (fork 8), and its result type carries the declared one (fork 6). `call` (`:162-180`) unboxes each argument by the Java type (a `Char` as its code point), boxes the result at the declared type (`box`, `:205-224`: an `int` as `ZZ32`, `NN32` or `Char`, a `long` as `ZZ64` or `NN64`; fork 7), and turns a helper's `FortressImplementationError` 'fortress.<Api>$<Name>' into walk's `FortressError` of the library's `<Name>` (`raised`, `:182-191`; fork 11), as `Int.overflow()` raises `IntegerOverflow`.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:194-201`: the hook in `checkAndLoadNative`, before the glue class's load: a helper string goes to `StaticNativeApp`, a refusal is walk's `bug` at the declaration, as a missing glue class's (fork 10).
- `Library/FortressLibrary.fss:741-810`: 19 strings of trait `ZZ32` (`=`, `<`, the unary `-` and `DOTMINUS`, `+`, `DOTPLUS`, the binary `-` and `DOTMINUS`, `DOT`, `TIMES`, juxtaposition, `DOTTIMES`, `DIV`, `BITAND`, `BITOR`, `BITXOR`, `BITNOT`, `widen`, `unsigned`), and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:371`, `:373`, `Int`'s `asString` and `asExprString`, each naming the helper that the prelude binds or that computes it, by the patch's exact text (fork 12; `explorations/compile-ladder/plan-23/probes/movable-base.tsv`).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`: `builtinPrimitive`'s comment revised, in its sixteen lines; `Specification/appendices/changes.tex`, the entry "A native binding that names a static helper" (`revival-native-helpers`); `explorations/compile-ladder/rung-natives-walk/decision-record.md`.
- Tests in `ProjectFortress/tests/`: the patch's five (
~~~~

## [S14] explorations/compile-ladder/rung-natives-float/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-float/REPORT.md:15-21, 3035 bytes, cut at 2500.

~~~~
## What changed and why

- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:51`, `javaFor`: `if (t.equals("RR64") || t.equals("Float")) return double.class;`. A `Float` is walk's run-time `RR64` (`FFloat`); `unbox` reads a Java `double` from any value by `getFloat()` (`:196`), and `box` makes an `FFloat` of a `double` whatever the declared name (`:218`), so the one line is the whole carry, for a parameter and for a result. Twelve of the 30 declare a parameter `Float`; without the line walk refuses the library at load.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:55-193`, `value object Float`, 30 strings, each the one line after its header, one line for one: `asString` and `asExprString` (`:56`, `:58`, `doubleToString`), `opr |self|` (`:80`, `doubleAbs`), `=`, `<`, `<=`, `>`, `>=` (`:82`, `:86`, `:88`, `:90`, `:92`; `doubleEQ`, `doubleLT`, `doubleLE`, `doubleGT`, `doubleGE`), the unary `-` (`:102`, `doubleNeg`), `+`, `-`, `DOT`, `TIMES`, juxtaposition, `/` (`:104`, `:106`, `:108`, `:110`, `:113`, `:115`; `doubleAdd`, `doubleSub`, `doubleMul` three times, `doubleDiv`), `SQRT` (`:117`, `doubleSQRT`), `^` at a `Float` and at an `RR64` exponent (`:155`, `:159`, `doublePow`), `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `log`, `exp` (`:165` to `:181`, `doubleSin` to `doubleExp`), `floor`, `ceiling` (`:183`, `:187`), `truncate`, `round` (`:191`, `:193`, `doubleTruncate`, `doubleRound`, at `ZZ64`, fork 11). Each line is the families table's (`families-base.tsv`, 30 of 30 checked by script); the edit's changed lines equal the patch's, 62 of them (`diff` of the two sorted sets prints nothing).
- Left on their glue classes, as the brief gives: `isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, the 18 directed roundings, `^` at an `RR32` and at an `AnyIntegral` exponent, `atan2`, `|\self/|` and `|/self\|`: 32. The 33rd `Float$Pow` string of the file, `:329`, is `RR32`'s `^` at a `Float` exponent, not `Float`'s.
- Counted over the library's one-line strings (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' -- Library ProjectFortress/LibraryBuiltin | wc -l`): 21 on the base, 51 on this tree; the strings under `com.sun.fortress.interpreter`, 392 and 362. By F-32's count of 449 live bindings: 51 name a helper and 398 a glue class, with this rung alone.
- Tests: `ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss` (the walk guard, 146 assertions over the 30 on the worker's head, 22
~~~~

## [S15] explorations/compile-ladder/rung-natives-float/REPORT.md, "Defects, each with its home"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float/REPORT.md#Defects, each with its home'`

explorations/compile-ladder/rung-natives-float/REPORT.md:111-115, 2053 bytes.

~~~~
## Defects, each with its home

- **Row 862**: on the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings: `CodeGen.forFloatLiteralExpr` emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` into `FFloatLiteral.make(double)` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1994-2004`), where `make(String)`, whose `Double.valueOf` rounds once (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java:44-46`), has no caller. Home 2: `ProjectFortress/compiler_tests/XXXFloatNumeralOneRounding.fss` with `FloatNumeralOneRoundingLink.test` and `XXXFloatNumeralOneRounding.test`, `x: RR64 = 0.9999999999999999` then `assert(x < 1.0, …)`. Shown through `junit.sh` as it is ('REACHED', 'FAIL:  0.9999999999999999 rounds to the double below 1.0', 'Saw expected failure (Exit code != 0)', 'OK (2 tests)') and red with the numeral `0.99999999999999` for one run, then restored ('PASS', 'Did not see expected failure', 'Tests run: 2,  Failures: 1'). Under walk the program passes: walk keeps a radix-ten numeral's text (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java:26-41`); by reading, walk sums the same way for another radix (`:30`). Paths: compiled.
- **Row 863**: the specification's sentence on a floating-point division by zero, "a NaN value according to the rules of IEEE 754" (`Specification/basic/operators/opr-overview.tex:167-168`), against IEEE 754's infinity for a nonzero dividend, which both paths give (walk: `ValFloat`, '2.5/0.0' 'Infinity', '2.5/-0.0' '-Infinity' on both codes; compiled: the guard's first draft, `dDiv(1.0, 0.0)` 'Infinity' and `dDiv(1.0, -0.0)` the negative infinity, passing on the base) and the team's `Constants` and `realArith` rely on. Home 3: `CONTESTED` row, reproducer `ProjectFortress/tests/realArith.fss`. Paths: both.
- Walk's loader refusing a declared `Float` (`StaticNativeApp.java:47-58` at b0f6cd6b7): home 1, repaired, `NativeHelperFloatCarriedWalk`.
~~~~

## [S16] explorations/compile-ladder/rung-natives-choose/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-choose/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-choose/REPORT.md:22-43, 3049 bytes, cut at 2500.

~~~~
## 1. What changed and why

`m CHOOSE n` is the binomial coefficient. On a fixed-size type, a result that does not fit throws `IntegerOverflow` (section 4; P-73 names `CHOOSE`). The compiled path's helpers, which walk now calls too, broke this rule in two ways (the CHOOSE probe, `plan-24/probes/choose.md`, sections 4.2 and 4.3).

**Past the safe-bound table, a raw Java exception.**
- Each helper first folds `k` to `min(k, n-k)`.
- For `n` above its Pascal table, it then indexes a safe-bound table: `maxIntChooseSafeN[k-2]`, 15 entries for `k` = 2 to 16, or `maxLongChooseSafeN[k-2]`, 32 entries for `k` = 2 to 33.
- Its guard against a large `k` tested `k > 33` (`ZZ32`) and `kk > 66` (`ZZ64`), which lie past the tables' ends.
- So a folded `k` from 17 to 33 on `ZZ32`, or from 34 to 66 on `ZZ64`, threw `ArrayIndexOutOfBoundsException`, which no `catch` sees.
- Every coefficient in that region overflows. The smallest is `34 CHOOSE 17` = 2,333,606,220 on `ZZ32`, and `68 CHOOSE 34` = 28,453,041,475,240,576,740 on `ZZ64`. At `n` = 67, a `k` of 34 folds to 33, which is inside the table.

**A scratch array shared by parallel calls.** Each helper's slow path, `intSlowCautiousChoose` or `longSlowCautiousChoose`, wrote, divided and multiplied one static array. Calls that run at once, as the iterations of a Fortress loop do, corrupted each other. The results were wrong values, a false `IntegerOverflow`, or a raw `UnknownError`.

The edit, in `ProjectFortress/src/com/sun/fortress/nativeHelpers/`:
- `simpleIntArith.java`: the probe's patch as written. The guard is `k - 2 >= maxIntChooseSafeN.length` (`:212`). `intSlowCautiousChoose` allocates `int[] tempIntChooseArray = new int[k]` per call (`:162-163`), and the static field is gone.
- `simpleLongArith.java`: the same two changes, in the patch's form. The guard is `kk - 2 >= maxLongChooseSafeN.length` (`:185`). `longSlowCautiousChoose` allocates `long[] tempLongChooseArray = new long[k]` per call (`:136-137`), and the static field is gone. The array has at most 33 entries, because that path answers -1 for `n > 66` with `2k > 66`. The `(int)kk` cast below the guard now meets only `kk` ≤ 33.
- `Library/FortressLibrary.fss:789`: trait `ZZ32`'s `opr CHOOSE(self,b:ZZ32):ZZ32` names `com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingChoose` instead of `Int$Choose`.
- `Library/FortressLibrary.fss:882`: trait `ZZ64`'s `CHOOSE` names `com.sun.fortress.nativeHelpers.simpleLongArith.longOverflowingChoose` instead of `Lon
~~~~

## [S17] explorations/compile-ladder/rung-natives-integers/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-integers/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-integers/REPORT.md:11-26, 3902 bytes, cut at 2500.

~~~~
## What changed and why

P-58 has each native binding's string name a static helper of `nativeHelpers/`, step by step, checked by the compiled checker from the step that moves it; F-299 has walk load such a string beside its glue classes and raise a helper's `DivisionByZero` or `IntegerOverflow` as the library's own. This rung moves the next 36, in `Library/FortressLibrary.fss` only, one string per binding, the planner's `explorations/compile-ladder/plan-24/probes/rung-Z.patch` taken as it is (`git apply` on the base, 36 lines changed for 36):

- trait `ZZ64` (`:831-905`), 20: `=` and `<` on `simpleLongArith.longEQ` and `longLT`; the prefix `-` and `DOTMINUS` on `longOverflowingNeg` and `longWrappingNeg`; `+`, `DOTPLUS`, the infix `-` and `DOTMINUS` on `longOverflowingAdd`, `longWrappingAdd`, `longOverflowingSub` and `longWrappingSub`; `DOT`, `TIMES` and juxtaposition on `longOverflowingMul`, `DOTTIMES` on `longWrappingMul`; `DIV` on `longOverflowingDiv`; `BITAND`, `BITOR`, `BITXOR` and `BITNOT` on `longBitAnd`, `longBitOr`, `longBitXor` and `longBitNot`; `narrow` on `simpleIntArith.longWrappingToInt`; `unsigned` on `simpleUnsignedLongArith.makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType`; `big` on `simpleArbitraryPrecisionArith.makeZZfromZZ64`.
- trait `ZZ` (`:1007-1076`), 16, all of `simpleArbitraryPrecisionArith`: `=` on `eq`; the prefix `-` and `DOTMINUS` on `neg`; `+` and `DOTPLUS` on `add`; the infix `-` and `DOTMINUS` on `sub`; `DOT`, juxtaposition, `TIMES` and `DOTTIMES` on `mul`; `DIV` on `div`; `BITAND`, `BITOR`, `BITXOR` and `BITNOT` on `and`, `oor`, `xor` and `not`.

28 helpers in all. Left on their glue classes, as the brief has them: `ZZ64`'s `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE` (rung K), `LSHIFT`, `RSHIFT`, `^` and `partitionL` (`:873-899`); `ZZ`'s `cmp`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `LSHIFT`, `RSHIFT`, `shift`, `^`, `narrow` and `widen` (`:1020-1084`). None of the 36 is left on its glue class.

`longOverflowingDiv` raises `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:78-82`), and so does `div` (`simpleArbitraryPrecisionArith.java:42-45`); walk's loader raises that as the library's `DivisionByZero` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:186-192`). So `ZZ64`'s and `ZZ`'s `DIV` by zero now throw `DivisionByZero`, which a `catch` sees, as the specification says. The glue classes they replace divide with
~~~~

## [S18] explorations/compile-ladder/rung-natives-small/REPORT.md, "What changed and why"

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

## [S19] explorations/compile-ladder/rung-natives-hard/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-hard/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-hard/REPORT.md:11-17, 3072 bytes, cut at 2500.

~~~~
## 1. What changed and why

P-58 has each native binding name a static helper of `nativeHelpers/`, checked against its helper from the step that moves it. For a binding over `NN32`, `NN64` or `Char`, walk already carries the declared type in a Java `int` or `long` (F-299), but the compiled checker reads every helper's `int` as `ZZ32` and `long` as `ZZ64`, except for six transfer helpers with fixed names (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:368-390`, `:493-504`; F-298). Question 2 of the batch record took the hard-set probe's way 2b at its default (`explorations/coordinator/CLIMB-BATCH-24.md:90-100`): the compiled path's rewrite composes the call with those six transfers, as the team's prelude does.

- **The rewrite** (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java`, +95 −12). Each declaration is told its owner, the simple name of the enclosing trait or object, `""` for a generic one, `null` at the top level (`:75`, `:91`). `fn` records each argument's declared type by its simple name, `self` taking the owner's (`:113-127`). Where the string names exactly one public static method of that name and arity (`soleMethod`, `:196-206`), each argument whose helper parameter is an `int` or a `long` that `NamingCzar.fortressTypeForForeignJavaType` reads otherwise than the declared `NN32`, `NN64` or `Char` (`Character` in the compiler's prelude) is wrapped in the matching transfer, and so is the call where the declared result type differs from the reading of the helper's result (`transfer`, `:176-193`; `:135-157`). A position the helper's own name already reads at the declared type, as each transfer's, gets none. So `opr +(self,b:NN32):NN32 = builtinPrimitive("…unsignedIntOverflowingAdd")` is checked and compiled as `makeNN32FromZZ32(unsignedIntOverflowingAdd(makeZZ32FromNN32(self), makeZZ32FromNN32(b)))`. Walk is untouched: its repository has the rewrite off (F-298), and walk carries these types by the declaration (F-299).
- **The 76 strings**, each naming the binding's existing helper, line for line `explorations/compile-ladder/plan-24/probes/families-base.tsv`'s family H (a script read each of the 76 lines after the patch: 76 'ok'): value object `NN32`'s 20 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:391-466`), trait `NN64`'s 17 (`Library/FortressLibrary.fss:917-984`), value object `Char`'s 39 (`FortressBuiltin.fss:612-722`). The library now has 97 bindings that name a helper, 36 in `FortressLibr
~~~~

## [S20] explorations/compile-ladder/rung-natives-hard/SKEPTIC.md, "The failure mode"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-hard/SKEPTIC.md#The failure mode'`

explorations/compile-ladder/rung-natives-hard/SKEPTIC.md:112-134, 1942 bytes.

~~~~
## The failure mode

The transfers are identities (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:230-231`), so the rewrite turns the checker's refusal of a binding over `NN32`, `NN64` or `Char` into a composition whatever the helper computes. SkHComp2, compiled:

    badLt(a:NN32, b:NN32):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intLT")
    badAdd(a:NN32, b:NN32):NN32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAdd")
    … println("badLt(2^31, 1) = " badLt(h, one)) ; println("badAdd(2^31, 2^31) = " badAdd(h, h))   (h: NN32 = 2147483648)

On the old code, `old-fortress.sh … compile SkHComp2.fss` refuses it:

    Could not check call to function builtinPrimitive_simpleIntArith_intLT
    - (ZZ32, ZZ32)->Boolean is not applicable to an argument of type (NN32, NN32).
    File SkHComp2.fss has 2 errors.

On the new code, `bin/fortress compile SkHComp2.fss` and `bin/fortress run SkHComp2` give:

    compile rc=0
    badLt(2^31, 1) =  true
    FortressException: class fortress.CompilerBuiltin$IntegerOverflow with string Integer overflow

So a loud static error becomes a quiet value: `true` where the specification's order of `NN32` gives 2^31 > 1, and an `IntegerOverflow` where the `NN32` sum 2^32 does overflow, though as a signed sum. Walk already answers so (F-299). SkHWalk4, the same `badLt` under walk, prints 'badLt(2^31, 1) = true' and 'library 2^31 < 1 = false' on both codes. So the checker now reads such a binding as walk does. The guards, not the checker, show that each of the 76 names the unsigned helper. My reading of families-base.tsv, and the worker's 2,933 values and my 2,571, all old against new, show that it does.

This does not stop the rung. Way 2b is the team's device, taken by Question 2 (`explorations/coordinator/CLIMB-BATCH-24.md:90-100`). I added the sentence to the record's FACTS hand-over.
~~~~
