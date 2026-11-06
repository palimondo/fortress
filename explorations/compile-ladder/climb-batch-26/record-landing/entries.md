<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 4d27fbcc5..61f1c6a93 added, changed or removed (the batch 26, landed at a12ab5c60, and the landing's own steps to 61f1c6a93), written by evidence.py. -->

# The entries that the range changed

- The batch, 4d27fbcc5..a12ab5c60: 13 entries: F-32, F-34, F-53, F-181, F-240, F-252, F-277, F-299, F-307, F-318, F-319, F-320, F-321
- After the landing, a12ab5c60..61f1c6a93: 0 entries
- Now over 600 characters: 13 of 13: F-32, F-34, F-53, F-181, F-240, F-252, F-277, F-299, F-307, F-318, F-319, F-320, F-321

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-32, changed

- Size: at the base 1953 characters; at the landing 1953 characters; now 1953 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that 161 of the one library's 449 live native bindings still name.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 288 that name one). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 29 are object `IntLiteral`'s (`FortressBuiltin.fss:486-563`), 4 among the 154 and 25 among the 158; none of them can move yet, since their helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76; row 578). Every program's output needs `Writer`'s natives, among the 36 I/O methods, since `println` writes through a native `Writer`. MicroGPT's `nanoTime` names a helper (F-314); it also needs `getProgramArgsPrim`, which `System` calls as it loads; and `NativeArray`. The last two have no compiled analogue. The 42 with no analogue: `NativeArray` waits for the array decision on how a float vector's `double[]` store goes (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path. Detail: `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

Now:

- F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that 143 of the one library's 449 live native bindings still name.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 306 that name one). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 29 are object `IntLiteral`'s (`FortressBuiltin.fss:486-563`), 4 among the 154 and 25 among the 158; none of them can move yet, since their helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76; row 578). Every program's output needs `Writer`'s natives, among the 36 I/O methods, since `println` writes through a native `Writer`. MicroGPT's `nanoTime` names a helper (F-314); it also needs `getProgramArgsPrim`, which `System` calls as it loads; and `NativeArray`. The last two have no compiled analogue. The 42 with no analogue: `NativeArray` waits for the array decision on how a float vector's `double[]` store goes (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path. Detail: `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

History blocks of the range:

- Written by the gather: 2026-11-05 21:41Z · rewritten · from `explorations/compile-ladder/rung-string-natives/REPORT.md`, "Sentences made false" · by climb batch 26 gather (cites [S1])

## F-34, changed

- Size: at the base 1475 characters; at the landing 1702 characters; now 1702 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-34 **Under the switch-over's setting the code generator refuses 47 declarations of the fourteen components that the distance stage checks, in 11 kinds, all of them declarations that the checker passes.** The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. Measured once, on climb batch 25's base (`97a416b18`) with the code generator as landed, by `compile-ladder/plan-25/probes/codegen.sh` with the base's 173 helper strings put back on their glue classes; the base's code generator gave 50 in 14 kinds in the same session. The three kinds that F-315 removes, `Any` in an `extends` clause, `forbid` and the `test` modifier, no longer occur. A declaration counted at its first wall, and no emitted class was run. Each kind left has a ledger row or a plan line, among them a local function (row 304), varargs (row 624), `asif` (row 818) and "Not in the trait table" (row 733), so after the switch-over the code generator still stands between the library and bytecode. On climb batch 21b's base (`aa5c67d48`) the dispatch generator refused none of `FortressLibrary`'s 178 overload sets. No test checks it, since the gate's distance stage runs no code generation. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "5. Programs run old against new, and the probes"; `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4", item 4; `perf-probes/codegen-distance/REPORT.md`, sections 2 to 6.

Now:

- F-34 **Under the switch-over's setting the code generator refuses 38 declarations of the fourteen components that the distance stage checks, in 10 kinds, all of them declarations that the checker passes.** The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. Measured once, on climb batch 26's rung L tree (`dbf4825e0`'s code), by `compile-ladder/plan-25/probes/codegen.sh` with the tree's 288 helper strings put back on their glue classes: 'refused declarations 38 | emitted (OK lines) 703 | component failures 0', 'kinds 10'; the batch's base gave 47 in 11 kinds. The three kinds that F-315 removes, `Any` in an `extends` clause, `forbid` and the `test` modifier, and the local function, which F-320 compiles, no longer occur: the nine declarations that stopped at 'Can't compile LetFn' emit. A declaration counted at its first wall, and no emitted class was run. Each kind left has a ledger row or a plan line, among them varargs (row 624), `asif` (row 818) and "Not in the trait table" (row 733), so after the switch-over the code generator still stands between the library and bytecode. On climb batch 21b's base (`aa5c67d48`) the dispatch generator refused none of `FortressLibrary`'s 178 overload sets. No test checks it, since the gate's distance stage runs no code generation. Detail: `compile-ladder/rung-codegen-local-functions/REPORT.md`, "5. Programs run old against new; the measure"; `compile-ladder/rung-codegen-walls/REPORT.md`, "5. Programs run old against new, and the probes"; `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4", item 4; `perf-probes/codegen-distance/REPORT.md`, sections 2 to 6.

History blocks of the range:

- Written by the gather: 2026-11-05 21:39Z · rewritten · from `explorations/compile-ladder/rung-codegen-local-functions/REPORT.md`, "6. Sentences made false" · by climb batch 26 gather (cites [S2])

Report sections that the entry cites: [S3] `compile-ladder/rung-codegen-local-functions/REPORT.md`, "5. Programs run old against new; the measure"; [S4] `compile-ladder/rung-codegen-walls/REPORT.md`, "5. Programs run old against new, and the probes"; [S5] `reviews/phase3-exit/zero-audit.md`, "Part C. The debt carried into phase 4".

## F-53, changed

- Size: at the base 1701 characters; at the landing 1701 characters; now 1701 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 25's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 26's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over the interpreter's library, its twelve apis and their twelve components, running every stage of each whatever the earlier stages reported, and classes them by root cause (F-54). Since climb batch 22c the stage also checks `List`'s two imports, `CovariantCollection` and `OneShotFlag`, fourteen components in all (F-288). Climb batch 22 cleared its last five: the export error, where the `FortressLibrary` component differed from its api, by the api's lines (F-282, F-286), and four body errors, row 731's three sites and the fused arm of `__bigOperator2` (row 632), by library text (F-285). Row 731's checker gap stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing stage; the component's run now ends clean, which the stage reads as 0 (`tools/checker-count/run.sh`, since `36ec68cab`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count's stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-05 22:41Z · rewritten · by climb batch 26 commit stage: landed gate figures from compile-ladder/climb-batch-26/gate/distance.txt (#total 0) and checker-count.txt (#total 0); batch number to 26

Report sections that the entry cites: [S6] `references/batch.md`, "The checker count and the distance".

## F-181, changed

- Size: at the base 1592 characters; at the landing 1639 characters; now 1639 characters, over 600.
- Section now: "The territory map".

At the base:

- F-181 **The code generator compiles a function, method, object or trait declaration that carries a `where` clause in its own header, emitting nothing for the clause, and refuses every function or method with a contract (row 701).** The clause's constraints are the checker's. A trait's or object's contract does not reach the refusal: the disambiguator drops it (row 781); F-255 says how each path reads a `where` clause on an `extends` entry (row 774). Walk checks a function's `requires` clause and raises `CallerViolation`. The `fortress-repo` skill's `references/compiler.md`, "What the compiled path cannot compile yet", gives the refusal and the constructs that the code generator has no case for, a local function among them (row 304); an array comprehension has no case either. A trait whose `comprises` clause lists a type at a `where`-clause size, of `NatParam`'s shape, compiles; a call that opens its value to the size fails verification (row 307). Where a generic type that such a clause lists gives a member's body, the code generator crashes first (row 812). A function's or method's own clause that introduces a `where`-clause variable compiles, and the compiled call dies with `NoClassDefFoundError` (row 867). Tests: `compiler_tests/WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`; `XXXFunctionContractCodeGeneration`; the `XXXNatOpenRun` pair; the `XXXWhereVariableCallCompiled` pair. Detail: `compile-ladder/rung-codegen-where/REPORT.md`, sections 1, 2 and 5.

Now:

- F-181 **The code generator compiles a function, method, object or trait declaration that carries a `where` clause in its own header, emitting nothing for the clause, and refuses every function or method with a contract (row 701).** The clause's constraints are the checker's. A trait's or object's contract does not reach the refusal: the disambiguator drops it (row 781); F-255 says how each path reads a `where` clause on an `extends` entry (row 774). Walk checks a function's `requires` clause and raises `CallerViolation`. The `fortress-repo` skill's `references/compiler.md`, "What the compiled path cannot compile yet", gives the refusal and the constructs that the code generator has no case for; an array comprehension has no case either. A local function compiles as a closure, except in the three forms of row 304 (F-320). A trait whose `comprises` clause lists a type at a `where`-clause size, of `NatParam`'s shape, compiles; a call that opens its value to the size fails verification (row 307). Where a generic type that such a clause lists gives a member's body, the code generator crashes first (row 812). A function's or method's own clause that introduces a `where`-clause variable compiles, and the compiled call dies with `NoClassDefFoundError` (row 867). Tests: `compiler_tests/WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`; `XXXFunctionContractCodeGeneration`; the `XXXNatOpenRun` pair; the `XXXWhereVariableCallCompiled` pair. Detail: `compile-ladder/rung-codegen-where/REPORT.md`, sections 1, 2 and 5.

History blocks of the range:

- Written by the gather: 2026-11-05 21:39Z · rewritten · from `explorations/compile-ladder/rung-codegen-local-functions/REPORT.md`, "6. Sentences made false" · by climb batch 26 gather (cites [S2])

Report sections that the entry cites: [S7] `references/compiler.md`, "What the compiled path cannot compile yet".

## F-240, changed

- Size: at the base 1975 characters; at the landing 1975 characters; now 1975 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 160 s and its distance stage 271 s at the last landed gate, climb batch 25's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 24's it stayed between about 150 s and 170 s, which no batch moved beyond noise. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 205 s), over fourteen components, ran at a start load of 0.59, against 198 s (152 s) at 1.84 at climb batch 24's. That rise has no measured cause: each gate ran the stage once, and at climb batch 25's gate the stage started 9 s before `testFast`, whose four JVMs ran beside it, where at climb batch 24's it started 53 s before. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-25/gate/distance.txt`. Detail: `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 180 s and its distance stage 246 s at the last landed gate, climb batch 26's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 24's it stayed between about 150 s and 170 s, which no batch moved beyond noise. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 182 s), over fourteen components, ran at a start load of 0.34, against 271 s (205 s) at 0.59 at climb batch 25's. That rise has no measured cause: each gate ran the stage once, and at climb batch 25's gate the stage started 9 s before `testFast`, whose four JVMs ran beside it, where at climb batch 24's it started 53 s before. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-26/gate/distance.txt`. Detail: `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-05 22:41Z · rewritten · by climb batch 26 commit stage: count stage about 180 s from the file times of the gate's log (checker-count/javac.txt to run.txt, 178 s); distance stage from compile-ladder/climb-batch-26/gate/distance.txt #seconds 246 (FortressLibrary 182) and #machine load at start 0.34, over the 14 components of its first line; compared against climb batch 25's 271 s (205 s) at 0.59

## F-252, changed

- Size: at the base 4037 characters; at the landing 4262 characters; now 4262 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-252 **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own, the load check reads the pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules.** A declaration with static parameters of its own is a generic function, a generic object's constructor, or a functional method that declares static parameters in a trait or object that has none. Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads. It reads two generic functions of one name and one list of static parameters at one shared symbolic instantiation, and two instances of one generic object as two object types that cannot be extended, so they exclude. So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `trait P[\T\] excludes { Q[\T\] }`, excludes at one `T`, though a type that extends `P[\ZZ32\]` and `Q[\String\]` has both. Walk then reads such an exclusion again over the instances of each, and withdraws it where their instances do not exclude. Instances of one generic type exclude only where their static arguments cannot be equal. Any other exclusion stands where the two still exclude with their static parameters renamed apart. Or, read at the shared instantiation, it stands where every generic type that both extend forces their static arguments to be equal, since no type extends two instances of one generic trait: so `Array` and `ImmutableArray` exclude at every pair of instances through `ReadableArray`. A pair whose exclusion is withdrawn is read on its declared domains as a refused pair is. It reads a refused pair of two such declarations again, each over all its own instances, and loads the pair if it meets the three rules. A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274). F-275 holds the Return Type Rule. The parameter check does not find two instances of one generic type at different ground static arguments excluding, such as `Tg[\3\]` and `Tg[\4\]`, so two plain declarations so typed are refused (row 416). Two declarations with static parameters of their own so typed load where the reading of the whole parameter type finds the instances apart, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` loads and runs (F-155, F-258). For the Meet Rule, walk looks for a third declaration that covers the overlap only where, at each position, the two parameter types are equal, or one of them is a static parameter, or both are instances of one generic type whose static arguments match in the same way (row 539). This search reads a bound that names its own parameter from the declarations, so two such bounds meet, and unifies a symbolic size with a size parameter (`types/SymbolicNat.unifyStaticArg`). A pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (F-258; row 787). A pair with a varargs parameter is not read again and keeps the parameter check's refusal (F-257). At a call, walk compares a functional method of a generic trait or object on the instance that the call makes. It compares a generic dotted method in the same way, except where exactly one of the two declared domains lies inside the other; there it chooses the inner one (F-253). Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk` and `GenericPairNestedBoundsWalk` (load and dispatch), and the expected failure `XXXOverloadExistentialMeetWalk` (row 539); for the withdrawal, as refusals at load, by `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` and `GenericOverloadInstancesApartWalk`, and as programs that load, by `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest` and `GenericPairExcludesTogetherWalk`. Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", and section 9.

Now:

- F-252 **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own, or one beside a functional method of a generic trait that declares none of its own, the load check reads the pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules.** A declaration with static parameters of its own is a generic function, a generic object's constructor, or a functional method that declares static parameters in a trait or object that has none. Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads. It reads two generic functions of one name and one list of static parameters at one shared symbolic instantiation, and two instances of one generic object as two object types that cannot be extended, so they exclude. So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `trait P[\T\] excludes { Q[\T\] }`, excludes at one `T`, though a type that extends `P[\ZZ32\]` and `Q[\String\]` has both. Walk then reads such an exclusion again over the instances of each, and withdraws it where their instances do not exclude. Instances of one generic type exclude only where their static arguments cannot be equal. Any other exclusion stands where the two still exclude with their static parameters renamed apart. Or, read at the shared instantiation, it stands where every generic type that both extend forces their static arguments to be equal, since no type extends two instances of one generic trait: so `Array` and `ImmutableArray` exclude at every pair of instances through `ReadableArray`. A pair whose exclusion is withdrawn is read on its declared domains as a refused pair is. It reads a refused pair of two such declarations again, each over all its own instances, and loads the pair if it meets the three rules. An own generic beside such a functional method is read as two own generics, the trait's static parameters standing for the method's (F-318). A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274). F-275 holds the Return Type Rule. The parameter check does not find two instances of one generic type at different ground static arguments excluding, such as `Tg[\3\]` and `Tg[\4\]`, so two plain declarations so typed are refused (row 416). Two declarations with static parameters of their own so typed load where the reading of the whole parameter type finds the instances apart, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` loads and runs (F-155, F-258). For the Meet Rule, walk looks for a third declaration that covers the overlap only where, at each position, the two parameter types are equal, or one of them is a static parameter, or both are instances of one generic type whose static arguments match in the same way (row 539). This search reads a bound that names its own parameter from the declarations, so two such bounds meet, and unifies a symbolic size with a size parameter (`types/SymbolicNat.unifyStaticArg`). A pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (F-258; row 787). A pair with a varargs parameter is not read again and keeps the parameter check's refusal (F-257). At a call, walk compares a functional method of a generic trait or object on the instance that the call makes. It compares a generic dotted method in the same way, except where exactly one of the two declared domains lies inside the other; there it chooses the inner one (F-253). Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk` and `GenericPairNestedBoundsWalk` (load and dispatch), and the expected failure `XXXOverloadExistentialMeetWalk` (row 539); for the withdrawal, as refusals at load, by `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` and `GenericOverloadInstancesApartWalk`, and as programs that load, by `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest` and `GenericPairExcludesTogetherWalk`. Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", and section 9.

History blocks of the range:

- Written by the gather: 2026-11-05 21:35Z · rewritten · from `explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md`, "8. Sentences made false" · by climb batch 26 gather (cites [S8])

## F-277, changed

- Size: at the base 1320 characters; at the landing 1353 characters; now 1353 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-277 **The compiled checker's overloading exclusion test reads the `self` of a trait whose self type comes from its F-bound as `C[\X\] & X`, and each static parameter at the top of the two domains' meet as its declared bounds; every other rule of overloading keeps the plain signatures.** It builds P-157. The second arrow is made from the declaration's own parameters (`FunctionalMethod.ast`) only where they differ from `parameters()` (`scala_src/typechecker/OverloadingChecker.scala`), and the bounds are read in one more conjunct of the reduction's constraint, alone and never beside the parameter (`scala_src/types/TypeSchemaAnalyzer.scala`, `meetEmptyWithBounds`, a third way to be valid in `OverloadingOracle.excludes`). With the full check on, the 8 pairs between `AdditiveGroup`'s `+` and `-` and the generic scalar block clear (191 to 183, no library line), and the count stage under it is 98. `tint` stays refused, `Box[\Bottom\]` being an instance of both domains (row 786); row 713's pair is accepted and runs, and walk refuses it at load; walk refuses at load the vector pairs' shape in a program's own component (row 804). Gated by `compiler_tests/Exclusion*`, `XXXExclusion*` and `OverloadTwoBoundsClosedTraitExclusion`. Detail: `compile-ladder/rung-self-type-exclusion/REPORT.md` sections 1, 2 and 4.

Now:

- F-277 **The compiled checker's overloading exclusion test reads the `self` of a trait whose self type comes from its F-bound as `C[\X\] & X`, and each static parameter at the top of the two domains' meet as its declared bounds; every other rule of overloading keeps the plain signatures.** It builds P-157. The second arrow is made from the declaration's own parameters (`FunctionalMethod.ast`) only where they differ from `parameters()` (`scala_src/typechecker/OverloadingChecker.scala`), and the bounds are read in one more conjunct of the reduction's constraint, alone and never beside the parameter (`scala_src/types/TypeSchemaAnalyzer.scala`, `meetEmptyWithBounds`, a third way to be valid in `OverloadingOracle.excludes`). With the full check on, the 8 pairs between `AdditiveGroup`'s `+` and `-` and the generic scalar block clear (191 to 183, no library line), and the count stage under it is 98. `tint` stays refused, `Box[\Bottom\]` being an instance of both domains (row 786); row 713's pair is accepted and runs, and walk refuses it at load; walk loads the vector pairs' shape in a program's own component too, reading `self` so in its exclusion test (F-318). Gated by `compiler_tests/Exclusion*`, `XXXExclusion*` and `OverloadTwoBoundsClosedTraitExclusion`. Detail: `compile-ladder/rung-self-type-exclusion/REPORT.md` sections 1, 2 and 4.

History blocks of the range:

- Written by the gather: 2026-11-05 21:35Z · rewritten · from `explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md`, "8. Sentences made false" · by climb batch 26 gather (cites [S8])

## F-299, changed

- Size: at the base 2339 characters; at the landing 3263 characters; now 3263 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 288 of the one library's 449 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. `FlatString` and `JavaString` carry no `self`, since a program can name its own types so; a helper binding of a `FlatString` method would stop every program at load. Its departures: a generic owner's dotted method is checked only where an instance is made (row 864); the declaring type is read, not the value's, so a program's object that extends a carried trait against its `comprises` clause passes the helper a value that no Java type carries (row 551); a native over `String` receives a non-flat string's type name (row 846). The 288 by type: `ZZ32` 25 and `Int` 3, `ZZ64` 26 and `ZZ` 22 (F-306), the five types' `REM` and `MOD` (F-312) and their divisors (F-314) among them, `ZZ32`'s and `ZZ64`'s `CHOOSE` among them (F-305), `Float` 57 and the top-level `fromRawBits` (F-303), `RR32` 50 (F-310, its `asFloat` F-311), the `asFloat`s of `Long` and `BigNum` 2 (F-311), the small rest 8 (F-307), and `NN32` 27, `NN64` 24, `UnsignedLong` 3 and `Char` 39 (F-308, F-313), and the top-level `nanoTime` (F-314); the other 161 name glue classes. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers and the messages. Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `ZZ32RemainderByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperFamilyFloatBitsWalk`, `NativeHelperFamilyRR32Walk`, `NativeHelperFamilyAsFloatWalk`, `NativeHelperFamilyDivisorsWalk`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk` and `NativeHelperUncarriedSelf*Walk`. Detail: `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why".

Now:

- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 306 of the one library's 449 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. The library's own `FlatString`, told by its declaring component, carries `self` in a Java `String` (`javaForSelf(FType)`, `declaringComponent`); a program's own type named `FlatString` or `JavaString` carries none. A helper parameter declared `String` is refused at load, 'no Java type carries the declared type of parameter', since a Java `String` cannot carry a rope; one declared `FlatString` or `JavaString`, and a result declared `String`, are carried in a Java `String`. Its departures: a generic owner's dotted method is checked only where an instance is made (row 864); the declaring type is read, not the value's, so a program's object that extends a carried trait against its `comprises` clause passes the helper a value that no Java type carries (row 551); a glue class bound over `String` receives a non-flat string's type name (row 846). The 306 by type: `ZZ32` 25 and `Int` 3, `ZZ64` 26 and `ZZ` 22 (F-306), the five types' `REM` and `MOD` (F-312) and their divisors (F-314) among them, `ZZ32`'s and `ZZ64`'s `CHOOSE` among them (F-305), `Float` 57 and the top-level `fromRawBits` (F-303), `RR32` 50 (F-310, its `asFloat` F-311), the `asFloat`s of `Long` and `BigNum` 2 (F-311), the small rest 8 (F-307), and `NN32` 27, `NN64` 24, `UnsignedLong` 3 and `Char` 39 (F-308, F-313), the top-level `nanoTime` (F-314), and the string family's 18: 11 of `FlatString`'s 13 methods, `natLineSeparator`, `match`, and `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment` and `getProperty`, each a native over `FlatString` beside an overload over `String` that flattens in the library's `typecase` (`FlatString`'s `=` and `flatConcat` at a `Char` wait on review-queue item 331); the other 143 name glue classes. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers and the messages. Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `ZZ32RemainderByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperFamilyFloatBitsWalk`, `NativeHelperFamilyRR32Walk`, `NativeHelperFamilyAsFloatWalk`, `NativeHelperFamilyDivisorsWalk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk` and `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`. Detail: `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-05 21:41Z · rewritten · from `explorations/compile-ladder/rung-string-natives/REPORT.md`, "What changed and why" · by climb batch 26 gather (cites [S9])
- Written by the merged-diff review: 2026-11-05 22:24Z · rewritten · by climb batch 26 merged-diff review: The 288 by type made 306, the count the entry states after climb batch 26 rung T

Report sections that the entry cites: [S10] `references/interpreter.md`, "Natives"; [S11] `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; [S12] `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; [S9] `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

## F-307, changed

- Size: at the base 960 characters; at the landing 994 characters; now 994 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-307 **The small rest's eight native bindings name their helpers of `nativeHelpers/`, and walk's values are unchanged: `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`.** They are at `LibraryBuiltin/FortressBuiltin.fss:380`, `:382`, `:470`, `:567`, `:569`, `:617` and `Library/FortressLibrary.fss:986`, `:4540`; the four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types (`compiler/NamingCzar.java:373-384`). `signed` above the signed half wraps, and `char` keeps a code point outside 0 to 1114111, as the glue classes did (rows 856, 857). The top-level `printlnWithThread` and `getProperty`, declared over `String`, stay on their glue class (row 846). Test: `tests/NativeHelperFamilySmallWalk.fss` and `compiler_tests/NativeHelperFamilySmallCompiled`. Detail: `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

Now:

- F-307 **The small rest's eight native bindings name their helpers of `nativeHelpers/`, and walk's values are unchanged: `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`.** They are at `LibraryBuiltin/FortressBuiltin.fss:380`, `:382`, `:470`, `:567`, `:569`, `:617` and `Library/FortressLibrary.fss:986`, `:4540`; the four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types (`compiler/NamingCzar.java:373-384`). `signed` above the signed half wraps, and `char` keeps a code point outside 0 to 1114111, as the glue classes did (rows 856, 857). The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` on helpers, beside overloads over `String` that flatten (F-299). Test: `tests/NativeHelperFamilySmallWalk.fss` and `compiler_tests/NativeHelperFamilySmallCompiled`. Detail: `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-05 21:41Z · rewritten · from `explorations/compile-ladder/rung-string-natives/REPORT.md`, "Sentences made false" · by climb batch 26 gather (cites [S1])

Report sections that the entry cites: [S13] `compile-ladder/rung-natives-small/REPORT.md`, "What changed and why".

## F-318, added

- Size: at the base none; at the landing 2033 characters; now 2033 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-318 **Under walk, the load check reads an own generic beside a functional method of a generic trait on their declared domains, `self` of a self-typed trait read as `C[\X\] & X` in the exclusion test.** It builds P-157 and P-152. Where the parameter-by-parameter check refuses an own generic function beside a functional method of a generic trait that declares no static parameters of its own, walk reads the pair as two own generics (`genericPairValid`), the trait's static parameters standing for the method's own; in `domainsExcludeTogether`'s meet, the self parameter of a trait self-typed directly (its parameter `X` bounded by the trait at `X`, no `comprises` clause or one that lists only `...`) excludes a type where the trait's instance or `X` does (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `validOnDeclaredDomains`, `traitMethodPairValid`, `selfTypeParameter`). So a program's generic operators between an array of a number type and a number, beside a self-typed additive group's own, load and run as on the compiled path, and with `Number`'s `comprises` clause removed in a scratch copy walk loads and runs `BooleanOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary` and `extendNumber`. A trait self-typed through another self-typed trait, and a method with static parameters of its own, are not read so and keep the refusal. Walk applies no extender rule of P-146, so an object that extends a self-typed trait at a type it is not a subtype of now loads and runs one of two fitting declarations (row 893); the checker refuses a generic function more specific than such a method that walk loads (row 894). Gated by `tests/ExclusionVectorScalarWalk`, `ExclusionArrayScalarLibraryShapeWalk`, `GenericBesideTraitMethodInsideWalk` and `GenericInsideTraitMethodWalk` (load and dispatch), and the refusals `ExclusionVectorScalarOverlapWalk` and `GenericInsideTraitMethodReturnRuleWalk`. Detail: `compile-ladder/rung-walk-vector-scalar/REPORT.md` sections 1, 2 and 4.

History blocks of the range:

- Written by the gather: 2026-11-05 21:35Z · added · from `explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md`, "1. What changed and why" · by climb batch 26 gather (cites [S14])
- Written by the gather: 2026-11-05 21:35Z · rewritten · by climb batch 26 gather: a word restored

## F-319, added

- Size: at the base none; at the landing 1073 characters; now 1073 characters, over 600.
- Section now: "The specification and the repository's lineage".

Now:

- F-319 **A comparison at a NaN or at 0/0 answers `false`, on the specification's word too.** It builds P-159. The overview of operators says that `<`, `<=`, `>` and `>=` return `false` at a floating-point NaN and at the rational 0/0, that `CMP` returns `Unordered` at a NaN, and that -1/0 and 1/0 are ordered below and above every finite rational (`Specification/basic/operators/opr-overview.tex`, "Comparisons Operators"; Appendix I, "A comparison at a NaN or at the rational indefinite"); both paths answer so, and nothing raises `FloatingComparisonError` or `RationalComparisonError`, which stay declared. Walk departs at 0/0 against itself, `true` for `=`, `<=` and `>=` and `EqualTo` for `CMP` (row 440). The team's later restart, `Documentation/Specification/Prose/Language/Operators/operator-overview.tick`, still says both comparisons raise. Test: `tests/ComparisonAtNaNWalk`, and the NaN asserts of `compiler_tests/NativeHelperFamilyFloatCompiled` and `NativeHelperFamilyRR32Compiled`. Detail: `compile-ladder/rung-spec-nan-comparison/REPORT.md` sections 1 and 2.

History blocks of the range:

- Written by the gather: 2026-11-05 21:37Z · added · from `explorations/compile-ladder/rung-spec-nan-comparison/REPORT.md`, "1. What changed and why" · by climb batch 26 gather (cites [S15])

Report sections that the entry cites: [S16] `Specification/basic/operators/opr-overview.tex`, "Comparisons Operators".

## F-320, added

- Size: at the base none; at the landing 1498 characters; now 1498 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-320 **The code generator compiles a block's local functions as closures, the group recursive and mutually recursive without a mutable cell.** Each local function of a `LetFn` is a closure class made as a function expression's (`forFnExpr`), bound under its name in the block's environment, so a call of it and its use as a value go through the closure; it reaches itself as its own `this` and each sibling through a field of its class that the block sets once, after the whole group is made and before the body runs (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `forLetFn`, `localFunctionClosure`, `localFunctionOrNull`). It refuses three forms that the specification allows, each after the checker passes the program, with its own message: a local function with static parameters of its own, two of one name in a block, and the `atomic` modifier (row 304); a varargs one stops at 'Can't compile VarArgs yet' (row 624). Under the switch-over's setting all nine of the library's declarations that stopped at 'Can't compile LetFn' emit (F-34). Gated by `compiler_tests/LocalFunctionCallCompiled`, `LocalFunctionValueCompiled`, `LocalFunctionRecursiveCompiled`, `LocalFunctionCaptureCompiled` and `LocalFunctionGenericContextCompiled`, their `tests/LocalFunction*Walk` guards, and `XXXLocalFunctionGenericCompiled`, `XXXLocalFunctionOverloadedCompiled` and `XXXLocalFunctionAtomicCompiled`. Detail: `compile-ladder/rung-codegen-local-functions/REPORT.md` sections 1 and 5.

History blocks of the range:

- Written by the gather: 2026-11-05 21:39Z · added · from `explorations/compile-ladder/rung-codegen-local-functions/REPORT.md`, "1. What changed and why" · by climb batch 26 gather (cites [S17])

## F-321, added

- Size: at the base none; at the landing 1280 characters; now 1280 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-321 **Against the interpreter's prelude the checker reads the whole helper class that a binding names, so the one library cannot bind a helper of `nativeHelpers/systemOps`.** `systemOps.getArgs` answers an `FStringVector` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java:29`), which `NamingCzar` maps to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:339-340`), a type that the interpreter's `FortressBuiltin` does not declare, so a component whose binding names any `systemOps` helper stops: 'FortressBuiltin.StringVector is undefined.' (row 895). So the one library binds only helper classes all of whose methods map to its types; `FlatString`'s line separator names `stringOps.lineSeparator` for this reason. `System`'s `getEnvironment` and `getProperty` name `systemOps`, and neither stage reads `System`, so they will stop wherever the checker reads it. No test checks it: the compiled tests check against the compiler's prelude, which declares `StringVector`. Shown by the distance stage with `Library/FlatString.fss`'s `natLineSeparator` naming `systemOps.lineSeparator`: 'FortressBuiltin.StringVector is undefined.', 'File FlatString.fss has 1 error.'. Detail: `compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went".

