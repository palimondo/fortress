<!-- Why sharing the built caches between worktrees was called impossible from 2026-09-17 to 2026-10-02, and whether a model given the goal finds the answer: the evidence for the process-engineering study Pavol opened on 2026-10-03, its first item. Two parts, each the worker report verbatim: a Sonnet archaeology of both sessions' transcripts and the record (models named by tier and generation, as the brief asked, POSITIONS "The record is public and names models on purpose."), and the blinded test on both tiers, each engineer given the repository at `3f3f766a2` (2026-09-17 16:09) and the question the coordinator faced then. The scripts and extracts named in it are in session `fe616d40`'s scratchpad and in `/home/user/blind-opus/wt-sim/`, not committed. -->

# Sharing the build and caches between worktrees: why it was called impossible

## 1. The archaeology (Sonnet, read-only, 2026-10-03)

BOTTOM LINE
The impossibility was written by Opus 5 on 09-17 (worker, then coordinator). No tier challenged it afterwards: Fable 5.1 and Opus 5.5 coordinators and 18 Fable 5.1 workers carried it; an Opus 5.5 brief widened it on 09-30. The translation mechanism first appears in Pavol's own words, 10-02 19:27. Dates are 2026, UTC. Extracts: /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/arch/ (b1.idx.jsonl = bdff267d, fe.idx.jsonl = fe616d40, show.py, hits_*.jsonl, fable_scan.txt). Thinking blocks are empty in stored transcripts, so silent consideration cannot be excluded.

