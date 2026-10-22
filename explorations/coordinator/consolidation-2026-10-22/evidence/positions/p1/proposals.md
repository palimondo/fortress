<!-- The clarity pass on POSITIONS, chunk p1 of the consolidation of 2026-10-22: nine entries (P-7 to P-26) rewritten so that a reader without the conversation can tell what the curator decided, each with its change of meaning, the source of each sentence and its questions, in its second round after the cold read and the check. -->

# The clarity pass, chunk p1: nine entries

Each entry starts from its text in `POSITIONS.md` at `HEAD`, which already holds the provenance audit's applied corrections (`6b560762f`). The sources are the audit's evidence: for P-10, `explorations/coordinator/positions-audit/trial/evidence/` (`P-10.md`, `judgement.md`); for the other eight, `explorations/coordinator/positions-audit/full/evidence/` (the scout's report `P-N.md`, and `judgement-c1.md`, `corrections-c1.md` and `takeaway-c1.md`, each cited by its section for the entry). The takeaway check of the audit drafted a fix or a tighten for seven of these entries and, by the curator's rule of 2026-10-21 23:21 UTC, applied none; this pass uses them where they keep the meaning, and says so. A time is the curator's message, in UTC, as `curator-profile/show.py` prints it. Concepts that several entries use are in `concepts.md` beside this file.

This is the second round. It follows `check.md` and `cold-read.md` beside this file: each entry's "Round two" list says what changed and which point of the check it answers.

The nine entries hold 3,339 characters in the record and 8,011 here. The growth is the definitions of the things each entry names (C4, the APL program, its vocabulary, Fortify, the port, the restart, the type group, specialization), the limits that the cold readers could not see, and the pointers' few words. Seven stay over 600 by more than a little: P-25 (1,271), P-9 (1,242), P-26 (1,166), P-7 (963), P-19 (806), P-11 (709) and P-17 (678).

## P-7

> - P-7 **The goal is to finish what the designers intended, measured by one program, microGPT, compiled to JVM bytecode and running fast.** What the designers intended is judged by the specification in `Specification/`: the team's Working Draft of February 2011, as the revival revises it, with the Types chapter of the team's 2012 restart cited beside it (P-25). The revival revises the specification to reconcile contradictions: where the team's later work, in the compiler or in the papers on types, contradicts the original text, the text is updated to follow that work (P-26: the type group's later word wins). The language is not redesigned. The specification is a living document that states each change that the revival makes (P-95 says how a change is recorded). A pure-Java microGPT is the baseline that compiled microGPT is measured against: the optimal result, the one to aim at. Still to build: the pure-Java microGPT (PLAN, "Phase 6. microGPT fast").

Meaning: unchanged.
- "The floor to measure against" became "the baseline that compiled microGPT is measured against: the optimal result, the one to aim at". "Floor" was the coordinator's word in the reflection that he answered "word"; a reader could take it as a minimum to pass. His own words are "baseline" and the result "that we are trying to hit if we were to get the optimal result" (`takeaway-c1.md`, "P-7", the tighten). No source sets a ratio to the baseline, so the entry gives none.
- "The judge is `Specification/`" now says what is judged: what the designers intended, as `CLAUDE.md` puts it ("judged by its specification").
- New: what a revision is. It is his own account of the revival's way of working, so it draws the line between a revision and the redesign that the entry bars.
- "Not yet written (PLAN phase 6)" is now its own "Still to build" line, with the PLAN heading.
- His "probably" of 09-16 ("we will probably take and rewrite the micro GPT algorithm in pure Java") is not restored. The audit kept the entry without it, and the reflection that he took has none (`judgement-c1.md`, "P-7").

Round two (`check.md`, "P-7"):
- Doubt 1, wording: his "optimal" put back, as the takeaway's tighten had it.
- Doubt 2, wording: the revision sentence added, from his 10-12 message.
- Doubt 3, concept: PLAN goes to `concepts.md`, for the core's "The record".

