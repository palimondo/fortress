<!-- Chunk f7 of the FACTS clarity assessment: F-88 to F-94, F-220, F-221 and F-225 to F-227, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `5ca623461`. -->

# FACTS chunk f7: assessment

The base is `main` at `5ca623461`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the report sections, the gap ledger rows, the tests and the code or library lines that the claim rests on. I ran no experiment and searched no transcript. Where a claim needs a measurement that nobody made, I give the narrow question.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-88 | pass | pass | pass | pass | pass | pass | keep |
| F-89 | pass | pass | pass | pass | pass | pass | keep |
| F-90 | **fail** | **fail** | pass | pass | **fail** | **fail** | **reorganize** |
| F-91 | pass | pass | pass | pass | pass | pass | keep |
| F-92 | pass | pass | pass | pass | pass | pass | keep |
| F-93 | pass | pass | pass | pass | pass | pass | keep |
| F-94 | pass | **fail** | *unresolved* | **fail** | **fail** | pass | **investigate** |
| F-220 | pass | pass | pass | pass | **fail** | pass | **reorganize** |
| F-221 | pass | pass | pass | pass | pass | pass | keep |
| F-225 | **fail** | **fail** | pass | pass | pass | pass | **reword** |
| F-226 | pass | pass | **fail** | pass | pass | pass | **reword** |
| F-227 | pass | **fail** | **fail** | **fail** | pass | pass | **reword** |

Counts: keep 6, reword 3, reorganize 2, investigate 1. Unresolved by criterion: evidence 1 (F-94).

A recurring note, which I did not mark as a fail: several entries name one test, or a glob, that gates only part of the claim. The other tests exist and the cited report's section 2 lists them. I give the missing ones under each entry, so that a later pass can add them if it wants to. Under the record's form this is a choice about what to compress, not a defect of support.

## F-88, what a type provides, and the overriding return type

- **Scope: pass.** The title and the body agree. Both are about the compiled checker. The body gives the provided set and its consequence, and the code generator's refusal of `override` (row 650) states the limit on the compiled path.
- **Present meaning: pass.** It states the current rule.
- **Evidence: pass.** The rule is in `STypesUtil.providedMethods` and `providedAndOverridden` (`scala_src/useful/STypesUtil.scala:1671`, `:1683`), and the return-type check is in `OverloadingChecker.checkOverridingReturnType` (`:684`). Report section 1, rows 610 and "The return types of an overriding pair", holds both. Row 650 is NEGATIVE-VERIFIED, pinned by `compiler_tests/XXXOverrideModifierCodeGeneration`. Note: the glob `compiler_tests/Override*` matches only the two accepted widenings (`OverrideAbstractMethodWiden`, `OverrideFunctionalMethodWiden`). The refusals (`XXXOverrideReturnTypeNotSubtype`, `XXXOverrideGenericReturnTypeNotSubtype`) and the redeclared abstract method that an object must define (`XXXReabstractedMethodNotImplemented`) are outside the glob, in report section 2.
- **Comprehension: pass.** "Repeats in its parameter types" is clear enough beside the next sentence's example. The report's "self apart" is gone, which loses only precision.
- **Ownership: pass.** It has one subject. Renaming apart is F-226's.
- **Consistency: pass.** F-80 points here for what a type provides, and agrees.
- **Disposition: keep.**

## F-89, the ranges of rank 2 and 3

- **Scope: pass.** The title speaks of rank 2 and 3. The body extends the comparisons to rank 1 to 3, which is wider than the title, not narrower. The facts are declarations of the library, so they hold on both paths.
- **Present meaning: pass.**
- **Evidence: pass.** `BoundedRange2D` and `BoundedRange3D` extend `{ Range2D, BoundedRange[\(ZZ32, ZZ32)\] }` and the rank-3 twin (`Library/RangeInternals.fsi:265-276`). The empty range's bounds are written in order (`RangeInternals.fss:1787`). Report sections 1.1 to 1.3 hold the three claims. Note: `tests/RangeKindBodies.fss` gates the comparisons only (`CMP` and `FORWARD_CMP`, `:51-80`). `|#(0,3)|` being 0 is asserted in `tests/RangeDeclarations.fss:113`, and the bounded kinds by `RangeBoundedEveryForward.fss`.
- **Comprehension: pass.** "Kinds" is the section's word for the range traits. The example `|#(0,3)|` is 0 makes the last clause concrete.
- **Ownership: pass.** It has one subject, the declarations of the range traits of rank 2 and 3. Its three claims are short, and none hides another.
- **Consistency: pass.** F-82 points here for "`CAP` at each rank". F-89 no longer says `CAP`, but it names the bounded kinds that the `CAP` meets answer. F-91 and P-56 do not conflict with it.
- **Disposition: keep.**

