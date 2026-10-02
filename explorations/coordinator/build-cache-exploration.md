<!-- What a built worktree can share with a new one, how Fortress notices edits, the script that seeds a worktree, and which builds and runs of climb batch 8 repeated work on a code state already built; measured 2026-10-02 for the coordinator, before climb batch 9. -->

# Sharing one build between worktrees

Machine for every timing below: nproc 4, Intel Xeon @ 2.10 GHz (2100 MHz), JDK 25.0.4, `FORTRESS_THREADS=1`. The baseline build ran at load 2.5 rising to 4.8 (the batch 8 microGPT walk runs were still going until 20:41 UTC); everything after it at load 0.4 to 2.4. Worktrees: `fortress-seedbase` (built from main `7266ed23c`), and copies seeded from it.

## 1. A built tree can be copied to another path, with nothing rebuilt

The base: `ant compileAll` 82 s, then the library order 112 s (AnyType 17, CompilerBuiltin 63, CompilerLibrary 27, CompilerAlgebra 2, CompilerSystem 2), 194 s in all.

What holds the tree's path, and what the copy does with it:

- `ProjectFortress/build` holds no path but `scalac-compileAll.args`, which every `ant compileAll` rewrites. Copied as is.
- The three AST caches, `analyzed_cache/` (with `depends/`), `interpreter_cache/` and `interpreter_parsed_cache/`, name each file `<Api>-<hex of the source's canonical path hash>` (`compiler/NamingCzar.java:244-245`; the path is `getCanonicalPath()`, `repository/graph/GraphNode.java:33`), and carry the path in every span (`@"/home/user/…/AnyType.fsi":12:1~16:2`) and in generated names (`*underscore_/home/user/…/NativeArray.fss:29:30`). The copy renames each file to the hash of the new path and replaces `<base>/` by `<new>/` in its text. The foreign-Java entry `com.sun.fortress.nativeHelpers-d13bcf6.tfi` hashes the string `ForeignJava` (`GraphRepository.java:228`) and keeps its name.
- The bytecode-cache jars carry the path only in their classes' `SourceFile` attributes: all 397 path constants of the five library jars are that attribute, and no `.xlation` entry holds a path. Jars copied unchanged run (EqualityRung1 `PASS`, Compiled10 `pass`, `junit.sh` `OK (2 tests)`); the copy rewrites the attribute anyway (0.2 s), so stack traces name the worktree's own files.
- `nativewrapper_cache/` and `global.map` hold no path. `logs/` holds only empty directories spelling the base's path, and is not copied.
- Dates: a cached entry is used only when its file is not older than its source (`GraphRepository.java:243-244`, `:282-283`; the date is the `.tfi`/`.tfs` file's own, `CacheBasedRepository.java:160-162`), and checkout stamps every source with the checkout time. The copy stamps every copied file with one time taken after the checkout, to the nanosecond: a stamp truncated to the second fell 0.85 s before the checkout's last write in the first trial, which would have made the whole cache stale.

Measured on a copy seeded from the base (the probe script ran the same commands in both trees):

- Seeding took 2 to 3 s: `git worktree add` 0.7 to 2.1 s, the build copy 0.1 to 0.7 s, the caches 0.1 s, the translation 0.2 to 0.3 s, the stamps 0.1 to 0.4 s. A seeded worktree is 206 MB (build 40 MB, caches 36 MB).
- The library order on the copy took 0.8, 2.8, 1.3, 0.7 and 1.0 s and rewrote no cache file but the foreign-Java `.tfi` and the 20 `nativewrapper_cache` classes, which every compile rewrites in the base as well.
- Same results as the base: `fortress compile` and `fortress run` of Compiled10, Compiled9.AsString and EqualityRung1 (`pass`, `O`, `PASS`); `junit.sh` on Compiled10.test, AsString.test and EqualityRung1.test; `harness-one.sh` on BooleanOps, IntegerOrderNumerals and chain2 (`OK (3 tests)`). Outputs identical once timings and the shuffle seed are removed.
- Walk: the copy took the base's walk caches too. `explorations/claude_demo.fss` ran in 4.0 s on the copy against 15.2 s for the first run in the base. On main `7266ed23c` it fails the same way in both trees, `Unification error: Closure/Constructor for join param 1 (a:BOTTOM) got arg 98: ZZ32` at `Library/RangeInternals.fss:998`, so CLAUDE.md's walk smoke test is red today.
- Nothing in the copy reads the base or the main tree. Under `strace -f -e trace=%file`, a library compile, a program compile, a run, a walk run and a `junit.sh` run made 0 accesses to the base's path. The only main-tree paths were `/home/user/fortress/.git/…` (the copy's own git metadata, which every worktree reads), and only in the `junit.sh` run, which calls git.

