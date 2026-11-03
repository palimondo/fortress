<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 97a416b18..c3a16b0bc added, changed or removed (the batch 25, landed at 11d2d8764, and the landing's own steps to c3a16b0bc), written by evidence.py. -->

# The entries that the range changed

- The batch, 97a416b18..11d2d8764: 20 entries: F-24, F-32, F-34, F-53, F-118, F-125, F-240, F-268, F-298, F-299, F-303, F-305, F-306, F-308, F-310, F-311, F-312, F-313, F-314, F-315
- After the landing, 11d2d8764..c3a16b0bc: 0 entries
- Now over 600 characters: 20 of 20: F-24, F-32, F-34, F-53, F-118, F-125, F-240, F-268, F-298, F-299, F-303, F-305, F-306, F-308, F-310, F-311, F-312, F-313, F-314, F-315

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-24, changed

- Size: at the base 1058 characters; at the landing 1168 characters; now 1168 characters, over 600.
- Section now: "Execution model".

At the base:

- F-24 **Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees.** It throws a `FortressError` that holds the exception's object, as `Int.overflow()` does for `IntegerOverflow` (F-132; row 347, fixed). A native bound to a helper of `nativeHelpers/` raises the library's own exception where the helper raises a class of the compiled prelude, such as `fortress.CompilerBuiltin$DivisionByZero`, so `DIV` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raises `DivisionByZero` (F-299, F-306, F-308). Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes, so a division by zero elsewhere ends the run (rows 336, 848). Gated by the `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`, and for a helper by `tests/NativeHelperRaiseWalk.fss`, `tests/ZZ32DivisionByZeroWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `tests/NN32DivisionByZeroWalk.fss` and `tests/NN64DivisionByZeroWalk.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` section 4.1.

Now:

- F-24 **Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees.** It throws a `FortressError` that holds the exception's object, as `Int.overflow()` does for `IntegerOverflow` (F-132; row 347, fixed). A native bound to a helper of `nativeHelpers/` raises the library's own exception where the helper raises a class of the compiled prelude, such as `fortress.CompilerBuiltin$DivisionByZero`, so `DIV` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raises `DivisionByZero` (F-299, F-306, F-308). Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes; `DIV`, `REM` and `MOD` by zero on the five integer types raise `DivisionByZero` through their helpers (F-312). Gated by the `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`, and for a helper by `tests/NativeHelperRaiseWalk.fss`, `tests/ZZ32DivisionByZeroWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `tests/NN32DivisionByZeroWalk.fss`, `tests/NN64DivisionByZeroWalk.fss`, and `tests/ZZ32RemainderByZeroWalk.fss` with its four siblings. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` section 4.1.

History blocks of the range:

- Written by the gather: 2026-11-03 02:40Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S1])
- Written by the gather: 2026-11-03 02:40Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S1])

## F-32, changed

- Size: at the base 2069 characters; at the landing 2006 characters; now 2006 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that most of the one library's native bindings name: of its 449 live bindings, 276 name one.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 173 that name one). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 24 are `IntLiteral`'s five conversions `asZZ32` to `asZZ` and 19 of its operators (`FortressBuiltin.fss:489-554`), 4 among the 154 and 20 among the 158; none of them can move yet, since their helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76; row 578). Every program's output needs `Writer`'s natives, among the 36 I/O methods, since `println` writes through a native `Writer`. MicroGPT also needs `nanoTime`, which needs a new helper, since the compiled one returns `RR64`; `getProgramArgsPrim`, which `System` calls as it loads; and `NativeArray`. The last two have no compiled analogue. The 42 with no analogue: `NativeArray` waits for the array decision on how a float vector's `double[]` store goes (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path. Detail: `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

Now:

- F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that 161 of the one library's 449 live native bindings still name.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 288 that name one). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 24 are `IntLiteral`'s five conversions `asZZ32` to `asZZ` and 19 of its operators (`FortressBuiltin.fss:489-554`), 4 among the 154 and 20 among the 158; none of them can move yet, since their helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76; row 578). Every program's output needs `Writer`'s natives, among the 36 I/O methods, since `println` writes through a native `Writer`. MicroGPT's `nanoTime` names a helper (F-314); it also needs `getProgramArgsPrim`, which `System` calls as it loads; and `NativeArray`. The last two have no compiled analogue. The 42 with no analogue: `NativeArray` waits for the array decision on how a float vector's `double[]` store goes (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path. Detail: `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

History blocks of the range:

- Written by the gather: 2026-11-03 02:34Z · rewritten · from `explorations/compile-ladder/rung-natives-float-bits/REPORT.md`, "For FACTS" · by climb batch 25 gather (cites [S2])
- Written by the gather: 2026-11-03 02:36Z · rewritten · from `explorations/compile-ladder/rung-natives-rr32/REPORT.md`, "For FACTS" · by climb batch 25 gather (cites [S3])
- Written by the gather: 2026-11-03 02:38Z · rewritten · from `explorations/compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S4])
- Written by the gather: 2026-11-03 02:40Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S1])
- Written by the gather: 2026-11-03 02:43Z · rewritten · from `explorations/compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S5])
- Written by the gather: 2026-11-03 02:45Z · rewritten · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S6])
- Written by the gather: 2026-11-03 02:45Z · rewritten · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S6])
- Written by the merged-diff review: 2026-11-03 03:32Z · rewritten · by climb batch 25's merged-diff review: title's 'most of the bindings name' a glue class false at 161 of 449; reworded to the count

## F-34, changed

- Size: at the base 1320 characters; at the landing 1478 characters; now 1478 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-34 **Under the switch-over's setting the code generator refused 52 declarations of the library's twelve components on climb batch 22's code, all of them declarations that the checker passes; on the present code the count is unmeasured.** Measured once on `2bff2fe23`, with the checker's failures caught per declaration and the bound `Any`, the distance stage's setting: `FortressLibrary` 28, `RangeInternals` 11, `List` and `String` 5 each, and `FlatString`, `Stream` and `NatReflect` 1 each. A declaration counted at its first wall, and no emitted class was run. Four of the 52 stopped first at a `where` clause in their own header, which the code generator compiles (F-181); a later wall of theirs is unmeasured. Each other kind has a ledger row, among them a local function (row 304), varargs (row 624), `asif` (row 818) and "Not in the trait table" (row 733), all four open, so after the switch-over the code generator still stands between the library and bytecode. On climb batch 21b's base (`aa5c67d48`) the dispatch generator refused none of `FortressLibrary`'s 178 overload sets. No test checks it, since the gate's distance stage runs no code generation. Detail: `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4", item 4; `perf-probes/codegen-distance/REPORT.md`, sections 2 to 6.

Now:

- F-34 **Under the switch-over's setting the code generator refuses 47 declarations of the library's fourteen components, in 11 kinds, all of them declarations that the checker passes.** Measured after climb batch 25's rung C with climb batch 25's planner's control (`compile-ladder/plan-25/probes/codegen.sh`, with the helper strings put back on their glue classes), against 50 in 14 kinds on its base in the same session; rung C's three kinds, `Any` in an `extends` clause, `forbid` and the `test` modifier, no longer occur (F-315). On climb batch 22's code (`2bff2fe23`), with the checker's failures caught per declaration and the bound `Any`, the distance stage's setting, it was 52 of twelve components. A declaration counted at its first wall, and no emitted class was run. Each kind left has a ledger row or a plan line, among them a local function (row 304), varargs (row 624), `asif` (row 818) and "Not in the trait table" (row 733), so after the switch-over the code generator still stands between the library and bytecode. On climb batch 21b's base (`aa5c67d48`) the dispatch generator refused none of `FortressLibrary`'s 178 overload sets. No test checks it, since the gate's distance stage runs no code generation. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "5. Programs run old against new, and the probes"; `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4", item 4; `perf-probes/codegen-distance/REPORT.md`, sections 2 to 6.

History blocks of the range:

- Written by the gather: 2026-11-03 02:48Z · rewritten · from `explorations/compile-ladder/rung-codegen-walls/REPORT.md`, "5. Programs run old against new, and the probes" · by climb batch 25 gather (cites [S7])

Report sections that the entry cites: [S7] `compile-ladder/rung-codegen-walls/REPORT.md`, "5. Programs run old against new, and the probes"; [S8] `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4".

## F-53, changed

- Size: at the base 1701 characters; at the landing 1701 characters; now 1701 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 24's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 25's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-03 03:48Z · rewritten · by climb batch 25 commit stage: the last landed gate is climb batch 25's: compile-ladder/climb-batch-25/gate/distance.txt '#total 0' and checker-count.txt '#total 0'; figures unchanged

Report sections that the entry cites: [S9] `references/batch.md`, "The checker count and the distance".

## F-118, changed

- Size: at the base 1172 characters; at the landing 1221 characters; now 1221 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-118 **A numeral's value reaches the compiled world intact, but the compiled path still prints a large unsigned value wrongly and cannot compare a numeral beyond `ZZ64` with another numeral.** The code generator carries a numeral as an `int`, a `long` or its decimal string, by its exact bit length. So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk refuses a numeral bound to `NN32` or `NN64`, F-57). The compiled path prints an `NN32` or `NN64` value above its type's signed half as negative (row 326). It compares two `IntLiteral`s at `ZZ64`, so `a = 18446744073709551615` then `a < 5` fails with `Not in range for ZZ64` (row 328). Neither row has a test. An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it. Walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

Now:

- F-118 **A numeral's value reaches the compiled world intact, and the compiled path prints a large unsigned value unsigned, but it cannot compare a numeral beyond `ZZ64` with another numeral.** The code generator carries a numeral as an `int`, a `long` or its decimal string, by its exact bit length. So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk refuses a numeral bound to `NN32` or `NN64`, F-57). The compiled path prints an `NN32` or `NN64` value above its type's signed half unsigned (F-313; row 326, fixed; `compiler_tests/UnsignedPrintingCompiled`). It compares two `IntLiteral`s at `ZZ64`, so `a = 18446744073709551615` then `a < 5` fails with `Not in range for ZZ64` (row 328), which no test pins. An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it. Walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

