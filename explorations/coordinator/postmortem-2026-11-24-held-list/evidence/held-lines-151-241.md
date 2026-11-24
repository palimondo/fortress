<!-- Triage of explorations/coordinator/HELD.md lines 151 to 241 at HEAD 642b87f881 (the sections "Held in chat (2026-11-05)" to "Smaller items he still owns"), one verdict per line, for the curator and the coordinator, for the held-list post-mortem of 2026-11-24. Written 2026-11-24 by a read-only worker. -->

# Held list, lines 151 to 241: one verdict per line

34 rows: 33 bullets and the paragraph at line 207, which also holds open points.

## Counts by verdict

- open: needs his word: 5 (lines 183, 184, 182, 153, 238)
- open: needs work: 6 (lines 213, 178, 165, 241, 239, 240)
- open: waits for the skill writer: 1 (line 177)
- for analysis: 1 (line 188)
- settled: 21
- unclear: 0

The closing docket of 2026-11-03 (`explorations/coordinator/closing-docket-2026-11-03.md`) already sorted the lines of 10-28 to 11-02. Its open items 1, 3, 5, 8 and 10, and section 2's item 3, are still open today. They are lines 183, 184, 182, 177 and 188, and line 178.

## The open lines, most important first

1. **Line 183, 10-29 06:49, "On P-146's new text ("the library writes"): he recalls that a previous rewrite..."**
   - He raised: he doubts the trap scenario and the date test behind P-146's rewrite, and says that it is to be discussed in more detail, perhaps with Professor Ryu's 74-page report. The line is the coordinator's words, not his.
   - Verdict: **open: needs his word.**
   - Evidence: P-146's text was rewritten at his go of 08:19:23 UTC on 2026-10-31 (`facts-extract.sh 'history:P-146'`, block of 2026-10-31 08:38Z, commit `71720ae94`). So the wording point is settled. But the detailed discussion never took place. The closing docket's item 1 gives P-146 as "open". A search of his messages from 11-03 to 11-24 finds no word of his on P-146 or `Containment`. The live fork of P-146 is review-queue item 212 (`review-queue.md:144-149`). It is needed by the switch-over.
   - Owed: the discussion of P-146 that he asked for, put as the ask of item 212 before the switch-over.

2. **Line 184, 10-29 05:22, "On P-37's question whether `CompilerSystem` is deleted at the switch-over and its..."**
   - He raised: is `CompilerSystem` deleted at the switch-over? He also asked a scout to check whether he had already discussed it, and asked that P-37 be trimmed. The line is the coordinator's words.
   - Verdict: **open: needs his word.**
   - Evidence: the scout ran and found no word of his on it (`postmortem-2026-10-28/evidence/compilersystem-words.md`, cited in `review-queue.md:629`). P-37 is now 1,399 bytes (`facts-extract.sh 'P-37'`), so the trim is done. The question is review-queue item 319 (`review-queue.md:30`, `:629-634`) and PLAN.md:85, with the default "nothing deletes it until he answers". It is needed by the switch-over.
   - Owed: his answer to item 319 before the switch-over.

3. **Line 182, 10-29 07:44, "On P-42's new text (the default bound): at the end of his expertise..."**
   - He raised: he cannot judge P-42's rewrite, is unsure whether to accept it, and wants to discuss it separately. The line is the coordinator's words.
   - Verdict: **open: needs his word** (one small point).
   - Evidence: the text was rewritten at his go of 08:19 UTC on 10-31 (`history:P-42`, block of 2026-10-31 08:38Z, `71720ae94`). That settles most of the line. One question was dropped between files, though. The cleanup of 11-05 moved item 218 to `coordinator-work-2026-11-05.md:9`, and that file marks it "Skipped: P-42's example is his to change: his lean of 2026-10-29 is that it is asked, not changed without him". So the example of arrays indexed by pairs, which may be false against P-156, was never asked. It is in no review-queue item. P-42 still holds the example (`POSITIONS.md:41`).
   - Owed: ask him whether P-42 keeps its example of arrays indexed by pairs (the docket's draft is `zip`'s pair). No planned work needs the answer.

