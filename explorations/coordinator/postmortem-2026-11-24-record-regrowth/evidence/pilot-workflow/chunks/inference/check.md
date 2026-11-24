<!-- The FACTS clarity pass of 2026-11-24, chunk inference: the checker's comparison of each rewritten entry with the record's entry and its sources, and of the cold reader's answers with the source meaning. -->

# Chunk inference: check

Sources read: the entries as `FACTS.md` holds them now; `assessment.md`, `scout.md`, `proposals.md`, `cold-read.md`, `concepts.md` in this folder; ledger rows 506, 507, 509, 510, 541, 559, 589, 705, 744, 824, 1007-1010, 1012, 1013, 1015, 1018-1021; P-48, P-49, P-51, P-78, P-173; F-53, F-60, F-75, F-250, F-253, F-264, F-342, F-408; `MakeInferenceSpecific.java` and its callers in `EvaluatorBase.java`; `Library/FortressLibrary.fss` at `:1511`, `:1670`, `:3515-3536`, `:3700-3710`; `Specification/basic/inference.tex:129-150`; `rung-walk-dispatch/REPORT.md` section 3; `rung-generator-slips/REPORT.md` section 5; `rung-checker-contexts/REPORT.md` sections 1 and 10; `perf-probes/generic-distribute/REPORT.md` sections 1, 2, 5 and 10; the test folders.

A finding the proposals do not report: several "Meaning: unchanged" and "Sources: every sentence, old" lines hide sentences that were dropped (F-73, F-364, F-365, F-367, F-285). Each is listed under its entry.

## F-28: pass, with wording

1. Fidelity: pass. "Walk has no dimensions" is the report's (`rung-walk-dispatch/REPORT.md` section 3: "only the two dimension forms can be written as a return type, and walk has no dimensions"); "no row holds the gap" is the scout's. Dropping "(row 157, fixed)" loses nothing current.
2. Comprehension: the reader could not tell what the visitor does, why treating `Any` as a trait type matters, or what a missing case does. Source: `MakeInferenceSpecific` runs over the declared return type during inference (`EvaluatorBase.java:696-698`); `forTraitType` and `forAnyType` do nothing, since the type holds no type variable; any class with no case reaches `defaultCase`, `bug(that, "Missing visitor for ...")`, an internal error.
3. Class: wording. Proposed: "Walk's visitor `MakeInferenceSpecific`, which reads a generic declaration's return type to narrow its inferred static arguments, passes over `Any` as it does a trait type. A return type of one of the 11 of the syntax tree's 18 concrete type classes that it has no case for stops walk with an internal error; of those, only the two dimension forms can be written as a return type, and walk has no dimensions, so no row holds the gap."

## F-73 (F-55 merged in): fail

1. Fidelity.
   - Broader claim. New: "Walk does the same from run-time types (F-137), so on both paths a mixed-width call takes the narrowest type that its arguments convert into." The cold reader concluded "a mixed-width call to such a generic gives the same instance on both paths, so a worker need not write the static argument there". Row 509 says the paths run one body at different instances where a static type is wider than its value ("deliberate (walk)"; "With concrete static types, as microGPT's, the paths agree"). Old F-55 kept the two bases apart ("the compiled checker from the arguments' static types and the expected type, walk from their run-time types").
   - Lost information behind a wrong pointer. New: "the checker's reading of the numeral builds P-173 (F-342)". Old: "the checker reads the numeral as `ZZ32`, or as `ZZ64` or `ZZ` when its value does not fit". F-342 has no sentence on a tie among declarations (searched: no "tie"), so the pointer leads nowhere and the reader could not tell what the reading decides.
   - Dropped conditions, unreported: "It looks for that type among its arguments' types, their coercion targets and its bound, the bound only when it is a trait type other than `Object` or `Any`" (limits "its bound permits"); row 506's "where a lone parameter that numerals alone fix counts one choice" (row 506 holds it). "A type parameter that numerals alone fix ... takes the narrowest default" is held by F-342, so that drop is fine.
   - Dropped gates, unreported: `compiler_tests/NatLitArgChecker` and `CoercionGenericFnCompiledRungC` (both exist).
