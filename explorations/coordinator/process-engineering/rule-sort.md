<!-- The conduct rules of the protocol and POSITIONS, the 73 of the map's section 4.1, sorted against the baseline interview's answers into what the model does by default (dropped from the skill), what this environment needs (kept) and what this project needs (kept), with the workers' rules sent to fortress-repo; the facts the skill states instead of rules, what the interview adds, the shape of the skill that follows, and the open points; written 2026-10-12 by the coordinating session, its own work, from `baseline-interview/answers/`. -->

# The rules sorted against the baseline

The `coordinator` skill is to hold only what the model would not do by itself. This note sorts every conduct rule on record against what Fable 5.1 and Opus 5.5 said they would do by default (`baseline-interview/answers/fable-5.1.md`, `opus-5.5.md`, one question per turn; F and O with a question number cite them). The rules are the 73 of `coordinator-shape.md`, section 4.1, in its six groups.

Buckets: **default**, the model does it by itself, so the rule is dropped; **environment**, this environment needs it (his phone and dictation, the compaction, the container, the harness, his decisions), kept; **project**, this project needs it, kept; **workers**, a rule that binds workers, which lives in `fortress-repo`; **state**, not a rule.

## 1. The count

Of 73 rules: 14 default, dropped; 24 environment, kept; 23 project, kept; 11 workers' rules, to `fortress-repo`; 1 a state, left in POSITIONS. So the skill keeps 47 rules, most of them one line, and states the facts below instead of the rules that follow from them.

## 2. The facts the skill states instead of rules

- He reads replies on an iPhone, often with iOS Speak reading them aloud, and writes by dictation. A repository path does not open there; a page link and a GitHub URL do.
- The context is compacted when it grows long. The container can be lost at any time, and only what is pushed survives.
- The repository is the memory: FACTS, POSITIONS and INDEX are read whole at every boot, by his decision, and the session's state lives in one light file.
- The session runs in auto mode. An automatic permission check can refuse a step after his go, and a refused step is not pursued another way; the way through is his.
- The session's prompt cache lives one hour; a subagent's five minutes. The Workflow harness runs two agents at once on this machine.
- The platform stops the session's process about every 13 hours. Check-ins armed with send_later wake the session at a set time; a session cannot wake itself otherwise.
- The platform's git-check hook asks for a commit after every turn; its reminders are advisory.

## 3. The sort

### Talking and asking

- **One ask per message.** *environment, kept.* Not a default for Opus: it gathers its questions at the end of a reply so he can answer them in one go (O6). Fable keeps only the questions that block (F6). Kept, one line.
- **The ask form: question, context, options, yes and no, recommendation last.** *environment, kept.* Both give their message an order, and both put the recommendation before the options or right after the question (F12, O12). His order, the recommendation last and never instead of the explanation, is a correction. Kept.
- **Never the dialog tool; options in plain text.** *environment, kept.* Not asked; a harness feature. Kept, one line.
- **Lists, not tables.** *default, dropped.* Opus: plain sentences, no tables, written to work read aloud (O6). Fable: reads cleanly aloud (F6). It follows from the fact that he listens. Dropped; the fact stays.
- **Numbers as K or M.** *environment, kept.* Not asked. His preference. Kept, a phrase.
- **A new term defined where it is used.** *environment, kept.* Not asked. He asked for definitions many times. Kept, one line.
- **Label which part answers which; do not restate FACTS or POSITIONS.** *default, dropped.* Both open each reply with what it answers, and Opus says it would not restate an earlier reply (F7, O7). Dropped.
- **Time read from the clock, never guessed.** *default, dropped.* Both: run date, trust only a clock actually read, give estimates from recorded durations (F9, O9). Dropped. The failures on record happened with this rule in context, so the rule was not what protected us.
- **Nothing said about a batch while it runs.** *default, dropped.* Both: one line at the start, nothing in between unless it fails, one line at the end (F16, O16). Dropped.
- **He is not told about record edits.** *environment, kept.* Both read back what they just recorded, in one line (F11, O11). His preference is silence. Kept, one line.
- **The git-check hook's reminders answered silently.** *environment, kept.* Not asked; a harness feature. Kept with the hook's fact, one line.
- **Restate and hold while he reads turn by turn.** *environment, kept.* Mostly default: both write his points down before replying and reply by number (F6, O6), and Opus waits when his answers depend on each other (O7). What is not default is holding the argument until he says he is done. Kept as one sentence.
- **A document for his approval goes out as a page.** *environment, kept.* Both push the file and give him a path or a GitHub link with a spoken summary (F10, O10). The page is ours, and a path does not open on his phone. Kept.
- **Every page has a Select button per section, evidence at the bottom.** *environment, kept.* Not asked; follows from Speak. Kept with the page rule.
- **The wip branches are his chore; no reminder.** *project, kept.* Not asked. Kept, one line.
- **Model what he knows and fill the gaps.** *default, dropped.* Opus: ask whether it is really his call, do the homework so he only has to choose (O12). Fable: narrow it to one real choice (F12). Dropped.

### Deciding and approvals

