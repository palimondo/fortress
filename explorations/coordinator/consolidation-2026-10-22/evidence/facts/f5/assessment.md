<!-- Chunk f5 of the FACTS clarity assessment: F-64 to F-75, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `8c99c2413` (FACTS, its history, PLAN and POSITIONS as at `4caa90c81`). -->

# FACTS chunk f5: assessment

The base is `main` at `8c99c2413`. FACTS, FACTS-history, PLAN and POSITIONS are the same there as at `4caa90c81`. The review queue had uncommitted edits while I read it, so I cite its items by number, not by line. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the ledger rows, the tests, the checker's code and the specification. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-64 | **fail** | pass | pass | **fail** | pass | pass | **reword** |
| F-65 | pass | **fail** | pass | **fail** | pass | pass | **reword** |
| F-66 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-67 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-68 | pass | pass | pass | pass | pass | pass | keep |
| F-69 | **fail** | pass | pass | pass | pass | pass | **reword** |
| F-70 | pass | pass | pass | **fail** | **fail** | pass | **reorganize** |
| F-71 | pass | pass | pass | **fail** | pass | pass | **reword** |
| F-72 | pass | pass | **fail** | pass | pass | pass | **reword** |
| F-73 | **fail** | pass | **fail** | **fail** | pass | pass | **reword** |
| F-74 | **fail** | **fail** | pass | **fail** | pass | **fail** | **reword** |
| F-75 | **fail** | pass | **fail** | **fail** | pass | pass | **reword** |

Counts: keep 1, reword 10, reorganize 1, investigate 0. Each fail below has a correction that its evidence already gives, so no fail needs a question settled first. Two narrow gaps that no rewrite depends on are at the end, with four notes for entries outside this chunk.

## F-64, the ellipsis refusal in an api

