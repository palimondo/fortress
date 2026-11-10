<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 9d0147ff9..f592b7c0f added, changed or removed (the batch 30, landed at d89fc0fda, and the landing's own steps to f592b7c0f), written by evidence.py. -->

# The entries that the range changed

- The batch, 9d0147ff9..d89fc0fda: 9 entries: F-19, F-53, F-134, F-240, F-347, F-348, F-349, F-350, F-351
- After the landing, d89fc0fda..f592b7c0f: 0 entries
- Now over 600 characters: 9 of 9: F-19, F-53, F-134, F-240, F-347, F-348, F-349, F-350, F-351

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-19, changed

- Size: at the base 1743 characters; at the landing 2029 characters; now 2029 characters, over 600.
- Section now: "Execution model".

At the base:

- F-19 **By the specification, the iterations of a `for` loop, the elements of a tuple, and the arguments of a call or an operator may run in parallel, and a program must assume that they do.** A `for` loop is sequential only if every generator is, as `seq(g)` or `sequential(g)` makes it. An implementation may also run them one after another (`evaluation/parallelism.tex:88-90`), so a program cannot count on parallel runs either. For the elements of a tuple and the operands of an operator, each path starts a task only where it judges it worth it: walk by `TupleTask.worthSpawning`, which also governs a call's arguments, and the code generator by `ParallelismAnalyzer`. Compiled, a function call's arguments run in order (`CodeGen.evalArg`). A `for` loop over a range without `seq` runs by splitting the range into `do … also do … end` blocks. Under walk, every such block is a task, and walk's library splits down to single elements (`Library/RangeInternals.fss`). Compiled, the first block runs in place, and each other block forks only where `BaseTask.forkIfProfitable` judges it worth it, as tuple elements do; the compiler prelude's `parloop` splits down to `FORTRESS_LOOP_CHUNK` elements, 1 by default. `FORTRESS_THREADS` sizes the pool of worker threads (the `fortress-repo` skill, "Parallelism and mutable state"). By grep, no program under `explorations/`, the model programs and the probes, writes `spawn`, which starts an explicit thread, or an `also do` block, so their parallelism comes only from loops, tuples and arguments. The revival's tests under `ProjectFortress/` write both. Source: `Specification/basic/expressions/for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:58-59`, `evaluation/parallelism.tex:50-80`.

Now:

- F-19 **By the specification, the iterations of a `for` loop, the elements of a tuple, and the arguments of a call or an operator may run in parallel, and a program must assume that they do.** A `for` loop is sequential only if every generator is, as `seq(g)` or `sequential(g)` makes it. An implementation may also run them one after another (`evaluation/parallelism.tex:88-90`), so a program cannot count on parallel runs either. For the elements of a tuple and the operands of an operator, each path starts a task only where it judges it worth it: walk by `TupleTask.worthSpawning`, which also governs a call's arguments, and the code generator by `ParallelismAnalyzer`. Compiled, the arguments of a function call and of a dotted method call fork where the analyzer marked the argument tuple (`CodeGen.evalArg`; F-350), and the analyzer marks no call written in the compiler's prelude (row 982). A `for` loop over a range without `seq` runs by splitting the range into `do … also do … end` blocks. Under walk, every such block is a task, and walk's library splits a `ZZ32` range down to chunks of `grainSize`, 16, elements, each run by the sequential range's methods, and a range with a stride down to single elements (`Library/RangeInternals.fss:20`). Compiled, the first block runs in place, and each other block forks only where `BaseTask.forkIfProfitable` judges it worth it, as tuple elements do; the compiler prelude's `parloop` splits down to `FORTRESS_LOOP_CHUNK` elements, 1 by default. `FORTRESS_THREADS` sizes the pool of worker threads (the `fortress-repo` skill, "Parallelism and mutable state"). By grep, no program under `explorations/`, the model programs and the probes, writes `spawn`, which starts an explicit thread, or an `also do` block, so their parallelism comes only from loops, tuples and arguments. The revival's tests under `ProjectFortress/` write both. Source: `Specification/basic/expressions/for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:58-59`, `evaluation/parallelism.tex:50-80`.

History blocks of the range:

- Written by the gather: 2026-11-10 11:40Z · rewritten · from `explorations/compile-ladder/rung-forked-arguments/REPORT.md`, "What changed and why" · by climb batch 30's gather: a call's arguments fork on the compiled path, and the parallel range stops at a grain (climb batch 30, rung P) (cites [S1])

## F-53, changed

- Size: at the base 1490 characters; at the landing 1489 characters; now 1489 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 29b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 30's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). Row 731's checker gap, which the library's text avoids, stays open for user programs and the team demos (F-285). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-10 12:42Z · rewritten · by climb batch 30 commit stage: climb batch 30's gate: compile-ladder/climb-batch-30/gate/distance.txt line 2 (#total 0) and line 12 (#crash none); checker-count.txt line 16 (#total 0) and line 18 (#crash none); the title's batch number

Report sections that the entry cites: [S2] `references/batch.md`, "The checker count and the distance".

## F-134, changed

- Size: at the base 545 characters; at the landing 660 characters; now 660 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-134 **A typecase or catch clause's bound name is a local on the compiled path, so the compiled `cast[\T\]` matches a value of type `T`.** `cast[\ZZ32\](0)` still throws, because a numeral is not a `ZZ32`. Open: a name bound inside a clause's pattern (rows 340, 498), and a named clause or `catch` in a `do … also` arm that reads a captured variable (rows 497, 322). Gated by `compiler_tests/TypecaseBindRungG`, `CastBindRungG` and `library_tests/ClauseBindingRungB`. Detail: `compile-ladder/rung-generic-runtime/REPORT.md` sections 1 and 10.

Now:

- F-134 **A typecase or catch clause's bound name is a local on the compiled path, so the compiled `cast[\T\]` matches a value of type `T`.** `cast[\ZZ32\](0)` still throws, because a numeral is not a `ZZ32`. Open: a name bound inside a clause's pattern (rows 340, 498). A local and a `try` with a named `catch` clause in a `do … also` arm after the first compile (row 497, fixed; `compiler_tests/TaskArmLocalSlot`, `TryInArmRungG`); a named `typecase` clause there has no gated test. Gated by `compiler_tests/TypecaseBindRungG`, `CastBindRungG` and `library_tests/ClauseBindingRungB`. Detail: `compile-ladder/rung-generic-runtime/REPORT.md` sections 1 and 10.

History blocks of the range:

- Written by the merged-diff review: 2026-11-10 12:31Z · rewritten · by climb batch 30's merged-diff review: row 497 is closed by 76b21f4981 and row 322 no longer holds the arm case, so the entry's open half named a repaired defect

## F-240, changed

- Size: at the base 2034 characters; at the landing 2031 characters; now 2031 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 105 s and its distance stage 190 s at the last landed gate, climb batch 29b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 117 s), over fourteen components, ran at a start load of 0.26, against 224 s (141 s) at 0.07 at climb batch 29's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-29b/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 70 s and its distance stage 128 s at the last landed gate, climb batch 30's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 83 s), over fourteen components, ran at a start load of 0.14, against 190 s (117 s) at 0.26 at climb batch 29b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-30/gate/distance.txt`. Detail: `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-10 12:42Z · rewritten · by climb batch 30 commit stage: climb batch 30's gate: the count stage's 70 s from the file times of the gate's log (checker-count/javac.txt to checker-count/run.txt); compile-ladder/climb-batch-30/gate/distance.txt line 13 (#seconds 128, FortressLibrary 83), line 14 (load at start 0.14), line 1 (14 components); climb batch 29b's figures (190 s, 117 s, 0.26) as the comparison

