<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that b430f9f42..fa630b65f added, changed or removed (the batch 29, landed at 7daf51fe8, and the landing's own steps to fa630b65f), written by evidence.py. -->

# The entries that the range changed

- The batch, b430f9f42..7daf51fe8: 37 entries: F-32, F-53, F-55, F-57, F-73, F-74, F-79, F-84, F-118, F-123, F-131, F-137, F-138, F-140, F-151, F-228, F-229, F-240, F-249, F-253, F-262, F-263, F-278, F-285, F-299, F-304, F-326, F-328, F-331, F-339, F-340, F-341, F-342, F-343, F-344, F-345, F-346
- After the landing, 7daf51fe8..fa630b65f: 0 entries
- Now over 600 characters: 36 of 37: F-32, F-53, F-55, F-57, F-73, F-74, F-79, F-84, F-118, F-123, F-131, F-137, F-140, F-151, F-228, F-229, F-240, F-249, F-253, F-262, F-263, F-278, F-285, F-299, F-304, F-326, F-328, F-331, F-339, F-340, F-341, F-342, F-343, F-344, F-345, F-346

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-32, changed

- Size: at the base 2154 characters; at the landing 2123 characters; now 2123 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that 52 of the one library's 424 live native bindings still name.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 372 that name one, and the 52 by type). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 29 were object `IntLiteral`'s (`FortressBuiltin.fss:549-629`), 4 among the 154 and 25 among the 158. Its 8 conversions and comparisons are Fortress text over its `asZZ` (F-331). Its other 21 cannot move yet, since their helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76; row 578). `println` writes through `stdOut`, a plain Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330). MicroGPT's `nanoTime` names a helper (F-314), and so does `System`'s `args`, which `System` builds as it loads (F-337). Of the 42 with no compiled analogue, `NativeArray`'s 7 name `arrayOps` helpers (F-333), `Thread`'s four, `abort` and `printTaskTrace` name `runtime` helpers (F-335), `getProgramArgsPrim` is deleted (P-170), and `Reflect`'s 28, off microGPT's path, name glue classes. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

Now:

- F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that 28 of the one library's 402 live native bindings still name.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 374 that name one, and the 28 by type). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 29 were object `IntLiteral`'s (`FortressBuiltin.fss:549-629` at `a1f8c4b8b`), 4 among the 154 and 25 among the 158; its 8 conversions and comparisons were then Fortress text over its `asZZ`. Its other 21, and `FloatLiteral`'s 3, left the one library with the two objects, whose place the numeral types `NaturalNumeral` and `RadixPointNumeral` take (F-79; row 578). `println` writes through `stdOut`, a plain Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330). MicroGPT's `nanoTime` names a helper (F-314), and so does `System`'s `args`, which `System` builds as it loads (F-337). Of the 42 with no compiled analogue, `NativeArray`'s 7 name `arrayOps` helpers (F-333), `Thread`'s four, `abort` and `printTaskTrace` name `runtime` helpers (F-335), `getProgramArgsPrim` is deleted (P-170), and `Reflect`'s 28, off microGPT's path, name glue classes. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

History blocks of the range:

- Written by the gather: 2026-11-09 07:05Z · rewritten · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "Sentences of the specification made false" · by climb batch 29 gather (cites [S1])
- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

Report sections that the entry cites: [S2] `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings".

## F-53, changed

- Size: at the base 1489 characters; at the landing 1489 characters; now 1489 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 28's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 29's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-09 08:46Z · rewritten · by climb batch 29 commit stage: the last landed gate is climb batch 29's: compile-ladder/climb-batch-29/gate/distance.txt's #total 0 and #crash none, checker-count.txt's #total 0 and #crash none; the per-site list compile-ladder/gate/distance-sites.tsv holds its header alone

Report sections that the entry cites: [S3] `references/batch.md`, "The checker count and the distance".

## F-55, changed

- Size: at the base 954 characters; at the landing 956 characters; now 956 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-55 **Static arguments are inferred with coercion on both paths: the compiled checker from the arguments' static types and the expected type, walk from their run-time types.** So a mixed-width call takes the narrowest type into which its arguments convert, as P-74 decides. F-73 gives the checker's rule and F-137 walk's; F-87 lists where the checker has an expected type. Under walk, a typed binding converts a call's result after the call and does not fix the call's static arguments: `a: BoxK[\ZZ64\] = wrapK(3)` infers `T` from `3` as `Int` and is refused, since no coercion converts a `BoxK[\Int\]` (row 510). A parameter with no written bound is bounded by `Any` on both paths, so a parameter that nothing fixes takes `Any` (F-78). Gated by `compiler_tests/InferCoercionShapes` and `tests/InferCoercionRungK`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2; `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

Now:

- F-55 **Static arguments are inferred with coercion on both paths: the compiled checker from the arguments' static types and the expected type, walk from their run-time types.** So a mixed-width call takes the narrowest type into which its arguments convert, as P-74 decides. F-73 gives the checker's rule and F-137 walk's; F-87 lists where the checker has an expected type. Under walk, a typed binding converts a call's result after the call and does not fix the call's static arguments: `a: BoxK[\ZZ64\] = wrapK(3)` infers `T` from `3` as `ZZ32` and is refused, since no coercion converts a `BoxK[\ZZ32\]` (row 510). A parameter with no written bound is bounded by `Any` on both paths, so a parameter that nothing fixes takes `Any` (F-78). Gated by `compiler_tests/InferCoercionShapes` and `tests/InferCoercionRungK`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2; `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

History blocks of the range:

- Written by the gather: 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])

## F-57, changed

- Size: at the base 1443 characters; at the landing 1408 characters; now 1408 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-57 **A numeral's type depends on the path and on the library in scope, and in generic code only the getters `x.zero` and `x.one` and the witness `typecase` give a `T` on both paths.** The witness `typecase` is a `typecase` over a function of type `() -> T`, with one clause for each number type (P-78). The checker types a numeral `IntLiteral` or `FloatLiteral` by its form, as the builtin library in scope declares those types (F-79). Walk types an integer numeral by its magnitude, as a `ZZ32`, `ZZ64` or `ZZ`, which it prints by those names (F-328). In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy. A numeral bound to `NN32` or `NN64` fails under walk, and `1.5` bound to `RR32` fails on both paths (row 454). Neither path refuses an out-of-range numeral statically: the compiled run raises `Not in range for ZZ32` at run time, and walk refuses it when it runs, at the typed binding it does not fit (row 325). Walk also refuses, against the specification, a numeral beyond `ZZ32`'s range bound to `RR64`, which should hold the float (row 443). Detail: `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2, measured before the numeral switch (F-79); `x.zero` by reading, not measured.

Now:

- F-57 **A numeral's type depends on the path and on the library in scope, and in generic code only the getters `x.zero` and `x.one` and the witness `typecase` give a `T` on both paths.** The witness `typecase` is a `typecase` over a function of type `() -> T`, with one clause for each number type (P-78). The checker types a numeral by its form, `IntLiteral` or `FloatLiteral` under the compiler's prelude and `NaturalNumeral` or `RadixPointNumeral` under the one library (F-79), and converts it into its default where nothing fixes a type (F-342). Walk gives an integer numeral where nothing fixes a type its default by its magnitude, a `ZZ32`, `ZZ64` or `ZZ`, which it prints by those names, and converts it where its place fixes a type (F-341). In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy. The checker refuses a numeral outside a bounded number type's range, or rounding to an infinity, statically, and walk refuses an integer numeral out of range when it runs, at the place it does not fit (F-342, F-341). Detail: `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2, measured before the numeral switch (F-79); `x.zero` by reading, not measured.

History blocks of the range:

- Written by the gather: 2026-11-09 07:05Z · rewritten · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "Sentences of the specification made false" · by climb batch 29 gather (cites [S1])
- Written by the gather: 2026-11-09 07:08Z · rewritten · from `explorations/compile-ladder/rung-numeral-checker/REPORT.md`, "11. Sentences made false" · by climb batch 29 gather (cites [S5])

## F-73, changed

- Size: at the base 1286 characters; at the landing 1456 characters; now 1456 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-73 **The compiled checker infers a generic's static arguments with coercion: a type parameter that is the whole type of each parameter it occurs in, as `T` in `pick[\T\](x: T, y: T)`, takes the narrowest type that every one of its arguments converts into and its bound permits.** It looks for that type among its arguments' types, their coercion targets and its bound, the bound only when it is a trait type other than `Object` or `Any`. It builds P-74 and P-49. A coerced declaration ranks below one that needs no coercion. A tie among coerced declarations is refused, "Ambiguous coercion", outside three narrow cases (the report's section 3.2). When the tied declarations differ only at positions where the call passes a numeral, the checker reads the numeral as `ZZ32`, or as `ZZ64` or `ZZ` when its value does not fit; that reading builds P-173's rule for a tied integer numeral. The coercion attempt refuses a call beyond 64 combinations of candidate types (row 506) and a call with an untyped function argument (row 507). Gated by `compiler_tests/NatLitArgChecker`, `CoercionGenericFnCompiledRungC` and `InferCoercionShapes`, which F-51 also cites, and the refusal of a tie by `XXXInferAmbiguousCoercion`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2.

Now:

- F-73 **The compiled checker infers a generic's static arguments with coercion: a type parameter that is the whole type of each parameter it occurs in, as `T` in `pick[\T\](x: T, y: T)`, takes the narrowest type that every one of its arguments converts into and its bound permits.** It looks for that type among its arguments' types, their coercion targets and its bound, the bound only when it is a trait type other than `Object` or `Any`. It builds P-74 and P-49. A coerced declaration ranks below one that needs no coercion. A tie among coerced declarations is refused, "Ambiguous coercion", outside three narrow cases (the report's section 3.2). A type parameter that numerals alone fix, with no expected type, takes the narrowest default that holds them all (F-342). When the tied declarations differ only at positions where the call passes a numeral, the checker reads the numeral as `ZZ32`, or as `ZZ64` or `ZZ` when its value does not fit; that reading builds P-173's rule for a tied integer numeral. The coercion attempt refuses a call beyond 64 combinations of candidate types (row 506), a numeral's lone parameter counting one choice and a call with an untyped function argument (row 507). Gated by `compiler_tests/NatLitArgChecker`, `CoercionGenericFnCompiledRungC` and `InferCoercionShapes`, which F-51 also cites, and the refusal of a tie by `XXXInferAmbiguousCoercion`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2.

History blocks of the range:

- Written by the gather: 2026-11-09 07:08Z · rewritten · from `explorations/compile-ladder/rung-numeral-checker/REPORT.md`, "11. Sentences made false" · by climb batch 29 gather (cites [S5])

## F-74, changed

- Size: at the base 1513 characters; at the landing 1609 characters; now 1609 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-74 **Under walk, an integer numeral takes its type from its value: a `ZZ32` if it fits 32 bits, a `ZZ64` if it fits 64 bits, a `ZZ` above that; it stays so until walk has the checker's static types, since without them a list of numerals and a generic's static argument take their types from the values.** Its run-time type is the library's value object `Int`, `Long` or `BigNum`, below `ZZ32`, `ZZ64` and `ZZ` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`, `:128`, `:223`). Walk instantiates a generic at it, so a `Box[\Int\]` is a type apart from `Box[\ZZ32\]` and dispatches past it (row 364). F-74 is why P-76's walk half waits; F-79 is the library half, built. Probe Q (`compile-ladder/plan-n/probe-q/PROBE-Q.md`) measured walk with every integer numeral an `IntLiteral`, the numeral's own type in the library. It ran before climb batch N's second run and before the library half landed. Alone, the switch changed 59 test verdicts. With four devices (a numeral at an `AnyIntegral` parameter read as `ZZ32`, `ZZ64` or `ZZ`, a tuple of numerals converted at dispatch, `asif` converting, a varargs list converted at dispatch), the library loaded and both microGPT checks kept their values, but 24 passing interpreter tests failed: 6 by design, 3 of them team tests that assert a `ZZ32`; 9 for want of static types (rows 364, 510); and 9 walk gaps. A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above (row 486; F-140). Detail: `reviews/numeral-switch-judgement.md` sections 2 and 3.

Now:

- F-74 **Under walk, an integer numeral takes its type from its value: a `ZZ32` if it fits 32 bits, a `ZZ64` if it fits 64 bits, a `ZZ` above that; it stays so until walk has the checker's static types, since without them a list of numerals and a generic's static argument take their types from the values.** Where a place fixes a type, walk converts the numeral from its four numbers (F-341). Its run-time type is the library's value object `Int`, `Long` or `BigNum`, below `ZZ32`, `ZZ64` and `ZZ` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`, `:128`, `:223`). Walk reads it at its trait where it infers a static argument, so `Box(3)` is a `Box[\ZZ32\]` (F-344). F-74 is why P-76's walk half waits; F-79 is the library half, built. Probe Q (`compile-ladder/plan-n/probe-q/PROBE-Q.md`) measured walk with every integer numeral an `IntLiteral`, the numeral's own type in the library. It ran before climb batch N's second run and before the library half landed. Alone, the switch changed 59 test verdicts. With four devices (a numeral at an `AnyIntegral` parameter read as `ZZ32`, `ZZ64` or `ZZ`, a tuple of numerals converted at dispatch, `asif` converting, a varargs list converted at dispatch), the library loaded and both microGPT checks kept their values, but 24 passing interpreter tests failed: 6 by design, 3 of them team tests that assert a `ZZ32`; 9 for want of static types (rows 364, 510); and 9 walk gaps. A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above, where P-173 makes it a `ZZ32` (F-140; row 962). Detail: `reviews/numeral-switch-judgement.md` sections 2 and 3.

History blocks of the range:

- Written by the gather: 2026-11-09 07:05Z · rewritten · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "Sentences of the specification made false" · by climb batch 29 gather (cites [S1])
- Written by the gather: 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])
- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-79, changed

- Size: at the base 1435 characters; at the landing 1247 characters; now 1247 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-79 **In the interpreter's library, `IntLiteral`, the type that the compiled checker gives an integer numeral, is declared on the model of the compiler's prelude: a sibling of the number types under `Number`, which each integer type, `QQ`, `RR64` and `AnyIntegral` convert from by coercion.** It builds the library half of P-76. Under walk a numeral is still a `ZZ32`, `ZZ64` or `ZZ`, so no numeral reaches these declarations until walk's half is built (F-74). `IntLiteral` declares itself the members of `Integral[\I\]` that a numeral could not reach, among them the getters `zero` and `one`, `odd`, `even`, `floor` and `DIVIDES`. There are three reasons: for some, no declaration of `Integral` applies to a sibling type even with coercion; for others, the declarations that apply by coercion tie; and a getter must be the type's own member. Each integer type declares its own comparisons, `CMP`, `MAXNUM` and `MINNUM`, and a `^` with an `IntLiteral` exponent. Without them, a typed integer with a numeral operand ties between a declaration inherited from a generic trait and the same operator's own declarations in `ZZ64`, `QQ` and `RR64`. The compiled checker refuses `(3).minimum` and `(3).maximum`, `ZZ32`'s getters (row 581). Gated under walk by `tests/IntegerOrderNumerals.fss`, which checks each integer type's own comparisons, `MAXNUM` and `MINNUM`. Detail: `compile-ladder/rung-numeral-library/REPORT.md` sections 4 and 6.

Now:

- F-79 **In the interpreter's library, the numeral types are `NaturalNumeral` and `RadixPointNumeral`, value objects below `trait Numeral`, a sibling of the number types under `Number`, whose fields are the four numbers, and each of the eight number types converts from them with an `=` pair both ways.** It builds P-174, P-76 and P-172 in the one library (`Library/FortressLibrary.fsi`, `Numeral`): the five integer types and `QQ` convert from `NaturalNumeral` exactly, `QQ` from `RadixPointNumeral` as `digitValue / radix^fractionDigits`, and `RR64` and `RR32` from both by one rounding through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`; `RR64` comprises `Float` alone. The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under the one library and the prelude's `IntLiteral` and `FloatLiteral` under the compiler's (`compiler/Types.java`). Under walk a numeral reaches these declarations where its place fixes a type (F-341). The compiled checker refuses `(3).minimum` and `(3).maximum`, `ZZ32`'s getters (row 581). Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, and the count stage's 0. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 07:05Z · rewritten · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "Sentences of the specification made false" · by climb batch 29 gather (cites [S1])

