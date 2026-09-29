<!-- The evidence map for the top-tier review Pavol asked for on 2026-09-29, of whether his decisions since 2026-09-16 finish or depart from what Fortress's designers intended, written that day by an Opus worker, reading only, for the Fable judge who reads it and then the primary sources it cites. -->

# Pavol's decisions since 2026-09-16: the evidence for the review

## How to read this

- Each entry has five parts: (1) what he decided, his words, what landed; (2) the designers' latest word; (3) the alternatives the record weighed; (4) what the decision set in motion; (5) the doubts on record.
- This is a map, not a verdict. Where the record itself reads a decision as finishing or departing, the entry says whose reading it is.
- The record is pinned at `be9a75b79` (main, 2026-09-29, 12:30 UTC). FACTS and PLAN are rewritten often; if a line has moved, search for the entry's title.
- Abbreviations:
  - POSITIONS = `explorations/coordinator/POSITIONS.md`; FACTS = `explorations/coordinator/FACTS.md`; PLAN = `explorations/coordinator/PLAN.md`; ledger = `explorations/fortress-gap-ledger.md`.
  - `reviews/` = `explorations/reviews/`; `ladder/` = `explorations/compile-ladder/`; `coordinator/` = `explorations/coordinator/`.
  - WD = `Specification-1.0-frozen/`, the unrevised Working Draft of 2011-02-02 (FACTS:143). Spec = `Specification/`, which the revival revises in place. Read WD for the designers' text.
  - Types = `Documentation/Specification/Prose/Language/types.tick`, Luchangco's unfinished 2012 restart (FACTS:145).
  - "Walk" is the interpreter; "the checker" is the compiled path's static type checker.

### Four facts about the standard itself

- The goal names "`Specification/`, the July 2012 draft" (POSITIONS:24; `CLAUDE.md`, Project goal). The team's last edit to that text is 2010-12-09. "July 19, 2012" is a label the revival chose when it built the PDF (`coordinator/spec-lineage.md:12-15`).
- The revival has revised Spec in place: 25 revision sections, plus "Passages not yet revised" and "Route C, the alternative not taken" (`Specification/appendices/changes.tex:61-1748`). So "judged by `Specification/`" now reads partly the revival's own text.
- The WD contradicts itself on the number tower. The types chapter says: "These types are mutually exclusive; no value has more than one of them" (WD `basic/types-vals-vars.tex:501-502`, over ℤ, ℕ, ℚ, ℝ and the fixed widths, `:506-516`; the same words in Types `:979-980`). The library chapters nest them: ℤ extends ℚ (WD `basic-lib/basic-integers.tex:195-196`) and ℚ is "a subtype of ℝ" (WD `basic-lib/numbers.tex:36-37`).
- His framing that where the designers left no word he makes a pragmatic call, accepting unfinished corners over type-theoretical purity, is in the brief of 2026-09-29. `grep -i 'pragmatic\|purity'` finds it nowhere in POSITIONS or POSITIONS-history at `be9a75b79`. The nearest words on record: "how a specialization is chosen 'ist mir egal', as long as it runs fast" (POSITIONS:60); "I cannot be trusted to derive a rule that wouldn't break the whole system" (POSITIONS:133); "super scared that we are touching type theoretical things that I am totally unequipped to handle" (POSITIONS:140).

## Part 1. The framework decisions

### F1. The goal and its measuring stick (2026-09-16)

1. "Finish what the designers intended, judged by the latest committed spec (`Specification/`, the July 2012 draft), not redesign the language; the measuring stick is one program, microGPT compiled to bytecode and running fast" (POSITIONS:24).
2. Not a design question. The spec's date is the revival's label (above).
3. None weighed; the goal is his own restatement.
4. Every entry below is measured against it. microGPT stopped at name resolution on the compiled path, all 18 components, when the plan was written on 2026-09-26 (PLAN:10); its own checker errors are 46 and 53, a floor, most of them its unsized array types (FACTS:62).
5. The goal's two halves meet in one place: the model's text is the notation the project exists for (POSITIONS:36), and the model's arrays are unsized in its types, so "nothing in microGPT ... passes the type checker, whatever the storage is" (`reviews/array-design-review.md:13`).

### F2. The library's own practice is the standard (2026-09-19)

1. "All the extensions that [microGPT] invented need to go directly to the standard library in the spirit of the standard library"; exclusion "is a practice that is all over the standard library"; whoever extends it "should study the existing parts of the Fortress library meticulously, and use those patterns" (POSITIONS:37). Reinforced 2026-09-24 after the diagonal: a fork names the library's own way first (POSITIONS:72); and 2026-09-25, a brief states the problem, not the answer (POSITIONS:73).
2. The map finds the library's practice and the spec in several places at odds (below, D4, D14, D23).
3. None put as options; it answered his open question of 2026-09-15, the revival's own tree or the sealed `Library/` (POSITIONS:23, :37).
4. It is the ground of D11, D15, D18 and D25's decision 2, each argued from the library's own device, and of the 2026-09-25 rule that a worker lists every way the library offers (POSITIONS:73).
5. It pulls against D4 and D23: the library's practice was the nested tower and generic ranges, and both were replaced by the compiler prelude's shape (Part 3, item 1).

### F3. The type group's later word outweighs the early spec (2026-09-23), and the Types chapter is cited beside the spec (2026-09-26)

1. "The specification was written in a vacuum early on", "as a wish"; "then the type group went in and tried to make it run ... The goal was performance. The specialization is a must"; "whatever the spec was dreaming about in 2008 is irrelevant because it met hard reality"; "this gives us strong weight on ... whatever Naden was thinking ... We are not Naden. We know nothing here." (POSITIONS:58). On 2026-09-26, asked whether the Types chapter is the designers' later word wherever it covers something: "Agreed." (POSITIONS:83).
2. The later texts:
   - `Papers/Types/` (OOPSLA 2011): the multiple instantiation exclusion rule (`Papers/Types/exclusion.tick:141-152`).
   - Naden's journal text (2012): the rule and its unresolved conflict with the numeric tower (`Papers/Types/journal/justificationOfRTR.tex:496-497`, `:568-632`).
   - Welterweight (2012, `Papers/Welterweight/`).
   - Types (2012-05-31): instantiation exclusion in two parts, the `covariant` modifier, `comprises` as coverage (`types.tick:322-339`, `:353-372`, `:384-389`).
   - The 2012 patents' forest rule and POPL 2019 (`reviews/mie-probes/patents-forest-rule.md`; `reviews/mie-probes/literature.md`).
3. None put as options; the premise was his (POSITIONS:58), and the lineage note's recommendation for the Types chapter (`coordinator/spec-lineage.md`).
4. It is the ground of D4, D12, D17, D21, D24, D27 and D28.
5. The exclusion brief found the premise does not rank the texts where it mattered most: "the interpreter and its library are the group's too, and they kept the nesting and refused the shortcut to the end"; "where Naden was driving" points two ways on one day; "the premise leaves a judgement, not a ranking" (`reviews/exclusion-design-brief.md:129-130`). Naden's own later word on the tower is that it is unsolved: "more work needs to be done in order to understand how to best support the numerical hierarchy" (`justificationOfRTR.tex:630-632`).

## Part 2. The decisions

### D1. One library, the interpreter's (2026-09-20 and 09-21)

1. Decided and landed.
   - "we need to unify this. into single library"; "I fully believe that the compiler second library is just a bootstrap and we need to get rid of it. [...] what would be a reason to re-implement the thing from, from the compiler?" (POSITIONS:40); "What decisions are there to make that we didn't already make?" (POSITIONS:45).
   - Meaning: `FortressLibrary` + `FortressBuiltin` become the library the compiler checks; nothing new goes into `CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`, which are deleted at the switch-over (POSITIONS:45).
   - Landed: the rule is in force; the switch-over is not built. Phase 4 is "Not yet designed as briefs" (PLAN:93). The way is measured by two gate stages: the checker count, 75, and the distance, 1.7K on 2026-09-27 down to 627 (FACTS:56, FACTS:71).
2. The designers' latest word.
   - The specification knows one default library, "chiefly `FortressLibrary` and `FortressBuiltin`" (WD `library/structure.tex:15-18`; `library/default-libraries.tex:15`).
   - The split's own comment: "Hopefully temporary hack as we work on importing java objects cleanly" (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:110-111`; Maessen, `c8d301411`, 2008-12-19).
   - The team called what it put there "bogus" (`ccccbe26f`, 2009) and grew the copy to the end; no source states a plan to end the split (`coordinator/two-libraries.md` § 1, "What no source says"; `coordinator/library-route-judgement.md:9`). The map: "None found for the split itself" (`coordinator/map/design-intent-sources.md`, row "Compiler prelude versus interpreter library").
   - Reading on record: one library finishes the spec's stated design; the team left no plan for how.
3. Alternatives: grow the copy (reaches no microGPT component, runs out at 38 files); one text with two binding components (a variant of the same destination); both at once (`coordinator/library-route-judgement.md:69`). He called it "not a question that's worth deliberating about alternatives" (POSITIONS:45).
4. What it set in motion. Every checker error on the interpreter's library became work on the path:
   - the `nat` checker (D20, batch 4 rung N, `3f297441c`);
   - the exclusion fork, since the checker refuses the nested tower (FACTS:46), which became route A (D4);
   - the overload sentence (D17), `fill` (D18), `AnyIntegral` (D24), the natives' result type (D23, decision 2), ranges (D23, decision 1);
   - the builtins: `import java` under walk is "wired and unfinished", so one binding file cannot serve both worlds; the variant is one text with a small builtin component per world, which makes ledger row 320's api-to-component link, re-approval row 41, live work (FACTS:157; PLAN:86);
   - the implicit bound: the compiler world's `extends Object` setting is the spec's (`coordinator/library-route-judgement.md:15`); D23's Q1 later chose `Any`.
