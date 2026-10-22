<!-- Chunk f3 of the FACTS clarity assessment: F-40 to F-51, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `8c99c2413`; FACTS.md is unchanged at `5ca623461`. -->

# FACTS chunk f3: assessment

Base: `main` at `8c99c2413`. FACTS.md has the same text at `5ca623461`, which landed during the work (it changed only BOOT, HELD and the review queue). Entries: F-40 to F-51. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the tests, the library and the code. I ran no experiment and searched no transcript.

Marks: P pass, F fail, U unresolved. Each entry's reasons, and a quoted passage for each fail, are in its section below.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-40 | **F** | **F** | P | **F** | P | P | **reword** |
| F-41 | **F** | **F** | **F** | P | **F** | P | **reorganize** |
| F-42 | P | P | P | **F** | **F** | P | **reorganize** |
| F-43 | P | P | P | P | **F** | P | **reword** |
| F-44 | P | P | **F** | **F** | P | **F** | **reword** |
| F-45 | P | P | **F** | **F** | **F** | P | **reorganize** |
| F-46 | **F** | P | P | **F** | P | P | **reword** |
| F-47 | **F** | P | **F** | **F** | P | **F** | **reword** |
| F-48 | P | P | **F** | P | **F** | P | **reorganize** |
| F-49 | P | **F** | **F** | P | **F** | **F** | **reorganize** |
| F-50 | **F** | P | P | **F** | **F** | **F** | **reorganize** |
| F-51 | **F** | P | P | P | P | P | **reword** |

Counts: keep 0, reword 6 (F-40, F-43, F-44, F-46, F-47, F-51), reorganize 6 (F-41, F-42, F-45, F-48, F-49, F-50), investigate 0. Every fail below is settled by evidence that I cite, so no entry waits on an open question. Two narrow gaps are recorded at the end.

Fails by criterion: scope 5, present meaning 3, evidence 6, comprehension 7, ownership 7, consistency 4. Unresolved: none.

## F-40, what a size costs at run time

- **Scope: F.** The entry states as the cost of a size in the tree what `perf-probes/nat/size-cost.md` measured for designs A and B. The note's header says that the measurement was on the size probes' shadow stack, on 2026-09-24. The built design is neither A nor B. It has one descriptor per number from `RTTIsize.of`, and no class for each number (P-41; F-129; `compile-ladder/rung-size-runtime/REPORT.md` section 1). Nobody measured the built design's load size or its hot loop. Its rung measured only the table lookup at the dispatcher's literal leaf: 0.9 to 2.6 ns, on a dispatched call of about 21 to 23 ns (same report, section 12). Quotes: "A size costs a few kilobytes at load and nothing on the hot path"; "A call dispatched on a size costs about 4 to 20 ns more than a resolved one."
- **Present meaning: F.** The figures come from one measurement, but the entry does not say which design, stack or day. Quote: "A sized loop is no faster, since boxing and a transaction check per local variable cost about 31 ns per element."
- **Evidence: P.** "The answers" holds each figure: a few kilobytes out of the 8.6 MB of classes, 31 ns per element, 4 to 20 ns per dispatched call. Note for the rewrite: two sentences come from reading the code, not from measurement (section 5): "The checker checks a shape once per call site" and "No optimisation uses a size". At the time of the note, the compile-time check was the first rung's shadow checker. F-67 now holds the tree's checker.
- **Comprehension: F.** Two terms need the note to be understood. A "sized loop" is a loop bounded by the size constant, compared with a loop bounded by the storage's length. A "resolved" call is a call that the checker resolved at compile time. Quotes: "A sized loop is no faster"; "than a resolved one".
- **Ownership: P.** The entry has one subject. "No optimisation uses a size" repeats a sentence of F-20, but that is not a count.
- **Consistency: P.** F-20 and F-129 agree with it.
- **Disposition: reword.** Bound the figures to designs A and B on the shadow stack of 2026-09-24. Say that nobody measured the built design's load size or loop. If the rewrite keeps a dispatch figure, give the rung's literal-leaf figure beside it. Spell out "sized loop" and "resolved".

