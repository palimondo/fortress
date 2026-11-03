<!-- PLAN's consolidation of 2026-11-03, the run: its order, each step's command, and the estimate in tokens written. The tools beside it: plan-consolidate.py (the mechanical step and the checks), the briefs of the reader, the four chunks, the checker, the fix round and the edges. Written on 2026-11-03, before the run, from the inventory process-engineering/plan-consolidation-2026-11-03/inventory.md (0c2855796), section 4, with its 15 choices taken as it recommends, but for choice 12: line 21 moves to PLAN-history and nothing is asked. -->

# PLAN's consolidation of 2026-11-03: the run

## What the run does

PLAN's third consolidation follows the method of the consolidations of 2026-10-15 and 2026-10-30 (PLAN's header comment; `process-engineering/plan-map.md`; the commits `ad56edb62` and `19cc0223f`). A closed item moves word for word to PLAN-history, under the heading it stood under. An open item whose text stands in another home is cut to one line with a pointer. An open item with no other home stays. The inventory gives each of PLAN's 504 lines from line 15 to line 702 a verdict and a mark, by its line number at `8ab0dcd48`.

The run has a mechanical part and a writing part:

- `plan-consolidate.py` does the mechanical part, with no tokens. It deletes the 40 closed and duplicate lines (marks M and D) from PLAN, and copies them word for word to PLAN-history, under "## Moved at the consolidation of 2026-11-03", each under a "### " heading for the PLAN heading that it stood under. It copies there too every line that a writer rewrites: the 50 cut lines (H), the 15 split lines (X) and the 13 lines that stay with one edit (E: the stale citations and clauses of the inventory's section 4 and choice 11, lines 45 to 47 by choice 3, and the header comment). It marks each of them in PLAN for its writer. It replaces the five bullets of "Where we stand" by the four of the inventory's section 5, and marks the "Next" bullet. Its header lists its modes: `dry-run`, `apply`, `fill`, `check` and `pointers`.
- The writers write each new line into a file of their own, `@N` and then the line. `plan-consolidate.py fill` puts the lines into PLAN. So the two writer streams never edit one file at the same time, and a fix round is filled again from the mechanical commit.

The decided choices that shape the run: choice 6 drops one line of each duplicate pair (the chunk briefs name them: lines 55, 234, 429, 440, 527 and 565); choice 7 leaves the 49 entries with no home for the review queue's cleanup; choice 10 sends the ten "Not classified" lines that the inventory did not check to one reader first; choice 12 moves line 21 and asks nothing. Nothing in the run asks the curator anything.

## The order and the commands

Every command runs in the worktree, from its root. Set these first in each call:

    cd /home/user/fortress-plan-3
    T=explorations/coordinator/tools; P=$T/plan-consolidate; S="python3 $P/plan-consolidate.py"
    W=$T/record-clarity/writer-stream.sh; O=tmp/plan-consolidate
    . $O/run.env    # AT and ADD, from step 1 and step 2

Run each writer task, and each fill with its checks, in the background with a log under `$O`, and poll the log (the `fortress-repo` skill, `references/session.md`). A writer task takes from a few minutes to half an hour.

0. **The go.** The run starts after the closing docket's page, by his order of 07:1x UTC on 2026-11-03 (`BOOT.md`, "Next", item 0), unless he has said stop.

1. **The worktree**, at `main`'s head, on a branch of its own:

        git -C /home/user/fortress worktree add -b record/plan-consolidation-3 /home/user/fortress-plan-3 main
        cd /home/user/fortress-plan-3 && mkdir -p tmp/plan-consolidate
        echo "AT=$(git rev-parse --short=9 HEAD)" > tmp/plan-consolidate/run.env

2. **The reader** of the ten "Not classified" lines (choice 10 (b)), one fresh stream:

        $W plan-reader "$(cat $P/brief-reader.md)" > $O/reader.log 2>&1

   Its verdicts are in `$O/reader.md`; its last line is `ADD M:685,690` or `ADD none`. Read the verdicts. Then write the closed lines into `run.env`, as `ADD="--add M:685,690"`, or `ADD=""`.

3. **The mechanical step**, then its checks, then commit 1 on the branch:

        $S dry-run --root . $ADD > $O/dry-run.txt; tail -50 $O/dry-run.txt
        $S apply --root . --base $AT $ADD
        $S check --root . --base $AT $ADD
        python3 $T/record-landing/plan-moves.py --root . --base $AT
        python3 $T/record-landing/queue-check.py --root . --base $AT
        bash explorations/coordinator/check-index.sh
        git add -- explorations/coordinator/PLAN.md explorations/coordinator/PLAN-history.md &&
          git commit -m "PLAN's third consolidation, the mechanical step: ..." -- explorations/coordinator/PLAN.md explorations/coordinator/PLAN-history.md

   The dry run lists every line with its mark and its place, and compares the characters copied with the inventory's table, section by section: every section should match (77,884 characters in all). A line that it cannot act on is a `CANNOT` line, and `apply` then writes nothing. The commit message says what moved, by kind and count, as `19cc0223f`'s did, and ends with the footer of the `fortress-repo` skill's committing part.

4. **The writers**, two streams side by side, two rounds. Round 1, chunks A and C:

        $W plan-1 "$(cat $P/brief-common.md $P/brief-A.md)" > $O/stream-A.log 2>&1 &
        $W plan-2 "$(cat $P/brief-common.md $P/brief-C.md)" > $O/stream-C.log 2>&1 &
        wait

   Then step 5. Round 2, chunks B and D, each stream resumed:

        $W plan-1 "$(cat $P/brief-B.md)" > $O/stream-B.log 2>&1 &
        $W plan-2 "$(cat $P/brief-D.md)" > $O/stream-D.log 2>&1 &
        wait

   Each log ends with the session's line: new or resumed, and the tokens written. If a stream started fresh in round 2 (its last task more than 50 minutes before), send `brief-common.md` before its chunk brief.

5. **The fill and its checks**, after each round. The fill starts from PLAN as commit 1 holds it, and fills every chunk file written so far:

        git checkout HEAD -- explorations/coordinator/PLAN.md
        $S fill --root . $(for f in $O/chunk-?.lines; do printf -- '--lines %s ' $f; done)
        $S check --root . --base $AT $ADD
        $S pointers --root . --base $AT
        python3 $T/record-landing/plan-moves.py --root . --base $AT
        diff <(git show $AT:explorations/coordinator/PLAN.md | grep '^#') <(grep '^#' explorations/coordinator/PLAN.md)

   Keep the output of round 2's run in `$O/checks-fill.txt`, for the checker. The last command checks that PLAN's headings are unchanged: the batch script reads them (`PLAN_SECTIONS`, `climb-batch-workflow.js:1158`; "Climb batch 24, listed for his review" in two briefings, `:511` and `:537`), and the boot reads "Where we stand". `fill` fails an `@N` with no marked line, and writes nothing then. `pointers` fails a number that does not exist and a queue "Home:" clause that lost its line; until step 8, it fails the clauses that step 8 repoints. A `LOOK` line is for the checker.

6. **The checker**, one fresh stream, over the four chunks:

        $W plan-check "$(cat $P/brief-checker.md)" > $O/checker.log 2>&1

   Its report is `$O/check.md`, by chunk, must fix and may fix.

7. **The fix round**, each stream resumed once, on its two chunks' findings; then step 5 again, into `$O/checks-fill.txt`:

        $W plan-1 "$(sed 's/\bX\b/A/g; s/\bY\b/B/g' $P/brief-fix.md)" > $O/fix-1.log 2>&1 &
        $W plan-2 "$(sed 's/\bX\b/C/g; s/\bY\b/D/g' $P/brief-fix.md)" > $O/fix-2.log 2>&1 &
        wait

   If a stream starts fresh here, send `brief-common.md` and its two chunk briefs before the fix brief.

8. **The edges.** First the mechanical part: line 173's move, the repointing that the script can do, and the checks that the writer reads:

        $S apply --root . --base $AT --only 173 --add M:173
        $S pointers --root . --base $AT --write
        { $S check --root . --base $AT $ADD --add M:173; $S pointers --root . --base $AT; } > $O/checks-edges.txt 2>&1

   Then the writer's part, stream 1 resumed (header comment, "Next", the history's paragraph, the queue's clauses left):

        $W plan-1 "$(cat $P/brief-common.md; sed "s/\bAT\b/$AT/g" $P/brief-edges.md)" > $O/edges.log 2>&1

   Then fill everything again, with the edges' file, and move line 173 again (PLAN-history keeps it once):

        git checkout HEAD -- explorations/coordinator/PLAN.md
        $S fill --root . $(for f in $O/chunk-?.lines $O/edges.lines; do printf -- '--lines %s ' $f; done)
        $S apply --root . --base $AT --only 173 --add M:173

9. **The final checks**, then commit 2 on the branch:

        $S check --root . --base $AT $ADD --add M:173 --final
        $S pointers --root . --base $AT
        python3 $T/record-landing/plan-moves.py --root . --base $AT
        python3 $T/record-landing/queue-check.py --root . --base $AT
        bash explorations/coordinator/check-index.sh
        python3 $T/record.py check --base $AT
        python3 $T/ledger.py landing-check $AT
        diff <(git show $AT:explorations/coordinator/PLAN.md | grep '^#') <(grep '^#' explorations/coordinator/PLAN.md)
        git add -- explorations/coordinator/PLAN.md explorations/coordinator/PLAN-history.md explorations/coordinator/review-queue.md &&
          git commit -m "PLAN's third consolidation, the writing pass: ..." -- explorations/coordinator/PLAN.md explorations/coordinator/PLAN-history.md explorations/coordinator/review-queue.md

   `check --final` fails a marker left in PLAN and a rewritten line still in PLAN unchanged. `record.py check` and `ledger.py landing-check` are a guard only: the pass writes no FACTS, POSITIONS or ledger line, so each should report nothing.

10. **The landing.** The coordinator reads the branch's diff (`git diff $AT -- explorations/coordinator/`). Then, from the main tree: if `main` is still at AT, fast-forward it to the branch; otherwise cherry-pick the two commits and run step 9's checks on `main`. Push by the `fortress-repo` skill's committing part (its three pushes). Remove the worktree and the branch (`git worktree remove /home/user/fortress-plan-3`, `git branch -D record/plan-consolidation-3`). Update the boot note.

## The estimate in tokens written

The tokens written are those that `writer-stream.sh` counts: the input and the cache writes of each task.

| Step | Tokens written |
|---|---|
| 2. The reader, a fresh stream on ten lines | about 60,000 |
| 4. Stream 1, chunk A, fresh | about 40,000 |
| 4. Stream 1, chunk B, resumed | about 25,000 |
| 4. Stream 2, chunk C, fresh | about 40,000 |
| 4. Stream 2, chunk D, resumed | about 25,000 |
| 6. The checker, fresh: the diff, the briefs, the inventory's entries, spot reads of homes | about 80,000 |
| 7. The fix round, two streams resumed | about 30,000 |
| 8. The edges' writer, stream 1 resumed | about 30,000 |
| 10. The coordinator: the steps' commands and output, and its review of the diff | about 40,000 |
| **All** | **about 370,000**, between 300,000 and 450,000 |

The mechanical steps (1, 3, 5, 8 and 9) write no tokens. The inventory's own estimate is about 300,000, between 250,000 and 400,000 (its section 4). This one adds the reader of choice 10 (b), about 60,000, which the inventory's total leaves out. Its writer streams come to 160,000, the sum of the parts that the inventory gives, where the inventory writes 130,000.

## What the dry run of 2026-11-03 found

The mechanical step was run once before the pass, in a throwaway worktree at `main`'s head (`b8112c668`), where PLAN, PLAN-history and the review queue are the same as at `8ab0dcd48`, with no `--add`. The worktree was removed after.

- `dry-run`: every line of the table found, none that it could not act on; the characters copied match the inventory's table in every section, 77,884 in all.
- `apply`: 40 lines deleted from PLAN (37 M, 3 D), 23,280 characters; 123 lines copied word for word to PLAN-history (92,781 characters), under its new section and 25 headings; the other 83 left in PLAN with their markers (50 H, 15 X, 13 E, and the "Next" bullet), with "Where we stand" replaced. PLAN went from 250,774 to 226,164 characters, before any writer.
- `check`: pass, 123 lines acted on.
- `plan-moves.py`: pass; 123 lines taken out of PLAN, 150 gained by PLAN-history (the 123, 26 headings and the opening paragraph); one LOOK line, line 192, a split line that waits for its writer.
- `queue-check.py`: pass. `check-index.sh`: pass. `record.py check --base`: 0 failures. `ledger.py landing-check`: no finding. PLAN's headings: unchanged.
- `pointers`: 4 failures, the four "Home:" clauses of the queue's part (a) that name a moved line (lines 233, 377, 391 and 496); `--write` repoints all four, which step 8 runs.
