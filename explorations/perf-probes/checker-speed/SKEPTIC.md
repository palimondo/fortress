<!-- The skeptic's review of fix.patch (the memo on TraitTable for context-free subtype and exclusion
answers, commit c5098915c, which added the patch and REPORT.md) and of REPORT.md's reasoning in §2, §3, §4
and §7. By reading only: the code before the patch from `git show HEAD:<path>` (TypeAnalyzer.scala is
unchanged from 7c9fd1833 to HEAD, so the report's line numbers hold), the change from fix.patch, the
paper under Papers/Types/, the library at HEAD and in the working tree (which holds the held half), and
git. Nothing was built or run, and no file of the tree was touched. Line numbers below are HEAD's unless
marked "patch". -->

# Skeptic's review: the context-free memo on `TraitTable`

## Verdict

**Approved with fixes.** The change is exact by reading: every read of the kind environment, the cycle
history or an analyzer-local memo that a subtype or exclusion computation can make is counted, so an answer
stored as ground is the same in every analyzer over the table. The fixes are two of style and one of test
coverage; none changes an answer, so the gate that is running on the patch as applied stands for the code.
The report's conclusions hold; its evidence falls short in the places §5 names.

## 1. Every read of context is counted

The memo stores an answer only when `TraitTable.contextReads` did not move during the computation (patch,
`TraitTable.scala` hunk at 97, `ground`). The counter is one per table and monotone, so a read anywhere in
the dynamic extent of `pSubInner` or `pExcInner` counts: in nested calls, in the sibling analyzer that
`withClauseParams` makes with `extend` (TypeAnalyzer.scala:818-828, 851-852: same table, same counter),
and in the callbacks that `Formula` makes on the implicit analyzer. I looked for every read in that extent.

**History.** `history` is read at four places, all `history.contains(hEntry)`: TypeAnalyzer.scala:181
(`pSubInner`, variable on the left), :217 (variable on the right), :274 (the `opensSizes` case), :443
(`pExcInner`, variable on the left). The patch puts `traits.readContext()` before each (patch hunks at 178,
214, 271, 440). Nothing else reads the history: the other uses pass it on (`:184`, `:193`, `:220`, `:276`,
`:446-449`) or key the analyzer's memos with it (`:115`, `:414`), and those hits are counted (below).

**Kind environment, static parameters, where clauses.** `env` is used at :820 (`env.contains`, in
`withClauseParams`), :849 (`env.staticParam`, in `staticParam`), :852 and :855 (`extend`, which builds a
new analyzer and reads nothing) and :108 (a debug print). The patch counts :820 and :849 (patch hunks at 817,
845). All four reads of a parameter's bound go through `staticParam` (:185, :202, :221, :447). A where
clause reaches a computation only as bindings of the kind environment (KindEnv.scala:44-57, 118-130), read
through `staticParam`, or as the trait declaration's own clause in `whereSizes` (:754-767), which reads the
trait index, not the context. The static parameters of a trait declaration (`:249-253`, `:585`, `:745`,
`:793`, `:824`, `:833`) are table reads.

**Analyzer-local memos.** A hit in `pSubMemo` (:115) or `pExcMemo` (:414) counts as a read (patch hunks at
112, 411); this is conservative, as the report says. The five normalize memos (:534-538) count a hit only on
an entry whose own computation moved the counter; the patch marks such entries at every write (`:558`,
`:573-574`, `:598-599`, `:602`, `:626-627`, `:641`; patch hunks at 536-635). The marking survives an
overwrite of the same key, since `contextualNorms` is never cleared: conservative again.

**Callbacks from `Formula`.** `and`, `or`, `isTrue` and the solver call back only `lteq`, `subtype`,
`notSubtype`, `excludes`, `notExcludes`, `definitelyExcludes`, `meet`, `join`, `equivalent`, `equiv` and
`ancestors` (Formula.scala:268-276, 318, 375-396, 460-475, 585-595, 623, 668, 806-823). Each reaches
`pSub`, `pExc` or `pNorm`, or reads the table. `Formula.scala` never reads `.env`. The other readers of an
analyzer's `env` (ExclusionOracle.scala:83-129, impls/Common.scala:100, TypeWellFormedChecker.scala:144,
STypeChecker.scala:316 and 327, TypeSchemaAnalyzer.scala:116-254, OverloadingOracle.scala:84-167) run
outside the extent of `pSub` and `pExc`, so they cannot make a stored answer depend on anything.

