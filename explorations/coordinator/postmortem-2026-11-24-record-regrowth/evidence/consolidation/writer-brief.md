<!-- The brief of the Opus writers of the FACTS consolidation of 2026-11-24, one writer per chunk of `chunks.json`; evidence of the run, not a note. -->

# Writer brief: one chunk of FACTS

You work in a git worktree of the Fortress revival repository. Load the `fortress-repo` skill first (Skill tool), and read its `references/records.md`. You do part of the coordinator's work, so also read `.claude/skills/coordinator/references/record.md` whole.

## The problem

`explorations/coordinator/FACTS.md` has grown from 90K to 427K characters since its consolidation of 2026-10-13. The curator ordered: "compress the facts again. Of course, keeping the clarity high." and "There should be clear demarcation about things that go into the facts and which go to the facts history." He wants the method of 2026-10-13 run again as it was. You are the writer of one chunk: the key CHUNK of `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation/chunks.json`, which lists your entries.

## The method, as it ran on 2026-10-13

Read `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation-of-october.md`, sections "The method in short", 1, 2 and 4. Your brief is that day's writers' brief:

- "Your default is to cut. A check that nothing is lost is not your goal; the history file and the reports already keep everything."
- Read "What an entry is" in `record.md` and the five worked examples (`explorations/coordinator/tools/facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`). Follow them exactly.
- Write each staying entry as one line, with its provenance: `from` the report sections that keep what you cut, the commit that established the entry, and a note on what moved where.
- Merge two entries where one home is the right answer.
- "Fix the file until the check passes and the chunk's total is under 600 characters times its staying entries." An entry may pass 600 only when a question of "What an entry is" keeps a sentence; you name in your hand-back the decision or the misreading that the sentence prevents, and shorter entries pay for it.
- Each cut names where its text lives now, and you check with a bounded grep that the home holds it.

## What this consolidation adds: each entry made true of the tree of today

Judge each entry by the six checks of `record.md` (scope, present meaning, evidence, comprehension, ownership, consistency) as you write it.

- Your scout file is `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation/scout-CHUNK.md`. For each entry it gives the sources, the entries and skill lines that cite it, whether each named test, file and ledger row exists and agrees today, and where the skill or another entry says the same. It is evidence, gathered by a Sonnet scout: check a point of it where your text rests on it.
- An entry with a claim that is stale or false today is written to what the tree shows now. An entry that claims more than its support is written to what its support holds. Where you cannot settle a claim with bounded reads and greps, keep the entry's claim, mark nothing in the entry, and list it in your hand-back as "investigate", with the narrow question.
- A ledger row that the entry names is given with its status as the ledger has it now; a contested row is called contested.
- An entry leaves FACTS where the `fortress-repo` skill already holds its rule: only where your grep finds the rule in the skill, and the skill's sentence is right. Remove it with a note that names its home, the skill's file and section. Where the skill's sentence is wrong or lacks a part that a reader acts on, the entry stays, short, and your hand-back gives the skill sentence that must change, with the right words. You change no skill file.
- A count that each landing changes has one entry that holds its value; other entries give that entry's number.

## The form

The pilot shows the form: `explorations/coordinator/postmortem-2026-11-24-record-regrowth/pilot/pilot.md` (four entries, old and new), and the pilot chunk's apply file, `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation/apply-harness.md`. Match their register and their length. One point is open with the curator: whether an entry names its test. So put the evidence (the test, the command or the source) in one sentence that can be cut whole, as the pilot does.

Write halfway to ASD-STE100: plain short sentences, active voice, one word for one thing.

## The work

1. Write an apply file for `explorations/coordinator/tools/record.py` (its header gives the usage of `apply`, `set`, `merge` and `remove`, and the form of an apply file). Change only the entries of your chunk.
2. Run `record.py apply` on it in your worktree, then `record.py check --base HEAD`. Read the sizes that it reports. Fix the file until the check passes with 0 failures and the staying entries' total is under 600 times their count.
3. After the apply, grep `FACTS.md`, `POSITIONS.md`, `explorations/coordinator/PLAN.md`, `explorations/coordinator/review-queue.md` and `.claude/skills/` for the number of each entry that you removed, merged or retitled, and for each claim that left an entry to which another entry points. List each pointer that now points at a claim that moved, with its new home.
4. Copy the final apply file to `/home/user/fortress/explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation/apply-CHUNK.md`, with a header comment that gives the `--by` value to pass. Commit nothing, and do not push. The coordinator applies the file on `main`.

Run no build and no suite. Keep every wait under 240 seconds. Launch no agents.

5. Write `/home/user/fortress/explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation/followups-CHUNK.md`, with a header comment whose first sentence says what the file is, under these headings: "Over 600" (each entry over 600 with the sentence's reason), "Removed" (each removed or merged entry with its home), "Made true of the tree" (each in a few words), "Skill sentences to change" (the file, the sentence now, the right words), "Pointers" (each pointer left for the coordinator, with its new home), "Investigate" (each entry, with the narrow question), "Not done".

Your final message, in at most 8 lines: the apply file's path and its `--by` value; the chunk's size before and after; the count of entries staying, merged and removed; whether the check passed with 0 failures; and whether the apply rewrote a pointer in `POSITIONS.md`. The rest is in the follow-ups file.
