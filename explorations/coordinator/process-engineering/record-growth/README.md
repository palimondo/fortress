<!-- How the gap ledger, FACTS, POSITIONS and INDEX grew commit by commit from 2026-08-19 to 2026-10-09 (main at c8258deda): the scripts, the data as CSV, one chart with each climb batch's landing marked, and what the chart shows, with the ledger's rewrite of 10-08; the earlier measure of 2026-10-02 extended to today and the ledger added. -->

# How the record grew, commit by commit

Four files are measured at every commit of `main`, from the first commit under `explorations/` (`446836590`, 2026-08-19) to `c8258deda` (2026-10-09):

- the gap ledger, `explorations/fortress-gap-ledger.md`: characters and rows;
- `explorations/coordinator/FACTS.md`, `POSITIONS.md` and `INDEX.md`: characters.

A row of the ledger is a table line that starts `| N |` above the heading `## Revival worklist`. Characters are Unicode code points. Bytes are in the CSV beside them.

## What the chart shows

`record-growth.png`, three panels on one time axis, a vertical line at each batch's landing:

- The ledger went from 83 rows (39.6K characters, 09-09) to 638 rows (1.25M) by batch 10 on 10-03. Its first 309 rows (326K) came before the first climb; to batch 10 the 20 landings, with their run windows, added 16 rows and 46K characters each on average.
- On 10-08 the ledger was rewritten (`ae4f8e38a`, 14:06 UTC). The 638 rows kept their numbers, stand in fifteen topic sections and are cut to 1,200 characters at most. The file fell from 1,246,580 to 540,693 characters in that one commit (-706K, 57%), and the mean row from 1,863 to 832 characters (365 rows had been over 1,200; the longest was 12,075). The earlier text of every changed row, and the ledger's other text (legend, worklist, counts), moved to `explorations/fortress-gap-ledger-history.md`: 1,274,987 characters in that commit, 1,328,414 now. The chart measures the ledger file, as before, so the text in the history file is not on it.
- So "rows almost never shrink" held to 10-03 (after entry they gained 308K characters and lost 0.8K, `../gap-ledger-archaeology.md` section 1.1) and holds no longer. Since the rewrite, the commit that closes the rows a batch fixed shortens them (status FIXED) and moves their earlier lines to the history file: -7.3K, -6.7K and -2.4K for batches 11, 12 and 13 (the history file gained 18K, 15K and 7K).
- Batches 11, 12 and 13 landed on 10-09 (04:05, 14:39 and 23:03 UTC), after 5.5 days with no batch (10-03 10:58 to 10-08 23:42). From batch 10's landing to batch 13's the ledger gained 55 rows and 56K characters (the growth of its commits, not the cuts of the closes), 18 rows and 19K for each landing, against 16 rows and 46K to batch 10. It is 694 rows and 581K characters now, a mean of 824 characters a row.
- From the ladder climb's start (09-17 06:01) to batch 13's landing (10-09 23:03), the batch run windows are 28% of the clock (151 of 545 hours) and hold 89% of the characters the ledger gained (868K of 978K) and 93% of its new rows (356 of 384). They hold 17% of INDEX's growth and 19% of POSITIONS'. To batch 10's landing (10-03 10:58) the shares were 35% of the clock (135 of 389 hours), 88%, 92%, 22% and 26%. The clock's share fell because no batch ran from 10-03 to 10-08; INDEX's and POSITIONS' shares fell because most of their growth since 10-03 came outside the windows; the ledger's shares hold.
- FACTS grew to 352K at batch 7b (09-30), then lost 92K in one commit on 10-02 (the rung entries cut to the fact), after a 55K rewrite on 09-20 and 44K on 09-30. It is 294K now: 250K on the morning of 10-08, 257K when batch 11 started, 294K at batch 13's landing. The two commits "FACTS consolidated before climb batch 12 and 13" changed it by +2.2K and +0.2K. POSITIONS peaked at 105K (09-29), lost 34K in the rewrite of 09-30, and is 94K now. INDEX never lost more than 324 characters in a commit: 14K on 09-17, 175K now, a line for each note.
- From 10-03 11:36 to batch 11's start (10-08 23:42) the ledger gained 2 rows, and FACTS, POSITIONS and INDEX gained 12K, 17K and 26K: commits about process, skills and the record, and batch 11's preparation. From batch 11's start to batch 13's landing they gained 37K, 5K and 13K.

## Files

Scripts, run from the repository root:

- `measure.py`: reads the four files at every first-parent commit with `git cat-file`, writes `series.csv`, `changes.csv`, `by-day.csv`, `top-additions.csv` and `per-batch.csv`. About 6 seconds. Needs `git` and Python 3.
- `classify.py`: who made a commit (coordinator, a worker, a batch's gather, a consolidation), by subject, paths and time, for `measure.py`.
- `chart.py`: draws `record-growth.png` from `series.csv` and `landings.csv`. Needs `matplotlib`.

Regenerate: `python3 explorations/coordinator/process-engineering/record-growth/measure.py`, then `python3 explorations/coordinator/process-engineering/record-growth/chart.py`.

Data (input, kept by hand):

- `landings.csv`: the 23 batches, the run's start (UTC), the landing commit and the code commits the landing records. The landing commit is the one that records the landed hashes and the gate summary (the repair batch: the commit that names the two hashes; batch 1: the gate summary; the ladder climb: its record and re-run). From batch 11 on the two are in separate commits: the rungs' hashes are in the batch's "Close the rows ... fixed" commit and its gather record (`climb-batch-N/RECORD.md`, first table), and the gate summary, with the gate's tables, in the commit "Record the gate's tables and the microGPT walk check", 30 to 45 minutes later. The landing is the later one (`f9d3ec826`, `32b88cd3b`, `738904f9a`), the commit after which the coordinator's boot note says the batch landed; the commits between (the fold of the review's corrections) are inside the window. Landing time is read from git. A run's start is to the minute: batch 11's is from its first agent's files (23:42:10) and the boot note that says it runs; batches 12 and 13's (10:04, 16:40) are from the curator's brief and agree with the files and the boot notes. The journal's `launched` line carries no time.
- `labels-2026-10-02.csv`: the class of each commit as the earlier worker labelled it on 2026-10-02 (regexes and hand corrections), kept as data.

Data (output of `measure.py`):

- `series.csv`: one row for each of the 1,904 first-parent commits: time, commit, the ledger's rows and characters, the characters and bytes of the four files, the batch whose landing it is.
- `changes.csv`: one row for each commit and file that changed the file (901 rows). Size, change in characters and bytes, class, batch, how many entries it added or lengthened and the three largest. A merge keeps its net change; the four side-branch commits it brought in have kind `branch_commit`.
- `by-day.csv`: characters added and removed for each file, UTC day and class.
- `top-additions.csv`: the ten largest single-commit additions of each file.
- `per-batch.csv`: the four sizes at each landing, and the change since the previous landing.

The earlier measure, carried over because the new chart does not hold it:

- `boot-size.csv`, `boot-size.png` and `boot-size-chart.py`: the size of the coordinator's boot (K tokens) at nine compactions, 09-19 to 09-30, from the session transcripts, with the sizes of FACTS, POSITIONS and INDEX then. Not extended: the transcripts are not in the repository.

## Method and limits

- The line is `git log --first-parent` of `main`. A merge's net change is one step. The ledger's first commits were made on side branches, so on the line it first appears at 09-09 00:30 with 83 rows.
- Landing marks are the 23 commits of `landings.csv`. A batch's run window is its start to its landing. Starts are to the minute, so a commit in the launch minute but before the launch counts inside the window (`12ce5b201`, 20 seconds before batch 13's launch: +1.7K of INDEX; without it INDEX's share of the windows is 16%, not 17%).
- The share of the ledger's characters in the windows counts the characters it gained: the sum of the commits' positive steps. To batch 10 that equals its net change (88.4% either way). After the rewrite the net change says nothing of the batches, so only this sum is used. For INDEX and POSITIONS the shares are of the net change, as before.
- A class after 10-02 comes from `classify.py`'s regexes with no hand check, so it can be wrong. Sizes and rows are exact.
- `classify.py` was extended for batches 11 to 13 in two places, and nowhere else. Their commits of the same kind as the earlier batches' were labelled otherwise: (1) the gather's "Close the rows climb batch N fixed" was "probe/judgement worker (during a batch)" and is now "batch rung/gather worker", as the gather's other commits are (new pattern `GATHER`); (2) the INDEX lines of a batch's review ("INDEX: batch 11's review", "INDEX: the review of climb batch 13", "INDEX: batches 12 and 13's records and reviews") were "coordinator record keeping" and are now "batch prep/post-batch routing (coordinator)", as "INDEX: batch 7R's record and its review" is (`PREP` takes `review` after `batch N's`, and two phrases). The rung commits, "Fold the review's corrections" and the landings were labelled as before without a change; the landing is also forced from `landings.csv`. The two extended patterns also moved two older commits to "batch prep/post-batch routing": `0cf66dbdb` (10-03, "Climb batch 10's review routed") and `8caa42acd` (10-02, a restore of check files that also adds batch 8's review line to INDEX, which is a doubtful label).
- The ledger rewrite and the closes move text to `explorations/fortress-gap-ledger-history.md`, which is not measured: the ledger file is, so the chart's fall of 10-08 is text that moved, not text that was lost.
- The ledger's eras (A to E, rows by date, mean lengths) are in `../gap-ledger-archaeology.md`, sections 1.1 and 2.4. The row counts here agree with its eras: 309, 352, 454, 557 and 638 rows at the end of each. Its lengths are those of the text of 10-03, before the rewrite.
- The chart's colours are slots 1 to 3 of the dataviz skill's reference palette (blue, orange, aqua), validated all-pairs in light mode; the ledger is neutral ink. The aqua line is direct-labelled, as its contrast needs.
