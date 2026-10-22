# Cold read, chunk c1

Source: `rewritten-c1.txt`, nine entries (P-7, P-8, P-9, P-11, P-12, P-17, P-19, P-25, P-26). Read with no other project file open.

## P-7

1. **Do / do not.** Judge any language question against `Specification/` (the February 2011 Working Draft, as the revival amends it), with the 2012 Types chapter cited next to it. Do not redesign the language. Record the revival's changes in the specification itself. Measure speed against a pure-Java microGPT that has yet to be written.
2. **Decides.** It sets the goal (finish the designers' intent) and what measures it (microGPT compiled to bytecode, running fast), because the project is a revival, not a new language.
3. **Unclear.**
   - "The language is not redesigned" sits beside "the Working Draft ... as the revival revises it" and a specification that "states the revival's changes". Where does an allowed revision stop and a redesign start? A worker cannot tell which spec edits are allowed.
   - "The floor to measure against is a pure-Java microGPT." A hand-written Java version is usually the fastest result you can hope for, so "floor" reads two ways. It could be a minimum the compiled program must reach, or just the baseline it is compared with. If it is a minimum, it is a very strict one.
   - "The judge is `Specification/`" with the Types chapter only "cited beside it". P-25 and P-26 then say the later word wins where they conflict. This entry alone suggests the specification always governs.

## P-8

1. **Do / do not.** Where the designers left no answer, expect the curator to choose by what helps a fast compiled microGPT, not by type-theoretic neatness. Do not hold work up over theory, and accept the language's unfinished corners. He has not read the sources, so bring him the text and do not assume he knows it.
2. **Decides.** Gaps in the design are settled for the practical goal, staying in Fortress's spirit. The reason given: stalling in theory costs more than an unfinished corner, and the designers knew more than he does.
3. **Unclear.**
   - "He" is never named in the entry. You have to guess it means the curator.
   - "He decides" could mean only the curator settles gaps, so a worker must stop and ask. It could also mean this is the rule the curator uses, so a worker may apply it directly.
   - "Not by type-theoretic purity" and "stays true to the spirit of Fortress" can pull in different directions, since rigorous typing is arguably part of that spirit. The entry does not say which wins.
   - "Accepts the language's unfinished corners" could mean leave them unfinished. It could also mean work around them without designing a fix. These lead to different actions.

## P-9

1. **Do / do not.** Make microGPT more readable by improving the operations it is written in (the vocabulary). Do not restructure the flat C4 program itself. Write its hyperparameters as tuple bindings, not in the semicolon form.
2. **Decides.** Readability work goes into the vocabulary, and the hyperparameter lines use tuple bindings. The reason given: C4 is what the APL program turns into, and an APL strand assignment expands to a tuple binding.
3. **Unclear.**
   - "Polishing happens in the vocabulary" may mean the program body stays fixed and only the operations change. It may also mean the vocabulary is simply the main place for polishing.
   - "C4 is the APL program's target form" could mean the APL program is translated into C4. It could instead mean C4 is the shape the APL program is meant to end up in.
   - "The semicolon form ... is set aside" could mean rejected for good or just put off for now.
   - The entry does not say whether "most readable" may cost speed, which P-7 makes the measure.

## P-11

1. **Do / do not.** Do no work on Fortress's two-dimensional mathematical notation (Fortify's rendering) unless the curator asks. Do not present it as a selling point for Fortress.
2. **Decides.** The 2D notation is out of scope. The reason given: it fixes one view of a computation into the syntax, it is only presentation, and APL handles the job better.
3. **Unclear.**
   - "APL's one glyph for each transformation does that better." Grammatically, "that" refers back to "bakes one view of a computation into the syntax", which is the fault just described. It is meant to refer to writing the mathematics. The sentence can be read as praising APL for the same fault.
   - Does "2D notation" include Unicode operators written in the source (for example ∑ or ×), or only Fortify's typeset output? A program's vocabulary (P-9) may use such glyphs.
   - The entry does not say what happens to existing Fortify code: keep it building, leave it alone, or remove it.

## P-12

1. **Do / do not.** Do not yet make the static type checker work on the programs the interpreter (walk) runs. That waits until after the switch-over, and until walk accepts the coercions the checker inserts. Today the checker only works with the compiler's prelude.
2. **Decides.** Checker support for interpreter programs is wanted but comes later. The reason given: walk must first accept the checker's inserted coercions.
3. **Unclear.**
   - The entry names two conditions: "after the switch-over" and "once walk also takes the static coercions". Are they one event (the switch-over includes walk taking the coercions)? Or are they two separate gates, and which comes first?
   - "He wants" suggests the curator cares about this now. It is not clear whether a worker may do preparatory work before the gate, or must leave the topic alone.

