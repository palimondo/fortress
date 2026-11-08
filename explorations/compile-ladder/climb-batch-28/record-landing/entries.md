<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 157323e51..d3cd65a81 added, changed or removed (the batch 28, landed at f56d6516c, and the landing's own steps to d3cd65a81), written by evidence.py. -->

# The entries that the range changed

- The batch, 157323e51..f56d6516c: 11 entries: F-53, F-240, F-321, F-331, F-332, F-333, F-334, F-335, F-336, F-337, F-338
- After the landing, f56d6516c..d3cd65a81: 0 entries
- Now over 600 characters: 11 of 11: F-53, F-240, F-321, F-331, F-332, F-333, F-334, F-335, F-336, F-337, F-338

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-53, changed

- Size: at the base 1862 characters; at the landing 1862 characters; now 1862 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 27's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). At that gate its check of `value object Char` did not finish, so the 0 holds no completed check of that declaration's body (F-54; row 929, the checker's crash). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 28's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). At that gate its check of `value object Char` did not finish, so the 0 holds no completed check of that declaration's body (F-54; row 929, the checker's crash). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-08 08:45Z · rewritten · by climb batch 28 commit stage: the last landed gate now climb batch 28's, from compile-ladder/climb-batch-28/gate/distance.txt lines #total (0), #crash (none) and line 1 (14 components) and checker-count.txt lines #total (0), #crash (none); the per-site list compile-ladder/gate/distance-sites.tsv holds no site; only the batch number in the title changed

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-240, changed

- Size: at the base 2030 characters; at the landing 2031 characters; now 2031 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 80 s and its distance stage 144 s at the last landed gate, climb batch 27's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 90 s), over fourteen components, ran at a start load of 0.28, against 246 s (182 s) at 0.34 at climb batch 26's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-27/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 100 s and its distance stage 205 s at the last landed gate, climb batch 28's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 135 s), over fourteen components, ran at a start load of 3.42, against 144 s (90 s) at 0.28 at climb batch 27's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-28/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-08 08:45Z · rewritten · by climb batch 28 commit stage: count stage about 100 s from the file times of the gate's log (checker-count/javac.txt to run.txt, 99 s); distance stage from climb-batch-28/gate/distance.txt lines #seconds (205, FortressLibrary 135), #machine (load at start 3.42) and line 1 (14 components); compared against climb batch 27's 144 s (90 s) at 0.28

## F-321, changed

- Size: at the base 1299 characters; at the landing 1648 characters; now 1648 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-321 **Against the interpreter's prelude the checker reads the whole helper class that a binding names, so a binding of a helper of `nativeHelpers/systemOps` fails it.** `systemOps.getArgs` answers an `FStringVector` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java:29`), which `NamingCzar` maps to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:339-340`), a type that the interpreter's `FortressBuiltin` does not declare, so a component whose binding names any `systemOps` helper stops: 'FortressBuiltin.StringVector is undefined.' (row 895). So a binding passes the checker only where every method of its helper class maps to the one library's types; `FlatString`'s line separator names `stringOps.lineSeparator` for this reason. `System`'s `getEnvironment` and `getProperty` name `systemOps`, and neither stage reads `System`, so they will stop wherever the checker reads it. No test checks it: the compiled tests check against the compiler's prelude, which declares `StringVector`. Shown by the distance stage with `Library/FlatString.fss`'s `natLineSeparator` naming `systemOps.lineSeparator`: 'FortressBuiltin.StringVector is undefined.', 'File FlatString.fss has 1 error.'. Detail: `compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went".

Now:

- F-321 **Against the interpreter's prelude the checker reads the whole helper class that a binding names, so a binding of a helper of `nativeHelpers/systemOps` fails it.** `systemOps.getArgs` answers an `FStringVector` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java:24`), which `NamingCzar` maps to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:341-342`), a type that the interpreter's `FortressBuiltin` does not declare, so a component whose binding names any `systemOps` helper stops: 'FortressBuiltin.StringVector is undefined.' (row 895). So a binding passes the checker only where every method of its helper class maps to the one library's types; `FlatString`'s line separator names `stringOps.lineSeparator` for this reason. `System`'s `getEnvironment` and `getProperty` name `stringOps`, and its `args` names `programArgs`, so no binding of the one library names `systemOps`; `CompilerSystem` still imports `systemOps`' `getArgs` and `getProperty` (`Library/CompilerSystem.fss:13-14`). The checker over `System` against the one library reports no error, '### rc=0' (`WorldFlip -stop check Library/System.fss`), and neither stage reads `System`. No test checks it: the compiled tests check against the compiler's prelude, which declares `StringVector`. Shown by the distance stage with `Library/FlatString.fss`'s `natLineSeparator` naming `systemOps.lineSeparator`: 'FortressBuiltin.StringVector is undefined.', 'File FlatString.fss has 1 error.'. Detail: `compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went"; `compile-ladder/rung-system-natives/REPORT.md`, "The checker over System".

History blocks of the range:

- Written by the gather: 2026-11-08 07:41Z · rewritten · from `explorations/compile-ladder/rung-system-natives/REPORT.md`, "The checker over System" · by climb batch 28 gather (cites [S2])
- Written by the merged-diff review: 2026-11-08 08:37Z · rewritten · from `explorations/compile-ladder/climb-batch-28/RECORD.md`, "The rungs applied: the order and why" · by climb batch 28's merged-diff review: NamingCzar's StringVector mapping re-anchored to main's lines, below rung A's two imports (cites [S3])

Report sections that the entry cites: [S4] `compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went"; [S2] `compile-ladder/rung-system-natives/REPORT.md`, "The checker over System".

