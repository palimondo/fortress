# The specification

Three folders hold the team's specification:

- `Specification/` is the team's text, as the revival revises it. It says what the language means, except where a decision of the curator says otherwise.
- `Specification-1.0-frozen/` is the unrevised copy. Cite it as "the Working Draft of February 2011". Only `fortress.1.0.pdf` in it is the 1.0 release. Leave this copy unchanged.
- `Documentation/Specification/` is the team's later restart, which they did not finish. If its Types chapter, `Documentation/Specification/Prose/Language/types.tick`, covers a topic, cite it beside `Specification/` as the designers' later word.

Appendix I, `Specification/appendices/changes.tex`, records the changes to the text. Its revival section has one entry for each change that the revival made.

A draft build prints the team's `\note{}` boxes, and a release build hides them. Many say that a feature was not built, for example "Reduction variables are not yet supported." Before you record a missing feature as a gap, grep the notes of its chapter: `grep -n '\\note{' Specification/<file>.tex`.

The api listings of the library part are generated from the library's `.fsi` files when the specification is built (`Specification/library/apis/`, not in the tree). A listing shows the library itself, so it cannot justify a change of the library. Cite the `.fsi` file.

## Weighing the sources

The type group is the part of the team that built the type checker and the compiler, from 2010 to 2012. Where their late positions disagree with the specification's earlier text, the curator gives the late positions more weight. These positions are:

- the exclusion rule;
- compiled code specialised to each instantiation of a generic, which they kept;
- the compiled number tower, which they flattened in 2011;
- the 2012 write-up on the Return Type Rule (`Papers/Types/journal/`);
- the POPL 2019 paper on symmetric multiple dispatch (`research/extracts/ParkPOPL2019-extract.md`).

When your report describes the team's sources on a question (`exploring.md`), say which of them is one of these positions.

If a conflict or a decision not taken needs the designers' reason for a rule, print the row of its design area. WORD is a word of the area, such as `coercion`, `juxtaposition`, `dispatch` or `Arrays`. A word can match several rows, each about 1 to 2 KB.

    explorations/coordinator/tools/facts-extract.sh 'map:design-intent-sources.md#The map, by design area@WORD'

Then open the sources that the row names. Among them are the `\note{}` boxes and the team's written rationale in the Internal Document appendix: `Specification/appendices/FAQ.tex` and `future.tex`.

## Changing the text: the revision form

Every change of the text has the four parts below, so that no disagreement between the text and an implementation stays hidden.

1. An entry in the revival section of Appendix I: a `\subsection` with a `\seclabel`. The entry gives:
   - the affected sections, the change, its rationale and its effect. The effect names each departure: each way in which walk or the compiled path does not do what the new text says, with its ledger row.
   - the original text, quoted with its path and line in `Specification-1.0-frozen/`;
   - what a reversal to the alternative not taken would need;
   - the decision of the curator that it follows (its POSITIONS entry), or the reason that your brief gives.

   For the form, print one entry, about 2 KB: `explorations/coordinator/tools/facts-extract.sh 'doc:Specification/appendices/changes.tex#choice of a coercion'`.

2. At each changed passage, a callout that prints in every build, unlike a `\note`:

       \revision{<label>}{<what changed, in a sentence or two>}

   `<label>` is the `\seclabel` of the entry. `Specification/fortress/fortress.tex` defines `\revision`.

3. The front matter's one paragraph on the revision, in `Specification/fortress/preamble.tex`. If your change makes it false, correct it.

4. The full reasoning, in `decision-record.md` in the folder of your work under `explorations/`: each changed passage, the original and the new text, the reason, and the way back. For the form, print one passage of an earlier record, about 4 KB: `explorations/coordinator/tools/facts-extract.sh 'doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.3'`.

If the revision refuses an example, keep the example in the text, marked "Not allowed", as the specification itself does. If your change contradicts a calculus of Appendix A, keep the calculus's rules and soundness claims. Add a callout to it that says what it predates.

Check each changed sentence of `Specification/` or `Documentation/` against the curator's decisions. If it says what walk or the compiled path does, run a program that shows it.

## Building it

To check your LaTeX, build the specification in a built tree, after the setup lines: `cd Specification/fortress && ./ant genSource && ./ant tex`. It takes about 90 s, so run it with `run_bg` (`session.md`).

- Both commands must end in `BUILD SUCCESSFUL`, and `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log` must print 0.
- If `pdflatex` is missing, install the packages of the `PKGS` line of `explorations/experiment/setup.sh` with `apt-get update -qq && apt-get install -y`.
- The build writes only ignored files, its log among them, which can reach 400 MB. Remove them afterwards: `git clean -fXq -- Specification`.
- Update `Specification/fortress.pdf` only if your brief asks for it: copy `Specification/fortress/fortress.pdf` over it.

## When the text and an implementation disagree

- If a decision of the curator says which side is correct, the other side is wrong. If the wrong side is in your area, change it to agree. If not, record the departure as `tests-writing.md`, "How a defect is recorded", says.
- If no decision says so, the disagreement is a conflict. Switch to exploring (`exploring.md`).
- If the passage has an Appendix I entry, name the departure or the conflict in the entry's effect, with its ledger row. Then the text claims no more than holds.

## Citing it

- If your change renames or removes a section that a test names, update that citation in the same commit.
- Inside the text, cite a section with `\secref{label}`.
