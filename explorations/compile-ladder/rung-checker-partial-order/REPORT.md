# Rung K of climb batch 28: the checker's four sorts by a partial order (row 929; P-148)

- problem: the distance stage at climb batch 27's gate stops in `value object Char`, `#crash decl ObjectDecl FortressBuiltin.fss:661:1-773:2 IllegalArgumentException Comparison method violates its general contract!`, explorations/compile-ladder/climb-batch-27/gate/distance.txt:12
- spec: "If multiple declarations are applicable to the call at run time, then we choose an arbitrary declaration among the declarations such that no other applicable declaration is more specific than them.", Specification/basic/overloading.tex:309-311
- precedent: the base's `minimal`, `cs.filter(c => !cs.exists(d => !(d eq c) && moreSpecific(d, c)))`, whose reading of identity the class keeps, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:717 at 157323e51; and the planner's prototype, explorations/compile-ladder/plan-28/PROBES.md:49-87
- deviation: the class's type parameter has no bound, and elements are compared by `eq` as `AnyRef`, ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala:26-27
- deviation: where every element left has a predecessor among those left, `linear` takes the first left and goes on, the prototype's reading of the brief's "on a cycle, the rest in xs's order", ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala:78
- deviation: a unit test of the class beside it, a file the brief does not name, ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrderJUTest.scala:1
- deviation: the test holds shuffle 105, which stops the base's code at the test's path in this worktree, not shuffle 100, which stops it under old-fortress.sh only (section 3), ProjectFortress/compiler_tests/PartialOrderCandidatesCompiled.fss:1
- deviation: the new files carry no copyright header, as the revival's ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/ValueObjectMark.java:1 has none
- historical: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:1, ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:1

Commits on `wip/rung-checker-partial-order`: `151e2be6` (the test), `9dc409c3` (the change; the final code). No code changed after `9dc409c3`.

## 1. What changed and why

The compiled checker sorted three kinds of list with Scala's `sortWith` by an order that is partial: a call's candidates by `moreSpecific` (`Functionals.scala:761`, and `callType` at `:728`), a coercion's candidates by `moreSpecificCandidate` (`CoercionOracle.scala:255`), and a trait's ancestors by subtyping (`Formula.scala:609`), all at 157323e51. `sortWith(lt)` reads two elements that neither precedes as equal; on a partial order that equality is not transitive, and Java's TimSort, which checks the contract when it merges 32 elements or more, throws `IllegalArgumentException: Comparison method violates its general contract!` (row 929). Since climb batch 27 the distance stage stops so inside `value object Char`, at `x = -1` in `digit` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:692`), which meets 33 candidates of `=`.

The change:

- `ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala`, new, 85 lines: `class PartialOrder[T](xs: List[T], lt: (T, T) => Boolean)`. It reads `lt` at most once for each ordered pair, through a memo of n² bytes (`:21-23`, `:26-37`). An element is never compared with itself, and two places of `xs` that hold one object are not each other's predecessors (`:27`), as the base's `!(d eq c)` read them. `minimal` (`:48-50`) holds the elements that no other element precedes, in `xs`'s order, reading the pairs in the base's `minimal`'s order. `linear` (`:52-84`) is a linear extension: round by round, the first element of `xs` that no element left precedes; where every element left has one, as on a cycle, the first left (`:78`). Each element keeps the predecessor it was last found blocked by, so a later round reads on from it rather than from the start (`:55-68`); this changes which reads are repeated from the memo, never their answers.
- `Functionals.scala:718`: `minimal` over the class.
- `Functionals.scala:728-733`: `callType` takes the head of `minimal`, or `cs.head` where it is empty, and sorts nothing (fork K3); the tie type reads the same `minimal`.
- `Functionals.scala:764-768` and `:783`: one `PartialOrder` over the candidates gives `sorted` (`linear`) and `top` (`minimal`), so the two share its memo. The tie at `:831-836` keeps `sorted.headOption`, now the first minimal candidate in the candidates' order (fork K2).
- `CoercionOracle.scala:240-259`: the coercion's candidates in the class's linear extension, by `moreSpecificCandidate(c1, c2)(this)` as before.
- `Formula.scala:610`: the ancestors in the class's linear extension, by `isTrue(ta.subtype(b, a))` as before.
- Each of the three files imports the class (`Functionals.scala:28`, `CoercionOracle.scala:32`, `Formula.scala:31`), so every line below an import moves down by one.
- `PartialOrderJUTest.scala`, new, 56 lines: the class's contract on divisibility over 2 to 65 shuffled (a linear extension in `xs`'s order where nothing else decides, `minimal` against the base's formula, every ordered pair read once), a cycle, one object twice (no read), and the empty list.

