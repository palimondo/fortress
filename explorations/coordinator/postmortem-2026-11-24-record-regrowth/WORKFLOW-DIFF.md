<!-- This file is the step-by-step diff between the process that consolidated the record in the autumn of 2026, in its incremental mode after each landing and its batch mode over the whole record, and today's tools for it, the record-landing workflow and the clarity workflow, with the smallest change of the existing tools at each step that differs or is missing. Written 2026-11-24 by an Opus worker for the curator and the coordinator, reading only, at `main` `cbb19da53d`; second pass, on the inventory of the record's work, the tools' change history and the sorting evidence, and on the curator's corrections of that day; it designs no new workflow and decides nothing. -->

# The record's process and today's tools: the diff

## How to read this file

**record**
: The project's memory under `explorations/coordinator/`: FACTS (what is established about the tree), POSITIONS (the curator's decisions), their history files, PLAN, the review queue and INDEX. The curator is the person in charge of the project.

**entry**
: One numbered line of FACTS (F-n) or POSITIONS (P-n). Its **history** is its block in `FACTS-history.md` or `POSITIONS-history.md`: each earlier text, word for word, with a provenance line.

**the process**
: The way the record was consolidated, which the curator wants run as one workflow with two modes. The **incremental mode** runs after one batch lands, on what that batch wrote. The **batch mode** runs over the whole record, in chunks.

**batch, rung, draft, gather, landing**
: A batch is one run of several tasks (rungs), each with its own worker. A rung writes its findings as a **draft** entry; the batch's **gather** stage adds each draft to FACTS. A batch **lands** when its work is committed to `main`.

**the pass**
: The record's rule for turning drafts into entries (`.claude/skills/coordinator/references/record.md:71-86`).

**today's tools**
: The **landing workflow** (`explorations/coordinator/tools/record-landing/`) runs the incremental mode after each landing. The **clarity workflow** (`explorations/coordinator/tools/record-clarity/`) takes a list of entries in chunks; it is the batch mode's way in (section 3).

**chunk, scout, writer, apply file**
: A chunk is a set of entries that one writer rewrites together. A scout is a Sonnet agent that only gathers each entry's evidence. A writer is an Opus agent that writes an **apply file**: each new entry line with a provenance line under it, which `record.py apply` writes into the record while it copies the old line to the history.

**cold reader, checker, judge**
: A cold reader says what each new entry means, with only the worker skill. A checker compares each new entry with its sources. A judge applies or holds each entry once.

**test of decisions**
: The record test of 2026-10-13: a quiz of ten scenarios that a fresh reader answers from the new entries, graded blind (`process-engineering/record-test/`).

Paths without a folder are in `explorations/coordinator/tools/record-landing/`. "Evidence" is `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/`. "Inventory" is `evidence/record-work-inventory.md`; "change history", `evidence/workflow-change-history.md`; "sorting", `evidence/sorting-by-topic.md`; "Oct-briefs", `evidence/october-briefs/` (checked against the transcript, its `README.md`). "Draft rule" is `process-engineering/record-rule-draft.md`. A transcript cite such as `A/002:10867` follows the inventory's form (its "How to read the lines"). Sizes of FACTS by date are bytes of the file at the last commit before that time (`git show C:explorations/coordinator/FACTS.md | wc -c`).

Each block in section 1 gives: the step; what the process did, with its source; what today's tools do, with their source; one word, **same**, **differs** or **missing**; and, where it differs or is missing, the smallest change, by the file that would change.

## 0. How the process was made and run

### 0.1 The incremental mode, 2026-09-19 to 2026-11-24

1. **09-19 to 09-24, the first forms.** FACTS split into current and history (09-19); trimmed for a cheaper boot (09-20); "gardened" and regrouped from sections by event into nine sections by area, the coordinator naming the sections, no entry merged (09-24, `2f105225a8`; sorting, section 3).
2. **09-27 to 10-10, an Opus writer after or before each batch, fifteen times** (inventory, section 4, item 5: 09-27 08:06, 14:41, 18:45; 09-28 04:06, 12:01, 16:51, 22:17; 09-29 09:55, 18:11; 10-02 20:36; 10-03 03:24; 10-08 09:38; 10-09 06:46, 15:55; 10-10 00:00). I read the fifteen briefs at the inventory's lines. What they asked:
   - **Stale text to the history: yes, in all fifteen.** "what a new fact supersedes is folded into the current entry and the old text moves verbatim to `FACTS-history.md`" (batch N, `A/002:10867`); from 10-02 checked by `check-verbatim.py` (batch 8, `A/002:21672`).
   - **The owner of a subject: in part.** Six briefs name "one home per thing" (09-27 18:45 to 09-29 18:11, `A/002:1327` to `A/002:14044`). Only the one before batch 7b gave the writer a list that said, for each new fact, "which entry it supersedes or refines, or that it is new", and told it to "put a new fact in the entry for its area, and point to it from elsewhere rather than restating it" (`A/002:14044`). Several found the entries to change by a grep for the batch's rows, gate path and figures, linked or not (batch N: "check every other entry that names rows 388, 389 ...", `A/002:10867`; batches 8 and 9: "grep `climb-batch-8/gate`", `A/002:22460`).
   - **Merges: none asked.** No brief asked to merge two entries; the gardening of 09-24 said "do not merge entries" (sorting, section 3).
   - **Size: no target.** "a fact at the length it takes" (`A/002:1327`); "Keep FACTS no longer than it must be" (`A/002:2715`); for an added entry "in a few lines pointing to the report that holds the detail" (`A/002:21672`); his own word before the run of 09-29 21:38: "the target token count is, is not the important thing. Important thing is the fidelity of the record" (inventory, section 3, 09-29 21:27:46).
   - **His words on the results:** none on any of the fifteen one by one (inventory, section 5). On the record as a whole: "the consolidation removed almost nothing" (09-30 ~05:25, sorting, section 2); "I don't see a decrease in context size from consolidated FACTS and POSITIONS. Any thoughts?" (09-30 11:32, `HIS-WORDS.md`, Part 2, item 2); "What did it buy us?" on the night's slices of 10-13 (Part 2, item 4). FACTS went from 163K bytes (09-27) to 301K (10-10) over these runs.
