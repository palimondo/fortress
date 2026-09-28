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

## Rung A (`rung-tabulate`)

**Inherited from the branch.** Thirteen commits, `0b908ebb4` to `a9399b8b8`:
- the new test and the recorded failure on the base (`0b908ebb4`), before the library edit;
- the rename with `fill` redeclared in the leaves, and the recorded pass (`77b429e01`);
- the comparison scripts, the ladder subset and the specification build's diff (`a997fc42c`);
- the declarations moved to the diamond's meet (`b11534cd1`), the base runners' `FORTRESS_AUTOHOME` (`08837e8a3`), the distance stage after the edit (`e6279bc82`);
- the specification's final build and the lists for Pavol (`42c7496a1`), the second distance run on the base (`706d9528c`), the demos (`742a80846`), the three-pass comparison (`15e6e1c19`) and the microGPT checks (`8300fb985`);
- the skeptic's judgement (`04b1eb643`, `a9399b8b8`).

`SKEPTIC.md` was on the branch, byte-identical to the structured result's `skepticText`. `REPORT.md` and `record.md` were not, because the harness refused both of the worker's writes. There is no `JUDGE.md` and no first skeptic round.

**Written at the gather.** `explorations/compile-ladder/rung-tabulate/REPORT.md` and `record.md`, from the worker's `reportText` and `recordText`, byte for byte; then the gather's edits below.

**Applied.** `git apply --3way --index` of `git diff --binary ff1649cea...wip/rung-tabulate` applied every file cleanly, with no conflict. Compared with the branch on every path of the patch, 113 of the 116 paths match. The other three, `Library/FortressLibrary.fsi`, `.fss` and `Library/List.fss`, are the branch's files plus exactly B's and H's lines: the changed lines of `git diff ff1649cea HEAD` over the three files equal those of `git diff --cached wip/rung-tabulate` over them. The hunks are separate, as the batch record's section 4 expected.

**Corrections, both closed.**
1. `REPORT.md` section 9, D2, cites `Specification/basic/types-vals-vars.tex:434-437` for "arrow types never exclude". Opened at the gather, those lines read "An arrow type excludes any non-arrow type other than Any ... However, arrow types do not exclude other arrow types". The structured `specCitations` is not a file.
2. The doc comment above `ReadableArray`'s `tabulate` and `fill` now names `StandardMutableArrayType` and `ImmutableArray1` as the traits that define the two forms, in the same three lines of each file (`Library/FortressLibrary.fsi:1362-1364`, `Library/FortressLibrary.fss:1958-1960`). `REPORT.md` section 2 records the edit. The `.fsi` comment is rendered into Part IV, and the rebuilt PDF carries it (below).

**Recommended rows, each opened.** The skeptic's three:
- **The second initialization of an array element**, silently ignored under walk against the specification's footnote: opened as row 466. It cites `probes/skeptic/SkTwiceInit.fss`, `probes/skeptic/old-spelling.txt:56-63`, `ProjectFortress/LibraryBuiltin/NativeArray.fss:25-29` and the footnote at `Specification/advanced/parallelism-locality/arrays-distributed.tex:71` (its line with A's callout in), each opened.
- **`copy` refused at `StandardMutableArrayType` by the Meet Rule**: opened as row 467, with `probes/skeptic/copy-meet-refusal.txt:3-4`, `:28-29` and the Meet Rule for dotted methods (`Specification/advanced/overloading.tex:224`, `:338-346`).
- **`Generator22D`'s `rects` under walk**: opened as row 468, with `probes/skeptic/SkGen22D.fss`, `probes/skeptic/walk-base-edit.txt:79`, `:118` and `Library/Generator22D.fss:144-150`, opened.

**The stop the skeptic found met.** "A changed walk output": the demo `ProjectFortress/demos/mg.fss` now stops at `:20` instead of `:159`, with the same exit code (`probes/demos-compare.txt:4-13`). The worker's `REPORT.md` section 16 says no stop was met and counts the demo in its section 7 and row 464. The skeptic reads it as the stop, reversible and lifted by the decision of 2026-09-27 on the stops a batch record reserves, and this record follows the skeptic. The standing stops the worker names, a declaration gated tests use renamed and team test lines restated with their values, are lifted by answer 10. Nothing holds the push.

