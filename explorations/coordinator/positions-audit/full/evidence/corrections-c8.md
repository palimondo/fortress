<!-- The POSITIONS audit's full run, chunk c8 (P-102, P-103, P-123, P-124, P-125): the corrected record proposed by the writer's brief, entry by entry, with each new sentence's source, what leaves POSITIONS and where it goes, the history lines, the questions for the curator and the pointers elsewhere; record.py run on a scratch copy only; nothing applied. -->

# Chunk c8 corrected: a proposal

Writer: one Opus session. Sources: `judgement-c8.md`; the five scout reports in this folder (`P-102.md`, `P-103.md`, `P-123.md`, `P-124.md`, `P-125.md`); and the sources named below. The work follows the writer's brief (`briefs/writer.md`) and its rules 0 to 12. Nothing in the real record changed.

- The apply file is `corrections-c8.apply`, beside this file. `record.py` ran it on a copy of the record, in the scratch folder `positions-audit/full/fix-c8/root/`, with `--root`.
- `rewritten-c8.txt` holds the four entries that stay, as each would stand.
- `review-queue-items-c8.md` holds one item. It is drafted only for the case where he prefers rule 2 on P-124's sentence. It is not proposed.

All times are UTC. A "page comment" is one of his comments on a review page. `show.py` does not print page comments, so I read them in the transcript. "B3" is the transcript `fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/003.jsonl`, and "B1" is `.../001.jsonl` of the same session (both under `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/`). "Rule n" is the brief's rule n. "His comments of 2026-10-21" are in `positions-audit/evidence/curator-comments-2026-10-21.md`.

## The verdicts

- **P-102**: rewritten. Its scope changes at his later word of 2026-10-06 (rule 12). "Every sealed-tree edit" becomes "Every edit of source code in the original tree", and "the corpus" becomes "the test suite". The rest stays word for word.
- **P-103**: kept, word for word. Its sources are listed below for the history, since the tool cannot add them.
- **P-123**: struck. It is a one-time approval, carried out, that carries no standing rule (rule 3). His word of 2026-09-27 also says that a one-off go such as "Batch 5 go" does not belong in the permanent record (rule 12). There is one question for him, on the route C half. The apply also rewrites F-39's pointer to P-123, because the tool refuses the strike while that pointer stands.
- **P-124**: kept, word for word, with a question for him. "A failing example is not respelled for walk" is, in its general form, an agent's extension of his option 1. Rules 0 and 2 conflict here (see below).
- **P-125**: kept, word for word. Its sources are listed below for the history.

## P-102

**Before.**

> - P-102 **Test first, the test kept.** Every sealed-tree edit starts from a failing test added to the corpus: the worker writes the test first, verifies that it actually fails, makes the fix, proves it passes, and the test stays in the corpus from then on; the full suite stays green. The test needs no commit of its own: the test and the fix may land in one commit. How the test is written is in the `fortress-repo` skill's tests part.

**After.**

> - P-102 **Test first, the test kept.** Every edit of source code in the original tree starts from a failing test added to the test suite: the worker writes the test first, verifies that it actually fails, makes the fix, proves it passes, and the test stays in the test suite from then on; the full suite stays green. The test needs no commit of its own: the test and the fix may land in one commit. How the test is written is in the `fortress-repo` skill's tests part.

**What changed, and its source.** Both changes come from rule 12. His later word was about this rule, on the `fortress-repo` skill's review page. There the rule read "Write the test before the fix for every edit under the original tree. ... Keep the test in the corpus."

1. "Every sealed-tree edit" becomes "Every edit of source code in the original tree".
   - 2026-10-06 17:19, page comment (B3:7743): the rule should cover every source code edit under the original tree. His reason: agents were confused about how to write a test for a specification edit.
   - 17:28, page comment (B3:7798): the coordinator's first wording listed "Java, Scala, the grammars and the library". He found the list overly specific and asked for "source code" alone. For him, source code covers Java, Scala and the library, which is in Fortress.
   - The skill took both (`038df2f6e`, `5b9ef1970`). Its rule now reads "for every edit of source code in the original tree" (`SKILL.md`, "Rules for every task").
   - The entry kept "Every sealed-tree edit" through both rewrites of 2026-10-13 (`ab933086b`, `1632b5dfa`), and that wording covers `Specification/`. So the entry was stale.
   - "Original tree" is the skill's term and his own word at 17:19. "Sealed tree" named the same tree: it is the tag `sealed-tree` on `75cca6683`.
