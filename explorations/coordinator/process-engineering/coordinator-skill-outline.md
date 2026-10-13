<!-- The outline of the new `coordinator` skill, a core and six parts, with a home for every entry of FACTS and POSITIONS that is not about the project and for every point of the held list on how we work, and what that leaves the consolidation to do; written 2026-10-13 by an Opus worker for the curator, before the consolidation of FACTS and POSITIONS and before the skill's writer runs. -->

# The coordinator skill's outline, and a home for every entry that leaves the record

The `coordinator` skill is to be rewritten from scratch (`coordinator-rewrite-plan.md`; POSITIONS, "The coordinator rewrite's goals."). Before that, FACTS and POSITIONS are consolidated. The curator ruled that the two files hold the project only:

- 09:16 UTC: "positions and facts I believe should relate to the project only. ... every other thing about working between us needs to go to the coordinator skill".
- 11:40 UTC: "We are not moving everything to coordinator skill, only the editing and extracting from workers' reports goes in here. The usage by workers must stay there and also the local edits when we ask them must be described there as well." ("There" is the `fortress-repo` skill.)
- 15:25 UTC: start by drafting the skill's outline, and assign each evicted fact and position to the right place in it, so that nothing is lost between the two systems.

This note does that in three steps. Section 1 is the outline. Section 2 gives every entry that leaves FACTS or POSITIONS, and every point of the held list on how we work, its home. Section 3 says what that leaves the consolidation to do. Line numbers are at commit `77ab93037`. The record store's design (`record-store-design.md`, section 3.6, point 1, and section 5, decision 1) recommends numbering each entry by its line at the numbering commit; if the files are numbered as they stand now, these line numbers are the entries' numbers. Times are UTC, 2026-10-13 unless a date is given. Sizes are characters of entry lines (Python's count), K for thousands.

Words used here:

**core**
: Part of the new skill that is always loaded: at session start, after every compaction, and from then on.

**part**
: Reference file of the new skill, loaded when the coordinator switches into its kind of work.

**mode**
: Kind of work the coordinator switches into, such as running a batch.

**project**
: The language, the library, the tree (the code and the tools that build, test and measure it), the specification, the plan, and the curator's decisions about them.

**evicted entry**
: Entry of FACTS or POSITIONS that is not about the project, so it leaves the file.

**home**
: Place where an evicted entry's content will stand: a section of this outline, a part of `fortress-repo`, or a part of `cloud-container`.

**split entry**
: Entry that holds a project decision with a working rule inside it. The rule leaves and the rest stays.

**borderline entry**
: Entry that can be read either way. Section 2.3 says why it went where it did.

**already there**
: The home already states the content, so the entry needs no new text there.

## 1. The outline

The outline starts from the candidate modes and the shape in the plan's draft of the writer's brief (section 3, points 4 and 5) and the kept rules of point 6. Section 1.4 lists where it departs from them and why. The sizes are the plan's: the core about 10K bytes, the whole skill no longer than the 41K bytes of the skill it replaces, its sources file aside.

### 1.1 The core

Loaded at every session start and after every compaction. It holds what bears on any turn, whatever the coordinator is doing.

1. **The standing goal.** Model what the curator knows and where his gaps are, and fill them with the few facts he needs to decide. Do not re-explain what he knows. This is the executive assistant's role. The profile of what he knows, once built (plan section 6, point 1), is read here.
2. **His role and his decisions.** He sets the goals and decides the design and process questions put to him. A bare go starts background work only; a batch needs his explicit go; a standing go covers what it names. What makes a decision consequential, and its three ways to him. A decision inside a worker's report is not made until he sees it. Search the record before asking him or measuring. A remark is not a decision. A deeper pass, not a halt or a rollback. Weigh a rule by its purpose and its cost. A proposal of the coordinator's stays marked as its own until his yes.
3. **Talking to him.** The register. The ask, one per message, the recommendation last. Lists, not tables; numbers as K or M; a new term defined; a choice numbered. Time read from the clock, given in UTC and his time. Costs in tokens, writes only. Silence while a batch runs. What he hears about record edits. The hook's reminders handled silently. While he reads turn by turn, restate each point in a line and hold it. Pages for him: a Select button per section, sources at the bottom, the house style, updated by URL. A push notification when he is away. No do-nothing option among the choices.
4. **The facts of this environment.** The facts of the plan's section 3, point 7 that bear on any turn: his iPhone, Speak and dictation; a path does not open there, a link does; his client can show stale state; his time zone; compaction; a lost container keeps only what is pushed; auto mode, the permission check and manual mode; the prompt cache's life; the platform's process stops; a message during a turn is queued, a stop kills the running agents; cached reads are almost free; the tiers, and the tier the coordinating session runs on.
5. **The record: what goes where.** Each home and its purpose: FACTS and POSITIONS (the project only, read in briefs), the history files, INDEX, PLAN, the boot note, the held list, the review queue, notes and reports, the gap ledger, and the skills (how we work: this skill; rules that bind workers: `fortress-repo`; the platform: `cloud-container`). One home per thing. What he says about how we work comes here, refined. Push after every commit.
6. **The boot.** The boot order; what is read whole and what is looked up, which the trial boot settles (decision 5); what is in flight, read from the tree; whether a worker still runs; `git log`; the boot note rewritten whole; after each start of the process, the git-check hook's reset, told to him in a line.
7. **The parts.** One line for each part below: what it holds and when to load it.

### 1.2 The parts

Each is loaded when the coordinator switches into its work. Several can be loaded at once.

1. **Delegating: briefing, launching, watching and resuming agents.** The briefer of workers. Loaded before the coordinator briefs, launches, watches, resumes or relaunches any agent, in any mode, a batch's agents included. It holds the tiers, the Fable rule and the all-models pool; what a brief holds (the problem and not the answer, the research on file, the record's measurements as findings, the record's slice quoted and not restated, a length cap for an update, no second reader that reframes a document, no request that a worker cap its own spend); watching a long run against its estimate, with check-ins armed at launch; waits and the prompt cache; interrupts and stops of the process; resuming a run, and relaunching only at his ask; the Workflow tool's traps; headless sessions; the scope of a separate session.
2. **Running and reviewing a batch.** The batch coordinator. Loaded when a batch is prepared, launched, watched, landed or reviewed. It holds the go a batch needs and the standing go's sequence; the workflow script and its manual, which are in scope for improvement; the base built once and the seeded worktrees; the roles (worker, skeptic, judge) and what each checks; reversible stops, the blocking second review, tests-only repairs, and a deeper pass on a red gate; what a batch commits; the mission briefing; the checker-count and distance stages; the landing (consolidation, `revival-changes.md` updated, items listed for him); the review after every batch; resuming a batch after a stop or the limits.
3. **Planning the road.** The roadmap architect. Loaded when PLAN's order or a phase is in question, before a batch is briefed, and when there is idle time. It holds PLAN's phases and parked items; a fork probed before a batch is briefed; the nine steps, with the library's own way first; his answers asked in the plan's order, rows one per message; idle time given to parked research; a new deliverable discussed with him first.
4. **Keeping the record.** The record-keeping part of the plan's step 2 (`record-rule-draft.md`), with the tool of the record store's design (`record-store-design.md`) if he takes it. Loaded when the coordinator edits FACTS, POSITIONS, INDEX or a history file, folds a worker's report into the record, or runs a consolidation. It holds an entry's form and measure; the numbered entries; the history and its provenance; the pass after a worker finishes; the consolidation and its checks; INDEX's lines; the ledger's rewrites and derived views; a record that is public and names models on purpose. How workers read the record, and the edits a brief asks them to make, stay in `fortress-repo` (section 1.5).
5. **Rewriting a skill.** Loaded when a skill is to change, when the writer is briefed or resumed, when a cold read runs, and when his comments on a skill's page come in. It holds the outline first; the `fortress-repo` method, and the heavier method of this rewrite; the seven writing principles and the register; the headless writer; the cold read, the coordinator's review of its flags, and his reading of whole parts; a comment marks a problem area; what belongs in which skill; `revival-changes.md` kept current; a rewrite no longer than what it replaces.
6. **Analysis: process engineering and post-mortems.** The analyst. Loaded when the coordinator measures what the work costs or how long it takes, tests a change to the process, or finds out what happened and why. It holds where the work's costs are measured; the spend read from the transcripts' usage records; a boot's cost; the Fable ratio; the development loop; small tests on the records at hand; archaeology by Sonnet scouts; reading transcripts and Workflow journals; the post-mortem's index into a transcript; the profile of what he knows, built here as its own task.

### 1.3 The five roles

The goals entry names five roles that must not be lost (plan, decision 6). The executive assistant is the core. The briefer of workers is Part 1, the batch coordinator Part 2, the roadmap architect Part 3, the analyst Part 6. Parts 4 and 5 serve all five.

### 1.4 Where it differs from the plan's candidates, and why

1. **"Briefing and running workers outside a batch" becomes Part 1, loaded before any launch.** 18 evicted entries land there. Most of them hold for a batch's agents, a skill writer and a scout alike: the tiers and the Fable rule, what a brief holds, interrupts, resuming a run, waits and the cache, the Workflow tool's traps (POSITIONS 105, 108, 110, 117, 119; FACTS 195, 200, 201, 204 to 209). Split by "outside a batch", they would stand twice, once here and once in the batch part.
2. **"Process engineering" and "a post-mortem" become one part, Part 6, with two modes.** Both are the analyst's role. Both read the same sources (the transcripts and their usage records, the Workflow journals, git) with the same tools (`spend.py`, `journal-text.py`). Among the sorted entries the post-mortem has few homes of its own: the transcript index of POSITIONS 128, and the held list's points on archaeology, most of them done (`HELD.md:88`, `:97` to `:102`).
3. **The launch mechanics leave the core for Part 1.** The plan's point 7 puts in the core that a Workflow `agent()` can return null, that a script is checked as an async body, and how a stopped run resumes. They are needed only when the coordinator launches or resumes, and Part 1 is loaded then. The core keeps the facts that bear on any turn: a message is queued, a stop kills the running agents, the process stops about every 13 hours.
4. **The record-keeping part is narrowed to the editing and the extracting.** This is his comment of 11:40. What goes where stays in the core (plan, point 5). Workers' reading and citing of the record, and the edits a brief asks for, stay in `fortress-repo`'s `references/records.md`. The worker halves of POSITIONS 130 and 133 and of FACTS 219 are already there.
5. **Kept as the plan has it.** Talking, asking and deciding are the core, not a mode. Planning the road, rewriting a skill and running a batch are parts. Pages for him stay in Core 3 and get no part: few entries need them (POSITIONS 145; FACTS 197, 213, 214; `HELD.md:30`, `:60`), and every mode makes pages.

### 1.5 How the record's knowledge splits between the skills

- **Core 5** says what each file holds and why: FACTS and POSITIONS hold the project only, the skills hold how we work, the history files keep provenance.
- **Part 4** holds the editing of FACTS and POSITIONS and the extracting from workers' reports: the entry's form, the history, the pass after a worker finishes, the consolidation.
- **`fortress-repo`'s `references/records.md`** keeps how workers read, query and cite the record, and how they write a fact, a ledger row or a decision when a brief asks them to.

`record-rule-draft.md`, Part 2, items 39 to 45, draws the same line, and lists what `records.md` would change.

## 2. The homes

### 2.1 What counts as the project

An entry stays if its subject is the language, the library, the tree or its own tools (the build, the harness, the gate's stages as measurements), the specification, the plan, or his decisions about them. It leaves if its subject is how he and the coordinator talk and decide, how agents are briefed, run and checked, how batches run, how the record is kept, how skills are written, or how the platform and the Claude Code harness behave. A rule that binds workers goes to `fortress-repo`. How the platform behaves goes to `cloud-container`.

Every POSITIONS and FACTS entry was read whole. Every point of the held list's sections on how we work was read. The held list's last section, "Smaller items he still owns" (`HELD.md:137` to `:143`), is his chores and owed items, not how we work. It is not sorted. Its one lesson, the 1.7M spent on two workers of the wrong tier (`:143`), is already in the plan's list of failures (section 3, point 8) for Part 1.

### 2.2 What moves where, by home

Each line gives the source and its line, the entry's bold title or opening words, whether the entry leaves whole or in part, and what lands in this home. An entry with several homes is listed under each. A held point gives its status: a **rule** to write; his open **question**, which shapes the section; **settled**, a later decision on record answers it; **done**, the work it asked for is done; **owed**, an answer or a task, not skill text.

#### Core 1. The standing goal

- `POSITIONS.md:143`, "The coordinator's standing goal" (leaves whole): model what he knows and where his gaps are, and fill them with the few facts he needs to decide; the two hats.
- `HELD.md:53`, 15:35 A new term defined (question): how the coordinator knows what's new to him.
- `HELD.md:62`, 15:53 Model what he knows: keep and expand (rule): the standing goal stays in the core.
- `HELD.md:79`, His mental model of the ledger may differ (question): a gap in what he knows, to fill.

#### Core 2. His role and his decisions

- `POSITIONS.md:106`, "A deeper pass, not a halt." (leaves whole): when something goes wrong or is undecided, think harder; don't halt or roll back; what reaches him are the forks PLAN already reserves.
- `POSITIONS.md:112`, "Which decisions taken inside the work reach Pavol, and how." (leaves whole): what makes a decision consequential, and its three ways to him: asked before, landed then reviewed, or a stop that holds the work.
- `POSITIONS.md:119`, "The Fable rule." (leaves whole): any other Fable worker needs his yes first.
- `POSITIONS.md:121`, "The phase-3 batches run on a standing go." (leaves whole): a bare go starts background work only; a batch needs his explicit go, and for phase 3 the standing go is that go.
- `POSITIONS.md:141`, "Asks and decisions." (leaves whole): decisions one at a time, each with a default he can take without the argument, which lives in the committed review.
- `POSITIONS.md:142`, "Ownership." (leaves whole): a decision recorded in a line of a worker's report isn't made until he sees it; re-approval rows are gone through in detail.
- `HELD.md:21`, 16:03 (principle 9) The second sentence ("quote that form in every brief") (question): a proposal of the coordinator's stays marked as its own until his yes.
- `HELD.md:40`, 00:06 "Decides what gets committed" is not correct (rule): his role: he sets the goals and decides the design and process questions put to him (decision 10).
- `HELD.md:63`, 15:56 He decides what is committed, a bare go (question): his role and a bare go, from their POSITIONS text (decisions 9, 10).
- `HELD.md:64`, 15:57 A standing approval covers only what it names (question): what a standing approval covers, worded so it isn't a tautology.
- `HELD.md:65`, 15:57 A step a yes covers (question): the rule's origin; the plan drops it (decision 8).
- `HELD.md:66`, 15:58 The closed-decision search: keep (rule): search the record before asking him or measuring.
- `HELD.md:67`, 16:00 A worker's decision in a report (rule): a decision inside a report reaches him; written from POSITIONS's text.

#### Core 3. Talking to him

- `POSITIONS.md:107`, "Forks are probed before a batch is briefed." (leaves whole): rows are put to him one per message, with refreshers.
- `POSITIONS.md:126`, "Estimates in the project's units." (leaves whole): estimates in the project's units, costs in tokens, and a token count counts writes only.
- `POSITIONS.md:134`, "The skills are written for a reader new to the repository, and checked against what the workers did." (leaves whole): a position's bold title is the record's handle, never quoted to him as his words.
- `POSITIONS.md:140`, "The register." (leaves whole): plain short sentences, no flourish or coda, advice as instructions, replies brief, no internal jargon, new concepts defined; the skills' register, halfway to ASD-STE100.
- `POSITIONS.md:141`, "Asks and decisions." (leaves whole): the ask: what the work does, produces, touches, costs, what a yes commits him to and what a no costs; one ask per message; the recommendation last, in a line.
- `POSITIONS.md:144`, "While a batch runs" (leaves whole): no progress reports on a batch until it lands; the hook's reminders handled silently.
- `POSITIONS.md:145`, "Format." (leaves whole): lists, not tables; K and M; few numbers, each with its meaning; time from the clock or the record; a page for him with a Select button per section and its sources at the bottom.
- `FACTS.md:197`, "A VM restart can bring the disk back to an earlier state ..." (leaves whole): a page's lost source is rebuilt from the published page.
- `FACTS.md:213`, "A push notification from the coordinating session reaches the curator's iPhone ..." (leaves whole): a push notification reaches him only outside the app: for a long run's end or a stop that waits on him.
- `FACTS.md:214`, "After a compaction, a page republished by its source path alone becomes a new artifact ..." (leaves whole): a page published before a compaction is updated by its URL, which the boot note keeps.
- `HELD.md:30`, 09:54 Pages keep the house style (rule): pages keep the house style.
- `HELD.md:34`, 14:36 Keeping what was learned before a compaction is the default (rule): no do-nothing option among the choices put to him (decision 14).
- `HELD.md:49`, 15:30 One ask per message is contextual (question): one ask per message, in the context its text gives (decision 9).
- `HELD.md:50`, 15:32 Lists not tables: keep (rule): lists, not tables.
- `HELD.md:51`, 15:32 The dialog tool: the reason is a timeout (rule): no dialog tool, a rule that lapses if the client changes.
- `HELD.md:52`, 15:33 Numbers as K or M (rule): 5K and 1.2M, never spelled out.
- `HELD.md:53`, 15:35 A new term defined (question): define a term that's new to him.
- `HELD.md:54`, 15:36 Label which part answers which (question): the rule's context; the plan drops it as a default (decision 8).
- `HELD.md:55`, 15:37 The clock rule: keep (rule): read the clock before writing any time, in the wording that worked (decision 12).
- `HELD.md:56`, 15:38 Batch silence: keep (rule): silence on a running batch until he asks (decision 16).
- `HELD.md:57`, 15:40 Not told about record edits (question): silence, "noted" or a read-back (decision 11).
- `HELD.md:59`, 15:44 Restate and hold: keep (rule): while he reads turn by turn, restate each point in a line and hold it until he's done.
- `HELD.md:60`, 15:46 The Select button (question): the Select-button rule, as POSITIONS's full sentence (decision 21).

#### Core 4. The facts of this environment

- `POSITIONS.md:117`, "Which tier runs what." (leaves whole): the coordinating session runs on Opus, and moves to Fable at his word.
- `POSITIONS.md:127`, "Check-ins and stops." (leaves whole): a message he sends during a turn is queued and kills nothing; he doesn't press stop while the session works.
- `POSITIONS.md:144`, "While a batch runs" (leaves whole): his time zone, with times given in UTC and his own; his client can show stale state, so the tree answers what's in flight.
- `FACTS.md:200`, "Stopping a turn kills every background agent alive at that moment ..." (leaves whole): a message during a turn is queued; compact between turns; a stop during a turn kills the agents.
- `FACTS.md:210`, "The session's automatic permission check refuses a step ..." (leaves whole): auto mode lets a batch run unattended; in manual mode every agent's command waits for him; his switch or an allow rule is the way through.
- `FACTS.md:215`, "A repository path in chat does not open on the curator's phone ..." (leaves whole): a path doesn't open on his phone; give a page link or the GitHub URL.

#### Core 5. The record: what goes where

- `POSITIONS.md:116`, "Workers commit their own files as they go." (leaves whole): the coordinator pushes main after every commit.
- `FACTS.md:194`, "The transcript backup fires on the main session's Stop ..." (leaves whole): the coordinator's push after every commit covers what the git-check hook protected.
- `FACTS.md:211`, "No push loop runs: the coordinator pushes after every commit ..." (leaves whole): the coordinator pushes after every commit; no push loop.
- `HELD.md:27`, 09:05 What he says about how we work did not reach the record (rule): what he says about how we work goes to this skill, refined into nuggets.
- `HELD.md:28`, 09:16 FACTS and POSITIONS hold the project only (rule): FACTS and POSITIONS hold the project only; how he and the coordinator work is this skill's.
- `HELD.md:41`, 21:00 The name for the coordinator-only files (question): a name for these files, after a brainstorm.
- `HELD.md:42`, 21:00 The handover's first section into PLAN (settled): BOOT.md as the one state home, his to overturn (decision 20).

#### Core 6. The boot

- `POSITIONS.md:32`, "The territory map" (leaves in part): the boot order is followed as written, INDEX included.
- `HELD.md:58`, 15:42 The git-check hook (rule): the reset at each process start, told to him in a line (decision 24).

#### Part 1. Delegating: briefing, launching, watching and resuming agents

- `POSITIONS.md:61`, "The separate analysis session's scope." (leaves whole): a separate analysis session contributes reviews and their commits on its own branch, not a batch or a change of route. Borderline (section 2.3).
- `POSITIONS.md:105`, "The coordinator watches what it launches." (leaves whole): only a long or large run launched outside a batch is watched against its estimate, with a stop or an instruction when it passes it; the spend is the coordinator's, read from the transcripts, and no brief asks a worker to cap its own.
- `POSITIONS.md:108`, "A brief describes the problem, not the solution." (leaves whole): a brief states the problem; a worker that hasn't read our notes lists every way before a design choice reaches him.
- `POSITIONS.md:110`, "No re-measuring what the record holds." (leaves whole): a brief hands over the record's measurements as findings and names the one new thing to measure; a clean worker is clean of our options, not of our measurements.
- `POSITIONS.md:117`, "Which tier runs what." (leaves whole): Opus workers as needed; Sonnet for archaeology only, never a page or text he reads; the top tier at decision points; a longer report for him written by an Opus worker.
- `POSITIONS.md:119`, "The Fable rule." (leaves whole): a Fable judgement without asking, sparingly, for a question across two of the specification, the library and the implementation, once an Opus worker's evidence is on file; the standing pre-approvals.
- `POSITIONS.md:127`, "Check-ins and stops." (leaves whole): every overnight or long background run gets its check-ins, 45 minutes apart, armed when it starts; an accidental stop is said so and the run resumed.
- `POSITIONS.md:134`, "The skills are written for a reader new to the repository, and checked against what the workers did." (leaves whole): the coordinator skill picks each worker's slice of the record; what only the coordinator needs of the session goes here, the rest is fortress-repo's.
- `FACTS.md:195`, "The Workflow harness runs two agents at once on this box" (leaves whole): an agent's model alias resolves to a fixed identifier, never written down; an agent's floor of about 45K; the cache serves only an identical prompt; a project agent type needs a process restart; a project skill appears at once.
- `FACTS.md:196`, "The VM can be restarted under a live session with the disk intact ..." (leaves whole): the run is resumed with resumeFromRunId; the wip/ branches hold the pushed milestones.
- `FACTS.md:200`, "Stopping a turn kills every background agent alive at that moment ..." (leaves whole): an interrupt kills Workflow and Agent-tool agents alike; a killed Agent-tool worker is relaunched only at his ask and told its predecessor's leftovers; a Fable successor gets the leftovers in the tree, not a transcript.
- `FACTS.md:201`, "A restart of the session's own process kills its background runs, and `resumeFromRunId` ..." (leaves whole): a run is resumed, not relaunched: the same script and arguments in the same call order, a copy of the script as launched, the journal and its keys.
- `FACTS.md:204`, "An agent that waits longer than the prompt cache lives ..." (leaves whole): an Agent-tool worker's brief carries the cap, or the long run is handed to a script.
- `FACTS.md:205`, "A headless `claude -p` session ... keeps its prompt cache for an hour ..." (leaves whole): a worker that waits on him between tasks runs headless and is resumed within the hour.
- `FACTS.md:206`, "An agent launched from the coordinating session loads the `fortress-repo` skill on its own ..." (leaves whole): a brief need not name fortress-repo for a worker whose task touches the repository.
- `FACTS.md:208`, "`agent()` in a Workflow returns null for an agent the harness marks failed ..." (leaves whole): a Workflow agent can come back null after its work is done.
- `FACTS.md:209`, "`node --check` does not check the batch script as the Workflow harness parses it ..." (leaves whole): check a Workflow script as an async function body, not with node --check.
- `FACTS.md:212`, "Fable draws on the all-models limits as well as its own ..." (leaves whole): a Fable worker spends the all-models pool too, at three to four times an Opus token's share.
- `HELD.md:21`, 16:03 (principle 9) The second sentence ("quote that form in every brief") (question): a brief quotes his rule, never restates it.
- `HELD.md:30`, 09:54 Pages keep the house style (rule): a worker that builds a page is pointed to the house CSS.
- `HELD.md:38`, 00:4x The main problem with the revival story's last version was expansion (rule): a brief for an update caps its length against the version before (decision 14).
- `HELD.md:39`, 00:22 The update should only have brought the story up to date (rule): a brief doesn't reframe a document by naming a second reader.
- `HELD.md:119`, His model of the briefing (question): the slice of the record a brief hands over, and the briefing tool.

#### Part 2. Running and reviewing a batch

- `POSITIONS.md:39`, "The checker count is measured, never red." (leaves whole): the checker-count stage runs in every gate, reported and never red on its own; the distance is a report-only stage of the phase-3 gates. Borderline (section 2.3).
- `POSITIONS.md:102`, "Test first, the test kept." (leaves whole): the skeptic reads test-first from the worker's transcript and repeats no build.
- `POSITIONS.md:103`, "The suite's verdict is the check." (leaves whole): no batch compares the corpus's printed outputs or runs a baseline, and this is not offered to him again.
- `POSITIONS.md:104`, "Nothing is built or run twice on the same code." (leaves whole): the batch's base built once by the coordinator before launch, every rung worktree seeded from it, the skeptic reusing builds, no stage re-running what another ran.
- `POSITIONS.md:106`, "A deeper pass, not a halt." (leaves whole): on a red gate over a merged batch, no bisection: find the cause and rework it in the merged batch.
- `POSITIONS.md:109`, "The mission briefing." (leaves whole): each rung's mission briefing from the planner, in neutral words, its use reported at each landing; no required questions for the worker; the skeptic checks the result against the library's way, the ledger and the decisions.
- `POSITIONS.md:110`, "No re-measuring what the record holds." (leaves whole): a rung whose test is the count or distance stage takes the last landed tables as its before.
- `POSITIONS.md:111`, "Reversible stops do not hold a batch." (leaves whole): a reversible stop lands, is listed for his review, and the next batch goes ahead; a rung's small items go to the ledger, not to him one per message.
- `POSITIONS.md:113`, "A blocking second review does not hold a green batch." (leaves whole): after its one repair round, a blocking merged-diff review doesn't hold a batch whose gate is green; its findings go to the next batch; the review stays inside the batch, once.
- `POSITIONS.md:114`, "A tests-only repair does not rerun the gate." (leaves whole): the same weighing of cost against protection for every rule of the batch workflow.
- `POSITIONS.md:115`, "What a batch commits." (leaves whole): the same rule built into the batch script and its manual; the process is read from the transcripts.
- `POSITIONS.md:116`, "Workers commit their own files as they go." (leaves whole): rungs push to their own wip/ branches, cleaned after the gate; the workflow script lives in the repository.
- `POSITIONS.md:118`, "The judge's rulings." (leaves whole): when a judge rules (a contested fix, a refused rung, a worker's stop), the first ruling on Opus, a second on Fable; a settled fix lands with the review and the gate as its check.
- `POSITIONS.md:120`, "One review after every batch." (leaves whole): one Opus reviewer after each batch: conformance, the process measures and the routing check; the coordinator files what it finds in PLAN at the landing.
- `POSITIONS.md:121`, "The phase-3 batches run on a standing go." (leaves whole): each batch launches when the last has landed with no question open; overnight a question takes its default unless it would reverse his decision; a run stalled by the limits resumes with resumeFromRunId.
- `POSITIONS.md:122`, "The new batch practice, and what he expects of it." (leaves whole): the practice as built, and its yardstick: every step spends the fewest workers it needs and measures nothing on record.
- `POSITIONS.md:123`, "The gate's comparisons." (leaves in part): every masked difference and respelled line listed for him; the name comparison is parked.
- `POSITIONS.md:131`, "The delta from the original Fortress is a part of the skill, kept current." (leaves whole): after each landing, fortress-repo's revival-changes part is updated, so the next batch reads it fresh.
- `POSITIONS.md:134`, "The skills are written for a reader new to the repository, and checked against what the workers did." (leaves whole): the checker count and the distance are named here and run by the workflow's prompts; fortress-repo carries no batch structure.
- `POSITIONS.md:135`, "The coordinator rewrite's goals." (leaves whole): the batch workflow is in scope, and is improved whenever it shows a problem.
- `POSITIONS.md:136`, "The statement for the public record on the usage limit." (leaves whole): a batch the limits stopped is resumed.
- `FACTS.md:66`, "The checker-count stage's table, `gate/checker-count.txt`, lands with every batch ..." (leaves in part): the review after a batch ties every new or risen row of the count to a named rung edit.
- `FACTS.md:111`, "The checker-count and distance stages read only the compiler's phases ..." (leaves in part): the batch script's STAGE_BLIND rule, and its skeptic's check of the paths.
- `FACTS.md:208`, "`agent()` in a Workflow returns null for an agent the harness marks failed ..." (leaves whole): the batch script's callAgent retries a role up to twice, each retry told what the earlier one may have left.
- `FACTS.md:209`, "`node --check` does not check the batch script as the Workflow harness parses it ..." (leaves whole): workflow-scenarios.js parses the batch script this way.
- `HELD.md:56`, 15:38 Batch silence: keep (rule): nothing said to him while the batch runs.
- `HELD.md:83`, Also waiting for his answer (PLAN.md, "Asked 2026-09-27") (question): batch 6b's worker questions, skeptic checks 11 to 13, the gather's filing for him, a Fable judge overnight; likely overtaken by the new practice, to check in PLAN.
- `HELD.md:89`, His rule to weigh: a batch commits the Fortress change and the real findings (settled): the script follows it.
- `HELD.md:90`, A cleaning pass to remove the committed scratch (done): the landed batches' scratch was cleaned.
- `HELD.md:93`, Redesign what a batch asks of its workers (done): the new batch practice.
- `HELD.md:101`, Connect the practice to the top-level output (done): covered by the reviews behind the new practice.
- `HELD.md:114`, The two non-blind designs improve our pipeline (done): the Opus synthesis of the batch-10 designs, built into the script.
- `HELD.md:116`, Perhaps the best strategy: per batch, a Sonnet content-only brief (question): a workflow designed per batch.
- `HELD.md:117`, Is that the same as today's preparation (question): the same question, against today's preparation.
- `HELD.md:123`, The decisions the designs raise are not the ones he wanted to weigh (question): what he wants weighed about the workflow.
- `HELD.md:125`, What he is weighing: drop the fixed workflow (question): a fixed workflow, or one designed per batch.

#### Part 3. Planning the road

- `POSITIONS.md:27`, "The library's own practice is the standard." (leaves in part): a fork put to him names the library's own way first; a fork that rests on a refusing rule says what the library does instead.
- `POSITIONS.md:33`, "The plan" (leaves in part): his answers are asked in the plan's order; the re-approval rows and other off-path items wait until relevant. Borderline (section 2.3).
- `POSITIONS.md:107`, "Forks are probed before a batch is briefed." (leaves whole): a fork a probe can settle is probed before the batch is briefed, so the decision is his and the worker gets a clean task.
- `POSITIONS.md:110`, "No re-measuring what the record holds." (leaves whole): the nine steps brief him on unfamiliar ground; one global rule is sought from type theory and the peers, not a rule on a rule.
- `HELD.md:80`, Unsure about PLAN.md, the big plan file, as the place (question): what PLAN holds.

#### Part 4. Keeping the record

- `POSITIONS.md:87`, "The model's text is the notation." (leaves in part): the ledger is one file, and its views are derived from it.
- `POSITIONS.md:128`, "Where the work lives." (leaves whole): parked: a later pass that keeps only the Fortress changes on main and the process record on its own branch, with GitHub issues per problem.
- `POSITIONS.md:129`, "The record is public and names models on purpose." (leaves whole): the record may name models on purpose, and nothing is held back from it for that.
- `POSITIONS.md:130`, "The record's form: an optimized build and a debug build." (leaves whole): FACTS and POSITIONS state the present; the history files keep provenance; consolidate FACTS before each batch; an entry in a few lines points to its report.
- `POSITIONS.md:133`, "The gap ledger's form." (leaves whole): a ledger rewrite is split among small workers after a separate duplicate search; rows sit in topic sections and keep their numbers.
- `FACTS.md:219`, "The ledger's rows stand in fifteen topic sections ..." (leaves whole): the ledger's history file, its topic sections, and apl/lessons.md as a derived view.
- `HELD.md:7`, 16:16 Are the long entries enough to rewrite from (question): how a consolidation runs: scouts for context, a batch workflow, a writer per section; and what goes into FACTS or POSITIONS and what is noise.
- `HELD.md:14`, 15:32 (principle 2) The history grew as a verbatim copy (question): the history as provenance data, one tool call writing the entry and its history, tooling built during the consolidation; the record store's design proposes that tool, pending his decisions.
- `HELD.md:15`, 15:34 (principle 3) Agrees, but "changes what a worker (question): a decision rubric with a few examples; an entry needs a reason to be large.
- `HELD.md:16`, 15:46 (principle 4) Good, but not actionable (rule): no compression into bare numbers; the halfway register; a count that changes at each landing is one current value.
- `HELD.md:17`, 15:51 (principle 5) One home is right (question): a tool that surfaces a fact with its linked positions in one go; the record store's design proposes such a query.
- `HELD.md:18`, 15:56 (principle 7, form) Storing his dictated words verbatim (rule): his dictated words are refined into the entry, not stored verbatim.
- `HELD.md:19`, 15:57 (principle 7, content) Good, but a coordinator-skill rule (question): whether provenance shapes how the record is laid out for lookup.
- `HELD.md:20`, 16:01 (principle 8) Losing the thread (settled): the record-keeping part holds the consolidation only; the rest of the skill is in the other sections of this outline.
- `HELD.md:29`, 09:22 The rewrite plan's first steps follow the fortress-repo method (rule): a quiz checks a consolidation.
- `HELD.md:31`, 10:14 The success criterion for a compression (rule): decisions stay as good and a reader follows the pointers; tested automatically, without him.
- `HELD.md:33`, 10:30 Links matter most in the history (settled): numbered entries, taken at 11:05.
- `HELD.md:43`, 21:00 The lint: not convinced (question): a length check by script, or a reader's check alone (decision 4).
- `HELD.md:76`, Was the ledger sorted by kind before (settled): the topic sections ("The gap ledger's form.").
- `HELD.md:78`, Grouping by plan phase may be the wrong principle (settled): topic sections, not plan phases.
- `HELD.md:81`, No go yet on re-deriving the views (question): the ledger's derived views.

#### Part 5. Rewriting a skill

- `POSITIONS.md:131`, "The delta from the original Fortress is a part of the skill, kept current." (leaves whole): SKILL.md keeps only what doesn't change from batch to batch, with a trigger to read the part.
- `POSITIONS.md:132`, "The order of the work after batch 10." (leaves whole): the fortress-repo method: rewritten whole by the outline and the seven principles, every part cold-read and fixed; a Fable reviewer compares a re-passed part with the one he approved and writes a synthesis, never a wholesale revert. Borderline (section 2.3).
- `POSITIONS.md:134`, "The skills are written for a reader new to the repository, and checked against what the workers did." (leaves whole): who the skills are for; the register halfway to ASD-STE100; concepts, then procedures; parts by area; a note named only with a trigger; the seven principles on a whole part; a cold read before he reads; a comment marks a problem area; one headless writer, resumed or started fresh; the writer's minor decisions settled by the coordinator; a glossary written as a dictionary.
- `POSITIONS.md:135`, "The coordinator rewrite's goals." (leaves whole): a skill rewrite heavier than fortress-repo's: the modes first, the model's baseline first, the sort, written from scratch without reading the old skill, the check against the kept list, the cold read; a rule is kept when its failure is on record. Borderline (section 2.3).
- `FACTS.md:205`, "A headless `claude -p` session ... keeps its prompt cache for an hour ..." (leaves whole): the skill writer runs this way.
- `HELD.md:13`, 15:25 (principle 1) Draft the coordinator skill's outline first (done): draft the outline first, so each entry moved out of the record gets a section; this note does it.
- `HELD.md:27`, 09:05 What he says about how we work did not reach the record (rule): a check that the skill caught his meaning, a cold read or a test.
- `HELD.md:29`, 09:22 The rewrite plan's first steps follow the fortress-repo method (rule): the fortress-repo method for a rewrite.

#### Part 6. Analysis: process engineering and post-mortems

- `POSITIONS.md:31`, "Development-loop performance is a first-class concern." (leaves whole): when an iteration waits too long on something, find the cause and fix it. Borderline (section 2.3).
- `POSITIONS.md:128`, "Where the work lives." (leaves whole): a post-mortem index points into the transcript by timestamp, with a script for a verbatim view; the transcript is not restated.
- `FACTS.md:189`, "The process cost of the climbs and the batches ..." (leaves whole): where the cost of the climbs and batches is measured: iteration-cost.md, the batch records, the post-mortem's characterization, the process-engineering study.
- `FACTS.md:190`, "A boot after a compaction costs about 74K tokens of context ..." (leaves whole): a boot's fixed cost, and tokens per byte for each record file, to estimate a boot from file sizes. Borderline (section 2.3).
- `FACTS.md:212`, "Fable draws on the all-models limits as well as its own ..." (leaves whole): how the ratio was read from the usage panel.
- `HELD.md:19`, 15:57 (principle 7, content) Good, but a coordinator-skill rule (question): whether provenance tells a Sonnet scout where to dig.
- `HELD.md:32`, 10:20 Tests stay small and on the records at hand (rule): a test of a process change stays small, on the records at hand.
- `HELD.md:62`, 15:53 Model what he knows: keep and expand (rule): the profile of what he knows, built by archaeology as its own task.
- `HELD.md:88`, Archaeology: when and why committing captured run outputs (done): the batch practice's post-mortem.
- `HELD.md:97`, One report characterizing the batch practice (done): the characterization of every batch's spend.
- `HELD.md:98`, On it, a review proposing a better practice (done): the two reviews and their synthesis.
- `HELD.md:99`, Archaeology: how we got here, batch by batch (done): the archaeologies behind the new practice.
- `HELD.md:102`, Meanwhile a bounded, git-only characterization of each batch (done): the per-batch characterization.
- `HELD.md:107`, Was the before-and-after output comparison the team's practice (settled): settled by his decision that the suite's verdict is the check.
- `HELD.md:108`, Dig up the early discussion comparing Fortress's test suite with the Swift compiler's (question): an archaeology the record doesn't show as done.
- `HELD.md:112`, Answered at once: the designers made every estimate themselves (settled): answered at the time.
- `HELD.md:113`, Ideally run all the designs on branches (question): an experiment the record doesn't show as run.
- `HELD.md:115`, Is batch 10 representative of the workload (question): whether one batch represents the workload.
- `HELD.md:118`, A real experiment compares what each run found (question): compare what each run found, not only its cost.
- `HELD.md:124`, He wants the true ultracode version (done): the two ultracode designs are on file.

#### fortress-repo, SKILL.md

- `POSITIONS.md:103`, "The suite's verdict is the check." (leaves whole): a value that matters is asserted in the test; no expected-output files ("Rules for every task"). Already there.
- `POSITIONS.md:104`, "Nothing is built or run twice on the same code." (leaves whole): reuse every result your brief cites or your work ran ("Rules for every task"). Already there.
- `POSITIONS.md:125`, "The suites run Fortress in parallel." (stays; borderline): a test that varies under parallelism is written wrong or shows a defect ("Parallelism and mutable state"). Already there; the entry stays (section 2.3).
- `POSITIONS.md:134`, "The skills are written for a reader new to the repository, and checked against what the workers did." (leaves whole): the worker's three things and two modes, conflicts surfaced, a point to report ("When to explore", "Rules for every task"). Already there.
- `HELD.md:100`, The original team's test-suite practice against ours (settled): the harness as the team designed it; assert every value ("Rules for every task").
- `HELD.md:106`, The Fortress suite is pass or fail (settled): "The suite's verdict is the check.", now a rule for every task.
- `HELD.md:126`, His concern: such designers must not reinvent how to move safely (settled): fortress-repo now holds how to move in this repository, and cloud-container the platform's side.
- `HELD.md:130`, (04:01 UTC) SKILL.md, "How a program runs" (settled): the sentence he quoted is gone; its replacement asks for the other path only for a new defect.

#### fortress-repo, references/session.md

- `FACTS.md:191`, "The Bash tool's 10-minute ceiling kills long runs ..." (leaves whole): the tool's timeout, long runs in the background, waits in steps, Monitor ("The Bash tool and waits", "Long commands"). Already there.
- `FACTS.md:200`, "Stopping a turn kills every background agent alive at that moment ..." (leaves whole): an interrupt, defined. Already there.
- `FACTS.md:201`, "A restart of the session's own process kills its background runs, and `resumeFromRunId` ..." (leaves whole): a worker's own steps after a stop ("After an interrupt or a stop of the process"). Already there.
- `FACTS.md:204`, "An agent that waits longer than the prompt cache lives ..." (leaves whole): an agent keeps every wait under 270 s ("The Bash tool and waits"). Already there.
- `FACTS.md:210`, "The session's automatic permission check refuses a step ..." (leaves whole): a refused call isn't pursued another way; the way through is his ("When the automatic permission check refuses a call"). Already there.

#### fortress-repo, references/build-and-caches.md

- `FACTS.md:192`, "The disk allowance fills with parser-generation temp directories ..." (leaves whole): each run that imports a grammar leaves a parser directory; the setup lines put them in the tree's tmp/ ("Setting up each call"). Already there. Borderline (section 2.3).
- `FACTS.md:203`, "`explorations/experiment/env.sh` is the one script every probe and gate runner sources ..." (stays; borderline): the worker's setup lines give the same settings ("Setting up each call"). Already there; the entry stays (section 2.3).

#### fortress-repo, references/worktrees.md

- `POSITIONS.md:104`, "Nothing is built or run twice on the same code." (leaves whole): seeding a worktree from the base build. Already there.

#### fortress-repo, references/tests-writing.md

- `POSITIONS.md:102`, "Test first, the test kept." (leaves whole): the test before the fix, seen failing through the harness, kept in the corpus; test and fix may share a commit ("The order: the test, its failure, the fix, the pass"). Already there.
- `POSITIONS.md:123`, "The gate's comparisons." (leaves in part): a team line your change breaks is respelled keeping its value, every assertion kept, before and after in the report ("Names, comments, citations"). Already there.
- `HELD.md:91`, Test file names carrying batch and rung suffixes (settled): name a test by its topic ("Names, comments, citations").
- `HELD.md:118`, A real experiment compares what each run found (question): where workers get the instruction to grow the ledger ("How a defect is recorded").
- `HELD.md:135`, (04:58 UTC) references/tests-writing.md, "Where a test goes, and how it passes" (question): a clearer bullet on a refusal at load and its XXX test.

#### fortress-repo, references/gate.md

- `POSITIONS.md:114`, "A tests-only repair does not rerun the gate." (leaves whole): a repair reruns the gate only if it changes what the gate reads ("When to run it"). Already there.
- `POSITIONS.md:123`, "The gate's comparisons." (leaves in part): what a comparison masks, and the shard sum.
- `POSITIONS.md:124`, "The specification's examples join the gate at zero red." (stays; borderline): the gate's step 4 runs testSpecData with zero failures. Already there; the entry stays (section 2.3).

#### fortress-repo, references/committing.md

- `POSITIONS.md:115`, "What a batch commits." (leaves whole): commit only what main is to hold: the change, its tests, the report, the record's lines, a reusable script; no scratch ("What to commit"). Already there.
- `POSITIONS.md:116`, "Workers commit their own files as they go." (leaves whole): commit your own paths as you go, and push ("How to commit", "Pushing"). Already there.
- `POSITIONS.md:129`, "The record is public and names models on purpose." (leaves whole): an agent's own commits carry no model identifier (decision 22 adds this).
- `FACTS.md:211`, "No push loop runs: the coordinator pushes after every commit ..." (leaves whole): the three pushes after every commit ("Pushing"). Already there.
- `HELD.md:89`, His rule to weigh: a batch commits the Fortress change and the real findings (settled): "What a batch commits.", now in "What to commit".

#### fortress-repo, references/records.md

- `POSITIONS.md:19`, "The third-party Java 9 port" (leaves in part): the port gets no credit and no mention in any committed text, a rule for every writer ("The repository's history"). Borderline (section 2.3).
- `POSITIONS.md:108`, "A brief describes the problem, not the solution." (leaves whole): a timing names the machine's CPU ("Timings and citations"). Already there.
- `POSITIONS.md:128`, "Where the work lives." (leaves whole): new files of the work go under explorations/ ("Writing to the record"). Already there.
- `POSITIONS.md:130`, "The record's form: an optimized build and a debug build." (leaves whole): how a worker reads the two files: the present, no dates ("POSITIONS and FACTS"). Already there.
- `POSITIONS.md:133`, "The gap ledger's form." (leaves whole): a row's status is one word of seven, its class kind (area), at most 1,200 characters, written only with ledger.py ("The gap ledger"). Already there. Borderline (section 2.3).
- `FACTS.md:191`, "The Bash tool's 10-minute ceiling kills long runs ..." (leaves whole): nothing else runs beside a timing you keep ("Timings and citations"). Already there.
- `FACTS.md:219`, "The ledger's rows stand in fifteen topic sections ..." (leaves whole): the row template, numbers kept for good, ledger.py the only writer, its commands ("The gap ledger", "Writing to the record"). Already there. Borderline (section 2.3).
- `HELD.md:75`, Who writes into the ledger, when (settled): workers write rows with ledger.py when their work meets a defect ("The gap ledger"; tests-writing.md, "How a defect is recorded").
- `HELD.md:77`, Row numbers stay stable (settled): a row keeps its number for good.

#### fortress-repo, references/exploring.md

- `POSITIONS.md:112`, "Which decisions taken inside the work reach Pavol, and how." (leaves whole): which choices are a worker's own ("The choices that are yours"). Already there.
- `HELD.md:67`, 16:00 A worker's decision in a report (rule): which choices are a worker's.

#### fortress-repo, references/library.md

- `HELD.md:131`, (04:21 UTC) references/library.md, "Designing a change": "Put each extension (question): the extension bullet, revised in the archaeology note's section 5.
- `HELD.md:132`, (04:29 UTC) references/library.md, "Designing a change": "follow the team's proposal (question): a clearer sentence on the team's unfinished collection design.
- `HELD.md:133`, (04:40 UTC) references/library.md, "Editing" (settled): the comment-span paragraph stays while row 359 lives.
- `HELD.md:134`, (04:45 UTC) references/library.md: LGTM (settled): approved, with the three points above held.

#### fortress-repo, references/interpreter.md

- `POSITIONS.md:111`, "Reversible stops do not hold a batch." (leaves whole): an output that already varies run to run on the untouched tree is a ledger row, not a stop (the ambiguity message's case is there). Already there.

#### cloud-container, references/machine.md

- `POSITIONS.md:136`, "The statement for the public record on the usage limit." (leaves whole): the account's weekly limit can stop a running batch, and later turns may still be served while it reads reached. Borderline (section 2.3).
- `FACTS.md:192`, "The disk allowance fills with parser-generation temp directories ..." (leaves whole): check the allowance before a long run ("The disk allowance"). Already there.
- `FACTS.md:195`, "The Workflow harness runs two agents at once on this box" (leaves whole): two agents at a time on this machine. Already there.

#### cloud-container, references/stops.md

- `POSITIONS.md:127`, "Check-ins and stops." (leaves whole): the series of one-shot check-ins and the extra one after a predicted stop ("Check-ins across a stop"). Already there.
- `FACTS.md:196`, "The VM can be restarted under a live session with the disk intact ..." (leaves whole): a VM restart, its signs, the disk kept ("What stops the process"). Already there.
- `FACTS.md:197`, "A VM restart can bring the disk back to an earlier state ..." (leaves whole): new there: a restart can roll the disk back; its signs; fetch, rebase and push.
- `FACTS.md:202`, "The platform stops the session's process after about 12 hours 58 minutes ..." (leaves whole): the cap, its log lines, the next stop's time ("What stops the process"). Already there.
- `FACTS.md:207`, "A check-in cadence under an hour is a series of one-shot `send_later` check-ins ..." (leaves whole): the series armed in one turn, the rate limit, a new series armed by the last check-in ("Check-ins across a stop"). Already there.

#### cloud-container, references/hooks.md

- `POSITIONS.md:128`, "Where the work lives." (leaves whole): transcripts stay on transcripts-blinded. Already there.
- `FACTS.md:194`, "The transcript backup fires on the main session's Stop ..." (leaves whole): the backup's runner, log, blind spots and stale lock; the git-check hook, made a no-op and back at each restart. Already there.
- `FACTS.md:199`, "The transcript backup's Stop hook is registered in the tracked `.claude/settings.json` ..." (leaves whole): where the hook is registered, and two passes when both files register it.
- `FACTS.md:210`, "The session's automatic permission check refuses a step ..." (leaves whole): the check refuses a trigger that would turn the hook off again. Already there.
- `HELD.md:58`, 15:42 The git-check hook (rule): the technique.

#### cloud-container, references/container-loss.md

- `POSITIONS.md:128`, "Where the work lives." (leaves whole): recovering a container is a lesson about the platform, not a ledger row.
- `FACTS.md:193`, "A container can be lost outright ..." (leaves whole): what a lost container keeps and loses, and where recovery goes on. Already there.
- `FACTS.md:198`, "A container can be replaced by a fresh one whose clone fails ..." (leaves whole): the empty clone, the fetch and setup.sh, the source branch kept pushed, one session per backup branch, the split transcript's path ("Re-provisioning", "Reading another session's transcript"). Already there.
- `FACTS.md:199`, "The transcript backup's Stop hook is registered in the tracked `.claude/settings.json` ..." (leaves whole): setup.sh restores a blank container in about 4 minutes ("Re-provisioning"). Already there.

#### The history file only: no rule left in it

- `POSITIONS.md:122`, "The new batch practice, and what he expects of it." (leaves whole): how the post-mortem's four questions were settled.
- `POSITIONS.md:132`, "The order of the work after batch 10." (leaves whole): the order itself, carried out through batch 11.
- `POSITIONS.md:135`, "The coordinator rewrite's goals." (leaves whole): the goals themselves, once the new skill holds them and its sources file cites them.
- `POSITIONS.md:136`, "The statement for the public record on the usage limit." (leaves whole): his statement, which also stays public in coordinator/usage-metering-2026-09-30.md.
- `FACTS.md:211`, "No push loop runs: the coordinator pushes after every commit ..." (leaves whole): the wip/main-backup branch, gone.

#### Dropped at his word

- `POSITIONS.md:115`, "What a batch commits." (leaves whole): deleting the wip/ branches is his chore, not reminded: dropped at his word.
- `HELD.md:61`, 15:48 The wip-branch line: drop (rule): the line about the wip/ branches.

#### Not skill text: an owed answer or task, kept with what is in flight

- `POSITIONS.md:133`, "The gap ledger's form." (leaves whole): D7, numbering rows during parallel batches, is open.
- `HELD.md:39`, 00:22 The update should only have brought the story up to date (rule): the story's own fix, one Opus pass when he's done commenting.
- `HELD.md:92`, He wants to understand the tests added (owed): the answer on why PowChooseLcmRungE has 50 checks.

### 2.3 The borderline entries

- `POSITIONS.md:19`, "The third-party Java 9 port" (in part, to fortress-repo records): the rule binds every writer, so fortress-repo; the lineage itself is the project's.
- `POSITIONS.md:31`, "Development-loop performance is a first-class concern." (leaves, to Part 6): it reads like a project goal, but the loop is our build-and-test loop, not the language; the analyst measures it.
- `POSITIONS.md:33`, "The plan" (in part, to Part 3): the order of the plan is his decision about the project; the order in which he is asked is ours.
- `POSITIONS.md:39`, "The checker count is measured, never red." (leaves, to Part 2): the distance is the project's metric, and FACTS and PLAN keep it; how a gate treats the stage is the batch's, and "The skills are written for a reader new ..." puts these stages in the coordinator skill.
- `POSITIONS.md:61`, "The separate analysis session's scope." (leaves, to Part 1): it sits among the checker decisions, but it rules how another session works; if that session is over, it goes to the history instead.
- `POSITIONS.md:124`, "The specification's examples join the gate at zero red." (stays in POSITIONS; its rule is already in fortress-repo gate): it decides what the tree's suites hold and that the specification's examples aren't respelled for walk; the working rule is already in the gate part. It stays, moved to a project section.
- `POSITIONS.md:125`, "The suites run Fortress in parallel." (stays in POSITIONS; its rule is already in fortress-repo SKILL.md): it decides the build file's thread pin and what a varying test means; the rule for tests is already in fortress-repo. It stays, moved to a project section.
- `POSITIONS.md:132`, "The order of the work after batch 10." (leaves, to Part 5, history): most of it is a finished plan of our own work, so history; the method inside it lives on.
- `POSITIONS.md:133`, "The gap ledger's form." (leaves, to fortress-repo records, Part 4, in flight): the rows are the project's bug reports, but the entry rules the file's form and how it's written, which is how we keep the record.
- `POSITIONS.md:135`, "The coordinator rewrite's goals." (leaves, to Part 5, Part 2, history): while the rewrite runs it is the writer's method; once the skill is written, the skill is its result and the entry is history.
- `POSITIONS.md:136`, "The statement for the public record on the usage limit." (leaves, to cloud-container machine, Part 2, history): he asked for it on the public record; the history file and the note keep it public.
- `FACTS.md:190`, "A boot after a compaction costs about 74K tokens of context ..." (leaves, to Part 6): the boot uses it, but it's a measurement for estimating, so the analyst's part; the core's boot points to it.
- `FACTS.md:192`, "The disk allowance fills with parser-generation temp directories ..." (leaves, to fortress-repo build, cloud-container machine): the leak is a defect of the original tree, which ledger row 702 keeps; what a worker does about it is fortress-repo's.
- `FACTS.md:203`, "`explorations/experiment/env.sh` is the one script every probe and gate runner sources ..." (stays in FACTS; its rule is already in fortress-repo build): it describes the repository's own script, not the platform; it stays, moved to "The harness and the gate".
- `FACTS.md:219`, "The ledger's rows stand in fifteen topic sections ..." (leaves, to fortress-repo records, Part 4): as for "The gap ledger's form.": the rows are the project's, the file's form is how we keep the record.
- `POSITIONS.md:8`, "How he weighs his calls where the designers left no word." (stays): it is his stance on the project's decisions. Its sentence that he has not read the specification, the papers or the library is part of the profile of what he knows, which the plan keeps out of the rewrite (section 6, point 1). It stays until that profile is built.
- The heading "History he knows (do not re-explain)" (`POSITIONS.md:14`) is not an entry. Its instruction, do not re-explain, goes to Core 1. Its four entries stay.

### 2.4 The split entries

Each gives the text that leaves, word for word, or its start and end, and what stays.

- `POSITIONS.md:19`, "The third-party Java 9 port": leaves to fortress-repo records, 75 characters: "gets no credit and no mention: "I don't wanna see them mentioned anywhere."". Stays: the state of the lineage: CLAUDE.md, the cleanup that waits in PLAN, the branch not renamed.
- `POSITIONS.md:27`, "The library's own practice is the standard.": leaves to Part 3, 163 characters: "A fork put to him names the library's own way first, and a fork resting on a rule that refuses something says what the library does instead (protocol principle 2).". Stays: the library as the standard, his words on it, and the lesson of the diagonal.
- `POSITIONS.md:32`, "The territory map": leaves to Core 6, 59 characters: "the boot order is followed as written, `INDEX.md` included.". Stays: what the map is and why it exists.
- `POSITIONS.md:33`, "The plan": leaves to Part 3, 114 characters: "His answers come in the plan's order; the re-approval rows and the other off-path items are parked until relevant;". Stays: the six phases, the two landed, and row 41's place.
- `POSITIONS.md:87`, "The model's text is the notation.": leaves to Part 4, 54 characters: "The ledger is one file; two views are derived from it.". Stays: the notation, the diff shown before any model line changes, and decision D's diff.
- `POSITIONS.md:123`, "The gate's comparisons.": leaves to fortress-repo gate, fortress-repo tests-writing, Part 2, 491 characters: "A comparison masks Java line numbers, identity hashes and moved library positions, with every masked differenc … s a script change put to him on its own (parked, `PLAN.md`);" and "A team test line the flat tower breaks is respelled keeping the value the test checks, no assertion deleted, every such line listed for him with its before and after.". Stays: row 366 waits; no route C entry goes into Proposed Features.
- `FACTS.md:66`, "The checker-count stage's table, `gate/checker-count.txt`, lands with every batch ...": leaves to Part 2, 250 characters: "and the post-batch review ties every new or risen row to a named rung edit, reading the landed table (`coordin … d "The checker count, and a rung whose test is that stage").". Stays: the stage's table, where it lands and when the gate is red.
- `FACTS.md:111`, "The checker-count and distance stages read only the compiler's phases ...": leaves to Part 2, 557 characters: "The batch script acts on it by its `STAGE_BLIND` rule (`coordinator/climb-batch-workflow.js:720-721`): a rung … branch's diff (its check 1, `climb-batch-workflow.js:885`);". Stays: that the two stages read only the compiler's phases, and what that excludes.

### 2.5 The entries that stay, counted by section

POSITIONS:

- "The goal": 6 of 6 stay.
- "History he knows (do not re-explain)": 4 of 4 stay. "The third-party Java 9 port" gives a clause to `fortress-repo`.
- "The standard and the sources": 8 of 9 stay. Three give a clause ("The library's own practice is the standard.", "The territory map", "The plan"). "Development-loop performance is a first-class concern." leaves.
- "The one library and the compiled checker": 24 of 26 stay. "The checker count is measured, never red." and "The separate analysis session's scope." leave.
- "Numbers": 15 of 15 stay.
- "Arrays and the model program": 8 of 8 stay. "The model's text is the notation." gives a clause.
- "The specification's revision": 4 of 4 stay.
- "How we work": 3 of 35 stay. "The gate's comparisons." keeps two clauses. "The specification's examples join the gate at zero red." and "The suites run Fortress in parallel." stay whole. All three move to a project section.
- "How he wants to be spoken to": 0 of 6 stay.

FACTS:

- "Execution model": 23 of 23 stay.
- "The checker and the one library": 63 of 63 stay. The entry on the checker-count stage's table (`:66`) gives a clause.
- "The harness and the gate": 18 of 18 stay. The entry on what the two stages read (`:111`) gives a clause.
- "Landed semantics": 32 of 32 stay.
- "The library's arrays and algebra": 9 of 9 stay.
- "The specification and the repository's lineage": 15 of 15 stay.
- "The territory map": 7 of 7 stay.
- "The container": 1 of 27 stays, the entry on `env.sh` (`:203`), which moves to "The harness and the gate".
- "The ledger": 0 of 1 stays.

### 2.6 The held list

84 points in six sections (`HELD.md:5` to `:135`): 23 rules to write, 32 open questions, 17 settled, 11 done, 1 owed. They land 27 times in the core, 48 times in the parts, 15 times in `fortress-repo` and once in `cloud-container`. The 28 settled or done can close now, each with a line that names what settled it. The 23 rules go to the writer beside POSITIONS's texts. Most of the rules and questions of 12 and 13 Oct already map to decisions in the plan's section 4: decisions 4, 8 to 12, 14, 16, 20, 21 and 24. The record-keeping questions of 13 Oct (`HELD.md:7`, `:14`, `:15`, `:17`, `:19`) are Part 4's, and the questions on the batch workflow of the 27 Sep section (`:83`, `:116`, `:117`, `:123`, `:125`) are Part 2's.

### 2.7 Index by source line

Every sorted line, with where it goes. "Leaves" is whole, "in part" is a split entry.

- `POSITIONS.md`: 19 in part → fortress-repo records; 27 in part → Part 3; 31 leaves → Part 6; 32 in part → Core 6; 33 in part → Part 3; 39 leaves → Part 2; 61 leaves → Part 1; 87 in part → Part 4; 102 leaves → fortress-repo tests-writing, Part 2; 103 leaves → fortress-repo SKILL.md, Part 2; 104 leaves → Part 2, fortress-repo worktrees, fortress-repo SKILL.md; 105 leaves → Part 1; 106 leaves → Core 2, Part 2; 107 leaves → Part 3, Core 3; 108 leaves → Part 1, fortress-repo records; 109 leaves → Part 2; 110 leaves → Part 1, Part 2, Part 3; 111 leaves → Part 2, fortress-repo interpreter; 112 leaves → Core 2, fortress-repo exploring; 113 leaves → Part 2; 114 leaves → fortress-repo gate, Part 2; 115 leaves → fortress-repo committing, Part 2, dropped; 116 leaves → fortress-repo committing, Part 2, Core 5; 117 leaves → Part 1, Core 4; 118 leaves → Part 2; 119 leaves → Part 1, Core 2; 120 leaves → Part 2; 121 leaves → Core 2, Part 2; 122 leaves → Part 2, history; 123 in part → fortress-repo gate, fortress-repo tests-writing, Part 2; 124 stays → fortress-repo gate; 125 stays → fortress-repo SKILL.md; 126 leaves → Core 3; 127 leaves → Part 1, Core 4, cloud-container stops; 128 leaves → fortress-repo records, cloud-container hooks, cloud-container container-loss, Part 4, Part 6; 129 leaves → Part 4, fortress-repo committing; 130 leaves → Part 4, fortress-repo records; 131 leaves → Part 2, Part 5; 132 leaves → Part 5, history; 133 leaves → fortress-repo records, Part 4, in flight; 134 leaves → Part 5, Part 1, Part 2, Core 3, fortress-repo SKILL.md; 135 leaves → Part 5, Part 2, history; 136 leaves → cloud-container machine, Part 2, history; 140 leaves → Core 3; 141 leaves → Core 3, Core 2; 142 leaves → Core 2; 143 leaves → Core 1; 144 leaves → Core 3, Core 4; 145 leaves → Core 3.
- `FACTS.md`: 66 in part → Part 2; 111 in part → Part 2; 189 leaves → Part 6; 190 leaves → Part 6; 191 leaves → fortress-repo session, fortress-repo records; 192 leaves → fortress-repo build, cloud-container machine; 193 leaves → cloud-container container-loss; 194 leaves → cloud-container hooks, Core 5; 195 leaves → cloud-container machine, Part 1; 196 leaves → cloud-container stops, Part 1; 197 leaves → cloud-container stops, Core 3; 198 leaves → cloud-container container-loss; 199 leaves → cloud-container hooks, cloud-container container-loss; 200 leaves → Part 1, Core 4, fortress-repo session; 201 leaves → Part 1, fortress-repo session; 202 leaves → cloud-container stops; 203 stays → fortress-repo build; 204 leaves → fortress-repo session, Part 1; 205 leaves → Part 1, Part 5; 206 leaves → Part 1; 207 leaves → cloud-container stops; 208 leaves → Part 1, Part 2; 209 leaves → Part 1, Part 2; 210 leaves → fortress-repo session, Core 4, cloud-container hooks; 211 leaves → fortress-repo committing, Core 5, history; 212 leaves → Part 1, Part 6; 213 leaves → Core 3; 214 leaves → Core 3; 215 leaves → Core 4; 219 leaves → fortress-repo records, Part 4.
- `HELD.md`: 7 question → Part 4; 13 done → Part 5; 14 question → Part 4; 15 question → Part 4; 16 rule → Part 4; 17 question → Part 4; 18 rule → Part 4; 19 question → Part 4, Part 6; 20 settled → Part 4; 21 question → Core 2, Part 1; 27 rule → Core 5, Part 5; 28 rule → Core 5; 29 rule → Part 5, Part 4; 30 rule → Core 3, Part 1; 31 rule → Part 4; 32 rule → Part 6; 33 settled → Part 4; 34 rule → Core 3; 38 rule → Part 1; 39 rule → Part 1, in flight; 40 rule → Core 2; 41 question → Core 5; 42 settled → Core 5; 43 question → Part 4; 49 question → Core 3; 50 rule → Core 3; 51 rule → Core 3; 52 rule → Core 3; 53 question → Core 3, Core 1; 54 question → Core 3; 55 rule → Core 3; 56 rule → Core 3, Part 2; 57 question → Core 3; 58 rule → Core 6, cloud-container hooks; 59 rule → Core 3; 60 question → Core 3; 61 rule → dropped; 62 rule → Core 1, Part 6; 63 question → Core 2; 64 question → Core 2; 65 question → Core 2; 66 rule → Core 2; 67 rule → Core 2, fortress-repo exploring; 75 settled → fortress-repo records; 76 settled → Part 4; 77 settled → fortress-repo records; 78 settled → Part 4; 79 question → Core 1; 80 question → Part 3; 81 question → Part 4; 83 question → Part 2; 88 done → Part 6; 89 settled → fortress-repo committing, Part 2; 90 done → Part 2; 91 settled → fortress-repo tests-writing; 92 owed → in flight; 93 done → Part 2; 97 done → Part 6; 98 done → Part 6; 99 done → Part 6; 100 settled → fortress-repo SKILL.md; 101 done → Part 2; 102 done → Part 6; 106 settled → fortress-repo SKILL.md; 107 settled → Part 6; 108 question → Part 6; 112 settled → Part 6; 113 question → Part 6; 114 done → Part 2; 115 question → Part 6; 116 question → Part 2; 117 question → Part 2; 118 question → Part 6, fortress-repo tests-writing; 119 question → Part 1; 123 question → Part 2; 124 done → Part 6; 125 question → Part 2; 126 settled → fortress-repo SKILL.md; 130 settled → fortress-repo SKILL.md; 131 question → fortress-repo library; 132 question → fortress-repo library; 133 settled → fortress-repo library; 134 settled → fortress-repo library; 135 question → fortress-repo tests-writing.

## 3. What it does to the consolidation

### 3.1 What leaves each file

- **POSITIONS**: 113 entries, 101.5K characters. 41 leave whole (47.6K) and 6 leave in part (1.0K of their 3.4K): 48.5K leave, 48 percent. 66 entries stay whole, 2 of them borderline, and the 6 split entries keep 2.4K: 53.0K stay. "How we work" loses 32 of its 35 entries (42.3K of 44.2K) and "How he wants to be spoken to" all 6 (4.7K). Outside those two sections, 3 entries leave whole and 5 give a clause.
- **FACTS**: 195 entries, 256.4K characters. 27 leave whole (28.2K) and 2 leave in part (0.8K of their 2.8K): 29.0K leave, 11 percent. 166 entries stay whole and the 2 split entries keep 2.0K: 227.4K stay. "The container" loses 26 of its 27 entries and "The ledger" its one.
- **Where they land**: 76 entries leave whole or in part. 68 of them have a home in the new skill: 25 in the core and 52 in the parts, some in both. 24 have a home in `fortress-repo`, which already holds 21 of them in full; the 3 new pieces are what a gate comparison masks (POSITIONS 123), the model-identifier line (POSITIONS 129, decision 22) and the rule on the third-party port (POSITIONS 19). 14 have a home in `cloud-container`, which already holds 10; the 4 new pieces are the usage limit (POSITIONS 136), a VM restart that rolls the disk back (FACTS 197), where the backup hook is registered (FACTS 199) and recovery as a lesson about the platform (POSITIONS 128).

### 3.2 What the consolidation still has to do

1. **POSITIONS's pass covers half the file.** It covers 72 entries, 6 of them in part, about 53K: the goal, the history he knows, the decisions on record and the three entries of "How we work" that stay.
2. **It does not rewrite the evicted entries.** They stay as they are until the new skill holds them and the check against the kept list has read them, as the plan's step 3 has it (decision 17). The writer works from the rule texts as they stand (plan section 2, point 6). Then each leaves whole to `POSITIONS-history.md`, with one line that names its home. Rewriting them first would spend tokens on text that is about to leave, and would hand the writer compressed rules, the problem he met on the sort page (`HELD.md:67`).
3. **A split entry is written to the form, its moving clause kept and marked.** The pass rewrites the part that stays now. The clause in section 2.4 stays in place, marked, until its home holds it, and then goes to the history.
4. **After the moves, POSITIONS's last two sections go.** "The gate's comparisons." (its two staying clauses), "The specification's examples join the gate at zero red." and "The suites run Fortress in parallel." move to a project section, for example "The suites and the gate". The header comment stops pointing to the protocol for how we work, and says the file holds the project only.
5. **FACTS's second pass is almost unchanged.** It covers 168 entries, 2 of them in part, 227K: 89 percent of the file. The container entries wait for the writer's step (plan step 6) and the `cloud-container` rewrite (step 13). Six are already held in full by `fortress-repo` or `cloud-container` and can go to `FACTS-history.md` now: `:191`, `:192`, `:193`, `:198`, `:202` and `:207`. The `env.sh` entry moves to "The harness and the gate".
6. **The held list.** The 28 settled or done points can close now. The 23 rules and 32 questions stay until the writer and the curator have them (section 2.6). The owed answer stays with what is in flight.

### 3.3 What it changes in the plan

1. **Decision 23, FACTS's container section.** His ruling of 09:16 answers it toward moving: the section is not about the project. Section 2.2 gives each entry's home. The default, "keep it, and decide at the outline", no longer fits. The timing stays his: the coordinator's entries at step 6, the platform's at step 13.
2. **The writer's brief, point 2.** It names as the rule texts POSITIONS's two sections on how we work and the protocol. The texts should also include the 3 entries and 5 clauses of POSITIONS that leave from other sections, the 2 FACTS clauses, the 26 container entries and the ledger entry, and the held list's rules and questions, each with the home this note gives it.
3. **The writer's brief, points 4 and 7.** The candidate modes and the facts in the core change as section 1.4 says.
4. **Step 12, retiring the old homes.** The new pieces for `fortress-repo` and `cloud-container` in section 3.1 join the list for that step.

## Sources

1. The task: the curator's words of 09:16, 11:40 and 15:25 UTC, quoted in the coordinator's brief for this note; `explorations/coordinator/HELD.md:13`, `:28`.
2. The outline's starting point: `coordinator-rewrite-plan.md`, section 3, points 4 to 7, section 4 (decisions 5, 6, 17, 22, 23, 24) and section 6; POSITIONS, "The coordinator rewrite's goals." (`POSITIONS.md:135`) and "The skills are written for a reader new to the repository ..." (`:134`).
3. The rules' sorts and their shapes: `rule-sort.md`, sections 2, 3 and 5; `rule-sort-b.md`, "Facts the skill should state instead" and "The shape of the skill"; `coordinator-shape.md`, sections 3.1 to 3.5 and 8.
4. What the model does by default: the Opus answers of the baseline interview, under `baseline-interview/answers/`, answers 1 to 4, 6, 9, 15 and 16.
5. The other skills' current text: `.claude/skills/fortress-repo/SKILL.md` and `references/session.md`, `build-and-caches.md`, `worktrees.md`, `tests-writing.md`, `gate.md`, `committing.md`, `records.md`, `exploring.md`, `library.md`, `interpreter.md`; `.claude/skills/cloud-container/SKILL.md` and its four parts. "Already there" was checked against these files at `77ab93037`.
6. The record-keeping part: `process-engineering/record-rule-draft.md`, Part 2, items 39 to 45, and "What `fortress-repo`'s `references/records.md` would need to change"; `process-engineering/record-store-design.md`, sections 3.6 and 5.
7. The counts: each entry line of `POSITIONS.md` and `FACTS.md` at `77ab93037` (lines that start `- `), measured with Python's `len`; the files are 102.9K and 257.8K characters with their headings and header comments.
