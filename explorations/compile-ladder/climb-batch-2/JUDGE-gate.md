# Judge, climb batch 2: the red gate

Tree ruled on: `main` at `4aa6a5313` (the batch's three rungs `4e4b80253`, `d98024425`,
`4ed46558d`, the review's fold `162beaecc`, the judge `fd6ad55c6`, the repair `a27e27ef0`
and its fold; batch base `8590d7a9e`). The gate ran once on this tree and returned
`green: false` with an empty `failing` list and one `countsDown` line:
`COUNT DOWN system-2/SystemJUTest 97 -> 95`. Everything else it measures is clean:
`compileAll`, `testFast` (47 suites, 1422 tests, 0 failures, 0 errors), `testSystem`
(4 shards, 384 tests, 0 failures, 0 errors), 39 of 39 four-thread atomic runs `PASS`, the
85-file ladder byte-identical to its baseline, the eighteen microGPT components unmoved
(`gate/summary.txt`; `gate/ladder/comparison.txt` and `microgpt-comparison.txt` both
0 bytes). Nothing here is a build or a test run: I read, I ruled, and the numbered steps at
the end are what the repair worker executes.

**Decision: repair.** The red line is true by the letter of the criterion and false in
substance: no test was lost, none failed, and the batch added no interpreter test. The
shift is shard arithmetic over two files that entered `ProjectFortress/tests/` before the
batch base, and the gate's comparison treats each shard as a suite. The part to rework is
the gate's own criterion, not a rung; the repair changes no source file of Fortress, lands
the comparand that the workflow's second gate run needs, and corrects the criterion for
every later batch.

## 1. What the red line is, verified from the rule alone

**The criterion.** `gate_summary` writes one row per plain-formatter file under
`ProjectFortress/TEST-RESULTS/fast-*/` and `system-*/`
(`explorations/coordinator/climb-batch-workflow.js:793-800`), so `testSystem` contributes
four rows, `system-0/SystemJUTest` to `system-3/SystemJUTest`. `gate_compare` (`:809-820`)
then compares row by row against the newest landed summary and prints `COUNT DOWN` for any
row whose count fell (`:814`). The landed summary is whatever commit last touched
`gate-baseline/summary.txt` or `climb-batch-*/gate/summary.txt` (`last_landed_summary`,
`:822-826`); today that is `a0fcf0a96`'s `explorations/compile-ladder/gate-baseline/summary.txt`,
whose system rows are 95/95/97/95 (`:49-52`).

**The sharding.** `FileTests.interpreterSuite` lists the directory with `dir.list()`
(`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:1122-1123`), and
when `fortress.suite.shard=i/n` is set it sorts the names and keeps index `j` when
`j % n == i` (`:790-806`, the sort at `:799`, the keep at `:801-803`). The root `build.xml`
wires it: the `systemShard` macro (`:1171-1195`, the property at `:1185`) and the four
shards `0/4` to `3/4` under `<parallel>` in the `testSystem` target (`:1197-1211`). Then the
loop at `:811-840` counts a test for every kept `.fss` (`:824-831`) and `.sh` (`:832-835`),
and prints `Not compiling file` for everything else (`:817-821`, `:836-839`).

**The consequence.** Inserting one entry into the sorted list moves every entry that sorts
after it one shard along; inserting two moves them two along. Per-shard counts are a
function of the corpus's sorted order, not of test health, and only their sum is
comparable across a change to the corpus.

**The reconstruction.** Applying that rule to `git ls-tree --name-only <rev> ProjectFortress/tests/`
(the top-level entries, which is what `dir.list()` returns), sorted in C order (Java's
`String.compareTo` on these ASCII names), for the three revisions that matter:

| revision | entries | shard 0 | shard 1 | shard 2 | shard 3 | sum |
|---|---|---|---|---|---|---|
| `a0fcf0a96` (the landed baseline's commit) | 387 | 95 | 95 | 97 | 95 | 382 |
| `8590d7a9e` (this batch's base) | 389 | 98 | 96 | 95 | 95 | 384 |
| `4aa6a5313` (HEAD) | 389 | 98 | 96 | 95 | 95 | 384 |

The first row is the landed baseline's 95/95/97/95 exactly (`gate-baseline/summary.txt:49-52`;
its provenance line `:59` says it was taken at `80eda984b` plus its own change, and
`git log 80eda984b..a0fcf0a96 -- ProjectFortress/tests` is empty, so the corpus is the
same). The second and third rows are this gate's 98/96/95/95 exactly
(`climb-batch-2/gate/summary.txt:49-52`), and the run's own `Shard i/4: 98|97|97|97 of 389 files`
lines (`tmp/gate-batch-2/testSystem.txt:14,23,28,30`) are the "files kept" column of the
same reconstruction, before the non-test entries (`presidents`, `printing`, `a.b`,
`poem.txt`, `sample.fa`) are dropped. The on-disk listing of `ProjectFortress/tests` at
HEAD is identical to the tracked one (389 entries, `ls -A` against `git ls-tree`).

**The two files.** `diff` of the two `ls-tree` listings, `a0fcf0a96` against HEAD, is two
additions and no removal: `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss` and
`ArrayScalarExtension.fss`, both from `02d09a39f` ("The library's scalar extension
generalised and its exclusion tower closed", 2026-09-19 20:24 UTC), which is after
`a0fcf0a96` (17:06 UTC) and an ancestor of `8590d7a9e`. They sort at positions 5 and 6, so
every entry from sorted index 4 on moved two shards along, which is what turns 95/95/97/95
into 98/96/95/95. The listings at `8590d7a9e` and at HEAD are identical: this batch added
no file to `ProjectFortress/tests/` and removed none (its tests went to `compiler_tests/`
and `library_tests/`, which is why `CompilerJUTest` 652 -> 659 and `LibraryJUTest` 77 -> 83
are the only other count changes between the two summaries, both up).

So the line would have printed on the batch base itself, before any rung ran. It is a stale
comparand, produced by a landing (`02d09a39f`) that added interpreter tests outside a batch
and therefore landed no summary, read through a criterion that does not know the shards are
one suite. No `.test` file and no `tests=` line went missing: the interpreter corpus has no
`.test` files at all (its enumeration is the directory, `FileTests.java:811-840`), and the
enumeration is unchanged since the base.

## 2. Why "red by the letter" still needs a repair, and what the repair can reach

The workflow's flow after this ruling is fixed (`climb-batch-workflow.js:1149-1163`): a
decision other than `repair` ends the batch unlanded at `:1153-1155` ("gate red, judge did
not order a repair"); `repair` runs the repair worker (`:1156`) and then a second gate,
`gate2` (`:1157`), which must be green or the batch ends at `:1159-1162` ("gate red twice").
`gate2` is `gateRole(expectedMoves)` composed from the running process's memory, so it
carries today's `gate_compare` and today's `last_landed_summary` whatever the file on disk
says by then. The repair therefore has exactly one lever for `gate2` — the comparand: the
newest commit touching `climb-batch-*/gate/summary.txt` — and one lever for every later
batch — the criterion in the script.

Both levers are pulled. Landing this run's `gate/summary.txt` (and the `gate/ladder/` files
of the same run, as the commit stage would, `:951`) makes `gate2` compare 98/96/95/95
against 98/96/95/95 on an unchanged corpus; correcting `gate_compare` to sum the
`system-<i>` rows makes the next corpus change, which the interpreter-defect batch the
record already plans will bring, compare 384 against 384 plus whatever it adds instead of
going red on the same arithmetic. I dry-ran the corrected function over the two summaries
on this box's `mawk 1.3.4` (the awk `gate2` will run): baseline against this run prints
nothing and exits 0; self-compare prints nothing; `system-0` lowered 98 -> 95 prints
`COUNT DOWN system/SystemJUTest 384 -> 381`; `fast-library` lowered 83 -> 82 prints
`COUNT DOWN fast-library/LibraryJUTest 83 -> 82`; `BitsJUTest` removed prints
`SUITE GONE fast-misc/BitsJUTest 2 -> absent`; the `system-3` row removed prints
`COUNT DOWN system/SystemJUTest 384 -> 289`. The current function over the same two
summaries prints the one red line the gate reported and nothing else. The corrected
function keeps `RED` and `EMPTY` per row, so a shard with a failure is still named by its
own row. The thirteen JS lines prescribed in step 3 below were decoded here exactly as the
script's string literals will produce them (`node` over the array, Node 22) and sourced,
and gave those six outputs; the wrapped `node --check` of step 5(b) passes today's file and
fails a copy with one stray parenthesis. The worker repeats both, but the texts are not
guesses.

## 3. The decision, and the alternatives

The language specification has no view on a test harness; this is a decision about the
batch machinery under Pavol's standing rule for a red gate (rework the source of the
conflict holistically; dropping a rung only when its approach is wrong). No rung's
approach or code is at fault, so `drop` would be wrong and, at `:1153`, terminal. `stop` is
for the reserved forks and there is none. The candidates:

1. **Correct the criterion only.** `gate2` still runs the in-memory criterion against the
   stale comparand and the batch dies at `:1160` with a clean tree. Rejected alone.
2. **Land this run's summary only.** `gate2` is green; the next commit that adds a file to
   `ProjectFortress/tests/` goes red the same way. Rejected alone.
3. **Edit the landed baseline** to 98/96/95/95. Falsifies a landed record. Rejected.
4. **Compare test names, not counts** (the `interpret .../tests/<Name> OK` lines of the
   four plain-formatter files, union against union). Stronger than a sum — it would catch a
   removal masked by an addition — but it changes the landed summary's format and every
   reader of it. Deferred and recorded for Pavol; a removed test is in any case a stop
   condition the skeptics and the review look for ("deleting a test", `judgeRole`, `:531`).
5. **Both 1 and 2**, with the shard-sum comparison as the criterion. Chosen.

Two further defects go into the same file because the gate stage measured them and they
are in the same shell text the criterion lives in:

- `run_bg` (`:309-311`): with a command string of the form `cd X && a && b`, the
  redirection `> '$1'` binds to `b` alone and a relative log path is resolved after the
  `cd`. Verified here: the current form leaves a log holding only `EXIT=1` for
  `cd /tmp && echo first && echo second && false`; wrapping the string in a subshell,
  `( $2 ) > '$1' 2>&1`, captures `first`, `second`, `EXIT=1`, resolves a relative log path in
  the caller's directory, and tolerates a trailing `;` in the string (which `{ $2 ; }` would
  not). One definition site; `wait_for` (`:312-317`) has no `cd`.