2. "the corpus" becomes "the test suite", twice.
   - 17:32, page comment (B3:7834): he found "keep the test in the corpus" a strange phrasing. To him, a test written for a fix simply becomes part of the test suite. He added that he might only be nitpicking on style.
   - The coordinator answered that "corpus" was record jargon. It replaced the word with "test suite" or "test folder" throughout the skill (`fee8a876d`). P-102 is the only entry of POSITIONS that still says "corpus".
   - This change is about words, not scope. If he prefers "the corpus", the first change can stand alone.

**The rest, word for word (rule 0).**
- "the worker writes the test first, verifies that it actually fails, makes the fix, proves it passes": his own words, at 2026-09-17T16:50:18.180Z.
- "and the test stays in the test suite from then on": two messages. At 01:31:22.625Z: the work is test driven, and its tests are nailed down. At 16:50:18: the rule was meant against one-off validation scripts that are not part of the future builds.
- "the full suite stays green": 16:50:18. He said that running the suite once per landed batch is in line with the rule.
- The one-commit sentence: his "Yes." on the skill page at 2026-10-04 01:25 (B3:3015). It answered the coordinator's reply that proposed dropping "committed alone". That reply followed his 01:08 comment (B3:2934): he did not recall asking for the test and the fix in separate commits, and he worried about the ceremony burden.
- The pointer to the tests part is not a decision. `references/tests-writing.md` holds the detail.

The judgement disagrees with scout §1, which marks the origin thin, and I agree with the judgement. The text rests on his own words of 01:31:22 and 16:50:18, not on a yes to the coordinator's sentence.

**What leaves POSITIONS.** Nothing.

**History line.** The tool writes one block with the rewrite. "What record.py wrote" gives it whole. It holds the reason above. It also puts back the sources that the judgement names, each with the coordinator's text that it answered:
- 01:31:22, on step 2 of the coordinator's 01:25:36.976Z plan;
- 16:50:18, on the coordinator's 16:26:23.623Z question whether the suite stays green per edit or per landed batch;
- the "Yes." of 10-04, and the 10-06 comments.

It also notes one error in the history. The block of 2026-10-13 19:09Z names `bc8902f47` for its text, but that text holds the one-commit sentence, which `f6085e220` added (judgement, "Doubts about the report").

**Questions for him.** None. The only open point is optional: if he prefers "the corpus", the second change is dropped.

**Pointers elsewhere.** None of these lines needs a change because of this rewrite. Four were already stale before it.
- `.claude/skills/coordinator/references/sources.md:47`, "The skeptic: P-104, P-102's clause.". The clause (the skeptic reads the transcript) was cut at `1632b5dfa` and went to `references/batch.md`, "The roles". The line would need "P-102's history, its block of 2026-10-13 19:58Z". Stale before.
- `.claude/skills/fortress-repo/references/sources.md:149`. It says "every sealed-tree edit", narrowed to an edit of source code at his comment of 2026-10-06. After this rewrite the entry itself says "source code", so the parenthesis would only give the source of that scope: his comments of 2026-10-06.
- `sources.md:12` and `:150` cite the title, which is unchanged. They need nothing.
- `sources.md:158` and `:267` cite P-102 for the bug-report sentence, which says that a fix starts from the ledger row's reproduction. `ab933086b` moved that sentence to `tests-writing.md`. Each line would name `tests-writing.md` or P-102's history for it. The second half of `:267`, that the test needs no commit of its own, is still P-102's. Stale before.
- `explorations/coordinator/climb-batch-workflow.md:95`: "The test and the fix may share a commit; the order is read in the transcript (P-102, ...)". The first half is still P-102's. The second half is the clause that was cut, now in `batch.md`, "The roles". Stale before.
- `process-engineering/coordinator-skill-outline-review.md:63` records the move of 2026-10-13. It needs nothing.
- FACTS, PLAN, the review queue, HELD, BOOT and the open asks have no pointer to P-102 (`pointers.py 102`).

## P-103

**Before and after.** Kept, word for word:

> - P-103 **The suite's verdict is the check.** A test passes or fails, as the team designed the suite, and a value that matters is asserted in the test with the mechanisms the suite already has (an `assert` in an interpreter test, `run_out_equals` in a compiled one). What a test prints beyond its checks does not matter. So no expected-output files are added; none of it is offered to him again.

**Why.** It is his decision, condensed fairly (rule 1; judgement). Each part, against his words:
- "A test passes or fails, as the team designed the suite, and a value that matters is asserted in the test": two messages.
  - 2026-09-29T18:52:49.920Z answered the coordinator's 18:07:00.343Z offer to take the "before" outputs once per base and share them among the rungs. He asked what a suite is for if it cannot simply be run to green, and said that the values must be part of the test.
  - 2026-10-02T15:48:05.965Z: the suite's original design has a mechanism for checking the values that are important to check.
