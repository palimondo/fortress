<!-- The brief of the Opus worker that traces what the test of decisions lost on the pilot's new entries, 2026-11-24. `@TEST@` is the test's folder. -->

# What the new entries lost in the test of decisions

Load the `fortress-repo` skill and read its part `references/records.md`. From the `coordinator` skill read `references/record.md`, "What an entry is" and "A consolidation". You write one report and nothing else: no entry, no ledger row.

## What this is for

The curator ordered a consolidation of the whole of FACTS: each entry one subject, a claim that another entry owns becomes a pointer, and history, plan, a defect's description and detail of the work move to their homes. A pilot rewrote 49 entries. The test of decisions then gave twelve scenarios to two fresh readers, one with the old entries and one with the new, and a grader scored them blind. In `@TEST@`, the reader with the new entries lost points that the reader with the old entries kept. The skill's rule for this case: "If something critical is lost, find the middle ground entry by entry." The curator reads your result on a page in the morning, before he says go for the whole record. He must learn whether the method loses something that a worker needs, and what the smallest repair is.

## The material

- The test: `@TEST@`: `questions.md`, `key.md`, the filled `questions-p.md` (old entries) and `questions-q.md` (new entries), `grade/answers-X.md`, `grade/answers-Y.md` and `grade/grades.md`. The workflow's result said which of X and Y had the new entries: @ARMS@.
- The old entries: FACTS on `main`, unchanged (`explorations/coordinator/tools/facts-extract.sh 'F-N'`). The new entries: @NEW@.
- The scenarios' own notes: `explorations/coordinator/process-engineering/record-test/2026-11-24/README.md`.

## The question

For each scenario where the two readers' scores differ:

1. What did the losing reader decide wrongly or miss, in one or two sentences?
2. Which sentence carried the other reader to the right answer? Quote it, with the entry, ledger row, PLAN line or review-queue item that holds it.
3. Is that sentence in the old entries and not in the new ones? If the consolidation moved it, where did it go, and could a reader who follows the new entries' pointers reach it? If neither reader's entries held it, say so: then the difference is the readers', not the entries'.
4. If the new entries lost it: the smallest repair, entry by entry. Give the sentence to put back or the pointer to add, in the entry's own register. Say which rule of "What an entry is" the sentence was cut under, and whether the rule or its use was at fault.

Then say what the losses have in common, if anything, in a few sentences. State the grader's own doubts about the key where they bear on a loss.

## Your report

Write `@OUT@`, commit and push it yourself, by the skill's committing part. Your final message: each differing scenario in three lines (what was lost, why, the repair), and the common cause.
