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

## Rung H (`rung-exclusion-remainder`)

**Inherited from the branch.** Ten commits, `dbee29285` to `029fbc1ae`:
- the checker count before the edit (62), the guard test, the `LEXICO` expected failure and the drivers (`dbee29285`), before the library edit;
- the edit, 62 to 44 (`8ebb1977a`);
- `andCondCombine`'s clause bindings, the first edit pass, the harness runs, and the values and typecase probes (`ab0f75fbb`, `aca723f90`);
- the ascribed `else` branches, base B's pass, the three-pass comparison and the final distance table (`b264fc0ce`);
- the second distance run on the untouched library, the variation between runs, the cleared copies and the lists (`192d6343e`, `1b7c969e9`, `dd51e9b0f`, `81946b524`);
- the skeptic's re-runs, variant counts and differential probes (`029fbc1ae`).

No `REPORT.md`, `record.md` or `SKEPTIC.md` was on the branch: the harness refused the worker's writes, and the skeptic returned its judgement as text. There is no `JUDGE.md` and no first skeptic round.

**Written at the gather.** `explorations/compile-ladder/rung-exclusion-remainder/REPORT.md`, `record.md` and `SKEPTIC.md`, from the structured results' `reportText`, `recordText` and `skepticText`, byte for byte; then the gather's edits below.

**Applied.** `git apply --3way --index` of `git diff --binary ff1649cea...wip/rung-exclusion-remainder` applied without a conflict; its only warnings were whitespace in captures. Compared with the branch on every path of the patch, 164 of the 166 paths match. The other two, `Library/FortressLibrary.fsi` and `.fss`, equal the branch's files plus exactly B's ten lines: `git diff --cached wip/rung-exclusion-remainder` over the two files shows B's lines and nothing else. H's and B's hunks are separate, as the batch record's section 4 expected.

**Corrections, all eight closed.** Each was made at the gather, in the rung's own files; every citation added was opened first.
1. **The second changed walk output.**
   - `REPORT.md` section 1 now says two behaviours change outside every gated test, the second being `BIG MIN` and `BIG MAX` over total comparisons (`probes/skeptic/SkCmpBig-walk-edit.txt:5-7`, `SkCmpBigMin-walk-edit.txt:4-6`; row 461). Section 18 lists it as the second changed walk output, and so does `probes/stops-met.txt` point 2.
   - D1 gains the measured cost and a third alternative not taken, the library's device `StandardMinMax[\TotalComparison\]`, with the skeptic's measurements: count 44; cleared 192, which is 190 and row 421's two; distance 1,672, six of them row 421's, which rung B removes; walk's values the base's (`probes/skeptic/variant-counts.txt`, `distance-variant-minmax.txt`, `SkCmpBig-walk-minmax.txt:4-5`). D2 names the device among its alternatives.
   - The row is opened as 461. The device is not taken, since the choice is Pavol's (item 22 of `PLAN.md`), so no home-1 assertion is owed.
   - `probes/for-pavol.txt` gains the point as its item 9.
2. **Provisional row 459 is folded into row 407**, as a note appended to row 407 with the capture `probes/integral/self-MicroGptFlatCheck.txt:22-60`. The other provisional rows are renumbered: 460 to 459 and 461 to 460; 456 to 458 keep their numbers. The citations are fixed in `REPORT.md` (sections 1, 5, 6, 7, 15 and 17), in `record.md` (its gather notes, the FACTS appends and entry, the rows and the handover line) and in `probes/for-pavol.txt`. The structured lists are routed below with the final numbers. `SKEPTIC.md` carries a note line under its title that maps them.
3. **The clause-binding form is corrected**, in the new FACTS entry's title and body, in row 460 and in `REPORT.md` section 15 (and in `probes/for-pavol.txt` point 6):
   - it checks in the compiled checker and runs under walk, but the compiled run cannot read the binding (row 351; `probes/skeptic/SkTcBind-compiled.txt:6-7`);
   - the specification's grammar has no per-clause `Id :` form (`Specification/basic/expressions/typecase.tex:64-72`);
   - the implementation's has it and takes `typecase Expr of`, with no binding form (`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:43`, `:237-251`; `ProjectFortress/astgen/Fortress.ast:1661-1664`).

   Row 351 carries the appended note that `andCondCombine` (`Library/FortressLibrary.fss:4550-4552`) is the library's second site of its `typecase` half, beside `cast`.