## F-90, the arrays' and other slips of rung S

- **Scope: fail.** The title claims more than the body and the report support. Quoted: "The one library's array and matrix objects, `SUFFIX_SUM`, `String`'s `left` and `right`, and `QQ`'s rounding answer their declared types." The rung repaired named declarations: `__DefaultVector`, `__DefaultMatrix` and `TransposedMatrix`, `__immutableFactory1`'s declared type, `__ImmutableSubArray1`'s `put`, `Matrix`'s `mul` and `TransposedMatrix`'s arithmetic (report section 1, items 1 to 5). Other array and matrix bodies got their declared type later, through `cast` (F-264). The title also does not say which check "answer their declared types" refers to. It is the compiled checker's, by the distance stage.
- **Present meaning: fail.** One clause is no longer true. Quoted: "Left nearby: `__immutableFactory1`'s body, whose `typecase` arms answer different sizes, a site of the distance". The current per-site list (`compile-ladder/gate/distance-sites.tsv`) has five sites: the export error, two `BIG MIN` sites, `FortressLibrary.fss:1465` and `List.fss:146`. The factory's body (`Library/FortressLibrary.fss:2572-2578`) is not among them. The strided `:` (row 661) is still NEGATIVE-VERIFIED, so that half of the clause holds.
- **Evidence: pass.** The bounds are in the library (`FortressLibrary.fss:2547`, `:2935`, `:2943`) and `SUFFIX_SUM` loops over `seq((0 # (|x| - 1)).reverse)` (`:4896`). Report section 1 holds each repair. Note: `tests/TransposedMatrixAndFreeze.fss` gates the matrices and the freeze. `StringPieces.fss` and `NumberOrderListDeclarations.fss` gate the `String` and `QQ` parts, in report section 2.
- **Comprehension: pass.**
- **Ownership: fail.** The entry is one rung's list of unrelated slips. The parts change apart, and other entries own most of them. Quoted: "`left` and `right` build P-53, and the rounding P-54." P-53 and P-54 hold those rulings, each marked "Built.". F-151 owns the family's bound, which this entry repeats through "take `Vector`'s bound (F-94)". F-264 owns how the array factories, `__immutableFactory1` among them, get their declared type.
- **Consistency: fail.** F-264 says that the `__immutableFactory1` branch gets its declared type through `cast`, "So the compiled checker accepts all these bodies (the distance stage)". F-53 does not count it among the five errors either. F-90 still calls the body "a site of the distance" (quoted above). Its pointer for the bound goes to F-94, but F-151 owns the bound.
- **Disposition: reorganize.** Drop the stale "site of the distance" clause, keeping row 661. Point the bound at F-151, which owns it. Keep the repaired array and matrix declarations under a title that names them, or move them to the owner of the array family's declared types (F-264). Keep the P-53 and P-54 pointers only as the decisions that these repairs build, or move them to the entries those positions point to.

## F-91, `narrowToRange` and its bounds check

- **Scope: pass.** The title and the body agree on the range kinds over `ZZ32` of rank 1 to 3.
- **Present meaning: pass.**
- **Evidence: pass.** `checkSelection`, `checkSelection2D` and `checkSelection3D` are at `Library/RangeInternals.fss:125`, `:140` and `:157`. The `OpenRange` overloads are at each kind (`:194`, `:251`, `:321`, `:596`, `:649`, `:662`, `:1093`, `:1181`, `:1259`). Row 416 is NEGATIVE-VERIFIED and names the rank naming. Report section 1 holds the rest. Note: the corner check of the arrays' range subscripts is gated by `tests/ArrayRangeCornerBounds.fss`, and `(:)`'s five methods by `TrivialOpenRange*Stop.fss`. Both exist.
- **Comprehension: pass.** Note: "Each kind also declares the meet with an `OpenRange`" does not name the method. The sentence before it makes `narrowToRange` the subject, and this section uses "meet" for a Meet Rule declaration (F-82). A rewrite could say "`narrowToRange(other: OpenRange[\…\])`, the Meet Rule's meet". I did not mark this as a fail.
- **Ownership: pass.** It has one subject. P-52 and P-56 are pointers with a few words each.
- **Consistency: pass.** P-52's example and P-56's five methods agree.
- **Disposition: keep.**

## F-92, the order operators on pairs and triples

