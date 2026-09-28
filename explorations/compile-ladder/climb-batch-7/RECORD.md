# Climb batch 7: the gather's record

Written at the gather stage of climb batch 7 (2026-09-28), the first run of `explorations/coordinator/CLIMB-BATCH-7.md` (rungs H, A and B), on `main` from the base `ff1649cea` (run `wf_8a018276-f71`). `main` was at `4a2b9385c`, 52 coordinator commits above the base. They touch only `explorations/`: among them `coordinator/CLIMB-BATCH-7R.md` and `CLIMB-BATCH-N.md` with their reviews, `INDEX.md`, `PLAN.md`, `POSITIONS.md`, `postmortem-2026-09-19/held-list.md`, `compile-ladder/plan-7r/`, `compile-ladder/plan-n/`, `reviews/decision-d-diff/` and `reviews/inference-rule-shadow/`. None is a rung's file, no file outside `explorations/` differs from the base, and `FACTS.md`, the ledger and the handover are as the base has them. Rungs H, A and B were approved, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`.

**Preconditions.** `ff1649cea` is an ancestor of `HEAD`. `git status --porcelain` was not empty: it listed two untracked directories of Python bytecode, `explorations/compile-ladder/plan-n/manifest/__pycache__/` and `explorations/perf-probes/prelude/distance-triage/__pycache__/`, left by the scripts beside them, and no modified tracked file. The gather left both as they were, since another agent may be using them, and staged every commit by an explicit list, so neither is in a commit.

**Citations of `POSITIONS.md` and `PLAN.md` by line.** Since the base, `POSITIONS.md` changed one line in place (`:128`, the numerics plans) and no line moved, so the rungs' citations of it (`:44`, `:109`, `:114`, `:120`, `:128`) say what they are cited for. `PLAN.md` changed since the base, and this gather adds entries to it: rung H's `PLAN.md:160` is the parked line "The closure accommodation he approved on 09-21, which the flattening makes moot" (`:155` on `4a2b9385c`), which the gather's entry for the `AnyIntegral` clause names by its words (rung H, below).

## The order the rungs were applied in

B, then H, then A: ascending order of each rung's lowest edited line in the files two or more rungs share, worked out from `git diff ff1649cea...<branch>` for each branch before anything was applied. The shared files are `Library/FortressLibrary.fsi` and `.fss` (all three rungs) and `Library/List.fss` (A and B). The lowest edited lines: B at `FortressLibrary.fsi:37` (`fail`), `.fss:54` and `List.fss:177`; H at `FortressLibrary.fsi:121` (`TotalComparison`) and `.fss:159`; A at `List.fss:462` (`mapArr`), `FortressLibrary.fsi:1360` (`ReadableArray`'s `fill`) and `.fss:1954`. Every shared file gives the same order, which is the order the batch record expected (`explorations/coordinator/CLIMB-BATCH-7.md` section 4).