- "with the mechanisms the suite already has (an `assert` in an interpreter test, `run_out_equals` in a compiled one)": the coordinator's gloss of his "mechanism", first written in its reply of 18:53:42.995Z. Rule 7 keeps it: it neither narrows nor adds. Both are checks that the team's suite already has: `FileTests.java` reads `run_out_equals`, and 341 of the 667 programs in `ProjectFortress/tests/` call `assert` (scout §2). `tests-writing.md` names the same two.
- "What a test prints beyond its checks does not matter": two messages. At 2026-09-29T19:03:33.775Z, after the coordinator's 19:01:59.766Z answer that the 18 tests which print differently are the team's own, he said that the suite does not care what they print, because it does not matter. At 15:48:05 on 10-02: when the suite's designers let a test pass without a further check, its outputs need no control.
- "So no expected-output files are added; none of it is offered to him again": 15:48:05 again. It answered the coordinator's 15:40:56.635Z offer of expected-output files. He said that it was decided in the post-mortem and is not to be brought up again.

**What leaves POSITIONS.** Nothing.

**History lines.** The tool cannot write these, since the entry does not change. They are listed under "History lines for the entries kept word for word".

**Questions for him.** None.

**Pointers elsewhere.**
- `PLAN.md:567` and `review-queue.md:1201` cite the number and title. They need nothing.
- `.claude/skills/coordinator/references/sources.md:47`, "No comparison and no baseline: P-103's clause.". That clause was cut at `1632b5dfa` and went to `batch.md`, "The roles". The line would need "P-103's history, its block of 2026-10-13 19:58Z". Stale before this audit.
- These cite the title, which is unchanged, and are records of their day. They need nothing:
  - `climb-batch-workflow.md:43`;
  - `synthesis.md:84` and `:297`;
  - `CLIMB-BATCH-9.md:74` and `:146`;
  - `CLIMB-BATCH-10.md:75`;
  - `coordinator-skill-outline.md:204`, `:297`, `:307` and `:312`.
- This note is not about a pointer (judgement, "Doubts about the report"). `gate.md`, "Comparing with an earlier run", still gives masks for printed output "If your brief asks you to compare the interpreter tests with a base run". It sits beside P-103's "does not matter" and does not say how the two meet. The masks came from P-123's old first clause, batch 5's first default. This is for the coordinator, with the strike of P-123.

## P-123

**Before.**

> - P-123 **Row 366's three-line fix waits for a rung of its own, and route C gets no entry in the specification's Proposed Features.** Both are batch 5's defaults, which he took: the fix is not in design B as he decided it (P-41), and Appendix I already carries route C, the alternative to the flat tower (P-96).

**After.** Struck.

**Why.**
- **Rule 3: a one-time approval, carried out, that carries no standing rule.**
  - His only word is "Batch 5 go", at 2026-09-26T11:08:59.285Z. It answers the coordinator's ask of 10:49:36.728Z, which I read whole in the transcript (B1:6966).
  - The ask said: "Three small choices left, each with a default the batch uses unless you say otherwise". Two of the three were "A related three-line fix (row 366) waits for a later rung instead of riding with the size work." and "The spec gets no extra appendix entry for route C. The changes appendix and the decision record already keep it."
  - It ended: "The ask: go for batch 5 with those defaults." So each default was for that batch.
  - Both were carried out. Rung Z left row 366: "Row 366 was not touched (Q3 = (b))" (`compile-ladder/climb-batch-5/RECORD.md:49`). Rung S wrote route C into Appendix I (`3924e7ec3`; `changes.tex:4119`) and wrote no entry in Proposed Features (`future.tex` has no "route").
- **Rule 12: his later word settles it.**
  - At 2026-09-27T02:26:42.155Z he quoted a line from the coordinator's proposal of 02:04:55.936Z, its Q1: "One-off gos like "Batch 5 go" or "(a), push" live only in that batch's record." He wrote that this does not need to be entered into the permanent record at all.
  - `892687076` then removed the pure gos but kept this one. `03f215fe4` kept it again, as "the go that took the three defaults, which stand". But the defaults were the batch's, and the batch has landed.
- **The reason clause would fail rule 8 if the entry stayed.**
  - "the fix is not in design B as he decided it (P-41)" is the coordinator's: `ab933086b` added it from Q3 of `CLIMB-BATCH-5.md`. It was not in the ask that he answered.
  - Its premise is doubtful. His "All right. B it is." (2026-09-24T16:17:27.464Z) answered the coordinator's ask of 15:39:10.560Z. That ask said that what B commits him to is in its earlier message and in § 9 of the design brief. § 9 lists "row 366's three `ONLY` lines taken with it" under B (`reviews/size-runtime-design-brief.md:349`).
