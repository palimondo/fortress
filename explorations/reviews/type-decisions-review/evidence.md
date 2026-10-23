<!-- The evidence map for the review that Pavol asked for at 08:08 UTC on 2026-10-23: whether his decisions on the type system and the library's types, read together as one chain of constraints, bend the original designers' intent. Written on 2026-10-23 by an Opus evidence worker, reading only (no build, no JVM, no edit but this file), from the tree at `5bbf1357b`. It maps every POSITIONS entry that decides a typing rule or the library's types, with his words, what landed, the designers' latest word and the dependencies; then the chain, the tensions (the 14 of the 2026-09-29 review re-read, and the ones found since), the points the designers left open, the open items that wait for him, and the check of the coordinator's candidate list. It holds evidence, not verdicts or recommendations; a Fable judgement reads it next. -->

# Pavol's decisions on types, read as one chain: the evidence

## 0. How to read this

### 0.1 What it is

- His question, 2026-10-23T08:08:00Z, cleaned: "The main goal here is to go with the original designer's intent as much as possible. So maybe my earlier decisions that are touching on types need to be re-evaluated for consistency. ... I am willing to back out of them, because it feels to me like there are always several ways to express the thing, the constraint, or some property of the standard library, and I already went well beyond my area of expertise ... The choices that I made maybe made sense locally, but as an interacting chain of constraints on this whole system, I suspect I made some unoptimal decision bending the original designer's intent against their wishes." In the same message: "I am very wary to go against POPL 2019's paper", "I'm no type system expert", "I was just like going by vibes of what I saw in other languages". At 08:19:00Z he approved the review, a Fable judgement on it, and batch 21 going on beside it.
- This is a map, not a verdict. Where the record itself reads a decision as finishing or departing, the entry says whose reading it is.
- The earlier review of 2026-09-29 is `explorations/reviews/decisions-review/`: `evidence.md` (29 entries D1 to D29, pinned at `be9a75b79`), `judgement.md` (Fable, `9172ab41f`) and `popl-recheck.md` (`c39a411ad`). Its D-numbers are cited here as "review D4", its tensions as "review tension 5", its section 6 items as "review item 3". Its content is reused, not redone.
- One disclosure. While reading the transcript around his 08:08 message for context, I read the coordinator's chat reply of 08:20:23Z, which lists seven "candidate conflicts" (the content, by its own words, of the candidate list that the brief says to read last). I read the list file itself only after Parts 1 to 5 were written. Part 6 checks it.

### 0.2 Words

Each term is defined once here, with a Fortress example where one helps.

- **Type, subtype.** A type is a set of values. `A` is a subtype of `B` when every `A` value is a `B` value. In revived Fortress `ZZ32` is not a subtype of `ZZ64` (the number types are siblings, F-131).
- **Trait, object.** A trait is like a Java interface that may carry method bodies; an object is a leaf type that nothing extends (`Specification/basic/traits.tex`).
- **Static parameter, instantiation.** A generic declaration's parameter, written `[\T\]`: a type, a size (`nat n`), a `bool` or an operator. `List[\ZZ32\]` is an instantiation of `List[\E\]`.
- **Bound, F-bound.** `T extends Number` bounds `T`. An F-bound names the parameter itself: `trait Integral[\I extends Integral[\I\]\]` (`Library/FortressLibrary.fsi:447`).
- **`Any`, `Object`, `Bottom`.** `Any` is the top type: it holds tuples, functions and `()`. `Object` holds the values of trait and object types only. `Bottom` holds no value and cannot be written (`Documentation/Specification/Prose/Language/types.tick:173-195`).
- **Intersection, union.** `A & B` holds the values in both; `A | B` (written ∪) those in either. Programs do not write them as types; the checker forms them.
- **Exclusion.** Two types exclude each other when no value has both: `trait Range ... excludes { Number }`. Exclusion is how the checker proves that two overloads never both apply.
- **Instantiation exclusion** (the record also says "the exclusion rule" and "multiple instantiation exclusion"). No type may extend two different instantiations of one generic trait. So `ZZ32` may not be both `Equality[\ZZ32\]` and `Equality[\ZZ64\]`. This is why a nested number tower breaks the rule (F-44).
- **Closed trait, `comprises`, coverage.** `trait AnyIntegral comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` closes the trait: every value of it is a value of a listed type. A set of types covers a type when every value of the type is in one of them (P-60).
- **Self type.** The fact that, inside a trait such as `Integral[\I\]`, `self` is also an `I`, the implementing type. Scala declares it (`this: S =>`); Rust builds it in (`Self`).
- **Overloading, dispatch.** Several declarations of one name. The checker picks the most specific applicable one from the static types; at run time, dispatch picks again from the values' types, on every argument (Julia's way, not Java's).
- **Domain, declared domain.** A declaration's parameter types. A generic declaration's declared domain is every argument type that some instance within its bounds accepts.
- **The three overloading rules** of the type group's 2011 paper (`Papers/Types/`) and of POPL 2019 (Fig. 5): **No Duplicates** (two declarations may not each apply wherever the other does), **Meet** (for two overlapping declarations, one is more specific, or a third declaration covers their overlap), **Return Type** (the more specific declaration's result type must fit the other's).
- **Coercion, promotion.** A coercion is a conversion that a type declares (`ZZ64` declares `coerce(z: ZZ32)`), inserted where no declaration fits without it. Promotion is the revival's rule that a generic call over a `ZZ32` and a `ZZ64` runs at `ZZ64`, the narrowest type both coerce into (P-74).
- **Expected type.** The type that a call's context requires, as `ZZ64` in `x: ZZ64 = f(3)`.
- **`where` clause, conditional extension.** A `where` clause states conditions on static parameters. Conditional extension is an `extends` entry that holds only where its condition holds: `List[\E\]` extends `LexicographicOrder[\List[\E\],E\]` only `where { E extends StandardTotalOrder[\E\] }` (P-151).
- **Existential reduction.** The 2011 paper's and POPL 2019's way to decide whether two generic declarations' domains overlap: collect the equalities that a shared value would force on their static parameters and solve them (P-152).
- **Variance, covariant.** Under `trait C[\covariant S\]` a `C[\Dog\]` is a `C[\Animal\]`, as Scala's `+S`. Fortress generics are invariant today (P-62).
- **Sound, proof scope.** A type system is sound when a well-typed program cannot go wrong at run time in the ways the types promise. A paper's proof covers only the language its calculus models; outside that scope the paper is silent, not opposed.

### 0.3 Sources, citations and abbreviations

- The designers' sources, latest first, as the brief orders them: the POPL 2019 paper (`research/extracts/ParkPOPL2019-extract.md`, full text `research/extracts/ParkPOPL2019.txt`); the 2012 patents (`explorations/reviews/mie-probes/patents-forest-rule.md`) and Naden's 2012 write-ups (`Papers/Types/journal/justificationOfRTR.tex`, `Papers/RuntimeInstantiation/`); the restart's Types chapter (`Documentation/Specification/Prose/Language/types.tick`, "Types" below); Welterweight (`Papers/Welterweight/`); the OOPSLA 2011 paper (`Papers/Types/`); the Working Draft of February 2011 (`Specification-1.0-frozen/`, "WD" below); the team's library and compiler at `a874948ac`. `explorations/coordinator/map/design-intent-sources.md` says where each kind of intent is written.
- `Specification/` is the revival's revision of the WD. A citation of it cites the revival's text unless the passage is the WD's unchanged.
- POSITIONS = `explorations/coordinator/POSITIONS.md`; FACTS = `explorations/coordinator/FACTS.md`; "row N" = a row of `explorations/fortress-gap-ledger.md`; "rq N" = item N of `explorations/coordinator/review-queue.md`; "audit" = `explorations/coordinator/positions-audit/`, whose per-entry reports are `full/evidence/P-N.md` and `trial/evidence/P-N.md`. Appendix I = `Specification/appendices/changes.tex`.
- His words are cleaned of dictation slips and cited by UTC time. Each was read verbatim, from the audit's per-entry reports (their quotes checked EXACT by `positions-audit/tools/hischeck.py`, `full/RESULTS.md`, "The checks") or printed with `explorations/coordinator/curator-profile/show.py`. Where an entry records a recommendation he took without stating its content, the entry says so and names where the recommendation is.
- Each entry is marked by when it was decided: "covered by review D-n" (decided before 2026-09-29 12:30 UTC and mapped then), "29 Sep" (decided on 2026-09-29 in answer to that review), or "new" (after it).

## Part 1. The decisions

Each entry: what it decides; his words, or the recommendation he took; what landed; the designers' latest word; what it rests on and what rests on it.

### 1.1 The roots: the rules by which the others were chosen

#### P-7 and P-8 **The goal is to finish what the designers intended ...** and **Where the designers' own sources ... give no answer, the curator decides by the goal ...** (covered by review F1)

- Decides: the goal is the designers' intent, judged by `Specification/` with the restart's Types chapter beside it, measured by microGPT compiled and fast; where the sources give no answer, he decides by that goal, "not by type-theoretic purity", staying true to the spirit of Fortress.
- His words: 2026-09-29T12:17:07Z, "I don't care about type theoretical purity and I'm accepting all unfinished corners of the language because I want to get to a compiled version of micro GPT ... But along the way, I want to stay true to the spirit of Fortress"; and, of the gaps, "I assume those people knew much more than I do right now" (audit `full/evidence/P-8.md`).
- Rests on it: every entry below. P-8's second sentence, "he takes the designers to have known more than he does", is the rule that his 08:08 message applies to his own type decisions.

#### P-25 **`Specification/` stays the standard, and the Types chapter of the team's 2012 restart is cited beside it.** (covered by review F3)

- Decides: the restart's Types chapter is the designers' latest word on its topics (instantiation exclusion, `covariant`, `Bottom` inexpressible); the revised specification follows it.
- His words: 2026-09-26T08:01:03Z, "Agreed.", under the pasted line "I recommend yes: on the rule S revises, it is the designers' latest intent" (audit `full/evidence/P-25.md` §1).
- Landed: F-166, F-167; the two-part form of the rule in `Specification/basic/types-vals-vars.tex` and `basic/traits.tex`.
- Rests on it: P-43, P-60, P-97, P-62. Note for Part 3: the same chapter says that "a tuple type excludes ... every trait type" (`types.tick:424`), which P-156's tuple rule meets.

#### P-26 **Where the type group's later positions conflict with the specification's early text, the later positions win.** (covered by review F3)

