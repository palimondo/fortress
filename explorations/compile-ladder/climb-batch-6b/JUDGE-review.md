# Climb batch 6b, merged-diff review: the judge's ruling

Ruled 2026-09-27 on `main` at `85788d183`, which holds rung O's landing `917bb7b32` and the
review's record corrections, on the review's one blocking finding. The gate's outputs were not read,
as the brief requires; the ruling rests on the review, the merged diff and the records.

## 1. The ruling: repair, the review's option (a), covering the prelude's `#` at both ends

The finding holds. The compiler prelude's `#` is `lo : (lo+sz-1)` (`Library/CompilerLibrary.fss:446`,
unchanged since the base). For `MIN # 0` it computes `MIN - 1`, so `seq(MIN # 0)` raises
`IntegerOverflow` on the compiled path (C06,
`explorations/compile-ladder/rung-overflow-natives/probes/skeptic/Sk2RangeC-compiled.txt:8`). The
specification makes that range empty: "The range `a#n` is the set of max(0,n) integers
{a, a+1, ..., a+n-1}" (`Specification/basic/expressions/ranges.tex:64-65`). No landed gate reaches it.
- `XXXSeqMidpointRungO` loops over `seq(lo:hi)` (`ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss:11`)
  and never calls `#`. It fails at the split `z = lo+hi`, `CompilerLibrary.fss:377`
  (`rung-overflow-natives/probes/repair/xxx-seq-midpoint-compiled.txt:28`).
- `XXXRangeEmptyHashRungO` is in `ProjectFortress/tests/`, so it runs under walk only. It exercises the
  one library's `sized1Range` (`Library/RangeInternals.fss:1423`), not the prelude.

So the measured defect sits in home 3's form: a probe and a ledger note (row 453,
`explorations/fortress-gap-ledger.md:464`: "The prelude's `#` has no compiled gate of its own").
- Home 3 is only for a silent specification, and this one is not silent.
- Rung O's judge put row 453, whose claim names `:446`, in home 2 "as the prefix requires for a settled
  answer" (`explorations/compile-ladder/rung-overflow-natives/JUDGE.md:161-178`).
- That judge's instruction for row D gated only the split (`JUDGE.md:434-447`). That is where the gap
  opened.
- This ruling completes that home 2. It is not a new decision.

**Option (b), "row 453's note suffices", is wrong.**
- **It proves too much.** "The prelude leaves at the switch-over" applies word for word to the split,
  and the split was gated anyway: "When it goes green. When the prelude's split is fixed, or when the
  one library replaces the prelude at the switch-over. Either way the gate then says so"
  (`JUDGE.md:174-175`).
- **The switch-over is far off.** It is phase 4 of the plan (`explorations/coordinator/PLAN.md:74`),
  and phase 3's batches have only now been approved (`explorations/coordinator/POSITIONS.md:121`).
  Until then, the prelude is what every compiled program runs.
- **The gate stays useful after it.** After the switch-over the compiled path runs the one library's
  `sized1Range`, whose `lo+ex-1` raises for the same two inputs (row 450,
  `fortress-gap-ledger.md:461`). `XXXRangeEmptyHashRungO` never compiles, so it will not reach that
  code on the compiled path.

**The widening to `MAX # 1` is the judge's decision.** The same line `:446` fails at the top, by
reading: for `MAX # 1`, `(lo+sz)` is `MAX + 1` and overflows before the `-1`, though the range is
`{MAX}` (`ranges.tex:64-65`).
- **Why both ends.** Each of the two half-fixes on record cures one end only:
  - the written fix `lo : (lo+(sz-1))` (`fortress-gap-ledger.md:464`) cures the top and not the bottom;
  - the second skeptic's addition, building the empty range without `lo-1`
    (`rung-overflow-natives/SKEPTIC.md:158`), cures the bottom and not the top.

  One file that asserts both ends goes green only when `:446` is right, as the specification states
  it.
- **The alternative.** The alternative was `MIN # 0` alone, as the review asked. It leaves the top
  ungated behind a half fix, and it saves nothing: the file and the run are the same.