- "Appendix I already carries route C" is true today. It was not true when he gave the go: the ask said "already keep it", but rung S wrote it later that day. This does not change the verdict.

**Rules in conflict.** Rule 6 and rule 3 point different ways on the route C half.
- By his test of actionable (rule 6), "route C gets no entry in the specification's Proposed Features" is actionable, since it says what is not pursued.
- Rule 3 strikes a one-time approval that has been carried out, unless it carries a standing rule.
- I read the route C default as the batch's, for rung S. The ask gave redundancy as its reason: "The changes appendix and the decision record already keep it". P-96 already says where route C lives: Appendix I's revival section gives each change "the way back to route C".
- So I strike the whole entry, and put the route C half to him as question 1. I did not force it.

**What leaves POSITIONS, and where it goes.**
- **Row 366's fix.** The open failure stays in the gap ledger as row 366 (NEGATIVE-VERIFIED, with the expected failure `XXXOprParamRungS.test`). No line of PLAN, the review queue, HELD or BOOT schedules its rung (scout §5). Scheduling it is the coordinator's work, not a question for him. It gets no queue item: he took the default, so nothing waits for his review.
- **Route C.** P-96 holds Appendix I as its place.
- **F-39.** It ends "...works on its reproducer, and the row waits (P-123)". `record.py` refuses `remove` while a pointer to the entry remains, so the apply rewrites F-39 to end "...works on its reproducer, and the row is open." Its source is the ledger's row 366. This is the one line outside the chunk that the apply touches. The brief says to edit none of them, but the strike cannot run without this one.

**History line.** The tool writes one block with the removal, and one with F-39's rewrite. "What record.py wrote" gives both whole. The removal's block puts back the three sources that the judgement names: the go, his word of 09-27, and "B it is". Each comes with the coordinator's text that it answered.

**Questions for him.**
1. Batch 5's go took "no extra appendix entry for route C", a default for rung S. I strike it with the go, since P-96 already gives route C its place in Appendix I. Or is it a standing rule that route C never goes into Proposed Features? If so, it would become a clause of P-96.

**Pointers elsewhere.**
- `FACTS.md:32`, F-39: rewritten in the apply (above).
- `review-queue.md:393` and `:394` cite "P-123's history, its block of 2026-10-13 20:01Z". The history stays, so they need nothing.
- `.claude/skills/coordinator/references/sources.md:48`, "Masked differences and respelled lines: P-123's clause.". These clauses were cut on 2026-10-13 (`1632b5dfa`, `9dd34a1f2`). After the strike, the line would name P-123's history, its blocks of 2026-10-13 19:58Z and 20:01Z.
- `.claude/skills/fortress-repo/references/sources.md:617` names "POSITIONS P-123, "Row 366's three-line fix waits ...", its masking sentence". It would name P-123's history, its block of 2026-10-13 20:01Z, where the masking sentence stood. The tool does not check this quote, since it is outside the record.
- `sources.md:618` ("P-123's last sentence ... was already in "Names, comments, citations"; no change") is a record of its day. It could name P-123's history, its block of 19:58Z.
- `sources.md:161` and `:228` cite POSITIONS "The gate's comparisons.". That is P-123's title before `ab933086b`, so both lines were stale before this audit. Each would name P-123's history, its block of 2026-10-13 19:09Z. `pointers.py` does not find them, since they give no number.
- `coordinator-skill-outline.md:460` ("Stays: row 366 waits; no route C entry goes into Proposed Features.") is a record of the outline's day. It needs nothing.
- P-41 and P-96: only P-123 points to them here, and nothing points back.

## P-124

**Before and after.** Kept, word for word:

> - P-124 **The specification's examples join the gate at zero red.** `ant testSpecData` runs them under walk as a gate step, and every example must pass. A failing example is not respelled for walk, and no list of known red examples is kept: the implementation is fixed instead. Built.

**Why, part by part.**
- **The title, "`ant testSpecData` runs them under walk as a gate step, and every example must pass", and "no list of known red examples is kept".** These are his yes (rule 1). At 2026-10-04T20:27:30.337Z he answered "Yep. Option one." to the coordinator's question of 20:24:58.453Z, "Should `testSpecData` join the gate?". I read that question whole in the transcript (B3:5010). Its options:
  1. Join once the five red examples are green: "the target joins the gate at zero red". He took this one.
  2. Join now, with the five listed as known red. Not taken.
  3. Respell the five with the element type written, "a text change in the revision form, to cover a gap in walk". Not taken.
