# Rung L of climb batch 11: the ranges under items 39 to 41, and three slips

- problem: the 36 range sites of rows 599 to 601 in the landed per-site list, the first `explorations/compile-ladder/gate/distance-sites.tsv:125` (`checkSelection`, `Library/RangeInternals.fss:129`); rows 633 and 638 by reading, no site
- spec: none for the ranges (`Specification/basic/expressions/ranges.tex:12-147`, section "Ranges", describes no range of rank 2 and no `flip`, `every`, `forward` or `#(0,n)`); the getter rule, `Specification/basic/traits.tex:493` (section "Method Declarations"); the throw rule, `Specification/basic/expressions/throw.tex:22` (section "Throw Expressions")
- precedent: the rank-1 bounded kind and its meets, `BoundedScalarRange` (`Library/RangeInternals.fsi:234-246`); the rank-1 kinds declaring their own `every` (`Library/RangeInternals.fsi:125-139`, `:176-195`, `:269-289`) and the comparisons at `ZZ32` (`Library/RangeInternals.fss:87-121`); rung N's throw, `Library/FortressLibrary.fss:2440`
- deviation: `BoundedRange2D`'s and `BoundedRange3D`'s two `CAP` meets have `fail` bodies, where `BoundedScalarRange`'s second has the working body (`Library/RangeInternals.fss:593-608`); the moved comparisons use the eager `SYMMETRIC_PARTIAL` where the generic bodies used the lazy `SYMMETRIC_PARTIAL:` (`Library/RangeInternals.fss:155-157`)
- historical: `Library/RangeInternals.fsi`, `Library/RangeInternals.fss`, `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`, `Library/Set.fss`, `Library/PrefixSet.fss`, `Library/CaseInsensitiveString.fss`, `Library/QuickCheck.fss`, `Library/Reflect.fss`, `Library/ReflectiveQuickCheck.fss` (first edits `Library/RangeInternals.fsi:45`, `Library/RangeInternals.fss:145`, `Library/FortressLibrary.fsi:2172`, `Library/FortressLibrary.fss:3814`, `Library/Set.fss:154`, `Library/PrefixSet.fss:478`, `Library/CaseInsensitiveString.fss:27`, `Library/QuickCheck.fss:743`, `Library/Reflect.fss:376`, `Library/ReflectiveQuickCheck.fss:181`)

The harness refused the write of this file; the text is the report.

Branch `wip/rung-range-types`, base `83b1cae78`. Commits: the tests `3945afdbc`; the edit `d451dba04`; the repair of what the distance stage refused in it, `b28e3e7e1`. Nothing under `ProjectFortress/src/` changed: no Java, no Scala, no build.

## 1. What changed, and why

The curator's answers to Q3 (POSITIONS, "The order of the work after batch 10."): item 39 way (a), item 40 way (a), item 41 way (a). Of the 36 sites, 28 are gone and 8 are left, each under a new row (section 10). The count stays 1; the distance falls 253 to 226 (section 3).

### 1.1 Item 39, row 599: the bounded kinds of rank 2 and 3 (14 of 15 sites)

