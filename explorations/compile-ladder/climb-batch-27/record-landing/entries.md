<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that ed8652dc0..38887293f added, changed or removed (the batch 27, landed at a2f0b5cf2, and the landing's own steps to 38887293f), written by evidence.py. -->

# The entries that the range changed

- The batch, ed8652dc0..a2f0b5cf2: 11 entries: F-53, F-240, F-283, F-323, F-324, F-325, F-326, F-327, F-328, F-329, F-330
- After the landing, a2f0b5cf2..38887293f: 0 entries
- Now over 600 characters: 11 of 11: F-53, F-240, F-283, F-323, F-324, F-325, F-326, F-327, F-328, F-329, F-330

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-53, changed

- Size: at the base 1701 characters; at the landing 1701 characters; now 1701 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 26's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 27's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-07 11:55Z · rewritten · by climb batch 27 commit stage: the batch in the title from explorations/compile-ladder/climb-batch-27/gate/distance.txt (#total 0) and checker-count.txt (#total 0); figures unchanged

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-240, changed

- Size: at the base 1962 characters; at the landing 1960 characters; now 1960 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 180 s and its distance stage 246 s at the last landed gate, climb batch 26's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s, which no batch moved beyond noise. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 182 s), over fourteen components, ran at a start load of 0.34, against 271 s (205 s) at 0.59 at climb batch 25's. That fall has no measured cause: each gate ran the stage once, and at both gates the stage started about 10 s before `testFast`, whose four JVMs ran beside it. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-26/gate/distance.txt`. Detail: `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 80 s and its distance stage 144 s at the last landed gate, climb batch 27's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s, which no batch moved beyond noise. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 90 s), over fourteen components, ran at a start load of 0.28, against 246 s (182 s) at 0.34 at climb batch 26's. That fall has no measured cause: each gate ran the stage once, and at both gates the stage started about 10 s before `testFast`, whose four JVMs ran beside it. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-27/gate/distance.txt`. Detail: `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-07 11:55Z · rewritten · by climb batch 27 commit stage: count stage about 80 s from the file times of the gate's log (checker-count/javac.txt to run.txt, 81 s); distance stage from climb-batch-27/gate/distance.txt lines #seconds (144, FortressLibrary 90), #machine (load at start 0.28) and line 1 (14 components); compared against climb batch 26's 246 s (182 s) at 0.34

## F-283, changed

- Size: at the base 721 characters; at the landing 1409 characters; now 1409 characters, over 600.
- Section now: "The harness and the gate".

At the base:

- F-283 **All 52 programs of the team's `DemoTests` reach their end under walk.** Run one at a time from `ProjectFortress/demos`, each exits 0 and prints no "fail", within a 600 s limit and on an empty input, with `wordcount2` run from the tree's root and `tennisRanking` given the three files of `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:806-815`. The demos run in no suite, so a batch that changes walk or its library runs them again (P-79). The compiled checker still refuses `trips.fss` (row 817). No gated test: the command is the driver in `compile-ladder/rung-team-demos/REPORT.md` section 13, and its output is 'demos: 52 run, 52 reached their end'. Detail: the same report, section 3.

Now:

- F-283 **The 52 programs of the team's `DemoTests` reach their end under walk.** Run one at a time from `ProjectFortress/demos`, each exits 0 and prints no "fail", within a 600 s limit and on an empty input, with `wordcount2` run from the tree's root and `tennisRanking` given the three files of `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:806-815`. The demos run in no suite, so a batch that changes walk or its library runs them again (P-79). The compiled checker still refuses `trips.fss` (row 817). No gated test: the command is the driver in `compile-ladder/rung-team-demos/REPORT.md` section 13, and its output on climb batch 27's repaired tree is 'demos: 52 run, 52 reached their end'. `turnersParaffins0` writes its expected map's keys `0 asif ZZ32` (`ProjectFortress/demos/turnersParaffins0.fss:403-408`); they reach `ZZ32`'s overloaded `=` (`Library/FortressLibrary.fss:776-780`) at `Library/Map.fss:165` still under the assumption (row 919), which walk calls among `ZZ32`'s overloads since row 921's fix. `Generator2Demo` draws its arrays by `random` (`ProjectFortress/demos/Generator2Demo.fss:62-64`), and in one of five runs on that tree a product of them raised `IntegerOverflow` in `PROD` (`Library/FortressLibrary.fss:3566`), so a single stop of it is not a regression. Detail: the same report, section 3; `compile-ladder/climb-batch-27/REPAIR-review.md`, section 2.

History blocks of the range:

- Written by the merged-diff review: 2026-11-07 10:33Z · rewritten · from `explorations/compile-ladder/climb-batch-27/RECORD.md`, "The tests on the merged tree" · by climb batch 27 merged-diff review: the merged tree of climb batch 27: 51 of 52 (cites [S2])
- Written by the merged-diff review: 2026-11-07 10:33Z · rewritten · from `explorations/compile-ladder/climb-batch-27/RECORD.md`, "The tests on the merged tree" · by climb batch 27 merged-diff review: each of the 51; the batch run cited (cites [S2])
- Written by the merged-diff review: 2026-11-07 11:35Z · rewritten · from `explorations/compile-ladder/climb-batch-27/REPAIR-review.md`, "2. The demos" · commit `4445d848b` · by climb batch 27, the repair after the merged-diff review: back to 52 of 52 after row 921 fixed in walk; Generator2Demo random stop (cites [S3])

## F-323, added

- Size: at the base none; at the landing 1172 characters; now 1172 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-323 **The floats' natives over `Number` and `AnyIntegral` are declared at `RR64` or convert in Fortress, and group 3's six name one-line helpers.** `random`, `Float`'s `atan2`, `printThreadInfo` and the `RR64` trait's `^` and `atan2` take an `RR64`, which coercion reaches from a `ZZ32`, an `RR32` or a numeral; another number type writes `asFloat(x)` (P-165). `Float`'s power over `AnyIntegral` converts its exponent by each type's own `asFloat` around a public bare `^` at `ZZ32` on `simpleDoubleArith.doublePowInt` (P-162). `Float`'s and `RR32`'s mixed powers, `Float`'s floor and ceiling brackets, and `FlatString`'s `=` and `flatConcat` at a `Char` name new helpers that compute as their glue did, `flatConcat` past U+FFFF keeping the low 16 bits (row 872). `printThreadInfo` at `RR64` is Fortress through `asString`, so a numeral prints as a float, `3.0`. Counts on this tree alone: 315 of 448 live bindings name a helper, 133 a glue class. Test: `tests/NativeHelperFloatMixedWalk`, `tests/NativeHelperRationalArgumentWalk`, `compiler_tests/NativeHelperFamilyFloatMixedCompiled`. Detail: `compile-ladder/rung-natives-float-number/REPORT.md`, sections 1, 5 and 6.

History blocks of the range:

- Written by the gather: 2026-11-07 09:40Z · added · from `explorations/compile-ladder/rung-natives-float-number/REPORT.md`, "1. What changed and why" · by climb batch 27 gather (cites [S4])

## F-324, added

- Size: at the base none; at the landing 1073 characters; now 1073 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-324 **The one library's `Number` declares nothing; each number type declares its own `asFloat` and an `=` at each type it coerces from or into.** It builds P-160's second step and P-165. `Number`'s `comprises` clause, `asFloat`, `=` and `exactValue` are struck (`Library/FortressLibrary.fss:380-381`, `.fsi:288-289`); the nine types declare `asFloat` in their apis; 42 declarations give a pair of `=` for each of the 21 coercions, so two numbers of different types compare by value where a coercion joins them, and otherwise by the fallback `a SEQV b` or a written `asFloat(x) = y`; the vector norm is declared at each of the eight types; the reflective generator chooses among the five former listed types. A program's own number type compares by its own `=` or by the fallback. Gated by `tests/NumberOwnTypeNoAsFloatWalk`, `NumberEqualityOwnTypeWalk`, `NumberMixedEqualityWalk`, `VectorNormElementTypesWalk`, `NumberOwnTypeArrayWalk`, `NumberOpenTraitPlusBesideArrayWalk` and the team's `ReflectiveQuickCheckTest`. Detail: `compile-ladder/rung-number-open/REPORT.md`.

History blocks of the range:

- Written by the gather: 2026-11-07 09:44Z · added · from `explorations/compile-ladder/rung-number-open/REPORT.md`, "What changed and why" · by climb batch 27 gather (cites [S5])

## F-325, added

- Size: at the base none; at the landing 1339 characters; now 1339 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-325 **The code generator compiles a type assumption at a method call, at a call whose every dispatched argument is an assumption, and as a value; a partial one stays refused.** At a receiver, `(e asif T).m(args)` calls the body that `T` gives `m` as a static method of its trait's `DefaultTraitMethods` class, `self` first; where every dispatched argument of a call is an assumption, the call runs the declaration that the checker resolves, without dispatch; elsewhere the assumption is the value at `T`. A dispatched call with an assumption beside an argument that is not one is refused: 'Can't compile a dispatched call whose arguments are not all type assumptions'; so are a generic method on an assumed receiver and an overloaded generic function under an assumption, each with its own message. Walk keeps the assumption on a bound value, cannot take apart a tuple under one, and cannot call an overloaded or a generic method on an assumed receiver (rows 919 to 922). Source: `compiler/codegen/CodeGen.java`, `forAsIfExpr`, `assumedReceiverCall`, `assumedArgumentsCall`. Tests: `compiler_tests/AsIfCallsCompiled`, `compiler_tests/XXXAsIfPartialCallCompiled`, `compiler_tests/XXXAsIfGenericMethodCompiled`, `compiler_tests/XXXAsIfGenericFunctionCompiled`, `tests/AsIfCallsWalk`. Detail: `compile-ladder/rung-codegen-asif/REPORT.md`.

History blocks of the range:

- Written by the gather: 2026-11-07 09:45Z · added · from `explorations/compile-ladder/rung-codegen-asif/REPORT.md`, "1. What changed and why" · by climb batch 27 gather (cites [S6])

## F-326, added

- Size: at the base none; at the landing 991 characters; now 991 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-326 **Both paths answer `SEQV` by the specification's rule: values of different types never equivalent, value objects of one type field by field, floats by their bits, reference objects and strings only with themselves.** Walk in its value classes and `FTypeObject`'s field list; the compiled path in `equality.sEquiv`, which reads a `value` object by the mark `runtimeValues.ValueObjectMark` that the code generator adds to its class, and compares tuples element by element. Until the switch-over a compiled `===` reaches the prelude's family first, which answers `ZZ32`, `ZZ64`, `RR32` and `RR64` values, strings and booleans by `=` (P-38, row 908). Under walk a float numeral bound to `RR64` stays a `FloatLiteral`, not `SEQV` a computed `RR64`; a tuple of four or more compares by `SEQV` (row 923). Tests: `tests/StrictEquivalenceRuleWalk.fss`, `tests/ValueObjectCC64Walk.fss`, `compiler_tests/StrictEquivalenceRuleCompiled.fss`. Detail: `compile-ladder/rung-seqv-meaning/REPORT.md`.

History blocks of the range:

- Written by the gather: 2026-11-07 09:46Z · added · from `explorations/compile-ladder/rung-seqv-meaning/REPORT.md`, "What changed and why" · by climb batch 27 gather (cites [S7])

## F-327, added

- Size: at the base none; at the landing 1262 characters; now 1262 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-327 **The integers' shifts and powers over `AnyIntegral` convert their count or exponent in Fortress and call public bare bindings at narrow headers.** `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` keep `LSHIFT`, `RSHIFT` and `^` over `AnyIntegral` (and `ZZ`'s `shift`) as plain Fortress around a public bare `builtinPrimitive` binding at a `ZZ32` count (`ZZ32`, `NN32`, `ZZ`) or a `ZZ64` count (`ZZ64`, `NN64`) and a `ZZ32` exponent, declared in the api; private functions `shiftCount32`, `shiftCount64`, `powerCount32` (`Library/FortressLibrary.fss:714-761`) and `countNN32`, `exponentNN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:392-420`) keep `Int.shiftCount`'s saturation and `Int.powCount`'s sign and parity, a `ZZ` count or exponent clamped in `ZZ` and then read by `ZZ`'s `narrow`. Ten new helpers and five existing; every value of the walk guard is the glue's. Meaning: the 16 count among the helper bindings (F-299, F-32 change by 16), a `ZZ32` count or exponent reaches its bare binding directly, and P-69 and P-153 hold on both paths at these declarations. Test: `tests/NativeHelperShiftPowerWalk`, `compiler_tests/NativeHelperFamilyShiftPowerCompiled`. Detail: `compile-ladder/rung-natives-shift-power/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-07 09:46Z · added · from `explorations/compile-ladder/rung-natives-shift-power/REPORT.md`, "What changed and why" · by climb batch 27 gather (cites [S8])
- Written by the merged-diff review: 2026-11-07 10:33Z · rewritten · from `explorations/compile-ladder/climb-batch-27/RECORD.md`, "The landed commits" · by climb batch 27 merged-diff review: re-anchored to main after the batch merge (cites [S9])

Report sections that the entry cites: [S8] `compile-ladder/rung-natives-shift-power/REPORT.md`, "What changed and why".

## F-328, added

- Size: at the base none; at the landing 1037 characters; now 1037 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-328 **Walk answers the compiled helpers `stringOps.typeName` and `equality.sEquiv` with its own operations, and its ilk names the five native number objects by their traits.** The one library binds `Object.ilkName` to `stringOps.typeName` and `SEQV` over `Any` to `equality.sEquiv` (P-58's form); walk's loader maps the two names, before it looks for a helper, to `ObjectPrims$ClassName` and `AnyPrim$SEquiv` (`interpreter/glue/NativeApp.java`, `OWN_OPERATIONS`), so it never loads the two helpers. `Object.asString` is `self.ilkName`. Walk's ilk prints `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` of `FortressBuiltin` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`, also inside static arguments, tuples and arrows; other types, strings, `Char`, `Ratio`, `FloatLiteral` among them, keep their names, and walk still instantiates generics at the run-time class (F-74). Tests: `tests/AnyNativesIntrinsicWalk`, `compiler_tests/AnyNativesIntrinsicCompiled`. Detail: `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-07 09:47Z · added · from `explorations/compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why" · by climb batch 27 gather (cites [S10])