3. **10-13, the batch mode** (0.2). The same day the pass was written: "The pass runs when a worker finishes ... In a batch, the commit stage runs it" (draft rule items 43 to 52, `:318-330`). His word: "now we are doing a full garbage collection, but then like we will be doing only an incremental one where the workers do edits after patch and the coordinator does just a small rewrite" (store page, 17:04; inventory, section 2).
4. **10-14, the incremental mode in the October form, once.** "Record pass after batch 14" (`B/001:7301`; its brief file written at `B/001:7288`): read `record.md` whole and "the five worked examples"; rewrite all twelve entries the batch wrote or rewrote; "Where two entries now tell one ground, merge them with `merge`"; one bounded `grep` per entry that the cited section holds what left; report each entry over 600 with its question. Result `15a6d4365`: the twelve entries from 13.2K to 7.2K characters, F-224 merged into F-145, two restated facts replaced by pointers. I found no word of his on it.
5. **10-17 to 11-01, the coordinator routed each batch by hand.** The briefs changed the rule: "Keep each entry's claim whole and its number. Do not split or add entries. For each entry over 600 characters, report it ... do not trim it" (batch 17, `B/001:17255`, line 12 of the prompt); the same for batch 18 without "do not trim" (`B/001:17942`, step 3); the scope became the entries the batch's lists named stale or false. I found no reason or word of his for the change. FACTS went from 93K bytes (10-14) to 140K (10-22).
6. **10-22**, the clarity rewrite (0.2), then hand routing again; at climb batch 24 (10-31) a record writer and a routing worker changed 6 of the batch's 17 entries (`process-engineering/record-landing-workflow.md`, "The batch's own stages"). FACTS: 268K bytes at 11-02.
7. **11-02, the landing workflow**, built to encode the hand route of 10-31, not the pass of 10-14: "does the record's work after a landing, which the coordinator did by hand through a record writer and a routing worker until climb batch 24" (`README.md:5`). Its design leaves consolidation to the clarity workflow (`record-landing-workflow.md:143`).

### 0.2 The batch mode, as it ran

- **Regroupings by subject:** FACTS by area (09-24); POSITIONS under six themes by a Fable worker (09-30, `bc8902f474`); the gap ledger, 638 rows into 15 sections in 40 groups, a grouping agent with the duplicate groups kept together and one rewriter per group (10-08, `ae4f8e38af`; sorting, sections 3, 4, 6). On 10-13 nothing was regrouped; the chunks were the sections that stood.
- **10-13, the consolidation:** the night's seven slices, one at a time, with a Fable checker, refused ("What did it buy us?"); the trial of the ten largest entries, read by him on a page, and his thirteen page comments that made the definition (inventory, section 2); the record test; `record.py` and the numbers; nine scouts and nine writers, two pilot chunks first; Step 12; the repointing of citations (inventory, 10-13).
- **10-21 and 10-22, the clarity rewrite:** the POSITIONS audit, which traced 75 entries to his words in four runs; the clarity pilot of ten POSITIONS entries in two rounds, read by him; the clarity runs over POSITIONS and over FACTS (four runs side by side, 16 chunks of 12); the scrape; the orientation's consolidation from the chunks' `concepts.md` (inventory, 10-21, 10-22).

### 0.3 The coordinator's summary of the method, checked

Five points of it were wrong or need a limit: "keeps every condition" is the clarity writer's line (`record-clarity/writer.md:28`), not October's; the cold reader, checker, fix round and judge ran only on 10-22, with an assessor before the writer and a second cold read after the fix; the test of decisions and the total were October's measures only; on 10-13 he read the trial, not the pilot chunks; and the incremental mode did run in the October form, once, on 10-14 (0.1, item 4), after fifteen earlier per-batch runs that removed little.

## 1. The diff, step by step

### 1.1 The shared core

**C1. The goal, quoted to the writer.**
- Process: the October writers' brief quoted his goal, "significantly smaller ... but not lost any reasoning capabilities", with the measure, 145K for both files and the record test at 27 of 30 (Oct-briefs `05b-writers-template-after-edit.md:6-8`). The fifteen runs before it had "not a size target" and removed little (0.1, item 2).
- Today: no goal in the landing's writer brief (`entries.md:9-15`) or in the clarity writer's (`record-clarity/writer.md:7-14`).
- **Missing.** Change: quote his goal in `entries.md`, "The problem", and in `record-clarity/writer.md`, "The problem". The number for today is a gap (section 4).

**C2. The definition and its worked examples.**
- Process: "What an entry is" and the five worked examples, "Follow them exactly" (Oct-briefs `05b`:12); the 10-14 pass also had the writer read them (`B/001:7288`).
- Today: the landing's writer and checker read "What an entry is" and "The pass" (`entries.md:20`, `check.md:20`), not the examples; the clarity writer reads "What an entry is" (`record-clarity/writer.md:19`).
- **Differs.** Change: name the worked examples in `entries.md:20`, `check.md:20` and `record-clarity/writer.md:19`.

**C3. The six questions, asked of every sentence.**
- Process: questions 1 and 2 keep a sentence; 3 to 5 move it to the history, the report or another entry (draft rule `:131-140`).
- Today: the landing's writer moves detail only "before you add the clause" that a change owes (`entries.md:38`), and a named question settles a length failure (`entries.md:48`; `check.md:27`).
- **Differs.** Change: in `entries.md:38`, questions 3 to 5 on every sentence of each entry in reach; in `entries.md:48` and `check.md:27`, only questions 1 and 2 keep a sentence past 600.

**C4. Each entry near 600 characters, with a named reason above it.**
- Process: 600 is a check, not a cap; an entry above it names the decision that needs the room (draft rule `:144`); clarity: "near 600 ... as a check, not a cap" (`record-clarity/writer.md:36`).
- Today: the draft is the baseline: a long entry "grows only by the clause that its change owes" (`entries.md:38`); `lengths.py` marks growth from AT, the commit the run starts from (`lengths.py:6-8`); the judge holds such growth (`judge.md:24`). In three runs the 44 batch entries went from 84,660 to 84,573 characters (`evidence/landing-workflow-traced.md`, "The answer in short").
- **Differs.** Change: drop the owed-clause bound from `entries.md:38`, `check.md:27`, `judge.md:24` and `lengths.py`; keep the named reason.

