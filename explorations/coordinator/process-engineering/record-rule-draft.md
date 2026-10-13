<!-- A first draft of the record-keeping part of the `coordinator` skill, written 2026-10-13 at the curator's request: what the record already says about what a FACTS or POSITIONS entry holds, how long it is, which of the three stages (the optimized build, the history, the report) is read when, and how a worker's report becomes an entry; the draft, each sentence marked as his words, on record or new, with the changes it needs in the `fortress-repo` skill and elsewhere; and a trial of it on the eight largest FACTS entries and two POSITIONS entries. -->

# The record-keeping part of the coordinator skill: a first draft and its trial

The trial cuts the ten entries from 36.3K characters to 5.6K, to 15.5 % of their size. The new median of the ten is 0.58K and the longest is 0.60K (FACTS, the bound-list entry). Every one of the ten is under the measure of about 600 characters. If the trial's ratio held across each file, FACTS would come to about 37K characters and POSITIONS to about 24K. That projection is too low, since the smaller entries cannot shrink as much. If every entry over 600 characters came down to 600 and the rest stayed, FACTS would come to 113K and POSITIONS to 60K. So the rule cuts FACTS by more than half, where the consolidation of 2026-10-12 cut 15 %.

Nothing in `FACTS.md`, `POSITIONS.md` or their history files is edited. The new texts are in Part 3 until the curator approves the rule.

## Part 1: what the record already says

Each sentence is quoted with its file and line. Paths are under `explorations/` unless they start with `.claude/`. A sentence marked **pulls** pulls toward keeping detail in an entry. A sentence marked **contradicts** disagrees with another sentence named beside it.

### 1.1 What a FACTS entry holds, and how long it is

1. `coordinator/README.md:22-26`: "As orchestrator it keeps what a worker or its own next incarnation needs to act: `FACTS.md` (what is established about the language, the library, the runtime and this container, each fact in a few lines with its source and its test, the detail left in the report it cites)".
2. `protocol.md:151-154`, principle 6: "A fact in FACTS with its source and its test, in a few lines with the detail left in the report it cites, and with no date".
3. `coordinator/POSITIONS.md:130`, "The record's form: an optimized build and a debug build.": "A FACTS entry is the fact, its source and its test in a few lines, pointing to the report or record that holds the detail, a rung's entry too, since rung entries written at full length, about 14 KB a landed batch, are most of FACTS' growth."
4. `.claude/skills/coordinator/references/roles-and-records.md:9`: "`explorations/coordinator/FACTS.md`: what is established about the language, the library, the run-time and the container, each fact in a few lines with its source and its test, the detail left in the report it cites."
5. `.claude/skills/fortress-repo/references/records.md:37`: "A FACTS entry is the fact, its source and its test in a few lines, under a bold title. It points to the report that holds the detail."
6. `.claude/skills/fortress-repo/references/records.md:73`: "Its source and its test can be the code at file:line, a gated test, or a command and its output." **Pulls**: it invites a line reference into the entry.
7. `coordinator/FACTS.md:1`: "Established facts: what is true of the tree now, grouped by area, each with its source (a path, a test, a ledger row) and the numbers that describe the tree." **Pulls**: "the numbers that describe the tree" has no limit.
8. `coordinator/climb-batch-workflow.js:791`, the rung's prompt: "The FACTS.md entry the rung earns (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md)." And `:1182`, the gather's prompt: "the fact, its source and its test in a few lines." The manual says the same at `coordinator/climb-batch-workflow.md:97`.
9. `coordinator/record-keeping-proposal.md:72`: "A FACTS entry at the length of the finding, since a worker reads it instead of the report." And `:78`: "Full context is the point. Nothing a resumed coordinator needs in order to know the project without Pavol is condensed for length. A FACTS entry is as long as the finding; a POSITIONS entry carries the decision, its date, his words and its reasons." **Pulls**, and **contradicts** 1 to 5 ("a few lines").
10. `coordinator/record-keeping-proposal.md:38`: "the same full shape for a FACTS entry (a report's findings, 1-4 KB ...)". **Pulls**: it records the long shape as the norm.
11. `coordinator/process-engineering/coordinator-shape.md:256`: "A source citation (a path, a row, a test) is not counted: the record's rule asks for it." And `:270`: "That length is mostly source and present detail, not history, and is not counted above." **Pulls**: present detail and line references are exempt from what a consolidation cuts.
12. `coordinator/process-engineering/facts-consolidation-check.md:36`: "their cuts (superseded "Left" lists, removed probes, the gate sentence, measurement narrative) were offset by rows named, tests sorted by kind and whole-declaration line ranges." **Pulls**: this is why the consolidation of 2026-10-12 fell only 15 %; what it cut it partly added back.
13. `coordinator/process-engineering/facts-consolidation-check.md:175`: "Report every entry over 3,000 characters after the rewrite, with what in it a decision rests on." **Pulls**: the only size bar on record is 3,000 characters.

The only measure on record is "a few lines". No number is given. Two sentences rule a size target out: `coordinator/postmortem-2026-09-27-record-keeping.md:15`, "The boot read stays full-context. The peace of mind of a coordinator that knows the project without him is worth the tokens, and no size target applies." (**pulls**), and `coordinator/record-keeping-proposal.md:21`, "So there is no size target in this proposal." (**pulls**). Both were about the boot read as a whole, not about an entry, but nothing says so.

### 1.2 What a POSITIONS entry holds

1. `coordinator/POSITIONS.md:1`: "each position in plain words, what we do and why, under a bold title that is its handle; a quote only where his words are the position itself. Timeless: no dates, no provenance, no account of how a position was reached." And, in the same comment: "a decision not yet built keeps the detail the coming work needs." The second sentence **pulls**.
2. `protocol.md:154-156`: "a position in POSITIONS as it stands, under its title, his words only where they are the position".
3. `.claude/skills/coordinator/references/roles-and-records.md:28`: "The curator's words are written once, in POSITIONS, and only where they are the position; every other file points to the entry."
4. `coordinator/README.md:34-36`: "`POSITIONS.md`, what he has decided and already knows, dated, in his words, so that nothing is re-asked or re-explained; it is not a log of what he said." **Contradicts** `coordinator/README.md:40-45` ("written timelessly, with no dates") and 1 to 3 ("only where they are the position").
5. `.claude/skills/fortress-repo/references/records.md:75`: "POSITIONS holds the curator's decisions, in the curator's words, written once." **Pulls**, and **contradicts** 1 to 3.
6. `coordinator/process-engineering/facts-consolidation-check.md:171`, advice for the POSITIONS consolidation: "Do not reword a decision. Cut only the provenance around it: a date, a rung's or batch's name, an account of what it replaced or who relayed it. Keep every quoted sentence of his verbatim". **Pulls**, and **contradicts** 1 to 3.
7. `coordinator/record-keeping-proposal.md:78` (quoted in 1.1, item 9): "a POSITIONS entry carries the decision, its date, his words and its reasons." **Contradicts** 1 and 4's other half.

