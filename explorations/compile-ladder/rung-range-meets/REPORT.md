# Rung R of climb batch 9: the ranges' Meet Rule pairs and their declared types

*Row numbers are the final ones, assigned at climb batch 9's gather: the rung's provisional 587, 588 and 589 are rows 599, 600 and 601. The gather made the skeptic's four required corrections here, each marked "(the gather, correction N)".*

- problem: the landed per-site list's 188 sites this rung owns, the first `explorations/compile-ladder/gate/distance-sites.tsv:26` (CAP in `BoundedScalarRange`); the count's `RangeInternals 102`, `explorations/compile-ladder/climb-batch-8/gate/checker-count.txt:9`
- spec: the Meet Rule for Functional Methods, `Specification/advanced/overloading.tex:469` (section "Meet Rule"); membership, intersection and size of ranges, `Specification/basic/expressions/ranges.tex:131`, `:138`, `:140` (section "Ranges")
- precedent: a declaration on the meet in the type that provides both, `CompactFullScalarRange`'s own `opr IN(n: ZZ32, self)` (`Library/RangeInternals.fsi:426`, `:400` at fa14a190c) and `Nothing`'s two `SQCAP` (`Library/FortressLibrary.fsi:1014`); a new object at a meet, `SimpleMappedIndexed` (`Library/FortressLibrary.fss:3567`); `cast` for a run-time type narrower than the static one, `openRange` (`Library/FortressLibrary.fss:4043`)
- deviation: the rank-2 and rank-3 `CAP` meets' second bodies wrap `combine2D`/`combine3D` in `cast[\BoundedRange[\…\]\]` (`Library/RangeInternals.fss:631`); `SimpleMappedSeqIndexed` takes an `Indexed` and is sequential through its callers, not by a type (`Library/FortressLibrary.fsi:2396`); `UniformDistribution` reads `range.forward().left` where row 586 named `range.left` (`Library/Random.fss:373`)
- historical: `Library/RangeInternals.fsi`, `Library/RangeInternals.fss`, `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`, `Library/Random.fss` (all edited; first edits `Library/RangeInternals.fsi:46`, `Library/RangeInternals.fss:106`, `Library/FortressLibrary.fsi:988`, `Library/FortressLibrary.fss:1506`, `Library/Random.fss:373`; added by climb batch 9's merged-diff review)

The harness refused the write of this file; the gather writes it from this text.

## 1. What the rung found and what it changed

Climb batch 8's rung O made the compiled checker's per-provider Meet Rule check correct. That check found 97 pairs in the range types, `Just` and the full sequential ranges. The distance stage lists 91 more errors in `RangeInternals` and the ranges section of `FortressLibrary`, which makes the record's 188. On this rung's tree, 152 of the 188 are gone and 36 are left, each family with a ledger row (section 6). The count falls from 56 to 1, and the distance from 565 to 416 (section 4).

Branch `wip/rung-range-meets`, base fa14a190c. The tests are in commits f10b6dbc4 and 0ea0c916b; the edit is 702e62058. Nothing under `ProjectFortress/src/` changed: no Java, no Scala, no build.

### 1.1 The Meet Rule pairs, 97: declarations on the meet

For two functional methods a type provides, the checker asks for a third declaration provided by that type. Its domain must be below both, and without the self parameter it must equal their meet (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:569-592`, `withoutSelf` at `:595`, row 569). Each device is a declaration in the providing type, as the library already does for `IN` in `CompactFullScalarRange` and `StridedFullScalarRange` and for `SQCAP` in `Nothing`:

- **CAP, 24 sites** (12 scalar types, api and component). `BoundedScalarRange` declares `opr CAP(self, other: Range[\ZZ32\]): BoundedScalarRange` (`Library/RangeInternals.fsi:230`; body `Library/RangeInternals.fss:506-507`, a `fail` as `ScalarRange`'s own at `:151-152`). All 12 types are below `BoundedScalarRange`, the meet of `ScalarRange` and `BoundedRange[\ZZ32\]`.
- **CAP, 40 sites** (the 2D and 3D bounded types, two pairs each, api and component).
  - Each of `LeftRange2D`, `RightRange2D`, `FullRange2D` and their rank-3 twins declares `opr CAP(self, other: Range[\…\])` and `opr CAP(self, other: Range2D)` (or `Range3D`), answering `BoundedRange[\…\]`. Api: `Library/RangeInternals.fsi:277-278`, `:337-338`, `:393-394`, `:294-295`, `:356-357`, `:412-413`. Bodies: `Library/RangeInternals.fss:629-633`, `:757-761`, `:946-950`, `:661-666`, `:789-794`, `:1006-1011`.
  - `FullRange2D`'s declarations cover `CompactFullRange2D` and `StridedFullRange2D`.
  - The first body is `Range2D`'s own `fail`. The second is `Range2D`'s `combine2D` of the scalar intersections inside a `cast`: the return-type rule asks for a type below `BoundedRange[\…\]`, and `combine2D(ScalarRange, ScalarRange)` answers `Range2D`.
- **IN, 30 sites.**
  - `FullRange[\I\]` declares `abstract opr IN(n: I, self): Boolean` (`Library/FortressLibrary.fsi:2262`, component `Library/FortressLibrary.fss:3963`). It is the meet of `Range`'s and `Generator`'s, abstract as `Range`'s is (`Library/FortressLibrary.fsi:2183`); every full range type below it declares its own.
  - `FullRange2D` and `FullRange3D` declare `IN` with `Range2D`'s body (`Library/RangeInternals.fss:951-954`, `:1012-1015`).
  - `OpenRange2D/3D` and `ExtentRange2D/3D` declare `IN` answering `true` (`Library/RangeInternals.fss:338`, `:356`, `:476`, `:498`). That is what `OpenRange`'s and `ExtentRange`'s answer, and what `Range2D`'s answers through their scalar ranges.
  - For row 580, see 1.4.
- **SQCAP, 1 site.** `Just` declares `opr SQCAP(self, o: Maybe[\T\]): Maybe[\T\] = Nothing[\T\]` (`Library/FortressLibrary.fsi:988`, `Library/FortressLibrary.fss:1506`), P2's device Q.
  - It is the meet of `Maybe`'s `(Maybe, Maybe)` and `Just`'s `(Just, UniqueItem)`.
  - Its body is `Maybe`'s own (`Library/FortressLibrary.fss:1478`). An argument that is a `Just` or a `NotUnique` dispatches to `Just`'s more specific declarations (`:1507-1508`), so this one only ever meets `Nothing`.
- **map, 2 sites** (row 583): see 1.3.

No device states an exclusion: the rung adds no `excludes` clause.

### 1.2 The slips, 55, repaired to what their bodies and callers do

All lines in this section are at fa14a190c, as the landed per-site list names them.

- **The export check** (X1, `RangeInternals.fss:12`). `ExportChecker.scala:744-753` asks that every bodiless member of a component trait be `abstract` in the api, as `FortressLibrary`'s api writes `Range`'s. The api now says so for:
  - `ScalarRange.intersectWithExtent`;
  - the rank-2 and rank-3 `range1`, `range2`, `range3`, `every` and `recombine`;
  - `BoundedScalarRange.nonemptyUpwardIntersectionWithPoint`.

  (`Library/RangeInternals.fsi:49`, `:58-62`, `:75-80`, `:87-93`, `:106-112`, `:235` on the edit.)
- **Declared types narrowed to what every body answers.** These clear RG at `:175`, `:183`, `:234`, `:242`, `:312`, `:1323` and `:1360`, and `BoundedScalarRange`'s typecase at `:492`.
  - `ScalarRange` declares `every` and `atMost` answering `ScalarRange`, and its `CAP` answers `ScalarRange` (`Library/RangeInternals.fsi:46-48`).
  - `BoundedScalarRange` declares `flip` and `every` answering `BoundedScalarRange` and `atMost` answering `FullScalarRange`, the meets with `BoundedRange`'s (`:227-229`).
  - `FullScalarRange.forward(): FullScalarRange` and `CompactFullScalarRange.forward(): CompactFullScalarRange = self` (`:368`, `:428`; `Library/RangeInternals.fss:1041`).
- **Declared types widened to what the body answers:**
  - `FullScalarRange.forwardIntersection` answers `BoundedScalarRange` (`:838`);
  - `StridedFullRange2D/3D.recombine` answer `FullRange2D/3D` (`:1325`, `:1362`);
  - `FullRange3D.indices` is a generator of triples (`:913`);
  - `OpenRange.narrowToRange(OpenRange)` answers `Range[\I\]` (`FortressLibrary.fss:3843`);
  - `RightRange.leftOrRight` answers `I`, as `BoundedRange`'s and `RangeWithLeft`'s do (`FortressLibrary.fss:3933`).
- **Three other declarations:**
  - `ExtentScalarRange`'s `CAP` takes a `ScalarRange`, as `OpenScalarRange`'s and `BoundedScalarRange`'s do (`:425`);
  - `ScalarRange.indexOf` answers a `fail`, which `LeftScalarRange`, `RightScalarRange` and `FullScalarRange` override (`:191`, `:251`; `Library/RangeInternals.fss:154`);
  - `StridedFullScalarRange`'s `|self|` is `self.size`, the default walk already ran through `Indexed` (D2, `:1148`, `:1249`).
- **The `check()` factories.** The six factories that called `check()` and answered its `ScalarRange` now bind the range, check it and answer it (`:445`, `:587`, `:701`, `:1367`, `:1374`, `:1381`), as `Range2D.check` binds `_ = self.range1.check()`.
- **Typos against the in-file shape:**
  - the two rank-3 `SYMMETRIC_PARTIAL:` are written as the rank-2 forms are (`:106`, `:120`);
  - `map`'s static argument is the pair the function answers (`:1069`, `:1100`, `:1314`, `:1349`);
  - the `indices` functions answer `ZZ32` (`:965`, `:1133`);
  - `self.stride` for `self.stride.get` (`:874`, `:919`);
  - the subscripts pass all six arguments, the right end `l + fr s`, as the scalar `opr[]` at `:858` does (`:885`, `:931`);
  - `CompactFullRange3D.bounds` passes six arguments, as the rank-2 form at `:1065` does (`:1096`);
  - `StridedFullSeqScalarRange.seq` passes three, as the parallel one at `:1154` does (`:1255`);
  - each of the six tuple shifts uses its own component (row 503: `:637`, `:641`, `:751`, `:755`, `:1328`, `:1332`);
  - `CompactFullScalarRange`'s shifts go through `bounded1Range`, which `:` calls (`:974`, `:976`);
  - `::` goes through `leftScalarRange` and `combine2D`/`combine3D`, the steps `(l:):s` takes (`FortressLibrary.fss:4067-4069`).

### 1.3 Row 583: a new object at the meet

`CompactFullSeqScalarRange` and `StridedFullSeqScalarRange` inherit both `SequentialGenerator`'s `map` and `Indexed`'s. A declaration on their meet must answer a type below `SequentialGenerator[\G\]` and `Indexed[\G,ZZ32\]`, and the library had none.

- The new type is `SimpleMappedSeqIndexed[\E,F,I\](g0: Indexed[\E,I\], f0: E->F) extends { SequentialGenerator[\F\], Indexed[\F,I\] }`, declared in the ranges section of the `FortressLibrary` api and component (`Library/FortressLibrary.fsi:2396-2409`, `Library/FortressLibrary.fss:4137-4153`). Its bodies are `SimpleMappedIndexed`'s and `MappedGenerator`'s.
- Both seq ranges declare `map[\G\](f: ZZ32->G): SimpleMappedSeqIndexed[\ZZ32,G,ZZ32\]` (`Library/RangeInternals.fsi:454`, `:529`; `.fss:1101-1102`, `:1327-1328`).
- It does not extend `MappedGenerator`, which the api does not export, because the export check compares extends clauses (`ExportChecker.scala:690-691`). So it does not carry `MappedGenerator`'s `reverse`, `reduce`, `g` and `f` (`Library/FortressLibrary.fss:3547-3559`), and takes `Indexed`'s `reverse` (`:1834`): `seq(0:6:2).map(fn x => x + 1).reverse.asString`, which printed `mapped(7,5,3,1)`, prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))`, with the elements and their order unchanged, while the parallel twin `SimpleMappedIndexed`, a `MappedGenerator` (`:3567-3568`), still prints `mapped(6,4,2,0)` for `(0#4).map(f).reverse`. That is a value walk prints, changed: a stop the record reserves, listed in section 10, and row 603, pinned in `ProjectFortress/tests/RangeDeclarations.fss` (the gather, correction 3; `SKEPTIC.md` section 5, finding 2).
- Its `asString` is `SimpleMappedSeqGenerator`'s, so `seq(0#4).map(...)` prints `mapped(seq(0,2,4,6))` as before.
- Its generation is sequential because its two callers hand it a sequential range; the type does not say so.

### 1.4 Row 580: a numeral IN a range

`FullRange`'s `IN` is the meet the coercion needed. I checked it with the compiled checker over the one library, using the distance stage's driver and flags on a ten-call program (`tmp/rung-range-meets/checkprog.sh`, program `NumeralInRange.fss`), in the base copy and on the edit:

    base copy:  @@TC COMPONENT  NumeralInRange  errors=24
                NumeralInRange.fss:7:13: Ambiguous coercion in call to operator IN: of the declarations applicable to an argument of type (IntLiteral, CompactFullRange[\ZZ32\]) only by coercion, none is more specific than every other: (ZZ32, G...
    edit:       @@TC COMPONENT  NumeralInRange  errors=0

- On the base, eight calls are refused: `3 IN (0#5)`, `3 IN (1:5)`, `4 IN (2:6)`, `3 IN (0#z)`, `(3 + 1) IN (0#5)`, `3 IN r` for `r: CompactFullRange[\ZZ32\]`, `3 IN f` for `f: FullRange[\ZZ32\]`, and `(1,2) IN ((0,0):(3,3))`. `5 IN (1:10:2)` and `z IN (0#5)` are accepted.
- On the edit, all ten are accepted.
- Walk answers each as before (`RangeDeclarations.fss`).

### 1.5 Row 586: UniformDistribution

`min` and `max` now answer `Just[\T\](range.forward().left.get)` and `Just[\T\](range.forward().right.get)` (`Library/Random.fss:373-374`).

- Row 586 named `range.left`. On a backward range `8:2:-3`, `left` is 8, the largest element, while `min` is "the minimum value of the output" (`Library/Random.fsi:129-130`). `forward()` is the range in ascending order.
- On a compact range `forward()` is the range itself, so `UniformDistribution[\ZZ32\](1:3)` still answers `Just(1)` and `Just(3)`.
- The way not taken: the parameter `CompactFullRange[\T\]`, which refuses a strided range at construction.

## 2. The tests, first

Commit f10b6dbc4 holds the promotion of row 586's test alone. Commit 0ea0c916b holds the three new and promoted tests alone. Both precede the edit (702e62058). On the base library:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-ranges/tmp/rung-range-meets/h1 ProjectFortress/tests/UniformDistributionStridedRange.fss
    com.sun.fortress.exceptions.ProgramError: com.sun.fortress.exceptions.ProgramError: Library/Random.fss:373:74-83:
    Cannot find definition for method lower given receiver StridedFullParScalarRange
    Tests run: 1,  Failures: 1,  Errors: 0

    harness-one.sh .../h2 RangeDeclarations.fss RangeBodiesWalk.fss RangeTupleShiftWalk.fss UniformDistributionStridedRange.fss   (library at fa14a190c)
    . interpret .../RangeBodiesWalk  ...  ProgramError: Library/RangeInternals.fss:874:25-38:
    . interpret .../RangeDeclarations  PASS  OK (time = 1289ms)
    . interpret .../RangeTupleShiftWalk  ...  ProgramError: Library/RangeInternals.fss:637:47-48:
    Tests run: 4,  Failures: 3,  Errors: 0

The four tests:
- `ProjectFortress/tests/RangeDeclarations.fss` calls every repaired declaration under walk with today's value, a numeral `IN` a `#` range among them. It passes before and after.
- `ProjectFortress/tests/RangeBodiesWalk.fss` is home 1 for the bodies that stopped walk: `flip` and the subscripts of rank 2 and 3, `bounds` of rank 3, the scalar `indices`, and `seq` of a strided sequential range.
- `ProjectFortress/tests/RangeTupleShiftWalk.fss` is promoted from `XXXRangeTupleShiftWalk.fss` (row 503, home 2 before). Only the component line changed.
- `ProjectFortress/tests/UniformDistributionStridedRange.fss` is promoted from `XXXUniformDistributionStridedRange.fss` (row 586). Commit 0ea0c916b added two assertions for the backward range `8:2:-3`.

After the edit, the four and the tests the record names, through the harness on 702e62058:

    harness-one.sh .../h3 <33 files>
    OK (33 tests)

The 33 files:
- the four above;
- `RangeTest`, `rangeOperators`, `RangeZZ32RungJ`, `RandomTest`, `Generator2Test`, `LibraryMeetDeclarations`;
- `RangeBoundsRungO`, `RangeEmptyHashRungO`, `RangePrototype`, `RangeSizeRungO`, `SeqRangeTopRungO`, `OpenRangeCase`, `SequentialGeneratorMap`, `LibraryOverloadFamilies`, `array3test`, `subArray`, `ColonOperator`, `BadBounds`, `naiveSeq`, `seqLoop`, `generatorTest`, `conditionalGenerator`, `multiGenFor`;
- six expected failures, each still failing for its own reason ("OK Saw expected exception"): `XXXRangeWideRungJ` (construction), `XXXStridedSpanWalk` (`IntegerOverflow` at `imposeStride`, row 522, unedited), `XXXUniformDistributionRangeType` (construction, row 483), `XXXEmptyGroupSumRungF`, `XXXUnwrittenSumRungF`, `XXXseqLoopError`.

Every interpreter test's verdict is the gate's to judge on the merged tree.

## 3. The specification, and what settles what

- The Meet Rule for Functional Methods (`Specification/advanced/overloading.tex:469-484`): "if there exists a trait or object C that provides both f(P) and f(Q) then … there is a declaration f(P ∩ Q) provide by C". By this rule the 97 pairs are gaps in the library (POSITIONS, "The static-parameter sentence goes (answer 9)"; `explorations/reviews/batch-8-review.md`, section 1).
- The ranges section (`Specification/basic/expressions/ranges.tex`, section "Ranges") defines membership, intersection and size on integer ranges (`:131`, `:138`, `:140`). `RangeDeclarations.fss`'s messages cite it.
- That section describes no range of rank 2 or 3, and no `flip`, `every`, `forward` or `shiftLeft`. There the specification is silent, and the library's own bodies and declarations are the standard (POSITIONS, "The library's own practice is the standard").
- `UniformDistribution` has no specification text; `Library/Random.fsi:129-132` documents `min` and `max` as the least and greatest output.

## 4. The checker count and the distance

The before is climb batch 8's gate (`explorations/compile-ladder/climb-batch-8/gate/checker-count.txt`, `distance.txt`) and the landed per-site list (`explorations/compile-ladder/gate/distance-sites.tsv`), landed at 6416d216f. `git log 6416d216f..fa14a190c -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing, so the stage was not run on the base. The after is one run of each stage on 702e62058.

The count (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-range-meets/checker-count-postedit.txt tmp/rung-range-meets/cc-post`):

    FortressLibrary   10 -> 2
    RangeInternals   102 -> 0
    #total            56 -> 1
    #locations        18 -> 2
    #crash          none -> none

The one error left is `isLeftZero` in `LexicographicReduction` (row 582, Pavol's choice), counted twice.

The distance (`explorations/coordinator/tools/distance/run.sh tmp/rung-range-meets/distance-postedit.txt tmp/rung-range-meets/dist-post`; 1,025 s, load 9.5 at start), compared by `compare.sh`:

    DISTANCE DOWN   565 -> 416 (-149)
    kind overloading 99 -> 2 (-97); abstract-method 14 -> 12 (-2); typecheck 404 -> 355 (-49); export 10 -> 9 (-1)
    class M1 99 -> 2 (-97); D2 2 -> 0; X1 10 -> 9; I1 9 -> 5 (-4); I3 7 -> 6; I4 3 -> 0 (-3); RG 18 -> 10 (-8); BR 10 -> 13 (+3); NM 54 -> 49 (-5); OT 183 -> 152 (-31)
    unit api FortressLibrary 5 -> 1; api RangeInternals 51 -> 0; component FortressLibrary 276 -> 274; component RangeInternals 112 -> 20
    crash: the TraitDecl rows at FortressLibrary.fss:2473 and :2846 are now at :2474 and :2847 (one line inserted above them at :1506); four crash rows before and after

Read site by site, with the after's lines mapped back through the diff (row 577; `tmp/rung-range-meets/sitemap.py` and `remap-back.py`, then `classify.py`):

- **152 of this rung's 188 sites are gone.** By class:
  - M1 97: `CAP` 64, `IN` 30, `map` 2, `SQCAP` 1.
  - OT 35: `RangeInternals.fss:106`, `:120`, `:445`, `:492`, `:587`, `:637`, `:641`, `:701`, `:751`, `:755`, `:838`, `:874`, `:913`, `:919`, `:965` (two errors), `:974`, `:976`, `:1069`, `:1100`, `:1133` (two), `:1314`, `:1325`, `:1328`, `:1332`, `:1349`, `:1362`, `:1367`, `:1374`, `:1381`; `FortressLibrary.fss:3843`, `:4067-4069`.
  - RG 7: `:175`, `:183`, `:234`, `:242`, `:312`, `:1323`, `:1360`.
  - NM 5: `:191`, `:251`, `:425`, `:497`, `:513`.
  - I4 3: `:885`, `:931`, `:1255`.
  - I3 1: `:1096`.
  - I1 1: `FortressLibrary.fss:3933`.
  - D2 2: `:1148`, `:1249`.
  - X1 1: `:12`.
- **23 sites still have the same error, with a changed message.**
  - Most candidate lists now name `StridedFullScalarRange`'s `|self|`, `SimpleMappedSeqIndexed` or its `seq`.
  - At three sites the body's type is narrower: `RangeInternals.fss:145` now says "Function body has type RangeInternals.ScalarRange" where it said "Range[\ZZ32\]"; `:214` and `:280` say "(RangeInternals.ScalarRange, …)" where they said "(Range[\ZZ32\], …)".
  - The class table files `:145` under OT now and under RG before. So the stage's RG −8 and OT −31 are RG −8 and OT −34 with lines mapped back, and its I1 −4 is I1 −1.
- **36 of the 188 are left**, in three families, each with a row (section 6).
- **Outside this rung's sites, BR is +3.** New at `FortressLibrary.fss:1615` (`BIG SQCUP`), `:3278` (`BIG MIN`), `:3415` (`BIG AND`) and `:3490` (`BIG ||`); gone at `:3307` at fa14a190c (`BIG MINNUM`).
  - Each is "Function body has type X, but declared return type is BigReduction[…]" for a big operator whose type is inferred.
  - The same five moved in a development run of `FortressLibrary.fss` alone, so they follow the tree, not the run.
  - The rung edits none of these declarations. This is the movement row 488 records for this family under edits that touch none of its declarations; record.md has a note for row 488.

Arithmetic: 565 − 152 + 3 = 416.

The manifest needs `expectedCheckerCount` 1; the checker count's crash line stays `none`.

Development checks, not the stage: before running the stage once, the rung ran the stage's driver with its flags on single components, both on one code state, the edit later committed as `702e62058` (`dev1`, `Library/RangeInternals.fss` alone, started 22:17:28 on a tree whose `git diff --stat` read "5 files changed, 236 insertions(+), 78 deletions(-)", and `dev2`, `Library/FortressLibrary.fss` alone, started 22:24:31, with no edit between them), on which the distance stage then ran over both components again, so two components were checked twice on one code state (POSITIONS, "Nothing is built or run twice on the same code."; the gather, correction 4, `SKEPTIC.md` section 5, finding 3; the decision 8 the correction names, "on distinct code states", is not in this text), to see whether the declarations introduced new errors before paying for the whole stage. On `Library/RangeInternals.fss` alone (388 s): 21 errors, every pair cleared and nothing new. On `Library/FortressLibrary.fss` alone: 625 s.

## 5. Precedent search

- **Declarations on the meet**: `CompactFullScalarRange`'s and `StridedFullScalarRange`'s own `IN` (`Library/RangeInternals.fsi:426`, `:504`), `Nothing`'s two `SQCAP` (`Library/FortressLibrary.fsi:1014-1015`), and climb batch 8 rung M's `Maybe.map`/`ivmap` and the sequential generators' `map` (FACTS, "The one library's Meet Rule pairs inside one type are repaired by declarations on the meet …"). Followed for every pair.
- **`fail` for a declaration no library type reaches**: `ScalarRange`'s and `Range2D`'s `INTERSECTION` over a plain `Range` (`Library/RangeInternals.fss:151-152`, `:183-184`). Followed for the meets over `Range[\…\]` and for `ScalarRange.indexOf`.
- **A new object at a meet**: `SimpleMappedIndexed` and `SimpleMappedSeqGenerator` (`Library/FortressLibrary.fss:3567`, `:3587`). Followed for row 583.
- **`cast` where the run-time type is narrower than any declared one**: `openRange` (`Library/FortressLibrary.fss:4043-4047`). Used in the six rank-2 and rank-3 meets only.
- **`abstract` on an api member the component leaves bodiless**: `Range`'s (`Library/FortressLibrary.fsi:2163-2183`). Followed for the export repair.
- **The same defect elsewhere in the file**: a precedent that repaired a defect is evidence the defect is elsewhere too. The tuple shifts are six sites (row 503); a grep of `-amount,` and `+amount,` in `Library/RangeInternals.fss` finds no seventh. The `check()` factories were six; `extent1Range`'s `ExtentScalarRange(x,1)` has no `check()`.

## 6. The three homes of each defect measured

**Home 1, repaired with an assertion:**
- the bodies that stopped walk (`RangeBodiesWalk.fss`);
- the tuple shifts (`RangeTupleShiftWalk.fss`);
- `UniformDistribution` on strided and backward ranges (`UniformDistributionStridedRange.fss`);
- every pair and slip repaired, at today's value (`RangeDeclarations.fss`).

**Left: 36 sites under three rows, numbered 599 to 601 at the gather.**

- **Row 599, the bounded kinds of rank 2 and 3 (15 sites).** `RangeInternals.fss:145`, `:177`, `:179`, `:214`, `:216`, `:236`, `:238`, `:280`, `:284`, `:605`, `:632`, `:719`, `:746` and `FortressLibrary.fss:3796`, `:3954` at fa14a190c.
  - No library type is "a bounded range of rank 2" the way `BoundedScalarRange` is for rank 1. So `truncL`, `truncR`, `forward`, `every` and `imposeStride`, the scalar `truncL` and `Range.truncR` cannot declare what their bodies build, and `ActualRange2D.every`'s `T` is false for a negative stride.
  - Walk stops on it. `((0,0)#).every(-1,-1)` gives "Unification error: Closure/Constructor for recombine param 1 (i:LeftScalarRange) got arg RightScalarRange" at `Library/RangeInternals.fss:217` on the edit (`:214` on the base). `((5,5)#).flip().forward()` gives the same at `:754` (`:719`).
  - The specification describes no range of rank 2, so this is home 3. A plain test cannot pin a run that stops, so the row is the home, with these lines.
  - Repairs, for Pavol: a `BoundedRange2D`/`BoundedRange3D` trait, as `BoundedScalarRange` is for rank 1; or `cast` in each body.
- **Row 600, comparisons on the range's index type in generic code (18 sites).**
  - `RangeInternals.fss:129`, `:133`: `>` and `<` on `I` in `checkSelection`.
  - `FortressLibrary.fss:3826`: `SCMP` on `I`; `:3879`, `:3912`, `:3937`, `:3964`, `:3965`: `PCMP` on `I`.
  - `:3974` (three errors), `:3975`, `:3976`: `CompactFullRange`'s `|self|`, whose typecase on `l` leaves `u` an `I`, and whose destructuring of `AND((ZZ32,ZZ32),I)` the checker refuses.
  - `:3856`, `:3857`, `:3860`, `:3861`, `:3862`: `TrivialOpenRange`'s methods apply `#`, `:` and `::` to an `Any`.
  - Walk dispatches each at run time and answers.
  - Repairs, for Pavol: move the bodies to the `ZZ32` types; declare generic `PCMP`/`SCMP`; or compare through a bound. The public range traits stay generic (POSITIONS, "Scalar ranges are over `ZZ32` only"), so the choice is his.
- **Row 601, `#0` (3 sites and one value).**
  - `extent1Range`, `extent2Range` and `extent3Range` answer an empty full range for a zero extent, which their declared `ExtentRange[\…\]` is not (`RangeInternals.fss:1417`, `:1425`, `:1433`).
  - `extent2Range` and `extent3Range` also write the empty range's bounds out of order, `CompactFullRange2D(xx,xx-1,yy,yy-1)`. So `#(0,3)` is `CompactFullRange2D(0,-1, 0,-1)` and `|#(0,3)|` is 1.
  - Repairing the bounds changes a value walk prints, a stop reserved for Pavol ("A slip whose repair changes a value walk prints, left with a row instead"), so it is left.
  - `RangeDeclarations.fss` pins both values as today's (home 3). The specification describes `#s` only as an implicit subscript range (`ranges.tex`, section "Ranges").

**Added at the gather, from the skeptic's findings 1 and 2 (corrections 1 and 3):**
- **Row 602, `StridedFullRange3D` defines neither `shiftLeft` nor `shiftRight`** (home 2): `ProjectFortress/tests/XXXStridedRange3DShiftWalk.fss`, its messages citing `objects.tex`, section "Object Declarations". On the gather's merged tree, `harness-one.sh` gives "InterpreterBug: ... XXXStridedRange3DShiftWalk.fss:8:12-36:" / " OK Saw expected exception"; with `StridedFullRange2D`'s two bodies given a third component in `StridedFullRange3D`, a local fix reverted after the run, it gives "Expected failure or exception, saw none" / "Tests run: 1,  Failures: 1".
- **Row 603, the reversed mapped sequential range's rendering** (home 3): two assertions in `RangeDeclarations.fss` pin `seq(0#4).map(f).reverse.asString` as `SimpleReversedIndexed(mapped(seq(0,2,4,6)))` and its elements as 6, 4, 2, 0; the harness on the merged tree gives "OK (1 test)".

## 7. Decisions

1. **Repairs that turn a run that stops into a value were made.** They are `flip`, the subscripts and `bounds` of rank 2 and 3, `indices`, `seq` of a strided sequential range, the tuple shifts, and `UniformDistribution`'s `min`/`max` on strided ranges.
   - The alternative was to leave each with a row, as a "slip whose repair changes a value walk prints".
   - The record plans two of them (rows 503 and 586) and lists the others among the slips to repair. A run that stops prints no value, and no program that runs today prints anything different.
   - The one defect whose repair changes a printed value (`|#(0,3)|`) is left (row 601).
   - This is for Pavol, and listed in stopsMet under the other reading.
2. **The 2D and 3D `CAP` meets** are declared in `LeftRange2D`, `RightRange2D`, `FullRange2D` and their twins, with a `cast` in one body each.
   - The way not taken: a `BoundedRange2D`/`BoundedRange3D` trait, the meet of `Range2D` and `BoundedRange[\(ZZ32,ZZ32)\]`, as `BoundedScalarRange` is for rank 1.
   - That trait would declare the two meets once each, type `combine2D` over bounded scalar ranges without a cast, and also repair row 599.
   - But it adds two types to the api and changes six extends clauses, a design the record did not ask for.
3. **`FullRange`'s `IN` is abstract**, as `Range`'s is. The way not taken: a body (`Generator`'s naive one) that no library type would reach.
4. **`SimpleMappedSeqIndexed`** (row 583) takes an `Indexed` and is sequential through its callers. The ways not taken:
   - an object extending `MappedGenerator`, which needs `MappedGenerator` in the api (the generators section, not this rung's);
   - a trait for "sequential and indexed", with the object behind it.
   - Its cost: the object does not carry `MappedGenerator`'s `reverse`, `reduce`, `g` and `f`, so `seq(r).map(f).reverse.asString` changes from `mapped(7,5,3,1)` to `SimpleReversedIndexed(mapped(seq(1,3,5,7)))` for `r = 0:6:2`, elements and order unchanged (section 1.3; the gather, correction 3). A repair not built: `reverse` declared on the object as `SimpleMappedIndexed[\E,F,I\](g0.reverse, f0)`.
5. **`UniformDistribution` reads `forward()`**, not `left` (1.5).
6. **`ScalarRange.indexOf` is a `fail`.**
   - For an open or extent range of rank 2, `indexOf` stopped with "Cannot find definition for method indexOf given receiver OpenScalarRange" (`Library/RangeInternals.fss:191` on the base copy). It now stops with "FAIL: indexOf of a scalar range with no left or right end" (`FailCalled`, catchable).
   - The way not taken: declare `indexOf` on the scalar kinds that have it and move `Range2D.indexOf` to them. That changes no message but is a larger edit.
7. **The ladder subset is empty.** No file in the baseline's recorded first errors (`explorations/compile-ladder/baseline-2026-09-19/raw/`) names a name this rung adds or changes, and the record names no ladder file for the rung.

## 8. Greps

- `SimpleMappedSeqIndexed` and the four test names appear only in the files this rung adds, searching `ProjectFortress/tests/`, every `*_tests/`, `ProjectFortress/demos` and `ProjectFortress/src/com/sun/fortress/`.
- The tests' helpers `inOrder`, `fullRangeOf` and `maybeOf` name no functional method of the library (FACTS, "Every functional-method name of the library is reserved").
- Callers of the retyped declarations: every caller of `narrowToRange(OpenRange)` has a full or compact receiver; `leftOrRight`, `forwardIntersection` and `recombine` have no caller outside the range types.

## 9. What comes back to Pavol

- Each device with the way not taken: section 1.1 and decisions 2 to 6.
- Row 583's new type, `SimpleMappedSeqIndexed`: section 1.3 and decision 4.
- The slips left, each with its row: section 6, rows 599 to 601.
- The repairs that turn a run that stops into a value: decision 1.

## 10. Stops met (added at the gather)

The rung's stops were listed in its structured result, not in this text; the gather adds them here, with the one its skeptic found (correction 3).
- **"A slip whose repair changes a value walk prints"**, under the other reading of decision 1: the repairs that turn a run that stops into a value (`flip`, the subscripts and `bounds` of rank 2 and 3, `indices`, `seq` of a strided sequential range, the tuple shifts, `UniformDistribution`'s `min` and `max` on strided ranges). Reversible; lifted by POSITIONS, "Reversible stops do not hold a batch."
- **The same stop, met by row 583's device** (section 1.3, decision 4): `seq(0:6:2).map(fn x => x + 1).reverse.asString` prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))` where it printed `mapped(7,5,3,1)`; elements and order unchanged. Pinned by `ProjectFortress/tests/RangeDeclarations.fss` at the gather, row 603. Reversible; lifted by the same position.
