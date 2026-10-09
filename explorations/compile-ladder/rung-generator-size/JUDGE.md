# Rung G of climb batch 13: the judge's ruling

Rung `rung-generator-size`, branch `wip/rung-generator-size`, base `a1a75716a`. One fix was contested, `a61ecbc55` ("Skeptic's fix: the default index-value pairs narrow a range subscript by index"). The ruling: **upheld**, no revert. The decision: **stands**. The rung lands as the branch holds it at `7c73c9478` and this file.

## 1. The question

`SimpleIndexValuePairs` is the new object beside `SimpleMappedIndexed` (`Library/FortressLibrary.fss:3624-3637`). The rung's section prescribes that it takes `bounds`, `indices` and `|self|` from `g`, with `opr[i] = (i, g[i])` (`fss:3627-3630`). The question is how its range subscript (`fss:3631-3632`) reads `r` when `g`'s bounds start above 0. There are two ways:

- The worker's line, `self.g.bounds[r].map(...)`, reads `r` as positions counted from 0.
- The skeptic's line, `self.g.bounds.narrowToRange(r).map(...)`, reads `r` as indices of `g`.

For bounds that start at 0, the two lines give the same answer on every slice the skeptic tried (SKEPTIC.md section 2, `SkPairs` and `NR01`-`NR12`).

## 2. The standard

1. **The specification reads a range subscript in the value's own index space.** "Suppose an implicit range is used as a subscript for an axis of an array for which the lower bound is $l$ and the upper bound is $u$." Then `:` is treated as `l:u`, `:b` as `l:b`, and `#s` as `l#s` (`Specification/basic/expressions/ranges.tex:115-128`). The range is filled in from the bounds themselves, not from positions 0 to n-1. So an explicit range in the same place names indices of the subscripted value.
2. **The api's contract is relative to `bounds()`.** It says "Indexing. %i IN bounds()% must hold." (`Library/FortressLibrary.fsi:1289`). For ranges it says a range subscript is written "in order to narrow and bounds check the range %r%", and that the results are 0-based (`fsi:1292-1301`). The `(bounds())[r]` in that comment is advice on how to write the subscript, and the advice does what the contract asks only when the bounds start at 0:
   - A range subscripted by a range reads positions: `f = self.bounds.narrowToRange(r)` (`Library/RangeInternals.fss:1117-1121`).
   - A range's own bounds are its positions, `0` to `size-1` (`RangeInternals.fss:1008`).
   - So `(5#3)[r]` checks `r` against `[0,1,2]`. This is NEW-G-2, asserted by `ProjectFortress/tests/RangeSubscriptPositions.fss`.
3. **The library never follows that advice.** It narrows by index (POSITIONS, **The library's own practice is the standard.**):
   - No library body writes `(bounds)[r]`. The only two occurrences are the comments themselves (`fss:1883`, `fsi:1299`).
   - Every range subscript of a value whose bounds may start above 0 narrows with `self.bounds.narrowToRange(r)`: the rank-1 arrays (`fss:2257`, `:2315`), rank 2 (`:2537`), rank 3 (`:2948`), `String` (`:4211`) and `Condition` (`:1405`).
   - The views beside which the new object sits hand the subscript to `g[r]`, so they read it in `g`'s index space: `SimpleMappedIndexed` (`fss:3615-3616`), which the worker took as its model in decision 5, and `SimpleReversedIndexed` (`fss:3787`).
4. **The object must agree with its own bounds.** The worker's line made it disagree. For a value indexed from 5:
   - `pairs.bounds` is `[5,6,7]` and `pairs[6]` is `(6,60)`.
   - `pairs[0#2]` answered, though 0 is not in the bounds.
   - `pairs[6#2]` was refused with `[6,7] right outside bounds [0,1,2]`, though 6 and 7 are in the bounds.

   This is SKEPTIC.md section 3, finding 1, and the failing run in section 4, quoted from the skeptic's `harness-one.sh` run on the worker's code at 21:05:14Z:

       [6,7] right outside bounds [0,1,2]
       Tests run: 4,  Failures: 1

   After the fix, at 21:07:09Z, the same run printed `OK (4 tests)` (SKEPTIC.md section 4).

## 3. Which claims were right

**The worker** (REPORT section 9, decision 1):

- Right that a slice of the pairs keeps each pair's index, against the section's `SimpleIndexValuePairs(g[r])`, which would renumber `"abcd"`'s slice to `(0,b),(1,c)`. Nobody contested this, and it stands. The fix keeps it too: the elements are still `(i, self.g[i])` (`fss:3632`).
- Right that its line is the api's spelling, and that for bounds from 0 it gives every slice the base gave. The fix leaves those slices unchanged (SKEPTIC.md section 2, for example `p[1#2] printed: mapped((1,b),(2,c))` on the old code, on the worker's head and after the fix).
- Wrong that the line keeps the base's values for a value indexed above 0:
  - The base's pairs were a mapped range that was positional throughout: `bounds` `[0,1,2]`, `pairs[0]` `(5,50)` (SKEPTIC.md section 2, `Shifted`).
  - The section had already moved `bounds` and `opr[i]` to the value's indices on the worker's head: `shifted bounds: [0,1,2] became [5,6,7]`, and `shifted q[0]: (5,50) became (0,0)`.
  - That left the range subscript as the one part still on the old convention.