History blocks of the range:

- Written by the merged-diff review: 2026-11-03 03:32Z · rewritten · from `explorations/compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why" · by climb batch 25's merged-diff review: row 326 fixed by climb batch 25's rung U: the compiled path prints NN32 and NN64 unsigned (cites [S5])

Report sections that the entry cites: [S10] `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

## F-125, changed

- Size: at the base 566 characters; at the landing 668 characters; now 668 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-125 **Under `walk`, `LSHIFT` and `RSHIFT` on the four fixed widths give 0 or the sign at or beyond the width and reverse on a negative count, and `ZZ`'s `shift` is exact.** It builds P-69. `GCD` and `LCM` are nonnegative, and `0 LCM 0` is 0 (row 385). So the team's test `RangePrototype.fss` computes its signed stride with `GCD`. `CHOOSE` answers 0 for `k < 0` or `k > n`. Overflow raises (F-132). The compiler prelude has no `shift` (row 383). Gated by `tests/IntSemanticsRungI.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4 and 7.

Now:

- F-125 **Under `walk`, `LSHIFT` and `RSHIFT` on the four fixed widths give 0 or the sign at or beyond the width and reverse on a negative count, and `ZZ`'s `shift` is exact.** It builds P-69. `GCD` and `LCM` are nonnegative, and `0 LCM 0` is 0 (row 385). So the team's test `RangePrototype.fss` computes its signed stride with `GCD`. `CHOOSE` answers 0 for `k < 0` or `k > n` on the four fixed widths; on `ZZ` it answers 1 there (row 887, `tests/XXXChooseZZOutOfRangeWalk.fss`). Overflow raises (F-132). The compiler prelude has no `shift` (row 383). Gated by `tests/IntSemanticsRungI.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4 and 7.

History blocks of the range:

- Written by the gather: 2026-11-03 02:45Z · rewritten · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S6])

## F-240, changed

- Size: at the base 1833 characters; at the landing 1833 characters; now 1833 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 150 s and its distance stage 198 s at the last landed gate, climb batch 24's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 24's it stayed between about 150 s and 170 s, which no batch moved beyond noise: runs on climb batch 22c's base and on climb batch 23's and 24's rung trees took 129 to 181 s, at loads of up to 10.73. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 152 s), over fourteen components, ran at a load of 1.84, against 240 s (174 s) at 1.54 at climb batch 23's. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-24/gate/distance.txt`. Detail: `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 160 s and its distance stage 271 s at the last landed gate, climb batch 25's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 24's it stayed between about 150 s and 170 s, which no batch moved beyond noise: runs on climb batch 22c's base and on climb batch 23's and 24's rung trees took 129 to 181 s, at loads of up to 10.73. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 205 s), over fourteen components, ran at a load of 0.59, against 198 s (152 s) at 1.84 at climb batch 24's. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-25/gate/distance.txt`. Detail: `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-03 03:48Z · rewritten · by climb batch 25 commit stage: climb batch 25's gate: count stage 158 s by the file times of the gate's log (checker-count/javac.txt to run.txt); distance.txt '#seconds 271 FortressLibrary 205', '#machine ... load at start 0.59', first line '14 components'; compared against climb batch 24's 198 s (152 s) at 1.84

## F-268, changed

- Size: at the base 385 characters; at the landing 611 characters; now 611 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-268 **The code generator throws on `Any` as a static argument in an `extends` clause, after the checker has accepted the program.** It stops with "Only handling some static args of generic types in extends clause" (`CodeGen.java:5805`). Observed in the probe `AltEveryContra`; no ledger row or test holds it. Detail: `reviews/spec-refused-examples-judgement.md` sections 3.1 and 9.

Now:

- F-268 **The code generator emits `Any` as a static argument of an `extends` entry, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:5845-5851`); for `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null'. Row 889. Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `compiler_tests/XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

History blocks of the range:

- Written by the gather: 2026-11-03 02:48Z · rewritten · from `explorations/compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" · by climb batch 25 gather (cites [S11])

Report sections that the entry cites: [S11] `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why".

## F-298, changed

- Size: at the base 1656 characters; at the landing 2090 characters; now 2090 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-298 **A `builtinPrimitive` body whose string names a static helper of `nativeHelpers/` compiles on the compiled path as a call of that helper.** It builds P-58, "Every native binding is a ...". At the parse, in every run but walk's, the checker's count and distance stages among them, the rewrite makes such a body of a component's declaration, or of a trait's or object's member, a call through a synthetic `import java` of the helper, `self` first, so the checker checks the declaration against the helper's Java signature; in walk's world it reads the Java types as the one library's, `int` as `ZZ32`, as walk reads a written `import java` (F-180; row 845). A string under that package that names no public static method is a static error. Every other body stays a call of `builtinPrimitive`, which in walk's world the checker types at the declared return type against no Java signature, and which a compile refuses: a string outside that package, the glue classes' among them; a declaration with a varargs parameter (row 849); a local function or an object expression's method, which the rewrite does not reach (row 865). F-308 gives the transfers for `NN32`, `NN64` and `Char`; F-301, the bytes, those of a written `import java` alias call. The `fortress-repo` skill's `references/compiler.md`, "Natives", gives the messages. Test: `compiler_tests/NativeHelperBindingCompiled`, with `XXXNativeHelperMisfitCompiled`, `XXXNativeHelperMisspeltCompiled` and `XXXNativeHelperOutsidePackageCompiled`; the reading in walk's world, `NamingCzarJUTest.testForeignOneLibrary`. Detail: `compile-ladder/rung-natives-compiled/REPORT.md`, "What changed and why".

Now:

- F-298 **A `builtinPrimitive` body whose string names a static helper of `nativeHelpers/` compiles on the compiled path as a call of that helper.** It builds P-58, "Every native binding is a ...". At the parse, in every run but walk's, the checker's count and distance stages among them, the rewrite makes such a body of a component's declaration, or of a trait's or object's member, a call through a synthetic `import java` of the helper, `self` first, so the checker checks the declaration against the helper's Java signature; in walk's world it reads the Java types as the one library's, `int` as `ZZ32`, as walk reads a written `import java` (F-180; row 845). A string under that package that names no public static method is a static error. Every other body stays a call of `builtinPrimitive`, which in walk's world the checker types at the declared return type against no Java signature, and which a compile refuses: a string outside that package, the glue classes' among them; a declaration with a varargs parameter (row 849); a local function or an object expression's method, which the rewrite does not reach (row 865); a component that imports a grammar, which is parsed without the rewrite (row 884). The rewrite is switched by one static flag that the JVM's newest repository sets, so `fortress parse` and `fortress api` rewrite only after a compile in the same JVM (row 882), and a component that names a helper is parsed whole four times for one compile (row 883). F-308 gives the transfers for `NN32`, `NN64` and `Char`, and their limits (rows 885, 886); F-301, the bytes, those of a written `import java` alias call. The `fortress-repo` skill's `references/compiler.md`, "Natives", gives the messages. Test: `compiler_tests/NativeHelperBindingCompiled`, with `XXXNativeHelperMisfitCompiled`, `XXXNativeHelperMisspeltCompiled` and `XXXNativeHelperOutsidePackageCompiled`, `XXXNativeHelperLocalFunctionCompiled` (row 865); the reading in walk's world, `NamingCzarJUTest.testForeignOneLibrary`. Detail: `compile-ladder/rung-natives-compiled/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-03 02:43Z · rewritten · from `explorations/compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S5])

Report sections that the entry cites: [S12] `references/compiler.md`, "Natives"; [S13] `compile-ladder/rung-natives-compiled/REPORT.md`, "What changed and why".

## F-299, changed

- Size: at the base 1917 characters; at the landing 2339 characters; now 2339 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 173 of the one library's 449 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. `FlatString` and `JavaString` carry no `self`, since a program can name its own types so; a helper binding of a `FlatString` method would stop every program at load. Its departures: a generic owner's dotted method is checked only where an instance is made (row 864); the declaring type is read, not the value's, so a program's object that extends a carried trait against its `comprises` clause passes the helper a value that no Java type carries (row 551); a native over `String` receives a non-flat string's type name (row 846). The 173 by type: `ZZ32` 20 and `Int` 2, `ZZ64` 21 and `ZZ` 16 (F-306), `ZZ32`'s and `ZZ64`'s `CHOOSE` among them (F-305), `Float` 30 (F-303), the small rest 8 (F-307), and `NN32` 20, `NN64` 17 and `Char` 39 (F-308); the other 276 name glue classes. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers and the messages. Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk` and `NativeHelperUncarriedSelf*Walk`. Detail: `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why".

Now:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 288 of the one library's 449 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. `FlatString` and `JavaString` carry no `self`, since a program can name its own types so; a helper binding of a `FlatString` method would stop every program at load. Its departures: a generic owner's dotted method is checked only where an instance is made (row 864); the declaring type is read, not the value's, so a program's object that extends a carried trait against its `comprises` clause passes the helper a value that no Java type carries (row 551); a native over `String` receives a non-flat string's type name (row 846). The 288 by type: `ZZ32` 25 and `Int` 3, `ZZ64` 26 and `ZZ` 22 (F-306), the five types' `REM` and `MOD` (F-312) and their divisors (F-314) among them, `ZZ32`'s and `ZZ64`'s `CHOOSE` among them (F-305), `Float` 57 and the top-level `fromRawBits` (F-303), `RR32` 50 (F-310, its `asFloat` F-311), the `asFloat`s of `Long` and `BigNum` 2 (F-311), the small rest 8 (F-307), and `NN32` 27, `NN64` 24, `UnsignedLong` 3 and `Char` 39 (F-308, F-313), and the top-level `nanoTime` (F-314); the other 161 name glue classes. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers and the messages. Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `ZZ32RemainderByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperFamilyFloatBitsWalk`, `NativeHelperFamilyRR32Walk`, `NativeHelperFamilyAsFloatWalk`, `NativeHelperFamilyDivisorsWalk`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk` and `NativeHelperUncarriedSelf*Walk`. Detail: `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-03 02:34Z · rewritten · from `explorations/compile-ladder/rung-natives-float-bits/REPORT.md`, "For FACTS" · by climb batch 25 gather (cites [S2])
- Written by the gather: 2026-11-03 02:36Z · rewritten · from `explorations/compile-ladder/rung-natives-rr32/REPORT.md`, "For FACTS" · by climb batch 25 gather (cites [S3])
- Written by the gather: 2026-11-03 02:38Z · rewritten · from `explorations/compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S4])
- Written by the gather: 2026-11-03 02:40Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S1])
- Written by the gather: 2026-11-03 02:43Z · rewritten · from `explorations/compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S5])
- Written by the gather: 2026-11-03 02:45Z · rewritten · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S6])

