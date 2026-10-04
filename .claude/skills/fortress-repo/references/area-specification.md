# The specification

`Specification/` is the standard: the team's working draft, as the revival revises it. `Specification-1.0-frozen/` is the unrevised copy, called "the Working Draft of February 2011" (only `fortress.1.0.pdf` in it is the 1.0 release), and it is never edited. `Documentation/Specification/` is the team's later, unfinished restart: where its Types chapter, `Documentation/Specification/Prose/Language/types.tick`, covers a topic, cite it beside `Specification/` as the designers' later word.

Weighing the sources: the aim is to finish what the designers intended, not to redesign. The type group's late, implementation-informed positions (the exclusion rule, specialization kept, the flattened compiled number tower, the later papers) outweigh the early text where the two conflict, and the implementers' later word outweighs unfinished text. How a feature is used is the library's practice (`area-library.md`). `Specification/library/apis/*.tex` is generated from the library, so citing it as an independent standard is circular.

## Changing the text: the revision form

Every change records its reason, so that the text and the implementation never disagree where nobody can see it. A change is an edit of the original tree and its commit says so. It has four parts:

1. At each changed passage, a callout that prints in every build (never a `\note`):

       \revision{<label of the Appendix I entry>}{<what changed, in a sentence or two>}

   The macro, defined in `Specification/fortress/fortress.tex`, prints a labelled box that points to the entry's section.
2. An entry in the revival section of Appendix I, `Specification/appendices/changes.tex`: a `\subsection` with a `\seclabel`, then the affected sections, the change, its rationale, its effect, the original text quoted with its path and line in `Specification-1.0-frozen/`, and what reversing to the alternative not taken would require. Each entry names the decision it follows; read the existing entries for the form.
3. One paragraph in the front matter.
4. The full reasoning in a decision record in the repository, under `explorations/`.

An example the revision refuses stays in the text, marked "Not allowed", the specification's own form. The calculi of Appendix A keep their rules and soundness claims; a callout says what a calculus predates.

Report every sentence of the specification your change makes false (an Appendix I effect, a note on walk or on the compiled path), quoted with its file and line, so that it is corrected.

## When the text and an implementation disagree

Where the decisions on record settle it, fix the side they settle. Where they do not: the text stays as written, a ledger row records the departure, a gated `XXX` test asserts the text's answer on the path that departs (`tests-writing.md`), and the row is named among the departures in the passage's Appendix I entry, so that the text claims no more than holds.

## Citing it

- In a test: by file and section or entry, never by line (`tests-writing.md`). A change that renames or removes a section a test names updates that citation in the same commit.
- In an Appendix I entry: the unrevised copy by path and line.
- Inside the text: `\secref{label}`.

An edit under `Specification/` cannot move the checker count or the distance, and no suite reads it: it needs no gate run of its own.