The fallback the brief asked for, building every worktree in parallel at the start, was not needed and was not measured.

## 2. How Fortress notices edits

Each case was run on a seeded copy, with a snapshot of the cache before and after.

Compiler path, a library component:

- Compiling a program never rebuilds a library component. An edit to the body in `CompilerLibrary.fss` (`"v1"` to `"v2"`) followed by `fortress compile` and `fortress run` of the program printed `v1`, and no cache file changed. An api edit (a new function added to `CompilerLibrary.fsi` and `.fss`) followed by the program's compile re-analysed `CompilerLibrary.tfi` but not its component, and the run died with `NoSuchMethodError: 'fortress.CompilerBuiltin$String fortress.CompilerLibrary.seedProbe()'`.
- `fortress compile ../Library/CompilerLibrary.fss` alone (24 to 25 s) rewrote its `.tfs`, its `depends/` entry and its jar. The program then printed the new value without being recompiled.
- After an edit to a `.fss` alone, nothing else is stale. After an api edit, everything that depends on that api goes stale (`GraphRepository.java:614`, by date, through every dependence). Every api and every component also depends on the root apis: CompilerLibrary, CompilerBuiltin, CompilerAlgebra and AnyType in compiler mode (`GraphRepository.java:125-128`, `:260-261`, `:320-321`; `compiler/WellKnownNames.java:114-126`). So an edit to one of those four `.fsi` files makes the whole library stale. Measured: a branch whose `CompilerLibrary.fsi` differed from the base rebuilt all five (6.6, 56.6, 23.7, 1.6 and 1.5 s, 90 s). After the api edit of the experiment above, CompilerAlgebra and CompilerSystem each rebuilt in 1.7 s on their next compile.
- A failed library compile writes nothing. A type error put in `CompilerLibrary.fss` failed in 8.5 s and changed no cache file. A program compiled and run after it got the old jar and printed `v2` without any warning. Once the error was fixed, compiling the component rebuilt it (24 s), and the program printed `v3`.
- A killed library compile: killed at 14 s and at 19 s it wrote nothing; killed at 22 s it had written the jar but not the `.tfs`. Either way the next compile of the component rebuilt it in full (24 s), because its `.tfs` was older than the source.

