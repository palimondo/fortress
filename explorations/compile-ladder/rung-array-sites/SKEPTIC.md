<!-- Climb batch 20, rung A (the array sites): the skeptic's check of the worker's head 48d809df2 on wip/rung-array-sites, its corrections and its verdict. Base 97ccd5f1f. -->

# Skeptic: rung A, the array sites by the library's own devices

**Verdict: approved.** The library edit is the probe's two patches, byte for byte; the distance and count tables are the worker's head's; the guard passes on the base and the head; the order of the tests is the skill's. Six corrections, none of the change's code, none contested: two test messages' citations, a gated expected failure and a row for `Array3`'s face of the defect the worker found, the guard's non-square matrix, and record.md's and REPORT.md's sentences. The report's tables are those of the worker's head `48d809df2`: no count or distance stage ran after my commits, which change only tests and the record.

Head judged: `48d809df2` (with `c258a3b5f`, the worker's REPORT.md and record.md from the run's journal). Head after: this file's commit.

## 1. What I checked

1. **The library is the two patches.** `ways.patch` then `e3-rebased.patch` applied with `git apply` to the base's `Library/FortressLibrary.fss` and `.fsi`, in a scratch copy, then `diff` against the head's two files: no difference ("SAME-AS-PATCHES"). Every hunk read against the section: 1a, 1c, 2a, 3d, 4d, 4f and E3, and nothing else; the matrix `+` and `-` keep their `m` (`Library/FortressLibrary.fsi:1757-1770`). The component's `cast` calls go from 38 to 52 (`grep -c 'cast\[\\'`: 39 lines at the base, 53 at the head, each with the declaration at `Library/FortressLibrary.fss:33`).
2. **The test of the sites, the distance stage.** On the worker's tables, a file read:

       $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-19/gate/distance.txt tmp/rung-array-sites/distance-postedit.txt
       DISTANCE DOWN   31 -> 11 (-20)
           kind typecheck               29 -> 10     (-19)
           class V2                     17 -> 0      (-17)  arrays: a sized array's body or factory (sizes lost in joins and factories)
       $ python3 explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/rung-array-sites/dist-post/errors.tsv
       export 'does not define all declarations': landed 17 entries, now 0
       export 'are not matched by the declarations': landed 44 entries, now 44

   The 20 rows gone are the section's 20 sites, the 17 entries the first export error's; nothing comes. The count: `diff` of `explorations/compile-ladder/climb-batch-19/gate/checker-count.txt` with the worker's prints only `#total 28` to `9` and `#locations 27` to `8`. The landed tables are of the base's code: `git diff --stat ebd39a6bd 97ccd5f1f -- Library ProjectFortress/src ProjectFortress/LibraryBuiltin build.xml` is empty (`ebd39a6bd` recorded the gate's tables). In the transcript the patches were applied at 07:19:55 (call `A5Lfro`), committed unchanged at 07:22:27 (`T7X9pM`), the count stage started at 07:22:36 (`U1a8Ku`, `real 1m7.256s`) and the distance stage at 07:23:54 (`9hSc8D`, `#total 11`, `#seconds 152`); no code was edited after.
3. **Test first, by the transcript.** The guard: written 07:15:49, last edited 07:16:28, run through the harness on the base's code at 07:16:31 (`RLHGtW`): `tree 97ccd5f1f` / `PASS` / `OK (1 test)`, before the library edit at 07:19:55. The expected failure: run on the base at 07:17:05 (`fyS2Zq`): `FAIL: a Int: 22 =/= a Int: 11; ...` / ` OK Saw expected exception`; red on a deliberate change at 07:17:25 (`NgqZ4L`): ` Missing expected failure` / `Tests run: 1,  Failures: 1,  Errors: 0`. The last run after the edit, 07:20:21 (`BSZhfM`), 42 files: `OK (42 tests)`. The rung's own failing test is the distance stage, whose before the section gives as the landed list; the record holds it on the base's code (check 2).
4. **The suites and runs the section asks.** In the worker's logs: `ant testSystem` on the final tree, shards of 166, 162, 173 and 165, `BUILD SUCCESSFUL`, `Total time: 6 minutes 19 seconds`; `ant testSpecData`, `Tests run: 130, Failures: 0, Errors: 0`; microGPT's quick pair, `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS` with `rc=0 secs=74` and `rc=0 secs=82`; the ladder subset of 17 files and the eighteen microGPT components equal to the baselines. No Java or Scala changed, so no other suite was owed.
5. **The provenance lines.** Each cited line opened with `sed -n`: the problem's `distance-sites.tsv:2`, `:4`, `:5`, `:13`, `:27`, `:29`, `:31` are the sites it names; `aggregate.tex:152-155` and `:165-166` say an array of numbers of two dimensions "is a matrix" and of one "is a vector"; `apis.tex:249-256` is the export rule; the precedents `Library/FortressLibrary.fss:2407-2414`, `.fsi:1580-1581`, `.fss:2585-2592`, `:2611-2627`, `:3008-3031` are `ImmutableArray1`'s leaf `fill` and `tabulate`, `array1`'s cast arms and the component's short headers. One correction: the specification grep prints four lines, not none (section 2, finding 6).
6. **The tests' messages.** Each names its topic and carries one comment line. The specification citations did not name a section, and four of them claimed what the section does not say (finding 1).
7. **Competing declarations of the names the rung adds.** `fill` and `tabulate` in `Vector` and `Matrix`: no extender in `ProjectFortress/tests`, `ProjectFortress/demos`, `Library/` or microGPT's `explorations/run-c4/src/FlatArrays.fss` declares either (`lutx.fss`, `FlatTowerRungF.fss`, `wrongOverload.fss`, `Sparse.fss` and the views of `FlatArrays.fss` declare `replica`, `get`, `put` and `init0` only). `array3(v)`: no test or demo declares an `array3`. `ProjectFortress/src/com/sun/fortress/`: no Java or Scala names `fill`, `tabulate` or `array3`; `WellKnownNames.java:32` and `:51` name `__builtinFactory<rank>` and `__immutableFactory1`, whose names and static parameters the rung keeps. No compiled test imports `FortressLibrary` or an api that does (`Compiled280.fss` imports `Set`, whose api imports `Containment` and `CovariantCollection`).
8. **The ledger, with my own words.** `ledger-find` for subarray, SubArray2, SubArray3, Array3 subscript, TrivialOpenRange, shift, replica Vector, cast CastError, fill tabulate, dead size, immutableArray, export error and Col: rows 298, 56, 466, 678, 782 and 465 bear on the rung; none holds the slices' defect; row 782's count is made stale (finding 5).
9. **The specification.** No normative sentence names these declarations; the arrays chapter's table of `fill` and `tabulate` (`Specification/advanced/parallelism-locality/arrays-distributed.tex:51-56`) and Appendix I's "Initializing an array from a function" (`Specification/appendices/changes.tex:1245-1281`) stay true. Part IV is the api rendered at the specification's build (`Specification/library/default-libraries.tex:27`); no rendered copy is committed.

## 2. My programs, old against new

Each under walk on the old code, `/home/user/fortress-base20/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base20 /home/user/fortress-arraysites/tmp/old-caches P.fss`, and on the head, `FORTRESS_HOME=/home/user/fortress-arraysites FORTRESS_CACHES=<a private copy of the worktree's caches> bin/fortress P.fss`, one JVM at a time, under `nice -n 19`. The bodies the rung adds write arrays (`init0` in a parallel `for`), so the two that exercise them most ran at `FORTRESS_THREADS=1` and `=4`.

| Program | What it does | Walk, old | Walk, new |
|---|---|---|---|
| SkNonSquare | a 2 by 3 matrix at `ZZ32`, `RR64`, `QQ`, `NN32`, `ZZ`: `tabulate`, `matrix(v)`, `+`, `-`, `scale`, `fill`, `t()` and its `+`, `-`, `scale`, `fill`, `rmul`, `lmul`, `m u`, `u m`, `x m`, `m x`, `DOT`, the vector `+` and `-` | 100 lines, e.g. `ZZ32 rmul: true 45 45`, `QQ t+: true 5 1/2 1/2` | the same 100 lines; at 1 and at 4 threads, identical |
| SkViews | a user `Vector` view and a user `Matrix` view, as microGPT's `RowView` and `PView`, through every cast body, `fill`, `tabulate`, `DOT`, juxtaposition; a 64-vector and an 8 by 8 matrix | `v+v true 16.0` ... `bigm 63.0 58.0 29.0` | the same; at 1 and at 4 threads, identical |
| SkOddView | a user `Vector` whose `replica` answers a 0-based `Array1` that is not a `Vector`, then `v + v` | `odd v+v is a Vector false is an Array1 true 4.0`, `rc=0` | `CastError` at `Library/FortressLibrary.fss:36:13-27`, from `:2534:9-78` (`Vector`'s `+`), `rc=1` |
| SkNatInstance | `instanceOf` with sizes | `2x3 is Matrix[3,2] false`, `v2 is Array1[1,2] false` | the same |
| SkFillCoerce | `fill` with a numeral on `RR64`, `QQ`, `ZZ64` vectors and an `RR64` matrix, `array[\RR64\](3).fill`, `tabulate` | `vector fill numeral 1.0 true` ... `vector tabulate 2.0` | the same |
| SkArray3V | `array3[\ZZ32,2,2,2\](5)` | `array3(v) true 5` | the same |
| SkImmRank2 | `immutableArray[\ZZ32\](2,3)` | `Unification error: Closure/Constructor for immutableArray param 1 (x:ZZ32) got arg (2,3)` | the same |
| SkA2Col, SkA2Row, SkA2All | `a[:, 1]`, `a[1, :]` and `a[:]` of a 2 by 3 `Array2` based at (1,1), `a[i,j] = 10 i + j` | `col0=22`, then `Index 7 out of bounds for length 6`; `row0=22 row1=23`, then `Index 6 ...`; `all00=22`, then `Index 9 ...` | the same |
| SkA3Range, SkA3All | `a[(1,1,1)#(2,2,2)]` and `a[:]` of a 2 by 2 by 2 `Array3` based at (1,1,1), `a[i,j,k] = 100 i + 10 j + k` | `r000=222`, then `Index 14 out of bounds for length 8`; `([0,1] BY [0,1] BY [0,1]) left outside bounds ([1,2] BY [1,2] BY [1,2])`, `IndexOutOfBounds[\(ZZ32,ZZ32,ZZ32)\]` | the same |
| SkA1Slice | `a[:]` and `a[2#2]` of an `Array1` and `a[:]` of an `ImmutableArray1` based at 1 | `A1 all0=11 all2=13`, `A1 range0=12 range1=13`, `IA1 all0=11 all2=13` | the same |
| demos | `conjGrad`, `lutx`, `mm`, `BiCGSTAB2`, at 4 threads | `dense OK`, `dense^2 OK`, `Dv OK`; `lutx` and `mm` complete; `BiCGSTAB2` stops at `:163` on a `ZZ64` over `RR64` division | the same (conjGrad's random matrices and `mm`'s and `BiCGSTAB2`'s timings differ) |
| SkCompiled | `vector[\RR64,3\](1.0) + ...`, `fortress compile` | `Function vector is not defined.` | the same |

The compiled path's library has no array type (row 305), so no construct the rung touches compiles there; the walk and compiled answers disagree only as row 305 says. Every pair agrees but SkOddView, where the specification's declared type answers: `Vector`'s `+` declares `Vector[\T,s0\]` (`Library/FortressLibrary.fsi:1618`), and the base returned a value that is not one.

The `OddView` of SkOddView, the program's only declaration:

    object OddView[\nat c\](base: Vector[\RR64,c\]) extends Vector[\RR64,c\]
        get(j: ZZ32): RR64 = base.get(j)
        put(j: ZZ32, x: RR64): () = base.put(j, x)
        init0(j: ZZ32, x: RR64): () = base.init0(j, x)
        replica[\U\](): Array1[\U,0,c\] = __builtinFactory1[\U,1,c\]().subarray[\0,c,1\](1)
    end

## 3. Findings and fixes

1. **The specification citations of the two array tests named no section, and four claimed what the section does not say** (`ProjectFortress/tests/VectorMatrixCastsWalk.fss:128-141`, `XXXArray2SliceAtNonzeroBase.fss:9-14` at `48d809df2`). "ranges.tex, implicit ranges" is no heading: the file's one section is "Ranges" (`Specification/basic/expressions/ranges.tex:12`), and the suite cites it 113 times as `ranges.tex, section \"Ranges\"`. The guard's four type assertions say a column and a row are 0-based rank-1 arrays, which ranges.tex does not say; the component's row and column extraction gives the base, `Col(cast[\Array2[\T,0,s0,0,1\]\](...))` (`Library/FortressLibrary.fss:2705`, `:2709`). Fixed in `6b1a256ab` (correction, messages only). Settled by the skill's rule, "In a test, cite the specification by file and section or entry, never by line" (`.claude/skills/fortress-repo/references/tests-writing.md:135`). After it, through the harness: old code `OK (3 tests)` with `FAIL: a Int: 22 =/= a Int: 11; the column's first element is a[b0,b1]; ranges.tex, section "Ranges": the implicit range : is treated as l:u` / ` OK Saw expected exception`; the head the same (`harness-one.sh ... VectorMatrixCastsWalk.fss XXXArray2SliceAtNonzeroBase.fss XXXArray3SliceAtNonzeroBase.fss`, 08:05:28Z on `tree 97ccd5f1f`, 08:05:49Z on `tree c258a3b5f`).
2. **`Array3`'s face of the worker's NEW-A-1 was left unmeasured; it reads one base too far, and its whole subscript raises** (record.md's NEW-A-1 at `c258a3b5f`: "`Array3.subarray` has the same shape (`:3128-3133`), not measured"). SkA3Range and SkA3All (section 2): on both codes `r000=222` where `a[1,1,1]` is 111, and `a[:]` raises `IndexOutOfBounds`. Two causes: `Array3.subarray` hands `SubArray3`, whose offsets are 0-based, the offset with no `- b0` (`Library/FortressLibrary.fss:3128-3133`, `:3179`), and `Array3`'s `opr[_:TrivialOpenRange]` passes `(0,0,0)` (`:3110-3111`) where `Array2`'s passes `(b0,b1)` (`:2684-2685`); both the team's (`a874948ac` `Library/FortressLibrary.fss:2728`, `:2749`). `Array1` and `ImmutableArray1` slice right at base 1 (SkA1Slice). Home 2: the api's "the subarray starting at %(o0,o1,o2)% in the original array" (`Library/FortressLibrary.fsi:1844-1847`) and ranges.tex's "The implicit range `:` is treated as `l:u`" settle the answer. Fixed in `fe3fc362c` (correction): `ProjectFortress/tests/XXXArray3SliceAtNonzeroBase.fss`, and row NEW-A-2 in record.md beside NEW-A-1, which now names it as a sibling and its own `a[:]` face (SkA2All, `all00=22`). Through the harness, on the old code at 08:05:28Z: `FAIL: a Int: 222 =/= a Int: 111; the range subscript (b0,b1,b2)#(2,2,2) starts at a[b0,b1,b2]; Library/FortressLibrary.fsi, trait Array3, subarray` / ` OK Saw expected exception`; on the head the same, 08:05:49Z and 08:10:57Z; red with `sliceAt3[\0,0,0\]()` for one run, then restored (`cmp` clean): `PASS` / ` Missing expected failure` / `Tests run: 1,  Failures: 1,  Errors: 0`.
3. **A walk value moves that the record says does not: a `Vector` or `Matrix` whose `replica` answers an array that is not one now raises `CastError` at its cast bodies, where the base answered that array** (SkOddView, section 2). Not a defect: the body's declared type is `Vector[\T,s0\]`, and the base's value was not one; the nine bodies build through the receiver's `map` and `ivmap`, and so through its `replica` (`Library/FortressLibrary.fss:2461`, `:2469-2472`, `:2743-2746`). No extender in the tree's tests, demos, library or microGPT has such a `replica` (check 7). record.md's FACTS entry said "Under walk no value moves" and its revival change "Under walk every value is as before"; both now say "of the tree's tests and demos" and name the case. Fixed in `b7b787c78` (correction). Settled by fork 6's "a cast that fails raises `CastError` where the base answered a value" (`explorations/coordinator/CLIMB-BATCH-20.md:68`), which names the outcome; the case is a point to report (section 5).
4. **Row 465's note said no other example was met; there is one, a method** (record.md at `c258a3b5f`). The component's `Array2` declares the column and row subscripts `opr[_:TrivialOpenRange, i1:ZZ32]` and `opr[i0:ZZ32, _:TrivialOpenRange]` (`Library/FortressLibrary.fss:2705`, `:2709`); the api's `Array2` declares its two-index assignment and its one-argument subscripts only (`Library/FortressLibrary.fsi:1705-1708`); walk runs `m[:, 1]` and `m[1, :]` (`VectorMatrixCastsWalk`). The worker's note also overran the row: row 465 has 1,030 of its 1,200 characters. Fixed in `b7b787c78` and `788107fd6` (correction): a note of 155 characters, the detail beside it. Settled by the section's "give another example if you meet one, else say there is none" (`explorations/coordinator/CLIMB-BATCH-20.md:155`).
5. **Row 782's claim counts the first export error before this rung**: "FortressLibrary's 'Missing declarations' grows from 17 entries to 165" (`explorations/fortress-gap-ledger.md`, row 782); the 17 are gone after the rung. Added to record.md's ledger list for a note, in `b7b787c78` (correction).
6. **The report's specification grep prints four lines, not none** (REPORT.md's spec line at `c258a3b5f`): `rmul` matches inside "formula" and "formulation" (`Specification/latex-common/macros/macros.tex:35`, `Specification/appendices/internal-document.tex:561`, `Specification/appendices/future.tex:86`, `Specification/advanced-lib/binary.tex:697`). Fixed in `b7b787c78` (correction).
7. **The guard's matrices were all 2 by 2, so it could not tell `Matrix[\T,s0,s1\]` from `Matrix[\T,s1,s0\]`**, and walk's `instanceOf` does tell sizes apart (SkNatInstance: `2x3 is Matrix[3,2] false`). Fixed in `3baae9302` (correction, a missing assertion of the bodies the test reaches): `nonSquare` asserts the type and an element of a 2 by 3 matrix's `tabulate`, `matrix(v)`, `+`, `-`, unary `-`, `scale`, `fill`, `rmul` and `lmul`, and of its transpose's `+`, at the eight types. Settled by the section's "it asserts that each body the patch wraps in cast answers its declared type with the right elements" (`explorations/coordinator/CLIMB-BATCH-20.md:142`). A guard: through the harness on the old code at 08:10:43Z, `tree 97ccd5f1f` / `PASS` / `OK (1 test)`; on the head at 08:10:57Z, `tree b7b787c78`, `PASS` / `OK (3 tests)` with the two expected failures.

No defect of the change itself: the code is the probe's measured text, and every pair of section 2 but SkOddView agrees.

## 4. Where I differ from the worker's account

- REPORT.md section 8, point 4, "no value moves": true of the 42 tests and of the tree's demos (section 2), not of every program (finding 3).
- REPORT.md section 9: "`Array3.subarray` has the same shape (`:3128-3133`), not measured": now measured, with a second cause in `Array3`'s `opr[:]` (finding 2).
- Decision 4 says every `assert` with a message reaches `__immutableFactory1` through varargs: true, and the guard reaches its base-0 cast on every one of its assertions.
- The guard's coverage beyond the brief's list (both factories' casts) stands; the non-square block is mine.

## 5. Points to report

- **The two patches as they are**: the head's library equals them applied (check 1).
- **The tables**: distance 31 to 11 (typecheck 29 to 10, export 2 to 1, class V2 17 to 0), the first export error's 17 entries gone, the second's 44 unchanged, nothing come; count 28 to 9 (check 2).
- **The count stage's seconds**: about 64 s at climb batch 19's gate (the brief), 67 s on the head (`real 1m7.256s`); no speed pass.
- **Walk values**: none moves in the tree's tests and demos; no cast fails at any of the eight element types; one moves in a program outside the tree, a `Vector` whose `replica` is not one, from a value to `CastError` (finding 3).
- **The api and so Part IV**: `immutableArray`'s ranks 2 and 3 leave (`Library/FortressLibrary.fsi:1500-1503`); `array3(v)` joins (`:1867`); `Vector`'s and `Matrix`'s `fill` and `tabulate` join (`:1624-1625`, `:1746-1747`); the 17 operators' headers lose `nat m`, `nat m, nat p` or `nat p` (`:1653-1680`, `:1780-1802`).
- **Sentences made false**: none of the specification. Of the record: F-35's "25 declarations with a dead size" (8 now) and "Six vector `DOT` and juxtaposition operators have this shape ... and give one of the distance's export errors"; F-260's measurement; F-53's distance and count; F-54's "the sized arrays ... lead"; F-58's 3 `DOT` refusals, by reading; F-158's "both defined where the array diamond meets" with two leaves beside; PLAN.md:67, :134 and :198; row 678's claim; row 465's example; row 782's "17 entries".
- **Ladder, compiled tests, specification examples, microGPT**: none moves (the worker's runs, check 4).
- **Files beyond those named**: `ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss` (the worker's) and `ProjectFortress/tests/XXXArray3SliceAtNonzeroBase.fss` (mine), the gated homes of NEW-A-1 and NEW-A-2. No edit of the number traits, walk, the checker or the code generator.
- **The guard's reach at a base above zero** is a column's and a row's type and size, since the base reads their elements wrongly (NEW-A-1).

## 6. For the curator

- The worker's two questions stand: which batch fixes NEW-A-1, now with NEW-A-2 beside it (the fixes are one line in each `subarray` and, for `Array3`, its `opr[:]`'s offset); and item 112's wording, now that two leaves declare `fill` and `tabulate` beside the meet.
- Whether the library states that a `Vector`'s or `Matrix`'s `replica` at its element type is a `Vector` or `Matrix`, which the cast bodies now rely on (finding 3; `Library/FortressLibrary.fss:2461`, `:2534`). Way 1b of the ways note, the bodies through the factory's own `tabulate`, would not rely on it, and waits on P-85.
- Whether the api declares `Array2`'s column and row subscripts, as this rung declared `array3(v)`: the compiled checker reads the api, which lacks them (finding 4).

## 7. Commits

| Commit | Kind | What |
|---|---|---|
| `c258a3b5f` | record | the worker's REPORT.md and record.md from the run's journal |
| `6b1a256ab` | correction | the two tests' specification citations |
| `fe3fc362c` | correction | `XXXArray3SliceAtNonzeroBase.fss` and row NEW-A-2 |
| `b7b787c78` | correction | record.md's walk-value claim, rows 465 and 782; REPORT.md's grep line |
| `3baae9302` | correction | the guard's 2 by 3 matrix |
| `788107fd6` | correction | row 465's case, its wording |

None is contested: each changes a test's message, adds a guard's or an expected failure's assertion, or corrects a sentence of the record, and each is settled by the sentence cited with it.