**C5. The total of the record as the measure.**
- Process: October's chunk budget, "under 600 characters times its staying entries" (Oct-briefs `05b`:25), and the size of both files before and after; the pass reported "each chunk's total" (draft rule item 50, `:328`). The clarity rewrite set none.
- Today: no stage of either tool reads a total. The landing's last stage charts the record's growth for the revival page (`../revival-page/update.py:9-11`), after the record has landed, and no stage acts on it.
- **Differs.** Change: `lengths.py` prints FACTS's and POSITIONS's totals at AT and after, and the changed entries' total against 600 times their count.

**C6. A scout gathers each entry's evidence.**
- Process: a Sonnet scout per chunk, at a pinned commit, at most 1,500 characters per entry: its sources and whether they resolve, its section of detail, its commits, its earlier texts, the entries that cite it, his dated words (Oct-briefs `03-scouts-template.md:8-19`).
- Today: the landing has a script in its place, `evidence.py` (`evidence.py:12-16`; by design, `record-landing-workflow.md:165`). The clarity workflow has none for FACTS: its assessor and writer read the sources themselves (`record-clarity/assess.md:7`).
- **Differs.** Change: none for the landing's script; for the batch mode, B5.

**C7. Every entry is judged by six checks before any rewrite** (clarity).
- Process: the assessor marks scope, present meaning, evidence, comprehension, ownership and consistency, and gives keep, reword, reorganize or investigate (`record-clarity/assess.md:9-16`).
- Today: the clarity workflow, the same. The landing's sorter weighs "the pass" by meaning only, "high, ... low, ... none" (`sort.md:32`, `:40`); 15 of 44 passes got weight none (`landing-workflow-traced.md`, section 7, item 3).
- **Differs** (in the landing). Change: in `sort.md:32` and `:40`, weigh "the pass" by the six checks of `record.md:43-57`; weight none only when all six pass.

**C8. One writer holds one subject area.**
- Process: an October chunk was one section or a third of one (Oct-briefs `06-writers-chunk-script-rest.md:9-18`), at his wish for "a shared context" (`HIS-WORDS.md` 4.7).
- Today: the landing's one entries writer takes the batch's entries of every section (`entries.md:11`); the clarity chunks are cut in file order by the caller (`consolidation-2026-10-22/runs.json`).
- **Differs.** Change: none for one landing; for the batch mode, B1.

**C9. Merge two entries where one home is right.**
- Process: "Merge two entries where one home is the right answer" (Oct-briefs `05b`:24); 11 merges on 10-13; F-224 into F-145 on 10-14.
- Today: the clarity assessor's "reorganize" includes "a merge with an entry that owns the subject" (`record-clarity/assess.md:13`), and the clarity run merged F-246 into F-259 (`0ae072be72`). The landing's nine homes hold no merge (`sort.md:30`), and its writer writes "for each entry, its whole new line" (`entries.md:44`).
- **Differs** (missing in the landing). Change: a home "merge into F-n" in `sort.md:30`; `merge` lines in `record.apply` (`entries.md:44`; `record.py apply` takes them); a merge in coverage (`check.md:25`).

**C10. Remove no entry in the rewrite.**
- Process: "remove none, since the entries that leave move at a later step" (Oct-briefs `05b`:24).
- Today: neither tool removes an entry in its rewrite.
- **Same.**

**C11. Keep every condition** (clarity).
- Process: "Keep every condition, exception and limit" (`record-clarity/writer.md:28`).
- Today: the landing's writer reads that section (`entries.md:21`); its checker fails a lost condition (`check.md:26`).
- **Same.**

**C12. Name the home of each cut, and keep the old line word for word.**
- Process: a provenance line per entry with "a note on what moved where" (Oct-briefs `05b`:24); `record.py apply` copies the old line.
- Today: the same in both tools (`entries.md:44`; `record-clarity/writer.md:42`; `checks.sh:76`).
- **Same.**

**C13. Where a cut sentence may go.**
- Process: October's question 5 allowed "the skill's part" (draft rule `:137`); the clarity writer sent concepts to `concepts.md` and did not lean on the skill's revival part (`record-clarity/writer.md:33`).
- Today: the landing's writer may point to "the `fortress-repo` skill's part that already says it" (`entries.md:38`).
- **Same** as October. His word of 11-24, "Facts can never cite skill" (`HIS-WORDS.md` 5.3), overrules it; see section 6, item 9.

**C14. The writer applies and checks its own file.**
- Process: each October writer ran `record.py apply` and `check --base` in a worktree of its own, read the sizes and fixed its file until the check and the budget passed (Oct-briefs `05b`:25).
- Today: the writers of both tools are headless streams that cannot run `record.py` (`README.md:26`); the landing's `checks.sh` applies after each round, and the clarity workflow applies nothing (`record-clarity/README.md:28-33`).
- **Differs.** Change: none of its own; with C5, the landing's fix round sees the totals in `mech-1.md`.

**C15. An Opus writer in the register.**
- Process: Opus writers; from 10-22 a headless Opus stream with the skill writer's standing brief, halfway to ASD-STE100.
- Today: the same stream in both tools (`entries.md:5`; `tools/tiers.sh`: Opus).
- **Same.**

**C16. A cold reader** (clarity).
- Process: an Opus reader with only the skill's core and area parts (`record-clarity/coldread.md:5-11`).
- Today: the same brief in both tools (`record-landing.js:90`).
- **Same.**

**C17. A check against the sources.**
- Process: the pass's step 3, "The cited report section holds what the entry left out" (`record.md:80`); the clarity checker's fidelity check (`record-clarity/check.md:13`).
- Today: the landing's fidelity is "no more and no less than its ground", the ground being the owed change, so a cut that no change named fails as "less" (`check.md:26`; `landing-workflow-traced.md`, section 7, item 6).
- **Differs.** Change: in `check.md:26` and `judge.md:24`, a cut passes when the home that its provenance names holds the text.

**C18. One round of fixes.** Process: `record-clarity/fix.md`. Today: one fix round in both (`entries.md:52`). **Same.**

**C19. A second cold read** (clarity).
- Process: "Reread: a second cold read of the fixed entries" (`record-clarity/README.md:14`).
- Today: the clarity workflow, the same; the landing has none (`record-landing-workflow.md:223`).
- **Differs** (missing in the landing). Change: a second `coldread.md` agent after the fix round in `record-landing.js`, against the design's cost lever.

