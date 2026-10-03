<!-- What a built worktree can share with a new one, how Fortress notices edits, the script that seeds a worktree, and which builds and runs of climb batch 8 repeated work on a code state already built; measured 2026-10-02 for the coordinator, before climb batch 9; section 6, 2026-10-03, measures the blinded engineers' improvements (old code run from the base build with a private caches folder, the base's file dates on a seeded worktree, keeping the caches through a rebuild). -->

# Sharing one build between worktrees

Machine for every timing below: nproc 4, Intel Xeon @ 2.10 GHz (2100 MHz), JDK 25.0.4, `FORTRESS_THREADS=1`. The baseline build ran at load 2.5 rising to 4.8 (the batch 8 microGPT walk runs were still going until 20:41 UTC); everything after it at load 0.4 to 2.4. Worktrees: `fortress-seedbase` (built from main `7266ed23c`), and copies seeded from it.

## 1. A built tree can be copied to another path, with nothing rebuilt

The base: `ant compileAll` 82 s, then the library order 112 s (AnyType 17, CompilerBuiltin 63, CompilerLibrary 27, CompilerAlgebra 2, CompilerSystem 2), 194 s in all.

What holds the tree's path, and what the copy does with it:

- `ProjectFortress/build` holds no path but `scalac-compileAll.args`, which every `ant compileAll` rewrites. Copied as is.
- The three AST caches, `analyzed_cache/` (with `depends/`), `interpreter_cache/` and `interpreter_parsed_cache/`, name each file `<Api>-<hex of the source's canonical path hash>` (`compiler/NamingCzar.java:244-245`; the path is `getCanonicalPath()`, `repository/graph/GraphNode.java:33`), and carry the path in every span (`@"/home/user/…/AnyType.fsi":12:1~16:2`) and in generated names (`*underscore_/home/user/…/NativeArray.fss:29:30`). The copy renames each file to the hash of the new path and replaces `<base>/` by `<new>/` in its text. The foreign-Java entry `com.sun.fortress.nativeHelpers-d13bcf6.tfi` hashes the string `ForeignJava` (`GraphRepository.java:228`) and keeps its name.
- The bytecode-cache jars carry the path only in their classes' `SourceFile` attributes: all 397 path constants of the five library jars are that attribute, and no `.xlation` entry holds a path. Jars copied unchanged run (EqualityRung1 `PASS`, Compiled10 `pass`, `junit.sh` `OK (2 tests)`); the copy rewrites the attribute anyway (0.2 s), so stack traces name the worktree's own files.
- `nativewrapper_cache/` and `global.map` hold no path. `logs/` holds only empty directories spelling the base's path, and is not copied.
- Dates: a cached entry is used only when its file is not older than its source (`GraphRepository.java:243-244`, `:282-283`; the date is the `.tfi`/`.tfs` file's own, `CacheBasedRepository.java:160-162`), and checkout stamps every source with the checkout time. The copy stamps every copied file with one time taken after the checkout, to the nanosecond: a stamp truncated to the second fell 0.85 s before the checkout's last write in the first trial, which would have made the whole cache stale. (Since 2026-10-03 the script keeps the base's dates on the copies and gives the tracked files the base's dates instead, section 6.)

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
- A skeptic's or a repair's old-against-new run: `seed-worktree.sh <base> <worktree>-base -`, a private copy, so that two agents never compile into one cache. It replaces every `git checkout <base> -- ProjectFortress/src` and rebuild in the rung's own worktree. (Superseded on 2026-10-03 by section 6: the old code runs from the base build itself with a private caches folder, `tools/old-fortress.sh`, and no copy is made.)
- The prefix's text "cannot be warmed from the main tree" (`:868`) is true of a plain copy and false of a translated one. The worker's rules in section 2 can replace its paragraph on rebuilds (`:1033`).
- The gate after a repair runs again only when the repair changed `ProjectFortress/`, `Library/` or `build.xml`.

## 6. The blinded engineers' improvements, measured (2026-10-03)

Pavol, 2026-10-03, on the two engineers who found cheaper ways from the 09-17 repository (`process-engineering/cache-sharing.md`, sections 2 and 3; the Opus engineer's `mtimesync.py`, `relocate.py` and `provision.sh` in `/home/user/blind-opus/wt-sim/meas/`): "if it's better, then let's use it." Each of the three was measured once. Machine: nproc 4, Intel Xeon @ 2.80 GHz, JDK 25.0.4, `FORTRESS_THREADS=1`, load 8.5 to 11 throughout because climb batch 10 was running, so the times run high against sections 1 to 4. The test base, `/home/user/eng-base`, was seeded from batch 10's base build (`fortress-base10`, `cec70988b`) at main `058fc7272`, which changes nothing under `ProjectFortress`, `Library`, `build.xml` or `bin`. It was seeded with the script as changed below, so it carries the base build's dates. Nothing was compiled, run or written in `fortress-base10`.

### Old code from the base build, with a private caches folder

Both engineers ran the old code as `FORTRESS_HOME=<base build>` with `FORTRESS_CACHES=<a private copy of the base build's default_repository/caches>`. The paths in those caches are the base build's own, so nothing is translated. Every cache directory and the logs sit under `fortress.caches` (`repository/ProjectProperties.java:283-299`), and `bin/fortress_classpath` and `bin/run_classpath` take the bytecode cache from `FORTRESS_CACHES`.

- The private copy took 0.04 s and holds 36 MB. The per-rung seeded copy took 2 to 3 s and 206 MB (section 1).
- Each run started from a scratch directory outside the base, traced with `strace -f -y`: open and openat, creat, the rename, unlink, mkdir and rmdir calls, link, symlink, truncate, utimensat and chmod. The runs were a compile of `EqualityRung1.fss` (5.3 s), its run (1.3 s, `PASS`) and a walk of `BooleanOps.fss` (8.4 s, exit 0).
  - The run and the walk wrote nothing under the base.
  - The compile wrote two files under the base and deleted both within 0.1 s: `Library/Executable.fsi.parserError.log` and `Library/Executable.fsi.syntaxError.log`. The parser and the syntax checker write their error logs beside the file they parse, read them back and remove them (`compiler/Parser.java:349-367`; the parser opens its log at `parser/Fortress.java:70400`). The base build's compiled caches do not hold the api `Executable`, so the compile of any program that exports it parses `Executable.fsi` from source. `*.log` is in `.gitignore`.
  - Every cache file the runs wrote went to the private folder. The compile wrote the `.tfs` and jar of `EqualityRung1` and the `.tfi` of `Executable`, and the walk wrote the two entries of `BooleanOps`. No library component was rebuilt. Under the base, the runs read the build, the library sources and `default_repository/configuration`, and never `default_repository/caches`.
  - The base's checksum before and after was identical except for one line, the date of the directory `Library/`, which the two logs moved. The checksum covered every file's md5 and every file's and directory's size, date and mode, 23,519 lines with `.git` left out.
- Two chains at once, each a compile, a run and a walk with its own private folder and scratch directory, both printed `PASS` and exited 0, in 21.7 s each. Each folder got its own `EqualityRung1.jar`. The checksum was again identical except for the date of `Library/`.
  - The two chains wrote their logs beside `Executable.fsi` 0.43 s apart (77 ms and 150 ms windows), so the windows did not overlap in this run.
  - When the windows do overlap, the two runs share the two names, and that is harmless. The base's library parses without errors, so both logs stay empty. A log the other run has already removed reads as empty: `Parser.java:373-377` reads `File.length()`, which is 0 for a missing file.
  - A run killed inside the window leaves an empty, ignored log. The seed's clean check reads `git status` and does not see it.
- `harness-one.sh` on the old code (`FORTRESS_HOME=<base>`, with its own scratch caches as always) passed in 25.0 s (`OK (1 test)`). It parses the whole library from source, so it created and deleted 58 logs beside 29 library sources and left none. The checksum was identical except for the dates of `Library/` and `ProjectFortress/LibraryBuiltin/`.

So this form is safe, and it replaces the per-rung copy. Nothing it writes under the base build stays, and its one transient write, empty logs under shared names, is harmless when two runs overlap. The difference from section 1 is that a seeded copy reads nothing of the base, while this form reads the base build and writes transient logs beside the base's library sources. The new `tools/old-fortress.sh <base build> <private folder> <fortress arguments>` runs it. On first use it fills the private folder with a copy of the base build's caches. It refuses a folder inside the base build, and it runs the base build's `bin/fortress` with both variables set, overriding the worktree's `FORTRESS_HOME` from `env.sh`. A trial compile, run and walk took 17.1 s without `strace`, and a folder inside the base was refused with exit 2.

### The dates of the tracked files

The script stamped the copied build and caches with one time after the checkout, and it left every tracked file at its checkout date. Git writes files in path order, so `Library/FortressAst.fsi` comes out older than `ProjectFortress/astgen/Fortress.ast`.

Ant compares these dates in three places:
- makeAST runs when `Fortress.ast` or an astgen source is newer than `nodes/AbstractNode.java` or `Library/FortressAst.fs[is]` (`build.xml:450-467`).
- operatorsGen runs when the build's `OperatorStuffGenerator.class` or `Element.class` is newer than `Operators.java` (`:371-384`).
- javac recompiles a source newer than its class.

In a base built by ant, each generated set is newer than its inputs, because the base's own run regenerated them. In `fortress-base10`, `Fortress.ast` is dated 03:24:15, `FortressAst.fsi` 03:24:35, `AbstractNode.java` 03:24:38, and `Operators.java` 03:24:41, after `OperatorStuffGenerator.class` at 03:24:27.

The measurement used two worktrees seeded from `eng-base` at a scratch commit, on no branch, that adds a comment line at the top of `interpreter/glue/prim/FloatLiteral.java`: a branch whose Java differs from the base. In each, a comment line was added at the top of `IntLiteral.java` after seeding, then `ant compileAll` ran. The two runs went one after the other, at load 10:

| | script before | script after |
|---|---|---|
| seed | 2 s | 3 s |
| `ant compileAll` | 142.9 s | 77.0 s |
| makeAST | ran (`Processing …/Fortress.ast`) | `Nodes up to date? true` |
| operatorsGen | ran | `Operators up to date? true` |
| javac | 1,077 files | 2 files |
| `FloatLiteral.class`, the branch's change | the base's, not recompiled | recompiled |
| `IntLiteral.class`, the edit | recompiled | recompiled |

Section 2's 38.7 s edit, in which javac recompiled 1,077 of 1,807 files, was this regeneration and not the edit. The Opus engineer measured 104 s against 74 s at load 5 to 8.

The `FloatLiteral.class` row is a defect of the old script. A branch whose Java differed from the base was seeded with the build dated after its sources, so `ant compileAll` never recompiled the differing `.java` files. The worker would have run the base's classes for them with no warning, even though the script's warning told it to run `ant compileAll`. Scala was not affected, because scalac recompiles every source on every run.

The change, in `tools/seed-worktree.sh`:
- The copies of the build, `.dependencies` and the caches keep the base's dates (`cp -a`), and the restamp is gone.
- Every tracked file whose content is the base commit's takes the base file's date, to the nanosecond. Git decides which files those are (`git diff --name-only <base>`); the Opus engineer's `mtimesync.py` compared sizes.
- Every tracked file that differs from the base's commit, committed or not, and every file the base itself has changed, is stamped two seconds after everything else. This generalizes the old stamp for differing library sources.

Every date comparison then comes out as it does in the base, except that the differences are newer than everything copied. The step takes 0.9 to 1.4 s for 7,274 tracked files, including a `git update-index --refresh`, so the worktree's first `git status` does not hash every file again. The caches are still current: in `eng-base`, seeded this way, the compile and the walk above rebuilt no library entry. The base's own dates must be a build's. A base built in place by ant, as the coordinator builds it, qualifies, and so does one seeded by the new script. A base seeded by the old script would pass its checkout dates on.

### Keeping the caches through a rebuild: `ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll`

Read only, not run. `compileAll` depends on `compileCommon`, which depends on `cleanCache` (`build.xml:715`, `:356-360`), and `cleanCache` deletes `${cache0}` (`default_repository/caches`, `:42`) and `${cache1}`. A property given on ant's command line wins over the file's `<property>`, so the command deletes nothing and keeps `global.map` too. Fable saw the caches intact (`cache-sharing.md`, section 2). What it keeps are entries the compiler made before the edit.

The repository never checks those entries against the compiler. It judges an entry by the source's date against the entry's (`GraphRepository.java:243-244`, `:282-283`) and by a hash of the foreign Java signatures the source imports (`:531-533`). It never looks at the compiler's own classes. A kept entry is therefore used without warning, and since a `fortress compile` of an unchanged source writes nothing and exits 0 (rung 7's trap, noted under the batch script's library order), the library order does not rebuild it either. Once kept, a stale entry stays until the caches are deleted.

The build file states the rule the flag bypasses: "Whenever any part of the compiler source code is recompiled, we need to clean the cache because we can't ensure that existing target code is still valid (or even sensical)" (`build.xml:711-713`). The gate is not exposed to the kept caches: `testFast` and `testSystem` delete their private caches before they run (`:964`, `:1205`), and harness-one, the checker count and the distance stage use their own (section 2). The kept caches reach only the worker's own compiled runs, `junit.sh` and direct walk runs.

- **Safe:** an edit that cannot change any cached form. That means walk's evaluator and its natives (`interpreter/evaluator`, `interpreter/glue`), the bodies of the run-time classes that compiled code calls (`runtimeSystem`, `compiler/runtimeValues`) with no change to a signature, or code that no compile or run uses (the test harness, `Shell`'s options). The flag saves the library order, about 100 s (section 2), and the restore of `global.map`.
- **The library must be recompiled:** after an edit to anything the library's compile runs. That covers the parser and the AST (`Fortress.ast`, the generated nodes and their serialization), the disambiguator, the static checker (the Java and Scala type checkers, overloading, exclusion), the desugarers, and the code generator (`compiler/codegen`, `NamingCzar`, `OverloadSet`). It also covers a changed signature of a run-time class the jars call, and for walk, its rewriting passes (`interpreter/rewrite`). Most climb rungs edit the checker or the code generator.

Recommendation: plain `ant compileAll` stays the rule after a Java or Scala edit. The flag can be offered only for an edit confined to the safe list, by a worker who names the edited files against that list. It is not built in.

## For Pavol

Yes, the build can be shared. One finished build is copied into each new work tree in about 3 seconds, and the copy fixes the places where the folder's location is written into the saved results. Fortress accepts the copy and rebuilds nothing. Programs and tests give the same results as in the original, and the copy never reads the original's files. The 3 to 7 minutes each rung, skeptic and repair spent rebuilding goes away.

Fortress does notice edits, but only when you compile the part you edited: compiling your own program does not rebuild the library under it. If that step is skipped, the run either uses the old code without saying so or crashes with a missing-method error. A wipe is never the fix; recompiling the edited part is.

In batch 8, the four rungs each built the same starting point, and the skeptics and one repair rebuilt states the workers had already built. After the review's repair, which changed only specification text, the whole 25-minute gate ran again with the same result. That is about 107 minutes and 230K tokens of repeated work. One build at the launch, a copy per worktree, and skipping the gate when no code changed remove all of it.

Added on 2026-10-03: the two engineers' cheaper ways hold up. The old code now runs straight from the one base build, with a private 36 MB copy of its saved results made in a twentieth of a second, instead of a 206 MB copy of the whole tree per rung; that writes nothing that stays in the base, and two runs at once do not disturb each other. Seeded worktrees now also take the base's file dates, so the first Java edit no longer regenerates a thousand generated files: 77 s instead of 143 s. That change also fixed a defect, in which a branch's own Java changes were silently not recompiled. Keeping the saved results through a Java rebuild is safe only for edits that cannot change how the library compiles, which excludes most climb rungs, so it stays optional.