5. Doubts on record.
   - Rung P's judge struck "keep the rule" (route A) because it "is refused by the decided library route" (`ladder/rung-exclusion-relax/JUDGE.md:36`). The exclusion brief put the reading to him as open question 3 (`reviews/exclusion-design-brief.md:150`); the batch-3 review later called the strike wrong ("rung P's stop right but its ruling struck an option", `reviews/batch-3-conformance.md`, per `coordinator/INDEX.md`).
   - Printing an object with no `asString` overflows the stack once the compiled path reads the one library; nothing in it narrows a number with a check after the prelude's `asZZ32` leaves (PLAN:89).
   - "Not settled by the evidence" list, still largely open (`coordinator/library-route-judgement.md:61`).

### D2. `nat` sizes and unboxed `double[]`, taken together (2026-09-19), and row 40 closed with no decision (2026-09-25)

1. Decided and landed.
   - "we must go to double array for performance. There is again no question about this. If this should have been high performance language, it cannot be boxed."; "I don't know [that] we can sidestep the nat issue. That is a central design point that they are using." (POSITIONS:38).
   - Row 40, the three array questions left at a worker's defaults: "close as no decision taken"; they return after the switch-over (POSITIONS:76).
   - Landed: the checker checks `nat` and `int` (batch 4 rung N, `3f297441c`; FACTS:72-73); a size has a run-time descriptor (D5). Storage is phase 5, unboxed arithmetic phase 6; nothing built (PLAN:95-104).
2. The designers' latest word.
   - Sizes live in types: `Vector[\T extends Number, nat s0\]`, `Matrix[\T extends Number, nat s0, nat s1\]` (`reviews/size-runtime-design-brief.md` § 5); "These parameters are instantiated at runtime with numeric values" (WD `basic/trait-parameters.tex:82`).
   - Unboxing: `compiler/optimization/Unbox.java:12-19` (case 1 primitives, case 3 unboxed fields) and the loader's empty expando stub (`InstantiatingClassloader.java:168-172`), cited by `reviews/array-design-review.md:35`.
   - `NatReflect.fss:38-40`: "Really this just proves that it can be done without extending the language. Having proven that, we ought to build it in" (checked at `ProjectFortress/LibraryBuiltin/NatReflect.fss:38-40`).
   - Reading on record: a designed intent never built on the compiled path.
3. Alternatives: the four questions of `coordinator/array-design.md`; the review's decisions A (a loader template per instantiation, the team's direction, against an element-type tag at run time, the revival roadmap's A2), B (where unboxing happens) and D (sizes in the model's own types) (`reviews/array-design-review.md:27-35`; POSITIONS:151).
4. What it set in motion.
   - Decision D: the model's unsized `Array[\RR64,ZZ32\]` meets sized library declarations (`reviews/array-design-review.md:13-25`); its diff, written 2026-09-27 and parked (`reviews/decision-d-diff.md`), no longer applies since `tabulate` and was written around the reading of item 25 he did not take (PLAN:82; `reviews/batch-7R-conformance.md:127`).
   - D5 (design B), D13 (sizes count in exclusion), D20 (unknown sizes), D22 (a size's range), D26 (item 25).
   - Open: item 15, arithmetic in a size, which the checker refuses and the library's own storage uses (PLAN:144); rows 446 and 447 (PLAN:171-172); the element width, `RR32` or `RR64`, asked by him and not answered (POSITIONS:76).
5. Doubts on record.
   - The array review's three decisive findings (`reviews/array-design-review.md:13`, `:27`, `:37`): the model never checks; a generic `vector[\T,s0\]()` cannot return a monomorphic `double[]` store through the library's own `typecase` selection (probes `p1`, `p1b`, `:29-31`); the design closed the library route by default.
   - "The checker refuses the library's own matrix storage" (`reviews/batch-3.5-4-conformance.md:275`).
   - With `RR32` below `RR64`, unboxing by static type would compute in `double` while dispatch runs `RR32`'s operator (`reviews/batch-6-conformance.md:91`); batch 6.5b's rung V makes `RR32` a sibling (PLAN:57).
   - No performance number is allowed to decide anything before microGPT runs compiled (POSITIONS:35).

### D3. The scalar-extension block and the `AnyIntegral` closure, approved as landed (2026-09-21)

1. "Others approved"; on the closure, after the exclusion trace: "We are writing NOT YET and ... whatever [the trace] recommends, let's do that." (POSITIONS:44). Landed at `02d09a39f` (2026-09-19): eight generic operators `+ - MIN MAX` over an array and a `T extends Number`, the `AnyAdditiveGroup` marker, `AnyIntegral comprises { ZZ }`, and `Array3 excludes` (FACTS:102; `reviews/library-scalar-extension-review.md:12-18`).
2. The team's drafted tower puts ℤ directly under ℚ (`Library/incomplete/basic/Fortress.Number.fsi:82`; `reviews/library-scalar-extension-review.md:253-256`). The team's comment on the closure: "not yet: comprises Integral[\I\] where [\I\]" (`Library/FortressLibrary.fsi:434`); Maessen, 2008-07-02: "we can't write a comprises clause that mentions Integral[\I\]" (`82c85b03a`).
3. The blinded review weighed each change against its alternatives (`reviews/library-scalar-extension-review.md` §§ "Change 1" to "Change 4"); the closure's checker accommodation was the alternative he parked (POSITIONS:44).
4. "The tower closure of `02d09a39f` has no spelling the compiler's checker accepts" (FACTS:67). The flattening rewrote the clause to list the five integer types (FACTS:116); the checker still refused it; D24 followed. The scalar block is also what blocks the library's own open-marker way for D24 under walk (`reviews/anyintegral-comprises-judgement.md` § 2, way 1, `:40`).
5. The blinded review lists what is wrong with each of the four changes (`reviews/library-scalar-extension-review.md` §§ "Change 1" to "Change 4"). Astra: the generic array bodies need stronger evidence than `Number` membership (`reviews/numeric-hierarchy-integration-review.md:5`); after the flattening, `Vector` and `Matrix` keep `T extends Number` with "no evidence for their arithmetic" (`reviews/batch-6-conformance.md:90`).

### D4. Route A: keep instantiation exclusion, flatten the number tower, teach walk coercion (2026-09-24)

1. Decided and landed.
   - "Agreed. Route A it is." (POSITIONS:69), on the premise of F3 and "without specialized code there will be no change at performance. But how a specialization is chosen 'ist mir egal', as long as it runs fast." (POSITIONS:60). His morning question (1) was answered with it: ℤ inside ℚ by coercion (POSITIONS:69).
   - Landed: walk converts by coercion (batch 4 rung C, `b628871a2`, FACTS:112); the spec states instantiation exclusion (batch 5 rung S, `3924e7ec3`, FACTS:146; the calculi, `eb2d7e1e6`); the tower is flat (batch 6 rung F, `d846e3644`, FACTS:116); the number chapters (rung T, `d9c415395`, FACTS:147); the last exclusion errors (batch 7 rung H, `952892a00`: "the checker reports no exclusion error on it", FACTS:46).
2. The designers' latest word.
   - For the rule: the Types paper (`Papers/Types/exclusion.tick:141-152`); in the checker since 2010-05-28 (`5a6b7913b`), `checkP` since 2010-07-26 (`e828b44b1`) (FACTS:46); Types, with a covariant form (`types.tick:353-360`); POPL 2019 keeps it (`reviews/mie-probes/literature.md`).
   - For a flat tower:
     - Chase, 2009-08-31: "ZZ32 is NOT a subtype of ZZ64, RR32 is NOT a subtype of RR64; this would be a good time to get coercion working" (`6896886fb`, message checked).
     - Maessen, 2009-11-17: "expect more coercions to come on line as we gradually migrate to a flat numeric hierarchy" (`128f313b5`, message checked).
     - Steele flattened the compiler prelude on 2011-07-15 and 07-22 (`reviews/exclusion-design-brief.md:49`); today it has `ZZ`, `ZZ64`, `ZZ32` and `RR64` as siblings under `Number` and no `QQ` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:96`, `:103`, `:147`, `:210`, `:433`).
     - Steele, 2016: Number → {Integral → ZZ32, ZZ64, ZZ; Float → RR32, RR64} (`research/extracts/SteeleJuliaCon2016-extract.md:159-160`).
     - WD and Types: "These types are mutually exclusive" (above).
   - Against a flat tower:
     - WD ℤ extends ℚ (`basic-lib/basic-integers.tex:195-196`), ℚ below ℝ (`basic-lib/numbers.tex:36-37`), and "trait declarations are allowed to extend other instantiations of themselves", with `Empty extends List[\T\]` (WD `basic/trait-parameters.tex:339-397`).
     - The interpreter's library kept the nesting to 2012 (`reviews/exclusion-design-brief.md:64`, `:129`); the team's draft tower puts ℤ under ℚ (D3).
     - Naden, 2012: "Fortress aims to support" the self-typed numeric hierarchy; "more work needs to be done" (`justificationOfRTR.tex:568-576`, `:630-632`).
     - The 2012 patents' forest rule keeps the tower (`reviews/mie-probes/patents-forest-rule.md`).
   - The brief's own reading: "There is no one intent to finish; there are two implemented halves and one unimplemented sketch." (`reviews/exclusion-design-brief.md:73`).
   - Where a coercion is chosen: the spec's resolution is static (WD `basic/conversions-coercions.tex:454-565`); walk now chooses on run-time values (FACTS:112).
3. Alternatives weighed.
   - Route B: drop the rule, instantiate at the call site (43 lines), enforce the overload sentence (179 library api pairs refused under the narrow reading, 335 under the wide one) (`reviews/exclusion-design-brief.md:95-105`).
   - Route C: the patents' forest rule; built whole as a shadow, 188 code lines in 5 files; "its soundness rule is ours, not theirs" (`reviews/exclusion-design-brief.md:107-116`, `:137`; FACTS:48).
   - A per-trait exemption (`reviews/multiple-instantiation-exclusion.md` § 8, route C there).
   - A hybrid, flat machine widths with ℤ ⊂ ℚ ⊂ ℝ kept as subtyping, named and not priced (`reviews/exclusion-design-brief.md:121`).
   - Remedy (ii), the 367 sites converted by hand instead of walk coercion (`:88`).
4. What it set in motion.
   - Walk coercion (batch 4 C), then the SUM and PROD replacement and the drop of `BIG MAXN` (D15), mixed widths and promotion (D16), which led to batch N's inference rule (D23, decision 3), the conversion rule (D25), and item 30 (D28).
   - Row 484 and each integer type's own `MIN`, `MAX`, `MINMAX` (D25, decision 2); `AnyIntegral` (D24); the exclusion remainder, where `TotalComparison` extends `Comparison` alone and `BIG MIN`/`BIG MAX` over total comparisons now stop walk (row 461, item 22, PLAN:149).
   - Row 330's stated reason fell (D6). The numeral switch became necessary (D21), and with it the `exactValue` hazard (D25).
   - On the flat library: `Number`'s `=` is not transitive, `1/3 = asFloat(1/3)` is true (row 434, FACTS:116); an integer scalar meeting a float array was refused under walk (row 388) until batch N (FACTS:116, FACTS:122); 89 team test lines respelled (`reviews/batch-6-conformance.md:73`); 21 of the team's 24 demos with an unwritten clause-form sum fail, 18 at row 424, not gated (`reviews/batch-6-conformance.md:75`).
   - The count was predicted 103 → 22 and measured 62 after rung F (`reviews/batch-6-conformance.md:87`).
5. Doubts on record.
   - The rung P judge's strike (D1, doubts).
   - The brief's five open questions, notably "Does he accept the interpreter choosing coercions at run time, a recorded divergence from the specification's static rule" and whether ℤ ⊂ ℚ ⊂ ℝ64 as subtyping must be stated (`reviews/exclusion-design-brief.md:148-152`).
   - "Route A's price is wider than the example it was put to him with": walk dispatches plainly where the compiled run and the spec convert, with no multiple inheritance needed (`ladder/rung-interp-coercion/REPORT.md:154`; gated as `ProjectFortress/tests/XXXCoercionStaticNarrowRungC.fss`). Parked, not answered (PLAN:222; item 16, PLAN:145).
   - The route-A notes (the brief, `price-keep-the-rule.md`, the ground note) cite ℤ ⊂ ℚ ⊂ ℝ as what the spec states as subtyping (`reviews/exclusion-design-brief.md:38`) and not the WD's "mutually exclusive" sentence; the flattening note of 2026-09-26 cites both (`reviews/flattening-questions-ways.md:181`, `:454`).
   - Astra's review of route A: acceptance obligations for generic bodies, coercion at generic call sites and typed identities, "not a proposal to reopen the exclusion decision" (`reviews/numeric-hierarchy-integration-review.md:5`).

### D5. Design B for a size at run time, with the factory (2026-09-24 and 09-26)

1. "B it is."; "of course, let's extend the runtime object with a new field for the size" (POSITIONS:70); "Agreed, (b) factory" (POSITIONS:98). On unifying operators with the descriptor kinds: "I don't see a need" (POSITIONS:70). Landed: batch 5 rung Z, `e893a3e00` (FACTS:114).
2. The designers' latest word. "Intent does not choose" (`reviews/size-runtime-design-brief.md:299`): design A is the team's operator path (Chase, 2011-12 to 2012-01); B fills the slot the code generator already counts (`CodeGen.java:5317-5328`, brief § 4) and is what the interpreter does (`IntNat.java`, 2007). Chase's comment where both stopped: "Non-type args will be somewhat problematic at first" (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1213`). The factory is the team's instantiation pattern (`InstantiatingClassloader.java:2744-2752`, FACTS:114). So a gap filled by his call.
3. Alternatives: A (28 lines built, 70-90 unbuilt, and as built it runs the catch-all for a size-generic arm); B with loader-made holder classes; B with the factory (`reviews/size-runtime-design-brief.md:370-395`).
4. Sizes count in the exclusion rule (D13, row 402 fixed by rung Z). A size read as a value becomes the `IntLiteral` of its numeral and reads back at any magnitude (FACTS:114), which led to a size's range (D22) and item 25 (D26). Walk reads sizes of 2^31 and more as signed (row 418).
5. The batch-5 review: "Design B and the factory are Pavol's. Z built them from the team's own factory ... What is not in the spirit is where its findings went": three defects on the path of phases 4 to 6 stayed rows (`reviews/batch-5-conformance.md:241`).

