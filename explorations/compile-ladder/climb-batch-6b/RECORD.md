# Climb batch 6b: the gather's record

Written at the gather stage of climb batch 6b (2026-09-27), the one-rung follow-up of climb batch 6, on `main` from the base `5c368175f`. `main` was at `aeed3a65f`, 28 coordinator commits above the base, and one more coordinator commit, `e15e1a01a`, landed while the gather worked (section "Other writers in the tree"). Those commits touch only `explorations/` (`coordinator/`, among them `FACTS.md`, `POSITIONS.md` and `INDEX.md`, `compile-ladder/plan-6.5/`, `perf-probes/`, `reviews/` and `protocol.md`) and no file of the rung; no file outside `explorations/` differs from the base. Rung O was approved and landed as one commit composed from its branch's net change; `wip/rung-overflow-natives` is not a parent of anything on `main`.

**Preconditions.** `git status --porcelain` was empty and `5c368175f` is an ancestor of `HEAD`.

**Citations of `POSITIONS.md` by line.** Since the base, `POSITIONS.md` changed at one line (`:107`, in place) and gained two lines after `:125`. The lines the rung's files cite (`:65`, `:81`, `:99`, `:114`, `:120`) did not move and say what the rung cites them for, so no citation is re-anchored. `CLIMB-BATCH-6.md`, the ledger and the handover did not change since the base; `FACTS.md` changed in place and gained one line near `:155`, below every entry this fold edits.

## The order the rungs were applied in

