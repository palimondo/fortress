<!-- The POSITIONS audit's full run, chunk c6: the takeaway check. For each entry of rewritten-c6.txt, what the cold reader (cold-read-c6.md) took away, set against what the curator decided as his messages show it (curator-profile/show.py), with the coordinator's texts he answered read from the transcripts (positions-audit/tools/near.py, and the transcript lines named). One Opus reader; nothing else changed. -->

# Chunk c6: the takeaway check

- P-71: drift, small, from a kept sentence: "their siblings with that guard" did not tell the reader which; its do-line limits the guard rule to negation, `|·|` and `DIV`, and it asked whether walk was meant. The siblings are rider 1's guards in multiply, `REM`, `MOD`, `GCD` and `LCM`, which he took at 00:06:11Z (09-24).
- P-72: match. It asked what grounds the signed case; that is his "no" to rider 2 (00:06:11Z, 09-24). The ask's reason, that keeping the low bits is a bit operation, also answers its worry about P-73.
- P-73: match. Its two readings of "fully parenthesised" are both safe; the note he took (07:48:29Z, 09-26) refuses only an unparenthesised mix with other operators.
- P-74: drift, small, from a kept sentence: "An exact conversion is implicit" with "Built." says that `NN32` into `RR64` works today. It does not (P-75). The ask he took (12:01:24Z, 09-26) named only `ZZ32` and the numerals.
- P-75: match. The reader read the title as the intended rule and the body as its state, which is how he decided it (14:10:36Z, 09-29).
- P-76: match. Its doubt on what walk does with the one library today is answered by the ask he took (15:18:44Z, 09-29): the library half changes no walk output, and walk's numeral stays a `ZZ32` (F-74).
- P-77: match. Its two readings of "the public range traits stay generic" are the writer's question 1, not a new drift.
- P-78: match. It could not tell whether "`SUM e` and `DOT` keep their text" means the library or the call. The ask he took (14:05:27Z, 09-26) means the call: "Most sums stay as written".
- P-79: drift, small, from a kept sentence: "are respelled" did not tell the reader whether the four demo rows are done or owed. All four are open, and the reader's do-line puts the work under "still to do", which is right.
- P-80: match. Two doors are open: "sign-refined" could be read to take in `NN32` and `NN64`, which the ask set apart, and "superseded" could be read as final. His word at 11:38:29Z (09-26) was to try them again once covariance exists.

