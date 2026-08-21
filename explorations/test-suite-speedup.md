# Test-suite speedup: investigation and proposal (2026-08-21)

Status: **intervention 1 implemented and gated green** (see "Results"
at the end); interventions 2–4 remain proposals. Baseline: `ant testFast`
≈ 11 min, `ant testSystem` ≈ 2 min, on 4 CPUs.

## Where the time goes

testFast's ~11 min is 97% three serial JUnit suites: CompilerJUTest
(642 tests, 256 s), LibraryJUTest (55 tests, 201 s), OtherCompilerJUTest
(263 tests, 164 s). Per-command aggregate across the whole run: **link
376 s** (221 links), compile 118 s, subprocess `run` 92 s (223 child JVM
launches, but only ~200 ms fixed overhead each — the work is real),
typecheck 8 s. Ant's default `forkmode=perTest` forks one JVM per suite
class; that overhead is negligible (~5% of wall).

**The single biggest cost is the duplicated cold-cache library rebuild.**
`CompilerJUTest` and `LibraryJUTest` each call `Shell.resetRepository()`
in `suite()` (CompilerJUTest.java:31, LibraryJUTest.java:31), wiping the
shared cache; each then pays a cold first link — 99.4 s and 120.3 s
respectively — versus a ≤ 19.7 s warm-cache worst case in
OtherCompilerJUTest (which doesn't reset). The two cold rebuilds are
~220 s of the 620 s the big suites consume. The reset's documented
rationale (repo-internals.md: fresh-cache compile-order trap) protects
against a *stale* cache, not a *warm* one — and GraphRepository's
timestamp-based staleness checking (GraphRepository.java:483–659)
validates a retained cache anyway.

testSystem: 382 in-process interpreter tests, flat distribution (mean
350 ms, max 12.7 s), no cache wipe, no subprocesses.

## Ranked interventions

1. **Skip the second cache wipe** (~120 s saved, low risk). Gate the
   `resetRepository()` calls on a property (e.g. `fortress.junit.reset`,
   default true) so testFast wipes once up front and LibraryJUTest
   inherits CompilerJUTest's warm cache; or simply drop LibraryJUTest's
   reset. Validate: two back-to-back testFast runs, diff pass/fail sets.
2. **Run the three big suites concurrently** (up to ~2× on the 620 s
   block, medium risk). Ant 1.10's `<junit threads="3">` works with the
   current effective forkmode — but is UNSAFE without cache isolation
   (mid-run wipes + no locking anywhere in the cache layer;
   Linker.java:97–104 writes jars with no temp+rename). Isolation route:
   per-suite FORTRESS_HOME trees with hardlink-copied caches (cache is
   only 53 MB, `cp -al` is instant).
3. **Shard testSystem** (~120 s → ~40–60 s, low risk). SystemJUTest takes
   `-Dtests=<dir>` (SystemJUTest.java:33) and neither wipes nor spawns —
   plain `-Dfortress.caches=<shard>` isolation suffices. Set
   `FORTRESS_THREADS=1` per shard (the interpreter already runs its own
   ForkJoin pool at availableProcessors/2; Driver.java:518–530).
4. **Enabling fixes** (each small, independently correct):
   - `bin/run_classpath:25` (and `bin/runOpt:32`,
     `BytecodeOptimizeEverything.sh:17`) hardcode
     `default_repository/caches/...` — child `run` JVMs ignore any cache
     redirection. Honor `FORTRESS_CACHES`.
   - `Shell.resetRepository()` (Shell.java:119) wipes
     `REPOSITORY + "/caches"` instead of `ProjectProperties.CACHES` — a
     latent bug: a redirected suite still destroys the shared cache, and
     the wipe also deletes the git-tracked `caches/global.map`.

## Dead ends (measured/verified, don't revisit)

- **In-JVM threading of tests**: blocked by FileTests' global
  System.out/err swap (pass/fail is decided by scanning the captured
  stream, FileTests.java:301–306), Shell's process-wide mode flags,
  static-final cache singletons (ProjectProperties.java:283–297), and
  Driver's static interpreter state.
- **Eliminating the 223 `bin/fortress run` subprocesses**: forbidden by
  design — InstantiatingClassloader throws "Second classloader
  detected!!" on a second instance per JVM — and the ceiling is only
  ~45 s anyway.
- **`forkmode="once"`**: a pessimization (fork overhead is negligible;
  suite JVM sharing would leak mode-flag statics).

Helpful knobs that already exist: `fortress.unittests.seed` (reproducible
shuffle), `fortress.unittests.count` (stop after N — quick smoke runs),
`-Dtests=<dir>` on SystemJUTest, `fortress.junit.verbose`. Tests are
order-independent by design (reshuffled every run); no junit timeouts
anywhere, so parallel load can't cause spurious timeout failures.

## Suggested sequencing

(1) alone is a one-property change worth ~2 min of every gate. (4)'s two
fixes are prerequisites for (2)/(3) and are correct on their own. Combined
ceiling on 4 CPUs: gate ≈ 13 min → ≈ 5–6 min. All of this also folds into
the clean-ladder rebuild (the enabling fixes belong in the base block).

## Results: intervention 1 (implemented 2026-08-21)

Shape: `CompilerJUTest`/`LibraryJUTest` gate their `suite()` reset on
`fortress.junit.reset` (default true — standalone runs unchanged);
`testFast` in build.xml does one up-front file-only wipe of
`default_repository/caches` (same semantics as `Shell.resetRepository`:
files deleted, directories kept) and passes
`-Dfortress.junit.reset=false` to the forked suites.

Validation, JDK 25, 4 CPUs: two back-to-back `ant testFast` runs plus
`ant testSystem`, all fully green (47 suites, 1,377 tests, 0 failures ×2;
382/0/0). LibraryJUTest's link phase inherits CompilerJUTest's warm
cache: 201 s → 88 s. Wall clock: testFast 11 min → **8 min 53 s** (both
runs within 1 s of each other, so warm-vs-cold start of the whole target
does not matter — the up-front wipe restores identical conditions).
`git status` after a run is clean: the suites rewrite
`caches/global.map` byte-identically, as before.

## Results: interventions 2–4 (implemented 2026-08-21)

Shape:

- **Enabling fixes (4)**: every place that hardcoded
  `default_repository/caches` on the classpath or in reset logic now
  honors the redirection: `bin/fortress_classpath`, `bin/run_classpath`,
  `bin/runOpt`, `bin/BytecodeOptimizeEverything.sh` derive
  `CACHES="${FORTRESS_CACHES:-$FORTRESS_HOME/default_repository/caches}"`;
  `Shell.resetRepository` wipes `ProjectProperties.CACHES` instead of the
  hardwired repository path. In-JVM cache paths already followed
  `fortress.caches`/`FORTRESS_CACHES` via ProjectProperties (which
  auto-creates the subdirectories on class init), so no other Java
  changes were needed. Still hardcoded, deliberately out of scope
  (unused by the suite): `fortress.bat`, `bin/debugOpt`,
  `bin/runOptCollect`, `bin/BytecodeOptimizeCompilerTests`, the nine
  `bin/comp/*` scripts, and `Inlining.java:308/310`.
- **Parallel testFast (2)**: a `fastTrack` macrodef forks each junit
  track with its own private cache tree
  (`ProjectFortress/test-caches/fast-<id>`, gitignored) via the
  `fortress.caches` sysproperty + `FORTRESS_CACHES` env (the env var is
  inherited by the `bin/fortress` child processes ShellTest/TestTest
  spawn). Four tracks run under `<parallel>`: the three big suites
  (CompilerJUTest, LibraryJUTest, OtherCompilerJUTest) plus one track
  with every remaining small suite. Per-track junit-report dirs avoid
  formatter collisions; `errorProperty`/`failureProperty` converge on one
  `<fail>` after the barrier (ant properties are write-once and
  project-global, so parallel sets are race-free).
- **Sharded testSystem (3)**: `FileTests.interpreterSuite` gained an
  optional `-Dfortress.suite.shard=i/n` filter (sort names, keep
  `index % n == i`; inactive by default). testSystem runs four shards
  under `<parallel>`, each with a private cache tree and
  `FORTRESS_THREADS=1` so four interpreter runtimes don't fight over
  cores.

Validation, JDK 25, 4 CPUs, fresh `ant compileAll`: both targets fully
green — testFast 0 failures across all four tracks, testSystem
382/0/0 (shards 95+95+97+95).

Measured wall clock:

- **testFast: 8 min 53 s → 5 min 23 s** (user time 17 min 39 s — ~3.3×
  CPU utilization). Track times: compiler 642 tests / 300 s, library
  55 / 243 s (cold again — the warm-cache handoff from intervention 1 is
  gone since tracks are isolated, yet the overlap more than pays for
  it), othercompiler 263 / 321 s (longest track — sets the wall), misc
  ~45 suites / ~40 s. Ceiling: further gains need splitting
  OtherCompilerJUTest itself.
- **testSystem: 2 min 8 s — wall-neutral** vs the ~2 min single run.
  Honest result: the interpreter's work-stealing runtime already
  saturated 4 CPUs in the single-JVM run (~404 s user either way);
  sharding just trades runtime-level for process-level parallelism.
  Kept anyway for the isolation win below.

Combined gate: ~13 min (pre-intervention-1) → **~7.5 min**.

Isolation win, independent of speed: neither target touches
`default_repository/caches` at all any more — the old testFast pre-wipe
of `cache0` is gone, both targets build in `ProjectFortress/test-caches`
(deleted at target start) — so test runs can no longer dirty the tracked
`caches/global.map` or invalidate a developer's warm interpreter cache.
(`ant compileAll` still wipes `cache0` via the pre-existing `cleanCache`
over-wipe; known separate issue.) The two targets share the same
`test-caches` root, so they must run sequentially, as before.
