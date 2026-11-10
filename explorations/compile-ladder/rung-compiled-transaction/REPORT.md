# Rung X, rung-compiled-transaction: the compiled transaction

- problem: the compiled path failed seven of thirteen program shapes of the review of the parallelism's foundations, where walk passed all but one: `explorations/reviews/parallelism-foundations-2026-11-08.md:161-183`
- spec: `Specification/basic/expressions/atomic.tex:36-81` ("Atomic Expressions"); for abort, `Specification/advanced/parallelism-locality/transactions.tex:15-19`; for try, `Specification/basic/expressions/try.tex:54-60`
- precedent: walk's transaction, which the batch record names as the reference: every exception that leaves a transaction's body ends the transaction (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/tasks/FortressTaskRunner.java:121-138`, the `finally` of `doItOnce`), and an abort carries its transaction (`:129`, `:165-170`); the team's own merge of a nested transaction's reads into its parent, kept as it is (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:341-354`)
- deviation: one line each. (1) The handler of a compiled atomic block takes every exception, not only `TransactionAbortException`: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1801`. (2) An abort names a transaction: `runtimeSystem/TransactionAbortException.java:28`. (3) A nested transaction that commits without a write, or that an exception leaves, still hands its reads to its parent: `runtimeSystem/Transaction.java:302-318`. (4) A read and its record are one step under the read set's lock, more than fork X2's words ask: `runtimeSystem/Transaction.java:237`. (5) `BaseTask.cleanupTransaction()` is replaced by `leaveTransaction(Throwable)`: `runtimeSystem/BaseTask.java:273`
- historical: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java`, `runtimeSystem/TransactionAbortException.java`, `runtimeSystem/BaseTask.java`, `compiler/codegen/CodeGen.java`, `compiler_tests/` (new tests only; no file of the 2012 tree among them): none

The code commit is 13c90e37e9 on `wip/rung-compiled-transaction`, cut from 9d0147ff9e. Every run below named "after" ran on that commit's code; no change of code followed it.

## What changed and why

The compiled path runs an `atomic` block as a transaction of one global sequence lock, buffered writes and validation by value (`runtimeSystem/Transaction.java`), inside a handler that `CodeGen.forAtomicBlock` writes. Six repairs, by declaration:

