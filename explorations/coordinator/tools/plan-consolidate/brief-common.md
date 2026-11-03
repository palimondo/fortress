<!-- The part of every writer task of PLAN's consolidation of 2026-11-03 that the four chunks share: sent first, before the chunk's own brief (README.md, step 4). -->

# A writer task of PLAN's consolidation of 2026-11-03

## The work, and what is already done

PLAN is `explorations/coordinator/PLAN.md`: the working plan, with its phases, the questions for the curator, the parked items and the lists of items "listed for his review". This is its third consolidation, by the method of the consolidations of 2026-10-15 and 2026-10-30. PLAN's header comment (its line 1) states the method:

- A closed item (answered, built or stale) moves word for word to `PLAN-history.md`, under the heading it stood under.
- An open item whose text stands in another home is cut to one line with what is asked, its default and a pointer to that home. A home is a review-queue item, a gap-ledger row, or a FACTS or POSITIONS entry. A batch record or a review is not a home.
- An open item with no other home stays as written.

The inventory is `explorations/coordinator/process-engineering/plan-consolidation-2026-11-03/inventory.md`. Its section 1 gives each line of PLAN a verdict, with its ground. A line number in the inventory and in your chunk brief is a line of PLAN at commit `8ab0dcd48`. Read the old line with `git show 8ab0dcd48:explorations/coordinator/PLAN.md`. Read the inventory's entry for line N with Grep, pattern `^- Line N `, in the inventory.

You work in the pass's worktree, `/home/user/fortress-plan-3`, on its branch. The mechanical step has run there. It deleted every closed and duplicate line from PLAN and copied it word for word to PLAN-history. It also copied every line of your chunk word for word to PLAN-history, under "Moved at the consolidation of 2026-11-03". In PLAN, each line of your chunk still stands, with a marker at its end such as ` <!-- consolidate 2026-11-03: H 51 -->`. The letter is the line's mark: H, a line cut to one line; X, a split line; E, a line that stays with one edit. The number is the line's number at `8ab0dcd48`. Find a line in the working PLAN with Grep, pattern `consolidate 2026-11-03: H 51 -->`.

## What you write

Write one file, `/home/user/fortress-plan-3/tmp/plan-consolidate/chunk-X.lines`, where X is your chunk's letter. Do not edit PLAN.md, PLAN-history.md, the review queue or any other file. The coordinator puts your lines into PLAN with the script `plan-consolidate.py fill`, and runs the checks.

The file holds one entry for each line of your chunk, in the order of the chunk brief. An entry is two lines:

    @51
      - N1 and N2, A's 154 and B's 59: ... (F-299; review-queue items 327 and 310).

The first line is `@` and the line's number. The second line is the new line, whole, as it will stand in PLAN, with no marker. For a line that the chunk brief drops as a duplicate, the second line is empty: the old line leaves PLAN, and its text is already in PLAN-history.

## The forms

- **H, cut to one line.** Keep the line's opening ids: the words with which it opens, up to its first colon, such as "A.worker.1 and A.skeptic.1 of climb batch 14's rung A" or "Row 862, from climb batch 24's rung F". The review queue's "Home:" lines find a PLAN line by its heading and these first words. Then state what is asked, as a question where the old line asks one; its default, where the old line has one ("Default: as landed."); and the pointer to its home. Aim at about 220 characters, the length of the one-line pointers in the lists of climb batches 22c to 25. Line 611 of `8ab0dcd48` shows the form with a queue item: "- O.worker.1 and O.skeptic.1 of climb batch 22c's rung O, the batch's question 4 (row 834): may a component's function or method answer a narrower return type than its api declaration, as the text allows? Default: the check's rule, the same header, as built. Review-queue item 291." Line 90 shows the form with rows: "- Row 533, the model's numeral powers refused as an ambiguous coercion: not reproduced against the one library since climb batch 22's base (the row's notes); measured when the model is first checked against the one library (review-queue items 29 and 277)." Write "review-queue item N", "row N", "F-N" and "P-N" in these forms, so that the pointer check finds them.
- **X, split.** The old line is in PLAN-history whole. Write one new line, in the same form, that holds only the open part that the chunk brief names. Drop the closed part. Keep the opening ids.
- **E, one edit.** Write the old line with only the edit that the chunk brief names. Change nothing else in it.
- Keep each line's list form exactly: its indent, and its `- ` or its number such as `12. `. A sub-bullet stays a sub-bullet. Keep each line one line.

## Fidelity

A new line says what its home says, and no more. Before you write a pointer, read the home:

- a FACTS or POSITIONS entry: `explorations/coordinator/tools/facts-extract.sh 'F-299' 'P-33'`;
- a ledger row: `explorations/coordinator/tools/facts-extract.sh 'ledger:846'`;
- a review-queue item: Grep, pattern `^327\. `, in `explorations/coordinator/review-queue.md`, and read its sub-bullets to its "Needed by" line. An open item is in part (b) or (c). A settled one is in part (a), as `- **327, ...`.

If a home does not hold what the inventory says it holds, keep the old line's open text in your new line, and say so in your report. Do not point to a home that does not hold the text. If a row named as a home is `FIXED`, `DUPLICATE` or `RETIRED`, say so in your report.

## The register

Write in the record's register: plain, full sentences, no shorthand, each term as the old line uses it. A new line is never longer than the old line. Write no question to the curator and nothing for him to answer: this pass asks him nothing. Write no model identifier anywhere. Commit nothing.

## The checks after your chunk

The coordinator runs these after your chunk, and the checker reads their output:

- `plan-consolidate.py fill` puts your lines in. It fails an `@N` with no marked line. It lists a new line whose list form differs from the old line's, and a cut line (H) past 300 characters.
- `plan-consolidate.py pointers` fails a review-queue item, row or entry number that does not exist. It lists a settled item and a closed row that a new line names. It fails a review-queue "Home:" line that found its PLAN line before the pass and finds none after it.
- `plan-moves.py` fails a line that left PLAN and is not in PLAN-history word for word.

## Your report

End with a short report in plain sentences:

- for each line: its number, its mark, the length of its new line, and the homes that you read;
- each line where a home did not hold what the inventory says, with what you wrote instead;
- each choice that you made where the chunk brief gave two ways, with your reason;
- anything in the task that you could not follow, and why.
