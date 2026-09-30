# Skeptic: rung L of climb batch 7b, `rung-overload-families`

*Gather's note (climb batch 7b): the provisional rows 534 to 537 are cited by their final numbers, 553 to 556; the gather made the eight corrections and opened or refused the three recommended rows (`compile-ladder/climb-batch-7b/RECORD.md`, rung L).*

**Verdict: approved, with required corrections.** The library diff does what the report says and no more. Both stage tables come out again on my own runs. The new walk test fails on the base at `BIG MAX` and passes on the edit. The expected-failure test counts as one, and it goes red on a local fix. Every new `excludes` clause holds for every type in the tree. The decisions on record are followed. The corrections are to the record and the report, plus two expected-failure tests owed for defects my differentials measured. No correction changes a library line.

What I inherited: an earlier skeptic session for this rung started at 01:54 and was cut off at 02:16. It left scratch under `tmp/rung-overload-families/skeptic/`, with no SKEPTIC.md and no commit. I read its probes. Every result below comes from my own runs under `tmp/rung-overload-families/skeptic2/`. I took only one thing from its scratch, a copy of the base library, which I checked byte for byte against `git show 811053f15:Library/...` before using it. The worker's REPORT.md and record.md are not on the branch because the harness refused the write. I read them as the worker's structured result carries them: the copies in `tmp/rung-overload-families/skeptic/worker-REPORT.md` and `worker-record.md` compare equal to the `reportText` and `recordText` of the worker's StructuredOutput.

## 1. The test: the stage tables, before and after

- **The before is unchanged under the table.** `git log e3214cbf1..811053f15 -- Library/ ProjectFortress/` prints nothing, so the landed gate's tables are the before (POSITIONS 2026-09-28, on rungs re-running measurements). I did not run either stage on the base.
- **Count stage, re-run on the rung's tree.** Command: `explorations/coordinator/tools/checker-count/run.sh tmp/rung-overload-families/skeptic2/checker-count-skeptic2.txt tmp/rung-overload-families/skeptic2/cc-scratch`. A `diff` against the worker's `tmp/rung-overload-families/checker-count-postedit.txt` prints nothing: `FortressLibrary 106`, `RangeInternals 12`, `#total 59`, `#crash none`. The landed `explorations/compile-ladder/climb-batch-6.5b/gate/checker-count.txt` reads 132, 18 and 75.
- **By name, against the 75 errors of `explorations/compile-ladder/rung-comprises-checker/probes/checker-count-postedit-errors.txt`.** 16 are gone:
  - `MIN` 4 and `MAX` 4;
  - juxtaposition 3 (4 to 1);
  - `openRangeHelper` 3;
  - `seq` 2 (5 to 3).
  The 59 are 51 overloading errors and 8 return-type errors, and the 8 are unchanged. The four `generate` errors are the same four, now spelled with `PossibleReductionPair`. The report's diff is the diff of the two tables.
- **The manifest.** `expectedCheckerCount` 59; `expectedCheckerCrash` stays `none`. REPORT §14, record.md and the structured result all declare 59, which matches the table's `#total` (check 10).
- **Distance stage, re-run.** Command: `explorations/coordinator/tools/distance/run.sh tmp/rung-overload-families/skeptic2/distance-skeptic2.txt tmp/rung-overload-families/skeptic2/dist-scratch` (921 s).
  - `explorations/coordinator/tools/distance/compare.sh tmp/rung-overload-families/distance-postedit.txt tmp/rung-overload-families/skeptic2/distance-skeptic2.txt` prints `DISTANCE SAME   598`.
  - Against the landed table: `DISTANCE DOWN   624 -> 598 (-26)`, `kind overloading 148 -> 123`, `class L1 39 -> 20`, `class M1 109 -> 103`.
- **Distance stage, site by site** against `climb-batch-6.5b/gate/distance-sites.tsv`, positions masked. Net gone:
  - `MIN` 6, `MAX` 6, juxtaposition 3, `openRangeHelper` 6 and `seq` 4;
  - one typecheck error at `openRange`'s call of `openRangeHelper`.
  - Respelled: the four `generate` errors and the export message.
  - Moved in the families FACTS records as varying: `BIG ||` 2 and 2, and a `UniqueItem` against a `BigReduction[\RR64,RR64\]` body error.
  - The crash rows are the same nine declarations, at moved lines.
