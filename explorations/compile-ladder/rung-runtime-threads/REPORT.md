# Rung H, `rung-runtime-threads`: the run time's own threads, `abort` and the task trace on compiled helpers

- problem: six bindings of the one library named walk's glue classes, so a compiled body would fall through to the library's own `builtinPrimitive`, which fails: `Thread`'s `val`, `wait`, `ready` and `stop` and the top-level `abort` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:775-786` at 157323e5) and `printTaskTrace` (`Library/FortressLibrary.fss:4625` at 157323e5); F-32, "The compiled path cannot reuse walk's glue classes", counts them among its 102.
- spec: `Specification/advanced/parallelism-locality/transactions.tex:15-21` (`abort` abandons the innermost `atomic` expression, rolls back its changes and runs it again; outside one it has no effect); `Specification/basic-lib/thread.tex:35-58` (`val`, `wait`, `ready`, `stop`); `Specification/basic/expressions/spawn.tex:21-27`. No chapter names `printTaskTrace`: `grep -rn printTaskTrace Specification/` prints nothing.
- precedent: P-167's device, walk's loader table (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:47-53` at 157323e5, `stringOps.typeName` to `ObjectPrims$ClassName`); the team's helper class over the compiled run time (`ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java:15-18` at 157323e5); P-162's pair, a read at `T` through `cast` (`Library/FortressLibrary.fss:2643`).
- deviation: the abort tests count their tries by a deadline on the clock, not by a variable, since `abort` rolls such a variable back (decision 7); `printTaskTrace` reads a task's package-private `parent` by reflection, since the brief keeps `runtimeSystem/` out of reach (`ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java:71-90`); `Utility.makeFortressException(name, msg)` is repaired, a file the brief does not name (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:30`); the compiled trace prints `Task: <class>` lines, which no source of the team specifies (`runtime.java:41-48`).
- historical: `ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java`, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `Library/FortressLibrary.fss`.

Base 157323e5. Commits on `wip/rung-runtime-threads`: 5dba0d1c, the tests; 180751e1, the edit and the raise test. Every stage, suite, ladder run and demo below ran on 180751e1, after its build; no code changed after it.

## 1. What changed and why

**The six helpers** (`ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java`, fork H1), in the team's class beside `loopChunk` and `numThreads`, each with a signature that maps to Fortress:

    public static void abort()                                                   // :34-37
    public static void printTaskTrace()                                          // :41-48
    public static fortress.AnyType.Any threadVal(fortress.AnyType.Any self)      // :52-54
    public static void threadWait(fortress.AnyType.Any self)                     // :56-58
    public static boolean threadReady(fortress.AnyType.Any self)                 // :60-62
    public static void threadStop(fortress.AnyType.Any self)                     // :64-66

- `abort()` throws the compiled `runtimeSystem.TransactionAbortException` when the current thread is a `FortressTaskRunner` and `BaseTask.inATransaction()` holds, and else returns (fork H3). The compiled `atomic` catches that exception, cleans up and runs the block again (`compiler/codegen/CodeGen.java:1737-1765`); the transaction keeps its writes until it commits (`runtimeSystem/Transaction.java`, `TXWrite` and `TXCommit`), so the aborted try's writes vanish, where the block is not nested in another: in a nested block the outer block's handler takes the abort and reruns the outer block, whose first try's write stays (NEW-H-1, section 12).
- `printTaskTrace()` builds the compiled task chain, from `BaseTask.getCurrentTask()` through each task's `parent` (`runtimeSystem/BaseTask.java:46`) to the primordial task, the component's own class, one line `Task: <JVM class name>` a task, and writes it with one `print`, so that two chains printed by parallel tasks do not interleave line by line.
- `threadVal`, `threadWait`, `threadReady` and `threadStop` throw `Utility.makeFortressException("fortress.CompilerLibrary$FailCalled", "spawn is not compiled yet")` (fork H2), until the code generator compiles `spawn` (row 82).
- A nested class `runtime.TaskParent` holds the reflective read of `parent`; the wrapper generator wraps every method of a helper class, the private ones too (`compiler/nativeInterface/FortressMethodAdapter.java:215-229` has no access test), so a method over `java.lang.reflect.Field` in `runtime` itself would fail every import of the class.

