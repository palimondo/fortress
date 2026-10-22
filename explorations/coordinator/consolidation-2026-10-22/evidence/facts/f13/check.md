<!-- The clarity pass's check of chunk f13 (facts): each rewritten entry of proposals.md against the record as it stands and its sources, and the cold reader's answers in cold-read.md against the source meaning; failures classed as concept, wording or uncertain fidelity, with the source that settles each. -->

# Chunk f13: check

Read on `main` as the assessment read it (`a898e1baf`), with `facts-extract.sh 'F-N+'` and `'history:F-N'`, the report sections each entry cites, the gap-ledger rows, the tests and the library and walk code named below. I ran no program. Abbreviations as in `proposals.md`: WE is `compile-ladder/rung-walk-elements/REPORT.md`, OI is `compile-ladder/rung-walk-overload-if/REPORT.md`.

Verdicts, one line each, are at the end. Three faults recur: a condition dropped from the record's earlier text or from the cited row (F-143, F-228, F-238, F-147); a claim the gates contradict (F-144, F-147, F-143); and two pieces of the team's or the coordinator's authorship misstated or left out (F-248, F-239).

## F-143

**Fidelity.**

1. Dropped condition: the tuple clause. Rewrite: "A tuple, arrow or generic type that holds the open type admits no more than it would at `BottomType`, so `(Int, Int)` is not below `(OPEN, OPEN)` (row 663, contested)." Row 663: "a tuple of values is not below a tuple type over a self-bounded type parameter that nothing fixed **when overloads are compared** ... `pick((1, 2))` runs `pick(x: Any)` beside `pick(x: (T,T))`, **while a lone `one(x: (T,T))` runs**". The record's text of 13 October said "at dispatch" (`FACTS-history.md:1331`), and the skeptic who wrote the test measured both halves (`rung-reduction-types/SKEPTIC.md` section 3, finding 3). The rewrite now gates the entry on `OpenTupleDispatchWalk.fss`, whose second assertion (`h.one((1, 2))` is `"one"`) contradicts the unconditioned sentence. The record's current text has the same gap; the rewrite keeps it.
2. Dropped condition: where the open type still reaches a clause form. Rewrite: "So the open parameter reaches one only where neither fixes it, as in an empty reduction that no declared type directs". WE section 1, after item 3: "A hint that does not fit falls back to the instance that no hint gives"; section 10, decision 6, with `ESumMixed` unchanged, `3.5 : Float` (section 7). So a non-empty clause form whose join is outside the bound also runs at the open parameter (the skill's `revival-changes.md`, "Static parameters", item 2: `Number` for `ZZ32` and `RR64` elements of a `SUM`). The assessment asked for this case ("or when a hint does not fit"); the rewrite has only the empty one. "Neither fixes it" covers it in logic, but the one example steers every reader to the empty case, and the cold reader read it so.
3. Broader than the row: "an empty reduction that no declared type directs, which takes `ZZ32`'s identity (row 716)". Row 716 states it for `SUM` (`SUM[j <- 0#0] (j / 2.0)` is `0 : Int`); `PROD` follows by reading (`multiplicativeIdentity`'s first `typecase` clause, `Library/FortressLibrary.fss:3397-3399`). An empty identity-less reduction has no identity (`EMinEmpty` raises `EmptyReduction`, WE section 7), and an empty comprehension takes its bound `Any` (row 716). The record's text has the same breadth.
4. The rest holds: the F-bound example (`InferUnfixedFBoundedWalk.fss:13`), `mk()` (`:27`), the probe stated as a probe (`rung-walk-open-param/SKEPTIC.md` section 3, finding 3; no gated test names `OPEN` or the probe's shape), and the gates (both exercise the open type: the empty `PROD` bound to an untyped local, `mk()`, and the pair).

**Comprehension.** The cold reader's consequence "to accept nothing when it is nested" is wrong for a lone method (point 1). "An empty reduction with no declared type gives an integer identity, whatever the element type" is right for `SUM` and `PROD` and wrong for `BIG MIN` (point 3). The reader did not see the join-outside-bound case (point 2). Unresolved terms: "a declaration whose parameter type is the open type", `OPEN`, `Int`, "contested", "skeptic".

**Classes.**
- Wording (points 1 to 3): "Where overloads are compared, a tuple, arrow or generic type that holds the open type admits no more than it would at `BottomType`: beside `pick(x: Any)`, `pick(x: (T,T))` does not take `(1, 2)`, though a lone `one(x: (T,T))` does (row 663, contested)." And: "So the open parameter reaches one only where neither fixes it: an empty `SUM` or `PROD` that no declared type directs, which takes `ZZ32`'s identity whatever its body's type (row 716), or a clause form whose declared type or join does not fit the bound (WE section 10, decision 6)."
- Wording: "In a skeptic's probe, in an object whose `T` stayed open, a method declared over `T` was the most specific one, and so was chosen for every argument" (the probe's `take(x: T)` in a `Holder[\OPEN\]`, SKEPTIC.md section 3, finding 3).
- Concept: `OPEN`, the open type's printed name. Writer's concepts.md already lists it for `references/interpreter.md`; keep.
- Concept: walk's run-time class names, `Int` for a `ZZ32` value, `Float`, `FlatString`, which a join and a collection take (`ArrayList[\Int\]` is not a `List[\ZZ32\]`, rows 20, 717). Not in concepts.md. Define in `references/interpreter.md`, "How walk evaluates a program". Used by F-143, F-228 (rows 20, 717) and the ledger throughout.
- Concept: the ledger status `CONTESTED`. `records.md` names it and defers to the row template, which a worker does not read. Define each status in a line in `references/records.md`, "The gap ledger". Used by F-143, F-146, F-?1.
- Concept: skeptic, the agent that checks a rung's work after its worker, with its verdict in the rung's `SKEPTIC.md`. Define in the `fortress-repo` core glossary beside batch and rung. Used by F-143 and every entry that cites a `SKEPTIC.md`.

## F-144

**Fidelity.**

1. Contradicted by a gate: "`BIG SQCUP`, `BIG SQCAP` and `List`'s nested `BIG CONCAT` ran; ... and no gated test holds any of them." `tests/UnwrittenComprehensionElementsWalk.fss:16-17` is the nested `BIG CONCAT` with no static argument, `BIG CONCAT[ys <- <|<|1, 2|>, <|3|>|>] <| 2 y | y <- ys |>`, asserting `<|2, 4, 6|>` (WE's `ENestedFused`), and `:14-15` an unwritten `BIG CONCAT[k <- 0#3] <|[\ZZ32\] k|>`. Both are `List`'s (`import List.{...}`), landed by rung B itself (`20474c144`), and the file matches the entry's own gate glob `tests/Unwritten*Walk.fss`. The assessment's "no gated test covers any of the five" was wrong for `List`'s `BIG CONCAT`, and the rewrite inherits it. For `BIG SQCUP` and `BIG SQCAP` it holds: their only gated uses write a static argument or use the binary operator (`GeneratorDeclarations.fss:66-67`, `RangeDeclarations.fss:61-64`).
2. "A static argument that names the lifted type is `Maybe[\R\]`, since walk refuses `AnyMaybe` there." The source says such a program "stops under walk after the edit" (`rung-reduction-types/REPORT.md` section 8), not a refusal at load. Unchanged from the record; the word "refuses" lets a reader expect a load refusal.
3. The rest holds: the api (`Library/FortressLibrary.fsi:1923-1929`), the refusal at `Any` and its gate (`ReductionSimpleJoinAtAnyWalk.test`, `load_exception_contains=does not define an abstract method declared in type AssociativeReduction`), `BIG MINMAX` and the tuple forms (`UnwrittenBigMinMaxWalk`, `UnwrittenTupleMinMaxWalk`), the measurements stated as measurements (WE section 7, `ESqCupCap`).

**Comprehension.** The reader's account matches the source, except "No gated test covers any of these five", which follows the entry's error. Unresolved: the reduction protocol (`AssociativeReduction`, `simpleJoin`, `lift`), where the static argument is written, `AnyMaybe`, "the four tuple forms", "nested", and which tests the glob holds.

**Classes.**
- Uncertain fidelity, settled by `UnwrittenComprehensionElementsWalk.fss`: "With no static argument, `List`'s `BIG CONCAT` runs, also over a list of list comprehensions (gated by `tests/UnwrittenComprehensionElementsWalk`); `BIG SQCUP` and `BIG SQCAP` ran in one measurement each, with no gated test; `PrefixSet`'s `BIG UNION` and `PureList`'s `BIG CONCAT` were not measured."
- Wording, entry-local: "the four tuple forms `BIG MIN_MIN`, `BIG MIN_MAX`, `BIG MAX_MIN` and `BIG MAX_MAX`" (`UnwrittenTupleMinMaxWalk.fss:5`); "`AnyMaybe`, the non-generic trait that `Maybe` extends (`Library/FortressLibrary.fsi:959`, `:975-976`)"; "a static argument that names the lifted type, as `generate[\Maybe[\R\]\](...)`, is `Maybe[\R\]`: with `AnyMaybe` there the program stops under walk".
- Wording: name the gates instead of the glob: `UnwrittenBigMinMaxWalk`, `UnwrittenTupleMinMaxWalk`, `UnwrittenBigOperatorsWalk` (the guard, `rung-reduction-types/REPORT.md` section 8), `UnwrittenComprehensionElementsWalk` and `ReductionSimpleJoinAtAnyWalk`.
- Concept: the library's reduction protocol, `ActualReduction[\R,L\]` with `empty`, `join`, `lift` and `unlift`, an identity-less reduction lifting to `Maybe[\R\]` through `AssociativeReduction` and its `simpleJoin`, and a reduction pair (`PossibleReductionPair`). Not in concepts.md. Define in `references/library.md`, beside `SUM`. Used by F-144 and F-248.

## F-145

**Fidelity.**

1. Broader than the source: "Walk's other checks at load of an object are the `override` check (F-147) and the Meet Rule for Functional Methods (F-142)." This states them as the only others. The skill's "What walk checks" also lists, for an object's methods, the overload check and the `comprises` extender check (`references/interpreter.md:36-43`). The record's text was a bare hand-over ("F-147 gives the `override` check and F-142 the Meet Rule's").
2. The rest holds: the cover and its bounds (`rung-duplicates-coverage/REPORT.md` section 1, `:40`, `:48-49`), rows 665, 725 and 728, the gates, and the Detail line's note on the superseded report (the assessment's note).

**Comprehension.** Matches the source. Unresolved: "unreadable type"; what the checker does at row 725; whether row 728's refusal is right.

**Classes.**
- Wording: "Walk's `override` check at load is F-147's, and its check of the Meet Rule for Functional Methods F-142's."
- Wording: "a type the search cannot read" (`rung-duplicates-coverage/REPORT.md:48`, "a type it cannot read").
- Wording: "The compiled checker covers the same way, within the same bounds, except that where the abstract method or a body below it has static parameters of its own it splits nothing and refuses the object (row 725)." And "an object whose one covering definition has a static parameter of its own is refused, though it is valid (row 728, a defect of walk; the compiled path runs it)". Sources: rows 725 and 728, both implementation gaps; the skill's "a valid object".

## F-146

**Fidelity.** Holds. Each sentence matches `rung-size-expressions/REPORT.md` section 1 ("Item 15, 15a with its part (b)": `foldSize`, `nEq`, `nDiffer`, `pEqv`), P-55, and rows 683, 767 and 675. The split is right: the arithmetic builds P-55, and the opening is P-85's exception (review-queue item 30).

**Comprehension.** The reader's account matches. Unresolved, with cause:
- "compares two sizes by their written form": the entry gives equality and two cases of difference, not the third answer. Source: `pEqv` answers equal when `nEq`, different when `nDiffer` (two different numerals, or two different static parameters), and "not known to differ" otherwise. So `n+1` against `n+2` is neither.
- "beside a numeral" read two ways; "a size beyond its kind" not said.
- "contested": the concept of F-143.

**Classes.**
- Wording: "Two sizes are the same where their written forms match once each operation on numerals is computed. They differ only where they are two different numerals or two different size parameters, so the checker calls a `typecase` clause unreachable that walk reaches at equal arguments (row 683, contested). Any other pair, as a size name or an operation against a numeral, or two operations written differently, is not known to differ."
- Wording: "a size outside its kind's range, as a `nat` above 4294967295, where walk refuses it (row 675)".
- Wording, optional: "It builds P-55, the curator's decision on arithmetic in a size."
- Concept: `CONTESTED`, as in F-143.

## F-?1 (split from F-146)

**Fidelity.** Holds. The opening, the `NatParam` example and the binding of `$n` match `rung-size-expressions/REPORT.md` section 1, "Fork 3, way 4a, under Q13.3"; the default and its review match P-85 and review-queue item 30; rows 307 and 682 and the gates exist. One sentence is narrower than its source and leads the reader astray: "Walk reads such a `where`-clause size as any size." Source: walk's `comprises` check at load reads such a variable "as any term, the same one at each of its places", and "Walk's dispatch is untouched: it binds an argument's size at a call" (same section, the walk point). F-251 says the same of a type variable ("Walk binds the variable as a symbolic type at load").

**Comprehension.** The reader's account matches. Unresolved, with cause:
- `$n`: the checker's inference variable, a concept (below).
- "PLAN item 13": the skill says a PLAN pointer names its section; this one does not.
- "(P-85; review-queue item 30)": what P-85 contributes is not said.
- "An opened size does not compile (row 307)": the stage is not said. Settled: the code generator refuses the trait, "Can't compile TraitDecl NatParamT" (`compiler_tests/XXXNatOpenRun.test`; `compiler/codegen/CodeGen.java:1557`), the report's home 2 under row 307 (section 12).
- `NatParamT` and `Nt` beside `NatParam` and `N`: row 682's names.
- "Walk reads ... as any size": two readings, settled above.
- The word "opens" beside F-143's open type and F-228's "Left open": the reader flagged three senses in one file.

**Classes.**
- Wording: "Walk's `comprises` check at load reads such a size as any size, the same at each of its places; at a call, walk binds the argument's own size."
- Wording: "... way 4a of fork 3 (a size known only at run time) in PLAN, "Pavol's answers, in the order they are needed", item 13, landed by an agent; it waits for the curator's review (review-queue item 30), and P-85, his position that the array questions are open, records it as the one exception."
- Wording: "The code generator does not compile such a trait, 'Can't compile TraitDecl NatParamT' (row 307; `compiler_tests/XXXNatOpenRun`)."
- Wording: "in row 682's program, `trait NatParamT comprises { Nt[\n\] } where [\nat n\]`, the checker refuses ...".
- Concept: the checker's inference variable, its placeholder for a static argument that it infers, printed `$n`. Not in concepts.md. Define in `references/compiler.md`, beside the checker. Used by F-?1, rows 682 and 767.
- Concept: opening, as listed in concepts.md for `references/compiler.md`; its definition should say that it is not walk's open type (F-143).

## F-147

**Fidelity.**

1. Title broader than the source and a gate: "an inherited declaration is overridden only where each of its parameter types is a subtype of the `override`'s and not all are equal." `rung-walk-override/REPORT.md` section 1: "At an instance of a generic declaration, equal parameter types still count as overridden" (`Constructor.java:588`, `:595`), where an object without static parameters extends a generic trait's instance; gated by `tests/OverrideGenericInstanceEqualTypesWalk.fss`, which the entry's own glob `Override*Walk.fss` holds. The skill states the exception ("At an instance of a generic trait above a declared object, equal parameter types count as overridden"). The body's "The `fortress-repo` skill gives the rule's other cases" hands it off, but the title's "only" contradicts it. The old title ("by the chapter's strict subtype") made no exclusive claim.
2. The rest holds: the chapter's rule (`traits.tex:585-589`), the check once at the declaration through a stand-in, rows 614, 649 and 693 (with "and differ from the `override`'s", as row 693 and the skill say), and the gates.

**Comprehension.** Matches, and the reader found the exception in the skill. Unresolved: "with static parameters" attaches two ways; what follows an abstract `override` (rows 614, 649).

**Classes.**
- Wording: title "... an inherited declaration is overridden where each of its parameter types is a subtype of the `override`'s and not all are equal." Body: "At an instance of a generic trait that an object without static parameters extends, equal parameter types still count as overridden (`OverrideGenericInstanceEqualTypesWalk`)."
- Wording: "Walk checks the `override` of a generic trait, object or object expression once, at its declaration."
- Wording: "An object inherits nothing that a trait's `override` overrides, so an object below an abstract `override` that declares no body is refused at load (rows 614, 649; `AbstractOverrideUndefinedWalk`, 'does not define an abstract method declared in type W')."

## F-228

**Fidelity.**

1. Dropped condition: the fallback. Rewrite: "Otherwise the clauses run once into the library's collector, and the operator is instantiated at the elements' join". WE section 1: "A hint that does not fit falls back to the instance that no hint gives, and so does an instance under it that does not admit its arguments"; section 10, decision 6. The record's text omits it too; the assessment's "give the third step both cases" was followed for the empty case only. With the title's "else at its bound" the omission is small, but the body's "With no element and no declared type" limits that step to the empty case.
2. Causality moved: "A big operator whose declared result is a trait of its own is read through the `BigReduction`, `Comprehension` or `BigOperator` that the trait extends. So `__bigOperator`'s `body(i: I)` is typed." In the record the typed body follows from the whole instantiation ("...else at its bound; so `__bigOperator`'s `body(i: I)` is typed"), and WE's problem line says why: walk could not type it while a plain-bounded parameter stayed at `BottomType`. The trait reading is row 718's later repair (OI section 1, "Row 718"), which the typed body needed, not its cause. The cold reader took the moved reading ("..., so the `body(i: I)` passed to `__bigOperator` gets a type").
3. The rest holds: the contexts reached and not reached (WE section 5.3), the single run of each body (section 1, item 2), the empty case (item 3; row 716), the rows of the "Left open" list (510, 705, 20, 717), the gates.

**Comprehension.** The order and the contexts are right. Wrong: the cause of the typed body (point 2). Unresolved: "clause form"; whether "also where the clause form ends a block" attaches to both contexts (WE 5.3: both); "Left open", read as the open type; what goes wrong in rows 20, 717, 510 and 705 when the join applies; `I` and "is typed"; the collector.

**Classes.**
- Wording (point 1): "A declared type or a join that does not fit falls back to the instance that no hint gives: a plain-bounded parameter takes its bound, and an F-bounded one stays open (F-143); so a `SUM` of `ZZ32` and `RR64` values, whose join `Number` is outside the bound, runs with each `+` at its operands' types (WE section 10, decision 6; the `Number` example from the skill's `revival-changes.md`, "Static parameters")."
- Wording (point 2): move the sentence back to the instantiation: "With the big operator so instantiated, the library types `__bigOperator`'s local function `body(i: I)` at the element type `I` (`Library/FortressLibrary.fss:1314`)." Keep the trait sentence as its own fact, with row 718.
- Wording: "Left open:" becomes "Still wrong, each a ledger row:" with what goes wrong: "an empty clause form that no declared type directs takes its bound or stays open (row 716); a comprehension that no declared type reaches is built at its elements' run-time class, as `ArrayList[\Int\]`, which a declared `List[\ZZ32\]` refuses (rows 20, 717); a clause form that is a call's argument gets no declared type (rows 510, 705)". Sources: rows 716, 717, 20, 705.
- Wording, entry-local: "the library's collector, `__elemsOf`, which keeps the elements in order, typed at the join of their run-time types" (WE section 1, item 2); "for either, also where the clause form ends a block" (WE 5.3).
- Concept: clause form, listed in concepts.md for `references/interpreter.md`; keep. Walk's run-time class names, as in F-143.

## F-238

**Fidelity.**

1. Title narrower than the change: "an exclusion that two generic declarations show only at one shared symbolic instantiation is withdrawn". OI section 1 names two old readings, and the change withdraws exclusions from both: the shared instantiation, and "two instances of one generic object at different symbolic static arguments ... are two object types that cannot be extended, so they exclude", which decision 1 says holds where "their declarations share no instantiation" (A6's `sort`s, B4's `dup`s). The record's title said "in walk's reading of each at one symbolic instantiation", which covered both.
2. Dropped alternative: "Any other exclusion read at the shared instantiation stands only where every generic type that both extend forces one instance". OI section 1: "Any other pair excludes as `excludesOther` reads it apart, or, read at the shared instantiation, where every generic type both extend forces o2's renamed static arguments back to the shared ones". The rewrite's added "only" denies the first alternative; the record's text had no "only".
3. The rest holds: the `o` pair and `Mixed` (OI section 1), the own-generics condition, `mayBeEqual`, the `ReadableArray` case (decision 3), the hand-over to F-252 and F-257 (F-252: a pair the check refuses is read on its declared domains "whether or not an exclusion was withdrawn"), the gates and their grouping (OI section 10).

**Comprehension.** Matches in outline. Unresolved, with cause: whether the second reading of sentence 2 is the faulty first reading (the present tense, without "first"); what "of their own" separates; "forces one instance"; "declared domains"; and whether "(refused)" and "(load)" tag one test or a run. The reader guessed one test; they tag runs: the four with `.test` files refuse, the six without load (OI section 10, and the files).

**Classes.**
- Wording (point 1): "Under walk's load check, an exclusion that two declarations with static parameters of their own show only when each is read at a symbolic instantiation is withdrawn where their instances do not exclude."
- Wording (point 2): "Any other exclusion stands where the two still exclude with their static parameters renamed apart, or, read at the shared instantiation, where every generic type that both extend forces their static arguments to be equal, since no type extends two instances of one generic trait: so `Array` and `ImmutableArray` exclude at every pair of instances through `ReadableArray`."
- Wording: "The check first reads ..., and two instances of one generic object as two object types that cannot be extended, so they exclude."
- Wording: "Gated, as refusals at load, by `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` and `GenericOverloadInstancesApartWalk`; as programs that load, by ...".
- Concept: declared domain, and a declaration with static parameters of its own as against a functional method of a generic type. Listed by chunk f14's concepts.md for `references/interpreter.md`, "What walk checks"; keep. The skill defines "declared domain" only in `revival-changes.md`, which the cold reader could not read.

## F-239

**Fidelity.**

1. A default not marked as one. Row 746 is "deliberate (walk)": "The coordinator's call 6 (`explorations/coordinator/CLIMB-BATCH-16.md` section 2), listed for the curator's review". PLAN, "Climb batch 16, listed for his review", first item: "Walk's `if` takes a `Maybe` clause as true or false (gather.2, the coordinator's call 6; F-239) ... Default: as built". The call kept the team's `Just` line and added the refusal of every other value (`CLIMB-BATCH-16.md:86`: the team's line sent every other object to the `else` branch). The writer brief's point 9 asks a fact to say when it records a default. Neither the record nor the rewrite says it, and the rewrite reports "Meaning: unchanged". The entry does not present it as the curator's ruling; it leaves a worker to take it as settled.
2. The rest holds: `forIf` and `maybeType` (`interpreter/evaluator/Evaluator.java:582-621`), the name test (`interpreter/glue/Glue.java:70-83` compares the names of the transitive supertypes only), the refused values (OI section 1, "Row 673"), the load refusal at a top-level variable (the three `.test` files), the gates.

**Comprehension.** Matches. Unresolved: whether a program's own `Just` under its own `Maybe` counts (by reading `Glue.extendsGenericTrait`, it does: the reader's first reading is right); "the chapter's rule".

**Classes.**
- Uncertain fidelity, settled by row 746 and PLAN: add "This is a default, the coordinator's call at climb batch 16, which waits for the curator's review (PLAN, "Climb batch 16, listed for his review")."
- Wording: "The specification's `if` chapter allows a `Boolean` only (`Specification/basic/expressions/if.tex:54`; row 746)."
- Wording, optional: "Walk tests the names only, so a program's own `Just` below its own trait `Maybe` counts too, by reading `Glue.extendsGenericTrait`."

## F-248

**Fidelity.**

1. Authorship misstated: "The library declares the team's generic, `distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\]`". The team's commented line returned `PossibleReductionPair[\R\]` (`git show a874948ac:Library/FortressLibrary.fss`, `:2868`: `(*    distribute[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\R\] =`). The result over `K` is the probe's variant L4 (`perf-probes/generic-distribute/REPORT.md` section 1: the errors clear "Only if the generic's result is written over `K` ... The team's text as written, `PossibleReductionPair[\R\]`, does not clear them"). The record's "the team's generic `distribute` over `K`" was vague; the rewrite's full signature attributes the change to the team. The skill forbids guessed authorship.
2. Narrower than the gate: "`NestedReductionFusion` asserts 11 for the sum of the prefix sums of 1, 3, 2, and 3 for the maximum of their prefix maxima." The test asserts five pairs with fusion and without: also `MAX` over `SUM` 6, `MIN` over `SUM` 1 and `SUM` over `PROD` 10 (`tests/NestedReductionFusion.fss:37-46`; `rung-walk-method-sargs/REPORT.md:34`).
3. Uncertain fidelity: "`MAX` and `MIN` over `SUM`, and `SUM` over `PROD`, still take the fused path." This is the probe's trace, "use efficient implementaion" where the base printed it (section 1), measured before F-253's inference changed walk's dotted calls, and stated in the present. Today's tree asserts the values, which are equal fused or not, and `GeneratorDeclarations.fss:28`, `:38-40` asserts that `SumReduction[\ZZ32\].distribute(MaxReduction[\ZZ32\])` gives a pair. No gated test asserts the path for `MIN` over `SUM` or `SUM` over `PROD`, and I found no later trace (the inference rung's reports name the values only). A run of `GeneratorDeclarations` and `NestedReductionFusion` with the team's trace on today's tree would settle it.
4. The rest holds: the definition of fusion (probe section 5), the dependence on F-253 and row 21 (`rung-walk-method-sargs/REPORT.md:152`), the commented `r.distribute[\L1\](q)` (`Library/Generator2.fss:75`; row 744, still open), the gates.

**Comprehension.** Matches, except: the reader concluded that `NestedReductionFusion` "may cover only the non-fused path", from point 2; and "keeps" and "still" compare with a state the entry does not name.

**Classes.**
- Wording (point 1): "The library declares the team's commented generic `distribute[\K\](r: ActualReduction[\R,K\])`, its result written over `K`, `PossibleReductionPair[\K\]`, where the team wrote `PossibleReductionPair[\R\]`, and with no method over `Any` beside it (the probe's section 1)."
- Wording (point 2): "`NestedReductionFusion` asserts five pairs over the prefixes of 1, 3, 2, with fusion and without: `SUM` of `SUM`s 11 and `MAX` of `MAX`es 3, which do not fuse, and `MAX` over `SUM` 6, `MIN` over `SUM` 1 and `SUM` over `PROD` 10, which do."
- Uncertain fidelity (point 3), stated as the measurement: "In the probe, before F-253, walk took the fused path for `MAX` and `MIN` over `SUM` and `SUM` over `PROD` where the base took it, and `GeneratorDeclarations` and microGPT's quick pair gave the base's answers; `GeneratorDeclarations` asserts that `SumReduction.distribute(MaxReduction)` gives a pair."
- Concept: the reduction protocol, as in F-144 (`ActualReduction`, `PossibleReductionPair`, a pair's `K`). The writer's "Fused reductions and `distribute`" for `references/library.md` should include it.

## Pointers outside the chunk

The writer's four stand (F-114, F-142, row 665, chunk f14). One more: F-121 cites "(F-146, F-251)" for the compiled checker's opening of `where`-clause variables. After the split the size half is F-?1's, so F-121's pointer must move to F-?1. P-55 ("Built (F-146 states what the checker accepts)") and F-67 ("compared by its written form once numerals are folded (F-146)") stay right.

## Verdicts

- F-143: fail. Wording: the tuple clause loses row 663's "when overloads are compared", which its own gate shows; the join-outside-bound case is missing; "an empty reduction" should be an empty `SUM` or `PROD`. Concepts: `Int` as walk's run-time class (interpreter.md), `CONTESTED` (records.md), skeptic (core glossary).
- F-144: fail. Uncertain fidelity, settled: `List`'s nested `BIG CONCAT` with no static argument is gated (`UnwrittenComprehensionElementsWalk`), against "no gated test holds any of them". Wording: name the four tuple forms, `AnyMaybe` and the gates; "refuses" should be "stops". Concept: the library's reduction protocol (library.md).
- F-145: fail. Wording: "Walk's other checks at load of an object are ..." claims only two others; "unreadable type"; say what the checker does at row 725, and that row 728's refusal is a defect.
- F-146: fail. Wording: the third answer of the size comparison (not known to differ), "beside", "beyond its kind". Concept: `CONTESTED`.
- F-?1: fail. Wording: walk's reading at load against its binding at a call; PLAN's section; what P-85 contributes; the compile stage (the code generator, `XXXNatOpenRun`); row 682's names. Concept: the checker's inference variable `$n` (compiler.md); the definition of opening should set it apart from walk's open type.
- F-147: fail. Wording: the title's "only" contradicts the equal-types exception at a generic trait's instance (`OverrideGenericInstanceEqualTypesWalk`); "with static parameters" attaches two ways; what follows an abstract `override`.
- F-228: fail. Wording: the fallback of a declared type or join that does not fit is missing; "So `body(i: I)` is typed" now follows the row 718 sentence, a moved cause; "Left open" collides with the open type; the collector and both contexts' block tail. Concepts: clause form (listed), walk's run-time class names (interpreter.md).
- F-238: fail. Wording: the title's "shared" leaves out the generic-object reading that the change also withdraws; the added "only" drops the alternative that an exclusion read apart stands; "first" for the old reading; the gates' grouping. Concept: declared domain and own generic (listed by f14).
- F-239: fail. Uncertain fidelity, settled: walk's `if` reading is a default, the coordinator's call 6 waiting for the curator's review (row 746; PLAN, "Climb batch 16, listed for his review"), not marked. Wording: name the `if` chapter.
- F-248: fail. Wording: the generic over `K` is attributed to the team, which wrote `PossibleReductionPair[\R\]`; `NestedReductionFusion` asserts five pairs, not two. Uncertain fidelity: the fused path is a pre-F-253 measurement stated in the present; a traced run on today's tree settles it. Concept: the reduction protocol (library.md).
