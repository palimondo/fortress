# Rung H, `rung-runtime-threads`: the skeptic's verdict

Head judged: 1da18073, the worker's last commit. My commits: 3bbb7163 (a test and the record), then this file. Base 157323e5.

The branch already carried `REPORT.md` and `record.md`, so the two `journal-text.py` lines of the brief wrote nothing (each `[ -e … ] ||` stopped at the existing file) and there is no "from the run's journal" commit.

## What I checked

1. **The tables.** The worker's count table, read from its scratch, equals climb batch 27's: `diff explorations/compile-ladder/climb-batch-27/gate/checker-count.txt <the worker's table>` printed nothing, and the table ends `#total 0`, `#locations 0`, `#crash none`. Its distance table against batch 27's: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-27/gate/distance.txt <the worker's table>` printed `DISTANCE SAME   0`; its two crash rows are row 929's, in value object `Char` (`FortressBuiltin.fss:661:1-773:2`, `IllegalArgumentException … Comparison method violates its general contract!`, and the `leftover` stage row). Both stages started after the last change of code: the transcript's last code edit is 04:57:43 (`FortressBuiltin.fss`), the build 04:57:48, the commit 180751e1 05:00:41, the count stage 05:00:55, the distance stage 05:03:06. The rung changes no checker code, so I ran no stage. The report's tables are those of the worker's head; my commit adds a test and prose, no code.
2. **Test first.** In the worker's transcript: `junit.sh base-H … RuntimeOwnOperationsCompiled.test` at 04:54:32, `builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.runtime.abort` / `Tests run: 2,  Failures: 2` (call `dR3v38`); `junit.sh base-H2 … HelperRaiseMessageCompiled.test` at 04:56:34, `FortressImplementationError: fortress.CompilerBuiltin$FileNotFoundException.<init>(java.lang.String)` / `Tests run: 2,  Failures: 1` (call `zdw49j`); both before the first edit of code (`runtime.java` and `Utility.java` at 04:56:53, call `bKUZh6`) and the build. The walk guard ran on the base at 04:54:45 (`DeVx2L`), before the library edit at 04:57:18: `OK (11 tests)`. After the build and the library order: `junit.sh edit1-H` at 04:59:13, `OK (4 tests)` (`fSoWbi`); `harness-one.sh` at 04:59:28, `OK (11 tests)` (`3zjYsX`). No code changed after them. `ant testSystem` (779, 0 failures) and `ant testQuick` (CompilerJUTest 1451, LibraryJUTest 86, OtherCompilerJUTest 263, 0 failures) ran on 180751e1; their logs end `BUILD SUCCESSFUL` and `EXIT=0`.
3. **The diff**, against the section, P-169, P-167, F-298 and fork H1 to H4: the six helpers in `nativeHelpers/runtime.java` (H1); `abort` throws `TransactionAbortException` in a transaction and else returns (H3), the same throw as the run time's own `Transaction.TXAbort` (`runtimeSystem/Transaction.java:127-130`), so no lock or state is left behind; `printTaskTrace` walks `BaseTask`'s `parent` (H3); the four raise `FailCalled` "spawn is not compiled yet" by the prelude's name (H2); `val(): T = cast[\T\](valAny())` over a private `valAny(): Any` (P-162's pair, H2); six table entries (H4). The api does not change. `Utility.java:30` is a file the section does not name; the worker lists it as a point and a reserved point.
4. **The precedent.** P-167's device and its two entries; the team's `runtime.java`; `cast` as `FortressLibrary.fss:2643` uses it. The repair at `Utility.java:30` covers all 13 raises with a message (fileOps 2, `FortressBufferedReader` 6, `FortressBufferedWriter` 5), counted by `grep -rn makeFortressException`.
5. **The tests' text.** Each file carries one comment line and is named by its topic; the walk test's citations name file and section (`thread.tex, method val`, `transactions.tex, section Abortable Atomicity`), and those sections say what the messages say. No test asserts a crash row, a glue string or walk's message at a missing file.
6. **My programs**, below.
7. **The homes**: the worker's defect, home 1; NEW-H-1, home 2; NEW-H-2, home 3; rung R's NEW-R-1, below.
8. **The ledger**: `ledger-find` for `abort`, `printTaskTrace`, `nested atomic`, `deferred` and `TransactionAbortException` finds no row for my two defects; rows 888 (the same exception-table order for `try`) and 324 (an exception out of `atomic`) are their siblings. Row 82's note fits: `ledger.py note 82 TEXT --check` printed "the note (275 characters) fits".
9. **The report.** Its five provenance lines open at the lines they cite (`FortressBuiltin.fss:775-786`, `FortressLibrary.fss:4625`, `NativeApp.java:47-53` and `runtime.java:15-18` at 157323e5, `FortressLibrary.fss:2643`, `thread.tex`, `spawn.tex`, `transactions.tex`). Its list of sentences made false holds (`changes.tex:4625`, `:4658`; F-32, F-299, F-328; PLAN.md:47, :56). Three sentences of the record claimed that compiled `abort` reruns the innermost block; I qualified them (below).
10. **Competing declarations.** `valAny`, `threadVal`, `threadWait`, `threadReady`, `threadStop`, `TaskParent` and the three test names occur only in this rung's files (`git grep -l`), and no other rung of the batch edits `runtime.java`.
11. **Failure modes.** `abort` off a pool thread returns, as outside an `atomic`, which the specification gives; no transaction can run off the pool. `printTaskTrace` off a pool thread prints nothing, where the specification is silent. The `Utility` repair turns an uncatchable `FortressImplementationError` into the named exception; an uncaught one still ends the run.

## My programs, old against new

Each written for this check, run under walk and compiled, from my scratch folder, the new code with the rung's build and a private copy of its caches, the old code with `old-fortress.sh /home/user/fortress-base28 …`.

- `SkAbortWalk` (walk; `abort` from a called function, in a nested block, inside a `try`, in a parallel `for`, in a spawned thread), at `FORTRESS_THREADS=1` and `=4`, old and new alike:

      x 11
      o 1 i 1
      y 1 caught 0
      total 4
      t 9

- `SkThreadWalk` (walk; `val` of a string, a pair, `()`, a `ZZ64`, a function, a float; `printTaskTrace` in a spawned thread and at the top level), at 1 and 4 threads: old and new outputs equal, but for the path of the program's own folder in walk's task line.
- `SkRaiseWalk` (walk; `makeJavaBufferedWriter` on a missing folder, a write after `close`): `FileNotFoundException caught`, `IOFailure caught`, old and new, rc=0: the `Utility` repair does not reach walk.
- `SkRaiseCompiled` (compiled; the same two raises through the prelude), at 1 and 4 threads: new `IOFailure [I/O failure:  Stream closed ]` and `FileNotFoundException [File not found:  /no-such-folder-sk/x.out (No such file or directory) ]`, `PASS`, rc=0; old `FortressImplementationError: fortress.CompilerBuiltin$IOFailure.<init>(java.lang.String)`, rc=1.
- `SkRaisesCompiled` (compiled; `runtime.threadWait`, `threadReady` and `threadStop` bound in its own declarations): `wait raises  true`, `ready raises  true`, `stop raises  true`, and `Task: SkRaisesCompiled` from a top-level `printTaskTrace`, at 1 and 4 threads. On the old code every program that binds a `runtime` helper stops at compile: `builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.runtime.abort`, rc=255.
- `SkTryAbortCompiled`, `SkForAbortCompiled`, `SkForInAtomicCompiled` (compiled; `abort` inside a `try` in `atomic`, per iteration of a parallel `for`, outside `atomic` in a `for`, and inside a `for` inside `atomic`), at 1 and 4 threads: `y  1  caught  0`, `total  4`, `outside  4`, `n  1`, as walk gives (`SkForInAtomicWalk`: `n 1`).
- `SkNestedCompiled` (compiled; an outer block writes `o`, an inner one writes `i` and aborts before a 10 ms deadline), at 1 and 4 threads: `o  2  i  1`, where walk gives `o 1 i 1`. In `SkRuntimeCompiled`, the same nested block followed by a top-level block ended the run: `com.sun.fortress.runtimeSystem.TransactionAbortException`, `at com.sun.fortress.runtimeSystem.Transaction.TXRead(Transaction.java:157)`, from the `println` after that block. This is NEW-H-1.
- `SkDeferredWalk` (walk; `h = spawn do 1 DIV 0 end; println("spawned"); h.wait()`): `spawned`, then nothing until `timeout 60`, rc=124, old and new; `val()` in a `try` the same at 1 and 4 threads. This is NEW-H-2.
- Rung R's `XXXFileOpsRaiseCaughtCompiled.fss`, copied from `wip/rung-io-reader`: on this rung's code `REACHED` and rc=0; on the base's code `REACHED`, then `FortressImplementationError: fortress.CompilerBuiltin$IOFailure.<init>(java.lang.String)`, rc=1.

## Findings and fixes

**1. NEW-H-1: compiled `abort` in an `atomic` block nested in another reruns the outer block, whose first try's write stays.** `CodeGen.forAtomicBlock` writes the block's exception-table entry before it visits the body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1746`), so the outer entry precedes the inner one and takes the inner block's `TransactionAbortException`, and `BaseTask.cleanupTransaction` pops one level (`runtimeSystem/BaseTask.java:203-212`), as row 888 has it for `try`. The specification settles it: `abort` "abandons execution of the innermost atomic expression and rolls back its changes" (`transactions.tex`, "Abortable Atomicity"). The code generator and the compiled transaction are outside the rung, so home 2: `compiler_tests/XXXNestedAtomicAbortCompiled.fss` with `NestedAtomicAbortCompiledLink.test` and `XXXNestedAtomicAbortCompiled.test`, and the row NEW-H-1 in `record.md`. A correction, settled by that sentence; commit 3bbb7163.

