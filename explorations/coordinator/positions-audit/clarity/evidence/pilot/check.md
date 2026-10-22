<!-- The clarity pass's check of ten rewritten POSITIONS entries (2026-10-22): each entry in pilot/proposals.md against the audit's proposed text and the curator's words, and the cold reader's paraphrase in pilot/cold-read.md against the source meaning. -->

# Check of the clarity pilot: P-45, P-50, P-51, P-12, P-29, P-40, P-74, P-146, P-153, P-67

What I read for each entry: the text now, the audit's proposed text and the evidence files, as `clarity/entries.py` prints them. For each entry I read the scout's report, the judgement, the corrections and the takeaway. I checked his messages with `curator-profile/show.py`, and read the coordinator's questions behind them with `positions-audit/tools/near.py`. Where a claim is about the tree, I read the gap-ledger rows, FACTS, PLAN and the code that the claim names. I ran no build or test.

The classes are the brief's. Some failures are certain: the rewrite says more or less than the sources, and a change of wording fixes it. I file those under **wording**, marked *(fidelity)*, with the source. **Concept** gives a concept that the reader lacked, and where it should be defined. **Uncertain fidelity** gives the source that would settle the point.

---

## P-45: overloaded declarations may differ in their static parameters

**Fidelity.**
- Most of the entry matches the audit's text and his yes. He wrote "Yes, agreed." (2026-09-26T12:07:33.636Z) and "Agreed, the judgement's recommendation." (12:08:32.187Z), to the coordinator's "Answer 9" of 12:01:53.076Z. The rewrite's additions are true: the paper is in `Papers/Types/`, the three rules are named, and the checker "already used" the paper ("The compiler's checker follows the team's 2011 paper instead", 12:01:53).
- "Walk and the checker must accept the same pairs" states a purpose clause as a requirement. His words, "Does this mean bringing it in line with the compiler’s checker behavior? Then yes." (2026-10-16T19:47:32.836Z), make parity the condition of his yes. The judgement reads the clause the same way (`judgement-c3.md`, "P-45"). Fair.
- **The "Still to build" line changed meaning, and the rewrite's "Meaning: unchanged" does not say so.** The audit wrote "the pairs that walk or the checker still reads otherwise", meaning otherwise than these rules. The rewrite writes "the pairs that walk and the checker still judge differently". Several of the rows it cites are not disagreements:
  - Row 539: both paths refuse the paper's valid set. Walk refuses it at load, the compiled form is the expected failure `compiler_tests/XXXOverloadExistentialMeet`, and review-queue item 77 says "Gated on both paths".
  - Row 780: walk loads the pair and then fails at a call ("Cannot find definition for method"). That is a failure at a call, not a judgement of the pair.
  - Row 779 and F-26: walk misreads functional methods. Row 779's text compares walk's verdict with walk's own verdict on the same pair as top-level functions, and states no verdict of the checker.
  - Only rows 759 and 786 to 788 record walk against the checker.
  So the new line narrows the unfinished work to disagreements. A worker who fixed every disagreement would think the entry finished, with rows 539, 779 and 780 still open.
- "The library repairs ... with exclusion declarations of its own" is narrower than his yes. The ask that he took said "repaired with its own techniques: marker traits and `excludes` clauses ...; named helpers chosen by a type test; and one declaration slip corrected" (12:01:53). This is carried from the audit, and the writer's question 1 asks him about it. That is the right route, because the audit's text is what he is about to approve.

**Comprehension.** The reader's paraphrase is right on the specification, the checker's rules and walk's dispatch. It differs from the source in five places:
- The title against the agreement rule. The source says that "one narrow rule survives from the old sentence" (Answer 9). The entry does not say that the positional rule is the only survivor, so the title reads as an unlimited freedom.
- "every instance". The source means every instance that the rule's argument types allow, in place of "one guessed solution" (`reviews/overloading-judgement.md:14`, `:58`). It does not mean the instances that a program makes.
- "every pair of generic declarations". His question meant pairs in which both declarations are generic (row 159: "two generic declarations"). The reader's "at least one" comes from `interpreter.md`, which also covers the earlier lift for a generic beside a plain declaration.
- "also where no pair of their parameter types excludes". This was opaque to the reader because the entry never says what walk did before. Row 159: walk "refuses at load two generic declarations of one name unless some parameter pair excludes, even when one is more specific".
- The attachment of "with exclusion declarations of its own".

