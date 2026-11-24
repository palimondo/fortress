<!-- This file is the step-by-step diff between the method that consolidated the record in October 2026 (the consolidation of 2026-10-13 and the clarity rewrite of 2026-10-22) and the record-landing workflow as it stands on 2026-11-24, with the smallest change of the existing workflow at each step that differs or is missing. Written 2026-11-24 by an Opus worker for the curator and the coordinator, reading only, at `main` `d42a45f383`; it designs no new workflow. -->

# The October method and the record-landing workflow: the diff

## How to read this file

**record**
: The project's memory under `explorations/coordinator/`: FACTS (what is established about the tree), POSITIONS (the curator's decisions), their history files, PLAN, the review queue and INDEX.

**entry**
: One numbered line of FACTS (F-n) or POSITIONS (P-n). Its **history** is its block in `FACTS-history.md` or `POSITIONS-history.md`: each earlier text, word for word, with a provenance line.

**the method**
: What consolidated the record in October. It has two parts. The **consolidation** of 2026-10-13 cut FACTS and POSITIONS from 361K to 200.6K characters. The **clarity rewrite** of 2026-10-22 made each entry read on its own, and grew FACTS from 139.1K to 221.8K; the curator accepted that growth.

**the workflow**
: The record-landing workflow, `explorations/coordinator/tools/record-landing/`, which runs after each batch lands.

**run 1, run 2**
: The two uses of the method. Run 1 goes over the whole record. Run 2 handles one landing.

**batch, rung, draft, gather**
: A batch is one run of several tasks (rungs), each with its own worker. A rung writes its findings as a **draft** entry. The batch's **gather** stage adds each draft to FACTS. A batch **lands** when its work is committed to `main`.

**the pass**
: The record's own rule for turning a worker's draft into an entry (`.claude/skills/coordinator/references/record.md:71-86`).

Other terms are defined where they first appear. Paths without a folder are in `explorations/coordinator/tools/record-landing/`. "Oct-briefs" is `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/october-briefs/`; I used the briefs saved there (its `README.md` was not yet written) and did not print them again from the transcript. "Draft rule" is `explorations/coordinator/process-engineering/record-rule-draft.md`. Clarity briefs are cited at today's lines; at `913ba1cbfc`, the version that the FACTS run used, `writer.md` has no findings clause and its lines after 22 are one lower.

Each block below gives: the step; what the method did, with its source; what the workflow does, with its source; one verdict word (same, differs, missing); and, where it differs or is missing, the smallest change of the existing workflow, by the file that would change.

## 0. The summary of the method, checked

The coordinator's summary is right on the six questions, the Sonnet scout, the Opus writer by subject area, "merge where one home is right", "remove none", the named home of each cut, the tool that copies the old line, and the two runs. Five points are wrong or need a limit:

1. **"Keeps every condition"** is the clarity writer's line (`record-clarity/writer.md:28`), not October's. October's definition says only that questions 3 to 5 "move a sentence; they do not lose it" (draft rule `:140`). The clarity rewrite restored conditions that the October cut had lost (`evidence/briefs-compared.md:121`).
2. **"A cold reader, a checker, one round of fixes and a judge"** ran only on 10-22. On 10-13 no per-entry checker ran; the coordinator applied each file and refused none (`evidence/consolidation-of-october.md:36`, `:95`). The clarity run also had two stages that the summary leaves out: an **assessor** before the writer, and a **second cold read** after the fix (`record-clarity/README.md:9`, `:14`).
3. **"A test of decisions and the size of the whole record as the measure"** is October's only. The clarity rewrite had no quiz and no total: "Clarity comes first" (`record-clarity/writer.md:36`), and the curator accepted the growth (`HIS-WORDS.md`, Part 2, item 11).
4. **"After the curator has judged a pilot"**: in October he judged the trial of the ten largest entries on a page, not the pilot chunks. The two pilot chunks were judged by the record test, and the coordinator started two more writers before its grade (`consolidation-of-october.md:31`, `:101`). In the clarity run he judged a POSITIONS pilot of ten entries; the FACTS run began with a calibration chunk of five entries, applied "at his word of 08:19 UTC", his word on the POSITIONS pass (commit `09e1338df3`).
5. **Run 2 has a written source but no judged run.** Its source is the pass (`record.md:71-86`) and the draft rule's items 43 to 52 (`:318-330`), written on 10-13. The commit stage that the pass names never ran it (`process-engineering/record-landing-workflow.md`, "The batch's own stages"). Until the workflow, hand passes did this work, and no record test ever measured them. "Find, for each finding, the entry that owns its subject" is the pass's step 1, "rewrite in place the entry that it changes" (`record.md:77`), and the curator's words (`HIS-WORDS.md` 6.2, 8.3, 8.6), not a step that ran in October.

