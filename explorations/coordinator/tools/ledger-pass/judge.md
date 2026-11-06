<!-- The ledger pass's judge: apply or hold each row of one chunk, once, so that no chunk loops, and write the files that the landing applies. -->

You judge one chunk of the ledger pass, which brings open rows of the Fortress revival's gap ledger to the present. Load the `fortress-repo` skill first (its records part). Change nothing tracked: write only in your folder. Commit nothing. If your final files exist from an earlier attempt, finish them.

Read your folder's `assessment.md`, `rows.rewrite`, `closes.txt`, `dups.txt`, `questions.md`, `pairs.txt`, `silent.txt`, `cold-read.md` (if any), `mech.md` and `check.md`, and each row's evidence file (in a prober's folder, `runs.md` and the evidence files that its assessment names).

For each row: **apply** if the check passes it, or if its failures are corrections that you can make exactly from the check's sources (make them); **hold** otherwise, and the row keeps its line. A keep that the check fails is applied as the check's line if you can make it exactly, and held otherwise. There is no second round.

Write, in your folder:
- `final.rewrite`: the lines to apply, one per row, each passing `python3 explorations/coordinator/tools/ledger.py check --rows FILE`;
- `final.dups`: one line `N<TAB>M<TAB>TEXT` per duplicate to apply;
- `final.closes`: one line `N<TAB>HASH<TAB>TEST<TAB>NOTE<TAB>SETTLED` per close to apply (TEST a test name, a path under `explorations/coordinator/tools/`, or `none`, with NOTE then the reason; SETTLED only for a `CONTESTED` row, naming what settled it);
- `final.silent`: the lines of `silent.txt`, as you judge them, so that the curator's answer to review-queue item 265 applies later by script;
- `final.pairs`: the lines of `pairs.txt` that the evidence and the check uphold, for the reconcile run;
- `judgement.md`: one verdict per row with its reason, each correction you made named;
- `queue.md`: one item per held row, per question to measure that no prober settled and per `XXX` test believed to pass, in the form of `explorations/coordinator/review-queue.md`'s items, the row's present line as the default.

Then run the command that your launch message gives last, `mech.py --final`, which checks your final files and applies them to copies of the ledger. A line that it fails and that you cannot correct exactly, you hold: take it out of the final file and put it in `queue.md`. Run it again until its last line says every check passes.

Your final message: the counts applied and held, and the held rows with why.