No size is on record for a POSITIONS entry. Nothing says where a POSITIONS entry's "Built" sentences or its argument go. `coordinator/process-engineering/coordinator-shape.md:282` counts 37 "Built" sentences, 3.8K, that "report build state that FACTS holds", and leaves them.

### 1.3 What goes to the history, and what stays in a report

1. `coordinator/README.md:40-46`: "`FACTS.md` and `POSITIONS.md` are the optimized build: what is true of the tree now, and what he holds now, written timelessly, with no dates, no rung or commit names and no account of what changed when or what corrected what; `FACTS-history.md` and `POSITIONS-history.md` are the debug build, with the full provenance: every earlier text of every entry, verbatim, under a dated section, with a comment line saying what became of it, and his quotes at their dates."
2. `coordinator/README.md:46-50`: "A worker or a coordinator may append an entry with a date, a quote, a rung's name or a commit in it, and may correct an earlier entry beside it; each consolidation compiles that out: the provenance moves to the history and the fact or the position is rewritten without it, at full informational fidelity." **Pulls**: "at full informational fidelity" is read as "everything stays in the entry".
3. `coordinator/README.md:64-66`: "Nothing a resumed coordinator needs is lost: what a `FACTS.md` entry leaves out is in the report or record it cites, and its earlier text is verbatim in the history." **Pulls** in its first clause. Its second clause states the tiers.
4. `coordinator/POSITIONS.md:130`: "where one is written, or an entry corrects an earlier one, the next consolidation moves that provenance into the history and rewrites the fact or the position without it, at full informational fidelity." **Pulls**, as 2. The phrase is from his question of 2026-09-30: "Can can that worker remove that craft without compromising the informational fidelity of the facts kept in, in the facts MD?" (`coordinator/POSITIONS-history.md:451`). The same entry also says: "the narrative of how a landed rung established a fact is history."
5. `.claude/skills/coordinator/references/roles-and-records.md:29`: "The provenance, every earlier text verbatim and the curator's quotes at their dates, goes to `FACTS-history.md` and `POSITIONS-history.md` beside them." And `:30`: "Each consolidation moves that provenance to the history and rewrites the entry without it, losing nothing." **Pulls**: "losing nothing", as 2.
6. `coordinator/FACTS-history.md:1`: "`FACTS.md` holds what governs the work on the tree as it is today, and this file what is superseded, repaired, or fully recorded elsewhere."
7. `.claude/skills/fortress-repo/references/records.md:35`: "POSITIONS and FACTS describe the present: no dates, no names of who found what, no "corrected" or "superseded" notes. The history of each entry is in `POSITIONS-history.md` and `FACTS-history.md`, beside them."
8. `coordinator/process-engineering/coordinator-shape.md:256`: "Debug content here means text about how the present came to be, not the present itself: titles kept that no longer hold, narratives of how a figure was measured, superseded figures beside the current ones, dated clauses, rung and commit names as history."
9. `coordinator/postmortem-2026-09-29/consolidation-review.md:9`: "The question here was narrower: does the live file still hold what is true and what a coordinator, a batch planner or a worker needs." And `:14`: "Six drops leave the live record weaker than it need be." **Pulls**: the review of a consolidation asks what was dropped, not what should have been.
10. `coordinator/process-engineering/facts-consolidation-check.md:5`: "In slices 2 to 7 nothing a decision rests on is lost". **Pulls**, as 9: last night's only check guarded against loss.

### 1.4 When the history or a report is read

1. `coordinator/FACTS-history.md:1`: "This file is not read at session start: it is opened when a fact in `FACTS.md` needs its history — what the tree did before a repair, how a count stood before a later count, how a campaign went."
2. `coordinator/POSITIONS-history.md:1`: "This file is not read at session start: it is opened when a decision needs its history, what he was told, the options he was shown, or how it stood before it was built or replaced."
3. `coordinator/README.md:14-18`: "Nothing else is read by the coordinator itself: reports, transcripts, ledger rows and source go to a worker that returns a summary".
4. `coordinator/README.md:19-20`: "The boot read is full context by Pavol's word: a resumed coordinator knows the project without him." **Pulls**: "full context" is read as "every detail at boot".
5. `.claude/skills/coordinator/references/boot.md:22`: "Reading the record is the largest single cost of a boot, and `FACTS.md` is the largest part of it: the price of full context, paid once per boot." **Pulls**, as 4.
6. `coordinator/process-engineering/measures-judgement.md:142`, a worker's path through the record: "It reads a report only through a FACTS entry or a ledger row that cites it." This is a finding of a note, not a rule.
7. `.claude/skills/fortress-repo/references/records.md:53`: "Read only the slice of the record that you need." A batch's briefing is a slice of FACTS by key (`coordinator/climb-batch-workflow.md:20`).

### 1.5 How a worker's report becomes a FACTS entry