**Failures by class.**
- **Wording (fidelity), the Still-to-build line.** Proposed: "Still to build: the pairs that walk or the checker still judges against these rules (F-26, walk's comparison of two functional methods of a generic trait or object on the instance that a call makes; gap-ledger rows 539, 759, 779, 780 and 786 to 788; PLAN, phase 3, item 19)." The sources are the audit's text and ledger rows 539, 779, 780 and 759. This also names F-26 in words, which task rule 5 asks for.
- **Concept, in the entry (it belongs to this decision alone): walk's old requirement that some parameter pair exclude.** Proposed: "At load, walk judges every pair of two generic declarations by the checker's rules on their declared parameter types. It does not refuse a pair only because none of their parameter types exclude, as when one declaration is more specific than the other (gap-ledger row 159)."
- **Wording, the title against the agreement rule.** Proposed: "One rule of the old sentence survives: if one generic declaration is more specific than another, their static parameters must line up position by position, as Java's rule for overriding a generic method requires (gap-ledger row 398)." The source is Answer 9, "one narrow rule survives from the old sentence" (2026-09-26T12:01:53.076Z), which he took.
- **Wording, "every instance".** Proposed: "It checks the Return Type Rule over every instance of a generic declaration that the argument types allow, not over one guessed instance" (`overloading-judgement.md:14`, `:58`).
- **Wording, the library's repair.** Proposed: "The library repairs, by declarations of its own, the overload sets that the checker refused, ...". The question of which devices count stays the writer's question 1.
- **Uncertain fidelity, what "agree position by position" means.** The judgement that he took specifies "the same number and kinds of their own (unlifted) parameters, position by position, with the more specific declaration's return type a subtype" (`overloading-judgement.md:85`). The rule as built compares only two declarations with as many static parameters of their own, and only their return types (`OverloadingOracle.scala:161-175`; `judgement-c3.md`, "P-45"). Review-queue item 60 holds that scope for his review, and his answer to it settles the point. Until then, "line up" is the ask's word, and no more is safe.

## P-50: the body of a `label`, and its exits' values, take the expected type of the whole `label`

**Fidelity.** It matches the audit's text and his "(a) has a yes" (2026-10-09T06:59:48.891Z). That answered the coordinator's explanation of 06:56:20.441Z, in which `label` is a named block that code inside it can leave early, with a value. The gloss of `label` is that explanation. "Built (F-87)" is true (F-87; `Misc.scala:704-739`). "P-51 decides the same question" is fair: Q48 asked of (a) and (b) whether each gets the type its surroundings expect.

**Comprehension.** It matches. The reader's two minor doubts are wording, not loss of meaning:
- "both" can be read two ways.
- What happens without an expected type. The specification's inference chapter applies the rule only "as the body of a `label` expression that has an expected type" (`Specification/basic/inference.tex:143-148`).

**Failures by class.** Pass. Optional wording: "When a `label` has an expected type, the compiled checker passes it into the body and into each of those values ...", and "lists the body and those values as contexts that carry an expected type".

## P-51: the checker retries a call written as another call's argument

**Fidelity.** It matches the audit's text and his "Q48(b) wide, go ahead" (2026-10-09T22:10:09.585Z). That took "wide" from the options of the coordinator's 11:56:38.064Z, as asked again at 15:13:34.608Z.
- "If none of the checker's attempts accepts the outer call" is the code's trigger (`Functionals.scala:740`, `keptAttempt.isEmpty && retry`).
- The "Why" rewords his own reading of 06:55:25.847Z: "this is all about unifying the time inference rules about like everywhere and we are covering gap about cases that they didn't implement yet". "The curator wants" makes his description of the question into a wish. That is slight, and his choice of "wide" was offered on that reading, so I let it stand. The rewrite drops his condition, "if ... the mechanisms are well specified". The audit dropped it too, and the probe met it before his go.

**Comprehension.** The reader's account is right. It differs in three places:
- "The checker's attempts" is defined only in P-49, so half the trigger was out of the reader's reach.
- The entry does not say what a successful retry leads to. As built, of the declarations whose retry succeeds, the one more specific than every other is kept; otherwise the call is refused as before (`Functionals.scala:838-849`). That is the built state, not his decision.
- "Here the outer call is the call that the compiled checker checks" did not help, because the checker checks both calls.

