<!-- The clarity workflow's check of chunk c1's corrections (P-7, P-27, P-146, P-153, P-154, P-12, P-17): each changed sentence against POSITIONS at 5da8144e4, the grounds in findings.md and the curator's messages, and the cold reader's answers against the source meaning. -->

# Check of chunk c1

Read: `proposals.md`, `clean.txt`, `proposals.apply`, `concepts.md`, `cold-read.md` and `findings.md` in this folder. Also POSITIONS at HEAD, whose last change is `5da8144e4`, and `entries.py` with the audit's evidence: the scout reports for P-7, P-27, P-146, P-154 and P-17, and `judgement-c1`, `-c2` and `-c5`. From the foundations review: the judgement (tenets 1, 7, 8 and 9, the section 2 resolutions, sections 3 and 7), the trap test's `grades.md` section 4 and `key.md` scenarios 2 and 6, and the pending rewrite `evidence/rewrite/combined.apply`. Also `reviews/integer-power-fable-judgement.md` section 2.3, and F-9, F-225 and F-290. In git: `655e65d53`, `59fdeff62`, `8015b17f4`, `eeda9cd95`, `5a68404fd` and `372b9bf6a`. The code and specification lines named below. His messages, through `show.py` and `near.py`.

I diffed each clean entry against POSITIONS sentence by sentence. P-7 is identical. In each other entry, only the sentences listed under it change; every other sentence matches word for word.

## P-7

**Fidelity: pass.** The entry is identical to the record. The finding's only ground is the judge's reasoning, so the writer kept the text and wrote a question, as the writer brief requires. The sentence at issue is close to his own words: "when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival." (2026-10-12T23:15:30.246Z). So the question to him is needed.

**Comprehension.**
- "the team's later work, in the compiler or in the papers on types": the reader took it to mean that any compiler code counts. This is the misreading that the finding names (judgement, tenet 1: "'Later work in the compiler' is two things"), so the cold read confirms the finding. Class: wording, which needs his word because the sentence is his. The pending rewrite in `combined.apply` already has the form: "where the team's later word contradicts the original text, the text is updated to follow it. P-26 says what counts as the team's later word, and when the team's work in the compiler counts."
- "baseline ... the optimal result, the one to aim at": in the end the reader read it right, as a ceiling to approach. "Baseline" is his word ("to know where our baseline lies", 2026-09-16T22:43:26.489Z). Class: wording, and minor. Outside this pass.
- "Unfinished: not stated": the pure-Java microGPT is not written yet (judgement, tenet 1: "no Java baseline is written"). The entry's clause "not yet written (PLAN phase 6)" was lost at the rewrite of 2026-10-13 (scout report, section 3f). Class: wording: a "Still to build" line that points to PLAN phase 6. Outside this pass, since no finding names it.
- "contradictions": the reader could not tell whether a gap counts as a contradiction. Class: concept lacked. Where the texts are silent, the curator decides by the goal (P-8); the pending P-26 says so. The short orientation's line on "the team's later word" (`concepts.md`) should carry it.

## P-27

**Changes:** the title, and two sentences added.

**Fidelity.**
1. "It does not choose between two designs of the team's own, such as the library's text and the compiler's prelude: the team's later word decides between them (P-26)." The ground, the trap test's `grades.md` section 4, POSITIONS 27: "It does not decide between two of the team's own designs; the dated later word does." The new sentence drops "dated". Today's P-26 has no dating test, and its list still names "the number types of the compiler's prelude made siblings in 2009 and 2010" as the later word. That lack is what misled reader Y in scenario 2 (`grades.md` section 4, POSITIONS 26). So if this entry lands before the P-26 rewrite in `combined.apply` ("'later' is a date"), its pointer carries no date, and a prelude design can again pass as the later word. Class: uncertain fidelity, settled by the grades: put the condition back.
2. Scope. As written, the same sentence covers every pair of the team's designs. The foundations judgement uses P-27 to decide just such a pair. Tenet 8: "the library's own practice decides it (P-27): every one of the 424 bindings is `builtinPrimitive("…")`. The team built both forms, `builtinPrimitive` for walk and `import java` for the compiler". The second form is the prelude's own (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:13`), and the pending P-58 in `combined.apply` reads "the library's own practice decides it (P-27)". The two review sources agree once the sentence is limited to designs of the language, the layer where P-26's later word applies (pending P-26: "the team's later word on the language"). The binding form is outside the language (tenet 8: "an L3 choice"). Class: uncertain fidelity, settled: the sentence is broader than its ground allows once tenet 8 is read beside it.
3. "the library's text": the reader confused it with the specification's text. Class: wording.