- **Scope: pass.** The refusal is stated for walk only, and the bound is a declaration of the library (`Library/FortressLibrary.fsi:2644-2654`).
- **Present meaning: pass.**
- **Evidence: pass.** Report section 6's table and the skeptic's list give each example: `(1,()) < (2,())` and `(1,2) < (1,2.5)` refused, `(nan,1) < (1.0,1)` false, `(nan,1) CMP (1.0,1)` `Unordered`, and `p: (ZZ32,RR64)` comparing as before. Row 511 is NEGATIVE-VERIFIED. The tests `tests/TupleOrder{Bounds,NestedRefused,UnitRefused,MixedRefused}` exist.
- **Comprehension: pass.** Note: "Operands declared with one type convert and compare." is terse. The report's example, `p: (ZZ32,RR64) = (1,2)`, would make it concrete in a few words.
- **Ownership: pass.**
- **Consistency: pass.** No other entry holds the tuple orders.
- **Disposition: keep.**

## F-93, a generator's size, the relational predicate, and the default index-value pairs

- **Scope: pass.**
- **Present meaning: pass.** "It builds PLAN item 45 at its default" keeps the default apart from a ruling. PLAN item 45 says "built at the judgement's ways 1, 3 and 6 while his answer is pending" (review-queue item 39).
- **Evidence: pass.** `Generator` declares `opr |self|` at `Library/FortressLibrary.fsi:840`, with its counted body at `.fss:1249-1250`. `Indexed`'s default is `SimpleIndexValuePairs[\E,I\](self)` (`.fss:1980-1981`). Both changed answers are asserted: `increasing((0#4).reverse)` "fails" (`tests/RelationalPredicateTargets.fss:14`), and the pairs of a value indexed from 5 (`tests/IndexValuePairsDefault.fss:54`). Note: the entry names only `tests/GeneratorSize.fss`, and these two tests gate its other claims.
- **Comprehension: pass.** "The relational predicate" is the library's own term (`FortressLibrary.fsi:2679`, "Relational Predicates"; `relationalPredicate`).
- **Ownership: pass.**
- **Consistency: pass.** F-85 points here for "a generator's size and index (row 629)", and agrees.
- **Disposition: keep.**

## F-94, the array family's bound in the compiled checker

- **Scope: pass.** The title's claims are within what F-227 and the ledger support. Rows 686, 687, 689 and 690 are FIXED, and the count stage checks the family.
- **Present meaning: fail.** The body tells the reader how the defects came about, not what holds now. Quoted: "Its refusals and crashes there (rows 686, 687, 689, 690), the library's `squaredNorm(me)` among them, had one cause, the normal form's expansion of the closed trait over a conjunct that names the variable, which F-227 gives." That is the repair's history. The current property, that such calls check, is F-227's, and F-151 already says that `squaredNorm(me)` checks.
- **Evidence: unresolved.** Quoted: "A memo on the trait table keeps the count stage within its 900-second limit (row 688)." The memo exists (`TraitTable.scala:138`, `fortress.analyzer.ground.cache`, default on), and the limit is still 900 s (`tools/checker-count/run.sh:69`). The sentence was kept to warn that a repair that turns the memo off misses the limit (FACTS-history, F-94, 2026-10-13 18:39Z). That warning rests on the 17 minutes measured without the memo before rung-checker-bounds. Rung-checker-bounds then stopped the expansion of `Number`'s `comprises` clause over a variable's bound, which was the cost that the memo bounded (`perf-probes/checker-speed/REPORT.md` sections 1 to 3). Its own runs were made with the memo on, and show "no measurable effect of the normal form on the api checks, which row 688's memo bounds" (`compile-ladder/rung-checker-bounds/REPORT.md` section 6). No run since has timed the count stage without the memo. The entry's detail route also misses the memo's fix: `rung-array-bound/REPORT.md` sections 1 and 9 hold the problem, and `perf-probes/checker-speed/REPORT.md` section 6 holds the fix, uncited.
- **Comprehension: fail.** The title reads as a garden path. Quoted: "checks the array family under the bound `T extends { Number, MultiplicativeRing[\T\] }`, and calls through a parameter so bounded". "Calls" can be read as a verb, "the checker calls through a parameter".
- **Ownership: fail.** Two entries already own the subjects. F-227 owns the calls through such a parameter, and F-151 owns the bound and its `squaredNorm(me)` call. The one subject left to F-94 is the trait table's memo and the count stage's time (row 688).
- **Consistency: pass.** F-227 and F-151 agree with what it says.
- **Disposition: investigate.** The narrow question is this. On the current tree, does the count stage (`tools/checker-count/run.sh`) with `-Dfortress.analyzer.ground.cache=false` still exceed its 900 s limit? If yes, keep the warning, scoped to that run. If no, state the 17 minutes as a measurement from before rung-checker-bounds. Then reorganize: give F-94 the memo's subject alone, cite `perf-probes/checker-speed/REPORT.md` section 6, and leave the calls to F-227.

