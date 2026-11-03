<!-- The checker of PLAN's consolidation of 2026-11-03: one Opus agent over the four chunks, after the writers' lines are filled into PLAN, before the one fix round. Sent alone, to a fresh writer stream (README.md, step 6). -->

# The checker of PLAN's consolidation of 2026-11-03

## The work that you check

PLAN is `explorations/coordinator/PLAN.md`: the working plan. Its third consolidation follows the method of its consolidations of 2026-10-15 and 2026-10-30, as PLAN's header comment (line 1) states it. A closed item moves word for word to `PLAN-history.md`, under the heading it stood under. An open item whose text stands in another home is cut to one line with what is asked, its default and a pointer to that home. A home is a review-queue item, a gap-ledger row, or a FACTS or POSITIONS entry. An open item with no other home stays as written.

The inventory, `explorations/coordinator/process-engineering/plan-consolidation-2026-11-03/inventory.md`, gives each line of PLAN at `8ab0dcd48` a verdict (section 1) and a mark (its appendix). Its 15 choices (section 6) are decided as it recommends, but for choice 12: line 21 moves to PLAN-history, and nothing is asked.

The pass ran in the worktree `/home/user/fortress-plan`, on its branch:

1. A script moved the 40 closed and duplicate lines (M and D) word for word to PLAN-history, under "Moved at the consolidation of 2026-11-03". It copied there too, word for word, every line that a writer rewrites: 50 cut lines (H), 15 split lines (X) and 13 lines that stay with one edit (E). It replaced the bullets of "Where we stand" by the inventory's section 5. This is the branch's first commit.
2. Two writers wrote the new lines in four chunks. Their files are `/home/user/fortress-plan/tmp/plan-consolidate/chunk-A.lines` to `chunk-D.lines`, and each writer's brief is beside the script, `explorations/coordinator/tools/plan-consolidate/brief-A.md` to `brief-D.md`, after `brief-common.md`. Read the four briefs and the common brief first: they say, line by line, what each line becomes and which lines are dropped as duplicates (choice 6).
3. The coordinator filled the lines into PLAN and ran the checks. Their output is in `/home/user/fortress-plan/tmp/plan-consolidate/checks-fill.txt`.

The filled PLAN is not committed yet. See the writers' lines with `git -C /home/user/fortress-plan diff HEAD -- explorations/coordinator/PLAN.md`, against the first commit, and the whole change with `git -C /home/user/fortress-plan diff HEAD~1 -- explorations/coordinator/PLAN.md explorations/coordinator/PLAN-history.md`. See an old line with `git show 8ab0dcd48:explorations/coordinator/PLAN.md`.

## What you check

For each of the 77 lines of the four chunks:

- **Coverage.** The line is done as its brief and the inventory's entry say: cut, split, edited, or dropped. No line of the chunk is left with its marker. No line outside the chunks changed, apart from "Where we stand".
- **Fidelity.** Each new line says what its home says, and no more. Read each home that it names: an entry with `explorations/coordinator/tools/facts-extract.sh 'F-299'`, a row with `facts-extract.sh 'ledger:846'`, a review-queue item with Grep, pattern `^327\. `, in `explorations/coordinator/review-queue.md`. A split line keeps all of its open part and none of its closed part. An edit changes only what its brief names.
- **The form.** One line; about 220 characters for a cut line; the old line's opening ids kept (the queue's "Home:" lines find a line by its heading and first words); the question kept where the old line asked one; the default stated where the old line had one; the old line's list form (indent, `- ` or number) kept; the record's register, plain full sentences; never longer than the old line.
- **The checks' output.** Read `checks-fill.txt`. Take each `LOOK` line of `fill` and `pointers` as a finding to weigh: a cut line past 300 characters, a list form changed, a settled item or a closed row named as a home.

Check, too, by sampling ten of them, that lines the script moved (M and D) are closed by their inventory entry. Do not check the lines marked P, N or K, which stay.

## Your report

Write it to `/home/user/fortress-plan/tmp/plan-consolidate/check.md`. Put the findings under four headings, "Chunk A" to "Chunk D", so that each writer's fix round reads only its own. Each finding gives:

- the line's number at `8ab0dcd48` and its mark;
- the text at issue, quoted;
- what is wrong, with its ground (the home's text, the brief's line, or the inventory's entry);
- the fix, as the new line whole where you can write it.

Sort each chunk's findings into "must fix" (a wrong fact, a lost open part, a missing pointer, a broken form) and "may fix" (wording). A chunk with no finding says "No finding." Write nothing else, and commit nothing. Write no model identifier. Ask the curator nothing: this pass asks him nothing.

End with a short report: the number of findings per chunk, must and may.