- Wrong to cite `ReadableArray`'s pairs (`fss:2004-2005`) as support. They are positional in `bounds`, the single subscript and the range subscript alike: consistent within themselves, but a different convention. They are no precedent for mixing the two in one object.

**The skeptic** (SKEPTIC.md sections 3 and 4):

- Right on the defect, on the precedent lines and on the typing:
  - `CompactFullRange` extends `FullRange` (`fss:3991`).
  - `FullRange` declares `narrowToRange(other: Range[\I\]): FullRange[\I\]` (`fss:3985`) and extends `Indexed[\I,I\]` (`fss:3976`).
  - `Indexed`'s `map` answers `Indexed[\R,I\]` (`fss:1899`). The declared result `Indexed[\(I,E),I\]` holds by reading.
- Right that the fix reaches a point to report. Wrong, in its marking, that the point is beyond the rung:
  - The edit stays inside the rung's own new object, which the brief's Files name ("one new object beside `SimpleMappedIndexed`").
  - It changes two answers, and only for values whose bounds start above 0.
  - No library type reaches the default pairs with such bounds. The bounds getters that start at 0 are `fss:1395`, `:1913`, `Library/String.fss:80` and `RangeInternals.fss:1008`. The arrays and the views declare their own pairs (`fss:2004`, `:3610`, `:3783`, `:4155`).
  - It is reversible, so it is listed and does not hold the batch (POSITIONS, **Reversible stops do not hold a batch.**).

## 4. What is not yet measured

The skeptic ran neither the checker count nor the distance stage after the fix (SKEPTIC.md section 4, "The count and the distance"). The gate measures the merged tree, as the brief says. By reading, the fix types (section 3). If the gate shows a site at `fss:3632`, the gather settles it. Whether the line types is the gate's question, not this ruling's.

## 5. For the curator, at the landing

- **The fix's changed answers, under walk, for an `Indexed` value whose bounds start above 0 and that inherits the default pairs.** No library type is such a value. With bounds `5#3`:
  - `pairs[5#2]` now answers `(5,50),(6,60)`. It stopped on the base and on the worker's head.
  - `pairs[0#2]` now stops with `[0,1] left outside bounds [5,6,7]`. It answered on both.
  - Each is reversible by reverting `a61ecbc55`.
- **Two conventions for `indexValuePairs` on a value indexed above 0.** This is the skeptic's finding 3, a consequence of the section's design and not of the fix. The default pairs are now indexed as the value is (`fss:3624-3637`). `ReadableArray`'s own pairs stay positional (`fss:2004-2005`). The ways:
  - (a) Keep as landed. This follows the section, the arrays' own subscript and the specification's reading of a range subscript (`ranges.tex:115-128`).
  - (b) Make the default pairs positional throughout: `bounds` `0#|g|`, `opr[i]` the i-th pair. This undoes the section's "bounds ... from g".
  - (c) Index `ReadableArray`'s pairs as the array is indexed. This edits a team declaration outside the rung.

  The record holds no decision on this. The landed default is (a).