Report sections that the entry cites: [S6] `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

## F-84, changed

- Size: at the base 1631 characters; at the landing 1456 characters; now 1456 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-84 **In the interpreter's library, the result-only type parameters of `fail`, `builtinPrimitive` and `List`'s comprehension operator `BIG <|[\T\]|>` are unbounded, as the team declared them, and the same rung repaired 25 of the compiled checker's 60 one-off error sites in numbers, orderings, `List` and natives, each by a declared type, a body or an api header, in forms that the library already uses.** A result-only parameter occurs only in the result type. P-48 gives it the intersection of its upper bounds, narrowed by the expected type, so where `()` is expected its instance is `()`. The rung also made `MatchFailure` an unchecked exception: it extends `UncheckedException` (row 590). The sites that it left have rows (report section 5). Limit: under walk the name `IntLiteral` also denotes a value, a zero that no numeral reaches, and its arithmetic answers a `ZZ32` against its declared `IntLiteral` (row 578). F-263 holds the integer powers' types, and F-255 `List`'s ordering. The compiler's prelude has instead `fail(s: String): Zilch` (`Library/CompilerLibrary.fsi:33`), a declared bottom result that Steele put in place of the generic `fail` in `0886e9654` (2011-06-13), and it does not bind the one library, since the team's later word makes `Bottom` inexpressible in a program (the 2012 Types chapter; POPL 2019, `research/extracts/ParkPOPL2019.txt:437-438`) and binds an unfixed parameter by its bounds and the expected type, P-48's rule; walk cannot evaluate `Zilch`. Gated under walk by `tests/NumberOrderListDeclarations.fss`. Detail: `compile-ladder/rung-number-order-slips/REPORT.md` sections 1, 4 and 5.

Now:

- F-84 **In the interpreter's library, the result-only type parameters of `fail`, `builtinPrimitive` and `List`'s comprehension operator `BIG <|[\T\]|>` are unbounded, as the team declared them, and the same rung repaired 25 of the compiled checker's 60 one-off error sites in numbers, orderings, `List` and natives, each by a declared type, a body or an api header, in forms that the library already uses.** A result-only parameter occurs only in the result type. P-48 gives it the intersection of its upper bounds, narrowed by the expected type, so where `()` is expected its instance is `()`. The rung also made `MatchFailure` an unchecked exception: it extends `UncheckedException` (row 590). The sites that it left have rows (report section 5). F-263 holds the integer powers' types, and F-255 `List`'s ordering. The compiler's prelude has instead `fail(s: String): Zilch` (`Library/CompilerLibrary.fsi:33`), a declared bottom result that Steele put in place of the generic `fail` in `0886e9654` (2011-06-13), and it does not bind the one library, since the team's later word makes `Bottom` inexpressible in a program (the 2012 Types chapter; POPL 2019, `research/extracts/ParkPOPL2019.txt:437-438`) and binds an unfixed parameter by its bounds and the expected type, P-48's rule; walk cannot evaluate `Zilch`. Gated under walk by `tests/NumberOrderListDeclarations.fss`. Detail: `compile-ladder/rung-number-order-slips/REPORT.md` sections 1, 4 and 5.

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-118, changed

- Size: at the base 1218 characters; at the landing 1463 characters; now 1463 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-118 **A numeral's value reaches the compiled world intact, and the compiled path prints a large `NN32` or `NN64` value unsigned, but it cannot compare a numeral beyond `ZZ64` with another numeral.** The code generator carries a numeral as an `int`, a `long` or its decimal string, by its exact bit length. So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk refuses a numeral bound to `NN32` or `NN64`, F-57). The compiled path prints an `NN32` or `NN64` value above its type's signed half unsigned (F-313; test `compiler_tests/UnsignedPrintingCompiled`). It compares two `IntLiteral`s at `ZZ64`, so `a = 18446744073709551615` then `a < 5` fails with `Not in range for ZZ64` (row 328), which no test pins. An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it. Walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

Now:

- F-118 **A numeral's value reaches the compiled world intact, and the compiled path prints a large `NN32` or `NN64` value unsigned, but it cannot compare a numeral beyond `ZZ64` with another numeral.** The code generator carries a numeral of its own type as an `int`, a `long` or its decimal string, by its exact bit length, and a numeral that the coercion desugarer types at a library number type as that type's constant (F-340). So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk converts a numeral bound to `NN32` or `NN64`, F-341). The compiled path prints an `NN32` or `NN64` value above its type's signed half unsigned (F-313; test `compiler_tests/UnsignedPrintingCompiled`). It compares two `IntLiteral` values at `ZZ64`, so `lt(18446744073709551615, 5)` for `lt(a: IntLiteral, b: IntLiteral): Boolean = a < b` fails with `Not in range for ZZ64` (row 328), which no test pins; an untyped binding of such a numeral is a `ZZ`, its default (F-342). An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it. Walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

History blocks of the range:

- Written by the gather: 2026-11-09 06:58Z · rewritten · from `explorations/compile-ladder/rung-literal-fold/REPORT.md`, "Sentences made false" · by climb batch 29 gather (cites [S7])
- Written by the gather: 2026-11-09 07:05Z · rewritten · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "Sentences of the specification made false" · by climb batch 29 gather (cites [S1])
- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

Report sections that the entry cites: [S8] `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

## F-123, changed

- Size: at the base 1028 characters; at the landing 1085 characters; now 1085 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-123 **A compiled object with no `asString` of its own prints its bare type name, as walk does.** A value whose run-time Java class declares its own `toString`, such as the compiled `RR32`'s, prints by it. Open on the compiled path: through the prelude's `Object`, an object that declares or inherits a zero-argument Fortress member named `toString` overflows the stack when it is printed (row 321), though not through the one library's `Object`, whose `asString` is `self.ilkName`; and `asDebugString` and `asExprString` print differently from walk's, where the specification is silent (row 363). For a string static argument walk is the one that is wrong: it takes the argument from the run-time class, so `Cell("s")` prints `Cell[\FlatString\]`, where the compiled `Cell[\String\]` is the specification's answer (row 364). For a numeral argument neither path gives the specification's type. Gated by `compiler_tests/DefaultRenderRungS`. Detail: `compile-ladder/rung-default-rendering/REPORT.md`, "Defects and their homes".

Now:

- F-123 **A compiled object with no `asString` of its own prints its bare type name, as walk does.** A value whose run-time Java class declares its own `toString`, such as the compiled `RR32`'s, prints by it. Open on the compiled path: through the prelude's `Object`, an object that declares or inherits a zero-argument Fortress member named `toString` overflows the stack when it is printed (row 321), though not through the one library's `Object`, whose `asString` is `self.ilkName`; and `asDebugString` and `asExprString` print differently from walk's, where the specification is silent (row 363). For a string static argument both paths give `Cell[\String\]`, the specification's answer, walk reading a string object at `String` (F-344). For a numeral argument both paths give the numeral's default, the specification's answer: `Cell(3)` is a `Cell[\ZZ32\]` (`tests/LanguageTypeInstancesWalk`, `compiler_tests/LiteralDefaultCompiled`; F-341, F-342). Gated by `compiler_tests/DefaultRenderRungS`. Detail: `compile-ladder/rung-default-rendering/REPORT.md`, "Defects and their homes".

History blocks of the range:

- Written by the gather: 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])
- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

Report sections that the entry cites: [S9] `compile-ladder/rung-default-rendering/REPORT.md`, "Defects and their homes".

## F-131, changed

- Size: at the base 1320 characters; at the landing 1424 characters; now 1424 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-131 **The one library's number tower is flat.** It builds P-43. `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and `IntLiteral` are siblings under `Number`. `IntLiteral` is the type that the library declares for an integer numeral. The compiled checker gives a numeral that type; walk still gives it `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit (P-76). Each wider integer type converts from each narrower one, and `RR64` from a `ZZ32` and an `IntLiteral`; a `ZZ64` goes into `RR64` only when written out (P-74). `QQ` converts from the five integer types and `IntLiteral`, and `RR64` converts from `RR32` too (F-139). `NN32` does not yet convert into `RR64`: P-75 decides that it will. `Number` declares no `=`; each type declares one at each type it coerces from or into (F-324). Under walk, a big operator over a list of numerals, with no static argument on either, such as `SUM <|1, 2, 3|>`, finds no matching overload at run time (row 432), and an empty `SUM` over an additive group that is not a number dies (row 436). Gated by `tests/FlatTowerRungF.fss` for every type but `RR32` and `IntLiteral`: that none is another's subtype, their coercions and `=`. `RR32`'s place is gated with F-139, and `IntLiteral`'s with F-79. Detail: `compile-ladder/rung-flat-tower/REPORT.md` sections 5 and 17.

Now:

- F-131 **The one library's number tower is flat.** It builds P-43. `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and the numerals' trait `Numeral` are siblings under `Number`; `Numeral` comprises `NaturalNumeral` and `RadixPointNumeral`, the types that the library declares for a numeral, from which each of the eight converts (F-79). The compiled checker gives a numeral its numeral type and converts it where it stands (F-342); walk gives it its default, `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit, and converts it where its place fixes a type (F-341). Each wider integer type converts from each narrower one, and `RR64` from a `ZZ32`; a `ZZ64` goes into `RR64` only when written out (P-74). `QQ` converts from the five integer types, and `RR64` converts from `RR32` too (F-139). `NN32` does not yet convert into `RR64`: P-75 decides that it will. `Number` declares no `=`; each type declares one at each type it coerces from or into (F-324). Under walk `SUM <|1, 2, 3|>`, with no static argument, is 6, its list read at `ZZ32` (F-344), and an empty `SUM` over an additive group that is not a number dies (row 436). Gated by `tests/FlatTowerRungF.fss` for every type but `RR32` and the numeral types: that none is another's subtype, their coercions and `=`. `RR32`'s place is gated with F-139, and the numeral types' with F-79. Detail: `compile-ladder/rung-flat-tower/REPORT.md` sections 5 and 17.

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-137, changed

- Size: at the base 1613 characters; at the landing 1449 characters; now 1449 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-137 **Under `walk`, a generic call's static arguments are inferred with coercion, by P-74's promotion, also for the declaration that an overloaded call chooses (P-46).** A lone type parameter is one that is the whole declared type of some argument and that no other argument fixes through a type such as `List[\T\]`. It takes the narrowest of its arguments' run-time types, their coercion targets and its bounds that admits every argument. So `ZZ32` with `ZZ64` gives `ZZ64`. `ZZ64` with `RR64` gives the declared bound, the only candidate that admits both, since a `ZZ64` goes into `RR64` only when written out (P-74). With no narrowest candidate, the parameter takes its bound where every argument is below the bound (F-141), and otherwise the arguments' join. Walk, which has no static types, promotes from the run-time types. So where a static type is wider than its value, the two paths instantiate differently (row 509). The rule does not reach these open defects: a big operator over a list of numerals with no static argument (row 432); a `nat` parameter used as a value at an `NN32` binding, refused at the binding (row 486); a static argument that only the call's result mentions, at a typed binding (row 510); and a varargs or tuple parameter over mixed widths (row 511). Nor does it reach, by inference and not measured, a numeral that fits `ZZ32` passed alone for a parameter whose bound a `ZZ32` neither extends nor coerces into, since walk reads such a numeral as a `ZZ32` (P-76). Gated by `tests/InferCoercionRungK.fss`. Detail: `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

Now:

- F-137 **Under `walk`, a generic call's static arguments are inferred with coercion, by P-74's promotion, also for the declaration that an overloaded call chooses (P-46).** A lone type parameter is one that is the whole declared type of some argument and that no other argument fixes through a type such as `List[\T\]`. It takes the narrowest of its arguments' run-time types, their coercion targets and its bounds that admits every argument. So `ZZ32` with `ZZ64` gives `ZZ64`. `ZZ64` with `RR64` gives the declared bound, the only candidate that admits both, since a `ZZ64` goes into `RR64` only when written out (P-74). With no narrowest candidate, the parameter takes its bound where every argument is below the bound (F-141), and otherwise the arguments' join. Walk, which has no static types, promotes from the run-time types. So where a static type is wider than its value, the two paths instantiate differently (row 509). The rule does not reach these open defects: a static argument that only the call's result mentions, at a typed binding (row 510); and a varargs or tuple parameter over mixed widths (row 511). Nor does it reach, by inference and not measured, a numeral that fits `ZZ32` passed alone for a parameter whose bound a `ZZ32` neither extends nor coerces into, since walk reads such a numeral as a `ZZ32` (P-76). Gated by `tests/InferCoercionRungK.fss`. Detail: `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-138, changed

- Size: at the base 502 characters; at the landing 559 characters; now 559 characters.
- Section now: "Landed semantics".

At the base:

- F-138 **Each integer type declares its own `MIN`, `MAX` and `MINMAX`, so under `walk` the family answers at the type that its arguments promote to.** It builds P-47. Each type also declares its own `MAXNUM` and `MINNUM`. Under walk an `NN32` operator with a numeral answers a `ZZ64` (row 484). Compiled, `NN32` with `ZZ32` or `ZZ64` answers `ZZ` (row 442). Gated by `tests/IntegerMinMaxRungM.fss` and `IntegerMaxNumMinNum.fss`. Detail: `compile-ladder/rung-integer-minmax/REPORT.md` sections 1 and 9.

Now:

- F-138 **Each integer type declares its own `MIN`, `MAX` and `MINMAX`, so under `walk` the family answers at the type that its arguments promote to.** It builds P-47. Each type also declares its own `MAXNUM` and `MINNUM`. Under walk an `NN32` operator with a numeral answers an `NN32`, the numeral converting into `NN32` (`tests/NumeralWithNN32.fss`). Compiled, `NN32` with `ZZ32` or `ZZ64` answers `ZZ` (row 442). Gated by `tests/IntegerMinMaxRungM.fss` and `IntegerMaxNumMinNum.fss`. Detail: `compile-ladder/rung-integer-minmax/REPORT.md` sections 1 and 9.

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-140, changed

- Size: at the base 1760 characters; at the landing 1727 characters; now 1727 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-140 **A size beyond `NN32` or `ZZ32` is refused by the compiled checker when it is a literal or folded from literals, and by walk when it binds one; walk reads a size exactly.** It builds P-40. The checker refuses such a size outside its kind: 0 to 4294967295 for `nat`, and `ZZ32`'s range for `int`. Walk refuses it at run time, where it binds the size to a static parameter. Walk reads and computes a size exactly, with no wrap: it reads a size used as a value as a `ZZ32` up to 2^31-1 and as a `ZZ64` above. The checker types such a value `IntLiteral`. The compiled class loader checks no size that it computes at instantiation: `next[\nat k\]()`, which builds a `Box[\k + 1\]`, answers 4294967296 at `k = 4294967295` (gap-ledger row 675; F-222). Gated by `tests/NatBigSizeWalk` for walk's reading. The refusals are gated by `compiler_tests/XXXNatRangeChecker`, `XXXNatArithRangeChecker` and `NatRtBigSize`, and by `tests/XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk` and `XXXNatArithSumWalk`; each `XXX` test passes because its program is refused. Open under walk: an array of a static size from 2^31 to 2^32-1 stops at its store's factory, 'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type Long', where no catch sees it (row 527). Also open, as notes on row 325 (a numeral outside a bounded integer type): on the compiled path a `nat` size above `ZZ32`'s range, used where a `ZZ32` is needed, as in a range, fails at run time, as a numeral beyond `ZZ32` does, and neither P-40 nor the specification says where such a size is refused; and under walk a `ZZ32`-declared return passes such a size on as a `ZZ64`. Detail: `compile-ladder/rung-size-range/REPORT.md` sections 6 and 12.

Now:

- F-140 **A size beyond `NN32` or `ZZ32` is refused by the compiled checker when it is a literal or folded from literals, and by walk when it binds one; walk reads a size exactly.** It builds P-40. The checker refuses such a size outside its kind: 0 to 4294967295 for `nat`, and `ZZ32`'s range for `int`. Walk refuses it at run time, where it binds the size to a static parameter. Walk reads and computes a size exactly, with no wrap: it reads a size used as a value as a `ZZ32` up to 2^31-1 and as a `ZZ64` above. The checker types such a value `ZZ32` (P-173, F-342). The compiled class loader checks no size that it computes at instantiation: `next[\nat k\]()`, which builds a `Box[\k + 1\]`, answers 4294967296 at `k = 4294967295` (gap-ledger row 675; F-222). Gated by `tests/NatBigSizeWalk` for walk's reading. The refusals are gated by `compiler_tests/XXXNatRangeChecker`, `XXXNatArithRangeChecker` and `NatRtBigSize`, and by `tests/XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk` and `XXXNatArithSumWalk`; each `XXX` test passes because its program is refused. Open under walk: an array of a static size from 2^31 to 2^32-1 stops at its store's factory, 'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type Long', where no catch sees it (row 527). Also open (row 962, contested): a `nat` or `int` size of 2^31 or more read as a value raises a `java.lang.Error` on the compiled path that no `catch` sees, and is a `ZZ64` under walk, where P-173 makes it a `ZZ32` and no decision says where such a size is refused; under walk a `ZZ32`-declared return passes such a size on as a `ZZ64`. Detail: `compile-ladder/rung-size-range/REPORT.md` sections 6 and 12.

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-151, changed

- Size: at the base 1673 characters; at the landing 1658 characters; now 1658 characters, over 600.
- Section now: "The library's arrays and algebra".

At the base:

- F-151 **In the interpreter's library, `Vector`, `Matrix` and their factories and operators bound their element type by `T extends { Number, MultiplicativeRing[\T\] }`.** `Number` declares no arithmetic, so the compiled checker accepts the bodies' arithmetic only through `MultiplicativeRing[\T\]`. `Number` stays in the bound, though it has no `comprises` clause now (F-324). The four juxtapositions of a vector or a matrix with a scalar `T`, in either order, stand beside the library's juxtapositions with a `String`, and the checker finds no error in them (F-53); no run measures what now keeps a scalar `T` apart from `String`. The vector norm is declared at each of the eight number types, by its own `asFloat` (F-324). The eight number types meet the bound. `Number` itself and the numeral type `IntLiteral` do not, since neither is a ring at its own type. So `Vector[\Number,n\]` is not a well-formed type, and `array1` and `array2` have no branch for `Number`: called at `Number`, they give a plain array at run time, not a vector or a matrix (F-229). The checker accepts a call whose argument's type is built from the caller's own type parameter under the same bound, such as the norm's `squaredNorm(me)` (F-227). The scalar extension, the eight operators between an array and a scalar, has bounds of its own, also with `Number` (F-119). Gated under walk by `tests/ArrayElementAlgebra.fss`. The bound is the default that `reviews/array-fork2-judgement.md` recommended. It landed when the curator said to land it. Detail: that judgement, sections 2.5 (what `Number`'s `comprises` clause gives), 2.9, way 3 (the ring alone, measured) and 4 (the bound and its cost).

Now:

- F-151 **In the interpreter's library, `Vector`, `Matrix` and their factories and operators bound their element type by `T extends { Number, MultiplicativeRing[\T\] }`.** `Number` declares no arithmetic, so the compiled checker accepts the bodies' arithmetic only through `MultiplicativeRing[\T\]`. `Number` stays in the bound, though it has no `comprises` clause now (F-324). The four juxtapositions of a vector or a matrix with a scalar `T`, in either order, stand beside the library's juxtapositions with a `String`, and the checker finds no error in them (F-53); no run measures what now keeps a scalar `T` apart from `String`. The vector norm is declared at each of the eight number types, by its own `asFloat` (F-324). The eight number types meet the bound. `Number` itself and the numeral types do not, since none is a ring at its own type. So `Vector[\Number,n\]` is not a well-formed type, and `array1` and `array2` have no branch for `Number`: called at `Number`, they give a plain array at run time, not a vector or a matrix (F-229). The checker accepts a call whose argument's type is built from the caller's own type parameter under the same bound, such as the norm's `squaredNorm(me)` (F-227). The scalar extension, the eight operators between an array and a scalar, has bounds of its own, also with `Number` (F-119). Gated under walk by `tests/ArrayElementAlgebra.fss`. The bound is the default that `reviews/array-fork2-judgement.md` recommended. It landed when the curator said to land it. Detail: that judgement, sections 2.5 (what `Number`'s `comprises` clause gives), 2.9, way 3 (the ring alone, measured) and 4 (the bound and its cost).

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-228, changed

- Size: at the base 2308 characters; at the landing 2330 characters; now 2330 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-228 **Under walk, a reduction or a comprehension that writes no static argument instantiates its big operator by a declared type, else by the join of its elements' run-time types, else at its bound, where an F-bounded parameter stays open.** It builds P-48. The declared type is a local variable's, or a top-level or local function's declared return type, for either also where the clause form ends a block. A method's return type, a top-level variable, a field, an assignment, a function expression, a branch, a call's argument and another clause form's body do not direct it. Otherwise the clauses run once into the library's collector, `__elemsOf`, which keeps the elements in order, typed at the join of their run-time types, and the operator is instantiated at that join; the reduction then runs over the collected elements, so each body runs once. A declared type or a join that does not fit falls back to the instance that no hint gives: a plain-bounded parameter takes its bound, and an F-bounded one stays open (F-143). So a `SUM` of `ZZ32` and `RR64` values, whose join `Number` is outside the bound, runs with each `+` at its operands' types. The same holds with no element and no declared type. With the big operator so instantiated, the library types `__bigOperator`'s local function `body(i: I)` at the element type `I`. A big operator whose declared result is a trait of its own is read through the `BigReduction`, `Comprehension` or `BigOperator` that the trait extends (row 718, fixed). Still wrong, each a ledger row: an empty clause form that no declared type directs takes its bound or stays open (row 716); a comprehension that no declared type reaches is built at its elements' run-time class, as `ArrayList[\Int\]`, which a declared `List[\ZZ32\]` refuses (rows 20, 717); a clause form that is a call's argument gets no declared type (rows 510, 705). Gated by `tests/UnwrittenListMapComprehensionWalk`, `UnwrittenComprehension*Walk`, `ComprehensionTypedBindingWalk`, `UnwrittenSetBigOperatorsWalk`, `UnwrittenEmptyFloatSumWalk`, `IntMapComprehensionTypedWalk` and `UserBigOperatorResultTraitWalk`. Detail: `compile-ladder/rung-walk-elements/REPORT.md` sections 1, 5 (5.3 lists the contexts) and 10, decision 6; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 718".

Now:

- F-228 **Under walk, a reduction or a comprehension that writes no static argument instantiates its big operator by a declared type, else by the join of its elements' run-time types, else at its bound, where an F-bounded parameter stays open.** It builds P-48. The declared type is a local variable's, or a top-level or local function's declared return type, for either also where the clause form ends a block. A method's return type, a top-level variable, a field, an assignment, a function expression, a branch, a call's argument and another clause form's body do not direct it. Otherwise the clauses run once into the library's collector, `__elemsOf`, which keeps the elements in order, typed at the join of their run-time types, and the operator is instantiated at that join; the reduction then runs over the collected elements, so each body runs once. A declared type or a join that does not fit falls back to the instance that no hint gives: a plain-bounded parameter takes its bound, and an F-bounded one stays open (F-143). So a `SUM` of `ZZ32` and `RR64` values, whose join `Number` is outside the bound, runs with each `+` at its operands' types. The same holds with no element and no declared type. With the big operator so instantiated, the library types `__bigOperator`'s local function `body(i: I)` at the element type `I`. A big operator whose declared result is a trait of its own is read through the `BigReduction`, `Comprehension` or `BigOperator` that the trait extends (row 718, fixed). Still wrong, each a ledger row: an empty clause form that no declared type directs takes its bound or stays open (row 716); a comprehension that no declared type reaches is built at the join of its elements' run-time types, which a declared `List[\Shape\]` refuses where its elements are all `Circle`s (row 717); a clause form that is a call's argument gets no declared type (rows 510, 705). Gated by `tests/UnwrittenListMapComprehensionWalk`, `UnwrittenComprehension*Walk`, `ComprehensionTypedBindingWalk`, `UnwrittenSetBigOperatorsWalk`, `UnwrittenEmptyFloatSumWalk`, `IntMapComprehensionTypedWalk` and `UserBigOperatorResultTraitWalk`. Detail: `compile-ladder/rung-walk-elements/REPORT.md` sections 1, 5 (5.3 lists the contexts) and 10, decision 6; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 718".

History blocks of the range:

- Written by the gather: 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])
- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-229, changed

- Size: at the base 1609 characters; at the landing 1524 characters; now 1524 characters, over 600.
- Section now: "The library's arrays and algebra".

At the base:

- F-229 **`array1` and `array2` give a vector and a matrix only at the eight number types, chosen by a `typecase` over a witness of their result type; at any other element type they give a plain array.** The branches are `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`; each builds the array at that type and returns it through `cast`, in `additiveIdentity`'s shape. `Array1` and `Array2` are invariant, so a branch matches only its own number type exactly. `Number` and `AnyIntegral` get a plain array, since `Vector[\Number,n\]` is not well-formed under the element bound `T extends { Number, MultiplicativeRing[\T\] }` of `Vector` and `Matrix` (F-151). The specification's "Array Expressions" makes an array of `Number` elements a vector (row 729, contested). Under walk, a type parameter inferred from a `ZZ32` value is `Int`, the one type that `ZZ32` comprises (row 364), and one inferred from a `ZZ64` or `RR64` value is that value's run-time class. Such a type parameter gets a plain array, where the specification gives a vector (row 721). The witness is of the result type because at `T = Int` a witness of the element type, `() -> Int`, would match the `ZZ32` branch, and the `cast` of the `ZZ32` vector to an array of `Int` would throw `CastError`, as `openRange` does (row 722). Gated under walk by `tests/ArrayFactoryNumberTypes` and `ArrayFactoryAbstractNumber`. The distance stage measures the compiled checker's acceptance; it reports, and does not turn the gate red. Detail: `compile-ladder/rung-library-factories/REPORT.md` sections 1 (the change), 3 and 4 (the ways measured).

Now:

- F-229 **`array1` and `array2` give a vector and a matrix only at the eight number types, chosen by a `typecase` over a witness of their result type; at any other element type they give a plain array.** The branches are `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`; each builds the array at that type and returns it through `cast`, in `additiveIdentity`'s shape. `Array1` and `Array2` are invariant, so a branch matches only its own number type exactly. `Number` and `AnyIntegral` get a plain array, since `Vector[\Number,n\]` is not well-formed under the element bound `T extends { Number, MultiplicativeRing[\T\] }` of `Vector` and `Matrix` (F-151). The specification's "Array Expressions" makes an array of `Number` elements a vector (row 729, contested). Under walk, a type parameter inferred from a `ZZ32`, `ZZ64` or `RR64` value is that type, so it gets a vector (`tests/ArrayInferredElementVectorWalk`). The witness is of the result type because at `T = Int` a witness of the element type, `() -> Int`, would match the `ZZ32` branch, and the `cast` of the `ZZ32` vector to an array of `Int` would throw `CastError`, as `openRange` did before walk read an `Int` value at `ZZ32` (row 722, fixed). Gated under walk by `tests/ArrayFactoryNumberTypes` and `ArrayFactoryAbstractNumber`. The distance stage measures the compiled checker's acceptance; it reports, and does not turn the gate red. Detail: `compile-ladder/rung-library-factories/REPORT.md` sections 1 (the change), 3 and 4 (the ways measured).

History blocks of the range:

- Written by the gather: 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])
- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-240, changed

- Size: at the base 2031 characters; at the landing 2032 characters; now 2032 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 100 s and its distance stage 205 s at the last landed gate, climb batch 28's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 135 s), over fourteen components, ran at a start load of 3.42, against 144 s (90 s) at 0.28 at climb batch 27's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-28/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 125 s and its distance stage 224 s at the last landed gate, climb batch 29's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 141 s), over fourteen components, ran at a start load of 0.07, against 205 s (135 s) at 3.42 at climb batch 28's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-29/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-09 08:46Z · rewritten · by climb batch 29 commit stage: the count stage about 125 s, from the file times of the gate's log, tmp/gate-batch-29/checker-count/javac.txt (08:18:35Z) to run.txt (08:20:40Z); the distance stage from compile-ladder/climb-batch-29/gate/distance.txt: #seconds 224, FortressLibrary 141, #machine's load at start 0.07, and its first line's 14 components; compared against climb batch 28's 205 s (135 s) at 3.42, as F-240 gave them

## F-249, changed

- Size: at the base 1035 characters; at the landing 1131 characters; now 1131 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-249 **Under walk, a program that imports only the prelude reaches the string objects' own `||` through the top-level `opr ||(a:String, b:String)`, whose `typecase` calls them.** The string objects' own `||` are those that the objects `FlatString` and `EmptyString` declare, and that the trait `Concatenable` declares for the objects `CatString` and `SubString`. `FortressLibrary`, where the top-level `||` is declared, sees them only where an api that it imports states them: `FlatString`'s api does, and String's api states `Concatenable`'s and `EmptyString`'s three each (`Library/String.fsi:17-19`, `:29-31`). So `"s" || "t"` is a `FlatString` of depth 0, as it was while `String`'s abstract `opr ||(self, b:String)` stood (F-276); a top-level meet with `Concatenable`'s body, which a probe tried, gave a `CatString` of depth 1. Gated by `tests/StringConcatenationFamiliesWalk.fss`. Detail: `compile-ladder/rung-symbolic-library/REPORT.md` section 12, decision 3; `perf-probes/symbolic-operators/REPORT.md` sections 2.2 and 2.4.

Now:

- F-249 **Under walk, a program that imports only the prelude reaches the string objects' own `||` through the top-level `opr ||(a:String, b:String)`, whose `typecase` calls them.** The string objects' own `||` are those that the objects `FlatString` and `EmptyString` declare, and that the trait `Concatenable` declares for the objects `CatString` and `SubString`. `FortressLibrary`, where the top-level `||` is declared, sees them only where an api that it imports states them: `FlatString`'s api does, and String's api states `Concatenable`'s and `EmptyString`'s three each (`Library/String.fsi:17-19`, `:29-31`). So `"ab" || t`, for `t: String = "cd"`, is a `FlatString` of depth 0 (a concatenation of two literals is folded into one before walk, F-343), as it was while `String`'s abstract `opr ||(self, b:String)` stood (F-276); a top-level meet with `Concatenable`'s body, which a probe tried, gave a `CatString` of depth 1. Gated by `tests/StringConcatenationFamiliesWalk.fss`. Detail: `compile-ladder/rung-symbolic-library/REPORT.md` section 12, decision 3; `perf-probes/symbolic-operators/REPORT.md` sections 2.2 and 2.4.

History blocks of the range:

- Written by the gather: 2026-11-09 07:10Z · rewritten · from `explorations/compile-ladder/rung-string-literals/REPORT.md`, "12. Sentences made false" · by climb batch 29 gather (cites [S10])

## F-253, changed

