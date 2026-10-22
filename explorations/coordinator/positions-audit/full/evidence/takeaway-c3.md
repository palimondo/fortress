<!-- The POSITIONS audit's full run, chunk c3: the takeaway check. For each entry of rewritten-c3.txt, what the cold reader (cold-read-c3.md) took away, set against what the curator decided as his messages show it (curator-profile/show.py), with the coordinator's texts he answered read from the transcripts (positions-audit/tools/near.py, or the transcript line by its time). One Opus reader; nothing else changed. -->

# Chunk c3: the takeaway check

- P-41: match. One door is open. The reader could not tell whether "each number has one descriptor" means one per value or one per number type. The ask he took (09:30:07Z, taken 09:44:10Z, 09-26) means one per value, the 3 of `Vec[\3\]`.
- P-42: match. The reader's do-line already says "records" where the text says the callout "keeps" `Object`. The `functions` premise is the writer's open question 1, not a drift.
- P-43: match, on the decision and on the new reason. The reason holds only if he takes the writer's question 1. The reader's doubts, whether the rule forces the flat tower and whether route C is closed, come from its lack of context: the route ask (14:36:56Z, 09-24) and P-95 answer them.
- P-44: match. The entry gives no reason, and the reader says so. It also asks whether row 487's hole must be fixed. The ask he took (07:49:57Z, taken 08:52:27Z, 09-28) gives both answers.
- P-45: drift, small, from a kept sentence. "The library repairs its refused families with its own exclusions" narrows the "own techniques" he took (`excludes` clauses, marker traits, helpers chosen by a type test; 12:01:53Z, taken 12:08:32Z, 09-26), and the reader's do-line narrows with it. The reader also took walk's parity clause as the reason for answer 9 itself, since the entry gives no other.
- P-46: match. The reader reads the `ZZ64` example as going against the title. The text never says that a generic arm fits on its declared domain, which the decision he took says in so many words (14:52:02Z, taken 19:06:50Z, 09-28). A tighten is recommended.
- P-47: match. "The family answers at the promoted type" was hard to parse. The case he took is `b MAX 1` answering as `b + 1` does.
- P-48: match. The new walk sentence's "still" let the reader take walk's use of the value's type as a gap. The option he took says that the interpreter "always will" (16:52:08Z, taken 17:34:18Z, 09-29).
- P-49: match. The reader read "only then" as "otherwise", which is right. Two kept words leave a door open: "only then" and "converts".
- P-50: match.