## 2. The test, its failure and its pass

`ProjectFortress/compiler_tests/PartialOrderCandidatesCompiled.fss` and `.test` (`compile`, `link`, `run`, `run_out_contains=PASS`): two chains of traits `T0` to `T7` and `U0` to `U7`, each extending the one before, `object A extends T7`, `object B extends U7`, and the 64 declarations `f(x: Ti, y: Uj): ZZ32 = 100 i + j` in shuffle 105 of the planner's generator (fork K4), with the test's comment on the generator's blank line 3 so that no declaration moves; `run` asserts `f(A, B)` is 707 and prints `PASS`.

The failing run, through the harness, on the base's code (the worktree seeded from the base build, before the edit was first built; its first line reads `tree 157323e5`), 2026-11-08T04:13:59Z:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests PartialOrderCandidatesCompiled.test
    . compile ProjectFortress/compiler_tests/PartialOrderCandidatesCompiled
     UNEXPECTED exception
    java.lang.IllegalArgumentException: Comparison method violates its general contract!
    Tests run: 3,  Failures: 3,  Errors: 0

The base's stack, from the same build's compile of the same file at the same path (`java ... com.sun.fortress.Shell compile <worktree>/ProjectFortress/compiler_tests/PartialOrderCandidatesCompiled.fss`, before the edit):

    Exception in thread "main" java.lang.IllegalArgumentException: Comparison method violates its general contract!
    	at java.base/java.util.TimSort.mergeLo(TimSort.java:781)
    	at scala.collection.AbstractSeq.sortWith(Seq.scala:1197)
    	at com.sun.fortress.scala_src.typechecker.impls.Functionals.typedApplicationOfChecked(Functionals.scala:761)

The passing run, on `9dc409c3`'s code after its last build, 2026-11-08T04:19:13Z:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh change ProjectFortress/compiler_tests PartialOrderCandidatesCompiled.test
    . run ProjectFortress/compiler_tests/PartialOrderCandidatesCompiled (356ms) PASS
    OK (3 tests)

and again in `ant testQuick` on the same code (section 7): `run .../compiler_tests/PartialOrderCandidatesCompiled (346ms) Passed`. The unit test: `ant testOnly -DtestPattern=PartialOrderJUTest`, `Tests run: 4, Failures: 0, Errors: 0`.

## 3. The order of the candidates follows the build, not only the program

The generator was run at the test's own name and path, seeds 100 upward, each shuffle compiled on the base.

- Through `old-fortress.sh` (the base build `/home/user/fortress-base28`), by the file's relative and its absolute path: shuffles 100, 110 and 114 of 100 to 115 stop with TimSort's message at `Functionals.scala:761`; the other thirteen compile.
- Shuffle 100 then passed the harness in this worktree (`junit.sh base`, 2026-11-08T04:04:42Z, `OK (3 tests)`), on the same commit's code, and so did this worktree's own compile of it, at one thread and at four.
- Through this worktree's own build, before the edit (`java ... Shell compile` of the absolute path, a fresh copy of the caches each time): shuffles 105, 106, 107, 122, 123 and 125 of 100 to 125 stop; the others compile. 105, 106, 107, 122, 123 and 125 all compile under `old-fortress.sh`.
- Each build gave one answer on every repeat: shuffle 100 with the test's comment, at the test's path, stopped twice under the base build (by the relative and the absolute path) and compiled four times under the worktree's (the harness, two direct compiles at one and four threads, and the search).

