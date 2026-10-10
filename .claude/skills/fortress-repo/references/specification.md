# The specification

Three folders hold the team's specification:

- `Specification/` is the team's text, as the revival revises it. It says what the language means, except where a decision of the curator says otherwise.
- `Specification-1.0-frozen/` is the unrevised copy. Cite it as "the Working Draft of February 2011". Only `fortress.1.0.pdf` in it is the 1.0 release. Leave this copy unchanged.
- `Documentation/Specification/` is the team's later restart, which they did not finish. If its Types chapter, `Documentation/Specification/Prose/Language/types.tick`, covers a topic, cite it beside `Specification/` as the designers' later word.

Appendix I, `Specification/appendices/changes.tex`, records the changes to the text. Its revival section has one entry for each change that the revival made.

A draft build prints the team's `\note{}` boxes, and a release build hides them. Many say that a feature was not built, for example "Reduction variables are not yet supported." Before you record a missing feature as a gap, grep the notes of its chapter: `grep -n '\\note{' Specification/<file>.tex`.

The api listings of the library part are generated from the library's `.fsi` files when the specification is built (`Specification/library/apis/`, not in the tree). A listing shows the library itself, so it cannot justify a change of the library. Cite the `.fsi` file.

To weigh the specification against the team's later texts, or to find the designers' reason for a rule, read `exploring.md`, "Weighing the sources".

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

To check your LaTeX, build the specification in a built tree, after the setup lines. It takes about 90 s, so start it detached (`session.md`, "Long commands"):

    nohup bash -c '( cd Specification/fortress && ./ant genSource && ./ant tex ) > tmp/spec.txt 2>&1; echo EXIT=$? >> tmp/spec.txt' >/dev/null 2>&1 &

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
