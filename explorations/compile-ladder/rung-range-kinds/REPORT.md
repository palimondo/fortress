# Rung R of climb batch 12: the ranges' last generic bodies, the open range's five methods, and two slips

- problem: the nine range and array sites of rows 654, 655, 656 and 608 in the landed per-site list, `explorations/compile-ladder/gate/distance-sites.tsv:105-106` (`checkSelection`, row 655), `:132` (row 654), `:38`, `:39`, `:55`, `:56`, `:57` (row 656) and `:114` (row 608); row 657's pin, `ProjectFortress/tests/RangeKindBodies.fss:94` at the base; row 658's walk stop at `Library/PrefixSet.fss:478`
- spec: none: `grep -rn "narrowToRange\|checkSelection\|TrivialOpenRange\|PrefixSet\|truncL\|imposeStride" Specification --include=*.tex` prints nothing, and `Specification/basic/expressions/ranges.tex:12-147` (section "Ranges") describes no range of rank 2 and no method of the open range
- precedent: rung L's move of `CMP` to the `ZZ32` kinds, `ScalarRange`'s `opr CMP` (`Library/RangeInternals.fss:189-191`) and its rank-2 and rank-3 twins (`:246-248`, `:316-318`), the generic one abstract (`Library/FortressLibrary.fsi:2184`); the declarations on the meet of the range kinds (FACTS, "The one library's range types provide a declaration on the meet ..."), as `BoundedRange2D`'s two `CAP` (`Library/RangeInternals.fsi:267-268`); the rank-suffixed helpers `combine2D`/`combine3D` (`Library/RangeInternals.fsi:64`, `:96`); the team's typecase in `FullRange.narrowToRange` (`Library/FortressLibrary.fss:3940-3946` at the base); `ZeroIndexed`'s bounds `0 # |self|` (`Library/FortressLibrary.fss:1909`); `Array1`'s `r'.left.get` (`Library/FortressLibrary.fss:2313`)
- deviation: the bounds check is three functions named by rank, `checkSelection`, `checkSelection2D` and `checkSelection3D` (`Library/RangeInternals.fss:125-172`), not three overloads of one name, which walk refuses (row 416); at rank 2 and 3 the team's `tfl > ofl` and `tfr < ofr` are spelled `(tfl PCMP ofl) = GreaterThan OR (tfl PCMP ofl) = Unordered` and `(tfr PCMP ofr) = LessThan OR (tfr PCMP ofr) = Unordered` (`Library/RangeInternals.fss:144`, `:149`, `:161`, `:166`); each kind and each open range also declares `narrowToRange` over an open range, the meet the checker asks for (`Library/RangeInternals.fss:194`, `:251`, `:321`, `:368`, `:392`, `:411`, `:596`, `:649`, `:662`, `:1093`, `:1181`, `:1259`; `Library/FortressLibrary.fss:3886`); the stops of row 656 are tested as five refusals at load, not one test that catches them (decision 8)
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `Library/RangeInternals.fss`, `Library/RangeInternals.fsi`, `Library/PrefixSet.fss` (first edits `Library/FortressLibrary.fss:2255`, `Library/FortressLibrary.fsi:2180`, `Library/RangeInternals.fss:125`, `Library/RangeInternals.fsi:42`, `Library/PrefixSet.fss:478`)

The harness refused the write of this file; the text is the report.

Branch `wip/rung-range-kinds`, base `7fa767d48`. Commits: the tests `44f6651a5`; the edit `a121ab660`; the meets the checker count asked for, `7425daa51`. Nothing under `ProjectFortress/src/` changed: no Java, no Scala, no build.

## 1. What changed, and why

The answers followed: item 40's way (a) (batch 11's Q3; POSITIONS, "The order of the work after batch 10."), Q50 way (a) (POSITIONS, "A range of rank 2 or 3 checks containment corner by corner (item 50, row 657)."), and Q49 at its default, way (a), the curator's word pending. All nine sites are gone, one site that row 608's error hid shows (NEW-R-1), and the distance falls 207 to 198; the count stays 1 (section 3).

### 1.1 Row 655: the bounds check moves to the `ZZ32` kinds (2 sites)

- `checkSelection` is declared at `ZZ32` (`Library/RangeInternals.fss:125-138`, `.fsi:42`), with `checkSelection2D` and `checkSelection3D` at pairs and triples (`:140-155`, `:157-172`; `.fsi:44`, `:46`). Each keeps the team's shape: forward both ranges, a loop over their left bounds and one over their right, `errorPrintln` and `throw IndexOutOfBounds[\…\](this, …)`, then `r`.
- The generic `narrowToRange(other: Range[\I\])` of `Range`, `BoundedRange` and `FullRange` is abstract (`Library/FortressLibrary.fss:3839`, `:3915`, `:3951`; `.fsi:2180`, `:2235`, `:2265`).
- Its bodies are at the kinds of each rank, with the generic declarations' types at the index type and the team's bodies:
  - `ScalarRange`, `Range2D`, `Range3D`: `checkSelection…[\Range[\…\]\](self, other, self INTERSECTION other)` (`Library/RangeInternals.fss:192-193`, `:249-250`, `:319-320`).
  - `BoundedScalarRange`, `BoundedRange2D`, `BoundedRange3D`: the same at `BoundedRange[\…\]` (`:594-595`, `:647-648`, `:660-661`).
  - `FullScalarRange`, `FullRange2D`, `FullRange3D`: the team's typecase on `FullRange[\…\]` and its `else` fail (`:1086-1092`, `:1174-1180`, `:1252-1258`).