1. **The handlers of nested blocks and of nested try** (rows 934, 937, 888). `CodeGen.forAtomicBlock` (`CodeGen.java:1782-1814`) and `CodeGen.forTry` (`:2104-2120`) now call `visitTryCatchBlock` after the body's code. The JVM takes the first entry of the exception table that covers a throw, so the entry of a block or a try nested in the body, written when the body is visited, now comes first. `startTransaction` is emitted by `forAtomicBlock` itself, before the range, so the handler runs only when the block's transaction is the task's current one; `forAtomicBlockHelper` (`:1769-1773`) emits the body and `endTransaction`.
2. **A block's own writes** (row 933, fork X1). `Transaction.TXReadLocation` (`Transaction.java:228-248`) returns the transaction's own write before anything else and records nothing for it. A read of an ancestor's write is recorded with that write, and `validateReads` (`:255-268`) compares it with the nearest ancestor's write now, else with the committed value.
3. **A nested block's view** (row 950, fork X3). `Transaction.TXValidate` (`:275-284`) validates the transaction and then each ancestor, at one time of the global lock. `TXAbort` (`:186-189`) throws `TransactionAbortException(this)`, so the abort names the transaction whose read failed, which can be an ancestor of the one that found it. `BaseTask.leaveTransaction` (`BaseTask.java:273-294`) ends the block's own transaction and returns, so that the block starts again, only for an abort of that transaction; an abort that names an ancestor is thrown on.
4. **The shared sets** (row 949, fork X2). Every iteration of a read set or a write set is inside `synchronized` on that set: validation (`Transaction.java:256`), the write-back of a top-level commit (`:332`), the merge of reads (`:341`) and of writes (`:357`) into a parent. `Hashtable`'s own methods take the same monitor, so a put by another thread of the block waits for the iteration. A read and its record are one step under the read set's lock (`:237-246`).
5. **Two initializations of one element** (row 466's note, fork X5). The read of an element that holds nothing is recorded as `EMPTY` (`Transaction.java:77-80`, `:244`), a mark that validation reads as null (`:264`). `FortressArrayStore.init` is unchanged.
6. **An exception out of a block** (row 324). The block's exception-table entry has no type (`CodeGen.java:1801`), so it takes every exception. `BaseTask.leaveTransaction` pops the transaction, whose buffered writes go with it, and throws the exception on.

### The order in which a nested abort finds its handler

For `atomic do A; atomic do B end; C end` in one body, the exception table now lists the inner block's entry, then the outer block's. A throw in `B`:

- An abort that names the inner transaction, or names none (`abort()`, `nativeHelpers/runtime.java:34-37`): the inner handler ends the inner transaction and starts the inner block again. The outer transaction and its writes stay.
- An abort that names the outer transaction (the inner block found a read of the outer block stale): the inner handler ends the inner transaction and throws the abort on; the outer handler ends the outer transaction and starts the outer block again.
- Any other exception: the inner handler ends the inner transaction, hands its reads to the outer one, and throws the exception on; a `try` of the outer block around the inner block takes it, with the outer block's writes kept, or else the outer handler ends the outer transaction and the exception leaves.
- The outermost block's handler takes every abort that reaches it (`BaseTask.java:290`), so no abort leaves every block.

An abort thrown in a task that the block forked reaches the handler through the task's join. `ForkJoinTask` rethrows a task's exception on the joining thread as a new exception of its class, made by the public constructor that takes a `Throwable`; `TransactionAbortException(Throwable)` (`TransactionAbortException.java:36-40`) gives that copy the transaction that its cause names. The second half of `AtomicNestedViewCompiled` runs this path.

### What a read records, and what a nested commit hands its parent

- A read of the transaction's own write: nothing.
- A read of an ancestor's write: the location with that write. Validation compares it with the nearest ancestor's write now.
- A read of the committed value: the location with that value, or with `EMPTY` for an element that holds nothing.
- A nested commit hands its parent each read whose location the parent did not write (the team's rule and comment, kept), and each write. It does so also where the nested transaction wrote nothing: on the base a nested transaction without a write returned at `Transaction.java:301` and its reads were lost, so the outer block answered for nothing that its nested block had read. Found by reading while building repair 3, not measured; `TXCommit` (`:302-307`) now returns at once only for a top-level transaction without a write.
- A nested transaction that an exception leaves hands its parent its reads and no write (`TXLeave`, `:314-318`): the exception was thrown on what the nested block read, and the outer block, which may catch it, answers for those reads at its own commit. Where those reads no longer hold, `TXLeave` aborts, and the handler treats that abort as any other.

### The guard of the shared sets, and its cost, by reading

The guard is the monitor of each `Hashtable`, taken around each iteration and around a read with its record. Three rules keep it free of deadlock: a thread takes a child's set before a parent's; a read set before a write set; and no thread waits for the global lock while it holds a set's monitor. `TXValidate` waits for the global lock (`waitForGlobalLock`, `:278`) before it takes any monitor, and `TXReadLocation` leaves its monitor (`:242-243`) before it validates again. A commit holds the global lock while it takes the monitors.

For a block that no other thread shares: one monitor enter and exit a read (`:237`), reentered by `Hashtable.put`; one a validation; one or two a commit. Each is an uncontended lock of an object that only one thread uses. Against that, a read of an own write no longer puts into the read set, and a read no longer calls `AncestrialWrite` on its own write set twice (`containsKey`, then `get`). Not measured: the batch record leaves the measurement of the transaction for after the switch-over (row 641 is the standing cost).

## The failing runs and the passing runs

The harness for the compiled tests is `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`, at four threads. All failing runs ended before the edit was first built (the build that held the edit started after 08:52Z).

Failing, on the base's code (tree 9d0147ff9e with only the tests added), 2026-11-10T08:47:53Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-fail ProjectFortress/compiler_tests NestedAtomicAbortCompiledLink.test NestedTryInnerCatchLink.test NestedAtomicAbortCompiled.test NestedTryInnerCatch.test AtomicNestedSameBodyCompiled.test AtomicNestedViewCompiled.test AtomicSharedReadsCompiled.test AtomicThrowRevertsCompiled.test

    . run ProjectFortress/compiler_tests/NestedAtomicAbortCompiled (238ms) FAIL:  abort abandons only the innermost atomic block; transactions.tex, section Abortable Atomicity
    F. run ProjectFortress/compiler_tests/NestedTryInnerCatch (274ms) FAIL:  outer =/= inner; try.tex, section "Try Expressions": the inner try's catch clause takes the exception its block throws
    F. run ProjectFortress/compiler_tests/AtomicNestedSameBodyCompiled (372ms) FAIL: d =  395  of 400
    F. run ProjectFortress/compiler_tests/AtomicNestedViewCompiled (510ms) FAIL: a nested block saw x =  1063  and y =  1064
    . run ProjectFortress/compiler_tests/AtomicThrowRevertsCompiled (205ms) com.sun.fortress.runtimeSystem.TransactionAbortException
    Tests run: 14,  Failures: 5,  Errors: 0

`AtomicNestedViewCompiled` printed 105 such lines and 'FAIL: seen =  2895 , x =  20000 , y =  20000' (the test then had its first half only; the second half, in arms, was added before the fix was built and is seen passing only). `AtomicThrowRevertsCompiled` ended in an uncaught `TransactionAbortException`: the first block's transaction stayed pushed, and a later block nested under it.

`AtomicSharedReadsCompiled` passed in that run: its 3,000 blocks were the iterations of a parallel `for`, which left no idle thread to take the inner iterations. With the two loops written over `seq(…)`, the form committed, 2026-11-10T08:48:37Z:

    ONE_JVM=1 timeout -k 5 100 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-fail-shared ProjectFortress/compiler_tests AtomicSharedReadsCompiled.test

    . run ProjectFortress/compiler_tests/AtomicSharedReadsCompiled (778ms) java.util.ConcurrentModificationException: java.util.ConcurrentModificationException: java.util.ConcurrentModificationException
    Tests run: 2,  Failures: 1,  Errors: 0

`AtomicOwnWriteNestedCompiled`, under `timeout` (fork X4), 2026-11-10T08:48:52Z, through the harness and then directly:

    ( ONE_JVM=1 timeout -k 5 60 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-fail-own ProjectFortress/compiler_tests AtomicOwnWriteNestedCompiled.test ); echo "timeout 60 junit.sh: exit=$?"
    timeout 60 junit.sh: exit=124

    FORTRESS_THREADS=4 timeout -k 5 60 ../bin/fortress run AtomicOwnWriteNestedCompiled; echo "timeout 60 fortress run at four threads: exit=$?"
    timeout 60 fortress run at four threads: exit=124

The store's case, on the base's code with only the test class changed:

    FORTRESS_THREADS=4 ant testOnly -DtestPattern=ArrayStoreJUTest

    [junit]   testTwoTransactionsInitialiseOneElementOnce(com.sun.fortress.compiler.runtimeValues.ArrayStoreJUTest) FAIL
    [junit] rounds in which both initialisations answered true expected:<0> but was:<4>
    BUILD FAILED

Passing, on 13c90e37e9, the last runs after the last change of code:

    ONE_JVM=1 timeout -k 5 900 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh reach-compiler_tests ProjectFortress/compiler_tests <the 75 .test files of compiler_tests whose programs use try, throw, atomic or abort, the rung's nine among them>
    # junit.sh reach-compiler_tests 2026-11-10T09:02:30Z; … FORTRESS_THREADS=4; tree 13c90e37e9
    . run ProjectFortress/compiler_tests/AtomicOwnWriteNestedCompiled (656ms) PASS
    . run ProjectFortress/compiler_tests/NestedTryInnerCatch (340ms) PASS
    OK (122 tests)

    ant testOnly -DtestPattern=ArrayStoreJUTest
    [junit] Tests run: 8, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.14 sec
    BUILD SUCCESSFUL

The same call ran the tests of `other_compiler_tests` (4 files, 'OK (28 tests)') and `library_tests` (8 files, 'OK (47 tests)') whose programs use those words. These 87 files are the compiled tests that the two edited code-generator methods reach; no whole track was run (the skill's `tests-running.md`, "When to run a whole suite": the tracks are the gate's after an edit of the code generator or the runtime).

One thread and four, each of the rung's seven programs run directly (a loop in the form of the gate's atomic runs), exit 0 and `PASS` in every run:

    # more AtomicOwnWriteNestedCompiled threads=1: 3 of 3 PASS with exit 0
    # more AtomicOwnWriteNestedCompiled threads=4: 10 of 10 PASS with exit 0
    # more AtomicNestedSameBodyCompiled threads=1: 3 of 3 PASS with exit 0
    # more AtomicNestedSameBodyCompiled threads=4: 10 of 10 PASS with exit 0
    # more NestedAtomicAbortCompiled threads=1: 3 of 3 PASS with exit 0
    # more NestedAtomicAbortCompiled threads=4: 10 of 10 PASS with exit 0
    # more AtomicNestedViewCompiled threads=1: 3 of 3 PASS with exit 0
    # more AtomicNestedViewCompiled threads=4: 10 of 10 PASS with exit 0
    # more AtomicSharedReadsCompiled threads=1: 3 of 3 PASS with exit 0
    # more AtomicSharedReadsCompiled threads=4: 10 of 10 PASS with exit 0
    # more AtomicThrowRevertsCompiled threads=1: 3 of 3 PASS with exit 0
    # more AtomicThrowRevertsCompiled threads=4: 10 of 10 PASS with exit 0
    # more NestedTryInnerCatch threads=1: 3 of 3 PASS with exit 0
    # more NestedTryInnerCatch threads=4: 10 of 10 PASS with exit 0

### The fourteen atomic programs

The loop of the skill's `gate.md`, "The atomic runs", from `ProjectFortress/`, on the final code (started 2026-11-10T08:58:35Z, load 9.65; the code was 13c90e37e9's, committed after the run with no change): the fourteen programs and the rung's seven, three runs each at four threads. 63 lines, each `PASS`; none `FAIL`, `NO-PASS`, `COMPILE-FAILED` or `TIMEOUT-TWICE`. For example:

    # atomic nestedTransactions2 run1 threads=4 PASS
    # atomic AtomicNestedViewCompiled run3 threads=4 PASS

