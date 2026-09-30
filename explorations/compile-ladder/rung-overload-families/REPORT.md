# Rung L of climb batch 7b: the overload families

*Gather's note (climb batch 7b): written at the gather from the worker's `reportText`. The provisional rows 534 to 537 are cited by their final numbers, 553 to 556; the skeptic's corrections 1, 2, 5 and 7 are made in the provenance block, sections 4 (D4), 7, 9 and 13.*

problem: the last landed gate's count stage, `FortressLibrary` 132 and `RangeInternals` 18 of a total 75, its rows for the array `MIN` and `MAX`, `String`'s juxtaposition, `seq` and `openRangeHelper` (explorations/compile-ladder/climb-batch-6.5b/gate/checker-count.txt:5, :9, :14), and under walk `BIG MAX` over total comparisons refused (ProjectFortress/tests/LibraryOverloadFamilies.fss:47)
spec: an `excludes` clause makes two traits mutually exclusive, so that no trait extends them both (Specification/basic/traits.tex:223-233), and two declarations whose parameter types exclude are a valid overloading (Specification/advanced/overloading.tex:212-216)
precedent: a generic library trait excluding the plain parent of another family, `Range[\I\] ... excludes { Number, String }` (Library/FortressLibrary.fss:3738-3739) and `AnyList excludes { Number, HasRank }` (Library/List.fsi:55); a typecase on the `__thrower` witness with `cast` in each branch, `additiveIdentity` (Library/FortressLibrary.fss:3146-3161)
deviation: the exclusion is written on `StandardMin`, `StandardMax`, `SequentialGenerator` and `FilterGenerator` against the arrays' plain parent `HasRank`, where the overloading judgement measured new marker traits excluded by `ReadableArray` (decision D1, Library/FortressLibrary.fsi:190); the api's `String` states only the part of its component's clause the device needs (decision D3, Library/FortressLibrary.fsi:2349); `openRange` has no `else` branch, so for an index type other than the three the compiled path throws `MatchFailure`, and walk ends the run with the `ProgramError` "typecase match failure given ()->ZZ64", which a `catch e MatchFailure` does not catch (row 558), where both raised an overload failure (decision D4, Library/FortressLibrary.fss:3992-3997)
historical: Library/FortressLibrary.fsi, Library/FortressLibrary.fss, Library/RangeInternals.fsi, Library/RangeInternals.fss

## 1. What I inherited

Nothing. When I started, the branch `wip/rung-overload-families` held no commit past `811053f15`, the worktree was clean and `tmp/rung-overload-families/` was empty. `git log e3214cbf1..811053f15 -- Library/ ProjectFortress/` prints nothing, so the base has not changed under the last landed gate's tables (batch 6.5b's, `e3214cbf1`). Those tables are this rung's before, and I did not run either stage on the base.

## 2. Where the fix belongs

Every family is a declaration of the one library. Walk runs the library, and the count stage reads it through its apis (explorations/coordinator/map/README.md:122). The compiled path does not link the one library before the switch-over (the same row), so no ladder file reaches these declarations. The landed ladder's 85 files pass, and the two microGPT programs stop at `disambiguate` on names the compiler prelude lacks (explorations/compile-ladder/climb-batch-6.5b/gate/ladder/microgpt-phase.md). The compiled checker's rules stay as they are: answer 9 (POSITIONS 2026-09-26) declined the judgement's option 2 (explorations/reviews/overloading-judgement.md section 3.5). No Java or Scala is touched. The one local change to `TypeLatticeOps.java` in section 9 was the expected-failure test's deliberate fix; it was reverted and the tree rebuilt.

## 3. The ways the language and the library offer, the library's first

For every family I listed what the library itself does before choosing.

