<!-- The FACTS clarity pass, chunk f5, 2026-10-22: F-64 to F-67 and F-69 to F-75 rewritten from the chunk's assessment, F-70 split in two, so that a reader without the batches behind them can tell what is established, under which conditions and on what evidence, with each entry's changes of meaning, the source of each sentence, and the points left for the coordinator. -->

# FACTS chunk f5: the rewrite

The base is `main` at `5ca623461`; the assessment read at `8c99c2413`. The assessment keeps F-68, so this file holds the other eleven: ten to reword, and F-70 to reorganize. F-70 splits into F-70, the checker's check of a written static argument, which F-87 points to, and a new entry, `F-?1` in `proposals.apply`, for the library's bounds and walk's stop. A section number is that of the report named. Concepts that every worker needs are in `concepts.md`. `clean.txt` holds the clean entries alone.

I could not run `record.py`: this session needs approval for it. So `record.py apply` of `proposals.apply` on a scratch copy, then `record.py check`, are still to run.

## F-64

> - F-64 **The compiled checker refuses every type that an api declares, trait or object, that extends a trait whose `comprises` clause has `...`, whether the clause lists it or not (row 354).** So the form `comprises { T, ... }` cannot stand in an api that declares `T`. The specification's text allows `...` in an api (`Specification/basic/traits.tex`, "Trait Declarations"). Only a draft note refuses it, and a release build leaves draft notes out. The team's `compiler_tests/XXX3q` and `XXX10p` pin the refusal, and a fix that skips it for a listed type turns them red. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Defects and their homes".

Meaning: wider in the title, as the code runs. "Every api-declared trait" becomes every type that an api declares, trait or object: `checkDeclComprises` runs on every `TraitIndex` (`TypeHierarchyChecker.scala:273-278`, refusal at `:338-341`), the team's `XXX3q` pins it for `object O extends T` (`test_library/Compiled3.q.fsi:13-14`), and row 354 says "every declared type". "The rendered specification" becomes the specification's text against a draft note: the tree builds in draft mode, which renders notes in a "Draft note" box (`Specification/fortress/fortress.tex:33-45`), so "rendered" told the two texts apart wrongly.

Sources: the text allows `...` in an api, `traits.tex:161-162`; the note, `:277-283`; the tests and the red case, the assessment.

## F-65

> - F-65 **The checker memoizes `TypeAnalyzer.parents` and `excludesClause` per trait table, and the memo changes no answer.** `FORTRESS_ANALYZER_CLAUSES_CACHE=false` turns it off. By reading, both functions depend only on the table and the type. One differential on climb batch 7C's tree gave the same errors with the memo off and on: 626 at the distance stage and 75 at the count stage. In that measurement the count stage took 1,149 s with the memo off, past its 900-second limit, against 112 s with it on. Detail: `compile-ladder/rung-analyzer-memo/REPORT.md`, "Why the memo changes no answer"; `reviews/row-488-probe.md`, "The answer".

Meaning: narrower. "Off, the count stage ran past its 900-second limit when measured, so turning it off is no control for anything" claimed a present rule from one measurement. The clean text gives that measurement with its tree and its numbers, and drops "no control". The clause on row 488 leaves: row 488 is a duplicate of row 737, which is fixed.

Sources: the switch, `TraitTable.scala:116-131`; the reading, the report's section; the differential and the timings, `reviews/row-488-probe.md`, "The answer", item 3; the stage's limit, `checker-count/run.sh:69`.

## F-66

> - F-66 **The checker-count stage's table, `gate/checker-count.txt`, lands with every batch beside the gate's `summary.txt`.** Its total at the last landed gate is F-53's count. The gate's step 8 compares it with the newest landed table. The total is never red on its own, as P-39 rules, since a fix can raise it and two rungs' changes do not add. The gate is red on a crash line that no rung declared, on a table with no total, and on a stale shadow: the instrumented copy of `StaticChecker` that the stage runs, when it no longer matches the tracked checker. Detail: `coordinator/climb-batch-workflow.md`, "The checker count, and a rung whose test is that stage".