## F-331, added

- Size: at the base none; at the landing 1512 characters; now 1512 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-331 **The integer types convert by checked as… getters that raise IntegerOverflow, bitsAs… getters for the bits, and the low-bits names on every type, and ZZ converts out only by its getters.** On ZZ32, ZZ64, NN32, NN64 and ZZ, asZZ32, asZZ64, asNN32, asNN64 and asZZ keep the value or raise IntegerOverflow: 5 identities, 7 the coercions, 13 that can raise, 8 of them Fortress bodies or compositions and 5 bare helper bindings (simpleIntArith.longOverflowingToInt, simpleUnsignedIntArith.longOverflowingToUnsignedInt twice, simpleArbitraryPrecisionArith.bigOverflowingToLong and bigOverflowingToUnsignedLong). bitsAsNN32, bitsAsNN64, bitsAsZZ32 and bitsAsZZ64 equal unsigned and signed. narrow, widen, signed, unsigned and big keep the bits, each on every type where it applies, the value itself where it is of the result type; ZZ has big only. IntLiteral's asZZ32, asZZ64, asNN32, asNN64, asString, asExprString, = and cmp are Fortress over its asZZ. Meaning: under walk no conversion goes through a coercion and `narrow(z)` of a ZZ finds no declaration (write `z.asZZ32`); of the one library's live bindings, 6 helper bindings come and 11 glue bindings go, 5 fewer (F-299 holds the count); until the switch-over the compiled prelude has 8 of the 25 getters and no big (row 349). Test: tests/IntegerConversionsWalk, tests/IntLiteralTextWalk, compiler_tests/IntegerConversionHelpersCompiled, compiler_tests/XXXZZNarrowRungP. Detail: compile-ladder/rung-integer-conversions/REPORT.md, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-08 07:31Z · added · from `explorations/compile-ladder/rung-integer-conversions/REPORT.md`, "What changed and why" · by climb batch 28 gather (cites [S5])
- Written by the merged-diff review: 2026-11-08 08:37Z · rewritten · from `explorations/compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings" · by climb batch 28's merged-diff review: the rung's move of bindings as a delta, as the gather's other entries give it; 438, 347 and 91 were rung V's branch, not the merged tree (cites [S6])

## F-332, added

- Size: at the base none; at the landing 1330 characters; now 1330 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-332 **Walk carries `FortressLibrary`'s `JavaBufferedReader` in a Java `FortressBufferedReader`, and `FileReadStream`, `Reader`, `stdIn` and `FileWriteStream` are plain Fortress objects over the two Java-backed traits.** The trait's eight methods and its two factories, over a file name and for standard input, are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:1994-2014`); walk's loader carries the trait by its name through `FortressBuiltin`'s private native object `JavaBufferedReaderObject` (`interpreter/glue/StaticNativeApp.java:71`). `File` and `Reader` are plain components: each object holds its Java-backed value in its field `under`; `uncheckedReadChar` answers -1 at the end by the reader's `eof`, since `jbrRead` answers 0 there; `FileWriteStream` is a `WriteStream` with its `flush`. A missing file raises `FileNotFoundException` and a read after `consume` `IOFailure`, which a `catch` sees on both paths: compiled, the helper's raise builds the prelude's exception (F-336). Of the one library's live bindings, 25 leave glue classes and 10 helper bindings come (F-299 holds the count). Test: `tests/NativeHelperReaderWalk`, `compiler_tests/NativeHelperFamilyReaderCompiled`, `compiler_tests/FileOpsRaiseCaughtCompiled`. Detail: `compile-ladder/rung-io-reader/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-08 07:34Z · added · from `explorations/compile-ladder/rung-io-reader/REPORT.md`, "What changed and why" · by climb batch 28 gather (cites [S7])
- Written by the gather: 2026-11-08 07:39Z · rewritten · by climb batch 28 gather: rung H of the same batch repairs row 930, so the compiled path now catches the raises; the XXX pair is promoted to FileOpsRaiseCaughtCompiled

Report sections that the entry cites: [S7] `compile-ladder/rung-io-reader/REPORT.md`, "What changed and why".

## F-333, added

- Size: at the base none; at the landing 1445 characters; now 1445 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-333 **The one library's arrays hold their elements in a Java-backed store in a field, which walk answers with its own `AtomicArray`.** `NativeArray` is a plain component: `PrimitiveArray` and `PrimImmutableArray` hold a `JavaArrayStore` of `FortressLibrary` in the field `mem` and read through `cast[\T\]`, `PrimImmutableRR64Array` a `JavaRR64ArrayStore`, now in the api with no factory choosing it (P-84, P-85). The stores' 7 bindings name `nativeHelpers/arrayOps` over the compiled `FortressArrayStore`, an `Object[]` whose elements the compiled transaction keys by array and index (`TXReadSlot`, `TXWriteSlot`), and `FortressRR64ArrayStore`, a `double[]`; NamingCzar's walk-world table reads the two classes as the two traits. Walk's loader answers each `arrayOps` name with `ArrayOps$<name>` over `FortressBuiltin`'s private `JavaArrayStoreObject`, an `AtomicArray`, and `JavaRR64ArrayStoreObject`, a `double[]`, and refuses a name with no operation at load. A second initialisation is ignored in both arrays, by walk's store and by `FortressArrayStore` (row 466); the two RR64 stores write it and answer `true`, as `PrimImmutableRR64Array`'s glue did. The stores' 7 bindings leave glue classes (F-299 holds the count). Tests: `tests/ArrayStoreWalk`, `ArrayStoreRR64Walk`, `ArrayInitOnceWalk`, `ArrayOpsMisspeltWalk`, `compiler/runtimeValues/ArrayStoreJUTest`. Detail: `compile-ladder/rung-array-store/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-08 07:36Z · added · from `explorations/compile-ladder/rung-array-store/REPORT.md`, "What changed and why" · by climb batch 28 gather (cites [S8])