- Size: at the base 2085 characters; at the landing 2088 characters; now 2088 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-253 **Under walk, a call of a generic method that writes no static argument infers the method's own static arguments from the arguments' run-time types.** This holds for a dotted call, as for a call of a generic function, whether the method is alone under its name or among its receiver's overloads. Among the receiver's overloads, where one of two is a generic dotted method and exactly one of their declared domains lies inside the other, walk chooses the inner one; otherwise it compares them on the instance that the call makes (F-252). A generic method that a trait declares reads its bounds, and the types to which its arguments convert, in the trait's method environment, where its instances bind and evaluate their types, as a method that an object declares does. So it takes the instance that the same method declared in an object takes: a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]` with the `ZZ32` converted, and a bounded type parameter that nothing fixes takes its bound. A generic functional method that an object inherits from a trait is chosen beside the object's plain one where only it applies. Where the inference with conversion finds no instance, as for an argument outside a bound, walk falls back to unification. For a trait's method, the unification still reads the trait's member environment, which has no parent, as the team's code did. So it does not read the bound, and the call fails with 'Cannot unify Int ... with Shape ... abm=K=(Int,Any)'; the same method declared in an object fails with 'Meet(Int, Shape) not a singleton'. This inference lets the team's generic `distribute` over `K` run nested reductions under walk (F-248). Gated by `tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss`, `NestedReductionFusion.fss`, `TraitGenericMethodInference.fss` and `InheritedGenericFunctionalMethodBesidePlain.fss`. Detail: `compile-ladder/rung-walk-method-sargs/REPORT.md` sections 1 and 2; `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 4, and its `SKEPTIC.md` section 3.

Now:

- F-253 **Under walk, a call of a generic method that writes no static argument infers the method's own static arguments from the arguments' run-time types.** This holds for a dotted call, as for a call of a generic function, whether the method is alone under its name or among its receiver's overloads. Among the receiver's overloads, where one of two is a generic dotted method and exactly one of their declared domains lies inside the other, walk chooses the inner one; otherwise it compares them on the instance that the call makes (F-252). A generic method that a trait declares reads its bounds, and the types to which its arguments convert, in the trait's method environment, where its instances bind and evaluate their types, as a method that an object declares does. So it takes the instance that the same method declared in an object takes: a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]` with the `ZZ32` converted, and a bounded type parameter that nothing fixes takes its bound. A generic functional method that an object inherits from a trait is chosen beside the object's plain one where only it applies. Where the inference with conversion finds no instance, as for an argument outside a bound, walk falls back to unification. For a trait's method, the unification still reads the trait's member environment, which has no parent, as the team's code did. So it does not read the bound, and the call fails with 'Cannot unify ZZ32 ... with Shape ... abm=K=(ZZ32,Any)'; the same method declared in an object fails with 'Meet(ZZ32, Shape) not a singleton'. This inference lets the team's generic `distribute` over `K` run nested reductions under walk (F-248). Gated by `tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss`, `NestedReductionFusion.fss`, `TraitGenericMethodInference.fss` and `InheritedGenericFunctionalMethodBesidePlain.fss`. Detail: `compile-ladder/rung-walk-method-sargs/REPORT.md` sections 1 and 2; `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 4, and its `SKEPTIC.md` section 3.

History blocks of the range:

- Written by the gather: 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])

## F-262, changed

- Size: at the base 596 characters; at the landing 1187 characters; now 1187 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-262 **A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell `10^16` from `10^(-16)`.** The numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`). The checker types every integer numeral `IntLiteral` (`Misc.scala:468-469`); the compiled path folds `prefix -` on a numeral into a numeral of that type before the checker, and does not fold `^` (`IntegerLiteralFoldingVisitor.java:58-107`, `:152-153`). Walk's numeral is an `Int` (F-74). By reading. Detail: `reviews/integer-power-fable-judgement.md` section 9.

Now:

- F-262 **A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell `10^16` from `10^(-16)`.** The numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`). The checker types every integer numeral by its numeral type, `IntLiteral` under the compiler's prelude and `NaturalNumeral` under the one library (`Misc.scala:468-469`), before it converts it (F-342); both paths fold `prefix -` on a numeral into a numeral node with a negative value before the checker, and fold `^` by an integer exponent of magnitude at most 4096 where the exponent is not negative or the base is a radix-point or quotient constant; an integer base at a negative exponent is left, so `10^(-16)` stays an operation whose exponent is a numeral (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:292-302`). Walk's numeral is its default, an `Int` value read at `ZZ32` (F-74, F-341); a negative constant at a program's own type reaches its coercion as a `NaturalNumeral` of negative value under walk (row 968), and with its sign on the compiled path (row 961). By reading. Detail: `reviews/integer-power-fable-judgement.md` section 9.

History blocks of the range:

- Written by the gather: 2026-11-09 06:58Z · rewritten · from `explorations/compile-ladder/rung-literal-fold/REPORT.md`, "Sentences made false" · by climb batch 29 gather (cites [S7])
- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-263, changed

- Size: at the base 1933 characters; at the landing 1720 characters; now 1720 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-263 **In the interpreter's library each integer power is declared to answer its base's own type; under walk, at a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`.** It builds P-153. Under walk the power answers its base's type and follows these rules at `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, with an exponent of any integer type, including a `ZZ` exponent too large for 64 bits, such as 2^70. Under walk a numeral is a `ZZ32` value (F-74), so `2^(-1)` raises `IntegerOverflow`. `IntLiteral` is the type that the compiled checker gives an integer numeral (F-262). Under walk the name `IntLiteral` also denotes a value, a zero that no numeral reaches. Its power follows the same rules, but answers a `ZZ32`, as all its arithmetic does, against its declared `IntLiteral`: a gap of walk (row 578). `QQ`'s power takes an exponent of any integer type. For a fraction, write a float or rational base: `2.0^(-1)` is 0.5, and `(2/3)^(-1)` is `3/2`. The compiled checker accepts the library's own uses of these powers (the distance stage). microGPT's only integer power is in the library's `strToInt`, always at a nonnegative exponent. The compiled path's own library does not follow these rules. At a negative exponent its `ZZ32` power gives 0 at every base but 0, 1 and -1, and a raw Java `RuntimeException` at a base of 0 (row 441). P-153 lists this, with that power's overflow, which throws a raw Java exception that no Fortress `catch` sees, or saturates quietly (row 523). Tests: `tests/IntegerPowerContractWalk.fss`, `tests/QQPowerExponent.fss`; on the compiled path, the expected failure `compiler_tests/XXXIntegerPowerContractCompiled.test`. Detail: `compile-ladder/rung-integer-power/REPORT.md` sections 1, 2 and 4 (the change, the tests, the checker's sites); `perf-probes/integer-power/REPORT.md` section 1.6 (microGPT's powers).

Now:

- F-263 **In the interpreter's library each integer power is declared to answer its base's own type; under walk, at a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`.** It builds P-153. Under walk the power answers its base's type and follows these rules at `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, with an exponent of any integer type, including a `ZZ` exponent too large for 64 bits, such as 2^70. Under walk a numeral where nothing fixes a type is a `ZZ32` value (F-74), and the numeral fold leaves an integer base at a negative exponent (F-262), so `2^(-1)` raises `IntegerOverflow`. `QQ`'s power takes an exponent of any integer type. For a fraction, write a float or rational base: `2.0^(-1)` is 0.5, and `(2/3)^(-1)` is `3/2`. The compiled checker accepts the library's own uses of these powers (the distance stage). microGPT's only integer power is in the library's `strToInt`, always at a nonnegative exponent. The compiled path's own library does not follow these rules. At a negative exponent its `ZZ32` power gives 0 at every base but 0, 1 and -1, and a raw Java `RuntimeException` at a base of 0 (row 441). P-153 lists this, with that power's overflow, which throws a raw Java exception that no Fortress `catch` sees, or saturates quietly (row 523). Tests: `tests/IntegerPowerContractWalk.fss`, `tests/QQPowerExponent.fss`; on the compiled path, the expected failure `compiler_tests/XXXIntegerPowerContractCompiled.test`. Detail: `compile-ladder/rung-integer-power/REPORT.md` sections 1, 2 and 4 (the change, the tests, the checker's sites); `perf-probes/integer-power/REPORT.md` section 1.6 (microGPT's powers).

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-278, changed

- Size: at the base 1566 characters; at the landing 1611 characters; now 1611 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-278 **The library's subscripts over a generic index type are a valid overloading at every instance: the index parameter is bounded by `Index`, which `ZZ32` extends and the ranges exclude, and a tuple type whose element types are all `Index` types is an `Index`, outside `Object`, on both paths.** Under the full check of symbolic operators the 124 subscript errors of F-245 are gone and none comes (191 to 67 with this change alone, on climb batch 21's base, F-245); the stock count (3) and distance (5) do not move. The checker and walk read the library's trait by its qualified name, so a program's own `Index` is not it, though walk refuses a program's own top-level type named `Index` as ambiguous with the library's ('Type name may refer to: Index, FortressLibrary.Index'), as it refuses one named `Indexed`; `()` is no `Index` on either path; a type that extends only `Index` is an `Object`; a program's generic over an indexed type's index parameter must bound it by `Index` for the checker; a numeral is no `Index` to the checker (an `IntLiteral`); the checker refuses a tuple expression at a function over `Index` (row 805); walk loads a function over `Index` beside one over a tuple type whose elements neither lie below nor exclude `Index`, which the checker refuses (row 806). Gated by `tests/TupleIndexBoundWalk.fss` and, for walk's exclusion, `tests/TupleIndexExclusionWalk.fss` with its `.test`; the checker's half by the distance stage, which checks every operator (F-281). Detail: `compile-ladder/rung-index-bound/REPORT.md` sections 1, 5 and 6.

Now:

- F-278 **The library's subscripts over a generic index type are a valid overloading at every instance: the index parameter is bounded by `Index`, which `ZZ32` extends and the ranges exclude, and a tuple type whose element types are all `Index` types is an `Index`, outside `Object`, on both paths.** Under the full check of symbolic operators the 124 subscript errors of F-245 are gone and none comes (191 to 67 with this change alone, on climb batch 21's base, F-245); the stock count (3) and distance (5) do not move. The checker and walk read the library's trait by its qualified name, so a program's own `Index` is not it, though walk refuses a program's own top-level type named `Index` as ambiguous with the library's ('Type name may refer to: Index, FortressLibrary.Index'), as it refuses one named `Indexed`; `()` is no `Index` on either path; a type that extends only `Index` is an `Object`; a program's generic over an indexed type's index parameter must bound it by `Index` for the checker; a numeral at `Index` takes its default, a `ZZ32`, on both paths (F-342; Appendix I's `revival-index`); the checker refuses a tuple expression at a function over `Index` (row 805); walk loads a function over `Index` beside one over a tuple type whose elements neither lie below nor exclude `Index`, which the checker refuses (row 806). Gated by `tests/TupleIndexBoundWalk.fss` and, for walk's exclusion, `tests/TupleIndexExclusionWalk.fss` with its `.test`; the checker's half by the distance stage, which checks every operator (F-281). Detail: `compile-ladder/rung-index-bound/REPORT.md` sections 1, 5 and 6.

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-285, changed

- Size: at the base 1622 characters; at the landing 1619 characters; now 1619 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-285 **The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.** The library follows P-78's workaround for row 731: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4576`, `:4582`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2715`, `:3101`, `:3106`, `SUM[\ZZ32\]` at `:4760`, `:4776`, and the team's `transpose` (`List.fss:504`). The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The fused arm (`:1581`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2735`). So the distance holds no site of rows 731 and 632, while row 731's checker gap stays for user programs and the team demos. Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`, where it answered a list of its elements' run-time class; `PureList`'s, at `Library/PureList.fss:73`, still does (row 824). Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/XXXPureListStridedSubscriptWalk`. Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7 and 9.

Now:

- F-285 **The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.** The library follows P-78's workaround for row 731: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4576`, `:4582`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2715`, `:3101`, `:3106`, `SUM[\ZZ32\]` at `:4760`, `:4776`, and the team's `transpose` (`List.fss:504`). The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The fused arm (`:1581`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2735`). So the distance holds no site of rows 731 and 632, while row 731's checker gap stays for user programs and the team demos. Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`, where it answered a list of its elements' run-time class; `PureList`'s, at `Library/PureList.fss:73`, still does (row 824). Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/PureListStridedSubscriptWalk`. Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7 and 9.

History blocks of the range:

- Written by the gather: 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])

## F-299, changed

- Size: at the base 3088 characters; at the landing 3108 characters; now 3108 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 372 of the one library's 424 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. For 15 names it runs walk's own operations instead and loads no helper: eight by the table `OWN_OPERATIONS` of `interpreter/glue/NativeApp.java`, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335), and `arrayOps`' seven by one rule (F-333). The library's own `FlatString`, identified by the component that declares it, carries `self` in a Java `String`; a program's own type named `FlatString` or `JavaString` carries none. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers, the messages, the refusal of a helper parameter declared `String`, and the loader's departures (rows 864, 551 and 846). The 372 by type: `ZZ32` 29 and `Int` 3, `ZZ64` 31 and `ZZ` 28 (F-306, F-327, F-331; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314), `Float` 62 and the top-level `fromRawBits` (F-303, F-323), `RR32` 51 (F-310, its `asFloat` F-311), the `asFloat`s of `Long` and `BigNum` 2 (F-311), the small rest 8 (F-307), and `NN32` 30, `NN64` 28, `UnsignedLong` 3 and `Char` 40 (F-308, F-313, F-327, F-331), the top-level `nanoTime` (F-314) and `random` (F-323), `Object`'s `ilkName` and `SEQV` over `Any` (F-328), `JavaBufferedWriter`'s 7 (F-330), `JavaBufferedReader`'s 10 (F-332), the array stores' 7 (F-333), `runtime`'s 6 (F-335), `System`'s `args` 2 (F-337), and the string family's 20: `FlatString`'s 13 methods; `natLineSeparator`; `match`; and `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment` and `getProperty`, each a native over `FlatString` beside an overload over `String` that flattens in a `typecase`. The other 52 name glue classes: `IntLiteral`'s 21, `FloatLiteral`'s 3 and `Reflect`'s 28 (F-32). Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`; the entries of the other families name their own tests. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

Now:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 374 of the one library's 402 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. For 15 names it runs walk's own operations instead and loads no helper: eight by the table `OWN_OPERATIONS` of `interpreter/glue/NativeApp.java`, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335), and `arrayOps`' seven by one rule (F-333). The library's own `FlatString`, identified by the component that declares it, carries `self` in a Java `String`; a program's own type named `FlatString` or `JavaString` carries none. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers, the messages, the refusal of a helper parameter declared `String`, and the loader's departures (rows 864, 551 and 846). The 374 by type: `ZZ32` 29 and `Int` 3, `ZZ64` 31 and `ZZ` 28 (F-306, F-327, F-331; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314), `Float` 62 and the top-level `fromRawBits` (F-303, F-323), `RR32` 51 (F-310, its `asFloat` F-311), the `asFloat`s of `Long` and `BigNum` 2 (F-311), the small rest 8 (F-307), the two that round a numeral once into `RR64` and `RR32` (F-79), and `NN32` 30, `NN64` 28, `UnsignedLong` 3 and `Char` 40 (F-308, F-313, F-327, F-331), the top-level `nanoTime` (F-314) and `random` (F-323), `Object`'s `ilkName` and `SEQV` over `Any` (F-328), `JavaBufferedWriter`'s 7 (F-330), `JavaBufferedReader`'s 10 (F-332), the array stores' 7 (F-333), `runtime`'s 6 (F-335), `System`'s `args` 2 (F-337), and the string family's 20: `FlatString`'s 13 methods; `natLineSeparator`; `match`; and `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment` and `getProperty`, each a native over `FlatString` beside an overload over `String` that flattens in a `typecase`. The other 28 name glue classes, `Reflect`'s (F-32). Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`; the entries of the other families name their own tests. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 07:05Z · rewritten · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "Sentences of the specification made false" · by climb batch 29 gather (cites [S1])

Report sections that the entry cites: [S11] `references/interpreter.md`, "Natives"; [S2] `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; [S12] `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; [S13] `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; [S14] `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

## F-304, changed

