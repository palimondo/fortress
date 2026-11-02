<!-- The record-landing workflow: after a climb batch's post-batch review, bring the record in line with the landing (FACTS, POSITIONS and their histories, the ledger rows the evidence names, PLAN, PLAN-history, the review queue, INDEX and line fixes in other notes) in a worktree of its own, and hand the coordinator one diff; how to launch it, what it writes, and how the coordinator lands its branch. -->

# The record-landing workflow

`record-landing.js` does the record's work after a landing, which the coordinator did by hand through a record writer and a routing worker until climb batch 24. It is the smallest first version of the design `explorations/coordinator/process-engineering/record-landing-workflow.md` (`5384a4f35`), which the curator approved with its eight defaults on 2026-11-02. It runs in five stages, in the pattern of the orientation workflow (`../orientation/orientation.js`):

1. **Sort** (Opus, `sort.md`): `prepare.sh` makes the worktree and its branch and writes the evidence into the run's folder (`evidence.py`'s header lists its six files; `plan.md` ends with the PLAN lines that look stale, from `plan-moves.py --stale-at`); the sorter reads it, the review's routing part and the batch record's items, and writes `owed.md`, one line per change with its number, its home, its kind, its weight, its ground and its writer, and marks each kind and each "Needed by" that no source states as set by the workflow.
2. **Write**: a Sonnet driver runs `drive.sh 1` in the background and waits for it in steps of 240 s, under the five minutes that its prompt cache lives. `drive.sh` starts two headless Opus writer streams side by side through the worktree's copy of `../record-clarity/writer-stream.sh`: the entries writer (`entries.md`: FACTS, POSITIONS, an entry's history, ledger rows, as `record.apply` and `rows.rewrite`) and the routing writer (`routing.md`: PLAN, PLAN-history, the queue, INDEX, other notes, edited in the worktree). Then `checks.sh 1` writes `mech-1.md`.
3. **Check**: the checker (`check.md`: coverage, fidelity, form and routing) and the clarity cold reader (`../record-clarity/coldread.md`, unchanged, told to write its report in parts of five entries) on `clean.txt`, side by side.
4. **Fix**: `drive.sh 2` resumes both streams once with the three reports, then `checks.sh 2` writes `mech-2.md`.
5. **Judge** (Opus, `judge.md`): apply or hold each change once, `final.apply` and `final.rewrite`, `diff.md` (within 10,000 characters), and `final.sh`, which runs every check again and makes two commits on the branch. The judge writes nothing after the commits.

The mechanical checks (`checks.sh`): the six record files reset to the worktree's base, the cut-only POSITIONS lines checked with `../record-clarity/words-subset.py --root`, the writers' files applied with `record.py apply` and `../ledger-clarity/apply.py`, each history block "by climb batch N landing workflow (Opus)"; then `record.py check --base`, `ledger.py check`, `ledger.py landing-check`, `check-index.sh`, `plan-moves.py`, `queue-check.py` and `lengths.py`.

- `plan-moves.py` fails a line out of PLAN that is not word for word in PLAN-history. Its `LOOK` lines, which never fail, name each PLAN line that still looks stale: a line whose own review-queue item is in (a), a list of items that names a settled one or differs from the queue's list that it names, and a review finding that a commit outside the record names. The checker takes each as a coverage failure, unless `owed.md` or the routing report says why the line stays.
- `queue-check.py` fails a gap in the new numbers, a new open item without "Needed by", a count that its items do not make, and an item new in "Answered by a decision of his" that cites no word of his on that same item, or that names a default taken without him ("at its default", "by the coordinator"). Such an item stays open, landed and then reviewed. The rule leans to keeping an item open: a true answer of his worded with those phrases fails too, and is reworded.
- `lengths.py` informs: each changed entry's length, and each entry already over 600 that grew, which the judge holds unless the owed clause alone explains the growth.