The hunks interleave, so no order spares every landed citation.
- B's ten hunks each replace one line with one line, so B moves no line.
- H adds 5 lines to the api at `.fsi:127-131`, above every hunk of A's, and 17 to the component: 6 at `.fss:170-175` and 1 at `:1402`, above every hunk of A's, and 10 at `andCondCombine` (`:4546-4556` on H's branch), below them. So H's commit moves B's citations of `.fsi` lines below `:126` by 5 and of `.fss` lines below `:169` by 6 (7 below `:1395`).
- A adds 5 lines to the api and 10 to the component between `ReadableArray` and `array3`, so A's commit moves H's citations below its hunks (`RelationalPredicateCondition` in the api, `FilterGenerator2` and `andCondCombine` in the component) and B's (the big operators, among them).
- B's and H's folds are correct at their own commits. A's record was written on its branch and is re-anchored by symbol in A's fold.
- Each later commit re-anchors the citations of the earlier folds it moves, in `FACTS.md`, the ledger, the handover, `PLAN.md` and the gated tests' assert messages. The rungs' own `REPORT.md`, `record.md` and `SKEPTIC.md` keep the lines of their branches, and each rung's section below gives the offsets that map them onto `main`.

## Final row numbers

Assigned in manifest order (H, A, B) from 456, the first free row at the launch (`LEDGER_FROM`):
- H: provisional 456, 457 and 458 are 456, 457 and 458; provisional 459 is folded into row 407 as a note (its skeptic's correction 2); provisional 460 and 461 are 459 and 460; its skeptic's recommended rows 1, 3 and 4 are 461, 462 and 463. Its recommended row 2 is the defect that B's skeptic also recommended, opened once, as row 473.
- A: provisional 456 and 457 are 464 and 465; its skeptic's recommended rows 1, 2 and 3 are 466, 467 and 468.
- B: provisional 456, 457 and 458 are 469, 470 and 471; its skeptic's recommended rows 1 and 2 are 472 and 473, and its recommended row 3 is a note on row 447.

B lands first, so its commit adds rows 469 to 473 after row 455, and the table reads 455 then 469 until H's commit inserts 456 to 463 and A's commit inserts 464 to 468, each in numeric order before B's. Each commit that adds rows re-anchors the two line citations of the `FACTS.md` entry "The ledger" (the worklist and the counts by kind move down by the rows added). Row 473 is opened in B's commit because B lands first; H's commit appends its skeptic's evidence to it.

## Rung B (`rung-result-bounds`)

**Inherited from the branch.** Nine commits, `9a402fe32` to `b5d76b5b4`:
- the new test passing before the edit, the pre-edit checker count, the walk bound probe, the ladder subset before and the comparison scripts (`9a402fe32`);
- the recorded failure, the distance stage before the edit under both settings (`d498c574c`);
- the edit (`97fd001cf`);
- the recorded pass and the measurements after it (`0d8fa53b7`);
- the comparison, the second distance run, the site comparisons and the points for Pavol (`d4c0be7c7`);
- `record.md` (`bccad9486`, `e72dd103e`);
- the skeptic's judgement and its probes (`55a93c127`, `b5d76b5b4`).

`record.md` and `SKEPTIC.md` were on the branch, byte-identical to the structured result's `recordText` and `skepticText`. `REPORT.md` was not, because the harness refused the worker's write of it. There is no `JUDGE.md` and no first skeptic round.

**Written at the gather.** `explorations/compile-ladder/rung-result-bounds/REPORT.md`, from the worker's `reportText`, byte for byte; then the gather's edits below.

**Applied.** `git apply --3way --index` of `git diff --binary ff1649cea...wip/rung-result-bounds` applied without a conflict; its only warnings were whitespace in captures (30 lines, the captures' own trailing blanks). The index was then compared with the branch on every path of the patch, and all 127 paths match.

**Corrections, all five closed.** Each was made at the gather, in the rung's own files.
1. **The false "no earlier table" claim is gone.**
   - `REPORT.md` section 6.1 now cites, for the three sites (V2 at `FortressLibrary.fss:2710` and `:2232`, BR at `:130`), the tables on file that report them: `explorations/perf-probes/prelude/switch-over-distance-flat/errors-walk.tsv:1472` and `:1569`, `distance-triage/classes-compile.txt:637` and `:723`, `compare-BPANY-walk.txt:47`, `compare-R421-walk.txt:113` and `compare-L0-walk-num.txt:172`, with the skeptic's `probes/skeptic/three-sites-on-file.txt`. Each line was opened at the gather and says what it is cited for.
   - The paragraph "Caused rather than unmasked" says the stop is not met.
   - Section 12 no longer lists the three sites.
   - `probes/for-pavol.txt` drops that point, and its point 4 becomes 3.
   - `record.md`'s opening paragraph lists one stop met, the line count, and says the second was not met. Its FACTS entry reads "all 9 of this rung's new variation sites are shown by distance tables on file before the edit".
   - The structured result's `stopsMet` is not a file; the batch record's list of stops met for B is the line count alone (below, "Stops").
2. **The sibling slip is named.**
   - `REPORT.md` section 3's "Row 421's shape" names `Library/FortressLibrary.fss:3195`: the component's unary `BIG MAX` declared `(T,T)` against the api's `T` (`Library/FortressLibrary.fsi:1915`), with R4 at `:3196` before and after. It is left, with row 472 as its home, and the paragraph now counts four sites of the slip.
   - Row 421's closing note in `record.md`, and so in the ledger, says the same in place of "remains in two copies no build or gate reads".
   - Section 10's table gains its row.
3. **The failure mode is recorded.**
   - `REPORT.md` section 3's sentence on `Zilch` now reads that the type is the same and the devices are not. It cites `probes/skeptic/SkStopLocal.diff.txt` (the `VerifyError`), `SkStopWritten.diff.txt`, `SkZilchFail.diff.txt` and `SkZilchLocal.diff.txt`, and `Specification/basic/types-vals-vars.tex:514-515` (programmers must not write `BottomType`). Each was opened at the gather.
   - Section 10's table gains the defect's row, a note on row 447.
   - `record.md`'s FACTS entry ends with the failure mode, and row 447 carries the skeptic's note (recommended row 3).
4. **The library's own instance of row 470 is named.** `REPORT.md` names the unary `opr BIG <|[\T\] g:Generator[\T\]|>` (`Library/List.fss:179-180`, `Library/List.fsi:110`), whose body passes its `Any`-bounded `T` to the `Object`-bounded nullary, with `probes/skeptic/SkNullaryVar.edit.check.txt`. It is named in section 12's first point and in the summary's point for Pavol, and also in `probes/for-pavol.txt` point 1, in row 470's text and in the FACTS entry.
5. **The problem line's citations are complete.** The provenance block's problem line cites `explorations/perf-probes/prelude/distance-triage.md:134` for R1 32 and R4 18, and `explorations/reviews/numerics-plan-coordinator/measure-C.md:46` for the 21 calls of `fail`. Both lines were opened at the gather.

**Recommended rows, each opened.** The skeptic's three:
- **The component's unary `BIG MAX`** declared `(T,T)` against the api's `T`: opened as row 472, with `probes/skeptic/distance-sites-skeptic.txt:20` and `SkBigMinMax.walk-edit.txt:3`.
- **`BIG MINMAX` stopping walk for every element type**: opened as row 473, with `probes/skeptic/SkBigMinMax.fss` and its base and edit captures. Rung H's skeptic recommended the same defect; its evidence is appended to the row in H's commit.
- **The naked-`T` form of row 447**: opened as a note appended to row 447, with the skeptic's five captures and the library's value-position calls of `fail`, each opened at the gather (`Library/FortressLibrary.fss:1423`, `:1453`, `:1499`, `:2504`).

**Stops.** One was met, on its letter only: ten lines edited where the batch record counts eight. They are the ten the record's section 4 and the decision name, so the stop is lifted by the decision of 2026-09-27 (POSITIONS, the numerics plans), and it is listed for his review. The skeptic found the second stop the worker listed not met (correction 1).

**Folded.**
- `FACTS.md`: the record's bullet "The written bound `Object` on the three result-only parameters ...", after the last entry of "The checker and the one library" (a decision, below). The record's sentence "It landed as climb batch 7's rung B" is appended to "The distance to the switch-over by root cause", after its sentence on rung N7.
- The ledger:
  - row 421's status is now "NEGATIVE-VERIFIED (at `ff1649cea`), POSITIVE-VERIFIED (the fix, `<short hash>`)", and its note is appended;
  - notes are appended to rows 309 and 447;
  - rows 469-473 are added after row 455;
  - "The ledger" entry of `FACTS.md` is re-anchored (`:783` to `:788`, `:643` to `:648`).
- The handover: one paragraph, at the end of its first section.
- `PLAN.md`: the items for Pavol (below).

**A decision of the gather: where the FACTS entry goes.** `record.md` asks for the bullet right after "Keeping the expected type at a call written `f(x)` is four one-token edits ...". The gather's rule puts a new entry after the last entry of its area's section. So the bullet follows climb batch 6 rung R's entry, the last of "The checker and the one library". The other place, beside the numerics plan's measurements of 2026-09-27 that it completes, would keep the subject together, but the rule settles it; the bullet names the entry it follows up in its own text.

**Row numbers in the rung's files.** The provisional 456, 457 and 458 are 469, 470 and 471. They were corrected in `REPORT.md` (section 2's "row 458", section 6's two row notes, section 10's table, section 12 and the summary), in `record.md` (its opening, its FACTS entry, row 421's note, the three rows and the handover line) and in `probes/for-pavol.txt`. `SKEPTIC.md` keeps the provisional numbers, with a note line under its title that maps them. No other probe cites a provisional row.

**Items for Pavol, as `PLAN.md` holds them** (the ids are the workflow's):
- **B.worker.1 and B.skeptic.1**: the comprehension operator's bound. Item 20, in a new group "Before batch N", since that batch's inference rule works on the class the bound moved `List.fss:150` into (row 425). The default on record is the line as landed; neither the rung nor its skeptic recommends a way.
- **B.skeptic.2**: `fail`'s bound meets row 447 at the switch-over. This is item 18's point (row 447), so item 18 gains one sentence with the skeptic's evidence rather than a new entry.
- **B.worker.2** (the line count) and **B.worker.4** (the rows opened): two lines under "Off the path, parked".
- **B.worker.3** (the three variation sites) is withdrawn by correction 1 and has no entry.

**Offsets onto `main`.** B's own files cite the base's lines, and B moves none. H's commit and A's commit move some of them; the offsets are in their sections below.

**Placeholders.** Every `<short hash>` that rung B's commit adds names B's commit:
- the six in `record.md`, where the worker wrote `<B>`;
- its `FACTS.md` bullet and its sentence appended to "The distance to the switch-over by root cause";
- row 421's status and note, and the notes on rows 309 and 447;
- its handover paragraph.

**For the gate.** B adds one file to `ProjectFortress/tests/`, `ResultBoundsRungB.fss`, which passes. The checker count by B's measurement alone is 62, the crash row `none`. The distance stage is 1,747 to 1,337 under `any`.