Sources:
- The title and "The language is not redesigned.": 2026-09-16T22:43:26.489Z, unprompted: "try to finish those ideas as the original designers intended them", "I see no reason to make this language something that it wasn't designed to be", "We need to focus on, on getting this specific piece of software running fast", "In bytecode, Java bytecode". "Measured by one program": the coordinator's reflection of 22:44:25.808Z, "The measuring stick is one program", answered "word" at 22:46:21.111Z (`P-7.md`, section 1).
- The specification as the judge: 09-16, "not about the 1.0 specification, but the latest one that was committed in this repository"; his yes to item 11 of the decisions review, 2026-09-29T15:49:10.603Z. "The Working Draft of February 2011": the record's name for the copy (F-163; P-96), no word of his and none needed (`judgement-c1.md`, "P-7", which cites it as "F-164"; no F-164 exists, and F-163 is the entry). The Types chapter: P-25.
- The revision: 2026-10-12T23:15:30.246Z, "We miss explain our modus operandi, that we are reconciling the contradictions and when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival." P-26 holds the same rule for the type group's later word.
- The living document: 2026-09-29T15:49:10.603Z, "we've turned the specification into a living document that should reflect whatever changes we are doing". P-95 holds how a change is recorded.
- The baseline: 09-16, "rewrite the micro GPT algorithm in pure Java to know where our baseline lies, where, where that we are trying to hit if we were to get the optimal result"; the reflection, "A pure-Java microgpt later gives the floor to aim at", taken with "word".
- "Still to build": `PLAN.md`, "Phase 6. microGPT fast", "Timing against a pure-Java microGPT, which is not written yet"; no tracked Java file holds one (`P-7.md`, section 2c).

Questions for the curator: none.

## P-8

> - P-8 **Where the designers' own sources, the specification, the papers, the library and the implementations, give no answer, the curator decides by the goal, a compiled microGPT running fast, not by type-theoretic purity, and he stays true to the spirit of Fortress.** On the way to a compiled microGPT, he accepts the language's unfinished corners as they are, so that the work does not stall in theory. He has not read the specification, the papers on its type system or the library, and he takes the designers to have known more than he does.

Meaning: unchanged.
- "He" now has its antecedent, the curator.
- "Where the designers left no word" became "Where the designers' own sources ... give no answer". His picture is that they "have no clues on record". The sources are named as the `fortress-repo` skill names the team's sources ("When to explore": "the specification, the papers, the library and the implementations"), so that "record" does not read as the project's own record.
- "Rather than stall in theory" became "On the way to a compiled microGPT, he accepts ... as they are, so that the work does not stall in theory". His message sets the stance for now and for the goal ("at this moment", "because I want to get to a compiled version of micro GPT"), and the corners are left as they are, not finished (`takeaway-c1.md`, "P-8").
- The entry says what he does, and nothing that a worker must do. The `fortress-repo` skill's exploring part says which choices are a worker's and which go to him; the entry does not repeat it.

Round two (`check.md`, "P-8"):
- Doubt 1, wording: "the designers' record" became the designers' own sources, named.
- Doubt 2, wording: the stance placed on the way to the goal, which removes the clash with P-7's "finish what the designers intended".
- Doubt 3: "the spirit of Fortress" is his phrase, and no source defines it. It stays.

Sources: all from 2026-09-29T12:17:07.180Z, which answers no question (`P-8.md`, section 1):
- The title: "we have probably hit the junctions where even their last on record, or they, they have no clues on record. And I started to make my judgment calls."; "I don't care about type theoretical purity and I'm accepting all unfinished corners of the language because I want to get to a compiled version of micro GPT."; "That's our guiding star. But along the way, I want to stay true to the spirit of Fortress."
- The unfinished corners: "At, at this moment, I think I'm uh, like, I don't care about type theoretical purity and I'm accepting all unfinished corners of the language because I want to get to a compiled version of micro GPT."; "so that we do not get bogged down in weeds. Theory." (`takeaway-c1.md`, "P-8").
- What he has not read: "I haven't read the Fortress specification, none of the papers about its type system. I haven't read even the standard library, Fortress library here."; "I assume those people knew much more than I do right now."

Questions for the curator: none.

## P-9

> - P-9 **The revival searches for the most readable expression of the microGPT algorithm.** C4 is the flat microGPT program (`explorations/run-c4/src/MicroGptFlat.fss`), whose data layout follows Aaron Hsu's flat style of APL (P-29: C4 is not edited for speed before microGPT runs compiled). In C4, the polishing happens in the vocabulary, the array operations that the model's lines call: `FlatArrays.fss` beside C4, and what of it has moved into the standard library (P-27: what microGPT invented goes into the library). P-87 holds the limit: the model's text is the notation, and a change to a model line is shown to the curator as a diff first. C4 is the target form of the APL microGPT program (`explorations/apl/mg/MicroGptApl.fss`): the APL program is written so that each of its lines expands into the line that C4 writes by hand. C4 writes its hyperparameters as tuple bindings, such as `(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`, the form to which the APL sub-language (P-10) expands a strand assignment, APL's binding of several names at once. The one-line form, declarations separated by semicolons such as `nEmbd = 16; blockSize = 16; ...`, is not used: the APL sub-language has no use for it.

