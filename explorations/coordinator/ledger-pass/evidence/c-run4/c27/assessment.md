# Chunk c27, run c-run4, base c124c6b65

Marks: scope, present meaning, evidence, comprehension, ownership, consistency (pass / FAIL).

## Row 20: rewrite
- scope pass; present meaning pass; evidence FAIL: "`Library/List.fsi:112`" now a blank line, the factory is at `:114`; comprehension pass; ownership pass; consistency pass (F-228's "rows 20, 717" agrees).
- Change: the citation to `:114`; the comprehension sentence shortened ("takes a declared type where one directs it, else is built the same way" to "takes a declared type that directs it, else the same join").
- Dropped: nothing. Beyond the evidence: `git show c124c6b65:Library/List.fsi` line 114.

## Row 96: keep
- All six pass. The cited `CovariantCollection.fss:43` holds the APPCOV `fail`, unchanged since the row's commit. The gone probes carry "in the parent of `ed6dafb52`". A `none` row: its re-run is not part of this pass.

## Row 432: measure
- present meaning FAIL (unsure): the row predates F-228 (20474c144), whose fallback leaves an F-bounded parameter open and runs `+` at the operands' types, so `SUM <|1, 2, 3|>` may now run. Notes FAIL comprehension/story: "Rung K's rule chooses only for a type parameter that stands alone". consistency: FACTS F-131 (FACTS.md:187) agrees with the row as it stands.
- Question in `questions.md`. Silent row: `defect` in `silent.txt`.

## Row 510: rewrite
- scope pass; present meaning pass; evidence FAIL: no pinned line for the mechanism; comprehension FAIL: "Repair: pass the declared type into the call's inference (`LHSEvaluator`, `BuildEnvironments`)" is a repair design; ownership pass; consistency pass (F-55 says the same; the signal "record-says-fixed" is a false lead).
- Change: the mechanism pinned at `interpreter/evaluator/LHSEvaluator.java:218` at c124c6b65 (the declared type is read after the call; coerce or refuse at :218-226); the repair sentence becomes the mechanism; the curator's timing kept (P-12).
- Dropped: "Repair: ..." wording (history). The refused batch-17 note (method form) is already in the claim.
- Beyond the evidence: LHSEvaluator.java at the base, lines 205-230.

## Row 705: rewrite
- comprehension FAIL: "since climb batch 14 rung A" (a batch story); ownership FAIL: "siblings: 510, 455" with 455 FIXED.
- Change: siblings 510; 455 named as the compiled half, fixed; "(the inference chapter's walk box)" cut for length.
- Dropped: the batch name (history); "the inference chapter's walk box" (home: `basic/inference.tex`'s walk callout, which F-55 and F-228 cite).

## Row 717: rewrite
- comprehension FAIL: "Since 5dad832f3 the declared type ..." (5dad832f3 is not in the base's history; its landed form is 20474c144) and "On the base it stopped earlier, 'lift param 1 (r:List[\BOTTOM\])'" (a repair story).
- Change: the mechanism cites F-228 in place of the commit; the earlier stop dropped.
- Dropped: the old stop message (history, row 717's earlier line).

## Row 731: rewrite
- evidence FAIL: the reproducer `compiler_tests/InferBigOperatorUnwritten.fss` is a plain test that asserts the plain-bounded success at the bound (`s: ZZ32 = BIG LAST[...]` is 9), not the claim; the cited `FortressLibrary.fss:4396`, `:4402` moved to `:4410`, `:4416` (FACTS.md:122 has the new lines). ownership FAIL: sibling 424 is FIXED.
- Change: reproducer `none`, with the F-bounded refusal's message and its source (`explorations/compile-ladder/rung-argument-context/REPORT.md:115`, rc 255); `InferBigOperatorUnwritten` named as the passing plain-bounded half; lines re-pointed; siblings 716, 817.
- Dropped: "so the distance holds none" (home: FACTS F-53, FACTS.md:50, and F-285); "and the team demos" (home: row 817, now a sibling); sibling 424 (history). No compiled test reproduces the F-bounded refusal; a new `XXX` compiled test is owed (a tree change, not this pass).

## Row 825: rewrite (status stays CONTESTED)
- comprehension FAIL: "since climb batch 22's rung R", "from 64386618b to c3c22817c it stopped at the unwrap's (`List.fss:179`)", "`xs[0:2:2]` answered 2 elements at 64386618b, before ..." (history of commits). evidence: `List.fss` ambiguous, written as `Library/...`.
- consistency FAIL: FACTS F-143 (FACTS.md:199) still names the stop at "`List.fss:179`"; the row and the code now stop at `CovariantCollection.fss:17`. FACTS needs its line corrected by a writer of FACTS.
- No question settled: no POSITIONS entry, so not closed. The reproducer pins walk's present answer, as a contested row's test does.
- Dropped: the old stop site and its commit range, the stride-2 answer at 64386618b (history).

## Row 663: rewrite (status stays CONTESTED)
- comprehension FAIL: "Row 473's `MinMaxReduction.simpleJoin` ... was this shape until climb batch 12 rung G typed the abstract one at `R`; climb batch 11 rung W measured it"; ownership FAIL: siblings 473, 662 both FIXED.
- Change: siblings 825 (the same open-parameter question, on a generic type); the library's absence of the shape cited to F-144; the measuring report kept.
- Dropped: row 473's story (history, row 663; row 473's own line).

## Row 716: rewrite
- comprehension FAIL: "What row 645 leaves after 5dad832f3"; evidence FAIL: "`Library/FortressLibrary.fss:3229` at ee1aa1a95" now `:3394` (`additiveIdentity`), its typecase `:3395`; ownership FAIL: siblings 645 FIXED, 425 DUPLICATE (of 731).
- Change: line re-pinned at c124c6b65; siblings 731, 825; F-143 cited for the open parameter.
- Dropped: the 645 story and the old pin (history).

## Row 824: rewrite
- present meaning FAIL: "`List`'s half is fixed ... since climb batch 22's rung R, where it answered an `ArrayList[\Int\]` ..." (names a fixed half, with its story).
- Change: `List`'s subscript stated as it stands (writes `[\E\]`, answers `List[\E\]`, `WrittenReductionArgumentsWalk`); sibling 825 added.
- Dropped: the old `ArrayList[\FlatString\]` answer of `List` (history; FACTS F-?, FACTS.md:122 records the library change).

## Row 817: measure
- present meaning FAIL (unsure): measured at 3cd33d0b0, outside the base's history, with checker commits landed since; claim opens "past row 710" (710 FIXED); siblings 710 and 621 FIXED. Question in `questions.md`; the outcomes give the line.

## Pairs, duplicates, closes
- No duplicates within the chunk: 20/717/824 share the run-time-class join but at three sites (display, nested clause body, `PureList` subscript); 510/705 at two contexts; 663/825 two shapes of the open parameter. Each names the others as siblings.
- No cross-chunk pairs: 454 (c4), 511, 592 (c31) are other defects.
- No closes.
