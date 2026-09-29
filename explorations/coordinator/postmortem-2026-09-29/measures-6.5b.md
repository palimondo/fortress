<!-- The coordinator's measurements of batch 6.5b given to Pavol in chat on 2026-09-29 between 17:52 and 18:10 UTC, put on record for the post-mortem: what the batch changed in Fortress, what it committed beside that, where its tokens went by stage, and which interpreter tests vary from run to run. -->

# Batch 6.5b, measured

Batch 6.5b: rungs V (`RR32` a sibling of `RR64`, `e455ccd98`) and E (a size's range and walk's integer natives, `413f36ac0`), run `wf_07b95462-a7d`, from base `382b9fe7f` to its landing `e3214cbf1`. Measured by the coordinator from git and from the run's transcripts, 2026-09-29.

## What it changed in Fortress

`git diff --numstat 382b9fe7f e3214cbf1`, by area:

- Library (`Library/`, `ProjectFortress/LibraryBuiltin/`): 5 files, +149 -80. `RR32`'s api declaring its operators (`FortressBuiltin.fsi`, +50 -1), its component (+38 -40), the range bodies reordered (`RangeInternals.fss`, +48 -30), `FortressLibrary.fsi`/`.fss` (+13 -9).
- Interpreter and checker (`ProjectFortress/src/`): 8 files, +134 -25. Walk's integer natives (`Int.java` +30 -6, `UnsignedLong.java` +24 -4, `NN32.java` +6 -5, `Long.java` +1 -1) and size reading (`EvalType.java` +21 -5, `BaseEnv.java`, `IntNat.java`); the checker's size-range check (`TypeWellFormedChecker.scala` +50 -2).
- Specification text: 2 files, +90 -4 (`changes.tex` +81 -2, one Appendix I entry; `numbers.tex` +9 -2).
- Tests: 50 files, +713 -48, and 4 renamed. The interpreter suite (`tests/`): 21 files, +374 -39: 2 new tests of the new behaviour (`PowChooseLcmRungE`, 50 checks; `RR32SiblingRungV`, 37), 5 promoted from expected failures, 8 new expected failures (5 refusals of an out-of-range size or overflowing size arithmetic under walk, 3 defects found on the way), 6 edited (specification citations moved). The compiler suite (`compiler_tests/`): 26 files, +211 -13, mostly link-and-run pairs pinning compiled-path crashes (`^` on `ZZ32`, `NN32`, `NN64`; `try` as an operand; `CHOOSE`'s table; the two owed from batch N, rows 447 and 505) and one refusal test. The library suite: 3 files, +22, one pair (row 528).

## What it committed beside that

The batch's own record directories (`compile-ladder/rung-rr32-sibling/`, `rung-size-range/`, `climb-batch-6.5b/`): 866 files, +46K lines.

- Reports (`.md`): 14 files, 1.9K lines.
- Captured run outputs (`.txt`, `.tsv`, `.out`, `.log`): 228 files, 37K lines. The largest: `rung-rr32-sibling/probes/build/edit-tex.txt`, the LaTeX build log, 17K lines; `rung-rr32-sibling/probes/passes/compare-edit-vs-baseA-only.txt`, an output comparison, 3K; `rung-size-range/probes/repair/anchor-raw-final.txt` and `anchor-raw.txt`, citation-check dumps, 1.9K and 1.2K; `climb-batch-6.5b/gate/distance-sites.tsv`, 625.
- Probe programs and test drafts (`.fss`, `.fsi`, `.test` under `explorations/`): 247 files, 5.5K lines.
- Scripts and small files: 377 files, 1.9K lines.
- Cited by name in any tracked `.md`: 283 files, 36K lines. Cited by none: 583 files, 9.5K lines.

## Where its tokens went

From the run's 17 agent transcripts, `message.usage` deduplicated by message id: 0.64M output, 17.2M written to cache, 571M read from cache. The batch review's own measure gives 6.15M tokens for the run (`reviews/batch-6.5b-review.md`); that figure is the one comparable with earlier batches. By stage, new tokens (cache writes) and cache reads:

- rung V: 181 min, 328 calls, 6.5M new, 127M read.
- rung E: 161 min, 280 calls, 4.7M new, 130M read.
- skeptics E and V: 0.8M new, 79M read.
- E's judge, repair and second skeptic: 1.2M new, 67M read (E's first skeptic refused it for 7 wrong citations of 181).
- the gather, twice (the VM restart at 14:35): 0.9M new, 67M read.
- the review, its judge, its repair and the second review: 2.2M new, 79M read.
- the gate, its judge, its repair and the commit: under 1M new; the gate judge's 38 minutes were 30 minutes of a permission prompt in manual mode (16:42 to 17:11 UTC).

The two rung workers took 63% of the new tokens. Each ran the whole interpreter corpus three times (twice on the unchanged base, once after all its edits), in the background at 30 to 60 minutes a run; both rungs ran their two base runs on the same base, four runs where one pair would do; rung V's kill of its own runner by script name across the machine also killed rung E's (`reviews/batch-6.5b-review.md`, finding 4).

## The interpreter tests that vary from run to run

The 18 tests the three-run comparison filters out (`rung-size-range/probes/compare-3pass.txt`, `unstable-check.txt`) are all the team's own, present at `a874948ac`: `ArrayListQuick`, `CovCollTest`, `HeapTest`, `PureListQuick`, `QuickCheckTest`, `ReflectiveQuickCheckTest`, `ShuffleTest`, `SkipListTest`, `TimingTests`, `TreapTest`, `WordCountSmall`, `abortBlock`, `buffons`, `nestedTransactions1` to `4`, `quicksortTest`. They use random inputs, timings or thread order by design, print values that vary, and pass or fail correctly: by a rough grep, 16 of the 18 contain checks (assertions, `fail`, properties), and `SkipListTest` and `buffons` fail only on a crash. Their varying output matters only to the revival's corpus-wide output comparison, which the team's pass-or-fail suite never did.