2. Comprehension: beyond the above, "three narrow cases" are unnamed (as in the old entry; they are in the Detail section), and "combinations of candidate types" is unclear; row 506 says "the types it chooses for a generic's lone type parameters".
3. Class.
   - Wording (walk sentence): "Walk applies the same rule to the arguments' run-time types (F-137), so the two paths take the same type where each argument's static type is its run-time type, as in microGPT, and may differ where a static type is wider than its value (row 509)."
   - Wording (numeral): "at a tie that differs only where the call passes a numeral, the checker reads the numeral as `ZZ32`, or as `ZZ64` or `ZZ` when its value does not fit, which builds P-173."
   - Wording (row 506): "or with more than 64 combinations of the types it chooses for the lone type parameters, a parameter that numerals alone fix counting one (row 506)." Restore the candidate sentence and the two tests.
   - Concept: "lone type parameter" (F-137 defines it); the cold reader guessed the link. Define in the walk area part or, since the checker uses it too (row 506), the `fortress-repo` core.

## F-78: pass, with wording

1. Fidelity: pass. The order agrees with D4 and the code; "not at one conjunct" and the line pointer drop harmlessly. One cut matters: old "since the coercion attempt cannot check such an argument (row 507)" is gone from the row-507 sentence.
2. Comprehension: (a) the reader could not square row 507 here (attempt 2 accepts) with F-73 (coercion refuses); the dropped "since" clause is the link. (b) "such an instance" (row 559) was read two ways. Row 559 covers every instance at an intersection type, by four routes, route 2 being an unfixed parameter's bound met with an expected trait; so the broad reading is right.
3. Class: wording. "The second type-checks a call whose untyped function argument only the expected type fixes, which the coercion attempt refuses (row 507)." "The run time has no class for an intersection type, so an instance at one, from such an argument or from an unfixed parameter's bounds, dies as it loads (row 559)."

## F-87: pass, with wording

1. Fidelity: pass. The pointers to F-226 and F-70 are rightly cut.
2. Comprehension: "in many contexts, among them ... lists every context" read two ways. Source: the chapter's paragraph "The expected type" (`inference.tex:129-150`) is the list that the checker builds; the rung amended it to match (`rung-checker-contexts/REPORT.md` section 1), and the contexts it does not give (a `try`, an `atomic` body) are in neither (section 10). "Application" is the call that the juxtaposition or chain becomes.
3. Class: wording. "The inference chapter's paragraph "The expected type" (`Specification/basic/inference.tex`, "The Static Arguments of a Call") lists every context, the same set that the checker gives; this title names the main ones." "the expression's own expected type goes to the call that it desugars to".

## F-221: fail

1. Fidelity: dropped condition. New: "A reduction is a call of `__bigOperator` with the big operator as an argument, so the retry gives the big operator the reduction's expected type (F-364)." Old: "A reduction's plain-bounded big operator ... so takes the reduction's expected type; one whose bound names its parameter takes that type, else its body's (F-364)." Old F-59: "A plain-bounded big operator takes its bound, or the reduction's expected type where the bound does not fit (F-221)." The new sentence gives every big operator the expected type through the retry, always.
2. Comprehension: "multifix declaration" was missing; the reader could not tell whether the chain sentence states the rule or a hazard.
3. Class.
   - Wording: "A reduction is a call of `__bigOperator` with the big operator as an argument, so where a plain-bounded big operator's bound does not fit, the retry gives it the reduction's expected type; one whose bound names its parameter takes that type, else its body's (F-364)."
   - Concept: multifix operator declaration (an operator declared over three or more operands, which `a OPLUS b OPLUS c` runs before the binary one, `chained-multifix.tex`). Define in the checker area part.

## F-59: fail

1. Fidelity.
   - Dropped source and condition. New: "`SUM e` over a collection `e`, and `x DOT y`, need no static argument." Old ends "(P-78)". P-78: "A sum without generators is written as before, with no static argument". Without "without generators" and P-78, the reader took it to contradict F-364.
   - Dropped gate, unreported: `compiler_tests/InferBigOperatorUnwritten`. F-364's rewrite drops it too, so after the pass no entry in the chunk names it (the file exists).
2. Comprehension: as above; "clause form" guessed from contrast; the witness's purpose guessed.
3. Class.
   - Wording: "A sum without generators, `SUM e` over a collection `e` or `x DOT y`, writes no static argument (P-78)." Restore the test here or in F-364.
   - Concept: big operator, clause form, reduction (`concepts.md`: the short orientation).

