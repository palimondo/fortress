# Rung X, rung-compiled-transaction: the skeptic's check

Verdict: **approved**. The six repairs are right as built, each test was seen failing on the base's code before the edit was first built, and my own programs agree with walk on the compiled path wherever the specification speaks. I found no defect in the Java. I added one compiled test for a change that had none, its walk twin as an expected failure (walk, the rung's reference, is wrong there), one ledger row, and corrections of two test files, REPORT.md and record.md. None of my commits is contested.

- Head judged: 13aeef1148 (code commit 13c90e37e9). Head after: the commit of this file, on 2a46d78ebc.
- The base build `/home/user/fortress-base31` stands at 9a0f69e01a, twelve commits before the base 9d0147ff9e, not at it. `git diff --stat 9d0147ff9e 9a0f69e01a -- ProjectFortress Library build.xml bin` prints nothing, so its code is the base's, and every old-code run below is a run of the base's code.
- REPORT.md and record.md were on the branch already; the journal tool wrote nothing.

## What I checked

1. **Stages.** The section asks for none, and the report ran none. `git diff --name-only 9d0147ff9e...13aeef1148` lists, outside the tests and `explorations/`, `runtimeSystem/Transaction.java`, `TransactionAbortException.java`, `BaseTask.java`, `compiler/codegen/CodeGen.java` and `compiler/runtimeValues/ArrayStoreJUTest.java`: the files the section gives the rung, declared for STAGE_BLIND. No Scala and no checker code changed, so I ran no count stage.
2. **Test first**, in the worker's transcript, times in UTC on 2026-11-10. The Java was first edited at 08:54:18 (call 16NENu) and first built at 08:54:34 (tgFyxs). Before that: the harness run of eight `.test` files at 08:47:53 (iXnAEm, read at fqpDQS) with the lines the report quotes, 'FAIL: d =  395  of 400', 'FAIL: a nested block saw x =  1063  and y =  1064' and 'Tests run: 14,  Failures: 5'; `AtomicSharedReadsCompiled` over `seq(…)` at 08:48:37 (8iKTMX), 'java.util.ConcurrentModificationException'; `AtomicOwnWriteNestedCompiled` under `timeout 60` at 08:48:52 (peyy4n), 'timeout 60 junit.sh: exit=124', and directly at four threads (PhKfRU), 'exit=124'; `ant testOnly -DtestPattern=ArrayStoreJUTest` at 08:51 (JEjKvb), 'Tests run: 7, Failures: 1' and BUILD FAILED. After the last change of code: 'OK (122 tests)', 'OK (28 tests)', 'OK (47 tests)' at 09:02:30 on 13c90e37e9 (pEWgjv), and the store's 'Tests run: 8, Failures: 0' at 08:57 (s9YdC1). The store's failing run found 4 rounds of 1,000 on the base, where the review's probe found 935 to 988: the test is weaker than the probe, and it still failed.
3. **The diff**, line by line against the section, `atomic.tex`, `transactions.tex`, `try.tex`, P-169 and forks X1 to X5. Each repair does what the report says. The locks: a thread takes a child's set before a parent's and a read set before a write set, and none waits for the global lock inside a set's monitor (`Transaction.java:234-246`, `:255-284`, `:318-367`); I found no cycle. No line of `BaseTask.java` above `startTransaction` and none of `CodeGen.genParallelExprs`, `evalArg` or `generateTaskCompute` is touched.
4. **Precedent and sibling sites.** `visitTryCatchBlock` is called by the code generator at three sites (`CodeGen.java:1801`, `:2120`, `:5899`); the two that nest are repaired. `ForkJoinTask` on this JDK copies a joined task's exception through the constructor that takes a `Throwable`: my Java probe printed 'joined in the pool: same object false, names the transaction true, cause is the thrown one true'.
5. **The tests.** Each exercises its defect; each citation names a file and a section. `AtomicNestedViewCompiled.fss` and `AtomicThrowRevertsCompiled.fss` carried two comment lines each: corrected to one.
6. **My own programs**, below.
7. **The three homes.** Rows 933, 934, 937, 888, 324, 949, 950 and row 466's sentence: home 1. The nested transaction's reads handed to its parent had no test: home 1 now, my test. NEW-X-1: the worker files it under home 3; `atomic.tex`, "Atomic Expressions", settles it ("an inner atomic expression is atomic with respect to evaluations which occur dynamically outside the inner atomic expression but dynamically inside an enclosing atomic"), so it is a home-2 defect for which no gated test can stay expected-red, since it showed in two of the worker's three runs; a row with reproducer `none` is what the skill leaves for that. It is not a regression: the base validated a read of an ancestor's write at the same moments. Walk's loss of a nested block's reads, which my programs measured: home 2, an `XXX` test and the row NEW-X-2.
8. **The ledger.** `ledger.py find --cites` on the edited files lists 324, 466, 933, 934, 937, 948, 949, 950, 640, 876 and 979; the rung closes or leaves each as record.md says. Nothing of walk's nested reads was on record (`ledger-find` on "walk atomic nested", "walk atomic lost", "nested transaction walk").
9. **The report.** Its five provenance lines open on what they claim (`transactions.tex:15-19`, `try.tex:54-60`, `FortressTaskRunner.java:121-138`, `:165-170`, `Transaction.java:2`). No sentence of the specification is made false: none speaks of the compiled path. No whole suite is owed after an edit of the code generator and the runtime (the skill's `tests-running.md`, "When to run a whole suite"). The tables: none; the report's runs are those of the worker's head.
10. **Competing names.** Each new test name has one `.fss`; no `XXXNestedAtomicAbortCompiled` or `XXXNestedTryInnerCatch` is left; `leaveTransaction`, `TXLeave`, `handOver`, `validateReads` and `throwOn` are declared once.
11. **Loud failures made quiet.** (a) An abort that reaches the outermost block and names another transaction starts that block again where it would have ended the program (`BaseTask.java:290`); none was seen. (b) Where a nested block's reads no longer hold as an exception leaves it, the block starts again in place of throwing (`BaseTask.java:281-287`): the exception was thrown on a state no commit made, and `atomic.tex` has the block retried on a conflict. (c) An uncaught `TransactionAbortException` after an exception out of a block (the base's end of `AtomicThrowRevertsCompiled`) is gone because the transaction now ends. No quiet value replaces an error that the specification asks for.