History blocks of the range:

- Written by the gather: 2026-11-05 21:41Z · added · from `explorations/compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went" · by climb batch 26 gather (cites [S18])

Report sections that the entry cites: [S18] `compile-ladder/rung-string-natives/REPORT.md`, "A site that came, and went".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/compile-ladder/rung-string-natives/REPORT.md, "Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-string-natives/REPORT.md#Sentences made false'`

explorations/compile-ladder/rung-string-natives/REPORT.md:181-191, 2600 bytes, cut at 2500.

~~~~
## Sentences made false

- `Specification/appendices/changes.tex:4499-4502`: "The interpreter passes a helper declared over \TYP{String}, as its glue classes do, the name of the value's type in place of its characters where the value is not a flat string, as a \TYP{String} made by concatenating two long strings (row~846 of the revival's gap ledger)." The loader now refuses a helper parameter declared `String`; only a glue class over `String` still receives the type's name.
- `Specification/appendices/changes.tex:4503-4507`: "... and takes only an overload whose first Java parameter carries that type, which it reads by the type's name, for the types of \library\ whose names no program can give its own types." The library's `FlatString` is now read by its declaring component.
- `explorations/coordinator/FACTS.md:134`, F-299: "288 of the one library's 449 live bindings" (now 306); "`FlatString` and `JavaString` carry no `self`, since a program can name its own types so; a helper binding of a `FlatString` method would stop every program at load."; "a native over `String` receives a non-flat string's type name (row 846)" (now: a glue class over `String`); "the other 161 name glue classes" (now 143).
- `explorations/coordinator/FACTS.md:30`, F-32: "161 of the one library's 449 live native bindings" (now 143).
- `.claude/skills/fortress-repo/references/interpreter.md:95` ("`String`, `FlatString` and `JavaString` in `String`": for a parameter, `String` is refused), `:99` ("except `FlatString`, `JavaString` and `()`"), `:102` ("So a binding in a method of the library's `FlatString` cannot name a helper yet: every program would stop at load."), `:116` ("A native declared over `String`, glue class or helper alike, receives the wrong text for a `CatString`"); the refusal list at `:107` gains a parameter declared `String`.
- `explorations/coordinator/PLAN.md:10` and `:46`, "288 ... and 161 still name glue classes"; `:47`, "the 7 left wait on review-queue items 327 ... and 310 (over `String`, row 846) and review-queue item 340 (`FlatString`'s five)".
- `explorations/coordinator/FACTS.md:137`, F-307: "The top-level `printlnWithThread` and `getProperty`, declared over `String`, stay on their glue class (row 846)." (each is now a native over `FlatString` on a helper, beside an overload over `String`; added by the skeptic).
- `explorations/coordinator/PLAN.md:49`: "those over `String` (review-queue items 310 and 327 ..., row 846); `FlatString`'s five (review-queue item 340,
~~~~

