<!-- The map of the coordinator's records before the `coordinator` skill is rewritten: what kinds of content the boot files, PLAN and the three skills hold, where each kind lives, who reads it and when, its size, and where it repeats itself; the conduct rules with every home they have; FACTS against POSITIONS; the history inside the optimized build; the two decisions Pavol remembers, searched in the record and the transcripts; a first count of what the boot reads are used for; and the open questions the target shape must answer. Written 2026-10-10 by an Opus worker, read-only, at Pavol's word (his yes at 08:16 UTC to the goals page with this map first). It measures and decides nothing; no shape is chosen. Section 9, added 2026-10-11 from `record-origins-evidence.md`, says where each home came from and which model coordinated then. -->

# The coordinator's records: a map before the rewrite

This note describes the coordinator's records as they stand on `main` at `fb1aa7c7b`. It is the evidence for the rewrite of the `coordinator` skill. It chooses no shape. Every number gives its source at the end of its section.

Words used here:

- **boot**: what the coordinating session reads after a compaction, by the order in `explorations/coordinator/README.md`.
- **conduct rule**: a rule about how the coordinator works: how it talks to Pavol, asks, decides, delegates, keeps the record and runs agents.
- **home**: a file where a rule or a fact is stated, not only pointed at.
- **optimized build** and **debug build**: Pavol's names for the two forms of the record. FACTS and POSITIONS say what holds now, with no dates and no history (optimized). `FACTS-history.md` and `POSITIONS-history.md` keep every earlier text and its provenance (debug).
- **provenance**: how a fact or a decision came to be: who measured it, when, in which rung or commit, what it replaced.

## 1. The goals, as reflected and corrected

From this session on 2026-10-10 and the boot note (`held-list.md` line 7):

1. One home for how the coordinator works. The protocol is retired. Its rules that bind workers move to the `fortress-repo` skill.
2. The `coordinator` skill probably loaded whole, because the roles interleave. Pavol leans this way and wants the facts first.
3. A lighter boot that keeps the awareness he relies on: the coordinator knows the project without him re-explaining it, never re-asks his decisions, and never sends workers to re-measure what is on record. The open question is FACTS, POSITIONS and INDEX: their form (the optimized build still carries debug content), consolidation by topic, the duplication between FACTS and POSITIONS, and what is always loaded against what is looked up, a cheap worker that holds the text and answers questions among the options.
4. FACTS, POSITIONS and INDEX keep serving workers' briefs.
5. No role is lost: executive assistant, batch coordinator, roadmap architect, briefer of workers, analyst.
6. The `fortress-repo` writing standard (`explorations/reviews/skills-writing-principles.md`; POSITIONS, "The skills are written for a reader new to the repository ...").
7. `cloud-container` rewritten by the `fortress-repo` method.

