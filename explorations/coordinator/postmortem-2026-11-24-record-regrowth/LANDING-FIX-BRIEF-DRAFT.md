<!-- This file is a draft of the brief for the worker that will design the fix of the record-landing workflow (explorations/coordinator/tools/record-landing/), for the curator's review before anything is built or launched. It states the problem and the requirements, each resting on a numbered rule of HIS-WORDS.md in this folder or on an error of 2026-11-24 that evidence/briefs-compared.md or RESTATEMENT.md names, and prescribes no design. Written 2026-11-24 by an Opus worker. -->

# Draft brief: the fix of the record-landing workflow

How to read this draft:

- His words stand in quotation marks, with their time.
- Everything else is the coordinator's reading or default.
- Each section ends with its sources: the rule of `HIS-WORDS.md` in this folder that a point rests on, where his exact words stand, or the evidence file. "Open 3-A" and the like name an open question of that file.

## 1. The problem

- `explorations/coordinator/FACTS.md` grew from about 90K to 427K characters in six weeks.
- A full boot of the coordinating session now takes 590K tokens, which he called "Not exactly practical".
- The record-landing workflow runs after each landing, and still FACTS grows; in his words, "That process has a failure somewhere because it's not doing its job of consolidating the record".
- The workflow was built without the job that he ordered for it: its design note says that it "does not do" a consolidation's job.
- Inside a run, the batch's draft entry is the baseline, the writer may grow a long entry only "by the clause that its change owes", and no brief or check asks an entry to come down.
- In the three runs traced, the 44 entries that the batches added or changed were 84,660 characters before the runs and 84,573 after them, and 115 of FACTS's 299 entries over 600 characters never came within any run's reach.
- An entry is born as what a rung did: the batch brief asks each rung for "The FACTS.md entry the rung earns", the gather adds it after its section's last entry, and the workflow rewrites each entry that it is given as one new line.
- So entries follow the batch that made them, not their subject: in a sample of 40, 38 hold two or more claims that answer different questions, and 24 carry a defect beside the property in their title.
- He judged such an entry, F-63, so: "what is uniting the things in it under one fact, other than they probably originated from the same batch? This seems very wrong."
- Today's attempt at a consolidation was briefed from a summary of the October method, made the worker skill a home for facts, aimed at 600 characters an entry, and applied five chunks to FACTS before he had read its pilot.
- He refused it, and FACTS is restored to its state before the pilot.
- Your task is to design the fix: list every way to meet the requirements below, say what each costs in tokens written per landing and what it gives up, and recommend one, in a design note for the curator; build nothing and launch nothing.

Sources, by point:

- point 2: rule 3.2
- point 3: rule 8.8
- point 4: `HIS-WORDS.md`, Part 3
- point 5: `evidence/landing-workflow-traced.md`, "The answer in short"
- point 6: same section
- point 7: `evidence/f63-traced.md`, "In short", items 1 and 11
- point 8: same section, item 10
- point 9: rule 4.5
- point 10: `RESTATEMENT.md`, "What the coordinator did wrong today"
- point 11: `RESTATEMENT.md`, "Where we are"

## 2. The workflow's purpose, in his words

- 2026-11-24, 14:38 UTC: "This is not only my order of this morning, this is my original order for creating the landing workflow, which was supposed to encode the practice that has successfully consolidated the record the first time. That was its whole fucking purpose."
- 2026-11-24, 09:20 UTC: "The whole purpose of the workflow was to encode that successful practice into something that runs after each landing."
- 2026-11-24, 14:34 UTC: "Fix where an entry is born. You are saying rank [rung] hands over findings and the landing sorts each. That was the purpose of the landing workflow. [...] Point 3, consolidate facts is the purpose of the landing workflow. And 4, yes, build it in the landing workflow."
- 2026-10-20, 17:14 UTC: "a new standing procedure, how the batch landings get incorporated into a record, by a separate worker with small fresh context — not the coordinator in the dumb zone!"
- 2026-10-22, 10:46 UTC: "And after a landing, the consolidation of the record should always rewrite it to the present tense and not keep the, like we move the history to the history file, and the future needs to live outside of in a plan, I believe, or stuff with the review queue."
- 2026-11-01, 23:10 UTC: "the goal here would be to get the new facts and stuff from, I believe, from a report of the landed batch is also considered an input. Like maybe there is a step that gathers the evidence for the consolidation of the record that is like what those scouts prepared for each chunk. And then Opus writer consolidated. [...] I'd like to have this down to a reusable workflow after the batch lands that the coordinator launches, and we get a consistent record keeping consolidation."
- 2026-10-13, 17:23 UTC, of the consolidation that the workflow is to encode: "We have saved a significant amount of space, but not lost any reasoning capabilities from the status quo. We want to have better performance and much lower memory cost. That's the goal."