- **Scope: fail.** The refusal covers every type declared in an api, objects included, not only traits. Quoted: "The compiled checker refuses every api-declared trait that extends a trait whose `comprises` clause has `...`". `checkDeclComprises` runs on every `TraitIndex`, objects among them (`TypeHierarchyChecker.scala:273-278`), and refuses at `:338-341`. The team's own `XXX3q` pins the refusal for `object O extends T` (`ProjectFortress/test_library/Compiled3.q.fsi:13-14`). Row 354 says "every declared type".
- **Present meaning: pass.** It states the current refusal and what it rules out.
- **Evidence: pass.** The refusal is `isApi && NodeUtil.isComprisesEllipses(si.ast)` (`TypeHierarchyChecker.scala:338-341`). `XXX3q.test` and `XXX10p.test` pin its message. Both shapes list their extender (`Compiled3.q.fsi:13-14`, `compiler_tests/Compiled10.pAPI.fsi:13-14`), so a fix that skips the refusal for a listed type turns them red. Row 354 is open (NEGATIVE-VERIFIED). The text allows `...` in an api (`Specification/basic/traits.tex:161-162`), and a listed extender meets the rule at `:247-254`. The `\note` is `:277-283`, and a release build defines `\note` as empty (`Specification/fortress/fortress.tex:35-36`). A reading note: the `\note` says "other traits may explicitly extend T, but these traits may not be declared or imported by the API". That can be read as covering only unlisted extenders. The record reads it as refusing every extender that the api declares (`rung-exclusion-remainder/REPORT.md`, section 15, row 459), and the entry agrees with that reading. I do not make this a fail.
- **Comprehension: fail.** Quoted: "The rendered specification allows it; only a `\note`, which a release build does not render, refuses it." The tree builds the specification in draft mode: `\releasetrue` is commented out (`fortress.tex:33`), and draft mode renders the note in a "Draft note" box (`fortress.tex:39-45`). So "rendered" does not tell the two texts apart. The intended contrast is the specification's text against a draft note.
- **Ownership: pass.** One subject.
- **Consistency: pass.** F-63 (QQ's `comprises { ... }`, which nothing extends, so the refusal misses it) and F-72 ("The ellipsis refusal stays") agree.
- **Disposition: reword.** Say "type" (trait or object). Contrast the specification's text with a draft note that a release build leaves out.

## F-65, the trait table's two memos

- **Scope: pass.** The title and the body name the same two memos and their switch.
- **Present meaning: fail.** Two passages.
  - "so it does not cause row 488's moves". Row 488 is now `DUPLICATE` of row 737, which is `FIXED` (`fortress-gap-ledger.md`, rows 488 and 737). The clause answers a question that is closed.
  - "Off, the count stage ran past its 900-second limit when measured, so turning it off is no control for anything." The timing is one measurement on climb batch 7C's tree: 1,149 s with the memo off against 112 s with it on (`reviews/row-488-probe.md`, "The answer", item 3). Today the count stage takes about 63 s with all the memos on (F-240). "Is no control" is stated as true now, but its only support is that one measurement.
- **Evidence: pass.** The memo and its switch are at `TraitTable.scala:116-131`: `fortress.analyzer.clauses.cache`, default on, and `ProjectProperties` maps property names to environment names. The report shows by reading that both functions depend only on the table and the type (`rung-analyzer-memo/REPORT.md`, "Why the memo changes no answer"). The probe's differential gave the same 626 distance errors and the same 75 count errors both ways at batch 7C's build. The stage's limit is `timeout -k 10 900` (`checker-count/run.sh:69`).
- **Comprehension: fail.** "row 488's moves": the entry does not say what moved. Row 488 says that the checker's errors in big operators' bodies changed with what the checker had already queried in the same run.
- **Ownership: pass.** One subject. The trait table now has other memos (`fortress.analyzer.ground.cache`, `TraitTable.scala:133-147`; F-235). F-65 names only its own two, which is correct.
- **Consistency: pass.** F-43 (the overloading memo, off in the counts) and F-235 cover other memos, and none conflicts.
- **Disposition: reword.** Keep the memo, its switch, and the finding that it changes no answer, by reading and by one differential at climb batch 7C's tree. Bound the timing to that measurement, or drop "no control". Move the row 488 clause to the history, or repoint it to row 737 and say what moved.

## F-66, the checker-count table and the gate's step 8

- **Scope: pass.** A nuance: `checker_compare` turns red on a crash line only when it differs from the last landed table's and is not the declared one (`climb-batch-workflow.js:1124-1127`). The last landed table has `#crash none`, so in practice any crash line differs, and the entry's wording holds.
- **Present meaning: pass.**
- **Evidence: pass.** `climb-batch-workflow.md:224-230`. `climb-batch-workflow.js:1109-1134`: `last_landed_checker_count`, then `NO TOTAL`, `CRASH CHANGED` and `SHADOW STALE` as the red cases, and the total never red. `climb-batch-20/gate/checker-count.txt` reads `#total 3`, which is F-53's 3. Batches 17 to 20 and N each have the table beside `summary.txt`.
- **Comprehension: fail.** Quoted: "a stale shadow". The entry does not define it. The workflow does: the instrumented copy of `StaticChecker` that the stage runs, when it no longer matches the tracked checker (`climb-batch-workflow.md:226`; `climb-batch-workflow.js:1129-1130`).
- **Ownership: pass.** One subject. The never-red rule and its reason are P-39's ruling. P-39 points here for the red cases, but F-66 does not point back to P-39.
- **Consistency: pass.** P-39 and F-53 agree.
- **Disposition: reword.** Say what the shadow is. Give P-39 as the owner of the never-red rule.

## F-67, the checker's sizes

- **Scope: fail.** Two passages.
  - "The checker refuses a `bool`, `dim` or `unit` parameter by name." The checker refuses to infer a static argument of these kinds. `makeInferenceArg` throws "Static argument inference for the bool static parameter b is not supported by the type checker." (`STypesUtil.scala:585-606`). The gating test infers one: `XXXNatBoolChecker.fss`, "a bool static parameter inferred from the argument's type". The report's section 1 says the same: inference of a `bool`, `dim` or `unit` parameter is refused. A declared `bool` parameter with its arguments written out passes the checker: row 406, `trait Flag[\bool b\]` with `object F extends { Flag[\true\], Flag[\false\] }`, passes and then dies in code generation.
  - "It refuses a size that a call leaves unknown, also in an overload set (F-69)." In an overload set, the checker drops an arm whose unknown size is in its own parameter type (row 400), and it lets the dynamic form through (row 446), as F-69 and P-40 say. The sentence gives the overload-set case without those limits.
- **Present meaning: pass.**
- **Evidence: pass.** `rung-nat-checker/REPORT.md` section 1. A call that leaves a size unknown gets "Could not infer static argument ... without context" (`Functionals.scala:252-264`; `ApplicationError.scala:169`). `NatInferredChecker`, `NatWrittenChecker`, `NatMethodChecker`, `NatExportChecker` and `XXXNatMismatchChecker` exist. F-146 holds the comparison by written form after folding (`Formula.nEq`; `rung-size-expressions/REPORT.md` section 1).
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** F-20, F-61 and P-84 agree. F-36, outside this chunk, repeats the `bool`, `dim`, `unit` wording ("the checker refuses the first three by name (F-67)") and needs the same correction.
- **Disposition: reword.** Say that inference of a `bool`, `dim` or `unit` static argument is refused. Give the overload-set case with F-69's limits, or point to F-69 for the overload set without claiming the refusal there.

## F-68, sizes in the return-type rule

- **Scope: pass.** It is limited to sizes in the return-type rule, and to the two shapes that its tests hold.
- **Present meaning: pass.**
- **Evidence: pass.** `OverloadingOracle.scala:90-106` keeps a size that escaped as the less specific declaration's own parameter. `forcedArgs` leaves an unsolved size unforced (`:133-158`, the `_InferenceVarInt` case). In the paper, σ∧ = ∀[Δ1, Δ2] (`Papers/Types/overloading-check.tick:166-172`). The report's section 5 table refuses `SubOvOneSize` and accepts `SubOvUniv`, the `subarray` shape. `NatOverrideChecker` and `XXXNatRetSizeChecker` exist.
- **Comprehension: pass.** `Dn` and `Up` are the report's test types, but the sentence reads plainly as an example of a sized override.
- **Ownership: pass.**
- **Consistency: pass.** F-75 keeps the less specific declaration's static parameters quantified unless the domains force them, and agrees.
- **Disposition: keep.**

## F-69, the unknown-size arm

- **Scope: fail.** Quoted, the title: "The compiled checker refuses a call whose most specific arm has a size the call cannot fix." The body then limits it. The call is refused only when the arm's parameter type is free of the size. Otherwise the arm is dropped (row 400), and the dynamic form passes (row 446). So the title claims more than the body. F-67's "also in an overload set (F-69)" passes the broad reading on.
- **Present meaning: pass.**
- **Evidence: pass.** `Functionals.scala:252-264`, `:762-770`; `ApplicationError.scala:169`. The report's summary and section 10. Rows 400 and 446 are open. `NatKnownSizeArm` exists, and so do `XXXNatUnknownSizeArm`, `Val` and `FnValue`; `XXXNatUnknownSizeArm` pins the quoted message.
- **Comprehension: pass.**
- **Ownership: pass.**
- **Consistency: pass.** P-40 lists row 400 as still to build, and agrees.
- **Disposition: reword.** Put the condition into the title: the arm's parameter type is free of the size.

## F-70, `Object` bounds, the checker's bound check, and walk's stop

- **Scope: pass.** Each of the title's three claims is limited in the body.
- **Present meaning: pass.**
- **Evidence: pass.** No static parameter in `Library/` or `ProjectFortress/LibraryBuiltin/` is written `extends Object` (grep). `FortressLibrary.fsi:24`, `:26`, `:32`, `:45`, `:49` and `:52` write `extends Any`. Row 651 is fixed. Row 470 is open, with its note "a dotted call now checks it; a top-level call does not". Row 471 is open. `MethodStaticArgsBoundNamesOther` and `...SameName` exist. A limit: the gate covers only the dotted call. Rows 470 and 471 have no test, and their probes are no longer in the tree; the rows say so.
- **Comprehension: fail.** Two passages.
  - "and six, `cast` among them, write `extends Any`". The reader cannot tell six of what. The sentence follows "result-only parameters", but of the six only `cast`'s `T` is result-only. `instanceOf`'s `T` occurs in neither its parameter nor its result, and `identity`, `shared`, `localize` and `copy` take a `T`. The six are the `FortressLibrary` api's (`FortressLibrary.fsi:24-52`).
  - The title's "walk stops on a tuple, `()` or an arrow for a written `Object`" is too compressed. It means: on an argument whose type is a tuple, `()` or an arrow, at a parameter typed by a type variable written `extends Object`.
- **Ownership: fail.** Quoted, the title: "No static parameter of the one library is bounded by `Object`; the compiled checker checks a static argument written at a dotted method call against its bound, but not one written at a top-level function call; and walk stops on a tuple, `()` or an arrow for a written `Object`." These are three claims that change apart: the library's declarations, which a library edit changes; the checker's check by call form, which a fix of row 470 changes; and walk's stop, which a fix of row 471 changes. F-84 already owns the claim that the result-only parameters are unbounded, and F-70 repeats it.
- **Consistency: pass.** F-84, F-87 and P-48 agree.
- **Disposition: reorganize.** Split off the checker's check of a written static argument against its bound, by call form (rows 651, 470). That is the claim F-87 points to here. Put the library's `Object`-free bounds with F-84, which owns the result-only parameters, or keep them as their own entry. Walk's stop (row 471) can go with them, since it is why the library writes no `extends Object` (P-48). Repoint F-87 to the part that holds the checker's check.

## F-71, the three `typecase` forms

- **Scope: pass.**
- **Present meaning: pass.**
- **Evidence: pass.** Row 460 is open and records both refusals. The report's section 15 records the rung's probes (`TcTrait`, `TcNested`, `TcBind`, `TcTuple`, `TcClause`), which are no longer in the tree. F-134 gates the clause-binding form on the compiled path (`TypecaseBindRungG`). No test gates the two refusals, and the entry does not say so.
- **Comprehension: fail.** Quoted: "The compiled checker does not narrow a `typecase` variable in the shorthand form". The entry shows the binding form and the clause-binding form, but not the shorthand form: `typecase x of T => ...`, which should narrow `x` inside the clause (row 460, `typecase c of Rel[\E\] => useRel[\E\](c)`; `typecase.tex:126-133`). A reader cannot tell which form to avoid.
- **Ownership: pass.** One subject: which `typecase` form to write.
- **Consistency: pass.** F-134 agrees.
- **Disposition: reword.** Show the shorthand form. Say that no test gates the two refusals, which row 460 records.

## F-72, `comprises` for a generic subtrait

- **Scope: pass.** The code matches the title: case 4 of `isEligibleToExtend`, for a generic `tt` only (`TypeHierarchyChecker.scala:382-392`), and `everyKnownSubtypeListed`, at least one immediate extender and each below a listed type (`:403-418`).
- **Present meaning: pass.**
- **Evidence: fail.** Quoted: "Open, and parked for the curator: an extender in another unit (row 487), the extender's spelling (row 489) and the match of types by simple name (row 490)." PLAN puts row 487 under "Rows on phase 3's road with no batch named" (`PLAN.md:70-73`), not under "Off the path, parked". Only rows 489 and 490 are parked (`PLAN.md:204`; review-queue item 13, "Needed by: never"). The rest is supported: `ComprisesGenericSubtrait` exists, and rows 487, 489 and 490 are open.
- **Comprehension: pass.** "The 2012 texts" are named in P-44, which the entry cites. "The extender's spelling" could say "how the extender spells its type variable".
- **Ownership: pass.**
- **Consistency: pass.** P-44 (row 487's hole left open), F-62 and F-64 agree.
- **Disposition: reword.** Give row 487 as open on phase 3's road, the hole that P-44 leaves, and rows 489 and 490 as parked.

## F-73, inference with coercion

- **Scope: fail.** Quoted: "It builds P-74 and P-49. … A coerced tie is refused, "Ambiguous coercion", unless the declarations differ only at a numeral, read then as `ZZ32` or wider." The numeral reading is not P-74's or P-49's rule. It is a default that waits for the curator's review (review-queue item 209, "Default: as landed"), and P-46 no longer states it. The entry gives it beside the rulings it builds and does not say that it is a default.
- **Present meaning: pass.**
- **Evidence: fail.** Quoted: "Gated by `compiler_tests/XXXInferAmbiguousCoercion`." That test asserts only the refusal of the tie (`compile_err_contains=Ambiguous coercion in call to function f`). Other tests gate the title's rule, the narrowest instance under coercion, and the entry does not name them: `NatLitArgChecker` and `CoercionGenericFnCompiledRungC` (the history's former text), and `InferCoercionShapes` through F-51. The behaviour itself is supported: `rung-inference-checker/REPORT.md` section 3.2, `numeralTie` (`Functionals.scala:784`) and the message (`:942`).
- **Comprehension: fail.** Two passages.
  - "a lone type parameter" is not defined. In the report it is a type parameter that is a position's whole type and occurs in no other parameter type (section 3.2).
  - "Rows 506 and 507 are shapes the coercion attempt refuses" does not say which shapes: a call beyond 64 combinations of candidate types (row 506), and a call with an untyped function argument (row 507).
- **Ownership: pass.**
- **Consistency: pass.** P-74, P-46, P-49 and F-51 agree.
- **Disposition: reword.** Mark the numeral reading as the default of review-queue item 209. Name the tests that gate the inference. Define "lone", or say it plainly, and name the two shapes.

## F-74, walk's numeral

- **Scope: fail.** Two passages.
  - The title, "Walk's numeral stays an `Int`". `FIntLiteral.make` makes an `Int` only from a numeral that fits 32 bits. It makes a `Long` up to 2^63-1, a big integer above that, and an `IntLiteral` below -2^63 (`interpreter/evaluator/values/FIntLiteral.java:40-56`; `reviews/numeral-switch-judgement.md` section 2, its second addition).
  - "With walk's numeral an `IntLiteral`, the library loads and both microGPT checks keep their values, but 24 passing interpreter tests fail". The 24 were measured with probe Q's four devices. The switch alone changed 59 verdicts (judgement section 2, its first two items).
- **Present meaning: fail.** The 24 failures, the library loading, and both microGPT checks keeping their values are one measurement: probe Q on climb batch N's tree, before the library half (F-79) landed. The entry states them as the present.
- **Evidence: pass.** Judgement section 3 gives 6 + 9 + 9: kinds E and K; F and P; and G, L, N, O, M with one test not traced. `FIntLiteral.java:40-56`. `BaseEnv.java:628-631`: `putNat` makes a size's value through `FIntLiteral.make`, as F-140 says.
- **Comprehension: fail.** Quoted: "an `Int`". This is walk's implementation class below `ZZ32` (judgement section 2, row 364's mechanism), not a type that a reader of Fortress knows. F-262 and F-263 repeat it.
- **Ownership: pass.** One subject: walk's half of the numeral switch, and what it waits on.
- **Consistency: fail.** P-76 says: "Walk still gives an integer numeral the type `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit". F-74's title gives the narrower "an `Int`", and neither entry says that their scopes differ. F-263's "Under walk a numeral is a `ZZ32` value (F-74)" follows F-74's wording.
- **Disposition: reword.** State the current property by width, in Fortress's types. Bound the 24 to probe Q, its four devices and its tree. Keep the three groups and their rows.