Meaning: unchanged.
- The title says whose search it is: the revival's, his "we are searching".
- C4 is now said first, with its file and its style, since four sentences turn on it. The record's "the flat program in Hsu's style, C4" named neither the file nor Hsu.
- The vocabulary is now named: the array operations in `FlatArrays.fss` beside C4, and the part of them that has moved into the standard library.
- "C4 is the APL program's target form" now says which way the dependency runs: C4 is the target, and the APL program is written to expand into C4's lines (`takeaway-c1.md`, "P-9": the first of the reader's two readings is his).
- "The semicolon form of those lines is set aside" now shows the form and gives his reason, so that it reads as a rule and not a postponement (`takeaway-c1.md`, "P-9").
- P-87, P-27 and P-29 get a few words on what each holds. P-29 answers how readability ranks against speed in C4.

Round two (`check.md`, "P-9"):
- Doubt 1, wording: P-87's pointer now says that a model line may change, once shown to him as a diff. The first round's "repaired around the model's text" read as "the model lines never change".
- Doubt 2, wording: the dependency turned the right way round, from his "C4 was our final target".
- Doubt 3, wording: the vocabulary named, from C4's header.
- Doubt 4, concept: Hsu's flat style goes to the C4 row of `concepts.md`.
- Doubt 5, wording: the one-line form shown.
- Doubt 6, wording, optional in the check: the P-29 pointer added.

Sources:
- The title: 2026-09-15T07:35:36.514Z, "we are searching for the optimal expression of Micro GPT algorithm for. Readability" (`P-9.md`, section 1).
- C4: `explorations/run-c4/design.md:1-3` (C4 merges C2 and C3, both in the flat style); `explorations/apl/reference/hsu-flat/NOTE.md:3` (the data layout redesigned after Aaron Hsu's "Designing Your Data"). Speed: P-29.
- The vocabulary: `explorations/run-c4/src/MicroGptFlat.fss:6-7`, "The array vocabulary is FlatArrays"; his 2026-09-20T07:20:24.519Z, "I am okay with C4 and APL base now being simpler because something has moved to the standard library"; P-27. Where the polishing happens: the coordinator's rung 4b ask of 2026-09-15T07:29:57.748Z, "If C4 looks suboptimal to you, that vocabulary is the place to say where", to which his 07:35:36 was a yes to the rewrite; P-87 now holds the rule (`corrections-c1.md`, "P-9", sentence 4).
- The target form: his question 2026-09-14T16:09:10.799Z, the coordinator's proposal of 16:10:00.779Z, his "start C4" at 19:14:11.380Z; 2026-09-19T17:01:32.913Z, "C4 was our final target ... that was supposed to be what our grammar, APL grammar, or the dialogue variant, was supposed to be. translated into using the hygienic macros"; `explorations/apl/mg/MicroGptApl.fss:1-11`, "expanding into what Run C4 writes by hand" and "every APL line expands to C4's own line". The APL program writes its own hyperparameters as host lines (`MicroGptApl.fss:22-28`); the entry does not say otherwise.
- The tuple bindings: 2026-09-14T20:12:12.623Z, "then the c two hyperparameter notation is what we want to use"; the coordinator's 20:12:33, a strand assignment in the sub-language expands to a tuple binding (APL gaps, row 80, `AplMgSyntax.fsi:276`); `explorations/run-c4/src/MicroGptFlat.fss:17`.
- The one-line form: commit `1bde6cd0e`, which wrote C4's hyperparameters as `nEmbd = 16; blockSize = 16; nHead = 4; headDim = 4; vocabSize = 27; bosId = 26` (his 09-14 20:02:12, "we can still write, um, as semicolon separated declarations on one line"); his 20:12:12 reversed it: "This doesn't have any reasonable application for the APL macros/DSL. Right?", confirmed by the coordinator.

Questions for the curator: none.

## P-10

> - P-10 **The APL side quest is closed: its sub-language covers only what the APL microGPT program needs, and the parts of APL that it left unbuilt, tacit functions, characters and nested arrays, are not pursued.** The side quest built an APL sub-language in `explorations/apl/`: a DSL grammar that expands APL text into Fortress code over Fortress's native arrays, not an interpreter of APL. Its microGPT program, `explorations/apl/mg/MicroGptApl.fss`, stays in the microGPT check under walk (P-30: the check's limit of one minute; what the check runs: the `fortress-repo` skill, `references/interpreter.md`, "The model program").

Meaning: unchanged.
- "Its remaining ground" became "the parts of APL that it left unbuilt".
- The title now holds the limit that his decision draws: the sub-language covers only what the APL microGPT program needs.
- "Its sub-language" is now said: what it is, where it is, and that it is not an interpreter. "Not an interpreter of APL" is the other half of the sentence that the clause comes from (his 09-12 words below).
- "The walk check" is now named, with P-30 and the skill part that says which programs it runs.

