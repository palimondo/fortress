# Skeptic, rung O (climb batch 6b): the second judgement

**Verdict: approved, with three required corrections.** The repair round did what the judge's ruling asked (`JUDGE.md` section 7). The four expected failures exist, fail today for the defect each names, and the first was shown red on a deliberate fix. The record now reports the reserved library stop as met and lifted. The Java, the library and the team tests are unchanged since the first judgement. My own differentials this round found no fault in the natives or in the new tests. They did find two things the record gets wrong or leaves without a home:
- **The reach of the stop.** The body at `Library/RangeInternals.fss:989` does not only rely on wrapping "at the integer bounds". Every descending `NN32` or `NN64` range, the ordinary empty range `1:0` among them, reaches it. Its `.size` answered 0 on the base and raises `IntegerOverflow` after the edit (section 3, W01 and W08).
- **Two measured defects with no gated home.** `MIN # 0` is the whole range on the base and raises after the edit and on the compiled path, where the specification says it is empty (W10, W11, C06). `|r|` of an `NN32` range fails the same `typecase` as row 452's `ZZ64` one (W13).

These are corrections to the record and two small test additions, not a reason to drop the rung (section 6).

Every capture named below is under `explorations/compile-ladder/rung-overflow-natives/probes/skeptic/` unless its path says otherwise. The first judgement follows this one, unchanged.

## 0. What I inherited and what I ran

- **The branch.** `wip/rung-overflow-natives` at `88dc06d41`, clean. The milestones since the first judgement are `fb268315c` (the ruling), `4ef8fc82d` (the four tests and their captures) and `88dc06d41` (`record.md`).
- **No source changed since the first judgement.** `git diff 4ec893bb8..HEAD` over `ProjectFortress/src`, `Library`, `ProjectFortress/LibraryBuiltin`, `ProjectFortress/demos`, `FixedWidthOverflowRungB.fss`, `intPrim.fss` and `longPrim.fss` prints nothing. The build is the edited one: `ProjectFortress/build/com/sun/fortress/interpreter/glue/prim/NN32$Add.class` is dated 09:26:50, after its source at 09:26:21.
- **The briefing.** I ran the slice of step 1 (two parts) and read all of it.
- **What I ran.** Two new differential programs, walk on the stock and edited classes and the compiled run (`run-sk2.sh`). The four expected failures once more (`run-xxx-round2.sh`). And drafts of the two test additions I require, walk on the stock and edited classes (`run-sk2-drafts.sh`). No `ant` target, no comparison pass, no logging pass. Every run was at `FORTRESS_THREADS=1`: the rung writes no mutable state and the repair round adds tests only.
- **The machine**, from each capture's header: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4 (2026-07-21). The load average was 5.34 4.27 3.43 when the differentials started (12:41 UTC), 4.52 4.99 4.15 at the re-run (12:47 UTC), and 4.67 5.84 4.83 at the drafts (12:51 UTC), with other work on the box.

## 1. The repair round against the ruling

- **Instruction 1, row A.** `ProjectFortress/tests/XXXRangeBoundsRungO.fss` holds the six assertions of the ruling's table (`:15`, `:18`, `:21`, `:24`, `:26`, `:29`), each bound to a name first.
  - `probes/repair/xxx-range-bounds-goes-red.txt` shows the whole sequence: the stop at `Library/RangeInternals.fss:1423:39` at 1 and 4 threads, and "OK Saw expected exception"; then the local fix as `git diff Library`, the three edits of the ruling and nothing else; then `PASS` on the fix, "Missing expected failure" with "Tests run: 1, Failures: 1"; then the revert, an empty `git status --short Library`, and the expected exception back.
  - Steps 4 to 6 carry the same timestamp, 12:23:54. So the walk run and the harness run on the fix ran side by side. Both printed `PASS` on the fixed library, and the revert header (step 8, 12:24:13) follows both. The order does not weaken the demonstration.