Sources, by point:

- point 1: rule 8.1
- point 2: rule 8.1
- point 3: rules 8.1, 8.6
- point 4: rule 8.2
- point 5: rule 8.3
- point 6: rules 8.2, 8.4, 8.6
- point 7: rule 3.2

## 3. What the workflow must do

### With a rung's findings

1. Take as its input what the landed batch reports: the rungs' findings, the batch's record and the batch's report.
2. Treat what a rung writes for the record as a finding, not as an entry: a finding reaches FACTS only through the landing's sort.
3. Today the gather puts each rung's entry into FACTS before the workflow runs, so where an entry is born is part of the problem to solve.
4. Sort each finding into its one home:
   - the FACTS entry that already owns its subject;
   - a new FACTS entry, where no entry owns its subject;
   - the gap ledger, for a defect: a note on its row or a new row;
   - the history, for how the fact came about: dates, batches, repairs;
   - the report, for detail such as measured numbers, behind a pointer;
   - POSITIONS, only for what he decided;
   - PLAN or the review queue, for future work and for what waits for him;
   - nowhere, for what the record already holds.
5. Write a choice that a worker landed without his word as a fact, with a review-queue item where he must see it.
6. Keep FACTS to the project; what concerns how the coordinator and he work goes to the coordinator skill.

Sources, by point:

- 1: rule 8.6
- 2: rules 6.2, 8.6
- 3: `evidence/f63-traced.md`, section 4.1
- 4: rule 2.2
- 4: rules 2.2, 4.5
- 4: rule 2.2
- 4: rule 2.12
- 4: rule 2.1
- 4: rules 1.4, 3.7
- 4: rules 2.8, 2.11
- 4: rule 2.7
- 4: rule 2.2
- 5: rule 2.11
- 6: rule 2.10

### With the entries that the landing touches

7. Cover the whole record: what the batch added or changed in FACTS, POSITIONS and INDEX, each entry that this repeats or makes false, and the lines of PLAN and the review queue that the landing settles.
8. Bring each such entry to the present: what holds now, under which conditions; its history to the history file; the future to PLAN or the review queue.
9. Move what is stale or replaced to the history, and fold each change into the entry that it replaces.
10. Give each entry one subject: join the claims on one subject, and part an entry whose claims answer different questions.
11. Say each claim once; other entries point to it by number.
12. Keep the pointers one way: a decision points to the facts that it rests on, PLAN and the review queue point to facts and decisions, and nothing points back.
13. Keep each claim's meaning whole: a claim leaves an entry only where it lives in full in an entry that this one points to, or moves word for word to the history or the report.
14. Keep the clarity that the clarity rewrite of 10-22 reached: halfway to ASD-STE100, readable by someone who was not in the conversation; an example that teaches stays.
15. Treat 600 characters as a check, not a cap: an entry may be longer where its subject needs it, and what must stay small is the sum.
16. Not let FACTS grow unchecked: keep only what is relevant.

Sources, by point:

- 7: rule 8.3; these are the coordinator's words of 2026-11-02, which he marked LGTM
- 8: rules 2.1, 2.7, 8.3
- 9: rule 4.3
- 10: rule 4.5
- 11: rule 2.2
- 12: rule 2.6; open 2-A
- 13: rules 3.3, 4.10, 4.15
- 14: rules 3.1, 3.4, 3.8
- 15: rules 3.2, 3.5
- 16: rule 8.8

### With the tests that an entry names

- A list of test names leaves a FACTS entry when the report names the tests; he would take one rewrite of the reports, so that each has one standard section of its tests and a tool prints it, "If that is not already the case in the report that names the tests".
- He asked for a measurement first, and it is in.
- How the workers use the names: 45 workers that changed the tree saw 193 test names in entries; they put 32 to work, 20 of them names first met in an entry, and never used 132. Of the 450 tests that they ran, an entry supplied 10 (2.2%); the worker wrote 33% itself, its brief named 28%, and its own search found 20%. In 7 cited cases an entry's test name changed what a worker did, such as a guard run before an edit. They read the cited report 11 times out of 100.
- What the reports hold: 210 of the 339 entries name tests, 672 names in 32K characters, 7.5% of FACTS. Every test is in the cited section for 49 entries, elsewhere in the cited report for 97, and missing from the cited reports for 58. Of the 213 reports that these entries cite, 80 hold all their tests in one section whose heading says "test", and 124 would need a change. Every name still matches a file in the tree.
- So his condition for the rewrite is met: it is not already the case. The coordinator's reading, for him to correct: the test names leave the entries; before a name leaves, its report holds it, since for 58 entries the entry is the only text that ties the test to the fact; and since workers seldom open a report, the tool that prints an entry's tests must be one cheap call that the worker skill names.
- List the ways to give the tests that home and that call, with what each costs once and at each landing.

