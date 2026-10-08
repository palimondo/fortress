<!-- The workers of climb batches 8, 9 and 10 spent about 4 hours of wall time (248 minutes, summed over agents that ran side by side) in 120 test runs that started with an empty Fortress cache (98 harness-one.sh runs, 50 minutes; 8 gate suite runs, 54; 11 hand-made track and shard runs, 94; 3 count-run passes, 50), the printed timings put the cache fill and first load of a walk run at 14 to 27 s (about 30 of the harness-one minutes) and show nothing for the compiled tracks, and junit.sh does not start with an empty cache; read-only, from the 64 transcripts, 2026-10-08. -->

# Test runs that start with an empty Fortress cache: how many, how long, how much was the fill

Written 2026-10-08 for the coordinating session and the curator. Read-only: no build, no test and no Fortress program was run (another agent was timing the suites). The extraction scripts are in a scratch folder outside the repository and are not committed.

The question: how much time did the workers of climb batches 8, 9 and 10 spend in test runs whose Fortress cache started empty, and how much of each such run was filling that cache rather than running the tests?

What `testing-practices.md` already gives is cited, not re-derived: which agents wrote their own track and shard scripts (practice 2), the relative scratch directory (practice 5), the three batches' load. This note adds the count, the wall time and the fill.

## The short answer

- 120 runs started with an empty cache, about 248 minutes of wall time. By batch: batch 8 about 120 minutes, batch 9 about 53, batch 10 about 76.
- That is a sum of walls. Four rung workers and their skeptics ran side by side, and a suite run uses 2 or 4 JVMs at once, so the machine's time was larger and the batches' elapsed time was smaller.
- By kind:
  - `harness-one.sh`: 98 runs, 50 minutes, median 22 s.
  - The gate's `ant testFast`: 4 runs, 40 minutes, 9 to 11 minutes each. `ant testSystem`: 4 runs, 13 minutes, 2.7 to 4 minutes each.
  - Hand-made copies of the tracks: 6 runs, 72 minutes, 8 to 18 minutes each. Hand-made shards: 5 runs, up to 22 minutes, 3 to 5 minutes each.
  - Rung Q's `count-run.sh` passes: 3, up to 50 minutes.
- Foreground: 89 of the 98 `harness-one.sh` runs, each in one Bash call. Background: the other 9, and every suite run (polled with `wait_for` or a `grep` loop).
- The fill, where the output shows it: in a walk run the first test took 14.7 to 29 s (one at 46 s) and the other tests a median 0.4 s. The same test took 14.5 to 27 s longer as the first test of a run than later in another run. That puts the first load and fill at about 30 minutes (24 to 44) of the 50 `harness-one.sh` minutes.
- Where it is silent: the split of those 14 to 27 s between filling the cache and work that every JVM does anyway; the compiled tracks (112 minutes of the total); the shards, except by inference (6 to 16 % of a shard).
- One premise did not hold: `junit.sh` does not start with an empty cache (section 5).
- One measurement would give the split: the same `harness-one.sh` JVM twice on an idle machine, the second on the cache the first filled (section "The measurement still needed").

## Words used

- **Cold run**: a run whose Fortress cache folder was empty when it started.
- **Fill**: what the first test of a cold run does that a later test does not. In walk it parses the library and writes the cache, and builds the library's environment. In the compiled path it analyses and compiles the library components the test imports.
- **Foreground**: the Bash call that started the run also waited for its end. **Background**: the run was started detached (`run_bg`, `nohup`, `run_in_background`) and the agent went on or polled.
- **Harness, walk, compiled path, gate, rung worker, skeptic, repair round, gather**: as in `testing-practices.md`.
- **Track**: one of `ant testFast`'s four JVMs (compiler, library, othercompiler, misc). **Shard**: one of `ant testSystem`'s four JVMs.

## What the harness prints

Read in the code, `FileTests.java` and the two scripts.

- `Time: N` is JUnit's text runner total for one JVM, in seconds. It starts after the JVM is up and the test list is built.
- After a passing test the harness prints ` OK (time = Nms)` (`FileTests.java:420-421`), measured from the start of that test (`:319`). A failing test, an `XXX` test and a refused test print no time. So the first test's time is visible only if it passes.
- The order is shuffled by a seed that the run prints (`:1256`), so the first test is not the first file named. The property `fortress.unittests.seed` fixes it (`:1244`); the run prints it as `FORTRESS_UNITTESTS_SEED`.
- `harness-one.sh` prints a header with the UTC start, the load and the tree (`:13`), the tests, and `exit=`.
- `junit.sh` prints a header with the start, the machine and the load at start, then the same test lines for each `.test`.
- Foreground `harness-one.sh` calls with a printed `Time:` lasted 0.3 to 2.1 s longer than it. That is the JVM start.