## F-364: fail

1. Fidelity.
   - Stronger claim. New: "The call as written is accepted where the big operator alone has an instance: a plain bound, or no static parameter." Old: "first checks the call as written, where the big operator typed alone has an instance ...; if that is not accepted ...". The old makes the instance the condition for checking the call as written, not for its acceptance.
   - Dropped claim, unreported: "The elements are converted to the instance."
   - Dropped gate: `InferBigOperatorUnwritten` (see F-59). `InferBigOperatorExpectedType` is kept by F-221.
2. Comprehension: close to the source; "plain bound" and "alone has an instance" were inferred.
3. Class.
   - Wording: "The checker first checks the call as written, which it can where the big operator alone has an instance: a plain bound, or no static parameter. Where that is not accepted, or its result does not convert to the expected type, ..." Restore "The elements are converted to the instance."
   - Concept: plain-bounded big operator against one whose bound names its parameter (`concepts.md`: checker area part).

## F-365: fail

1. Fidelity: three claims dropped, unreported, held by no other entry (searched FACTS):
   - "An arrow type that carries its own static parameters is a subtype of no arrow type and coerces to nothing".
   - "A static parameter of the function's own counts as unbound also where the kind environment holds its name for another declaration's parameter, as inside a generic declaration that calls its static parameter the same".
   - "the memo of normalized arrow types keys an arrow type by its static parameters too, so that a generic function's type and an instance written alike are not taken for each other". The assessment allowed a move to F-65, not a drop.
   The test pattern is right: `*GenericFunctionAsValue*Compiled` matches exactly the four tests.
2. Comprehension: "Refused or stopped" pairs no outcome with a row. Row 1009 is a refusal; row 1010 is a stop ("F is not in the kind env") where the binding is never applied, and a refusal with a message where it is applied. "Untyped binding" (`g = count`) and the row-lift sentence's intent were unclear.
3. Class.
   - Uncertain fidelity settled: the three claims must come back, here or in F-65 (the memo), as the assessment said.
   - Wording: "Refused: a name with several declarations of which one is generic (row 1009), and the applied value of an untyped binding such as `g = count`. Stopped, 'F is not in the kind env': such a binding never applied (row 1010)." "No test compiles the model's row lift ...; whether the checker accepts it is unmeasured."

## F-367: fail

1. Fidelity.
   - The changed clause is right: row 1021, "The checker refuses both" (an untyped binding, `g = half`, and an open arrow, `useTag(tag, z)`); row 1012, the checker accepts `p(count)` at `Any` and the run dies.
   - Dropped condition: "for an overloaded `twice` with a generic declaration" is cut from the `pick(twice)` sentence; the reader then could not say what `twice` is.
   - Dropped claim, unreported: "A function with static parameters has a type of its own as a value, below `Any` and below each arrow type it can be received at."
2. Comprehension: (a) whether row 1021 is a defect or the rule: the row is a design limit of walk, against the specification's static error. (b) Row 1018's sentence: walk refuses the generic function at an arrow type over the callee's own type parameter where another argument fixes that parameter by its run-time type (`appT(half, v)`).
3. Class: wording.
   - "..., the value stays generic and each application infers its static arguments, where the specification makes it a static error (row 1021, a design limit of walk)."
   - "so `pick(twice)`, for an overloaded `twice` with a generic declaration, runs ..."
   - "a generic function passed at an arrow type over the callee's own type parameter is refused where another argument fixes that parameter by its run-time type, as `appT(half, v)` (row 1018)".
   - Restore the own-type sentence without the file path.

## F-141: fail (wording)

1. Fidelity: the old entry tagged each worker default, "(D3, row 592)" and "(D5)", after "Two more rules are defaults ... First, ... Second, ...". New: "A worker chose two defaults (D3 and D5 of ...)." followed by the rules untagged. The reader cannot tell which rules are the worker's and which P-48's. Also dropped: "has the arguments' supertypes among its candidates" (why D5 never takes the bound), and row 616's "which fail the call". The status words go to the history correctly; F-228's rule is held by F-228.
2. Comprehension: "lone", "no narrowest candidate", "join" against "narrowest common supertype", and which rules D3 and D5 are.
3. Class.
   - Wording: "A worker chose two defaults (D3 and D5 of ...): a parameter that only another fixed parameter's bound mentions takes that parameter's instance ... (D3, row 592); and a lone parameter whose bound mentions a static parameter has its arguments' supertypes among its candidates, so it takes their narrowest common supertype, never its bound (D5)."
   - Concept: lone type parameter and its candidates (F-137); define in the walk area part. F-bound is resolved by the skill.