- **"A failing example is not respelled for walk, ... the implementation is fixed instead".**
  - For the five examples of that day, this is his choice of option 1 over option 3.
  - As a rule for any example that fails later, consolidation chunk P3 wrote it at `ab933086b` (2026-10-13) and gave no reason. The judgement calls it "a default that an agent landed, still waiting for his review (a fair extension of his option 1)".
  - The ask's own words support the extension. It set option 3 apart as a revision of the specification "to cover a gap in walk", and it recommended option 1 because "then the gate guards all of the specification's examples".
  - The entry's first text (`23863c1d6`, written 17 s after his answer) already said "the examples are not respelled for walk and no list of known red examples is kept".
- **"Built."** It is true. Every gate summary from climb batch 11 to climb batch 20 holds `specdata/SpecDataJUTest 130 0 0 0`, and `gate.md` makes the target step 4 (judgement). I keep it as the empty case of "what is still to build" (rule 9; see "The rules, where they fit badly").

**Rules in conflict.** Rule 2 would move the general form to the review queue. Rule 0 keeps a correct sentence word for word. His comments of 2026-10-21 point the same way as rule 0: at 23:21 he said not to touch a wording that is correct, and at 23:29 he said the trial was "too aggressive" in moving sentences out. My reasons to keep it:
- The sentence is a fair extension of his choice.
- P-124 is the rule's only home: no part of the skills states it (grep for "respell" in `.claude/skills/`).
- Without it, a worker who meets a newly failing example could respell it. For the five, he refused that when he chose option 1 over option 3.

So I keep it and put the general form to him as question 1, in rule 5's form: the text stays until he answers. If he would rather it wait in the queue, `review-queue-items-c8.md` drafts the item as Q-?1, for that case only.

**What leaves POSITIONS.** Nothing. The ask rested on one measurement, "5 of 130", and the entry no longer states it, so rule 11 is already met.

**History lines.** The tool cannot write these, since the entry does not change. They are listed under "History lines for the entries kept word for word".

**Questions for him.**
1. On 10-04 you chose option 1 over respelling the five red examples. P-124 makes that a rule for every example: an example that fails later is not respelled for walk, and the implementation is fixed. Keep it as a rule for every example? Or strike it as done with the five, or let it wait in the review queue?

**Pointers elsewhere.**
- `FACTS.md:128`, F-114: "It builds P-124." It needs nothing.
- `PLAN.md:573` still says that the examples are "today outside the gate", and that `ant testSpecData` "joins the gate at zero red, once its five red examples are green ...: the batch that lands that half adds it to the gate's stages". It has been stale since climb batch 11. It would say that `ant testSpecData` has been a gate step since climb batch 11, at zero red, 130 of 130 (P-124).
- `review-queue.md:1254` is in the settled list. It needs nothing.
- These cite the title, which is unchanged, and need nothing:
  - `climb-batch-workflow.md:216`;
  - `climb-batch-workflow.js:129`, `:168` and `:1640`;
  - `.claude/skills/fortress-repo/references/sources.md:122` and `:544`.

## P-125

**Before and after.** Kept, word for word:

> - P-125 **The suites run Fortress in parallel, pinned at four threads in `build.xml`.** Parallelism is native to Fortress, so a one-thread suite has a blind spot, and sparing a four-CPU machine is no reason for one. A test that fails or varies under parallelism is written wrong, such as a write that needs `atomic`, or it exposes a defect: either is fixed, never hidden by a pin. The pin makes every run the same, whatever the calling shell sets. Built.

**Why, part by part.**
- **"The suites run Fortress in parallel", the reason, and the rule for a test that fails under parallelism.** These are his decision, in his own words (rule 1). His message of 2026-10-08T15:53:33.559Z answered the coordinator's question of 15:31:57.152Z: should the suites keep running Fortress programs on one thread? The coordinator had recommended measuring first.
  - He said that the pin to one thread turned off parallelism, which is native to Fortress, and made a blind spot.
  - He said that a test made flaky by parallelism is written wrong, since something in it needs to be atomic.
  - He dismissed sparing the four-core machine as a reason.
  - He asked what happens if there are correctness issues, and asked for a test run at once.
