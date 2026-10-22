# Cold read, chunk c7

Read: `explorations/coordinator/positions-audit/full/evidence/rewritten-c7.txt` only (10 entries, P-153 and P-84 to P-98).

One point applies to several entries: P-87, P-91 and P-98 say "him" or "he" with no name. P-98's pointer to "Pavol's answers" suggests it is the curator, Pavol, but none of the entries says so. A worker would guess right, but each of these entries would read better with the name in it.

---

## P-153: the integer power splits on the base

1. **Do / don't.** Make every integer type's `^` return that same integer type for every exponent, positive or negative. For a negative exponent whose result is not an integer, raise `IntegerOverflow`. For base 0, raise `DivisionByZero`. For bases 1 and -1, return the exact power. Code that wants a fraction writes a float or rational base (`2.0^(-1)`). Next, the compiled path's powers must follow the same contract.
2. **Decides / why.** Integer `^` never quietly returns a fraction. Overloads are chosen by type, and no type records a sign, so the choice can only depend on the base's type, with the exponent's sign checked at run time.
3. **Unclear.**
   - "a base of 0 raises `DivisionByZero`" read literally covers `0^2` and `0^0` too. It almost certainly means base 0 *with a negative exponent*, but the text doesn't say so.
   - Base 0 with a negative exponent fits both the `IntegerOverflow` clause (the result is not an integer) and the `DivisionByZero` clause. The text doesn't say which wins, though DivisionByZero is the likely intent.
   - Positive-exponent overflow (e.g. `2^100` in a 32-bit type) isn't covered. The title's "or raises an error" suggests an error, but it doesn't say which one or that it's `IntegerOverflow`.
   - The entry doesn't cover an integer base with a float or rational exponent.
   - The exception's name is surprising: `IntegerOverflow` for a result like 1/2, which is not too large but not an integer. A reader may think it's a typo for a different exception.
   - "types an integer power by its integer at a signed exponent" is hard to parse. I read it as "gives the power the integer's type even when the exponent is signed".

## P-84: storage is `double[]`, unboxed; arrays keep `nat` sizes

1. **Do / don't.** Store array elements unboxed, as `double[]`. Keep the team's `nat`-sized array types. Build both together: sized types, and the checker taught to handle `nat` parameters, following the library's existing patterns. For how `double[]` sits under a float vector, see P-85.
2. **Decides / why.** It decides on unboxed storage and nat-sized types, built as one piece of work. Why: a high-performance language can't box its elements, and sizes are central to the team's design.
3. **Unclear.**
   - The title says "Storage is `double[]`" with no qualifier. A reader could take it as all arrays, including integer and object arrays, or only float arrays. The last sentence suggests only floats, but the title doesn't say so.
   - "built together" could mean in the same change or in the same phase.
   - "the library's own patterns" doesn't say which patterns or where to find them.
   - It doesn't say whether every array must carry a size or whether unsized arrays are still allowed.

## P-87: the model's text is the notation; the vocabulary is repaired around it

1. **Do / don't.** Never turn an operator in the model into a function call just to get past an overload check. Fix the library vocabulary instead. Before building any repair that changes a model line, show it to him as a diff. Decision D is one such diff. Apply none of it before PLAN phase 5.
2. **Decides / why.** The model's notation is fixed and the library adapts to it. The why is implied, not stated: the notation is the point of the exercise.
3. **Unclear.**
   - The title says the model's text *is* the notation, yet the body expects repairs that change model lines. My reading is that changes are allowed if shown as a diff, but operator-to-call changes never are. The entry would be clearer if it said so.
   - "shown to him ... before it is built" could mean show it and go ahead, or wait for approval. Most readers would wait, but the text only says "shown".
   - "nothing of it is applied before PLAN phase 5" doesn't say whether Decision D is approved and simply scheduled for phase 5, or still awaiting his answer.
   - "him" has no antecedent in the entry.

## P-89: `fill` takes a value, `tabulate` a function

1. **Do / don't.** `fill` takes a value to repeat. The function-taking form is named `tabulate`.
2. **Decides / why.** It decides the two names. Why: other languages use `fill` for a value, and Scala calls the function form `tabulate`.
3. **Unclear.**
   - "keeps the value form" suggests a function-taking `fill` exists today. The entry doesn't say whether that overload is removed or renamed, or whether it stays as an alias.
   - It doesn't say whether `fill` with a value that is itself a function fills with that function. That is the natural reading after the split, but under multiple dispatch it's worth saying.

## P-90: `Maybe`'s empty case is the parametric `Nothing[\T\]`

1. **Do / don't.** Write `Maybe`'s empty case as `Nothing[\T\]`, in the library and in the specification alike. Don't try a single bare `Nothing` object shared by every `T`.
2. **Decides / why.** It decides on the parametric form. Why: instantiation exclusion forbids the bare form, with or without a `where` clause, and the specification marks it "Not allowed".
3. **Unclear.**
   - "is not tried" could mean "don't experiment with it" or "has been ruled out, don't propose it". In practice both lead to the same action.
   - Nothing else is unclear.

