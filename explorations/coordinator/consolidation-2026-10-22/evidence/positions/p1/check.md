<!-- The clarity workflow's check of chunk p1 (P-7 to P-26): each rewritten entry against the record and the provenance audit's evidence, and the cold reader's answers against the source meaning, with each failure classed and a proposal for it. -->

# Check, positions p1: nine entries

Sources read: `entries.py 7 8 9 10 11 17 19 25 26` (the record at `HEAD` and the audit's evidence); the scout reports `P-7.md` to `P-26.md` and `trial/evidence/P-10.md`; `judgement-c1.md`, `corrections-c1.md`, `takeaway-c1.md` and `trial/evidence/judgement.md`, each at its section for the entry; his messages by `show.py`; the coordinator's texts that he answered by `positions-audit/tools/near.py`; and the tree where an entry names it. Times are UTC. "Reader" is the cold reader of `cold-read.md`. A proposal gives the new wording and its source. Where none is given, the entry passes on that point.

## P-7

**Fidelity: pass.** Each sentence has its source as `proposals.md` says. Checked:
- "A pure-Java microGPT is the baseline that compiled microGPT is measured against: the result to aim at." Source: his 09-16 22:43:26 "to know where our baseline lies, where, where that we are trying to hit if we were to get the optimal result". The audit kept the entry without his "probably", and the writer follows it. That is right.
- "the team's Working Draft of February 2011": F-163 (`Specification-1.0-frozen/` "is byte for byte the Working Draft of 2011-02-02") and P-96. The judgement cites "F-164" for this label, but no F-164 exists. The writer's F-163 is the correct entry.
- "states each change that the revival makes": his 09-29 15:49:10 "should reflect whatever changes we are doing". This is not stronger than the source.

**Comprehension.** The reader's "Decided" line matches. It had three doubts:
1. "the baseline ... the result to aim at": is it a pass mark, and how close must compiled microGPT come? *Wording.* Put back his "optimal", as the takeaway's tighten did: "A pure-Java microGPT is the baseline that compiled microGPT is measured against: the optimal result, the one to aim at." No source sets a ratio to it, so the entry must not give one.
2. Where does a revision stop and a redesign start? *Wording.* His 10-12 23:15:30 gives the line: "we are reconciling the contradictions and when later work in compiler or type papers contradict the original spec, we updated it". Proposal: "... the team's Working Draft of February 2011, as the revival revises it where the team's later work contradicts it (P-26), with the Types chapter ...".
3. "PLAN" has no path. *Concept: PLAN.* The `fortress-repo` core's "The record" lists POSITIONS, FACTS, INDEX and the gap ledger, but not `explorations/coordinator/PLAN.md`. P-7, P-17 and P-19 name it (P-33 gives its path). Define it in the core's "The record": the plan's phases in the order he approved (P-33), and its parked list, "Off the path, parked".

## P-8

**Fidelity: pass.** All three sentences are from 09-29 12:17:07. One condition in that message bears on doubt 2 below: "At, at this moment, I think I'm uh, like, I don't care about type theoretical purity and I'm accepting all unfinished corners of the language because I want to get to a compiled version of micro GPT."

**Comprehension.** The reader's "Decided" line matches. It had three doubts:
1. "the designers' record": the skill defines "record" as the project's own memory under `explorations/`. The rewrite brought this word in, and the reader saw two readings. *Wording.* Use the skill's own words for the team's sources (SKILL.md, "When to explore": "the specification, the papers, the library and the implementations"): "Where the designers' own sources, the specification, the papers, the library and the code, give no answer, ...". His "they have no clues on record" means the same thing.
2. "accepts the unfinished corners as they are" against P-7's "finish what the designers intended". *Wording.* His message sets the stance on the way to the goal ("at this moment", "because I want to get to a compiled version of micro GPT"). Proposal: "On the way to a compiled microGPT, he accepts the language's unfinished corners as they are, so that the work does not stall in theory."
3. "the spirit of Fortress": these are his words, and no source defines them. This is not a failure of the rewrite. Leave it.

## P-9

**Fidelity: pass, with one gloss that misleads (doubt 1).** Checked:
- "that program expands into the lines that C4 writes by hand": this is in the present tense. `explorations/apl/mg/MicroGptApl.fss:1-11` states it for today: "every APL line expands to C4's own line". It uses `FlatArrays2`, which is C4's `FlatArrays` with the sizes in the types. The claim is true as that file states it.
- The tuple-binding clause states the sub-language's rule (row 80, `AplMgSyntax.fsi:276`). The APL program writes its own hyperparameters as host lines (`MicroGptApl.fss:22-28`). The clause does not say otherwise. That is right.
- The semicolon form: his 09-14 20:12:12, "This doesn't have any reasonable application for the APL macros/DSL. Right?", which the coordinator confirmed.

**Comprehension.** The reader went wrong on two points and had four doubts:
1. The reader took "(P-87: the vocabulary is repaired around the model's text)" to mean that the model lines themselves are not changed. P-87 lets a model line change, if it is first shown to him as a diff. *Wording:* "(P-87: the model's text is the notation, and a change to a model line is shown to him as a diff first)".
2. The reader wrote "Keep C4 in the form the APL expansion produces". This turns the dependency round: C4 is the target, and the APL program is written to expand into it (his 09-19 17:01:32 "C4 was our final target"). *Wording:* "C4 is the target form of the APL microGPT program (...): the APL program is written to expand into the lines that C4 writes by hand."
3. "the vocabulary": is it a component, or helpers inside the model file? *Wording.* C4's header names it: "The array vocabulary is FlatArrays" (`explorations/run-c4/src/MicroGptFlat.fss:6-7`). Part of it has since moved into the standard library (his 09-20 07:20:24; P-27). Proposal: "the vocabulary, the array operations that the model's lines call (`FlatArrays.fss` beside C4, and what of it has moved into the standard library, P-27)".
4. "Aaron Hsu's flat style": *Concept: Hsu's flat style.* Add it to the writer's core row on C4: the model's parameters are in one flat vector and are reached through a layout table (`matName`, `matShape`, `matOffset`, `view(p, i)`). This is from `explorations/run-c4/design.md`, the merge table, and from `apl/reference/hsu-flat/NOTE.md:3` (the data layout redesigned after Hsu's talk "Designing Your Data").
5. "The one-line form": the entry does not show it. *Wording:* "The one-line form, `nEmbd = 16; blockSize = 16; ...`, is not used: ...". This is the form of commit `1bde6cd0e`, which his 20:12:12 reversed.
6. Readability against speed. *Wording, optional:* "(P-29: C4 is not edited for speed before microGPT runs compiled)". The takeaway gives P-29 as the answer.