Report sections that the entry cites: [S14] `references/interpreter.md`, "Natives"; [S15] `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; [S16] `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why".

## F-303, changed

- Size: at the base 1403 characters; at the landing 1775 characters; now 1775 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-303 **Walk carries a declared `Float` in a Java `double`, as it carries `RR64`, so a helper binding with a parameter or result declared `Float` loads; `Float`'s 30 bindings that fit a helper name `simpleDoubleArith`'s, and every value they give under walk is the glue classes'.** `javaFor` names `Float` beside `RR64` (`interpreter/glue/StaticNativeApp.java:51`); without it walk refused such a binding at load, 'no Java type carries the declared type of parameter a.' The 30 are `Float`'s `asString`, `asExprString`, `|self|`, the five comparisons, unary `-`, `+`, `-`, `DOT`, `TIMES`, juxtaposition, `/`, `SQRT`, `^` at a `Float` and at an `RR64` exponent, the eight elementary functions, `floor`, `ceiling`, `truncate` and `round` (`LibraryBuiltin/FortressBuiltin.fss:55-193`); its other 32 have no fitting helper and still name glue classes: the predicates `isNaN` and `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, the 18 directed roundings, `^` at `RR32` and `AnyIntegral`, `atan2`, and the floor and ceiling brackets `|\self/|` and `|/self\|` (`LibraryBuiltin/FortressBuiltin.fss:60-189`). F-299 counts the bindings that name a helper. Test: `tests/NativeHelperFloatCarriedWalk.fss`, with `tests/NativeHelperFamilyFloatWalk.fss` and `compiler_tests/NativeHelperFamilyFloatCompiled`. Detail: `compile-ladder/rung-natives-float/REPORT.md`, "What changed and why".

Now:

- F-303 **Walk carries a declared `Float` in a Java `double`, as it carries `RR64`, so a helper binding with a parameter or result declared `Float` loads; 57 of `Float`'s 62 bindings, and the top-level `fromRawBits`, name `simpleDoubleArith`'s helpers, and every value they give under walk is the glue classes'.** `javaFor` names `Float` beside `RR64` (`interpreter/glue/StaticNativeApp.java:51`); without it walk refused such a binding at load, 'no Java type carries the declared type of parameter a.' The 57 are `asString`, `asExprString`, `|self|`, the five comparisons, unary `-`, `+`, `-`, `DOT`, `TIMES`, juxtaposition, `/`, `SQRT`, `^` at a `Float` and at an `RR64` exponent, the eight elementary functions, `floor`, `ceiling`, `truncate` and `round`, over helpers that existed; and `isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX` and the 18 directed roundings, over 27 new one-line helpers, with `fromRawBits` over a 28th (`LibraryBuiltin/FortressBuiltin.fss:55-193`; `Library/FortressLibrary.fss:4535`; `nativeHelpers/simpleDoubleArith.java:136-246`). Its other 5 have no fitting helper and still name glue classes: `^` at `RR32` and `AnyIntegral`, `atan2`, and the floor and ceiling brackets `|\self/|` and `|/self\|` (`LibraryBuiltin/FortressBuiltin.fss:156-189`), over item 331. F-299 counts the bindings that name a helper. Test: `tests/NativeHelperFloatCarriedWalk.fss`, with `tests/NativeHelperFamilyFloatWalk.fss`, `tests/NativeHelperFamilyFloatBitsWalk.fss`, `compiler_tests/NativeHelperFamilyFloatCompiled` and `compiler_tests/NativeHelperFamilyFloatBitsCompiled`. Detail: `compile-ladder/rung-natives-float/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-float-bits/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-03 02:34Z · rewritten · from `explorations/compile-ladder/rung-natives-float-bits/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S17])

Report sections that the entry cites: [S18] `compile-ladder/rung-natives-float/REPORT.md`, "What changed and why"; [S17] `compile-ladder/rung-natives-float-bits/REPORT.md`, "What changed and why".

## F-305, changed

- Size: at the base 1407 characters; at the landing 1479 characters; now 1479 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-305 **`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths, and the helper is exact, raises `IntegerOverflow` where the binomial coefficient does not fit, and shares no state between calls.** It builds P-73. Trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose` (`Library/FortressLibrary.fss:789`, `:882`), which the compiler's prelude binds too, `NN32`'s compiled `CHOOSE` through the `ZZ64` helper; `NN32`'s binding in the one library stays on its glue class. Past their safe-bound tables every coefficient overflows, from `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`, and the helpers raise `IntegerOverflow` there (`nativeHelpers/simpleIntArith.java:210-213`, `simpleLongArith.java:183-186`); each slow-path call has its own scratch array (`simpleIntArith.java:162-163`, `simpleLongArith.java:136-137`), so calls in parallel no longer corrupt each other. Swept against the exact value, 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs give walk's glue arithmetic. Test: `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`; the guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`. Detail: `compile-ladder/rung-natives-choose/REPORT.md`, sections 1, 2 and 5.

Now:

- F-305 **`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths, and the helper is exact, raises `IntegerOverflow` where the binomial coefficient does not fit, and shares no state between calls.** It builds P-73. Trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose` (`Library/FortressLibrary.fss:789`, `:882`), which the compiler's prelude binds too, `NN32`'s compiled `CHOOSE` through the `ZZ64` helper; `NN32`'s binding in the one library names `simpleUnsignedIntArith.unsignedIntOverflowingChoose` through the `NN32` transfer (F-313). Past their safe-bound tables every coefficient overflows, from `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`, and the helpers raise `IntegerOverflow` there (`nativeHelpers/simpleIntArith.java:222-225`, `simpleLongArith.java:200-203`); each slow-path call has its own scratch array (`simpleIntArith.java:174-175`, `simpleLongArith.java:153-154`), so calls in parallel no longer corrupt each other. Swept against the exact value, 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs give walk's glue arithmetic. Test: `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `compiler_tests/ChooseHelperZZ64Compiled`, `compiler_tests/ChooseTableCompiledRungE`; the guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`. Detail: `compile-ladder/rung-natives-choose/REPORT.md`, sections 1, 2 and 5.

History blocks of the range:

- Written by the gather: 2026-11-03 02:41Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "Sentences made false" · by climb batch 25 gather (cites [S19])
- Written by the gather: 2026-11-03 02:47Z · rewritten · from `explorations/compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S5])

## F-306, changed

- Size: at the base 1181 characters; at the landing 1274 characters; now 1274 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-306 **Under walk, trait `ZZ64`'s 20 and trait `ZZ`'s 16 native bindings name helpers of `nativeHelpers/`, keep every value the glue classes gave, and their `DIV` by zero throws `DivisionByZero`.** The 36 (`Library/FortressLibrary.fss:831-905`, `:1007-1076`) name 28 helpers of `simpleLongArith`, `simpleIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`, those that the compiler's prelude binds for the same operations; `ZZ64`'s four wrapping bindings name the wrapping helpers that the prelude binds under its `BOX` spellings (row 348). `longOverflowingDiv` and `div` raise the library's `DivisionByZero` under walk (F-24); `REM` and `MOD` still name glue classes and end the run at a zero divisor (row 336 for `ZZ64`, row 848 for `ZZ`). A `ZZ` helper takes only a `BigNum` value, since walk's loader unboxes a `BigInteger` by `getBigInteger`; walk's coercions convert another integer operand first. Test: `tests/NativeHelperFamilyIntegersWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `compiler_tests/NativeHelperFamilyIntegersCompiled`. Detail: `compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why".

Now:

- F-306 **Under walk, trait `ZZ64`'s 26 and trait `ZZ`'s 22 native bindings name helpers of `nativeHelpers/`, keep every value the glue classes gave, and their `DIV` by zero throws `DivisionByZero`.** The 48 (`Library/FortressLibrary.fss:831-905`, `:1007-1076`) name 29 helpers of `simpleLongArith`, `simpleIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`, those that the compiler's prelude binds for the same operations, and 11 new ones, four of `REM` and `MOD` (F-312) and seven of the divisors, `ZZ`'s `CHOOSE` and `cmp` (F-314); `ZZ64`'s four wrapping bindings name the wrapping helpers that the prelude binds under its `BOX` spellings (row 348). `longOverflowingDiv` and `div` raise the library's `DivisionByZero` under walk (F-24); `REM` and `MOD` name the new helpers, and raise `DivisionByZero` at a zero divisor too (F-312). A `ZZ` helper takes only a `BigNum` value, since walk's loader unboxes a `BigInteger` by `getBigInteger`; walk's coercions convert another integer operand first. Test: `tests/NativeHelperFamilyIntegersWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `compiler_tests/NativeHelperFamilyIntegersCompiled`. Detail: `compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-03 02:40Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S1])
- Written by the gather: 2026-11-03 02:40Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S1])
- Written by the gather: 2026-11-03 02:45Z · rewritten · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S6])
- Written by the gather: 2026-11-03 02:45Z · rewritten · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S6])
- Written by the merged-diff review: 2026-11-03 03:32Z · rewritten · by climb batch 25's merged-diff review: counts corrected to the tree: trait ZZ64 holds 26 helper strings and ZZ 22, 48 in all, over 29 existing helpers and 11 new (count of builtinPrimitive strings naming nativeHelpers in Library/FortressLibrary.fss:831-905 and :1007-1076); F-299 already gave ZZ64 26

Report sections that the entry cites: [S20] `compile-ladder/rung-natives-integers/REPORT.md`, "What changed and why".

## F-308, changed

- Size: at the base 1740 characters; at the landing 1950 characters; now 1950 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-308 **A `builtinPrimitive` binding over `NN32`, `NN64` or `Char` whose helper takes or answers a Java `int` or `long` compiles on the compiled path through the six transfer helpers, and `NN32`'s 20, `NN64`'s 17 and `Char`'s 39 bindings name their helpers.** Where the declaration says `NN32`, `NN64` or `Char` and the helper has an `int` or a `long`, the rewrite of F-298 wraps that argument, or the call, in the matching transfer, as the compiler's prelude does; walk needs none. A helper overloaded at its arity gets no transfer, nor does `self` in a generic owner. The transfers are identities, so the checker passes whatever the helper computes: a binding over `NN32` to the signed `simpleIntArith.intLT` compiles and answers `true` for 2^31 < 1, as walk does; only the walk and compiled guards check that each of the 76 names the unsigned helper. Under walk the 76 keep the glue classes' values, but `NN32`'s and `NN64`'s `DIV` by zero throws `DivisionByZero`. Six of the 82 bindings over these types stay on glue classes: `NN32`'s `asFloat` and `CHOOSE`, `UnsignedLong`'s string getters (row 326), `NN64`'s prefix `DOTMINUS` (row 860) and `Char`'s `asExprString` (row 861). The `fortress-repo` skill's `references/compiler.md`, "Natives", names the transfers. Test: `compiler_tests/NativeHelperTransferCompiled`; the guards `NativeHelperFamilyNN32Compiled`, `NativeHelperFamilyNN64Compiled`, `NativeHelperFamilyCharCompiled` and `tests/NativeHelperFamilyNN32Walk`, `NativeHelperFamilyNN64Walk`, `NativeHelperFamilyCharWalk`; `tests/NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`. Detail: `compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode".

