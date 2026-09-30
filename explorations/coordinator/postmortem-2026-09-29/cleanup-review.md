<!-- A review of the cleaning of 2026-09-29 (`cleanup.md`, commit 9269f7bd2), for Pavol: where its rule went wrong, counted from the tree; the rule he means, by kind of file; what that rule keeps because a gate, a tool or a briefing reads it, what it removes, how a record's citation of a removed file is read afterwards, what it costs and breaks; and how it relates to his cleaner pass of 2026-09-20. Read-only: counts from `git ls-files`, `stat` and `grep`, the workflow script and the tools; no build, no Fortress run. -->

# Review of the cleaning of 2026-09-29

The cleaning removed 4,366 files (11.7 MB) and kept 4,599 (44.6 MB) under `explorations/compile-ladder/`. The synthesis had estimated about 7K removed. This note says why the count came out low, states the rule Pavol means, and counts what it removes.

## 1. Where the premise was faulty

Pavol's point first. The cleaning kept a file when a live record cites it, and read a citation of a folder as a citation of every file in it. A record naming a folder as the place its evidence sits kept the folder's contents whole, files nobody ever named.

Counted against the live records (everything under `coordinator/`, the ledger, the handover, the protocol, `CLAUDE.md`, the tests, the specification sources, 7b's manifest), by a file's own path or its bare name:

- 4,363 of the 4,599 kept files are not reports.
- 1,030 of them are named by their own path somewhere in a live record.
- 898 more are matched only by a bare filename, many of them generic names such as `run.sh` or `summary.txt`, so this is generous.
- 2,435 (6.2 MB) are named nowhere in any live record. They stand because a folder holding them was named, or because a class of folder was kept whole.

Where those 2,435 are:

- 880 in the ladder of 2026-09-17 at the root, `after/` (445) and `raw/` (435). FACTS-history and the handover name the folder `after/`; one test comment names `raw/tests/`. Nothing reads either folder. The measured baseline the gate reads is `baseline-2026-09-19/`.
- 475 in `baseline-2026-09-19/` and `gate-baseline/`, kept whole by the synthesis's rule "since the ladder stage reads its `raw/`". The stage reads 92 of the baseline's 538 files: the pass list, `ladder.tsv`, the 85 `.run` captures the pass list names, the two microGPT phase files and its four tools. The other 443 are the `.compile` captures and the `.run` captures of files that did not pass.
- 167 in the plan folders: `plan-7b/` 90 (7b's record names `plan-7b/probes/`), `plan-n/` 56, `plan-6.5/` 21.
- About 910 in the rung folders, each kept because a record named a folder below the rung: `rung-wrap-operators/` 83, `rung-exclusion-remainder/` 83, `rung-interp-coercion/` 78, `rung-integral-ops/` 67, `rung-overflow-natives/` 60, `rung-size-range/` 58, `rung-generic-runtime/` 53, `rung4/` 52, `rung-nat-checker/` 48, then 35 and fewer in each of 30 more folders.
- 1 under a `gate/` folder.

So at least 2.4K of the 4.6K kept files were kept for a folder's name or a class's name, not their own. The cleaning's own borderline list shows the same reading at work: "each keeps its whole folder, as the rule's 'a directory holding it' says".

Second, the deeper fault: a citation was taken as a reason to keep a file in the working tree at all. What a citation in a record needs:

- The working tree, only when something runs against the file: the gate reads its comparands there, a tool is called by its path, and `facts-extract.sh` resolves a briefing's `doc:` keys in the tree.
- History, for a capture cited as provenance: `git show` serves it, permanently, at any commit. The record already reads history this way in 54 places.
- Nothing, for most FACTS lines: the claim stands with its source, the report and the landing commit. The capture is the source's source.

Who reads the kept files. `facts-extract.sh` reads `.md` files only. A brief hands a worker findings to cite, never raw data to verify (protocol principle 5). A skeptic checking whether a worker saw its test fail reads the worker's transcript (POSITIONS 2026-09-29), not a capture. Pavol reads reports on a phone. The gate reads its tables. Nobody reads a capture except in a dispute over a measurement, and principle 5 says a measurement is taken again only when the tree changed under it. What the captures do to readers is measurable: a `git grep` for `IntegerOverflow` hits 27 files under `ProjectFortress/` and 246 under `compile-ladder/`, 198 of them not reports.

## 2. The rule Pavol means, by kind of file

His words: only the Fortress implementation after a landed rung (18:25 UTC); "don't keep temporary shit around. We are backing up the transcripts anyway" (20:42); the outputs are the report, the ledger rows, the FACTS and plan lines, and a reusable script (20:48); "do we need the logs? text would keep accumulating" (2026-09-19). The rule is by kind, not by citation. A mention in a record keeps nothing.

Keep in the tree:

- The records: every `.md` under `compile-ladder/` (236 files, 6.2 MB): `REPORT`, `SKEPTIC`, `JUDGE`, `RECORD`, `record`, decision records, notes, histories.
- What the gate reads: the landed gates' tables (75 files, 1.6 MB, most of it four copies of `distance-sites.tsv`), `gate-baseline/` (11 files), and the 92 files of `baseline-2026-09-19/` the ladder stage reads. Not the baseline's other 443.
- Tools a script calls by path: `repair-r1-atomic-static/run-subset.sh` and `subset.txt` (the gate's subset driver), `rung-flat-tower/machine.sh` (`coordinator/tools/mg-run.sh`), `rung-inference-walk/harness-one.sh` and `climb-batch-N/merged-tests/junit.sh` (the script), the root ladder's `run-ladder.sh`, `classify.py`, `report.py` and its three tables, `plan-6.5/manifest/` and `plan-7b/manifest/` (3 files each). Twenty files. They move under `coordinator/tools/` when next touched, as the synthesis planned.
- While 7b runs: `plan-7b/` whole (110 files) and `rung-spec-comprises/probes/between/MeetExample.txt`, the one non-report file a 7b `doc:` key names.

Remove: everything else. Captures, logs, raw and per-file ladder outputs, probe programs and their outputs, build logs, patches, copies of tools and of tests, whether or not a record names them.

Should a reader read from history instead? The gate: no. It globs the tree for the last landed tables and diffs the 85 baseline captures; a script change would buy nothing, and the files it reads are 0.5 MB. From 7b on the per-site list goes to one fixed path, `compile-ladder/gate/distance-sites.tsv`, overwritten at each landing; once it exists, the four older copies (1.5 MB) are history too. A tool: no, a tool is read where it stands. A briefing: its `doc:` keys must resolve in the tree, so a briefing names records, never captures; 7b's manifest names one capture, and the check is not run again on a landed batch.

## 3. How a citation of a removed file is read

One convention, stated once, path-based, with no hash written into any record:

- A path under `explorations/compile-ladder/` that is not in the tree is read from the commit before the one that removed it: `git show $(git log -1 --diff-filter=D --format=%h -- <path>)^:<path>`.

One line in `coordinator/README.md`, one in FACTS. It covers the first cleaning's removals too, and it survives the cleaner pass's rewrite, since it recomputes the commit from the path.

Not a repointing pass. The live records name 712 distinct non-report paths that the rule removes: 572 in the ledger, 93 in FACTS, 81 in FACTS-history, 58 in PLAN, 2 in the handover. Writing a hash beside each is a worker session of churn for no reader, and the rewrite of the cleaner pass would change every hash written.

Nothing, for FACTS lines whose evidence is a build log or a capture: the claim stands on its report and its landing commit. The cleaning's offer to point FACTS at landing commits before removing the logs is not needed.

## 4. What it removes, counted

Under `compile-ladder/`, 4,599 tracked files, 44.6 MB today.

- After 7b lands: keep 431 files (8.2 MB), remove 4,168 files (36.4 MB).
- While 7b runs, if done now: keep 534, remove 4,065 (35.1 MB). Not recommended; see section 6.

The removal by kind of file: 1,427 `.compile` captures, 1,417 `.txt`, 676 `.fss` probes, 213 `.run`, 152 `.sh` copies, 59 `.py`, then `.compiled`, `.tsv`, `.patch`, `.walk`, `.out`, `.fsi`. The largest by count: `after/` 508, `raw/` 484, `baseline-2026-09-19/` 443, `rung-exclusion-remainder/` 156, `rung-size-range/` 140, `rung-interp-coercion/` 125, `rung-overflow-natives/` 116, `rung-generic-runtime/` 113, `rung-wrap-operators/` 111. By bytes the 24 LaTeX build logs (18 MB, each about 0.8 MB) and the four per-declaration checker dumps (3.2 MB) are most of it.

The two further cuts the cleaning offered, the 137 post-mortem-cited files and the 24 logs, are inside this count; they need no separate decision.

What stays whole: the 236 reports, the gate tables, the baseline's read files, the twenty tools. What is not touched: `explorations/` outside `compile-ladder/` (6.4K files, 154 MB, 6.0K of them not `.md`), which the synthesis left alone on his asks of 2026-08-19 and 2026-09-09; the same rule applied there is a separate count, if he wants it. The `wip/` branches keep their copies (2026-09-18).

The three constraints, checked by reading:

- `plan-7b/manifest/lists7b.py` resolves `doc:` keys to eleven files under `compile-ladder/`, ten of them `.md`, one `MeetExample.txt`; all kept while 7b runs.
- The gate's comparands are found by `ls climb-batch-*/gate/summary.txt | grep -m1`, likewise `checker-count.txt` and `distance.txt`, with `gate-baseline/` as the first; the ladder stage reads `baseline-2026-09-19/pass-list.txt`, `ladder.tsv`, `raw/<key>.run` for the 85 keys and `microgpt-phase.md`, and copies `run-subset.sh`, `classify.py`, `report.py`, `microgpt-phase.sh` and `microgpt-phase.py`. All kept.
- `coordinator/check-index.sh` reads `INDEX.md` and the `.md` notes; `mg-run.sh` calls `rung-flat-tower/machine.sh`. Kept.

## 5. What it costs and what it breaks

Costs:

- One commit. The keep list is computed by a script of about twenty lines from `git ls-files` and the four rules above, then `git rm --pathspec-from-file`, then `git diff --cached --stat` read before the commit. No judgement per file, so no worker is needed; a coordinator turn does it. If a worker, one session at most.
- No gate for it, as for the first cleaning; the next landed gate is the proof.
- Two lines for the convention, and one line in `cleanup.md` pointing here.

Breaks:

- 712 citations in the live records become history-relative. A reader who follows one runs one git command. No tool checks those citations (`check-index.sh` checks `INDEX.md` only).
- 7b's record names 11 of the removed files as evidence for its workers; after 7b lands they are history, which is why the removal waits.
- `AssertRung4.fss` has a comment naming `raw/tests/` as where its case came from; nothing runs it. `ladder-workflow.js`, the 2026-09-17 workflow, writes into `after/`; the batch script superseded it.
- The repository does not shrink. `git rm` keeps every blob: the object store is 2.8 GB, the checkout 279 MB, of which `explorations/` is 199 MB and `compile-ladder/` 45 MB.

## 6. Timing

After 7b lands and before batch 8 launches. Once 7b's gather starts nothing is committed on `main`; its workers read `plan-7b/probes/` and the eleven files its record names from the tree; and under the rewritten script 7b commits only reports and gate tables, so no new scratch arrives after it. Batch 8's record, written after the cleaning, then cites reports and history-relative paths from the start.

## 7. The cleaner pass of 2026-09-20

His plan (POSITIONS 2026-09-20): `main` holds only the changes to the library and the compiler, the whole process record lives on a separate branch, so that a checkout of `main` with full history carries no blobs that are not Fortress. The synthesis put it after one batch has run clean under the new rules, a force push from his machine; on 2026-09-22 he added GitHub issues, one per problem, closed by the fixes merged from branches.

How this cleaning relates to it:

- They are independent. The cleaner pass splits history by path, `explorations/` against the rest, whatever `explorations/` holds. This cleaning changes what the working tree holds; only the cleaner pass changes what history holds, and only it shrinks a checkout of `main`.
- This cleaning is not a prerequisite. What it buys the process branch is a tree of records, tables and tools, the shape the script commits from 7b on, and nothing else.
- Hashes written into records now would not survive the rewrite. The path-based convention of section 3 does. The landing-commit hashes already in FACTS and the ledger need the rewrite's commit map; that is the cleaner pass's cost, not this one's.
- The transcript branches (`transcripts`, `transcripts-blinded`) are part of the process record the rewrite must keep; the by-kind rule leans on them as the record of how a worker worked.
- After the cleaner pass, the by-kind rule is the commit discipline on both branches, as he said on 2026-09-29: a branch's discipline is not different from `main`'s.

## Recommendation

Take the by-kind rule of section 2, as one commit after 7b lands and before batch 8 launches, with the convention of section 3 stated once and no repointing. It removes about 4.2K files (36 MB) and keeps about 430 (8 MB): the records, the gate's comparands, the twenty tools. Cost: one commit built by a script from the keep list, no gate, two record lines; no worker needed. The `.git` size is the cleaner pass's to change, not this one's.