**C20. A judge decides each entry once.**
- Process: apply or hold; a held entry keeps the record's text (`record-clarity/judge.md:9-10`).
- Today: the landing's judge adds a hold of growth past the owed clause (`judge.md:24`), and a hold keeps the batch's draft whole (`landing-workflow-traced.md`, section 7, item 7).
- **Differs.** Change: the growth hold goes with C4.

**C21. Apply, check that nothing is lost, commit.**
- Process: the coordinator applied each file on `main` and ran `record.py check --base` (`consolidation-of-october.md:32`).
- Today: the landing's `final.sh` and Land stage (`README.md:11-12`); the clarity workflow leaves it to the coordinator (`record-clarity/README.md:33`).
- **Same.**

**C22. A test of decisions.**
- Process: the record test, 27 of 30 or better, on the pilot (29) and the whole result (30) (`consolidation-of-october.md:119-125`).
- Today: neither tool runs it; the landing's design left it out (`record-landing-workflow.md:312`); `record.md:98` asks for a quiz in a consolidation and names no kit.
- **Missing.** Change: B7.

### 1.2 The incremental mode: one landing

**I1. A worker with a fresh context consolidates after each landing, before the next batch.**
- Process: an Opus writer before or after each batch, fifteen times, then the pass of 10-14 (0.1); his words: "after landing a batch, we do the effects [facts] consolidation before we launch a new one" (`HIS-WORDS.md` 6.1).
- Today: the landing workflow after each landing (`README.md`, "Running it").
- **Same.**

**I2. Every entry the batch added or changed is passed.**
- Process: the 10-14 pass took all twelve (`B/001:7288`).
- Today: "Each entry that the batch added or changed gets one change of kind "the pass"" (`sort.md:40`).
- **Same.**

**I3. Superseded text is folded into the current entry, and the old text goes word for word to the history.**
- Process: all fifteen briefs (0.1, item 2).
- Today: `record.py` copies the old line; "Only how the fact came about goes to the history" (`entries.md:36`).
- **Same.**

**I4. A new fact goes into the entry that owns its subject; two entries on one ground merge.**
- Process: "put a new fact in the entry for its area" with an owner list (`A/002:14044`); "Where two entries now tell one ground, merge them" (10-14, `B/001:7288`); `record.md:77`.
- Today: the gather adds each draft "after the section's last entry" (`climb-batch-workflow.js:1045`), and the landing keeps it as its own entry (`evidence/f63-traced.md`, 4.3).
- **Missing.** Change: in `sort.md`, a search of FACTS by each added entry's terms for an entry on the same subject, and a change "merge into F-n" where one owns it (with C9).

**I5. A changed behaviour or figure is found in every entry that states it, linked or not.**
- Process: batch N's "check every other entry that names rows 388, 389 ..." (`A/002:10867`); the grep of the gate path (`A/002:22460`); `record.md:82`.
- Today: `cites.md` lists only entries that name a changed entry or row by number (`evidence.py:16`).
- **Differs.** Change: the same search in `sort.md`, or printed by `evidence.py` into `cites.md`.

**I6. The batch's entries are cut to the form.**
- Process: the 10-14 pass: twelve entries from 13.2K to 7.2K characters (`15a6d4365`).
- Today: the draft is the baseline (C4); the hand route's "do not trim it" of 10-17 lives on as `entries.md:38` (0.1, item 5).
- **Differs.** Change: as C3, C4 and C9.

**I7. Each entry is checked against its cited section and its scope.** Process: the pass's step 3 (`record.md:79-81`). Today: the checker's fidelity class reads the Detail (`check.md:26`). **Same.**

**I8. Plan and status leave the entry.** Process: `record.md:83`. Today: `check.md:27`. **Same.**

**I9. The pass reports each entry's size and the total.**
- Process: draft rule item 50 (`:328`); the fifteen briefs asked for the file's size before and after (`A/002:2715`).
- Today: `lengths.py` lists changed entries; no total.
- **Differs.** Change: as C5.

**I10. POSITIONS at each landing.**
- Process: "Run the same pass on POSITIONS at each landing" (`record.md:86`).
- Today: a sentence the tree made false changes by the fewest words; a change of a decision is held (`entries.md:24-26`; his rule of 10-31).
- **Same.**

### 1.3 The batch mode: the whole record

Today's way in for the batch mode is the clarity workflow, which the coordinator runs, with the steps that `record.md:88-98`, "A consolidation", gives for him. The landing workflow has no batch entry point.

**B1. The record is sorted by subject, with a search for duplicates, before the chunks are cut.**
- Process: FACTS regrouped by area (09-24), POSITIONS by theme (09-30), the ledger by a grouping agent that kept duplicates in one group (10-08; his word: "the worker that does the grouping can spot the duplicates as well", sorting, section 6, and inventory, section 3, 10-08 09:58:58). On 10-13 the sections already stood.
- Today: neither tool nor `record.md` has such a step; the clarity chunks are cut in file order (`consolidation-2026-10-22/runs.json`).
- **Missing.** Change: around the clarity workflow, a grouping step before the run, on the model of the ledger rewrite's Group stage, whose output is the run's `chunks`.

**B2. A trial on the largest entries, read by him, makes the rule.**
- Process: the ten largest entries (eight of FACTS, two of POSITIONS, 36.3K to 5.9K) cut with "Your default is to cut" (Oct-briefs `01-record-rule-trial-brief.md:8`), on a page, old beside new; his thirteen comments of 11:33 to 16:03 asked for questions with examples (15:34), a reason for any length above the check (15:38), the register halfway to ASD-STE100 and one entry per moving count (15:46), one home with pointers (15:51), and an outline before any entry leaves (15:25) (inventory, section 2).
- Today: none; its product, the definition, exists (`record.md:14-59`).
- **Missing.** Change: none; it was done once.

**B3. A pilot that he judges before the chunks.**
- Process: on 10-13, the trial above, then two pilot chunks that only the record test judged; on 10-22, a POSITIONS pilot of ten entries in two rounds that he read, and a FACTS calibration chunk of five. His correction of today: round 1, a mix with one entry of each kind that the sorting finds (one to split, two to merge, one with a defect, a stale one, a sound one), read on a page; round 2, one whole section, which he skims; then the chunks. The trial of 10-13 was picked by size alone.
- Today: "run a pilot of three or four entries first ... Run the rest on the curator's go" (`record.md:92`); one round; the landing "takes no pilot".
- **Differs.** Change: around the clarity workflow, two runs on chosen chunks, each with its page and a stop for his go; `record.md:92` names the two rounds.