TIMELINE, TIER PER STEP
- 08-21, Fable 5 coordinator (modernization): removed a duplicate cache wipe so "the second big suite inherits a warm cache"; an Opus 5 worker priced "copying a pre-warmed cache per shard is cheap". The shipped parallel version ran each track "cold in a fresh directory". Those caches kept the source path, so copies were valid. Probably what Pavol means on 09-17 by "a technique for reusing the cached library".
- 08-27 17:52, Fable 5 coordinator: worktrees start cold, but source-modifying workers "can start warm by copying ProjectFortress/build and default_repository/caches". Unmeasured. Worker briefs from 08-28 carry "BUILD SHORTCUT ... cp -r default_repository". Path-keyed, so not warm (build-cache-exploration.md).
- 09-16 10:35, Fable 5.1: cache explained as ".pyc files ... keyed by the source file"; no worktree link. 23:12 an Opus 5 survey worker writes "the hash is of the source directory path ... moving the tree invalidates everything"; 23:25 Fable 5.1 copies "keyed by directory path" into its summary. The fact was on record 17 h before the review; nobody joined it to the 08-27 advice.
- 09-17 15:10-15:45, Opus 5 coordinator (bdff267d). A worker measures the climb (iteration-cost.md): "no, we were not mostly waiting on clean builds"; worktrees priced as "293 MB ... affordable" (line 136), disk and cores only. 15:28 the coordinator turns Pavol's cache-reuse question into invalidation and offers "the cache probe".
- 15:44:59 probe worker (Opus 5) dispatched; its transcript ends 15:45:55.857 "[Request interrupted by user]", the same second Pavol's next message arrived. Coordinator: 15:52 "not sure it's healthy"; 16:01 "the worker is fine ... two build processes" (its pgrep matched its own command line); 16:26 "I've left it running"; 17:16 "dead". Never relaunched; its "two worlds" sub-question was folded into a survey, the cache questions dropped.
- 16:07 coordinator (Opus 5) writes batched-climb-plan.md; first draft (3f3f766a2) says compileAll "empties the bytecode cache for every worktree". 16:08:57: "the fix is probably seeding a worktree by copying a built tree rather than rebuilding it, but I'd rather be told than assume".
- 16:08-16:25 review worker (Opus 5, a3b468): finding 2, e93b20efb.
- 16:26 coordinator (Opus 5) to Pavol: "A worktree cannot be given a warm cache - at all." 16:52, 3cbcfffb6: plan section 4 (lines 128-130). INDEX.md line 156 carries a one-line version, so every later boot and Fable reviewer saw it. FACTS never held the sentence.
- 19:22 Opus 5 coordinator puts it in the batch script prefix: "caches/ starts empty and cannot be warmed from the main tree (the cache key hashes the source path)". 19:41-19:54 an Opus 5 transcription worker's audit ticks it as carried (row 4.3).
- 09-18 22:54, Fable 5.1 coordinator; Pavol: "Prepare the scene (maybe warm up the fortress cache, etc.)". It built the main tree, copied the build (not caches) into both worktrees, launched the script that says "cannot be warmed", and reported "the warm build copied in". The empty worktree caches went unmentioned.
- 09-19 to 09-29: the script (cb242a2d8, a0fcf0a96, Fable 5.1 coordinator) keeps the sentence. Opus 5 gate workers cite "the shared prefix's 145 s cold baseline"; a 09-24 Fable 5.1 judge uses "about 145 s each" as a reason to avoid a trial; Opus 5.5 rung workers repeat "about 145 s". The 09-29 post-mortem (Fable 5.1 review and synthesis) lists "the library rebuild (25 to 125 s)" as what remains in a rung, framed as token spend.
- 09-30 11:41, Opus 5.5 coordinator, to Pavol's "did we prepare a copy of the fortress cache for each of them or am I mixing unrelated things": "the idea was tried. Early on, a review found that a worktree can't reuse the main tree's cache ... So each worktree builds its own, which takes a couple of minutes." Its tool calls that turn touched PLAN and the script, not the cache. 11:49 its brief to an Opus worker cites "FACTS.md, 'The Workflow harness runs two agents at once...'" for the claim; that entry does not contain it. The worker's edit (f409c80ce, 12:25) reads "a new worktree has no ProjectFortress/build and no cache, and cannot take either from the main tree", dropping the review's own measured carve-out (build copy works, 1 s) and adding an 80 s compileAll per worker.
- 10-02 19:25 Opus 5.5 admits it answered only for workers. 19:27 Pavol proposes the mechanism. 19:28 a Sonnet 5.5 read-only archaeologist; its 19:41 report lists the three requirements (rename to the new path's hash, rewrite paths inside, date after checkout) and finds no place where translating was considered. 19:50 Opus 5.5 plans the four-job brief; an Opus 5.5 engineer ran 20:33-21:05; fc81949e8 at 21:04: seeding 2-3 s, nothing rebuilt.

THE LEAP
Review (Opus 5 worker, 16:23; batched-climb-review.md:25): "The analysed cache cannot be copied into a worktree, because its entries are keyed by the absolute path of the source file." Two paragraphs on: "A worktree at a different path therefore starts with a 100% cold analysed cache whatever is copied into it." Hand-back: "cannot be copied across paths". Coordinator chat (Opus 5, 16:26): "cannot be given a warm cache - at all". Plan line 128: "a worktree cannot be given a warm analysed cache at all ... a cache built at one path is unusable at another."
Evidence: (1) Java hashCode of every source path recomputed and matched to live cache file names; (2) a 145 s library build in a clone with an empty private cache (wtprobe.sh: rm -rf $R; mkdir -p $R/caches). No cache was ever copied into the clone and no file renamed. "File names differ" (measured) became "cannot be copied as is" (true), then "whatever is copied" and "at all" (untested). The stated reason, the path-derived name, is what a rename addresses. Before 10-02 19:27 no session or worker text proposes renaming, rewriting or relocating a cache across source paths (regex scan; the 08-21 and 09-26 "relocate" hits move a cache directory inside one tree). The review brief asked: "Can the build output be shared or seeded by copying instead of rebuilt? ... say what that does to the plan's arithmetic": a pricing question, answered with a price.

FABLE
- The plan was attacked only by an Opus 5 worker; standing practice on 09-17 was Opus workers for probes, and from 09-20 07:13 Pavol's rule is no Fable worker without his permission.
- 18 Fable 5.1 workers (09-19 to 10-02) had the conclusion in a prompt or a file they read: the 09-19 reviewer of process decisions (cited finding 2, used the key to propose copying within one tree, accepted cold for new trees: "That inference is not verified here"); the 09-20 array-design reviewer (told to "attack it the way batched-climb-review.md attacked its plan"); reviewers of batch records 4, 5, N, 7b; a planner; the 09-29 synthesis; the 10-02 18:43 skeptic-scope judgement. None commented on it, none was asked; each scope was something else. The Fable 5.1 coordinator of 09-18 is above.

PAVOL'S SIGNALS, FIT
1. 08-27 "Please tell me that all these workers are not rebuilding the Fortress from source ... each time": addressed (Fable 5); cache half untested.
2. 09-16 "what's with the Fortress cache? ... what does it mean to run it repeatedly": explained what it is, not whether it can be reused (Fable 5.1).
3. 09-17 15:10 "are we waiting on clean builds": measured the serial climb, where builds were small; the per-worktree cost did not exist yet (Opus 5).
4. 15:27 "we have devised a technique for reusing the cached library ... shouldn't we make that work?": heard as invalidation; the probe brief quotes only that half.
5. 15:41 "Send the worker on the cash probe": dispatched, killed in 56 s, never answered.
6. 16:00 "you misidentify my question as being a question about the build. Like, can't we just run the tests for things that changed?": his own pivot; the coordinator followed it to test selection.
7. 16:50, quoting "copying a built tree": "Duh!". The reply handled only his other quote; nothing addressed it.
8. 09-18 "warm up the fortress cache" and 09-30 11:38: answered from the record as settled.
9. 10-02 19:27 "can't we devise some mechanical script that copies the cache and adjusts whatever has the path built in": addressed within 23 minutes.

MECHANISMS
1. A measured fact stated as an impossibility (the leap).
2. A probe that died and was never re-run; a liveness check that matched its own command line; a 16-minute-stale mtime explained as "flushing".
3. Narrowing frames: probe brief quoted half his sentence; review asked to price seeding; iteration-cost priced worktrees in disk and cores.
4. No recurring-cost pricing: 145 s set against an 8h37m climb ("about two hours", plan line 198). Batch 8 then had 35 builds, 22 rebuilding code already built, about 85 min of machine time (batch-8-review.md:395); about 107 min and 230K tokens of repeats (build-cache-exploration.md:126).
5. Later agents cited the record instead of re-asking, and the claim grew (script prefix, then "cannot take either"). It lived in INDEX, the plan and the script prefix, never in FACTS or POSITIONS, so no rule prompted a re-check.
6. The reason travelled with the claim, which made it look verified (the 09-17 claims table ticked it).
7. Reviews were scoped to other questions (tokens, skeptic scope, records), and the Fable gate was permission-limited.
8. The remedy came when Pavol posed a mechanism, not a cost.

OPEN
The blinded test (Opus 5.5 and Fable 5.1 engineers on the 09-17 16:09 repository) was running at 05:10. Both first attempts, killed at 04:49, had written cache-relocation experiments within 7-12 minutes (Opus 5.5 04:43, Fable 5.1 04:48). The brief states the hash fact, the 145 s and Pavol's goal as the question, so it does not isolate unprompted discovery. Not checked: whether 08-28 to 09-08 worktree workers saw a slow first run. "No earlier mention" rests on regex scans.

## 2. The blinded test, Fable


## State found in /home/user/blind-fable
The stopped attempt had finished: `ProjectFortress/build` (4026 classes, 40 MB) plus a complete compiler-library cache (12 MB, 5 jars, analysed 04:43–04:48). It works: `fortress compile` of a 7-line program 3.4 s, `fortress run` 0.6 s. Interpreter caches were empty: `fortress explorations/claude_demo.fss` cold 38.6 s, warm 7.0 s (adds 22 MB of `interpreter*_cache`). No tracked files changed; I removed my two scratch worktrees; the gitignored caches now also hold interpreter entries and a `Smoke1` test.

## Code facts that decide the design
- Cache names: `<Name>-<hex>` where hex = Java `String.hashCode()` of the *canonical absolute* source path (`GraphNode` uses `getCanonicalPath()`, so symlinks don't help). A 10-line Python reproduces every name; `com.sun.fortress.nativeHelpers-d13bcf6` hashes the literal `"ForeignJava"` and is path-independent.
- Staleness (`GraphRepository.OutOfDateVisitor`): source mtime > cache mtime, plus a *signature* hash of imported Java classes (`ForeignJava.subsetHash`), never class-file mtimes. So a copied build with new mtimes is harmless; a cache copied with **preserved** old mtimes (`cp -p`, `rsync -a`) is older than freshly checked-out sources and forces the 145 s rebuild.
- `ant compileAll` → `compileCommon` → `cleanCache` deletes `default_repository/caches` (tracked `global.map` included). `ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll` neutralises it (verified: cache intact).
- `FORTRESS_CACHES=<dir>` is honoured by `ProjectProperties` (`fortress.caches` via `StringMap.FromEnv`) and by `bin/fortress_classpath` and `bin/run_classpath`.
- `FORTRESS_AUTOHOME` overrides the classpath probing that mis-homes a symlinked build, but ant would still write through the symlink into the shared build — rejected for workers.

## Designs considered
1. Symlink/hardlink the build and cache: `cp -al` is 0.05 s, but Java rewrites cache files in place, so hardlinks corrupt the base; symlinked build mis-homes. Rejected.
2. One shared cache for all worktrees: names differ per path and workers edit the library. Rejected.
3. **Copy build + copy cache + rename hashes** (workers). Verified.
4. **Shared read-only base tree + private `FORTRESS_CACHES`** (skeptic's "old code"). Verified.

## Measured (4 cores)
- `git worktree add`: 2.0–3.6 s. `cp -r build`: 0.3–1.0 s. `cp -r caches`: 0.04 s. Rename script: 0.05 s (14 renames compiler-only, 56 with interpreter caches).
- Scratch worktree wt1 seeded this way: compile 3.4 s with `-debug repository 1` showing only the new program as stale; run 0.65 s. wt2 (interpreter caches too): interpreter 9.4 s (vs 38.6 cold), compile 4.0 s.
- Private cache via `FORTRESS_CACHES` against blind-fable: compile 2.9 s, run 0.6 s, zero writes to the tree's own cache.
- Worker rebuild in wt1 after touching one Java file, `ant -Dcache0=… -Dcache1=… compileAll`: 99.6 s (fresh checkout makes astgen/operators look out of date, so javac recompiled all 1073 files; scalac is full anyway). Library cache survived; post-rebuild compile 4.6 s, run OK.

## Recommended recipe
**Once per batch**, in base tree B at the base commit: `ant compileAll` (80 s), library compile in order (145 s), one interpreter run (39 s) if walk-path rungs exist.

**Per worker worktree W (~5 s):**
1. `git worktree add --detach W <base>`
2. `cp -r B/ProjectFortress/build W/ProjectFortress/build` (no `-p`/`-a`, no links)
3. `cp -r B/default_repository/caches/. W/default_repository/caches/`
4. `python3 rehash.py B W W/default_repository/caches` — for each `.fss/.fsi` under `ProjectFortress/LibraryBuiltin`, `Library`, `ProjectFortress/test_library`, rename `<Name>-<hash(B-path)>.tf[is]` to `<Name>-<hash(W-path)>` in `analyzed_cache`, `analyzed_cache/depends`, `interpreter_cache`, `interpreter_parsed_cache` (script at scratchpad `rehash.py`, 30 lines).
First program compile 3–4 s; interpreter 9 s.

**Worker after Java/Scala edits:** `ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll` (~100 s, the one unavoidable build). Library-`.fss` edits recompile only the touched component and dependents (mtime); nativeHelpers signature changes auto-recompile CompilerBuiltin. **Caveat:** a compiler change that alters how the library *would* compile (codegen, desugaring) is not detected — such rungs must wipe `*_cache` and redo the 145 s library compile before the skeptic judges.

**Skeptic:** new code = W as left by the worker (sequential, no copy). Old code = `export FORTRESS_HOME=B FORTRESS_CACHES=$priv` with `cp -r B/default_repository/caches $priv` (0.05 s, no rename since paths are B's); B stays read-only, so any number of skeptics share one base build.

## Next to try
- Patch `NamingCzar.deCaseName` to hash a `FORTRESS_AUTOHOME`-relative path: caches become portable, the rename step disappears (changes everyone's cache names once).
- Touch generated node/operator sources after checkout to skip astgen in the first rebuild (99.6 → ~80 s).
- Negative controls I inferred from code but did not run: unrenamed cache and `cp -p` copy both forcing the 145 s rebuild.
- Put per-worktree caches outside `default_repository` via `FORTRESS_CACHES` so even a plain `ant compileAll` cannot wipe them.

## 3. The blinded test, Opus


## Recommendation: copy the build, relocate one shared library cache, and give the skeptic no build of its own

Every timing below was taken while other sessions kept the 4-core machine at a load average of 5–8, so the times are inflated.

**Designs considered**
1. Each worktree builds everything itself (61–80 s build, 145–194 s library).
2. Symlink `ProjectFortress/build` to the base tree's build.
3. Copy the build and recompile the library cold.
4. Copy the build and **relocate** the base tree's compiled caches. Recommended.
5. For old-code runs, use the base tree itself with a private cache directory.

**What I measured**
- A no-op `ant compileAll` takes 61 s and is never a no-op: scalac always recompiles every Scala source. `compileAll` depends on `cleanCache`, which deletes `default_repository/caches` (tracked `global.map` included); the first run wiped the earlier attempt's library cache, rebuilt cold in 194 s (AnyType 27, CompilerBuiltin 135, CompilerLibrary 25, CompilerAlgebra 3, CompilerSystem 3.5).
- Creating a worktree (separate-index checkout as a stand-in for `git worktree add`): 1.6 s, 222 MB. Copying the 40 MB build: 0.17–0.3 s.
- Trap: checkout mtimes make `Fortress.ast` look newer than the generated AST sources and the copied `OperatorStuffGenerator.class` newer than `Operators.java`; one edited Java file then cost 104 s (1,071 AST sources regenerated identically, 1,073 files recompiled).
- Fix: copy the base tree's mtimes onto the tracked files (0.17 s for 10,506 files), then `cp -a` the build and `.dependencies`: the same one-file edit cost 74 s, 1 file compiled, nothing regenerated; the remaining ~60 s is scalac.
- Relocation: rename each cache file with the new path's hash and rewrite the embedded absolute paths, over the analysed, interpreter and interpreter-parsed caches, `bytecode_cache` and `nativewrapper_cache` copied unchanged: 0.1–0.3 s. In the relocated worktree: compile 3.4–4.6 s, run 0.7 s, interpreter 9 s, no library cache file rewritten. Without it: interpreter first run 38 s, compiler path 145–194 s library build.
- Library edits are incremental: a comment added to `CompilerLibrary.fss` recompiled CompilerLibrary 30 s, CompilerAlgebra 1.3 s, CompilerSystem 2.2 s; CompilerBuiltin and AnyType untouched (cold: 194 s).
- Old-code runs: `FORTRESS_HOME=<base>` plus `FORTRESS_CACHES=<private copy of the shared cache>` (0.01 s, no relocation); compile 3.4 s, run 0.7 s; base cache md5-identical before and after.
- Symlinked build confirmed broken without `FORTRESS_AUTOHOME` (a compile wrote into the base tree's cache); with it, `ant` in the worktree would still write through the symlink. Copying costs 0.2 s, so a symlink saves nothing.

**Recommended recipe**
Once per batch, in base tree B at the base commit (4–5 min, only when the base changed): 1. `ant compileAll` (61–80 s; step 2 must follow). 2. Library compile in the fixed order (145–194 s). 3. Warm: compile and run one test program, one through the interpreter (~45 s). 4. Copy `B/default_repository/caches` to a frozen shared cache, minus the test program's entries and `logs` (0.1 s). B read-only for the rest of the batch.
Per rung worktree W (about 2.2 s, 300 MB): 5. `git worktree add --detach W <base>`. 6. `mtimesync.py B W` (0.17 s). 7. `cp -a` B's `ProjectFortress/build` and `ProjectFortress/.dependencies` into W (0.2 s). 8. `rm -rf W/default_repository/caches/*_cache`, then `relocate.py <shared cache> W/default_repository/caches B W` (0.2 s).
Worker: a Library edit recompiles only the edited component and those after it (seconds to 30 s; ~135 s for CompilerBuiltin). A Java or Scala edit needs `ant compileAll` (~65–75 s), which wipes the caches, so the library is rebuilt once (145–195 s): deliberate in `build.xml`, a different compiler's library, not a repeat.
Skeptic: same worktree after the worker, no `ant`, no library builds. New code `FORTRESS_HOME=W`; old code `FORTRESS_HOME=B` and `FORTRESS_CACHES=W/.old-caches` after `cp -r` of the shared cache; its programs outside B; `FORTRESS_HOME` exported for every command.

Decision offered: after a compiler-only rung the worker could rerun step 8 instead of rebuilding the library (saves 145–195 s), safe only when the change does not affect the library's code generation or type checking; default kept: rebuild.

**Next to try**: skip scalac when no `.scala` file changed (Java-only edits ~70 s to a few seconds; Java signature changes Scala depends on need handling); portable caches by hashing a home-relative path in `NamingCzar.deCaseName` (changes the original tree); time a real `git worktree add` and two agents in parallel; compare re-relocation with a full library rebuild on a real Java-editing rung.

**Files** (in `/home/user/blind-opus/wt-sim/`, nothing committed): `meas/provision.sh`, `mtimesync.py`, `relocate.py`, `libbuild.sh`, `env.sh`; logs `ant0.log`, `ant-w1.log`, `ant-w2.log`, `lib-base.log`; `seed/` the frozen shared cache (33 MB); `w2/` a provisioned worktree; `wt-sim/a` as the earlier attempt left it.

## 4. What the two parts show together

- Given the goal in plain words and the path-hash fact, both tiers found the translation (rename to the new path's hash, rewrite the paths inside, mind the dates) within about 15 minutes and 0.24M tokens each, counting the first starts that an accidental stop ended; the brief stated the fact and the goal, so the test does not isolate unprompted discovery (the archaeology's "Open").
- The impossibility was not a capability limit of either tier: it was a measured fact ("the file names differ") written as an impossibility, by an Opus 5 review worker and its coordinator on 2026-09-17, never priced as a recurring cost, and carried unexamined by every later tier because it lived in INDEX, the plan and the script prefix, where no rule prompted a re-check.
- Two measured improvements not in `coordinator/tools/seed-worktree.sh` as it stands, neither yet weighed: a skeptic's old-code runs against the one read-only base build with a private `FORTRESS_CACHES` (both reports), and the base tree's file dates copied onto a worktree's tracked files so that a Java edit does not regenerate the AST sources (Opus: 104 s to 74 s); and Fable's `ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll`, which keeps the caches through a rebuild.