### D6. Rows 329 and 330: rounding (2026-09-21)

Row 330, `floor`, `ceiling`, `round`, `truncate` and the brackets on floats.
1. "Decided by Pavol for the specification's rule — all of them return the unbounded ℤ"; "we are not going to ZZ64"; his reason: "ℤ sits under ℚ under ℝ64 in the tower, so an integer result goes back into float arithmetic by promotion" (POSITIONS:47). Not built: a library rung after the switch-over (POSITIONS:47; `coordinator/CLIMB-BATCH-3.md:23`).
2. WD `basic-lib/numbers.tex:457-462`, all ℤ (checked), stated in the ℚ section; the float types have no chapter (ledger row 329). The team had commented out `ceiling(self):RR64` in its prelude (ledger row 330).
3. The float result, landed by batch 1's rung F (`b70ed4590`) and first kept as a default he later reversed (`coordinator/postmortem-2026-09-19/decisions-for-reapproval.md:24`, `:32`, `:68`).
4. After D4 and D16, `ZZ` reaches `RR64` only by an explicit `asFloat`: "An integer result that goes back into float arithmetic now does so by `asFloat`, not by promotion" (ledger row 330, last note; `coordinator/CLIMB-BATCH-6.md:116`).
5. His stated reason no longer holds on the flat library. The exclusion brief said "row 330's rationale is restated on coercion with its decision unchanged" (`reviews/exclusion-design-brief.md:140`); D16 then made that coercion explicit. POSITIONS:47 still carries the old reason, and no later POSITIONS entry revisits row 330.

Row 329, `round` on an exact half.
1. "Agreed" to half to even on both paths, with the history first (POSITIONS:48). Built: batch 3 rung R, `9782955b1` (FACTS:105).
2. WD `basic-lib/numbers.tex:470-472` (checked; stated of ℚ); Steele's own ℚ body (`Library/FortressLibrary.fss:589`, per ledger row 329); IEEE's default. The history found the float `round` written last, with no reason given (`ladder/rung-rr64-functions/round-history.md`). Reading on record: finishing.
3. Walk's half up, `Math.round`, as it stood, against the compiled path's rule since batch 1 (ledger row 329).
4. Row 360: a numeral within half an ulp of a tie rounds as its nearest double on both paths, parked with three options (PLAN:221).
5. None recorded against the rule itself.

### D7. Rows 333, 334 and 346: the zero guards, `GCD`/`LCM`, `narrow` (2026-09-22)

1. Each "approved as recommended" (POSITIONS:54-56); the signed `narrow` truncates too (POSITIONS:59). Built: batch 3.5 rung B, `ce0c7f453` (333, 346), rung I, `d6faad28f` (334); the spec states them since batch 6.5 rung P, `581356f32` (FACTS:151).
2. The designers' latest word.
   - Row 333: `|0|` is 0 and `0 DIV -1` is 0 by WD `basic-lib/basic-integers.tex:628-631`, `:438-442` (ledger row 333). A plain defect; finishing.
   - Row 334: "The result is always nonnegative" (WD `basic-integers.tex:524`, `:528`) and "For integer results, overflow throws an `IntegerOverflow`" (WD `basic/operators/opr-overview.tex:154-155`, checked). Finishing.
   - Row 346: the spec is silent on `narrow`; Steele's boundary test asserts truncation (`ProjectFortress/tests/UnsignedTest.fss:210-211`, 2008-07-21); the general overflow sentence and the compiler prelude's convention that a plainly named member overflows point the other way (ledger row 346). His call, following a team test.
