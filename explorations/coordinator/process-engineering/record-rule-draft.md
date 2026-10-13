<!-- A draft of the record-keeping part of the `coordinator` skill, written 2026-10-13 at the curator's request: what the record already says about what a FACTS or POSITIONS entry holds, how long it is, which of the three stages (the optimized build, the history, the report) is read when, and how a worker's report becomes an entry, with the five contradictions and what answers each; the part itself, opening with "What an entry is", the definition of a good entry that the writers of the consolidation of FACTS and POSITIONS get, quoted whole in their briefs (an entry's purpose, what each kind holds, six questions a writer asks of each sentence, a count that each landing changes, the size and its reason, the register, the curator's words), and five worked examples, old and new texts with the question that decided each cut, in place of the nine principles he commented on, principles 7 to 9 out to other parts of the `coordinator` skill; then its items, made consistent with it, each sentence marked as his words, on record or new, with numbered entries in the entry's form, the knowledge split between the `coordinator` skill (the entry's form and the pass that consolidates a finished worker's text) and the `fortress-repo` skill (how workers read, use and, when asked, edit the record), and the changes this needs in both skills and elsewhere; a trial of it on the eight largest FACTS entries and two POSITIONS entries; the pairs where FACTS and POSITIONS told one ground given one home (Part 3b); the blind test of the trial at his word, ten scenarios answered by two readers in an old and a new copy of the record, 27 against 27 of 30 with one sentence restored (Part 4; the kit in `record-test/`); and where each point the test and his comments of 2026-10-13 added went in the part (Part 5). -->

# The record-keeping part of the coordinator skill: a first draft and its trial

The trial cuts the ten entries from 36.3K characters to 5.9K, to 16.2 % of their size. The new median of the ten is 0.58K. Nine of the ten are under the measure of about 600 characters. The tenth, FACTS 58, is 707, because the test showed that a decision needs the sentence it restores. If the trial's ratio held across each file, FACTS would come to about 39K characters and POSITIONS to about 24K. That projection is too low, since the smaller entries cannot shrink as much. If every entry over 600 characters came down to 600 and the rest stayed, FACTS would come to 113K and POSITIONS to 60K. So the rule cuts FACTS by more than half, where the consolidation of 2026-10-12 cut 15 %.

Giving one home to what FACTS and POSITIONS both tell (Part 3b) cuts four more FACTS entries to 30 % of their size. A blind test (Part 4) scored the new entries the same as the old: 27 points of 30 each. The new entries lost once, on FACTS 58, and one restored sentence repaired it.

Part 2 opens with "What an entry is", the definition that the writers of the consolidation get, in about 4K characters: an entry's purpose, what a FACTS and a POSITIONS entry hold, six questions that a writer asks of each sentence, a count that each landing changes, the size and its reason, the register, and the curator's words. Five worked examples follow it, which cut 17,952 characters of old text to 3,086. It replaces the nine principles; principles 7 to 9 were about how the coordinator works, and their items belong to other parts of the `coordinator` skill. Part 2 folds in what the test and his comments of 2026-10-13 added (Part 5 says where each point went): numbered entries are now part of an entry's form, the five contradictions of Part 1.6 are answered, and the part is narrowed to the entry's form and the coordinator's pass, while the `fortress-repo` skill keeps how workers read, use and, when asked, edit the record.

Nothing in `FACTS.md`, `POSITIONS.md` or their history files is edited. The new texts are in Parts 3 and 3b until the curator approves the rule.

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

Part 2 answers each:

1. A title: items 7 and 12. The number is the entry's key, so a title is rewritten freely and no citation quotes it (his words, 11:41).
2. Dates: item 24. POSITIONS carries no date; the dates are in the history.
3. His words: item 25. They appear only where they are the position; the rest is said in a shorter, more precise form, and his quotes are in the history (his words, 09:05).
4. The length: item 20. A few lines, with about 600 characters as a check, not a target.
5. Pointers: item 21. An entry may point into the part of a skill where its detail lives; FACTS 201's pointer into the `coordinator` skill was followed in scenario 6 of the test.

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

## Part 2: the record-keeping part of the `coordinator` skill, a draft

This is a draft of the record-keeping part of the `coordinator` skill: the form of a FACTS or POSITIONS entry, and the pass by which the coordinator turns what a worker wrote into entries. It would replace "How the records are kept" in `.claude/skills/coordinator/references/roles-and-records.md`. The `fortress-repo` skill keeps how workers read and use the record, and how they edit it when a brief asks them to; the last two sections list what changes there and in the other places that state the structure today. It opens with "What an entry is", the definition that the writers of the consolidation get, written to be quoted whole in a brief, and five worked examples; neither marks its sentences. Below them, each sentence is marked (his words), (on record) or (new). "His words" includes the framing he gave through the coordinator on 2026-10-13, about 09:20 UTC, and his chat messages and page comments of that day, quoted with their UTC times. Part 5 lists where each point of the test and of his comments went.

"What an entry is" replaces the nine principles of the earlier draft, which he commented on from 15:25 to 16:03 UTC; principles 1 to 6 are in it. Principles 7, 8 and 9 were about how the coordinator works, not about how an entry is written, so they are out: their items belong to other parts of the `coordinator` skill (`process-engineering/coordinator-skill-outline.md`), items 33 and 35 to 37 to Core 5 and Part 6, items 38 to 42 to Core 5 and `fortress-repo`, item 34 to Part 1, and item 31 to Core 2.

### What an entry is

**Its purpose.** An entry lets a worker or the coordinator act right without opening the report, and tells it when the report is needed. FACTS does this for what is true of the tree. POSITIONS does it for what the curator decided, so that no one acts against a decision or asks him again.

**A FACTS entry** holds, after its number and a bold title that states the fact in one sentence: the fact as it stands now; what it means for the work, such as what it blocks, what avoids it, or which row or decision it bears on; the test that gates it, or its source when no test does; the number of the decision it builds, if any; and the report section that holds the detail.

**A POSITIONS entry** holds, after its number and a bold title: what the curator decided about the project, and why, in one or two sentences; what the decision means for the work; and what is still to build, with its PLAN item. The FACTS entries that build a decision give its number, and the decision does not list them.

**The questions.** Picture the reader: a worker new to the repository who gets the entry in a brief and acts on it alone, or the coordinator who chooses the next work. Write as for a capable colleague who takes over tomorrow and cannot ask you. Ask of each sentence:

1. Without it, would the reader do something else: choose another test, row, file or way, or decide otherwise? Keep it. F-53: an edit can move 2 to 4 errors that it does not touch, so a move that small does not show its effect.
2. Without it, would the reader misread another sentence? Keep it. F-58 says that the five powers fail because two declarations of `^` tie. Without that, a reader takes them for numeral work.
3. Does it tell how the fact came about: a date, a batch, what it replaced, what was corrected, "no longer"? It goes to the history.
4. Is it detail that the reader needs only while doing the work: a line number, a list of sites, a timing, a mechanism? It stays in the report, and the entry names the section.
5. Does another entry or a skill say it already? Give that entry's number, or the skill's part.
6. Can a reader new to the project follow every word? Name the kind of each count. Say in a few words what a code stands for (decision D, E3).

Questions 3 to 5 move a sentence; they do not lose it. Four habits put in an entry what belongs elsewhere: the lab notebook (how it was found), the changelog (what changed), the citation reflex (a line number on each claim) and the cache (a copy of another entry). One habit cuts too much: bare numbers and codes. "With the diff it has 14" tells nothing until it says 14 of what.

**A count that each landing changes**, such as the distance to the switch-over, has one entry: the current value, what it counts, the kinds that lead, and how to read a move. The batch's commit stage rewrites the value at each landing. Other entries give that entry's number, not the value. The counts by kind stay in the file that the gate writes. A count from one measurement is not kept current: its entry says so, and keeps the parts that a decision reads.

**The size.** About 240 entries stay, and the goal of about 145K characters for both files allows about 600 each. So 600 is a check, not a cap. An entry may pass it when the questions keep a sentence that needs the room. Its writer names, in the chunk's report, the decision or the misreading that the sentence prevents, and shorter entries pay for it: a chunk's total stays under 600 characters times its entries. The record test checks the result: no worse than 27 of 30.

**The register** is halfway to ASD-STE100: one statement per sentence, active voice, short sentences, one word for one thing. Use no shorthand that a reader new to the project cannot follow. Say what every number counts.

**The curator's words.** Condense what he said into the position, in this register, and keep the part of his rule that cuts. Quote him only where the exact words are the decision, as in the goal "the optimal expression of the microGPT algorithm for readability". His words as he dictated them go to the history, with their time.

### Worked examples