## F-347, changed

- Size: at the base 1552 characters; at the landing 1581 characters; now 1581 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-347 **Every numeral's place on the compiled path whose type names no type parameter is one value made before the program runs: a JVM constant where the fold of its type's own numeral coercion ends in an `int`, `long`, `float` or `double`, else a static final filled once by the coercion's method of the four numbers as `ZZ` values.** The code generator folds the body of the place's type's coercion, the library's or a program's, over a fragment of constants, bound names, natives over the built-in types' representations and calls of functions and methods in the fragment (`compiler/codegen/NumeralCoercionFold.java`); the method, `coerce_T№natural` or `coerce_T№point`, is compiled once in the declaring component and called from any component, and a program type's minus on a negative constant runs once with it (`compiler/codegen/CodeGen.java`). A place whose type names a type parameter calls the method at each evaluation (row 957). A coercion whose body puts two calls of the program's own functions in one operator or one argument list, as `small(n) - small(m)` does, spawns a task, and the spawn fails the class's load (row 971); bind the operands to locals first. Under walk a folded constant at a library type converts from its exact value. Tests: `compiler/desugarer/NumeralCoercionFoldJUTest`, `library_tests/NumeralFoldIntegers`, `NumeralFoldFloats`, `compiler_tests/NumeralAcrossComponent`, `NumeralMinusOnceCompiled`, `NumeralCoercionOnceCompiled`. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

