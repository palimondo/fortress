<!-- Chunk f13 of the FACTS clarity assessment: F-143, F-144, F-145, F-146, F-147, F-148, F-222, F-228, F-230, F-238, F-239 and F-248, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `a898e1baf`. -->

# FACTS chunk f13: assessment

The base is `main` at `a898e1baf`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the tests, the ledger rows, the library and the code. I ran no experiment and searched no transcript. Where a mark rests on my reading of a report or the code and not on a run, the reason says so.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-143 | pass | **fail** | **fail** | pass | pass | pass | **reword** |
| F-144 | pass | **fail** | **fail** | pass | pass | **fail** | **reword** |
| F-145 | pass | pass | pass | pass | **fail** | pass | **reorganize** |
| F-146 | pass | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-147 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-148 | pass | pass | pass | pass | pass | pass | keep |
| F-222 | pass | pass | pass | pass | pass | pass | keep |
| F-228 | **fail** | pass | pass | **fail** | **fail** | **fail** | **reorganize** |
| F-230 | pass | pass | pass | pass | pass | pass | keep |
| F-238 | pass | **fail** | pass | **fail** | **fail** | pass | **reorganize** |
| F-239 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-248 | pass | **fail** | pass | **fail** | pass | pass | **reword** |

Counts: keep 3, reword 5, reorganize 4, investigate 0. Assessed: 12 of the chunk's 12. Unresolved marks: none. Every fail below has a known resolution in the cited or the later evidence. Four questions for entries and rows outside this chunk are at the end.

One cause runs through F-143, F-144 and F-228. Climb batch 15's rung B (F-228) instantiates an unwritten big operator first by a declared type, then by its elements' join. Only after that does an F-bounded parameter stay open (F-143), or a plain-bounded one take its bound. F-143 and F-144 still say what the open parameter and decision D2 did before that rung. F-228 says "else at its bound" without the F-bounded case.

## F-143, the open type parameter under walk

- **Scope: pass.** The title and the body agree: under walk only, a parameter whose bound mentions itself and that nothing at a call fixes.
- **Present meaning: fail.** Quoted: "So a reduction that writes no static argument runs on its elements' types." Since F-228, walk instantiates a non-empty clause form, or one that a declared type directs, by the declared type or by the elements' join, before any parameter is left open (`compile-ladder/rung-walk-elements/REPORT.md` section 1, item 3; section 5.2: the step "runs for every unwritten clause form whose big operator value has static parameters"). So the open type reaches a reduction only when the reduction is empty and no declared type directs it (row 716), or when a hint does not fit. The sentence tells the state before that rung. Quoted too: "Rows 645, 646 and 662 are fixed by the declared type's and the elements' instance (F-228)". This is repair history. The present point is that F-228 acts first.
- **Evidence: fail.** Two parts of the route do not hold the claims.
  - Quoted: "Gated by `tests/UnwrittenReductionWalk.fss`." Its three forms are `emptySum(n: ZZ32): ZZ32 = SUM[j <- 0#n] j`, whose declared `ZZ32` directs it, and two non-empty locals, `SUM[j <- 0#4] j` and `PROD[j <- 1#3] j`. F-228 fixes each of these first. I found this by reading the report, not by a run. The open type is still exercised by `tests/InferUnfixedFBoundedWalk.fss`: its empty `PROD[j <- 1#0] j` bound to an untyped local, and `mk()`. The tuple clause is exercised by `tests/OpenTupleDispatchWalk.fss`, which row 663 names. The history shows that the consolidation of 13 October dropped `InferUnfixedFBoundedWalk` from the gate list.
  - Quoted: "A declaration whose parameter type is the open type is the most specific, so it is chosen for every argument." The cited `rung-walk-open-param/REPORT.md` sections 1 and 11 do not hold this. Its support is `rung-walk-open-param/SKEPTIC.md` section 3, finding 3: the skeptic's probe `SkOpenDispatch`, observed, with no gated test.

  The claims themselves are supported. The open type is still in the code (`EvaluatorBase.java:389-390`, `types/BottomType.java:36`).