**B4. Each POSITIONS entry is traced to his words before it is rewritten.**
- Process: the audit of 10-21, 75 entries in four runs (inventory, 10-21).
- Today: the mining workflow (`record.md:107`; `positions-audit/README.md`) and the clarity writer's evidence by `entries.py` (`record-clarity/writer.md:21`).
- **Same.**

**B5. Chunks with a scout each, and writers side by side.**
- Process: on 10-13, nine chunks by section, 19 to 42 entries; a scout before each writer; each writer in a worktree of its own (`/home/user/rec-<chunk>`), one apply file per chunk, no writer commits to the record; the coordinator applied the files one after another on `main` and checked each on the newest `main` (sorting, sections 8 and 9). At most four scouts and three writers at once. On 10-22, four runs side by side, 16 chunks of 12, one writer stream per run (sorting, section 10).
- Today: `record.md:93-96` holds the October steps by hand. The clarity workflow takes the chunks as a list (`record-clarity.js:15`, `:44`), runs side by side as several runs, each with its own stream (`record-clarity/README.md:17`), writes one `final.apply` per chunk and applies nothing; the coordinator applies each, "on a copy of the record, `record.py check --base`, then on `main`" (`record-clarity/README.md:33`). No scout; the writer has no worktree and cannot apply or check its own file (C14). The landing runs one worktree per landing, with two writers on different homes, and its Land stage applies.
- **Differs.** Change: around the clarity workflow, the October scouts before the run, each writing `scout.md` into its chunk's folder; inside, one clause each in `record-clarity/assess.md` and `writer.md` to read `scout.md` when it is there, as they read `findings.md`.

**B6. No adversarial Fable review of a consolidation.**
- Process: the Fable check of 09-30 was accepted; on 10-13 he refused an adversarial Fable review, "It always puts in like stupid ideas like keeping everything" (`HIS-WORDS.md` 4.14).
- Today: "Run no Fable review of the entries" (`record.md:97`); neither tool has one.
- **Same.**

**B7. The test of decisions and the total on the finished record.**
- Process: the record test on the finished record, 30 of 30; FACTS and POSITIONS from 361K to 200.6K (`consolidation-of-october.md:122`; Oct-briefs `07b-step12-brief-as-edited.md:6`).
- Today: `record.md:98` asks for "a small quiz of decisions"; no kit is named and no tool runs it; no total.
- **Differs.** Change: around the clarity workflow, the kit of `process-engineering/record-test/` after the chunks, with scenarios for today's entries; name the kit in `record.md:98`.

**B8. Whole entries leave by subject, once, and their pointers are repointed.**
- Process: Step 12, chosen beforehand by section from an outline, each removal after a grep found its rule in its new home (Oct-briefs `07b`:12-21), then the repointing of citations (10-13 23:02, inventory).
- Today: none in either tool.
- **Missing.** Change: around the clarity workflow, a step of its own after the chunks. His word of 11-24 limits it to entries that are not about the project (`HIS-WORDS.md` 5.3).

**B9. A deletion-only sweep of state words and pointers to PLAN.**
- Process: the scrape of 10-22, 41 facts and 65 decisions, checked by `words-subset.py` (commit `3822898328`).
- Today: `words-subset.py` exists and checks POSITIONS lines marked cut-only (`checks.sh:56-71`); no sweep.
- **Missing.** Change: around the clarity workflow, the same scrape step, if the chunks leave state words.

**B10. A history note for an entry kept word for word.** Process: 10-22 08:31 (inventory). Today: `record.py note` (`record.py`, its header). **Same.**

**B11. Concepts go from the entries to the worker skill.**
- Process: the clarity writer's `concepts.md`, which the orientation's consolidation read (`record-clarity/writer.md:33`; inventory, 10-22 12:38).
- Today: the clarity workflow, the same; the landing's writer puts skill detail in its report for the skill writer (`entries.md:38`).
- **Same** (in the batch mode).

**B12. Chunks are applied one after another, a split or merge first.**
- Process: "f10 before f9 for F-203"; "F-246 merged into F-259" (sorting, section 10).
- Today: `record-clarity/README.md:33`; `record.md:96`.
- **Same.**

### 1.4 Steps that ran but did not work, and what today keeps of them

- **The first POSITIONS cleanup by a new rule, 09-27.** Refused: "so we overdid it with the compression in POSITIONS? But did not win that much in size" (`HIS-WORDS.md`, Part 2, item 1). Today: not kept.
- **Consolidations with no size goal, 09-27 to 10-10.** "the consolidation removed almost nothing" (sorting, section 2). Today: kept; neither tool has a goal or a total (C1, C5).
- **The night's slices, one at a time, with a Fable checker in his place, 10-13.** Refused: "What did it buy us?" Today: not kept.
- **The hand routing's "keep each claim whole; do not split or add entries; do not trim", from 10-17.** Today: kept, as the owed-clause bound and the absent merge home (`entries.md:38`; `sort.md:30`).
- **A run's own brief over the clarity tool's briefs, 10-26.** Refused and undone: "Yes please, undo the damage" (change history, blocks 2 and 3). Today: not kept.

### 1.5 The count

44 steps of the process: 19 same, 18 differ, 7 missing. Core: 8 same, 12 differ, 2 missing. Incremental mode: 6 same, 3 differ, 1 missing. Batch mode: 5 same, 3 differ, 4 missing (one of them, B2, needs no change). In the first pass of this file, which compared only the landing workflow and counted the batch mode as absent from it, 37 steps stood at 13 same, 12 differ and 12 missing.

## 2. What today's tools do that the process did not