`drive.sh --dry-run` prints the commands of a round and starts nothing. The streams' headless sessions run `facts-extract.sh` and the `git` reads that `writer-stream.sh` allows, and not `record.py`, `ledger.py` or the checks, which need an approval that a headless session cannot get. So `checks.sh` is the first to apply and check the writers' files, after each round, and the fix round reads its output in `mech-1.md`.

Every brief reads the record only through `facts-extract.sh`, `record.py` and `ledger.py` in the worktree, and entries are written only through `record.py`. The run takes three arguments and no text, so a run gives the workflow data, never rules of its own. The briefs change only at the curator's yes.

## Running it

After the post-batch review is committed:

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-landing/record-landing.js',
               args: { batch: 'N', base: 'BASE', landing: 'LANDING' } })

It makes `/home/user/fortress-landing-N` on the branch `record/landing-N` at `main`'s head. A replay adds `at`, the commit to make the worktree at, and its worktree and branch end in `-replay`. The replay of climb batch 24's landing, before the first live run at climb batch 25's:

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-landing/record-landing.js',
               args: { batch: '24', base: 'b0f6cd6b7', landing: '25238e60c', at: '43cd61b62' } })

That one runs in `/home/user/fortress-landing-24-replay` on `record/landing-24-replay`. A killed run resumes with the same script path, `resumeFromRunId` and the same args, byte for byte; each script skips a step whose output exists. During a run the coordinator writes none of the files that the workflow writes; a decision that the curator gives meanwhile is recorded after the landing. The design's estimate for a landing like climb batch 24's was 0.9M to 1.7M tokens written and 1 to 1.5 hours; the replay wrote 2.06M in 65 minutes (`process-engineering/record-landing-replay-24.md`, section 6). With the driver's waits under five minutes and the cold read in parts, a like landing writes about 1.8M, an estimate.

## What it writes

Everything goes in the worktree; the main tree is not touched. The run's folder, `explorations/compile-ladder/climb-batch-N/record-landing/` in the worktree, holds `run.env`, the evidence, `owed.md`, the writers' files, briefs and reports, `check.md`, `cold-read.md`, `mech-1.md`, `mech-2.md`, `mech-final.md`, `final.apply`, `final.rewrite`, the commit messages and `diff.md`, and the logs of the rounds, which git ignores. The markers of finished rounds are in the worktree's `tmp/record-landing/`, which git ignores too, so the worktree is clean after the commits. The branch holds two commits: FACTS, POSITIONS, their histories and the ledger; then PLAN, PLAN-history, the queue, INDEX, the other notes and the run's folder. Each message ends "By the climb batch N landing workflow (Opus).", then the committing part's footer. The workflow's result names the worktree, the branch and `diff.md`; the judge's final message gives the two hashes.

## Landing its result

The coordinator reads `diff.md`, the judge's final message and `git -C WORKTREE show --stat` of the two commits, not the record. Then, on `main`:

1. `git cherry-pick` the two commits of the branch, in order.
2. `record.py check --base <main before the picks>` and `ledger.py landing-check <the batch's base>`.
3. Push, in the order of the `fortress-repo` skill's committing part.
4. `git worktree remove` the worktree, and delete the branch.

On a conflict, it applies `final.apply` with `record.py apply` on `main`, and cherry-picks the routing commit alone. The landing report names each POSITIONS change with its old and its new words, from `diff.md`, by the curator's rule of 2026-10-31. Each held change: run it again, file it in the queue, or leave it. Each "Needed by" and each kind that the workflow set, and each move to (a)'s "Answered by a decision of his", are in `diff.md`'s "For the curator", and wait for the coordinator to confirm. "Next" in `diff.md` gives the orientation update's call, run after the landing. The replay lands nothing on `main`: an Opus worker compares its two commits with the hand-made ones (`be3b07aac`, `08cc69e2d`, `b49631cb4`, `85b2998e9`), change by change.