- `BoundedRange2D` and `BoundedRange3D` are the meets of `Range2D`/`Range3D` and `BoundedRange[\(ZZ32,ZZ32)\]`/`BoundedRange[\(ZZ32,ZZ32,ZZ32)\]`, as `BoundedScalarRange` is of `ScalarRange` and `BoundedRange[\ZZ32\]` (`Library/RangeInternals.fsi:250-262`, `Library/RangeInternals.fss:593-608`).
- `LeftRange2D`, `RightRange2D`, `FullRange2D` and their rank-3 twins extend them (`Library/RangeInternals.fsi:295`, `:312`, `:358`, `:376`, `:415`, `:435`; `FullRange2D` and `FullRange3D` name the bounded kind in place of `Range2D`/`Range3D`, which it extends).
- `combine2D(i: BoundedScalarRange, j: BoundedScalarRange): BoundedRange2D`, and its rank-3 twin, answer the bounded kind; their bodies are `combine2D(ScalarRange, ScalarRange)`'s `fail`, since each bounded pair of one kind has its own overload (`Library/RangeInternals.fss:590-591`, `:600-601`).
- With them:
  - the six `CAP` meets of rung R lose their `cast` and answer the bounded kind (`Library/RangeInternals.fss:705-707`, `:751-754`, `:875-877`, `:921-924`, `:1095-1097`, `:1158-1161`);
  - `forward` of the left and right kinds builds through `combine2D`/`combine3D` and answers the bounded kind (`:699-700`, `:745-746`, `:869-870`, `:915-916`);
  - `ActualRange2D.every` and `imposeStride` build through `combine2D` and answer `Range2D` (`:222-225`; rank 3 `:291-298`), and `ScalarRange` declares `imposeStride` abstract (`Library/RangeInternals.fsi:49`);
  - `truncL` and `truncR` answer the bounded kind of their rank: `Range[\I\]`'s answer `BoundedRange[\I\]` (`Library/FortressLibrary.fss:3814-3815`), with `BoundedRange[\I\]` declaring `flip(): BoundedRange[\I\]` (`:3904`); `ScalarRange`'s `truncL` is abstract and its body, unchanged, is `BoundedScalarRange`'s (`Library/RangeInternals.fss:145`, `:539-542`); `ScalarRange` declares `flip` abstract and `truncR` (`:146`); `Range2D`'s and `Range3D`'s answer `BoundedRange2D`/`BoundedRange3D`.
- Walk: every `recombine` was `combine2D(i, j)` or `combine3D(i, j, k)`, so building through them changes no value walk printed; the two runs that stopped answer (`RangeBoundedEveryForward.fss`).
- Left: `FullRange.narrowToRange(other: OpenRange[\I\])` (`Library/FortressLibrary.fss:3939`), row 654, decision 4.

### 1.2 Item 40, row 600: the comparisons at the `ZZ32` kinds (11 of 18 sites)

- `CMP`: `Range[\I\]` declares it abstract (`Library/FortressLibrary.fss:3844`); `ScalarRange`, `Range2D` and `Range3D` hold the body (`Library/RangeInternals.fss:155-157`, `:209-211`, `:276-278`); `TrivialOpenRange`, the one range over `Any`, declares `self FORWARD_CMP other.forward()` (`Library/FortressLibrary.fss:3883`), decision 5.
- `FORWARD_CMP`: `ExtentRange`, `LeftRange`, `RightRange` and `FullRange`'s second declare it abstract (`Library/FortressLibrary.fss:3896`, `:3922`, `:3934`, `:3949`); the bodies, the team's with the index type `ZZ32`, a pair or a triple, are in `ExtentScalarRange`, `ExtentRange2D`, `ExtentRange3D` (`Library/RangeInternals.fss:454`, `:495`, `:526`), the left kinds (`:654`, `:708`, `:755`), the right kinds (`:823`, `:878`, `:925`) and the full kinds (`:1028`, `:1102`, `:1166`).
- The size: `CompactFullRange[\I\]` declares `|self|` abstract, at `ZZ32` in the api too, where the api said `I` (`Library/FortressLibrary.fsi:2272`); `CompactFullScalarRange`, `CompactFullRange2D` and `CompactFullRange3D` hold the typecase's three branches (`Library/RangeInternals.fss:1189-1192`, `:1303-1307`, `:1340-1344`). Walk runs the first parent's declaration for `CompactFullRange2D` (`extends { CompactFullRange[\…\], FullRange2D }`), so the rank-2 and rank-3 kinds need their own, which the first development walk run showed ("MethodClosure |_|(self:CompactFullRange[\I\]) ... has neither body nor def").
- Left: `checkSelection` (2 sites, row 655) and `TrivialOpenRange` (5 sites, row 656), decisions 6 and 7.

### 1.3 Item 41, row 601: `#0`, `#(0,n)` and `#(0,n,m)` (3 of 3 sites)

- `extent2Range` and `extent3Range` write the empty range's bounds in order, `CompactFullRange2D(xx,yy,xx-1,yy-1)` (`Library/RangeInternals.fss:1690`, `:1699`).
- `extent1Range` to `extent3Range` and the three prefix `#` operators are declared `RangeWithExtent[\…\]`, what their bodies answer (`Library/RangeInternals.fsi:636-640`, `Library/FortressLibrary.fsi:2297-2300`, `Library/FortressLibrary.fss:3995-3999`).