Proposed, for all three: "It does not choose between two of the team's designs of the language, such as the self type as the interpreter's library and the compiler's prelude write it: the team's later word, dated against the texts, decides between them (P-26)."

The title is narrower than the old one and matches the body: pass. His words: "use those patterns for extending the standard library in the native way" (2026-09-19T18:31:44.057Z).

**Knock-on.** P-84 glosses its pointer as "(P-27, the library's own practice is the standard)", both today and in `combined.apply`. That is the old title, the one that the finding faults, and `.claude/skills/fortress-repo/references/sources.md:224` quotes it too. The apply should change P-84's gloss to the new title. Otherwise the faulted reading survives in P-84.

**Comprehension.** The reader got the new scope right. The unresolved points are in unchanged sentences and outside this pass:
- "He had to find the diagonal's override himself (P-88) because that study was skipped." "He" has no antecedent; it is the curator (2026-09-24T18:30:37.463Z, scout report section 1). The sentence tells how the rule came about ("a remark, not a decision", `judgement-c2`). Class: wording. Move it to the history, or write "The curator had to find ...".
- "exclusion, for one, is all over it": the source supports reading (a), `excludes` clauses across the library. His message of 2026-09-19T18:31:44 answered the coordinator's proposal to declare that the numeric and array types exclude each other, and `excludes` stands on 101 lines (scout report, section 2). Class: wording: "the library's `excludes` clauses, for one, are all over it".
- "a workaround on the user's side": reading (a) again: the `planeSum` rename in the program's own code (`judgement-c2`). Class: wording: "from a workaround in the program that meets the gap".
- "What microGPT invented goes into the standard library": the reader took this as a duty to move microGPT's own inventions into the library. That is not the source's meaning. He narrowed it later: "As long as the extensions that we did have a precedent in the library itself, I, I'm fine with that." (2026-09-20T07:20:24.519Z) and "I would at most admit to wanting to extend the standard library for the needs of C4 if it was missing an obvious extension" (2026-10-09T05:20:34.111Z). The positions audit found this too: "a worker who reads it alone would move a model-only form into the library" (`judgement-c2`, P-27; `HELD.md:82`). The fault was in the entry before this rewrite, and no finding of this chunk names it. Class: uncertain fidelity, settled by his two messages. It belongs on the curator's queue, for example: "An extension that microGPT needed goes into the standard library only where the library has a precedent for it, such as an operation that a lower-dimensional array has and a higher one lacks."

## P-146

**Changes:** the "Why", where two sentences replace one; and "F-225 states the rule as built" gains "and holds the dates".

**Fidelity.**
1. "Why: the rule follows the library's own form of the self type, the bound `X extends C[\X\]`, and peer languages share it." The writer asked whether this is a faithful reading of his "weak signal from repo". The source settles it: no.
   - His message: "am hearing that option 1 is more in line with weak signal from repo and has precedent in other languages as well" (2026-10-13T23:32:10.196Z).
   - It answers the coordinator's turn of 23:24:28.785Z (`near.py`; transcript `001.jsonl:6173`). That turn answered his question "I’m unclear how clear the signal from later team’s decisions is that justifies removal of `comprises`…" (23:23:46.460Z).
   - The turn's section "How clear is the later team signal?" says "It's fairly clear against option 2 and only indirect for option 1". It lists Welterweight, the Types chapter and Naden. It ends "Option 1 comes closest to Naden's 'only in bounds': it reads the self type from the bound the library already writes. That's my reading, not his words."

   So the signal that he named is the team's later texts, and they favour the rule only weakly. "The library's own form" is the coordinator's account of how option 1 matches Naden. The new sentence turns his reason back into the library-practice ground that finding (a) faults ("the ground is the date"; `key.md` scenario 6: "The rule's ground is the meaning of the self type in the team's dated word, not the library's text"). Class: uncertain fidelity, settled: the sentence gives the coordinator's reading as his reason, and restates the ground the finding faults.