Sources, by point:

- point 1: rule 3.6
- point 2: `evidence/test-names-use.md`, `evidence/test-names-in-reports.md`

### How it runs

17. Do the steps of the October method itself: gather each entry's evidence as the scouts did; have an Opus writer, a headless session in the ASD-STE100 register, write each entry with its history; have a cold reader check the takeaway; have a judge inside the workflow decide, so that the coordinator does not act as judge.
18. Run on its own after the landing, with no step by hand from him or the coordinator, and commit to `main`; the coordinator reads the commits afterwards.
19. Run the orientation after its own commits, on the facts' final wording.
20. Have its tools and their use written in the skills.
21. Write the record only through `record.py` and `ledger.py`, so that each earlier text goes to its history.

Sources, by point:

- 17: rules 4.6, 4.7, 4.11, 8.4
- 18: rules 8.2, 8.5
- 19: rule 5.4
- 20: rules 4.2, 8.7
- 21: rule 4.10; the tools are `fortress-repo`'s, `references/records.md`

## 4. What it must never do

1. Never cut a fact because the worker skill says the same, and never point a fact to the skill.
2. Today's briefs did both: a judge counted the entries that the skill repeats as able to leave, and 20 entries on the harness, the build, walk and the checker left.
3. Never cut for length alone, or to a size budget without the goal behind it and the test of decisions.
4. Today's briefs kept October's chunk budget but neither the goal that it came from nor the test of decisions.
5. Never take 600 characters as a cap.
6. Never drop a condition, an exception or a limit of a claim; the clarity rewrite, which he accepted, kept every one, and today's briefs lost that rule.
7. Never let a writer remove a whole entry; October's writers were told to "remove none", and whole entries left only at a later step, by subject.
8. Never delete a text without moving it word for word to its history.
9. Never keep in an entry its history, what is built or still to build, or any plan.
10. Never state an agent's proposal as his decision, and never copy his dictated words into POSITIONS.
11. Never change what he decided without his word; a POSITIONS sentence that the tree made false changes by the fewest words. He approved this default of the coordinator's on 2026-11-02 with "Yes to all eight".
12. Never let Fable 5.1 write text that goes into the record, and run no adversarial Fable review of the consolidation.
13. Never make up a new method, and never bend a tool that worked for its job to fit a new one.
14. Today's briefs were written from a summary of the October method, not from its briefs, and gave October's writers a line, "Your default is to cut", that only the morning's trial had.
15. Never hold the workflow's result for a hand step, and never wait for his approval to bring the record in line with what landed.
16. Never let the coordinator write the record by hand from its full context.
17. Never run a consolidation of whole sections of FACTS before he approves its pilot.

Sources, by point:

- 1: rule 5.3
- 2: `RESTATEMENT.md`, error 3; `evidence/briefs-compared.md`, "In short", item 5
- 3: rule 3.3
- 4: `evidence/briefs-compared.md`, "In short", item 9
- 5: rule 3.5; `RESTATEMENT.md`, error 4
- 6: rule 3.4; `evidence/briefs-compared.md`, "In short", item 9
- 7: `evidence/briefs-compared.md`, "In short", item 3
- 8: rule 4.10
- 9: rules 2.1, 2.7
- 10: rules 2.3, 2.8
- 12: rules 4.12, 4.14
- 13: rule 4.1
- 14: `RESTATEMENT.md`, error 2; `evidence/briefs-compared.md`, "In short", item 1
- 15: rules 6.4, 8.5
- 16: rules 4.6, 8.2
- 17: rule 4.8; `RESTATEMENT.md`, error 5

## 5. How its result is checked

What he accepted as a check in October:

1. His read of a pilot page before the rest ran: each entry's new text, with its old text collapsed under it and the reason outside the Select range.
2. In October his comments on the trial page changed the rule before any chunk ran: the page at 09:25, his comments from 15:25 to 16:03, the definition at 17:26, the chunks at 18:01.
3. A test of decisions, run without him on the trial's entries: does a reader still decide right, and follow the pointers to the source when it needs to?
4. He accepted its result at 2026-10-13T14:29:44Z: "We, we have now established that we have a good method."
5. Its pass mark of 27 of 30, and its scores of 29 against 28 on the pilot and 30 against 28 on the finished record, were the coordinator's.
6. A cold read of the rewritten entries by a fresh model.
7. The size of the boot after the run, at 2026-10-16T06:15:51Z: "Looks like the consolidation payed off.  195k is good."
8. His skim of the result, at 2026-10-13T22:58:46Z: "Skimmed the consolidated record and skill. All LGTM."