- **The sort by home, kind, weight and ground** (`sort.md:23-47`). Serves: it guards against one output for many homes, the fault of 10-29 (`record-landing-workflow.md:61-78`). Its weight by meaning alone works against (C7).
- **The routing writer** for PLAN, PLAN-history, the queue, INDEX and other notes (`routing.md`). Serves his ask that the whole record be brought in line (`HIS-WORDS.md` 4.9, 8.3). Neutral to FACTS's size.
- **Ledger row rewrites and new rows** (`checks.sh:80-114`). Neutral.
- **The POSITIONS rule of 10-31** (`entries.md:24-26`). Serves: his rule.
- **The clarity tool's findings clause, taken into the pass.** `entries.md:21` makes each owed change a "finding", so "Change nothing that no finding names, and let an entry grow only by what its corrections need" (`record-clarity/writer.md:23`) binds the pass. The clause came on 10-28 for corrections (change history, block 4), after the clarity run that worked. Works against.
- **"No more and no less than its ground"** (`entries.md:15`; `check.md:26`). Serves fidelity; works against a cut (C17).
- **The draft as the baseline for length** (C4). Works against.
- **A named question settles a length failure** (C3). Works against.
- **The bounding commit and what a fact blocks stay; a claim extended to the landing's batch carries its figures** (`entries.md:36-37`). Serves; adds text.
- **F-53's and F-240's figures kept as the commit stage wrote them** (`entries.md:30`). Neutral.
- **The mechanical checks** (`README.md:20-24`). Serve the routing; neutral to size.
- **It lands itself and pushes; the coordinator reads `diff.md` after** (`README.md`, "Landing its result"). Serves his rule of 11-03. It also removes the one read of form by a person, which the design names as the only check that caught length (`record-landing-workflow.md:76`).
- **The chain after the record:** the orientation update, the skill update, the page of skill changes, the pushes and the revival page (`README.md:12-18`). Neutral to the consolidation; 53% of a run's minutes (section 5).
- **A pointer to the skill's part as a home** (`entries.md:38`). Against his word of 11-24 (C13).
- **A decision that is not consequential "closes as landed, stated in FACTS or a row"** (`routing.md:29`; change history, block 25). Works against in part: text that the queue held now enters FACTS entries.

## 3. The two tools as one process with two modes

### 3.1 Where they overlap today