## How it was counted

- A script walked every tool call of the 64 transcripts (about 6.5K Bash calls) and kept the start time of the call and the time of its result.
- A `harness-one.sh` run is a call that executed the script with a scratch directory, whose JVM reached a test. A call that ended within 5 s (they took 0.6 to 1 s) is a failed start and is not counted as a run.
- A foreground run's wall is its call's duration, less any build in the same call (four calls held an `ant compileAll`; their runs are the call less the build).
- A background run's wall is its printed `Time:` plus 1.5 s, or, where no time was printed, the poll that saw its end. The poll-based walls are upper bounds.
- Suite runs are timed from the start in the log's header or the launching call to the poll that saw them finish, and, where printed, `Time:` or ant's `Total time:`.
- Each run is counted once by its launching call. Skeptics and second skeptics re-read earlier logs; those reads are not runs.

## 1. `harness-one.sh` (cold by construction)

The script empties and recreates its scratch directory and writes an empty `caches/global.map` (`harness-one.sh:9-10`), and deletes the directory at its end (`:18`). Every call starts cold.

- Batch 8: 25 runs (19 foreground, 6 background), about 14 minutes, foreground median 21 s.
- Batch 9: 53 runs (52 foreground, 1 background), about 25 minutes, median 22 s.
- Batch 10: 20 runs (18 foreground, 2 background), about 12 minutes, median 23 s.
- All: 98 runs, 89 foreground and 9 background, about 50 minutes. Foreground: median 22 s, mean 29 s, longest 136 s. 77 of the 89 ran under 40 s, 11 ran 40 to 100 s, 1 ran longer.
- The background runs are small: 7 of the 9 were looked at within a minute of the launch. Their walls are 23 to 153 s, from `Time:` or the poll.
- By role: rung workers 67 runs (40 minutes), repair rounds 11 (4), skeptics 5 (1), second skeptics 4 (1), gather 11 (3). One rung worker, K of batch 9, ran it 17 times.
- 10 calls failed to start (about 1 s each): rung Q and rung M of batch 8; R, K, W, S and the repair round of W in batch 9; G and W in batch 10 (all with a relative scratch directory); and N in batch 10 (a list file that did not exist, so 0 tests ran).
- 2 launches were refused by the automatic permission check and never ran (rung N in batch 10, call 178; the repair round of G, call 12).

## 2. The gate's `ant testFast` and `ant testSystem` (cold by construction)

`build.xml` deletes `test.caches` before both targets (`:964`, `:1205`) and gives each track and shard its own folder under it (`:945-946`, `:1186-1187`).

- Batch 8 ran the gate twice (the second after the review): `testFast` 9 min 44 s and 9 min 01 s, `testSystem` 2 min 44 s and 2 min 45 s.
- Batch 9: `testFast` 10 min 35 s, `testSystem` 4 min 03 s.
- Batch 10: `testFast` 11 min 11 s, `testSystem` 3 min 46 s.
- All: 4 runs of `testFast`, 40.5 minutes; 4 of `testSystem`, 13.3 minutes. All were background: `run_bg`, then `wait_for` calls of at most 270 s.
- The times are the log's `Total time:` lines, read from the gate agents' results.

## 3. Hand-made copies of the tracks and shards (cold by construction)

Seven agents wrote them (`testing-practices.md`, practice 2). Each uses a private empty cache folder, as `fastTrack` and `systemShard` do. All were background and polled.