Report sections that the entry cites: [S10] `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

## F-329, added

- Size: at the base none; at the landing 797 characters; now 797 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-329 **A `Char`'s `asExprString` writes one text on both paths, which the parser reads back at every code point.** Walk's binding and the prelude's name `nativeHelpers/simpleChar.charToExprString` (P-163): `'\"'`, `'\\'`, the five escapes, the code alone for the other controls, U+201C, U+201D, U+2028, U+2029, the surrogates and past U+FFFF, else the character, a space and its code, `'é 00e9'`. The parser reads codes of four to six digits in either case (`parser/Literal.rats:460-466`). A character past U+FFFF written as itself does not parse (row 924). Test: `tests/NativeHelperFamilyCharWalk`, `compiler_tests/NativeHelperFamilyCharCompiled`, `tests/CharExprStringReadBack`; `tests/XXXCharLiteralSupplementary`. Detail: `compile-ladder/rung-char-expr-string/REPORT.md`, "Old against new".

History blocks of the range:

- Written by the gather: 2026-11-07 09:49Z · added · from `explorations/compile-ladder/rung-char-expr-string/REPORT.md`, "Old against new: every code point in six forms" · by climb batch 27 gather (cites [S11])

Report sections that the entry cites: [S12] `compile-ladder/rung-char-expr-string/REPORT.md`, "Old against new".

## F-330, added

- Size: at the base none; at the landing 1064 characters; now 1064 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-330 **Walk carries `FortressLibrary`'s `JavaBufferedWriter` in a Java `FortressBufferedWriter`, and `stdOut`, `stdErr`, `Writer` and `BufferedWriter` are plain Fortress objects over it.** The trait's `write`s, `flush` and `close` and its three factories, over a file name, standard output and standard error, are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:1948-1967`); walk's loader carries the trait by its name through `FortressBuiltin`'s private native object `JavaBufferedWriterObject` (`interpreter/glue/StaticNativeApp.java:67`), and the checker's walk-world table reads `FortressBufferedWriter` and `FortressBufferedReader` as the one library's traits (`compiler/NamingCzar.java:490-491`). A missing file raises the library's `FileNotFoundException`, which a `catch` sees. `FileWriteStream` stays on its glue: under walk no object of a native component holds a field. Test: `tests/NativeHelperWriterWalk`, `compiler_tests/NativeHelperFamilyWriterCompiled`. Detail: `compile-ladder/rung-io-writer/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-07 09:51Z · added · from `explorations/compile-ladder/rung-io-writer/REPORT.md`, "What changed and why" · by climb batch 27 gather (cites [S13])
- Written by the merged-diff review: 2026-11-07 10:33Z · rewritten · from `explorations/compile-ladder/climb-batch-27/RECORD.md`, "The landed commits" · by climb batch 27 merged-diff review: re-anchored to main after the batch merge (cites [S9])