## P-10

**Fidelity: pass.** The title rests on his 09-15 07:28:31 and 06:53:25. The sub-language clause rests on his 09-12 10:17:30. The walk-check clause rests on his page comment of 2026-10-21 23:05 on P-10: "I think this is a valuable position. I would not strike it from the record" (`positions-audit/evidence/curator-comments-2026-10-21.md:41`; `show.py` does not print page comments). One small point: "The side quest gave Fortress an APL sub-language" can be read as a part of the language or the library, but it lives in `explorations/apl/`. *Wording:* "The side quest built an APL sub-language in `explorations/apl/`: ...".

**Comprehension.** The reader's "Decided" line matches. It had three doubts:
1. Is the whole of `explorations/apl/` closed, or is a defect that breaks the check still fixed? *Wording.* The entry drops the limit that his decision draws, "do only the part necessary for the micro GPT in APL and put the rest out of scope" (07:28:31). Proposal for the title: "The APL side quest is closed: its sub-language keeps only what the APL microGPT program needs, and the parts of APL that it left unbuilt, tacit functions, characters and nested arrays, are not pursued."
2. The entry names `MicroGptApl.fss`, but the check runs `MicroGptAplQuick.fss` and `MicroGptAplCheck.fss`. *Concept: the model programs' check drivers.* Both drivers import `MicroGptApl` (`MicroGptAplQuick.fss:7-15`), as C4's drivers import `MicroGptFlat`. Add this to the writer's core row, beside `references/interpreter.md`, "The model program", which names the drivers but not the programs that they import.
3. "runs after a batch" against the skill's "when your brief asks for it". *Concept: batch.* This is a word of the coordinating session, and no worker part defines it. P-30 uses it too. Define it in the short orientation, or drop "that runs after a batch" here, because P-30 holds it.

## P-11

**Fidelity: pass.** The added limit, "The verdict is on that typesetting only: the Unicode operators ... are the language's own syntax", rests on two sources. The first is his own framing in the 09-16 22:43:26 message: the notation is "a presentational layer that transforms this ASCII syntax", "not the integral part of a language". The second is the coordinator's correction in the reflection of 22:44:25, "The Unicode operators and mathematical spelling are in the language itself ... Fortify only adds the typesetting on top", which he answered "word". That "word" is a weak yes (`judgement-c1.md`, "P-11"). The limit narrows the verdict and does not widen it, so it is fair.