**Folded.**
- `FACTS.md`:
  - the record's bullet "`fill` takes a value and `tabulate` a function, both defined where the array diamond meets", after the last entry of "The library's arrays and algebra";
  - its italic notes appended to "The `fill` refusals, counted on the one library, and how each path treats the pair" and to "The true distance to the switch-over".
- The ledger:
  - row 247 closed: its status is now "NEGATIVE-VERIFIED (at `ff1649cea`), POSITIVE-VERIFIED (the fix, `<short hash>`)", and its note is appended;
  - notes are appended to rows 437 and 430;
  - rows 464 and 465 from the record and 466 to 468 from the skeptic are added in numeric order between row 463 and row 469;
  - "The ledger" entry of `FACTS.md` is re-anchored (`:796` to `:801`, `:656` to `:661`).
- The handover: one paragraph, after rung H's.
- `PLAN.md`: item 23 and four parked lines.

**Decisions of the gather.**
- **Row 247's status.** The record says the row is closed and gives no status text. The status follows the form used for row 421 in this batch and for batch 6's fixed rows. The other way, leaving "NEGATIVE-VERIFIED" with a "Fixed" note, would leave the status contradicting the note.
- **Row 467's class and specification cell.** The skeptic gave neither. Its class is "library gap vs spec", since the Meet Rule refuses the library's declarations, and its specification cell is the Meet Rule for dotted methods, which the gather opened.
- **The note "provisional" in H's test messages.** `ProjectFortress/tests/ExclusionRemainderRungH.fss` (five messages) and `XXXLexicoUnorderedRungH.fss` (two) cited "row 456 (provisional)" and "row 457 (provisional)". Both numbers are final, so the word goes, in the messages only and in this commit. H's commit should have carried it; the gather found it on the merged-tree run below and did not rewrite H's commit. The two tests were run again after the edit (below).
- **Left as the rung wrote it.** The skeptic's finding that needs no correction, the Appendix I entry's example "ivmap beside map" (`Specification/appendices/changes.tex:1050-1051`), is left. The skeptic allows a rewording and requires none, and the sentence is not false.

**Re-anchored in this commit.**
- **A's `record.md`**, written on A's branch, is re-anchored by symbol to `main`. H's commit, applied first, adds 5 api lines above A's lines and 7 component lines. The lines move from `.fsi:1360-1496` to `:1365-1501`, `.fss:2093-2100` to `:2100-2107`, `:2185-2192` to `:2192-2199`, `.fsi:1778` to `:1783`, `.fss:2936-2937` to `:2943-2944` and `.fss:2728` to `:2735`. Each line's text was compared on the branch and on the merged tree. Its opening paragraph says so.
- **A's commit moves B's and H's landed citations**: 5 api lines from `.fsi:1784` on, and in the component a net 10 lines from `.fss:2945` on. Each was mapped through the staged diff and its text compared:
  - `FACTS.md`, B's entry: `.fss:3223` to `:3233`, `.fsi:1932` to `:1937`.
  - `FACTS.md`, H's append on the exclusion rule: `.fss:4504`, `:4506`, `:4546-4556` to `:4514`, `:4516`, `:4556-4566`. H's typecase entry: `:4548-4556` to `:4558-4566`.
  - Row 421's note: `.fss:3202` to `:3212`, `.fsi:1920` to `:1925`, `:3203` to `:3213`.
  - Row 447's note and `PLAN.md` item 18: `.fss:2511` to `:2521`.
  - Row 472: `.fss:3202` to `:3212` (two), `.fsi:1920` to `:1925`, `:3203` to `:3213`. Row 473: `:3215` to `:3225`, `:3205` to `:3215`.
  - Row 458: `.fss:4504`, `:4506`, `:4546-4556` to `:4514`, `:4516`, `:4556-4566`. Row 460: `:4548-4556` to `:4558-4566`. Row 351's note: `:4550-4552` to `:4560-4562`.

**Offsets onto `main` for the rungs' own files.** The rungs' `REPORT.md`, `record.md` and `SKEPTIC.md` keep the lines of their branches, except A's `record.md` (above).
- **A's `REPORT.md` and `SKEPTIC.md`** cite the branch's lines, as A's section 2 says. Read `FortressLibrary.fsi:N` from 127 as N+5 and `FortressLibrary.fss:N` from 1396 as N+7; every A citation of those files lies in those ranges. Lines marked "at `ff1649cea`" are the base's.
- **H's files** cite H's branch. Read `FortressLibrary.fsi:N` from 1784 as N+5 and `FortressLibrary.fss:N` from 2945 as N+10. H cites nothing between.
- **B's files** cite the base. Read `FortressLibrary.fsi:N` as N+5 from 127 and N+10 from 1779; read `FortressLibrary.fss:N` as N+6 from 170, N+7 from 1396, N+17 from 2938 and N+27 from 4540. B's citations between `.fss:1954` and `:2937` (the variation sites `:2182`, `:2190`, `:2232`, `:2347`, `:2504`, `:2710`) lie among A's hunks and move by part of A's 10 lines; map them by symbol.

