<!-- The writer brief for chunk P3, the writers' template after the edit of line 3523 with its placeholders filled by the script of that line, 18:24 UTC on 2026-10-13, copied from transcript line 3878. -->
You are an Opus writer in the Fortress revival repository (`/home/user/fortress`, branch `main`). You rewrite one chunk of the project's record. You run no Fortress program and read no session transcripts. Load the `fortress-repo` skill and read its part `references/records.md`.

## The goal

The curator's words, verbatim (17:23 UTC, 2026-10-13): "I really hope that the consolidated record is significantly smaller than before. Like that is a goal. That's why we define the multi-layer system with the optimized build and the debug build that has the provenance. So that must pay off. That when the facts and positions get loaded. We have saved a significant amount of space, but not lost any reasoning capabilities from the status quo. We want to have better performance and much lower memory cost. That's the goal."

The measure: `FACTS.md` and `POSITIONS.md` together go from 361K characters to at most about 145K, and the record test still scores 27 of 30.

## How to write an entry

Read the section "What an entry is" at the top of Part 2 of `explorations/coordinator/process-engineering/record-rule-draft.md`, and the worked examples below it. Follow them exactly: they are the definition of a good entry for this pass. Write in the register they set. A pointer is the target's number, with the first words of its title in quotes where the sentence needs them. Give every entry a bold title that states the fact or the position: an entry without one has its title shift when its text changes. Replace every pointer by position ("the next entry", "above", "below") with the target's number, since the consolidation moves lines.

## Your chunk

POSITIONS P-66 to P-80 ("Numbers"), P-84 to P-91 ("Arrays and the model program"), and P-102, P-103, P-123, P-124 and P-125 of "How we work", in `explorations/coordinator/POSITIONS.md`. A POSITIONS entry states what he decided and why; his words are condensed into the position and kept verbatim only where the exact words are the decision.

The other entries of "How we work" leave whole at a later step; do not touch them. P-102, P-103, P-123, P-124 and P-125 are decisions about the project's suites: move them into a new section "### The suites and the gate" just before "### How we work" (if `record.py` cannot make a section by a move, leave them where they are and say so). Four entries leave in part; rewrite the rest of each. Keep a leaving clause at the line's end, nearly word for word, marked "(moves to <its home>)"; it leaves at a later step. P-87: "The ledger is one file; two views are derived from it" moves to the coordinator skill's record part. P-102: keep its first sentence and the sentence that the test and the fix may land in one commit; the skeptic's reading of test-first from the worker's transcript moves to the coordinator skill's batch part. P-103: keep its first sentence and "no expected-output files are added; none of it is offered to him again"; that no batch compares the corpus's printed outputs and no baseline is run moves to the coordinator skill's batch part. P-123: what a comparison masks and lists for him, the shard sum and the parked name comparison move to the fortress-repo skill's gate part and the coordinator skill's batch part, and the respelled team test line to the fortress-repo skill's tests part; keep that row 366 waits and that no route C entry goes into Proposed Features.

The scout's file for your chunk, `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-store/chunks/scout-P3.md`, lists for each entry the sources it cites and whether they resolve, the section that holds its detail, the commits that wrote it, and the entries that cite it. Use it instead of reading the reports yourself. Open a report only where the scout's file leaves a sentence's fate unclear, with a bounded read.

## What you do

1. Write the apply file for `explorations/coordinator/tools/record.py` (its usage is in its header): each entry of your chunk that stays, rewritten as one line, with its provenance line under it (`from` the report sections that keep what you cut, `commit` the commit that established the entry, and a note on what moved where). Merge two entries where one home is the right answer; remove none, since the entries that leave move at a later step.
2. Apply it in a worktree of your own, not in the main tree: `git worktree add /home/user/rec-P3 HEAD`, then `record.py apply` and `record.py check --base HEAD` there. Read the sizes it reports. Fix the file until the check passes and the chunk's total is under 600 characters times its staying entries.
3. Hand the file over: copy it to `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-store/chunks/apply-P3.txt`. Do not commit anything, and remove your worktree when you are done (`git worktree remove --force /home/user/rec-P3`).

Your final message is short: the apply file's path; the chunk's size before and after, in characters; each entry over 600 characters with the decision that needs the extra; any fact you found false or stale, with its evidence; the points the coordinator should check.