Not a goal: no fact or decision changes its content, only its form and its home. (The draft also excluded the batch workflow; the curator corrected that on the page: the workflow is improved whenever it shows a problem, and running and reviewing a batch is one of the coordinator's modes.)

## 2. The boot today

The boot reads eight things. Sizes are bytes on `main`; tokens use the record's own ratios: 2.5 bytes a token for FACTS, 2.7 for INDEX, 3.0 for prose.

- `CLAUDE.md`: 1.8K bytes, about 0.6K tokens.
- `explorations/protocol.md`: 11.6K bytes, about 3.9K tokens.
- `explorations/coordinator/README.md`: 4.9K bytes, about 1.6K tokens.
- `FACTS.md`: 300K bytes, about 120K tokens.
- `POSITIONS.md`: 98K bytes, about 33K tokens.
- `INDEX.md`: 182K bytes, about 67K tokens.
- The handover's first section (`explorations/microgpt-run-c-handover.md`, lines 1 to 68): 41K bytes, about 14K tokens.
- The boot note (`held-list.md` line 7): 8.8K bytes, about 2.9K tokens.

Together: 649K bytes, about 243K tokens of record. With the fixed part of a session (system prompt, tools, skills, about 56K) and the compaction summary (about 18K), a boot reaches about 317K. Pavol's figure of 300K after a restart matches.

The boot grew by half in two weeks. On 2026-09-27 the same files were 422K bytes (that note estimated about 125K tokens, with rougher ratios); now they are 649K. FACTS went from 155K to 300K bytes and INDEX from 83K to 182K. FACTS was cut by 92K on 10-02 and has grown again since. The consolidations before batches 12 and 13 changed it by +2.2K and +0.2K: they did not shrink it.

If the skill's `boot.md` is followed rather than the README, the held list below the boot note is read too: 26K bytes, about 9K tokens more.

**Sources.** `wc -c` on each file at `fb1aa7c7b`; the handover's first section is lines 1 to 68 (its next heading is line 69). Ratios and the fixed part: FACTS, "A boot after a compaction costs about 285K tokens of context ..." (line 201). The boot of 09-27: `explorations/coordinator/record-keeping-proposal.md` section 0. Growth: `explorations/coordinator/process-engineering/record-growth/README.md` line 21. The held list: `coordinator` skill `references/boot.md:15` against `README.md:9-10`.

## 3. The map, by kind of content

Seven kinds. For each: where it lives, who reads it, when, its size, and where it repeats.

Readers: **boot** is the coordinator at every boot; **on demand** is the coordinator when a task calls for it; **briefs** are workers through the slice of the record a brief gives them (`facts-extract.sh` queries, the batch briefing); **skill** is workers through a skill they load.

### 3.1 How the coordinator works

- `explorations/protocol.md`, whole: 11.6K bytes (3.9K tokens). Boot. Six principles, hard rules, "What keeps going wrong". About 3.1K bytes of it are rules that bind workers (3.6 below).
- `explorations/coordinator/README.md`, whole: 4.9K bytes (1.6K tokens). Boot. The boot order, the two roles and their records, how the records are kept.
- POSITIONS, the 14 entries of "How we work" that govern the coordinator itself (watching runs, a deeper pass, forks probed, briefs, re-measuring, reversible stops, which decisions reach him, tiers, the Fable rule, the review after a batch, the standing go, estimates, check-ins, the record's form): 11.9K bytes (4.0K tokens). Boot.
- POSITIONS, "How he wants to be spoken to", 6 entries: 4.1K bytes (1.4K tokens). Boot.
- The `coordinator` skill, `SKILL.md` and seven parts: 41K bytes (13.7K tokens). On demand. Its `references/sources.md`, 22.6K bytes, is for maintaining the skill only.
- PLAN's three closing sections, kept from 2026-09-17 ("The rule for every edit under the sealed tree", "Testing techniques", "Stop conditions"): 6.6K bytes, each paragraph followed by "Changed since" lines. On demand.
- The boot note's standing lines (the push order, read the clock, do not resolve page threads, read FACTS whole): a few hundred bytes. Boot.
- The rules inside FACTS, "The container" (for example "The rule: send messages at any time; compact between turns ..."): counted under 3.5.

Repeats: 73 conduct rules stand in 249 places across 10 homes; 71 of them have two homes or more (section 4.1). Every one of the 73 has a home that the boot reads, and 60 are also in the skill. The skill was written from these files and they were not retired: its `sources.md` cites the protocol 43 times, POSITIONS 43, FACTS 24, the README 11 and the boot note 11.

Why the skill is larger than the protocol (Pavol's question of 08:16 UTC): the skill (41K bytes) holds the protocol (11.6K) and the README (4.9K), and also the coordinator's entries of POSITIONS (16K with the speaking entries), the agent-running facts of FACTS' container section (`agents.md`, 7.7K, written from about ten FACTS entries), and procedures written since (the skill writer and cold reads, comments on a page, the review after a landing). The protocol is small because it points to POSITIONS and the README for most of what it rules.

### 3.2 Pavol's decisions about the language and the project's direction

- POSITIONS, "The goal", "History he knows" and "Decisions on record" (the standard and the sources, the one library and the checker, numbers, arrays and the model, the specification's revision): 72 entries, 52.6K bytes (17.5K tokens). Boot; briefs (`positions:` keys).
- `fortress-repo` `references/revival-changes.md`: 28K bytes (9.3K tokens). Skill, loaded by workers on demand: each change to the original language with the contradiction and the reason.
- PLAN, "Pavol's answers, in the order they are needed": 84K bytes. On demand. The questions to him, open and answered.
- `explorations/coordinator/review-queue.md`: 99K bytes. On demand. Items waiting for his word or review.

Repeats: 34 of POSITIONS' 112 entries are tied by citation to 53 FACTS entries (section 4.2). POSITIONS carries 37 "Built" sentences that report the build state FACTS holds.

### 3.3 His decisions about process

- POSITIONS, "How we work", the 13 entries on batches and workers (test first, the suite's verdict, nothing built twice, the mission briefing, the second review, tests-only repairs, what a batch commits, workers commit as they go, the judge, the new batch practice, the gate's comparisons, the specification's examples, parallel suites): 13.8K bytes (4.6K tokens). Boot; briefs.
- POSITIONS, the 5 entries on the record and the skills (where the work lives, the record is public, the delta part of the skill, the ledger's form, the skills written for a new reader): 12.3K bytes (4.1K tokens). Boot. "The skills are written for a reader new to the repository ..." alone is 8.2K bytes.
- POSITIONS, two entries that are history ("The order of the work after batch 10.", "The statement for the public record on the usage limit."): 2.3K bytes. Boot.
- The protocol's rules that bind workers: about 3.1K bytes. Boot.
- `fortress-repo`: most of these rules as workers act on them (`SKILL.md` "Rules for every task", `committing.md`, `tests-writing.md`, `gate.md`, `records.md`). Skill.
- The batch manual and script (`climb-batch-workflow.md`, 42K bytes, and its `.js`): read when a batch is planned, run or reviewed; in scope, since the workflow is improved whenever it shows a problem.

Repeats: the 11 worker-binding rules stand in 36 places (section 4.1, last group).

### 3.4 Facts about Fortress and the tree

- FACTS, all sections but "The container" and "The ledger" (execution model, the checker and the one library, the harness and the gate, landed semantics, arrays and algebra, the specification and lineage, the territory map): 178 entries, 267K bytes (107K tokens). Boot; briefs.
- The gap ledger, `explorations/fortress-gap-ledger.md`: 584K bytes. Briefs and the skill's queries; never at boot.
- `fortress-repo`, `SKILL.md` and 15 parts: 149K bytes (50K tokens); `SKILL.md` (20K bytes) is read by every worker, the parts on demand.
- The notes and maps under `explorations/`: on demand, found through INDEX.

Repeats: 59 of FACTS' 206 entries (82K bytes) are cited as the source of skill text in a skill's `sources.md`, so their content also stands, in another form, in a skill. Within FACTS, entries restate each other's ground (the 16 entries whose titles no longer hold each point to the entry that states the present).

### 3.5 Facts about the harness, the agents and the container

- FACTS, "The container": 27 entries, 30.5K bytes (12.2K tokens). Boot.
- `coordinator` `references/agents.md`: 7.7K bytes. On demand.
- `fortress-repo` `references/session.md`: 4.2K bytes. Skill.
- `cloud-container`, `SKILL.md` and four parts: 16.5K bytes (5.5K tokens). On demand, coordinator and workers.
- `explorations/coordinator/remote-container.md`: 19.7K bytes. On demand.

Repeats: 18 of the 27 container entries are sources of skill text. The resume rule stands in 8 places, the interrupt rule in 7, the prompt cache's life in 5 (section 4.1, "Running agents and the session").

### 3.6 Provenance

- `FACTS-history.md`: 1.72M bytes. `POSITIONS-history.md`: 359K bytes. On demand, rarely.
- INDEX: 182K bytes (67K tokens). Boot. One line per note, 366 lines, no sections; 316 lines carry a date. It is a catalogue of where the detail is, read whole at every boot.
- The skills' `sources.md`: 22.6K (`coordinator`), 173K (`fortress-repo`), 10.6K (`cloud-container`). Maintainers only.
- Inside the optimized build: about a fifth to a quarter of FACTS, about a tenth of POSITIONS (section 5).
- The handover's first section, lines 17 to 67: 27K bytes of per-rung landing paragraphs, dated 10-02 to 10-09, each with its commit. Boot.

### 3.7 What is in flight

- The boot note: 8.8K bytes (2.9K tokens). Boot. It also carries a list of owed items and a summary of what landed in the session.
- The held list below it: 26K bytes. Boot by `boot.md`, not by the README.
- The handover's first section, lines 1 to 15: about 14K bytes. Boot. Where the work stands.
- PLAN: 467K bytes (about 156K tokens). On demand. The phases (106K), his answers (84K), work that can start (28K), the parked items (235K).
- `review-queue.md`: 99K bytes. On demand.
- The batch record's sections for him and the run's journal, while a batch runs. Boot.
- Inside POSITIONS: about 12K bytes of sentences about what is pending, parked, not built or listed for his review. Its header allows this for decisions not yet built.

Repeats: the state of the last landings stands in the boot note, the handover's first section and PLAN's phase lists; not counted.

**Sources for section 3.** Byte counts by `wc -c` and by entry (lines starting `- `) per section of each file; section boundaries are the `##` and `###` headings. The kinds of POSITIONS' "How we work" entries are this note's reading of each entry (lines 102 to 135). FACTS entries named in skills: each entry's title, or its first 45 characters where it has none, searched in the three `sources.md` files. The skill's sources: occurrences of "protocol", "POSITIONS", "FACTS", "README" and "boot note" in `coordinator` `references/sources.md`. INDEX dates: lines matching a `YYYY-MM-DD` date. POSITIONS' in-flight sentences: sentences matching "Not built", "pending", "parked", "waits", "listed for his review", "not yet", "owed", "comes later", "after the switch-over".

## 4. Duplication, measured

### 4.1 The conduct rules and their homes

73 rules, 249 places. By number of distinct homes (a skill counts as one home): one home, 2 rules; two homes, 23; three, 32; four, 15; five, 1. The homes, by how many of the 73 rules each states: the `coordinator` skill 60, the protocol 47, POSITIONS 45, the README 14, FACTS 13, `fortress-repo` 13, the boot note 6, PLAN 6, `cloud-container` 4, `CLAUDE.md` 1.

The two rules with one home: every page for him has a Select button per section (POSITIONS only, not in the skill); his email is for attribution only (the protocol only, not in `fortress-repo`).

Three rules are stated differently in their homes:

- How FACTS is read at boot: "whole, in one pass" (README:6), "in pages of about 15 to 20 lines" (`boot.md`:11), "read whole with `allow_large`" (boot note).
- Whether the held list is read at boot: the README says the boot note, line 7 (README:9-10); `boot.md`:15 says "the boot note and the held list".
- The coordinator's roles: two, with the analyst inside both (`roles-and-records.md`:3); Pavol names five (goal 5).

Key: `protocol.md` is `explorations/protocol.md`; `README.md`, `POSITIONS.md`, `FACTS.md` and `PLAN.md` are in `explorations/coordinator/`; `held-list.md` is `explorations/coordinator/postmortem-2026-09-19/held-list.md` (line 7 is the boot note); a skill part is named by its skill and file under `.claude/skills/<skill>/references/`. The number after each rule is its count of places.

**Talking and asking** (16 rules)

- One ask per message (6): protocol.md:92; POSITIONS.md:140; `coordinator` SKILL.md:13; `coordinator` asking.md:3; `coordinator` decisions.md:24; `coordinator` decisions.md:27.
- The ask form: question, context, options, yes and no, recommendation last (3): protocol.md:92-98; POSITIONS.md:140; `coordinator` asking.md:5-11.
- Never the dialog tool; options in plain text (3): protocol.md:61; `coordinator` SKILL.md:13; `coordinator` asking.md:3.
- Lists, not tables (3): protocol.md:102; POSITIONS.md:144; `coordinator` talking.md:10.
- Numbers as K or M (3): protocol.md:103; POSITIONS.md:144; `coordinator` talking.md:11.
- A new term defined where it is used (5): protocol.md:103; POSITIONS.md:139; POSITIONS.md:140; `coordinator` asking.md:23; `coordinator` talking.md:9.
- Label which part answers which; do not restate FACTS or POSITIONS (3): POSITIONS.md:139; FACTS.md:1; `coordinator` talking.md:8.
- Time read from the clock, never guessed (7): protocol.md:111; protocol.md:164; POSITIONS.md:144; held-list.md:7; `coordinator` SKILL.md:15; `coordinator` SKILL.md:23; `coordinator` talking.md:16.
- Nothing said about a batch while it runs (3): protocol.md:111-112; POSITIONS.md:143; `coordinator` talking.md:21.
- He is not told about record edits (3): protocol.md:112; README.md:64; `coordinator` talking.md:22.
- The git-check hook's reminders answered silently (3): protocol.md:112; POSITIONS.md:143; `coordinator` talking.md:24.
- Restate and hold while he reads turn by turn (3): protocol.md:106-110; README.md:35; `coordinator` talking.md:56-66.
- A document for his approval goes out as a page (2): protocol.md:100-101; `coordinator` asking.md:25.
- Every page has a Select button per section, evidence at the bottom (1): POSITIONS.md:144.
- The wip branches are his chore; no reminder (2): POSITIONS.md:115; `coordinator` talking.md:23.
- Model what he knows and fill the gaps (standing goal) (2): POSITIONS.md:142; `coordinator` roles-and-records.md:24.

**Deciding and approvals** (10 rules)

- He decides what is committed; a batch run waits for his yes; a bare go starts background work only (4): protocol.md:17; POSITIONS.md:121; `coordinator` SKILL.md:8; `coordinator` decisions.md:35.
- A standing approval covers only what it names (3): protocol.md:21; POSITIONS.md:121; `coordinator` decisions.md:36.
- A step a yes already covers is taken without asking (3): protocol.md:22-23; `coordinator` SKILL.md:14; `coordinator` decisions.md:37.
- A closed decision is not re-asked; search POSITIONS first (8): protocol.md:118-120; README.md:37; POSITIONS.md:1; POSITIONS.md:37; `coordinator` SKILL.md:14; `coordinator` decisions.md:38; `coordinator` boot.md:31-32; `coordinator` roles-and-records.md:20.
- A decision inside a worker's report is not made until he sees it (4): protocol.md:110; POSITIONS.md:141; `coordinator` SKILL.md:12; `coordinator` decisions.md:3.
- What is consequential, and the three ways a decision reaches him (2): POSITIONS.md:112; `coordinator` decisions.md:9-25.
- Reversible stops do not hold a batch (3): protocol.md:19-21; POSITIONS.md:111; `coordinator` decisions.md:24.
- A deeper pass, never a halt or a rollback (4): protocol.md:84; POSITIONS.md:106; `coordinator` decisions.md:31; PLAN.md:765.
- Purposes govern; a rule is weighed by what it costs (4): protocol.md:5-7; protocol.md:172; POSITIONS.md:114; `coordinator` SKILL.md:18.
- A remark is not a decision; a go is written nowhere (5): protocol.md:8; protocol.md:158-159; README.md:61-64; `coordinator` SKILL.md:19; `coordinator` roles-and-records.md:37.

**Delegating and briefing** (16 rules)

- Delegate by default; the coordinator reads only the record (5): protocol.md:127-128; README.md:15-16; `coordinator` SKILL.md:16; `coordinator` boot.md:23; `coordinator` delegation.md:5.
- Forks a probe can settle are probed before a batch is briefed (4): protocol.md:117; POSITIONS.md:107; `coordinator` delegation.md:9; PLAN.md:747.
- Search the record for how it was done last time (2): protocol.md:120-121; `coordinator` delegation.md:8.
- Idle time to parked research; a new deliverable discussed first (2): protocol.md:122-123; `coordinator` delegation.md:7.
- A brief states the problem, never the expected answer (3): protocol.md:80; POSITIONS.md:108; `coordinator` delegation.md:26.
- A brief points at research on file instead of restating it (3): protocol.md:141-142; POSITIONS.md:32; `coordinator` delegation.md:27.
- A brief hands over measurements as findings; no re-measuring (5): protocol.md:143-147; protocol.md:168-170; POSITIONS.md:110; `coordinator` SKILL.md:28; `coordinator` delegation.md:28.
- A clean worker is clean of our options, not our measurements (3): protocol.md:147-149; POSITIONS.md:110; `coordinator` delegation.md:29.
- Which tier runs what: Opus workers, Sonnet archaeology (4): protocol.md:131; POSITIONS.md:117; held-list.md:7; `coordinator` delegation.md:13.
- The Fable rule: without asking for a two-area design question, else his yes (3): protocol.md:131-138; POSITIONS.md:119; `coordinator` delegation.md:18-22.
- A two-area decision in two steps: cheap evidence, top-tier judgement (3): protocol.md:139-141; POSITIONS.md:117; `coordinator` delegation.md:14-15.
- The coordinating session runs on Opus (2): POSITIONS.md:117; `coordinator` delegation.md:16.
- Watch a long run against its estimate; the spend is the coordinator's (2): POSITIONS.md:105; `coordinator` delegation.md:60-66.
- Estimates in project units; token counts are writes only (3): POSITIONS.md:126; `coordinator` delegation.md:72-73; `coordinator` talking.md:11.
- The skill writer makes every skill edit; a cold read follows a rewrite (4): POSITIONS.md:134; `coordinator` talking.md:45-52; `coordinator` delegation.md:47-54; `coordinator` roles-and-records.md:36.
- A comment on a skill marks a problem area (2): POSITIONS.md:134; `coordinator` talking.md:43.

**Boot and record keeping** (11 rules)

- The boot order (4): README.md:5-14; `coordinator` boot.md:7-17; CLAUDE.md:30; held-list.md:1.
- FACTS read whole at boot (how: in one pass; in pages of 15 to 20 lines; with allow_large) (3): README.md:6; `coordinator` boot.md:11; held-list.md:7.
- Boot reads no directory listings; every output bounded (2): protocol.md:129-130; `coordinator` boot.md:21.
- Whether a worker runs: the harness's notice and test -f (2): README.md:17-19; `coordinator` boot.md:24.
- What is in flight is read from the tree, not his client (2): POSITIONS.md:143; `coordinator` boot.md:25.
- The boot note rewritten whole, never appended (4): protocol.md:157; README.md:68; held-list.md:7; `coordinator` roles-and-records.md:38.
- One home per thing; his words written once (4): protocol.md:151; README.md:59-60; `coordinator` roles-and-records.md:28; `fortress-repo` records.md:75.
- FACTS and POSITIONS timeless; history in the history files (6): protocol.md:151-157; README.md:41-55; POSITIONS.md:1; POSITIONS.md:130; FACTS.md:1; `coordinator` roles-and-records.md:29-30.
- Consolidation before each batch; check-verbatim before the commit (3): README.md:53-58; POSITIONS.md:130; `coordinator` roles-and-records.md:30-32.
- Cite by bold title; a title stays verbatim (3): README.md:70-73; FACTS.md:1; `coordinator` roles-and-records.md:34.
- A fact enters in the commit that establishes it (2): README.md:69; `coordinator` roles-and-records.md:35.

**Running agents and the session** (9 rules)

- Resume a stopped run with resumeFromRunId, keeping finished agents (8): POSITIONS.md:121; POSITIONS.md:127; FACTS.md:207; FACTS.md:214; FACTS.md:215; `coordinator` agents.md:57-77; `coordinator` talking.md:25; `cloud-container` container-loss.md:45.
- Send messages any time, compact between turns, never stop a turn while agents run (7): POSITIONS.md:127; FACTS.md:211; FACTS.md:212; FACTS.md:213; FACTS.md:214; `coordinator` agents.md:45-55; `fortress-repo` session.md:7.
- Check-ins 45 minutes apart, armed together (3): POSITIONS.md:127; FACTS.md:221; `cloud-container` stops.md:29.
- An Agent-tool worker killed by an interrupt is relaunched only at his ask (2): FACTS.md:214; `coordinator` agents.md:79-83.
- Two agents at once on this machine (4): FACTS.md:206; PLAN.md:21; `coordinator` agents.md:12-13; `cloud-container` machine.md:7.
- agent() can return null after its output (2): FACTS.md:222; `coordinator` agents.md:30-36.
- Check a Workflow script as an async body, not with node --check (2): FACTS.md:223; `coordinator` agents.md:38-43.
- Prompt cache: one hour for the main session, five minutes for an agent (5): POSITIONS.md:134; FACTS.md:218; FACTS.md:219; `fortress-repo` session.md:3-4; `cloud-container` stops.md:29.
- The permission check can refuse a step after his go (3): FACTS.md:224; `coordinator` agents.md:55; `fortress-repo` session.md:59.

**Rules that bind workers** (11 rules)

- Never commit a model identifier (3): protocol.md:24; POSITIONS.md:129; `coordinator` roles-and-records.md:41.
- His email for attribution only (1): protocol.md:31.
- Copyrighted PDFs and decks stay out of git (3): protocol.md:25-30; FACTS.md:177; `fortress-repo` committing.md:14.
- The push order: main and two more branches (3): protocol.md:32-35; held-list.md:7; `fortress-repo` committing.md:46-47.
- The commit footer (2): protocol.md:37-42; `fortress-repo` committing.md:31.
- A worker commits only its own paths, as it goes, no scratch (7): protocol.md:44-50; POSITIONS.md:115; POSITIONS.md:116; `fortress-repo` SKILL.md:171; `fortress-repo` committing.md:26; `fortress-repo` committing.md:41; PLAN.md:745.
- The gate (4): protocol.md:52-54; POSITIONS.md:39; `fortress-repo` gate.md:43; PLAN.md:741-742.
- Test first, seen failing, kept (5): protocol.md:54-60; POSITIONS.md:102; `fortress-repo` SKILL.md:160; `fortress-repo` tests-writing.md:89; PLAN.md:734.
- A timing names the machine; no timing of walk (4): protocol.md:85-89; POSITIONS.md:108; `fortress-repo` records.md:29; `fortress-repo` interpreter.md:79.
- No self-credit; attribution reconstructed (2): protocol.md:68-69; `fortress-repo` SKILL.md:170.
- Provenance in commit messages, not source comments (2): protocol.md:70; `fortress-repo` committing.md:15.

**Sources for 4.1.** Each rule was searched across the boot files, PLAN, `CLAUDE.md`, the handover's first section and every file of the three skills but `sources.md`, by phrases of its wording, with wrapped lines joined; each hit was read and kept only where the file states the rule. A file that only points to another home is not counted, except `CLAUDE.md`:30 and `held-list.md`:1 for the boot order. Line numbers are at `fb1aa7c7b`. The list is of rules found by these searches; a rule worded very differently in one home can be missed there, so the counts are a floor.

### 4.2 FACTS against POSITIONS

- 20 POSITIONS entries cite FACTS by title, 28 citations; 18 of them in a "Built (FACTS, ...)" clause. POSITIONS holds 37 sentences that start "Built", 3.8K bytes, in 34 entries.
- 52 FACTS entries cite POSITIONS, 56 citations, most as "(POSITIONS, "...")" beside the fact.
- Matched by title, these citations tie 66 pairs of entries: 34 POSITIONS entries (36K bytes, 37 % of POSITIONS) and 53 FACTS entries (119K bytes, 40 % of FACTS). 9 pairs cite each other both ways.
- The 9 pairs: "The static-parameter sentence goes (answer 9)." with four FACTS entries (walk's choice by declared domains; the Return Type Rule over every instance; the refused overload families; the specification's 2011 model); "A type parameter the arguments do not fix takes its bound ..." with "The specification gives the run-time instance ..."; "Arithmetic in a size ..." with "The compiled checker accepts arithmetic in a size ..."; "The `comprises` passages read at the level of values ..." with "The compiled checker accepts the Meet Rule's `comprises` example ..."; "The specification's examples join the gate at zero red." with "`ant testSpecData` runs 130 ..."; "The suites run Fortress in parallel." with "The gate's thread count is pinned in the build file ...".

An example of the same ground told from both sides. POSITIONS, "The suites run Fortress in parallel." (line 125), says that the pin in `build.xml` (`fastTrack` and `systemShard`) is `FORTRESS_THREADS=4`, and that without it the default is half the CPUs. FACTS, "The gate's thread count is pinned in the build file ..." (line 105), says the same with the line numbers, the stack setting and the test that overflowed.

A citation is not always a duplicate: many POSITIONS entries cite FACTS for the measurement a decision rested on. The pairs mark where the two files tell one ground; how much text repeats inside each pair is not measured here.

**Sources for 4.2.** Citations: `(FACTS, "...")` groups in POSITIONS and `POSITIONS, "..."` in FACTS, each title matched against the other file's titles by its first 40 characters; "Built" sentences: sentences of POSITIONS entries starting with the word.

## 5. Debug content in the optimized build

Debug content here means text about how the present came to be, not the present itself: titles kept that no longer hold, narratives of how a figure was measured, superseded figures beside the current ones, dated clauses, rung and commit names as history. A source citation (a path, a row, a test) is not counted: the record's rule asks for it.

### 5.1 FACTS

- 16 entries, 28K bytes (9 % of FACTS), keep a title that no longer holds: 10 say the whole title "does not hold", 6 say a clause of it "no longer holds". Example: "**A boot after a compaction costs about 285K tokens of context, and `FACTS.md` is about two fifths of it** does not hold: a boot costs about 250K ..." (line 201). Another: "**`ant testSpecData` runs 130 of the specification's 133 extracted examples under walk, outside the gate, and 5 are red, all of one cause** does not hold: all 130 are green ..." (line 120).
- A random sample of 24 entries (33.6K bytes, 11 % of FACTS) read sentence by sentence: about 7.7K bytes, 23 %, are history or provenance. Examples from the sample:
  - "What the note established of the two paths: with a value form and a function form of one name, walk chose by the argument's run-time type ..." (line 51): what a note once found, the refusals since closed.
  - "The title's 482 was the nested tower's, measured by forcing the `FortressLibrary` api past its early return ..." (line 52): a superseded figure explained.
  - "With it, on a pair taken as a shadow, the count stage took 1,432 s down to 371 s and the distance stage 4,551 s down to 1,885 s ..." (line 100): a measurement's narrative with before-and-after figures.
  - "The other two were replaced: ..." (line 68): a rung's edits, two of five since undone.
  - "The new container's first transcript snapshot replaced the session's full transcript ..." (line 209): one incident's history.
- A keyword scan of the whole file (dates, commit hashes, "landed", "once", "was measured", figures "X to Y", "superseded") flags 17 % of FACTS' bytes, in 86 of 206 entries. It counts some present-tense ranges and misses narratives without those words.
- Markers in FACTS: 27 dates, 46 commit hashes, 168 mentions of a rung, 26 of "landed".

Estimate: a fifth to a quarter of FACTS is debug content, about 60K to 75K bytes, about 24K to 30K tokens of every boot. FACTS' rule also asks for "a few lines" per entry; the median entry is 1.2K bytes and 41 entries are over 2K. That length is mostly source and present detail, not history, and is not counted above.

### 5.2 POSITIONS

- Read whole: 31 entries carry history clauses, about 10.4K bytes, 11 % of POSITIONS. Examples:
  - "The order of the work after batch 10.": "It was carried out through batch 11 ..." (line 132), the whole entry, 1.3K bytes.
  - "Which tier runs what.": "Two workers launched on the wrong tier once cost him 1.7 million tokens 'down the drain'." (line 117).
  - "The mission briefing.": "(it was about 80% once and fell to 25-35% ...)" (line 109).
  - "The open range `(:)` ...": "Way (c), `(:)` over `ZZ32`, was measured by probe P3 and not taken: it changes 64 small programs' values ..." (line 56).
  - "The record is public and names models on purpose.": "The classifier refused writing this reading into the protocol itself, so it lives here." (line 129).
  - "The coordinator's standing goal": "This came out of a compaction that left him 'out of control, unaware of crucial details' ..." (line 142).
  - "Taken as recommended." and "Taken on the recommendation, ..." in five entries (lines 52, 53, 57, 58, 98).
- Beside it: the 37 "Built" sentences (3.8K bytes, 4 %) report build state that FACTS holds; and about 12K bytes (12 %) of sentences say what is pending, parked or listed for his review, which the header allows for a decision not yet built.

Estimate: about a tenth of POSITIONS is history, about 10K bytes, about 3.5K tokens; with the build-status sentences, about 14K bytes.

**Sources for section 5.** Titles that no longer hold: entries matching "does not hold", "no longer holds" or "title's ... no longer". The sample: 24 entries drawn with a fixed seed, split into sentences, each read and judged present or history; the history bytes per entry, summed. The keyword scan: a regular expression per marker over each sentence. POSITIONS: every entry read; the history clauses measured by their byte length. Markers: counts of each pattern over the file.

## 6. The two decisions Pavol remembers

### 6.1 The `coordinator` skill as one file, loaded whole

Found in the transcript as his lean and the coordinator's agreement; not found as a decision in the record.

- 2026-10-07T03:05:44Z, Pavol: "the coordinator skill should fully replace the protocol was basically where we were accumulating the knowledge for, that skill as, as we went and now we are restructuring it into the lazy loading sectional thingy On the other hand, I don't know like whether in, coordinator skill that even makes sense to, to fragment. Maybe there we should just be clearly rewording it and, loading it unblock like I don't know whether that skill benefits from lazy loading sections. I, I think it does not."
- 2026-10-07T03:06:35Z, the coordinator, listing five questions "to take one at a time after the archaeology reports": "4. The coordinator skill replaces `protocol.md` fully, hard rules included. 5. The coordinator skill is loaded whole at boot instead of part by part. I agree with you here. Splitting into parts saves context for the many small agents. The coordinator is one session that needs all of the skill, and the skill is about 57K characters, roughly 20K tokens, against a boot of about 250K tokens." It ends: "Nothing is changed yet."
- No later answer of his to question 5 was found in the transcript. POSITIONS, `POSITIONS-history.md`, PLAN and `review-queue.md` hold no entry for it. The skill, written on 10-04 as `SKILL.md` and parts, still has its parts.
- 2026-10-10T08:05:10Z, Pavol: "I think the coordinator skill doesn't need too lazy load because all of it needs to be in memory. It's, I think the equivalent of reading the protocol hole, like since you will be switching between parts of the role. I don't know whether it buys us much to, to split it, but I am open to make this decision based on some facts." And later in the same message: "So I decided before that those should be written in one file and loaded always in full. But maybe that's like my dogma and we, we could try to make it lazy load."
- The 57K characters of 10-07 counted `sources.md`; without it the skill is 41K bytes.

### 6.2 A cheap background worker that holds the record and is queried

Found. The worker was his idea; the coordinator argued against it for FACTS and POSITIONS; he then decided to keep all three files loaded at boot and asked for consolidation by topic. That decision is in the record only as "the boot read is full context" and the boot order; the discussion of the query worker is not in POSITIONS or its history.

- 2026-09-24T16:41:27Z, Pavol, while asking to be taught the array work: "So I don't know whether it's more prudent if, if a worker pre-filters it for you. And maybe you can use some very cheap worker for this. I don't know with, whether Sonnet or, or Haiku can like find the relevant parts of the document that you need to read or whether they are not suitable for such a job."
- 2026-09-27, his direction as the record states it: "The boot read stays full-context. The peace of mind of a coordinator that knows the project without him is worth the tokens, and no size target applies." (`postmortem-2026-09-27-record-keeping.md`, "What was changed").
- 2026-09-30T05:24:08Z (his message, queued during a turn; `POSITIONS-history.md` line 450 dates it about 05:25): "think about it as a compiled compiling an executable. We have a debug mode and an optimized build. So history is the debug mode with full provenance, but the facts and positions should reflect the current state and be written in a sense in, in a timeless manner."
- 2026-09-30T11:43:52Z, Pavol: "I was fine with the cost in the hundreds I'm less fine with 300k so we will probably need to find a different way maybe the index should be just searched and not loan ... I'm really like struggling with making equivalence between keyword search and semantic search that would be necessary for for us Is there like a way to outsource it? Since you have sub-agents that can be resumed, can we have like a site, sub-agent on the site that loads the positions and facts and index and you would query that agent so your context will be protected and that other agent will function as semantic search for you does that make any sense or have I gone off the rails"
- 2026-09-30T11:45:02Z, the coordinator: "A librarian agent is possible, but not for FACTS and POSITIONS." Its reasons: "it only answers what I think to ask"; "Having POSITIONS and FACTS in my own context is what catches those. So I'd keep both loaded."; "if more than about an hour passes between questions, the agent's cache expires, and the next question rewrites its whole context, about 190K"; "Every answer would also come through a second model's reading, which can miss things." On INDEX: "At either moment I can read it whole, which gives the meaning-based matching you're worried a keyword search would miss."
- 2026-09-30T11:50:19Z, the coordinator put one option: INDEX out of the boot, about 45K a boot saved, recommended. "Keyword search isn't the issue. At the moment I need it, I can read it whole."
- 2026-09-30T12:01:35Z, Pavol: "I don't think taking out index would help. ... And I, I think we still need to keep facts and position and index all in your memory at boot. ... is there some kind of semantic consolidation of the facts that could be done? ... If you were to let a fable worker reorder them in order for them to be grouped by topics, can we then see some consolidation opportunities when, when these are next to each other?"
- 2026-10-10T08:05:10Z, Pavol's memory of it: "we've been moonlighting about some kind of worker, cheap worker in the background that loads them in context and you just query them because the, the problem was semantic search versus keyword search. And I think at that point we, we discussed and decided that it just needs to be compacted and loaded whole still."

So the transcript matches his memory, with one nuance: the query worker was not refused for keyword search. The coordinator's argument was that a queried worker answers only what the coordinator thinks to ask, and that reading a file whole already gives matching by meaning.

**Sources for section 6.** His messages: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl` (from 2026-10-08T12:53Z) and the older part on `transcripts-blinded`, `projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/000.jsonl` to `003.jsonl` (2026-09-08 to 2026-10-08T15:41Z); user records and queued commands extracted by script, then searched for "semantic", "keyword", "cheap worker", "query", "lazy load", "one file", "loaded whole", "in memory at boot"; the coordinator's replies read between the timestamps. The record: POSITIONS, `POSITIONS-history.md`, PLAN, `review-queue.md`, `record-keeping-proposal.md`, `postmortem-2026-09-27-record-keeping.md` and `process-engineering/context-study.md` searched for the same words; `context-study.md` discusses a librarian pass for workers, not a query worker for the coordinator.

## 7. What the boot reads are used for: a first count

This is a first count. A fuller archaeology may follow.

Six boots since 2026-10-08 (compactions at 10-08 12:56, 18:16 and 21:45; 10-09 05:00 and 22:42; 10-10 06:53 UTC). For each, the window runs from the last boot read to the next compaction. In those windows the coordinator wrote 301 blocks of text to Pavol, 64 Agent briefs, 6 messages to running agents and 6 Workflow launches.

- **POSITIONS.** 53 of its 106 titled entries were cited by title after a boot. In 31 of the 76 briefs (45 entries), 13 replies to Pavol (10 entries) and 46 commands, mostly commit messages and searches (25 entries). The most cited: "The library's own practice is the standard" (13), "The judge's rulings" (11), "The territory map" (10). The coordinator searched POSITIONS with grep 11 times after a boot, though it held the file in context.
- **FACTS.** 22 of its 154 titled entries were cited by title; FACTS has 206 entries in all. In 14 briefs (13 entries) and 16 commands; in no reply to Pavol by title, though replies named FACTS 28 times. The most cited: "The compiled checker keeps a type parameter's bound list ..." (7) and "A container can be replaced by a fresh one whose clone fails ..." (5). It searched FACTS with grep 5 times.
- **INDEX.** 73 of the 333 notes it lists (the core record files left out) were named after a boot: in 62 briefs (61 notes) and 17 replies (15 notes). INDEX itself was not searched.
- **Edits.** After a boot the coordinator edited FACTS by script 9 times, POSITIONS 6 and INDEX 2, and committed changes to them 23, 22 and 27 times.

What this count cannot see: a citation by paraphrase; an entry acted on without being named (a question not re-asked, a measurement not re-run); a note path known from elsewhere than INDEX. So it shows use, not need. Half of POSITIONS was named in two days, and a tenth of FACTS; a fifth of INDEX's notes.

**Sources for section 7.** The main transcript above, records outside sidechains. Titles: current bold titles of POSITIONS (106 of at least 12 characters) and FACTS (154), matched by their first 40 characters, case and markup ignored, in assistant text and tool inputs. INDEX: its 366 paths less the core record files (FACTS, POSITIONS, PLAN, the held list, the protocol, the README, the batch records and script, INDEX, the review queue, the handover, the ledger). Command kinds: `grep` or `rg` (search), `sed -n`, `awk`, `head`, `cat` (read), `python3` or `sed -i` (edit), `git add` or `git commit` (commit).

## 8. Open questions for the target shape, and the evidence that would settle each

1. **Which content must each role hold in memory, and which can it look up?** The roles: executive assistant, batch coordinator, roadmap architect, briefer of workers, analyst. Evidence: a fuller archaeology of the transcripts by kind of turn (replies, asks, briefs, landings, plan edits, analyses), listing the entries each used, and the failures on record that came from a missing fact or decision. Section 7 is its start.
2. **Does a short core always loaded, with lookups, keep the awareness?** Evidence: a trial boot, old against new, both answering one quiz on the project's state (what is decided, what is in flight, what is measured, what must not be re-asked or re-measured), scored without knowing which boot answered; then a count, over the next sessions, of the failures the protocol names.
3. **Is the `coordinator` skill loaded whole, and when?** Evidence: its size once the protocol and the README are folded in (today 41K bytes, about 14K tokens, against a boot of about 243K of record); how many of its parts a session loads (a count of skill loads since 10-04); whether it is read at boot or by its trigger; his lean (section 6.1), not yet a decision on record.
4. **Which home does each of the 73 rules keep?** The skill alone, or the skill for the rule and POSITIONS for his words? Evidence: the list in 4.1; "One home per thing" (README:59) and "his words are written once, in POSITIONS"; POSITIONS line 112 already points to the skill ("The `coordinator` skill states it"), one way it can be done.
5. **Where do the protocol's worker rules go?** Nine of the eleven already stand in `fortress-repo`; "never commit a model identifier" and "his email is for attribution only" do not. Evidence: 4.1's last group; the writing standard.
6. **What does FACTS keep?** Present state with source and test only, the history to `FACTS-history.md`? Evidence: a pass over every entry (the sample in 5.1 says about a quarter is history); `tools/check-verbatim.py` to show nothing lost; what workers draw from FACTS through briefs.
7. **Does the title rule stay?** A title is kept verbatim where it no longer holds, so that citations keep working; 16 entries carry such titles. Evidence: how many briefs and batch briefing keys cite those old titles.
8. **Should FACTS and POSITIONS stop telling one ground twice?** For example POSITIONS keeping the decision and a pointer, FACTS keeping the build state. Evidence: the 66 pairs and 37 "Built" sentences (4.2); whether `facts-extract.sh` and the batch briefing rely on either side's text.
9. **Consolidation by topic.** FACTS is grouped by area in 9 sections; INDEX has none; POSITIONS has 9 sections. Evidence: a trial regrouping of one area, measuring what merges, with check-verbatim.
10. **FACTS' container section against the skills.** 18 of its 27 entries are sources of skill text. Keep, move or cut to the fact and its source? Evidence: section 7 (four of them cited by title after a boot); the `cloud-container` rewrite (goal 7).
11. **INDEX: always loaded or looked up?** He kept it loaded on 09-30. Evidence: the quiz trial of question 2; how often a note was called absent and then found; whether INDEX's form (366 dated lines, no topics) serves a lookup.
12. **The query worker.** Evidence on record against it: the coordinator's reasons of 09-30 (section 6.2). Facts since: a headless session keeps its prompt cache for an hour (FACTS line 219). What would settle it: a trial of such a worker answering the questions the coordinator actually asked in one session, scored against the coordinator's own answers with the files in context.
13. **What is the boot's record of work in flight?** The boot note, the held list, the handover's first section (27K bytes of it are landing narratives), PLAN and the review queue overlap. Evidence: which of them the coordinator used after a boot; the conflicting boot instructions (4.1).
14. **How the five roles map onto the skill.** The skill names two roles with the analyst inside both. Evidence: `roles-and-records.md` against his list of 10-10 07:33 UTC, and the trace of question 1.

**Sources for section 8.** Sections 2 to 7 of this note; his message of 2026-10-10T07:33:49Z for the roles.

## 9. Where each home came from

This section says where each home came from: who first made it, at whose word, and which model coordinated then. Its source is the evidence note `record-origins-evidence.md`, gathered on 2026-10-11 from git and the session transcripts. The sources are at the end of the section.

Words used here:

- **coordinator**: the session that talks to Pavol, briefs the workers and keeps the record.
- **harness**: Claude Code, the program that runs the model and its tools.
- **compaction**: the harness's step that replaces a long conversation with a short summary.
- **handover**: a note that one session writes so that another can go on with the work.
- **S1** and **S2**: the two coordinating sessions. S1 ran from 2026-08-18 until its container was lost, in a long run started on 2026-09-17. S2 has coordinated since 2026-09-18.

### 9.1 How it started

1. The work began on 2026-08-18 in a Claude.ai chat, outside the repository. In it a Fable model downloaded the team's repository, built it, and ported Pavol's Mandelbrot program to Fortress. The chat is not in the transcripts, and its model version is not known.
2. The chat ended with a handover, a zip of six files. They were `HANDOVER.md`, the chat's Fortress programs, among them two Mandelbrot ports, and a Swift-versus-Fortress explainer. `HANDOVER.md` was never committed, and the transcript backup redacts it, so its text cannot be quoted.
3. Its content is known only from the coordinator's accounts. It proposed a `research/` folder and a `CLAUDE.md`. It gave a recipe: graft a third-party Java 9 port onto the team's last trunk, patch the build for JDK 8, then build and test. It listed priorities, among them the specification's LaTeX and complex numbers.
4. His first message in the coding session came on 2026-08-18 at 21:03 UTC, from his phone. It was the zip and one line: "Unpack an start by reading handover". That session, S1, ran on Fable 5. Its first commits were the graft and the build patches.
5. He said why later. His first idea had been complex numbers, but the team's compiler turned out unfinished. On 2026-08-23, of claims that coding is solved: "So here's a problem for AI to work on." On 2026-08-30: "it is all to challenge the assumptions that coding is solved." The project took a dead language for this: "a language which you were not pretrained on in detail."

### 9.2 Which model coordinated when

1. 2026-08-18 to 2026-09-08: Fable 5, in S1.
2. 2026-09-08 to 2026-09-25: Fable 5.1. Pavol switched models "for improved token efficiency".
3. 2026-09-17 and 2026-09-18: Opus 5, while the Fable credits were used up. S1's container was lost in a long run started on 2026-09-17. On 2026-09-18 S2 recovered the work on Opus 5, then coordinated on Fable 5.1 from that evening. S2 had begun on 2026-09-08 as a worker.
4. From 2026-09-25: Opus 5.5, first as a trial. Only 12 minutes on 2026-10-02 ran on Fable 5.1. No message ending the trial was found. His reason, on 2026-10-11: "Main motivation for the switch was escaping the Clever Alec essayist agentic speech register, secondary only was token economy."
5. Workers ran on Opus from August, to save the Fable tokens for the coordinator.

### 9.3 The homes

The homes are listed in the order they first appeared. Each has one of three kinds:

- **Unprompted**: the coordinator made it, and no message of Pavol's asked for it.
- **From his complaint or question**: he complained or asked something, and the coordinator answered with a new home. The shape was the coordinator's.
- **Asked for by him**: he asked for the record in his own words. The shape can still be the coordinator's.

A home's kind is that of its first appearance. The handover of 9.1 is left out, since the chat that wrote it is lost.

1. **The task list.** The to-do list that the harness keeps inside one session. 2026-08-18, Fable 5. Unprompted. It survives a compaction but not a new container. Since: used on and off, with none found after 2026-10-08. No boot order names it.
2. **`CLAUDE.md`.** The file that every session reads first. 2026-08-19, Fable 5. Unprompted by Pavol: the handover proposed it, and the coordinator offered a draft. He answered "4. Yes, draft". Whether he asked the chat for it is not known. Since: it pointed in turn to the plan, the protocol and the knowledge base. On 2026-10-04 it was cut to what every session needs, 1.8K bytes.
3. **`explorations/`.** The folder for the revival's own work, apart from the team's tree. 2026-08-19, Fable 5. Asked for by him: "I want these experiments and learnings committed, but I don't know the right place". The folder and its name were the coordinator's. Since: it holds the whole record and every note.
4. **Notes and reports.** A note in `explorations/` for each piece of work. The first, on 2026-08-19, was a baseline of the test suite. Fable 5. Unprompted as a habit. He often asked for the content: a baseline, a report on its debugging, a mapping, a design journal. The form and the names, such as report, findings, memo and journal, were the coordinator's. Since: workers write most notes now.
5. **`repo-internals.md`.** A living note on how to work in the repository. 2026-08-19, Fable 5. From his question: "Are you also continuously documenting your learnings about techniques and how to move around this repo?" The coordinator kept this living note apart from the dated baseline. Since: still kept; the skill work of 2026-10-04 checked it for missing items.
6. **The modernization plan.** The approved plan, with the working rules as "standing orders". 2026-08-19, Fable 5. Asked for by him, before his first compaction: "please persist the plan and everything else [that] needs to survive the compaction". The place was the coordinator's: a file in the repository, which "survives both compaction and the container". Since: on 2026-08-21 he did not recognise a standing order it cited. It is not read at boot today.
7. **Pages.** An HTML page published on claude.ai, for him to read on his phone. 2026-08-19, Fable 5. Unprompted, as far as found. The first page was a report he had asked for; making it a page was the coordinator's choice. Since: by 2026-08-21 he called pages "our standing agreement". On 2026-10-08 he asked for a Select button per section, for iOS Speak.
8. **The transcript backup.** A git branch that keeps every session's transcript. 2026-08-19, Fable 5. Asked for by him: "I want you to prepare a separate branch where we would commit your full JSONL session transcripts for later analysis." His reason: "I want to learn how exactly are you working". Since: a hook has saved it after every turn from that day, and S2 has its own branch.
9. **The protocol**, `explorations/protocol.md`. The rules of how Pavol and the coordinator work together. 2026-08-22, Fable 5. From his complaint: "You have forgot our operating procedures". A scout, a read-only worker, recovered the rules from the transcripts. The coordinator proposed a committed file, and he named it in his order. Since: on 2026-09-27 a Fable instance rewrote it as principles. It is still read at boot, and the rewrite's goals retire it.
10. **The header comment.** An HTML comment at the top of a note that says who wrote it and why. 2026-08-26, Fable 5. Unprompted. Since: most notes carry one, now one sentence on what the note answers. INDEX copies that sentence.
11. **The gap ledger.** The list of known gaps in the team's tree, one row each. 2026-09-08, Fable 5.1. Asked for by him: "Go, merge the three gap ledgers into one." The three it merged came from the coordinator's briefs, which asked workers for gaps as rows. Since: on 2026-10-08, after he said the record showed "signs of stress", it was rewritten in fifteen topic sections.
12. **Notes from a conversation.** A note that keeps a discussion that was never written down. 2026-09-08, Fable 5.1; the discussion itself, on 2026-08-23, was under Fable 5. From his question: "I don't know whether you recorded it somewhere". It was not, so the coordinator recovered it from the transcript. Since: on 2026-09-15 he asked to keep a conversation "So that it's not lost like tears in the rain". The coordinator made a folder for such notes, and it holds one file.
13. **The handover note.** A note on where the work stands, for the session after a compaction. 2026-09-08, Fable 5.1. From his question: "Do you have it in handover to be restored after compaction already?" It did not. Its line "reading that note plus `protocol.md` restores the state" was the first boot order. Since: its first section is read at every boot: 41K bytes, of which 27K are reports of single landings.
14. **The process records.** One record per run of the microGPT experiment, in a common format. 2026-09-09, Fable 5.1. Asked for by him: "the breadcrumbs of that process is what I want to preserve." The common format was the coordinator's proposal, and he said "Common record format. Yes." Since: no record was added after 2026-09-15, and none is read at boot.
15. **The knowledge base.** The folder `explorations/coordinator/` with its README, FACTS and POSITIONS. 2026-09-15, Fable 5.1. Asked for by him, after the coordinator re-explained what he knew. His words: "organize your knowledge base so that you survive compactions and, and know how to load it when needed." The shape was the coordinator's: entries with their sources, his decisions apart from the facts, and a load order. Since: FACTS is 300K bytes and POSITIONS 98K, both read whole at every boot.
16. **INDEX.** One line for each note, taken from its header. 2026-09-15, Fable 5.1. From his complaint after a miss. The coordinator had said a conclusion was not on record, and he answered: "Consult our previous compiler vs interpreter comparison". It then indexed every note. He did not ask for an index. Since: on 2026-09-30 he kept it loaded at boot. It is 182K bytes today.
17. **The territory map**, `explorations/coordinator/map/`. A summary of the repository and the language, for choosing directions. 2026-09-16, Fable 5.1. Asked for by him: "some kind of summary from all the learnings". The name "map" and its parts were the coordinator's. Since: no later change is in the evidence. PLAN was written as its actionable form.
18. **PLAN.** The plan of the work, later with the questions to Pavol. 2026-09-17, Fable 5.1. Asked for by him: "Did you write the plan down for next steps that [we] can follow?" The file, its place and its ticking as steps land were the coordinator's. Since: it grew to 467K bytes, with his answers and the parked items. It is read on demand.
19. **The batch records.** A batch is a set of agents run by one workflow script. Its record holds the batch's decisions, written so that a session that was not present can run it. 2026-09-17, Opus 5 for the repair batch, then Fable 5.1, and Opus 5.5 from batch 4. Unprompted. He had asked that day for the script, not for the record. Since: reviews after each batch, a second review, and a redesign on 2026-10-08.
20. **The container records**, `remote-container.md`. How a session survives the loss of its container. 2026-09-18, Opus 5, after S1's container was lost. Unprompted. The same day a new `STATE.md` at the head of the boot was withdrawn at his word: "What is state? Is this a new one? Uh, thing that you just invented?" Since: on 2026-10-04 the manual became a skill at his page comment, now `cloud-container`.
21. **The history files.** `FACTS-history.md` keeps entries that no longer govern, word for word. 2026-09-19, Fable 5.1. Unprompted. Since: `POSITIONS-history.md` followed on 2026-09-27. On 2026-09-30 he gave the image for both: "history is the debug mode with full provenance".
22. **Post-mortems and archaeology notes.** A read-only search of the transcripts for when and why something happened, kept as a dated note. 2026-09-20, Fable 5.1. Asked for by him. His words: "find out what were the open decisions that were really something I needed to take". Since: the same shape comes back each time he asks when and why. The evidence behind this section is one.
23. **The record's tools**, `explorations/coordinator/tools/`. Scripts that read and check the record. 2026-09-20, Fable 5.1, a check for notes missing from INDEX. Unprompted; each was written after a failure. Since: a script that hands workers a slice of the record, a check that a rewrite loses nothing, and a script that seeds worktrees.
24. **The held list and the boot note.** A list of open items, and a note to the next session on what is in flight. 2026-09-20, Fable 5.1. Asked for by him: "Can you write all the held things to a persistent record". In the same message: "plus a message for yourself that boots you up to continue our session". The place and the name "boot note" were the coordinator's. Since: under Opus 5.5 it was appended to 79 times, and the rule came that it is rewritten whole. Its lists moved to the review queue on 2026-10-02.
25. **The compaction hook.** A hook that tells the coordinator to boot after every compaction. 2026-09-27, Opus 5.5. From his complaint: "you did not boot up post compaction". The coordinator offered the hook, and he said "Yes." Since: no change is in the evidence.
26. **The review queue.** One list of the items waiting for Pavol. 2026-10-02, Opus 5.5. From his question about lists kept in several places: "So can we start working on those?" A worker merged the items of the boot note, the held list and PLAN. Since: 99K bytes, read on demand.
27. **The project skills.** `fortress-repo`, `coordinator` and a container skill, which sessions load when a task needs them. 2026-10-04, Opus 5.5. Asked for by him, one at a time: "Yes, create `fortress-repo` skill"; "Remote container should be its own skill"; and of the coordinator, "This looks like a separate skill as well." He first raised a skill for the repository on 2026-08-23. Since: the container skill became `cloud-container`. On 2026-10-07 he said the `coordinator` skill "should fully replace the protocol".

The evidence names smaller homes too. Dated notes for the next reader and scheduled check-ins were the coordinator's; no message of his asking for them was found. The harness's compaction summary and the transcripts themselves also served as memory. From 2026-10-04, comments on pages carried his feedback.

### 9.4 What this says for the rewrite

This part is the writer's reading of the evidence. It recommends nothing.

1. Three habits ran from the first day with no request from Pavol found. The coordinator kept its memory in files in the repository. It wrote a note for each piece of work, and it published pages for review.
2. On the memory, his recollection differs. On 2026-10-07 he recalled asking "at the beginning of the project" for it to be kept in the coordinator's folder. The transcripts show that request on 2026-09-15, four weeks in, as the knowledge base. Before it, on 2026-08-19, the coordinator chose the repository on its own: a file "survives both compaction and the container". He had asked that day for experiments and learnings to be committed, but not where the coordinator's memory should live. No message telling it to avoid a local memory was found.
3. On reports, he said on 2026-10-11 that they "all emerged unprompted by me". The transcripts agree for the habit and the form. They also show his requests for the content of several: a baseline, a debugging report, a mapping, a design journal.
4. The split of a dated record from a living document was the coordinator's, on 2026-08-19. It came back unprompted in the history files of 2026-09-19. His image of a debug mode and an optimized build named it on 2026-09-30.
5. When he complained of a loss or a miss, the coordinator usually answered with a new home, in a shape of its own. The protocol, the handover note, INDEX and the compaction hook came this way.
6. Every unprompted home first appeared under Fable 5, Opus 5 or Fable 5.1. The three new homes under Opus 5.5 came from his complaint or his request. Opus 5.5 came when most homes existed, so this does not compare the models. Its habit showed inside the existing homes: on 2026-09-27 he warned that it would "flood the permanent record".
7. The evidence cannot show whether `CLAUDE.md`, the research folder and the first priorities were his ideas or the chat model's. The chat and the handover's text are lost.
8. The harness's system prompt is not in the transcripts. So a habit can come from the harness rather than the model: the task list, pages and `CLAUDE.md` are harness features. Whether a local memory was switched on is not shown either.
9. After the first day, every session started from the homes already there. So the evidence shows what the models made in this project, not what a current model does with no record.
10. S1's last hours, after 20:31 UTC on 2026-09-17, are lost. The workers' own transcripts were searched only where they are named.

**Sources for section 9.** All from `explorations/coordinator/process-engineering/record-origins-evidence.md` (commit `a4aed80f9`), by its section names, unless a source is named. S1 is session `bdff267d` on the `transcripts` branch; S2 is session `fe616d40` on `transcripts-blinded`. Line numbers are those of the transcript parts the evidence names.

9.1, How it started:

1. "The inciting incident" and its "Where the trail ends"; his words of 2026-08-23T19:13:00, S1 part 000 line 14083.
2. S1 part 000 line 13 (the six files) and lines 15 to 16 (the redaction); the chat's files committed in `446836590`.
3. The compaction summary, S1 part 000 line 1597; the coordinator's report, line 308; lines 405, 412, 491 and 501.
4. S1 part 000 lines 1 and 3, read again in the transcript for this section; `entrypoint: remote_mobile`; the first commits `8fe1daa8f` and `72716e6b0`.
5. His messages of 2026-08-23T19:13:00 (S1 part 000 line 14083) and 2026-08-30T08:48:43 (S1 part 001 line 1293).

9.2, Which model coordinated when:

1. "Which model coordinated when", the list of runs, read from the model field of each main-thread record.
2. The same; his message of 2026-09-08T16:07:35.
3. The same; his messages of 2026-09-17 (queued at 11:51) and 2026-09-18T18:54:41; S2 part 000 line 3354 and his message of 18:45:03.
4. The same; his message of 2026-10-11T05:14:17.
5. "Fable 5 to Fable 5.1": his message of 2026-08-24T20:44:51 and the August workers' metadata.

9.3, The homes:

1. Section 4: S1 part 000 lines 58 and 1468; the counts of task-list calls by part.
2. Section 2: `446836590`; S1 part 000 lines 485, 515, 519 and 560; `9cd56be21`.
3. Section 2: S1 part 000 lines 519 and 549.
4. Section 3 and "The report habit": `66cdde53f`; his messages of 2026-08-19T00:04:49 and 06:13:06, 2026-08-23T22:01:47 and 2026-08-24T05:53:08.
5. Section 3: `621fa14a5`; S1 part 000 lines 1176 and 1182; `a9c0573d4`.
6. Section 4: `b1a5ca1e7`; S1 part 000 lines 1435 and 1442; his message of 2026-08-21T14:38.
7. Section 6: S1 part 000 lines 3722, 3781 and 6062; `4060c3957` and S2 part 003 line 13978.
8. Section 5: `9cd319411`; S1 part 000 lines 3827, 3879 and 3988; `49eb9d914`.
9. Section 7: `505d3ba48`; S1 part 000 lines 7476, 7607, 7733 and 7799; `9e7d12c75`; this note, section 1.
10. Section 8: S1 part 001 line 389; `fdb32514a`; the INDEX header.
11. Section 12: `b9c8ee33e`; S1 part 001 lines 1977 and 2196; `gap-ledger-archaeology.md` line 56; `ae4f8e38a` and S2 part 003 line 12094.
12. Section 10: `2a5ceee70` and S1 part 001 line 2367; `d30db277e` and line 10902. The evidence gives "Fable 5 (the first)"; the model field of S1 part 001 lines 2365 to 2413 (2026-09-08, 20:19 to 20:23) reads Fable 5.1, so Fable 5 is taken as the 2026-08-23 discussion's model.
13. Section 11: `7353ec1f2`; S1 part 001 lines 2879 and 2906; this note, sections 2 and 3.6.
14. Section 13: `fcc3cae0e`; S1 part 001 lines 4246 and 4299.
15. Section 14: `8ab10d9de`; S1 part 001 line 10963; this note, section 2.
16. Section 15: `cc1dd66a4`; S1 part 001 line 11174; this note, sections 2 and 6.2.
17. Section 16: `feb74a7a2`; S1 part 001 line 12004.
18. Section 16: `94cbbb9f3`; this note, section 3.7. His words are S1 part 001 line 12501, 2026-09-17T01:56:24, read in the transcript for this section; the evidence cites only his earlier messages that night.
19. Section 18: `3d675af85`, `cb242a2d8` and `aad1f169c`. His ask for the script is S1 part 001 lines 12502 and 12518, read in the transcript for this section.
20. Section 17: `172ddabf1`, `4aae6fdf5` and `07635bf64`; S2 part 000 line 3766; `70736a81d` and `a78e9ac37`.
21. Section 14: `ea1b76992` and `886a06e1d`; his message of 2026-09-30T05:24:08.
22. Section 19: `555cd9c87`; S2 part 000 line 8226.
23. Sections 15 and 23: `check-index.sh` (2026-09-20), `125f8ec1d`, `check-verbatim.py` (2026-09-29) and `seed-worktree.sh` (2026-10-02).
24. Section 20: `050ae4f4c`; S2 part 000 line 8972; `postmortem-2026-09-27-record-keeping.md`.
25. Section 23: `3ae7c4d84`; S2 part 001 lines 21609 and 21979.
26. Section 21: `f6e0a06d3`; S2 part 002 line 20551.
27. Section 22: `70736a81d`; S2 part 003 lines 1928 and 2188; his page comments of 2026-10-04, 00:34 and 00:43; S1 part 000 line 14083; this note, section 6.1.

The smaller homes: section 23.

9.4, What this says for the rewrite:

1. Entries 1, 4, 6 and 7 of 9.3; S1 part 000 line 1442.
2. "Local memory": S2 part 003 line 9690; S1 part 001 line 10963; S1 part 000 lines 519 and 1442.
3. "The report habit"; his message of 2026-10-11T05:14:17.
4. Sections 3 and 14; `ea1b76992`; his message of 2026-09-30T05:24:08.
5. Entries 9, 13, 16 and 25 of 9.3.
6. 9.2 and 9.3; section 7, his message of 2026-09-27T01:30:24 (S2 part 001 line 11216); section 20, the 79 appends.
7. "Gaps", points 1 and 2; "What I could not find".
8. "Local memory", its last sentence.
9. The boot orders in sections 11 and 14.
10. "Gaps", points 3 and 4.
