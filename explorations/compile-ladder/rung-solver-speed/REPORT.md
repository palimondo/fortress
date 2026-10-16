# Climb batch 16, rung S (rung-solver-speed): the checker's solver reduces once, and a guard on the build's long methods

- problem: after the walker split about 95 % of the component's typeCheck was the solver, `Formula.reduce` 94.8 % and `normConjunct`'s pair test 94.9 % inclusive (`explorations/perf-probes/checker-speed-2/REPORT.md`, section 2.3); measured here, 35.1M reductions over the component, 34.4M of formulas already reduced (section 4), at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:356` and `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:721` (528438ac5)
- spec: the specification names no time of the checker: `grep -rliE 'memoi|checker.{0,40}(time|speed|fast)' Specification/basic Specification/basic-lib` prints nothing; none
- precedent: row 688's ground memo and the normalize memos' context marks, at 528438ac5 `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:104-115` and `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:569-573`
- deviation: the reduction memo lives on the analyzer, keyed by the formula alone, where the ground memo lives on the table keyed by the question and the negation: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:589-609`
- deviation: the exclusion memo keys a question with its inference variables renamed apart, which no memo of the tree did before: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:985-1015`
- deviation: the exclusion answers that read no context are shared through the table as Booleans, where the ground memo shares formulas: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:150-156`
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:358`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:408`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:34`

## 1. What changed and why

Commits on `wip/rung-solver-speed`, cut from `528438ac5`:

| commit | what |
|---|---|
| `aaac79b84` | tests: `ReductionMemoJUTest` (red on the base) and the guard `MethodSizeJUTest` |
| `615ecff76` | the change: `Formula.reduce` asks the analyzer for a reduction it made before (`TypeAnalyzer.reduced`) |
| `60d8081ea` | tests: `ExclusionMemoJUTest` and `TraitTableMemoJUTest` (red on the change) |
| `6e6192747` | the second pass: the exclusion memo by renamed question, and the table's two lookups |

**The change.** `Formula.reduce` simplifies a conjunction or a disjunction. For each inference variable it meets the upper bounds and joins the lower bounds, then tests them for contradiction and redundancy, each test a subtype or exclusion question (`Formula.scala:365-466`).

- `Formula.and` and `or` reduce after every step of their fold. `implies`, `isTrue`, `isFalse` and `equivalent` reduce both sides, and `maximalCFormulas` reduces each pair.
- So the same formula is reduced again and again: 35,107,747 reductions over the component, 34,447,211 of them of a formula already in reduced form (section 4).

Now `reduce` sends an `And` or an `Or` to `TypeAnalyzer.reduced` (`Formula.scala:360-363`), which keeps each analyzer's answers (`TypeAnalyzer.scala:589-609`):

- **The key is the formula.** A reduction asks only the analyzer's public questions (`meet`, `join`, `subtype`, `excludes`, `lteq`, `definitelyExcludes`), each from an empty cycle history. So its answer depends on the formula and on the analyzer's trait table and kind environment, and the analyzer owns the memo. The negation flag takes no part: no reduction is asked under a negation.
- **Context reads.** An answer whose computation read the context (`traits.contextReads` moved) is marked, and a hit on it is a context read too (`traits.readContext()`). So an enclosing computation is never shared by the ground memo as context-free. This is the normalize memos' rule (`TypeAnalyzer.scala:616-620`).
- **Opened sizes.** A reduction that opened a size (`Formula.openedSizeCount` moved, `Formula.scala:150`) is not kept: computed again, it would open a fresh size with another name.
- **The switch** is `fortress.analyzer.reduce.cache`, default on, beside the analyzer's other switches.

**The second pass.** After the change, the profile held `TypeAnalyzer.dExc` at 62.7 % inclusive, from `normConjunct`'s pair test `x.exists(y => x.exists(z => dExc(y, z)))` (`TypeAnalyzer.scala:768`). It also held the trait table's walk of every type it holds: `TraitTable.find` at `pSubInner`'s declaration search 11.9 %, `TraitTable.typeCons` 6.6 % (section 5). The pass takes all three:

- **The exclusion memo.** `dExc` keeps its answers by the question with its type inference variables renamed apart (`TypeAnalyzer.scala:408-439`; `renamedApart`, `:985-1015`).
  - An inference call makes fresh variables, so `Number` against `MultiplicativeRing[\$i\]` was asked with a new `$i` each time and never met a memo.
  - The answer is a Boolean, and it is the same under every renaming of the variables, because the computation compares them only by equality.
  - It is kept only from an empty cycle history and marked if its computation read the context. If it read none, it is shared through the trait table (`TraitTable.scala:150-156`), as the ground memo shares its answers. It is not kept if the computation opened a size.
  - A question that holds a size or operator inference variable is not kept.
  - The renamed variables hash by their number, so a renaming asks the JVM for no identity hash.
  - The switch is `fortress.analyzer.exclusion.cache`.
- **`TraitTable.typeCons`** keeps its answer by the name's api and text (`TraitTable.scala:34-53`). An `Id`'s span takes no part in a lookup, since `SpanInfo.equals` is true of any two spans. The indices' maps of types are built once (`CollectUtil.immutable`, `compiler/index/CompilationUnitIndex.java:41`).
- **The declaration search.** `pSubInner` searched for a trait's declaration by its text, walking every type of the table for every comparison of two instances of one generic trait (`TypeAnalyzer.scala:271` at 528438ac5). It is now `traits.declaredTypeCons(text)` (`TypeAnalyzer.scala:267`; `TraitTable.scala:55-66`): the same walk, once per name. The table's walk meets its types in the same order each time, while the table holds the same types.
- Both lookups share the switch `fortress.analyzer.typecons.cache`.

**The guard.** `ProjectFortress/src/com/sun/fortress/tests/unit_tests/MethodSizeJUTest.java`, in the misc track, reads every class under `ProjectFortress/build` with `java.lang.classfile`, as `WalkerJUTest` reads `Walker` (`ProjectFortress/src/com/sun/fortress/scala_src/nodes/WalkerJUTest.java:59-76`).

- It fails on any method over 8,000 bytes of bytecode that its list does not name, and names each such method with its size.
- It also fails on a listed method that is gone from the build or back under the limit, so that the list stays true.
- `WalkerJUTest` is as it was. The list is in section 8.

## 2. The tests: failing runs and passing runs

**`ReductionMemoJUTest`** (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ReductionMemoJUTest.scala`), beside `FormulaJUTest`. It asserts three things:

- A reduction asked again in one analyzer is its first answer and asks no meet. This one is red on the base.
- A reduction over a type variable is each analyzer's own: `T extends Cc` against `T extends Dd` over one table, in both orders, each asked twice.
- Asked again, a reduction that read the kind environment counts as a context read.

The failing run was on the base's code with only the tests added, 10:50:51 to 10:51:31 UTC, before the change was first built (10:53:25):

    ant testOnly -DtestPattern=ReductionMemoJUTest
        [junit] Tests run: 3, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.476 sec
        [junit] Testcase: testReductionAskedAgainIsTheFirstAnswer took 0.443 sec
        [junit] 	FAILED
        [junit] junit.framework.AssertionFailedError: the second reduction is the first's answer

**`ExclusionMemoJUTest`** (`ProjectFortress/src/com/sun/fortress/scala_src/types/ExclusionMemoJUTest.scala`), beside `TypeAnalyzerJUTest`. It asserts four things:

- An exclusion asked again with another inference variable is not computed again. Red on the change.
- An exclusion that read no context is answered in the same way in another analyzer over the table. Red on the change.
- An exclusion over a type variable is each analyzer's own: `T extends Aa` excludes `Bb`, and `T extends Cc` does not, in both orders.
- Asked again, it counts as a context read.

