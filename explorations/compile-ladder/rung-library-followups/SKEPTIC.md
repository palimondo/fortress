# Climb batch 14, rung L (`rung-library-followups`): the skeptic's check

Head judged: 313541641, the worker's code commit on `wip/rung-library-followups`, cut from 5bf8a7c84. My commits follow it: 9b377a5a1 (the worker's REPORT.md and record.md, written byte for byte from the run's journal, since the harness had refused the worker's write), 79fb25581, 6f3b9db5f, 2f32617db (the corrections below), and this file. None of my commits edits library code, the checker or walk, so nothing was built, and no count, distance or suite was run after them. The count and distance tables in REPORT.md section 5 are those of the worker's head, 313541641.

Verdict: **approved**. The change does what the section asks, in the library's own shapes, and holds `body(i)` by the section's own rule. My corrections add a test and record lines; none is contested.

## 1. The stage: the test of `:2525` and `:688`

- The count's table on 313541641 is byte-equal to 13b's landed one. `diff explorations/compile-ladder/climb-batch-13b/gate/checker-count.txt tmp/rung-library-followups/checker-count-postedit.txt` prints nothing; the table reads `#total 1`, `#locations 1`, `#crash none`. The worker's wrapper log reads `RC=0`, `SECONDS=303`, so 303 s against the stage's 900 s limit. The run's error is still `body(i)`, moved by the three `numerator` lines: `Library/FortressLibrary.fss:1314:10:` / `Missing parameter type for i`.
- `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-13b/gate/distance.txt tmp/rung-library-followups/distance-postedit.txt` prints what the report says:

      DISTANCE DOWN   85 -> 82 (-3)
          class S1                     29 -> 28     (-1)  self type: a generic trait's self is not its type parameter
          class BR                      4 -> 3      (-1)  big operators: ...
          class OT                     16 -> 15     (-1)  other body errors (one-off library slips and checker limits)