Times are UTC. "His" and "he" are the curator's. The reader noted that "he" has no antecedent and took it to be the curator, which is right. "Kept" means a sentence that the writer left as it stood. "Tighten" is an optional fix: the reader took the meaning right, but the text left a door open. A "fix" is offered where the drift is the text's. The reader's questions about the project's own terms are ignored (the brief's rule): microGPT's "model", "walk", "both paths", "the switch-over", rows and F-numbers.

## P-41: a size travels as a type argument's descriptor

**The reader took away.** At run time a size goes in the descriptor slot that the team's code generator reserved. Each number gets one descriptor from a table, with no holder class. Operator static arguments stay compile-time names, and nobody tries to unify them with sizes. Why: the slot is already reserved, and this is how the team instantiates types. Its doubts: does "each number" mean each value or each number type? What does "them" refer to? What does "a size" cover?

**What he decided.** "All right. B it is." (2026-09-24T16:17:27.464Z), to the coordinator's 15:39:10.560Z: "a size gets the same descriptor object a type argument has, filling the slot the team's code generator already reserved". The slot was his own idea (15:07:56.534Z): "let's extend the runtime object with a new field for the size". "Agreed, (b) factory" (2026-09-26T09:44:10.939Z), to the ask of 09:30:07.795Z: "`RTTIsize.of(n)` returns one descriptor per number, and no class is written", with the coordinator's 09:35:03.762Z on his question: "(b) is the team's instantiation pattern applied to numbers". On the operators, he had asked "why are operators different? Shouldn't we unify them?" (15:14:48.777Z). The coordinator answered "No, and not now", with a ledger row (15:27:15.417Z). He replied "I don't see a need" (16:17:27Z).

**Verdict.** Match. The reader's do-line is his decision. Its "unify them with sizes" is close to his question, which asked whether operators should get the treatment that types and sizes get. The one doubt with a cheap answer in the text is "each number". The ask's example is the 3 of `Vec[\3\]`, one descriptor per value. A worker who read it as one per number type would build the wrong table. What "a size" covers is the project's own term.

**Tighten (optional).** "Each size value (the 3 of `Vec[\3\]`) has one descriptor, from a table, ..." This is the ask of 09:30:07Z (09-26), which he took at 09:44:10Z.

## P-42: the implicit bound is `Any`

**The reader took away.** An unbounded type parameter is bounded by `Any`. The specification states it, with a callout that records the Working Draft's `Object`. The compile path keeps `Object` until the switch-over. Why: `Any` holds tuples, functions and `()`, and the library instantiates its containers at tuples. Its doubts: does the callout keep `Object` as history, or as text that still binds? Should a compile-path worker fix `Object` now?

**What he decided.** "Option one" (2026-09-29T14:02:25.736Z), which he called "an absolute no-brainer". He was answering the coordinator's 13:58:02.218Z: "Option 1 writes `Any` into the specification with a callout recording that the draft said `Object`". The compile path's `Object` is "a divergence [that] goes away at the switch-over". After his yes, the coordinator's 14:02:59.997Z said that the sentence "names the compile path's current `Object` setting as a known difference until the switch-over". His recap of 13:57:39.332Z: "yes, we go with any, because that's the status quo".

**Verdict.** Match. The reader's do-line says the callout "records" `Object`, which is his option, although the text says "keeps". "Until the switch-over" answers the compile-path doubt: leave it until then. The "functions" in the reason is the premise that the writer puts to him as question 1 (the 2012 chapter puts arrow types under `Object`). The reader took it as stated, which is what he was told on 09-29. It is not a drift of this check.

**Tighten (optional).** "... with a callout that records the Working Draft's `Object`". These are the words of option 1 (13:58:02Z), which he took at 14:02:25Z (09-29).

## P-43: the exclusion rule stays and the tower is flat (route A)

**The reader took away.** The compiled checker keeps the exclusion rule. The library's numbers are flat siblings under `Number`, each with its own algebra, and `Number` has no catch-all operators. Why: it is the shape of the compiler prelude, taken for performance, so every type keeps its own specialised body. Its doubts:
- "So the library's numbers are flat" does not show why keeping the rule forces a flat tower.
- "He cares ... not how a specialisation is chosen" might make route A negotiable.
- Is route C still open?
- How does this square with P-46's arm over `T extends Number`?

**What he decided.** "Agreed. Route A it is." (2026-09-24T14:41:40.798Z), to the coordinator's route ask of 14:36:56.498Z: "Route A keeps the rule and flattens the tower ... They become siblings under Number, each carrying its own algebra, and Number loses its catch-all operators ... Every type keeps its own specialised body, since the rule stays as the type group left it." The new reason is his recollection of 2026-09-29T12:17:07.180Z: "flattening of the numerical hierarchy was something we adopted from the compiler's library for performance reasons, if I recall correctly." The kept sentence is his 2026-09-24T01:02:52.634Z: "how a specialization is chosen 'ist mir egal', as long as it runs fast. Which clearly isn't an answer to the question…". On reversal, he asked "If we now choose A, can we later try C?" (01:50:45.052Z). The ask answered: "reversible only at the corrected cost".

**Verdict.** Match, on the decision and on the reason as rewritten. The reader's Why is the rewrite's, and that rests on the writer's question 1: his 12:17 words are a recollection. The doubts come from the reader's lack of context, not from the text:
- **The causal link.** It is real. The ask's first line ties the rule to the tower: no type may be two applications of one generic. Under A, the rule stays and the tower flattens.
- **Route C.** It is closed now, and P-95 keeps it open at F-46's price. That fits his 01:50:45 question and the reader's "negotiable".
- **The kept sentence.** Whether "He cares ..." stays is the writer's question 2.
- **The tension with P-46.** P-46's arm over `T extends Number` is the judgement's hypothetical pair, which "the library has no such pair" (13:00:37Z, 09-28) says outright. That is context.

**Fix.** None now. If he answers question 1 otherwise, the reason follows his answer.

## P-44: `AnyIntegral`'s closure and the 2012 reading of `comprises`

**The reader took away.** Keep `AnyIntegral comprises { ... }` with a `NOT YET` comment. Let the checker accept a generic child of a closed trait when every type it knows below the child is listed. Leave the clause's text and walk alone. Why: not stated. Its doubts: what is "the 2012 way"? Is row 487's hole accepted, or must it be fixed?

**What he decided.** He had already approved the closure, "We are writing not yet and ... whatever [the tracer] recommends, let's do that" (2026-09-21T17:08:18.165Z), to the coordinator's 17:01:34.623Z, "keep, with the comment". Later came "Option 1." (2026-09-28T08:52:27.340Z), after he had read the judgement's section (08:46:46.410Z). That answers the coordinator's 07:49:57.970Z: "Teach the checker the 2012 reading. A generic child of a closed trait is accepted when every type the checker sees under it is listed ... walk untouched ... It adds one ledger row for a gap that every option except the team's 2008 clause shares". The ask gave the reason: "By your decisions of 09-23 and 09-26, the 2012 texts weigh more, and by them the clause is right as written."

**Verdict.** Match. Every clause of the reader's do-line is his option 1. The struck sentence (the three library changes) does not affect the takeaway. The missing Why is a gap in the kept text, not a drift: the title's "the 2012 way" names it, and P-26 holds the principle. The hole is recorded, not to be fixed now. F-72 says "parked for the curator", and that is the ask's "one ledger row".

**Tighten (optional).** Add "Why: the 2012 texts are the team's later word (P-26)", and say that row 487 "records, and parks for him," the hole. Both come from the ask of 07:49:57Z (09-28), which he took at 08:52:27Z.

## P-45: overloads may differ in their static parameters (answer 9)

**The reader took away.**
- **The specification.** Drop the sentence, state the 2011 model, and keep the old sentence as superseded text.
- **The checker.** Keep the three rules, check the Return Type Rule over every instance, and require positional agreement between two generic declarations in the more-specific relation.
- **Walk.** It dispatches on declared domains, and its load check uses the checker's rules.
- **The library.** "Fix the library's refused families with exclusions."
- **Why.** "So that walk and the checker accept the same pairs (row 159)."

Its doubts: the headline against the agreement rule (it presumed that only unrelated overloads may differ); "with no parameter pair required to exclude"; and "otherwise than what?".

**What he decided.** "Yes, agreed." (2026-09-26T12:07:33.636Z) and "Agreed, the judgement's recommendation." (12:08:32.187Z), to the coordinator's 12:01:53.076Z "Answer 9":
- "The library's refused overloads are repaired with its own techniques: marker traits and `excludes` clauses, as it already does elsewhere; named helpers chosen by a type test; and one declaration slip corrected."
- The reason the ask gave: neither path ever enforced the sentence, "the library uses them freely", enforcing it "would refuse at least 179 pairs", and the 2011 paper "was written for exactly this case". "It makes the spec say what both implementations and the team's own later work already do, and it keeps the library's overloads legal."
- Its example of a legal pair is "a generic `f[\T\](x: T)` beside a plain `f(x: ZZ32)`".

On walk's load check: "Does this mean bringing it in line with the compiler's checker behavior? Then yes." (2026-10-16T19:47:32.836Z).

**Verdict.** Drift, small, on two points. The rest matches.
1. **The library's repairs.** He took "its own techniques", and helpers chosen by a type test are among them. The entry says "with its own exclusions", and the reader's do-line narrows with it. A worker repairing a family that the checker refuses later, or that an exclusion cannot separate, would rule out a helper repair that his yes allowed. The rung found marker traits unsafe under walk (F-77), so they are not always the way, and the exclusions are the built state, not the rule.
2. **The Why.** The entry gives no reason for answer 9 itself. So the reader took the parity clause, which is his 10-16 condition for walk's load check, as the reason for the whole decision.

The reader's other doubts come from its lack of context:
- **The headline against the agreement rule.** The positional rule binds only "two generic declarations", so a generic beside a plain overload may differ. The reader's guess, "only unrelated overloads", is not the rule, but the text's words are exact.
- **"With no parameter pair required to exclude".** It means "even where no pair of their parameter types excludes" (F-252). The text is dense here but correct.

**Where it comes from.** A kept sentence, for both points. Point 1 began at the consolidation (`55f1a1352`). The decision's text had read "repaired by its own devices" until then. The built state, "repaired by its own exclusions" (F-77), was merged into the rule. The writer marked the sentence unchanged (rule 1).

**Fix.** "The library repairs its refused families by its own devices (`excludes` clauses, helpers chosen by a type test), and no model line changes." These are the words of answer 9 (12:01:53Z), which he took at 12:08:32Z (09-26). Optional, if length allows: "Why: neither path enforced the sentence, the library relies on such pairs, and the 2011 paper replaced it" (same ask).

## P-46: a conversion makes a call possible

**The reader took away.** Choose on declared domains, by applicability and then specificity. Instantiate the chosen declaration by answer 8's promotion, with the coercions inserted statically. Do not adopt his broader rule. Why: fast generic code that a JVM can specialise. Its main doubt: the example seems to contradict the title. The plain arm over `Any` "already fits", yet the generic arm runs, with a promotion. That "looks like what the rejected broader rule would do". It reconciles only if the generic arm is applicable on its declared domain before any promotion, and the entry does not say so. Other doubts: which "both paths"; tensions with P-43 and P-48.

**What he decided.** "C-O. Both recommendations for batch N accepted." (2026-09-28T19:06:50.868Z), to decision 1 of the coordinator's 14:52:02.906Z:
- "A conversion is used only to make a call possible. It never switches the call away from a version that already fits."
- "Which version fits is judged on declared types. A generic version fits if some type within its bound would take the arguments."
- "Once a version is chosen, answer 8 picks its type (here `ZZ64`)."
- "Your case runs the generic version as `ZZ64` code ... So your option 2 survives, in its sound form."

Before that came "Option 2. Fast generics over Any. ... I'd like to pick fast generic co[d]e that can be specialized in JVM." (13:32:53.221Z). His broader rule was at 13:51:00.915Z: "if there is a conversion to a specific type, it should be applied. And only if all combinations are exhausted ... then we go to a plain implementation." The judgement rejected that rule, and his yes took the rejection.

**Verdict.** Match. The reader's "Decides" says that conversion sets how the chosen declaration is instantiated, never which one is chosen, and that is his decision. Its reading of the broader rule, the Why and the inference sentence are his too. The main doubt rests on a door that the text leaves open. Its guessed reconciliation is exactly the ask's second clause, which the entry leaves out. A worker who took "fits" to mean "fits as written" would run the plain arm. That is option 1 of 13:00:37Z, which he turned down for option 2. The other doubts come from the reader's lack of context:
- **P-48.** Here the arguments do fix `T`, and the promotion picks its type, so P-48 does not reach this case.
- **P-43.** The pair is a hypothetical that the library does not hold (13:00:37Z, 09-28).

**Tighten (recommended).** "So beside a plain arm over `Any`, a generic arm over `T extends Number` fits a mixed-width call on its declared domain, since a type within its bound takes both arguments, and, more specific, runs at `ZZ64`." This is decision 1 (14:52:02Z), which he took at 19:06:50Z (09-28).

## P-47: each integer type declares `MIN`, `MAX` and `MINMAX`

**The reader took away.** Put `MIN`, `MAX` and `MINMAX` in every integer type itself, "presumably rather than inheriting them from a shared trait". Why: it matches `QQ`, `RR64`, the compiler library and the specification's `ZZ`, "so that under walk the family answers at the promoted type". Its doubts: what are "the family" and "answers at"? Does `ZZ` also get `MINMAX`?

**What he decided.** "C-O. Both recommendations for batch N accepted." (2026-09-28T19:06:50.868Z), which took decision 2 of the judgement's page (`reviews/conversion-overloading-judgement.md:75-89`). The question was "What makes `b MAX 1` answer under walk for a `ZZ64` `b`, as `b + 1` does?" The page explains that the tie arises because `ZZ64` inherits a `MAX` from the generic order traits. Option 1: "Each integer type declares its own `MIN`, `MAX` and `MINMAX`: 15 declarations ... Every such call then answers at answer 8's type." Recommendation: "Option 1, the library's own device."

**Verdict.** Match. The reader's "rather than inheriting" is the point of the decision: the inherited `MAX` is what ties. "Each integer type" covers `ZZ`. The 15 declarations are three for each of the five types that `AnyIntegral` lists, and the library's `ZZ` declares `MINMAX` (`Library/FortressLibrary.fsi:661`). The specification's `ZZ` appears only as a precedent for `MIN` and `MAX`. The clause that is hard to parse is the kept "the family answers at the promoted type". The decision's own case is concrete.

**Tighten (optional).** "... so that under walk `b MAX 1` answers at the promoted type, as `b + 1` does". This is decision 2 (judgement page), which he took at 19:06:50Z (09-28).

## P-48: an unfixed type parameter takes its bound

**The reader took away.** Such a parameter is instantiated at the intersection of its upper bounds, constrained by the call's static return type. It is never `Bottom`, the arguments' union or the value's type alone. The library keeps its unbounded declarations. "Walk still takes the value's type where dispatch reaches a declaration." Why: it is the team's later word, which he ranks above his own reading. Its doubts:
- "Do not fix" could mean "not mentioned" or "not uniquely determined".
- How do the bound and the return type combine?
- "Never ... the value's type alone" sits against walk taking the value's type. Is that an accepted deviation, or a gap to close?
- Which bound does the compile path use (P-42)?

**What he decided.** At 2026-09-29T17:34:18.956Z he wrote: "if I apply the rule that ... the later teams work supersedes the previous one, and you are saying the rule is coming from the paper ... then I will trust the team's work over whatever my misunderstanding of the things are. So you can record that." He was answering the coordinator's 17:29:52.529Z, which restates its 16:52:08.446Z:
- "`T` takes its declared bound (`Any` if there is none), narrowed by whatever the call's static result type requires. It is never `Bottom`, never a union, and never set by the value alone."
- Option 1: "a callout says both implementations still use the value's type at run time. The interpreter always will, because it has no static types. The compiled path will until phase 5."
- The three cases that "nothing decides": `T` only in the result, two unrelated arguments meeting at one `T`, and the instance that dispatch picks.

The library's declarations: "So yes, put the library back to the team's own declaration" (2026-10-03T04:14:20.092Z).

**Verdict.** Match. The rule, its source, his reason, the library and the compiled half's still-to-build line are his. "Do not fix" means "does not pin down", the ask's three cases, and the reader's second reading is the right one. On the deviation doubt, the new sentence, restored from his option, gives the cause: "Walk has no static types". But its "still" lets the reader take the deviation as temporary. His option says walk's is permanent ("always will") and the compiled path's is temporary (phase 5, the entry's last line). A worker could open a task to make walk obey "never ... the value's type alone", which it cannot. The P-42 bound is context: the compile path's `Object` holds until the switch-over.

