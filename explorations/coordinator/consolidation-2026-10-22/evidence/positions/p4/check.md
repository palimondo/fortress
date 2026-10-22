<!-- The clarity pass's check of chunk p4 (POSITIONS P-54 to P-60, P-62, P-147), 2026-10-22: each rewritten entry against the record and the audit's evidence, and the cold reader's answers against the source meaning, with each failure classed. -->

# Check of chunk p4: nine entries

What I read: `proposals.md`, `cold-read.md` and `concepts.md` in this folder. The entries now and the audit's evidence came from `entries.py`, with the scout reports and the c4 and c5 judgement, corrections and takeaway sections (P-55's from the trial). I checked his messages with `show.py`. The coordinator's texts came from the transcript: item 44 at 07:19:47.208Z (`000.jsonl:7504`), item 15 at 07:59:01.341Z (`:7697`) and item 35 at 00:17:43.858Z (`:10115`). I also read the tree: `Library/FortressLibrary.fss:116-130`, `:645-658` and `:3338-3346`; `Formula.scala:97-139`; `Specification/advanced/overloading.tex:306-324` and `:696-735`; `basic/types-vals-vars.tex:603-612`; `basic-lib/numbers.tex:466-478`; gap-ledger rows 404, 665, 725 and 728; the batch 12 and 13 `checker-count.txt` files; `ProjectFortress/tests/FileConversion.fss:60-84`; `Library/Pairs.fss:76-100`. `proposals.md`, `clean.txt` and `proposals.apply` hold the same nine entry lines.

On the evidence, every entry keeps its meaning but one: P-58. The cold reader's open points come down to three wordings that drop a condition the source gives (P-54, P-59, P-60), one sentence that states a target as done (P-58), and concepts already listed in `concepts.md`.

## P-54

**Fidelity.** The meaning holds. The title, the revision, "Why" and "Built" match way 2 of the 07:19:47.208Z text, his 07:28:28.361Z answer, `FortressLibrary.fss:649-657` and `numbers.tex:471-477`. Naming Python alone is fair: the question gave Python and Julia, and the repository holds a Python run only. One condition was dropped. The later state is way 3 of the question, which he took for later: "the `floor` and `ceiling` methods return `QQ` and pass infinities through, while the brackets and `truncate` return `ZZ` and raise". The entry says only "`floor` and `ceiling` keep `QQ`" and leaves out the pass-through.

**Comprehension.** The reader has the current state right. It cannot tell:
- what `floor` and `ceiling` do at +∞ and −∞ after the rung. The source answers this: they pass them through;
- which sense "keep" has. The title's "keep `ZZ`" means "stay at the declared type", and the later "keep `QQ`" means "return the argument's type";
- that `QQ` holds ±∞ and 0/0 at all. It inferred that.

It also asks whether the brackets are still built on `floor` and `ceiling` after the rung. No source settles that, and it is the rung's design, not the decision's.

**Class.**
- Wording. Write "Then `floor` and `ceiling` return `QQ` and pass the infinities through, and the brackets, `round` and `truncate` give `ZZ`." This rests on way 3 of 07:19:47.208Z. "Return" removes the second "keep". Way 3 does not name 0/0, so the wording says "the infinities" and not the three values.
- Concept: `QQ`, the rationals, holds +∞ (1/0), −∞ (−1/0) and the undefined 0/0, as the team built it (07:19:47.208Z). Define it in `references/library.md`, beside the number types. Review-queue item 25 needs it too, so it is not this entry's alone.
- Concept: rung, and PLAN's phases ("phase 4", "After the names"). They belong in the `fortress-repo` core, as `concepts.md` lists them.

## P-55

**Fidelity.** It passes. Each sentence matches the 07:59:01.341Z text that his "Item 15: 15a with (b) yes." took in, by way of the 11:56:38 list. The four operations come from Q15, and the trial judged them fair. The range check and the specification sentence stay out, as the trial left them.