- `atomic_runs` (`:833-855`): `O="$1"` at `:834`, then `cd "$FORTRESS_HOME/ProjectFortress"`
  at `:835`, and the gate role calls it with `GATE_DIR`, which is relative (`:255`, `:857`).
  The gate stage passed an absolute path by hand; the function should resolve its argument
  before the `cd`. Site count for "a relative path used after a `cd`" in the script's shell
  text: one, this one (`:835` is the script's only `cd` inside a function).

## 4. Who was right and who was wrong, by citation

There is no rung worker and no skeptic behind this line: none of the three rungs touched
`ProjectFortress/tests/`, and no claim in their reports, skeptic verdicts or records bears
on it. The parties are the gate stage and the machinery.

- **The gate stage.** Right in every load-bearing particular: the sharding rule and its
  citation (`FileTests.java:790-805`; the block ends at `:806`), the root `build.xml`
  wiring (`:1171-1210`), the corpus diff (two additions, zero removals, both from
  `02d09a39f`), the ancestry (`02d09a39f` is an ancestor of `8590d7a9e`), the totals
  (382 -> 384 with 0 failures), and the judgement that this is arithmetic and not a lost
  test. Right, too, to return `green: false` by the letter and hand the evidence up rather
  than decide: `:909` makes any `COUNT DOWN` red and the stage is not the place to
  reinterpret it. One imprecision: "inserting files shifts every later file one shard
  along" — two insertions shift by two, which is what the reconstruction shows. Its two
  operational notes (`run_bg`, `atomic_runs`) are both real and both verified above.
- **The criterion** (`climb-batch-workflow.js:809-820`, and its description at
  `climb-batch-workflow.md:46`). Wrong for sharded suites: it was validated on
  2026-09-19 against an altered copy that lowered a `fast-*` row and removed one
  (`postmortem-2026-09-19/user-messages.md:1362`), and never against a corpus change under
  the shards, because the corpus did not change between its baseline and its landing. The
  gate role's own gloss at `:828` ("it almost always means a .test file or a tests= line
  went missing") is right for the `.test`-driven corpora and does not apply to the
  interpreter corpus, which has no `.test` files.
- **The earlier judge and repair of this batch** (`JUDGE-review.md`, `REPAIR-review.md`).
  Nothing here touches them; their corrections stand, and the gate's independent measurement
  of `abortTest` agrees with the corrected record verbatim (`gate/ladder/declared-moves.tsv`).
- **The three rungs.** Untouched by this ruling. Their tests are the 7 + 6 the compiler and
  library suites gained; the batch's `XXX` files behaved as their records say
  (`XXXExportVarRungXFrozen`, `XXXExportVarRungXLinked` "Saw expected failure";
  `XXXTryAtomicCodegenRungB` "OK Saw expected exception", `tmp/gate-batch-2/testFast.txt`).

## 5. For Pavol

- The batch's gate went red on its own machinery, not on the tree: every suite green,
  every atomic run green, the ladder byte-identical. The one red line is the per-shard
  comparison of `testSystem` after `02d09a39f` (landed outside a batch, 2026-09-19 evening)
  added two interpreter tests between the landed baseline and the batch base. This is a
  decision taken by the judge with no specification to consult: the criterion is changed to
  compare the four shards by their sum, and this run's summary is landed by the repair so
  that the workflow's second gate run has a comparand from the current corpus. The
  alternatives are in section 3; the name-set comparison (candidate 4) is the stronger
  criterion and is deferred, not rejected.
- The repair edits `explorations/coordinator/climb-batch-workflow.js`, the coordinator's
  file, in three places (the criterion and the two path traps the gate stage measured); the
  running workflow is unaffected by the edit and later batches pick it up. If that file is
  Pavol's to change and not a repair worker's, the edit is one commit to revert and the
  landed summary alone still carries the batch.
- Any landing outside a batch that adds to `ProjectFortress/tests/` will keep shifting the
  shards; with the sum comparison that is harmless, and until then it is a red gate for the
  next batch.

## Instructions for the repair worker

Work in `/home/user/fortress` on `main`. `source experiment/env.sh` once per shell and
check `echo $FORTRESS_HOME` prints `/home/user/fortress`. **No source file of Fortress
changes, so no `ant compileAll`, no `fortress compile`, no `ant testFast`, no
`ant testSystem`, no ladder subset**: the gate stage re-runs everything after you. Every
capture goes under `explorations/compile-ladder/climb-batch-2/repair/` and is named `.txt`
(a script you commit may be `.sh`, as `rung-tryatomic/run-subset.sh` is). Scratch work goes
in your scratchpad directory, not in the tree. Do not touch the `wip/` worktrees. Do not push.

1. **State check.** `git log --oneline 8590d7a9e..HEAD` must end at this ruling's commit on
   top of `4aa6a5313`; `git status --short` must show only `?? explorations/compile-ladder/climb-batch-2/gate/`.
   If anything else is modified, stop and report it.

2. **Reconstruct the shard membership and commit the evidence.** Write
   `explorations/compile-ladder/climb-batch-2/repair/shard-membership.sh` with exactly this
   content, then run
   `bash explorations/compile-ladder/climb-batch-2/repair/shard-membership.sh a0fcf0a96 8590d7a9e HEAD > explorations/compile-ladder/climb-batch-2/repair/shard-membership.txt`
   from `/home/user/fortress`:

   ```
   #!/bin/bash
   # testSystem shard membership by FileTests.java:790-806 and :811-840: dir.list() of ProjectFortress/tests, sorted, index j kept by shard j % 4, a test per kept .fss or .sh
   cd "$(git rev-parse --show-toplevel)" || exit 1
   for rev in "$@" ; do
       echo "== $rev"
       git ls-tree --name-only "$rev" ProjectFortress/tests/ | sed 's|.*/||' | LC_ALL=C sort |
       awk -v N=4 '{
           j = NR - 1 ; s = j % N ; kept[s]++
           if ($0 ~ /Syntax\.fss$/ || $0 ~ /DynamicSemantics\.fss$/ || $0 ~ /Satisfiability\.fss$/ || $0 ~ /GenomeUtil/) { skip[s]++ ; next }
           if ($0 ~ /^\./) { hidden[s]++ ; next }
           if ($0 ~ /\.fss$/ || $0 ~ /\.sh$/) { tests[s]++ } else { other[s]++ ; names[s] = names[s] " " $0 }
         }
         END { printf "entries %d\n", NR
               for (s = 0 ; s < N ; s++) printf "shard %d: %d files kept, %d tests, %d filtered, %d hidden, %d other(%s)\n", s, kept[s], tests[s], skip[s], hidden[s], other[s], names[s]
               printf "sum %d\n", tests[0] + tests[1] + tests[2] + tests[3] }'
   done
   echo "== on-disk top-level entries of ProjectFortress/tests against the tracked ones at HEAD"
   diff <(ls -A ProjectFortress/tests | LC_ALL=C sort) <(git ls-tree --name-only HEAD ProjectFortress/tests/ | sed 's|.*/||' | LC_ALL=C sort) && echo IDENTICAL
   echo "== the entries added between a0fcf0a96 and HEAD"
   diff <(git ls-tree --name-only a0fcf0a96 ProjectFortress/tests/ | LC_ALL=C sort) <(git ls-tree --name-only HEAD ProjectFortress/tests/ | LC_ALL=C sort)
   ```

   Expected in the capture: `a0fcf0a96` 387 entries, tests 95/95/97/95, sum 382;
   `8590d7a9e` and `HEAD` 389 entries, tests 98/96/95/95, sum 384; `IDENTICAL`; and the
   last diff exactly `4a5,6` with the two `Array*.fss` lines. If any number differs, stop
   and report: the ruling rests on them.

3. **Correct the criterion.** In `explorations/coordinator/climb-batch-workflow.js`, replace
   lines `809-820` (the `gate_compare` function, from `'        gate_compare () {` to the
   line `'        }',` that closes it) with these thirteen lines, verbatim, including the JS
   quoting (`\'` for a shell single quote, `\\t` for a tab in the awk source):

   ```
   '        gate_compare () {                 # gate_compare <last-landed-summary> <this-summary>; prints the red lines, exit 1 if any. The system-<i> rows are one suite split by sorted index (FileTests.java:790-806): a file added to tests/ moves every later file along the shards, so those rows are compared by their sum',
   '            awk -F\'\\t\' \'',
   '              function key(s) { sub("^system-[0-9]+/", "system/", s) ; return s }',
   '              FNR == NR { if ($0 !~ /^#/ && NF == 5) base[key($1)] += $2 ; next }',
   '              $0 !~ /^#/ && NF == 5 {',
   '                  k = key($1) ; seen[k] = 1 ; cur[k] += $2',
   '                  if ($3 + 0 > 0 || $4 + 0 > 0)              { print "RED\\t" $1 "\\t" $3 " failures, " $4 " errors" ; bad++ }',
   '                  if ($2 + 0 == 0)                           { print "EMPTY\\t" $1 ; bad++ }',
   '              }',
   '              END { for (k in cur) if ((k in base) && cur[k] < base[k]) { print "COUNT DOWN\\t" k "\\t" base[k] " -> " cur[k] ; bad++ }',
   '                    for (s in base) if (!(s in seen)) { print "SUITE GONE\\t" s "\\t" base[s] " -> absent" ; bad++ }',
   '                    if (bad) exit 1 }\' "$1" "$2"',
   '        }',
   ```

4. **The two path traps, same file.** Line `310` (inside `run_bg`) currently reads
   `'        nohup bash -c "$2 > \'$1\' 2>&1; echo EXIT=\\$? >> \'$1\'" >/dev/null 2>&1 &',`;
   change `"$2 > \'$1\'` to `"( $2 ) > \'$1\'` and nothing else on the line, and extend the
   comment on line `309` to
   `'    run_bg () {            # run_bg <logfile> <command string>; the subshell makes the redirection cover the whole string, so a cd inside it neither escapes the log nor moves a relative log path',`.
   Then, after the `local O="$1" p d i out rc` line of `atomic_runs` (line `834` before your
   step-3 edit, one line later after it), insert
   `'            case "$O" in /*) ;; *) O="$PWD/$O" ;; esac     # resolve before the cd: the gate passes GATE_DIR, which is relative to the main tree',`.

5. **Validate the script without running it.** Four checks, captured together to
   `repair/workflow-script-check.txt`:
   (a) `grep -c` for the backtick character (U+0060) over
   `explorations/coordinator/climb-batch-workflow.js` must print `1` — the pre-existing one
   at the `mg_phases` line (was `:897`), none added (the file's rule, `:22`).
   (b) Syntax, by the method of 2026-09-19 (`postmortem-2026-09-19/user-messages.md:1362`,
   `:1491`): build a wrapped copy in your scratchpad —
   `{ printf '(async () => {\nconst args = { base: "x" };\n' ; sed 's/^export const meta/const meta/' explorations/coordinator/climb-batch-workflow.js ; printf '\n})();\n' ; } > $S/wrapped.js && node --check $S/wrapped.js`
   — must exit 0; then show the method bites by appending a stray `)` to a second copy and
   confirming `node --check` fails on it.
   (c) Decode the edited shell text exactly as JS will produce it and run it. For the
   `gate_compare` lines (`809-821` after step 3):
   `{ printf 'const L = [\n' ; sed -n '809,821p' explorations/coordinator/climb-batch-workflow.js ; printf '];\nprocess.stdout.write(L.join("\\n") + "\\n");\n' ; } > $S/decode.js && node $S/decode.js > $S/gate_compare.sh`,
   then `source $S/gate_compare.sh` and run, with `B=explorations/compile-ladder/gate-baseline/summary.txt`
   and `C=explorations/compile-ladder/climb-batch-2/gate/summary.txt`: `gate_compare $B $C`
   (expected: no output, exit 0); `gate_compare $C $C` (none, 0); `system-0` lowered
   98 -> 95 in a copy of `C` (expected `COUNT DOWN<TAB>system/SystemJUTest<TAB>384 -> 381`,
   exit 1); `fast-library` lowered 83 -> 82 (`COUNT DOWN<TAB>fast-library/LibraryJUTest<TAB>83 -> 82`);
   the `fast-misc/BitsJUTest` row deleted (`SUITE GONE<TAB>fast-misc/BitsJUTest<TAB>2 -> absent`);
   the `system-3` row deleted (`COUNT DOWN<TAB>system/SystemJUTest<TAB>384 -> 289`). Also
   decode the pre-edit function from `git show HEAD:explorations/coordinator/climb-batch-workflow.js | sed -n '809,820p'`
   the same way and show it prints `COUNT DOWN<TAB>system-2/SystemJUTest<TAB>97 -> 95` on
   `$B $C`: that is the red line, reproduced.
   (d) Decode `run_bg` (lines `309-311`) the same way, source it, and run
   `run_bg $S/rb.txt "cd /tmp && echo first && echo second && false"`; after `sleep 1`,
   `$S/rb.txt` must hold `first`, `second`, `EXIT=1`. Decode `atomic_runs` (its thirteen
   lines plus the inserted one) and run `bash -n` on the decoded text only; do not run it.

6. **The description.** `explorations/coordinator/climb-batch-workflow.md:46`: after the
   sentence ending "is red and named (gap 1).", insert: "The `system-<i>` rows are compared
   by their sum, not one by one: `testSystem` is one suite sharded by sorted index
   (`FileTests.java:790-806`), so a file added to `ProjectFortress/tests/` moves every later
   file along the shards; climb batch 2's gate went red on exactly this after `02d09a39f`
   added two interpreter tests between the baseline and the batch base
   (`compile-ladder/climb-batch-2/JUDGE-gate.md`). `run_bg` runs its command string in a
   subshell so a `cd` inside it cannot escape the log, and `atomic_runs` resolves its
   out-file before its own `cd` (both measured by that batch's gate stage)."

7. **FACTS.** In `explorations/coordinator/FACTS.md`, after the bullet at `:133` (the last
   bullet of "The compile-path ladder baseline", which begins "**A thrown `CompilerError`
   takes a third path"), add one bullet:
   "- **`testSystem`'s four shards are one suite split by sorted index, so per-shard counts
   are not comparable across a change to the interpreter corpus and only their sum is**
   (2026-09-20, the judge on climb batch 2's red gate,
   `compile-ladder/climb-batch-2/JUDGE-gate.md`). `FileTests.java:790-806` sorts
   `dir.list()` of `ProjectFortress/tests/` (`:1123`) and keeps index `j` when `j % 4 == i`
   (root `build.xml:1171-1211`, the `systemShard` macro); a file added to the directory
   moves every entry that sorts after it along the shards. The landed baseline's
   95/95/97/95 (382, `compile-ladder/gate-baseline/summary.txt:49-52`) is the corpus at
   `a0fcf0a96` (387 entries) and climb batch 2's 98/96/95/95 (384) is the corpus at
   `8590d7a9e` and at its HEAD (389 entries: `ArrayOperatorsBesideLibrary.fss` and
   `ArrayScalarExtension.fss`, added by `02d09a39f` at sorted positions 5 and 6), both
   reproduced from the rule alone by `compile-ladder/climb-batch-2/repair/shard-membership.sh`
   (`shard-membership.txt`); the batch itself added no file to `tests/`. `gate_compare`
   (`coordinator/climb-batch-workflow.js:809-821`) now sums the `system-<i>` rows before
   comparing; a count that falls on one shard while the sum holds is not red, a count that
   falls on the sum is."

8. **Land the comparand.** `git add explorations/compile-ladder/climb-batch-2/gate/summary.txt explorations/compile-ladder/climb-batch-2/gate/ladder/`
   — the five ladder files, two of them 0 bytes, are part of the same run and stay with the
   summary as the commit stage would keep them (`climb-batch-workflow.js:951`). Do not edit
   any of them. Say in `REPAIR-gate.md` why this is in the repair and not left to the commit
   stage: `gate2` (`:1157`) runs the criterion the running process holds in memory against
   `last_landed_summary` (`:822-826`), which after this commit is this file; the corpus is
   unchanged, so the comparison is equal on every row; the commit stage will then add
   `gate2`'s rewrite of the same files, which differs in timing lines only.

9. **Clear the way for `gate2`.** `mv tmp/gate-batch-2 tmp/gate-batch-2-run1` (untracked,
   `.gitignore:65`), so that `gate2`'s `mkdir -p` and its two `cp -a` of the library cache
   (`gateRole` steps 1 and 3, `:781-789`) land on empty paths rather than nesting under the
   first run's copies. Say so in `REPAIR-gate.md`.

10. **Write `explorations/compile-ladder/climb-batch-2/REPAIR-gate.md`**: what changed and
    why, in this order, every citation `file:line`, the captures by path, every deviation
    from these steps with the primary source that forced it. Then run the prefix's
    tracked-path loop over `REPAIR-gate.md` and `JUDGE-gate.md` after staging and fix every
    `MISSING`/`UNTRACKED` line (the `gate/` paths must come out tracked once step 8 is
    staged).

11. **One commit on `main`, locally, not pushed**: the script, the description, FACTS, the
    `gate/` files, `repair/shard-membership.sh`, the two `.txt` captures and
    `REPAIR-gate.md`. Title: "Repair after the gate's judge: shards compared by their sum,
    this run's summary landed as the comparand". No `historical:` line — no file of the 2012
    tree is touched, and no file outside `explorations/`. No model identifier. End with
    exactly the two footer lines of the prefix. Retry after a few seconds on an `index.lock`
    error, up to four times.