4. **Line 153, 11-05 12:5x, "The published pages (41 in his client, 64 in all) go on the..."**
   - He ordered: sort the published pages into one-offs and candidates for the permanent record, current and obsolete, for his manual review later. Pages that should stay may move to `docs/` for GitHub Pages. The line is the coordinator's words. His words are at 12:26:34 UTC on 11-05.
   - Verdict: **open: needs his word.**
   - Evidence: the sort is done: `explorations/coordinator/pages-inventory-2026-11-05.md` (`ae376fd7da`: 65 pages, 6 keep, 13 publish, 46 delete). But his manual review is queued nowhere. No line of PLAN, the boot note, the review queue or the work file names the inventory. Only INDEX does. At 15:04 UTC on 11-06, the coordinator told him that 68 pages were still published and that none had been deleted.
   - Owed: put the inventory to him for his review, then delete, keep or publish the pages under `docs/` as he decides.

5. **Line 177, 11-02 07:4x, "The order of the work: correcting the record after a post-mortem, and..."**
   - He raised: after a post-mortem, correct the record and the coordinator skill before the next batch. The coordinator should also weigh its own context size: at about 540K, propose when to compact, land the record by workers first, then compact and boot. The line is the coordinator's words. His words are at 07:46:29 UTC on 11-02 ("do you think you are at your best at 546k context window?").
   - Verdict: **open: waits for the skill writer.**
   - Evidence: no sentence of `.claude/skills/coordinator/` holds either part. A grep for "540", "compact" and "post-mortem" finds only the boot-note rewrite "near the context's limit" (`SKILL.md:264`), which is about the note, not about proposing a compaction. The closing docket's item 8 says "practised on 11-02 ... but in no skill (grep)" and leaves it for the minimal pass, which has not run.
   - Owed: a rule in the coordinator skill, approved by him, that the coordinator judges its context size and proposes when to compact, and that the record's corrections after a post-mortem land before the next batch.

6. **Line 213, 09-29 18:25, "He wants to understand the tests added, e.g. why `PowChooseLcmRungE` has 50..."**
   - He asked: why `PowChooseLcmRungE` has 50 checks. He withdrew a full review. The line is the coordinator's words.
   - Verdict: **open: needs work.**
   - Evidence: `coordinator-work-2026-11-05.md:79`, item 156, "an answer owed", is not marked done. The work file's only later commit, `5112ecc16b`, does not mark it. The coordinator named it as owed at 16:20 UTC on 10-02, and the transcripts after 11-05 hold no "50 checks".
   - Owed: a one-line answer to him on why the test has 50 checks.

7. **Line 188, 10-28 10:39, "Three asks, delegated: did the accidental Haiku 5.5 period produce the weakened..."**
   - He asked three things: whether the Haiku period caused row 816 and the bent entries; whether the exit review's records should be in one place; and whether the coordinator's delegation has declined. The line is the coordinator's words.
   - Verdict: **for analysis** (the third ask). The first two are settled.
   - Evidence: ask 1 is answered in `postmortem-2026-10-28/evidence/haiku-and-row-816.md`, and he accepted it at 11:00:40 ("that was my misremembering"; REPORT.md:48). Ask 2 is done: a README and items 279 to 290 (`41c3b3491`; REPORT.md:49). Ask 3 is "not answered. You placed it 'once we recover from here'" (REPORT.md:50). The closing docket's item 10 says "not measured ... then one analysis worker measures it". No later report measures it.
   - Owed: one analysis worker's measure of whether the coordinator's delegation declined since the early Fable sessions.