Now:

- F-347 **Every numeral's place on the compiled path whose type names no type parameter is one value made before the program runs: a JVM constant where the fold of its type's own numeral coercion ends in an `int`, `long`, `float` or `double`, else a static final filled once by the coercion's method of the four numbers as `ZZ` values.** The code generator folds the body of the place's type's coercion, the library's or a program's, over a fragment of constants, bound names, natives over the built-in types' representations and calls of functions and methods in the fragment (`compiler/codegen/NumeralCoercionFold.java`); the method, `coerce_T№natural` or `coerce_T№point`, is compiled once in the declaring component and called from any component, and a program type's minus on a negative constant runs once with it (`compiler/codegen/CodeGen.java`). A place whose type names a type parameter calls the method at each evaluation (row 957). A coercion whose body puts two calls of the program's own functions in one operator or one argument list, as `small(n) - small(m)` does, spawns a task, which runs in place inside the root task in which the component's class is initialized (F-348; row 971, fixed). Under walk a folded constant at a library type converts from its exact value. Tests: `compiler/desugarer/NumeralCoercionFoldJUTest`, `library_tests/NumeralFoldIntegers`, `NumeralFoldFloats`, `compiler_tests/NumeralAcrossComponent`, `NumeralMinusOnceCompiled`, `NumeralCoercionOnceCompiled`. Detail: `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-10 11:44Z · rewritten · from `explorations/compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why" · commit `f36a65124` · by climb batch 30's gather: row 971 is closed: the component's class is initialized in a root task (cites [S3])

Report sections that the entry cites: [S4] `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why".

## F-348, added

- Size: at the base none; at the landing 1283 characters; now 1283 characters, over 600.
- Section now: "Execution model".

Now:

- F-348 **A compiled program initializes the class of every component that it uses before `run`, in a root task on a pool of one thread.** `MainWrapper.main` hands the program's component class, and after it the class of each component whose declarations its classes name, at any depth, to `FortressExecutable.initializeInRootTask`, reached through the class loader's copy of the run time's classes; the class loader finds the imported components by the class names in each component's jar. So a numeral's place is filled inside a task with no transaction, the tasks that its coercion forks run in place one after another, and the coercion's side effects come before the program's first output (rows 971 and 979, fixed). A top-level variable's initializer is not in the class's initializer: it runs at the variable's first use. A component that is imported and whose declarations no class names is not initialized so. Source: `runtimeSystem/MainWrapper.java:30-46`, `runtimeSystem/FortressExecutable.java:113-141`, `runtimeSystem/InstantiatingClassloader.java:185-248`. Tests: `compiler_tests/NumeralCoercionSpawnCompiled`, `compiler_tests/NumeralCoercionSpawnImported`. Detail: `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why" and "10. Points to report".