- **Neither difference is a cache or build artefact.** Both stages run with private caches and the overloading memo off. My runs reproduce the worker's tables exactly, and the per-name differences are the families' declarations.

## 2. The walk test and the expected-failure test, run through the harness

- **The base.** `FORTRESS_HOME` pointed at the base library copy; command `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-overload-families/skeptic2/hbase .../LibraryOverloadFamilies.fss .../XXXInferTwoCommonParentsWalk.fss`:
  ```
  .../LibraryOverloadFamilies.fss:47:12-149:
  Failed to find any matching overload, args = (ArrayList[\TotalComparison\]), overload = {
  	BIG MAX[\T extends StandardMax[\T\]\]():BigReduction[\T,FortressLibrary.AnyMaybe\]Library/FortressLibrary.fss:3237:1-3238:49
  Tests run: 2,  Failures: 1,  Errors: 0
  ```
  `git show 811053f15:Library/FortressLibrary.fss | sed -n 3237p` is `opr BIG MAX[\T extends StandardMax[\T\]\]()`, so the run read the base library. `XXXInferTwoCommonParentsWalk` printed ` OK Saw expected exception` in the same run.
- **The edit.** The same command on the worktree prints `OK (2 tests)`.
- **The expected-failure test on a local fix.** I compiled `TypeLatticeOps.java` with `join` answering `FTypeTop.ONLY` for a join of more than one type into `tmp/.../skeptic2/localfix/classes`. That class went on the front of a copy of `harness-one.sh`'s classpath; the tree was not touched. The test prints `REACHED`, `PASS`, ` Missing expected failure`, `Tests run: 1,  Failures: 1`.
- **Nearby tests.** Through the same harness on the edit: `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `RangeTest`, `rangeOperators`, `Generator2Test`, `ExclusionRemainderRungH`, `FlatTowerRungF`, `RangeZZ32RungJ`, `simpleSum` and `zeno` give `OK (10 tests)`.
- **The test files.** Each carries one comment line. Messages are in plain words, with no specification line cited. `LibraryOverloadFamilies.fss` names row 461 in its comment, which is allowed. The file covers every case the record's section lists: the array `MIN`/`MAX` against a scalar, `String` juxtaposition, `openRange` in one, two and three dimensions, `seq` on an array and on a filter generator, both reduction pairs' `cond`, a program's own colon beside the strided factories, and `BIG MIN`/`BIG MAX` over total comparisons.

## 3. The provenance block (REPORT.md, from the structured result)

- I opened every citation with `sed -n`. `checker-count.txt:5`, `:9` and `:14` are `FortressLibrary 132`, `RangeInternals 18` and `#total 75`. `LibraryOverloadFamilies.fss:47` is the `BIG MAX` assertion.
- The spec line holds. `Specification/basic/traits.tex:223-233` is the excludes clause and "no trait can extend them both". `Specification/advanced/overloading.tex:212-216` is the Incompatibility Rule for Functions and Functional Methods.
- The precedent line holds: `Library/FortressLibrary.fss:3738-3739` (`Range ... excludes { Number, String }`), `Library/List.fsi:55` (`AnyList excludes { Number, HasRank }`) and `Library/FortressLibrary.fss:3146-3161` (`additiveIdentity`).
- The deviation line cites `Library/FortressLibrary.fsi:190`, `:2349` and `Library/FortressLibrary.fss:3992-3997`. The historical line names the four library files the diff edits.
- One sentence is wrong, the deviation line's claim that the index type "raises `MatchFailure`". See F2.

## 4. The diff against the passages and the record

