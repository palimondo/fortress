<!-- The record-landing workflow: after a climb batch's post-batch review, bring the record in line with the landing (FACTS, POSITIONS and their histories, the ledger rows the evidence names, PLAN, PLAN-history, the review queue, INDEX and line fixes in other notes) in a worktree of its own, and hand the coordinator one diff; how to launch it, what it writes, and how the coordinator lands its branch. -->

# The record-landing workflow

`record-landing.js` does the record's work after a landing, which the coordinator did by hand through a record writer and a routing worker until climb batch 24. It is the smallest first version of the design `explorations/coordinator/process-engineering/record-landing-workflow.md` (`5384a4f35`), which the curator approved with its eight defaults on 2026-11-02. It runs in five stages, in the pattern of the orientation workflow (`../orientation/orientation.js`):

1. **Sort** (Opus, `sort.md`): `prepare.sh` makes the worktree and its branch and writes the evidence into the run's folder (`evidence.py`'s header lists its six files); the sorter reads it, the review's routing part and the batch record's items, and writes `owed.md`, one line per change with its number, its home, its kind, its weight, its ground and its writer.
2. **Write**: a Sonnet driver runs `drive.sh 1`, which starts two headless Opus writer streams side by side through the worktree's copy of `../record-clarity/writer-stream.sh`: the entries writer (`entries.md`: FACTS, POSITIONS, an entry's history, ledger rows, as `record.apply` and `rows.rewrite`) and the routing writer (`routing.md`: PLAN, PLAN-history, the queue, INDEX, other notes, edited in the worktree). Then `checks.sh 1` writes `mech-1.md`.
3. **Check**: the checker (`check.md`: coverage, fidelity, form and routing) and the clarity cold reader (`../record-clarity/coldread.md`, unchanged) on `clean.txt`, side by side.
4. **Fix**: `drive.sh 2` resumes both streams once with the three reports, then `checks.sh 2` writes `mech-2.md`.
5. **Judge** (Opus, `judge.md`): apply or hold each change once, `final.apply` and `final.rewrite`, `diff.md`, and `final.sh`, which runs every check again and makes two commits on the branch.

The mechanical checks (`checks.sh`): the six record files reset to the worktree's base, the cut-only POSITIONS lines checked with `../record-clarity/words-subset.py --root`, the writers' files applied with `record.py apply` and `../ledger-clarity/apply.py`; then `record.py check --base`, `ledger.py check`, `ledger.py landing-check`, `check-index.sh`, `plan-moves.py` (each line out of PLAN word for word in PLAN-history), `queue-check.py` (the numbers, each new open item's "Needed by", the counts) and `lengths.py`. `drive.sh --dry-run` prints the commands of a round and starts nothing.

Every brief reads the record only through `facts-extract.sh`, `record.py` and `ledger.py` in the worktree, and entries are written only through `record.py`. The run takes three arguments and no text, so a run gives the workflow data, never rules of its own. The briefs change only at the curator's yes.

## Running it

After the post-batch review is committed:

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-landing/record-landing.js',
               args: { batch: 'N', base: 'BASE', landing: 'LANDING' } })

It makes `/home/user/fortress-landing-N` on the branch `record/landing-N` at `main`'s head. A replay adds `at`, the commit to make the worktree at, and its worktree and branch end in `-replay`. The replay of climb batch 24's landing, before the first live run at climb batch 25's:

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-landing/record-landing.js',
               args: { batch: '24', base: 'b0f6cd6b7', landing: '25238e60c', at: '43cd61b62' } })

That one runs in `/home/user/fortress-landing-24-replay` on `record/landing-24-replay`. A killed run resumes with the same script path, `resumeFromRunId` and the same args, byte for byte; each script skips a step whose output exists. During a run the coordinator writes none of the files that the workflow writes; a decision that the curator gives meanwhile is recorded after the landing. The design's estimate for a landing like climb batch 24's: 0.9M to 1.7M tokens written, and about 1 to 1.5 hours.

## What it writes

Everything goes in the worktree; the main tree is not touched. The run's folder, `explorations/compile-ladder/climb-batch-N/record-landing/` in the worktree, holds `run.env`, the evidence, `owed.md`, the writers' files, briefs and reports, `check.md`, `cold-read.md`, `mech-1.md`, `mech-2.md`, `mech-final.md`, `final.apply`, `final.rewrite`, the commit messages and `diff.md`. The branch holds two commits: FACTS, POSITIONS, their histories and the ledger; then PLAN, PLAN-history, the queue, INDEX, the other notes and the run's folder. The workflow's result names the worktree, the branch and `diff.md`.

## Landing its result

The coordinator reads `diff.md`, the judge's final message and `git -C WORKTREE show --stat` of the two commits, not the record. Then, on `main`:

1. `git cherry-pick` the two commits of the branch, in order.
2. `record.py check --base <main before the picks>` and `ledger.py landing-check <the batch's base>`.
3. Push, in the order of the `fortress-repo` skill's committing part.
4. `git worktree remove` the worktree, and delete the branch.

On a conflict, it applies `final.apply` with `record.py apply` on `main`, and cherry-picks the routing commit alone. The landing report names each POSITIONS change with its old and its new words, from `diff.md`, by the curator's rule of 2026-10-31. Each held change: run it again, file it in the queue, or leave it. Each "Needed by" and each kind that the workflow set waits for the coordinator to confirm. "Next" in `diff.md` gives the orientation update's call, run after the landing. The replay lands nothing on `main`: an Opus worker compares its two commits with the hand-made ones (`be3b07aac`, `08cc69e2d`, `b49631cb4`, `85b2998e9`), change by change.