Five entries of the trial (Part 3) and of the pairs (Part 3b), rewritten to "What an entry is". Each gives the old text, the new text, and the question that decided each cut or keep. An entry's number is its line in `FACTS.md` or `POSITIONS.md` today, which the record store's design makes its number. A pointer is the target's number in the sentence that needs it, as the reviewed design has it (`record-store-review.md`, section 3). Two old texts are long, so only their start is quoted and the rest is listed in brackets. P-48's old text is the one on `main` today. Sizes are characters of the entry's line. A brief may quote the new texts and their notes without the old texts.

The five new texts come to 3,086 characters against 17,952, 17 %. Four are under 600 characters. F-58 passes that measure, for the reason that its notes give.

#### F-58: the errors by kind, not a bare count

Old, 3,200 characters:

> - **MicroGPT's own programs through the compiled checker against the one library: none of their errors is a numeral, the model's unsized array types are the largest part, and every count is a floor** (`reviews/array-design-ways.md` section 2; `reviews/numerics-plan-fable.md` sections 3.2 and 3.6; `reviews/numerics-plan-synthesis.md` section 7). C4's own errors are 26. 15 are decision D, the unsized `Array[\RR64,ZZ32\]` where the library's `DOT`, `gather`, `row`, `plane`, `parseRow` and the `reflect` views want `Vector`, `Matrix` or `Array3`: the four row lifts, `plane` and the three `reflect` bridges in `FlatArrays`, `parseRow` twice in `FlatData`, `gather` twice and `DOT` three times in the model. 5 are numeral powers that the checker's coercion attempt refuses as an ambiguous coercion, `10.0^(-5)` on the hyperparameter line (its second power, `10.0^(-8)`, not reached), `10.0^10` in the mask and the check program's three tolerances, since `RR64`'s `^` on an `RR64` and `MultiplicativeRing`'s `^` on a `ZZ64` both apply only by converting the integer (row 533; walk takes them). 6 are small: `Character.codePoint`, `diag`'s body an `Array2` against a declared `Matrix`, a varargs `SUM[\ZZ32\][m <- ms]` typed at the element, the varargs export, `matShape`'s `if` body typed `((), ())` (row 474), `view`'s arity. With decision D's diff (`reviews/decision-d-diff.md`; the model 21 lines out and 29 in), C4's own errors are 14: all 15 of decision D gone as such; 3 `DOT`s failing on the library api's dead sizes (decision E's E3), the `adam` bridge, `numbersOf`'s discarded count, the 5 powers and 4 small items. On diagnostic copies, not model changes, with C4's three top-level tuple bindings split (row 474) and the library api's 17 dead sizes removed (E3), a refused power ends its block's check, so `stepN` is checked only to its mask line and `adamN` to its update line. With the powers also written so that one declaration applies there are 7 errors: the two bridges, `adamN`'s vector-plus-scalar division, `numbersOf`'s count, the varargs `SUM` and export and `codePoint`. Two planted errors, one inside `rmsn_b` and one after `stepN`'s last statement, are both reported there, so the check reaches the step's end and the forward and backward passes check clean at their sizes. Walk runs C4's check program on the patched copy, 40 PASS of 40, every line the stock run's once timings are masked (`FORTRESS_THREADS=1`). The APL program's own errors, measured once on an earlier library, are of the same kinds, decision D's 15 of 35 the largest part, and none is a numeral, a mixed width or a missing coercion (`reviews/numerics-plan-fable.md` section 3.6). The counts are floors: the checker stops checking a block at its first failing statement, so of three independent failing calls it reports the first in a shared `do` block and all three in separate blocks, and an operator applied to a variable of a top-level tuple binding, the form of C4's hyperparameters, ends its block's check with no error (row 474; `reviews/decision-d-diff.md` section 6). What the numeral switch does to the programs is in "The numeral switch under walk waits for the checker's static types ..." below.

The trial's text, 465 characters, gave the counts as "C4 has 26 errors of its own, 15 of them decision D's unsized `Array[\RR64,ZZ32\]`; with decision D's diff it has 14." and stopped there. Its reader took the five powers for numeral work (Part 4, scenario 7).

New, 811 characters:

> - F-58 **MicroGPT's flat program, C4, has 26 errors of its own under the compiled checker, and none comes from a numeral's type.** 15 are arrays without sizes: `Array[\RR64,ZZ32\]` where the library wants `Vector`, `Matrix` or `Array3`. 5 are numeral powers such as `10.0^(-5)`, refused as ambiguous because two declarations of `^` each need the integer converted (row 533). 6 are small slips. With decision D's diff, which sizes the model's arrays, 14 remain: the 5 powers, 3 `DOT` calls that fail on the api's unused sizes (F-35), 1 bridge that passes arrays sized only at run time, and 5 small slips. Each count is a floor, since the checker stops a block at its first failing statement (row 474). The counts come from one measurement, on an earlier library. Detail: `reviews/array-design-ways.md` section 2.

- Kept, the 26 and the 14 by kind: question 6. Decision D (PLAN item 13, its fifth fork) asks what C4 still fails on after the diff, and of what kind.
- Kept, why the powers fail: question 2.
- Kept, that the counts come from one measurement: the rule for such a count. A reader measures again before a decision rests on them (row 533: "Not measured since batch 8's numeral library").
- Replaced, "the library api's dead sizes (decision E's E3)" by "the api's unused sizes (F-35)": questions 5 and 6. F-35 defines them.
- Cut, the 15 sites and the 6 small slips by name: question 4, the report's section 2.
- Cut, the diagnostic copies' 28, 18 and 7, the planted errors, and walk's 40 PASS of 40: question 4, the same section.
- Cut, the APL program's errors on an earlier library: question 1, since no decision reads them now. `reviews/numerics-plan-fable.md` section 3.6 holds them.
- Cut, what the numeral switch does to the programs: question 5, the entry that the old text names.
- Over the measure by 211 characters: the 14 by kind, which decision D reads.

#### F-53: a count that each landing changes

Old, 6,558 characters, of which the first 1,068 are quoted:

> - **The true distance to the switch-over is the gate's distance stage: 85 errors at the last landed gate, under the bound `Any`** (`perf-probes/prelude/switch-over-distance-flat.md`; the stage's tool, `coordinator/tools/distance/run.sh`). The stage runs the checker over twelve prelude apis and their twelve components in one JVM (`DistanceMulti.java`), the overloading memo off, under the gate's setting `any`: the bound `Any` with compiled-expression desugaring (POSITIONS, "The implicit bound of an unbounded type parameter is `Any`"). The gate does not measure walk's setting or the compile path's own `extends Object` setting. At the last landed gate the distance is 85 and the checker count 1 (`compile-ladder/climb-batch-13b/gate/distance.txt`, `checker-count.txt`, `summary.txt`). By kind the 85 are: exclusion 0, `comprises` 0, overloading 0, return type 2, abstract method not implemented 0, the `extends Object` bound 0, other well-formedness 8, component bodies' type errors 72, and export mismatches 3 (`distance.txt:3-11`); by root cause, the next entry. […]

[The other 5,490 characters: the two crash rows, with their mechanics and line references; how the count stage runs, and why its 1 is the refusal at `body(i)`; the 79 errors of `FortressLibrary`; that a zero count is not enough for the switch-over; how the stage compares with the last landed table, and where each batch keeps its tables; the per-site list's fixed path; the run's timings; the variation by 2 to 4 errors, its families and a plausible seat of it.]

New, 599 characters:

> - F-53 **At the last landed gate, the distance to the switch-over is 85 errors and the checker count is 1.** The distance counts the checker's errors in the interpreter's library, led by the self-typed `Integral` bodies and the sized arrays (F-54). The checker count stops at a component's first error, now the untyped parameter of `body(i)` in `__bigOperator`. Typing it raises the count toward the distance, which is no regression. An edit can move 2 to 4 errors that it does not touch (row 488), so a move that small does not show its effect. By kind: the last landed batch's `gate/distance.txt`.

- Kept, the two current values, what the distance counts, and the kinds that lead: the rule for a count that each landing changes.
- Kept, how to read a move: question 1. Without it, a reader takes the count's rise after `body(i)` is typed for a regression, and a move of 2 to 4 for a result.
- Cut, the 85 by kind (exclusion 0 to export mismatches 3): the same rule. The gate's `distance.txt` holds them. The commit stage rewrites only this entry's two values.
- Cut, the copies of 85 and 1 in F-54 and in the checker-count table's entry (`FACTS.md:66`): the same rule. Each gives F-53's number. F-54 keeps the kinds in words, without their counts.
- Cut, the stage's setting and its one JVM, the two crash rows' mechanics, and the count stage's mechanics: question 4, the rungs' reports and the stage's tool.
- Cut, that a zero count is not enough for the switch-over: question 4, `coordinator/library-route-judgement.md:33`, the phase's stop condition.
- Cut, the run's timings: question 4, the `#seconds` row of each gate's `distance.txt`.
- Cut, where the earlier batches keep their tables and per-site lists: question 3, the history.
- Cut, the families that vary and a plausible seat of the variation: question 4, row 488 and the rungs' reports.

