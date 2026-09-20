# Repair after the gate's judge, climb batch 2

Ruling executed: `explorations/compile-ladder/climb-batch-2/JUDGE-gate.md`, committed
`a3dcd1a5b` on `main` on top of `4aa6a5313`. Decision: repair, no Fortress source change.
No `ant compileAll`, no `fortress compile`, no `ant testFast`, no `ant testSystem` and no
ladder subset were run here — the ruling forbids them because nothing the gate measures
changed, and the gate stage re-runs everything after this commit.

## 1. State check (ruling step 1)

`git log --oneline 8590d7a9e..HEAD` ended at `a3dcd1a5b` on top of `4aa6a5313`, and
`git status --short` showed exactly one line,
`?? explorations/compile-ladder/climb-batch-2/gate/`. Nothing else was modified, so the
repair proceeded.

## 2. The shard membership, reconstructed and committed (step 2)

`repair/shard-membership.sh` applies the harness's own rule to `git ls-tree` of
`ProjectFortress/tests/`: the sorted top-level entries, index `j` kept by shard `j % 4`, a
test counted for every kept `.fss` or `.sh`. The rule is
`FileTests.java:790-806` — the sort at `:799` (`Collections.sort(names)`), the keep at
`:802` (`if (j % shardCount == shardIndex) kept.add(names.get(j))`) inside the loop
`:801-803` — over the list `shuffledFileList` takes from `dir.list()` (`:1123`, the method
at `:1122`); the per-entry classification is `:811-840` (the four filtered suffixes at
`:817-818`, the hidden-file test at `:821`, the `.fss` arm at `:822-829` and the `.sh` arm
at `:830-833`, everything else "Not compiling file" at `:819` and `:834-836`). The wiring is
the root `build.xml`: the `systemShard` macro at `:1171-1199` with `fortress.suite.shard`
set at `:1185`, and the four shards `0/4` to `3/4` at `:1207-1210` under
`<parallel threadcount="4">` (`:1206-1211`) in the `testSystem` target (`:1201-1214`).

Capture: `explorations/compile-ladder/climb-batch-2/repair/shard-membership.txt`. Every
number the ruling rests on came out as predicted:

| revision | entries | shard 0 | shard 1 | shard 2 | shard 3 | sum |
|---|---|---|---|---|---|---|
| `a0fcf0a96` | 387 | 95 | 95 | 97 | 95 | 382 |
| `8590d7a9e` | 389 | 98 | 96 | 95 | 95 | 384 |
| `HEAD` (`a3dcd1a5b`) | 389 | 98 | 96 | 95 | 95 | 384 |

The first row is the landed baseline's system rows exactly
(`explorations/compile-ladder/gate-baseline/summary.txt:49-52`), the second and third are
this run's exactly (`climb-batch-2/gate/summary.txt:49-52`). The on-disk listing of
`ProjectFortress/tests` is `IDENTICAL` to the tracked one at HEAD, and the added-entries
diff is exactly `4a5,6`, `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss` and
`ArrayScalarExtension.fss`. The listings at `8590d7a9e` and at HEAD are the same, so the
batch added no interpreter test and removed none.

Two cross-checks beyond the ruling's list, both confirming it. The script's "files kept"
column at `8590d7a9e` is 98/97/97/97, which is the gate run's own
`Shard i/4: N of 389 files` lines verbatim (`tmp/gate-batch-2-run1/testSystem.txt:14,23,28,30`
— 97, 97, 98, 97 for shards 1, 2, 0, 3 in the order the parallel run printed them); the
difference between that column and the test counts is the five non-test entries, which the
script names per shard (`presidents`, `printing`, `a.b`, `poem.txt`, `sample.fa`) and which
move along the shards with everything else. And the two added files come from `02d09a39f`
("The library's scalar extension generalised and its exclusion tower closed"), which
`git merge-base --is-ancestor 02d09a39f 8590d7a9e` confirms is an ancestor of the batch
base.

`bash shard-membership.sh ...` exits 1, because its last command is the `diff` that is
*expected* to be non-empty (the two added entries). The capture is complete; the exit code
carries no failure.

## 3. The criterion corrected (step 3)

`explorations/coordinator/climb-batch-workflow.js`, lines `809-820` replaced by the
thirteen lines the ruling gives verbatim; `gate_compare` is now `:809-821` and
`last_landed_summary` `:823-827`. The change: an awk `key()` function rewrites
`^system-[0-9]+/` to `system/`, and both the base and the current counts are summed per
key, so the four `system-<i>/SystemJUTest` rows are compared as one suite. `RED` and
`EMPTY` stay per row, so a shard with a failure is still named by its own shard.