## F-41, `DOT`'s shared size at dispatch

- **Scope: F.** There are two overreaches.
  - The title names `DOT`. The test is a user `dot` over a user `Vec`, written in `DOT`'s shape: `size-rung-probes.md` section 3, "puts that shape over a user object", and `compiler_tests/NatRtDot.fss`. The library's `DOT` was not run on the compiled path. The entry correctly marks the matrix half as "by reading".
  - `array[\E\](n)` makes no size. It returns `Array[\E,ZZ32\]` (`Library/FortressLibrary.fsi:1494`), and the compiler's prelude has no `array`.
  - Quotes: "The compiled dispatcher tests `DOT`'s shared size"; "A size made by `array[E](n)` gets one descriptor per number from `RTTIsize.of`."
- **Present meaning: F.** The last sentence states as current what the note read as variant (b)'s handling of a size made at run time. The note says that such a size waits "on the array review's decision D" (section 2.6). In the tree, every call of `RTTIsize.of` gets a literal's text. The calls are at stamping, in the extends-clause push and at the dispatcher's literal leaf (`MethodInstantiater.java:133-134`, `:157-161`; `CodeGen.java:5819`; `OverloadSet.java:1112`). Quote: as under scope.
- **Evidence: F**, for the last sentence only. Section 2.6 is headed "Read from the code, not measured", and it describes a case that the compiled path does not have. Quote: as under scope. The rest of the entry is supported. `NatRtDot.test` checks the four outputs (i) 3, (ii) -1, (iii) 3, (iv) -1 -1. Section 3 traces the check to `OverloadSet`'s test for a variable in two invariant positions. Walk prints the same values (`r6-walk.txt`).
- **Comprehension: P.** With the test beside it, a reader can restate "in both directions" and "the catch-all's signature".
- **Ownership: F.** The descriptor sentence is about F-129's subject ("Each number has one descriptor"), not about the check on a shared size. Quote: "A size made by `array[E](n)` gets one descriptor per number from `RTTIsize.of`."
- **Consistency: P.** F-129, F-38 and row 411 agree with it.
- **Disposition: reorganize.** Drop the `array[E](n)` sentence, or move it to F-129 and mark it there as a reading of a future case. Bound the title to a size that two parameters share, in `DOT`'s shape, as `NatRtDot` gates it.

## F-42, the checker's early return, and an untyped local parameter

- **Scope: P.** `StaticChecker` returns before `OverloadingChecker` when an earlier stage has reported an error (`StaticChecker.java:268-279`). The checker refuses an untyped parameter of a local function at `STypeEnv.scala:75`, and one of a top-level function at `:200`.
- **Present meaning: P.**
- **Evidence: P.** Rows 620 and 621 are FIXED (`2d22d3a35`) and name their tests. `compiler_tests/XXXLocalFunctionUntypedParam.test` checks for "Missing parameter type for i". The subsection of Appendix I, "The type of a parameter that a declaration leaves out" (`appendices/changes.tex:3750`), supports the sentence on the specification. Note for the rewrite: the cited `zero.md` section 1 describes the crash that the refusal replaced. The note states the early return at its head (lines 17-19). The refusal's detail is in rows 620 and 621 and in `rung-checker-overloading/decision-record.md`.
- **Comprehension: F.**
  - "A count" does not say which count. The early return hides errors only from the checker count. The distance stage runs every stage of every unit, whatever the earlier stages reported (`tools/distance/run.sh`, header). Quote: "so clearing an early error can raise a count (F-53)".
  - The row pointer reads as if it gave the top-level case. Rows 620 and 621 are the local case; row 405 is the top-level case (Appendix I). Quote: "as at top level (rows 620, 621)".