Meaning: unchanged. The shadow is defined, from `climb-batch-workflow.md:226` and `climb-batch-workflow.js:1129-1130`. P-39 is named as the ruling behind the never-red total.

## F-67

> - F-67 **The compiled type checker checks `nat` and `int` static parameters.** A size is a symbol, a literal or an operation on sizes, compared by its written form once numerals are folded (F-146). The checker refuses to infer a `bool`, `dim` or `unit` static argument. A `bool` argument written out passes the checker: row 406's `Flag[\true\]` and `Flag[\false\]` pass it and then stop in code generation. A call that leaves a size unknown is refused, "Could not infer static argument ... without context"; F-69 gives when an overload set is refused and when it is not. It builds P-40. Gated by `compiler_tests/NatInferredChecker` and its siblings in the report's section 6. Detail: `compile-ladder/rung-nat-checker/REPORT.md` section 1.

Meaning: corrected, as the assessment asks. The checker does not refuse a `bool`, `dim` or `unit` parameter by name; it refuses to infer such a static argument (`STypesUtil.scala:585-606`, "Static argument inference for the bool static parameter b is not supported by the type checker"; `XXXNatBoolChecker.fss`; report section 1). A `bool` argument written out passes the checker (row 406). I wrote only the `bool` case, since row 406 is the only evidence for an argument written out. The overload-set case now points to F-69, which holds its limits.

## F-69

> - F-69 **The compiled checker refuses a call whose most specific arm failed only on a size that the call cannot fix, when that arm's parameter type is free of the size.** The message is "Could not infer static argument nat n without context". It drops instead an arm whose unknown size is in its own parameter type (row 400). It lets through a call whose argument's static type lies above the arm's domain, and the compiled run dies reading the size (row 446). It builds P-40. Gated by `compiler_tests/NatKnownSizeArm` and `XXXNatUnknownSize*`. Detail: `compile-ladder/rung-unknown-size-arm/REPORT.md` section 10.

Meaning: unchanged. The body's condition, "its parameter type is free of it", moves into the title.

## F-70, and the new entry

> - F-70 **The compiled checker checks a static argument written at a dotted method call against its parameter's bound, but not one written at a top-level function call.** At a dotted call it puts the written arguments into each bound and refuses a call whose argument misses one, "No such method" (row 651, fixed). At a top-level call it matches kinds only, so `n[\String\]("d")` passes for `n[\T extends Number\](s: String): T` (row 470). Gated by `compiler_tests/MethodStaticArgsBoundNamesOther*`, which cover the dotted call only. Row 470 has no test. Detail: `compile-ladder/rung-checker-contexts/REPORT.md` section 1.

> - F-?1 **No static parameter of the interpreter's library is bounded by `Object`; under walk, an argument whose type is a tuple, `()` or an arrow, at a parameter typed by a type variable bounded by `Object`, stops the program with an `InterpreterBug`, not a type error (row 471).** The library's result-only parameters are unbounded, as P-48 decides (F-84). Six functions of the `FortressLibrary` api write `extends Any`: `cast`, `instanceOf`, `identity`, `shared`, `localize` and `copy`. The specification's examples and the compiler tests write `extends Object`, so they can meet walk's stop; the library's own declarations do not. Row 471 has no test. Evidence: a search of `Library/` and `ProjectFortress/LibraryBuiltin/`, and the probe that row 471 records. Detail: `compile-ladder/rung-result-bounds/REPORT.md` section 10.

Meaning: unchanged; the claims are divided. F-70 keeps the checker's check by call form (rows 651, 470), with row 470's example from the ledger, and says that the gate covers only the dotted call. The new entry holds the library's bounds and walk's stop (row 471). "Six, `cast` among them" becomes the six functions of the `FortressLibrary` api (`FortressLibrary.fsi:24-52`); only `cast`'s parameter among them is result-only, so they are no longer said in the same breath as the result-only parameters' count. The title's "walk stops on a tuple, `()` or an arrow for a written `Object`" is said in full from row 471.