8. **Line 178, 11-02 06:51, "The skills are large (several hundred kilobytes) against the aim of a..."**
   - He raised: a consolidation pass over the skills is overdue, toward a minimal, declarative set. The line is the coordinator's words.
   - Verdict: **open: needs work.**
   - Evidence: the principle is in the skill. `skill-rewrite.md:3` says: "A skill is a minimal set: it holds only the change to what the model does by itself, and leans on what its training already does well." That keeps his point. But the pass itself has not run. The closing docket's section 2, item 3 says "The pass has not started". No line of PLAN or the boot note schedules it (grep for "minimal"). The skills now hold 834K characters (`wc -c` over every SKILL.md and part).
   - Owed: the minimal pass over the skills, by `skill-rewrite.md`'s method, given a place in PLAN.

9. **Line 165, 11-03 18:3x, "The review queue, about 100K characters and 312 open items, scared him most..."**
   - He raised: the review queue reads as a full history framed for him to overturn, which is the wrong framing. The consolidation he means covers the review queue, the held list and PLAN. The line is the coordinator's words. His words are at 18:30:31 UTC on 11-03.
   - Verdict: **open: needs work** (only the held-list part).
   - Evidence: the review queue was cleaned on 11-05 (`bd06be5b80`, 312 items to 65 asks) and triaged on 11-23 (`review-queue.md:793`). Its framing is now in the skill: "the one home of each question that waits for the curator's word" (`SKILL.md:29`). PLAN had its third consolidation (`0c28557967`). The held list was never consolidated. It is 84K characters today, which is why this post-mortem runs.
   - Owed: the held list's consolidation, which this post-mortem does.

10. **Line 238, 2026-10-28, "his learning queue: two claims the first draft of his reply to Professor..."**
    - He set aside: two claims, kept out of the letter to Professor Ryu at his word of 22:2x UTC, for his own reading. The line is the coordinator's words.
    - Verdict: **open: needs his word** (his reading; no work waits on it).
    - Evidence: `postmortem-2026-10-28/ryu-claims-check.md` exists. The closing docket's item 23 says "the two claims stay for your reading". No later message of his on them was found.
    - Owed: his reading of `ryu-claims-check.md`, when he chooses.

11. **Line 241, "Ledger row 321 (`asString` rendering), the gate's thread count, row 348 from..."**
    - He owns: four small items of ledger and gate work.
    - Verdict: **open: needs work**, each with a home in PLAN.
    - Evidence: rows 320, 321 and 348 are NEGATIVE-VERIFIED (open) in the gap ledger. Row 321 is in PLAN.md:82, row 348 in PLAN.md:251, and row 320 is under the names at the switch-over (PLAN.md:87). The gate's thread count is PLAN.md:227 (climb batch 11's review, finding 8). The docket's struck row 346 is FIXED and already off the line.
    - Owed: nothing from him. The batches that reach each row do the work, and the line can leave the held list since PLAN holds each item.

12. **Line 239, 2026-09-21, "the two noise commits on `main` (the revert `8fcca6703` of the library-route..."**
    - He decided: the two commits stay for his cleaner pass ("Eh. OK"). The line is the coordinator's words, with his two words.
    - Verdict: **open: needs work** (his own cleaner pass, which is parked).
    - Evidence: both commits are on `main` (`git merge-base --is-ancestor 8fcca6703 main`). The cleaner pass is parked in PLAN.md:254 ("Housekeeping ... the cleaner pass of `main` are left").
    - Owed: nothing now. The cleaner pass in PLAN.md:254 covers it, so the line can leave the held list.

13. **Line 240, "The history rewrite that drops the four verbatim transcript files from main's history..."**
    - He ordered: drop the four transcript files from main's history. The harness's classifier refused the rewrite, so it waits for his cleaner pass. The line is the coordinator's words.
    - Verdict: **open: needs work** (parked with line 239).
    - Evidence: PLAN.md:254 (the whole process record moves to its own branch). The closing docket's item 22 says "keep open for your cleaner pass".
    - Owed: the rewrite in the cleaner pass. PLAN.md:254 should name the four files, or the command of 2026-09-20, before the line leaves the held list.

## The settled lines