## F-220, `__bigOperator`'s typed `body(i: I)`

- **Scope: pass.** It is scoped to walk and to the count.
- **Present meaning: pass.** "No longer instantiates" is a word of change, but the property it states holds now.
- **Evidence: pass.** The line is `body(i: I): L = r.lift((o.body)(i))` (`Library/FortressLibrary.fss:1316`). `tests/UnwrittenListMapComprehensionWalk.fss` runs both comprehensions. The count's three errors (F-53) do not include this line.
- **Comprehension: pass.** Note: "The checker count passes it" means that the compiled checker accepts the line.
- **Ownership: fail.** F-228 already holds the claim. Quoted from F-220: "which walk runs since it no longer instantiates a big operator's static parameter at `BottomType`". F-228's title ends "so `__bigOperator`'s `body(i: I)` is typed", and F-228 is gated by the same test. The two entries change together. The only content that F-220 adds is that the compiled checker accepts the line.
- **Consistency: pass.** F-228 and F-53 agree with it.
- **Disposition: reorganize.** Merge into F-228: add a clause there saying that the compiled checker accepts the typed line (F-53). Repoint any incoming pointers to F-220 (`F-220+` lists none). Or reduce F-220 to that clause with a pointer to F-228.

## F-221, the retry of a call that is another call's argument

- **Scope: pass.** It states the condition: "where the enclosing call is not accepted otherwise". It states the walk limit (row 705) and the F-bounded limit (row 731).
- **Present meaning: pass.** "Still refused" and "now runs it" are words of change, but each states a current property: row 731 is NEGATIVE-VERIFIED, and the multifix declaration is the one taken.
- **Evidence: pass.** The retry is in `Functionals.scala:740` and `:839-924`. The tests `compiler_tests/InferCallArgument*` (eight) and `InferBigOperatorExpectedType` exist. SKEPTIC finding 5 is at `rung-argument-context/SKEPTIC.md:118`. Rows 705 and 731 hold their halves.
- **Comprehension: pass.** Note: "each enclosing declaration's parameter type" means each declaration of the enclosing call, as P-51 says. The same sentence names "the enclosing call", so the reader can resolve it. "Each declaration of the enclosing call" would remove the doubt.
- **Ownership: pass.**
- **Consistency: pass.** P-51, P-49 and F-87 agree with it.
- **Disposition: keep.**

## F-225, `self` in a self-typed trait's bodies

- **Scope: fail.** The rule holds only in a trait with no `comprises` clause, or with one that lists only `...`. The entry drops that condition. Quoted: "The compiled checker types `self` in a self-typed trait's method bodies as the implementing type, read from the trait's F-bound". In a trait with a non-empty `comprises` clause, `self` is the trait met with the union of the listed types, not the self parameter (`scala_src/disambiguator/SelfParamDisambiguator.scala:77-82`, `:101-103`, `:259-262`). The previous text kept the condition (FACTS-history, F-225, 2026-10-14 06:09Z).
- **Present meaning: fail.** A count from one measurement reads as a count of the library. Quoted: "The library's 29 self-typed bodies check." The 29 are the 29 sites of distance classes S1 and R4 that the rung cleared (`rung-self-type/REPORT.md:3`, `:75`, `:132`). The POSITIONS audit left this number to F-225 as "a count from one measurement" (POSITIONS-history, P-146, 2026-10-22 08:30Z), and the entry does not say so. The thirtieth body, `Integral`'s `numerator`, is not mentioned, while P-146 names it.
- **Evidence: pass.** `SelfParamDisambiguator.selfParam` and `TypeHierarchyChecker.checkDeclSelfParams` and `checkObjectExprSelfParams` (`:110`, `:137`) hold the rule and its message. The tests `compiler_tests/SelfType*` and `XXXSelfType*` exist. Row 695 is NEGATIVE-BOUNDED, "Reached since F-225, at an object-typed `S` only: `XXXSelfTypeReturnSelfRun`". Rows 710 and 355 are NEGATIVE-VERIFIED.
- **Comprehension: pass.**
- **Ownership: pass.** Its consequences (walk, row 695, rows 710 and 355) all follow from the rule.
- **Consistency: pass.** P-146 says that the rule accepts every self-typed body "except `Integral`'s `numerator`, which each integer type declares instead". That agrees with F-225 once the 29 are read as the measured sites. Today the reader must reconstruct this, which is the present-meaning fail.
- **Disposition: reword.** Restore the `comprises` condition. Name the 29 as the distance sites cleared at the rung's measurement, or drop the number for P-146's wording.

