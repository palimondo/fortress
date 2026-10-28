<!-- How to run the corrections of the 18 POSITIONS entries that the foundations review's findings name, by the clarity workflow as a pilot of one chunk and then a second, with each input's path, the exact calls, the checks after each chunk and the estimates; prepared by an Opus worker on 2026-10-28, nothing launched. -->

# The corrections run

Scope: the 18 entries of `explorations/reviews/foundations/evidence/salvage-findings.md`. The exit judgement's six entries are not in it. The tool is the clarity workflow with the three additions of `brief-additions.md` beside this note, applied to its files and not yet committed. Commit them, with the run's folder, before the launch.

## Inputs

- The tool: `explorations/coordinator/tools/record-clarity/` (`record-clarity.js`; `writer.md`, `coldread.md`, `check.md`, `fix.md`, `judge.md`; `entries.py`; `writer-stream.sh`).
- The findings list: `explorations/reviews/foundations/evidence/salvage-findings.md`.
- The out folder: `explorations/reviews/foundations/evidence/corrections/`, the run's evidence beside the salvage's future results file (`explorations/reviews/phase3-exit/README.md`, layer 5).
- The cut script: `corrections/cut-findings.py`. It wrote `corrections/c1/findings.md` (17 findings) and `corrections/c2/findings.md` (13), word for word.
- The length script: `corrections/length-table.py`.
- The trap test: `explorations/reviews/foundations/evidence/trap-test/questions.md`, `key.md`, `grades.md`; the kit: `explorations/coordinator/process-engineering/record-test/` (`README.md`, `brief-reader.md`, `brief-grader.md`, `fill.py`).

The chunks, by subject:

- c1, the team's word and the one library: P-7, P-26, P-27, P-37, P-43, P-146, P-153, P-154, P-158.
- c2, the bound, the phases, arrays and natives: P-12, P-17, P-33, P-42, P-58, P-59, P-84, P-85, P-155.

The audit never traced P-158; `entries.py` says so, and its writer works from its history and its findings.

## The pilot

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js', args: { kind: 'positions', out: '/home/user/fortress/explorations/reviews/foundations/evidence/corrections/', stream: 'corrections-c1', chunks: [{ name: 'c1', entries: ['P-7', 'P-26', 'P-27', 'P-37', 'P-43', 'P-146', 'P-153', 'P-154', 'P-158'] }] } })

## The second chunk, after his read of the pilot

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js', args: { kind: 'positions', out: '/home/user/fortress/explorations/reviews/foundations/evidence/corrections/', stream: 'corrections-c2', chunks: [{ name: 'c2', entries: ['P-12', 'P-17', 'P-33', 'P-42', 'P-58', 'P-59', 'P-84', 'P-85', 'P-155'] }] } })

Resume a killed run with the same call and `resumeFromRunId`, byte for byte.

## The checks after each chunk

1. **Two copies.** `git worktree add --detach /home/user/record-test-p HEAD`, and the same for `/home/user/record-test-q`. In both, delete what the kit's step 2 names, and also `explorations/reviews/foundations/`, `explorations/conversations/02-phase3-exit-foundations.md`, `explorations/reviews/phase3-exit/README.md` and `explorations/coordinator/postmortem-2026-10-28/`. Commit nothing.
2. **The record's check.** In q, `python3 -I explorations/coordinator/tools/record.py apply <out>c1/final.apply --root /home/user/record-test-q`, then `record.py check --base HEAD --root /home/user/record-test-q`. After c2, apply both chunks' files in order.
3. **The length table.** `python3 -I <out>length-table.py /home/user/record-test-p/explorations/coordinator/POSITIONS.md /home/user/record-test-q/explorations/coordinator/POSITIONS.md` and the chunk's entries. Growth that no finding needs is a fault for his read. After c2, also `record-clarity/words-subset.py <out>c2/final.apply`: P-59's line, a strike only, must add no word.
4. **The trap test**, by the kit's steps 5 to 9. After the pilot, scenarios 2 and 3, which quote only c1's entries and P-77. After c2, scenarios 1 and 4. Cut `questions.md` to the scenarios, fill it once from each copy with the kit's `fill.py`, and launch one fresh Opus reader in each copy with `brief-reader.md`. Blind the answers. One Opus grader, as on 10-26, takes `key.md` and is told the key's slips (`reviews/foundations/rewrite-results.md`, "The key's slips"). Pass: no scenario scores below the old entries' score in `grades.md`, section 1: 3, 2, 3 and 2 of 3 for scenarios 1 to 4.
5. **His read.** An Opus page writer shows each entry new above old, each change with its finding and its ground, in the house style. If he asks for a change in one entry, it goes into that chunk's `findings.md` as a new finding, with his message's time as its ground, and that entry runs again. A change for every entry is a brief change, at his yes.

## After his yes on each text

`record.py apply <out>cN/final.apply` on `main`, `check --base` the commit before, commit the record, its histories and the chunk's folder, and push. A worker files `queue.md` in `explorations/coordinator/review-queue.md`. Remove the two worktrees. The results file goes in `explorations/reviews/foundations/`, with its INDEX line.

## Tokens written, an estimate

- Each chunk's run: 0.8M to 1.3M (10-26: 1.62M for 13 entries in two chunks, `account.md`, section 5).
- Each half of the trap test: 0.4M to 0.5M (10-26: about 0.8M for four scenarios).
- Each page: 0.2M. The checks: under 0.1M.
- Each chunk, all in: 1.5M to 2M. The whole run: 3M to 4M. On 10-26, 2.7M was written against 1.5M estimated.