**Comprehension.** The reader's "Decided" line matches. It had one doubt: if the specification's build needs Fortify, is a repair of Fortify "work on it"? *Uncertain fidelity.* The case is real:
- `Specification/fortress/build.xml:43` puts `Fortify/` on `TEXINPUTS`.
- Before the verdict, the revival edited `Fortify/fortify.sty` twice so that the PDF builds (`3b9cf3e39`, 2026-08-21; `9622f9db3`, 2026-08-23).
- The reflection that he took names this very case: "We would touch Fortify only if we changed the spec's LaTeX build or wanted the microgpt article typeset that way. Given your verdict on the notation, that is a no."

No message of his says whether a repair that the specification's build needs waits for his ask. Only his answer settles it. Question for the curator: "When the specification's PDF build needs a change to `Fortify/fortify.sty`, may a worker make it, or does it wait for your ask?" Until he answers, the entry's "unless the curator asks" sends such a repair to him.

## P-17

**Fidelity: pass.** "Why: a language meant for high performance cannot box its numbers." In his 09-19 18:32:48 "it cannot be boxed", the "it" is the double array. "Its numbers" rests on his 09-15 10:42:06 instead: "using box types everywhere for the numerics. So that's like a no-go". The two together hold the sentence. "In Java models of microGPT's three array kernels" states F-11's condition and adds nothing.

**Comprehension.** The reader's "Decided" line matches. It had three doubts:
1. Only `RR64`, or every number type? *Wording.* The decision names doubles. Phase 6's item is "Unboxed arithmetic chosen by static type in generated code" (`PLAN.md:118`), which is not for doubles alone. Put those words in the state line (below).
2. The three kernels are not named. *Wording:* "microGPT's three array kernels, the dot product, the matrix product and the row lift" (F-11).
3. The title requires two things, but the "Still to build" line names only one. The arrays' `double[]` storage is phase 5's array design (`PLAN.md:99`). *Wording:* "Still to build: the arrays' `double[]` storage, in PLAN's phase 5, microGPT compiles, and unboxed arithmetic chosen by static type, in phase 6, microGPT fast (P-33 lists the phases)."

## P-19

**Fidelity: one sentence drops his reason.** In "Why: the record must not lead anyone to think that the tree is built on the port.", the source is his 09-23 06:33:41: "I still prefer that the record does not mislead you or anyone else to thinking this is built on Plucky Porcupine's graft, because it is not." The rewrite drops "because it is not", which is the reason that the reader looked for (doubt 1). "Must not" for his "prefer" is fair, because his 05:28:37 ("This is incorrect ... correct the record") makes the rule firm. *Wording:* "Why: the tree is not built on the port, and the record must not lead anyone to think that it is."

**Comprehension.** The reader's "Decided" line matches. It had three doubts:
1. "The entry gives no correct description." The rewrite gives the facts but no account that a worker can reuse. *Wording*, in the terms of the coordinator's 06:27:47 that his 06:33:41 answers ("By history: no. ... By content: almost yes"): "By history, `main` descends from that commit. By content, the port's material was removed, the modernization is the revival's own work, and one running fix stays from the port (F-165)."
2. "one running piece": not named. *Wording.* F-165 names it: "the `FTypeArrayList` fix for the JDK 8 `TreeSet` crash".
3. "wait for the lineage cleanup": two readings. The writer's question 1 to the curator covers this. Keep the question.

The writer's note on `coordinator/lineage.md` stands: its list predates `a4e266faa`. The entry's pointer is true only after that list is fixed, so the fix must come before this entry is applied.

## P-25

**Fidelity: one failure.** The sentence is "It states the exclusion rule as "instantiation exclusion", in two parts: the chapter on types says which instantiations of a generic exclude each other, and the chapter on traits states the rule on trait declarations." The subject is the restart's Types chapter. But the placement in a "chapter on traits" belongs to the revised `Specification/`, not to the restart:
- The writer's source, `explorations/reviews/spec-refused-examples-judgement.md` section 5, says: "The revised text takes that two-part form in his words, restricted to invariant parameters: in the types chapter, the exclusion between instantiations; in the traits chapter, the rule on declarations."
- The restart's own traits chapter, `Documentation/Specification/Prose/Language/traits.tick`, has 22 lines and does not state the rule.
- The restart has the two parts in one place. `types.tick:355-360` says which instantiations exclude each other. Its note at `:361-376` says that the rule proper "is a rule applied to trait declarations".
- The revised specification states the two parts at `Specification/basic/types-vals-vars.tex:242` and `basic/traits.tex:381`.