- By row, with my own line map of `git diff -U0 5bf8a7c84 313541641 -- Library/FortressLibrary.fss Library/FortressLibrary.fsi` (a script of mine under the worktree's `tmp/`), the per-site list `explorations/compile-ladder/gate/distance-sites.tsv` against the worker's post-edit `errors.tsv`: three sites gone, none new, 85 to 82.

      GONE ('typecheck', 'FortressLibrary.fss:130', 'Function body has type TotalComparison, but declared return type is BigReduction[\\TotalComparison,TotalComparison\\].')
      GONE ('typecheck', 'FortressLibrary.fss:2525', 'Function body has type OR((ZZ32, ZZ32),()), but declared return type is (ZZ32, ZZ32).')
      GONE ('typecheck', 'FortressLibrary.fss:688', 'Right-hand side has type Integral[\\I\\], but declared type is ZZ.')

  `:130` (`BIG LEXICO(g)`) is untouched, a move inside F-53's 2 to 4 (row 488), and it is listed as a point to report, as the section asks.
- The two runs used the head's code: the count started at 01:01:19Z and the distance at 01:06:49Z, after the commit at 01:01:10Z, with no edit between (transcript calls `wv8bAn`, `w3sNgv`, `jz2vFp`). The distance's log ended at 01:32:53Z, before the worker's last probe edit, written at 01:33:33Z and restored in the same call (`UzqkQ3`).

## 2. Test first, read in the transcript

- `IntMapSymdiffSingleton` failed through the harness on the base's library at 00:57:29Z (`F8EDjU`). The tests were the only change then (`git status`: the three test files). The first library edit came at 00:57:51Z (`epJ5AG`, the `body(i: I)` probe, restored at 00:59:05Z), and the repairs at 00:59:33Z and later:

      . interpret tmp/rung-library-followups/h1/tests/IntMapSymdiffSingleton
      FAIL: { {2 |-> 2} U4 {5 |-> 5} } =/= { { { {0 |-> 0} U1 {1 |-> 1} } U2 {2 |-> 2} } U4 {5 |-> 5} }; a many-entry map SYMDIFF a one-entry map on another key holds all four entries
      Tests run: 3,  Failures: 1,  Errors: 0

- It passed at 01:00:15Z (`9f8A7p`), after the last edit of code (01:00:08Z, `EDiMGx`), together with `IntMapTest`, `IntMapCombine` and `RationalTest`: `OK (6 tests)`. `ant testSystem` ran on 313541641 (`zEk1Md`): shards 142, 143, 147 and 150, 0 failures, `BUILD SUCCESSFUL`, 582 tests, 13b's 580 (`146+149+141+144`, `explorations/compile-ladder/climb-batch-13b/gate/summary.txt`) plus the rung's two new files.
- `NumeratorPerType` and `Array2SubscriptInBounds` pass on the base and on the head, as the section expects. The stage is their sites' test.

## 3. The diff against the section and the decisions

- Array2's `offset` (`Library/FortressLibrary.fss:2528-2535`) is Array1's statement form (`:2241-2245`); Array3's (`:2933-2940`) is the same shape. `oops(` is called at these three `offset`s only (`grep -n "oops(" Library/*.fss ProjectFortress/LibraryBuiltin/*.fss`). No other site of the distance has `()` in a union (`grep -n "OR(" explorations/compile-ladder/gate/distance-sites.tsv`).
- `numerator` follows `explorations/reviews/self-typed-bodies-judgement.md`, ":685, shape C, apart", word for word. Integral's default is gone (`:688`). Four bodies `numerator(self): ZZ = do z: ZZ = self; z end` (`:812`, `:905`, `:985`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:470`) and four api lines (`Library/FortressLibrary.fsi:527`, `:580`, `:638`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:170`) are in ZZ's form (`Library/FortressLibrary.fsi:675`). `AnyIntegral` comprises exactly `ZZ`, `ZZ64`, `ZZ32`, `NN64` and `NN32` (`Library/FortressLibrary.fss:675`). Every object below them reaches a body: `Int`, `Long`, `UnsignedLong`, `NN32` and `BigNum` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:367`, `:376`, `:385`, `:473`, `:563`). No other object in the library, the test folders or `SpecData` extends an integer type or `Integral` (a `grep -rnE` of `extends` clauses). P-146's sentence, "the thirtieth takes one `numerator` per integer type", is met, and no self type or `comprises` clause was added.
- IntMap (`Library/IntMap.fss:570-572`) is the singleton map's own `SYMDIFF` (`:361-363`) with the roles exchanged, and has the shape of the node map's `union` with a singleton (`:528-534`). P-27 holds.
- `body(i)` was written, run and held, by the section's rule: "If walk refuses a call at body's parameter, do not land the line". The refusal is quoted in REPORT.md section 2, `:44` and `:56`.

## 4. My programs, the differential

Each ran under walk on the old code (`/home/user/fortress-base14/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base14 /home/user/fortress-followups/tmp/old-caches P.fss`) and on the head (`bin/fortress P.fss`), and was compiled on both. Programs under `tmp/rung-library-followups/skeptic/`, not in git.

- `SkSymdiff` (a node map against singletons at its ends, between its keys, beyond them and below them, against an empty map, and against another node map). Old, then new:

      old: big5 SYMDIFF s0 = {} size 0                         new: { 3 |-> 1, 6 |-> 2, 9 |-> 3, 12 |-> 4, 15 |-> 5 } size 5
      old: big5 SYMDIFF s7 = { 6 |-> 2, 7 |-> 107 } size 2      new: { 0 |-> 0, 3 |-> 1, 6 |-> 2, 7 |-> 107, 9 |-> 3, 12 |-> 4, 15 |-> 5 } size 7
      old: other SYMDIFF big5 = { 0 |-> 0, 9 |-> 3, 12 |-> 4, 15 |-> 5 } size 4
      new: other SYMDIFF big5 = { 0 |-> 0, 2 |-> 52, 4 |-> 54, 5 |-> 55, 7 |-> 57, 9 |-> 3, 12 |-> 4, 15 |-> 5 } size 8
      old: eq checks false false false                          new: eq checks true true true

  The last line compares each node-singleton result with its reverse order. The new output is identical at `FORTRESS_THREADS=1` and `=4` (`diff` prints nothing). The third line is a finding (fix 1): a SYMDIFF of two many-entry maps was wrong in one order on the base, through `nodeNode`, and no test of the rung asserts it.
- `SkSetOps`: `UNION`, `INTERSECTION`, `DIFFERENCE` and `union(f, ...)` of a node map with a singleton and with a node map, both orders. Each answers its comment, for example `s6 UNION big5 = { ..., 6 |-> 106, ... }` and `big5.union(f, s6) = { ..., 6 |-> 2106, ... }`.
- `SkUplus`, `SkUplus2`, `SkCatch`: `UPLUS` on old and new alike (the rung does not touch it):

      three UPLUS one = { 0 |-> 0, 1 |-> 1, 2 |-> 2 }
      one UPLUS three threw IntMap.KeyOverlap: 1 |-> 1 and |-> 9
      big5 UPLUS other threw IntMap.KeyOverlap: 3 |-> 53 and |-> 1
      other UPLUS big5 = { 0 |-> 0, 2 |-> 52, 3 |-> 53, 4 |-> 54, 5 |-> 55, 6 |-> 56, 7 |-> 57, 9 |-> 3, 12 |-> 4, 15 |-> 5 }

  This is a sibling of row 671 in the file the rung edits (fix 2). `catch e KeyOverlap[\ZZ32\]` does not take it: `one UPLUS three: not a KeyOverlap[ZZ32], caught as UncheckedException`, since walk throws `KeyOverlap[\Int\]` (row 364's mechanism).
- `SkNumerator`: `numerator` and `denominator` at each type's extremes (`ZZ32` min and max, a `ZZ64` near its min, `NN32` and `NN64` max, a 93-bit `ZZ`), through a generic `[\I extends Integral[\I\]\]` function, and `opr /`. The old and new outputs are identical (`diff` prints nothing), for example `NN64 max 18446744073709551615 -> 18446744073709551615 ZZ den 1` and `generic ZZ32 -2147483648 NN64 18446744073709551615 ZZ64 -9223372028264841219`.
- `SkArray2Dim1`, `SkArray2Dim2`, `SkArray2Both`, `SkArray2Par`: `offset` out of bounds in each dimension, in both (dimension 1 is reported first), through a subarray based at `(1,1)`, and a 40-by-30 array filled in a parallel loop. The old and new outputs are identical, for example `FAIL: Index of dimension 2 out of bounds; got 3 which is not in 0#3` and `sum 2357400 corner 3929 col 3929 row 3929`, at `FORTRESS_THREADS=1` and `=4`. The repair turns no failure into a value.
- The compiled path does not reach the walk library. `fortress compile` refuses each program the same way on old and new: `Integral is undefined.`, `Comprehension is undefined.` (`Library/IntMap.fsi:86`), `Function array is not defined.`

## 5. Fixes

1. **79fb25581, correction (test).** Finding: the repair of `Library/IntMap.fss:570-572` also changes a SYMDIFF of two many-entry maps whose `nodeNode` split reaches a node map and a singleton. On the base, keys 2 to 7 SYMDIFF keys 0, 3, ..., 15 held 4 entries, the reverse order 8. No test asserted it. Settled by the section: "The repair answers what the library's comment says, 'the key/value mappings contained in exactly one input map' (:360)". The new test `ProjectFortress/tests/IntMapSymdiffManyEntry.fss` was run through the base build's harness (`FORTRESS_HOME=/home/user/fortress-base14 /home/user/fortress-base14/explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-followups/tmp/rung-library-followups/skeptic/old-harness /home/user/fortress-followups/ProjectFortress/tests/IntMapSymdiffManyEntry.fss /home/user/fortress-followups/ProjectFortress/tests/IntMapUplusSingleton.fss`, tree 5bf8a7c84):

       FAIL: { {0 |-> 0} U8 { {9 |-> 3} U12 { {12 |-> 4} U14 {15 |-> 5} } } } =/= { ... }; keys 2 to 7 SYMDIFF keys 0, 3, ..., 15 holds the keys of exactly one map
       Tests run: 2,  Failures: 1,  Errors: 0

   On the head (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-library-followups/skeptic/h1 ProjectFortress/tests/IntMapSymdiffManyEntry.fss ProjectFortress/tests/IntMapUplusSingleton.fss ProjectFortress/tests/IntMapSymdiffSingleton.fss`, tree 9b377a5a1): `OK (3 tests)`.
2. **6f3b9db5f, correction (home-3 test and row).** Finding: NodeIM's `opr UPLUS(self, other: SingletonIM[\Val\]) = self.add(other)` (`Library/IntMap.fss:520`, the team's `:494` at a874948ac) throws no `KeyOverlap` on a shared key. The library's comment (`:517-518`) says it throws, and the reverse order does (`:340`). The rung leaves it as it was. The specification is silent on IntMap, as for row 671, so the defect gets row 671's home before its repair: `ProjectFortress/tests/IntMapUplusSingleton.fss` pins today's value ("today's value: ..."), and row NEW-L-2 in record.md (linted, 0 fail the template). The test passes on the base (`OK` in the run above) and on the head (`OK (3 tests)`), as a home-3 test does. Settled by the skill's `tests-writing.md`, "How a defect is recorded", way 3: "It is deferred, and the specification is silent ... a test that asserts today's behaviour, and a row in the gap ledger." Its repair is put to the curator.
3. **2f32617db, correction (record).** record.md's Revival change, row 671's close line, and one sentence of REPORT.md section 1 now say that the repair reaches two many-entry maps (fix 1). NEW-L-1's claim said an unwritten map comprehension instantiates `I` at `BottomType`. Walk gives it `(ZZ64,BOTTOM)` (REPORT.md `:56`), so the claim now says "`BottomType` or a pair holding it" (292 characters, 0 fail the template).

Contested: none.

## 6. The rest of the checks

- Tests' form: each file has one comment line, is named by its topic, and cites the specification by file, section and entry (`NumeratorPerType`: `basic-integers.tex, section "Integers", numerator and denominator`). The section exists (`Specification/basic-lib/basic-integers.tex:13`) and says "For finite integers, the method numerator returns the argument and the method denominator returns 1." (`:667-668`).
- Report: every provenance and section citation I opened with `sed -n` says what the report claims. Among them: `checker-count.txt:14` `#total 1`; `distance.txt:28` the `:1309` crash row; `distance-sites.tsv:61` and `:78`; `PreDisambiguationDesugaringVisitor.java:405-408`; `EvaluatorBase.java:170`, `:181`; `Functionals.scala:1141-1147`; `XXXComprisesGenericChildAcrossComponents.fss:6`; `zeno.fss:52`; `changes.tex:890-891`; `IntMap.fss:544-545` at a874948ac; and row 678's note's `:2659`, `object SubArray2`. No sentence of the specification is made false: the rung edits no `.tex`, and `basic-integers.tex:667-668` stays true.
- Names: `NumeratorPerType`, `Array2SubscriptInBounds`, `isZZ`, `IntMapSymdiffManyEntry`, `IntMapUplusSingleton` occur only in their own files. The locals (`evens`, `four`, `seven`, `thirds`, `middle`, `both`, `all4`) and my helper `overlap` name no api declaration of the library (`grep -rnw` over `Library/*.fsi` and `ProjectFortress/LibraryBuiltin/*.fsi`). Beside the library, `numerator` is `zeno.fss`'s dotted getter and a Java field of `FloatLiteralExpr`, neither a competitor.
- Failure modes: the rung turns no loud failure into a value (section 4).
- Where I differ from the worker's account: nowhere on its decisions. Its report missed one effect of its own repair, now recorded (fixes 1 and 3).