3. For row 346, throwing on both paths, rung W's reading of the compiler prelude's convention (ledger row 346); for rows 333 and 334, none.
4. Item 31, `widen` of a `ZZ` too large for `ZZ64` (PLAN:177, row 502); `NN64` has no checked narrowing to `NN32` on the compiled path (FACTS:107).
5. The spec now says a `GCD` or `LCM` too large for `NN32` or `NN64` throws; neither path does yet (`reviews/batch-6.5-review.md`, For Pavol; batch 6.5b's rung E). `GCD` and `LCM` are named idempotent, true only on the naturals now (row 501, PLAN:264).

### D8. Row 335, `LSHIFT`/`RSHIFT`, and the JVM principle (2026-09-22)

1. The principle: "we should use Java or JVM defaults where it makes sense, but we shouldn't be shy to correct the mistakes of JVM when seen through the lens of high performance and mathematical precision language"; "high performance languages should give you tools to stay close to the metal ... Swift and Rust type of reasoning" (POSITIONS:52). Row 335, the second decision of the day, after "if every other language does something else, that's the clearest red flag to stop and pause and reconsider": the fixed widths shift with the smart-shift rule, and the spec's `shift` is exact on ℤ (POSITIONS:53). Built on both paths by batch 3.5 (FACTS:107-108); in the spec by rung P (FACTS:151).
2. No chapter names `LSHIFT` or `RSHIFT` (ledger row 335). The spec's `shift` is exact on ℤ (WD `basic-lib/basic-integers.tex:702-709`). Saturation at the width is pinned by the team's own tests since 2007 (`tests/BitTwiddle.fss:33-39`, `UnsignedTest.fss:30-137`, `QuickCheckTest.fss:97-103`); the reversal on a negative count is "pinned by nothing today" (`coordinator/POSITIONS-history.md:76`). A gap filled by his call.
3. His first reading the same day, an overflow error on any lost bit plus a wrapping shift (replaced, `POSITIONS-history.md:76`); Java's masking, rung N's first build (ledger row 335).
4. D10; row 386; row 500, three `shift` properties in the integer chapter wrong or garbled (PLAN:260).
5. The spec lagged these rules until rung P (`reviews/batch-3.5-4-conformance.md:282`).

### D9. Row 379 and answer 5: walk raises `IntegerOverflow` on the fixed widths, the unsigned ones too (2026-09-24 and 09-26)

1. "Agreed with the recommendation" (POSITIONS:65); "Agreed, option 1" for `NN32` and `NN64` (POSITIONS:99). Built: batch 6b rung O, `917bb7b32` (FACTS:117); the unsigned natives and nine more in batch 6.5b's rung E, running (PLAN:57; `reviews/batch-6b-7-conformance.md:14`).
2. WD `basic/operators/opr-overview.tex:154-155` (checked) and `:195-196`; Steele's 2012 rewrite keeps both paragraphs (`Documentation/Specification/Prose/Language/Operators/operator-overview.tick:154-155`, `91e71e62e`). The interpreter's wrap was a known gap: "we do not yet perform arithmetic range checks" (Maessen, `27521c0c4`, 2007) (`reviews/wrap-dependent-code.md:111-113`). Finishing.
3. Keeping walk wrapping: "Not an option" (`reviews/wrap-dependent-code.md:180`).
4. Rung O could not land alone, since library bodies and five team tests rely on the wrap (FACTS:113), which forced D11. Three range bodies now raise at the integer bounds (rows 450, 451), repaired in 6.5b's rung E.
5. The team's `intPrim`/`longPrim` assertions were written "to make sure overflow/underflow is happening like it should" (Spiegel, `f637064e3`, 2008), pinning the gap's behaviour (`reviews/wrap-dependent-code.md:128`); they were respelled with the wrapping operators.

### D10. Rows 380, 381 and 383: shift counts of any width, and `shift` at the switch-over (2026-09-24)

1. "yes" (POSITIONS:66); "yes, close at the switch-over" (POSITIONS:67). Built: row 380 by batch 4 rung K, `57600bc27`; rows 381 and 383 wait for the switch-over, gated by `XXXShiftDeclRungI` (FACTS:108).
2. The library's own contract, `Integral[\I\]`'s `LSHIFT(self, b: AnyIntegral)` (`Library/FortressLibrary.fsi:431-432`); the spec's `shift` (WD `basic-integers.tex:702-709`) and its reserved-name rule (WD `basic/declarations.tex:454-456`, per ledger row 383). Finishing.
3. For row 381, a compiler prelude declaration now, which his rule of 2026-09-21 forbids (POSITIONS:45, :67).
4. `shift` becomes a reserved name on the compiled path at the switch-over, which must measure which compiler tests bind it (POSITIONS:67).
5. Until the switch-over the two paths answer differently for a `ZZ32` shifted by a `ZZ64` count (ledger row 381).

### D11. The wrapping operators ∔ ∸ ⨰ (2026-09-26)

1. "Note from O looks solid to me. Don't see any credible alternative, so unless you do let's put that on the record." (POSITIONS:81). It also decides row 348 for the spec's spelling. Built: batch 5 rung D, `ab914b6e0` (FACTS:115); then rung O (D9).
2. WD `opr-overview.tex:172-176`, `:205-209`; kept by Steele in 2012; the team's 2007 draft api made ℤ a ring under them (`Library/incomplete/basic/Fortress.Number.fsi:87-89`); Steele's first implementation, 2011-09-08, `9ce7d8189`, in the compiler prelude with the spellings reversed; never in the interpreter's library (`reviews/wrap-dependent-code.md:115-122`). Finishing.
3. Restructure every site with no new operator; add the saturating family too; the three bit masks by sign cases (`reviews/wrap-dependent-code.md:165-182`).
4. At the switch-over, 10 compiled test files, 138 lines, are respelled from the prelude's reversed spellings (`reviews/wrap-dependent-code.md:171`). The saturating family "waits for a step of its own" (POSITIONS:81) and no PLAN line holds it. Every expression is fully parenthesised, since the operators' precedence is stated only among themselves (POSITIONS:81).
5. `LinearCongruential` is right only because 2^48 divides 2^64 (`reviews/wrap-dependent-code.md:156`).

### D12. How the specification shows a change: the requirement, S1, S2, the calculi, answers 1 and 3 (2026-09-24 and 09-26)

1. "our plan needs to update the spec with the change that we do and somehow properly record why we decided that way ... preserve the original historic record ... and preserve the option to go the route C" (POSITIONS:63); "S1 — 1, teams' way." (POSITIONS:82); "S2 yes, take the verdicts for rung S" (POSITIONS:84); the calculi, "Agreed." (POSITIONS:116); answer 1, "Option 1, agreed." (POSITIONS:95); answer 3, "Option 2, agreed." (POSITIONS:97). Built: rung S, `3924e7ec3`, and `eb2d7e1e6` (FACTS:146); every later spec rung.
2. The layered form the team used for 1.0 and its 2009 draft (`reviews/spec-change-form.md`); "the specification's own change machinery is unused" (FACTS:143).
3. 22 ways (`reviews/spec-change-form.md`).
4. 25 revision sections in Appendix I (`Specification/appendices/changes.tex:61-1748`). Item 23: the appendix's introduction says every change follows route A, which answers 9 and 10 do not (PLAN:151). Item 14: a sentence rung S wrote refuses more than the rule; he wants a plain explainer first (PLAN:143).
5. Status sentences about the implementations now print in the release build, "a small departure" (`reviews/batch-5-conformance.md:149`). Batch N's inference chapter says it states "the rule that the checker builds, and no more" while four gated rows depart from it (`reviews/batch-N-review.md:8`).

### D13. Answer 2: every static argument but operators counts in the exclusion rule (2026-09-26)

1. "Option 1, sizes count." (POSITIONS:96). Built: rung S's text and rung Z's checker fix for row 402 (FACTS:114).
2. Types: two instantiations exclude "if the corresponding arguments for any non-covariant parameter are not type equivalent" (`types.tick:355-360`, checked); the team's `TypeAnalyzer.scala` comment "Todo: Handle int, nat, bool args" (ledger row 406). Finishing.
3. Leaving sizes and booleans out of the rule (PLAN:113).
4. Row 402 fixed by rung Z (FACTS:114).
5. Row 406: the checker still compares no boolean arguments, and code generation stops on them, "Only emitting RTTI for types right now" (ledger row 406).

### D14. Answer 6: the sign-refined number types become run-time checks (2026-09-26)

1. "Option 1, agreed.", with "make sure we clearly record the original design", and when covariance lands, "try this", "resurrect this" (POSITIONS:106). Built: rung T, `d9c415395`; `advanced-lib/numbers-advanced.tex` kept word for word as a superseded design (FACTS:147).
2. The designs: `RationalQuantity` with boolean flags (WD `advanced-lib/numbers-advanced.tex:15-27`), one operator ending "needs more work here" (`:364`); the basic chapters' subtype lists (WD `basic-lib/numbers.tex:36-91`; `basic-integers.tex:28-66`). Against them: "mutually exclusive" (above), the rule, Types commenting out type aliases (`types.tick:1011-1036`), and a library that never had them (`reviews/flattening-questions-ways.md:692-706`). The note calls it "the clearest 'wish met reality' case" (`:736`).
3. Six ways, among them covariant phantom parameters (way 2) and coercion between siblings (way 3) (`reviews/flattening-questions-ways.md:743-770`).
4. The check methods return `Maybe` where the spec said `CastError` (`:745`); whether `QQ` declares `check` and `check_star` (PLAN:218). His condition to resurrect the design rests on covariance (row 404, worklist item 12), which no PLAN phase carries.
5. The covariant probe: the compiled class does not implement the covariant supertype and dies with `IncompatibleClassChangeError`; walk has no covariance (`reviews/flattening-questions-ways.md:665-667`).

### D15. Answer 7: `SUM` and `PROD` generic with the identity from the static argument; `BIG MAXN`, `BIG MINN`, `BIG MINMAXN` dropped (2026-09-26)

1. "Agreed, option A"; the two model lines were shown as diffs and approved together: `MicroGptFlat.fss:43` becomes `SUM[\ZZ32\][j <- 0#i] matCount(j)` and `:28`'s `BIG MAX[t <- z] t` becomes `BIG MAX z` (POSITIONS:112). On the three big operators: "I don't trust your judgement at all on this. I want to hear what fresh Fable has to say on this."; then "I accept the recommendation" (POSITIONS:113). Built: rung F, `d846e3644` (FACTS:116; FACTS:63-64).
2. The designers' latest word.
   - The spec's identity design, `Identity[\+\]` and `HasIdentity` (WD `advanced-lib/algebraic-constraints.tex:772-797`), needs `where` clauses and operator parameters, unsupported on both paths (`reviews/sum-replacement-judgement.md:245-251`).
   - The library's own device for choosing by a static argument, the witness `typecase` of `array1` (`reviews/batch-6-conformance.md:63`).
   - The catch-all it replaces is commented by the team as a "Hack to permit any Number to work non-parametrically" (`reviews/exclusion-design-brief.md:48`).
   - Reading on record: the library's device now, the spec's design later.
3. Options B to E (`reviews/sum-replacement-judgement.md:215-251`); alternatives 1 to 4, among them keeping the three operators with each type's least and greatest element (`:369-387`).
4. Written static arguments at clause-form sums (32 test lines, 11 library sites). Rows 424 (walk fails an unwritten one), 432 (`SUM <|1, 2, 3|>` refused under walk), 426 (the compiled `cast` never matched, closed by 6.5 rung G, `fd5cb4864`, FACTS:119). Rows 472 and 473 (`BIG MAX`, `BIG MINMAX` stop walk) (PLAN:239). One ledger note for `HasIdentity` (POSITIONS:113).
5. Astra, before the judgement: "No listed option is yet demonstrated to meet all four requirements" (`reviews/sum-replacement-verdict.md:5`). Extensibility: the leaf list is written in four places, so a new number type is added in each (`reviews/batch-6-conformance.md:82`).

### D16. Answer 8: mixed widths by coercion, with promotion (2026-09-26)

1. "Option 1, agreed." (POSITIONS:107): each wider integer type coerces from each narrower one; `ZZ32` and integer literals coerce into `RR64`; `ZZ64` into `RR64` stays explicit, by his 2026-09-22 rule; a generic call over mixed widths infers the narrowest type both sides coerce into; `widens` deferred. Built: the coercion table in rung F (FACTS:116); promotion by batch N rungs I and K (FACTS:79, FACTS:122); spec sections "Integers in floating-point expressions" (`Specification/appendices/changes.tex:968`) and the inference chapter (FACTS:152).
2. The designers' latest word.
   - "Fortress supports the automatic conversion of integer values to floating-point values" (WD `basic/conversions-coercions.tex:64-66`, checked), a general sentence; answer 8 keeps the exact cases only.
   - Coercion is not chained and is resolved statically, bottom-up, with the spec's `ZZ32`/`ZZ64`/`ZZ128` example (WD `conversions-coercions.tex:127-130`, `:454-565`); `widens` (`:762-906`); "Widening and where clauses are not yet supported" (`:15`).
   - The compiler prelude declares every exact integer pair and no integer-to-float coercion (`reviews/flattening-questions-ways.md:489-502`).
   - Static-argument inference: none. WD `basic/inference.tex` is a 27-line stub, Types' `type-inference.tick` is 12 lines (FACTS:148). Promotion is Julia's rule (`reviews/flattening-questions-ways.md:557`, `:599`).
   - Reading: coercion is the designers' mechanism; explicit `ZZ64`→`RR64` narrows the WD's general sentence; promotion fills a gap.
3. Widening; explicit conversions only; the union, promotion or written static arguments; three choices for ranges (`reviews/flattening-questions-ways.md:584-609`).
4. Row 146 fixed (a `ZZ64` bound to a numeral now holds 64 bits). Row 330 (D6). Promotion led to batch N (D23), the conversion rule (D25) and item 30 (D28). `ZZ32` with `NN32` gives `ZZ64` on the one library and `ZZ` on the prelude (PLAN:270, PLAN:299). Row 509: walk promotes from run-time types, so where a static type is wider than its value the paths run different instances (PLAN:251). Row 511: varargs and tuple parameters not promoted (PLAN:287).
5. Row 443: whether "(exact)" excludes a numeral above 2^53 (PLAN:218). The promotion's reach to user coercions: "the body sees a different value, not a narrower number instance" (PLAN:277).

### D17. Answer 9: the overload sentence goes (2026-09-26)

1. "Yes, agreed", then "Agreed, the judgement's recommendation." (POSITIONS:108). Built in part: batch N's rung I ranks on declared, quantified domains (FACTS:79). The specification, checker, walk and library rungs are batch 7b, not yet run (PLAN:70).
2. The designers' latest word.
   - The sentence: "it is an error for their static parameters to differ ... Hence, static parameters do not enter into the determination of which declarations are applicable" (WD `basic/overloading.tex:100-107`, checked); 2009 text (`reviews/overloading-judgement.md:59`).
   - The team's own doubt beside it: "Relaxing restrictions on static parameters of overloaded functionals", with Jan's `array1` pair (WD `appendices/future.tex:236-266`, checked).
   - The 2011 paper's model (`Papers/Types/introduction.tick:326-331`, `rules.tick:158-180`); walk since 2007 (Chase, `3e05c3424`); the restart drops the sentence (`reviews/overloading-judgement.md:59`).
   - The positional rule is the revival's: "one rule the paper does not state", Java's overriding rule (`reviews/overloading-judgement.md:85`).
   - Reading on record: finishing the later word, plus one rule of the revival's.
3. Teach the checker the missing reasoning step; enforce the sentence; make walk the standard; a declaration-form fixing rule (`reviews/overloading-judgement.md:64-68`).
4. What it set in motion.
   - Generic beside plain stays legal, which made row 496 and item 30 (D28).
   - Q4 and row 499 became item 32, the domain condition, which would refuse the library's three value-form array factories (PLAN:167).
   - Batch 7b's rung S rewrites the overloading chapters, so item 26 (D27) had to be decided before 7b (`reviews/batch-7C-review.md:9`).
   - Defect 3, code generation for two generic arms, goes to phase 5.
   - The judgement's section 10 raised the implicit bound, which became D23's Q1 (`reviews/overloading-judgement.md:277`).
5. Naden's run-time instantiation restricted by the return type is "the type group's fuller answer ... implemented on neither path" (`reviews/overloading-judgement.md:88`). The 175 tower-shaped errors were attributed "by reading" (`:56`). Item 32 is open.

### D18. Answer 10: `fill` takes a value, `tabulate` a function (2026-09-26)

1. "Agreed, tabulate." (POSITIONS:109). Built: batch 7 rung A, `f3b62bc83` (FACTS:137).
2. The spec's arrays figure has both `fill` forms; its paragraph says they are defined in terms of `init` (WD `advanced/parallelism-locality/arrays-distributed.tex`, `:71` in Spec, PLAN:237). Where the library derived a name it put it on the function form (`ivmap` beside `map`, Steele's `fill2` beside `fill`), and the checker is right to refuse the pair for an unbounded element type (`reviews/overloading-judgement.md:20`, `:145-151`). A revival rename of a spec name, argued from the team's naming.
3. Rename the value form; keep only the function form; bound the element type, which "rests on the arrow-outside-`Object` rule the later Types chapter reversed" (`reviews/overloading-judgement.md:135-143`).
4. 32 demo lines respelled beyond the brief; `ProjectFortress/demos/mg.fss:20` now fails at that line (row 464, PLAN:236); decision D's diff no longer applies (PLAN:82).
5. His to confirm: the meet placement against the four leaf traits the words named (PLAN:234); the factory names `tabulatedArray1` and siblings (PLAN:235).

