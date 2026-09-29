<!-- The cleaning of the committed scratch of the landed climb batches, 2026-09-29: the rule of synthesis.md section 2(d) as the coordinator's brief put it, how it was applied, the counts by folder, and every borderline case kept or removed with its reason, for Pavol's review. Written by the worker that ran it; the lists and scripts that built it were scratch and are not committed. -->

# The cleaning of the landed batches' scratch

The commit that adds this file removes 4,366 files, 11.7 MB, from the working tree: 4,321 under `explorations/compile-ladder/` and the 45 under `explorations/reviews/batch-*-review/`. It keeps 4,599 of the 8,965 files in those folders. Nothing else is touched, and no gate was run for it (synthesis 2(d)): batch 7b's gate is the proof. History keeps every file. A removed file is read with `git show <commit>^:<path>`, where `<commit>` is the commit that added this file (`git log --diff-filter=A --format=%h -- explorations/coordinator/postmortem-2026-09-29/cleanup.md`).

## The rule as applied

The candidates: every tracked file under `explorations/compile-ladder/` and under `explorations/reviews/batch-*-review/`.

Kept whatever cites it:

- every `.md` file, meaning the reports (`REPORT.md`, `RECORD.md`, `SKEPTIC*.md`, `JUDGE*.md`, `REPAIR*.md`, `NOTE*.md`, `record.md`, decision records) and the written notes (`CLIMB.md`, the plans' `P1.md` to `P5.md`, `PROBE-K.md`, `PROBE-Q.md`, the two histories and similar): 236 files;
- the gates' tables, every `gate/` folder under a batch or repair folder: 85;
- `gate-baseline/`: 11 besides its `.md`; `baseline-2026-09-19/` whole: 535 besides its `.md`.

Kept by citation. A file is cited when its path, or a folder holding it, appears in a text file that is kept. Citers are tracked `.md`, `.js`, `.py`, `.sh`, `.txt`, `.tex`, `.fss`, `.fsi`, `.test` and `.tick` files. The work started from the live records:

- all of `explorations/coordinator/`;
- `explorations/fortress-gap-ledger.md`;
- the handover and its history;
- `CLAUDE.md` and `explorations/protocol.md`;
- everything under `ProjectFortress/`;
- `Specification/`, `Specification-1.0-frozen/` and `Documentation/Specification/`;
- batch 7b's four briefings, as `facts-extract.sh` prints them in full from `plan-7b/manifest/lists7b.py`'s keys.

A path counts in any of three forms:

- from the repository root;
- relative to the citing file's folder, and inside the candidate trees to its parents up to the rung, batch or plan folder;
- anchored on a distinctive folder name, such as `compile-ladder/…`, `rung-…/…`, `climb-batch-…/…` or `batch-…-review/…`.

A bare filename given on the same line after a path counts in that path's folder, as the ledger writes its reproductions. A glob counts file by file, within one path component, and only when its last component holds a literal.

The iteration: a kept tool (`.sh`, `.py`, `.js`) or a kept note that is not a report keeps what it names, and so does every document a 7b briefing's `doc:` key names, whole. The work repeated until nothing more was added.

Three readings decide most of the count; each is the synthesis's where the brief leaves room:

1. **A report's own citations are not followed.** The synthesis's line is "a file only a report cites is removed, and the report's citation is read from history". If they were followed, as the brief's "a kept file's own citations" could be read, nearly everything would stay: every rung's `REPORT.md` or `SKEPTIC.md` names its `probes/` folder whole. That reading keeps 8,824 of the 8,965 and removes 141, so it cannot be the rule the synthesis estimated at about 7K removed. This choice decides 4,233 files.
2. **Only tools and notes are followed, not captures.** A capture a live record cites is kept, but the paths inside it are data, not citations. For example, `rung-size-runtime/probes/ladder-compare-*.txt` names four ladder folders of 171 files each. Following captures would keep 1,343 more.
3. **Naming a rung, batch or plan folder itself does not keep all of it.** It points at the folder's reports, which stay. 35 such folders are named that way by a live record (`rung-size-runtime/`, `rung-flat-tower/` and so on). Any deeper folder named keeps everything under it, for example `rung-generic-runtime/probes/` in `CLIMB-BATCH-7.md`.

Tokens that begin with a shell variable, such as `$FH/…` or `$OUT/raw`, are followed only for the literal part after the variable: `…/explorations/compile-ladder/rung-x/probes` counts, a bare `$OUT/raw` does not. Tab- and comma-separated files are not citers: the tool-call logs of the reviews (`calls.csv`, `gather_calls.tsv`, `tool-calls.tsv`) name every path a worker opened.

The removal went folder by folder, `git rm -q --pathspec-from-file=<list>` with explicit files, never a directory.

## Counts by folder

| folder | kept | removed | bytes removed |
|---|---:|---:|---:|
| `compile-ladder (root files)` | 8 | 1 | 17,546 |
| `compile-ladder/after` | 509 | 0 | 0 |
| `compile-ladder/baseline-2026-09-19` | 538 | 0 | 0 |
| `compile-ladder/climb-batch-1` | 1 | 0 | 0 |
| `compile-ladder/climb-batch-2` | 16 | 2 | 301 |
| `compile-ladder/climb-batch-3` | 9 | 0 | 0 |
| `compile-ladder/climb-batch-3.5` | 18 | 4 | 2,999 |
| `compile-ladder/climb-batch-4` | 7 | 0 | 0 |
| `compile-ladder/climb-batch-5` | 17 | 17 | 47,468 |
| `compile-ladder/climb-batch-6` | 32 | 1 | 2,782 |
| `compile-ladder/climb-batch-6.5` | 23 | 11 | 58,299 |
| `compile-ladder/climb-batch-6.5b` | 15 | 1 | 916 |
| `compile-ladder/climb-batch-6b` | 12 | 1 | 1,251 |
| `compile-ladder/climb-batch-7` | 9 | 4 | 1,989 |
| `compile-ladder/climb-batch-7C` | 24 | 7 | 9,248 |
| `compile-ladder/climb-batch-7R` | 17 | 17 | 51,598 |
| `compile-ladder/climb-batch-N` | 43 | 27 | 35,306 |
| `compile-ladder/gate-baseline` | 12 | 0 | 0 |
| `compile-ladder/plan-6.5` | 62 | 1 | 337 |
| `compile-ladder/plan-7b` | 110 | 0 | 0 |
| `compile-ladder/plan-7c` | 5 | 0 | 0 |
| `compile-ladder/plan-7r` | 5 | 0 | 0 |
| `compile-ladder/plan-n` | 84 | 0 | 0 |
| `compile-ladder/raw` | 484 | 0 | 0 |
| `compile-ladder/repair-batch` | 1 | 0 | 0 |
| `compile-ladder/repair-r1-atomic-static` | 73 | 56 | 90,251 |
| `compile-ladder/repair-r2-literal-wrap` | 36 | 97 | 43,727 |
| `compile-ladder/rung-analyzer-memo` | 44 | 0 | 0 |
| `compile-ladder/rung-comprises-checker` | 43 | 17 | 28,215 |
| `compile-ladder/rung-default-rendering` | 43 | 85 | 48,324 |
| `compile-ladder/rung-exclusion-relax` | 5 | 16 | 25,643 |
| `compile-ladder/rung-exclusion-remainder` | 159 | 6 | 5,465 |
| `compile-ladder/rung-export-var` | 28 | 31 | 31,131 |
| `compile-ladder/rung-flat-tower` | 47 | 168 | 1,489,497 |
| `compile-ladder/rung-generic-runtime` | 116 | 0 | 0 |
| `compile-ladder/rung-inference-checker` | 71 | 194 | 1,521,362 |
| `compile-ladder/rung-inference-walk` | 40 | 122 | 506,466 |
| `compile-ladder/rung-int-conversions` | 24 | 37 | 55,206 |
| `compile-ladder/rung-int-semantics-compiled` | 40 | 37 | 99,927 |
| `compile-ladder/rung-int-semantics-walk` | 53 | 64 | 75,859 |
| `compile-ladder/rung-integer-minmax` | 27 | 322 | 668,321 |
| `compile-ladder/rung-integral-ops` | 103 | 10 | 10,773 |
| `compile-ladder/rung-interp-coercion` | 129 | 13 | 10,472 |
| `compile-ladder/rung-library-comments` | 64 | 0 | 0 |
| `compile-ladder/rung-library-defects` | 29 | 108 | 82,191 |
| `compile-ladder/rung-maybe` | 31 | 42 | 109,240 |
| `compile-ladder/rung-nat-checker` | 89 | 385 | 774,899 |
| `compile-ladder/rung-overflow-natives` | 120 | 43 | 102,124 |
| `compile-ladder/rung-ranges-zz32` | 60 | 166 | 524,769 |
| `compile-ladder/rung-result-bounds` | 29 | 92 | 256,627 |
| `compile-ladder/rung-round-half-even` | 24 | 32 | 74,301 |
| `compile-ladder/rung-rr32-sibling` | 32 | 186 | 310,737 |
| `compile-ladder/rung-rr64-functions` | 39 | 28 | 42,173 |
| `compile-ladder/rung-shift-count` | 54 | 0 | 0 |
| `compile-ladder/rung-size-range` | 144 | 488 | 368,601 |
| `compile-ladder/rung-size-runtime` | 63 | 816 | 224,271 |
| `compile-ladder/rung-spec-comprises` | 34 | 19 | 17,702 |
| `compile-ladder/rung-spec-inference` | 44 | 78 | 121,207 |
| `compile-ladder/rung-spec-integer-rules` | 28 | 57 | 146,503 |
| `compile-ladder/rung-spec-numbers` | 31 | 59 | 2,335,164 |
| `compile-ladder/rung-spec-ranges` | 31 | 28 | 30,071 |
| `compile-ladder/rung-spec-route-a` | 61 | 43 | 17,538 |
| `compile-ladder/rung-tabulate` | 24 | 68 | 265,952 |
| `compile-ladder/rung-timing` | 20 | 15 | 22,587 |
| `compile-ladder/rung-tryatomic` | 18 | 30 | 44,528 |
| `compile-ladder/rung-unknown-size-arm` | 42 | 53 | 57,703 |
| `compile-ladder/rung-walk-overflow` | 37 | 5 | 19,152 |
| `compile-ladder/rung-wrap-operators` | 114 | 11 | 39,085 |
| `compile-ladder/rung0` | 3 | 1 | 1,379 |
| `compile-ladder/rung1` | 26 | 3 | 3,609 |
| `compile-ladder/rung2` | 1 | 46 | 140,921 |
| `compile-ladder/rung3` | 27 | 2 | 2,695 |
| `compile-ladder/rung4` | 65 | 2 | 3,205 |
| `compile-ladder/rung5` | 11 | 2 | 2,666 |
| `compile-ladder/rung6` | 11 | 32 | 15,498 |
| `compile-ladder/rung7` | 39 | 2 | 2,698 |
| `compile-ladder/rung8` | 12 | 10 | 4,348 |
| `reviews/batch-6.5b-review` | 0 | 15 | 76,923 |
| `reviews/batch-7C-review` | 0 | 10 | 369,587 |
| `reviews/batch-N-review` | 0 | 20 | 157,111 |
| **all** | **4599** | **4366** | **11,708,444** |

Kept, by reason:

| reason | files |
|---|---:|
| cited by a live record | 2,938 |
| cited by a test (`ProjectFortress/library_tests/AssertRung4.fss` names `explorations/compile-ladder/raw/tests/`) | 452 |
| cited by a kept tool or note (iteration) | 249 |
| named by a 7b briefing and cited by nothing else | 2 |
| the reports and notes (`.md`) | 236 |
| `baseline-2026-09-19/` (outside its `.md`) | 535 |
| the gates' tables | 85 |
| `gate-baseline/` | 11 |
| borderline, kept (below) | 91 |

## Borderline cases

Kept:

- **What the post-mortem's own measurements cite: 137 files, 9.1 MB.** `characterization.md` (124 of them), `measures-6.5b.md`, `synthesis.md` and `archaeology-testing.md` name these files as examples of the scratch. Among them are eight LaTeX build logs, `rung-rr32-sibling/probes/build/edit-tex.txt` the largest at 0.8 MB. The brief makes all of `explorations/coordinator/` live, so they stay. On the stricter reading, the synthesis's list of live records (FACTS, POSITIONS, PLAN, INDEX, the handover, the `CLIMB-BATCH` records, the script, its manual and tools), they go. Also in this group are a handful named only by older coordinator notes: `oracle-headers.md`, `climb-batch-N-review.md`, `process-decisions-review-1.md`, `batched-climb-review.md`. The list is at the end.
- **LaTeX build logs a live record cites: 24 files, 18.1 MB,** the largest kept group by bytes. Most are cited by `FACTS.md` or `FACTS-history.md` as the evidence of a specification build (the `probes/build/` folders of the specification rungs, `climb-batch-N/build/gather-tex.txt`, `climb-batch-7C/build/`), and the rest by the post-mortem's measurements above. The 3 logs no live record cites are removed (2.0 MB). Removing the rest means pointing the FACTS lines at the landing commit instead of the log.
- **The first ladder of 2026-09-17 at the root of `compile-ladder/`**: `after/` (509 files, 0.9 MB), `raw/` (484, 0.7 MB), `ladder.tsv`, `results.tsv`, `summary.txt` and the three scripts. `FACTS-history.md` and the handover cite `compile-ladder/after/`, `coordinator/ladder-workflow.js` names it, and the test `AssertRung4.fss` names `raw/tests/`. `ladder.log`, which nothing cites, is removed.
- **`plan-7b/` whole (110 files, 1.6 MB) and `plan-n/` whole (84, 1.4 MB).** `CLIMB-BATCH-7.md` names `compile-ladder/plan-7b/probes/`, and 7b is running from it. `PROBE-K.md` (a 7b briefing `doc:` key) and `PROBE-Q.md` are notes, followed, and they, `CLIMB-BATCH-N.md`, `FACTS.md` and the kept `probe-q/env.sh` name the rest of `plan-n/`.
- **Folders a live record names below the rung level.** Examples:
  - `CLIMB-BATCH-7.md`: `rung-generic-runtime/probes/` (106);
  - `FACTS-history.md`: `rung-overflow-natives/probes/skeptic/` (68), `rung-inference-checker/probes/onelib/` (34) and `rung-spec-route-a/probes/examples/` (22);
  - `CLIMB-BATCH-6.md`: `rung-nat-checker/probes/skeptic/` (63);
  - the ledger: `rung-size-range/probes/natives/` (58);
  - `CLIMB-BATCH-3.md`: `rung-analyzer-memo/probes/` (40).

  Each keeps its whole folder, as the rule's "a directory holding it" says.
- **91 files a live record names by bare filename, the only file of that name in the repository.** The line gives no folder, so the path form above misses them. They are listed at the end.
- **`rung-flat-tower/compare-normalised.py`.** `CLIMB-BATCH-6.5.md` and `CLIMB-BATCH-7R.md` name it after `rung-flat-tower/count-run.sh` on the same line, but in a different backtick span. Synthesis 2(a) names it as rung F's comparison, to move under `coordinator/tools/` when the first rung needing a one-time count is briefed. It is kept where it stands, with its `count-run.sh` and `machine.sh` (`coordinator/tools/mg-run.sh` calls the latter).
- **The tools the synthesis names, and each copy a live record names, kept where they stand:**
  - `repair-r1-atomic-static/run-subset.sh` and `subset.txt`;
  - `climb-batch-N/merged-tests/junit.sh`;
  - `rung-inference-walk/harness-one.sh`;
  - `count-run.sh` in `rung-walk-overflow/`, `rung-flat-tower/`, `rung-wrap-operators/` and `rung-tabulate/`;
  - `compare-normalised.py` in `plan-6.5/`;
  - `rung8/run-subset.sh`;
  - `rung-ranges-zz32/machine.sh`.

  The other 51 copies of `run-subset.sh`, `count-run.sh`, `compare-normalised.py`, `machine.sh`, `harness-one.sh` and `junit.sh` are removed.

Removed:

- **The review script copies, all 45 files of `reviews/batch-N-review/`, `batch-7C-review/` and `batch-6.5b-review/`.** The review files beside them stay. The measuring tool these copies adapt stands in `explorations/reviews/process-review-6b-7-7R/` (`agents.py` in `batch-6.5b-review/` says it is written in that form so that note's `measure.py` runs), and that folder is untouched. The synthesis's single shared tool under `coordinator/tools/` is not built tonight: the next post-batch review takes its adaptation from that folder or from history.
- **Every file only a report cites: the rest of the 4,366.** Following reports would keep 4,233 more (reading 1 above). Examples: the `raw/` and `raw-before/` of `rung2/` (46), the ladder folders of `rung-size-runtime/` (816 removed), the probes of `rung-nat-checker/` (385) and `rung-size-range/` (488). The reports that cite them keep their text, and a citation is read with `git show`.
- **A glob or variable naming a whole tree does not keep it.** Examples: `explorations/compile-ladder/*/` in `review-fable.md`, `explorations/compile-ladder/$SLUG/` in the script and `rung-*/` in `climb-batch-3/REPAIR-review.md`.

## The three checks

- `grep -c '"label":"gather' …/wf_61521277-479/journal.jsonl` gave 0 before the commit.
- `python3 explorations/compile-ladder/plan-7b/manifest/lists7b.py` exits 0 after the removal, with the same output as before. Every file a 7b briefing names by path is kept, and so is every document its `doc:` keys name.
- `bash explorations/coordinator/check-index.sh` reports 0 index lines naming a missing file, before and after. It lists `script-review.md` and now this file as notes missing from `INDEX.md`: the coordinator's to add.

## For Pavol

Two further cuts are ready if he wants them, each a single `git rm` of a list:

- the 137 files only the post-mortem's measurements cite (9.1 MB);
- the LaTeX build logs that FACTS cites (18.1 MB, 8 of them in the first cut), after its lines point at the commits.

Together they would take the kept bytes under `compile-ladder/` from 46.7 MB to 25.7 MB. The 2026-09-17 ladder at the root (1.6 MB) could go too, at the price of a history read for three FACTS and handover lines and one test comment.

### The 91 files kept for a bare filename in a live record

- `climb-batch-2/repair/workflow-script-check.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/probes/P11Obj.fss`: in coordinator/repair-batch-review.md
- `repair-r1-atomic-static/probes/skeptic/SK16LocalString.fss`: in coordinator/FACTS-history.md
- `repair-r1-atomic-static/probes/skeptic/SK18Trait.fss`: in coordinator/test-discipline.md
- `repair-r1-atomic-static/probes/skeptic/SK25ObjNoAtomicVsAtomic.fss`: in coordinator/FACTS-history.md, coordinator/test-discipline.md
- `repair-r1-atomic-static/probes/skeptic/SK8Swap.fss`: in coordinator/FACTS-history.md
- `repair-r1-atomic-static/probes/skeptic/SQ7ObjThrow.fss`: in fortress-gap-ledger.md
- `repair-r1-atomic-static/probes/skeptic/sk25-recursion-entry.txt`: in coordinator/FACTS-history.md
- `repair-r1-atomic-static/probes/walk-differential.txt`: in coordinator/test-discipline.md, fortress-gap-ledger.md
- `repair-r2-literal-wrap/probes/integer-test-after.out`: in coordinator/postmortem-2026-09-29/characterization.md
- `repair-r2-literal-wrap/probes/r2b.walk.after`: in coordinator/postmortem-2026-09-29/characterization.md
- `repair-r2-literal-wrap/probes/r2b.walk.before`: in coordinator/postmortem-2026-09-29/characterization.md, fortress-gap-ledger.md
- `rung-default-rendering/probes/gated-spot-postedit.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-default-rendering/probes/postrepair-differentials.txt`: in fortress-gap-ledger.md
- `rung-default-rendering/probes/skeptic/skeptic2-native-import.txt`: in fortress-gap-ledger.md
- `rung-default-rendering/probes/xxx-inferred-harness.txt`: in fortress-gap-ledger.md
- `rung-default-rendering/probes/xxx-inferred-static-arg.txt`: in fortress-gap-ledger.md
- `rung-default-rendering/probes/xxx-union-goes-red.txt`: in fortress-gap-ledger.md
- `rung-export-var/probes/FnApi.fsi`: in coordinator/FACTS.md, fortress-gap-ledger.md
- `rung-export-var/probes/ObjVarMain.fss`: in coordinator/FACTS-history.md
- `rung-export-var/probes/gather/GatherAssignMain.fss`: in fortress-gap-ledger.md
- `rung-export-var/probes/gather/gather-frozen-gate.txt`: in fortress-gap-ledger.md
- `rung-export-var/probes/link-and-walk-preedit.txt`: in coordinator/FACTS-history.md, coordinator/FACTS.md, fortress-gap-ledger.md
- `rung-export-var/probes/skeptic/skeptic-differentials.txt`: in fortress-gap-ledger.md
- `rung-flat-tower/probes/checker-count/diff-before-after.txt`: in coordinator/CLIMB-BATCH-7.md, coordinator/climb-batch-7-review.md
- `rung-flat-tower/probes/distance/stage-diff-wellformed-acyclic.txt`: in fortress-gap-ledger.md
- `rung-flat-tower/probes/skeptic/r2/SkAtomicAcc.fss`: in fortress-gap-ledger.md
- `rung-flat-tower/probes/threads4/compare-base-flat-first.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-flat-tower/probes/threads4/compare-base-flat.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-inference-checker/probes/RuleLI.fss`: in coordinator/PLAN.md, fortress-gap-ledger.md
- `rung-inference-checker/probes/ctests/diff-repair.txt`: in coordinator/PLAN.md
- `rung-inference-checker/probes/judgement/O2Z64.after.txt`: in fortress-gap-ledger.md
- `rung-int-conversions/probes/gather/GatherNarrowZZ32.fss`: in fortress-gap-ledger.md
- `rung-int-conversions/probes/gather/gather-w-gate.txt`: in fortress-gap-ledger.md
- `rung-int-conversions/probes/probe-NarrowSigned.txt`: in fortress-gap-ledger.md
- `rung-int-conversions/probes/probe-SignedType.txt`: in fortress-gap-ledger.md
- `rung-int-conversions/probes/skeptic/skeptic-SK3Tower.txt`: in fortress-gap-ledger.md
- `rung-int-conversions/probes/skeptic/skeptic-SK4Bounds.txt`: in fortress-gap-ledger.md
- `rung-int-conversions/probes/skeptic/skeptic-SK8Wrap.txt`: in fortress-gap-ledger.md
- `rung-int-conversions/probes/walk-narrow.txt`: in fortress-gap-ledger.md
- `rung-int-semantics-compiled/probes/IntSemTableWalk-walk.txt`: in fortress-gap-ledger.md
- `rung-int-semantics-walk/probes/IntSemProbe-overlay-base.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-int-semantics-walk/probes/run-enders-after.txt`: in fortress-gap-ledger.md
- `rung-integer-minmax/probes/skeptic/fix-diff.txt`: in fortress-gap-ledger.md
- `rung-library-defects/probes/compiled3q-compile-with-fix.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-maybe/probes/MaybeRungM-before.txt`: in coordinator/test-discipline.md
- `rung-nat-checker/probes/perdecl-ab-sizes-equal.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-overflow-natives/log-list-edit.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-overflow-natives/probes/demo/HeapShakedown-edit-logshadow.txt`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/SeqMidpointControl.fss`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/SeqMidpointControl.txt`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/SeqRangeControl.fss`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/SeqRangeControl.txt`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/gather-xxx-range-size-zz64.txt`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/xxx-range-bounds-goes-red.txt`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/xxx-range-empty-hash.txt`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/xxx-range-size-zz64.txt`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/xxx-seq-midpoint-compiled.txt`: in fortress-gap-ledger.md
- `rung-overflow-natives/probes/repair/xxx-seq-range-top.txt`: in fortress-gap-ledger.md
- `rung-ranges-zz32/probes/distance/errors-library-only.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr32-sibling/probes/comp/XXXRR32EqualityRungV.localfix.txt`: in fortress-gap-ledger.md
- `rung-rr32-sibling/probes/skeptic/SkMinMaxC.comp.txt`: in fortress-gap-ledger.md
- `rung-size-range/local-fix-503.py`: in fortress-gap-ledger.md
- `rung-size-range/probes/codegen/trycmp-control-junit-base.txt`: in fortress-gap-ledger.md
- `rung-size-range/probes/repair/Strided156Only.fss`: in fortress-gap-ledger.md
- `rung-size-range/probes/repair/strided-156.txt`: in fortress-gap-ledger.md
- `rung-size-range/probes/shifts/xxx-503-red.txt`: in fortress-gap-ledger.md
- `rung-size-range/probes/skeptic/SkNumeralBare2.fss`: in fortress-gap-ledger.md
- `rung-size-range/probes/skeptic/ranges-walk.txt`: in fortress-gap-ledger.md
- `rung-size-range/probes/strided/strided-control.txt`: in fortress-gap-ledger.md
- `rung-size-range/probes/strided/strided-xxx.txt`: in fortress-gap-ledger.md
- `rung-size-range/walk-pass.sh`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/differential-repair-methods.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/differential-task-args.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/junit-methboth-xxx.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/junit-task-xxx.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/jutest-before-serial.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/skeptic/differential-4.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/skeptic/differential-5.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/skeptic/differential-6.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/skeptic/threads-repeat.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/xxx-red-demo-programs.txt`: in fortress-gap-ledger.md
- `rung-size-runtime/probes/xxx-task-red-demo-undone.txt`: in fortress-gap-ledger.md
- `rung-spec-integer-rules/probes/list/test-citations-base.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-spec-integer-rules/probes/reanchor/reanchor-own-dryrun.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-spec-route-a/probes/skeptic/SkOprArgs.walk.txt`: in coordinator/postmortem-2026-09-29/characterization.md
- `rung-tryatomic/probes/skeptic/skepthrowsclause.txt`: in fortress-gap-ledger.md
- `rung-tryatomic/probes/skeptic/skeptryatomicstate.txt`: in fortress-gap-ledger.md
- `rung-tryatomic/probes/skeptic/skeptryatomicval.txt`: in fortress-gap-ledger.md
- `rung-tryatomic/probes/typecase-binding.txt`: in fortress-gap-ledger.md
- `rung-walk-overflow/probes/differential-intsemtable.txt`: in fortress-gap-ledger.md

### The 137 files cited only by the post-mortem's documents and older coordinator notes

Each with the note that keeps it.

- `climb-batch-5/review-repair/review-tex.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `climb-batch-6.5/build/gather-tex.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `climb-batch-6b/review/unstable-outside.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `climb-batch-7R/build/gather-tex.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/GS2.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/GenericFnWithExcludes.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/InitOrderWithMutable.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/InitOrderWithMutable.fss.run`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/LongStringTests.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/MapTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/ObjectFieldShadowing.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/ObjectFieldShadowing.fss.run`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/OverloadWithSuperExcludes.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/OverloadWithSuperExcludes.fss.run`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/SkipListTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/XXXimmutableTopLevel.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/XXXmutableTopVarWithoutType.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/genericTest3.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/genericTest4.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/immutableTopLevel.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/immutableTopLevel.fss.run`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/objectCC_mutable.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest1.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest1.fss.run`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest2.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest2.fss.run`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest3.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest6.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest7.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest7.fss.run`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest8.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `repair-r1-atomic-static/raw/tests/overloadTest8.fss.run`: coordinator/postmortem-2026-09-29/characterization.md
- `report.py`: coordinator/postmortem-2026-09-29/synthesis.md
- `rung-default-rendering/probes/test-preedit.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-export-var/probes/xxx-goes-red.txt`: coordinator/oracle-headers.md
- `rung-int-conversions/before/raw-ladder/tests/UnsignedTest.fss.compile.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-int-semantics-compiled/ladder-after/raw/tests/QuickCheckTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-int-semantics-walk/probes/route-i-trial-patch.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-integer-minmax/probes/passes/compare-normalised.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-library-defects/probes/checker-count-postedit-run.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-library-defects/probes/ladder-before-after-diff.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-maybe/logs/ungated/GenTest4.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-result-bounds/probes/distance-preedit.txt`: coordinator/climb-batch-N-review.md
- `rung-rr32-sibling/machine.sh`: compile-ladder/rung-rr32-sibling/mg-run.sh
- `rung-rr32-sibling/mg-run.sh`: coordinator/postmortem-2026-09-29/synthesis.md
- `rung-rr32-sibling/probes/build/edit-tex.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr32-sibling/probes/passes/compare-edit-vs-baseA-only.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/ladder-after/raw/tests/oprTests.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/ladder-after/results.tsv`: coordinator/process-decisions-review-1.md
- `rung-rr64-functions/probes/build-log-summary.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/compare-subset.sh`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/failure-before-edit.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/lib-baseline.log`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/pass-after-edit.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/rebuild.log`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/reverify-compiled.log`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/reverify-forced.log`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/reverify-test.log`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/reverify-walk.log`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkEdgeComp.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkEdgeWalk.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkLadderSpotCheck.out`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkOver.out`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkOverA.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkOverB.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkOverC.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkOverD.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkTransComp.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkTransComp.out`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkTransWalk.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkTransWalk.out`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkZeroComp.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkZeroComp.out`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/skeptic/SkZeroWalk.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-rr64-functions/probes/subset-before-after.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/compare-3pass.txt`: coordinator/postmortem-2026-09-29/measures-6.5b.md
- `rung-size-range/probes/repair/anchor-raw-final.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/repair/anchor-raw.txt`: coordinator/postmortem-2026-09-29/measures-6.5b.md
- `rung-size-range/probes/unstable-check.txt`: coordinator/postmortem-2026-09-29/measures-6.5b.md
- `rung-size-range/probes/walkcopy/NatRtBigSize.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/PowChooseLcmRungE.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/SkRangeBig.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXInferResultOnlyAny.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXInferResultOnlyCoerced.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXIntBelowZZ32Walk.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXIntBeyondZZ32Walk.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXNatBeyondNN32Walk.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXNatBigSizeWalk.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXRangeBoundsRungO.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXRangeEmptyHashRungO.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXRangeTupleShiftWalk.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXSeqRangeTopRungO.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-range/probes/walkcopy/XXXTryCompareCoerceRungE.fss`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-runtime/probes/perdecl-after.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-size-runtime/probes/perdecl-before.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-spec-inference/probes/skeptic/r2/sk2-tex.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-tabulate/probes/build/base-tex.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-tabulate/probes/build/edit-tex.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-tabulate/probes/build/gather-tex.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-timing/probes/junit-after.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-timing/probes/walk.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung-tryatomic/raw/bytecode-optimize.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/EqualityOverloadBug.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/FileConversion.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/GS3.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/GeneratorNullPointer.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/IntMapTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/MapTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/NumeralTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/QuickCheckTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/ReflectTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/ReflectiveQuickCheckTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/SetMapImport.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/SetTest.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/StringTests.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/TestCompiledImports.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/TypeImportBug.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/WordCountSmall.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/atomicsets.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/caseWithSemicolons.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/explicitStaticArgsToAggregates.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/mapCombine.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/parametricListCompr.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/parametricManiaCompr.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/raw/setSum.fss.compile`: coordinator/postmortem-2026-09-29/characterization.md
- `rung1/test-after.out`: coordinator/postmortem-2026-09-29/archaeology-testing.md
- `rung1/test-before.out`: coordinator/postmortem-2026-09-29/archaeology-testing.md
- `rung8/probes/naiveSeq.compile-with-edit`: coordinator/postmortem-2026-09-29/characterization.md
- `rung8/probes/restTest.compile-with-edit`: coordinator/postmortem-2026-09-29/characterization.md
- `rung8/probes/restTest2.compile-with-edit`: coordinator/postmortem-2026-09-29/characterization.md
- `rung8/probes/restTest2a.compile-with-edit`: coordinator/postmortem-2026-09-29/characterization.md
- `rung8/probes/rung8.fsi.diff`: coordinator/postmortem-2026-09-29/characterization.md
- `rung8/probes/rung8.fss.diff`: coordinator/postmortem-2026-09-29/characterization.md
- `rung8/probes/simpleSum.compile-with-edit`: coordinator/postmortem-2026-09-29/characterization.md
- `rung8/probes/summary-at-head.txt`: coordinator/postmortem-2026-09-29/characterization.md
- `rung8/run-subset.sh`: coordinator/batched-climb-review.md
- `rung8/subset.txt`: compile-ladder/rung8/run-subset.sh