**Comprehension.** It matches the trial's takeaway. The reader stumbles on the writer's new phrase "each part written only in numerals" and asks what a "part" is. The code answers it: "A size with each operation whose operands are numerals computed" (`Formula.scala:97-100`), applied from the inside out. `s0 + 2 + 3`, read as `(s0 + 2) + 3`, is not folded. The reader also asks about walk. The question that he answered says "Today: walk computes such sizes exactly" (07:59:01.341Z). Its other two questions are the checker's code, not his decision: whether `s0 s1` and `s1 s0` make one class or two at run time, and a negative difference. F-146 and the code hold them.

**Class.**
- Wording. Write "It computes each operation whose operands are both numerals, from the inside out, so `2 3` is the size `6`."
- Wording, optional. Add "Walk already computes such a size exactly when it makes an instance." It rests on 07:59:01.341Z, which he saw.

## P-56

**Fidelity.** It passes. The type, the five `fail` bodies, the cause, the five tests and the way not taken match the 14:55:36 text that he confirmed ("OK then.", 15:01:26.240Z) and section 5 of the review. "Why" is his own reason (14:54:50.968Z, "when we ran the probe P3, I understood that basically it made all the things worse"). The probe ran under walk, as the entry says.

**Comprehension.** It matches. The reader reads "lose their value" as "stop printing a result", which is the review's own sense: "A value: walk runs the program and prints a result. A stop: the run ends with an error instead." But it reports that the phrase reads two ways.

**Class.**
- Wording. Write "Why: under walk, a probe found that more small programs stopped with an error under it, where they had printed a result, than printed a result where they had stopped (`reviews/ranges-and-index-types.md`, section 5)."

## P-57

**Fidelity.** It passes. The two team declarations, the inherited `isLeftZero(l:L) = isZero(l)` (false) at `TotalComparison` and the fix are at `FortressLibrary.fss:116-123` and `:3342-3345`, and in `9ba86f7da`'s diff. "Why" is his ("I like getting the checker counts to zero.", 15:10:56.122Z), stated after its premise failed, as the audit did. The count files bear it out. Batch 12 has `FortressLibrary 2`, its only nonzero api row, with `#total 1`. Batch 13 has every api row at 0, still with `#total 1`. The refusal of `isLeftZero(Unordered)` stays out, on purpose, as the audit's apply left it.

**Comprehension.** The reader's mechanism is right. It differs from the source in two places:
- It cannot tell whether "the count's last error in an api file" means that the whole count reached zero. It did not: the component's own errors keep the count above zero (F-53; `ddd73d967`'s reason, "every api row is 0 and the count stays 1 from the component check's stop").
- It has to infer that `TotalComparison` lies below `Comparison`, though the mechanism ("more specific") rests on that.

What `Unordered` answers now is the point moved out. It is filed: review-queue item 211 (`329d866a9`), which landed at 08:51Z, after the writer's base `df0728b81`. So the writer's P-57 pointer is out of date. The queue now holds the item, and the settled line for row 582 names item 211. Only the `PLAN.md:382` part of that pointer still stands ("the `isLeftZero` pins are answered by P-57").

**Class.**
- Wording. Write "This change removed the last of the count's errors in an api file. Other errors keep the count above zero (F-53)."
- Concept: the comparison types. `Comparison` holds `Unordered` and the trait `TotalComparison`, whose values are `LessThan`, `EqualTo` and `GreaterThan` (`Library/FortressLibrary.fss:132-206`). Define them in `references/library.md`, since the orders and `LEXICO` use them beyond this entry. In the entry, one clause is enough: "`TotalComparison`, the type of `LessThan`, `EqualTo` and `GreaterThan`, lies below `Comparison`".

## P-58

