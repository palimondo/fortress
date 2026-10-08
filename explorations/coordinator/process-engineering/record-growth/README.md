<!-- How the gap ledger, FACTS, POSITIONS and INDEX grew commit by commit from 2026-08-19 to 2026-10-08 (main at bb54e2113): the scripts, the data as CSV, one chart with each climb batch's landing marked, and what the chart shows; the earlier measure of 2026-10-02 extended to today and the ledger added. -->

# How the record grew, commit by commit

Four files are measured at every commit of `main`, from the first commit under `explorations/` (`446836590`, 2026-08-19) to `bb54e2113` (2026-10-08):

- the gap ledger, `explorations/fortress-gap-ledger.md`: characters and rows;
- `explorations/coordinator/FACTS.md`, `POSITIONS.md` and `INDEX.md`: characters.

A row of the ledger is a table line that starts `| N |` above the heading `## Revival worklist`. Characters are Unicode code points. Bytes are in the CSV beside them.

## What the chart shows

`record-growth.png`, three panels on one time axis, a vertical line at each batch's landing:

- The ledger went from 83 rows (39.6K characters, 09-09) to 638 rows (1.25M) by batch 10 on 10-03, and has not changed since. Its first 309 rows (326K) came before the first climb; the 20 landings, with their run windows, added 16 rows and 46K characters each on average.
- From the ladder climb's start (09-17 06:01) to batch 10's landing (10-03 10:58), the batch run windows are 35% of the clock (135 of 389 hours) and hold 88% of the ledger's characters and 92% of its rows. They hold 22% of INDEX's growth and 26% of POSITIONS'.
- FACTS grew to 352K at batch 7b (09-30), then lost 92K in one commit on 10-02 (the rung entries cut to the fact), after a 55K rewrite on 09-20 and 44K on 09-30. It is 249K now. POSITIONS peaked at 105K (09-29), lost 34K in the rewrite of 09-30, and is 81K now.
- INDEX never lost more than 324 characters in a commit: 14K on 09-17, 142K now, a line for each note.
- After 10-03 the ledger stands still, and the three others gained 4K (FACTS), 11K (POSITIONS) and 8K (INDEX): commits about process, skills and the record, none about a batch.

## Files

Scripts, run from the repository root:

- `measure.py`: reads the four files at every first-parent commit with `git cat-file`, writes `series.csv`, `changes.csv`, `by-day.csv`, `top-additions.csv` and `per-batch.csv`. About 6 seconds. Needs `git` and Python 3.
- `classify.py`: who made a commit (coordinator, a worker, a batch's gather, a consolidation), by subject, paths and time, for `measure.py`.
- `chart.py`: draws `record-growth.png` from `series.csv` and `landings.csv`. Needs `matplotlib`.

Regenerate: `python3 explorations/coordinator/process-engineering/record-growth/measure.py`, then `python3 explorations/coordinator/process-engineering/record-growth/chart.py`.

Data (input, kept by hand):

- `landings.csv`: the 20 batches, the run's start (UTC), the landing commit and the code commits the landing records. The landing commit is the one that records the landed hashes and the gate summary (the repair batch: the commit that names the two hashes; batch 1: the gate summary; the ladder climb: its record and re-run). Landing time is read from git.
- `labels-2026-10-02.csv`: the class of each commit as the earlier worker labelled it on 2026-10-02 (regexes and hand corrections), kept as data.

Data (output of `measure.py`):

- `series.csv`: one row for each of the 1,611 first-parent commits: time, commit, the ledger's rows and characters, the characters and bytes of the four files, the batch whose landing it is.
- `changes.csv`: one row for each commit and file that changed the file (779 rows). Size, change in characters and bytes, class, batch, how many entries it added or lengthened and the three largest. A merge keeps its net change; the four side-branch commits it brought in have kind `branch_commit`.
- `by-day.csv`: characters added and removed for each file, UTC day and class.
- `top-additions.csv`: the ten largest single-commit additions of each file.
- `per-batch.csv`: the four sizes at each landing, and the change since the previous landing.

The earlier measure, carried over because the new chart does not hold it:

- `boot-size.csv`, `boot-size.png` and `boot-size-chart.py`: the size of the coordinator's boot (K tokens) at nine compactions, 09-19 to 09-30, from the session transcripts, with the sizes of FACTS, POSITIONS and INDEX then. Not extended: the transcripts are not in the repository.

## Method and limits

- The line is `git log --first-parent` of `main`. A merge's net change is one step. The ledger's first commits were made on side branches, so on the line it first appears at 09-09 00:30 with 83 rows.
- Landing marks are the 20 commits of `landings.csv`. A batch's run window is its start to its landing.
- A class after 10-02 comes from `classify.py`'s regexes with no hand check, so it can be wrong. Sizes and rows are exact.
- The ledger's eras (A to E, rows by date, mean lengths) are in `../gap-ledger-archaeology.md`, sections 1.1 and 2.4. The row counts here agree with its eras: 309, 352, 454, 557 and 638 rows at the end of each.
- The chart's colours are slots 1 to 3 of the dataviz skill's reference palette (blue, orange, aqua), validated all-pairs in light mode; the ledger is neutral ink. The aqua line is direct-labelled, as its contrast needs.