**`TraitTableMemoJUTest`** (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTableMemoJUTest.scala`) asserts that `typeCons` asked again is the first answer, and that comparing two other instances of `Mm` does not walk the table again. Both are red on the change.

The failing run was on the change's code (`615ecff76`) with the tests added, 11:41:50 to 11:42:55 UTC. The pass was written at 11:43 and first built at 12:24:

    tmp/rung-solver-speed/unit-tests.sh LOG ExclusionMemoJUTest TraitTableMemoJUTest   (ant testOnly -DtestPattern=X for each)
        [junit] Tests run: 4, Failures: 2, Errors: 0, Skipped: 0, Time elapsed: 0.606 sec
        [junit] junit.framework.AssertionFailedError: the second question, with another inference variable, is not computed again expected:<1> but was:<2>
        [junit] junit.framework.AssertionFailedError: another analyzer over the table answers a question that read no context without computing it expected:<0> but was:<1>
        [junit] Tests run: 2, Failures: 2, Errors: 0, Skipped: 0, Time elapsed: 0.73 sec
        [junit] junit.framework.AssertionFailedError: the second lookup of Mm is the first's answer
        [junit] junit.framework.AssertionFailedError: comparing two other instances of Mm does not search the table again expected:<1> but was:<2>

**`MethodSizeJUTest`** is green on the base by construction (10:51:47 UTC, base code: `Tests run: 2, Failures: 0`). I made it red once, for that run only, with `Misc.checkExprMisc` dropped from its list, then restored the list (`cmp` against the kept copy: equal):

    ant testOnly -DtestPattern=MethodSizeJUTest      (list without Misc.checkExprMisc)
        [junit] Tests run: 2, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.471 sec
        [junit] Testcase: testNoUnlistedMethodOverTheLimit took 0.138 sec
        [junit] 	FAILED
        [junit] junit.framework.AssertionFailedError: com.sun.fortress.scala_src.typechecker.impls.Misc.checkExprMisc is 12893 bytes of bytecode, more than 8000

**The passing run** is the last run after the last change of code (`6e6192747`, built 12:24), each class through `ant testOnly`:

    tmp/rung-solver-speed/unit-tests.sh LOG ReductionMemoJUTest ExclusionMemoJUTest TraitTableMemoJUTest MethodSizeJUTest TypeAnalyzerJUTest TypeSchemaAnalyzerJUTest FormulaJUTest ConstraintJUTest WalkerJUTest OverloadingJUTest STypesUtilJUTest
        ReductionMemoJUTest 3/0, ExclusionMemoJUTest 4/0, TraitTableMemoJUTest 2/0, MethodSizeJUTest 2/0,
        TypeAnalyzerJUTest 4/0, TypeSchemaAnalyzerJUTest 4/0, FormulaJUTest 5/0, ConstraintJUTest 4/0,
        WalkerJUTest 4/0, OverloadingJUTest 1/0, STypesUtilJUTest 1/0     (Tests run / Failures; Errors 0 each)

The change's own unit run (`615ecff76`, 10:54) had `ReductionMemoJUTest`, `MethodSizeJUTest`, `TypeAnalyzerJUTest`, `TypeSchemaAnalyzerJUTest`, `FormulaJUTest`, `ConstraintJUTest` and `WalkerJUTest` all green.

**Whole suites:**

    ant testQuick      on 615ecff76 (11:20:54 to 11:27:50 UTC)
        compiler 1212 tests, 0 failures; library 86, 0; othercompiler 263, 0; BUILD SUCCESSFUL, Total time: 6 minutes 50 seconds
    ant testQuick      on 6e6192747 (12:28:55 to 12:41 UTC)
        compiler 1212 tests, 0 failures; library 86, 0; othercompiler 263, 0; BUILD SUCCESSFUL, Total time: 12 minutes 3 seconds

## 3. Where the fix belongs, and the precedent search

The solver is the compiled checker's own (`explorations/coordinator/map/modules-and-phases.md`, B.6):

- `Formula.scala` holds the constraint formulas and their reduction.
- `TypeAnalyzer.scala` holds the subtype, exclusion and normal-form questions.
- `TraitTable.scala` is the table that every analyzer over one compilation unit shares.

Walk shares none of this code, so the fix is the checker's, and only the compiled path sees it. No rule of the language moves (section 9).

**The precedent.** The tree has memoized the checker four times, each in `TypeAnalyzer.scala` or `TraitTable.scala`:

- The analyzer's per-question memos, keyed by the question and the whole cycle history: `pSubMemo`, `pExcMemo` and the five normalize memos (`TypeAnalyzer.scala:97`, `:460`, `:611-620`).
- Rung M's clause memos on the table, for `parents` and `excludesClause` (`TraitTable.scala:116-131`; F-65).
- Row 688's ground memo on the table. An answer that read neither the kind environment nor the cycle history, counted by `contextReads`, is shared by every analyzer over the table (`TraitTable.scala:134-148`; `explorations/perf-probes/checker-speed/REPORT.md`, section 6).
- The normalize memos' marks: a key whose value read the context is marked, and a hit on it is a context read (`TypeAnalyzer.scala:616-620`).

Sites in these files that repaired the same defect, a question computed again:

- `TraitTable.scala`: three memos at the base (`parentsMemo`, `excludesClauseMemo`, `groundMemo`), six after the pass (adding `typeConsMemo`, `declaredMemo` and `sharedExclusions`).
- `TypeAnalyzer.scala`: seven memos at the base (`pSubMemo`, `pExcMemo` and five normalize memos), nine after (adding `reduceMemo` and `exclusionMemo`).

I followed three precedents:

- the normalize memos' marking rule, for both new analyzer memos;
- the ground memo's sharing rule, for the exclusion answers that read no context;
- the clause memos' form (a `ConcurrentHashMap` on the table, `putIfAbsent`), for the two table lookups.

## 4. The ways weighed, each with its measure

Every measure below is a count-stage run of a copy compiled into a scratch folder ahead of the build on the class path (`compiler.md`, "Testing an edit here"), on the base build or on this tree's. None is a timed run.

| way | what it measured | taken |
|---|---|---|
| A memo of normalized meets, shared by the analyzers over one table (the probe's first way) | probe 1, base: 286,255 intersections normalized, 232,142 of them memo hits and 54,113 computed. Of the 23,832 computed at the outermost level (248.8 s), a shared memo of context-free answers would answer 9,249, worth 0.21 s; 0 mismatches | no: nearly no gain |
| Fewer reductions in `Formula.and`'s fold (the probe's second way) | probe 3, base: 35,107,747 reductions (34,240,961 `And`, 866,786 `Or`), 191,451 of them outermost, 284.8 s of the run. 34,447,211 reduced a formula already reduced. A memo by analyzer and formula would answer 34,562,315; a memo by formula alone, 34,565,973; 0 mismatches either way | yes, as a memo of each analyzer's reductions: it removes every reduction asked again, inside the fold and out, and each answer is the one the reduction gives. Reordering the fold to reduce once at its end would change the intermediate formulas that the fold carries, so the results could move |
| The reduction memo, shared across analyzers | probe 3: 3,658 more hits than the analyzer's own memo | no: no gain, and a shared answer must not have read the context |
| The memo of reductions as built (prototype) | 103 s, against 302 s for the base in the earlier session (load 3.98 against 0.43); table and output equal | the change |
| Halving `normConjunct`'s pair test by symmetry | not run | no: `pExcInner` swaps its arguments in seven cases and is not shown to be symmetric, so the answers could move |
| `maximalCFormulas` computing `implies(d, c)` for `!equivalent(c, d)` where `implies(c, d)` holds, one implication fewer | 109 s, against 106 s without it (same session, load 3.1 and 2.3) | no: no gain |
| The table's two lookups (`typeCons` and the declaration search) | JFR on the change: `TraitTable.find` 11.9 %, `TraitTable.iterator` 11.1 %, `TraitTable.typeCons` 6.6 % inclusive. 106 s, against 125 s for the change (load 2.3 and 2.5) | yes |
| `dExc` by renamed question, in each analyzer | probe 5, on the change: 96,307 outermost calls, 49.9 s. Keyed by the renamed question, the environment's text and the history's emptiness, a memo would answer 71,857, worth 35.8 s; with the exact question, 55,050, worth 7.1 s; 0 mismatches. Prototype: 89 s, against 109 s (load 3.8 and 3.1) | yes |
| The same, shared through the table when it read no context | prototype: 78 s, against 89 s | yes |
| `dExc` keyed by the question and the kind environment's text, as probe 5 keyed it | as above | no: a `KindEnv`'s text is not a faithful key (two traits of one name in two apis print alike) |

The prototypes' times come from one run each on a loaded machine, so they rank the ways and measure nothing finer; section 7 has the timed runs. A second run of the all-on prototype reused its scratch folder's caches, so it skipped the apis' checks; I do not count it. The two prototype variants with the exclusion memo lost `:130` in their outputs, as the final code's distance stage did (section 10).

**The keys, and why each input of an answer is in them:**

- **Reduction**: the formula, on the analyzer. A reduction reads the formula and the analyzer's trait table and kind environment, which are fixed for the analyzer (`class TypeAnalyzer(val traits: TraitTable, val env: KindEnv)`). It reads no cycle history, since each of its questions starts from an empty one, and no negation. The opened-sizes counter is the one global state that a reduction moves, and a reduction that moves it is not kept.
- **Exclusion, in the analyzer**: the two types with their inference variables renamed apart, kept from an empty history only. The answer reads the two types up to renaming, the table and the environment as above, and the history, which is empty. The negation is always off: `exc` asks `pExc` with `negate = false`.
- **Exclusion, shared by the table**: the same key, kept only when the computation read no context, so it read neither the environment nor the history. The table owns the memo.
- **`typeCons`**: the name's api and text, on the table. The answer reads the name's api name and text (the span takes no part) and the table's compilation unit and global environment, which are fixed.
- **The declaration search**: the name's text, on the table. The answer reads the text and the table's set of types, which is fixed. The walk meets the types in one order while the set and its members' identity hashes stay the same.

## 5. The profiles

JFR, default settings, stack depth 2048, on the count stage's checker. I read the recordings with `tmp/rung-solver-speed/jfr/JfrAgg.java`, a single-file program over `jdk.jfr.consumer.RecordingFile` in the form of the probe's (`checker-speed-2/REPORT.md`, section 11, "Commands worked out"); its modes are `incl`, `self`, `outer`, `innermost`, `depth` and `lines`.

- **Base** (368 s with JFR, 25,745 samples):
  - Inclusive: `inferStaticParamsHelper` 84.7 %, `Formula.and` 82.2 %, `tSimplify` 81.9 %, `TypeAnalyzer.pNorm` 89.7 %. The outermost `normConjunct` frame sits at its pair test (`TypeAnalyzer.scala:721` at 528438ac5), 88.5 %.
  - Self: `BoxesRunTime.equals2` 6.8 %, `Statics.anyHash` 5.7 %, `List.prependedAll` 4.2 %, `AbstractNode.hashCode` 3.6 %.
  - The JFR run's table read 38 / 37: it lost `:130`.
- **Change** (110 s with JFR, 7,038 samples):
  - Inclusive: `pExc` 65.5 %, `normConjunct` 64.1 % (its pair test 62.3 %), `dExc` 62.7 %, `Formula.and` 42.6 %, `TypeAnalyzer.reduced` 42.4 %, `maximalCFormulas` 23.7 %, `TraitTable.find` 11.9 %, `TraitTable.typeCons` 6.6 %.
  - `pSubInner`'s innermost callees: `TraitTable.find` at its declaration search 11.9 %, `pNorm` 9.5 %, `opensSizes` 5.8 %, `groundAnswer` 5.8 %.
- **Pass, prototype with the table's lookups only**: `pExc` 64.4 %, `dExc` 61.8 %, `reduceOnce` 46.7 %, `maximalCFormulas` 29.5 %, and no `TraitTable` frame among the top. The exclusion memo then took the `dExc` share.
- I took no JFR of the final code as built.

## 6. The audit

I made two instrumented copies, each compiled into a scratch folder ahead of the build. At every hit of a memo, the copy computes the answer again without that memo, in the analyzer and from the history where it was asked, compares the two answers, and puts the context-read counter back as it was. The final code's copy differs from the tree only in the instrumented lines (checked by `diff`).

    the change's copy (615ecff76's Formula.scala and TypeAnalyzer.scala), count stage, 10:56 UTC, 323 s:
    @@AUDIT reductions reused=7150890 of which marked contextual=3495 mismatches=0 text-mismatches=116461 unmarked-context-reads=0 opened-sizes-on-recompute=0

    the final code's copy (6e6192747's three files), count stage, 11:47 UTC, 438 s:
    @@AUDIT reductions reused=7147587 marked contextual=3495 mismatches=0 unmarked-context-reads=0 opened-sizes-on-recompute=0
    @@AUDIT exclusions reused=153930 (in the analyzer 89833, shared 64097) marked contextual=7969 mismatches=0 unmarked-context-reads=0 shared-unmarked-context-reads=0 opened-sizes-on-recompute=0
    @@AUDIT typeCons reused=156462352 mismatches=0 declaredTypeCons reused=183577 mismatches=0

    the final code's copy, run as the distance stage (tmp/rung-solver-speed/dist-run-with.sh: the stage with the copy first on the class path), 12:42 UTC, 1,240 s:
    @@AUDIT reductions reused=18798478 marked contextual=10605 mismatches=0 unmarked-context-reads=0 opened-sizes-on-recompute=0
    @@AUDIT exclusions reused=400171 (in the analyzer 237705, shared 162466) marked contextual=23017 mismatches=0 unmarked-context-reads=0 shared-unmarked-context-reads=0 opened-sizes-on-recompute=0
    @@AUDIT typeCons reused=408675370 mismatches=0 declaredTypeCons reused=397380 mismatches=0

- **Reuses on the count stage**: 7,147,587 reductions; 153,930 exclusions (89,833 from the analyzer's own memo, 64,097 shared); 156,462,352 type lookups; 183,577 declaration searches. Differences: 0.
- **Reuses on the distance stage**: 428M in all. Differences: 0.
- **`unmarked-context-reads`** would count an answer marked context-free whose computation read the context. It is 0 for both memos.
- **The change's `text-mismatches`** counts answers that are equal as formulas but whose text differs, a set's members in another order: 116,461 of 7.15M. An equal formula is the same answer, and none of these reached the output (section 7).
- **`:130`**: the change's audited run lost row 488's `:130` (38 / 37). The final code's audits kept it: 39 / 38 on the count stage, 49 on the distance stage, each equal to its landed table.

## 7. The results and the time

**Machine**: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`.

- The VM restarted at about 11:15 UTC, between the earlier session's base run and this session's, so I timed the base again.
- The machine was not idle in this session. Other trees' JVMs ran throughout: the distance stages of `fortress-probe-power` and `fortress-probe-where`, and rung H's runs.
- I waited the 30 minutes that `compiler.md` asks, from 11:43, and took the pair at 12:14.

| run | tree and code | start (UTC) | load at start | other trees' JVMs | seconds |
|---|---|---|---|---|---|
| base | `/home/user/fortress-base16`, `528438ac5` | 12:14:21 | 5.60 | 3 | 437 |
| change | this tree, `615ecff76`'s code (built 11:42; `javap` shows `reduced` and no `renamedApart`, `declaredTypeCons`) | 12:21:38 | 6.55 | 3 | 149 |
| pass | this tree, `6e6192747` | 12:27:04 | 3.59 | 1 | 97 |
| base, earlier session | `/home/user/fortress-base16` | 10:04:47 | 0.43 | 0 | 302 |

- **Gain against the base**: the change 66 % (437 s to 149 s), the pass 78 % (437 s to 97 s). Both are far past the 6 % by which two idle runs of one tree differ. The pass against the change is 35 % faster, but its load at start was lighter, so part of that is the load.
- **For scale**: the count stage took 325 s at climb batch 15b's gate, and 333 s and 352 s idle in the probe.

**Results.** The base and change runs: `explorations/coordinator/tools/checker-count/run.sh tmp/count/base2.txt tmp/count/base2` from the base build, and the same with `change` from this tree. The pass ran in the brief's post-edit form (`checker-count-postedit.txt`, `cc-post`).

    diff tmp/count/base2.txt tmp/count/change.txt                                  (prints nothing)
    diff tmp/count/base2.txt tmp/rung-solver-speed/checker-count-postedit.txt      (prints nothing)
    diff tmp/count/base2.txt explorations/compile-ladder/climb-batch-15b/gate/checker-count.txt   (prints nothing)
    diff <(sed 's|/home/user/fortress-base16|TREE|g' tmp/count/base2/run.txt) <(sed 's|/home/user/fortress-solverspeed|TREE|g' tmp/count/change/run.txt)   (prints nothing)
    diff <(sed 's|/home/user/fortress-solverspeed|TREE|g' tmp/count/change/run.txt) <(sed 's|/home/user/fortress-solverspeed|TREE|g' tmp/rung-solver-speed/cc-post/run.txt)   (prints nothing)

- The three tables are equal: `#total 39`, `#locations 38`, every api 0, `#crash none`.
- The three whole outputs are equal once the tree path is masked, 178 lines each, with no line in another order.
- Row 488's `:130` stays in all three.

## 8. The guard's list

I scanned the base build with `tmp/rung-solver-speed/scan/Scan.java` over `/home/user/fortress-base16/ProjectFortress/build` (4,117 classes). It found twelve methods over 8,000 bytes, and the list is those twelve, each with what runs it (`MethodSizeJUTest.java:32-52`):

| method | bytes | what runs it |
|---|---|---|
| `com.sun.fortress.nodes.NodeReader.readNode` | 14,026 | each read of a syntax tree from a cache entry (`nodes_util/FortressNodeReader.java:32`) |
| `com.sun.fortress.parser.Fortress.pCharLiteralContent$1` | 23,717 | the parser, at each character literal |
| `com.sun.fortress.parser.preparser.PreFortress.pCharLiteralContent$1` | 23,717 | the preparser, the same |
| `com.sun.fortress.parser.templateparser.TemplateParser.pCharLiteralContent$1` | 23,717 | the template parser, the same |
| `com.sun.fortress.scala_src.disambiguator.ExprDisambiguator.walk` | 8,518 | the disambiguator, on both paths |
| `com.sun.fortress.scala_src.typechecker.impls.Misc.checkExprMisc` | 12,893 | the compiled checker, at each expression that `Dispatch` sends it (`impls/Dispatch.scala:98`) |
| `com.sun.fortress.scala_src.linker.HygienicRenamer.walk` | 11,599 | nothing in the tree constructs a `HygienicRenamer` |
| `com.sun.fortress.useful.MagicNumbers.<clinit>` | 16,677 | the class's initializer, once |
| `com.sun.fortress.numerics.DirectedRoundingTestData.make_double_divide_data` | 21,975 | the data of `DirectedRoundingTest`'s `main`, which no suite runs |
| `...DirectedRoundingTestData.make_double_multiply_data` | 10,229 | the same |
| `...DirectedRoundingTestData.make_float_divide_data` | 10,425 | the same |
| `...DirectedRoundingTestData.make_float_multiply_data` | 9,715 | the same |

- The probe and its skeptic named the first seven (`checker-speed-2/REPORT.md` section 2.2, `SKEPTIC.md` section 5). The scan adds `MagicNumbers.<clinit>` and the four `DirectedRoundingTestData` methods.
- The skeptic's `pidrest`, 7,617 bytes, is under the limit, so it is not listed.
- The guard keys a method by its class and name, and takes the largest size among its overloads.

## 9. What the specification settles, and the sentences made false

The specification does not speak of the checker's time (the grep in the provenance lines), and no rule moves: the checker accepts and refuses the same programs, with the same errors at the same places (section 7). So the change makes no sentence of the specification false, no Appendix I Effect and no note on walk or the compiled path.

Sentences of the skill that the change makes false, for the gather and the skill writer:

- `.claude/skills/fortress-repo/references/compiler.md:125`: "The count stage takes `<out-file> <scratch>` and about 6 minutes on an idle machine." It took 97 s on this rung's final code at load 3.6, and the distance stage took 574 s (section 10).
- `.claude/skills/fortress-repo/references/compiler.md:134` names `WalkerJUTest` as the one guard of a long method. `MethodSizeJUTest` now guards every method of the build.
- The batch brief's "the count (about 5 minutes, 280 to 390 s in climb batches 13b and 14)", and "the distance (about half an hour, one core: 26 to 29 minutes in climb batch 14)".
- F-231's "What remains is about 95 % the solver normalizing meets again" is now wrong (record.md).

## 10. The count, the distance and the ladder

The rung edits `ProjectFortress/src/com/sun/fortress/scala_src/`, which is outside the paths where neither stage can move. So both stages ran once on the final code (`6e6192747`).

**Count**: see section 7. Its table equals climb batch 15b's gate table (`explorations/compile-ladder/climb-batch-15b/gate/checker-count.txt`), and the count stays 39.

**Distance**:

    explorations/coordinator/tools/distance/run.sh tmp/rung-solver-speed/distance-postedit.txt tmp/rung-solver-speed/dist-post
        #total	48
        #seconds	574	FortressLibrary 474
        #machine	nproc=4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 4.58 5.29 5.32; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=1
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-15b/gate/distance.txt tmp/rung-solver-speed/distance-postedit.txt
        DISTANCE DOWN   49 -> 48 (-1)
            kind typecheck               40 -> 39     (-1)
            class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
            unit component FortressLibrary     43 -> 42     (-1)

Site by site, I compared `tmp/rung-solver-speed/dist-post/errors.tsv` with `explorations/compile-ladder/gate/distance-sites.tsv`, both sorted. The rung edits no library line, so lines map one to one and row 577 does not apply. One row is gone, none is added and none respelled:

    < typecheck	Function body has type TotalComparison, but declared return type is BigReduction[\..\].	-	component FortressLibrary	typecheck	FortressLibrary.fss:130	Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].