**Fidelity.** It fails on one sentence. "It no longer names one of walk's glue classes" states the target as done. In the tree every binding still names a glue class. The scout found all 449 `builtinPrimitive` strings under `Library/` and `LibraryBuiltin/` naming `com.sun.fortress.interpreter.glue...` and none naming `nativeHelpers`. My grep of `Library/*.fss` finds 0 that name `nativeHelpers` (for example `FlatString.fss:36`, `"com.sun.fortress.interpreter.glue.prim.FlatString$Size"`). The record's text said "names a static helper ..., not an interpreter glue class", in the same present tense, but "no longer" adds a claim of change. The present tense of "Walk loads ...", "the compiled path rewrites ..." and "It refuses ..." also reads as built, yet neither the loader nor the rewrite is in the tracked tree (`P-58.md`, section 2). They are the first natives rung, by the question that he took (00:17:43.858Z): "What a yes to 1 means: the natives work starts with the loader rung for the interpreter and the rewrite, test first." `PLAN.md:81` calls that rung N0, the mechanism. The form, the timing and the way not taken are faithful. "Which the compiled path cannot use" rests on F-32.

**Comprehension.** The reader's top doubt is exactly this point: what is built and what is the target, and so which form a worker adding a native writes today. It also asks what the string's form is.

**Class.**
- Wording, which repairs the fidelity failure. Write "Its string is to name a static Java method in `nativeHelpers/`, the compiled path's helpers, such as `"com.sun.fortress.nativeHelpers.simpleIntArith.intLT"`, in place of the walk glue class that it names today, which the compiled path cannot use (F-32). Walk is to load the named helper through a loader beside its glue classes. At the parse, before the checker, the compiled path is to rewrite each such body into a synthetic `import java` of the helper and a call, and to refuse a string that names no helper." Then write the state line as "Still to build: all of it. Every binding still names a glue class, and neither the loader nor the rewrite exists. The first natives rung builds them, test first, and the later rungs move the bindings (PLAN, phase 4, "The natives")." The example string is `reviews/item35-natives-binding.md:101`, and `simpleIntArith.intLT` exists (`nativeHelpers/simpleIntArith.java:297`).
- The reader also asks whether walk refuses a string that names no helper. No source decides that: the refusal in the question is the compiled rung's. No change.
- Concept: rung, and PLAN's phases, as for P-54.

## P-59

**Fidelity.** The title drops a condition that the record's text had already lost, and the rewrite repeats the loss in its fifth sentence. His words put the end of walk's choice at walk running the checker, not at the switch-over: "at the moment we do not touch the walk system until we switch the library and then when the like we, we start running the type checker in the walk it will gain types and can switch" (14:07:20.452Z). The option that he took second says "Make walk match: needs static types under walk, which is the checker on interpreter programs, after the switch-over" (`judgement.md:358`). P-12 orders the same two steps after the switch-over. The entry has "Walk chooses a coercion by the run-time value until the switch-over" and "After the switch-over, walk uses the static coercions that the checker inserts". So a reader concludes that the switch-over alone ends the limit. The state line restores the condition, but it contradicts the title. The first text had "once the checker runs on interpreter programs", and `55f1a1352` cut it (`P-59.md`, section 3). The other sentences hold. The microGPT sentence stays as the audit's open question, and the writer carries that question.

**Comprehension.** The reader asks exactly this: "I cannot tell whether the switch-over alone ends it". It also reads "concrete" two ways. The bullet that holds the premise names the chapter's example. There `c: C = D` gives a static type `C`, a trait above `D`, the type of the value, and walk answers 4 for 3 (`XXXCoercionStaticRungC.fss`). So "concrete" means the reader's first sense: a static type that is the value's own type, not a trait above it.