## 1. The diff, step by step

### The shared core

**C1. The goal, quoted to the writer.**
- Method: the writers' brief quoted the curator's goal whole: "significantly smaller ... but not lost any reasoning capabilities", with the measure, 145K for both files and the record test at 27 of 30 or better (Oct-briefs `05b-writers-template-after-edit.md:6-8`).
- Workflow: no goal. The writer's question is the new line of each owed change, "so that it says no more and no less than its ground" (`entries.md:15`).
- Verdict: **missing.**
- Change: quote his goal in `entries.md`, "The problem" (`:9-11`). The number for today is a gap (section 4).

**C2. The definition and its worked examples.**
- Method: "What an entry is" and the five worked examples, "Follow them exactly" (Oct-briefs `05b`:12; draft rule `:123-256`).
- Workflow: the writer reads "What an entry is" and "The pass" (`entries.md:20`), the checker the same (`check.md:20`). Neither reads the worked examples, though `record.md:59` asks for them before a consolidation.
- Verdict: **differs.**
- Change: name the worked examples in `entries.md:20` and `check.md:20`.

**C3. The six questions, asked of every sentence.**
- Method: ask each sentence the six questions; 1 and 2 keep it, 3 to 5 move it to the history, the report or another entry (draft rule `:131-140`).
- Workflow: the writer moves detail out only "before you add the clause" that a change owes (`entries.md:38`). A sentence past 600 stays when the report names "the question ... that keeps" it (`entries.md:48`; `check.md:27`), so a named question settles a length failure (`evidence/landing-workflow-traced.md`, section 7, item 4).
- Verdict: **differs.**
- Change: in `entries.md:38`, ask questions 3 to 5 of every sentence of each entry in reach; in `entries.md:48` and `check.md:27`, let only questions 1 and 2 keep a sentence.

**C4. Each entry near 600 characters, with a named reason above it.**
- Method: 600 is a check, not a cap; an entry above it names the decision or misreading that needs the room (draft rule `:144`; Oct-briefs `05b`:28). Clarity: "near 600 ... as a check, not a cap" (`record-clarity/writer.md:36`).
- Workflow: the draft is the baseline. A long entry "grows only by the clause that its change owes" (`entries.md:38`); `lengths.py` marks only an entry already over 600 that grew (`lengths.py:6-8`); the judge holds that growth (`judge.md:24`). Nothing asks a long entry to come down. In three runs the 44 batch entries went from 84,660 to 84,573 characters (`landing-workflow-traced.md`, "The answer in short").
- Verdict: **differs.**
- Change: drop the owed-clause bound from `entries.md:38`, `check.md:27`, `judge.md:24` and `lengths.py`, and keep the named reason (C3).

**C5. The total as the measure.**
- Method: October set a chunk budget, "a chunk's total stays under 600 characters times its entries", and the writer fixed its file until the budget held (draft rule `:144`; Oct-briefs `05b`:25); the pass reported "each chunk's total against 600 characters times its entries" (draft rule item 50, `:328`). The clarity rewrite set no budget and no total.
- Workflow: no total of the run, of FACTS or of POSITIONS; `record.py check` reports only the entries over 600 (`record.py:98`).
- Verdict: **missing.**
- Change: `lengths.py` prints FACTS's and POSITIONS's totals at AT (the commit the run starts from) and after, and the changed entries' total against 600 times their count.

**C6. A scout gathers each entry's evidence.**
- Method: a Sonnet scout per chunk, at a pinned commit, gave each entry in at most 1,500 characters: its cited sources and whether they resolve, the section that holds its detail, its first and last commit, its earlier texts, the entries that cite it, and for POSITIONS his dated words (Oct-briefs `03-scouts-template.md:8-19`). The writer used it "instead of reading the reports yourself" (`05b`:20).
- Workflow: a script, `evidence.py`, at the worktree's commit AT, prints each changed entry at the base and at AT, its history blocks of the batch's range, and its cited report sections; `cites.md` lists the entries that name it by number (`evidence.py:12-16`). The design chose a script on purpose (`record-landing-workflow.md:165`). No step looks for an entry that says the same thing without a pointer.
- Verdict: **differs.**
- Change: none for the script's form. The missing search by subject is R2.2 and R2.3.