History blocks of the range:

- Written by the gather: 2026-11-10 11:39Z · added · from `explorations/compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why" · by climb batch 30's gather (cites [S3])

Report sections that the entry cites: [S3] `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

## F-349, added

- Size: at the base none; at the landing 880 characters; now 880 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-349 **Walk chooses among declarations applicable with coercion by specificity read through other applicable declarations, where none wins directly.** That is the specification's choice, the declaration than which no other is more specific (`Specification/basic/conversions-coercions.tex`, "Coercion Resolution"), wherever the relation has no cycle; so a call with three declarations in a chain of coercions, which ended in 'Ambiguous coercion', runs the first, as the compiled path does, and a float numeral to the left of an `RR32` operand runs `RR32`'s operator (row 958, fixed). Walk's rule that a declaration that fits a numeral as it is runs first is apart from it. Source: `interpreter/evaluator/values/OverloadedFunction.java:2398`, `:2418-2438`. Test: `tests/NumeralLeftOfRR32Walk`. Detail: `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-10 11:39Z · added · from `explorations/compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why" · by climb batch 30's gather (cites [S3])

Report sections that the entry cites: [S5] `Specification/basic/conversions-coercions.tex`, "Coercion Resolution"; [S3] `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why".

## F-350, added

- Size: at the base none; at the landing 1196 characters; now 1196 characters, over 600.
- Section now: "Execution model".

Now:

- F-350 **On the compiled path the arms of a parallel `do`, the elements of a tuple, the operands of an operator and the arguments of a call fork through one method, `CodeGen.genParallelExprs`, which joins every arm that it forked before an exception leaves the group; arguments fork where `ParallelismAnalyzer` marked the argument tuple.** The exception that leaves is that of the first arm, in the arms' order, that threw; an arm that was never forked is not run, and a `VirtualMachineError` leaves without the joins (`runtimeSystem/BaseTask.java`, `joinIfForked`; rows 947, 951 and 497, fixed). The analyzer marks no call written in the prelude's files, so the prelude's reductions run in sequence until the switch-over (row 982); the one library's parallel `ZZ32` range stops its split at `grainSize`, 16 (`Library/RangeInternals.fss:20`). What it means: a compiled reduction of the one library will fork its halves, and an exception leaves no arm running. Tests: `compiler_tests/AlsoArmThrowsJoinsCompiled`, `compiler_tests/CallArgumentsForkCompiled`, `tests/ParRangeGrainWalk`. Detail: `compile-ladder/rung-forked-arguments/REPORT.md`, "What changed and why" and "Points to report reached".

History blocks of the range:

- Written by the gather: 2026-11-10 11:40Z · added · from `explorations/compile-ladder/rung-forked-arguments/REPORT.md`, "What changed and why" · by climb batch 30's gather (cites [S1])

Report sections that the entry cites: [S1] `compile-ladder/rung-forked-arguments/REPORT.md`, "What changed and why".

## F-351, added

- Size: at the base none; at the landing 1783 characters; now 1783 characters, over 600.
- Section now: "Execution model".

Now:

- F-351 **The compiled transaction: what a read records, who validates, and which block an abort restarts.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's generated handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort of that transaction (or any abort at the outermost block), and throws everything else on, an exception after the nested transaction's reads went to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first (rows 933, 934, 937, 888, 324, 949 and 950, fixed; a plain write of the outer block beside a nested block, row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314` (`leaveTransaction`), `compiler/codegen/CodeGen.java:1835-1867` (`forAtomicBlock`), `:2169-2173` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-10 11:41Z · added · from `explorations/compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why" · by climb batch 30's gather (cites [S6])

Report sections that the entry cites: [S6] `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/compile-ladder/rung-forked-arguments/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-forked-arguments/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-forked-arguments/REPORT.md:14-20, 2392 bytes.

