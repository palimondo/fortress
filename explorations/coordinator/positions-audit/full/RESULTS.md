<!-- The POSITIONS audit's full run on the 75 entries the trial did not trace, 2026-10-21 to 22: what it proposes, grouped by type for the curator's approval (50 entries change, 25 kept word for word), its 16 questions, its checks and its cost; the reports, judgements, proposals and checks of its eight chunks are in evidence/. Nothing is applied. -->

# The full run's results

Eight chunks of POSITIONS, 75 entries, from 23:37 UTC on 2026-10-21 to 02:25 UTC on 10-22, in four Workflow runs of two chunks each. Each chunk: a Sonnet scout per entry (`evidence/P-N.md`), an Opus judgement (`judgement-cN.md`), an Opus writer on a copy of the record (`corrections-cN.md`, `corrections-cN.apply`, `rewritten-cN.txt`, `review-queue-items-cN.md`), a cold read (`cold-read-cN.md`) and a takeaway check (`takeaway-cN.md`). The briefs are in `evidence/briefs/`, the script in `evidence/workflow.js`. Nothing in POSITIONS, FACTS or their histories has changed.

## What it proposes, by group

The page https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb (version 10) shows each entry's change and its whole text before and after.

1. Status and counts moved to the history (8): P-45, P-50, P-51, P-89, P-147, P-149, P-152, P-155.
2. Factual errors corrected (12): P-12, P-19, P-28, P-47, P-53, P-69, P-70, P-72, P-74, P-87, P-91, P-102.
3. One-time approvals and remarks struck (6): P-8, P-9, P-33, P-44, P-78, P-79.
4. Defaults moved to the review queue (8): P-17, P-30, P-40, P-57, P-60, P-75, P-146, P-153.
5. Reworded back to his meaning (10): P-29, P-32, P-39, P-46, P-48, P-54, P-56, P-58, P-62, P-154.
6. Struck (2): P-16, P-123; F-39's pointer to P-123 is rewritten with it.
- Held for his answers (4): P-27, P-38, P-43, P-90.
- Kept word for word (25): P-7, P-11, P-25, P-26, P-37, P-41, P-42, P-49, P-52, P-59, P-67, P-68, P-71, P-73, P-76, P-77, P-80, P-84, P-95, P-96, P-97, P-98, P-103, P-124, P-125. Each has source lines for its history that `record.py` cannot write (each chunk's "History lines" section).

Ten review-queue items are drafted for groups 4 and 5; one more (c8, P-124) only if he prefers it to his question. Sixteen questions: fourteen from the writers, on P-26, P-27, P-38, P-42, P-43 (two), P-59, P-77, P-87, P-90, P-95, P-123, P-124 and P-152, and P-85's two from the trial. The takeaway checks found 19 kept sentences that a reader with no context misread; by his rule of 23:21 UTC on 10-21 none is fixed, and each fix is drafted in its chunk's takeaway file.

## The checks

- `tools/hischeck.py` on the 75 reports and 8 judgements: 1,100 quotes of his, all EXACT.
- The eight apply files applied together, in chunk order, on one copy of the record (`scratchpad/positions-audit/full/combined/`), then `record.py check --base 6897e6f48`: 0 failures; POSITIONS from 83 entries to 81; 49 entries rewritten (48 of POSITIONS and F-39), 2 removed.
- The page's groups were checked by script against that copy: the 50 entries the groups name are exactly the 50 that change.

## Points for the next steps

- The writers found history blocks of the consolidation of 2026-10-13 that name the wrong commit (chunks c2, c3, c4 and c6). `record.py` cannot amend a block; the history-only command should cover them.
- "Built." in an entry with nothing left to build: chunks c4, c5, c6 and c8 kept the bare word by rule 0; c7 moved P-89's to the history. The coordinator proposes keeping it in P-89 too.
- Each writer's "The rules, where they fit badly" lists the cases where two rules of the brief pulled apart (mostly rule 0 against rules 2, 6 and 9).

## The cost

19.3M tokens written by the four runs (`tools/spend.py` from epoch 1792625800): 5.38M, 4.75M, 5.19M and 3.97M. The estimate was 16M to 17M. A VM restart at 00:03 UTC killed the runs; they were resumed at 00:05 with their finished agents reused, and the agents killed mid-work ran again from the start.