- **Scope.** Every edited declaration is one that section 4 of `explorations/coordinator/CLIMB-BATCH-7.md` names as L's:
  - `TotalComparison`'s header under item 22 = (b);
  - the headers of `StandardMin`, `StandardMax`, `SequentialGenerator` and `FilterGenerator`;
  - the api's `PossibleReductionPair`, `Range` and `String`;
  - `openRange`;
  - `openRangeHelper` in both `RangeInternals` files.
  No Java or Scala changed. The batch N integers' `MIN`, `MAX` and `MINMAX` are untouched.
- **Item 22 = (b)** (POSITIONS 2026-09-29, batch 7b's items 22 and 23) is written as decided: `extends { Comparison, StandardMinMax[\TotalComparison\] }` in both files, with the five restated members kept.
- **No exclusion is false of a library type.** A scoped search of every `.fss` and `.fsi` in the tree, with each file's own declarations over the library's (`tmp/.../skeptic2/hier-scoped.py`), finds no type below both sides of any new clause:
  - `HasRank` with each of `StandardMin`, `StandardMax`, `SequentialGenerator` and `FilterGenerator`;
  - `String` with `AnyMultiplicativeRing`;
  - `Range` with `Number` and with `String`;
  - `TotalComparison` with `HasRank`.
  All eight counts are 0. `FilterGenerator` with `SequentialGenerator` has `SimpleSeqFilterGenerator` below both, which is why D2 leaves that pair.
- **The two api lines** now say what their components say. The export message no longer lists `PossibleReductionPair`, and it lists `Range` for "missing members" only.
- **The edit is as small as the families need.** Each family takes one clause or one declaration.

## 5. Differentials (my programs, `tmp/rung-overload-families/skeptic2/probes/`, FORTRESS_THREADS=1)

| program | walk | compiled | outcome |
|---|---|---|---|
| `SkRankArms3`: the array `MIN`/`MAX` device in a program's own types (`SMn[\T extends SMn[\T\]\] excludes { HasR }`, arms `[\T extends Numeric0, I\]`) | `array MIN scalar`, `scalar MAX array`, `3`, `9` | `T is not in the kind env [T$11 -> ..., I$12 -> ...]`, 1 error | divergence; the specification settles it for walk: an `excludes` clause on a generic trait is legal (traits.tex:223-233) and the set is valid by incompatibility (overloading.tex:212-216). Checker defect, F1 |
| `SkRankArms3NoExcl`: the same without the clause | the same 4 lines | the same 4 lines | agree |
| `SkKindNoCalls` (no call), `SkKindTraitImpl` (methods on a trait) | `no call` | the same kind-env error | F1 needs no call |
| `SkKindNoImpl`: no type below the F-bounded traits | 2 lines | the same 2 lines | agree: F1 needs a type providing the functional method |
| `SkRangeLikeKind`: the shape of `Range excludes { Number, String }`, an object below it, a top-level `opr IN` | `true`, `false` | `I is not in the kind env [][][]` | F1 is older than the rung: the component's `Range` device has the same shape |
| `SkWitnessInTrait2`: `openRange`'s typecase reached through a generic trait's own index parameter | `B1`, `B2`, `REACHED`, then `typecase match failure given ()->ZZ64` | `B1`, `B2`, `REACHED`, then `MatchFailure` | agree up to the form of the failure |
| `SkTypecaseCatch`: `try kind[\String\]() catch e MatchFailure => ...` | uncaught `ProgramError: ... typecase match failure given ()->String` | `caught MatchFailure` | divergence; typecase.tex:99-100 settles it against walk. F2 |
| `SkFnMethodMeet3`: `seq`'s shape, three open traits with `step(self)`; `SeqFilt` below two declares its own, `MapFilt` below two does not | `sq onlyseq`, `both seqfilt`, `REACHED`, `mp mapfilt` | 4 errors: 3 component-level pairs, and `Invalid overloading of step in trait MapFilt` | the checker refuses `FtA`/`SqA`, which the functional-method rule accepts (row 556, confirmed); walk runs `MapFilt`, which that rule refuses. F4 |
| `SkTotCmpShape`: `TotalComparison`'s new header in own types, through generic code bounded by each parent | `Lt Eq Lt Gt Eq true false Un` | the same 8 lines | agree |
| `SkLibCmpWalk` (walk only, the library, base and edit) | base: `Unification error ... Cannot unify TotalComparison ... with StandardMin[\T\]` at `lo(GreaterThan, EqualTo)`; edit: `EqualTo`, `EqualTo` | — | the intended change of item 22. On the base `BIG MAX [x <- <|[\TotalComparison\] EqualTo, LessThan|>] x` already answered `EqualTo` (F9) |
| `SkLibJoinWalk` (walk only, base and edit) | both: `** bug! Join(__DefaultVector[\ZZ32,2\], __DefaultMatrix[\ZZ32,2,2\]) not a singleton: [AnyAdditiveGroup, Generator[\ZZ32\], Indexed1[\2\]]` | — | row 555 is reached by the library today. F3 |
| `SkMarkerJoin` (walk only, edit and the worker's marker copy `tmp/.../varhome`) | edit: `twin`, `REACHED`, `twin`; markers: `** bug! Join(Int, FlatString) not a singleton: [AnyStandardMin, AnyStandardMax]` | — | D1's evidence reproduced |

Thread counts: every run at FORTRESS_THREADS=1. The diff touches no mutable variable, field, atomic block or write into library state.

## 6. Findings

- **F1. The compiled checker crashes with "T is not in the kind env" on a generic trait with an `excludes` clause.** The trigger has three parts:
  - a type below the trait that provides its functional method;
  - a top-level function of the same name in the same component;
  - no call is needed.
  The shape is the rung's device, and it is also the component's older `Range` device. Neither stage shows it on the one library: `#crash none` on the count stage, and the same nine crash rows on the distance stage. So the rung's tables stand. I did not find what the library does differently.
  - Walk runs these programs, and the specification makes them legal. So the defect's home is 2: an expected-failure compile test in `compiler_tests/`.
  - That directory is rung C's alone in this batch (section 4), so L cannot write it. It is a required correction for the commit stage on the merged tree, and a recommended row.
  - It is not row 311, the well-formedness walk of synthesized overloading types, which was fixed in `1bd8d3ad1`. The crash is raised at `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:779`.
- **F2. Under walk, a typecase with no matching clause and no `else` does not throw `MatchFailure`.**
  - The specification says it does: "If no matched clause is found, a MatchFailure exception is thrown" (Specification/basic/expressions/typecase.tex:99-100).
  - Walk returns an error, a `ProgramError` that `catch e MatchFailure` does not catch. The team left the throw commented out: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1441-1442`, `// throw new MatchFailure();`.
  - The compiled path catches it.
  - D4, the provenance block's deviation line and row 553's note all say that `openRange` at another index type "raises `MatchFailure`". Under walk, which runs the library today, it raises the uncatchable "typecase match failure given ()->ZZ64". The texts must say so.
  - D4 also did not weigh `else => throw MatchFailure`. That is the specification's own outcome, stated explicitly, and it is catchable on both paths. It is not "something else", so the decision must name it as the way not taken.
  - Home 2: an expected-failure walk test in `ProjectFortress/tests/`. I checked a candidate, `tmp/.../skeptic2/cand/XXXTypecaseNoMatchWalk.fss`, through `harness-one.sh`: ` OK Saw expected exception`, `OK (1 test)`. The same program compiled and run prints `PASS`.
- **F3. Row 555's claim that "the library does not reach it today" is false.**
  - It is false on the base and on the edit alike. `both(v, m)` for a `ZZ32` vector and matrix stops walk with `Join(...) not a singleton: [AnyAdditiveGroup, Generator[\ZZ32\], Indexed1[\2\]]`. The earlier session's `SkArrayJoin` saw the same with `RR64` and `HasRank`.
  - REPORT §9 makes the claim, and so does record.md's row 555, with the reason "its only plain supertypes common to unrelated types, AnyAdditiveGroup and AnyMultiplicativeRing, are both above Number". `HasRank`, `Generator[\ZZ32\]` and `Indexed1[\2\]` are also common minimal supertypes.
  - D1 stands: the markers would widen the defect to every ordered type, as `SkMarkerJoin` shows. Only the sentence about the library is wrong.
- **F4. Walk silently runs a functional method of an object that provides two with no meet declaration** (`SkFnMethodMeet3`, `mp mapfilt`). The Meet Rule for Functional Methods refuses such an object (Specification/advanced/overloading.tex:396-435 at 811053f15), and the compiled checker refuses it too: "Invalid overloading of step in trait MapFilt".
  - The one library has no such type: every type below two `seq` traits declares its own `seq`. So it does not bear on the rung's devices.
  - The gated form of its test would be an expected failure that walk runs, and that is red today. So it is a ledger row quoting the output, with its test due with the fix.
  - The same probe confirms row 556 and sharpens it. The checker already applies the per-provider rule, which is what refuses `MapFilt`. What it adds on top is the function rule over the component-level pairs.
- **F5. REPORT §13, For Pavol, does not carry what the record says comes back to him.** Section 3, L, "What comes back to Pavol" lists:
  - each family's device with the way not taken;
  - the `seq` pairs' devices;
  - the two api lines;
  - the counts;
  - `BIG MIN` and `BIG MAX` restored.
  Item 22's decision also puts `TotalComparison` on his review list, with the fuller explanation he asked for. §13 has only `seq`'s rest and `DelegatedIndexed`.
- **F6. The sibling header mismatches are counted short.** The export message still lists these api headers that differ from their components:
  - `Condition` (the component adds `ZeroIndexed[\E\]`, `Library/FortressLibrary.fsi:854` against `.fss:1330`);
  - `Maybe` (the api adds `ZeroIndexed[\T\]`, `.fsi:916-917` against `.fss:1437-1438`);
  - `ReductionPair` and `ActualReduction.distribute`;
  - `String`'s extends clause (the component adds `DelegatedIndexed[\Char,ZZ32\]`, `.fss:4084`);
  - in `Library/List.fsi:55`, `:67-68` against `List.fss:86`, `:112-113`, the excludes clauses of `AnyList` and `List`, swapped.
  The worker names `ReductionPair` and `distribute` only. They are not L's declarations, apart from `String`'s header, whose extends clause D3 left. Their home is the note on row 554, which must list them all.
- **F7. REPORT §7's `compare.sh` quote omits lines of the output without marking the omission.** The omitted lines are the I1 and G1 class rows, the four unit rows and the ten "crash gone/new" rows. The bullets explain each one.
- **F8. Row 554 mixes anchors.** `.fsi:1828` is `PossibleReductionPair` at 811053f15 in the claim, and `ActualReduction.distribute` after the edit in the notes. The same happens with `:1847` and `.fss:3013`/`:3036`.
- **F9. Row 461's claim was narrower than written.** On the base, the comprehension form `BIG MAX [x <- g] x` over total comparisons answered; the generator-argument form `BIG MAX g` failed. The FIXED note should say which form failed.
- **F10. The rung adds two files to `ProjectFortress/tests/`** where section 4 says one. The worker reports the second as a decision, which the three-homes rule requires. It is not a stop. F2's test would make three.

## Required corrections (the commit stage closes each)

1. Row 555 in record.md and REPORT §9 (F3): replace "The library does not reach it today ..." with the measured fact. A `ZZ32` vector and matrix passed to a generic function stop walk with `Join(__DefaultVector[\ZZ32,2\], __DefaultMatrix[\ZZ32,2,2\]) not a singleton: [AnyAdditiveGroup, Generator[\ZZ32\], Indexed1[\2\]]`, on the base as on the edit. Keep the sentence that the markers would widen it to every ordered type.
2. D4, the provenance block's deviation line and row 553's note (F2): say that under walk `openRange` at another index type ends the run with the `ProgramError` "typecase match failure given ()->ZZ64", which a `catch e MatchFailure` does not catch, and that the compiled path throws `MatchFailure`. Name `else => throw MatchFailure` as the way not taken, with the reason for not taking it.
3. Add `ProjectFortress/tests/XXXTypecaseNoMatchWalk.fss` (F2), the program in `tmp/rung-overload-families/skeptic2/cand/`, shown through `harness-one.sh` as an expected failure. Open its row (recommendedRows).
4. On the merged tree, add an expected-failure compile test to `compiler_tests/` for F1. The program is `SkRangeLikeKind`'s: a generic trait with `excludes { A, B }`, an object below it providing `opr IN`, and a top-level `opr IN(n: A, s: B)`. Pair it with a `.test` whose compile must succeed, and show it through `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`. Open its row (recommendedRows). L cannot write there during the batch (section 4).
5. REPORT §13 (F5): carry the record's list for Pavol: each family's device with the way not taken, the `seq` pairs, the two api lines, the counts (75 to 59, 624 to 598) and `BIG MIN`/`BIG MAX` restored. Add `TotalComparison`'s new parent as the item-22 entry on his review list, in plain words: generic code bounded by `StandardMin` or `StandardMax` now takes total comparisons, and `BIG MIN`/`BIG MAX` answer `LessThan`/`GreaterThan`.
6. The note on row 554 (F6): list every api header the export message still names as differing from its component, each with its file:line pair: `Condition`, `Maybe`, `ReductionPair`, `ActualReduction.distribute`, `String`'s extends clause, and `List.fsi`'s `AnyList` and `List` excludes clauses.
7. REPORT §7 (F7): quote `compare.sh`'s whole output, or mark the lines left out.
8. Row 554 (F8): anchor each line citation to one tree, saying "at 811053f15" or "after the edit".

## For Pavol

- The rest of `seq` (row 556), which the worker also lists. The specification at 811053f15 accepts the `SequentialGenerator`/`FilterGenerator` pair, because `SimpleSeqFilterGenerator` declares its own `seq` (`Library/FortressLibrary.fss:3572-3578`). The checker refuses the pair (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:557-562`).
  - My probe `SkFnMethodMeet3` shows the checker already enforces the per-provider rule. So option (1) is to drop the function rule for pairs of functional methods, keeping what the checker already does per provider.
  - Rung S's text on functional methods decides which side stands.
- `TotalComparison`'s `StandardMinMax` parent (item 22 = (b)) landed: `Library/FortressLibrary.fsi:121`, `Library/FortressLibrary.fss:159`. You asked for a fuller explanation when you have the energy.
  - What changes under walk: generic code bounded by `StandardMin` or `StandardMax` now accepts total comparisons. `lo(GreaterThan, EqualTo)` answers `EqualTo` where the base stopped with "Cannot unify TotalComparison with StandardMin[\T\]". `BIG MIN` and `BIG MAX` over total comparisons answer again (`ProjectFortress/tests/LibraryOverloadFamilies.fss:47-48`).
  - What stays as it was: every comparison value in rung H's test (`ProjectFortress/tests/ExclusionRemainderRungH.fss:14-58`).

## Stops met

- "a family whose only repair is a checker change", on `seq`'s `SequentialGenerator`/`FilterGenerator` pair and the component's `MappedGenerator`/`SequentialGenerator` pair (`Library/FortressLibrary.fss:3572-3578`, `:3543-3549`; `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:216-236`). It is lifted by POSITIONS.md 2026-09-27, on the stops a batch record reserves for him: "These don't need me now. They are reversible things I can review later. Don't block start of next batches on these."

No other stop of the record's intro or of section 3, L is met by the diff as it stands.

## Loud to quiet

- **Total comparisons.** `BIG MIN` and `BIG MAX`, and generic code bounded by `StandardMin` or `StandardMax`, used to fail with an overload failure or a unification error. They now answer `LessThan`, `GreaterThan` and `EqualTo`: the order's least and greatest. Specification/advanced-lib/comparison.tex:27-42 is silent, and item 22 = (b) decided it.
- **`openRange` at an unlisted index type** stays loud. It was an overload failure and is now a typecase match failure, which under walk is uncatchable (F2).
- **Walk's load check** now accepts overload sets whose parameter types the new clauses make exclusive. No test in the corpus relied on such a refusal: 10 of the named tests are OK here and 72 in the worker's run. The gate's suites are the full check.