### 1.4 Rows 633 and 638

- Row 633: `s.indices` at `Library/Set.fss:154`, `Library/PrefixSet.fss:478` and `Library/CaseInsensitiveString.fss:27`; the sibling count of the defect in those files found one more, `s.generator()` at `Library/CaseInsensitiveString.fss:28`, respelled `s.generator` (decision 10).
- Row 638: `throw ForbiddenException(CallerViolation)` at `Library/QuickCheck.fss:743`, `:757`, `Library/Reflect.fss:376`, `:380`, `Library/ReflectiveQuickCheck.fss:181`, and in the revival's witnesses `ProjectFortress/tests/InferUnfixedBoundWalk.fss:8` and `XXXInferSeveralBoundsWalk.fss:10`, rung N's spelling (`Library/FortressLibrary.fss:2440`). The team's `ProjectFortress/tests/QuickCheckTest.fss:39` is left.

## 2. The tests, first

Committed in `3945afdbc`, before the edit:
- `ProjectFortress/tests/RangeBoundedEveryForward.fss` (new): the two runs that stopped, `((0,0)#).every(-1,-1)` and `((5,5)#).flip().forward()`, with the right-range and rank-3 twins, each value asserted.
- `ProjectFortress/tests/RangeKindBodies.fss` (new): each repaired body called with today's value (the scalar and rank-2/3 `truncL`, `truncR`, `every`, `imposeStride`, `forward`, `CAP`; `CMP`; `FORWARD_CMP` of each kind and rank; the compact sizes; `#0`). In `b28e3e7e1` it gained one assertion of today's rank-2 bounds check (row 657), run on the old code below.
- `ProjectFortress/tests/RangeDeclarations.fss:112-114`: the two pins of item 41 at the new values, and a pin of `#(3,0,2)` (section 8).
- `ProjectFortress/tests/IndicesGetterCalls.fss` (new): `indices` on a set's index-value pairs and on a `CaseInsensitiveString`, and the latter's `generator`, with today's values. A prefix set is not in it: its `indices` stops walk before and after (row 658).

The failing run, on the base library, 2026-10-09T01:21:36Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-range-types/h-before ProjectFortress/tests/RangeBoundedEveryForward.fss ProjectFortress/tests/RangeKindBodies.fss ProjectFortress/tests/IndicesGetterCalls.fss ProjectFortress/tests/RangeDeclarations.fss
    FAIL: J30/0:CompactFullRange2D(0,-1, 0,-1) =/= J30/0:CompactFullRange2D(0,0, -1,-1); #(0,3) is the empty full range from (0,0) to (-1,-1)
    . interpret tmp/rung-range-types/h-before/tests/RangeBoundedEveryForward
    Unification error: Closure/Constructor for recombine param 1 (i:LeftScalarRange) got arg RightScalarRange of type RightScalarRange
    Tests run: 4,  Failures: 2,  Errors: 0

`RangeKindBodies` and `IndicesGetterCalls` passed there. Both, `RangeKindBodies` with its later assertion, pass on the old code (2026-10-09T01:35:16Z):

    FORTRESS_HOME=/home/user/fortress-base11 /home/user/fortress-base11/explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-ranges/tmp/rung-range-types/old-harness .../RangeKindBodies.fss .../IndicesGetterCalls.fss
    OK (2 tests)