## My programs

Scratch, not committed; run with the rung's build for the new code and `old-fortress.sh` on the base build for the old, compiled at `FORTRESS_THREADS=1` and `=4`, and under walk at 1 and 4.

**Try and atomic, six shapes** (two levels with nothing caught between; a `try` inside a block; an inner `try` that does not take the exception; an exception from a function called in an arm of a block; a later block; blocks in a parallel `for`, every third throwing):

    new compiled, threads 1 and 4, two runs each, and walk at 1 and 4, the same six lines:
    1: g =  0  c =  1
    3: k =  0  c =  11
    4: m =  0  c =  111
    6: k =  200  h =  112
    old compiled, threads 1 and 4:
    1: g =  2  c =  1
    com.sun.fortress.runtimeSystem.TransactionAbortException

**Deeper nesting** (three blocks deep in one body over 1#400; nested blocks in the two arms of a block beside 2,000 blocks; one arm's nested block throws and the block catches):

    new compiled threads=4: A d =  400  of 400; B e =  2400  of 2400; C g =  400  of 400
    old compiled threads=4: A d =  323, 305, 316  of 400; then TransactionAbortException in two of three runs
    walk threads=4:         A d = 400; B e = 2400; C g = 400

In C the compiled path leaves `f` at 2,100 and walk at 2,200: where the first arm throws at one thread the second arm is not run on the compiled path, and walk runs both. That is the group's rule, rung P's (fork P1), and `parallelism.tex` allows an arm not run.

**`abort()` in an arm of a nested block**: new compiled 'o =  1  of 1' in four runs; old compiled exit 124 under `timeout 60` in four runs.

**The halves the worker did not see fail alone**, on the old code at four threads: the arms half of `AtomicNestedViewCompiled`, 'FAIL: a nested block in an arm saw x =  0  and y =  377'; the nested case of `AtomicThrowRevertsCompiled`, 'com.sun.fortress.runtimeSystem.TransactionAbortException', exit 1. Both `PASS` on the new code at one thread and four. `ArrayStoreJUTest.testAnExceptionLeavesATransactionWithoutItsWrites` cannot be compiled against the base, which has no `leaveTransaction`; what it guards is seen failing in `AtomicThrowRevertsCompiled`.

**A nested block's reads**: an outer block assigns `x` from `readX()`, an `atomic do x end`, beside 3,000 blocks `x := x + 1`; then the same with a nested block that throws what it read:

    new compiled, threads 1 and 4, three runs each: readonly nested: x =  3300  of 3300; nested throw: u =  3300  of 3300
    old compiled threads=4: x =  3300, 3299, 3267  of 3300; then TransactionAbortException
    old compiled threads=1: nested throw: u =  3000  of 3300
    walk threads=1: x = 3300, u = 3300
    walk threads=4: readonly nested: x = 322 of 3300; nested throw: u = 353 of 3300

So the worker's change "found by reading, not measured" is measured: the base lost updates, the rung keeps them. And walk loses them, at four threads, every run. A second walk program narrowed it: with the read in the outer block itself, 1,100 of 1,100; with the read in a nested block that writes nothing, 109 and 116; in a nested block that also writes, 106 and 100.

## Fixes

1. **913a9b191b, a correction (tests).** Finding: the rung changed what a nested commit without a write and a nested block that an exception leaves hand their parent (`Transaction.java:302-318`), with no test (REPORT.md said "no test asserts it"). `compiler_tests/AtomicNestedReadsKeptCompiled` asserts it. Settled by `atomic.tex`, "Atomic Expressions": "All reads and all writes which occur as part of this evaluation will appear to occur simultaneously in a single atomic step" (`Specification/basic/expressions/atomic.tex:38-41`).
   - Failing, on the base's code through the harness, 2026-11-10T10:29:00Z: `old-fortress.sh /home/user/fortress-base31 <worktree>/tmp/old-caches junit <worktree>/ProjectFortress/compiler_tests/AtomicNestedReadsKeptCompiled.test`: '. run …/AtomicNestedReadsKeptCompiled (402ms) com.sun.fortress.runtimeSystem.TransactionAbortException', 'Tests run: 2,  Failures: 1,  Errors: 0'.
   - Passing, on the head: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic-head ProjectFortress/compiler_tests AtomicNestedReadsKeptCompiled.test AtomicNestedViewCompiled.test AtomicThrowRevertsCompiled.test`: '. run ProjectFortress/compiler_tests/AtomicNestedReadsKeptCompiled (448ms) PASS', 'OK (6 tests)'; directly, 5 of 5 `PASS` at one thread and 5 of 5 at four.
   - The same commit adds `tests/XXXAtomicNestedReadsKeptWalk.fss`, home 2 for walk's defect. Through `harness-one.sh`, as it is: 'FAIL: x = 109 of 1100 after a nested block that wrote nothing, u = 103 of 1100 after a nested block that threw', ' Saw expected failure', 'OK (1 test)', and so in three more runs. Changed for one run so that the outer block reads `x` and `u` itself, then restored: 'PASS', ' Missing expected failure', 'Tests run: 1,  Failures: 1'. `ProjectFortress/tests/` is outside the section's list of files: a point to report.
   - And it leaves `AtomicNestedViewCompiled.fss` and `AtomicThrowRevertsCompiled.fss` one comment line each; both pass in the run above.
2. **2a46d78ebc, a correction (report and record).** REPORT.md: the two sentences that said the nested reads were not measured and not tested. record.md: finding 8, the test in the FACTS entry's list, and the row NEW-X-2 (linted with `ledger.py check --rows`: only its number fails).

No fix of mine changes Java or Scala, so no build and no suite followed.

## Where I differ from the worker's account

- NEW-X-1's home, as said under check 7.
- "Walk's transaction is the reference": for what a nested block's reads cost its outer block, walk is wrong and the compiled path is now right.
- The report's decision 4 calls the specification silent on handing a nested block's reads outward. On the mechanism it is; on the result it is not: the outer block's read and write of `x` must be one step, and my test asserts that.

## For the curator

- The worker's two questions stand: NEW-X-1, and a nested block whose reads no longer hold as an exception leaves it, which starts again.
- NEW-X-2: walk loses the updates of other blocks where an outer block assigns from what its nested block read. It is a defect of walk on a path this rung may not touch.

## For the gather

- NEW-X-2 goes into section 11 with `ledger.py add`; its line is in record.md.
- `AtomicNestedReadsKeptCompiled` is a test of a race, as the rung's others are: the batch's list of the gate's atomic runs does not name it.
- `.claude/skills/fortress-repo/references/compiler.md:106` still says the outer `try` is matched first.