## Where the fix belongs, and the precedent search

- The transaction's algorithm is `runtimeSystem/Transaction.java`; the handler is generated by `CodeGen.forAtomicBlock`; the task's side is the transaction half of `runtimeSystem/BaseTask.java`. The batch record assigns these declarations to this rung (`explorations/coordinator/CLIMB-BATCH-30.md:549-551`): the new member of `BaseTask` is at the end of the class (`BaseTask.java:264-300`), and no line above `startTransaction` or of `CodeGen.genParallelExprs` is touched.
- The exception-table order: `CodeGen.java` has three `visitTryCatchBlock` sites. Two wrote their entry before the body, `forAtomicBlock` and `forTry`, and both are repaired. The third (`CodeGen.java:5899`, the generated `lazyInit` of an RTTI class) covers no code of a program and nests nothing.
- The team's atomic handler dates from 2012 and 2013 (`TransactionAbortException.java:2`); `git log -S` finds no earlier repair of its order. Walk ends a transaction on every exception that leaves its body (`interpreter/evaluator/tasks/FortressTaskRunner.java:135-137`) and its abort carries the transaction (`:129`), the shape `leaveTransaction` and `TransactionAbortException` follow.

## What the specification settles

- Own writes, and that a block ends: `atomic.tex`, "Atomic Expressions": evaluating an `atomic` expression "is simply evaluating the body expression".
- Nested blocks: "an inner `atomic` expression is atomic with respect to evaluations which occur dynamically outside the inner `atomic` expression but dynamically inside an enclosing `atomic`" (`atomic.tex:72-75`).
- Threads of one block "will see one another's writes" (`atomic.tex:77-81`): the sets stay shared.
- An exception: "all writes to objects allocated before the `atomic` expression began evaluation are discarded … Any variable reverts to the value it held before evaluation of the `atomic` expression began" (`atomic.tex:59-70`).
- `abort()` "abandons execution of the innermost `atomic` expression" (`transactions.tex:15-17`).
- A `try`: the exception "is matched against the subclauses of the `catch` clause in turn" of the `try` whose block threw (`try.tex:54-60`).
- Silent: which block starts again when a nested block finds its outer block's read stale (fork X3 decides); whether a nested block that an exception leaves hands its reads outward (decision 4 below).

