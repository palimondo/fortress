# Skeptic of rung L, climb batch 11 (rung-range-types)

Judged: `wip/rung-range-types` at `b28e3e7e1`, the worker's head. Base `83b1cae78`. My commits:

- `6eebab9dd`: the worker's `REPORT.md` and `record.md`, written byte for byte from the run's journal. The harness had refused the worker's write of both.
- `facb1d250`: three assertions in `ProjectFortress/tests/RangeDeclarations.fss`.
- `354f7bd33`: corrections of `REPORT.md` and `record.md`.
- This file.

Verdict: **approved**. The change does what the section asks, under Q3's answers. Its test was seen failing on the base and passing on its last code. Its stage tables are those of its head. My differential over every range kind of rank 1 to 3 finds three kinds of change, and all three come from the change as designed:

- the two stops of row 599 and their twins now answer;
- every value read from the empty `#(0,n)` follows its new bounds;
- `(:) CMP (:)` answers.

Nothing of mine is contested. I built nothing. The tables in `REPORT.md` are those of the worker's head `b28e3e7e1`. My commits change only a test and the record, so no count or distance stage was run after them.

## 1. The stage, read against the landed tables

`explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-10/gate/distance.txt tmp/rung-range-types/distance-postedit.txt`:

    DISTANCE DOWN   253 -> 226 (-27)
        kind typecheck              201 -> 174    (-27)
        class RG                     10 -> 0      (-10)
        unit component RangeInternals     20 -> 4      (-16)

The count's table is the same as batch 10's: `diff explorations/compile-ladder/climb-batch-10/gate/checker-count.txt tmp/rung-range-types/checker-count-postedit.txt` prints nothing, and `#total 1`.

Both stages ran on `b28e3e7e1`, after the worker's last edit:

- the last edit of the worker's transcript is call `FwX8qS` at 01:52:23, which also ran the passing harness run;
- the distance stage started at 01:52:57 (call `CnRCw8`), and the count at 01:53:02 (call `q9UYiy`);
- no edit came after them.

Read by row, the worker's mapped list agrees with `REPORT.md` section 3. 29 sites are gone and 2 are new. The site at `FortressLibrary.fss:3881` is gone and new again with one changed word, so 28 sites are gone in all: row 599 14, row 600 11 and row 601 3. `BIG LEXICO(g)` at `FortressLibrary.fss:130` moved in, row 488. So 253 − 28 + 1 = 226.

## 2. Test first, in the worker's transcript

- **The failing run.** Call `ieeKkz`, 01:21:36 to 01:21:53, through `harness-one.sh` on the base's library. Its output shows `FAIL: J30/0:CompactFullRange2D(0,-1, 0,-1) =/= J30/0:CompactFullRange2D(0,0, -1,-1)`, `Unification error: Closure/Constructor for recombine param 1 (i:LeftScalarRange) got arg RightScalarRange` and `Tests run: 4,  Failures: 2,  Errors: 0`. The first library edit is call `CNyrWb`, at 01:23:42.
- **The passing run.** Call `FwX8qS`, at 01:52:23, on the last code: `OK (4 tests)`.
- **The suite.** `ant testSystem` on `b28e3e7e1` (`tmp/rung-range-types/testSystem.txt`, call `eDQZ9T`) gives `BUILD SUCCESSFUL` and `Total time: 3 minutes 9 seconds`. Its shards ran 132, 124, 131 and 132 tests, 519 in all, which is batch 10's 516 (131, 128, 126, 131 in `climb-batch-10/gate/summary.txt`) and the three new files.
- **`RangeKindBodies`' later assertion** (row NEW-L-4) passed on the old code, call `CDNjJj`, as a pin of today's value should.

So `failureWasRecorded` holds.

## 3. My programs, old against new

I wrote these programs under `tmp/rung-range-types/skeptic/`. Each was run under walk:

- the old code with `/home/user/fortress-base11/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base11 /home/user/fortress-ranges/tmp/old-caches P.fss`;
- the new code with `bin/fortress P.fss` in the worktree.

All ran at `FORTRESS_THREADS=1`. The diff writes no mutable variable, field, atomic block or library state, so I made no four-thread column; the harness runs the gated tests at four threads.

A runner, `scripts/diffrun.py`, prints one line per expression and starts the program again after each stop. The ranges it used:

- rank 1: `::1`, `#3`, `2#`, `:5`, `0:5`, `0:8:2`, `9:0:-1`, `seq(1:3)`, `seq(0:8:2)`, `5:3`, `#0`;
- rank 2: `::(1,1)`, `#(2,3)`, `(0,0)#`, `:(5,5)`, `(0,0):(5,5)`, `((0,0):(6,6)).every(2,2)`, `#(0,3)`, `#(3,0)`, `(0,0):(-1,2)`;
- rank 3: their twins, and `#(3,0,2)`.