Report sections that the entry cites: [S8] `compile-ladder/rung-array-store/REPORT.md`, "What changed and why".

## F-334, added

- Size: at the base none; at the landing 938 characters; now 938 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-334 **The compiled checker orders a call's candidates, a coercion's candidates and a trait's ancestors by a linear extension of their partial order, read once a pair, so no call stops it at 32 candidates or more.** `scala_src/useful/PartialOrder.scala` gives `minimal` and `linear`, used at `Functionals.scala:718`, `:728-733`, `:764-783`, `CoercionOracle.scala:240-259` and `Formula.scala:610`; a tie among the most specific keeps the first minimal candidate in the call's order of overloadings, which follows the build as well as the program (row 935). On the one library the checker's results are those of the sort it replaced, and the distance checks `value object Char` to its end (`#crash none`). Tests: `compiler_tests/PartialOrderCandidatesCompiled`, `compiler_tests/TieAmongMostSpecificCompiled`, `PartialOrderJUTest`, the distance stage. Detail: `compile-ladder/rung-checker-partial-order/REPORT.md`, sections 1, 2, 6 and 8.

History blocks of the range:

- Written by the gather: 2026-11-08 07:37Z · added · from `explorations/compile-ladder/rung-checker-partial-order/REPORT.md`, "1. What changed and why" · by climb batch 28 gather (cites [S9])

## F-335, added

- Size: at the base none; at the landing 1128 characters; now 1128 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-335 **`Thread`'s four, `abort` and `printTaskTrace` name helpers of `nativeHelpers/runtime`, which walk answers with its glue.** The one library binds `Thread`'s `wait`, `ready` and `stop`, a private `valAny(): Any` under `val(): T = cast[\T\](valAny())` (P-162's pair), `abort` and `printTaskTrace` to `runtime.threadVal`, `threadWait`, `threadReady`, `threadStop`, `abort` and `printTaskTrace` (P-58's form, P-169); walk's loader maps the six names to `Thread$val`, `$wait`, `$ready`, `$stop`, `$abort` and `StringPrim$PrintTaskTrace` (`interpreter/glue/NativeApp.java`, `OWN_OPERATIONS`), so walk's `spawn`, transactions and trace do not change. Compiled, `abort` throws `TransactionAbortException` inside a transaction and does nothing outside one, `printTaskTrace` prints one line `Task: <class>` per task from the current one to the primordial task, and `Thread`'s four raise `FailCalled` "spawn is not compiled yet" until `spawn` compiles (row 82). Tests: `tests/RuntimeOwnOperationsWalk`, `compiler_tests/RuntimeOwnOperationsCompiled`. Detail: `compile-ladder/rung-runtime-threads/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-08 07:39Z · added · from `explorations/compile-ladder/rung-runtime-threads/REPORT.md`, "1. What changed and why" · by climb batch 28 gather (cites [S10])

Report sections that the entry cites: [S11] `compile-ladder/rung-runtime-threads/REPORT.md`, "What changed and why".

## F-336, added

- Size: at the base none; at the landing 678 characters; now 678 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-336 **A compiled helper's raise with a message builds the prelude's exception over its `String`.** `Utility.makeFortressException(name, msg)`, and `(name, e)` through it, finds the exception's constructor over `fortress.CompilerBuiltin.String` and passes an `FJavaString` (`compiler/runtimeValues/Utility.java:28-31`), so `FailCalled`, `FileNotFoundException` and `IOFailure` raised by a helper reach a `catch` on the compiled path; under walk a helper's raise still becomes the library's object of the same name, without the message (F-299). Test: `compiler_tests/HelperRaiseMessageCompiled`. Detail: `compile-ladder/rung-runtime-threads/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-08 07:39Z · added · from `explorations/compile-ladder/rung-runtime-threads/REPORT.md`, "1. What changed and why" · by climb batch 28 gather (cites [S10])

