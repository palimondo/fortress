<!-- The characterization of every climb batch for the post-mortem of 2026-09-29, from git and the runs' transcripts, read-only: what each batch changed in Fortress (code, specification, tests), what it committed beside that (reports, captures, probes, scripts), cited against uncited, its coordinator-record churn and ledger rows; the token spend of every run by stage; and the revival's tests measured against the team's test-suite practice. Ten readers of workflow `wf_576bd1f3-f0c`, their sections as returned, model identifiers written as tiers. -->

# Characterization of the batches

Pavol's ask (2026-09-29, 18:42 UTC): characterize each batch from the git perspective, bounded, as input for an Opus review and, independently, a Fable review that will propose a new practice. The readers measured and did not recommend. Their shared categories: CODE (library, Java, Scala, build), SPEC (text and the PDF), TESTS (new plain, new XXX, promoted, modified, deleted, rung-suffixed names), RECORDS under `explorations/` (reports, captures, probes, scripts, other; cited by any tracked `.md` at HEAD, or not), and the coordinator's records (FACTS, POSITIONS, PLAN, INDEX, the ledger, the handover).


## The batches, one section each

### Eight-rung ladder climb, 2026-09-17 (`explorations/compile-ladder/CLIMB.md`)

- **Range.** The first commit is `b014ff80d`, whose parent is `53362cb88` (rung 0, a separate worker). The relaunch base is `6b3e98ed1`. CLIMB.md:5 measures its baseline at `75cca6683`. The landing commit is `266e437a5` ("climb record and re-run"). **15 own commits**, all on 2026-09-17, 03:23 to 14:38 UTC:
  - 1 refused first launch of rung 1 (`b014ff80d`);
  - 8 rung commits (`1bd8d3ad1 cee79d3f1 4d419c9e8 b52a32ac2 9373985b4 54861b62a 2027f519b 40216550c`, 06:52 to 14:15);
  - 5 one-line commits that write the closing hash into the ledger (`8bb4ab0de 9b1da0a07 386053b3d b45ac2982 0be58b257`);
  - 1 record and re-run (`266e437a5`).
  - The record gives the cost: 8h37m from relaunch to landing, 36 agents, 1,694 tool calls, fully serial (`iteration-cost.md`, `FACTS-history.md:47`).
  - Coordinator commits inside the range: `4affd6664` (PLAN.md and ladder-workflow.js, boundary widened), `6b3e98ed1` (workflow quoting fix, launch) and `679d62af3` (performance-roadmap.md). None of them touches a batch file. After the landing, `6dc8f3e6e` adds one line to FACTS.md, and `49738c3cc`/`eadc25319` add the conformance reviews.
  - Excluded: the ladder baseline `a654b7eb2..dfe6dad65` (its `raw/` is what `after/raw/` repeats) and rung 0 `53362cb88`.
- **Purpose.** "Eight rungs landed on top of it … and what the same ladder says when it is run again" (CLIMB.md:5). It did this: 8 rungs landed, passes went from 59 to 81, 39 files moved up and none moved down (CLIMB.md:7, :46-50). The later conformance review found that rung 3 violates atomic.tex and that rung 7 is an unargued deviation, which led to the repair batch (REPAIR-BATCH.md:7-11).
- **Fortress change.**
  - CODE: 11 files, +234/−35 (269 lines changed).
    - Library: 4 files, +116/−22 (CompilerLibrary.fsi +37, .fss +60/−10, CompilerBuiltin.fsi +1, .fss +18/−12).
    - Java: 6 files, +110/−9, one of them new (`nativeHelpers/simpleIntLiteralArith.java`, 54 lines).
    - Scala: 1 file, +8/−4 (TypeWellFormedChecker.scala).
    - No astgen or build files.
  - SPEC text: 0 files.
  - PDF: not rebuilt, 0 bytes.
- **Tests.** 17 files, +631/−4 (635 lines).
  - New plain tests: 8 tests in 16 files (8 .fss with 527 lines, 8 .test with 104 lines).
  - New XXX tests: 0. Promoted: 0.
  - Moved: `EqualityRung1.test` was parked in `not_working_library_tests/` by the refused launch and moved to `library_tests/` by `1bd8d3ad1`.
  - Modified: 1 (`MaybeTest9.fss`, −4). Deleted: 0.
  - Rung-suffixed names: 14 files (7 tests: EqualityRung1, HasRankRung2, AssertRung4, LineConcatRung5, IntLiteralRung6, IntLiteralArithRung7, BigSumRung8), all still at HEAD.
  - Largest new tests: `IntLiteralRung6.fss` 92 lines, `AssertRung4.fss` 80, `IntLiteralArithRung7.fss` 75.
- **Records.** 803 new files, +27,125/−108 lines, 1,611,526 bytes. The record commit `266e437a5` alone accounts for 512 files and +14,743 lines.
  - Record categories:

    | Category | Files | Lines | Bytes | Contents |
    |---|---|---|---|---|
    | REPORTS | 10 | +2,028/−105 | 162,547 | 8 rung REPORT.md, CLIMB.md (193 lines), after/REPORT.md |
    | CAPTURES | 36 | 2,239 | 133,914 | 18 .tsv, 10 .txt, 8 .out; the .out files are force-added past `.gitignore:46 *.out` |
    | PROBES | 7 | 104 | 3,170 | |
    | SCRIPTS | 14 | 3,225 | 136,131 | |
    | OTHER | 736 | 19,529 | 1,175,764 | 575 `.compile` (18,837 lines, 1,060,430 B), 130 `.run`, 6 `.class` binaries (70,763 B), 10 `.walk`, 7 `.compiled`, 5 `.compile-with-edit`, 3 `.diff` |

  - Five largest files:
    1. `rung7/probes/shadow-src/.../NamingCzar.java`, 2,034 lines, 82,596 B. A verbatim copy of the landed source file, byte-identical to `ProjectFortress/src/.../NamingCzar.java`.
    2. `after/REPORT.md`, 905 lines, 54,048 B. The generated re-run report; lines 454-872 are the per-file ladder table, a dump of ladder.tsv.
    3. `rung1/raw/ReflectiveQuickCheckTest.fss.compile`, 783 lines. A compiler error listing ("X is undefined" cascade), from the refused launch.
    4. `after/raw/tests/ReflectiveQuickCheckTest.fss.compile`, 779 lines. The same listing from the re-run.
    5. `rung1/raw/QuickCheckTest.fss.compile`, 773 lines. A compiler error listing.
    - By bytes, the next largest are the two ladder tables of 411 lines each: `rung8/probes/ladder-at-head.tsv` (43,165 B) and `after/ladder.tsv` (43,153 B).
  - CITED against UNCITED, by the task's basename rule:
    - Cited: 100 files, 7,967 lines. 10 of them are cited only from their own rung directory.
    - Uncited: 703 files, 19,158 lines, all in OTHER.
    - Strict variant, where a non-unique basename must appear as parent/basename: cited 71 files / 7,603 lines, uncited 732 / 19,522.
    - 576 of the 703 uncited files (14,900 lines) sit in a directory that some .md cites by path (`after/raw` 487, `rung4/raw` 33, `rung1/raw` 23, `rung3/raw` 15, `rung7/probes` 11, `rung8/probes` 7). That leaves 127 files and 4,258 lines uncited under any reading.
    - CLIMB.md:24 cites the rung directories only through the template `rung<N>/raw/`.
- **Coordinator records.**

  | File | Lines | Bytes |
  |---|---|---|
  | FACTS.md | +13/−2 | +24,671/−2,724 |
  | fortress-gap-ledger.md | +19/−11 | +35,391/−16,055 |
  | microgpt-run-c-handover.md | +10/−10 | +202,387/−191,953 |
  | PLAN, POSITIONS, INDEX | 0 | 0 |

- **Ledger rows.**
  - Opened: 311 to 318 (8 rows).
  - Closed: 311, 312, 314 and 316, each opened and closed by the same rung, plus the older row 80 (rung 6).
  - Partly closed: 74 (the SUM half) and 318 (four of the family).
  - Amended: 71, 288, 304, 317.
  - Still open: 313, 315, 317, 318.
- **Ratios.**
  - RECORDS lines per CODE+SPEC line changed: 27,125 / 269 = 101.
  - TESTS lines per CODE line: 635 / 269 = 2.4.
- **Anything odd.**
  - **Committed twice:** 347 non-empty record files (8,502 lines, 546,820 B) are byte-identical to blobs already in the tree at base:
    - 284 of them are `after/raw` files identical to the baseline `raw/`;
    - 59 are `rung<N>/raw-before` files, also identical to the baseline `raw/`.
    - Another 115 files (3,485 lines) are identical copies of other files in the same batch, mostly `rung<N>/raw` against `after/raw`.
  - **Empty files:** 162 committed at 0 bytes.
  - **The ladder re-run is committed twice.** `rung8/probes/ladder-at-head.tsv` and `summary-at-head.txt` hold one run, and `after/ladder.tsv` and `summary.txt` hold the next. They differ in the phase of 3 files.
  - **The copied scripts in `after/`:** `classify.py` is byte-identical to the original, `report.py` differs in 39 lines and `run-ladder.sh` in 8.
  - **Shadow copies from rung 7:** a full source copy of NamingCzar.java and 6 compiled `.class` binaries.
  - **Handover churn.** The handover holds one 25 KB paragraph line that 10 commits each rewrote: 394 KB of churn for a net gain of about 10 KB.
  - **Rung 1 report rewritten.** The refused launch's rung1 REPORT.md was rewritten by the relaunch (−105 lines).
  - **CLIMB.md:24 claims a `raw-before/` for each rung;** rung1 has none.
  - No whole build logs were committed, and nothing was committed and then deleted; all 803 files are at HEAD.

### Repair batch, 2026-09-18 (`explorations/coordinator/REPAIR-BATCH.md`)

