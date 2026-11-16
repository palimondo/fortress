<!-- The analysis for the post-mortem of the coordinating session's night of 2026-11-16, written 2026-11-16 by a Fable 5.2 worker at the curator's word, from the session's transcripts by the scripts under `scripts/`: for each of the work order's seven questions (the loading of the skills' parts, the searches of the record, his corrections by model, why a rule in context was not followed, whether a brief that names parts holds a worker to them, what the hook of 2026-11-10 did, what a boot costs) the finding, its count with the sample's size, an index into the transcript and what the count cannot show; then the options for the `coordinator` skill and its hooks, for the boot's default and for the model, with the evidence for and against each. It decides nothing and writes no skill text. -->

# Analysis: the light boot of 2026-11-16

## Summary for Pavol

This is evidence from the transcripts, counted by script. It decides nothing. It ran on Fable 5.2, the model under review, so each count has its script under `scripts/` and can be run again by someone else.

1. **Loading the parts.** A part is a file under a skill's `references/`. No model here has loaded a part reliably when its work began. Counted at the first act of each kind of work after each compaction, since the skill's rewrite on 10-13: Opus 5.5 had the part in context in 33 of 192 cases, Fable 5.1 in 24 of 101, Fable 5.2 in 15 of 46. Fable 5.2 did not stop loading parts. It loads them as rarely as the others did.
2. **What does get loaded is what a fixed step names.** The boot has named `delegating.md` since 11-02. Before that, it was in context at the first worker launch after a boot in 12 of 28 cases. Since then, in 22 of 25. The hook at a compaction asks for both skills, and every boot since has loaded both: 41 of 41.
3. **Why the rule was not followed that night.** The rule was in context. The coordinator loaded both skills whole at 00:22, with the list of parts. But the boot note and the compaction's summary both listed what the light boot reads, and named two parts. The coordinator read those two and stopped. Its guess that the summary carried earlier loads is wrong: the stretch before that compaction had loaded the same two parts and no more.
4. **Searching the record.** An exchange is one message of yours and all that the coordinator does until your next one. Fable 5.2 searched FACTS, POSITIONS or INDEX in 33 of 100 exchanges. Opus 5.5: 31. Fable 5.1: 16. So it does not search less. In 4 of the night's 7 corrections that a search would have settled, it had searched, in the wrong place or not far enough. A count of searches cannot see that.
5. **Your corrections of its conduct,** from 10-28 to 11-16, each read and sorted: Fable 5.1, 12 per 100 of your messages (49 in 404). Opus 5.5, 18 (13 in 74). Fable 5.2, 18 (23 in 127). Of Fable 5.2's 23, 19 fell on 11-16. Before that day it had 4 in 86, the lowest rate of the three. The samples of Opus 5.5 and Fable 5.2 are thin: one bad day is half of each.
6. **The light boot has a price.** Corrections that a search would have settled came 19 times in 398 of your messages when FACTS and POSITIONS had not been read whole since the compaction. They came 2 times in 202 when they had.
7. **Briefs.** A worker reads a part that its brief names in 68 of 100 cases. It reads a part that its work needs and its brief does not name in 21 of 100 cases when the brief names other parts, and in 30 of 100 when the brief names none. For Fable 5.2 workers: 17 against 49. So naming parts does hold a worker to them, as you suspected. But a worker left alone reads under half of what its work needs.
8. **The hook of 11-10** reminds the coordinator to re-read your words. It fired 116 times in six days, 21 times in the night's two hours. The errors that it aims at are too rare to show a change: 4 in 482 of your messages before, 3 in 123 after. It fired four times in the 14 minutes before the coordinator handed your position back to you as its own.
9. **The boot's cost.** A full boot reads 1.1M bytes and adds about 430K tokens: FACTS 145K, INDEX 134K, the held list 45K, POSITIONS 41K. On 10-14 the same files were 0.4M bytes. A light boot adds 60K to 90K. After a full boot you sent a median of 8 messages before the next compaction. After a light boot, 17.
10. **One finding that you did not ask for.** The Workflow tool sends the chat message that started the launching turn to every agent of the run, as "the user request" that "wins" over the task. 594 agents in 40 runs got one. The 20 agents of climb batch 28 got "Boot light."

**What the evidence speaks for:** a hook that names the part to load at the first record edit, worker launch or batch step after a compaction. A boot note that does not list what a boot reads. POSITIONS read whole at every boot, for 41K tokens.

**What it speaks against:** sharper words for the same rule. A reminder that fires at every write. A check of claims at a turn's end: tried on the record, it would have caught 1 of the night's 7.

**On the model:** the counts do not show that Fable 5.2 loads or searches less than Opus 5.5 or Fable 5.1 did. Your corrections are as frequent as under Opus 5.5 and more frequent than under Fable 5.1, and one night is most of that. The counts cannot show whether its claims are wrong more often, or how grave each error was.

## How to read the rest

- **A reference** has the form `C:13867`: line 13867 of the session's transcript file, `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`. `B3:5693` is line 5693 of part 003 of the copy `...until-2026-11-07T23-09.jsonl.parts/` on the branch `transcripts-blinded`; `A1:...` the same for `...until-2026-10-08T15-41.jsonl.parts/`. `scripts/tlib.py` holds the rule. Times are UTC.
- **The scripts** are under `scripts/`. `extract.py` makes one pass over the three segments of the transcript (about 650 MB) and writes a slim event list under `tmp/pm/`, which git ignores. Every other script reads that list. `workers.py --build` makes its own pass over the workers' transcripts (about 3.4 GB). Each script's header says what it counts.
- **A boot** is counted at each compaction. The stretch from one compaction to the next is an **interval**. A boot is **full** if FACTS and POSITIONS were read before the boot ended, and **light** if not. The boot ends at his first message, or a worker's notice, after its fifth tool call.
- **The models and their samples** (`models.py`). Since the skill's rewrite into a core and six parts (2026-10-13 19:22, `7b434aae52`): Opus 5.5, 10.1K replies, 417 of his messages, 31 compactions; Fable 5.1, 5.6K, 404, 17; Fable 5.2, 2.1K, 127, 9; Haiku 5.5, 0.7K, 35, 2 (the wrong-model days of 10-16 to 10-19). Since the `coordinator` skill last changed (2026-11-08 15:38, `624b7a79e6`): Fable 5.2, 2.1K replies and 127 messages; Opus 5.5, 0.7K and 28; Fable 5.1, 0.5K and 74. So under exactly the same rules, the samples of the other two are a fifth and a half of Fable 5.2's.
- **How the skill changed between the samples** (`git log -- .claude/skills/coordinator/`, 98 commits). The sentence "Load a part under `references/` when you switch into its work" and the six parts have stood since 10-13. The light boot came on 10-22 (`617b0d94c3`). The boot's step "Load `references/delegating.md`" and the rule that a brief leaves the choice of parts to the worker came on 11-02 (`5114bfeceb`). The core grew from 14K to 34K characters. The compaction hook has asked for both skills by the Skill tool since 10-22 23:11 (`4f22574857`).

## 1. Loading the parts

**Finding.** The router, the list of parts at the end of each skill's core with the sentence "Load a part ... when you switch into its work", has not been followed reliably by any model. What is loaded is what a fixed step names. Fable 5.2 shows no fall against the others.

**Counts** (`boots.py`; 59 boots since 10-13: Opus 5.5 31, Fable 5.1 16, Fable 5.2 9, Haiku 5.5 3). For each interval and each kind of work that has an act in it: was the governing part loaded after the compaction and before the first act?

- All eleven kinds: Opus 5.5 33 of 192 (17%), Fable 5.1 24 of 101 (23%), Fable 5.2 15 of 46 (32%), Haiku 5.5 2 of 18.
- The six kinds that the work order names (a record edit, a worker's launch, a batch step, an analysis, a restart, a question of his on what comes next): Opus 5.5 28 of 94 (29%), Fable 5.1 20 of 47 (42%), Fable 5.2 15 of 26 (57%).
- The three of them that leave a sure trace (a record edit, a launch, a batch step): Opus 5.5 27 of 57 (47%), Fable 5.1 19 of 28 (67%), Fable 5.2 15 of 16 (93%). Under like rules, boots from 11-02 only: Opus 5.5 7 of 10, Fable 5.1 12 of 17, Fable 5.2 15 of 16.
- By kind, the part absent at the first act, all models together: a commit (`committing.md`) 59 of 59; check-ins armed (`stops.md`) 40 of 40; an analysis (`analysis.md`) 53 of 55; a query of the record (`records.md`) 47 of 49; a restart (`stops.md`) 11 of 12; a skill change (`skill-rewrite.md`) 23 of 31; a record edit (`record.md`) 17 of 29; a launch (`delegating.md`) 18 of 53; a batch step (`batch.md`) 3 of 25.
- `road.md` was loaded at all in 7 of 59 intervals, `analysis.md` in 8, `record.md` in 24, `delegating.md` in 43.
- By the kind of boot, the share is the same: Fable 5.2 5 of 15 after a full boot and 10 of 31 after a light one; Opus 5.5 18 of 118 and 15 of 74.

**Two tests on the record at hand.**

- The boot's step that names `delegating.md` (since 11-02): the part was in context at the first launch after a boot in 12 of 28 intervals before the step and in 22 of 25 with it.
- The compaction hook's order to load both skills with the Skill tool (since 10-22 23:11): Opus 5.5 reloaded the `coordinator` core in 1 of 15 boots before it and in 16 of 16 after; Fable 5.1 in 16 of 16; Fable 5.2 in 9 of 9.

**Index.** `boots.py --boots` prints one line for each boot with its parts and its first acts; `boots.py --boot REF` prints every load and first act of one interval with their references. The nine boots under Fable 5.2: `C:9271` (11-10 07:19, full), `C:9971` (12:11, light), `C:11342` (17:55, light), `C:11879` (19:40, light), `C:13164` (11-15 19:43, full), `C:13841` (11-16 00:22, light), `C:14747` (02:20, light), `C:16094` (12:29, full), `C:16815` (13:32, light). The night: both cores by the Skill tool at 00:22 (`C:13885`, `C:13886`), `batch.md` and `delegating.md` at 00:22 (`C:13926`, `C:13928`), then nothing until `road.md` at 01:39 (`C:14361`) and five parts at 01:41 (`C:14378` to `C:14386`), after his questions of 01:38 and 01:40. Before those loads: 13 commits, 3 queries of the record, a restart of the machine (01:26, `C:14303`), a scout briefed on the transcript (`C:14029`).

**What the count cannot show.** Whether a part in context was followed. Work that leaves no tool call: a choice of what comes next, a claim in chat. A load that came only because he asked counts as a load: the record edit of 01:41 on 11-16 is one of Fable 5.2's 15. The "restart" and "what comes next" kinds have 12 and 3 cases in all. A section of a part printed by `sed -n` counts as a load of the part.

## 2. Searching the record before a claim

**Finding.** Fable 5.2 searches the record at least as often as Opus 5.5 did and twice as often as Fable 5.1. The night's failures were not a lack of searches but searches in the wrong place, or not far enough, or after his objection.

**Counts** (`searches.py`; 689 exchanges since 10-22 22:56, when the light boot's rule came: Fable 5.1 400, Opus 5.5 161, Fable 5.2 128). A search is a tool call of the coordinator's own on FACTS, POSITIONS, INDEX or their histories.

- Exchanges with at least one search: Fable 5.2 33%, Opus 5.5 31%, Fable 5.1 16%. With a search or a worker launched: 49%, 47%, 40%.
- When FACTS and POSITIONS had not been read whole since the compaction, where the light boot's rule asks for a search before every statement: Fable 5.2 48% of 56 exchanges, Opus 5.5 38% of 53, Fable 5.1 17% of 299.
- The same, counting only the exchanges that a message of his without any mark of correction started, so that no objection asked for the search: Fable 5.2 37% of 30, Opus 5.5 36% of 39, Fable 5.1 17% of 214.
- Exchanges in which the coordinator's text makes a claim about the record or his decisions, and which hold no search, record not read whole: Fable 5.2 38% of 39, Opus 5.5 48% of 27, Fable 5.1 79% of 196.
- His corrections that a search would have settled (kinds 1, 2 and 7 of section 3; 21 in all): in the exchange that he corrected, the coordinator had searched in 4 of 7 under Fable 5.2, 3 of 11 under Fable 5.1, 1 of 3 under Opus 5.5. In the exchange after his correction, it searched in 6 of 7, 3 of 11 and 1 of 3 (`searches.py --corrections`).

**Index.** `searches.py --window 2026-11-16T00:20 2026-11-16T02:20` prints the night's 24 exchanges. The first search of the night is in the exchange of 00:31, after his "WTF?" (`C:13971`). Before the statement on strings, the coordinator searched POSITIONS and the review queue (01:53 to 01:54, `C:14520`, `C:14524`); the search of INDEX that finds the six reports came at 02:03, after his objection (`C:14580`).

**What the measure misses.** A search by a worker for the coordinator. Whether the search was on the claim's subject and went far enough: kind 2 of the night is a search that stopped too early, and the count sees a search. A claim in other words than the script's pattern. Whether an unsearched claim was wrong: after a full boot the record is in context.

## 3. His corrections

**Finding.** Per 100 of his messages, he corrected the coordinator's conduct 12 times under Fable 5.1, 18 under Opus 5.5 and 18 under Fable 5.2. The intervals of the three overlap. Fable 5.2's rate is one day: without 11-16 it is the lowest.

**Counts** (`corrections.py`, labels in `scripts/corrections-labels.tsv`).

- By machine alone, all of the transcript: his messages with a mark of repetition, blame, a rule named or shouting: Opus 5.5 24 per 100 (366 of 1,502), Fable 5.1 29 (221 of 772), Fable 5.2 34 (43 of 127). Swearing or shouting: 6.6, 6.3 and 11.0 per 100.
- Read and labelled, 10-28 to 11-16 (605 messages; every one of the 175 with a mark read): Fable 5.1 49 corrections in 404 messages, 12.1 per 100 (95% interval 9.3 to 15.7); Opus 5.5 13 in 74, 17.6 (10.6 to 27.8); Fable 5.2 23 in 127, 18.1 (12.4 to 25.7).
- By day: Fable 5.2 had 2 in 64 on 11-10, 0 in 5 on 11-13, 2 in 17 on 11-15 and 19 in 41 on 11-16. Without its worst day: 4 in 86, 4.7 per 100. Opus 5.5 without 11-07: 6 in 53, 11.3. Fable 5.1 without 10-28: 37 in 355, 10.4.
- By kind, per 100 messages (count), Fable 5.1, Fable 5.2, Opus 5.5:
  - 1, a settled matter put as open: 0.7 (3), 2.4 (3), 4.1 (3).
  - 2, a claim about his words from an incomplete search: 0.2 (1), 1.6 (2), 0.
  - 3, the skills' parts not loaded: 0.7 (3), 3.1 (4), 0.
  - 4, a decision not written down when stated: 0, 0.8 (1), 0.
  - 5, a worker's report passed on unchecked: 0.5 (2), 0.8 (1), 0.
  - 7, the record not searched before a statement: 1.7 (7), 1.6 (2), 0.
  - 8, a brief against the delegating rules: 0.5 (2), 0.8 (1), 0.
  - Kinds that the work order lacks. A, the register (shorthand, length, internal references): 2.2 (9), 1.6 (2), 0. B, acted without his go or beyond the ask: 0.5 (2), 1.6 (2), 0. C, did not do what he asked, or late: 0.5 (2), 0, 4.1 (3). D, a wrong fact or number of its own: 1.2 (5), 0.8 (1), 2.7 (2). E, another rule of the skills or the process not followed: 3.0 (12), 1.6 (2), 2.7 (2). F, his words recorded wrongly or his intent misread: 0.5 (2), 0, 1.4 (1). G, a judgement of the coordinator or its model: 0.2 (1), 4.7 (6), 4.1 (3).
- By what was in context: corrections of kinds 1, 2 and 7 came 19 times in 398 messages when FACTS and POSITIONS had not been read whole since the compaction (4.8 per 100) and 2 times in 202 when they had (1.0). By model: Fable 5.1 10 in 299 against 1 in 101; Fable 5.2 7 in 55 against 0 in 72; Opus 5.5 2 in 44 against 1 in 29.
- The parts were missed before Fable 5.2 too: he told Fable 5.1 to load the record parts of both skills on 11-08 (`C:4514`) and on 11-09 (`C:7395`), and to reload the skills on 11-06 (`B4:9286`).

**Index.** The labels file is the index: one line for each message with its reference, its kinds and a note of a few words. `corrections.py --show REF` prints a message whole; `--list FROM TO` prints the marked messages of a window.

**What the count cannot show.** A correction on a page: his comments on the answers page on 11-16 hold at least two ("He was right on both points", the held list's section of that day), and none is counted. A calm correction without a mark: of 60 messages without a mark, read as a check, 4 were corrections, so about 7 in 100 unmarked messages are missed, for every model. The labels are one reader's judgement, and the reader is Fable 5.2. The count weighs a slip of register like a lost decision. Several messages on one incident count each.

## 4. Why a rule in context was not followed

**Finding.** Both of the coordinator's guesses were checked at the source (`context_at.py`). One holds, one does not.

- **"The summary carried the earlier loads of the parts as done": not so.** The summary (`C:13842`, 28K characters) names two parts as files, `batch.md` and `delegating.md`, and has one line on the earlier boot: "a full boot was done (FACTS, POSITIONS, INDEX whole; PLAN's head; boot note; held list; delegating part; his profile)". The interval before (the full boot of 11-15 19:43, `C:13164`) had loaded only `delegating.md` and `batch.md`. There were no earlier loads of `record.md`, `road.md` or `analysis.md` to carry. `record.md` was last loaded on 11-10, after the boot of 19:40.
- **"The boot note named only two parts": so.** The boot note at the commit before the compaction (`14f2c50b39`, 00:19, line 7) lists the light boot: "the model check, the two skills, the backup's last log line, PLAN's first section, this note, the held list, `git log`, `references/delegating.md`, and `references/batch.md` for the running batch". The summary's last section says: "take the light boot as the boot note lists it". The coordinator did exactly that list.
- **The router was in context.** At the compaction the harness re-attaches each skill that was invoked, cut at 20,000 characters. The `coordinator` core is 32.7K characters; the copy ends inside "Quiet times", so "The record: what goes where", "The boot" and "The parts" are missing from it. But the coordinator loaded both cores whole with the Skill tool four seconds into the boot (`C:13885`, `C:13886`). From then on the list of parts, the light boot's rule ("Before you state a fact or a decision, or put anything to the curator, search the record") and the rules on a worker's report were in context for every failure of the night.
- **What was in context when each failure came** (`context_at.py`, part 5):
  - Kind 1, the page's line: written on 11-15 at 18:13 to 18:34 (`C:13015`, `C:13069`), two compactions before the light boot, and carried as item 5 of the boot note's own list of questions "in this order (the coordinator's order, not his)". The record did not hold his words of 11-06 (the work order's finding). The light boot did not cause it.
  - Kind 2, 00:5x: context 268K to 281K; cores, `batch.md`, `delegating.md`.
  - Kinds 3 and 4, 00:22 to 01:41: `record.md` not in context when "They go." (00:51) and "Value object ZZ32 it is." (01:29) went to the held list (commits `8c2cb91bb1`, `5269f1be37`).
  - Kinds 5, 6 and 7, 01:5x to 02:0x: context 389K to 407K; ten parts in context, `record.md` and `records.md` among them; the held list read whole at the boot (`C:13930`, `C:13943`); 14 to 18 searches made since the compaction.
  - Kind 8: `delegating.md`, with "So leave the choice of those parts to the worker", in context since 00:22.

So for kinds 5 to 8 the rule was in context and loaded, and was not followed. For kind 3 the router was in context beside a closed list of what to read, and the closed list won.

**What it cannot show.** What the model attended to. The transcript shows what was in context, not why a text there was not used. No count here separates "a closed list beats an open rule" from other causes; the two tests of section 1 point the same way and are not proof.

## 5. His question on briefs

**Finding.** Yes in part. A brief that names parts gets those parts read, and the worker then rarely reads any other part that its work needs. A brief that names none leaves the worker reading under half of what it needs. Neither way gives a worker that loads what the skill's own list gives for its task.

**Counts** (`workers.py`; 1,689 workers since 10-13 that made a tool call: 571 Agent-tool workers, 103 rung workers, 1,015 other Workflow agents). "Needed" is read from the worker's own tool calls by the skill's list: a commit needs `committing.md`, a build `build-and-caches.md`, and so on.

- Agent-tool workers with the skill loaded: a named part was read in 226 of 330 cases (68%). A needed part that the brief does not name was read in 101 of 467 cases (21%) when the brief names other parts, and in 286 of 940 (30%) when it names none.
- The same on Opus 5.5 workers: 67%, 21% (81 of 378), 25% (176 of 683). On Fable 5.2 workers: 61%, 17% (8 of 47), 49% (66 of 134).
- By part, read when named, when other parts are named, when none is named: `committing.md` 69%, 32%, 59%; `records.md` 82%, 23%, 32%; `revival-changes.md` 73%, 11%, 20%; `tests-running.md` 75%, 18%, 34%; `session.md` 55%, 25%, 27%; `build-and-caches.md` 42%, 33%, 28%; `gate.md` 0 of 2, 6%, 5%.
- Rung workers: every rung brief names ten or eleven parts in its own steps ("as the skill's `tests-writing.md` says"). They read a median of 9 parts; a needed part was read in 529 of 849 cases (62%), and since 11-08 in 137 of 149 (91%).
- The briefs: of the Agent-tool briefs that name the skill, 60% to 94% a week named parts from 10-19 to 11-15, after the rule of 11-02 as before it. Since 05:40 on 11-16 the coordinator's briefs name none.

**Index.** `workers.py --list agent --since 2026-11-15T00` prints the 33 Agent-tool workers of 11-15 and 11-16 with what each brief named, what the worker read and what it needed and did not read. Since 11-15, eight workers had parts named: five read every named part, three read none of them, and one of the three read one part that was not named.

**What it cannot show.** The briefs with and without named parts are not the same tasks, so the 21 against 30 is not a clean test. "Needed" is wide: any read of the original tree counts as a need of `revival-changes.md`. A part needed for a judgement leaves no trace. Headless `claude -p` sessions, the skill writer among them, are not counted.

## 6. What has worked

**The hook of 2026-11-10** (`hook_effect.py`).

- It fired 116 times from 11-10 07:07 to 11-16 13:44: 27 on 11-10, 58 on 11-16. In 77 fires (66%) the call that it followed named the boot note alone; the held list in 35, POSITIONS or `record.py` in 6. 55 fires came in turns that he did not start.
- After a fire, in the same turn, the coordinator read the transcript or the page comments, or sent a worker for his words, in 6 fires (5%), and wrote again to one of the three files in 42 (36%). A re-reading from the context leaves no trace and is not counted.
- The errors that it aims at, in his labelled corrections: before, 4 in 482 of his messages (three of kind F, one of kind 2); after, 3 in 123 (two of kind 2, one of kind 4). The counts are too small to show a change either way.
- That night it fired 21 times in two hours (`C:13958` to `C:14728`). It fired at 00:55 and 01:30, when his two decisions went to the held list and not to POSITIONS; its text does not name POSITIONS. It fired at 01:42, 01:44, 01:48 and 01:51; at 01:56 he corrected the coordinator for handing his position back as its own proposal, the error that the hook's text names.
- On 11-10 at 07:14, seven minutes after it landed, he complained of "all the nagging that you keep reflecting back to chat" (`C:9242`).

**What else has worked,** from section 1: the compaction hook's order to load both skills (41 of 41 boots), and the boot's step that names `delegating.md` (12 of 28 before, 22 of 25 with it). Both name one concrete act at a fixed moment. The hook of 11-10 asks for a judgement at every write.

**Which of the sixteen kinds a check at the moment of the act could catch.** A check can fire only on a tool call, at a compaction, or inside a script.

- The night's kinds:
  - 1, a settled matter put as open: none. The record had lost his words on 11-06; there was nothing to check against.
  - 2, a claim from an incomplete search: in part, in a script. A tool that searches his messages could always search all three segments and print what it covered. The three scout passes each covered more.
  - 3, parts not loaded: yes for a record edit, a launch, a batch step, a commit, check-ins; no for a choice of what comes next.
  - 4, a decision not written into POSITIONS: in part. The act that did happen was the write to the held list, and a hook fires there.
  - 5, a worker's report passed on: none at the act. With POSITIONS in context, P-164 and P-169 would have been before the coordinator.
  - 6, his position as the coordinator's proposal: a check existed and fired, and did not catch it.
  - 7, the record not searched before a statement: none that works. See the turn-end check below.
  - 8, a brief that names parts: yes, a pattern on the brief's text at the launch. It would fire on most briefs of the last four weeks.
- The morning's kinds:
  - The Workflow tool relays the chat message to every agent: yes, a hook at the Workflow call.
  - Test counts from the wrong gate: yes, in the script that prints the counts, if it names the tree and the gate that it read.
  - A claim on what his review enters into POSITIONS, before `record.md` was loaded: none; it was a statement, and no record edit had begun.
  - A plan's measure passed on without its limit: none.
  - An ask without one consequence: none.
  - Pushes that carried another run's commits: yes, a hook at `git push` that prints `git log origin/main..main`, the committing part's own first step.
  - A page's answer that did not show what it claimed: none by machine.
  - A sentence on the revival's share, made without a check: none.

So six of the sixteen have a moment where a check could fire; one had a check that fired and failed; nine are statements or judgements with no such moment.

## 7. The boot's cost

**Finding.** A full boot today costs about 430K tokens, 2.7 times what the same steps read a month ago. Four files are 365K of it.

**Counts** (`boot_cost.py`).

- Measured over every whole-file read of FACTS, POSITIONS and INDEX in the boots: 24M characters cost 8.3M tokens, 2.89 characters a token.
- The steps today, in bytes and tokens: FACTS 363K bytes, 126K tokens by size and 145K as measured at 12:29 with its line numbers; INDEX 366K, 127K, measured 134K; the held list 138K, 48K, measured 45K; POSITIONS 116K, 40K, measured 41K; the two cores by the Skill tool 63K, measured 21K; the boot note 27K, 9K; `batch.md` 15K, 5K; `delegating.md` 12K, 4K; his profile 9K, 3K; PLAN's first section 11K, 4K. All steps: 1,120K bytes, 388K tokens by size.
- Growth of what the steps read: 409K bytes on 10-14, 651K on 10-23, 769K on 11-01, 939K on 11-08, 1,120K on 11-16. FACTS went from 95K to 363K, INDEX from 206K to 366K, POSITIONS from 35K to 116K, the held list from 10K to 138K.
- Measured boots: the three full boots under Fable 5.2 grew the context by 409K, 423K and 451K (`C:9271`, `C:13164`, `C:16094`; the last from 131K to 563K by 12:32 and to 583K with the boot note's rewrite). Light boots since 10-22: a median of 62K (26 boots). The light boot of 00:22 on 11-16 took 90K with the held list read whole. The light boot of 13:32 took the context from 129K to 191K and read 44 of the held list's 420 lines (`C:16897`).
- The floor: the first call after a compaction already holds a median of 120K (93K to 138K): the summary, the system prompt, and what the harness re-attaches. The re-attached skills are 84K characters, about 29K tokens: the two project cores cut at 20K characters each, which the boot then loads again whole, and `update-config` and `artifact-design` at 20K characters each.
- After a full boot he sent a median of 8 messages before the next compaction (15 boots since 10-22); after a light boot, 17 (25 boots).
- A side finding: each load of the `fortress-repo` skill also attaches `Library/FlatString.fss` (6K characters), because the skill's text quotes a cache entry that starts `@"/home/user/fortress/Library/FlatString.fss"` and the harness reads that as a file mention (`C:13891`).

**Index.** `boot_cost.py --boot C:16094` and `--boot C:16815` print the two boots of today call by call with the context after each call.

**What it cannot show.** What each file in context is worth. Section 3 gives one number for it: corrections of kinds 1, 2 and 7 at 4.8 per 100 of his messages without FACTS and POSITIONS whole, against 1.0 with them.

## The options

Each option says what it does, what speaks for it, what speaks against it, and what it costs. None is chosen here.

### The skill and its hooks

1. **A hook that names the part at the first act of its kind after a compaction.** It would fire before the first edit of FACTS, POSITIONS or INDEX (`record.md`), the first Agent or Workflow call (`delegating.md`), the first batch workflow or batch brief (`batch.md`), the first edit of PLAN or the review queue (`road.md`), and, if wanted, the first commit, the first check-in armed and the first read of a transcript. It fires only if the part has not been read since the compaction.
   - For: the part was absent at the first act in 67% to 79% of cases under every model. A load named at a fixed moment is done: 22 of 25, and 41 of 41.
   - Against: it reaches kinds 3, 4 and 8 and the two morning kinds with a tool call, not the statements. A part in context is not a part followed: kinds 5 to 8 came with their rule in context.
   - Cost: on the past boots it would have fired 0.2 to 0.9 times a boot for a record edit, a launch or a batch step, and 3 to 4 times a boot with the other kinds. Each fire leads to one read of 2K to 15K characters. He sees nothing of it.
2. **The boot note stops listing what a boot reads,** or lists the parts that the work in flight needs.
   - For: section 4. The closed list named two parts and the coordinator read two. A part that a step names is read.
   - Against: one night's evidence, with the tests of section 1 behind it.
   - Cost: none.
3. **One concrete act added to the hook of 11-10 at a write to the held list:** a decision of his goes into POSITIONS in the next commit.
   - For: the hook fired at both such writes that night and named no act.
   - Against: the same hook's text names the error of 01:56 and fired four times just before it.
   - Cost: none beyond the hook that exists.
4. **The hook of 11-10 fires only at the held list and POSITIONS.**
   - For: 77 of its 116 fires followed a write to the boot note alone; a reminder that came every turn was not acted on that night.
   - Against: nothing here shows that fewer fires make each one count.
   - Cost: a boot-note line that records his words would pass unchecked.
5. **A check at a turn's end** that stops the turn when the text makes a claim, the exchange has no search and the record was not read whole.
   - Against, by a test on the 600 exchanges from 10-28 to 11-16 (`searches.py --stop-hook`): in its narrow form (the text says that something is open, undecided or not in the record) it fires in 3 to 8 of 100 exchanges and would have caught 3 of his 21 corrections of kinds 1, 2 and 7, one of the night's seven. In its wide form it fires in 12 to 39 of 100 and would have caught 8.
   - For: nothing measured.
6. **A shorter rule, or sharper words.**
   - Against: the router's sentence has stood unchanged since 10-13 under three models, with the same result. The rules of kinds 5 to 8 were in context in plain words.
   - For: a core under 20,000 characters would survive a compaction whole in the harness's own copy. Since the hook, every boot has reloaded the core anyway.
7. **A check of a worker's claim at its source before it is relayed.**
   - No moment for a hook was found: the relay is a statement. Two forms without a hook: the brief asks for each claim that the record lacks something to carry the search that was run and its output; or POSITIONS is in context (the boot's option 2 below), which would have shown P-164 and P-169 that night.
   - For: kind 5 is rare in the labels (3 in 605 messages) and was among the night's gravest. Against: nothing measured on either form.
8. **A hook at the Workflow call** that shows the chat message that the tool will relay to every agent, so that a batch is launched from a turn that his go started, or from a turn that a worker's notice started, which relays nothing.
   - For: 594 agents in 40 runs received one; "this request wins" over the task text.
   - Cost: one more step at a launch.
9. **A hook at `git push`** that prints `git log origin/main..main`.
   - For: the morning's pushes carried the record-landing workflow's commits; the committing part already asks for this step, and that part was absent at all 59 first commits.
   - Cost: a few lines of context at each push.

### The boot's default

1. **The full boot stays the default.** It adds about 430K tokens and puts the context near 560K before any work.
   - For: with FACTS and POSITIONS whole, corrections of kinds 1, 2 and 7 were 1.0 per 100 of his messages against 4.8.
   - Gives up: the room. A median of 8 of his messages until the next compaction, against 17.
2. **The light boot plus POSITIONS whole.** About 100K to 130K in all.
   - For: his decisions are in context; kinds 5 and 6 of the night turned on P-164, P-169 and P-37.
   - Gives up: FACTS and INDEX, which must be searched. Kind 7 of the night was six reports on INDEX. The 4.8 against 1.0 was measured with FACTS and POSITIONS both whole, not with POSITIONS alone.
3. **The full boot without INDEX.** About 300K. He asked for it once, on 11-06 ("Boot up without INDEX (search it when needed)", `B4:6279`).
   - Gives up: INDEX in context, 134K, a third of the full boot.
4. **The light boot as the skill has it.** 60K to 90K.
   - Gives up: what option 1 gains. The night followed one.
5. **No light boot while his decisions are under discussion.**
   - For: the night. Against: it needs a judgement of what is under discussion, and the night's kind 1 was made before the light boot.
6. **A smaller boot of any kind:** the held list has grown from 10K to 138K bytes in a month and costs 45K tokens at every boot that reads it whole; the boot note is 27K bytes; its trim is already a question that waits for him. Two skills that are not this project's, `update-config` and `artifact-design`, are re-attached at every compaction, 40K characters, because the main session invoked them once.

### The model that coordinates, plans and writes

What the counts show, and how far they carry. No recommendation.

- **Loading the parts:** no fall under Fable 5.2. Three sure kinds, boots from 11-02: Fable 5.2 15 of 16, Fable 5.1 12 of 17, Opus 5.5 7 of 10. It carries as far as 9 boots against 11 and 6.
- **Searching the record:** no fall. 33% of exchanges with a search against 31% (Opus 5.5) and 16% (Fable 5.1). It carries as far as a count of searches does: not to whether the search was right.
- **His corrections:** 18 per 100 under Fable 5.2 and Opus 5.5, 12 under Fable 5.1, with overlapping intervals. Fable 5.2 was at 4.7 before 11-16 and that day alone holds 19 of its 23. Whether 11-16 is the model or the day (a light boot, his decisions under discussion, a record that had lost his words) the counts cannot say.
- **As a worker:** Fable 5.2 workers read a needed part that the brief leaves to them in 49% of cases, Opus 5.5 workers in 25%.
- **Under exactly the same rules** (since 11-08) the other two have 28 and 74 of his messages against 127. A fair comparison of the three does not exist in the transcripts.
- **Not measured at all:** planning and writing. The transcripts hold no count for either, and none was made here.
- **The options** are his as he named them: stay on Fable 5.2; back to Fable 5.1; Opus 5.5 coordinates; one model coordinates and another plans or writes. The evidence above neither favours nor rules out any of them. What would add evidence is a replay, in the way of the post-mortem of 11-09: each of the three models is given the state of 00:22 on 11-16 (the summary, the boot note, the two skills) and the same first messages of his, and the same scripts count what it loads and searches. That is about 0.3M tokens written for each model, an estimate from the context of that boot, and it tests the boot and the first exchanges, not a night.

## What could not be measured

- Whether a claim of the coordinator's was wrong, apart from his corrections.
- His corrections on pages: the comment threads are not in the chat transcript in a form that these scripts read.
- The gravity of an error. A count gives a lost decision and a slip of register the same weight.
- Why a text in context was not used.
- The worth of INDEX, or of FACTS alone, in context.
- Planning and writing quality by model.
- Workers that ran as headless `claude -p` sessions.
- Coordinating sessions on the branch `transcripts`, if any exist beyond this session's three segments: this session's transcript reaches back to 2026-09-08 and holds every model named here.

## The scripts

All under `scripts/`; run them from the repository's root after `extract.py` (about two minutes) and, for `workers.py`, `workers.py --build` (five to ten minutes).

- `tlib.py`: the shared definitions: a reference, a part, a search of the record, the kinds of work and the part that governs each.
- `extract.py`: the pass over the session's transcript that writes the event list.
- `models.py`: the stretches that each model served, with its replies, his messages and the compactions.
- `boots.py`: question 1.
- `searches.py`: question 2, and the test of a turn-end check.
- `corrections.py` with `corrections-labels.tsv`: question 3.
- `context_at.py`: question 4.
- `workers.py`: question 5, and the relayed chat messages (the `relayed` field of its cache).
- `hook_effect.py`: question 6.
- `boot_cost.py`: question 7.
