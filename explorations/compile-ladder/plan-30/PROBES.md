<!-- The probes of climb batch 30's planner, 2026-11-10, for the record `coordinator/CLIMB-BATCH-30.md`: the base build, a provisional grain size in the one library's parallel range under microGPT's quick checks, row 971's stack, the keys of the briefings, and the disk. Run in a worktree of the planner's own, `/home/user/fortress-p30`, seeded from the base build `/home/user/fortress-base31` (`9a0f69e01a`) and removed after; no suite, stage or build was run in it. -->

# Climb batch 30: the planner's probes

## 1. The base build

`/home/user/fortress-base31`, a detached worktree at `9a0f69e01ae9d1f87293aa479631e839ed6d2805`, `main`'s head when the planner started. Built once by `fortress-repo`'s `worktrees.md`: `ant compileAll`, the library order, one walk run of `ProjectFortress/tests/BooleanOps.fss`.

    BUILD SUCCESSFUL
    Total time: 43 seconds
    EXIT=0

- `default_repository/caches/bytecode_cache/` holds the five jars: `CompilerSystem.jar`, `fortress.AnyType.jar`, `fortress.CompilerAlgebra.jar`, `fortress.CompilerBuiltin.jar`, `fortress.CompilerLibrary.jar`.
- `git status --porcelain -- ProjectFortress Library default_repository` prints nothing, which is what `seed-worktree.sh` tests. The whole tree's status shows one untracked file, `.base-ready`, which holds the commit's hash, as the planner's brief asked.
- One seed from it took 3 s ("seeded from /home/user/fortress-base31 (9a0f69e01a) in 3 s").
- `/home/user/fortress-base30` (`dd00743d9e`) is removed.
- `main` moved on while the planner worked, by commits under `explorations/` only: `git diff --stat 9a0f69e01a main -- . ':!explorations'` prints nothing at `00768e9e96`.

## 2. A grain size in the one library's parallel range, under microGPT's quick checks

The question: P-175's grain size ends a parallel range's split at a chunk that runs in sequence. A chunk folded in sequence joins its elements in another order than the tree of single elements does, so a float reduction can differ in its last bits. Do microGPT's quick checks under walk stay 7 of 7?

The edit, in the probe worktree only, in `object CompactFullParScalarRange` of `Library/RangeInternals.fss` (`:1301-1345` at the base): in `generate`'s `loop'` and in `loop`'s `lop`, the test `if lo=hi then body(lo)` became `if hi - lo < 16 then` followed by the sequential range's own method, `CompactFullSeqScalarRange(lo,hi).generate[\T\](red, body)` and `CompactFullSeqScalarRange(lo,hi).loop(body)`. So a chunk of at most 16 elements runs in sequence, and the split above it is unchanged.

The command, once on the seeded tree and once with the edit: `explorations/coordinator/tools/mg-run.sh tmp/<dir> <label> 1`, the quick pair at one thread, each from an empty private cache. Machine: nproc 4, Intel Xeon @ 2.30GHz, OpenJDK 25.0.4.1; load 0.60 at the first run's start and 1.57 at the second's; both programs run at once, as the script does.

Without the edit:

    MicroGptFlatQuick: batch 1 step 1 loss 3.3659669475848513 vs 3.365966947584851 (5717 ms): diff 4.440892098500626E-16 PASS
    MicroGptFlatQuick: batch 1 step 2 loss 3.424272783871772 vs 3.424272783871772 (4876 ms): diff 0.0 PASS
    MicroGptFlatQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS   rc=0 secs=38
    MicroGptAplQuick:  VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS   rc=0 secs=42

With the grain of 16:

    MicroGptFlatQuick: batch 1 step 1 loss 3.365966947584851 vs 3.365966947584851 (4803 ms): diff 0.0 PASS
    MicroGptFlatQuick: step 0 batch 1: max |P after Adam - golden| over 4192: diff 2.7755575615628914E-16 PASS
    MicroGptFlatQuick: batch 1 step 2 loss 3.4242727838717717 vs 3.424272783871772 (4352 ms): diff 4.440892098500626E-16 PASS
    MicroGptFlatQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS   rc=0 secs=33
    MicroGptAplQuick:  VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS   rc=0 secs=39

What it shows:

- Both programs stay 7 of 7. The tolerances are `10.0^(-12)` (`explorations/run-c4/src/MicroGptFlatQuick.fss:19-20`).
- The last bits move, in both programs alike: the first loss now equals its golden where it differed by 4.4e-16, the second differs by 4.4e-16 where it was equal, and the parameters after Adam differ by 2.8e-16 where they differed by 8.3e-17.
- The times are not a measurement: walk's time decides nothing (P-29), and the two runs had different loads.
- The edit is the sequential range's own code, so it shows one way that the library already has. It was not run through the compiled checker: the count stage on it is the rung's.

Not run: four threads; any other value of the grain; the full checks.

## 3. Row 971's stack

The row's reproducer, `ProjectFortress/compiler_tests/XXXNumeralCoercionSpawnCompiled.fss`, compiled and run in the probe worktree at four threads:

    Exception in thread "main" java.lang.ExceptionInInitializerError
    	at com.sun.fortress.runtimeSystem.MainWrapper.main(MainWrapper.java:64)
    Caused by: java.lang.ClassCastException: class java.lang.Thread cannot be cast to class com.sun.fortress.runtimeSystem.FortressTaskRunner
    	at com.sun.fortress.runtimeSystem.BaseTask.getCurrentTask(BaseTask.java:241)
    	at XXXNumeralCoercionSpawnCompiled$task1.<init>(...)
    	at XXXNumeralCoercionSpawnCompiled.coerce_Cell?natural(...)
    	at XXXNumeralCoercionSpawnCompiled.\=numeral\%init\%0(...:11)
    	at XXXNumeralCoercionSpawnCompiled.<clinit>(...)

So the cast fails in a task's constructor, which asks for the current task on the JVM's main thread, where `MainWrapper.main` loads and initializes the component's class (`runtimeSystem/MainWrapper.java:61-64`). A pool that only exists earlier does not change the thread: the class must be initialized on one of the pool's threads. `BaseTask.forkIfProfitable` already has a branch for a spawn from a class initializer (`runtimeSystem/BaseTask.java:122-144`, "we attempted to spawn work from a class initializer"), which the constructor never reaches.

## 4. The keys of the briefings

Every key of the record's section 1 went through `explorations/coordinator/tools/facts-extract.sh --check` on `main` (`00768e9e96`, whose code is the base build's), each matching one place. The record's own keys (REC) were checked against the record as committed.

## 5. The disk

`df -P /home/user`, Available: 18,590,548 KB, about 17.7 G, at 08:2x UTC on 2026-11-10, with the planner's worktree removed, the base build in place and one other worker's worktree (`/home/user/fortress-eqways`) present. The script's floor is 1.5 G a rung plus 4 G: 8.5 G for run 1's three rungs, 7 G for run 2's two.

## Not run

A build, a suite, the count stage, the distance stage, or a compiled program other than row 971's reproducer. The two reviews' measurements are cited in the record as findings.