Now:

- F-308 **A `builtinPrimitive` binding over `NN32`, `NN64` or `Char` whose helper takes or answers a Java `int` or `long` compiles on the compiled path through the six transfer helpers, and `NN32`'s 27, `NN64`'s 24, `UnsignedLong`'s 3 and `Char`'s 39 bindings name their helpers.** Where the declaration says `NN32`, `NN64` or `Char`, or an argument `UnsignedLong`, walk's object of `NN64` (F-313), and the helper has an `int` or a `long`, the rewrite of F-298 wraps that argument, or the call, in the matching transfer, as the compiler's prelude does; walk needs none. A helper overloaded at its arity gets no transfer (row 885), nor does `self` in a generic owner; the declared type is read by its simple name (row 886). The transfers are identities, so the checker passes whatever the helper computes: a binding over `NN32` to the signed `simpleIntArith.intLT` compiles and answers `true` for 2^31 < 1, as walk does; only the walk and compiled guards check that each of the 93 names the unsigned helper. Under walk the 93 keep the glue classes' values, but `NN32`'s and `NN64`'s `DIV`, `REM` and `MOD` by zero throw `DivisionByZero`. One of the 94 bindings over these types, `UnsignedLong`'s `asFloat` at `RR64` among them, stays on a glue class: `Char`'s `asExprString` (row 861). The `fortress-repo` skill's `references/compiler.md`, "Natives", names the transfers. Test: `compiler_tests/NativeHelperTransferCompiled`; the guards `NativeHelperFamilyNN32Compiled`, `NativeHelperFamilyNN64Compiled`, `NativeHelperFamilyCharCompiled`, `NativeHelperFamilyAsFloatCompiled`, `NativeHelperFamilyUnsignedCompiled` and `tests/NativeHelperFamilyNN32Walk`, `NativeHelperFamilyUnsignedWalk`, `NativeHelperFamilyNN64Walk`, `NativeHelperFamilyCharWalk`; `tests/NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`. Detail: `compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode".

History blocks of the range:

- Written by the gather: 2026-11-03 02:38Z · rewritten · from `explorations/compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S4])
- Written by the gather: 2026-11-03 02:40Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S1])
- Written by the gather: 2026-11-03 02:43Z · rewritten · from `explorations/compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S5])
- Written by the gather: 2026-11-03 02:45Z · rewritten · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S6])

Report sections that the entry cites: [S12] `references/compiler.md`, "Natives"; [S21] `compile-ladder/rung-natives-hard/REPORT.md`, "1. What changed and why"; [S22] `compile-ladder/rung-natives-hard/SKEPTIC.md`, "The failure mode".

## F-310, added

- Size: at the base none; at the landing 980 characters; now 980 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-310 **Value object `RR32`'s 49 native bindings name the 46 helpers of `simpleFloatArith`, over a Java `float`, and every value they give under walk is the glue class `RR32`'s.** Walk carries a declared `RR32` in a `float` (`interpreter/glue/StaticNativeApp.java:52`) and the checker reads a `float` as `RR32`, so each binding fits as a bare string, and the distance stage checks it (a binding misnamed gives 'Function body has type RR32, but declared return type is Boolean.'). `asString` and `asExprString` share `floatToString`, and `DOT`, `TIMES` and juxtaposition `floatMul`; `RR32`'s `asFloat` names `simpleDoubleArith.floatToDouble` at `RR64` (F-311), and its `^` at a `Float` exponent still names a glue class. No prelude file imports the class. F-299 counts the bindings that name a helper. Test: `tests/NativeHelperFamilyRR32Walk.fss`, with `compiler_tests/NativeHelperFamilyRR32Compiled`. Detail: `compile-ladder/rung-natives-rr32/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-03 02:36Z · added · from `explorations/compile-ladder/rung-natives-rr32/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S23])
- Written by the gather: 2026-11-03 02:38Z · rewritten · from `explorations/compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S4])

Report sections that the entry cites: [S23] `compile-ladder/rung-natives-rr32/REPORT.md`, "What changed and why".

## F-311, added

- Size: at the base none; at the landing 920 characters; now 920 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-311 **`Int`'s, `RR32`'s, `NN32`'s, `Long`'s and `BigNum`'s `asFloat` answer `RR64`, as `Number`'s abstract `asFloat` declares, and name `nativeHelpers`' `intToDouble`, `floatToDouble`, `unsignedIntToDouble`, `longToDouble` and `toDouble`; walk's values are unchanged.** `LibraryBuiltin/FortressBuiltin.fss:241`, `:374`, `:383`, `:396`, `:570`; the abstract at `Library/FortressLibrary.fsi:291`, the specification's `numbers.tex:49`. At `Float`, the team's declared result, the checker refused the move ('Function body has type RR64, but declared return type is Float.', climb batch 23's fork 12); walk carries both in a `double` and answers the same `Float` object (F-303). `longToDouble` and `toDouble` are new, `(double) a` and `a.doubleValue()`. Tests: `tests/NativeHelperFamilyAsFloatWalk`, `compiler_tests/NativeHelperFamilyAsFloatCompiled`. Detail: `explorations/compile-ladder/rung-natives-asfloat/REPORT.md`.

History blocks of the range:

- Written by the gather: 2026-11-03 02:38Z · added · from `explorations/compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S4])

## F-312, added

- Size: at the base none; at the landing 1298 characters; now 1298 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-312 **`REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` name helpers of `nativeHelpers/` on both paths, keep every value the glue classes gave, and throw `DivisionByZero` at a zero divisor.** The ten bindings (`Library/FortressLibrary.fss:780-783`, `:873-876`, `:956-959`, `:1053-1056`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:440-443`) name `simpleIntArith.intRem` and `intMod`, `simpleLongArith.longRem` and `longMod`, `simpleUnsignedIntArith.unsignedIntRem` and `unsignedIntMod`, `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod` (through the transfers of F-308), and `simpleArbitraryPrecisionArith.rem` and `mod`: `REM` the remainder of the truncating division, `MOD` of the floor division with the divisor's sign, and on the natural numbers `MOD` the same as `REM`. Each raises `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor, which walk raises as the library's `DivisionByZero` (F-24). 626 printed pairs are the old code's. Test: `tests/ZZ32RemainderByZeroWalk`, `ZZ64RemainderByZeroWalk`, `NN32RemainderByZeroWalk`, `NN64RemainderByZeroWalk`, `ZZRemainderByZeroWalk`, `NativeHelperFamilyRemainderWalk`; `compiler_tests/NativeHelperFamilyRemainderCompiled`. Detail: `compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-03 02:40Z · added · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather (cites [S1])

Report sections that the entry cites: [S1] `compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why".

## F-313, added

- Size: at the base none; at the landing 1105 characters; now 1105 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-313 **The compiled path prints an `NN32` or `NN64` unsigned and negates an `NN64` by wrapping, and `UnsignedLong`'s `self` takes the `NN64` transfer, so `UnsignedLong`'s three bindings, `NN64`'s prefix `DOTMINUS` and `NN32`'s `CHOOSE` name helpers.** `FNN32`'s `toString` and `asString`, `FNN64`'s `toString` and `simpleUnsignedLongArith.unsignedLongToString` print unsigned; `unsignedLongWrappingNeg` answers 0 minus its operand, wrapped; the new `unsignedLongToDouble` answers an unsigned long's nearest double, ties to even, as walk's glue does; the rewrite reads an argument declared `UnsignedLong`, walk's object of `NN64`, through the `NN64` argument transfer. Under walk the five keep the glue classes' values; on the compiled path the prelude's `NN64` printing and prefix `BOXMINUS` move with the helpers. Test: `compiler_tests/UnsignedPrintingCompiled`, `UnsignedLongToStringHelperCompiled`, `NN64WrappingNegationHelperCompiled`, `NativeHelperFamilyUnsignedCompiled`; `tests/NativeHelperFamilyUnsignedWalk`. Detail: `compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-03 02:43Z · added · from `explorations/compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S5])

Report sections that the entry cites: [S5] `compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why".