This is row 488's `:130`, the `BIG LEXICO` at `Library/FortressLibrary.fss:129-130`. The audit beside it:

- The audit copy of the same final code, run as the distance stage (section 6), reuses 428M answers with 0 differences.
- Its table reads `DISTANCE SAME   49`, and its `errors.tsv` equals the landed per-site list row for row, `:130` included.
- So the run that computes every reused answer again keeps `:130`, every reuse gives the answer computed again, and the run that does not compute them again loses `:130`.

This is F-232's move: row 488's site depends on what the checker queried earlier. It is not a result that the change made. The count stage keeps `:130` in base, change and pass. The merged tree's distance may read 48 or 49 by the same mechanism.

**Ladder subset**: I copied the drivers of `gate.md`, "The ladder regression", into `tmp/rung-solver-speed/ladder/`. The subset is 68 files (decision 11) plus the eighteen microGPT components, run after the pass was built.

- 61 of the 68 have the phase and first error of the baseline's `raw/` (2026-09-19).
- 7 moved since the baseline:
  - `FailInference2` typecheck → pass;
  - `expTest` → disambiguate;
  - `overloadTest6` → codegen;
  - `restTest`, `restTest2` and `restTest2a`: another first error, about a varargs type;
  - `simpleExp`: another first error, an ambiguous coercion.