Round two (`check.md`, "P-10"):
- The check's small point: "gave Fortress an APL sub-language" became "built an APL sub-language in `explorations/apl/`", so that it does not read as a part of the language or the library.
- Doubt 1, wording: the limit "do only the part necessary for the micro GPT in APL" put into the title.
- Doubt 2, concept: the check drivers that import `MicroGptApl.fss` go to the C4 row of `concepts.md`.
- Doubt 3, concept: "that runs after a batch" dropped, because P-30 holds when the check runs. "Batch" goes to `concepts.md`, for P-30.

Sources:
- The title: 2026-09-15T07:28:31.808Z, "we should strip it out and do only the part necessary for the micro GPT in APL and put the rest out of scope", answering the coordinator's 07:23:52.724Z, which asked "whether the remaining APL ground (tacit and the small features near; characters tedious; nested arrays a second base) is worth climbing"; and 06:53:25.073Z, "I would like to close this uh, ladder, this side quest" (`judgement.md`, "P-10").
- The sub-language: 2026-09-12T10:17:30.754Z, "We should not. built an interpreter of APL in fortress. We should convert APL syntax into efficient fortress code. That is the goal.", and "I would try to go to the native arrays in Fortress as soon as possible"; "DSL grammar": `explorations/apl/mg/AplMgSyntax.fsi`, and the `fortress-repo` core's phase 3.
- The walk check: his page comment of 2026-10-21 23:05 UTC on P-10, "I think this is a valuable position. I would not strike it from the record" (`positions-audit/evidence/curator-comments-2026-10-21.md:41`; `HELD.md`, 23:05, "His comment is the source of the walk-check clause"); P-30; `references/interpreter.md`, "The model program" (the quick pair holds `MicroGptAplQuick.fss`, which imports `MicroGptApl`, `MicroGptAplQuick.fss:7-15`).

Questions for the curator: none.

## P-11

> - P-11 **The 2D notation is a gimmick: no work on it unless the curator asks.** The 2D notation is Fortify's rendering. Fortify (`Fortify/`, run by `bin/fortify` and `bin/fortick`) typesets Fortress source as mathematics in LaTeX, for the specification and the papers. Taken as programming syntax, such a rendering fixes one view of a computation, though the same mathematics can be written in many ways. APL, with one symbol for each transformation of the data, expresses a computation better. The rendering is presentation only, off the revival's path, and no argument in favour of Fortress. The verdict is on that typesetting only: the Unicode operators, such as `∑` and `×`, are the language's own syntax.

Meaning: unchanged, with one limit made explicit.
- Fortify is now said: what it does and where it is.
- "APL's one glyph for each transformation does that better": "that" pointed, by its grammar, at the fault. It now points at writing a computation (`takeaway-c1.md`, "P-11").
- The limit: "The verdict is on that typesetting only: the Unicode operators ... are the language's own syntax." The cold reader of the audit could not tell whether glyphs in source were covered, and a worker who took them to be would fight P-87 (`takeaway-c1.md`, "P-11", the tighten). The limit is in his own message, which calls the notation "a presentational layer" over the ASCII syntax and "not the integral part of a language", and in the coordinator's reflection that he answered "word". The limit narrows the verdict and does not widen it (`check.md`, "P-11").

Round two (`check.md`, "P-11"): the entry is unchanged. The cold reader's one doubt, whether a repair of Fortify that the specification's build needs is "work on it", is a doubt of fidelity that no source settles. By the writer's brief, the wording stays, and question 1 below goes to the curator. Until he answers, the entry's "unless the curator asks" sends such a repair to him.

Sources:
- The verdict and its reasons: 2026-09-16T22:43:26.489Z, unprompted: "My impression is it is a neat gimmick, but not a good idea at all."; "you can write the very same thing in many different ways"; "if you take it as a s programming syntax then you are encoding a specific perspective onto the code and this is always tied to the execution"; "It's a gimmick, it's not an essential part of the language"; "what APL is doing like encoding with a symbol a fundamental transformation of the data and very concisely expressing chains of such transformations is a much better way to think symbolically about a computation"; "what got me interested in the language was the mathematical notation" (behind "no argument in favour of Fortress").
- "No work on it unless the curator asks" and "off the revival's path": the coordinator's reflection of 22:44:25.808Z, "We would touch Fortify only if we changed the spec's LaTeX build or wanted the microgpt article typeset that way. Given your verdict on the notation, that is a no. ... the 2D rendering is presentation, not language, and not on our path.", answered "word" at 22:46:21.111Z, a weak yes (`judgement-c1.md`, "P-11").
- Fortify, and the limit: the same reflection, "Fortify is an Emacs Lisp program, `Fortify/fortify.el` ... It rewrites Fortress source into LaTeX commands so the spec and papers show code as typeset math"; "The Unicode operators and mathematical spelling are in the language itself ... Fortify only adds the typesetting on top." `Fortify/fortify-doc.txt:12-13`.