- Tracks (compiler and library JVMs together, so the wall is the compiler track's):
  - Batch 8, rung I: 14.4 minutes (compiler `Time:` 858 s), load 8.6 to 11.
  - Batch 8, rung O: 8.3 minutes (492 s). Its repair round: 8.8 minutes.
  - Batch 10, rung C: three runs, up to 18.0 minutes (load 10 to 13), up to 13.8 (load 13), and 8.5 (the repair round, load 1; compiler 512 s, library 312 s).
  - Total: 6 runs, 72 minutes.
- Shards:
  - Batch 9, rung K: 2 shards, 3.3 to 5.4 minutes, load 11 to 13.
  - Batch 9, resumed rung W: two 4-shard runs, 3.4 minutes (shard times 166 to 199 s, load 1.7) and 4.4 minutes (210 to 261 s, load 3.2).
  - Batch 10, rung W: two 4-shard runs, 4.1 to 4.8 and 3.1 to 3.9 minutes.
  - Total: 5 runs, 18 to 22 minutes. One more 2-shard run of the first rung W in batch 9 was killed with the VM restart and has no result.

## 4. `count-run.sh` passes (cold once for each shard)

Rung Q of batch 8 ran the whole interpreter corpus three times: 20.0, 15.3 and 15.0 minutes at most, by the call that compared each pass (`testing-practices.md` gives 15 to 20 minutes and 469 tests). Each shard of 4 has its own cache folder, shared by its tests (`count-run.sh`, header), so only the first test of a shard fills. That is 12 fills in 50 minutes, about 4 core-minutes of about 200: 2 % of the pass.

## 5. `junit.sh` does not start empty

The brief put it with the cold runs. The code says otherwise.

- `junit.sh` sets no cache folder. It sources `env.sh`, which sets none, so `fortress junit` uses the tree's `default_repository/caches`.
- Its `clean` removes only the cache entries named by the `.test` files it runs, before and after (`junit.sh:15-16`, `:29`).
- `Shell.junit` does not reset the repository (`Shell.java:1070-1090`). The reset belongs to `CompilerJUTest` and `LibraryJUTest` (`:32-33`), and `fastTrack` turns it off.
- The results agree. The first test of a `junit.sh` JVM took 1.5 to 4.4 s (compile or link), and one `.test` per JVM took `Time:` 0.4 to 7.5 s. The one outlier is a first link of 14.7 s in rung I's 22-test list (batch 8, call 187); its cause is not shown.
- Counts: 60 calls (batch 8: 38, batch 9: 4, batch 10: 18), 43 + 4 + 21 invocations. 50 of the calls waited for the run in the same call, 15 minutes in all; 10 only launched it. The tree's library cache is built by the library order before a worker runs tests, so this is warm work.

## The cache-filling share

### Walk (`harness-one.sh`): what the output shows

- The floor. 52 runs printed a `Time:`. Their median is 20 s, the range 14.7 to 32.9 s. 23 of them ran one test. Those took 14.7 to 29.2 s, median 18.0 s. The three quickest, 14.7 to 15.4 s, were a test that failed at once and two `XXX` tests of one program.
- The first test against the rest. In 15 runs the first test passed and printed a time. It took 14.7 to 29.2 s, median 20.2 s. The other passing tests of those runs took a median of 0.4 s each (per run, 0.16 to 1.16 s). The first test was 73 to 100 % of the run's `Time:`, median 93 %.
- The same test, first and not first. Six tests were the first test of one run and a later test of another:
  - `IntegerMaxNumMinNum`: 14.7 s first, 0.2 to 0.6 s later.
  - `IntegerOrderNumerals`: 16.6 s first, 0.5 to 1.5 s later.
  - `GenericTraitGenericFunctionalMethodWalk`: 18.5 and 25.0 s first, 0.15 and 0.37 s later.
  - `FunctionalMethodMeetProvided`: 20.2 s first, 0.34 to 0.41 s later.
  - `StringPieces`: 29.2 s first, 2.0 s later.
  - `ReflectiveNumberTypes`: 21.1, 22.0 and 46.3 s first, 4.5 and 4.7 s later.
  - The first-minus-later difference is 14.5 to 27.2 s, median 18.6 s.
- The load. The 46.3 s first test ran at load 6.6 (batch 8, rung Q, call 290). The others ran at load 0.6 to 12, and load did not order them cleanly (the 15 runs' loads are in the scratch tables). Treat the spread as noise from the other agents.
- What it comes to. A cold `harness-one.sh` run pays 14.5 to 27 s that a later test in the same JVM does not. For 98 runs that is 24 to 44 minutes, 30 at the median, of the 50. For the 77 foreground runs under 40 s it is most of the run (about 70 to 90 %). For a run of 100 s or more it is 15 to 25 %.

### What this does not separate

- The 14.5 to 27 s is an upper bound on the cache fill. It holds three things: parsing and writing the library cache, building the library's environment in the interpreter (every JVM does that, with a warm cache too), and a cold JVM (class loading, no JIT). The printed times cannot tell them apart. No transcript has the same test as the first test of a run on a filled cache.
- So 30 minutes (24 to 44) is the most a kept cache could save in these three batches, if the figures hold. The true saving is smaller by the part that is not the cache, and the amount is not shown here.

### The shards

- No transcript prints a shard's first test. The inference is the walk figure: 4 JVMs each pay 14.5 to 27 s of a shard that takes 166 to 261 s, which is 6 to 16 %. For the 4 gate runs and 5 hand-made runs (35 minutes of wall) that is 2 to 6 minutes.

### The compiled tracks (`testFast`, hand-made tracks)

- The transcripts are silent. The logs the agents read show a handful of first tests: a compile of 4.5 s (rung I, load 8.6 to 11) and a compile of 46.0 s (rung C, load 10 to 12, the first run). A cold compile can also hide in the "expected failure" tests, which print no time.
- A cold track has to rebuild the library jars it links against. The only duration the transcripts give for the library order is `ant compileAll` (24 to 57 s in the four gates, with 1 to 2.5 minutes under load, `testing-practices.md` practice 3). If the track's fill were that big it would be 5 to 11 % of an 8.5-minute track at load 1. This is a bound by analogy and not a measurement.
- 112 of the 248 minutes are tracks (72 hand-made, 40.5 gate). That is the part the transcripts cannot split.

## The measurement still needed

One cold run and one warm run of the same JVM command, on an idle machine, after the four-thread suite run has ended.

- Command: the `java` line of `harness-one.sh` (`:14-16`), run twice in one shell with the same `caches` folder, with no `rm` between them. Pass `-Dfortress.unittests.seed=` with the value the first pass prints, so that the same test is first in both.
- Files: `ProjectFortress/tests/IntegerMaxNumMinNum.fss` and `ProjectFortress/tests/IntegerOrderNumerals.fss`. Both have a known cold first time (14.7 and 16.6 s) and warm later times (0.2 to 1.5 s) in the transcripts to check against.
- Measure: `date +%s.%N` around each JVM, the `Time:` line, and the first `OK (time = ...)` line. Repeat three times, each from an empty folder, with `uptime` under 0.5 before each.
- Reading: the first test's time, cold minus warm, is the cache fill. The warm run's first test minus its later tests is what a warm cache does not remove. About 1.5 minutes for the three repeats.
- If the compiled tracks are to change too: `LibraryJUTest` (86 tests, 312 s at load 1 in rung C's repair round) twice with one private caches folder and `-Dfortress.junit.reset=false` (`fastTrack`'s setting), and compare the two `Time:` lines. About 11 minutes.

## A correction to `testing-practices.md`

- Practice 5 says six agents lost one call to a relative scratch directory and that batch 8's briefs "had no such failure". Batch 8 had two: rung Q (call 84, `tmp/rung-numeral-library/h1`) and rung M (call 120, `tmp/rung-library-meets/h-base`), each `exit=1` after 0.7 to 0.9 s. Batch 9's repair round of W (call 35) also lost one. The cost is about 1 s each.

## Limits

- Wall times are noisy. The load at a run's start was 0.1 to 20 on 4 cores, with other agents building and running. Batch 8's `junit.sh` headers show a 2.1 GHz machine and batch 10's a 2.8 GHz one.
- Sums of walls overlap in time. They say how long the runs took, not how long the batches did.
- Runs are found by command text and by the result headers. A run launched in a form I did not match would be missed; I checked the unmatched calls that held the script's name. One background run (batch 8, skeptic M, call 71) has no end in any result and is counted with no time.
- Background walls are upper bounds from the poll that saw them finish. The gate's suite times and `Time:` lines are exact.
- The fill figure is the first-minus-later difference of a few tests. It rests on 15 runs with a printed first time and 6 tests seen both ways.
- I did not read the agents' reasoning. The transcripts do not store it.

## Questions for the curator (decisions not taken)

1. Whether to take the measurement before any change that keeps the cache between `harness-one.sh` calls. Default: yes, once the machine is idle. The note shows at most 30 minutes in three batches, and the split is open.
2. Whether a kept walk cache may be shown stale-safe after a library edit before it is used. This note does not show that either way. Default: the measurement above, then a second small test (edit one library file, run twice) before a change.
3. Whether to measure the compiled track pair as well. Default: no, unless the tracks (72 minutes hand-made, 40 in the gate) are to change.

## Files

- Transcripts: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/{wf_603242ca-111,wf_f747fd3e-9e4,wf_d5ec6194-bcc}/`.
- Code and scripts read: `explorations/compile-ladder/rung-inference-walk/harness-one.sh`, `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`, `explorations/experiment/env.sh`, `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:319, 420-421, 1233-1257`, `SystemJUTest.java`, `CompilerJUTest.java:30-34`, `ProjectFortress/src/com/sun/fortress/Shell.java:115-122, 1070-1090`, `build.xml:920-966, 1171-1212`, `explorations/coordinator/tools/count-run/count-run.sh`.
- Cited: `explorations/coordinator/process-engineering/testing-practices.md` (practices 2, 3, 5).
- Extraction scripts and tables: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/hc/` (scratch, not committed).
