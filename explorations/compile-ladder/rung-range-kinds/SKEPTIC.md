# Skeptic's verdict on rung R of climb batch 12 (rung-range-kinds)

Head judged: `7425daa51`, the worker's last commit. The report and the record came from the run's journal (`12de8f4a2`). The skeptic's commits: `1a3fa193f` (a test) and `dc880ca13` (corrections to `REPORT.md` and `record.md`). No library, checker or walk code changed after the worker's head, so the report's count and distance tables are those of the worker's head, and nothing was built.

Verdict: **approved**. The change is right, as small as its tests need and in the library's own way. Its record missed one kind of value change: the arrays' range subscripts and subarrays of rank 2 and 3. That point is now in the report, the record and a gated test. No fix is contested.

## 1. What was checked

- **The stage as the test.** `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-11/gate/distance.txt tmp/rung-range-kinds/distance-postedit.txt` prints the report's table, `DISTANCE DOWN 207 -> 198 (-9)`. `diff` of batch 11's `checker-count.txt` against the worker's post-edit count prints nothing. Mapped back to the base through `git diff -U0 7fa767d48 7425daa51`, the post-edit `errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv` gives exactly the report's section 3 table: ten sites gone and one new. The ten are rows 654, 655 (2), 656 (5) and 608, plus the `BIG LEXICO` site at `Library/FortressLibrary.fss:130`, which is row 488's variation. The new one is `:2257`, NEW-R-1. The export check's lists of unmatched declarations are the same before and after, once their line numbers are removed. The transcript shows both runs on the head's code: the count from 12:06:51 to 12:09:52, in the same command as the last edit (12:06:50); the distance from 12:10:53, after the commit at 12:10:46.
- **Test first.** In the worker's transcript, the base run (call `kph3t1`, 11:53:16) ran before the first library edit (`2JvhZ1`, 11:54:58). It printed `Tests run: 9,  Failures: 8,  Errors: 0`, and each failure is for the rung's reason (the quoted lines are in `recordedFailure`). The five stop tests' keys were rewritten at 11:56:59 (`zsSFpq`), after the edit. They were then run on the old code (`2sUVmf`, 11:57:14), as `tests-writing.md`, "The order", allows for a tree that already holds the fix: `Missing expected refusal at load` five times. The passing run (`TQ61Fr`, 12:10:01, `OK (23 tests)`) came after the last edit (12:06:50) and before the commit of `7425daa51` (12:10:46). `ant testSystem` started at 12:11:00 on that code: 133+136+129+136 = 534, 0 failures. `RangeNarrowKinds` passes before and after, as the section asks.
- **The diff**, line by line, against the section, POSITIONS ("A range of rank 2 or 3 checks containment corner by corner", "The library's own practice is the standard", "Scalar ranges are over ZZ32 only"), the archaeology's section 5 and rung L's decisions 4 to 7. Each row's edit is the one the section names:
  - row 655: the move of the bounds check to the nine kinds;
  - row 657: `PCMP` with `Unordered` raising;
  - row 654: the team's typecase;
  - row 656: `fail` bodies under Q49's default;
  - row 658: `0 # |s|`, in the shape of `ZeroIndexed`'s bounds (`Library/FortressLibrary.fss:1909`) and of `List`'s `indices` (`Library/List.fss:277`);
  - row 608: `r'.left.get` with the stride kept.

  The per-rank names are needed: the worker's probe (call `8ZX1b5`) shows walk refusing three overloads of one name over `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]` ("first parameters ... are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present"). The `abstract` written only in the api, with a bodiless declaration in the component, is rung L's practice for `CMP` (`Library/FortressLibrary.fsi:2184`). Every object below `Range` reaches a body through `ScalarRange`, `Range2D`, `Range3D` or its own declaration (`TrivialOpenRange`). No test corpus or library component outside `RangeInternals` and `FortressLibrary` extends a range trait.