**Tighten (recommended).** "Walk has no static types, so where dispatch reaches a declaration it always takes the value's type." This is option 1 of 16:52:08Z, which he took at 17:34:18Z (09-29).

## P-49: the order of the checker's attempts

**The reader took away.** First check the call by subtyping, without the expected type, and keep that result if it converts to the expected type. Only otherwise, retry with coercion and the context. Why: a declaration that fits the arguments as they are must not be passed over for one reached by coercion. Its doubts: "only then" read literally; does "converts" mean by subtyping or by coercion; is "the context" the expected type?

**What he decided.** At 2026-09-29T15:26:18.244Z he wrote: "Recommendation one makes sense ... Because coercion should be tried when there are no matches." At 15:49:10.603Z: "on item four, we are ... recording the recommendation ... number one". That answers the coordinator's 15:26:31.509Z: "match without conversion and without demanding the result type, keep the winner if its result can be converted to `V`, and only then try conversions". The example: the generic `k`'s `N` result "gets converted to `V` at the assignment". So "converts" includes coercion.

**Verdict.** Match. The reader's do-line ("Only otherwise") is his rule ("when there are no matches"). Its doubts point at two kept words. "Only then" is the coordinator's own phrase, read literally. "Converts" includes coercion, as the ask's example shows. A worker who read it as subtyping only would rebuild the landed checker's fault that the decision fixes. "The context" is the expected type, as the title says. The third attempt that the checker keeps (review-queue item 2) is a default, not his. It is outside this check.