- **"or it exposes a defect: either is fixed, never hidden by a pin".** This is the coordinator's fair wording of his question about correctness issues (judgement).
- **"pinned at four threads in `build.xml`" and "The pin makes every run the same, whatever the calling shell sets."** These are his yes (rule 1): "So yeah, pin it to four. That's good." (2026-10-08T18:11:36.440Z). It answered the coordinator's question of 18:07:13.987Z, first asked at 17:42:19.408Z. Its option 1 was "Pin them at 4. Every run is parallel and the same on any machine ... independence from the calling shell".
- **"Built."** It is true. `build.xml:1186` (`fastTrack`) and `:1431` (`systemShard`) set `FORTRESS_THREADS` to 4. I read both lines.
- The pin followed one measurement: 516 and 1,815 tests at four threads, with no failures. The entry does not state it, so rule 11 is already met. F-99 and `process-engineering/suites-at-four-threads.md` hold it.

**What leaves POSITIONS.** Nothing.

**History lines.** The tool cannot write these, since the entry does not change. They are listed under "History lines for the entries kept word for word".

**Questions for him.** None.

**Pointers elsewhere.** `FACTS.md:114`, F-99, "(P-125)", needs nothing. There is no other pointer (`pointers.py 125`; scout §6).

## History lines for the entries kept word for word

The tool has no route for these lines. An entry line equal to the entry is skipped, and a call that changes nothing is refused. I tried this again on this copy: `fix-c8/probe-unchanged-out.txt`. The lines are written in the history's provenance form, ready for a provenance-only block once the tool has one, such as a `note N` command. Each gives his message's time and a fair rewording. A quote appears only where a short answer is itself the decision (rule 10).

**P-103**
- 2026-09-29T18:52:49.920Z · he asks what a suite is for if it cannot simply be run to green, and says that the values that matter must be part of the test · answering the coordinator's 2026-09-29T18:07:00.343Z offer to take the "before" outputs once per base and share them among the rungs.
- 2026-09-29T19:03:33.775Z · the suite does not care what a test prints beyond its checks, because it does not matter · answering the coordinator's 2026-09-29T19:01:59.766Z (the 18 tests that print differently are the team's own).
- 2026-10-02T15:48:05.965Z · it was decided in the post-mortem: the suite's original design has its own mechanism for the values that matter, a test that passes needs no control of its outputs, and the offer is not to be raised again · answering the coordinator's 2026-10-02T15:40:56.635Z offer of expected-output files.
- The note that `d39d6fe75` wrote with these times was lost when `a88e52bf7` rebuilt the histories (scout §1). These lines put the times back.

**P-124**
- 2026-10-04T20:19:25.798Z · he asks whether the specification's examples were ever run, and whether they are part of the suite · unprompted, quoting `repo-internals.md`'s line on `SpecData/`.
- 2026-10-04T20:21:39.723Z · he asks for the red count to be measured · answering the coordinator's 2026-10-04T20:19:51.535Z (the examples are outside `testFast` and the gate; it offers to run them).
- 2026-10-04T20:27:30.337Z · his words: "Yep. Option one." · answering the coordinator's 2026-10-04T20:24:58.453Z question whether `testSpecData` joins the gate. Option 1 joins at zero red once the five red examples are green; option 2 keeps a list of known red names; option 3 respells the five. The coordinator recommended option 1.
- The general form of "not respelled for walk ... the implementation is fixed instead" is consolidation chunk P3's (`ab933086b`, 2026-10-13). It is a fair extension of option 1, and it is put to him.

**P-125**
- 2026-10-08T15:53:33.559Z · the one-thread pin turned off parallelism, which is native to Fortress, and made a blind spot; a test that parallelism makes flaky is written wrong, since something needs to be atomic; sparing a four-core machine is no reason; test it now · answering the coordinator's 2026-10-08T15:31:57.152Z question whether the suites keep running Fortress on one thread (recommendation: measure first).
- 2026-10-08T18:11:36.440Z · his words: "So yeah, pin it to four. That's good." · answering the coordinator's 2026-10-08T18:07:13.987Z (pin at 4, or remove the pin, whose default is half the CPUs), first asked at 17:42:19.408Z with the options.

## What record.py wrote

**How it ran.** The scratch root `fix-c8/root/` holds copies of the four record files from `explorations/coordinator/`: `POSITIONS.md`, `POSITIONS-history.md`, `FACTS.md` and `FACTS-history.md`. Every other path in it is a symbolic link into the real tree, so that the `from` paths resolve. The tool was the real `explorations/coordinator/tools/record.py`. It ran with `--root` on the copy, with `GIT_DIR` set to the real repository, read only, so that `check --base` can read the base. The base is HEAD at the run, `ed2a45803`. The four record files are the same there as at the scouts' `db0e0ad9b`, and the working tree did not change them. The commands, run from the scratch folder:

    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py apply /home/user/fortress/explorations/coordinator/positions-audit/full/evidence/corrections-c8.apply --root root
    GIT_DIR=/home/user/fortress/.git python3 -B /home/user/fortress/explorations/coordinator/tools/record.py check --base HEAD --root root

