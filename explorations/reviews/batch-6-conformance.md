<!-- Conformance review of climb batch 6 (rung F d846e3644 with the merged-diff review's repair 21c91d8e4; rung T d9c415395; rung R d65892d34, landed by hand as a follow-up, with its records 7278e11f7), made on 2026-09-27 for the repair batch of PLAN phase 2b, in the form of reviews/batch-5-conformance.md with its four global questions; written by a review worker reading only, on main at ad313a0ed, nothing built or run, while batch 6b (rung O) ran in another worktree, which was not read. -->

# Climb batch 6 against the specification, the team's built intent, the design record and the plan

## Method

The method is the one of `explorations/reviews/batch-5-conformance.md`, which follows `rung-conformance-1-4.md` and `rung-conformance-5-8.md`. For each rung:
- `git show <hash>` first, then its `REPORT.md`, `record.md`, `JUDGE.md` and `SKEPTIC.md` (and rung T's `decision-record.md`), and the batch record (`explorations/coordinator/CLIMB-BATCH-6.md` with `climb-batch-6-review.md`; `explorations/compile-ladder/climb-batch-6/RECORD.md` with `JUDGE-review.md`);
- then the landed code and text as they stand on `main` at `ad313a0ed`;
- then the specification and the team's own code and drafts the rung touches.

Each rung is judged against three standards, kept apart:
1. the specification, `Specification/`, the July 2012 draft, with the later Types chapter (`Documentation/Specification/Prose/Language/types.tick`) cited beside it where it speaks (`explorations/coordinator/POSITIONS.md:83`);
2. the team's built intent: the library's own practice, the interpreter and the compiler as the team left them, their drafts;
3. the design record outside the specification (`explorations/coordinator/map/design-intent-sources.md`).

Then the four questions of the batch 5 review:
- Does a choice made inside the rung, not by Pavol, conflict with a later phase of `explorations/coordinator/PLAN.md`: the checker at a true zero (phase 3), the switch-over to one library (phase 4), microGPT's static types and the array design with unboxed `double[]` (phase 5), unboxed arithmetic (phase 6)?
- Is anything built twice, or built so that the switch-over or the array work must undo it?
- Did the rung solve its problem the way the library already solves the same family, or invent a local device?
- What did the rung leave in the ledger or its report that should have reached Pavol and did not?

A structural fact first. Most of batch 6 is Pavol's decisions carried out. F and T carry route A (`POSITIONS.md:69`), answers 6, 7 and 8 (`:106`, `:112`, `:107`), the three `Number`-typed big operators (`:113`), Q1 of batch 6 (`:118`) and the stop lifted at 23:59 UTC (`:119`). R carries answer 12 (`:110`) and a size's range (`:123`). So the review separates what he decided from what a rung, its judge, the gather or the batch record decided, and judges only the second.

Claims marked "by reading" were not run. Nothing was built and no program was run for this review. Measurements cited are the rungs' captures.

## The verdicts

- **Rung F, the flat tower: in the spirit.** It finishes, in the one library, the flat hierarchy the team began in 2009, with Pavol's coercion table edge by edge and the library's own devices. One subtyping between number types is left, `RR32` below `RR64`. It came from the batch record, not from F.
- **Rung T, the number chapters: in the spirit.** Every revised passage carries a decision of Pavol's or the library's own shape, in the S1 form, with the original quoted. One signature was widened by a mechanical rule and left a result the chapter does not give; the lifted stop covers it.
- **Rung R, a size the call cannot fix: in the spirit.** The edit is small and sits at the one place the checker drops an arm. What it found beyond its scope reached the handover and the ledger, not the plan.

## Rung F, `d846e3644` (with the review's repair `21c91d8e4`)

### What landed

- `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ` and `RR64` are siblings under `Number` (`Library/FortressLibrary.fsi:276`, `:286`, `:382`, `:428`, `:431`; `NN32` at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:82`). `RR64`, `QQ` and `Integral[\I\]` carry the order and algebra traits at their own type. `Number` declares `asFloat` and one numeric `=` (`.fsi:276-284`).
- Thirteen `coerce` declarations, each a pair of the record's table (`Library/FortressLibrary.fss:383`, `:548-552`, `:763-764`, `:847`, `:911-917`; api twins at `.fsi:290`, `:386-390`, `:474`, `:550-551`, `:597-600`).
- `SUM` and `PROD` generic over `AdditiveGroup[\T\]` and `MultiplicativeRing[\T\]`, their identity from a `() -> T` witness `typecase` over eight leaves (`.fss:3107-3178`; api `.fsi:1888-1899`). `BIG MAXN`, `BIG MINN`, `BIG MINMAXN` and their objects are gone.
- `QQ` is exact because a `Ratio`'s parts are `ZZ` and every integer converts on construction (decision D6).
- The approved C4 and APL lines; 11 library sites with a written static argument and about 15 with an explicit conversion (rung F `REPORT.md` section 8); 89 team-test lines respelled; `ProjectFortress/tests/FlatTowerRungF.fss` and three expected failures.
- The review's repair `21c91d8e4` changed no library line. It fixed rung T's negation entries (judged under T), re-anchored 177 citations in 25 older revival tests, and opened row 445 with `ProjectFortress/tests/XXXQQPowerExponent.fss`.

### Standard 1: the specification

- **The shape.** "These types are mutually exclusive; no value has more than one of them", and they "share the common supertype `Number`" (`Specification/basic/types-vals-vars.tex:536-539`). Instantiation exclusion (`:218-237`) is met by siblings that each carry their algebra at their own type. F has that shape for the seven types it names.
- **The one exception is `RR32`.** It stays `value object RR32 extends RR64` (`FortressBuiltin.fsi:47`), and `RR64` `comprises { Float, FloatLiteral, RR32 }` (`FortressLibrary.fsi:286-289`). An `RR32` value is then also an `RR64` value, which `:536` forbids. The later Types chapter keeps the same sentence (`types.tick:977-978`). This is the batch record's reading, not F's (finding 3).
- **The coercions.** A coercion does not chain (`Specification/basic/conversions-coercions.tex:144-149`), so each pair is declared on the wider type. The pairs are answer 8's (`POSITIONS.md:107`): the exact integer pairs, the integers into `QQ`, `ZZ32` into `RR64`, nothing lossy.
- **The rationals.** "Rational computations do not overflow" (`Specification/basic/operators/opr-overview.tex:156`). F makes that true (row 428). It compares two exact numbers of different types as rationals, as `Specification/basic-lib/numbers.tex:352-353` says.
- **Integer division.** "Dividing two integers using the / operator produces a rational number; this is true regardless of whether the integers are of type ℤ ... ℤ64 ... ℕ32" (`Specification/basic/expressions/literals.tex:151-156`). F's D3 makes `6/2` a `Ratio` (`REPORT.md` section 6). That is the specification's rule.
- **The reductions.** A sum over generators is `SUM[\N\]` over `SumReduction[\N\]` (`Specification/advanced/parallelism-locality/defining-generators.tex:147-157`), starting from the operator's identity on its type (`Specification/advanced-lib/algebraic-constraints.tex:794-797`). F builds that with answer 7's witness. The unwritten clause form, which the specification allows, now fails under walk; that is row 424, which answer 7 made later work.
- **Where the specification is silent, F says so.** The float half of `Number`'s `=` (row 434, D1) and `matrix(v)`'s numeral for unsigned elements (row 437) are home-3 rows.
- **Where the specification settles against the library, F says so too.** The integer `^` is declared `RR64` (row 438), which predates the batch. The repair round declined the judge's instruction to convert in the body, because "Exponentiation of an integer to a nonnegative integer power produces an integer result" (`Specification/basic-lib/basic-integers.tex:498`; `REPORT.md` section 2), and the second skeptic agreed (`SKEPTIC.md` section E). That is the right call.

### Standard 2: the team's built intent

The model is the team's flat compiler prelude: siblings under an empty `Number`, one `coerce` per pair on the wider type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:96-97`, `:103-108`, `:147-149`, `:430-435`). F follows it, with three differences:
- `IntLiteral` stays below `ZZ32` (`FortressBuiltin.fsi:117`), the one library's own shape. The prelude makes it a sibling that every integer type coerces from (`CompilerBuiltin.fsi:104`, `:148`, `:390`). Finding 2.
- `RR32` stays below `RR64`. The prelude makes it a sibling that `RR64` coerces from (`CompilerBuiltin.fsi:435`, `:475`). Finding 3.
- `Number` keeps `asFloat` (D2) and one `=` (D1). D1 keeps the base library's own declaration, `opr =(self, b:Number):Boolean` (the `Number` trait of `git show e5414f5bf:Library/FortressLibrary.fsi`), and changes its exact half. Without it the library's `=` over `(Any, Any)` would answer `3 = 3.0` with `false`, silently.

The rest is the interpreter library's own practice:
- the witness `typecase` is `array1`'s (`Library/FortressLibrary.fss:2342-2346`), as answer 7 prescribed;
- `asFloat` was already implemented on every leaf;
- the restated methods live once on `Integral[\I\]` (D5), where the library already shares integer methods;
- the base declared every number an `AdditiveGroup` and a `MultiplicativeRing` through `Number` (`e5414f5bf`, `.fsi:276-279`); F gives each leaf its own.

Three local devices, each named in the report:
- `exactValue` (`.fss:368-377`), a `typecase` over the leaves for D1's exact half;
- the two identity functions (`.fss:3107-3131`), which pass each branch value through `cast[\T\]`, the spelling the answer-7 judgement measured the checker accepting;
- D9, the Max/Min-Sum fusion pairs restated over `T` (`.fss:3138-3157`), which the checker refuses because `SumReduction`'s `T` does not meet `StandardMax[\T\]` (row 433). The judgement allowed dropping them. F kept them because `Generator2Test`'s maximum prefix sum takes the fused path (`Library/Generator2.fss:73`, `:168`). Defensible; it keeps a known refusal for phase 3.

The team's tests: 89 lines respelled, each keeping its checked value, which the skeptic checked against the old values. Two examples, by reading: `ReflectTest`'s join and meet of `ZZ32` with `RR64` became join and meet with `Number`, since `ZZ32` is no longer below `RR64`; `asifTest`'s `(3 asif RR64) + 17` became `(3.0 asif RR64) + 17`, since `asif` does not convert. Both still test what their files test.

The team's demos: 21 of the 24 with unwritten clause-form sums ran on the base, and all 21 fail on the flat library, 18 at row 424 (`explorations/compile-ladder/rung-flat-tower/probes/demos-count.txt`). They are not F's files and are not gated.

### Standard 3: the design record

- **The team meant this tower.** Chase cut the compiler prelude's subtyping on 2009-08-31: "ZZ32 is NOT a subtype of ZZ64, RR32 is NOT a subtype of RR64; this would be a good time to get coercion working" (`6896886fb`). Maessen's `128f313b5` (2009-11-17) says "expect more coercions to come on line as we gradually migrate to a flat numeric hierarchy". F carries that migration into the one library. Chase's commit puts `RR32` beside `RR64`, not below it.
- **Steele's retrospective** draws the hierarchy as `Number → {Integral → ZZ32, ZZ64, ZZ; Float → RR32, RR64}` (slide 38, `research/extracts/SteeleJuliaCon2016-extract.md:159-161`): the two floats are siblings.
- **The algebra is there for the reductions.** Associativity and identity are what license a reducer to split and reorder (`map/design-intent-sources.md:104`). A sum's identity is now the element type's own; the base gave `0 : Int` for an empty float sum.
- **Extensibility.** Slide 12 names "Rational, complex, and quaternion" (`SteeleJuliaCon2016-extract.md:50-51`). The leaves are now listed in `Number`'s and `AnyIntegral`'s `comprises` clauses, in the two identity functions and in `exactValue`, so a new number type is added in each. The specification's open road is its `HasIdentity` device once `where` clauses work (`algebraic-constraints.tex:772-797`), which Pavol was told (`POSITIONS.md:113`).

### The global questions

- **Later phases.**
  - Phase 3. The count is 62, not the predicted 44. F's `FortressLibrary` api keeps 19 errors: 18 of exclusion, at the comparisons, `Maybe` and `Condition`, and one `comprises` error. The flattened copy behind the prediction had conformed the comparisons and `Maybe` and dropped `AnyIntegral` from `Integral`; the batch record's F section asked for neither (FACTS, "The true distance to the switch-over"). Batch 7's rung H takes them. D4 keeps `AnyIntegral` among `Integral`'s supertypes, and with it the `comprises` error at `.fsi:431`, so that walk's overload check accepts C4's array operators; H takes that too. D9's six well-formedness reports (row 433) are in the component, which the count does not read. The full measurement will show them, and no plan line names the choice between a `where` clause and the drop.
  - Phase 4. Every identity passes through `cast[\T\]` (`.fss:3109-3130`). On the compiled path `cast[\T\]` never matches (row 426), and the one library's `cast` has the same body (`Library/FortressLibrary.fss:33-37`). The row and the batch record say "before the switch-over"; PLAN's phase 4 does not list it (`PLAN.md:74-81`). Finding 4.
  - Phase 4 again. The compiled prelude's `RR32` is a sibling; at the switch-over the compiled path takes the one library's subtype. Finding 3.
  - Phase 5. `Vector` and `Matrix` keep `T extends Number` (`.fsi:1526`, `:1644`), as Astra's check asked. Their generic bodies still have no evidence for their arithmetic; only the checker's message changed (`REPORT.md` section 13). An integer scalar with a float matrix or array (`m i`, `a + i`) ran on the nested tower and is refused under walk now (row 388). Batch 7 defers row 388 to batch 8. C4 has no such line.
  - Phase 6, by reading. With `RR32` below `RR64`, a value of static type `RR64` may be an `RR32` at run time, and dispatch then runs `RR32`'s operator, which answers an `RR32` (`FortressBuiltin.fss:272`, `opr +(self,b:RR64):RR32`). Unboxing by static type would compute in `double`. Finding 3.
- **Built twice.** No. The leaf list is written in four places, above.
- **The library's way.** Yes, but for the three local devices named, each with a reason on file.
- **What reached Pavol.** F's report lists 13 items for him (`REPORT.md` section 1). The handover's F paragraph carries the counts, the demos and the rows (`explorations/microgpt-run-c-handover.md:17`). PLAN carries D1 alone, under "Asked 2026-09-27" (`PLAN.md:131`). Row 388's consequence and D3 are in FACTS and the report, not in the handover. The Q1 lines are listed with before and after in `explorations/compile-ladder/rung-flat-tower/probes/test-lines.txt`, as Q1 asked.

### Verdict: in the spirit

It is the flat hierarchy the team began in 2009, carried into the one library with Pavol's coercions and the library's own devices, and every changed output is traced. What is not in the spirit is inherited from the batch record: `RR32` stays a subtype of `RR64`, against the specification, the later chapter, the team's 2009 commit and its prelude.

## Rung T, `d9c415395` (with the negation entries of `21c91d8e4`)

### What landed

- `Specification/basic-lib/numbers.tex:15-90`: ℚ holds the finite rationals, +∞, −∞ and 0/0; the seven types are siblings under `Number`; the coercions of F's table; every other conversion explicit, written `asFloat(x)`; a subset is tested at run time, with `check` and `check*` stated on ℝ64.
- The ℚ listing (`:92-214`) extends `Number` alone, with the five coercions. ℤ's listing (`basic-integers.tex:67-291`) extends `Number` and keeps its algebra.
- `numbers-advanced.tex` kept word for word, with a callout at its head (`:14-30`).
- Answer 7's note (`reductions.tex:27-44`), answer 8's interim rule (`basic-integers.tex:51-65`), the numeral coercion into ℝ64 in answer 8's words (`conversions-coercions.tex:64-88`), rational literals (`literals.tex:188-210`).
- Appendix I entries I.1.10 to I.1.16, each quoting its original from the Working Draft of February 2011.
- At the review's repair: ℤ's three negation entries give ℤ (`basic-integers.tex:373-378`, callout `:291`, `changes.tex:778`, `:787`, `:790`, the originals at `:841-850`).

### Standard 1: the specification

T is the specification's revision, so the question is whether it says what was decided, in the specification's own voice.

- **Answer 6.** The subtype lists are "rewritten as the library's run-time check methods" (`POSITIONS.md:106`). T states the two checks the library declares, on the type that declares them (`numbers.tex:51-65`). The fifteen sign checks and their integer twins leave and are quoted in Appendix I. The batch record named the other reading, keeping them retyped to return `Maybe`, and chose this one because a normative method neither path runs is a stop (`CLIMB-BATCH-6.md:28`).
- **"Make sure we clearly record the original design"** (`:106`). The advanced chapter is untouched below a callout that says why it is superseded and where the way back is: each flag a covariant static parameter, worklist item 12 and row 404 (`numbers-advanced.tex:14-30`).
- **Route A and answer 8.** Each pair is stated once (`numbers.tex:36-43`; `basic-integers.tex:16-37`). The judge ruled the numeral coercion into ℝ64 in answer 8's words, "from ℤ32, and from integer numerals", not "from the numerals ℤ32 holds", so Example 1 stands (`conversions-coercions.tex:158-159`; rung T `JUDGE.md` section 1.5). That reads the decision, not walk's representation of a numeral.
- **ℚ's value set.** T's one reading (decision record section 2): ℚ is the library's `Ratio`, which holds ±∞ and 0/0, as the operator chapter already says ("For rational results, division by zero produces 1/0", `opr-overview.tex:166`). The Working Draft withheld the field and the total order from the type that holds 0/0, and T follows it: ℚ is "neither totally ordered nor a field" (`numbers.tex:68-69`). The reading was put to Pavol as the one with most consequence (T `REPORT.md` section 9, item 6).
- **The exponent.** The Working Draft's `opr ^(self, power: ℕ): ℤ` became `opr ^(self, power: ℤ): ℤ` (`basic-integers.tex:495-496`), by the brief's rule that a refined type becomes the unrefined one (decision 4). ℕ carried the precondition. The signature now promises an integer for `2^(-1)`, which no integer is, and the entry still speaks of "a nonnegative integer power" (`:498`). T reported the gap without choosing, named it in Appendix I (`changes.tex:1036`) and listed it, the form of the lift (`POSITIONS.md:119`). Strictly, the lift covers a passage "left as it stands"; this one was changed by a rule and then left. The gap comes from the rule, not from a decision, and row 441 holds the three answers.
- **The negation entries.** Settled at ℤ by route A and the chapter's own listing (`JUDGE-review.md`, finding 2(c)). Right.

### Standard 2: the team's built intent

- **The library is the standard** (`POSITIONS.md:37`). ℚ is `Ratio`. The checks are `check` and `check_star` (`FortressLibrary.fsi:301-304`). The two `CMP` declarations became the library's one (decision 3).
- **The team's drafts went the other way.** The team's draft number api puts ℚ under ℝ and ℚ*, a field with `QQ_NE` as its multiplicative group, with seventeen checks (`Library/incomplete/basic/Fortress.Number.fsi:12-16`, `:64-79`). T sided with the built library, as Pavol's rule and answer 6 direct, and kept the draft design readable in Appendix I and in the superseded chapter.
- **One divergence inside the batch.** The library's `QQ` extends `AdditiveGroup[\QQ\]`, `MultiplicativeRing[\QQ\]`, `StandardPartialOrder[\QQ\]` and `StandardMinMax[\QQ\]` (`FortressLibrary.fsi:382-383`), which `SUM` and `PROD` over ℚ need. The chapter's ℚ extends `Number` alone (`numbers.tex:92-93`), because 0/0 and the infinities break the group laws (decision 2). The gather noted it and did not call it a mismatch (`compile-ladder/climb-batch-6/RECORD.md:87`). The team's library always declared such traits on types that break the laws (on the base, every number through `Number`), so F follows the library and T the mathematics. Nothing in the record says which of the two the specification should carry.
- **`RR32`.** T names no ℝ32, so the chapters state nothing false, and it reports the library's `RR32` against `types-vals-vars.tex:536` (T `REPORT.md` section 9, item 8).
- **One local device, argued.** The four method-entry originals are quoted as their `\Method` lines under a local `\RenewDocumentCommand` (decision 14), because the build refuses a bare `\Method` there (`rung-spec-numbers/probes/repair/method-test.txt`).

### Standard 3: the design record

- **The later Types chapter** keeps "mutually exclusive" and comments out the type aliases this chapter used (`types.tick:977-978`, `:1011-1036`). T's callout cites both.
- **The way back** is the later chapter's `covariant` modifier (`types.tick:320-339`), which Pavol asked to "try" and "resurrect" (`POSITIONS.md:106`). The callout points there.
- **The wind-down post** names conditional inheritance through `where` clauses among what the team wished it had explored (`map/design-intent-sources.md:57`). `RationalQuantity`, a trait that extends its own instantiations, belongs to that family. Keeping it word for word with its way back keeps that road open.
- **Implementation status in the text.** The team kept status in draft-only `\note`s. T's callouts, which print in every build under S1 (`POSITIONS.md:82`), state what walk and the compiled path's own library do (`reductions.tex:39-44`; `conversions-coercions.tex:84-88`). As batch 5 found for rung S, each becomes an edit when its row closes. Rows 424, 425 and 442 cite these passages.

### The global questions

- **Later phases.** Phase 3's promotion rule (batch 8) replaces the interim-rule callout (`basic-integers.tex:51-65`). At the switch-over the compiled path's "smaller library of its own" is gone, so the reductions callout's last sentences and the coercion callout's last sentence must change; rows 424, 425 and 442 point there. No conflict with phases 5 and 6.
- **Built twice.** Appendix I and the decision record both quote the originals. That is S1, Pavol's.
- **The library's way.** Yes, and rung S's form throughout.
- **What reached Pavol.** Four items, in the handover's T paragraph (`microgpt-run-c-handover.md:19`): ℚ holding ±∞ and 0/0; whether `QQ` should declare `check` and `check_star` now that it no longer inherits them from `RR64`; the negative integer power (row 441); a numeral above 2^53 under answer 8's "(exact)" (row 443). None is in PLAN. The lifted stop's listing is that handover line, which the lift asked for.
- **Owed tests.** Rows 440 and 443 each owe a home-2 `XXX` walk test, ruled by T's judge (`rung-spec-numbers/JUDGE.md` sections 1.5 and 1.8). No landed commit carries them, and no plan line or batch record names a rung for them.

### Verdict: in the spirit

Every revised passage carries a decision of Pavol's or the library's shape, in the team's layered form, with the original quoted and the superseded design kept whole with its way back. The exponent's widening is a rule's side effect, reported and not chosen. ℚ's algebra differs from the library's, and the gather saw it.

## Rung R, `d65892d34` (records `7278e11f7`)

### What landed

- In `Functionals.checkApplication`, a call is refused when an arm that failed only for an unknown size is more specific than every candidate, with rung N's message unchanged (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:249-259`, `:464-473`).
- One defaulted field on `NoContextError`, the candidate the arm would have been (`ProjectFortress/src/com/sun/fortress/exceptions/ApplicationError.scala:110-119`, `:156-164`).
- Three expected-failure compile tests, a guard test, row 448's expected failure, and the walk tests rows 416 and 418 owed, 418's restated to the ℕ32 range on Pavol's decision (`POSITIONS.md:123`).
- Landed by hand after the workflow dropped it, with the second skeptic's correction N made and a full gate on its tree (`compile-ladder/climb-batch-6/RECORD.md`, "Landed as a follow-up").

### Standard 1: the specification

- **Which arm the call means.** A declaration is applicable when the argument type is below its parameter type, static parameters inferred first (`Specification/basic/overloading.tex:170-175`). The call takes one that no other applicable declaration is more specific than (`:274-276`). So `ee[\nat n\](x: ZZ32)` is the arm for `ee(z)`, and R's D5, "more specific than every candidate", is the specification's wording. A call through a function value is dispatched the same way (`Specification/basic/functions.tex:38-40`, `:209-216`), and R reaches it.
- **What an unknown size then does.** The chapter assumes every static variable instantiated or inferred (`overloading.tex:137-138`). The inference chapter is a placeholder whose note asks "Do we want to forbid such cases where type inference infers BottomType for static parameters?" (`Specification/basic/inference.tex:24-25`). Answer 12 answers "forbid", for sizes. R implements exactly that at the static pick.
- **The dynamic form (D6, row 446).** For `a: Any` the static pick is `ee(x: Any)`, so the call is not refused, and at run time both paths send a `ZZ32` to the sized arm. The specification is silent there, since the chapter's assumption fails. R kept it as a decision for Pavol.
- **The open shape (D8).** An arm whose unknown size sits in its own parameter type, in a place the argument does not constrain, is still dropped (`Sk2ArrowDomain`), though it is applicable by contravariance (`types-vals-vars.tex:411-421`). The condition at `Functionals.scala:251` had no stated reason; the second skeptic found its cost. Row 400 stays open for that shape. Recording it rather than widening the condition is right: widening needs `moreSpecificCandidate` measured over a domain that holds a size variable.

### Standard 2: the team's built intent

- **The site.** Every application the checker resolves passes one method, and that is the one place a failed arm vanished (`Functionals.scala:449-457`). The batch record's evidence named `STypesUtil.isDynamicallyApplicable`; R showed by reading and by measurement that it only sees survivors (D1). The refusal uses the file's own two-line form (`:454-457`) and rung N's error object.
- **Types stay where the team left them.** The solver binds an unsolved type variable to `BOTTOM` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:524`, through `STypesUtil.scala:1937-1940`), the team's rule. R builds its candidate for sizes only (D3), since answer 12 is about sizes.
- **One observation, by reading, not in the record.** R's check sits under the team's comment "ensure that head is actually more specific" (`Functionals.scala:462`), which has no code: the sorted head of the candidates is still not checked to be the most specific. The Meet Rule at the declarations would make that check redundant; the 140 Meet Rule errors of the full measurement of 2026-09-26 (FACTS, "The true distance to the switch-over") say it is not redundant today. No row names it.

### Standard 3: the design record

- **Why types and sizes differ, by reading.** The type group's dispatch semipredicate infers each type parameter as the best lower bound of what the arguments constrain (`Papers/Welterweight/dispatch.tick:20`, `:83`, `:193`). A parameter nothing constrains gets the join of nothing, the bottom type, the run-time twin of the checker's `BOTTOM`. A size has no bottom. So the design record explains answer 12's split, and it does not decide row 446.
- **Types are never erased** (`map/design-intent-sources.md:114`). Row 447 is where the checker's `BOTTOM` meets that run time: the instance is named `java/lang/Object$RTTIc` and fails to load. So the judgement's premise, "A dead type parameter becomes bottom and can never be observed" (`explorations/reviews/overloading-judgement.md:213`), does not hold on the compiled path. Answer 12 rested partly on it, as R's judge says (`rung-unknown-size-arm/JUDGE.md` section 2). Answer 12 for sizes is not weakened; types now need the same question.
- **The later Types chapter** removes a static parameter that does not occur in a quantified type (`types.tick:764-767`). That supports removing the dead sizes (E3), which answer 12 put with the switch-over's design.

### The global questions

- **Later phases.** Phase 3 drops the sentence that would refuse `ee`'s pair at the declaration (answer 9, `POSITIONS.md:108`), so R's call-site refusal is the rule that remains; they fit. Rows 446 and 447 and row 400's open shape are soundness holes, not count errors, and batch 7's record does not name them. At the switch-over, compiled calls to the library's 25 dead-size declarations are refused under decision 3 with or without R (`overloading-judgement.md:215`); R changes nothing there. No conflict with phases 5 and 6.
- **Built twice.** No.
- **The library's way.** Yes.
- **What reached Pavol.** R's report lists nine items for him (`REPORT.md` section 13). The handover says three rows are "opened for Pavol" and names the notes on rows 79 and 21 (`microgpt-run-c-handover.md:21`). PLAN names none of them. The numeral split, which R's judge sent to Pavol as a conflict between the specification's reading and row 79's scoring, is only a ledger note.

### Verdict: in the spirit

The edit is the decision, at the right site, in the file's own form. Its limits are measured and recorded, and its judge and skeptics corrected two misreadings before it landed. What is not yet in the spirit is where its three open choices went.

## Findings that need Pavol

Each has what it would take to fix.

1. **The batch's open questions stopped at the handover and the ledger; PLAN holds one of them.** PLAN's "Asked 2026-09-27" has F's `=` on `Number` only (`PLAN.md:131`). Not in PLAN:
   - from T: ℚ holding ±∞ and 0/0; `QQ` without `check` and `check_star`; the result of a negative integer power (row 441); a numeral above 2^53 under "(exact)" (row 443);
   - from R: row 446's three candidates; row 447, whose finding also undoes the premise answer 12 used for types; the numeral split against row 79's scoring.
   - Fix: file each in PLAN in the order it is needed, the numeral split with finding 2 and rows 446 and 447 before the switch-over. The pending proposal that the gather file every item marked for him (branch `script-retry`, `PLAN.md:127`) would do this for later batches.
   - Cost: record edits.
2. **A numeral's run-time type has three models, and four items of this batch come from it.**
   - The specification gives a numeral a type of its own and lets the libraries define coercions from it (`Specification/basic/expressions/literals.tex:132-148`).
   - The compiled checker gives every integer numeral one type, `IntLiteral` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:466-467`), a sibling that each integer type of the prelude coerces from (`CompilerBuiltin.fsi:104`, `:390`).
   - Walk makes it a `ZZ32` (`FortressBuiltin.fsi:117`) and types it by width at run time (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`).
   - From this batch: row 432 (`SUM <|1, 2, 3|>` refused under walk), row 437 (`matrix(v)`'s `0` for unsigned elements), row 443 (a large numeral not converted into `RR64`), and the numeral split noted on row 79 (`ee(5)`: walk 1, compiled 2). Before it: row 79 itself, and the literal ∔ split of batch 5's review.
   - By reading: at the switch-over the compiled checker, which types every numeral as `IntLiteral`, reads a library in which `IntLiteral` is a `ZZ32`.
   - Fix: one question, answered before the switch-over through the clean list and a judgement, as protocol principle 2 asks for a fork.
   - Cost: one clean-list worker and one judgement; the build is then walk's `FIntLiteral.make` and the one library's `IntLiteral` declaration, sized by the answer.
3. **`RR32` is still a subtype of `RR64`.** It entered as the batch record's reading (`CLIMB-BATCH-6.md:26`; `climb-batch-6-review.md:15`), one of nine lines under "Read from the record, not asked"; no POSITIONS entry holds it.
   - Against it: the specification (`types-vals-vars.tex:536`), the later Types chapter (`types.tick:977-978`), Chase's `6896886fb` ("RR32 is NOT a subtype of RR64"), Steele's slide 38 (`Float → RR32, RR64`), the prelude (`CompilerBuiltin.fsi:435`) and answer 8's own rule, since every `RR32` value is exact in `RR64`.
   - It keeps row 435 alive. By reading, it gives an `RR64`-typed value an `RR32`'s arithmetic at run time, which unboxing by static type (phase 6) and a `double[]` store (phase 5) cannot follow.
   - Fix: `RR32` a sibling under `Number`, `RR64` coercing from it, `RR32`'s 32 binary natives retyped `b: RR32` (row 435's second fix), and one sentence in T's chapters naming ℝ32.
   - Cost: one small library rung with F's comparison. By a grep, `RR32` appears in six interpreter tests, one compiled or library test and no microGPT file. It belongs before the switch-over, which would otherwise replace the prelude's sibling with the subtype, and it bears on his open question of the element width (`POSITIONS.md:76`).
4. **Answer 7's identity on the compiled path is on the switch-over's path, and phase 4 does not list it.** Each identity branch passes through `cast[\T\]` (`Library/FortressLibrary.fss:3109-3130`), and on the compiled path `cast[\T\]` never matches (row 426); the one library's `cast` has the same body (`:33-37`). By reading, a compiled `SUM` or `PROD` throws there whenever its reduction asks for its identity, an empty one at least, and C4's bare `SUM e` and `SUM vm` go through this reduction.
   - Fix: name row 426 in PLAN's phase 4 or in phase 2b. The two ways on file are a compiled `typecase` on a static parameter that matches, and a checker refinement of the witness branch (`explorations/reviews/sum-replacement-judgement.md` section 7, check 3).
   - Cost: one rung, not sized; the row says the cause is not traced.

## Smaller findings, for the record

- Rows 440 and 443 owe home-2 `XXX` walk tests that no rung is named to write; Pavol's rule of 2026-09-19 asks for them (`POSITIONS.md:34`). They fit phase 2b.
- The rule the review's judge proposed, that a rung editing the specification re-anchors the test messages it moves (`compile-ladder/climb-batch-6/JUDGE-review.md:195`), is not in the workflow. Batch 7b's specification rung edits `overloading.tex`, which 4 test files cite 17 times by line (by a grep). Rung S's 13 stale references are still stale.
- ℚ's algebraic supertraits differ between the library (`AdditiveGroup`, `MultiplicativeRing`, the orders) and the chapter (`Number` alone). The gather saw it; the record does not say which the specification should carry.
- T's exponent widened from ℕ to ℤ by a rule, so ℤ's `^` now declares an integer result for a negative power (`basic-integers.tex:495-498`). Row 441 holds the three answers; answer 6's model, a run-time check, points at one of them.
- D9's restated fusion pairs are ill-formed to the checker (row 433). Phase 3's full measurement will count them; no plan line names the choice between a `where` clause and the drop.
- D3: `6/2` is `3 : Ratio` under walk now, which is the specification's rule (`literals.tex:151-156`). It is in FACTS, not in the handover's F paragraph.
- Row 424's repair, a reduction desugared by type as the specification describes, has no phase; answer 7 made it later work. 18 of the team's 21 running demos wait on it.
- Row 388's consequence: an integer scalar with a float array or matrix is refused under walk until batch 8, so the model's notation writes `2.0 m` where `2 m` ran (FACTS, "The one library's number tower is flat").
- T's callouts state implementation status that changes at the switch-over (`reductions.tex:39-44`, `conversions-coercions.tex:84-88`), as rung S's do. The rows point at them.
- The team's comment "ensure that head is actually more specific" (`Functionals.scala:462`) has no code and no row, by reading.
- Since F, the number leaves are listed in four places; a new number type is edited in each.

## What went right, globally

- Every decision of Pavol's reached its rung and was built as worded: the coercion table edge by edge, the two model lines together, the superseded chapter word for word, the static pick of answer 12, the ℕ32 range on row 418's test.
- Workers departed from a judge's instruction where the specification or the build settled against it, and said so: F kept the integer `^` bodies (`basic-integers.tex:498`); T quoted the `\Method` lines so that the quote check passes.
- The gather checked T's chapters against the landed library, as Pavol's rule for these chapters asks (`POSITIONS.md:86`), and the review's judge closed the one slip it found.
- F's comparison traced all 407 interpreter outputs, ran every reduction differential at one and four threads, and measured both microGPT checks once with both approved model lines.
- R's lost verdict was recovered by hand, its correction made, and the full gate run on its tree.

## What I did not do

- Built nothing, ran no program, edited no source, library, test, ledger or record file.
- Did not measure finding 3's consequence for unboxing, finding 2 at the switch-over, or finding 4's reach into compiled reductions. Each is stated as by reading.
- Did not read batch 6b or its worktree, and read batch 7's record only for the rows and items it names.