**Failures by class.**
- **Concept: the compiled checker's attempts at a call** (without and with the expected type, then with coercion). It belongs in the compiled area part, `references/compiler.md`, because P-46, P-49 and P-51 all lean on it. Short of that, the entry can gloss it: "(it tries the call without the expected type, then with it, and with coercion only after; P-49)".
- **Wording, the two calls.** Proposed: "Take an outer call `f(g(x))`, whose argument is an inner call `g(x)`. If none of the checker's attempts accepts `f(g(x))`, the checker checks `g(x)` again once for each declaration of `f`, with that declaration's parameter type at `g(x)`'s position as its expected type."
- **Wording, the outcome, as state.** If it is added, write it as built state: "As built, the declaration whose retry succeeds is kept, or the most specific of several; otherwise the call is refused" (`Functionals.scala:838-849`).

## P-12: the checker on walk's programs, after the switch-over

**Fidelity.**
- **It says less than his message of 2026-09-29T14:07:20.452Z.** He took item 7 ("item seven as recommended. So one now and two after the switch.") and gave the order himself: "It's just a decision that at the moment we do not touch the walk system until we switch the library and then when the like we, we start running the type checker in the walk it will gain types and can switch." The rewrite lists the two steps with "and", in no order, and drops "walk is not touched for this until the library is switched". The writer's questions 1 and 2 ask for exactly these. His message already answers both, so they need no question. The takeaway's fix (`takeaway-c1.md`, "P-12") has the same reading. The audit's corrections file holds no question for him on P-12, so task rule 1 did not bind the writer to the audit's wording here.
- "Today `fortress typecheck` checks a program only against the compiler's prelude, the compiled path's own library, so it is no check of walk's programs (F-9)" is true (F-9; `interpreter.md`, "What walk checks"). The apposition equates the prelude with the compiled path's library, but SKILL.md calls the prelude "three files of its library". That is minor.

**Comprehension.**
- "Still to build: both steps" counts three things as two: the switch-over, the checker on walk's programs, and walk's use of the coercions. The reader could not tell which two are meant.
- "the checker runs on walk's programs" read two ways: `fortress typecheck` becomes a valid check of walk's programs, or walk runs the checker as a phase of its own and refuses ill-typed programs. His words point to the second: "run the type checker optionally in, in the walk" (2026-09-15T10:42:06.544Z) and "we start running the type checker in the walk" (09-29). Whether walk then refuses ill-typed programs is in no source. "Optionally" was lost at the audit, which took "usable" to keep it.

**Failures by class.**
- **Wording (fidelity), the order and the hold on walk.** Proposed: "After the switch-over, walk runs the checker on its programs and so gains their static types. Walk then uses the static coercions that the checker inserts, in place of its choice on the run-time value (P-59). Walk is not changed for this before the switch-over." The source is 2026-09-29T14:07:20.452Z, with the coordinator's 14:08:16.691Z for the coercion step.
- **Wording, the unfinished steps.** Proposed: "Still to build: walk's run of the checker and its use of the inserted coercions, both after the switch-over (PLAN, phase 4)." PLAN's phase 4 names "the batch whose step gives walk the checker's static types" (Q-walk).
- **Uncertain fidelity, whether the check is an option of walk and whether walk then refuses ill-typed programs.** His 09-15 word "optionally" says option, and no source says refusal. His answer settles it. Until then the entry can restore "optionally" from his 09-15 words.

## P-29: walk's speed is irrelevant to every judgement of Fortress's performance

**Fidelity.**
- The title, the slowness with its pointer, "no performance decision rests on walk's timings", the gate sentence and the new "Why" all match his words:
  - "we cannot judge performance on unoptimized builds in, in Swift" (2026-09-19T16:43:19.420Z);
  - "Th those are too long running to be tests." (16:39:48.865Z).
- **"Fortress's performance is judged on the compiled path, once microGPT runs there" moves the coordinator's condition onto his rule.** His words: "once we get the compiler running, then we will be talking about performance" (16:43:19). The condition "until microGPT runs compiled" is the coordinator's, from its 16:43:26.371Z: "No edit to C4 for speed, and no performance decision of any kind until microGPT runs compiled". The audit had already narrowed that sentence, and kept the microGPT condition only on the C4 edit. The rewrite's new sentence brings it back to all judgement of performance. That narrows his rule: by his words, a program that runs on the compiled path before microGPT does could be judged.

