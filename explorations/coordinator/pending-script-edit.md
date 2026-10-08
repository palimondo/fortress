<!-- The batch script and manual edits waiting for the next batch, gathered by the coordinator from 2026-10-03 to 2026-10-04: the seeding change of 5b0a82d97 (the old code from the base build with a private caches folder), the separate test commit dropped (POSITIONS "Test first, the test kept."), and the global.map restores removed (6e2907707; a git checkout of the untracked path now fails). All three must be in climb-batch-workflow.js and climb-batch-workflow.md before the next batch launches; then this note goes. -->

# Pending batch script edits

The engineering worker's replacement texts (2026-10-03 ~07:05 UTC, commit 5b0a82d97), to apply to climb-batch-workflow.js and climb-batch-workflow.md AFTER batch 10 lands (batch 10 runs the script as launched). Batch 11's base must be at or after 5b0a82d97 (the base build must hold tools/old-fortress.sh), and its base build built in place by ant or seeded by the new seed script. Then rewrite POSITIONS "Nothing is built or run twice on the same code." ("through the rung's private seeded copy of it" -> the base build with the rung's private caches folder).

## climb-batch-workflow.js

**Constants.** Replace line 71 (`const baseCopy = …`) with:
```js
const OLD = BASE_BUILD + '/explorations/coordinator/tools/old-fortress.sh'   // runs the base's code from the base build
const oldCaches = (rung) => rung.path + '/tmp/old-caches'   // a rung's private caches folder for the old code
```
In the comment at lines 66-69, change "and so is each rung's private copy of the base, WORKTREE-base, where the old code runs" to "and the old code runs from it with each rung's private caches folder (tools/old-fortress.sh)".

**The section** (from `'## The old code beside the new',` through `...nor in another rung\'s worktree or copy.',`):
```js
'## The old code beside the new',
'',
'A run on the base\'s code once your worktree holds an edit (a test, or a program of your own run old against new) never reverts and rebuilds your worktree, and makes no copy of the base. It runs the batch\'s one base build, ' + BASE_BUILD + ', through ' + OLD + ', with the rung\'s private caches folder, WORKTREE/tmp/old-caches. The tool sets FORTRESS_HOME to the base build and FORTRESS_CACHES to the folder, over what env.sh set, and the first time fills the folder with a copy of the base build\'s caches (0.04 s), which the rung\'s later roles reuse. Run from your own scratch directory under WORKTREE/tmp/; the first line is the compiled path, the second walk, the third the harness on the base\'s code:',
'',
'    ' + OLD + ' ' + BASE_BUILD + ' WORKTREE/tmp/old-caches compile P.fss && ' + OLD + ' ' + BASE_BUILD + ' WORKTREE/tmp/old-caches run P',
'    ' + OLD + ' ' + BASE_BUILD + ' WORKTREE/tmp/old-caches P.fss',
'    FORTRESS_HOME=' + BASE_BUILD + ' ' + BASE_BUILD + '/explorations/compile-ladder/rung-inference-walk/harness-one.sh WORKTREE/tmp/old-harness WORKTREE/ProjectFortress/tests/X.fss',
'',
'Every cache file these write goes to the folder, or to the harness\'s own scratch caches, and nothing they write under the base build stays: the parser\'s empty error logs beside a library source are removed at once, and two runs at once may share them harmlessly (build-cache-exploration.md, section 6). So every rung uses the one base build at the same time. Never run the base build\'s bin/fortress without the tool, which would compile into the base build\'s own caches, and never compile, build or write anything else in ' + BASE_BUILD + ', from which every worktree of the batch is seeded and which must stay clean; nor in another rung\'s worktree or folder. Keep your programs outside the base build, since their own logs go beside them.',
```

**`buildsNothing()`.** Replace `const copy = baseCopy(rung)` with `const priv = oldCaches(rung)`. Replace the end of its paragraph, from "for the old code in the rung\'s private copy…", and its two command lines with:
```js
...for the old code from the batch\'s one base build with the rung\'s private caches folder, ' + priv + ', as the shared prefix\'s "The old code beside the new" says. This line compiles and runs a program P on the old code, and makes the folder (0.04 s) if no role of the rung has made it yet:',
'',
'    ' + OLD + ' ' + BASE_BUILD + ' ' + priv + ' compile P.fss && ' + OLD + ' ' + BASE_BUILD + ' ' + priv + ' run P',
```

**The other references:**
- Lines 164, 268, 366, 450: replace "in the rung's private copy of the base (the shared prefix's \"The old code beside the new\"; never the base build itself)" with "from the base build with the rung's private caches folder (the shared prefix's \"The old code beside the new\"; never the base build's bin/fortress without the tool)".
- Line 908: "Work ONLY in the worktree your tail names; the old code runs from the base build with your rung's private caches folder, WORKTREE/tmp/old-caches (\"The old code beside the new\", below)."
- Line 1376: "run it from the base build with the rung's private caches folder, ' + oldCaches(rung) + ', by the shared prefix's…"
- Line 2374: "…on the base's code from the base build (the shared prefix's \"The old code beside the new\", its harness line), not by reverting…"
- Line 2164: drop the sentence on removing `<worktree>-base` copies. The folder is in the worktree's ignored `tmp/` and goes with it.

(Line numbers are the script at 9c9e823d5, batch 10's launch; the batch-specific MANIFEST lines (164, 268, 366, 450 are inside batch 10's block) will be regenerated by batch 11's generator: carry the sentence into gen11/lists11 instead.)

## climb-batch-workflow.md, the paragraph "One base build, and every worktree seeded from it."

- **One base build, and every worktree seeded from it.** The coordinator builds one worktree at the base before the launch ("Before the launch", above), named by `args.baseBuild`. It is built in place by ant, or seeded by the current seed script, so that its file dates are a build's. The prefix's "Your worktree" makes the rung's worktree with `tools/seed-worktree.sh <base build> WORKTREE BRANCH <base>`. That adds it with the same fallbacks as the old command, copies the base build's `ProjectFortress/build` and `default_repository/caches` with their path keys translated, and gives every tracked file the base's date, or a later one where it differs from the base. It takes about 3 s, in place of `ant compileAll` and the library order in each worktree (the exploration, sections 1, 3 and 6). Because of the dates, the worker's first `ant compileAll` after a Java edit compiles only what changed (77 s against 143 s at load 10, section 6). A branch whose Java differs from the base also gets those files recompiled, which the seed before 2026-10-03 silently skipped. If the seed exits 2, the worker makes the worktree and builds it itself, as before, and says so. "After an edit, and after a failed build" carries the exploration's rules for a worker (section 2): the edited component alone after a `.fss` edit, the five in order after an edit of a root api's `.fsi`, nothing under walk, `ant compileAll` with `global.map` restored and the library order before the next compiled run after Java or Scala, and never a wipe; the worker's step 5 and the merged-tree repair point to it. "The old code beside the new" runs the base's code from the base build itself, through `tools/old-fortress.sh <base build> <worktree>/tmp/old-caches <fortress arguments>`. The tool sets `FORTRESS_HOME` to the base build and `FORTRESS_CACHES` to the rung's private caches folder. The folder is filled the first time with a copy of the base build's caches (0.04 s and 36 MB, against 3 s and 206 MB for the per-rung copy of the base it replaces) and reused by the rung's later roles. The harness runs on the base's code with `FORTRESS_HOME` set to the base build and its own scratch caches. A worker resumed after a crash sees its test fail there, not by reverting and rebuilding its worktree. The rungs use the base build at the same time. Section 6 measured that these runs write nothing under it that stays, since every cache goes to the private folder. Their one transient write, the parser's empty error logs beside a library source, is harmless when two runs overlap: two runs at once both passed and left the base's checksum unchanged. Nobody runs the base build's `bin/fortress` without the tool, or compiles or builds in it, because a compile with the base build's own caches rewrites cache files there (section 1), and the seed refuses a base that is no longer clean. The folder lives in the worktree's ignored `tmp/` and goes when the commit stage removes the worktree. Keeping the caches through a rebuild (`ant -Dcache0=/nonexistent -Dcache1=/nonexistent compileAll`) is not used, because it is safe only for an edit that cannot change how the library compiles (section 6).

## The defect the new seed fixes (worker's words)
With the old seed, a branch whose Java differed from the base got the build dated after its sources, so `ant compileAll` never recompiled those files (its test: a branch changing `FloatLiteral.java` kept the base's class). Batch 10 runs on the old seed (base10's copy at cec70988b): it matters only if a rung worktree is re-seeded on a branch that already holds Java commits (a worker resumed after its worktree was lost); then the worker must touch its changed Java files or build clean.

## Also with this edit (the curator's yes of 2026-10-04 01:25 UTC on the skill page)
Drop the separate test commit: in `climb-batch-workflow.js` the prefix line "a worker writes its test first, sees it fail through the harness and commits it alone, and its skeptic reads that order in the worker's transcript" loses "and commits it alone"; every other "first commit"/"tests alone" demand in the worker and skeptic prompts goes with it (grep `alone`, `first commit`); `explorations/protocol.md` hard rule 4 "the test is the first commit on the worker's branch, seen failing through the harness before the fix and again by the skeptic's own run on the base" becomes "the test is written first and seen failing through the harness before the fix" (the skeptic's run on the base is also gone since 10-02). POSITIONS "Test first, the test kept." already says it.

## Also with this edit, REQUIRED before the next batch: global.map untracked (6e2907707, 2026-10-04)
The linker writes the empty map itself when it is missing (RepoState.initRepoState); `git checkout -- default_repository/caches/global.map` now FAILS (untracked path). Remove every restore: `climb-batch-workflow.js` lines 156, 218, 260, 324 (batch 10 MANIFEST lines: carry into gen11/lists11 instead), 933, 934, 1134 ("restore after ant compileAll"), 2070 ("global.map restored"), 2164 (restore before `git worktree remove`; the removal then needs no restore); keep 533 and 574 (they cite the FACTS title, kept verbatim). `climb-batch-workflow.md` lines 37, 48, 153, 237. Also stale, not urgent: `coordinator/map/README.md:128`, `map/modules-and-phases.md:217`. Historical, leave: `compile-ladder/plan-*/manifest/lists*.py`, `process-engineering/blind-brief/machine.md`, `process-engineering/cache-sharing.md:66`.

Also in the manual, `climb-batch-workflow.md:131`: its last sentence says two sentences still say the count may only fall, `checker-count/run.sh`'s header among them; that header now says a change in the count is reported, not red, so only the manifest comment on `expectedCheckerCount` is left (`explorations/reviews/skills-review-fable.md`, section 5).

## Also with this edit: points to report, not stops (the curator's comment of 2026-10-06 on the skill page)
The skills now say "points to report" where the script and the manual say "stop" for a point a rung's section reserves for review (the curator read "stop" as a condition that stops the worker). Rename the result field `stopsMet` (`climb-batch-workflow.js` `:1145`, `:1292`, `:1351`), the prefix's lines on reserved stops (`:680-682`) and the rung tails' "Stops." lines to "points to report"; a step that cannot be undone, or that would act against the curator's word, still holds the push. The manual follows.

## The ledger's new form (2026-10-08, `ae4f8e38a`)

The ledger is in fifteen topic sections and `explorations/coordinator/tools/ledger.py` is the only way to write a row (POSITIONS, "The gap ledger's form."). Lines of the script and its manual that assume the old form:

- `climb-batch-workflow.js:1643`: "append each row to the ledger's last table", ledger notes "APPENDED" by hand, and the literal `<short hash>` placeholder. A new row goes in with `ledger.py add FILE --section TITLE`, the worker naming the section; a landed fix closes its row with `ledger.py close N --commit HASH --test NAME`.
- `climb-batch-workflow.js:1711`: "the ledger's own counts still right". The ledger holds no counts; `ledger.py count` prints them and `ledger.py check` replaces the check.
- `climb-batch-workflow.js:2132` and `:2474`: the commit stage replaces `<short hash>` in the ledger. `ledger.py close` writes the hash.
- `climb-batch-workflow.js:47`: "hashes into the ledger notes".
- `climb-batch-workflow.md:153`: "The commit stage replaces the `<short hash>` placeholders".
- Open: numbering rows while rungs run in parallel (D7 of the gap-ledger archaeology). `ledger.py add` numbers a row max + 1, so two rung branches that each add a row collide at the gather.

## The push steps (2026-10-08)

Every push now also goes to `blinded-fable`, the branch the coordinating session was created from and a rebuilt container clones (protocol, hard rules). The script's push steps name only `claude/worker-brief-fable-vnnuv8`: `climb-batch-workflow.js:72`, `:2159-2160`, `:2478`. Each gains `git push origin main:blinded-fable` beside it.

## The microGPT walk check (2026-10-08)

`tools/mg-run.sh` now runs the quick pair by default (`MicroGptFlatQuick.fss`, `MicroGptAplQuick.fss`: two passes, 7 checks each, about 56 s for the pair from empty caches; `7e3fe5b7b`), and the full 40-check pair only with `full` among its arguments (POSITIONS, "The microGPT walk check is quick."). `climb-batch-workflow.js:2161` still says the run takes "about 80 minutes each"; it now takes about a minute. The commit step calls `mg-run.sh` without `full`, so it runs the quick pair, which is the intent.


## The build's caches rule and the four-thread suites (2026-10-08)

`ant compileAll` keeps the Fortress caches unless the implementation changed, the test targets build first, and `fastTrack` and `systemShard` pin `FORTRESS_THREADS=4`, with `fastTrack` also pinning `JAVA_FLAGS` (`4e0f34421`, `840368f92`; `process-engineering/build-efficiency.md`). Three texts still say one thread: `climb-batch-workflow.js:1839` (the gate's step 6, "The gate is pinned to one thread"), `explorations/experiment/env.sh:6` (`FORTRESS_THREADS=1` for every probe and stage runner that sources it) and `tools/count-run/count-run.sh:23`. The gate's prompts that run `ant compileAll` before the suites can drop it, since the suites now build first, and any step that empties the caches to cure a stale build can go. Also owed, not a script line: `junit.sh`'s clean step finds no component for 52 of 609 `.test` files, the 50 whose `tests=` line has a space after `=` and the 2 that continue it on the next line (report section 8.2).