**C7. An assessor judges every entry by six checks first** (clarity only).
- Method: an Opus assessor marks scope, present meaning, evidence, comprehension, ownership and consistency, and gives keep, reword, reorganize or investigate; only reword and reorganize go to the writer; "Do not mark an entry for a rewrite to make its surface like the others" (`record-clarity/assess.md:9-16`).
- Workflow: the sorter gives each batch entry a change "the pass" with a weight by meaning only: "high, a reader would act otherwise; low, wording or a pointer; none" (`sort.md:32`, `:40`). It has no ownership or consistency check and no "reorganize". 15 of 44 passes got weight none and no rewrite (`landing-workflow-traced.md`, section 7, item 3).
- Verdict: **differs.**
- Change: in `sort.md:32` and `:40`, weigh "the pass" by the six checks of `record.md:43-57`, as `assess.md` does; weight none only when all six pass.

**C8. One writer holds one subject area.**
- Method: each October chunk was one section or a third of one (Oct-briefs `06-writers-chunk-script-rest.md:9-18`), at the curator's wish that the writer have "a shared context" for one subject (`HIS-WORDS.md` 4.7).
- Workflow: one entries writer takes all the batch's entries, of every section, and its ledger rows (`entries.md:11`).
- Verdict: **differs.**
- Change: none for one landing, whose entries are few. For the whole record, see R1.3.

**C9. Merge two entries where one home is right.**
- Method: "Merge two entries where one home is the right answer" (Oct-briefs `05b`:24); 11 entries merged on 10-13 (`consolidation-of-october.md:44`).
- Workflow: the sorter's nine homes hold no merge (`sort.md:30`); the writer writes "for each entry, its whole new line" (`entries.md:44`). `record.py apply` already takes `merge` lines (`record.py`, its header).
- Verdict: **missing.**
- Change: a home "merge into F-n" in `sort.md:30`; `merge` lines allowed in `record.apply` (`entries.md:44`); a merge counted in the checker's coverage (`check.md:25`).

**C10. Remove no entry in the rewrite.**
- Method: "remove none, since the entries that leave move at a later step"; a clause that leaves stays, marked "(moves to <its home>)" (Oct-briefs `05b`:24; `06-writers-chunk-script-rest.md:6`).
- Workflow: no home removes an entry (`sort.md:30`).
- Verdict: **same.**

**C11. Keep every condition** (clarity).
- Method: "Keep every condition, exception and limit" (`record-clarity/writer.md:28`).
- Workflow: the writer reads that section (`entries.md:21`); the checker fails a lost condition (`check.md:26`).
- Verdict: **same.**

**C12. Name the home of each cut, and keep the old line word for word.**
- Method: a provenance line per entry, "`from` the report sections that keep what you cut, `commit` ..., and a note on what moved where" (Oct-briefs `05b`:24); `record.py apply` copies the old line to the history.
- Workflow: the same provenance line (`entries.md:44`); `checks.sh` applies with `record.py apply` (`checks.sh:76`).
- Verdict: **same.**

**C13. Where a cut sentence may go.**
- Method: question 5, "Does another entry or a skill say it already? Give that entry's number, or the skill's part" (draft rule `:137`); 40 October provenance lines named a skill (`briefs-compared.md:93`). The clarity writer sent concepts to `concepts.md` instead, and did not lean on the skill's revival part (`record-clarity/writer.md:33`).
- Workflow: "or to a pointer to the `fortress-repo` skill's part that already says it (question 5)" (`entries.md:38`).
- Verdict: **same** as October. His word of 11-24, "Facts can never cite skill" (`HIS-WORDS.md` 5.3), now overrules both; see section 5, item 4.

**C14. The writer applies and checks its own file.**
- Method: the writer ran `record.py apply` and `check --base` in its own worktree, read the sizes, and fixed the file until the check and the budget passed (Oct-briefs `05b`:25).
- Workflow: the headless writer cannot run `record.py` (`README.md:26`); `checks.sh` applies the file after the round, and the writer sees the sizes only in its fix round (`mech-1.md`).
- Verdict: **differs.**
- Change: none of its own; once `lengths.py` prints the totals (C5), the fix round reads them in `mech-1.md` (`entries.md:52`).