**Comprehension.** It matches. Two points:
- "C4" alone made the reader ask whether the APL-style program may be edited for speed. The source put only C4 to him (item 4, "The tuples slow C4 down", 16:26:24.607Z). His general rule already covers the other program, because an edit for speed now could rest only on walk's timings.
- "C4" is a label that no part of the skill gives. `interpreter.md` names the files `MicroGptFlat*.fss` and `MicroGptApl*.fss`, and `gate.md` says "the two microGPT programs".

**Failures by class.**
- **Wording (fidelity).** Proposed: "Fortress's performance is judged on the compiled path, once the compiler runs programs." Keep "until microGPT runs compiled" on the C4 sentence only, as the audit does. The source is 2026-09-19T16:43:19.420Z, with the coordinator's 16:43:26.371Z for the C4 condition.
- **Wording, the C4 sentence.** Proposed: "In particular, until microGPT runs compiled, C4, the flat microGPT program, is not edited for speed." "In particular" marks it as one case of his rule, so the APL-style program falls under the rule too, without a new claim.
- **Concept: microGPT's two Fortress programs** (C4, the flat one, `MicroGptFlat*.fss`, and the APL-style one, `MicroGptApl*.fss`) and the label C4. It belongs in the `fortress-repo` core, beside "the model program, microGPT", because P-29, P-30 and P-45 use it, and so do `gate.md` and `interpreter.md`.

## P-40: sizes are checked, and an unknown size is an error only where it is used

**Fidelity.** Each rule matches his answers:
- sizes checked: 2026-09-19T18:32:48.384Z;
- the bound: "Fuck yes, that's not even a question." (2026-09-27T06:44:55.156Z), to the coordinator's 06:38:29.847Z;
- the unknown size: 2026-09-21T16:57:37.256Z;
- the refused call: "Agreed, decision 3 stands" (2026-09-26T12:20:23.332Z), to Answer 12;
- sizes in exclusion: "Option 1, sizes count" (2026-09-26T09:24:48.043Z);
- a size as a value: "Option 1, go ahead." (2026-09-28T19:17:29.239Z);
- the 17 operators: "I agree with the recommendation. The patch made sense to me." (2026-10-20T05:42:24.706Z).

Two points of state are off:
- **"Still to build: ... the compiled half of the refusal of a call (gap-ledger row 400)"** implies a walk half within the decision and calls the compiled half wholly unbuilt. Answer 12 is about the checker alone: "refuse the call with the same "could not infer" error ... one small checker rung". The compiled refusal is built where the unfixed size appears in no parameter type. It is open where the size occurs in the declaration's own parameter type, which the checker still passes over (row 400, "Fixed half" and "Open compiled"; F-69). Walk's half of row 400 is the judgement's section-10 default, which waits in review-queue item 36. It is not his.
- The built parts get no "Built". The reader could not tell whether decision E's patch has landed. It has: `e487cec2d`; F-264.

**Comprehension.**
- **"reaches a type, a name or a value" against "needs a size that the call cannot fix".** The reader found that the first reading of "needs" contradicts the sentence before. The record holds the same tension:
  - The option that he chose said the six vector products' dead sizes "stay unknown" after inference and "pass because their dead sizes reach nothing" (the coordinator's 2026-09-21T03:09:13.588Z).
  - Batch 4's decision 3, which he then affirmed, makes a call that cannot fix a size "an error at the call site" (Answer 12, 2026-09-26T12:17:56.921Z). The overloading judgement says that compiled calls to the dead-size declarations "are refused under decision 3" (`reviews/overloading-judgement.md:215`).
  - The checker rung reconciled the two by reading "a name" as every static argument of a call. It says so: "The rule's source reads it more narrowly" (`compile-ladder/rung-nat-checker/REPORT.md:72-73`).
  So the reader's first reading is the built one, and "a name" is the open word.