2. "Naden's last text on the idiom, written after Steele added the clause". Steele added `comprises T` only to `StandardTotalOrder` (`655e65d53`, the diff of `Library/CompilerAlgebra.fsi`). `trait Equality[\T\] comprises T` appears there as an unchanged line, so it is older, and the coordinator told the curator that the device was "built by Ryu in 2009 and Allen in 2011" (23:14:29.728Z). F-225 says "on `StandardTotalOrder` since Steele's `655e65d53`". "Steele added the clause" reads as though Steele introduced the prelude's form. The dating argument still holds: Naden's `8015b17f4`, of 2012-08-31, is later than both. Class: wording.
3. Checked and passed: F-225 holds both commits and their dates. "keeps the self type to bounds" matches F-225 ("puts the self-type idiom in bounds only") and Naden at `justificationOfRTR.tex:626-630` ("should be ... only in bounds"). The P-44 comparison sat in the sentence that the finding names, and was the coordinator's reason (scout report, section 2), so it may go.

Proposed "Why": "Why: the team's later texts point, if weakly, toward the rule, and peer languages share it. The compiler's prelude writes the self type as a `comprises T` clause instead, and that form does not bind the library: Naden's last text on the idiom, later than the team's last edits of that clause, puts the self type in bounds only, the form `X extends C[\X\]` that the library writes. F-225 states the rule as built and holds the dates."

**Comprehension.** The reader's reading of the rule matches the source.
- "Naden's last text": the reader could not place it. Class: concept lacked: the team's later texts on types, which are Naden's write-up "The Return Type Rule and Generics", Welterweight, the 2012 Types chapter and POPL 2019. P-26 names them, and the short orientation should name them once, with P-26's pointer. In the entry, the wording could be "Naden's write-up on the Return Type Rule (P-26 names it)".
- A generic trait between the self-typed trait and its extender: the reader is right that the entry, read to the letter, would refuse a case that the built rule accepts. F-225: "The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's." The audit found this too (`judgement-c5`, P-146, point (b)), but no finding of this chunk names it. Class: wording, for a later pass: "It also accepts a trait whose parameter is bounded by a self-typed trait that it extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's (F-225)."

## P-153

**Changes:** the first sentence of the "Why" is replaced by two.

**Fidelity.**
1. "The only integer power that the team built is the compiler's prelude's". This is stronger than the source. The writer's own source, the integer-power judgement's section 2.3, says: "The interpreter's library typed every integer power `RR64`, on a tower where every integer was an `RR64`, with natives that answer the integer for a nonnegative exponent and a float for a negative one". The writer's "Sources" line says the same. The judge's claim is narrower: the prelude's is "the only implemented one", meaning the only power built with an integer result (judgement, section 3). Class: fidelity, settled by section 2.3. Proposed: "The only power with an integer result type that the team built is the compiler's prelude's, which gives `ZZ32`, `NN32` and `NN64` each a power of its own type at every exponent."
2. "the Working Draft's power, which gives a rational at a signed exponent, was never built on either path": section 2.3 says "The code never ran the Working Draft's rule." Pass.
3. The entry no longer calls the prelude's code the later word: pass. The judge's next step, that P-8 lets an implementation fact decide in a gap of the language's texts, is the judge's reasoning only, so it is rightly a question, not text. Until he answers, the "Why" gives an implementation fact as a reason and does not say how it may weigh.