So the same file at the same path, under two builds of one commit at two tree paths, reaches the sort in two orders. The order is the hash order of the overloadings' names (`ExprDisambiguator.scala:870-874`; row 929's notes). The test holds shuffle 105, which stops the base's code at its own path in this worktree through the harness; at another tree's path it may not stop the base's code, though it checks the call there all the same. Since the fix, the order still decides a tie among the most specific candidates (the first minimal, `Functionals.scala:831-836`) and the order of the call's candidates in its result. Recorded as NEW-K-1 (section 13).

## 4. Where the fix belongs, and the precedent search

The four sites are the compiled checker's (`explorations/coordinator/map/modules-and-phases.md`, B.6; the overloading row of `map/spec-to-implementation.md`, "Feature by feature"); walk does not run the Scala checker, so the fix is the compiled path's only, and no walk test applies.

Every sort in the checker's Scala, `grep -rn "sortWith\|sortBy\|\.sorted\b\|Ordering\.fromLessThan" ProjectFortress/src/com/sun/fortress/scala_src/`: the four sites above, which order by a partial order; `ExportChecker.scala:119`, `:389`, `:402`, `:416` and `HygienicRenamer.scala:54`, by string comparison, and `OverloadingOracle.scala:197`, by `toString`, all total orders; and `Common.scala:69` and `:82`, `min(Ordering.fromLessThan(smaller))` over subtyping of the self types, a partial order. `min` is a fold and cannot throw, but where two getters' self types are unrelated its answer follows the list's order. Noticed by reading, not measured; not changed (not a site of the brief). In the tree's Java, two orders by a partial order use the tree's own topological sort, `useful/TopSort.java`: the code generator orders a family's declarations by specificity with `TopSort.depthFirstArray` (`compiler/OverloadSet.java:404`), and walk orders a trait's ancestors with `TopSort.breadthFirst` (`interpreter/evaluator/types/FTraitOrObject.java:219`); `TopLevelEnvGen.java:357` and `:430` sort codes. TopSort is not the device for the four sites: each of its entry points throws `CycleInRelation` on a cycle (`useful/TopSort.java:72`, `:126`, `:176`), where `moreSpecificCandidate` can hold both ways (section 6) and the checker must go on, and its order is depth- or breadth-first, not the list's order where nothing else decides; fork K1 gives the class. (Skeptic's correction: the sentence here read that no sort in `compiler/`'s Java orders by a partial order.)