Report sections that the entry cites: [S11] `compile-ladder/rung-runtime-threads/REPORT.md`, "What changed and why".

## F-337, added

- Size: at the base none; at the landing 1348 characters; now 1348 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-337 **The compiled path's class loader loads each helper class of `nativeHelpers/` itself, so a helper reads state that the compiled main sets only through a class that the loader leaves to the system loader.** `mustUseSystemLoader` lists `MainWrapper` and no helper class (`runtimeSystem/InstantiatingClassloader.java:2897-2919`, `:2907`), so `systemOps.getArgs` and `programArgs.count` and `at` read `MainWrapper.cachedArgs` (`nativeHelpers/systemOps.java:24-26`; `nativeHelpers/programArgs.java:9-17`), which the main sets (`runtimeSystem/MainWrapper.java:67`) and walk's driver sets too (`interpreter/glue/prim/StringPrim.java:125`); a static of the helper's own, set by the main, is another copy's. What it means: a helper over the run time's state keeps that state on a delegated class. Shown: `bin/fortress run` of a program binding `programArgs.count`, with `a b`: `count =  0` over a static of `programArgs` set by `MainWrapper`, `count =  2` over `MainWrapper.cachedArgs`; test: `compiler_tests/NativeHelperProgramArgsPassedCompiled`, two arguments through the `.test` keys `arg1` and `arg2` (`tests/unit_tests/FileTests.java:553-559`), asserting the count 2 and both arguments, beside `compiler_tests/NativeHelperProgramArgsCompiled`, the count 0. Detail: `compile-ladder/rung-system-natives/REPORT.md`, "The static, and the loader".

History blocks of the range:

- Written by the gather: 2026-11-08 07:41Z · added · from `explorations/compile-ladder/rung-system-natives/REPORT.md`, "The static, and the loader" · by climb batch 28 gather (cites [S12])

Report sections that the entry cites: [S12] `compile-ladder/rung-system-natives/REPORT.md`, "The static, and the loader".

## F-338, added

- Size: at the base none; at the landing 824 characters; now 824 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-338 **The code generator compiles an object or trait whose first supertrait is an imported api's trait, also where a later supertrait gives a same-named method.** `dumpMethodChaining` reads the first supertrait's methods through `CodeGen.firstSupertraitMethods`, which names the trait of the supertrait's own declarations as the extends clause names it; `STypesUtil.allMethods` names it as the api's declaration does, without the api, and the code generator's trait table, over the component, finds such a name only in the component and the four prelude apis (`TraitTable.scala:72-101`). The same root still stops `methodsNamed` at a type-assumption call (row 940). Test: `TraitTableApiTraitCompiled`; row 940's `XXXAsIfApiTraitCompiled`. Detail: `compile-ladder/rung-codegen-trait-table/REPORT.md`, sections 1, 2 and 6.

History blocks of the range:

- Written by the gather: 2026-11-08 07:44Z · added · from `explorations/compile-ladder/rung-codegen-trait-table/REPORT.md`, "1. What changed, and why" · by climb batch 28 gather (cites [S13])

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

## [S2] explorations/compile-ladder/rung-system-natives/REPORT.md, "The checker over System"

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

## [S3] explorations/compile-ladder/climb-batch-28/RECORD.md, "The rungs applied: the order and why"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-28/RECORD.md#The rungs applied: the order and why'`

explorations/compile-ladder/climb-batch-28/RECORD.md:26-40, 2249 bytes.

~~~~
## The rungs applied: the order and why

