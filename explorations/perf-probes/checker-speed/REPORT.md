<!-- Why the compiled checker becomes many times slower when the one library's array family is bounded
`T extends { Number, MultiplicativeRing[\T\] }`, whether the cost is the rules' or the checker's, and a
prototype fix that keeps every answer. For the curator; a prototype outside climb batch 13, which held fork 2's
library half (d3d31b5b2) for this cost (row 688). Method: a throwaway worktree of main at 7c9fd1833 seeded from
the main tree, d3d31b5b2's two library files applied, and taken out for the base runs; JFR on the count stage's
checker; instrumented copies of TypeAnalyzer.scala for the counts; the fix compiled with the build's scalac into
a shadow folder put ahead of ProjectFortress/build on the classpath. The copies of the two stage scripts that
ran differ from the tracked ones only by that classpath prefix, a longer time limit and a timestamped copy of
the checker's output. Nothing tracked on main was modified. fix.patch beside this note is the fix and its two
tests, against 7c9fd1833 (main's code was unchanged through c5098915c); it applies with `git apply`. The worker's
write of this file was not made; the coordinator wrote it from the worker's returned text, word for word. -->

# The checker's slowdown under the two-trait array bound

## 1. In short

- **Implementation, not rule.** The rules need each question about `Number`'s closed family once per trait
  table: a few thousand questions, polynomial in the family's size. The checker asks them many times over, for
  two reasons.
  - Each memo key carries the whole cycle history. So a question that names no type variable is computed
    again at every depth of the cycle on `T`, about 9 times per query.
  - The memos live on one analyzer. The checker builds a fresh analyzer for every generic declaration and
    every overload comparison: 201,841 in one run of the count stage.
- **Exponential: not met.** The history-keyed memo could reach 2^k histories per question (k = 9 here). It does
  not reach them, because the per-analyzer normalize memo cuts the cycle short.
- **The fix.** One memo on `TraitTable` shares every True or False answer whose computation read neither the
  kind environment nor the cycle history. Two Scala files, 67 lines added and 20 removed.
- **Times, held half on.** Count stage 1,432 s → 371 s. Distance stage 4,551 s → 1,885 s; its `FortressLibrary`
  3,674 s → 1,032 s.
- **Answers.** Identical site by site in both stages. An audit recomputed 22.3 million memo hits without the memo
  and found no mismatch.

## 2. The hot path

**Where the time goes (JFR, deep stacks, the count stage's checker, held half on).** Lines are
`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala` at 7c9fd1833.

- In the first minute of `checkApi FortressLibrary` (5,338 samples), 88% start in the well-formedness check of
  a static argument against its bound.
  - The call is `TypeWellFormedChecker.scala:162`, `analyzer.subtype(arg, bound)`, into `subtype` (`:86`).
- The path then runs as follows:
  - `pSub` (`:118`): the memo, keyed by `(x, y, negate, history)` (`:97`, `:113-121`).
  - `pSubInner`, with a variable on the left (`:193`, `:207`): `stdResult` normalizes the variable's bound list
    with `pNorm` (`:659`), into `walkOtherTypeInner` (`:652`) and `normConjunct` (`:663-667`).
  - `normConjunct` tests every type that `Number`'s comprises clause lists against every conjunct, with `dExc`
    (`:388`).
  - `pExc` (`:417`), then `pExcInner` (`:487`). `checkCC` and `cCC` (`:461-463`) descend each listed type's own
    comprises clause. For an object, `checkO` and `cO` (`:467-470`) ask whether it is a subtype of
    `MultiplicativeRing[\T\]`, negated.
  - `pSubInner` (`:260`): the same generic, so `cmp` and `pEqv` (`:258`, `:335`, `:344`) ask `X ≡ T`.
  - `pSubInner`, with the variable on the right (`:224`): it normalizes `T`'s bound list again, under a history
    one entry longer.
- Inclusive shares of the samples: `pExc` 89.7%, `pSubInner :207` 88.1%, `checkCC` 87.6%, `pNorm` 86.1%,
  `normConjunct` 78.7%, `pEqv` 78.1%, `checkO` 76.8%, `pSubInner :224` 75.3%.
- Depth: up to 9 nested `normConjunct` frames and 24 nested `pExcInner` frames in one sample.
- Self time is 69% in the AST `Walker`:
  - `removeSelf` (`:515`), which `pExcInner` applies to both its arguments: 36%.
  - `TypeAnalyzerUtil.substitute`: 27%.
- The recording's last 429 s (38,546 samples; JFR's default 250 MB cap kept only those) add the overloading
  checker's entries: `TypeSchemaAnalyzer.reduceED` → `equivalent`, `satisfiesReturnTypeRule` → `meet`,
  `Formula.minTypes` and `tContradiction` → `meet`, `forcedArgs` → `subtype`. These are the callers that the
  rung's thread dumps named (FACTS, "The compiled checker keeps a type parameter's bound list as it is ...").

**How often the same question is recomputed, and with which inputs (instrumented copies, held half on).**

- **One query traced:** the first `T <: MultiplicativeRing[\T\]` in the environment
  `T extends { Number, MultiplicativeRing[\T\] }, nat s0`, from the well-formedness check.
  - 25,771 computations, that is memo misses, of 2,462 distinct questions `(x, y, negation)`.
  - 2,275 of those questions name no type variable. They take 23,331 computations, 90.5% of the total.
  - Examples: `Number` not below `QQ`, 58 times; `Object` not below `MultiplicativeRing[\T\]`, 64 times. Each of
    the 272 ordered exclusions between the family's 17 types (for example `ZZ64` against `ZZ32`) runs 9 times,
    once per history size from 1 to 9.
  - Within the query: 9 `normConjunct` calls and 55 normalize-memo hits.
- **A 300 s run**, all but its first ~20 s inside `checkApi FortressLibrary`:
  - 25,810 analyzers were created.
  - `pSubInner`: 6,313,604 computations of 66,854 distinct questions. `pExcInner`: 648,628 of 7,733.
  - History size at `pSubInner`: 0 for 439 K computations, 1 to 9 for 374 K to 923 K each.
  - `T <: MultiplicativeRing[\T\]` was asked 270 times, each in a fresh analyzer, at 6,435 inner computations
    apiece. `T <: Number` was asked 188 times, at 3,759 each.
  - `normConjunct([Number, MultiplicativeRing[\T\]])` ran 828 times.
- **The whole count run with the fix:**
  - 201,841 analyzers.
  - `pSubInner`: 1,315,237 computations of 529,443 distinct questions; 309,386 once the overloading oracle's
    alpha-renamed parameters are identified.
  - `pExcInner`: 223,743 computations of 51,252 distinct questions (29,101 up to renaming).
  - `T <: MultiplicativeRing[\T\]`: 284 inner computations per fresh context, against 6,435 before.

**What remains after the fix (JFR, 34,846 samples).**

- Inclusive shares:
  - the overloading checker: 62%;
  - `TypeSchemaAnalyzer`: 72%;
  - `TypeAnalyzer`: 45%, of which `normConjunct` 33%. These are the questions that do depend on `T`, asked
    again in each analyzer and at each history depth;
  - `STypeChecker`: 27%.
- Tree walks make up 82% of the samples:
  - `STypesUtil.clearStaticParams`, from `syntacticEq` and `reduceED`: 19%;
  - `STypesUtil`'s replacer: 16.5%;
  - `removeSelf`: 14.5%;
  - `TypeAnalyzerUtil.substitute`: 9%;
  - `staticReplacer`: 8.8%.

## 3. What the rules require, and what the checker computes

**The rules: the type paper's algorithm (`Papers/Types/`, OOPSLA 2011).**

- **Subtyping** (`fig-subtype.tick`, "Bound Variables"):
  - `X <: T` holds if `Δ(X) <: T`.
  - `S <: X` holds if `S <: Bottom`.
  - `S ∩ T <: U` holds if `S <: U`, or `T <: U`, or `S` excludes `T`.
- **The negative judgment** (`exc-constraints.tick:132-170`): `S` is not below `X` if `S` is not below `Δ(X)`.
- **The meet of two existential types** is the plain intersection of their bodies (`fig-meet.tick`). The rules
  normalize nothing.
- So `T <: MultiplicativeRing[\T\]` is answered by the second conjunct of `Δ(T)`, and `T <: Number` by the first,
  each in one step.
- **Exclusion of two constructed types** (`fig-exclusion.tick`) is the disjunction of four sub-relations:
  - excludes clauses of ancestors;
  - comprises: every listed type excludes the other;
  - object: an object excludes every type it does not extend;
  - parametric: the same generic at arguments that are not equivalent.

**The sizes.** The brief listed four types for `Number`'s clause; the api lists five.

- `Number comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }` (`Library/FortressLibrary.fsi:286-287`).
- `RR64 comprises { Float, FloatLiteral }` (`:296-299`).
- `AnyIntegral comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` (`:441`).
- `ZZ`, `ZZ64`, `ZZ32` and `NN64` each list one object: `BigNum`, `Long`, `Int`, `UnsignedLong`.
- `NN32`, `RR32` and `IntLiteral` are objects (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`). `QQ`
  comprises `{ ... }`.
- In all, n = 17 family types, 10 of them leaves.
- The held half writes the two-trait bound on 29 lines of the component and 32 of the api. It writes
  `{ Number, AdditiveGroup[\T\] }` 4 and 4 times, and the `StandardMin` and `StandardMax` forms 2 and 2 times
  each.

**The worst case by the rules, for one variable bounded by `{ Number, MultiplicativeRing[\T\] }`.**

- The comprises rule descends the family's tree once: at most 16 questions "`MultiplicativeRing[\T\]` against a
  node".
- Each object leaf needs the object rule: a walk over its ancestors (about 10 to 15). At its own
  `MultiplicativeRing[\X\]`, the leaf asks `X ≢ T`. Through `Δ(T)` that question comes back to itself: a cycle,
  which the algorithm must cut. There are at most 9 such questions, one per number type `X` that extends
  `MultiplicativeRing[\X\]`.
- Comparing the two families of ancestors adds about 5 × 15 pairs per listed type.
- The 272 ordered member-against-member exclusions depend on the table alone, so they are needed once per table.
- Total: a few thousand questions, each needed once, about n² + n·a with a ≈ 15 ancestors. That is polynomial.

**What the checker computes.**

1. **Normalization before every question on `T`.** Before any subtype or exclusion question on `T`, it
   normalizes `Δ(T)` (`:193`, `:224`, and the variable case of `pExcInner`). `normConjunct` expands `Number`
   into the union of the listed types that no conjunct excludes. `IntLiteral` excludes
   `MultiplicativeRing[\T\]`, so the expansion happens. This normalization is the implementation's addition to
   the paper's rules.
2. **History in every key.** Its memos key each question with the whole cycle history (`:97`, `:113-121`,
   `:409-418`). The cycle on `T` nests about 9 deep. So a question asked at depth d is computed again at each
   depth (§2).
3. **A fresh analyzer for each scope.** The memos live on one analyzer, and the checker makes a new one for
   every scope:
   - every generic declaration (`TypeWellFormedChecker.scala:107`, `:116`);
   - every overload comparison, with its parameters renamed apart (`OverloadingOracle.scala:84-85`, `:166-167`);
   - every schema operation (`TypeSchemaAnalyzer.scala:129-483`).

   So every one of them starts with empty memos.

**Verdict: the observed cost follows from recomputation, not from the rules.**

- The keying's worst case is exponential. The history is a set, so a question can be keyed under every subset
  of the cycle entries met on the way: up to 2^k histories per question, with k ≈ 9 number types here.
- That worst case is not met. The per-analyzer normalize memo is keyed by the type alone (`:538`, `:637-641`). So
  once the deepest normalization of `Δ(T)` finishes, every later one reuses it, and the lateral exploration
  stops.
- The observed cost is questions × about 9 depths × analyzers.

## 4. The team's own word

**On static checking.**

- *Type Checking Modular Multiple Dispatch with Parametric Polymorphism and Multiple Inheritance* (Allen,
  Hilburn, Kilpatrick, Luchangco, Ryu, Chase, Steele; `Papers/Types/`):
  - Subtyping is decidable, after Kennedy and Pierce (`exclusion.tick:158-164`).
  - The existential model "has made overloaded generic functions in Fortress both tractable and effective"
    (`introduction.tick:338-340`).
  - "The algorithm we describe is sound but not complete" (`overloading-check.tick:22`).
  - Checking generic functions "adds complexity not required for similar checks on monomorphic functions"
    (`conclusion.tick:1`).
  - Variance would "add additional complexity to polymorphic exclusion checking" (`conclusion.tick:8`).
- No paper, specification note or commit message gives a running cost for checking exclusion, meets or
  `comprises`. A search of `Specification/` for cost words finds nothing on it.
- The analyzer's own comments:
  - "Getting the bound out of a type variable is the only place where a type can increase in size during type
    checking. We use the history to ensure termination" (`TypeAnalyzer.scala:171-172`).
  - The comprises disjunct of trait subtyping is commented out with "Gets a stack overflow error; maybe we don't
    need this in practice. GLS 6/6/12" (`:284`).
  - Steele's commit 59fdeff62 (2012-06-06) added comprises reasoning for a union on the right.
  - The history-keyed memos are already in the oldest surviving copy of the file (9ac5af540, 2011-12-05). The
    conversion's cut parent links lose the earlier history.

**On run time only.**

- *Dynamic Dispatch and Type Inference Semipredicates* (Chase, Hilburn, Luchangco, Naden, Ryu, Steele, Tristan;
  `Papers/Welterweight/`):
  - "We characterize cases in which exponential search may be required and argue that they are unlikely to arise
    in practice" (`introduction.tick:26-27`). This concerns applicability tests at run time.
  - Contravariance "creates the possibility of a combinatorial blowup in constraint matching" (`dispatch.tick:367`).
  - A commented-out remedy: "Canonicalization reduces malformed intersections to bottom ... This avoids the
    combinatorial blowup" (`:448`).
  - A "No union types" alternative (`:450-452`).
- Park, Hong, Steele and Ryu, POPL 2019, accept "the potential for exponential blowup" at run time
  (`research/extracts/ParkPOPL2019-extract.md:126-130`).
- The wind-down post names the type system's mismatch with the VM (`research/extracts/fortress-websites-wayback.md`,
  "The wind-down announcement").

## 5. The peers

**Scala 3** (3.5.0).

- `TypeComparer` keeps no cache of subtype answers between calls.
- After 50 nested calls (`Config.scala:206`, `LogPendingSubTypesThreshold`) it switches to `monitoredIsSubType`
  (`TypeComparer.scala:245-283`, `:1555-1557`). There, a pair already pending answers false: an inductive cut,
  like Fortress's history, but only deep down.
- Caches sit on types and symbols: `baseTypeCache` (`SymDenotations.scala:1832`).
- The pattern matcher's space engine handles sealed families. It caches `isSubspace` answers and the simplified
  form on each space object (`transform/patmat/Space.scala:51-60`).
- https://github.com/scala/scala3/tree/3.5.0/compiler/src/dotty/tools/dotc

**TypeScript** (v5.6.2, `src/compiler/checker.ts`).

- One relation cache serves the whole program. Its key is the pair of type ids (`getRelationKey`, `:24556-24566`).
- For generic references, an unconstrained type parameter is replaced by its position, so renamed generics share
  an entry. A constrained one keeps its identity, because its answer depends on its constraint (`:24517-24547`).
  This is the same condition as the fix's: share only answers that read no bound.
- Cycles: a pair already being compared answers `Maybe`, "related with assumptions" (`:22780`). "A false result
  goes straight into global cache (when something is false under assumptions it will also be false without
  assumptions)" (`:22867`). A true one is stored only when the outermost comparison resolves
  (`resetMaybeStack`, `:22875`).
- Limits:
  - a relation budget (`:21832`);
  - depth 100 on the comparison stacks (`:22793`);
  - `isDeeplyNestedType` with depth 3 (`:24632`);
  - instantiation depth 100 and count 5,000,000 (`:20484`);
  - an intersection of unions whose cross product reaches 100,000 is an error: "Expression produces a union type
    that is too complex to represent" (`:18254-18262`).
- https://github.com/microsoft/TypeScript/blob/v5.6.2/src/compiler/checker.ts

**Kotlin** (v2.0.0, `AbstractTypeChecker.kt`).

- Kotlin has no union types in the language. Its guards are an argument depth above 100 (an error, `:43-52`) and
  a visited set per supertype walk, with an error past 1,000 supertypes (`:128-145`).
- Sealed families are enumerated only for `when` exhaustiveness.
- https://github.com/JetBrains/kotlin/blob/v2.0.0/core/compiler.common/src/org/jetbrains/kotlin/types/AbstractTypeChecker.kt

**Ceylon.** Canonical forms are built once, when the type is made (`ModelUtil.java:1202-1280`).

- `addToIntersection` drops supertypes.
- It collapses a disjoint pair to `Nothing`, by disjointness of declarations, using the enumerated `of` cases.
- It merges instantiations of one generic into a principal instantiation.
- Later checks work on that canonical object.
- https://github.com/eclipse-archived/ceylon/blob/master/model/src/org/eclipse/ceylon/model/typechecker/model/ModelUtil.java

**Julia** (v1.11.0, `src/subtype.c`).

- Union choices are explored with a bit stack (`Lunions` and `Runions`, `:101-102`). Its worst case is exponential
  in the number of unions.
- A sub-formula with no free type variables is answered on its own, outside the current environment ("fast path
  for separable sub-formulas", `:1219`; `:1562-1565`). This is the fix's idea.
- `obviously_disjoint` (`:451`) is a cheap exclusion test.
- https://github.com/JuliaLang/julia/blob/v1.11.0/src/subtype.c

**Rust.** The new trait solver's search graph keeps two caches: a global cache, which "has to be completely
unobservable", and a per-cycle provisional cache. Results that depend on a cycle head still in progress are not
moved to the global cache. https://doc.rust-lang.org/nightly/nightly-rustc/rustc_type_ir/search_graph/index.html

**Muehlboeck and Tate**, OOPSLA 2018, "Empowering Union and Intersection Types with Integrated Subtyping". They
normalize only the left-hand type into disjunctive normal form, with an "intersector" that maps a disjoint
intersection to ⊥. This is the same kind of step as the checker's `normConjunct`.
https://www.cs.cornell.edu/~ross/publications/empower/

**Swift.** Slava Pestov, "Roadmap for improving the type checker", Swift Forums, 2025-10-30,
https://forums.swift.org/t/roadmap-for-improving-the-type-checker/82952

- Swift turns overload resolution into constraint solving. It has one disjunction per overloaded name, and trying
  their combinations is exponential in the worst case. The post says that "it will always be possible to write
  down a short program that would require an inordinate amount of time to type check, so the type checker must
  limit the total amount of work".
- The limits: a counter of disjunction choices per expression, giving up above one million; a 512 MB solver
  arena; a wall-clock limit, off by default because it is not deterministic across machines.
- Swift 6.2 optimized backtracking and graph algorithms such as connected components. On one project, type
  checking went from 42 s to 34 s.
- Swift 6.3 snapshots add optimized disjunction selection (12 s on that project) and overloads prepared once in
  the arena, behind `-solver-enable-prepared-overloads` (10 s).
- Plans: overhaul the bindings; remove old performance hacks; cheaper partial solutions; perhaps prune
  protocol-requirement witnesses such as `Equatable.==` from operator overload sets, which may break source and
  so would need a language mode; perhaps require a decimal point in a float literal; and, longer term, SAT-style
  clause learning.
- **Not the same shape.** Swift searches a space of overload choices times literal types, where each choice
  constrains the rest. The cost is inherent, so it needs limits, pruning and better search. Fortress's checker
  here asks fixed questions about named types, each with one answer. The cost is the same questions computed
  again, and sharing the answers removes it without limits or heuristics. Fortress could meet Swift's shape at
  call sites that mix overloaded operators with numerals that need coercion, but this case is not that.

**Across the peers.**

- Answer caches are keyed by the types alone (TypeScript, Scala's space engine). Fortress's key also carries the
  history, and its cache is per analyzer.
- Answers that depend on in-progress assumptions are kept local (Rust, TypeScript's true results), or are shared
  where the assumption cannot change them (TypeScript's false results).
- Ground sub-questions are answered outside the context (Julia).
- Canonical forms are built once (Ceylon, Scala's space objects).
- Depth and fuel limits (TypeScript, Kotlin, Swift, Scala's monitored mode) bound the cost by giving up, which
  changes answers. Fortress does not need them here, because the cost is polynomial once questions are shared.

## 6. The fix

**What it does.**

- `TraitTable` gains:
  - a map keyed by (subtype or exclusion, `x`, `y`, negation);
  - a counter `contextReads`;
  - the switch `fortress.analyzer.ground.cache`, default on, beside rung M's `fortress.analyzer.clauses.cache`.
- `pSub` and `pExc` consult the table's map first. On a miss they compute as before and store in the analyzer's
  memo as before. They also store the answer in the table's map when the computation made no context read and
  the answer is `True` or `False`.
- **What counts as a context read:**
  - every history lookup: the two variable cases of `pSubInner`, its `opensSizes` case, and the variable case of
    `pExcInner`;
  - `staticParam`;
  - `withClauseParams`' test `env.contains`;
  - a hit in the analyzer's own history-keyed memo;
  - a hit on a normalize-memo entry whose computation made a context read. All five normalize memos record which
    of their entries those are.

**Why every answer stays the same.** A computation that made no context read took no branch on the history or
the environment, and every memo value it used was itself context-free. So any analyzer over the table, asking the
same question under any history, computes the same answer. The shared answers are the two constants, so no span
from another occurrence can come back with a hit.

**Size.** Two files.

| file | added | removed |
|---|---|---|
| `scala_src/typechecker/TraitTable.scala` | 16 | 0 |
| `scala_src/types/TypeAnalyzer.scala` | 51 | 20 |

The tests add 60 lines in four files. `fix.patch` is 308 lines in all.

**The precedent.** FACTS, "`TypeAnalyzer.parents` and `excludesClause` are memoized per trait table": an earlier
slowdown (87% of samples in `TypeAnalyzerUtil.substitute`) was cured by a 14-line memo on `TraitTable`, with no
answer changed. This fix applies the same idea to subtype and exclusion answers. Unlike `parents` and
`excludesClause`, these may depend on context, so the condition is checked at run time.

## 7. Measurements

Machine for every timing: nproc=4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; openjdk 25.0.4.1;
`FORTRESS_THREADS=1`. Each pair ran in one session, one run after the other, with nothing else of mine running.

| run (start, UTC, load at start) | without the fix | with the fix |
|---|---|---|
| count stage, held half on (01:19, 1.01; 01:43, 1.00) | 1,432 s; `checkApi FortressLibrary` 1,159 s; component 178 s | 371 s; 174 s; 108 s |
| distance stage, held half on (01:49, 1.04; 03:05, 1.00) | 4,551 s; `FortressLibrary` 3,674 s | 1,885 s; 1,032 s |
| count stage, held half out (01:05, 0.31; 01:10, 1.22) | 303 s | 242 s; `checkApi FortressLibrary` 74 s; component 79 s |

- With the fix, the held half's count stage (371 s) is inside the stage's 900 s limit.
- Batch 13's landed gate measured the distance stage's `FortressLibrary` at 819 s (another session, not a pair).
- In the base pair, the run without the fix lost its table step: I edited the copied script while it ran. Its
  checker output is complete, and its error lines equal the fixed run's.

**Answers, site by site.**

- **Count stage, held half on:** the two tables are identical, and so are the checker's error lines. Both runs
  report one error, `FortressLibrary.fss:1311:10: Missing parameter type for i`.
- **Distance stage:**
  - `errors.tsv` is identical, 86 rows as sorted.
  - The tables are identical except for `#seconds` and `#machine`: `#total 85` both.
  - The whole outputs are identical except that two overloading errors at `FortressLibrary.fss:3097`
    (`distribute`, against `:3285` and `:3287`) came out in the opposite order.
  - Why the order can change (by reading): the overloading checker iterates Scala sets of index objects, and no
    class in `compiler/index/*.java` defines `hashCode`. So that order is not fixed between runs.
- **Held half taken out, under the fix:** the table equals `explorations/compile-ladder/climb-batch-13/gate/checker-count.txt`
  byte for byte.
- **Audit.** A variant recomputed every hit in the table's map without the map, in the analyzer and history
  where it was asked, and compared the two answers.

  | library | hits audited | mismatches |
  |---|---|---|
  | base (held half out) | 1,655,023 | 0 |
  | held half on | 20,637,255 | 0 |

  The audited runs' tables equal the fixed runs' tables.
- **Unit tests.** `TypeAnalyzerJUTest`, `TypeSchemaAnalyzerJUTest`, `FormulaJUTest`, `ConstraintJUTest`,
  `OverloadingJUTest` and `STypesUtilJUTest` pass with and without the fix.

## 8. The tests that pin the answers

**`compiler_tests/XXXBoundCheckSameNameTwoScopes`** (program `BoundCheckSameNameTwoScopes.fss`; compile; refusal
pinned).

- Two generic declarations name their parameter `T`, with different bounds. So the question `T <: K` has two
  answers, and only the context read keeps the second from taking the first.
- The `.test` pins the location `BoundCheckSameNameTwoScopes.fss:12:26-31:` and the message "Ill-formed type:
  Box[\T\] The static argument T does not satisfy the corresponding bound K."
- Results:
  - green without the fix and with it;
  - red on a deliberately broken variant that shares every True or False answer regardless of context reads,
    reporting "Saw failure, but did not satisfy compile_err_contains".
- It is named with the `XXX` prefix as the team's refusal tests are (`XXXCoverageReturnBad.test` drives
  `tests=CoverageReturnBad`).

**`compiler_tests/OverloadTwoBoundsClosedFamily`** (compile, link, run).

- The library's shape scaled down: a closed family two levels deep, with a self-typed trait.
- It has three overload pairs. Their validity follows from exclusion through `comprises` clauses, and through a
  parameter bounded by the family and the trait. Each call's dispatch is asserted.
- Green with and without the fix. It is also green on the broken variant, so it pins the family's answers, not
  the exactness condition.

Both ran through the harness: `Shell junit` in one JVM, with the fix's classes first on the classpath.

## 9. What a rung would carry

- `fix.patch`, applied and built for real with `ant compileAll`, and its two tests.
- The gate: the count and distance tables equal to the landed ones.
- A rewrite of FACTS' entry on the 17 minutes ("The compiled checker keeps a type parameter's bound list as it is ...").
- Row 688 closed by the fix's commit. Its test is the stage, as rung M's memo declared `testIsStage`. A timing is
  not a test; `XXXBoundCheckSameNameTwoScopes` pins exactness, not speed.
- Then d3d31b5b2's library files (Q13.2), in the same rung or the next: with the fix the count stage takes 371 s.
- **Further steps, outside this patch, with their measured shares after the fix:**
  - a memo for `removeSelf` (14.5% of samples);
  - a memo for `comprisesClause` (part of `substitute`'s 9%), skipping the traits that open sizes;
  - history keys reduced to the entries a computation actually read (1.32 M computations of 0.53 M questions);
  - sharing across the renamed parameters of overload comparisons (0.31 M questions up to renaming).

  The last two are exact only once the normalize memo stops ignoring the history: today it keeps whichever
  normal form a nested computation finished first.

## 10. Decisions, findings, questions

**Decisions.**

1. I shared only answers whose computation read no context. This chooses exactness over reach. The alternatives:
   - TypeScript's rule, dualized: a true answer found under the history's cuts is true without them. It shares
     more, but it can change nested answers, and with them the per-analyzer normal forms.
   - Keys renamed apart, plus the variables' bounds, shared across analyzers.
   - Fuel or depth limits, which change answers.
   - Library-side changes: drop `IntLiteral` from `Number`'s clause, or keep `T extends Number`. These change the
     library, not the checker.
2. Only `True` and `False` are shared, not constraint formulas.
3. A hit in the analyzer's own memo counts as a context read. This is conservative.
4. The memo lives on `TraitTable`, behind its own switch, following rung M.
5. The refusal test carries the `XXX` prefix, by the team's convention.

No decision of the curator covers 1 to 5.

**Findings for the record.**

- The slowdown is recomputation, with the numbers of §2 and §3.
- The count stage on this tree takes about 300 s for the base, measured once at load 0.31. That is not "seconds",
  and the base's `checkApi FortressLibrary` takes 74 s under the fix.
- The overloading stage's error order is not fixed between runs (by reading, §7).
- Noticed by reading, not verified: `withClauseParams` decides by name whether a type variable in an excludes
  clause is in scope (`TypeAnalyzer.scala:820`). So an analyzer whose own parameter has the same name as the
  clause's could read the clause through its own bound. The fix counts that test as a context read.

**Questions for the curator (decisions not taken).**

- Q1: carry the fix as a rung ahead of fork 2's library half, or with it, or hold both until the distance stage's
  remaining gap (1,032 s against 819 s at the landed gate, not a pair) is also closed?
- Q2: pursue the further exact steps of §9?

**Commands worked out.**

- **Compile the fix into a shadow folder.** Two Scala files at once:
  `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d <dir> -encoding UTF-8 TraitTable.scala TypeAnalyzer.scala`.
  Then prefix `<dir>` to the classpath in copies of the stage scripts.
- **Run compiled `.test` files through the harness on shadow classes:**
  `FORTRESS_CACHES=$Q/caches java $JAVA_FLAGS -Dfortress.caches=$Q/caches -cp "<dir>:$CP" com.sun.fortress.Shell junit <absolute .test paths>`.
- **JFR with deep stacks:**
  `-XX:FlightRecorderOptions:stackdepth=2048 -XX:StartFlightRecording=filename=...,settings=profile,dumponexit=true`.
  `jcmd <JVM pid> JFR.dump name=1 filename=...` takes a copy mid-run, and
  `jfr print --events jdk.ExecutionSample --stack-depth 2048` reads it.
  - The default 250 MB cap keeps only the last few minutes.
  - Aim `jstack` and `jcmd` at the `java` process, never at the stage's `timeout` wrapper. A dump aimed at the
    wrapper killed a run.