- **He decides what is committed; a batch run waits for his yes; a bare go starts background work only.** *project, kept.* Waiting for his yes before acting on it is default (O10). The batch convention and the meaning of a bare go are ours. Kept, two lines.
- **A standing approval covers only what it names.** *project, kept.* Not asked. Kept, one line.
- **A step a yes already covers is taken without asking again.** *default, dropped.* Opus decides the cheap and reversible itself (O12); Fable tries to close a question without him first (F12). Dropped.
- **A closed decision is not re-asked; search POSITIONS first.** *default, dropped.* Both check the decisions log before asking anything (F11, O11, F12, O12). Dropped.
- **A decision inside a worker's report is not made until he has seen it.** *environment, kept.* Both let an in-scope, reversible worker decision stand and mention it, Opus only if he would care (F13, O13). His rule is stricter. Kept.
- **What is consequential, and the three ways a decision reaches him.** *project, kept.* The criteria name the model program and the two areas; the landed-then-reviewed path is the batch's. Kept.
- **Reversible stops do not hold a batch.** *project, kept.* Not asked. Kept, one line.
- **A deeper pass, never a halt or a rollback.** *project, kept.* Not asked; his way on a red gate. Kept, one line.
- **Purposes govern; a rule is weighed by what it costs.** *environment, kept.* Both would follow a rule that hurts and put the case to him (F14, O14). His rule lets me do the better thing and say so in one line. Kept.
- **A remark is not a decision; a go is written nowhere.** *project, kept.* The default is to write more: every order and every point of a dictated message into the notes (F6, F8, O6, O8). His rule cuts that. Kept.

### Delegating and briefing

- **Delegate by default; the coordinator reads only the record.** *default, dropped.* Both: my context is the scarce resource; anything that reads a lot goes to a worker; I read the report (F15, O15). Dropped.
- **Forks a probe can settle are probed before a batch is briefed.** *project, kept.* Opus would have a worker run a quick experiment before asking (O12). Before the batch is briefed is ours. Kept, one line.
- **Search the record for how it was done last time.** *default, dropped.* Both search the notes, the history and old reports before asking (F12, O12). Dropped.
- **Idle time to parked research; a new deliverable discussed first.** *environment, kept.* Not asked. Kept, one line.
- **A brief states the problem, never the expected answer.** *project, kept.* Not asked. Kept.
- **A brief points at research on file instead of restating it.** *project, kept.* Not asked. Kept.
- **A brief hands over measurements as findings; no re-measuring.** *project, kept.* The default is to measure again: both run the full suite as a baseline before any change (F18, O18). Kept.
- **A clean worker is clean of our options, not our measurements.** *project, kept.* Not asked. Kept with the two above, as the nine steps.
- **Which tier runs what: Opus workers, Sonnet archaeology.** *project, kept.* Both would give Sonnet the mechanical work with a clear spec (F15, O15). His rule does not. Kept.
- **The Fable rule: without asking for a two-area design question, else his yes.** *project, kept.* Fable would use itself only where being wrong is expensive or Opus failed (F15), which is near; the two areas and the pre-approvals are ours. Kept.
- **A two-area decision in two steps: cheap evidence, top-tier judgement.** *project, kept.* Kept with the Fable rule.
- **The coordinating session runs on Opus.** *a state, stays in POSITIONS.* A state, not a rule: it is on Fable now. Stays in POSITIONS, out of the skill.
- **Watch a long run against its estimate; the spend is the coordinator's.** *default, dropped.* Both start a run in the background, check at long intervals and react when it fails or the estimate doubles (F16, O16). Dropped.
- **Estimates in project units; token counts are writes only.** *environment, kept.* Not asked. His preference. Kept, one line.
- **The skill writer makes every skill edit; a cold read follows.** *project, kept.* Not asked. Kept.
- **A comment on a skill marks a problem area.** *project, kept.* Kept with the writer.

### Boot and record keeping

- **The boot order.** *project, kept.* Both read a short status file whole, then git log (F3, O3). We read the heavy record whole, by his decision. Kept as the list of files.
- **FACTS read whole at boot.** *project, kept.* His decision. Kept, and the three homes that say it differently are made one.
- **Boot reads no directory listings; every output bounded.** *default, dropped.* Both read only what the task in flight points to (F3, O3). Dropped.
- **Whether a worker runs: the harness's notice and test -f.** *environment, kept.* Not asked; harness. Kept, one line.
- **What is in flight is read from the tree, not his client.** *default, dropped.* Opus trusts the pushed files over the compaction summary (O3). The stale client is a fact to state. Dropped.
- **The boot note rewritten whole, never appended.** *default, dropped.* Opus: the status file is rewritten, never appended (O4). Fable moves everything settled out (F4). Dropped; the light file's definition says what it holds.
- **One home per thing; his words written once.** *project, kept.* Both condense a decision to one line with a link (F4, O4). Once is ours. Kept.
- **FACTS and POSITIONS timeless; history in the history files.** *project, kept.* The split of current state from history is default (F4, O4). Dates and an owner on every current line are default too (F1, F2, O2), and that is what does not scale. Kept as the one record correction: no date and no provenance in the current files.
- **Consolidation before each batch; check-verbatim before the commit.** *project, kept.* Not asked. Kept.
- **Cite by bold title; a title stays verbatim.** *project, kept.* Not asked. Kept, one line; whether a dead title stays is open (the map, question 7).
- **A fact enters in the commit that establishes it.** *default, dropped.* Both commit and push in the same turn (F11, O11). Dropped.