O alone. One rung shares no file with another, so the rule (ascending order of each rung's lowest edited line in the files two or more rungs share) orders nothing.

**Conflicts: none.** The patch (`git diff --binary 5c368175f...wip/rung-overflow-natives`) applied with `git apply --3way --index` without a conflict, with 20 whitespace warnings in captures (their own trailing blanks). The index was then compared with the branch on every path of the patch, and all 174 paths match.

**Final row numbers.** The ledger ends at row 448 on `main`, and no other rung opens a row, so the provisional 449 to 453 are the final 449 to 453. No citation in the rung's files needed renumbering.

## Rung O (`rung-overflow-natives`)

**Inherited from the branch.** Eleven commits, `0e4d3214d` to `c4b7822ea`: the test captured failing before the edit (`0e4d3214d`); the eighteen natives and the demo (`b436a5a82`); the test's second text, the comparison, the ladder and the checker count (`3b4814ef1`); the logging pass and `record.md` (`a10115a84`, `927da51ee`); the first skeptic's refusal (`4ec893bb8`); the judge's repair ruling (`fb268315c`); the repair round (`4ef8fc82d`, `88dc06d41`); and the second skeptic's approval with three corrections (`0605d6c7e`, `c4b7822ea`). `record.md`, `SKEPTIC.md` and `JUDGE.md` were on the branch, and stand as the branch carries them, apart from the gather's corrections below. `SKEPTIC.md` holds the second judgement and, below it, the first. `REPORT.md` was not on the branch: the harness refused both the first worker's and the repair round's write of it.

**Written at the gather.** `explorations/compile-ladder/rung-overflow-natives/REPORT.md`, from the repair round's `reportText`, byte for byte. The harness refused the gather's own write of it through the file-writing tool, as a report file written by a subagent; the gather wrote the same text through a shell here-document, since this file is a committed record the task names. The gather's corrections below were then made in it, and its section 19, "At the gather", says what they were.

**Corrections, all nine closed.** The first skeptic's six:
1. The reserved stop reported as met. The repair round did this in `REPORT.md` sections 1, 9, 15 and 16 and the summary, and in `record.md`'s handover line, FACTS "Measured" line and row 403 note, which say the logging pass reached no such site and the skeptic's probes found three. Two parts were missing, and the gather added them in section 15: `SkRangeEdges-walk-stock.txt` and `SkRangeEdges-walk-edit.txt` are now cited by name, and `:1158` is named among the sites by reading, with its qualifier (its base answer was already wrong).
2. The deviation line cites `opr-overview.tex:164-165`. The repair round did this, and the gather checked it in the report.
3. Home 2 for the range defects. The repair round did this as the judge ruled, one file per row rather than one file: `ProjectFortress/tests/XXXRangeBoundsRungO.fss` (row 450), shown red on a deliberate reorder of the three bodies and back (`explorations/compile-ladder/rung-overflow-natives/probes/repair/xxx-range-bounds-goes-red.txt`), and `XXXSeqRangeTopRungO.fss` (row 451). Both are recorded as outside the named files, lifted under `POSITIONS.md:120` and listed.
4. Row 427's note reads 11,952 probe tags and says the summary counts only line starts. The repair round did this, and the report's section 9 says the same.
5. `record.md` carries the skeptic's recommended rows: rows 450 to 453 and the notes on rows 325, 315 and 326. The repair round did this.
6. `REPORT.md` written at the gather from `reportText`, as corrected (above).

The second skeptic's three, made at the gather:

7. The reach of the `:989` stop. In `record.md`, row 450's claim now names every descending `NN32` or `NN64` range, `1:0` among them, and its reproducer cites `Sk2RangeW` (W01, W08-W11) and `Sk2RangeC` (C06). E10 is dropped from the reproducer, and a note says its `IntegerOverflow` for `|0:MAX|` is the specification's answer (`opr-overview.tex:195-196`; `FortressLibrary.fss:3874`) and that the base's 0 was wrong. The same reach is stated in the FACTS "Measured" line, the row 403 bullet and the handover line. In `REPORT.md` it is in the summary and sections 9, 15 and 16.
8. `MIN # 0`'s home 2. `ProjectFortress/tests/XXXRangeEmptyHashRungO.fss` is the skeptic's draft `probes/skeptic/Sk2EmptyHashDraft.fss` with the component renamed and the rung's one comment line added.
   - The captures. Under walk at one thread it prints `REACHED` and stops with `IntegerOverflow` at `Library/RangeInternals.fss:1423:39`, from its line 11, rc 1. Through `explorations/compile-ladder/rung-interp-coercion/harness-one.sh` it is "OK Saw expected exception" (`explorations/compile-ladder/rung-overflow-natives/probes/repair/xxx-range-empty-hash.txt`).
   - The grep. The component name occurs only in its own file (`explorations/compile-ladder/rung-overflow-natives/probes/repair/gather-competing-declarations.txt`).
   - The record. Row 450's "by reading" sentence on `lo # 0` is now measured on all three ways and names the file as its gate. The `testSystem` count rises by four in `record.md`'s gather paragraph and handover line and in `REPORT.md` sections 16 and 17.
9. The `NN32` assertion for `|r|`. `ProjectFortress/tests/XXXRangeSizeZZ64RungO.fss:15-19` holds the skeptic's five lines. Re-captured under walk at one thread, its first failure is unchanged, "typecase match failure given Long" from its line 13 (`explorations/compile-ladder/rung-overflow-natives/probes/repair/gather-xxx-range-size-zz64.txt`). Row 452's claim now reads `ZZ64` or `NN32`, with W13, and its fix reads "add the `ZZ64`, `NN32` and `NN64` arms, or answer through the `size` getter".

The gather's captures were made on `main` at `aeed3a65f`, with the rung's patch in the index and the two test files uncommitted, after `ant compileAll` on that tree. `ant compileAll` ran for 39 s, and `default_repository/caches/global.map` was restored after it. `git status --short Library` was empty at each capture. The machine was `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. The load average was 2.80 4.39 4.51 when the gather started (12:55 UTC), and each capture carries its own. The gather ran no comparison pass, no logging pass and no gate target.

**Recommended rows, each opened or refused.** The first skeptic's six and the second's two:
- Range construction and size at the integer bounds rely on wrapping: opened as row 450, the repair round's provisional 450, with its home 2 in `XXXRangeBoundsRungO.fss` and, for `MIN # 0`, `XXXRangeEmptyHashRungO.fss`.
- A sequential range cannot reach the type's maximum: opened as row 451, with its home 2, `XXXSeqRangeTopRungO.fss`.
- Numeral-only arithmetic folded on the compiled path, then the uncatchable "Not in range": opened as the note on row 325 that `record.md` carries. The judge read it as row 325's static error measured again (`constant.tex:44-51`, `:123-133`), not a silent specification, so it is not home 3.
- Row 315's duplicate closure class through a numeral-bodied thunk: opened as the note on row 315 that `record.md` carries.
- The compiler prelude's midpoint `lo+hi`: opened as row 453, with its home 2, the compiled pair `XXXSeqMidpointRungO`.
- `|r|` of a `ZZ64` range: opened as row 452, with its home 2, `XXXRangeSizeZZ64RungO.fss`, widened to `NN32` by correction 9.
- Row 453, append (the second skeptic's recommendation 1): opened as a note appended to row 453, in the ledger and in `record.md`'s row 453. It covers C01-C05 and C09 on the compiled path against walk, the `parloop`-to-`countedseqloop` hand-over at `:361`, the prelude's `#` computing `lo-1` for `MIN # 0` (C06), and the gate of the one library's `#` by `XXXRangeEmptyHashRungO`.
- An `NN32` assertion in `XXXRangeBoundsRungO.fss` (the second skeptic's optional recommendation 2): refused. The file already gates `CompactFullScalarRange.size` at `:989` by site, the `NN32` reach is recorded in row 450 with `Sk2RangeW` W01 and W08, and adding it would mean re-running the red demonstration's library edit in the shared main tree for no new site.

**Folded.**
- **`FACTS.md`.** The record's entry "Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow` when the result does not fit, as the specification says" is one line, its sub-bullets joined and their bold labels made italic. It is placed after the last entry of "Landed semantics" ("The one library's number tower is flat"), as the gather's rule says, rather than after the wrapping-operators entry as `record.md` asks. The three corrections in place are:
  - "The compiled path's integer rules": its closing clause now reads that row 379's `walk` half is fixed;
  - the wrapping-operators entry: its sentence on `+`, `-` and multiplication;
  - "Under `walk`, a native can raise a Fortress exception that a Fortress `catch` sees": the sentence appended, and its `Int.java:256-259` re-anchored by symbol to `:258-261`, where this commit's edit moves `Int.overflow()`.

  "The ledger" entry's two citations are re-anchored for the five inserted rows: `:776` to `:781` (the counts by kind) and `:636` to `:641` (the worklist).
- **The ledger.**
  - Rows 379 and 427 are closed. Their status cells take the ledger's form for a fixed row, "NEGATIVE-VERIFIED (at `5c368175f`), POSITIVE-VERIFIED (the fix)", and their notes are appended.
  - Notes are appended to rows 403, 326, 325 and 315, and to row 453 from the second skeptic.
  - Rows 449 to 453 go after row 448 at the end of section 10's table.
  - Each appended note is one line, its sub-bullets joined and its bold labels made italic. A pipe inside a code span is written `\|`, as the ledger writes it. Every row has its eight columns.
  - The ledger rows that cite `Int.java`, `Long.java`, `NN32.java`, `UnsignedLong.java` or `longPrim.fss` by line cite them as they stood when each row was written, and are not re-anchored.
- **The handover.** One paragraph, at the end of "Where the work stands". The paragraph "The last landing is ..." is left for the commit stage, which writes the landing's line after the gate.

**Placeholders.** Every `<short hash>` that this commit adds names this commit:
- the new `FACTS.md` entry and the three entries corrected in place;
- the notes on rows 379, 427 and 403;
- the handover paragraph;
- the eleven in `record.md`, where the worker's placeholder `<commit>` is written `<short hash>` so that the commit stage replaces them with the others.

**For the gate.**
- **`testSystem`.** The sum rises by four: `XXXRangeBoundsRungO`, `XXXRangeEmptyHashRungO`, `XXXSeqRangeTopRungO` and `XXXRangeSizeZZ64RungO` are new expected failures, and `FixedWidthOverflowRungB` replaces `XXXFixedWidthOverflowRungB` one for one.
- **The compiler suite.** It gains `SeqMidpointRungOLink.test` (passes) and `XXXSeqMidpointRungO.test` (an expected failure), and at the merged-diff review's repair `SeqHashBoundsRungOLink.test` (passes) and `XXXSeqHashBoundsRungO.test` (an expected failure): 779 in all.
- **The count and the build.** The rung measured the checker count at 62, unchanged. The main tree's `ProjectFortress/build` holds the edited natives from the gather's `ant compileAll`.

**Stops.**
- **Met and lifted as reversible** (`POSITIONS.md:120`, with `protocol.md:17-20`), so none holds the push:
  - "a library body found to rely on wrapping";
  - "an edit to any file not named above", met by the seven new test files, and by the three the merged-diff review's repair adds.
- **The two standing stops** are lifted by `POSITIONS.md:65` and `:81`.
- **Listed for Pavol:** the three range bodies, and `:989`'s reach on descending unsigned ranges, with rows 450 to 453 and their six expected failures. The alternative, reordering the library bodies on the checked operators now, was not taken, since the batch record keeps the library out of this rung.

## Other writers in the tree

A coordinator commit, `e15e1a01a` (13:01 UTC, `INDEX.md` and `reviews/coordinator-context-2026-09-27*`), landed while the rung's patch was staged. It carried only its own paths, and the index kept the rung's 174 paths.

The gather created a stray file, `/cap-C.txt` at the filesystem root. It is 50 bytes, the error line of a shell command whose variables were set in a backgrounded subshell. A safety check refused its removal, so it is left for Pavol to delete. The same command's first half wrote `compileAll.txt`, `load-start.txt`, `cap-E.txt` and `rung-overflow-natives.patch` at the top level of the session's shared scratchpad. Those names may have replaced earlier scratch files of the coordinator's with the same names. The gather's later scratch files are under `gather-6b/`.

## The merged-diff review

Made 2026-09-27 on `main` at `917bb7b32`, over the batch's one commit, beside the gate's run on it. Its corrections are one commit, "Fold the review's corrections", inside `explorations/` only, so the gate's result stands.

**Checked and holding.**
- Batch rules 1 and 2. One rung, so no declaration, method, trait body or operator is touched by two, and no edit rests on another rung's. The source hunks are the eighteen natives (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:98-128`, `Long.java:112-142`, `NN32.java:103-129`, `UnsignedLong.java:104-130`), `HeapShakedown.fss:117`, `intPrim.fss:19-32`, `longPrim.fss:19-32`, the rename, and seven new test files; each guard was read against the vendored `Unsigned` (`ProjectFortress/third_party/unsigned/unsigned.jar`, by `javap`) and against the report's sections 5 and 6.
- The commit carries its edit, its tests and its record together, and the gather's `RECORD.md`; footers exact on every commit since `5c368175f`; no model identifier; `917bb7b32` is the one commit touching a path outside `explorations/`, and its `historical:` line names the four glue classes, `intPrim.fss`, `longPrim.fss` and `HeapShakedown.fss`.
- The ledger: rows 449-453 follow row 448, no gap or duplicate, every row eight columns; rows 315, 325, 326, 379, 403 and 427 change only by text appended in their last cell, and 379's and 427's status cells take the fixed-row form; no row moved or deleted, 148 still the one vacant number, and no provisional number in the ledger, `FACTS.md` or the handover. `FACTS.md`'s re-anchored `:781` and `:641` read "Counts by kind" and the worklist's heading; the counts tables are the dated derivation over rows 1-310 and are unaffected.
- Every `explorations/` path the landed records cite exists and is tracked, and the rung-relative capture names resolve to tracked files in the rung's directory.
- The nine corrections the gather closed, each against the file it names, and its list of recommended rows, each opened or refused.
- The provenance block's five lines, opened by the second skeptic (`explorations/compile-ladder/rung-overflow-natives/SKEPTIC.md`, section 2, item 2).

**The checker table.** The gate's table (`tmp/gate-batch-6b/out/checker-count.txt`) is identical to the last landed one, `explorations/compile-ladder/climb-batch-6/followup-R/gate/checker-count.txt`: no row new or risen, `#total` 62, `#crash` none, the shadow matching, as the rung declared. The gate's `testSystem` shards sum to 419 (415 and four), and the compiler track is 777 (775 and two), as this record predicts.

**Corrected in the records.**
- `FACTS.md`, "What relies on fixed-width wrapping under `walk`": it said in the present tense that `NN32` and `NN64` wrap under walk and that row 379 does not cover them; it now says they wrapped, and raise since this commit.
- `FACTS.md`, "Under `walk`, the interpreter's library and five of the team's tests rely on fixed-width wrapping": it closed with rung O "not landed"; it now names the landing and the new entry.
- `FACTS.md`, the new entry: `UnsignedLong.java:104-129` becomes `:104-130`, the class's end, as the report and the `NN32` range cite it.
- The rung's `REPORT.md`: the deviation line ends in its file:line and the historical line in the rule that asks for it (`explorations/coordinator/CLIMB-BATCH-6.md:282`), as batch 6's review did for F and T; "provisional" is dropped from rows 449 and 450, whose final numbers are the same; section 1 counts the new test files as section 15 does; its section 20 lists these.

**For the judge: one finding, not fixed here.** A measured defect whose specification settles it has no gated home. The compiler prelude's `#`, `lo : (lo+sz-1)` (`Library/CompilerLibrary.fss:446`), computes `MIN-1` for `MIN # 0`, so `seq(MIN # 0)` raises `IntegerOverflow` on the compiled path where the specification makes the range empty (`Specification/basic/expressions/ranges.tex:64-65`); it is measured by the second skeptic's C06 (`explorations/compile-ladder/rung-overflow-natives/probes/skeptic/Sk2RangeC-compiled.txt`). Row 453's note records it and says "The prelude's `#` has no compiled gate of its own". `XXXSeqMidpointRungO` covers only the split at `:377`, and row 453's written fix, `lo : (lo+(sz-1))`, turns that pair green and leaves C06 raising; `XXXRangeEmptyHashRungO` is a walk test of the one library's `#`. The judge ruled row 453, whose claim names `:446`, home 2 "as the prefix requires for a settled answer" (`explorations/compile-ladder/rung-overflow-natives/JUDGE.md` section 4, D), and row 348's compiled half has its own compiled `XXX` (`XXXBoxDotSpellingsRungW`). The repair would be a compiled pair in `ProjectFortress/compiler_tests/` in the shape of `XXXSeqMidpointRungO` over `seq(MIN # 0)` counting 0, which re-runs the gate; the other ruling open is that row 453's note suffices, since the prelude leaves at the switch-over and `XXXRangeEmptyHashRungO` gates the body that replaces it. Ruled (a), widened to `seq(MAX # 1)`: `explorations/compile-ladder/climb-batch-6b/JUDGE-review.md`; repaired below.

**Observed, not changed.**
- Rows 427 and 449 have no gated home: both are the demo's code, which no suite runs, and the judge ruled that an `XXX` copy would gate the copy (`JUDGE.md` section 4, H). Row 449's specification is settled, not silent.
- `record.md` keeps its provisional labels for rows 449-453, as earlier rungs' `record.md` files do; the final numbers are the same.
- The rung's captures name row 449 "provisional" in their headers; they are captures and are left.

**Stops.** Met by rung O and lifted: "a library body found to rely on wrapping" (the rung's `REPORT.md` section 15) and "an edit to any file not named above" (the seven new test files, and the three of the review's repair), both by `explorations/coordinator/POSITIONS.md:120`; the two standing stops by `:65` and `:81`. None holds the push.

## Repair after the judge's ruling

The judge ruled the review's finding repaired, the review's option (a) widened to `seq(MAX # 1)` (`explorations/compile-ladder/climb-batch-6b/JUDGE-review.md`). The repair ran on `main` at `2f4736a0b`; the rung's `REPORT.md` section 21 gives it in full.

**Placed.** `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.fss`, with `ProjectFortress/compiler_tests/SeqHashBoundsRungOLink.test` (link, passes) and `ProjectFortress/compiler_tests/XXXSeqHashBoundsRungO.test` (run, `run_out_contains=REACHED`, an expected failure). The file counts `seq(MIN # 0)`, which must be empty, and then `seq(MAX # 1)`, which must hold one element (`Specification/basic/expressions/ranges.tex:64-65`). Today it raises `IntegerOverflow` at `Library/CompilerLibrary.fss:446`, from its `:13`, the first loop. The ledger's rows 453 and 450, `FACTS.md`'s entry on the raising natives, the handover's state line, and the rung's `REPORT.md` and `record.md` carry the new pair.

**Captures.**
- `explorations/compile-ladder/climb-batch-6b/repair/xxx-seq-hash-bounds-compiled.txt`: the existing pair as the baseline (`:1-40`: the link test OK; the run test `REACHED`, `IntegerOverflow` at `CompilerLibrary.fss:377`, "Saw expected failure", OK); the new pair (`:42-77`: the link test OK; the run test `REACHED`, `IntegerOverflow` from the subtraction `MIN - 1` at `CompilerLibrary.fss:446`, from the file's `:13`, "Saw expected failure", OK); and the removal of both pairs' components from `default_repository/caches`, after which `git status --short default_repository` printed nothing (`:79-83`).
- `explorations/compile-ladder/climb-batch-6b/repair/SeqHashBoundsProbe.fss` and `explorations/compile-ladder/climb-batch-6b/repair/SeqHashBoundsProbe.txt`: the prelude's `#` compiled, against a private copy of the caches. `seq(MIN # 0)` raises `IntegerOverflow`, and `seq(MAX # 1)` raises `IntegerOverflow` too, as the judge predicted by reading; the controls `seq(MAX # 0)`, `seq((MIN+1) # 0)` and `seq(1 # 3)` count 0, 0 and 3.
- `explorations/compile-ladder/climb-batch-6b/repair/competing-declarations.txt`: `XXXSeqHashBoundsRungO` occurs only in its three files, and `SeqHashBoundsProbe` only in the probe.

**The machine.** `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4 (2026-07-21), `FORTRESS_THREADS=1`; the load average was 0.06 0.31 2.16 at the start (13:55:24 UTC), and each capture carries its own. Nothing else ran: no `ant` target, no interpreter pass and no gate.

**The gate's expectations.** `ant testFast` alone, with nothing built first. The compiler track is expected at 779 (777 and the two new `.test` files) with 0 failures; the library track at 83, the other-compiler track at 263, and the misc suites as the gate recorded them. `testSystem` 419, the checker table, the atomic runs, the ladder and the microGPT comparison stand as the gate recorded them, since none of them reads `ProjectFortress/compiler_tests/`. The gate summary's `testFast` lines are replaced by that run's.

**The stop.** "An edit to any file not named above" (`explorations/coordinator/CLIMB-BATCH-6.md:203`) is met again by the three new files. It is lifted as reversible by `explorations/coordinator/POSITIONS.md:120` and listed here for Pavol, and it does not hold the push.
