# Rung R of climb batch 9: the skeptic's first judgement

Verdict: **approved, with required corrections.** Judged head: `702e6205817a87259b1380fba63b128a21a06774` (branch `wip/rung-range-meets`, base `fa14a190c`).

The change does what the report says. Every repaired declaration I called under walk answers the value its elements give, and the before and after tables are the worker's, read and compared. Four things are wrong or missing:
- one sibling defect of row 503's family has no home (section 5, finding 1);
- row 583's device changes a value walk prints, which the report does not name (finding 2);
- the report's account of its development checks is false (finding 3);
- the promoted `RangeTupleShiftWalk.fss` keeps a ledger row and a wrong api line in its messages (finding 4).

None of these is a ground to refuse under the rule for this judgement. Each has a correction, a recommended row or a point for Pavol below.

## 1. What I read and what I ran

- The briefing slice (check 1): POSITIONS "The library's own practice is the standard", "The static-parameter sentence goes (answer 9)", "The exclusion rule stays and the tower is flat", "Scalar ranges are over `ZZ32` only"; ledger rows 580, 583, 586; PLAN's batch 8 row; the batch 8 review, section 1; P2, section 2; `Specification/advanced/overloading.tex`, section "Meet Rule"; `BoundedRange` and `SimpleMappedIndexed`.
- The worker's transcript (`agent-a6d93f1f8f964b3a0.jsonl`), by its tool calls and their results.
- The diff `fa14a190c...702e62058`, line by line.
- My own walk programs, run with the rung's tree and in the rung's private copy of the base, `/home/user/fortress-ranges-base`. One compiled program was run with the rung's tree. Programs and outputs are under `tmp/rung-range-meets/skeptic/`.
- Nothing was built, and neither stage nor any suite was run.

## 2. The checks

**Check 2, provenance.** I opened every line the block cites, and each says what the block says:
- `distance-sites.tsv:26` is BoundedScalarRange's CAP pair, and `checker-count.txt:9` is `RangeInternals 102`.
- `overloading.tex:469` opens the Meet Rule for Functional Methods; `ranges.tex:131`, `:138` and `:140` cover membership, intersection and size.
- `RangeInternals.fsi:426` at the head and `:400` at the base are CompactFullScalarRange's `IN`.
- `FortressLibrary.fsi:1014` is Nothing's `SQCAP`. `FortressLibrary.fss:3567` is SimpleMappedIndexed and `:4043` is `openRange`.
- `RangeInternals.fss:631` is the meet whose body at `:632` is the cast, `FortressLibrary.fsi:2396` the new object, and `Random.fss:373` the new `min`.
- The `historical:` line names the five files of the 2012 tree that the diff edits.

I also spot-checked 28 citations of section 1.1. All hold.

**Check 3, the failure and the pass.**
- Test-first order: f10b6dbc4 holds row 586's promoted test alone. At 21:49:26, `harness-one.sh` on fa14a190c printed "Cannot find definition for method lower given receiver StridedFullParScalarRange" and "Tests run: 1, Failures: 1". Commit 0ea0c916b holds the other three test files alone. At 22:11:19 the harness gave "Tests run: 4, Failures: 3": RangeDeclarations passes, and the other three stop at `RangeInternals.fss:874`, `:637` and `Random.fss:373`.
- No library edit precedes 22:14:28. The edit was committed as 702e62058 at 22:24:31.
- The count's after table was written at 22:36:03. The worker ran `git status --short` first, and it printed nothing, on head `702e62058`.
- The distance stage started at 22:38:49 on the same head.
- `diff climb-batch-8/gate/checker-count.txt tmp/rung-range-meets/checker-count-postedit.txt` gives FortressLibrary 10 to 2, RangeInternals 102 to 0, `#total` 56 to 1 and `#locations` 18 to 2. `#crash` stays `none`, as the report says.
- I ran `compare.sh` on `climb-batch-8/gate/distance.txt` against `tmp/rung-range-meets/distance-postedit.txt`. It prints "DISTANCE DOWN 565 -> 416 (-149)", with the kind, class and unit rows exactly as REPORT section 4 gives them.
- `git log 6416d216f..fa14a190c -- Library/ ProjectFortress/src/ ProjectFortress/LibraryBuiltin/` prints nothing, so the landed tables were the right before.