- **Measured first.** The top case has not been measured on the compiled path. Its only earlier probe,
  the skeptic's compiled `SkRangeEdges`, did not compile (`SkRangeEdges-compiled.txt:2-4`). So the
  repair measures it before it asserts it (step 3).
- **It tests `#` alone.** The loop over `seq(MAX # 1)` cannot reach the split: after a correct `#`, the
  range is `MAX:MAX`, and `countedseqloop` takes its `lo=hi` branch (`CompilerLibrary.fss:373-374`).

**The shape.**
- **Two files.** The test takes the two-file shape of a compiled run-time expected failure: a
  plain-named `link` test and an `XXX`-named `run` test with a marker (FACTS.md, "The `XXX`
  expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage
  failure only, and a run-time defect needs two `.test` files"). `SeqMidpointRungOLink.test` and
  `XXXSeqMidpointRungO.test` are its template.
- **Its own file.** A separate file, because it is a separate fix from the split, as rung O's judge
  ruled for row 451 (`JUDGE.md:142`). The walk side is split the same way: `XXXRangeEmptyHashRungO`
  stands apart from `XXXRangeBoundsRungO` because the reorder turns the latter green while `MIN # 0`
  still fails (`fortress-gap-ledger.md:461`).
- **No red demonstration.** None is required. The two-file mechanism was shown red on a deliberate fix
  by rung B (FACTS.md, same entry), and this rung showed its first `XXX` file red (`XXXRangeBoundsRungO`,
  `rung-overflow-natives/probes/repair/xxx-range-bounds-goes-red.txt`). A probe with controls fixes
  what the file fails for, as `SeqMidpointControl` did for the split.

**The gate.** The repair adds three files under `ProjectFortress/compiler_tests/` and edits records
under `explorations/`. It changes no Java, no library, no `tests/` file and no build input.
- Of the gate's stages, only the compiler track of `ant testFast` enumerates `compiler_tests/`.
- `testSystem` runs `ProjectFortress/tests/`; the checker count runs over the interpreter library; the
  ladder runs its fixed pass-list; the atomic runs and the microGPT comparison run their named programs.
- **What to re-run.** `ant testFast` alone, with nothing built first. The compiler track is expected at
  779 (777 plus the two new `.test` files), with 0 failures, and the other tracks as the gate recorded
  them.
- **What stands.** The rest of the gate stands as recorded.
- **No interpreter passes.** The repair runs no comparison pass, no logging pass, and no interpreter
  run at all.

## 2. What the specification settles

- `a#n` is exactly max(0,n) integers, from `a` to `a+n-1` (`ranges.tex:64-65`, read `:44-72`). For
  `MIN # 0` that is the empty set; for `MAX # 1` it is `{MAX}`.
- Every element fits `ZZ32`, so only an intermediate the prelude chose to compute overflows. The
  overflow rule (`Specification/basic/operators/opr-overview.tex:195-196`) has nothing to say about a
  range whose elements fit.
- The divergence is settled against the compiled run, so it is rule 4's first outcome.
- The repair lies outside this rung's files, so it is the fourth case: home 2 and a ledger row.
- Nothing here is silent.

## 3. Who was right

- **The review is right** on the finding, the citations, the shape of the test and option (a).
  - One phrase is loose. "The fix row 453 writes down, `lo : (lo+(sz-1))`, would turn that pair green"
    holds only of the whole written fix. The `#` reorder cannot turn `XXXSeqMidpointRungO` green,
    since that file never calls `#`; the `floorAverage` half does. The conclusion stands: after the
    whole written fix, C06 still raises.
  - It was wrong to offer (b) as an equal ruling, for the reasons in section 1.
- **The second skeptic** was right to measure C06 all three ways and to call the written fix
  incomplete (`SKEPTIC.md:5`, `:97`, `:158`).
  - It was wrong to leave the compiled half to a note on the ground that the prelude leaves at the
    switch-over (`SKEPTIC.md:113`).
  - Its own opening lists `MIN # 0` on the compiled path among the measured defects with no gated home
    (`SKEPTIC.md:5`).
- **The gather** followed the skeptic. It recorded the gap honestly and did not close it
  (`climb-batch-6b/RECORD.md:49`).
- **Rung O's judge** placed row 453 in home 2 correctly, but its instruction gated the split only.

## 4. Considered and left as ruled

- **Rows 427 and 449.** Both are the demo `HeapShakedown`'s code, which no gated suite runs
  (`explorations/coordinator/map/test-coverage.md:26`, `:228`). Rung O's judge ruled that an `XXX`
  copy would gate only the copy (`JUDGE.md:200-202`), and that ruling stands.
- **The natives left open by reading** (`Pow`, `Choose`, the unsigned `Lcm`; row 379's last note). They
  are unmeasured, so the three-homes rule does not reach them yet.
- **The stop "an edit to any file not named above".** The three new files are outside O's named files
  (`explorations/coordinator/CLIMB-BATCH-6.md:195`, `:203`), so the stop is met again. It is
  reversible and lifted by `POSITIONS.md:120`, as it was for the first seven, and the files are listed
  for Pavol. It does not hold the push.

## 5. Instructions for the repair worker

**Setup for every step:**
- Work in `/home/user/fortress` on `main`, from the repository root.
- Do not source `explorations/experiment/env.sh`. Its `rm -rf /tmp/fortress*rats` would remove the
  Rats! directories of the distance-triage run that shares this tree.
- The helpers in `explorations/compile-ladder/rung-overflow-natives/probes/repair/` set `JAVA_HOME`,
  `FORTRESS_HOME` and `JAVA_FLAGS` themselves (`cap.sh:5-8`, `run-compiled.sh:6-13`,
  `run-junit.sh:6-10`).
- In every shell set `S=explorations/compile-ladder/rung-overflow-natives/probes/repair` and
  `R=explorations/compile-ladder/climb-batch-6b/repair`.
- Run no `ant` target, no interpreter pass and no gate.

1. **The state.**
   - `pgrep -af 'ant |junit|gate-batch-6b'` prints no gate process. If one is running, wait for it
     (poll every 30 s), and do not read `tmp/gate-batch-6b/out/`.
   - `git log --oneline -1` shows `85788d183` or a later coordinator commit.
   - `git status --short ProjectFortress Library default_repository` prints nothing.
   - Then `mkdir -p $R`.

2. **The baseline.** Run:

   ```
   bash $S/cap.sh $R/xxx-seq-hash-bounds-compiled.txt "1. the existing compiled pair, the baseline" 1 bash $S/run-junit.sh SeqMidpointRungOLink XXXSeqMidpointRungO
   ```

   Expected, in the form of `$S/xxx-seq-midpoint-compiled.txt:10-41`:
   - the link test: `OK (1 test)`;
   - the run test: `REACHED`, then `IntegerOverflow` from `countedseqloop` at
     `Library/CompilerLibrary.fss:377`, then "Saw expected failure" and `OK (1 test)`.

   If it prints `NoSuchMethodError: fortress.CompilerBuiltin...`, the caches are stale:
   1. Wipe `default_repository/caches/*`.
   2. Run `git checkout -- default_repository/caches/global.map`.
   3. Rebuild the five libraries in the background, in the shared prefix's order (about 145 s).
   4. Repeat this step.

3. **The probe.** Write `$R/SeqHashBoundsProbe.fss` exactly as below (the text between the fences):

   ```
   component SeqHashBoundsProbe
   export Executable

   object RunsPast extends UncheckedException end

   sz(f: () -> ZZ32): String =
     try
       (f()).asString
     catch e
       IntegerOverflow => "IntegerOverflow"
       RunsPast => "RUNS PAST (a fourth element)"
       Exception => "OTHER"
     end

   run(): () = do
     zMax: ZZ32 = 2147483647
     zMin: ZZ32 = -2147483647 - 1
     zero: ZZ32 = 0
     one: ZZ32 = 1
     three: ZZ32 = 3
     println("H1 for over seq(MIN # 0), count = " sz(fn () => do
         var n: ZZ32 = 0
         for i <- seq(zMin # zero) do n += 1; if n > 3 then throw RunsPast end end
         n end))
     println("H2 for over seq(MAX # 1), count = " sz(fn () => do
         var n: ZZ32 = 0
         for i <- seq(zMax # one) do n += 1; if n > 3 then throw RunsPast end end
         n end))
     println("H3 for over seq(MAX # 0), count = " sz(fn () => do
         var n: ZZ32 = 0
         for i <- seq(zMax # zero) do n += 1; if n > 3 then throw RunsPast end end
         n end))
     println("H4 for over seq((MIN+1) # 0), count = " sz(fn () => do
         var n: ZZ32 = 0
         for i <- seq((zMin + one) # zero) do n += 1; if n > 3 then throw RunsPast end end
         n end))
     println("H5 for over seq(1 # 3), count = " sz(fn () => do
         var n: ZZ32 = 0
         for i <- seq(one # three) do n += 1; if n > 3 then throw RunsPast end end
         n end))
     println("END")
   end

   end
   ```

   Then run:

   ```
   bash $S/cap.sh $R/SeqHashBoundsProbe.txt "SeqHashBoundsProbe: the prelude's # at the integer bounds, compiled" 1 bash $S/run-compiled.sh $R SeqHashBoundsProbe
   ```

   Expected:
   - `compile rc=0`;
   - H1 `IntegerOverflow` (C06 again);
   - H2 `IntegerOverflow` (by reading: `(lo+sz)` at `:446`);
   - H3 `0`, H4 `0`, H5 `3`;
   - `END`, then `run rc=0`.

   If the compile fails, or H3, H4 or H5 differ, stop and report with the capture: the test of step 4
   would then fail for another reason. If H2 prints `1`, go on: the file's second loop then passes
   today and still gates `:446` at the top. Carry H2's measured value into steps 7, 9, 10 and 12.

4. **The test.** Write `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss` exactly as below.
   Its one comment line is line 1, and its first loop is line 13.

   ```
   (*) explorations/compile-ladder/rung-overflow-natives/REPORT.md

   component XXXSeqHashBoundsRungO
   export Executable

   run(): () = do
       println("REACHED")
       zMax: ZZ32 = 2147483647
       zMin: ZZ32 = -2147483647 - 1
       zero: ZZ32 = 0
       one: ZZ32 = 1
       var n: ZZ32 = 0
       for i <- seq(zMin # zero) do
           n += 1
           assert(n < 2, "ranges.tex:64-65")
       end
       assert(n = 0, "ranges.tex:64-65")
       var m: ZZ32 = 0
       for i <- seq(zMax # one) do
           m += 1
           assert(m < 2, "ranges.tex:64-65")
       end
       assert(m = 1, "ranges.tex:64-65")
       println("PASS")
     end

   end
   ```

   Then write the two `.test` files from the template, and check both with `cat`:

   ```
   sed 's/XXXSeqMidpointRungO/XXXSeqHashBoundsRungO/' ProjectFortress/compiler_tests/SeqMidpointRungOLink.test > ProjectFortress/compiler_tests/SeqHashBoundsRungOLink.test
   sed 's/XXXSeqMidpointRungO/XXXSeqHashBoundsRungO/' ProjectFortress/compiler_tests/XXXSeqMidpointRungO.test > ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.test
   ```

5. **The new pair.** Run:

   ```
   bash $S/cap.sh $R/xxx-seq-hash-bounds-compiled.txt "2. the new pair" 1 bash $S/run-junit.sh SeqHashBoundsRungOLink XXXSeqHashBoundsRungO
   ```

   Expected:
   - the link test: `OK (1 test)`;
   - the run test: `REACHED`, then `IntegerOverflow` with frames at `Library/CompilerLibrary.fss:446`
     and at `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss:13`, then "Saw expected failure"
     and `OK (1 test)`.

   Any other failure is a stop; report it with the capture. That means a compile or link error, or a
   failure at a line other than `:13`.

   Then remove the new components from the caches and confirm nothing is left:

   ```
   find default_repository/caches \( -name '*SeqHashBoundsRungO*' -o -name '*SeqMidpointRungO*' \) -exec rm -rf {} +
   git status --short default_repository
   ```

   Append both commands and the status, which must be empty, to
   `$R/xxx-seq-hash-bounds-compiled.txt`.

6. **Competing declarations.** Check that each new name occurs only in its own new files. In the form
   of `$S/competing.sh:6-10`, run for each of `XXXSeqHashBoundsRungO` and `SeqHashBoundsProbe`:

   ```
   grep -rn "$n" ProjectFortress Library $R --include='*.fss' --include='*.fsi' --include='*.test' --include='*.java' --include='*.scala' --exclude-dir=build
   ```

   Write the output to `$R/competing-declarations.txt`, with a header line saying what was grepped
   and at which `HEAD`.

7. **The ledger** (`explorations/fortress-gap-ledger.md`). Append only: add each text inside the row's
   last cell, before its closing ` |`, with no line break. Write no `<short hash>`.
   - **Row 453 (`:464`).** Append this text, with `<H2>` replaced by "raises `IntegerOverflow`" or by
     "counts 1", as measured:

     > At the merged-diff review of climb batch 6b the prelude's `#` got its own compiled gate (`compile-ladder/climb-batch-6b/JUDGE-review.md`): `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss` with `SeqHashBoundsRungOLink.test` (link, passes) and `XXXSeqHashBoundsRungO.test` (run, `run_out_contains=REACHED`, an expected failure). It counts `seq(MIN # 0)`, which must be empty, and then `seq(MAX # 1)`, which must hold one element (`ranges.tex:64-65`); today it raises `IntegerOverflow` from `:446` in its first loop (`compile-ladder/climb-batch-6b/repair/xxx-seq-hash-bounds-compiled.txt`). The probe `compile-ladder/climb-batch-6b/repair/SeqHashBoundsProbe.fss` (`SeqHashBoundsProbe.txt`) measures the prelude's `#` compiled at both bounds: `seq(MIN # 0)` raises, `seq(MAX # 1)` <H2>, and `seq(MAX # 0)`, `seq((MIN+1) # 0)` and `seq(1 # 3)` count 0, 0 and 3. The reorder `lo : (lo+(sz-1))` cures the top and leaves the bottom; building the empty range without `lo-1` cures the bottom and leaves the top; the file goes green when `:446` does both, or, after the switch-over, when row 450's fix does both in the one library's `sized1Range`, which the compiled path then runs. This note supersedes the sentence above that the prelude's `#` has no compiled gate of its own.

   - **Row 450 (`:461`).** Append:

     > The compiled half of `MIN # 0` and of `MAX # 1` is gated by `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss` (row 453, added at the merged-diff review of climb batch 6b), which after the switch-over reaches this row's `sized1Range` on the compiled path.

8. **FACTS, the handover and their copies.** All in place.
   - In `explorations/coordinator/FACTS.md:105` and its copy
     `explorations/compile-ladder/rung-overflow-natives/record.md:14`, replace
     "and the compiler prelude's range midpoint `lo+hi` (row 453, `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss`)."
     with
     "and the compiler prelude's range midpoint `lo+hi` and its `#` at the integer bounds, where `seq(MIN # 0)` raises (row 453, `ProjectFortress/compiler_tests/XXXSeqMidpointRungO.fss` and, from the merged-diff review, `XXXSeqHashBoundsRungO.fss`)."
   - In `explorations/microgpt-run-c-handover.md:23` and its copy `record.md:78`, make two
     replacements:
     - "Five expected-failure tests outside the rung's named files" becomes "Six expected-failure tests
       outside the rung's named files".
     - "and the compiled pair `XXXSeqMidpointRungO`. The `testSystem` count rises by four and the
       compiler suite gains two `.test` files." becomes "and the compiled pairs `XXXSeqMidpointRungO`
       and `XXXSeqHashBoundsRungO` (the prelude's `#` at the integer bounds, added at the merged-diff
       review, `compile-ladder/climb-batch-6b/JUDGE-review.md`). The `testSystem` count rises by four
       and the compiler suite gains four `.test` files."
   - In `record.md:74`, row 453's copy, append the same text as step 7's row 453 note.
   - At the end of `record.md:82`, append:

     > At the merged-diff review's repair a sixth expected failure, the compiled pair `XXXSeqHashBoundsRungO` (`XXXSeqHashBoundsRungO.fss`, `SeqHashBoundsRungOLink.test`, `XXXSeqHashBoundsRungO.test`), joins them on the judge's ruling (`compile-ladder/climb-batch-6b/JUDGE-review.md`), so the compiler suite gains four `.test` files in all.

9. **`explorations/compile-ladder/rung-overflow-natives/REPORT.md`.**
   - At the end of section 13's D bullet (`:121`), append:

     > The prelude's `#` at the integer bounds (`:446`), measured by the second skeptic's C06, has its own compiled pair since the merged-diff review, `XXXSeqHashBoundsRungO` (section 21).

   - Replace section 16's first bullet (`:163`) whole with:

     > - **Six new expected-failure tests, outside the named files.** `XXXRangeBoundsRungO`, `XXXRangeEmptyHashRungO` (added at the gather), `XXXSeqRangeTopRungO` and `XXXRangeSizeZZ64RungO` run under walk; `XXXSeqMidpointRungO` and `XXXSeqHashBoundsRungO` (added at the merged-diff review's repair, section 21) are compiled pairs. Rows 450 to 453. The `testSystem` count rises by four, and the compiler suite gains four `.test` files.

   - After section 20, add `## 21. At the merged-diff review's repair`, in plain sentences. It says:
     - The review found the compiled prelude's `#` without a gated home, and the judge ruled it
       repaired (`explorations/compile-ladder/climb-batch-6b/JUDGE-review.md`).
     - What `XXXSeqHashBoundsRungO` asserts (`Specification/basic/expressions/ranges.tex:64-65`) and
       why it covers `MAX # 1` too.
     - The probe's five values, with the H2 measurement stated as measured.
     - The baseline pair and the new pair through `fortress junit`: link OK; run `IntegerOverflow` at
       `Library/CompilerLibrary.fss:446` from the file's `:13`; "Saw expected failure".
     - The empty `git status --short default_repository` afterwards.
     - The competing-declarations result.
     - The machine: `nproc`, the CPU model and MHz, the load average at the start, the JDK, and
       `FORTRESS_THREADS=1`.
     - The three files meet the stop "an edit to any file not named above" again. It is lifted by
       `explorations/coordinator/POSITIONS.md:120` and listed.
     - Nothing else ran: no `ant` target and no interpreter pass.
     - The coordinator re-runs `ant testFast` alone, and the compiler track is expected at 779.
     - Cite every capture by its full `explorations/compile-ladder/climb-batch-6b/repair/` path.

10. **`explorations/compile-ladder/climb-batch-6b/RECORD.md`.** Five edits in place, then one new
    section at the end.
    - `:75`: "It gains `SeqMidpointRungOLink.test` (passes) and `XXXSeqMidpointRungO.test` (an expected
      failure)." becomes "It gains `SeqMidpointRungOLink.test` (passes) and `XXXSeqMidpointRungO.test`
      (an expected failure), and at the merged-diff review's repair `SeqHashBoundsRungOLink.test`
      (passes) and `XXXSeqHashBoundsRungO.test` (an expected failure): 779 in all."
    - `:81`: "met by the seven new test files." becomes "met by the seven new test files, and by the
      three the merged-diff review's repair adds."
    - `:83`: "with rows 450 to 453 and their five expected failures." becomes "with rows 450 to 453 and
      their six expected failures."
    - `:111`: at the end of the paragraph, append "Ruled (a), widened to `seq(MAX # 1)`:
      `explorations/compile-ladder/climb-batch-6b/JUDGE-review.md`; repaired below."
    - `:118`: "(the seven new test files)" becomes "(the seven new test files, and the three of the
      review's repair)".
    - At the end, add `## Repair after the judge's ruling`. It gives:
      - what was placed, with the three files' paths;
      - each capture's path under `explorations/compile-ladder/climb-batch-6b/repair/`;
      - H2's measured value;
      - the clean `git status --short default_repository`;
      - the machine;
      - the gate's expectations, as below;
      - the stop, as below.

      The gate's expectations:
      - `ant testFast` alone, with nothing built first;
      - the compiler track 779, with 0 failures;
      - the library track 83, the other-compiler track 263, and the misc suites as the gate recorded
        them;
      - `testSystem` 419, the checker table, the atomic runs, the ladder and the microGPT comparison
        stand, since none of them reads `ProjectFortress/compiler_tests/`.

      The stop: "an edit to any file not named above" is met again by the three files. It is lifted
      by `explorations/coordinator/POSITIONS.md:120` and listed for Pavol, and it does not hold the
      push.

11. **The tracked-path check.** First stage every new file. Then run the shared prefix's loop, with
    its `grep -oE` over these four files:
    - `explorations/compile-ladder/climb-batch-6b/RECORD.md`
    - `explorations/compile-ladder/climb-batch-6b/JUDGE-review.md`
    - `explorations/compile-ladder/rung-overflow-natives/REPORT.md`
    - `explorations/compile-ladder/rung-overflow-natives/record.md`

    Every path it prints must exist and be tracked. Fix any line it prints.

12. **Commit on `main`, and do not push.**
    - `git add` by explicit list, these thirteen paths:
      - `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss`,
        `ProjectFortress/compiler_tests/SeqHashBoundsRungOLink.test`,
        `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.test`;
      - `$R/SeqHashBoundsProbe.fss`, `$R/SeqHashBoundsProbe.txt`,
        `$R/xxx-seq-hash-bounds-compiled.txt`, `$R/competing-declarations.txt`;
      - `explorations/fortress-gap-ledger.md`, `explorations/coordinator/FACTS.md`,
        `explorations/microgpt-run-c-handover.md`;
      - `explorations/compile-ladder/rung-overflow-natives/REPORT.md`,
        `explorations/compile-ladder/rung-overflow-natives/record.md`,
        `explorations/compile-ladder/climb-batch-6b/RECORD.md`.
    - Read `git diff --cached --stat` before committing. Nothing under `default_repository/` or
      `tmp/` may be staged.
    - The title: "Climb batch 6b: the compiled prelude's # gated at the integer bounds, on the
      merged-diff review's ruling".
    - The body says:
      - what was placed;
      - H2's measured value;
      - that the compiler track is expected at 779;
      - the line "historical: none; the three new files under ProjectFortress/compiler_tests/ are the
        revival's own".
    - End with the shared prefix's two footer lines. No model identifier.
    - On an `index.lock` error, retry once after a few seconds.
    - Then tell the coordinator:
      - re-run `ant testFast` alone, with nothing built first;
      - the compiler track is expected at 779 with 0 failures, the library track at 83, the
        other-compiler track at 263, and the misc suites as recorded;
      - `testSystem` 419, the checker table, the atomic runs, the ladder and the microGPT comparison
        stand;
      - the gate summary's `testFast` lines are replaced by that run's.

## 6. For Pavol, out of the loop

- **The ruling.** The compiled prelude's `#` gets a compiled expected-failure test,
  `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO` (three files). It asserts that `seq(MIN # 0)`
  is empty and that `seq(MAX # 1)` has one element, as `ranges.tex:64-65` says. Today it raises
  `IntegerOverflow` at `Library/CompilerLibrary.fss:446`.
- **One decision.** Covering `MAX # 1` beside the review's `MIN # 0` was the judge's decision, taken
  so that a half fix of `:446` cannot turn the gate green. The alternative was `MIN # 0` alone. The
  specification is not silent on either case.
- **A stop, lifted.** The three files meet the reserved stop "an edit to any file not named above"
  again. It is reversible and lifted by `POSITIONS.md:120`, listed here, and it does not hold the push.
- **The cost.** One re-run of `ant testFast`. This gate's took 13 min 44 s under load, batch 6's
  5 min 29 s. Nothing else re-runs. The repair's own runs are three compiled runs and no interpreter
  pass.