## F-314, added

- Size: at the base none; at the landing 1150 characters; now 1150 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-314 **Under walk, `GCD`, `LCM` and `partitionL` on the five integer types, `CHOOSE` on `NN64` and `ZZ`, `ZZ`'s `cmp` and `nanoTime` name 18 new helpers of `nativeHelpers/`, which keep every value the glue classes gave and share no state.** It builds P-58, P-70 and P-73. The strings are at `Library/FortressLibrary.fss:785`, `:787`, `:808`, `:878`, `:880`, `:899`, `:961`, `:963`, `:965`, `:982`, `:1021`, `:1058`, `:1060`, `:1062`, `:4522` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:445`, `:447`, `:468`; the helpers at the ends of `simpleIntArith`, `simpleLongArith`, `simpleUnsignedIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`, every fixed width's divisor from one unsigned Euclid, `simpleUnsignedLongArith.unsignedLongGcd`. `nanoTime` answers `ZZ64` through a `long`, which the compiled checker reads as `ZZ64` (row 75). `ZZ`'s `CHOOSE` keeps `BigNum`'s 1 at `k < 0` or `k > n` (row 887). Test: `tests/NativeHelperFamilyDivisorsWalk.fss`, `compiler_tests/NativeHelperFamilyDivisorsCompiled`. Detail: `compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" and "5. Old against new".

History blocks of the range:

- Written by the gather: 2026-11-03 02:45Z · added · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather (cites [S6])

Report sections that the entry cites: [S6] `compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why".

## F-315, added

- Size: at the base none; at the landing 866 characters; now 866 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function declared `test`.** The forbid clause throws on, as a `ForbiddenException` chained to it, an exception of a listed type that no catch clause took, by the library's own constructor; `Bottom`, `Self` or an abbreviated type as such a static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. With the control of climb batch 25's planner, the library's refusals fall from 50 to 47 and its kinds from 14 to 11; `test stringifyChars` stops next at a call of a varargs function (row 624). Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5.

History blocks of the range:

- Written by the gather: 2026-11-03 02:48Z · added · from `explorations/compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" · by climb batch 25 gather (cites [S11])
- Written by the gather: 2026-11-03 02:48Z · rewritten · from `explorations/compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" · by climb batch 25 gather (cites [S11])

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/compile-ladder/rung-natives-remainders/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-remainders/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-remainders/REPORT.md:11-29, 3699 bytes, cut at 2500.

~~~~
## What changed and why

Rows 336 and 848: under walk, the ten bindings of `REM` and `MOD` on the five integer types named glue classes that divide with no zero test (`interpreter/glue/prim/Int.java:130-134`, `:158-162`; `Long.java:144-148`, `:170-174`; `NN32.java:137-141`, `:164-169`; `UnsignedLong.java:138-142`, `:164-169`; `BigNum.java:164-168`, `:200-208`), so a zero divisor ended the run with a Java `ArithmeticException`, which walk makes a `ProgramError` that no `catch` takes (F-24). P-58 has each binding name a static helper of `nativeHelpers/`, which both paths call; a helper's raise of `fortress.CompilerBuiltin$DivisionByZero` reaches a Fortress `catch` as the library's `DivisionByZero` (F-24), as `DIV` on the same five types already does (F-306, F-308).

The change is the planner's `explorations/compile-ladder/plan-25/probes/rung-R.patch`, applied with `git apply`, its five source comments rewritten (decision 1):

- Ten helpers, each pair right after its class's overflowing division helper (fork 2), each raising `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor and computing every other value as the glue class it replaces (fork 4):
  - `simpleIntArith.intRem` (`a % b`) and `intMod` (`Math.floorMod`), `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:84-94`;
  - `simpleLongArith.longRem` and `longMod`, the same at `long`, `simpleLongArith.java:84-94`;
  - `simpleUnsignedIntArith.unsignedIntRem` and `unsignedIntMod`, both `Integer.remainderUnsigned`, `simpleUnsignedIntArith.java:67-76`;
  - `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod`, both `Long.remainderUnsigned`, `simpleUnsignedLongArith.java:80-89`;
  - `simpleArbitraryPrecisionArith.rem` (`BigInteger.remainder`) and `mod` (`BigInteger.mod`, negated through the divisor's absolute value where the divisor is negative, as `BigNum$Mod`), `simpleArbitraryPrecisionArith.java:47-58`.
- Ten strings moved, each one line: trait `ZZ32`'s `REM` and `MOD` (`Library/FortressLibrary.fss:781`, `:783`) to `simpleIntArith.intRem` and `intMod`; trait `ZZ64`'s (`:874`, `:876`) to `simpleLongArith.longRem` and `longMod`; trait `NN64`'s (`:957`, `:959`) to `simpleUnsignedLongArith.unsignedLongRem` and `unsignedLongMod`, through the `NN64` transfers (F-308); trait `ZZ`'s (`:1054`, `:1056`) to `simpleArbitraryPrecisionArith.rem` and `mod`; value object `NN32`'s (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:441`, `:443`) to `simpleUnsignedIntArith.unsignedIntRem
~~~~

## [S2] explorations/compile-ladder/rung-natives-float-bits/REPORT.md, "For FACTS"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float-bits/REPORT.md#For FACTS'`

explorations/compile-ladder/rung-natives-float-bits/REPORT.md:128-130, 94 bytes.

~~~~
## For FACTS

In `record.md`, "For FACTS": F-303's new text, and the counts of F-32 and F-299.
~~~~

## [S3] explorations/compile-ladder/rung-natives-rr32/REPORT.md, "For FACTS"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-rr32/REPORT.md#For FACTS'`

explorations/compile-ladder/rung-natives-rr32/REPORT.md:122-124, 144 bytes.

~~~~
## For FACTS

The entry is in `record.md`. Its test: `tests/NativeHelperFamilyRR32Walk.fss` and `compiler_tests/NativeHelperFamilyRR32Compiled`.
~~~~

## [S4] explorations/compile-ladder/rung-natives-asfloat/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-asfloat/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-asfloat/REPORT.md:9-23, 2802 bytes, cut at 2500.

~~~~
## What changed and why

Five bindings of walk's library move from glue classes onto static helpers of `nativeHelpers/` (P-58), and their declared result goes from walk's float object `Float` to `RR64`, the type of the library's abstract `asFloat` on `Number` (Library/FortressLibrary.fsi:291) and of the specification's text (numbers.tex:49):

| owner | line | was | now |
|---|---|---|---|
| `RR32` | FortressBuiltin.fss:241 | `asFloat(self): Float`, `RR32$AsFloat` | `asFloat(self): RR64`, `simpleDoubleArith.floatToDouble` |
| `Int` | :374 | `Float`, `Int$AsFloat` | `RR64`, `simpleIntArith.intToDouble` |
| `Long` | :383 | `Float`, `Long$AsFloat` | `RR64`, `simpleLongArith.longToDouble` (new) |
| `NN32` | :396 | `Float`, `NN32$AsFloat` | `RR64`, `simpleUnsignedIntArith.unsignedIntToDouble`, through the rewrite's NN32 transfer (F-308) |
| `BigNum` | :570 | `Float`, `BigNum$AsFloat` | `RR64`, `simpleArbitraryPrecisionArith.toDouble` (new) |

The two new helpers compute as their glue classes: `simpleLongArith.longToDouble` is `(double) a`, as `Long$AsFloat` (interpreter/glue/prim/Long.java:268-271); `simpleArbitraryPrecisionArith.toDouble` is `a.doubleValue()`, as `BigNum$AsFloat` (BigNum.java:280-283). The three existing helpers compute as theirs: `intToDouble` `(double) a` as `Int$AsFloat` (Int.java:244-246); `floatToDouble` `(double) f` as `RR32$AsFloat` (RR32.java:390-392); `unsignedIntToDouble` `(double) toLong(a)` (simpleUnsignedIntArith.java:226-228), the unsigned value, as `NN32$AsFloat`'s `Unsigned.toDouble(x)` (NN32.java:257-259). Walk boxes the helper's `double` at the declared `RR64` as the same `Float` object as before (F-303), so no value moves under walk: the walk guard passes on the base and on the edit with the same assertions.

I took rung-A.patch's text as it is in the library file, all five headers and strings; in the two Java files I kept its two helpers and their bodies and changed two things: their comments, and the place of `longToDouble`. The patch's comments named the glue class each helper copies ("as walk's Long$AsFloat computes it"); the glue classes go at the switch-over (F-32), so each comment now says what the helper computes ("the nearest double, ties to even", and for `ZZ` "an infinity past the double range"), which the guards assert. The patch put `longToDouble` under the comment "// The original \"Java-like\" arithmetic operators", which heads the arithmetic section that begins at `longAdd`; it is a conversion, so it now sits 
~~~~

## [S5] explorations/compile-ladder/rung-natives-unsigned/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-unsigned/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-unsigned/REPORT.md:11-22, 3588 bytes, cut at 2500.

~~~~
## 1. What changed and why

The commits, on `wip/rung-natives-unsigned` from `97a416b18`: `e38365e40` the tests first; `114e35c29` the fix; `776a4e5d9` the two tests of the rewrite's limits; the commit of this report and `record.md`.

The planner's `explorations/compile-ladder/plan-25/probes/rung-U.patch`, applied as it stands (`git apply`, one warning for the file's own space-then-tab indent at `simpleUnsignedLongArith.java:114`):

