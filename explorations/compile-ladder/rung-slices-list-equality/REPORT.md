<!-- Climb batch 21, run 1, rung N (rung-slices-list-equality): two library repairs under walk, the slices of an Array2 or Array3 based above zero (rows 793, 794), and a list's = through Equality, with the =/= defect filed; worktree /home/user/fortress-slicelist, branch wip/rung-slices-list-equality, base 00f2e1bdc. -->

# Rung N: array slices based above zero, and a list's equality through `Equality`

- problem: rows 793 and 794, with their gated expected failures as climb batch 20 left them (`ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss:9`, `ProjectFortress/tests/XXXArray3SliceAtNonzeroBase.fss:9` at 00f2e1bdc); and the walk probe's mechanism B, under which the library's `=/=` and `assert` reach a list's `=` only through `LexicographicOrder` (`explorations/perf-probes/walk-conditional-extension/REPORT.md:84`; its defect at `:174-181`)
- spec: for the slices, `Specification/basic/expressions/ranges.tex:119` ("The implicit range : is treated as l:u", section "Ranges"); for `=/=`, `Specification/basic/operators/opr-overview.tex:272-273` ("The expression e ≠ e' is semantically equivalent to the expression ¬(e = e')"); for the order of lists, `Specification/basic/operators/opr-overview.tex:293-295` and `Specification/advanced-lib/algebraic-constraints.tex:519-522`
- precedent: `Library/FortressLibrary.fss:2456-2459` (`Array1.subarray` hands `__SimpleSubArray1` the offset `o-b0`) and `:2450-2451` (`Array1`'s `[:]` passes its base `b0`); `Library/Map.fsi:24-25` (`Map` extends `Equality[\Map[\Key,Val\]\]`)
- deviation: `Equality[\List[\E\]\]` stands third in `List`'s extends list, before the conditional entry; `Map`, `IntMap` and `PrefixMap` put `Equality` last. This keeps the edit to one line in each file (`Library/List.fsi:67`, `Library/List.fss:106`). The specification's two sentences are kept as the team wrote them, each followed by a callout, not reworded (`Specification/basic/operators/opr-overview.tex:296`, `Specification/advanced-lib/algebraic-constraints.tex:523`)
- historical: `Library/FortressLibrary.fss:2732`, `:3113`, `:3134`; `Library/List.fsi:67`; `Library/List.fss:106`; `Specification/basic/operators/opr-overview.tex:296-301`; `Specification/advanced-lib/algebraic-constraints.tex:523-528`; `Specification/appendices/changes.tex:160-161`

## 1. What changed and why

Commits on `wip/rung-slices-list-equality`: `0dc1568bb` (the tests), `582a91f26` (the library and the second `XXX` test), `4c6206c2e` (the specification).

**The slices (rows 793, 794).** `SubArray2` and `SubArray3` read their underlying array at `m a + o`, with "0-based" offsets (`Library/FortressLibrary.fss:2797`, `:3181`). `Array2.subarray` and `Array3.subarray` take the offset `o` in the array's own index space ("the subarray starting at (o0,o1) in the original array", `:2723-2727`), and handed it to the view unchanged. `Array3`'s whole subscript passed `(0,0,0)`, which the bounds check refuses for an array based above zero. All three lines are the team's (`git blame a874948ac`). `Array1.subarray` subtracts its base (`:2458`), and so do `ImmutableArray1.subarray` (`:2400`), `__SimpleSubArray1.subarray` (`:2503`) and `__ImmutableSubArray1.subarray` (`:2517`): the rank-1 family subtracts the base at all 4 of its sites. Its two whole subscripts pass the base (`:2393`, `:2451`), and so does `Array2`'s (`:2686-2687`). The fix takes that form for each dimension:

    Library/FortressLibrary.fss:2732   SubArray2[\T,bo0,so0,bo1,so1,b0,s0,b1,s1\](self,m0,o0-b0,m1,o1-b1)
    Library/FortressLibrary.fss:3113   subarray[\0,s0,0,s1,0,s2,b0,b1,b2\](1,1,1)
    Library/FortressLibrary.fss:3134   SubArray3[\T,bo0,so0,bo1,so1,bo2,so2,b0,s0,b1,s1,b2,s2\](self,m0,o0-b0,m1,o1-b1,m2,o2-b2)

The brief cites these lines as `:2733`, `:3113` and `:3135`. At 00f2e1bdc they are `:2732`, `:3113` and `:3134`; the declarations span `:2729-2733` and `:3130-3135`.

**The list's equality.** `List` declares its own element-wise `opr =(self, other:List[\E\])` (`Library/List.fsi:85`, `Library/List.fss:126`). Under walk, the library's `=/=` and three-argument `assert` call `=` in `FortressLibrary`'s scope (`Library/FortressLibrary.fss:98`, `:307`). There a functional `=` reaches a value's own body only through a `FortressLibrary` trait. A list reached its `=` through `LexicographicOrder`'s `=` (`:2069`), which `List` extends only under its condition (`Library/List.fsi:68`).

So `List` now extends `Equality[\List[\E\]\]` outside the condition. This is the library's own way for the maps (`Library/Map.fsi:25`, `Library/IntMap.fsi:21`, `Library/PrefixMap.fsi:36`), and the team's way in its own test (`ProjectFortress/tests/EqualityOverloadBug.fss:15`, `object Bar extends Equality[\Bar\]`).

Walk still reads the condition as holding at every instance (row 774), so no value moves today. The new line keeps a list's `=` element by element, through the library's `=/=` and `assert` too, once walk reads the condition. Where the condition holds, `List[\E\]` also reaches the same `Equality[\List[\E\]\]` through `LexicographicOrder`, which is one instance, not two.

**The `=/=` defect** is filed, not fixed (fork 10): `XXXNotEqualOwnEquality` and NEW-N-1.

**A sibling defect measured: a slice of a shifted `Array2`.** `SubArray2`'s own `subarray` subtracts the output base `bo0`, not its own base `b0` (`Library/FortressLibrary.fss:2816`). So a range subscript, a column, a row or the whole subscript of a shifted `Array2` reads the wrong elements, before and after this rung. A shifted `Array2` is a `SubArray2` based above zero (`Array2.shift`, `:2715-2722`). `Array3` has no such override: `SubArray3` inherits `Array3.subarray`, which now subtracts its base. The defect is filed as NEW-N-2 with `XXXArray2ShiftedSlice`. Every other array body is outside this rung (the brief, "Not yours").

## 2. The tests, their failing and passing runs

Every harness run below is `explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> <files>`, run from the worktree's root after the skill's setup lines, under `nice -n 19`.

**The promotions.** `git mv` of `XXXArray2SliceAtNonzeroBase.fss` to `Array2SliceAtNonzeroBase.fss`, and of `XXXArray3SliceAtNonzeroBase.fss` to `Array3SliceAtNonzeroBase.fss`. Each `component` line is renamed; nothing else changed.

**The new tests:**
- `XXXNotEqualOwnEquality.fss`, the `=/=` defect's expected failure. It starts with two controls that hold today (`P(1) = P(1)`, `P(1) =/= P(2)`), then asserts `NOT (P(1) =/= P(1))` and `assert(P(1), P(1), ...)`.
- `ListEqualityElementwise.fss`, a guard of a list's `=`, `=/=` and `assert` at `ZZ32`, `RR64` and `(ZZ32, ZZ32)`. Each list literal has its static argument written, so that walk instantiates it at that type and not at a run-time class (row 364).

The failing run was on the base's code, before the first edit of a library source. It ended at 14:57:21 UTC; the library was first edited after the red run below, which ended about 14:58 UTC.

    harness-one.sh .../h-base ProjectFortress/tests/Array2SliceAtNonzeroBase.fss ProjectFortress/tests/Array3SliceAtNonzeroBase.fss ProjectFortress/tests/XXXNotEqualOwnEquality.fss ProjectFortress/tests/ListEqualityElementwise.fss
    # harness-one 2026-10-23T14:57:06Z; tree 00f2e1bdc; nproc=4; load 3.14 2.73 2.22; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    FAIL: a Int: 22 =/= a Int: 11; the column's first element is a[b0,b1]; ranges.tex, section "Ranges": the implicit range : is treated as l:u
    FAIL: a Int: 222 =/= a Int: 111; the range subscript (b0,b1,b2)#(2,2,2) starts at a[b0,b1,b2]; Library/FortressLibrary.fsi, trait Array3, subarray
    FAIL: opr-overview.tex, the sentence on e =/= e' that closes subsection "GCD, LCM, and CHOOSE Operators": e =/= e' is NOT (e = e')   ... OK Saw expected exception
    Tests run: 4,  Failures: 2,  Errors: 0

So `(a[:,1])[0]` reads `a[2,2]`, 22, as row 793 says. `Array3SliceAtNonzeroBase` stops at its first assertion, the range subscript, before it reaches `a[:]`. Row 794 records that raise ('([0,1] BY [0,1] BY [0,1]) left outside bounds ([1,2] BY [1,2] BY [1,2])'), and the probe of section 5 shows it again on the old code. The guard passed.

`XXXNotEqualOwnEquality`, the first `XXX` test this rung adds, was shown red on a deliberate fix: for one run `object P(x: ZZ32) extends Equality[\P\]`, then restored.

    harness-one.sh .../h-red ProjectFortress/tests/XXXNotEqualOwnEquality.fss
    # harness-one 2026-10-23T14:57:35Z; tree 00f2e1bdc; ...
    PASS
     Missing expected failure
    Tests run: 1,  Failures: 1,  Errors: 0

After the edit, the five tests together, `XXXConditionalExtensionTypeTestWalk` among them:

    harness-one.sh .../h-after Array2SliceAtNonzeroBase.fss Array3SliceAtNonzeroBase.fss XXXNotEqualOwnEquality.fss ListEqualityElementwise.fss XXXConditionalExtensionTypeTestWalk.fss
    # harness-one 2026-10-23T14:59:08Z; tree 0dc1568bb; ...
    OK (5 tests)

The last run after the last change of code is `ant testSystem` on `582a91f26` (section 3). Its results (`ProjectFortress/TEST-RESULTS/system-*/TEST-*.txt`):
- `Array2SliceAtNonzeroBase: OK (time = 2100ms)`
- `Array3SliceAtNonzeroBase: OK (time = 1646ms)`
- `ListEqualityElementwise: OK (time = 1032ms)`
- `XXXNotEqualOwnEquality: OK Saw expected exception`
- `XXXArray2ShiftedSlice: OK Saw expected exception`

`XXXArray2ShiftedSlice` (NEW-N-2) gives the same line on the new code and on the old code (the base build's `harness-one.sh` with `FORTRESS_HOME=/home/user/fortress-base21`):

    FAIL: a Int: 23 =/= a Int: 12; the range subscript (1,2)#(2,2) of the shifted array starts at s[1,2]; Library/FortressLibrary.fsi, trait Array2, subarray
     OK Saw expected exception

For one run I put `index(on0 - b0, on1 - b1)` at `Library/FortressLibrary.fss:2816`, then restored it; the restored file is the one committed in `582a91f26`. That run printed 'PASS', ' Missing expected failure', 'Tests run: 1,  Failures: 1'. So that line is the defect, and the test's expected answer is right.

## 3. Whole suites, the stages, the ladder

**`ant testSystem`**, on `582a91f26`, after the last change of code: 'Caches .../default_repository/caches kept'; the four shards 'Tests run: 165, Failures: 0', 'Tests run: 168, Failures: 0', 'Tests run: 172, Failures: 0', 'Tests run: 166, Failures: 0'; 'BUILD SUCCESSFUL'; 'Total time: 4 minutes 8 seconds'. That is 671 tests against climb batch 20's 668 (`explorations/compile-ladder/climb-batch-20/gate/summary.txt`): the three new files are added, and the two promotions keep the count.

**`ant testSpecData`**: 'Tests run: 130, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL', 'Total time: 1 minute 8 seconds'.

**The verdicts the brief keeps**, read from that `testSystem` run:
- The 41 files of `ProjectFortress/tests/` whose text holds `Vector`, `Matrix` or `DOT`, plus `subArray` and `Array2SubscriptInBounds` (climb batch 20's 40, and one added since): all 'OK', `VectorMatrixCastsWalk` and `Array2SubscriptInBounds` among them. `XXXArrayInferredElementVectorWalk`: 'OK Saw expected exception'.
- `XXXConditionalExtensionTypeTestWalk`: 'OK Saw expected exception'.
- The walk probe's list tests (its section 3.1): `booleanGuard`, `asifTest`, `RangePrototype`, `QuickCheckTest`, `NumberOrderListDeclarations`, `TupleOrderBounds`, `ResultBoundsRungB`, `UnwrittenListMapComprehensionWalk`, `NestedListComprehensionWalk`, `UnwrittenComprehensionElementsWalk`: all 'OK'.
- `SpecData`'s `Generators.GeneratorDefn` passes among the 130.

**The count stage**, run once on the final code (`582a91f26`; only prose changed after it):

    nohup nice -n 19 bash -c '( explorations/coordinator/tools/checker-count/run.sh tmp/rung-slices-list-equality/checker-count-postedit.txt tmp/rung-slices-list-equality/cc-post ) > ...count-run.txt 2>&1; echo EXIT=$? >> ...' &
    #total	3
    #locations	3
    #crash	none
    diff explorations/compile-ladder/climb-batch-20/gate/checker-count.txt tmp/.../checker-count-postedit.txt   -> no output

The count table matches the landed one line for line: every api 0, `#total 3`.

**Its seconds: 83 s**, from 15:09:24 to 15:10:47 UTC (the start file and the log's last write). It ran under `nice -n 19`, beside the batch's other agent. Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, load at start 2.21 6.51 5.57, openjdk version "25.0.4.1" 2026-08-18, FORTRESS_THREADS=1. No checker code changed, so there is no speed pass (the brief).

**The distance stage**, run once on the same code:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-20/gate/distance.txt tmp/.../distance-postedit.txt
    DISTANCE SAME   5
    #seconds	193	FortressLibrary 139

Its table matches the landed one: `#total 5`, `typecheck 4`, `export 1`, `#crash none`, `#unit component FortressLibrary 4`, `#unit component List 1`.

I compared the five sites of `tmp/.../dist-post/errors.tsv` with `explorations/compile-ladder/gate/distance-sites.tsv` row by row, all seven cells: they are identical (a `diff` of the two sorted site lists prints nothing). This includes the export error's whole message, with `Array2`'s and `Array3`'s entries unchanged. `List.fss:146` did not move, since the edit changes no line count. No site moved or came.

**The ladder subset** ran after the edit only, with `gate.md`'s drivers copied under `tmp/rung-slices-list-equality/ladder/` and with copies of the tree's caches.

It holds the 20 files whose recorded first error in the baseline names what this rung touched: `LexicographicOrder is undefined.`, at `List`'s header (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`). The baseline's `Array2` errors name the compiler prelude's `CompilerLibrary.Array2`, which this rung does not touch. None of the 20 is in the landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-20/gate/ladder/ladder.tsv`, the 85 of the pass list), so they are compared with the baseline's table.

All 20 stop at `disambiguate`, as in the baseline. Their first error is now `ZeroIndexed is undefined.` at `Library/List.fsi:67:36-45`, followed by `LexicographicOrder is undefined.` at `:68:27-43` and four more (`raw/tests/ListTest.fss.compile`: 'File ListTest.fss has 6 errors.'). The move is not this rung's:
- The baseline's `List` header was `extends { AnyList, LexicographicOrder[\List[\E\],E\] }` (`git show cb55877df:Library/List.fsi`, line 66).
- `ZeroIndexed[\E\]` entered the header later, at a span this edit leaves as it was.
- The added `Equality` is declared in the compiler's library (`Library/CompilerAlgebra.fsi:24`), and no output of the 20 names it.

## 4. Where the fix belongs, and the precedent

`explorations/coordinator/map/spec-to-implementation.md:329` and `:331`: arrays and `List` live in the interpreter's library (`Library/FortressLibrary.fs*`, `Library/List.fs*`), and the compiled path has neither ("interp works / comp absent"). So both repairs are library edits under walk, with no Java and no checker code.

The precedents followed:
- `Array1.subarray` (`:2456-2459`) and its three siblings: 4 sites that subtract the base.
- `Array2`'s and `Array1`'s whole subscripts, which pass their base.
- The maps' `Equality` entries, and the team's `EqualityOverloadBug`.

## 5. Old against new

These programs ran under walk by `bin/fortress` from `tmp/rung-slices-list-equality/probe/`: on the new code, and on the base build through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base21 <tree>/tmp/old-caches`.

| program, value | old | new |
|---|---|---|
| `ShiftSliceProbe`: a 0-based 2 by 3 `Array2` shifted to (1,1), `(s[(1,1)#(2,2)])[0,0]`, expected 11 | 22 | 22 (NEW-N-2) |
| the same, `(s[:,2])[0]`, expected 12 | 23 | 23 (NEW-N-2) |
| the same, `(s[:])[0,0]`, expected 11 | 22 | 22 (NEW-N-2) |
| an `Array2` based at (1,1), `u = b[(1,1)#(2,3)]`, `(u[(0,1)#(2,2)])[0,0]`, expected 12 | 23 | 12 |
| `ShiftSlice3Probe`: a 0-based 2 by 2 by 2 `Array3` shifted to (1,1,1), `(s[(1,1,1)#(2,2,2)])[0,0,0]`, expected 111 | 222 | 111 |
| the same, `(s[:])[1,0,1]`, expected 212 | raises '([0,1] BY [0,1] BY [0,1]) left outside bounds ([1,2] BY [1,2] BY [1,2])' | 212 |
| the same through a slice and a shift, `x[0,1,1]`, expected 222 | not reached | 222 |
| a 1-based `Array1` shifted to 5, `(q[6#2])[0]`, expected 2 | 2 | 2 |

The rows that move show the defects of rows 793 and 794 in other shapes. A slice of a slice reads through the first slice's offset. A shifted `Array3` is an `Array3` based above zero, which now slices through `Array3.subarray` too. The guarded tests cover the mechanism; these values are not asserted anywhere else.

## 6. What the specification settles, and the text

- The slices: `ranges.tex:115-127` gives each implicit range its bounds, so `a[:, j]` of an array based at `(1,1)` holds `a[1,j]` first. The library's api says a shifted array is "a new view of the same array" (`Library/FortressLibrary.fsi:1434-1438`).
- The `=/=` defect: `opr-overview.tex:272-273`.
- A list's `=`: `Library/List.fsi:83-85`, "compares two lists element by element, whether or not their elements are ordered". This is the library's api, which the specification's listings render.

**The text changed** in P-96's form. Callouts `\revision{revival-conditional}{...}` follow the two sentences that order lists. Each says that the libraries order a list only where its element type is totally ordered, so that a list of floating-point numbers has no order on the compiled type checker while its `=` still compares element by element, and that the interpreter still orders every list (row 774):

- `Specification/basic/operators/opr-overview.tex:296-301`, after "They also use lexicographic order when used to compare lists whose elements support these same comparison operators" (`:293-295`);
- `Specification/advanced-lib/algebraic-constraints.tex:523-528`, after "... lexicographic order on sequences of elements, which may be partial or total depending on whether the ordering of the elements is partial or total" (`:519-522`).

Appendix I's entry "Conditional extension" (`Specification/appendices/changes.tex:156`) gains four additions:
- its affected sections name the two (`:160-161`);
- its change says what the callouts say (`:174-177`);
- its reasoning pointer names this report (`:209-211`);
- its original text names the two passages, unchanged, at `Specification-1.0-frozen/advanced-lib/algebraic-constraints.tex`, lines 519-522, and `Specification-1.0-frozen/basic/operators/opr-overview.tex`, lines 284-285 (`:266-270`).

Its Effect already named both passages as the checker's departure from them (`:226-240`). Its sentence that the interpreter keeps the order of a list of tuples or floats (`:248-253`; the brief's `:242-248` before this edit) stays true. For route C the entry says it is the same. The front matter's paragraph (`Specification/fortress/preamble.tex:54-64`) stays true.

**The reasoning for the callouts** (P-96's fourth part, which the entry now points to). The team's sentences state a general property of lexicographic order, and say that lists whose elements are comparable can be compared. The libraries now declare only the total order of a list (`Library/List.fsi:67-68`), so a reader of either sentence would expect `<` on a list of floats, which the checker refuses. Rewording the sentences was not taken: the algebraic-constraints sentence is true of `LEXICO` in general, and the reworded operators sentence would state P-154 in the team's voice. A callout keeps the team's text and says what holds. The way back: delete the two callouts and the entry's added sentences. If a partial lexicographic order of lists is declared later, the callouts change to say so.

**Built:** `cd Specification/fortress && ./ant genSource && ./ant tex`, twice; the second build came after `\library` became `\Library` at the start of each callout. Both commands printed 'BUILD SUCCESSFUL' in each build.

`grep -c 'LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence' Specification/fortress/fortress.log` prints 0. The skill's own pattern matches 45 lines, but all are the macro definition `x@warning {Reference `#1' on page \thepage \space undefined}` echoed in the log, and none is a warning.

`pdftotext` shows both callouts and 'Affected sections Section 12.6; Section 40.2; the overview of operators in Chapter 16.' I then ran `git clean -fXq -- Specification`.

## 7. Sentences of the specification made false

None. Searched:
- `grep -rn subarray Specification --include=*.tex` outside `library/apis/`: no line.
- `grep -rn 'Array2\|Array3' Specification --include=*.tex`, for slices or bases: none.
- Every `.tex` file naming `List[`: `trait-parameters.tex:382-384`, an example of conditional extension that leaves out `Equality` just as it leaves out `AnyList`, and three comments.
- Appendix I's sentences on lists (`changes.tex:173-177`, `:186-207`, `:223-240`, `:248-253`): all still true.

The api listings that render `List.fsi` and `FortressLibrary.fsi` are generated when the specification is built, and are not in the tree.

## 8. Points to report

- **The two promotions, before and after:** `XXXArray2SliceAtNonzeroBase` to `Array2SliceAtNonzeroBase`, and `XXXArray3SliceAtNonzeroBase` to `Array3SliceAtNonzeroBase` (`0dc1568bb`). Before: 'FAIL: a Int: 22 =/= a Int: 11' and 'FAIL: a Int: 222 =/= a Int: 111'. After: 'OK' in the harness and in `ant testSystem` (section 2).
- **The new rows and their tests:** NEW-N-1, the `=/=` defect, with `ProjectFortress/tests/XXXNotEqualOwnEquality.fss:12-13`; NEW-N-2, a slice of a shifted `Array2`, with `ProjectFortress/tests/XXXArray2ShiftedSlice.fss:9-16`.
- **The stock count and distance tables:** unchanged, `#total 3` and `#total 5`, 'DISTANCE SAME   5', no site come (section 3).
- **The count stage's seconds:** 83 s (section 3).
- **Walk values that move beyond the two promotions:** a slice of a slice of an `Array2` based above zero (23 to 12), and the slices of a shifted `Array3` (222 to 111; a raise to 212); see section 5. No test or specification example changes its verdict.
- **The specification sentences edited:** the two callouts and the Appendix I entry's four additions (section 6); none made false (section 7).
- **Files edited beyond those named:**
  - `Specification/appendices/changes.tex:160-161`, `:174-177`, `:209-211`, `:266-270` (the entry the callouts name);
  - `ProjectFortress/tests/XXXArray2ShiftedSlice.fss` (NEW-N-2's expected failure, section 1).

None holds the push: each is reversible, and none acts against a decision on record.

## 9. Decisions

1. **The slices are fixed where each view is made:** `Array2.subarray` and `Array3.subarray` hand `o-b`, as `Array1.subarray` does. Not taken:
   - (a) `SubArray2` and `SubArray3` taking offsets in the array's index space and subtracting in `index`. That changes their documented 0-based contract (`Library/FortressLibrary.fss:2797`, `:3181`) and `SubArray2`'s own `subarray`.
   - (b) Each caller (`opr[r]`, `Col`, `Row`, `shift`) subtracting before it calls `subarray`. That changes `subarray`'s documented meaning, "the subarray starting at (o0,o1) in the original array" (`:2723-2727`), and departs from `Array1`.
   - (c) Copying a slice into a new array. That breaks a view's sharing of its array (`Library/FortressLibrary.fsi:1434-1438`).
2. **`Array3`'s `[:]` passes `(b0,b1,b2)`**, as `Array2`'s (`:2686-2687`) and `Array1`'s (`:2450-2451`) pass their bases. Not taken: `self[self.bounds]`, a longer path through `narrowToRange` and `__subarray` that no other rank takes; and leaving `(0,0,0)`, which with the fixed `subarray` would hand a negative offset and still fail the bounds check.
3. **`Equality[\List[\E\]\]` goes on the header's first line**, the walk probe's way E as measured (its `REPORT.md:99-104`). Not taken:
   - `Equality` last, as the maps write it (`Library/Map.fsi:25`), which would put it on the conditional entry's line or on a third line.
   - Walk's half of conditional extension (row 774), which waits (the judgement's V3; the brief).
   - A functional `=/=` of `List`'s own. It would be a new functional-method name that `Equality` does not declare, and the library's `assert`, which calls `=/=` at `Any` in `FortressLibrary`'s scope, would not see it.
   - Respelling tests as `assert(x = y, msg)`: a workaround in the programs, which P-27 rules out, and it loses the message's print of both values.
4. **The `=/=` defect is filed with one `XXX` test**, not fixed (fork 10). The test's two controls hold today and show that `P`'s own `=` works at the program's scope, so the failure is the library's `=/=` and `assert`. Not taken: one `XXX` file per assertion (the harness reads only that the program fails); and a fix of `=/=` (no way is decided; see "For the curator").
5. **The guard's lists are written with their static arguments**, `[\ZZ32\]`, `[\RR64\]` and `[\(ZZ32, ZZ32)\]`, so that the guard tests the element type once walk reads the condition: `ZZ32` meets the condition, and `RR64` and the pair do not. Not taken: unwritten literals, which walk instantiates at `Int` or `FloatLiteral` (row 364), so the guard would test row 364 instead.
6. **The specification gets callouts after the team's sentences, under the existing entry `revival-conditional`.** Not taken: rewording the sentences (section 6); and a new Appendix I entry, since the existing entry's Effect already names both passages (`Specification/appendices/changes.tex:226-240`). The entry's four additions edit a file the brief does not name, which is a point to report. The reasoning document is this report's section 6, which the entry names. I wrote no separate decision record, because the brief's "What you write" allows one only where the section asks for it.
7. **The shifted `Array2`'s slice is filed as NEW-N-2 with an `XXX` test (way 2 of `tests-writing.md`), not fixed**, because the brief puts every other array body out of this rung. Not taken: the one-line fix at `:2816`, which the trial run shows passing the test.
8. **The ladder subset is the 20 `List` importers**, compared with the baseline's table because the gate runs none of them. Not taken: the four files whose first error names `Array2`, which is the compiler prelude's type.
9. **The count and distance stages ran under `nice -n 19`**, as `session.md` asks for runs beside a batch. So the count's 83 s is a time under that load, not a figure to compare.

No decision of the curator covers decision 3's placement, decision 5, the placement in decision 6, or decision 8. Each follows the library's or the record's practice, as cited.

## 10. Defects, each with its home

- Rows 793 and 794: home 1, repaired. The promoted `Array2SliceAtNonzeroBase` and `Array3SliceAtNonzeroBase` assert them. The moved values of section 5 are these same two defects.
- NEW-N-1, the library's `=/=` and `assert` comparing by identity a value whose `=` no `FortressLibrary` trait declares: home 2, since the specification settles it (`opr-overview.tex:272-273`). Recorded by `XXXNotEqualOwnEquality` and a row.
- NEW-N-2, a slice of a shifted `Array2`: home 2, settled by `ranges.tex:115-127` and the api's `shift` (`Library/FortressLibrary.fsi:1434-1438`). Recorded by `XXXArray2ShiftedSlice` and a row.
- Row 774: unchanged; it gets a note.

## 11. For the curator

- NEW-N-2's one-line fix, `index(on0 - b0, on1 - b1)` at `Library/FortressLibrary.fss:2816`, was measured passing `XXXArray2ShiftedSlice`. It is a candidate for the next library rung, beside the other array bodies.
- The `=/=` defect's repair. The specification makes `e ≠ e'` mean `¬(e = e')` (`Specification/basic/operators/opr-overview.tex:272-273`), but the library's `=/=` reads `=` in its own scope (`Library/FortressLibrary.fss:98`). A fix needs a way to reach the caller's `=`: a desugaring of `≠` at the call, or every comparable type extending `Equality`. The record decides neither.

## 12. For FACTS, and commands

Two facts are handed over, in `record.md`.

Commands worked out:
- `python3 explorations/coordinator/tools/ledger.py check --rows FILE` lints draft row lines without writing anything; a `?` number cell fails only the number rule.
- The ladder comparison: a `join` of the two tables on `corpus/file`, comparing phase and first error.

Other files still name the old test names `XXXArray2SliceAtNonzeroBase` and `XXXArray3SliceAtNonzeroBase`: the ledger rows 793 and 794 (whose closes take the new names), and earlier record files (`explorations/compile-ladder/climb-batch-20/RECORD.md`, `explorations/compile-ladder/plan-21/manifest/lists21.py`, `explorations/coordinator/CLIMB-BATCH-21.md`, `explorations/coordinator/PLAN.md`, among others). This rung does not edit them.