Question for the curator:
1. When the specification's PDF build needs a change to `Fortify/fortify.sty`, may a worker make it, or does it wait for your ask? The build puts `Fortify/` on its search path (`Specification/fortress/build.xml:43`), and the revival changed `fortify.sty` twice before your verdict so that the PDF builds (`3b9cf3e39`, 2026-08-21; `9622f9db3`, 2026-08-23). The reflection that you answered "word" names this case and says no; no message of yours speaks to a repair (`check.md`, "P-11").

## P-17

> - P-17 **Unboxed doubles and arrays of unboxed doubles are required: without them the revival misses its point.** Why: a language meant for high performance cannot box its numbers. Today the code generator boxes every number: an `RR64` value is an object of the class `FRR64`. In Java models of microGPT's three array kernels, the dot product, the matrix product and the row lift, boxing is the main cost (F-11 holds the measurement). How arrays store doubles, as `double[]`, is P-84's decision. Still to build: the arrays' `double[]` storage, in PLAN's phase 5, microGPT compiles, and unboxed arithmetic chosen by static type, in phase 6, microGPT fast (P-33 lists the phases).

Meaning: unchanged.
- His reason is now stated after "Why:". In his 09-19 "it cannot be boxed", the "it" is the double array; "its numbers" rests on his 09-15 "using box types everywhere for the numerics. So that's like a no-go". The two together hold the sentence (`check.md`, "P-17").
- "Boxing is the main cost on microGPT's array kernels" now says where it was measured, as F-11 does: in Java models of the three kernels, named, since no such kernel compiles yet. This states the premise's condition; it does not change the decision.
- "The storage is P-84's decision" now says which storage: the arrays', as `double[]` (`takeaway-c1.md`, "P-17", the tighten).
- The state is in its own line, and it now names both things that the title requires, each where `PLAN.md` tracks it.

Round two (`check.md`, "P-17"):
- Doubt 1, wording: the state line gives phase 6's item in PLAN's words, "unboxed arithmetic chosen by static type", which is not for doubles alone. The title keeps doubles, as his decision names them.
- Doubt 2, wording: the three kernels named, as F-11 names them.
- Doubt 3, wording: the arrays' `double[]` storage added to the state line, in phase 5.

Sources:
- The title: 2026-09-15T10:42:06.544Z, "to get a performant stuff is not to box the doubles but have an array of doubles so that something usable can come out of this at runtime which the JVM compiler would be able to optimize so that goes straight onto the priority list, like without this, what are we even doing here?"; 2026-09-19T18:32:48.384Z, "And yes, we must go to double array for performance. There is again no question about this."
- Why: 2026-09-19T18:32:48.384Z, "If this should have been high performance language, it cannot be boxed."; 2026-09-15T10:42:06.544Z, "using box types everywhere for the numerics. So that's like a no-go".
- Today: F-11; the `fortress-repo` core, "The compiled run time" ("`RR64` is the class `FRR64`").
- The cost and the three kernels: F-11 ("6.3× (dot product), 6.5× (matrix product) and 2.6× (row lift) over `double[]`"); `perf-probes/kernels/REPORT.md`, sections 2 and 4.
- The storage: P-84. "Still to build": `PLAN.md`, "Phase 5. microGPT compiles", the array design ("what puts `double[]` under the sized traits"); "Phase 6. microGPT fast", first item, "Unboxed arithmetic chosen by static type in generated code"; P-33.

Questions for the curator: none.

## P-19

> - P-19 **The tree is not described as the third-party port's migration grafted onto the team's history.** The port is a third-party port of the tree to Java 9, which commit `8fe1daa8f` copied onto the team's last commit (the `fortress-repo` skill, `references/records.md`, "The repository's history"). By history, `main` descends from that commit. By content, most of the port's files are removed or redone, and only one piece of the port's code still runs: the `FTypeArrayList` fix for the JDK 8 `TreeSet` crash (F-165). Why: the tree is not built on the port, and the record must not lead anyone to think that it is. The files that still describe the tree so wait for the lineage cleanup, a task parked in PLAN ("Off the path, parked"); `coordinator/lineage.md`, "Files that still repeat it", lists them.