- Decides: the ranking of sources. The type group's later work (the compiler, the exclusion rule, the flattened prelude, Naden 2012, POPL 2019) wins over the WD's early text; "the revival does not second-guess them".
- His words: 2026-09-23T07:26:28Z, "The spec was written in a vacuum early on. And then the type group went in and tried to make it run ... The goal was performance. The specialization is a must ... when that wish met reality, then the spec must change ... We are not Naden. We know nothing here." 2026-09-29T17:34:18Z, "I will trust the team's work over whatever my misunderstanding of the things are." (audit `full/evidence/P-26.md`).
- Not his words: the sentence "The implementers' later word also outweighs unfinished text" was added by the coordinator on 2026-09-30 with no source (rq 215). The list of works inside the entry (POPL 2019, the prelude's flattening) was added later too (audit §1).
- On the rule itself: the 2026-09-29 review found that it ranks texts by date, while "the interpreter and its library are the group's too, and they kept the nesting" (`reviews/exclusion-design-brief.md:129-130`; review F3, item 5).
- Rests on it: P-43, P-48, P-152, P-153, P-154, and every "Why: P-26" in POSITIONS.

#### P-27 **The library's own practice is the standard.** (covered by review F2)

- Decides: what microGPT invented goes into the standard library in the library's own style; whoever extends the library first studies how it does the same kind of thing.
- His words: 2026-09-19T18:31:44Z, "it is a practice that is all over the standard library, and it looks like you are designing solution without the full context ... study the existing parts of the fortress library meticulously, and use those patterns for extending the standard library in the native way. And the same goes with the micro GPT's ... extensions that it invented need to go directly to the standard library in the spirit of the standard library." Narrowed later: 2026-09-20T07:20:24Z, "I don't want that we extend the library with some forms that are specific to our use case in C4. As long as the extensions that we did have a precedent in the library itself, I'm fine with that"; 2026-10-09T05:20:34Z, "I would at most admit to wanting to extend the standard library for the needs of C4 if it was missing an obvious extension ... like adding the scalar addition to the Matrix" (audit `full/evidence/P-27.md`). He holds P-27 for rq 216, which asks whether the narrower words are his rule.
- Rests on it: P-47, P-88, P-98, P-146 ("as P-44 does"), P-156, P-157.

#### P-37 **One library, the interpreter's, is the library that the compiler checks.** (covered by review D1)

- Decides: the interpreter's library becomes the compiled path's; the compiler's prelude is deleted at the switch-over. "The one library may take a design of the prelude's, as it took the prelude's flat shape of the number types."
- His words: 2026-09-20T14:33:50Z, "we need to unify this into a single library"; 14:39:06Z, "I fully believe that the compiler second library is just a bootstrap and we need to get rid of it" (audit `full/evidence/P-37.md`).
- Designers: the specification knows one default library (`Specification-1.0-frozen/library/structure.tex:15-18`); the split's own comment calls it a "Hopefully temporary hack" (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:110-111`) (review D1).
- Rests on it: every checker error on the interpreter's library becomes path work (the distance, F-53); P-43's reason, P-77, P-76 take the prelude's shapes; P-155 makes the zero mean "with symbolic operators checked".

### 1.2 Exclusion, the number tower and closed traits

#### P-43 **The exclusion rule stays, and the number tower is flat (route A).** With P-97 **The specification's examples that break the exclusion rule take the library's shapes ...** (covered by review D4, D12)

- Decides: the checker keeps instantiation exclusion; so the number types are siblings under `Number`, each with its own algebra, and `Number` has no catch-all operators. P-97: the WD's examples that break the rule take the library's shapes and stay beside them marked "Not allowed".
- His words: 2026-09-24T14:41:40Z, "Agreed. Route A it is.", to the coordinator's route ask of 14:36:56Z, which recommended route A; earlier that day, 01:02:52Z, on the five questions of the exclusion brief: "Coercion acceptable?"; on the patents' forest rule above the flattening: "Yes, because that was the teams last record on how to do the 'Fortress' way"; "without specialized code there will be no change at performance. But how a specialization is chosen 'ist mir egal', as long as it runs fast. Which clearly isn't an answer to the question"; 01:20:29Z, "I don't care about some type-theoretical reasons, such as numeric towers being expressed by sub-typing." 2026-09-29T12:17:07Z: the flattening "was something we adopted from the compiler's library for performance reasons, if I recall correctly" (audit `full/evidence/P-43.md` §1, §4).
- The record's reading of his reason is open: P-43's "the flattened prelude is the team's last record of the Fortress way" attaches to the flattening words he said about the other side, the forest rule (rq 219); rq 220 asks whether "He cares that specialised code runs fast, not how a specialisation is chosen" is his weighting. He holds P-43 for both.
- Landed: F-44 (the checker relies on the rule), F-131 (the flat tower), F-167 (the specification states the rule, examples "Not allowed"), F-168 (the number chapters). Tests `tests/FlatTowerRungF.fss`. Costs on record: 89 team test lines respelled, 21 of the team's 24 demos with an unwritten clause-form sum failing (review D4, item 4); F-46 prices a return to route C.
- Designers: for the rule, the 2011 paper (`Papers/Types/exclusion.tick:141-152`), Naden 2012 ("Fortress implements blanket multiple instantiation exclusion", `justificationOfRTR.tex:496`), Types (`types.tick:355-360`), POPL 2019 ([Anc-Same-Trait], extract §2). For a flat tower: Chase 2009 (`6896886fb`), Maessen 2009 (`128f313b5`), the prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:96-475`), the WD's own "These types are mutually exclusive" (`Specification-1.0-frozen/basic/types-vals-vars.tex:500-502`, kept at `types.tick:977-980`). Against: the WD's library chapters nest ℤ ⊂ ℚ ⊂ ℝ (`basic-lib/basic-integers.tex:195-196`, `basic-lib/numbers.tex:36-37`), the team's interpreter library nested to 2012 (`a874948ac:Library/FortressLibrary.fsi:273-533`, `Number comprises { RR64 }`, `ZZ32 extends { ZZ64, ... }`), the patents' forest rule, and Naden: "Fortress aims to support them [rings and fields] ... more work needs to be done in order to understand how to best support the numerical hierarchy" (`justificationOfRTR.tex:571-572`, `:630-632`). POPL 2019's [D-Method] keeps a covariant parameter out of parameter positions, so variance cannot rescue a self-typed tower (`popl-recheck.md` §1.1).
- Rests on: P-26, P-37. Rests on it: P-44, P-47, P-74, P-76, P-78, P-80, P-153, P-146 (route A "admits no self type" in the record's reading, `reviews/self-typed-bodies-judgement.md` §2 item 6), and through them P-157.

#### P-44 **`AnyIntegral` stays closed by its `comprises` clause, and the compiled checker reads the clause as the team's 2012 texts do.** (covered by review D3, D24)

- Decides: `AnyIntegral comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` stays; the team's `NOT YET` comment `comprises Integral[\I\] where [\I\]` stays beside it; the checker admits the unlisted generic `Integral[\I\]` when every type it knows below it is listed. The hole every reading but the 2008 one shares, a program's own `Integral` subtype in another component, stays open (row 487).
- His words: 2026-09-21T02:26:08Z "Others approved." (the closure as landed); 17:08:18Z, "We are writing NOT YET and ... whatever [the tracer] recommends, let's do that"; 2026-09-28T08:46:46Z, "Option 1, the checker accommodation is the direction that I'm leaning, but I would like to read that section of the report from Fable first"; 08:52:27Z "Option 1." (`reviews/anyintegral-comprises-judgement.md` §3). Later, 2026-09-29T12:17:07Z: "This goes then into those generic type code decisions I did about AnyIntegral, I have no idea what I was doing there" (audit `full/evidence/P-44.md`).
- Landed: F-62, F-72, F-171; rows 487, 489, 490; `compiler_tests/ComprisesGenericSubtrait`. F-121: the team's `where` spelling stays a comment, "no decision says whether it is a valid clause", though the checker now opens such variables (F-251).
- Designers: Types: an instantiation "is covered by the union of the types in this set" (`types.tick:384-389`); Welterweight: "no value can belong to the trait unless it also belongs to one of the comprised types" (`Papers/Welterweight/grammar.tick:21-22`); the WD's draft note reads the clause on types (`Specification-1.0-frozen/basic/traits.tex:231-234`); Maessen 2008: "we can't write a comprises clause that mentions Integral[\I\]" (`82c85b03a`) (review D24).
- Rests on: P-25, P-26, P-43. Rests on it: P-60's proof (row 487 is its open assumption), P-146 ("as P-44 does for the closure").

#### P-60 **The specification reads a `comprises` clause at the level of values.** (covered by review D27)

- Decides: "covers" is defined once; the Meet Rule gains a closed-trait case (several declarations below both overloads serve as their meet if together they cover it); a call between closed traits may have several most specific declarations, its type the intersection of their return types, the declaration that runs unique only at run time. The checker uses coverage only in its overloading rules; a declaration with static parameters is outside the proof.
- His words: 2026-09-29T10:58:53Z, "I am super scared that we are touching type theoretical things that I am totally unequipped to handle"; 11:20:08Z, "This is Pavol speaking and I have still no idea about type theory"; 11:25:37Z "Yes", to "option 1 with Astra's three points built into 7b's briefs, yes or no?" (`reviews/comprises-type-level-judgement.md:76-87`; proof addendum `reviews/comprises-type-level-proof-addendum.md`). The boundary for generic declarations has no word of his (audit `full/evidence/P-60.md` §1, thin). Its "requirement" sentence was moved by the coordinator's default at `4d7df29c3` (rq 276).
- Landed: F-76, F-175; rows 540, 543, 546, 547, 551, 559, 566; rq 6 (the closed-trait case for generic families).
- Designers: the WD's future-work list: "We agreed to revise the Meet rule to address this with the coverage check" (`Specification-1.0-frozen/appendices/future.tex:285`); Types names covering and never defines it (`types.tick:934`); Welterweight's Covered judgement (`fig-covered.tick:9-13`). POPL 2019 omits closed types, and keeps static uniqueness as a theorem (Theorem 4.1, extract §4.1); "this is the one place the revival's type theory steps outside the designers' last proven model" (`popl-recheck.md` §1.5).
- Rests on: P-25, P-44. Rests on it: P-147 (coverage counts as P-60 reads it), P-151's `AnyList` clause.

#### P-146 **In a self-typed trait, the compiled checker types `self` in the method bodies as also being the implementing type.** (new, 2026-10-13)

- Decides: in a trait `C[\X\]` whose `X extends C[\X\]`, `self` has the type `C[\X\] & X` in method bodies; signatures keep the plain trait type `C[\X\]`, "because the proofs of the POPL 2019 paper ... assume that no declared type holds a type parameter inside an intersection"; an extender at another type is refused (`object Bad extends Integral[\ZZ32\]`). The library gains no self type and no `comprises` clause; `Integral`'s `numerator` moves to each integer type. "Why: ... by one rule that peer languages share."
- His words: 2026-10-13T23:13:41Z, "Instead you should have explained what the trade offs for your options 2 and 3 are"; 23:23:46Z, "I'm unclear how clear the signal from later team's decisions is that justifies removal of `comprises` ... does latest POPL2019 paper help us decide this or not?"; 23:32:10Z, "I'm still unclear on what the consequences are, but am hearing that option 1 is more in line with weak signal from repo and has precedent in other languages as well"; 23:37:34Z, "1." The ask: the coordinator's 23:06:09Z text, "A checker rule, the Scala and Rust way"; the document: `reviews/self-typed-bodies-judgement.md:142-163`, way 6 (audit `full/evidence/P-146.md` §1).
- Widened by a default: a parameter bounded by a self-typed trait that the trait extends at it counts too, so the team's 2009 `Containment` mixins check. At 2026-10-14T00:07:32Z he did not recall "wording anything about mixins"; the coordinator took the widening at 00:08 (rq 212).
- Landed: F-225, built by climb batch 14 (`1c32ccffd`); the self-type class of the distance 29 to 0, the distance 85 to 55; `compiler_tests/SelfType*`; Appendix I "The type of self in a trait with a self-type parameter" (`changes.tex:3944-4060`). It refuses the demo `trips.fss` (row 710) and `PureList`'s `List` (row 355); a compiled body returning `self` fails JVM verification (row 695). Appendix I records the measured reason for the signature half: "with the intersection in the signatures, the domains of the two declarations of `CMP` on `StandardPartialOrder` and `StandardTotalOrder` became equivalent, and the compiled type checker reported 18 errors of the Return Type Rule that the declarations do not make".
- Designers: the WD types `self` as the enclosing trait, or with a `comprises` clause as `T ∩ (U1 ∪ ... ∪ Un)` (`Specification-1.0-frozen/basic/expressions/var-ref.tex:53-54`, `:64-69`); the team's compiled world spells the self type with `comprises T` (`Library/CompilerAlgebra.fsi:16`, `:24`, the same at `a874948ac`) and the team's test `XXX10k.test:13-29` pins the checker's `(T[\U\] & {U})`; Welterweight types `self` as the plain trait type (`fig-wellformeddecls.tick:55`) and leaves its "Self-typed generics" dispatch step commented out (`dispatch.tick:195-210`); Naden: the self-type idiom "should be more than simply an idiom and instead a separate construct which cannot be used as a first class type, but instead only in bounds ... Victor and John have started working on this sort of theory with their trolls. However, the visibility problem shows that this is not sufficient" (`justificationOfRTR.tex:626-632`); POPL 2019 has no self types (extract §6) and its matching completeness assumes no declared type holds a type parameter inside an intersection (pp. 11:21-22, extract §6). The judgement's own reading: "the type group's late positions ... do not speak with one voice here" (`self-typed-bodies-judgement.md` §2, item 3).
- Rests on: P-27, P-44 (the library's text read as written), P-26 (POPL as the boundary of the signature half), P-43 (no `comprises T`, route C's device). Rests on it: P-157 (vectors leave `AdditiveGroup` because signatures keep the plain type), the probe of 07:30 on 2026-10-23 for vectors' way back (put on hold at 08:10), rows 695, 710, 355.

#### P-147 **An object defines an inherited abstract method when its bodies of that name at narrower parameter types together cover the abstract method's parameter types.** (new, 2026-10-13)

- Decides: coverage defines an inherited abstract method, with `comprises` read as P-60 reads it; walk applies it at load, and its earlier allowance of any one narrower body goes; the traits chapter's sentence that admitted no narrower body is revised.
- His words: 2026-10-09T15:03:39Z, "OMG another one of these type system questions where I would need to study a book to reach a competent decision?"; 2026-10-13T23:43:34Z, "I don't see any other credible option to pick from. Why was this raised to my attention? (Not a criticism, a provenance Q)"; 23:49:12Z, "I accept the recommendation, basically just being informed of the spec edit based on later evidence." He named no option; "coverage, option 1" is the coordinator's reading (audit `full/evidence/P-147.md` §1). The wording is from `reviews/walk-load-readings-check.md:50`.
- Landed: F-145; rows 725, 728, 665. Row 670: the five demos refused at load are refused under either reading.
- Designers: Welterweight's Covered rule: "an abstract function with an argument that is a trait type with a comprises clause is considered to be covered if it is implemented for all the types comprised" (`Papers/Welterweight/static.tick:27-30`, `fig-covered.tick:9-13`); Steele's abstract-method check of the compiled checker (P-147's own words), which reads `comprises` clauses as the checker has since `59fdeff62` (`reviews/walk-load-readings-check.md:50`).
- Rests on: P-60. Rests on it: nothing beyond its own rows.

#### P-149 **An object that inherits an abstract functional method from one trait, and a body for it from a sibling trait, is refused unless it declares the method itself.** (new, 2026-10-15)

- Decides: Scala's way (a sibling trait's body implements the abstract method) is not taken; the checker refuses such an object, as walk already does; a trait with one method both abstract and with a body is refused.
- His words: 2026-10-15T04:18:00Z, he leaned to "the Scala way ... if that has a clean resolution" and asked why the library's use was not measured; 06:13:13Z, "you can pre-record my decision unless a hard evidence against it surfaces"; then 06:23:24Z, "Definitely. Option one, based on honoring the original designer's intent, we are not here to change the nature of Fortress in fundamental ways unless we must reconcile a conflict between earlier and later designer choices, then we look at other languages on how to resolve it. We are not bending Fortress the Scala way just for hypothetical convenience reasons." (audit `full/evidence/P-149.md`; the detour report `explorations/reviews/q1-abstract-sibling-detour.md`).
- Landed: built by climb batch 16's rung K; rows 572, 727, 734 closed (audit §5). The probe `perf-probes/abstract-sibling-body/REPORT.md`: no library type uses the shape.
- Designers: the specification's text and Welterweight refuse the object (the detour report, "In short"); walk's Meet Rule for Functional Methods (F-142).
- Rests on: P-26 (in the 06:23 form above). Rests on it: his 06:23 sentence is the clearest statement on record of the rule he applies to peers: other languages only to reconcile a conflict between earlier and later designer choices. The `coordinator` skill took it into its procedures on 2026-10-16 and then widened it by the coordinator's own settlement: "the peers weigh only where the team's earlier and later word conflict, or where the team left no word, as the curator weighed a peer's way for conditional extension on 2026-10-16 (POSITIONS P-151). Settled by the coordinator." (`.claude/skills/coordinator/references/sources.md:116-118`).

#### P-152 **Walk and the compiled checker read the exclusion of two generic declarations over their whole parameter types, by existential reduction.** (new, 2026-10-17)

- Decides: two generic declarations exclude when the equalities that a shared value forces on their static parameters cannot hold together; both paths read pairs so, and judge them by P-45's three rules.
- His words: 2026-10-17T11:36:44Z, "Agreed. Only one option makes sense. The option one. ... But do we know what to do with this? Or is it another probe?" The ask (by the cheaper Haiku model) gave the specification's text as the reason; the post-mortem found that text to be the revival's own, and `ba93d28ec` replaced the reason with the 2011 paper. No message of his reviews the new reason (rq 228; audit `full/evidence/P-152.md` §1). On 2026-10-19T21:38:34Z he asked that design decisions taken on Haiku's recommendation be re-assessed "regardless of my approval".
- Landed: F-258, climb batch 19's rung P (`14e91723f`); rows 740 and 741 promoted; open: row 786 (`tint`, contested, "which path moves is open"), 787, 788.
- Designers: the 2011 paper's existential reduction (`Papers/Types/exc-reduction.tick`); POPL 2019 (Fig. 6, the `ArrayList`/`List` example, extract §2).
- Rests on: P-45, P-26. Rests on it: the `tint` question (rq 9).

### 1.3 Overloading, dispatch and inference

#### P-45 **Overloaded declarations may differ in their static parameters.** (covered by review D17; walk clause new, 2026-10-16)

- Decides: the WD's sentence that forbids it goes; the specification states the 2011 paper's model and its three rules; the checker checks the Return Type Rule over every instance; one positional rule survives as a restriction of the compiled path; walk chooses by declared parameter types; "Walk and the checker must accept the same pairs."
- His words: 2026-09-26T12:07:33Z "Yes, agreed."; 12:08:32Z "Agreed, the judgement's recommendation." (`reviews/overloading-judgement.md`). The walk clause: 2026-10-16T19:47:32Z, "Does this mean bringing it in line with the compiler's checker behavior? Then yes ... apparently these questions were asked with minimal context, so I'm grasping at straws" (audit `full/evidence/P-45.md` §1).
- Landed: F-50, F-75, F-174, F-223, F-26, F-27, F-252, F-274, F-275, F-77 (the library's repairs). Open, by P-45's own list: rows 539 (walk refuses the POPL paper's valid example at load; compiled, the checker accepts it and the run dies, row 537), 779, 780, 759 (`g[\T\](a: T)` beside `g(a: Any)`: walk refuses, the checker accepts, F-274), 786 to 788; row 542 (the checker refuses a pair the 2011 paper accepts).
- Designers: WD `basic/overloading.tex:100-107` forbade it, with the team's own doubt in `appendices/future.tex:236-266`; the 2011 paper (`Papers/Types/introduction.tick:326-331`, `rules.tick:158-180`); POPL 2019's Fig. 5, which also has no positional rule (`popl-recheck.md` §1.3).
- Rests on: P-26. Rests on it: P-46, P-48, P-152, P-155, P-156, P-157 (the overload check that refuses the pairs).

#### P-46 **A conversion only makes a call possible: it never changes which declaration runs when one already fits.** (covered by review D25)

- Decides: the declaration is chosen on declared domains; a generic one applies if some instance takes the arguments; then promotion instantiates it. His own broader rule (apply any conversion that reaches a specific declaration) is not taken.
- His words: 2026-09-28T13:10:04Z, "we must make it fast, and generic is never fast. So make it fast."; 13:32:53Z, "Option 2. Fast generics over Any ... pick fast generic code that can be specialized in JVM"; 13:51:00Z, "I am slapping rule on the rule without knowing the global consequences of my choices"; then 19:06:50Z, "C-O. Both recommendations for batch N accepted." (`reviews/conversion-overloading-judgement.md:57-73`). The numeral tie rule (`ZZ32`, or by magnitude) is a default with no word of his (audit `full/evidence/P-46.md` §1).
- Landed: F-55, F-73, F-137, F-173; row 537 (compiled dispatch between two generic declarations); walk's promotion from run-time types moved to F-137 by the coordinator's default (rq 272).
- Designers: the WD's coercion order, "we first determine whether there exists a declaration that is applicable without coercion" (`Specification-1.0-frozen/basic/conversions-coercions.tex:454-462`); promotion and the tie rule fill a gap (review D25).
- Rests on: P-45, P-74. Rests on it: P-47, P-49, P-48 ("the rule sets the instance, not which declaration runs").

#### P-48 **A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.** (29 Sep, replacing item 30's instance)

- Decides: an unfixed parameter's instance is the intersection of its upper bounds (`Any` if none), narrowed at checking by the expected type and at run time by the call's static type; never `Bottom`, never the union, never the value's type alone. The library's `fail`, `builtinPrimitive` and `List`'s empty comprehension keep the team's unbounded declarations.
- His words: 2026-09-29T17:34:18Z, "if I apply the rule that the later team's work supersedes the previous one, and you are saying the rule is coming from the paper and it helps us cleanly resolve something, then I will trust the team's work over whatever my misunderstanding of the things are. So you can record that." He named no option; option 1 is the coordinator's reading (audit `full/evidence/P-48.md` §1). 2026-10-03T04:14:20Z, "yes, put the library back to the team's own declaration".
- Landed: F-78 (checker), F-84 (the unbounded declarations), F-141 and F-143 (walk), F-271, F-273 (the specification states the paper's rule; both paths take the value's type where it differs); row 538 (the compiled dispatcher lacks the static return type, phase 5); walk keeps `Bottom` in rows 587, 591, 612. The coordinator's call of climb batch 15, walk's join for an unwritten reduction, "reads past the letter of one, P-48's last clause" (rq 210; F-228).
- Designers: POPL 2019: "the dynamic dispatch algorithm presented here always chooses the intersection of the upper bounds", the union of lower bounds being what "we were unable to complete the proofs" for (p. 11:25; extract §4.2); "never instantiates method type parameters with Bottom" (p. 11:19). Welterweight took the lower bound (`dispatch.tick:67`, `:189-192`).
- Rests on: P-26, P-46, P-42 (`Any` when a parameter has no bound). Rests on it: P-78's unwritten big operators (row 731), the phase-5 dispatcher.

#### P-49 **The compiled checker tries a call first by subtyping, without the expected type, and coerces its arguments only when that attempt is not kept.** (29 Sep, the review's item 4)

- Decides: the first attempt is subtyping without the expected type, kept when its result converts; only then coercion with the expected type.
- His words: 2026-09-29T15:26:18Z, "Recommendation one makes sense. I don't understand how I have contradicted it. Because coercion should be tried when there are no matches."; 15:49:10Z, "on item four, we are recording the recommendation number one" (audit `full/evidence/P-49.md`).
- Landed: F-78, with four attempts in order; the second (subtyping with the expected type) and the fourth (coercion without it) are an agent's choice (rq 2; rq 273 moved that sentence to FACTS by default). Row 507.
- Designers: as P-46.
- Rests on: P-46. Rests on it: P-51.

#### P-50 **The body of a `label` expression, and each value that an `exit` gives it, take the expected type of the whole `label`.** (new, 2026-10-09)

- Decides: as its title; the same as a `typecase` clause.
- His words: 2026-10-09T06:55:25Z, "I didn't know that Fortress had go to ... I suspect I might have just agreed with some defaults ... the go to block gets the same inference mechanism like function bodies get, which makes sense"; 06:59:48Z "(a) has a yes" (audit `full/evidence/P-50.md`).
- Landed: F-87.
- Designers: the WD's inference chapter is a heading and notes, 27 lines (`Specification-1.0-frozen/basic/inference.tex`; F-169); the list of contexts in `Specification/basic/inference.tex` is the revival's.
- Rests on: the `typecase` ruling of batch 11's Q2 (he did not recall it, 06:55). Rests on it: P-51.

#### P-51 **The checker retries a call written as another call's argument against each declaration's parameter type.** (new, 2026-10-09)

- Decides: if no attempt accepts `f(g(x))`, the checker re-checks `g(x)` with each declaration of `f`'s parameter type as its expected type; the "wide" form, every inner call with inferred static arguments.
- His words: 2026-10-09T06:55:25Z, "I would say this is all about unifying the type inference rules everywhere and we are covering gap about cases that they didn't implement yet. So if the mechanisms are well specified and they are just not implemented and we have an idea how to get there, let's go for this"; 22:10:09Z, "Q48(b) wide, go ahead" (audit `full/evidence/P-51.md`; `reviews/argument-context-probe.md:285`).
- Landed: F-221; walk gives an argument no expected type (row 705).
- Designers: none on inference (F-169).
- Rests on: P-49, P-50. Rests on it: the reductions' plain-bounded big operators (F-221).

#### P-155 **The compiled checker checks the overloads of symbolic operators before the switch-over.** (new, 2026-10-20)

- Decides: the overload check reads `+`, `^`, `||`, the subscripts and every symbolic operator before the distance can count zero; each design the check needs comes to him before its rung.
- His words: 2026-10-20T11:52:00Z, "I'm leaning to option 2 before the switchover. Otherwise, we are just sweeping problems under the rug. This sounds like something that needs a probe and designing how to handle each of those operators. Am I right?" Earlier: 2026-10-16T20:14:17Z, "Can't we bring them in line (to agree)? HOLD"; 2026-10-17T11:23:52Z, "Should we just like start checking them and have a fix ready?" (audit `full/evidence/P-155.md`). The ask recommended option 1, after the switch-over.
- Landed: the probe only. F-245: the full check adds 186 errors at `d97001d19`; 54 clear by known library fixes, 124 wait on the subscripts' design, 8 on the vectors', 3 are crashes on `||` (`perf-probes/symbolic-operators-2/REPORT.md` §0-2). Row 584.
- Designers: the WD's own appendix calls the library's two subscripts "not really a valid overloading" (`Specification-1.0-frozen/appendices/future.tex:186-207`); the team's checker skipped symbolic names (row 584).
- Rests on: P-37 (the zero that the switch-over needs), P-45 (the rules the check applies). Rests on it: P-156, P-157, and batch 21's 186 sites.

#### P-156 **A collection's index type extends `Index`, a trait that the ranges exclude, and a tuple of indices is an `Index`.** (new, 2026-10-23)

- Decides: every index parameter of the library's generic indexed types is bounded `I extends Index`; `ZZ32` extends `Index`; `Range` excludes it; "a tuple type whose elements are all `Index` types is itself an `Index`, on both paths and in the specification: a typing rule that changes no value". A `where` constraint `I excludes Range[\I\]` (way S5) was weighed and not taken. `BoundedRange`'s narrowed `atMost` is dropped, the coordinator's default (POSITIONS-history, P-156).
- His words: 2026-10-23T06:37:29Z, on S5: "So some of my decisions prevent us from trying this way. Why?" (the coordinator, 06:38:50Z: "None of your decisions forbids S5. The probe set it aside without measuring it, by reading your decision on `where` clauses too narrowly"); 06:46:53Z, "What is this magic? I need to understand ... I am unfamiliar with the specific fortress syntax, so I need a primer ... now is a good time to teach me a lot so that I can make an informed decision understanding why the option one is the best"; after the coordinator's primer of 06:49:00Z, 06:49:32Z, "Option one is OK, next question"; 06:57:47Z, "Is there no way by the indices to fix the atMost that you said is now excluded?" (show.py).
- Landed: not built. The probe measured S1 with the tuple rule: 124 errors gone, none new; without the tuple rule 73 new errors and walk stops microGPT at `MicroGptFlat.fss:60` (`mr = 0.0 MAX m0`); with walk's rule, `testSystem` 668 of 668, `testSpecData` 130 of 130, microGPT 7 of 7, 30 array demos unchanged; cost 40 library edits, 4 checker lines plus an unwritten exclusion side ("its checker says a tuple is an Index and also excludes it, a contradiction the rung must fix", the coordinator at 06:49:00Z), 9 walk lines, one specification rule; a user's `Indexed[\E, Any\]` is refused (REPORT §3.1). At 08:10:14Z the coordinator proposed to hold it out of batch 21 for this review; at 08:19:00Z he said that batch 21 is not held for it, since its type items are reversible, and the coordinator confirmed it at 08:20:23Z. So it is a candidate of batch 21.
- Designers: the bound is the team's own fix for this pair: "We want to say that the type variable I extends a type, say, Index which either excludes Range[I] or is a supertype of Range[I]. However, we cannot say that because ... we write a[1, 2, 3] where the arguments are passed as a tuple ... we need a magic to convert that tuple argument expression to something of type Index" (`Specification-1.0-frozen/appendices/future.tex:198-207`). On tuple types: "Every trait type also excludes every arrow type and every tuple type" (`Specification-1.0-frozen/basic/types-vals-vars.tex:214-215`); "Tuple types cannot be extended by trait types" (`:265`); "A tuple type excludes any non-tuple type other than Any" (`:272-273`); Types: "Every trait type excludes Void, Bottom and every tuple type" (`types.tick:341`), "A tuple type excludes Bottom, Void, and every trait type, arrow type or function type" (`:424`). S5's form is the WD's open question "Type variables in excludes clauses" (`future.tex:209-212`), with no grammar. POPL 2019: tuples are not values in its calculus (extract §1).
- Rests on: P-155, P-45, P-42 (`Indexed[\E, Any\]`), P-56 (`(:)` stays a range over `Any`, so `BoundedRange` cannot take the bound), P-77 (ranges and their pairs and triples of `ZZ32`), P-151 (as the probe read it, which set S5 aside). Rests on it: batch 21's subscript rung (not held, his word at 08:19:00Z).

#### P-157 **`Vector` and `Matrix` are not additive groups for now, so the arrays' scalar `+` and `-` stand beside the vectors' own.** (new, 2026-10-23)

- Decides: `Vector` and `Matrix` keep their own `+`, `-` and unary `-` but no longer extend `AdditiveGroup`; arrays exclude every additive group, as `Array3` does; generic code over `AdditiveGroup`, such as `SUM` over vectors or `zero`, no longer takes them. "Why: the scalar block that microGPT uses (P-88) and the team's additive-group vectors cannot both pass the overload check while it reads a self-typed trait's `self` in a signature as the plain trait type (P-146); the library's consistency gives way, since it must not hold up microGPT."
- His words: 2026-10-23T07:09:03Z, "So you are saying that one of my extensions in the revival is a problem, and if I just revert that one, will be good. Is that the gist of it? And you say we can return to it at a later point in time. If so, then agreed. It was a nice to have consistency on the library. It should not stop us going to the micro GPT." The coordinator, 07:11:16Z: "Not quite. Option 1 keeps your extension and gives up the team's choice instead, but your conclusion still holds." POSITIONS-history's block for P-157 records that "his 'if so' read the change as reverting the revival's scalar block, which it keeps". He did not answer again on the point; at 07:30:06Z he asked whether a probe could make vectors additive groups again, and at 08:08:00Z wrote the message that opened this review (show.py).
- Landed: not built. The probe's A2: 6 lines in 2 files, the 8 errors gone, none new, `testSystem` 668 of 668, microGPT 7 of 7, demos unchanged; it "gives up `SUM` and `zero` over vectors and matrices, which nothing measured uses, and it departs from the team's Vector extending AdditiveGroup" (REPORT §3.2, §5 question 2). Proposed for holding out of batch 21 at 08:10:14Z; not held, his word at 08:19:00Z, so a candidate of batch 21.
- Designers: the team's library: `trait Vector[\T extends Number, nat s0\] extends { AnyVector, Array1[\T,0,s0\], AdditiveGroup[\Vector[\T,s0\]\] }` and the same for `Matrix` (`a874948ac:Library/FortressLibrary.fsi:1459-1460`, `:1577-1578`); its scalar block was `opr +(x: Array[\ZZ32,ZZ32\], y: ZZ32)` and its three siblings, at `ZZ32` only (`:2537-2540`). The generic block is the revival's (`02d09a39f`, 2026-09-19; F-119, F-156: "the comment on its scalar-extension block is the revival's, not the team's"). The team never had both (REPORT §3.2, "History").
- Rests on: P-146 (its stated reason), P-88 (the block), P-87 (no model operator becomes a function call), P-155, P-45. Rests on it: P-78's `SUM` no longer reaches vectors; P-28's wish (algebra reaching matrices) moves further off.

### 1.4 Bounds, `where` clauses and variance

#### P-42 **A type parameter declared without a bound has the implicit bound `Any`, not `Object`.** (29 Sep, the review's item 3)

- Decides: as its title; the specification states `Any` with a callout; the compiled path bounds by `Object` until the switch-over (row 412).
- His words: 2026-09-29T13:57:39Z, "So yes, we go with Any, because that's the status quo"; 14:02:25Z, "Okay, that seems like an absolute no-brainer. Option one ... It is just like a cleanup so that later workers do not get confused, right?" (audit `full/evidence/P-42.md`).
- Landed: F-265, F-174; Appendix I "The implicit bound of a type parameter" (`changes.tex:3005`).
- Designers: WD: "If a type parameter does not have an extends clause, it has an implicit extends Object clause" (`Specification-1.0-frozen/basic/trait-parameters.tex:49-50`); Types: `Any` is the top (`types.tick:178-182`); POPL 2019: "By default, each type parameter has an upper bound Any" (p. 11:9; `popl-recheck.md` §1.7).
- Rests on: P-26. Rests on it: P-48 (`Any` if no bound), P-56 (`(:)` over `Any`), P-156 (`Indexed[\E, Any\]` refused under the new bound).

#### P-151 **Only the `where`-clause forms that the team wrote down are built: conditional extension, a function's or a method's condition, and `AnyList`'s `comprises` clause.** (new, 2026-10-16)

- Decides: the three forms; members of a conditional extension are checked with the condition holding; the team's commented `AnyList comprises List[\E\] where [\E\]` becomes live; `SUM`'s fusion with `MAX` and `MIN` stays, cleared by a method condition and the team's commented generic `distribute`. "Why: a feature with little support in the team's work bends the language beyond what the curator can review. He has such a feature built where the team left enough design intent for it, or where it is on the critical path to running fast compiled."
- His words: 2026-10-16T11:18:08Z, "when we are supposed to introduce some language feature which has little support in the original team's work, we are basically bending the language ... If you say like it is easy thing and there are enough breadcrumbs or design intention from the original team, we might as well do it. If you say it is on the critical path to having it run fast in a compiler, we will do it"; 12:14:17Z, "it sounds like I would be leaning to implementing this feature because the type papers tell us how there are precedents from other languages"; 12:35:52Z, "The rules feel solid ... and all the peers do it. So if we know how to implement this, I would go for it ... do matrices support additive group or multiplicative ring only if their elements are numbers that have these traits? I think this is a desirable thing"; 15:53:43Z, on the probe's removals, "Like, we just delete this and pretend we don't need it. I don't like that"; 16:42:39Z, "3 for the where clauses." (show.py; audit `trial/evidence/P-151.md`). The coordinator's 15:55:06Z option 3 said "build what the team left, and add nothing they didn't".
- Landed: climb batches 17 and 18: F-242, F-243, F-244, F-250, F-251, F-255, F-256. The probe beforehand: "of the thirteen checker errors filed as waiting on it, twelve go away with ordinary edits of the library that change no answer microGPT or the walk tests compute ... and the thirteenth, the ordering of lists, needs a list to count as ordered only when its elements are ordered" (`perf-probes/where-clauses/REPORT.md:1`, A.0). Open: row 701 (the code generator refuses a declaration whose own header carries a `where` clause, so the fused `distribute`'s method condition will not compile after the switch-over), row 773 (members stay callable where the condition fails; the compiled run dies at link time), row 774 (walk and the compiled run time read the extension at every instance), row 777, row 799 and rq 188 (`addLeft` and `addRight` stayed in `AnyList`, against his option 3), rq 175 to 178.
- Designers: the wind-down post counts "conditional inheritance via where clauses" among the three things the team "wish[ed] we had explored further" (`research/extracts/fortress-websites-wayback.md:124-126`); the WD: "Widening and where clauses are not yet supported" (`Specification-1.0-frozen/basic/conversions-coercions.tex:15`); the team's `not yet` comments, `comprises Maybe[\T\] where [\T\]` and `comprises Array[\T,E,I\] where [...]` (`a874948ac:Library/FortressLibrary.fsi:814`, `:1059`); the team's lexicographic traits bounded by a total order (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`).
- Rests on: P-149 (its rule on bending), P-27. Rests on it: P-154 (conditional extension of `List`), P-156 (S5 set aside by reading P-151 as a closed list, which the coordinator called too narrow at 06:38:50Z on 2026-10-23), P-44 (whether the team's `AnyIntegral` spelling becomes live, F-121).

#### P-154 **A list is ordered only where its element type is totally ordered.** (new, 2026-10-20)

- Decides: `List` extends its lexicographic order only where `E extends StandardTotalOrder[\E\]`; a list of floats or `QQ` has no `<` or `CMP` on the checker, though its `=` stays; a pair of floats stays ordered, "the curator accepted that mismatch as a cost of the list rule"; no lexicographic trait over partial orders is added.
- His words: 2026-10-20T06:18:00Z, "Agreed. We are not designing a new trait at this point. It's nowhere on the critical path to compiling microGPT that runs fast. Why/how did it even enter into the agenda if it's not affecting the distance to switchover?" "Option 1" and "as landed" are the coordinator's labels (audit `full/evidence/P-154.md` §1).
- Landed: F-255 (climb batch 18's rung X, `372b9bf6a`); row 774 (walk still orders every list); the tuples' rule is not decided here, and rq 213 reopens it: `(1,()) < (2,())` and, under walk, `(1,2) < (1,2.5)` are now refused, costs the yes did not see.
- Designers: P-154's source, the incomplete lexicographic traits, bounds the element by a total order (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`; by `git log --follow`, written 2007-09-26 to 2008-03-25); the team's live library at its last commit orders every list unconditionally, `trait List[\E\] extends { AnyList, LexicographicOrder[\List[\E\],E\] }` with `LexicographicOrder ... extends { StandardTotalOrder[\T\], ... }` (`a874948ac:Library/List.fsi:67`, `a874948ac:Library/FortressLibrary.fsi:1196-1198`), and the team's QuickCheck keys a `Map[\Any,ZZ32\]` by lists of `Any` (`Library/QuickCheck.fss:1069`, `:1080-1082`); the WD orders every list (`Specification/advanced-lib/algebraic-constraints.tex:519-522`, `basic/operators/opr-overview.tex:293-295`, sentences not yet revised, PLAN phase 3 item 19).
- Walk's half measured (a probe of 2026-10-23, `perf-probes/walk-conditional-extension/REPORT.md`, read while checking the candidate list): the shadow of row 774's fix turns 10 interpreter tests red, 4 of them the team's (`booleanGuard` 2007, `asifTest` 2008, `RangePrototype` 2008, `QuickCheckTest` 2010), and the team's specification example `Generators.GeneratorDefn`; by three mechanisms: (A) walk builds `<|1, 2|>` at the run-time class `List[\Int\]` (row 364), and `Int` is a `StandardTotalOrder[\ZZ32\]`, not `[\Int\]`, so every unwritten list of numerals or string literals loses its order; (B) the library's `=/=` and three-argument `assert` reach a list's element-wise `=` only through `LexicographicOrder`, a defect today for any type with its own `=`; (C) P-154's intended loss, which QuickCheck meets. `List` extending `Equality[\List[\E\]\]`, the library's way for `Map`, clears 7 tests and the example; with two written `[\ZZ32\]` and QuickCheck keyed by printed form, both suites pass. No demo or microGPT value moves (its "In short"). Its four questions are in Part 5.
- Rests on: P-151, P-26. Rests on it: batch 21's walk rung for row 774 (not held: the coordinator kept it in batch 21 at 08:20:23Z, as reversible, after his word at 08:19:00Z that batch 21 is not held).

#### P-90 **`Maybe`'s empty case is the team's parametric `Nothing[\T\]`, in the one library and the specification.** (covered by review D29)

- Decides: as its title; the bare `Nothing` is future work gated on a `where` form neither path implements.
- His words: 2026-09-21T21:20:29Z, "Maybe's empty case, keep team's parametric spelling. Document the future work gate on where clause availability." (audit `full/evidence/P-90.md`).
- Landed: F-21, F-167. Rq 224: the specification refuses the bare `Nothing` by instantiation exclusion, with or without a `where` clause, so the gate may never open; he holds P-90 for it.
- Designers: the WD's `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}` (`Specification-1.0-frozen/basic-lib/convenience.tex:40`), which neither path parses (F-21).
- Rests on: P-43 (exclusion). Rests on it: P-151's reading of what "the team wrote down" covers.

#### P-62 **The `covariant` keyword is future work, off the path to microGPT.** (covered by review D29)

- Decides: declaration-site variance carried to run time on both paths is future work; when it lands, the sign-refined number types are retried as covariant parameters.
- His words: 2026-09-26T08:05:26Z, "Does that go into the ledger somewhere as future work, after we get the compiler running, or is it on the critical path to get to it?"; 08:18:07Z "Agreed."; 11:38:29Z, "when we get to covariant that we try this. Let me try to resurrect this." (audit `full/evidence/P-62.md`).
- Landed: row 404 (the checker accepts variance; the compiled run dies with `IncompatibleClassChangeError`).
- Designers: Types adds the keyword (`types.tick:322-339`); POPL 2019 is its formal account, and says carrying variance to run time needs the static return type at every call (extract §3; `popl-recheck.md` §1.10).
- Rests on: P-25. Rests on it: P-80's road back.

### 1.5 Walk's half

#### P-12 **After the switch-over, walk runs the compiled type checker on its programs, and then uses the static coercions that the checker inserts.** (covered in part by review item 7)

- Decides: as its title; walk is not changed for this before the switch-over.
- His words: 2026-09-15T10:42:06Z, "one of the lower hanging fruit is to run the type checker optionally in the walk"; 2026-09-29T14:07:20Z, "when we start running the type checker in the walk it will gain types and can switch" (audit `full/evidence/P-12.md`).
- Landed: F-9. Rq 232: "usable" or "refuses every program the checker refuses" is not said; rq 268: P-48's former "walk ... always will" contradicted it, resolved by a default.
- Designers: none on walk with static types; the WD's coercion is static (`Specification-1.0-frozen/basic/conversions-coercions.tex:567-570`).
- Rests on it: P-59, P-76's walk half (Q-walk), P-48's walk sentence.

#### P-59 **Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over.** (29 Sep, the review's item 7)

- Decides: as its title; a callout states the limit; two expected-failure tests record it.
- His words: 2026-09-29T14:07:20Z, "item seven as recommended. So one now and two after the switch. It's just a decision that at the moment we do not touch the walk system until we switch the library" (audit `full/evidence/P-59.md`).
- Landed: F-128; `tests/XXXCoercionStaticRungC.fss`, `XXXCoercionStaticNarrowRungC.fss`; Appendix I "The interpreter's choice of a coercion" (`changes.tex:3148`).
- Designers: "Notice that coercion is resolved statically ... the statically chosen coercion is applied at run time" (`Specification-1.0-frozen/basic/conversions-coercions.tex:567-570`).
- Rests on: P-12. Rests on it: F-137's walk promotion, F-228's walk join (rq 210 reads P-59 as covering it).

### 1.6 Numbers

#### P-66 **The integer principle: Java's and the JVM's defaults stay where they make sense, and are corrected where they fail high performance or mathematical precision.** (covered by review D8)

- Decides: as its title; a hardware behaviour gets its own spelling; where the JVM prevents a correct implementation, the project gives way for now; peers Julia, X10, Swift, Rust.
- His words: 2026-09-22T07:17:57Z, "we should use Java or JVM defaults where it makes sense, but we shouldn't be shy to correct the mistakes of the JVM when seen through the lens of high performance and mathematical precision language ... high performance languages should give you tools to stay close to the metal ... Swift and Rust type of reasoning"; and "I don't feel informed yet to make a call on this but this is my thinking process" (audit `trial/evidence/P-66.md`).
- Designers: the designers corrected Java's defaults in places, as `round` half to even on rationals (review D6) and in Steele's 2016 slide on "bad experience with Java's BigInteger" (review judgement, D8); the specification's wrapping and saturating operators (`Specification-1.0-frozen/basic/operators/opr-overview.tex:172-176`, `:205-209`).
- Rests on it: P-74's explicit `ZZ64` into `RR64`, P-69's shifts, P-77's `ZZ32` ranges (by the JVM's array length).

#### P-74 **Mixed integer widths convert by declared coercions: each wider integer type declares a `coerce` from each narrower integer type, as the compiler prelude does.** (covered by review D16)

- Decides: exact conversions are implicit, a lossy one is written out (`ZZ32` and numerals into `RR64` implicit; `ZZ64` into `RR64` explicit); a generic call over mixed widths infers the narrowest type its arguments coerce into; `widens` deferred.
- His words: 2026-09-26T12:01:24Z, "Option 1, agreed.", to the coordinator's 11:43:42Z presentation (`reviews/flattening-questions-ways.md`, "Question 2"); 2026-09-27T11:59:10Z, "My answer 8 promotion rule ... you placed it in phase 3. I never placed it in any phases" (audit `full/evidence/P-74.md`).
- Landed: F-131, F-55, F-137, F-173; Appendix I "Integers in floating-point expressions" (`changes.tex:1126`). Rows 509, 511. Under walk `nanoTime()` answers a `ZZ64` (row 75), so a team demo's timing line that divides it by a float stops: the first stop of 9 demos and a later stop of 5 more, all cleared by row 791's `asFloat(t)` (`perf-probes/team-demos/REPORT.md`, "In short", a probe of 2026-10-23 read while checking the candidate list). The team wrote those lines for its tower, in which a `ZZ64` was an `RR64` (`a874948ac:Library/FortressLibrary.fsi:335`, `:370`, `:406`, `:408`, `:495`, `:533`: `ZZ64` below `ZZ`, `Integral`, `AnyIntegral`, `QQ` and `RR64`).
- Designers: "Fortress supports the automatic conversion of integer values to floating-point values" (`Specification-1.0-frozen/basic/conversions-coercions.tex:64-66`), a general sentence; the WD's own example declares `ZZ64 coerce(z: ZZ32)` (`:549-565`); the prelude declares every exact integer pair and no integer-to-float coercion (review D16). Promotion fills a gap (F-169).
- Rests on: P-43, P-66. Rests on it: P-46, P-75, P-47.

#### P-75 **`NN32` coerces into `RR64` implicitly, since every `NN32` value converts to `RR64` exactly.** (29 Sep, the review's item 9)

- Decides: as its title; "with the coercion, an operator that both `RR64` and `ZZ64` declare is ambiguous on both paths for a `ZZ32` with an `NN32`"; each way to build it changes a decided behaviour.
- His words: 2026-09-29T14:10:36Z, "if it fits, then there should be direct conversion. No question about it. Is that the option one?" (audit `full/evidence/P-75.md`); the review's item 9 had recommended it (`decisions-review/judgement.md:370-375`).
- Landed: not built. Row 575 (contested): with the coercion, 5 of the 18 walk tests that use `NN32` go red, two of them the team's (`UnsignedTest.fss:51`, `fib13.fss:17`), and the checker refuses `z + u`; rq 21 lists the three ways, each changing a decided behaviour.
- Designers: as P-74.
- Rests on: P-74's own criterion. Pulls against: P-74's promotion (Part 3).

#### P-76 **An integer numeral has a type of its own, `IntLiteral`, which each number type converts from: in the interpreter's library now, and under walk once walk has the checker's static types.** (covered by review D21; the split 29 Sep)

- Decides: the prelude's working `IntLiteral` in place of the WD's unfinished numeral types; the library half now, walk's half (Q-walk) after the switch-over.
- His words: 2026-09-27T09:45:13Z, "walk needs to be corrected and switched to using IntLiteral"; 09:53:53Z, "yes, go ahead"; 2026-09-29T13:51:02Z, "I can answer the item eight by accepting the recommendation ... the first option" (the team's warning quoted whole and measured); 15:18:44Z, "with the int literal, I think the split option three makes most sense. So, yes to that" (audit `full/evidence/P-76.md`).
- Landed: F-79, F-74, F-131; Appendix I "The type of an integer numeral" (`changes.tex:3592`); row 578; walk's gaps rows 79, 443, 454, 486, 395, 511; rq 245 (`RR32` is left out of "each number type"); rq 22 (`z = 0` goes through `Number`'s catch-all `=`).
- Designers: "numerals have their own types ... This approach allows library designers to decide how numerals should interact with other types of objects by defining coercion operations" (`Specification-1.0-frozen/basic/expressions/literals.tex:132-148`); "We need to describe the Numeral type hierarchy" (`:83-95`); the prelude's sibling `IntLiteral` (`CompilerBuiltin.fsi:390-429`); the team's warning, "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals" (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:497-498`).
- Rests on: P-43, P-74, P-12. Rests on it: P-153 (a numeral's sign never reaches a type, F-262), P-46's numeral tie rule.

#### P-77 **Scalar ranges are over `ZZ32` only, as the compiler's prelude declares them.** (covered by review D23, decision 1)

- Decides: as its title; a range over another integer type is a static error; a range of rank 2 or 3 is a tuple of `ZZ32` ranges; the public range traits stay generic in their index type.
- His words: 2026-09-27T15:24:22Z, "ranges can realistically have only ever be ZZ32 because that's the largest array size on JVM"; 19:23:07Z, "Option 1, ZZ32". Later, 2026-10-09T07:05:31Z, on the open range: "maybe I am now ruling against some generic indexing type, like somewhere before I said that the indexes are ZZ32 because I was always thinking about how to iterate over arrays" (audit `full/evidence/P-77.md`).
- Landed: F-133, F-170; Appendix I "The integer type of a range" (`changes.tex:1330`); the WD's ℤ factorial as a product over a range became a recurrence (review tension 13).
- Designers: the WD's ranges name no integer width (`Specification-1.0-frozen/basic/expressions/ranges.tex:43-44`), and two of its examples build `ZZ64` ranges; the prelude's ranges are over `ZZ32` (`a874948ac:Library/CompilerLibrary.fsi:121`, `:151-152`); the team's interpreter library had generic ranges (`Range[\I\]`).
- Rests on: P-66 (where the JVM limits a correct implementation), P-37 (the prelude's shape). Rests on it: P-56, P-156 (the ranges' pairs and triples are the matrix indices that need the tuple rule).

#### P-78 **`SUM` and `PROD` are one generic reduction each over the library's algebra, in place of the team's catch-all over `Number`, and take their identity from the static argument.** (covered by review D15)

- Decides: `SUM` over `AdditiveGroup`, `PROD` over `MultiplicativeRing`; a clause form whose element type nothing fixes writes its static argument; `BIG MAXN` and its siblings go; `MAX` and `MIN` get no identity.
- His words: 2026-09-26T14:05:27Z, "Agreed, option A", with the two model lines shown as diffs; 15:48:10Z, "I don't trust your judgement at all on this. I want to hear what fresh Fable has to say on this."; 16:21:41Z, "I accept the recommendation ... when the where clause is available, it needs to be revisited" (audit `full/evidence/P-78.md`).
- Landed: F-59, F-60; row 731 (the checker fixes no F-bounded big operator's parameter from the clauses; 3 of today's 5 distance sites); row 436; two model lines changed as approved (`MicroGptFlat.fss:43`, `:28`).
- Designers: the WD's `Identity[\+\]` and `HasIdentity` need `where` clauses and operator parameters (`Specification-1.0-frozen/advanced-lib/algebraic-constraints.tex:772-797`); the team commented its catch-all as a "Hack to permit any Number to work non-parametrically" (`reviews/exclusion-design-brief.md:48`). POPL 2019's proof does not cover F-bounded method parameters such as `SUM`'s (F-271).
- Rests on: P-43. Rests on it: P-157 (vectors no longer reach `SUM`).

#### P-47 **Each integer type declares its own `MIN`, `MAX` and `MINMAX`, instead of relying on those that it inherits from the generic order traits.** (covered by review D25, decision 2)

- His words: 2026-09-28T19:06:50Z, "C-O. Both recommendations for batch N accepted." No other word of his on it (audit `full/evidence/P-47.md`).
- Landed: F-138; `tests/IntegerMinMaxRungM.fss`.
- Designers: `QQ`, `RR64`, the prelude and the WD's ℤ declare their own (`reviews/conversion-overloading-judgement.md:81`).
- Rests on: P-43, P-46. The inherited `MAX` "types `self` as the order trait", the problem that P-146 later addressed in bodies.

#### P-153 **The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction.** (new, 2026-10-20)

- Decides: each integer type's `^` returns its own type at every exponent; at a negative exponent, 1 and -1 give their power, 0 raises `DivisionByZero`, other bases raise `IntegerOverflow`; a fraction needs a float or rational base.
- His words: 2026-10-19T23:55:49Z, "This seems like a consequence of flattening the numeric tower, and much of the existing library design depends on this tower ... I feel we likely need a combination of several options to rebuild the original behavior of the numeric tower ... Can't we somehow use clever overloads to split the negative exponents away from the positive ones?" (cleaned at `reviews/integer-power-fable-judgement.md` §1); 2026-10-20T00:44:34Z, "Yes." Later, 05:56:19Z: "This is not how I recall the resolution to the power question. We designed some kind of split solution." The premise "each integer `^` answers its own type" has no message of his (audit `full/evidence/P-153.md` §1, thin).
- Landed: F-263, F-262, F-261; climb batch 20's rung I (`5ad4a9957`), 6 distance sites; three team tests and three demos rewritten to a float base (P-79); rows 441, 523 on the compiled prelude.
- Designers: the WD's tower gave ℤ^ℕ an integer and ℚ^ℤ a rational (`Specification-1.0-frozen/basic-lib/basic-integers.tex:137`, `basic-lib/numbers.tex:344-355`); the team's code never ran that rule: the interpreter typed every integer power `RR64` on a tower where integers were floats, the prelude typed `ZZ32 ^ ZZ32 : ZZ32` (`CompilerBuiltin.fsi:267`, `:326`, `:385`) (`integer-power-fable-judgement.md` §2.3). The judgement names the three legs of the tower's answer and the decision that set each aside: subtyping (P-43), a numeral type that carries its value (P-76), sign-refined types (P-80) (§2.2).
- Rests on: P-43, P-76, P-80, P-26. Rests on it: the demos' rewrites, row 533 (the model's `10.0^(-5)`, rq 29, rq 277).

#### P-80 **The specification's sign-refined number types are a superseded design: a program tests such a subset of a type at run time.** (covered by review D14)

- His words: 2026-09-26T11:38:29Z, "Option 1, agreed. But let's make sure we clearly record the original design and ... when we get to covariant that we try this. Let me try to resurrect this." (audit `full/evidence/P-80.md`).
- Landed: F-168, F-52; `Specification/advanced-lib/numbers-advanced.tex` kept word for word under a callout.
- Designers: `RationalQuantity` with boolean flags, one operator "needs more work here" (`Specification-1.0-frozen/advanced-lib/numbers-advanced.tex:15-27`, `:364`); the WD's "mutually exclusive" sentence and the exclusion rule refuse it (review D14).
- Rests on: P-43, P-62. Rests on it: P-153.

#### P-68 **On the float types, `floor` and `ceiling` return the same float type, while the brackets ⌊x⌋ and ⌈x⌉, `round` and `truncate` return `ZZ`, the unbounded integer.** (29 Sep, the review's item 1; reverses his 09-21 rule)

- His words: 2026-09-29T15:18:44Z, "As I read number one, that is the only logical choice, right? And I was probably confused when I chose anything else. So floor returns float. Let's record this as decided." (audit `full/evidence/P-68.md`).
- Landed: not built; one library rung after the switch-over (row 330).
- Designers: the 2008 release and the team's interpreter api keep the float for `floor` and `ceiling` and give `ZZ64` for the brackets and `truncate` (`a874948ac:Library/FortressLibrary.fsi:328-332`); the WD's "all ℤ" is stated of ℚ (`Specification-1.0-frozen/basic-lib/numbers.tex:457-462`) (review D6).
- Rests on it: P-54's later consistency.

#### P-54 **`QQ`'s `ceiling` and `truncate` keep `ZZ`, their declared result type, and raise an error at +∞, −∞ and 0/0.** (new, 2026-10-09)

- His words: 2026-10-09T07:28:28Z, "QQ's ceiling and truncate per your recommendation that we first make it pass and then we'll later make it consistent with the ruling on float" (audit `full/evidence/P-54.md`).
- Landed: climb batch 12; Appendix I "The rounding of an infinite or indefinite rational" (`changes.tex:3808`); row 795 (the later consistency).
- Designers: the WD's paragraph returned the argument itself at those values (`Specification/basic-lib/numbers.tex`, "Rational Numbers", revised).
- Rests on: P-68.

#### P-57 **`LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached.** (new, 2026-10-09)

- His words: 2026-10-09T15:10:56Z, "you recommend to declare the team's parameter TotalComparison, which takes the count to zero. Hey, let's do it. I have no idea what I'm deciding on, but let's push forward to zero ... I haven't understood anything of the description" (audit `full/evidence/P-57.md`).
- Landed: the count's last api error removed; row 582.
- Designers: the team's own `isLeftZero(_:Comparison) = true`, unreachable as written.
- Rests on: P-37 (the count's zero). An overload choice inside the library, not a typing rule.

#### P-98 **`TotalComparison` extends `StandardMinMax[\TotalComparison\]`, so that the library's `BIG MIN` and `BIG MAX` work over total comparisons.** (29 Sep)

- His words: 2026-09-29T17:44:02Z, "I can't focus very much on reading this whole, so I'll have to rely on your recommendation there ... the default stays, it doesn't block the run ... we should go over it one more time later where you explain it to me in more detail when I have more energy" (audit `full/evidence/P-98.md`).
- Landed: F-44, F-77; row 461.
- Designers: the library's own device for its other ordered types; the exclusion rule forced `TotalComparison` off `StandardTotalOrder[\TotalComparison\]` (F-44).
- Rests on: P-43 (exclusion), P-27.

### 1.7 Sizes, arrays and the library's algebra

#### P-28 **Fleshing out the standard library is a very important task.** (covered by review Part 3 (a) item 9)

- Decides: the library's next layer is algebra (`Ring`, `Field`, what matrices and tensors need), so that its algebraic traits reach them; parked off the path; square matrices as a ring and diagonal matrices as a commuting ring wait beside it.
- His words: 2026-09-15T10:42:06Z, "I'd like to see that shape of the library extended so that ... the machine learning concepts with the matrices and tensors have the mathematical rigor that this flavor of library construction promises"; 2026-10-16T12:35:52Z, "do matrices support additive group or multiplicative ring only if their elements are numbers that have these traits? I think this is a desirable thing, but again, I have no idea what I'm talking about"; 13:01:50Z, "Park both with the algebra work." (audit `full/evidence/P-28.md`).
- Landed: none. F-151 (the arrays' element bound `Number & MultiplicativeRing`, an agent's default after P-86 was struck, rq 31); F-152 (`Vector` and `Matrix` are today the only array traits with an algebra).
- Designers: the WD's algebraic-constraints library, `Ring` and `Field` at `Specification-1.0-frozen/advanced-lib/algebraic-constraints.tex:1547-1556` and `:1767` on, never shipped; commented out in `Library/incomplete/` (map, "Numeric tower and the algebraic traits").
- Pulls against: P-157.

#### P-40 **Sizes are checked, and a size that inference leaves unknown is an error only where it is used.** (covered by review D13, D20, D22, D26; ask 3 new, 2026-10-20)

- Decides: the checker checks `nat` and `int` parameters; a size beyond `NN32` or `ZZ32` is refused; an unknown size is an error where it reaches a type, a name or a value; a call that cannot fix a size of the declaration it would choose is refused; sizes count in instantiation exclusion; a size used as a number converts to `ZZ32` as a numeral does; the 17 vector and matrix operators declare only the sizes their types use.
- His words: 2026-09-21T16:57:37Z, "the middle is a clear winner"; 2026-09-26T09:24:48Z, "Option 1, sizes count"; 12:20:23Z, "Agreed, decision 3 stands"; 2026-09-27T06:44:55Z, "Fuck yes, that's not even a question."; 2026-09-28T19:17:29Z, "Option 1, go ahead."; 2026-10-20T05:42:24Z, "I agree with the recommendation. The patch made sense to me." (audit `full/evidence/P-40.md`).
- Landed: F-67, F-69, F-140, F-35, F-264, F-48; rows 400, 406, 446, 527.
- Designers: "These parameters are instantiated at runtime with numeric values ... in any context that a variable of type ℕ32 can appear" (`Specification-1.0-frozen/basic/trait-parameters.tex:82-90`); Types: instantiations exclude when "the corresponding arguments for any non-covariant parameter are not type equivalent" (`types.tick:357-360`); the team's checker "Todo: Handle int, nat, bool args" (row 406); the inference chapter is a stub (F-169).
- Rests on: P-84, P-25. Rests on it: P-55, P-41, the phase-5 array design.

#### P-41 **On the compiled path, a size static argument travels at run time as a descriptor object, as a type argument does.** (covered by review D5)

- His words: 2026-09-24T16:17:27Z, "All right. B it is."; 2026-09-26T09:44:10Z, "Agreed, (b) factory" (audit `full/evidence/P-41.md`).
- Landed: F-129, F-39 (operators stay compile-time names).
- Designers: "Intent does not choose": design A is the team's operator path, B fills the slot the code generator reserved (`CodeGen.java:5317-5328`), the factory is the team's instantiation pattern (review D5).
- Rests on: P-84.

#### P-55 **A size may hold arithmetic, compared by its written form once its numerals are computed.** (new, 2026-10-09)

- His words: 2026-10-09T13:51:11Z, "Item 15: 15a with (b) yes." Earlier, 2026-10-02T11:29:43Z: "I think I cannot yet make an informed decision on this point. Is this addition of arithmetic on the sizes, does it have support in a specification? Or are we deviating from it somehow?" (audit `trial/evidence/P-55.md`).
- Landed: F-146, F-176, F-222; row 683 (contested: two size parameters that may be equal); rq 32.
- Designers: the library's own storage writes `s0 s1` (review Part 3 (a) item 10); the team's Q&A in `Specification/appendices/internal-document.tex` answers that a size name may equal a numeral.
- Rests on: P-40.

#### P-84 **An `RR64` array is stored as a Java `double[]`, unboxed, and arrays keep the team's `nat` sizes in their types.** (covered by review D2)

- His words: 2026-09-19T18:32:48Z, "I don't know [that] we can sidestep the nat issue. That is a central design point that they are using. And yes, we must go to double array for performance ... If this should have been high performance language, it cannot be boxed." (audit `full/evidence/P-84.md`).
- Landed: the sizes half (F-67, F-20); the store waits for phase 5.
- Designers: sizes in types (`trait-parameters.tex:82`); unboxing intended (`compiler/optimization/Unbox.java:12-19`); `NatReflect.fss:38-40`, "we ought to build it in" (review D2).
- Rests on it: P-40, P-41, P-85, P-87's decision D.

#### P-85 **The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D.** (covered by review D2)

- His words: 2026-09-25T23:36:16Z, "Row 40: close as no decision taken."; 2026-09-22T05:21:45Z, "I am fine with delaying the array work after the switchover to the library. But at the same time, like I think we should do the whole prep for the arrays." (audit `trial/evidence/P-85.md`).
- Defaults landed on the same ground, not his answers: way 4a, a size known only at run time read as fixed for that call (F-270; rq 30, rq 229), and the arrays' element bound `Number & MultiplicativeRing` (F-151; rq 31), both built by climb batch 13 after his question of 2026-10-09T15:10:56Z whether forks 2 and 3 could go into the next batch.
- Rests on: P-84. Rests on it: phase 5.

#### P-87 **The model's text is the notation, and the vocabulary is repaired around it.** (covered by review D29, D23 decision 4)

- Decides: no model operator is replaced by a function call to pass an overload check; a repair that changes a model line is shown to him as a diff first; decision D waits for phase 5.
- His words: 2026-09-19T18:13:00Z, "NO. NO! NOOOOO! That's not Fortress!", at `planeSum(mask, ...)` for `mask + ...`; 2026-09-27T19:34:10Z, "Yes. Agree with recommendation." (decision D's diff written and parked). The diff rule has no message of his (rq 223; audit `full/evidence/P-87.md`).
- Landed: F-58 (C4 had 26 errors of its own on an earlier library, 14 with decision D's diff).
- Rests on it: P-88, P-157 (A3, dropping the scalar `+` and `-`, would change `MicroGptFlat.fss:28` and `MicroGptApl.fss:42`, `sm`'s `z - (BIG MAX z)`).

#### P-88 **The model's vocabulary leaves `+`, `-` and `MAX` between an array and a scalar to the library's scalar-extension block, and its diagonal keeps its own product.** (covered by review D3, D29)

- Decides: the vocabulary declares no array-and-number operator; the library's generic scalar block serves them; `Diag extends Matrix` and overrides `mul`; a read-only matrix trait `ReadableArray2` is wanted.
- His words: 2026-09-21T02:26:08Z, "Others approved." (the block of `02d09a39f`, among four changes, P-44's evidence); 2026-09-24T18:30:37Z, "Okay, agreed. That is the plan. And now a critique. Like, why did I have to invent this solution? Why wasn't it obvious to you or the workers?" (the diagonal); `ReadableArray2` is the coordinator's word, not his (audit `trial/evidence/P-88.md`).
- Landed: F-119 (eight generic declarations, `T extends { Number, AdditiveGroup[\T\] }` for `+` and `-`, `Library/FortressLibrary.fsi:2702-2712`), F-156 (the block's comment is the revival's); rows 299, 798. MicroGPT relies on it: `MicroGptFlat.fss:28` `z - (BIG MAX z)`, `:60` `0.0 MAX m0`.
- Designers: the team's block held only `ZZ32` arrays with a `ZZ32` (`a874948ac:Library/FortressLibrary.fsi:2537-2540`); a diagonal as a subtype of a matrix with its own product is what the type system promises (his 2026-09-24T18:13:14Z words); `reviews/library-scalar-extension-review.md` judged the four changes of `02d09a39f`.
- Rests on: P-27 (as his 2026-10-09T05:20 words read it: scalar addition on `Matrix` is his example of an obvious extension), P-87. Rests on it: P-157.

#### P-89 **`fill` takes a value, `tabulate` a function.** (covered by review D18)

- His words: 2026-09-26T12:17:35Z, "Agreed, tabulate." (audit `full/evidence/P-89.md`).
- Landed: F-158, F-49; 32 demo lines; row 464.
- Designers: the WD's arrays figure has both `fill` forms; under the bound `Any` the pair is an invalid overloading (review D18).
- Rests on: P-42, P-45.

#### P-56 **The open range `(:)` keeps its wildcard type, and its five cutting methods fail.** (new, 2026-10-09)

- Decides: `TrivialOpenRange` stays an `OpenRange[\Any\]`; `truncL`, `truncR`, `every`, `imposeStride` and `atMost` on it are `fail` bodies; `(:)` as a range over `ZZ32` is not taken.
- His words: 2026-10-09T07:05:31Z, "I am leaning towards option three" (the `ZZ32` range); 14:54:50Z, "when we ran the probe P3, I understood that basically it made all the things worse ... So I guess only option A with the fail bodies works ... But I still don't understand like what I'm fully deciding on"; 15:01:26Z, "OK then." (audit `full/evidence/P-56.md`).
- Landed: five `fail` bodies; `ProjectFortress/tests/TrivialOpenRange*Stop.fss`; the probe P3 (`reviews/ranges-and-index-types.md` §5): 64 of 186 programs differ under the other way.
- Designers: the team's `object TrivialOpenRange extends OpenRange[\Any\]` (`a874948ac:Library/FortressLibrary.fsi:2089`), `Any` as a wildcard index type.
- Rests on: P-77, P-42. Rests on it: P-156 (`Range` must stay unbounded for `(:)`, so `BoundedRange` cannot take the `Index` bound and its narrowed `atMost` goes).

### 1.8 Entries not mapped, and why

- Value rules, not typing rules: P-67 (`round` half to even), P-69 (shifts; its "count of any integer type" is a library signature), P-70 (`GCD`, `LCM`), P-71 (overflow guards), P-72 (`narrow`), P-73 (walk raises `IntegerOverflow`), P-52 (`narrowToRange`), P-53 (`String`'s `left` and `right` answer the `Maybe` they declare).
- Process, record or tooling: P-9 to P-11, P-17, P-19, P-29, P-30, P-32, P-33, P-38, P-39, P-58, P-79, P-91, P-95, P-96, P-102, P-103, P-124, P-125, P-148, P-150. P-79 (demos kept running) carries costs of type decisions (row 710 from P-146, row 731 from P-78, row 791 from P-74's explicit `ZZ64` into `RR64`), which Part 3 cites.

## Part 2. The chain

### 2.1 The dependencies, drawn

An arrow reads "forced or shaped". Each arrow is the reason that the later entry's own text or its history gives, cited in Part 1.

```
P-26 later word wins ──┬─> P-43 rule kept, tower flat ──┬─> P-74 coercions (+ P-66 JVM rule) ─> P-46 ─> P-49 ─> P-51
P-37 one library ──────┘        │                       ├─> P-76 IntLiteral sibling ──┐
                                │                       ├─> P-80 sign types gone ─────┼─> P-153 power split on the base
                                │                       ├─> P-47 own MIN/MAX           │   (+ P-26 "team's later code")
                                │                       ├─> P-78 SUM over AdditiveGroup ── reach narrowed by P-157
                                │                       ├─> P-98 TotalComparison
                                │                       └─> P-97 examples "Not allowed"
                                │            P-74 ─> P-75 NN32 into RR64  (pulls against P-74's promotion)
                                │
P-25 Types chapter ─> P-44 AnyIntegral closure ─> P-60 comprises on values ─> P-147 coverage defines abstract
                                │                       └─> P-151's live AnyList clause
                                │
P-26 ─> P-45 static params may differ; walk = checker ─> P-152 existential reduction ─> tint (row 786) open
          └─> P-155 symbolic operators checked (+ P-37's zero) ─┬─> P-156 Index bound + tuple rule
                                                                └─> P-157 vectors leave AdditiveGroup
P-27, P-44, P-43, POPL's proof scope ─> P-146 self in bodies, plain in signatures ─> P-157
P-87 model text fixed ─> P-88 generic scalar block ─> P-157
P-42 bound Any ─> P-48 bound, never Bottom ─> F-84, F-228 (walk's join, a coordinator's call)
P-42 + P-77 ranges ZZ32 ─> P-56 (:) over Any, fail bodies ─> P-156 (BoundedRange cannot take the bound)
P-149 do not bend Fortress ─> P-151 only the team's where forms ─┬─> P-154 lists ordered only when total ─> row 774 (walk)
                                                                  ├─> row 701: header where not compiled
                                                                  └─> S5 set aside for P-156 (a narrow reading)
P-84 double[] + nat sizes ─> P-40, P-41, P-55 ─> P-85 open (way 4a and fork 2 built at defaults)
P-12 walk gets types later ─> P-59 walk coerces by value ─> F-137, F-228
```

### 2.2 Where a decision's reason is another decision, not the designers' word

- **P-157.** Its stated reason is two decisions: "the scalar block that microGPT uses (P-88) and the team's additive-group vectors cannot both pass the overload check while it reads a self-typed trait's `self` in a signature as the plain trait type (P-146)". The designers' word on the point is the team's library, which P-157 overrules: `Vector` and `Matrix` were additive groups (`a874948ac:Library/FortressLibrary.fsi:1459-1460`, `:1577-1578`), and the generic block they give way to is the revival's (`02d09a39f`; F-156).
- **P-156.** The `Index` bound is the team's word (`future.tex:198-207`). Two of its parts rest on revival decisions or readings: `BoundedRange` keeps no narrowed `atMost` because P-56 keeps `(:)` a range over `Any`, which rests on P-77's `ZZ32` ranges; and the tuple rule is the probe's reading of the team's "magic" as subtyping, against a coercion that would change every index value (`perf-probes/symbolic-operators-2/REPORT.md` §5, decision 4). S5 was set aside "by reading your decision on `where` clauses too narrowly" (the coordinator, 2026-10-23T06:38:50Z).
- **P-146.** The signature half rests on POPL 2019's proof scope (the paper has no self types; its matching assumes no type parameter inside an intersection in a declared type) and on a measurement (18 spurious Return Type errors on `CMP`). The body half rests on "one rule that peer languages share" (Scala, Rust) and on P-44's habit of reading the library's text as written, where the team's own compiled-world idiom (`comprises T`) and Naden's identification (`justificationOfRTR.tex:580-582`) were weighed and not taken.
- **P-154.** Rests on P-151 (conditional extension) and on what it calls the team's later code (`Fortress.PartialTotalOrders.fss:117-140`, in `Library/incomplete/`, written 2007-2008), while the team's live `List` at `a874948ac` ordered every list.
- **P-153.** Rests on three decisions that removed the tower's three legs (P-43, P-76, P-80; `integer-power-fable-judgement.md` §2.2) and on a premise, "each integer `^` answers its own type", which the audit found no message of his to take (audit `full/evidence/P-153.md` §1).
- **P-147.** Rests on P-60's reading of `comprises`, which is the revival's reading of the team's plan of 2009 (`future.tex:285`).
- **P-75.** Rests on P-74's own criterion ("a conversion that fits is implicit"), and contradicts P-74's promotion (row 575).
- **P-56.** Rests on P-77: no range over `ZZ32` is a range over `Any`, so no cutting body can answer its declared type.
- **P-47.** Rests on P-46's promotion and on P-43: the inherited `MAX` types `self` as the order trait.
- **P-49, P-51.** Rest on P-46, his decision 1, and on his "unify the type inference rules everywhere" (P-51).
- **P-50.** Rests on batch 11's `typecase` ruling, which he did not recall (2026-10-09T06:55:25Z).
- **P-152.** Its first reason was the specification's text, which is the revival's own (`576b4c287`); `ba93d28ec` replaced it with the 2011 paper, unreviewed by him (rq 228).
- **P-57.** Rests on the count's zero (P-37, P-39): "I like getting the checker counts to zero."
- **P-90.** Its gate is a `where` form that the revised specification refuses anyway by instantiation exclusion (rq 224; F-21).

### 2.3 Where his own reason came from other languages

His 08:08 words, "going by vibes of what I saw in other languages", match these entries on record:

- P-66: "Swift and Rust type of reasoning"; Julia and X10 named.
- P-89: the ask's reason, which he took with "Agreed, tabulate." and which P-89 now states: "in every peer language that has `fill`, `fill` takes the value".
- P-54: the ask's reason named Python's and Julia's `floor` of an infinity; he took the recommendation.
- P-146: "has precedent in other languages as well" (2026-10-13T23:32:10Z); the entry's "Why" says "one rule that peer languages share".
- P-151: "the type papers tell us how there are precedents from other languages" (2026-10-16T12:14:17Z); "all the peers do it" (12:35:52Z).
- P-149, the other way: "We are not bending Fortress the Scala way just for hypothetical convenience reasons" (2026-10-15T06:23:24Z), after he had first leaned to Scala's way (04:18:00Z, 06:10:54Z).

### 2.4 Where he said, at the time, that he did not follow the question

- P-44: "I have no idea what I was doing there" (2026-09-29T12:17:07Z, on the `AnyIntegral` decisions).
- P-45, the walk clause: "these questions were asked with minimal context, so I'm grasping at straws" (2026-10-16T19:47:32Z).
- P-46: "I am slapping rule on the rule without knowing the global consequences of my choices" (2026-09-28T13:51:00Z).
- P-48: "I will trust the team's work over whatever my misunderstanding of the things are" (2026-09-29T17:34:18Z).
- P-50: "I suspect I might have just agreed with some defaults" (2026-10-09T06:55:25Z).
- P-56: "I still don't understand like what I'm fully deciding on" (2026-10-09T14:54:50Z).
- P-57: "I have no idea what I'm deciding on, but let's push forward to zero" (2026-10-09T15:10:56Z).
- P-60: "I have still no idea about type theory" (2026-09-29T11:20:08Z).
- P-98: "I'll have to rely on your recommendation there" (2026-09-29T17:44:02Z).
- P-146: "I'm still unclear on what the consequences are" (2026-10-13T23:32:10Z).
- P-147: "Why was this raised to my attention?" (2026-10-13T23:43:34Z).
- P-153: "This is not how I recall the resolution to the power question" (2026-10-20T05:56:19Z, after the decision).
- P-156: "I need a primer on how to correctly read type declarations ... now is a good time to teach me" (2026-10-23T06:46:53Z), then "Option one is OK" three minutes after the primer.
- P-157: answered on the premise that his own extension would be reverted (2026-10-23T07:09:03Z); the premise was corrected at 07:11:16Z.

### 2.5 Defaults inside the chain that wait for him

Choices that agents built and that the record lists for his review, each part of a decision above:

- P-49's second and fourth attempts (F-78; rq 2, needed before the switch-over).
- Walk's join for an unwritten reduction, which "reads past the letter" of P-48 (F-228; rq 210).
- P-146 widened to the team's `Containment` mixins (F-225; rq 212, before the switch-over).
- Way 4a, a size known only at run time read as fixed for one call (F-270; rq 30, before the switch-over), on the ground P-85 leaves open (rq 229).
- The arrays' element bound `Number & MultiplicativeRing` (F-151; rq 31), after P-86, which stated it as his rule, was struck on 2026-10-21.
- `BoundedRange`'s narrowed `atMost` dropped with P-156 (POSITIONS-history, P-156), and the probe's three small questions (`|_|`, the `AnyList` crash, `Float`'s `^`) at their defaults (the coordinator, 2026-10-23T07:11:16Z).
- The tuples' order bound, built at way 1b on the standing go, then counted as settled by P-154's yes (rq 213, reopened).
- `addLeft` and `addRight` kept in `AnyList`, against his option 3 of P-151 (rq 188, row 799).

## Part 3. The tensions

### 3.1 The 14 tensions of 2026-09-29, re-read against what landed since

The tensions are the earlier map's list (b) (`decisions-review/evidence.md:446-461`); the judgement's sorting is at `decisions-review/judgement.md:268-290`.

| # | The tension then | What landed or was decided since | Today |
|---|---|---|---|
| 1 | One library and the library's practice against route A's shapes (the prelude's flat tower, `ZZ32` ranges, sibling `IntLiteral`, own `MIN`/`MAX`) | More shapes taken from the prelude (P-76's library half, F-79) and from the revival's own extensions: P-157 lets the revival's generic scalar block outrank the team's additive-group vectors; P-156 adds an `Index` trait the team named but never declared. P-27 is held for rq 216 (whether only extensions with a precedent go in). | Live, and wider; see N2. |
| 2 | Row 330's reason (ℤ under ℝ64) gone under route A | Reversed by him on 2026-09-29T15:18:44Z: `floor` and `ceiling` keep the float, the brackets, `round` and `truncate` give `ZZ` (P-68), the review's option 1. P-54 adds `QQ`'s later consistency (row 795). | Settled in decision; not built (row 330, a rung after the switch-over). |
| 3 | Answer 8 against the WD's general sentence on integers into floats | Unchanged and recorded. The review's tidy (item 9) became P-75, which conflicts with answer 8's promotion (row 575, contested; rq 21). | Turned into N7. |
| 4 | The implicit bound `Any`, taken as a default | Decided in his words (P-42, 2026-09-29T14:02:25Z); POPL 2019 confirms it (`popl-recheck.md` §1.7); Appendix I states it (`changes.tex:3005`). | Settled; new reach through P-56 and P-156 (N6). |
| 5 | "No open discrepancy" against walk's run-time coercion | Accepted as walk's limit (P-59), with its callout and two expected failures. | Settled for coercion; part of the wider list in N5. |
| 6 | His conversion rule against the checker's attempt order (row 508) | P-49 decided; built with four attempts, two of them an agent's (F-78; rq 2). | Settled in decision; two attempts wait for his review. |
| 7 | Answer 12's premise against the written `extends Object` (row 447) | P-48 takes POPL 2019's rule; the checker never binds `Bottom` (F-78); the written bounds went (F-84, his word 2026-10-03T04:14:20Z). Walk keeps `Bottom` in rows 587, 591 and 612. | Settled on the checker; walk's rows open. |
| 8 | A size as ℕ32 against a size used as a value as ℤ32 | Unchanged; consistent. Where an oversized size used as a value is refused has no place (rq 34). | Settled; one placement open. |
| 9 | The notation rule against the reversible stops | Rq 223 asks whether "shown as a diff first" is his rule at all. No model line changed outside his approvals; P-157's A3, which would change `MicroGptFlat.fss:28` and `MicroGptApl.fss:42`, was not taken. | Open as a record question. |
| 10 | "Resurrect" the sign types when covariance lands, against no phase for covariance | Unchanged (P-62, row 404). P-153's judgement names the covariant road as the only way back for the third leg of the tower's power. | Unchanged. |
| 11 | The algebra layer against route A's `Number` (array bodies `T extends Number`) | Fork 2 gave the array family a ring element bound (F-151, an agent's default, rq 31). P-157 then removes `AdditiveGroup` from `Vector` and `Matrix`. His wish of 2026-10-16T12:35:52Z, matrices as additive groups only where their elements are, has a mechanism since P-151 (conditional extension) and no plan. | Live, and deeper; see N2. |
| 12 | The team's `IntLiteral` warning | Measured and quoted at his word (P-76, R8); the library half landed with each integer type's own comparisons (F-79); walk's half is Q-walk (phase 4); row 578. | Settled for the library; walk's half waits. |
| 13 | Ranges over `ZZ32` against the notation (the WD's factorial) | Unchanged; two further consequences: P-56's `fail` bodies and P-156's `BoundedRange` (N6). | Live, wider. |
| 14 | Test first against the landing rules | Process; outside this map. | Not re-read. |

### 3.2 The tensions found since, and the ones that the chain shows

Each gives the two sides with their evidence, and what each side costs in the tree today, from the record's measurements.

#### N1. P-156's tuple rule against the designers' tuple types

- One side: P-156 makes "a tuple type whose elements are all `Index` types ... itself an `Index`", so a tuple type becomes a subtype of a trait type. Without it, the `Index` bound refuses every matrix and walk stops microGPT (73 new errors; `MicroGptFlat.fss:60`, `mr = 0.0 MAX m0`).
- The other side: the WD's types chapter: "Every trait type also excludes every arrow type and every tuple type" (`Specification-1.0-frozen/basic/types-vals-vars.tex:214-215`), "Tuple types cannot be extended by trait types" (`:265`), "A tuple type excludes any non-tuple type other than Any" (`:272-273`); the restart: "Every trait type excludes Void, Bottom and every tuple type" (`types.tick:341`), "A tuple type excludes Bottom, Void, and every trait type, arrow type or function type" (`:424`). The team's own note asks for a "magic to convert that tuple argument expression to something of type Index" (`Specification-1.0-frozen/appendices/future.tex:207`): a conversion of the expression, by its words. The probe chose subtyping, since a conversion "would change every index value and every `for (i,j) <- a.indices`" (`perf-probes/symbolic-operators-2/REPORT.md` §5, decision 4); its checker patch left the exclusion side contradictory (the coordinator, 2026-10-23T06:49:00Z). POPL 2019 has no tuple values (extract §1).
- Costs. S1 with the rule: 40 library edits, a rule in the specification's types chapter and Appendix I, about 4 checker lines plus the unwritten exclusion side, 9 walk lines; 124 errors gone, none new; suites and microGPT unchanged; a user's own index type must extend `Index`, and a user's `Indexed[\E, Any\]` is refused (REPORT §3.1). The other ways, by reading: S2 (check only fixed `I`) refuses `Indexed[\E,Any\]` and departs from P-45's every-instance rule; S5 (`where { I excludes Range[\I\] }`) needs no tuple rule, but is a new language form the team left as an open question (`future.tex:209-212`) and the code generator refuses a `where` in a declaration's header (row 701), which would stop every collection after the switch-over; W3 removes slicing from the generic views; S4 changes microGPT's string slicing (`run-c4/src/FlatData.fss:34`, `:54`). The coordinator proposed to hold S1 out of batch 21 for this review (2026-10-23T08:10:14Z); he said at 08:19:00Z that batch 21 is not held, so S1 is a candidate of batch 21.

#### N2. P-157 against the team's library, P-28 and P-27's narrower reading, with P-88 and P-146 as its reasons

- One side: P-157, for the 8 errors of `AdditiveGroup`'s `+` and `-` beside the generic scalar block (`Library/FortressLibrary.fsi:2702-2708`), on the reason that the checker reads `self` in a signature as the plain trait type (P-146). Its alternatives: A1, the checker reads `self` as the implementing type in the overload check and reads bounds in exclusion, "widening P-146 against the POPL 2019 assumption it cites", not measured working; A3, drop the four scalar `+` and `-`, which stops microGPT at `sm`'s `z - (BIG MAX z)` (`MicroGptFlat.fss:28`, `MicroGptApl.fss:42`) and fails 4 revival tests (REPORT §3.2).
- The other side: the team's `Vector` and `Matrix` extend `AdditiveGroup` (`a874948ac:Library/FortressLibrary.fsi:1459-1460`, `:1577-1578`); the team's scalar block was `ZZ32` arrays with a `ZZ32` only (`:2537-2540`), so "the team never had both" (REPORT §3.2). The generic block is the revival's (`02d09a39f`, 2026-09-19; F-119, F-156), approved among four changes with "Others approved." (2026-09-21T02:26:08Z). P-28's wish that the algebraic traits reach matrices and tensors; his 2026-10-16T12:35:52Z wish, matrices additive groups where their elements are; his narrower reading of P-27, "I don't want that we extend the library with some forms that are specific to our use case in C4" (2026-09-20T07:20:24Z), and an extension only where "it was missing an obvious extension" (2026-10-09T05:20:34Z). His yes of 2026-10-23T07:09:03Z rested on "if I just revert that one" (his extension); P-157 keeps his extension and drops the team's design (07:11:16Z; POSITIONS-history, P-157).
- Costs. P-157: 6 lines in 2 files; `SUM` over vectors and `zero` of a vector stop working, which nothing measured uses; F-152 (the only array traits with an algebra) stops holding; P-78's `SUM` over `AdditiveGroup` no longer reaches vectors. A1: a checker rule outside POPL 2019's matching assumption, a soundness question; the earlier measurement of an intersection in signatures gave 18 spurious Return Type errors on `CMP` (Appendix I, `changes.tex:3944-4060`). A3: two microGPT lines and four tests. The coordinator's probe of the way back is on hold (2026-10-23T08:10:14Z).

#### N3. The POPL 2019 boundary, applied in one place and not in others; and P-146's peers against P-149's rule

- One side: P-146 keeps signatures at the plain trait type "because the proofs of the POPL 2019 paper ... assume that no declared type holds a type parameter inside an intersection"; that boundary is what forces P-157, and what his 08:08 message is "very wary to go against".
- The other side: the tree already sits outside the paper's proof in other places, by the record's own reading. The paper's calculus excludes method type parameters in upper bounds, so the library's F-bounded `SUM`, `PROD`, `BIG MAX` and every function over `T extends Integral[\T\]` are outside its Theorem 5.11 (F-271; `popl-recheck.md` §1.4); it omits closed types, and keeps a unique static winner as a theorem where P-60 gives that up (`popl-recheck.md` §1.5: "the one place the revival's type theory steps outside the designers' last proven model"); it omits functional methods and top-level functions (extract §1). Its silence on self types is a silence, not a rule (extract §6: "Self types and a numeric tower are absent").
- On peers: P-146's body half is justified by "one rule that peer languages share" and his "precedent in other languages" (2026-10-13T23:32:10Z). Two days later, P-149: "we are not here to change the nature of Fortress in fundamental ways unless we must reconcile a conflict between earlier and later designer choices, then we look at other languages on how to resolve it" (2026-10-15T06:23:24Z). Whether self types were such a conflict: the WD types `self` by a `comprises` clause (`var-ref.tex:64-69`); the team's compiled world spelled the self type with `comprises T` (`CompilerAlgebra.fsi:16`, `:24`; `XXX10k.test`); Welterweight types `self` as the plain trait (`fig-wellformeddecls.tick:55`) and commented out its self-type step; Naden wanted the self type "only in bounds" (`justificationOfRTR.tex:626-630`). The judgement: the late positions "do not speak with one voice here" (`self-typed-bodies-judgement.md` §2).
- The rule on peers itself moved: the `coordinator` skill widened P-149's "only to reconcile a conflict" to "or where the team left no word", citing P-151, by the coordinator's own settlement (`.claude/skills/coordinator/references/sources.md:116-118`).
- Costs. P-146 as built: 29 errors cleared, the distance 85 to 55 (F-225), two team declarations refused (rows 710, 355), one JVM verification failure (row 695), the mixin widening at a default (rq 212). The team's idiom instead (way 5, `comprises T` on seven traits): walk overflows its stack on such a clause (row 407; F-62), and the traits would be closed to their parameter (Appendix I's Route C note, `changes.tex:4049-4060`).

#### N4. P-151 and P-154: more language, against the probe's finding that library edits clear almost all of it

- One side: P-151 builds three `where` forms "that the team wrote down", and P-154 uses one of them to order lists only over total orders. His reasons: "we just delete this and pretend we don't need it. I don't like that" (2026-10-16T15:53:43Z), "all the peers do it" (12:35:52Z), and the rule that a feature with little support in the team's work bends the language (11:18:08Z).
- The other side: the where-clauses probe found that "of the thirteen checker errors filed as waiting on it, twelve go away with ordinary edits of the library that change no answer microGPT or the walk tests compute", and only the list order needs conditional extension (`perf-probes/where-clauses/REPORT.md:1`, A.0; F-243). The designers' word on `where`: "Widening and where clauses are not yet supported" (`Specification-1.0-frozen/basic/conversions-coercions.tex:15`); conditional inheritance via `where` among the three things the team "wish we had explored further" (`research/extracts/fortress-websites-wayback.md:124-126`); the team's `not yet` comments (`a874948ac:Library/FortressLibrary.fsi:814`, `:1059`).
- Costs. Built: the forms in the checker (F-250, F-251, F-255, F-256). Open: the code generator refuses a declaration whose own header holds a `where` clause (row 701; F-181), so after the switch-over `SumReduction`'s two `distribute` overloads (F-242) and `AnyList`, whose clause `comprises { List[\E\] } where [\E\]` is in its trait header (`Library/List.fsi:55-56`), do not compile until row 701 is built (by row 701's own reading, a header `where` that only binds a variable stops the code generator); a member checked under a condition stays callable where it fails and dies at link time (row 773; rq 175 to 178); walk and the compiled run time read a conditional parent at every instance (row 774), so walk orders every list; a pair of floats is ordered and a list of floats is not, a mismatch he accepted (P-154); walk's half, measured on a shadow on 2026-10-23, turns 10 interpreter tests red, 4 of them the team's, and the team's specification example `Generators.GeneratorDefn`, by mechanisms A to C of P-154's entry, and the designers' word on list order is split: the team's live `List` ordered every list and its QuickCheck relies on that, while P-154's source, the incomplete traits of 2007-2008, bound the element by a total order; the tuples' element bound refuses `(1,()) < (2,())` and, under walk, `(1,2) < (1,2.5)` (rq 213); `addLeft` and `addRight` stayed in `AnyList` against his option 3 (rq 188, row 799). And P-151 read as a closed list set aside S5 for P-156 (N1; the coordinator, 2026-10-23T06:38:50Z).

#### N5. P-45's "walk and the checker must accept the same pairs" against the divergences accepted elsewhere

- One side: P-45 states it as a rule; P-152 brought walk's exclusion in line with the checker's; P-45's walk clause of 2026-10-16 ("bringing it in line with the compiler's checker behavior").
- The other side, accepted or open: walk chooses coercions by value (P-59); walk's numerals stay `ZZ32` until Q-walk (P-76); walk takes the value's type where P-48's rule differs (F-273; row 538 on the compiled side); walk's join for unwritten reductions (F-228, rq 210); walk orders every list (row 774); walk loads what P-146 refuses (F-225); walk refuses `g[\T\](a: T)` beside `g(a: Any)`, which the checker accepts (row 759, F-274); `tint` (row 786, contested, rq 9), rows 787 and 788; walk refuses the POPL paper's valid set (row 539) and fails on rows 779, 780; the checker refuses a pair the 2011 paper accepts (row 542). P-156's tuple rule must be built in walk too (9 lines) or walk stops microGPT. Once row 774's fix lands, walk builds `<|1, 2|>` at `List[\Int\]` (row 364) and that list loses the order the checker gives a `List[\ZZ32\]` (`perf-probes/walk-conditional-extension/REPORT.md`, mechanism A).
- Costs: the rows above, each with an expected failure or a contested status; P-12 says walk gains the checker's types only after the switch-over (rq 232 asks what walk then refuses).

#### N6. P-77, P-56 and P-42 against P-156

- One side: P-156 bounds every generic index type by `Index`.
- The other side: P-56 keeps `(:)` a range over `Any` (the team's wildcard, `a874948ac:Library/FortressLibrary.fsi:2089`), so `Range` must stay unbounded and `BoundedRange` cannot take the bound; its narrowed `atMost(n: I): FullRange[\I\]` goes (`fsi:2251`), the coordinator's default (POSITIONS-history, P-156), after he asked "Is there no way by the indices to fix the atMost?" (2026-10-23T06:57:47Z). P-42's `Any` bound and P-156 together refuse a user's `Indexed[\E, Any\]`. P-56 itself rests on P-77: no range over `ZZ32` is a range over `Any`. His own words at the time of P-56: "maybe I am now ruling against some generic indexing type ... I said that the indexes are ZZ32 because I was always thinking about how to iterate over arrays" (2026-10-09T07:05:31Z).
- Costs: one api line's narrower type (nothing uses it, by the probe's runs); a way to keep it, a method condition `where { I extends Index }`, meets row 701 after the switch-over (the coordinator, 06:59:01Z); five `fail` bodies and five tests pinning them (P-56).

#### N7. P-75 against P-74

- One side: P-75, "if it fits, then there should be direct conversion. No question about it" (2026-09-29T14:10:36Z), the earlier review's item 9.
- The other side: P-74's promotion, under which a `ZZ32` with an `NN32` runs at `ZZ64`. With `NN32` into `RR64`, every operator that `RR64` and `ZZ64` both declare ties for that pair, since neither coerces into the other (row 575).
- Costs, measured on a copy: 5 of the 18 walk tests that use `NN32` go red, two of them the team's; the checker refuses `z + u` and `u MAX z` (row 575). Not built; every way to build it changes a decided behaviour (rq 21). Designers: the WD's general sentence ("automatic conversion of integer values to floating-point values", `conversions-coercions.tex:64-66`) and the prelude's none (review D16).

#### N8. The record's statement of the root reasons is partly not his

- P-43's reason, "the flattened prelude is the team's last record of the Fortress way", attaches to words he said of the patents' forest rule, route C's ground (2026-09-24T01:02:52Z); he chose route A at 14:41:40Z without a reason, and recalled on 2026-09-29T12:17:07Z that the flattening was "adopted from the compiler's library for performance reasons" (rq 219). "He cares that specialised code runs fast, not how a specialisation is chosen" condenses words he called "clearly ... not an answer to the question" (rq 220).
- P-26's "The implementers' later word also outweighs unfinished text" has no source in his words (rq 215).
- P-27's breadth against his narrower later words (rq 216); P-87's diff rule (rq 223); P-38's title (rq 217).
- Cost: none in the tree; these are the reasons a reversal or a return to route C would be weighed against (rq 219's cost line).

#### N9. Two `NOT YET` comments of the same form treated two ways (P-44 against P-151), and the self-type idiom left out (P-146 against P-151's rule)

- `AnyList`'s commented `comprises List[\E\] where [\E\]` became live under P-151 ("the forms that the team wrote down"); `AnyIntegral`'s commented `comprises Integral[\I\] where [\I\]` stays a comment under P-44, and "no decision says whether it is a valid clause" (F-121), though the checker now opens such variables (F-251).
- P-151 builds what the team wrote down; the team wrote the self-type idiom down too (`CompilerAlgebra.fsi:16`, `:24`), and P-146 does not use it.
- Costs: none measured for `AnyIntegral`'s spelling ("Whether the checker accepts the team's spelling on `AnyIntegral` is not measured", F-121); for the idiom, N3's.

#### N10. P-60's run-time uniqueness against POPL 2019's static uniqueness

- Carried from the recheck (`popl-recheck.md` §1.5), still current: POPL's Theorem 4.1 gives a unique most specific declaration for every call, static types included; P-60 gives that up at a call whose argument's static type sits between two closed traits. The team's plan of 2009, the intersection of two closed traits identified with the union of their common subtypes (`future.tex:285`), would keep the theorem.
- Costs: rows 540 (code generation crashes on a method call on such a result), 543, 546, 547, 559, 566; rq 6; row 487, the open assumption of the proof addendum.

#### N11. P-153's premise and the WD's power

- One side: P-153, each integer `^` answers its base's type; the record's reason is the team's later code (P-26). The premise has no message of his (audit, thin), and his later words recall "some kind of split solution" (2026-10-20T05:56:19Z).
- The other side: the WD's tower gave `2^n` with `n: ℤ` a rational (`Specification-1.0-frozen/basic-lib/numbers.tex:344-355`); the judgement found that the team's code never ran that rule (`integer-power-fable-judgement.md` §2.3), and that a numeral exponent cannot be split by type on either path (F-262).
- Costs: three team tests and three demos rewritten with a float base (P-79); `2^(-1)` raises `IntegerOverflow` under walk; the compiled prelude departs until the switch-over (rows 441, 523).

#### N12. P-48's rule, stated in the specification, run by neither path where it differs

- The specification gives POPL's instance rule (F-273); walk takes the value's type and will until it has static types (P-48, P-12); the compiled dispatcher has no static return type until phase 5 (row 538, `XXXGenericInstanceUnfixed`); walk's join for unwritten reductions reads past P-48's last clause (F-228; rq 210).
- Costs: the expected failures above; nothing in microGPT, whose static types are concrete (P-48).

## Part 4. Where the designers left the question open

On each point below their sources are silent or unfinished, so any choice there is the revival's. The 2026-09-29 judgement's list (`decisions-review/judgement.md:70-80`) is the first nine; the rest are the chain's since.

1. **The exclusion rule and a nested tower together.** Naden: "more work needs to be done in order to understand how to best support the numerical hierarchy in the Fortress type system" (`justificationOfRTR.tex:630-632`). The patents' forest rule was never built or published (F-45). Where the chain meets it: P-43, and through it P-153, P-76, P-80.
2. **Self types.** The WD reads them only through a `comprises` clause (`var-ref.tex:64-69`); Welterweight's self-typed dispatch step is a commented placeholder, "Explanation of how this works" (`dispatch.tick:195-210`); Naden: "a separate construct ... only in bounds ... not sufficient" (`justificationOfRTR.tex:626-632`); POPL 2019 has none. P-146, and so P-157's reason, sit here.
3. **Run-time instantiation of a dispatched generic.** Open in 2011 ("beyond the scope", `Papers/Types/rules.tick:118-129`), closed for type parameters by POPL 2019's rule (P-48); still open for a `nat` or `int` parameter reached only by dispatch (Appendix I, "Passages not yet revised", `changes.tex:4077-4079`; row 446).
4. **Static-argument inference.** The WD's chapter is 27 lines of heading and notes (F-169); POPL: "we do not present a specific static type inference algorithm" (p. 11:25). P-46, P-49, P-50, P-51, the numeral tie rule.
5. **A numeral's type hierarchy.** "We need to describe the Numeral type hierarchy" (`literals.tex:83-95`). P-76.
6. **The float types' rounding.** No chapter; three spellings in the team's library (review D6). P-68, P-54.
7. **How `comprises` reads, and coverage in the Meet Rule.** Two readings, the later on values; the coverage plan is stated, not built (`future.tex:285`); Types names covering and never defines it (`types.tick:934`). P-44, P-60, P-147.
8. **`where` clauses.** "Not yet supported" (`conversions-coercions.tex:15`); a wished-for feature (the wind-down post). P-151, P-154, P-90.
9. **Sizes in the checker and at run time.** "Todo: Handle int, nat, bool args" (row 406); "we ought to build it in" (`NatReflect.fss:38-40`). P-40, P-41, P-55, way 4a.
10. **A range's integer width.** No sentence (F-169). P-77.
11. **The subscripts' index bound.** The team wanted an `Index` bound and wrote "we cannot say that" (`future.tex:198-207`); how a tuple of indices becomes one is left as "a magic". P-156.
12. **Type variables in `excludes` clauses.** Listed as an open question with a commented example and no grammar (`future.tex:209-212`). S5.
13. **Exclusion through bounds that rule out every shared argument** (`tint`, row 786). "Not settled" (Appendix I, `changes.tex:4092-4098`); rq 9.
14. **A lexicographic order over partially ordered elements.** The team's incomplete traits of 2007-2008 bound the element by a total order (`Fortress.PartialTotalOrders.fss:117-140`); the team's live `List` ordered every list (`a874948ac:Library/List.fsi:67`), and its QuickCheck relies on lists of `Any` being ordered; the WD orders every list (`algebraic-constraints.tex:519-522`); no partial-order lexicographic trait was written. P-154.
15. **Variance at run time.** Types adds `covariant` only (`types.tick:322-339`); POPL says it needs every call's static return type at run time (p. 11:7). P-62, P-80.
16. **The algebraic-constraints library** (monoids, groups, rings, fields, `HasIdentity`). Specified, never shipped (`algebraic-constraints.tex:772-797`, `:1547-1556`). P-28, P-78.
17. **The value of an integer power at a negative exponent.** The team's code is silent: a cast's by-product and an unbound helper (`integer-power-fable-judgement.md` §2.3). P-153.
18. **The overloading of symbolic operators.** The team's checker skipped them; the team called the subscript pair "not really a valid overloading" (`future.tex:200`). P-155.
19. **Array-and-scalar operators beside additive-group arrays.** The team never had both (`perf-probes/symbolic-operators-2/REPORT.md` §3.2, "History"). P-157.
20. **Whether a program may extend `Number`.** The team's test wants it (`ProjectFortress/tests/extendNumber.fss:15`); the library closed `Number` (rq 23).
21. **A trait inheriting an abstract method and a sibling's body.** Not open: the WD's text and Welterweight refuse the object (P-149).
22. **The tuples' order over mixed element types.** No team text for the element bound of the tuple comparisons (rq 213).

## Part 5. The open items on types that wait for him

From the review queue's consequential themes (`review-queue.md:67-628`) and the batch records' held lists (`CLIMB-BATCH-19.md:210-216`, `CLIMB-BATCH-20.md:219-226`), with the tension or entry each touches. "Needed by" is the queue's.

| Item | What it asks | Touches | Needed by |
|---|---|---|---|
| rq 2 | the checker's second and fourth attempts at a call | P-49 | before the switch-over |
| rq 3 | a statically chosen declaration keeps its inferred instance, against POPL's rule | P-48, N12 | before microGPT compiles |
| rq 4 | joint solving of a call's type parameters | P-46 | never |
| rq 5 | do `try`, `catch` and `atomic` bodies take the expected type | P-50 | never |
| rq 6 | the Meet Rule's closed-trait case for generic families | P-60, N10 | before microGPT compiles |
| rq 7, 8 | an identical coercion on every candidate; coverage below the providing type | P-60 | never |
| rq 9 | `tint`: which path moves (row 786; held in batch 20's record) | P-152, N5 | before the tint rung |
| rq 10, 11 | a written static argument on a generic beside a plain name; a family mixing a function and functional methods | P-45 | never; before the symbolic-operator check |
| rq 13 | the approved `comprises` check decides by names (rows 489, 490) | P-44 | never |
| rq 15, 23 | which `comprises` clauses walk checks; may a program extend `Number` | P-44, P-60 | never |
| rq 18, 19, 210 | walk's choice with two common parents; the open type at dispatch; walk's join for unwritten reductions | P-48, N12 | never |
| rq 20, 21, 22 | `widen` of a large `ZZ`; `NN32` into `RR64`; `Number`'s one `=` | P-74, P-75, N7 | before the switch-over; before microGPT runs fast |
| rq 24, 25, 27, 28 | NaN comparison; ℚ's infinities; "(exact)" above 2^53; a numeral near a tie | numbers | never; before Q-walk |
| rq 29, 277 | the checker and the model's numeral powers (row 533) | P-153 | before microGPT compiles |
| rq 30, 31, 32, 34, 35, 36, 37, 229, 230 | way 4a; the arrays' bound; equal sizes; an oversized size as a value; a call above a sized domain; dead sizes; the array decisions; P-85's third question; "the whole prep" | P-40, P-85, P-28 | before the switch-over or microGPT compiles |
| rq 39, 40 | a generator's size; the fused operator's type (one of the 5 distance sites) | the library | before the switch-over |
| rq 41 | a `where` variable in an `extends` clause | P-151 | never |
| rq 175 to 178 | where a conditional extension's condition holds; the members scoped (row 773; held in batch 20's record) | P-151, N4 | before row 773's rung |
| rq 188 | `AnyList`'s bodies kept against his option 3 | P-151 | never (a hold) |
| rq 190 | `extends Any` read as `Object` against the specification's own `Tuple` (gather.2, held in batch 20's record) | P-42 | never |
| rq 212 | P-146 widened to the `Containment` mixins | P-146, N3 | before the switch-over |
| rq 213 | the tuples' comparisons, reopened | P-154, N4 | never |
| rq 215, 216, 217, 219, 220, 223 | P-26's "unfinished text"; P-27's breadth; P-38's title; P-43's reason and weighting; P-87's diff rule | N8 | never; before microGPT compiles (216, 223) |
| rq 224 | does the bare `Nothing` wait for `where`, or is it never tried | P-90 | before row 774's walk rung |
| rq 228 | P-152's replaced reason | P-152 | never |
| rq 232, 268 | what walk refuses once it has the checker; P-48 against P-12 | P-12, N5 | before Q-walk |
| rq 245 | `RR32` from `IntLiteral` | P-76 | before the array decisions |
| rq 247 | "kept running": under walk, or compiled too | P-79 | before the demos' rung |
| rq 269 to 276 | the follow-up's applied defaults on P-78, P-25, P-33, P-46, P-49, P-85, P-151, P-60 | several | never (applied) |
| batch 21, not held for this review | the subscripts' tuple rule (P-156), the vectors' change (P-157), walk's conditional extension (row 774, P-154): candidates of batch 21, whose planner runs beside this review | N1, N2, N4 | his word at 2026-10-23T08:19:00Z; the coordinator, 08:20:23Z |
| on hold | the probe of vectors' way back (A1) | P-146, P-157 | the coordinator, 08:10:14Z |
| probe of 2026-10-23, its §11 | how walk's half of conditional extension lands given row 364 (written `[\ZZ32\]`, after row 364, or a walk-only reading); where a list's `=` lives (`List extends Equality[\List[\E\]\]`, or about 20 test lines respelled, four of the team's files); QuickCheck's frequency map (team code); the `=/=` defect | P-154, N4, N5 | batch 21's walk rung (`perf-probes/walk-conditional-extension/REPORT.md:204-209`) |
| probe of 2026-10-23, its §5 | nine drafted ledger rows for the demos no row holds, draft A the timing line that P-74's explicit `ZZ64` into `RR64` stops in 14 demos | P-74, P-79 | the demos' rung (`perf-probes/team-demos/REPORT.md`) |

## Part 6. The candidate list, checked

The list is the coordinator's reading of POSITIONS at about 07:45 UTC on 2026-10-23 (`scratchpad/types-review/candidate-tensions.md`, seven items). I read it after Parts 1 to 5 were written. Checking items 4, 5 and 7 led me to two probes of 2026-10-23 that I had not read, `perf-probes/walk-conditional-extension/REPORT.md` and `perf-probes/team-demos/REPORT.md`; their evidence is now in P-74, P-154, N4, N5 and Part 5, each marked as read while checking the list.

1. **The revival's library extensions against the team's library (P-27, P-88, P-157, P-28): real.** The team's `Vector` and `Matrix` extend `AdditiveGroup` (`a874948ac:Library/FortressLibrary.fsi:1459-1460`, `:1577-1578`); the team's scalar block is `ZZ32` only (`:2537-2540`); the generic block is the revival's (`02d09a39f`; F-156); P-157's own "Why" names P-88 and P-146. Two points the item does not carry: his yes to P-157 rested on the premise that his own extension would be reverted (2026-10-23T07:09:03Z, corrected 07:11:16Z; POSITIONS-history, P-157); and his later words narrow P-27 to extensions with a precedent (rq 216). Map: N2.
2. **The self type (P-146) against the way back for P-157: real, with one correction of framing.** P-146's signature half follows POPL 2019's proof scope, whose matching assumes no type parameter inside an intersection in a declared type (extract §6), and Appendix I records a measured cost of the intersection in signatures, 18 spurious Return Type errors on `CMP` (`changes.tex:3944-4060`). But the paper has no self types; its scope is a silence, not a rule, and the tree already sits outside that scope at the F-bounded `SUM` and `BIG MAX` (F-271), at P-60's run-time uniqueness (`popl-recheck.md` §1.5) and at functional methods. Map: N2, N3.
3. **The `where` forms (P-151) against the code generator (row 701): partly.** Real for the first half: the code generator refuses every declaration whose own header carries a `where` clause (F-181, row 701), so `SumReduction`'s two `distribute` overloads with their method conditions (F-242) and `AnyList`, whose `comprises { List[\E\] } where [\E\]` is in its trait header (`Library/List.fsi:55-56`), will not compile after the switch-over until row 701 is built. Not as stated for the second half: the probe set S5 aside because "P-151 does not build it" (`perf-probes/symbolic-operators-2/REPORT.md` §3.1, "The other ways"), by reading P-151 as a closed list; row 701 is a cost of S5 that the coordinator named afterwards (2026-10-23T06:38:50Z), in the same message that said "None of your decisions forbids S5". Map: N4, N1.
4. **"Walk and the checker must accept the same pairs" (P-45) against the decisions that accept a divergence: real.** The sentence is P-45's own. The divergences hold: P-59, P-48's walk exception (F-273), P-76's split, rows 786 to 788 (786 contested), and more that the item does not list (rows 759, 779, 780, 539, 542; F-228; walk loading what P-146 refuses). One precision on its last example: `<|1,2|>` loses its order only once row 774's fix lands, by mechanism A of the walk probe (walk builds it at `List[\Int\]`, row 364); today walk orders every list (row 774). I found no separate "batch principle that both paths agree" beyond P-45's sentence and P-152's walk change. Map: N5.
5. **The list order (P-154) against the tuples' order and the team's tests: partly.** The pair-against-list mismatch is real and stated in P-154 itself ("A pair of floats stays ordered: the curator accepted that mismatch as a cost of the list rule"); rq 213 adds the tuples' own costs. The team's tests: of the four team tests that walk's half turns red, three (`booleanGuard`, `asifTest`, `RangePrototype`) and the team's specification example fail by mechanism B, the library's `=/=` and `assert` reaching a list's `=` only through `LexicographicOrder`; they compare lists by equality, and one library line, `List` extending `Equality[\List[\E\]\]`, clears them without touching P-154. Only `QuickCheckTest` and the team's QuickCheck depend on lists of `Any` being ordered (mechanism C), which P-154 itself takes away. A further point the item lacks: the team's live library ordered every list unconditionally (`a874948ac:Library/List.fsi:67`), so the designers' word on the point is split, not one-sided. Map: P-154, N4.
6. **The open range `(:)` over `Any` (P-56) and the implicit bound `Any` (P-42) against the `Index` bound (P-156): real.** `BoundedRange` cannot take the bound, since `Range`'s `truncL` and `truncR` return it and `Range` must stay unbounded for `(:)`; its narrowed `atMost` goes (`fsi:2251`, REPORT §3.1); a user's `Indexed[\E, Any\]` is refused. P-56 itself rests on P-77, and he named the risk at the time (2026-10-09T07:05:31Z). Map: N6.
7. **Mixed widths written out (P-74) against keeping every team demo running (P-79): real, as a cost more than a contradiction.** Under walk `nanoTime()` answers a `ZZ64` (row 75), and a `ZZ64` reaches `RR64` only by `asFloat` (P-74), so the timing line is the first stop of 9 demos and a later stop of 5 more; `asFloat(t)`, row 791's repair, clears all 14 (`perf-probes/team-demos/REPORT.md`, "In short"). P-79 already lists the repair where the way is known, so the two decisions reconcile by rewriting demo lines; the cost is those lines. The team wrote them for its tower, in which a `ZZ64` was an `RR64`, and the WD's general sentence supports the implicit conversion (`conversions-coercions.tex:64-66`). My map had this only as row 791 before the check. Map: P-74.

## Part 7. The tensions that the list lacks

- **N1, P-156's tuple rule against the designers' tuple types.** Both the WD and the restart say that a tuple type excludes every trait type and that no trait type extends a tuple type (`types-vals-vars.tex:214-215`, `:265`, `:272-273`; `types.tick:341`, `:424`); the team's note asks to "convert" the tuple expression. The list's item 6 touches P-156 only through `(:)` and `Any`.
- **N3, the POPL boundary applied in one place and not in others, and P-146's peer reason against P-149's rule.** The list's item 2 carries only the self-type side.
- **N7, P-75 against P-74**: both his, unbuildable together (row 575; rq 21).
- **N8, root reasons stated in his name that are not his words**: P-43's reason and weighting (rq 219, 220), P-26's "unfinished text" (rq 215), P-27's breadth (rq 216), P-87's diff rule (rq 223).
- **N9, the team's two `comprises ... where` comments treated two ways** (P-44 against P-151; F-121), and the team's written self-type idiom left out under a rule to build what the team wrote down (P-146 against P-151).
- **N10, P-60's run-time uniqueness against POPL 2019's Theorem 4.1**, carried from the recheck and still current (rows 540, 543, 546, 559, 566; rq 6).
- **N11, P-153's premise, for which no message of his is on record**, and the numeral exponent that no type can split (F-262).
- **N12, P-48's rule stated in the specification and run by neither path where it differs** (F-273, row 538, F-228; rq 3, rq 210).
- **Within N2 and N4, two points the list's items 1 and 3 lack**: P-157 was answered on a misread premise; and the where-clauses probe found that library edits with no new language clear 12 of the 13 errors that P-151's forms were built for (F-243), so the forms' remaining reason is the list order and the team's fusion and `AnyList` clause, with their costs (rows 701, 773, 774, rq 213).
- **Not tensions between decisions, but evidence for his question**: the decisions he said at the time he did not follow (section 2.4), and the defaults inside the chain that agents built and that wait for him (section 2.5).

## Counts

- POSITIONS entries mapped: 53 (section 1.1: 6; 1.2: 8; 1.3: 9; 1.4: 5; 1.5: 2; 1.6: 13; 1.7: 10). Of them, 16 were decided after 2026-09-29 (P-50, P-51, P-54, P-55, P-56, P-57, P-146, P-147, P-149, P-151, P-152, P-153, P-154, P-155, P-156, P-157), with new parts of two more (P-45's walk clause, P-40's ask 3); 7 were decided on 2026-09-29 in answer to that review or beside it (P-42, P-48, P-49, P-59, P-68, P-75, P-98), with P-76's split the same day; 30 were mapped by the earlier review. Not mapped, with reasons: 30 (section 1.8); POSITIONS holds 83 entries.
- Tensions: the 14 of 2026-09-29 re-read (section 3.1: 6 settled in decision, some with a residual, 1 settled on the checker with walk's rows open, 1 unchanged, 4 live or wider, 1 a record question, 1 not re-read); 12 found since (N1 to N12).
- The candidate list: 7 items; 5 real (1, 2, 4, 6, 7; item 2 with a correction of framing, item 7 as a cost), 2 partly (3, 5), none not real.
