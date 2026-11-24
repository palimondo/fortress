<!-- The claims of each FACTS entry of chunk checker-3 (section "The checker and the one library", F-93 to F-278, 30 entries), each with its subject, its kind, the other entries that say the same, and what today's checks say of it, as the first step of the sorting map for the record's consolidation of 2026-11-24; written by a claims worker from FACTS at HEAD, scout-checker-3.md and stale-claims.md, judging nothing new. -->

# Claims of chunk checker-3

How to read a claim line: the sentence, then its subject label, its kind, its overlaps (for property, defect and choice only: entries of FACTS that say the same or overlap, with the words, or "none found" with the words searched), and today's checks (from `evidence/consolidation/scout-checker-3.md`, "scout", and `evidence/stale-claims.md`, "stale"). "Sound (scout)" means the scout found the cited sources, tests and rows and found them agreeing; "not checked (scout)" means the scout says it did not check that part. Overlap searches ran a grep of every entry line of FACTS for the words given.

## F-93 "A generator's size is a counted default on `Generator`"

1. `Generator` gives a generator's size as a counted default, and a type with its own `|self|` keeps it. — *the library: generators and sizes*; kind: **property**; overlap: none found (searched `GeneratorSize`, "counted default", `SimpleIndexValuePairs`); checks: stale: stated as established, where PLAN gives it as a worker's choice (beyond its support).
2. The relational predicate reads neither a size nor an index. — *the library: generators and sizes*; kind: **property**; overlap: F-44 names relational predicates, on `ANDCOND` fusion, not on sizes; checks: sound (scout).
3. `Indexed`'s default index-value pairs keep the indexed value's own indices. — *the library: generators and sizes*; kind: **property**; overlap: none found (searched "index-value", `IndexValuePairsDefault`); checks: sound (scout).
4. Two answers differ from the team's library: `increasing((0#4).reverse)` fails, and the pairs of a value indexed from 5 start at 5. — *the library: generators and sizes*; kind: **property** (a departure from the team's library); overlap: none found (searched `increasing(`); checks: sound (scout).
5. Gated by `tests/GeneratorSize.fss`. — kind: **tests**; checks: test found (scout).
6. Detail in `rung-generator-size/REPORT.md` sections 1 and 6. — kind: **pointer**.

- Shape: one subject (the library: generators and sizes).
- Title: the three properties of claims 1 to 3; the body serves it, and adds the departure (claim 4). Stale finding: the design is a worker's choice, which the entry does not say.

## F-94 "The compiled checker checks the array family under the bound"

