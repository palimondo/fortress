<!-- The three additions to the clarity workflow that let it correct a review's findings on POSITIONS, written as exact edits to its README and briefs, ready to apply and applied on 10-28 at his yes of 20:42 UTC, commit 9a37e8401, by an Opus worker on 2026-10-28. -->

# The three additions to the clarity workflow, as exact edits

Not applied. Each file is under `explorations/coordinator/tools/record-clarity/`. Each quoted anchor occurs once in its file.

No change to `record-clarity.js`. A chunk's folder is `out` + its name, which the script already gives every agent, and its `mkdir -p` keeps a folder that exists. `coldread.md` and `fix.md` need nothing: the fix round follows `writer.md`.

## 1. The findings input

**The file.** `findings.md` in each chunk's folder, put there before the run. It holds the findings list's opening note on its sources, so that "tenet N" and "§N" resolve. Then, for each entry of the chunk that has a finding, its block, word for word: the entry's number and subject, then each finding with "At issue", "Reports", "Plain", "Ground" and "Elsewhere" (the form of `explorations/reviews/foundations/evidence/salvage-findings.md`). An entry with no finding has no block. A script cuts the blocks; nobody rewrites them.

**1a. `README.md`**, after the sentence "`from: 'judge'` runs only the judge, on chunks written before the judge existed.", a new paragraph:

> To correct what a review found, put `findings.md` in each chunk's folder before the run: one block per entry, each finding with the sentence at issue, the right reading and its ground.

**1b. `writer.md`**, "Read first", after the sentence "Read the report section each entry cites before you change a claim.", a new sub-bullet at the same indent as "facts":

>   - findings: if your folder holds `findings.md`, a review found faults in some of your entries, each with its ground. Correct each sentence that a finding names from its ground, opened at its source: there, and only there, the meaning changes. Change nothing that no finding names, and let an entry grow only by what its corrections need. Where a finding's only ground is a reviewer's reasoning, or it needs the curator's word, keep the text and write a question for the curator.

**1c. `judge.md`**, replace "and for FACTS `assessment.md`." with:

> for FACTS `assessment.md`, and, when a review's findings are corrected, `findings.md`, whose grounds are sources.

## 2. The writer's clause at step 3

**`writer.md`**, step 3, replace "For a position, the reason after "Why:", only if the curator gave one or accepted it in the question." with:

> For a position, the reason after "Why:", only if the curator gave one or accepted it in the question, or a finding in `findings.md` gives it with its ground in the team's texts, library or code.

## 3. The checker's clause for POSITIONS

**`check.md`**, "The sources", the positions bullet, after the sentence "`explorations/coordinator/curator-profile/show.py TIME` prints any message of his.", in the same bullet:

> If your folder holds `findings.md`, each finding's ground is also a source: open it at its line, or with `git show -s` for a commit. A change that its finding's ground holds is no fidelity failure. A change that no finding names is one, and so is a changed decision, growth beyond what the corrections need, or a sentence that tells how the decision came about.