## Programs run old against new

None beyond the tests: each test's failing run is the old code's result and its passing run the new code's. The review's results for the base (`parallelism-foundations-2026-11-08.md:161-183`) are the before of the probe below and were not run again.

## Sentences the change makes false

- The specification: none. `grep -n -i 'atomic\|transaction' Specification/appendices/changes.tex` prints nothing, and no note of `atomic.tex`, `transactions.tex` or `try.tex` speaks of the compiled path.
- The skill, for the skill writer: `.claude/skills/fortress-repo/references/compiler.md:106`, "In a `try` nested in another `try` of one body, the outer `try`'s `catch` clause is matched first (ledger row 888)."

## Points to report

1. Each of the six repairs as built, and the order of handlers: "What changed and why" above; `CodeGen.java:1782-1814`, `:2116-2120`; `Transaction.java:228-284`, `:302-367`; `BaseTask.java:273-294`.
2. What a read records and what a nested commit hands its parent: above; `Transaction.java:229-233`, `:244`, `:341-354`. A nested transaction without a write now hands its reads too (`:304`), a change beyond the six, found by reading.
3. The guard and its cost by reading: above; `Transaction.java:237`, `:256`, `:332`, `:341`, `:357`.
4. Each test with its failing and passing runs, row 933's under `timeout`: above. The fourteen atomic programs: 42 of 42 `PASS`.
5. An exception that is not a Fortress exception leaves a block the same way: the entry has no type (`CodeGen.java:1801`). `ArrayStoreJUTest.testAnExceptionLeavesATransactionWithoutItsWrites` (`ArrayStoreJUTest.java:153-189`) shows it with Java's `IllegalStateException`, for a block and for a nested block caught in the outer one. No compiled program can show it: a Java exception has no `catch` in Fortress. That case was added with the fix and was not seen failing first.
6. Sentences of the specification made false: none.
7. Files edited (STAGE_BLIND; neither stage was run, as the rung's section says): `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java`, `runtimeSystem/TransactionAbortException.java`, `runtimeSystem/BaseTask.java` (`:203` down: `cleanupTransaction` removed, `leaveTransaction` and `throwOn` added at the end), `compiler/codegen/CodeGen.java` (`forAtomicBlockHelper`, `forAtomicBlock`, `forTry`), `compiler/runtimeValues/ArrayStoreJUTest.java`, and the tests. No file beyond those named. `FortressArrayStore.java` is not edited. No line of `BaseTask.java` above `startTransaction`, none of `CodeGen.genParallelExprs`.
8. No reserved point was reached: no model line, no change to a plain read or write outside `atomic`, no change to walk.
9. The ladder subset: the eight programs of the baseline's pass list that use `atomic` (`tests/atomic0`, `atomic2`, `atomic3`, `atomic4`, `atomicTest`, `nestedTransactions1`, `nestedTransactions2`, `nestedTransactions4`), run after the edit with copies of the drivers, as the skill's `gate.md`, "The ladder regression", says: each at phase `pass`, as in `explorations/compile-ladder/climb-batch-29b/gate/ladder/ladder.tsv`, and each output equal to the baseline's `raw/` after the `Operation took` line is masked. No program of the pass list uses `try`.

## Decisions, each with the ways not taken

1. **The guard is each set's own monitor, and a read with its record is one step under it.** Ways not taken: (a) fork X2's words alone, the lock held only while iterating: a read recorded after another thread's validation of the same transaction would then go unchecked until the lock next moved, and a commit could take the global lock at that snapshot; (b) one lock for the whole tree of a top-level transaction, simpler to reason about, but it makes the threads of one block wait for each other's nested commits; (c) a log for each task, merged at the join, which fork X2 already set aside. Evidence: `Transaction.java:237-246`; `AtomicSharedReadsCompiled`, 13 of 13 runs at four threads.
2. **No thread waits for the global lock inside a set's monitor.** Way not taken: validation called from inside the read's monitor, the base's structure with a lock added, which deadlocks: a nested commit holds the global lock and waits for the parent's read set while a reader of the parent holds that set and spins on the global lock. By reading.
3. **The handler takes every exception, and one runtime method decides.** `leaveTransaction(Throwable)` returns or throws. Ways not taken: (a) two exception-table entries, one for the abort and one for the rest, which doubles the generated handler; (b) the transaction kept in a local of the generated method and passed to the runtime, exact where the thread's current task has moved (row 876), but a local in a task arm is what rung P repairs. Evidence: `CodeGen.java:1801-1811`.
4. **A nested transaction that an exception leaves, or that commits without a write, hands its reads to its parent.** Way not taken: drop them, the base's behaviour for a nested transaction without a write: the outer block would commit on a value its nested block read and another block has since changed. The specification is silent on the mechanism; `atomic.tex:72-75` asks that the whole outer block be atomic. By reading, not measured.
5. **The outermost block takes every abort.** Way not taken: throw on an abort that names a transaction that is not the block's own even at the outermost block, which would end the program. No such abort was seen; the rule costs nothing and no abort can leave every block.
6. **`TransactionAbortException(Throwable)` copies the named transaction.** Way not taken: no public constructor, so that `ForkJoinTask` rethrows the task's own exception; `nativeHelpers/runtime.java:36` and the store's test construct the exception from other packages.
7. **`startTransaction` is outside the handler's range.** Way not taken: the base's range, which included it: a failure before the transaction is pushed would then end the enclosing block's transaction.
8. **`cleanupTransaction()` is removed, not kept beside `leaveTransaction`.** Its only callers were the generated handler and the store's test, both changed; a jar compiled by the old code generator is rebuilt, since the build starts the caches again when the implementation changes.
9. **`AtomicSharedReadsCompiled` writes its two outer loops over `seq(…)`.** Way not taken: the parallel `for` of the first draft, which passed on the base (above).
10. **The second half of `AtomicNestedViewCompiled` calls its nested block from the arms through a function.** Way not taken: the block written in the arm, which on this tree fails verification (rows 322 and 497, rung P's).
11. **The nested write beside a plain write of the outer block (NEW-X-1) is recorded, not repaired.** It is row 948's question one level down, and the batch record leaves row 948 for a decision not taken.
12. **No retry count is asserted for row 933's second program.** The test asserts the values (20,000 each); the retries of the base (1,635 to 30,350 against 0) are the review's and need a counter that a test cannot read.

## Defects, each with its home

- Rows 933, 934, 937, 888, 324, 949, 950: home 1, an assertion of a plain gated test each (record.md gives the test of each).
- Row 466's sentence on two transactions: home 1, `ArrayStoreJUTest.testTwoTransactionsInitialiseOneElementOnce`.
- A nested transaction without a write lost its reads: home 1 in the code, by reading; no test asserts it, since its failure is a commit that should have aborted, which shows only as a rare wrong value under contention. Said here and in record.md.
- NEW-X-1, a nested block beside a plain write of its outer block: home 3, a ledger row with reproducer `none`: the race does not show in every run (1, 0 and 186 lines in three runs), so no gated test can stay green or stay expected-red. Measured on the compiled path at four threads and under walk (0 in two runs), this program, a scratch file that is not committed:

      component NestedBesidePlain
      export Executable
      u: ZZ32 := 0
      looks: ZZ32 := 0
      look(): () =
        atomic do
          p: ZZ32 = u
          q: ZZ32 = u
          if p =/= q then println("SAW u = " p " then " q) end
          looks := looks + 1
        end
      lookMany(): () = for i <- seq(1#3000) do look() end
      writeMany(): () = for i <- seq(1#30000) do u := u + 1 end
      run(): () = do
        atomic do
          do lookMany() also do writeMany() end
        end
        println("DONE u = " u " looks = " looks)
      end
      end


      cd ProjectFortress && ../bin/fortress compile <scratch>/NestedBesidePlain.fss && FORTRESS_THREADS=4 ../bin/fortress run NestedBesidePlain
      SAW u =  0  then  1355
      DONE u =  30000  looks =  3000

No XXX test was added, so none was shown red.

## Not done

- The retries of row 933's second program were not measured after the repair.
- Each new compiled test's second and later halves were not each seen failing alone on the base: `AtomicNestedViewCompiled`'s half in arms and the nested case of `AtomicThrowRevertsCompiled` were seen failing only as part of their whole test.