### D19. Answer 11: the checker count as the measure (2026-09-26)

1. "Agreed, option 1" (POSITIONS:111), his yes to `a2b4809a5`, which had none. Built: the count stage (FACTS:71) and the distance stage (FACTS:56).
2. Not a question of the language.
3. Making the count red on its own; replacing it by the full distance (PLAN:128).
4. The distance stage entered every gate, reported and never red (FACTS:56); phase 3's batches are measured by it (PLAN:61).
5. Row 488: the checker's errors on the library move with what it checked earlier in the same run (`reviews/row-488-probe.md`). `classify.py` names classes by hard-coded line ranges (PLAN:283). "Zero is necessary for the switch-over, not sufficient" (`reviews/numerics-plan-synthesis.md:18`).

### D20. Answer 12 and the `nat` plan's decision one: sizes the checker cannot infer (2026-09-21 and 09-26)

1. "the middle is a clear winner" (an unknown size is an error only when it reaches a type, a name or a value) (POSITIONS:46); "Agreed, decision 3 stands." (a size the call cannot fix is an error at that call, overload sets included) (POSITIONS:110). Built: rung N (FACTS:72); rung R, `d65892d34` and `7278e11f7` (FACTS:75). The dead sizes' diff (E3) and row 41 wait for the switch-over's design (POSITIONS:110).
2. None on unknown sizes: the inference chapter is a stub. The team's 2009 checker rule that an arm whose parameters cannot be inferred is never dispatched (`a7f149194`, Kilpatrick; `reviews/overloading-judgement.md:59`). His call.
3. E1 and E3 (`reviews/nat-checking-plan.md` § c; `reviews/array-design-review.md:81`); dropping the arm, the old behaviour (row 400); a declaration-form rule, which would refuse `array1[\T, nat s0\]()` (`reviews/overloading-judgement.md:68`).
4. Row 446 (item 17): a call typed above a sized arm's domain is not refused, and a `ZZ32` value reaching the sized arm dies with `NumberFormatException` (PLAN:171).
5. Row 447 "undoes the premise answer 12 relied on for types, that a dead type parameter compiles harmlessly" (PLAN:172; `reviews/batch-6-conformance.md`, finding 1). The E3 diff is stale (PLAN:129).

### D21. A numeral's own type: walk and the one library take `IntLiteral` (2026-09-27)

1. "walk needs to be corrected and switched to using IntLiteral"; then "yes, go ahead" to taking the compiler library's `IntLiteral`, "the implementers' later word weighing more than the unfinished text" (POSITIONS:128). Not built: batch N's second run, rung Q, after 6.5b (PLAN:298; `coordinator/CLIMB-BATCH-N.md:64`).
2. The designers' latest word.
   - "Numerals are not directly converted to any of the number types ... numerals have their own types ... This approach allows library designers to decide how numerals should interact with other types of objects by defining coercion operations" (WD `basic/expressions/literals.tex:132-148`, checked).
   - The numeral types the WD names, `NaturalNumeral[\n,10,v\]`, `Literal[\v\]`, `Numeral[\n,m,r,v\]`, carry the value; its note: "We need to describe the Numeral type hierarchy" (WD `literals.tex:83-95`, checked). Never implemented.
   - The checker types every integer numeral `IntLiteral` (`scala_src/typechecker/impls/Misc.scala:467-468`, checked); the compiler prelude's `trait IntLiteral` is a sibling each number type converts from (`CompilerBuiltin.fsi:390-429`); Maessen, `128f313b5`: "ZZ32 now coerces IntLiteral as described in the spec".
   - The one library's `object IntLiteral extends ZZ32` withholds its arithmetic: "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals." (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:497-498`, `.fsi:129`). The team folds literal arithmetic at compile time (`IntegerLiteralFoldingVisitor.java`, `PhaseOrder.java:57,142`; `coordinator/FACTS-history.md:22`).
   - Reading on record: the spec's direction, in the implementers' single-type shape rather than the spec's value-carrying types.