For each landing after the fix:

9. The coordinator reads the workflow's commits on `main` and asks whether it would have done anything differently; once these reviews show the workflow sound, they stop.
10. Whether each landing also runs the test of decisions is open 8-B.
11. Each run reports FACTS's size before and after it, and the size of each entry that it touched, so that unchecked growth shows at once.

Sources, by point:

- 1: rules 4.4, 4.8
- 2: `evidence/briefs-compared.md`, section 6, item 4
- 3: rule 4.13
- 5: `evidence/briefs-compared.md`, section 6, item 2
- 6: rule 4.11
- 7: rule 3.2
- 9: rule 8.5
- 11: rule 8.8

## 6. What the first consolidation of today's FACTS needs from him

The first consolidation runs the fixed process over the whole of FACTS.

1. A pilot of three or four entries, which he reads and approves before any chunk runs.
2. A fair sample, not only the longest entries: entries that hold several claims from one batch, as F-63 does, and entries that carry a defect beside their property. His words: 2026-11-24T12:54, "Is it like concentrating only on long entries above 600?"; 2026-11-24T13:28, "So I don't think this is a representative sample."
3. For each pilot entry, the page shows where each claim that leaves it now lives.
4. His answers to the open questions that set the form of every entry, and so block the pilot:
   - open 3-A and 3-B, the tests that an entry names: the measurement that he asked for at 2026-11-24T13:17 is in, and section 3, "With the tests that an entry names", gives it with the coordinator's reading, which waits for his word;
   - open 2-B, whether a defect's text leaves an entry for its ledger row;
   - open 2-A, whether an entry may name the decision that it builds;
   - open 1-A, whether an entry whose subject the work has passed leaves FACTS.
5. Two open questions block the design of each landing's run but not the pilot: open 8-A, whether each landing also consolidates the section that a new entry joins, and open 8-B, whether each landing runs the test of decisions.
6. Open 7-A, the boot after the consolidated record, blocks neither.

Sources, by point:

- text: rule 8.1, his words of 2026-11-24T14:34
- 1: rule 4.8
- 3: rule 4.15

## 7. Sources to read

- `HIS-WORDS.md`, this folder, whole: his rules, with his exact words, and what he accepted and refused.
- `RESTATEMENT.md`, this folder, with his corrections at its end.
- `evidence/briefs-compared.md`, whole: the briefs of 10-13 and 10-22 against today's, and in its section 7 what a brief true to both would say; its "Sources" section prints each original brief from the transcript.
- `evidence/f63-traced.md`: how an entry is born, a sample of 40 entries by kind, and in section 4 the instructions that write an entry today.
- `evidence/landing-workflow-traced.md`: what the workflow does to an entry today, twelve entries traced, and every check by what it can fail.
- `evidence/his-words/landing-workflow-order.md`, headings 3 to 5: the briefs that designed and built the workflow, the design note's lines, and the skill change of 2026-11-02.
- The workflow: `explorations/coordinator/tools/record-landing/`, its `README.md` and its briefs (`sort.md`, `entries.md`, `routing.md`, `check.md`, `judge.md`); its design note `explorations/coordinator/process-engineering/record-landing-workflow.md`; the replay's comparison `explorations/coordinator/process-engineering/record-landing-replay-24.md`.
- The October definition and its five worked examples: `explorations/coordinator/process-engineering/record-rule-draft.md`, lines 117 to 256 (`explorations/coordinator/tools/facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`).
- The clarity rewrite: `explorations/coordinator/tools/record-clarity/` at commit `913ba1cbfc`, and its standard in `explorations/reviews/revival-record-synthesis.md`, lines 356 to 441.
- The batch brief's record item, "The FACTS.md entry the rung earns", and its gather: `explorations/coordinator/climb-batch-workflow.js`.
- The skills: the coordinator skill's `references/record.md` ("What an entry is", "The pass", "A consolidation", "The consolidation tools") and `references/batch.md` ("The landing"); `fortress-repo`'s `references/records.md`.
- Today's pilot: `pilot/pilot.md`, and his comments on it, `evidence/his-words/page-comments-2026-11-24.md`.
- Not a source for the method: `evidence/consolidation-of-october.md`, which leaves out two of October's rules (`RESTATEMENT.md`), and `evidence/consolidation/`, today's briefs and apply files, which are not to be applied.
