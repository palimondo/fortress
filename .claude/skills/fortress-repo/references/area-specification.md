# The specification

- `Specification/` is the team's working draft, as the revival revises it. It says what the language means, except where a later source of the team's says otherwise (below).
- `Specification-1.0-frozen/` is the unrevised copy, called "the Working Draft of February 2011". Only `fortress.1.0.pdf` in it is the 1.0 release. Never edit this copy.
- `Documentation/Specification/` is the team's later restart, which they did not finish. If its Types chapter, `Documentation/Specification/Prose/Language/types.tick`, covers a topic, cite it beside `Specification/` as the designers' later word.

## Weighing the sources

The aim is to finish what the designers intended, not to redesign. The team learned as it built, so if two of its sources conflict, the later one outweighs the earlier, whether it is a paper, the implementation or text. In particular:

- The late positions of the type group outweigh the early text. The type group is the members of the original team who built the type checker and the compiler in the project's last years, 2010 to 2012. Their late positions include the exclusion rule; compiled code specialized to each instantiation of a generic, which they kept; the compiled number tower, which they flattened in 2011; the 2012 write-up on the Return Type Rule (`Papers/Types/journal/`); and the POPL 2019 paper on symmetric multiple dispatch (`research/extracts/ParkPOPL2019-extract.md`).
- The implementers' later word outweighs unfinished text.

`explorations/coordinator/map/design-intent-sources.md` lists where the designers' intent is written. How a feature is used is the library's practice (`area-library.md`). `Specification/library/apis/*.tex` is generated from the library, so do not cite it as an independent standard.

## Changing the text: the revision form

Record the reason for every change, so that the text and the implementation never disagree where nobody can see it. A change is an edit of the original tree: say so in its commit message. No test can observe a change of prose, so it has no failing test (`tests-writing.md`). A change has four parts:

1. At each changed passage, a callout that prints in every build. Do not use `\note`.

       \revision{<label of the Appendix I entry>}{<what changed, in a sentence or two>}

   `Specification/fortress/fortress.tex` defines the macro. It prints a labelled box that points to the entry's section.
2. An entry in the revival section of Appendix I, `Specification/appendices/changes.tex`. The entry is a `\subsection` with a `\seclabel`. It gives the affected sections, the change, its rationale, its effect, the original text quoted with its path and line in `Specification-1.0-frozen/`, and what a reversal to the alternative not taken would need. Each entry names the decision on record that it follows (an entry of POSITIONS, `area-records.md`), or gives its own reason. Read the existing entries for the form.
3. The front matter's one paragraph on the revision, in `Specification/fortress/preamble.tex`. If your change makes it false, correct it.
4. The full reasoning, in a decision record under `explorations/`: each changed passage, the original and the new text, the reason, and the way back. The existing decision records are `explorations/compile-ladder/*/decision-record.md`. Read `rung-spec-route-a/decision-record.md` for the form.

If the revision refuses an example, keep the example in the text, marked "Not allowed", as the specification itself does. The calculi of Appendix A keep their rules and soundness claims. Add a callout that says what a calculus predates.

In your report, quote every sentence of the specification that your change makes false, with its file and line. Such a sentence can be an Appendix I effect, or a note on walk or on the compiled path. Then it can be corrected.

## When the text and an implementation disagree

- If the decisions on record settle it, fix the side that they settle.
- If they do not settle it:
  - Leave the text as it is.
  - Write a ledger row that records the departure.
  - Write a gated `XXX` test that asserts the text's answer on the path that departs (`tests-writing.md`).
  - If the passage has an Appendix I entry, name the row among the departures in that entry, so that the text claims no more than holds.

## Citing it

- In a test, cite by file and section or entry, never by line (`tests-writing.md`). If your change renames or removes a section that a test names, update that citation in the same commit.
- In an Appendix I entry, cite the unrevised copy by path and line.
- Inside the text, use `\secref{label}`.

An edit under `Specification/` cannot move the checker count or the distance, and no suite reads it. So it needs no gate run of its own.