**C15. An Opus writer in the register.**
- Method: Opus writers; from 10-22 a headless Opus stream with the skill writer's standing brief, halfway to ASD-STE100 (`record-clarity/README.md:10`; draft rule `:146`).
- Workflow: the same stream, `writer-stream.sh`, with the same standing brief (`entries.md:5`; `tiers.sh`: Opus).
- Verdict: **same.**

**C16. A cold reader** (clarity).
- Method: an Opus reader with only the skill's core and area parts says what each entry means (`record-clarity/coldread.md:5-11`).
- Workflow: the same brief, unchanged, on `clean.txt` (`record-landing.js:90`).
- Verdict: **same.**

**C17. A check against the sources.**
- Method: the pass's step 3, "The cited report section holds what the entry left out" (`record.md:80`); the clarity checker's fidelity check (`record-clarity/check.md:13`). A cut is right when its new home holds it.
- Workflow: fidelity means "no more and no less than its ground" (`check.md:26`), the ground being the owed change. A cut that no change named fails as "less"; in climb batch 34b two cuts were put back so (`landing-workflow-traced.md`, section 7, item 6).
- Verdict: **differs.**
- Change: in `check.md:26` and `judge.md:24`, a cut passes when the home that its provenance names holds the text.

**C18. One round of fixes.**
- Method: the writer's second round, in the same stream (`record-clarity/fix.md`).
- Workflow: one fix round (`entries.md:52`; `README.md:10`).
- Verdict: **same.**

**C19. A second cold read** (clarity).
- Method: "Reread: a second cold read of the fixed entries" (`record-clarity/README.md:14`).
- Workflow: none; the design dropped it for cost (`record-landing-workflow.md:223`, `:312`).
- Verdict: **missing.**
- Change: one more `coldread.md` agent on `clean.txt` after the fix round in `record-landing.js`. The design's cost lever stands against it.

**C20. A judge decides each entry once.**
- Method: apply or hold; a held entry keeps the record's text (`record-clarity/judge.md:9-10`).
- Workflow: the same two verdicts (`judge.md:19`), plus a hold of a long entry that grows past its owed clause (`judge.md:24`). A hold keeps the batch's draft whole, an owed cut included (F-404 in climb batch 35b; `landing-workflow-traced.md`, section 7, item 7).
- Verdict: **differs.**
- Change: the growth hold goes with C4. That a hold keeps the draft has no small fix: it follows from the draft being the text that the record holds.

**C21. Apply, check that nothing is lost, commit.**
- Method: the coordinator applied each file on `main`, ran `record.py check --base`, and committed (`consolidation-of-october.md:32`).
- Workflow: `final.sh` applies, checks and commits on the run's branch; the Land stage puts the commits on `main`, checks again and pushes (`README.md:11-12`, "Landing its result").
- Verdict: **same.**

**C22. A test of decisions.**
- Method: the record test, a quiz of ten scenarios that a fresh Opus reader answers from the new entries, graded blind; it had to score 27 of 30 or better; it ran on the pilot (29) and the whole result (30) (`consolidation-of-october.md:119-125`; kit `process-engineering/record-test/`). `record.md:98` keeps it for a consolidation.
- Workflow: none; the design left "the record test's quiz" out with no reason (`record-landing-workflow.md:312`).
- Verdict: **missing.**
- Change: run the kit from `record-landing.js` after the judge. It needs his answer on when (`HIS-WORDS.md`, open 8-B) and scenarios for today's entries (section 4).

### Run 2: one landing

**R2.1. The pass owns the wording of every draft.**
- Method: "The pass owns each entry's final wording" (`record.md:75`); the old text goes word for word to the history (draft rule item 46, `:324`).
- Workflow: each entry that the batch added or changed gets a change "the pass" (`sort.md:40`); `record.py` keeps the draft in the history.
- Verdict: **same.**

