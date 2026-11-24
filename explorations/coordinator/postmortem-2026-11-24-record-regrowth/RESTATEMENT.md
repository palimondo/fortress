<!-- The coordinator's restatement, at the curator's ask of about 14:50 UTC on 2026-11-24, of where the work on the record stands after the refused pilot: what is being done, what went wrong, the root cause of FACTS's state, and the way to resolve it. It is the coordinator's understanding, not the curator's word, until he corrects it; written so that it survives a compaction. -->

# The record after the refused pilot: the coordinator's restatement

Not the curator's word. He corrects it; his corrections go in under "His corrections".

## What we are doing

Before run 2 of climb batch 36, the record is made trustworthy again. His order of 07:35 and 09:20 UTC on 2026-11-24: FACTS has grown from 90K to 427K characters; the landing process is fixed so that the record is consolidated after each landing; FACTS is compressed "keeping the clarity high"; and there is a clear line between what goes into FACTS and what goes into its history.

## Where we are

- FACTS and its history are as they were before the pilot (`d52210a046` restored them; no line differs from `f33bbf5549`). POSITIONS differs by P-180's sentence, which he approved.
- Nothing runs. No worker writes the record.
- The evidence of today, all under this folder:
  - `evidence/consolidation-of-october.md` and `evidence/landing-workflow-traced.md`: the morning's account of the October method and of the landing workflow. The first left out two of October's rules (below).
  - `pilot/pilot.md` and the page https://claude.ai/artifact/QaiPPdhtMTmVqpujEFvg4U : four entries rewritten. He refused its form; his five comments are on the page.
  - `pilot/chunk-harness-gate.md`: one section judged against the tree. Its finding that 4 of 24 entries are false today holds. Its count of entries that "leave for the skill" is wrong by design.
  - `evidence/briefs-compared.md`: the original briefings of 10-13 and 10-22, word for word, against today's.
  - `evidence/f63-traced.md`: how F-63 came about, and a sample of 40 entries by kind.
  - `evidence/consolidation/`: today's briefs, scout files, apply files and follow-ups. The apply files are not to be applied.

## What the coordinator did wrong today

1. At the boot it read POSITIONS before the facts that POSITIONS cites.
2. It wrote the briefs from a summary of the October method, not from the original briefs.
3. Its briefs made the worker skill a home for a fact: a judge counted entries that the skill repeats as able to leave, and the writers removed 20.
4. It aimed at 600 characters an entry, the state of 10-14, which the clarity rewrite of 10-22 had left with his acceptance.
5. It launched eleven scouts and nine writers and applied five chunks to FACTS on `main` before he had judged the pilot, on his words that the consolidation "doesn't need my attention".
6. It told him twice that nothing waited on him, while the review queue did and while his judgement of the pilot was the one thing needed.

## The root cause of FACTS's state

1. **An entry is born as what a rung did.** The batch brief asks each rung for "The FACTS.md entry the rung earns". The merge step adds it at the end of a section. So entries are ordered by origin, not by subject. In a sample of 40, 38 hold two or more claims that answer different questions, and 24 carry a defect beside the property in their title.
2. **Nothing afterwards sorts by subject or by kind.** The landing workflow rewrites each entry as one new line. No brief of a rung, of the merge step or of the landing workflow asks which entry already owns a claim, or whether a claim is a property of the tree, a defect for the gap ledger, a worker's decision or a note on a repair. Only the coordinator's record part says so, and no brief quotes it.
3. **So each landing adds entries.** 120 entries in 20 landings since 10-24: about four fifths of the growth. Entries also grew by a fifth in length.
4. **The direction between FACTS and the worker skill is written nowhere.** The skill is written from the facts. The coordinator's record part still says, in its question 5, "or the skill's part".
5. **The October method lives only in transcripts.** Its briefs were in no tool and no file, so it was rebuilt today from a summary, wrongly.

## What a fact is for, as the coordinator now understands him

- A fact is a property of the tree, the language, the library or their tools that later work builds on, and that differs from what a model assumes by default.
- One subject an entry. It reads on its own.
- It is not cut for length. 600 characters is a check, not a cap. What must stay small is the sum, by removing repetition between entries and pointing to the entry that owns a claim.
- A fact hands text only to another fact, its report, its history or a ledger row. Never to the skill.

## The way to resolve it, as the coordinator's proposal

1. Write the definition above, with the direction rule, into the record parts of both skills, in his words. Cut "or a skill" from question 5.
2. Fix where an entry is born: a rung hands over findings, and the landing sorts each one: into the entry that owns its subject, a new entry, a ledger row, the history, or nothing.
3. Consolidate FACTS by the original method, with the original briefs as `evidence/briefs-compared.md` indexes them: his goal ("not lost any reasoning capabilities"), "remove none" for the writers, the test of decisions, his read of a pilot before any chunk, and then the clarity rewrite's rule to keep every condition. Sorting by subject is the new part, and its form is his to judge on a pilot.
4. Build that into the landing workflow, so that it runs at each landing.
5. Tests named in an entry: his idea of one standard tests section in each report, with a tool that prints it. First measure how workers use the test names today.

Nothing of 2 to 5 starts without his go.

## His corrections

(none yet)
