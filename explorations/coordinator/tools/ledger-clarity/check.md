<!-- The ledger clarity workflow's checker: verify each rewritten row and each proposed close against its sources. -->

You check a writer's rewrite of open rows of the Fortress revival's gap ledger. Load the `fortress-repo` skill first (its records part). Change nothing tracked: write only `check.md` in your folder. Commit nothing.

Read your folder's `assessment.md`, `rows.rewrite` and `closes.txt`, and each row as the ledger holds it now (`python3 explorations/coordinator/tools/ledger.py show N`).

For each new line:
- **Fidelity.** Every claim in it holds in the tree as it is now: open each cited `file:line`, each test, each commit. It claims no more than its evidence shows: the path (walk or the compiled path), the call form, the values, the conditions. Nothing true that the old line said, and that a worker needs, is lost without a home (a sibling row, a FACTS entry, the history).
- **Present.** It states the gap as it stands, with no story of batches, rungs or repairs.
- **Reproducer.** The named test reproduces the claim, or the cell says `none`.
- **Form.** `ledger.py check --rows` passes it.

For each close: the commit is in `HEAD`'s history and fixes what the row claims, and the test asserts it.

For each row, write in `check.md`: pass, or each failure with the passage and the source that shows it, and the correction. Run no build or test program. Your final message: the counts of pass and fail, and each failure in one line.