## P-17

1. **Do / do not.** Treat unboxed doubles and unboxed arrays of doubles as required, not optional. The current code generator boxes every number, and that is the main cost in microGPT's array kernels. For how they are stored, see P-84. For unboxed arithmetic, see PLAN phase 6 (P-33).
2. **Decides.** Unboxed doubles and double arrays must exist. The reason given: boxing is the main slowdown, and without the fix the revival misses its point.
3. **Unclear.**
   - "Required" sits beside unboxed arithmetic being scheduled for phase 6. Required by when: now, or before the revival counts as done?
   - "Boxes every number", yet only doubles are required. Are integers and other numeric types deliberately out of scope, or just not mentioned?
   - "The storage is P-84's decision": storage of what? Arrays, single values in fields and locals, or both?

## P-19

1. **Do / do not.** Do not describe the repository as a third-party port's migration grafted onto its history. Leave the files that still say so as they are: they wait for a parked lineage cleanup, and `coordinator/lineage.md` lists them.
2. **Decides.** It rules that framing out of the project's own descriptions. The entry gives no reason.
3. **Unclear.**
   - The entry says what not to write, but not what the correct description is.
   - If a worker edits one of those files for another reason, should it fix the wording while there, or leave it for the cleanup? "Wait for the lineage cleanup" suggests leave it. But the cleanup is parked, so the wrong wording may stay for a long time.
   - "Which `coordinator/lineage.md` ... lists": "which" may refer to the cleanup or to the files. It probably means the files.
   - It is not clear whether the description is false, or true but not the framing the project wants.

## P-25

1. **Do / do not.** Keep `Specification/` as the standard. Where the 2012 Types chapter covers a topic, cite it alongside the specification as the designers' later word. On the rules the revival revises, follow it as their latest intent. Those rules include the two-part exclusion rule, `covariant` and `Bottom` (which a program cannot write).
2. **Decides.** The Types chapter is the designers' latest intent on the rules it covers, and the specification stays the standard elsewhere. The reason given: the goal is to finish what the designers last intended.
3. **Unclear.**
   - "The specification stays the standard" against "on the rules that the revival revises, it is their latest intent, which the goal is to finish". If the two disagree on one of those rules, which governs: the specification, or the Types chapter? "Cited beside" suggests the specification. "The goal is to finish" it suggests the Types chapter.
   - "It covers the exclusion rule, ..., `covariant`, and `Bottom`" could be the full list of revised rules, the full list of the chapter's topics, or only examples.
   - Which rules count as "the rules that the revival revises" is not stated. It may be circular: are they revised because the Types chapter says so, or is the chapter applied to rules revised for other reasons?
   - "`Bottom`, which no program can write" may be a fact (there is no syntax for it) or a rule (the revival must forbid it).

## P-26

1. **Do / do not.** Where the type group's later work conflicts with the specification's early text, follow the later work. That later work is the exclusion rule, keeping specialization, the 2009–2010 flattened numeric tower in the compiler prelude, Naden's 2012 write-up and the POPL 2019 paper. The implementers' later choices also outweigh unfinished text. Do not second-guess them.
2. **Decides.** Later implementation experience beats the early specification text. The reason given: the early text was a wish, and the type group learned what was feasible by making the language run fast.
3. **Unclear.**
   - P-7 says "the judge is `Specification/`" and P-25 says "the specification stays the standard". This entry says later positions outweigh it. They can be reconciled (the standard, except where a later word conflicts), but no entry states that rule outright.
   - "The implementers' later word also outweighs unfinished text." Does "word" include code, so that whatever the compiler does beats the specification? If so, an implementation bug could become authoritative. And does "implementers" mean only the type group, or anyone who wrote the old compiler?
   - Which text counts as "unfinished", and who decides that?
   - "The compiler prelude's tower flattened" is listed as a winning later word. It does not say whether the Library's own tower must be flattened to match, or whether both forms stay. Flattening it could also look like the redesign P-7 rules out.
   - The POPL 2019 paper is seven years after the project ended. It is unclear whether it counts as the "type group's late positions" with the same weight as the 2009–2012 work.