**check before the apply** (`fix-c8/check-before.txt`), exit 0:

    record.py check: FACTS.md 198 entries, POSITIONS.md 83 entries; 0 failures; reported: size 2

**apply** (`fix-c8/apply-out.txt`), exit 0:

    P-102: rewritten
    P-123: removed
    F-39: rewritten

**check after the apply** (`fix-c8/check-after.txt`), exit 0:

    record.py check: FACTS.md 198 entries, POSITIONS.md 82 entries; 0 failures; reported: size 2

What changed, against the run before the apply:
- POSITIONS has 82 entries, down from 83 (P-123 is gone).
- The 18 POSITIONS entries over 600 characters are the same 18. None of this chunk is among them, before or after.
- FACTS's size list is unchanged, and F-39 is not on it.
- No `from` path or heading failed to resolve. The two "reported" lines are the two size lists.

**Refusals, tried on purpose.**
- **Without F-39's line**, the same apply is refused, and nothing is written (`fix-c8/probe-no-f39-out.txt`, on a second copy, `fix-c8/root2/`):

      record.py apply: the changes are refused:
        F-39 points to P-123, which this call removes; rewrite or remove that pointer first

- **P-103's line, unchanged, with a note**: `record.py apply: nothing changes`, exit 1, and nothing is written (`fix-c8/probe-unchanged-out.txt`). The files were checked with `md5sum` before and after. So the history lines for P-103, P-124 and P-125 have no route through the tool. They are listed above.

**POSITIONS.md and FACTS.md.** In POSITIONS, one line is rewritten (P-102, as in its "After") and one is gone (P-123). In FACTS, one line is rewritten (F-39, which now ends "...works on its reproducer, and the row is open."). The diffs are `fix-c8/POSITIONS.diff` and `fix-c8/FACTS.diff`. The blocks that the tool appended are given below verbatim, from `fix-c8/PH.diff` and `fix-c8/FH.diff`. The time is the copy's clock, and a real apply would stamp its own and name its own `by`.

`POSITIONS-history.md`:

```
### P-102

2026-10-22 01:17Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c8.md`, "P-102" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c8.md`, "P-102" · by the POSITIONS audit's writer for chunk c8 (Opus), proposed for his review: rewritten at his later word on the fortress-repo skill's review page, where the rule read "Write the test before the fix for every edit under the original tree ... Keep the test in the corpus": 2026-10-06 17:19 UTC, it covers every edit of source code in the original tree, since agents were unsure what failing test an edit of the specification owes; 17:28 UTC, "source code" with no list of its kinds; 17:32 UTC, "keep the test in the corpus" read strangely to him, a test written for a fix simply joining the test suite. The skill took all three (`038df2f6e`, `5b9ef1970`, `fee8a876d`); the entry kept "Every sealed-tree edit" and "the corpus" through the rewrites of 2026-10-13. The rest kept. Its sources: 2026-09-17T01:31:22.625Z, in his questions on step 2 of the coordinator's 01:25:36.976Z plan: the work will be test driven, and its tests nailed down; 2026-09-17T16:50:18.180Z, answering the coordinator's 16:26:23.623Z question whether "the full suite stays green" holds per edit or per landed batch: the sentence was a rule against one-off validation scripts that stay out of the future builds, per batch is in line with it, and the workers write the failing test, see it fail, make the fix and prove it works; on the skill's page, 2026-10-04 01:25 UTC, his "Yes." to the coordinator's reply proposing to drop "committed alone", on his comment of 01:08 UTC that he did not recall asking for the test and the fix in separate commits and worried about the ceremony burden. The block of 2026-10-13 19:09Z names `bc8902f47` for a text whose one-commit sentence `f6085e220` added.

- P-102 **Test first, the test kept.** Every sealed-tree edit starts from a failing test added to the corpus: the worker writes the test first, verifies that it actually fails, makes the fix, proves it passes, and the test stays in the corpus from then on; the full suite stays green. The test needs no commit of its own: the test and the fix may land in one commit. How the test is written is in the `fortress-repo` skill's tests part.

### P-123

2026-10-22 01:17Z · removed · from `explorations/coordinator/positions-audit/full/evidence/corrections-c8.md`, "P-123" · from `explorations/coordinator/positions-audit/full/evidence/judgement-c8.md`, "P-123" · by the POSITIONS audit's writer for chunk c8 (Opus), proposed for his review: struck as a one-time approval, carried out, that carries no standing rule, and at his word of 2026-09-27T02:26:42.155Z: on the coordinator's line "One-off gos like "Batch 5 go" or "(a), push" live only in that batch's record." (its proposal of 02:04:55.936Z), this does not need to be entered into the permanent record at all; `892687076` removed the pure gos but kept this one, and `03f215fe4` kept it as the go that took three defaults which stand. Its source: his "Batch 5 go" at 2026-09-26T11:08:59.285Z, to the coordinator's 10:49:36.728Z ask to go for batch 5 with its defaults, each one a default the batch uses: row 366's three-line fix waits for a later rung instead of riding with the size work, and the specification gets no extra appendix entry for route C, since the changes appendix and the decision record keep it. Both were carried out: rung Z left row 366 (`compile-ladder/climb-batch-5/RECORD.md`), and rung S wrote route C into Appendix I (`3924e7ec3`), not into Proposed Features. The reason "the fix is not in design B as he decided it" was the coordinator's, added at `ab933086b` from `CLIMB-BATCH-5.md`'s Q3, and doubtful: his "All right. B it is." at 2026-09-24T16:17:27.464Z answered the coordinator's 15:39:10.560Z ask, which named the design brief's section 9, and section 9 lists row 366's three lines under B. Row 366 stays open in the gap ledger; route C's place is Appendix I (P-96). Whether route C stays out of Proposed Features as a standing rule is put to him.

- P-123 **Row 366's three-line fix waits for a rung of its own, and route C gets no entry in the specification's Proposed Features.** Both are batch 5's defaults, which he took: the fix is not in design B as he decided it (P-41), and Appendix I already carries route C, the alternative to the flat tower (P-96).
```

