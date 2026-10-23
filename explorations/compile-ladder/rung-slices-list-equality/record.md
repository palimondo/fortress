# Rung N, rung-slices-list-equality: the record

Climb batch 21, run 1. Branch `wip/rung-slices-list-equality`, commits `0dc1568bb` (tests), `582a91f26` (library), `4c6206c2e` (specification), base 00f2e1bdc. Detail: `explorations/compile-ladder/rung-slices-list-equality/REPORT.md`.

## Findings

1. **Under walk, an `Array2` or `Array3` based above zero now slices right.**
   - Claim: under walk, a column, a row, a range subscript and the whole subscript of an `Array2` or `Array3` based above zero hold that array's elements at the subscripted indices. Before this rung, `Array2.subarray` and `Array3.subarray` handed their 0-based views (`SubArray2`, `SubArray3`) the offset in the array's own index space, and `Array3`'s `[:]` passed `(0,0,0)`.
   - Conditions: walk; arrays made by `__builtinFactory2` or `__builtinFactory3` at a nonzero base, slices of such slices, and shifted `Array3`s. A shifted `Array2` is still wrong (finding 3). The compiled path has no `Array2` or `Array3`.
   - Evidence: `Library/FortressLibrary.fss:2732`, `:3113` and `:3134` at 582a91f26, in the form of `Array1.subarray` (`:2458`). `harness-one.sh` on the base: 'FAIL: a Int: 22 =/= a Int: 11' and 'FAIL: a Int: 222 =/= a Int: 111'. After the fix: 'OK (5 tests)', and `ant testSystem` 671 tests, 0 failures. Tests: `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`. Old-against-new probes: a slice of a slice 23 becomes 12; a shifted `Array3`'s range subscript 222 becomes 111; its `a[:]` raised before and now gives 212.
   - Meaning: rows 793 and 794 close.