- **Range.** The batch base is `49ee5e91a` (gate/summary.md:3). Main was at `e6db75e8e` when the first rung landed. The landing commits are `42d51c474..63db7a691` (7 commits, as the record says), and the record is closed by `66c016c80`. **8 own commits**, all on 2026-09-19 between 02:30 and 03:26 UTC:
  - 2 squashed rung commits (R1 `42d51c474`, R2 `6a63980bb`);
  - the review's corrections (`ef1fa3640`);
  - the criterion wording (`5a54bc675`);
  - the gate (`08d13611b`);
  - the landed hashes (`ec68f731b`);
  - the scratch drivers (`63db7a691`);
  - the closing record (`66c016c80`).
  - The pre-squash history is on `origin/wip/repair-r1-atomic-static` (13 commits, including the skeptic's refusal `81644c3e7` and the judge `513a9216d`) and `origin/wip/repair-r2-literal-wrap` (5 commits).
  - The run itself (from FACTS): launched 2026-09-18 22:57, a VM restart at 23:22, relaunched at 23:28. It took 3h55m to reach main, with 11 agents, 955 tool calls and 2.6M subagent tokens. The gate took 739 s.
  - The first launch, on 2026-09-17, was lost with its container and committed nothing.
  - Coordinator commits before the batch: `1ab188abe` (workflow script) and `e6db75e8e`, which touches REPAIR-BATCH.md, FACTS, the handover and remote-container.md — files the batch later edits. None interleaves inside the range. After it: `0de59a8a2` (repair-batch-review.md plus agents.csv and parse.py, 697 lines) and `7e3620cf0` (FACTS, INDEX, protocol).
- **Purpose.** "Two repairs are owed" (REPAIR-BATCH.md:11): R1, a top-level mutable variable outside the transaction, and R2, the integer-literal wrap. Also the criterion wording ordered at :65. It did all three:
  - both repairs landed;
  - `5a54bc675` did the wording, added by the review stage because neither rung had done it;
  - the gate is green (testFast 1,401, testSystem 382);
  - the named stop condition was not met.
- **Fortress change.**
  - CODE: 7 files, +231/−89 (320 lines changed).
    - Library: 1 file, +2/−2 (CompilerLibrary.fss).
    - Java: 6 files, +229/−87 (CodeGen +56/−15, VarCodeGen +105/−15, MutableFValue +10/−4, BaseTask +8/−8, Transaction +38/−38, FIntLiteral +12/−7).
    - Scala, astgen and build: 0.
  - SPEC text: 0.
  - PDF: not rebuilt, 0 bytes.
- **Tests.** 11 files, +311/−3 (314 lines).
  - New plain tests: 4 tests in 8 files (252 .fss lines and 55 .test lines).
  - New XXX: 0. Promoted: 0. Deleted: 0.
  - Modified: 3 (Integer3.fss +1/−1, Integer4.fss +1/−1, IntegerChoose2.fss +2/−1).
  - Rung-suffixed names: 2 files (IntLiteralWrapRepairR2).
  - Largest new tests: `IntLiteralWrapRepairR2.fss` 75 lines, `AtomicTopLevelVar.fss` 67, `MutableTopLevelVarInLoop.fss` 65.
- **Records.** 263 new files and 4 modified, +6,153/−5 lines, 484,003 new bytes.
  - Record categories:

    | Category | Files | Lines | Bytes | Contents |
    |---|---|---|---|---|
    | REPORTS | 12 (8 new, 4 modified) | +1,739/−5 | 238,296 new | JUDGE, 2 REPORT, 2 SKEPTIC, 2 record.md, gate summary; CLIMB.md +2, compile-ladder/REPORT.md +11, REPAIR-BATCH.md ±1, remote-container.md +2/−1 |
    | CAPTURES | 49 | 1,896 | 141,894 | 40 .txt, 8 .out force-added past `*.out`, 1 .tsv |
    | PROBES | 70 | 1,167 | 30,802 | 51 for R1 (32 of them the skeptic's), 19 for R2 |
    | SCRIPTS | 10 | 464 | 20,867 | |
    | OTHER | 126 | 887 | 52,144 | .after 30, .before 15, .codegen-only 8, .compile 33, .compiled 13, .run 8, .skeptic 6, .walk 13 |

  - Five largest files:
    1. R2 `REPORT.md`, 406 lines, 27,383 B. The rung report.
    2. R2 `SKEPTIC.md`, 344 lines. The skeptic report.
    3. R1 `SKEPTIC.md`, 315 lines, 51,518 B. The skeptic report.
    4. R1 `REPORT.md`, 282 lines, 58,019 B. The rung report.
    5. R2 `probes/integer-test-after.out`, 174 lines. A JUnit test run.
  - CITED against UNCITED, by the task's rule:
    - Cited: 128 files, 4,663 lines. 28 of them are cited only from their own directory.
    - Uncited: 135 files, 1,474 lines.
    - Strict variant: cited 121 / 4,568, uncited 142 / 1,569.
    - 108 of the uncited files sit in the `probes/` directories, which are cited by path. That leaves 27 files (297 lines, `repair-r1-atomic-static/raw/tests/`) uncited under any reading.
- **Coordinator records.**

  | File | Lines | Bytes |
  |---|---|---|
  | FACTS.md | +18/−7 | +25,106/−11,821 |
  | fortress-gap-ledger.md | +20/−10 | +39,612/−17,539 |
  | microgpt-run-c-handover.md | +91/−25 | about +6.8K/−1.9K |
  | PLAN, POSITIONS, INDEX | 0 | 0 |

- **Ledger rows.**
  - Opened: 319 to 328 (10 rows: 319-324 by R1, 325-328 by R2).
  - Closed: 317 (repaired by R2).
  - Amended: 59, 70, 302 and 317.
  - This matches the records ("six ledger rows, three ledger appends"; "four rows are opened, 325-328").
- **Ratios.**
  - RECORDS lines per CODE+SPEC line changed: 6,153 / 320 = 19.2.
  - TESTS lines per CODE line: 314 / 320 = 0.98.
- **Anything odd.**
  - **Gate logs kept out, other `.out` files force-added.** The four gate logs (compileAll.out 176 KB, testFast.out 125 KB, testSystem.out 40 KB, library.out) were left out because `.gitignore:46` is `*.out`. The same batch force-added 8 other `.out` captures.
  - **Build logs not preserved.** 28 MB of scalac warnings in the rung worktrees were left out on purpose (`63db7a691`).
  - **Scratch drivers that cannot run.** `63db7a691` preserved three scratch drivers that are not runnable, because they hold absolute paths to worktrees that no longer exist.
  - **Empty files:** 43 committed at 0 bytes.
  - **Identical copies:** 15 copies identical to other files in the batch (for example `r2b.walk.before` equals `r2b.walk.after`), and 17 identical to blobs already in the tree.
  - **Near-identical captures:** five 26-line `differential-*.txt` and four `probe-runs2-*.txt` capture successive stages of one run.
  - **Citations off by one.** R1's records cite worktree line numbers; `ef1fa3640` corrected them for the merged tree.
  - Nothing was committed and then deleted; all files are at HEAD.

Method, shared by both batches. The figures sum `git show --numstat -M` over each batch's own commits. RECORDS bytes are the blob sizes at landing of the files the batch created, and a modified file counts only as its byte delta. Both totals match `git diff --diff-filter=A` over the batch paths: 287 files and 730,189 B for batch 1, 186 files and 668,007 B for batch 2.

CITED uses tracked `.md` files at HEAD (630 files) and ignores a file citing itself. A basename unique in the tree counts on a `git grep -F` basename hit. A basename that recurs, such as results.tsv, subset.txt, walk.txt or junit-after.txt, counts only when its rung-relative path is cited (for example `rung-timing/probes/walk.txt`, or `probes/walk.txt` inside that rung's own .md files). REPORT, SKEPTIC, record and JUDGE .md files count when cited through their directory or path. The looser literal basename grep is given as the upper bound.

Neither batch has a `climb-batch-N/RECORD.md`. Their records are `explorations/coordinator/CLIMB-BATCH-1.md` and `CLIMB-BATCH-2.md`, the per-rung `record.md` files, the gate summaries, and the landing commit messages and handover paragraphs.

### Climb batch 1 (2026-09-19)
- **Range:**
  - Base is `cb242a2d8` (07:14 UTC), the preparation commit. It holds `coordinator/CLIMB-BATCH-1.md` (77 lines), `coordinator/climb-batch-workflow.js` (749 lines, 70,214 B), FACTS +1, INDEX +2, PLAN +3/−1 and handover +1/−1. It is not counted below.
  - Landing commit is `261fedd71` (the gate, 11:33). The record says: "Landed … as `b70ed4590..261fedd71` off `cb242a2d8`". That is six contiguous commits in git, so it fits.
  - The batch has **9 own commits**:
    - four rung commits composed at the gather: `b70ed4590` F, `6823d52b6` M, `d928b9a54` N and `45cad71c3` T (10:37–10:49);
    - the review's corrections, `3d2d3c968`;
    - the gate, `261fedd71`;
    - three landing records: `6b788f0cc` (record closed), `25c08b391` and `227c0b9b3` (11:55–11:56).
  - There is no separate judge or repair commit. Rung N's refusal and judge ruling are inside its own commit (`rung-integral-ops/JUDGE.md`).
  - The run was `wf_3b5a273c-a80`: launched 07:15, cut 07:46, relaunched 08:24.
  - Cost, from `6b788f0cc`: 15 agents, 3.02 M tokens, 1,110 tool calls, 3 h 11 min.
  - Seven coordinator commits interleave: `8a00ca6e6`, `0de59a8a2`, `7e3620cf0`, `fa25b5508`, `02d083366`, `9d053586b` and `16448f2d6`. None touches a batch file. `fa25b5508` and `02d083366` each add a FACTS line about the run's Workflow: one says an interrupt kills it, the other that it survives a compaction.
- **Purpose:** "take the next climb targets and go through them with the batched machinery", as four rungs:
  - F: the 13 functional methods of `trait RR64`;
  - M: `Maybe`, `Just` and `Nothing`;
  - N: `MOD`, `REM`, `GCD`, `LCM`, `LSHIFT` and `RSHIFT`;
  - T: `recordTime` and `printTime`.
  
  **It did this.** All four landed and the gate was green in 830 s: testFast 1,409 and testSystem 382, with 0 failures. The +8 over the repair batch's 1,401 fits git, since `LibraryJUTest` went 69→77 for 4 new library tests counted twice each. The ladder pass count went 81→85. One expectation failed: rung M's expected clearance of `ExceptionScoping.fss` and `oddJuxt.fss` did not happen, as the record's own landing correction says.
- **Fortress change:**
  - CODE library: 4 files, +198/−13.
    - `CompilerBuiltin.fsi` +25/−2 and `.fss` +75/−1;
    - `CompilerLibrary.fsi` +22/−10 and `.fss` +76/−0.
  - Java: 1 file, +44/−0 (`nativeHelpers/simpleDoubleArith.java`).
  - Scala: 0.
  - CODE total: 5 files, 255 lines changed. No build files.
  - SPEC text: 0 files. PDF not rebuilt (0 B).
- **Tests:**
  - New plain: 4 tests, 8 files (4 `.fss` + 4 `.test`, all in `library_tests/`), +590/−0.
  - New XXX 0, promoted 0, modified 0, deleted 0.
  - Rung-suffixed names: 8 of 8 (RungF, RungM, RungN, RungT).
  - Largest new: `IntegralOpsRungN.fss` 255 lines, `RR64FunctionsRungF.fss` 118, `TimingRungT.fss` 84.
  - 80 of the 590 lines are the Oracle copyright header block and blank lines (about 10 per file). Commit `8bc7a164e` removed those headers on 09-21.
- **Records:** 288 files touched: 287 created, and one modified (`CLIMB-BATCH-1.md`, +9). Lines +8,954/−8. Created files total 730,189 B, plus 2,136 B on the modified file.

  | kind | files | lines +/− | bytes (created) |
  |---|---|---|---|
  | REPORTS | 15 (14 new) | +1,807/−8 | 352,748 |
  | CAPTURES | 85 | +2,723 | 180,863 |
  | PROBES | 58 | +1,579 | 52,712 |
  | SCRIPTS | 6 | +599 | 22,398 |
  | OTHER | 124 | +2,246 | 121,468 |

  - OTHER is entirely run output with extensions outside the CAPTURES list: `.compile` 66, `.compiled` 20, `.walk` 12, `.run` 4, and 22 `.before`/`.after`/`-after-repair`/`-fullrange` variants.
  - By rung:

    | rung | files | lines | bytes |
    |---|---|---|---|
    | rr64-functions | 66 | 2,228 | 188,851 |
    | maybe | 73 | 2,989 | 229,970 |
    | integral-ops | 112 | 2,601 | 225,048 |
    | timing | 35 | 1,011 | 81,526 |
    | climb-batch-1 gate summary | 1 | 116 | 4,794 |

  - Five largest, by lines:
    1. `rung-maybe/SKEPTIC.md`: 285 lines, 20,551 B. The skeptic's verdict. Cited.
    2. `rung-maybe/logs/ungated/GenTest4.txt`: 263 lines, 21,217 B. A compiler error dump holding 131 "Type name may refer to" errors from an ungated `not_working_library_tests` file. Uncited.
    3. `rung-rr64-functions/ladder-after/raw/tests/oprTests.fss.compile`: 259 lines, 22,682 B. One Java stack trace (258 of the 259 lines are frames). Uncited.
    4. `rung-maybe/logs/ungated/HelperTest1/2/3.txt`: 3 × 255 lines, 3 × 20,783 B. The same error dump three times, differing only in the file name. Uncited.
    5. `rung-integral-ops/raw/IntegralOpsRungN.junit.before`: 208 lines, 12,627 B. The gated test's JUnit run before the edit.
    
    By bytes the reports lead: integral-ops `REPORT.md` 49,619 B, rr64 `REPORT.md` 44,108 B, integral-ops `SKEPTIC.md` 38,064 B.
  - CITED against UNCITED, over the 287 created files:
    - cited: 171 files, 5,743 lines;
    - uncited: 116 files, 3,194 lines. Of these, 62 files (895 lines) sit in a directory that some .md names.
    - By kind (cited/uncited):

      | kind | files | lines |
      |---|---|---|
      | REPORTS | 14/0 | |
      | SCRIPTS | 6/0 | |
      | CAPTURES | 56/29 | 1,303/1,420 |
      | PROBES | 41/17 | 1,173/406 |
      | OTHER | 54/70 | 878/1,368 |

    - The literal basename grep gives an upper bound of 191 cited to 96 uncited (6,055 to 2,882 lines).
- **Coordinator records:**
  - `FACTS.md` +16/−3 (6 commits, 24,560 B added).
  - `fortress-gap-ledger.md` +14/−4 (6 commits, 46,795 B added).
  - `microgpt-run-c-handover.md` +39/−0 (5 commits, 9,382 B).
  - POSITIONS, PLAN and INDEX: 0.
  - These files keep one paragraph per line, so the line counts understate the bytes.
- **Ledger:**
  - Opened 10 rows, 329–338. Rows 329–336 came from the rungs; 337–338 were filed at the record close, owed since the repair batch.
  - Closed 0.
  - Appended to rows 71, 320 and 321.
- **Ratios:**
  - RECORDS lines (+/−) per CODE+SPEC line changed: 8,962/255 = **35.1**. With the preparation commit's 826 lines it is 38.4.
  - TESTS lines per CODE line: 590/255 = **2.3**.
- **Anything odd:**
  - **16 files were force-added past `.gitignore`:** 10 `*.out` (`.gitignore:46`) and 6 `*.log` (`:42`), all in `rung-rr64-functions/probes/`. The batch's own gate summary says its `.out` logs stay on disk because `.gitignore:46` ignores them.
  - **31 zero-byte files:** 23 in `rung-integral-ops/probes/` (silent `.compile` outputs), 5 in `rung-integral-ops/raw*` and 3 in `rung-timing/raw/`.
  - **Exact duplicates:** 11 redundant files, 84 lines. They are byte-identical before/after subsets, `subset.txt` three times in each of two rungs, and `.run.after` identical to `.run.after-repair`.
  - **Near-duplicates** (digits and worktree paths masked): 25 redundant files, 694 lines. 510 of those lines are the HelperTest1–3 copies.
  - **`run-subset.sh` was committed 4 times** (142–144 lines each, 570 lines). Each copy differs from rr64's in 6–12 diff lines, all path or reproduce-line changes. 35 copies are tracked today.
  - **`rung-integral-ops/` holds 112 files** for rung N, whose code is +62 library lines.
  - No whole build log was committed. No batch record file was later deleted: all 287 exist at HEAD.

### Climb batch 2 (2026-09-20)
- **Range:**
  - Base is `8590d7a9e` (09-19 20:39). The preparation commit `7366a65dd` (09-19 18:25) comes before the base and is not counted. It holds `CLIMB-BATCH-2.md` (89 lines, 23,651 B), `climb-batch-workflow.js` +111/−21 and INDEX +1.
  - Landing commit is `28f3f308a` (09-20 10:43 UTC). The handover says "ten commits off the base", which fits git.
  - The batch has **11 own commits**:
    - rungs composed at the gather: X `4e4b80253` (07:32), W `d98024425` (07:46) and B `4ed46558d` (07:56);
    - the review's corrections, `162beaecc`;
    - the review's judge, `fd6ad55c6`, and its repair, `a27e27ef0`;
    - the second review corrections, `4aa6a5313`;
    - the gate's judge, `a3dcd1a5b`, and its repair, `c766f6cc5`;
    - the hashes and gate summary, `28f3f308a`;
    - the landing record, `69b6dd1d5` (10:58).
  - The run was `wf_d1628adb-2ee`, launched 05:29.
  - Cost, from `69b6dd1d5`: 17 agents, 3,748,433 tokens, 1,496 tool calls, 5 h 16 min.
  - Eight coordinator commits interleave. Only `e8059a765` touches a batch file: it wrote the handover's "is running" paragraph, which `69b6dd1d5` replaces. The others (`238a61fc8`, `7de996739`, `dc0bc2bd6`, `555cd9c87`, `e89699335`, `e88e31d2a`, `cad3dc16c`) are protocol, post-mortem and a library review.
  - The landing record's "three unrelated post-mortem commits" above X are, in git, two post-mortem commits and one review (`e88e31d2a`).
- **Purpose:** "Three small additions to the compiler's library":
  - X: the exported top-level variable links (row 320, the one Java rung);
  - W: `widen`, `narrow`, `unsigned` and `signed`;
  - B: `TryAtomicFailure`.
  
  **It did this in part.** All three landed and the gate went green: testFast 1,422, testSystem 384, 39 of 39 four-thread `atomic` runs, and the ladder regression printed nothing. The pass count stayed at 85, as predicted. Three of the four declared moves happened; `abortTest` stayed at disambiguate.
  
  X repaired only the mutable half of row 320. The class-name half was reclassified as a linker design question and gated by an XXX test, not repaired. The gate went red once, on shard arithmetic, and was repaired by changing the comparison criterion.
- **Fortress change:**
  - CODE library: 4 files, +24/−5.
    - `CompilerBuiltin.fsi` +8 and `.fss` +10/−1;
    - `CompilerLibrary.fsi` +2 and `.fss` +4/−4.
  - Java: 1 file, +25/−3 (`CodeGen.java`).
  - Scala: 2 files, +12/−1 (`STypeChecker.scala` +11, `impls/Operators.scala` +1/−1).
  - CODE total: 7 files, 70 lines changed.
  - SPEC: 0. PDF not rebuilt.
- **Tests:** 22 new files, +541/−1.
  - New plain: 5 tests, 12 files, 348 lines.
    - `ExportVarRungX` with its 4 api and library companions;
    - `IntConversionsRungW`;
    - `TryAtomicRungB`;
    - two link-only `…Link.test` files with no source of their own, which link the XXX files' source.
  - New XXX: 5 tests, 10 files, 193 lines.
    - `XXXExportVarRungXFrozen`, added at the gather;
    - `XXXExportVarRungXLinked`;
    - `XXXBoxDotSpellingsRungW`;
    - `XXXClauseBindingRungB`;
    - `XXXTryAtomicCodegenRungB`, added by the review judge's repair.
  - Promoted 0, pre-existing modified 0, deleted 0. `TryAtomicRungB.fss` was edited once within the batch (−1).
  - Rung-suffixed names: 22 of 22.
  - Largest new: `IntConversionsRungW.fss` 122 lines, `TryAtomicRungB.fss` 59, `XXXClauseBindingRungB.fss` 33.
  - 221 of the 540 test lines at landing (41%) are the copyright header block.
  - The counts fit git: `LibraryJUTest` went 77→83 and `CompilerJUTest` 652→659. testSystem's 384 equals the base's count (`JUDGE-gate.md:55-57`); no file under `tests/` was added.
- **Records:** 190 files touched: 186 created and 4 modified (`climb-batch-workflow.js` +9/−7, `climb-batch-workflow.md` 1/1, `map/dormant-code.md` 2/2, `map/test-coverage.md` 1/1). Lines +9,352/−71. Created files total 668,007 B, plus 1,409 B on the modified files.

  | kind | files | lines +/− | bytes (created) |
  |---|---|---|---|
  | REPORTS | 17 (14 new) | +3,505/−24 | 311,880 |
  | CAPTURES | 92 | +4,544/−40 | 315,706 |
  | PROBES | 73 | +820 | 17,175 |
  | SCRIPTS | 5 (4 new) | +346/−7 | 13,240 |
  | OTHER | 3 `.compile` | +137 | 10,006 |

  - By rung:

    | rung | files | lines | bytes |
    |---|---|---|---|
    | export-var | 59 | 2,774 | 157,509 |
    | int-conversions | 61 | 2,105 | 170,225 |
    | tryatomic | 48 | 2,817 | 235,370 |
    | climb-batch-2 | 18 | 1,643 | 104,903 |

    The two judge rulings and two repair reports alone are 1,161 lines and 83,833 B.
  - Five largest, by lines:
    1. `rung-export-var/REPORT.md`: 498 lines, 33,034 B. The rung report.
    2. `rung-tryatomic/raw/bytecode-optimize.txt`: 457 lines, 100,812 B, which is 15% of the batch's new record bytes. The whole bytecode-optimizer log over 10 jars, including ten 1,464-character classpath lines and `OutOfMemoryError` traces. Cited once (`REPORT.md:342`).
    3. `rung-tryatomic/REPORT.md`: 449 lines, 29,634 B.
    4. `rung-export-var/SKEPTIC.md`: 407 lines, 25,819 B.
    5. `climb-batch-2/JUDGE-gate.md`: 370 lines, 27,239 B. The judge's ruling on the red gate.
    
    The largest uncited file is `rung-int-conversions/before/raw-ladder/tests/UnsignedTest.fss.compile.txt`, 221 lines: a compile error dump from before the edit.
  - CITED against UNCITED, over the 186 created files:
    - cited: 123 files, 7,829 lines;
    - uncited: 63 files, 1,450 lines. Of these, 52 files (925 lines) sit in a directory that some .md names.
    - By kind (cited/uncited):

      | kind | files | lines |
      |---|---|---|
      | REPORTS | 13/1 | |
      | SCRIPTS | 4/0 | |
      | CAPTURES | 68/24 | 3,628/876 |
      | PROBES | 37/36 | 426/394 |
      | OTHER | 1/2 | 5/132 |

      The one uncited report is `gate/ladder/microgpt-phase.md`, 48 lines.
    - The literal basename grep gives an upper bound of 134 cited to 52 uncited (8,210 to 1,069 lines).
- **Coordinator records:**
  - `FACTS.md` +16/−3 (6 commits, 20,806 B).
  - Ledger +18/−7 (5 commits, 46,337 B).
  - Handover +10/−4 (6 commits, 14,614 B).
  - POSITIONS, PLAN and INDEX: 0.
- **Ledger:**
  - Opened 11 rows, 343–353.
  - Closed 0, which fits the record's "no row closed".
  - Appended to rows 13, 79, 320 and 326.
- **Ratios:**
  - RECORDS lines per CODE+SPEC line changed: 9,423/70 = **134.6**.
  - TESTS lines per CODE line: 542/70 = **7.7**.
- **Anything odd:**
  - **Gate artifacts were committed twice.** `c766f6cc5` landed `summary.txt`, `ladder.tsv` and `microgpt-phase.md` as the comparand. `28f3f308a` replaced them with a rerun's copies that differ only in timing columns (`ladder.tsv` 38/38, the other two 2/2).
  - **2 zero-byte files:** `gate/ladder/comparison.txt` and `microgpt-comparison.txt`, both empty diffs.
  - **`run-subset.sh` was committed twice**, 285 lines.
  - `repair/workflow-script-check.txt` (103 lines) is a check dump of the workflow script.
  - No exact duplicates. Near-duplicates: 3 files, 18 lines. `P8Main.fss` and `P9Main.fss` match with digits masked, and `junit-xxx-tryatomic-expected` and `-green-again` differ only in `Time:`.
  - No whole build log was committed: the gate logs under `tmp/gate-batch-2/` are not committed, per `28f3f308a` and `.gitignore:64`. No record file was later deleted.
  - After landing, `fd5cb4864` (09-28) promoted `XXXClauseBindingRungB` to a plain name.

Scratch scripts are in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/characterize/batches-1-2/; the repository was not changed.

## Climb batches 3 and 3.5: what the batch practice committed (measured 2026-09-29 at HEAD `e0a29b321`)

**How this was measured.** Sums come from `git show --numstat -M` over each batch's own commits on main. Lines are the per-commit sums, so a line edited twice counts twice. Bytes are the size of each new file at the batch's last commit. Records are files under `explorations/`, apart from the six coordinator files. The runner's `.compile` and `.run` raw outputs have extensions outside the CAPTURES list, so they are counted under OTHER. The existing batch record `explorations/coordinator/CLIMB-BATCH-3.md` counts as a REPORT and `climb-batch-workflow.js` as a SCRIPT.

"Cited" means the file's basename appears in any of the 630 tracked `.md` files at HEAD, other than the file itself. REPORT, record, SKEPTIC, JUDGE, RECORD, JUDGE-review and REPAIR-review are cited through their directory; every one of them was. A stricter test was also run: when a basename recurs in the tree, the cited text has to include a path suffix of at least two components. Neither batch's own records give file or line counts. The test counts they do give match git and the landed gate summaries.

### Climb batch 3
- **Range.**
  - Base `d610695c0` (2026-09-22 18:52 UTC). The gate ran on `02c89bd79`. The landing records are `99c4715ac` and `1f01052bd` (2026-09-23 04:36 and 04:37).
  - 16 commits of its own, 2026-09-22 23:57 to 2026-09-23 04:37:
    - five rung commits: `a7ced6764` L, `c2b4e2c95` C, `9782955b1` R, `6bec1b004` S, `d28cf74d0` M;
    - the gather and rung P's record: `a071fe409`;
    - the first review's corrections: `767f7a6f6`;
    - the judge's ruling: `1312a4dce`;
    - the repair: `763ba87bc`;
    - the second review's corrections: `f4485ad73`;
    - Pavol's decision on the count: `0839428f1`. I counted it in the batch because it edits the batch's `RECORD.md` and the manifest;
    - the landing: `94325f0d5`, `5c1f44b82`, `02c89bd79`;
    - hashes and gate summary: `99c4715ac`;
    - landing paragraph: `1f01052bd`.
  - Coordinator commits left out: `343820f2c`, `21728f9d7`, `cfdc67f73`, `b0789fc43`, `3326c7272`, `5c1defe40`, `7f9ad71e6`, `228b35c49`, `b82154b30`. They touch only the shared coordinator files (the handover, POSITIONS, the ledger, INDEX and FACTS) and none of the batch's rung or record files.
- **Purpose.**
  - The batch record (`CLIMB-BATCH-3.md`): "the first batch of the library route". Rungs P and L were to cut the checker's error count over `FortressLibrary` from 93 to 23; C, R, S and M were four small decided items.
  - Only partly done. P stopped (judge's ruling) and landed no source. The count rose 93 → 103 instead of falling to 23; Pavol declared 103 at the landing. L, C, R, S and M landed. L's fifth fix, `Condition.map`, landed ungated.
- **Fortress change.**
  - CODE: 10 files, +118/−26 (144 lines).
  - Library: 5 files, +49/−22. These are `FortressLibrary.fsi` +20/−8, `RangeInternals.fsi` +11/−11, `List.fsi` 0/−1, `FortressLibrary.fss` +15/0 and `LibraryBuiltin/CompilerBuiltin.fss` +3/−2. Rung C's +31 of these are comments only.
  - Java: 3 files, +47/−2. These are `stringOps.java` +45, `Float.java` ±1 and `RR32.java` ±1.
  - Scala: 2 files, +22/−2 (`TraitTable.scala` +20, `TypeAnalyzer.scala` ±2).
  - SPEC text: 0 files. The PDF was not rebuilt (0 bytes).
- **Tests.**
  - 34 files, +382/−1.
  - New plain: 9 files, +110. That is `tests/RoundHalfEvenRungR.fss`, `compiler_tests/DefaultRenderRungS.fss` with its `.test`, and six `*Link.test` link stages of expected-failure pairs.
  - New XXX: 24 files, +271. That is 8 interpreter `.fss` tests and 8 compiler `.fss` + `.test` pairs.
  - Promoted: 0. Modified: 1 (`library_tests/TryAtomicRungB.fss`, +1/−1). Deleted: 0.
  - The suite counts agree with git. `testSystem` went 384 → 393, which is +9, the nine interpreter `.fss` files. `testFast` went 1,422 → 1,438, which is +16; the compiler track went 659 → 675 from 15 new `.test` files, one of which has two stages.
  - Rung-suffixed names: 31 of the 33 new files. Only `XXXRadixTenPointNumeral.fss` and `XXXRoundNearTieNumeral.fss` carry none.
  - Largest new test files: `DefaultRenderRungS.fss` 52 lines, `RoundHalfEvenRungR.fss` 41, `XXXUnionReturnRungS.fss` 20.

**Records** (461 files touched, 459 of them new; +19,250/−82 lines; 1,521,315 bytes of new files)

| Kind | Files | Lines | Bytes (new files) |
|---|---|---|---|
| REPORTS | 27 (26 new + `CLIMB-BATCH-3.md`) | +4,207/−80 | 730,574 |
| CAPTURES | 244 new | 11,828 | 672,162 |
| PROBES | 107 new | 1,776 | 48,318 |
| SCRIPTS | 24 (23 new + the workflow script, +11/−2) | +844/−2 | 41,832 |
| OTHER | 59 new (38 `.compile`, 20 `.run`, 1 `.patch`) | 595 | 28,429 |

- **Where the new records came from.**
  - The five rung commits brought 420 of the 459 new files (16,932 lines at landing). The stages after the gather brought 39 (2,225).
  - By directory: rung-library-defects 137 files, rung-default-rendering 128, rung-library-comments 64, rung-round-half-even 56, rung-analyzer-memo 44, rung-exclusion-relax (P, which landed nothing) 21 files / 929 lines, climb-batch-3 9.
- **The five largest new records, by lines.**
  - `rung-library-defects/probes/ladder-before-after-diff.txt`: 1,529 lines, 58 KB. An output comparison; 1,407 of its lines are three diffs of about 469 lines each, of microGPT compile outputs (`AplMgSyntax.fsi`, `AplMgSyntax.fss`, `MicroGptApl.fss`).
  - `rung-default-rendering/probes/test-preedit.txt`: 1,067 lines, 110 KB. A junit run on the base prelude; 1,042 of its lines are the stack frames of one `StackOverflowError`.
  - `rung-library-comments/REPORT.md`: 450 lines. The rung's report.
  - `rung-library-comments/SKEPTIC.md`: 449 lines. The skeptic's report.
  - `rung-round-half-even/SKEPTIC.md`: 364 lines. The skeptic's report.
  - The next largest capture is `rung-library-defects/probes/checker-count-postedit-run.txt`, 359 lines: a checker probe run.
- **Cited against uncited.**
  - Basename test: 311 files cited (17,597 lines), 148 uncited (1,560 lines, 51.7 KB). The uncited are 62 captures, 58 OTHER and 28 probes. All 26 new reports are cited.
  - Stricter path test: 298 cited, 161 uncited (1,878 lines).
  - Of the 148 uncited:
    - 112 files (932 lines) sit in directories a report cites as a whole: `ladder-before/`, `ladder-after/`, `pre/`, `post/` and the four `controls-pre/`/`controls-post/` directories.
    - 28 files (466 lines) are named only by stem, without their extension.
    - 8 files (162 lines) are cited nowhere. These are rung-library-defects' `SkepticL*`, `junit-xxx-*skeptic.txt` and `compiled3q-compile-with-fix.txt`, and rung-default-rendering's `gated-spot-postedit.txt`.
- **Coordinator records.**
  - `FACTS.md` +20/−11 (about +41 KB/−24 KB).
  - `fortress-gap-ledger.md` +53/−29 (about +149 KB/−81 KB; each ledger row is one line).
  - `microgpt-run-c-handover.md` +24/−10.
  - `POSITIONS.md` +1/0; `INDEX.md` +4/0; `PLAN.md` 0.
- **Ledger rows.**
  - Opened 24 (rows 354–377). The ledger went from 352 to 376 rows.
  - Row 329 closed (fixed by R).
  - Row 321 "Repaired … except for one case".
  - Row 370 was opened and fixed by M's own commit.
  - Notes appended to rows 49, 76, 293, 307 and 341 (twice).
- **Ratios.**
  - Records per CODE+SPEC line changed: 19,332 / 144 = 134. Counting additions only, 19,250 / 144 = 134.
  - Test lines per CODE line: 383 / 144 = 2.7.
- **Anything odd.**
  - **22 empty files.** Twenty are empty `.compile` outputs in rung S's `pre/` and `post/` raw directories; the other two are the gate's empty `comparison.txt` and `microgpt-comparison.txt`.
  - **Duplicated content.** 22 groups of non-empty files are byte-identical, which makes 61 redundant copies (494 lines, 13.5 KB):
    - each of the 13 control captures is committed four times (`probes/controls-pre`, `controls-post`, `skeptic/controls-pre`, `skeptic/controls-post`);
    - the 17-line checker-count table is committed six times identical, and three more times as the post-edit table;
    - rung C's pre and post `checker-count-*-run.txt` are identical (253 lines each);
    - rung S's `pre/` and `post/` raw outputs are pairwise identical;
    - rung L's `ladder-before` and `ladder-after` `summary.txt` and `microgpt.tsv` are identical.
  - **Copies of files already in the tree.** 29 new files are byte-identical to files that existed before the batch, for example `checker-count-preedit.txt` equals `gate-baseline/checker-count.txt`.
  - **A second `run-subset.sh`.** Two more copies of `run-subset.sh` were added (156 and 142 lines, differing by 22 lines); 35 copies are tracked at HEAD.
  - **Stack traces.** Stack frames make up 1,734 lines, in 37 capture files.
  - **No build logs.** No whole build log was committed; the gate's logs stayed untracked under `tmp/gate-batch-3/`.
  - **Records for a rung that landed nothing.** P, which landed no source, left 21 record files. Sixteen of them were copied in at the review so that citations would not dangle.
  - **Deletions.** Nothing was committed and then deleted inside the batch. Later, `compiler_tests/XXXNatArgRungS.fss` and its `.test` were deleted at `e893a3e00` (2026-09-26).
  - **Placeholders.** The `<short hash>` placeholders were filled in a separate commit (`99c4715ac`, 15 files).

### Climb batch 3.5
- **Range.**
  - Base `abdfbb2db` (2026-09-24 00:12 UTC). The gate ran on `579b056c4`. The landing record is `666a24d06` (04:49).
  - 7 commits of its own, 02:52 to 04:49:
    - rung B: `ce0c7f453`;
    - rung I, with the gather: `d6faad28f`;
    - the first review's corrections: `5ca632dea`;
    - the judge's ruling: `decc970df`;
    - the repair: `c9faa7df4`;
    - the second review's corrections: `579b056c4`;
    - hashes and gate summary: `666a24d06`.
  - Coordinator commits left out: `b49f6a4ef`, `2e75daee4` and `be3baa228`. They touch none of the batch's files.
- **Purpose.**
  - The batch record (`CLIMB-BATCH-3.5.md` §1): "The integer semantics Pavol decided on 2026-09-22 … on both paths": ledger rows 333, 334, 335 and 346.
  - Done. Rows 333 and 334 are marked fixed. Both halves of rows 335 and 346 landed. Both rungs were approved and both gates were green.
- **Fortress change.**
  - CODE: 15 files, +238/−131 (369 lines).
  - Library: 6 files, +84/−77. These are `RangeInternals.fss` +51/−51 and `.fsi` +8/−8 (renamed parameters), `FortressLibrary.fss` +8/−6 and `.fsi` +5/−4, `List.fss` ±2 and `CompilerBuiltin.fss` +10/−6.
  - Java: 9 files, +154/−54. These are `Int.java` +44/−5, `simpleLongArith` +25/−30, `BigNum` +25/−3, `simpleIntArith` +17/−6, `Long` +17/−6, `UnsignedLong` +13/−2, `simpleArbitraryPrecisionArith` +8/−1, `NN32` +4/−1 and `WellKnownNames` +1.
  - Scala: 0 files.
  - SPEC text: 0 files. The PDF was not rebuilt.
- **Tests.**
  - 9 files, +398/−26.
  - New plain: 3 files, +332 (`compiler_tests/IntSemanticsRungB.fss` 170 lines with its `.test`, and `tests/IntSemanticsRungI.fss` 157).
  - New XXX: 3 files, +58 (`tests/XXXFixedWidthOverflowRungB.fss` 41, and `compiler_tests/XXXShiftDeclRungI.fss` with its `.test`).
  - Promoted: 0. Deleted: 0.
  - Modified: 3 files, +8/−26 (`IntConversionsRungW.fss` +5/−23, `IntegralOpsRungN.fss` ±1, `RangePrototype.fss` ±2).
  - The suite counts agree with git. `testSystem` went 393 → 395. `testFast` went 1,438 → 1,441, with the compiler track at 678.
  - Rung-suffixed names: 6 of the 6 new files.
  - Largest new test files: 170, 157 and 41 lines, as above.

**Records** (216 new files, none modified; +10,181/−56 lines; 812,618 bytes of new files)

| Kind | Files | Lines | Bytes |
|---|---|---|---|
| REPORTS | 11 | +1,468/−56 | 358,566 |
| CAPTURES | 135 | 4,819 | 264,829 |
| PROBES | 35 | 1,522 | 57,634 |
| SCRIPTS | 7 | 344 | 14,705 |
| OTHER | 28 (26 `.compile`, 2 `.run`) | 2,028 | 116,884 |

- **Where the new records came from.** Rung B's commit brought 78 files (4,090 lines at landing), rung I's 117 (4,699), and the later stages 21 (1,336).
- **The five largest new records, by lines.**
  - `rung-int-semantics-compiled/ladder-after/raw/tests/QuickCheckTest.fss.compile` and its twin under `ladder-before`: 603 lines each. Compile-error output from the ladder, and the two are byte-identical.
  - `rung-int-semantics-walk/probes/harness-regression-1.txt`: 491 lines. A test-harness run; 432 of its lines are stack frames.
  - `rung-int-semantics-walk/probes/route-i-trial-patch.txt`: 352 lines. A git diff of a trial library patch.
  - `climb-batch-3.5/repair/nn-lcm-zero-red-before.txt`: 340 lines. A walk run; 333 of its lines are the stack frames of one `ArithmeticException`.
- **Cited against uncited.**
  - Basename test: 176 files cited (7,896 lines), 40 uncited (2,229 lines, 127 KB). The uncited are 20 OTHER, 19 captures and 1 probe.
  - Stricter path test: 173 cited, 43 uncited (2,384 lines).
  - Of the 40 uncited:
    - 20 files (1,846 lines) are the raw ladder outputs, cited only as directories (`ladder-before/raw/` and `ladder-after/raw/`, rung B's `REPORT.md:98`);
    - 14 files (299 lines) are named only by stem;
    - 6 files (84 lines) are cited nowhere: rung B's skeptic's `Sk*-walk.txt` and `Sk*-compiled.txt` captures.
- **Coordinator records.**
  - `FACTS.md` +13/−7 (about +22 KB/−13 KB).
  - Ledger +37/−28 (about +135 KB/−102 KB).
  - Handover +9/−5.
  - POSITIONS, PLAN and INDEX: 0.
- **Ledger rows.**
  - Opened 9 (rows 378–386).
  - Closed within the batch: 378, 382, 385 and 386.
  - Closed among existing rows: 333 and 334 are marked fixed; 335 and 346 have both halves landed.
  - Partial: row 336 (the `LCM` route closed on the signed types only).
  - Still open: row 347.
  - 379 and 383 were gated as expected failures.
- **Ratios.**
  - Records per CODE+SPEC line changed: 10,237 / 369 = 27.7.
  - Test lines per CODE line: 424 / 369 = 1.15.
- **Anything odd.**
  - **An identical ladder pair.** Rung B's `ladder-before/raw` and `ladder-after/raw` are byte-identical: `diff -r` prints nothing across 14 files and 1,014 lines per side. The skeptic records this at `SKEPTIC.md:53`, and the pair was committed anyway, 2,028 lines.
  - **Duplicated content.** 17 groups of non-empty files are byte-identical, which makes 20 redundant copies (1,201 lines, 65 KB):
    - the 17-line checker-count table is committed five times, and the copies are also identical to batch 3's `gate/checker-count.txt`;
    - `IntSemProbe-before.txt` equals `IntSemProbe-overlay-base.txt` (113 lines).
  - **Copies of files already in the tree.** 7 new files are byte-identical to files committed earlier.
  - **Empty files.** 4 empty files were committed.
  - **Stack traces.** Stack frames make up 1,295 lines, in 22 files. `SkR2NN32Lcm0.walk.txt` and `SkR2NN64Lcm0.walk.txt` are 117 of 123 lines each.
  - **No build logs.** The gate's logs stayed untracked under `tmp/`.
  - **Deletions.** Nothing was committed and then deleted inside the batch. Later, `tests/XXXFixedWidthOverflowRungB.fss` was deleted at `917bb7b32` (2026-09-27).
  - **Placeholders.** They were filled in a separate commit again (`666a24d06`, 12 files, +291/−36).


### Climb batch 4

Method, used for both batches: `git show --numstat -M` summed over each batch's own commits on `main`, then classified by path. Bytes are blob sizes of the files each batch added, taken at its last commit. CITED means the basename appears (plain substring, as `git grep -F` matches) in a tracked `.md` other than the file itself at HEAD `e0a29b321`. For a basename that sits in 4 or more directories (REPORT.md, record.md, SKEPTIC.md, JUDGE.md, RECORD.md, NOTE.md, the gate files and the per-test ladder outputs), the check is instead whether its parent directory or unique path is named. Scratch scripts are in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/characterize/batches-4-5/`.

- **Range:**
  - Base `47437c65f` (2026-09-26 01:30 UTC), landing record `cb5bd2dd5` (07:02 UTC).
  - 7 own commits, in order:
    - `3f297441c` rung N
    - `57600bc27` rung K
    - `b628871a2` rung C
    - `488b47934` rung O's record
    - `ef1ff3ec5` re-anchoring
    - `b5acbe591` review corrections
    - `cb5bd2dd5` hashes and gate
  - No coordinator commit falls between them. The six before them (`6fb4a9917`…`9e288c508`) and the two after (`2a6a9d438`, `9fed5880d`, the latter being Pavol's go to push) touch no batch file. Later coordinator commits that edit batch-4 text: `242eca825` (handover), `2c948a106` (CLIMB-BATCH-4.md), `16ae456f4` (ledger rows 348/379/403), `7e16c4442` (FACTS).
  - The range diff (830 files, +34,043/−133) equals these 7 commits plus the 6 earlier coordinator commits' 4 files.
- **Purpose:** five rungs were planned (CLIMB-BATCH-4.md §1); S was held out of the manifest.
  - C: coercion in the interpreter.
  - N: sizes in the compiled type checker.
  - K: the shift count (rows 380/381).
  - O: overflow in the interpreter (row 379).
  - **Result:** C, N and K landed. O stopped on its count of 11 changed interpreter tests and landed only its records (42 files). The gate was green: testFast 1,460, compiler track 697 = 678+12+7, testSystem 407 = 395+12, checker 103→125 as declared. The push was held on C's stop until Pavol's word.
- **Fortress change:**
  - CODE, 55 files, +1,910/−116:
    - library: 2 files, +6/−6 (FortressLibrary.fsi/.fss, K).
    - Java: 40 files, +1,649/−30. Of these, 10 are hand-written (+417/−30; C 8 files +405/−29, including the new Coercions.java at 271 lines; N 2 files). The other 30 are generated `nodes/*.java` (+1,232/−0), regenerated from `astgen/Fortress.ast` (+5).
    - Scala: 12 files, +250/−80 (N; Formula.scala +161/−56; includes FormulaJUTest.scala +1/−1).
  - SPEC: none. PDF not rebuilt.
- **Tests:** 48 files, +864/−11. Every test fits the record's counts.
  - New plain: 12 tests in 17 files, +374.
    - N: 4 compiler `.test` (NatExport/Inferred/Method/WrittenChecker).
    - C: 2 compiler link `.test` and 6 `tests/*.fss`.
  - New XXX: 18 tests in 30 files, +483/−11.
    - N: 8 compiler tests.
    - C: 4 compiler tests and 6 interpreter tests.
    - The −11 is the review's edit of the "(provisional)" messages in 8 of C's files.
  - Promoted, deleted: 0.
  - Modified: 1 existing file, IntSemanticsRungI.fss (+7).
  - Rung-suffixed: all 22 of C's new files (`*RungC*`) plus the modified `IntSemanticsRungI`. N's 25 new files have no rung suffix.
  - Largest new: CoercionBindRungC.fss 55, CoercionOverloadRungC.fss 54, CoercionMostSpecificRungC.fss 48.
  - 10 of the batch's test files are gone at HEAD: promoted or removed later in `e893a3e00`, `041682188` and `8dc1a74d9`.
- **Records:** 720 files, +30,727/−30, 3,822,154 B new. 719 are new; the one modified is FACTS-history.md (+3).

  | Kind | Files | Lines | Bytes (new) |
  |---|---|---|---|
  | REPORTS | 17 | +2,103/−30 | 455,088 |
  | CAPTURES | 176 | +24,125 | 3,235,688 |
  | PROBES | 147 | +3,038 | 72,133 |
  | SCRIPTS | 30 | +933 | 47,937 |
  | OTHER | 350 | +528 | 11,308 |

  - OTHER is 346 per-test ladder outputs (`.compile`/`.run`, 214 of them empty) and 4 `.patch` files.
  - By commit: N 475 files/+16,621; K 56/+2,181; C 143/+9,304; O 43/+2,286.
  - Five largest, all cited:
    1. `rung-nat-checker/probes/perdecl-after.txt`: 3,114 lines, 800 KB. A per-declaration checker dump (PhaseProbe typecheck of FortressLibrary.fss).
    2. `…/perdecl-ab-sizes-equal.txt`: 3,096 lines, 797 KB. The same dump on a deliberately altered build; it differs from (1) in 104 lines.
    3. `…/perdecl-before.txt`: 2,506 lines, 550 KB. The same dump before the edit.
    4. `…/junit-before.txt`: 1,551 lines, 126 KB. A JUnit run captured failing.
    5. `rung-interp-coercion/probes/compileall-repair.txt`: 881 lines, 180 KB. A whole `ant compileAll` build log.
  - CITED 255 files / 27,023 lines; UNCITED 465 files / 3,704 lines.
    - 348 of the uncited are ladder raw outputs (356 lines); the directories are cited, the files are not.
    - The other 117 are 68 probes, 41 captures, 7 scripts and 1 other.
    - 113 uncited files have a named parent directory. Only 16 files (6 lines) are named by neither directory nor stem.
- **Coordinator records:**
  - FACTS.md +24/−19
  - fortress-gap-ledger.md +31/−14
  - handover +14/−6
  - PLAN, POSITIONS, INDEX: 0
- **Ledger:**
  - Opened 17: 387–403 (C 387–397, N 398–402, O 403). N's provisional 388 was withdrawn into row 21.
  - Closed 1: row 380, "Fixed `57600bc27` by rung K".
  - Notes appended to rows 19, 21, 146, 307, 340, 379, 380 and 381.
- **Ratios:**
  - RECORDS lines per CODE+SPEC line changed: 30,727/2,026 = 15.2. Without the generated Java: 30,727/794 = 38.7.
  - TESTS lines per CODE line: 875/2,026 = 0.43, or 1.10 without the generated Java.
- **Anything odd:**
  - The three perdecl dumps hold 8,716 lines: 28% of the batch's record lines and 56% of its new record bytes.
  - 84 redundant copies in 53 identical-blob groups (603 lines).
    - Most are ladder `.run` before/after pairs.
    - Rung K's `checker-count-before-full.txt` and `-after-full.txt` are identical (359 lines each).
    - Three checker-count captures are identical to `climb-batch-3.5/gate/checker-count.txt`, and N's `checker-count-after.txt` is identical to `climb-batch-4/gate/checker-count.txt`.
  - 125 new files are byte-identical to files already under `explorations/` at the base (393 lines). Examples: ladder `.run` files matching `baseline-2026-09-19/raw`, and `harness-one.sh`.
  - One whole build log.
  - No record file was later deleted: all 720 are at HEAD.

### Climb batch 5 (2026-09-26), its own 9 commits

- **Range:**
  - Base `6030e4b36` (11:09 UTC), landing record `ebc134652` (17:54 UTC).
  - 9 own commits, in order:
    - `e893a3e00` rung Z
    - `3924e7ec3` rung S
    - `0b1881317` rung D's record
    - `601f52736` gather follow-up
    - `da53904cd` review corrections
    - `fe002948e` judge's ruling on the review
    - `396ee649f` repair
    - `896bacc7d` second review's corrections
    - `ebc134652` hashes and gate
  - Interleaved: `b0f48231d` (another agent's max/min judgement, 16 files +874 under `explorations/reviews/`, no batch file).
  - Coordinator commits right after that touch the batch's shared files:
    - `8b5c0fde9`: ledger rows 421–429, including D's provisional rows as 427–429; FACTS.
    - `123a5bb0d`: handover and PLAN.
    - `cd99b80e7`: FACTS.
  - The 16 coordinator commits before the batch touch no rung file.
- **Purpose:** three rungs (CLIMB-BATCH-5.md §1).
  - D: the wrapping operators.
  - S: the specification states instantiation exclusion and rewrites the refused examples.
  - Z: sizes at run time.
  - **Result:** Z and S landed. D stopped for Pavol and landed later that day as a follow-up (next section). S's calculi stop was answered by further follow-ups.
  - The gate was green: testFast 1,537, compiler track 768 = 697+68+3 command lines, RTTIsizeJUTest 6, testSystem 407, checker 125.
  - The push went out at about 17:56 before rung S's stop was lifted (RECORD.md:7).
- **Fortress change:**
  - CODE, 8 files, +240/−6:
    - library: 0.
    - Java: 7 files, +238/−5 (OverloadSet, CodeGen, FreeVarTypes, RTTI, the new RTTIsize.java at 50 lines, MethodInstantiater, Naming).
    - Scala: 1 file, +2/−1 (TypeAnalyzer).
  - SPEC text: 11 `.tex` files, +722/−45. S contributed +713/−36 (changes.tex +406); the repair 4 files, +9/−9.
  - PDF rebuilt twice: 1,980,587 → 2,018,051 B (`3924e7ec3`) → 2,018,515 B (`396ee649f`).
- **Tests:** 69 files, +765/−11. They fit the record's "+29 net, +3".
  - New plain: 23 `.test` (Z 22, repair 1) in 41 files, +468.
  - New XXX: 9 (Z 7, repair 2) in 18 files, +172/−1.
  - Promoted: 3. XXXNatArgRungS, from batch 3, and N's XXXNatDispArmChecker and XXXNatOverrideChecker. That is 8 files, +15/−9: 3 `.fss` renamed, 3 plain `.test` added, and 3 XXX `.test` deleted. Git pairs one deletion with the new XXXNatRtTask.test as a rename.
  - Modified: 1 (NatArgRungSLink.test, +1/−1).
  - JUnit: RTTIsizeJUTest.java +109 (6 tests).
  - Rung-suffixed: Z's new files have none. The 3 touched files carrying `RungS` are inherited from batch 3.
  - Largest new: RTTIsizeJUTest.java 109, NatRtClosure.fss 49, NatRtBigSize.fss 44.
- **Records:** 1,018 files, all new, +84,310/−46, 5,772,674 B.

  | Kind | Files | Lines | Bytes (new) |
  |---|---|---|---|
  | REPORTS | 15 | +2,504/−46 | 437,591 |
  | CAPTURES | 171 | +78,501 | 5,238,246 |
  | PROBES | 118 | +1,719 | 41,058 |
  | SCRIPTS | 27 | +810 | 41,292 |
  | OTHER | 687 | +776 | 14,487 |

  - OTHER is 685 ladder `.compile`/`.run` outputs (430 empty) from rung Z's four ladder runs and natreflect, plus 2 `.patch` files.
  - By commit: Z 880 files/+18,892; S 105/+48,373; repair 20/+16,092; the gather, review and judge commits +953 in total.
  - Five largest, all cited:
    1. `climb-batch-5/review-repair/review-tex.txt`: 15,572 lines, 760 KB. A whole `./ant tex` LaTeX build log.
    2. `rung-spec-route-a/probes/build/gather-tex.txt`: 15,564 lines, 760 KB. The same kind of log; it differs from (1) in 430 lines.
    3. `…/build/base-tex.txt`: 15,110 lines, 743 KB. Build log.
    4. `…/build/edit-tex.txt`: 11,367 lines, 618 KB. Build log.
    5. `rung-size-runtime/probes/perdecl-after.txt` and `perdecl-before.txt`: 3,108 lines each, 799 KB each. A per-declaration checker dump; the pair differs in 12 lines, and each is within 40 lines of batch 4's `perdecl-after.txt`.
  - CITED 208 files / 80,262 lines; UNCITED 810 files / 4,048 lines.
    - 685 of the uncited are ladder raw outputs (829 lines).
    - The other 125 are 72 probes, 46 captures, 6 scripts and 1 report (`gate/ladder/microgpt-phase.md`).
    - 122 uncited files have a named parent directory. Only 32 files (12 lines) are named by neither directory nor stem.
- **Coordinator records:**
  - FACTS.md +23/−21
  - fortress-gap-ledger.md +40/−24
  - handover +12/−6
- **Ledger:**
  - Opened 16: 405–420 (S 405–407, Z 408–420). Rows 409, 410, 411 and 415 were opened already fixed, "Fixed `e893a3e00`" or closed at the gather.
  - No existing row closed.
  - Notes appended to rows 21, 76, 214, 307, 331, 340, 371, 372, 400, 402 and 404.
- **Ratios:**
  - RECORDS lines per CODE+SPEC line changed: 84,310/1,013 = 83.2. Without the 8 build logs: 25,844/1,013 = 25.5.
  - TESTS lines per CODE line: 776/246 = 3.15.
- **Anything odd:**
  - 8 whole ant build logs (4 `tex`, 4 `genSource`) hold 58,466 lines and 2.95 MB: 69% of the batch's record lines and 51% of its new bytes. With the perdecl pair, 77% of lines and 79% of bytes.
  - The PDF is re-committed as two roughly 2 MB blobs.
  - 214 redundant copies in 54 groups (577 lines).
  - 255 files are identical to files already at the base, for example `subset.txt`, identical to rung N's, and `ladder-compare.sh`.
  - Three stack-overflow captures (`SkOprArgs`, `SkOprArgsOne`, `SkSelfExtBound` `.walk.txt`) have 1,041 lines each, about 290 KB together. `SkOprArgs.walk.txt` is uncited.
  - The gate files are copies of batch 4's:
    - `gate/checker-count.txt` is identical to batch 4's.
    - `gate/ladder/ladder.tsv` (86 lines) is re-committed identical to batch 4's except the timing column.
    - `microgpt-phase.md` (48 lines) differs only in timings.
  - No record file was later deleted.

### Climb batch 5 follow-ups (after the landing, same day)

- **Rung D's landing:**
  - 4 commits: `ab914b6e0` (source), `896fae47c` (gate, row 430), `abe06a743` (114 evidence files), `eb83706de` (notes); 18:13–18:42 UTC.
  - CODE, 12 files, +177/−17: library 8 files, +81/−17; Java glue 4 files, +96.
  - Tests: 1 new plain (WrapOperatorsRungD.fss, 89 lines, rung-suffixed), 6 team tests modified (+62/−62). testSystem 408.
  - Records: 123 files, +7,526/−2, 414,774 B.
    - By kind: CAPTURES 104/+6,645; SCRIPTS 7/+496; OTHER 2/+168; PROBES 6/+164; REPORTS 4/+53.
    - `abe06a743`'s 114 files and 404,629 B match the record.
    - CITED 40/3,039; UNCITED 83/4,487.
    - Largest: identical before/after pairs of ladder `.compile.txt` (ReflectiveQuickCheckTest 605 lines ×2, QuickCheckTest 603 ×2), and identical `checker-count/before-full.txt` and `after-full.txt` (462 lines ×2). 17 redundant copies (1,405 lines).
  - Coordinator: FACTS +4/−2, ledger +6/−5, handover +4/−2.
  - Ledger: row 430 opened; row 403 fixed for the listed sites.
  - Ratios: records 38.8 per CODE line; tests 1.10.
- **The calculi callouts:**
  - 5 commits, `eb2d7e1e6`…`5b586fb2c`, 19:13–19:25.
  - SPEC: 5 `.tex` files, +118/−17. PDF rebuilt twice (2,025,040 B; 2,026,407 B).
  - Records: 6 files, +526/−3 (3 pdftotext diffs +414, NOTE.md +107), all cited.
  - Coordinator: FACTS +2/−2, INDEX +1, handover +1/−1.
  - Ratio: 3.9.

## Climb batches 6 and 6b (2026-09-27): what they committed, measured

**Method.** I summed `git show --numstat -M` over each batch's own commits on `main`. Scratch scripts are in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/characterize/batch-6-6b/` (`classify.py`, `summ.py`, `cite.py`). Nothing in the tree was changed.

- **Record lines** are lines the batch added; record bytes are the sum of blob-size growth over the batch's commits.
- **CITED** means the file's basename (or, for `REPORT.md`, `record.md`, `SKEPTIC.md`, `JUDGE.md`, `RECORD.md`, `decision-record.md` and `*-review.md`, its directory name) appears in some other tracked `.md` file at today's HEAD (`e0a29b321`).
  - A stricter pass counts a file as cited only if the citation also names its parent directory, or sits in the same rung or batch tree. That figure is given in brackets.
- **microGPT copies.** Seven microGPT program files under `explorations/run-c4/src` and `explorations/apl/mg` had rung F's approved line edits (+22/−22). By the rule they fall under PROBES. I show them separately and keep them out of RECORDS.

The records' own figures match git:
- F's patch touched 262 paths, T's 94, O's 174 (`git diff --name-only` against the `origin/wip/*` branches).
- R's branch has 108 paths = 14 source and test paths + 30 taken at the gather + 64 in the follow-up.
- The gate's test counts match the new test files: `testSystem` went 408 → 413 → 415 → 419, and the compiler track 768 → 775 → 779.

### Climb batch 6 (rungs F, T, R; R landed by hand as a follow-up)
- **Range.**
  - Base `e5414f5bf`; landing record `6d4179307`, with the gate run on `969931866`.
  - 9 own commits, 2026-09-27 05:27–07:52 UTC:
    - `d846e3644` F
    - `d9c415395` T
    - `3dd99ecb7` R's record (R not landed)
    - `ba0f8cb09` the gather's tracked-path check
    - `537213698` the first review's corrections
    - `595c5fdec` the judge's ruling
    - `21c91d8e4` the repair
    - `969931866` the second review's corrections
    - `6d4179307` the hashes and gate summary
  - R follow-up: 2 more commits, `d65892d34` (source) and `7278e11f7` (records and gate), 08:23–08:30.
  - Rung branches, not on main: F 19 commits, T 13, R 13.
  - Coordinator commits in between: 41 before F (`4878e8062`..`833d1649f`); only `100e388f7` (handover) and `4d55747d5` (FACTS) touch the batch's files. The 19 between `6d4179307` and `d65892d34`, and `aaa3d77cd`, touch none.
- **Purpose** (`explorations/coordinator/CLIMB-BATCH-6.md` section 1): "the number tower flips to route A's flat shape, and the specification's number chapters change with it", plus rung R (an unknown size in an overload set).
  - F and T landed, and the gate was green (`testSystem` 413, compiler track 768; checker errors 125 → 62).
  - R was dropped by the workflow when its second skeptic agent failed. It landed by hand, with correction N, and its gate was green (415 / 775).
- **Fortress change.**
  - CODE, library: 15 files +396/−353 (13 `Library/`, 2 `LibraryBuiltin`; `FortressLibrary.fss` +213/−186, `.fsi` +123/−111, `FortressBuiltin.fss` +37/−36). Java 0.
  - CODE, Scala: 0 in batch 6 proper; R follow-up 2 files +31/−5 (`Functionals.scala` +20/−1, `ApplicationError.scala` +11/−4).
  - SPEC text: 8 files +980/−435. T's commit was +960/−425, of which `changes.tex` (Appendix I) was +607/−7; the repair was 2 files +20/−10.
  - PDF: rebuilt twice, in T's commit (2,073,334 B) and the repair (2,073,920 B). The base PDF was 2,026,407 B, so net +47,513 B, with 4.15 MB of new PDF blobs.
  - microGPT copies: 7 files +22/−22.
- **Tests.**
  - Batch 6 proper:
    - New plain: 1 (+205/−3).
    - New XXX: 4 (+72/−6).
    - Promoted: 0. Deleted: 0.
    - Modified: 47 files +250/−250. F respelled test lines in 25 files (+89/−89). The repair re-anchored messages and comments in 25 files (+161/−161). T also edited F's four new tests (+9/−9, messages only).
    - Total +527/−259.
    - Rung-suffixed names: 4 new (`*RungF`) and 23 existing ones modified (Rung B/C/D/I/L/N/R/W).
    - Largest new: `FlatTowerRungF.fss` 202 lines, `XXXUnwrittenSumRungF.fss` 19, `XXXEmptyGroupSumRungF.fss` 19.
  - R follow-up:
    - 12 new files +140: 1 plain program (`NatKnownSizeArm` `.fss`+`.test`, +31) and 6 XXX programs (10 files, +109).
    - No rung suffix.
    - Largest: `NatKnownSizeArm.fss` 26, `XXXNatBigSizeWalk.fss` 21, `XXXNatSizeExclusionWalk.fss` 18.
- **Records, batch 6 proper** (363 files, +98,984/−70 lines, 7.22 MB):

| Kind | Files | Lines | Bytes |
|---|---|---|---|
| REPORTS | 18 (17 new) | +3,928/−70 | 620,544 |
| CAPTURES | 244 | 92,838 | 6,499,021 |
| PROBES | 62 | 764 | 15,614 |
| SCRIPTS | 39 | 1,454 | 80,259 |
| OTHER | 0 | – | – |

  - By directory: `rung-spec-numbers` 61,394 lines, `climb-batch-6` 18,066, `rung-flat-tower` 16,981, `rung-unknown-size-arm` 2,526.
  - R follow-up adds 77 files (72 new), +2,306/−66 lines, 101,484 B: REPORTS 6 (1 new) +156/−66, CAPTURES 22 / 1,283, PROBES 38 / 510, SCRIPTS 11 / 357.
  - Five largest files, all whole `ant tex` build logs of the specification (pdfTeX output with about 2,700 over- and underfull box warnings each), all cited:
    1. `rung-spec-numbers/probes/build/gather-tex.txt`, 16,117 lines, 781 KB.
    2. `climb-batch-6/repair-review/spec-tex.txt`, 16,117 lines, 781 KB. It differs from the first in 180 diff lines.
    3. `base-tex.txt`, 15,696 lines.
    4. `repair-tex.txt`, 11,827 lines.
    5. `edit-tex.txt`, 11,415 lines.
  - Next largest: F's distance-run logs `probes/distance/walk-base.txt` (2,686 lines, 1.03 MB) and `walk-flat.txt` (1,744 lines, 694 KB).
  - Cited, batch 6 proper: 232 files / 93,609 lines cited; 131 files / 5,375 lines uncited (91 captures, 34 probes, 6 scripts). Strict pass: 227 / 136.
    - 74 of the cited files, 64,410 lines, have a basename shared with another tracked file.
  - Cited, R follow-up: 51 / 1,963 cited; 26 / 343 uncited (23 probes, 3 scripts).
- **Coordinator records** (POSITIONS, PLAN, INDEX: 0 in both parts).
  - Batch 6 proper: FACTS +19/−16 (+8.3 KB), ledger +47/−32 (+37.0 KB), handover +12/−14 (−2.8 KB). Also `microgpt-run-c-handover-history.md` +17, counted under REPORTS.
  - R follow-up: FACTS +4/−2, ledger +8/−5, handover +3/−3.
- **Ledger** (from the record; matches git's net +15 and +3 rows).
  - Batch 6 opened 431–445 (15 rows: F 431–439, T 440–443, the gather 444, the repair 445) and closed 146, 423 and 428.
  - R's follow-up opened 446–448. It marked row 400's compiled half fixed except for one shape.
- **Ratios.**
  - RECORDS lines per CODE+SPEC line: batch 6 proper 99,054 / 2,164 = 45.8; R follow-up 2,372 / 36 = 65.9; together 101,426 / 2,200 = 46.1.
  - TESTS lines per CODE line: 786 / 749 = 1.05; R 140 / 36 = 3.9; together 926 / 785 = 1.18.
- **Odd.**
  - Whole Ant build logs: 14 captures, 72,423 lines, 3.68 MB, which is 73% of batch 6 proper's record lines. They are 5 `ant tex` logs, 5 `ant genSource` logs and 4 others. Without them the first ratio would be 12.3.
  - Duplicates: 34 record files are byte-identical to another tracked file.
    - 12 identical ladder before/after pairs in F's probes, for example `ReflectiveQuickCheckTest.fss.compile.txt`, 605 lines twice.
    - Scripts copied verbatim from earlier rungs: `compare-normalised.py`, `count-run.sh`, `mg-run.sh`, `machine.sh`.
    - The same 17-line checker table appears in several directories.
  - `threads4/compare-base-flat.txt` and `compare-base-flat-first.txt` are near-duplicates (750 and 749 lines) and are uncited.
  - 3 empty files. Each gate commits `ladder/microgpt-phase.md`, 48 lines of output with a `.md` extension.
  - R's 30 record paths were committed at the gather although R had not landed; its other 64 came with the follow-up.
  - `RECORD.md` was edited in 9 of the 11 commits.
  - No record file was committed and later deleted.

### Climb batch 6b (rung O, the follow-up run)
- **Range.**
  - Base `5c368175f`; landing record `66c5fc7c8`, with the gate run on `533f6524f`.
  - 6 own commits, 2026-09-27 13:11–14:38 UTC:
    - `917bb7b32` the rung, with the gather
    - `85788d183` the review's corrections
    - `2f4736a0b` the judge's ruling
    - `519cb8ce3` the repair
    - `533f6524f` the second review's corrections
    - `66c5fc7c8` the hashes and gate summary
  - The rung branch has 11 commits.
  - Coordinator commits in between: 29 before the rung commit; only `0ec24efbb` and `ce846a5cb` touch a batch file (`FACTS.md`). `e17a9badc` and `265a0d719`, between the batch's commits, touch only `perf-probes/` and `INDEX.md`.
- **Purpose** (`CLIMB-BATCH-6.md` rung O): under walk, the fixed-width integer natives raise `IntegerOverflow` as the specification says (row 379). It did this: the gate was green (`testSystem` 419, compiler track 779, checker count 62 unchanged), and rows 379 and 427 closed.
- **Fortress change.**
  - CODE: library 0; Java 4 files +18/−6 (`Int` +5/−3, `Long` +5/−3, `NN32` +4, `UnsignedLong` +4); Scala 0.
  - A demo, `ProjectFortress/demos/HeapShakedown.fss`, +1/−1.
  - SPEC: 0. PDF not rebuilt.
- **Tests.**
  - New plain: 2 link `.test` files (+4).
  - New XXX: 8 files (+163): 4 walk `.fss` and 2 compiled pairs.
  - Promoted: 1, `XXXFixedWidthOverflowRungB` → `FixedWidthOverflowRungB`. Git sees it as a delete plus an add (+74/−41) because it is only 33% similar; as a rename it is +35/−2.
  - Modified: 2 (`intPrim.fss` +10, `longPrim.fss` +10). Deleted: none besides the promotion.
  - Total +261/−41.
  - Rung-suffixed names: 11 new (10 `*RungO`, 1 `RungB`).
  - Largest new: `FixedWidthOverflowRungB.fss` 74 lines, `XXXSeqRangeTopRungO.fss` 37, `XXXRangeBoundsRungO.fss` 33.
- **Records** (176 files, all new, +13,071/−33 lines, 787 KB; `rung-overflow-natives` 11,977 lines, `climb-batch-6b` 1,094):

| Kind | Files | Lines | Bytes |
|---|---|---|---|
| REPORTS | 7 | +2,036/−33 | 222,433 |
| CAPTURES | 114 | 9,330 | 490,641 |
| PROBES | 21 | 748 | 22,152 |
| SCRIPTS | 26 | 913 | 49,752 |
| OTHER | 8 | 44 | 2,028 |

  - The eight OTHER files are raw ladder `.compile` and `.run` captures.
  - Five largest:
    1. `probes/count/abortBlock.edit.txt`, 2,110 lines: raw stdout of a team test, a thread trace ("Thread ForkJoinPool-2-worker-1 operating on value Aborting"), from the output comparison.
    2. `abortBlock.baseA.txt`, 1,051 lines, the same.
    3. `JUDGE.md`, 541 lines, the judge's ruling on the rung.
    4. `TreapTest.baseA.txt`, 458 lines, raw program output; `.baseB` and `.edit` are 458 lines too.
    5. `climb-batch-6b/JUDGE-review.md`, 454 lines, the judge's ruling on the review.
  - Cited: 130 files / 7,005 lines cited; 46 files / 6,066 lines uncited (31 captures / 5,892 lines, 8 other, 4 probes, 3 scripts). Strict pass: 118 / 6,457 cited, 58 / 6,614 uncited.
- **Coordinator records:** FACTS +16/−15 (+5.1 KB), ledger +16/−11 (+20.7 KB), handover +6/−4 (+3.8 KB); POSITIONS, PLAN and INDEX 0.
- **Ledger:** opened 449–453 (5 rows), closed 379 and 427. Notes were added to rows 403, 326, 325, 315, 450 and 453.
- **Ratios.**
  - RECORDS lines per CODE+SPEC line: 13,104 / 26 = 504 (546 counting Java alone).
  - TESTS lines per CODE line: 302 / 26 = 11.6 (8.6 if the promotion is counted as a rename).
- **Odd.**
  - `probes/count/` holds 12 files, 5,026 lines (38% of the batch's record lines): raw stdout of four run-to-run unstable tests over three passes. None is cited by any `.md`; only a `.txt` capture (`review/unstable-outside.txt`) lists them.
  - `log-list-edit.txt`, 414 lines, is uncited.
  - Duplicates: 13 files are byte-identical to other tracked files: 6 scripts and lists copied from earlier rungs (`compare-normalised.py`, `count-compare.py`, `probe-summary.py`, `count-run.sh`, `extra-run.sh`, `machine.sh`), the 17-line checker table three times, and pairs of `.run` captures.
  - 4 empty files.
  - No Ant build logs apart from the gate summary.
  - The record reports a stray `/cap-C.txt` left at the filesystem root, outside the repository.
  - No record file was committed and later deleted.

**Method, common to both batches.** I summed `git show --numstat -M` over each batch's own commits on main. Each file goes in one category by its path. Files under `explorations/` that fall outside the six coordinator files are RECORDS, sorted by extension. "Lines" for RECORDS means lines added; "bytes" means blob bytes added (the new file's size, or the size change for a file that already existed). Neither range has a coordinator commit between its own commits: both ranges are contiguous on main.

CITED uses today's HEAD (`e0a29b321`). The main count follows the brief: the basename appears in any other tracked `.md` file, matched on word boundaries. `README.md`, `REPORT.md`, `record.md`, `RECORD.md`, `SKEPTIC.md` and `JUDGE*.md` count as cited through their directory. Many basenames repeat across rungs (`count-list.txt`, `base-tex.txt`, `machine.sh`), so I also give a stricter count. It keeps a hit only when the citing `.md` lives in, or names, the file's rung or batch directory.

The records' own figures agree with git:
- The patch path counts: B 127, H 166, A 116, J 241 and U 74 paths from the branches, plus the files the gather wrote, give commits of 133, 175, 133, 248 and 105 files.
- Ledger rows: 454 → 472 in batch 7, and 474 → 485 in batch 7R.
- New test files: +4 interpreter tests in batch 7 (testSystem 419 → 423), and +2 interpreter tests and +5 compiler `.test` files in batch 7R (425; compiler track 779 → 784).

### Climb batch 7 (rungs H, A, B)

- **Range:**
  - Base `ff1649cea` (2026-09-27 19:48 UTC, manifest spliced). The gather started on `4a2b9385c`; the 52 coordinator commits between the base and it touch no batch file and nothing outside `explorations/`.
  - Landing record `deadeba01`. The gate ran on `bb3af372f`.
  - 8 commits of its own, all on 2026-09-28 between 02:11 and 04:04 UTC: `de22fd928` (B), `952892a00` (H), `f3b62bc83` (A), `4c92ea034` (review corrections), `d3f92a509` (judge), `e75fca14b` (repair), `bb3af372f` (second review), `deadeba01` (hashes and gate summary).
  - The rung branches' 9 + 10 + 13 commits are not on main.
  - Coordinator commits afterwards that touch the batch's coordinator files: `1e191c244` (FACTS consolidated; ledger rows 474–475). No later commit touches the batch's directories.
- **Purpose** (from `CLIMB-BATCH-7.md` §1 and RECORD):
  - H: the comparisons, `Maybe` and the `Condition` site conform to instantiation exclusion.
  - A: answer 10's split, `fill` taking a value and `tabulate` a function.
  - B: the `Object` bound on the result-only parameters, and a fix for row 421.
  - Did it: yes. The gate is green, the checker count fell 62 → 22 as predicted, and distance fell 1,747 → 940. Two limits: the FortressLibrary api still stops at `AnyIntegral`'s `comprises` error (item 21), so A's and B's api effects do not show on the count stage. The stops that were met were all lifted: B's line count, H's new distance errors and two changed walk outputs, and A's `mg.fss`.
- **Fortress change:**
  - CODE library: 9 files, +116 −79 (FortressLibrary.fsi/.fss +100 −63, List ×2, FortressBuiltin ×2, Generator22D, Random, System). Java and Scala: 0. Build files: 0.
  - SPEC text: 2 files, +52 −1 (changes.tex +43, arrays-distributed.tex +9 −1).
  - PDF rebuilt at the gather (it was not on A's branch): 2,073,920 → 2,078,636 bytes (+4,716; 621 → 623 pages).
  - Outside the categories: 8 demos, +32 −32 (`.fill(` respelled `.tabulate(`).
- **Tests** (all in `ProjectFortress/tests/`):
  - 3 new plain tests: ExclusionRemainderRungH.fss (112 lines), ResultBoundsRungB.fss (70), TabulateRungA.fss (54).
  - 1 new XXX test: XXXLexicoUnorderedRungH.fss (14).
  - 0 promoted and 0 deleted.
  - 7 modified: 12 lines restated (+12 −12) in ArrayOperatorsBesideLibrary, ArrayScalarExtension, RandomTest, ShuffleTest, matrixOps, sparseMatrix and vectorOps.
  - Test lines, summed over commits: +273 −23. Net: +262 −12. The difference is 11 message lines rewritten inside the batch: H's commit re-anchored 4 of B's lines, and A's commit dropped "(provisional)" from 7 of H's.
  - Rung-suffixed names: all 4 new files; none of the modified ones.
- **Records:** 397 files, 68,170 lines, 4,490,699 bytes added. 391 files are new. The other 6 existed before: 5 microGPT vocabulary `.fss` files (16 lines changed) and `microgpt-run-c-handover-history.md` (+11,347 bytes).

  | Kind | Files | Lines | Bytes |
  |---|---|---|---|
  | REPORTS | 13 | 1,954 | 363,174 |
  | CAPTURES | 267 | 61,604 | 3,906,309 |
  | PROBES | 57 | 1,200 (−16) | 41,488 |
  | SCRIPTS | 36 | 1,970 | 97,764 |
  | OTHER | 24 | 1,442 | 81,964 |

  - OTHER is all `.compile` files: per-file ladder compile outputs.
  - **Where the lines came from:** the wip branches (worker and skeptic), 374 files and 49,568 lines; the gather, inside the rung commits, 16 files and 17,961 lines (16,614 of them A's merged-tree spec build); the review, judge, repair and landing commits, 641 lines.
  - The skeptics' files are 119 files and 3,863 lines.
  - **Largest files, by lines:**
    1. `rung-tabulate/probes/build/gather-tex.txt`: 16,183 lines, 784 KB. Whole `ant tex` build log of the merged tree (pdfTeX stdout, about 2,700 Overfull/Underfull lines).
    2. `rung-tabulate/probes/build/base-tex.txt`: 16,115 lines, 781 KB. The same kind of build log, on the base.
    3. `rung-tabulate/probes/build/edit-tex.txt`: 11,509 lines, 626 KB. The same kind of build log, after the edit.
    4. `rung-exclusion-remainder/probes/passes/compare-A-edit1.txt`: 3,580 lines, 238 KB. Normalised per-test output comparison of a harness pass, base against edit. No `.md` cites it.
    5. `rung-exclusion-remainder/probes/ladder-after/tests/RangePrototype.fss.compile`: 497 lines, 25 KB. Ladder compile output, byte-identical to its `ladder-before` twin; neither is cited.
  - **CITED against UNCITED:**
    - Brief's count: 284 files (60,744 lines) cited, 113 files (7,426 lines) uncited.
    - Uncited by kind: CAPTURES 69 (5,557 lines), PROBES 18 (383), SCRIPTS 2 (44), OTHER 24 (1,442), REPORTS 0.
    - Strict count: 271 cited (60,368 lines), 126 uncited (7,802). 99 of those 126 (6,285 lines) sit in a directory the records cite by path.
    - The three tex logs, which are 65% of the lines, are cited by name in RECORD.md.
- **Coordinator records** (lines summed over commits; net and bytes in brackets):
  - FACTS: +26 −23 over 6 commits (net +9 −6; +15,697 bytes).
  - PLAN: +32 −6 over 5 commits (net +28 −2; +13,192 bytes).
  - Ledger: +52 −34 over 7 commits (net +26 −8; +37,581 bytes).
  - Handover: +11 −13 over 4 commits (net +5 −7; −4,616 bytes, its paragraphs moved to the history file).
  - POSITIONS and INDEX: 0.
- **Ledger:**
  - Opened: 18 rows, 456–473.
  - Closed: 2 rows, 247 (A) and 421 (B).
  - Notes appended to rows 309, 351, 407, 430, 437, 447, 460, 463, 466–468 and 473.
- **Ratios:**
  - RECORDS lines per CODE+SPEC line changed: 68,170 / 248 = 275 (406 per line added; 219 if the demos count).
  - TESTS lines per CODE line: 296 / 195 = 1.52 (net 1.41).
- **Odd:**
  - **Whole build logs:** 6 committed files (genSource and tex for base, edit and gather), 44,443 lines. That is 65% of record lines and 2,246,427 bytes. The 380 MB `fortress.log` was not committed.
  - **Byte-identical copies:**
    - 20 groups of byte-identical record files: 45 files, 83,176 redundant bytes.
    - `count-list.txt` (418 lines) is committed three times, once per rung.
    - 12 of 14 ladder before/after pairs are identical.
    - 6 records are byte-identical to blobs already in the tree (15,599 bytes): `compare-normalised.py` ×2, `count-run.sh` and `machine.sh` ×2, copied from `plan-6.5`, and `harness-one.sh`, copied from an earlier rung.
  - **Small or empty files:** 2 zero-byte gate files, 8 one-line `df` (disk-free) captures and 16 machine-line files.
  - **Churn inside the batch:** RECORD.md was rewritten in 7 of the 8 commits. A's commit carries H's test-message fix; the judge ruled against a rewrite.
  - **Untracked but cited:** the worktrees' `tmp/` directories (155, 196 and 30 MB) were moved, untracked, into the main tree because the reports cite paths inside them.
  - Nothing was committed and then deleted, and no batch file has changed since the landing.

### Climb batch 7R (rungs J, U)

- **Range:**
  - Base `26c5d3dd7` (2026-09-28 04:32 UTC). The gather started on `0f0b40e06`/`9102042ae`; the 32 coordinator commits between the base and it touch nothing outside `explorations/` and none of the batch's files.
  - Landing record `65f1e40ca`. The gate ran on `4368621b6`.
  - 7 commits of its own, on 2026-09-28 between 09:43 and 11:57 UTC: `3be1fecd7` (J), `17c6052bb` (U), `9c46c2206` (review), `d7424cb28` (judge), `efff9ff1d` (repair), `4368621b6` (second review), `65f1e40ca` (landing).
  - The rung branches' 10 + 5 commits are not on main.
  - Coordinator commit afterwards that touches FACTS: `bde85de0e`. No later commit touches the batch's directories.
- **Purpose** (`CLIMB-BATCH-7R.md` §1): the one library's ranges count with `ZZ32` only (J, with the checker's `GeneratorZZ32` crash fixed), and the specification says so (U).
  - Did it: yes. The gate is green; RangeInternals fell 42 → 18, the checker total 22 → 10, and distance 940 → 627.
  - The judge added 2 XXX compiler tests (rows 481 and 482).
  - U met 2 stops, both lifted as reversible.
- **Fortress change:**
  - CODE: library 6 files, +1,151 −1,235 (RangeInternals.fsi/.fss +1,062 −1,148, a respelling of the whole files; FortressLibrary ×2 +83 −81; Random ×2 +6 −6). Java: 1 file (Types.java), +8 −0. Scala: 1 file (Functionals.scala), +10 −7.
  - SPEC text: 5 files, +243 −13 (changes.tex +182 −2, ranges.tex +29 −2, defining-generators.tex +17 −6, basic-integers.tex +10 −3, blocks.tex +5).
  - PDF rebuilt: 2,078,636 → 2,095,561 bytes (+16,925; 623 → 626 pages).
  - Outside the categories: SpecData examples, 2 files, +7 −7.
- **Tests:**
  - 10 new files: 2 in `tests/` and 8 in `compiler_tests/` (3 `.fss` and 5 `.test`).
  - As the gate counts them, 3 new plain tests: RangeZZ32RungJ.fss (99 lines), RangeInRungJLink.test and RangeEqRungJLink.test.
  - 4 new XXX tests: XXXRangeWideRungJ.fss (14 lines), and XXXRangeInRungJ, XXXRangeEqRungJ and XXXExtremumRungJ as `.test` plus `.fss` pairs. The last two came from the repair.
  - 1 promotion: `XXXRangeSizeZZ64RungO.fss` → `RangeSizeRungO.fss` (R069, 23 lines).
  - 12 modified: the team's `RangePrototype.fss` (+85 −85) and 11 revival tests.
  - 0 deleted.
  - Test lines, summed over commits: +399 −226. Net: +333 −160. U's commit alone rewrote 132 lines of 14 test files, citation digits in assert messages only.
  - Rung-suffixed names: 22 of the 23 test paths touched, all new files among them.
  - Three largest new files: RangeZZ32RungJ.fss 99 lines, XXXExtremumRungJ.fss 17, XXXRangeInRungJ.fss 16.
- **Records:** 319 files, all new; 63,594 lines, 5,090,636 bytes.

  | Kind | Files | Lines | Bytes |
  |---|---|---|---|
  | REPORTS | 11 | 1,655 | 285,474 |
  | CAPTURES | 181 | 55,299 | 4,463,379 |
  | PROBES | 41 | 829 | 20,446 |
  | SCRIPTS | 37 | 1,520 | 86,594 |
  | OTHER | 49 | 4,291 | 234,743 |

  - OTHER is 46 `.compile` and 2 `.run` ladder outputs, plus 1 `.el` Emacs driver script.
  - **Where the lines came from:** the branches, 282 files and 44,680 lines; the gather, inside the rung commits, 24 files and 18,074 lines (mostly its spec build); the post-gather commits, 840 lines.
  - The skeptics' files are 78 files and 2,920 lines.
  - **Largest files, by lines:**
    1. `climb-batch-7R/build/gather-tex.txt`: 16,403 lines, 792 KB. Whole `ant tex` build log of the merged tree.
    2. `rung-spec-ranges/probes/build/base-tex.txt`: 16,183 lines, 784 KB. Build log on the base; it differs from batch 7's `gather-tex.txt` by 8 lines.
    3. `rung-spec-ranges/probes/build/edit-tex.txt`: 11,621 lines, 631 KB. Build log after the edit.
    4. `rung-ranges-zz32/probes/distance/errors-preedit.txt`: 941 lines, 609 KB. Distance stage dump of every checker error.
    5. `rung-ranges-zz32/probes/distance/errors-postedit.txt`: 628 lines, 376 KB. The same kind of dump; byte-identical to `probes/skeptic/distance-skeptic-errors.txt`.
  - **CITED against UNCITED:**
    - Brief's count: 212 files (56,925 lines) cited, 107 files (6,669 lines) uncited.
    - Uncited by kind: CAPTURES 43 (2,177 lines), PROBES 13 (159), SCRIPTS 3 (54), OTHER 48 (4,279), REPORTS 0.
    - Strict count: 202 cited (56,278 lines), 117 uncited (7,316). 56 of those 117 sit in a cited directory.
    - 50 of the 53 ladder output files are uncited by name.
- **Coordinator records** (lines summed over commits; net and bytes in brackets):
  - FACTS: +14 −11 over 5 commits (net +8 −5; +9,826 bytes).
  - PLAN: +12 −1 over 2 commits (+5,637 bytes).
  - Ledger: +45 −34 over 5 commits (net +29 −18; +30,727 bytes; includes 27 citations re-anchored in 17 older rows).
  - Handover: +9 −5 over 4 commits (net +6 −2; +4,250 bytes).
  - POSITIONS and INDEX: 0.
- **Ledger:**
  - Opened: 11 rows, 476–486.
  - Closed: 2 rows, 358 and 452.
  - Notes appended to rows 59, 325, 450, 451, 452, 453, 481 and 482.
- **Ratios:**
  - RECORDS lines per CODE+SPEC line changed: 63,594 / 2,667 = 23.8 (45.0 per line added).
  - TESTS lines per CODE line: 625 / 2,411 = 0.26 (net 0.20).
- **Odd:**
  - **Whole build logs:** 6 committed files, 44,843 lines. That is 70.5% of record lines and 2,263,176 bytes. U's base build repeats batch 7's gather build almost line for line; the 400 MB `fortress.log` was not committed.
  - **Distance dumps:** 1.74 MB in all. `errors-postedit` equals the skeptic's copy byte for byte. `errors-library-only.txt` differs from them by 1 line and is uncited.
  - **Byte-identical copies:**
    - 21 identical groups: 45 files, 416,372 redundant bytes.
    - 17 of 24 ladder before/after pairs are identical.
    - 6 files are byte-identical to earlier blobs (29,193 bytes). Among them: `count-list.txt` equals `plan-7b/probes/P4/tests-list.txt`, and `compare-normalised.py`, `count-run.sh`, `extra-run.sh` and `norm.sh` are copies.
    - `gate/checker-count.txt` equals J's skeptic's `checker-count-skeptic.txt`.
  - **Small or odd files:**
    - 5 files are empty (zero bytes).
    - J's `REPORT.md` and `record.md` have no final newline.
  - **Churn inside the batch:** J's `record.md` changed in 5 of the 7 commits.
  - **Untracked but cited:** the worktrees' `tmp/` directories (70 and 55 MB) were moved, untracked, into the main tree. The gate directory is `climb-batch-7R/`, while 5 coordinator lines still name `climb-batch-7r/`.
  - Nothing was committed and then deleted, and no batch file has changed since the landing.

### Climb batch 7C (rungs Y `rung-comprises-checker` and X `rung-spec-comprises`)
- **Range.** Base `715816bdd` (launch splice, 2026-09-28 12:21 UTC). Landing record `cd9305c2d`; the gate ran on `0f00db11a`. The batch has 7 own commits on main, 2026-09-28 from 14:40 to 16:48 UTC, one contiguous chain: `079f54ea9` (Y), `d8e0cd28e` (X), `d357c9cc4` (first review fold), `18e4ffabe` (judge's ruling), `f052e82f5` (repair), `0f00db11a` (second review fold), `cd9305c2d` (landing record). The rung branches are not on main: `wip/rung-comprises-checker` has 9 commits and `wip/rung-spec-comprises` has 7.
  - Coordinator commits left out: nine before Y (`7a81cdf44`..`0eb44316f`), none touching batch files. After landing, `96c0bbf6a` (16:57) added `climb-batch-7C/gate/distance-sites.tsv` to the batch's directory (627 lines, 375,501 B, not counted below). `4a403cdb7` consolidated FACTS. `008b354bf` is the post-batch review (+1,967 lines under `reviews/`).
- **Purpose.** From `CLIMB-BATCH-7C.md` §1: "the compiled checker learns the 2012 reading of `comprises`, and the specification says so." It did this:
  - Row 459 is closed and the checker count went from 10 to 75, because the api's hierarchy pass no longer stops early.
  - The distance went from 627 to 626 (`comprises` kind 2 to 0).
  - The spec text is in `traits.tex` and a new Appendix I.1.20.
  - The first review found one misstated Effect sentence (row 490) and one ungated home-2 row (492). The repair fixed both. The gate is green.
- **Fortress change.**
  - CODE: library 0; Java 0; Scala 1 file +22/−1 (`TypeHierarchyChecker.scala`, +1,168 B).
  - SPEC text: 2 files, +127/−5 (`changes.tex` +95/−1, `traits.tex` +32/−4), +7,428 B.
  - PDF rebuilt twice: `d8e0cd28e` (2,095,561 to 2,102,640 B) and `f052e82f5` (to 2,102,633 B). That is two new ~2.1 MB blobs; the first is 2,037,323 B on disk.
- **Tests.**
  - New plain: 2 files (1 program: `ComprisesGenericSubtrait` .fss/.test), +45 lines.
  - New XXX: 7 files (4 programs, 4 .fss and 3 .test), +97 lines.
  - Promoted 0, deleted 0.
  - Modified 2 `.fss` (`XXXTupleVarFieldCompiledRungC`, `XXXFlatStringSplitRungL`), +3/−3: citation digits in messages.
  - Total test lines +145/−3.
  - Rung-suffixed new names: 0 of 9.
  - Largest new: `ComprisesGenericSubtrait.fss` 41, `XXXComprisesMeetWalk.fss` 22, `XXXComprisesMeetCompiled.fss` 22.
  - Gate (record): compiler track 784 to 789, testSystem 425 to 426. This fits the 5 new junit steps and 1 walk file.
- **Records.** 144 files (143 new, 1 modified), +68,019/−17 lines, +3,689,837 B.

  | Type | Files | Lines | Bytes |
  |---|---|---|---|
  | REPORTS | 12 (incl. gate `microgpt-phase.md` and `microgpt-run-c-handover-history.md` +14) | +1,779/−17 | 304,096 |
  | CAPTURES | 77 | +65,177 | 3,335,606 |
  | PROBES | 32 | +412 | 10,120 |
  | SCRIPTS | 21 | +619 | 37,579 |
  | OTHER | 2 (`ladder-pre`/`ladder-post` `atomicList.fss.compile`) | +32 | 2,436 |

  - Per commit: Y +3,428, X +46,987, fold1 +55, judge +141, repair +16,962, fold2 +70, landing +376.
  - Five largest:
    1. `climb-batch-7C/build/gather-tex.txt`: 16,432 lines, 793 KB. Whole `ant tex` LaTeX build log of the gather's spec build.
    2. `climb-batch-7C/build/repair-tex.txt`: 16,432 lines, 793 KB. The repair's rebuild log; `diff` against #1 is 26 lines.
    3. `rung-spec-comprises/probes/build/base-tex.txt`: 16,403 lines. Rung X's base spec build log.
    4. `rung-spec-comprises/probes/build/edit-tex.txt`: 11,567 lines. Rung X's edited build log.
    5. `rung-comprises-checker/probes/skeptic/comprises-ctests.txt`: 408 lines. The skeptic's junit run over the comprises compiler tests.
    - Next are `SKEPTIC.md` (328 lines) and `RECORD.md` (318 lines, 71,892 B).
  - CITED 120 files / 67,624 lines, UNCITED 24 / 395. No report is uncited. Uncited: 7 captures (166 lines), 14 probes (188), 3 scripts (41).
    - 22 of the 24 uncited have their stem (the component name) named in some .md.
    - 60 cited files (63,807 lines) match on a basename other tracked files share. A stricter check (the citing .md is in the same rung or batch directory, or names it) gives 117 / 67,599 cited.
- **Coordinator records.** FACTS +14/−12; PLAN +15/−4; ledger +51/−45; handover +9/−11. POSITIONS and INDEX are untouched.
- **Ledger.** Opened 6: 487–492 (Y 487–488, Y's skeptic 489–490, X 491–492; 491 is OPEN for Pavol). Closed 1: 459. Notes on 19 rows and re-anchors on 484 and 485; git shows 22 existing rows changed.
- **Ratios.**
  - RECORDS lines per CODE+SPEC line: 68,036 / 155 = 439. Without the 4 tex logs it is 46.5.
  - Records bytes per CODE+SPEC byte: 429.
  - TESTS lines per CODE line: 148 / 23 = 6.4.
- **Anything odd.**
  - **Whole build logs.** The 4 whole LaTeX build logs are 60,834 lines and 3,007,717 B: 89% of the record lines and 82% of the record bytes. Two of them are near-copies (26 diff lines). `repair-tex.txt` is also near-identical to batch 6.5's `base-tex.txt` (15 diff lines).
  - **Other build captures.** 4 genSource logs (848 lines) and 4 pdftotext diffs (241 lines).
  - **Empty files.** 3 zero-byte captures: `committed-vs-base-pdftotext-diff.txt`, `gate/ladder/comparison.txt`, `microgpt-comparison.txt`.
  - **Duplicates.**
    - `probes/checker-count-postedit.txt` is identical to `gate/checker-count.txt`, and `checker-count-preedit.txt` is identical to 7R's gate table.
    - The pre and post `atomicList.fss.compile` are identical.
    - The skeptic's candidate `XXXComprisesGenericRenamed.fss` is byte-identical to the landed test.
    - `norm.sh` is the third copy in the tree.
  - **Late addition.** The per-site distance list was added to the batch's directory after landing by a coordinator commit.
  - **Deletions.** No file was committed and then deleted.

### Climb batch 6.5, first run (rungs G `rung-generic-runtime` and P `rung-spec-integer-rules`)
- **Range.** Base `b797d8037` (splice, 2026-09-28 17:07 UTC). Landing record `d9c62446e`; the gate ran on `0a89433ef`, and the first gate, on `581356f32`, was red. The batch has 7 own commits on main, 2026-09-28 from 19:28 to 22:12 UTC, one contiguous chain: `fd5cb4864` (G), `581356f32` (P), `80605eeda` (first review fold), `930811df4` (judge), `abc99d512` (repair), `0a89433ef` (second review fold), `d9c62446e` (landing record). The rung branches are not on main; each has 6 commits. The record's patch sizes, 152 paths (G) and 116 (P), match `git diff --name-only`.
  - Coordinator commits left out: `2a55fa570`, `26aaf98d9`, `008b354bf`, `f5d7b8feb`, `7a9d6fb73`, `54208c796`, all before G. None touches the batch's files, and no later commit touches its directories. `dc2f8d5e8` is the post-batch review (+376 lines).
- **Purpose.** From `CLIMB-BATCH-6.5.md` §1: phase 2b's repair batch. This run is G (the compiled path's generics at run time: rows 417, 419, 420, 351 and 426, and the two dispatch defects) and P (the spec's integer rules, the coercion example of row 394, re-anchored test messages, owed tests). E and V went to 6.5b by design. It did this:
  - Rows 351, 394, 417, 419, 420 and 426 are closed, and 493/494 opened already fixed.
  - The first gate was red on `WitnessIdentityRungG`. The repair changed that test only.
  - The final gate is green, with checker count 75 and distance 626 unchanged.
- **Fortress change.**
  - CODE: library 2 files +16/−8 (`FortressLibrary.fss` +14/−6, `.fsi` +2/−2). Java 3 files +84/−11 (`OverloadSet` +46/−3, `CodeGen` +31/−8, `InstantiatingClassloader` +7/−0). Scala 0.
  - SPEC text: 5 files, +301/−14 (`changes.tex` +207, `basic-integers` +48/−6, `conversions-coercions` +20/−6, `opr-overview` +14, `numbers` +12/−2), +17,639 B.
  - PDF rebuilt once in `581356f32` (to 2,121,541 B, +18,908; 2,056,285 B on disk).
- **Tests.**
  - New plain: 22 files (8 .fss, 14 .test incl. 6 `…Link.test`), +407.
  - New XXX: 20 files (12 .fss, 8 .test; 8 compiler programs and 4 walk files), +337.
  - Promoted: 3 programs (`NatRtMethBoth`, `NatRtTask`, `ClauseBindingRungB`). Each is a `.fss` rename (+7/−3 in total); its XXX `.test` is deleted (3 files, −9) and a plain `.test` added (3 files). Git's `-M` also pairs `XXXNatRtMethBoth.test` with `XXXTaskArmLocalSlot.test` (52%); that is counted as a delete plus an add.
  - Modified: 26 files, +139/−139. That is P's 23 `.fss` (+136/−136, citation digits and two comments; the record says they are identical with comments and strings stripped) and G's 3 Link `.test` (+3/−3). `WitnessIdentityRungG.fss` was added in G and edited by the repair (−4).
  - Total test lines +897/−155.
  - Rung-suffixed: 40 of 45 new files and 19 of 20 new programs.
  - Largest new: `ArrowClauseBindRungG.fss` 61, `TypecaseBindRungG.fss` 60, `WitnessIdentityRungG.fss` 47.
  - Gate (record): compiler 789 to 822, library 83 to 84, testSystem 426 to 430. This fits the files.
- **Records.** 237 files (235 new, 2 modified), +58,610/−42 lines, +3,573,021 B.

  | Type | Files | Lines | Bytes |
  |---|---|---|---|
  | REPORTS | 13 (incl. `map/README.md` ±1, handover-history +11, gate `microgpt-phase.md`) | +1,832/−42 | 300,848 |
  | CAPTURES | 136 | +53,814 | 3,149,821 |
  | PROBES | 56 | +1,707 | 47,852 |
  | SCRIPTS | 32 | +1,257 | 74,500 |
  | OTHER | 0 | | |

  - Per commit: G +6,207, P +49,534, fold1 +111, judge +440, repair +1,267, fold2 +36, landing +1,015.
  - Five largest:
    1. `climb-batch-6.5/build/gather-tex.txt`: 16,585 lines, 799 KB. Whole LaTeX build log of the gather.
    2. `rung-spec-integer-rules/probes/build/base-tex.txt`: 16,433 lines. P's base build log; 15 diff lines from 7C's `repair-tex.txt`, the same spec tree built again.
    3. `…/edit-tex.txt`: 11,642 lines. P's edited build log.
    4. `climb-batch-6.5/gate/distance-sites.tsv`: 627 lines, 375 KB. The distance stage's per-site error dump; 171 rows differ from 7C's copy, only by the library's 8-line shift.
    5. `climb-batch-6.5/JUDGE-review.md`: 440 lines. The judge's ruling.
    - Next are `differential-after.txt` (430) and `differential-before.txt` (401), G's two-path probe runs, and `reanchor-own-dryrun.txt` (305), a re-anchoring dry-run dump.
  - CITED 193 files / 56,937 lines, UNCITED 44 / 1,673. No report is uncited. Uncited: 6 captures (365 lines, incl. `probes/list/test-citations-base.txt`, 264 lines, a citation dump), 26 probes (866), 12 scripts (442, incl. the 6 `judge-repair/*.sh`).
    - 35 of the 44 uncited have their stem named in some .md.
    - The strict check gives 191 / 56,937 cited; the two it drops are the empty ladder files.
- **Coordinator records.** FACTS +35/−30; PLAN +24/−9; ledger +67/−57; handover +12/−12. POSITIONS and INDEX are untouched.
- **Ledger.** Opened 10: 493–502 (G 493–496, G's skeptic 497–499, P 500, P's skeptic 501–502). 493 and 494 opened already POSITIVE-VERIFIED. Closed 6 existing rows (351, 394, 417, 419, 420, 426), 8 counting 493 and 494. Git shows 30 existing rows changed (notes and P's re-anchors).
- **Ratios.**
  - RECORDS lines per CODE+SPEC line: 58,652 / 434 = 135. Without the 3 tex logs it is 32.2.
  - Records bytes per CODE+SPEC byte: 165.
  - TESTS lines per CODE line: 1,052 / 119 = 8.8. Without P's digit-only re-anchors (272 lines) it is 6.6.
- **Anything odd.**
  - **Whole build logs.** The 3 whole LaTeX build logs are 44,660 lines and 2,224,075 B: 76% of the record lines and 62% of the record bytes. With the 375 KB per-site dump, the four files are 73% of the record bytes. There are also 3 genSource logs (638 lines) and 2 pdftotext diffs (566).
  - **Duplicates.**
    - The checker-count table is committed three times, identical: G's `checker-count-postedit.txt`, P's `checker-count-after.txt` and `gate/checker-count.txt`. All three are also identical to 7C's gate table.
    - Scripts copied byte for byte from earlier rungs: `subset.txt`, `norm.sh`, `stale-scan.py`, `harness-one.sh`.
  - **Empty files.** 2 zero-byte ladder comparisons.
  - **Distance list.** The per-site distance list is committed again, with only its line numbers moved.
  - **Deletions.** No record file was committed and then deleted.

### Climb batch N, first run (rungs I, K, T, M; 2026-09-28/29)
- **Range:** base `bce66f1fa` (2026-09-28 22:56 UTC), landing `3fb0cd8c1` (2026-09-29 09:44 UTC). The batch has 9 commits of its own on main, from 05:54 to 09:44 UTC:
  - 4 rung commits composed at the gather: `8dc1a74d9` I, `041682188` K, `f54ffac90` T, `2770550c3` M. The gather's `RECORD.md` is inside I's commit, and there is no separate gather commit.
  - Review fold `bd200b4ce`, judge's ruling `e3a1e87ef`, repair `47320a712`, second review's fold `2589d53d5`, landing record `3fb0cd8c1`.
  - Behind these are 49 squashed commits on the `wip/` branches (I 12, K 13, T 18, M 6), made 23:14–05:34 UTC.
  - Nine coordinator commits interleave. Only `2bad5a2d1` touches a batch file (`PLAN.md`). After the landing, `6a196e355` (FACTS, PLAN), `d3350baed` (FACTS) and `c3e739d36` (the combined post-batch review, 21 files, +1,824) followed; they are left out of the counts.
- **Purpose:** from `CLIMB-BATCH-N.md` §1: "the compiled checker infers a generic's type arguments with coercion and keeps the expected type at a call written `f(x)`, walk does the same when it dispatches, … the specification's empty type-inference chapter is written". This first run was I, K, T and M; rung Q, the numeral's own type, was left to the second run.
  - **Did it?** The four rungs landed on a green gate: testFast 1,647/0, testSystem 440/0, checker count 75, distance 626→627.
  - The second merged-diff review still blocked on owed tests for rows 447 and 505. Those went to 6.5b, and the batch landed under Pavol's rule of 2026-09-29.
  - A stop was met (row 508, a declaration reached by coercion can win) and lifted as reversible.
- **Fortress change:**
  - CODE, 13 files, +857 −36:
    - Library: 4 files, +35 −0 (`FortressLibrary.fsi/.fss` +12/+16, `FortressBuiltin.fsi/.fss` +3/+4).
    - Java: 4 files, +457 −12 (`EvaluatorBase` +263 −1, `Coercions` +150 −2, `OverloadedFunction` +42 −9, `Init` +2).
    - Scala: 5 files, +365 −24 (`Functionals` +311 −16, `CoercionOracle` +24, `STypesUtil` +21 −4, `TraitTable` +5, `Operators` +4 −4).
    - astgen and build files: none.
  - SPEC text: 4 files, +405 −15 (`inference.tex` +210 −1, `changes.tex` +177 −6, `ranges.tex` +13 −3, `basic-integers.tex` +5 −5).
  - PDF: rebuilt in `2770550c3`, 2,145,012 bytes (was 2,121,541, so +23,471). The record gives 637 pages.
- **Tests:** 94 numstat rows, +1,322 −117.
  - New plain: 30 files, +532 (12 `.fss`: 10 compiler, 2 walk; 18 `.test`, 8 of them link tests for XXX files).
  - New XXX: 47 files, +669 (28 `.fss`: 19 compiler, 9 walk; 19 `.test`).
  - Promoted: 4 `.fss` renames, +5 −5 (2 compiler, 2 walk). With them, 2 plain `.test` were added (+10) and 2 XXX `.test` deleted (−6).
  - Modified: 9 files, +106 −106. All 212 changed lines are specification-citation re-anchors in assertion messages (`ranges.tex:NN`).
  - Deleted: 2, the promotions' XXX `.test` files.
  - Cases, from the record: testSystem +10, compiler track +55, and the repair added +1 walk and +6 `.test` (next gate: 441 and 883).
  - Rung-suffixed names: 30 of the 83 newly named test files (T 13, K 8, M 5, and C 4 carried by the 7C promotions). Rung I and the repair use no suffix.
  - Largest new test files: `compiler_tests/InferCoercionShapes.fss` 86 lines, `tests/IntegerMinMaxRungM.fss` 77, `tests/InferCoercionRungK.fss` 71.
- **Records:** 970 files, +120,685 −47 lines, 7.91 MB of new files. 968 of the files are in the batch's own folders; the other 2 are `FACTS-history.md` (+13) and the handover history (+11).

  | Kind | Files | Lines | Bytes |
  |---|---|---|---|
  | REPORTS | 22 | 4,101 net | 709 KB (the 20 new ones) |
  | CAPTURES | 581 | 107,915 | 6.95 MB |
  | PROBES | 307 | 6,428 | 127 KB |
  | SCRIPTS | 59 | 2,173 | 126 KB |
  | OTHER (one `.diff`) | 1 | 21 | 859 B |

  - **Five largest:**
    1. `climb-batch-N/build/gather-tex.txt`, 16,914 lines: the gather's LaTeX build log.
    2. `rung-spec-inference/probes/build/edit-tex.txt`, 16,909: T's LaTeX build log.
    3. `rung-spec-inference/probes/skeptic/r2/sk2-tex.txt`, 16,909: the skeptic's rebuild log. It differs from (2) by only 4 diff lines (machine header and path).
    4. `rung-spec-inference/probes/build/base-tex.txt`, 16,585: a LaTeX build of the unchanged base.
    5. `rung-integer-minmax/probes/passes/compare-normalised.txt`, 3,581: an interpreter-corpus output comparison, base against edit.

    Next in size are five `typecheck-*.txt` compiler-test diagnostic dumps of about 2.3K lines each.
  - **Cited against uncited** (basename grep, and the directory for common names):
    - All records: cited 495 files / 107,906 lines; uncited 475 / 12,732.
    - REPORTS: 22 cited, 0 uncited.
    - CAPTURES: 331 cited / 250 uncited (99,958 / 7,957 lines).
    - PROBES: 88 / 219 (1,782 / 4,646 lines).
    - SCRIPTS: 53 / 6.
    - Stricter reading (parent/basename wherever the basename is shared): uncited 591 files / 16,783 lines.
- **Coordinator records** (lines, with bytes of added and removed lines in brackets):
  - `FACTS.md` +30 −26 (98 KB / 76 KB)
  - `PLAN.md` +38 −13 (37 KB / 17 KB)
  - ledger +76 −61 (280 KB / 215 KB)
  - handover +18 −12 (37 KB / 27 KB)
  - `POSITIONS.md` and `INDEX.md`: 0
- **Ledger:**
  - Opened 15 rows (504–518). Row 504 was opened already fixed; 518 came from the judge's repair.
  - Closed 5: 388, 389 (for the trait's own static parameters only), 401, 484, 485.
  - Partly closed 2: 391 (the call-site half) and 455 (the listed faces).
  - 30 existing rows changed in all, and the ledger grew by 29.6 KB in existing rows plus 36.0 KB in new rows.
- **Ratios:**
  - RECORDS lines per CODE+SPEC line changed: 120,685 / 1,313 = 91.9.
  - TESTS lines per CODE line: 1,439 / 893 = 1.61 (added lines only: 1,322 / 857 = 1.54).
- **Anything odd:**
  - The four whole LaTeX build logs hold 67,317 lines and 3.23 MB, 56% of the record lines. There are also 4 genSource logs (848 lines).
  - 13 JVM GC logs (`gc-*.txt`, 3,604 lines, 298 KB), 9 of them uncited, sit in K's skeptic probes.
  - 5 distance-site tables total 2,527 lines and 1.5 MB. Two of them are byte-identical to `climb-batch-6.5/gate/distance-sites.tsv`, which was already in the tree, and M's postedit table equals the gate's own.
  - Exact duplicates inside the batch: 8 groups with 12 redundant copies (1,766 lines, 772 KB). Checker-count captures appear ×5, and `tests-list.txt` equals `count-list.txt`.
  - 42 files are byte-identical to blobs already in the base tree (2,210 lines, 775 KB).
  - 18 records are byte-identical to test files at landing: the repair's stand-in copies.
  - Skeptic folders hold 396 files (29.6K lines), 232 of them uncited.
  - Nothing is committed and later deleted: all 970 files are at HEAD, and the branches deleted only the 2 promoted XXX `.test` files.

### Climb batch 6.5b (rungs V, E; 2026-09-29)
- **Range:** base `382b9fe7f` (09:50 UTC), landing `e3214cbf1` (17:34 UTC). The batch has 10 commits of its own on main, from 15:02 to 17:34 UTC:
  - Rung commits `e455ccd98` V and `413f36ac0` E.
  - Gather follow-up `19c750c4a`.
  - First review's fold `92c076b90`, judge's ruling `b0ebf7e16`, repair `b6ee84f70`, second review's fold `3c1687791`.
  - Judge's ruling on the red gate `ee0f277da`, gate repair `cdc2e2a0e`, landing record `e3214cbf1`.
  - Behind these are 22 squashed branch commits (V 11, E 11), made 10:24–14:21 UTC.
  - 24 commits interleave before the gather: 22 of the coordinator's and 2 of Pavol's own. Those touching batch files are `d3350baed` (FACTS, FACTS-history) and PLAN edits in `020716b63`, `0af6c9ba4`, `be9a75b79`, `94585e11c`, `0882a70ff`, `c32ef9c73`, `0d2761770`, `f55fd68e2`. After the landing came `3301465e1` (the combined review, 16 files, +1,447), `795765ab1` (PLAN) and `d1c53a36d` (FACTS). All are left out of the counts.
- **Purpose:** the second run of `CLIMB-BATCH-6.5.md`:
  - E: both paths refuse a size beyond `NN32`/`ZZ32`, walk's `^`, `CHOOSE` and unsigned `LCM` raise `IntegerOverflow`, and the range bodies stop relying on wrapping.
  - V: `RR32` becomes a sibling of `RR64`.
  - Plus the tests batch N owed for rows 447 and 505.
  - **Did it?** Both rungs landed, with the owed pairs. The gate went red on one test key: `LibraryJUTest` 86, 1 failure, because `XXXRR32EqualityRungV.test` read `run_out_contains=PASS`. That key was repaired to `REACHED`, and the batch landed on the first gate: testFast 1,671, testSystem 451/0, count 75, distance 627→624.
- **Fortress change:**
  - CODE, 13 files, +283 −105:
    - Library: 5 files, +149 −80 (`FortressBuiltin.fsi` +50 −1, `.fss` +38 −40, `RangeInternals.fss` +48 −30, `FortressLibrary.fsi/.fss` +13 −9).
    - Java: 7 files, +84 −23 (`Int` +30 −6, `UnsignedLong` +24 −4, `EvalType` +21 −5, `NN32` +6 −5, `BaseEnv`, `IntNat`, `Long`).
    - Scala: 1 file, +50 −2 (`TypeWellFormedChecker`).
  - SPEC text: 2 files, +90 −4 (`changes.tex` +81 −2, `numbers.tex` +9 −2).
  - PDF: not rebuilt, 0 bytes; the committed PDF is still batch N's. V's own 639-page build survives only as its log.
  - These match the coordinator's `measures-6.5b.md`.
- **Tests:** 55 rows, +714 −49. The coordinator's range diff gives +713 −48; the difference is the repair's one-line key edit.
  - New plain: 10 files, +206 (8 `.test` link tests; `PowChooseLcmRungE.fss`, `RR32SiblingRungV.fss`).
  - New XXX: 28 files, +362 (compiler 18, walk 8, library 2).
  - Promoted: 5. One is a rename (`RR32MixedRungF`, +1 −1). The other 4 were added as plain files (+110), while git records their XXX originals as renamed into `rung-size-range/probes/walkcopy/`; each promotion is a 1+/1− change.
  - Modified: 7 files, +34 −47. Six are citation re-anchors (68 changed lines, all `.tex:` messages), and `NatRtBigSize.fss` lost 13 lines. The repair also edited one line of a test the batch had added.
  - Deleted: 0.
  - Cases, from the record: testSystem +10, compiler track +16, library track +2.
  - Rung-suffixed names: 27 of 43 newly named test files (E 18, V 5, and O 3 and F 1 carried by promotions), plus 8 with a `Walk` suffix.
  - Largest new test files: `PowChooseLcmRungE.fss` 111 lines, `RR32SiblingRungV.fss` 79, `XXXInferResultOnlyCoerced.fss` 38.
- **Records:** 868 files (866 in the batch's own folders, which is the coordinator's 866), +45,929 −23 lines, 3.05 MB. A further 110 lines arrived by rename from `tests/`.

  | Kind | Files | Lines | Bytes |
  |---|---|---|---|
  | REPORTS | 16 (14 own) | 1,944 | 376 KB |
  | CAPTURES | 228 | 36,730 | 2.41 MB |
  | PROBES | 247 | 5,476 | 180 KB |
  | SCRIPTS | 36 | 1,526 | 76 KB |
  | OTHER (170 `.compile`, 170 `.run`, 1 `.patch`) | 341 | 340 | 3.6 KB |

  - **Five largest:**
    1. `rung-rr32-sibling/probes/build/edit-tex.txt`, 16,989 lines, 813 KB: a LaTeX build log.
    2. `rung-rr32-sibling/probes/passes/compare-edit-vs-baseA-only.txt`, 2,987: a corpus output comparison.
    3. `rung-size-range/probes/repair/anchor-raw-final.txt`, 1,865: a citation-check dump.
    4. `anchor-raw.txt`, 1,249: an earlier pass of the same check.
    5. `climb-batch-6.5b/gate/distance-sites.tsv`, 625 lines, 381 KB: the gate's per-site list.
  - **Cited against uncited:**
    - All records: cited 296 files / 39,528 lines; uncited 572 / 6,488.
    - REPORTS: 16 cited, 0 uncited.
    - CAPTURES: 152 / 76 (34,438 / 2,292 lines).
    - PROBES: 88 / 159 (1,940 / 3,536 lines).
    - SCRIPTS: 29 / 7.
    - OTHER: 11 / 330.
    - Stricter reading: uncited 666 / 10,239.
    - The coordinator's 283 cited and 583 uncited (9.5K lines) lie between my two readings.
- **Coordinator records** (lines, with bytes of added and removed lines in brackets):
  - `FACTS.md` +17 −15 (71 KB / 61 KB)
  - `PLAN.md` +24 −9 (23 KB / 12 KB)
  - ledger +47 −33 (168 KB / 128 KB)
  - handover +10 −8 (22 KB / 21 KB)
  - `POSITIONS.md` and `INDEX.md`: 0
- **Ledger:**
  - Opened 14 rows (519–532). Rows 519, 520 and 530 were opened already fixed.
  - Closed 6: 337, 347, 418, 435, 450, 451.
  - Row 503 was reworded from "by reading" to "measured".
  - 22 existing rows changed; the ledger grew by 14.0 KB in existing rows plus 25.4 KB in new rows.
- **Ratios:**
  - RECORDS lines per CODE+SPEC line changed: 45,929 / 482 = 95.3.
  - TESTS lines per CODE line: 763 / 388 = 1.97 (added lines only: 714 / 283 = 2.52).
- **Anything odd:**
  - One whole LaTeX build log is 37% of the record lines, for a specification change whose PDF was not committed.
  - `rung-size-range/probes/ladder-{before,after}/raw/` holds 344 per-program files. 214 of them are empty (170 `.compile`, 44 `.run`), and 332 are uncited.
  - 216 empty files in all.
  - Exact duplicates: 62 non-empty groups with 94 redundant copies. `PowChooseLcmRungE.fss` appears ×3 in the probes, and `subset-before.txt` equals `subset-after.txt`.
  - 358 files are byte-identical to blobs already in the base tree (216 of them empty).
  - 70 files are copies of tests (`walkcopy`, `walkcopy-after`, `cross`, `owed`, `gated`), 45 of them byte-identical to test files at landing.
  - Four XXX tests were moved into records instead of deleted.
  - Nothing is committed and later deleted: all 868 files are at HEAD, and the branches deleted nothing.

Scratch scripts and per-file tables: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/characterize/batchN-6.5b/` (`measure.py`, `cite.py`, `N-recs.json`, `B65-recs.json`).


## The token spend of every run, by stage

## Token spend of the batch runs

### Sources and method

- **The runs.** The 21 Workflow runs of session `fe616d40` are under `~/.claude/projects/-home-user-fortress/fe616d40-…/subagents/workflows/`. Each has a `journal.jsonl` (labels, phases, result lines) and one `agent-<id>.jsonl` transcript per agent.
  - 19 of the runs belong to 15 batches.
  - Two are not batches. `wf_9b6732fc-64c` (09-18 19:14) was the four-agent concurrency probe (`repair-batch-review.md`): 562 output, 84K cache writes, 275K cache reads. `wf_576bd1f3-f0c` is this characterization.
- **How runs map to batches.** Every batch run but 7C's is named in the records: the batch `RECORD.md`s, FACTS.md, `CLIMB-BATCH-*.md`, `remote-container.md` and the post-mortems.
  - 7C's run, `wf_5c4d7157-2e7`, is identified by its rungs (Y, X), its dates and its summary's `"batch": "7c"`.
  - The `batch` field of the harness's run summaries (`/tmp/claude-0/…/tasks/w*.output`) agrees with every mapping.
  - The summaries also name the agents that a resume took from the journal (`cached: true`). Killed runs left their summaries empty.
- **Units.**
  - Tokens come from `message.usage`, deduplicated by `message.id`, keeping the maximum of each field over a message's lines.
  - "calls" is API calls: distinct message ids, which equal distinct request ids.
  - "cw" is `cache_creation_input_tokens`; "cr" is `cache_read_input_tokens`. Uncached input totals only 61,838 across all batches.
  - "min" is the wall time from the first to the last timestamp of the label's transcripts. Where a label ran more than once, agent-minutes are given as well.
- **The transcripts under-record output from client 2.1.283 on, which is from batch 4 (09-26).**
  - For most requests the client wrote only the usage of the first streamed event: `output_tokens` has a median of 8 and `stop_reason` is null.
  - That holds for 18,254 of 19,012 requests under 2.1.283 and 889 of 1,109 under 2.1.284. Under 2.1.277–2.1.281 (the repair batch to batch 3.5) it holds for 795 of 7,691.
  - Cache writes and reads are known at the first event, so they are complete.
- **Each list gives two output figures.**
  - "rec" is the transcripts' figure. It is a floor.
  - "out" is an estimate. It keeps the recorded value for complete requests. For each incomplete request it takes the larger of the recorded value and a fit made over the 7,874 complete requests.
  - The fit is: 0.281 × thinking-signature characters + 0.417 × (tool-input + text characters) − 59, with R² 0.993. It agrees across old and new clients and across the three models (0.29–0.31 per signature character).
  - On the complete requests of each run with at least 200 calls, recorded over predicted is 0.92–1.11, so "out" carries about ±10%.
- **Models.**
  - All requests ran at effort `xhigh`.
  - Workers used `Opus 5` in the repair batch and batches 1–2, and `Opus 5.5` from batch 3.
  - Judges ran on the session's model, `Fable`, in the repair batch and batches 1, 2, 3 and 3.5 (240 calls). From batch 4 they were pinned to `opus`, except 6.5b's `judge:gate`, on `fable` (11 calls).
- **Cache kind.** Every cache write is of the five-minute kind; one-hour writes are 0 everywhere.
- **Scratch files.** The parsers and their outputs are in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/characterize/tokens/` (`parse.py`, `msgs.py`, `agg.py`, `cw.py`, `gen.py`, `numbers.json`).

### Before this session: the eight-rung climb of 2026-09-17

- Run `wf_73833dfb-d25`, session `bdff267d`, 06:01:36–14:38:37 UTC. Its transcripts are not on this disk, and the `transcripts` branch was not mined.
- From `explorations/coordinator/iteration-cost.md` §A–C:
  - 36 agents, 1,694 tool calls, a span of 517.0 min and 508.3 agent-minutes.
  - Fully serial: 1.00× (`climb-batch-3-cost.md` §5).
  - 57.8% of agent time was spent inside tools.
  - Stage classes (agents, wall min): implement 8, 241.8; plan 8, 107.5; verify 8, 82.4; repair 1, 22.4; final re-run 1, 22.3; commit 8, 19.6; verify2 1, 9.6; baseline read 1, 2.5.
- **Neither file gives a token figure for this climb.** `climb-batch-3-cost.md` §1 gives the harness token figures (sums of final contexts) only for the repair batch and batches 1–3. Those runs are on this disk and are reproduced below.

### Per batch

#### The repair batch (2026-09-18/19)

- **Batch total**: 2 runs, 13 agents. Output 1.07M est. (843K rec.); cw 3.88M; cr 173.8M; 1009 API calls, 1203 tool calls. 334.4 agent-min; span 266.8 min (09-18 22:57 to 09-19 03:23 UTC). Agents that returned nothing (killed, stopped or failed): 2, with 177K output est., 480K cw, 34.0M cr, 204 calls and 50.3 agent-min.
- Run `wf_9777a563-c5e`: the repair batch's "re-run" (remote-container.md), launched 22:57. It was killed by the VM restart at about 23:22 (remote-container.md, "The 2026-09-18 restart"), and no agent returned. 2 agents; output 177K est. (119K rec.); cw 480K; cr 34.0M; 204 calls; span 25.2 min, 50.3 agent-min; sum of final contexts 514K.
  - rung:R1: out 86K (rec 51K), cw 254K, cr 15.4M, 95 calls, 25.2 min, returned nothing
  - rung:R2: out 92K (rec 68K), cw 226K, cr 18.6M, 109 calls, 25.1 min, returned nothing
- Run `wf_aabc0cb2-d31`: relaunch from the base at 23:28; landed 03:22. 11 agents; output 891K est. (724K rec.); cw 3.40M; cr 139.8M; 805 calls; span 235.4 min, 284.1 agent-min; sum of final contexts 2.60M.
  - rung:R1: out 162K (rec 123K), cw 955K, cr 41.6M, 190 calls, 79.9 min
  - rung:R2: out 96K (rec 79K), cw 215K, cr 10.8M, 69 calls, 26.8 min
  - skeptic:R2: out 91K (rec 65K), cw 253K, cr 8.8M, 54 calls, 22.3 min
  - skeptic:R1: out 108K (rec 88K), cw 282K, cr 16.9M, 94 calls, 34.4 min
  - judge:R1: out 72K (rec 72K), cw 386K, cr 1.8M, 17 calls, 14.6 min
  - repair:R1: out 91K (rec 81K), cw 251K, cr 14.2M, 89 calls, 28.2 min
  - skeptic2:R1: out 66K (rec 55K), cw 226K, cr 7.0M, 46 calls, 16.4 min
  - gather: out 76K (rec 62K), cw 232K, cr 17.3M, 105 calls, 18.5 min
  - review: out 86K (rec 63K), cw 299K, cr 16.1M, 80 calls, 20.2 min
  - gate: out 19K (rec 19K), cw 170K, cr 2.3M, 32 calls, 16.2 min
  - commit: out 24K (rec 18K), cw 127K, cr 2.9M, 29 calls, 6.5 min

#### Climb batch 1 (2026-09-19)

- **Batch total**: 2 runs, 17 agents. Output 1.17M est. (989K rec.); cw 3.60M; cr 180.2M; 1137 API calls, 1371 tool calls. 348.4 agent-min; span 269.0 min (09-19 07:15 to 11:44 UTC). Agents that returned nothing: 2, with 199K output est., 527K cw, 37.3M cr, 206 calls and 62.8 agent-min.
- Run `wf_a29fd04b-a9a`: first run, launched 07:15. It was killed at 07:46:42 by an interrupt of the coordinator's turn (FACTS.md), and no agent returned. 2 agents; output 199K est. (181K rec.); cw 527K; cr 37.3M; 206 calls; span 31.4 min, 62.8 agent-min; sum of final contexts 561K.
  - rung:F: out 117K (rec 102K), cw 327K, cr 24.5M, 121 calls, 31.4 min, returned nothing
  - rung:M: out 81K (rec 79K), cw 200K, cr 12.8M, 85 calls, 31.4 min, returned nothing
- Run `wf_3b5a273c-a80`: relaunch at 08:24; landed 11:35. 15 agents; output 971K est. (809K rec.); cw 3.07M; cr 142.9M; 931 calls; span 200.1 min, 285.6 agent-min; sum of final contexts 3.02M.
  - rung:F: out 55K (rec 44K), cw 195K, cr 10.2M, 73 calls, 14.5 min
  - rung:M: out 68K (rec 58K), cw 168K, cr 8.7M, 60 calls, 16.9 min
  - rung:N: out 129K (rec 99K), cw 254K, cr 19.6M, 108 calls, 42.1 min
  - rung:T: out 86K (rec 62K), cw 304K, cr 11.3M, 78 calls, 41.8 min
  - skeptic:F: out 69K (rec 46K), cw 199K, cr 7.0M, 54 calls, 15.7 min
  - skeptic:M: out 69K (rec 58K), cw 169K, cr 9.3M, 66 calls, 16.3 min
  - skeptic:N: out 74K (rec 63K), cw 181K, cr 6.8M, 45 calls, 16.7 min
  - skeptic:T: out 49K (rec 46K), cw 120K, cr 4.2M, 37 calls, 10.9 min
  - judge:N: out 53K (rec 45K), cw 194K, cr 2.0M, 15 calls, 11.4 min
  - repair:N: out 76K (rec 74K), cw 237K, cr 8.8M, 53 calls, 16.2 min
  - skeptic2:N: out 51K (rec 43K), cw 201K, cr 4.4M, 31 calls, 11.8 min
  - gather: out 92K (rec 82K), cw 264K, cr 25.4M, 139 calls, 19.6 min
  - review: out 67K (rec 58K), cw 273K, cr 21.2M, 114 calls, 14.7 min
  - gate: out 19K (rec 17K), cw 219K, cr 1.7M, 29 calls, 26.6 min
  - commit: out 15K (rec 11K), cw 94K, cr 2.3M, 29 calls, 10.4 min

#### Climb batch 2 (2026-09-20)

- **Batch total**: 1 run, 17 agents. Output 1.36M est. (972K rec.); cw 4.07M; cr 214.8M; 1284 API calls, 1496 tool calls. 428.1 agent-min; span 316.1 min (05:29 to 10:45 UTC).
- Run `wf_d1628adb-2ee`: one run. After the second review a gate went red and was judged and repaired inside the run (judge:gate, repair:gate, gate2). 17 agents; sum of final contexts 3.75M.
  - rung:X: out 116K (rec 79K), cw 303K, cr 29.3M, 150 calls, 40.4 min
  - rung:W: out 148K (rec 117K), cw 317K, cr 28.9M, 127 calls, 45.7 min
  - rung:B: out 117K (rec 68K), cw 433K, cr 14.2M, 89 calls, 41.5 min
  - skeptic:X: out 101K (rec 70K), cw 241K, cr 12.3M, 76 calls, 25.1 min
  - skeptic:W: out 105K (rec 88K), cw 220K, cr 11.7M, 67 calls, 24.5 min
  - skeptic:B: out 90K (rec 62K), cw 192K, cr 10.2M, 68 calls, 22.2 min
  - gather: out 154K (rec 109K), cw 352K, cr 36.5M, 161 calls, 45.7 min
  - review: out 74K (rec 47K), cw 261K, cr 15.3M, 82 calls, 17.3 min
  - gate: out 39K (rec 24K), cw 209K, cr 5.4M, 56 calls, 25.5 min
  - judge:review: out 78K (rec 49K), cw 213K, cr 5.3M, 41 calls, 19.3 min
  - repair:review: out 50K (rec 37K), cw 167K, cr 8.0M, 68 calls, 13.1 min
  - review2: out 78K (rec 51K), cw 263K, cr 17.6M, 100 calls, 19.5 min
  - gate:after-review: out 40K (rec 37K), cw 209K, cr 4.9M, 54 calls, 33.7 min
  - judge:gate: out 66K (rec 51K), cw 188K, cr 1.9M, 16 calls, 13.6 min
  - repair:gate: out 56K (rec 49K), cw 155K, cr 4.5M, 41 calls, 12.6 min
  - gate2: out 27K (rec 21K), cw 234K, cr 5.2M, 52 calls, 22.6 min
  - commit: out 19K (rec 14K), cw 117K, cr 3.5M, 36 calls, 5.8 min

#### Climb batch 3 (2026-09-22/23)

- **Batch total**: 1 run, 30 agents. Output 2.89M est. (2.76M rec.); cw 8.94M; cr 587.1M; 2895 API calls, 3019 tool calls. 705.3 agent-min; span 398.7 min (09-22 18:52 to 09-23 01:31 UTC).
- Run `wf_776d7c2c-6c3`: one run. It ended with landed:false ("review still blocking after one repair"). The coordinator finished the landing outside the run, so that work is not in these transcripts, and the run has no commit stage. 30 agents; sum of final contexts 8.19M.
  - rung:P: out 150K (rec 141K), cw 399K, cr 36.0M, 152 calls, 40.0 min
  - rung:L: out 180K (rec 156K), cw 692K, cr 44.8M, 189 calls, 51.2 min
  - rung:S: out 159K (rec 146K), cw 349K, cr 40.8M, 186 calls, 66.5 min
  - rung:M: out 128K (rec 126K), cw 903K, cr 31.6M, 169 calls, 55.7 min
  - rung:R: out 91K (rec 84K), cw 210K, cr 16.5M, 109 calls, 20.0 min
  - rung:C: out 163K (rec 162K), cw 333K, cr 37.5M, 181 calls, 32.2 min
  - judge:P:stop: out 73K (rec 73K), cw 318K, cr 1.4M, 15 calls, 15.9 min
  - skeptic:L: out 125K (rec 122K), cw 502K, cr 25.2M, 138 calls, 40.6 min
  - skeptic:S: out 82K (rec 82K), cw 202K, cr 14.6M, 92 calls, 15.4 min
  - skeptic:M: out 104K (rec 103K), cw 244K, cr 19.5M, 112 calls, 25.1 min
  - skeptic:R: out 88K (rec 87K), cw 188K, cr 11.2M, 78 calls, 16.5 min
  - skeptic:C: out 143K (rec 134K), cw 285K, cr 28.2M, 143 calls, 30.6 min
  - judge:S: out 65K (rec 65K), cw 192K, cr 1.5M, 12 calls, 13.8 min
  - judge:M: out 46K (rec 46K), cw 137K, cr 1.5M, 13 calls, 9.3 min
  - judge:R: out 54K (rec 53K), cw 128K, cr 1.8M, 18 calls, 11.4 min
  - repair:S: out 140K (rec 123K), cw 342K, cr 25.0M, 125 calls, 30.1 min
  - judge:C: out 53K (rec 52K), cw 151K, cr 1.0M, 9 calls, 10.8 min
  - repair:M: out 42K (rec 36K), cw 147K, cr 6.4M, 46 calls, 6.9 min
  - repair:R: out 66K (rec 66K), cw 183K, cr 8.0M, 55 calls, 12.4 min
  - repair:C: out 52K (rec 52K), cw 171K, cr 9.7M, 68 calls, 9.9 min
  - skeptic2:M: out 81K (rec 81K), cw 268K, cr 17.3M, 98 calls, 16.2 min
  - skeptic2:S: out 90K (rec 87K), cw 231K, cr 14.5M, 80 calls, 19.5 min
  - skeptic2:R: out 82K (rec 79K), cw 202K, cr 12.4M, 76 calls, 18.3 min
  - skeptic2:C: out 78K (rec 78K), cw 235K, cr 17.4M, 94 calls, 14.1 min
  - gather: out 204K (rec 179K), cw 529K, cr 75.7M, 216 calls, 35.8 min
  - review: out 98K (rec 97K), cw 375K, cr 32.4M, 126 calls, 17.3 min
  - gate: out 25K (rec 25K), cw 208K, cr 4.2M, 49 calls, 21.7 min
  - judge:review: out 54K (rec 54K), cw 192K, cr 3.1M, 26 calls, 11.5 min
  - repair:review: out 80K (rec 79K), cw 237K, cr 12.9M, 82 calls, 20.2 min
  - review2: out 91K (rec 89K), cw 381K, cr 35.0M, 138 calls, 16.2 min

#### Climb batch 3.5 (2026-09-24)

- **Batch total**: 1 run, 17 agents. Output 1.49M est. (1.48M rec.); cw 5.91M; cr 293.0M; 1358 API calls, 1431 tool calls. 342.2 agent-min; span 276.8 min (00:13 to 04:50 UTC).
- Run `wf_207012c9-0ef`: one run. Rung I stopped; its stop was judged (judge:I:stop), and the rung went on as the script stage resume:I. 17 agents; sum of final contexts 4.85M.
  - rung:I: out 205K (rec 191K), cw 460K, cr 51.4M, 183 calls, 41.0 min
  - rung:B: out 133K (rec 133K), cw 312K, cr 31.2M, 137 calls, 30.2 min
  - skeptic:B: out 90K (rec 90K), cw 290K, cr 17.6M, 91 calls, 16.1 min
  - judge:I:stop: out 55K (rec 55K), cw 199K, cr 2.6M, 22 calls, 12.1 min
  - resume:I: out 54K (rec 54K), cw 203K, cr 7.3M, 53 calls, 11.6 min
  - skeptic:I: out 120K (rec 120K), cw 317K, cr 19.6M, 94 calls, 22.6 min
  - judge:I: out 48K (rec 48K), cw 211K, cr 2.0M, 17 calls, 10.2 min
  - repair:I: out 98K (rec 98K), cw 485K, cr 16.8M, 88 calls, 27.7 min
  - skeptic2:I: out 80K (rec 80K), cw 259K, cr 12.2M, 69 calls, 15.1 min
  - gather: out 142K (rec 141K), cw 457K, cr 40.7M, 133 calls, 26.9 min
  - review: out 98K (rec 98K), cw 756K, cr 31.8M, 120 calls, 23.6 min
  - gate: out 26K (rec 26K), cw 194K, cr 4.1M, 47 calls, 19.6 min
  - judge:review: out 126K (rec 126K), cw 762K, cr 3.5M, 19 calls, 25.1 min
  - repair:review: out 94K (rec 94K), cw 288K, cr 19.2M, 107 calls, 24.6 min
  - review2: out 83K (rec 82K), cw 382K, cr 25.9M, 101 calls, 14.1 min
  - gate:after-review: out 23K (rec 23K), cw 215K, cr 4.2M, 47 calls, 18.7 min
  - commit: out 17K (rec 17K), cw 117K, cr 2.8M, 30 calls, 3.2 min

#### Climb batch 4 (2026-09-26)

- **Batch total**: 1 run, 19 agents. Output 2.19M est. (279K rec.); cw 8.68M; cr 526.4M; 2132 API calls, 2205 tool calls. 582.9 agent-min; span 333.3 min (01:31 to 07:04 UTC).
- Run `wf_f54d0e4b-63d`: one run; rung O stopped (judge:O:stop). 19 agents; sum of final contexts 5.91M.
  - rung:N: out 305K (rec 27K), cw 1.74M, cr 120.7M, 309 calls, 91.1 min
  - rung:C: out 269K (rec 39K), cw 988K, cr 80.5M, 253 calls, 82.9 min
  - rung:O: out 115K (rec 18K), cw 947K, cr 20.5M, 119 calls, 62.3 min
  - rung:K: out 106K (rec 24K), cw 441K, cr 22.7M, 128 calls, 34.0 min
  - skeptic:C: out 134K (rec 16K), cw 327K, cr 23.0M, 110 calls, 25.6 min
  - skeptic:N: out 131K (rec 18K), cw 350K, cr 31.5M, 128 calls, 25.7 min
  - skeptic:K: out 92K (rec 16K), cw 201K, cr 13.9M, 92 calls, 19.1 min
  - judge:O:stop: out 62K (rec 10K), cw 190K, cr 5.7M, 42 calls, 10.8 min
  - judge:C: out 76K (rec 16K), cw 176K, cr 6.0M, 41 calls, 12.2 min
  - judge:N: out 92K (rec 22K), cw 232K, cr 12.2M, 68 calls, 15.1 min
  - repair:C: out 131K (rec 19K), cw 515K, cr 29.7M, 137 calls, 41.2 min
  - repair:N: out 86K (rec 9K), cw 238K, cr 16.5M, 88 calls, 15.3 min
  - skeptic2:N: out 78K (rec 7K), cw 265K, cr 13.9M, 75 calls, 14.3 min
  - skeptic2:C: out 84K (rec 16K), cw 230K, cr 14.1M, 82 calls, 14.2 min
  - gather: out 222K (rec 5K), cw 549K, cr 61.9M, 173 calls, 37.2 min
  - gate: out 29K (rec 4K), cw 219K, cr 4.0M, 45 calls, 24.6 min
  - review: out 126K (rec 5K), cw 744K, cr 41.0M, 162 calls, 28.7 min
  - gate:after-review: out 20K (rec 4K), cw 161K, cr 3.1M, 37 calls, 21.8 min
  - commit: out 31K (rec 3K), cw 164K, cr 5.4M, 43 calls, 6.5 min

#### Climb batch 5 (2026-09-26)

- **Batch total**: 2 runs, 19 agents. Output 2.06M est. (288K rec.); cw 9.77M; cr 511.3M; 2175 API calls, 2257 tool calls. 633.2 agent-min; span 404.9 min (11:10 to 17:55 UTC). Agents that returned nothing: 2, with 222K output est., 2.22M cw, 70.6M cr, 293 calls and 115.1 agent-min.
- Run `wf_eb47c103-304`: first run, launched 11:10. It was killed at 12:07:47 by an interrupt (FACTS.md), and no agent returned. 2 agents; output 222K est. (16K rec.); cw 2.22M; cr 70.6M; 293 calls; span 57.6 min, 115.1 agent-min; sum of final contexts 722K.
  - rung:Z: out 137K (rec 5K), cw 1.11M, cr 48.7M, 189 calls, 57.6 min, returned nothing
  - rung:D: out 85K (rec 11K), cw 1.10M, cr 21.9M, 104 calls, 57.5 min, returned nothing
- Run `wf_88172730-ebe`: relaunch from the base at 12:12 (RECORD.md: "the relaunch of wf_eb47c103-304"). 17 agents; output 1.84M est. (272K rec.); cw 7.56M; cr 440.8M; 1882 calls; span 342.2 min, 518.1 agent-min; sum of final contexts 4.95M.
  - rung:Z: out 239K (rec 38K), cw 482K, cr 59.4M, 205 calls, 68.7 min
  - rung:D: out 186K (rec 28K), cw 2.63M, cr 52.7M, 214 calls, 136.6 min
  - rung:S: out 243K (rec 50K), cw 490K, cr 70.2M, 219 calls, 46.7 min
  - skeptic:Z: out 116K (rec 15K), cw 300K, cr 21.2M, 107 calls, 25.1 min
  - skeptic:S: out 117K (rec 16K), cw 278K, cr 22.3M, 106 calls, 20.2 min
  - judge:D:stop: out 39K (rec 9K), cw 172K, cr 4.9M, 38 calls, 6.8 min
  - judge:Z: out 75K (rec 16K), cw 176K, cr 8.4M, 57 calls, 13.2 min
  - repair:Z: out 146K (rec 16K), cw 362K, cr 34.7M, 158 calls, 40.5 min
  - skeptic2:Z: out 72K (rec 10K), cw 227K, cr 11.3M, 73 calls, 14.9 min
  - gather: out 172K (rec 26K), cw 518K, cr 64.7M, 189 calls, 30.2 min
  - gate: out 20K (rec 4K), cw 188K, cr 3.1M, 38 calls, 20.0 min
  - review: out 120K (rec 5K), cw 675K, cr 36.4M, 158 calls, 26.5 min
  - judge:review: out 81K (rec 21K), cw 208K, cr 7.6M, 57 calls, 13.3 min
  - repair:review: out 59K (rec 8K), cw 184K, cr 9.2M, 70 calls, 11.2 min
  - review2: out 112K (rec 5K), cw 335K, cr 28.2M, 123 calls, 20.9 min
  - gate:after-review: out 23K (rec 3K), cw 222K, cr 3.7M, 41 calls, 19.6 min
  - commit: out 20K (rec 2K), cw 115K, cr 2.7M, 29 calls, 3.6 min

#### Climb batch 6 (2026-09-26/27)

- **Batch total**: 1 run, 23 agents. Output 3.41M est. (703K rec.); cw 13.22M; cr 931.0M; 3070 API calls, 3164 tool calls. 790.6 agent-min; span 516.4 min (09-26 23:16 to 09-27 07:53 UTC). Agents that returned nothing: 1, with 104K output est., 254K cw, 13.4M cr, 69 calls and 17.9 agent-min.
- Run `wf_b262c534-337`: one run. The harness marked skeptic2:R failed after it had delivered its structured output (journal line 24, FACTS.md), so rung R reached the gather as dropped. 23 agents; sum of final contexts 8.20M.
  - rung:F: out 632K (rec 65K), cw 5.61M, cr 296.7M, 658 calls, 239.1 min
  - rung:T: out 300K (rec 58K), cw 848K, cr 89.1M, 218 calls, 51.8 min
  - rung:R: out 201K (rec 58K), cw 373K, cr 43.8M, 183 calls, 49.8 min
  - skeptic:T: out 137K (rec 26K), cw 386K, cr 33.3M, 130 calls, 25.9 min
  - skeptic:R: out 111K (rec 29K), cw 261K, cr 17.2M, 93 calls, 22.8 min
  - judge:T: out 80K (rec 22K), cw 264K, cr 10.5M, 59 calls, 13.1 min
  - judge:R: out 67K (rec 16K), cw 181K, cr 7.3M, 46 calls, 11.1 min
  - repair:T: out 157K (rec 78K), cw 336K, cr 32.3M, 137 calls, 24.5 min
  - repair:R: out 169K (rec 85K), cw 277K, cr 14.0M, 77 calls, 26.2 min
  - skeptic2:T: out 83K (rec 17K), cw 315K, cr 19.0M, 89 calls, 14.6 min
  - skeptic2:R: out 104K (rec 11K), cw 254K, cr 13.4M, 69 calls, 17.9 min, returned nothing
  - skeptic:F: out 150K (rec 32K), cw 395K, cr 44.4M, 154 calls, 28.8 min
  - judge:F: out 94K (rec 20K), cw 289K, cr 12.0M, 57 calls, 15.6 min
  - repair:F: out 232K (rec 75K), cw 517K, cr 59.7M, 202 calls, 45.7 min
  - skeptic2:F: out 122K (rec 32K), cw 308K, cr 16.1M, 78 calls, 24.0 min
  - gather: out 210K (rec 13K), cw 646K, cr 102.1M, 225 calls, 41.1 min
  - gate: out 23K (rec 3K), cw 198K, cr 3.3M, 38 calls, 18.1 min
  - review: out 103K (rec 6K), cw 400K, cr 30.7M, 111 calls, 21.8 min
  - judge:review: out 125K (rec 19K), cw 326K, cr 18.7M, 86 calls, 21.0 min
  - repair:review: out 135K (rec 25K), cw 328K, cr 31.4M, 152 calls, 33.3 min
  - review2: out 103K (rec 3K), cw 340K, cr 26.2M, 113 calls, 18.1 min
  - gate:after-review: out 27K (rec 3K), cw 213K, cr 3.8M, 43 calls, 19.0 min
  - commit: out 41K (rec 3K), cw 156K, cr 6.1M, 52 calls, 7.2 min

#### Climb batch 6b (2026-09-27)

- **Batch total**: 2 runs, 15 agents. Output 1.14M est. (252K rec.); cw 8.04M; cr 182.2M; 1001 API calls, 1026 tool calls. 380.2 agent-min; span 356.6 min (08:42 to 14:39 UTC). Agents that returned nothing: 2, with 31K output est., 317K cw, 6.6M cr, 51 calls and 9.1 agent-min.
- Run `wf_08949b8a-a21`: launched 08:42 and killed at 12:09:17 by a restart of the session's process during repair:O. It was resumed at 12:20 with resumeFromRunId into the same run id: the rung, skeptic and judge came from the journal, and repair:O started anew. 14 agents; output 1.11M est. (251K rec.); cw 7.87M; cr 177.4M; 966 calls; span 356.6 min, 374.5 agent-min; sum of final contexts 3.30M.
  - rung:O: out 210K (rec 48K), cw 4.01M, cr 44.5M, 173 calls, 152.1 min
  - skeptic:O: out 150K (rec 45K), cw 629K, cr 32.3M, 146 calls, 35.8 min
  - judge:O: out 95K (rec 29K), cw 290K, cr 11.3M, 56 calls, 15.1 min
  - repair:O: out 130K (rec 31K), cw 386K, cr 12.5M, 77 calls, 30.4 min, 2 agents, 1 returned, 21.2 agent-min
  - skeptic2:O: out 103K (rec 32K), cw 266K, cr 9.7M, 56 calls, 18.8 min
  - gather: out 101K (rec 13K), cw 291K, cr 14.6M, 73 calls, 17.2 min
  - gate: out 20K (rec 4K), cw 262K, cr 2.8M, 37 calls, 27.7 min
  - review: out 64K (rec 6K), cw 766K, cr 15.6M, 91 calls, 28.3 min
  - judge:review: out 87K (rec 29K), cw 226K, cr 6.5M, 47 calls, 13.8 min
  - repair:review: out 36K (rec 5K), cw 161K, cr 5.8M, 49 calls, 8.5 min
  - review2: out 69K (rec 5K), cw 251K, cr 15.2M, 92 calls, 12.6 min
  - gate:after-review: out 24K (rec 559), cw 197K, cr 3.1M, 37 calls, 18.9 min
  - commit: out 27K (rec 3K), cw 139K, cr 3.3M, 32 calls, 4.4 min
- Run `wf_2da3e152-2d5`: a relaunch from the base at 12:12, abandoned for the resume after 5.7 min. 1 agent; sum of final contexts 202K.
  - rung:O: out 23K (rec 788), cw 167K, cr 4.8M, 35 calls, 5.6 min, returned nothing

#### Climb batch 7 (2026-09-27/28)

- **Batch total**: 1 run, 14 agents. Output 2.13M est. (313K rec.); cw 22.34M; cr 636.2M; 2058 API calls, 2097 tool calls. 838.3 agent-min; span 496.3 min (09-27 19:49 to 09-28 04:05 UTC).
- Run `wf_8a018276-f71`: one run, the first run of CLIMB-BATCH-7.md. 14 agents; sum of final contexts 4.93M.
  - rung:A: out 284K (rec 51K), cw 7.93M, cr 122.0M, 299 calls, 204.0 min
  - rung:H: out 482K (rec 75K), cw 6.81M, cr 174.6M, 459 calls, 225.4 min
  - rung:B: out 259K (rec 49K), cw 2.88M, cr 75.3M, 239 calls, 128.3 min
  - skeptic:A: out 152K (rec 33K), cw 927K, cr 39.5M, 156 calls, 54.2 min
  - skeptic:H: out 152K (rec 13K), cw 694K, cr 38.3M, 149 calls, 41.7 min
  - skeptic:B: out 138K (rec 33K), cw 339K, cr 26.3M, 118 calls, 30.9 min
  - gather: out 253K (rec 16K), cw 613K, cr 68.3M, 158 calls, 41.5 min
  - gate: out 31K (rec 5K), cw 232K, cr 3.4M, 36 calls, 21.3 min
  - review: out 119K (rec 6K), cw 787K, cr 38.9M, 137 calls, 26.1 min
  - judge:review: out 84K (rec 14K), cw 250K, cr 11.5M, 70 calls, 17.9 min
  - repair:review: out 27K (rec 4K), cw 177K, cr 5.5M, 41 calls, 4.2 min
  - review2: out 77K (rec 7K), cw 317K, cr 20.6M, 95 calls, 13.3 min
  - gate:after-review: out 28K (rec 5K), cw 192K, cr 3.8M, 44 calls, 21.3 min
  - commit: out 47K (rec 3K), cw 193K, cr 8.4M, 57 calls, 8.2 min

#### Climb batch 7R (2026-09-28)

- **Batch total**: 1 run, 13 agents. Output 1.72M est. (297K rec.); cw 10.80M; cr 460.2M; 1562 API calls, 1624 tool calls. 543.1 agent-min; span 446.5 min (04:32 to 11:59 UTC). Agents that returned nothing: 1, with 319K output est., 5.63M cw, 116.1M cr, 261 calls and 184.0 agent-min.
- Run `wf_568733d7-19c`: launched 04:32 and killed at 07:36:42 by a restart of the session's process while rung J worked. It was resumed at 07:38: rung U and skeptic U came from the journal, and rung J started anew. 13 agents; sum of final contexts 4.73M.
  - rung:J: out 546K (rec 69K), cw 6.13M, cr 180.7M, 445 calls, 234.5 min, 2 agents, 1 returned, 232.8 agent-min
  - rung:U: out 238K (rec 74K), cw 490K, cr 58.6M, 183 calls, 41.1 min
  - skeptic:U: out 112K (rec 23K), cw 326K, cr 23.0M, 109 calls, 23.7 min
  - skeptic:J: out 174K (rec 40K), cw 756K, cr 41.5M, 153 calls, 57.7 min
  - gather: out 219K (rec 38K), cw 476K, cr 51.0M, 152 calls, 36.5 min
  - gate: out 27K (rec 5K), cw 223K, cr 4.0M, 42 calls, 33.8 min
  - review: out 105K (rec 6K), cw 1.15M, cr 35.0M, 129 calls, 37.1 min
  - judge:review: out 99K (rec 18K), cw 286K, cr 16.4M, 86 calls, 18.7 min
  - repair:review: out 47K (rec 9K), cw 206K, cr 9.8M, 64 calls, 10.2 min
  - review2: out 98K (rec 8K), cw 399K, cr 31.6M, 119 calls, 20.1 min
  - gate:after-review: out 22K (rec 5K), cw 199K, cr 2.7M, 32 calls, 24.0 min
  - commit: out 32K (rec 3K), cw 161K, cr 5.9M, 48 calls, 7.6 min

#### Climb batch 7C (2026-09-28)

- **Batch total**: 1 run, 12 agents. Output 1.37M est. (220K rec.); cw 5.36M; cr 272.8M; 1179 API calls, 1216 tool calls. 371.6 agent-min; span 267.7 min (12:22 to 16:49 UTC).
- Run `wf_5c4d7157-2e7`: one run. 12 agents; sum of final contexts 3.71M.
  - rung:Y: out 164K (rec 31K), cw 648K, cr 32.3M, 135 calls, 55.6 min
  - rung:X: out 224K (rec 53K), cw 421K, cr 45.0M, 152 calls, 44.0 min
  - skeptic:X: out 151K (rec 32K), cw 367K, cr 28.6M, 124 calls, 35.4 min
  - skeptic:Y: out 180K (rec 36K), cw 1.26M, cr 30.1M, 128 calls, 69.6 min
  - gather: out 195K (rec 8K), cw 466K, cr 37.3M, 115 calls, 32.5 min
  - gate: out 22K (rec 4K), cw 206K, cr 3.5M, 39 calls, 24.7 min
  - review: out 111K (rec 8K), cw 776K, cr 35.8M, 133 calls, 28.9 min
  - judge:review: out 104K (rec 22K), cw 297K, cr 16.0M, 82 calls, 18.3 min
  - repair:review: out 61K (rec 14K), cw 208K, cr 10.3M, 73 calls, 12.4 min
  - review2: out 85K (rec 5K), cw 315K, cr 22.1M, 100 calls, 15.8 min
  - gate:after-review: out 23K (rec 5K), cw 200K, cr 3.2M, 37 calls, 24.8 min
  - commit: out 48K (rec 3K), cw 194K, cr 8.6M, 61 calls, 9.6 min

#### Climb batch 6.5 (2026-09-28)

- **Batch total**: 1 run, 17 agents. Output 1.78M est. (279K rec.); cw 5.84M; cr 503.6M; 1730 API calls, 1771 tool calls. 417.3 agent-min; span 304.9 min (17:08 to 22:13 UTC). Agents that returned nothing: 5, with 82K output est., 548K cw, 13.7M cr, 77 calls and 15.4 agent-min.
- Run `wf_fa14416d-889`: launched 17:08. It was stopped at 20:34:04, in judge:review, by a restart of the session's process. Resumes then went as follows (FACTS.md):
  - The first two missed the cache. At 20:34:46 rungs G and P started anew, and at 20:35:35 the skeptics did; all four were cut within a minute.
  - The third ran from a copy of the script that forces the live order. It recovered every finished agent and ran judge:review anew at 20:37:53.
  - 17 agents; sum of final contexts 5.27M.
  - rung:G: out 277K (rec 47K), cw 671K, cr 96.7M, 271 calls, 206.4 min, 2 agents, 1 returned, 77.1 agent-min
  - rung:P: out 268K (rec 66K), cw 636K, cr 90.6M, 232 calls, 206.3 min, 2 agents, 1 returned, 55.6 agent-min
  - skeptic:P: out 141K (rec 30K), cw 427K, cr 29.8M, 123 calls, 151.7 min, 2 agents, 1 returned, 27.1 agent-min
  - skeptic:G: out 190K (rec 33K), cw 486K, cr 43.3M, 157 calls, 130.2 min, 2 agents, 1 returned, 39.5 agent-min
  - gather: out 236K (rec 32K), cw 554K, cr 79.1M, 217 calls, 42.3 min
  - gate: out 48K (rec 5K), cw 419K, cr 10.3M, 87 calls, 33.9 min
  - review: out 126K (rec 9K), cw 823K, cr 43.6M, 143 calls, 31.8 min
  - judge:review: out 204K (rec 28K), cw 632K, cr 27.0M, 134 calls, 40.7 min, 2 agents, 1 returned, 36.2 agent-min
  - repair:review: out 112K (rec 12K), cw 363K, cr 30.7M, 128 calls, 21.8 min
  - review2: out 111K (rec 9K), cw 431K, cr 39.0M, 134 calls, 19.5 min
  - gate:after-review: out 20K (rec 4K), cw 190K, cr 2.8M, 34 calls, 23.9 min
  - commit: out 50K (rec 3K), cw 205K, cr 10.7M, 70 calls, 8.6 min

#### Climb batch N (2026-09-28/29)

- **Batch total**: 1 run, 26 agents. Output 3.81M est. (988K rec.); cw 18.43M; cr 837.5M; 2909 API calls, 3016 tool calls. 979.1 agent-min; span 648.5 min (09-28 22:56 to 09-29 09:45 UTC). Agents that returned nothing: 2, with 29K output est., 248K cw, 6.5M cr, 58 calls and 6.7 agent-min.
- Run `wf_4ba3c084-2b3`: launched 22:56 on 09-28. It ended at 08:14 unlanded ("review still blocking after one repair"). It was then resumed three times from copies of the script:
  - at 08:45, running gate:after-review, which was stopped at 08:47 so the batch could land on the first gate;
  - at 09:26, running commit, which the process stop at 09:31:56 killed;
  - at 09:32, running commit again, which landed `3fb0cd8c1` at 09:45.
  - 26 agents; sum of final contexts 9.21M.
  - rung:K: out 246K (rec 90K), cw 4.39M, cr 60.1M, 181 calls, 151.3 min
  - rung:I: out 308K (rec 62K), cw 2.92M, cr 99.7M, 236 calls, 104.5 min
  - rung:T: out 291K (rec 76K), cw 556K, cr 55.9M, 150 calls, 47.0 min
  - rung:M: out 189K (rec 45K), cw 1.23M, cr 48.8M, 176 calls, 68.5 min
  - skeptic:I: out 138K (rec 27K), cw 375K, cr 23.9M, 95 calls, 33.4 min
  - skeptic:K: out 168K (rec 33K), cw 365K, cr 40.9M, 152 calls, 40.8 min
  - skeptic:T: out 181K (rec 13K), cw 355K, cr 26.4M, 106 calls, 30.7 min
  - judge:I: out 100K (rec 23K), cw 282K, cr 8.0M, 39 calls, 16.0 min
  - skeptic:M: out 146K (rec 41K), cw 541K, cr 22.4M, 110 calls, 31.8 min
  - judge:K: out 75K (rec 20K), cw 249K, cr 9.0M, 51 calls, 12.1 min
  - repair:I: out 287K (rec 144K), cw 1.71M, cr 56.1M, 175 calls, 92.3 min
  - judge:T: out 59K (rec 16K), cw 242K, cr 8.1M, 46 calls, 9.2 min
  - repair:K: out 141K (rec 67K), cw 312K, cr 27.7M, 121 calls, 35.6 min
  - repair:T: out 158K (rec 59K), cw 349K, cr 31.2M, 120 calls, 29.2 min
  - skeptic2:K: out 126K (rec 31K), cw 368K, cr 24.4M, 98 calls, 27.1 min
  - skeptic2:T: out 119K (rec 31K), cw 295K, cr 20.8M, 91 calls, 19.4 min
  - skeptic2:I: out 132K (rec 46K), cw 344K, cr 19.9M, 77 calls, 25.5 min
  - gather: out 397K (rec 94K), cw 1.02M, cr 130.1M, 308 calls, 75.0 min
  - gate: out 31K (rec 4K), cw 215K, cr 4.2M, 44 calls, 28.0 min
  - review: out 113K (rec 10K), cw 859K, cr 39.8M, 137 calls, 28.0 min
  - judge:review: out 101K (rec 22K), cw 249K, cr 9.1M, 53 calls, 16.8 min
  - repair:review: out 102K (rec 16K), cw 387K, cr 28.6M, 107 calls, 20.0 min
  - review2: out 99K (rec 11K), cw 348K, cr 22.8M, 101 calls, 17.4 min
  - gate:after-review: out 4K (rec 143), cw 81K, cr 0.7M, 11 calls, 1.7 min, returned nothing
  - commit: out 104K (rec 7K), cw 385K, cr 19.0M, 124 calls, 18.5 min, 2 agents, 1 returned, 17.7 agent-min

#### Climb batch 6.5b (2026-09-29)

- **Batch total**: 1 run, 17 agents. Output 2.11M est. (636K rec.); cw 17.15M; cr 570.8M; 1865 API calls, 1930 tool calls. 713.2 agent-min; span 463.1 min (09:52 to 17:35 UTC). Agents that returned nothing: 1, with 67K output est., 319K cw, 11.9M cr, 49 calls and 11.1 agent-min.
- Run `wf_07b95462-a7d`: launched 09:52 and killed in its gather by the VM restart at 14:35. It was resumed at 14:40 with the script as launched, and the gather ran anew. The gate judge (on fable) waited on a manual-mode permission prompt from 16:42 to 17:11. 17 agents; sum of final contexts 6.15M.
  - rung:E: out 321K (rec 42K), cw 4.68M, cr 130.2M, 280 calls, 160.7 min
  - rung:V: out 314K (rec 78K), cw 6.47M, cr 126.9M, 328 calls, 180.8 min
  - skeptic:E: out 173K (rec 13K), cw 461K, cr 43.7M, 149 calls, 35.6 min
  - skeptic:V: out 139K (rec 37K), cw 338K, cr 35.4M, 143 calls, 32.4 min
  - judge:E: out 89K (rec 29K), cw 293K, cr 10.4M, 49 calls, 14.9 min
  - repair:E: out 224K (rec 123K), cw 524K, cr 38.4M, 120 calls, 38.7 min
  - skeptic2:E: out 108K (rec 23K), cw 336K, cr 18.6M, 78 calls, 22.3 min
  - gather: out 287K (rec 113K), cw 874K, cr 66.5M, 191 calls, 55.7 min, 2 agents, 1 returned, 50.6 agent-min
  - gate: out 25K (rec 519), cw 286K, cr 3.9M, 43 calls, 42.2 min
  - review: out 99K (rec 991), cw 1.36M, cr 31.4M, 137 calls, 43.2 min
  - judge:review: out 67K (rec 18K), cw 243K, cr 8.7M, 53 calls, 12.1 min
  - repair:review: out 32K (rec 30K), cw 195K, cr 6.5M, 43 calls, 6.9 min
  - review2: out 99K (rec 98K), cw 385K, cr 32.1M, 128 calls, 18.2 min
  - judge:gate: out 41K (rec 16K), cw 311K, cr 1.4M, 11 calls, 38.3 min
  - repair:gate: out 25K (rec 10K), cw 164K, cr 3.6M, 29 calls, 3.8 min
  - commit: out 66K (rec 3K), cw 223K, cr 13.2M, 83 calls, 12.3 min

### Across all batches

This covers the 15 batches' 19 runs in this session, killed and abandoned runs included, but not the probe run or this characterization.

- **Totals**:
  - 269 agents and 27,364 API calls, making 28,826 tool calls over 8,408 agent-min.
  - Output 29.70M estimated, 11.29M recorded.
  - Cache writes 146.03M; cache reads 6,880.8M.
- **The 18 agents that returned nothing** were killed by restarts or interrupts, stopped, failed, or run live again after a missed resume. Together they account for 1.23M output (est.), 10.54M cw, 310.2M cr, 1,268 calls and 472.4 agent-min.
  - The largest single one is 7R's first `rung:J`, cut at 07:36:42 after 184 min: 5.63M cw and 116.1M cr.
  - The next largest are batch 5's first run (2.22M cw, 70.6M cr) and batch 1's first run (0.53M cw, 37.3M cr).

**By stage kind.** The first figure is the share of (estimated output + cache writes); the second is the share of cache reads.

- rung worker (`rung`): 48.7% and 42.3%. It also takes 51.8% of all cache writes, 33.8% of estimated output and 44.2% of agent-minutes.
- first skeptic: 11.4% and 13.9%.
- review: 6.7% and 6.8%.
- gather: 6.1% and 12.7%. It is the second-largest reader.
- rung repair: 5.6% and 6.4%.
- second skeptic: 3.7% and 3.9%.
- rung judge: 3.7% and 1.9%.
- review2: 3.0% and 4.6%.
- judge:review: 2.9% and 1.9%.
- gate: 2.2% and 0.9%.
- repair:review: 2.1% and 2.6%.
- commit: 1.7% and 1.4%.
- gate:after-review: 1.3% and 0.5%.
- judge:gate, repair:gate, gate2 and resume: 0.1–0.3% each, and at most 0.1% of reads.
- Using recorded instead of estimated output moves the first figure by at most 1.6 points (rung 50.3%, skeptic 10.8%, gather 5.6%), because cache writes are 83% of the sum.

**By family:**

- rung worker (rung, resume): 48.9% and 42.4%.
- review loop (review, judge:review, repair:review, review2): 14.7% and 15.9%.
- refusal cycle (rung judge, rung repair, skeptic2): 12.9% and 12.2%.
- first skeptic: 11.4% and 13.9%.
- gather: 6.1% and 12.7%.
- gate (gate, gate:after-review, gate2, judge:gate, repair:gate): 4.2% and 1.6%.
- commit: 1.7% and 1.4%.

**Shares of (est. output + cw) by batch**, in the order repair, 1, 2, 3, 3.5, 4, 5, 6, 6b, 7, 7R, 7C, 6.5, N, 6.5b:

- rung worker: 42, 42, 26, 32, 18, 45, 57, 48, 48, 76, 59, 22, 24, 46, 61%.
- review loop: 8, 7, 22, 13, 35, 8, 15, 11, 18, 8, 19, 29, 37, 10, 13%.

**Where the cache writes come from.**

- 196 requests followed a gap of five minutes or more within the same agent, which is past the cache's five-minute lifetime. They wrote 65.5M, 44.9% of all cache writes. For rung workers it is 70.3% of their 75.6M.
- Agents' first requests wrote 16.4M (11.2%). The other 26,899 requests wrote 64.1M (43.9%).
- The share of cache writes that followed five-minute gaps, by batch:
  - repair 17%, 1 7%, 2 11%, 3 14%, 3.5 19%.
  - 4 36%, 5 44%, 6 33%, 6b 57%, 7 75% (16.8M of 22.3M), 7R 57%, 7C 32%, 6.5 12%, N 48%, 6.5b 65% (11.1M of 17.1M).

### Checks against the records

- **`climb-batch-3-cost.md` [U] for batch 3 is reproduced exactly:** 2,756,755 output, 8,935,278 cw, 587,064,515 cr, 8,400 input, 2,895 requests, and 8,186,772 as the sum of final contexts. Its client wrote complete usage for 2,810 of 2,895 requests, which is why its recorded output is close to the estimate here (2.89M).
- **The harness token figures (sums of final contexts) fit the records:**
  - repair batch: 2,600,173 against 2,600,293 (FACTS-history.md:208);
  - batch 1: 3,022,210, exact (FACTS-history.md:238);
  - batch 2: 3,748,048 against 3,748,433;
  - 6.5b: 6,154,093 against the 6.15M of `reviews/batch-6.5b-review.md`.
- **The harness summaries of resumed runs count only the agents run live in the final resume.** Their figures against the sum over all agents:
  - 6b: 2,075,355 against 3.30M;
  - 7R: 3,146,146 against 4.73M;
  - 6.5: 1,436,730 against 5.27M;
  - N: 253,275 on its last resume and 8,714,340 at its 08:14 end, against 9.21M;
  - 6.5b: 2,464,668 against 6.15M.
- **`repair-batch-review.md` §7's "raw sums" count per transcript line, not per message.** Those sums are 726,963 output, 8,436,864 cache-creation and 278,576,669 cache-read. A transcript repeats a message's usage on every content-block line, so per message id the figures are 723,966, 3,396,088 and 139,806,155.
- **`postmortem-2026-09-29/measures-6.5b.md` fits for cache but gives the output floor.**
  - Its "0.64M output, 17.2M written to cache, 571M read" matches the recorded 636,266, 17,146,636 and 570,775,952.
  - Its stage lines match too: rung V is 181 min, 328 calls, 6.5M cw and 127M cr here as well.
  - Its output figure is the transcript floor; the estimate is 2.11M.



## The revival's tests against the team's test-suite practice

## The revival's tests measured against the team's test-suite practice

Scope. The team's corpus is the tree at `a874948ac`. The measures below cover the three gated suites, `ProjectFortress/tests/` (testSystem), and `compiler_tests/` and `library_tests/` (testFast). Their team files are 902 `.fss`/`.fsi` and 287 `.test`. The revival's corpus is every test file added or modified on `main` in `a874948ac..HEAD` (`4e921ddb5`). The net diff (`git diff --no-renames a874948ac HEAD`) gives:
- 411 new files: `tests/` 69, `compiler_tests/` 308, `library_tests/` 32, `test_library/` 2;
- 43 edited team files: `tests/` 30, `library_tests/` 4, `demos/` 9.

Nothing was added to or deleted from the other team corpora (`parser_tests`, `other_compiler_tests`, `syntax_abstraction_tests`, `not_*` and the rest). How lines were counted:
- "Lines" includes the team's 10-line Oracle header.
- "Code" means non-blank lines outside comments.
- "Checks" means `assert`/`deny` calls, plus calls to a local helper that asserts or prints `fail`, plus `fail(...)` calls. Printing PASS is counted separately.

The scripts and TSVs are in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/characterize/tests-vs-team/` (`analyze.py`, `summ.py`, `team.tsv`, `new.tsv`).

### 1. The team's practice at `a874948ac`

**Naming.**
- `tests/`: topic names, often camelCase with a numbered variant: `intPrim`, `XXXimmutable1`, `genericTest6`. Of the 381 top-level names, 116 contain `Test` and 102 end in a digit. The median name is 11 characters.
- `compiler_tests/`: numbered series. 423 of the 456 programs are named `CompiledN.x.fss`. The `.test` files are named `XXX<n><letter>.test`: 218 of the 224 XXX files, for example `XXX0t.test`, which drives `Compiled0.t.fss`. The XXX mark sits on the `.test` file only; no compiler program carries it.

**XXX (expected failure).**
- `tests/`: 56 of 385 files (14.5%). These are negative programs that the language must reject. Only 1 of the 55 top-level ones prints `"PASS"`, and none prints REACHED.
- `compiler_tests/`: 224 of 281 `.test` (79.7%). 222 are static-error goldens (`compile` plus `compile_err_equals` holding the full diagnostic text with `${STATIC_TESTS_DIR}` spans, plus an empty `compile_out_equals`), 1 uses `compile_err_contains` and 1 `link_err_contains`. None expects a run to fail.
- `library_tests/`: 0 of 6.

**Length.** Quartiles are q1 / median / q3.

| group | n | lines | code median | max |
|---|---|---|---|---|
| `tests/` plain | 326 | 26 / 34 / 50 | 17 | 726 (`RationalTest`) |
| `tests/` XXX | 55 | 22 / 27 / 34 | 11 | 115 |
| `compiler_tests/` `.fss` | 456 | 19 / 23 / 30 | 9 | 350 |
| `library_tests/` `.fss` | 26 | 32 / 94 / 131 | 74 | 215 |
| `.test` XXX | 224 | 17 / 18 / 21 | about 10 without the 8-line header | — |
| `.test` plain | 57 | 14 / 14 / 16 | — | — |

**How a test states what it checks.** The harness passes an interpreter test when it raises no exception and prints no `fail` or `FAIL` (`FileTests.java:367-371`). An XXX interpreter test passes on any exception, because `BaseTest.testFailed` returns null (`:111-112`) and `InterpreterTest` does not override it.
- 115 of the 326 plain team interpreter tests (35%) have no assertion, no `fail` string and no PASS print; they pass by running.
- Compiler programs carry almost no checks: 394 of 456 have none. The check lives in the `.test` file:
  - plain team `.test`: `run_out_equals` (golden output) 27 of 57, `run_out_contains` 13, `run_out_matches`/`run_err_matches` 6;
  - a plain `run` with no key must print `pass` or `PASS` (`FileTests.java:276-281`).

**Checks per file** (sum; q1 / median / q3; max):

| group | sum | q1 / median / q3 | max |
|---|---|---|---|
| `tests/` plain | 2,932 | 0 / 0 / 4 | 703 |
| `tests/` XXX | 7 | 0 / 0 / 0 | — |
| `compiler_tests/` `.fss` | 47 | — | — |
| `library_tests/` `.fss` | 1,060 | 2 / 44 / 71 | — |

26 of the 326 plain interpreter tests have 20 or more checks. Each such file is a table over one feature (`RationalTest`, `CharacterTest`).

**One feature or many.**
- Plain interpreter tests have a median of 1 top-level function (q3 2).
- Compiler programs are tiny single-feature programs grouped by `.test`: 19 of the 57 plain `.test` files list several programs through `tests=` (208 programs in all), and 5 of the 6 library `.test` files do (20 programs).
- Only 7 files use Fortress `test` declarations or QuickCheck.

**Comments and provenance.**
- Oracle header on every file: `tests/` 385 of 385, compiler `.fss` 453 of 456, library 25 of 26, and all 287 `.test`.
- Beyond the header, 321 of the 902 `.fss`/`.fsi` have a comment (931 blocks). The comments hold:
  - intent sentences ("An exit outside of a label with no target should generate error.");
  - expected output (`(*) 5`, `(* 29 Ok *)`);
  - commented-out code (71 blocks);
  - bug notes (39 files).
- Citations of any document, ledger row or `.tex` line: 0 files. Author names: 3 files. Dates: 1 file.

**`.test` forms.**
- XXX: 223 compile-only goldens and 1 link-only.
- Plain: 46 link+run, 2 run, 4 compile-only, and 5 typecheck, disambiguate, api or parse.
- 230 of the 287 set `STATIC_TESTS_DIR`. No `*Link.test` exists.

**Three team tests, quoted briefly.**
- `tests/EqualityOverloadBug.fss` (30 lines, 4 checks): `assert(Bar,Bar,"Bar")` / `assert(17,17,"ZZ32")` / `assert(18.5,18.5,"RR64")`, with one assertion commented out.
- `tests/XXXimmutable1.fss`: `x = 3 (* Should fail here, 2nd init of immutable. *)` then `println("x = " x)`. It has no assertion; the expected exception is the check.
- `compiler_tests/XXX0t.test`: an 8-line header, then `tests=Compiled0.t`, `compile`, and `compile_err_equals=${STATIC_TESTS_DIR}/Compiled0.t.fss:14:8-18:\n\ Component Compiled0.t imports and exports (perhaps implicitly) API Executable. …File Compiled0.t.fss has 1 error.\n`. The program is 5 lines: `run():() = println "Hello, World!"`.

### 2. The revival's added tests

**Counts per suite (net).**

| suite | files | lines added / deleted | what the files are |
|---|---|---|---|
| `tests/` | 99 | +2,913 / −242 | 69 new files (2,651 lines) and 30 edited team files |
| `compiler_tests/` | 308 | +3,830 / −0 | 134 `.fss`, 3 `.fsi`, 171 `.test` |
| `library_tests/` | 36 | +1,150 / −7 | 32 new files and 4 edited team files |
| `test_library/` | 2 | +29 | — |
| `demos/` | 9 | +33 / −33 | edited team files |
| **total** | **454** | **+7,955 / −282** | — |

The revival's own history over these paths, counted with `git log --numstat`, is +9,242 / −1,569 across 64 commits. New files added per day ran from 17 on 09-17 to 126 on 09-29.

**Test units.**

| suite | plain | XXX | companions |
|---|---|---|---|
| `tests/` | 29 (20 written plain, 9 promoted) | 40 | — |
| `compiler_tests/` | 57 `.test` (50 written plain, 7 promoted) | 75 `.test` | 39 `*Link.test` |
| `library_tests/` | 14 `.test` (includes `ClauseBindingRungB`, promoted) | 1 | 2 `*Link.test` |

`EqualityRung1.test` was moved in from `not_working_library_tests/`.
- Promotions: 17 of the 133 XXX stems the revival ever added (16 detected as renames, plus `XXXFixedWidthOverflowRungB` deleted and re-added in `917bb7b32`). 116 are still XXX.
- Deleted tests: none, neither team nor revival; every file added and later gone was renamed or moved.

**Rung or batch suffixes.**
- 220 of the 411 new files (5,130 lines) carry `Rung` in the name: 135 compiler, 32 library, 53 interpreter. That is 152 of 261 distinct stems. One more file carries `R2` (`IntLiteralWrapRepairR2`). None carries `batch`.
- A suffix names a rung letter within one batch only. `RungB` was introduced by 7 commits on 4 dates, 09-20 to 09-28 (`TryAtomicRungB`, `IntSemanticsRungB`, `FixedWidthOverflowRungB`, `ResultBoundsRungB`, `ClauseBindingRungB`), and 13 of the 29 suffixes were introduced by more than one commit.
- Path suffixes: `Walk` 13 stems, `Checker` 15, `Compiled` 13, `Link` 41.
- No new name contains `Test`. The median name is 17 characters, against the team's 11.

**Lengths.** Quartiles are q1 / median / q3.

| group | n | lines | code median | max |
|---|---|---|---|---|
| `tests/` plain | 29 | 33 / 52 / 77 | 44 | 202 |
| `tests/` XXX | 40 | 15 / 19 / 25 | 14 | 37 |
| compiler `.fss` plain | 59 | 18 / 24 / 34 | 21 | 170 |
| compiler `.fss` XXX | 75 | 14 / 17 / 23 | 12 | 44 |
| library `.fss` | 14 | 51 / 66 / 79 | 26 | 244 |
| `.test` XXX | 75 | median 3 | — | — |
| `.test` plain | 96 | 2 / 4 / 5 | — | — |

Largest files (lines / assertions):
- `library_tests/IntegralOpsRungN.fss` 244 / 97
- `tests/FlatTowerRungF.fss` 202 / 72
- `compiler_tests/IntSemanticsRungB.fss` 170 / 83
- `tests/IntSemanticsRungI.fss` 164 / 101
- `tests/ExclusionRemainderRungH.fss` 112 / 65
- `tests/PowChooseLcmRungE.fss` 111 / 50

**Checks per file.**

| group | sum | q1 / median / q3 | max | files with no check | files printing PASS |
|---|---|---|---|---|---|
| `tests/` plain | 718 | 6 / 12 / 36 | 101 | 0 | 23 of 29 |
| `tests/` XXX | 68 | 1 / 2 / 2 | — | 0 | 40 of 40 |
| compiler plain `.fss` | 242 | 0 / 2 / 4 | — | 18 of 59 | 40 of 59 |
| compiler XXX `.fss` | 92 | median 1 | — | 14 of 75 | 59 of 75 |
| library plain | 274 | 3 / 8 / 25 | — | — | — |

13 of the 29 plain interpreter tests have 20 or more checks, and their median is 2 top-level functions (q3 5).

**The `.test` forms.**
- Every file names one program, except one that names two. None has a header or a comment.
- Plain: 53 link+run, 39 link-only (`*Link.test`), 4 compile-only.
- XXX: 40 compile-only, 34 `run` with no `link`, 1 link-only.

Check keys per file:

| key | files |
|---|---|
| `run_out_contains` | 73 (30 of them `=REACHED`) |
| `compile_err_contains` | 27 |
| `run_out_equals` | 16 (30% of link+run, against the team's 47%) |
| `run_out_does_not_contain` | 11 |
| `compile_exception_contains` | 10 (compiler crashes such as "Not yet implemented") |
| `run_out_WIcontains` | 9 (the key was implemented in the harness by `a0fcf0a96`, 09-19) |
| `run_err_contains` | 5 (`VerifyError`, `ClassFormatError`) |
| `compile_err_equals` | 2 |

**Comments and citations.** Of the 223 new `.fss`/`.fsi` files:
- 0 have an Oracle header. `8bc7a164e` (09-21) removed the header from 54 revival files, 541 lines.
- 207 cite an `explorations/` path, mostly as the first line (`(*) explorations/compile-ladder/rung-…/REPORT.md` or `(* See …/REPORT.md *)`). That is 44 distinct paths, all present at HEAD: 30 are `REPORT.md`, 3 `RECORD.md`, and 12 files point at a `climb-batch-*` record.
- Beyond that pointer, provenance sits in assertion message strings:
  - ledger rows: 91 files, 489 occurrences, 72 distinct rows (median 1 row per citing file, max 5);
  - `.tex` citations: 142 files, 827 occurrences (median 1 `.tex` file per file, max 5);
  - `POSITIONS`/`FACTS`: 21 files, 155 occurrences (for example "answer 8 (POSITIONS 2026-09-26)");
  - "rung" in prose: 8 files.
- Assertion messages: 1,339 `assert` calls, 1,325 with a message, median message 46 characters (q3 75, max 250). 974 of them (73%) cite a row, a `.tex` line, POSITIONS, FACTS or a numbered answer. The team's figures are 3,292 calls, median 18 characters, 0 citing.

**Maintenance after landing.** 24 later commits edited 111 revival test files, in 171 file edits, +663 / −1,206 lines:
- 582 of the 663 added lines equal a deleted line once the `.tex` line numbers are masked, so only a citation's line number moved. The largest cases are the specification commits `581356f32` (131), `17c6052bb` (132), `21c91d8e4` (161) and `f54ffac90` (106).
- 541 of the deletions are the header removal.

**XXX share and the link-and-run pairs.** XXX is 40 of the 69 new interpreter tests (58%) and 75 of the 171 new compiler `.test` (44%; 57% leaving out the Link companions).
- The revival's XXX form is a positive program: it prints `REACHED`, exercises the construct, asserts, and prints `PASS`. 34 of 40 interpreter and 43 of 75 compiler XXX programs print REACHED. The interpreter harness does not read REACHED.
- The same form serves known gaps and expected refusals; for example, `XXXNatBeyondNN32Walk` expects walk to refuse a size beyond NN32.
- XXX applies to every command in a `.test`, so a compiled run expected to fail is split in two:
  - `XXXFoo.test` holds `run` and `run_out_contains=REACHED`;
  - `FooLink.test` holds `tests=XXXFoo` and `link`.
- There are 41 such companions: 34 beside an XXX run test and 7 left beside tests since promoted. The first was on 09-20 (`d98024425`), and the shape was named as a precedent in `climb-batch-3/RECORD.md:128`.

**Three revival tests, quoted briefly.**
- `tests/PowChooseLcmRungE.fss` (plain, 111 lines, 50 checks): first line `(*) explorations/compile-ladder/rung-size-range/REPORT.md`; then `assert(overflows(fn () => two^31), "ZZ32 2^31 throws IntegerOverflow; basic-integers.tex:527, opr-overview.tex:154-155")` and so on; it ends `println("PASS")`.
- `tests/XXXNatBeyondNN32Walk.fss` (XXX, 17 lines): `println("REACHED")` / `r = size64(Box[\4294967296\](0))` / `println("… read as " || r)` / `println("PASS")`, under `(*) explorations/compile-ladder/rung-size-range/REPORT.md`.
- `compiler_tests/XXXTaskArmLocalSlot.test` (`tests=XXXTaskArmLocalSlot` / `run` / `run_out_contains=REACHED`), with `TaskArmLocalSlotLink.test` (`tests=XXXTaskArmLocalSlot` / `link`). The program opens `(* See explorations/compile-ladder/climb-batch-6.5/RECORD.md. *)`.

### 3. Measured differences, with examples

| measure | team | revival |
|---|---|---|
| Oracle header | every file | none (removed 09-21) |
| name | topic, often `…Test`, numbered series | topic plus `Rung<X>` in 220 of 411 files; the letter repeats across batches |
| XXX meaning | negative program; 1 of 55 prints PASS; compiler XXX = exact diagnostic golden (222 of 224) | positive program with REACHED/PASS (40 of 40 print PASS); compiler XXX: substring or exception keys (2 of 75 exact); 34 failing-run tests |
| XXX share | `tests/` 14.5%, compiler `.test` 80% | `tests/` 58%, compiler 44% |
| test units per `.test` | 208 programs in 57 plain files; `.test` median 14–18 lines | 1 program per file; median 3–4 lines; 41 Link companions (team: 0) |
| where the check lives | `.test` golden output (47% `run_out_equals`); 35% of interpreter tests have no check | in the program: assertions plus PASS; `run_out_equals` in 30% |
| interpreter code median | 17 lines, checks median 0 | 44 lines, checks median 12 |
| provenance | none; comments state intent or expected output | 207 of 223 point to an `explorations/` record; 73% of assertion messages cite ledger rows, `.tex` lines, POSITIONS or FACTS |
| upkeep | — | 582 of the 663 lines re-edited after landing only re-number a `.tex` citation |

Batch 6.5b, as a check on the record:
- `postmortem-2026-09-29/measures-6.5b.md` gives the tests as 50 files, +713 −48, 4 renamed.
- Git (`-M 382b9fe7f e3214cbf1`) gives 50 files, +607 −52, 5 renames. The per-suite lines in that same record (+374 −39, +211 −13, +22) match git and sum to +607 −52.

**Edits to the team's own tests.** There are 43 files, +299 −282, in 8 commits. No team file was deleted, and 39 of the 43 are line-for-line respellings.

| commit | date | what changed | where the approval or record is |
|---|---|---|---|
| `1bd8d3ad1` | 09-17 | `library_tests/MaybeTest9.fss` −4: a private `trait Equality` deleted | `FACTS-history.md:124`; no POSITIONS entry found |
| `6a63980bb` (repair R2) | 09-19 | `Integer3`, `Integer4` (radix numerals), `IntegerChoose2` (+2 −1) | commit message: rows 317, 325-328; no POSITIONS entry found |
| `d6faad28f` | 09-24 | `RangePrototype` 2/2 | FACTS:113 |
| `ab914b6e0` (batch 5 rung D) | 09-26 | `intPrim`, `longPrim`, `HeapTest`, `QuickCheckTest`, `ReflectiveQuickCheckTest`, `UnsignedTest` (54/54), wraps respelled with ∔ ∸ ⨰ | POSITIONS:80 (2026-09-26), POSITIONS:98; FACTS:117 |
| `d846e3644` (batch 6 rung F) | 09-27 | 21 `tests/` files, 85/85 | POSITIONS:117, Q1 "A"; FACTS:118 and `climb-batch-6/RECORD.md:213` say 89 lines |
| `917bb7b32` (rung O) | 09-27 | `intPrim` +10 and `longPrim` +10 (new overflow assertions citing row 379), demo `HeapShakedown` 1/1 | FACTS:115-117, row 427 |
| `f3b62bc83` (batch 7 rung A) | 09-28 | `fill`→`tabulate` in 4 tests and 9 demos, 40/40 | FACTS:141, answer 10, row 247 |
| `3be1fecd7` (batch 7R rung J) | 09-28 | `RangePrototype` 85/85 | POSITIONS:128; FACTS:120 |