**The bindings.** `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:775-787`:

    object Thread[\T\] (fcn:()->T)
        val():T         = cast[\T\](valAny())
        private valAny():Any =
            builtinPrimitive("com.sun.fortress.nativeHelpers.runtime.threadVal")
        wait():()       =
            builtinPrimitive("com.sun.fortress.nativeHelpers.runtime.threadWait")
        ready():Boolean =
            builtinPrimitive("com.sun.fortress.nativeHelpers.runtime.threadReady")
        stop():()       =
            builtinPrimitive("com.sun.fortress.nativeHelpers.runtime.threadStop")
    end

    abort():() = builtinPrimitive("com.sun.fortress.nativeHelpers.runtime.abort")

and `Library/FortressLibrary.fss:4625`, `printTaskTrace():() = builtinPrimitive("com.sun.fortress.nativeHelpers.runtime.printTaskTrace")`. `val` is P-162's pair: the compiled rewrite checks a binding against the helper's Java signature (F-298), and a helper answers `Object`, so `val(): T` is `cast[\T\]` over a bare binding at `Any`, which is private, since the api (`FortressBuiltin.fsi:306-313`) does not declare it and does not change. Walk instantiates `spawn`'s `Thread` at `Any` (`interpreter/rewrite/DesugarerVisitor.java:1017-1024`), so its `cast` is `cast[\Any\]`.

**Walk's table** (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:53-65`, fork H4): six entries in `OWN_OPERATIONS`, each helper's name to today's glue:

| helper | glue |
|---|---|
| `nativeHelpers.runtime.threadVal` | `glue.prim.Thread$val` |
| `nativeHelpers.runtime.threadWait` | `glue.prim.Thread$wait` |
| `nativeHelpers.runtime.threadReady` | `glue.prim.Thread$ready` |
| `nativeHelpers.runtime.threadStop` | `glue.prim.Thread$stop` |
| `nativeHelpers.runtime.abort` | `glue.prim.Thread$abort` |
| `nativeHelpers.runtime.printTaskTrace` | `glue.prim.StringPrim$PrintTaskTrace` |

So walk never loads the six helpers; its `spawn`, transactions and trace run as before, and its `Thread` constructor stays glue.