**Class.**
- Wording, which repairs the dropped condition. Retitle the entry "Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over." Write the fifth sentence as "After the switch-over, once walk runs the checker on its programs (P-12), it uses the static coercions that the checker inserts." The review queue's settled line quotes the old title. The new opening "Walk chooses a coercion by the run-time value" matches neither the old title nor the writer's, so that line needs refreshing either way, as the writer lists.
- Wording. Write "MicroGPT's static types are concrete, each the type of the value itself and not a trait above it, so ...". This states the premise's sense from its own example and leaves its truth to question 1. Add the same sense to question 1, so that he answers on a claim that he can read.

## P-60

**Fidelity.** The meaning holds. The value reading, "covers", the Meet Rule's case and the intersection typing match his "Yes" (11:25:37.094Z) and the specification (`types-vals-vars.tex:607-611`, `overloading.tex:310-322`, `:700-706`, `:727-730`). "At calls that need no coercion" is the addendum's (`:16-17`). The added boundary clause rests on Astra's note, which he forwarded with "Astra no POPL2019 impact for next batch:" (17:29:19.700Z): "Do not generalize the new typing rule on the strength of the appendix proof." Item 58 stays open. One sentence narrows its source. "The addendum also asks that the checker search for coverage only inside its overloading check" stands for the addendum's "use a coverage query local to overload validity (and the static-tie justification) ... Do not broaden the shared normalizer" (`:186-188`). The rewrite drops the tie half and the contrast with the general subtype test.

**Comprehension.** The reader carries the decision. Three points differ:
- "Overloading check" reads two ways for it, and on the declaration-only reading it cannot see how a call gets several most specific declarations. The dropped half is the answer: coverage also justifies the call's static tie.
- It cannot read "a generic declaration that needs a run-time instance". The specification states the same boundary as "declarations with static parameters": "For declarations with static parameters one instance would have to meet every one of those return types at once, and the type of such a call is not yet given" (`overloading.tex:727-730`, with `:700-706`). Astra's note says the same: "that is different from dispatch having to choose a method's type arguments".
- "Closed trait" is undefined for it.

It also asks about a call that needs a coercion. The specification's Meet Rule case says "covering does not choose between two coercions" (`overloading.tex:320-321`). That is optional context, not a change of the decision.

**Class.**
- Wording. Write "The addendum also asks that the checker use coverage only in its overloading rules, to accept an overload set and to justify a call's tie, and not in its general subtype test."
- Uncertain fidelity, settled by the specification: does "a generic declaration that needs a run-time instance" mean every declaration with static parameters? It does. Write "A declaration with static parameters, whose instance dispatch must choose at run time, is outside the proof: one instance would have to meet every one of the return types at once. The typing by the intersection is not extended to it, and the specification states that boundary." This follows the specification's condition on the declarations that a call involves. It does not adopt item 58's narrower one, no static parameters in the whole family.
- Concept: the closed trait and "covers". Define them in the `fortress-repo` core, the bullet on traits, as `concepts.md` lists. P-60 decides "covers", so the entry keeps its own definition.

## P-62

**Fidelity.** It passes. Off the path, the hole, the owed tests and the attempt ("a rung tries to bring back", his "we try this. Let me try to resurrect this.", 11:38:29.550Z) match his "Agreed." (08:18:07.238Z), the 08:05:53 text and row 404. "As with Scala's `+S`" is an explanatory gloss that no source holds. It is accurate and decides nothing.

**Comprehension.** The reader matches the decision. It cannot tell two things:
- what the sign-refined number types are;
- whether P-80 records the rejection or the design.

"Owed in a batch rung" with no PLAN line is the record's real state. The writer's pointer, a PLAN line beside row 404, is the remedy, not the entry.

**Class.**
- Wording. Write "(which P-80 keeps word for word in the specification as a superseded design)" in place of "(P-80, a superseded design)". This rests on P-80's own text ("stays word for word, marked superseded").
- Concept: the sign-refined number types. Define them in `references/library.md`, as `concepts.md` lists.
- Concept: batch and rung, in the `fortress-repo` core.

## P-147