2. **The interpreter's library's `List` extends `Equality[\List[\E\]\]` at every element type.**
   - Claim: `List` extends `Equality[\List[\E\]\]` outside its conditional `LexicographicOrder` entry (`Library/List.fsi:67`, `Library/List.fss:106`), as `Map`, `IntMap` and `PrefixMap` extend `Equality` (`Library/Map.fsi:25`, `Library/IntMap.fsi:21`, `Library/PrefixMap.fsi:36`). So the library's `=/=` and `assert` reach `List`'s element-wise `=` whether or not the element type is totally ordered.
   - Conditions: walk reads the condition as holding at every instance today (row 774), so no value moves now. The line matters once walk reads the condition.
   - Evidence: `ant testSystem` 671/0, the walk probe's ten list tests 'OK'; `ant testSpecData` 130/0; the count stage's table identical to `explorations/compile-ladder/climb-batch-20/gate/checker-count.txt`; `distance/compare.sh` 'DISTANCE SAME   5', with the five sites identical row by row to `explorations/compile-ladder/gate/distance-sites.tsv`; the guard `ListEqualityElementwise`, at `ZZ32`, `RR64` and `(ZZ32, ZZ32)`, passes before and after.
   - Meaning: when walk's half of row 774 comes, a list's `=` needs no respelling (the walk probe's way E is in place); only the probe's respellings A and Q, which concern order, remain.

3. **A slice of a shifted `Array2` reads the wrong elements (NEW-N-2).**
   - Claim: `SubArray2`'s own `subarray` subtracts the output base `bo0` where its own base `b0` belongs (`Library/FortressLibrary.fss:2816`). So every subscript of a shifted `Array2` reads the wrong elements: a range subscript, a column, a row, or the whole subscript. And a shift of a range subscript, a column, a row or a shifted `Array2` asks it for an output based above zero, and the first read of the result ends in Java's `ArrayIndexOutOfBoundsException`, which no `catch` sees: on a 0-based 2 by 3 array `m`, `(m[:,1]).shift(5)`, `(m[(0,1)#(2,2)]).shift((3,3))`, `(m[1,:]).shift(7)` and `(m.shift((1,1))).shift((4,4))` each raise it, on the old code and the new (the skeptic's probes, SKEPTIC.md section 3).
   - Conditions: walk; an `Array2` from `shift` (`:2715-2722`), or any `SubArray2` based above zero. It holds before and after this rung. `Array3` is unaffected, since `SubArray3` inherits `Array3.subarray`.
   - Evidence: `XXXArray2ShiftedSlice` on the new code and the old gives the same line, 'FAIL: a Int: 23 =/= a Int: 12; the range subscript (1,2)#(2,2) of the shifted array starts at s[1,2]'. With `index(on0 - b0, on1 - b1)` for one run: 'PASS', ' Missing expected failure'.
   - Meaning: the one-line fix is a candidate for the next library rung.

4. **The library's `=/=` and three-argument `assert` compare by identity a value whose `=` no `FortressLibrary` trait declares (NEW-N-1).**
   - Claim: for `object P(x: ZZ32)` with `opr =(self, other: P)`, `P(1) =/= P(1)` is `true` and `assert(P(1), P(1), msg)` fails, while `P(1) = P(1)` is `true` at the program's own scope.
   - Conditions: walk; any type whose `=` is not reached through a `FortressLibrary` trait such as `Equality`.
   - Evidence: `XXXNotEqualOwnEquality` on the base: 'FAIL: opr-overview.tex, ...: e =/= e' is NOT (e = e')', 'OK Saw expected exception'. The same test with `extends Equality[\P\]`: 'PASS', ' Missing expected failure'. Mechanism: `Library/FortressLibrary.fss:98` and `:307` call `=` in `FortressLibrary`'s scope, where only `opr =(a:Any, b:Any) = a SEQV b` (`:96`) applies to such a value. The specification: `Specification/basic/operators/opr-overview.tex:272-273`.
   - Meaning: a program's own type must extend `Equality[\T\]` for the library's `=/=` and `assert` to see its `=`, as the team's `EqualityOverloadBug` does (`ProjectFortress/tests/EqualityOverloadBug.fss:15`).

5. **The stages on the rung's tree.**
   - Claim: the count stage gives `#total 3`, every api 0, identical to the landed table, in 83 s (15:09:24 to 15:10:47 UTC, under `nice -n 19`, load at start 2.21 6.51 5.57, nproc 4, Xeon @ 2.10GHz, openjdk 25.0.4.1, FORTRESS_THREADS=1). The distance stage gives `#total 5`, 'DISTANCE SAME   5', `#seconds 193`.
   - Conditions: the rung's final code, 582a91f26.
   - Evidence: the two runs, REPORT.md section 3.
   - Meaning: neither stage moves, as the planner measured for the run's text.

6. **The ladder subset of the 20 programs that import `List`.**
   - Claim: all 20 still stop at `disambiguate`. Their first error is now 'ZeroIndexed is undefined.' (`Library/List.fsi:67:36-45`), where the 2026-09-19 baseline had 'LexicographicOrder is undefined.'.
   - Conditions: the move comes from `ZeroIndexed[\E\]` entering `List`'s header after the baseline (`git show cb55877df:Library/List.fsi`, line 66, had none), not from this rung. The added `Equality` is declared in the compiler's library (`Library/CompilerAlgebra.fsi:24`), and no output of the 20 names it.
   - Evidence: `tmp/.../ladder/ladder.tsv` joined against `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`; `ListTest.fss`: 'File ListTest.fss has 6 errors.'.
   - Meaning: the baseline's first-error column for these 20 is stale; the gate's pass list holds none of them.

## For FACTS

**Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, except a shifted `Array2`.** `Array2.subarray` and `Array3.subarray` hand their 0-based views the offset less the base, and `Array3`'s `[:]` passes its base, as `Array1`'s do (`Library/FortressLibrary.fss:2732`, `:3113`, `:3134`; `:2458`). `SubArray2`'s own `subarray` subtracts the output base instead of its own (`:2816`, NEW-N-2), so a slice of a shifted `Array2` still reads the wrong elements, and a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`. Tests: `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`. Detail: `compile-ladder/rung-slices-list-equality/REPORT.md`, sections 1 and 5.

**The library's `=/=` and three-argument `assert` see a value's own `=` only through a `FortressLibrary` trait, so `List` extends `Equality[\List[\E\]\]`.** Under walk they call `=` in `FortressLibrary`'s scope (`Library/FortressLibrary.fss:98`, `:307`). A type's own `=` reaches them only where it implements a `FortressLibrary` trait's `=`, such as `Equality`'s; otherwise they compare by identity (NEW-N-1). `List` extends `Equality[\List[\E\]\]` outside its conditional order (`Library/List.fsi:67`), so a list's `=` stays element by element there whatever the condition. Tests: `XXXNotEqualOwnEquality`, `ListEqualityElementwise`. Detail: `compile-ladder/rung-slices-list-equality/REPORT.md`, sections 1 and 2.

## The gap ledger

Rows 793 and 794: closed by the gather, by the fix commit `582a91f26` (its hash after the merge), with the tests `ProjectFortress/tests/Array2SliceAtNonzeroBase.fss` (row 793) and `ProjectFortress/tests/Array3SliceAtNonzeroBase.fss` (row 794), the promoted `XXXArray2SliceAtNonzeroBase` and `XXXArray3SliceAtNonzeroBase`.

Row 774, a note. The note is 188 characters; with it the row is 1,117 characters and passes `ledger.py check --rows`:

    `List` extends `Equality[\List[\E\]\]` outside its condition (`Library/List.fsi:67`), so its `=` stays element-wise through `=/=` and `assert` once walk reads it; waits on P-12 or row 364.

NEW-N-1, for section "4. Operators and overloading under walk" (passes `ledger.py check --rows` with a number in its first cell):

| NEW-N-1 | under walk, the library's `=/=` and three-argument `assert` compare by identity two values whose own `=` no `FortressLibrary` trait declares: for `object P(x: ZZ32)` with `opr =(self, other: P)`, `P(1) = P(1)` and `P(1) =/= P(1)` are both `true`, and `assert(P(1), P(1), msg)` fails | NEGATIVE-VERIFIED | implementation gap (library) | `basic/operators/opr-overview.tex`, "GCD, LCM, and CHOOSE Operators" | `ProjectFortress/tests/XXXNotEqualOwnEquality.fss` | climb batch 21 rung N | `opr =/=(a:Any, b:Any) = NOT (a=b)` and `assert(x:Any, y:Any, ...)`, which tests `x =/= y`, call `=` in `FortressLibrary`'s scope (`Library/FortressLibrary.fss:98`, `:307` at 00f2e1bdc), where a functional `=` reaches a value's own body only through a `FortressLibrary` trait such as `Equality`; else `opr =(a:Any, b:Any) = a SEQV b` (`:96`). With `extends Equality[\P\]` the test passes. `List` extends `Equality[\List[\E\]\]` for this reason (row 774). Walk only: compiled, `P(1) =/= P(1)` is refused, 'Could not check call to operator NE'. Workaround: extend `Equality[\T\]`, as `EqualityOverloadBug` does, or write `assert(x = y, msg)`. |

NEW-N-2, for section "9. Arrays, vectors and matrices" (passes `ledger.py check --rows` with a number in its first cell):

| NEW-N-2 | under walk, every subscript of a shifted `Array2` reads the wrong elements, and a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`: for `s = a.shift((1,1))` of a 0-based array, `(s[(1,2)#(2,2)])[0,0]` is `a[1,2]`, not `a[0,1]` | NEGATIVE-VERIFIED | library bug (library) | `basic/expressions/ranges.tex`, "Ranges" | `ProjectFortress/tests/XXXArray2ShiftedSlice.fss` | climb batch 21 rung N | siblings: 793, 794. `SubArray2.subarray` subtracts the output base, `index(on0 - bo0, on1 - bo1)`, where its own base belongs (`Library/FortressLibrary.fss:2816` at 582a91f26), as `__SimpleSubArray1.subarray` subtracts its own `b0` (`:2503`); the team's. `Array2.shift` makes such a view (`:2715-2722`); `Array1.shift` of a `Col` or `Row` (`:2436-2441`) asks it for an output based above zero: `(m[:,1]).shift(5)` raises 'Index -11 out of bounds for length 6'. `Array3` has no such override. With `index(on0 - b0, on1 - b1)` the test passes. Workaround: slice the unshifted array; shift a `copy()` of a view. |

## Handover

Rung N is in on its branch. Rows 793 and 794 are fixed: `Array2.subarray` and `Array3.subarray` subtract the base, and `Array3`'s `[:]` passes it, as `Array1` does; both tests are promoted. `List` extends `Equality[\List[\E\]\]`. The `=/=` defect (NEW-N-1) and a slice of a shifted `Array2` (NEW-N-2) are filed with `XXX` tests. The specification's two list-order passages carry callouts. `testSystem` 671/0, `testSpecData` 130/0; the count (3) and the distance (5) are unchanged. Open: NEW-N-2's one-line fix, and the way to repair `=/=`.

## Revival change

### The change

1. The team's list, `trait List[\E\] extends { AnyList, LexicographicOrder[\List[\E\],E\] }` (`Library/List.fsi:67` at a874948ac), reached its own element-wise `=` from library code only through its order. The tree's `List` extends `Equality[\List[\E\]\]` at every element type (`Library/List.fsi:67`, `Library/List.fss:106`), beside an order that holds only where the element type is totally ordered (`Library/List.fsi:68`). Test: `ListEqualityElementwise`.

   Reason: under walk, the library's `=/=` and three-argument `assert` call `=` in `FortressLibrary`'s scope (`Library/FortressLibrary.fss:98`, `:307`), where a type's own `=` is seen only through a `FortressLibrary` trait. For an object with its own `=` and no such trait, `P(1) =/= P(1)` answers `true` (`XXXNotEqualOwnEquality` fails with 'FAIL: ... e =/= e' is NOT (e = e')'); with `extends Equality[\P\]` the same test passes. The library's maps extend `Equality` the same way (`Library/Map.fsi:25`), as does the team's test object (`ProjectFortress/tests/EqualityOverloadBug.fss:15`). `LexicographicOrder` bounds its element type by a total order (`Library/FortressLibrary.fsi:1345`), so without the `Equality` entry a list of partially ordered elements would have no `=` reachable from library code once the condition is read.

2. The team's `Array2.subarray` and `Array3.subarray` handed their 0-based views the offset in the array's own index space, and `Array3`'s whole subscript passed `(0,0,0)` (`Library/FortressLibrary.fss:2732`, `:3134`, `:3113` at 00f2e1bdc, all the team's lines). So under walk, a slice of an array based above zero read the wrong elements or raised. The tree subtracts the base, as the team's `Array1.subarray` does (`:2458`). Tests: `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`.

   Reason: "The implicit range : is treated as l:u" (`Specification/basic/expressions/ranges.tex:119`). Measured: `(a[:,1])[0]` of a 2 by 3 array based at (1,1) read `a[2,2]`, 22 for 11, and a 2 by 2 by 2 array based at (1,1,1) read 222 for 111. A slice of a shifted `Array2` still reads wrong (`Library/FortressLibrary.fss:2816`; `XXXArray2ShiftedSlice`).

3. The team's specification orders lists "whose elements support these same comparison operators" (`Specification/basic/operators/opr-overview.tex:293-295`), and calls a lexicographic order "partial or total depending on whether the ordering of the elements is partial or total" (`Specification/advanced-lib/algebraic-constraints.tex:519-522`). The tree keeps both sentences and adds callouts after them (`opr-overview.tex:296-301`, `algebraic-constraints.tex:523-528`): the libraries order a list only where its element type is totally ordered, its `=` still compares element by element, and the interpreter still orders every list.

   Reason: `List`'s order is the conditional entry `LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }` (`Library/List.fsi:68`), and `LexicographicOrder` bounds its element by `StandardTotalOrder` (`Library/FortressLibrary.fsi:1345`). The interpreter applies the entry at every instance (`ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss`, an expected failure).

### Provenance

Rows 793 and 794. The judgement of the curator's type decisions, its V3 and its section 2, item 3: walk's half of conditional extension (row 774) waits until walk runs the checker (P-12) or row 364 is fixed, and the `Equality` line and the `=/=` row land now. The batch record's review-list item 6 and forks 10 to 12, taken at their defaults. P-27 (the library's own practice) and P-154 (a list ordered only where its element type is totally ordered). Climb batch 21, run 1, rung N.