The passing run, on the last code state (`b28e3e7e1`'s library), 2026-10-09T01:52:23Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-range-types/h-dev1 <the four files>
    OK (4 tests)

The interpreter suite once on `b28e3e7e1` (`ant testSystem`): "BUILD SUCCESSFUL", "Total time: 3 minutes 9 seconds"; the four shards ran 132, 124, 131 and 132 tests, 519 in all, no failure: batch 10's 516 and the three new files. Before it, on `d451dba04`, 45 range, set, reflection and inference tests through the harness: "OK (45 tests)".

No `XXX` test is added.

## 3. The checker count and the distance

The before is batch 10's landed tables (`explorations/compile-ladder/climb-batch-10/gate/checker-count.txt`, `distance.txt`) and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv`. The after is one run of each on `b28e3e7e1`.

The count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-range-types/checker-count-postedit.txt tmp/rung-range-types/cc-post` (161 s): `diff` against batch 10's table prints nothing; `#total 1`, `FortressLibrary 2`, `RangeInternals 0`, `#crash none`.

The distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-range-types/distance-postedit.txt tmp/rung-range-types/dist-post` (1,127 s; nproc=4, Intel Xeon 2.10 GHz, load at start 0.46, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`), compared by `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-10/gate/distance.txt tmp/rung-range-types/distance-postedit.txt`:

    DISTANCE DOWN   253 -> 226 (-27)
        kind typecheck              201 -> 174    (-27)
        class I1                      3 -> 2      (-1)
        class RG                     10 -> 0      (-10)
        class BR                      3 -> 4      (+1)
        class GF                      2 -> 1      (-1)
        class OT                    100 -> 84     (-16)
        unit component FortressLibrary    215 -> 204    (-11)
        unit component RangeInternals     20 -> 4      (-16)

Read by row (row 577), the after's `errors.tsv` with its lines mapped back to the base through `git diff -U0 83b1cae78` (`tmp/rung-range-types/scripts/remap.py`), against the per-site list: 29 entries gone, 2 new.
- Row 599, 14 gone: `Library/RangeInternals.fss:145`, `:180`, `:182`, `:217`, `:219`, `:239`, `:241`, `:283`, `:287`, `:626`, `:658`, `:754`, `:786`, `Library/FortressLibrary.fss:3815` (base lines). Left: `:3973` (now `:3939`).
- Row 600, 11 gone: `FortressLibrary.fss:3845`, `:3898`, `:3931`, `:3956`, `:3984`, `:3985`, `:3994` (three), `:3995`, `:3996`. Left: `RangeInternals.fss:129`, `:133`; `FortressLibrary.fss:3875`, `:3876`, `:3879`, `:3880`, `:3881` (now `:3873-3879`).
- Row 601, 3 gone: `RangeInternals.fss:1512`, `:1520`, `:1528`.
- `FortressLibrary.fss:3881`, `TrivialOpenRange.atMost`: gone and new with one change of message, "ExtentRange" to "RangeWithExtent" for the `#` it calls; the site stays (row 656).
- New, outside the rung's declarations: `FortressLibrary.fss:130`, "Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\]", at `BIG LEXICO(g)`, the one big operator over a generator without a return type, which row 488 names as moving under edits that touch none of its declarations.
- So 28 of the 36 sites are gone, and 253 − 28 + 1 = 226. The stage's classes file the 28 under RG 10, OT 16, I1 1 and GF 1, by stale line ranges (row 577).
- Rung E's sites in these sections, `RangeInternals.fss:160-161` and `FortressLibrary.fss:3940`, are unchanged; the gate measures them on the merged tree.

A development run of the distance stage on `d451dba04`, code no longer measured, refused what `b28e3e7e1` then repaired: "Invalid overloading of CAP in trait BoundedRange2D" (and `BoundedRange3D`) four times, since a component's bodiless functional methods of its own traits are not counted as meets (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:139-141`), and nine "Could not check call to operator SYMMETRIC_PARTIAL ... not applicable to an argument of type (Comparison, ()->Comparison)", since `FortressLibrary`'s api exports no lazy form (`Library/FortressLibrary.fsi:105-165`). It read 239. Its count, also on `d451dba04`, read 1. No stage's driver ran on part of the library.

## 4. Where the fix belongs, and the precedent search