The ways the language's implementation offers, and the choice: the class of fork K1, the prototype's. Not taken: a rank sort (correct, twice as slow by the brief's measurement, 299 s against 137 s for the distance); Java's legacy merge sort (`-Djava.util.Arrays.useLegacyMergeSort`), which raises nothing and is still wrong on a partial order; a sort over a total order that refines the partial one, which needs a rank of every candidate first.

## 5. What the specification settles

`Specification/basic/overloading.tex:309-311`: where several declarations apply, an arbitrary one among those that no other applicable declaration is more specific than. `minimal` is that set; the head of the linear extension is its first. The passage speaks of the declaration a call dispatches to at run time; the arrow the checker gives a tie statically, fork K2's first minimal candidate, it does not fix, and it says nothing of an order beyond the head (NEW-K-1's "silent"). The compiled call still runs the most specific declaration applicable to the value (`compiler_tests/TieAmongMostSpecificCompiled`, section 13). (Skeptic's correction: the sentence here read that the tie is one of the choices the specification allows.) `grep -rn -i "comparison method\|timsort\|929" Specification/ --include=*.tex` finds no sentence on the crash.

## 6. The checker's time (P-148)

Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` in the shell; another rung's agent ran its JVMs on the machine during these runs (seen at 04:03 and 04:14). Each run: `time explorations/coordinator/tools/checker-count/run.sh <out> <scratch>` under `nice -n 19`, the base's in a call set up for `/home/user/fortress-base28`, the others in this worktree's.

| run | tree | started | load at start | real |
|---|---|---|---|---|
| base | 157323e5, the base build | 04:14:32 | 2.18 | 92.5 s (1m32.537s) |
| change | 9dc409c3 | 04:20:09 | 2.36 | 99.6 s (1m39.612s) |
| pass | 9dc409c3, step 7's count run | 04:29:40 | 1.61 | 103.6 s (1m43.585s) |

- The tables: `diff base.txt change.txt` prints nothing; `diff change.txt checker-count-postedit.txt` prints nothing; and each equals climb batch 27's `gate/checker-count.txt` (`#total 0`, `#locations 0`, `#crash none`).
- The `run.txt` files, each tree's path replaced by `TREE`: base against change, `diff` prints nothing; change against pass, nothing.
- So the results of `pass` are `change`'s, which are `base`'s. The seconds differ by 7.7 % and 12 %, and change and pass, on one code, by 4 %; within P-148's smoke test.

**The profile.** JFR (`settings=profile`, stack depth 2,048) on the count stage's checker run (`run.sh`'s step 2 by hand) on `9dc409c3`, 6,620 execution samples. The top self frames: `Walker.walkCases7$` 8.4 %, `Walker.walkCases0` 4.6 %, `walkCases2` 4.6 %, `walkCases4` 4.5 %, `walkCases5` 4.4 %, `walkCases3` 4.2 %, `walkCases1` 3.6 %, `walkCases6` 3.5 %, `ASTGenHelper$.scalaify` 2.6 %. Inclusive: `OverloadingChecker` 45.6 %, `STypeChecker.checkExpr` 40.7 %, `typedApplicationOfChecked` 16.5 %, `CoercionOracle.checkCoercionTrait` 9.8 %, `moreSpecificCandidate` 9.2 %. Under the class, 613 samples (9.3 %; 9 more matched by name are `scala.math.PartialOrdering` frames of `TypeAnalyzer`): 607 in the order's `lt` (`moreSpecific`), 1 in the class's own code; by caller, `linear` at `Functionals.scala:768` 543, `minimal` at `:783` 33, `callType`'s `minimal` at `:718` 32, `Formula.scala:610` 1, `CoercionOracle.scala:258` 1.