Meaning: unchanged.
- The port is now said: what it is and which commit brought it.
- The true account is now said, in two parts, so that a worker can describe the lineage without either error: by history, `main` descends from the port's commit; by content, the port's files are mostly gone, and one piece of its code still runs, named. These are the terms of the coordinator's account that his 06:33:41 answers. The audit's strike of the `clean-ladder` sentence had taken away the entry's only pointer to F-165 (`takeaway-c1.md`, "P-19", the tighten). This is a fact of F-165's, not a ruling; the ruling stays the title.
- His reason is now stated after "Why:", with his "because it is not".

Round two (`check.md`, "P-19"):
- Fidelity: the reason now keeps his "because it is not", which the first round had dropped. "Must not" for his "prefer" stays: his 05:28:37 makes the rule firm.
- Doubt 1, wording: the account by history and by content.
- Doubt 2, wording: the running piece named, as F-165 names it.
- Doubt 3: "wait for the lineage cleanup" has two readings; question 1 below stays.

Sources:
- The title: 2026-09-23T05:28:37.640Z, on the coordinator's boot line "plus pluckyporcupine's Scala/Java migration graft": "This is incorrect. Where does this come from? Use archeology to find correct facts and correct the record that you cited here."
- The port: `references/records.md`, "The repository's history", the line on `8fe1daa8f`; F-165.
- The account: the coordinator's 2026-09-23T06:27:47.426Z, "By history: no. Main's commit history runs through the graft commit ... By content: almost yes. The port's material was stripped from main by hand ... What main's files still carry from the port: one small fix that actually runs", to which his 06:33:41 answers; F-165 ("most of its 1,506 files are removed or redone. One running piece stays, the `FTypeArrayList` fix for the JDK 8 `TreeSet` crash"); `coordinator/lineage.md`, "Verification against Pavol's recollection" ("the only piece of the port main's code runs").
- Why: 2026-09-23T06:33:41.521Z, "I still prefer that the record does not mislead you or anyone else to thinking this is built on Plucky Porcupine's graft, because it is not."
- The cleanup: his hold, 06:02:13.771Z ("So maybe it is worth a cleanup. Pass after we establish the correct facts for the record. But let's hold on, on, on that task."), then his go at 06:33:41 for a first cleanup (`a4e266faa`, 12 files); the rest parked in `PLAN.md`, "Off the path, parked" (`judgement-c1.md`, "P-19").

Question for the curator:
1. When a worker edits a file for another reason, and the file still describes the tree as built on the port's graft, may the worker correct that wording then, or does every such file wait for the lineage cleanup? The entry says that they wait. No message of yours settles it; your words of 2026-09-23 06:33 UTC, that the record must not mislead anyone, lean to correcting (`takeaway-c1.md`, "P-19").

For the coordinator, not the curator: the list that the entry points to, `coordinator/lineage.md`, "Files that still repeat it", predates the cleanup of `a4e266faa`. That commit rewrote five of the files it lists and gave others a dated correction beside the old words; only `coordinator/oracle-headers.md:47` stands as it was (`corrections-c1.md`, "P-19", "Pointers elsewhere"). The fix belongs to `lineage.md`, and it must come before this entry is applied; once it is made, the entry's pointer is true as written.

## P-25

> - P-25 **`Specification/` stays the standard, and the Types chapter of the team's 2012 restart is cited beside it.** The restart is a new specification that the team began in 2012 and left unfinished (F-166). Where its Types chapter, `Documentation/Specification/Prose/Language/types.tick`, covers a topic, a worker cites it beside `Specification/` as the designers' later word. On the rules that the revival revises, such as the exclusion rule, the chapter is the designers' latest intent, which the goal is to finish, and `Specification/` is revised to follow it (P-26: the specification is revised to the team's later word). Three of the chapter's passages bear on that revision (P-97 holds how the revision uses them). It names the exclusion rule "instantiation exclusion" and gives it in two parts: which instantiations of a generic exclude each other (`types.tick:355-360`), and, in its note, a rule on trait declarations (`:361-376`). The revised `Specification/` takes that form: the first part in its chapter on types, the second in its chapter on traits. It adds a `covariant` modifier for a trait's static parameters, which neither path implements and which is future work, off the path to microGPT (P-62). It says that `Bottom` cannot be written in a program.

Meaning: unchanged.
- The restart and its Types chapter are now named, with the chapter's path.
- "It covers the exclusion rule, ..., the `covariant` modifier, and `Bottom`" read to the audit's cold reader as a list of rules to follow (`takeaway-c1.md`, "P-25", a drift from a kept sentence). It now says what the ask he agreed to said: these are three passages that bear on the revision. Only the first is a rule that the revision changes. The `covariant` modifier is said with its state, so that no worker takes it as work to start.
- "In its two-part form" is now spelled out, with where each part is stated. P-97 points to P-25 for it.
- New: what follows for `Specification/` on a revised rule. It is revised to follow the chapter. This is how the takeaway reads his "the designers' latest intent" ("on the exclusion rule the chapter wins, and the specification is revised to it"), and P-26 holds the rule; it answers which text governs.