3. Walk's `ZZ32` numeral kept; the three models (spec, checker, walk) compared (`reviews/batch-6-conformance.md:197-202`); the Fable plan's decision 2, which `IntLiteral` (`reviews/numerics-plan-fable.md:130`).
4. It cannot land alone: measured, it refuses 13 C4 and 11 APL declarations and row 401's shape (POSITIONS:129), which forced batch N's inference rule (D23). The numeral tie rule, `ZZ32` or by magnitude (POSITIONS:134). The `exactValue` hazard: after the switch `x = 0` would answer wrongly through `Number`'s `=`, a requirement of rung Q (`reviews/conversion-overloading-judgement.md:161`). Item 33, `z CMP 0` ties (PLAN:139). Rows 437, 432, 387 (PLAN:301-302). Item 19, the numeral split (PLAN:173).
5. Rung Q's own open questions include "whether its arithmetic block is enabled as the compiler library's is" (`coordinator/CLIMB-BATCH-N.md:446`), and its plan says `IntLiteral` gets "its own arithmetic" (`:64`). The warning's precondition, coercion, is now met under walk (FACTS:112); its stated consequence, all arithmetic on `IntLiteral`s, is not quoted in batch N's record, which quotes only the precondition (`coordinator/CLIMB-BATCH-N.md:325`). The compiler prelude's `IntLiteral` arithmetic is partly revival-written: the 2026-09-17 climb's rung 7 (`2027f519b`) was reviewed as "an unargued deviation ... against their explicit comment" (`reviews/rung-conformance-5-8.md:105-151`).

### D22. A size's range: a `nat` is an ℕ32 value (2026-09-27)

1. "Fuck yes, that's not even a question." (POSITIONS:123): a `nat` parameter is an `NN32` value and an `int` a `ZZ32`; a larger one is refused. Being built: batch 6.5b's rung E, running, restates `NatRtBigSize` and adds the refusal (`coordinator/CLIMB-BATCH-6.5.md:109`).
2. "in any context that a variable of type ℕ32 can appear" (WD `basic/trait-parameters.tex:82-90`, checked). Finishing.
3. None put to him as options; the standing alternative was the judge's reading, sizes at any magnitude.
4. Item 25 (D26). Row 418.
5. Before it, a judge had let sizes read back at any magnitude and a test pinned 2^64-1 (FACTS:114; `reviews/batch-5-conformance.md`, per `coordinator/INDEX.md`). "The refusal of an oversized size used as a value has no place decided" (`coordinator/CLIMB-BATCH-6.5.md:96`).

### D23. The numerics plans, decisions 1 to 5 (2026-09-27)

His question was whether the numeric problems are one issue and what moves the needle (POSITIONS:129). Fable's blinded plan, the coordinator's, and Fable's synthesis (`reviews/numerics-plan-fable.md`, `reviews/numerics-plan-coordinator.md`, `reviews/numerics-plan-synthesis.md`). The synthesis: "What moves the needle is not a numerics design" (`reviews/numerics-plan-synthesis.md:10`).

Decision 1, the library's scalar ranges over `ZZ32` alone.
1. "Option 1, ZZ32", after "ranges can realistically have only ever be ZZ32 because that's the largest array size on JVM" (POSITIONS:129). Built: batch 7R rung J, `3be1fecd7` with `efff9ff1d` (FACTS:118); rung U, `17c6052bb` (FACTS:149).
2. The WD's ranges name no width ("integer values", `basic/expressions/ranges.tex:43-44`), two of its examples build `ZZ64` ranges and ℤ's factorial property a `ZZ` range (`reviews/numerics-plan-synthesis.md:64`). The compiler library declares ranges over `ZZ32` (`Library/CompilerLibrary.fsi:173-174`). A gap filled by following the compiler library.
3. Keep the generic ranges and repair them; two families, `ZZ32` and `ZZ64` (`reviews/numerics-plan-synthesis.md:65`).
4. A range over another integer type becomes a static error (POSITIONS:129). Row 452's test restated and closed (PLAN:240). `BlockedRange` respelled beyond the decision (PLAN:241). ℤ's factorial written as a recurrence and the midpoint as `lo + (hi - lo) DIV 2`, without the team's `floorAverage` (PLAN:250). Row 514, the compiled path has no strided range (PLAN:282).
5. The 7R review: the factorial as a product over a range was "one showcase of the notation" lost (`reviews/batch-7R-conformance.md:100`); item 25 was really about a size's value, and the static-size bullet (`ranges.tex:68-75`) collides with the new sentence under one reading (`:123-128`).

Decision 2, batch 7 widened with `extends Object` written on the result-only parameters, and Q1, an unbounded type parameter bounded by `Any`.
1. "Yes." (POSITIONS:129). Built: batch 7 rung B, `de22fd928` (FACTS:76). Q1 was "taken at its default (a)" (POSITIONS:129) and listed for his review at the phase-3 launch (POSITIONS:121).
2. "The library itself writes `extends Object` on no static parameter; the specification's examples and the compiler tests do" (`reviews/numerics-plan-synthesis.md:27`). The written bound works by making the checker bind `Bottom` (`:27`). The WD's implicit bound is `Object`: "If a type parameter does not have an extends clause, it has an implicit `extends Object` clause" (WD `basic/trait-parameters.tex:49-50`, checked). The library is written and checked under `Any` (`reviews/overloading-judgement.md:277`).
3. Batch 7 as drafted; the checker's own fix, the expected type kept at `f(x)`, moved to batch N (`reviews/numerics-plan-synthesis.md:71`).
4. Item 18, row 447: a value-position `fail` call bound to `Bottom` compiles and fails JVM verification (PLAN:172). Item 20, the nullary comprehension's bound clears no error and narrows comprehensions (PLAN:133). Q1: batch 7b's rung S revises the spec's implicit bound to `Any`, and the compile path's `Object` setting becomes "the divergence" (`coordinator/CLIMB-BATCH-7.md:162`, `:202`).
5. The overloading judgement called the implicit bound "a decision of his, since it is a specification sentence outside the three questions" (`reviews/overloading-judgement.md:277`). Batch 6b-7's review, points 5 and 6: the written bound steers around a quirk of the solver, and the spec still says `Object` (`reviews/batch-6b-7-conformance.md:16-17`).

Decision 3, the inference rule with the numeral switch, as batch N before 7b.
1. "Agreed." (POSITIONS:129). Built: run 1, rungs I, K, T, M, landed at `3fb0cd8c1` (FACTS:79, FACTS:122, FACTS:152, FACTS:123); run 2, rung Q, not yet.
2. None: "The specification never wrote static-argument inference or a numeral's type hierarchy" (FACTS:148). Welterweight: "inference also aims to obtain the most specific instantiation of an applicable entrypoint" (`Papers/Welterweight/dispatch.tick:67`, per `reviews/plain-beside-generic-judgement.md:21`). A gap filled.
3. N after 7b; N folded into 7b (`reviews/numerics-plan-synthesis.md:81`).
4. Six gated inference gaps, rows 506, 507, 511, 513, 515, 518 (PLAN:284-290). Item 34, the attempt order (row 508) (PLAN:181). Rung I newly compiles two programs that crash in the JVM (rows 447, 505), and the batch landed under his rule of 2026-09-29 (POSITIONS:137).
5. The chapter claims more than holds (`reviews/batch-N-review.md:8`). Row 510: walk cannot carry the expected type into a generic call (PLAN:275).

Decision 4, decision D's diff written now and parked: "Yes. Agree with recommendation." (POSITIONS:129); `reviews/decision-d-diff.md`, since stale (PLAN:82).

Decision 5, the order 7, 7R, N, 7b, 8, with 6.5 in the gaps: "Agreed with recommendation option one." (POSITIONS:129); PLAN:61-80.

### D24. `AnyIntegral`'s `comprises` clause, read as the 2012 texts read it (2026-09-28)

1. "Nine steps?"; "Yes, Fable for the judgement." (POSITIONS:129); "Option 1." (POSITIONS:131). Built: batch 7C, `cd9305c2d`; rung Y, `079f54ea9` (FACTS:78); rung X, `d8e0cd28e` (FACTS:150). The count rose from 10 to 75 as the api's hidden overloading and return-type errors reached it (POSITIONS:131; `explorations/microgpt-run-c-handover.md`, "Where the work stands").
2. The designers' latest word, source by source (`reviews/anyintegral-comprises-judgement.md:13-25`):
   - WD `basic/traits.tex:161-170` and its draft note at `:231-234`: the type reading;
   - Types `:384-389`: coverage, "covered by the union" (checked);
   - Welterweight `grammar.tick:21-22`: "no value can belong to the trait unless it also belongs to one of the comprised types";
   - Naden's self-type identification (`justificationOfRTR.tex:580-582`);
   - Ryu's 2009 checker rule; the team's "not yet" comment (`FortressLibrary.fsi:434`).
   - Reading on record: the later texts read values; the checker's rule is the earlier reading. Finishing.