1. `.claude/skills/fortress-repo/references/records.md:73`: "Add a fact to FACTS in the commit that establishes it, as a new entry in the section of its topic. Its source and its test can be the code at file:line, a gated test, or a command and its output. If your brief does not let you write FACTS, put the entry in your report as finished prose."
2. `coordinator/README.md:68`: "A fact enters in the commit that establishes it". The same at `.claude/skills/coordinator/references/roles-and-records.md:35`.
3. `.claude/skills/coordinator/references/roles-and-records.md:39`: "Agents working beside each other do not edit the shared records; they write the lines for them in their reports as finished prose. The coordinator folds those lines in."
4. `coordinator/climb-batch-workflow.md:97`: "`record.md` carries the FACTS entry the rung earns, its ledger notes and new rows, the handover line". `:99`: "The worker does not edit FACTS, the ledger, PLAN, POSITIONS, INDEX, the handover, the tools or `.claude/`: the gather folds `record.md` into them, since every rung would conflict there." `:160`: "**The record folded.** The FACTS entry under its area."
5. `coordinator/climb-batch-workflow.md:249`: the commit stage "writes the landed figures into FACTS, numbers only: "The true distance to the switch-over" and "The checker-count stage's table"." And `:274`: "FACTS consolidated as its README says, superseded text moved to `FACTS-history.md`."
6. `coordinator/README.md:52-54`: "`FACTS.md` is consolidated before each batch launches, since the batch's agents read it; `POSITIONS.md` at each landing or when he replaces a decision." The same at `.claude/skills/coordinator/references/roles-and-records.md:30`.
7. `coordinator/README.md:55-57`: "Before each commit of such a consolidation, `tools/check-verbatim.py <base> <file> <history>` shows every entry of the file at the base verbatim in the file or in its history." This is the only check a consolidation has, and it guards against loss.
8. `coordinator/postmortem-2026-09-27-record-keeping.md:18`: "Workers keep extending FACTS as before. At each landing the coordinator folds whatever a new fact supersedes into the current entry and moves the old text verbatim to `FACTS-history.md` (the rule of 2026-09-24)." **Pulls**: "as before" keeps the long rung entry.

Nothing on record says that the consolidation shortens a new entry. It moves dates and corrections out, and folds a superseded entry into the current one. The worker's text otherwise stands as written.

### 1.6 Contradictions

1. **A title that no longer holds.** `coordinator/README.md:69-73` and `coordinator/FACTS.md:1` say it "is rewritten to state the present, its old text kept in the history and every citation of it updated." `.claude/skills/coordinator/references/roles-and-records.md:34` says "A title stays verbatim when its entry is rewritten; where the title no longer holds, the entry says so and states the present." `coordinator/postmortem-2026-09-29/consolidation-review.md:53` agrees with the skill: "the title stays the key, and the first sentence after it says what holds today." `coordinator/process-engineering/facts-consolidation-check.md:5` notes that FACTS' header and the README agree, so the skill's part is the odd one out.
2. **Whether POSITIONS is dated.** `coordinator/README.md:34-36` ("dated, in his words") against `coordinator/README.md:40-45` and `coordinator/POSITIONS.md:1` ("no dates").
3. **Whose words POSITIONS holds.** `.claude/skills/fortress-repo/references/records.md:75` ("in the curator's words") and `coordinator/process-engineering/facts-consolidation-check.md:171` ("Keep every quoted sentence of his verbatim") against `coordinator/POSITIONS.md:1`, `protocol.md:155` and `.claude/skills/coordinator/references/roles-and-records.md:28` ("only where they are the position").
4. **An entry's length.** `coordinator/record-keeping-proposal.md:72` and `:78` ("as long as the finding") against `coordinator/README.md:26`, `protocol.md:153`, `coordinator/POSITIONS.md:130` and `.claude/skills/fortress-repo/references/records.md:37` ("a few lines").
5. **Where a FACTS entry may point.** `coordinator/process-engineering/facts-consolidation-check.md:174`: "Do not add a pointer from the record into a skill file or a process report unless the curator has answered question 2". Its question 2 (`:122`) is open. Meanwhile `.claude/skills/coordinator/references/sources.md:59-68` cites FACTS entries as the source of the skill's rules, so the skill already points into FACTS while FACTS may not point into the skill.

### 1.7 The curator's three stages: what is on record and what is not

On record:

- **The optimized build holds the current state.** `coordinator/POSITIONS.md:130` ("what is true about the repository snapshot at this moment in time") and `coordinator/README.md:40-45`. It is read whole at every boot (`coordinator/README.md:5-7`) and by slices in a batch's briefing (`coordinator/climb-batch-workflow.md:20`).
- **The history holds the provenance.** `coordinator/README.md:43-46`. When it is read is on record in the two history files' header comments: when a fact or a decision "needs its history".
- **The report holds the detail.** "the detail left in the report it cites" (`coordinator/README.md:26`, `protocol.md:153`, `.claude/skills/fortress-repo/references/records.md:37`).
- **The coordinator reads neither the history nor a report itself.** A worker does and returns a summary (`coordinator/README.md:14-18`).

Not on record:

- That the three are stages in order, the report being the final instance, and that each is opened only when the one before it cannot answer.
- The lens: which sentences belong in an entry. "A few lines" has no measure, and four sentences above (1.1 items 6, 7, 11, 12) keep line references, numbers and present detail in.
- That the worker's own text of a new entry goes to the history at ingest. Today the history receives only an earlier text, when an entry is rewritten.
- A post-processing pass by the coordinator that shortens a new entry to the rule before the next boot or batch reads it. Today's consolidation moves dates and corrections, and its one check guards against loss.
- When a worker opens a report, as a rule rather than a finding (1.4 item 6).
- For POSITIONS: where the "Built" sentences and the argument go, and any measure.

## Part 2: the record-keeping part of the `coordinator` skill, a first draft

This is a first draft of the record-keeping part of the `coordinator` skill, the one place that defines the record's structure. It would replace "How the records are kept" in `.claude/skills/coordinator/references/roles-and-records.md`. The other places that state the structure today would point to it instead (the changes at the end of this part). Each sentence is marked **(his words)**, **(on record)** or **(new)**. "His words" includes the framing he gave through the coordinator on 2026-10-13, about 09:20 UTC.

### What FACTS and POSITIONS hold

1. FACTS and POSITIONS hold the project only: the language, the library, the tree, and his decisions about the project. (his words)
2. Rules about how the coordinator and the curator work together belong in this skill, not in POSITIONS. This part adds none to POSITIONS. (his words)
3. FACTS and POSITIONS stay, since briefs to workers point into them. (his words)
4. What that moves, for his decision and not done here (new): POSITIONS' section "How he wants to be spoken to" (6 entries, 4.7K) and the entries of "How we work" (35 entries, 44K) that govern the coordinator and him, "The record's form: an optimized build and a debug build." among them, move to this skill, their text to the history. Sorting "How we work" into those and the workers' method is a pass of its own. FACTS' section "The container" (27 entries, 28K) holds facts about the platform, not the project; their homes would be the `cloud-container` and `coordinator` skills. FACTS 201 of the trial is one of them: `.claude/skills/coordinator/references/agents.md` already holds its procedure.