Times are UTC. "His" and "he" are the curator's. "Kept" means a sentence the writer left as it stood. "Tighten" is an optional fix where the reader took the meaning right but the text left a door open. A "fix" is offered where the drift is the text's. The reader's questions about the project's own terms are ignored (the brief's rule). Rows' states are from `ledger.py heads`.

## P-71: the overflow guard at zero

**The reader took away.** A guard that detects overflow in negation, absolute value or division compares the operand with the type's most negative value, not `a = -a`, which is also true of 0. The compiled natives are fixed. `|0|`, `-0` and `0 DIV -1` do not overflow. It asked whether "their siblings with that guard" means other compiled natives or walk's versions, and whether the headline is a standing rule for new guards.

**What he decided.** "Row 31 approved as recommended" (2026-09-22T21:32:27.487Z), to the coordinator's 21:17:28.215Z. That ask said: "The guard should test for the most negative value itself, one constant in six places", with the refresher that negating, taking the absolute value of, or dividing by minus one the most negative value overflow, and "Every other value, including zero, is safe". Then "(go, yes, no)" (2026-09-24T00:06:11.079Z), whose yes takes rider 1 of the coordinator's 2026-09-23T23:58:01.153Z: "The faulty overflow guard ... also sits in four more compiled natives, in multiply, remainder, modulo and the multiple under GCD and LCM. Measured on compiled `ZZ64`: `0 · 5` throws, and so do `3 REM 5`, `3 MOD 5`, `12 GCD 18`, `12 LCM 18`. The rider fixes all ten guards in eight methods".

**Verdict.** Match on the rule, the three zero cases and the Why. Drift, small, on the scope. The reader's do-line names only negation, absolute value and division. "Their siblings" could not tell it that the same guard was in multiply, `REM`, `MOD`, `GCD` and `LCM`. It guessed walk's versions instead. Rider 1 was compiled-only, and walk already answered 0 (the 21:17 ask: "The interpreter answers 0 for all three"). The reader's question on `DIV`'s divisor is about how the guard is coded, which is context it lacks. Row 333 is FIXED, and F-124 states the result: "The overflow checks fire only at the minimum, so `|0|`, `-0` and a zero factor answer 0".

**Where it comes from.** A kept sentence: "The compiled natives and their siblings with that guard are fixed." "Siblings" is the rider's name ("with the siblings"), not a list.

**Fix.** "The compiled natives' six guards, and the same guard in multiply, `REM`, `MOD`, `GCD` and `LCM`, are fixed" (rider 1 of 23:58:01Z, taken at 00:06:11Z, 09-24).

## P-72: `narrow` out of range

**The reader took away.** An out-of-range `narrow` keeps the low 32 bits and does not raise, for signed and unsigned types, on both paths. Why: the team's `tests/UnsignedTest.fss` asserts it for the unsigned case. It asked what grounds the signed case, and noted that P-73's overflow rule leaves a worker to infer that `narrow` is not overflow.

**What he decided.** "Row 43 approved as recommended." (2026-09-22T21:49:15.497Z), to the coordinator's 21:35:51.674Z: "truncate on both paths, one prelude body, with the signed sibling checked to match. Rung W's choice on this point is reversed." Its derivation: "On the unsigned types a narrowing that keeps the low bits is a bit operation, the same family as the shifts, and it is what the designer tested. The spec is silent, and where it is silent the designer's own test is the closest thing to intent we have." His "no" of 2026-09-24T00:06:11.079Z declines rider 2 of 23:58:01.153Z. Under that "no", the signed `narrow` from `ZZ64` to `ZZ32` "truncates too".

**Verdict.** Match. The rewrite's "asserts the unsigned case" gave the reader the true scope of the reason. The signed case rests on his "no" to rider 2, and the entry leaves that unsaid. The reader saw the gap and did not guess. Its P-73 doubt has an answer in the ask he took. That ask kept the question of whether a conversion is "an ordinary result" open, and settled it by calling the narrowing a bit operation. "Low 32 bits" is the 64-to-32 case the ask described; F-172 adds `ZZ` to `ZZ32`.

**Tighten (optional).** "... asserts the unsigned case, and the signed one follows by his choice (rider 2 declined, 00:06:11Z, 09-24); keeping the low bits is a bit operation, so P-73's overflow rule does not reach it (21:35:51Z, taken at 21:49:15Z, 09-22)."

## P-73: fixed-width overflow under walk

**The reader took away.** Fixed-width integer overflow, `NN32` and `NN64` included, raises `IntegerOverflow` under walk, as it does compiled. Code that wants wrap-around uses ∔, ∸ and ⨰, fully parenthesised. The saturating operators are not added yet. Why: the specification says so. It read "fully parenthesised" two ways, every use or only where they mix, and asked whether `0 - 1` on an unsigned type counts.

**What he decided.** "Agreed with the recommendation. Next" (2026-09-24T09:14:36.395Z), to the coordinator's 09:00:30.281Z on row 379. "Note from O looks solid to me. Don’t see any credible alternative, so unless you do let’s put that on the record." (2026-09-26T07:48:29.318Z) took `reviews/wrap-dependent-code.md`, section 10, option 1, with "the saturating family gets a later step of its own". The note's point 12: ∔ and ∸ "may be mixed with each other and bind looser than ⨰, and nothing else is stated for them ... so an unparenthesised mix of ∔ with `+`, `BITAND` or juxtaposition is refused, and every rewritten expression below is fully parenthesised". "Agreed, option 1" (2026-09-26T09:54:34.008Z), to the coordinator's 09:44:55.507Z, "do `NN32` and `NN64` stop wrapping under walk too?", where the spec "says every integer result that overflows raises `IntegerOverflow`, unsigned included", and rung O checks the unsigned "add, subtract, multiply and negate at both widths".

**Verdict.** Match. Both of the reader's readings keep code legal, and the stricter one is what the note's rewrites did. Unsigned subtraction below zero is inside "`NN32` and `NN64` included", by the 09:44 ask he took. Whether the compiled path has the wrapping operators is outside the entry: the note's option 1 has the compiled prelude's reversed operators leave at the switch-over.

**Tighten (optional).** "... parenthesised wherever they meet another operator, since their precedence is stated only among themselves" (the note's point 12, taken at 07:48:29Z, 09-26).

## P-74: mixed widths by declared coercions

**The reader took away.** Each wider number type declares a `coerce` from each narrower one, as the compiler prelude does. Only exact conversions are implicit: `ZZ32` and integer numerals into `RR64` implicitly, `ZZ64` into `RR64` written out. A generic call over mixed widths takes the narrowest type both arguments coerce into. `widens` is not used. Why: the compiler prelude, and lossy conversions are made visible. It inferred that "An exact conversion is implicit" makes `NN32` into `RR64` implicit, saw that P-75 says it is not built, and concluded that "Built" overstates. It also noted that the title says "integer widths" while the examples go to a float.

**What he decided.** "Go ahead with answer 8" (2026-09-26T11:43:08.586Z) and "Option 1, agreed." (12:01:24.267Z), to the coordinator's 11:43:42.784Z, "Answer 8: when numbers of different widths meet". Option 1: "Each wider integer converts from each narrower one. `ZZ32` and literals convert into `RR64`, which is exact. `ZZ64` into `RR64` stays explicit, because it isn't exact." The generic call or range takes "the narrowest type both sides convert into". The spec's widening "can be added later". His general rule came later, at 2026-09-29T14:10:36.799Z: "if it fits, then there should be direct conversion. No question about it." That word is P-75's, and its coercion is not built (row 575, CONTESTED).

**Verdict.** Match on the coercions, the `RR64` pair, the inference, the range pointer and `widens`. The narrowest-type inference is built on both paths (F-73, F-137). Drift, small, on "Built". The general sentence states the 09-29 rule, so the reader rightly took `NN32` into `RR64` as implicit, and the closing "Built." then claims it works today. It does not, as the next entry says. A worker who reads P-74 alone would expect an `NN32` to meet an `RR64` with no written conversion, and today that has no coercion to take. The title's "integer widths" did not mislead it: it read "each wider number type". The reader's point that numerals beyond 2^53 are not exact in `RR64` is about the ask's premise, not about what he took, and is outside this check.

**Where it comes from.** A kept sentence: chunk P3's general form, "An exact conversion is implicit and a lossy one explicit", beside the kept "Built". The ask he took named only `ZZ32` and the numerals, and the rewrite dropped the rest of "Built; no model line changed" but kept "Built."

**Fix.** End with "Built, but for `NN32` into `RR64`, which waits (P-75)". His 12:01:24Z (09-26) took only `ZZ32` and the numerals, and his 14:10:36Z (09-29) adds `NN32`. Tighten (optional): "Mixed number widths" in the title, the ask's own title.

## P-75: `NN32` into `RR64`

**The reader took away.** The intended rule is that `NN32` coerces into `RR64` implicitly. It is not built, because the coercion makes `ZZ32` with `NN32` ambiguous between `RR64`'s and `ZZ64`'s operators. Until PLAN item 37 settles it, such arithmetic resolves to `ZZ64`. Why: the conversion is exact (P-74). It flagged that the title reads as present fact.

**What he decided.** At 2026-09-29T14:10:36.799Z, reading item 9 of the decisions audit page ("Does `NN32` coerce into `RR64`?", "Exact, and left explicit only because the decision named `ZZ32` and the numerals", recommendation 1): "Like, if it fits, then there should be direct conversion. No question about it. Is that the option one?" The coordinator's 14:10:52.343Z: "You're right, and yes, that's option 1." Row 575 is CONTESTED, and review-queue item 21 holds the way to build it.

**Verdict.** Match. The reader took the title as his rule and the body as its state, which is the shape of his decision. The writer's two cuts ("two team tests fail", "not building it is the default") took nothing the reader needed: "Until PLAN item 37 settles it, such mixed arithmetic resolves to `ZZ64`" is the default, read from "where P-74 gives `ZZ64`". Its doubt that P-74 never names `ZZ64` is answered by the narrowest-type rule, without the coercion: `ZZ64` is the only type both convert into (F-137: "`ZZ32` with `ZZ64` gives `ZZ64`"). No text needed.

## P-76: the numeral switch

**The reader took away.** An integer numeral's type is `IntLiteral`, which each number type converts from. It is live in the library now. Under walk it waits for walk to get the checker's static types (PLAN phase 4), so walk's half is not built now. The team's held-back `IntLiteral` arithmetic is enabled. Why: the specification's numeral types are unfinished. It asked what the library half means under walk today, if walk runs the same library.

**What he decided.** "So, I think with the int literal, I think the split option three makes most sense. So, yes to that, although I, I am not. fully understanding the nuances of, of that split" (2026-09-29T15:18:44.154Z), to the coordinator's 14:51:12.334Z (transcript `fe616d40-...until-2026-10-08T15-41.jsonl.parts/002.jsonl:12237`): "**The library half is independent.** It changes no walk output". Option 3: "Now: the library half goes into batch 8 ... no walk change. Later: walk's switch comes after the switch-over's step that gives walk static types." The direction is his own word of 2026-09-27T09:45:13.353Z: "walk needs to be corrected and switched to using in literal".

**Verdict.** Match. The reader's doubt has its answer in the ask he took: the library half changes no walk output, so walk's numeral stays a `ZZ32` until Q-walk (F-74: "Walk's numeral stays an `Int` until walk has the checker's static types"). The entry's "under walk once walk has static types" says the same thing from the other side. Float numerals and what `IntLiteral` arithmetic does to typing are context the reader lacks. His caveat about the nuances is not in the entry; the writer sent it to the history. That does not change what he chose.

**Tighten (optional).** "... in the library now, with walk's numeral still a `ZZ32`, and under walk once walk has static types" ("It changes no walk output", 14:51:12Z, taken at 15:18:44Z, 09-29).

## P-77: ranges over `ZZ32`

**The reader took away.** Scalar ranges have `ZZ32` bounds only. A range over another integer type is a static error, and a wider count is a `ZZ32` loop that widens its index. Ranks 2 and 3 are tuples of `ZZ32` ranges. The public range traits keep a generic index type. Why: `ZZ32` is the JVM's largest array size, and the compiler library declares ranges so. It saw two readings of the traits clause next to the static error, and asked about counts beyond 2^31.

**What he decided.** "Option 1, ZZ32" (2026-09-27T19:23:07.996Z), to the coordinator's 18:46:10.100Z, "Decision: should the library's ranges be over `ZZ32` only?". His reason, unprompted, at 15:24:22.608Z: "ranges can realistically have only ever be ZZ32 because that's the largest array size on JVM". On 2026-10-09 (07:05:31.926Z) he worried: "maybe I am now ruling against some generic indexing type ... So maybe I made some decision that needs to be reverted". He then read `reviews/ranges-and-index-types.md`, which says that the public range traits are generic "as the team left them" (14:54:50.968Z; 15:01:26.240Z).

**Verdict.** Match on `ZZ32`, the static error, the widening loop, the ranks and the Why. His reason covers all ranges, not only array indices ("ranges can realistically have only ever be ZZ32"), so the reader's doubt about plain loops is answered. A count beyond 2^31 is outside the ask he took. The traits clause has no source of his. The writer put it to him as question 1, and the reader's two readings are that same open point, not a new drift.

**Fix.** None now. If he confirms question 1, "the static error is the library's scalar range's; the public range traits stay generic, as the team left them" closes the two readings (the review he read, 14:54:50Z, 10-09).

## P-78: `SUM` and `PROD`

**The reader took away.** `SUM` and `PROD` are each one generic reduction over the algebraic traits, with the identity from the static argument. Where nothing at the call fixes a clause form's element type, write the static argument out. `BIG MAXN`, `BIG MINN` and `BIG MINMAXN` are removed. `MAX` and `MIN` have no identity on the integers or floats. Why: the identity depends on the type. It could not tell whether "`SUM e` and `DOT` keep their text" means the library's definitions or the call sites, and asked what an empty `BIG MAX` does.

**What he decided.** "Agreed, option A" (2026-09-26T14:05:27.854Z), to the coordinator's 13:20:54.738Z: "**Most sums stay as written.** `SUM e`, `SUM vm` and `DOT` don't change." The catch: "A sum written with a generator ... where nothing in the call says what type the elements are, can't be typed by either path." "I accept the recommendation" (16:21:41.705Z), to the 16:13:55.367Z judgement: "The plain `BIG MAX` has no identity. An empty one raises `EmptyReduction`", and "drop the three". He asked whether this should be revisited once `where` clauses exist. The coordinator answered at 16:22:52.193Z that the revisit concerns how `SUM`'s zero and `PROD`'s one are made, and that "`MAX` and `MIN` still get no identity on integers or floats", even then.

**Verdict.** Match. The do-line says "write the static argument out", so the reader put the duty on the program, as the ask did. Dropping "as the team's tests do" left the clause form as the grammatical subject, but did not change what the reader understood. "Keep their text" means the call sites, as the ask says, and F-59 says it plainly ("`SUM e` and `DOT` need none"). The empty `BIG MAX` raises `EmptyReduction` (F-60, which the entry cites). Nothing replaces the three `N` operators ("Nothing calls them either way"). P-48 and this entry do not compete: P-48 sets the instance of a parameter that nothing fixes, and this entry says when the program writes it.

**Tighten (optional).** "... a program writes its static argument; `SUM e` and `DOT` are written as before, with none" ("Most sums stay as written", 13:20:54Z, taken at 14:05:27Z, 09-26).

## P-79: the team's demos

**The reader took away.** Keep every team demo running. If your change breaks a demo and the fix is known, rewrite the demo in the same batch. If a demo fails for lack of a feature, leave it until the feature is built. Still to do: measure which demos run, and a rung for those with a known fix. It found no Why. It could not tell whether "So the demos that fail today are respelled where the way is known" means done or owed, given "Still to build" after it.

**What he decided.** At 2026-10-20T11:52:00.829Z: "Yes. Rewrite these demos to make them work, since we know how. ... Now generally I would prefer we maintain them all in running state as we are making changes in the unsealed tree. ... But if we arrived at a point where we needed that for the switchover, built it and can now demo work again, we should." This was his answer to the coordinator's 07:23:57.933Z on `npbft.fss:130`. On 2026-09-29T15:49:10.603Z, at item 10 of the audit page, which was framed as a "tension with 'one tree with everything running'", he had said: "Sure, yes, number ten, we should make the demos run again." The list of old demos is the coordinator's application of his word, which it told him at 11:57:46.972Z and he did not contest.

**Verdict.** Match on the rule, the same-batch rewrite, the feature clause and the work still to build. The striking of "His word ... replaces ..." cost the reader nothing: its takeaway is his 10-20 word. Drift, small, on the list's state. Rows 670, 710, 791 and 731 are all open (NEGATIVE-VERIFIED). "Are respelled" reads as a description of today, and the reader could not tell. Its do-line does put the work under "still to do", so the action is right; only the state is in doubt. "Why: not stated" is a gap the text could close cheaply: his reason is "as we are making changes in the unsealed tree". Which path the demos run on is context the reader lacks.

**Where it comes from.** A kept sentence: "So the demos that fail today are respelled where the way is known", the coordinator's application. Its present tense once followed a sentence that the rewrite struck.

**Fix.** "So the demos that fail today are owed that respelling where the way is known: ... (rows open)". This is his "maintain them all in running state as we are making changes in the unsealed tree" (11:52:00Z, 10-20), which also gives the entry its Why.

## P-80: the sign-refined number types

**The reader took away.** Do not use or build the sign-refined number types. A program tests the sign by comparison, and a float's finiteness by `check` or `check*` on `RR64`. Leave `advanced-lib/numbers-advanced.tex` word for word, apart from the S1 marking, so that the design stays on record. It asked whether "sign-refined" takes in `NN32` and `NN64`. It also saw two readings of "Their return with covariance is P-62's": abandoned for good, or deferred until covariance.

**What he decided.** "Option 1, agreed. But let's make sure we clearly record uh, the original design and can when when we reintro when we get to covariant that we try this. Let me try to resurrect this." (2026-09-26T11:38:29.550Z), to the coordinator's 11:21:27.012Z, "Answer 6: the spec's sign-refined number types". That ask lists "18 rational types (ℚ, positive ℚ, non-negative ℚ, non-zero ℚ, and so on) and the same refinements for the integers", and says "The unsigned machine types, `NN32` and `NN64`, are separate types." Option 1: run-time checks, and the advanced chapter "kept word for word and marked as a superseded design". P-62 now says: "When it lands, the specification's sign-refined number types come back as covariant static parameters."

**Verdict.** Match on the decision, the run-time tests, the kept chapter and its reason. The reader read the reason right: the original design is kept on record, his own condition. Two doors are left open, and the reader went through neither. First, "sign-refined" names no type, and the ask set `NN32` and `NN64` apart. A worker who counted them in would avoid live types that P-73 and P-75 use. Second, "superseded" and "return" leave a choice between final and deferred. His word was "deferred": "when we get to covariant that we try this".

**Tighten (optional).** "The specification's sign-refined subtypes, such as positive ℚ and non-negative ℤ (not the machine types `NN32` and `NN64`), are a superseded design ... ; once covariance is built, a rung tries to bring them back (P-62)" (11:21:27Z, taken at 11:38:29Z, 09-26).