- Place: the one library's ranges, `Library/RangeInternals` and the ranges section of `Library/FortressLibrary` (`explorations/coordinator/map/modules-and-phases.md:205`: the interpreter's prelude in `Library/`). No checker or walk edit.
- The bounded kind: `BoundedScalarRange` names the meet of `ScalarRange` and `BoundedRange[\ZZ32\]` and declares its `CAP` meets with bodies; followed for rank 2 and 3. The file's other meet traits: `PartialScalarRange`, `ScalarRangeWithExtent`, `ScalarRangeWithLeft`, `ScalarRangeWithRight` (`Library/RangeInternals.fsi:121`, `:172`, `:264`, `:327`).
- A body at the kinds where its types are known: the rank-1 kinds each declare `every`, `imposeStride` and `flip` at their own type (`Library/RangeInternals.fsi:125-139`, `:176-195`, `:269-289`); the comparisons are declared only at `ZZ32` and the two tuple types (`:30-40`). Followed for `CMP`, `FORWARD_CMP` and the size.
- `fail` for a declaration no library type reaches: `ScalarRange`'s and `Range2D`'s `CAP` over a plain `Range` (`Library/RangeInternals.fss:151-152`, `:186-187`). Followed for the two bounded meets.
- The same defect elsewhere: the casts were six (rung R), all gone. Getters called with `()` in `Library/` and `ProjectFortress/LibraryBuiltin/` (`grep -n '\.indices()\|\.generator()\|\.size()\|\.isEmpty()\|\.bounds()\|\.left()\|\.right()\|\.stride()'`): four, row 633's three and `CaseInsensitiveString.fss:28`. The bare `throw ForbiddenException` in `Library` and `ProjectFortress/tests`: row 638's seven and the team's `QuickCheckTest.fss:39`.

## 5. What the specification settles

- Silent on ranges of rank 2 and 3, on `flip`, `every`, `forward`, `truncL`, the extent range of a zero extent and on range comparison beyond containment (`ranges.tex`, section "Ranges"); the library's own practice is the standard (POSITIONS, "The library's own practice is the standard"). The sizes the section gives, such as `|3:7|` is 5, hold (`RangeKindBodies.fss`).
- "A getter method must be invoked with the field access syntax" (`traits.tex`, section "Method Declarations"): row 633.
- "A throw expression evaluates its subexpression to an exception value" (`throw.tex`, section "Throw Expressions"): row 638.

## 6. Old against new