- I compiled each of the 7 on the base's code (`/home/user/fortress-base16/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base16 tmp/old-caches compile tests/X.fss`). Each output equals the new one, line for line, except `Operation took`. These are the base's own moves, from landings since the baseline; none comes from this rung.
- microGPT: `diff <(mg_phases explorations/compile-ladder/climb-batch-15b/gate/ladder/microgpt-phase.md) <(mg_phases tmp/rung-solver-speed/ladder/microgpt-phase.md)` prints nothing. Every component stops at disambiguate, before the checker.

## 11. Old against new

- The count stage over the interpreter's library: base build against this tree, three timed runs, tables and outputs equal (section 7).
- The distance stage against the landed per-site list, and its audit copy (section 10).
- The 7 ladder files that moved since the baseline, each compiled on the base's code (section 10).
- Walk shares none of the edited code, so I ran no walk program.

## 12. Points to report

- **Each count run's seconds and load at start, and the gain against the base**: base 437 s at 5.60, change 149 s at 6.55, pass 97 s at 3.59; gains 66 % and 78 % (section 7).
- **The way taken and the ways weighed, each with its measure; the memo's key and why every input of its answer is in it**: section 4.
- **The audit**: on the count stage, 7,147,587 reductions, 153,930 exclusions, 156,462,352 type lookups and 183,577 declaration searches reused, 0 differences. On the distance stage, 428M reuses, 0 differences (section 6).
- **Any difference in a table or a whole output, each line named; a move of row 488's `:130`, with the audit beside it**:
  - None in the count stage: `:130` stays in base, change and pass.
  - The final code's distance stage lost `:130`, the one line named in section 10. The audit copy of the same code kept it, with 0 differences.
  - Two instrumented runs also lost `:130`: the change's count-stage audit and the base's JFR run.
  - This is F-232's move.