### Running agents and the session

- **Resume a stopped run with resumeFromRunId, keeping finished agents.** *environment, kept.* Harness fact. Kept where it is, the agents part.
- **Send messages any time, compact between turns, never stop a turn while agents run.** *environment, kept.* Harness fact. Kept.
- **Check-ins 45 minutes apart, armed together.** *environment, kept.* Opus says it cannot wake itself (O9, O16): it does not know check-ins exist. Kept as a fact.
- **An Agent-tool worker killed by an interrupt is relaunched only at his ask.** *environment, kept.* Harness fact. Kept, one line.
- **Two agents at once on this machine.** *environment, kept.* Machine fact. Kept in cloud-container.
- **agent() can return null after its output.** *environment, kept.* Harness fact. Kept.
- **Check a Workflow script as an async body, not with node --check.** *environment, kept.* Harness fact. Kept.
- **Prompt cache: one hour for the main session, five minutes for an agent.** *environment, kept.* Harness fact. Kept.
- **The permission check can refuse a step after his go.** *environment, kept.* Harness fact. Kept.

### Rules that bind workers

- **Never commit a model identifier.** *workers, fortress-repo.* To fortress-repo, where it is missing. The skill points.
- **His email for attribution only.** *workers, fortress-repo.* To fortress-repo, where it is missing.
- **Copyrighted PDFs and decks stay out of git.** *workers, fortress-repo.* Already in fortress-repo.
- **The push order: main and two more branches.** *workers, fortress-repo.* Already in fortress-repo.
- **The commit footer.** *workers, fortress-repo.* Already in fortress-repo.
- **A worker commits only its own paths, as it goes, no scratch.** *workers, fortress-repo.* Already in fortress-repo.
- **The gate.** *workers, fortress-repo.* Already in fortress-repo and the batch manual.
- **Test first, seen failing, kept.** *workers, fortress-repo.* Already in fortress-repo. Both would write the test first, after a full-suite baseline (F18, O18); the baseline is the project's correction, in fortress-repo.
- **A timing names the machine; no timing of walk.** *workers, fortress-repo.* Already in fortress-repo.
- **No self-credit; attribution reconstructed.** *workers, fortress-repo.* Already in fortress-repo.
- **Provenance in commit messages, not source comments.** *workers, fortress-repo.* Already in fortress-repo.

## 4. What the interview adds

- Both models read git log after their status file at every boot, to catch what landed after the notes were written. We do not. Worth one line in the boot order, since the boot note can lag a worker's push.
- Both file a dictated message verbatim before replying, in an inbox. We rely on the transcript backup for his exact words, and on the light file for the points. Nothing to change.
- Both file every worker's report verbatim and read it only on demand. We do the same with the notes and INDEX.
- Opus does not know a session can be woken; Fable estimates durations only from recorded runs. The check-in fact and the run log in the batch records serve both.
- Fable would spend Fable only where being wrong is expensive, and says a sharp brief beats a higher tier. That is his Fable rule and his briefing rules, found by instinct.
- Neither model would send a worker to re-measure what is on record on purpose, but both would start every change with a full-suite baseline. The no-re-measuring rule is the project's and stays.

## 5. The shape of the skill that follows

- A core, loaded whole, of about 10K bytes instead of 41K: the seven facts above; the fifteen environment rules about him, one line each; the twenty-three project rules, grouped as the nine steps, the batch's coordinator side, the record's rules, the tiers and the writer.
- The harness facts about agents and the session stay where they are, in fortress-repo's session part and cloud-container; the core points to them once.
- The batch workflow stays in its script and manual. The core says when a batch may launch, what is read of its record, what happens at a landing, and that the review and the skill update follow.
- Retired: the protocol (its eleven worker rules in fortress-repo, two of them to add), the README's rule sections (into the core), the boot note's standing lines, and the handover's first section (its state line to PLAN, its landing paragraphs to the batch records).
- POSITIONS keeps his words on every process decision; the skill keeps the rule. Whether POSITIONS' process entries then stay in the boot read is the map's question 4, open.

## 6. Open points for Pavol

1. The light file for the session's state: one small boot file, rewritten whole, read after the heavy record. Asked; waiting on his yes.
2. The fourteen dropped rules: he confirms the list, or names any he wants kept despite the default.
3. git log at boot, one line in the boot order: yes or no.
4. The map's question 4: POSITIONS' process entries beside the rule in the skill, loaded at boot, or the skill alone.
5. The order of the rest: the FACTS and POSITIONS clean-up before the writer starts, or after. The writer needs only the kept rules; the clean-up needs only the record rule. They can run apart.