**Check 4, the diff.** It does what sections 1.1 to 1.5 say, and nothing outside the five library files and the four tests. The cast in the six rank-2/3 `CAP` bodies is safe on every uniform combination. `combine2D(ScalarRange, ScalarRange)` already `fail`s on a mixed one (`RangeInternals.fss:167-168`), and every uniform `combine2D` of bounded scalar ranges answers a `BoundedRange`.

**Check 5, precedent.** The precedents named are the right ones, and I checked each against the tree. The count of sibling sites missed one: section 5, finding 1.

**Check 6, the tests.**
- Every RangeBodiesWalk assertion fails on the base on its own, not only the first. In the base copy, `(3:5).indices` and `(0:6:2).indices` stop with "Unification error ... got arg FnExpr ... ZZ32->(ZZ32,ZZ32)" at `:965` and `:1133`. `seq(seq(0:6:2))` stops with "The number of parameters (3) does not match with the number of arguments (2)" at `:1255`. The flips, subscripts and bounds stop at `:874`, `:919`, `:885` and `:1096` (probes P_s16 to P_s26, `old.txt`).
- RangeDeclarations passes before and after. It pins values, and its specification citations name `ranges.tex`, section "Ranges", whose text says what each message says.
- RangeTupleShiftWalk does not meet the message rule: finding 4.

**Check 7, competing declarations.** `SimpleMappedSeqIndexed` appears only in the four library files the rung edits. The search covered `ProjectFortress/` and `Library/` for `.fss`, `.fsi`, `.java`, `.scala` and `.test`. Each of the four test names appears only in its own file. `inOrder` is also a local function at `Library/PrefixMap.fss:230` and a test-local function in two other tests, and conflicts with none.

**Check 9, the homes.**
- Home 1 holds for every repaired body that stopped walk. The 97 pairs' home is the stage, as the manifest's `testIsStage` sets.
- Rows 587, 588 and 589 are home 3: rows alone or pinned values. The specification is silent on ranges of rank 2 and 3, and on comparison of an index type parameter (`ranges.tex`, section "Ranges", describes neither).
- My finding 1 has no home in the rung. Its home is 2, and it is recommended below.

**Check 10.**
- The count: the table's `#total` is 1, and REPORT section 4 and the structured report both say 1. `expectedCheckerCount` is 1 and the crash line stays `none`.
- The distance stage's crash rows are the same two `TraitDecl` rows, moved one line down by Just's new `SQCAP` at `FortressLibrary.fss:1506`: `:2473` to `:2474` and `:2846` to `:2847`. `compare.sh` prints them as "crash gone" and "crash new". The gather should read them as moved, not new. Rung S's edits to the strings sections will move them again.

**Check 11, ledger and siblings.**
- Row 503: the six shifts are repaired, but the rank-3 strided range has none at all (finding 1).
- Row 424 accounts for the two pre-existing failures I met in passing, on base and edit alike. `BIG +[x <- (0#4).map(f)] x` stops with "Unification error: Closure/Constructor for join param 1 (a:BOTTOM)" at `RangeInternals.fss:1066` (`:998` at the base). The sequential form ends in a `CastError` at `FortressLibrary.fss:36`.
- Row 479: `3 IN (0#5)` and its siblings are false on the compiled run. It is gated by `compiler_tests/XXXRangeInRungJ.fss`.