**R2.2. A new fact goes into the entry that owns its subject.**
- Method: "Write each new fact as an entry, or rewrite in place the entry that it changes" (`record.md:77`); "instead of adding a second" (draft rule item 47, `:325`). His words: "find the duplicates, update the relevant changes" (`HIS-WORDS.md` 6.2).
- Workflow: the gather adds each draft "after the section's last entry" (`climb-batch-workflow.js:1045`), and the workflow keeps it as its own entry; no step searches FACTS for an entry that owns the subject (`evidence/f63-traced.md`, 4.3).
- Verdict: **missing.**
- Change: in `sort.md`, for each entry that the batch added, search FACTS by its terms for an entry on the same subject, and give a change "merge into F-n" where one owns it (with C9).

**R2.3. A changed behaviour is found in every entry that states it.**
- Method: "If a behaviour changed, grep FACTS for it, linked or not. Each entry that states it is updated, or says how it differs" (`record.md:82`).
- Workflow: `cites.md` lists only entries that name a changed entry or row by number (`evidence.py:16`); entries made false come from the post-batch review (`sort.md:19`).
- Verdict: **differs.**
- Change: in `sort.md`, a search of FACTS by the changed behaviour's terms, linked or not; or the same search printed by `evidence.py` into `cites.md`.

**R2.4. Each entry is checked against its cited section and its scope.**
- Method: the pass's step 3: the cited section, the path, the call form, the values (`record.md:79-81`).
- Workflow: the checker's fidelity class reads the entry's Detail and the ground (`check.md:26`).
- Verdict: **same.**

**R2.5. Plan and status leave the entry.**
- Method: "Cut any plan or status from each entry" (`record.md:83`).
- Workflow: "no plan or status in an entry" (`check.md:27`). In practice runs added "which the curator has not decided" and the checker passed it (`landing-workflow-traced.md`, section 5).
- Verdict: **same.**

**R2.6. The pass reports sizes.**
- Method: "each entry's size, each chunk's total against 600 characters times its entries, and each entry still over the measure with the decision ... that needs it" (draft rule item 50, `:328`). The total left the pass's text the same evening (`f6bc1aa753`; `evidence/rules-text-history.md`, 2b).
- Workflow: `lengths.py` lists each changed entry; `entries-report.md` names a question per long entry (`entries.md:48`); no total.
- Verdict: **differs.**
- Change: as C5.

**R2.7. The same pass on POSITIONS at each landing.**
- Method: "Run the same pass on POSITIONS at each landing" (`record.md:86`).
- Workflow: a POSITIONS sentence made false changes by the fewest words; a change of a decision is held (`entries.md:24-26`; his rule of 10-31).
- Verdict: **same.**

**R2.8. When and by whom.**
- Method: after a batch lands, before the next batch or boot reads FACTS, by a worker with a fresh context, not the coordinator (`HIS-WORDS.md` 6.1, 8.2).
- Workflow: launched after the post-batch review; no step of the coordinator's (`README.md`, "Running it").
- Verdict: **same.**

### Run 1: the whole record

The workflow has no entry point for the whole record: its input is one batch's range (`README.md:34-35`). So each run-1 step is missing from it. The clarity workflow holds some of them (section 3).

**R1.1. A trial on the largest entries, read by the curator.**
- Method: ten largest entries cut on a page, old beside new; "Your default is to cut" (Oct-briefs `01-record-rule-trial-brief.md:8`); his page comments became the definition (`consolidation-of-october.md:24-27`).
- Workflow: none.
- Verdict: **missing.**
- Change: not a step of the workflow; it made the definition, which now exists (C2).

**R1.2. A pilot judged before the rest.**
- Method: October: two pilot chunks and the record test before the rest (`consolidation-of-october.md:31`). Clarity: a POSITIONS pilot of ten entries read by him, and a FACTS calibration chunk of five. His rule: three or four entries; no chunk on the whole record before he approves (`HIS-WORDS.md` 4.8; `record.md:92`).
- Workflow: "takes no pilot, since it lands with no step of yours" (`record.md:92`).
- Verdict: **missing.**
- Change: in the run-1 entry point (section 5, item 13), a stop after the pilot chunk, with its page, until his go.

**R1.3. Chunks by section, each with a scout and a writer, side by side.**
- Method: nine chunks of 19 to 42 entries, by section, a scout and a writer each, several running at once (`consolidation-of-october.md:7`, `:29-32`); clarity: 16 chunks of 12, in file order (`consolidation-2026-10-22/runs.json`). `record.md:93`: "chunks of 20 to 32 entries".
- Workflow: one batch, one entries writer (`drive.sh:30-35`).
- Verdict: **missing.**
- Change: section 5, item 13.