No rung lands only with another (the manifest's `landsOnlyWith` is empty). The lowest edited line of each rung in each file that two rungs share, from `git diff -U0 157323e51...<branch>`:

| File | Rungs by their lowest edited line |
|---|---|
| `Library/FortressLibrary.fss` | V 723, R 1959, A 2390, H 4625 |
| `Library/FortressLibrary.fsi` | V 499, R 1265, A 1609 |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` | A 52, V 400, H 776, R 792 |
| `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java` | H 52, A 180 |
| `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java` | A 25, S 123 |

One way in every file that orders a pair: V before R and H; A before S. Both ways, so the manifest's order: V and A (`FortressLibrary.fss` and `.fsi` put V first, `FortressBuiltin.fss` A first), R and A (likewise), A and H (`FortressLibrary.fss` and `FortressBuiltin.fss` put A first, `NativeApp.java` H first), and R and H (`FortressLibrary.fss` R first, `FortressBuiltin.fss` H first). K and T share no file with another rung and keep the manifest's places. Every one-way pair agrees with the manifest, so the order is the manifest's: V, R, A, K, H, S, T.

The later rung's cited lines that an earlier rung's hunk shifted were re-anchored by symbol where the gather folded them (`tmp/gather/mapline.py`, a line map of the branch's file onto `main`'s, each result read at its symbol): rung R's row 928 (`Library/FortressLibrary.fss:1948-1968` to `:1983-2003`, `FortressBuiltin.fss:790`, `:795` to `:807`, `:812`, below A's and H's hunks too, as the review corrected it) and F-332 (`:1959-1979` to `:1994-2014`); rung A's row 466 (`Library/FortressLibrary.fsi:1510-1515` to `:1551-1556`) and row 932 (`.fsi:1520` to `:1561`, `.fss:2488-2492` to `:2535-2539`, `.fsi:1395` to `:1436`); rung S's F-337 (`StringPrim.java:124` to `:125`). The rungs' REPORT.md and SKEPTIC.md files land as their skeptics left them, citing their branches' lines: in a shared file, a line below another rung's hunk has moved on `main` (for example V's `FortressBuiltin.fss` lines, 8 lower since A's hunk at `:53`, and H's `:775-787`, now Thread's declarations at `FortressBuiltin.fss:790-803`).
~~~~

## [S4] explorations/compile-ladder/rung-string-natives/REPORT.md, "A site that came, and went"

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

## [S5] explorations/compile-ladder/rung-integer-conversions/REPORT.md, "What changed and why"

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

## [S6] explorations/compile-ladder/climb-batch-28/RECORD.md, "The count of the bindings"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-28/RECORD.md#The count of the bindings'`

explorations/compile-ladder/climb-batch-28/RECORD.md:56-58, 1782 bytes.

~~~~
## The count of the bindings

A count of the `builtinPrimitive` strings of the one library's `.fss` files (`Library/` and `ProjectFortress/LibraryBuiltin/`, the `Compiler` files and `AnyType` left out) gives 444 strings, 341 naming a helper, at the base, one more than F-299's 443 live bindings: the glue string of `throwError` (`Library/FortressLibrary.fss:4818`), which F-299's 102 do not hold. Each rung's commit on `main` moves the count by its branch's own deltas: V −5 bindings, +6 helpers, −11 glue; R −15, +10, −25; A 0, +7, −7; H 0, +6, −6; S +1, +2, −1; K and T none. On the merged tree it gives 425 strings, 372 naming a helper, so by F-299's count **372 of the one library's 424 live bindings name a helper and 52 a glue class**: `IntLiteral`'s 21 and `FloatLiteral`'s 3 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`) and `Reflect`'s 28 (`Library/Reflect.fss`). The batch record planned 422 and 370 with fork V1's three helper getters; rung V bound five, two of them on new helpers (V.worker.2). The gather revised Appendix I's natives effect to these numbers in rung S's commit, the last that moves a binding (`Specification/appendices/changes.tex:4627-4674`), each clause read against its binding: ZZ32's `big` (`Library/FortressLibrary.fss:860-861`), ZZ64's two getters (`:877-881`), NN64's `asNN32` (`:991-992`), ZZ's two (`:1097-1101`), the reader trait (`:1994-2014`), the two stores (`:2438-2453`), `Thread` and `abort` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:790-803`), `printTaskTrace` (`Library/FortressLibrary.fss:4689`), `args`' two (`Library/System.fss:32-33`), and the fifteen names the interpreter answers itself (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:47-65` and its rule for `arrayOps`).
~~~~

## [S7] explorations/compile-ladder/rung-io-reader/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-io-reader/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-io-reader/REPORT.md:9-51, 8048 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-io-reader`: `f27f6013` (the two tests, failing on the base), `14be0d36` (the change, the compiled guard's final form and the expected failure `XXXFileOpsRaiseCaughtCompiled`), then this report.

- `Library/FortressLibrary.fss:1959-1968`, `.fsi:1265-1279`: `trait JavaBufferedReader` gains the prelude's eight methods, each a public native in P-58's form on its `fileOps` helper; `.fss:1976-1979`, `.fsi:1284-1285`: `makeJavaBufferedReader(name: FlatString)` on `jbrOpen` and `makeJavaBufferedStdIn()` on the new `jbrStdIn`, after `makeJavaBufferedStdErr` (fork R4). The api's comment says what the reader answers at the end and after `consume`.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java:96-99`, beside `jbwStdErr`: `public static FortressBufferedReader jbrStdIn()`, a `FortressBufferedReader` named `<stdin>` over a `java.io.BufferedReader` over an `InputStreamReader` of `System.in` in UTF-8, made at each call, as the glue's `inputReader` reads `System.in` in UTF-8 (`interpreter/glue/prim/Reader.java:268-272`, `:57`).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:793-796`, right after `JavaBufferedWriterObject`: `private object JavaBufferedReaderObject extends JavaBufferedReader end`. Its native constructor is the new `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/JavaBufferedReaderObject.java`, rung W's `JavaBufferedWriterObject.java` with the reader's names: it registers itself in its Java constructor, and its nested `Value` holds a `FortressBufferedReader`; the singleton that walk makes holds none and no helper is passed it.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`, four methods: `javaFor` carries `JavaBufferedReader` by name in `FortressBufferedReader` (`:71`, its comment `:55-58`), `carried` admits that class (`:104`), `unbox` takes the reader out of a `JavaBufferedReaderObject.Value` (`:300-303`), `box` makes one (`:327`); two imports (`:4`, `:13`). `javaForSelf(String)` falls through to `javaFor`, unchanged.
- `Library/File.fss` and `.fsi`: `component File`, no longer native, and without the glue's `language` and `package`. `object FileReadStream(fileName: String, under: JavaBufferedReader) extends { ReadStream, FileStream }` (`.fss:23-45`): `asString` is the glue's text, `"<Read handle to \"" || fileName || "\">"` (fork R5); `eof`, `ready`, `whenUnconsumed`, `consume`, `uncheckedReadLine`, `uncheckedRead(k)` and `close` call `under`
~~~~

## [S8] explorations/compile-ladder/rung-array-store/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-array-store/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-array-store/REPORT.md:11-25, 6080 bytes, cut at 2500.

~~~~
## What changed and why

P-169 has the arrays' 7 bindings name compiled helpers that walk's loader answers with walk's own operations, and Q2's answer gives the compiled store shape (ii), an `Object[]` with a slot API in the compiled transaction.

- **The store traits** (`Library/FortressLibrary.fss:2391-2406`, api `Library/FortressLibrary.fsi:1610-1627`): `trait JavaArrayStore excludes { String, Number, Boolean, Char, JavaBufferedReader, JavaBufferedWriter }` with `get(i: ZZ32): Any`, `put(i: ZZ32, v: Any): ()` and `init(i: ZZ32, v: Any): Boolean`, bound to `arrayOps.get`, `put` and `init`; `trait JavaRR64ArrayStore`, which also excludes `JavaArrayStore`, with `get(i: ZZ32): RR64` and `init(i: ZZ32, v: RR64): Boolean`, bound to `arrayOps.getRR64` and `initRR64`; the factories `makeJavaArrayStore(n: ZZ32)` and `makeJavaRR64ArrayStore(n: ZZ32)`, bound to `arrayOps.make` and `makeRR64`. They sit right before `primitiveArray` and `__parr`.
- **`NativeArray`** (`ProjectFortress/LibraryBuiltin/NativeArray.fss:12-46`) is a plain component. `PrimitiveArray[\T, nat s0\]()` holds `mem: JavaArrayStore = makeJavaArrayStore(s0)`, `get(i) = cast[\T\](mem.get(i))`, `put(i, v) = mem.put(i, v)`, `init00(i, v) = mem.init(i, v)`; `PrimImmutableArray` the same without `put`; `PrimImmutableRR64Array[\nat s0\]()` holds a `JavaRR64ArrayStore` and reads `mem.get(i)`. Their `opr [ ]`, `init0` and the team's comment on a failed transaction stay. The api (`NativeArray.fsi`) before: `PrimitiveArray` and `PrimImmutableArray`, each `object ... end`; after: the same two and `object PrimImmutableRR64Array[\nat s0\]() extends ImmutableArray1[\RR64,0,s0\] end` (`:18`), so a program can make it through its own constructor; no factory chooses it (decision A).
- **Walk's native objects** (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:53-59`, right after `trait Object`'s end): `private object JavaArrayStoreObject extends JavaArrayStore end` and `private object JavaRR64ArrayStoreObject extends JavaRR64ArrayStore end`. Their native constructors (`interpreter/glue/prim/JavaArrayStoreObject.java`, `JavaRR64ArrayStoreObject.java`, new) register themselves as `JavaBufferedWriterObject` does; a store's walk value is an `AtomicArray` made with the constructor, as `PrimitiveArray.java:34-35` made one, and an RR64 store's a `double[]`, as `PrimImmutableRR64Array.java:39-46` held one.
- **Walk's loader** (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:181-188`, `:220`): afte
~~~~

## [S9] explorations/compile-ladder/rung-checker-partial-order/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-checker-partial-order/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-checker-partial-order/REPORT.md:15-28, 3056 bytes, cut at 2500.

~~~~
## 1. What changed and why

The compiled checker sorted three kinds of list with Scala's `sortWith` by an order that is partial: a call's candidates by `moreSpecific` (`Functionals.scala:761`, and `callType` at `:728`), a coercion's candidates by `moreSpecificCandidate` (`CoercionOracle.scala:255`), and a trait's ancestors by subtyping (`Formula.scala:609`), all at 157323e51. `sortWith(lt)` reads two elements that neither precedes as equal; on a partial order that equality is not transitive, and Java's TimSort, which checks the contract when it merges 32 elements or more, throws `IllegalArgumentException: Comparison method violates its general contract!` (row 929). Since climb batch 27 the distance stage stops so inside `value object Char`, at `x = -1` in `digit` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:692`), which meets 33 candidates of `=`.

The change:

- `ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala`, new, 85 lines: `class PartialOrder[T](xs: List[T], lt: (T, T) => Boolean)`. It reads `lt` at most once for each ordered pair, through a memo of n² bytes (`:21-23`, `:26-37`). An element is never compared with itself, and two places of `xs` that hold one object are not each other's predecessors (`:27`), as the base's `!(d eq c)` read them. `minimal` (`:48-50`) holds the elements that no other element precedes, in `xs`'s order, reading the pairs in the base's `minimal`'s order. `linear` (`:52-84`) is a linear extension: round by round, the first element of `xs` that no element left precedes; where every element left has one, as on a cycle, the first left (`:78`). Each element keeps the predecessor it was last found blocked by, so a later round reads on from it rather than from the start (`:55-68`); this changes which reads are repeated from the memo, never their answers.
- `Functionals.scala:718`: `minimal` over the class.
- `Functionals.scala:728-733`: `callType` takes the head of `minimal`, or `cs.head` where it is empty, and sorts nothing (fork K3); the tie type reads the same `minimal`.
- `Functionals.scala:764-768` and `:783`: one `PartialOrder` over the candidates gives `sorted` (`linear`) and `top` (`minimal`), so the two share its memo. The tie at `:831-836` keeps `sorted.headOption`, now the first minimal candidate in the candidates' order (fork K2).
- `CoercionOracle.scala:240-259`: the coercion's candidates in the class's linear extension, by `moreSpecificCandidate(c1, c2)(this)` as before.
- `Formula.sca
~~~~

## [S10] explorations/compile-ladder/rung-runtime-threads/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-runtime-threads/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-runtime-threads/REPORT.md:11-58, 5635 bytes, cut at 2500.

~~~~
## 1. What changed and why

**The six helpers** (`ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java`, fork H1), in the team's class beside `loopChunk` and `numThreads`, each with a signature that maps to Fortress:

    public static void abort()                                                   // :34-37
    public static void printTaskTrace()                                          // :41-48
    public static fortress.AnyType.Any threadVal(fortress.AnyType.Any self)      // :52-54
    public static void threadWait(fortress.AnyType.Any self)                     // :56-58
    public static boolean threadReady(fortress.AnyType.Any self)                 // :60-62
    public static void threadStop(fortress.AnyType.Any self)                     // :64-66

- `abort()` throws the compiled `runtimeSystem.TransactionAbortException` when the current thread is a `FortressTaskRunner` and `BaseTask.inATransaction()` holds, and else returns (fork H3). The compiled `atomic` catches that exception, cleans up and runs the block again (`compiler/codegen/CodeGen.java:1737-1765`); the transaction keeps its writes until it commits (`runtimeSystem/Transaction.java`, `TXWrite` and `TXCommit`), so the aborted try's writes vanish, where the block is not nested in another: in a nested block the outer block's handler takes the abort and reruns the outer block, whose first try's write stays (row 937, section 12).
- `printTaskTrace()` builds the compiled task chain, from `BaseTask.getCurrentTask()` through each task's `parent` (`runtimeSystem/BaseTask.java:46`) to the primordial task, the component's own class, one line `Task: <JVM class name>` a task, and writes it with one `print`, so that two chains printed by parallel tasks do not interleave line by line.
- `threadVal`, `threadWait`, `threadReady` and `threadStop` throw `Utility.makeFortressException("fortress.CompilerLibrary$FailCalled", "spawn is not compiled yet")` (fork H2), until the code generator compiles `spawn` (row 82).
- A nested class `runtime.TaskParent` holds the reflective read of `parent`; the wrapper generator wraps every method of a helper class, the private ones too (`compiler/nativeInterface/FortressMethodAdapter.java:215-229` has no access test), so a method over `java.lang.reflect.Field` in `runtime` itself would fail every import of the class.

**The bindings.** `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:775-787`:

    object Thread[\T\] (fcn:()->T)
        val():T         = cast[\T\]
~~~~

## [S11] explorations/compile-ladder/rung-runtime-threads/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-runtime-threads/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-runtime-threads/REPORT.md:11-58, 5635 bytes, cut at 2500.

~~~~
## 1. What changed and why

**The six helpers** (`ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java`, fork H1), in the team's class beside `loopChunk` and `numThreads`, each with a signature that maps to Fortress:

    public static void abort()                                                   // :34-37
    public static void printTaskTrace()                                          // :41-48
    public static fortress.AnyType.Any threadVal(fortress.AnyType.Any self)      // :52-54
    public static void threadWait(fortress.AnyType.Any self)                     // :56-58
    public static boolean threadReady(fortress.AnyType.Any self)                 // :60-62
    public static void threadStop(fortress.AnyType.Any self)                     // :64-66

- `abort()` throws the compiled `runtimeSystem.TransactionAbortException` when the current thread is a `FortressTaskRunner` and `BaseTask.inATransaction()` holds, and else returns (fork H3). The compiled `atomic` catches that exception, cleans up and runs the block again (`compiler/codegen/CodeGen.java:1737-1765`); the transaction keeps its writes until it commits (`runtimeSystem/Transaction.java`, `TXWrite` and `TXCommit`), so the aborted try's writes vanish, where the block is not nested in another: in a nested block the outer block's handler takes the abort and reruns the outer block, whose first try's write stays (row 937, section 12).
- `printTaskTrace()` builds the compiled task chain, from `BaseTask.getCurrentTask()` through each task's `parent` (`runtimeSystem/BaseTask.java:46`) to the primordial task, the component's own class, one line `Task: <JVM class name>` a task, and writes it with one `print`, so that two chains printed by parallel tasks do not interleave line by line.
- `threadVal`, `threadWait`, `threadReady` and `threadStop` throw `Utility.makeFortressException("fortress.CompilerLibrary$FailCalled", "spawn is not compiled yet")` (fork H2), until the code generator compiles `spawn` (row 82).
- A nested class `runtime.TaskParent` holds the reflective read of `parent`; the wrapper generator wraps every method of a helper class, the private ones too (`compiler/nativeInterface/FortressMethodAdapter.java:215-229` has no access test), so a method over `java.lang.reflect.Field` in `runtime` itself would fail every import of the class.

**The bindings.** `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:775-787`:

    object Thread[\T\] (fcn:()->T)
        val():T         = cast[\T\]
~~~~

## [S12] explorations/compile-ladder/rung-system-natives/REPORT.md, "The static, and the loader"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-system-natives/REPORT.md#The static, and the loader'`

explorations/compile-ladder/rung-system-natives/REPORT.md:28-50, 2398 bytes.

~~~~
### The static, and the loader

Fork S3 put a static `String[]` in `programArgs`, set by both drivers. Built so, with `MainWrapper.java:67` setting `programArgs.args = subargs`, the compiled path did not see the arguments:

    $ cd tmp/rung-system-natives/probe && ../../../bin/fortress compile ProgramArgsProbe.fss && ../../../bin/fortress run ProgramArgsProbe a b
    count =  0
    rc=0

The instantiating class loader loads every class itself except those that `mustUseSystemLoader` leaves to its parent (`ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:2897-2919`): `MainWrapper` is on that list (`:2907`) and no class of `nativeHelpers/` is, so the program's `programArgs` was the loader's own copy, and `MainWrapper`, loaded by the system loader, wrote the other copy's field. The team's own helper over the arguments, `systemOps.getArgs`, reads `MainWrapper.cachedArgs` for this reason (`systemOps.java:24-26`). With `programArgs` reading `MainWrapper.cachedArgs`, the same probe, on the final code `ee14222d`:

    count =  2
    at(0) =  a
    at(1) =  b
    rc=0

and with no argument, `count =  0`, rc 0. Under walk a helper class is the application loader's (`Class.forName`, `interpreter/glue/StaticNativeApp.java:175`), as are `StringPrim` and `MainWrapper`, so walk's write and read meet. A consequence: walk now initialises `MainWrapper`, and with it the instantiating loader's singleton (`MainWrapper.java:19`), in its main thread at `registerProgramArgs`; on the base it initialised neither, and it no longer initialises `systemOps` (`JAVA_FLAGS="... -Xlog:class+init=info" bin/fortress ProjectFortress/tests/SystemArgsWalk.fss`, then grep for the class names; the same on the old code):

    new: Initializing 'com/sun/fortress/runtimeSystem/MainWrapper' ... by thread "main"
    new: Initializing 'com/sun/fortress/runtimeSystem/InstantiatingClassloader' ... by thread "main"
    new: Initializing 'com/sun/fortress/nativeHelpers/programArgs'(no method) ... by thread "ForkJoinPool-1-worker-1"
    old: Initializing 'com/sun/fortress/nativeHelpers/systemOps'(no method) ... by thread "ForkJoinPool-1-worker-1"

The loader's constructor sets a system property and refuses a second loader (`InstantiatingClassloader.java:118-125`); one JVM still makes one, as a compile's JVM does. `ant testSystem` and `ant testQuick` pass on this code (below).
~~~~

## [S13] explorations/compile-ladder/rung-codegen-trait-table/REPORT.md, "1. What changed, and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-trait-table/REPORT.md#1. What changed, and why'`

explorations/compile-ladder/rung-codegen-trait-table/REPORT.md:9-17, 2346 bytes.

~~~~
## 1. What changed, and why

`dumpMethodChaining` (`CodeGen.java:916-1022`) gives an object a forwarder for each method body that it inherits from a supertrait other than the first, unless the first supertrait already brings that method through the class hierarchy. To know that, it compares the trait of each same-named method of the first supertrait with the trait of the body (`typeAnalyzer.equiv`, `:1010`). It took the first supertrait's methods from `STypesUtil.allMethods` (`:941` on the base).

`allMethods` makes its tuples in `gatherMethods` (`STypesUtil.scala:1640-1658`). A supertrait's declarations get the trait as an extends clause names it (`:1647`, the key that `mapOverAllSupertraits` puts at `:1299`). The trait's own declarations get the name that the trait's declaration gives itself (`:1651`, `ti.ast.getHeader.getName`, made into a type at `:1748-1750`). For a trait of an imported api, that is the name in the api's file, with no api name: the probe's message gives the span of the api's header, `C @ ProjectFortress/compiler_tests/TraitTableApiTraitApi.fsi:4:7`.

The code generator's trait table is made over the component and the api environment (`ProjectFortress/src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java:179`, `:206-210`). It finds a name without an api in the component, else in four prelude apis only, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra` and `GeneratorLibrary` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:72-101`, "A terrible search hack"). So `equiv` asks `typeCons` for `C`, which throws (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:884`).

The edit (`CodeGen.java:941`, `:1024-1059`): `dumpMethodChaining` reads the first supertrait's methods through a new private method, `firstSupertraitMethods`. It takes `allMethods`' relation, finds the first supertrait's index in the table by the extends clause's name, and gives each tuple whose method is one of that index's own declarations (dotted, functional, getters and setters, by identity) the trait as the extends clause names it, with the tuple's own static arguments. Every other tuple stays as `allMethods` gives it. For a local first supertrait both names find the same index, so the comparison's answer does not change for a program that compiled before.
~~~~
