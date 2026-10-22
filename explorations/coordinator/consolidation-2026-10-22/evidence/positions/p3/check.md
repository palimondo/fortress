<!-- The clarity pass's check of chunk p3 (P-42 to P-53), 2026-10-22: each rewritten entry against the record and its sources, the cold reader's answers against the source meaning, and each failure classed with a proposed fix. -->

# Check: positions, chunk p3

Read: `proposals.md`, `clean.txt`, `cold-read.md`, `concepts.md` in this folder; `entries.py 42 43 44 46 47 48 49 52 53`; the audit's `P-N.md`, `judgement-c3.md`, `corrections-c3.md`, `takeaway-c3.md` and their c4 twins; the coordinator's texts of 2026-09-24T14:36:56.498Z, 2026-09-29T16:52:08.446Z and 17:29:52.529Z, 2026-10-09T07:14:01.035Z (near.py and the transcript); `explorations/reviews/exclusion-design-brief.md` section 1, `anyintegral-comprises-judgement.md`, `conversion-overloading-judgement.md`; the tree where an entry names it (cited below). Times are UTC.

Summary: P-52 and P-53 pass. Two rewritten sentences say something the sources do not: P-43's apposition calls `ZZ` and `QQ` fixed-width, and P-44's reason cites P-26 but not P-25. Two state lines say less than the tree holds: P-48's misses walk's three `Bottom` cases, and P-49's misses the checker's fourth attempt. The other failures are wording or a missing concept.

## P-42

**Fidelity.** Pass. Each sentence has its source: the title and the callout are option 1 of the coordinator's 13:58:02.218Z, which he took at 14:02:25.736Z. "The Working Draft of February 2011" is the callout's own wording (`Specification/basic/trait-parameters.tex:54`). "So refuses a generic instantiated at a tuple" matches `references/compiler.md:69` and row 412's examples (`idi[\T\](x: T)` of a tuple is refused). "Functions" is kept for his answer, which review-queue item 218 now holds.

**Comprehension.** Matches, except for one doubt. The reader could not tell whether the switch-over itself ends the departure, or whether the departure must be repaired before the switch-over can happen. It also noted that the entry has no state line.

**Failures.**
- Wording. The sources settle it: the switch-over ends the departure. `Shell.useCompilerLibraries` sets the `Object` bound and `useInterpreterLibraries` clears it (`ProjectFortress/src/com/sun/fortress/Shell.java:371-380`). The callout says "a divergence that lasts until the compiled path is switched over to the interpreter's library". The coordinator told him on 09-29: "That divergence goes away at the switch-over". Proposed last sentences: "Built in the specification, the library and walk. The compiled path departs from it until the switch-over, which ends the departure: while it checks against the compiler's prelude, it bounds such a parameter by `Object`, and so refuses a generic instantiated at a tuple (gap-ledger row 412)."

## P-43

**Fidelity.**
- Failure. The rewrite reads: "The fixed-width types, `ZZ`, `QQ` and `RR64`, are siblings under `Number`." The record reads: "The fixed widths, `ZZ`, `QQ` and `RR64` are siblings". The added comma makes the list an apposition, which calls `ZZ` and `QQ` fixed-width. Neither is fixed-width. The source puts every number type among the siblings: "ZZ32 stops being a ZZ64, ZZ64 stops being a ZZ, the integers stop being QQ, QQ stops being RR64. They become siblings under Number" (the route ask, 2026-09-24T14:36:56.498Z). F-131 lists them, and so does the skill's core (`SKILL.md:127`).
- The new definition of the rule and the reason the tower breaks it are faithful. They come from `exclusion-design-brief.md` section 1 ("one `ZZ32` is `Equality` at five instantiations at once"), and the route ask states the link in its first line. The state line is faithful (review-queue item 22: "batch 6 kept its `=`"; F-131).
- Uncertain, held. The "Why:" sentence and "The curator cares that specialised code runs fast ..." keep the record's text. Only his answers to review-queue items 219 and 220 (filed in `329d866a9`) settle them. The cold reader could make nothing of either one ("the Fortress way has no content I can check"; "I cannot see how this supports route A over route C"). That is further evidence for the audit's finding.

