# Closing docket: the open items of the post-mortems and the held list

**63 items: 24 need your word, 14 need the coordinator's work, 4 need a workflow run, 21 need nothing (done or stale).** They cover 88 lines of the held list, the open points of the two post-mortems, PLAN's consolidation line, and the open fragments of the boot note.

## How to read this

- Each item has a source, a state checked against the tree on 2026-11-03 at about 00:10 UTC, and a proposed close. The close is a default that you can take without reading the rest.
- Within a group, the heaviest item comes first. Weight is what the item touches: the path to the switch-over and microGPT first, then the process that runs the batches, then the record's form.
- Times are UTC. Your time is UTC+1. A held line is cited by its section date and time, such as "held 10-29 06:49".
- A close marked "the docket's proposal" is mine, not a default on record.
- Nothing in the repository was changed. A batch runs on the main tree.

**Terms**

- **close**: the end of an item: struck as done, answered with a named default, a workflow run, or kept open until a named point.
- **landed**: in the tree on `main`, by the commit named.
- **stale**: no longer true, or overtaken by a later change.
- **the drafts page**: the page of skill drafts, https://claude.ai/artifact/LwjYdr5x6iSVVEgwKMic1m, version 7 since 23:19 on 11-02.
- **the corrections page**: the page of POSITIONS corrections, https://claude.ai/artifact/5noPHbJmZg41UWT74HGxno, version 16.
- **the 28 October report**: `explorations/coordinator/postmortem-2026-10-28/REPORT.md`.
- **the Haiku report**: `explorations/coordinator/postmortem-2026-10-19-haiku/REPORT.md`, the final report of the post-mortem of 19 October.
- **the skill writer**: the headless Opus session that edits the skills (`references/skill-rewrite.md`).
- **the minimal pass**: the pass over the skills toward a small, declarative set, which you put after PLAN's consolidation (held 11-02 06:51).
- **item N**: item N of the review queue, `explorations/coordinator/review-queue.md`.

## 1. Needs your word (24)

1. **P-146, the self type in a self-typed trait.**
   - Source: the 28 October report, sections 4 (finding 3) and 7; held 10-29 06:49 (the trap scenario and the date test in doubt; "to be discussed in more detail").
   - State: open. The self-type probe ran on 11-02 (`96b92dba9`, row 879 at `c08ea88d8`). The review of the walk-leaning decisions puts P-146 first of five, since it touches the library and the checker rule that the switch-over runs on (`reviews/walk-leaning-decisions.md`, line 21; `05def1603`). Item 286, its reason, is settled (`40f08d22e`).
   - Close: answer with the boot note's default: the library stays as it is, row 407's repair lands as a small rung, and the two checker ways are probed. Put it after climb batch 25 lands.

2. **The integer conversions (`narrow`, `widen` and their kin).**
   - Source: held 10-31 09:5x and 09:2x (both forms provided and named alike across the integer types; the two on `ZZ` deleted); held 10-31 08:2x (`widen`, row 502, needs the full ask).
   - State: open. The evidence is on file (`reviews/integer-conversions-evidence.md`, `reviews/widen-evidence.md`, both of 10-31). The ask went to you at 10:3x on 10-31, with option 3 recommended. Items 331 and 332 come with it and are needed before the batch that moves the rest of the 109 bindings (review queue, lines 162 and 169).
   - Close: answer option 3, before climb batch 26 is planned.

3. **`CompilerSystem` at the switch-over (item 319).**
   - Source: the 28 October report, section 7; held 10-29 05:22.
   - State: open, needed before the switch-over. P-33 now clears `System` by the switch-over for the compiler's tests (`5feeedd9f`). Nothing deletes `CompilerSystem` until you answer (item 319, line 669).
   - Close: answer yes to the reading in P-33's history: the file goes with the prelude's three files, and its 28 programs import the one library's `System`.