- **The guard's allow-list, each method with its size and what runs it**: section 8.
- **A checker file edited beyond the three named, or any library, walk or AST edit**: none. The rung edits `Formula.scala`, `TypeAnalyzer.scala` and `TraitTable.scala`, and adds four test files.

## 13. Decisions

1. **The change is a memo of each analyzer's reductions**, not a reordered fold, a shared memo of meets or a shared memo of reductions.
   - A reordered fold changes the formulas it carries, so it can change answers.
   - A shared memo of normalized meets would save 0.21 s.
   - A reduction memo shared across analyzers adds 3,658 hits to 34.56M.
   - Evidence: section 4, probes 1 and 3.
   - No decision of the curator covers the choice among these. P-148 and the coordinator's call on Q2 ask for a pass that changes no result.
2. **The second pass takes the exclusion memo by renamed question, in the analyzer and shared through the table, and the table's two lookups.** It does not take the `maximalCFormulas` rewrite (no gain, section 4) or a halving of the pair test (answers could move). Evidence: the change's JFR (section 5) and the prototypes (section 4).
3. **The exclusion memo renames inference variables apart**, a reuse that the tree had not made before.
   - Ways not taken: keying by the exact question (probe 5: 7.1 s of the 35.8 s), and keying by the environment's text, which is not a faithful key.
   - Evidence: probe 5; the audits' 153,930 and 400,171 exclusion reuses with 0 differences; and the argument in section 4 that the Boolean answer compares variables only by equality.