| stage | clarity workflow (batch mode's way in) | landing workflow (incremental mode) | shared |
|---|---|---|---|
| input | a kind and chunks of entries, chosen by the caller; optional `findings.md` (`record-clarity/README.md:21-26`) | a batch, its base and its landing; no text (`README.md:28`) | no |
| several at once | several runs side by side, each with its own stream (`record-clarity/README.md:17`) | one run per landing | no |
| evidence | none for FACTS; `entries.py` for POSITIONS | `prepare.sh`, `evidence.py` | no |
| what to rewrite | assessor, six checks (`assess.md`) | sorter, nine homes (`sort.md`) | no |
| write | `writer-stream.sh` with `writer.md` | `writer-stream.sh` with `entries.md`, which reads `writer.md` | stream, part of the brief |
| cold read | `coldread.md`, twice | `coldread.md`, once | same brief |
| check | `check.md` | `check.md`, using the clarity step 1 | method |
| fix | `fix.md` | "The fix round" of `entries.md` | stream |
| judge | `judge.md` | `judge.md`, the clarity verdicts plus the length hold | verdicts |
| apply | the coordinator, chunk by chunk | `final.sh`, the Land stage | `record.py` |
| output | one folder per chunk: `final.apply`, `queue.md`, `concepts.md` | `diff.md`, two commits, the chain after | no |

### 3.2 The batch mode through the clarity workflow

The batch mode's way in exists. The clarity workflow takes a list of entries in chunks (`record-clarity.js:15`, `:44`), runs as several runs side by side (`record-clarity/README.md:17`; four runs on 10-22, sorting, section 10), and hands the coordinator one folder for each chunk with its `final.apply` and `queue.md` (`record-clarity/README.md:28-35`). Its script is unchanged since the run that worked (`git diff 913ba1cbfc -- record-clarity.js` is empty). What must be added for it to do the batch mode's whole job, with its stages left as they are:

1. **The sorting map and the search for duplicates, before the chunks are cut.** Around the tool: a grouping step whose output is the `chunks` argument, on the model of the ledger rewrite's Group stage (sorting, section 6).
2. **The scout before the writer.** Around the tool: the October scouts, writing `scout.md` into each chunk's folder before the run. Inside: one clause each in `assess.md` and `writer.md` to read it when present, as they read `findings.md`.
3. **The merge.** Inside, already: the assessor's "reorganize" names a merge (`assess.md:13`), and the run of 10-22 merged F-246 into F-259. Across chunks it needs item 1, so that the entries to merge share a chunk.
4. **The goal, with the size of the whole record.** Inside: one sentence in `writer.md`, "The problem", with his goal; `writer.md:36` then names the total beside the 600 check. This brief is shared with the landing's writer (`entries.md:21`), so the change reaches both modes. Around: the coordinator measures the total after each chunk is applied.
5. **The pilot in two rounds.** Around: two runs on chosen chunks, each with a page, and a stop for his go (B3).
6. **The test of decisions.** Around: the kit after the chunks (B7).
7. **The step in which whole entries leave by subject.** Around: a step of its own after the chunks (B8).

Six of the seven are around the tool. Two clauses (items 2 and 4) go inside its briefs, and item 4 changes the brief that both modes share; under his rule that a tool that worked is not bent to a new job, those two are the ones to put to him first.

### 3.3 The incremental mode

The incremental mode stays in the landing workflow. Section 6 gives its adjustments. One option sits between the two tools: the landing's entries stage could run the clarity workflow on the batch's entries for "the pass", and keep its own writer for changes made false and for the routing. That would put the October and clarity steps into the pass whole, but it is a change of design and is his decision.

## 4. Gaps that the process does not cover

1. **Sorting entries by subject across the record.** On 10-13 the sections were already by area, and only 11 entries merged. Today entries follow the batch that made them: 38 of a sample of 40 hold claims that answer different questions (`f63-traced.md`, "In short", item 10). The ledger's grouping of 10-08 is the only model, and it ran on rows, not entries.
2. **Where an entry is born.** The batch brief asks each rung for "The FACTS.md entry the rung earns", added at its section's end (`climb-batch-workflow.js:623`, `:1045`). The process started from text already written. His word: "Fix where an entry is born" (`HIS-WORDS.md` 8.6).
3. **The number for today's total.** October's 145K came from about 240 entries times 600 (draft rule `:144`); he accepted 222.8K after the clarity rewrite; FACTS holds 339 entries today. "It is a problem when the sum is too large" (`evidence/briefs-compared.md:126`) names no number.
4. **A test of decisions for today's entries.** The kit's scenarios rest on 14 entries of 10-13. No rule says who writes new ones, or when (`HIS-WORDS.md`, open 8-B).
5. **When the batch mode runs again.** "If the record starts drifting again" (`HIS-WORDS.md` 4.2) names no measure of drift.
6. **The skill as a home.** The process's question 5 allows it, `record.md:40` still says so, and his word of 11-24 forbids it.
7. **Tests named in an entry.** Open with him (`briefs-compared.md`, section 4).
8. **The reason for "do not trim it".** The hand routing of 10-17 dropped the pass of 10-14 with no reason that I found; the process has no rule that keeps a later brief from dropping a step.

## 5. The later changes, each judged

The 25 changes made to the two tools after each one's first good run (change history, section 2.1). "Told": **yes** = he asked or said yes before; **before** = told before, no yes; **after** = told after; **none** = no telling found. Effect on the consolidation: serves, neutral or against. The changes he was told of only after, or not at all, are in bold.

| # | commit | what | told | effect | keep? | reason |
|---|---|---|---|---|---|---|
| **1** | `6026231ff5` | clarity: `words-subset.py` | **none** | serves | stay | It proves that a scrape or a POSITIONS cut only deletes words. |
| **2** | `bedc80b01d` | clarity: a run's own brief | **after** | against | taken back (3) | It let a run's brief override the tool; 13 texts grew 1.9 times. |
| 3 | `18788035c0` | clarity: that brief taken out | yes | serves | stay | It restored the tool that worked. |
| 4 | `9a37e8401f` | clarity: the findings input | yes | neutral; against in the landing | stay; adjust its use | Right for corrections; `entries.md:21` turns it into the pass's rule. |
| 5 | `9a27211250` | clarity: a ground's dates stay out | yes | serves | stay | It keeps entries timeless. |
| 6 | `a1d0d63c69` | landing: Land stage, orientation as a child | yes | Land neutral; child neutral, 46 min | stay; adjust the child | Land is his rule of 11-03; the child keeps the run open (section 6). |
| 7 | `b18a3a06d8` | landing: judge brief for Land | yes | neutral | stay | Follows 6. |
| 8 | `9df988bf4b` | landing: "Next" names `land.commits` | before | neutral | stay | Follows 6. |
| 9 | `2dc73945eb` | landing: README pointer | yes | neutral | stay | Text only. |
| 10 | `6edff99a78` | landing: skill update, cold read, fixes, page, push | yes | neutral; 25 min | stay; adjust | His ask; its place in the run is a finding (section 6). |
| 11 | `2cb97b6a3c` | page: only unread items | yes | neutral | stay | His ask. |
| 12 | `0ab588e3d6` | page: "the coordinator", never "you" | yes | neutral | stay | His ask. |
| 13 | `b88d26f52e` | landing: revival page stage | yes | neutral; it charts the record's size | stay | His ask; 0.7 min. |
| **14** | `36ce6e303c` | landing: `rows.add`, the whole stale list | **after** | neutral | stay | Serves the routing; the two brief changes that it named as waiting for his yes are not in git. |
| **15** | `3747769992` | clarity: two agents per run, not per machine | **none** | serves | stay | It allows the batch mode's runs side by side. |
| 16 | `551b028584` | landing: the whole skill in line | yes | neutral | stay | His yes. |
| 17 | `e95fd785e5` | page: read every comment first | yes | neutral | stay | His ask. |
| **18** | `adbbf2051a` | page: the cold read's fixes | **after** | neutral | stay | Small and right. |
| **19** | `760864d794` | page: the comments' cursor | **after** | neutral | stay | Small and right. |
| 20 | `9a0f69e01a` | the Fable week | yes | against his rule 4.12 while on | taken back (21) | His own order for one week. |
| 21 | `4569e7c59c` | tiers regular again | yes | serves | stay | Only Opus writes record text. |
| 22 | `2c7990acea` | revival page script; PLAN lines in its form | before | neutral | stay | It ties the routing writer's wording to a page script; watch it. |
| 23 | `403a0e60cb` | skill task: a trap goes to the coordinator | before | neutral | stay | It serves P-180. |
| **24** | `49a9f1fcb1` | queue check; lander takes resumed commits | **after** | neutral | stay | A repair. |
| 25 | `5e6bd1b311` | only questions in the queue | before | against in part | adjust | "stated in FACTS or a row" moves text into entries; state it there only where question 1 keeps it. |

One more change came before the 25 and shapes every run: `575d555945`, the eight fixes after the replay, told after (change history, 2.0). Its fix 5, the hold of a long entry that grows past its owed clause, works against the consolidation: take it back (C4). Its fixes 1 and 2 serve meaning. The skill text `5114bfeceb` gave the landing workflow the consolidation's job on his "LGTM" to the coordinator's words, without a change to the tool (change history, 2.2; `HIS-WORDS.md`, Part 3).

## 6. The length of a run: findings for him

Facts (change history, sections 4 and 5; the 15 runs of climb batches 26 to 36 without batch 30):

- A run takes 133.1 minutes on average. The five first stages, Sort to Judge, take 60.8 (40.5 to 90.5); the stages after the judge take 72.3, 53%.
- After the judge: Land 1.1; the orientation update 46.0 (5.8 to 106.5, median 44); the skill update, its cold read and fixes 11.4; the page 13.6; the push 0.3; the revival page 0.7.
- The record is on `main` and pushed when the Land stage ends. Nothing after it delays the record's landing. It delays the run's end, the coordinator's review of it, and whatever waits for the run.
- Tokens at climb batch 34: 4.05M in all, the record 1.64M, the orientation 1.40M, the skill 0.28M, the page 0.50M, the revival page 0.23M (change history, section 4, notes).
- The five first stages grew from 34.5 minutes at climb batch 25 to 60.8 on average; Sort from 6.3 to 18.9, Check from 5.6 to 14.3. The batches sorted 52 to 273 changes, and the whole stale list of PLAN came into the evidence at block 14; no pair of runs isolates a cause.

Each stage after the judge:

- **Land.** Serves: the record lands with no step of the coordinator's (his rule of 11-03). It must run in the same run at each landing. No change.
- **The orientation update.** Serves: the worker skill's revival part in line with the landing's facts, on their final wording (`HIS-WORDS.md` 5.2, 5.4). It must run after each landing and end before the next batch's workers read the skill. It need not run inside the same run: he spoke of "two workflows" (H18), and it needs only the landed commits and `diff.md`'s list of facts. Smallest change: the run ends after its push, and the update starts as its own run on the same list.
- **The skill update, its cold read and fixes.** Serves: the skill's sentences made false by the landing (`coordinator` skill, `references/batch.md`, "The landing", step 4). Same need as the orientation, which it follows. Smallest change: it goes with the orientation update in that separate run.
- **The page of skill changes.** Serves: his surface for reading the changes "whenever I want", which "should not change the procedure" (change history, block 10). Nothing waits on it. Smallest change: it runs after the skill run, or on his ask, or for several landings at once.
- **The push.** Serves: the skill's commits reach `main`. It goes with the skill run.
- **The revival page.** Serves his ask that the page follow each landing (`HIS-WORDS.md` 6.5); 0.7 minutes. Its script's stop has ended a run (batch 31). Smallest change: none for time; it may move with the page.

With these moves the run that holds the record would end near the mean of its first six stages, about 62 minutes, and the 72 minutes of the rest would run beside the coordinator's review. Whether the next batch waits for the skill run is his choice.

## 7. The adjustments, in order, for one workflow with two modes

Each change of a brief needs his yes (`README.md:28`; `record-clarity/README.md`, the briefs).

**The incremental mode (the landing workflow)**

1. `entries.md:21`: the findings clause governs an owed correction, not "the pass". Small. Restores the 10-14 pass, whose brief had no such clause.
2. `entries.md:38`, `:48`, `check.md:27`, `judge.md:24`, `lengths.py`: questions 3 to 5 on every sentence; only questions 1 and 2 keep a sentence past 600; the owed-clause bound and the growth hold go (fix 5 of `575d555945` taken back). Small, in five files. Restores draft rule `:131-144` and his "it needs to have a reason to be that large, because we want that compressed benefits" (10-13 15:38).
3. `check.md:26`, `judge.md:24`: a cut passes when its named home holds it. Small. Restores the pass's step 3 (`record.md:80`).
4. `entries.md:20`, `check.md:20`: the worked examples. Small. Restores October's "Follow them exactly" and the 10-14 brief.
5. `entries.md`, "The problem": his goal. Small. Restores the October writers' brief and `HIS-WORDS.md` 8.8.
6. `lengths.py`: the totals of FACTS and POSITIONS and the changed entries' total against 600 times their count. Small. Restores draft rule item 50.
7. `sort.md:32`, `:40`: the pass weighed by the six checks. Small. Restores the clarity assessor (`assess.md`).
8. `sort.md:30`, `entries.md:44`, `check.md:25`: a merge home. Medium. Restores "Merge two entries where one home is the right answer" (10-13) and the merge of 10-14; `HIS-WORDS.md` 4.5.
9. `entries.md:38` and `record.md:40`: no skill part as a home for a cut. Small; `record.md` through the skill writer. Restores his word of 11-24 (`HIS-WORDS.md` 5.3).
10. `routing.md:29` and `sort.md`: a decision that is not consequential enters FACTS only where question 1 keeps it. Small. Restores `record.md:23` (no status in an entry).
11. `sort.md` and `evidence.py`: a search of FACTS by subject, linked or not, for each added entry and each changed behaviour. Medium. Restores the owner list of 09-29 (`A/002:14044`), the grep of batch N (`A/002:10867`) and `record.md:77`, `:82`; his "find the duplicates" (`HIS-WORDS.md` 6.2).
12. `record-landing.js`: a second cold read after the fix round. Small. Restores the clarity reread.
13. `record-landing.js` and `README.md`: the run ends after its push; the orientation update, the skill update and the pages run as their own run (section 6, a finding for his decision). Medium. Restores his "two workflows" (H18) and answers "running very, very long now" (11-24 21:33).

**The batch mode (the clarity workflow, with steps around it)**

14. Around: a grouping step with a search for duplicates, whose output is the run's chunks, by section, 20 to 32 entries (`record.md:93`). Medium. Restores the regroupings of 09-24 and 09-30 and the ledger's of 10-08; `HIS-WORDS.md` 4.5.
15. Around and inside: the scouts before each run, writing `scout.md`; one clause each in `record-clarity/assess.md` and `writer.md` to read it. Medium (the step), small (the clauses). Restores the scouts of 10-13; `HIS-WORDS.md` 4.7.
16. Inside, shared: `record-clarity/writer.md`, "The problem" and `:36`: his goal and the total beside the 600 check; with C2, the worked examples at `:19`. Small. Restores the October writers' goal and measure. It reaches both modes.
17. Around: the pilot in two rounds, a mix by kind then one section, each with a page and his go; `record.md:92` says so. Small (the text), with the coordinator's step. Restores his correction of today, `HIS-WORDS.md` 4.8 and the read of 10-13 and 10-22.
18. Around: the test of decisions after the chunks, with new scenarios; `record.md:98` names the kit. Medium. Restores the record test of 10-13; `HIS-WORDS.md` 4.13.
19. Around: the step in which whole entries leave by subject, with the repointing, limited to entries not about the project. Medium. Restores Step 12 and the repointing of 10-13; `HIS-WORDS.md` 5.3.
20. Around: the deletion-only sweep with `words-subset.py`, when needed. Small. Restores the scrape of 10-22.

**One process**

21. `README.md` of both tools and `record.md:88-110`: one section that names the process, its two modes, the entry point of each, and the briefs they share. Medium; the skill part through the skill writer. Restores his "The process needs to be encoded in the skill so that we can reapply it" (`HIS-WORDS.md` 4.2) and his word of today that the process is the workflow with two modes.

By size: 13 small, 8 medium, 0 large.

## 8. What I could not check

- I read the fifteen per-batch briefs and the briefs of 10-14, 10-17 and 10-18 at the inventory's lines; I did not read their writers' reports, nor measure each run's effect on FACTS apart from the file's size by date.
- I found no word of his on the pass of 10-14, and no reason for the "do not trim it" of 10-17.
- I did not check whether the curator saw the clarity FACTS calibration chunk; the commit cites his word on the POSITIONS pass.
- I did not check whether FACTS holds entries on how to work or on the platform again, which B8 would move.
- I did not check that a Workflow agent can start another run without waiting for it, which the smallest change of section 6 assumes; if it cannot, the coordinator would start the second run.
- I did not run any tool, workflow or check. Line numbers are of the files at `cbb19da53d`.
- I did not estimate the cost in tokens of any adjustment.