- `simpleUnsignedLongArith.unsignedLongToString` prints by `Long.toUnsignedString` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:23-25`), where it printed `Long.toString`, so 2^63 printed `-9223372036854775808`; `unsignedLongWrappingNeg` answers `-a` (`:113-115`), where it answered `a`; the new `unsignedLongToDouble` (`:27-32`), right after `unsignedLongToString`, answers an unsigned long's nearest double: a value at or above 2^63 is halved with its low bit kept as a sticky bit, converted and doubled, which rounds to nearest, ties to even, as walk's `Unsigned.toDouble` does. These compute as walk's `UnsignedLong$ToString`, `$WrappingNegate` and `$AsFloat` (`interpreter/glue/prim/UnsignedLong.java:251-261`, `:365-369`).
- `FNN32`'s `toString` and `asString` print by `Integer.toUnsignedString` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FNN32.java:19-20`), and `FNN64`'s `toString` by `Long.toUnsignedString` (`FNN64.java:20`). `FNN32.asString` shadows the prelude's masking getter (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:759`), so it is the half of row 326 that a compiled `NN32` reaches; the prelude's `NN64` getter calls the fixed helper (`CompilerBuiltin.fss:825`).
- `BuiltinPrimitiveRewriter.transfer` gives an argument declared `UnsignedLong`, walk's object of `NN64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:475`), the `NN64` argument transfer (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:189-192`). In `value object UnsignedLong` the rewrite gives `self` the owner's name as its declared type (`:124-127`), so without the condition the checker read `self` as `UnsignedLong` against the helper's `long`, read as `ZZ64`, and refused the three bindings (row 873).
- Five strings move from glue classes onto helpers: `UnsignedLong`'s `asString` and `asExprString` onto `unsignedLongToString` (`FortressBuiltin.fss:478-481`) and its `asFloat`, declared at `RR64` as rung A declares the other five (fork 3), onto `unsignedLongToDouble` (`
~~~~

## [S6] explorations/compile-ladder/rung-natives-divisors/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-divisors/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-divisors/REPORT.md:14-31, 2989 bytes, cut at 2500.

~~~~
## 1. What changed and why

P-58 has each binding name a static helper that both paths call; P-70 and P-73 give the values: `GCD` and `LCM` nonnegative, `IntegerOverflow` where a result does not fit its fixed width. Climb batch 25's fork 7 has each new helper compute as its glue class does. The commit `dcc1ee79b` moves the 18 strings and adds the 18 helpers:

| owner | binding | string at | helper |
|---|---|---|---|
| trait `ZZ32` | `GCD`, `LCM`, `partitionL` | `Library/FortressLibrary.fss:785`, `:787`, `:808` | `simpleIntArith.intGcd`, `intLcm`, `intPartition` (`simpleIntArith.java:417-434`) |
| trait `ZZ64` | `GCD`, `LCM`, `partitionL` | `:878`, `:880`, `:899` | `simpleLongArith.longGcd`, `longLcm`, `longPartition` (`simpleLongArith.java:355-378`) |
| trait `NN64` | `GCD`, `LCM`, `CHOOSE`, `partitionL` | `:961`, `:963`, `:965`, `:982` | `simpleUnsignedLongArith.unsignedLongGcd`, `unsignedLongLcm`, `unsignedLongOverflowingChoose`, `unsignedLongPartition` (`simpleUnsignedLongArith.java:233-266`) |
| trait `ZZ` | `cmp`, `GCD`, `LCM`, `CHOOSE` | `:1021`, `:1058`, `:1060`, `:1062` | `simpleArbitraryPrecisionArith.cmp`, `gcd`, `lcm`, `choose` (`simpleArbitraryPrecisionArith.java:132-163`) |
| top level | `nanoTime` | `:4522` | `simpleLongArith.longNanoTime` (`simpleLongArith.java:380-382`) |
| value object `NN32` | `GCD`, `LCM`, `partitionL` | `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:445`, `:447`, `:468` | `simpleUnsignedIntArith.unsignedIntGcd`, `unsignedIntLcm`, `unsignedIntPartition` (`simpleUnsignedIntArith.java:235-251`) |

Each helper's Java types carry the declared types (`int` for `ZZ32` and `NN32`, `long` for `ZZ64` and `NN64`, `BigInteger` for `ZZ`), `self` first; the `NN32` and `NN64` positions reach the helpers through the rewrite's transfers (F-308). Each raises `fortress.CompilerBuiltin$IntegerOverflow` where its glue class raises `IntegerOverflow`, which walk raises as the library's own (F-299). The glue computations they follow: `Int.java:136-150`, `:214-218`, `:308-358`; `Long.java:150-162`, `:226-230`, `:274-279`; `NN32.java:143-156`, `:221-225`; `UnsignedLong.java:144-162`, `:221-225`, `:263-324`; `BigNum.java:170-198`, `:268-272`, `:326-345` (all under `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`). No glue class is edited, and none of the 18 is left on one.