- **Line 155, 11-05 12:3x, "He has too many artifacts (41 shown in his client, 64 published): he..."** He wanted a small, stable set of pages, reviewed after each landing and linked from the boot note, and the diff-only form for the `fortress-repo` page. Coordinator's words. His words are at 12:07:28 UTC on 11-05. Settled. `SKILL.md:219` has the boot note hold "the URLs of live pages", and the boot note lists five (`BOOT.md:79-83`). `SKILL.md:125` has a worker update each skill page after a landing. `SKILL.md:201` gives the landed item "with the old words shown struck through and the new words marked", which is the diff form. That keeps his point. The clean-up of the other pages is the open line 153.
- **Line 159, 11-04 20:1x, "The revival page keeps a minimal number of numbers: no distance or checker..."** The page keeps few numbers. Coordinator's words. Settled by the rebuild `713b16f3f0` ("the story rebuilt to the curator's goals ... his read of 2026-11-05 with two notes applied") and his word at 07:56:07 UTC on 11-05: "I am proud of the resulting document."
- **Line 160, 11-04 20:0x, "The revival page's goals, his word: of the coordinator's seven goals (one question..."** The page's goals, with "stakes and turns" struck. Coordinator's words. Settled by the same rebuild and his word of 07:56 UTC on 11-05.
- **Line 164, 11-03 19:4x, "The revival page's purpose, in his words: made for his orientation, to close..."** The page's purpose, one page kept current. His words are at 19:28:04 UTC on 11-03. Settled. The proposal `f2414fe637` led to the rebuild `713b16f3f0`. `update.py` and the record-landing workflow update the page at each landing (`batch.md:26-27`, `:103-105`). He approved at 07:56 UTC on 11-05.
- **Line 166, 11-03 18:2x, "The ten design decisions on the docket: the rule's purpose is also to..."** Each decision is his chance to learn what changed, so he must never be told to take defaults unread. Coordinator's words. His words are at 18:30:31 UTC on 11-03. Settled by `SKILL.md:171`: "Never tell the curator to take it unread: each ask is how the curator learns what the decision changes in the tree." That keeps the part that cuts. This row does not check one by one where each of the ten went.
- **Line 172, 11-02 21:24, "Rule 20: does the page say that the held list's point should be..."** His question on a page comment. Coordinator's words. Settled. The coordinator answered at 21:52:08 UTC on 11-02 ("the held-list point on declarative rules goes in, to resolve the contradiction now"). Rule 20 landed with it (`5114bfece`; closing docket, item 9: "answered in the tree").
- **Line 176, 11-02 07:01, "Main's own sentence "Read a worker's final message yourself" (SKILL.md, "The standing..."** Cut a sentence that does nothing. Coordinator's words. Settled. `8b16560989` cut it (`git log -S`). `sources.md:436` records the cut with his words of 07:01. The sentence is in no skill now.
- **Line 192, 10-22 16:28, "He approves nothing of my explanation of the record from 15:20 to 16:25..."** He approved nothing of that explanation or of the 24 proposals. The record keeping should encode the agents' own habits from pre-training and correct only what went wrong at scale. Coordinator's words. His words are at 16:28:00 UTC on 10-22. Settled. Nothing from that explanation was applied. The record's later clarity pass replaced the 24 proposals (`consolidation-2026-10-22/evidence/positions/`, cited by review-queue items 225, 235, 236 and 240). His principle is `skill-rewrite.md:3`: "it holds only the change to what the model does by itself, and leans on what its training already does well". That keeps it.
- **Line 196, 10-12 21:00, "The name for the coordinator-only files: "the desk" is a stupid name; he..."** Find a better name than "the desk". Coordinator's words. His words are at 21:01:45 UTC on 10-12. Settled as stale. The coordinator dropped the name at 21:07:41 UTC. No skill or record file uses "desk" (grep). The skill names each file instead (`SKILL.md:209-221`), so no collective name is needed.
- **Line 202, 10-12 15:36, "Label which part answers which: unclear; wants its context (the scout: 15 September..."** He wanted the rule's origin. Coordinator's words. Settled. The coordinator gave him the scout's origin at 16:02:11 UTC on 10-12. The rule is in no skill now (grep for "which part answers", "answers which").
- **Line 203, 10-12 15:57, "A step a yes covers: wants how it arose and its wider context..."** The same as line 202. Settled by the same message of 16:02:11 UTC ("it came from the prompting-guides review, not a failure"). The phrase is in no skill now (grep for "yes covers").
- **Line 207, the paragraph "Also waiting for his answer (PLAN-history.md, "Asked 2026-09-27"...)"** Batch 6b's three worker questions, skeptic checks 11 to 13, the filing by the gather, the principle 5 line, and a Fable judge overnight. Coordinator's words. Settled as stale. PLAN's consolidation moved them as answered (`PLAN-history.md:318-324`). Batch 6b landed long ago, and climb batch 36 has landed since. Fable judgements have a go in advance (`delegating.md:28`). Principle 5 lives in `SKILL.md:84`: "Take a worker's report as evidence, not as the list of work to do."
- **Line 217, 09-29 18:52, "Dig up the early discussion comparing Fortress's test suite with the Swift compiler's..."** Dig up the earlier talk. Coordinator's words. His words are at 18:52:49 UTC on 09-29. Settled. A worker found it: the talk was on 09-17 (the report at 19:04:40 UTC on 09-29, "ADDENDUM 2"). The coordinator told him at 17:34:32 UTC on 10-06. The rule is in `fortress-repo`'s SKILL.md: "Assert every value that matters inside the test ... add no expected-output files", and the glossary says "as LLVM's lit does for Swift's test suite".
- **Line 221, 10-03 10:43 (filed under 09-27), "Ideally run all the designs on branches for real numbers and to see..."** Coordinator's words. Settled as stale. The designs were priced, not run (`process-engineering/design-pricing.md`, `050ee4007`, 10-03). Review-queue item 45 was settled at the cleanup of 11-05 (`review-queue.md:981`): the fixed workflow has run every batch since, at 5.03M to 7.22M a batch, against 31M and 37M for the designs.
- **Line 222, "Perhaps the best strategy: per batch, a Sonnet content-only brief, then a blind..."** Settled as stale by item 45, as for line 221.
- **Line 223, "Is that the same as today's preparation (Opus planner, Fable review, then the..."** Settled as stale by item 45, as for line 221.
- **Line 227, 10-03 10:59, "The decisions the designs raise are not the ones he wanted to weigh..."** The coordinator ran the ultracode designs that he meant, cost no constraint, and priced them (the message at 16:55:47 UTC on 10-03, and the page at 17:24 UTC). Settled by item 45.
- **Line 228, "What he is weighing: drop the fixed workflow and always let a Fable..."** Settled by item 45: one fixed batch workflow, and his rules of 06:2x UTC on 11-03 rely on it. No later word of his reopens it.
- **Line 232, 10-09 04:21, "`references/library.md`, "Designing a change": "Put each extension into this library, outside the..."** Settled. `fortress-repo` `references/library.md:31` now reads: "The plainest case is an operation that the library has for one number type, array rank or sibling trait and lacks for another. A declaration of the program's own domain stays in the program." That matches his 05:20 UTC reading and the Opus re-reading (`3cf540c9e`), and keeps the part that cuts.
- **Line 233, 10-09 04:29, "`references/library.md`, "Designing a change": "follow the team's proposal, which no program..."** Settled. `library.md:34` now says "follow the team's unfinished collection design (`Library/incomplete/Collection.fss`)", his own suggested words.
- **Line 234, 10-09 04:58, "`references/tests-writing.md`, "Where a test goes, and how it passes": "An `XXX` test..."** Settled. `tests-writing.md:45` now reads: "An `XXX` test here records a refusal that walk misses: it is green while the program loads and runs clean, and red once walk refuses it." That says what the test records and when it turns red, as he asked.