**The second pass took nothing.** The class's own work is one sample; its time is the reads of `lt`. The audit's counts (below) put 48,381 of the run's 54,648 reads in `linear`, 42,620 of them false, and the large orders are 22 of 33 candidates and 8 of 49. A linear extension in `xs`'s order must read, for each element it places, every pair with the elements left; reading fewer needs answers inferred by asymmetry or transitivity, which holds only if `moreSpecificCandidate` is a strict partial order, and where it holds both ways (the base's `minimal` excludes both) an inferred answer changes the result. The ways not taken: asymmetry, at most the 8,523 true reads each saving one read, about 1.5 % of the run, at that risk; sharing `callType`'s reads with the call's final order, 32 samples (0.5 %), which needs `candidatesOf` to give one set of tuples to both, a change outside the four sites; a lazy `linear` after the unfixed check, which saves only on calls that are errors, none on the library.

**The audit of the memo** (`compiler.md`, "The checker's time", step 5; fork K5): an instrumented copy of the class, compiled ahead of the build on the class path, computes every reused answer again and compares, counting reads outside its own recomputation. One full count-stage run on `9dc409c3`: `@@AUDIT PartialOrder reads=54648 reuses=16119 differences=0`, with `### rc=0` and the component reached. The test's compile with the copy: `reads=2454 reuses=427 differences=0`, one order of 64. Orders by size in the count run: `{1=8178, 2=421, 3=341, 4=229, 5=52, 6=45, 7=151, 8=61, 9=1, 11=5, 13=20, 14=7, 15=4, 17=27, 18=14, 23=4, 33=22, 49=8}`.

## 7. The suites

`ant testQuick` once, after the second pass, on `9dc409c3` (2026-11-08 04:31:40): `BUILD SUCCESSFUL`, `Total time: 6 minutes 26 seconds`; `Tests run: 86, Failures: 0` (library), `Tests run: 263, Failures: 0` (othercompiler), `Tests run: 1450, Failures: 0` (compiler). Climb batch 27's gate had 86, 263 and 1,447 (`compile-ladder/climb-batch-27/gate/summary.txt`); the three new cases are this test's. No test's verdict changed. `ant testOnly -DtestPattern=MethodSizeJUTest`: `Tests run: 2, Failures: 0`.

## 8. The stages on the final tree

Every path the rung changes is under `ProjectFortress/src/com/sun/fortress/scala_src/` or `compiler_tests/`, so both stages run; both on `9dc409c3`, after its build, with no code change after either started.

The count: section 6's `pass` run, `tmp/.../checker-count-postedit.txt`; its table equals climb batch 27's gate table (`diff` prints nothing): `#total 0`, `#locations 0`, `#crash none`.

The distance (`explorations/coordinator/tools/distance/run.sh`, started 04:38:26, load 2.15, the ladder subset of section 9 beside it): `#total 0`, every `#kind` 0, `#crash none`, `#seconds 162 FortressLibrary 104`. `run.txt:762`: `@@TC DECL-OK ObjectDecl TREE/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:661:1-773:2 errors=0`, so `value object Char`'s body, with its 41 helper bindings, checks with no error.

    $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-27/gate/distance.txt tmp/rung-checker-partial-order/distance-postedit.txt
    DISTANCE SAME   0
        crash gone   decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
        crash gone   stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1
        crash new    none

The per-site list `compile-ladder/gate/distance-sites.tsv` holds no site, and the run's `errors.tsv` holds none: no site moved. The table differs from the gate's only in the two crash rows, `#seconds` and `#machine`.

## 9. The rung's ladder subset, and old against new

The subset: the 43 files of the baseline's `ladder.tsv` (`compile-ladder/baseline-2026-09-19/`) whose first error is at the type check and opens "Could not check call to", or reads "head of empty list", the errors of the call check that the change sits in; no recorded first error names a sort, TimSort or a site (`grep -E "Comparison method|TimSort|sortWith|moreSpecific|Functionals|CoercionOracle|Formula"` over `raw/` and `ladder.tsv` finds none). Run after the edit only, with `repair-r1-atomic-static/run-subset.sh` and the baseline's `classify.py` copied into `tmp/`. Against the baseline's rows: 37 the same, 6 moved: `not_working_library_tests/FailInference2.fss` typecheck to pass; `tests/expTest.fss` typecheck to disambiguate ('Variable asFloat is not defined.'); `tests/overloadTest6.fss` typecheck to codegen ('Can't compile VarArgs yet'); `tests/restTest.fss`, `restTest2.fss` and `restTest2a.fss` typecheck with a new first error ('The varargs parameter x is used, whose type ImmutableArray[\ZZ32,ZZ32\] the libraries do not declare.'). The six compiled on the old code (`old-fortress.sh ... compile`) give the same exit codes and, with `Operation took` masked, byte-equal output: none of the moves is this rung's.

Old against new, besides: the test program (section 2), shuffles 100 to 125 (section 3), the count stage (section 6).

## 10. Sentences made false

No sentence of the specification (section 5). Of the record, which the gather corrects:

- `explorations/coordinator/FACTS.md:51`, F-54: "That gate's `distance.txt` holds two `#crash` rows: the check of `value object Char` stops in the checker's sort of a call's candidate declarations, and then the `FortressBuiltin` component's leftover stage reports the inference nodes that the stopped check left (row 929)." On the merged tree the distance holds none.
- `FACTS.md:50`, F-53: "At that gate its check of `value object Char` did not finish, so the 0 holds no completed check of that declaration's body (F-54; row 929, the checker's crash)."
- `FACTS.md:120`, F-281's title, "the distance with two crash rows from its check of `value object Char` (row 929)", and its gating "('#total 0' with two `#crash` rows; ...)".
- `FACTS.md:125`, F-288's title, "though its check of `value object Char` does not finish (row 929)", and "Over the fourteen, the stage reads '#total 0', with two `#crash` rows in the `FortressBuiltin` component (F-54)."
- `explorations/coordinator/PLAN.md:10`, "Where we stand": "but the distance holds two crash rows: the checker's check of `value object Char` does not finish (F-54; row 929)."
- `PLAN.md:63`: the line on row 929 ("the compiled checker crashes, ... The row's way through: order the candidates by rank, at a cost in time."); its last sentence, item 403, stays.
- Row 929 itself, which closes.

## 11. Points to report

