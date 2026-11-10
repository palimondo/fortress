<!-- Rung P of climb batch 30: on the compiled path a group of forked arms joins every arm before it completes abruptly, a task arm keeps its own slot and an empty operand stack, a call's arguments fork where the analyzer judges them worth a task, and the one library's parallel range stops its split at a grain of 16. -->
# Rung P: forked arguments, every arm joined, a task arm's locals, the grain size

- problem: on the compiled path a group whose first arm throws left its other arms running, 'after the catch: flag 0, a second later: flag 1', and a call's arguments ran in order, 'SUM of 64 bodies: at most 1 at once' — explorations/reviews/parallelism-foundations-2026-11-08.md:277
- spec: "all threads in a group are created together, and they all must complete before the group as a whole completes"; each argument of a call "is evaluated in a separate implicit thread" — Specification/basic/evaluation/parallelism.tex:82
- precedent: walk's group, which joins every arm and then rethrows the first recorded exception — ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:275
- deviation: an arm that was never forked is not run when the group completes abruptly, where walk runs every arm (fork P1; the specification allows "not run at all") — ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:117
- deviation: a JVM error (a `VirtualMachineError`, as a stack overflow) leaves the group without the joins — ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1673
- deviation: the grain is a private constant of the component, not a setting a program can change — Library/RangeInternals.fss:20
- historical: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java, ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java, Library/RangeInternals.fss — none of the tests edited is of the 2012 tree

The branch is `wip/rung-forked-arguments`, cut from 9d0147ff9e; its code is final at 728c0fde79.

## What changed and why

1. **Every forked arm joined** (row 947, fork P1). `CodeGen.genParallelExprs` (`compiler/codegen/CodeGen.java:1692-1774`) marks the start of the group's code, arm 0 and the joins, and ends by calling the new `joinForkedArms` (`:1645-1690`, directly above it). That method writes the handler: it stores the exception, calls `joinIfForked` on every task of the group in the arms' order, and throws the exception on. `BaseTask.joinIfForked` (`runtimeSystem/BaseTask.java:113-131`, directly above `unsafeWorthSpawning`) returns at once for a task that was never forked, and otherwise joins quietly, with the worker's current task saved and restored as `joinOrRun` does. The task locals are now disposed after the handler, not inside the join loop, so that the handler's frame still holds them.
2. **A task arm's own slot and an empty stack** (rows 497 and 322's arm case, fork P4). `CodeGen.generateTaskCompute` (`:5234-5264`) calls `mv.reserveSlot0()`, as `forFnExpr`'s `apply` does (`:3693`), and loads `this` after the arm's body, with a `SWAP`, for the result's `PUTFIELD`; before, `this` lay under the body's value across the whole body.
3. **A call's arguments forked** (row 951, forks P2 and P3). `CodeGen.evalArg` (`:7123-7196`) hands a tuple argument's elements to `forExprsParallel` where `pa.worthParallelizing` holds for the tuple (`:7135-7139`). `ParallelismAnalyzer` is not changed: it already marks an argument tuple with two compute-intensive elements, of a function call and of a method call alike (`forTupleExprOnly`, `compiler/codegen/ParallelismAnalyzer.java:186-192`).
4. **The grain** (fork G, way (a)). `Library/RangeInternals.fss:18-20` declares `private grainSize: ZZ32 = 16`; in `CompactFullParScalarRange`, `generate` (`:1320-1321`) and `loop` (`:1337-1338`) run a range of at most that many elements by `CompactFullSeqScalarRange(lo,hi).generate[\T\](red,body)` and `.loop(body)`.
5. **A correction of 1, found by a probe of row 640.** With the joins made for every `Throwable`, a stack overflow inside a join left an arm that nothing would run, and the handler waited for it without end (thread dump: one worker in `ForkJoinPool.helpJoin` under `BaseTask.joinIfForked`, 314 s of CPU; three parked). The handler now throws a `VirtualMachineError` on without the joins (`CodeGen.java:1669-1674`), which is what the base did for every exception.

## The failing runs and the passing runs

All through the harness. The base's code is this tree before the first build of an edit (08:46Z, 08:48Z), or the base build through `old-fortress.sh`.