- On the base's code, `old-fortress.sh /home/user/fortress-base28 <caches> junit …/NestedAtomicAbortCompiledLink.test …/XXXNestedAtomicAbortCompiled.test` (07:20:30Z):

      builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.runtime.abort
      FAILURES!!!
      Tests run: 2,  Failures: 2,  Errors: 0

- On the head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh sk-head ProjectFortress/compiler_tests NestedAtomicAbortCompiledLink.test XXXNestedAtomicAbortCompiled.test` (07:20:05Z, tree 1da18073):

      . run ProjectFortress/compiler_tests/XXXNestedAtomicAbortCompiled (300ms) REACHED
      FAIL:  abort abandons only the innermost atomic block; transactions.tex, section Abortable Atomicity
      Saw expected failure (Exit code != 0)
      OK (2 tests)

- With the outer `atomic do` made a plain `do` for one run, then restored (`junit.sh sk-nodefect`): `PASS`, `Did not see expected failure`, `Tests run: 2,  Failures: 1`.

**2. NEW-H-2: under walk `wait` and `val` on a spawned thread that completed abruptly spin forever.** `SpawnTask.compute` sets `resultIsReady` only after a normal return (`interpreter/evaluator/tasks/SpawnTask.java:30-39`), and `result()` and `waitForResult()` spin on it (`:56-68`). The specification settles it (`basic/evaluation/parallelism.tex`, "Threads and Parallelism": `val` throws the deferred exception, `wait` returns); its note says deferred exceptions are not yet supported. The same on the base; walk's tasks are outside the rung. No gated test can pass while the run spins, so home 3: the row NEW-H-2 in `record.md`, reproducer `none`. Commit 3bbb7163.

**3. Rung R's NEW-R-1 is this rung's `Utility` defect, and this rung's repair turns R's `XXX` pair red on the merged tree.** R records the defect as NEW-R-1 with `compiler_tests/FileOpsRaiseCaughtCompiledLink.test` and `XXXFileOpsRaiseCaughtCompiled.test`; R's section keeps `compiler/runtimeValues/` out of R and reserves an edit of a run-time class, and H's section names neither. R's program passes on this rung's code (above), so on the merged tree the `XXX` run sees no expected failure. `REPORT.md` section 12 and `record.md` now say so; the promotion of R's pair and the close of NEW-R-1 by 180751e1 are the gather's, since R's files are not on this branch. Commit 3bbb7163.

**4. The record's "innermost".** `REPORT.md` section 1 ("so the aborted try's writes vanish"), `record.md` finding 2, the handover line and the Revival change said that compiled `abort` reruns the innermost block; each now limits it to a block not nested in another and names NEW-H-1. Commit 3bbb7163.

Observations, no fix: the abort tests pass without an abort if the first try starts after their 20 ms deadline, which the harness's runs did not show; the compiled test asserts `threadVal`'s raise, not the other three, which `SkRaisesCompiled` checks; the javadoc of `OWN_OPERATIONS` (`NativeApp.java:42-46`) is the worker's listed sentence made false, left since the section limits the edit to the static block.

## Where I differ from the worker

Nowhere on the change. Decision 7, the clock in place of a counter, is right by the specification: the rollback restores a counter written in the block. Decision 8, the repair at `Utility.java:30`, I keep: the section's own test, `threadVal` caught as `FailCalled`, needs it, and `basic/expressions/try.tex`, "Try Expressions", settles that a thrown exception is caught; its meeting with rung R is finding 3.

## Verdict

Approved. The change does what the section asks, test first; my commit adds a home-2 test and the record's corrections, none contested. No suite ran for my commit: it changes no code.