- Each body is declared in `Library/RangeInternals.fsi` beside the kind's `CMP` or `CAP` (`:57`, `:81`, `:115`, `:255`, `:269`, `:279`, `:425`, `:451`, `:473`).
- `TrivialOpenRange`, an `OpenRange[\Any\]`, inherits the abstract declaration, so it declares `narrowToRange(other: Range[\Any\]) = self INTERSECTION other` (`Library/FortressLibrary.fss:3885`, `.fsi:2212`), the generic body without the check, which an open range never fails: it has no left or right (decision 6).

### 1.2 The meets over an open range (no site; asked for by the checker)

Moving the `Range`-taking body to the kinds broke a Meet Rule pair at each of them: the kind's `narrowToRange(other: Range[\…\])`, whose receiver is the kind, against the generic `narrowToRange(other: OpenRange[\I\])`, whose receiver is the generic trait. The first count run on the edit read 91 errors (section 3). Each of the nine kinds therefore declares `narrowToRange(other: OpenRange[\…\])` at its own type (`Library/RangeInternals.fss:194`, `:251`, `:321`, `:596`, `:649`, `:662`, `:1093-1099`, `:1181-1187`, `:1259-1265`). Its body is the generic one, `self INTERSECTION other`, and at a full kind row 654's typecase. `OpenScalarRange`, `OpenRange2D`, `OpenRange3D` and `TrivialOpenRange` declare it too (`:368`, `:392`, `:411`; `Library/FortressLibrary.fss:3886`), the meet of `OpenRange`'s own declaration and the kind's. The api declares each one (`Library/RangeInternals.fsi:58`, `:82`, `:116`, `:147`, `:164`, `:180`, `:256`, `:270`, `:280`, `:426`, `:452`, `:474`; `Library/FortressLibrary.fsi:2213`). This is the library's practice for its range kinds (FACTS, "The one library's range types provide a declaration on the meet for each of their Meet Rule pairs ..."). With it the count is batch 11's again.

### 1.3 Row 657, under Q50: corner by corner at rank 2 and 3

`checkSelection2D` and `checkSelection3D` compare the left bounds and the right bounds with `PCMP` (`Library/RangeInternals.fss:113-121`), not with the tuples' lexicographic `>` and `<`. The other range's left corner must be at or above this range's on every axis, and its right corner at or below. An unordered pair raises. So `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` raises `IndexOutOfBounds[\(ZZ32,ZZ32)\]` as `(-1,2):(5,5)` does. The pin at `ProjectFortress/tests/RangeKindBodies.fss:94` changes with it (section 6). Rank 1 keeps `ZZ32`'s own `>` and `<`.

### 1.4 Row 654: a full range narrowed to an open one (1 site)

`FullRange.narrowToRange(other: OpenRange[\I\]): FullRange[\I\]` keeps its declaration and type, and takes its sibling's typecase: `r = self INTERSECTION other; typecase r of r':FullRange[\I\] => r' else => fail(...)` (`Library/FortressLibrary.fss:3944-3950`). It has no comparison on `I`, so it stays generic. The full kinds' meets of section 1.2 carry the same body at their index type (decision 5). Walk answers as before: `(0:9).narrowToRange(::2)` is `0:8:2` (`ProjectFortress/tests/RangeDeclarations.fss:104`), and ranks 2 and 3 are pinned in `ProjectFortress/tests/RangeNarrowKinds.fss:37-38`.

### 1.5 Row 656, under Q49's default way (a): the open range's five methods fail (5 sites)

`TrivialOpenRange`'s `truncL`, `truncR`, `every`, `imposeStride` and `atMost` keep their declared types. Their bodies are `fail("<method> of the trivial open range (:), whose index type is Any")` (`Library/FortressLibrary.fss:3872-3883`), as the team's `else` in `FullRange.narrowToRange` and batch 11's `BoundedRange2D` and `BoundedRange3D` meets fail (`Library/RangeInternals.fss:643-646`, `:656-659`). The five values that walk printed become stops (section 6). Two library operators reach two of the five: `(:):3` reaches `imposeStride` and `(:)#3` reaches `atMost` (section 8, point 2).

### 1.6 Row 658: a prefix set's index-value pairs have indices

`IndexValuePrefixSetGenerator.indices` reads `0 # |s|` where it read `s.indices`, which `PrefixSet` does not declare (`Library/PrefixSet.fss:478`). This is the shape of `ZeroIndexed`'s bounds, `0 # |self|` (`Library/FortressLibrary.fss:1909`), the precedent line under the library rule (`explorations/coordinator/process-engineering/library-extension-rule-archaeology.md`, section 5). There is no new api declaration. Walk answers where it stopped.