Why this is the fix and not the alternatives is the ruling's section 3; the shortest form
is that per-shard counts are a function of the corpus's sorted order, not of test health,
because an insertion at sorted position 5 moves every later entry two shards along. Only
the sum is comparable across a change to `ProjectFortress/tests/`.

## 4. The two path traps, same file (step 4)

- `run_bg` (`:309-311`, in the shared prefix's text, which every worker sources). Line
  `310`'s `bash -c "$2 > '$1' ..."` became `bash -c "( $2 ) > '$1' ..."`, and the comment on
  `:309` now says why. Without the subshell the redirection binds to the last command of a
  `&&` chain only: measured here, the pre-edit form given
  `cd /tmp && echo first && echo second && false` leaves a log holding `EXIT=1` and nothing
  else, while the edited form holds `first`, `second`, `EXIT=1`
  (`repair/workflow-script-check.txt`, section (d), the two runs printed side by side). The
  subshell also keeps a relative log path in the caller's directory rather than after the
  `cd` (shown: `run_bg rel.txt "cd /tmp && echo fourth"` from the scratchpad writes
  `rel.txt` there), and tolerates a trailing `;` in the command string, which `{ $2 ; }`
  would not (shown: `run_bg ... "echo third ;"` gives `third`, `EXIT=0`).
- `atomic_runs` (`:834-857` after the edits). One line inserted after
  `local O="$1" p d i out rc` (`:835`) and before `cd "$FORTRESS_HOME/ProjectFortress"`
  (`:837`): `case "$O" in /*) ;; *) O="$PWD/$O" ;; esac`. The gate role calls
  `atomic_runs ' + GATE_DIR + '/summary.txt` (`:859`) and `GATE_DIR` is relative
  (`:255`, `const GATE_DIR = BATCH_DIR + '/gate'`), so before this line the appended atomic
  lines would have gone to a path relative to `ProjectFortress/`. `:837` is the script's only
  `cd` inside a function, so this is the one site. Shown in isolation in the capture:
  the relative `GATE_DIR` path resolves to `/home/user/fortress/explorations/...` and an
  already-absolute path is left alone.

## 5. Validation without running the workflow (step 5)

Capture: `explorations/compile-ladder/climb-batch-2/repair/workflow-script-check.txt`.

(a) `grep -c '`'` over the script prints `1` — the pre-existing `mg_phases` line, now
`:899` (was `:897`; the two inserted lines moved it). The file's own rule is its header
comment, `:22`, "No backticks anywhere in this file"; none was added.

(b) Syntax. The wrapped copy — async IIFE, `export const meta` rewritten to `const meta`,
an `args` stub — passes `node --check` with exit 0 on Node 22.22.2. A second copy with one
stray `)` appended fails it, `SyntaxError: Unexpected token ')'`, exit 1, so the method
bites.

(c) The criterion, decoded from lines `809-821` exactly as JS will emit the strings
(`node` over the array, then `source`) and run on `mawk 1.3.4 20240123`, which is the awk
`gate2` will use. The landed baseline against this run prints nothing, exit 0; the
self-compare prints nothing, exit 0. The four perturbations were each run **both** ways
(see the deviation in section 8): against the unmodified `gate/summary.txt`, which is the
comparand the ruling's expected strings were computed against, they give exactly those
strings —

    COUNT DOWN<TAB>system/SystemJUTest<TAB>384 -> 381        (system-0 lowered 98 -> 95)
    COUNT DOWN<TAB>fast-library/LibraryJUTest<TAB>83 -> 82   (fast-library lowered)
    SUITE GONE<TAB>fast-misc/BitsJUTest<TAB>2 -> absent      (that row deleted)
    COUNT DOWN<TAB>system/SystemJUTest<TAB>384 -> 289        (the system-3 row deleted)

— each with exit 1. And the pre-edit function, decoded from
`git show HEAD:explorations/coordinator/climb-batch-workflow.js | sed -n '809,820p'`, prints
on the landed baseline against this run exactly the line the gate reported and nothing
else: `COUNT DOWN<TAB>system-2/SystemJUTest<TAB>97 -> 95`, exit 1. The red line is
reproduced, and the corrected function is silent on the same pair.

Two checks added beyond the ruling's list, because the claim "`RED` and `EMPTY` are still
per row" is load-bearing for the decision and was asserted rather than shown: a failure
injected into the `system-2` row gives `RED<TAB>system-2/SystemJUTest<TAB>1 failures, 0 errors`,
naming the shard and not the sum; the `system-1` row zeroed gives
`EMPTY<TAB>system-1/SystemJUTest` and, correctly, a `COUNT DOWN` on the sum as well
(384 -> 288), since zeroing a shard does lower the suite.

(d) `run_bg` decoded from `:309-311`, sourced and run, as section 4 reports.
`atomic_runs` decoded and checked with `bash -n` only, exit 0; it was not run.

## 6. The description (step 6)

`explorations/coordinator/climb-batch-workflow.md:46`, the two sentences the ruling gives,
inserted after "is red and named (gap 1)." and before "The first landed summary is …": the
shard rule and why the sum is the comparable quantity, with this batch's red gate as the
case, and the two path fixes.

## 7. FACTS (step 7)

`explorations/coordinator/FACTS.md`, the one bullet the ruling gives verbatim, inserted
after the `CompilerError` bullet at `:133` (so it is now `:134`, the last bullet of "The
compile-path ladder baseline"). It carries the rule and its citations, both reconstructions
with their entry counts, the two added files and their sorted positions, the evidence
script and its capture, and what `gate_compare` now does.

## 8. Deviations, each with the source that forced it

1. **The ruling's four expected strings in step 5(c) are self-compares, not comparisons
   against the landed baseline.** Read literally, step 5(c) lowers a row "in a copy of `C`"
   and expects `system/SystemJUTest 384 -> 381`; but 384 is *this run's* system sum, and the
   landed baseline's is 382 (`gate-baseline/summary.txt:49-52`, summed:
   95+95+97+95 = 382), so with the baseline as base the same perturbation prints
   `382 -> 381`. The `fast-library` case is starker: the baseline's row is
   `fast-library/LibraryJUTest 77` (`gate-baseline/summary.txt:3`) against this run's 83
   (`gate/summary.txt:3`), which the ruling itself records as "LibraryJUTest 77 -> 83", so
   lowering 83 to 82 is still *above* the baseline and prints nothing at all. The expected
   `83 -> 82` is only reachable with this run's summary as the base. I therefore ran all
   four perturbations both ways and put both in the capture: against the unmodified
   `gate/summary.txt` every one of the ruling's four strings reproduces exactly, and against
   the landed baseline the numbers are 382-based and the library row is silent. No change to
   the prescribed code was needed or made — the deviation is in which comparand the
   expectations assumed, and the function's format string is
   `base[k] " -> " cur[k]`, which is what both runs show.
2. **`atomic_runs` is 24 lines, not "thirteen lines plus the inserted one".** The ruling's
   step 5(d) parenthesis understates the function; it runs from
   `'        atomic_runs () {` to the `'        }',` that closes it, `:834-857` after the two
   edits (`:833-855` before them). I decoded the whole function by its actual bounds and
   `bash -n`-ed that.
3. **`/tmp/` is `.gitignore:64`, not `:65`.** Steps 9 and the script's own comment at
   `:256` cite `.gitignore:65`; the pattern `/tmp/` is at `:64` with its comment at `:63`
   (`grep -n '^/tmp/$' .gitignore`). The substance — that `tmp/gate-batch-2*` is ignored and
   never committed — stands, and `git status --short tmp/` after the move is empty. I did not
   touch the script's pre-existing comment: the ruling does not ask for it and it is the
   coordinator's line to correct.
4. **Every line span the ruling cites checks out; two of my own first drafts did not.**
   The sharding block does end at `:806`, `dir.list()` is at `:1123` exactly as the FACTS
   bullet says, and `build.xml:1171-1211` does span the `systemShard` macro (`:1171-1199`)
   through the `</parallel>` that closes the four shard invocations (`:1207-1210`, the
   `<parallel>` at `:1206`). Nothing in the ruling needed correcting here; I had written
   `:1121-1122` for `dir.list()` and mis-split the `.fss`/`.sh` arms in a first draft of
   section 2, and re-read the file to fix both. Recorded because the check was made, not
   because it found an error.

5. **The repair's own two inserted lines shift every later citation into the script by
   two, and three of the ruling's are among them.** The criterion replaced twelve lines with
   thirteen and `atomic_runs` gained one, so `gate2` moved from `:1157` to `:1159`, the
   "gate red twice" return from `:1159-1162` to `:1161-1164`, `atomic_runs`' own call site
   from `:857` to `:859`, its `cd` from `:835` to `:837`, and `mg_phases` from `:897` to
   `:899`; the ruling's `:809-821` for the corrected `gate_compare` already accounts for its
   own `+1`. This record cites the post-edit numbers throughout, because the file a reader
   will open is the edited one. Separately, the ruling's `:951` for the commit stage pointed
   at `commitRole`'s preamble ("The gate is green on the tree as it stands. Land it.") rather
   than at the numbered instruction that adds the gate files, which was `:953` before this
   commit and is `:955` after it; section 9 cites `:955`.

## 9. Landing this run's summary as the comparand (step 8)

`explorations/compile-ladder/climb-batch-2/gate/summary.txt` and the five files of
`gate/ladder/` (`comparison.txt` and `microgpt-comparison.txt` both 0 bytes,
`declared-moves.tsv`, `ladder.tsv`, `microgpt-phase.md`) are staged unedited in this commit.

Why here and not left to the commit stage: after this repair the workflow runs `gate2`
(`climb-batch-workflow.js:1159`), and `gate2` is `gateRole(expectedMoves)` composed from the
running process's memory. It therefore carries the criterion and the
`last_landed_summary` lookup as the process holds them, whatever the file on disk now says.
`last_landed_summary` (`:823-827`) returns the newest commit touching
`gate-baseline/summary.txt` or `climb-batch-*/gate/summary.txt`, which after this commit is
this run's file. The corpus is unchanged between the two runs, so every row compares equal
and `gate2`'s comparison is green on the merits rather than by exception. The commit stage
(`:955`) then adds `gate2`'s own rewrite of the same six files, which will differ from these
in the timing lines only. Correcting the criterion alone would not have saved `gate2`: it
would still read the stale 382-based comparand out of memory and the batch would die at
`:1161-1164` on a clean tree. That is the ruling's candidate 1, rejected alone; landing the
summary alone is candidate 2, also rejected alone; both together is candidate 5, chosen.

## 10. Clearing the way for `gate2` (step 9)

`tmp/gate-batch-2` moved to `tmp/gate-batch-2-run1`. Both are untracked (`.gitignore:64`,
`/tmp/`), so nothing in the tree changes. The reason is `gateRole` steps 1 and 3
(`:781-789`): step 1 is `mkdir -p` of the log dir, step 3 is
`cp -a default_repository/caches <log>/ladder/root/ladder-caches` and the same into
`.../pristine`. The first run's tree already holds both of those directories (checked before
the move: `tmp/gate-batch-2/ladder/root/` contained `ladder-caches`, `ladder-tmp` and
`pristine`), and `cp -a src existing-dir` copies *into* it, so a second run would have
produced `.../ladder-caches/caches` while `run-subset.sh`'s `if [ ! -d $PRISTINE ]` guard
saw `pristine` present and skipped `build_library`. On an empty path the two copies land
where the driver expects them.