Walk: an edit to the body in `Library/FortressLibrary.fss` (assert's message) showed on the next walk run, with no wipe. That run took 13.7 s and re-analysed FortressLibrary only (its `interpreter_cache` and `interpreter_parsed_cache` entries); the next took 3.7 s. Reverting it re-analysed FortressLibrary again (12.1 s). An api edit under walk was not tried. Its roots are FortressLibrary, FortressBuiltin and AnyType (`WellKnownNames.java:129-140`), so an edit to one of their `.fsi` files should make every walk entry stale. The rule in `repo-internals.md` to wipe after any library edit no longer holds for walk, at least for an edit to a body.

Java or Scala:

- `ant compileAll` deletes `default_repository/caches` whole before compiling: `compileAll` depends on `compileCommon`, which depends on `cleanCache` (`build.xml:539`, `:715`, `:356-360`). Its `depend` task with `closure="yes"` (`build.xml:717-720`) recompiles everything that depends on a changed class.
- On the seeded tree, one comment added to `interpreter/glue/prim/IntLiteral.java` cost 38.7 s, with javac recompiling 1,077 of 1,807 files and scalac all of its sources, against 82 s cold. With nothing changed it took 33 s.
- Right after it, a compiled program died with `NoSuchMethodError: … fortress.CompilerBuiltin.coerce_ZZ32(fortress.CompilerBuiltin$IntLiteral)`, which is the bootstrap stub of the FACTS entry. The library order (15.6, 57.7, 23.7, 1.7 and 1.6 s, 100 s) cured it.
- A syntax error failed at scalac in 6.6 s (`build.xml:558`), and the caches were already gone. After the fix, `ant compileAll` took 25.8 s, with javac compiling 1 file.

Which runs read `default_repository/caches`:

- Only `fortress compile`, `fortress run`, `junit.sh` (`fortress junit`) and a direct walk run read it.
- `harness-one.sh`, `checker-count/run.sh`, `distance/run.sh`, `count-run.sh`, `mg-run.sh`, `ant testFast` and `ant testSystem` each run with a private cache (`-Dfortress.caches` or `FORTRESS_CACHES`), so they need neither the library order nor a warm cache.
- `harness-one.sh` starts its walk from an empty cache each time. About 11 s of its 15 to 16 s for three small tests is analysing the library.

### The rules for a worker

After an edit:

- Edited `X.fss` of a library component, and not its `.fsi`: `fortress compile X.fss`, that component alone (CompilerBuiltin about 60 s, CompilerLibrary about 25 s, the others 2 to 16 s). Programs need no recompile.
- Edited the `.fsi` of AnyType, CompilerBuiltin, CompilerLibrary or CompilerAlgebra: all five in library order, about 100 s. Edited `CompilerSystem.fsi`: CompilerSystem alone.
- Compiling your own program never rebuilds the library. If you skip the step above, a body edit runs the old code with no warning, and an api edit dies with `NoSuchMethodError`.
- Walk needs nothing: it re-analyses an edited library source on its next run.
- Edited Java or Scala: run `ant compileAll` (25 to 40 s on a built tree), then `git checkout -- default_repository/caches/global.map`. Run the library order (about 100 s) only before a compiled run (`fortress compile`, `fortress run`, `junit.sh`). Harness-one, the checker count, the distance stage and the suites use their own caches and need neither.
- Do not wipe the cache for any of these.

After a failed build:

- `ant compileAll` failed: fix the error and run it again. The cache is already gone, because cleanCache runs first; there is nothing else to clear. Then restore `global.map`, and run the library order before any compiled run.
- `fortress compile` of a library component failed or was killed: it wrote nothing, or only its jar. Fix the error and compile that component again before any compiled run, because until then programs link its old jar without any warning. Delete nothing.
- A `NoSuchMethodError` from a compiled run means a component was not recompiled after an edit or after `ant compileAll`. Recompile the edited component, or run the library order. Do not wipe.

## 3. The script

`explorations/coordinator/tools/seed-worktree.sh <base-worktree> <new-worktree> <branch> [<start-point>]`; its header gives the usage. It makes the worktree with the same `git worktree add` fallbacks as the shared prefix (`climb-batch-workflow.js:854`), or a detached one at the base when `<branch>` is `-`. It copies and translates as in section 1. It stamps library sources that differ from the base's commit, committed or not, later than the cache, and lists them, so that their next `fortress compile` rebuilds them. It warns when `ProjectFortress/src` differs from the base, since the copied build is then the base's.

It refuses an unbuilt or dirty base (exit 2, nothing made). It leaves alone a worktree that already has a build, so a relaunch keeps the worker's own build; `SEED_FORCE=1` replaces it. It reads the base and writes only the new worktree.

Shown working on a fresh worktree:

- A new branch `wip/seed-demo` cut from a local branch whose head adds a function to CompilerLibrary was seeded in 3 s. The script listed `Library/CompilerLibrary.fsi` and `.fss` as newer than the cache.
- The library order then rebuilt all five (90 s, section 2). A program calling the new function compiled and printed `v1`.
- `harness-one.sh` on two tests gave `OK (2 tests)` and `junit.sh` on Compiled10.test gave `OK (3 tests)`, and `git status` was clean.
- A detached copy of the base was seeded in 3 s. The run against an existing worktree left it alone. An unbuilt base was refused with exit 2.

## 4. What climb batch 8 ran twice on the same code

The source is the transcripts of `wf_603242ca-111`, read by script. Wall is the time from an action's launch to the poll that saw it finish. Tokens are the cache-creation and input tokens of the messages that took in the action's launch, polls and reads, deduplicated by message id, with each message shared among the results it took in.

| Role | What was repeated | Same state as | Wall | Tokens | What removes it |
|---|---|---|---|---|---|
| rung I, Q, O, M | `ant compileAll` and the library order on the base `493b4076f`, four times | each other | 216, 425, 269, 392 s | 3K, 16K, 9K, 8K | one base build before the launch, then `seed-worktree.sh` per rung (3 s) |
| rung I | the rebuild after reverting a scratch instrumentation of `Functionals.scala` | its own 13:17 build | 161 s | 2K | instrument in a throwaway seeded worktree |
| rung M | the checker count, cut off by `timeout` at 113 s (rc 124) and run again on the same commit | itself | 113 s | 1K | stages through `run_bg` and `wait_for` only |
| skeptic I | base rebuild, then head rebuild | rung I's first and last builds | 172 + 138 s | 3K + 12K | no skeptic build (decided); old side in a seeded copy of the base |
| skeptic O | base, head, base again, head again | rung O's builds | 191 + 161 + 198 + 251 s | 7K + 2K + 3K + 8K | the same |
| skeptic Q | base `compileAll`; head `compileAll` and library | rung Q's | 32 + 208 s | 5K + 5K | the same |
| skeptic M | checker count and distance (beside it) | rung M's runs at 15:27 and 15:29 | 853 s | 7K | the skeptic reads the worker's stage results, as it already does for the suites |
| skeptic2 O | base and head in one script | the first skeptic's | 320 s | 5K | no skeptic build |
| skeptic2 Q | base `compileAll`, head `compileAll`, library twice (the first launch compiled nothing) | the first skeptic's | 59 + 41 + 209 s | 2K + 1K + 3K | no skeptic build |
| repair O | base rebuild; later base and head again | rung O's base; its own 17:18 build | 195 + 311 s | 2K + 4K | old side in a seeded copy of the base |
| gate after the review | the whole gate (compileAll 24 s, library 108 s, testFast 541 s, testSystem 165 s, atomic 63 s, ladder 223 s, checker count 139 s, distance 840 s beside them) | the gate of 19:26: `git diff 0ae526b31 2c697fe52 -- ProjectFortress Library` is empty, since the repair changed `Specification/appendices/changes.tex` and records | 1467 s | 117K (70K of it the agent's brief) | re-gate only when `git diff --quiet <gated commit> HEAD -- ProjectFortress Library build.xml` fails, and carry the summary otherwise; the agent's own last step found the two summaries identical but for times |

Altogether, about 6,400 s (107 min) of agent time and 230K written tokens.

Besides these, every skeptic and the repair O ran its tests on the base again to see them fail, 20 to 30 s each. That run is gone under the decision to read test-first from the worker's transcript.

No long read of a log repeated work, except the review gate's reading of its first run (counted in its row). The large reads were briefs, diffs and record files, each read once by an agent that needed it.

One write that is not a repeat: rung M's poll of its distance run waited 281 s, and the next message wrote 464K tokens. That is the largest single write of the batch, and it happened because the wait crossed the prompt cache's five minutes.

## 5. What the workflow can change

- At the launch: one base worktree from the batch's base. Run `ant compileAll`, restore `global.map`, run the library order and one passing walk test (for example `bin/fortress ProjectFortress/tests/BooleanOps.fss`, which warms the walk caches), about 200 s.
- Each rung worktree: `seed-worktree.sh <base> <worktree> <branch>` in place of the shared prefix's compileAll and library order (`climb-batch-workflow.js:857`, `:868-877`). It costs 3 s and leaves the worktree warm for walk as well.
- A skeptic's or a repair's old-against-new run: `seed-worktree.sh <base> <worktree>-base -`, a private copy, so that two agents never compile into one cache. It replaces every `git checkout <base> -- ProjectFortress/src` and rebuild in the rung's own worktree.
- The prefix's text "cannot be warmed from the main tree" (`:868`) is true of a plain copy and false of a translated one. The worker's rules in section 2 can replace its paragraph on rebuilds (`:1033`).
- The gate after a repair runs again only when the repair changed `ProjectFortress/`, `Library/` or `build.xml`.

## For Pavol

Yes, the build can be shared. One finished build is copied into each new work tree in about 3 seconds, and the copy fixes the places where the folder's location is written into the saved results. Fortress accepts the copy and rebuilds nothing. Programs and tests give the same results as in the original, and the copy never reads the original's files. The 3 to 7 minutes each rung, skeptic and repair spent rebuilding goes away.

Fortress does notice edits, but only when you compile the part you edited: compiling your own program does not rebuild the library under it. If that step is skipped, the run either uses the old code without saying so or crashes with a missing-method error. A wipe is never the fix; recompiling the edited part is.

In batch 8, the four rungs each built the same starting point, and the skeptics and one repair rebuilt states the workers had already built. After the review's repair, which changed only specification text, the whole 25-minute gate ran again with the same result. That is about 107 minutes and 230K tokens of repeated work. One build at the launch, a copy per worktree, and skipping the gate when no code changed remove all of it.