**Tighten (optional).** "It keeps the first attempt, by subtyping, when its result converts, by coercion if need be, to the expected type, and tries coercion with the context only when it keeps none." This is his 15:26:18Z and the ask of 15:26:31Z, taken at 15:49:10Z (09-29).

## P-50: a `label` body takes the expected type of the whole

**The reader took away.** In the checker, pass the expected type of the whole `label` into its body and into its exits' `with` values, as for a `typecase` clause. The inference chapter lists both contexts. Why: the specification types a `label` as the union of the body's last expression and the exits' values. Its doubts: is "lists both contexts" an instruction or a statement? What is P-51's half?

**What he decided.** "(a) has a yes" (2026-10-09T06:59:48.891Z), to the coordinator's 06:56:20.441Z. That text explained `label` as a block left early with a value: "the block's type is the union of its last expression and its `exit` values", "the same idea" as `typecase`, whose branches each get "the type the whole `typecase` is expected to have". Before it, his 06:55:25.847Z: "the go to block gets the same inference mechanism like function bodies get, which makes sense".

**Verdict.** Match. The exits' values follow from the union rule that the ask explained, as each `typecase` branch does. The specification's inference chapter already lists both contexts (`Specification/basic/inference.tex:143-147`, with the revision note of 9 October). So either reading of "lists" ends in the same state. P-51's half is a pointer to another entry.