## [S2] explorations/compile-ladder/rung-codegen-local-functions/REPORT.md, "6. Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-local-functions/REPORT.md#6. Sentences made false'`

explorations/compile-ladder/rung-codegen-local-functions/REPORT.md:93-101, 1423 bytes.

~~~~
## 6. Sentences made false

- Row 304's claim, `explorations/fortress-gap-ledger.md:820`: rewritten in `record.md`.
- F-34, `explorations/coordinator/FACTS.md:31`: 47 declarations in 11 kinds, a local function (row 304) among the kinds; now 38 in 10.
- F-181, `explorations/coordinator/FACTS.md:263`: "the constructs that the code generator has no case for, a local function among them (row 304)".
- The `fortress-repo` skill's `references/compiler.md:41`, "What the compiled path cannot compile yet": "a local function declaration, and an object expression"; the local function now compiles except in the three forms of row 304.
- `explorations/coordinator/PLAN.md:10` and `:56`: "the code generator refuses 47 declarations in 11 kinds (F-34)", "it refuses 47 declarations of the fourteen components in 11 kinds", with row 304 among the kinds' rows; and `:93`, "C4's two local functions in `step` (row 304)", which no longer stand in the code generator's way (C4's `h` and `u` are typed, not recursive, capture a parameter: the shapes of `LocalFunctionCallCompiled`).
- `explorations/coordinator/map/compile-path-walkthrough.md:469` and `:475-476`: `forFnDecl`'s guard "so no local functions", "a local function is refused with `Can't compile LetFn`"; `explorations/coordinator/map/spec-to-implementation.md:201`: "**no `forLetFn`**", "comp absent for local functions".
- No sentence of the specification or of Appendix I.
~~~~

## [S3] explorations/compile-ladder/rung-codegen-local-functions/REPORT.md, "5. Programs run old against new; the measure"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-local-functions/REPORT.md#5. Programs run old against new; the measure'`

