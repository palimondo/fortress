# Skeptic's verdict on rung K of climb batch 28: the checker's four sorts by a partial order (row 929; P-148)

Judged: `wip/rung-checker-partial-order` at `2d3624e9` (code `9dc409c3`; the two later commits are prose). Verdict: **approved**, with three commits of corrections, none contested. The report's count and distance tables are those of the worker's head; no stage ran after my commits, which change no code.

## What I checked

1. **The tables.** The worker's files read: `tmp/rung-checker-partial-order/count/{base,change}.txt` and `checker-count-postedit.txt` (pass), equal to each other and to `compile-ladder/climb-batch-27/gate/checker-count.txt`; `distance-postedit.txt`: `#total 0`, `#crash none`, `#seconds 162 FortressLibrary 104`; its `dist-post/run.txt:762`, `@@TC DECL-OK ObjectDecl .../FortressBuiltin.fss:661:1-773:2 errors=0`. Every stage's `nohup` call started after the last edit of code (04:18:07, the unit test) and its build (04:18:21 to 04:19:03): change 04:20:09, pass 04:29:40, distance 04:38:26, all on `9dc409c3`. `compare.sh`, run again by me:

       $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-27/gate/distance.txt tmp/rung-checker-partial-order/distance-postedit.txt
       DISTANCE SAME   0
           crash gone   decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
           crash gone   stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1

   My own count stage, the base build and the worker's head one after the other in one session (`time nice -n 19 explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`, each in its own tree; nproc 4, Intel Xeon @ 2.10 GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, no other JVM on the machine):

       == base 157323e5 start 06:37:01 load 0.09 ... real 1m32.225s
       == head 2d3624e9 start 06:38:33 load 1.06 ... real 1m36.892s

   The worker's were 92.5 s and 99.6 s: the same size. `diff` of my two tables prints nothing, and my head's table equals the worker's `change.txt`; the two `run.txt` files with each tree's path replaced by `TREE` are equal, and equal to the worker's base and change files.