- **Instruction 2, row B.** `XXXSeqRangeTopRungO.fss` has the three loops. Each guard (`:14`, `:22`, `:30`) reads only `i`. The control `probes/repair/SeqRangeControl.fss` prints `PASS`. The file stops at `RangeInternals.fss:1081` at 1 and 4 threads, and the harness sees the expected exception.
- **Instruction 3, row C.** `XXXRangeSizeZZ64RungO.fss` passes its `.size` assertion and fails the `|r|` one with "typecase match failure given Long" at `Library/FortressLibrary.fss:3876:7-3880:8`, at 1 and 4 threads.
- **Instruction 4, row D.** The pair has the shape of `BoxDotSpellingsRungWLink.test` and `XXXBoxDotSpellingsRungW.test` (FACTS.md, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only, and a run-time defect needs two `.test` files"). The control `probes/repair/SeqMidpointControl.fss` prints `PASS` compiled. The link test passes. The run test prints `REACHED`, then raises from `CompilerLibrary.countedseqloop` at `Library/CompilerLibrary.fss:377`, and is "Saw expected failure".
- **My re-run** (`round2-xxx.txt`, 12:47 UTC, on `88dc06d41`): the three walk files stop exactly where the repair captures say, and the compiled pair gives the same two verdicts. `git status --short` over `default_repository`, `Library` and `ProjectFortress` is empty afterwards.
- **Instruction 5.** My own grep of the four component names, and of the same names without `XXX`, over `ProjectFortress/` (including `src/com/sun/fortress/` whole, the build directory excluded) and `Library/`, in `.fss`, `.fsi`, `.test`, `.java`, `.scala` and `.xml`: each name occurs only in its own files. Nothing named `RangeBoundsRungO`, `SeqRangeTopRungO`, `RangeSizeZZ64RungO` or `SeqMidpointRungO` exists outside them.
- **Instructions 6 and 7.** `record.md` has every change the ruling lists: the Measured and Still-open lines, 11,952 on row 427, the row 403 bullet, rows 450 to 453, the notes on 325, 315 and 326, the handover line and the gather paragraph. The `reportText` has the amended provenance block, sections 1, 9 and 13 to 17, and the new section 18.
- **Instruction 8.** `git diff 5c368175f...HEAD --stat` shows, beyond the first pass, only the six new test files and the rung's own directory.

## 2. The ten checks

1. **The briefing** was read (section 0).
2. **The provenance block** (`reportText`, five lines; `REPORT.md` is not on the branch because the harness refused it). I opened every cited line with `sed -n`:
   - `probes/bounds/OverflowBounds-walk-base.txt:1`, `:29` and `:44` read `ZZ32 MAX + 1 = -2147483648`, `NN32 MAX + 1 = 0` and `NN64 -1 = 18446744073709551615`.
   - `Specification/basic/operators/opr-overview.tex:154-155` and `:195-196` say "For integer results, overflow throws an IntegerOverflow". `:24-25` is prefix `-`. `:172-176` and `:205-209` are the wraparound and saturating operators. The corrected `:164-165` is "For integer results, division by zero throws a DivisionByZero".
   - `Specification/basic/types-vals-vars.tex:546-550` names the fixed-size types and their unsigned equivalents.
   - The precedent line's files are right. `natives.patch` has 76 lines. `Int.java:258-261` is `overflow()`. `simpleUnsignedIntArith.java:46-59` and `:67-70` are the overflowing add, subtract, multiply and negate. `simpleUnsignedLongArith.java:56-73` and `:80-83` are the same for 64 bits.
   - The deviation line cites the guard lines `NN32.java:105-126` and `UnsignedLong.java:106-127`.
   - The historical line names every file of the 2012 tree the net diff edits: the four glue classes, `intPrim.fss`, `longPrim.fss`, `HeapShakedown.fss`, and the renamed campaign test. The six new files are new, not historical.
   - No spec line cites `Specification/library/apis/`.
3. **The recorded failure** is `probes/failure-preedit.txt` in `0e4d3214d`, a commit that touches no glue class. It shows "FAIL: row 379: ZZ32 MAX + 1 throws IntegerOverflow" with rc=1, and the two team tests failing on their new assertions.
4. **The diff** is unchanged since the first judgement, where I read it line by line. The signed half is `natives.patch` hunk for hunk. The unsigned half is the compiled helpers' tests. `SkNativeCheck-edit.txt` records 0 mismatches in 9,133,632 direct checks. The repair round's six files are tests only.
5. **The precedent search** stands as verified in the first judgement. The rule-2 count is ten remaining natives, named. The repair round's test shapes follow `FixedWidthOverflowRungB.fss:1` and the two-file compiled shape.
6. **The tests.** Each new file carries exactly one comment line, pointing at the rung's `REPORT.md`, and assert messages that carry specification lines only. Each exercises the defect its row names (section 1).
7. **Competing declarations**: none (section 1, instruction 5).
8. **`record.md`.** Rows 379, 427, 403, 326, 325 and 315 exist once each, and nothing is renumbered. The ledger's highest row is 448, so provisional 449 to 453 are the next free numbers. The tracked-path loop over `record.md` prints only `MISSING explorations/compile-ladder/rung-overflow-natives/REPORT.md`, which the gather writes from `reportText`. Its shorthand paths resolve, apart from suffix fragments and test names written without their directory. Two statements are wrong or incomplete: the reach of the `:989` stop, and row 450's reproducer E10 (section 8, correction 1).
9. **The homes.** Section 5.
10. **The count table.** The rung's table is `probes/checker-count/after.txt:14`, `#total 62`, and `REPORT.md` section 11, `record.md` and the structured result all declare 62. The last landed table, `explorations/compile-ladder/climb-batch-6/followup-R/gate/checker-count.txt:14`, reads the same. No mismatch.

## 3. My differentials (programs the worker did not write)

Two programs, both new this round. `Sk2RangeW.fss` runs walk only; the compiled prelude has no `NN32` range and no `|…|` on ranges, as `SkRangeEdges-compiled.txt` shows. `Sk2RangeC.fss` uses only what the compiled prelude has (`for` over `a:b`, `seq`, `#`), and runs walk on the stock classes, walk on the edit, and compiled. Each case is guarded by `RunsPast`, so a range that runs past its third element cannot hang the run.

**`Sk2RangeW`** (`Sk2RangeW-walk-stock.txt`, `Sk2RangeW-walk-edit.txt`):

| case | walk, stock | walk, edit | specification |
|---|---|---|---|
| W01 `NN32` `(1:0).size` | 0 | IntegerOverflow | 0 (`ranges.tex:47`, `:103-106`) |
| W02 `NN32` `(0:2).size` | 3 | 3 | 3 |
| W03 `NN32` `(1:0).isEmpty` | true | true | true |
| W04 `NN32` `(0 # 0).size` | 0 | 0 | 0 |
| W05 `NN32` `(0 # 2).size` | 2 | 2 | 2 |
| W06 `NN32` `for` over `1:0`, count | 0 | 0 | 0 |
| W07 `NN32` `for` over `seq(0:2)`, count | 3 | 3 | 3 |
| W08 `NN64` `(1:0).size` | 0 | IntegerOverflow | 0 |
| W09 `ZZ64` `(1:MIN).size` | 0 | IntegerOverflow | 0 |
| W10 `MAX IN (MIN # 0)` | true | IntegerOverflow | false (`ranges.tex:64-65`) |
| W11 `for` over `seq(MIN # 0)`, count | runs past a third element | IntegerOverflow | 0 |
| W12 `(MAX # 0).size` | 0 | 0 | 0 |
| W13 `NN32` `\|1:0\|` | "typecase match failure given NN32", run ends | the same | 0 (`ranges.tex:103-106`) |

**`Sk2RangeC`** (`Sk2RangeC-walk-stock.txt`, `Sk2RangeC-walk-edit.txt`, `Sk2RangeC-compiled.txt`, compile rc=0):

| case | walk, stock | walk, edit | compiled | specification |
|---|---|---|---|---|
| C01 parallel `for` over `MIN:(MIN+2)` | 3 | 3 | IntegerOverflow | 3 (`ranges.tex:47`) |
| C02 `seq(MIN:(MIN+2))` | 3 | 3 | IntegerOverflow | 3 |
| C03 `seq(-1073741826:-1073741824)` | 3 | 3 | IntegerOverflow | 3 |
| C04 parallel `for` over `(MAX-2):MAX` | 3 | 3 | IntegerOverflow | 3 |
| C05 `seq(MIN # 3)` | 3 | 3 | IntegerOverflow | 3 (`:64-65`) |
| C06 `seq(MIN # 0)` | runs past a third element | IntegerOverflow | IntegerOverflow | 0 (`:64-65`) |
| C07 `seq(MAX # 0)` | 0 | 0 | 0 | 0 |
| C08 `seq(1:3)` | 3 | 3 | 3 | 3 |
| C09 parallel `for` over `1073741824:1073741826` | 3 | 3 | IntegerOverflow | 3 |
| C10 parallel `for` over `1:3` | 3 | 3 | 3 | 3 |

**What the differentials show.**
- **The natives on these routes.** Walk on the edit agrees with the specification wherever the library computes no out-of-range intermediate (W02 to W07, W12, C01 to C05, C07 to C10).
- **W01 and W08: the `:989` stop, at ordinary values.** `CompactFullScalarRange.size` computes `narrow(r-l+1)` before it tests emptiness (`Library/RangeInternals.fss:986-991`). For an unsigned range written high to low, `r-l` goes below zero. The base wrapped and then wrapped back to 0, the right answer. The edit raises. So the reliance the first judgement measured at `1:MIN` is reached, on `NN32` and `NN64`, by the most ordinary empty range there is. It is the same site and the same stop, lifted as reversible. The fix the red demonstration used, `if l > r then 0 else narrow(r-l+1) end` (`probes/repair/local-fix.sh`), answers 0 here too, by reading, so `XXXRangeBoundsRungO.fss:22-24` gates this body. What is wrong is the record's description: row 450, the FACTS "Measured" line, the row 403 bullet and the handover line all say "at the integer bounds". The logging pass met no `NN32` or `NN64` overflow in any test, demo or microGPT check (`probes/overflow-probe-summary-edit.txt`), so "nothing measured reaches it" still holds.
- **W10, W11 and C06: `MIN # 0`, wrong on every path.** On the base, `sized1Range` builds `MIN:(MIN-1)`, and `MIN-1` wraps to the maximum, so `MIN # 0` is the whole range (W10 true, W11 and C06 run past a third element). After the edit it raises at `:1423`. The compiled run raises too, from the prelude's `#`, `lo : (lo+sz-1)` (`Library/CompilerLibrary.fss:446`, by reading). The specification says `a # 0` is the empty set (`Specification/basic/expressions/ranges.tex:64-65`, read `:40-70`). Row 450 has this only "by reading", as part of its fix. The fix `XXXRangeBoundsRungO` was shown red on, `lo+(ex-1)`, still overflows here (`MIN + -1`). So that file does not gate this defect: a repair that turns it green leaves `MIN # 0` raising.
- **W13: row 452 is wider than `ZZ64`.** `CompactFullRange`'s `opr |self|` (`Library/FortressLibrary.fss:3874-3880`) has arms for `ZZ32` and its pairs and triples only. So an `NN32` range fails as a `ZZ64` one does, on the base and on the edit alike: this predates the rung. Row 452's first fix, "add the `ZZ64` arms", would turn `XXXRangeSizeZZ64RungO` green and leave `NN32` failing.
- **C01 to C05 and C09: row 453 on more routes.** The compiled prelude splits at `z = lo+hi` (`Library/CompilerLibrary.fss:363`, `:377`, `:387`, `:395`, `:404`, `:414`). So a range near the minimum fails as one near the maximum does, and so do the parallel form and a small range whose bounds sum beyond `ZZ32`. Walk counts 3 in each.
  - **Which outcome.** The specification settles the divergence against the compiled run (`ranges.tex:47`), and the repair is outside this rung. That is the prefix's fourth case, which row 453 already is.
  - **The gate.** For three elements, `parloop` hands over to `countedseqloop` at `:361`, by reading. That is the function the `XXXSeqMidpointRungO` pair raises from (`:377`), so the pair covers these routes, and Steele's `floorAverage` fixes both directions.
  - **The row's `#` fix.** C06 shows it is incomplete: `lo : (lo+(sz-1))` still computes `MIN + -1` for `MIN # 0`.

**Threads.** One thread for every run. The rung writes no mutable state. My probes do count in a `var`, but at one thread and over three elements that count is not raced. A parallel `for` over three elements on the compiled path goes to the sequential `countedseqloop` by reading, or raises first.

## 4. The failure-mode question

No loud failure becomes a quiet value. The rung turns quiet wraps into the catchable `IntegerOverflow`.
- **The base's quiet wrong answers become loud.** `seq((MAX-2):MAX)` used to run past its top (row 451), and `MIN # 0` used to be the whole range (W10, W11). Both now raise.
- **The base's quiet right answers also become loud.** These are the bodies that wrapped to the right answer (row 450, and W01 and W08). That is the reserved stop, listed for Pavol.

## 5. The homes of every defect measured in this rung

- **Row 379, the eighteen natives: home 1.** `FixedWidthOverflowRungB.fss:26-48`, `:53-59`, `:64-70`, `intPrim.fss:31-32` and `longPrim.fss:31-32`, passing (`probes/pass-postedit.txt`; the first judgement ran them).
- **Rows 450 to 453 (the first judgement's A to D): home 2.** Each is an `XXX` file that fails today for its defect (section 1).
- **The `:989` reliance on descending `NN32` and `NN64` ranges (W01, W08): home 2, by site.** It is in `XXXRangeBoundsRungO.fss:22-24`. That assertion fails at the same body, and the emptiness-first fix answers these too. The record must describe it (correction 1).
- **`MIN # 0` on walk (W10, W11, C06 walk): home 2, not yet in place.** Correction 2 adds its file.
- **`MIN # 0` on the compiled path (C06 compiled).** It is the prelude's `#` at `:446`, which the one library replaces at the switch-over. The new file of correction 2 gates the one library's `#`. The prelude's `#` has no compiled gate of its own; recommended row 1 names it for the gather.
- **`|r|` of an `NN32` range (W13): home 2, not yet in place.** Correction 3 adds its assertion.
- **Compiled split on the other routes (C01 to C05, C09): home 2.** It is the `XXXSeqMidpointRungO` pair, the same function by reading.
- **E, F and G** of the ruling are notes on rows 325, 315 and 326, and they are in `record.md`. Row 427 is repaired with no gated home, and row 449 is a ledger row, both accepted by the judge.

## 6. Why this is not a second refusal

The rung is right. Its natives match exact arithmetic. Its tests fail before the edit and pass after it. Its comparison changed no interpreter test. The repair round carried out the ruling to the letter. What I found this round adds to a stop that is already met, reported and lifted as reversible (`explorations/coordinator/POSITIONS.md:120`), plus two pre-existing library defects of the same kind the judge already homed. Each closes with a sentence of record and a test line or a test file. The code is not wrong, and the record is honest, apart from these corrections.

## 7. Stops met

- **"A library body found to rely on wrapping"** (`explorations/coordinator/CLIMB-BATCH-6.md:203`): met.
  - The measured sites: `Library/RangeInternals.fss:1423` and `Library/FortressLibrary.fss:3877`, and `RangeInternals.fss:989`, which is reached also by any descending `NN32` or `NN64` range (`Sk2RangeW-walk-edit.txt`, W01 and W08).
  - Lifted as reversible by `explorations/coordinator/POSITIONS.md:120`, with `explorations/protocol.md:17-20`.
- **"An edit to any file not named above"** (`CLIMB-BATCH-6.md:195`, `:203`): met by the six new test files, and by the one correction 2 adds. The prefix's home rule requires them. Lifted by `POSITIONS.md:120`.
- **The rename of row 379's expected failure** (`ProjectFortress/tests/FixedWidthOverflowRungB.fss`): lifted by `POSITIONS.md:65`.
- **The assertions added to `intPrim` and `longPrim`** (`intPrim.fss:31-32`, `longPrim.fss:31-32`): lifted by `POSITIONS.md:81`.
- **Not met.**
  - "A changed interpreter output or exit code its comparison does not account for": 0 of 413 changed (`probes/compare-normalised.txt`, last line).
  - "Any rung editing a file another rung of this run owns": there is one rung.
  - "A site whose value would change": the ruling reads the changed range results as the library stop, not a second one (`JUDGE.md` section 7, instruction 7), and W01 and W08 are the same site.

## 8. Required corrections (the commit stage closes each)

1. **The reach of the `:989` stop, in the record.**
   - **Where.** In `record.md`: row 450's claim and reproducer, the FACTS "Measured" line (`:13`), the row 403 bullet (`:51`) and the handover line (`:78`). In `REPORT.md`: sections 9, 15 and 16 and the summary.
   - **What to write.** Say that `CompactFullScalarRange.size` (`Library/RangeInternals.fss:989`) relies on wrapping at the integer bounds on the signed types, and on every descending `NN32` or `NN64` range, `1:0` among them. There `.size` answered 0 on the base and raises `IntegerOverflow` after rung O. Cite `compile-ladder/rung-overflow-natives/probes/skeptic/Sk2RangeW.fss`, `Sk2RangeW-walk-stock.txt` and `Sk2RangeW-walk-edit.txt`, cases W01 and W08, and W09 for `ZZ64` at the bounds.
   - **E10.** In row 450's reproducer, drop E10 or say what it is. Its edit answer, `IntegerOverflow` for `|0:MAX|`, is the specification's (`opr-overview.tex:195-196`). The size is 2^31, which does not fit the `ZZ32` the library's `|…|` returns (`Library/FortressLibrary.fss:3874`), and the base's 0 was wrong.
2. **`MIN # 0` gets its gated home (home 2).**
   - **The file.** Add `ProjectFortress/tests/XXXRangeEmptyHashRungO.fss`. Its body is the draft `probes/skeptic/Sk2EmptyHashDraft.fss`, with the component renamed and the rung's one comment line added.
     - It binds `emptyAtMin = zMin # zero` and asserts `NOT maxInside`, where `maxInside = zMax IN emptyAtMin` (message `ranges.tex:64-65`). Then it asserts `emptySize = 0`, where `emptySize = emptyAtMin.size` (message `ranges.tex:64-65, :103-106`).
     - The membership assertion keeps the file failing if the natives are ever reverted. On the stock classes the draft fails there, because the base's `.size` of the whole range wraps to 0 (`Sk2EmptyHashDraft-walk-stock.txt`). On the edit it stops at `Library/RangeInternals.fss:1423:39` (`Sk2EmptyHashDraft-walk-edit.txt`).
   - **The captures.** Capture it under walk at one thread, stopping with `IntegerOverflow` at `Library/RangeInternals.fss:1423`, and through `explorations/compile-ladder/rung-interp-coercion/harness-one.sh` as an expected failure. Both go into a `.txt` under `probes/repair/`. Grep its component name as in instruction 5.
   - **The record.** Row 450's "By reading, `lo # 0` with `lo` the minimum still overflows under the reorder" becomes measured. On the base `MIN # 0` is the whole range, `MIN:MAX`; after rung O it raises at `:1423`; and the compiled run raises too. Cite `Sk2RangeW` W10 and W11 and `Sk2RangeC` C06, all three ways. Name the new file as its gate.
   - **The counts.** In `record.md`'s gather paragraph and handover line, and in `REPORT.md` sections 16 and 17, the `testSystem` count rises by four, not three.
3. **`|r|` of an `NN32` range (W13) gets its assertion.**
   - **The assertion.** Append to `ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss`, after its `ZZ64` assertion: `uOne: NN32 = unsigned(one)`, `uThree: NN32 = unsigned(three)`, `rN = uOne:uThree`, `rNCard = |rN|` and `assert(rNCard = 3, "ranges.tex:103-106")`.
     - The draft `probes/skeptic/Sk2SizeNN32Draft.fss` runs these lines alone. `rN.size` is 3, and `|rN|` fails with "typecase match failure given NN32", on the stock classes as on the edit (`Sk2SizeNN32Draft-walk-stock.txt`, `Sk2SizeNN32Draft-walk-edit.txt`).
   - **The capture.** Re-capture the file under walk once. Its first failure is unchanged, at the `ZZ64` assertion.
   - **The row.** Row 452's claim becomes: arms for `ZZ32` only, so `ZZ64` and `NN32` ranges fail ("typecase match failure given NN32" for `|1:0|`, `Sk2RangeW-walk-stock.txt` and `-walk-edit.txt`, W13, on the base as after the edit). Its fix becomes: add the `ZZ64`, `NN32` and `NN64` arms, or answer through the `size` getter.

## 9. Recommended rows (not required corrections)

1. **Row 453, append.**
   - **More routes.** Measured on more routes by the second skeptic's `probes/skeptic/Sk2RangeC.fss`, compiled against walk (`Sk2RangeC-compiled.txt`, `Sk2RangeC-walk-edit.txt`). A range near the minimum raises `IntegerOverflow` before its first element, as one near the maximum does. So do the parallel form and a small range whose bounds sum beyond `ZZ32`: C01 `MIN:(MIN+2)` parallel, C02 `seq(MIN:(MIN+2))`, C03 `seq(-1073741826:-1073741824)`, C04 `(MAX-2):MAX` parallel, C05 `seq(MIN # 3)` and C09 `1073741824:1073741826` parallel. Walk counts 3 in each. For three elements `parloop` hands over to `countedseqloop` at `:361`, by reading, so the `XXXSeqMidpointRungO` pair gates these routes too.
   - **The `#` fix.** The prelude's `#` with `sz = 0` at the minimum computes `lo-1` (C06 raises compiled, `:446` by reading). So the row's fix `lo : (lo+(sz-1))` does not cure `MIN # 0`: the fix also builds that empty range without `lo-1`.
   - **The gate.** The prelude's `#` has no compiled gate of its own. The walk file of correction 2 gates the one library that replaces the prelude at the switch-over.
2. **An `NN32` assertion in `XXXRangeBoundsRungO`, optional.** For example, `(unsigned(one):unsigned(zero)).size = 0`, message `ranges.tex:47, :103-106`. The file gates `:989` by site already, and the emptiness-first fix answers 0 for `NN32` by reading. If it is added, re-show the file red with `probes/repair/local-fix.sh` as instruction 1 did, since the file changes.

## 10. Tracked paths

The prefix's loop over this `SKEPTIC.md` prints one line once this commit is made, `MISSING explorations/compile-ladder/rung-overflow-natives/REPORT.md`, which the gather writes from the worker's `reportText`. Every `probes/skeptic/` file it cites is added in the same commit: `Sk2RangeW.fss`, `Sk2RangeC.fss` and their five `.txt` captures; `Sk2EmptyHashDraft.fss` and `Sk2SizeNN32Draft.fss` and their four; `round2-xxx.txt`; and the scripts `run-sk2.sh`, `run-sk2-drafts.sh` and `run-xxx-round2.sh`.

---

# Skeptic, rung O (climb batch 6b): the natives raise IntegerOverflow

**Verdict: refused, once.** The one thing that must change: the record has to report and home the reserved stop that the skeptic's probes meet. Three library bodies give the right answer at the integer bounds only because they wrap, and after the edit they raise `IntegerOverflow` instead:
- `Library/RangeInternals.fss:1423` (`sized1Range`: `lo+ex-1`);
- `Library/RangeInternals.fss:989` (`CompactFullScalarRange.size`: `narrow(r-l+1)`);
- `Library/FortressLibrary.fss:3877` (`CompactFullRange.|self|`: `0 MAX ((u - l') + 1)`).

So `MAX # 1`, `(MAX-2) # 3`, `(1:MIN).size` and `|1:MIN|` raise where the base answered right. The worker's report says otherwise: "A library body found to rely on wrapping: not met" (section 15), and "No library body relies on wrapping" (the summary). record.md's handover line says "No reserved stop was met beyond the two standing ones". Those claims were true of everything the logging pass reached. They are not true of the library.

The code is right. Its natives equal exact arithmetic on 9,133,632 direct checks. Walk now raises on the same cases as the compiled run. The failure was recorded before the edit, and the tests pass under walk and on the compiled path. The record is what must change (section 15 lists it). The provenance block also cites a line that does not say what it claims (section 2).

Every capture below is under `explorations/compile-ladder/rung-overflow-natives/probes/skeptic/`.

## 0. Machine and method

**The machine.** Every run was on this box: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4 (2026-07-21), `FORTRESS_THREADS=1` unless stated. The load average was 4.47 6.16 9.36 at the first probe (11:20 UTC) and fell to about 0.5 by 11:45. Each capture's first line carries its own machine line and load.

**Walk.** Walk ran two ways: on the branch's build (`walk-edit`), and with the four glue classes compiled from `5c368175f` ahead of the build (`walk-stock`, built by `build-stock.sh`). Both used private caches under `tmp/sk/`.

**The compiled path.** It ran against a private copy of `default_repository/caches` (`run-sk.sh compiled`).

**What I did not run.** Nothing touched `default_repository/`, and I ran neither `ant testFast` nor `ant testSystem`.

## 1. The briefing, the batch record and the stops

**What I read.** I read the whole of `facts-extract.sh`'s output for this role (two parts), and `explorations/coordinator/CLIMB-BATCH-6.md` sections 1, 2, 3 (O) and 4.

**The reserved stops.** The stops the record reserves for O (section 3, O, "Stops") are:
- a changed interpreter output or exit code the comparison does not account for;
- a library body found to rely on wrapping;
- a site whose value would change;
- an edit to a file not named;
- a line of C4 or of the APL program.

**What lifts them.** The two standing stops the intro names as lifted are lifted by `explorations/coordinator/POSITIONS.md:65` and `:81`. `POSITIONS.md:120` (2026-09-27) is also in force: "A reversible stop lands, the push and the next batch go ahead, and it is listed for his review", with `explorations/protocol.md:17-20` ("does not hold a push or the next batch when it can be undone: it lands, and it is listed for his review").

## 2. The provenance block (reportText; REPORT.md is not on the branch)

I opened every line the block cites:
- **problem.** `probes/bounds/OverflowBounds-walk-base.txt:1`, `:29` and `:44` say what the block says.
- **spec.** `Specification/basic/operators/opr-overview.tex:155` and `:196` say what the block says. So do `Specification/basic/types-vals-vars.tex:545-550` (the ℤ and ℕ fixed widths), `opr-overview.tex:24-25` (prefix `-`) and `:172-176` and `:205-209` (wraparound). No line cites `Specification/library/apis/`.
- **precedent.** These say what the block says: `explorations/compile-ladder/rung-walk-overflow/natives.patch:1-76` (76 lines), `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:258-261` (`overflow()`), `nativeHelpers/simpleUnsignedIntArith.java:46-59`, `:67-70`, and `simpleUnsignedLongArith.java:56-73`, `:80-83`.
- **deviation.** `NN32.java:105-126` and `UnsignedLong.java:106-127` say what the block says. **`opr-overview.tex:162-163` does not.**
  - Line 162 is "according to the rules of IEEE 754." (underflow) and line 163 is blank.
  - The division-by-zero sentence the block means is at `:164-165`: "The handling of division by zero depends on the type of the number produced. For integer results, division by zero throws a \TYP{DivisionByZero}."
  - Row 336 cites `:165`.

  This is a line that does not say what the block says, and the brief makes that a refusal.
- **historical.** It names all seven files of the 2012 tree that the diff edits: `Int.java`, `Long.java`, `NN32.java`, `UnsignedLong.java`, `intPrim.fss`, `longPrim.fss` and `HeapShakedown.fss`, plus the renamed campaign file.

## 3. The recorded failure

**The failure exists.** `probes/failure-preedit.txt` was committed in `0e4d3214d`, whose stat carries no glue class, so it predates the edit. The renamed test prints `FAIL: row 379: ZZ32 MAX + 1 throws IntegerOverflow; …` with exit 1, and `intPrim` and `longPrim` each print `FAIL: row 379: minimum - 1 throws IntegerOverflow; …` with exit 1. `probes/failure-preedit-v2.txt` does the same for the second text.

**I reproduced it.** I ran the branch's three test files on my own base classes (`tests-walk-stock.txt`). All three fail at the same assertion with exit 1.

## 4. The diff

**The four classes.** `git diff 5c368175f...HEAD -- ProjectFortress/src` touches only the named classes:
- `Negate`, `Add`, `Sub`, `Mul` and `Div` of `Int.java:98-128` and `Long.java:112-142`;
- `Negate`, `Add`, `Sub` and `Mul` of `NN32.java:103-129` and `UnsignedLong.java:104-130`.

**The signed half.** It is `natives.patch` byte for byte: the patch's hunks are the diff's hunks.

**The unsigned half.** It is one guard line before each unchanged `return`. I checked the vendored `com.naturalbridge.misc.Unsigned` (`ProjectFortress/third_party/unsigned/unsigned.jar`, its source inside):
- `lessThan` and `greaterThan` are unsigned comparisons;
- `divide(long,long)` is an unsigned division;
- `toLong(int)` zero-extends.

So the NN32 tests read the high word of an exact 64-bit value, and the NN64 tests are the compiled helpers' own.

**Division by zero** is untouched (row 336). The edit is as small as the test needs.

**Direct check against exact arithmetic** (`SkNativeCheck.java`, `run-nc.sh`). The harness calls the eighteen `f` methods of the classes as built, over 808 operand values (the edges and random values), and compares each answer with `BigInteger`:
- **the edited build** (`SkNativeCheck-edit.txt`): 9,133,632 checks, **0 mismatches**, and every one of the eighteen raises on some pair;
- **the base classes** (`SkNativeCheck-stock.txt`): 3,816,131 mismatches and no raise at all.

Outside the interpreter, `Int.overflow()` cannot reach the library, so this check counts any throw as a raise. That the raise is the catchable `IntegerOverflow` is shown by the Fortress probes of section 11.

## 5. The precedent search

**Signed.** The four ways batch 4's rung O counted are right, and the signed half follows the decision's `natives.patch`.

**Unsigned.** The four team solutions are cited correctly (section 2), and the choice of the compiled helpers' tests is argued.

**The rule 2 count.** The worker gives ten sites in the same four files, by reading: `Int$Pow`, `Int$Choose`, `Long$Pow`, `Long$Choose`, `NN32$Lcm`, `$Choose`, `$Pow`, and `UnsignedLong$Lcm`, `$Choose`, `$Pow`. I read those classes (`Int.java:130-160`, `:220-228`; `Long.java:144-173`, `:232-240`; `NN32.java:137-167`, `:226-233`; `UnsignedLong.java:138-168`, `:227-234`):
- `Int$Gcd`, `Int$Lcm`, `Long$Gcd` and `Long$Lcm` already raise;
- `Rem` and `Mod` cannot overflow except at `MIN REM -1`, which Java answers 0, the right value (`SkRoutes` A12, A13, B07).

The count is right.

## 6. The test

**It exercises the defect.** `ProjectFortress/tests/FixedWidthOverflowRungB.fss` asserts a catchable `IntegerOverflow` on the twelve signed cases of row 379 (`:26-37`) and on four cases at each unsigned width (`:53-56`, `:64-67`). It also has sixteen non-throwing guards (`:39-48`, `:57-59`, `:68-70`).

**It fails on the base and passes on the edit.** On the base it stops at `:26` (section 3). I ran it myself under walk on the edited build (`tests-walk-edit.txt`: `REACHED`, `PASS`, exit 0) and on the compiled path (`FixedWidthOverflowRungB-compiled.txt`: compile 0, `REACHED`, `PASS`, run 0).

**Its comments.** It carries one comment line (`:1`), and it points at `explorations/compile-ladder/rung-overflow-natives/REPORT.md`, which exists only once the gather writes it from reportText.

**The team tests.** `intPrim.fss:19-32` and `longPrim.fss:19-32` add a local helper and two assertions and restate nothing. Both pass on the edit and fail on the base.

**What must stay green.** `WrapOperatorsRungD`, `IntSemanticsRungI` and `UnsignedTest` pass on the edit (`tests-walk-edit.txt`).

## 7. Competing declarations

**The component name.** `FixedWidthOverflowRungB` occurs in `ProjectFortress/` and `Library/` (`.fss`, `.fsi`, `.test`, `.java`, `.scala`, the build directory excluded) only in its own file. No `.test` file, build file or corpus list names `XXXFixedWidthOverflowRungB`.

**The helper.** `overflows` is declared only as a component-local function in `intPrim.fss:19`, `longPrim.fss:19`, `FixedWidthOverflowRungB.fss:6` and `IntSemanticsRungI.fss:6`. No `Library/`, `LibraryBuiltin/`, `compiler_tests/`, `library_tests/` or `test_library/` file declares it.

**The Java tree.** `ProjectFortress/src/com/sun/fortress/` names neither. The Java edit adds no class, method or field.

## 8. record.md

**What checks out.**
- The FACTS entry's natives, specification and gate lines are true as written, and I checked the line ranges.
- "20 raising and 16 non-throwing assertions" is right.
- The checker count, 62, matches all three tables (section 10).
- The rows cited exist. Provisional row 449 is the first free number (the ledger ends at 448), and nothing is renumbered.
- Row 449's evidence holds: the demo stops at `:128` with `Ratio, not a subtype of RR64` on both captures. Its citations hold too: `Library/FortressLibrary.fsi:459` (`opr /(self, other:I):QQ` on `Integral`) and `:278-279` (`Number.asFloat`).

**What must change.**
- **The handover line** says "No reserved stop was met beyond the two standing ones". **The FACTS "Measured" line** and **the row 403 note** say the logging pass found no reliance on wrapping, and that is true only of what the pass reached. All three must name the library sites of section 13.
- **The count on row 427's note.** It says the logging pass after the edit meets no overflow "against 11,940 lines on the base, `probes/demo/HeapShakedown-base-logshadow.txt`". That capture says `OVERFLOW-PROBE lines: 11952`, and so does the raw log (`tmp/pass/baseLogDemos/log/HeapShakedown.txt`: 11,952 tags, 11,940 at a line start). Twelve probe lines follow the demo's progress dots on the same line, and `probe-summary.py:26` counts only lines that start with the tag. No file-level verdict changes (I re-counted every pass directory by substring: the same files carry the tag). The number is still wrong as cited.

## 9. The three homes

**The worker's homes.**
- **Row 379 and the unsigned natives: home 1.** I ran the assertions myself on both paths (section 6), and they pass.
- **Row 427: repaired, with no gated home**, as the row itself says (the demos run in no gated suite, `explorations/coordinator/map/test-coverage.md:26`).
- **Row 449: a ledger row, not an `XXX` test.** This is the worker's decision, on row 427's precedent. It stands, because the defective code is a demo that no suite runs.

**The skeptic's own findings** (section 13) have no home yet:
- **The wrap-reliant range sites.** The specification settles them (`Specification/basic/expressions/ranges.tex:47`, `:64-65`), so they owe home 2.
- **The sequential range at the maximum.** The specification settles it too (`:47`), so it also owes home 2.
- **Numeral folding on the compiled path.** The specification is silent on numeral-only arithmetic, so it owes home 3 (a probe and a ledger note).
- **The duplicate closure class, the `ZZ64` range size and the compiled range midpoint** are notes and rows (section 13).

## 10. The count table

The rung declares a checker count of 62 (REPORT section 11, record.md, the structured result). Its tables `probes/checker-count/before.txt:14` and `after.txt:14` read `#total 62`. The last landed table, `explorations/compile-ladder/climb-batch-6/followup-R/gate/checker-count.txt:14`, also reads `#total 62`. There is no mismatch.

## 11. My differentials (walk against the compiled run, programs the worker did not write)

**`SkRoutes.fss`: the natives by other routes.** It has 45 cases:
- repeated doubling in a `while` loop, and `+=` past the maximum;
- `(MAX + 1) - 1`, `0 - MIN`, `-1 - MAX`, and the minimum juxtaposed with -1;
- `ZZ64` plus a numeral;
- `MIN REM -1` and `MIN MOD -1`;
- `NN32` at 2^31 by `+`, `DOT`, `TIMES` and juxtaposition;
- `NN64` at 2^63, including the divide-back edge `((2^64-1)/3 + 1) DOT 3`.

The results (`SkRoutes-differential.txt`):
- **Base walk** raises on 0 of the 45.
- **Edited walk** raises on 19, and the compiled run raises on the same 19.
- **Of the 26 that fit,** 16 print the same both ways, and 10 differ only because the compiled run prints `NN32` and `NN64` values above the signed half as negative (row 326).
- **Base walk against edited walk:** they differ on exactly the 19 raising cases, so no value that fits changed.
- **At 4 threads,** edited walk prints the same (`SkRoutes-walk-edit-t4.txt`).

The verdict: walk and the compiled run agree, and the specification (`opr-overview.tex:155`, `:196`) is on their side.

**`SkLitFold32a`, `SkLitFold32b`, `SkLitFold64`: numeral-only arithmetic.** The cases are `lit(): ZZ32 = 2147483647 + 1`, `65536 65536` and `ZZ64` `2^62 + 2^62`.
- **Base walk** wraps (`-2147483648`, `0`, `-9223372036854775808`).
- **Edited walk** raises the catchable `IntegerOverflow`.
- **The compiled run** folds the numerals exactly and then dies at run time with the uncatchable `java.lang.Error: Not in range for ZZ32: 2147483648` (and `4294967296`, and `Not in range for ZZ64: 9223372036854775808`). A Fortress `catch` cannot see it, and the program ends with exit 1.

This is a divergence, and it is not this rung's to repair. The specification gives a numeral a type carrying its value (`Specification/basic/expressions/literals.tex:83-86`), and row 325 records that an out-of-range numeral should be a static error. It does not say what `+` on two numerals yields. So this is the silent case, and the compiled side's failure is the less diagnosable one. Recommended as a note on row 325 (section 13).

**`SkLitThunk.fss`.** `sz(fn () => 2147483646 + 1)` prints `2147483647` on both walk builds. The compiled path dies at code generation with `ZipException: duplicate entry: SkLitThunk$\=fn@13\!18-40.class`. That is row 315's duplicate closure class, reached through a function argument whose body is numeral-only arithmetic. It is not this rung's; recommended as a note on row 315.

**`SkRangeEdges.fss`: the library over the natives, walk only.** On the compiled path its first `|_|` on a range is refused by the checker (`SkRangeEdges-compiled.txt`), because the compiler prelude's `Range` has no size operator. Base walk against edited walk:

| case | base walk | edited walk | the specification |
|---|---|---|---|
| E01 `\|(MAX-2):MAX\|` | 3 | 3 | 3 |
| E02, E03 parallel `SUM` at both ends | right | right | |
| E04 `\|MAX # 1\|` | 1 | `IntegerOverflow` | 1 (`ranges.tex:64-65`) |
| E05 `\|(MAX-2) # 3\|` | 3 | `IntegerOverflow` | 3 |
| E06 `SUM` over `(MAX-2) # 3` | 6442450938 | `IntegerOverflow` | 6442450938 |
| E18 `MAX IN (MAX-2) # 3` | true | `IntegerOverflow` | true |
| E09 `\|1:MIN\|` (empty) | 0 | `IntegerOverflow` | 0 (`ranges.tex:47`) |
| E08 `\|MAX:MIN\|` (empty) | 2 (wrong) | `IntegerOverflow` | 0 |
| E10 `\|0:MAX\|` | 0 (wrong) | `IntegerOverflow` | 2^31, which is no `ZZ32`, so the raise is right |
| E11, E14 `for` over `seq((MAX-2):MAX)`, `ZZ32` and `ZZ64` | runs past the top | `IntegerOverflow` after the third element | three elements, then done |
| E16 `for` over `seq((MAX-4):MAX:2)` | runs past the top | `IntegerOverflow` | three elements |
| E12, E13 | 3 | 3 | 3 |

The run also passes at 4 threads (`SkRangeEdges-walk-edit-t4.txt`, identical to the one-thread run).

**The sites, from uncaught runs that print walk's context.**
- `SkTopHash`: `Library/RangeInternals.fss:1423:39`, reached from `Library/FortressLibrary.fss:3888`.
- `SkEmptySize`: `RangeInternals.fss:989:22`.
- `SkEmptyAbs`: `Library/FortressLibrary.fss:3877:28`.
- `SkSeqTop`: `RangeInternals.fss:1081:13-18`. On the base, the fourth element it prints is `-2147483648`.

**`SkSeqTop` and `SkMidRange` on the compiled path.** `SkSeqTop` raises `IntegerOverflow` before its first element. So does `SkMidRange` (`for i <- seq(2^30:(2^30+2))`), which walk runs to its three elements. The compiler prelude splits a range at `z = lo+hi`, under the team's own comment "Danger of overflow here" (`Library/CompilerLibrary.fss:363`, `:377`, `:387`, `:395`, `:404`, `:414`), and its `#` is `lo : (lo+sz-1)` (`:446`). The specification settles this against the compiled run (`ranges.tex:47`), and the repair lies outside this rung, so it is a recommended row.

**`SkWideSize`.** `|widen(1):widen(3)|` ends the run with `typecase match failure given Long` (`Library/FortressLibrary.fss:3876-3880` has arms for `ZZ32` only), while `.size` answers 3. This is a walk defect older than this rung; recommended row.

**Thread counts.** The diff touches no mutable state, field, atomic block or library write, so one thread was the rule. I repeated the two main probes at 4 threads anyway, with the same output.

## 12. The failure-mode question

No loud failure became a quiet value. Every change goes the other way:
- **The eighteen natives.** A wrapped value becomes `IntegerOverflow`, catchable by a Fortress `catch` (`SkRoutes`, and the tests' `overflows` helpers).
- **The sequential range at the maximum.** A loop that on the base never ends (it runs from `MAX` to `MIN` and on) becomes an `IntegerOverflow` after the last element.
- **The three range sites of section 13.** A right answer that came from wrapping becomes `IntegerOverflow`. This is the one direction that is worse, and it is the reserved stop.

## 13. Findings the rung does not repair

1. **A reserved stop: library bodies that rely on wrapping at the bounds**, measured under walk, base against edit.
   - **The sites.**
     - `Library/RangeInternals.fss:1423`, `sized1Range`'s `lo+ex-1`: `MAX # 1` and `(MAX-2) # 3` on `ZZ32` and `ZZ64`. The base built them right, because `lo+ex` wraps and `-1` wraps back.
     - `Library/RangeInternals.fss:989`, `narrow(r-l+1)`: `(1:MIN).size`, where the base answered 0.
     - `Library/FortressLibrary.fss:3877`, `0 MAX ((u - l') + 1)`: `|1:MIN|`, where the base answered 0.
     - By reading, the same shape at `RangeInternals.fss:1426` and `:1429` (the 2-D and 3-D `#`), `:1158` (the strided size) and `Library/FortressLibrary.fss:3878-3879` (the 2-D and 3-D `|..|`).
   - **The specification:** `Specification/basic/expressions/ranges.tex:47` ("the set of n=max(0,b-a+1) integers") and `:64-65` ("a#n is the set of max(0,n) integers {a, …, a+n-1}").
   - **The fix, by the precedent of the strided distance:** reorder and keep the checked operators (`explorations/reviews/wrap-dependent-code.md:155`; `POSITIONS.md:81`). That means `lo + (ex - 1)`, and emptiness tested before the distance (`if u < l then 0 else (u - l) + 1`).
   - **Home 2.** The library is not this rung's to repair (CLIMB-BATCH-6.md section 3, O, "Stops").
2. **The sequential range generators cannot reach the type's maximum.**
   - **The sites.** `CompactFullSeqScalarRange.generate` and `loop` step `i += 1` after the last element (`Library/RangeInternals.fss:1073`, `:1081`), and the strided `StridedFullSeqScalarRange` steps `i += str` (`:1298`, `:1304`, `:1314`, `:1320`).
   - **Both builds are wrong.** On the base a `for` over `seq((MAX-2):MAX)` never ends. After the edit it raises after its three elements.
   - **The specification:** `ranges.tex:47`. Home 2.
3. **Compiled path: numeral-only arithmetic folds to an out-of-range numeral and dies with an uncatchable `java.lang.Error`** (section 11). The specification is silent on numeral arithmetic, so this is home 3, a note on row 325.
4. **Compiled path: row 315's duplicate closure class through a numeral-bodied thunk** (section 11). A note on row 315.
5. **Compiled path: the prelude's range generators overflow at `lo+hi`** for any range whose bounds sum beyond `ZZ32`, before the first element. The specification settles it (`ranges.tex:47`). New row.
6. **Walk: `|r|` of a `ZZ64` range is a `typecase` failure.** New row.

## 14. Stops met

- **"A library body found to rely on wrapping" (CLIMB-BATCH-6.md section 3, O, "Stops"): met,** by the sites of section 13, item 1, which the worker's pass did not reach.
  - **What lifts it.** I read it as reversible: the edit is a revertible Java change, and nothing is deleted. So it is lifted by `POSITIONS.md:120` (2026-09-27: "A reversible stop lands, the push and the next batch go ahead, and it is listed for his review"), with `explorations/protocol.md:17-20`.
  - **What that owes Pavol.** It is listed for his review, which is why the record must name it. If the coordinator reads `:120` as not covering this stop, then it holds the push.
- **The standing stops the intro names:**
  - the rename of row 379's expected failure (`ProjectFortress/tests/FixedWidthOverflowRungB.fss:3`), lifted by `POSITIONS.md:65`;
  - the assertions added to the team's `intPrim.fss:31-32` and `longPrim.fss:31-32`, lifted by `POSITIONS.md:81`.
- **Not met:**
  - **A changed interpreter output.** I checked the comparison's totals (`probes/compare-normalised.txt`: 413 tests, 0 changed; 414 `.fss` at the base less the renamed one).
  - **A site whose value would change.** 22 of the worker's bound cases and all 26 fitting cases of `SkRoutes` keep their values.
  - **An unnamed file, and C4 or APL.** The diff touches only named files.

## 15. What the repair round must do

1. **The stop.** Report the reserved stop of section 14 as met, with the sites of section 13 item 1 and their captures, lifted by `POSITIONS.md:120` and listed for Pavol. This goes in REPORT section 15 and in section 16 ("What comes back to Pavol"), in the summary, and in record.md's handover line. Correct the FACTS "Measured" line and the row 403 note to say the logging pass reached no such site, and that the skeptic's probes found three.
2. **The provenance citation.** In the deviation line, `opr-overview.tex:162-163` becomes `:164-165`. Also check section 6 of the report, which repeats the row 336 point.
3. **Homes for the skeptic's measured defects** (section 13 items 1 and 2: home 2).
   - **The test file.** Write one `XXX` test in `ProjectFortress/tests/` (a new file, so the `testSystem` count rises by one and the manifest's "keeps the testSystem count" no longer holds). It asserts what the specification says: `|MAX # 1| = 1`, `|(MAX-2) # 3| = 3`, `(1:MIN).size = 0`, `|1:MIN| = 0`, and a `for` over `seq((MAX-2):MAX)` visiting three elements and ending.
   - **Show that it is a real check.** Show it failing on the edited tree, and passing, so that the gate would go red, on a deliberate local reorder of the three library bodies, and then revert the reorder.
   - **The stop it meets.** The new file is outside the rung's named files. That is a reversible stop, lifted by `POSITIONS.md:120` and listed.
   - **If the worker decides against it,** the record must say why, as a decision.
4. **The count.** On row 427's note, 11,940 becomes 11,952 probe lines, or the note says that the summary counts only line starts.
5. **The recommended rows** (the structured result's `recommendedRows`): record.md carries them for the gather, provisional numbers after 449.

## 16. Tracked paths

I ran the shared prefix's check over this file. Every path under the compile-ladder directory that it cites is committed on `wip/rung-overflow-natives` with this file, except `explorations/compile-ladder/rung-overflow-natives/REPORT.md`, which the gather writes from the worker's reportText.