**Compiled tests on the base's code**, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests AlsoArmThrowsJoinsCompiled.test TaskArmLocalSlotLink.test TaskArmLocalSlot.test TryInArmRungGLink.test TryInArmRungG.test AtomicEndsArmCompiled.test CallArgumentsForkCompiled.test`, 08:46:15Z to 08:46:29Z:

    . run ProjectFortress/compiler_tests/AlsoArmThrowsJoinsCompiled (3971ms) the first arm throws: caught 1, after the catch: flag 0, later: flag 1
    FAIL the first arm throws: an arm ran on after the group had completed
    F. run ProjectFortress/compiler_tests/TaskArmLocalSlot (184ms) java.lang.VerifyError
    Caused by: java.lang.VerifyError: Bad type on operand stack
    F. run ProjectFortress/compiler_tests/TryInArmRungG (201ms) java.lang.VerifyError
    F. run ProjectFortress/compiler_tests/AtomicEndsArmCompiled (366ms) java.lang.VerifyError
    Caused by: java.lang.VerifyError: Inconsistent stackmap frames at branch target 5
    a function's two arguments: 1,2, at most 1 at once; the arms of a parallel do: 3
    FAIL a function's two arguments: the arguments ran one at a time
    Tests run: 12,  Failures: 5,  Errors: 0

`CallArgumentsForkCompiled` gained its case of a reduction's two halves after the first build; on the old code, `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base31 <tree>/tmp/rung-forked-arguments/old-caches junit <tree>/ProjectFortress/compiler_tests/CallArgumentsForkCompiled.test`, 08:55:40Z:

    a reduction's two halves: 28, at most 1 at once; the arms of a parallel do: 3
    FAIL a reduction's two halves: the arguments ran one at a time
    Tests run: 2,  Failures: 1,  Errors: 0

**The walk test on the base's library**, `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/ParRangeGrainWalk.fss`, 08:48:41Z, before `Library/RangeInternals.fss` was edited:

    FAIL: ... 0 4 8 6 1 5 9 7 10 12 3 2 11 13 14 15  =/= ... 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 ; a for over 0#16 runs its bodies in index order
    Tests run: 1,  Failures: 1,  Errors: 0

Every equality with the sequential range's answer passed on the base; only the order assertion failed, as designed.