| set | expressions | stops old / new | values that differ |
|---|---|---|---|
| `CMP` and `FORWARD_CMP`, every pair within a rank | 360 | 1 / 0 | 21 |
| unary: `forward`, `flip`, `truncL`, `truncR`, `every` and `imposeStride` with each sign mix, `atMost`, the getters, the size, the elements | 502 | 14 / 6 | 70 |
| `CAP` and `narrowToRange`, every pair within a rank | 324 | 23 / 17 | 52 |
| arrays, strings, sets and loops over ranges | 58 | (syntax only) | 4 |

Every difference falls into one of these groups:

- **Row 599's stops.** For example, `L2.every(-1,-1)` was `STOP: ... RangeInternals.fss:217:9-69: / Unification error: Closure/Constructor for recombine param 1 (i:LeftScalarRange) got arg RightScalarRange` and is now `RightRange2D(0,0, -1,-1)`. The same holds for the right ranges, for `flip().forward()` and for the rank-3 twins: eight runs that stopped now answer. The six mixed-sign `every` stop on both codes. Their message changes to `FAIL: shouldn't happen: combine2D of non-uniform ranges ...4,3,2,1,0] and [0,1,2,3,4...` (row NEW-L-6).
- **`(:) CMP (:)`.** It was `STOP: ... FortressLibrary.fss:3845:11-20: / Failed to find any matching overload, args = ((): (),(): ())` and is `EqualTo`.
- **The empty `#(0,n)` of rank 2 and 3** (item 41). Every other difference reads `#(0,3)`, `#(3,0)`, `#(0,0)` or `#(3,0,2)`:
  - `(#(0,3)).isEmpty` was `false` and is `true`. Its `extent` was `Just((1,1))` and is `Just((0,0))`. Its `left` was `Just((0,-1))` and is `Just((0,0))`, and its `right` was `Just((0,-1))` and is `Just((-1,-1))`.
  - `((0,0)#) CMP (#(0,3))` and `((0,0):(5,5)) CMP (#(0,3))` were `Unordered` and are `GreaterThan`, as `(0:5) CMP (5:3)` is at rank 1. `FORWARD_CMP` changes the same way, also against a strided full range. `CMP` against a strided range stays `Unordered`, because the strides differ.
  - `CAP`, `narrowToRange`, `truncL`, `truncR`, `every`, `imposeStride`, `flip` and `atMost` answer ranges built from the new bounds.
  - `SUM[\ZZ32\][(i,j) <- #(0,0)] 1` was 1 and is 0.
  - Narrowing to `#(0,3)`, or narrowing `#(0,3)` to a range, raised `IndexOutOfBounds` and now answers the empty range.

All the other values are the same on both codes, the ones listed below among them. So no inherited abstract declaration shadows a body that walk ran before. That was the risk of declaring `CMP`, `FORWARD_CMP` and the size abstract in the generic traits, since walk runs the first parent's declaration of `CompactFullRange2D` (`REPORT.md` section 1.2).

- every `CMP` and `FORWARD_CMP` of the strided, sequential, compact, open, extent, left and right kinds at each rank;
- every size, and every element list of the full kinds;
- every truncation, every stride and every forward of the non-empty kinds;
- array and string subscripts by `1:3`, `1#2`, `:`, `0:4:2` and `#2`, and their 2D and 3D forms;
- `SUM` over full, strided, truncated and backward ranges of rank 2 and 3;
- the indices and generator of a `CaseInsensitiveString`, the indices of a set's index-value pairs, and `Reflect`'s `bottomType` (`BOTTOM` on both).

One program, `SkEmptySubscript.fss`, shows the narrowing and the subscript. On the old code, `old-fortress.sh /home/user/fortress-base11 /home/user/fortress-ranges/tmp/old-caches SkEmptySubscript.fss` prints:

    ([0] BY [-1]) left outside bounds ([0,1,2] BY [0,1,2,3])
    /home/user/fortress-base11/Library/RangeInternals.fss:131:9-45:
    IndexOutOfBounds[\(ZZ32,ZZ32)\]

On the new code, `bin/fortress SkEmptySubscript.fss` prints:

    size of m[#(0,3)]: 0
    (0,0):(5,5) narrowed to #(0,3): CompactFullRange2D(0,0, -1,-1)
    (#(0,3)).isEmpty: true

Row NEW-L-5 holds. `SkPrefixIndices.fss` stops at the same place on both codes, `Cannot find definition for method indices given receiver fastPrefixSet[\ZZ32,List[\ZZ32\]\]`, at `PrefixSet.fss:478:43-52` on the old code and `:478:43-50` on the new.

The revival's `XXXInferSeveralBoundsWalk.fss`, whose witness line the rung edits, fails the same way on both codes: `FAIL: J4/0:ZZ32 =/= J3/0:Red; ...`.

The compiled path reads none of the edited components, since its library is `CompilerLibrary`. `SkRangeLoopCompiled.fss`, compiled and run with each code, prints the same `sum of 0#4  6`, `sum of 2:5  14` and `PASS`.

## 4. The diff, against the section and the decisions

- **Item 39, way (a), the bounded kinds.** `BoundedRange2D` and `BoundedRange3D` are the meets as `BoundedScalarRange` is at rank 1 (`Library/RangeInternals.fsi:234-262`). The six casts are gone (`grep -n 'cast\[' Library/RangeInternals.fss` finds none). Every `recombine` that `every` and `imposeStride` replace was `combine2D` or `combine3D` (`Library/RangeInternals.fss:345-346`, `:490-491`, `:701-702`, `:871-872`, `:1308-1309`, `:1564-1565` and their rank-3 twins), so building through them changes only the stops.
  - Widening `Range.truncL` and `truncR` to `BoundedRange[\I\]` follows from the way: rung R names `truncL`, `truncR` and `Range.truncR` among the declarations that cannot declare what they build (`rung-range-meets/REPORT.md` section 6), and `Range2D.truncL` answering `BoundedRange2D` must fit `Range.truncL`. The worker puts the widening to the curator.
- **Item 40, way (a), the comparisons at the `ZZ32` kinds.** `CMP`, the four `FORWARD_CMP` families and the compact size are the team's bodies with the index type made concrete. Two things differ: a renamed binder (`otherLeft` and `otherRight`, beside the objects' fields `l` and `r`), and the eager `SYMMETRIC_PARTIAL`.
  - The eager form gives the same values: the lazy overload is `self SYMMETRIC_PARTIAL other()` (`Library/FortressLibrary.fss:144`). The comparison sweep found no new stop from evaluating the second operand.
  - What is left is right to leave in this batch. `checkSelection` is called from rung E's `FullRange.narrowToRange(other: Range[\I\])`. `FullRange.narrowToRange(other: OpenRange[\I\])` cannot widen past that sibling's `FullRange[\I\]`.
- **Item 41, way (a).** The bounds are written in order (`Library/RangeInternals.fss:1690`, `:1699`), and the declared types are `RangeWithExtent` (`:1678-1699`; `Library/FortressLibrary.fsi:2297-2300`).
- **Rows 633 and 638.** They are as the section gives them, with the sibling `s.generator()` (`Library/CaseInsensitiveString.fss:28`).
  - Of the bare throws, only the team's `ProjectFortress/tests/QuickCheckTest.fss:39` and a commented line, `ReflectTest.fss:143`, are left (`grep -rn 'throw ForbiddenException\b'`).
  - No other getter in `Library/` is called with `()`. The names that a grep of every getter name finds are methods in their own types; for example, `PrefixSet`'s `children()` and `isMember()` (`Library/PrefixSet.fsi:43-44`).
- **Rung E's two declarations** are byte for byte the base's. `diff` of `ScalarRange.check` and of `FullRange.narrowToRange(other:Range[\I\])` against `83b1cae78` prints nothing.
- **No checker, walk or team test line is edited.** The two witnesses and `RangeDeclarations.fss` are the revival's (`git log --follow`: `669b77d03` and `631fb867e`, both after `a874948ac`).

## 5. The tests

- `RangeBoundedEveryForward.fss` exercises row 599's two stops and their twins.
- `RangeKindBodies.fss` and `IndicesGetterCalls.fss` pin today's values, as the section asks.
- Each file has one comment line and is named by its topic. The citations of `ranges.tex`, section "Ranges", say what the section says: "the set of n=max(0,b−a+1) integers".

## 6. Findings and what I did

1. **The worker's report and record were not on the branch.** The harness had refused their write. I wrote them from the journal (`6eebab9dd`), and `journal-text.py` exited 0 for both.
2. **Three values the change made right were asserted by no test.** On the base, `(#(0,3)).isEmpty` was false, narrowing `(0,0):(5,5)` to `#(0,3)` raised `IndexOutOfBounds`, and `(:) CMP (:)` stopped. I added one assertion of each to `RangeDeclarations.fss`, beside item 41's pins and the `CMP` pins (`facb1d250`), as a correction of kind test.
   - The values are settled by the section's item 41 (way (a): "the bounds' order repaired so that |#(0,3)| is 0", so the range is empty) and by the team's own contract for narrowing. `Library/FortressLibrary.fss:3826-3832`: "%narrowToRange% signals an error if the result is empty, neither argument is, and: ...". `(:) CMP (:)` is settled by `Specification/basic/expressions/ranges.tex`, section "Ranges": "Ranges may be compared as if they were sets of integers".
   - I saw each fail through the harness on the old code. The worker's new pins at `:112-114` stop the file on the base before them, so each of my assertions ran in a copy of the file that leaves out those pins and my other two assertions: `FORTRESS_HOME=/home/user/fortress-base11 /home/user/fortress-base11/explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-range-types/skeptic/h-old tmp/rung-range-types/skeptic/varK/RangeDeclarations.fss`, K = 1 to 3, at 02:56:18, 02:56:34 and 02:56:38. The three runs printed:

         FAIL: a Boolean: false =/= a Boolean: true; #(0,3) is empty
         ([0] BY [-1]) left outside bounds ([0,1,2,3,... 5] BY [0,1,2,3,... 5])
         Failed to find any matching overload, args = ((): (),(): ()), overload = {

     Each run ended `Tests run: 1,  Failures: 1,  Errors: 0`.
   - The file passes on the head: `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-range-types/skeptic/h-new ProjectFortress/tests/RangeDeclarations.fss`, at 02:56:47, printed `OK (1 test)`.
3. **The report's list of values walk prints that change missed the rest of item 41's reach**, the values in section 3 above. I added them to `REPORT.md` section 8 and named the new assertions in section 10 (`354f7bd33`). These are points reached, below.
4. **The precedent provenance line** cited `Library/RangeInternals.fss:87-121`, the comparisons, for "the rank-1 kinds declaring their own `every`". It also cited `BoundedScalarRange` at `:234-247`, which is `:234-246`. Corrected in `354f7bd33`.
5. **`record.md` left a FACTS entry false.** "The one library's range types provide a declaration on the meet …" (`explorations/coordinator/FACTS.md:88`) still says the rank-2 and rank-3 `CAP` meets use "`cast` around `combine2D`", and names rows 599 to 601 as the range sites left. `record.md` now carries the amendment (`354f7bd33`).
6. **Row 611 goes partly stale.** The rung gives `CompactFullRange2D` and `CompactFullRange3D` their own `opr |self|` (`Library/RangeInternals.fss:1303-1307`, `:1340-1344`). That declaration is on the meet of the declarations from `CompactFullRange`, `FullRange2D`/`3D` (`:1064`, `:1121`) and `DelegatedIndexed` (`Library/FortressLibrary.fss:1961`), which row 611 names as two of its five sites. `record.md` now has a note for row 611, and row 601's note names the narrowing (`354f7bd33`). PLAN item 38 says the same of those two types, which is the coordinator's to correct (left for the gather).

## 7. Where I differ from the worker

- **Section 8's list of value changes** was not complete: finding 3.
- **The record** missed the FACTS line and row 611: findings 5 and 6.
- **"Close with test `none`"** for row 638 is not a form that `ledger.py close` takes. It refuses a name not under the test folders (`explorations/coordinator/tools/ledger.py:439-453`), so the gather writes that close as row 423's was written: FIXED, reproducer `none`.
- **The worker's decisions** I find argued and within the section. None is contested here.

## 8. The failure-mode question

These are the places where the change turns a loud failure into a value:

- **Row 599's eight stops** now answer the bounded range from the other end, as rank 1 does (`(2#).every(-1)` is `RightScalarRange(2,-1)`).
- **`(:) CMP (:)`** is `EqualTo`. The two are the same set, by `ranges.tex`, section "Ranges".
- **Narrowing to or from `#(0,n)`, and subscripting by it,** answer the empty range or array where they raised `IndexOutOfBounds`. This agrees with the narrowing comment quoted in finding 2 and with rank 1, where `(0:5).narrowToRange(5:3)` is `5:3` on both codes.
- **`|#(0,3)|`** answered a wrong 1 and now answers 0.

None of these turns a failure into a wrong value. The mixed-sign stride is still a stop (row NEW-L-6).

## 9. Points to report reached

These hold the push: none. Every point below is reversible.

- **Values walk prints that change.** The worker's list (`REPORT.md` section 8) and, as section 3 above gives them:
  - the empty `#(0,n)`'s `isEmpty`, `extent`, `left`, `right` and comparisons;
  - its `CAP`, `narrowToRange`, `truncL`, `truncR`, `every`, `imposeStride`, `flip` and `atMost`;
  - `SUM` over `#(0,0)`;
  - narrowing to or from it, and subscripting by it, which stopped with `IndexOutOfBounds` and now answer the empty range.
- **A team declaration** is changed in type or made abstract, with its body moved (`REPORT.md` section 8). None is removed.
- **New api functions** `combine2D` and `combine3D` over bounded scalar ranges (`Library/RangeInternals.fsi:248`, `:256`). No new api type besides `BoundedRange2D` and `BoundedRange3D`.
- **No declaration of rung E's** is edited, no team test line is changed, and no checker or walk file is edited.