"So they can meet walk's stop; the library's own declarations do not" is my inference from the two claims. The assessment reads walk's stop as the reason the library writes no `extends Object`, citing P-48. P-48 gives a different reason, the team's later word, so I did not write the stop as the reason.

The detail split follows the claims: `rung-checker-contexts/REPORT.md` section 1 for the dotted call, `rung-result-bounds/REPORT.md` section 10 for the library's bounds.

## F-71

> - F-71 **The compiled checker does not narrow a `typecase` variable in the shorthand form `typecase x of T => ...`, neither path accepts the binding form `typecase x = e of`, and the clause-binding form `x:T =>` runs on both paths.** So write the clause-binding form, as the library does (F-134). The shorthand form runs under walk only. The binding form parses as the equality `x = e`; only the specification's grammar, marked for revision, has it. Row 460 records both refusals, and no test gates them. Detail: `compile-ladder/rung-exclusion-remainder/REPORT.md` section 15.

Meaning: unchanged. The shorthand form is shown, `typecase x of T => ...` (row 460's `typecase c of Rel[\E\] => useRel[\E\](c)`; `typecase.tex:126-133`). No test gates the two refusals; row 460 records them, and its probes are no longer in the tree.

## F-72

> - F-72 **The compiled checker reads a `comprises` clause as the 2012 texts do for a generic subtrait: it may extend the closed trait when the trait table knows at least one type that immediately extends it and each such type is below a listed type.** It builds P-44. The ellipsis refusal stays (F-64). Open: an extender in another unit escapes the check, the hole that P-44 leaves, on phase 3's road with no batch named (row 487). Parked for the curator: the verdict changes when the extender renames its type variable (row 489), and the extenders are found by the simple text of the trait's name (row 490). Gated by `compiler_tests/ComprisesGenericSubtrait`. Detail: `compile-ladder/rung-comprises-checker/REPORT.md` section 6.

Meaning: corrected. Row 487 is open on phase 3's road with no batch named (`PLAN.md:70-73`), the hole that P-44 leaves; it is not parked. Rows 489 and 490 are parked (`PLAN.md:204`; review-queue item 13). Each row is said by what it does, from the ledger.

## F-73

> - F-73 **The compiled checker infers a generic's static arguments with coercion: a type parameter that is the whole type of one parameter, and occurs in no other parameter type, takes the narrowest of its arguments' types, their coercion targets and its bound.** It builds P-74 and P-49. A coerced declaration ranks below one that needs no coercion. A tie among coerced declarations is refused, "Ambiguous coercion". When the declarations differ only at a numeral, the checker reads the numeral as `ZZ32`, or as `ZZ64` or `ZZ` when its value does not fit; that reading is a default that waits for the curator's review (review-queue item 209). The coercion attempt refuses a call beyond 64 combinations of candidate types (row 506) and a call with an untyped function argument (row 507). Gated by `compiler_tests/NatLitArgChecker`, `CoercionGenericFnCompiledRungC` and `InferCoercionShapes` (F-51), and the refusal of a tie by `XXXInferAmbiguousCoercion`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2.

Meaning: corrected in standing, not in behaviour. The numeral reading in a tie is a default that waits for the curator's review (review-queue item 209), not a rule of P-74 or P-49; the clean text says so. "Or wider" becomes item 209's "`ZZ64` or `ZZ` when its value does not fit". "A lone type parameter" is said plainly, from the report's section 3.2. Rows 506 and 507 are said by their shapes, from the ledger. The tests that gate the inference are named: `NatLitArgChecker` and `CoercionGenericFnCompiledRungC` (the history's former text), `InferCoercionShapes` through F-51; `XXXInferAmbiguousCoercion` gates only the refused tie.

