# The specification

The specification exists in three copies:

- `Specification/` is the team's working draft, as the revival revises it. It says what the language means, except where a decision of the curator says otherwise. If a later source of the team's disagrees with it, and no decision says which is correct, that is a conflict (`exploring.md`).
- `Specification-1.0-frozen/` is the unrevised copy, called "the Working Draft of February 2011". Only `fortress.1.0.pdf` in it is the 1.0 release. Never edit this copy.
- `Documentation/Specification/` is the team's later restart, which they did not finish. If its Types chapter, `Documentation/Specification/Prose/Language/types.tick`, covers a topic, cite it beside `Specification/` as the designers' later word.

The draft build prints the team's 229 `\note{}` boxes, and a release build hides them. Many say that a feature was not built, for example "Reduction variables are not yet supported." Before you record a missing feature as a gap, grep the notes of its chapter: `grep -n '\\note{' Specification/<file>.tex`. The team's written rationale is in the Internal Document appendix: `Specification/appendices/FAQ.tex` and `future.tex`.

Appendix I, `Specification/appendices/changes.tex`, records the changes to the text. Its revival section has one entry for each change of the revival.

`Specification/library/apis/*.tex` is generated from the library, so do not cite it as an independent standard. No suite reads `Specification/`, so an edit there needs no gate run of its own.

## Weighing the sources

This section describes how the curator weighs the team's sources. Use it to describe each source in your report (`exploring.md`).

The type group is the members of the team who built the type checker and the compiler in the project's last years, 2010 to 2012. Their late positions outweigh the early text. They include:

- the exclusion rule;
- compiled code specialized to each instantiation of a generic, which they kept;
- the compiled number tower, which they flattened in 2011;
- the 2012 write-up on the Return Type Rule (`Papers/Types/journal/`);
- the POPL 2019 paper on symmetric multiple dispatch (`research/extracts/ParkPOPL2019-extract.md`).

If you explore a conflict or write a decision not taken, and you need the designers' reason for a rule, print the row of its design area. WORD is a word of the area, such as `coercion`, `juxtaposition`, `dispatch` or `Arrays`. A word can match several rows, each about 1 to 2 KB. Then open the sources that the row names.

    explorations/coordinator/tools/facts-extract.sh 'map:design-intent-sources.md#The map, by design area@WORD'

## Changing the text: the revision form

Record the reason for every change, so that the text and the implementation never disagree where nobody can see it. A change has four parts:

1. At each changed passage, a callout that prints in every build. Do not use `\note`.

       \revision{<label of the Appendix I entry>}{<what changed, in a sentence or two>}

   `Specification/fortress/fortress.tex` defines the macro. It prints a labelled box that points to the entry's section.
2. An entry in the revival section of Appendix I: a `\subsection` with a `\seclabel`. Read the existing entries for the form. The entry gives:
   - the affected sections, the change, its rationale and its effect;
   - the original text, quoted with its path and line in `Specification-1.0-frozen/`;
   - what a reversal to the alternative not taken would need;
   - the decision of the curator that it follows (its POSITIONS entry), or the reason that your brief gives.
3. The front matter's one paragraph on the revision, in `Specification/fortress/preamble.tex`. If your change makes it false, correct it.
4. The full reasoning, in a decision record under `explorations/`: each changed passage, the original and the new text, the reason, and the way back. For the form, read `explorations/compile-ladder/rung-spec-route-a/decision-record.md`.

If the revision refuses an example, keep the example in the text, marked "Not allowed", as the specification itself does. Keep the rules and soundness claims of the calculi of Appendix A. Add a callout that says what a calculus predates.

In your report, quote every sentence of the specification that your change makes false, with its file and line. Such a sentence can be an Appendix I effect, or a note on walk or on the compiled path.

## When the text and an implementation disagree

- If a decision of the curator says which side is correct, change the other side to agree.
- If no decision says so, it is a conflict. Switch to exploring (`exploring.md`).
- If the passage has an Appendix I entry, add the conflict's ledger row to the departures that the entry lists. Then the text claims no more than holds.

## Citing it

- If your change renames or removes a section that a test names, update that citation in the same commit.
- Inside the text, use `\secref{label}`.