~~~~
## What changed and why

1. **Every forked arm joined** (row 947, fork P1). `CodeGen.genParallelExprs` (`compiler/codegen/CodeGen.java:1692-1774`) marks the start of the group's code, arm 0 and the joins, and ends by calling the new `joinForkedArms` (`:1645-1690`, directly above it). That method writes the handler: it stores the exception, calls `joinIfForked` on every task of the group in the arms' order, and throws the exception on. `BaseTask.joinIfForked` (`runtimeSystem/BaseTask.java:113-131`, directly above `unsafeWorthSpawning`) returns at once for a task that was never forked, and otherwise joins quietly, with the worker's current task saved and restored as `joinOrRun` does. The task locals are now disposed after the handler, not inside the join loop, so that the handler's frame still holds them.
2. **A task arm's own slot and an empty stack** (rows 497 and 322's arm case, fork P4). `CodeGen.generateTaskCompute` (`:5234-5264`) calls `mv.reserveSlot0()`, as `forFnExpr`'s `apply` does (`:3693`), and loads `this` after the arm's body, with a `SWAP`, for the result's `PUTFIELD`; before, `this` lay under the body's value across the whole body.
3. **A call's arguments forked** (row 951, forks P2 and P3). `CodeGen.evalArg` (`:7123-7196`) hands a tuple argument's elements to `forExprsParallel` where `pa.worthParallelizing` holds for the tuple (`:7135-7139`). `ParallelismAnalyzer` is not changed: it already marks an argument tuple with two compute-intensive elements, of a function call and of a method call alike (`forTupleExprOnly`, `compiler/codegen/ParallelismAnalyzer.java:186-192`).
4. **The grain** (fork G, way (a)). `Library/RangeInternals.fss:18-20` declares `private grainSize: ZZ32 = 16`; in `CompactFullParScalarRange`, `generate` (`:1320-1321`) and `loop` (`:1337-1338`) run a range of at most that many elements by `CompactFullSeqScalarRange(lo,hi).generate[\T\](red,body)` and `.loop(body)`.
5. **A correction of 1, found by a probe of row 640.** With the joins made for every `Throwable`, a stack overflow inside a join left an arm that nothing would run, and the handler waited for it without end (thread dump: one worker in `ForkJoinPool.helpJoin` under `BaseTask.joinIfForked`, 314 s of CPU; three parked). The handler now throws a `VirtualMachineError` on without the joins (`CodeGen.java:1669-1674`), which is what the base did for every exception.
~~~~

## [S2] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

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

## [S3] explorations/compile-ladder/rung-numeral-leftovers/REPORT.md, "1. What changed and why"

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

## [S4] explorations/compile-ladder/rung-static-numerals/REPORT.md, "1. What changed and why"

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

## [S5] Specification/basic/conversions-coercions.tex, "Coercion Resolution"

`facts-extract.sh 'doc:Specification/basic/conversions-coercions.tex#Coercion Resolution'`

Specification/basic/conversions-coercions.tex:500-705, 9732 bytes, cut at 2500.

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
they declare, and the declaration chosen is then instantiated.}

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

We say that $T$ is \emph{no less specific} than $U$, and write $T
\morespecificeq U$, if $T$ is a subtype of $U$ or $T$ excludes, can be
coerced to, and rejects $U$:
\[
T \morespecificeq U \iff
T \Ovrsubtype U \logicor
(T \excludes U \logicand T \coercesto U \logicand T \rejects U).
\]

The $\morespecificeq$ relation is reflexive and antisymmetric but not
necessarily transitive.  It is possible, for example, for
three types, $T$, $U$ and $V$, each excluding
~~~~

## [S6] explorations/compile-ladder/rung-compiled-transaction/REPORT.md, "What changed and why"

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