**Check 12, decisions on record.**
- The landed text follows "The library's own practice is the standard" for every device but one: row 583's object is not a `MappedGenerator`, as both of its library twins are (finding 2; decision 4 names this way and the reason).
- "Scalar ranges are over `ZZ32` only": the public traits stay generic. `FullRange[\I\]`'s new `IN` is generic, and the comparisons on `I` are left for him (row 588).
- No `excludes` clause is added, so no device states an exclusion false of a library type.

## 3. Differentials

Run with `tmp/rung-range-meets/skeptic/runeach.sh <tree> <dir> <out>`: walk, `FORTRESS_THREADS=1`, one program per probe. Each probe set was run with `/home/user/fortress-ranges` and with `/home/user/fortress-ranges-base`, giving `new*.txt` and `old*.txt`. There were 105 probes in all.

| program (walk) | head | base | verdict |
|---|---|---|---|
| 21 scalar, rank-2 and rank-3 `CAP` calls, incl. left with open, right with extent, strided with open and mixed strides (P_c01 to P_c19) | e.g. `CompactFullRange2D(3,3, 5,5)` for `(:(5,5)) CAP (#(3,3))` | same, every one | unchanged |
| 14 `IN` calls on open, extent, left, compact and strided ranges of rank 1 to 3 (P_in01 to P_in04) | `true true true false` ... | same | unchanged |
| `Just(3) SQCAP NotUnique`, `Nothing SQCAP Just(3)`, through `Maybe` (P_sq1 to P_sq4) | `Just(3)`, `Nothing`, `Nothing` | same | unchanged |
| `((0,0):(10,10))[((0,0):(4,4)):(2,2)]`, `(((0,0):(10,10)):(2,2))[(1,1)#]`, `((0,0,0):(9,9,9))[((1,1,1):(7,7,7)):(3,3,3)]` | `StridedFullRange2D(0,0, 4,4, 2,2)`, `(2,2, 10,10, 2,2)`, `StridedFullRange3D(1,1,1, 7,7,7, 3,3,3)` | stops: "number of parameters (6) does not match ... (4)" at `:885`, `:1096` | repaired; values checked by hand |
| 3D flip, strided 2D/3D flip, `bounds` of compact and strided 3D | `StridedFullRange3D(1,1,1, 0,0,0, -1,-1,-1)`, `CompactFullRange3D(0,0,0, 2,2,2)` ... | stops at `:874`, `:919`, `:1096` | repaired |
| `UniformDistribution` over `2:9:3`, `(9:2):(-3)`, `5:5:2`, strided 3D, `seq(3:7)`, compact 2D | `Just(2) Just(8)`, `Just(3) Just(9)`, `Just(5) Just(5)`, `Just((0,0,0)) Just((4,4,4))`, `Just(3) Just(7)`, `Just((0,0)) Just((2,3))` | strided ones stop at `Random.fss:374`; compact the same | repaired. Twelve draws over `2:9:3` and `(9:2):(-3)` are `2,2,8,5,5,2,5,8,8,8,5,5,` and `9,9,3,6,6,9,6,3,3,3,6,6,`, unchanged, inside min and max |
| the mapped sequential ranges' `[i]`, `[r]`, `|_|`, `bounds`, `indices`, `indexValuePairs`, `ivmap` (P_ms01 to P_ms13) | `4`, `mapped(4,9,16)`, `4`, `CompactFullParScalarRange(0,2)`, `mapped(seq(0,1,2,3))`, `mapped(seq((0,4),(1,9),(2,16)))`, `mapped(seq(0,12,24,36))` | stop: "Cannot find definition for method ... given receiver SimpleMappedSeqGenerator" | new capability, values right |
| `seq(0#4).map(f).reverse.asString`, `seq(0:6:2).map(f).reverse.asString` (P_ms15, P_rv4, P_rv6) | `SimpleReversedIndexed(mapped(seq(1,3,5,7)))` | `mapped(7,5,3,1)` | **a printed value changed** (finding 2) |
| `"-".join` of the same, and a `for` loop over it (P_rv8, P_rv1, P_rv5) | `6-4-2-0`, `0,2,4,6,`, `6,4,2,0,` | same | elements and order unchanged |
| `seq(0#4).map(f).g` (P_rv7) | stops: "Cannot find definition for method g given receiver SimpleMappedSeqIndexed" | `seq(0,1,2,3)` | ill-typed by both apis (`map` answers a `SequentialGenerator` or the new object, neither has `g`); walk-only |
| `(::2).indexOf(4)`, `(::(1,1)).indexOf((1,1))` under `try ... catch e FailCalled` | "caught FailCalled" | uncatchable "Cannot find definition for method indexOf given receiver OpenScalarRange" | loud to loud, now catchable (decision 6) |
| `(((0,0,0):(4,4,4)):(2,2,2)).shiftLeft((1,1,1))` and `shiftRight` (P_sh01, P_sh05) | `InterpreterBug: ** bug! MethodClosure shiftLeft(amount:I):Range[\I\]/Library/FortressLibrary.fss:3831:5-82 has neither body nor def instanceof Method` | the same at `:3830` | **finding 1**, unrepaired sibling |
| zero strides `(2#).every(0)`, `(0:5):0`, `((0,0):(5,5)):(0,1)` | `FAIL: ...: Zero stride` | same | the factories' rewritten `check()` stays loud |
| `|#(0,3)|`, `|#(3,0)|`, `|#(0,0,2)|` | `1 1 0` | same | row 589, pinned |