**Comprehension.** The reader got the decision, its limit (`=`) and P-95 right. It failed on these points:
1. Which types the sibling sentence names (the apposition above).
2. Route A and C with no route B. The route ask offered A and C (and C-lite). The brief that came before it had a route B, dropping the rule.
3. "The forest rule": the entry names it and does not define it.
4. "What a return to it would cost", where "return" suggests that the project was once on route C.
5. "A default that waits for the curator's review", which it read either as a provisional choice or as a default implementation of `=`.

**Failures.**
- Wording (for fidelity point 1 and comprehension point 1). Proposed: "The number types, from `ZZ32` to `RR64` (F-131 lists them), are siblings under `Number`, the integer types through `AnyIntegral`, and each carries its own algebra: the self-typed traits at its own type, such as `Integral[\ZZ32\]` for `ZZ32`." The sources: the route ask; F-131; the judgement's note on `AnyIntegral` (`judgement-c3.md`, "P-43"); `Library/FortressLibrary.fsi:533`.
- Wording (points 2, 3 and 4). P-43 is the entry that makes the concept of route C (`concepts.md`), so it should state route C's content and not only its name. Proposed: "Route C, the other route that the curator was offered, keeps the nested tower and softens the rule as the team's 2012 patents describe: their forest rule lets a self-typed trait stand at several instantiations along a chain. P-95 keeps route C open, and F-46 gives what a return to the nested tower would cost." The sources: the route ask ("Route C keeps the tower and softens the rule as the patents describe"); F-45 and review-queue item 219 for the forest rule; P-95 ("route C, the way back to the patents' forest rule"); F-46 ("Leaving P-43 for it needs the tower un-flattened").
- Concept (point 5). "A default" in the record's sense means a choice that a batch landed without the curator's word, which stands until he reviews it. It belongs in the `fortress-repo` core, with the review queue in "The record" (`concepts.md`, the review queue row, already says so). Wording here as well, because next to `=` the word reads as a default implementation. Proposed: "Built, except that `Number` keeps one catch-all, its `=`, which a batch kept without the curator's word and which waits for his review (review-queue item 22)."
- Uncertain fidelity, held: the "Why:" sentence and "The curator cares ...". They are settled by his answers to review-queue items 219 and 220. `proposals.md` still says "the review-queue worker files them". They are filed, and the note line can name items 219 and 220.

## P-44

**Fidelity.**
- Failure (pointer). The rewrite reads: "Why: the team's 2012 texts are its later word (P-26), and by them the clause is right as written." The ask that he took gives the reason as "By your decisions of 09-23 and 09-26, the 2012 texts weigh more" (coordinator, 2026-09-28T07:49:57.970Z). The decision of 09-23 is P-26. The decision of 09-26 is P-25: the Types chapter counts as the designers' later word wherever it covers a topic (his "Agreed." at 2026-09-26T08:01:03.475Z, in P-25's history block). The 2012 texts here are Luchangco's Types chapter and Welterweight (`explorations/reviews/anyintegral-comprises-judgement.md:139`), and P-25 is the entry that names them. With P-26 alone, the pointer misses the decision that carries the reason.
- The rest passes. The condition keeps the ask's words, as the audit chose, and F-72 holds the built form. "This decision does not close it" agrees with F-72's "parked for the curator". The 2008 way is "the team's 2008 clause on `Integral[\I\]`" (judgement, way 4).

**Comprehension.** The reader got the decision, the hole and the state right. Its doubts:
1. `AnyIntegral comprises { ... }`: an ellipsis is Fortress syntax in a `comprises` clause (F-64), so the reader could not tell elision from code.
2. What "a `NOT YET` comment in the team's wording" means.
3. Which 2012 texts are meant.