- **An `excludes` clause against a plain parent of the other family.**
  - `HasRank excludes { Number, AnyMaybe }` (Library/FortressLibrary.fsi:1145).
  - `Rank1`, `Rank2` and `Rank3` exclude `Number` and `String` (:1159-1165).
  - `AnyList excludes { Number, HasRank }` (Library/List.fsi:55).
  - The generic `Range[\I\]` excludes `{ Number, String }` in its component, with the team's comment "Important or the strided factories can't overload!" (Library/FortressLibrary.fss:3738-3739).
  - A generic trait excluding a plain type needs no correspondence of static parameters. That is why it works where a generic `excludes` between two generic families does not (FACTS.md, "The hidden layer, classified": `excludes` among the range kinds removed nothing).
- **A plain marker trait and an `excludes` against it.**
  - `AnyAdditiveGroup` and `AnyMultiplicativeRing`, each a "Place holder for exclusions of" its family (Library/FortressLibrary.fsi:256, :268), are excluded by `Vector` and `Matrix` (:1553, :1671).
  - The judgement measured new markers of this kind over `StandardMin` and `StandardMax` (explorations/reviews/overloading-judgement/variants/overload-devices.py).
- **Plain exclusion traits where a generic `excludes` cannot be written:** `Rank1` to `Rank3`, the "Potemkin exclusion traits" (Library/FortressLibrary.fsi:1156-1166), and `AnyMaybe`.
- **A declaration on the meet:** `SimpleSeqFilterGenerator` extends `FilterGenerator` and `SequentialGenerator` and declares its own `seq` (Library/FortressLibrary.fss:3572-3578). `SimpleMappedSeqGenerator` does the same for `MappedGenerator` and `SequentialGenerator` (:3543-3549).
- **Names where arrow types meet:** the numbered `open1Range`, `open2Range` and `open3Range` beside `openRangeHelper` (Library/RangeInternals.fsi:580-584 after the edit).
- **A choice by typecase on the `() -> T` witness:**
  - `array1` (Library/FortressLibrary.fss:2381-2385), the specification's own example (Specification/appendices/future.tex:241-245).
  - `additiveIdentity` and `multiplicativeIdentity` (Library/FortressLibrary.fss:3146-3178), which wrap each branch in `cast[\T\]` so that the body has the declared type. `cast` is the specification's (Specification/basic/expressions/casting.tex).
- **An api line made to say what its component says:** the record's reading for `PossibleReductionPair` and `Range` (explorations/coordinator/CLIMB-BATCH-7.md section 1, "Read from the record"; row 478's note).
- **Not the library's way, and not taken:**
  - a checker step concluding exclusion from a bound, declined with answer 9;
  - an object witness `N[\n\]`, which the checker refuses without that step (`NullaryObjWitness`);
  - renaming a family's members, which changes a line of every program that calls them.

## 4. The families, each device with the way not taken

| family | before, count / distance | device | after, count / distance |
|---|---|---|---|
| the array `MIN` | 4 / 6 | `StandardMin[\T\]` `excludes { HasRank }` in both files (Library/FortressLibrary.fsi:190, Library/FortressLibrary.fss:242) | 0 / 0 |
| the array `MAX` | 4 / 6 | `StandardMax[\T\]` `excludes { HasRank }` in both files (Library/FortressLibrary.fsi:202, Library/FortressLibrary.fss:254) | 0 / 0 |
| `String`'s juxtaposition against the ring | 3 / 3 | the api's `String` `excludes { AnyMultiplicativeRing }` (Library/FortressLibrary.fsi:2349), which its component already declares (Library/FortressLibrary.fss:4085) | 0 / 0 |
| `String`'s own juxtaposition pair | 1 / 3 | none: the Meet Rule's and batch 8's (probe P2) | 1 / 3 |
| `openRangeHelper` | 3 / 6, and its call in `openRange`'s body 1 | the three declarations removed from both `RangeInternals` files; `openRange[\I\]()` chooses by a typecase on `__thrower[\I\]` among `open1Range(1)`, `open2Range(1, 1)` and `open3Range(1, 1, 1)`, each wrapped in `cast[\OpenRange[\I\]\]` (Library/FortressLibrary.fss:3992-3997) | 0 / 0, the body's error gone |
| `seq`, `ReadableArray` against `SequentialGenerator` and `FilterGenerator` | 2 / 4 | `SequentialGenerator[\E\]` and `FilterGenerator[\E\]` `excludes { HasRank }` in both files (Library/FortressLibrary.fsi:844, :2093; Library/FortressLibrary.fss:1306, :3552) | 0 / 0 |
| `seq`, the other pairs | 3 / 10 | none (sections 11 and 13) | 3 / 10 |