## F-75, the Return Type Rule over every instance, and the positional rule

- **Scope: fail.** Quoted: "answer 9's positional rule: two generic declarations in the more-specific relation agree on their static parameters by position." The rule compares only two declarations that declare as many static parameters of their own (`satisfiesPositionalRule`, `OverloadingOracle.scala:161-165`: `if (xo.isEmpty || xo.size != yo.size) return true`). P-45, outside this chunk, has the same omission.
- **Present meaning: pass.**
- **Evidence: fail.** Quoted: "Gated by `compiler_tests/OverloadGeneric*`." The pattern matches `OverloadGenericBesidePlain` and `OverloadGenericAgreeByPosition`, two run tests that only accept. The refusals that show the two rules are outside the pattern: `XXXOverloadReturnEveryInstance` ("the return type of Round->Round"), `XXXOverloadPermutedStaticParams` ("should correspond position by position"), and `XXXOverloadReturnObjectDomain` for row 542, with `OverloadBoundNamesForced` beside them. The rest is supported: `OverloadingOracle.scala:83-130`; row 542 and review-queue item 57; and the last landed `distance.txt`, which has `#kind overloading 0` and `#kind return-type 0`.
- **Comprehension: fail.** Quoted: "answer 9". This is a handle from a past conversation, the very example that `record.md`, "What an entry is", sends to the history.
- **Ownership: pass.**
- **Consistency: pass.** P-45, F-68, F-242 and F-53 agree.
- **Disposition: reword.** Drop the handle. Give the condition of equal counts. Name the tests that assert the refusals.

## Narrow gaps, and points outside the chunk

- F-65: how long the count stage takes today with the clause memo off is not known; it would need a run. The rewrite does not depend on it: bound the timing to climb batch 7C's measurement.
- F-74: the 24 cannot be re-measured without probe Q's devices on today's tree. The rewrite bounds them to that measurement.
- Outside the chunk, for the pass that rewrites these entries:
  - F-36 repeats F-67's wording on `bool`, `dim` and `unit`.
  - F-262 ("Walk's numeral is an `Int` (F-74)") and F-263 ("Under walk a numeral is a `ZZ32` value (F-74)") follow F-74's title.
  - F-87 points to F-70 for the checker's check of a written static argument, so its pointer must follow the split.
  - P-45 states the positional rule without its condition of equal counts.