2. **Test first**, in the worker's transcript (`agent-ac3d402577667cc79.jsonl`): the test failing through `junit.sh base` at 04:13:59 to 04:14:03 (call `XbrfBt`; 'tree 157323e5', 'Comparison method violates its general contract!', 'Tests run: 3,  Failures: 3'), with the class still a draft under `tmp/` and the tree's first edit at 04:14:43 (`2V6WvE`); passing through `junit.sh change` at 04:19:13 (`CbnaJX`, 'OK (3 tests)') after the last edit and build. The base's stack at `Functionals.scala:761` is from `seed3-105.txt`, the worktree's own compile before the edit. The test file is shuffle 105 of the brief's generator with its one comment on line 3: my copy of the generator, `python3 gen.py 105`, differs from it only there.
3. **The diff**, line by line. `minimal` reads the pairs in the base's order and skips identity as the base's `!(d eq c)`; `linear` takes, round by round, the first element of the list that no element left precedes, and the first left on a cycle, the prototype's rule (fork K1, `CLIMB-BATCH-28.md:425`; `plan-28/PROBES.md:49-87`); its `blocker` array never reads `left(n)`, since an element found unblocked is taken at once. Its head is `minimal`'s head where that is not empty, so the tie at `Functionals.scala:831-836` keeps the first minimal candidate (K2, `:426`), and `callType` sorts nothing (K3). The four sites change only as the section says; the error paths (`signalAmbiguity(top ...)`, `numeralTie`'s own filter) read `top` in the base's order.
4. **Where the fix belongs.** The worker's count of the checker's Scala sorts is right. Its sentence that no sort in the tree's Java orders by a partial order was not: `compiler/OverloadSet.java:404` orders a family by specificity with `TopSort.depthFirstArray`, and walk orders a trait's ancestors with `TopSort.breadthFirst` (`interpreter/evaluator/types/FTraitOrObject.java:219`). `useful/TopSort.java` is not the device for the four sites: each entry point throws `CycleInRelation` on a cycle (`:72`, `:126`, `:176`), and its order is depth- or breadth-first, not the list's; K1 gives the class. Corrected in REPORT.md section 4.
5. **The test** exercises the defect at the test's path; its one comment says what it checks; it is named by its topic.
6. **Differential programs** (`tmp/rung-checker-partial-order/skeptic/diff/`, generator `gen.py`), each compiled and run on the rung's build with a private caches copy and on the base build through `old-fortress.sh`, and run under walk on both (`run-all.sh`, `walk-all.sh`). The diff holds no Fortress mutable state: the memo is the checker's own. The compiled runs are at `FORTRESS_THREADS=1`, the harness runs at 4.
   - `SkCallThree1` to `8`, 64 candidates over three chains of four traits, calls at the bottom, inside and at static supertypes: every one compiles and prints `PASS` on both codes, and under walk; none of the eight stops the base.
   - `SkAncestors1` to `6`, a generic call on a value whose static type has 38 ancestors in a 6 by 6 product (the `Formula.scala` site): `PASS` on both codes and under walk.
   - `SkTieTwo1` to `8`, a tie between `f(s: S2)` and `f(t: T)` for an argument of `trait M extends { S2, T } comprises { V }`, with `f(s: S)` less specific than `f(s: S2)`: the rung's code prints `PASS` for all eight; the base's dies for 2 and 7, `SkTieTwo2 old run rc=1 java.lang.NoSuchMethodError`, the call naming `\=f{...fss!15!1-16!1,...fss!23!1-24!1}(SkTieTwo2$S)`, a dispatcher over `f(S2)` (line 15) and `f(S)` (line 23) at `S`, never emitted. Walk prints `PASS`. So on the base TimSort's binary insertion could put the less specific `f(S)` first, the call took it as its arrow, and the compiled run died; the first minimal candidate repairs it. Finding A.
   - `SkTie1` to `6`, the same tie with `X` between the closed traits and its own `comprises { Xa, Xb }`: the rung's code `PASS` for all six, the base's dies for 2 (`NoSuchMethodError`); walk refuses the set at load. `SkCoverOne` isolates that: walk refuses `f(x: P)` beside `f(x: Q)`, 'first parameters x:[Q] and x:[P] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present', and loads `SkCoverFlat` (`P` and `Q` list `Xa` and `Xb` themselves) and `SkCoverDecl` (with `f(x: X)`), both `PASS`; compiled, `SkCoverOne` prints `PASS` on both codes. Finding B, beside the rung.
7. **The homes.** Row 929, home 1 (`PartialOrderCandidatesCompiled`); row 935, home 3, with my evidence added; finding A, home 1, my test; finding B, home 2, my `XXX` test and row 936; `Common.scala:69` and `:82`, noticed by reading, the worker's question for the curator.
8. **The ledger and the siblings.** `ledger-find` on TimSort, sortWith, 'Comparison method', 'partial order', moreSpecific: only rows 929 and 395; `ledger.py find --cites` the three files: row 543 (a tie typed by the head of a sort, which stays true: the head of a linear extension) and row 390 (`NoSuchMethodError` for a dispatcher with coercion, another cause). On the other path, walk sorts overloads only by parameter count (`OverloadedFunction.java:241`, a total preorder) and ancestors by TopSort; the code generator by TopSort.
9. **The report.** Its provenance lines open as cited (`climb-batch-27/gate/distance.txt:12`, `overloading.tex:309-311`, `Functionals.scala:717` at the base, `PartialOrder.scala:26-27`, `:78`). `overloading.tex:309-311` speaks of the run-time choice; REPORT.md section 5 and record.md's revival-change line read it as allowing the checker's static head, corrected. The whole-suite run: `ant testQuick` on `9dc409c3` at 04:31:40, `Tests run: 86`, `263`, `1450`, `Failures: 0`, `BUILD SUCCESSFUL` (`tmp/rung-checker-partial-order/testquick.txt:760`, `:1219`, `:4251`). The sentences made false are listed right; PLAN.md:681 (item 403) stays a question.
10. **Competing names.** `PartialOrder` is new in `ProjectFortress/src/com/sun/fortress/`; the only other `PartialOrder` is a Fortress trait in `Library/incomplete/advanced/Fortress.PartialTotalOrders.fss`, which nothing builds. `PartialOrderCandidatesCompiled` and my two test names are new in both test corpora.
11. **Failure modes.** TimSort's throw becomes an order. Where every candidate left has a predecessor (`moreSpecificCandidate` holding both ways), the class takes the first left, quietly, as the base's TimSort below 32 elements already did; the base took `sorted.headOption` where `top` is empty, and still does. No error became a value on the one library: the count and distance tables are unchanged but for the two crash rows.

## Findings

- **A. On the base, a tie whose sort put a less specific candidate first died compiled; the rung repairs it.** `compiler_tests/TieAmongMostSpecificCompiled` (shuffle 7 of `tmp/.../skeptic/tie/gentest.py`), through the harness on the base's code:

      $ old-fortress.sh /home/user/fortress-base28 <worktree>/tmp/rung-checker-partial-order/skeptic/old-caches junit <worktree>/ProjectFortress/compiler_tests/TieAmongMostSpecificCompiled.test     # 2026-11-08T06:55:12Z, and at FORTRESS_THREADS=4 at 06:55:36Z
      . run .../compiler_tests/TieAmongMostSpecificCompiled (236ms) java.lang.NoSuchMethodError
      Caused by: java.lang.NoSuchMethodError: '... TieAmongMostSpecificCompiled.\=f{...fss\!16\!1-18,...fss\!17\!1-17}(TieAmongMostSpecificCompiled$S)'
      Tests run: 3,  Failures: 1,  Errors: 0

  and on the worker's head:

      $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh head ProjectFortress/compiler_tests TieAmongMostSpecificCompiled.test     # 06:55:22Z, tree 2d3624e9
      . run ProjectFortress/compiler_tests/TieAmongMostSpecificCompiled (281ms) PASS
      OK (3 tests)

- **B. Walk refuses an overlap that declarations cover only through a further `comprises` clause** (row 936), beside the rung: `ProjectFortress/tests/XXXComprisesCoverNestedWalk.fss`, through `harness-one.sh` on the base's code (`FORTRESS_HOME=/home/user/fortress-base28`, 07:02:01Z, 'tree 157323e5', ' OK Saw expected exception') and on the head (07:02:20Z, ' OK Saw expected exception'); with `f(x: X): ZZ32 = 3` added for one run it printed `PASS` and the harness reported 'FAILURES!!!', 'Tests run: 1,  Failures: 1' (07:02:28Z), then the file was restored.
- **C. Row 935 holds under one build too.** Of shuffles 1 to 12 of my tie test at its own path under the base build, 9 and 11 die by a direct compile and run (`search1.txt`; 9 three times, by the absolute and the relative path) and pass through `old-fortress.sh junit`, and 7 passes directly and dies through the harness (`search2.txt`, of 1 to 24, 7 and 23). So the order follows the run as well as the build and the path; the row says so now.

## My commits

- `09d8b374`, a correction (test): `compiler_tests/TieAmongMostSpecificCompiled.fss` and `.test`, finding A's home 1. Settled by fork K2 (`CLIMB-BATCH-28.md:426`, "A tie keeps the first minimal candidate in the list's order") and `Specification/basic/overloading.tex:298-311`, by which the call dispatches to the most specific declaration applicable to the value, `f(V)` for a `V`. Failing and passing lines: finding A.
- `23555a60`, a correction (report, record, row): REPORT.md sections 4, 5, 11 and 13 and record.md (findings 5 and 8, For FACTS, row 935, revival change). Settled by `useful/TopSort.java:72`, `:126`, `:176`, `compiler/OverloadSet.java:404`, `FTraitOrObject.java:219` and the text of `overloading.tex:298-311`.
- `05c4c881`, a correction (test, row): `ProjectFortress/tests/XXXComprisesCoverNestedWalk.fss`, finding B's home 2, and row 936 in record.md, finding 9. Settled by `Specification/advanced/overloading.tex:310-315`: "it is also satisfied by declarations in the scope whose parameter types are each a subtype of both P and Q and together cover P ∩ Q". The path is outside the rung's section, a point to report.

None changes code, so nothing was built and no suite ran: the worker's `ant testQuick` on `9dc409c3` stands for the code, and the gate runs every suite on the merged tree.

## Where I differ from the worker

- Its precedent search missed the tree's `TopSort` (finding of check 4); its choice stands, by K1.
- Its reading of `overloading.tex:309-311` for the static head; the head is a choice the specification does not fix.
- The rung's points: besides its list, a change of the checker's typing of a call: a tie that the base typed by a less specific candidate is typed by a minimal one (finding A); and a test outside the section's paths (`tests/XXXComprisesCoverNestedWalk.fss`).