### 1.7 Row 608: `ImmutableArray1`'s range subscript (1 site)

`l = reflect(r'.left.get)` where it read `r'.lower` (`Library/FortressLibrary.fss:2255`), as its twin in `Array1` reads (`:2313`). The stride stays separate, `m = r'.stride` (`:2256`). Walk stopped on every strided subscript of an immutable array of rank 1, "Cannot find definition for method lower given receiver StridedFullParScalarRange", and now answers (section 6). The brief expected this test to pass before the edit. It failed, and so it is the rung's test of the repair.

## 2. The tests: the failing run and the passing run

Nine tests are written first (`44f6651a5`). Four are plain tests, three of the repaired values and one a changed pin: `RangeNarrowKinds.fss` (each moved body at rank 1 to 3, raises that both orders give, row 654 at each rank, `(:)` narrowed to itself), the changed pin in `RangeKindBodies.fss`, `PrefixSetIndices.fss` and `ImmutableArrayRangeSubscript.fss`. The other five are refusal pairs: `TrivialOpenRange{TruncL,TruncR,Every,ImposeStride,AtMost}Stop.fss` with their `.test` keys.

The failing run on the base's code, before any library edit:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-range-kinds/h1 ProjectFortress/tests/RangeNarrowKinds.fss ProjectFortress/tests/RangeKindBodies.fss ProjectFortress/tests/PrefixSetIndices.fss ProjectFortress/tests/ImmutableArrayRangeSubscript.fss ProjectFortress/tests/TrivialOpenRange*Stop.{fss,test}
    # harness-one 2026-10-09T11:53:17Z; tree 7fa767d48; nproc=4; load 1.33 1.83 2.69; ...; cache empty
    FortressException: ForbiddenException                                   (RangeKindBodies: the raise missing)
     Missing expected refusal at load                                       (each of the five stops)
    Cannot find definition for method indices given receiver fastPrefixSet[\ZZ32,List[\ZZ32\]\]
    Cannot find definition for method lower given receiver StridedFullParScalarRange
    Tests run: 9,  Failures: 8,  Errors: 0

`RangeNarrowKinds` passed on the base, as written to.

The five stop tests' keys changed after the first run. A `FailCalled` that ends a run prints `FortressException: FailCalled`, and its message goes to the error stream, so the keys became `load_exception_contains=FailCalled` and `load_err_contains=<message>`. They were run again on the old code:

    FORTRESS_HOME=/home/user/fortress-base12 /home/user/fortress-base12/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-range-kinds/old-harness ProjectFortress/tests/TrivialOpenRange*Stop.{fss,test}
    # harness-one 2026-10-09T11:57:14Z; tree 7fa767d48; ...
     Missing expected refusal at load
    Tests run: 5,  Failures: 5,  Errors: 0

The passing run, on the code of `7425daa51`, committed right after the run with no change between:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-range-kinds/h2 <the 14 files above> ProjectFortress/tests/{RangeDeclarations,RangeBoundedEveryForward,IndicesGetterCalls,RangePrototype,RangeTest,subArray,RangeBodiesWalk,OpenRangeCase,rangeOperators,emptySubscripting,RangeTupleShiftWalk,UniformDistributionStridedRange,StridedRange3DShiftWalk,SetTest}.fss
    # harness-one 2026-10-09T12:10:01Z; tree a121ab660; ...; cache empty
    OK (23 tests)

The interpreter suite, once, after the last edit, at `7425daa51` (`ant testSystem`): `BUILD SUCCESSFUL`, `Total time: 2 minutes 53 seconds`. The four shards ran 133, 136, 129 and 136 tests, 534 in all, with 0 failures and 0 errors. Batch 11's gate ran 526, so the 8 new test files account for the difference. No test in the suite reached one of the five stops.

## 3. The checker count and the distance: the stage as the test

Before: batch 11's landed tables (`explorations/compile-ladder/climb-batch-11/gate/checker-count.txt`, `distance.txt`) and the per-site list (`explorations/compile-ladder/gate/distance-sites.tsv`). After: one run each on the final code.

The count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-range-kinds/checker-count-postedit.txt tmp/rung-range-kinds/cc-post`, at 12:06:51Z. `diff` against the landed table prints nothing: `#total 1`, `#locations 2`, `FortressLibrary 2` (`isLeftZero`, row 582), every other api 0.

The edit of `a121ab660` alone read 91. The run at 11:58:04Z printed

    FortressLibrary	4
    RangeInternals	178
    #total	91
    Invalid overloading of narrowToRange in trait ActualRange3D:
     (RangeInternals.Range3D, Range[\(ZZ32, ZZ32, ZZ32)\])->Range[\(ZZ32, ZZ32, ZZ32)\] @ .../Library/RangeInternals.fsi:113:5-82
     and (Range[\(ZZ32, ZZ32, ZZ32)\], OpenRange[\(ZZ32, ZZ32, ZZ32)\])->Range[\(ZZ32, ZZ32, ZZ32)\] @ .../Library/FortressLibrary.fsi:2181:5-51