1. The compiled checker checks the array family under `T extends { Number, MultiplicativeRing[\T\] }` and calls through such a parameter. — *the checker: closed traits and bounds*; kind: **property**; overlap: F-227 (the same calls through a closed-trait bound, rows 686, 687, 689, 690); F-151 and F-90 own the library's bound itself; checks: stale: `Number` has no `comprises` clause now, so no library call meets the closed-trait case (false today; followups-checker-3).
2. Its refusals and crashes there (rows 686, 687, 689, 690), `squaredNorm(me)` among them, had one cause, the normal form's expansion of the closed trait. — *the checker: closed traits and bounds*; kind: **history**; checks: rows all FIXED (scout).
3. A memo on the trait table keeps the count stage within its 900-second limit (row 688). — *the checker: speed and memos*; kind: **property**; overlap: F-65 (the trait-table memo of `parents` and `excludesClause`, "900-second limit"), F-235 (the solver's memos); checks: row 688 FIXED (scout).
4. Gated by `OverloadTwoBoundsClosed*` and `compiler_tests/*TwoBoundsClosedTrait`. — kind: **tests**; checks: found, 16 files (scout).
5. Detail in `rung-array-bound` and `rung-checker-bounds` reports. — kind: **pointer**.

- Shape: several subjects (the checker: closed traits and bounds; the checker: speed and memos); mostly history once claim 1 is false.
- Title: claim 1; the body tells how it came about and adds an unrelated memo. The followups merged it into F-227.

## F-220 "`__bigOperator`'s local function `body` declares its parameter's type"

1. `__bigOperator`'s local `body` is declared `body(i: I): L` in `Library/FortressLibrary.fss`. — *the library: big operator static arguments*; kind: **property**; overlap: F-228 ("the library types `__bigOperator`'s local function `body(i: I)` at the element type `I`"); checks: line found at `:1511` (scout).
2. The compiled checker accepts the line; the distance and count find no error there. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-53 (distance and count at 0); checks: sound (scout).
3. F-228 holds how walk runs a reduction without a static argument. — kind: **pointer**.
4. Detail in `rung-walk-elements/REPORT.md` section 6. — kind: **pointer**.

- Shape: one subject (the library: big operator static arguments), with a copied gate count.
- Title: claim 1 with claim 2; the body serves it, and is mostly pointers.

## F-221 "The compiled checker retries a call written as another call's argument"

1. The checker retries an argument call against each enclosing declaration's parameter type, only where the enclosing call is not accepted otherwise. — *the checker: expected type and inference*; kind: **property**; overlap: F-87 ("by a retry of the enclosing call, another call's argument ... as P-51 decides (F-221)"); checks: sound (scout).
2. It builds P-51 under P-49, so a declaration that accepts the call as written is never passed over. — kind: **pointer** (to decisions).
3. A plain-bounded big operator, an argument of `__bigOperator`, takes the reduction's expected type; a self-bounded one takes it, else its body's. — *the checker: expected type and inference*; kind: **property**; overlap: F-59 (same sentence on plain and self-bounded big operators), F-364 (inference of an unwritten argument); checks: sound (scout).
4. A chain `a OPLUS b OPLUS c` that only the retry makes acceptable to a multifix declaration now runs it, not the binary one. — *the checker: expected type and inference*; kind: **property**; overlap: none found (searched "multifix"); checks: sound (scout).
5. Walk gives such an argument no expected type (row 705). — *walk: expected types*; kind: **defect** (row 705); overlap: none found (searched "row 705"); checks: row 705 NEGATIVE-VERIFIED, agrees (scout).
6. Gated by `InferCallArgument*` and `InferBigOperatorExpectedType`. — kind: **tests**; checks: found (scout).
7. Detail in `rung-argument-context` report and its `SKEPTIC.md`. — kind: **pointer**.

- Shape: one subject (the checker: expected type and inference), with a walk defect.
- Title: claim 1; the body serves it.

## F-225 "In a self-typed trait ... the compiled checker types `self` in the method bodies as `C[\X\] & X`"

1. In a self-typed trait without a listing `comprises`, the checker types `self` in method bodies as `C[\X\] & X`, read from the F-bound. — *the checker: self-typed traits*; kind: **property**; overlap: F-277 and F-318 ("`C[\X\] & X`" in the exclusion test), revival-changes.md:36; checks: sound (scout).
2. Signatures keep `self` at the plain trait type, except in the exclusion test (F-277) and the Return Type check of a dotted method redeclared below (row 1094). — *the checker: self-typed traits*; kind: **property**; overlap: F-277 (exclusion test), F-394 (row 1094, getter redeclared); checks: sound (scout).
3. The checker refuses an extender at another type, as `object Bad extends Integral[\ZZ32\]`. — *the checker: self-typed traits*; kind: **property**; overlap: none found beyond revival-changes.md:36 (searched "self-typed", `Integral[\ZZ32\]`); checks: sound (scout).
4. It builds P-146. — kind: **pointer**.
5. The Return Type check reads `self` as the meet where an object's dotted method redeclares the trait's, refusing a narrower return, while a getter so redeclared compiles (F-394). — *the checker: self-typed traits*; kind: **defect** (row 1094); overlap: F-394 ("a dotted method so redeclared below a self-typed trait still reads the trait's rec..."); checks: row 1094 NEGATIVE-VERIFIED, agrees (scout).
6. That reading departs from P-146 and P-157. — kind: **pointer** (to decisions, naming the departure).
7. The checker takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as `Containment` is: a default of the coordinator's. — *the checker: self-typed traits*; kind: **choice**; overlap: none found (searched `Containment`); checks: sound (scout).
8. In a trait whose `comprises` lists types, `self` in bodies is the trait met with their union, signatures keep the plain type and the exclusion test reads the meet. — *the checker: self-typed traits*; kind: **choice** (a batch's default, not decided); overlap: F-277 (same reading of a `comprises` trait, "a batch's default"); checks: sound (scout).
9. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares. — *the library: self-typed traits*; kind: **property**; overlap: none found (searched `numerator`); checks: sound (scout).
10. Walk has no such rule and loads what the checker refuses. — *walk: self-typed traits*; kind: **property**; overlap: F-318 (walk's exclusion test reads the meet, a different point); checks: sound (scout).
11. A compiled default body that returns `self` at the self-type parameter runs, also at an object type (row 695, fixed), with the cast of F-377 at arms and closures (rows 1050, 1051). — *the code generator: self-typed traits*; kind: **property**; overlap: F-377 (the cast); checks: rows FIXED (scout); F-377 not read (scout).
12. A default body that calls a method on a self-type value runs, also where the object lists the trait first (row 1052); F-385 gives how. — *the code generator: self-typed traits*; kind: **property**; overlap: F-385; checks: row FIXED (scout); F-385 not read (scout).
13. The rule refuses the team's `PureList` `List`, rightly (row 355). — *the checker: self-typed traits*; kind: **defect** (row 355, in the team's code); overlap: none found (searched "row 355"); checks: row 355 NEGATIVE-VERIFIED, agrees (scout).
14. The prelude's `comprises T` spelling on `StandardTotalOrder` and `Equality` does not bind the one library, by Naden's text and Steele's commit message. — *the checker: self-typed traits*; kind: **property** (a reading of the team's sources); overlap: none found (searched `CompilerAlgebra`, `655e65d53`); checks: Papers line, `CompilerAlgebra.fsi` and the commit not checked (scout).
15. Gated by `SelfType*` and `XXXSelfType*`. — kind: **tests**; checks: 43 files found (scout).
16. Detail in `rung-self-type` and `rung-self-type-exclusion` reports. — kind: **pointer**.

- Shape: several subjects (the checker: self-typed traits; walk: self-typed traits; the code generator: self-typed traits; the library: self-typed traits).
- Title: claims 1 to 3 and the row-1094 exception; most of the body serves it, but claims 11 and 12 (compiled default bodies) and 14 (the prelude's spelling) answer other questions.

## F-226 "The compiled checker renames an inherited method's own static parameters apart"

1. The checker renames an inherited method's own static parameters apart from the inheriting type's in the overloading check, so `Generator.generate[\R\]` keeps its `R` (row 561). — *the checker: inherited static parameters*; kind: **property**; overlap: F-87 ("F-226 gives how it renames ..."); checks: row 561 FIXED (scout).
2. At a call, `commonInheritedMethods` instantiates each inherited method at its declaring trait's static arguments, first renaming clashing own parameters to `name$i`, which messages print (row 627). — *the checker: inherited static parameters*; kind: **property**; overlap: none found (searched `commonInheritedMethods`, "row 627"); checks: row 627 FIXED, `STypesUtil.scala` found (scout).
3. The same function builds the methods a trait's body sees, so a bare-name call inside a trait gets the same renaming. — *the checker: inherited static parameters*; kind: **property**; overlap: none found; checks: sound (scout).
4. Gated by `InheritedMethodStaticParamSameName`, `InheritedMethodByNameStaticParamSameName`, `MethodStaticArgReceiverSameName`. — kind: **tests**; checks: found (scout).
5. Detail in two rung reports. — kind: **pointer**.

- Shape: one subject (the checker: inherited static parameters).
- Title: claims 1 and 2; the body serves it.

## F-227 "The compiled checker replaces a closed trait among an intersection's conjuncts"

1. The checker replaces a closed trait in an intersection by its listed types that no other conjunct excludes, only where the excluding conjunct names no type or inference variable. — *the checker: closed traits and bounds*; kind: **property**; overlap: F-94 (the same cause, "the normal form's expansion of the closed trait"); checks: stale: `Number` has no `comprises` clause now, so no library call meets the closed-trait case (false today, as to the library; followups-checker-3).
2. Below a union, an inference variable takes the whole union as one upper bound, and a type variable is tried through its bound and against each member. — *the checker: closed traits and bounds*; kind: **property**; overlap: none found (searched `pSubInner`, `normConjunct`); checks: sound (scout).
3. So a call through a parameter bounded by a closed trait and an excluding bound checks, and such a generic beside a declaration on the closed trait is a valid overloading (rows 686, 687, 689, 690, 711). — *the checker: closed traits and bounds*; kind: **property**; overlap: F-94 (same rows); checks: rows FIXED (scout).
4. A call whose argument only carries the parameter, `Box[\T\]`, under a ground second bound stays refused (row 712). — *the checker: closed traits and bounds*; kind: **defect** (row 712); overlap: none found (searched "row 712"); checks: row 712 NEGATIVE-VERIFIED, agrees (scout).
5. The overloading on a question Appendix I leaves open was accepted, then refused, then accepted again since the exclusion test reads the bounds (F-277). — *the checker: overloading exclusion test*; kind: **history**.
6. Walk refuses that overloading at load (row 713, contested). — *walk: load checks of overloading*; kind: **defect** (row 713); overlap: F-277 ("row 713's pair is accepted and runs, and walk refuses it at load"); checks: row 713 CONTESTED, agrees (scout).
7. Gated by `*TwoBoundsClosedTrait` and `*TwoGroundBounds*ClosedTrait`. — kind: **tests**; checks: found (scout).
8. Detail in `rung-checker-bounds` report. — kind: **pointer**.

- Shape: several subjects (the checker: closed traits and bounds; the checker: overloading exclusion test; walk: load checks of overloading).
- Title: claims 1 and 2; the body serves it except the history and walk's row 713 (claims 5 and 6).

## F-231 "The generated AST walker is split into eight methods that the JVM compiles"

1. `Walker.walk` in the generated `FortressAst.scala` is split into eight methods under HotSpot's 8,000-byte limit. — *the checker: speed and memos*; kind: **property**; overlap: F-236 ("`WalkerJUTest` still guards `Walker` (F-231)"), compiler.md:263; checks: sound (scout).
2. As one method of 31,704 bytes it ran interpreted, and every substitution and normalization goes through it. — *the checker: speed and memos*; kind: **history**.
3. The split took the count stage from 911 s to about 340 s and the distance stage from 2,375 s to 931 s, on climb batch 15's code. — *the harness and the gate: stage times*; kind: **detail**.
4. About 95 % of the remaining type-check time was the solver reducing formulas again, which the memos now answer (F-235). — *the checker: speed and memos*; kind: **history**.
5. F-240 gives the stages' times now. — kind: **pointer**.
6. Gated by `WalkerJUTest`, which fails past 8,000 bytes and checks the split's answers. — kind: **tests**; checks: found (scout).
7. Detail in `checker-speed-2/REPORT.md`. — kind: **pointer**.

- Shape: one subject (the checker: speed and memos), mostly history and detail.
- Title: claim 1; the body serves it with its history and timings.

## F-232 "The syntax tree's hashes do not depend on the JVM's identity hashes"

1. Every generated node's hash starts from its class name's hash, written by makeAST's post-processing and the in-repo generators. — *the checker: node hashes*; kind: **property**; overlap: none found (searched `NodeHash`, "identity hash": F-354 and F-408 name identity hashes for other orders); checks: `build.xml:698-716` found (scout).
2. A field whose type holds an `Option` is hashed by `NodeHash.of`, since PLT `Option` hashes by identity. — *the checker: node hashes*; kind: **property**; overlap: none found; checks: sound (scout).
3. So hash maps and sets of nodes, and the apis that `checkApis` takes, iterate in one order. — *the checker: node hashes*; kind: **property**; overlap: none found; checks: sound (scout).
4. An inference variable's id hashes by identity, but no count-stage output moves through it. — *the checker: node hashes*; kind: **property**; overlap: none found; checks: `NodeFactory.java:1166-1184` found (scout).
5. Walk's `_WrappedFValue` hashes by walk's own hash, which can be an identity hash (row 430). — *walk: value hashes*; kind: **defect** (row 430); overlap: none found (searched "row 430"); checks: row 430 NEGATIVE-VERIFIED, agrees (scout).
6. `DeclaredFunction`s still hash by identity, but no choice of `ApiTypeExtractor` (F-254) nor among a call's declarations (F-408) depends on their order. — *the checker: node hashes*; kind: **property**; overlap: F-254 (same claim, "does not depend on the JVM's identity-hash order"), F-408 ("no longer follow the JVM's identity hashes"); checks: row 737 FIXED (scout).
7. Gated by `NodeHashJUTest`, and row 737's repair by `OmittedReturnTypeFromApi`. — kind: **tests**; checks: found (scout).
8. Detail in `rung-ast-hashes` report. — kind: **pointer**.

- Shape: one subject (the checker: node hashes), with a walk defect.
- Title: claims 1 to 4; the body serves it.

## F-233 "The compiled checker types a block's local functions with their group in scope"

1. The checker types a block's local functions with their group in scope, so a sibling call from a function with no written return type checks. — *the checker: local functions*; kind: **property**; overlap: F-231 ("the repair that lets the checker check a block's local functions (row 680; F-233)"), F-53 ("nothing crashes (F-233)"); checks: row 680 FIXED (scout).
2. One that calls itself without a return type is refused for its reference cycle, as at top level. — *the checker: local functions*; kind: **property**; overlap: none found (searched "reference cycle"); checks: sound (scout).
3. Gated by `LocalFunctionSiblingInLoop`, `LocalFunctionSiblingCall`, `XXXLocalFunctionRecursiveUntypedReturn`. — kind: **tests**; checks: found (scout).
4. Detail in `rung-checker-bounds/REPORT.md` section 6. — kind: **pointer**.

- Shape: one subject (the checker: local functions).
- Title: claim 1; the body serves it.

## F-235 "The compiled checker reduces a formula once in each analyzer"

1. The checker memoizes formula reduction per analyzer, exclusion questions with renamed inference variables per trait table, and type lookup by name per trait table. — *the checker: speed and memos*; kind: **property**; overlap: F-65 (another memo, `parents` and `excludesClause`), F-43 (the overloading checker's memo, which hides errors), F-94 (trait-table memo); checks: stale: these three are not all the checker's memos (beyond its support; followups-checker-3).
2. Each memo's key holds every input its answer reads; a context-reading answer is marked and one that opened a size is not kept. — *the checker: speed and memos*; kind: **property**; overlap: none found (searched "memo"); checks: cited line ranges not checked (scout).
3. Each memo has a switch, default on (`fortress.analyzer.reduce.cache`, `.exclusion.cache`, `.typecons.cache`). — *the checker: speed and memos*; kind: **detail**; checks: switches found (scout).
4. The count stage went from 437 s to 97 s with equal outputs, and audits found 0 differences. — *the harness and the gate: stage times*; kind: **detail**.
5. A new memo of the checker follows the same rule. — *the checker: speed and memos*; kind: **choice** (a rule for later work, no decision named); overlap: compiler.md:277 ("If the pass reuses an answer ... as a memo does, audit it"); checks: none.
6. Gated by `ReductionMemoJUTest`, `ExclusionMemoJUTest`, `TraitTableMemoJUTest`. — kind: **tests**; checks: found, as `.scala` (scout).
7. Detail in `rung-solver-speed` report. — kind: **pointer**.

- Shape: one subject (the checker: speed and memos).
- Title: claim 1; the body serves it.

## F-236 "Every method of the build is within HotSpot's 8,000-byte limit but twelve"

1. Every method of the build is under 8,000 bytes but twelve. — *the harness and the gate: method-size guard*; kind: **property**; overlap: F-231 (the same limit, for `Walker`), compiler.md:263 and :280; checks: 12 `listed(` entries, names match (scout).
2. `MethodSizeJUTest` fails on an unlisted method past the limit and on a listed one gone or back under it. — *the harness and the gate: method-size guard*; kind: **property**; overlap: compiler.md:263; checks: found (scout).
3. The twelve are named, with `HygienicRenamer.walk` never constructed and four test-data methods that no suite runs. — *the harness and the gate: method-size guard*; kind: **detail**; checks: match (scout).
4. `WalkerJUTest` still guards `Walker` (F-231). — kind: **pointer**.
5. Detail in `rung-solver-speed/REPORT.md` section 8. — kind: **pointer**.

- Shape: one subject (the harness and the gate: method-size guard).
- Title: claims 1 and 2; the body serves it.

## F-237 "The well-formedness walk reports an ill-formed type whose span lies outside ..."

1. The well-formedness walk reports an ill-formed type whose span lies outside the current expression at that expression, so a broken bound of a callee's result type is reported at the call. — *the checker: well-formedness errors*; kind: **property**; overlap: none found (searched `TypeWellFormedChecker`, "ill-formed": F-121 and F-184 use it on other cases); checks: stale: stated as established, where PLAN gives the place as the coordinator's default (beyond its support).
2. Such an error is reported once per call that made the type; expressions the value flows to add none. — *the checker: well-formedness errors*; kind: **property**; overlap: none found; checks: sound (scout).
3. Of two nested calls at alike-printing static arguments, only the inner is reported; the program is still refused (row 776). — *the checker: well-formedness errors*; kind: **defect** (row 776); overlap: none found (searched "row 776"); checks: row 776 NEGATIVE-VERIFIED, agrees (scout).
4. A type ill-formed where written keeps its error at the declaration. — *the checker: well-formedness errors*; kind: **property**; overlap: none found; checks: sound (scout).
5. A local variable's right-hand side is walked first, so the error is at the call, not a later use. — *the checker: well-formedness errors*; kind: **property**; overlap: none found; checks: sound (scout).
6. In the library, by reading, reporting at the call changes no error, and the distance holds no well-formedness error. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-53 (distance 0); checks: sound (scout).
7. Source: `TypeWellFormedChecker.scala`, `check`, `error`, `outside`, `within`, `SLocalVarDecl`. — kind: **detail**; checks: file found (scout).
8. Gated by six `XXXStaticArgBound*` and `XXXIllFormedTypeAtDeclarationOnce` tests. — kind: **tests**; checks: found (scout).
9. Detail in `rung-checker-abstract-callsite` report, `SKEPTIC.md`, `JUDGE.md`. — kind: **pointer**.

- Shape: one subject (the checker: well-formedness errors).
- Title: claim 1; the body serves it. Stale finding: the place of the report is a default of the coordinator's, not stated.

## F-240 "The checker's count stage takes about 65 s and its distance stage 117 s"

1. At climb batch 36's gate the count stage took about 65 s and the distance stage 117 s. — *the harness and the gate: stage times*; kind: **detail**; checks: times not in a file the scout read; `distance.txt` of batch 36 exists (scout).
2. At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos make most of the difference. — *the harness and the gate: stage times*; kind: **history**.
3. The rise from about 90 s at batch 21b is the library check now run past its type errors into the export check, by one rung run each. — *the harness and the gate: stage times*; kind: **history**.
4. Checking every symbolic operator costs the count stage about 15 to 25 %. — *the harness and the gate: stage times*; kind: **detail**.
5. From batch 22's gate to 26's the stage stayed between 150 s and 180 s; both halved at batch 27's, cause not measured. — *the harness and the gate: stage times*; kind: **history**.
6. The count table records no seconds, so times come from the gate log's file times, and the distance stage ran under `testFast`'s load. — *the harness and the gate: stage times*; kind: **property** (how the time is read); overlap: none found (searched "file times"); checks: sound (scout).
7. Load can lengthen a stage more than twofold (217 s at load 3.3 against 574 s at 4.6 to 5.3), so times compare only under like load. — *the harness and the gate: stage times*; kind: **property**; overlap: none found (searched "load average"); checks: sound (scout).
8. Source the gate log; detail in twelve batch reviews. — kind: **pointer**.

- Shape: mostly history or plan (a time log of the gate), one subject (the harness and the gate: stage times).
- Title: claim 1, a measurement of one gate; the body is its log over batches, not a property; claims 6 and 7 are the only lasting rules.

## F-242 "`SUM`'s fusion pairs with `MAX` and `MIN` hold no site of the distance"

1. `SUM`'s fusion pairs with `MAX` and `MIN` hold no distance site. — *the library: reductions and fusion*; kind: **property**; overlap: F-243 ("The method condition and the generic `distribute` clear the fusion pairs' 6 (F-242)"); checks: sound (scout).
2. A `where` condition on each of `SumReduction`'s two `distribute` overloads clears their four unmet bounds. — *the library: reductions and fusion*; kind: **property**; overlap: F-250 ("the `where` conditions on `SumReduction`'s `distribute` overloads for `MAX` and `MIN`"); checks: sound (scout).
3. `ActualReduction`'s generic `distribute`, result over its own `K`, clears their two return-type errors. — *the library: reductions and fusion*; kind: **property**; overlap: F-250 ("the generic `distribute`"); checks: sound (scout).
4. The fusion pairs are `MaxSumReductionPair`, `MinSumReductionPair` and the two overloads, for one-pass max or min of sums. — *the library: reductions and fusion*; kind: **property**; overlap: none found (searched `MaxSumReductionPair`); checks: sound (scout).
5. The team's commented text with `PossibleReductionPair[\R\]` would only move the two errors to the generic. — *the library: reductions and fusion*; kind: **history**.
6. The fusion stays (P-151). — kind: **pointer** (to a decision).
7. Row 433 is fixed, and F-250 gives the landing and test. — kind: **history**; checks: row 433 FIXED (scout).
8. Detail in two perf-probe reports. — kind: **pointer**.

- Shape: one subject (the library: reductions and fusion).
- Title: claims 1 to 3; the body serves it. No test named (scout).

## F-243 "The 13 errors that were filed as waiting on `where` clauses ... are all cleared"

1. The 13 distance errors filed as waiting on `where` clauses, at the gates of batches 15b and 16, are all cleared. — *the harness and the gate: distance and count*; kind: **history**.
2. The fusion pairs' 6 by the method condition and generic `distribute` (F-242). — *the library: reductions and fusion*; kind: **pointer**.
3. `AnyList`'s 4 by its `comprises ... where [\E\]` clause made live, its bodies respelled within `AnyList` (F-251). — *the library: AnyList*; kind: **pointer**.
4. 2 by a `cast` at `additiveIdentity`'s and `multiplicativeIdentity`'s fallbacks (row 436). — *the library: reductions and fusion*; kind: **history**; checks: row 436 is about walk's empty `SUM` ending in `CastError` (NEGATIVE-VERIFIED), cited here for a distance site (scout).
5. The list comparisons' site by conditional extension, `ZeroIndexed[\E\]` and element-wise `=` outside the condition (F-255; row 634). — *the library: AnyList*; kind: **pointer**; checks: row 634 FIXED (scout).
6. Library edits without new language would also have cleared 12 of them. — *the library: reductions and fusion*; kind: **history** (a counterfactual of the probe).
7. Detail in the where-clauses probe and batch 17's review. — kind: **pointer**.

- Shape: mostly history or plan.
- Title: claim 1, a history of 13 errors; the body is a breakdown that points to F-242, F-251, F-255 and F-85. No test named (scout).

## F-244 "The three `where` forms that the checker builds ... hold where the where-clauses probe tested them"

1. The three `where` forms the checker builds (conditional extension, a function's or method's condition, `AnyList`'s `comprises` clause) hold where the probe tested them. — *the checker: where clauses*; kind: **property**; overlap: F-250, F-251, F-255, F-256 (each owns one form); checks: sound (scout).
2. A member checked under a conditional extension's condition stays callable where it fails (row 773). — *the checker: where clauses*; kind: **defect** (row 773); overlap: F-255 ("a member checked under the condition stays callable where the condition fails (row 773)"); checks: row 773 NEGATIVE-VERIFIED, agrees (scout).
3. A type variable opened from a `comprises` clause passes the escape, two-value and Amin–Tate tests. — *the checker: where clauses*; kind: **property**; overlap: F-251 (same three tests); checks: sound (scout).
4. A method's constraint on its trait's parameter bounds that parameter inside the method and is checked at a dotted call (row 748). — *the checker: where clauses*; kind: **property**; overlap: F-250 (method condition bounds the parameter), F-256 (dotted call); checks: row 748 FIXED (scout).
5. Swift, Rust and Haskell scope such a member to the condition, which P-151 holds as still to build. — *the checker: where clauses*; kind: **plan**.
6. Opening a `comprises` clause has two other open rows, 751 and 752; row 775, a crash, is fixed (F-281). — *the checker: where clauses*; kind: **defect** (rows 751, 752); overlap: F-251 (row 752); checks: 751, 752 NEGATIVE-VERIFIED, 775 FIXED (scout).
7. F-250 (row 470) and F-256 give the constraints not yet read. — kind: **pointer**.
8. Detail in the where-clauses probe B.1 to B.3, B.6. — kind: **pointer**.

- Shape: one subject (the checker: where clauses), mostly a summary of F-250, F-251, F-255 and F-256.
- Title: claim 1 with its one open hole; the body serves it, but every claim but 5 is said in another entry.

## F-245 "With every symbolic operator checked for overloading, the compiled checker finds 5 errors"

1. With every symbolic operator checked, the checker found 5 library errors on climb batch 21's first run's code, where the base gave 191. — *the harness and the gate: distance and count*; kind: **history**; checks: stale: a measurement without its bounds (beyond its support).
2. The checker checks every operator, so the distance stage is this check; it gives 0 since batch 22. — *the checker: operator overloading check*; kind: **property**; overlap: F-281 ("So the distance stage is the full check of F-245"), F-53; checks: `distance.txt` `#total 0` (scout).
3. The 191 came from a full-check stage, a copy of the checker whose edits no longer match the tree; it caught the `AnyList` crash on `||` (row 809). — *the tools: full-check stage*; kind: **history**; checks: row 809 FIXED (scout).
4. Of the 186 beyond the 5, the known fixes clear 54 (F-276), the index bound 124 (F-278) and the exclusion test 8 (F-277); together nothing comes. — *the harness and the gate: distance and count*; kind: **detail**; checks: stale: holds for batch 21's base, the 8 cited to P-157 (beyond its support).
5. Walk's meet check skips symbolic operators (row 611). — *walk: load checks of overloading*; kind: **defect** (row 611); overlap: F-142 (walk's Meet Rule check); checks: row 611 NEGATIVE-VERIFIED, agrees (scout).
6. Widened the same way, walk's check refused only `EmptyString`'s `||` (F-142). — *walk: load checks of overloading*; kind: **history**.
7. Detail in five reports. — kind: **pointer**.

- Shape: mostly history or plan.
- Title: claim 1, a measurement of one batch; the body is its breakdown, with claim 2 the only lasting property, which F-281 owns.

## F-250 "Inside a declaration, the compiled checker reads a `where` clause's trait constraint `X extends B` as a bound of `X`"

1. Inside a declaration, the checker reads a `where` trait constraint `X extends B` as a bound of `X`. — *the checker: where clauses*; kind: **property**; overlap: F-244 (row 748, method constraint bounds the parameter), F-256; checks: sound (scout).
2. A constraint on the declaration's own static parameter joins that parameter's bound in the arrow, so a call is checked against it. — *the checker: where clauses*; kind: **property**; overlap: F-256 (constraints checked where they apply); checks: sound (scout).
3. A static argument written at a top-level call is not checked against that bound, so `g[\String\]("s")` is accepted (row 470). — *the checker: where clauses*; kind: **defect** (row 470); overlap: F-70 ("not one written at a top-level function call"), F-256 (row 470), F-244, F-291 (names row 470 on another case); checks: row 470 NEGATIVE-VERIFIED, agrees (scout).
4. F-256 holds the other places and limits. — kind: **pointer**.
5. The library edits that landed with this reading are F-242's and F-85's. — kind: **history**.
6. Tests named inline: `WhereBoundMethodChecker`, `XXXWhereBoundFunctionCall`. — kind: **tests**; checks: found (scout).
7. Detail in `rung-library-distribute` report. — kind: **pointer**.

- Shape: one subject (the checker: where clauses).
- Title: claims 1 and 2; the body serves it, with a history of the library edits.

## F-251 "A type `where`-clause variable of a `comprises` clause is opened at a call"

1. A type `where`-clause variable of a `comprises` clause is opened at a call, as a size is (F-146). — *the checker: where clauses*; kind: **property**; overlap: F-256 ("bounded by its binding and by the clause's constraints on it, where it is opened"), F-270 (opened size), compiler.md:184; checks: sound (scout).
2. `AnyList`'s `comprises { List[\E\] } where [\E\]`, once a comment, is in the library. — *the library: AnyList*; kind: **property**; overlap: F-243 ("a comment of the team's made live"); checks: stale: `addLeft` and `addRight` stay in `AnyList`, departing from P-151 (row 799, contested), not said (false today).
3. The opened type is bounded by the binding's bound and the clause's constraints. — *the checker: where clauses*; kind: **property**; overlap: F-256 (same); checks: sound (scout).
4. The checker refuses the opened type where another is declared, gives two values two types, and refuses Amin and Tate's unsound shape. — *the checker: where clauses*; kind: **property**; overlap: F-244 (same three tests); checks: sound (scout).
5. It does not open such a trait reached as a parent (row 752). — *the checker: where clauses*; kind: **defect** (row 752); overlap: F-244 (row 752); checks: row 752 NEGATIVE-VERIFIED, agrees (scout).
6. Walk binds the variable as a symbolic type at load. — *walk: where clauses*; kind: **property**; overlap: none found (searched "symbolic type"); checks: sound (scout).
7. On the rung's tree the distance went 49 to 45 (row 636's four sites), with `addLeft`, `addRight` and the comprehension's unwrap respelled. — *the harness and the gate: distance and count*; kind: **history**; checks: row 636 FIXED (scout).
8. Tests: four `OpenType*Checker` and two walk tests. — kind: **tests**; checks: found (scout).
9. Detail in `rung-anylist-comprises/REPORT.md`. — kind: **pointer**.

- Shape: several subjects (the checker: where clauses; the library: AnyList; walk: where clauses).
- Title: claims 1 and 2, a checker rule and a library line; the body serves both.

## F-254 "In the compiled checker, a function or method that leaves out its return type takes it from the one declaration of the exported api"

1. A function or method that leaves out its return type takes it from the one api declaration whose parameter types are its own. — *the checker: omitted types from the api*; kind: **property**; overlap: F-370 ("takes each type that a component's declaration leaves out from the exported api's declaration ... F-254 gives the api declaration"); checks: sound (scout).
2. `ApiTypeExtractor` compares parameter types as the export check does, an untyped parameter matching any type. — *the checker: omitted types from the api*; kind: **property**; overlap: F-370; checks: `equalTypes` at :195, :199 (scout).
3. With no match or several, it takes none and leaves the declaration as written. — *the checker: omitted types from the api*; kind: **property**; overlap: none found beyond F-370; checks: sound (scout).
4. So the choice does not follow identity-hash order, and no stage output is known to move with it (F-232). — *the checker: node hashes*; kind: **property**; overlap: F-232 (same claim from the other side); checks: sound (scout).
5. The error at `FortressLibrary.fss:131` (`BIG LEXICO`'s omitted return type), which came and went, is gone from both stages. — *the harness and the gate: distance and count*; kind: **history**; checks: stale: the scout reads `:131` as `BIG LEXICO` text without saying which claim it holds (unsettled).
6. Evidence read in `ApiTypeExtractor.scala:77-126`, `:193-209`. — kind: **detail**.
7. Tests: `OmittedReturnTypeFromApi`, `OmittedMethodReturnTypeFromApi`. — kind: **tests**; checks: found (scout).
8. Detail in `rung-checker-four-rows` report. — kind: **pointer**.

- Shape: one subject (the checker: omitted types from the api), with a node-hash claim.
- Title: claim 1; the body serves it. F-370 owns the wider rule.

## F-255 "The compiled checker reads conditional extension in its subtype relation"

1. A type that extends another under a `where` clause binding no variable and holding trait constraints only is a subtype exactly where the constraints hold. — *the checker: conditional extension*; kind: **property**; overlap: F-244 (one of the three forms), revival-changes.md:76; checks: sound (scout).
2. The `extends` entry, value parameters and members are checked with the constraints holding; static parameters, the own `where`, `excludes`, `comprises` and other entries without. — *the checker: conditional extension*; kind: **property**; overlap: none found (searched "conditional extension"); checks: sound (scout).
3. The disambiguator drops every trait's and object's `throws` clause and contract, so these are not checked (row 781). — *the checker: dropped clauses*; kind: **defect** (row 781); overlap: F-181 (row 781); checks: row 781 NEGATIVE-VERIFIED, agrees (scout).
4. A clause that binds a variable or holds a non-trait constraint is read as a parent at every instance. — *the checker: conditional extension*; kind: **property**; overlap: none found; checks: sound (scout).
5. A member checked under the condition stays callable where it fails (row 773). — *the checker: conditional extension*; kind: **defect** (row 773); overlap: F-244 (row 773); checks: row 773 NEGATIVE-VERIFIED, agrees (scout).
6. Walk and the compiled run time read the extension at every instance (row 774). — *walk: conditional extension*; kind: **defect** (row 774); overlap: F-181 (row 774), revival-changes.md:81; checks: row 774 NEGATIVE-VERIFIED, agrees (scout).
7. Other readers of `extends` in the checker ignore the condition: the ancestors see it at no instance, the inherited `excludes` at every instance; none moved a library result, and no ledger row holds them. — *the checker: conditional extension*; kind: **defect** (no row); overlap: none found (searched `excludesClause`, `ancestors`: F-65 names `excludesClause` for its memo only); checks: stale: no ledger row holds this (unsettled, to investigate).
8. In the library, `List` extends `LexicographicOrder[\List[\E\],E\]` only where `E extends StandardTotalOrder[\E\]`, with `ZeroIndexed[\E\]` and its `=` outside the condition. — *the library: AnyList*; kind: **property**; overlap: F-243 (same sentence); checks: `List.fss:106-107`, `:124-128` match (scout).
9. On the rung's tree this cleared the distance's `a CMP b` site and added none. — *the harness and the gate: distance and count*; kind: **history**.
10. Nine tests, one of them, `CondExtendInheritedMember`, noting that the code generator's analyzer reads the parent at every instance. — kind: **tests**; checks: found (scout).
11. Detail in `rung-checker-conditional-extension` report. — kind: **pointer**.

- Shape: several subjects (the checker: conditional extension; the checker: dropped clauses; walk: conditional extension; the library: AnyList).
- Title: claim 1; the body serves it, but claim 3 (row 781, `throws` and contracts) answers another question.

## F-256 "The compiled checker checks a `where` clause's trait constraints where they apply"

1. At a dotted call, a candidate whose `where` clause constrains its owner's static parameter is not applicable where the receiver's argument breaks it. — *the checker: where clauses*; kind: **property**; overlap: F-244 (row 748, "checked at a dotted call"), F-250; checks: sound (scout).
2. A trait constraint in a function's or method's `where` makes its `nat` and `int` variables static parameters of the arrow, inferred at the call, with one more solve for sizes. — *the checker: where clauses*; kind: **property**; overlap: none found (searched "where-clause variable"); checks: sound (scout).
3. Walk and the compiled path both refuse a function's or method's type `where`-clause variable at name binding. — *the checker: where clauses*; kind: **defect** (no row named); overlap: none found (searched "is undefined"); checks: sound (scout).
4. A trait's or object's own constraint is checked where its type is used, also at a constructor call. — *the checker: where clauses*; kind: **property**; overlap: none found; checks: sound (scout).
5. A `comprises` clause's type variable is bounded by its binding and constraints where opened and in an extender's check; in a self-naming bound the opened type stands for it. — *the checker: where clauses*; kind: **property**; overlap: F-251 (same bound); checks: sound (scout).
6. Not read: constraints whose bound names the method's own parameters at a dotted call, those naming a `where` variable at a type's use, and a static argument at a top-level call (row 470). — *the checker: where clauses*; kind: **defect** (row 470); overlap: F-250 and F-70 (row 470), F-244; checks: row 470 NEGATIVE-VERIFIED (scout).
7. Walk runs a dotted call that breaks a method's condition (row 777). — *walk: where clauses*; kind: **defect** (row 777); overlap: revival-changes.md:81, none in FACTS (searched "row 777"); checks: row 777 NEGATIVE-VERIFIED (scout).
8. A `comprises` clause's `where` variable captures a same-named static parameter in another declaration's bound (row 778). — *the checker: where clauses*; kind: **defect** (row 778); overlap: none found (searched "row 778"); checks: row 778 NEGATIVE-VERIFIED (scout).
9. These checks moved no site of the count or distance. — *the harness and the gate: distance and count*; kind: **history**.
10. Eight tests. — kind: **tests**; checks: found (scout).
11. Detail in `rung-checker-where-checks` report and its `SKEPTIC.md`. — kind: **pointer**.

- Shape: one subject (the checker: where clauses), with walk defects.
- Title: the title is general; the body's claims serve it, as a list of places and limits.

## F-265 "No static parameter of the interpreter's library is bounded by `Object`"

1. No static parameter of the interpreter's library is bounded by `Object`. — *the library: static parameter bounds*; kind: **property**; overlap: F-291 and F-292 (`extends Object` in compiled tests), F-21; checks: `git grep` prints nothing (scout).
2. Under walk, a tuple, `()` or arrow argument at a type variable bounded by `Object` stops the program with an `InterpreterBug`, not a type error (row 471). — *walk: Object bound*; kind: **defect** (row 471); overlap: none found (searched "row 471", `InterpreterBug`; interpreter.md:136 names row 864 for another `InterpreterBug`); checks: stale: evidence not stated, a probe no longer in the tree (beyond its support); does walk still stop so? (unsettled).
3. The stop needs a written `Object`, since walk installs a written bound before it unifies. — *walk: Object bound*; kind: **property**; overlap: none found; checks: as claim 2.
4. The library's result-only parameters are unbounded, as P-48 decides (F-84). — kind: **pointer**.
5. Six functions write `extends Any`: `cast`, `instanceOf`, `identity`, `shared`, `localize`, `copy`. — *the library: static parameter bounds*; kind: **detail**; checks: lines 33 to 72 found (scout).
6. The specification's examples and the compiler tests write `extends Object`. — *the specification: static parameter bounds*; kind: **property**; overlap: F-292 (compiled tests that write `T extends Object`); checks: not checked (scout).
7. Row 471 has no test; evidence by `git grep`. — kind: **detail**; checks: row 471 has reproducer `none` (scout).
8. Detail in `rung-result-bounds/REPORT.md` section 10. — kind: **pointer**.

- Shape: several subjects (the library: static parameter bounds; walk: Object bound), mostly a defect.
- Title: claims 1 and 2; the body serves it, but the walk defect is unsupported today.

## F-266 "The compiled checker refuses a local function's parameter that has no type"

1. The checker refuses an untyped local function parameter, "Missing parameter type for i", as at top level. — *the checker: untyped parameters*; kind: **property**; overlap: F-370 ("F-266, on a local function's"), revival-changes.md:136; checks: `STypeEnv.scala:75`, `:200` agree (scout).
2. Write the type: the specification asks for inference of a left-out type and does not describe it. — *the specification: parameter type inference*; kind: **property**; overlap: F-371 (the team's texts describe no inference); checks: Appendix I section found (scout).
3. Such a local function crashed the checker before the fix (rows 620, 621). — kind: **history**; checks: rows FIXED (scout).
4. Compiled, an untyped parameter is refused where no api gives its type (row 405); under walk it fails only where its method implements an abstract one. — *the checker: untyped parameters*; kind: **defect** (row 405); overlap: F-370 (row 405); checks: row 405 NEGATIVE-VERIFIED (scout).
5. An object's own untyped value parameter stops the checker with a Java exception (row 1032). — *the checker: untyped parameters*; kind: **defect** (row 1032); overlap: F-370 (same, row 1032); checks: stale: row 1032 is CONTESTED, the entry states it as plain fact (a ledger row's status disagrees).
6. Gated by `XXXLocalFunctionUntypedParam`, `XXXLocalFunctionUntypedParamInLoop`. — kind: **tests**; checks: found (scout).
7. The code is `STypeEnv.scala:75` and `:200`. — kind: **detail**.

- Shape: one subject (the checker: untyped parameters), with a specification reading.
- Title: claim 1; the body serves it. F-370 says claims 4 and 5 too.

## F-267 "The compiled checker refuses a subtrait that inherits an abstract method named by an operator static argument"

1. The checker refuses a subtrait that inherits an abstract method named by an operator static argument, even at one instantiation. — *the checker: abstract-method check*; kind: **defect** (no row); overlap: F-39 ("An operator static argument is a name substituted when the declaration is instantiated, on both paths and by the specification"); checks: stale: does it still refuse? no row or test holds it (unsettled).
2. The specification and walk substitute the name. — *the specification: operator static arguments*; kind: **property**; overlap: F-39 (same); checks: none.
3. The abstract-method check matches by name and does not first put in the operator argument (`AbstractMethodChecker.scala:100-101`, by reading). — *the checker: abstract-method check*; kind: **detail**; checks: lines found (scout).
4. Observed in probes `OprSingle` and `OprInstancesOplus`; no row or test holds it. — kind: **history**; checks: stale: the probes are not in `git ls-files` (cites a thing that is gone).
5. Detail in `spec-refused-examples-judgement.md` section 4. — kind: **pointer**.

- Shape: mostly a defect, with no ledger row.
- Title: claim 1; the body serves it.

## F-268 "The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`"

1. The code generator emits `Any` as a static argument in an `extends` clause. — *the code generator: Any static arguments*; kind: **property**; overlap: F-315 ("compiles a trait or object that extends a generic trait at `Any`", same tests), compiler.md:84; checks: sound (scout: tests found).
2. It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` at `CodeGen.java:6781-6785`. — *the code generator: Any static arguments*; kind: **detail**; checks: stale: the lines hold other code, and the `Any` case now goes through `generateTypeReference` (false today; cites a thing that moved).
3. For `Holder[\(Any, ZZ32)\]` it stops with a null `id_or_op` (row 889). — *the code generator: Any static arguments*; kind: **defect** (row 889); overlap: F-315 ("a tuple that holds `Any` (row 889), are still refused"); checks: row 889 NEGATIVE-VERIFIED (scout).
4. Tests: `ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. — kind: **tests**; checks: found (scout).
5. Detail in `rung-codegen-walls` report. — kind: **pointer**.

- Shape: one subject (the code generator: Any static arguments).
- Title: claims 1 and 3; the body serves it. F-315 says the same with the same tests.

## F-276 "String's four concatenation families are three top-level operators each"

1. `||`, `|||`, `//` and `///` are each declared at `(Any, String)`, `(String, String)` and `(String, Any)`. — *the library: string concatenation operators*; kind: **property**; overlap: F-249 (walk reaches the string objects' `||` through the top-level `(String, String)` one), F-259 (`String`'s two top-level `||` over `Any`); checks: `FortressLibrary.fsi:2662-2681` found (scout).
2. The `(String, String)` `||` reaches `FlatString`'s and `Concatenable`'s own `||` by `typecase`, so under walk `"ab" || "cd"` stays a `FlatString` of depth 0. — *the library: string concatenation operators*; kind: **property**; overlap: F-249 ("is a `FlatString` of depth 0"); checks: `String.fsi` lines not read (scout).
3. With the known fixes (named), the full check lost the library's 54 known-fix errors, 191 to 137, on batch 21's base; the count stayed 3 and the distance 5. — *the harness and the gate: distance and count*; kind: **history**.
4. The known fixes are `EmptyString`'s meet, `Integral`'s and `ZZ`'s `=`, `DelegatedIndexed`, `Maybe`'s and `Float`'s meets, and six vector and matrix operators out. — *the library: meet declarations*; kind: **detail**.
5. Under walk, a program's own trait with a functional `||` family operator that can meet `String` needs `excludes { String }` or the meet, where walk analyses the library afresh (row 342). — *walk: load checks of overloading*; kind: **defect** (row 342); overlap: F-269 (walk checks a program's operator declarations against the library's only on a cold cache, row 342); checks: stale: row 342 is about walk's cache and does not say the library is analysed afresh (a ledger row's status disagrees).
6. Tests: `StringConcatenationFamiliesWalk.fss`, the distance stage, `XXXFunctionalMethodMeetOperator.fss`. — kind: **tests**; checks: found (scout).
7. Detail in `rung-symbolic-library` report. — kind: **pointer**.

- Shape: several subjects (the library: string concatenation operators; the library: meet declarations; walk: load checks of overloading).
- Title: claim 1 with the 54-error history; the body serves both halves, which answer different questions.

## F-277 "The compiled checker's overloading exclusion test reads the `self` of a trait whose self type comes from its F-bound as `C[\X\] & X`"

1. The exclusion test reads `self` of an F-bound self-typed trait as `C[\X\] & X`. — *the checker: overloading exclusion test*; kind: **property**; overlap: F-225 ("save in the overloading check's exclusion test (F-277)"), F-318 (walk's same reading); checks: sound (scout).
2. It reads each static parameter at the top of the two domains' meet as its declared bounds; every other overloading rule keeps the plain signatures. — *the checker: overloading exclusion test*; kind: **property**; overlap: F-258 (`meetEmptyWithBounds`, "reads each static parameter at the top of the meet as its declared bounds"); checks: sound (scout).
3. It builds P-157. — kind: **pointer**.
4. It reads a listing `comprises` trait's `self` as the trait met with the union too, a batch's default (F-225). — *the checker: overloading exclusion test*; kind: **choice**; overlap: F-225 (same default); checks: sound (scout).
5. The second arrow is built from the declaration's own parameters only where they differ from `parameters()`, and the bounds are read in one more conjunct, `meetEmptyWithBounds`. — *the checker: overloading exclusion test*; kind: **detail**; checks: stale: names `FunctionalMethod.ast`, which does not exist; the file is `compiler/index/FunctionalMethod.java` (cites a thing that is gone).
6. With the full check on, the 8 pairs between `AdditiveGroup`'s `+` and `-` and the generic scalar block clear (191 to 183), and the count stage is 98. — *the harness and the gate: distance and count*; kind: **history**.
7. `tint` stays refused, `Box[\Bottom\]` being in both domains (row 786). — *the checker: overloading exclusion test*; kind: **defect** (row 786); overlap: F-258 (row 786); checks: row 786 CONTESTED (scout).
8. Row 713's pair is accepted and runs, and walk refuses it at load. — *walk: load checks of overloading*; kind: **defect** (row 713); overlap: F-227 (row 713); checks: row 713 CONTESTED (scout).
9. Walk loads the vector pairs' shape in a program's own component, reading `self` so (F-318). — *walk: load checks of overloading*; kind: **pointer**.
10. Gated by `Exclusion*`, `XXXExclusion*`, `OverloadTwoBoundsClosedTraitExclusion`. — kind: **tests**; checks: found (scout).
11. Detail in `rung-self-type-exclusion` report. — kind: **pointer**.

- Shape: one subject (the checker: overloading exclusion test), with walk's view.
- Title: claims 1 and 2; the body serves it.

## F-278 "The library's subscripts over a generic index type are a valid overloading at every instance"

1. The library's subscripts over a generic index type are a valid overloading at every instance, the index bounded by `Index`, which `ZZ32` extends and the ranges exclude. — *the library: index bound*; kind: **property**; overlap: F-81 and F-82 ("valid since the index bound (F-278)"), revival-changes.md:48; checks: sound (scout).
2. A tuple of `Index` types is an `Index`, outside `Object`, on both paths. — *the library: index bound*; kind: **property**; overlap: F-259 ("but the library's `Index` (F-278)"); checks: `FortressLibrary.fsi:2180` (scout).
3. Under the full check the 124 subscript errors are gone (191 to 67 with this alone, batch 21's base). — *the harness and the gate: distance and count*; kind: **history**.
4. The checker and walk read the library's trait by its qualified name; walk refuses a program's own top-level `Index` or `Indexed` as ambiguous. — *walk: index bound*; kind: **property**; overlap: none found (searched "Type name may refer to"); checks: sound (scout).
5. `()` is no `Index`; a type extending only `Index` is an `Object`; a program's generic over an index parameter must bound it by `Index` for the checker. — *the library: index bound*; kind: **property**; overlap: F-259 (an `extends Any` type is an `Object`, except `Index`); checks: sound (scout).
6. A numeral at `Index` takes its default `ZZ32` on both paths (F-342). — *the library: index bound*; kind: **pointer**.
7. The checker refuses a tuple expression at a function over `Index` (row 805). — *the checker: index bound*; kind: **defect** (row 805); overlap: none found (searched "row 805"); checks: row 805 NEGATIVE-VERIFIED (scout).
8. Walk loads a function over `Index` beside one over a tuple type whose elements neither lie below nor exclude `Index`, which the checker refuses (row 806). — *walk: index bound*; kind: **defect** (row 806); overlap: none found (searched "row 806"); checks: row 806 NEGATIVE-VERIFIED (scout).
9. Gated by `TupleIndexBoundWalk.fss`, `TupleIndexExclusionWalk.fss`, and the distance stage. — kind: **tests**; checks: found (scout).
10. Detail in `rung-index-bound` report. — kind: **pointer**.

- Shape: several subjects (the library: index bound; the checker: index bound; walk: index bound), all on `Index`.
- Title: claims 1 and 2; the body serves it.

## Lists

### Subject labels and their entries

- the checker: closed traits and bounds: F-94, F-227
- the checker: speed and memos: F-94, F-231, F-235
- the checker: expected type and inference: F-221
- the checker: self-typed traits: F-225
- the checker: inherited static parameters: F-226
- the checker: node hashes: F-232, F-254
- the checker: local functions: F-233
- the checker: well-formedness errors: F-237
- the checker: where clauses: F-244, F-250, F-251, F-256
- the checker: conditional extension: F-255
- the checker: dropped clauses: F-255
- the checker: omitted types from the api: F-254
- the checker: untyped parameters: F-266
- the checker: abstract-method check: F-267
- the checker: overloading exclusion test: F-227, F-277
- the checker: operator overloading check: F-245
- the checker: index bound: F-278
- the code generator: self-typed traits: F-225
- the code generator: Any static arguments: F-268
- walk: expected types: F-221
- walk: self-typed traits: F-225
- walk: load checks of overloading: F-227, F-245, F-276, F-277
- walk: value hashes: F-232
- walk: where clauses: F-251, F-256
- walk: conditional extension: F-255
- walk: Object bound: F-265
- walk: index bound: F-278
- the library: generators and sizes: F-93
- the library: big operator static arguments: F-220
- the library: self-typed traits: F-225
- the library: reductions and fusion: F-242, F-243
- the library: AnyList: F-243, F-251, F-255
- the library: static parameter bounds: F-265
- the library: string concatenation operators: F-276
- the library: meet declarations: F-276
- the library: index bound: F-278
- the specification: static parameter bounds: F-265
- the specification: parameter type inference: F-266
- the specification: operator static arguments: F-267
- the harness and the gate: distance and count: F-220, F-237, F-243, F-245, F-251, F-254, F-255, F-256, F-276, F-277, F-278
- the harness and the gate: stage times: F-231, F-235, F-240
- the harness and the gate: method-size guard: F-236
- the tools: full-check stage: F-245

### Entries that overlap

- `where` clauses: F-244 restates F-250 (method constraint bounds its parameter, row 748), F-251 (escape, two-value and Amin–Tate tests; row 752), F-255 (row 773) and F-256 (dotted call); F-250, F-256 and F-70 share row 470.
- Closed traits: F-94 and F-227 (the normal form's expansion, rows 686, 687, 689, 690); the followups merged F-94 into F-227.
- Self type in the exclusion test: F-225, F-277 and F-318 (`C[\X\] & X`, the `comprises` default); F-277 and F-258 (`meetEmptyWithBounds`, row 786); F-227 and F-277 (row 713).
- The fusion pairs: F-242, F-243 and F-250 (the method condition and the generic `distribute`); F-243 and F-85 (the casts at the identity fallbacks).
- `AnyList` and `List`: F-243, F-251 and F-255 (the `comprises ... where` clause, the conditional `LexicographicOrder`).
- The full check of symbolic operators: F-245, F-276, F-277, F-278 and F-281 (191 split into 54, 124 and 8; "the distance stage is the full check").
- Omitted types: F-254 and F-370 (the api declaration gives the type); F-254 and F-232 (identity-hash order); F-266 and F-370 (rows 405 and 1032).
- Code generator at `Any`: F-268 and F-315 (same tests, row 889).
- Memos and speed: F-235, F-65, F-43, F-94 (memos); F-231 and F-236 (the 8,000-byte limit); F-231, F-235 and F-240 (stage times).
- Big operators: F-220, F-228 (`body(i: I)`); F-221 and F-59 (plain and self-bounded big operators' expected type).
- String concatenation: F-276, F-249 and F-259 (top-level `||` over `String` and `Any`); F-276 and F-269 (row 342).
- Index: F-278, F-81, F-82 and F-259.
- Operator static arguments: F-267 and F-39.
- Rows 773 and 774: F-255, F-244 and F-181.

### Not settled by the search

- F-93 and F-237: whether their designs are a worker's or the coordinator's choice; the stale list says so, the entries do not (followups-checker-3).
- F-94 and F-227: with `Number` no longer closed, whether any library call still meets the closed-trait case.
- F-254: what `FortressLibrary.fss:131` should hold for the claim (stale list: unsettled).
- F-255, claim 7: the other readers of a conditional `extends`, with no ledger row (unsettled).
- F-265: whether walk still stops with an `InterpreterBug` at an `Object`-bounded type variable given a tuple; its probe is gone (unsettled).
- F-267: whether the checker still refuses the subtrait; no row, no test, probes gone (unsettled).
- F-225 claim 14: the Papers line, `CompilerAlgebra.fsi` and commit `655e65d53` were not checked by the scout; F-377 and F-385, which claims 11 and 12 rest on, were not read.
- F-240: the times 65 s and 117 s are not in a file the scout read.
- F-256 claim 3: a refusal on both paths at name binding, with no ledger row named; the search found no entry or row that holds it.