**Failures.**
- Wording (the pointer, and doubt 3). Proposed: "Why: the team's 2012 texts, Luchangco's Types chapter and Welterweight, are its later word (P-25, P-26), and by them the clause is right as written."
- Wording (doubt 1). Name the list instead of eliding it: "The library's `AnyIntegral`, whose `comprises` clause lists the five integer types `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64`, stays closed" (`Library/FortressLibrary.fsi:442`).
- Wording (doubt 2), defined in the entry, since no other entry and no part of the skill uses the term (grep of POSITIONS, FACTS and the skill). Proposed: "... with a comment beside it in the team's `NOT YET` form, the form in which the team's library records a clause that it does not yet write: `comprises Integral[\I\] where [\I\]`." The sources: `Library/FortressLibrary.fss:683`, and the team's own sites at `:1612` and `:1695`.

## P-46

**Fidelity.** Pass. "A generic declaration applies if some type within its bounds takes the arguments" and "at `T = Number`" are decision 1's words, which he took at 2026-09-28T19:06:50.868Z ("A generic version fits if some type within its bound would take the arguments"; `conversion-overloading-judgement.md:35`). The reason is his own 13:32:53.221Z. Row 537 matches the ledger ("two generic declarations of one name whose parameters have different bounds ... the compiled run dies").

**Comprehension.** It matches on the rule, the example's outcome, the rejected rule and the state. It failed on:
1. The example's signatures, which it had to reconstruct.
2. "With the conversions inserted statically" set beside walk, which has no static types.
3. "Promotion".
4. "PLAN.md, phase 5", which collides with the compiler's phase 5 in the skill.

**Failures.**
- Wording (point 1). Use the judgement's own pair: "So beside `op(a: Any, b: Any)`, `op[\T extends Number\](a: T, b: T)` applies to a call with a `ZZ32` and a `ZZ64`, at `T = Number`." (`conversion-overloading-judgement.md:15`, `:28`).
- Wording (point 2). The static insertion is the compiled path's. Walk promotes from the arguments' run-time types and converts at binding (`conversion-overloading-judgement.md`, section 3). The judgement took that as a default listed for his review, so it must not read as his decision. Proposed: "... with the conversions inserted statically on the compiled path. Walk, which has no static types, promotes from the arguments' run-time types: a default that waits for the curator's review (review-queue item 85)."
- Concept (point 3): the promotion of mixed widths. `concepts.md` already routes it to the `fortress-repo` core, the "Numbers are siblings" bullet. I agree.
- Concept (point 4): PLAN and its phases, as `concepts.md` has it, for the core's "The record". The definition should also say that PLAN's phases are not the compiler's phases (`SKILL.md`, "The phases").

## P-47

**Fidelity.** Pass. The tie and "Ambiguous coercion" come from decision 2's context, and the answer at the promoted type from option 1 ("Every such call then answers at answer 8's type"). The reason is the recommendation that he took. The precedents are as the audit corrected them: the specification's `ZZ` declares `MIN` and `MAX` only.

**Comprehension.** The reader got the decision and its reason. It failed on:
1. Why an inherited `MAX` ties with `QQ`'s.
2. Which traits are "the generic order traits".
3. What `MINMAX` is.
4. Which types "each integer type" covers.

**Failures.** All wording. Each concept belongs to this entry alone.
- Point 1, in the page's words: "The `MAX` that a `ZZ64` inherits types `self` as the order trait, so neither it nor `QQ`'s `MAX` is more specific, and walk stops with "Ambiguous coercion"" (`conversion-overloading-judgement.md:79-80`).
- Point 2: "inherits from the generic order traits, `StandardTotalOrder` and the `StandardMin`, `StandardMax` and `StandardMinMax` that it extends" (`Library/FortressLibrary.fsi:192-233`; the integer types reach them through `Integral`).
- Point 3: "`a MINMAX b` is the pair `(a MIN b, a MAX b)`" (`FortressLibrary.fsi:209-213`).
- Point 4: "the five integer types that `AnyIntegral` lists: `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64`". These are the fifteen declarations of `2770550c3` (`P-47.md`, section 2).

## P-48