**R1.4. The test of decisions and the total on the finished record.**
- Method: the record test on the whole result, 30 of 30; 361K to 200.6K measured (`consolidation-of-october.md:122`; Oct-briefs `07b-step12-brief-as-edited.md:6`).
- Workflow: none (C5, C22).
- Verdict: **missing.**
- Change: as C5 and C22.

**R1.5. Entries that are not about the project leave whole, once.**
- Method: "Step 12": the section "The container" and F-219, chosen beforehand from an outline, each removed only after a grep found its rule in its skill home (Oct-briefs `07b`:12-21; `briefs-compared.md:75-87`).
- Workflow: none.
- Verdict: **missing.**
- Change: none proposed. It was a one-time move of rules on how to work; whether FACTS holds such entries again is not checked here.

**R1.6. A deletion-only sweep of state words and pointers to PLAN.**
- Method: the "scrape" of 10-22 deleted state words and PLAN and queue pointers from 41 facts and 65 decisions, checked by `words-subset.py` (commit `3822898328`).
- Workflow: the rule holds per entry (R2.5); `words-subset.py` checks only POSITIONS lines marked cut-only (`checks.sh:56-71`). No sweep over entries outside the batch.
- Verdict: **missing.**
- Change: none of its own; it would ride on the run-1 entry point.

**R1.7. Concepts go from the entries to the worker skill.**
- Method: the clarity writer listed each concept that a reader lacks in `concepts.md`, for the orientation (`record-clarity/writer.md:33`; `briefs-compared.md:91`).
- Workflow: "Detail that belongs in the skill, and that the skill does not hold, goes to your report, for the skill writer" (`entries.md:38`); the orientation update runs on the landed entries (`README.md:12`).
- Verdict: **differs.** The direction is the same, entry to skill; the form is a report section in place of `concepts.md`.
- Change: none needed for the direction.

## 2. What the workflow does that the method did not

- **The sort by home, kind, weight and ground** (`sort.md:23-47`). It serves the goal: it is the guard against the fault of 10-29, when one output took findings that belonged in four homes (`record-landing-workflow.md:61-78`). Its weight by meaning alone works against the consolidation (C7).
- **The routing writer** for PLAN, PLAN-history, the queue, INDEX and other notes (`routing.md`). It serves his ask that the whole record be brought in line (`HIS-WORDS.md` 4.9, 8.3). It is neutral to the size of FACTS.
- **Ledger row rewrites and new rows** (`entries.md:45`; `checks.sh:80-114`). Neutral.
- **The POSITIONS rule of 10-31**, fewest words, no yes needed, a decision's change held (`entries.md:24-26`). It serves: it is his rule.
- **The clarity tool's findings clause, taken into the pass.** `entries.md:21` has the writer follow the clarity writer's "clause on findings": "Change nothing that no finding names, and let an entry grow only by what its corrections need" (`record-clarity/writer.md:23`). That clause came on 10-28 for corrections (`9a37e8401`), after the run that worked; the clarity run of 10-22 had none. It works against the goal: only an owed change may touch a draft.
- **"No more and no less than its ground"** (`entries.md:15`; `check.md:26`). It serves fidelity, and works against a cut (C17).
- **The draft as the baseline for length**: the owed-clause bound, `lengths.py`, the judge's growth hold (`entries.md:38`; `judge.md:24`). Works against (C4).
- **A named question settles a length failure** (`entries.md:48`; `check.md:27`). Works against (C3).
- **Keep the commit that bounds a one-time measurement and what a fact blocks; a claim extended to a new batch carries that batch's figures** (`entries.md:36-37`; replay fixes 1 and 2, `record-landing-replay-24.md`, section 7). Serves present meaning and evidence; it adds text.
- **The gate's figures in F-53 and F-240 kept as the commit stage wrote them** (`entries.md:30`). Neutral.
- **The mechanical checks**: `ledger.py landing-check`, `check-index.sh`, `plan-moves.py`, `queue-check.py` (`README.md:20-24`). They serve the routing; neutral to size.
- **It lands itself on `main` and pushes; the coordinator reads `diff.md` after** (`README.md`, "Landing its result"). Serves his rule of 11-03. It also removes the one read of form by a person, which the design names as the only check that caught length and register (`record-landing-workflow.md:76`).
- **The chain after the record**: the orientation update, the skill writer, a cold read, the page of skill changes, the pushes, the revival page (`README.md:12-18`). Neutral to the record's consolidation. It took 56% of today's run's tokens and 59 of its 108 minutes (`landing-workflow-traced.md`, section 6).
- **A pointer to the skill's part as the home of a cut** (`entries.md:38`). The October definition allowed it (C13); it now works against his word of 11-24.
- **The pass on every entry that the batch added or changed** (`sort.md:40`; design decision 3). Serves: it is run 2's reach.
- **`diff.md` and its "For the curator" and "For the coordinator" sections** (`judge.md:38-52`). Neutral.

