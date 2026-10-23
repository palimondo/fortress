<!-- Climb batch 21, run 1, rung N (rung-slices-list-equality): the skeptic's check of the worker's head 4c6206c2e, its corrections and its verdict. -->

# Rung N, the skeptic's check

Head judged: `4c6206c2e` (the worker's last commit). The skeptic's commits: `eb6fd53d7` (the worker's REPORT.md and record.md, written from the run's journal), `944901606` and `3063446e1` (two corrections), then this file. No defect of the change was found, and no fix of code was made, so no code state was built and no suite was run by the skeptic. The tables of REPORT.md section 3 are those of the worker's head; the gate's tables on the merged tree are the record.

Verdict: **approved**. The change is right as the worker made it. The two corrections below are of a test's messages and of the record's row drafts; neither changes what the code does, and neither is contested.

## 1. What was checked

1. **The count and distance tables**, read from the worker's files. `checker-count-postedit.txt` holds every api at 0, `#total 3`, `#crash none`, and `diff` against `explorations/compile-ladder/climb-batch-20/gate/checker-count.txt` prints nothing. `distance/compare.sh` against `climb-batch-20/gate/distance.txt` prints `DISTANCE SAME   5`. The five sites of `dist-post/errors.tsv`, sorted, equal those of `explorations/compile-ladder/gate/distance-sites.tsv` (`diff` prints nothing). The count's 83 s runs from the start stamp `2026-10-23T15:09:24Z` to the table's write at 15:10:47 UTC, under `nice -n 19`; its machine file reads `nproc 4`, Xeon @ 2.10GHz, 2100.000 MHz, `loadavg 2.21 6.51 5.57`, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. The diff touches no checker code, so no timing pair was taken.
2. **Test first, in the worker's transcript** (`agent-afb9ea656dfe6a9a7.jsonl`). The promotions by `git mv` at 14:56:37 (call `BYeY4G`); the harness on the base's code at 14:57:05 (call `oULF5j`, tree 00f2e1bdc, cache empty), ending 14:57:21 with 'FAIL: a Int: 22 =/= a Int: 11', 'FAIL: a Int: 222 =/= a Int: 111', 'OK Saw expected exception' for `XXXNotEqualOwnEquality`, the guard 'PASS', and 'Tests run: 4,  Failures: 2,  Errors: 0'. The XXX test red with `P extends Equality[\P\]` for one run at 14:57:34 (call `cYHHaw`): 'PASS', ' Missing expected failure'. The library was first edited at 14:58:57 (call `TqeoCQ`), after both. The trial fix of `:2816` (calls `Hcknii` at 15:02:45) was restored in the same call, before the commit `582a91f26` at 15:03:26 (call `iPNh3s`), which also started `ant testSystem`: the last run after the last change of code. Its log reads 'Tests run: 165, Failures: 0', '168', '172', '166', 'BUILD SUCCESSFUL', 'Total time: 4 minutes 8 seconds', and its results 'Array2SliceAtNonzeroBase  OK (time = 2100ms)', 'Array3SliceAtNonzeroBase  OK (time = 1646ms)', 'ListEqualityElementwise  OK (time = 1032ms)', 'XXXNotEqualOwnEquality  OK Saw expected exception', 'XXXArray2ShiftedSlice  OK Saw expected exception', 'XXXConditionalExtensionTypeTestWalk  OK Saw expected exception'. `ant testSpecData`: 'Tests run: 130, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL'. The base build `/home/user/fortress-base21` is at `aa5ff2423`, which differs from 00f2e1bdc only under `explorations/` (`git diff --name-only aa5ff2423 00f2e1bdc | grep -v '^explorations/'` prints nothing).
3. **The diff, line by line.** Three lines of `Library/FortressLibrary.fss` (`:2732`, `:3113`, `:3134`; the brief's `:2733` and `:3135` are the declarations' next lines at the base), one line each of `Library/List.fsi:67` and `Library/List.fss:106`, the two promotions (the `component` line only), three new tests, and the specification's two callouts and Appendix I's four additions. Each does what REPORT.md says and no more. The three array lines are the team's at `a874948ac` (`:2384` and `:2728` there).
4. **The precedent.** `Array1.subarray` hands `o-b0` (`Library/FortressLibrary.fss:2458`), and so do `ImmutableArray1.subarray` (`:2400`), `__SimpleSubArray1.subarray` (`:2503`) and `__ImmutableSubArray1.subarray` (`:2517`); the rank-1 whole subscripts pass their base (`:2393`, `:2451`), and so does `Array2`'s (`:2687`). Every caller of `Array2.subarray` and `Array3.subarray` passes an offset in the array's own index space: the range subscripts (`:2683`, `:3109`), the whole subscripts, `shift` (`:2720`, `:3119`), `Col`, `Row` and `TransposedArray2.subarray` (`:2789`). `SubArray2` and `SubArray3` read 0-based offsets (`:2797`, `:3181`). The maps' `Equality` entries (`Library/Map.fsi:25`, `Library/IntMap.fsi:21`, `Library/PrefixMap.fsi:36`) are the precedent of the `List` line; `LexicographicOrder` extends `StandardTotalOrder`, which extends `StandardPartialOrder`, which extends `Equality` (`Library/FortressLibrary.fsi:1345-1346`, `:229-230`, `:175-176`), so where the condition holds the list reaches the same instance.
5. **The tests.** Each file has one comment line and is named by its topic. `ListEqualityElementwise`'s three citations of the `e =/= e'` sentence named the file but no section: corrected (section 4).
6. **The differential** (section 3).
7. **The three homes.** Rows 793 and 794: home 1, the promoted tests. NEW-N-1: home 2, `XXXNotEqualOwnEquality`, settled by `Specification/basic/operators/opr-overview.tex`, subsection "GCD, LCM, and CHOOSE Operators". NEW-N-2: home 2, `XXXArray2ShiftedSlice`, settled by `ranges.tex`, section "Ranges", and the api's `shift` ("a new view of the same array", `Library/FortressLibrary.fsi:1434-1438`). The values that move in section 3 go through the fixed lines and are rows 793 and 794 in other shapes, home 1 by the promoted tests. The shift faces of section 3.3 go through `:2816`, NEW-N-2's line: the row now names them (section 4).
8. **The ledger and the sibling sites.** `ledger-find` on shift, SubArray2, SubArray3, transpose, Array2, Array3, Equality, SEQV, identity, `=/=` and `assert Any`: no other open row holds these defects; rows 465, 54, 246, 503 and 774 stay true. The sibling site in the edited declarations' family is `SubArray2.subarray` (`:2816`), NEW-N-2, outside the rung by its section ("every other array body"); `SubArray3` has no such override. The compiled path has neither `Array2` nor `List` (section 3.4).
9. **The report.** Its five provenance lines were opened with `sed -n`: `XXXArray2SliceAtNonzeroBase.fss:9` and `XXXArray3SliceAtNonzeroBase.fss:9` at 00f2e1bdc are the first assertions; `walk-conditional-extension/REPORT.md:84` is mechanism B and `:174-181` the defect; `ranges.tex:119` is "The implicit range : is treated as l:u"; `opr-overview.tex:272-273` is the `e ≠ e'` sentence; `:293-295` and `algebraic-constraints.tex:519-522` are the two passages; `FortressLibrary.fss:2456-2459` and `:2450-2451` the precedent; `Map.fsi:24-25` the maps' entry. The frozen lines that Appendix I quotes, `Specification-1.0-frozen/advanced-lib/algebraic-constraints.tex` 519-522 and `Specification-1.0-frozen/basic/operators/opr-overview.tex` 284-285, hold the two sentences. Sentences made false: none found. `grep -rn subarray Specification --include=*.tex` outside `library/apis/` prints nothing; `trait-parameters.tex:383-390` is an example that leaves out `Equality` as it leaves out `AnyList`; F-255, P-154 and the skill's `revival-changes.md` ("A list's `=` stays element by element") stay true; Appendix I's sentence that the interpreter keeps the order of a list of tuples or floats is now at `changes.tex:248-253` and stays true. `QQ` is a `StandardPartialOrder` (`Library/FortressLibrary.fsi:395`), so the operators callout's "or of rational numbers" holds, as P-154 says. The whole suites the brief asks for (P-124) ran once on `582a91f26`, the last code state (section 1, item 2). record.md's FACTS entries, finding, rows and Revival change section were read against the tree: the corrections are in section 4.
10. **Competing declarations.** The five test names occur only in their own files, in both test corpora and under `ProjectFortress/src/com/sun/fortress/`. The rung adds no library name. The other rungs' branches (`origin/wip/rung-symbolic-library`, `rung-index-bound`, `rung-self-type-exclusion`) have no hunk at `FortressLibrary.fss:2729-2733` or `:3110-3135` or in `List`.
11. **The failure-mode question** (section 3.5).

## 2. The worker's decisions, and where the skeptic differs

The skeptic agrees with every decision of REPORT.md section 9. Two notes:

- Decision 6 (no `decision-record.md`): the worker's brief says "A decision record if your section asks for one. Nothing else under explorations/", and the section asks none; REPORT.md section 6 holds the reasoning and Appendix I names that report. The brief holds over the skill's `specification.md`, part 4.
- Decision 7 (NEW-N-2 filed, not fixed): right by the section's "Not yours: ... every other array body". The skeptic measured more faces of the same line (section 3.3) and wrote them into the row draft.

## 3. The skeptic's programs, old against new

All under `tmp/rung-slices-list-equality/skeptic/`. New code: `bin/fortress P.fss` in the rung's tree after the skill's setup lines. Old code: `/home/user/fortress-base21/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base21 /home/user/fortress-slicelist/tmp/old-caches P.fss`. Walk at `FORTRESS_THREADS=1`, and the new code again at 4: every line below was the same at 4. The diff writes no mutable variable, field or library state.

### 3.1 `Array2` based at (1,2), 2 by 3, `a[1+i, 2+j] = 10(i+1) + (j+1)` (`SkA2.fss`, and `SkA2g1` to `SkA2g7`, one group each, for the old code)

| value | old | new |
|---|---|---|
| `a[:]`, `w[0,0]`, `w[1,2]` (11, 23) | 'java.lang.ArrayIndexOutOfBoundsException: Index 10 out of bounds for length 6' | 11, 23 |
| `v = a[(1,3)#(2,2)]`, `v[0,0]`, `v[1,1]` (12, 23); `v[(0,1)#(2,1)]` (13, 23); `v[:,1]` (13, 23) | 'Index 10 out of bounds for length 6' | 12, 23; 13, 23; 13, 23 |
| `a[2,:]`, `r[0]`, `r[2]` (21, 23) | 'Index 10 out of bounds for length 6' | 21, 23 |
| `c = a[:,3]`, `c[0]`, `c[1]` (12, 22); `c[1] := 99` then `a[2,3]` (99) | 'Index 9 out of bounds for length 6' | 12, 22; 99 |
| `a.shift((5,5))`, `s[5,5]`, `s[6,7]` (11, 23) | 'Index 10 out of bounds for length 6' | 11, 23 |
| `a.t()`, `t[2,1]`, `t[4,2]` (11, 23); `t[(3,1)#(2,2)]`, `u[0,0]`, `u[1,1]` (12, 23) | 11, 23; then 'Index 10 out of bounds for length 6' | 11, 23; 12, 23 |
| 0-based `Array2` and an `array2[\RR64,2,2\]` matrix: column, range and whole subscripts | 22, 23, 23; 4.0 | 22, 23, 23; 4.0 |

### 3.2 `Array3` based at (1,2,3), 2 by 2 by 2, `100(i+1) + 10(j+1) + (k+1)` (`SkA3.fss`; `SkA3g1` to `SkA3g4`)

| value | old | new |
|---|---|---|
| `s = a[(1,2,3)#(2,2,2)]` (111, 222); `s[(1,0,1)#(1,2,1)]` (222, 212) | 'Index 18 out of bounds for length 8' | 111, 222; 222, 212 |
| `a[:]` (111, 212); a write through it, `a[2,3,4]` (999) | '([0,1] BY [0,1] BY [0,1]) left outside bounds ([1,2] BY [2,3] BY [3,4])', caught: 'A3 whole raised' | 111, 212; 999 |
| `a.shift((5,5,5))` (111, 222); its slice `(5,6,5)#(2,1,2)` (222, 121) | 'Index 18 out of bounds for length 8' | 111, 222; 222, 121 |
| 0-based `Array3`, range and whole subscripts | 222, 212 | 222, 212 |

The old code's Java `ArrayIndexOutOfBoundsException` ends the run; no Fortress `catch` sees it (`interpreter.md`, "Natives").

### 3.3 The shift of a view: NEW-N-2's other faces (`SkN2g1` to `SkN2g4`, `SkN2w`)

On a 0-based 2 by 3 `Array2` `m`, the same on the old code and the new:

    (m[:,1]).shift(5)           Caused by: java.lang.ArrayIndexOutOfBoundsException: Index -11 out of bounds for length 6
    (m[(0,1)#(2,2)]).shift((3,3)) Caused by: java.lang.ArrayIndexOutOfBoundsException: Index -7 out of bounds for length 6
    (m[1,:]).shift(7)           Caused by: java.lang.ArrayIndexOutOfBoundsException: Index -2 out of bounds for length 6
    (m.shift((1,1))).shift((4,4)) Caused by: java.lang.ArrayIndexOutOfBoundsException: Index -7 out of bounds for length 6

`Array1.shift` of a `Col` or `Row` (`Library/FortressLibrary.fss:2436-2441`) and `Array2.shift` of a `SubArray2` (`:2715-2722`) call `SubArray2.subarray` with an output base above zero, and `index(on0 - bo0, on1 - bo1)` (`:2816`) goes negative. The workaround holds on both: `(m[:,1]).copy().shift(5)` gives 12 and 22, `(m[(0,1)#(2,2)]).copy().shift((3,3))` gives 12 and 23.

### 3.4 Lists, and the compiled path (`SkList.fss`, `CNe.fss`, `CArr.fss`, `CList.fss`)

Under walk every line is the same on the old code and the new, at 1 and 4 threads: 'L1 strings = true =/= false', 'L3 empty = true =/= false', 'L4 unwritten = true =/= false', 'L5 ZZ32 < true CMP LessThan', 'L6 RR64 < true' (row 774), 'L7 mixed = false', 'L8 list of P = false list of Q = true', 'L9 pair =/= false', 'L10 typecase list of RR64 Equality', 'L11 assert and deny passed', 'L12 P =/= true Q =/= false'. So the `Equality` line moves no value today, as the report says.

'L8' shows NEW-N-1's mechanism inside `List`'s own `=` too: a list of an object whose `=` comes from no `FortressLibrary` trait compares its elements by identity, on both codes, and a list of an object that extends `Equality` compares them by its `=`. This is no new defect of the rung, and the specification does not plainly settle it: `List`'s element-wise `=` is generic code over an unbounded `E`. It bears on the curator's question on NEW-N-1's repair (forCurator).

On the compiled path, `bin/fortress compile` gives the same refusals on the old code and the new: `CNe` ('Could not check call to operator NE' ... '(String, String)->Boolean is not applicable to an argument of type (P, P).'), `CArr` ('Function __builtinFactory2 is not defined.'), `CList` ('ZeroIndexed is undefined.' at `List.fsi:67:36-45`, then 'LexicographicOrder is undefined.' at `:68:27-43`). So both defects and both repairs are walk only, and the `Equality` entry adds no error before the compiled path's first ones.

### 3.5 The failure-mode question

The rung turns loud failures into values: Java's `ArrayIndexOutOfBoundsException`, which ends the run, and `Array3`'s `IndexOutOfBounds` from `a[:]`. Each value is the specification's: "The implicit range : is treated as l:u" (`ranges.tex`, section "Ranges") and "the subarray starting at (o0,o1) in the original array" (`Library/FortressLibrary.fsi:1712-1717`). A subscript outside the bounds still raises, before the view is made (`narrowToRange`, `:2731`, `:3133`, unchanged). No quiet wrong value was found.

## 4. The corrections

- **`944901606`, a test's messages.** `ProjectFortress/tests/ListEqualityElementwise.fss:11`, `:18`, `:24` cited "opr-overview.tex, the sentence on e =/= e'" with no section; they now name subsection "GCD, LCM, and CHOOSE Operators", as `XXXNotEqualOwnEquality` does (the brief's check 5; `tests-writing.md`, "Names, comments, citations"). No assertion changed. The guard through the harness, head: '# harness-one 2026-10-23T16:22:52Z; tree eb6fd53d7', 'PASS', 'OK (1 test)'; old code (the base build's `harness-one.sh`): 'tree aa5ff2423', 'PASS', 'OK (1 test)'.
- **`3063446e1`, the record's row drafts.** NEW-N-2's claim said only that a slice of a shifted `Array2` reads the wrong elements; section 3.3 measured that a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`, from the same line `:2816`. The row draft, finding 3 and the FACTS entry now say so, the claim cut to the template's 300 characters and the workaround naming `copy()`. NEW-N-1's row now says that the compiled path refuses `P(1) =/= P(1)` (section 3.4), as `SKILL.md` asks a row to say which paths show the defect. `ledger.py check --rows` on both: '1 rows, 0 fail the template'.
- The first commit, `eb6fd53d7`, carries a co-author line with the tier's name in place of the skill's plain `Co-Authored-By: Claude <noreply@anthropic.com>`; it is pushed, and no force-push was made to change it. The later commits carry the skill's footer.

## 5. Points to report

- The two promotions, before and after: 'FAIL: a Int: 22 =/= a Int: 11' and 'FAIL: a Int: 222 =/= a Int: 111' on the base (call `oULF5j`); 'OK' in `ant testSystem` on `582a91f26`.
- The new rows and their tests: NEW-N-1 with `ProjectFortress/tests/XXXNotEqualOwnEquality.fss:12-13`; NEW-N-2 with `ProjectFortress/tests/XXXArray2ShiftedSlice.fss:9-16`.
- The stock tables: count `#total 3`, distance 'DISTANCE SAME   5', no site came (section 1, item 1).
- The count stage's seconds: 83 s, under `nice -n 19`.
- Walk values that move beyond the two promotions: the worker's (REPORT.md section 5), and from section 3: on an `Array2` or `Array3` based above zero, the whole subscript, a slice of a slice, a column of a slice, a write through a view, a shift, and a transposed slice, each from Java's `ArrayIndexOutOfBoundsException` (or `Array3`'s `IndexOutOfBounds`) to the right elements. No test or specification example changes its verdict.
- Sentences made false: none. Edited: `Specification/basic/operators/opr-overview.tex:296-301`, `Specification/advanced-lib/algebraic-constraints.tex:523-528`, `Specification/appendices/changes.tex:160-161`, `:174-177`, `:209-211`, `:266-270`.
- Files beyond those named: `Specification/appendices/changes.tex`; `ProjectFortress/tests/XXXArray2ShiftedSlice.fss`.

None holds the push.