**Fidelity.**
- Uncertain, settled. "When two unrelated arguments meet at it" is the ask's wording (16:52:08.446Z). Set beside P-46 and P-74 it invites a contradiction, and the cold reader found one: a `ZZ32` and a `ZZ64` are siblings, yet they give `ZZ64`, not the bound. The specification settles it. Arguments fix the parameter at the narrowest type into which every one of them converts, and the parameter takes its bound only "where there is no such narrowest type" (`Specification/basic/inference.tex:80-99`). So "unrelated" means "with no such narrowest type".
- Uncertain, settled. "The call's static return type" could be read as the expected type or as the declared return type. At checking, the specification says "what the expected type ..., where the call has one, requires of the declared return type" (`inference.tex:96-104`). At run time, the ask's example is the static type that the checker gave the call (`Box[\Number\]`, the coordinator's 17:29:52.529Z).
- Failure (the state line). "Never `Bottom`", with only the compiled dispatcher still to build, lets a reader conclude that walk obeys the rule except at dispatch. Walk still gives `Bottom` in three cases (`.claude/skills/fortress-repo/references/revival-changes.md:177-180`): gap-ledger rows 587, 591 and 612, each NEGATIVE-VERIFIED. Row 591's expected failure is a default that waits for his review (review-queue item 81). The gap was already in the record's text, and the rewrite carries it forward.
- The rest passes: the cases, the bound with `Any`, walk's "always", the three named declarations and the reason. His "it helps us cleanly resolve something" is a condition of his trust, and the entry may drop it, since the reason holds without it.

**Comprehension.** The reader got the rule, the exemptions and the state. It failed on:
1. "Two unrelated arguments", against P-46.
2. "When dispatch picks the instance".
3. Which static return type is meant.
4. "Leave such a parameter unbounded", which is a second property beside "unfixed".
5. Whether walk's use of the value's type is accepted, and walk's remaining `Bottom` cases.