- **Ownership: F.** The entry holds two claims that change apart. The early return changes if the order of `StaticChecker`'s stages changes. The refusal changes when inference of parameter types is built. Quote: the title, "A unit's earlier error hides its overloading and return-type checks, and the checker refuses a local function's parameter left untyped."
- **Consistency: P.** Appendix I, rows 620 and 621, and F-53 agree with it.
- **Disposition: reorganize.** Split the entry in two. In the first entry, name the checker count as the count that can rise, and say that the distance does not hide these errors. In the second, name the test, the rows and the subsection of Appendix I.

## F-43, the overloading checker's memo

- **Scope: P.** **Present meaning: P.**
- **Evidence: P.** `triage.md` section 1 gives the mechanism. The memo caches a verdict of "valid" for each pair of declarations. Several traits can inherit one pair, and the checker checks the pair once in each trait, in hash-set order. A verdict from one trait is then reused for the next. With the memo off, every build gave 203. `OverloadingChecker.scala:79` reads the switch, and its default is on. Both gate stages turn it off (`checker-count/run.sh:54`, `:70`; `distance/run.sh:83`).
- **Comprehension: P.** "Build order" is the tools' own phrase, and a worker can act on the consequence.
- **Ownership: F.** The pointer to F-226 is about another subject. It is left over from the split of 2026-10-14 (`FACTS-history.md:2159`). Quote: "F-226 gives how the checker renames an inherited method's static parameters."
- **Consistency: P.**
- **Disposition: reword.** Drop the F-226 sentence. Optional: the memo is on by default (`OverloadingChecker.scala:79`), so an ordinary `fortress compile` can miss the errors that the memo hides.

## F-44, the exclusion rule on the compiled path and in the library