4. **`traits.tex:236-246` is cited as the `\note` it is**, which a release build renders as nothing (`Specification/fortress/fortress.tex:35-36`), beside the rendered rule, the `Molecule` example (`Specification/basic/traits.tex:262-279`), and `:160-162` for the ellipsis. The places are `REPORT.md` sections 6 (the paragraph and the ellipsis row of the table), 15 and 17, row 459's specification cell, the FACTS append on the tower closure, and `probes/for-pavol.txt` point 1. The structured `specCitations` is not a file.
5. **The team's 2008 clause** on `Integral[\I\]` is a row of section 6's table, measured at 48 with five "does not extend Integral[\I\]" errors (`probes/skeptic/variant-counts.txt:3-30`). Row 459's claim and reproducer cells, the FACTS append on the tower closure and `probes/for-pavol.txt` point 1 carry it too.
6. **"SQCAP is not on batch 8's list"** stands only in the structured list (H.worker.3), not in the capture. `probes/for-pavol.txt` point 3 now says that both errors are batch 8's: `SQCAP` in the Meet Rule class (`explorations/perf-probes/nat/triage.md:62-63`) and `isLeftZero` among the one-line slips (`explorations/coordinator/CLIMB-BATCH-7.md:62-63`). `PLAN.md`'s entry says the same.
7. **Row 456's specification cell** shows the grep (`grep -n 'CMP\|opr <\|OPR{<}' Specification/advanced-lib/comparison.tex` finds only `:14` and `:120`). It says why `Specification/advanced-lib/algebraic-constraints.tex:294-302` does not settle the row: the specification's `Comparison` is not declared an order (`comparison.tex:134-139`), while the library's extends `StandardPartialOrder[\Comparison\]`. `REPORT.md` section 15 says the same.
8. **Row 341 is cited** in row 459's notes beside rung F's D4, for the sketch's and the open clause's load refusals, and in `REPORT.md` section 6's table and the FACTS append on the tower closure.

