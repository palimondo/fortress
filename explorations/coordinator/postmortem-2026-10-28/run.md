<!-- How to run the corrections of the 18 POSITIONS entries that the foundations review's findings name, by the clarity workflow as a pilot of four entries and then two chunks of seven, with its inputs, calls, checks and estimates; prepared by an Opus worker on 2026-10-28, nothing launched. -->

# The corrections run

Scope: the 18 entries of `explorations/reviews/foundations/evidence/salvage-findings.md`. The exit judgement's six entries are not in it. The tool is the clarity workflow with the three additions of `brief-additions.md` beside this note, applied to its files. Commit the run's folder before the launch.

## Inputs

- The tool: `explorations/coordinator/tools/record-clarity/`, its script, briefs and `entries.py`.
- The findings list: `explorations/reviews/foundations/evidence/salvage-findings.md`.
- The out folder: `explorations/reviews/foundations/evidence/corrections/` (`<out>` below), beside the salvage's future results file (`explorations/reviews/phase3-exit/README.md`, layer 5).
- The cut script: `corrections/cut-findings.py`. It wrote each chunk's `findings.md`, word for word: `p/` (11 findings), `c1/` (8), `c2/` (11).
- The length script: `corrections/length-table.py`.
- The trap test: `explorations/reviews/foundations/evidence/trap-test/questions.md`, `key.md`, `grades.md`; the kit: `explorations/coordinator/process-engineering/record-test/` (`README.md`, `brief-reader.md`, `brief-grader.md`, `fill.py`).

The chunks:

- p, the pilot: P-37, P-26, P-43, P-158.
- c1: P-7, P-27, P-146, P-153, P-154, P-12, P-17.
- c2: P-33, P-42, P-58, P-59, P-84, P-85, P-155.

The audit never traced P-158; its writer works from its history and its findings.

## The calls

The pilot:

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js', args: { kind: 'positions', out: '/home/user/fortress/explorations/reviews/foundations/evidence/corrections/', stream: 'corrections-p', chunks: [{ name: 'p', entries: ['P-37', 'P-26', 'P-43', 'P-158'] }] } })

c1, after his read of the pilot:

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js', args: { kind: 'positions', out: '/home/user/fortress/explorations/reviews/foundations/evidence/corrections/', stream: 'corrections-c1', chunks: [{ name: 'c1', entries: ['P-7', 'P-27', 'P-146', 'P-153', 'P-154', 'P-12', 'P-17'] }] } })

c2, after his read of c1:

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js', args: { kind: 'positions', out: '/home/user/fortress/explorations/reviews/foundations/evidence/corrections/', stream: 'corrections-c2', chunks: [{ name: 'c2', entries: ['P-33', 'P-42', 'P-58', 'P-59', 'P-84', 'P-85', 'P-155'] }] } })

Resume a killed run with the same call and `resumeFromRunId`, byte for byte.

## The checks after each chunk

1. **Two copies**, at B, the commit at the pilot's launch, kept for all three chunks: `git worktree add --detach /home/user/record-test-p B`, and the same for `/home/user/record-test-q`. In both, delete what the kit's step 2 names, and also `explorations/reviews/foundations/`, `explorations/conversations/02-phase3-exit-foundations.md`, `explorations/reviews/phase3-exit/README.md` and `explorations/coordinator/postmortem-2026-10-28/`. Commit nothing.
2. **The record's check.** In q, `python3 -I explorations/coordinator/tools/record.py apply <out>p/final.apply --root /home/user/record-test-q`, then `record.py check --base B --root /home/user/record-test-q`. After c1 and c2, q holds every chunk's file so far, applied in the order p, c1, c2.
3. **The length table.** `python3 -I <out>length-table.py /home/user/record-test-p/explorations/coordinator/POSITIONS.md /home/user/record-test-q/explorations/coordinator/POSITIONS.md` and the chunk's entries. Growth no finding needs is a fault. After c2, also `record-clarity/words-subset.py <out>c2/final.apply`: P-59's line, a strike only, must add no word.
4. **The trap test**, by the kit's steps 5 to 9. Each scenario runs after the last chunk that holds an entry it quotes:
   - after p: scenario 3 (P-37, P-43);
   - after c1: scenario 2 (P-26, P-37, P-146, P-27);
   - after c2: scenarios 1 (P-26, P-42) and 4 (P-37, P-33).

   Cut `questions.md` to the scenarios, fill it once from each copy with the kit's `fill.py`, and launch one fresh Opus reader in each copy with `brief-reader.md`. Blind the answers. One Opus grader, as on 10-26, takes `key.md`, told the key's slips (`reviews/foundations/rewrite-results.md`, "The key's slips"). Pass: no scenario scores below the old entries' score in `grades.md`, section 1: 3, 2, 3 and 2 of 3 for scenarios 1 to 4.
5. **His read.** An Opus page writer shows each entry new above old, each change with its finding and its ground, in the house style. A change he asks for in one entry goes into that chunk's `findings.md` as a new finding, his message's time its ground, and the entry runs again; a change for every entry is a brief change, at his yes.

## After his yes on each text

`record.py apply <out><chunk>/final.apply` on `main`, `check --base` the commit before, commit the record, its histories and the chunk's folder, and push. A worker files `queue.md` in `explorations/coordinator/review-queue.md`. After c2, remove the two worktrees. The results file goes in `explorations/reviews/foundations/`, with its INDEX line.

## Tokens written, an estimate

From 10-26: 1.62M for 13 entries (`account.md`, section 5); about 0.8M for the trap test's four scenarios.

- p: the run 0.5M to 0.8M, scenario 3 0.2M to 0.3M, the page 0.15M. About 0.9M to 1.2M.
- c1: the run 0.8M to 1.0M, scenario 2 0.2M to 0.3M, the page 0.2M. About 1.2M to 1.5M.
- c2: the run 0.8M to 1.0M, scenarios 1 and 4 0.4M to 0.5M, the page 0.2M. About 1.4M to 1.7M.
- The checks: under 0.1M each. The whole run: 3.5M to 4.4M. On 10-26, 2.7M was written against 1.5M estimated.