**The stack-overflow test on the code before the correction** (ef9bc9d7cd's build), `cd ProjectFortress && JAVA_FLAGS="-Xmx2g -Xss1m" FORTRESS_THREADS=4 timeout -k 5 40 ../bin/fortress junit compiler_tests/ForkedArgumentsStackOverflowCompiled.test`, the fifth run, 09:34:12Z:

    09:34:12 fortress junit run 5, -Xss1m, under timeout 40: exit 124
    . link compiler_tests/ForkedArgumentsStackOverflowCompiled  OK (time = 2972ms)
    . run compiler_tests/ForkedArgumentsStackOverflowCompiled

The wait is rare: 26 runs of `junit.sh`, which pins `-Xss64m`, and 24 direct runs at `-Xss64m` all ended; one-megabyte stacks showed it in run 5. On the corrected code the same command, 20 runs: 'OK (2 tests) 20, at the limit 0, other 0'.

**The passing runs, on the final code** (728c0fde79):

- `ONE_JVM=1 timeout -k 5 250 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests` with the ten `.test` files of this rung, 09:37Z: `OK (16 tests)`; the XXX test among them 'Saw expected failure (Exit code != 0)'.
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/ParRangeGrainWalk.fss`, three runs at 09:53Z: `OK (1 test)` each.
- At one thread, run directly with `FORTRESS_THREADS=1`: the five compiled tests print `PASS` and exit 0 (at one thread no arm forks: 'the first arm throws: caught 1, after the catch: flag 0, later: flag 0'), and the walk test prints `PASS`.
- Three more runs of the compiled tests at four threads on ef9bc9d7cd's code: `OK (14 tests)` each.

## The whole compiled suite

`ant testFast`, once on each code state.

On 728c0fde79, the final code:

    [junit] Tests run: 188, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 2.728 sec
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 165.624 sec
    [junit] Tests run: 1537, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 486.527 sec
    BUILD FAILED
    Total time: 8 minutes 15 seconds

On ef9bc9d7cd, before the correction: the same one failure, `Tests run: 1535, Failures: 1`.

The one failure is `compiler_tests/NumeralStaticDesignCompiled`, a test of the revival's:

    run .../compiler_tests/NumeralStaticDesignCompiled (619ms) Exception in thread "main" java.lang.ExceptionInInitializerError
    Caused by: java.lang.ClassCastException: class java.lang.Thread cannot be cast to class com.sun.fortress.runtimeSystem.FortressTaskRunner
    at NumeralStaticDesignCompiled.coerce_CC64?point(...)

Its cause is a defect, row 971, not a test written wrong: the test's coercion `CC64(oneRounding(v, small(r), small(m)), 0.0)` (`ProjectFortress/compiler_tests/NumeralStaticDesignCompiled.fss:12`) passes two calls as arguments, which now fork, inside a numeral coercion that runs when the component class loads. Rung N of this batch repairs row 971. The test is not changed. On a scratch merge of the three rungs' pushed heads (d896c5bdf1 of N, 728c0fde79, 13aeef1148 of X; made under this tree's `tmp/`, built, and removed after), `junit.sh` over this rung's ten `.test` files and `NumeralStaticDesignCompiled.test` printed `OK (18 tests)`.

No line of a team test is changed.

## Where the fix belongs, and the precedent search

- The fork and the joins of every compiled group are one method, `CodeGen.genParallelExprs`; its callers are `forDoParallel` (`:2079-2082`) and `forExprsParallel`, which serves tuples in a binding, an object's field initializers and operators. So the one handler covers arms, tuples, operators and arguments. The other exception-table entries of the file are three: `forAtomicBlock` (`:1846`), `forTry` (`:2165`) and a debug handler (`:5953`); the first two are rung X's.
- The precedent for the join is walk: `Evaluator.forDo` and `evalExprListParallel` call `invokeAll`, restore the current task, then rethrow the first recorded exception (`interpreter/evaluator/Evaluator.java:239-283`, `:336-362`).
- The precedent for the slot is `forFnExpr`'s `apply`, 'Since we call this virtually we need a slot for the arrow implementation of this object' (`CodeGen.java:3692-3693`); the file calls `reserveSlot0` at two other sites (`:3693`, `:3852`), and the task's `compute` was the third virtual method without it.
- The library's way for a constant of a component is a private top-level declaration: `private printLimit = 5` (`Library/RangeInternals.fss:16`); `String.fss:576` holds `maxLeafSize` as a `var` of the api. The library's way for a range test is the chained comparison, `if NOT (0 <= r < s0)` (`Library/FortressLibrary.fss:2541`). The library's way for a chunk in sequence is the sequential range's own methods (`RangeInternals.fss:1365-1386`), which `seq(self)` already builds (`:1312`).
- Ledger rows that cite the edited files were read through the briefing: 947, 951, 497, 322, 640, 876.

## What the specification settles

- A group completes only when each of its threads has not run, has completed, or was ended early; its result is that of one thread that completed abruptly (`Specification/basic/evaluation/parallelism.tex:82-100`). So the joins before the rethrow are asked for, and an arm that never ran is allowed.
- Each argument of a call is an implicit thread (`parallelism.tex:60-64`), and an implementation may serialize any part of a group (`:88-90`). So forked arguments are allowed, and so are a prelude reduction that still runs in sequence and a chunk of 16 that runs in sequence.
- The specification gives no grain and no stack depth.

## Programs run old against new

- The seven compiled test programs and the walk test, old through the harness as above.
- `SUM[i <- 0#64] slow(i)` of the compiler's prelude, on the edit only (its before is the review's, 'at most 1 at once'): 'SUM of 64 bodies: 2016, at most 1 at once; parallel for: at most 4 at once', 3 of 3 at four threads.
- The one library's shape of a reduction, a local function whose halves are the arguments of a method's `join`, written in a program: 'reduction of 64 bodies by a local function's halves: 2016, at most 4 at once', 2 of 2; it is now a case of `CallArgumentsForkCompiled`.
- microGPT's quick checks under walk, `explorations/coordinator/tools/mg-run.sh`, at one thread and at four, on the grain: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' four times (both programs, both thread counts).
- The ladder subset (below).

## The stages

Both ran on 728c0fde79, the final tree, after the last edit of code; a first run of each on ef9bc9d7cd, before the correction, printed the same tables.

- Count: `explorations/coordinator/tools/checker-count/run.sh`, 86 s (09:46:13Z to 09:47:39Z, load 8.9 at start). `diff explorations/compile-ladder/climb-batch-29b/gate/checker-count.txt` against it prints nothing: `#total 0`, `#locations 0`, `#crash none`.
- Distance: `explorations/coordinator/tools/distance/run.sh`, `#seconds 117 FortressLibrary 76`. `explorations/coordinator/tools/distance/compare.sh` against climb batch 29b's table prints `DISTANCE SAME   0`; `#crash none`. Its `errors.tsv` holds the header alone, as `explorations/compile-ladder/gate/distance-sites.tsv` does, so no site moved.

The edit changes no Scala and nothing the build generates for the checker, so the checker was not timed against the base.

## The ladder subset

No first error in the baseline's `raw/` names the task code, the argument evaluation or the range, so by the rule the subset is empty. The subset run instead is the twelve programs of the pass list that write `also`, `atomic`, a reduction or a generator, and the five that the baseline stops at `run`; drivers copied under `tmp/rung-forked-arguments/ladder/`, after the edit only (ef9bc9d7cd's code).

- The twelve stay `pass`, as in climb batch 29b's `gate/ladder/ladder.tsv`, and each prints the baseline's output once the `Operation took <n>ms` line is masked.
- Of the five, `XXXGenericOverload`, `XXXcaseTest` and `XXXtypeParamShadowing` stay at `run`. `XXXtypecaseTest` is at `typecheck` and `disp2` at `pass`; the gate does not run them, and the base's code gives both the same (`old-fortress.sh`: 'The typecase clause, String, is unreachable.'; 'f PASS', 'g PASS'), so neither move is this rung's.

## The team demos

The demo driver was started on the final tree at 09:50Z; its result is added below when it ends.

## Sentences of the specification made false

None. No Effect of Appendix I and no note says what either path forks, joins or splits (`grep -n -i "compiled path\|code generator" Specification/appendices/changes.tex` gives no line on arguments, arms or tasks but the one below; `Specification/basic/evaluation/parallelism.tex` has no revision box).

One sentence stays true and now covers more: "a coercion from a numeral type whose body spawns a task, as an operator applied to two calls may, stops the load of the class that holds the place" (`Specification/appendices/changes.tex:5301-5304`, row 971). An argument list over two calls now spawns as well. Rung N edits that Effect.

Outside the specification, the record's own sentences that the change makes stale, for the record pass: F-19, "Compiled, a function call's arguments run in order (`CodeGen.evalArg`)" and "walk's library splits down to single elements"; P-175, "the code generator evaluates a call's arguments in order", "which the compiled path does not do" and "splits down to single elements".

## Points to report reached

1. **The handler as built.** Its table entry is written in `joinForkedArms`, after the group's code (`CodeGen.java:1685`), for `java/lang/Throwable`, over arm 0 and the joins (`groupStart` at `:1751-1752` to `groupEnd` at `:1663`); the forks lie before it. It joins every arm after the first that was forked (`BaseTask.joinIfForked`, `:113-131`), in the arms' order; an arm that already ended, normally or not, returns at once. The exception that leaves the group is the one the handler caught: the joins of the normal path run in the arms' order and each throws what its arm threw, so it is the exception of the first arm, in that order, that threw (asserted: arms 0 and 1 throw, code of arm 0; arms 1 and 2 throw, code of arm 1). An arm that was never forked is not run: at one thread, 'the first arm throws: caught 1, after the catch: flag 0, later: flag 0'. A `VirtualMachineError` leaves without the joins.
2. **Each node kind whose arguments now fork.** `_RewriteFnApp`, a function call, through `emitFnApp` (`:7561`); `MethodInvocation`, a dotted method call, in its three forms: a generic method's closure (`:6956`), the ordinary call (`:6973`) and a call on an assumed receiver (`:6783`). All through `evalArg`, only where the argument is written as a tuple of two or more elements whose `TupleExpr` the analyzer marked. `ParallelismAnalyzer` has no change, and no call is newly judged: the tuples were marked before and the mark was not read here. What newly forks is an argument list with two or more compute-intensive elements, which in practice is two or more calls of named functions written outside the prelude's files.
3. **The prelude's `gen` does not fork its halves.** The analyzer's reason: `for_RewriteFnAppOnly` returns where the node's printed form holds `CompilerLibrary` or `CompilerBuiltin` (`ParallelismAnalyzer.java:197-203`), and a call prints as its span, so the test is of the source file's path: an instrumented copy of the analyzer, in a private cache, printed 'PROBE fcn=gen nodeHasCompilerLibrary=true ... node=_RewriteFnApp at .../Library/CompilerLibrary.fss:387.16' for each half. So no call in `Library/CompilerLibrary.fss` counts as compute intensive and the tuple of the two halves is not marked. Measured: 'SUM of 64 bodies: 2016, at most 1 at once; parallel for: at most 4 at once'. No prelude text is changed (fork P3). What follows: the new row NEW-P-1, and the case of `CallArgumentsForkCompiled` that writes the halves in a program, where they fork ('a reduction's two halves: 28, at most 4 at once').
4. **Every existing test that failed once arguments fork.** One, `compiler_tests/NumeralStaticDesignCompiled`, by a defect, row 971, which rung N repairs; the test is not changed (above). No line of a team test is changed.
5. **Row 322: rewritten to what remains.** The arm case is repaired (`AtomicEndsArmCompiled`, `TryInArmRungG`). What remains reproduces: `two(k, atomic do ... end)` and `two(k, try boomVal(k) catch e Boom => e.code end)`, where the argument list holds one call and so runs in order, give 'VerifyError: Inconsistent stackmap frames at branch target 1' when the class loads. It has the XXX test `compiler_tests/XXXAtomicBlockLaterArgument` (with `AtomicBlockLaterArgumentLink.test`), shown through `junit.sh` green as it is, 'Saw expected failure (Exit code != 0)', 'OK (2 tests)', and red with the block and the try moved to the first argument for one run: 'Failed to satisfy run_out_does_not_contain; expected REACHED', 'Tests run: 2,  Failures: 1'.
6. **The grain.** The constant is `grainSize`, 16, declared `private grainSize: ZZ32 = 16` at `Library/RangeInternals.fss:20`. The other parallel generators of the file that still split to single elements, listed and not changed: `StridedFullParScalarRange.generate`, both stride signs (`:1498-1536`), and `StridedFullParScalarRange.loop`, both stride signs (`:1539-1585`). The 2D and 3D ranges have no split of their own.
7. **The count and distance tables on the final tree.** Both on 728c0fde79: count 0 and 0, `#crash none`, 86 s; distance `DISTANCE SAME 0`, `#crash none`, 117 s. The machine was loaded by the batch's other work (load 8.9 at the count's start).
8. **A file edited beyond those named:** none. **A line of `BaseTask.java` below `joinOrRun`:** none. **A model line:** none. **A change of which tuples or operators fork today:** none, the analyzer is as it was.

## Decisions

1. **The handler throws on the exception it caught, and computes no "first" exception.** Ways not taken: recording each arm's exception in its task and choosing the first after the joins, as walk's `TupleTask.err` does; a `finally` that also runs the arms never forked. Evidence: the normal path joins in the arms' order and a join throws its arm's exception, so the caught one is already the first in that order (`CodeGen.java:1760-1771`); fork P1 has an arm that was never forked not run.
2. **The join of the abrupt path is a method of `BaseTask`, `joinIfForked`, over `quietlyJoin`.** Ways not taken: `joinOrRun` inside a generated try for each arm, which would run an unforked arm and needs a handler for each; `cancel` of the arms, which the specification's early termination would allow but which nothing else here builds. Evidence: `BaseTask` keeps whether a task was forked in a private field (`runtimeSystem/BaseTask.java:41-44`), and the current task must be restored round a join (`:166-198`).
3. **The entry takes every `Throwable` but a `VirtualMachineError`.** Ways not taken: `FException` alone, which would miss an aborted transaction and the exceptions of natives; every `Throwable`, which waited without end after a stack overflow (the thread dump above; 1,000-deep recursion by forked arguments at default stacks, before: the first run never ended; after: 'passed 3, StackOverflowError 9, at the 30 s limit 0' of 12). The test `ForkedArgumentsStackOverflowCompiled` guards it.
4. **The task locals are disposed after the handler.** Way not taken: disposal inside the join loop, as before, which frees a slot that later code in the covered range could take with another type. Evidence: the handler's frame is the merge of the frames it covers.
5. **`generateTaskCompute` loads `this` after the body and swaps.** Way not taken: storing the body's value in a new local. Evidence: every Fortress value is one reference on the stack, so `SWAP` is enough, and no local is added.
6. **`evalArg` forks only a tuple written as the argument, of two or more elements, whose count equals the parameter tuple's.** Ways not taken: forking a single tuple-typed expression's elements (it is one expression); giving `ParallelismAnalyzer` a case for `MethodInvocation`, which would make a method call compute intensive and so change which tuples and operators fork today, a reserved point. Evidence: 'a method's two arguments: h:1,2, at most 2 at once' with the analyzer as it is.
7. **The tests of a group that throws put the group in a function of its own.** On this branch alone a `try` written around the group in the same function still takes the exception first: `forTry` writes its table entry before its body's code (`CodeGen.java:2165`), so it precedes the group's (row 888's order). Rung X writes it after the body. On the scratch merge of the three rungs the same-function program printed 'a group written inside a try of its own function: caught 1, after the catch: flag 1, later: flag 1', 3 of 3; on this branch alone, 'flag 0, later: flag 1', 2 of 2. Way not taken: reordering the table myself in `CodeGenMethodVisitor` or `forTry`, which are not this rung's. The same-function case is not in the test, since it would fail on this branch; see "For the merged tree".
8. **`CallArgumentsForkCompiled` compares with the arms of a parallel `do`** and does not assert "more than one": the arguments must run at once where three arms do. Way not taken: asserting more than one at once, which fails at one thread, where the specification allows it. Evidence: at one thread the test prints 'at most 1 at once; the arms of a parallel do: 1' and passes.
9. **The grain's test is `0 <= (hi DOTMINUS lo) < grainSize`.** Ways not taken: `hi - lo < grainSize`, which raises `IntegerOverflow` on a range of more than 2^31 elements where the split itself uses wrapping operators; a test of alignment, `(lo BITXOR hi) < grainSize`, which splits `14:17` at 16 and so makes more and smaller chunks. Evidence: the file's own `DOTPLUS` and `DOTMINUS` in the split (`RangeInternals.fss:1324-1325`), and the library's chained comparison (`FortressLibrary.fss:2541`). A range of one element still calls `body(lo)` directly, as before.
10. **The constant is a private top-level declaration beside `printLimit`.** Way not taken: a `var` of the api, as `String.maxLeafSize`, which a program could set; fork G takes one named constant, and its value is for the measurement after the switch-over.
11. **The walk test's failing assertion is the index order of a range of sixteen elements or fewer**, recorded by each body under `atomic` after a 3 ms pause, for `loop` and for `generate`. Way not taken: counting how many bodies run at once, which needs the same pause and says less.
12. **`NumeralStaticDesignCompiled` is left as it is**, failing on this branch alone. Way not taken: binding `small(r)` and `small(m)` in statements of their own, row 971's workaround, which would hide the defect that rung N repairs.
13. **The stack-overflow test recurses 3,000,000 deep**, so that it overflows the suite's 64 MB stacks too, and asserts a non-zero exit with `StackOverflowError` on the error output. Way not taken: no gated test, the defect being one of this rung's own first edit. A broken handler shows as a run that does not end; the suites' run step has no time limit (fork X4 says the same of row 933's test).
14. **The ladder subset is the pass list's parallel programs and the baseline's `run` programs**, the rule's own subset being empty.
15. **The stages were run again after the correction**, though it is in the code generator alone, so that the tables are the final tree's.
16. **A scratch merge of the three rungs' heads was built under this tree's `tmp/` and removed**, to see whether the two things this branch alone leaves red are repaired by the other rungs. It is not the gather's merge and nothing of it is committed.
17. **The commit footer is the skill's**, `Co-Authored-By: Claude <noreply@anthropic.com>` with the session line.

## Defects, each with its home

| defect | home | where |
|---|---|---|
| a group that completes abruptly leaves its forked arms running (row 947) | 1 | `compiler_tests/AlsoArmThrowsJoinsCompiled` |
| a local of a task arm takes slot 0 (row 497) | 1 | `compiler_tests/TaskArmLocalSlot`, promoted |
| a `try` or an `atomic` block in a task arm fails verification (row 322's arm case) | 1 | `compiler_tests/TryInArmRungG`, promoted; `compiler_tests/AtomicEndsArmCompiled` |
| a call's arguments never fork (row 951) | 1 | `compiler_tests/CallArgumentsForkCompiled` |
| the parallel range splits to single elements (P-175) | 1 | `tests/ParRangeGrainWalk` |
| a group that a stack overflow leaves waits without end (of this rung's first edit) | 1 | `compiler_tests/ForkedArgumentsStackOverflowCompiled` |
| an `atomic` block or a `try` as a call's later argument fails verification (row 322's remainder) | 2 | `compiler_tests/XXXAtomicBlockLaterArgument`, row 322's new line |
| the prelude's reductions stay in sequence: the analyzer skips every call in the prelude's files | 3 | row NEW-P-1, reproducer `none`: the specification allows either, and the limit ends at the switch-over, so no test asserts it |
| a numeral coercion whose arguments fork fails its class's load (row 971, reached by `NumeralStaticDesignCompiled`) | the row's own | row 971, rung N's; a note for it in record.md |
| forked arguments overflow a default stack as forked operands do (row 640) | the row's own | a note on row 640; 9 of 12 runs |
| a `try` in the same function takes a group's exception before the joins | none on the merged tree | this branch alone; rung X's order repairs it (decision 7) |

## For the merged tree

- `compiler_tests/NumeralStaticDesignCompiled` passes only with rung N's root task. If N's repair of row 971 does not land with this rung, that test is red.
- A `try` around a group in the same function joins the arms only with rung X's order of the exception table. A case for `AlsoArmThrowsJoinsCompiled` that would guard it on the merged tree, to add there if wanted:

      inTry(k: ZZ32): ZZ32 = do
        var caught: ZZ32 := 0
        try
          do
            boomArm(k)
          also do
            slowArm(k)
          end
        catch e
          Boom => caught := e.code
        end
        caught
      end

  and in `run`, `flag := 0` then `settled("a group inside a try of its own function", inTry(7), 7)`.
- The three programs of this rung with pauses (`AlsoArmThrowsJoinsCompiled`, `CallArgumentsForkCompiled`, `ForkedArgumentsStackOverflowCompiled`) are the ones for the atomic runs.

## Commands worked out

- Seeing why the analyzer does not mark a call: copy `ParallelismAnalyzer.java` to a scratch folder, add a `System.err.println` in `for_RewriteFnAppOnly`, compile it with `javac -cp "$(bin/fortress_classpath | tail -1)" -d <scratch>/classes`, copy `default_repository/caches` to a private folder, remove the component's `.tfs` entries from its `analyzed_cache/` and `analyzed_cache/depends/` (removing the jar alone compiles nothing), and run `java $JAVA_FLAGS -Dfortress.caches=<private> -cp "<scratch>/classes:$CP" com.sun.fortress.Shell compile ../Library/CompilerLibrary.fss` from `ProjectFortress/` with `FORTRESS_CACHES=<private>`.
- Seeing a run that may not end, through a harness: `cd ProjectFortress && JAVA_FLAGS="-Xmx2g -Xss1m" FORTRESS_THREADS=4 timeout -k 5 40 ../bin/fortress junit compiler_tests/X.test`; exit 124 is the run that did not end. `junit.sh` pins `-Xss64m`.
- A thread dump of a compiled run that does not end: `jstack <pid>` of the `java` process whose `cwd` is the tree.