4. **The exclusion memo keeps answers only from an empty cycle history.** A renaming of a non-empty history would follow the history set's iteration order, which follows identity hashes. Way not taken: keying by the renamed history.
5. **Each new memo has its own switch, default on** (`fortress.analyzer.reduce.cache`, `fortress.analyzer.exclusion.cache`, `fortress.analyzer.typecons.cache`), as the ground memo and the clause memos have. Way not taken: no switch.
6. **The guard keys a method by class and name, and takes the largest size among its overloads**, so the list reads as the probe's names. Way not taken: keying by descriptor, which would list `pCharLiteralContent$1(I)` and the like.
7. **The guard's list holds the twelve methods that the scan finds, `DirectedRoundingTestData` and `MagicNumbers.<clinit>` included**, as the brief asks ("the allow-list is what your scan finds on the base"). Way not taken: leaving out methods that no checked path runs. Whether they should stay is a question for the curator.
8. **I timed the base again in this session**, because the VM restarted (about 11:15) after the earlier base run. The earlier 302 s is given for scale only.
9. **I took the pair on a loaded machine**, after the 30-minute wait that `compiler.md` gives. The skeptic's own timing is the check.
10. **The pass's timed count run is also the brief's post-edit count run**, so the count stage ran three times timed and once more only as an audit.
11. **The ladder subset is the 68 files whose first error in the baseline's `raw/` is a refusal that the solver decides**: an inapplicable call, a body's type, an ill-formed type, an assignment or ascription type, an empty-list crash, or an unreachable typecase clause. The eighteen microGPT components are added. Way not taken: all 141 typecheck-phase files, whose other first errors (names, missing types, syntax) the solver does not decide.
12. **I ran the audit copy as the distance stage too**, because the final code's distance stage lost `:130`. Way not taken: reading the move as F-232's from the count-stage audit alone.