4. **Who decides changes to the coordinator skill (the Haiku report's ask 6).**
   - Source: the Haiku report, section 5; the 28 October report, section 7, "The skills"; the boot note, "Still open, smaller".
   - State: open since 10-19. `SKILL.md` lines 123 and 124 still hold the text of 10-17 (`89c828c25`), not the reviewer's two texts (`postmortem-2026-10-19-haiku/part-1-evening-and-morning.md`, E11). Your go of 22:0x on 11-02 covered that night's landing only (boot note).
   - Close: answer with the default: a change to how you and the coordinator work together, or to who decides what, is proposed and made after your yes; every other change is made by `skill-rewrite.md`'s method and reported when it lands.

5. **P-42's two questions: the example of arrays indexed by pairs, and the word "functions".**
   - Source: the 28 October report, section 7 (three findings to wait for climb batch 22c); held 10-29 07:44 ("to discuss separately").
   - State: open. Climb batch 22c landed (`b81d86b75`), and the first finding's clause is gone (`a58b0a2c4`, at your go of 08:19 on 10-31). The other two stand in P-42 as it reads, as two questions on the corrections page, part 1, sections 1 and 12.
   - Close (the docket's proposal): take the page's drafted text: swap the example for `zip`'s pair and drop "functions". Nothing built changes under either answer.

6. **The skill writer's three decisions not taken (the drafts page, version 7).**
   - Source: the boot note, "The skill writer's landing"; the writer's report of 11-02 (`<scratchpad>/drafts-v7/writer-report.md`).
   - State: open. The skill landed at `5114bfece`.
   - Close (the docket's proposal): keep flag D4 as landed (a brief may quote whole a rule of yours that no entry holds yet); cut the repeated "Guide lightly" bullet in `skill-rewrite.md` (line 32); leave writing principle 5 to the minimal pass.

7. **The revival page: its restoration and how to keep it current.**
   - Source: the 28 October report, section 7, "Beside the post-mortem" (your words of 22:47:44 on 10-28).
   - State: open, and lost from the boot note: no section of it names the restoration now. The proposal in `postmortem-2026-10-28/revival-page-drift.md`, sections 5 and 7, is not done. The page is at version 24.
   - Close: answer with the note's default: rebuild from version 20, the text Professor Ryu received, adding only the language changes and the batches' numbers (about 0.2M to 0.4M tokens written); then update it at each phase's close and at the switch-over. Phase 3 has closed, so it is due.

8. **The second half of your rule of 10-31: "nice to be aware of what changed".**
   - Source: held 10-31 08:1x; the boot note, "Next", item 5.
   - State: the first half landed: the coordinator brings the record in line with the tree without your approval (`SKILL.md` line 116). The second half, that the landing report names each such change, is in no skill. It meets `SKILL.md` line 176, "Do not tell the curator about edits to the record", which the skill writer could not resolve.
   - Close: answer with the default (the docket's proposal): the landing report lists each POSITIONS correction in one line; line 176 holds for every other edit.

9. **The six asks of the type-decisions page.**
   - Source: the boot note, "Waiting on him" (https://claude.ai/artifact/WELD6kRbiHPPzq7hLb8G4Z).
   - State: open since the Fable judgement of 10-23 (`reviews/type-decisions-review/judgement.md`). Part of it is overtaken: P-156's tuple rule stays at your decision of 18:0x on 11-02 (`4ee3eb38c`), and the walk-leaning review re-reads the rest under option 3 of the later-word ask.
   - Close: keep open until climb batch 25 lands; then put only what the walk-leaning review leaves open, with its asks.

10. **Climb batch 24's items for your review, 327 to 343.**
    - Source: the boot note, "Waiting on him".
    - State: open in the queue. Item 326 was taken at its default, as landed, when climb batch 25 launched; the queue closes it at the landing (boot note).
    - Close: keep open for the queue's cleanup (section 2, item 4), one item a message after it.

11. **The `AnyList` of P-151, built otherwise than your option 3 (the Haiku report's ask 7; item 188).**
    - Source: the Haiku report, section 5.
    - State: open. Row 799 is `CONTESTED`. The item notes that the skill brings such a build to you as a hold.
    - Close: answer with the default: as built, with P-151's sentence changed to say that `addLeft` and `addRight` stay in `AnyList`.

12. **A push notification names the batch it is about and what it waits on (the Haiku report's ask 10).**
    - Source: the Haiku report, section 5; the boot note, "Still open, smaller".
    - State: open. `SKILL.md` line 179 does not say it.
    - Close: answer with the default, yes; the skill writer adds it to line 179.

13. **A page for each batch's landing (the Haiku report's ask 9).**
    - Source: the same.
    - State: open. No landing page has been made since.
    - Close: answer with the default: no page; each landing review carries its cost section.

14. **P-26's sentence on unfinished text (item 215).**
    - Source: the 28 October report, section 7 (how "later" is dated, and the sentence that is not yours).
    - State: the dating is answered by option 3 of the later-word ask (`091265de2`). The sentence "The implementers' later word also outweighs unfinished text." still stands in P-26 after both rewordings of 11-02 (`f9d14484f`). Needed by: never.
    - Close: answer with the default: as it reads.

15. **The chain from scout to report writer to coordinator: does it lose information?**
    - Source: the 28 October report, section 7, "Process questions" (11:00:40 and 21:57:07 on 10-28).
    - State: no answer on file. The chain stands in `delegating.md`: Sonnet fetches exact words, an Opus worker writes the report, the coordinator reads the report.
    - Close: answer with the default: the chain stays, and a memory of yours that the chain disputes is rechecked at the source, as the two rechecks of 10-28 did (section 2, item 1 puts that rule in a skill).

16. **P-152's reason, the type group's paper of 2011 (item 228).**
    - Source: the Haiku report, section 5.
    - State: open. Needed by: never.
    - Close: answer with the default: as it reads.

17. **Your lean of 2026-09-20 toward the class loader for array decision A (item 320, P-85).**
    - Source: the 28 October report, section 7.
    - State: open. Needed before microGPT compiles.
    - Close: keep open until phase 5's array design.

18. **The INDEX ask: read INDEX's last 60 lines at boot and search the rest.**
    - Source: the boot note, "Still open, smaller"; the boot note of 10-20 (`9d6933a65`).
    - State: never put. The light boot now skips INDEX, and you said on 11-02 at 06:29 that the full boot stands.
    - Close: answer with the default (the docket's proposal): drop the ask; `SKILL.md`, "The boot", stands.

19. **The apply file of the rejected rewrite of 10-26.**
    - Source: the 28 October report, section 7, "Record upkeep".
    - State: `reviews/foundations/evidence/rewrite/combined.apply` is still in the tree. You have not ruled.
    - Close: answer with the default: dropped; the file stays as evidence and is never applied.

20. **The branch `record/landing-24-replay`.**
    - Source: the boot note, "Next", item 5 (kept until you read `process-engineering/record-landing-replay-24.md`).
    - State: the comparison's fixes landed (`575d55594`, `d9f2fdfd0`).
    - Close: no ask. The branch stays on GitHub until the curator deletes it, by his order of 12:3x UTC on 2026-11-06; nobody asks him or reminds him of it.

21. **"Ignoring 6 permissions.allow entries" in the headless writers.**
    - Source: the boot note, "Still open, smaller".
    - State: open. The fix changes `/root/.claude.json`, which is yours to allow.
    - Close: keep open until a writer is blocked by it.

22. **The cleaner pass: the two noise commits and the history rewrite.**
    - Source: held list, "Smaller items he still owns" (2026-09-21; the command of 2026-09-20).
    - State: open. The harness refused the rewrite here.
    - Close: keep open for your cleaner pass, which moves the process record to its own branch.

23. **Professor Ryu: her answer on the LaTeX sources, and your learning queue.**
    - Source: the 28 October report, section 7 (asked at 08:19 on 10-29); held list, "Smaller items he still owns" (`postmortem-2026-10-28/ryu-claims-check.md`).
    - State: no answer is on file.
    - Close: keep open until her reply; the two claims stay for your reading.

24. **The page of the 28 October report.**
    - Source: the boot note, "Waiting on him" (https://claude.ai/artifact/EHHQiET94YTmEH4MNYgjKg).
    - State: waiting for your read.
    - Close: strike it once you have read this docket, which holds its open points.

## 2. Needs the coordinator's work (14)

1. **The 28 October post-mortem's lessons that no skill holds, and the branch `skill/consolidation-tools`.**
   - Source: the 28 October report, section 4 (ruling 5), section 5 (lessons 1, 2, 6 and 11), section 7, "The skills"; held 10-28 12:24 (the tools' purposes by job).
   - State: the branch is not merged (`git merge-base`). Most of its changes landed by other commits (`9311b0967`, `41213e2d3`, `5114bfece`). Five points are in no skill (grep of `.claude/skills/coordinator/`):
     - a run of a record tool takes only its arguments and the inputs that its README names, never rules of the coordinator's over the tool's briefs (lesson 1; on the branch only);
     - before acting on a worker's report, say in three lines what it found, what it recommends, what the goal needs and where they differ; check from a tool's own documents that it fits (lesson 2, the two steps of 09:12:52 on 10-29);
     - a small pilot that you read is the check of form, not the trap test (lesson 6; on the branch only);
     - recheck a disputed memory at the source (lesson 11);
     - which job each record tool fits (12:24; on the branch only; `record.md`'s tool lines are still those of 10-22, `b6f5268e1`).
   - Close: brief the skill writer to draft the five as items on the drafts page's next version, for your yes. The branch stays on GitHub until the curator deletes it (his order of 12:3x UTC on 2026-11-06).

2. **PLAN's own consolidation, the rest.**
   - Source: PLAN, "Work that can start now, with no decision", its first line; the boot note, "Still open, smaller".
   - State: phases 3 to 6 done on 10-30 (`PLAN-history.md`, line 1381). PLAN from "Pavol's answers" on, about 202K characters, waits.
   - Close: run it after climb batch 25 lands, by `record.md`, "A consolidation" (chunks, scouts, an Opus writer per chunk).

3. **The minimal pass over the skills.**
   - Source: held 11-02 06:51; held 11-02 07:01 ("Read a worker's final message yourself" is a no-op); the writer's decision 3 (writing principle 5).
   - State: `skill-rewrite.md`, line 3, now states the goal (`5114bfece`). The pass has not started. The no-op sentence is still in `SKILL.md`, line 81.
   - Close: keep open until PLAN's consolidation lands; then run it by `skill-rewrite.md`'s method, with cold reads and a page for your read.

4. **The review queue's cleanup.**
   - Source: held 10-29 21:0x; the 28 October report, section 7; the boot note, "Waiting on him".
   - State: not started. You set it for after climb batch 22c, which landed on 10-30.
   - Close: after climb batch 25 lands, a worker closes the stale items and sorts the rest by what the work needs; it comes to you as a page, with a reminder of what the queue is.

5. **The corrections runs' 13 questions, and the cold reader's two faults.**
   - Source: the 28 October report, section 7; the boot note, "Still open, smaller".
   - State: of the 13 (the three `queue.md` files under `reviews/foundations/evidence/corrections/`), 7 were merged into item 318 and answered on 11-02, 1 is item 215, and 2 are items 319 and 320. Four were never filed: P-154's (chunk c1), P-17's (c1; your comment of 10-29 07:18 and the corrections page, part 4, say it needs no change) and P-33's two (c2; overtaken by climb batch 22c's question 1 and `5feeedd9f`). The two faults stand: P-44 still says the `where` form "is not built", and P-84's title still states an unbuilt store in the present tense.
   - Close: one record writer strikes the three overtaken questions, files P-154's as one item, and corrects P-44 (with the F-121 error of the boot note's "Next", item 4) and P-84's title.

6. **The Select script of the house style's reference page.**
   - Source: held 10-28 22:5x (the reference page should carry the new script).
   - State: not done. The reference page, https://claude.ai/artifact/FoTnH7KzXt5MtGk3tTcZ8W, still gives one button to each section's heading only. `SKILL.md`, line 198, sends every page to that script, while the same part asks for a button beside each item.
   - Close: republish the reference page with the corrections page's script.

7. **A cold read of the coordinator skill reads as the coordinating session.**
   - Source: held 11-02 07:02.
   - State: the two cold reads of 11-02 were run that way (`sources.md`, "Changes landed on 2026-11-02, evening"). The standing brief still says "Read them as a worker new to this repository would" (`skill-cold-read-brief.md`, line 7).
   - Close: change that sentence for the coordinator skill, with the next skill change.

8. **The order of the work and the context's size.**
   - Source: held 11-02 07:4x (the record and the skill rules before the next batch; at about 540K tokens of context, propose when to compact, land the record by workers first, then compact and boot with the new skill).
   - State: practised on 11-02 (the skill landed before climb batch 25), but in no skill (grep).
   - Close: give it to the skill writer in the minimal pass.

9. **Two questions of yours from the evening of 11-02.**
   - Source: held 11-02 21:01 (was the over-briefing a habit from training that needs so explicit a correction?) and 21:24 (does the page take in the held point to resolve the contradiction now?).
   - State: no answer on the drafts page, version 7. The second is answered in the tree: rule 20 landed with your point of 06:51 taken in (`5114bfece`).
   - Close: answer each in one line in chat.

10. **Whether the coordinator's delegation declined since the early Fable sessions.**
    - Source: held 10-28 10:39; the 28 October report, sections 2 and 7 ("once we recover from here").
    - State: not measured. The delegation rules changed on 11-02 (`5114bfece`).
    - Close: keep open until the minimal pass lands; then one analysis worker measures it.

11. **The boot note's small owed fixes.**
    - Source: the boot note, "Next", item 5, and "Still open, smaller".
    - State, each checked:
      - `tools/record-clarity/writer-stream.sh`, lines 21 to 25: no `record.py`, `ledger.py` or checks;
      - `PLAN.md`, line 98, lacks items 323 to 325 (review queue, line 39);
      - the queue's block of 2026-10-10 counts (review queue, line 45);
      - row 560, now `FIXED`, cited in `CLIMB-BATCH-23.md`, line 101;
      - `CLIMB-BATCH-24.md`, line 111; `map/design-intent-sources.md`, line 126; `research/README.md`, lines 8 to 11 (none of the three checked);
      - F-299 at about 1.9K characters, against the 600 guide;
      - `stagesStep` (`climb-batch-workflow.js`, line 758) and the manual's "head of about 4K characters" (`climb-batch-workflow.md`, line 73);
      - 11 POSITIONS titles that the script cites inexactly (not checked);
      - climb batch 22's finding 7, the gather's stage runs, and climb batch 23's finding 2, the resume head: still in PLAN's "Work that can start now";
      - `check-index.sh` now names two paths that resolve nowhere;
      - F-123 has no pointer to P-91;
      - the ledger clarity run's questions of 10-22 (`0c7e7be18`), not filed;
      - the commit stage's fold of F-53, and the gather's commit by named paths (not checked);
      - `tmp/export-rows/`, still in the main tree (ignored by git);
      - the note that a worker writes its report with a shell command where the harness refuses its Write tool: the boot note calls it landed, but no skill holds it; only the batch script does (`BY_HEREDOC`, `7abc5c21c`).
    - Close: after climb batch 25 lands, one record writer makes the line fixes; the script and manual changes go in between batches.

12. **The gap ledger's repair, about 180 open rows.**
    - Source: the boot note, "Still open, smaller"; `ledger-health-2026-10-22/REPORT.md`.
    - State: not started. The ledger holds 426 rows `NEGATIVE-VERIFIED`.
    - Close: keep open until PLAN's consolidation lands; then split it among small workers by `record.md`, "INDEX and the gap ledger".

13. **The probe of item 31: one bound on the whole array family, or one per operation.**
    - Source: the boot note, "Still open, smaller".
    - State: not probed (item 31, line 430). Needed before microGPT compiles.
    - Close: keep open until phase 5 is planned.

14. **The boot note's open lists.**
    - Source: this docket.
    - State: they hold stale fragments (section 4, items 13, 15, 17 and 19), call the heredoc note landed (item 11 above), keep the old trailer line, and lost the revival page (section 1, item 7).
    - Close: rewrite them from this docket at the first boot note after climb batch 25 lands.

## 3. Needs a workflow run (4)

1. **The record-landing workflow's first live run.**
   - Source: held 11-02 00:1x ("Yes to all eight"); the boot note, "Next", item 3.
   - State: built (`f44cf4ec2`, from the design `5384a4f35`); the replay of climb batch 24 compared (`b0a2a261c`) and its fixes in (`575d55594`).
   - Close: run it at climb batch 25's landing, as the boot note names.

2. **The orientation workflow in consolidate mode.**
   - Source: the boot note, "Still open, smaller" (the orientation's size).
   - State: `fortress-repo`'s `revival-changes.md` is 19,839 bytes, against the README's budget of 8K to 12K characters (`tools/orientation/README.md`, line 8).
   - Close: run the consolidate mode after climb batch 25's update run.

3. **Where an object's value parameters fall under a conditional extension (the Haiku report's ask 8; item 177).**
   - Source: the Haiku report, section 5.
   - State: default taken, "as repaired". It waits for the rung that repairs row 773, still `NEGATIVE-VERIFIED`.
   - Close: keep open until the batch that repairs row 773.

4. **The ledger rows on your list of smaller items.**
   - Source: held list, "Smaller items he still owns".
   - State: rows 321 and 348 and the class-name half of row 320 are open. Row 346 is `FIXED`. The gate's thread count is still in PLAN's "Work that can start now" (climb batch 11's finding 8).
   - Close: strike row 346; keep the rest open for the batches that reach them.

## 4. Needs nothing: done or stale (21)

1. **The drafts page, version 6, your 12 comments (held 11-02, 20:50 to 21:34).** Landed at `5114bfece` (`sources.md`, "Changes landed on 2026-11-02, evening"); the cold read as the coordinating session ran; the test of rule 11 ran, and a worker given entry numbers read them with grep. Version 7 is up. Strike.
2. **P-26 and P-7 (held 11-02 13:45 and 13:49).** Reworded together at your acceptance of 16:4x (`f9d14484f`). The `tail` example and Naden's file are gone from P-26; P-7 names the POPL 2019 paper. Strike.
3. **Held 11-02 07:38, 07:01 to 07:34, 07:33 and 00:1x.** The page item's form is in `SKILL.md`, "Pages"; the comments landed at `41213e2d3` and `5114bfece`; the delegating rule has its one place at the boot's step 7, so the compaction hook needs no line; the workflow is built (section 3, item 1). Strike.
4. **The drafts page, version 3, your 12 comments (held 11-01).** Rules 2, 4, 11, 12, 13, 15 and 17 to 22 landed at `41213e2d3` and `5114bfece`; rule 18's worker wrote the design `5384a4f35`. The trailer is dropped: `committing.md`, line 31, keeps plain "Claude". Strike.
5. **Held 10-31: provenance, the weighing, the standing rule, the mixed corrections, "all defaults".** The provenance rule and the weighing are in `SKILL.md`, "The curator's role and decisions" (accepted 06:56 on 11-02); the standing rule is line 116; climb batch 24 landed (`25238e60c`). Strike. The "nice to be aware" half stays (section 1, item 8).
6. **Held 10-29 in chat: 22:4x, 22:1x twice, 22:0x, 13:4x to 21:07, 12:3x.** The register and the page form are in `SKILL.md` (`sources.md`, "Changes landed on 2026-11-01"); the push from the main tree is in `batch.md`, "While it runs"; the light brief is in `delegating.md`, line 33; the page-comment turns are `SKILL.md`'s rule of small turns. The Sonnet trailer is stale since 11-01 23:34. Strike.
7. **Held 10-29, your 17 page comments on the corrections.** P-27, P-37, P-12, P-33, P-58, P-59, P-84, P-153 and P-154 landed at `8c99e258e`, then at `a58b0a2c4`; P-26 as a cited reason left six entries, and `record.md` forbids it; P-17 needs no change (the corrections page, part 4); P-153's layer question is answered by option 3 (item 318). P-42, P-146 and `CompilerSystem` carry on above. Strike.
8. **Held 10-28 in chat: 06:41, 07:26, 07:37, 12:13, 12:18, the calibration half of 12:24, 22:5x on the consolidation, 20:42, 09:56, 10:01, 10:28, 10:39's asks 1 and 2, and 07:42.** All in the skills (`sources.md`, "Changes landed on 2026-11-01" and "on 2026-11-02"), applied (`9a37e8401`), or in the account (`d9ca11c4a`, `evidence/haiku-and-row-816.md`, `41c3b3491`). Strike. The open halves are section 2, items 1, 6 and 10.
9. **Held 10-27 07:12 and 07:13.** In `delegating.md`, "Which tier runs what", and the boot's step 7. Strike.
10. **The 28 October report, section 4, rulings 1 to 4.** The tool, the pilot and the quiz ran (report, section 3); P-153, P-154, P-155 and P-58 are answered. Only P-146 stays (section 1, item 1). Strike.
11. **The 28 October report, section 5, lessons 3, 4, 5, 7, 8, 9 and 10.** Each is in a skill: the design's evidence as ground (`SKILL.md`, "The curator's role and decisions"); the sort of findings by what each needs (line 114); light briefs (`delegating.md`, line 33); the regrounding (line 83); the small turns for page comments ("While the curator reads turn by turn"). Strike.
12. **The three answers of 10-29 not in the record.** Item 283 and P-58 entered at `5feeedd9f`; climb batch 23 ran and landed (`df71bc585`). Strike.
13. **A `record.py note` naming `8c99e258e`, and the 11 history blocks that name the wrong commit.** Both done at `ef099f7e4` (21 blocks named, 12 corrected). The boot note still lists both. Strike.
14. **The trap test on the landed texts.** Overtaken: P-33 now says `System` is cleared by the switch-over (`5feeedd9f`), which answers the failed scenario. Strike.
15. **Items 285 to 290, and the boot note's "item 287 stale".** All six are settled (`40f08d22e`; 288 at P-155); 287 is already in the queue's settled part. Strike.
16. **P-158's form (held 10-29 06:18).** P-158 was rewritten at your go of 08:19 on 10-31 (item 296), with no comment since. Strike.
17. **`batch.md`'s "the distance in phase 3" (item 306), and the gather's stash rule.** `batch.md` now says "until the switch-over lands"; `delegating.md` now follows `recoverGather()` (`9311b0967`, then `5114bfece`). Strike.
18. **The Haiku window's leftovers: old section numbers in climb batch 17's record and rung files, `lists17.py`, and flag 12 of a cold read.** Stale: they are records of a batch that landed on 10-17, and the skill has had many cold reads since. Strike.
19. **The type-decisions write-up as a page, and `oracle-headers.md:47`.** The page exists (the boot note, "Pages"); line 47 no longer names the port. Strike.
20. **Climb batch 20's review list.** Its items are in the queue: 165 built (`1ac7028b4`); 29, 31, 95, 112 and 113 open there with defaults. Strike the boot note's line.
21. **Held 11-02 06:29 (the librarian; did the light boots harm the planning?), and the done smaller items.** `SKILL.md`, "The boot": the full boot is the default. The `wip/` branches were deleted on 10-02, and the tier rule is in `delegating.md`. Strike.