- **The array `MIN` and `MAX`.**
  - An array is never a `StandardMin` or a `StandardMax`. Its elementwise `MIN` is the scalar-extension block's operator (Library/FortressLibrary.fsi:2615-2618), not the trait's.
  - Every library type below `HasRank` is an array trait or one of `Rank` and `Indexed1` to `Indexed3` (Library/FortressLibrary.fss:1715-1747, :1933-1935). None of them extends an order trait, and neither does any type in `ProjectFortress/tests/`, `demos/`, `library_tests/` or `compiler_tests/`. I checked with a grep of every `trait` and `object` header that names an array trait, against `Standard*` and `LexicographicOrder`.
  - The way not taken: the judgement's marker traits `AnyStandardMin` and `AnyStandardMax`, excluded by `ReadableArray`. They clear the same count rows (section 6), but they stop walk (decision D1).
- **`String`'s juxtaposition.**
  - A string is never a ring.
  - The record says nothing declares `String` exclusive of `AnyMultiplicativeRing` (CLIMB-BATCH-7.md section 3, L). That is true of the api only: the component's `String` has excluded `{Number, Char, AnyMultiplicativeRing, AnyList}` since before the revival (Library/FortressLibrary.fss:4084-4085; `4076` at the base).
  - So this family's device is the one the record gives `Range`: the api is made to say what the component says, as far as the api can name it (decision D3).
- **`openRangeHelper`.**
  - Its three declarations differ only in the arrow type of a thunk, and "arrow types do not exclude other arrow types because of overloading" (Specification/basic/types-vals-vars.tex:434-437; the later Types chapter, Documentation/Specification/Prose/Language/types.tick:513-519). The language itself calls the set ambiguous, so it is a library defect (row 553 below).
  - Two of the library's own devices meet here. The numbered names already exist, and the choice among them is the `array1` and `additiveIdentity` typecase on the witness. The typecase is ordered, so no two clauses are ambiguous (Specification/basic/expressions/typecase.tex:90-100).
  - `cast` gives each branch the declared type `OpenRange[\I\]`, which the union of the three branch types would not have (typecase.tex:108-109). `additiveIdentity` does the same.
  - The way not taken: three numbered helpers kept in `RangeInternals` beside the three numbered ranges. It adds names and changes nothing else.
- **`seq`.** Under Q2 = (a) the device is chosen per pair (decision D2).
  - The pairs `ReadableArray`/`SequentialGenerator` and `ReadableArray`/`FilterGenerator` have no common subtype in the library: an array is never sequential and never a filter. Each takes the exclusion against `HasRank`.
  - The pair `SequentialGenerator`/`FilterGenerator` has a common subtype that already declares the meet (`SimpleSeqFilterGenerator`), so no exclusion is true of it. The checker does not read that declaration as the meet of two open traits: it asks for a declaration whose domain is equivalent to their intersection (ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:216-236). The component's `MappedGenerator`/`SequentialGenerator` pair has the same shape (`SimpleMappedSeqGenerator`).
  - The two `DelegatedIndexed` pairs and the component's three other `MappedGenerator` pairs need a header the record does not assign to this rung (decision D5).
- **The two api headers.**
  - The api's `PossibleReductionPair[\R\]` extends `Condition[\PossibleReductionPair[\R\]\]` (Library/FortressLibrary.fsi:1831), as its component does (Library/FortressLibrary.fss:3020).
  - The api's `Range[\I\]` excludes `{ Number, String }` (Library/FortressLibrary.fsi:2112-2113), as its component does (Library/FortressLibrary.fss:3738-3739).
  - In the distance run's export row, the export check's message no longer lists `PossibleReductionPair`. It still lists `Range`, but for its missing members only, no longer for its `excludes` clause.
  - The way not taken for `cond`: narrowing the two `cond` declarations, which breaks the component (probe P1, explorations/compile-ladder/plan-7b/probes/P1.md section 4).