- **Callers of the five methods.** `grep` for `.truncL(`, `.truncR(`, `.every(`, `.imposeStride(` and `.atMost(` over `Library/` finds only `opr :` and `opr #` at `Library/FortressLibrary.fss:4110` and `:4115` with a receiver that can be `(:)`; `:4112` is inside a comment.
- **Siblings.** The other `.lower` readers (`Library/FortressLibrary.fss:1943`, `Library/List.fss:200`, `:212`, `Library/PureList.fss:117`) read an `Indexed`'s `bounds`, a `CompactFullRange` (`Library/FortressLibrary.fss:1837`), which declares `lower`. Set's index-value generator reads `s.indices` of a `ZeroIndexed` (`Library/Set.fss:154`, `Library/Set.fsi:24-25`). No other site shares row 608's or row 658's defect.
- **The ledger.** `ledger.py find` for `reflect`, `NatParam`, `subarray`, `narrowToRange`, `checkSelection`, `TrivialOpenRange`, `PrefixSet`, `IndexOutOfBounds`, `lexicographic` and `ImmutableArray1` finds no row that NEW-R-1 duplicates. It finds no row the rung leaves wrong; row 609's completion of `:b:c` goes through the rank-1 check, which is unchanged.
- **Competing declarations.** `checkSelection2D` and `checkSelection3D` are declared only in `Library/RangeInternals.fss` and `.fsi`. Neither name, nor `checkSelection`, appears in the test corpora, `SpecData`, the compiler's library or `ProjectFortress/src/com/sun/fortress/`. No other branch of the batch adds a test file of the rung's names or of `ArrayRangeCornerBounds`.
- **Citations.** The five provenance lines and the cited lines were each opened with `sed -n` on the head. One was wrong (section 3 below). The rest say what they claim, among them `FileTests.java:382-385` and `:418` and `Library/FortressLibrary.fss:54-57`, on which decision 8 rests, and `:227`, on which decision 2 rests.

## 2. The differential: the skeptic's programs

Each program was run under walk with the rung's code (`bin/fortress P.fss` in the rung's tree) and with the old code (`/home/user/fortress-base12/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base12 /home/user/fortress-rangekinds/tmp/old-caches P.fss`), at `FORTRESS_THREADS=1`.

**`narrowToRange` beyond the worker's cases** (`SkNarrow`, 35 cases: 22 of `narrowToRange` at rank 1 to 3, and 13 subscripts of arrays, strings and `Just`; each prints the value's `asDebugString` or `raise1`/`raise2`/`raise3` for `IndexOutOfBounds` of that rank). The old and new outputs differ in seven lines, each a value that became a raise. Every value and raise at rank 1, of strings and `Just`, of an open or extent range, on an empty axis and inside the bounds is the same. Five of the seven are `narrowToRange` cases beyond the four of the report:

    old: r2 left unordered (0,5):(9,9) n (1,0):(5,9) => CompactFullRange2D(1,5, 5,9)      new: => raise2
    old: r2 right unordered (0,0):(9,5) n (1,0):(8,6) => CompactFullRange2D(1,0, 8,5)     new: => raise2
    old: r2 left self (2,2)# n (3,1)# => LeftRange2D(3,2, 1,1)
    new: r2 left self (2,2)# n (3,1)# => raise2
    old: r2 strided self n left out on one axis => StridedFullRange2D(2,0, 6,6, 2,2)
    new: r2 strided self n left out on one axis => raise2
    old: r3 left unordered => CompactFullRange3D(1,1,5, 5,5,9)        new: r3 left unordered => raise3

The other two are the array subscripts below.