## F-74

> - F-74 **Under walk, an integer numeral takes its type from its value: a `ZZ32` if it fits 32 bits, a `ZZ64` if it fits 64 bits, a `ZZ` above that; it stays so until walk has the checker's static types, since without them a list of numerals and a generic's static argument take their types from the values.** Walk names these values by its implementation classes `Int`, `Long` and `BigNum`, as in `Cell[\Int\]` (row 364). It is P-76's walk half; F-79 is the library half. Probe Q measured the switch to an `IntLiteral` numeral under walk, before climb batch N's second run and before the library half landed: alone it changed 59 test verdicts. With its four devices, the library loaded and both microGPT checks kept their values, but 24 passing interpreter tests failed: 6 by design, 3 of them team tests that assert a `ZZ32`; 9 for want of static types (rows 364, 510); and 9 walk gaps. A size below 2^31 used as a value is a `ZZ32` too (row 486; F-140). Detail: `reviews/numeral-switch-judgement.md` sections 2 and 3.

Meaning: corrected. "Walk's numeral stays an `Int`" becomes its type by width: `FIntLiteral.make` makes an `Int` (a `ZZ32`) up to 32 bits, a `Long` (a `ZZ64`) up to 64, a big integer (a `ZZ`) above (`interpreter/evaluator/values/FIntLiteral.java:40-56`), as P-76 states. The class names stay in one sentence, since walk prints them (row 364). The 24 failures are bounded to probe Q: its tree, before climb batch N's second run and before F-79's library half, and its four devices; the switch alone changed 59 verdicts (judgement section 2, its first two items; section 3 for the three groups). The library loading and microGPT's values are probe Q's (section 2, "microGPT's values do not move").

"A size below 2^31 used as a value is an `Int` too" becomes "a `ZZ32` too", the same width rule (`BaseEnv.java:628-631`; row 486; F-140).

## F-75

> - F-75 **The compiled checker checks the Return Type Rule over every instance, and a positional rule: when two generic declarations in the more-specific relation declare as many static parameters of their own, those parameters agree in kind by position, and the more specific return type is a subtype of the other once the other's parameters are read as its own by position.** It builds P-45. It also refuses a generic declaration beside a plain one on an object domain, which the paper accepts (row 542; review-queue item 57, for the curator's review). In the interpreter's library they refuse no pair: the distance holds no return-type or overloading error (F-53). Gated by `compiler_tests/OverloadGeneric*` and `OverloadBoundNamesForced`, which accept, and `XXXOverloadReturnEveryInstance`, `XXXOverloadPermutedStaticParams` and `XXXOverloadReturnObjectDomain`, which pin the refusals. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2.

Meaning: narrower, as the code runs. The positional rule compares only two declarations that declare as many static parameters of their own (`satisfiesPositionalRule`, `OverloadingOracle.scala:161-165`, in `scala_src/overloading/`), with kinds by position and the return type read positionally, as its comment at `:150-160` says. The handle "answer 9" leaves. The refusals' tests are named; `OverloadGeneric*` holds only the two accepting tests. Row 542 gets its review-queue item, 57.

## For the coordinator

- F-87 points to F-70 for "where it checks a written static argument against its bound". After the split, F-70 still holds exactly that, so F-87's pointer needs no change. No other entry points to F-70.
- Outside the chunk, as the assessment notes: F-36 repeats F-67's old wording on `bool`, `dim` and `unit`; F-262 ("Walk's numeral is an `Int` (F-74)") and F-263 ("a `ZZ32` value (F-74)") follow F-74's old title; P-45 states the positional rule without its condition of equal counts.
- The new entry's place: I put it under "The checker and the one library", beside F-70. If F-84 should hold the library's bounds instead, as the assessment also allows, F-84's text in chunk f6's proposal would grow by one sentence, and walk's stop would still need a home.
- Run `record.py apply` and `record.py check`; this session could not.

No question for the curator.