**`Utility.makeFortressException(name, msg)`** (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:30`). It looked up the exception's constructor over `java.lang.String`, but every compiled exception that takes a message takes the prelude's `String` (`javap` of `fortress.CompilerLibrary$FailCalled`: `public fortress.CompilerLibrary$FailCalled(fortress.CompilerBuiltin$String);`), and the method already passes an `FJavaString`, a `CompilerBuiltin.String`. So every compiled helper raise with a message ended in `FortressImplementationError`, which no `catch` sees: the 13 raises with a message in `nativeHelpers/fileOps.java` (2), `compiler/runtimeValues/FortressBufferedReader.java` (6) and `FortressBufferedWriter.java` (5), twelve of them `makeFortressException(name, e)` and one `(name, msg)` (`FortressBufferedReader.java:120`), and the four raises of fork H2. The lookup now names `fortress.CompilerBuiltin.String.class`, one token. Under walk nothing changes: no compiled exception class is on walk's class path (the bootstrap stubs in `ProjectFortress/build/fortress/` hold no exception), so `Class.forName` still fails first and `StaticNativeApp.raised` (`interpreter/glue/StaticNativeApp.java:277-282`) still raises the library's object by name.

## 2. The tests

- `ProjectFortress/tests/RuntimeOwnOperationsWalk.fss`, a guard: a spawned thread's `wait`, `ready`, `val` and `stop`; `abort()` outside `atomic`, after which the next line runs; `abort()` inside `atomic` on every try that starts before a deadline 20 ms ahead, with a write before it and one after it, so that the block commits once with only its first write (`x = 10`) and at or after the deadline; `printTaskTrace()` inside a spawned thread, whose `val` still answers.
- `ProjectFortress/compiler_tests/RuntimeOwnOperationsCompiled.fss` and `.test`: `runtime.abort`, `runtime.printTaskTrace`, `runtime.threadVal` and `simpleLongArith.longNanoTime` bound in the test's own declarations; `abortC()` outside `atomic`, and inside one as in the walk test; `traceC()` in each iteration of `for i <- 0#4`, whose second half runs in the prelude's loop task; `valC(Handle)` caught as `FailCalled`. Its key `run_out_matches=(?s).*Task: [^\n]*task[0-9]+\nTask: RuntimeOwnOperationsCompiled\n.*PASS.*` asserts a trace whose first line names a generated task class and whose next line names the primordial task, the component itself, and `PASS`.
- `ProjectFortress/compiler_tests/HelperRaiseMessageCompiled.fss` and `.test`: the prelude's `makeJavaBufferedReader` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1173`, over `fileOps.jbrOpen`) on a missing file, caught as `FileNotFoundException`.

**The failing runs, on the base's code**, each before the edit was first built (the build started after 04:57 UTC):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-H ProjectFortress/compiler_tests RuntimeOwnOperationsCompiled.test
    # junit.sh base-H 2026-11-08T04:54:32Z; ... tree 157323e5 ...
    . link ProjectFortress/compiler_tests/RuntimeOwnOperationsCompiled ProjectFortress/compiler_tests/RuntimeOwnOperationsCompiled.fss:5:33-76:
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.runtime.abort
    FAILURES!!!
    Tests run: 2,  Failures: 2,  Errors: 0

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-H2 ProjectFortress/compiler_tests HelperRaiseMessageCompiled.test
    # junit.sh base-H2 2026-11-08T04:56:34Z; ... tree 5dba0d1c ...
    . run ProjectFortress/compiler_tests/HelperRaiseMessageCompiled (269ms) com.sun.fortress.compiler.runtimeValues.FortressImplementationError: fortress.CompilerBuiltin$FileNotFoundException.<init>(java.lang.String)
    FAILURES!!!
    Tests run: 2,  Failures: 1,  Errors: 0

The walk guard and the team's tests on the base's code, before any library edit:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/.../h1 ProjectFortress/tests/RuntimeOwnOperationsWalk.fss ProjectFortress/tests/taskTrace2.fss ProjectFortress/tests/taskTrace3.fss ProjectFortress/tests/abortTest.fss ProjectFortress/tests/abortBlock.fss ProjectFortress/tests/Spawn1.fss ... Spawn6.fss
    # harness-one 2026-11-08T04:54:46Z; tree 157323e5; nproc=4; ... FORTRESS_THREADS=4; cache empty
    OK (11 tests)

**The passing runs, on 180751e1:**

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh edit1-H ProjectFortress/compiler_tests RuntimeOwnOperationsCompiled.test HelperRaiseMessageCompiled.test
    . run ProjectFortress/compiler_tests/RuntimeOwnOperationsCompiled (453ms) Task: RuntimeOwnOperationsCompiled
    Task: fortress.CompilerLibrary$task0
    Task: RuntimeOwnOperationsCompiled
    OK (4 tests)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/.../h1 (the same eleven files)
    # harness-one 2026-11-08T04:59:28Z; tree 5dba0d1c; ... FORTRESS_THREADS=4; cache empty
    OK (11 tests)

The harness line names 5dba0d1c, the commit then checked out; the edit, committed as 180751e1 right after, was in the tree and built. At one thread, run directly: `fortress compile compiler_tests/RuntimeOwnOperationsCompiled.fss` (rc=0), then `FORTRESS_THREADS=1 fortress run RuntimeOwnOperationsCompiled` printed the same three-line chain and `PASS`, `run rc=0`; `FORTRESS_THREADS=1 fortress tests/RuntimeOwnOperationsWalk.fss` printed its `Spawn Task: …` line, `walk rc=0`.

A probe of the compiled abort, `ProbeAbortTries` (a 2 ms deadline, a `println` before each `abortC()`), printed `try aborts` once and then `x =  10`: the first try aborts, the second commits with only its own write.

**The suites**, once each on 180751e1, since the edit changes walk's loader and helper classes that both paths run (`tests-running.md`, "When to run a whole suite"):

    ant testSystem   ->  BUILD SUCCESSFUL / Total time: 3 minutes 57 seconds
                         shards 192 + 194 + 192 + 201 = 779 tests, 0 failures, 0 errors (climb batch 27's gate: 778; +1, RuntimeOwnOperationsWalk)
    ant testQuick    ->  BUILD SUCCESSFUL / Total time: 6 minutes 17 seconds
                         CompilerJUTest 1451 (climb batch 27: 1447; +4, the two new .test files' link and run), LibraryJUTest 86, OtherCompilerJUTest 263; 0 failures, 0 errors

No test's verdict changed in either suite.

## 3. Where the fix belongs, and the precedent

- The place: `explorations/coordinator/map/spec-to-implementation.md`'s rows for `spawn` and `atomic` put walk's half in `glue/prim/Thread.java` and `evaluator/tasks/`, and the compiled transactions in `runtimeSystem/BaseTask.java`; the natives' strings are read in `interpreter/glue/NativeApp.java`, `checkAndLoadNative`. The decision (P-169, "The runtime's own 45 native bindings…") puts the helpers in a `nativeHelpers` class over the compiled run time and walk's answer in the loader's table, P-167's device ("The three natives over `Any`…").
- The precedent: P-167's two entries, the only ones in `OWN_OPERATIONS` (`NativeApp.java:49-52` at 157323e5); its tests, `tests/AnyNativesIntrinsicWalk.fss` and `compiler_tests/AnyNativesIntrinsicCompiled.fss`, whose compiled half binds the helpers in its own declarations, as this rung's does. The table had two entries; it now has eight.
- The ways the language and the library offer for each of the six (`reviews/natives-remainder-2026-11-07.md`, section 2.6): (a) a helper on both paths, which walk cannot run over its own tasks; (b) P-167's device, taken; (c) a helper that raises on both paths, ruled out by the specification; (d) removal, ruled out for `Thread` and `abort` by `spawn`'s desugaring; (e) glue kept, which leaves the count at 102.
- The precedent search for `Utility`'s defect: the 13 raises with a message listed in section 1 share the one lookup; none of the team's or the revival's compiled tests reached one before `HelperRaiseMessageCompiled` (`ant testQuick` passes with the fix, and no test pinned the old error).

## 4. What the specification settles

`transactions.tex:15-21` settles `abort` on both paths: abandon and roll back the innermost `atomic` expression, run it again, and do nothing outside one. The tests assert both halves on both paths. `thread.tex:35-58` settles `Thread`'s four, which walk answers; on the compiled path the four raise `FailCalled` until `spawn` compiles, row 82, the gap the record already holds. The specification is silent on `printTaskTrace`, so its compiled line, `Task: <class>`, is this rung's (decision 5).

## 5. The checker count and the distance, on 180751e1

Both read this tree's code: the edit adds Java under `nativeHelpers/` and `compiler/runtimeValues/` and changes `FortressBuiltin.fss` and `FortressLibrary.fss`.

The count stage (`explorations/coordinator/tools/checker-count/run.sh`), started 05:00:55 UTC on 180751e1; its table against climb batch 27's (`explorations/compile-ladder/climb-batch-27/gate/checker-count.txt`):

    diff explorations/compile-ladder/climb-batch-27/gate/checker-count.txt <this run's table>
    (no output)
    #total	0
    #locations	0
    #crash	none

`runtime.java` is read whole for the first time: the stage's generated api of `com.sun.fortress.nativeHelpers` (in its analyzed cache) lists `runtime'2615'loopChunk()I`, `runtime'2615'abort()V`, `runtime'2615'printTaskTrace()V` and `runtime'2615'threadVal(Lfortress/AnyType$Any;)Lfortress/AnyType$Any;` among its methods, and the stage counts 0.

The distance stage (`explorations/coordinator/tools/distance/run.sh`), started 05:03:07 UTC on 180751e1, 155 s:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-27/gate/distance.txt <this run's table>
    DISTANCE SAME   0

    #crash	decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
    #crash	stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1

The two crash rows are row 929's, in value object `Char`, at the same lines as in climb batch 27's table (the edit is below `Char`, from line 775). No site moved: the run's `errors.tsv` holds only its header, as `explorations/compile-ladder/gate/distance-sites.tsv` does. The stage checked the edited declarations: its log has `@@TC DECL-OK	ObjectDecl	…/FortressBuiltin.fss:775:1-785:2	errors=0` (`Thread`) and `@@TC DECL-OK	FnDecl	…/FortressBuiltin.fss:787:1-790:37	errors=0` (`abort`).

## 6. The ladder subset, on 180751e1

The subset (`gate.md`, "The ladder regression", its last paragraph): the files whose recorded first error names something this rung touched, `tests/Spawn1.fss` to `Spawn6.fss` ("Thread is undefined."), `taskTrace2.fss` and `taskTrace3.fss` ("Variable printTaskTrace is not defined."), `abortBlock.fss`, `abortTest.fss` and `tryatomicTest.fss`; and the gate's five pass-list programs over transactions, `atomic0`, `atomic2`, `atomic3`, `atomic4` and `atomicTest`. Against the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-27/gate/ladder/ladder.tsv`) for the five it holds, and the baseline's (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`) for the eleven it does not:

    atomic0 atomic2 atomic3 atomic4 atomicTest   pass          landed=pass          SAME
    Spawn1 ... Spawn6                             disambiguate  baseline=disambiguate SAME   Thread is undefined.
    taskTrace2 taskTrace3                         disambiguate  baseline=disambiguate SAME   Variable printTaskTrace is not defined.
    abortBlock                                    disambiguate  baseline=disambiguate SAME   Variable printThreadInfo is not defined.
    abortTest                                     disambiguate  baseline=disambiguate MOVED  Variable abort is not defined.
    tryatomicTest                                 codegen       baseline=disambiguate MOVED  Can't compile TryAtomicExpr at …

The two moves are the base's, not this rung's: the old code gives the same first errors (`old-fortress.sh /home/user/fortress-base28 <private caches> compile abortTest.fss` printed `Variable abort is not defined.`, and `… compile tryatomicTest.fss` printed `Can't compile TryAtomicExpr at …`), since the compiler's prelude declares `TryAtomicFailure` at the base (`Library/CompilerLibrary.fsi:105`) and did not at the baseline. The compiled path compiles programs against the compiler's prelude, which declares no `Thread`, `abort` or `printTaskTrace` (row 82), so these phases cannot move before the switch-over.

## 7. The team demos

The demo driver of `explorations/compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out", once on 180751e1 under walk, since the edit changes walk's loader and the interpreter's library (`tests-running.md`, "Outside the gate"):

    bash <the driver> <out-dir>
    demos: 52 run, 52 reached their end

No demo calls `spawn`, `abort` or `printTaskTrace` (`grep -ln 'spawn\|abort()\|printTaskTrace\|Thread\[' ProjectFortress/demos/*.fss` prints nothing); every demo loads the edited `FortressBuiltin`.

## 8. Programs run old against new

- `RuntimeOwnOperationsCompiled` and `HelperRaiseMessageCompiled`: the base's code fails both (section 2); 180751e1 passes both.
- `abortTest.fss` and `tryatomicTest.fss` on the compiled path, through `old-fortress.sh`: the same first errors as 180751e1's ladder subset (section 6).
- The walk guard and the team's eleven tests through `harness-one.sh`: `OK (11 tests)` on both.

## 9. Sentences made false

None of the specification: no passage says what the compiled path does with `abort`, `Thread` or `printTaskTrace` (`grep -n 'abort\|Thread\|printTaskTrace\|spawn' Specification/appendices/changes.tex` finds only the natives effect below). The record's, for the gather:

- `Specification/appendices/changes.tex:4625`, Appendix I's natives effect: "341 of the 443 bindings of \library\ name a helper:" and `:4658`, "The other 102 still name a glue class, which the compiled code cannot call." On this tree alone, 347 and 96 (six glue bindings become helper bindings; `val` leaves the count and `valAny` joins it). The gather writes the merged count (fork 5).
- F-32 (`explorations/coordinator/FACTS.md:30`), "the Java classes that 102 of the one library's 443 live native bindings still name" and "F-299 holds the 341 that name one"; and its "`Thread`, `Reflect` and `printTaskTrace` are off microGPT's path" among "the 42 with no analogue", of which `Thread`'s 5 and `printTaskTrace` now name helpers.
- F-299 (`FACTS.md:134`), "341 of the one library's 443 live bindings name one" and "the other 102 name glue classes"; its list by type gains `Thread`'s four, `abort` and `printTaskTrace`.
- F-328 (`FACTS.md:152`), "walk's loader maps the two names, before it looks for a helper, to `ObjectPrims$ClassName` and `AnyPrim$SEquiv`": the table now has eight names.
- `explorations/coordinator/PLAN.md:47`, "Since climb batch 27, 341 of the 443 live bindings name helpers and 102 still name glue classes"; `PLAN.md:56`, D2's line, "and `Thread`'s 5 and `printTaskTrace` onto helpers over the compiled runtime, by P-169; … `Thread` and `printTaskTrace` in climb batch 28 if they join it".
- A comment of the tree: the javadoc of `OWN_OPERATIONS` (`NativeApp.java:42-46`), "the library binds these over Any, which no Java type carries for walk's values", now holds for four of the eight; the brief kept the edit to the static block, where a comment line names the six (`:53`).

## 10. Points to report

- **The six helpers as written, with their Java signatures, and the loader table's six entries:** section 1; `runtime.java:34-66`; `NativeApp.java:53-65`.
- **`Thread`'s four and `abort` as declared, `val`'s pair among them:** `FortressBuiltin.fss:775-787`, section 1.
- **The tests before and after, through the harness and `junit.sh`:** section 2; `abort` inside and outside `atomic` on each path, `spawn`'s four under walk, `tests/taskTrace2.fss` and `taskTrace3.fss` green before and after.
- **The count table and the distance table on the final tree:** section 5; count 0, equal to climb batch 27's; distance 0, `DISTANCE SAME`; the two crash rows in `Char` (`FortressBuiltin.fss:661:1-773:2`) stay at their lines; no site comes; `runtime.java` read whole.
- **Each test whose verdict changes in `ant testSystem` or `ant testQuick`:** none (section 2).
- **Every sentence made false:** section 9.
- **A file edited beyond those named:** `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:30`, and its test `compiler_tests/HelperRaiseMessageCompiled.fss` and `.test`. No edit of the code generator, of walk's tasks or of the compiled transaction.
- **A compiled run that the helpers change beyond the six names** (a reserved point): the repair of `Utility.java:30` changes every compiled helper raise with a message, the 13 raises in `fileOps.java`, `FortressBufferedReader.java` and `FortressBufferedWriter.java`: a missing file, a read or write that fails, now raise the prelude's `FileNotFoundException` or `IOFailure` with the Java exception's message, which a `catch` sees, where they ended the run in `FortressImplementationError` (section 2, the second failing run). Walk does not change. Reversible.

## 11. Decisions

1. **The six in `runtime.java` (fork H1).** Ways not taken: a new helper class. The class maps whole: the count stage's generated api holds all eight methods and counts 0 (section 5).
2. **`Thread`'s four raise `FailCalled` by the prelude's name, "spawn is not compiled yet" (fork H2).** Ways not taken: a raise without a message, which `FailCalled` cannot take (its only constructor takes a `String`, `javap`); a Java error. Evidence: `compiler_tests/RuntimeOwnOperationsCompiled` catches it as `FailCalled`.
3. **`val(): T = cast[\T\](valAny())` over a private `valAny(): Any` (P-162, fork H2).** Ways not taken: a public `valAny`, a member that the api does not declare and that any program could call; a `typecase` written out in place of `cast`. Evidence: the distance stage's `DECL-OK` at `FortressBuiltin.fss:775:1-785:2`; the walk test's `t.val()`.
4. **`abort` tests the thread before `BaseTask.inATransaction()`.** Ways not taken: `inATransaction()` alone, which casts the current thread to `FortressTaskRunner` (`runtimeSystem/BaseTask.java:247`) and so throws `ClassCastException` on a thread outside the pool, such as a class initializer's. `printTaskTrace` returns there too.
5. **The compiled trace's line is `Task: <JVM class name>`, the chain written in one `print`.** Ways not taken: a `println` per task, whose lines from two parallel tasks interleave at four threads; the Fortress name through `Naming.demangleFortressIdentifier`, which hides the generated task classes' names; walk's per-kind texts, which the compiled tasks have no fields for. The specification is silent (section 4).
6. **A task's `parent` read by reflection, in a nested class.** Ways not taken: a public accessor on `runtimeSystem/BaseTask.java`, one line, outside the files the brief allows ("Not: … `runtimeSystem/`"); a private method of `runtime`, which the wrapper generator would wrap and fail on its `Field` type (section 1). A question for the curator (below).
7. **The abort tests count their tries by a deadline on the clock.** The brief's test, a try counter in a variable outside the block whose second try commits, cannot end on either path: `abort` rolls the counter back with the try (`transactions.tex:15-19`), so every try sees the first. Under walk, a probe with that counter (`tries += 1; if tries = 1 then abort() end` inside `atomic`) ran until `timeout 60` killed it: `rc=124`. Ways not taken: the counter; `tryatomic` in a loop, which counts its tries outside, but the code generator has no `TryAtomicExpr` ("Can't compile TryAtomicExpr", section 6); a second task that clears a flag, the specification's own incorrect example (`transactions.tex:22-30`), which at one thread spins forever. The deadline asserts the rollback (`x = 10` where each aborted try wrote first), that control never passes `abort()` (the write after it would show in `x`), and that the committing try ran at or after the deadline.
8. **`Utility.makeFortressException(name, msg)` repaired in place.** Ways not taken: leave it and build `FailCalled` by reflection in `runtime.java`, which keeps the 13 other raises broken; a ledger row and an `XXX` test with no repair. The brief names this call for the raise, and the call could not raise.
9. **The trace's check is `run_out_matches` over a generated task's line, then the component's line, then `PASS`.** Ways not taken: `run_out_contains` of `Task: fortress.CompilerLibrary$task0`, a class name of the compiler's prelude that the switch-over changes; two `run_out_contains` keys, which a `.test` file, a Java property file, cannot hold.
10. **The raise test goes through the prelude's `makeJavaBufferedReader`.** Ways not taken: a binding of `fileOps.jbrOpen` in the test's own declarations, which reaches the same helper.
11. **The comment in `NativeApp.java` is one line inside the static block; its javadoc is left.** The brief limits the edit to the static block.

## 12. Defects and their homes

- **A compiled helper raise with a message ended in `FortressImplementationError`** (`Utility.java:30` at 157323e5): home 1, repaired; asserted by `compiler_tests/HelperRaiseMessageCompiled` and by `RuntimeOwnOperationsCompiled`'s `FailCalled` catch. No row: the landed record held no row for it (`ledger-find:makeFortressException` finds only row 350, the no-message form), and the repair lands with its test. Rung R of this batch records the same defect as NEW-R-1, home 2, with the pair `compiler_tests/FileOpsRaiseCaughtCompiledLink.test` and `XXXFileOpsRaiseCaughtCompiled.test` (`explorations/compile-ladder/rung-io-reader/record.md` on `wip/rung-io-reader`). This repair turns that `XXX` test red on the merged tree: R's program on this rung's code prints `REACHED` and exits 0, where on the base's code it ends in `FortressImplementationError: fortress.CompilerBuiltin$IOFailure.<init>(java.lang.String)`, rc=1 (SKEPTIC.md). The gather promotes R's pair to a plain name and closes NEW-R-1 by 180751e1.
- **Compiled `spawn`** stays row 82, with a note (record.md).

- **NEW-H-1, compiled `abort` in an `atomic` block nested in another reruns the outer block, whose first try's write stays** (`compiler/codegen/CodeGen.java:1746`, the exception-table entry written before the body, as row 888 for `try`): home 2, the pair `compiler_tests/NestedAtomicAbortCompiledLink.test` and `XXXNestedAtomicAbortCompiled.test`, settled by `transactions.tex`, "Abortable Atomicity" (the innermost block); the code generator and the compiled transaction are outside this rung. Measured by the skeptic's programs (SKEPTIC.md).
- **NEW-H-2, under walk `wait` and `val` on a spawned thread that completed abruptly spin forever** (`interpreter/evaluator/tasks/SpawnTask.java:30-39`, `:56-68`): home 3, the row only, since no gated test can pass while the run spins; the specification settles it (`basic/evaluation/parallelism.tex`, "Threads and Parallelism": `val` throws the deferred exception, `wait` returns). The base's code does the same; walk's tasks are outside this rung. Measured by the skeptic's programs (SKEPTIC.md).

No other defect was measured.

## 13. Questions for the curator, as decisions not taken

- **A public accessor for a task's parent.** `printTaskTrace` reads `runtimeSystem.BaseTask`'s package-private `parent` by reflection (`ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java:71-90`; the field, `runtimeSystem/BaseTask.java:46`), since the brief kept `runtimeSystem/` out of this rung. Default: as landed. The way not taken: a one-line `public BaseTask parent()` on `BaseTask`, and `runtime.java` calling it, when a later rung edits `runtimeSystem/`.
- **The message of a compiled helper's raise against walk's (item 384).** With `Utility.java:30` repaired, a compiled helper's raise carries the Java message into the prelude's exception, whose constructor takes it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:762`, `:766`; `Library/CompilerLibrary.fsi:66`), while under walk the library's object carries none (`interpreter/glue/StaticNativeApp.java:277-282`), item 384's default. The paths agree on the exception's type and differ on its message until N5 names the one library's classes. Default: as landed; item 384 stays his.

## 14. Commands worked out

- Whether a stage read a helper class whole: `grep -o "runtime[^ ()]*" <scratch>/caches/analyzed_cache/com.sun.fortress.nativeHelpers-*.tfi | sort -u` lists every method of the class that the stage's generated api holds.
- The ladder subset against the landed table and the baseline: a 20-line Python reading `ladder.tsv` of the subset, of `explorations/compile-ladder/climb-batch-27/gate/ladder/ladder.tsv` and of `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` by (corpus, file), and printing each file's phase and first error against the landed row where one exists, else the baseline's.

## 15. For FACTS

Two entries, in `record.md`, "FACTS.md": the six names on `nativeHelpers/runtime` with walk's table of eight, and the compiled raise with a message.