## P-91: what an object with no `asString` prints

1. **Do / don't.** On both walk and the compiled path, an object with no `asString` prints its bare Fortress type name, spelled as walk spells it. Any debug marker goes in `asDebugString`. Still to do on the compiled path: `asDebugString` printing `a Box: Box`, as walk does, and the case of an object with a member named `toString`, which overflows the stack.
2. **Decides / why.** The default printed form is the plain type name, with debug detail moved to `asDebugString`. Why: not stated beyond matching walk.
3. **Unclear.**
   - "The debug marker he had in mind" refers to a marker the entry never describes, and "he" is unnamed. Is `a Box: Box` that marker?
   - "Still to build: ... an object with a member named `toString`, which overflows the stack" reads as if the overflow is part of what to build. It is surely a bug to fix, but the wording should say "fix".
   - "bare type name" doesn't say whether a parametric object prints its type arguments (`Box` or `Box[\ZZ32\]`).

## P-95: every change to the specification is recorded with its reason

1. **Do / don't.** Record every specification change with its reason. Don't leave any mismatch between specification and implementation open. Keep the original text and the reasons so that route C (back to the forest rule, P-43) stays possible. Use the S1 form. Never touch `Specification-1.0-frozen/`.
2. **Decides / why.** It decides that the specification is edited with a full trail. Why: so that mismatches don't confuse readers and route C stays open.
3. **Unclear.**
   - "No discrepancy ... stays open" doesn't say which side gives way. It could be closed by changing the specification or by changing the implementation. The entry's subject suggests the specification, but the sentence itself doesn't say.
   - "stays open" gives no timescale: a mismatch may need closing at once, or it may be allowed while the work is in progress.

## P-96: the S1 form

1. **Do / don't.** Mark each changed passage of the specification with a callout that prints in every build, never a `\note`. In Appendix I's revival section, give each change its reason, its original text, the way back to route C and the decision it follows. Add one paragraph on the revision to the front matter and put the full reasoning in a repository document. Cite the unrevised copy as the Working Draft of February 2011. The details are in the fortress-repo skill, `references/specification.md`.
2. **Decides / why.** It decides the format for specification changes, modeled on the team's own layering for 1.0 and its 2009 draft. Why: implied, to follow the team's practice and keep every change traceable.
3. **Unclear.**
   - The relation between the documents is confusing: "1.0", "its 2009 draft", the "Working Draft of February 2011" cited as the unrevised copy, and P-95's `Specification-1.0-frozen/`. A reader can't tell whether the frozen 1.0 directory *is* the February 2011 Working Draft or a different, earlier text. If they differ, which one counts as the "original text" that has to be kept?
   - "the way back to route C" is required for *every* change, but route C is defined (P-95, P-43) as the way back to the patents' forest rule. It's unclear what to write for a change that has nothing to do with that rule.
   - "a repository document holds the full reasoning" doesn't say which document or where it lives.

## P-97: the refused examples (S2)

1. **Do / don't.** Keep each specification example that instantiation exclusion refuses, marked "Not allowed", next to the library's shape for the same thing. State the rule once, in Luchangco's two-part form (P-25). The covariance example's callout should note that the later design has a `covariant` modifier, which neither path implements. Keep Appendix A's calculi as they are, with a callout saying they predate the rule.
2. **Decides / why.** It decides how the specification handles examples the rule now forbids. Why: implied, to agree with the library and state the rule only once.
3. **Unclear.**
   - The title says the examples "take the one library's shapes", which suggests replacing them. The body says each example "stays ... beside the library's shape", which means keeping both. The body is clearer, but the title invites the other reading.
   - "The rule is stated once" doesn't say where, whether in a chapter, in Appendix I or in a callout.
   - "which neither path implements" doesn't say whether `covariant` should be implemented later or is noted for the record only.
   - "they predate the rule": I assume "the rule" is instantiation exclusion, but the antecedent is a sentence away.

## P-98: `TotalComparison` extends `StandardMinMax[\TotalComparison\]`

1. **Do / don't.** Make `TotalComparison` extend `StandardMinMax[\TotalComparison\]`, in both the api and the component, so that it gets `MIN` and `MAX`. Keep its five restated members.
2. **Decides / why.** It decides the inheritance. Why: to give `TotalComparison` `MIN` and `MAX`. He accepted it on the coordinator's recommendation.
3. **Unclear.**
   - The entry doesn't say whether the decision stands now or waits on his review. It says he wants it "explained in more detail" and that it's on his review list. My reading is that it stands and the review is only an explanation, but a cautious worker might hold off building it.
   - "its five restated members" doesn't name the five. "Restated" could mean members it re-declares from a parent, so it's unclear why they're kept once `StandardMinMax` may also supply them.
   - "He" is identified only through the PLAN heading ("Pavol's answers").