1. The class as written, and each site's change: section 1 (`PartialOrder.scala:18-85`; `Functionals.scala:718`, `:728-733`, `:764-768`, `:783`; `CoercionOracle.scala:240-259`; `Formula.scala:610`). Reversible.
2. The compiled test before and after through `junit.sh`, with the base's stack: section 2. Reversible.
3. The count stage's three runs, base, change and pass, their seconds, the tables' diffs and the `run.txt` comparisons: section 6. Reversible.
4. The distance table on the final tree, `#crash none`, Char's line `run.txt:762`: section 8. Reversible.
5. The profile's top frames, the second pass taking nothing and why, and the audit of the memo (0 differences in 16,119 reuses): section 6. Reversible.
6. Tests whose verdict changes in `ant testQuick` or the compiler track: none; three new cases (section 7). Reversible.
7. Every sentence made false: section 10. Reversible.
8. A file edited beyond those named: `PartialOrderJUTest.scala`. A change of what the checker accepts or refuses: none on the one library (section 6, section 8); a program whose call reaches TimSort's check with an order it refuses, as the test, now compiles where the base's checker stopped with a Java exception. And a tie whose sort put a less specific candidate first, which the base typed by that candidate, naming a dispatcher that is never emitted, is now typed by the first minimal candidate, so a compiled call that died with `NoSuchMethodError` runs (`compiler_tests/TieAmongMostSpecificCompiled`, the skeptic's, section 13). Reversible.

No step that cannot be undone, and none against a decision on record. None of the reserved points was reached: no error, its text or its place, changed on the one library, and no compiled test's verdict.

## 12. Decisions

1. The cycle rule: where every element left has a predecessor among those left, `linear` takes the first left in `xs`'s order and goes on round by round. Ways not taken: the rest appended in `xs`'s order, as the brief's sentence can be read, which drops every later constraint among the rest, also those outside the cycle. Evidence: fork K1's default is "the prototype of section 5, probe 2", whose text reads "on a cycle it takes the first left"; the brief's "the rest in xs's order" read as that. No decision of the curator settles it beyond K1.
2. The test's order: shuffle 105, which stops the base's code at the test's path through the harness in this worktree. Ways not taken: shuffle 100, found first through `old-fortress.sh` as the brief says, which passed the harness here (section 3); a shuffle that stops both builds, of which none of 100 to 125 is one. Evidence: section 3.
3. The test's comment on the generator's blank line 3, so that no declaration's line moves. Way not taken: a comment line added above, which moves every declaration and so the order.
4. `callType` reads `minimal` in every family (fork K3), not only where `groundFamily` holds, and sorts nothing.
5. The sort is built where the base sorted, before the unfixed check (`Functionals.scala:767-768`), not lazily; the reads are pure (the audit), so this changes only work on calls that are errors.
6. A unit test of the class (`PartialOrderJUTest`), so that the class's contract is gated by the misc track. Way not taken: checking it only through the compiled test, which reaches one order, or a scratch script, which the skill forbids for a check of an edit.
7. The element type unbounded, identity through `AnyRef`. Way not taken: `T <: AnyRef`, which the four sites allow but the brief's signature does not write.
8. The second pass took nothing: section 6, with the ways not taken.
9. No copyright header on the two new files, as on the revival's `ValueObjectMark.java`. Way not taken: the team's Oracle header, which would credit the team with the file.
10. The pass run is step 7's count run on the final code, not a fourth run; the code did not change after `change`.
11. The ladder subset: the call check's errors (section 9), since no first error names a site.

## 13. Defects and their homes

- Row 929, the crash: home 1, repaired; `compiler_tests/PartialOrderCandidatesCompiled` and `PartialOrderJUTest`; the distance stage's `#crash none`. The row closes with `9dc409c3`.
- NEW-K-1, the order of a call's candidates follows the build's tree path, and under one build the run, a direct compile or the harness, as well as the program (section 3; the skeptic's tie shuffles, below): home 3. The specification is silent on the order (section 5), and no gated test can show it, since which order a build reaches depends on where it is; reproducer `none`, the commands in its notes.
- `Common.scala:69`, `:82`, `min` over a partial order: noticed by reading, not measured; no row.
- Found by the rung's skeptic: on the base, a tie among the most specific candidates whose sort (TimSort's binary insertion below 32) put a less specific candidate first took that candidate as the call's arrow, so the call named a dispatcher over it and the tied candidate below it, which is never emitted, and the compiled run died: `NoSuchMethodError: ... \=f{...16..., ...17...}(TieAmongMostSpecificCompiled$S)`, `Tests run: 3,  Failures: 1` (`old-fortress.sh /home/user/fortress-base28 ... junit .../compiler_tests/TieAmongMostSpecificCompiled.test`). Home 1, repaired by fork K2: `compiler_tests/TieAmongMostSpecificCompiled`, `OK (3 tests)` on the rung's head. Which shuffle shows it follows NEW-K-1's order: of shuffles 1 to 12 at the test's path, 9 and 11 die by a direct compile and run under the base build, 7 through its harness.

## 14. Commands worked out

- The shuffles on the base build at the test's path: the generator writes `compiler_tests/PartialOrderCandidatesCompiled.fss`, `sed -i '3s/^$/(* ... *)/'` puts the comment on line 3, and `old-fortress.sh /home/user/fortress-base28 <worktree>/tmp/old-caches compile -debug stacktrace <absolute path>` compiles it; on this worktree's build, `java $JAVA_FLAGS -Dfortress.caches=$Q -cp "$CP" com.sun.fortress.Shell compile <absolute path>` with `FORTRESS_CACHES=$Q` a fresh copy of `default_repository/caches`.
- The profile: `run.sh`'s step-2 `java` line by hand with `-XX:FlightRecorderOptions:stackdepth=2048 -XX:StartFlightRecording=filename=rec.jfr,settings=profile,dumponexit=true`, and two single-file Java programs over `jdk.jfr.consumer.RecordingFile`: one gives the top self frames and the samples whose stack holds a frame of each named class or method; the other, for the samples under a class, the frame below its deepest frame and the frame above its outermost.
- The audit: a copy of `PartialOrder.scala` that, on a memo hit, computes the answer again inside a thread-local depth so that reads of the recomputation are not counted, and prints its counts from a shutdown hook; compiled with `scala.tools.nsc.Main` into scratch and put ahead of `run.sh`'s classes on the class path.