No helper keeps state between calls: each works in its locals, and the two `CHOOSE` helpers loop over local accumulators; neither has a scratch array (`simp
~~~~

## [S7] explorations/compile-ladder/rung-codegen-walls/REPORT.md, "5. Programs run old against new, and the probes"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-walls/REPORT.md#5. Programs run old against new, and the probes'`

explorations/compile-ladder/rung-codegen-walls/REPORT.md:76-91, 2521 bytes, cut at 2500.

~~~~
## 5. Programs run old against new, and the probes

- `NestedTryProbe` (scratch, the body of `XXXNestedTryInnerCatch`), compiled and run on the old code: 'REACHED', 'outer', then 'FortressException: class NestedTryProbe$Boom with string Boom'; under walk on the old code: 'inner', 'inner'. The defect is the base's (row 888).
- `AnyInTupleProbe` (`object PairHolder extends Holder[\(Any, ZZ32)\]`): on the old code and after the edit, 'java.lang.NullPointerException: Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null', at `NamingCzar.repairedApiName(NamingCzar.java:1720)` from `CodeGen.generateTypeReference` (row 889).
- `FbProbe`, a source `throw ForbiddenException(e)` in a catch clause, compiled on the base: its `javap -c -p` gives the instruction that `throwForbiddenException` now emits (section 1).
- The code generator over the library: the planner's `explorations/compile-ladder/plan-25/probes/codegen.sh` with its control (the 173 helper strings of `plan-25/probes/moved-base.tsv` put back on their glue classes, all 173 found), in one session, in a scratch worktree seeded detached at the base inside this tree's `tmp/` (removed after), once with the base's `CodeGen.java` and once with this rung's, the library sources edited only there:

      explorations/compile-ladder/plan-25/probes/codegen.sh <out>      # base CodeGen
      refused declarations 50 | emitted (OK lines) 696 | component failures 0
      kinds 14
      explorations/compile-ladder/plan-25/probes/codegen.sh <out>      # this rung's CodeGen
      refused declarations 47 | emitted (OK lines) 697 | component failures 0
      kinds 11
      rc=0 seconds=230

  The base run reproduces the planner's control (50, 696, 14 kinds). The declaration verdicts, diffed: `shouldRaise` from `FAIL` to `OK` (`Library/FortressLibrary.fss:339`), and the pre-pass failures of `MIMapReduceReduction` (`:3728`) and `TrivialOpenRange` (`:4070`) gone, their `OK` lines kept; `test stringifyChars` (`Library/String.fss:337`) passes the guard and stops at its next wall, 'Can't compile VarArgs yet', from `CodeGen.resolveMethodAndSignature` at its call of the varargs `assert` (row 624's kind; `String` now 3 of the 7). The kinds 'Only handling some static args of generic types in extends clause', 'NYI: Forbid clauses are not yet implemented' and 'Don't know how to compile this kind of FnDecl.' no longer occur. The probe's shadows of `CodeGen.java` (the distance stage's `shadow-patch.py`) built 
~~~~

## [S8] explorations/reviews/phase3-exit/zero-audit.md, "Part C. The debt carried into phase 4"

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

## [S9] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

`facts-extract.sh 'doc:.claude/skills/coordinator/references/batch.md#The checker count and the distance'`

.claude/skills/coordinator/references/batch.md:54-61, 844 bytes.

~~~~
## The checker count and the distance

Until the switch-over lands, the gate of every batch reports the checker count and the distance. Neither turns the gate red.

- If a rung's test is the checker count or the distance, it takes the last landed gate's tables as its starting values.
- If every file that a rung changes lies outside what the two measures read, the rung runs neither and lists those files (`STAGE_BLIND`). Its skeptic checks the list against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- The gate's comparisons hide Java line numbers, identity hashes and moved library positions. Put every difference that they hid on the review list. Put there too each line of the team's tests that a rung rewrote to keep its checked value, with its before and after.
~~~~

## [S10] explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md, "The failure-mode question"

`facts-extract.sh 'doc:explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md#The failure-mode question'`

explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md:316-342, 1895 bytes.

~~~~
## The failure-mode question

**One loud failure becomes a quiet value, and this report first did not say so.**
`FIntLiteral.asNN64`'s pre-image was `if (largerVal == null) return
FNN64.make((long)smallerVal); throw outOfRange("NN64");` -- it threw for *every*
string-carried numeral -- and `simpleIntLiteralArith.fromBigInteger` sends every `IntLiteral`
arithmetic result of bit length 64 or more to the string branch (`:31-32`), a path this rung
does not touch.  So the transition is reachable without a numeral of bit length 64 anywhere
in the source.  The skeptic's probe `probes/skeptic/s3.fss` is the case: `x =
9223372036854775807` then `n: NN64 = x + x + 1` raised `Error: Not in range for NN64:
18446744073709551615` before this rung and now computes the value, which
`probes/skeptic/s3.compiled` shows **rendered as `-1`**.

The value is the specification-correct one -- `literals.tex:83-86` gives the numeral its
exact value and $2^{64}-1$ is inside `NN64` -- so the quiet answer is right where the loud
failure was wrong.  The cost is nonetheless real and is the reason this belongs with the
rendering row rather than beside it: the error that *named* the true value is gone, and what
replaces it prints as `-1`, because `FNN64.toString` is signed (`runtimeValues/FNN64.java:20`).
That is ledger row 326, and the two facts are one situation.  `walk` has no counterpart: it
refuses the coercion outright (`probes/skeptic/s3.walk`, "RHS expression type Long is not
assignable to LHS type NN64").

In the other direction -- a quiet wrong value becoming a loud failure -- there are four:
`asZZ32`, `asZZ64` and `asNN32` now raise `Not in range for ...` where they silently
truncated, which row 325 records for annotated declarations; `asNN32` on a string-carried
numeral now raises where it returned the `BOGUS` sentinel's low half
(`probes/skeptic/s2`); and `p37`'s comparison, row 328.
~~~~

## [S11] explorations/compile-ladder/rung-codegen-walls/REPORT.md, "1. What changed, and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-walls/REPORT.md#1. What changed, and why'`

explorations/compile-ladder/rung-codegen-walls/REPORT.md:9-18, 3508 bytes, cut at 2500.

~~~~
## 1. What changed, and why

Three changes in `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and one helper that the second needs, nothing else of the original tree:

- `generateTypeReference`, its `AnyType` branch (base `:5795-5796`, now `:5845-5851`): it was empty and fell through to the throw 'Only handling some static args of generic types in extends clause' (base `:5802`). It now calls `generateTypeReference` with Any's own name, `NodeFactory.makeId(span, WellKnownNames.anyTypeLibrary(), WellKnownNames.anyTypeName)`, and no static arguments, and continues, as the `TraitType` branch does for a trait (`:5835-5837`). For a name without static arguments the method emits `GETSTATIC <its RTTI class>.ONLY` (`:5759-5767`), here `fortress/AnyType$Any$RTTIc.ONLY`, the field that the bootstrap class declares (`ProjectFortress/src/fortress/AnyType.java`, `RTTIc.ONLY`). The `BottomType`, `SelfType` and `AbbreviatedType` branches stay empty, each still ending in the throw (`:5833-5834`, `:5843-5844`, `:5852-5853`, throw `:5857`).
- `forTry` (base `:2019-2073`, now `:2019-2087`): the throw 'NYI: Forbid clauses are not yet implemented' (base `:2029-2030`) is gone. After the catch clauses, which are unchanged, each type of the forbid clause is tested in turn, as a catch clause tests its type (`DUP`, `FException.getValue`, `InstantiatingClassloader.generalizedInstanceOf`, `IFEQ`); on a match the exception's value is passed to `throwForbiddenException`. The rethrow (`ATHROW`) and the label `done` move out of the `if (catchClauses.isSome())` block (`:2041`, `:2078-2081`) and are emitted when the try has a catch clause or a forbid clause, so a try with neither emits what it emitted before.
- `throwForbiddenException` (new, `:2089-2122`): with the exception's value on the stack, it finds `ForbiddenException`'s constructor in the api index of `WellKnownNames.fortressLibrary()` (the component's own index when it is that library), takes its parameter type and its result, casts the value to the parameter's class, calls the constructor's static method through `idToPackageClassAndName` and `NamingCzar.jvmMethodDesc`, as a source call of `ForbiddenException(e)` is emitted, wraps the result in an `FException` as `forThrow` does (`NEW`, `DUP_X1`, `SWAP`, `INVOKESPECIAL`) and throws it. The api's own types are named unqualified in its index, so the descriptor is made with the library's api as the default: with the program's api the first run asked for `ForbidC
~~~~

## [S12] .claude/skills/fortress-repo/references/compiler.md, "Natives"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/compiler.md#Natives'`

.claude/skills/fortress-repo/references/compiler.md:66-88, 4183 bytes, cut at 2500.

~~~~
## Natives

`import java com.sun.fortress.nativeHelpers.{...}` in a `.fss` file binds static Java methods over plain Java values.

A body `builtinPrimitive("com.sun.fortress.nativeHelpers.Class.method")` binds one such method, a helper, too. At the parse, the compiled path, and not walk, rewrites the body as a call of the method through a generated `import java`, with `self` first in a trait or object (`compiler/BuiltinPrimitiveRewriter.java`). The checker then checks the declaration against the method's Java signature. In a compile, it reads `int` as `ZZ32`, `long` as `ZZ64`, `float` as `RR32`, `double` as `RR64`, `boolean` as `Boolean`, `String` as `JavaString`, `BigInteger` as `ZZ` and `Object` as `Any` (`NamingCzar.fortressTypeForForeignJavaType`). Walk calls the same method by reflection (`interpreter.md`, "Natives"). The compile stops in these cases:

- If the string is in that package but names no public static method: 'builtinPrimitive names no static helper: …'.
- If the string names a glue class or anything else outside that package: 'Variable builtinPrimitive is not defined.'
- If the declaration has a varargs parameter: the same message (ledger row 849).
- If the declaration is a local function or a method of an object expression: the same message. The rewrite reaches only a component's declarations and the members of its traits and objects (ledger row 865).

To test a helper on the compiled path, write a compiled test whose own declarations bind it, as `compiler_tests/NativeHelperBindingCompiled.fss` does. Until the switch-over, a compiled test cannot reach the interpreter's library's bindings.

The count stage and the distance stage check the interpreter's library with the same rewrite. There, the checker differs from a compile in these ways:

- A string that names a glue class, or a declaration with a varargs parameter, does not stop the check. The body stays a call of `builtinPrimitive`, typed at the declared result type, and no Java signature checks it (ledger row 849).
- The checker reads a helper's Java types as the interpreter's library's types: `String` as `String`, not `JavaString`, and the rest as in a compile.
- A component that imports a DSL grammar is parsed by other code (`GraphRepository.syntaxExpand`), which does not rewrite its bindings. So, as for a glue class, no Java signature checks them.
- The count stage checks only the `FortressLibrary` component's bindings. A binding of another component, as `FortressBuiltin`'s, only
~~~~

## [S13] explorations/compile-ladder/rung-natives-compiled/REPORT.md, "What changed and why"

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

## [S14] .claude/skills/fortress-repo/references/interpreter.md, "Natives"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/interpreter.md#Natives'`

.claude/skills/fortress-repo/references/interpreter.md:85-124, 4794 bytes, cut at 2500.

~~~~
## Natives

The library binds each of walk's natives by a declaration whose body is `builtinPrimitive("…")`. The string names one of these:

- A glue class, as `com.sun.fortress.interpreter.glue.prim.X`, in `interpreter/glue/prim/`. A glue class takes the evaluator's boxed values, so the compiled path cannot use it. Most bindings name one.
- A helper: a public static method of a class under `nativeHelpers/`, as `com.sun.fortress.nativeHelpers.simpleIntArith.<method>`. `glue/StaticNativeApp.java` calls it by reflection, with a method's `self` first. The compiled path calls it too (`compiler.md`, "Natives").

Walk carries each declared type of a helper's binding in one Java type:

- `ZZ32`, `NN32` and `Char` in `int`; `ZZ64` and `NN64` in `long`; `RR64` and `Float`, the library's object that extends `RR64`, in `double`; `RR32` in `float`; `Boolean` in `boolean`;
- `String`, `FlatString` and `JavaString` in `String`; `ZZ` in `BigInteger`; `()` in `void`.

In a method, walk carries `self` by the type that declares the method:

- a type of the list above, except `FlatString`, `JavaString` and `()`, in the same Java type;
- the library's objects that extend number types, not the glue classes of the same names: `Int` (`ZZ32`) in `int`, `Long` (`ZZ64`) and `UnsignedLong` (`NN64`) in `long`, and `BigNum` (`ZZ`) in `BigInteger`.

A program can give its own type the name `FlatString` or `JavaString`, so these names carry no `self`. So a binding in a method of the library's `FlatString` cannot name a helper yet: every program would stop at load.
Walk refuses a helper's binding at load in these cases. The message names the string, and contains the words below, which a `load_exception_contains` key can match:

- The class or the method does not exist: 'not found' or 'names no static method of'.
- The result type, or a parameter type other than `self`'s, is not in the first list: 'no Java type carries the declared'.
- The binding is in a method of a type that the second list does not name, as a program's own object: 'no Java type carries T, the type of self.', with the type's name as T. Match ', the type of self.' to tell it from the refusal above.
- No method of that name, or more than one, has exactly the Java types of the lists, with `self`'s first in a method: 'has no overload that fits the declaration's types', or 'overloads that fit'.

The check has two gaps:

- Walk checks the binding of a dotted method of a generic trait or object only when the program makes an
~~~~

## [S15] explorations/compile-ladder/rung-natives-walk/REPORT.md, "What changed and why"

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

## [S16] explorations/compile-ladder/rung-natives-self/REPORT.md, "What changed and why"

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

## [S17] explorations/compile-ladder/rung-natives-float-bits/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float-bits/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-float-bits/REPORT.md:15-23, 4107 bytes, cut at 2500.

~~~~
## What changed and why

- `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:136-246`: 28 public static helpers at the class's end, each one line that returns what its glue class's `f` returns (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:94-98`, `:136-242`, `:250-254`, `:280-290`, `:394-434`): `doubleIsNaN` and `doubleIsInfinite` (`Double.isNaN`, `Double.isInfinite`), `doubleRawBits` (`Double.doubleToRawLongBits`, a `long`), `doubleNextUp` and `doubleNextDown` (`DirectedRounding.nextUp`, `nextDown`), `doubleToFloat` (`(float) a`, a `float`), `doubleNE` (`a != b`), `doubleMin` and `doubleMax` (`Math.min`, `Math.max`), the ten NaN-free roundings and roots `doubleAddUpNoNaN`, `doubleSubUpNoNaN`, `doubleMulUpNoNaN`, `doubleDivUpNoNaN`, `doubleSqrtUp`, `doubleAddDownNoNaN`, `doubleSubDownNoNaN`, `doubleMulDownNoNaN`, `doubleDivDownNoNaN`, `doubleSqrtDown` (`DirectedRounding.addUpNoNaN` to `sqrtDown`), the eight IEEE ones `doubleAddUp` to `doubleDivDown` (`DirectedRounding.addUp` to `divideDown`), and `doubleFromRawBits` (`Double.longBitsToDouble`). Each is named `double` and its glue class's name, as the sample's `doubleAddUpNoNaN`; `narrow` and `=/=` take the brief's `doubleToFloat` and `doubleNE`, beside `floatToDouble` and `doubleEQ`. `DirectedRounding` is named in full, as the sample does, so that nothing but the class's end changes. Every parameter and result is `double`, `float`, `long` or `boolean`, which the compiler prelude's wrapper maps, and the prelude's library order made its five jars with the new methods in the wrapper.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:61-153`, `value object Float`, 27 strings, each the one line after its header, one line for one: `isNaN` `:61`, `isInfinite` `:64`, `rawBits` `:67`, `nextUp` `:71`, `nextDown` `:74`, `narrow` `:78`, `=/=` `:84`, `MIN` `:96`, `MAX` `:98`, `PLUS_UP` to `SQRT_DOWN` `:119` to `:137`, `IEEE_PLUS_UP` to `IEEE_SLASH_DOWN` `:139` to `:153`.
- `Library/FortressLibrary.fss:4535`: `fromRawBits`'s string, `doubleFromRawBits`.
- Left on glue classes, as the brief gives: `Float`'s `^` at an `RR32` and at an `AnyIntegral` exponent, `atan2`, `|\self/|` and `|/self\|` (`FortressBuiltin.fss:157`, `:163`, `:177`, `:185`, `:189`), item 331; `:329` is `RR32`'s `^`, rung P's.
- Counted (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' <rev> -- Library ProjectFortress/LibraryBuiltin | wc -l`): 173 at `97a416b18`, 201 at `c0b8dc0ed`
~~~~

## [S18] explorations/compile-ladder/rung-natives-float/REPORT.md, "What changed and why"

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

## [S19] explorations/compile-ladder/rung-natives-remainders/REPORT.md, "Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-remainders/REPORT.md#Sentences made false'`

explorations/compile-ladder/rung-natives-remainders/REPORT.md:152-170, 3522 bytes, cut at 2500.

~~~~
## Sentences made false

The specification (the gather rewrites the Appendix I Effect once, fork 10):

- `Specification/appendices/changes.tex:4469`, "173 of the 449 bindings of \library\ name a helper:" and its list to `:4481`, which names no `REM` or `MOD`, "eighteen bindings of the trait \EXP{\mathbb{N}64}" and "twenty-one of \EXP{\mathbb{N}32}": after this rung alone, 183, `REM` and `MOD` of the five types added, twenty of `NN64` and twenty-three of `NN32`.
- `Specification/appendices/changes.tex:4482`, "The other 276 still name a glue class, which the compiled code cannot call.": 266.
- `Specification/appendices/changes.tex:4494-4498`, "\OPR{REM} and \OPR{MOD}, which still name glue classes, end the run with a Java exception at a divisor of zero, on \EXP{\mathbb{Z}32} and \EXP{\mathbb{Z}64} (row~336 of the revival's gap ledger) and on \EXP{\mathbb{N}32}, \EXP{\mathbb{N}64} and \EXP{\mathbb{Z}} (row~848 of the revival's gap ledger).": they now throw a `DivisionByZero`.

The specification's "For integer results, division by zero throws a \TYP{DivisionByZero}." (`Specification/basic/operators/opr-overview.tex:165`) becomes true under walk for `REM` and `MOD` on the five types. The team's note at the head of that chapter, "The operators in this section are not tested nor run by the interpreter yet." (`Specification/basic/operators/opr-overview.tex:14`), was already false of `DIV`, `REM` and `MOD` before this rung, which only adds tests; this rung does not make it false.

The record (the gather folds `record.md`):

- Row 336's claim, `explorations/fortress-gap-ledger.md:513`, and row 848's, `:553`: closed by this rung.
- F-24 (`explorations/coordinator/FACTS.md:18`): "Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes, so a division by zero elsewhere ends the run (rows 336, 848)."
- F-306 (`explorations/coordinator/FACTS.md:136`): "trait `ZZ64`'s 20 and trait `ZZ`'s 16 native bindings name helpers" and "`REM` and `MOD` still name glue classes and end the run at a zero divisor (row 336 for `ZZ64`, row 848 for `ZZ`)".
- F-308 (`explorations/coordinator/FACTS.md:138`): "`NN32`'s 20, `NN64`'s 17 and `Char`'s 39 bindings name their helpers", "each of the 76", "Under walk the 76 keep the glue classes' values, but `NN32`'s and `NN64`'s `DIV` by zero throws `DivisionByZero`".
- F-32 (`explorations/coordinator/FACTS.md:30`): "of its 449 live bindings, 276 name one" and "F-299 holds the 173 that name one".
- F-299 (`explorations/co
~~~~

## [S20] explorations/compile-ladder/rung-natives-integers/REPORT.md, "What changed and why"

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

## [S21] explorations/compile-ladder/rung-natives-hard/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-hard/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-hard/REPORT.md:11-17, 3072 bytes, cut at 2500.

~~~~
## 1. What changed and why

P-58 has each native binding name a static helper of `nativeHelpers/`, checked against its helper from the step that moves it. For a binding over `NN32`, `NN64` or `Char`, walk already carries the declared type in a Java `int` or `long` (F-299), but the compiled checker reads every helper's `int` as `ZZ32` and `long` as `ZZ64`, except for six transfer helpers with fixed names (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:368-390`, `:493-504`; F-298). Question 2 of the batch record took the hard-set probe's way 2b at its default (`explorations/coordinator/CLIMB-BATCH-24.md:90-100`): the compiled path's rewrite composes the call with those six transfers, as the team's prelude does.

- **The rewrite** (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java`, +95 −12). Each declaration is told its owner, the simple name of the enclosing trait or object, `""` for a generic one, `null` at the top level (`:75`, `:91`). `fn` records each argument's declared type by its simple name, `self` taking the owner's (`:113-127`). Where the string names exactly one public static method of that name and arity (`soleMethod`, `:196-206`), each argument whose helper parameter is an `int` or a `long` that `NamingCzar.fortressTypeForForeignJavaType` reads otherwise than the declared `NN32`, `NN64` or `Char` (`Character` in the compiler's prelude) is wrapped in the matching transfer, and so is the call where the declared result type differs from the reading of the helper's result (`transfer`, `:176-193`; `:135-157`). A position the helper's own name already reads at the declared type, as each transfer's, gets none. So `opr +(self,b:NN32):NN32 = builtinPrimitive("…unsignedIntOverflowingAdd")` is checked and compiled as `makeNN32FromZZ32(unsignedIntOverflowingAdd(makeZZ32FromNN32(self), makeZZ32FromNN32(b)))`. Walk is untouched: its repository has the rewrite off (F-298), and walk carries these types by the declaration (F-299).
- **The 76 strings**, each naming the binding's existing helper, line for line `explorations/compile-ladder/plan-24/probes/families-base.tsv`'s family H (a script read each of the 76 lines after the patch: 76 'ok'): value object `NN32`'s 20 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:391-466`), trait `NN64`'s 17 (`Library/FortressLibrary.fss:917-984`), value object `Char`'s 39 (`FortressBuiltin.fss:612-722`). The library now has 97 bindings that name a helper, 36 in `FortressLibr
~~~~

## [S22] explorations/compile-ladder/rung-natives-hard/SKEPTIC.md, "The failure mode"

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

## [S23] explorations/compile-ladder/rung-natives-rr32/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-rr32/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-rr32/REPORT.md:15-21, 3634 bytes, cut at 2500.

~~~~
## What changed and why

- `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleFloatArith.java`, new, 194 lines: 46 public static helpers over a Java `float` (`:11-193`), each one line that computes as its glue class in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:102-388` does. `floatToString` (`Float.toString`); `floatIsNaN`, `floatIsInfinite`; `floatRawBits` (`Float.floatToRawIntBits`, an `int`, read as `ZZ32`); `floatNextUp`, `floatNextDown` (`DirectedRounding.nextUp`, `nextDown`); `floatAbs` (`Math.abs`); `floatEQ`, `floatNE`, `floatLT`, `floatLE`, `floatGT`, `floatGE`; `floatMin`, `floatMax` (`Math.min`, `Math.max`); `floatNeg`, `floatAdd`, `floatSub`, `floatMul`, `floatDiv`; `floatSQRT` (`(float) Math.sqrt`); the eight that round toward an infinity, `floatAddUpNoNaN` to `floatDivDownNoNaN`, and the two square roots `floatSQRTUp` and `floatSQRTDown`, for `PLUS_UP` to `SQRT_DOWN`; the eight `IEEE_` ones, `floatAddUp` to `floatDivDown`; each directed one calling the `float` overload of `com.sun.fortress.numerics.DirectedRounding` that the glue class calls; `floatPow` (`(float) Math.pow`) for `^` at an `RR32` exponent; `floatFloor`, `floatCeiling`; and the four that answer `ZZ64`, a `long`: `floatIFloor` and `floatICeiling` for `|\self/|` and `|/self\|`, `floatTruncate`, and `floatRound` (`(long) Math.rint((double) a)`). Every parameter and result is a `float`, `boolean`, `int`, `long` or `String`, which the wrapper generator maps, so a compiled program's import of the class compiles (the compiled guard's link). No prelude file imports it.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:210-342`, `value object RR32`, 49 strings, each the one line after its header, one line for one: `asString` `:210` and `asExprString` `:212` (`floatToString`), `isNaN` `:216`, `isInfinite` `:219`, `rawBits` `:232`, `nextUp` `:236`, `nextDown` `:239`, `|self|` `:245`, `=` `:247`, `=/=` `:249`, `<` `:251`, `<=` `:253`, `>` `:255`, `>=` `:257`, `MIN` `:267`, `MAX` `:269`, unary `-` `:274`, `+` `:276`, `-` `:278`, `DOT` `:280`, `TIMES` `:282`, juxtaposition `:285` (all three `floatMul`), `/` `:287`, `SQRT` `:289`, `PLUS_UP` to `SQRT_DOWN` `:291-309`, `IEEE_PLUS_UP` to `IEEE_SLASH_DOWN` `:311-325`, `^` at `RR32` `:327`, `floor` `:332`, `|\self/|` `:334`, `ceiling` `:336`, `|/self\|` `:338`, `truncate` `:340`, `round` `:342`. Walk carries a declared `RR32` in a `float` (`interpreter/glue/StaticNativeApp.java:52`), and the checker reads a `f
~~~~
