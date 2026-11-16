<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that db352c177..c0c35b4f9 added, changed or removed (the batch 32, landed at 567c36dad, and the landing's own steps to c0c35b4f9), written by evidence.py. -->

# The entries that the range changed

- The batch, db352c177..567c36dad: 21 entries: F-53, F-58, F-59, F-221, F-240, F-285, F-341, F-346, F-349, F-362, F-363, F-364, F-365, F-366, F-367, F-368, F-369, P-37, P-164, P-167, P-178
- After the landing, 567c36dad..c0c35b4f9: 0 entries
- Now over 600 characters: 20 of 21: F-53, F-58, F-59, F-221, F-240, F-285, F-341, F-349, F-362, F-363, F-364, F-365, F-366, F-367, F-368, F-369, P-37, P-164, P-167, P-178

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-53, changed

- Size: at the base 1489 characters; at the landing 1489 characters; now 1489 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 30's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 32's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-16 05:34Z · rewritten · by climb batch 32 commit stage: climb batch 32's landed gate: distance.txt's #total line (0) and checker-count.txt's #total line (0); only the batch in the title changes

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-58, changed

- Size: at the base 1785 characters; at the landing 1924 characters; now 1924 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-58 **Under the compiled checker against today's one library, microGPT's flat program, C4, has 42 distinct error sites of its own, 23 of them the index bound that its helpers do not write; each count is a floor.** By the distance stage's driver on `832f7d0d91`: `FlatArrays` 31, `FlatData` 3, `MicroGptFlat` 8. In `FlatArrays`, 23 are 'The static argument I does not satisfy the corresponding bound Index' in seven generic declarations (P-156), 1 is `gather`'s `T extends Number` against `Matrix`'s bound, and 7 are an unsized `Array` where a `Matrix` or an `Array3` is declared. `MicroGptFlat`'s 8 are `DOT`, `view` and `gather` on unsized arrays, one `if` of pairs, and line 82's `1.0 s`, a float numeral beside a `ZZ32` value that is tied between `RR64`'s and `QQ`'s product (row 989); `MicroGptFlatQuick.fss:40` has the same tie. The numeral powers pass. The APL program's four files hold 54 sites, and its grammar's api crashes the checker. Apart from the count, the top-level tuple bindings of lines 17 to 19 stop the compile under either library (row 988). In a scratch tree whose compile command selects the one library (F-352), with `I extends Index` written in the helpers and `gather`'s bound widened in a copy, the compile command reports 17: `FlatArrays` 7, `FlatData` 1 (an error of `File`'s api, which stops it), `MicroGptFlat` 8, `MicroGptFlatQuick` 1. Of the 17, 15 are the model's static types, its arrays without sizes (P-87). The checker stops a block at its first failing statement (row 474). Measured once each; no test checks it. Command: `compile-ladder/plan-31/probes/model-closure/run.sh check`. Detail: `compile-ladder/plan-31/probes/model-closure-check.md`, "1. The counts"; `compile-ladder/plan-31/probes/switch-rehearsal.md`, "microGPT's flat program".

Now:

- F-58 **Under the compiled checker against today's one library, microGPT's flat program, C4, has 42 distinct error sites of its own, 23 of them the index bound that its helpers do not write; each count is a floor.** By the distance stage's driver on `832f7d0d91`: `FlatArrays` 31, `FlatData` 3, `MicroGptFlat` 8. In `FlatArrays`, 23 are 'The static argument I does not satisfy the corresponding bound Index' in seven generic declarations (P-156), 1 is `gather`'s `T extends Number` against `Matrix`'s bound, and 7 are an unsized `Array` where a `Matrix` or an `Array3` is declared. `MicroGptFlat`'s 8 are `DOT`, `view` and `gather` on unsized arrays, one `if` of pairs, and line 82's `1.0 s`, a float numeral beside a `ZZ32` value that was tied between `RR64`'s and `QQ`'s product until the numeral rule resolved it at `RR64` (F-366; row 989, closed), as at `MicroGptFlatQuick.fss:40`. The numeral powers pass. The APL program's four files hold 54 sites, and its grammar's api crashes the checker. The top-level tuple bindings of lines 17 to 19 compile (F-369; row 988, closed), and with their names typed, line 77's `beta1 m` is a site that row 474 hid; the counts above are those before climb batch 32. In a scratch tree whose compile command selects the one library (F-352), with `I extends Index` written in the helpers and `gather`'s bound widened in a copy, the compile command reports 17: `FlatArrays` 7, `FlatData` 1 (an error of `File`'s api, which stops it), `MicroGptFlat` 8, `MicroGptFlatQuick` 1. Of the 17, 15 are the model's static types, its arrays without sizes (P-87). The checker stops a block at its first failing statement (row 474). Measured once each; no test checks it. Command: `compile-ladder/plan-31/probes/model-closure/run.sh check`. Detail: `compile-ladder/plan-31/probes/model-closure-check.md`, "1. The counts"; `compile-ladder/plan-31/probes/switch-rehearsal.md`, "microGPT's flat program".

History blocks of the range:

- Written by the gather: 2026-11-16 04:41Z · rewritten · from `explorations/compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" · by climb batch 32 gather: rows 988, 474 and 989 are closed by rungs D and N of climb batch 32; the counts are not measured again here (cites [S2])

Report sections that the entry cites: [S3] `compile-ladder/plan-31/probes/model-closure-check.md`, "1. The counts"; [S4] `compile-ladder/plan-31/probes/switch-rehearsal.md`, "microGPT's flat program".

## F-59, changed

- Size: at the base 1389 characters; at the landing 1479 characters; now 1479 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-59 **`SUM` and `PROD` take their identity from the static argument, and the compiled checker needs that argument written in every clause form.** It builds P-78, with a witness `typecase`, a `typecase` over a `() -> T` function with one clause for each number type. The compiled checker takes the element type from neither the clauses nor a declared type that receives the value (row 731; P-78). So for a generic big operator whose bound names its parameter, such as `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, an unwritten static argument has no instance at its bound, and the call is refused. A plain-bounded big operator takes its bound, or the reduction's expected type where the bound does not fit (F-221). Walk runs such a call: it instantiates the big operator at its value's declared type, else at its elements' join, and leaves the parameter open only with neither (F-228, F-143). C4 writes the static argument, as the team's tests do: `SUM[\ZZ32\][j <- 0#i] matCount(j)`; so does the interpreter's library at its own sites (F-285). `SUM e` over a collection `e`, and `x DOT y`, need none (P-78). Gated, for the witness and a plain bound, by `compiler_tests/WitnessIdentityRungG` and `InferBigOperatorUnwritten`; the refusal is row 731's, and no test pins it. Detail: `reviews/sum-replacement-judgement.md` section 5, Table 2, measured before P-48; row 731 gives today's mechanism.

Now:

- F-59 **`SUM` and `PROD` take their identity from the static argument, and the compiled checker takes an unwritten one from the reduction's expected type, else from the type of its body.** It builds P-78, with a witness `typecase`, a `typecase` over a `() -> T` function with one clause for each number type. For a generic big operator whose bound names its parameter, such as `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, an unwritten static argument has no instance at its bound; the compiled checker then writes it as the reduction's expected type, else as the type of its body (F-364; row 731, closed). A plain-bounded big operator takes its bound, or the reduction's expected type where the bound does not fit (F-221). Walk runs such a call: it instantiates the big operator at its value's declared type, else at its elements' join, and leaves the parameter open only with neither (F-228, F-143). C4 writes the static argument, as the team's tests do: `SUM[\ZZ32\][j <- 0#i] matCount(j)`; so does the interpreter's library at its own sites (F-285). `SUM e` over a collection `e`, and `x DOT y`, need none (P-78). Gated, for the witness and a plain bound, by `compiler_tests/WitnessIdentityRungG` and `InferBigOperatorUnwritten`; a reduction whose bound names its parameter, unwritten, by `compiler_tests/InferBigOperatorSelfBound`. Detail: `reviews/sum-replacement-judgement.md` section 5, Table 2, measured before P-48 and before the checker fixed an unwritten argument (F-364).

History blocks of the range:

- Written by the gather: 2026-11-16 04:41Z · rewritten · from `explorations/compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction" · by climb batch 32 gather: row 731 is closed by rung C of climb batch 32 (cites [S5])

## F-221, changed

- Size: at the base 827 characters; at the landing 859 characters; now 859 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-221 **The compiled checker retries a call written as another call's argument against each enclosing declaration's parameter type, where the enclosing call is not accepted otherwise.** It builds P-51 under P-49, so a declaration that accepts the call as written is never passed over. A reduction's plain-bounded big operator, an argument of `__bigOperator` once desugared, so takes the reduction's expected type; an F-bounded one is still refused (row 731). A chain `a OPLUS b OPLUS c` that only the retry makes acceptable to a multifix declaration now runs it, not the binary one. Walk gives such an argument no expected type (row 705). Gated by `compiler_tests/InferCallArgument*` and `InferBigOperatorExpectedType`. Detail: `compile-ladder/rung-argument-context/REPORT.md` sections 1, 5 and 8, and `SKEPTIC.md` finding 5.

Now:

- F-221 **The compiled checker retries a call written as another call's argument against each enclosing declaration's parameter type, where the enclosing call is not accepted otherwise.** It builds P-51 under P-49, so a declaration that accepts the call as written is never passed over. A reduction's plain-bounded big operator, an argument of `__bigOperator` once desugared, so takes the reduction's expected type; an F-bounded one takes the expected type, else the type of its body (F-364). A chain `a OPLUS b OPLUS c` that only the retry makes acceptable to a multifix declaration now runs it, not the binary one. Walk gives such an argument no expected type (row 705). Gated by `compiler_tests/InferCallArgument*` and `InferBigOperatorExpectedType`. Detail: `compile-ladder/rung-argument-context/REPORT.md` sections 1, 5 and 8, and `SKEPTIC.md` finding 5.

History blocks of the range:

- Written by the gather: 2026-11-16 04:41Z · rewritten · from `explorations/compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction" · by climb batch 32 gather: row 731 is closed by rung C of climb batch 32 (cites [S5])

## F-240, changed

- Size: at the base 2031 characters; at the landing 2030 characters; now 2030 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 70 s and its distance stage 128 s at the last landed gate, climb batch 30's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 83 s), over fourteen components, ran at a start load of 0.14, against 190 s (117 s) at 0.26 at climb batch 29b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-30/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 95 s and its distance stage 165 s at the last landed gate, climb batch 32's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 102 s), over fourteen components, ran at a start load of 0.31, against 128 s (83 s) at 0.14 at climb batch 30's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-32/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-16 05:34Z · rewritten · by climb batch 32 commit stage: climb batch 32's landed gate: count stage 93 s by the file times of tmp/gate-batch-32/checker-count/javac.txt and run.txt, written about 95 s; distance.txt's #seconds line (165, FortressLibrary 102), its #machine line (load at start 0.31) and its first line (14 components); compared against climb batch 30's 128 s (83 s) at 0.14