- **`TotalComparison`** (item 22, decided (b)).
  - It now extends `{ Comparison, StandardMinMax[\TotalComparison\] }` in the api and the component (Library/FortressLibrary.fsi:120-122, Library/FortressLibrary.fss:158-160), its five restated members kept.
  - It shares no generic trait with `Comparison`'s partial order, so the exclusion rule reads nothing new. The count stage shows no error at it, and no return-type error at its inherited `MIN` and `MAX` (rung B's fix for row 421 is in the base).
  - Under walk, `BIG MIN` and `BIG MAX` over total comparisons answer `LessThan` and `GreaterThan` again (the new test, lines 47-48).
  - The specification's library chapter lists `TotalComparison`'s supertypes without an order (Specification/advanced-lib/comparison.tex:27-42) and says nothing of `MIN` and `MAX` on comparisons. The added parent extends that listing and contradicts none of it.

## 5. The test, first, and its failure and pass

The manifest sets `testIsStage`: the failure before the edit is the landed count and distance tables, and the pass is the same stages run on this tree (section 6). Beside them I wrote the new interpreter test `ProjectFortress/tests/LibraryOverloadFamilies.fss` first and committed it alone (`65eacfb77`). It calls each family under walk at the base's values and asserts `BIG MIN` and `BIG MAX` over total comparisons as they answered before batch 7. On the base's library it passes every assertion up to line 47 and fails there:

```
$ bash explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-overload-families/h1 ProjectFortress/tests/LibraryOverloadFamilies.fss     # at 65eacfb77
. interpret tmp/rung-overload-families/h1/tests/LibraryOverloadFamilies
Failed to find any matching overload, args = (ArrayList[\TotalComparison\]), overload = {
	BIG MAX[\T extends StandardMax[\T\]\]():BigReduction[\T,FortressLibrary.AnyMaybe\]Library/FortressLibrary.fss:3237:1-3238:49
Tests run: 1,  Failures: 1,  Errors: 0
```

The same command on the edit (`f6a6fff7a`) gives `OK (1 test)`. With the expected-failure test of section 9 added, on the rebuilt tree, it gives `OK (2 tests)`.

## 6. The count stage, before and after

`explorations/coordinator/tools/checker-count/run.sh tmp/rung-overload-families/checker-count-postedit.txt tmp/rung-overload-families/cc-post`, against the landed table:

```
< FortressLibrary	132
> FortressLibrary	106
< RangeInternals	18
> RangeInternals	12
< #total	75
> #total	59
< #locations	62
> #locations	48
```