Each with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base11 /home/user/fortress-ranges/tmp/old-caches P.fss` for the old code and `bin/fortress P.fss` in the worktree for the new:
- `ProbeBodies.fss`, 84 values of the repaired bodies: the old values are those `RangeKindBodies.fss` asserts, which the new code passes.
- `ProbeGen.fss`: `for p <- seq(#(0,3))` printed "element (0,-1)" and "elements of #(0,3): 1"; now "elements of #(0,3): 0".
- `ProbeNew.fss`: `(:) CMP (:)` stopped at `Library/FortressLibrary.fss:3845` ("Failed to find any matching overload, args = ((): (),(): ())" for `SCMP`); now `EqualTo`. `((0,0)#).every(-1,1)` stopped with "Unification error ... recombine param 1 (i:LeftScalarRange) got arg RightScalarRange"; now "FAIL: shouldn't happen: combine2D of non-uniform ranges ...4,3,2,1,0] and [0,1,2,3,4..." (row 659).
- `ProbeTrivial.fss`: `(:).truncL(3)` is `LeftScalarRange(3,1)` and `(:).atMost(3)` `ExtentScalarRange(3,1)`, before and after.
- `ProbeCast.fss`: `cast[\RangeWithLeft[\Any\]\](x#)` raises `CastError` at `Library/FortressLibrary.fss:36` on the old code (decision 7).
- `ProbeGetters.fss`: a prefix set's `indexValuePairs.indices` stops on the old code with "Cannot find definition for method indices given receiver fastPrefixSet" (row 658).
- `ProbeSel.fss`: `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` is `CompactFullRange2D(2,0, 5,5)` and `(-1,2):(5,5)` raises `IndexOutOfBounds[\(ZZ32,ZZ32)\]` on the old code (row 657).

## 7. Sentences of the specification made false

None. `grep -rn` over `Specification/` for `truncL`, `truncR`, `RangeWithLeft`, `ExtentRange`, `BoundedRange`, `FORWARD_CMP`, `CompactFullRange`, `RangeInternals` and `CaseInsensitiveString` finds only the grammar's nonterminal *ExtentRange* (`Specification/appendices/grammars/concrete-syntax.tex:1154`, `:1209-1211`), the array-size syntax; no Appendix I entry and no `\revision` or `\note` on walk's ranges names a changed value.

## 8. Points to report

- **A value walk prints that changes.**
  - `|#(0,3)|`: 1 before, 0 after; `(#(0,3)).asDebugString`: "CompactFullRange2D(0,-1, 0,-1)" before, "CompactFullRange2D(0,0, -1,-1)" after. The two pins at `ProjectFortress/tests/RangeDeclarations.fss:112-113` change so; their messages from "today's value: #(0,3) is an empty full range written with its bounds out of order" and "today's value: #(0,3) answers one element" to "#(0,3) is the empty full range from (0,0) to (-1,-1)" and "#(0,3) has no elements".
  - `(#(3,0,2)).asDebugString`: "CompactFullRange3D(0,-1,0, -1,0,-1)" before, "CompactFullRange3D(0,0,0, -1,-1,-1)" after, pinned at `RangeDeclarations.fss:114`; its size was 0 and stays 0.
  - `for p <- seq(#(0,3))`: one element, `(0,-1)`, before; none after.
  - Runs that stopped now answer: `((0,0)#).every(-1,-1)` is `RightRange2D(0,0, -1,-1)`; `((5,5)#).flip().forward()` `LeftRange2D(5,5, 1,1)`; `(:(5,5)).every(-1,-1)` `LeftRange2D(5,5, -1,-1)`; `(:(5,5)).flip().forward()` `RightRange2D(5,5, 1,1)`; the four rank-3 twins (`RangeBoundedEveryForward.fss:6-13`); `(:) CMP (:)` is `EqualTo` (`Library/FortressLibrary.fss:3883`).
  - A stop's message changes: `((0,0)#).every(-1,1)` (section 6; row 659).
  - Added by the skeptic, from its differential over every kind of rank 1 to 3 (`SKEPTIC.md`, section 3): every value read from an extent range with a zero extent of rank 2 or 3 follows the new bounds. `(#(0,3)).isEmpty` was false and is true (`#(3,0)` and `#(0,0)` the same); its `extent` was `Just((1,1))` and is `Just((0,0))`; its `left` and `right` were `Just((0,-1))` and are `Just((0,0))` and `Just((-1,-1))`. Its `CMP` and `FORWARD_CMP` against the left range and the full range of stride 1 of its rank, and its `FORWARD_CMP` against a strided full range, were `Unordered` and are `GreaterThan` or `LessThan`, as against `5:3` at rank 1. Its `CAP`, `narrowToRange`, `truncL`, `truncR`, `every`, `imposeStride`, `flip` and `atMost` answer ranges built from the new bounds, `SUM[\ZZ32\][(i,j) <- #(0,0)] 1` was 1 and is 0, and `#(3,0,2)`'s `left`, `right` and `extent` change as well. Narrowing a range of rank 2 or 3 to `#(0,3)`, or `#(0,3)` to one, and subscripting an array by it raised `IndexOutOfBounds` ("([0] BY [-1]) left outside bounds ..."). They now answer the empty range, as narrowing to `5:3` does at rank 1: `((0,0):(5,5)).narrowToRange(#(0,3))` is `CompactFullRange2D(0,0, -1,-1)`, and an array of 3 by 4 subscripted by `#(0,3)` has no elements.
- **A team declaration removed:** none removed. Team bodies moved to the kinds with their declarations kept abstract: `Range.CMP`, the `FORWARD_CMP` of `ExtentRange`, `LeftRange`, `RightRange` and `FullRange`, `CompactFullRange`'s size, `ScalarRange.truncL` (into `BoundedScalarRange`); `ActualRange2D/3D.every` and `imposeStride` rebuilt through `combine2D`/`combine3D`. Team declared types changed: decision 3.
- **No new api type beyond `BoundedRange2D` and `BoundedRange3D`.** New api functions: `combine2D` and `combine3D` over bounded scalar ranges (`Library/RangeInternals.fsi:248`, `:256`); new api members: section 1.
- **A declaration of rung E's two sites edited:** no. `ScalarRange.check` and `FullRange.narrowToRange(other: Range[\I\])` are byte for byte the base's; `FullRange.narrowToRange(other: OpenRange[\I\])` (`:3939`), row 599's site, is left too (decision 4).
- **A team test line changed:** no. The edited test lines are the revival's (`RangeDeclarations.fss`, rung R's; `InferUnfixedBoundWalk.fss` and `XXXInferSeveralBoundsWalk.fss`).
- **A checker or walk edit:** none. A site whose only repair is a checker change: none; `:3939`'s ways are the sibling's typecase once rung E lands, or a `FullRange` meet over an `OpenRange` (row 654).