Round two (`check.md`, "P-25"):
- Fidelity: the first round placed the second part of the rule in "the chapter on traits" as though the restart held it there. The restart holds both parts in its Types chapter, the second in a note; the revised `Specification/` puts them in its chapters on types and on traits. The entry now says each.
- Doubt 2, wording: the rule that the revival revises named, the exclusion rule, as the ask he agreed to named it; and what happens to `Specification/` there, with the P-26 pointer.
- Doubt 3, wording: `covariant` is future work, off the path to microGPT, with P-62. This also answers the cold reader's P-26 doubt on `covariant` against invariant generics.
- Doubt 4: `Bottom` was read correctly, as a statement of the chapter.

Sources:
- The decision: 2026-09-26T08:01:03.475Z, "Agreed.", under his quote of the coordinator's recommendation "I recommend yes: on the rule S revises, it is the designers' latest intent, and the goal is to finish what they intended."; the ask of 07:56:16.747Z, "should the new specification's Types chapter count as the designers' later word wherever it covers something?", whose yes was "`Specification/` stays the standard, and the Types chapter is cited wherever it covers something" (`judgement-c1.md`, "P-25"). "The rule S revises" is the exclusion rule; the entry's plural follows from "wherever it covers something" (the same section), and "such as the exclusion rule" names the one that the ask named.
- `Specification/` revised to follow the chapter: `takeaway-c1.md`, "P-25", "Which text governs"; P-26, from his 2026-09-23T07:26:28.248Z, "then the spec must change".
- The restart: F-166; `coordinator/spec-lineage.md`. The path: the `fortress-repo` skill, `references/specification.md`.
- The three passages: the same ask, "Three passages bear on S": instantiation exclusion (`types.tick:353-376`), the `covariant` modifier for trait static parameters (`:320-339`), and `Bottom` that "cannot be written in a program" (`:173-195`).
- The two parts in the restart: `types.tick:355-360` ("Two instantiations of a generic trait type exclude each other if ..."), and its note at `:361-376` ("the rule we impose is stronger ... which is a rule applied to trait declarations"). The restart's own traits chapter, `traits.tick`, does not state the rule (`check.md`, "P-25").
- The two parts in the revised specification: `Specification/basic/types-vals-vars.tex:242` ("This property is called instantiation exclusion") and `basic/traits.tex:381`; `reviews/spec-refused-examples-judgement.md`, section 5 ("in the types chapter, the exclusion between instantiations; in the traits chapter, the rule on declarations"), whose verdicts he took at 2026-09-26T08:07:48.939Z (P-97).
- `covariant`'s state: P-62, "The `covariant` keyword is future work, off the path to microGPT"; P-97, "a `covariant` modifier, which neither path implements (row 404)"; his 08:05:26.356Z, "future work, after we get the compiler running, or is it on the critical path", the coordinator's 08:05:53.363Z, "It isn't on the critical path", taken at 08:07:48 ("S2 yes, take the verdicts for rung S").

Questions for the curator: none.

## P-26