The reader's doubt 1 ("whose chapter that is") comes from this sentence. *Wording:* "It names the exclusion rule "instantiation exclusion" and gives it in two parts: which instantiations of a generic exclude each other (`types.tick:355-360`), and, in its note, a rule on trait declarations (`:361-376`). The revised `Specification/` takes that form: the first part in its chapter on types, the second in its chapter on traits (P-97)." The writer's row in `concepts.md` already gives the revised specification's placement correctly. The entry contradicts that row.

**Comprehension.** Besides doubt 1 above, the reader had three doubts:
2. If `Specification/` and the chapter disagree, which governs? And which rules count as revised? *Wording.* The ask that he agreed to (coordinator 09-26 07:56:16, his 08:01:03 "Agreed.") speaks of one rule: "on the rule S revises, it is the designers' latest intent". The judgement accepts the plural. Name the rule: "On the rules that the revival revises, such as the exclusion rule, the chapter is the designers' latest intent, which the goal is to finish." The takeaway points to P-26's restored sentence for what happens to `Specification/` (it is revised). That sentence is now in P-26.
3. `covariant`: is it adopted, rejected or left alone? *Wording.* P-62 holds its state: "The `covariant` keyword is future work, off the path to microGPT." His 08:07:48 "S2 yes, take the verdicts for rung S" took the coordinator's 08:05:53 "It isn't on the critical path". Proposal: "It adds a `covariant` modifier for a trait's static parameters, which neither path implements and which is future work, off the path to microGPT (P-62)." This also answers the reader's P-26 doubt on `covariant` against invariant generics.
4. `Bottom`: the reader read it correctly, as a statement of the chapter.

## P-26

**Fidelity: pass, with two small points.**
- "then made the language run": his 09-23 07:26:28 is "And then the type group went in and tried to make it run." The record has "made", and the rewrite keeps it. "Made" says more than his words, because the type group did not finish the compiler. *Wording:* "then worked to make the language run".
- "Specialization here means a special version of a generic function for one instantiation, which dispatch chooses at run time." This is right for the type group's sense: Naden's write-up (`justificationOfRTR.tex:83-88`, "the goal of the runtime is to choose the most specific applicable definition") and the coordinator's 07:16:28, which he answered. But his later word says that the way of choosing does not matter to him: "But how a specialization is chosen “ist mir egal”, as long as it runs fast." (09-24 01:02:52; P-43). *Uncertain fidelity, settled.* The definition describes the type group's design and is not a requirement of his. *Wording:* "Specialization, in the type group's design, is ...".

**Comprehension.** The reader's "Decided" line matches. It had five doubts:
1. "Specialization": two readings, the class loader's class for each instantiation, or an overload that dispatch picks. *Concept: specialization in two senses.* The writer's row in `concepts.md` is right, and this cold read confirms that the row is needed. That includes its note on `references/exploring.md:19` ("compiled code specialised to each instantiation of a generic"), which gives the other sense. The meaning belongs to this entry, so also give the example in the entry. *Wording:* "... a special version of a generic function for one instantiation, such as `tail(x: List[ZZ])` beside `tail[X](x: List[X])`, which dispatch chooses at run time".
2. "the specification's early text", when `Specification/` is the draft of 2011, later than the flattening of 2009 and 2010. *Concept: dating a passage of the specification.* His words place the early text by when it was written ("whatever the spec was dreaming about in 2008", 07:26:28), not by the draft's date. Define it in `references/exploring.md`, "Weighing the sources": a passage is early when it was written before the type group's work on its subject. The passage's history gives its date (`records.md`, "The repository's history", `git log --follow`).
3. "unfinished text": the audit's question 1 stands, and the writer keeps it. No new failure.
4. P-25's Types chapter against the type group's word, for example `covariant`: P-62 answers this, through the P-25 proposal above.
5. "RTR": only part of a file name. *Wording.* Name the write-up by its title: "Karl Naden's 2012 write-up, "The Return Type Rule and Generics" (`Papers/Types/journal/justificationOfRTR.tex:49`)".

## For the coordinator