**Comprehension.** These points are in unchanged sentences and outside this pass:
- "Row 441: the same rule on the compiled path, ...": the sentence has no verb, and the reader saw two readings. The source: row 441 is the compiled path's departure from the rule, NEGATIVE-VERIFIED. Class: wording: "Row 441 tracks the compiled path's departure from this rule: its own powers give 0 at a negative exponent and a raw Java exception at a base of 0. Row 523 tracks their overflow, silent or a raw Java exception."
- The exponent's type: the interpreter's library declares each integer type's `^` at `AnyIntegral` and at `IntLiteral` (`Library/FortressLibrary.fss:802-804`, `:895-897`, `:978`), so any integer or numeral exponent. The prelude declares it at the base's type. Class: wording: "Each integer type's `^` takes any integer or numeral exponent and returns its own type".

## P-154

**Changes:** the "Why", rewritten as two sentences.

**Fidelity.**
1. "the team's only lexicographic traits, in an unfinished library draft (...), both bound the element by a total order". "Only" is new, and it is false. The team's own library declares a lexicographic trait whose element type has no bound:
   - `trait LexicographicOrder[\T extends LexicographicOrder[\T,E\],E\] extends { StandardTotalOrder[\T\], ZeroIndexed[\E\] }` (`git show 5a68404fd:Library/FortressLibrary.fsi`, line 1196; also `CompilerLibrary/FortressLibrary.fsi:1209`);
   - `trait List[\E\] extends { AnyList, LexicographicOrder[\List[\E\],E\] }` (`Library/List.fsi:67` at `5a68404fd`).

   The bound `E extends StandardTotalOrder[\E\]` is the revival's, added at `372b9bf6a`. The old text said "both of its lexicographic traits", meaning the draft's two, with no "only". Class: fidelity, a claim stronger than the source that the tree contradicts. Proposed: "Why: the two lexicographic traits of an unfinished library draft of the team's (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`) both bound the element by a total order, and conditional extension is a `where` form that the team wrote (P-151)." The unbounded trait is also a new fact for the coordinator. It bears on the unchanged "the team never wrote one", which holds only of a partial lexicographic order: the team's own library gave every list a total order.
2. "The draft is not shown to be later than the specification's text, so it is not the team's later word (P-26)." The ground is git, and I checked it. The draft's history under its present path begins at the parentless snapshot `5a68404fd`. `eeda9cd95` (2007-09-26) already has both traits. The specification's sentence is `Specification/advanced-lib/algebraic-constraints.tex:519-522`: "which may be partial or total depending on whether the ordering of the elements is partial or total". The conclusion holds. Class: wording, on two points:
   - "is not" claims more than "not shown"; "does not count as" says what follows;
   - "the specification's text" does not say what that text holds, so the reader cannot weigh it.

   Proposed: "The draft is not shown to be later than the specification's sentence that lets a list's order be partial where its elements' order is, so it does not count as the team's later word (P-26)."

**Comprehension.**
- "the distance to the switch-over": the reader lacked this concept. `concepts.md` already lists it: in the `fortress-repo` core, beside the switch-over, with F-53 holding its definition and value. I agree.
- "A pair of floats stays ordered": the source supports reading (b), today's behaviour, not a decision on tuples. The coordinator's ask said "It leaves a small mismatch: pairs of floats are ordered, but lists of floats are not." (2026-10-20T06:02:30.736Z), and he answered "Agreed." (06:18:00.255Z). The tuples' rule is PLAN item 43, built as a default while his answer is pending (scout report, section 1). Class: wording, in an unchanged sentence: "Pairs of floats are ordered today; the curator accepted that mismatch with lists as a cost of the list rule, and the tuples' own rule is not decided here."
- "extends its lexicographic order": the trait is `LexicographicOrder`. Class: wording: "`List` extends the library's `LexicographicOrder` only where ...".
- "`QQ`'s 0/0": a fact of the library (`Library/FortressLibrary.fss:537`, `:596`). Class: concept lacked; it belongs in the library area part.

## P-12

**Changes:** four sentences appended.

**Fidelity: pass.** The three parts match the finding and the judgement, tenet 9: "its text names the three pieces ... and says the size is unmeasured". F-9 holds both facts that "(F-9 holds both facts)" claims: "it runs with type checking and the Scala checker off, the Java checker is gone (`compiler/StaticChecker.java:228-229`), and it has no case for the `CoercionInvocation` nodes". F-290 counts the errors in the 40 components outside the twelve. "Three parts" counts the entry's own list, not a measurement.