#### P-48: a decision, with the curator's words condensed

Old, 2,709 characters:

> - **A type parameter the arguments do not fix takes its bound, never `Bottom` (the paper's instance rule).** From the POPL 2019 paper (Park, Hong, Steele and Ryu, "Polymorphic Symmetric Multiple Dispatch with Variance", `research/extracts/ParkPOPL2019-extract.md`; the authors could not prove the value's rule and replaced it, pp. 11:19, 11:25): such a parameter takes the intersection of its upper bounds, its declared bound (`Any` if none) under the constraint of the call's static return type; never `Bottom`, never the union of the arguments' types, never the value's type alone. "if I apply the rule that the ... later teams work supersedes the previous one, and you are saying the rule is coming from the paper and it helps us cleanly resolve something, then I will trust the team's work over whatever my misunderstanding of the things are." Which declaration runs stays the conversion rule above. MicroGPT's static types are concrete, so it is unaffected. Built in the specification: the dispatch paragraph and the inference chapter state the rule, with a callout that both implementations take the value's type where nothing fixes the parameter, walk by necessity (it has no static types) and the compiled path until phase 5 (FACTS, "The specification gives the run-time instance of a dispatched declaration by the POPL 2019 paper's rule ..."); the recheck's smaller sentences are in as defaults, listed for his review. Walk keeps row 157's fix as its best; the compiled path's departure is gated by one expected-failure pair where the two rules differ (row 538), beside the two for row 496's compiled crashes; the lone-parameter tests are plain tests of the bound, bounded and unbounded (`InferLoneBound`, `InferLoneUnbounded`, and `InferLoneBoundWalk`, `InferLoneUnboundedWalk` under walk; row 516, fixed). Built: the checker binds an inference variable with no lower bound to its bounds instead of `BOTTOM` (FACTS, "The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds, never `BottomType` ..."), and walk takes the bound too (row 424; FACTS, "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound ..."). Later: phase 5's dispatcher carrying the call's static return type (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2048`). The three `extends Object` bounds written on `builtinPrimitive`, `fail` and `List`'s nullary comprehension to reach `Bottom` under the old solver are gone, the library back to the team's unbounded declarations, since under the instance rule they refuse every call where `()` is expected (item 20): "Yes, put the library back to the team's own declaration".

New, 594 characters:

> - P-48 **A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.** Its instance is the intersection of its upper bounds, constrained by the call's static return type, never the arguments' union or the value's type alone. The rule is the team's later word (POPL 2019). He ranks the team's later work above his own reading. It sets the instance, not which declaration runs. MicroGPT's types are concrete, so it is untouched. The library keeps the team's unbounded declarations. Still to build: a compiled dispatcher that carries the static return type (PLAN phase 5).

- Condensed, his quote "if I apply the rule that the ... later teams work supersedes the previous one ...": "He ranks the team's later work above his own reading." The ranking is the decision, not his words, so the quote goes to the history under its date.
- Condensed, "Yes, put the library back to the team's own declaration": "The library keeps the team's unbounded declarations." This is the status quo, and question 1: a worker adds no `extends Object` bound.
- Kept, "It sets the instance, not which declaration runs": question 2. Without it, a reader takes the rule for a change of dispatch.
- Kept, "MicroGPT's types are concrete, so it is untouched": question 1. The coordinator weighs phase 5's dispatcher against the goal.
- Cut, the paper's authors and pages, and why the authors replaced the value's rule: question 5, F-166 and `research/extracts/ParkPOPL2019-extract.md`.
- Cut, what the specification, the checker and walk built, with their tests and rows: question 5. F-78, F-141 and F-175 give P-48's number, and the query on P-48 lists them. P-48 carries no list of them.
- Cut, the three `extends Object` bounds that are gone: question 3, the history.
- Cut, the recheck's smaller sentences, listed for his review: question 4, `reviews/decisions-review/popl-recheck.md`.
- Cut, the dispatcher's line, `OverloadSet.java:2048`: question 4, `reviews/array-judgements-popl-check.md`.

#### F-78: one home, and the detail left in the report

Old, 2,022 characters:

> - **The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds, never `BottomType`, and tries a call by subtyping without the expected type first** (`compile-ladder/rung-instance-bound/REPORT.md`). `Formula.solveToBounds` (`scala_src/typechecker/Formula.scala:536-642`) solves a call's static arguments. A variable with no named lower bound takes the meet of its upper bounds, the declared bound and the expected type, each taken at the solutions of the other variables it mentions where those are found; a bound that still mentions a variable, the variable itself among them, is left out (row 593). An empty meet has no solution, and an unconstrained variable takes `Any`. A lone parameter's union is promoted to its bound. An intersection argument is a whole lower bound (`scala_src/types/TypeAnalyzer.scala:142-143`; row 541). The order of the attempts at a call is in "The compiled checker infers a generic's static arguments with coercion ..." above. The compiled run time does not load an instance at an intersection, which the checker gives by three routes (row 559, with the expected failures `XXXCoverageReturnInferred` and `XXXInferBoundMeetsExpectedTrait`). Gated by `compiler_tests/InferResultOnly*`, `InferLoneUnbounded`, `InferUnion*Arg`, `InferLoneBoundThree`, `InferContextKeepsFit`, `ExpectedType*Choice`, `InferBigOperatorUnwritten`, `CoverageReturnInferred` and `InferBoundMeetsExpectedTrait` (compile and link), and the refusal `XXXInferLoneUnionClosedTrait`. The one library's result-only `fail` and `builtinPrimitive`, unbounded, are refused only where no expected type reaches the call, at an argument of another call (row 455). A `label` body takes the expected type of the whole `label` (row 642, `Library/String.fss:431`; "The compiled checker gives a call its expected type ..." below), and where `()` is expected their instance is `()` ("The one library's numbers, orderings, List and natives answer their declared types ..." below).

New, 483 characters:

> - F-78 **The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds, never `BottomType`, and tries a call by subtyping without the expected type first.** It builds P-48 and P-49. The run time has no class for an intersection type, so such an instance dies as it loads (row 559). Gated by `compiler_tests/InferResultOnly*` and `InferContextKeepsFit`. Detail: `compile-ladder/rung-instance-bound/REPORT.md` sections 1 and 7.

- Cut, the rule's inputs (the meet of the upper bounds, the declared bound and the expected type): question 5. P-48 holds the rule, and the entry names it.
- Cut, the order of the attempts, by a pointer to another entry's title: question 5. P-49 holds it, and the entry names it.
- Cut, `Formula.solveToBounds` with its lines, the empty meet, `Any` for a variable with no bound, the promotion of a union, and rows 593 and 541: question 4, the report's sections 1 and 7. A test gates row 541's fix, and row 559's note names it.
- Cut, ten tests and one refusal by name: question 4. A pattern names them, and the report lists them.
- Cut, `fail` and `builtinPrimitive` at another call's argument (row 455), and a `label` body (row 642): question 5. F-87 holds both.
- Kept, row 559 with what it does: question 1. A worker whose compiled call dies as its instance loads knows the cause, and a rung avoids an instance at an intersection.

#### F-94: the status quo, not the change, and the way around kept

Old, 3,463 characters, of which the first 1,988 are quoted:

> - **The compiled checker keeps a type parameter's bound list as it is when its overloading check reduces two declarations. A bound list that names a trait with a `comprises` clause no longer crashes it, and a memo on the trait table checks the one library's array family under `T extends { Number, MultiplicativeRing[\T\] }` within the count stage's limit. Calls through such a bound are still refused or crash** (`compile-ladder/rung-array-bound/REPORT.md`, `compile-ladder/rung-array-bound/SKEPTIC.md`, `perf-probes/checker-speed/REPORT.md`, `perf-probes/checker-speed/SKEPTIC.md`; rows 684 and 688 fixed; rows 686, 687, 689 and 690 open). `TypeSchemaAnalyzer.boundsSubstitution` (`scala_src/types/TypeSchemaAnalyzer.scala:472-497`) keeps each image variable's bounds as a list, without `Any` and duplicates, and never meets them into one type: the meet of `{ K, R[\T\] }`, with `K comprises { A, B, C }` and `C` outside `R`, is a union, which a bound list cannot hold. It proves the variable below each bound in turn, and a bound that the variable was given needs no proof. A call whose argument's type carries the caller's own two-bound parameter, as `Box[\T\]`, is refused, 'not applicable' (row 686, `XXXInferCallerTwoBoundsClosedTrait`). A call whose argument is that parameter itself crashes in `Formula.slv` (row 689, `XXXCallerParamTwoBoundsClosedTrait`), and so does a call that converts a numeral beside such a parameter (row 687, `XXXCoerceTwoBoundsClosedTrait`). Writing the static argument works around all three. The overloading check refuses a generic declaration so bounded beside a declaration on the closed trait with the same return type, a valid overloading, with a false Return Type Rule error (row 690, `XXXReturnRuleTwoBoundsClosedTrait`). Each of these four tests pins its row's defect. In the one library the norm's call `squaredNorm(me)` is refused so, a site of the distance (`Library/FortressLibrary.fss:2490`); no library call or pair meets the other three. […]