- **Scope: P.** The distance has no exclusion error (F-53's classes are X1, BR and OT).
- **Present meaning: P.**
- **Evidence: F.** The cited sections 1 and 2 hold the rule and the checker's reliance on it. The checker uses the rule at `OverloadingOracle.scala:81-105`, and with the rule relaxed `ProbeMIEPick` dies with `IncompatibleClassChangeError`. Section 5 tells where the rule refused the library before route A: 61 errors at 23 declarations, on 2026-09-22. It does not hold the three declarations by which the library meets the rule now, or the distance's zero exclusion errors. Those are in the library (`FortressLibrary.fsi:121-123`, `:959`; `FortressLibrary.fss:4861-4867`), in rows 458 and 461, and in F-53. Quote: "Detail: `reviews/multiple-instantiation-exclusion.md` sections 1, 2 and 5."
- **Comprehension: F.**
  - The entry does not say which supertypes it means. They are `Comparison` and `StandardMinMax[\TotalComparison\]`.
  - The row pointer misleads. Row 461 is a walk failure of `BIG MIN` and `BIG MAX`, now FIXED, which the change of supertypes caused. It is not the change itself.
  - "`AnyMaybe` extending `AnyUniqueItem` alone" does not say what it extends alone, in place of what.
  - Quote: "The library meets it through `TotalComparison`'s supertypes (row 461), `AnyMaybe` extending `AnyUniqueItem` alone".
- **Ownership: P.**
- **Consistency: F.** F-48 and F-167 state that the checker does not refuse two boolean arguments, or a static parameter beside another argument (rows 406 and 414). F-44 says that the checker enforces the rule, with no limit and no pointer to those entries. Quote: "The compiled checker enforces the designers' "multiple instantiation exclusion" and relies on it".
- **Disposition: reword.** Point to F-48 for the kinds of argument that the rule compares. Name the supertypes, and what `AnyMaybe` no longer extends. Give row 461 its subject, or move it to the history. Cite F-53 and the library lines for "meets it".

## F-45, the prices of dropping the exclusion rule

- **Scope: P.** The scope note, sections 1 to 3 (2026-09-23), holds what dispatchers would need. `literature.md`, "What the field settled and what it did not", holds the absence of a published resolution under run-time dispatch.
- **Present meaning: P.**
- **Evidence: F.** The entry cites no source for the forest rule. `patents-forest-rule.md` section 1 holds the rule. `route-c-experiment.md` holds the finding that the rule alone leaves the hole open ("Killed: the forest without the rule"). The remainder for `opr` and `nat` comes from `rung-generic-runtime/REPORT.md`, lines 97 and 101: the change skips a dispatcher that has a static parameter of another kind than a type. The entry cites neither note. Quote: "Detail: `reviews/mie-probes/scope-call-site-dispatch.md` section 3; `literature.md` beside it."
- **Comprehension: F.**
  - Neither this entry, nor F-46, nor the skill defines "the specialisation hole". It is Naden's hole: at run time, a specialised overload is chosen for a value that has two instantiations of one generic, and it returns a type that does not fit the caller's.
  - "Double membership" and "stand at several instantiations along a chain" are not defined either.
  - "F-46 closes it" reads as if an entry closed the hole. Route C closes it, and F-46 describes route C.
  - Quotes: "no published work resolves double membership under run-time dispatch"; "lets a self-typed generic stand at several instantiations along a chain, but alone it leaves the specialisation hole open; F-46 closes it."
- **Ownership: F.**
  - The entry restates F-136's subject: the call is built for template dispatchers, and rows 495 and 496 remain.
  - "These prices decided P-43" tells where the ruling came from. History and P-43 own that, and P-43's own "Why" gives other reasons.
  - Quotes: "F-136 builds that call for template dispatchers; generic dotted methods, other dispatchers, and `opr` and `nat` arguments lack it (rows 495, 496)"; "These prices decided P-43."
- **Consistency: P.** F-136 and rows 495 and 496 agree with it. P-43 gives other reasons, but it does not contradict the entry.
- **Disposition: reorganize.** Keep the two findings: what dispatchers would need, and what the published work does not resolve. Point to F-136 for what is built, and move the `opr` and `nat` remainder there. Define the hole once. Cite the patents note for the forest rule.

## F-46, route C

- **Scope: F.** The completion sentence and the list of work for a return both claim more than the note supports.
  - The note says that completing the tower needs seven declarations and the identification of `Integral[\ZZ32\]` with `ZZ32`. The patents' `comprises T` licenses the identification. A hierarchy check of its own could also enforce it, but that check is not built (section 4, "Qualified"; section 5, "The identification").
  - The list of work for a return also leaves out the seven declarations, which section 4 names.
  - Quote: "Completing the tower needs `comprises T` on the eight self-typed traits, which overflows the checker."
- **Present meaning: P.** "Built as a shadow" bounds the entry to the experiment.
- **Evidence: P.** Section 2b holds the 25 refused pairs at 21 declarations (markers dropped, C-full, the deep instrument) and the overflow in `Formula.tImplies` and `primImp`. Section 4 holds the cost of a reversal.
- **Comprehension: F.**
  - "The specialisation hole" is not defined (as under F-45).
  - "Walk's work" means two things: walk must accept the specialised pairs, and it must not overflow on `comprises T` (section 4).
  - "A method per level" is a forwarding method for each middle level's instantiation. Without it, a chain dies with `AbstractMethodError` (section 2a).
  - Quotes: "closes the specialisation hole"; "a method per level in the code generator, walk's work".
- **Ownership: P.**
- **Consistency: P.** P-43, P-95 and F-45 agree with it.
- **Disposition: reword.**

## F-47, the specification's examples that the exclusion rule refuses

- **Scope: F.**
  - The note limits the route C claim to E1 to E4 and E8. It also says: "only E5 and E7, the tower and the root's algebra, would read differently under route C" (`spec-refused-examples.md:497-502`). "These examples" includes E5, the nested tower, which is exactly what route C keeps.
  - The entry does not say which path refuses a generic coercion. The history names the compiled checker (`TypeHierarchyChecker.scala`).
  - Quotes: "Route C (F-46) would rescue none of these examples."; "a generic coercion is refused as a cyclic hierarchy".
- **Present meaning: P.**
- **Evidence: F.**
  - F-167 does not list the examples. Its detail, `rung-spec-route-a/decision-record.md` sections 2 and 3, lists them, and so does `spec-refused-examples.md`, "What was found", as E1 to E10.
  - The note marks the route C sentence "[inferred from the forest rule as `FACTS.md` records it]". The entry states it as a fact.
  - Quotes: "F-167 lists them."; "Route C (F-46) would rescue none of these examples."
- **Comprehension: F.** "Earlier" means before the checker reaches the exclusion rule, at `TypeDisambiguator`. "These examples" has no clear referent. Quotes: "The where-clause examples stop earlier on both paths"; "none of these examples".
- **Ownership: P.**
- **Consistency: F.**
  - P-95 keeps the original text "so that route C stays open", and the note says that the tower's text would read differently under route C. The entry says that route C rescues none of the examples.
  - F-167 makes an exception: `Nothing[\String\]` does not run on the compiled prelude (row 331, open). The entry says that the alternatives run on both paths. It does not say that its alternatives are user programs over the compiled prelude, which is a different scope.
  - Quote: "a parametric object with a factory, or a widening function, runs in their place on both paths."
- **Disposition: reword.** Bound the route C sentence to the where-clause examples, `Nothing` and E8, and mark it as an inference. Repoint "F-167 lists them" to the list's source. Name the path that refuses a generic coercion.

## F-48, what the checker's exclusion rule compares, and two other checks

- **Scope: P.** Each clause holds:
  - `cP` compares two type arguments, and two sizes only when both are literals (`TypeAnalyzer.scala:539-544`, "Todo: Handle bool args"). Rows 406 and 414 are open.
  - The abstract-method check matches an inherited abstract method to a concrete one by name, `meth2.name == meth.name`, and does not first replace an operator argument (`AbstractMethodChecker.scala:100-101`; by reading).
  - The code generator throws at `CodeGen.java:5805`.
- **Present meaning: P.**
- **Evidence: F.** `XXXNatExcludeChecker` gates only the refusal of two literal sizes (row 402). It checks for "Types Vec[\3\] and Vec[\4\] exclude each other". The claims on the operator argument and on `Any` rest on the judgement's probes (`OprSingle`, `OprInstancesOplus`, `AltEveryContra`; sections 4 and 9). They have no ledger row and no test: the judgement's candidate rows 3 and 5 were never entered in the ledger. The entry reads as if one test gated all of it. Quote: "Gated by `compiler_tests/XXXNatExcludeChecker`."
- **Comprehension: P.**
- **Ownership: F.** The entry holds three claims that change apart: the kinds of argument that the exclusion rule compares, the abstract-method check, and the code generator's handling of an `extends` clause. Quotes: the title, "The compiled checker's exclusion rule compares type arguments and literal sizes only, and its abstract-method check does not substitute an operator argument."; "The code generator throws on `Any` as a static argument in an `extends` clause."
- **Consistency: P.** F-167 (rows 406 and 414) and F-39 agree with it.
- **Disposition: reorganize.** Split the entry by claim. Give each claim its own kind of evidence: the test for row 402, and the probes, unentered in the ledger, for the other two. Narrow gap 2 below.

## F-49, a value form beside a function form under walk

- **Scope: P.** Section 2 measured walk's choice. With `E = Any`, walk tabulates a function argument (`c[1] = 11`). It also measured the checker's refusal under `Any` (`FillBoxAny`).
- **Present meaning: F.** `copy` is now declared on the meet. It is abstract in `StandardImmutableArrayType` and `StandardMutableArrayType` (`FortressLibrary.fsi:1518`, `:1528`), since row 467 was fixed (`0ae526b31`). Quote: "as `copy` is".
- **Evidence: F.** Section 2 does not hold the sentence on the diamond. The note's "Way 0" says the opposite of its second half: "the library's `copy` pattern would put them in each leaf trait instead; either satisfies the Meet Rule". Row 467 and F-158 support the sentence. In row 467, now FIXED, the checker refused `copy` that only the leaves declared. Quote: "declared in the leaves alone, as `copy` is, it does not."
- **Comprehension: P.**
- **Ownership: F.** The diamond sentence is about F-158's subject: "A method declared only in each leaf leaves the meet refused by the checker's Meet Rule, so `copy` is declared on the meet too (row 467)". Quote: "Declared where the array diamond meets, the pair clears the diamond's refusals; declared in the leaves alone, as `copy` is, it does not."
- **Consistency: F.** On `copy`, the entry disagrees with F-158 and with row 467. Quote: "as `copy` is".
- **Disposition: reorganize.** Drop the diamond sentence, since F-158 owns it. Keep the finding on walk and the checker.

## F-50, overloads that differ in static parameters, on the compiled checker

- **Scope: F.** The title says that the checker refuses only the pairs that it cannot prove unambiguous. By its Return Type Rule and its positional rule (F-75), it also refuses pairs that the paper accepts. Row 542 is a generic declaration beside a plain one on an object domain. Row 539 is the paper's own valid example (P-45). Quote: "refuses only the pairs it cannot prove unambiguous."
- **Present meaning: P.**
- **Evidence: P.** The note's sections 2.2 and 2.3 hold the refusals over open traits and in the `CAP` shape, and defects 3 and 4. Rows 584, 537 and 400 hold the rest.
- **Comprehension: F.** "Unbound" has no clear head. Row 400 means two things. Walk runs the arm with its size parameter unbound. The checker drops the arm when the size is in its parameter type, and refuses the call when the size is in no parameter type (F-69). Quote: "Walk runs an arm whose size the call leaves unfixed, unbound, where the checker refuses the call or drops the arm (row 400)."
- **Ownership: F.** Three of its defects are owned elsewhere. P-155 and F-245 own row 584. F-174 and Appendix I own row 537. F-69 owns the checker's half of row 400. Quotes: "It never checks a pair of symbolic operators (row 584). Two generic arms on a bare type variable fail compiled (row 537)."
- **Consistency: F.** As under scope, F-75 and row 542 refuse pairs that the paper accepts, and the entry does not state that different scope. Quote: as under scope.
- **Disposition: reorganize.** Bound "only" to the ambiguity side, and point to F-75 for the return-type and positional refusals. Point to the owners of rows 584, 537 and 400 in place of restating them.

## F-51, conversion of an argument whose type variable another argument fixes

- **Scope: F.** `tests/InferCoercionRungK.fss` gates the array-scalar `+`, `-`, `MIN` and `MAX` on `array[\RR64\](2)`, which is an `Array[\RR64,ZZ32\]`. It also gates the matrix-scalar juxtaposition and `DOT`. It calls no `Vector`-scalar operator (`FortressLibrary.fss:2619-2630`). Quote: "So under walk the library's vector and matrix operators take a `ZZ32` scalar with `RR64` elements."
- **Present meaning: P.**
- **Evidence: P.** `InferCoercionRungK` checks `scaleK(b, 3)` = "3.0 : RR64". `InferCoercionShapes` checks `scale(bL, 3)` and `scale(bL, z)` at `ZZ64`. Row 388 is FIXED. The probe note exists.
- **Comprehension: P.** **Ownership: P.**
- **Consistency: P.** F-73, F-137 and P-46 agree with it.
- **Disposition: reword.** Say "array-scalar and matrix-scalar operators", or name the operators that the test gates.

## Narrow gaps

1. F-40: nobody has measured the built design's load size or its hot loop. Its rung measured only the lookup at the dispatcher's literal leaf (`rung-size-runtime/REPORT.md` section 12). The rewrite can bound the entry to the measurement of designs A and B without this gap closed.
2. F-48: the judgement's candidate rows 3 and 5 have no ledger row and no test. Row 3 is the operator argument in the abstract-method check. Row 5 is `Any` as a static argument in an `extends` clause. F-48 is the only place in the record that holds them. By reading, both still hold at `8c99c2413` (`AbstractMethodChecker.scala:100-101`; `CodeGen.java:5805`). Whether to enter the rows is the coordinator's call.