**Items for Pavol, as `PLAN.md` holds them:**
- **A.worker.1 and A.skeptic.1**: one point, D1's placement at the meet. The parked line "Climb batch 7's rung A put `fill` and `tabulate` where the array diamond meets ...", his to confirm; the landed shape is the default.
- **A.worker.2 and A.skeptic.2**: one point, D2's factory names. The parked line "Climb batch 7's rung A named the factories' function forms ...".
- **A.worker.3 and A.skeptic.3**: one point, D4's demos and `mg.fss:20` (row 464). The parked line "Climb batch 7's rung A respelled 32 lines of eight demos ...".
- **A.worker.4 and A.skeptic.4**: one point, Appendix I's introduction. Item 23, under "Before batch 7b, raised by climb batch 7", since batch 7b's rung S writes the next entries of that appendix.
- **A.worker.5 and A.skeptic.5**: one point, the arrays paragraph on `init`. The parked line "The paragraph after the specification's arrays figure ...".

**Rebuilt on the merged tree.** `./ant genSource` and then `./ant tex`, in `Specification/fortress/`, in the main tree with the three rungs applied. The logs are `explorations/compile-ladder/rung-tabulate/probes/build/gather-genSource.txt` and `gather-tex.txt`, each headed by its machine line; both read `BUILD SUCCESSFUL`, in 45 s and 41 s.
- The PDF was copied to `Specification/fortress.pdf`, byte-identical to the build's. It has 623 pages, as rung A's own build did.
- `fortress.log` has no `LaTeX Warning: Reference`, no "There were undefined references", no multiply defined label, no citation warning and no `! Undefined control sequence` (each counted 0). Its one line beginning "! " is inside a macro trace.
- The normalised text against the committed PDF (the base's, 621 pages) is `explorations/compile-ladder/rung-tabulate/probes/build/gather-vs-base-pdftotext-diff.txt`, 32 hunks, each with a cause:
  - 8 are A's specification text: the figure's row, the callout, the footnote the callout moved, the Appendix I entry, and the four references to "Passages not yet revised" and "Route C", renumbered from I.1.17 and I.1.18 to I.1.18 and I.1.19.
  - 18 are Part IV's renderings of the three rungs' `.fsi` edits: B's `fail`, `StandardMinMax`'s `MIN` and `MAX`, `builtinPrimitive` and `List`'s nullary comprehension (4); H's `TotalComparison` header and restated members, `AnyMaybe` and `RelationalPredicateCondition` (4); A's `fill` and `tabulate` declarations, the corrected doc comment and the four factories (10).
  - 6 are layout: a paragraph and a footnote that the two added pages moved across a float (4 hunks), a margin note ("Why leave the first?") placed on another line, and the extraction order of an unchanged exponent line.
- Then `git clean -fXq -- Specification` removed the build's 15 ignored products, the 380 MB `fortress.log` among them. `git status --short --ignored Specification` then shows no ignored path. The build changed no tracked file but `Specification/fortress.pdf`, and before the build no ignored product was there.

**Placeholders.** Every `<short hash>` that rung A's commit adds names A's commit:
- the six in `record.md`, where the worker wrote `<landed>`;
- its `FACTS.md` bullet and its two italic notes;
- row 247's status and note, and the notes on rows 437 and 430;
- its handover paragraph.

**For the gate.** A adds one file to `ProjectFortress/tests/`, `TabulateRungA.fss`, which passes, and restates twelve lines of seven team tests (`ArrayOperatorsBesideLibrary`, `ArrayScalarExtension`, `RandomTest`, `ShuffleTest`, `matrixOps`, `sparseMatrix`, `vectorOps`), each keeping its value. The checker count by A's measurement alone is 40, the crash row `none`, and the distance stage 1,434.

## The four new tests on the merged tree

Before the last commit, each new test ran once under walk on the merged tree (rungs B, H and A applied), from an empty private cache at `FORTRESS_THREADS=1`. The captures are under `explorations/compile-ladder/climb-batch-7/merged-tests/`, each headed by its machine line:
- `ExclusionRemainderRungH.fss`: `rc=0`.
- `XXXLexicoUnorderedRungH.fss`: `rc=1`, failing as expected on its first assertion, `LessThan LEXICO Unordered`.
- `TabulateRungA.fss`: `rc=0`.
- `ResultBoundsRungB.fss`: `rc=0`, `PASS`.

H's two were run again after the gather dropped "(provisional)" from their messages, and the captures are those runs. This is not the gate, which the coordinator runs on the merged tree.

## Other writers in the tree during the gather

None: `main` stayed at `4a2b9385c` below the gather's commits. Every commit was staged by an explicit list and read with `git diff --cached --stat` first. The gather's walk runs used private caches under its scratch directory, so `default_repository/caches/` is as the gather found it. Twice a gather script wrote a scratch file into the tree's root (`row459p.txt`, `A_hand.txt`); each was untracked, never staged, and moved out before the next commit.

## For the gate

What the landed commits predict against batch 6b's landed gate (`explorations/compile-ladder/climb-batch-6b/gate/summary.txt`, `gate/checker-count.txt`):
- `testSystem`: 423 as the sum of its shards: 419, H's two new files (one an expected failure), A's one and B's one. The batch record expected 422, one file per rung, and H adds two.
- The compiler track: 779, unchanged, since no rung touches `ProjectFortress/compiler_tests/` or the compiled path's prelude. The library track and `testFast`'s other suites are unchanged, and so are the four-thread `atomic` runs.
- The checker count, by reading and not measured on the merged tree, is 22 (`FortressLibrary` 2, `NativeArray` 0, `RangeInternals` 42 in the stage's doubled rows), the crash row `none`:
  - H takes the `FortressLibrary` api from 19 errors to 1 and A takes `NativeArray` from 22 to 0, and B moves nothing on the count stage.
  - The api still stops at its hierarchy pass on `AnyIntegral`'s error (item 21 of `PLAN.md`), so neither A's removal of the api's `fill` refusals nor B's removal of row 421's errors shows there, and no new layer appears.
  - The count is reported, never red on its own.
- The distance stage is not predicted: B alone reads 1,337, H alone 1,661 and A alone 1,434, from 1,747, and the families that vary move between setups. The merged-diff review ties each row to a rung edit.
- The ladder: none of the 85 files of `explorations/compile-ladder/baseline-2026-09-19/pass-list.txt` is a file any rung edits or adds, and the compiled path's prelude is untouched. A's own subset saw only `matrixOps.fss`'s messages name `tabulatedArray2`, a file not on the pass list. The eighteen microGPT components are held at their phase, and A's vocabulary and probe lines are the approved ones.
- After `ant compileAll`, the library-order cache rebuild comes before the compiler track, as always. The interpreter's caches must start empty for `testSystem`, since all three rungs change the interpreter's library.

## After the last commit: the tracked-path check

The check of the gather's brief ran over the report files of the three commits (`HEAD~3..HEAD`: rung B's `de22fd928`, rung H's `952892a00` and rung A's, the last). It covers every `REPORT.md`, `SKEPTIC.md` and `record.md` of this batch, and it printed nothing: every `explorations/` path they cite that exists is tracked.

An extended pass followed, over those nine files, this record and the lines the folds added to `FACTS.md`, the ledger, the handover and `PLAN.md`. It reads citations relative to `explorations/` (`compile-ladder/...`, `perf-probes/...`, `reviews/...`) and `probes/...` relative to each rung's directory. It found no cited file untracked. What it printed was expected:
- glob patterns (`probes/mg/before-*.txt`, `probes/checker-count-*.machine.txt`, `probes/compcheck/BoundCheck.*`, `probes/passes/df-before-*.txt`), each matching tracked files;
- one pre-existing citation inside row 430's older text;
- the two `__pycache__` directories this record names as left untracked.

The last commit was amended once, before anything was pushed, to add this section and to regroup this batch's parked lines of `PLAN.md` by rung in manifest order. It changed no other file.

## For the commit stage

- **Placeholders.** Every `<short hash>` sits in a phrase that names its rung: "rung B" or "rung H" or "rung A" beside it, "Fixed `<short hash>` (climb batch 7, rung ...)", or the handover's "rung B (`rung-result-bounds`) landed as". Each rung's section above lists where its own placeholders are.
  - B's are in its FACTS bullet and appended sentence, row 421's status and note, the notes on rows 309 and 447, its handover paragraph and `record.md`.
  - H's are in its three FACTS appends and FACTS entry, the notes on rows 407 and 351, its handover paragraph and `record.md`.
  - A's are in its FACTS bullet and two notes, row 247's status and note, the notes on rows 437 and 430, its handover paragraph and `record.md`.
  - Rows 430 and 447 each carry notes from two sources. Row 430 has H's note, which names no commit, and A's, after it. Row 447 has B's skeptic's note, B's.
- **Stops met, all lifted.**
  - B: the line count, lifted by the decision of 2026-09-27, the numerics plans.
  - H: a new distance error shown as caused, and a changed walk output (twice).
  - A: a changed walk output, the demo `mg.fss`, which its skeptic found.

  The stops of H and A are reversible and landed under the decision of 2026-09-27 on the stops a batch record reserves. No stop met is left unlifted, so none holds the push.
- **The handover.** Its paragraph "The last landing is climb batch 6b" and the checker count in its second paragraph describe the tree before this batch. They are left for the commit stage, which writes the landing's line after the gate.

## The merged-diff review

Made 2026-09-28 on `main` at `f3b62bc83`, over the batch's three commits (`de22fd928` B, `952892a00` H, `f3b62bc83` A), beside the gate's run on them. Its corrections are one commit, "Fold the review's corrections", inside `explorations/` only, so the gate's result stands.

**Checked and holding.**
- Batch rule 1. B's source is ten one-line replacements: `fail` (`Library/FortressLibrary.fsi:37`, `.fss:54`), `StandardMinMax`'s `MIN` and `MAX` (`.fsi:214-215`, `.fss:266-267`), `builtinPrimitive` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:30`, `.fss:34`) and `List`'s nullary comprehension operator (`Library/List.fsi:109`, `Library/List.fss:177`). H's is `TotalComparison`'s header and its five restated members (`Library/FortressLibrary.fsi:120-131`, `.fss:158-175`), `AnyMaybe`'s header and `opr =` (`.fsi:884`, `.fss:1400-1403`), `RelationalPredicateCondition`'s header (`.fsi:2568`, `.fss:4533`), `andRelCond` and `andCondCombine` (`.fss:4556-4566`), and the two calls in `FilterGenerator2` (`.fss:4514`, `:4516`), a trait section 4 names as no rung's, which H's report reads as "the Condition functions whose bodies build it" and its skeptic accepts (`compile-ladder/rung-exclusion-remainder/SKEPTIC.md:160`). A's is the `fill` and `tabulate` members of the array traits, the call-site bodies, the four factories and `mapArr` and `ivmapArr` (`Library/List.fss:462`, `:467`). No declaration, method, trait body or operator is changed by two rungs: `StandardMinMax` is B's and `TotalComparison` H's, and H's restated members carry `StandardTotalOrder`'s bodies (`Library/FortressLibrary.fss:283-288`), not B's defaults.
- Batch rule 2. No new test asserts another rung's edit, and each passes on its own branch and on the merged tree (`compile-ladder/climb-batch-7/merged-tests/`); the one shape that would have leaned on B's edit, H's skeptic's `StandardMinMax[\TotalComparison\]`, was not taken (item 22 of `PLAN.md`).
- The vocabulary and probe lines are 16: 12 vocabulary lines in `explorations/run-c4/src/FlatArrays.fss`, `explorations/apl/mg/AplMg.fss` and `FlatArrays2.fss`, and 4 in the two probe files beside them, each `.fill(` respelled `.tabulate(` and nothing else. No function-form `fill` is left in `Library/`, `ProjectFortress/tests/` or `ProjectFortress/demos/` but `TabulateRungA`'s two value-form calls with a function and `ProjectFortress/demos/mg.fss:20` (row 464).
- Footers exact on the three commits; no model identifier in their messages or added lines; each carries a `historical:` line naming every path outside `explorations/` it touches.
- The ledger: rows 456-473 follow row 455 in numeric order with no gap or duplicate (472 rows, 148 still the one vacant number); rows 247, 309, 351, 407, 421, 430, 437 and 447 change only by text inside their cells, and only the closed rows 247 and 421 change a status cell. `FACTS.md`'s anchors `:661` and `:801` are right. No provisional number is cited as a row outside the rungs' own `SKEPTIC.md` files, which carry the mapping. The FACTS lines the batch added were read against their citations on `main`, the line numbers among them, and hold.
- The fifteen corrections the gather closed, each in the file it names, and the skeptics' ten recommended rows: eight rows opened, 473 for two of them, and one note, on row 447.
- Every path the landed records cite exists and is tracked, the rung-relative `probes/...` paths included, except the two `__pycache__` directories this record names as left untracked.
- The provenance blocks have five lines each, and each `SKEPTIC.md` says the lines were opened (`compile-ladder/rung-result-bounds/SKEPTIC.md:16-18`, `compile-ladder/rung-exclusion-remainder/SKEPTIC.md:17-29`, `compile-ladder/rung-tabulate/SKEPTIC.md:52-59`). One line is corrected below.

**The checker table.** The gate's table (`tmp/gate-batch-7/out/checker-count.txt`) against the last landed one, `compile-ladder/climb-batch-6b/gate/checker-count.txt`: no row is new and none rose. `FortressLibrary` 38 to 2: rung H cleared the 18 exclusion errors, and the one left is `AnyIntegral`'s `comprises` error, reported at `Library/FortressLibrary.fsi:436` (item 21 of `PLAN.md`), so the api's overloading and return-type checks still do not run on the stage. `NativeArray` 44 to 0: rung A's `fill` and `tabulate` at `StandardMutableArrayType` and `ImmutableArray1` (`Library/FortressLibrary.fsi:1446-1447`, `:1500-1501`). `RangeInternals` 42, unchanged. `#total` 62 to 22, the gather's prediction; `#crash` none; the shadow matching. The table's `#cache` line is the stage's setting of the batch record's section 8, not an api row. The gate's `testSystem` shards sum to 423, as this record predicts.

**Corrected in the records.**
- A's provenance block: its `historical:` line ended in "in the team's corpus"; it now ends with a file:line, as the rule asks.
- B's `REPORT.md` section 10 gave row 421's checker home as the count stage "from the merged tree on". Rung H left `AnyIntegral`'s clause, so on the merged tree that home waits for item 21; the cell now says so. Row 421's ledger note already says "once the `FortressLibrary` api reaches its return-type check".
- `PLAN.md`: B.worker.3, withdrawn at the gather, is routed to the parked line on rung H's stop, with the review's own point that the two records read the site `:2710` by different standards (review.1).
- Rows 460 and 463: a note on each saying which gated home it owes and where that home waits (below).

**For the judge: two findings in what landed, not fixed here.**
1. A's commit carries rung H's test messages. `f3b62bc83` drops "(provisional)" from five messages of `ProjectFortress/tests/ExclusionRemainderRungH.fss` (`:24-25`, `:29-30`, `:55`) and two of `XXXLexicoUnorderedRungH.fss` (`:8-9`), a correction of H's fold, not a consequence of A's lines; this record's own decision says H's commit should have carried it. At `952892a00` two gated tests cite provisional rows, and a revert of A's commit alone would bring them back. H's commit's re-anchoring of B's messages is the other kind: it follows H's own line moves and is right at H's commit. The final tree is right; moving the seven lines into `952892a00` would leave it byte-identical, so the gate's result would stand.
2. Row 460's binding form has no gated home. Rung H measured that `walk` and the compiled checker both refuse `typecase rp = p of` ("Variable rp is not defined", `compile-ladder/rung-exclusion-remainder/probes/typecase/typecase-forms.txt:116-136`), where the specification's grammar and prose give the form (`Specification/basic/expressions/typecase.tex:55-62`, `:88-93`). A deferred defect the specification settles gets an `XXX` expected-failure test, and an interpreter `XXX` file in `ProjectFortress/tests/`, rung H's directory in this batch, can hold it; H's `REPORT.md:145` files it as "the fourth case, a verified row" without saying why no gated test can, as rows 465, 469, 470 and 472 each do. The other reading: the section's `\note` says it "should be revised according to the changes in the pattern matching proposal" (`typecase.tex:15`), which the implementation's grammar follows with no binding form (`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:43`); but a `\note` is not rendered in a release (`Specification/fortress/fortress.tex:35-36`), and the rendered text is the standard.

**Observed, not changed.**
- The compiled halves: row 460's shorthand narrowing (`typecase.tex:126-133`) and row 463's `__cond` (`Specification/basic/expressions/if.tex:29-34`, `:49`) are settled by the specification and can each be held by an `XXX` compiled test in the form of `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss`; that directory is no rung's in this run (`explorations/coordinator/CLIMB-BATCH-7.md` section 4 gives it to batch 7b's rung C). They wait for the next rung that owns it, as rows 440 and 443 wait for theirs; the notes on both rows say so.
- B's `REPORT.md:158` states the merged tree's count as a prediction conditional on rung H; it is dated by the note in its section 10.
- The handover's paragraph "The last landing is climb batch 6b" and its checker count are the commit stage's, as this record says.

**Stops.** The same as "For the commit stage" above, each lifted: B's line count by the numerics plans (`explorations/coordinator/POSITIONS.md:128`); H's new distance errors and its two changed walk outputs, and A's `mg.fss`, as reversible stops (`POSITIONS.md:120`). On rung B's skeptic's reading, H's stop at `:2710` is met on its letter only (`PLAN.md`, the parked line on it). The review meets no stop.

## Repair after the judge's ruling

The judge ruled in `explorations/compile-ladder/climb-batch-7/JUDGE-review.md` (`d3f92a509`). The repair ran on `main` at `d3f92a509`, the head before it, in `explorations/` only. No source path changed, so the gate's result stands.

Finding 1 stands, and nothing is rewritten. At `952892a00` the seven messages already name the right rows: in the ledger at that commit, rows 456 and 457 are H's own (`git show 952892a00:explorations/fortress-gap-ledger.md`, `:467-468`), and only the word "provisional" is stale. The carry is declared in A's message and in its `historical:` line. A revert of either rung alone conflicts in the record files whether or not the lines move. Re-run here with `git merge-tree --write-tree --merge-base=<commit> 4c92ea034 <commit>~1`: a revert of H conflicts in this record, `FACTS.md`, `PLAN.md`, the ledger and the handover, and on H's two tests; a revert of A conflicts in this record, the ledger and A's `REPORT.md`. Moving the lines would orphan two hashes that ten committed lines cite, seven of them capture headers (this record's `:301`, `:327` and `:348`; the four `merged-tests/*-threads1.txt:1`; the three `rung-tabulate/probes/build/gather-*.txt:1`). The lesson for the gather: a fix to an earlier rung's files, found while that rung's commit is still `HEAD` and unpushed, is amended into that commit before the next rung's is made.

Finding 2: row 460's binding form has home 3, not an `XXX` test. The section's note marks its text for revision (`Specification/basic/expressions/typecase.tex:15`), and the implementers' grammar replaced the form (`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:122`, `ProjectFortress/astgen/Fortress.ast:594-607`). Pavol's weighting settles that kind of conflict (POSITIONS 2026-09-23, how the exclusion fork is weighed, and 2026-09-27, a numeral's type). The corrections are row 460's notes cell; rung H's `REPORT.md`, the row-460 bullet of section 15 and the line of section 17; `FACTS.md`'s typecase entry; and a parked line in `PLAN.md`. The shorthand narrowing stays settled (`typecase.tex:126-133`), and the review's note on row 460 about its compiled `XXX` test stands. No test is added.

Item for Pavol: judge-review.1, typecase's binding syntax, under "Off the path, parked" in `PLAN.md`.

The tracked-path check over rung H's `REPORT.md` and `record.md`, this record and `JUDGE-review.md` printed one line, `UNTRACKED explorations/compile-ladder/plan-n/manifest/__pycache__/`, the Python bytecode directory this record's preconditions name as left untracked (`:5`); every other path they cite exists and is tracked. Every path this repair added to the ledger, `FACTS.md`, `PLAN.md` and H's `REPORT.md` is tracked and holds the cited text at the cited line: `typecase.tex:15`, `:53-93` and `:126-133`; `DelimitedExpr.rats:122` and `:237-251`; `Fortress.ast:594-607`; `CompilerLibrary.fss:40-43`; `Compiled6.av.fss:16-19`; and `typecase-forms.txt:94-136`, with `TcBind.fss` and `TcTuple.fss` beside it.

## The second merged-diff review

Made 2026-09-28 on `main` at `e75fca14b`, over the batch's three commits and the first review's, the judge's and the repair's, beside the gate's result. Its corrections are one commit, "Fold the review's corrections", inside `explorations/` only, so the gate's result stands.

**Checked and holding.**
- Batch rules 1 and 2, read from the hunks again: B's ten one-line replacements, H's `TotalComparison`, `AnyMaybe`, `RelationalPredicateCondition` and `Condition` functions, and A's `fill` and `tabulate` members, factories and call sites share no declaration, method, trait body or operator. H's restated members carry `StandardTotalOrder`'s bodies (`Library/FortressLibrary.fss:283-288`), and no new test asserts another rung's edit. A leaves no function-form `fill` call in `Library/`, `ProjectFortress/tests/` or `ProjectFortress/demos/` but `TabulateRungA`'s two value-form calls and `mg.fss:20` (row 464). `ImmutableArray1` and `StandardMutableArrayType` are the only traits that extend `StandardImmutableArrayType`, whose two forms A made abstract, and both define them.
- Each rung's directory is in its own commit alone, besides the review's corrections. A's vocabulary and probe lines are the 16 approved, each `.fill(` to `.tabulate(`.
- Footers are exact on all six commits. No model identifier is in their messages or added lines. Each of the three rung commits has a `historical:` line.
- The ledger: 472 rows in the base's order, 148 the one vacant number, and 456-473 in order after 455. Rows 247, 309, 351, 407, 421, 430, 437 and 447 change only by appended text, and only the closed rows 247 and 421 change a status cell. The counts cover rows 1-310, as they say. `FACTS.md`'s anchors `:661` and `:801` are right. No provisional number is left as a row citation.
- The FACTS lines and the new rows were read against their citations on `main`, and the figures add up: 22 = (2 + 0 + 42) / 2; 190 = 147 + 22 + 21; 1,747 − 420 + 10 = 1,337.
- The corrections the gather closed were spot-checked (A1, B1, B2, H1, H6), and every recommended row is opened.
- Each provenance block has five lines, each ending in a file:line, and each `SKEPTIC.md` says the lines were opened. Every path the records cite is tracked, apart from the two `__pycache__` directories named at `:5`.

**The checker table.** `tmp/gate-batch-7/out/checker-count.txt` against `compile-ladder/climb-batch-6b/gate/checker-count.txt`: no api row is new and none rose.
- `FortressLibrary` 38 to 2: rung H cleared the 18 exclusion errors. The one left is `AnyIntegral`'s clause, reported at `Library/FortressLibrary.fsi:436` (`tmp/gate-batch-7/checker-count/run.txt:26-28`) and counted twice.
- `NativeArray` 44 to 0: rung A.
- `RangeInternals` 42, unchanged.
- The new `#cache` line is the stage's setting (`explorations/coordinator/tools/checker-count/run.sh:93`; `explorations/coordinator/CLIMB-BATCH-7.md:1048`), not an api row.
- `#total` 62 to 22, `#crash` none. The gate's `testSystem` shards sum to 423.

**Corrected in the records.**
- H's FACTS append and its `record.md` said `TotalComparison` extends `Comparison` alone "as the specification's does". The specification's `TotalComparison` extends `Comparison` and the three traits of `LEXICO`'s algebra (`Specification/advanced-lib/comparison.tex:28-32`). H's `REPORT.md` says so correctly (`compile-ladder/rung-exclusion-remainder/REPORT.md:6`, `:163`). Both texts now say it extends no order, as the specification's does.
- A's provenance `historical:` line listed `ArrayOperatorsBesideLibrary.fss` and `ArrayScalarExtension.fss` among the 2012 tree's files. Both were added by the revival at `02d09a39f` (2026-09-19), and the line now names them as the revival's own.
- Rows 466, 467 and 468, opened from rung A's skeptic, did not say which home each takes or why. Each now does:
  - 466: home 3. The normative sentence puts the duty on the programmer, and the footnote describes the 2012 implementation.
  - 467: the fourth case, with the distance stage as its report-only home.
  - 468: home 3, since the specification describes neither `Generator22D` nor `rects`.

**Observed, not changed.** Two commit messages carry the two claims corrected above: H's (`952892a00`, "as the compiler prelude's and the specification's do") and A's `historical:` line (`f3b62bc83`). They are local commits whose hashes committed lines cite. The judge ruled against rewriting them for a like reason (`compile-ladder/climb-batch-7/JUDGE-review.md`, finding 1), so the records carry the correction.

**Stops.** They are as "For the commit stage" lists them, each lifted:
- B's line count, by the numerics plans (`explorations/coordinator/POSITIONS.md:128`);
- H's new distance errors and its two changed walk outputs, and A's `mg.fss`, as reversible stops (`POSITIONS.md:120`).

The review meets no stop and adds no item for Pavol.