## F-226, renaming an inherited method's static parameters apart

- **Scope: pass.** Both halves are stated with their sites: the overloading check and a call.
- **Present meaning: pass.** Note: "are repaired alike" is a repair's word for "get the same renaming".
- **Evidence: fail.** The gates and the code support the claim. The route to its detail does not. `instantiateMethodApart` is at `STypesUtil.scala:1850-1868`, called from `commonInheritedMethods` (`:1838-1848`). The overloading half's fresh names are at `OverloadingChecker.scala:225`. Rows 561 and 627 are FIXED, and the three named tests exist. Quoted: "Detail: `perf-probes/nat/triage.md` section 3; `compile-ladder/rung-checker-contexts/REPORT.md` section 1." Triage section 3 classifies the capture (e2) but does not hold its fix. Rung-checker-contexts section 1 is row 651's bound check, and names rung E's renaming only in passing. The call-site renaming is in `compile-ladder/rung-checker-expected-type/REPORT.md` section 1 (climb batch 11 rung E, row 627). The entry took F-87's detail citation when the renaming clauses moved here (FACTS-history, F-226, 2026-10-14 11:39Z).
- **Comprehension: pass.** `name$i` is the form that the checker's messages print, as in "G$1 is not in the kind env", so it helps the reader.
- **Ownership: pass.** It is the one home that F-43 and F-87 point to.
- **Consistency: pass.**
- **Disposition: reword.** Cite `rung-checker-expected-type/REPORT.md` section 1 (row 627) for the call, and the report of row 561's fix (climb batch 8 rung O) or row 561 for the overloading check.

## F-227, the normal form over a variable

- **Scope: pass.** The title and the body agree on the compiled checker and on the variable condition.
- **Present meaning: fail.** One referent is relative to the rung that made the change. Quoted: "an overloading the base accepted through the expansion is refused (row 713)". "The base" is rung-checker-bounds' base tree (`ee1aa1a95`). A reader today would take it to be their own base.
- **Evidence: fail.** Two parts of the stated support are wrong.
  - The line citation is stale. Quoted: "(`TypeAnalyzer.scala:708-735`, `:165-180`)". Those lines now hold the normalizer's tuple and arrow cases and their memo. `normConjunct` and `excludedListed` are at `scala_src/types/TypeAnalyzer.scala:762-789`. The union cases are still at `:165-180`. The citation puts the expansion at the wrong place, and the entry does not name `normConjunct`.
  - The entry drops an open question. Row 713 is CONTESTED: "Unsettled: Appendix I lists whether two parameter types exclude where only static arguments that a bound rules out could meet them". The previous text said "on a question Appendix I lists as not settled" (FACTS-history, F-227, 2026-10-14 14:58Z). The current text states the refusal as a plain consequence, and the gate that pins it (`XXXOverloadTwoBoundsClosedTraitExclusion`) is outside both globs.

  The rest is supported: rows 686, 687, 689, 690 and 711 are FIXED, row 712 is NEGATIVE-VERIFIED, and the tests matching `*TwoBoundsClosedTrait` and `*TwoGroundBounds*ClosedTrait` exist.
- **Comprehension: fail.** The second sentence leaves out its verb. Quoted: "So a call through a parameter bounded by a closed trait and a bound excluding a listed type checks, and the Return Type Rule beside it". The reader cannot tell what "the Return Type Rule beside it" checks, or beside what. It means the Return Type Rule's check of an overloading beside such a declaration (row 690), which now passes.
- **Ownership: pass.** It has one subject, the normal form and the union cases over a variable, with their consequences.
- **Consistency: pass.** F-94 and F-151 point here and agree.
- **Disposition: reword.** Name `normConjunct`, and drop the line numbers or correct them. Say "the checker before this change" in place of "the base". Restore that row 713's question is not settled. Give the Return Type Rule clause its verb and its object.

## The investigate question

1. F-94: on the current tree, does the count stage (`explorations/coordinator/tools/checker-count/run.sh`) with `-Dfortress.analyzer.ground.cache=false` still exceed 900 s? This needs one run of the stage. It decides whether the entry keeps its warning that the trait table's memo must stay on, or states the 17 minutes as a measurement from before rung-checker-bounds.