## 3. Where the clarity workflow and the landing workflow overlap

| stage | clarity workflow | landing workflow | shared |
|---|---|---|---|
| input | a kind and chunks of entries, chosen by the caller; optional `findings.md` (`README.md:21-26`) | a batch, its base and its landing; no text (`README.md:28`) | no |
| evidence | none for FACTS beyond the assessment; `entries.py` for POSITIONS | `prepare.sh`, `evidence.py`: six files | no |
| what to rewrite | assessor, six checks, four dispositions (`assess.md`) | sorter, nine homes, kind and weight (`sort.md`) | no |
| write | `writer-stream.sh` with `writer.md` | `writer-stream.sh` with `entries.md`, which reads `writer.md`'s "How to write each entry" and its findings clause | stream and part of the brief |
| cold read | `coldread.md`, twice | `coldread.md`, once | same brief |
| check | `check.md`: fidelity, comprehension, class | `check.md`: coverage, fidelity by the clarity step 1, form, routing | method of fidelity |
| fix | `fix.md`, same stream | `entries.md`, "The fix round", same stream | stream |
| judge | `judge.md`: apply or hold | `judge.md`: the clarity verdicts plus the length hold, `final.sh` | verdict rule |
| apply and commit | the coordinator, by hand | `final.sh`, then the Land stage | `record.py` |
| other output | `concepts.md`, `queue.md` | `diff.md`, report for the skill writer, the chain after | no |

So four of the clarity workflow's seven stages already run inside the landing workflow by brief path. What divides them is the input, the step that picks what to rewrite, the writer's licence, the length rule and the outputs.

For one process with two entry points, one landing and the whole record, these would have to be settled:

1. **The input.** The landing workflow would take a list of entries or sections as its second input, in place of a batch range. `evidence.py` already works entry by entry; its range filter would give way to the list.
2. **One step that picks what to rewrite.** The sorter keeps its homes and adds the assessor's six checks and dispositions (C7).
3. **One licence for the writer.** For "the pass", the clarity rule of 10-22, "Keep the meaning", with questions 3 to 5 on every sentence; the findings clause only for an owed correction (section 2).
4. **One length rule.** A named reason per long entry, and a total (C4, C5). Which total is a gap (section 4).
5. **The outputs.** `concepts.md` and `queue.md` of the clarity workflow against the landing's report for the skill writer and `diff.md`; and whether the whole-record entry point runs the routing writer and the chain after.
6. **A pilot stop** for the whole-record entry point, since the landing entry point takes none (R1.2).
7. **The guards that kept them apart.** The design kept the landing workflow separate because the clarity workflow broke twice when it took new input: a run's own brief on 10-26, and one output for many homes on 10-29 (`record-landing-workflow.md:136-143`). The landing workflow holds both guards: no text argument (`README.md:28`) and the sort by home before writing. Both must stay.
8. **The clarity workflow's other job.** It also corrects the entries that a review's findings name (`record.md:109`). Whether that job moves too, or the clarity workflow stays for it alone, is the curator's decision. His rule against bending a tool that worked to a new job (`HIS-WORDS.md` 4.1) bears on it either way.

## 4. Gaps that the method does not cover

