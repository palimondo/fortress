<!-- The POSITIONS audit's full run, chunk c7: the takeaway check. For each entry of rewritten-c7.txt, what the cold reader (cold-read-c7.md) took away, set against what the curator decided as his messages show it (curator-profile/show.py), with the coordinator's texts he answered read from the transcripts (positions-audit/tools/near.py). One Opus reader; nothing else changed. -->

# Chunk c7: the takeaway check

- P-153: drift, small, from a kept sentence: "a base of 0 raises `DivisionByZero`" reads as every exponent (the reader's do-line says so); his yes (00:44:34Z, 10-20) and walk's `negativePow` put it at a negative exponent only. The split on the base matches his 05:56:19Z.
- P-84: match. The reader flagged that the kept title's "`double[]`" does not say float arrays; it read the scope right from the last sentence.
- P-87: match. "Shown to him as a diff" read as a gate for his yes; that is the open point of the writer's question 1, not a new drift.
- P-89: match. Its doubts (does a function `fill` stay as an alias? does `fill` of a function value fill with it?) are answered by the rename he took (12:17:35Z, 09-26).
- P-90: drift, from the rewrite, deliberate: the reader takes the bare `Nothing` as ruled out for good; his 09-21 word (21:20:29Z) made it future work gated on `where` clauses. It holds only if he takes the writer's question 1. His S2 yes (08:07:48Z, 09-26) supports it.
- P-91: match. The kept "bare" could be read as dropping type arguments; the default he took prints `Box[\ZZ32\]` (04:45:52Z, 09-22).
- P-95: match. The kept "No discrepancy ... stays open" does not say which side gives way; his 07:03:57Z (09-24) says the specification is updated with the revival's change.
- P-96: match. The reader could not tie "the Working Draft of February 2011" to `Specification-1.0-frozen/`; the ask he took (09:19:58Z, 09-26) says they are the same text.
- P-97: match.
- P-98: match. The reader feared that a cautious worker would hold off; his 17:44:02Z (09-29) says "the default stays, it doesn't block the run".

Times are UTC. "His" and "he" are the curator's. "Kept" means a sentence the writer left as it stood. "Tighten" is an optional fix where the reader took the meaning right but the text left a door open. A "fix" is offered where the drift is the text's. The reader's questions about the project's own terms are ignored (the brief's rule).

## P-153: the integer power

**The reader took away.** Each integer type's `^` returns its own type at every exponent. A negative exponent with no integer result raises `IntegerOverflow`. Base 0 raises `DivisionByZero`. Bases 1 and -1 give their exact power. A fraction comes from a float or rational base. Next, the compiled path's powers follow the same contract. Why: overloads choose by type and no type carries the sign, so the split is on the base, and the sign is tested at run time.

**What he decided.** "Yes." at 2026-10-20T00:44:34.730Z. He quoted the recommendation of the coordinator's 00:19:08.321Z ask 2, whose option 1 (E) is the entry's contract word for word: "A negative exponent raises `IntegerOverflow`, a base of 0 raises `DivisionByZero`, and bases 1 and -1 give their exact power". At 05:56:19.215Z he did not recognise "a negative power raises an error" as his decision: "We designed some kind of split solution. It is possible that in one instance we would raise an error." The coordinator restated the decision as a split on the base (05:56:57.217Z), and he went on from that ("Okay, let's get through them.", 06:01:04.054Z). The new title is that restatement.

**Verdict.** Match on the decision, the split, the Why and what is still to build. Drift, small, on one clause. The reader's do-line says "For base 0, raise `DivisionByZero`", with no exponent. It notes that the clause "almost certainly" means a negative exponent, and that the text does not say which error wins at `0^(-1)`. In the ask he took, the clause sits under "A negative exponent raises ...", and walk does exactly that: `Int.negativePow` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:288-293`) is reached only when `exp < 0`, returns for 1 and -1, throws `DivisionByZero` at 0 and otherwise throws `IntegerOverflow`. So `0^2` is 0.

**Where it comes from.** A kept sentence: the coordinator's option text, which he took whole at 00:44:34Z. Its list form lets the clause on 0 stand alone.

**Fix.** Write the contract as: "at a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`". It is his yes of 00:44:34Z (10-20), ordered as walk checks it. That ordering also answers "which wins".

The reader's other doubts need no text. Overflow at a positive exponent is the library's general overflow rule, which the ask cited. The name `IntegerOverflow` is his choice in that yes. The "types an integer power ..." clause was parsed right.

## P-84: `double[]`, unboxed, with the `nat` sizes

**The reader took away.** Array elements are stored unboxed, as `double[]`. The team's `nat`-sized types are kept. The sized types and the checker's `nat` parameters are built together, in the library's own patterns. P-85 says how `double[]` goes under a float vector.

**What he decided.** At 2026-09-19T18:32:48.384Z: "we must go to double array for performance. There is again no question about this. If this should have been high performance language, it cannot be boxed", and "I don't know we can sidestep the net NAT uh, issue. That is a central design point that they are using". He was answering the coordinator's 18:24:23.475Z, where question 1 was the float storage ("boxed objects or Java `double[]`?") and question 4 had the layered default (sizes as run-time fields now, sized types later). "In the library's own patterns" is his 18:31:44.057Z ("study the existing parts of the fortress library meticulously, and use those patterns"). "Together" is the coordinator's reading of 18:33:40Z, told to him ("the array fork and the `nat` fork are taken together"). He did not contest it. At 2026-09-20T14:27:53.739Z he restated the reason: a language that does not use native arrays on the JVM cannot be high-performance.

**Verdict.** Match. The reader flagged that the title does not limit `double[]` to float arrays, and it took the float reading from the last sentence. Its do-line ("store array elements unboxed") keeps his general point, "it cannot be boxed". "Same change or same phase?" and "which patterns" are context the reader lacks.

**Tighten (optional).** "A float array's storage is `double[]`, unboxed, ..." matches the question he answered (18:24:23Z, Q1) at 18:32:48Z (09-19).

## P-87: the model's text is the notation

**The reader took away.** An operator in the model is never turned into a function call to get past an overload check; the library vocabulary is fixed instead. Any repair that changes a model line is shown to him as a diff before it is built. Decision D is such a diff, and none of it is applied before phase 5. The reader added that most readers would wait for his approval after showing him.

**What he decided.** At 2026-09-19T18:13:00.524Z he answered `mask + ...` becoming `planeSum(mask, ...)` with "NO. NO! NOOOOO! That’s not Fortress!". At 17:01:32.913Z: "The fix is to compose the algorithm using the standard array operations". At 18:21:22.941Z the types "must be able to compose ... in normal mathematical ways". The diff rule's only seed is his 18:02:13.648Z: "if we found a minimal fix for the C4, like just show it to me. ... Why, why does it need? A blessing if it performs the same". Decision D: "Yes. Agree with recommendation." (2026-09-27T19:34:10.747Z), to option 1 of the coordinator's 19:31:23.674Z: write the sized signatures "as a diff for you to see, and apply nothing until phase 5". That ask called the diff rule "Your rule of 09-19".

**Verdict.** Match on the operator rule, the vocabulary, decision D and phase 5. The reader took "shown" as a gate for his yes. His seed asked only to be shown, and asked why a blessing was needed. His "NOOOOO" shows that showing him does catch a change he refuses. Whether the rule waits for his yes is part of the writer's question 1 (is this his standing rule?), so it is not a new drift. The title/body tension the reader raised was resolved correctly: model lines may change, but an operator never becomes a call.

**Fix.** None now. When he answers question 1, add "for his yes" only if he confirms the rule in that form.

## P-89: `fill` and `tabulate`

**The reader took away.** `fill` takes a value; the function form is named `tabulate`. Why: peer languages use `fill` for the value, and Scala names the function form `tabulate`. It asked whether a function-taking `fill` stays as an alias, and whether `fill` of a function value fills with that function.

**What he decided.** "Agreed, tabulate." (2026-09-26T12:17:35.442Z), to the coordinator's 12:14:58.152Z answer 10: "The judgement renames the function form and keeps `fill` for the value", with the diamond fix alongside.

**Verdict.** Match. A rename leaves no function `fill`, so the alias question has an answer in his decision, and "the function form takes Scala's name" says rename. The rename exists because an element can itself be a function (the ask's "a function argument could mean either one"), so `fill` of a function value fills with it. His yes also covered the diamond fix. The entry leaves that out, since its placement is review-queue item 112, his to confirm (corrections-c7.md, P-89). That is outside the entry's title and is not drift.

**Tighten (optional).** "... and the function form is renamed `tabulate`, Scala's name" makes the rename explicit (12:17:35Z, 09-26).

## P-90: `Maybe`'s empty case

**The reader took away.** `Maybe`'s empty case is written `Nothing[\T\]` in the library and the specification. The bare `Nothing` is not tried, because instantiation exclusion forbids it with or without a `where` clause. The reader read "not tried" as either "don't experiment" or "ruled out".

**What he decided.** At 2026-09-21T21:20:29.106Z: "Maybe’s empty case, keep team’s paramedic [parametric] speaking. Document the future work gate on where clause availability." He was answering option 1 of the coordinator's 21:08:15.030Z, which said the bare form needs coercion or "`where` clauses that bind a type variable in an extends clause", and that the specification's spelling stays "a recorded gap until `where` clauses exist". At 2026-09-26T08:07:48.939Z ("S2 yes, take the verdicts for rung S") and 08:18:07.238Z ("Yes. Sure.") he took the S2 verdicts of the coordinator's 08:00:01.931Z. Under them, the specification's examples that break instantiation exclusion, its `Nothing` among them, become the library's `Nothing[\T\]`, and the originals stay marked "Not allowed". The specification that rung S wrote says "instantiation exclusion closes that road" (`Specification/basic-lib/convenience.tex:74-79`; F-21, F-167). The same ask listed "row 331's bare `Nothing` re-gated on type inference" as not covered.

**Verdict.** Drift from his 09-21 word. The reader rightly takes the bare form as closed for good. He made it future work behind a gate that would open when `where` clauses work. The parametric half matches.

**Where it comes from.** The rewrite. It is deliberate, and its facts are sound: his S2 yes took verdicts that make the bare form a refused example, and the specification refuses it by the rule itself. But he never said in his own words that the gate is closed, and the writer put exactly that to him as question 1.

**Fix.** Apply the rewrite only if he takes question 1. If he keeps the gate: "The bare `Nothing` is future work, gated on `where` clauses (21:20:29Z, 09-21); the specification under his S2 yes (08:07:48Z, 09-26) marks it "Not allowed" (F-21, F-167)."

## P-91: what an object with no `asString` prints

**The reader took away.** On both paths an object with no `asString` prints its bare type name, as walk spells it. Any debug marker goes in `asDebugString`. Still to do on the compiled path: `asDebugString` printing `a Box: Box`, and the stack overflow of an object with a member named `toString`. It asked whether a parametric object prints its type arguments, and whether `a Box: Box` is "the marker".

**What he decided.** "yes,  row 27 close per default-rendering-judgement recommendation." (2026-09-22T04:45:52.849Z), to the coordinator's 2026-09-21T21:53:45.883Z: "the bare Fortress type name, with the type arguments where there are any". Walk prints `Box[\ZZ32\]` for a generic instance. "The debug marker you had in mind has a home already: ... `asDebugString`, which the interpreter prints as "a Box: Box"". The judgement's default lists "`Box`, `Box[\ZZ32\]`, `Pt`", and its recommendation restores walk's article `asDebugString` on the compiled path ("If a marker is still wanted, put it in `asDebugString`"; `reviews/default-rendering-judgement.md`, section 5). His marker was option 2 ("Leaning 2, as these are debug messages in my mind", 21:26:46.253Z; "Same behavior in interpreter and compiler, if possible?", 21:32:52.066Z).

**Verdict.** Match. The marker and the two compiled-path items are what he took. The reader read the overflow as a bug to fix, rightly. One doubt has a cheap answer in the text: in the kept title, "bare" means no marker and no hash, not "without type arguments". A worker who does not know walk's spelling could strip `[\ZZ32\]`.

**Tighten (optional).** "... its Fortress type name, walk's spelling (`Box`, `Box[\ZZ32\]`), on both paths" (the default he took at 04:45:52Z, 09-22).

## P-95: every change to the specification is recorded

**The reader took away.** Record every specification change with its reason. Leave no mismatch between the specification and the implementation open. Keep the original text and the reasons so that route C stays open. Use the S1 form. Never touch `Specification-1.0-frozen/`. It could not tell which side gives way when a mismatch is closed.

**What he decided.** At 2026-09-24T07:03:57.849Z: "our plan needs to update the spec with the change that we do and, and somehow properly record why ... so that there is no like open discrepancy between the spec and our implementation that would be confusing to people. We need to preserve the original historic record somewhere in a document with our reasoning ... and preserve the option to go the route C". The frozen copy: "Agreed. Route A it is." (14:41:40.798Z), to an ask that held it "untouched" for one rung. Its standing "never" is the coordinator's extension, and it is the writer's question 1.

**Verdict.** Match. His message settles which side gives way: the specification is updated with the change the revival makes. The kept sentence "No discrepancy ... stays open" leaves that unsaid. A reader could close a gap by bending the implementation instead, which is not what this entry is about.

**Tighten (optional).** "When the revival changes the language, the specification is updated with the change, so no discrepancy stays open to confuse a reader" (07:03:57Z, 09-24).

## P-96: the S1 form

**The reader took away.** Mark each changed passage with a callout that prints in every build, not a `\note`. In Appendix I's revival section, give each change its reason, its original text, the way back to route C and the decision it follows. Add one front-matter paragraph and a repository document with the full reasoning. Cite the unrevised copy as the Working Draft of February 2011. Details are in the skill. It could not tell how "1.0", "its 2009 draft", the February 2011 draft and `Specification-1.0-frozen/` relate, or which is "the original text".

**What he decided.** "S1 — 1, teams’ way." (2026-09-26T07:48:29.318Z), to option 1 of the coordinator's 01:56:02.857Z: "a labelled mark at each changed passage that prints in every build, a revival section in Appendix I with the reason, the original sentences and route C, a paragraph in the front matter, and the full reasoning in a repository document". `\note` "would also vanish in a release build". "Option 1, agreed." (09:19:58.593Z), to the coordinator's 09:08:39.457Z: the unrevised text "sits in `Specification-1.0-frozen/`", whose sources are "the working draft as it stood on 2011-02-02", and is called "the Working Draft of February 2011". For item 23 he chose option (a) at 2026-09-29T17:44:02.015Z ("update the appendings to list the changes that we did"): each entry names its decision.

**Verdict.** Match on every part of the form. The one confusion that bears on action, which text is the original, is answered by the ask he took: the frozen directory is the February 2011 draft. The entry does not say so. Route C for every change, and where the repository document lives, are context the reader lacks.

**Tighten (optional).** "The unrevised copy, `Specification-1.0-frozen/`, is cited as the Working Draft of February 2011" (09:19:58Z, 09-26).

## P-97: the refused examples

**The reader took away.** Each specification example that instantiation exclusion refuses stays, marked "Not allowed", next to the library's shape. The rule is stated once, in Luchangco's two-part form. The covariance callout notes the later `covariant` modifier, which neither path implements. Appendix A's calculi keep their rules, with a callout that they predate the rule.

**What he decided.** "S2 yes, take the verdicts for rung S" (2026-09-26T08:07:48.939Z) and "Yes. Sure." (08:18:07.238Z), to the coordinator's 08:00:01.931Z. There, each example "becomes what the library already does", "the originals: each stays in the text marked "Not allowed"", and the rule is "stated once, in the two-part form from Luchangco's 2012 Types chapter". "Option 2, agreed." (09:29:33.563Z) took the one sentence on `covariant`. "Agreed." (18:59:23.595Z) took a callout at each calculus, leaving the rules as the team wrote them.

**Verdict.** Match. The reader resolved the title/body tension the way his yes reads: the example takes the library's shape, and the original stays beside it, marked. "Where is the rule stated" is answered by the two-part form itself (the types chapter and the traits chapter), which is context the reader lacks. "Is `covariant` to be built?" is outside the entry: the S2 ask put it in the decision record only.

## P-98: `TotalComparison` and `StandardMinMax`

**The reader took away.** `TotalComparison` extends `StandardMinMax[\TotalComparison\]` in the api and the component, to get `MIN` and `MAX`, and keeps its five restated members. He took it on the coordinator's recommendation. The reader read it as standing, with the review only an explanation, but feared that a cautious worker might hold off.

**What he decided.** At 2026-09-29T17:44:02.015Z, on item 22 of the coordinator's 15:53:50.678Z (option (b), "one header line in the api, one in the component", recommended): "I'll have to rely on your recommendation there", "we should go over it one more time later where you explain it to me in more detail when I have more energy", and "just 22 is something I need to understand better, but the default stays, it doesn't block the run".

**Verdict.** Match. The reader's reading is his: the decision stands, and what is owed is an explanation. The kept phrase "on the list for his review" is what makes a cautious worker hesitate. His own words close it.

**Tighten (optional).** After "on the coordinator's recommendation", add: "it stands and blocks nothing ("the default stays, it doesn't block the run", 17:44:02Z, 09-29); he wants it explained ...".