and, with the kinds' meets, `Invalid overloading of narrowToRange in trait TrivialOpenRange` once more. The meets of section 1.2 are the repair. The two intermediate runs were on code that changed after them.

The distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-range-kinds/distance-postedit.txt tmp/rung-range-kinds/dist-post`, from 12:10:55Z to about 12:31Z on one core. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-11/gate/distance.txt tmp/rung-range-kinds/distance-postedit.txt` prints:

    DISTANCE DOWN   207 -> 198 (-9)
        kind typecheck              156 -> 147    (-9)
        class I1                      1 -> 0      (-1)  integers in generic code: the bound AnyIntegral or none where Integral[\I\] is used
        class S1                     28 -> 29     (+1)  self type: a generic trait's self is not its type parameter
        class R4                      2 -> 1      (-1)  StandardMinMax's (T,T) slip in bodies (row 421)
        class V1                     27 -> 44     (+17)  arrays: element type bounded by Number, which declares no arithmetic
        class V2                     32 -> 33     (+1)  arrays: a sized array's body or factory (sizes lost in joins and factories)
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        class NM                      8 -> 7      (-1)  names the api does not declare (getters and methods of Range, String, Generator)
        class OT                     67 -> 25     (-42)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary    194 -> 187    (-7)
        unit component RangeInternals      2 -> 0      (-2)
        class G1                      0 -> 18     (+18)  generic code with no bound compares its values (tuples' <, CMP; LexicographicOrder)

The class moves are the stale line ranges of row 577. By site, the run's `errors.tsv` is read against the per-site list with every line of the two edited components mapped back to the base through `git diff -U0 7fa767d48 HEAD`:

| per-site list | site at the base | message | row | moved |
|---|---|---|---|---|
| `:105` | `RangeInternals.fss:129` | `Maybe[\I\].loop` (`tfl > ofl`) | 655 | gone |
| `:106` | `RangeInternals.fss:133` | `Maybe[\I\].loop` (`tfr < ofr`) | 655 | gone |
| `:132` | `FortressLibrary.fss:3939` | body has type `BoundedRange[\I\]`, declared `FullRange[\I\]` | 654 | gone |
| `:38` | `FortressLibrary.fss:3873` | `#` not applicable (`truncL`) | 656 | gone |
| `:55` | `FortressLibrary.fss:3874` | `:` not applicable (`truncR`) | 656 | gone |
| `:56` | `FortressLibrary.fss:3877` | `::` not applicable (`every`) | 656 | gone |
| `:57` | `FortressLibrary.fss:3878` | `::` not applicable (`imposeStride`) | 656 | gone |
| `:39` | `FortressLibrary.fss:3879` | `#` not applicable (`atMost`) | 656 | gone |
| `:114` | `FortressLibrary.fss:2255` | `FullRange[\ZZ32\] has no getter called lower` | 608 | gone |
| (`BIG LEXICO`'s body) | `FortressLibrary.fss:130` | body has type `TotalComparison` | 488 | gone, not this rung's |
| new | `FortressLibrary.fss:2257` | call to `__subarrayI` not applicable, sizes `NatReflect.NatParam` | NEW-R-1 | new |

The site at `:130` is a declaration the rung does not touch, `BIG LEXICO`'s body, and its loss is row 488's run-to-run variation. The new site is the call two lines below row 608's. With `r'.lower` refused, the checker could not type `l` and did not check the call. Now it refuses the call's `reflect`ed sizes, as at `Array1`'s twin `:2315`, which is on the landed list (class V2). That is NEW-R-1 (section 10). The nine sites of rows 654, 655, 656 and 608 are gone, and no other site of the edited files moved. No table is committed: the gate's tables on the merged tree are the record.

## 4. Where the fix belongs, and the precedent search

The place is the library. Both repairs are in the one library's range declarations, `Library/FortressLibrary.fss`/`.fsi` and `Library/RangeInternals.fss`/`.fsi` (`explorations/coordinator/map/spec-to-implementation.md`, row "ranges"), and in two slips, of `Library/PrefixSet.fss` and of `ImmutableArray1`. No walk or checker change is needed: walk reads the library, and the checker refused the library's declarations.

The precedents, and their sites in the precedent's file:

- Rung L moved `CMP` to `ScalarRange`, `Range2D` and `Range3D`, three sites of `Library/RangeInternals.fss` (`:189`, `:246`, `:316`), and `FORWARD_CMP` to twelve declarations at the extent, left, right and full kinds (`grep -c "opr FORWARD_CMP" Library/RangeInternals.fss` prints 12). It made the generic ones abstract. This rung moves `narrowToRange` in the same way, to nine kinds.
- The declarations on the meet: the range kinds declare `INTERSECTION` over a `Range[\…\]` 12 times beside 13 narrower ones (`Range2D`, `Range3D`, `ScalarRange`) in `Library/RangeInternals.fss`. These are batch 9's rung R's and batch 11's rung L's meets. The rung's 13 meets over an open range follow them.
- Named by rank: `combine2D`/`combine3D`, `fullRange2D`/`fullRange3D` and `sized1Range` to `sized3Range` in `Library/RangeInternals.fsi`.

The ways the language and the library offer, for each choice: section 9.

## 5. What the specification settles, and the sentences made false

The specification settles nothing here. `Specification/basic/expressions/ranges.tex` (section "Ranges") describes the set of integers that an explicit range denotes, the implicit ranges inside a subscript, `IN`, the set comparisons, `INTERSECTION` and the size. It describes no `narrowToRange`, no range of rank 2 and no method of `(:)`. `narrowToRange`'s own comment names "the minimum bound" and "the maximum bound" (`Library/FortressLibrary.fss:3823-3832`), which Q50 reads as corner by corner. Part IV is rendered from the api files, so the abstract declarations and the new ones reach it when the PDF is rebuilt.

Sentences made false: none. The grep of the spec line above finds no sentence on these declarations. Appendix I's range entry, "The integer type of a range" (`Specification/appendices/changes.tex:1120-1170`), speaks of the components' integer type only. No `\revision` or `\note{}` box in `ranges.tex` speaks of a method of a range.

## 6. Old against new: the values walk prints

The programs were run under walk with `bin/fortress` in this tree, before the library edit (the base's code) and after it. They are scratch probes, quoted here.

`narrowToRange` over 36 cases of every kind and rank: every value and raise is the same except the four that Q50 changes.

    ((0,0):(9,9)).narrowToRange((2,-1):(5,5))           CompactFullRange2D(2,0, 5,5)        ->  raises IndexOutOfBounds[\(ZZ32,ZZ32)\]
    ((0,0):(9,9)).narrowToRange((2,2):(8,10))           CompactFullRange2D(2,2, 8,9)        ->  raises IndexOutOfBounds[\(ZZ32,ZZ32)\]
    ((0,0,0):(9,9,9)).narrowToRange((2,2,-1):(5,5,5))   CompactFullRange3D(2,2,0, 5,5,5)    ->  raises IndexOutOfBounds[\(ZZ32,ZZ32,ZZ32)\]
    ((0,0,0):(9,9,9)).narrowToRange((2,2,2):(5,5,10))   CompactFullRange3D(2,2,2, 5,5,9)    ->  raises IndexOutOfBounds[\(ZZ32,ZZ32,ZZ32)\]

The run's error stream prints the raise's line, e.g. `([2,3,4,5] BY [-1,0,1,2,... 5]) left outside bounds ([0,1,2,3,... 9] BY [0,1,2,3,... 9])`.

The skeptic's programs found more that Q50 changes, each a value before and `IndexOutOfBounds` after: a left or a strided range of rank 2 narrowed to one whose corner is outside on one axis, and a corner of rank 3 unordered with the bounds', as `((2,2)#).narrowToRange((3,1)#)`, which was `LeftRange2D(3,2, 1,1)`, `((0,0):(8,8):(2,2)).narrowToRange((1,-1):(7,7))`, which was `StridedFullRange2D(2,0, 6,6, 2,2)`, and `((0,0,5):(9,9,9)).narrowToRange((1,1,0):(5,5,9))`, which was `CompactFullRange3D(1,1,5, 5,5,9)`. The arrays' range subscripts and subarrays of rank 2 and 3 call `narrowToRange` (`Library/FortressLibrary.fss:2534`, `:2586`, `:2929`), so they change with it. On a 3-by-3 array `a` of `10 i + j` and a 2-by-2-by-2 array `b` of `100 i + 10 j + k`:

    a[(1,-1):(2,2)]                        [0#2,0#3] [ 10 11 12 / 20 21 22 ], cut to the bounds    ->  raises IndexOutOfBounds[\(ZZ32,ZZ32)\]
    a[(0,0):(1,3)]                         [0#2,0#3] [ 0 1 2 / 10 11 12 ], cut to the bounds      ->  raises IndexOutOfBounds[\(ZZ32,ZZ32)\]
    a.subarray[\0,1,0,4,0,0\](1,1)          [0#1,0#4] [ 0 1 2 10 ], its (0,3) read from a's (1,0)  ->  raises IndexOutOfBounds[\(ZZ32,ZZ32)\]
    b[(1,0,-1):(1,1,1)]                    [0#1,0#2,0#2] [ 100 110 ;; 101 111 ], cut to the bounds  ->  raises IndexOutOfBounds[\(ZZ32,ZZ32,ZZ32)\]

A subscript outside the bounds on its first axis raised before and raises after, as `a[(-1,1):(2,2)]` does. `ProjectFortress/tests/ArrayRangeCornerBounds.fss`, the skeptic's, asserts the four raises; it fails on the base's code and passes on the rung's head (SKEPTIC.md).

The pin at `ProjectFortress/tests/RangeKindBodies.fss:94`, the revival's, before:

    assert((((0,0):(9,9)).narrowToRange((2,-1):(5,5))).asDebugString, "CompactFullRange2D(2,0, 5,5)", "today's value: (0,0):(9,9) narrowed to (2,-1):(5,5) is (2,0):(5,5), its bounds compared in lexicographic order, so the second axis's -1 below 0 is not reported")

after, `:94-97`:

    shouldRaise[\IndexOutOfBounds[\(ZZ32,ZZ32)\]\](fn () => ((0,0):(9,9)).narrowToRange((2,-1):(5,5)))
    shouldRaise[\IndexOutOfBounds[\(ZZ32,ZZ32)\]\](fn () => ((0,0):(9,9)).narrowToRange((2,2):(8,10)))
    shouldRaise[\IndexOutOfBounds[\(ZZ32,ZZ32,ZZ32)\]\](fn () => ((0,0,0):(9,9,9)).narrowToRange((2,2,-1):(5,5,5)))
    shouldRaise[\IndexOutOfBounds[\(ZZ32,ZZ32,ZZ32)\]\](fn () => ((0,0,0):(9,9,9)).narrowToRange((2,2,2):(5,5,10)))

The open range's five methods, before, then after:

    (:).truncL(3)          LeftScalarRange(3,1)     ->  FAIL: truncL of the trivial open range (:), whose index type is Any
    (:).truncR(3)          RightScalarRange(3,1)    ->  FAIL: truncR of the trivial open range (:), whose index type is Any
    (:).every(3)           OpenScalarRange(3)       ->  FAIL: every of the trivial open range (:), whose index type is Any
    (:).imposeStride(3)    OpenScalarRange(3)       ->  FAIL: imposeStride of the trivial open range (:), whose index type is Any
    (:).atMost(3)          ExtentScalarRange(3,1)   ->  FAIL: atMost of the trivial open range (:), whose index type is Any
    (:):3                  OpenScalarRange(3)       ->  FAIL: imposeStride of the trivial open range (:), whose index type is Any
    (:)#3                  ExtentScalarRange(3,1)   ->  FAIL: atMost of the trivial open range (:), whose index type is Any

Each stop ends the run with `FailCalled` at `Library/FortressLibrary.fss:56`.

Two stops became values:

    f[2:8:3], f the frozen array of 0, 10, ..., 90         stop: Cannot find definition for method lower given receiver StridedFullParScalarRange  ->  [0#3](immutable)[ 20 50 80 ]
    ps.indexValuePairs.indices, ps = {/<|1, 2|>, <|3|>/}   stop: Cannot find definition for method indices given receiver fastPrefixSet[\ZZ32,List[\ZZ32\]\]  ->  [0,1]

Unchanged, and checked: `(:).narrowToRange(:)` is `TrivialOpenRange()`, and `(:).narrowToRange(0:5)` finds no overload before and after: `(:)` is a range over `Any`, and generics are invariant. Row 659's `(((0,0)#).every(-1,1))` still stops, "shouldn't happen: combine2D of non-uniform ranges ...4,3,2,1,0] and [0,1,2,3,4...".

## 7. The other checks

- The ladder subset holds the five files whose recorded first errors or imports name what the change touched. `OpenRangeCase` names `Range`. `RandomTest` and `RangePrototype` name `OpenRange`, `BoundedRange` and `RangeWithExtent` among their missing names. `nativeImmutableArrayTest` names `ImmutableArray1`. `parametricManiaCompr` imports `PrefixSet`. The gate's ladder runs none of them, so the comparand is the baseline's `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`. The drivers were copied under `tmp/rung-range-kinds/ladder/` as `gate.md`, "The ladder regression", says. All five keep their phase and first error: `OpenRangeCase` typecheck, "Incorrect number of static arguments for type 'CompilerLibrary.Range': provided 1, expected 0"; `RandomTest` and `RangePrototype` disambiguate, "LexicographicOrder is undefined."; `nativeImmutableArrayTest` disambiguate, "Array1 is undefined."; `parametricManiaCompr` disambiguate, "ImmutableArray is undefined.". The ladder compiles against the compiler's library, which the rung does not touch.
- The merged tree with rung W. W's load checks read every component that walk loads, and W refuses an object that inherits an abstract method with no body, which the abstract `narrowToRange` could meet. So a scratch worktree, `tmp/rung-range-kinds/mergedW`, was made from the base build at `7425daa51`, with `origin/wip/rung-walk-load-checks` (`8803d2f45`) merged. It was built (`ant compileAll`, `BUILD SUCCESSFUL`), and its own harness ran this rung's 14 files, four range tests and W's 13 tests. All passed: `Tests run: 26, Failures: 1`, the one being `XXXComprisesLibraryTraitUnlistedExtender` run without its `.test` file. Run again with it: `Saw expected failure: loaded and ran, not refused at load`, `OK (1 test)`. The scratch worktree is removed. `git merge-tree` finds no conflict with G's, S's, C's or W's branch.
- Competing declarations: `grep -rn "checkSelection\|narrowToRange"` over `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `other_compiler_tests`, `test_library` and `ProjectFortress/src/com/sun/fortress` finds only calls of `narrowToRange` in `RangePrototype.fss` and `RangeDeclarations.fss`, and no declaration of `checkSelection2D` or `checkSelection3D`. The compiler's library declares neither name.

## 8. Points to report

1. **Values that walk prints change** (section 6). These are item 50's four raises, with the pin at `ProjectFortress/tests/RangeKindBodies.fss:94` before and after, and the raises of the arrays' range subscripts and subarrays of rank 2 and 3 with a corner outside on one axis, which the base cut to the bounds or read past them (`ProjectFortress/tests/ArrayRangeCornerBounds.fss`, the skeptic's); item 49's five stops, and two more through library operators; and two stops that become values (rows 608 and 658).
2. **Library callers of the open range's five methods**, found by reading. `opr :[\I\](r: Range[\I\], stride:I) = r.imposeStride(stride)` (`Library/FortressLibrary.fss:4110`) reaches `imposeStride` for `(:):3`. `opr #[\I\](r: PartialRange[\I\], size:I) = r.atMost(size)` (`:4115`) reaches `atMost` for `(:)#3`. Both now stop. `Range.truncR`'s default (`:3815`) calls `truncL`, but `TrivialOpenRange` overrides `truncR`. No stop came in the interpreter suite (534 tests, 0 failures) or in the merged tree's run.
3. **New api declarations beyond the moved bodies**:
   - `checkSelection2D` and `checkSelection3D` (`Library/RangeInternals.fsi:44`, `:46`). `checkSelection`'s own declaration is narrowed from generic in `I` to `ZZ32` (`:42`).
   - The 12 meets over an open range in `Library/RangeInternals.fsi` (`:58`, `:82`, `:116`, `:147`, `:164`, `:180`, `:256`, `:270`, `:280`, `:426`, `:452`, `:474`).
   - `TrivialOpenRange`'s two `narrowToRange` (`Library/FortressLibrary.fsi:2212-2213`).
   - The nine moved bodies' declarations themselves (section 1.1).

   No team declaration is removed. Each extension's precedent line is in section 4.
4. A declaration of the reductions section edited: none.
5. A team test line changed: none. `RangeKindBodies.fss` is the revival's (batch 11's rung L).
6. A checker or walk edit, or a site whose only repair is a checker change: none.

## 9. Decisions

1. **The bounds check is three functions named by rank** (`checkSelection` at `ZZ32`, `checkSelection2D`, `checkSelection3D`). Walk refuses two overloads of one name over `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]`. A probe of plain overloads printed "first parameters this:[Range[\(ZZ32,ZZ32)\],Range[\(ZZ32,ZZ32)\]] and this:[Range[\ZZ32\],Range[\ZZ32\]] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present". A probe of generic ones printed "... have parameters with generic type, at least one pair of parameters must have excluding types". This is row 416: walk applies no instantiation exclusion. RangeInternals names its other per-rank helpers by rank (`combine2D`/`combine3D`, `fullRange2D`/`fullRange3D`). The rank-1 function keeps the team's name, at its index type. Not taken:
   - overloads of one name, which walk refuses;
   - methods of `ScalarRange`, `Range2D` and `Range3D`, three new api methods in place of the team's top-level function;
   - a typecase or overloaded helpers inside one generic function, rung L's decision 6, not taken by the brief.
2. **Rank 2 and 3 compare with `PCMP`.** A left corner raises when `tfl PCMP ofl` is `GreaterThan` or `Unordered`, a right corner when `tfr PCMP ofr` is `LessThan` or `Unordered`. That is the team's `tfl > ofl` and `tfr < ofr` read point by point, with a corner outside on one axis raising, as POSITIONS' example needs. The test is spelled with `=` on `Comparison`, as `StandardPartialOrder` spells `<` (`LessThan = (self CMP other)`, `Library/FortressLibrary.fss:227`), in the loops' generator clauses as the team wrote them. Not taken:
   - `Comparison`'s own order, `(tfl PCMP ofl) <= EqualTo`, which rests on the order of the comparisons and on dispatch to `TotalComparison`'s `>=(self, other: Unordered)`;
   - a typecase on the comparison inside the loop, the moved `FORWARD_CMP` bodies' form, which restructures the team's loop;
   - per-axis scalar comparisons, not `PCMP`, which POSITIONS names.
3. **The moved bodies keep the generic declarations' types at the index type** (`Range[\ZZ32\]`, `BoundedRange[\ZZ32\]`, `FullRange[\ZZ32\]`, and the pairs and triples). They also keep the explicit static argument, as rung L moved `CMP` with the generic signature. Not taken: the kinds' own types (`ScalarRange`, `BoundedScalarRange`, `FullScalarRange`), which the meets would also have to take, and which no caller reads.
4. **Each kind and each open range declares the meet over an open range** (section 1.2), as the count asked. Not taken:
   - making the generic `OpenRange` overloads abstract as well, which needs the same meets and leaves `TrivialOpenRange` with two more to declare;
   - removing the generic `OpenRange` overloads, which removes three team declarations, and whose pair with `OpenRange`'s own still needs meets at the open kinds;
   - a generic default body for `narrowToRange(other: Range[\I\])` without the check, the generic fallback that item 40's way (a) replaces.
5. **Row 654 takes the sibling's typecase** in the generic `FullRange` (`Library/FortressLibrary.fss:3944-3950`), the team's own body for the same mismatch, `INTERSECTION` answering `BoundedRange` where `FullRange` is declared. The full kinds' meets carry the same typecase. Not taken:
   - a `FullRange` meet of `INTERSECTION` over an `OpenRange`, a new api declaration with bodies at the kinds;
   - widening the declared type, which breaks the return-type rule against the sibling;
   - a body at each kind only, with the generic abstract, which removes the team's body for no site.
6. **`TrivialOpenRange` declares `narrowToRange(other: Range[\Any\]) = self INTERSECTION other`**, because the generic declaration is abstract. It is the generic body without the check, which an open range never fails, as rung L's decision 5 gave it `CMP`. Walk reaches it with no range of a `ZZ32` kind (section 6). Not taken: `fail`, a stop that no program reaches either.
7. **Q49 at its default, way (a).** The five methods fail and keep their declared types, and their messages name the method and `(:)`. Not taken: ways (b) and (c), the curator's to choose. Under (b) or (c) the five bodies and the five stop tests are dropped.
8. **The five stops are tested as five refusal pairs.** Each test's top-level variable calls the method, and its keys are `load_exception_contains=FailCalled` and `load_err_contains=<message>`. `fail` prints `FAIL: ...` to the error stream before it throws (`Library/FortressLibrary.fss:54-57`), and a plain test whose output holds `FAIL` is red even when it catches the exception (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:382-385`, `:418`). So the brief's one test that catches the five stops cannot be green. A failure while the top-level variables are initialised counts as a refusal (`tests-writing.md`). Not taken:
   - one plain test catching the five, red by the harness's rule;
   - throwing `FailCalled` without `fail`, not the library's way;
   - a file name holding `QuickCheckTest`, the harness's exemption, which no such test uses.
9. **Row 658 is repaired at its site**: the getter reads `0 # |s|`. Not taken:
   - an `indices` on `PrefixSet`, a new api declaration, which the brief excludes;
   - removing the getter so that `ZeroIndexed`'s is inherited, which removes a team declaration.
10. **Row 608 reads `r'.left.get`** as `Array1`'s twin does, the stride kept. The twin's `(*'*)` comment is not copied, since a comment after an expression becomes part of its declaration's span (`library.md`, "Editing").
11. **The tests split by direction.** `RangeNarrowKinds` asserts only the values and raises that both orders give, so it passes before and after. The values that Q50 changes are in `RangeKindBodies`, failing on the base.
12. **The merged tree with W was checked in a scratch worktree** (section 7), because W's check could refuse the library at load in the gate. Not taken: leaving it to the gate.

## 10. Defects and their homes

**Home 1, repaired, with an assertion in a plain test:**

- row 655: the count and distance stages, and `RangeNarrowKinds.fss`;
- row 657: `RangeKindBodies.fss:94-97`, and at the arrays' subscripts and subarrays `ArrayRangeCornerBounds.fss` (the skeptic's);
- row 654: the stages, and `RangeNarrowKinds.fss:36-38`;
- row 656: the stages, and the five `TrivialOpenRange*Stop` pairs;
- row 658: `PrefixSetIndices.fss`;
- row 608: the stages, and `ImmutableArrayRangeSubscript.fss`. The walk stop on a strided subscript was not in the row. It is a note on the row, which the test closes.

**Home 3, a new row (`NEW-R-1` in record.md):** the range subscripts of `ImmutableArray1` and `Array1` pass `reflect`'s `NatParam` sizes to `__subarrayI` and `__subarray`, which take `N[\s\]`. The immutable site (`Library/FortressLibrary.fss:2257`) showed once row 608's site typed; the mutable one (`:2315`) is on the landed list, class V2. The specification is silent on how `reflect`'s result types (the array forks' fork 4, `explorations/reviews/array-design-ways.md` section 4), and no program compiles against the one library, so the row is the record: reproducer, the per-site list.

**Notes, not repairs:**

- rows 599 and 600, closed: their last sites, rows 654 to 656, are gone;
- row 634: `narrowToRange` no longer reaches the tuples' order, and its 18 sites stay;
- row 659: unchanged, it still stops;
- row 416: walk's refusal of overloads over two instantiations decided the per-rank names;
- row 488: the `BIG LEXICO` site's loss in this run;
- row 577: the classes again.

## 11. Commands worked out

- The by-site comparison of section 3. A script maps each line of `errors.tsv` in the two edited components back to the base through `git diff -U0 7fa767d48 HEAD -- <file>`'s hunks, and compares the multisets of (kind, mapped location, message) with the per-site list. It printed the ten gone and one new of the table.
- Testing a `fail` stop under walk: a top-level variable that calls it, with `load_exception_contains=FailCalled` and `load_err_contains=<the message>` (decision 8).
- A scratch merged tree: `seed-worktree.sh <base-build> <tree>/tmp/<dir> - <commit>`, then `git merge` of the other branch inside it, `ant compileAll`, its own `harness-one.sh`, and `git worktree remove --force` afterwards.

## 12. Questions for the curator

- Q49 is still open. This rung runs at its default, way (a). Under (b) or (c), the five `fail` bodies (`Library/FortressLibrary.fss:3872-3883`) and the five `TrivialOpenRange*Stop` pairs are dropped, and the five sites come back. Under (c), the operators `(:):s` and `(:)#n` (`:4110`, `:4115`) are callers to weigh.