## 14. Defects and their homes

- **The solver reduces the same formula again** (35.1M reductions, 34.4M of formulas already reduced). Home 1: repaired by the change and asserted by `ReductionMemoJUTest.testReductionAskedAgainIsTheFirstAnswer`. It also gets the new row NEW-S-1, in row 730's form, FIXED, as the brief asks (record.md).
- **An exclusion asked again with fresh inference variables is computed again in every analyzer**, and **the trait table walks every type it holds for each declaration search and each type lookup**. Home 1: repaired by the pass and asserted by `ExclusionMemoJUTest` and `TraitTableMemoJUTest`. They are recorded in NEW-S-1's notes, not as rows of their own, since they are faces of the one measured cost.
- I measured no other defect. F-232's move of `:130` is the known fact, not a new defect.

## 15. Commands worked out

- `tmp/rung-solver-speed/run-with.sh`: the count stage with `$EXTRA_CP` ahead of the build and `$EXTRA_JFLAGS` on the checker's JVM, for prototypes, audits and JFR.
- `tmp/rung-solver-speed/dist-run-with.sh`: the distance stage with `$EXTRA_CP` ahead of its shadows.
- `tmp/rung-solver-speed/scan/Scan.java <build> 8000`: lists every method over the limit, with `java.lang.classfile`.
- `tmp/rung-solver-speed/jfr/JfrAgg.java <file.jfr> <incl|self|outer|innermost|depth|lines> [frame]`: aggregates JFR samples without the text dump.
- A count-stage scratch folder must be fresh: a reused one keeps the apis' analyzed caches, and the apis' checks are skipped.

## 16. Other notes

- The harness refused the write of this file and of record.md ("Subagents should return findings as text"). Their text is the run's result, for the skeptic to write onto the branch.
- The first commit, `aaac79b84`, carries the co-author line `Claude Opus 5.5 <noreply@anthropic.com>`, not the skill's `Claude <noreply@anthropic.com>` (`committing.md`). It is pushed, and a force-push is not allowed, so it stays. The later commits carry the skill's footer.
- Cross-rung: rung H's change of the syntax tree's hashes moves the order of the checker's output, which these comparisons on this tree do not see, and H's files do not touch the three files edited here. `NodeReader.readNode` is generated. If H's change shrank it under 8,000 bytes, or pushed another generated method past the limit, `MethodSizeJUTest` would fail on the merged tree, and its list would need the change.