One consequence worth recording: `JUDGE-gate.md` cites `tmp/gate-batch-2/testSystem.txt` and
`tmp/gate-batch-2/testFast.txt`. Those logs are now at `tmp/gate-batch-2-run1/`. They were
never tracked and never will be, so no committed citation breaks; the first run's logs are
kept rather than deleted precisely so the judge's two citations remain checkable.

## 11. What is not touched

No file of the 2012 tree, and no file outside `explorations/`, so the commit carries no
`historical:` line. No rung's source, test or record is touched: the ruling found no rung at
fault, and the three rungs' files, `JUDGE-review.md` and `REPAIR-review.md` are untouched.
No ledger row is opened or amended — the red line was machinery, not a defect of the
language or its implementation, so it has no ledger home; its home is the FACTS bullet and
this record. This repair measured no defect in Fortress itself, so the shared prefix's
three homes do not apply: nothing here is a gated assertion, an `XXX` expected-failure test
or a probe under a silent specification. The specification has no view on a test harness,
which the ruling states and section 3 of it argues.

## Captures, by path

- `explorations/compile-ladder/climb-batch-2/repair/shard-membership.sh` — the evidence
  script, the harness's rule applied to `git ls-tree`.
- `explorations/compile-ladder/climb-batch-2/repair/shard-membership.txt` — its output for
  `a0fcf0a96`, `8590d7a9e` and `HEAD`, plus the on-disk check and the added-entries diff.
- `explorations/compile-ladder/climb-batch-2/repair/workflow-script-check.txt` — the four
  validation checks of step 5, with both comparands, the two added per-row checks, the
  pre-edit and post-edit `run_bg` runs side by side, and the `bash -n` of `atomic_runs`.
- `explorations/compile-ladder/climb-batch-2/gate/summary.txt` and `gate/ladder/` — this
  run's own measurement, landed unedited as the comparand.