- Two clean entries add a FACTS pointer: P-19 adds "(F-165)" and P-26 adds "(F-166)". The coordinator skill's `references/record.md:19` says that a POSITIONS entry "lists no FACTS entries". Today 14 of the 81 entries already do so. For P-19 the audit's takeaway recommended "(F-165)", and `corrections-c1.md` recommended the opposite link (F-165 to end "It bears on P-19"). This is your choice. It does not change the meaning of either entry.
- The writer's `concepts.md`: all five rows hold. This check adds:
  - PLAN, for the core's "The record".
  - In the C4 row: the vocabulary (`FlatArrays.fss`), the meaning of Hsu's flat style, and the check drivers that import the two programs.
  - "Batch", for the orientation.
  - The early text of the specification, for `exploring.md`.
- P-19 waits for the fix of `lineage.md`, "Files that still repeat it" (the writer's note).
- P-11 adds one question for the curator (above).

## His quotes

HIS 2026-09-16T22:43:26.489Z | At a certain point, we will probably take and rewrite the micro GPT algorithm in pure Java to know where our baseline lies, where, where that we are trying to hit if we were to get the optimal result.
HIS 2026-09-16T22:43:26.489Z | what got me interested in the language was the mathematical notation, which is, if I understand now correctly, like a presentational layer that transforms this ASCII syntax of a language using a tech or LaTeX render into what they call a 2D syntax
HIS 2026-09-16T22:43:26.489Z | but it is not the integral part of a language
HIS 2026-09-16T22:43:26.489Z | My impression is it is a neat gimmick, but not a good idea at all.
HIS 2026-09-16T22:46:21.111Z | word
HIS 2026-09-29T15:49:10.603Z | It is just a wording so that we are clear that we've turned the specification into a living document that should reflect whatever changes we are doing.
HIS 2026-10-12T23:15:30.246Z | We miss explain our modus operandi, that we are reconciling the contradictions and when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival.
HIS 2026-09-29T12:17:07.180Z | we have probably hit the junctions where even their last on record, or they, they have no clues on record. And I started to make my judgment calls.
HIS 2026-09-29T12:17:07.180Z | At, at this moment, I think I'm uh, like, I don't care about type theoretical purity and I'm accepting all unfinished corners of the language because I want to get to a compiled version of micro GPT.
HIS 2026-09-29T12:17:07.180Z | so that we do not get bogged down in weeds. Theory.
HIS 2026-09-19T17:01:32.913Z | C4 was our final target
HIS 2026-09-20T07:20:24.519Z | I am okay with C4 and APL base now being simpler because something has moved to the standard library
HIS 2026-09-14T20:12:12.623Z | then the c two hyperparameter notation is what we want to use. I was just commenting on, uh, way how to write it in Fortress on a single line in an interleaved form. This doesn't have any reasonable application for the APL macros/DSL. Right?
HIS 2026-09-14T20:02:12.210Z | we can still write, um, as semicolon separated declarations on one line if I'm not mistaken.
HIS 2026-09-15T07:28:31.808Z | we should strip it out and do only the part necessary for the micro GPT in APL and put the rest out of scope
HIS 2026-09-15T06:53:25.073Z | I would like to close this uh, ladder, this side quest
HIS 2026-09-12T10:17:30.754Z | We should not. built an interpreter of APL in fortress. We should convert APL syntax into efficient fortress code. That is the goal.
HIS 2026-09-15T10:42:06.544Z | using box types everywhere for the numerics. So that's like a no-go
HIS 2026-09-19T18:32:48.384Z | If this should have been high performance language, it cannot be boxed.
HIS 2026-09-23T05:28:37.640Z | This is incorrect. Where does this come from? Use archeology to find correct facts and correct the record that you cited here.
HIS 2026-09-23T06:33:41.521Z | I still prefer that the record does not mislead you or anyone else to thinking this is built on Plucky Porcupine's graft, because it is not.
HIS 2026-09-26T08:01:03.475Z | Agreed.
HIS 2026-09-26T08:07:48.939Z | S2 yes, take the verdicts for rung S
HIS 2026-09-23T07:26:28.248Z | And then the type group went in and tried to make it run.
HIS 2026-09-23T07:26:28.248Z | And when that wish met reality, then the spec must change.
HIS 2026-09-23T07:26:28.248Z | So whatever the spec was dreaming about in 2008 is irrelevant because it met hard reality and impossibility of implementation.
HIS 2026-09-24T01:02:52.634Z | But how a specialization is chosen “ist mir egal”, as long as it runs fast.