> - P-26 **Where the type group's later positions conflict with the specification's early text, the later positions win.** The early text was a wish. The type group, the part of the team that built the type checker and the compiler, then worked to make the language run, with performance as the goal and specialization a must, and learned what is feasible. Specialization, in the type group's design, is a special version of a generic function for one instantiation, such as `tail(x: List[ZZ])` beside `tail[X](x: List[X])`, which dispatch chooses at run time. Where the two conflict, the specification is revised to follow their later word (P-95 records each change with its reason). Their later word includes the exclusion rule, specialization kept, the number types of the compiler's prelude made siblings in 2009 and 2010 (P-43: the library's numbers are flat in the same way), Karl Naden's 2012 write-up "The Return Type Rule and Generics" (`Papers/Types/journal/justificationOfRTR.tex`) and the type group's POPL 2019 paper (F-166). The implementers' later word also outweighs unfinished text. The revival does not second-guess them: it knows less than they did.

Meaning: unchanged, with one sentence of the decision's own message restored.
- "The type group" and "specialization" are now defined. "Specialization" has two senses in this repository (`concepts.md`); the entry's is Naden's and the account's he answered, given with its example. It is marked as the type group's design, because his later word says that the way a specialization is chosen does not matter to him.
- "Then made the language run" became "then worked to make the language run": his words are "tried to make it run", and the type group did not finish the compiler.
- Restored: "Where the two conflict, the specification is revised to follow their later word". It is his "when that wish met reality, then the spec must change", in the message that the entry condenses, and he said the same on 10-12. It answers the doubt that the audit's cold reader had in P-7, P-25 and P-26 alike: what happens to the standard when the later word wins (`takeaway-c1.md`, "P-26", the tighten).
- The list now names each item: the flattening as what it did to the number types, with P-43's few words on what follows for the library; Naden's write-up by its title and file; the POPL paper by F-166.
- Kept word for word: "The implementers' later word also outweighs unfinished text." No word of the curator stands behind it, and the audit put it to him as a question (`corrections-c1.md`, "P-26", question 1). By the writer's brief (`record-clarity/writer.md`, step 8), its wording stays until he answers. This pass adds no question of its own on it.

Round two (`check.md`, "P-26"):
- Fidelity, small: "made" became "worked to make"; the definition of specialization marked "in the type group's design" (his 09-24 "how a specialization is chosen 'ist mir egal'", P-43).
- Doubt 1, concept and wording: the example put into the entry; the two senses stay in `concepts.md`.
- Doubt 2, concept: "the specification's early text" goes to `concepts.md`, for `references/exploring.md`.
- Doubt 3: "unfinished text" is the audit's open question; no new failure.
- Doubt 4: `covariant` against the type group's word is answered in P-25, through P-62.
- Doubt 5, wording: the write-up named by its title.
- The cold reader's doubt on whether the number types bind the interpreter's library too, which the check does not class: the P-43 pointer now says what it holds, that the library's numbers are flat in the same way.

Sources:
- The title, the wish, the type group's work and "does not second-guess them": 2026-09-23T07:26:28.248Z, answering the coordinator's 07:16:28.611Z ("Here is the whole thing in plain words"): "The spec was written in a vacuum early on."; "And then the type group went in and tried to make it run. So they knew much more about what's feasible and what, what's not. The goal was performance. The specialization is a must."; "Like the spec cannot be all authoritative on, on something that was written as a wish. And when that wish met reality, then the spec must change."; "We are not Naden. We know nothing here." He restated it at 2026-09-29T12:17:07.180Z: "we are valuing their latest positions on record above whatever they said earlier".
- The type group: the `fortress-repo` skill, `references/exploring.md`, "Weighing the sources".
- Specialization: the coordinator's 07:16:28.611Z that he answered ("a generic function `tail[X](x: List[X]): List[X]` and, beside it, a faster special version `tail(x: List[ZZ])` ... They kept the special versions and forbade the double membership"); `Papers/Types/journal/justificationOfRTR.tex:78-88` ("a generic function that takes a generic type as an input is specialized for a particular instantiation of the type"; "the goal of the runtime is to choose the most specific applicable definition") and `:477-478`. "In the type group's design": 2026-09-24T01:02:52.634Z, "But how a specialization is chosen “ist mir egal”, as long as it runs fast." (P-43).
- The revision: the same message of 09-23; 2026-10-12T23:15:30.246Z, "when later work in compiler or type papers contradict the original spec, we updated it to match the current state of the implementation in the revival."; P-95.
- The list: the coordinator's terms for the type group's trade, which he took ("So I think this is the route that we must pursue."); the dates his correction of 2026-10-12T22:20:54.637Z; P-43 ("So the library's numbers are flat, as the team ... flattened the compiler prelude in 2009 and 2010"); the write-up's title, `justificationOfRTR.tex:49`; the POPL 2019 paper his in use since 2026-10-10T06:09:08.402Z (`corrections-c1.md`, "P-26").

Questions for the curator: none new. The audit's question 1 on "The implementers' later word also outweighs unfinished text" (`corrections-c1.md`, "P-26") stands; file it once.

## For the coordinator

- Two clean entries add a FACTS pointer: P-19 adds "(F-165)" and P-26 adds "(F-166)". The coordinator skill's `references/record.md:19` says that a POSITIONS entry "lists no FACTS entries", though 14 of the 81 entries already do. For P-19 the audit's takeaway recommended "(F-165)", and `corrections-c1.md` recommended the opposite link (F-165 to end "It bears on P-19"). The choice is yours; it does not change the meaning of either entry (`check.md`, "For the coordinator").
- P-19 waits for the fix of `coordinator/lineage.md`, "Files that still repeat it" (P-19 above).
- The `fortress-repo` skill's `references/exploring.md`, "Weighing the sources", lists "compiled code specialised to each instantiation of a generic, which they kept". That is the class loader's sense of specialization (the core's "The compiled run time"). P-26's source means the other sense, special versions that dispatch picks. The skill writer should check that line (`concepts.md`).
- Questions for the curator from this chunk: P-11, question 1 (new in round two); P-19, question 1; P-26, the audit's question 1, filed once.