## F-285, changed

- Size: at the base 1664 characters; at the landing 1696 characters; now 1696 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-285 **The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.** The library follows P-78's workaround for row 731: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4580`, `:4586`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2719`, `:3105`, `:3110`, `SUM[\ZZ32\]` at `:4764`, `:4781`, and the team's `transpose` (`List.fss:504`). The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The fused arm (`:1585`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2739`). So the distance holds no site of rows 731 and 632, while row 731's checker gap stays for user programs and the team demos. Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`; `PureList`'s, at `Library/PureList.fss:73`, answers a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824). Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/PureListStridedSubscriptWalk`. Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7 and 9.

Now:

- F-285 **The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.** The library follows P-78's workaround for row 731: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4580`, `:4586`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2719`, `:3105`, `:3110`, `SUM[\ZZ32\]` at `:4764`, `:4781`, and the team's `transpose` (`List.fss:504`). The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The fused arm (`:1585`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2739`). So the distance holds no site of rows 731 and 632, and the checker now fixes an unwritten argument of such a big operator itself (F-364; row 731, closed). Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`; `PureList`'s, at `Library/PureList.fss:73`, answers a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824). Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/PureListStridedSubscriptWalk`. Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7 and 9.

History blocks of the range:

- Written by the gather: 2026-11-16 04:41Z · rewritten · from `explorations/compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction" · by climb batch 32 gather: row 731 is closed by rung C of climb batch 32 (cites [S5])

## F-341, changed

- Size: at the base 2188 characters; at the landing 2262 characters; now 2262 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as values of type `ZZ`, one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its default, then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, but `h = 0.5` is `false` for `h: QQ = 1/2`, the library's `=` over `Any` fitting the numeral at its default `RR64` (row 973; observed once at `17e93a7da8`, no test pins it). At load walk refuses a numeral type written as a type that a trait or an object extends, or as a static argument; one in a `comprises` clause loads (row 981). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

Now:

- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as values of type `ZZ`, one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its default, unless its own coercion reaches a declaration strictly below (F-366), then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`, the numeral going to `QQ`'s `=` by its own coercion in place of the library's `=` over `Any` (F-366; `tests/NumeralEqualsNumberWalk`). At load walk refuses a numeral type written as a type that a trait or an object extends, or as a static argument; one in a `comprises` clause loads (row 981). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-16 04:41Z · rewritten · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" · by climb batch 32 gather: row 973 is closed by rung N of climb batch 32 (cites [S6])

Report sections that the entry cites: [S7] `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; [S8] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; [S9] `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

## F-346, removed

- Size: at the base 1002 characters; at the landing none; now none.
- Section now: none.

At the base:

- F-346 **Under walk the library's `=` and `=/=` over `Any` meet a numeral at its default, so a number and a numeral of one value answer both as if the values differed.** Under walk `u = 0` is `false` and `u =/= 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32`, and so are `q = 0.5` and `q =/= 0.5` for `q: QQ = 1/2`: with no `=` pairs between a numeral type and a number type (P-174), `=` takes the numeral at its default (row 973), and `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) follows it (row 966). So under walk `e =/= e'` still answers `NOT (e = e')`. The compiled path until the switch-over answers `false` for `u =/= 0` through the prelude's `=/=` on each integer type. Test: `ProjectFortress/tests/XXXNotEqualNumeral.fss` (an expected failure), with `XXXNumeralEqualsNumberWalk.fss` for `u = 0`. Detail: `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "11. Defects, each with its home".

History blocks of the range:

- Written by the gather: 2026-11-16 04:33Z · merged into F-366 · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "2. The failing runs and the passing runs" · by climb batch 32 gather: F-346 stated that under walk u = 0 is false; rung N of climb batch 32 made it true on both paths, and F-366 holds the fact (cites [S10])

## F-349, changed

- Size: at the base 874 characters; at the landing 965 characters; now 965 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-349 **Walk chooses among declarations applicable with coercion by specificity read through other applicable declarations, where none wins directly.** That is the specification's choice, the declaration than which no other is more specific (`Specification/basic/conversions-coercions.tex`, "Coercion Resolution"), wherever the relation has no cycle. So a call with three declarations in a chain of coercions runs the first, as the compiled path does, with no 'Ambiguous coercion' (a probe, no test), and a float numeral to the left of an `RR32` operand runs `RR32`'s operator. Walk's rule that a declaration that fits a numeral as it is runs first is apart from it. Source: `interpreter/evaluator/values/OverloadedFunction.java:2398`, `:2418-2438`. Test: `tests/NumeralLeftOfRR32Walk`. Detail: `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

Now:

- F-349 **Walk chooses among declarations applicable with coercion by specificity read through other applicable declarations, where none wins directly.** That is the specification's choice, the declaration than which no other is more specific (`Specification/basic/conversions-coercions.tex`, "Coercion Resolution"), wherever the relation has no cycle. So a call with three declarations in a chain of coercions runs the first, as the compiled path does, with no 'Ambiguous coercion' (a probe, no test), and a float numeral to the left of an `RR32` operand runs `RR32`'s operator. Walk's rule for a numeral at a call runs before it: the declaration that fits the numeral at its default, or one strictly below it that the numeral's own coercion reaches (F-366). Source: `interpreter/evaluator/values/OverloadedFunction.java:2448`, `:2511-2531`. Test: `tests/NumeralLeftOfRR32Walk`. Detail: `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-16 04:33Z · rewritten · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" · by climb batch 32 gather: its last sentence and its line citations, after rung N of climb batch 32 (cites [S6])

Report sections that the entry cites: [S11] `Specification/basic/conversions-coercions.tex`, "Coercion Resolution"; [S9] `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

## F-362, added

- Size: at the base none; at the landing 1004 characters; now 1004 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-362 **The signs for sum and product are accumulators, and an api's operator header takes what a component's takes.** U+2211 and U+220F parse as `SUM` and `PROD` in a reduction and in an operator's declaration and are no `Op` anywhere, so a program's own `opr ∑` declares `BIG +`, and an infix or postfix use of either sign, and `opr ∑` in an import's list, is a `Syntax Error` (row 42); an api declares `opr (x: T)^T` and the other postfix exponent operators as a component does. A grammar edit regenerates the two tracked parsers, `parser/Fortress.java` and `parser/templateparser/TemplateParser.java`. It means that the model's sums and its `^T` can be written in the specification's form on both paths. Tests: `tests/SumSignAccumulator.fss`, `tests/ApiPostfixExponentOp.fss`, `compiler_tests/SumSignAccumulatorCompiled.test`, `compiler_tests/ApiPostfixExponentOpCompiled.test`. Detail: `compile-ladder/rung-parser-declarations/REPORT.md`, "What changed and why" and "Programs run old against new".

History blocks of the range:

- Written by the gather: 2026-11-16 04:24Z · added · from `explorations/compile-ladder/rung-parser-declarations/REPORT.md`, "What changed and why" · by climb batch 32 gather (cites [S12])

Report sections that the entry cites: [S12] `compile-ladder/rung-parser-declarations/REPORT.md`, "What changed and why".

## F-363, added

- Size: at the base none; at the landing 1831 characters; now 1831 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-363 **A superscript follows a dotted access and a parenthesised call on both paths.** `p.wq^T`, `B.n^2`, `B.f()^T` and `B.data[5]^2` parse as the operator applied to the whole dotted primary to its left, and `(f(x))^T`, `(f(x))!` and `(a^b)!` run under walk as they do compiled; `f(x)^T` and `f(x)^2` stay a static error on both paths (walk: "the argument should not be immediately followed by a non-expression element"; the checker: "Item at this location must be an expression, not an operator."). The parser reads a primary with a dot as the front of the math items that follow it (`ProjectFortress/src/com/sun/fortress/parser/Expression.rats:386-400`), so a subscript, a parenthesised item or a tight identifier after a dotted method call parses too; the one node kind it builds for a single item is the one the parenthesised spelling built, so neither the checker nor the code generator changed. Walk's postfix branch evaluates an operand in parentheses as one expression (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:965-970`). For the work: a model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx`; a selector after a superscript, `B.data^T.v`, is still a syntax error, and a subscript math item followed by a superscript, `x[5]^2` or `B.f()[5]^2`, still fails on both paths (row 1 under walk, row 1005 compiled). Tests: `ProjectFortress/tests/SuperscriptAfterDottedAccess.fss`, `ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss`, `ProjectFortress/tests/SuperscriptAfterCallRefused.fss` with its `.test`, and `compiler_tests/SuperscriptAfterDottedAccessCompiled.test`, `SuperscriptAfterParenthesisedCallCompiled.test`, `XXXSuperscriptAfterCallRefusedCompiled.test`. Detail: `compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after" and "The trees".

History blocks of the range:

- Written by the gather: 2026-11-16 04:27Z · added · from `explorations/compile-ladder/rung-superscript-after/REPORT.md`, "The trees (points to report)" · by climb batch 32 gather (cites [S13])

Report sections that the entry cites: [S14] `compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after".

## F-364, added

- Size: at the base none; at the landing 1908 characters; now 1908 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-364 **The compiled checker instantiates a reduction that writes no static argument by its expected type, else by the type of its body, where the call as written is not accepted; a reduction that is accepted as written is unchanged.** For `__bigOperator(BIG OP(), clauses)` with no static argument written, `reductionApplication` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`) first checks the call as written, where the big operator has an instance alone; if that is not accepted or its type does not convert to the expected type, it writes the static argument as the expected type, then as the body's type, each only where the type meets the bounds of the big operator's one static parameter, and takes the first form that is accepted and converts. The elements are converted to the instance. A call's argument has no expected type where the call is accepted without one (P-51), so a reduction there runs at its body's type. So `SUM`, `PROD`, `BIG MIN` and `BIG MAX` need no written static argument for the checker; P-78's workaround for row 731 stays in the library and the model. The two paths give such a reduction different instances at a method's return type, a field, a top-level variable and an assignment (row 1008), so a program for both paths writes the argument there. A big operator with two or more static parameters is still refused (row 1007). The library's three sites unwritten give 3 errors on the base and 0 on the tree; `explorations/run-c4/src/MicroGptFlat.fss:43` unwritten, 43 errors on the base and 42 on the tree, the one gone at `:43`. Tests: `compiler_tests/InferBigOperatorSelfBound`; guards `compiler_tests/InferBigOperatorExpectedType` and `InferBigOperatorUnwritten`. Detail: `compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction", "5. Old against new" and "7. The stages and the checker's time".

History blocks of the range:

- Written by the gather: 2026-11-16 04:29Z · added · from `explorations/compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction" · by climb batch 32 gather (cites [S5])

Report sections that the entry cites: [S5] `compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction".

## F-365, added

- Size: at the base none; at the landing 2265 characters; now 2265 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-365 **The compiled checker instantiates a reference to a generic function by the arrow type that receives it, and refuses one that the arrow type leaves open.** A functional reference with one declaration that has static parameters, no written static arguments and an expected arrow type takes the static arguments that make its instance a subtype of that type (`instantiatedReference`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`); as an argument it is typed again in the retry with each candidate's parameter type (`retypable`). A static parameter that the arrow type's domain does not fix, one that only the return type mentions among them, is refused: 'A reference to the generic function pick takes its static arguments from the arrow type that receives it, and ZZ32->ZZ32 does not fix B.' An arrow type that carries its own static parameters is a subtype of no arrow type and coerces to nothing (`scala_src/types/TypeAnalyzer.scala`, `scala_src/typechecker/CoercionOracle.scala:292-293`). The applied value of an untyped binding is refused with a message. A static parameter of the function's own counts as unbound also where the kind environment holds its name for another declaration's parameter, as inside a generic declaration that calls its static parameter the same (`carriesOwnStaticParams`, `TypeAnalyzer.scala`), and the memo of normalized arrow types keys an arrow type by its static parameters too, so that a generic function's type and an instance written alike are not taken for each other. So the compiled half of the model's row lift, `rows(rmsn, x)` with a sized `rmsn`, has its checker. Still refused or stopped: a name with several declarations of which one is generic (row 1009), an untyped binding never applied (row 1010). Still accepted, and then dead at run time: a reference whose expected type is not an arrow type, as at a parameter of type `Any` (row 1012). Tests: `compiler_tests/GenericFunctionAsValueCompiled`, `GenericFunctionAsValueSameNameCompiled`, `XXXGenericFunctionAsValueOpenCompiled`, `XXXGenericFunctionAsValueUntypedCompiled`. Detail: `compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 2, row 758: the reference to a generic function" and "5. Old against new".

History blocks of the range:

- Written by the gather: 2026-11-16 04:29Z · added · from `explorations/compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 2, row 758: the reference to a generic function" · by climb batch 32 gather (cites [S15])

Report sections that the entry cites: [S15] `compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 2, row 758: the reference to a generic function".

## F-366, added

- Size: at the base none; at the landing 2890 characters; now 2890 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-366 **A numeral at a call goes to the most specific declaration that takes it, on both paths: a declaration that only the numeral's own coercion reaches runs in place of the one that fits the numeral at its default where its declared parameter types lie strictly below, by subtyping; otherwise the one that the default fits runs.** It builds P-46. So `u = 0` and `0 = u` are `true`, and `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64` or `RR32`; `h = 0.5` is `true` for `h: QQ = 1/2`; `k(5)` runs `k(x: NN32)` beside `k(x: Any)`; a `case` clause `0` matches a zero `NN32`; and a program's own number type with a numeral coercion compares with a numeral by its own `=`. `Equality[\T\]` declares `opr =/=(self, other:T)` as the negation of the type's `=` (`Library/FortressLibrary.fss:102`), which a type that extends `Equality` reaches before the `=/=` over `Any` (`:98`). The order between the two kinds of declaration is subtyping on the declared parameter types, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration, and `x^2` for an `RR64` keeps its integer power. A value's coercion is not ranked so. Of two declarations reached only by coercion and not ordered, the one that the numeral's default fits runs, whether they differ at the numeral alone or elsewhere too, so `1.0 s` for `s: ZZ32` checks against the one library at `RR64`'s juxtaposition. So a model line may compare a number of any type with a numeral, and write a float numeral beside an integer value, on both paths. The checker does the comparison only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, so a call such as `i + 1` costs nothing more; walk keeps each choice in its dispatch cache, except one that asked a type of a program's own for its numeral coercion, whose `where` clause the cache's key does not hold. The key tells a negative constant from a numeral of the same default, since no unsigned type takes the first (`Numerals.rangeKey`). Two departures: under walk a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016), and on both paths a numeral at a bare type parameter's declaration does not go to a more specific one (row 1017). Source: `numeralAttempt` and `numeralTie` in `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:980-1021`, `:1066`, `:1117`; `bestMatchForNumerals` and `belowByNumerals` in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2325-2428`. Tests: `compiler_tests/NumeralMostSpecificCompiled`, `compiler_tests/NumeralTieDefaultCompiled`, `tests/NumeralMostSpecificWalk`, `tests/NumeralEqualsNumberWalk`, `tests/NotEqualNumeral`. Detail: `compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" and "5. Points to report".

History blocks of the range:

- Written by the gather: 2026-11-16 04:32Z · added · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" · by climb batch 32 gather (cites [S6])
- Written by the gather: 2026-11-16 04:33Z · F-346 merged in · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "2. The failing runs and the passing runs" · by climb batch 32 gather: F-346 stated that under walk u = 0 is false; rung N of climb batch 32 made it true on both paths, and F-366 holds the fact (cites [S10])

Report sections that the entry cites: [S6] `compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why".

## F-367, added

- Size: at the base none; at the landing 1868 characters; now 1868 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-367 **Under walk a generic function is a value, received at the arrow type of its parameter or variable.** A function with static parameters has a type of its own as a value (`interpreter/evaluator/types/FTypeGenericArrow.java`), below `Any` and below each arrow type it can be received at. A parameter, of a function or a constructor, a local variable declared with an arrow type, and a variable of arrow type at an assignment, a mutable top-level variable among them, receive the instance that a direct call with arguments of the arrow's domain types runs (`interpreter/evaluator/values/Fcn.java`, `received`; `interpreter/evaluator/EvaluatorBase.java`, `instanceReceivedAt`). A generic callee's static parameters are fixed by its other arguments first, so the row lift `rows(rmsn, x)` runs with a sized `rmsn`. Where the arrow type leaves a static parameter of the function open, and at `Any`, a type parameter or an untyped place, the value stays generic and each application infers its static arguments, as a direct call does; the compiled checker refuses those forms (row 1021). An overloaded name keeps its whole overload set, and its type as a value holds its generic overloads, so `pick(twice)` now runs an arrow-typed `pick` where it ran `pick(x: Any)` (`interpreter/evaluator/values/OverloadedFunction.java:2970`). Not built: an immutable top-level variable keeps the generic value (row 1019), and a callee's type parameter fixed only by a value's run-time type refuses the function (row 1018). A function declared in a block with static parameters of its own does not run under walk at all, called or passed (row 1020). Tests: `tests/GenericFunctionAsValueWalk.fss`, `GenericFunctionRowLiftWalk.fss`, `GenericFunctionAssignedWalk.fss`. Detail: `compile-ladder/rung-generic-function-value/REPORT.md`, "The rule as built" and "Runs to report, not tests".

History blocks of the range:

- Written by the gather: 2026-11-16 04:35Z · added · from `explorations/compile-ladder/rung-generic-function-value/REPORT.md`, "The rule as built" · by climb batch 32 gather (cites [S16])

Report sections that the entry cites: [S16] `compile-ladder/rung-generic-function-value/REPORT.md`, "The rule as built".

## F-368, added

- Size: at the base none; at the landing 1218 characters; now 1218 characters, over 600.
- Section now: "The library's arrays and algebra".

Now:

- F-368 **Under walk a top-level array literal with a declared type is built into the library array of that type, in the variable's cell.** `LazilyEvaluatedCell.getValueNull` builds an immutable variable's literal when the cell is first forced, so a reader above the declaration, an importer and `forVarDecl4`'s type check all see the array; `BuildEnvironments.forVarDecl4` builds a `var` variable's. Both call `LHSEvaluator.topLevelArray`, which runs the block's code, `libraryArray`. So a table of the model can be a top-level literal with a declared type, as `shp: ZZ32[9] = [...]`, under walk; the compiled path is not touched. The declared size is checked only at the top level, by `forVarDecl4`; a block binds a literal of another size (row 1022). A field declaration of an object takes the same code. An untyped top-level literal stays a paste (row 49); a `var` bound in a block to a literal is immutable (row 1024), and a literal assigned to a variable is not built (row 1025). Tests: `tests/ObjectFieldArrayLiteral.fss`, `tests/TopLevelArrayLiteral.fss`, `TopLevelArrayLiteralSize.fss`, `TopLevelArrayLiteralElement.fss`. Detail: `compile-ladder/rung-toplevel-array-literal/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-16 04:36Z · added · from `explorations/compile-ladder/rung-toplevel-array-literal/REPORT.md`, "What changed and why" · by climb batch 32 gather (cites [S17])

Report sections that the entry cites: [S17] `compile-ladder/rung-toplevel-array-literal/REPORT.md`, "What changed and why".

## F-369, added

- Size: at the base none; at the landing 1668 characters; now 1668 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6528`); a wildcard binds nothing, and a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:77`, `beta1 m`, is a checker site against the one library that row 474 hid. Under walk the same right side runs once for each name and once more (row 1026). A local tuple binding's declared name beside untyped names is still unchecked (row 1029). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

History blocks of the range:

- Written by the gather: 2026-11-16 04:37Z · added · from `explorations/compile-ladder/rung-tuple-binding/REPORT.md`, "The binding as compiled" · by climb batch 32 gather (cites [S18])

Report sections that the entry cites: [S2] `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why".

## P-37, changed

- Size: at the base 1321 characters; at the landing 1383 characters; now 1383 characters, over 600.
- Section now: "The one library and the compiled checker".

At the base:

- P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. Why: the switch-over spares porting the interpreter's library into the compiler's; the revival develops the checker until it accepts that fuller library. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled; F-293 holds the compiler's fourth file, `CompilerSystem`). The one exception is the numerals: until the switch-over the prelude carries the design of P-174 and P-176, so that both paths treat a numeral alike before it, and that copy goes with the prelude. The decision settles which files survive, not the designs inside them: the one library takes a design of the prelude's where it is the team's later decision, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library.

Now:

- P-37 **One library, the interpreter's, is the library that the compiler checks.** The interpreter's prelude, `FortressLibrary` and `FortressBuiltin`, becomes the compiled path's prelude in place of the compiler's own, and the compiled path reads the interpreter's library with it. Why: the switch-over spares porting the interpreter's library into the compiler's; the revival develops the checker until it accepts that fuller library. The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove. So no declaration is added to the compiler's prelude, and at the switch-over its three files are deleted and their tests kept (P-38 says which tests are respelled; F-293 holds the compiler's fourth file, `CompilerSystem`). There are two exceptions, each so that both paths do the same before the switch-over, and each copy goes with the prelude: the numerals, where the prelude carries the design of P-174 and P-176; and the built-in number types, where it takes the form of P-178. The decision settles which files survive, not the designs inside them: the one library takes a design of the prelude's where it is the team's later decision, as it took the prelude's flat shape of the number types. This decision does not stop work on the code generator, which is compiler work under either library.

History blocks of the range:

- Written by coordinator: 2026-11-16 01:51Z · rewritten · by coordinator: a second exception, for the built-in number types (P-178), by his principle that both paths do the same before the switch-over; the coordinator's application of that principle, named to him on 2026-11-16 01:5xZ, his to overturn; his own exception of 2026-11-09 is the numerals'
- Written by coordinator: 2026-11-16 01:57Z · noted · correcting the block of 2026-11-16 01:51Z · by coordinator: that block calls the exception for the number types the coordinator's application of his principle, his to overturn. His own words settle it, as he pointed out on 2026-11-16 01:5xZ ('Are you sure my earlier words don't settle this?'), read whole at the source: 2026-11-08 15:17Z, 'We must fix it once and for all, even before switchover, and bring the two implementations to do the same thing.'; 2026-11-09T17:03:11Z, 'the point was to resolve the compile time as well as walks behavior so that no internals bleed out and that the two paths are brought in line and have the exact same behavior before we get to the switchover. Will the probe do the static types in compile path as well as in the interpreter? Or were you just focusing on the compile path for the moment? Because I believe we need both.'; 2026-11-09T17:14:11Z, 'Of course, I'm making exception for the P37.' So that both paths take the form before the switch-over, the compiler's prelude included, is his position, and the exception is its consequence, not a proposal of the coordinator's

## P-164, changed

- Size: at the base 2176 characters; at the landing 2190 characters; now 2190 characters, over 600.
- Section now: "The one library and the compiled checker".

At the base:

- P-164 **The five I/O objects become plain Fortress objects, each over a Java-backed value in a field, of two traits that `FortressLibrary` declares, `JavaBufferedWriter` and `JavaBufferedReader`.** The two traits take the compiler prelude's names and methods; each method is a public native binding in P-58's form on a helper of `nativeHelpers/fileOps`, 17 bindings, 14 on existing helpers and 3 on new ones for standard output, standard error and standard input, with factories over a file name and for each standard stream. Walk's loader carries the two traits by name as the Java classes `FortressBufferedWriter` and `FortressBufferedReader`, through a private native object below each trait, and the checker's walk-world foreign-type table (`compiler/NamingCzar.java`) holds the two entries (F-330), since the checker reads the whole helper class that a binding names (F-321). `Writer`, `BufferedWriter`, `FileWriteStream`, `FileReadStream` and `Reader` leave their native components and each holds its Java-backed value in a field, as the team's `BirdyLib` `FileReadStream` does; `stdOut` stays a `Writer`, in UTF-8. Their 36 glue bindings are gone (F-330, F-332). At the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, and the boxed-type table's two entries and `fileOps`' raise strings name the one library's types. No model line changes. Why: it is the team's later shape for a file stream, an object over a Java-backed value in a field, with the team's Java types; it follows the library's pattern for a type that both paths name and that holds a Java value, a trait of the main component with walk's native object below it and the compiled path's run-time class implementing it, as `ZZ32`, `Int` and `FZZ32` stand; and it maps one Java type to one Fortress type to one run-time class, as the checker's table requires, where the other ways leave the compiled half undesigned, decide nothing, or cost a third rung and split the standard output. P-162's pair pattern stays for the natives that no bare helper reaches. Detail: `reviews/io-objects-carrier-2026-11-06.md`, sections 1, 6 (b), 7 and 8.

Now:

- P-164 **The five I/O objects become plain Fortress objects, each over a Java-backed value in a field, of two traits that `FortressLibrary` declares, `JavaBufferedWriter` and `JavaBufferedReader`.** The two traits take the compiler prelude's names and methods; each method is a public native binding in P-58's form on a helper of `nativeHelpers/fileOps`, 17 bindings, 14 on existing helpers and 3 on new ones for standard output, standard error and standard input, with factories over a file name and for each standard stream. Walk's loader carries the two traits by name as the Java classes `FortressBufferedWriter` and `FortressBufferedReader`, through a private native object below each trait, and the checker's walk-world foreign-type table (`compiler/NamingCzar.java`) holds the two entries (F-330), since the checker reads the whole helper class that a binding names (F-321). `Writer`, `BufferedWriter`, `FileWriteStream`, `FileReadStream` and `Reader` leave their native components and each holds its Java-backed value in a field, as the team's `BirdyLib` `FileReadStream` does; `stdOut` stays a `Writer`, in UTF-8. Their 36 glue bindings are gone (F-330, F-332). At the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, and the boxed-type table's two entries and `fileOps`' raise strings name the one library's types. No model line changes. Why: it is the team's later shape for a file stream, an object over a Java-backed value in a field, with the team's Java types; it follows the library's pattern for a type that both paths name and that holds a Java value, a trait of the main component with walk's native object below it and the compiled path's run-time class implementing it, the pattern that the number types leave by P-178; and it maps one Java type to one Fortress type to one run-time class, as the checker's table requires, where the other ways leave the compiled half undesigned, decide nothing, or cost a third rung and split the standard output. P-162's pair pattern stays for the natives that no bare helper reaches. Detail: `reviews/io-objects-carrier-2026-11-06.md`, sections 1, 6 (b), 7 and 8.

History blocks of the range:

- Written by coordinator: 2026-11-16 01:51Z · rewritten · by coordinator: the pass after P-178: the reason compared the I/O objects' pattern with the number types' pair 'as ZZ32, Int and FZZ32 stand', which P-178 replaces for the numbers; the I/O objects' own design is unchanged

## P-167, changed

- Size: at the base 1607 characters; at the landing 1661 characters; now 1661 characters, over 600.
- Section now: "The one library and the compiled checker".

At the base:

- P-167 **The three natives over `Any`: `ilkName` and `SEQV` name the compiled path's helpers, which walk's loader answers with its own operations, and `Object`'s `asString` is written in Fortress as `self.ilkName`.** `ilkName` and `SEQV` keep P-58's form, a bare `builtinPrimitive("…")`, naming `stringOps.typeName` and `equality.sEquiv`. The compiled path runs each helper as it does today, and the helper's answer is the operation's definition. Walk's loader (`interpreter/glue/NativeApp.java`, where it reads a `builtinPrimitive` string) holds a table of eight names, these two among them (F-335), and answers each with walk's own operation, as a virtual machine runs its own code for an intrinsic; no implementation is shared, and one test runs on both paths to hold the two together. For these two names P-58's walk half, that walk loads the named helper, bends. P-169 makes the device the rule for the runtime's own operations, 45 more bindings. `Object`'s `asString` becomes `self.ilkName`, P-91's rule as text, which removes one native and, once the compiled path reads the one library, the compiled stack overflow of row 321. The ilk is the trait's name on both paths, such as `ZZ32` and never walk's `Int`, so walk's native objects stop being types that a program sees or prints. What `SEQV` answers is P-168. Why: the compiled path's answer is the definition and walk is brought in line, the curator's "do it the way the compiler path does it"; the three are the runtime's own operations, not calls into Java helpers. Detail: `reviews/any-carrier-2026-11-06.md`, section 6, options (c) and (e1).

Now:

- P-167 **The three natives over `Any`: `ilkName` and `SEQV` name the compiled path's helpers, which walk's loader answers with its own operations, and `Object`'s `asString` is written in Fortress as `self.ilkName`.** `ilkName` and `SEQV` keep P-58's form, a bare `builtinPrimitive("…")`, naming `stringOps.typeName` and `equality.sEquiv`. The compiled path runs each helper as it does today, and the helper's answer is the operation's definition. Walk's loader (`interpreter/glue/NativeApp.java`, where it reads a `builtinPrimitive` string) holds a table of eight names, these two among them (F-335), and answers each with walk's own operation, as a virtual machine runs its own code for an intrinsic; no implementation is shared, and one test runs on both paths to hold the two together. For these two names P-58's walk half, that walk loads the named helper, bends. P-169 makes the device the rule for the runtime's own operations, 45 more bindings. `Object`'s `asString` becomes `self.ilkName`, P-91's rule as text, which removes one native and, once the compiled path reads the one library, the compiled stack overflow of row 321. The ilk is the trait's name on both paths, such as `ZZ32` and never walk's `Int`, so walk's native objects stop being types that a program sees or prints; its five native number objects go altogether (P-178). What `SEQV` answers is P-168. Why: the compiled path's answer is the definition and walk is brought in line, the curator's "do it the way the compiler path does it"; the three are the runtime's own operations, not calls into Java helpers. Detail: `reviews/any-carrier-2026-11-06.md`, section 6, options (c) and (e1).

History blocks of the range:

- Written by coordinator: 2026-11-16 01:51Z · rewritten · by coordinator: the pass after P-178: the sentence on walk's native objects gains the pointer, since the five number objects now go and are not only hidden

## P-178, added

- Size: at the base none; at the landing 1544 characters; now 1544 characters, over 600.
- Section now: "Numbers".

Now:

- P-178 **Each built-in number type is one `value object` under its own name, and walk's native number objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` go.** `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` are each declared `value object`, as `NN32` and `RR32` already are, in place of a trait with one native object below it, such as `trait ZZ32 comprises { Int }` with `value object Int extends ZZ32`. An object is a leaf, so no type of a program extends a built-in number type; a program's own number type extends `Number` (P-160). Compiled code can then hold a value of such a type as a bare JVM `int`, `long` or `double` (P-17), and both paths take this form before the switch-over: the one library by the merge, and the compiler's prelude by an exception to P-37, as for the numerals, which goes with the prelude. For the number types it replaces the pattern that P-164's reason names, a trait with walk's native object below it. Why: the two names are a duality between the two libraries, which the curator called a problem that the revival makes for itself by keeping it; the second names are walk's internals, which a program is not to see (P-167); and the compiler prelude's open trait lets a program's object extend `ZZ32`, which a bare `int` cannot hold (row 866, such a program compiles and dies when it runs). Detail: `reviews/carriers-ways-2026-11-13.md`, "Way D. One object per type: each number trait merged with its one object"; the merge as probed: `compile-ladder/plan-31/probes/number-object-merge.md`, "What was built".

History blocks of the range:

- Written by coordinator: 2026-11-16 01:42Z · added · by coordinator: the curator's decisions of 2026-11-16: 00:51Z 'They go.', to the coordinator's line that Int, Long, Float, BigNum and UnsignedLong go; about 01:29Z 'Value object ZZ32 it is.', after the two forms were set side by side (the prelude's open trait, which a program's object can extend, against a value object, a leaf). His earlier words behind it: 2026-11-06 17:32Z 'we create a problem for ourselves by keeping this duality'; 17:39Z 'I think these should not be visible to the program'; the coordinator's answer of 17:41Z, 'the native objects go altogether and walk's FInt is a ZZ32 directly, as the compiled FZZ32 already is ... I will have the item's default say so', which he did not contest and which the record then lost (the recap of 18:30Z softened it, review-queue item 372 kept 'made private'); 2026-11-08 15:17Z 'bring the two implementations to do the same thing', 'before it's frozen in the switchover'; 2026-11-13 22:55Z 'That sounds like boxing ... For compiled path we must do better.' The words whole, with the scout's transcript lines: HELD.md, 'Held in chat (2026-11-16)'.
- Written by coordinator: 2026-11-16 01:42Z · moved to "Numbers", rewritten · by coordinator: a stray letter before the title removed, and the entry moved to its section, minutes after it was added; no word of the text changed
- Written by coordinator: 2026-11-16 01:51Z · rewritten · by coordinator: the clause 'both paths take this form before the switch-over' claimed more than he decided: P-37 adds no declaration to the compiler's prelude, with the numerals as its one exception, and he made no second exception for the number types; found by the record worker's report of 2026-11-16 01:5xZ
- Written by coordinator: 2026-11-16 01:51Z · rewritten · by coordinator: the clause on the two paths restored and made exact, minutes after the coordinator had weakened it: that both paths do the same before the switch-over is his principle, stated on 2026-11-08 15:17Z ('We must fix it once and for all, even before switchover, and bring the two implementations to do the same thing') and on 2026-11-09 17:03Z ('the two paths are brought in line ... before we get to the switchover'), and for the numerals he made the exception to P-37 himself on 2026-11-09 17:1xZ ('Of course, I'm making exception for the P37'). That the principle carries the same exception for the number types is the coordinator's application of it, named to him on 2026-11-16 01:5xZ, his to overturn
- Written by coordinator: 2026-11-16 01:57Z · noted · correcting the 2nd block of 2026-11-16 01:51Z · by coordinator: that block calls the exception for the number types the coordinator's application of his principle, his to overturn. His own words settle it, as he pointed out on 2026-11-16 01:5xZ ('Are you sure my earlier words don't settle this?'), read whole at the source: 2026-11-08 15:17Z, 'We must fix it once and for all, even before switchover, and bring the two implementations to do the same thing.'; 2026-11-09T17:03:11Z, 'the point was to resolve the compile time as well as walks behavior so that no internals bleed out and that the two paths are brought in line and have the exact same behavior before we get to the switchover. Will the probe do the static types in compile path as well as in the interpreter? Or were you just focusing on the compile path for the moment? Because I believe we need both.'; 2026-11-09T17:14:11Z, 'Of course, I'm making exception for the P37.' So that both paths take the form before the switch-over, the compiler's prelude included, is his position, and the exception is its consequence, not a proposal of the coordinator's

Report sections that the entry cites: [S19] `reviews/carriers-ways-2026-11-13.md`, "Way D. One object per type: each number trait merged with its one object"; [S20] `compile-ladder/plan-31/probes/number-object-merge.md`, "What was built".

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

## [S2] explorations/compile-ladder/rung-tuple-binding/REPORT.md, "What changed and why"

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

## [S3] explorations/compile-ladder/plan-31/probes/model-closure-check.md, "1. The counts"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/model-closure-check.md#1. The counts'`

explorations/compile-ladder/plan-31/probes/model-closure-check.md:16-33, 2301 bytes.

~~~~
## 1. The counts

| target | distinct sites | what they are |
|---|---|---|
| `Library/FortressLibrary.fss` and its apis | 0 | as the gate's stage (F-53); 68 s |
| `Library/System.fss` | 0 | as F-321 |
| `Library/FileSupport.fss` | 24 | `No such method FileSupport.ReadStream.eof` and `.ready` with the filter each sits in; two bodies typed against their declared `Char` and `ZZ32`; one `seq` return type; one export error (`Closeable`'s `close`) |
| `Library/File.fss` | 1 | the export check: `FileReadStream` at `File.fsi:19`, "different extends clauses, missing members" |
| C4's `FlatArrays.fss` | 31 | 23 are the index bound, in the seven declarations of lines 25 to 32 ("The static argument I does not satisfy the corresponding bound Index"); 1 is `gather`'s `T extends Number` against `Matrix`'s bound (`:169`); 7 are type errors: an unsized `Array` passed where `row`, `row3` and `plane` take a `Matrix` or an `Array3` (`:131`, `:145`, `:151`, `:157`, `:163`), `sizes` on an unsized array (`:184`), and `Diag`'s `mul` body typed `Array2` against `Matrix` (`:42`) |
| C4's `FlatData.fss` | 3 | an unsized array at `parseRow`'s `Vector` (`:63`, `:97`); the indexed assignment `tokm[d, 1 + j] := …` (`:122`) |
| C4's `MicroGptFlat.fss` | 8 | `DOT` on unsized arrays (`:27`, `:31`, `:34`); `view` and `gather` on unsized arrays (`:45`, `:57` twice); `matShape`'s `if` of pairs typed `((), ())` (`:41`); the numeral product of section 2 (`:82`) |
| the APL program's `FlatArrays2.fss` | 41 | the same kinds: index bounds, element bounds, unsized arrays, `map` and `ivmap` results |
| `AplMg.fss`, `FlatData2.fss`, `MicroGptApl.fss` | 4, 3, 6 | the same kinds; one "Could not determine all parameter types of function expression" |
| `AplMgSyntax.fsi`, the APL grammar's api | a crash | `IllegalArgumentException`, "Parameter 'apiName' to the IdOrOpOrAnonymousName constructor was null" |

So C4's three files hold 42 sites, the APL program's four hold 54 and a crash, and the two library components that only the loaders import hold 25.

Against the record: F-58 gave 26 for C4 on an earlier library. The rise is the index bound (P-156), which PLAN's phase 5 already names (item 61). `File` was 4 and is 1; `FileSupport` is 24, as it was. The numeral powers that row 533 names (`10.0^(-5)`) pass.
~~~~

## [S4] explorations/compile-ladder/plan-31/probes/switch-rehearsal.md, "microGPT's flat program"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#microGPT's flat program'`

explorations/compile-ladder/plan-31/probes/switch-rehearsal.md:217-226, 2555 bytes, cut at 2500.

~~~~
### microGPT's flat program

`fortress compile` of the four components of `explorations/run-c4/src/`, copied, under the switch. Each count is a floor, since the checker stops a block at its first failing statement (row 474).

- `FlatArrays`: its api first fails 17 times, 16 of them 'Ill-formed type: Array[\RR64,I\] The static argument I does not satisfy the corresponding bound Index.' (PLAN item 61) and one `gather[\T extends Number …\]` whose `Matrix[\T,r,c\]` wants `MultiplicativeRing[\T\]`. With `I extends Index` written at the seven generics and `gather`'s bound widened, in the copy, the component has 7 errors: one 'Function body has type Array2[\RR64,0,s,0,s2\], but declared return type is Matrix[\RR64,s,s2\]' (`FlatArrays.fss:42`), five calls that pass an unsized `Array[\RR64,(ZZ32,ZZ32)\]` or `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]` where `Matrix` or `Array3` is declared (`:131`, `:145`, `:151`, `:157`, `:163`), and 'Array[\RR64,(ZZ32, ZZ32)\] has no getter called sizes' (`:184`).
- `FlatData`: 1 error, in the library, not the program: 'the return type of File.FileReadStream->Generator[\Char\] @ Library/File.fsi:84:5-90:8 should be a subtype of the return type of FileSupport.ReadStream->Generator[\String\] @ Library/FileSupport.fsi:100:5-106:8'. PLAN's line on the components outside the distance holds `File` and `FileSupport`.
- `MicroGptFlat`: 8 errors: three `DOT` calls on two unsized `Array[\RR64,ZZ32\]` (`:27`, `:31`, `:34`), two calls of `gather`, one of `view`, one 'Function body has type ((), ()), but declared return type is (ZZ32, ZZ32)', and one ambiguous coercion.
- `MicroGptFlatQuick`: 1 error, `MicroGptFlatQuick.fss:40`, `1.0 corpus.token(d, j)`: 'Ambiguous coercion in call to operator juxtaposition: of the declarations applicable to an argument of type (RadixPointNumeral[\2,1,10,10\], ZZ32) only by coercion, none is more specific than every other: ((RR64 & {Float}), RR64)->RR64; (QQ, QQ)->QQ.'

17 errors in all, against F-58's 26 on an earlier library. The three `DOT` refusals that F-58 reads as cleared are still there, now for the unsized arrays themselves. Row 533's kind is back in another form: a numeral with a radix point times a `ZZ32` value is tied between `RR64` and `QQ`; under walk the line runs. The model's static types (decision D, P-87) are a rung's real work and the curator's decision, so the probe stops on this line here. Behind the checker stand W15 and W16, and the model's arrays sized at run time (`array[\RR64\](n)`, `NatRefle
~~~~

## [S5] explorations/compile-ladder/rung-static-argument-inferred/REPORT.md, "Step 1, row 731: the reduction"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-argument-inferred/REPORT.md#Step 1, row 731: the reduction'`

explorations/compile-ladder/rung-static-argument-inferred/REPORT.md:15-28, 3209 bytes, cut at 2500.

~~~~
### Step 1, row 731: the reduction

`SUM[j <- 0#i] f(j)` is desugared, before the checker, to `__bigOperator(BIG +(), fn (r, u) => __generate(0#i, r, fn j => u(f(j))))` (`ProjectFortress/src/com/sun/fortress/nodes_util/DesugarerUtil.java:138-197`). The checker types each argument alone first; `BIG +()` has no argument to fix `T extends AdditiveGroup[\T\]`, the bound gives no instance, the argument has no type, and the call was refused before any attempt.

`typedApplicationOfArg` (`Functionals.scala:790`) now asks `reductionApplication` (`:634`) first. It answers only for a call of `__bigOperator` whose argument is the pair of a big operator's call with no argument and no written static argument, and the clauses' function expression. The rule as built, in order:

1. Where the big operator typed alone has an instance (a plain bound, or no static parameter), the call is checked as it is written, in a try checker. If it is accepted and its type converts to the expected type, that result is the answer: nothing changes for a reduction that was accepted before. This includes the retry that gives a plain-bounded big operator the reduction's expected type (`compiler_tests/InferBigOperatorExpectedType`).
2. Else the static argument is written as the reduction's expected type, if the type meets the bounds of the big operator's one static parameter, and the call so written is checked. It is the answer if it is accepted and its type converts to the expected type. The elements are then converted to the expected type where they are passed to the unit function.
3. Else it is written as the type of the reduction's body, under the same two conditions. The body's type is read by `reductionBodyType` (`:700`): the clauses are checked at a `__bigOperator` candidate's parameter type with each of its static parameters at `Any`, and the type is that of the argument of the unit function, a numeral at its default.
4. Else nothing is accepted. Where the big operator has no instance alone, the call is then checked, for its refusal, with the body's type written, or else the expected type, where that type meets the bounds; otherwise as before.

A static argument is written only for a big operator whose declaration without arguments has exactly one static parameter, a type, and only a type that meets its bounds (`:656-679`). Both checks are the rule's own because the checker does not check a written static argument against its bound (row 470), and because a written list shorter than the 
~~~~

## [S6] explorations/compile-ladder/rung-numeral-most-specific/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-most-specific/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-numeral-most-specific/REPORT.md:13-33, 4518 bytes, cut at 2500.

~~~~
## 1. What changed and why

**The rule (P-46, P-49, P-173).** At a call, a numeral is applicable to a parameter that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type, by that coercion. Among the applicable declarations the most specific runs; where two are not ordered, the one that the default fits.

**The checker**, `scala_src/typechecker/impls/Functionals.scala`, in `typedApplicationOfChecked` only (`:807-848`, `:850`, `:944`), and `numeralTie` (`:884-928`):

- `numeralAttempt` (`:824-845`). Where the attempt by subtyping is kept and the call has a numeral argument, the most specific candidates of that attempt that need no coercion are its heads. Where a head has a numeral at a parameter whose type is not the numeral's default type, the attempt with coercion is taken with the same expected type, and of its candidates those are kept that need a coercion, only at numeral arguments (`onlyNumerals`, `:819-822`), and whose declared arrow lies strictly below every head's by subtyping of the declared domains (`coercions.moreSpecificDeclared`, `scala_src/typechecker/CoercionOracle.scala:85-88`). If there are such candidates and their result converts to the expected type, they are the call's candidates.
- `resolved` (`:850-942`) is the former tail of the function, from the candidates of an attempt to the call's candidates and type, as a local function. It is called quietly on the numeral candidates first; where they do not resolve to one declaration, it is called on the attempt that the function chose before, with its errors signalled as before (`:944`). So of two declarations not ordered, the one that the default fits stays.
- `numeralTie` (`:893`): the condition that the tied candidates differ only at numeral positions is gone; the call must have a numeral. The readings and the choice among the candidates that the readings fit are unchanged. This is fork N2: `mul(1.0, f)` and `1.0 s` resolve at the declaration that the float numeral's default, `RR64`, fits as it is.
- No signature changed. `retypedApplication`'s call (`:796-798`) stands where it was. Nothing in `checkApplicableWithInference` was touched; the rule needed no change there.

**Walk**, `interpreter/evaluator/values/OverloadedFunction.java`:

- `bestMatchForNumerals` (`:2325-2358`): after the declaration that fits the numeral as it is has been found (with the existing comparison against the one that the defaults alone fit), `belowByNumerals` is 
~~~~

## [S7] explorations/compile-ladder/rung-numeral-types/REPORT.md, "What changed and why"

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

## [S8] explorations/compile-ladder/rung-static-numerals/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-numerals/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-static-numerals/REPORT.md:11-66, 13554 bytes, cut at 2500.

~~~~
## 1. What changed and why

The rung's commits, on `wip/rung-static-numerals` from `b5b0f82c13`:

| commit | what |
|---|---|
| 8ec860f0b7 | the probe's patch, as applied (`git apply`, one whitespace warning, 90 paths, unchanged) |
| 9f33376ad4 | the prelude's `NN64` numeral coercion reads `v` as unsigned 64 bits (a file of the patch) |
| c4c9deb6bb | the fold's evaluator, `compiler/codegen/NumeralCoercionFold.java`, and its unit test |
| b35cf99c6c | the code generator's numeral places: the library's types by their own coercion, folded; one method per numeral coercion; the minus with the coercion; the static initializer's fill on demand (a file of the patch) |
| dfe04ba962 | `CoercionDesugarer.foldsTo` for folded constants only; the rung's compiled and library tests |
| 063495022b | `NumeralStaticDesignCompiled`'s `Written` coercion binds its operands first, row 971's workaround (a file of the patch) |
| 1484bf7dc9 | walk converts a folded constant at a library type from its exact value (`Numerals.java`, a file of the patch); two walk guards |
| 9af764850d | fork A8: the compiled path's `IntLiteral` and `FloatLiteral` classes and names deleted |
| 4c1a8de543 | row 957's second case as an `XXX` run pair |
| dde414aba4 | the unit test sets the compiler's library names before it reads the analyzed prelude |

**Step 1, the probe's build.** `git apply explorations/compile-ladder/plan-30/probes/draft-numerals.patch` applied with one warning, `draft-numerals.patch:432: trailing whitespace.` on `CompilerBuiltin.fsi`'s `trait ZZ` line, which the base has; no hunk failed; 90 paths, `git status --short | wc -l` printing 90. Built by `ant compileAll` and the library order: "BUILD SUCCESSFUL / Total time: 46 seconds", the five jars. Later changes to files of the patch: `CompilerBuiltin.fss` (9f33376ad4, the `NN64` coercion), `CodeGen.java` (b35cf99c6c), `NumeralStaticDesignCompiled.fss` (063495022b, row 971), `Numerals.java` (1484bf7dc9, fork A3); each reason is in its commit and below.

**Step 2, a numeral as written at a library type through the type's own coercion, folded from its body (fork A1).** `CoercionDesugarer.foldsTo` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala:44-60`) retypes only a folded constant at its library type; a numeral as written keeps its call of the type's numeral coercion, generic over its four numbers. The code generator's site rule (`CodeGen.java:7224-7237`, `numeralCoercionSiteDesc`) no longer excludes 
~~~~

## [S9] explorations/compile-ladder/rung-numeral-leftovers/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-leftovers/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-numeral-leftovers/REPORT.md:12-34, 6167 bytes, cut at 2500.

~~~~
## 1. What changed and why

All eight steps of the section are built. Rows 971, 979, 958, 967 and 974 close; row 442 loses its numeral half; row 960 has its new reproducer.

1. **An integer numeral at the prelude's RR64 and RR32** (row 442's numeral half; P-37's exception, P-174). `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:894` and `:956`, with their headers at `CompilerBuiltin.fsi:402` and `:445`:

       coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = jNumeralToDouble(v, jBigToZZ64(r).asZZ32, 0)
       coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = jNumeralToFloat(v, jBigToZZ64(r).asZZ32, 0)

   Each is its type's radix-point coercion at no digits after the point, so the value is the exact value rounded once (P-173). The fold needed no change: `NumeralCoercionFold` evaluates the body, the literal `0` included, and the class file holds the constants: `javap -p -c -constants NumeralNaturalAtFloatCompiled.class` prints `ldc2_w #85 // double 3.0d`, `ldc #104 // float 1.6777216E7f`, `ldc2_w #123 // double 1.2345678901234568E29d`, `ldc #140 // float 1.2345679E29f` and `ldc2_w #144 // double -3.0d`.
2. **A numeral coercion that starts a task** (rows 971 and 979; P-176; fork N1).
   - `MainWrapper.main` (`runtimeSystem/MainWrapper.java:92-95`) sets the program's arguments, then calls `initializeInRootTask` (`:30-46`), which reaches `FortressExecutable.initializeInRootTask` (`runtimeSystem/FortressExecutable.java:113-141`) by reflection through `icl`, the class loader's copy of the run time's classes.
   - That method makes a `FortressTaskRunnerGroup` of one thread, invokes on it a root `BaseTask` whose `compute` sets itself as the thread's task and calls `Class.forName(name, true, loader)` for each name, and shuts the pool down; `main` waits in `invoke`. What a load or an initialization throws is carried back and thrown unchanged on the main thread.
   - The names are the program's component class, then the class of each component that it imports, at any depth: `InstantiatingClassloader.componentClasses` (`runtimeSystem/InstantiatingClassloader.java:185-248`) reads the class names in the constant pools of the classes of the component's jar, and takes each top-level class whose class file is in a jar of its own name, as `NumeralCoercionSpawnImportedApi.jar!/NumeralCoercionSpawnImportedApi.class` or `fortress.CompilerBuiltin.jar!/fortress/CompilerBuiltin.class`. This is row 979's repair by the same way: every component's class
~~~~

## [S10] explorations/compile-ladder/rung-numeral-most-specific/REPORT.md, "2. The failing runs and the passing runs"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-numeral-most-specific/REPORT.md#2. The failing runs and the passing runs'`

explorations/compile-ladder/rung-numeral-most-specific/REPORT.md:35-69, 2832 bytes, cut at 2500.

~~~~
## 2. The failing runs and the passing runs

The tests were written first and run on the base's code through the harness before the edit was built (the build's log starts after both runs). After those runs the two `NumeralMostSpecific` tests gained the assertion on `width(1.5)`, the compiled one the case of a `ZZ32` typed `Any`, and all cite the section by its title; the assertions that failed are unchanged.

Compiled, on the base's code, at 2026-11-16T00:17:21Z:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base33 $PWD/tmp/old-caches junit \
        $PWD/ProjectFortress/compiler_tests/NumeralMostSpecificCompiled.test $PWD/ProjectFortress/compiler_tests/NumeralTieDefaultCompiled.test

    Ambiguous coercion in call to function mul: of the declarations applicable to an argument of type (RadixPointNumeral[\2,1,10,10\], RR32) only by coercion, none is more specific than every other: (RR64, RR64)->String; (Q, Q)->String.
    F. run .../compiler_tests/NumeralMostSpecificCompiled (539ms) java.lang.NoSuchMethodError
    Caused by: java.lang.NoSuchMethodError: 'fortress.CompilerBuiltin$String NumeralMostSpecificCompiled.\=k{...}(fortress.AnyType$Any)'
    Tests run: 4,  Failures: 3,  Errors: 0

Walk, on the base's code, at 2026-11-16T00:18:48Z (the two promoted tests under their plain names, and the new one):

    FORTRESS_HOME=/home/user/fortress-base33 /home/user/fortress-base33/explorations/compile-ladder/rung-inference-walk/harness-one.sh \
        $PWD/tmp/old-harness $PWD/ProjectFortress/tests/NumeralEqualsNumberWalk.fss $PWD/ProjectFortress/tests/NotEqualNumeral.fss $PWD/ProjectFortress/tests/NumeralMostSpecificWalk.fss

    FAIL: opr-overview.tex, the sentence on e =/= e' ...: a zero NN32 = 0
    FAIL: J3/0:any =/= J4/0:nn32; conversions-coercions.tex, ...: the numeral's own conversion reaches the more specific declaration
    FAIL: u = 0 for an NN32 zero
    Tests run: 3,  Failures: 3,  Errors: 0

After the last change of code (the tree at `8c1088c06c`):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh n3 ProjectFortress/compiler_tests \
        NumeralMostSpecificCompiled.test NumeralTieDefaultCompiled.test NumeralStaticDesignCompiled.test
    OK (6 tests)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/NumeralEqualsNumberWalk.fss \
        ProjectFortress/tests/NotEqualNumeral.fss ProjectFortress/tests/NumeralMostSpecificWalk.fss ProjectFortress
~~~~

## [S11] Specification/basic/conversions-coercions.tex, "Coercion Resolution"

`facts-extract.sh 'doc:Specification/basic/conversions-coercions.tex#Coercion Resolution'`

Specification/basic/conversions-coercions.tex:524-739, 10411 bytes, cut at 2500.

~~~~
\section{Coercion Resolution}
\seclabel{resolving-coercion}
For a given functional call, we first determine whether there exists a
declaration that is applicable without coercion.  If so, the most
specific declaration is selected; if not, then coercions are
explicitly added to the functional call.  If more than one coercion is
possible then the coercion that yields the most specific type is
chosen.  \secref{restrictions-coercion} and
\chapref{overloaded-declarations} describe overloading rules for the
declarations of coercions and overloaded functionals that guarantee
there exists always a most specific coercion when two or more are possible.
A numeral's own coercion is the one exception to this order: a declaration that
it makes applicable, every other argument being applicable without coercion,
and that is more specific, on the parameter types declared, than the most
specific declaration applicable without coercion, is selected in its place
(\secref{coercion}).
A declaration with static parameters is applicable, without or with coercion,
when some instance of it whose static arguments satisfy their bounds is, and
declarations are compared on the parameter types they declare
(\secref{functional-applicability}, \secref{resolving-overloading}); the
declaration selected is then instantiated as \secref{static-arg-inference}
describes, with the rule for a numeral whose conversions tie
(\secref{numeral-default}).
\revision{revival-overloading}{The Working Draft of February 2011 did not say
here when a declaration with static parameters is applicable.
The revival decided on 28~September 2026 that a coercion makes a call possible
and never changes which declaration runs when one is applicable without it:
declarations are chosen in the order this section gives, on the parameter types
they declare, and the declaration chosen is then instantiated.
It decided on 10~November 2026 that a numeral's own coercion is the one
exception (\secref{revival-numerals}).}

We first define a notion of more specific types in the presence of coercion.
Recall from \secref{type-relations} that Fortress defines an
\emph{exclusion} relation between types which is denoted by $\excludes$.

For types $T$ and $U$, we say that $T$ \emph{rejects} $U$,
and write $T \rejects U$, if for all coercions to $T$, the type coerced
from excludes $U$:
\[
T \rejects U \iff \forall A: A \coercedefto T \implies A \excludes U.
\]
Note that $T \rejects U$ implies $U \not\coercesto T$.

We say that $T$ is \emp
~~~~

## [S12] explorations/compile-ladder/rung-parser-declarations/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-parser-declarations/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-parser-declarations/REPORT.md:11-21, 1830 bytes.

~~~~
## What changed and why

**Row 133.** `AbsOpHeaderFront`, the api's rule for an operator's header, read its postfix alternative as `(Op / ExponentOp caret …)`: an `ExponentOp` had to be followed by a caret, which `^T` never is. The component's rule has `(Op / ExponentOp / caret …)`. The edit adds the missing `/` (`parser/Parameter.rats:171`). `parser/MethodParam.rats:82-97` changes only the first alternative of the rule and inherits the others, so the same edit gives an api's trait its `opr (self)^T`.

**Row 5.** Three edits of `parser/Symbol.rats`:

- `SUM` matches the word `SUM` or U+2211, and `PROD` the word `PROD` or U+220F (`:255`, `:257`). Both still build `BIG +` and `BIG juxtaposition`. Every production that names `SUM`, `PROD` or `Accumulator` gets the signs with no edit of its own: `FlowExpr` (`parser/Expression.rats:700`), `SingleOp` (`parser/Parameter.rats:129-131`), and through it `OpHeaderFront` and `AbsOpHeaderFront` of functions and methods.
- `singleOp` no longer takes U+2211 or U+220F (`:177-181`). This is where the sign was taken as an operator first: `ExprFront` tries `OpExpr` before `FlowExpr` (`parser/Expression.rats:45-49`), `OpExpr` reaches `Op`, and `Op` took the sign as a `singleOp` because `PrecedenceMap.isOperator` knows it (`parser_util/precedence_resolver/Operators.java:2080-2082`). The word `SUM` never got that far, because `NodeUtil.validOp` answers false for it. The planner's trial (`PROBES.md`, section 3) added the alternative to `SUM` alone and met a `Syntax Error` at the `[` after the sign for this reason.
- The comment of `Accumulator` says what `SUM` and `PROD` now are (`:262-263`).

`parser/Expression.rats` and `parser/NoNewlineExpr.rats` are not edited: their productions name `Accumulator` and needed nothing. `parser/MethodParam.rats` is not edited either.
~~~~

## [S13] explorations/compile-ladder/rung-superscript-after/REPORT.md, "The trees (points to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-superscript-after/REPORT.md#The trees (points to report)'`

explorations/compile-ladder/rung-superscript-after/REPORT.md:93-102, 825 bytes.

~~~~
## The trees (points to report)

`bin/fortress parse -out TreeProbe.ast TreeProbe.fss`, on the edit:

- `p.wq^T`: `OpExpr` of the postfix `^T` over `FieldRef(p, wq)`.
- `p.wq^T x`: a loose `Juxt` of that `OpExpr` and `VarRef x`.
- `a.m(x)^T`: `OpExpr` of the postfix `^T` over `MethodInvocation(a, m, x)`.
- `p.wq[i]^2`: `OpExpr` of the infix `^` over `SubscriptExpr(FieldRef(p, wq), i)` and the literal 2. The subscript is the dotted primary's own (`SubscriptingLeft`), not a math item.

The compiled path compiles and runs each, with walk's values: the program prints `101`, `303`, `105`, `25` under walk and compiled (`bin/fortress TreeProbe.fss`; `bin/fortress compile TreeProbe.fss`, `bin/fortress run TreeProbe`). No file of the checker or the code generator is edited: these are the nodes that `(p.wq)^T` built before.
~~~~

## [S14] explorations/compile-ladder/rung-superscript-after/REPORT.md, "Each form on the base and after"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-superscript-after/REPORT.md#Each form on the base and after'`

explorations/compile-ladder/rung-superscript-after/REPORT.md:68-91, 1857 bytes.

~~~~
## Each form on the base and after (points to report)

One program for each form, run under walk and compiled, on the old code (`tmp/…/probes/run.sh old`, through `old-fortress.sh /home/user/fortress-base33`) and on the edit (`run.sh new`). "SE" is the bare `Syntax Error` at the `^`.

| form | base, walk | base, compiled | after, walk | after, compiled |
|---|---|---|---|---|
| `x.v^T` | SE | SE | 107 | 107 |
| `(B.data^T).v` | SE | SE | 101 | 101 |
| `B.n^2` | SE | SE | 9 | 9 |
| `(B.data^*).v` | SE | SE | 201 | 201 |
| `(B.twin^T).v`, a getter | SE | SE | 102 | 102 |
| `(B.f()^T).v`, a method call | SE | SE | 101 | 101 |
| `B.n^T d` | SE | SE | 206 | 206 |
| `B.data[5]`, guard | 6 | 6 | 6 | 6 |
| `(B.data!).v`, guard | 301 | 301 | 301 | 301 |
| `(f(3))^T` | refused, "a function argument should not be immediately followed by a non-expression element" | 104 | 104 | 104 |
| `(f(3))^T d` | refused, the same | 208 | 208 | 208 |
| `((f(3))^T) d` | refused, the same | 208 | 208 | 208 |
| `(f(3))^2` | 16 | 16 | 16 | 16 |
| `f(3)^T` | refused, "Syntax Error: the argument should not be immediately followed by a non-expression element." | refused, "Item at this location must be an expression, not an operator." | the same refusal | the same refusal |
| `f(3)^2` | refused, as `f(3)^T` | refused, as `f(3)^T` | the same | the same |
| `twice(B.n)^2` | refused, as `f(3)^T` | refused, as `f(3)^T` | the same | the same |

`(f(3))^2` ran under walk on the base: the infix `^` never entered the postfix branch. `(f(3))!` and `(d^3)!` are in the test and not in this table: the probe programs of the two declared `!` on another type; on the base walk refused both ("a function argument…", "an exponentiation should not be immediately followed by a non-expression element"), which the walk test's failing run does not reach past its first assertion.
~~~~

## [S15] explorations/compile-ladder/rung-static-argument-inferred/REPORT.md, "Step 2, row 758: the reference to a generic function"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-static-argument-inferred/REPORT.md#Step 2, row 758: the reference to a generic function'`

explorations/compile-ladder/rung-static-argument-inferred/REPORT.md:30-40, 2741 bytes, cut at 2500.

~~~~
### Step 2, row 758: the reference to a generic function

The functional reference's arm (`Functionals.scala:1695`) now asks `instantiatedReference` (`:746`). The rule as built:

- The arrow type comes from the reference's expected type: the declared type of a variable or field, an assigned variable's type, a declared return type, and, for an argument, the parameter type of each candidate in the retry: `retypable` (`:1128`) now counts an argument that is a reference whose type carries static parameters, so the retry types it again with the parameter type. All of these were run (section 5).
- The static arguments are inferred with the constraint that the instance is a subtype of the arrow type (`inferStaticParamsHelper`, solved without the bounds' fallback). A parameter that the arrow type's domain bounds from below takes that type; a `nat` parameter takes the size.
- A parameter that the solution leaves at `BottomType` or at an inference variable is open: the reference is refused, "A reference to the generic function pick takes its static arguments from the arrow type that receives it, and ZZ32->ZZ32 does not fix B." A parameter that only the return type mentions is open too. As an argument the same reference is refused by the enclosing call's own message, since the retry's try checker takes the signal as a failure: "ZZ32->ZZ32->ZZ32 is not applicable to an argument of type A->ZZ32."
- A name with several declarations is not instantiated. Where a declaration without static parameters fits the arrow type, the call is accepted as before; else it is refused, "... is not applicable to an argument of type AND(Pair[\T\]->ZZ32,Box[\T\]->ZZ32)." (row 1009).
- A reference with no expected type keeps the function's type with its static parameters. Applied through an untyped variable it is refused where the call would have no place for the static arguments (`:805-811`), in place of the Java error "No place to put inferred static args in application.: Not yet implemented". Never applied, it still stops the well-formedness pass (row 1010).

Two supports outside `Functionals.scala`. In `TypeAnalyzer.pSubInner` an arrow type that carries static parameters which the kind environment does not bind is a subtype of no arrow type (`scala_src/types/TypeAnalyzer.scala:323`, `carriesOwnStaticParams` at `:1090`, as the skeptic's fix `804445961c` leaves it: one of the function's own also where the environment holds its name for another declaration's parameter): this is where 'F is
~~~~

## [S16] explorations/compile-ladder/rung-generic-function-value/REPORT.md, "The rule as built"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-generic-function-value/REPORT.md#The rule as built'`

explorations/compile-ladder/rung-generic-function-value/REPORT.md:23-30, 2140 bytes.

~~~~
## The rule as built

- **When.** At the binding of a parameter of a function or of a constructor (`NonPrimitive.buildEnvFromParams`; `F156s` for the constructor) and of a local variable declared with a type, after the place's type has matched the value.
- **From what.** From the place's run-time arrow type: the function's static arguments are those that a direct call with arguments of the arrow's domain types infers; the instance's type must be a subtype of the arrow type (so its range is checked too). A generic callee's own static parameters are fixed first, by its other arguments alone.
- **Open.** Where no declared parameter type mentions some static parameter of the function (`tag[\nat k\](x: ZZ32)`), where a type of the arrow's domain is unfixed, and at any place that is not of arrow type (`Any`, an untyped local, a type parameter), the value stays generic, and each application infers its static arguments from its arguments' run-time types, as a direct call does (`GenericFunctionOrConstructor.applyInnerPossiblyGeneric`, unchanged). P-48's rule for an unfixed parameter and walk's open parameter are untouched: the same inference runs.
- **No instance.** Where the arrow type fixes every static parameter and no instance fits, the place does not match the value, and walk answers the place's own refusal, which names the value's type: `Unification error: Closure/Constructor for app2 param 1 (f:Vector[\RR64,2\]->Vector[\RR64,3\]) got arg half[\nat n\](...) ... of type half[\n\]`. This departs from the section's words "the refusal that a direct call with those arguments gives": the match is a predicate that overload dispatch also asks, so it cannot raise the call's own error. Where the value stays generic, the refusal is the direct call's (`undefined variable [k]` for `tag`, below).
- **An overloaded name** is not instantiated at the binding. Each application chooses a declaration by its arguments' run-time types, as dispatch does everywhere in Fortress.
- **Not reached:** a top-level variable and an assignment (defect 2 below); a callee's type parameter that a value's run-time type fixes (defect 1 below).
~~~~

## [S17] explorations/compile-ladder/rung-toplevel-array-literal/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-toplevel-array-literal/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-toplevel-array-literal/REPORT.md:9-22, 2779 bytes, cut at 2500.

~~~~
## What changed and why

Commit 06b90ba6cf, on `wip/rung-toplevel-array-literal`, cut from db352c1776. Three files of walk, four tests.

Walk evaluates an array literal to a paste, an `IUOTuple` (`Evaluator.forArrayElements`). In a block, `LHSEvaluator.forLValue` builds a paste into a library array when the variable has a declared type that is the array trait of the paste's rank. At the top level nothing built it: an immutable variable's cell (`LazilyEvaluatedCell`) kept the paste, and `BuildEnvironments.forVarDecl4` then compared the paste with the declared type and stopped.

1. `LHSEvaluator.libraryArray(paste, declared, at)` (`LHSEvaluator.java:120-152`) is the block's building code, moved out of `forLValue` unchanged: the element type from the declared type, the factory `arrayK[\T, sizes\]()` at the paste's extents, the copy. It returns null where the declared type is not the array trait of the paste's rank. `forLValue` calls it (`:204-206`) and keeps its other arms as they were.
2. `LHSEvaluator.topLevelArray` (`:154-168`) calls it for a top-level variable: it returns the paste itself where nothing is built, so that `forVarDecl4`'s 'Type mismatch binding' stays the report, and it reports an element that the array refuses as 'Unification error: ...' at the literal, as `Evaluator.invokeMethod` and `Fcn.functionInvocation` do for a call (`Evaluator.java:1047-1053`). Without the wrap the run printed `null`: no call encloses a top-level binding, and the `UnificationError` lost its message on its way out of the task pool.
3. `LazilyEvaluatedCell.getValueNull` (`LazilyEvaluatedCell.java:71-74`) builds the literal of an immutable variable declared with a type when the cell is first forced, before the coercion to the declared type that the cell already made. So every reader sees the array: an initializer above the declaration, a function, an importer, and `forVarDecl4`'s check, which now passes, or refuses an array of another size.
4. `BuildEnvironments.forVarDecl4`, mutable arm (`BuildEnvironments.java:764-767`), builds a `var` variable's literal before its type check. `forVarDecl3` (`:718-723`) gives the cell that a `var` holds before its initialization the declared type, so that an initializer above it that subscripts the variable sees the array and not the paste.

A field declaration takes the same passes (`BuildObjectEnvironment` extends `BuildEnvironments`), so a field of a singleton or of a constructed object that is declared with an array type and boun
~~~~

## [S18] explorations/compile-ladder/rung-tuple-binding/REPORT.md, "The binding as compiled"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-tuple-binding/REPORT.md#The binding as compiled'`

explorations/compile-ladder/rung-tuple-binding/REPORT.md:75-79, 662 bytes.

~~~~
## The binding as compiled

- When: the right side is evaluated when the first of its names is first read, in the static initializer of the hidden class, which the JVM runs once. A single top-level variable is evaluated the same way today: `x = one()` with a printing `one` prints 'run starts' before 'one runs'.
- How many times: once. `TopLevelTupleBindingCompiled` asserts `calls = 1` after three reads of the two names at four threads.
- What each name is: a top-level variable of its own class `<Component>$<name>`, immutable or a `MutableFValue` cell, typed by its declared type or its element's type; importing components read it as any exported variable.
~~~~

## [S19] explorations/reviews/carriers-ways-2026-11-13.md, "Way D. One object per type: each number trait merged with its one object"

`facts-extract.sh 'doc:explorations/reviews/carriers-ways-2026-11-13.md#Way D. One object per type: each number trait merged with its one object'`

explorations/reviews/carriers-ways-2026-11-13.md:231-275, 4176 bytes, cut at 2500.

~~~~
### Way D. One object per type: each number trait merged with its one object

This is the library's own way for `NN32`, `RR32`, `Boolean` and `Char`, applied to the five number traits. It is way C plus one change of the library's text.

**On `ZZ32`.**

    value object ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }
        coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = v.asZZ32
        asFloat(self): RR64 = builtinPrimitive("...simpleIntArith.intToDouble")
        opr =(self, b:ZZ32):Boolean = builtinPrimitive("...simpleIntArith.intEQ")
        ...
    end

`Int` is gone. The `excludes` and `comprises` clauses go too: an object excludes every type that it does not extend. The class:

    final class ZZ32 { final int val; ... }     (one declaration, one class, one name)

**On `Boolean`.** Nothing changes: it is already this shape. The same for `Char`, `NN32`, `RR32`.

**On `String`.** Nothing changes: `String` has four objects, so it stays a trait, as in way C.

**On `Float`.** `value object RR64` takes `Float`'s 146 lines. About 50 bodies of `trait RR64` go: `opr +(self,b:RR64):RR64 = asFloat(self) + asFloat(b)` and its like (`FortressLibrary.fss:408-504`; 57 lines of the trait hold `asFloat(self)`). They served when `RR64` had four subtypes. Today every `RR64` is a `Float`, so `Float`'s own `+` is always the more specific one, and by the dispatch rule these bodies never run. By reading; no test shows it.

**Why the split is there.** It was made for two reasons, and both are gone.

- Maessen split `ZZ32` on 2008-07-15 so that `IntLiteral` could be a subtype of `ZZ32` (`fca589bbb0`: "ZZ32 is now a trait, with subtypes Int and IntLiteral"). The numerals have their own types now (P-173, P-174), and `IntLiteral` left the library.
- The other traits had subtypes by nesting: `trait ZZ64 ... comprises { Long, ZZ32 }` at the team's last commit. The tower is flat now (P-43).

So each of the five traits has exactly one object, and the split serves nothing that the record names.

**What blocks it.** Under walk, an object with native values must be in a native component. `FortressLibrary` is not one. So the five move into `FortressBuiltin`, beside `NN32` and `RR32`, or walk learns one more place. The names `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` go: by a grep of whole words, the library names them on 4, 4, 41, 4 and 4 lines, almost all in their own declarations. A few tests name one as a type, among them `tests/NumberPrintTest.fss:31-
~~~~

## [S20] explorations/compile-ladder/plan-31/probes/number-object-merge.md, "What was built"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/number-object-merge.md#What was built'`

explorations/compile-ladder/plan-31/probes/number-object-merge.md:22-48, 3909 bytes, cut at 2500.

~~~~
## What was built

The scratch tree is `/home/user/fortress-merge`, detached at `832f7d0d91`, seeded with `seed-worktree.sh`. Its diff is `number-object-merge.patch`.

**Decision: the five objects stay in `FortressLibrary`, and walk learns that these five have native values.** The review gives two places: move them into `FortressBuiltin`, or teach walk one more place. I took the second. The bodies of the five call six private functions of `FortressLibrary` (`shiftCount32`, `shiftCount64`, `powerCount32` with `highExponent32` and `lowExponent32`, `numeralRR64`; `Library/FortressLibrary.fss:662`, `:729-773`), which nothing else calls. A move takes them along, about 620 lines of objects and 50 of helpers, and moves the five types from the api `FortressLibrary` to the api `FortressBuiltin`. Staying put changes 126 lines net of library text. No decision of the curator covers the place. The cost of staying is a table of five names in walk's Java.

By file, against `832f7d0d91` (`git diff 832f7d0d91 --numstat`):

| File | Added | Deleted | What |
|---|---|---|---|
| `Library/FortressLibrary.fss` | 171 | 88 | five `trait X ... excludes ... comprises { O }` become `value object X`; each takes its object's members; in `RR64`, 56 bodies through `asFloat(self)` and 5 other overridden members go |
| `Library/FortressLibrary.fsi` | 5 | 15 | the same five headers |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` | 1 | 186 | the five objects deleted; `RR32`'s `opr ^(self, b:Float)` names `RR64` |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` | 1 | 15 | the same |
| `interpreter/evaluator/BuildEnvironments.java` | 22 | 1 | the five objects of `FortressLibrary` get a native constructor, registered when it is made |
| `interpreter/evaluator/BuildNativeEnvironment.java` | 7 | 1 | `nativeConstructorOfClass`, split from `nativeConstructor` |
| `interpreter/evaluator/types/FTraitOrObject.java` | 1 | 0 | a type parameter bounded by a value type is not refused (obstacle 5) |
| `interpreter/glue/prim/ZZ64.java`, `NN64.java`, `ZZ.java`, `RR64.java` | 48 | 0 | four constructor classes of 12 lines, each a subclass of the old one; `glue/prim/ZZ32.java` already existed |
| `tests/NativeHelperFloatCarriedWalk.fss` | 2 | 2 | its two bindings declared `Float` name `RR64` |

The library's text is 178 lines added and 304 deleted. Walk's Java is 78 added and 2 deleted. No Scala, no code generator, no checker file changed.

Not done in the scratch tree, and part of a proper cha
~~~~