- The crash line is `#crash none` before and after.
- By name, positions masked, against climb batch 7C's list (explorations/compile-ladder/rung-comprises-checker/probes/checker-count-postedit-errors.txt, the same 75 as the landed table):
  - Gone, 16 in all: `MIN` 4, `MAX` 4, juxtaposition 3 (the three against `MultiplicativeRing`), `openRangeHelper` 3 and `seq` 2 (the two `ReadableArray` pairs).
  - Respelled: the four `generate` errors (the checker's capture defect) are the same four, their messages now naming `PossibleReductionPair` where they named `SomeReductionPair`.
  - Nothing is new.
  - Left: `FORWARD_CMP` 19, `IN` 8, `lift` 6, `map` 4, `generate` 4, `ivmap` 3, `seq` 3, `shift` 2, `CMP` 2, `atMost` 2, `copy` 1, `isLeftZero` 1, `every` 1, juxtaposition 1, `unsigned` 1, `SQCAP` 1.
- The marker device, measured on a private copy of the library (`FORTRESS_AUTOHOME` pointed at it) with everything else as edited, also gives 59. Its 59 errors are identical to this tree's, positions masked.

## 7. The distance stage, before and after

`explorations/coordinator/tools/distance/run.sh tmp/rung-overload-families/distance-postedit.txt tmp/rung-overload-families/dist-post` took 927 s. Compared with the landed table by `explorations/coordinator/tools/distance/compare.sh`:

```
DISTANCE DOWN   624 -> 598 (-26)
    kind overloading            148 -> 123    (-25)
    kind typecheck              387 -> 386    (-1)
    class L1                     39 -> 20     (-19)  overloading: the static-parameter sentence's families
    class M1                    109 -> 103    (-6)  overloading: the Meet Rule
```

Left out of the quote above, and given in the bullets below: the class rows I1 (10 -> 11) and G1 (8 -> 6), the unit rows, and the rows of crash sites gone and new.

- **Site by site** against the landed per-site list (explorations/compile-ladder/climb-batch-6.5b/gate/distance-sites.tsv), positions masked, 26 are gone: `MIN` 6, `MAX` 6, juxtaposition against the ring 3, `openRangeHelper` 6, `seq` 4 (the `ReadableArray` pairs, 2 in the api and 2 in the component) and 1 typecheck error at `openRange`'s call of `openRangeHelper`.
- **By unit:** api `FortressLibrary` 66 -> 53, api `RangeInternals` 9 -> 6, component `FortressLibrary` 362 -> 355, component `RangeInternals` 76 -> 73.
- **Respelled, the same number:** the four `generate` errors, and the export message, which no longer lists `PossibleReductionPair` and lists `Range` without "different excludes clauses for traits".
- **The other moves** are in the families that vary between setups, none at a declaration this rung touches:
  - the two `BIG ||` messages at base `:304` and `:314` name their candidates in another order;
  - `BIG //`'s body error at base `:3443` is now spelled `Comprehension[\Any,String,String,String\]`, and the one at base `:3463` is gone;
  - the second error in `BIG SQCAP`'s body (base `:1569`) is gone, and a body error at base `:3261` (`BigReduction[\RR64,RR64\]`) is back, net 0.
  - These are the sites FACTS.md records as moving from setup to setup with no edit to them ("The true distance to the switch-over"; row 488).
- **The class table's other moves**, I1 10 -> 11 and G1 8 -> 6, are not error moves. `classify.py` assigns G1 and I1 by fixed line ranges of `Library/FortressLibrary.fss` (explorations/coordinator/tools/distance/classify.py:72-76, :106-107), and this edit adds three lines above those sites. The same two `CMP` messages and the same `__cond` message are in both lists.
- **Crash rows:** the nine crash rows are the same declarations, five of them at lines the edit moved.

## 8. Walk: the interpreter tests near the families

- **The subset:** 72 interpreter tests. They are the ones that name a changed trait or one of the families' operators (`grep -l -E 'MIN|MAX|TotalComparison|LessThan|GreaterThan|EqualTo|openRange|seq\(|filter|\bcond\b|distribute|StandardM|HasRank|Sequential|FilterGen|Reduction|Rank'`), plus the five the record names (`ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `RangeTest`, `rangeOperators`, `Generator2Test`) and `RangeZZ32RungJ`, `ExclusionRemainderRungH` and `ResultBoundsRungB`.
- **The run:** through the testSystem harness on the edit, `OK (72 tests)`. The expected failures among them fail as expected. `ArrayScalarExtension` prints its 24 checks and no `fail` line.
- **The before:** the landed gate had every one of them green on this base, so no verdict moved.
- **Left out:** `QuickCheckTest`, since its random shrink can run to the runner's 600 s (FACTS.md, "The one library's scalar ranges are over ZZ32 alone"). The whole suite is the gate's.

## 9. Defects measured, and their homes

- **`openRangeHelper`'s three declarations are ambiguous by the language's rule on arrow types** (row 553). Fixed here. Home 1: the new test's three `openRange` assertions (ProjectFortress/tests/LibraryOverloadFamilies.fss:29-31), which run the new body in each dimension.
- **The api's `PossibleReductionPair` named a parent other than its component's** (row 554). Fixed here. Its gated home is the count stage on the merged tree, where rung C's return-type rule over every instance reads it (probe P1 section 4), as row 421's was in batch 7. Under walk the component runs, and the new test's `cond` assertions (lines 38-40) pin its behaviour.
- **Under walk, a generic call whose arguments share two unrelated supertypes stops the program with an `InterpreterBug`** (row 555).
  - Found while measuring the marker device (decision D1). Walk's join returns every minimal common supertype, and its unification calls `bug` when there is more than one (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:350-381, TypeLatticeOps.java:30-35).
  - The specification settles it: the call is legal. The inference chapter gives the parameter the union of the arguments' types if its bounds permit (Specification/basic/inference.tex:95-98); under the paper's instance rule, which rung S writes, it gets the bound `Any`. Either way the call runs.
  - Home 2: `ProjectFortress/tests/XXXInferTwoCommonParentsWalk.fss`, with the program's own two plain traits and two objects extending both. I showed it through the harness, then red on a deliberate local fix (`TypeLatticeOps.join` answering `FTypeTop` for a join of more than one type), then reverted and rebuilt:

```
$ bash explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-overload-families/hx ProjectFortress/tests/XXXInferTwoCommonParentsWalk.fss
. interpret tmp/rung-overload-families/hx/tests/XXXInferTwoCommonParentsWalk
REACHED
 OK Saw expected exception
OK (1 test)
# the same, on the local fix:
REACHED
PASS
 Missing expected failure
Tests run: 1,  Failures: 1,  Errors: 0
```

  - The library reaches it today, on the base as on the edit (the skeptic's measurement): a `ZZ32` vector and matrix passed to a generic function stop walk with "Join(__DefaultVector[\ZZ32,2\], __DefaultMatrix[\ZZ32,2,2\]) not a singleton: [AnyAdditiveGroup, Generator[\ZZ32\], Indexed1[\2\]]".
  - The judgement's markers would widen it to every ordered type, measured on a private copy of the library: `same[\T\](a: T, b: T)` called with a `ZZ32` and a `String` prints `** bug! Join(Int, FlatString) not a singleton: [AnyStandardMin, AnyStandardMax]`, where this tree and the base print `joined`.
- **The compiled checker applies the Meet Rule for functions to two functional methods, where the specification gives functional methods a rule of their own** (row 556).
  - The specification: "treating functional methods as top-level functions for determining valid overloading is too restrictive ... any type that extends both can include a new declaration that disambiguates them. We use this intuition to allow such overloadings." The Meet Rule for Functional Methods asks for a meet only from a type that provides both (Specification/advanced/overloading.tex:376-409).
  - The checker puts every functional method into the top-level set it checks by the function rule (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:89-104, :201; `isFunction`, :557-562).
  - A program with two open traits of its own, each with `toSeq(self)`, and an object extending both that declares its own `toSeq`, runs under walk and is refused by the checker:

```
$ bin/fortress FnMethodMeet.fss                      # walk
both
$ bin/fortress typecheck -compiler-lib FnMethodMeet.fss
    Invalid overloading of toSeq in component FnMethodMeet:
     AsFilt->String @ .../FnMethodMeet.fss:8:5-32
 and AsSeq->String @ .../FnMethodMeet.fss:5:5-31
```

  - This is the shape of what is left of the `seq` family (section 4).
  - Rung S rewrites that chapter in this batch to the model the checker runs (answer 9). Whether that model keeps the rule for functional methods decides the row's home.
  - No expected-failure test here: `compiler_tests/` is rung C's alone in this batch (CLIMB-BATCH-7.md section 4). The row goes to Pavol (section 13).
- **Two more api headers disagree with their components, seen in the same export message.** Not this rung's declarations (section 4 of the record). Their home is a note on row 554, and the distance stage's export row counts them.
  - `ReductionPair[\R,L\]` extends `SomeReductionPair[\R\]` in the api and `SomeReductionPair[\L\]` in the component.
  - `ActualReduction.distribute` returns `Maybe[\(Reduction[\R\],Reduction[\R\])\]` in the api and `PossibleReductionPair[\R\]` in the component.
  - Sites: Library/FortressLibrary.fsi:1828, :1847; Library/FortressLibrary.fss:3013, :3036.

## 10. Names

This rung adds no name. It removes `openRangeHelper`, which nothing else in the tree names: after the edit, `grep -rn openRangeHelper` over `ProjectFortress/`, `Library/`, `demos/`, `Specification/` and `bin/`, the build directory aside, prints nothing. The `excludes` clauses name `HasRank`, `AnyMultiplicativeRing`, `Number` and `String`, all library types.

## 11. Decisions

- **D1. The array `MIN`/`MAX` and the `ReadableArray` `seq` pairs take `excludes { HasRank }` on `StandardMin`, `StandardMax`, `SequentialGenerator` and `FilterGenerator`, not new marker traits excluded by `ReadableArray`.**
  - The alternative was the judgement's markers `AnyStandardMin` and `AnyStandardMax` with `ReadableArray` excluding them, and for `seq` the markers `AnySequentialGenerator` and `AnyFilterGenerator` the same way.
  - Both devices clear the same count rows: 59, identical lists (section 6).
  - The markers add two plain supertypes common to every ordered library type (numbers, `String`, lists, `TotalComparison`), and walk's inference stops on a join with two minimal supertypes (row 555). Measured: a generic call on a `ZZ32` and a `String` stops walk on the marker copy and runs on this tree. `SimpleSeqFilterGenerator` would carry both `seq` markers the same way.
  - The exclusion against `HasRank` adds no supertype. It is the library's own form of a generic trait excluding another family's plain parent (`Range`, `AnyList`), and it states only what is true of the library (section 4).
- **D2. `seq`, chosen per pair under Q2 = (a).**
  - `ReadableArray`/`SequentialGenerator` and `ReadableArray`/`FilterGenerator` take the exclusion. No library type is below both, and none sensibly can be: an array is neither sequential nor a filter.
  - `SequentialGenerator`/`FilterGenerator` (and the component's `MappedGenerator`/`SequentialGenerator`) take no device. An exclusion would be false (`SimpleSeqFilterGenerator`, `SimpleMappedSeqGenerator`), and the declaration on the meet is already there and the checker does not read it (row 556).
  - The rejected way, splitting `SimpleSeqFilterGenerator` off `FilterGenerator`, changes which branch `__filter`'s typecase takes for it (Library/FortressLibrary.fss:1229-1233) and what `filter` returns. That is a behaviour change outside the rung.
- **D3. The api's `String` gains `excludes { AnyMultiplicativeRing }`, not its component's whole clause.**
  - The component excludes `{Number, Char, AnyMultiplicativeRing, AnyList}`.
  - The api cannot name `AnyList` without importing `List`, which it does not (Library/FortressLibrary.fsi:14-16). `Number` and `Char` could move pairs outside the family; I did not measure that.
  - The export check also lists `String` for its `extends` clause and its missing members, so an equal clause would not clear the entry.
- **D4. `openRange` has no `else` branch.**
  - For an index type other than the three, walk raised "Failed to find any matching overload" at `openRangeHelper`. Now the compiled path throws `MatchFailure`, as the specification says (Specification/basic/expressions/typecase.tex:99-100), and walk ends the run with the `ProgramError` "typecase match failure given ()->ZZ64", which a `catch e MatchFailure` does not catch: walk's typecase leaves the throw commented out (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1441-1442; row 558, gated by `ProjectFortress/tests/XXXTypecaseNoMatchWalk.fss`).
  - No program or test calls `openRange` at another type (grep over every corpus). An `else` that throws something else would invent a behaviour.
  - The way not taken: `else => throw MatchFailure`, the specification's own outcome written out, catchable on both paths. Not taken (the gather's statement of the reason, on the skeptic's F2): it would make walk right at this one typecase and leave every other typecase of the library and of programs with walk's uncatchable failure, whose repair is the throw at walk's own site (row 558); written out here, it would also hide that defect from the one library call that reaches it.
- **D5. `DelegatedIndexed`'s two `seq` pairs and the component's other `MappedGenerator` pairs are left alone.**
  - Their device needs `DelegatedIndexed`'s or `MappedGenerator`'s header, and the record's section 4 does not name either as this rung's. It names `ReadableArray`, `FilterGenerator` and `SequentialGenerator`, the three traits section 3 lists. `DelegatedIndexed.seq` (Library/FortressLibrary.fsi:1306) is a fourth, and `MappedGenerator` exists only in the component.
  - Neither header has a plain parent another header could exclude, so the device is a marker on it. One marker only gives walk's joins one more common supertype, never a second one.
  - Left for batch 8, with that device named.

## 12. What the specification settles

- **The exclusions:** two traits that exclude cannot both be extended by any trait (Specification/basic/traits.tex:223-233), and declarations whose parameter types are incompatible are a valid overloading (Specification/advanced/overloading.tex:175-216). Each clause added states what the library's types already satisfy (section 4).
- **`openRangeHelper`:** arrow types do not exclude (Specification/basic/types-vals-vars.tex:434-437). A typecase is ordered and raises `MatchFailure` when nothing matches (Specification/basic/expressions/typecase.tex:90-109).
- **The api lines:** the export check compares an api's declarations with its component's, and the component is what walk runs.
- **Row 555, against walk:** Specification/basic/inference.tex:83-98.
- **Row 556, against the checker, at the base's text:** Specification/advanced/overloading.tex:376-409.

## 13. For Pavol

**What comes back to Pavol, the record's list** (`coordinator/CLIMB-BATCH-7.md` section 3, L; carried at the gather on the skeptic's correction 5):
- Each family's device, with the way not taken (section 4): the array `MIN` and `MAX`, `StandardMin` and `StandardMax` excluding `HasRank`, not the judgement's marker traits, which stop walk (decision D1); `String`'s juxtaposition, the api's `String` excluding `AnyMultiplicativeRing` as its component does, the way not taken being the whole component clause, which the api cannot name (D3); `openRangeHelper`, removed, `openRange` choosing by a typecase on the witness, not three numbered helpers kept (D4, with `else => throw MatchFailure` not taken).
- The `seq` pairs' devices (D2): `SequentialGenerator` and `FilterGenerator` excluding `HasRank` against `ReadableArray`; the pair of the two traits left, since their meet type already declares `seq` and only a checker change reads it (row 556); `DelegatedIndexed`'s pairs left, their header not assigned (D5).
- The two api lines: `PossibleReductionPair`'s parent and `Range`'s `excludes` clause, each as its component says (`Library/FortressLibrary.fsi:1831`, `:2112-2113`).
- The counts: the count stage 75 -> 59 and the distance stage 624 -> 598 on this rung's tree (sections 6 and 7).
- Item 22, in plain words: `TotalComparison` now extends `StandardMinMax[\TotalComparison\]` beside `Comparison`, so generic code bounded by `StandardMin` or `StandardMax` takes total comparisons; `BIG MIN` and `BIG MAX` over total comparisons answer again under walk (`ProjectFortress/tests/LibraryOverloadFamilies.fss:47-48`), and every comparison value in rung H's test is unchanged.

The rung's own points:

- **The rest of the `seq` family (row 556).** The specification as it stands accepts the whole family, since every type below two of the traits declares its own `seq`. The checker refuses it by applying the function rule to functional methods. The ways:
  1. the checker checks pairs of functional methods by the specification's rule for them, a checker change;
  2. rung S's text takes the checker's stricter rule, and a later library rung restructures `SimpleSeqFilterGenerator` and `SimpleMappedSeqGenerator`, which changes `__filter`'s and `__map`'s choices;
  3. leave the 3 count rows.

  This rung met the stop "a family whose only repair is a checker change" on that pair.
- **`DelegatedIndexed`'s two pairs (decision D5):** one marker header in each file, outside the record's list for this rung.

## 14. What the manifest needs

- On this tree alone the count stage reads 59 (75 - 16), and the crash line is `none`, unchanged.
- On the merged tree, rung C's return-type rule over every instance adds the `cond` pairs under the api's old parent, and this rung's `PossibleReductionPair` line removes them. The merged total is C's and L's changes together, which the gate measures.
- The distance stage on this tree reads 598, with 9 crash rows.