**Fidelity.** The meaning holds. The rule, its 2012 sources, the revision and the end of walk's allowance match option 1 of 23:39:05.946Z and his answers of 23:43:34.199Z and 23:49:12.486Z. Rows 725 and 728 are refusals of valid objects, as the state line says (ledger lines 298-299). Two small points:
- "Their objects define an inherited abstract operator once for each type that a `comprises` clause lists" is too broad for `FileConversion`. There `dnaSequence` splits `OPLUS` at `dnaSequence` and `EmptySequence`, but `EmptySequence` defines it once at `dna`, the plain case (`FileConversion.fss:65-82`). In `Pairs` both objects split (`Pairs.fss:78-99`).
- "Walk applies the same rule at load" leaves out a gap that F-145 states: "A generic object is not checked (row 665)". Walk's load check skips generic objects, so the rule does not reach them under walk.

**Comprehension.** It matches. The reader's two open points are minor. It asks whether "as the compiled checker reads it" is P-60's value reading. It is: a closed trait is covered by its listed types (`types-vals-vars.tex:607-611`; `59fdeff62`). It also asks how several parameters work. F-145 says "each position is split through the clauses, and every combination of parts must lie inside one body".

**Class.**
- Wording. Write "an object in each defines an inherited abstract operator once for each type that a `comprises` clause lists".
- Uncertain fidelity, settled by F-145. Add to the state line "and walk does not yet check a generic object at all (row 665)".
- Wording, optional. Write "A `comprises` clause counts as the compiled checker reads it, which is P-60's reading: ...".

## Across the chunk

- The concepts that the reader lacked are already in `concepts.md` in this folder: rung and batch; PLAN's phases; the closed trait and "covers"; the sign-refined number types. Two concepts are not there yet: `QQ`'s infinities (P-54) and the comparison types (P-57). Both belong in `references/library.md`.
- The writer's P-57 pointer about the review queue is done: `329d866a9` landed it after the writer's base. P-54's PLAN pointer still stands (`PLAN.md:90` has no `QQ`), and so do P-58's, P-62's and P-59's.

## His quotes

HIS 2026-10-09T07:28:28.361Z | QQ's ceiling and truncate per your recommendation that we first make it pass and then we'll later make it consistent with the ruling on, on float.
HIS 2026-10-09T13:51:11.783Z | Item 15: 15a with (b) yes.
HIS 2026-10-09T14:54:50.968Z | And that's why I was leaning towards C. But when we ran the probe P3, I understood that basically it made all the things worse. So I guess only option A with the fail bot is works.
HIS 2026-10-09T15:01:26.240Z | OK then.
HIS 2026-10-09T15:10:56.122Z | And you recommend to declare teams parameter total comparison, which takes the count to zero. Hey, let's do it. I have no idea what I'm deciding on, but let's push forward to zero.
HIS 2026-10-09T15:10:56.122Z | In between, but I like getting the checker counts to zero.
HIS 2026-10-10T05:27:34.812Z | Item 35, agreed with recommendation, option 1.
HIS 2026-09-29T14:07:20.452Z | item seven as recommended. So one now and two after the switch.
HIS 2026-09-29T14:07:20.452Z | It's just a decision that at the moment we do not touch the walk system until we switch the library and then when the like we, we start running the type checker in the walk it will gain types and can switch.
HIS 2026-09-29T11:25:37.094Z | Yes
HIS 2026-09-29T17:29:19.700Z | Astra no POPL2019 impact for next batch:
HIS 2026-09-29T17:29:19.700Z | Do not generalize the new typing rule on the strength of the appendix proof.
HIS 2026-09-26T08:18:07.238Z | Agreed.
HIS 2026-09-26T11:38:29.550Z | when we get to covariant that we try this. Let me try to resurrect this.
HIS 2026-10-13T23:43:34.199Z | I don’t see any other credible option to pick from.
HIS 2026-10-13T23:49:12.486Z | In accept the recommendation, basically just being informed of the spec edit based on later evidence.
