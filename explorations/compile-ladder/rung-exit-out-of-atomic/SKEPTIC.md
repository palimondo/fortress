# Climb batch 35, rung A: the skeptic's verdict

Judged: `wip/rung-exit-out-of-atomic` at `e6b743a7d0` (the worker's head). After: `715e097bb4`. One launch of the skeptic role worked this rung; the branch already carried the worker's `REPORT.md` and `record.md`, so the journal step wrote nothing.

Verdict: **approved**. The change is right on both paths, as the section and fork A1 ask, and the record is honest. Two corrections, neither contested: a sibling defect the change does not touch (row 1111, with its expected-failure test), and two claims of the record made exact (row 1110's scope; row 1041's rewrite).

## What I checked

1. **The stages.** The section sets none (`explorations/coordinator/CLIMB-BATCH-35.md:30`: "W, S, A, L and M run neither ... their edits are in walk, the code generator or the run time, which the stages do not run"). `git diff --name-only 13f4fdea75...HEAD` lists one path outside the stage-blind list, `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java`, the compiled run time, which that line covers. No stage ran, so no table to read.
2. **Test first**, in the worker's transcript. At 10:03:30 (call `LDihaA`) the command echoed "Expected failure: the harness reports ExitOutOfAtomicWalk red, its output 'FAIL: a ZZ32: 0 =/= a ZZ32: 7; ...'" before `harness-one.sh`, with `git status --short ProjectFortress/src` printing nothing, and the run printed 'FAIL: a ZZ32: 0 =/= a ZZ32: 7; writes within a block that an exit leaves are retained', 'Tests run: 1,  Failures: 1'. At 10:03:50 (`cHZ3Eb`) junit.sh, after its "Expected failure:" line: '. run ProjectFortress/compiler_tests/ExitOutOfAtomicCompiled (354ms) FAIL:  0 =/= 7; ...', 'Tests run: 3,  Failures: 1'. The nested case in one-run variants at 10:04:07 and 10:04:57, and at one thread by direct runs at 10:04:32 (rc=1). The first edit of code is at 10:05:14 (`m6qCwH`), the build at 10:05:57. The contended case was written at 10:08:02, after the build, and seen failing on the old code through the base build's harness and `old-fortress.sh junit` at 10:08:51 ('FAIL: a ZZ32: 0 =/= a ZZ32: 1000; ...'), as the skill allows for a tree that holds the fix. Passing after the last change of code (10:05:51): 10:09:16 (`XBjrH5`), '. run ... ExitOutOfAtomicCompiled (454ms) PASS', 'OK (3 tests)', and 'OK (1 test)'; one-thread direct runs walk rc=0, compiled 'PASS' rc=0. recordedFailure and recordedPass quote these lines.
3. **The diff**, line by line. Compiled: `BaseTask.leaveTransaction` commits on a `LabelExit` after setting the task's transaction to the parent (`BaseTask.java:302-309`), so a commit that aborts and restarts the block begins the new transaction under the right parent; a `TransactionAbortException` from the commit takes the existing abort path (`:317-322`), as the commit inside the block's range does at a normal end (`CodeGen.java:2054-2058`, `:2067-2100`). Walk: `doItOnce` catches `LabelException` and repeats the normal end's commit (`FortressTaskRunner.java:133-141` beside `:125-131`); `NamedLabelException` extends it. Fork A1 (`CLIMB-BATCH-35.md:452`) is built as stated: commit then leave, a failed commit runs the block again, other exceptions discard. Broader than the specification's "exiting to an enclosing label" only for an exit whose label block has completed (row 1041), which the worker took to the curator. No smaller form: the walk catch mirrors the normal end in the form the method uses, and the javadoc's old sentence "whose writes go with it" had to change. No trim.
4. **Where the fix belongs.** The two sites the section names; the only other transaction-ending code is `CodeGen`'s three calls and `ArrayStoreJUTest`'s copy of the compiled shape (`find ProjectFortress -name BaseTask.java`, `grep -rln 'leaveTransaction\|TXLeave' --include=*.java` list nothing else). The precedent, `endTransaction` (`BaseTask.java:210-221`) and the normal end of `doItOnce`, is followed.
5. **The tests.** Each file has one comment line, cites `atomic.tex, section "Atomic Expressions"` without a line, and is named by its topic; the promoted run-time pair has the three files of the promotion form. No competing declaration of `ExitOutOfAtomicWalk`, `ExitOutOfAtomicCompiled` or `XXXExitOutOfTryAtomicWalk` in `ProjectFortress/` or `Library/`.
6. **My programs** (below), under walk and compiled, old code and new, at one thread and four.
7. **Homes.** Row 1039: home 1. Row 1110: home 2, its test seen green and red. Row 1111 (mine): home 2, below. Row 1041's consequence: a note, the curator's question.
8. **Ledger and siblings.** `ledger-find` on 'exit atomic', 'label atomic', 'tryatomic', 'transaction commit'; `ledger.py find --cites` on both files: rows 322, 352, 353, 640, 876, 948, 952, 985, 1039, 1041; none other bears on the change. The sibling site is walk's `forTryAtomicExpr`, which wraps what leaves it (row 1110, row 1111).
9. **The report.** The five provenance lines and every cited line opened with `sed -n` (at the head and, where the report says so, at `13f4fdea75`): each says what it is cited for. `grep -rn '~1039\|~1041' Specification --include=*.tex` prints nothing; `memory-model.tex:310-319` and `completion.tex` say nothing of an exit's writes; no sentence of the specification is made false. Outside it, F-373's "Four limits stand" and `SKILL.md:126`, as the worker says. The whole-suite run: `ant testSystem` on `eb2f652487`, whose code is the head's, 'BUILD SUCCESSFUL', shards 214, 228, 216, 221 with 0 failures (`tmp` log read). The atomic runs: 72 lines, all PASS.
10. **The failure-mode question.** No loud failure became quiet: an exit already left the block quietly, with its writes lost; now it keeps them. A failed commit on an exit runs the block again, as at a normal end. Compiled, an exit after its label block completed still ends the program (my program, below).

## My programs

All under `tmp/rung-exit-out-of-atomic/skeptic/`, run by `diff.sh P`: the old code through `/home/user/fortress-base42/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base42 <worktree>/tmp/old-caches`, the new through the worktree's `bin/fortress` with `FORTRESS_CACHES` a copy of its caches; walk `P.fss`, compiled `compile P.fss` then `run P`; `FORTRESS_THREADS=1` and `=4` each.

`SkExitShapes.fss`, eight shapes the worker's tests do not hold: an exit that leaves the inner block only, the outer block ending normally; an exit out of the inner block, then a throw out of the outer one; an exit with a value; an exit from a closure made in the label block and called in the atomic block; an object's `var` field; a throw out of the inner block caught in the outer, then an exit; an exit from a task of a parallel `for` inside the block; 500 parallel exits out of a nested block and its outer one. The new code, walk and compiled, at one thread and four, all eight lines alike:

    1 innerOnly a b c = 1 2 3 (expect 1 2 3)
    2 innerThenThrow d e = 0 0 (expect 0 0)
    3 withValue v m = 10 9 (expect 10 9)
    6 innerThrowOuterExit p q = 13 0 (expect 13 0)
    8 nestedContended c1 c2 = 500 500 (expect 500 500)

The old code, all four columns: '1 innerOnly a b c = 1 0 3', '3 withValue v m = 10 0', '7 fromTask r = 0', '8 nestedContended c1 c2 = 0 0'.

The reserved point "an atomic run that fails": `atomic-reserved.sh`, `NestedAtomicAbortCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedSameBodyCompiled` and `nestedTransactions2`, three runs each at four threads on each code: 24 lines, all PASS, e.g. '# atomic NestedAtomicAbortCompiled new run1 threads=4 PASS', '# atomic AtomicThrowRevertsCompiled old run3 threads=4 PASS'. The reserved point "a model line": `git diff --name-only 13f4fdea75 HEAD -- explorations/run-c4 explorations/apl/mg` prints nothing.

`SkExitAfterLabelAtomicCompiled.fss` (row 1041 through an atomic block, compiled): old and new, one thread and four, 'REACHED', 'com.sun.fortress.runtimeSystem.LabelExit: exit from a label block that has completed', rc=1.

`SkExitTryAtomicNested.fss` (walk; an exit out of a `tryatomic` inside an `atomic` block): new 'exit out of a tryatomic inside an atomic: o t = 1 3 (expect 1 3)', old 'o t = 0 0', at one thread and four. This is the evidence for the first correction below.

`SkThrowOutOfTryAtomic.fss` (walk; a throw out of an `atomic` block, then out of a `tryatomic` block, each in a `try`): old and new alike, at one thread and four:

    atomic: caught Boom, u = 0 (expect 0)
    Exception in thread "main" java.lang.RuntimeException: java.lang.RuntimeException: FortressException: Boom
    rc=1

This is row 1111.

## Fixes

Both are corrections; neither changes code, so no build and no suite.

1. `347dd3ab73`, row 1111. Under walk an exception thrown out of a `tryatomic` block that no `atomic` block encloses never reaches the `catch` around it: `Evaluator.forTryAtomicExpr` throws `new RuntimeException(e)` for every `Exception` but `AbortedException` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:229-231`), the cause of row 1110 too. By `atomic.tex:46-48` and `:59-60` the `catch` takes it. Not the rung's to repair (rung W's file, outside the section's names, and present on the base). Home 2: `ProjectFortress/tests/XXXThrowOutOfTryAtomicWalk.fss`, and the row in `record.md` (finding 7). Its runs:

        echo "Expected failure: on the old code, the harness reports XXXThrowOutOfTryAtomicWalk green, 'OK Saw expected exception', the run dying with 'java.lang.RuntimeException: java.lang.RuntimeException: FortressException: Boom'"
        FORTRESS_HOME=$B $B/explorations/compile-ladder/rung-inference-walk/harness-one.sh $S/old-harness $PWD/ProjectFortress/tests/XXXThrowOutOfTryAtomicWalk.fss
        # harness-one 2026-11-23T11:20:05Z; tree 295c215c2c; ... FORTRESS_THREADS=4; cache empty
        java.lang.RuntimeException: java.lang.RuntimeException: FortressException: Boom
         OK Saw expected exception
        OK (1 test)

    On the head (`e6b743a7d0`'s code), the same lines at 11:20:21Z; with `atomic` in place of `tryatomic` for one run, ' Missing expected failure ', 'FAILURES!!!'; the file restored (`cmp`).
2. `715e097bb4`, the record. (a) row 1110's claim, `record.md`'s finding 5 and Revival change sentence, and the report's defect line said an exit out of any `tryatomic` block never reaches its label; inside an `atomic` block walk runs `tryatomic` as plain code (row 952) and the exit reaches its label (`SkExitTryAtomicNested`, above). Each now names a `tryatomic` block that no `atomic` block encloses. (b) Row 1041's rewrite dropped "Both libraries declare `LabelException` (`Library/CompilerLibrary.fss:191`), and the code generator never throws it", which still holds (`Library/CompilerLibrary.fss:191`; no `LabelException` under `compiler/codegen/`), under "the notes are cut back to what holds now"; the notes are shortened to keep it, 700 characters at most (`ledger.py check --rows`: '1 rows, 0 fail the template').

Settled: the specification's sentences above settle row 1111's answer; the corrections in 2 are measured facts. No fix is contested.

## Where I differ from the worker

Nowhere on the change. The report's tables are the worker's head's: no stage ran, and my commits change no code.
