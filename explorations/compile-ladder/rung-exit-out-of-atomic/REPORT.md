# Climb batch 35, rung A: an exit out of an atomic block keeps the block's writes, on both paths (row 1039)

- problem: an exit out of an `atomic` block to an enclosing `label` lost the block's writes on both paths, as the batch's probes measured on the base: `explorations/compile-ladder/plan-35/probes/fixes-35.md:19` (walk) and `:43` (compiled); ledger row 1039.
- spec: `Specification/basic/expressions/atomic.tex:59-63`, section "Atomic Expressions": "If it completes abruptly by exiting to an enclosing \KWD{label} expression, writes within the block are retained and become visible to other threads."
- precedent: the commit at a normal end of the same block, on each path: `BaseTask.endTransaction` (`ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:210-221`) and the commit in `FortressTaskRunner.doItOnce` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/tasks/FortressTaskRunner.java:125-131`); and the shape of `leaveTransaction`'s own branch for `TXLeave`, whose stale abort takes the abort path (`BaseTask.java:310-316`).
- deviation: none from the specification. From the precedent: the compiled exit's commit runs in the block's handler, after the task's transaction is set back to the parent (`BaseTask.java:302`), where `endTransaction` sets it after the commit; the commit uses only the transaction object, so the order changes nothing it does.
- historical: `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java` and `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/tasks/FortressTaskRunner.java`, both files of the original 2012 tree (`BaseTask.leaveTransaction` itself is the revival's, `594da41299`; `doItOnce` is the team's).

One launch of the worker role worked this rung: the worktree did not exist when it started.

## What changed and why

Commits on `wip/rung-exit-out-of-atomic`: `eb2f652487` (the tests and the fix), `8bd7cfcf0a` (the expected failure of a sibling defect, row 1110), and the commit that adds this report and `record.md`.

- Compiled (`BaseTask.leaveTransaction`, `BaseTask.java:284-323`). Every compiled `atomic` block's handler takes every throwable of its body or its commit and calls `leaveTransaction` (`CodeGen.forAtomicBlock`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2148-2181`, unchanged). An exit is a thrown `LabelExit` (F-373). `leaveTransaction` now commits the block's transaction when what leaves is a `LabelExit` (`BaseTask.java:303-309`): `transaction.TXCommit()` and `ftr.recordEndTransaction()`, the two calls of `endTransaction`. A commit that fails throws `TransactionAbortException`, which the branch takes as `t`, and the existing abort code then runs the block again where the abort names this transaction, or throws it on to the block of the ancestor that it names (`BaseTask.java:317-322`), as at a normal end, where the commit's abort reaches the same handler. Any other exception still goes through `TXLeave` and discards the writes (`:310-316`). The exit is thrown on after a commit that succeeds, so the label's handler takes it as before. A nested block's commit hands its reads and writes to its parent (`Transaction.TXCommit`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:302-307`), so an exit that leaves a nested block and its outer one commits the inner into the outer, then the outer.
- Walk (`FortressTaskRunner.doItOnce`, `FortressTaskRunner.java:122-148`). Walk runs an atomic block in `doItOnce`, which committed only after a normal end and gave the transaction up uncommitted in its `finally`, so the cells kept the block's writes under a transaction that stayed active and was then aborted by the next reader (`interpreter/env/ReferenceCell.java`, `getValue`). A `catch (LabelException exit)` now commits as the normal end does and throws the exit on (`:133-141`); a commit that fails aborts the transaction and throws `AbortedException`, so that `doIt` runs the block again, as at a normal end. `NamedLabelException`, walk's exit with a target, extends `LabelException`. `forAtomicExpr` and `forTryAtomicExpr` both run `doItOnce` (`interpreter/evaluator/Evaluator.java:189`, `:216`).

The code generator is unchanged, so no compiled jar changes; the edit is in the runtime, which every compiled program loads.

## The tests: failing on the base, passing after

The two expected failures were promoted before the edit: `ProjectFortress/tests/XXXExitOutOfAtomicWalk.fss` became `tests/ExitOutOfAtomicWalk.fss`, and `compiler_tests/XXXExitOutOfAtomicCompiled.{fss,test}` became `compiler_tests/ExitOutOfAtomicCompiled.{fss,test}` (`tests=ExitOutOfAtomicCompiled`, `link`, `run`, `run_out_contains=PASS`); `ExitOutOfAtomicCompiledLink.test` takes the new name. Each test holds three cases: the single exit (`g := 7`), an exit that leaves a nested block and its outer one (`h := 1` in the outer, `k := 2` in the inner, both asserted), and 1000 iterations of a parallel `for`, each an exit out of an atomic block that increments one counter (`count`, asserted 1000).

The failing runs, on the base's code, in the worktree before the edit was first built (`git status` showed no change under `ProjectFortress/src`):

    echo "Expected failure: the harness reports ExitOutOfAtomicWalk red, its output 'FAIL: a ZZ32: 0 =/= a ZZ32: 7; writes within a block that an exit leaves are retained', on the base's code"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-exit-out-of-atomic/h-base ProjectFortress/tests/ExitOutOfAtomicWalk.fss

    # harness-one 2026-11-23T10:03:30Z; tree 13f4fdea75; nproc=4; load 0.58 0.34 0.31; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    FAIL: a ZZ32: 0 =/= a ZZ32: 7; writes within a block that an exit leaves are retained
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

    echo "Expected failure: junit.sh reports ExitOutOfAtomicCompiledLink.test green and ExitOutOfAtomicCompiled.test red, the run's output 'FAIL:  0 =/= 7; atomic.tex, section \"Atomic Expressions\": writes within a block that an exit leaves are retained', on the base's code"
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh a-base ProjectFortress/compiler_tests ExitOutOfAtomicCompiledLink.test ExitOutOfAtomicCompiled.test

    . link ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled  OK (time = 5340ms)
    . run ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled (354ms) FAIL:  0 =/= 7; atomic.tex, section "Atomic Expressions": writes within a block that an exit leaves are retained
    FAILURES!!!
    Tests run: 3,  Failures: 1,  Errors: 0

The harness's `assert` stops at its first failure, so the nested case was seen failing on the base in one-run variants of the same files, the earlier assertions deleted for the run and the files restored after (`cmp` against a saved copy):

    echo "Expected failure: with the single case's assertion removed for this run, the harness reports ExitOutOfAtomicWalk red, 'FAIL: a ZZ32: 0 =/= a ZZ32: 1; the outer block's writes are retained ...', and junit.sh reports ExitOutOfAtomicCompiled.test red, 'FAIL:  0 =/= 1; the outer block's writes are retained ...', on the base's code"

    FAIL: a ZZ32: 0 =/= a ZZ32: 1; the outer block's writes are retained where the exit leaves a nested block and the outer one
    . run ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled (467ms) FAIL:  0 =/= 1; the outer block's writes are retained where the exit leaves a nested block and the outer one

    echo "Expected failure: with the single case's and the outer write's assertions removed for this run, ... 'FAIL: a ZZ32: 0 =/= a ZZ32: 2; ...', and ... 'FAIL:  0 =/= 2; ...', on the base's code"

    FAIL: a ZZ32: 0 =/= a ZZ32: 2; the nested block's writes are retained where the exit leaves it and the outer one
    . run ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled (363ms) FAIL:  0 =/= 2; the nested block's writes are retained where the exit leaves it and the outer one

At one thread, by direct runs on the base's code (`FORTRESS_THREADS=1 bin/fortress tests/ExitOutOfAtomicWalk.fss`; `bin/fortress compile` then `FORTRESS_THREADS=1 bin/fortress run ExitOutOfAtomicCompiled`, from `ProjectFortress/`), each exit status 1:

    == as written, walk, FORTRESS_THREADS=1
    FAIL: a ZZ32: 0 =/= a ZZ32: 7; writes within a block that an exit leaves are retained
    == as written, compiled, FORTRESS_THREADS=1
    FAIL:  0 =/= 7; atomic.tex, section "Atomic Expressions": writes within a block that an exit leaves are retained
    == nested case, outer write, walk ... FAIL: a ZZ32: 0 =/= a ZZ32: 1; ...    (compiled: FAIL:  0 =/= 1; ...)
    == nested case, nested write, walk ... FAIL: a ZZ32: 0 =/= a ZZ32: 2; ...   (compiled: FAIL:  0 =/= 2; ...)

The contended case was added after the edit was built, so its failing runs are on the old code, through the base build's tools (`/home/user/fortress-base42`, at `295c215c2c`, whose code is the base's: `git diff --name-only 295c215c2c 13f4fdea75` lists only paths under `explorations/`, `.claude/` and `docs/`). As written, the old code fails both tests at the single case, as above; with the other assertions removed for the run:

    echo "Expected failure: with the other cases' assertions removed for this run, on the old code the harness reports ExitOutOfAtomicWalk red, 'FAIL: a ZZ32: 0 =/= a ZZ32: 1000; ...', and fortress junit ExitOutOfAtomicCompiled.test red, 'FAIL:  0 =/= 1000; ...'"
    FORTRESS_HOME=$B $B/explorations/compile-ladder/rung-inference-walk/harness-one.sh $S/old-harness $PWD/ProjectFortress/tests/ExitOutOfAtomicWalk.fss
    $B/explorations/coordinator/tools/old-fortress.sh $B $S/old-caches junit .../ExitOutOfAtomicCompiledLink.test .../ExitOutOfAtomicCompiled.test

    FAIL: a ZZ32: 0 =/= a ZZ32: 1000; each of many parallel exits out of a contended block keeps its one write
    . run /home/user/fortress-exit-out-of-atomic/ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled (684ms) FAIL:  0 =/= 1000; each of many parallel exits out of a contended block keeps its one write

and at one thread on the old code, the same two lines.

The passing runs, on the final code (`eb2f652487`; the later commits change no code):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh a-edit2 ProjectFortress/compiler_tests ExitOutOfAtomicCompiledLink.test ExitOutOfAtomicCompiled.test
    . run ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled (454ms) PASS
    OK (3 tests)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-exit-out-of-atomic/h-edit ProjectFortress/tests/ExitOutOfAtomicWalk.fss
    # harness-one 2026-11-23T10:09:21Z; tree 13f4fdea75; ... FORTRESS_THREADS=4; cache filled
    OK (1 test)

At one thread, direct runs: walk `rc=0` with no "fail" in its output; compiled `PASS`, `run rc=0`.

What a failed commit does, measured: the compiled test run five times at four threads with `FORTRESS_THREAD_STATISTICS=y` (`FORTRESS_THREAD_STATISTICS=y FORTRESS_THREADS=4 bin/fortress run ExitOutOfAtomicCompiled`, from `ProjectFortress/`):

    PASS Had to retry a transaction 93 times, threads waited for a total of 32828 nanoseconds  rc=0
    PASS Had to retry a transaction 291 times, threads waited for a total of 65233 nanoseconds  rc=0
    PASS Had to retry a transaction 235 times, threads waited for a total of 49541 nanoseconds  rc=0

So the contended exits abort and run again 93 to 291 times a run, and every one of the 1000 writes is kept once. The tally counts retries only at `recordEndTransaction`, which the exit's commit now calls. In this program the body reads `count` and writes it, then exits, so an abort comes at the read's validation or at the exit's commit (`Transaction.handOver`, whose global lock fails when another block committed after the snapshot, and whose validation then finds the read stale).

## Row 1041, run once after the fix

Its behaviour stays on both paths. `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh row1041 ProjectFortress/compiler_tests ExitAfterLabelCompletedCompiled.test`, on `eb2f652487`:

    . run ProjectFortress/compiler_tests/ExitAfterLabelCompletedCompiled (760ms) REACHED
    com.sun.fortress.runtimeSystem.LabelExit: exit from a label block that has completed
    OK (2 tests)

One consequence reaches the row's question: such an exit, run inside an atomic block, now commits that block's writes too, since neither path can tell an exit to an enclosing label from one to a label block that has completed. The program, under walk (old code through `old-fortress.sh`, new code through the worktree's `bin/fortress`, each at `FORTRESS_THREADS=1`):

    var kept: () -> () = fn (): () => ()
    var w: ZZ32 = 0
    make(): () = label gone
        kept := fn (): () => exit gone
      end gone
    run(): () = do
      make()
      try
        atomic do
          w := 5
          kept()
        end
      catch e
        LabelException => println("caught LabelException")
      end
      println("w = " w)
    end

    == ExitAfterLabelThroughAtomicProbe, old code (base), walk, one thread
    caught LabelException
    w = 0
    == ExitAfterLabelThroughAtomicProbe, new code, walk, one thread
    caught LabelException
    w = 5

Compiled, by reading: `leaveTransaction` commits for every `LabelExit`, and the exit then ends the program, as row 1041 says. This goes to the curator with item 562 (forCurator).

## Where the fix belongs, and the precedent search

The feature table's row for `atomic` names `runtimeSystem/BaseTask.java` for the compiled transactions and `Evaluator.forAtomicExpr` with `evaluator/transactions/` for walk (`explorations/coordinator/map/spec-to-implementation.md:176`); the map's B.11 says the compiled transactions live in `BaseTask`'s static methods that generated code calls, and that walk's tasks and transactions are a second, independent implementation (`explorations/coordinator/map/modules-and-phases.md:421-439`). The section names the same two places.

Precedent: no earlier change repaired an exit out of a transaction. The nearest are the two commits at a normal end, which the fix calls in the same way, and climb batch 30's `leaveTransaction` (`594da41299`), whose branch for an exception other than an abort the new branch sits beside. Sites that end a transaction: in `BaseTask.java` two, `endTransaction` (normal end) and `leaveTransaction` (abrupt end), now both committing for an exit; in walk's `FortressTaskRunner.java` one, `doItOnce`, which both of walk's callers run (`Evaluator.java:189`, `:216`). No other code of either path begins or ends a transaction: `grep -rn 'startTransaction\|endTransaction\|leaveTransaction\|doItOnce\|doIt(\|beginTransaction\|commitTransaction\|giveUpTransaction' ProjectFortress/src/com/sun/fortress --include=*.java` prints, beside those, only the code generator's three calls (`CodeGen.java:2138`, `:2158`, `:2173`), walk's `BaseTask` methods that `doItOnce` calls, and the unit test `compiler/runtimeValues/ArrayStoreJUTest.java:41-53`, which runs a block as compiled code does and passes `leaveTransaction` only exceptions of its own body, never an exit.

The ways the implementation offers, with the one chosen (also under Decisions):

- Compiled: (a) commit in `leaveTransaction` on a `LabelExit` (chosen); (b) a second exception-table entry for `LabelExit` in `CodeGen.forAtomicBlock`, whose handler calls `endTransaction` and rethrows: its commit's abort would leave the handler outside the block's catch-all range, so it needs a third entry, and it changes every compiled atomic block's bytecode in rung O's file; (c) commit at the `exit` itself (`CodeGen.forExit`): the exit does not know which blocks it leaves when it runs in a task or a function made elsewhere (F-373).
- Walk: (a) `catch (LabelException)` in `doItOnce` (chosen); (b) in `Evaluator.forAtomicExpr`, a `Callable` that catches the exit and returns it as a marker value, rethrown after `doIt` returns: it changes rung W's file and leaves `tryatomic` without it; (c) in `doIt`: the transaction is given up by then.

## What the specification settles

`atomic.tex:59-63`: an exit retains the block's writes; an uncaught exception discards writes to objects allocated before the block, and variables revert. The second half stays as it was on both paths (`AtomicThrowRevertsCompiled` in the atomic runs; walk, the probe below). Nested blocks (`atomic.tex:72-75`) are atomic with respect to their enclosing block, so an inner commit hands its writes to the outer transaction, which the nested case asserts. `atomic.tex:46-48`: `tryatomic` "acts exactly like" `atomic` except where it throws `TryAtomicFailure`, which settles row 1110. `label.tex` (section "Label and Exit") says nothing of transactions.

## Programs run old against new

Each under walk at `FORTRESS_THREADS=1`, the old code through `/home/user/fortress-base42/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base42 <worktree>/tmp/rung-exit-out-of-atomic/old-caches P.fss`, the new through the worktree's `bin/fortress P.fss`.

1. The exit after its label block has completed, inside an atomic block (above): `w = 0` old, `w = 5` new.
2. An exception and an exit out of two blocks:

        throwOut(): () =
          try
            atomic do
              a := 4
              throw FailCalled("out")
            end
          catch e
            FailCalled => ()
          end
        exitOut(): () = label done
            atomic do
              b := 6
              exit done
            end
          end done

        == ExitOutOfAtomicThrowProbe, old code (base), walk, one thread
        a = 0 (0 expected: an exception discards the writes)
        b = 0 (6 expected: an exit keeps them)
        == ExitOutOfAtomicThrowProbe, new code, walk, one thread
        a = 0 (0 expected: an exception discards the writes)
        b = 6 (6 expected: an exit keeps them)

3. An exit out of a `tryatomic` block (`leave(): () = label done tryatomic do t := 3; exit done end end done`), the same on both:

        Exception in thread "main" java.lang.RuntimeException: java.lang.RuntimeException: .../ExitOutOfTryAtomicProbe.fss:10:7-15: exit from nonexistent label block done

   This is row 1110 (below). Compiled, the same program stops at the code generator, 'Can't compile TryAtomicExpr at ...' (row 353; `bin/fortress compile` with a private caches folder).

## Suites and stages

- Walk's suite, once, on `eb2f652487`: `ant testSystem`, `BUILD SUCCESSFUL`, `Total time: 5 minutes 30 seconds`; the four shards `Tests run: 214`, `228`, `216`, `221`, each `Failures: 0, Errors: 0`, 879 in all, the count of the last landed gate's four `system-*` rows (223 + 221 + 218 + 217, `explorations/compile-ladder/climb-batch-34b/gate/summary.txt`). No test failed. `tests/XXXAtomicNestedReadsKeptWalk.fss` (row 1004) kept its expected failure. The new `tests/XXXExitOutOfTryAtomicWalk.fss` was added after this run; it is a test file that the gate's suite will run.
- The unit test that calls the edited handler, once, on `7581635293` (code of `eb2f652487`): `ant testOnly -DtestPattern=ArrayStoreJUTest`, `Tests run: 8, Failures: 0, Errors: 0, Skipped: 0`, `BUILD SUCCESSFUL`.
- The four-thread atomic runs (`gate.md`, "The atomic runs"), on `eb2f652487`, from `ProjectFortress/`: 72 lines, every one `PASS`, 24 programs three times each, e.g. `# atomic AtomicThrowRevertsCompiled run1 threads=4 PASS`, `# atomic nestedTransactions2 run3 threads=4 PASS`; no FAIL, NO-PASS, COMPILE-FAILED or TIMEOUT-TWICE.
- The checker count and the distance: not run. The section names none (STAGE_BLIND). The paths the rung changes (`git diff --name-only 13f4fdea75`): `ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled.fss`, `.test`, `ExitOutOfAtomicCompiledLink.test`, the deleted `XXXExitOutOfAtomicCompiled.fss` and `.test`, `ProjectFortress/tests/ExitOutOfAtomicWalk.fss`, `XXXExitOutOfTryAtomicWalk.fss`, the deleted `XXXExitOutOfAtomicWalk.fss`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/tasks/FortressTaskRunner.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java`, and this folder. All but `BaseTask.java` are under the paths where neither stage can move; `BaseTask.java` is the compiled runtime, which runs only inside a compiled program's tasks, and neither stage runs a program: both run the checker over the interpreter's library.
- The rung's own ladder subset (`gate.md`, "The ladder regression"), after the edit only, on `8bd7cfcf0a`: the 8 programs of the gate's ladder that hold an `atomic` block (`tests/atomic0`, `atomic2`, `atomic3`, `atomic4`, `atomicTest`, `nestedTransactions1`, `nestedTransactions2`, `nestedTransactions4`), whose compiled runs go through the edited handler on every abort. None of the ladder's files has a first error that names a transaction, `LabelExit` or `leaveTransaction`. The drivers ran from `tmp/rung-exit-out-of-atomic/ladder/`, building their own library into their own caches: 8 of 8 `pass`, each the phase of the newest landed `explorations/compile-ladder/climb-batch-34b/gate/ladder/ladder.tsv`; `ladder_compare` against the baseline prints no DOWN, UP or STDOUT line for the 8 (only MISSING for the 77 files outside the subset).

## Sentences made false

- The specification: none. `grep -rn '~1039' Specification --include=*.tex` prints nothing; `grep -rn '1039\|1041' Specification --include=*.tex` prints nothing; no Appendix I effect, `\revision` or `\note{}` of `atomic.tex`, `label.tex` or `transactions.tex` says what either path does with an exit out of an atomic block (`grep -n 'revision\|note{' Specification/basic/expressions/atomic.tex Specification/basic/expressions/label.tex` prints only `atomic.tex:15`, on modifiers).
- Outside the specification, for the gather: F-373's "Four limits stand, each with its test: an exit out of an `atomic` block loses the block's writes (row 1039); ..." (`explorations/coordinator/FACTS.md:280`); the skill's "An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block." (`.claude/skills/fortress-repo/SKILL.md:126`); review-queue item 561, "Who builds the exit out of an `atomic` block (row 1039)?", whose other way this rung takes (`explorations/coordinator/review-queue.md:1737`).

## Points to report reached

1. The commit as built on each path, and what a failed commit does: compiled `BaseTask.java:303-309`, walk `FortressTaskRunner.java:133-141`; a failed commit runs the block again on both paths, as at a normal end (compiled, 93 to 291 retries a run with all 1000 writes kept, above). Reversible.
2. The two expected failures promoted, and the nested case, each failing on the base and passing after, at one thread and at four: above, "The tests". Reversible.
3. The four-thread atomic runs on the final tree: 72 of 72 `PASS` on `eb2f652487`. Reversible.
4. Walk's suite: no test failed after the change (879 tests, 0 failures, `ant testSystem` on `eb2f652487`). Reversible.
5. The files edited, for STAGE_BLIND: `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java` and `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/tasks/FortressTaskRunner.java`, the two the section names, and the tests. No file beyond those named; one test beyond the section's, `tests/XXXExitOutOfTryAtomicWalk.fss`, the home of row 1110. Reversible.

No step taken that cannot be undone or that acts against a decision on record.

## Decisions

1. The compiled commit in `BaseTask.leaveTransaction`, on a `LabelExit`. Ways not taken: a `LabelExit` entry in `CodeGen.forAtomicBlock`'s exception table (its commit's abort escapes the handler's range, so a third entry; every atomic block's bytecode changes; rung O's file); a commit at `CodeGen.forExit` (an exit made in a function or a task does not know which blocks it leaves, F-373). Evidence: `CodeGen.java:2148-2181`, where the handler already takes every throwable; fork A1.
2. Walk's commit in `FortressTaskRunner.doItOnce`, in a `catch (LabelException)`. Ways not taken: a marker value through `Evaluator.forAtomicExpr` (rung W's file, and `tryatomic` would miss it); `doIt` (the transaction is given up when `doItOnce` returns). Evidence: `FortressTaskRunner.java:122-148`; `Evaluator.java:189`, `:216`.
3. A failed commit on an exit runs the block again, as at a normal end: the abort takes the existing abort path, compiled, and `AbortedException` reaches `doIt`'s retry, walk. Ways not taken: the exit leaving with the writes dropped where the commit fails (the writes of a block that did complete abruptly by an exit would be lost); an error. Evidence: fork A1 ("a failed commit runs the block again, as at a normal end"); the retry counts above.
4. The compiled exit's commit also calls `recordEndTransaction`, as `endTransaction` does, so the retry count that sets the back-off starts again after a block that committed. Way not taken: leave it, as the exception path does. Evidence: `BaseTask.java:210-221`; it changes only the statistics and the back-off.
5. A contended case in both tests, 1000 parallel exits out of a block that increments one counter, beside the section's nested case: it shows a failed commit run again. Way not taken: the nested case alone, which never aborts. Evidence: the retry counts; `tests-writing.md` asks a longer range than 16 under walk for parallelism.
6. The nested case seen failing on the base by one-run variants with the earlier assertions deleted, since the libraries' `assert` stops at the first failure (`Library/FortressLibrary.fss:308-319`, `Library/CompilerLibrary.fss:102-105`). Way not taken: reorder the assertions, which changes the expected failure the section quotes.
7. Walk's exit out of `tryatomic` is recorded, not repaired: an `XXX` test and row 1110. Way not taken: a rethrow in `Evaluator.forTryAtomicExpr`, a file the section does not name and that rung W edits. Evidence: the probe above; `Evaluator.java:229-231`.
8. The rung's ladder subset is the 8 ladder programs that hold an `atomic` block. Way not taken: the label programs of the ladder's corpus (`objectCC_label`, `LabelTest`, `exitType`, `labelExit`), whose first errors name a label, the checker or a missing name, none what this rung touched.
9. No decision of the curator names the mechanism; the rung builds fork A1's default (`explorations/coordinator/CLIMB-BATCH-35.md:452`).

## Defects and their homes

- Row 1039, an exit out of an atomic block loses the block's writes, on both paths: home 1, repaired; `tests/ExitOutOfAtomicWalk.fss` and `compiler_tests/ExitOutOfAtomicCompiled` assert it. The row closes.
- Row 1110, under walk an exit out of a `tryatomic` block that no `atomic` block encloses never reaches its label: home 2, deferred, the specification settles it (`atomic.tex:46-48`); `tests/XXXExitOutOfTryAtomicWalk.fss`, shown green as an expected failure and red with `atomic` in place of `tryatomic` for one run:

        echo "Expected failure: the harness reports XXXExitOutOfTryAtomicWalk green, 'Saw expected failure', ..."
        . interpret tmp/rung-exit-out-of-atomic/h-xxx/tests/XXXExitOutOfTryAtomicWalk
        java.lang.RuntimeException: java.lang.RuntimeException: tmp/rung-exit-out-of-atomic/h-xxx/tests/XXXExitOutOfTryAtomicWalk.fss:10:7-15: exit from nonexistent label block done
         OK Saw expected exception
        OK (1 test)

        echo "Expected: with atomic in place of tryatomic for one run, the harness reports XXXExitOutOfTryAtomicWalk red, 'Missing expected failure'"
         Missing expected failure
        FAILURES!!!
        Tests run: 1,  Failures: 1,  Errors: 0

  Compiled, the program meets row 353's wall.
- The exit after its label block has completed, inside an atomic block, now commits that block: no defect on its own; a consequence for row 1041, whose question is the curator's (item 562). A note on row 1041 records it.

## Commands worked out

- The retry tally of a compiled run: `FORTRESS_THREAD_STATISTICS=y FORTRESS_THREADS=4 bin/fortress run P` prints 'Had to retry a transaction N times, ...' at the end (`runtimeSystem/FortressTaskRunnerGroup.java:49-55`); it counts only the retries of blocks that reached `recordEndTransaction`.