- **Comprehension: pass.** "Admits no more than at `BottomType`" is elliptical, but the example after it, "`(Int, Int)` is not below `(OPEN, OPEN)`", settles it.
- **Ownership: pass.** One subject. The repair sentence is counted under present meaning.
- **Consistency: pass.** F-141 and F-228 point to F-143 for the F-bounded case, and F-143 points to F-228. F-114 is linked, and its claim depends on the stale sentence: "they pass only because walk leaves that parameter open (F-143; row 424, fixed)". That is a question for F-114's chunk (question 1 at the end).
- **Disposition: reword.** Say that F-228's declared type and join come first, and that the open type now reaches an empty clause form with no declared type (row 716), a generic call such as `mk()`, and a type that holds the open type. Re-gate the entry on `InferUnfixedFBoundedWalk` and `OpenTupleDispatchWalk`. Route the most-specific clause to `SKEPTIC.md` section 3, and name it as the probe's observation.

## F-144, the identity-less reductions typed at their element type

- **Scope: pass.** The title states the library's typing, and the body keeps to it and to walk's consequences.
- **Present meaning: fail.** Quoted: "and the plain-bounded monoid operators stop (F-141)". This is decision D2's case: a big operator's plain-bounded parameter was kept at `BottomType` (`rung-reduction-types/REPORT.md` section 8 names `BIG SQCAP`, `BIG SQCUP`, `List`'s and `PureList`'s `BIG CONCAT` and `PrefixSet`'s `BIG UNION`). Climb batch 15's rung B lifted D2 (F-228, "lifts D2"). Its old-against-new table measured `BIG SQCUP[k <- 0#1] Just(k)` at `Just(0)`, `BIG SQCAP[k <- 0#2] Just(7)` at `Just(7)`, and the nested `List` `BIG CONCAT` at `<|2, 4, 6|>`, where the base stopped at `lift` (`rung-walk-elements/REPORT.md` section 7). The entry was last rewritten on 13 October, before that rung, and the rung's list of FACTS made false (its section 8) does not name F-144.
- **Evidence: fail.** The cited `rung-reduction-types/REPORT.md` section 8 measured the stop before F-228. The later measurement above contradicts it. The other claims are supported: the api (`Library/FortressLibrary.fsi:1923-1929`), the report's section 1, and the tests. One small gap: the refusal at load of a `simpleJoin` at `Any` is gated by `tests/ReductionSimpleJoinAtAnyWalk` (`load_exception_contains=does not define an abstract method declared in type AssociativeReduction`), and the cited glob `tests/Unwritten*Walk.fss` does not match it.
- **Comprehension: pass.** "A static argument that names the lifted type is `Maybe[\R\]`" is terse, but the next clause says why.
- **Ownership: pass.** One subject. `BIG MINMAX` and the tuple forms running is this entry's consequence: their typed `simpleJoin` now implements the abstract one at `R`.
- **Consistency: fail.** The stale clause disagrees with F-228 ("instantiates its big operator by the declared type of its value, else by the join of its elements' run-time types") and with the F-141 that it cites ("a big operator's, at a clause form that writes no static argument, is fixed first by the declared type of its value or by its elements' join (F-228)").
- **Disposition: reword.** Drop the stale clause, or replace it with a pointer to F-228. One gap stays open: if the rewrite says that all five plain-bounded operators now run, `PrefixSet`'s `BIG UNION` and `PureList`'s `BIG CONCAT` were not measured after F-228, and no gated test covers any of the five without a static argument.

## F-145, an inherited abstract method covered under walk

- **Scope: pass.** The body states the limits beside the claim: a generic object is not checked (row 665), an unsettled search refuses, a covering body with static parameters of its own is refused (row 728), and the checker departs at row 725.
- **Present meaning: pass.**
- **Evidence: pass.** `rung-duplicates-coverage/REPORT.md` section 1 holds the refusal of an unsettled search (row 708): a cycle, a symbolic or unreadable type, `OVERLAP_STEPS`, past `OVERLAP_PARTS`. It also holds the checker's `coveredByParts` with the same 10,000 and 4,096 bounds. Rows 725 and 728 hold the departures. The tests exist (`AbstractMethodCoverUnsettledWalk`, `compiler_tests/AbstractMethodCoveredPairs`). Note: the other cited report, `rung-walk-coverage/REPORT.md` sections 1 and 6, still says that a search that does not settle "does not refuse". The later report supersedes it, but the entry does not say that it does.
- **Comprehension: pass.**
- **Ownership: fail.** Quoted: "Walk refuses at load an object that leaves an inherited abstract method uncovered, an `override` that overrides nothing, and a generic type that breaks the Meet Rule for Functional Methods." The body is about coverage alone. It hands the other two claims to F-147 ("F-147 gives the `override` check") and F-142 ("the Meet Rule's"), and still gates `OverrideNothing*Walk`. So a change to the `override` check or to the meet check would need an edit here too.
- **Consistency: pass.** P-147 and rows 665, 725 and 728 agree. Note: F-142 says "The meet check covers every trait, object and object expression, a generic one through a stand-in (F-145)", but F-145 has not described the stand-in since the rewrites of 14 October (history, `FACTS-history.md:2061`, `:2131`). That pointer needs a new target when F-145 is reorganized (question 2).
- **Disposition: reorganize.** Narrow the title to coverage, its one subject. Move the `override` gate to F-147. Repoint F-142's stand-in pointer to the section of the report that holds the stand-in.

## F-146, arithmetic in a size, and opened `where`-clause sizes, in the compiled checker

- **Scope: pass.** The body states the limits: two size parameters count as different (row 683), and an opened size does not compile (row 307).
- **Present meaning: pass.**
- **Evidence: pass.** `rung-size-expressions/REPORT.md` section 1 holds both claims: "Item 15, 15a with its part (b)" for the arithmetic, and "Fork 3, way 4a, under Q13.3" for the opening. Section 12 holds the rows. `compiler_tests/NatArith*` and `NatOpenChecker` exist. Note: walk's reading as any size is gated by `tests/NatOpenWalk` and `NatOpenUnlistedExtender`, which the entry does not name.
- **Comprehension: fail.** Three passages:
  - "It builds P-55, with array fork 3 at its default." The handle means P-85's third array question, way 4a, an agent's default that waits at review-queue item 30. A reader cannot decode it, and the sentence does not say which of the two claims rests on the default. It is the opening.
  - "and rows 675, 682 (contested) and 767". This is a bare list of numbers with no subjects (`references/record.md`, "What an entry is": a pointer carries a few words on what it holds).
  - "opens a value of a trait". The term "opens" is not defined. "Fresh names" in the body helps only in part.
- **Ownership: fail.** The entry holds two claims that answer different questions and change apart. The first is arithmetic in a size, which builds P-55, a curator's ruling, with its rows 683, 767 and 675. The second is the opening of a `comprises`-listed type's `nat` and `int` `where`-clause sizes, which is fork 3's way 4a, a default under review (P-85), with its rows 307 and 682. F-251 holds the type-variable sibling of the opening ("opened at a call, as a size is"), and F-121 cites F-146 and F-251 together for the opening.
- **Consistency: pass.** P-55, F-67 and F-176 agree on the arithmetic. F-121 and F-251 agree on the opening.
- **Disposition: reorganize.** Split the opening from the arithmetic, or move it beside F-251. Mark it as a default with its review-queue item. Give each row its subject.

## F-147, walk's `override` check

- **Scope: fail.** Quoted: "Where walk does not read a static parameter's bounds, it accepts an `override` over an inherited declaration whose types mention one (row 693)." The skill (`references/interpreter.md`, "What walk checks": "if the inherited declaration's parameter types mention a static parameter and differ from the `override`'s") and row 693 ("unless its parameter types equal the override's") limit this to types that differ from the override's. At equal types, the `override` is still refused.
- **Present meaning: pass.**
- **Evidence: pass.** `rung-walk-override/REPORT.md` section 1, the skill's rule, rows 614, 649 and 693, and the tests `Override*Walk` exist. Note: `AbstractOverrideUndefinedWalk` (row 649), which shows the abstract `override` leaving an object without a body, is outside the cited glob.
- **Comprehension: fail.** Quoted: "Walk reads an `override` by the chapter's strict subtype". Neither "the chapter" nor "strict subtype" is explained in the entry. The rule is this: an inherited declaration is overridden only where each of its parameter types is a subtype of the `override`'s and not all are equal. "Where walk does not read a static parameter's bounds" also names neither of its two cases: an object expression, and a declaration that extends a type under a `where` clause.
- **Ownership: pass.**
- **Consistency: pass.** F-145 points here. Note: row 665's claim cell still says that the check of "an `override` that overrides nothing" skips generic objects and generic traits, and its notes name `XXXOverrideNothingGeneric*` tests. Those tests are now gated without `XXX` (`OverrideNothingGenericWalk`, `OverrideNothingGenericTraitWalk`, `OverrideNothingGenericObjectExpressionWalk`), as F-147 says. That is a ledger fix (question 3).
- **Disposition: reword.** State the rule in the title in plain words. Add "and differ from the `override`'s" to the row 693 clause, and name its two cases.

## F-148, a `where` clause's bound under walk

- **Scope: pass.** Walk only, a `where` bound on a static parameter.
- **Present meaning: pass.** The last sentence tells why the parameter's own list matters. It explains a present hazard, not a chronology.
- **Evidence: pass.** `rung-walk-override/SKEPTIC.md` section 3, fix 1 (`7b625cdf9`). The code copies the list before it adds the bound (`interpreter/evaluator/types/SymbolicType.java:46-63`, with a comment that says why). `WhereBoundOverloadWalk` and `OverrideAfterWhereBoundWalk` exist.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** Row 692, fixed, agrees.
- **Disposition: keep.**

## F-222, a power in a size under walk

- **Scope: pass.** "As the compiled path does" holds where the value fits a long: walk gives `Naming.sizeOp`'s value there (`rung-popl-examples/REPORT.md` section 3). Beyond that, the compiled run stops on `2^5000` (row 675), and walk refuses the size as out of range. Neither path gives a value, and the entry claims none.
- **Present meaning: pass.**
- **Evidence: pass.** The report's section 3 (the parser lets a negative exponent come only from a static parameter) and section 6, its table of old walk, new walk and the compiled path. `NatArithPowerWalk` and the three `NatPower*Walk` tests exist.
- **Comprehension: pass.**
- **Ownership: pass.** The class-loader sentence is the contrast that a worker needs, with its row.
- **Consistency: pass.** F-140's walk refusal at binding agrees. F-140's title, "refused on both paths", is broader than the class-loader sentence here and row 675. That is a question for F-140's chunk (question 4).
- **Disposition: keep.**

## F-228, walk's instance of an unwritten big operator

- **Scope: fail.** Quoted: "else at its bound". The entry's own report says: "With no element and no declared type, D2 is lifted: a plain-bounded static parameter takes its bound (P-48), and an F-bounded one stays open (F-143)" (`rung-walk-elements/REPORT.md` section 1, item 3). Row 716 records `SUM`'s F-bounded `T` left open. The title's "the declared type of its value" is also wider than the body's closed list (a local variable, or a top-level or local function's return type). Report section 5.3 lists what the declared type does not reach: a method's return type, a top-level variable, a field, an assignment, a function expression, a branch, a call's argument, and another clause form's body.
- **Present meaning: pass.** The current rule can be read, apart from the handles counted below.
- **Evidence: pass.** The report's sections 1 and 5, and `rung-walk-overload-if/REPORT.md` section 1, "Row 718" (`libraryBigResult`). The seven tests exist. Note: the collector's line range has drifted. `__bigOperatorElements` now ends at `Library/FortressLibrary.fss:1439`.
- **Comprehension: fail.** Quoted: "It builds P-48 by the coordinator's call (the walk probe's way 6 + 7), and lifts D2." "Way 6 + 7" and "D2" are handles from past conversations. The entry does not define them.
- **Ownership: fail.** Detail that is needed only while doing the work: "The hint is an argument to the operator's own instantiation, outside the per-argument caches (`EvaluatorBase.instantiateBigOperator`)", the collector's line range, and `EvaluatorBase.libraryBigResult`. With "lifts D2", which is chronology, this makes about 1,700 characters.
- **Consistency: fail.** "Else at its bound" disagrees with F-143 ("is left open") and F-141 ("an F-bounded parameter stays open (F-143)") for an F-bounded parameter with no element and no declared type.
- **Disposition: reorganize.** Move the mechanism and the line ranges to the report, and the D2 and way handles to the history. Give the third step both cases: a plain bound, and F-143's open parameter. Keep the closed list of the contexts reached, and name what is not reached, or point to section 5.3.

## F-230, `IntMap`'s disjoint union

- **Scope: pass.** It is a property of `Library/IntMap.fss`. It holds wherever this library runs, which is walk today, since the compiled path does not read `IntMap.fss` (`rung-library-factories/REPORT.md` section 6).
- **Present meaning: pass.**
- **Evidence: pass.** The code is as cited: `Library/IntMap.fss:520` is `self.addNew(other)`, `:727-730` is `fromCC` by `UPLUS`, and `Library/Map.fss:161-168` throws on any equal key. The report's sections 1 and 6 support the rest, and the three tests exist. Note: no gated test asserts the same-value case. `IntMapComprehensionRepeatedKey` repeats a key with different values only. The same-value claim rests on reading `addNew`, which throws on any key that the map already holds, and on the report's probe in section 6 ("IntMap.KeyOverlap: 0 |-> 7 and |-> 7"). The entry cites the code, so the kind of evidence is honest.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** The departure from the specification's wording ("the specification names only a different value") is stated beside the claim.
- **Disposition: keep.**

## F-238, two generic declarations read over their own instances

- **Scope: pass.** The body keeps to walk's load check of two declarations with static parameters of their own. "Two generic declarations" in the title means these "own generics" (`rung-walk-overload-if/REPORT.md` section 1).
- **Present meaning: fail.** Quoted: "Walk's load check read two generic functions of one name and one list of static parameters at one shared symbolic instantiation (`FGenericFunction.java:43-64`), ... Now such an exclusion is withdrawn ...". This is a before-and-after account. The shared reading still runs first today (`interpreter/evaluator/values/FGenericFunction.java:43-64`, `getSymbolic`), so the past tense misleads.
- **Evidence: pass.** The report's section 1 ("Row 373") and section 9, decisions 1 to 6. `types/SymbolicNat.unifyStaticArg` exists (`SymbolicNat.java:35`). The ten tests exist.
- **Comprehension: fail.** Quoted, the title: "two generic declarations a pair of whose parameter types excluded only in walk's reading of each at one symbolic instantiation are read each over its own instances". The relative clauses nest, and the body's second sentence, "Now such an exclusion is withdrawn ...", runs to about 130 words with two long parentheticals.
- **Ownership: fail.** The entry repeats what three entries own. F-252 owns the reading on declared domains by the three rules, with the Return Type Rule at the holding instance (F-238 points there for it). F-257 owns the refusal's message. F-258 owns the reading over the whole parameter type, with row 787. It also carries code-level detail: "F-bounds read from the declarations, a symbolic size unified with a size parameter as `types/SymbolicNat.unifyStaticArg` reads it". Its own claim, the withdrawal of an exclusion read at one shared symbolic instantiation with the `ReadableArray` exception, takes up one parenthesis. About 1,900 characters.
- **Consistency: pass.** It agrees with F-252, F-257 and F-258 on each point that they share.
- **Disposition: reorganize.** Keep F-238 for the withdrawal rule and its exception, in the present tense. Point to F-252 for what happens to the pair next, and fold anything F-252 lacks into F-252. Move the code-level detail to the report.

## F-239, walk's `if` clause without a binding

- **Scope: pass.** Walk only, a clause without a binding, and row 746 for the departure from the chapter.
- **Present meaning: pass.**
- **Evidence: pass.** The code is as stated: `forIf` takes an `FBool` by its value, and `maybeType` tests the type's name `Just` or `Nothing` and `Glue.extendsGenericTrait(t, "Maybe")`, which compares names only (`interpreter/evaluator/Evaluator.java:582-621`, `interpreter/glue/Glue.java:70-83`). The three `IfClause*Walk` tests are top-level variables keyed `load_exception_contains=If clause did not return boolean`. This supports the clause "counts as a refusal at load".
- **Comprehension: fail.** Quoted: "a number, a string and an object that is neither are refused as `()`, a tuple and a function were". This can be read as "refused, being taken as `()`". The intended meaning is "refused, as `()`, a tuple and a function already were", which is a comparison with the code before the rung.
- **Ownership: pass.**
- **Consistency: pass.** Row 746 agrees.
- **Disposition: reword.** List every refused value in the present tense: a number, a string, `()`, a tuple, a function, and an object that is neither `Just` nor `Nothing`.

## F-248, the team's generic `distribute` under walk

- **Scope: pass.** Walk only. The probe's variant is the landed one: `distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\]` with no `Any` method (`Library/FortressLibrary.fss:3242-3251`).
- **Present meaning: fail.** Quoted, the title: "stops a nested reduction with no fused pair only where walk infers no static argument of a generic method". Quoted, the body: "with it, on the tree that holds both, `NestedReductionFusion`'s `SUM` of `SUM`s over `inits` is 11 under walk". To read the present state, the reader must work out that both changes are in the tree: the generic `distribute`, and walk's inference of a method's static arguments (row 21, fixed; F-253). The present state is that the nested reductions with no fused pair run, and `NestedReductionFusion` asserts 11 for the sum of sums and 3 for the maximum of maxima. "With the `Any` method gone" is repair history.
- **Evidence: pass.** `perf-probes/generic-distribute/REPORT.md` sections 1 and 5 hold the probe's answers and the stop without inference. `GeneratorDeclarations` and `NestedReductionFusion` exist, and F-253 gates the second. Note: the entry has no "Gated by" line, and the route to the present state, `rung-walk-method-sargs/REPORT.md`, is only in F-253.
- **Comprehension: fail.** "On the tree that holds both", as above. Also "the team's explicit `r.distribute[\L1\](q)`" does not say that this is the team's commented line in `Generator2.distributes`, which the library does not run (probe section 1, "G1"). So a reader can take it as a stop in the present library.
- **Ownership: pass.**
- **Consistency: pass.** F-253 ("Rung L's generic `distribute` then runs the nested reductions under walk (F-248)") and row 21's notes ("the nested reductions of `Generator2.fss:73` run (`NestedReductionFusion`)") agree with the body.
- **Disposition: reword.** State the present result first: every fused answer kept, and the nested reductions running. Name the gates. Keep the dependence on F-253 as a pointer, and say that the explicit form is the team's commented line, which stops under walk (row 744).

## Questions for entries and rows outside this chunk

1. F-114 says that five specification examples "pass only because walk leaves that parameter open (F-143; row 424, fixed)". Since F-228, a non-empty clause form, or one that a declared type directs, is instantiated by its join or its declared type first. Do those five examples now pass by F-228 and not by the open parameter? Reading the five examples would settle it.
2. F-142's "a generic one through a stand-in (F-145)" names material that F-145 no longer holds. The stand-in is in `rung-walk-load-checks/REPORT.md` section 1 and the override rung's report (F-145's history of 13 and 14 October).
3. Row 665's claim cell and notes still name the `override` check as skipping generic declarations, and name `XXXOverrideNothingGeneric*` tests. Its `override` half is fixed (F-147), and the tests are gated without `XXX`.
4. F-140's title, "A size beyond `NN32` or `ZZ32` is refused on both paths", is broader than row 675 and F-222. The compiled class loader checks no size that it computes against its kind.
