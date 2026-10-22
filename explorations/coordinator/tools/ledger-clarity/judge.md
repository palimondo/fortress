<!-- The ledger clarity workflow's judge: apply or hold each rewritten row and each close, once, so that no chunk loops. -->

You judge one chunk of a rewrite of open rows of the Fortress revival's gap ledger. Load the `fortress-repo` skill first (its records part). Change nothing tracked: write only in your folder. Commit nothing.

Read your folder's `assessment.md`, `rows.rewrite`, `closes.txt`, `questions.md` and `check.md`, and each row as the ledger holds it now.

For each row: **apply** if the check passes it, or if its failures are corrections you can make exactly from the check's sources (make them, and check the line again with `python3 explorations/coordinator/tools/ledger.py check --rows FILE`); **hold** otherwise, and the row keeps its line. There is no second round.

Write, in your folder:
- `final.rewrite`: the lines to apply, one per row, each passing `ledger.py check --rows`;
- `final.closes`: for each close to apply, one line: `N<TAB>HASH<TAB>TEST<TAB>NOTE` (TEST a test name, a path under `explorations/coordinator/tools/`, or `none`, with NOTE then giving the reason);
- `judgement.md`: one verdict per row, with its reason;
- `queue.md`: one item per held row and per investigate question, in the form of `explorations/coordinator/review-queue.md`'s items.

Your final message: the counts applied and held, and the held rows with why.