**The arrays' range subscripts and subarrays** (`SkCorner`: `a` is a 3-by-3 array of `10 i + j`, `b` a 2-by-2-by-2 array of `100 i + 10 j + k`):

    old: a[(1,-1):(2,2)] => [0#2,0#3]  [ 10 11 12 / 20 21 22 ]
    old: a[(0,0):(1,3)] => [0#2,0#3]  [ 0 1 2 / 10 11 12 ]
    old: a.subarray[0,1,0,4,0,0](1,1) => [0#1,0#4]  [ 0 1 2 10 ]
    old: b[(1,0,-1):(1,1,1)] => [0#1,0#2,0#2]  [ 100 110 ;; 101 111 ]
    new: each => raise2, raise2, raise2, raise3; a[(-1,1):(2,2)] => raise2 old and new

The old code cut a range outside the bounds on a later axis down to the bounds, and the subarray's `(0,3)` read `a`'s `(1,0)`, a quiet wrong value. Both now raise, as the curator's answer to Q50 says a corner outside on one axis does. The report did not list this (section 3 below).

**The open range** (`SkOpen`, and one program each for `(:).truncR(4)`, `(:):2` and `(:)#2`). `a[:]`, `m[:]`, `(:) = (:)`, `(:) CMP (:)`, `(:).narrowToRange(:)`, `(:) INTERSECTION (:)`, `3 IN (:)`, `flip`, `forward`, `check`, `isEmpty`, `stride`, `shiftLeft` and `<<` print the same old and new. The three stops are those of the report:

    old: (:):2 OpenScalarRange(2)            new: FAIL: imposeStride of the trivial open range (:), whose index type is Any
    old: (:)#2 ExtentScalarRange(2,1)        new: FAIL: atMost of the trivial open range (:), whose index type is Any

**Row 608** (`SkImm`, `SkImmNeg`). The frozen array answers as the mutable one does, with positive and negative strides. Examples are `f[1:9:4] => [0#3](immutable)[ 10 50 90 ]`, `f[8:2:-3] => [0#3](immutable)[ 80 50 20 ]` and `f[(0:9).every(-2)] => [0#5](immutable)[ 90 70 50 30 10 ]`. `f[5:12:2]` raises. The old code stops on each strided one: `Cannot find definition for method lower given receiver StridedFullParScalarRange`.

**Row 658** (`SkPrefix`), at `FORTRESS_THREADS=1` and `=4`: `p3 ivp indices [0,1,2]`, `p3 ivp sum of indices 3`, `p1 ivp indices [0]`, `p0 ivp indices [] empty true`, the same at both thread counts. The old code stops: `Cannot find definition for method indices given receiver fastPrefixSet[\ZZ32,List[\ZZ32\]\]`. The diff holds no mutable variable, field or atomic block of the library. The test `PrefixSetIndices` holds one, `s: String := ""` in a `seq` loop, which is why both thread counts were run.

**The compiled path.** It compiles against the compiler's library, which the rung does not touch. `fortress compile` of `r = (0:9).narrowToRange(2:5)` prints `No such method Range.narrowToRange.` with the old and the new code. Of `seq(2:8:3)` it prints `Could not check call to operator : - (ZZ32, ZZ32)->Range is not applicable to an argument of type (Range, IntLiteral).` with both: the compiler's library has no strided `:` (row 514). Walk and the compiled path do not disagree on anything the rung changed.

**The failure-mode question.** The rung turns two loud failures into values: the strided subscript of a frozen array (row 608) and a prefix set's indices (row 658). Each value is that of the library's twin: `Array1`'s subscript, and `ZeroIndexed`'s `0 # |self|`. The specification says nothing on either. Every other change goes the other way, from a value to a raise or a stop.

## 3. Findings and corrections

1. **A value change the record missed** (correction: test, report and record). The arrays' range subscripts and subarrays of rank 2 and 3 call `narrowToRange` (`Library/FortressLibrary.fss:2534`, `:2586`, `:2929`). So under Q50 a corner outside on one axis now raises, where the base cut the range to the bounds or read past them (section 2). Report section 6 said that every value it measured was the same "except the four that Q50 changes", and its points to report named only those four.
   - The test: new `ProjectFortress/tests/ArrayRangeCornerBounds.fss`, commit `1a3fa193f`. It asserts two values inside the bounds and the four raises.
   - Failing on the base's code: `FORTRESS_HOME=/home/user/fortress-base12 /home/user/fortress-base12/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-range-kinds/skeptic/old-harness ProjectFortress/tests/ArrayRangeCornerBounds.fss` printed `# harness-one 2026-10-09T13:18:09Z; tree 7fa767d48`, then ` UNEXPECTED exception`, `FortressException: ForbiddenException`, `Tests run: 1,  Failures: 1,  Errors: 0`.
   - Passing on the head's code: `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-range-kinds/skeptic/h-new ProjectFortress/tests/ArrayRangeCornerBounds.fss` printed `# harness-one 2026-10-09T13:18:39Z; tree 12de8f4a2`, then `PASS`, `OK (1 test)`. The library then was that of `7425daa51`. A direct run at `FORTRESS_THREADS=1` and `=4` printed `PASS`, `rc=0` both times.
   - Settled by POSITIONS, "A range of rank 2 or 3 checks containment corner by corner": "`((0,0):(9,9)).narrowToRange((2,-1):(5,5))` raises `IndexOutOfBounds` as `(-1,2):(5,5)` does".
   - In commit `dc880ca13`, the report's section 6, its points to report and its homes name the change, with the measured before and after. So do the record's FACTS entry, the close of row 657, the handover and the revival change.
2. **A provenance line** (correction: citation). The precedent line cited `combine2D`/`combine3D` at `Library/RangeInternals.fsi:58` and `:88`, which are the base's lines. On the head they are `:64` and `:96`; `:58` is now a `narrowToRange`. Corrected in `dc880ca13`.
3. **The tests' count** (correction: report). Section 2 said "Six tests are written first ... The other two are five refusal pairs". The base run counts nine tests: four plain tests and five refusal pairs. Corrected in `dc880ca13`.
4. **NEW-R-1's citation** (correction: row). The row cited `ProjectFortress/LibraryBuiltin/NatReflect.fsi:23` for "`reflect` answers the trait `NatParam`". Line 23 is the commented `comprises`; `reflect` is declared at `:31`. Both are now cited. `ledger.py check --rows` on the corrected row, with a number for its placeholder, prints `0 fail the template`. Corrected in `dc880ca13`.
5. **A commit footer of the skeptic's own.** The first commit of the journal's texts carried a model name in its footer. It was amended to the skeptic's footer within the minute and replaced on the branch with `--force-with-lease` against that same commit. No one else's commit was touched.

## 4. Where the skeptic differs from the worker

- Report section 6 and point to report 1 understated the values that change under Q50. They are corrected, not argued; the worker's decisions stand as written.
- Decision 8, five refusal pairs in place of one test that catches the five stops, is right. `fail` writes `FAIL: ...` to the error stream before it throws (`Library/FortressLibrary.fss:54-57`). The harness counts `FAIL` in a plain test's output as red (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:382-385`, `:418`). So the section's single test could not be green.

## 5. Points to report

- Values that walk prints change:
  - item 50's raises and the pin at `ProjectFortress/tests/RangeKindBodies.fss:94-97`;
  - the arrays' subscripts and subarrays of rank 2 and 3 (`ProjectFortress/tests/ArrayRangeCornerBounds.fss`);
  - item 49's five stops (`Library/FortressLibrary.fss:3872-3883`), and `(:):s` and `(:)#n`, which reach two of them;
  - two stops that now answer (`Library/FortressLibrary.fss:2255`, `Library/PrefixSet.fss:478`).
- A library caller of the open range's five methods: `Library/FortressLibrary.fss:4110` and `:4115`.
- New api declarations beyond the moved bodies:
  - `checkSelection2D` and `checkSelection3D` (`Library/RangeInternals.fsi:44`, `:46`), and `checkSelection` narrowed to `ZZ32` (`:42`);
  - the twelve meets over an open range in `Library/RangeInternals.fsi`;
  - `TrivialOpenRange`'s two `narrowToRange` (`Library/FortressLibrary.fsi:2212-2213`).
- None reached: a declaration of the reductions section, a team test line, a checker or walk edit.

## 6. For the curator

Q49 is still open. The rung runs its default, way (a): `Library/FortressLibrary.fss:3872-3883`, with the five `TrivialOpenRange*Stop` tests. Under way (b) or (c) these are dropped and the five sites come back.
