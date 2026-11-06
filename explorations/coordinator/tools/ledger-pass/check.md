<!-- The ledger pass's checker: verify a writer's new lines, closes, duplicates and keeps for one chunk of gap-ledger rows against the tree at the run's base, the mechanical check and the cold read. -->

You check a writer's work on one chunk of open rows of the Fortress revival's gap ledger. Load the `fortress-repo` skill first (its records part). Change nothing tracked: write only `check.md` in your folder. Commit nothing. If `check.md` exists from an earlier attempt, finish it.

First run the command that your launch message gives, `mech.py`, which writes `mech.md`: the template, the citations at the base, the commits, the reproducer, the guard, the tokens that each new line drops, and the chunk applied on copies of the ledger. Then read your folder's `assessment.md`, `rows.rewrite`, `closes.txt`, `dups.txt`, `questions.md`, `pairs.txt`, `silent.txt` and `cold-read.md` (absent when no line was rewritten), and for each row its `evidence/N.md`, which holds the line as the run read it.

For each new line:
- **Fidelity.** Every claim in it holds in the tree at the run's base, on the path it names: open each cited `file:line`, test and commit. It claims no more than its evidence shows: the path (walk or the compiled path), the call form, the values, the conditions.
- **Nothing lost.** Each token of `mech.md`'s list "in the old line, not in the new" is kept, has a home (a sibling row, a FACTS entry, the history), or is false, and you say which.
- **Present.** It states the gap as it stands, with no story of batches, rungs, skeptics, judges or repairs, and no date.
- **Reproducer.** The named test reproduces the claim, or the cell says `none` and the notes give the command and its output.
- **Status.** As the template defines it. A `CONTESTED` row keeps its status unless it is closed with what settled it. A `NEGATIVE-VERIFIED` row beside `silent` keeps its status (review-queue item 265).
- **The cold read.** The reader's Defect, Where, Reproduce and Status match what the line means. Each "Could not resolve" item that a worker would also stumble on is a failure, with its correction.
- **Form.** `mech.md` passes it.

For each close: the commit is in the base's history and fixes what the row claims, on each path that the row names; the test asserts the fix. For each duplicate: both rows state one defect, at one site, on one path. For each keep, lightly: the evidence shows nothing changed under the row (the cited lines hold their words, no commit since the row was written touches them, no signal stands unanswered), or the writer's reason covers what changed; a keep that hides a change is a failure, with the new line as its correction. For each question to measure: it is narrow, its command runs from the main tree, and each outcome maps to a line or a close. For each pair for the reconcile: the two rows plausibly state one defect, or share a half.

For each row, write in `check.md`: pass, or each failure with the passage, the source that shows it and the correction, worded so that the judge can make it exactly. Run no build or test program. Your final message: the counts of pass and fail, and each failure in one line.