Sequential generation, at `FORTRESS_THREADS=4` (`runeach4.sh`, `new-t4.txt` and `old-t4.txt`):
- `for` loops over `seq(0#64).map(f)`, `seq(0:126:2).map(f)` and `seq(0#64).map(f).map(f)` record all 64 elements in order on both trees.
- The parallel control `(0#64).map(f)` records them out of order on both trees: "31,7,30,29,...". So the probe can see disorder, and row 583's device generates in order.

Compiled against walk (`c/SkInCompiled.fss`; `bin/fortress compile` then `run` with the rung's tree, walk with both trees):
- Compiled prints `IN false false false false false`, `seq 0,1,2,3,` and `sum 14`.
- Walk prints `IN true false true true false`, `seq 0,1,2,3,` and `sum 14` with both trees.
- The two paths disagree on `IN`. The specification settles it against the compiled run (`ranges.tex`, section "Ranges": ∈ tests membership). This is row 479, already gated. The rung edits nothing the compiled path links: the compiler library has no `CAP`, no rank-2 range, no `map` on ranges and no `UniformDistribution`, so the other constructs have no compiled side.

## 4. The failure-mode question

Fifteen sites that stopped walk now answer, and so do the mapped sequential ranges' `Indexed` methods:
- `RangeInternals.fss:874`, `:885`, `:919`, `:931`, `:965`, `:1096`, `:1133`, `:1255`, `:637`, `:641`, `:751`, `:755`, `:1328`, `:1332` at fa14a190c;
- `Random.fss:373-374`.

Before, each of these stopped with "Cannot find definition", an InterpreterBug or a unification error. Each value I computed is the one its elements give (section 3).

Three other changes:
- The open and extent ranges' `indexOf` still fails loudly, now catchably.
- One quiet value became another: `seq(r).map(f).reverse.asString` (finding 2).
- One quiet value became a stop, on a program the api refuses: `.g` on a mapped sequential range.

## 5. Findings

1. **A sibling of row 503 has no home.** `StridedFullRange3D` (`Library/RangeInternals.fss:1413-1436` at the head) defines neither `shiftLeft` nor `shiftRight`. Every other range object of rank 2 and 3 defines both, `StridedFullRange2D` among them (`:1399-1406`).
   - `Range[\I\]` leaves them abstract in the component (`Library/FortressLibrary.fss:3831-3832`), but its api declares them without `abstract` (`Library/FortressLibrary.fsi:2188-2189`). The compiled checker reports nothing: the landed per-site list has no `StridedFullRange3D` shift site.
   - Under walk both stop, on the base and the head (P_sh01, P_sh05, quoted above).
   - `Specification/basic/objects.tex`, section "Object Declarations": an object declaration "must define all abstract methods inherited from its supertraits". So this is home 2.
   - The report's sibling search ("a grep of `-amount,` and `+amount,` ... finds no seventh") looked for wrong bodies and not for missing ones.
2. **Row 583's device changes a value walk prints, and the report does not say so.** `SimpleMappedSeqIndexed` (`Library/FortressLibrary.fss:4137-4153`) extends `SequentialGenerator` and `Indexed`, not `MappedGenerator`.
   - So it does not carry `MappedGenerator`'s `reverse`, `reduce`, `g` or `f` (`:3547-3559`). It takes `Indexed`'s `reverse` (`:1834`).
   - `seq(0:6:2).map(fn x => x + 1).reverse.asString` was `mapped(7,5,3,1)` and is now `SimpleReversedIndexed(mapped(seq(1,3,5,7)))`. Its parallel twin `SimpleMappedIndexed`, a `MappedGenerator` (`:3567-3568`), still prints `mapped(6,4,2,0)` for `(0#4).map(f).reverse` (P_rv2).
   - Elements and order are unchanged (P_rv8, P_rv1).
   - REPORT section 1.3 says the object's "bodies are SimpleMappedIndexed's and MappedGenerator's", which is incomplete.
   - This meets the reserved stop of a repair that changes a value walk prints. It is listed under stopsMet.
   - One candidate repair, not built: `getter reverse(): Indexed[\F,I\] = SimpleMappedIndexed[\E,F,I\](g0.reverse, f0)` in the object.
3. **The report misstates its development checks.** REPORT section 4 says the single-component runs were "each on a code state of its own", and decision 8 says "on distinct code states".
   - The transcript shows `dev1` (RangeInternals.fss alone, started 22:17:28 on a tree whose `git diff --stat` read "5 files changed, 236 insertions(+), 78 deletions(-)") and `dev2` (FortressLibrary.fss alone, started 22:24:31). No edit came between them.
   - The commit 702e62058 carries exactly that stat, and the distance stage ran over both components again on it at 22:38:49.
   - Two components were checked twice on one code state: 388 s and 625 s of the box (POSITIONS, "Nothing is built or run twice on the same code.").
4. **`ProjectFortress/tests/RangeTupleShiftWalk.fss`, promoted with only its component line changed, breaks the message rule.**
   - Its one comment line is a provenance path (`(*) explorations/compile-ladder/rung-size-range/REPORT.md`), not what it checks.
   - Its six messages carry a ledger row ("row 503:") and an api line citation ("Library/FortressLibrary.fsi:2132", ":2133").
   - Those lines are `end` and a blank at the head. Range's `shiftLeft` is at `:2188`.
5. For the gather: the distance stage's four crash rows are two rows moved by one line (check 10).

## 6. Required corrections

1. Give `StridedFullRange3D`'s missing shifts their home 2 in this batch. That is `ProjectFortress/tests/XXXStridedRange3DShiftWalk.fss`, asserting:
   - `(((0,0,0):(4,4,4)):(2,2,2)).shiftLeft((1,1,1)).asDebugString` is `"StridedFullRange3D(-1,-1,-1, 3,3,3, 2,2,2)"`;
   - `shiftRight((1,1,1))` is `"StridedFullRange3D(1,1,1, 5,5,5, 2,2,2)"`.

   Its messages cite `objects.tex`, section "Object Declarations". Show it through `harness-one.sh` as an expected failure ("OK Saw expected exception"), and quote that verdict line. Open the recommended row below.
2. `RangeTupleShiftWalk.fss`: replace the comment line with one line saying what it checks (it may name row 503), and drop "row 503:" and the `FortressLibrary.fsi` line from the six messages.
3. REPORT section 1.3 and decision 4: state that `SimpleMappedSeqIndexed` does not carry `MappedGenerator`'s `reverse`, `reduce`, `g` and `f`, and that `seq(r).map(f).reverse.asString` changes as finding 2 shows. Add the stop to the report's stops.
4. REPORT section 4 and decision 8: replace "each on a code state of its own" and "on distinct code states" with what the transcript shows (finding 3).

## 7. Recommended rows

- **`StridedFullRange3D` defines neither `shiftLeft` nor `shiftRight`.** The other range objects of rank 2 and 3 define both (`Library/RangeInternals.fss:1399-1406` for `StridedFullRange2D`). `Range[\I\]` leaves them abstract in the component (`Library/FortressLibrary.fss:3831-3832`), and its api declares them without `abstract` (`Library/FortressLibrary.fsi:2188-2189`), so the compiled checker reports no error for it.
  - Under walk, `(((0,0,0):(4,4,4)):(2,2,2)).shiftLeft((1,1,1))` stops with "InterpreterBug: ** bug! MethodClosure shiftLeft(amount:I):Range[\I\] ... has neither body nor def instanceof Method", and `shiftRight` likewise, on fa14a190c and 702e62058.
  - Status: NEGATIVE-VERIFIED, library bug.
  - Specification: `Specification/basic/objects.tex`, section "Object Declarations".
  - Reproducer: the skeptic's P_sh01 and P_sh05 (`compile-ladder/rung-range-meets/SKEPTIC.md` section 3).
  - Home 2, `XXXStridedRange3DShiftWalk.fss`. The repair is `StridedFullRange2D`'s two bodies with a third component.
- **`SimpleMappedSeqIndexed`, the map of the full sequential ranges since climb batch 9's rung R, is not a `MappedGenerator`.** So its `reverse` is `Indexed`'s, and `seq(0:6:2).map(fn x => x + 1).reverse.asString` prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))` where it printed `mapped(7,5,3,1)`. Its parallel twin `SimpleMappedIndexed` prints `mapped(...)` reversed.
  - Elements and order are the same.
  - Status: NEGATIVE-VERIFIED, library (a device's side effect).
  - Specification: silent on a generator's `asString`. Home 3, a plain test pinning `seq(0#4).map(f).reverse.asString`, or the repair.
  - Reproducer: the skeptic's P_rv2, P_rv4, P_rv6 and P_rv8.
  - The repairs: export `MappedGenerator` and extend it, or declare `MappedGenerator`'s `reverse` on the object as an `Indexed`.

## 8. For Pavol

- Row 583's object is a deviation from the library's two mapped-generator precedents, both `MappedGenerator`s (`Library/FortressLibrary.fss:3567-3568`, `:3587-3588`). It was taken because the api does not export `MappedGenerator` (`ExportChecker.scala:690-691` compares extends clauses). Its cost is finding 2. The choice is his:
  - export `MappedGenerator` from the generators section, which is not rung R's;
  - add `reverse` on the object;
  - accept the new string.
- The rank-2 and rank-3 `CAP` meets rest on `cast` (`Library/RangeInternals.fss:632`, `:664`, `:760`, `:792`, `:949`, `:1009`) where a `BoundedRange2D`/`BoundedRange3D` trait would type them without one and also repair row 587 (REPORT decision 2). This is a design fork the rung settled for him.
- Row 589: repairing `extent2Range` and `extent3Range`'s bounds (`Library/RangeInternals.fss:1513`, `:1522`) changes `|#(0,3)|` from 1 to 0. That is a value change he must allow.
- Row 588: the comparisons on the index type parameter (`Library/RangeInternals.fss:129`, `:133`; `Library/FortressLibrary.fss:3826`, `:3974-3976`). Its three repairs are his choice, under "Scalar ranges are over `ZZ32` only".