explorations/compile-ladder/rung-codegen-local-functions/REPORT.md:66-91, 4702 bytes, cut at 2500.

~~~~
## 5. Programs run old against new; the measure

- The six planner programs are covered by the tests; `LfPlain`'s, `LfValue`'s and `LfRec`'s shapes are in `LocalFunctionCallCompiled`, `LocalFunctionValueCompiled` and `LocalFunctionRecursiveCompiled`.
- The code generator over the fourteen components, once, on this tree (fork 10), by the planner's command: every helper string on a glue string for the run (the `sed` changed 288 strings, `FortressLibrary.fss` 202 lines, `FortressBuiltin.fss` 374 lines of diff, none left), `codegen.sh` in the background, then `git checkout -- Library ProjectFortress/LibraryBuiltin` (status clean after). Its before is the planner's run on the base ('refused declarations 47 | emitted (OK lines) 697 | component failures 0', 'kinds 11', '9  Can't compile LetFn  [FortressLibrary 7, RangeInternals 2]'). After:

      explorations/compile-ladder/plan-25/probes/codegen.sh tmp/rung-codegen-local-functions/cg
      refused declarations 38 | emitted (OK lines) 703 | component failures 0
      kinds 10
        8  Not in the trait table: <api trait>  [RangeInternals 8]
        7  Can't compile AsIfExpr  [FortressLibrary 4, String 2, RangeInternals 1]
        7  Can't compile VarArgs yet  [String 3, FortressLibrary 2, List 1, FlatString 1]
        4  <X> is not in the kind env  [List 2, FortressLibrary 1, CovariantCollection 1]
        4  Error trying to close method scope  [FortressLibrary 4]
        3  Can't compile Label  [FortressLibrary 3]
        2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
        1  ClassCastException: com.sun.fortress.nodes.IntersectionType to com.sun.fortress.nodes.NamedType  [FortressLibrary 1]
        1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]
        1  Can't compile AtomicExpr  [OneShotFlag 1]
      rc=0 seconds=271

  The other ten kinds keep the base's counts exactly. Per component: FortressLibrary refused 16, emitted 489; RangeInternals 9, 102; String 5, 14; List 4, 23; Stream 1, 3; CovariantCollection 1, 24; OneShotFlag 1, 3; FlatString 1, 7; the other six none.