- Size: at the base 873 characters; at the landing 840 characters; now 840 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-304 **On the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings, not one, so a numeral of 16 or 17 significant digits can become a neighbouring double; walk rounds once.** `CodeGen.forFloatLiteralExpr` emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` (`compiler/codegen/CodeGen.java:2035-2045`), so compiled `0.9999999999999999` is 1.0; walk reads a radix-ten numeral's text with `Double.valueOf`. The specification asks "at most one floating-point rounding error" (`basic/expressions/literals.tex:187-190`). A compiled test compares such a double by its string, or uses a numeral with a zero integer part and at most 15 digits after the point. Test: `compiler_tests/XXXFloatNumeralOneRounding` (row 862). Detail: `compile-ladder/rung-natives-float/REPORT.md`, "Defects, each with its home".

Now:

- F-304 **On both paths a numeral with a radix point becomes its `RR64` or `RR32` by one rounding of its exact value.** The compiled `CodeGen.forFloatLiteralExpr` rounds the exact quotient once (`roundToDouble`, `roundToFloat`; F-340), where the team's code emitted `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` (`compiler/codegen/CodeGen.java:2035-2045` at b430f9f428), two or three roundings, so that compiled `0.9999999999999999` was 1.0; walk rounds once through `simpleDoubleArith.numeralToDouble` and `numeralToFloat` (F-79). The specification asks "at most one floating-point rounding error" (`basic/expressions/literals.tex`, "Literals"). Test: `compiler_tests/FloatNumeralOneRounding.test` (row 862, fixed). Detail: `compile-ladder/rung-natives-float/REPORT.md`, "Defects, each with its home".

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

Report sections that the entry cites: [S15] `basic/expressions/literals.tex`, "Literals"; [S16] `compile-ladder/rung-natives-float/REPORT.md`, "Defects, each with its home".

## F-326, changed

- Size: at the base 1059 characters; at the landing 1087 characters; now 1087 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-326 **Both paths answer `SEQV` by the specification's rule: values of different types never equivalent, value objects of one type field by field, floats by their bits, reference objects and strings only with themselves.** Walk in its value classes and `FTypeObject`'s field list; the compiled path in `equality.sEquiv`, which reads a `value` object by the mark `runtimeValues.ValueObjectMark` that the code generator adds to its class, and compares tuples element by element. Until the switch-over a compiled `===` reaches the prelude's family first, which answers `ZZ32`, `ZZ64`, `RR32` and `RR64` values, strings and booleans by `=` (P-38, row 908). Under walk a float numeral bound to `RR64` stays a `FloatLiteral`, not `SEQV` a computed `RR64`, a defect against P-172's conversion at a declared `RR64` (row 943); a tuple of four or more compares by `SEQV` (row 923). Tests: `tests/StrictEquivalenceRuleWalk.fss`, `tests/ValueObjectCC64Walk.fss`, `compiler_tests/StrictEquivalenceRuleCompiled.fss`. Detail: `compile-ladder/rung-seqv-meaning/REPORT.md`.

Now:

- F-326 **Both paths answer `SEQV` by the specification's rule: values of different types never equivalent, value objects of one type field by field, floats by their bits, reference objects and strings only with themselves.** Walk in its value classes and `FTypeObject`'s field list; the compiled path in `equality.sEquiv`, which reads a `value` object by the mark `runtimeValues.ValueObjectMark` that the code generator adds to its class, and compares tuples element by element. Until the switch-over a compiled `===` reaches the prelude's family first, which answers `ZZ32`, `ZZ64`, `RR32` and `RR64` values, strings and booleans by `=` (P-38, row 908). Under walk a float numeral bound to `RR64` converts there, so it is `SEQV` a computed `RR64` of the same bits (F-341), and two string literals of one text are one object on both paths (F-343); a tuple of four or more compares by `SEQV` (row 923). Tests: `tests/StrictEquivalenceRuleWalk.fss`, `tests/ValueObjectCC64Walk.fss`, `compiler_tests/StrictEquivalenceRuleCompiled.fss`. Detail: `compile-ladder/rung-seqv-meaning/REPORT.md`.

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

## F-328, changed

- Size: at the base 1090 characters; at the landing 1064 characters; now 1064 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-328 **Walk answers the compiled helpers `stringOps.typeName` and `equality.sEquiv` with its own operations, and its ilk names the five native number objects by their traits.** The one library binds `Object.ilkName` to `stringOps.typeName` and `SEQV` over `Any` to `equality.sEquiv` (P-58's form); walk's loader maps the two names, before it looks for a helper, to `ObjectPrims$ClassName` and `AnyPrim$SEquiv` (`interpreter/glue/NativeApp.java`, `OWN_OPERATIONS`, a table that holds `runtime`'s six names too, F-335), so it never loads the two helpers. `Object.asString` is `self.ilkName`. Walk's ilk prints `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` of `FortressBuiltin` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`, also inside static arguments, tuples and arrows; other types, strings, `Char`, `Ratio`, `FloatLiteral` among them, keep their names, and walk still instantiates generics at the run-time class (F-74). Tests: `tests/AnyNativesIntrinsicWalk`, `compiler_tests/AnyNativesIntrinsicCompiled`. Detail: `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

Now:

- F-328 **Walk answers the compiled helpers `stringOps.typeName` and `equality.sEquiv` with its own operations, and its ilk names the five native number objects by their traits.** The one library binds `Object.ilkName` to `stringOps.typeName` and `SEQV` over `Any` to `equality.sEquiv` (P-58's form); walk's loader maps the two names, before it looks for a helper, to `ObjectPrims$ClassName` and `AnyPrim$SEquiv` (`interpreter/glue/NativeApp.java`, `OWN_OPERATIONS`, a table that holds `runtime`'s six names too, F-335), so it never loads the two helpers. `Object.asString` is `self.ilkName`. Walk's ilk prints `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` of `FortressBuiltin` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`, also inside static arguments, tuples and arrows; other types, strings, `Char` and `Ratio` among them, keep their names, and walk instantiates a generic at the trait (F-344). Tests: `tests/AnyNativesIntrinsicWalk`, `compiler_tests/AnyNativesIntrinsicCompiled`. Detail: `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 07:05Z · rewritten · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "Sentences of the specification made false" · by climb batch 29 gather (cites [S1])
- Written by the gather: 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])

Report sections that the entry cites: [S17] `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

## F-331, changed

- Size: at the base 1483 characters; at the landing 1328 characters; now 1328 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-331 **The integer types convert by checked `as…` getters that raise `IntegerOverflow`, `bitsAs…` getters for the bits, and the low-bits names on every type where they apply, and `ZZ` converts out only by its getters.** On `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, the getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` keep the value or raise `IntegerOverflow`. Of the 25, 5 are identities, 7 equal the coercions, and 13 can raise: 8 of them are Fortress bodies or compositions, and 5 are bare helper bindings. `bitsAsNN32` of `ZZ32` and `bitsAsNN64` of `ZZ64` equal `unsigned`, and `bitsAsZZ32` of `NN32` and `bitsAsZZ64` of `NN64` equal `signed`. `narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits, each on every type where it applies; on a value that already has its result type, as `widen` of a `ZZ64`, each returns the value. `ZZ` has `big` only. `IntLiteral`'s `asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asString`, `asExprString`, `=` and `cmp` are Fortress over its `asZZ`. Meaning: under walk no conversion goes through a coercion, and `narrow(z)` of a `ZZ` finds no declaration (write `z.asZZ32`); until the switch-over the compiled prelude has 8 of the 25 getters and no `big` (row 349). F-299 counts the bindings. Tests: `tests/IntegerConversionsWalk`, `tests/IntLiteralTextWalk`, `compiler_tests/IntegerConversionHelpersCompiled`, `compiler_tests/XXXZZNarrowRungP`. Detail: `compile-ladder/rung-integer-conversions/REPORT.md`, "What changed and why".

Now:

- F-331 **The integer types convert by checked `as…` getters that raise `IntegerOverflow`, `bitsAs…` getters for the bits, and the low-bits names on every type where they apply, and `ZZ` converts out only by its getters.** On `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, the getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` keep the value or raise `IntegerOverflow`. Of the 25, 5 are identities, 7 equal the coercions, and 13 can raise: 8 of them are Fortress bodies or compositions, and 5 are bare helper bindings. `bitsAsNN32` of `ZZ32` and `bitsAsNN64` of `ZZ64` equal `unsigned`, and `bitsAsZZ32` of `NN32` and `bitsAsZZ64` of `NN64` equal `signed`. `narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits, each on every type where it applies; on a value that already has its result type, as `widen` of a `ZZ64`, each returns the value. `ZZ` has `big` only. Meaning: under walk no conversion goes through a coercion, and `narrow(z)` of a `ZZ` finds no declaration (write `z.asZZ32`); until the switch-over the compiled prelude has 8 of the 25 getters and no `big` (row 349). F-299 counts the bindings. Tests: `tests/IntegerConversionsWalk`, `compiler_tests/IntegerConversionHelpersCompiled`, `compiler_tests/XXXZZNarrowRungP`. Detail: `compile-ladder/rung-integer-conversions/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-09 08:18Z · rewritten · by climb batch 29's merged-diff review: made true of the merged tree at 1d50c6bbbf, where the landed rungs made it false (IntLiteral and FloatLiteral gone, rows closed, the default and the fold)

Report sections that the entry cites: [S18] `compile-ladder/rung-integer-conversions/REPORT.md`, "What changed and why".

## F-339, added

- Size: at the base none; at the landing 1090 characters; now 1090 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-339 **Both paths fold an expression of numerals alone exactly into a numeral before the checker.** The fold phase is in walk's phase order too (`ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java`, INTEGERLITERALFOLDING after PRETYPECHECKDESUGAR). It folds `+`, `-`, `DOT`, `TIMES`, a juxtaposition of numerals, `/` by a nonzero numeral, `^` by an integer numeral up to 4096, prefix `-`, `|_|`, `MIN`, `MAX` and the comparisons exactly, and `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE` and `MINMAX` over integers; it leaves the wrapping, saturating and bitwise operators, the shifts, a division by zero and a possible `-0.0`. A result is an integer numeral, a decimal or prefix minus on one, `n / d`, `p.0 / d` or a boolean, so under walk `2147483647 + 1` is 2147483648 and `0.1 + 0.2` is `0.3`; a test that means fixed-width arithmetic writes typed operands. Tests: `ProjectFortress/tests/NumeralFoldWalk.fss`, `ProjectFortress/compiler_tests/LiteralFoldCompiled.test`, `NumeralFoldJUTest`. Detail: `compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 06:58Z · added · from `explorations/compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S19])

Report sections that the entry cites: [S19] `compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why".

## F-340, added

- Size: at the base none; at the landing 971 characters; now 971 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-340 **On the compiled path a numeral at a typed place of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `RR64` or `RR32` is that type's constant, a float rounded once, and a program's coercion from a numeral runs once per site, in the component class's static initializer.** The coercion desugarer types the numeral at the place's type (`compiler/desugarer/CoercionDesugarer.scala`), and the code generator emits the type's `make` with a float from `roundToDouble` or `roundToFloat` (`compiler/codegen/CodeGen.java`), so `x: RR64 = 0.9999999999999999` is below 1.0; each site's coercion result is a static field `numeral$coercion$N` of the component's class, and a coercion that raises stops the program before `run()`. A program's generic type is not hoisted (row 957). Tests: `compiler_tests/FloatNumeralOneRounding.test`, `NumeralCoercionOnceCompiled.test`, `NumeralCoercionRaisesCompiled.test`. Detail: `compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 06:58Z · added · from `explorations/compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S19])

Report sections that the entry cites: [S19] `compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why".

## F-341, added

- Size: at the base none; at the landing 1233 characters; now 1233 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, called with the numeral object, one result per site and type; a numeral out of the type's range, or at a type with no coercion from it, is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its own type or its default, then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10, `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `1/2 = 0.5` is `true`. Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 07:05Z · added · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S6])

Report sections that the entry cites: [S6] `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

## F-342, added

- Size: at the base none; at the landing 1431 characters; now 1431 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-342 **The compiled checker converts a numeral where nothing fixes a type into its default, refuses one out of range, and refuses a numeral type written other than as a parameter's type.** Where no place's type has a coercion from the numeral's type or is a numeral type (an untyped binding, `Any`, `Object`, `Number`, an unbounded type parameter, a receiver, a join, a result with no declared return type), a numeral becomes a `ZZ32`, or a `ZZ64` or `ZZ` by its value, or an `RR64` with a radix point; a type parameter that numerals alone fix takes the narrowest default holding them all; the conversion into the default ranks as no coercion; a numeral outside a bounded number type's range, or rounding to an infinity, is a static error, also as a tuple's element at a tuple type; a program's type with no coercion from the numeral's type refuses a numeral; `IntLiteral` and `FloatLiteral` are written in a program only as a parameter's type; a `nat` or `int` parameter read as a value is a `ZZ32`. It builds P-173's checker, P-174's written-only rule and P-40's size value; a `typecase`'s selector keeps the numeral's type (row 963). Tests: `compiler_tests/LiteralDefaultCompiled`, `LiteralDefaultResultCompiled`, `XXXLiteralTypeUnwritable.test`, `XXXNumeralBeyondZZ32Range.test`, `XXXNumeralBeyondRangeInTuple.test`, `NatValueZZ32Compiled`. Detail: `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 07:08Z · added · from `explorations/compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why" · by climb batch 29 gather (cites [S20])

Report sections that the entry cites: [S20] `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

## F-343, added

- Size: at the base none; at the landing 1281 characters; now 1281 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-343 **Two string literals of one text are one object on both paths, and a concatenation by `||` of string and character literals is one string literal before the checker.** Walk interns a literal's text and compares two flat strings by the Java strings they carry (`interpreter/evaluator/Evaluator.java`, `forStringLiteralExpr`; `values/FString.java`, `seqv`); the compiled path loads a literal with `ldc` and `equality.sEquiv` compares two `FJavaString`s' carried strings by `==` (`nativeHelpers/equalityRule.java`); the pre-typecheck desugaring that both paths run folds infix `||` of string literals, or of string and character literals with a string among the first two (`compiler/desugarer/PreTypeCheckDesugaringVisitor.java`). So `"ab" SEQV "ab"`, `f() SEQV f()` for `f(): String = "ab"` and `("foo" || "bar") SEQV "foobar"` are `true`, and a string built at run time is a new object, except where Java answers the same string, as a whole slice does. A concatenation of literals is a flat literal, not a rope, so a test that needs a rope or a string built apart joins a literal with a variable. Tests: `tests/StringLiteralIdentityWalk.fss`, `compiler_tests/StringLiteralIdentityCompiled.test`. Detail: `compile-ladder/rung-string-literals/REPORT.md`, sections 1, 4 and 8.

History blocks of the range:

- Written by the gather: 2026-11-09 07:10Z · added · from `explorations/compile-ladder/rung-string-literals/REPORT.md`, "1. What changed and why" · by climb batch 29 gather (cites [S21])

## F-344, added

- Size: at the base none; at the landing 1091 characters; now 1091 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-344 **Under walk, a value of the five native number objects or of the four string objects is read at its trait where walk infers a static argument, and walk's type text prints each of the nine by its trait.** `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` of `FortressBuiltin` read and print as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`; `FlatString`, `CatString`, `EmptyString` and `SubString` as `String`; also inside tuple types; each told by its declaring component (`interpreter/evaluator/types/LanguageTypes.java`), at `EvaluatorBase`'s three reads and in `FTraitOrObject.toString`. So `Cell(3)` is a `Cell[\ZZ32\]`, `Cell("s")` a `Cell[\String\]`, `<|1, 2, 3|>` an `ArrayList[\ZZ32\]`, and messages and `Reflect` print `ZZ32` where they printed `Int`; a float numeral, an `RR64` value (F-341), reads at `RR64`. The types keep their names: a `typecase` arm `Int` still matches `3`, and the ilk still names a string object by its own name, `FlatString`. Test: `tests/LanguageTypeInstancesWalk`. Detail: `compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 07:14Z · added · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S4])

Report sections that the entry cites: [S4] `compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why".

## F-345, added

- Size: at the base none; at the landing 966 characters; now 966 characters, over 600.
- Section now: "The specification and the repository's lineage".

Now:

- F-345 **The specification states the decided numeral design and P-171's string literals in the revision form.** The literals chapter gives `Numeral` comprising `NaturalNumeral` and `RadixPointNumeral`, the four numbers as fields, the conversion where a place fixes a type, the default elsewhere, a program's type through its own coercion once per place, and the numeral types written only as parameter types (`Specification/basic/expressions/literals.tex`); the constant chapter's fold into a signed constant with three defaults (`constant.tex`); the coercion chapter's default beside coercion; the inference chapter's numeral section; and Appendix I's `revival-numerals` and `revival-string-literals` (`Specification/appendices/changes.tex`), whose Effects name each departure with its row. Test: the specification's build (`ant genSource`, `ant tex`), 0 warnings by the skill's grep. Detail: `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 07:23Z · added · from `explorations/compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S22])

Report sections that the entry cites: [S22] `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why".

## F-346, added

- Size: at the base none; at the landing 779 characters; now 779 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-346 **The library's `=/=` over `Any` meets a numeral at its default, against `e =/= e'` being `NOT (e = e')`.** Under walk `u =/= 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32`, and `q =/= 0.5` for `q: QQ = 1/2`, since `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) has no pairs beside the `=` pairs (P-165), while `u = 0` and `q = 0.5` are `true` through those pairs; `basic/operators/opr-overview.tex` ("GCD, LCM, and CHOOSE Operators") makes `e =/= e'` `NOT (e = e')` (row 966). The compiled path until the switch-over answers `false` through the prelude's `=/=` on each integer type. Test: `ProjectFortress/tests/XXXNotEqualNumeral.fss` (an expected failure). Detail: `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-09 07:23Z · added · from `explorations/compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why" · by climb batch 29 gather (cites [S22])

Report sections that the entry cites: [S22] `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/compile-ladder/rung-numeral-types/REPORT.md, "Sentences of the specification made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-types/REPORT.md#Sentences of the specification made false'`

explorations/compile-ladder/rung-numeral-types/REPORT.md:110-116, 2510 bytes, cut at 2500.

~~~~
## Sentences of the specification made false

- `Specification/basic/expressions/literals.tex:149-153`: 'In \library, every numeral without a radix point has the type \TYP{IntLiteral}, which extends \TYP{Number} and none of the number types ...; each of the five integer types ..., \EXP{\mathbb{Q}} and \EXP{\mathbb{R}64} declares a coercion from it.'
- `Specification/basic/expressions/literals.tex:154-165`, the `revival-numeral-type` box: '... a numeral has a type of its own, \TYP{IntLiteral}, ... and \library\ now declare it so. ... The interpreter does not yet: it gives such a numeral the type \EXP{\mathbb{Z}32}, ... and it is to give it the type \TYP{IntLiteral} once it runs with the static types of the compiled type checker.'
- `Specification/basic/conversions-coercions.tex:84-88`: '\Library\ give an integer numeral the type \TYP{IntLiteral}, from which \EXP{\mathbb{R}64} coerces, ... The interpreter does not yet: it gives an integer numeral outside the range of \EXP{\mathbb{Z}32} a wider integer type, and so does not yet convert it.'
- `Specification/appendices/changes.tex:2764`, `:3735-3797` (the entry of the numeral type, its `IntLiteral` and its declarations), `:4416` ('which types it \TYP{IntLiteral}'; the interpreter's numerals 'values of the integer types (row~364)'), and `:4673-4674` ('twenty-one of the interpreter's object \TYP{IntLiteral}, three of its object \TYP{FloatLiteral} and twenty-eight of the component \TYP{Reflect}'): by grep, 28 glue strings remain, `Reflect`'s.
- In the record: F-57, F-74 (walk's numeral by its value stays where nothing fixes a type; its `Box[\Int\]` is G's), F-79, F-118, F-299 (the counts: 52 glue bindings and 372 helpers become 28 and 374), F-328; the `fortress-repo` skill's `revival-changes.md`, "Numbers" ('The checker types an integer numeral as `IntLiteral`', 'A numeral with a radix point is a `FloatLiteral`') and "Traits and objects" ('Walk departs from both answers (rows 943, 945)'), `interpreter.md`, "How walk evaluates a program" (rows 943, 944 and 578), `tests-writing.md` ('Under walk, a numeral does not bind to `NN32` or `NN64`, ... (ledger row 454)'), and `library.md` ('as for `IntLiteral`'s bindings'); also `revival-changes.md`, "Traits and objects" ('To the checker a numeral is an `IntLiteral`, which is no `Index`'; the name is `NaturalNumeral` under the one library) and "Numbers" ('Each of the eight number types, and `IntLiteral`, declares its own `asFloat` into `RR64`'), these two added by the rung'
~~~~

## [S2] explorations/compile-ladder/climb-batch-28/RECORD.md, "The count of the bindings"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-28/RECORD.md#The count of the bindings'`

explorations/compile-ladder/climb-batch-28/RECORD.md:56-58, 1782 bytes.

~~~~
## The count of the bindings

A count of the `builtinPrimitive` strings of the one library's `.fss` files (`Library/` and `ProjectFortress/LibraryBuiltin/`, the `Compiler` files and `AnyType` left out) gives 444 strings, 341 naming a helper, at the base, one more than F-299's 443 live bindings: the glue string of `throwError` (`Library/FortressLibrary.fss:4818`), which F-299's 102 do not hold. Each rung's commit on `main` moves the count by its branch's own deltas: V −5 bindings, +6 helpers, −11 glue; R −15, +10, −25; A 0, +7, −7; H 0, +6, −6; S +1, +2, −1; K and T none. On the merged tree it gives 425 strings, 372 naming a helper, so by F-299's count **372 of the one library's 424 live bindings name a helper and 52 a glue class**: `IntLiteral`'s 21 and `FloatLiteral`'s 3 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`) and `Reflect`'s 28 (`Library/Reflect.fss`). The batch record planned 422 and 370 with fork V1's three helper getters; rung V bound five, two of them on new helpers (V.worker.2). The gather revised Appendix I's natives effect to these numbers in rung S's commit, the last that moves a binding (`Specification/appendices/changes.tex:4627-4674`), each clause read against its binding: ZZ32's `big` (`Library/FortressLibrary.fss:860-861`), ZZ64's two getters (`:877-881`), NN64's `asNN32` (`:991-992`), ZZ's two (`:1097-1101`), the reader trait (`:1994-2014`), the two stores (`:2438-2453`), `Thread` and `abort` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:790-803`), `printTaskTrace` (`Library/FortressLibrary.fss:4689`), `args`' two (`Library/System.fss:32-33`), and the fifteen names the interpreter answers itself (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:47-65` and its rule for `arrayOps`).
~~~~

## [S3] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

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

## [S4] explorations/compile-ladder/rung-walk-language-types/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-language-types/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-walk-language-types/REPORT.md:10-20, 3718 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-walk-language-types`, cut from b430f9f42 (the worktree seeded by `seed-worktree.sh` from `/home/user/fortress-base29`, exit 0, 3 s): `57bddc15c` the tests first, `bfdc5b74c` the fix, `1a48fc6cc` two `XXX` tests of what remains of rows 717 and 824.

- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/LanguageTypes.java:1-97`, new. A table of the nine objects, each with the trait it stands for and the component that declares it (`:30-41`): `Int`, `Long`, `BigNum`, `Float`, `UnsignedLong` of `FortressBuiltin` at `ZZ32`, `ZZ64`, `ZZ`, `RR64`, `NN64`; `FlatString` of `FlatString` and `CatString`, `EmptyString`, `SubString` of `String` at `String`. `traitName(FType)` (`:45-50`) answers the trait's name for an `FTypeObject` that is no generic instance, whose name is in the table and whose declaring component (`declaringComponent`, `:86-96`, the lines of `StaticNativeApp.declaringComponent`) is the table's; so a program's own `Int` or `FlatString` keeps its name. `numberTraitName` (`:53-56`) answers it for the five number objects only. `traitOf(FType)` (`:62-80`) maps a tuple type element by element through `FTypeTuple.make`, and returns for one of the nine the `FTypeTrait` of the trait's name among its transitive supertypes, else the type itself. `FloatLiteral` is not in the table (fork G2).
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`: the three reads of a value's type, each now `LanguageTypes.traitOf(...)`: `inferWithCoercion`'s first pass, `FType at = LanguageTypes.traitOf(a.type());` (`:602`), whose `at` the varargs unification (`:606-611`) and the unification of a parameter type that mentions a static parameter (`:634-637`) read; `narrowest`'s candidates (`:783-785`); `inferByUnification`'s first pass (`:937`). Nothing else in the file changed; N's head of `inferAndInstantiateGenericFunction` (`:72-94`) is untouched.
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:189-192`: a trait or object that is no generic instance prints `LanguageTypes.traitName(this)` where it has one, else its name. A generic instance prints its static arguments through their own text, a tuple type its elements', an arrow its domain's and range's, so the nine print by their traits everywhere walk makes a type's text: in every message that prints an `FType` or an object value (`FObject.getString`, `interpreter/evaluator/values/FObject.java:33-35`, a
~~~~

## [S5] explorations/compile-ladder/rung-numeral-checker/REPORT.md, "11. Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-checker/REPORT.md#11. Sentences made false'`

explorations/compile-ladder/rung-numeral-checker/REPORT.md:152-161, 2123 bytes.

~~~~
## 11. Sentences made false

- F-57 (`explorations/coordinator/FACTS.md:54`): "The checker types a numeral `IntLiteral` or `FloatLiteral` by its form, as the builtin library in scope declares those types" holds while it types it, but it now converts where nothing fixes a type; "Neither path refuses an out-of-range numeral statically: the compiled run raises `Not in range for ZZ32` at run time" is false on the compiled path.
- F-73 (`FACTS.md:70`): "takes the narrowest type that every one of its arguments converts into" — a parameter that numerals alone fix takes their default; "The coercion attempt refuses a call beyond 64 combinations" holds, but no longer for numerals.
- F-79 (`FACTS.md:76`): "`IntLiteral`, the type that the compiled checker gives an integer numeral" holds only until the default; its own sentences on walk are N's.
- `Specification/basic/inference.tex:183-187`: "\EXP{b\COLON\mathbb{Z}64 = \VAR{id}(3)} instantiates \VAR{id} at the numeral's own type" — it instantiates `id` at `ZZ32`, the default, and coerces the result.
- `Specification/basic/inference.tex:299-317`: the tie rule holds, but "The rule settles only a tie that a numeral makes" and the instantiation "of a type parameter that only numerals fix" at `ZZ32` only at a tie are narrower than the default now built, which also reads a float numeral `RR64`.
- `Specification/basic/expressions/literals.tex:160`: "The compiled type checker gives every numeral without a radix point that type." holds while it types it; the default and the range refusal are not in the text.
- The `fortress-repo` skill: `SKILL.md:132`, "sizes (`nat` is an `NN32` value, `int` a `ZZ32`)": a `nat` used as a value is a `ZZ32`; `references/revival-changes.md:48`, "To the checker a numeral is an `IntLiteral`, which is no `Index`. So it refuses `f(3)` for `f(x: Index)`.": it passes, by the default; `references/revival-changes.md:89`, "The checker types an integer numeral as `IntLiteral`": where nothing fixes a type it converts it into its default.
- `Specification/appendices/changes.tex`: no entry names this rung's rules yet (T writes P-173's).
~~~~

## [S6] explorations/compile-ladder/rung-numeral-types/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-types/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-numeral-types/REPORT.md:11-39, 7574 bytes, cut at 2500.

~~~~
## What changed and why

**The library.** `Library/FortressLibrary.fsi:454-494` and `.fss:668-721` declare, beside `Ratio`, `trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }` with the four getters abstract (`digits`, `fractionDigits` and `radix` at `ZZ32`, `digitValue` at `ZZ`), and the value objects `NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ)`, whose `fractionDigits` is 0, and `RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ)`. Each has `asString`, the numeral as the Working Draft writes one (its digits in its radix, at least `digits` of them, upper case, the radix point after `digits - fractionDigits` of them, `_r` where the radix is not ten), `asFloat(self): RR64` by one rounding, and its reversed `=` pairs: `NaturalNumeral` at the eight number types, `RadixPointNumeral` at `RR64`, `QQ` and `RR32`, each `do c: T = self; (c = b) end` as the library writes its pairs (`.fss:418` at the base). The number types' coercions, renamed or new, each with its pair:

| type | coercions from the numeral types, and their bodies | pair |
|---|---|---|
| `RR64` | `coerce(x: NaturalNumeral) = asFloat(x)`, `coerce(x: RadixPointNumeral) = asFloat(x)` (`.fss:389-390`) | both (`.fss:419-420`) |
| `QQ` | `Ratio(x.digitValue, 1)`; `x.digitValue / r^(x.fractionDigits)` for `r: ZZ = big(x.radix)`, reduced by `ZZ`'s `/` (`.fss:565-569`) | both (`.fss:588-589`) |
| `AnyIntegral` | `ZZ32`, `ZZ64` or `ZZ` by the value, which is never negative (`.fss:723-728`) | none, as at the base |
| `ZZ32`, `ZZ64`, `NN64`, `ZZ` | `x.digitValue.asZZ32`, `.asZZ64`, `.asNN64`, `x.digitValue` (`.fss:829`, `:935`, `:1045`, `:1155`) | `NaturalNumeral` (`:845`, `:956`, `:1064`, `:1175`) |
| `NN32` | `x.digitValue.asNN32` (`FortressBuiltin.fss:430`) | `NaturalNumeral` (`:453`) |
| `RR32` | `numeralRR32(x.digitValue, x.radix, 0)` and `numeralRR32(x.digitValue, x.radix, x.fractionDigits)` (`FortressBuiltin.fss:214-215`) | both, new (`:258-259`) |

`RR64` comprises `{ Float }` (`.fsi:294`); `Float`'s `asFloat(self): RR64` (`FortressBuiltin.fss:82`); the `^` over the numeral in `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32` renamed, its body `self^(b.digitValue.asZZ32)`; `pi` and `e` at `RR64` (`Library/Constants.fsi:16-17`, `.fss:15-16`); `ReflectiveQuickCheck.fss:40` chooses `theType[\ZZ32\]()` where it chose `IntLiteral`, and the arm `theType[\IntLiteral\]() => Just[\AnyGen\](genZZ32)` (`:157` at the base), which repeated the `ZZ32` arm
~~~~

## [S7] explorations/compile-ladder/rung-literal-fold/REPORT.md, "Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-literal-fold/REPORT.md#Sentences made false'`

explorations/compile-ladder/rung-literal-fold/REPORT.md:234-242, 2709 bytes, cut at 2500.

~~~~
## Sentences made false