**Recommended rows, each opened.** The skeptic's four:
- **`BIG MIN` and `BIG MAX` over total comparisons**, caused by the rung: opened as row 461, with the skeptic's base, edit and variant captures (correction 1).
- **`BIG MINMAX` failing for every element type**: the defect rung B's skeptic also recommended. It is opened once, as row 473 in B's commit, which lands first; this commit appends H's skeptic's evidence to row 473 as a note (`SkBigMinMaxInt-walk-edit.txt:3-5`, `SkCmpBigMinMax-walk-base.txt:4`, `SkCmpBigMinMax-walk-edit.txt:4`).
- **Walk and the compiled prelude disagreeing on a total comparison against `Unordered`**: opened as row 462, with `SkCmpTable-walk-edit.txt:12-14` and `SkCmpTable-compiled.txt:15-17`, and the two library lines opened (`Library/FortressLibrary.fss:166-167`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1530`, `:1537`).
- **The compiled path's `__cond`**: opened as row 463, with `SkMaybe-compiled.txt:5`, the desugaring opened at `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:245-280`, and `Specification/basic/expressions/if.tex:29-34`, `:49`.

**Stops.** Two were met, both reversible and landed under the decision of 2026-09-27 on the stops a batch record reserves. The first is a new checker error the distance stage shows as caused rather than unmasked (the rung's own list, `probes/stops-met.txt` point 1). The second is a changed walk output, met twice outside the comparison: `relational(p1 ANDCOND p2)`, and `BIG MIN` and `BIG MAX` over total comparisons (correction 1). The skeptic confirms both, and neither holds the push.

**Folded.**
- `FACTS.md`:
  - the record's three appends: to "The compiled checker's exclusion rule is the designers' ..." after its sentence on the flat library's 18 exclusion errors, and to the ends of "The true distance to the switch-over" and "The tower closure of `02d09a39f` has no spelling the compiler's checker accepts";
  - its new entry "The compiled checker does not narrow a `typecase` variable in the shorthand form ...", after the last entry of "The checker and the one library" (now rung B's), with correction 3 in it.
- The ledger:
  - rows 456-460 from the record and rows 461-463 from the skeptic, added in numeric order between row 455 and row 469;
  - notes appended to rows 407, 430, 351 and 473;
  - "The ledger" entry of `FACTS.md` re-anchored (`:788` to `:796`, `:648` to `:656`).
- The handover: one paragraph, after rung B's.
- `PLAN.md`: items 21 and 22, five parked lines, and the parked line on the closure accommodation, which gains the sentence that the flat library does not make it moot.

**Decisions of the gather.**
- **The placeholder.** H's record carries none. The four FACTS texts it folds gain `<short hash>` beside "climb batch 7's rung H", in `record.md` as in `FACTS.md`, so that the commit stage names the landing there as it does for A and B. The other way, leaving them without a commit, would be the only batch-7 FACTS text with no landing named.
- **Where the new FACTS entry goes.** The record asks for it "beside the two above". The gather's rule puts it after the section's last entry, which is where it goes.
- **Where the `TotalComparison` question goes.** Item 22 is under "Before batch 7b", since rung L of batch 7b works on the headers of `StandardMin` and `StandardMax`, and the device of the question's option (b) sits beside them. Batches 7R and N touch neither.

**Re-anchored in this commit.** H's commit moves B's landed citations, since H adds 5 api lines after `.fsi:126` and 6 component lines after `.fss:169` (7 after `:1395`). Each was mapped through the staged diff and its line's text compared before and after:
- `FACTS.md`, rung B's entry: `.fsi:209-210` to `:214-215`, `.fss:260-261` to `:266-267`, `.fss:3216` to `:3223`, `.fsi:1927` to `:1932`.
- Row 421's note: `.fss:3195` to `:3202`, `.fsi:1915` to `:1920`, and the R4 site now named as its body, `:3203`, with the captures' `:3196` marked as the base's numbering.
- Row 447's note and `PLAN.md` item 18: `.fss:1423`, `:1453`, `:1499` and `:2504` to `:1430`, `:1460`, `:1506` and `:2511`.
- Row 472: `.fss:3195` to `:3202`, `.fsi:1915` to `:1920`, `:3196` to `:3203`. Row 473: `:3208` to `:3215` (the captures' `:3208` marked), `:3198` to `:3205`.
- The assert messages of rung B's `ProjectFortress/tests/ResultBoundsRungB.fss` (messages only): `FortressLibrary.fsi:201` to `:206` (two) and `:203` to `:208` (two).

H's own citations were correct as written, since B moves no line.

**Offsets onto `main` for B's own files.** B's `REPORT.md`, `record.md` and `SKEPTIC.md` cite the base's lines. After this commit, read `FortressLibrary.fsi:N` for N from 127 as N+5, and `FortressLibrary.fss:N` as N+6 for N from 170 to 1395, N+7 from 1396 to 4538, and N+17 from 4540. A's commit adds its own offsets (its section).

**Items for Pavol, as `PLAN.md` holds them:**
- **H.worker.1, H.skeptic.2 and H.worker.7**: `AnyIntegral`'s clause, one point, item 21, in a new group "Before batch 7R". The ways are the five library shapes and the two outside the library, with walk's overflow on `comprises I` (row 407) as the Java way. On record is his approval of 2026-09-21 of the checker's accommodation, parked as moot, which H measured not moot. The parked line on it points to item 21.
- **H.skeptic.1**: `TotalComparison`'s shape, item 22, in a new group "Before batch 7b, raised by climb batch 7". The landed shape is (a); there is no default on record.
- **H.worker.2**: the parked line "Climb batch 7's rung H's repair of the `Condition` site ...".
- **H.worker.3 and H.skeptic.3**: one point, the stop on new distance errors, the parked line "Climb batch 7's rung H met the stop ...", corrected per correction 6.
- **H.worker.4 and H.worker.5**: one point, the comparisons' two value defects, the parked line "Two defects in the comparisons' bodies under walk ...".
- **H.worker.6**: the parked line "The compiled checker does not narrow a shorthand `typecase`'s variable ...".
- **H.worker.8**: the parked line "Climb batch 7's rung H adds two files to `ProjectFortress/tests/` ...".

**Placeholders.** Every `<short hash>` that rung H's commit adds names H's commit:
- its three FACTS appends and its new FACTS entry, and the same four in `record.md`;
- the notes on rows 407 and 351;
- its handover paragraph.

**For the gate.** H adds two files to `ProjectFortress/tests/`, `ExclusionRemainderRungH.fss` (passes) and `XXXLexicoUnorderedRungH.fss` (an expected failure, shown red on a deliberate fix). The checker count by H's measurement alone is 44, the crash row `none`, and the distance stage 1,661.