**Comprehension.**
- The timing of the third part: the reader could not tell whether clearing the components must wait for the switch-over. The source places it. The judgement, section 2: "the twelve (thirteen) are the switch-over's; the 40 are P-12's". Section 7, under P-33: "place the 40 other components before P-12's step or the first program that needs each, not before the switch-over". So the clearing may come before the switch-over, and it does not change walk. Class: wording, in a new sentence: "Third, the components that walk's programs import must be cleared of the checker's errors, each before this step or before the first program that needs it (F-290 counts them)." This is the pending rewrite's own form, with its ground in section 7.
- `CoercionInvocation`: the reader read it right, as the node that the checker inserts for a coercion call. Pass. The interpreter area part could name the node once.

## P-17

**Changes:** one sentence added.

**Fidelity.**
- The content passes. I checked it in `Specification/basic/objects.tex:37-42`: "Thus, an implementation may freely copy value objects. Most objects with simple standard types, such as booleans, numeric literals, IEEE floating-point numbers, and integers are value objects." And in `Specification/advanced-lib/binary.tex:79-80`: "describes a sequence of ``unboxed'' values". The frozen copy has the same text. "Among them floating-point numbers" is narrower than the source, which also lists integers, and claims no more. The specification permits copying and describes unboxed sequences, and the judge reads both as the language's intent to unbox (tenet 7).
- The new sentence carries two file paths, `Specification/basic/objects.tex` and `Specification/advanced-lib/binary.tex`. Neither points to an entry or a report section, and the writer brief puts a ground's file names in the note line. Class: wording. Proposed: "The specification states the same intent: its chapter on objects lets an implementation freely copy value objects, among them floating-point numbers, and its chapter on memory sequences makes a `LinearSequence` of a value type a sequence of "unboxed" values." The paths, with lines `:38` and `:80`, go in the note.

**Comprehension.**
- The scope, doubles only or every number, and which path: the reader saw two readings. His words settle doubles and double arrays: "not to box the doubles but have an array of doubles" (2026-09-15T10:42:06.544Z) and "If this should have been high performance language, it cannot be boxed." (2026-09-19T18:32:48.384Z). They do not settle other number types. Class: uncertain fidelity: it needs his word. Outside this pass.
- "row lift": a microGPT kernel, and F-11 holds it. Minor.

## Across the chunk

- P-84's gloss of P-27 quotes P-27's old title (see P-27).
- `combined.apply` holds its own texts of P-7, P-12 and P-17. Whichever set lands second must be merged with the first; the writer says so too.
- `concepts.md`: I agree with its list. Add the team's later texts on types (Naden's write-up, Welterweight, the 2012 Types chapter, POPL 2019), to be named once in the short orientation with P-26's pointer.

## His quotes

HIS 2026-10-12T23:15:30.246Z | when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival.
HIS 2026-09-16T22:43:26.489Z | At a certain point, we will probably take and rewrite the micro GPT algorithm in pure Java to know where our baseline lies
HIS 2026-09-19T18:31:44.057Z | the worker that does it should like study the existing parts of the fortress library meticulously, and use those patterns for extending the standard library in the native way.
HIS 2026-09-20T07:20:24.519Z | As long as the extensions that we did have a precedent in the library itself, I, I'm fine with that.
HIS 2026-10-09T05:20:34.111Z | I would at most admit to wanting to extend the standard library for the needs of C4 if it was missing an obvious extension
HIS 2026-10-13T23:23:46.460Z | I’m unclear how clear the signal from later team’s decisions is that justifies removal of `comprises`…
HIS 2026-10-13T23:32:10.196Z | am hearing that option 1 is more in line with weak signal from repo and has precedent in other languages as well
HIS 2026-10-20T06:18:00.255Z | Agreed. We are not designing a new trait at this point. It’s nowhere on the critical path to compiling microGPT that runs fast.
HIS 2026-09-19T18:32:48.384Z | If this should have been high performance language, it cannot be boxed.
HIS 2026-09-15T10:42:06.544Z | not to box the doubles but have an array of doubles