- F-262: "the compiled path folds `prefix -` on a numeral into a numeral of that type before the checker, and does not fold `^` (`IntegerLiteralFoldingVisitor.java:58-107`, `:152-153`). Walk's numeral is an `Int` (F-74)." Both paths now fold, `^` by an integer exponent folds, and walk evaluates a negative numeral node (`-2147483648` a `ZZ32`). Its title still holds: `10^(-16)` is left as written, an integer base at a negative exponent.
- F-118: "The code generator carries a numeral as an `int`, a `long` or its decimal string, by its exact bit length." A numeral that the coercion desugarer types at a library number type is now that type's constant (`FZZ32.make(int)`, …, `FRR64.make(double)` rounded once); a numeral of its own type is still carried so.
- `Specification/basic/expressions/constant.tex:81-82`: "The only operation on literals that produces a new literal (as opposed to a constant) is concatenation". The fold writes the result of any folded operation as a numeral (fork F1), which a program's coercion receives as a written numeral; the two concatenations it states hold.
- `Specification/basic/expressions/constant.tex:49-58`, the type of a constant expression encoding its value (`IntegerConstant[\false, 3+5\]`): false before this change on both paths and after it; no constant trait is built.
- `Specification/basic/expressions/literals.tex:187-190`, "the compiler performs the rational arithmetic exactly and then converts the result to a floating-point value, thus incurring at most one floating-point rounding error": made true for an expression of numerals alone on both paths, but for row 956's cases, where it stays false; the team's note beside it (`:193-196`) is unchanged.
- The skill (the skeptic's addition): `.claude/skills/fortress-repo/SKILL.md:77`, "`fortress compile` runs the same phases with the static type checker, in Scala, switched on. Before the checker, it folds integer literals.", with the phase list above it (`:65-73`), which leaves the fold to the compiled path: walk now runs it too, and it folds radix-point numerals as well; `.claude/skills/fortress-repo/references/interpreter.md:25`, "Until walk runs the checker (P-12), walk computes arithmetic on numerals, as `3 + 4`, at `ZZ32`": an expression of numerals alone is now folded before walk, so `3 + 4` is the numeral `7` and `2147483647 + 1` the numeral `2147483648`.
- No Appendix I Effect names the fold, its operators or the code generator's float constant (
~~~~

## [S8] explorations/compile-ladder/repair-r2-literal-wrap/REPORT.md, "The failure-mode question"

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

## [S9] explorations/compile-ladder/rung-default-rendering/REPORT.md, "Defects and their homes"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-default-rendering/REPORT.md#Defects and their homes'`

explorations/compile-ladder/rung-default-rendering/REPORT.md:121-140, 12885 bytes, cut at 2500.

~~~~
## Defects and their homes

1. **Row 321, the rendering cycle** — home 1, repaired. Its assertions are the 18 `assert` lines of `ProjectFortress/compiler_tests/DefaultRenderRungS.fss:21-48`, each message carrying "ledger row 321" (the last also `FException.java:22-23`). They cover the entry points the row names that a test can reach: `println` (`:18-20`, checked by `run_out_contains=PASS` reaching `:49`), concatenation (`:33`), the prelude singletons `Nothing` and `None` (`:34-35`), and a `throw` of an object with no `asString` reaching its handler (`:42-48`). The transactional entry is gated already by `compiler_tests/AtomicTopLevelObjectVar`, which passes on the repaired tree (`probes/gated-spot-postrepair.txt:3-10`).
2. **The void, tuple and arrow spellings** — home 1: in the native and asserted at `DefaultRenderRungS.fss:27-32`.
3. **`RR32` and `StringVector` values rendered as their type name** (the skeptic's, introduced by the rung's first native) — home 1, repaired in this round: `DefaultRenderRungS.fss:36-41`, failing before the repair (`probes/test-prerepair.txt:11`), passing after (`probes/test-postedit.txt:10-15`), biting under mutation (`probes/mutation-owntostring.txt:17`). `objects.tex:117-122` settles it.
4. **`asDebugString` diverges between the paths** — home 3, ledger row 363 (provisional 354). Walk prints `a Box: Box` (article + `ilkName` + `": "` + `asString`, `FortressBuiltin.fss:42-47`), the compiled path `Box` (`CompilerBuiltin.fss:353` is `self.asString`). The specification's prose never names `asDebugString`, `asExprString` or `ilkName` (`grep -rn 'asExprString\|asDebugString\|ilkName' Specification/basic Specification/basic-lib` prints nothing, rc=1, re-run in this round), so this is the home for a silent specification, not a choice of convenience; the batch record keeps the repair out of this rung because `not_working_library_tests/Comparison1.fss:33-36` asserts `U.asDebugString = "Unordered"`. Probe: `probes/judgement-probes-both-paths.txt`. The gated test asserts nothing about `asDebugString`.
5. **`asExprString` diverges between the paths** (the skeptic's) — home 3, an addition to row 363, for the same reason: the prose is silent (the grep above). Walk prints `no expression for Circ` (`FortressBuiltin.fss:48-49`); the compiled path prints `[no expression for  Circ ]`, brackets from `CompilerBuiltin.fss:352` and the doubled spaces from row 76. It overflowed the stack before the rung, so a loud failure became a quiet d
~~~~

## [S10] explorations/compile-ladder/rung-string-literals/REPORT.md, "12. Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-string-literals/REPORT.md#12. Sentences made false'`

explorations/compile-ladder/rung-string-literals/REPORT.md:188-198, 2072 bytes.

~~~~
## 12. Sentences made false

The specification: none (section 6). The `fortress-repo` skill, for the skill writer:

- `.claude/skills/fortress-repo/references/interpreter.md:22`: "Each evaluation of a string literal makes a new string object, so `"ab" SEQV "ab"` is `false` (ledger row 945)."
- `.claude/skills/fortress-repo/references/compiler.md:106`: "Each evaluation of a string literal makes a new string object, so `"ab" SEQV "ab"` is `false` (ledger row 945). A test of it asserts `true`, as an `XXX` test."
- `.claude/skills/fortress-repo/references/revival-changes.md:62`: "Walk departs from both answers (rows 943, 945), and the compiled path from the string answer (row 945); `interpreter.md` and `compiler.md` give the departures." Row 945 goes; row 943 stays rung N's. The same paragraph cites the fold as "the Working Draft, `constant.tex:75-79`", which is right: the passage is at `Specification-1.0-frozen/basic/expressions/constant.tex:75-79` in the Working Draft, and at `Specification/basic/expressions/constant.tex:81-85` in the revised text.
- `.claude/skills/fortress-repo/references/interpreter.md:126`: "`||` builds a `CatString` when the joined string is longer than `maxLeafSize`, 32 characters by default." A concatenation of literals is now one flat literal at any length, so the sentence holds only where an operand is built at run time.
- FACTS: no entry names row 945 or a new string at each evaluation; F-326's "reference objects and strings only with themselves" stays true. F-249's example, "So `"s" || "t"` is a `FlatString` of depth 0", is now folded before walk reaches the top-level `||`, so it no longer shows the dispatch the entry states; its gate, `tests/StringConcatenationFamiliesWalk.fss`, joins a literal with a variable at those lines since the skeptic's fix (SKEPTIC.md).

Facts the skill may want: a concatenation of literals is now one flat literal, not a rope, so a test that needs a rope or a string built apart joins a literal with a variable (section 8); a compiled `'a' || "bc"` compiles, `c || s` does not (row 965).
~~~~

## [S11] .claude/skills/fortress-repo/references/interpreter.md, "Natives"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/interpreter.md#Natives'`

.claude/skills/fortress-repo/references/interpreter.md:95-135, 5701 bytes, cut at 2500.

~~~~
## Natives

The library binds each of walk's natives by a declaration whose body is `builtinPrimitive("…")`. The string names one of these:

- A glue class, as `com.sun.fortress.interpreter.glue.prim.X`, in `interpreter/glue/prim/`. A glue class takes walk's `FValue` objects, so the compiled path cannot use it.
- A helper: a public static method of a class under `nativeHelpers/`, as `com.sun.fortress.nativeHelpers.simpleIntArith.<method>`. `interpreter/glue/StaticNativeApp.java` calls it by reflection, with a method's `self` first. The compiled path calls it too (`compiler.md`, "Natives"). Most bindings name a helper. The others name a glue class. F-299 counts both kinds (`records.md`, "Reading the record").

Walk carries each declared type of a helper's binding in one Java type:

- `ZZ32`, `NN32` and `Char` in `int`; `ZZ64` and `NN64` in `long`; `RR64` and `Float`, the library's object that extends `RR64`, in `double`; `RR32` in `float`; `Boolean` in `boolean`;
- `FlatString` and `JavaString` in `String`, and `String` too, except as a parameter other than `self`; `ZZ` in `BigInteger`; `()` in `void`; `JavaBufferedWriter` and `JavaBufferedReader`, the library's writer and reader traits, in `compiler/runtimeValues/FortressBufferedWriter` and `FortressBufferedReader`, which the checker reads back as the two traits.

In a method, walk carries `self` by the type that declares the method:

- a type of the list above, except `JavaString` and `()`, in the same Java type, but `FlatString` only where it is the library's own;
- the library's objects that extend number types, not the glue classes of the same names: `Int` (`ZZ32`) in `int`, `Long` (`ZZ64`) and `UnsignedLong` (`NN64`) in `long`, and `BigNum` (`ZZ`) in `BigInteger`.

A program can give its own type the name `FlatString` or `JavaString`. Walk tells the library's `FlatString` by the component that declares it, so a program's own type of either name carries no `self`. But walk carries a parameter declared at such a type in `String`, by the type's name alone, and does not refuse the binding. The native then receives the name of the type, not the value's text (ledger row 877). Give a program's own type another name.

Walk refuses a helper's binding at load in these cases. The message names the string, and contains the words below, which a `load_exception_contains` key can match:

- The class or the method does not exist: 'not found' or 'names no static method of'.
- The result type, or a parameter type oth
~~~~

## [S12] explorations/compile-ladder/rung-natives-walk/REPORT.md, "What changed and why"

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

## [S13] explorations/compile-ladder/rung-natives-self/REPORT.md, "What changed and why"

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

## [S14] explorations/compile-ladder/rung-string-natives/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-string-natives/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-string-natives/REPORT.md:9-47, 6053 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-string-natives`: `15d81c1c1` (the tests, before the change), `19e9dbda5` (the change), `8b6fca9b5` (the line separator onto `stringOps`).

- **Walk's loader.** `NativeApp.java:201` passes `StaticNativeApp.find` the declaring type, not its name. `find(String, Applicable, FType)` (`StaticNativeApp.java:163`) reads `self`'s carrier through the new `javaForSelf(FType)` (`:122`): the object `FlatString` that the component `FlatString` declares at its top level, told by `declaringComponent` (`:136`) from the top level of the type's environment, carries `self` in a Java `String`; every other type is read by its name by `javaForSelf(String)` (`:103`), unchanged, so a program's own type named `FlatString` or `JavaString` still carries none. This is the probe's Java, hunk for hunk; the comment of `javaForSelf(String)` is reworded to say what the code does.
- **The last step, taken.** The new `javaForParameter` (`StaticNativeApp.java:70`) carries a parameter's declared type as `javaFor` does, except `String`: the loader refuses a helper parameter declared `String` at load, 'no Java type carries the declared type of parameter a.' (`:178-180`). A parameter declared `FlatString` or `JavaString`, and a result declared `String`, are still carried in a Java `String`.
- **`FlatString`'s methods**, 11 of 13 (`Library/FlatString.fss:35-101`), name helpers; `=` and `flatConcat(self, b:Char)` stay on `FlatString$Eq` and `FlatString$Concat` (item 331). `natLineSeparator` (`:25-26`) and `match` (`Library/FortressLibrary.fss:4615`) name helpers.
- **The five over `String` as pairs.** `printThreadInfo`, `printWithThread`, `printlnWithThread` (`Library/FortressLibrary.fss:4628-4644`, api `Library/FortressLibrary.fsi:2633-2639`) and `getEnvironment`, `getProperty` (`Library/System.fss:41-56`, api `Library/System.fsi:34-41`, with `import FlatString.{FlatString}` at `System.fss:14` and `System.fsi:14`) are each a public native over `FlatString` whose body is exactly `builtinPrimitive("...")`, beside an overload over `String` that flattens in the library's `typecase` and stops with `fail` in its `String` arm. `printThreadInfo(a:Number)` stays on `StringPrim$PrintThreadInfo`.
- **Helpers.** New, public and static, no state: in `stringOps.java` `asExprString` (`:44`, quoting through `Unprinter.enQuote` as `FString.toString` does, `interpreter/evaluator/values/FString.java:31-33`), `compareToIgnoreCase` (`:48`), `javaSubstr` (`:53`, Java's `sub
~~~~

## [S15] Specification/basic/expressions/literals.tex, "Literals"

`facts-extract.sh 'doc:Specification/basic/expressions/literals.tex#Literals'`

Specification/basic/expressions/literals.tex:12-336, 18243 bytes, cut at 2500.

~~~~
\section{Literals}
\seclabel{literals}

\note{We need to check whether the various types and values defined in this section are still correct.}

\begin{Grammar}
\emph{LiteralExpr} &::=& \texttt{(} \texttt{)}\\
&$|$& \emph{NumericLiteralExpr}\\
&$|$& \emph{CharLiteralExpr}\\
&$|$& \emph{StringLiteralExpr}\\
\end{Grammar}

Fortress provides boolean literals, \TYP{()} literal, character literals,
string literals, and numeric literals.  Literals are values; they do not
require evaluation.

\note{From here, copied from F1.0$\beta$.}

The literal \VAR{false} has type
\EXP{\TYP{BooleanLiteral}\llbracket\VAR{false}\rrbracket}.
The literal \VAR{true} has type
\EXP{\TYP{BooleanLiteral}\llbracket\VAR{true}\rrbracket}.
\note{And these are the only values of those types.}

The literal \EXP{()} is the only value with type \TYP{()}.
Whether any given occurrence of \TYP{()} refers to the value \EXP{()} or
to the type \TYP{()} is determined by context.

A character literal has type \TYP{Character}.
Each character literal consists of an abstract character in
\unicode~\cite{Unicode},
enclosed in single quotation marks (for example, `\txt{a}', `\txt{A}',
`\txt{\$}', `\txt{$\alpha$}', `\txt{$\oplus$}').
\marginnote{This is not true: Character literals include ``\b'' and
``LATIN CAPITAL A'', which do not ``consist of'' an abstract character enclosed in
single quotation marks.  I think it's better to remove most of this discussion and
direct the reader to the relevant section of Lexical Structure.
This section should be about {\bf semantics} of literals:
their values and types.}
The single quotes may be either true typographical ``curly'' single quotation marks
or a pair of ordinary apostrophe characters (for example, \txt{'a'}, \txt{'A'}, \txt{'\$'}, \txt{'$\alpha$'}, \txt{'$\oplus$'}).
See \secref{preprocessing-character-literals} for a description of how names of
characters may be used rather than actual characters within character literals,
for example `\txt{APOSTROPHE}' and `\txt{GREEK\_CAPITAL\_LETTER\_GAMMA}'.

A string literal has type \TYP{String}.
Each string literal is a sequence of \unicode\ characters enclosed in double
quotation marks (for example,
``\txt{Hello, world!}'' or ``\txt{$\pi\thinspace r^2$}'').
\marginnote{Again, I think this paragraph should mostly be eliminated and replaced with a pointer to the relevant section of Lexical Structure.

Here's a sentence I wrote as a replacement:
``A string literal (i.e., a sequence of characters enclosed in double quot
~~~~

## [S16] explorations/compile-ladder/rung-natives-float/REPORT.md, "Defects, each with its home"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float/REPORT.md#Defects, each with its home'`

explorations/compile-ladder/rung-natives-float/REPORT.md:111-115, 2053 bytes.

~~~~
## Defects, each with its home

- **Row 862**: on the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings: `CodeGen.forFloatLiteralExpr` emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` into `FFloatLiteral.make(double)` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1994-2004`), where `make(String)`, whose `Double.valueOf` rounds once (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FFloatLiteral.java:44-46`), has no caller. Home 2: `ProjectFortress/compiler_tests/XXXFloatNumeralOneRounding.fss` with `FloatNumeralOneRoundingLink.test` and `XXXFloatNumeralOneRounding.test`, `x: RR64 = 0.9999999999999999` then `assert(x < 1.0, …)`. Shown through `junit.sh` as it is ('REACHED', 'FAIL:  0.9999999999999999 rounds to the double below 1.0', 'Saw expected failure (Exit code != 0)', 'OK (2 tests)') and red with the numeral `0.99999999999999` for one run, then restored ('PASS', 'Did not see expected failure', 'Tests run: 2,  Failures: 1'). Under walk the program passes: walk keeps a radix-ten numeral's text (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java:26-41`); by reading, walk sums the same way for another radix (`:30`). Paths: compiled.
- **Row 863**: the specification's sentence on a floating-point division by zero, "a NaN value according to the rules of IEEE 754" (`Specification/basic/operators/opr-overview.tex:167-168`), against IEEE 754's infinity for a nonzero dividend, which both paths give (walk: `ValFloat`, '2.5/0.0' 'Infinity', '2.5/-0.0' '-Infinity' on both codes; compiled: the guard's first draft, `dDiv(1.0, 0.0)` 'Infinity' and `dDiv(1.0, -0.0)` the negative infinity, passing on the base) and the team's `Constants` and `realArith` rely on. Home 3: `CONTESTED` row, reproducer `ProjectFortress/tests/realArith.fss`. Paths: both.
- Walk's loader refusing a declared `Float` (`StaticNativeApp.java:47-58` at b0f6cd6b7): home 1, repaired, `NativeHelperFloatCarriedWalk`.
~~~~

## [S17] explorations/compile-ladder/rung-any-carrier/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-any-carrier/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-any-carrier/REPORT.md:11-33, 3084 bytes, cut at 2500.

~~~~
## What changed and why

Commit `f5be3b7e7` on `wip/rung-any-carrier` (cut from ed8652dc0; the worktree seeded by `seed-worktree.sh` in 3 s, exit 0).

- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:38-40`: `getter ilkName(): String = builtinPrimitive("com.sun.fortress.nativeHelpers.stringOps.typeName")`; `getter asString(): String = self.ilkName`, with no native. The api (`FortressBuiltin.fsi:33-34`) is unchanged.
- `Library/FortressLibrary.fss:4655-4656`: `opr SEQV(a:Any, b:Any):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.equality.sEquiv")`; its api line is unchanged.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:41-53`: the table `OWN_OPERATIONS`, as written:

      static final java.util.Map<String, String> OWN_OPERATIONS = new java.util.HashMap<String, String>();
      static {
          OWN_OPERATIONS.put("com.sun.fortress.nativeHelpers.stringOps.typeName",
                             "com.sun.fortress.interpreter.glue.prim.ObjectPrims$ClassName");
          OWN_OPERATIONS.put("com.sun.fortress.nativeHelpers.equality.sEquiv",
                             "com.sun.fortress.interpreter.glue.prim.AnyPrim$SEquiv");
      }

  read at `:209-210`, right after the string is read and before the cache and `StaticNativeApp.isHelperString`: `String own = OWN_OPERATIONS.get(str); if (own != null) str = own;`. The glue classes stay, as walk's operations.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java:46-105`: `ClassName` answers `ilk(o.type())`. `traitOf` names `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64` when the type is an `FTypeObject`, no generic instance, whose environment's top level is the component `FortressBuiltin`; `ilk` renders a generic instance's static arguments, a tuple's elements and an arrow's domain and range by the same rule, with `FType.toString`'s delimiters (`[\`, `,`, `\]`, `(`, `)`, `->`), and every other type by `toString`. `ToString` stays, now bound by nothing in the library.
- `Library/FortressLibrary.fss:4616-4620`, `.fsi:2577`: `match(regex:String, some:String):Boolean = typecase (regex.asFlatString, some.asFlatString) of (r:FlatString, f:FlatString) ⇒ match(r, f); (r:String, f:String) ⇒ fail[\Boolean\]("match: asFlatString answered a string that is not flat") end`.
- The 48 lines of `ProjectFortress/tests/ArrayElementAlgebra.fss` and `ProjectFortress/tests/FlatTowerRungF.fss` (below).
- New tests: `Pr
~~~~

## [S18] explorations/compile-ladder/rung-integer-conversions/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-integer-conversions/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-integer-conversions/REPORT.md:14-73, 6542 bytes, cut at 2500.

~~~~
## What changed and why

P-161, option 6, whole, and P-169's eight numeral bindings.

**The 25 getters**, each declared in the api at the component's header, each a getter before the type's methods:

| type | asZZ32 | asZZ64 | asNN32 | asNN64 | asZZ |
|---|---|---|---|---|---|
| ZZ32 (`FortressLibrary.fss:771-775`, `.fsi:568-572`) | `= self` | `widen(self)` | Fortress, raises below 0 | Fortress, raises below 0 | `big(self)` |
| ZZ64 (`.fss:877-883`, `.fsi:644-648`) | helper `simpleIntArith.longOverflowingToInt` | `= self` | helper `simpleUnsignedIntArith.longOverflowingToUnsignedInt` | Fortress, raises below 0 | `big(self)` |
| NN32 (`FortressBuiltin.fss:430-437`, `.fsi:135-139`) | Fortress, raises at 2^31 and up | `signed(widen(self))` | `= self` | `widen(self)` | `big(self)` |
| NN64 (`.fss:983-994`, `.fsi:500-504`) | Fortress, raises at 2^31 and up | Fortress, raises at 2^63 and up | helper `simpleUnsignedIntArith.longOverflowingToUnsignedInt` | `= self` | `big(self)` |
| ZZ (`.fss:1096-1102`, `.fsi:719-723`) | `self.asZZ64.asZZ32` | helper `simpleArbitraryPrecisionArith.bigOverflowingToLong` (new) | `self.asNN64.asNN32` | helper `simpleArbitraryPrecisionArith.bigOverflowingToUnsignedLong` (new) | `= self` |

So 5 identities, 7 equal to the coercions (each the coercion's own one-call body), and 13 that can raise: 6 Fortress bodies, a sign or range test and `throw IntegerOverflow` around the low-bits form, as QQ's `truncate` throws `DivisionByZero`; 3 on the existing checked helpers of fork V1; 2 on new helpers; 2 compositions over them. The Java signatures: `public static int longOverflowingToInt(long l)` (`simpleIntArith.java:106`), `public static int longOverflowingToUnsignedInt(long l)` (`simpleUnsignedIntArith.java:87`), and the new `public static long bigOverflowingToLong(BigInteger a)` and `public static long bigOverflowingToUnsignedLong(BigInteger a)` (`simpleArbitraryPrecisionArith.java:148`, `:154`), which raise `fortress.CompilerBuiltin$IntegerOverflow` as the other helpers do. Walk carries ZZ in BigInteger, ZZ64 and NN64 in long, NN32 in int; the compiled rewrite passes an NN32 or NN64 result through its transfer helper.

**The four bitsAs getters**: bitsAsNN32 of ZZ32 and bitsAsNN64 of ZZ64 are `unsigned(self)`, bitsAsZZ32 of NN32 and bitsAsZZ64 of NN64 `signed(self)` (`FortressLibrary.fss:776`, `:884`, `:995`; `FortressBuiltin.fss:438`).

**The low-bits names, newly declared** (fork V5, option 1's nine): narrow and unsigned of NN32 `= self`
~~~~

## [S19] explorations/compile-ladder/rung-literal-fold/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-literal-fold/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-literal-fold/REPORT.md:14-80, 11358 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-literal-fold`: `8e4ca7b070` (the fold, the phase order, the typed constants, the once-per-site call, the harness key, the tests), `f58c027526` (five tests respelled with typed operands), `1bf56ffa92` (`XXXNumeralFoldNoPrefixMinusWalk`). The code is `8e4ca7b070`'s; the two later commits change tests only.

**The phase order** (`PhaseOrder.java:125-136`). Walk's order was PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, TYPECHECK (switched off under walk), DESUGAR, OVERLOADREWRITE_FOR_INTERPRETER. It now has INTEGERLITERALFOLDING after PRETYPECHECKDESUGAR, as the compiler's order has had it: PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, INTEGERLITERALFOLDING, TYPECHECK, DESUGAR, OVERLOADREWRITE, CODEGEN (unchanged). The count and distance stages run the compiler's order up to TYPECHECK (`explorations/coordinator/tools/checker-count/run.sh`, header), so they read the folded library.

**The fold** (`IntegerLiteralFoldingVisitor.java`, rewritten). An expression of numerals alone, or of the forms the fold writes, folds exactly into a `Constant` (numerator, positive denominator in lowest terms, and a kind: integer, quotient, radix point). The kind sets the default P-173 gives: a radix point among the operands makes the result a radix-point constant, else a `/` makes it a quotient, else it is an integer.

The operators folded, each over integer and radix-point operands unless said, by canonical name through `PrecedenceMap.canon` (`:80-87`):
- `+`, `-`; multiplication `DOT`, `TIMES` (canonical `BY`, as `×`), and a juxtaposition of numerals alone (`:416-434`): exact rational arithmetic.
- `/` by a nonzero numeral: a quotient, or a radix-point constant where an operand has a radix point.
- `^` by an integer numeral of magnitude at most 4096; an integer base takes no negative exponent (P-153: such a power raises at run time); a radix-point or quotient base takes one, so `10.0^(-5)` is `0.00001`.
- prefix `-` and `|_|`.
- `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `MINMAX`: integers only, with the answers of `simpleIntArith` and `simpleArbitraryPrecisionArith` (`DIV` truncates, `REM` has the dividend's sign, `MOD` the divisor's, `GCD` is nonnegative, `LCM` of a zero is 0); `CHOOSE` folds where 0 ≤ k ≤ n and gives 0 otherwise, as walk's `ZZ32` answers (`ProjectFortress/tests/ChooseZZ32Walk.fss:36-37` at b430f9f428).
- `MIN`, `MAX` and the comparisons `<`, `<=`, `>`, `>=`, `=`, 
~~~~

## [S20] explorations/compile-ladder/rung-numeral-checker/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-checker/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-numeral-checker/REPORT.md:13-41, 7706 bytes, cut at 2500.

~~~~
## 1. What changed and why

The commits: `7bd7c7dfc7` (the change and its tests), `fe5d146a86` (the `XXX` test of the one fork not built, row 961), `fa13e6383c` (three revival tests the suite showed broken, respelled). The code of `7bd7c7dfc7` is the final code; the later commits change tests only.

**The default (P-173, fork C1).** A numeral, an `IntLiteralExpr` or `FloatLiteralExpr` node as written or as the fold made it, where nothing fixes a type converts into its default: `ZZ32`, or `ZZ64` or `ZZ` by its value, `RR64` with a radix point. The default applies to a numeral node, never to an expression of a numeral type, so `t = x` inside `coerce(x: IntLiteral)` stays an `IntLiteral`. The sites:

- an untyped binding, top level and local, one variable or several (`scala_src/typechecker/impls/Decls.scala:252`, `:289`, `:343`, `:384`), through `defaultNumeral` (`impls/Functionals.scala:1016`): a numeral alone; each element of a tuple on its own; the branches of an `if` with `else`, a `case`, a block's last expression or a one-block `do`, when every result is a numeral, together into the narrowest default holding them all (`joinNumerals`, `joinInto`, `:1030`, `:1046`);
- a parameter or a typed place whose type holds the numeral without conversion and fixes no type, `Any`, `Object`, `Number`, where the default fits too (`defaultAtUnfixed`, `:1078`): in `checkApplicableWithoutInference` (`:490`), its `Any`-domain branch (`:512`), after the subtyping inference (`:279`), in the coercion attempt (`:410`), and at every typed binding, assignment, field and return through `STypeChecker.checkExpr` (`scala_src/typechecker/STypeChecker.scala:506`);
- a parameter or typed place whose type declares no coercion from the numeral's type but holds its default, as `Index` holds `ZZ32` (`defaultFits`, `:1093`; `STypeChecker.scala:510`, `Functionals.scala:411`, `:491`);
- a type parameter that numerals alone fix, with no expected type: before the subtyping inference (`preDefault`, `:1121`, called at `:198`), and as the coercion attempt's one choice for that parameter (`:385`), the narrowest default holding every value (`numeralDefault`, `:998`), with the attempt's ordinary choices as a fallback where the default finds no candidate (`:417-423`);
- a dotted receiver written as a numeral, where the default type has the member (`defaultReceiver`, `:1105`; called at `:1360` and `impls/Misc.scala:347`), the prototype's receiver rule, so the prelude's `(1).asNN32` keeps its numeral.


~~~~

## [S21] explorations/compile-ladder/rung-string-literals/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-string-literals/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-string-literals/REPORT.md:12-19, 2420 bytes.

~~~~
## 1. What changed and why

P-171: two string literals of one text are one object on both paths, and a concatenation of two string literals is folded into one literal; P-168's rule stands, strings are reference objects and their text equality is their `=`.

- Walk, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1018-1021`: `forStringLiteralExpr` makes its `FString` from `x.getText().intern()`, so every evaluation of every literal of one text carries one Java string.
- Walk, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FString.java:35-39`: `seqv` answers `v instanceof FString && val == ((FString) v).val`, the carried Java strings' identity. `AnyPrim.sequiv` still answers `true` first for one `FString` object (`interpreter/glue/prim/AnyPrim.java:23-26`).
- Compiled, `ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java:11`, `:62-66`: after the class test, two `FJavaString`s compare the Java strings they carry by `==`. The code generator is unchanged: it loads a literal with `ldc`, which yields the JVM's interned string, and wraps it in a new `FJavaString` (`compiler/codegen/CodeGen.java:5268-5277`).
- Both paths, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:133-138`, `:207-245`: the pre-typecheck desugaring, phase `PRETYPECHECKDESUGAR`, folds a concatenation by infix `||` (or `‖`) of string and character literals into one string literal, with the expression's span, parenthesised flag and type. It folds a two-operand `OpExpr` (`forOpExpr`, after its operands are folded) and the chain of three or more operands that the parser makes an `AmbiguousMultifixOpExpr` (`forAmbiguousMultifixOpExpr`); nested concatenations fold from the inside out. It folds when every operand is a string literal or a character literal in the Basic Multilingual Plane and a string literal is among the first two operands, joined left to right. It leaves every other `||`: a variable or call among the operands, two character literals first, an enclosing `||x||`, `BIG ||`, juxtaposition `"a" "b"`, natural numerals (rung F's). The phase runs in both phase orders before the checker (`compiler/phases/PhaseOrder.java:108-147`; `compiler/PreTypeCheckDesugarer.java`, `desugarComponent`, which runs the visitor unconditionally), so walk, the checker, the code generator and both stages read the folded literal.
~~~~

## [S22] explorations/compile-ladder/rung-literals-spec/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-literals-spec/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-literals-spec/REPORT.md:12-33, 7290 bytes, cut at 2500.

~~~~
## What changed and why

The decided design (P-173, P-174, P-76, P-172, P-171, P-165, P-40) is written into the specification in the revision form (P-96), with two new Appendix I entries and four revised. T writes the decided design, not the rungs' code (fork T3); the rungs' forks whose behaviour the text states are N1-N12, C1-C8, F1-F8 and S1-S2 (`CLIMB-BATCH-29.md:347-395`).

Passage by passage (the full reasoning P-96 asks for; each original is quoted in the entry named):

1. **A string literal, one object** (`Specification/basic/expressions/literals.tex:72-86`, box `:83` to `revival-string-literals`). New: two literals of one text denote one object; a string built at run time is another object unless the operation answers an existing string; strings stay reference objects; a concatenation of literals is a literal. Reason: P-171. Original: none (the Draft is silent; `Specification-1.0-frozen/basic/expressions/literals.tex:57` stands). Way back: each evaluation constructs a new string.
2. **The numeral types** (`literals.tex:98-118`, `:134-150`, box `:139` to `revival-numerals`). New: `Numeral` comprises `NaturalNumeral` and `RadixPointNumeral`; the four numbers `n`, `m`, `r`, `v` are fields, the getters `digits`, `fractionDigits`, `radix`, `digitValue` (`ZZ32`, `ZZ32`, `ZZ32`, `ZZ`); the explicit-radix types fold into the radix, `Literal[\v\]` into the digit count; the team's two draft notes stand and the box answers them. Reason: P-174, fork N1, N3; the judgement's "Changed in form: `:83-129`" (`reviews/literal-design-judgement-2026-11-08.md:24-29`). Original: `Specification-1.0-frozen/basic/expressions/literals.tex:83-86`, `:104-129`. Way back: static parameters again, which no library can declare.
3. **"Numerals are not directly converted"** (`literals.tex:156-163` rewritten; `:164-171` the Draft's `:141-148` kept as written). New: a numeral is converted where it stands, into the type its place fixes, and not before. Reason: P-173; the judgement keeps `:141-148` and contradicts `:132-141` at places that fix no type. Original: `Specification-1.0-frozen/basic/expressions/literals.tex:132-141`, quoted in `revival-numerals`.
4. **The conversion and the default** (`literals.tex:172-235`, box `:230`, replacing the box `revival-numeral-type` of `:149-165` at b430f9f428). New: each of the eight number types coerces from `NaturalNumeral`, `QQ`, `RR64`, `RR32` from `RadixPointNumeral`, exact or one rounding; a place fixes a type when its declared type declares
~~~~