**Failures.**
- Wording (points 1 and 2). Proposed: "The arguments leave a parameter unfixed when it occurs only in the result type; when two arguments meet at it with no narrowest type into which both convert (a `ZZ32` and a `ZZ64` have one, `ZZ64`, by P-74); or when dispatch, at run time, picks a generic declaration and must choose the instance to run."
- Wording (point 3). Proposed: "... narrowed by what the call's expected type (P-49) requires of its declared return type; at run time, by the static type that the checker gave the call."
- Wording (point 4). Proposed: "The library keeps the team's declarations of `fail`, `builtinPrimitive` and `List`'s empty comprehension, whose type parameters have no written bound, without the `extends Object` that a batch had added." (Item 20 of the coordinator's 2026-10-03T04:01:11.833Z; his 04:14:20.092Z.)
- Wording (point 5, walk at dispatch). Proposed: "Walk is exempt at dispatch: it has no static types, so it takes the value's type there, and always will." (Option 1, which he took; the specification's callout `revival-dispatch`.)
- Uncertain fidelity, settled (point 5, the state line). Proposed: "Still to build: a compiled dispatcher that carries the call's static type, so that a generic declaration reached only at run time gets this instance (gap-ledger row 538; PLAN.md, phase 5, microGPT compiles); and, under walk, three cases that still take `Bottom` (gap-ledger rows 587, 591 and 612; review-queue item 81 holds row 591's default)."

## P-49

**Fidelity.**
- Failure (the state line). The rewrite reads: "Built, with one more attempt between the two, by subtyping with the expected type". When a call has an expected type, the checker as built makes four attempts. Subtyping without the expected type comes first, then subtyping with it, then coercion with it, and last coercion without it: "D4. The order: subtyping without the context, then subtyping with it, then coercion with it, then coercion without it." (`explorations/compile-ladder/rung-instance-bound/decision-record.md`, D4; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:612-615` and `:733-737`). The last attempt is the old fallback, which the order kept (`git show f3032eed8`). Review-queue item 2 says "Landed: Three attempts". Item 2 is the writer's source, and it omits the fourth attempt as well. The fourth attempt does not contradict the decision, since coercion still comes only after. But a reader of the entry takes the built order to have three steps.
- The rest passes: the definition of the expected type, "by coercion if need be" (the ask's example converts the result at the assignment), and his reason in his words.

**Comprehension.** The reader got the order and its reason. It failed on:
1. The title's "with coercion only after", against a first attempt whose result may be converted by coercion.
2. "A default", as in P-43.

**Failures.**
- Uncertain fidelity, settled (the state line). Proposed: "Built, with two more attempts: between the two, one by subtyping with the expected type, a default that waits for the curator's review (review-queue item 2); and last, one by coercion without the expected type (`compile-ladder/rung-instance-bound/decision-record.md`, D4)." For the coordinator: review-queue item 2 should name the fourth attempt too. Whether the curator's review covers it is not on record.
- Wording (point 1). Proposed title: "**The compiled checker matches a call by subtyping first, without the expected type, and coerces its arguments only when that match is not kept.**"
- Concept (point 2): a default, as under P-43.
- Concept, beyond this entry: the expected type. The writer defines it in P-49 as "the decision that makes the concept". But it is the specification's term (`Specification/basic/inference.tex`). P-49, P-50 and P-51 use it, so do six FACTS entries, and so does P-48 in the wording proposed above. The skill does not define it (grep of `SKILL.md` and `references/compiler.md`). It belongs in `references/compiler.md`, beside the pilot's "The compiled checker's attempts at a call". P-49's own definition can stay until the skill holds it.

## P-52

**Fidelity.** Pass. The scope is the question that he took (07:09:23.365Z). "Lower corners, and upper corners, by `PCMP` ..., which compares each axis on its own" is what `checkSelection2D` and `PCMP` do: each axis is compared by `CMP`, the results are combined by `SYMMETRIC_PARTIAL`, and the call raises on `GreaterThan` or `Unordered` (`Library/RangeInternals.fss:111-155`). The example's reason holds: 0 against 2 gives `LessThan`, 0 against -1 gives `GreaterThan`, so the comparison is `Unordered` and the call raises.

**Comprehension.** Matches. Pass.

## P-53

**Fidelity.** Pass. The title, the example (`"abc".left`) and the ranges and lists all come from the question that he took (07:14:01.035Z), with the audit's correction of "every other".

**Comprehension.** Matches. The reader asked about the empty string and the compiled path, and both are outside what he decided (`takeaway-c4.md`, "P-53"). Pass. Optional, from the question itself ("An empty string gives `Nothing`"): "... and an empty string answers `Nothing`" (`Library/FortressLibrary.fss:4332`).

## On `concepts.md`

It covers what the entries share. I would add one thing: the expected type, for `references/compiler.md` (P-49 above). I would also correct one claim: the expected type is not P-49's alone. Two concepts that the cold reader lacked belong to their entries alone, so the proposals above define them there: the team's `NOT YET` comment (P-44) and `MINMAX` (P-47).

## His quotes

HIS 2026-09-29T14:02:25.736Z | Okay, that seems like an absolute no-brainer. Option one, right, Annie?
HIS 2026-09-24T14:41:40.798Z | Agreed. Route A it is.
HIS 2026-09-24T07:03:57.849Z | preserve the option to go the route C
HIS 2026-09-28T08:52:27.340Z | Option 1.
HIS 2026-09-26T08:01:03.475Z | Agreed.
HIS 2026-09-28T19:06:50.868Z | C-O. Both recommendations for batch N accepted.
HIS 2026-09-28T13:32:53.221Z | Option 2. Fast generics over Any.
HIS 2026-09-28T13:51:00.915Z | if there is a conversion to a specific type, it should be applied. And only if, if all combinations are exhausted and we haven't reached a specific im implementation, then we go to a uh, plain implementation.
HIS 2026-09-29T17:34:18.956Z | if I apply the rule that the teams work super the later teams work supersedes the previous one, and you are saying the rule is coming from the paper and it helps us cleanly resolve something, then I will trust the team's work over whatever my misunderstanding of the things are. So you can record that.
HIS 2026-10-03T04:14:20.092Z | So yes, put the library back to the team's own declaration, so previous state
HIS 2026-09-29T15:26:18.244Z | Because coercion should be tried when there are no matches.
HIS 2026-09-29T15:49:10.603Z | Okay, so on item four, we are recon recording the recommendation uh, number one.
HIS 2026-10-09T07:13:27.273Z | Q50 (a) as recommended
HIS 2026-10-09T07:18:49.726Z | agreed with the recommendation.