Report sections that the entry cites: [S13] `compile-ladder/rung-io-writer/REPORT.md`, "What changed and why".

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

## [S2] explorations/compile-ladder/climb-batch-27/RECORD.md, "The tests on the merged tree"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-27/RECORD.md#The tests on the merged tree'`

explorations/compile-ladder/climb-batch-27/RECORD.md:49-60, 4412 bytes, cut at 2500.

~~~~
## The tests on the merged tree

On `c21780408`, after `ant compileAll` ('BUILD SUCCESSFUL', 'Caches /home/user/fortress/default_repository/caches started again, empty') and the library order (the five jars in `bytecode_cache/`):
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/gather/h1` on the 36 walk files and two `.test` files that the rungs added or changed in `ProjectFortress/tests/` (`git diff --name-only 87e713bad HEAD -- ProjectFortress/tests`), at 09:53:44Z: '# harness-one 2026-11-07T09:53:44Z; tree c21780408; nproc=4; load 0.58 0.36 0.33', 'OK (34 tests)'.
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh b27 ProjectFortress/compiler_tests` on the nine `.test` files the rungs added or changed: 'OK (15 tests)'.
- The gather's `XXX` test of row 925, `ProjectFortress/tests/XXXCharLiteralShortName.fss`, through the harness twice: as it is, '. interpret tmp/gather/h1/tests/XXXCharLiteralShortName com.sun.fortress.exceptions.ProgramError: null…XXXCharLiteralShortName.fss:6:11:', ' OK Saw expected exception'; with `'ALPHA'` 913 and `'alpha'` 945 for one run, 'junit.framework.AssertionFailedError: Expected failure or exception, saw none.', 'Tests run: 1,  Failures: 1,  Errors: 0'. Run directly, the program prints 'Syntax Error: a hexadecimal character literal has fewer than four hexadecimal digits.' at `:6:11` and `:7:11`.
- `python3 explorations/coordinator/tools/ledger.py landing-check ed8652dc08ecac3d713d9cc1611a1141ec9e0775` after the closes: 'ledger.py landing-check: ed8652dc0..HEAD: no finding'.
- The specification, built once on `main`'s text after the last edit under `Specification/` (`bb00aef89`'s tree), `./ant genSource` and `./ant tex` in `Specification/fortress`, with `fortress.log` a link to `/dev/null`: 'BUILD SUCCESSFUL' twice; the last of the four `pdflatex` passes prints no 'LaTeX Warning: Reference', no multiply defined label and no 'Undefined control sequence' (`grep -c` over the build's output from that pass prints 0). The PDF is `tmp/gather/fortress-batch-27.pdf` in the main tree. The build's files were removed with `git clean -fXq -- Specification`.
- The 52 team demos, by the demo driver of `compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out" (`tmp/run-demos.sh`), `bash tmp/run-demos.sh tmp/gather/b27-demos`, from 09:59Z to 10:22Z, `FORTRESS_THREADS=1`, nproc 4: 'demos: 52 run, 51 reached their end'. `turnersParaffins0` stops: its line in the summary 'turnersParaf
~~~~

## [S3] explorations/compile-ladder/climb-batch-27/REPAIR-review.md, "2. The demos"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-27/REPAIR-review.md#2. The demos'`

explorations/compile-ladder/climb-batch-27/REPAIR-review.md:33-43, 1468 bytes.

~~~~
## 2. The demos

`turnersParaffins0`, from `ProjectFortress/demos`, `../../bin/fortress turnersParaffins0.fss`: exit 0, `grep -ci fail` 0, its last line '===== Enumeration and counting paraffins & radicals completed. ====='.

The demo driver of `compile-ladder/rung-team-demos/REPORT.md`, section 13, saved as `tmp/run-demos.sh`, `FORTRESS_THREADS=1`:

- First run, 10:44Z to 11:02Z: 'demos: 52 run, 51 reached their end'. The one that stopped is `Generator2Demo`, 'Generator2Demo	STOP	rc=1	fail-in-output', with `IntegerOverflow` at `Library/FortressLibrary.fss:3566:27-29`, the join `a b` of `ProdReduction`, under the demo's `PROD[\F\]` at `ProjectFortress/demos/Generator2Demo.fss:121`. The demo's arrays are drawn by `random` (`Generator2Demo.fss:62-64`), so its products differ from run to run; the gather's run on the merged tree had it reach its end ('Generator2Demo	END	rc=0	clean'). No asif and no overloaded method on an assumed receiver is on its path.
- `Generator2Demo` alone, three times on the same tree: 'run 1 rc=0 fail=0 279s', 'run 2 rc=0 fail=0 269s', 'run 3 rc=0 fail=0 282s'.
- Second run of the driver, 11:11Z to 11:33Z: 'demos: 52 run, 52 reached their end', with 'turnersParaffins0	END	rc=0	clean	===== Enumeration and counting paraffins & radicals completed. =====' and 'Generator2Demo	END	rc=0	clean'.

`tennisRanking` writes its output file, `ProjectFortress/demos/tennis051707`, which the driver names; the file was removed after the run.
~~~~

## [S4] explorations/compile-ladder/rung-natives-float-number/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-float-number/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-natives-float-number/REPORT.md:9-34, 4272 bytes, cut at 2500.

~~~~
## 1. What changed and why

P-162 takes the bindings over `AnyIntegral` or `Number` to converting declarations around public bare bindings at narrow headers, and gives the six over carried types one-line helpers; P-165 declares `Float`'s power at a `Number` exponent, `random`, `atan2` and `printThreadInfo` at `RR64`, with the `RR64` trait's `^` and `atan2` over `Number` narrowed with them. The worktree is `/home/user/fortress-natives-float-number`, seeded from the base build (seed-worktree.sh exited 0), branch `wip/rung-natives-float-number`. Commits: `acd085aaa` (the tests), `cc792329c` (the edit).

Each binding, as written now, with its helper's Java signature:

| declaration (file:line now) | before | now |
|---|---|---|
| `Float`'s `opr ^(self, b:RR32):RR64` (FortressBuiltin.fss:156-157) | glue `Float$Pow` | new `simpleDoubleArith.doublePowFloat(double, float): double` |
| `Float`'s `opr ^(self, b:ZZ32):RR64` (:160-161), new public bare binding | none | new `simpleDoubleArith.doublePowInt(double, int): double` |
| `Float`'s `opr ^(self, b:AnyIntegral):RR64` (:162-168) | glue `Float$Pow` | `typecase b of c:ZZ32 ⇒ self^(asFloat(c)); c:ZZ64 ⇒ …; c:NN32 ⇒ …; c:NN64 ⇒ …; c:ZZ ⇒ … end`, each arm `self^(asFloat(c))`, reaching `Float`'s `^` at `RR64` (:158-159), `doublePow` |
| `Float`'s `opr ^(self, b:Number):RR64 = self^(asFloat(b))` | Fortress | deleted |
| `Float`'s `atan2(self, x:RR64):RR64` (:181-182), was `x:Number` | glue `Float$ATan2` | existing `simpleDoubleArith.doubleATan2(double, double): double` |
| `Float`'s `opr |\self/| : ZZ64` (:189-190) | glue `Float$IFloor` | new `simpleDoubleArith.doubleIFloor(double): long` |
| `Float`'s `opr |/self\| : ZZ64` (:193-194) | glue `Float$ICeiling` | new `simpleDoubleArith.doubleICeiling(double): long` |
| `RR32`'s `opr ^(self, b:Float):RR64` (:333-334) | glue `Float$Pow` | new `simpleFloatArith.floatPowDouble(float, double): double` |
| `random(a:RR64):RR64` (FortressLibrary.fss:4537, .fsi:2573), was `a:Number` | glue `Float$Random` | new `LocalRandom.scaledRandomDouble(double): double`, `scale * Math.random()` |
| `printThreadInfo(a:RR64):() = printThreadInfo(a.asString)` (FortressLibrary.fss:4633, .fsi:2635), was `a:Number` | glue `StringPrim$PrintThreadInfo` | no native: the overload over `String` (:4629-4632) |
| the `RR64` trait's `opr ^(self, b:RR64):RR64 = (asFloat(self))^b` (FortressLibrary.fss:485, .fsi:367), was `b:Number` | Fortress | same body |
| the `RR64` trait's `atan2(self, 
~~~~

## [S5] explorations/compile-ladder/rung-number-open/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-open/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-number-open/REPORT.md:11-19, 3255 bytes, cut at 2500.

~~~~
## What changed and why

- `Number` declares nothing, in both files, as the prelude's (`Library/FortressLibrary.fss:380-381`, `.fsi:288-289`): its `comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }`, abstract `asFloat`, `=` with its doc comment and `exactValue` are struck (P-160, P-165). `git grep -n exactValue` outside `explorations/` and `Specification/` named only these and a message of `tests/IntLiteralValue.fss:35`, now rewritten.
- Each type's own `asFloat`, right before its own `=`: abstract in the api of the traits `RR64`, `QQ`, `NN64`, `ZZ32`, `ZZ64` and `ZZ` (`Library/FortressLibrary.fsi:321`, `:415`, `:502`, `:561`, `:627`, `:688`), bodiless in the component (`.fss:414`, `:573`, `:724`, `:821`, `:913`, `:1008`); and in the api of the objects `RR32` and `NN32` (`asFloat(self): RR64`) and `IntLiteral` (`asFloat(self): Float`) (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:70`, `:136`, `:196`), whose bindings stay (F-311). No placement met a refusal: each line stands after the coercions and getters, where probe 8 saw 'Coercion declarations should come first.' and 'Field/getter/setter declarations should come before method declarations.' for a line after the header.
- The pairs of `=`: 21 coercions, 42 declarations, each with its api line (84 lines): 29 in `Library/FortressLibrary.fss` (`RR64` 3 at `:416-418`, `QQ` 6 at `:577-582`, `ZZ32` 5 at `:727-731`, `ZZ64` 5 at `:824-828`, `NN64` 4 at `:916-919`, `ZZ` 6 at `:1011-1016`) and 13 in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` (`RR32` 1 at `:248`, `NN32` 5 at `:403-407`, `IntLiteral` 7 at `:516-522`). The wider type `T` at the narrower `S`: `opr =(self, b:S):Boolean = do c: T = b; (self = c) end`; the narrower at the wider: `opr =(self, b:T):Boolean = do c: T = self; (c = b) end`. No pair met a refusal of walk's load check or of the checker (the count and the distance below name no pair).
- The vector norm: the one declaration over `T extends { Number, MultiplicativeRing[\T\] }` replaced by eight, `opr ||[\nat k\] me: Vector[\E,k\]|| : RR64 = SQRT asFloat(squaredNorm(me))` at `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ` and `RR32`, and `SQRT squaredNorm(me)` at `RR64` (`Library/FortressLibrary.fss:2653-2660`, `.fsi:1740-1747`). Their values at the eight element types: 5.0 for 3 and 4, 1.0 for the `QQ` elements 3/5 and 4/5, the same on the base and after (`tests/VectorNormElementTypesWalk.fss`).
- The reflective generator: `genType` takes `Number` as a special case beside `Any`, a 
~~~~

## [S6] explorations/compile-ladder/rung-codegen-asif/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-asif/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-codegen-asif/REPORT.md:9-17, 2854 bytes, cut at 2500.

~~~~
## 1. What changed and why

The specification: "The value of the expression is the value of the subexpression. ... A type assumption considers both the static and the dynamic type of the value of the expression to be the specified type for the purposes of the immediately enclosing function, method, or operator invocation or field access", "a richer version of type assumption operations such as `super` in the Java Programming Language" (`type-annotation.tex`, "Type Assumption"). The code generator now compiles the assumption in the three places the batch's forks G1 and G2 give, all in `CodeGen.java` at `3c3839fb6`:

- `forAsIfExpr` (`:6419`), new: an assumption that no call takes is the subexpression's value, cast to `T`'s Java type by `conditionallyCastParameter`.
- `forMethodInvocation` (`:6594`), at a receiver `(e asif T).m(args)`, getters among them: `assumedReceiverCall` (`:6536`) emits the static call of the body that `T` gives `m`, declared in `T` or inherited by it. `methodsNamed` (`:6456`) reads `STypesUtil.allMethodsNotIdenticallyCovered(T)`, `emitBodyGivenBy` (`:6500`) keeps the bodies whose parameters (after `self`) have the call's JVM signature, takes the one whose trait lies below the others', and emits `INVOKESTATIC <trait>$DefaultTraitMethods.<name>` with `staticBodySig` (`:6475`), the signature that `generateForwardingFor` gives the same static method. Where `T` gives `m` no body, the virtual call as before. In the plain branch, a dotted call of an overloaded method with an assumed argument is refused, since its receiver dispatches (`:6713`).
- `forFunctionalRef` (`:3927`, the call at `:4036-4040`), fed by `forOpExpr` (`:5168`, `:5178-5183`) and `for_RewriteFnApp` (`:6983`, `:7014-7019`) through the field `callArgsForAssumption` (`:6417`): `assumedArgumentsCall` (`:6557`). For a top-level function or operator whose call goes to a dispatch method (its name and signature in `topLevelOverloadedNamesAndSigs`), a call whose every argument is an assumption calls the resolved declaration's own body, `NamingCzar.mangleAwayFromOverload(name)`; a partial one is refused. For a functional method (an `ArrowType` with a `MethodInfo`), a call whose every argument is an assumption calls the static body that the assumed trait gives at `self`'s position; a partial one is refused. A call of one declaration, which no dispatch reaches, takes the values unchanged.

The messages: 'Can't compile a dispatched call whose arguments are not all type assumptions' (`:64
~~~~

## [S7] explorations/compile-ladder/rung-seqv-meaning/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-seqv-meaning/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-seqv-meaning/REPORT.md:11-35, 4484 bytes, cut at 2500.

~~~~
## What changed and why

P-168: `SEQV` is the specification's rule on both paths, with no special case for any type. P-166: `ZZ`'s and `QQ`'s values are value objects, and the specification's list follows.

Walk (`interpreter/evaluator/values/`):
- `FInt.java:53`, `FLong.java:54`, `FBigNum.java:60`, `FIntLiteral.java:78`, `FNN32.java:55`, `FNN64.java:57`: each `seqv` answers `false` for a value of another class, and compares the value within its own class. Before, `FInt` and `FLong` took each other and `FFloat`/`FFloatLiteral` by `getFloat()`, `FBigNum` and `FIntLiteral` took the floats, `FNN32` took `FNN64` and `FNN64` took `FNN32` (row 909).
- `FFloat.java:42`, `FFloatLiteral.java:43`, `FRR32.java:45`: their own class only, by raw bits. Before, `FFloat` and `FFloatLiteral` took each other, and all three took the integer classes by `==` on doubles.
- `FString.java:35`: `false`; `AnyPrim.sequiv` (`interpreter/glue/prim/AnyPrim.java:23-26`) has already answered identity. Before: text equality.
- `FOrdinaryObject.java:55`: each field through `AnyPrim.sequiv`, identity first, so a value object whose field holds a reference object is equivalent to one holding the same object; one import line added (`:17`).
- `interpreter/evaluator/types/FTypeObject.java:63-67`: the value parameters join `fields` once, after the loop over the members. Before they joined only inside the `VarDecl` branch, so an object whose body declares no field compared no fields at all (row 113), and an object with two body fields got its parameters twice.

The compiled path:
- `compiler/runtimeValues/ValueObjectMark.java`, new: an empty interface.
- `compiler/codegen/CodeGen.java:4522-4529`: `forObjectDeclPrePass` passes to `cw.visit` a copy of `superInterfaces` with the mark added when the header's modifiers hold `value`. `superInterfaces` itself is unchanged, so the springboard and `dumpMethodChaining` read what they read before. `javap -p` of a probe's value object: `public final class SeqvGenP$Vtup extends fortress.CompilerBuiltin$Object$DefaultTraitMethods implements fortress.CompilerBuiltin$Object,com.sun.fortress.compiler.runtimeValues.ValueObjectMark`.
- `nativeHelpers/equality.java:16`: `sEquiv` calls `equalityRule.sEquiv`. The class keeps its one method at `(fortress.AnyType.Any, fortress.AnyType.Any)`, which the wrapper generator maps.
- `nativeHelpers/equalityRule.java`, new, package-private, named by no binding: one object is equivalent to itself; two tuples (a superclass named `
~~~~

## [S8] explorations/compile-ladder/rung-natives-shift-power/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-natives-shift-power/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-natives-shift-power/REPORT.md:9-43, 5927 bytes, cut at 2500.

~~~~
## What changed and why

Each of the 16 declarations keeps its public header over `AnyIntegral` and its api line, converts its count or exponent in Fortress, and calls a public bare `builtinPrimitive` binding at the narrow header, which the api now declares beside it (P-162, the public spelling, fork I1). No stage refused a pair, so no bare half takes the private spelling. Commits: `c17db57e0` (the two tests), `e46dd6f40` (the edit), `baa3a18fb` (`ZZ`'s left shift onto the existing `shiftLeft`, finding 4 of `record.md`).

The bindings, each with its narrow header and its helper's Java signature:

| type | declaration over `AnyIntegral` | bare binding | helper | new? |
|---|---|---|---|---|
| `ZZ32` | `LSHIFT` (`FortressLibrary.fss:847`) | `opr LSHIFT(self,b:ZZ32):ZZ32` (`:845`) | `simpleIntArith.intBitLeftShift(int,int):int` (`simpleIntArith.java:369`) | existing |
| `ZZ32` | `RSHIFT` (`:850`) | `opr RSHIFT(self,b:ZZ32):ZZ32` (`:848`) | `simpleIntArith.intBitRightShift(int,int):int` (`:374`) | existing |
| `ZZ32` | `^` (`:855`) | `opr ^(self, b:ZZ32):ZZ32` (`:853`) | `simpleIntArith.intPower(int,int):int` (`:450`) | new |
| `ZZ64` | `LSHIFT` (`:943`) | `opr LSHIFT(self,b:ZZ64):ZZ64` (`:941`) | `simpleLongArith.longBitLeftShift(long,long):long` (`simpleLongArith.java:343`) | existing |
| `ZZ64` | `RSHIFT` (`:946`) | `opr RSHIFT(self,b:ZZ64):ZZ64` (`:944`) | `simpleLongArith.longBitRightShift(long,long):long` (`:348`) | existing |
| `ZZ64` | `^` (`:951`) | `opr ^(self, b:ZZ32):ZZ64` (`:949`) | `simpleLongArith.longPower(long,int):long` (`:403`) | new |
| `NN64` | `LSHIFT` (`:1029`) | `opr LSHIFT(self,b:ZZ64):NN64` (`:1027`) | `simpleUnsignedLongArith.unsignedLongBitLeftShift(long,long):long` (`simpleUnsignedLongArith.java:288`) | new |
| `NN64` | `RSHIFT` (`:1032`) | `opr RSHIFT(self,b:ZZ64):NN64` (`:1030`) | `simpleUnsignedLongArith.unsignedLongBitRightShift(long,long):long` (`:293`) | new |
| `NN64` | `^` (`:1037`) | `opr ^(self, b:ZZ32):NN64` (`:1035`) | `simpleUnsignedLongArith.unsignedLongPower(long,int):long` (`:300`) | new |
| `ZZ` | `LSHIFT` (`:1129`) | `opr LSHIFT(self, b:ZZ32): ZZ` (`:1127`) | `simpleArbitraryPrecisionArith.shiftLeft(BigInteger,int):BigInteger` (`simpleArbitraryPrecisionArith.java:111`) | existing |
| `ZZ` | `RSHIFT` (`:1132`) | `opr RSHIFT(self, b:ZZ32): ZZ` (`:1130`) | `simpleArbitraryPrecisionArith.bigBitRightShift(BigInteger,int):BigInteger` (`:185`) | new |
| `ZZ` | `shift` (`:1135`) | `shift(self, k:ZZ32): ZZ` (`:1133`) | `si
~~~~

## [S9] explorations/compile-ladder/climb-batch-27/RECORD.md, "The landed commits"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-27/RECORD.md#The landed commits'`

explorations/compile-ladder/climb-batch-27/RECORD.md:13-27, 964 bytes.

~~~~
## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | F, `rung-natives-float-number` | `wip/rung-natives-float-number` at `9931f03d8` | `e4872ad93` |
| 2 | N, `rung-number-open` | `wip/rung-number-open` at `9374a68c2` | `a97d60dc6` |
| 3 | G, `rung-codegen-asif` | `wip/rung-codegen-asif` at `8d577ed08` | `8caa399e8` |
| 4 | E, `rung-seqv-meaning` | `wip/rung-seqv-meaning` at `d34612957` | `598331c0d` |
| 5 | I, `rung-natives-shift-power` | `wip/rung-natives-shift-power` at `95eda2b99` | `0122a399a` |
| 6 | A, `rung-any-carrier` | `wip/rung-any-carrier` at `14e924467` | `5ae581c4a` |
| 7 | C, `rung-char-expr-string` | `wip/rung-char-expr-string` at `2f864ab0b` | `fc860b655` |
| 8 | W, `rung-io-writer` | `wip/rung-io-writer` at `747acaf2f` | `c21780408` |
| | the rows' closes | | `bb00aef89` |

FACTS entries added, one per rung: F-323 (F), F-324 (N), F-325 (G), F-326 (E), F-327 (I), F-328 (A), F-329 (C), F-330 (W).
~~~~

## [S10] explorations/compile-ladder/rung-any-carrier/REPORT.md, "What changed and why"

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

## [S11] explorations/compile-ladder/rung-char-expr-string/REPORT.md, "Old against new: every code point in six forms"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-char-expr-string/REPORT.md#Old against new: every code point in six forms'`

explorations/compile-ladder/rung-char-expr-string/REPORT.md:62-72, 2078 bytes.

~~~~
## Old against new: every code point in six forms

A scratch class (`tmp/rung-char-expr-string/sweep/CharSweepC.java`) parses `component Sw export Executable` / `c = <form>` with `compiler/Parser.parseString`, the parse both paths run first, and compares each literal's `getCharVal()` with the code point. It ran on this tree's build and on the base build's classes (`/home/user/fortress-base27/ProjectFortress/build`, read only, with caches under this tree's `tmp/`), for every code point of the BMP, of plane 1 and of plane 16, and every 7th of planes 2 to 15 (917,504 code points per form), in six forms: the helper's text, the code in lower case, in upper case, `U+` and the code, and the character with its code in lower and in upper case. Its lines on this tree include:

    helper 0..FFFF step 1: tried 65536, not read back 0 []
    helper 10000..1FFFF step 1: tried 65536, not read back 0 []
    helper 20000..FFFFF step 7: tried 131072, not read back 0 []
    helper 100000..10FFFF step 1: tried 65536, not read back 0 []
    redL 0..FFFF step 1: tried 65536, not read back 71 [0:error, 1:error, ...]

and on the base, `helper 0..FFFF ... not read back 6`, `helper 10000..1FFFF ... 6000`, `helper 20000..FFFFF step 7 ... 6857`, `helper 100000..10FFFF ... 65536`, the review's counts (section 2.4, point 12). Compared code point by code point (a `python3 -I` over the two folders of failures): in no form and range does a code point fail on this tree that the base read, and no literal reads as another character on either. So every literal that parses today parses to the same character (the reserved point is not reached). The 71 of the BMP that the redundant form refuses are the 65 controls, `"`, `\`, U+201C, U+201D, U+2028 and U+2029, exactly those the helper writes otherwise. The redundant form fails at every code point past U+FFFF on both trees (row 924). One run of the base's sweep, `redU` over planes 2 to 15, printed no line and wrote an empty file the first time; run again alone it printed `redU 20000..FFFFF step 7: tried 131072, not read back 131072`.
~~~~

## [S12] explorations/compile-ladder/rung-char-expr-string/REPORT.md, "Old against new"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-char-expr-string/REPORT.md#Old against new'`

explorations/compile-ladder/rung-char-expr-string/REPORT.md:62-72, 2078 bytes.

~~~~
## Old against new: every code point in six forms

A scratch class (`tmp/rung-char-expr-string/sweep/CharSweepC.java`) parses `component Sw export Executable` / `c = <form>` with `compiler/Parser.parseString`, the parse both paths run first, and compares each literal's `getCharVal()` with the code point. It ran on this tree's build and on the base build's classes (`/home/user/fortress-base27/ProjectFortress/build`, read only, with caches under this tree's `tmp/`), for every code point of the BMP, of plane 1 and of plane 16, and every 7th of planes 2 to 15 (917,504 code points per form), in six forms: the helper's text, the code in lower case, in upper case, `U+` and the code, and the character with its code in lower and in upper case. Its lines on this tree include:

    helper 0..FFFF step 1: tried 65536, not read back 0 []
    helper 10000..1FFFF step 1: tried 65536, not read back 0 []
    helper 20000..FFFFF step 7: tried 131072, not read back 0 []
    helper 100000..10FFFF step 1: tried 65536, not read back 0 []
    redL 0..FFFF step 1: tried 65536, not read back 71 [0:error, 1:error, ...]

and on the base, `helper 0..FFFF ... not read back 6`, `helper 10000..1FFFF ... 6000`, `helper 20000..FFFFF step 7 ... 6857`, `helper 100000..10FFFF ... 65536`, the review's counts (section 2.4, point 12). Compared code point by code point (a `python3 -I` over the two folders of failures): in no form and range does a code point fail on this tree that the base read, and no literal reads as another character on either. So every literal that parses today parses to the same character (the reserved point is not reached). The 71 of the BMP that the redundant form refuses are the 65 controls, `"`, `\`, U+201C, U+201D, U+2028 and U+2029, exactly those the helper writes otherwise. The redundant form fails at every code point past U+FFFF on both trees (row 924). One run of the base's sweep, `redU` over planes 2 to 15, printed no line and wrote an empty file the first time; run again alone it printed `redU 20000..FFFFF step 7: tried 131072, not read back 131072`.
~~~~

## [S13] explorations/compile-ladder/rung-io-writer/REPORT.md, "What changed and why"

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
