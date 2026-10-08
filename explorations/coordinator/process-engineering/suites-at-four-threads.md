<!-- With FORTRESS_THREADS=4 in both pins of build.xml (in a worktree only, not committed), ant testSystem and ant testFast each passed in one run on b5cde136e with climb batch 10's gate counts (516 and 1,815 tests, no failure, no error), in 2 min 17 s and 8 min 47 s against the gate's 3 min 46 s and 11 min 11 s at one thread on another machine, so there was no failing test to run alone and no ledger row; 2026-10-08. -->

# The two suites at four threads

Written 2026-10-08 for the coordinating session, then the curator.

The question: what do `ant testSystem` and `ant testFast` do when the Fortress programs in them run with several threads, as Fortress is designed to run?

The ground, from the brief: `build.xml` pins `FORTRESS_THREADS` to 1 at line 947 (the `fastTrack` macro of `testFast`) and line 1188 (the `systemShard` macro of `testSystem`). The team's build set no thread count, so a test ran at half the CPUs. The comment above `systemShard` gives the pin's reason: it "stops four interpreter runtimes from oversubscribing the CPUs" (`build.xml:1166-1169`).

## The short answer

- Both suites passed at four threads, in one run each.
- Their counts equal the gate's, class by class and shard by shard: 516 tests in `testSystem`, 1,815 in `testFast`, no failure, no error, no skip.
- No test failed, so no test was run alone (step 4 of the brief), and there is no ledger row.
- Both suites took less wall time than the gate's one-thread runs. The gate ran on another machine, so this does not separate the thread count from the machine.

## What was run

- Tree: the worktree `/home/user/fortress-threads4`, detached at `b5cde136e`, which was `main`'s HEAD at the start.
- Code state: the gate's. `git diff --stat aa07efb31 b5cde136e -- ProjectFortress Library build.xml bin` prints nothing; `aa07efb31` is the commit the gate ran on (commit `ec718967a`'s message).
- Seeding: `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress /home/user/fortress-threads4 -` refused with exit 2: "`default_repository/caches/bytecode_cache/fortress.CompilerBuiltin.jar` is missing". The main tree had run `ant compileAll` but not the library order. So the worktree was made with `git worktree add --detach` and built with `ant compileAll` (BUILD SUCCESSFUL, 48 s), as `worktrees.md` says for a refused seeding. The two suites need no library order (`build-and-caches.md`).
- The change: `value="1"` to `value="4"` at `build.xml:947` and `:1188`. It is not committed. The worktree keeps it.
- The suites ran one after the other, each in the background with its log in the worktree's `tmp/`: `testSystem-t4.log`, `testFast-t4.log`.
- During each suite, `/proc/<pid>/environ` of each of the four JUnit JVMs held `FORTRESS_THREADS=4`.

How the setting reaches the programs, by reading:

- Walk builds its work-stealing pool from `FORTRESS_THREADS` (`interpreter/Driver.java:520-531`, `:540`, `:558`). A shard runs all its tests in one JVM, so four shards ran 16 workers on 4 CPUs.
- A compiled `.test` runs its program as a `bin/fortress run` child process with the JUnit JVM's environment (`tests/unit_tests/FileTests.java:541-571`). The compiled run time reads `FORTRESS_THREADS` once per process (`runtimeSystem/FortressExecutable.java:25-39`). `testFast` ran 364 such run steps.
- The code generator forks tasks only for arguments, tuples and initializers that its parallelism analyzer judges worth it (`compiler/codegen/CodeGen.java:4013-4014`, `:4577-4581`, `:4906-4907`). How many of the 364 runs forked a task was not measured.

## The machine

- `nproc`: 4.
- CPU: Intel(R) Xeon(R) Processor @ 2.10GHz, `cpu MHz` 2100.000 on all four.
- Memory: 15 GB.
- JDK: openjdk 25.0.4.1 2026-08-18 (OpenJDK 64-Bit Server VM, build 25.0.4.1+1-1-24.04.4-Ubuntu). Ant 1.10.14.
- Load at the start of `testSystem`: 2.12 1.68 0.86, just after the worktree's build ended.
- Load at the start of `testFast`: 4.81 3.81 1.85, 18 s after `testSystem` ended.
- Before `testSystem` started, `ps` showed no other Java or ant process. Two Claude processes ran beside the suites; `ps` gave each under 7 % of a CPU over its life. The brief says that nothing else builds or runs in the main tree but a skill writer that edits text.

## The times

- `testSystem`: Total time 2 minutes 17 seconds (17:27:28 to 17:29:46 UTC). The gate's: 3 minutes 46 seconds.
- The four shards took 108.8, 112.0, 136.3 and 113.3 s.
- `testFast`: Total time 8 minutes 47 seconds (17:30:04 to 17:38:52 UTC). The gate's: 11 minutes 11 seconds.
- Its tracks took 356.8 s (library), 366.4 s (othercompiler) and 525.8 s (compiler). At four threads the compiler track, not othercompiler, set the total. `tests-running.md` names othercompiler as the longest track at one thread.
- The gate ran on another machine: Intel(R) Xeon(R) Processor @ 2.80GHz, 2799.998 MHz, openjdk 25.0.4, load at start 1.64 0.53 0.34 (`explorations/compile-ladder/climb-batch-10/gate/distance.txt:42`; `summary.txt` records no machine).
- This machine's clock is lower, and both suites were still faster. A one-thread run of both suites on this machine would separate the thread count from the machine. It was not run.

## The counts against the gate

The gate is `explorations/compile-ladder/climb-batch-10/gate/summary.txt`. Its 52 rows were compared with the four-thread results by `diff`, and all are equal.

- `testSystem`: shards 0 to 3 ran 131, 128, 126 and 131 tests, 516 in all. The gate: 131, 128, 126 and 131.
- `testFast`: compiler 1,043; library 86; othercompiler 263; misc 423 over 45 classes; 1,815 in all. The gate: the same, class by class.
- Failures, errors and skips: 0 in every row, as in the gate.

## Failures

None. There is no test to classify and no ledger row.

## What one passing run does not show

- Each suite ran once. A race that fails in one run of many can pass one run. A rate needs repeated runs at four threads, which were not made.
- An `XXX` walk test passes on any exception, by reading: `InterpreterTest` keeps the base `testFailed`, which returns null (`FileTests.java:111-113`), so `:351-366` print "OK Saw expected exception" for whatever the program threw. 112 of the 515 `.fss` files in `ProjectFortress/tests/` are `XXX` tests. A race that throws in one of them reads as a pass.
- The gate's atomic runs already ran 14 programs three times each at four threads (`summary.txt`), and all passed. This run adds the two whole suites.