### What a FACTS entry holds

5. A FACTS entry states the current status quo, and nothing else. (his words: "my optimized build is about capturing the current status quo")
6. Its bold title states the fact. (on record) A title that no longer holds is rewritten to state the present, keeping the opening words that keys quote. (on record, `coordinator/README.md:69-73`)
7. A sentence stays in the entry only if it changes what a worker or the coordinator does next. (new, from the coordinator's proposal of 2026-10-12, which he did not answer; his lens: "are those all actionable things?")
8. The entry keeps the one number a decision rests on now. (new)
9. It names the test that gates it: one test, or a name pattern, not a list. (new)
10. It points to the report and the section that hold the rest. (on record that it points to the report; new that it names the section)
11. It is a few lines (on record): for this trial, under about 600 characters. (new) An entry over that says, in the report of the pass that wrote it, which decision needs the extra. (new)
12. Out of the entry go line references, lists of sites, measurement narratives, timings, counts no decision rests on, and every account of how the fact was found. They stay in the report, or go to the history. (new; "the narrative of how a landed rung established a fact is history" is on record)
13. A file and line go in an entry only where no report holds the fact. (new)
14. An entry points wherever its detail lives: a report, a review, a ledger row, or a part of a skill that is that procedure's home. (new; this answers question 2 of `facts-consolidation-check.md`)
15. A fact another entry holds is cited by that entry's title, not restated. (on record: one home per thing)

### What a POSITIONS entry holds

16. A POSITIONS entry says what he decided about the project, and why, in a breath, under a bold title that is its handle. (on record: "what we do and why, under a bold title"; "in a breath" is new)
17. His words appear only where they are the position. (on record)
18. What was built is FACTS' to say. The argument stays in the review the entry cites. His other quotes, and how the decision was reached, go to the history. (new; "his quotes at their dates" in the history is on record)
19. A decision not yet built names what remains and the PLAN item that builds it. (new)
20. The same measure applies: under about 600 characters. (new)

### The three stages, and who reads which

21. The optimized build, FACTS and POSITIONS, is the current state. The coordinator reads it whole at every boot, and a worker gets its slice in the brief. (on record)
22. The history is read when a fact's or a decision's provenance is in question: how it stood before, what it replaced, where it came from. (his words: "when it needs to question the provenance, it uses the historical record"; on record in the history files' headers)
23. The report is read when the detail is needed: the line, the site, the figure, the argument. It is the final instance. (his words: "can look up the full report when needed"; "the final full report is the ... final ... instance")
24. The coordinator does not open the history or a report itself. It sends a worker, which returns what it found. (on record)
25. A worker given an entry in its brief takes the entry as given. It opens the cited report section when its work needs the detail. It opens the history only when the tree disagrees with the entry. (new; the path through the report is on record only as a finding, `measures-judgement.md:142`)

### The ingest

26. The structure of an entry is defined only here. (his words)
27. The `fortress-repo` skill tells a worker what to hand over for FACTS, and not the entry's structure. (his words) What it hands over: each fact as it stands now, in a sentence; the one number a decision rests on; the test that gates it; and the section of its report that holds the detail. (new)
28. The worker writes its full account in its report: the lines, the sites, the figures, and how it found them. (on record: the report holds the detail) It puts the hand-over in a section of its report, or of `record.md` in a batch. It does not edit FACTS or POSITIONS. (on record for a batch and for agents side by side; new for a lone worker)
29. The coordinator writes the entry. It rewrites what the worker wrote to this structure, moves the provenance to the history, and leaves the detail in the report. (his words)
30. It does so in a pass before the next boot or batch reads FACTS. (his words: "there should be some post processing. Pass by the coordinator"; that it runs before each batch is on record) In a batch, the commit stage runs the pass for the coordinator, with this part in its prompt. After a lone worker, the coordinator runs it. (new)
31. A fact enters FACTS at the pass that follows the commit that establishes it. (new; replaces "in the commit that establishes it")
32. The pass moves the worker's hand-over, verbatim, to `FACTS-history.md`, under the date and with where it came from: the rung, the report, the commit. (new: today the history gets only an earlier text)
33. It writes each fact as a new entry, or rewrites in place the entry the fact changes, instead of adding a second. (on record for the rewrite in place)
34. It checks with one bounded `grep` that the cited report section holds each kind of thing it left out. (new)
35. It checks that every key quoting a changed title still resolves, with `facts-extract.sh --check`. (on record as practice)
36. It reports each entry's size, and each entry still over the measure with the decision that needs it. (new)
37. `check-verbatim.py` still runs, since it is cheap. It shows that the history holds the old text. It is not the pass's goal. (on record that it runs; new that it is not the goal)
38. A decision enters POSITIONS in the next commit after he states it, written by the coordinator, and the same pass runs on POSITIONS at each landing and whenever he replaces a decision. (on record)

### What `fortress-repo`'s `references/records.md` would need to change

A list for the skill writer. No skill is edited by this draft.

- `:35`, "POSITIONS and FACTS describe the present: no dates, no names of who found what, no "corrected" or "superseded" notes.": keep it as a rule for reading, and add the stages: "Open the report section an entry cites when your work needs the detail, and the history file only when the tree disagrees with an entry."
- `:37`, "A FACTS entry is the fact, its source and its test in a few lines, under a bold title. It points to the report that holds the detail.": drop the structure. Keep "Cite it by its bold title, or by its opening words if it has no title."
- `:73`, "Add a fact to FACTS in the commit that establishes it, as a new entry in the section of its topic. Its source and its test can be the code at file:line, a gated test, or a command and its output. If your brief does not let you write FACTS, put the entry in your report as finished prose.": replace with the hand-over of item 27. "Do not edit FACTS. For each fact your work established, your report hands over, in a section of its own: the fact as it stands now, in a sentence; the one number a decision rests on; the test that gates it; and the section of your report that holds the detail. The coordinator writes the entry."
- `:74`, "Rewrite a wrong line of FACTS in place.": "If an entry of FACTS is wrong, say so in the hand-over, with the evidence. The coordinator rewrites it."
- `:75`, "POSITIONS holds the curator's decisions, in the curator's words, written once. Everything else points there. Write a decision there only if your brief gives it to you to record.": "POSITIONS holds the curator's decisions about the project. Do not write to it." Keep "If you have evidence against one, do as `exploring.md` says."
- `:11-18`, "Put each of these that you have in your report": add an item, "**For FACTS.** Each fact your work established, as item 27 says, or "none"."
- The same skill's `SKILL.md:137`, "Each fact has its source and its test.", would read "Each fact points to the report that holds its detail."

### Where the structure is stated today, and what each place becomes

The places that state the structure point to this part instead:

- `coordinator/README.md:38-73`, "How they are kept", becomes one line: "How the records are kept: the `coordinator` skill, `references/roles-and-records.md`." This removes the pulls at `:46-50` ("at full informational fidelity") and `:64-66` ("Nothing a resumed coordinator needs is lost"), and contradictions 1 and 2 of Part 1.
- `coordinator/README.md:19-20`: "The boot read is the current state whole, by Pavol's word: a resumed coordinator knows the project without him, the provenance and the detail one query away."
- `coordinator/FACTS.md:1` and `coordinator/POSITIONS.md:1`: each header comment keeps one sentence of what the file holds, the project only, and points to this part. This removes "the numbers that describe the tree" and "a decision not yet built keeps the detail the coming work needs".
- `coordinator/POSITIONS.md:130`, "The record's form: an optimized build and a debug build.": not edited; it moves to this part, by item 2, and its text to the history.
- `protocol.md:151-159`, principle 6: it keeps "The record describes the present, each thing written once, so that a resumed coordinator knows the project without him." The rest becomes "Its structure is the `coordinator` skill's record-keeping part."
- `.claude/skills/coordinator/references/roles-and-records.md:26-41`: replaced by this part. Its `:30` ("losing nothing") and `:34` (the title rule of contradiction 1) go with it.
- `.claude/skills/coordinator/references/boot.md:22`: replace "the price of full context, paid once per boot" with "kept small by the record-keeping part".
- `coordinator/climb-batch-workflow.md:97` and `:160`, and the prompts `coordinator/climb-batch-workflow.js:791` and `:1182`: the rung's `record.md` carries "the FACTS hand-over", and the gather folds nothing into FACTS. `coordinator/climb-batch-workflow.md:274` becomes "The pass of the `coordinator` skill's record-keeping part: each fact the batch handed over written to it, the hand-over moved to `FACTS-history.md`." `:249`, the landed figures written into two entries, numbers only, stays.
- `coordinator/process-engineering/facts-consolidation-check.md:171`, `:174` and `:175`, advice for the POSITIONS consolidation: "Keep every quoted sentence of his verbatim" becomes "Keep his words only where they are the position"; the sentence on pointers goes once item 14 is approved; "over 3,000 characters" becomes "over 600 characters".
- The dated notes keep their text and get one line in their header comment, "Its rule for an entry's length is replaced by the record-keeping part of the `coordinator` skill.": `coordinator/record-keeping-proposal.md` (1.1 items 9 and 10, and its § 0), `coordinator/postmortem-2026-09-27-record-keeping.md` (1.1 and 1.5 item 8), `coordinator/process-engineering/coordinator-shape.md` (1.1 item 11), `coordinator/postmortem-2026-09-29/consolidation-review.md` (1.3 item 9).
- `.claude/skills/coordinator/references/sources.md:59` and `:66-68`, which cite the FACTS entry "A restart of the session's own process ..." as the source of the skill's resume rules: cite `FACTS-history.md` for that entry's earlier text once the trial's text is applied.

## Part 3: the trial

Each entry below gives the new text, its size against the old in characters, and each kind of thing cut with where it lives now. A home is checked with one bounded `grep`, quoted as `file:line` with the words it matched. "The history file" means the provenance goes there at the pass. The entry's whole old text also goes to the history file verbatim, as item 32 of Part 2 says.

The keys that quote each title were checked on a copy of the record with the ten new texts in place: `facts-extract.sh --root COPY --check` resolves each key to the same line as on the live record. The ten entries' slice falls from 38.6K bytes, about 16K tokens, to 7.7K bytes, about 3.3K tokens.

### FACTS 53, "The true distance to the switch-over ..."

New text, 551 characters against 6,558 (8 %):

- **The true distance to the switch-over is the gate's distance stage: 85 errors at the last landed gate, under the bound `Any`.** The checker count is 1. Both are reported and never red. The count's 1 is the component's first error, the refusal at `__bigOperator`'s `body(i)`; typing it lets the count reach the 79 errors the distance finds in `FortressLibrary`. Runs vary by 2 to 4 errors (row 488). The per-site list is `compile-ladder/gate/distance-sites.tsv`. Detail: `perf-probes/prelude/switch-over-distance-flat.md`; each gate's `summary.txt`.

Cut, and where it lives:

- How the stage runs (twelve components in one JVM, the setting `any`): `coordinator/climb-batch-workflow.md:234`, "runs every stage of the checker over the twelve prelude components in one JVM".
- The 85 by kind: `compile-ladder/climb-batch-13b/gate/distance.txt:3`, "#kind exclusion 0".
- The run's timings: `compile-ladder/climb-batch-13b/gate/distance.txt:30`, "#seconds 2246 FortressLibrary 1318".
- The two crash rows' mechanics and line references: `compile-ladder/rung-checker-defects/REPORT.md:182`, "Missing parameter type for i"; `compile-ladder/rung-size-expressions/REPORT.md:111`, "TryChecker returned an untyped expr".
- The count stage's mechanics (walk's setting, the api clean, the component's first error): `compile-ladder/rung-tuple-orders/REPORT.md:142`, "With the apis clean, the run goes on to check the component, and its first error stops it".
- That a zero count is not enough for the switch-over: `coordinator/library-route-judgement.md:33`, "Stop condition of the phase: the stage prints zero errors and no crash, and `FlatArrays.fsi` type-checks".
- How the stage compares with the last landed table: `coordinator/climb-batch-workflow.md:234`, "`compare.sh` prints DISTANCE DOWN, UP or SAME".
- The varying families and the plausible seat of the variation: `compile-ladder/rung-exclusion-remainder/REPORT.md:106`, "The families that vary"; `compile-ladder/rung-generator-slips/REPORT.md:63`, "The big operators' declared return types".
- Where the batches before the fixed path keep their per-site lists, and where each batch's movement is read: the history file.

### FACTS 55, "Static arguments are inferred with coercion ..."

New text, 574 characters against 4,260 (13 %):

- **Static arguments are inferred with coercion on both paths: the compiled checker from the arguments' static types and the expected type, walk from the arguments' run-time types.** A mixed-width call takes the narrowest type its arguments convert into. They differ: the compile path bounds an empty `extends` clause by `Object` (row 412); walk converts no body to its declared return type (row 387) and cannot fix a static argument that only the result names (row 510). Gated by `InferCoercion*`. Detail: `reviews/numerics-plan-coordinator/evidence-B.md` sections 3 and 4.

Cut, and where it lives:

- The checker's solver with its line references (the join of lower bounds, the promotion, the oracle): `reviews/numerics-plan-coordinator/evidence-B.md` § 3.2, "Otherwise each variable is bound to `ta.join(pl…)`, the join of its lower bounds".
- `checkApplicableWithInference` and the coercion attempt: `evidence-B.md:24`, "`checkApplicableWithInference` is "with static argument inference and no coercion"".
- Walk's unification: `evidence-B.md:226`, "Two lower bounds are joined by `FType.join`".
- The specification's two sentences: `evidence-B.md:23`, "types named by type parameters do not have coercions"; the inference chapter is its own FACTS entry, "The specification's type-inference chapter states the rule the compiled checker builds".
- The worked calls (`scale64`, `pick`, `twiceK`, `inc(u)`): their tests, `compiler_tests/InferCoercionShapes.fss:30`, `tests/InferCoercionRungK.fss:23`, and `evidence-B.md` § 4.3.
- Where the checker passes or drops the expected type: FACTS "The compiled checker gives a call its expected type ..." and "Keeping the expected type at a call written `f(x)` ...", one home each.

### FACTS 166, "The team's latest word on types ..."

New text, 586 characters against 4,066 (14 %):

- **The team's latest word on types and on the exclusion rule is the unfinished restart, not `Specification/`.** The restart, `Documentation/Specification/`, was never adopted; its Types chapter restates the rule as "instantiation exclusion" and adds `covariant`. On static parameters, traits, exceptions, components and the numeric library, `Specification/` is the only statement. The later POPL 2019 paper gives the curator's instance rule; its proof does not cover F-bounded functions such as `SUM`. Detail: `coordinator/spec-lineage.md`; `research/extracts/ParkPOPL2019-extract.md`.

Cut, and where it lives:

- The restart's dates, author and size: `coordinator/spec-lineage.md:17-18`, "2012-02-20 by Victor Luchangco ... abandoned on 2012-05-31 with a 65-page draft PDF".
- The PDFs' dates and the 1.0 artefact: `coordinator/spec-lineage.md:14`, "under the label "July 19, 2012""; `:7`, "`Specification-1.0-frozen/fortress.1.0.pdf` is the real 1.0 release artefact".
- The Working Draft's covariance and `Bottom` inexpressible: `coordinator/spec-lineage.md:236`, "`trait-parameters.tex`"; `:274`, "is inexpressible".
- The paper's rules page by page ([Anc-Same-Trait], the default bounds, the exponential dispatch): `research/extracts/ParkPOPL2019-extract.md:72`, "[Anc-Same-Trait] (Fig. 4, p. 11:11)"; `:132`, "the potential for exponential blowup".
- [D-Method] and covariance in the algebra traits: `research/extracts/ParkPOPL2019-extract.md:108`, "[D-Method] checks that covariant and contravariant class".
- Naden's two write-ups: `research/extracts/ParkPOPL2019-extract.md:301`, "`Papers/Types/journal/justificationOfRTR.tex:538`".
- The paper's licence: `protocol.md:25`, "except an open-access paper whose license allows". The talk's transcript: `research/README.md`.
- Which reviews rechecked his decisions against the paper: the history file.

### FACTS 94, "The compiled checker keeps a type parameter's bound list ..."

New text, 597 characters against 3,463 (17 %):

- **The compiled checker keeps a type parameter's bound list as it is when its overloading check reduces two declarations, so the array family checks under `T extends { Number, MultiplicativeRing[\T\] }`, but calls through such a bound are still refused or crash** (rows 686, 687, 689; a written static argument avoids them), and so is a valid overloading beside it (row 690). In the library only `squaredNorm(me)` meets them, a distance site. A trait-table memo keeps the count stage within its time limit. Gated by `OverloadTwoBoundsClosed*`. Detail: `compile-ladder/rung-array-bound/REPORT.md`.

The title drops "no longer crashes it", a mark of change that question 3 of `facts-consolidation-check.md` asks about; items 5 and 6 of Part 2 retitle it.

Cut, and where it lives:

- `boundsSubstitution`'s mechanics and line references: `compile-ladder/rung-array-bound/REPORT.md:6`, "`boundsSubstitution` no longer meets a bound list into one type".
- Each row's test name: the rows themselves; row 686 also holds the `squaredNorm(me)` site (`facts-extract.sh 'ledger:686'`, "`squaredNorm(me)` (`Library/FortressLibrary.fss:2490`) was refused so").
- Why the checker was slow (the memo key's cycle history, fresh analyzers): `perf-probes/checker-speed/REPORT.md:20`, "Each memo key carries the whole cycle history".
- The memo's switch name: `perf-probes/checker-speed/REPORT.md:319`, "the switch `fortress.analyzer.ground.cache`, default on".
- The test that a context-reading answer is not shared: `perf-probes/checker-speed/REPORT.md:394`, "`compiler_tests/XXXBoundCheckSameNameTwoScopes`".
- The timings (17 minutes, 387 s, 2,246 s): `perf-probes/checker-speed/REPORT.md:29`, "3,674 s → 1,032 s"; `compile-ladder/climb-batch-13b/gate/distance.txt:30`.

### FACTS 145, "Walk refuses at load an object ..."

New text, 587 characters against 3,412 (17 %):

- **Walk refuses at load an object that leaves an inherited abstract method without a body, a declaration with the modifier `override` that overrides nothing, and a generic trait, object or object expression that breaks the Meet Rule for Functional Methods; a top-level variable may hold an object expression.** Generic objects skip the abstract-method check (row 665), and a body at narrower types passes (row 666), which `Pairs` needs. Gated by `AbstractMethodUndefinedWalk`, `OverrideNothingWalk` and `XXXAbstractMethod*Walk`. Detail: `compile-ladder/rung-walk-load-checks/REPORT.md`.

Cut, and where it lives:

- `Constructor.checkForDef` and the team's message: `compile-ladder/rung-walk-load-checks/REPORT.md:5`, "the team's `Constructor.checkForDef` and its refusal "Object ... does not define an abstract method declared in type ...""
- The method map's order (`extends { T1, T2 }` refused, `{ T2, T1 }` runs): `compile-ladder/rung-walk-load-checks/SKEPTIC.md`, which names `XXXDottedMethodMeetInheritedWalk`; the test itself, `tests/XXXDottedMethodMeetInheritedWalk.fss`, "object O extends { T2, T1 } end".
- `Constructor.checkOverrides`: `compile-ladder/rung-walk-override/REPORT.md:21`, "What walk did: `Constructor.checkOverrides`".
- The generic meet check: `compile-ladder/rung-walk-override/REPORT.md:3`, "`BuildEnvironments.java`".
- The order in which `Driver.evalComponent` binds object expressions: `compile-ladder/rung-walk-load-checks/REPORT.md:209`, "The constructors of the object expressions are bound before the top-level variables".
- The other seven tests: `compile-ladder/rung-walk-load-checks/SKEPTIC.md:48`, "`ObjectExpressionSingletonFieldWalk`, `ObjectExpressionImportedVariableWalk`".
- `Pairs`'s `SingleRange` and its lines: `compile-ladder/rung-walk-override/REPORT.md:59`, "`tests/PairsRunRangesWalk.fss`: imports `Pairs`".

### FACTS 87, "The compiled checker gives a call its expected type ..."

New text, 577 characters against 3,291 (18 %):

- **The compiled checker gives a call its expected type in a clause of an `if` without `else` (`()`), a block's last expression after local declarations, a `typecase` clause, a juxtaposition, a repeated operator and a `label` body, but not at another call's argument (row 455).** It renames an inherited method's own static parameters apart from the receiver's static arguments, and checks a written static argument against its bounds. Gated by `compiler_tests/InferResultOnly*`, `Infer*Context` and `MethodStaticArg*`. Detail: `compile-ladder/rung-checker-contexts/REPORT.md`.

The title now holds the contexts, the renaming moves to the body, and it keeps the opening words that keys quote ("gives a call its expected type in a clause of an").

Cut, and where it lives:

- The sites in `Misc.scala`, `Decls.scala` and `Operators.scala`: `compile-ladder/rung-checker-expected-type/REPORT.md:17`, "an `if` without `else`: each clause is checked against `()`"; `compile-ladder/rung-checker-contexts/REPORT.md:1`, "the expected type at a repeated operator and at a label body".
- How the multifix application is chosen: `compile-ladder/rung-array-bound/REPORT.md:5`, "the loose juxtaposition and the repeated operator in the same file. Each tries the mu…".
- `instantiateMethodApart` and the renaming: `compile-ladder/rung-checker-expected-type/REPORT.md:22`, "Row 627: `commonInheritedMethods` instantiates each inherited method".
- `staticArgsMatchStaticParamsForApp`: `compile-ladder/rung-checker-contexts/REPORT.md:4`, "spec: an operator application has the expected type".
- The retry at another call's argument, decided and not built: POSITIONS, "A call written as another call's argument is retried ...".
- A `spawn` refused inside an `atomic` body, a separate fact: `compile-ladder/rung-checker-contexts/SKEPTIC.md`, which names `XXXSpawnInAtomicExitValue`, the test that pins it.

### FACTS 58, "MicroGPT's own programs through the compiled checker ..."

New text, 465 characters against 3,200 (15 %):

- **MicroGPT's own programs through the compiled checker against the one library: none of their errors is a numeral, the model's unsized array types are the largest part, and every count is a floor.** C4 has 26 errors of its own, 15 of them decision D's unsized `Array[\RR64,ZZ32\]`; with decision D's diff it has 14. The counts are floors because the checker stops a block at its first failing statement (row 474). Detail: `reviews/array-design-ways.md` section 2.

Cut, and where it lives:

- The 26 and the 14, with the powers refused as an ambiguous coercion and the diagnostic copies' 7: `reviews/array-design-ways.md:13`, "C4's own errors on the compiled checker: 26 as written, 14 with the diff".
- The 15 sites of decision D and the 6 small errors: `reviews/array-design-ways.md:50`, "6 are the old small ones: `Character.codePoint`".
- The planted errors and the copies checked: `reviews/array-design-ways.md:33`, "checked on six copies".
- Walk's 40 PASS of 40 on the patched copy: `reviews/decision-d-diff.md:13`, "Under walk the patched C4 runs `MicroGptFlatCheck` to 40 PASS of 40".
- The APL program's errors, measured on an earlier library: `reviews/numerics-plan-fable.md:9`, "microGPT's own two programs, put through the compiled checker against the one library".

### FACTS 201, "A restart of the session's own process kills its background runs ..."

New text, 531 characters against 3,158 (17 %):

- **A restart of the session's own process kills its background runs, and `resumeFromRunId` then recovers every agent that had finished.** It stops every Workflow run and `Agent`-tool worker. The session ID, worktrees, untracked files, transcripts, each run's journal and the workers' background shell scripts survive. A resume needs the same session and the launch's script and arguments byte for byte; an unfinished agent runs again from its start. How: the `coordinator` skill, `references/agents.md`, "Resuming a Workflow run".

Cut, and where it lives. Nearly all of it is procedure that the `coordinator` skill holds:

- Matching the launched run (the cached prefix, a short hash, the call order): `.claude/skills/coordinator/references/agents.md:65`, "Matching the launched run exactly"; `:68`, "A base given as a short hash".
- A run resumed from a copy of its script, `agent()` wrapped: `.claude/skills/coordinator/references/agents.md:71`, "use a copy that wraps `agent()`".
- A stage killed mid-work and its leftovers: `.claude/skills/coordinator/references/agents.md:73`, "An agent killed mid-work leaves its edits in its tree".
- The journal's form: `.claude/skills/coordinator/references/agents.md:77`, "It holds one `launched` line, a `started` line for each agent call".
- An `Agent`-tool worker continued with `SendMessage`: `.claude/skills/coordinator/references/agents.md:81`.
- The relaunched gather of climb batch 6.5b: `compile-ladder/climb-batch-6.5b/RECORD.md:7`, "A relaunched gather".
- The session's ID, the environment manager's log and its command: the history file.

### POSITIONS 48, "A type parameter the arguments do not fix takes its bound ..."

New text, 580 characters against 2,661 (22 %):

- **A type parameter the arguments do not fix takes its bound, never `Bottom` (the paper's instance rule).** It takes the intersection of its upper bounds under the constraint of the call's static return type: never `Bottom`, the union of the arguments' types or the value's type alone. Why: it is the type group's later word (POPL 2019), and he trusts the team's later work over his own reading. Which declaration runs is unchanged, and microGPT is unaffected. The library keeps the team's unbounded declarations. Left for phase 5: the dispatcher carrying the static return type.

Cut, and where it lives:

- His full quote: the history file, `coordinator/POSITIONS-history.md:825`, "2026-09-29, a type parameter that a call's arguments do not fix".
- The paper's citation and pages, and why the authors replaced the value's rule: FACTS "The team's latest word on types ..." and `research/extracts/ParkPOPL2019-extract.md`.
- What the specification now says, and its callout: FACTS "The specification gives the run-time instance of a dispatched declaration by the POPL 2019 paper's rule ...".
- The checker's and walk's built state: FACTS "The compiled checker instantiates a type parameter that nothing at a call fixes ..." and "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound ...".
- The tests and rows that gate the departure (rows 538, 496, 516, `InferLoneBound`): those FACTS entries and the rows.
- The dispatcher's line, `OverloadSet.java:2048`: `reviews/array-judgements-popl-check.md`, which cites it.
- The three `extends Object` bounds and item 20's quote: the history file, `coordinator/POSITIONS-history.md:926`, "asked item 20".
- The recheck's smaller sentences listed for his review: `reviews/decisions-review/popl-recheck.md:8`, "It contradicts one default and one mechanism".

### POSITIONS 60, "The `comprises` passages read at the level of values ..."

New text, 588 characters against 2,248 (26 %):

- **The `comprises` passages read at the level of values (PLAN item 26, row 491).** The specification reads a `comprises` clause at the level of values, "covers" is defined once, and the Meet Rule has the closed-trait case; a call between candidates is typed by the intersection of their return types, with run-time uniqueness in place of static. Why: the proof addendum shows it sound for ground declarations, its coverage search kept local to overload checking. A generic declaration that needs a run-time instance is outside it. Proof: `reviews/comprises-type-level-proof-addendum.md`.

The title keeps "(PLAN item 26, row 491)": 22 keys in the tree quote it whole.

Cut, and where it lives:

- What was built in the specification, the checker and walk: the three FACTS entries the old text names, "The specification gives the run-time instance of a dispatched declaration ...", "The compiled checker accepts the Meet Rule's `comprises` example by a coverage check local to overload checking ..." and "Walk's load check reads a generic declaration beside a plain one on declared domains ...".
- The addendum's three points and its boundary: `reviews/comprises-type-level-proof-addendum.md:92`, "For these ground declarations the Return Type Rule gives"; `:186`, "use a coverage query local to overload validity".
- His "super scared" and how the addendum came to be written: the history file, `coordinator/POSITIONS-history.md:408`, "2026-09-29, PLAN item 26".
- The acceptance pair `CoverageReturnGood` and the fallback not taken: the FACTS entry on the coverage check, and the history file.
- The checker's narrower condition and walk's unchecked closure, listed for his review: rows 543 and 551.

### The totals

- The ten: 36,317 characters before, 5,636 after, 15.5 %. The eight FACTS entries: 31,408 to 4,468, 14.2 %. The two POSITIONS entries: 4,909 to 1,168, 23.8 %.
- The median of the ten: 3,352 before, 579 after. The longest: 6,558 before (FACTS 53), 597 after (FACTS 94).
- No entry of the ten stays over the measure. The titles are the hard part: FACTS 145's title alone is 305 characters and FACTS 87's 273, because each title lists several behaviours. A rule that a title states one fact would split such an entry; the trial did not.
- FACTS is 257,739 characters in 195 entries, median 1,149; 161 entries are over 600. At the trial's ratio of 14.2 % it would come to about 37K. With every entry over 600 brought to 600 and the rest unchanged, it would come to about 113K, median 600 or less.
- POSITIONS is 102,815 characters in 113 entries, median 726; 64 entries are over 600. At the trial's ratio of 23.8 % it would come to about 24K. With every entry over 600 brought to 600, about 60K.

### Decisions taken in the trial

- **Where a procedure lives.** FACTS 201 now points into the `coordinator` skill's `references/agents.md`, which already holds the resume procedure. The alternative was to keep the procedure in FACTS, as the skill's `sources.md` cites it there. This is question 2 of `facts-consolidation-check.md`, still open; item 14 of Part 2 answers it, pending his yes. Under item 1 the entry may leave FACTS altogether, as a fact about the platform (item 4).
- **A separate fact dropped from an entry.** FACTS 87's sentence that a `spawn` is refused in an `atomic` body is a different fact from the entry's. It is cut to the skeptic's report and its test. The alternative was a new entry of its own; no decision of the coordinator or a worker was found to rest on it.
- **Titles rewritten.** FACTS 87, 94 and 166 have new titles that keep the opening words every key quotes. POSITIONS 60 keeps its title whole, provenance and all, because 22 keys quote it whole.
- **Tests named by pattern.** FACTS 55, 87 and 94 name their tests by a pattern (`InferCoercion*`, `InferResultOnly*`, `OverloadTwoBoundsClosed*`). Some of the patterns also match tests of neighbouring entries. FACTS 145 names two tests and a pattern, since it joins four checks.