3. The open marker (blocked under walk by D3's block); `comprises I`, the self-type idiom (walk overflows; route C's device); `Integral` leaves the tower; leave it (`reviews/anyintegral-comprises-judgement.md:33-84`).
4. Item 26 (D27), rows 491 and 492. Rows 487 (a program's own `Integral` subtype in another unit is not caught), 489 and 490 (the landed code decides by names) (PLAN:244). The 66 unmasked errors go to batches 7b and 8 (POSITIONS:131).
5. "One fact every reading shares": the hole at every closed level (`reviews/anyintegral-comprises-judgement.md:27`). The 7C review: the rule the spec now states "is stricter than the 2012 Types chapter in two cases ... the checker's limits written into the text, while the appendix presents the rule as the Types chapter's reading" (`reviews/batch-7C-review.md:12`). The team's own "not yet" spelling is not a valid clause under the new text (PLAN:245).

### D25. The conversion rule, and each integer type's own `MIN`/`MAX` (2026-09-28)

1. Decided and landed.
   - Probe K's item 9 first: "we must make it fast, and generic is never fast. So make it fast."; "Option 2. Fast generics over Any. Does this create some kind of contradiction with other rules? Like is this option sound?"; "now I'm torn ... we are somewhere in a territory where I'm picking from a menu of options without understanding what it means for other choices ... You must take me where I am and educate me."; "I am slapping rule on the rule without knowing the global consequences of my choices"; "I cannot be trusted to derive a rule that wouldn't break the whole system and be a hodgepodge of edge cases" (POSITIONS:133).
   - Then: "Both recommendations for batch N accepted." (POSITIONS:134). Decision 1: a conversion is applied to make a call possible and never changes which declaration runs when one already fits; declarations are chosen on declared, quantified domains, then instantiated by answer 8's promotion; a numeral tie reads as `ZZ32`. Decision 2: each integer type declares its own `MIN`, `MAX`, `MINMAX`.
   - Built: rungs I, K, T (FACTS:79, FACTS:122, FACTS:152); rung M, `2770550c3` (FACTS:123).
2. The designers' latest word. The coercion chapter's order, convert only when nothing fits (WD `conversions-coercions.tex:477-484`, `:525-536`), silent on generics with promotion; the checker's ranking since 2009; the team's compiled library declares no `=` over `Any` or `Number` (`reviews/conversion-overloading-judgement.md:26`, `:46-47`). For `MIN`/`MAX`: `QQ`, `RR64`, the compiler library and the spec's ℤ declare their own (`:81`). The order is finishing; promotion and the tie rule fill a gap.
3. Way 4, his idea in sound form, which is C#'s rule; way 7, today's answer; way 1, the shadows' catch-all (`reviews/conversion-overloading-judgement.md:38-49`, `:57-73`; `reviews/conversion-overloading-ways.md`). For row 484: walk reading an inherited method's `self` at the receiver's type; leave it (`:83-87`).
4. Item 30 (D28). The `exactValue` requirement on rung Q (D21). Rows 504, 508, 509; row 517, `MAXNUM` and `MINNUM` still tie (FACTS:123). Items 33 and 34.
5. His own doubts, quoted above. The soundness check: option 2 is sound under reading A "but not reaching F-bounded generics beside a catch-all" (`reviews/option-2-soundness.md`, per `coordinator/INDEX.md`). Row 508: the landed checker tries the expected type first, so a converted declaration can win where one fits, against decision 1 (PLAN:181). Row 509, the walk/compiled split (PLAN:251).

### D26. Item 25: a size used as a value converts as a numeral does (2026-09-28)

1. "Option 1, go ahead." (POSITIONS:135), after asking whether sizes as `NN32` and ranges as `ZZ32` were a mistake. Built: batch N rung I converts it as a numeral; rung T writes it into the ranges section, closing row 485 (PLAN:135).
2. WD: a `nat` appears "in any context that a variable of type ℕ32 can appear" (`basic/trait-parameters.tex:83-86`). The team's checker types a size used as a value `INT_LITERAL` (`scala_src/typechecker/staticenv/KindEnv.scala:67-68`, checked). Finishing the team's code.
3. The other reading, a size keeps the checker's type and a range bounded by a size is refused, which decision D's diff assumed (`reviews/batch-7R-conformance.md:123-128`).
4. Row 486: walk keeps a size a `ZZ32`. Decision D's diff was written around the other reading (`reviews/batch-7R-conformance.md:127`).
5. The 7R review: the question sat too late in the plan and batch N would "decide it in code" (`reviews/batch-7R-conformance.md:8`, `:123-128`).

### D27. Item 26: the specification's `comprises` passages restated at the level of values (2026-09-29)

1. "Yes" (11:25 UTC) to option 1 with Astra's three points, after "super scared that we are touching type theoretical things that I am totally unequipped to handle" (POSITIONS:140). Not built: batch 7b's rungs S, C and W.
2. The team's own plan: "We agreed to revise the Meet rule to address this with the coverage check" (WD `appendices/future.tex:285`, checked). Types names covering and never defines it ("% What about "covering"?", `types.tick:934`); Welterweight's Covered judgement; Steele's last code on it, 2012-06-06, `59fdeff62` (`reviews/comprises-type-level-judgement.md:14-24`). Finishing a stated plan.
3. Way 4, narrow 7C's rule so the type statements hold; way 1, leave the passages (`reviews/comprises-type-level-judgement.md:46-75`).
4. The proof appendix gives up static uniqueness for run-time uniqueness, and a call between two closed traits is typed by the intersection of its candidates' return types (POSITIONS:140). Batch 7b's rung C adjusts rung I's ambiguity check. The fallback, row 492 to batch 8, if broader repairs are needed.
5. Astra's three points: the performance cost claimed for such calls is unproven; the coverage search must stay local to overload checking; "the proof holds only where closed families are closed, which row 487 leaves unenforced across some component boundaries" (POSITIONS:140; `reviews/comprises-type-level-proof-addendum.md`). The record's gaps (`reviews/comprises-type-level-judgement.md:123-131`).

### D28. Item 30: a generic declaration beside a plain one, at run time (2026-09-29)

1. "Stated this way, I think it's obvious that only option one makes sense." (POSITIONS:136): the generic declaration runs at the instance the value fixes, the least instance where it fixes none. Not built: batch 7b (one sentence in rung S, row 157 in rung W, two expected-failure pairs in rung C).
2. The Types paper: "Because the call is dispatched to d1, we require type parameters for d1 to be inferred dynamically" (`Papers/Types/rules.tick:118-129`); Welterweight (`fig-msa.tick`; `dispatch.tick:20`, `:67`); Naden's note of 2012-06-15; both paths were built for it (`OverloadSet.java:1484`, "Runtime inference for some cases", checked; `OverloadedFunction.java:866-891`); the team's test `Compiled12.invariantInference` (`reviews/plain-beside-generic-judgement.md:21-29`). Finishing.
3. The plain declaration runs; refuse the pair; refuse the call; the program's own devices (`reviews/plain-beside-generic-judgement.md:48-67`).
4. Row 157 fixed in walk; the two compiled crashes stay on phase 5's list; Naden's return-type restriction recorded as future work (POSITIONS:136). Row 446's case left to item 17.
5. His rule of 2026-09-28, 19:06 already settled which declaration runs; the clean list and the judgement spent about 0.7M tokens on it (`reviews/batch-6.5-review.md`, For Pavol). The judgement's gaps (`reviews/plain-beside-generic-judgement.md:121-131`).

### D29. Smaller decisions on the language, briefly

- Row 331, the empty `Maybe`: the team's `Nothing[\T\]` kept; the spec's bare `Nothing` is future work gated on `where` clauses (POSITIONS:49). The WD's own declaration compiles on neither path, and the reason is name resolution (FACTS:23). Re-gated on static-argument inference, parked (PLAN:220).
- Row 321, what an object with no `asString` prints: "yes, row 27 close per default-rendering-judgement recommendation" (POSITIONS:50); batch 3 rung S, `6bec1b004` (FACTS:106). It overflows the stack at the switch-over (PLAN:89).
- Row 39, the diagonal: `Diag` stays `extends Matrix` and overrides `mul` (POSITIONS:71); a read-only matrix trait is "a library change for a ledger row later".
- Row 404 and worklist item 12, the 2012 `covariant` keyword: "Agreed." as future work, not on the path (POSITIONS:85). The checker accepts variance and neither path carries it to run time (ledger row 404).
- The notation (2026-09-19): "NO. That's not Fortress!"; any repair that would change a model line is shown to him as a diff before it is built (POSITIONS:36).
- Interpreter performance decides nothing (2026-09-19) (POSITIONS:35).
- The reversible stops (2026-09-27): "These don't need me now. They are reversible things I can review later. Don't block start of next batches on these." (POSITIONS:120).

## Part 3. Lists

### (a) Intentions of the designers on record that no plan carries and no decision addresses

1. `where` clauses.
   - Source: WD `basic/trait-parameters.tex` (where clauses, `coordinator/map/design-intent-sources.md`, "Generics" row); "Widening and where clauses are not yet supported" (WD `basic/conversions-coercions.tex:15`); code generation refuses any declaration with one (`CodeGen.java:2953`, `:4093`, `:5004`; FACTS:158), and no ledger row holds that (PLAN:226, parked).
   - Waiting on it: the bare `Nothing` (row 331), `HasIdentity`, the `Rank` exclusion the library calls "Potemkin exclusion traits" (`Library/FortressLibrary.fsi:1074-1084`, per `reviews/overloading-judgement.md:103`), `comprises Integral[\I\] where [\I\]`, answer 6's way 4.
   - microGPT: not needed; "no program line uses a refined type, `QQ`, units or `where`" (`reviews/flattening-questions-ways.md:740`).
2. The `covariant` and `contravariant` modifiers. Source: Types `:322-339`; commits `26718e298` (2011-12-06) and `20a8febe9` (2012-02-29) (ledger row 404). Addressed only as future work (POSITIONS:85, :106); no PLAN phase. microGPT: not needed.
3. Contracts, `requires`, `ensures`, `invariant`. Source: WD `basic/functions.tex:417-426`; code generation refuses them (FACTS:158). No plan. microGPT: not used (C4's `src/` has none).
4. Tests and properties as the algebraic laws of the traits. Source: WD `basic/tests.tex`; the map: "Properties are meant to be the algebraic laws of the trait hierarchy, checked by unit testing today and by a theorem prover later" (`coordinator/map/design-intent-sources.md`, "Tests, properties, contracts" row). The checker refuses `test` and `property` (FACTS:159); worklist item 7. microGPT: not needed.
5. Dimensions and units, `dim` and `unit`. Source: WD `basic/dimensions.tex`, `basic-lib/dimensions.tex`; the team counted units among the good ideas and among the things it wished it had pushed further (map, "Dimensions and units" row). Worklist item 18; the inference chapter names them as not described (PLAN:278). microGPT: not needed.
6. `widens`. Source: WD `basic/conversions-coercions.tex:762-906`. Deferred by answer 8 (POSITIONS:107); no plan. microGPT: not needed (`reviews/flattening-questions-ways.md:613-614`).
7. `HasIdentity` and `Identity[\+\]`. Source: WD `advanced-lib/algebraic-constraints.tex:772-797`. One ledger note (POSITIONS:113); waits on `where`. microGPT: not needed; the witness `typecase` serves.
8. `bool` static parameters. Source: WD `basic/trait-parameters.tex:111`; the WD's own `coerce[\bool b\]` example (`SpecData/examples/basic/StatParam.Bool.fss`, PLAN:278). Rows 307, 406. microGPT: not needed.
9. The algebraic-constraints library (monoids, groups, rings, fields), specified at length and present commented out in `Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE` (ledger worklist item 23). His own intent of 2026-09-15, "extend the algebraic layer (Ring, Field and what ML's matrices and tensors need)" (POSITIONS:23), has no PLAN phase. microGPT: not needed to compile; it was his aim for the library's flavour.
10. Arithmetic in sizes. Source: the library's own storage `PrimitiveArray[\T, (s0 s1)\]` and `reflect`'s `r+b` (`reviews/size-runtime-design-brief.md` § 5). Item 15, open, no batch (PLAN:144). microGPT: on its path, since every rank-2 and rank-3 array is stored so.
11. Run-time sizes built into the language. Source: `ProjectFortress/LibraryBuiltin/NatReflect.fss:38-40`. Only as part of row 40's returning questions (POSITIONS:76). microGPT: on its path; C4 calls `reflect` (`explorations/run-c4/src/FlatArrays.fss:64`, `:95`, `:108`).
12. Naden's run-time instantiation restricted by the static return type. Source: `Papers/RuntimeInstantiation/` (the 2012-06-15 memo, `RTRinstantionTheory.tex`). Future work only (`reviews/overloading-judgement.md:88`; POSITIONS:136). microGPT: no such pair by reading (`reviews/plain-beside-generic-judgement.md`, claim 9).
13. The saturating operators ⊞ ⊟ ⊡ ⊠. Source: WD `basic/operators/opr-overview.tex:172-176`, `:205-209`. "Waits for a step of its own" (POSITIONS:81); no plan line. microGPT: not needed.
14. `partitioned` traits, the team's intended fix for the quadratic `excludes` blow-up. Source: Steele 2016, slides 39-40 (`research/extracts/SteeleJuliaCon2016-extract.md:161-170`), "never shipped". microGPT: not needed.
15. Self types as their own construct ("trolls"). Source: Naden (`justificationOfRTR.tex:623-630`); route C's `comprises T`. Set aside by D4 and D24, never weighed on its own. microGPT: not needed.
16. Numeral types that carry their value. Source: WD `basic/expressions/literals.tex:83-95`, `:127-130`. D21 takes one `IntLiteral` instead. microGPT: not needed.
17. The pattern-matching proposal. Source: WD `basic/expressions/typecase.tex:15`. Parked (PLAN:232, PLAN:263). microGPT: the APL base has a `typecase` (row 340, PLAN:99); C4 has none.
18. Type aliases. Source: WD's types chapter; worklist item 16; Types comments the section out (`types.tick:1011-1036`). microGPT: not needed.
19. The tensor as the intended aggregate. Source: WD `appendices/future.tex:63-76` (map, "Arrays" row). No plan. microGPT: its natural notation, not measured.
20. Distribution, regions and locality. Source: WD `advanced/parallelism-locality/` (map, "spawn and regions" row), "one of the three areas the team says it never got to explore". Phase 6 names compiled parallelism only (PLAN:104). microGPT: not needed to compile.
21. Complex numbers and quaternions. Source: WD `basic/types-vals-vars.tex:511`; Steele 2016 slide 12 (`SteeleJuliaCon2016-extract.md:50-51`). No plan. microGPT: not needed.
22. Operator static parameters on objects. Source: WD `basic/trait-parameters.tex:156-176`; row 366, gated, no batch. microGPT: not needed.

### (b) Where two of his decisions pull against each other, or a later one narrowed an earlier one

1. One library and the library's practice (D1, F2) against route A and after (D4, D23, D21, D25). The files are the interpreter's; the shapes are increasingly the compiler prelude's: the flat tower, ranges over `ZZ32`, the sibling `IntLiteral`, each type's own `MIN`/`MAX`. The rung P judge read route A as contrary to one library (`ladder/rung-exclusion-relax/JUDGE.md:36`); the exclusion brief: "the practice is the nesting, and A ends it" (`reviews/exclusion-design-brief.md:78`).
2. Row 330 (D6) against route A and answer 8 (D4, D16). The decision stands; its stated reason, promotion by subtyping, no longer holds; POSITIONS:47 still gives it; the ledger's note says the result rejoins float arithmetic by `asFloat` (ledger row 330).
3. Answer 8 (D16) against the WD's general sentence on integer-to-float conversion (`conversions-coercions.tex:64-66`), by his JVM principle (D8). Recorded in the spec (`Specification/appendices/changes.tex:968`).
4. The implicit bound (D23, Q1 = `Any`) against the WD's `extends Object` (`basic/trait-parameters.tex:49-50`) and the library-route judgement's reconciliation, which kept the compiler's `Object` as the spec's (`coordinator/library-route-judgement.md:15`). The overloading judgement called it "a decision of his" (`reviews/overloading-judgement.md:277`); it was taken as a default inside decision 2 and listed (POSITIONS:121, :129).
5. The 2026-09-24 requirement of "no open discrepancy between the spec and our implementation" (POSITIONS:63) against: walk's run-time choice of coercions (route A; `XXXCoercionStaticRungC`, `XXXCoercionStaticNarrowRungC`); row 509, walk promoting from run-time types (a default, PLAN:251); and the inference chapter's claim to state no more than the checker builds, with rows 508, 515, 516 and 518 departing (`reviews/batch-N-review.md:8`).
6. Decision 1 of the conversion rule (D25) against the landed checker's attempt order: row 508, a converted declaration can win where one fits (item 34, PLAN:181).
7. Answer 12's premise (D20), that a dead type parameter compiles harmlessly, against numerics decision 2 (D23), which writes `extends Object` to make the checker bind `Bottom`: row 447, item 18 (PLAN:172). Batch N then compiled programs that crash in the JVM and landed under the rule of 2026-09-29 (POSITIONS:137).
8. A size's range (D22: a `nat` is an ℕ32 value, as the WD says) against item 25 (D26: a size used as a value converts as a numeral, to `ZZ32` at a tie). Told they are consistent (POSITIONS:135); decision D's diff was written around the reading he did not take (`reviews/batch-7R-conformance.md:127`).
9. The notation rule of 2026-09-19 ("any repair that would change a line of the model is shown to him as a diff before it is built", POSITIONS:36) against the reversible stops of 2026-09-27 (a model or APL line beyond the approved ones lands and is listed, POSITIONS:120). The record shows team demo lines landed that way (rung A, PLAN:236) and no model line found.
10. Answer 6's condition, "resurrect this" when covariance lands (POSITIONS:106), against row 404 and worklist item 12 sitting in no plan phase (POSITIONS:85).
11. His aim of 2026-09-15 to extend the algebraic layer (POSITIONS:23) against route A, where `Number` lost its algebra and the array bodies keep `T extends Number` without evidence (`reviews/batch-6-conformance.md:90`), and no phase carries the extension.
12. The numeral decision (D21: the implementers' `IntLiteral`) beside the team's own warning in the one library ("Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals", `FortressBuiltin.fss:497-498`) and its compile-time folding. Coercion now exists; rung Q's plan gives `IntLiteral` "its own arithmetic" and leaves open whether the team's block is enabled (`coordinator/CLIMB-BATCH-N.md:64`, `:446`); the warning's stated consequence is not quoted or weighed there.
13. Ranges over `ZZ32` (D23, decision 1) against the notation rule: the WD's factorial as a product over a range became a recurrence (`reviews/batch-7R-conformance.md:100`), a spec line, not a model line.
14. Process, for completeness: the test-first rule of 2026-09-17 (POSITIONS:30) against the landing rules of 2026-09-29, under which a batch lands with owed tests routed to the next batch (POSITIONS:137-138).

## Counts

- Entries: 3 framework entries (F1 to F3) and 29 decision entries (D1 to D29). Counted singly, they cover 61 decisions: F1 and F2 one each, F3 two; D2, D5, D6, D8, D9, D15, D20 and D25 two each; D7 and D10 three each; D12 six; D23 six (five and Q1); D29 seven; the other 16 entries one each.
- Open items the decisions opened and that wait on him or on a batch: items 14, 15, 16, 17, 18, 19, 20, 22, 23, 31, 32, 33, 34 (PLAN:131-192).