## 9. Decisions

1. **Item 39's trait carries only its two `CAP` meets, with `fail` bodies; the working bodies stay in the six kinds, without their casts.** Not taken: the working body in the trait, as `BoundedScalarRange` has it, which needs `BoundedRange2D` to declare `range1(): BoundedScalarRange`, so that `FullRange2D` would inherit `range1` from `ActualRange2D[\FullRange2D, FullScalarRange, …\]` and from `BoundedRange2D` with no declaration below both; bodiless meets, which the stage refused (section 3).
2. **`every` and `imposeStride` of rank 2 and 3 answer `Range2D`/`Range3D` and build through `combine2D`/`combine3D`.** `ActualRange2D`'s `T` is false for a negative stride on a left or right range (row 599), and `Scalar1.imposeStride` has no type narrower than `ScalarRange`. Not taken: a body in each of the five kinds per rank (twenty bodies) keeping each kind's own type; `every: BoundedRange2D` in the trait, which would give the left kinds two inherited `every` with no meet. No library caller reads the narrower type (`grep -n 'imposeStride\|\.every(\|recombine' Library/*.fs?`).
3. **Declared types widened to what the bodies answer** (POSITIONS, "The library's own practice is the standard"): `Range.truncL` and `truncR` from `RangeWithLeft`/`RangeWithRight[\I\]` to `BoundedRange[\I\]` (`Library/FortressLibrary.fsi:2172-2173`), with `BoundedRange.flip` (`:2228`); `ScalarRange.truncL` from `ScalarRangeWithLeft` to `BoundedScalarRange`; `Range2D/3D.truncL` and `truncR` to the bounded kind; `ActualRange2D/3D.every` and `imposeStride` from `T` to `Range2D`/`Range3D`; the extents and prefix `#` from `ExtentRange` to `RangeWithExtent` (item 41's answer). Narrowed: the six `CAP` meets and four `forward` from `BoundedRange[\…\]` to the bounded kind; `CompactFullRange.|self|`'s api type from `I` to `ZZ32`, the component's own, since the compact kinds now declare it. Not taken: `cast`, item 39's way (b). Lost: that a range cut on the left has a left end, which no body can show the checker.
4. **`FullRange.narrowToRange(other: OpenRange[\I\])` is left** (row 654). Widening it to `BoundedRange[\I\]` breaks the return-type rule against its sibling `narrowToRange(other: Range[\I\]): FullRange[\I\]` (`:3940`), rung E's site; the sibling's own typecase types only under rung E's change, and a rung does not build on another of its batch (PLAN, "The principle for the batches").
5. **`TrivialOpenRange` declares `CMP` as `self FORWARD_CMP other.forward()`**, `Range`'s body without the stride comparison: its stride is `()`, which `SCMP` does not take. Needed because `Range.CMP` became abstract; it turns the stop of `(:) CMP (:)` into `EqualTo`. Not taken: `fail` (a stop with another message); keeping `Range.CMP`'s body (the site stays).
6. **`checkSelection` is left** (row 655): its three callers are generic, and `FullRange.narrowToRange(other: Range[\I\])` is rung E's site; under item 40's way (a) the comparisons move with the callers after rung E lands. Not taken: a typecase on `(this, other)` inside the generic function; overloaded helpers with a generic fallback.
7. **`TrivialOpenRange`'s five methods are left** (row 656), for the curator: generics are invariant, so no range of a `ZZ32` kind is a `RangeWithLeft[\Any\]`, and walk's `cast` refuses one (section 6); `fail` bodies would turn five values into stops.
8. **The moved comparisons use the eager `SYMMETRIC_PARTIAL`**, the form `RangeInternals` already writes (`Library/RangeInternals.fss:99-121`), since `FortressLibrary`'s api exports no lazy form. Values are the same; the second operand is always evaluated, and each of them answers.
9. **The compact sizes are the typecase's three branches**, not `self.size`: walk ran the typecase for every compact kind; `size` reads the bounds through `narrow`.
10. **The sibling `s.generator()` (`Library/CaseInsensitiveString.fss:28`) is repaired with row 633's three**, the same defect in the same file. Not taken: a note and a later rung.
11. **The ladder subset** is the five files whose recorded first errors or imports name what the change touched: `QuickCheckTest`, `ReflectTest`, `ReflectiveQuickCheckTest` (they import `QuickCheck`, `Reflect`, `ReflectiveQuickCheck`), `RandomTest` and `RangePrototype` (their first errors name `RangeWithExtent`, `ExtentRange`, `BoundedRange`). The gate's ladder runs none of them, so the comparand is the baseline's `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`: all five stay at `disambiguate` with the same first error ("ImmutableArray is undefined." three times, "LexicographicOrder is undefined." twice), drivers copied under `tmp/rung-range-types/ladder/`.

## 10. Defects and their homes

**Home 1, repaired, with an assertion in a plain test:**
- the two stops of row 599 and their twins (`RangeBoundedEveryForward.fss`);
- item 41's bounds and size (`RangeDeclarations.fss:112-114`);
- the bodies of rows 599 and 600 at today's values (`RangeKindBodies.fss`), with the count and distance stages as the test of their sites (section 3);
- row 633 on a set and a `CaseInsensitiveString` (`IndicesGetterCalls.fss`);
- added by the skeptic (`facb1d250`): `(#(0,3)).isEmpty`, narrowing `(0,0):(5,5)` to `#(0,3)`, and `(:) CMP (:)`, three values the base got wrong or stopped on (`RangeDeclarations.fss`).
- Row 638: repaired; no gated program reaches the throws, so the row stays their record.

**Home 3, new rows (`NEW-L-n` in record.md):**
- row 654, `FullRange.narrowToRange(other: OpenRange[\I\])`: silent; walk answers (`RangeDeclarations.fss:104`); reproducer the per-site list.
- row 655, `checkSelection`'s comparisons on `I`: silent; walk answers.
- row 656, `TrivialOpenRange`'s five methods: silent; walk answers; for the curator.
- row 657, the bounds check of rank 2 and 3 compares lexicographically: silent on rank 2; today's value pinned in `RangeKindBodies.fss:94`.
- row 658, `PrefixSet` declares no `indices`: silent; walk stops, so the row alone.
- row 659, a bounded range of rank 2 or 3 strided backwards on some axes only has no kind: silent; walk stops, the row alone.

**Notes:** rows 599, 600, 601, 633, 638 (closes); 577 (the classes, again); 488 (`BIG LEXICO(g)` at `FortressLibrary.fss:130`).

## 11. Greps and commands

- `BoundedRange2D`, `BoundedRange3D` and the three new tests' names: only in the files this rung writes, searching `ProjectFortress/tests`, every `ProjectFortress/*_tests`, `ProjectFortress/test_library`, `Library`, `ProjectFortress/LibraryBuiltin` and `ProjectFortress/src/com/sun/fortress`.
- `IndicesGetterCalls.fss`'s helper `inOrder` is the same as `RangeDeclarations.fss`'s, each in its own component, and names no functional method of the library.
- The batch's `run_bg` wrapper (`nohup bash -c "…"`) was refused by the session's safety check for the distance stage ("passes a shell -c script that runs rm", which it could not inspect); the stage ran instead as the Bash tool's background command, `explorations/coordinator/tools/distance/run.sh … >> tmp/rung-range-types/distance-run.txt 2>&1; echo EXIT=$? >> tmp/rung-range-types/distance-run.txt`, polled with `wait_for`. `ant testSystem` ran the same way.
- `tmp/rung-range-types/scripts/remap.py BASE AFTER_TSV BEFORE_TSV` maps an after's sites to the base's lines through `git diff -U0` hunks and prints the sites gone and new by line and normalised message.