1. **Sorting entries by subject across the record.** In October the sections were already by subject, and only 11 entries merged. Today entries follow the batch that made them: in a sample of 40, 38 hold two or more claims that answer different questions (`f63-traced.md`, "In short", item 10). The method has no step that regroups the record.
2. **Where an entry is born.** The batch brief asks each rung for "The FACTS.md entry the rung earns", and the gather adds it at its section's end (`climb-batch-workflow.js:623`, `:1045`). The method started from a record already written; nothing in it acts on the batch script. His word: "Fix where an entry is born" (`HIS-WORDS.md` 8.6).
3. **The number for today's total.** October's 145K came from that day's count of about 240 entries times 600 (draft rule `:144`). After the clarity rewrite he accepted 222.8K. No number is set for today's 339 entries; his word of 11-24 is that "It is a problem when the sum is too large" (`briefs-compared.md:126`).
4. **A test of decisions for today's entries.** The kit's ten scenarios rest on 14 entries of 10-13 (`consolidation-of-october.md:119`). The method has no scenarios for today's record and no rule for who writes them at a landing.
5. **When run 1 runs again.** He wants the method reapplied "If the record starts drifting again" (`HIS-WORDS.md` 4.2). The method gives no measure of drift. Today 115 of FACTS's 299 entries over 600 characters were never in any landing's reach (`landing-workflow-traced.md`, section 7, item 1).
6. **The skill as a home for a cut.** The method's question 5 allows it, and `record.md:40` still says so; his word of 11-24 forbids it. The method does not settle this; his later word does.
7. **Tests named in an entry.** The method says one test or a name pattern; whether an entry names a test at all is open with him (`briefs-compared.md`, section 4).
8. **The cost at each landing.** The method ran once a time, with no budget per landing. Scouts and a quiz at every landing add tokens that nobody has estimated; today a run writes about 4M, 56% of it after the record (`landing-workflow-traced.md`, section 6).

## 5. The adjustments, in order

Each change of a brief needs the curator's yes (`README.md:28`).

1. `entries.md:21`: the writer follows the clarity writer's "How to write each entry" for "the pass" without the findings clause; the clause stays for an owed correction. Small.
2. `entries.md:38`, `entries.md:48`, `check.md:27`, `judge.md:24`, `lengths.py`: questions 3 to 5 on every sentence; only questions 1 and 2 keep a sentence past 600; the owed-clause bound and the growth hold go. Small in each of five files.
3. `check.md:26`, `judge.md:24`: a cut passes fidelity when the home that its provenance names holds it. Small.
4. `entries.md:38`: the skill's part is no home for a cut. The same in `record.md:40`, question 5, a skill file, through the skill writer. Small.
5. `entries.md:20`, `check.md:20`: read the worked examples. Small.
6. `entries.md`, "The problem" (`:9-11`): quote his goal. Small.
7. `sort.md:32`, `:40`: weigh "the pass" by the six checks; weight none only when all six pass. Small.
8. `lengths.py`: the totals of FACTS and POSITIONS at AT and after, and the changed entries' total against 600 times their count. Small.
9. `sort.md:30`, `entries.md:44`, `check.md:25`: a home "merge into F-n", `merge` lines in the apply file, a merge in coverage. Medium.
10. `sort.md` and `evidence.py` (`cites.md`): a search of FACTS by subject, linked or not, for each entry that the batch added and each behaviour that changed. Medium.
11. `record-landing.js`: a second cold read after the fix round. Small.
12. `record-landing.js` with `process-engineering/record-test/`: the test of decisions, after his answer to open 8-B and with scenarios for today's entries. Medium.
13. `record-landing.js`, `evidence.py`, `sort.md`, `README.md`: a second entry point that takes a list of entries or sections, in chunks of 20 to 32, with a stop after a pilot chunk for his go. Large.
14. `.claude/skills/coordinator/references/record.md:88-110` and `record-clarity/README.md`: say which tool runs each entry point, and what stays the clarity workflow's. Medium; skill writer, at his yes.

## 6. What I could not check

- I read the October briefs from the saved files in Oct-briefs. Their `README.md` was not yet written, and I did not print the briefs again from the transcript to compare.
- I did not read the October writers' hand-backs or the filled scout files, beyond the account in `consolidation-of-october.md`.
- I did not check whether the curator saw the clarity FACTS calibration chunk; the commit cites his word on the POSITIONS pass.
- I did not check whether today's FACTS holds entries on how to work or on the platform, which Step 12 would move (R1.5).
- I did not run the workflow, its checks or any tool. Line numbers are of the files at `d42a45f383`. I read `record-landing.js` only at its phases and agent calls.
- I did not judge whether the orientation's regression quiz could serve as the test of decisions.
- I did not estimate the cost of any adjustment.
- His page comments on the trial of 10-13 are missing from the sources (`HIS-WORDS.md`, "A gap in the sources").