- "Where the array design creates a JVM array, it refuses ...". "it" reads as the checker. The source makes it a check at array creation, at run time: "The array design adds a check where it creates a JVM array" (06:38:29.847Z). "The array design" is a record term.
- "boolean arguments join" clashes with the skill's "join", the least common supertype.
- "the exclusion rule" is in SKILL.md's core, which says that no type may extend two instantiations of one generic trait. The entry does not connect to it. The ask that he took stated it so: "The rule says no type may be two different instantiations of one generic. The open question is which arguments make two instantiations 'different'." (2026-09-26T09:20:38.889Z).
- "converts to `ZZ32`, as a numeral does" read two ways. The source's option 1 is about where a `ZZ32` is needed, as in the range `0#n` (2026-09-28T19:08:35.914Z).

**Failures by class.**
- **Wording (state), row 400.** Proposed: "Still to build: the checker's refusal where the unfixed size occurs in that declaration's own parameter type, which it still passes over (gap-ledger row 400)." The sources are row 400 and F-69. Also add "Built otherwise (F-140, F-69, F-264)."
- **Uncertain fidelity, "a name", and so whether a call of a declaration with a dead size is refused.** His 09-26 answer settles the call case: decision 3 makes such a call an error at the call site. The entry can state it apart from the 09-21 rule: "So a declaration may declare a size that none of its types uses, and pass. A call that cannot fix a size of the declaration it would choose is refused, also inside an overload set, instead of passing over that declaration." What "a name" covers beyond that is the rung's reading, not his. His answer, or the coordinator's choice to drop the word, would settle it.
- **Wording, the JVM length check.** Proposed: "Wherever the array design creates a JVM array, it checks the length there, at run time, and refuses one over 2^31-1." The source is 2026-09-27T06:38:29.847Z, which he took.
- **Concept: "the array design"** (the compiled path's design for arrays: unboxed `double[]` storage, sizes in the type, PLAN phase 5). It belongs in the compiled area part, `references/compiler.md`, which already points to the two POSITIONS entries on arrays.
- **Wording, the exclusion rule.** Proposed: "In the rule that no type extends two different instantiations of one generic trait, two instantiations differ when any static argument but an operator differs, so `Vec[\3\]` and `Vec[\4\]` are two. Boolean arguments count too once the checker has boolean parameters." The source is 2026-09-26T09:20:38.889Z.
- **Wording, a size as a value.** Proposed: "A size used as a number, as in the range `0#n`, converts to `ZZ32` where one is needed, as a numeral does." The source is 2026-09-28T19:08:35.914Z.
- **Wording, the patch.** Give its full path, `explorations/perf-probes/array-sites/e3-rebased.patch`, and say that it is built (F-264).

## P-74: mixed integer widths convert by declared coercions

**Fidelity.**
- It matches the audit's text and his "Option 1, agreed." (2026-09-26T12:01:24.267Z), to Answer 8 (11:43:42.784Z).
- "Built, except `NN32` into `RR64` (P-75)" is true state. The general sentence covers that coercion, and his later "Like, if it fits, then there should be direct conversion." (2026-09-29T14:10:36.799Z) is its source. `Library/FortressLibrary.fsi:300-302` declares `RR64`'s coercions from `ZZ32`, `RR32` and `IntLiteral`, and none from `NN32`. Every other exact integer conversion is declared (`:399-404`, `:489-490`, `:592-594`, `:649-653`).
- "each wider type declares a `coerce` from each narrower one" is broader than the ask that he took: "Each wider integer converts from each narrower one." The audit's text has the same broadening. Beside the `RR64` examples, it led the reader to read "wider" as covering `RR64`, and it found "wider" contradictory.

**Comprehension.** It matches on the rule. It differs in three places:
- `widens` is a concept that the reader lacked. The ask defines it as "the spec's "widening" rule, which makes a narrow computation stored into a wide variable run wide. Nothing implements it; it can be added later." (11:43:42.784Z).
- "wider" (above).
- The reader asked which path infers. Both do (F-73 for the checker, F-137 for walk), as P-46 decides.

**Failures by class.**
- **Wording (fidelity), "wider".** Proposed: "each wider integer type declares a `coerce` from each narrower integer type". The source is Answer 8, option 1 (2026-09-26T11:43:42.784Z).
- **Concept: `widens`**, in the entry, because this decision alone defers it. Proposed: "The specification's `widens` declaration, which would make a narrow computation stored into a wide variable run wide, is deferred." The `fortress-repo` core's list "Specified, but not built" could name it too.
- **Wording, optional.** "infers, on both paths, the narrowest type ..." (F-73, F-137; P-46).

## P-146: in a self-typed trait, the checker types `self` in method bodies as the implementing type

**Fidelity.**
- It matches the audit's text and his "1." (2026-10-13T23:37:34.404Z), to the coordinator's 23:32:24.772Z, which stated each part. The rewrite's additions are true:
  - the POPL 2019 paper's authors (`research/extracts/ParkPOPL2019-extract.md:1-6`);
  - the example `object Bad extends Integral[\ZZ32\]`, which is the ask's;
  - "Built (F-225)".
- The "Why" is the coordinator's reasons, which he restated in part: "option 1 is more in line with weak signal from repo and has precedent in other languages as well" (23:32:10.196Z). It is kept from the audit, as the judgement allows.
- The `numerator` bodies are his acceptance of 2026-10-14T07:10:28.105Z.
- One point stays open, carried and flagged by the writer's question 1. The refusal sentence states his letter, and the built rule is wider. The team's `Containment` mixins stay valid by the coordinator's default of 2026-10-14T00:08:24.734Z, which waits for his review (`Specification/basic/traits.tex:285-302`; drafted item Q-?1). This is not a failure of the rewrite.

**Comprehension.** It matches. The cold reader did not raise the mixins this time. One gap: "by Scala's conformance rule" names a rule that the skill does not state. The reader guessed it from training. The rule is "The self type of a class or object must conform to the self types of all classes which are inherited by the template" (SLS 2.13 §5.1, quoted at `reviews/self-typed-bodies-ways.md:304`), and in Fortress terms an extender of `C[\T\]` must be a subtype of `T` (`traits.tex:296-301`).

**Failures by class.**
- **Concept: Scala's conformance rule**, in the entry, because only this decision uses it. Proposed: "The checker refuses a type that extends such a trait at another type, since an extender must be a subtype of the static argument that it gives: `object Bad extends Integral[\ZZ32\]` is refused, because `Bad` is not a `ZZ32`. Scala has the same rule for self types."

## P-153: the integer power splits on the base

**Fidelity.**
- It matches his "Yes." (2026-10-20T00:44:34.730Z), to option 1 of the coordinator's 00:19:08.321Z.
- The title is the split that he recognised at 05:56:19.215Z ("We designed some kind of split solution.").
- The cases now sit under "At a negative exponent", as walk checks them (`Int.java:288-293`; F-263). The ask's list form had let the clause on 0 stand alone. The writer flagged it.
- "Built in the library and under walk (F-263)" is true. "PLAN, phase 4, the natives" names where the compiled half is tracked. The judgement notes that this timing is a default not yet put to him, and the audit drafted it as a review item.

**Comprehension.** It matches. Two gaps:
- "sign-refined subset" is a concept that the reader lacked. It is P-80's term, and the entry need not lean on it. The ask said it plainly: "the way the library tests a sign everywhere since you set aside the sign-refined types" (00:19:08).
- "no type carries the sign of an exponent or a numeral" troubled the reader, because `NN32` and `NN64` are non-negative types. The point is that the types of the exponents that a program writes, a signed integer or a numeral, do not say whether the value is negative. The reader's other doubt, the exponent's type, is the built state: "at an exponent of any integer type" (F-263). It is not in his decision.

**Failures by class.**
- **Wording.** Proposed: "So the split is on the base, and the sign of the exponent is tested at run time, as the library tests a value's sign everywhere (P-80)." And: "no type tells a negative exponent from a non-negative one, since a signed integer or a numeral can be either". Optional: "Built in the interpreter's library and under walk", since each path has its own library today (SKILL.md, "The phases").

## P-67: `round` on an exact half goes to the even integer, on both paths

**Fidelity.**
- It matches his "Agreed, but I want historical evidence" (2026-09-21T21:03:23.920Z), to the coordinator's 20:57:43.103Z: "Half to even on both paths. The spec's rule, IEEE's default, and the team's own rational body."
- The added sentence names the float types and the ask's example `round(2.5)`. The question was row 329, `round` on an exact half for the float types. It also answers the judgement's concern that the entry read as if the specification's rule covered floats: "as a rational does" now places that rule on the rationals.
- "Built" is true (`Float.java:384`, `RR32.java:326`, `simpleDoubleArith.java:133`).

**Comprehension.** It matches.

**Failures by class.** Pass.

---

## Across the ten

- The rewrites keep their meaning, except in three places where they say less or other than the sources: P-45's "Still to build" line, P-12's order of the steps, and P-29's microGPT condition. None of the three is flagged in its "Meaning" line. Each fix is a wording change with its source above.
- In two entries the source leaves the meaning open, and an answer from him settles it: P-40's "a name" against decision 3, and P-12's "optionally". P-45's positional rule is open too, and review-queue item 60 already holds it. Three carried points have a writer's question or a review item already: P-45's devices, P-146's mixins and P-153's timing.
- Concepts for every worker:
  - the two microGPT programs and the label C4, in the `fortress-repo` core;
  - the checker's attempts at a call, in `references/compiler.md`;
  - "the array design", in `references/compiler.md`.
- Concepts for the entry alone: walk's old requirement that some parameter pair exclude (P-45), `widens` (P-74) and Scala's conformance rule (P-146).
- None of the cold reader's gaps came from the revival part (`revival-changes.md`). The one place where the skill's areas fill an entry is P-45, on walk's load check (`interpreter.md`), and the entry should not need it.

## His quotes

HIS 2026-09-26T12:07:33.636Z | Yes, agreed.
HIS 2026-09-26T12:08:32.187Z | Agreed, the judgement's recommendation.
HIS 2026-10-16T19:47:32.836Z | Does this mean bringing it in line with the compiler’s checker behavior? Then yes.
HIS 2026-10-09T06:59:48.891Z | (a) has a yes
HIS 2026-10-09T06:55:25.847Z | Okay, so from your yes, you are saying that the go to block gets the same inference mechanism like function bodies get, which makes sense.
HIS 2026-10-09T06:55:25.847Z | I, I would say this is all about unifying the time inference rules about like everywhere and we are covering gap about cases that they didn't implement yet.
HIS 2026-10-09T06:55:25.847Z | if it's about the, the mechanisms are well specified and they are just not implemented and we have an idea how to get there, let's, let's go for this.
HIS 2026-10-09T22:10:09.585Z | Q48(b) wide, go ahead
HIS 2026-09-29T14:07:20.452Z | item seven as recommended. So one now and two after the switch.
HIS 2026-09-29T14:07:20.452Z | It's just a decision that at the moment we do not touch the walk system until we switch the library and then when the like we, we start running the type checker in the walk it will gain types and can switch.
HIS 2026-09-15T10:42:06.544Z | to run the type checker optionally in, in the walk
HIS 2026-09-19T16:43:19.420Z | once we get the compiler running, then we will be talking about performance.
HIS 2026-09-19T16:43:19.420Z | we cannot judge performance on unoptimized builds in, in Swift.
HIS 2026-09-19T16:39:48.865Z | Th those are too long running to be tests.
HIS 2026-09-19T18:32:48.384Z | And for the arrays, like I don't know we can sidestep the net NAT uh, issue. That is a central design point that they are using.
HIS 2026-09-21T16:57:37.256Z | So the previous decision one, I think the middle uh, is a clear winner.
HIS 2026-09-26T09:24:48.043Z | Option 1, sizes count
HIS 2026-09-26T12:20:23.332Z | Agreed, decision 3 stands
HIS 2026-09-27T06:44:55.156Z | Fuck yes, that's not even a question.
HIS 2026-09-28T19:17:29.239Z | Option 1, go ahead.
HIS 2026-10-20T05:42:24.706Z | I agree with the recommendation. The patch made sense to me.
HIS 2026-09-26T12:01:24.267Z | Option 1, agreed.
HIS 2026-09-29T14:10:36.799Z | Like, if it fits, then there should be direct conversion.
HIS 2026-10-13T23:37:34.404Z | 1.
HIS 2026-10-13T23:32:10.196Z | option 1 is more in line with weak signal from repo and has precedent in other languages as well
HIS 2026-10-14T07:10:28.105Z | And if, if the numerator, numerator is an easier choice, it sounds like just something that you are informing me about a choice that you did, then let's unblock this
HIS 2026-10-20T00:44:34.730Z | Yes.
HIS 2026-10-20T05:56:19.215Z | We designed some kind of split solution.
HIS 2026-09-21T21:03:23.920Z | Agreed, but I want historical evidence