- The nine, each with an `@@CG OK` line in `tmp/rung-codegen-local-functions/cg/run.txt` and no other wall: `__bigOperator` (`Library/FortressLibrary.fss:1315`), `ReadableArray1` (`:2353`), `Array2` (`:2653`), `Matrix` (`:2857`), `Array3` (`:3053`), `NaiveSeqGenerator` (`:3982`), `RelationalPredicateCondition` (`:4867`), `CompactFullParScalarRange` (`Library/RangeInte
~~~~

## [S4] explorations/compile-ladder/rung-codegen-walls/REPORT.md, "5. Programs run old against new, and the probes"

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

## [S5] explorations/reviews/phase3-exit/zero-audit.md, "Part C. The debt carried into phase 4"

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

## [S6] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

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

## [S7] .claude/skills/fortress-repo/references/compiler.md, "What the compiled path cannot compile yet"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/compiler.md#What the compiled path cannot compile yet'`

.claude/skills/fortress-repo/references/compiler.md:36-48, 1976 bytes.

~~~~
## What the compiled path cannot compile yet

For a construct that it cannot compile yet, the code generator calls `sayWhat` or throws another `CompilerError`. Such a call or throw is a code-generator wall. The code generator has no case for these constructs:

- `label` and `exit`, `spawn`, and `atomic` used as an expression;
- a local function declaration, and an object expression;
- an array literal, such as `[1 2 3]`.

It also refuses a function or method with a contract (`requires`, `ensures`, `invariant`). It compiles a declaration whose own header or `extends` entry has a `where` clause, and emits nothing for the clause. A call of a function or method whose own clause introduces a `where`-clause variable, as `where [\nat n\]` does, links, but dies at run time with `NoClassDefFoundError` (ledger row 867). `compiler_tests/XXXWhereVariableCallCompiled.test` records it: copy its form for such a call. The disambiguator, which both paths run, drops a trait's or object's contract, so the code generator never sees one, and walk does not check one either (ledger row 781). It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, such as `override` (ledger row 650). A trait or object that extends a generic trait compiles with `Any` as the static argument. With `Bottom`, `Self` or an abbreviated type there, the code generator refuses the declaration. An abbreviated type is a short form that the specification gives for a type, such as `RR64[3]` for an array type. With a tuple that holds `Any` there, the code generator crashes (ledger row 889).

The compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`. Its `for` loops, comprehensions and reductions work over `ZZ32` ranges only. Its reductions give a `ZZ32` or a `String`.

Until the switch-over, a compiled test uses none of these. If a test needs one, write it as an `XXX` test that names the wall (`tests-writing.md`).
~~~~

## [S8] explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md, "8. Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md#8. Sentences made false'`

explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md:104-112, 1704 bytes.

~~~~
## 8. Sentences made false

- `Specification/appendices/changes.tex:2960-2964`: "The interpreter refuses at load the first of these shapes in a program's own component, generic operators between an array of a number type and a number, on either side, beside the operator of a trait with a self-type parameter, as having no pair of parameters whose types exclude each other, which the compiled type checker accepts and runs (row~804 of the revival's gap ledger)." The gather corrects it.
- F-277: "walk refuses at load the vector pairs' shape in a program's own component (row 804)".
- `.claude/skills/fortress-repo/references/interpreter.md:53`, "What walk checks": the bullet "Where a program's own component declares both, it refuses a generic operator between an array of a number type and a number, ... (ledger row 804)."
- `.claude/skills/fortress-repo/references/revival-changes.md:43`, "Traits and objects": "Walk loads the library's pairs, but refuses such a pair where a program's own component declares both (row 804)."
- `.claude/skills/fortress-repo/references/interpreter.md:43`, "What walk checks": walk keeps the team's check and messages for "a pair that is neither two generic declarations nor a generic one beside a plain one"; a generic function beside a functional method of a generic trait without static parameters of its own is now read on the declared domains (added by the skeptic).
- F-252's title, "where the parameter-by-parameter check refuses two declarations with static parameters of their own": the reading now also takes such a functional method beside an own generic (added by the skeptic).
- P-160's "The clause stays until the first step lands" stays true as written.
~~~~

## [S9] explorations/compile-ladder/rung-string-natives/REPORT.md, "What changed and why"

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

## [S10] .claude/skills/fortress-repo/references/interpreter.md, "Natives"

`facts-extract.sh 'doc:.claude/skills/fortress-repo/references/interpreter.md#Natives'`

.claude/skills/fortress-repo/references/interpreter.md:85-125, 5005 bytes, cut at 2500.

~~~~
## Natives

The library binds each of walk's natives by a declaration whose body is `builtinPrimitive("…")`. The string names one of these:

- A glue class, as `com.sun.fortress.interpreter.glue.prim.X`, in `interpreter/glue/prim/`. A glue class takes walk's `FValue` objects, so the compiled path cannot use it.
- A helper: a public static method of a class under `nativeHelpers/`, as `com.sun.fortress.nativeHelpers.simpleIntArith.<method>`. `interpreter/glue/StaticNativeApp.java` calls it by reflection, with a method's `self` first. The compiled path calls it too (`compiler.md`, "Natives"). Most bindings name a helper. The others name a glue class. F-299 counts both kinds (`records.md`, "Reading the record").

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

~~~~

## [S11] explorations/compile-ladder/rung-natives-walk/REPORT.md, "What changed and why"

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

## [S13] explorations/compile-ladder/rung-natives-small/REPORT.md, "What changed and why"

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

## [S14] explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md:10-25, 3055 bytes, cut at 2500.

~~~~
## 1. What changed and why

Walk's load check first compares two overloads parameter by parameter (`OverloadedFunction.java:420-541`). Where it refuses a pair, it reads the pair again on its declared domains (`validOnDeclaredDomains`, `:772`). Before this rung it read two shapes only: two own generics, and an own generic beside a declaration without static parameters. A functional method of a generic trait, such as `AdditiveGroup`'s `opr +(self, other: T)`, is a `GenericFunctionalMethod`, which `ownGeneric` leaves out (`:2530-2532`), so the pair of row 804 got `NOT_READ` and the team's message.

The edit, all in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`:

1. `validOnDeclaredDomains` (`:772-779`): two new branches. An own generic beside a functional method of a generic trait without static parameters of its own goes to `traitMethodPairValid`, in either order.
2. `traitMethod` (`:814-817`), new: a `GenericFunctionalMethod` whose declaration has no static parameters of its own.
3. `traitMethodPairValid` (`:826-833`), new: calls `genericPairValid` with the own generic first, the trait's static parameters standing for the method's own, and turns a Return Type Rule reading back to the pair's order when the method came first.
4. `selfTypeParameter` (`:845-867`), new: the trait's static parameter `X` by which the trait is self-typed (no `comprises` clause or one that lists only `...`, and `X` bounded by the trait at `X`).
5. `domainsExcludeTogether` (`:1081-1092`): where `g` is such a method, the self parameter's type at the meet is read as the intersection of the trait's instance and `X` at the meet: the position excludes where either member does (`excludesAtMeet` on each). This is P-157's reading of `self` as `C[\X\] & X`.
6. `Apart.of` (`:1433-1435`): the fresh symbolic arguments are made from `getStaticParams()` instead of the declaration's own static parameters, so that a functional method of a generic trait is renamed apart over its trait's parameters. For every declaration that reached `Apart.of` before, the two are the same list (`FGenericFunction.getStaticParams`, `FGenericFunction.java:171-173`; `GenericFunctionalMethod.Own` does not override it).

So for `PLUS[\T extends { Numb, AddG[\T\] }\](x: Arry[\T\], y: T)` beside `AddG[\T'\]`'s `PLUS(self, other: T')`: at the second position `T`'s bound `AddG[\T\]` and `T'`'s bound `AddG[\T'\]` are one generic type, so the existential reduction makes `T` and `T'` 
~~~~

## [S15] explorations/compile-ladder/rung-spec-nan-comparison/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-spec-nan-comparison/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-spec-nan-comparison/REPORT.md:12-23, 4124 bytes, cut at 2500.

~~~~
## 1. What changed and why

One commit, `1d109308e`, on `wip/rung-spec-nan-comparison`, pushed. No implementation, library or tool changes (P-159: both paths already answer so).

- `Specification/basic/operators/opr-overview.tex:284-300`, subsection "Comparisons Operators": the two sentences that said a rational comparison throws `RationalComparisonError` at 1/0 or 0/0 and a float comparison throws `FloatingComparisonError` at a NaN now say that a comparison of rational values by these four operators returns `false` if either argument is 0/0, for compatibility with floating-point arithmetic, that -1/0 is less than and 1/0 greater than every finite rational value (`\secref{basic-rationals}`, `numbers.tex:17`), and that a comparison of floating-point values by these four operators returns `false` if either argument is a NaN, and `CMP` returns `Unordered` (fork 5). One `\revision{revival-nan-comparison}` callout after them (`:292-300`), in the form of the revival-conditional callout below it: it quotes the original in prose, says the exception types stay declared and nothing throws them, and names walk's departure at 0/0 against itself (row 440).
- `Specification/appendices/changes.tex:4550-4622`: a new `\subsection{A comparison at a NaN or at the rational indefinite}` with `\seclabel{revival-nan-comparison}`, before "Passages not yet revised" (now `:4624`): affected section; change; rationale (P-159, dated 5 November 2026: the team's `false` and `Unordered` on both paths and no raise; the rationals chapter, the comparison chapter's `Unordered` and the overview's own `MAX`/`MIN` passage; the peers; the 15 to 20 percent cost, `explorations/perf-probes/nan-check-cost/REPORT.md:95`; the decision record); effect (no program changes; the one departure, row 440, walk's 0/0 against itself `true` for `=`, `<=`, `>=` and `EqualTo` for `CMP`; the compiled path's own library declares no rational type and no `CMP` on floats until the switch-over; the three gated tests); the original text, `Specification-1.0-frozen/basic/operators/opr-overview.tex:274-278`, quoted; route C the same, with what a reversal needs (the review's option (b): a raise from the four operators at a NaN on both paths, with a NaN test in each compiled comparison). Both exception types stay declared (`Library/FortressLibrary.fsi:1184`, `:1187`; `Library/CompilerLibrary.fsi:97`, `:99`).
- `Specification/fortress/preamble.tex:54-62`: read; not changed. It says the revival revised the draft "where a decis
~~~~

## [S16] Specification/basic/operators/opr-overview.tex, "Comparisons Operators"

`facts-extract.sh 'doc:Specification/basic/operators/opr-overview.tex#Comparisons Operators'`

Specification/basic/operators/opr-overview.tex:276-328, 3070 bytes, cut at 2500.

~~~~
\subsection{Comparisons Operators}

Unless otherwise noted, the operators described in this section
produce boolean (\VAR{true}/\VAR{false}) results.

The operators $<$, \EXP{\leq}, \EXP{\geq}, and $>$ are
  used for numerical comparisons
and are supported by integer, rational, and floating-point types.
Comparison of rational values by these four operators returns \VAR{false}
if either argument is the rational indefinite \EXP{0/0}, for compatibility
with floating-point arithmetic, and the rational infinities are ordered:
\EXP{-1/0} is less than and \EXP{1/0} is greater than every finite rational
value (\secref{basic-rationals}).
Comparison of floating-point values by these four operators returns
\VAR{false} if either argument is a \TYP{NaN}, and \OPR{CMP} returns
\TYP{Unordered}.
\revision{revival-nan-comparison}{The Working Draft of February 2011 said that a
comparison of rational values throws \TYP{RationalComparisonError} if either
argument is \EXP{1/0} or \EXP{0/0}, and that a comparison of floating-point
values throws \TYP{FloatingComparisonError} if either argument is a \TYP{NaN}.
The text now gives the answers of the chapter on rational numbers, which the
interpreter computes, and for floating-point values those of both
implementations; both exception types stay declared, and nothing throws them.
The interpreter still answers \VAR{true} for \EXP{0/0 \leq 0/0} and
\EXP{0/0 \geq 0/0} (row~440 of the revival's gap ledger).}

The operators $<$, \EXP{\leq}, \EXP{\geq}, and \EXP{>} may also be
used to compare characters
(according to the numerical value of their Unicode codepoint values)
and strings (lexicographic order based on the character ordering).
They also use lexicographic order when used to compare lists
whose elements support these same comparison operators.
\revision{revival-conditional}{\Library\ order a list only where its element
type is totally ordered (\secref{where-clauses}): a list of floating-point
numbers or of rational numbers, whose elements support these comparison
operators but are only partially ordered, has no order on the compiled type
checker, while its \EXP{=} still compares the two lists element by element.
The interpreter still orders every list (row~774 of the revival's gap ledger).}

When $<$, \EXP{\leq}, \EXP{\geq}, and \EXP{>} are used to compare numerical
intervals, the result is a boolean interval.  The functions
\VAR{possibly} and \VAR{certainly} are useful for converting
boolean intervals to boolean values for testin
~~~~

## [S17] explorations/compile-ladder/rung-codegen-local-functions/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-local-functions/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-codegen-local-functions/REPORT.md:9-21, 3102 bytes, cut at 2500.

~~~~
## 1. What changed and why

One file of code, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` (line numbers at `dbf4825e0`, the same at the head):

- `forLetFn` (`:3580-3642`), new: the visitor's case for `LetFn`, which reached `defaultCase` (`:1675-1677`, unchanged) and its 'Can't compile LetFn' before. It refuses the forms of fork 8 (`:3586-3601`), binds each name of the group to a local of the function's arrow type in a child `CodeGen` (`:3606-3615`), makes each closure and stores it (`:3617-3625`), ties the group (`:3627-3636`): each closure's sibling fields are set from the locals, with a `CHECKCAST` to the closure's class, and then compiles the block's body in that environment (`:3638`).
- `localFunctionArrowType` (`:3646-3656`), new: the arrow type from the declared parameter types to the return type, written or inferred by the checker (`scala_src/typechecker/impls/Decls.scala:198-232` fills an omitted return type in the `FnDecl` it hands on), so `untyped`'s `plus` and the library's `row` and `plane` compile.
- `localFunctionClosure` (`:3666-3729`), new: the closure class, line for line `forFnExpr`'s (its class name from the declaration's span, its free static parameters as the class's, F-135; its free variables from `getFreeVars`; `generateFnExprInit`, `apply` with slot 0 reserved, `constructWithFreeVars`), except that the free variables that are members of the group are not constructor arguments: the function itself is `LocalFunctionSelfVar` (`:3758-3773`, pushes `this`), and each sibling is `LocalFunctionSiblingVar` (`:3733-3755`, a public non-final field of the closure class, read with `GETFIELD`).
- `localFunctionOrNull` (`:3835-3842`), new, with the field `localFunctionNames` (`:3831`, made at `:396`, shared by copies at `:375`): a `FnRef` is a reference to a local function when it has no static arguments and every one of its names is the unambiguous name of a local function that `forLetFn` bound (`:3608`). Checked by the unambiguous name, not by the bare name, so that a top-level function's `FnRef` never takes a stale lexical entry of the same bare name.
- `forFnRef` (`:3845-3852`): a local function's reference pushes its closure, before the `fnRefIsApply` branch; the team's 'Haven't figured out references to local/parameter functions yet' stays for every other name.
- `for_RewriteFnApp` (`:6797`): a call whose function is a local function's `FnRef` takes the higher-order path, the closure pushed and `apply` called throug
~~~~

## [S18] explorations/compile-ladder/rung-string-natives/REPORT.md, "A site that came, and went"

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