**What could still hide a read, and does not.** No class extends `TypeAnalyzer`. Every collection that a
case maps over is strict (`List`, `Set`, `zipped`; `Pairs.distinctPairsFrom` on an `Iterable`,
Pairs.scala:32-36), so no `pSub` call is deferred past the `ground` check. A short-circuit in `or` or `and`
cannot hide a read that the answer depends on: a `True` found without reading is `True` under every
context. `openedSizeName` (Formula.scala:148) gives a fresh name per call, so where-sized comprises types
never hit any memo; that loses reach, not exactness. Only the constants `True` and `False` are stored, so
no span of another occurrence can come back (the precedent's caveat in FACTS).

**Misses found: none.** Two oddities are HEAD's, not the patch's, and the memo reproduces them exactly:
`exc(t, s)` at :431, :434 and :451 drops `negate`, and the case at :175-177 answers `True` whatever
`negate` is. Neither reads context, and neither is in scope here.

## 2. The memo's lifetime and key

- A `TraitTable` is made once per compilation unit per phase: StaticChecker.java:213, Desugarer.java:121,
  CodeGenerationPhase.java:81 and 179, typechecker/OverloadingChecker.scala:74,
  overloading/OverloadingChecker.scala:52, AbstractMethodChecker.scala:58, and TypeParser.scala:173 for the
  unit tests. `typeCons` depends on the table's `current` unit (TraitTable.scala:34-72), so the table is the
  right scope, and no table is shared across units. The index and the global environment are built before
  the table (StaticChecker.java:211-213) and the checker does not add to them: an object expression is
  rewritten by `removeSelf` (:503-516), not indexed.
- The key `(sub, x, y, negate)` uses the same `Type` equality as the local memos (:97, :409). Two scopes'
  parameters named `T` share a key; that is safe only because every path that touches a variable's bound
  counts (:179-235, :439-451), which is the property the `XXX` test pins.
- The switch: `ProjectProperties.getBoolean("fortress.analyzer.ground.cache", true)` (patch,
  TraitTable.scala hunk at 97), default on, as §6 says. Off, the code takes HEAD's path plus the counting,
  which changes no answer.

## 3. The tests pin what they claim

**`XXXBoundCheckSameNameTwoScopes`.** `TypeWellFormedChecker` walks the AST in source order
(TypeWellFormedChecker.scala:34-36), extending the analyzer for each generic declaration (:107, :116), so
`f` is checked before `g`, both over one table. In `f`, `T <: K` is computed by :179-207 with `staticParam`
read: not stored. In `g`, it is computed again and refused at :162-166 with the pinned message (the `.test`'s
`WIcontains` collapses the message's newline and indentation). If the read on the variable-on-the-left path
(:181 or :185) went uncounted, `f`'s `True` would be stored, `g` would be accepted, the compile would
succeed, and the harness would report "Missing expected failure" (FileTests.java:395-411): red. So the test
pins that path, and the memo's sharing scope.

- It pins only that path. The reads at :217 (variable on the right), :274 (`opensSizes`), :443
  (`pExcInner`), :820 (`withClauseParams`), and the counting of local-memo and normalize-memo hits are not
  pinned: with any one of them alone uncounted the test stays green, because every route to a variable's
  bound in this program passes :181-185. I could not write, by reading, a small program that makes a shared
  answer wrong through one of those sites alone; the paths through them also pass the pinned site. A pin
  for the local-memo hit needs a question whose only contact with `T` is a sub-question already in the
  analyzer's memo (a union or intersection with `T` as one member); such a test is the one fix of coverage
  I recommend, as a follow-up.
- §8 reports the broken variant as "Saw failure, but did not satisfy compile_err_contains". By reading, an
  uncounted read gives "Missing expected failure" (above). So the variant that was run failed in some other
  way, which the report does not show. The test is red on it either way; the demonstration of *which* wrong
  answer made it red is incomplete.

**`OverloadTwoBoundsClosedFamily`.** Its three pairs are valid by the rules: `ZZ32` and `String` exclude;
`P` excludes `Q` through `comprises` and the object rule (:454-471); `T extends { K, R[\T\] }` excludes `L`
because `L </: R[\T\]` (:466-467, negated). It pins the family's answers and the dispatch, not exactness, as
§8 says. The assertions cite the specification by file and section, as tests-writing.md asks.

## 4. Style and scope

The patch follows the precedent (TraitTable.scala:81-97 at HEAD; FACTS, "`TypeAnalyzer.parents` and
`excludesClause` are memoized per trait table"): a `private final val` switch under `fortress.analyzer.*`,
a `ConcurrentHashMap`, `putIfAbsent`. It changes nothing beyond §6's list; the two files' hunks are the
memo, the counting and the marking. `CFormula`, `True` and `False` are top-level in the table's own
package (Formula.scala:36-47), so no import is needed. Three departures:

1. **A public mutable counter.** `var contextReads = 0L` (patch, TraitTable.scala hunk at 97) is public
   state on the table, read by `TypeAnalyzer` at eight places (seven `val before = traits.contextReads`
   snapshots and `markNorm`'s comparison). The
   precedent keeps its state private behind two methods. Fix: `private var`, with `def readContext()` and a
   `def reads: Long`, or a `def snapshot()`/`def unchangedSince(n)` pair, so the table owns the invariant.
2. **A side effect inside a pattern guard.** `if { traits.readContext(); !env.contains(n) }` (patch,
   TypeAnalyzer.scala hunk at 817) counts once per variable argument and hides the read in a guard. Fix:
   count once before the `collect`, or in a small `def inScope(n)` that counts and tests.
3. **An inconsistent concurrency claim.** The comment says "the checker runs on one thread" while the memo
   is a `ConcurrentHashMap` with `putIfAbsent` for a race. The checker is single-threaded (no `par`,
   `Thread` or `Future` under scala_src/typechecker, types or overloading), so the counter is sound; the
   map's form is the precedent's. Fix: say in the comment that the map's form follows the precedent, or
   drop the one-thread remark.

Minor: `staticParam`'s new body puts the closing brace on the expression's line (patch hunk at 845).

## 5. The report's reasoning

### 5.1 §2, the hot path: follows from the code

Each step of the named path is at the cited line at HEAD: `TypeWellFormedChecker.scala:162` →
`subtype` (:86) → `pSub` memo (:97, :113-121) → variable on the left (:179-207), `pNorm` of the bound list
(:193, :659) → `walkOtherTypeInner` (:650-653) → `normConjunct` (:663-668), which tests each type that
`Number`'s clause lists against each conjunct with `dExc` (:388) → `pExc` (:417) → `pExcInner` (:487),
`checkCC`/`cCC` (:458-464), `checkO`/`cO` (:465-471) → `pSub(object, MultiplicativeRing[\T\])` negated
(:467) → the same-generic case (:239-261), `pEqv` (:258, :335, :344) → variable on the right (:215-235),
which normalizes the bound list again under a history one entry longer (:220, :224). The history grows
only at :184, :220, :276 and :446, and the memo keys carry it (:97, :409), so a question is recomputed once
per history, as claimed. The nesting of about nine is one entry for the query itself plus one per number
type `X` that extends `MultiplicativeRing[\X\]`: `RR64` (FortressLibrary.fsi:297), `QQ` (:395), `ZZ`,
`ZZ64`, `ZZ32`, `NN64` through `Integral` (:446), `NN32` (FortressBuiltin.fsi:131), `RR32`
(FortressBuiltin.fsi:47-48): eight types, where §3 says "at most 9 such questions, one per number type".
The counts themselves (25,771 computations, 2,462 questions, 25,810 analyzers, 201,841 analyzers) come
from instrumented copies that are not committed, so they cannot be re-derived from the repository; the
report says so in its header. The self-time claims (`removeSelf` :424 and :515 on both arguments of every
`pExcInner`; `substitute` in the unmemoized `comprisesClause` and `comprisedTypes`, :747, :809) are
consistent with the code.

### 5.2 §3, "implementation, not rule": right, with two gaps in the argument

- The rules are cited correctly: bound variables (fig-subtype.tick:68-80), intersection on the left with
  the exclusion premise (:33-37), the negative judgment for a variable on the right
  (exc-constraints.tick:141-147), the meet as plain intersection (fig-meet.tick:7-12), exclusion as four
  sub-relations (fig-exclusion.tick:80-130). "The rules normalize nothing" is right for types; the paper
  normalizes only constraint formulas, to disjunctive normal form (exc-constraints.tick:55), which the
  report does not mention.
- "A few thousand questions, polynomial" is a count of *distinct judgments*, and it holds. But "each needed
  once" presumes a memo of judgments, which the paper does not describe; and the paper's rules as written
  loop on this family (`Number ≬ MultiplicativeRing[\T\]` → comprises → `RR64 ≬ MultiplicativeRing[\T\]` →
  parametric → `RR64 ≢ T` → `T <: RR64` → `Δ(T) <: RR64` → intersection on the left → `Number ≬
  MultiplicativeRing[\T\]` again). "A cycle, which the algorithm must cut" is the report's own inference:
  Papers/Types/*.tick has no word on termination, cycles or memoization (grep), and the decidability it
  cites (exclusion.tick:158-164, after Kennedy and Pierce) is for nominal subtyping without exclusion. The
  conclusion stands, that the paper's distinct questions are polynomial here and the checker's
  recomputation is not the paper's doing, but its source is the report, not the paper.
- The exponential worst case is stated as `2^k` with "k ≈ 9 number types". The history's entries are
  `(negate, isSub, s, t)` tuples (:71, :180, :216, :273, :442), so `k` is the number of distinct entries a
  path can add, at least nine here and not a count of types; the bound is valid and loose. The argument
  that it is unreached is right by the code: `pNorm` of the bound list under a longer history hits
  `normalizeOtherTypeMemo`, keyed by the type alone (:637-641), so a later descent stops at once. The
  counts agree, about ten computations per distinct question (25,771 / 2,462) and "once per history size
  from 1 to 9" for the 272 member exclusions, not 2^9: supported, with the caveat of 5.1 that the counts
  are not reproducible from the tree.
- The third cause, a fresh analyzer per scope, is verified: TypeWellFormedChecker.scala:107 and :116,
  OverloadingOracle.scala:84-85 and :166-167, TypeSchemaAnalyzer.scala:129-370 (`extend` at 129, 136, 169,
  170, 185, 192, 207, 228, 348, 370).

### 5.3 §4, the team's word: citations accurate; one relevant source missed

Each citation is at the line given: exclusion.tick:158-164, introduction.tick:338-340,
overloading-check.tick:22, conclusion.tick:1 and :8; TypeAnalyzer.scala:171-172 and :284; 59fdeff62 (Steele,
2012-06-06, the union-on-the-right case with `comprisedTypes`); 9ac5af540 (2011-12-05) holds `pSubMemo`
keyed with the history; Papers/Welterweight/introduction.tick:26-27, dispatch.tick:367, :448 (commented
out), :450-452; research/extracts/ParkPOPL2019-extract.md:126-130; fortress-websites-wayback.md:96-113.
`Specification/` has no cost word (grep for exponential, polynomial, complexity, running time, cost of:
nothing). Papers/Types/journal/ holds only the return-type-rule justification. Missed: the team's own word
on *this* cost is in the analyzer itself. The eight switchable caches (:63-69) and the comment "moved up
before cache for speed" (:131) show the team tuned these memos for speed, which is the nearest thing to a
statement on the checker's cost that the tree holds.

### 5.4 §7, the measurements: pairs properly taken, conclusions proportionate, with three caveats

- Each pair ran one after the other in one session, one variable apart (the fix's classes first on the
  classpath); the start times and durations chain (01:19 + 1,432 s = 01:43; 01:49 + 4,551 s = 03:05;
  01:05 + 303 s = 01:10), and the machine is named as records.md asks.
- Caveats. (a) Every run but one started at load about 1.0 on four CPUs: another session's process was
  running throughout, so the machine was not idle; the report discloses it and does not claim otherwise.
  (b) The base pair is not clean: its arms started at loads 0.31 and 1.22, and the script of the first arm
  was edited while it ran, which can alter a running shell script. The report calls the base time "measured
  once" and draws no ratio from it; it should not be quoted as a pair. (c) One run per arm, no repetition.
  The held-half ratios (1,432/371, 4,551/1,885, 3,674/1,032) are far above any load effect, so the
  conclusions of §1 and §7 are proportionate; the 819 s comparison is correctly marked as not a pair.
- "Answers identical site by site" is supported: identical tables and error lines, `errors.tsv` identical,
  the one difference in order explained by hash order, which I verified (none of the 34 classes under
  compiler/index/ defines `hashCode`), and the held-half-out table byte-equal to the landed gate's. The
  audit's 22.3 million is 1,655,023 + 20,637,255. The audit recomputes a hit in the fixed run's own
  analyzer, whose local memos the fix populated differently from HEAD's run; that is still HEAD's function
  at that point, since local values are deterministic given the history, but the byte-equal tables are
  the stronger evidence.

## Findings, with fixes

| # | finding | where | fix |
|---|---|---|---|
| 1 | Public mutable counter on the table | patch, TraitTable.scala hunk at 97, `var contextReads` | make it private; expose `readContext()` and a read-only accessor or an `unchangedSince` test |
| 2 | Side effect in a pattern guard | patch, TypeAnalyzer.scala hunk at 817 | count before the `collect` |
| 3 | Comment claims one thread beside a race-safe map | patch, TraitTable.scala hunk at 97 | say the map's form follows the precedent |
| 4 | `XXX` test pins one of the counted sites; the local-memo-hit counting is unpinned | compiler_tests/XXXBoundCheckSameNameTwoScopes | a second refusal test whose only contact with `T` is a memoized sub-question (follow-up) |
| 5 | §8's broken-variant verdict does not match the failure mode an uncounted read gives | REPORT.md §8 | say what the variant shared and what error it printed |
| 6 | §3's "at most 9, one per number type" is eight types plus the query's own entry; `k` is entries, not types | REPORT.md §3 | reword; the bound and the conclusion stand |
| 7 | §3's cycle cut and "each needed once" are the report's inference, not the paper's | REPORT.md §3 | say so; cite the paper's silence |
| 8 | §7's base pair (303 s → 242 s) is confounded by load and a mid-run script edit | REPORT.md §7 | keep it as a single measurement, not a pair |
| 9 | §4 misses the team's own speed tuning of these memos | TypeAnalyzer.scala:63-69, :131 | add the citation |