[The other 1,475 characters: why the checker was slow over that bound (each memo key carries the whole cycle history, each analyzer starts with empty memos, and the normalization expands `Number`'s `comprises` clause); the trait table's memo, with its lines and its switch; the 17 minutes without it; the stages' times at the last landed gate; and the three tests that gate it.]

New, 599 characters:

> - F-94 **The compiled checker checks the array family under the bound `T extends { Number, MultiplicativeRing[\T\] }`, but fails calls through a parameter so bounded.** It refuses a call whose argument's type holds the caller's parameter (row 686), as at the library's `squaredNorm(me)`. It crashes on a call whose argument is the parameter, or that converts a numeral beside it (rows 689, 687). Writing the static argument avoids all three. It refuses a valid overloading beside such a declaration (row 690). Gated by `OverloadTwoBoundsClosed*`. Detail: `compile-ladder/rung-array-bound/REPORT.md`.

- Cut, "no longer crashes it" in the title: question 3, the history. The new title states what the checker does now.
- Kept, "Writing the static argument avoids all three": question 1. A worker who meets the refusal or the crash writes it.
- Kept, the library's `squaredNorm(me)`: question 1. It is the one site in the library, and it is on the distance.
- Cut, `boundsSubstitution`'s mechanics and its lines: question 4, the rung's report.
- Cut, the test of each row: question 5. Each row names its test.
- Cut, why the checker was slow, the memo, its switch and the 17 minutes: question 4, `perf-probes/checker-speed/REPORT.md`.
- Cut, the stages' times at the last landed gate: the rule for a count that each landing changes. The gate's files hold them.

### What FACTS and POSITIONS hold

1. FACTS and POSITIONS hold the project only: the language, the library, the tree, and his decisions about the project. (his words, 09:16: "positions and facts I believe should relate to the project only.")
2. Rules about how the coordinator and the curator work together belong in this skill, not in POSITIONS. Until the skill holds them, they go to the held list and the boot note, never to POSITIONS. This part adds none to POSITIONS. (his words, 09:16: "every other thing about working between us needs to go to the coordinator skill"; the held list and the boot note as the skill's scratch are on record, `coordinator/HELD.md`, 09:16)
3. FACTS and POSITIONS stay, since briefs to workers point into them. (his words)
4. What that moves, for his decision and not done here (new): POSITIONS' section "How he wants to be spoken to" (6 entries, 4.7K) and the entries of "How we work" (35 entries, 44K) that govern the coordinator and him, "The record's form: an optimized build and a debug build." among them, move to this skill, their text to the history. Sorting "How we work" into those and the workers' method is a pass of its own. FACTS' section "The container" (27 entries, 28K) holds facts about the platform, not the project; their homes would be the `cloud-container` and `coordinator` skills. FACTS 201 of the trial is one of them: `.claude/skills/coordinator/references/agents.md` already holds its procedure.

### Each entry's number

Part of the entry's form at his yes of 2026-10-13, 11:05 UTC, and his comment of 11:41.

5. Each FACTS and POSITIONS entry carries a permanent number at its start, `F-87` or `P-48`. A number is never reused or changed; a merged or removed entry's number stays in the history. (his words, 11:41: "records here were kept because we needed the stable identifier to be able to refer to them. So by introducing the numbering system, we regain that part and we are free to rewrite the titles and contents freely."; the ledger's model, on record: "Rows are never renumbered, and reports cite them by number", FACTS, "The ledger's rows stand in fifteen topic sections ...")
6. The history files keep each earlier text under its number, as `explorations/fortress-gap-ledger-history.md` keeps a row under `### Row N`. The 903 texts already in `FACTS-history.md`, in 81 dated sections, stay under their dates; numbers start with the next consolidation. (new)
7. A pointer is the target's number in the sentence that needs it: `It builds P-48.` The sentence says what the link means, and any words beside the number are the writer's. The number is the key, and to the curator an entry is still named by its title. So a title and a text are rewritten freely, and a retitled entry needs no pointer updated. (his words, 11:41, in item 5; the pointer's form is the reviewed record store design, `record-store-review.md` section 3 and decision 4, at its default)
8. `facts-extract.sh` resolves a number, prints an entry's history in order, and lists every entry that points to it. Today it resolves titles only, has no query for `FACTS-history.md`, and lists no back-links. (new)
9. A check that every pointer resolves to exactly one entry runs with the pass's other checks (item 49). (new)
10. Cost: numbering the entries is one script, with no model; the tool's change is an Opus worker's, about 0.3M to 0.5M, an estimate. (new)

### What a FACTS entry holds

11. A FACTS entry states the current status quo and what it means for the work. How it came about is the history's. (his words, 09:02: "my optimized build is about capturing the current status quo"; that the consequence stays with the fact is his comment of 15:38, which rejected a fact split from its consequence, and his message of 16:16: "when we are recording some facts that have some known consequences from the record, maybe like that should be part of ... the write-up")
12. After its number, its bold title states the fact as it is now. (on record) A title that no longer holds is rewritten to state the present (on record, `coordinator/README.md:69-73`), freely, since the number is the key (item 7). (his words, 11:41) This replaces "keeping the opening words that keys quote".
13. A sentence stays in the entry if, without it, the reader would act otherwise: question 1 of "What an entry is". Questions 3 to 5 send the rest to its home. (new: the coordinator's proposal of 2026-10-12, from his lens "are those all actionable things?", written as questions with examples at his comment of 15:34, which asked for "some kind of questions or examples")
14. A sentence also stays if, without it, a claim of the entry would be misread: question 2. (new, from the test: FACTS 58's "none of their errors is a numeral" reads right only with row 533, since the five numeral powers are an ambiguous coercion between two `^` declarations, not a numeral's type)
15. The entry keeps the one number a decision rests on now. Where the number's parts belong to different rows or lead to different decisions, it keeps the parts with their rows, not only the total. Each number says what it counts and of what kind: question 6. A count that each landing changes has one entry, whose value the commit stage rewrites; other entries give its number, and the counts by kind stay in the gate's file. A count from one measurement says so. (new; the parts from the test: the trial's FACTS 58 kept "14" and lost what the 14 are; his comment of 15:46: "what kind of errors? That's the main part", and a count that changes at every landing as "a single fact with, with current values but not like per experiment")
16. It names the test that gates it: one test, or a name pattern, not a list. (new)
17. It points to the report and the section that hold the rest. (on record that it points to the report; new that it names the section)
18. Out of the entry go line references, lists of sites, measurement narratives, timings, counts no decision rests on, and every account of how the fact was found. They stay in the report, or go to the history. (new; "the narrative of how a landed rung established a fact is history" is on record)
19. A file and line go in an entry only where no report holds the fact. (new)
20. It is a few lines (on record): about 600 characters. (new) The number comes from the goal. About 240 entries stay after the moves to the skills (`coordinator-skill-outline.md`, section 3.1), and about 145K characters for both files allows about 600 each. With every staying entry cut to at most 600 characters and the shorter ones unchanged, the two files would come to about 131K; at most 700, about 148K; at most 1,000, about 191K. So 1,000, which he asked about at 15:38, would miss the goal. (new: measured on the files at `0f1d0d2ed`, with the staying entries of the outline's section 2.7) The measure is a check, not a cap. An entry over it names, in the report of the pass that wrote it, the decision or the misreading that needs the extra, and shorter entries of its chunk pay for it: a chunk's total stays under 600 characters times its entries. FACTS 58 is 707 characters in Part 3 and 811 in its worked example, for decision D. (new; his comment of 15:38: "it needs to have a reason to be that large, because we want that compressed benefits") The boot still reads the whole record, as he set on 2026-09-27. (on record, `coordinator/postmortem-2026-09-27-record-keeping.md:15`) The measure is there because long entries cost decisions too: in the test, the old reader missed row 680 inside the 6.6K distance entry, and two long texts carried a false sentence each, POSITIONS 48 on row 516 and FACTS 141 on row 590, both corrected on `main` since (`8583d31d7`, `c836b1f2d`). (new, from the test)
21. An entry points wherever its detail lives: a report, a review, a ledger row, or a part of a skill that is that procedure's home. (new; this answers question 2 of `facts-consolidation-check.md`; in the test, FACTS 201's pointer into this skill was followed in scenario 6)
22. A fact another entry holds is cited by that entry's number, not restated. (on record: one home per thing; his words, 10:23, in item 27)

### What a POSITIONS entry holds

23. A POSITIONS entry says what he decided about the project, and why, in one or two sentences, and what the decision means for the work, after its number and under a bold title that is its handle. (on record: "what we do and why, under a bold title"; the length and the consequence are new, as in "What an entry is")
24. It carries no date. The date, and how the decision was reached, are in the history. (on record: `coordinator/README.md:40-45` and `coordinator/POSITIONS.md:1`, "no dates")
25. His words appear only where they are the position. Elsewhere the entry says what he said in a more concise and precise form, and his quotes go to the history at their dates. (on record: "only where they are the position", and "his quotes at their dates" in the history; his words, 09:05: "I don't think it is the essential part of recording my words verbatim in positions. If you can rephrase it in, in a more concise and precise form." and "It is something that needs to be refined into nuggets.")
26. The shorter form keeps the part of his rule that cuts. The coordinator checks it against his words before it writes the entry. (his words, 09:05: "The trick is to catch when you do the lossy compression."; the check is new)
27. What was built is FACTS' to say. A FACTS entry names the decision it builds, by number. A POSITIONS entry does not list the FACTS entries that build it: the query on its number finds them. Neither restates the other. (his words, 10:23: "this we need to keep one home and just pointers to the other citations by by record pointing not by restating the same things that is in fact from the other side in positions"; the FACTS direction is new, from Part 3b and scenarios 9 and 10; no list in POSITIONS is the record store's design, `record-store-design.md` section 3.1, point 3, kept by its review, `record-store-review.md` section 3, which answers the first question of Part 3b and stands at its default by his word of 2026-10-13 that the design stands as he skimmed it, in the boot note)
28. The argument stays in the review the entry cites. (new)
29. A decision not yet built names what remains and the PLAN item that builds it. (new)
30. The same measure applies: under about 600 characters, as a check. (new)
31. A proposal of the coordinator's stays marked as its own, in the note that holds it, until he says yes. It enters POSITIONS only at his yes. (new, from how this draft came about)
32. A decision enters POSITIONS in the next commit after he states it, written by the coordinator. (on record)

### The three stages, and who reads which

33. The optimized build, FACTS and POSITIONS, is the current state. The coordinator reads it whole at every boot, and a worker gets its slice in the brief. (on record)
34. A brief quotes the entries it hands over word for word, under their numbers, and a rule he set with its measure and its example. It never restates them. (new, from how this draft came about: each restatement so far lost the part that cuts; the brief of FACTS's first pass cut the history and kept the detail, and his goal of entries in a few lines was not met, `coordinator/process-engineering/coordinator-rewrite-plan.md`, step 1)
35. The history is read when a fact's or a decision's provenance is in question: how it stood before, what it replaced, where it came from. (his words, 09:02: "when it needs to question the provenance, it uses the historical record"; on record in the history files' headers)
36. The report is read when the detail is needed: the line, the site, the figure, the argument. It is the final instance. (his words, 09:02: "can look up the full report when needed"; "the final full report is the ... final ... instance")
37. The coordinator does not open the history or a report itself. Looking up a fact's history or a report's passage is retrieval: it sends a Sonnet scout, as for archaeology, which returns what it found. (on record that it sends a worker; his words, 11:33, as a question: "This sounds like something that a scout or worker on sonic model sonnet would be able to handle similar to archaeology I guess?", "sonic model sonnet" being speech-to-text for "Sonnet model")
38. How a worker reads the stages is the `fortress-repo` skill's to say (his words, 11:40: "The usage by workers must stay there"): a worker takes an entry in its brief as given, opens the cited report section when its work needs the detail, and opens the history only when the tree disagrees with the entry. (new; the path through the report is on record only as a finding, `measures-judgement.md:142`)

### Who writes the record

39. The entry's form is defined only here. This skill holds the editing of FACTS and POSITIONS and the extracting from workers' reports. The `fortress-repo` skill holds how workers read and use the record, and how they edit it when a brief asks them to. (his words, 09:16: "the structure defined only in the coordinator's skill"; 11:40: "We are not moving everything to coordinator skill, only the editing and extracting from workers' reports goes in here. The usage by workers must stay there and also the local edits when we ask them must be described there as well.")
40. A worker writes its full account in its report: the lines, the sites, the figures, and how it found them. (on record: the report holds the detail)
41. A worker edits FACTS or POSITIONS only where its brief asks it to, and then as `fortress-repo` says. (on record, `fortress-repo`'s `records.md:73-75`; his words, 11:40, in item 39) The rungs of a batch and agents working side by side do not edit the shared records: they write the lines in their reports, or in `record.md` in a batch, and the gather or the coordinator folds them in. (on record, `.claude/skills/coordinator/references/roles-and-records.md:39` and `coordinator/climb-batch-workflow.md:99`)
42. A worker that does not edit FACTS hands over, in a section of its report: each fact as it stands now, in a sentence; what it means for the work; the one number a decision rests on, with what it counts and its parts where item 15 keeps them; the test that gates it; and the section of its report that holds the detail. `fortress-repo` gives workers this list. (new)
43. The coordinator writes each entry to this form. When a worker finishes, it consolidates what the worker wrote, in FACTS or in its hand-over: it rewrites it to the form, moves the provenance to the history, and leaves the detail in the report. (his words, 11:40: "It's the coordinator's job to consolidate such records when, when worker finishes, for example."; 09:16: "it is the coordinator's job to then rewrite such a record to match the structure defined only in the coordinator's skill")
44. The pass runs when a worker finishes, and before the next boot or batch reads FACTS. (his words: "there should be some post processing. Pass by the coordinator", and 11:40; that it runs before each batch is on record) In a batch, the commit stage runs it for the coordinator, with this part quoted in its prompt. After a lone worker, the coordinator runs it. (new)
45. A fact enters FACTS in the commit that establishes it where the worker's brief lets it write FACTS, and otherwise at the pass that follows. Either way, the pass writes it to the form. (on record, `fortress-repo`'s `records.md:73`, for the first; new for the second)

### The pass

46. The pass moves what the worker wrote, verbatim, to `FACTS-history.md`, under the entry's number, with the date and where it came from: the rung, the report, the commit. (new: today the history gets only an earlier text)
47. It writes each fact as a new entry, with a new number, or rewrites in place the entry the fact changes, instead of adding a second. (on record for the rewrite in place)
48. It checks with one bounded `grep` that the cited report section holds each kind of thing it left out. (new)
49. It checks that every pointer resolves to exactly one entry, with `facts-extract.sh --check`. (on record as practice, for keys that quote a title; new for numbers)
50. It reports each entry's size, each chunk's total against 600 characters times its entries, and each entry still over the measure with the decision or the misreading that needs it. (new)
51. `check-verbatim.py` still runs, since it is cheap. It shows that the history holds the old text. It is not the pass's goal. (on record that it runs; new that it is not the goal)
52. The same pass runs on POSITIONS at each landing and whenever he replaces a decision. (on record)

How this part itself is checked, beside the checks of each pass: a change to the part is tried on a slice, tested blind with the kit (`record-test/`), each missing fact restored and its scenario re-run, and only then applied widely. Next is the cold read: a fresh worker given only this part consolidates a slice of mid-size entries (1K to 2K characters), and the kit's quiz checks it. The test of Part 4 cost 2.49M written, against an estimate of 1.6M. (new, the method of Parts 3 and 4; his words, 10:14, for what the test checks: "we want to see whether this compression keeps enough information for most decisions and that you would know to follow the breadcrumbs to the source original source when needed")

### What `fortress-repo`'s `references/records.md` would need to change

A list for the skill writer. No skill is edited by this draft. By his comment of 11:40, `records.md` stays the workers' home for reading and using the record, and for editing it when a brief asks them to. Only what states the entry's form leaves it (item 39).

- `:35`, "POSITIONS and FACTS describe the present: no dates, no names of who found what, no "corrected" or "superseded" notes.": keep it, and add the stages for a reader (item 38): "Open the report section an entry cites when your work needs the detail, and the history file only when the tree disagrees with an entry."
- `:37`, "A FACTS entry is the fact, its source and its test in a few lines, under a bold title. It points to the report that holds the detail.": keep it as what a reader needs to know, without "in a few lines", which is the form (item 20): "A FACTS entry is the fact as it stands now, what it means for the work, and the test that gates it, under its number and a bold title. It points to the report section that holds the detail." Its "Cite it by its bold title, or by its opening words if it has no title." becomes "Cite it by its number and its title." (item 7)
- `:73`, "Add a fact to FACTS in the commit that establishes it, as a new entry in the section of its topic. Its source and its test can be the code at file:line, a gated test, or a command and its output. If your brief does not let you write FACTS, put the entry in your report as finished prose.": keep its first sentence, as the edit a brief asks for (items 41 and 45). Replace the second, which pulls a line reference into the entry (Part 1.1, item 6): "Put the lines, the sites and the figures in your report, and point the entry to its section. The coordinator rewrites the entry to the record's form when your work finishes." Replace the third with the hand-over of item 42: "If your brief does not let you write FACTS, hand over in a section of your report: each fact as it stands now, in a sentence; what it means for the work; the one number a decision rests on, with what it counts and its parts where they belong to different rows; the test that gates it; and the section of your report that holds the detail."
- `:74`, "Rewrite a wrong line of FACTS in place.": keep it, for a brief that lets the worker write FACTS, and add: "Otherwise say in your hand-over that the entry is wrong, with the evidence."
- `:75`, "POSITIONS holds the curator's decisions, in the curator's words, written once. Everything else points there. Write a decision there only if your brief gives it to you to record.": drop "in the curator's words", which states the form and contradicts item 25 (contradiction 3 of Part 1.6). Keep the rest, and "If you have evidence against one, do as `exploring.md` says."
- `:11-18`, "Put each of these that you have in your report": add an item, "**For FACTS.** Each fact your work established, as the hand-over of `:73`, unless your brief let you write it to FACTS; or "none"."
- "Reading the record", `:51-67`: once the entries are numbered, add the queries of item 8: a number, an entry's history, and the entries that point to one.
- The same skill's `SKILL.md:137`, "Each fact has its source and its test.", would read "Each fact names its test and points to the report that holds its detail."

### Where the structure is stated today, and what each place becomes

Not every place that states the structure becomes a pointer to this part (his words, 11:40, in item 39). Places that tell the coordinator how an entry is written or kept point here. Places that tell workers how to read, use or edit the record stay, with the changes above.

These point here:

- `coordinator/README.md:38-73`, "How they are kept", becomes one line: "How the records are kept: the `coordinator` skill, `references/roles-and-records.md`." This removes the pulls at `:46-50` ("at full informational fidelity") and `:64-66` ("Nothing a resumed coordinator needs is lost"), and contradictions 1 and 2 of Part 1.
- `coordinator/README.md:19-20`: "The boot read is the current state whole, by Pavol's word: a resumed coordinator knows the project without him, the provenance and the detail one query away."
- `coordinator/FACTS.md:1` and `coordinator/POSITIONS.md:1`: each header comment keeps one sentence of what the file holds, the project only, and points to this part. This removes "the numbers that describe the tree" and "a decision not yet built keeps the detail the coming work needs".
- `coordinator/POSITIONS.md:130`, "The record's form: an optimized build and a debug build.": not edited; it moves to this part, by item 2, and its text to the history.
- `protocol.md:151-159`, principle 6: it keeps "The record describes the present, each thing written once, so that a resumed coordinator knows the project without him." The rest becomes "Its structure is the `coordinator` skill's record-keeping part."
- `.claude/skills/coordinator/references/roles-and-records.md:26-41`: replaced by this part. Its `:30` ("losing nothing") and `:34` (the title rule of contradiction 1) go with it; its `:39`, on agents side by side, is item 41.
- `.claude/skills/coordinator/references/boot.md:22`: replace "the price of full context, paid once per boot" with "kept small by the record-keeping part".
- `coordinator/process-engineering/facts-consolidation-check.md:171`, `:174` and `:175`, advice for the POSITIONS consolidation: "Keep every quoted sentence of his verbatim" becomes "Keep his words only where they are the position"; the sentence on pointers goes once item 21 is approved; "over 3,000 characters" becomes "over 600 characters".
- The dated notes keep their text and get one line in their header comment, "Its rule for an entry's length is replaced by the record-keeping part of the `coordinator` skill.": `coordinator/record-keeping-proposal.md` (1.1 items 9 and 10, and its § 0), `coordinator/postmortem-2026-09-27-record-keeping.md` (1.1 and 1.5 item 8), `coordinator/process-engineering/coordinator-shape.md` (1.1 item 11), `coordinator/postmortem-2026-09-29/consolidation-review.md` (1.3 item 9).
- `.claude/skills/coordinator/references/sources.md:59` and `:66-68`, which cite the FACTS entry "A restart of the session's own process ..." as the source of the skill's resume rules: cite `FACTS-history.md` for that entry's earlier text once the trial's text is applied.

These stay, with changes:

- `fortress-repo`'s `references/records.md` and `SKILL.md:137`: the list above.
- `coordinator/climb-batch-workflow.md:97`, `:99` and `:160`: the rung's `record.md` and the gather's fold into FACTS are edits the batch's prompts ask for, and they stay (item 41). The prompts `coordinator/climb-batch-workflow.js:791` and `:1182`, which state the entry's form ("the fact, its source and its test in a few lines"), quote the hand-over of item 42 instead (item 34). `coordinator/climb-batch-workflow.md:274` becomes "The pass of the `coordinator` skill's record-keeping part: each entry the gather folded in written to its form, the worker's text moved to `FACTS-history.md`." `:249`, the landed figures written into two entries, numbers only, becomes one entry: "The true distance to the switch-over", which holds both counts; the checker-count table's entry gives its number (item 15).

Points 14 and 15 of Part 5 are not record-keeping: they belong to other parts of the `coordinator` skill, and are held on `explorations/coordinator/HELD.md` until the skill holds them.

## Part 3: the trial

Each entry below gives the new text, its size against the old in characters, and each kind of thing cut with where it lives now. A home is checked with one bounded `grep`, quoted as `file:line` with the words it matched. "The history file" means the provenance goes there at the pass. The entry's whole old text also goes to the history file verbatim, as item 46 of Part 2 says.

The keys that quote each title were checked on a copy of the record with the ten new texts in place: `facts-extract.sh --root COPY --check` resolves each key to the same line as on the live record. The ten entries' slice falls from 38.6K bytes, about 16K tokens, to 7.7K bytes, about 3.3K tokens. FACTS 58's restored sentence adds 242 bytes, so the slice is about 7.9K bytes, about 3.4K tokens.

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

The title drops "no longer crashes it", a mark of change that question 3 of `facts-consolidation-check.md` asks about; items 11 and 12 of Part 2 retitle it.

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

New text, 707 characters against 3,200 (22 %):

- **MicroGPT's own programs through the compiled checker against the one library: none of their errors is a numeral, the model's unsized array types are the largest part, and every count is a floor.** C4 has 26 errors of its own, 15 of them decision D's unsized `Array[\RR64,ZZ32\]`. With decision D's diff it has 14: three `DOT`s on the api's dead sizes (E3), five numeral powers refused as an ambiguous coercion between `RR64`'s `^` and `MultiplicativeRing`'s (row 533; walk takes them), and six others, the `adam` bridge and `numbersOf`'s count among them. The counts are floors because the checker stops a block at its first failing statement (row 474). Detail: `reviews/array-design-ways.md` section 2.

This is the text the coordinator restored after the test (Part 4). The trial's text, 465 characters, cut the 14's parts and row 533. The reader given it called the five powers "the numeral work", the test's one loss. One sentence puts the parts back, and the entry is 107 characters over the measure. The decision that needs them is decision D: what C4 still fails on after D1, and whether it is the numerals or the arrays.

Cut, and where it lives:

- The diagnostic copies' 28, 18, 14 and 7, and the base and date of the measurement: `reviews/array-design-ways.md:13`, "The diagnostic copies: 28 and 18 with the tuple bindings split"; `:31`, "The tree: `main` at `6bc21c364`".
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

- The ten: 36,317 characters before, 5,878 after, 16.2 %. The eight FACTS entries: 31,408 to 4,710, 15.0 %. The two POSITIONS entries: 4,909 to 1,168, 23.8 %. Before FACTS 58 was restored, the ten came to 5,636 (15.5 %) and the eight FACTS entries to 4,468 (14.2 %).
- The median of the ten: 3,352 before, 583 after. The longest: 6,558 before (FACTS 53), 707 after (FACTS 58).
- One entry of the ten stays over the measure, FACTS 58, with the decision that needs it (above). The titles are the hard part: FACTS 145's title alone is 305 characters and FACTS 87's 273, because each title lists several behaviours. A rule that a title states one fact would split such an entry; the trial did not.
- FACTS is 257,739 characters in 195 entries, median 1,149; 161 entries are over 600. At the trial's ratio of 15.0 % it would come to about 39K. With every entry over 600 brought to 600 and the rest unchanged, it would come to about 113K, median 600 or less.
- POSITIONS is 102,815 characters in 113 entries, median 726; 64 entries are over 600. At the trial's ratio of 23.8 % it would come to about 24K. With every entry over 600 brought to 600, about 60K.

### Decisions taken in the trial

- **Where a procedure lives.** FACTS 201 now points into the `coordinator` skill's `references/agents.md`, which already holds the resume procedure. The alternative was to keep the procedure in FACTS, as the skill's `sources.md` cites it there. This is question 2 of `facts-consolidation-check.md`, still open; item 21 of Part 2 answers it, pending his yes. Under item 1 the entry may leave FACTS altogether, as a fact about the platform (item 4).
- **A separate fact dropped from an entry.** FACTS 87's sentence that a `spawn` is refused in an `atomic` body is a different fact from the entry's. It is cut to the skeptic's report and its test. The alternative was a new entry of its own; no decision of the coordinator or a worker was found to rest on it.
- **Titles rewritten.** FACTS 87, 94 and 166 have new titles that keep the opening words every key quotes. POSITIONS 60 keeps its title whole, provenance and all, because 22 keys quote it whole. With numbered entries (Part 2, items 5 to 10) a title need not keep them.
- **Tests named by pattern.** FACTS 55, 87 and 94 name their tests by a pattern (`InferCoercion*`, `InferResultOnly*`, `OverloadTwoBoundsClosed*`). Some of the patterns also match tests of neighbouring entries. FACTS 145 names two tests and a pattern, since it joins four checks.

## Part 3b: one home for what FACTS and POSITIONS both tell

Four FACTS entries restated what POSITIONS 48 and 60 decide. A worker rewrote them to the rule, in copy q of the test only (Part 4). Each now names the decision it builds by its POSITIONS title, instead of restating it. POSITIONS 48 and 60 got a "Built:" pointer to them, which puts back the route to the built state that the trial's texts had cut. Sizes are characters of the entry's line, as Part 3 counts them. For POSITIONS 48 and 60, "before" is the trial's text.

### FACTS 78, "The compiled checker instantiates a type parameter that nothing at a call fixes ..."

New text, 562 characters against 2,022 (28 %):

- **The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds, never `BottomType`, and tries a call by subtyping without the expected type first.** It builds POSITIONS, "A type parameter the arguments do not fix takes its bound ..." and "The order of the checker's attempts at a call". The run time cannot yet load an instance at an intersection (row 559). Gated by `compiler_tests/InferResultOnly*` and `InferContextKeepsFit`. Detail: `compile-ladder/rung-instance-bound/REPORT.md` sections 1 and 7.

It names two decisions. Its title's second clause is the built state of POSITIONS, "The order of the checker's attempts at a call".

### FACTS 141, "Under `walk`, a type parameter that nothing at a call fixes ..."

New text, 581 characters against 2,397 (24 %):

- **Under `walk`, a type parameter that nothing at a call fixes takes its declared bound, and a lone one with no narrowest candidate its bound.** It builds POSITIONS, "A type parameter the arguments do not fix takes its bound ...". An F-bounded one stays open ("Under `walk`, a type parameter whose bound mentions itself ..." below), and a big operator's plain-bounded ones keep `BottomType` (decision D2). Its other departures are decisions D3 and D5 and rows 587, 589, 591 and 612. Gated by `tests/Infer*Walk.fss`. Detail: `compile-ladder/rung-walk-instance/REPORT.md` section 2.

The old text said that the one library declares `MatchFailure` checked (row 590). That was false, and the rewrite drops it. `main` has corrected it since (`c836b1f2d`).

### FACTS 175, "The specification gives the run-time instance of a dispatched declaration ..."

New text, 600 characters against 1,566 (38 %):

- **The specification gives the run-time instance of a dispatched declaration by the POPL 2019 paper's rule, and reads a `comprises` clause at the level of values in every passage.** It builds POSITIONS, "A type parameter the arguments do not fix takes its bound ..." and "The `comprises` passages read at the level of values ...". Its callout: both paths take the value's type where it does not fix the parameter (row 538, gated by `XXXGenericInstanceUnfixed`); Appendix I names rows 487, 496, 540, 543, 546 and 547. Detail: `compile-ladder/rung-spec-overloading/decision-record.md` sections 5 to 9.

The title drops ", a lone type parameter with no narrowest candidate its bound". FACTS "The specification's type-inference chapter states the rule the compiled checker builds" holds it in full, and no citation outside the history files quotes that clause. One nuance now lives only in the decision record's section 5: the specification keeps the statically selected declaration at its inferred instance, while the paper solves every call.

### FACTS 76, "The compiled checker accepts the Meet Rule's `comprises` example ..."

New text, 592 characters against 1,916 (31 %):

- **The compiled checker accepts the Meet Rule's `comprises` example by a coverage check local to overload checking, and types a call whose argument's static type sits between two closed traits by the intersection of its candidates' return types.** It builds POSITIONS, "The `comprises` passages read at the level of values ...". Open: a family with static parameters (rows 543 and 546), and rows 487, 540, 547 and 559. Gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 3 and 4; its `REPORT.md` section 7.

It names rows 543 and 546 for a family with static parameters, where the old text named only 543, and drops the sentence that the check accepts no pair of the one library. The rung's `REPORT.md` section 7, which it points to, holds that sentence.

### POSITIONS 48, "A type parameter the arguments do not fix takes its bound ..."

New text, 857 characters against the trial's 580. Nothing is cut. The 277 characters of "Built:" are added, so the entry is 257 over the measure.

- **A type parameter the arguments do not fix takes its bound, never `Bottom` (the paper's instance rule).** It takes the intersection of its upper bounds under the constraint of the call's static return type: never `Bottom`, the union of the arguments' types or the value's type alone. Why: it is the type group's later word (POPL 2019), and he trusts the team's later work over his own reading. Which declaration runs is unchanged, and microGPT is unaffected. The library keeps the team's unbounded declarations. Built: FACTS, "The compiled checker instantiates a type parameter that nothing at a call fixes ...", "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound ..." and "The specification gives the run-time instance of a dispatched declaration ...". Left for phase 5: the dispatcher carrying the static return type.

### POSITIONS 60, "The `comprises` passages read at the level of values ..."

New text, 850 characters against the trial's 588. Nothing is cut. The 262 characters of "Built:" are added, so the entry is 250 over the measure. The pointer names FACTS 27, walk's half of the decision, beside FACTS 175 and 76; without it the entry would be 758.

- **The `comprises` passages read at the level of values (PLAN item 26, row 491).** The specification reads a `comprises` clause at the level of values, "covers" is defined once, and the Meet Rule has the closed-trait case; a call between candidates is typed by the intersection of their return types, with run-time uniqueness in place of static. Why: the proof addendum shows it sound for ground declarations, its coverage search kept local to overload checking. A generic declaration that needs a run-time instance is outside it. Proof: `reviews/comprises-type-level-proof-addendum.md`. Built: FACTS, "The specification gives the run-time instance of a dispatched declaration ...", "The compiled checker accepts the Meet Rule's `comprises` example ..." and "Walk's load check reads a generic declaration beside a plain one on declared domains ...".

### The totals and the checks

- The four FACTS entries: 7,901 characters to 2,335, 29.6 %. The six entries: 9,069 to 4,042, 44.6 %.
- Each cut item was found in its home by one bounded `grep`, 53 of 53. A separate fact whose home is another entry is cut without a pointer, as the trial cut FACTS 87's `spawn` sentence: the facts of FACTS 84, 87 and 142, and row 593's refinement.
- `facts-extract.sh --check` resolves the 16 keys that quote the six titles to the same lines before and after. `check-verbatim.py HEAD` exits 0 on both files.
- Two decisions not taken, which are the curator's:
  - Should a POSITIONS entry carry a "Built: FACTS, ..." pointer of about 260 characters, or leave the reverse link to the FACTS entries that name it? With the pointer, both entries are about 250 over the measure, and no decision needs the extra. Without it, POSITIONS has no route to the tree's state, which was the gap in the trial's texts. Answered since by the record store's design at its default: no list in POSITIONS, and the query on a number finds the entries that point to it (Part 2, item 27).
  - Should FACTS 173, the specification's inference chapter, join POSITIONS 48's pointer? FACTS 27 joined 60's.

## Part 4: the test

Blind, the new entries scored the same as the old: 27 points of 30 each. The two differed in three scenarios. The new entries lost one, scenario 7, because the trial's FACTS 58 had cut the fact that the answer needed. The old entries lost two, each with the fact in hand. One restored sentence repaired FACTS 58, and a re-run of scenario 7 then scored full marks.

### How it ran

- Fable wrote ten scenarios over the trial's entries, from their old texts. Each puts the reader in a worker's or the coordinator's role, quotes the entries that a brief would hand over, and sets a task. Fable also wrote a key with a rubric: decision 0 to 2, sources 0 to 1. Scenarios 9 and 10 test the pairs of Part 3b.
- Two worktrees of `main` at `0f54a698b`. Copy p kept the old entries. Copy q got the new texts of Parts 3 and 3b, with the old texts moved to the history files. Both had this report, the boot notes and the report's INDEX line removed.
- `fill.py` filled each copy's scenarios with that copy's entry texts. One fresh Opus reader in each copy answered blind: no other commit, no transcripts, nothing outside its copy.
- A Fable grader scored the two answer files against the key, blind to the copy, and checked against the tree every claim beyond the key.
- The kit, to run it again: `record-test/README.md`, beside this report.

### The results, by scenario

Decision and sources, the new entries first:

1. Repairing row 665 (FACTS 145): the new entries 2 and 1; the old entries 2 and 1.
2. Repairing row 686 (FACTS 94 and 53): the new 2 and 1; the old 2 and 1.
3. Two refusals in a rung's tests (FACTS 55 and 87): the new 2 and 1; the old 2 and 1.
4. The next batch's rung on the sized arrays (FACTS 53 and 94): the new 2 and 1; the old 1 and 1.
5. Two objections from an outside reader (POSITIONS 48, FACTS 166, POSITIONS 60): the new 2 and 1; the old 2 and 1.
6. The process stopped in the gate (FACTS 201): the new 2 and 1; the old 2 and 1.
7. What C4 still fails on after decision D (FACTS 58): the new 1 and 0; the old 2 and 1.
8. A worker's finding on the coverage typing (POSITIONS 60): the new 2 and 1; the old 2 and 1.
9. Where the instance rule stands, path by path (POSITIONS 48, with FACTS 78, 141 and 175): the new 2 and 1; the old 1 and 1.
10. A rung on row 559, and the shorter way (FACTS 78 and 76): the new 1 and 1; the old 1 and 1.

### The totals

- The new entries: decision 18, sources 9, 27 of 30.
- The old entries: decision 17, sources 10, 27 of 30.

### Where the two differed, and why

- **Scenario 4, the old entries lower.** Their reader missed the `Array3` crash row (row 680), which makes the sized arrays' 17 errors a floor. It had read the distance table that holds it (`compile-ladder/climb-batch-13b/gate/distance.txt:29`), and the old FACTS 53 names it. The reader's own miss, with the fact in hand.
- **Scenario 7, the new entries lower.** The trial's FACTS 58 had cut the 14's parts and row 533. The reader called the five powers the numeral work, planned to rewrite the entry in place, and said that no ledger row names their sites; row 533 does, by line. It had read `array-design-ways.md` section 2, which gives the mechanism, and ran no ledger query, so the miss is partly its own. This is the one place where what an entry held made a reader decide worse.
- **Scenario 9, the old entries lower.** Their reader did not sort walk's departures into decisions and defects. It called row 592 a defect, though its class is `deliberate (walk)` (decision D3), and it left out D5. FACTS 141 names D3 and D5 as decisions in both texts. An error with the fact in hand.
- **Scenario 10, both 1.** Both readers missed row 541, the fixed defect that the first half of way (b) would bring back. The old FACTS 78 names it and the new one does not, but neither reader used it, so the entries made no difference here.

### The restoration, and the re-run of scenario 7

- The coordinator restored one sentence in copy q's FACTS 58: the 14's parts, with the five powers refused as an ambiguous coercion (row 533). The entry is now 707 characters, and Part 3 gives its text.
- A fresh Opus reader re-ran scenario 7 in copy q. The coordinator graded the answer against the same key, knowing its copy, so this grade is not blind: decision 2, sources 1. The answer gave the 14's parts; the powers by row 533 and not by a numeral's type; the floor by row 474, with the counts of 18 and 7; the date and row 533's "not measured since"; and a new measurement offered as the curator's call. It cited `array-design-ways.md` section 2 and rows 533 and 474.
- The re-run also reports what the entry still leaves out: three bodies that crashed on `FortressBuiltin.Character` on 2026-09-27 went unchecked (row 477, since fixed in `70d5486f9`), and they hold more powers of row 533's shape. Like the first reader, it proposes a correction of the entry: the base and date of its counts, the crashed bodies, and a caveat on "none is a numeral". These are the re-run's claims, not checked here.

### What the duplication between FACTS and POSITIONS did

- In scenario 9, by its key, the old copy's five entries carried nearly the whole answer. POSITIONS 48 held rows 538, 496 and 424, `OverloadSet.java:2048` and item 20, and FACTS 141 held walk's departures with their tests. That saved a reader about seven lookups.
- But nothing kept the copies true. POSITIONS 48 said that the unbounded lone-parameter tests are expected failures (row 516). That went false when batches 8 and 9 promoted them, and it survived two rewrites of the entry. FACTS 141 said that the library declares `MatchFailure` checked (row 590), which was false since batch 10. The rows and the tests, which the work itself keeps, were right throughout. `main` has corrected both sentences since (`c836b1f2d`, `8583d31d7`).
- In the grading, the new copy's reader followed the pointers, lost no fact and scored 2 on scenario 9. The old copy's reader had walk's sorting in FACTS 141 and scored 1. Neither repeated a stale sentence.
- In scenario 10, by its key, the old FACTS 78 restated the rule's inputs without naming whose rule it is. The new entry's "It builds POSITIONS, ..." names the decision, which is what the scenario asks. What the new entry drops is row 541's history, one hop away in row 559's note, and both readers missed it alike.
- So the duplication worked as a cache does: it saved lookups, and served two of them stale. One home with a pointer cost the reader lookups, and cost no decision in either scenario.

### The slips in the key

The grader found seven (`record-test/grades.md` section 5):

1. Scenario 4: none of the rank-2 and factory rows that the key names is among the sized arrays' 17 errors (`coordinator/tools/distance/classify.py:372-376`). So "no ledger row names any of the 17" is right, and the rubric should not count it against a reader.
2. Scenario 10: the first half of way (b) does not turn the first test green as written, since the test binds the call's result to both candidates' types. And the rubric's row 541 clause gives 1 to an answer that is otherwise whole, though row 541 changes no step there.
3. Scenario 9: "the rule refuses nothing in the library today" is wrong. Three sites stand under row 425: `Library/FortressLibrary.fss:4236` and `:4242`, and `Library/List.fss:146`.
4. Scenario 7: the record itself says "The model's numeral powers are refused by the compiled checker since climb batch N's rung I" (`reviews/array-design-ways.md:322`; PLAN, the row 533 line), so the rubric should test the mechanism, not the key's "No". And the captures that the key and both readers cite are not in the tree; `array-design-ways.md` section 2 is the only source.
5. Scenario 3: row 510's phrase "a static argument that only the call's result mentions" does not fit `wrapK[\T\](x: T)`, where the argument mentions `T` too. A point of wording.
6. Scenario 8: the worker's shape, as the scenario words it, puts the declarations on `M`'s listed types, where row 543's family puts them on two closed traits above `M`.
7. Small slips of line numbers in scenarios 1 and 2.

### The cost

- In tokens written, the eight agents from the draft on came to 2.77M.
- The test itself came to 2.49M, against the coordinator's estimate of 1.6M, about 56 % over:
  - the two scenario writers, 0.27M and 0.24M;
  - the pairs worker, 0.25M;
  - the two readers, 0.40M and 0.41M;
  - the grader, 0.75M;
  - the re-run of scenario 7, 0.16M.
- Fable wrote 1.26M of it: the two scenario writers and the grader.

### What the result means for the measure

- At about a sixth of their old size, the new entries decided as well as the old in nine scenarios of ten. The one loss came from a fact cut from FACTS 58, and one sentence repaired it.
- So 600 characters works as a check, not as a cap. An entry over it names the decision that needs the extra (Part 2, item 20). FACTS 58 is 707. The decision that needs it is decision D, item 13's fifth fork: what C4 still fails on after D1, and whether that is the numeral work or the arrays. The entry's title says "none of their errors is a numeral", and the five powers with row 533 are what tell a reader how to take it.
- POSITIONS 48 and 60, with their "Built:" pointers, are 857 and 850 characters: over the measure, with no decision named that needs the extra. That is the first question of Part 3b.
- The test is small: one reader for each copy, one grader, ten scenarios. It found no other loss, which does not show that there is none.

## Part 5: what the test and the curator's comments add, folded into Part 2

The fifteen points written by the coordinating session on 2026-10-13, before a compaction, are folded into Part 2. Their text as written is in this file's history (`8b701ad32`). Each point, and where it went:

1. A number's breakdown: item 15.
2. The fact without which a claim would be misread: item 14.
3. The measure as a check, not a target, and the boot's whole read: item 20.
4. Long entries cost decisions too: item 20, as the reason for the measure.
5. One home for what FACTS and POSITIONS both tell: items 22 and 27.
6. The method, a trial, a blind test, a restoration and a re-run, then the cold read: the paragraph after item 52, on how the part itself is checked.
7. Retrieval by a Sonnet scout: item 37.
8. The split between the two skills: items 38 to 45, and the last two sections of Part 2.
9. The permanent numbers: items 5 to 10, and 12; contradiction 1 of Part 1.6.
10. The other four contradictions: items 24, 25, 20 and 21; contradictions 2 to 5 of Part 1.6.
11. FACTS and POSITIONS hold the project, and how he and the coordinator work goes to the skill, meanwhile to the held list and the boot note: items 1 and 2.
12. His rule quoted in every brief, never restated: item 34.
13. A proposal of the coordinator's marked as its own until his yes: item 31.
14. No do-nothing choice put to him: not record-keeping; the last line of Part 2, and held on `explorations/coordinator/HELD.md`.
15. The house style for a worker's page: the same.