## F-242 (F-243 merged in): fail (wording)

1. Fidelity: pass on the claims; `:3704-3706` and the generic at `:3519` agree. Dropped: "The fusion pairs are `MaxSumReductionPair`, `MinSumReductionPair` and those two overloads", which named the concept. With the errors out of the title, "would move the errors to the generic" has no antecedent. "Commented" means commented-out (`perf-probes/generic-distribute/REPORT.md` section 2: "the commented `distribute[\K\](...): PossibleReductionPair[\R\]`").
2. Comprehension: fusion, the roles of `distribute` and `PossibleReductionPair`, "site of the distance", "commented", "the errors".
3. Class.
   - Wording: "The team's commented-out generic, answering `PossibleReductionPair[\R\]`, fails the return-type rule at the generic instead." Restore the pair names.
   - Concept: fusion pair (`concepts.md`: define in F-242 or the library area part); the distance and a site of it (`fortress-repo` core, owned by F-53).
   - F-243's merge: pass; the count's history goes whole, and F-251, F-255 hold the rest.

## F-248: pass, with wording

1. Fidelity: pass. The present-tense title agrees with row 21 FIXED and F-253 (assessment).
2. Comprehension: settled by the probe report. "With no `distribute(r: Any)` beside it" is today's library: the team's `Any` hack is gone, and the generic beside it stops every program at load (section 1, L1). "Stops every fused pair" means fails with an error, "Don't actually resolve overloading of generic methods yet.", and `GeneratorDeclarations` fails (row 744). `r.distribute[\L1\](q)` is a commented-out line in `Generator2.distributes`, live only in the probe (G1).
3. Class: wording. "The team's commented-out `r.distribute[\L1\](q)` in `Generator2`, made live, stops every fused pair with an error (row 744)." "keeps every fused answer" → "gives the answers that it gave with the `Any` method". Concept: fusion (as F-242).

## F-285 (F-85 and F-220 merged in): fail

1. Fidelity.
   - Dropped gates, unreported: `tests/NestedReductionFusion` (named by old F-285 and old F-85, which said it runs the arm fused) and `tests/PureListStridedSubscriptWalk`.
   - Dropped reason: F-85's "so the checker no longer types its body `OR(I0,O0)` where `O0` is declared (row 632)". Without it the reader could not tell what `O0` is or why the cast.
   - Wrong repoint (outside this entry's text): `record.py` repoints F-250's pointer to F-85 at F-285. F-250 cites F-85 for the identity functions' `cast` and `embiggen`, which neither F-85 nor F-285 holds (F-85 pointed back to F-250). F-250 should hold those itself and lose the pointer, not gain a new wrong one.
   - "The components that the distance checks" for "twelve" holds: F-53 names fourteen, and the assessment found the two new ones hold no such form. The `cond` reason is sourced (`rung-generator-slips/REPORT.md` section 5). F-220's checker acceptance of `body(i: I): L` (`:1511`) is covered by F-53's distance of 0, so its drop loses nothing current.
2. Comprehension: `O0`, the fused arm and when it runs, `cond` and `Condition`, "a `typecase` cannot show", and row 824's oblique wording.
3. Class.
   - Wording: "`__bigOperator2`'s fused arm, the `typecase` arm that runs a nested big operator through `generate2`, casts its result to `O0`, the declared result, which its value (`I0`) is not otherwise (row 632)." "`PureList`'s strided subscript ... answers a list typed at its elements' run-time types, which a binding declared `List[\Shape\]` refuses (row 824)." Restore the two tests.
   - Concept: fusion (as F-242); `cond`/`Condition` are library names, for the library area part.

## Merges

- F-55 into F-73: fail through F-73's walk sentence (row 509); the rest of F-55 is held by F-137 (row 510) and F-78.
- F-243 into F-242: pass.
- F-85 into F-285: fail through the dropped row-632 reason, the dropped `NestedReductionFusion` gate and F-250's repoint.
- F-220 into F-285: pass.