`FACTS-history.md`:

```
### F-39

2026-10-22 01:17Z · rewritten · from `explorations/coordinator/positions-audit/full/evidence/corrections-c8.md`, "P-123" · by the POSITIONS audit's writer for chunk c8 (Opus), proposed for his review: the pointer to P-123 dropped, since this correction strikes P-123, batch 5's go, carried out; the row's state stated for itself: open in the gap ledger, row 366, with its expected failure `XXXOprParamRungS`; no line of PLAN schedules its fix.

- F-39 **An operator static argument is a compile-time name on both paths and by the specification, and no code reads it at run time.** The specification and walk substitute its name into the trait's methods; the compiled path carries it in the class name, with no descriptor. Only two tests declare an `opr` static parameter. Compiled, `Op[\+\]()` dies with `NoSuchMethodError` on its descriptor's `factory()` (row 366). A three-line fix in `MethodInstantiater` works on its reproducer, and the row waits (P-123). Detail: `perf-probes/nat/opr-kind-history.md` sections 2 and 3.
```

**What check does not see.** It checks pointers only inside FACTS and POSITIONS, and only for a live target and its quoted words. The lines elsewhere that this proposal leaves stale, and the ones that were stale before it, pass. Each entry's "Pointers elsewhere" lists them. They are:
- the skills' `sources.md` lines that cite P-123 or its former title "The gate's comparisons.";
- `.claude/skills/coordinator/references/sources.md:47` on P-102's and P-103's cut clauses;
- `PLAN.md:573` on P-124.

## The rules, where they fit badly

- **Rule 3 against rule 6, on P-123's route C half.** It says what is not pursued, so his test counts it as actionable. Yet it was a batch's default, carried out. I struck it and asked him (P-123, question 1).
- **Rule 2 against rule 0, on P-124's general sentence.** It is an agent's extension, so rule 2 would move it. Yet it is correct and fairly extends his choice, and his comments of 2026-10-21, 23:21 and 23:29, ask that correct text stay. I kept it and asked him (P-124, question 1), and drafted the queue item in case he prefers rule 2.
- **Rule 9 and "Built.".** P-124 and P-125 end with the one word "Built.", and both are true. Rule 9 moves a list of what is built to the history, but this is no list. It is the empty case of "what is still to build", which `record.md`'s form asks a POSITIONS entry to state. Rule 0 keeps it.
- **The brief's "edit none" against the tool, on F-39.** `record.py` refuses to remove P-123 while F-39 points to it. The apply therefore rewrites F-39's last clause on the copy. Without that, the strike cannot be shown at all.
- **Rule 12 on P-102's "corpus".** His comment was on style, and he said he might be nitpicking. It is still his word on this entry's own rule, and the skill took it at his word. So I applied it and marked it as the part that he can decline.
- **Rule 10 and the history.** His messages behind P-102 use words that I reworded rather than quoted, since none is a short answer that is itself the decision. The quotes kept are "Yes.", "Batch 5 go", "All right. B it is.", "Yep. Option one." and "So yeah, pin it to four. That's good.".
