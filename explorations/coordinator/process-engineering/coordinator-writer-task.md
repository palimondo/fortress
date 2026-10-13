<!-- The skill writer's task for the `coordinator` skill, given after its standing brief (`explorations/coordinator/skill-writer-brief.md`), written 2026-10-13 for step 6 of `coordinator-rewrite-plan.md`: the brief, the map of homes, the rule texts by reference, and the decisions taken at their defaults. -->

# Write the `coordinator` skill

"You" is the writer, and "the curator" is the person who directs the restoration. Read every source yourself. This task names the sources and adds no rule. `pe/` stands for `explorations/coordinator/process-engineering/`.

- An **entry** is a line of FACTS or POSITIONS under its permanent number, such as `F-87` or `P-48`. Print entries by number: `explorations/coordinator/tools/facts-extract.sh P-143 P-144`.
- **HELD n** is line n of `explorations/coordinator/HELD.md` at `55847bd34`. If the file has changed, read `git show 55847bd34:explorations/coordinator/HELD.md`.
- **The plan**, **the outline** and **the review** are `pe/coordinator-rewrite-plan.md`, `pe/coordinator-skill-outline.md` and `pe/coordinator-skill-outline-review.md`.

## 1. The brief

1. **Your task.** Write the `coordinator` skill from scratch, in `.claude/skills/coordinator/`. Its reader is the coordinating session, which talks to the curator, briefs the workers and keeps the record. The skill is that session's one home for how it works. It replaces `explorations/protocol.md` and the rule sections of `explorations/coordinator/README.md`. It holds what the model would not do by itself, in this environment and this project (`explorations/coordinator/baseline-interview/README.md`). It keeps every role (point 4). It says plainly what goes where in the record. It gives a lighter boot that keeps the curator's awareness: the coordinator knows the project without him, never asks a decision again, and never sends a worker to measure what is on record. FACTS, POSITIONS and INDEX keep serving the workers' briefs.
   - The coordinator empties the folder before you start, and git keeps the old files (the plan, section 5, point 3). Only `SKILL.md`'s frontmatter is left: its name and description stay (the plan, section 6, point 6). Write the core below it.
   - Commit, and do not push. Edit no record file and no other skill.
2. **What you get.**
   - The method: P-135, the rewrite's goals, and P-134, how skills are written and checked.
   - The records' map, whole: `pe/coordinator-shape.md`. Its section 4.1 gives each rule's lines at `fb1aa7c7b`.
   - The origins of the most duplicated rules: `pe/duplicated-rules-evidence.md`, sections 1 to 12. Read the section of any such rule that you write.
   - The two sorts, for their facts and shapes, never for a rule's wording: `pe/rule-sort.md`, sections 2 and 5; `pe/rule-sort-b.md`, "Facts the skill should state instead", "What the interview shows that no rule covers" and "The shape of the skill".
   - The seven writing principles: `explorations/reviews/skills-writing-principles.md`.
   - The record-keeping part, finished: Part 2 of `pe/record-rule-draft.md` (lines 117 to 369), opening with "What an entry is". It is the content of Part 4. The record is written by `explorations/coordinator/tools/record.py` (usage in its header) and read by `facts-extract.sh` with `F-87`, `F-87+` and `history:F-87`. The design is `pe/record-store-design.md` as amended by `pe/record-store-review.md`, section 3. Where they differ, describe the tool as its header does, since a part states the tree as it is. Part 2's last two sections are edits for step 12: make none now.
   - The evidence: `git show 55847bd34:explorations/coordinator/BOOT.md`, the paragraph "Evidence of 2026-10-12 for the writer's brief".
3. **What you don't get.**
   - The existing skill: no file of its folder, its `references/sources.md` included, and not its text in git.
   - FACTS, INDEX and the transcripts, except the entries this task names, printed by number. FACTS's container entries reach you this way, never by reading FACTS whole.
   - The register of what you read. The record is written in agent shorthand.
4. **First, the modes.** The modes are the outline's six parts, as the review's section 3.2 gives them: delegating; running and reviewing a batch; planning the road; keeping the record; rewriting a skill; analysis.
   - Talking, asking and deciding are the core, not a mode.
   - The five roles: the executive assistant is the core, the briefer of workers Part 1, the batch coordinator Part 2, the roadmap architect Part 3, the analyst Part 6 (the outline, section 1.3).
   - Before any rule, describe each mode: the work, what starts it, and what it needs loaded. You may merge or split a part, with the reason in your report (decision 6).
5. **The shape.** The review's sections 3.1 and 3.2: a core of seven sections, always loaded, and six parts, each loaded when the coordinator switches into its work. No part restates another. It points.
   - The core holds the facts of point 7 and a few general principles. The standing goal comes first: model what the curator knows and fill his gaps with the facts he needs to decide. Then his right to decide, how to talk to him in each situation, what goes where in the record, and the boot.
   - Concepts first, as a dictionary, then short procedures.
   - The core is about 10K bytes. The whole skill is no longer than the 41K bytes of the skill it replaces, its sources file aside.
   - Organize the record as the model organizes knowledge by itself. The curator calls this the rewrite's highest risk. The interview showed the model's own shape: a short current-state file, with decisions and history apart. That shape needs no instruction.
   - A rule that binds workers belongs in `fortress-repo`.
6. **The kept rules.** A rule is kept when the failure it guards against is on record. The interview alone drops nothing. Write each rule from its text in POSITIONS or the protocol, at its home in section 2. Step 7's check reads this list.
   - Talking and asking:
     - Ask one thing per message, in the context its text gives (decision 9).
     - An ask gives the question, the context, the options, what a yes commits him to and what a no costs. The recommendation comes last.
     - No dialog tool: its prompt times out after about 60 seconds in the iOS client, so the rule lapses if the client changes.
     - Lists, not tables: the iOS client shows a table as one scrolling line.
     - Numbers as K or M: 5K, 1.2M.
     - Define a term that is new to him where you use it.
     - "Read the clock before writing any time" (decision 12).
     - Nothing about a running batch until it lands or fails, and nothing when it starts (decision 16).
     - Record edits: he hears "noted" (decision 11).
     - The git-check hook's reminders answered silently; at each process start, the hook reset and he told in a line (decision 24).
     - While he reads turn by turn, restate each of his points in a line, with his message's time, and hold it (decision 13). Reply when he says he is done. This guards against the wall-of-text spiral.
     - A document for his approval goes as a page, with a Select button per larger section and the references at the bottom: P-145's full sentence, in the core (decision 21).
   - Deciding:
     - His role: he sets the goals and decides the design and process questions put to him (decision 10). A bare go starts background work only. A batch run waits for his explicit go. For the phase-3 batches, his standing go is that go. A standing approval covers only what it names.
     - Search the record before you ask him anything or measure anything.
     - A decision inside a worker's report is not made until he sees it. Write it from POSITIONS's text on which decisions reach him and how. `fortress-repo` tells workers which choices are theirs.
     - What makes a decision consequential, and the three ways it reaches him.
     - A reversible stop does not hold a batch (decision 7).
     - When something goes wrong, a deeper pass, not a halt or a rollback.
     - Weigh a rule against its purpose and its cost.
     - A remark is not a decision. A go is written nowhere.
   - Delegating and briefing:
     - Give reading to workers. Read their reports and the record.
     - Probe a fork before a batch is briefed (decision 7).
     - Give idle time to parked research. Discuss a new deliverable with him first.
     - A brief states the problem, not the expected answer, points at the research on file, and hands over the record's measurements as findings.
     - A clean worker is clean of our options, not of our measurements.
     - Which tier runs what, the Fable rule, and a two-area decision in two steps: cheap evidence, then top-tier judgement.
     - Watch a long run against its estimate. The spend is the coordinator's to watch.
     - Estimates in the project's units. A token count counts writes only.
     - The writer makes every skill edit, and a cold read follows. A comment marks a problem area.
   - Boot and the record:
     - The boot order. The trial boot settles what is read whole and what is looked up (decision 5).
     - FACTS read whole at boot; no directory listings at boot, every output bounded; what is in flight read from the tree (decision 7).
     - Whether a worker still runs: the harness's notice, and a check on its one output path.
     - `git log`, one line in the boot order (decision 15).
     - The boot note is rewritten whole, never appended to.
     - One home per thing. His words are written once, in POSITIONS.
     - FACTS and POSITIONS state the present. History goes to the history files.
     - Consolidate before each batch. Run the check that nothing was lost before the commit.
     - Cite an entry by its bold title. A title that no longer holds is rewritten, its old text kept in the history and every citation updated.
     - Part 4's sources give the last four their current form: the number is the key (Part 2, items 5 and 7), his words condensed and his dictation kept in the history (items 25 and 26), the check `record.py check --base`.
   - Dropped at his word: the line about the work-in-progress branches.
   - Dropped, no failure on record (decision 8): label which part of a reply answers which; take a step a yes covers without asking again; a fact enters in the commit that establishes it (Part 2's item 45 keeps it in the pass). "Search the record for how it was done last time" folds into the search above.
   - New, at his word (decision 14): no do-nothing option among the choices; a brief for an update caps its length against the version before.
7. **The facts stated instead of rules.**
   - He reads on an iPhone, often with iOS Speak at a fast rate, and writes by dictation. A repository path does not open there; a page link or a GitHub link does. His client can show stale state, and the tree is the truth.
   - His time zone is Central European. The container's clock is UTC.
   - The context is compacted when it grows long. The container can be lost, and only what is pushed survives. The record lives in the repository.
   - The session runs in auto mode. Its permission check can refuse a step after his go.
   - The prompt cache lives an hour for the main session and a headless session, five minutes for a subagent.
   - The platform stops the session's process about every 13 hours. Check-ins armed with `send_later`, 45 minutes apart, wake the session.
   - A message he sends during a turn is queued. A stop during a turn kills the running agents.
   - The git-check hook asks for a commit after every turn. Its reminders are advisory.
   - Cached reads are almost free on his plan, so a cost counts tokens written only.
   - The tiers: the workers run on Opus. The session's tier is his to set, and the boot note names it. Sonnet does archaeology, and nothing he reads. Fable judges a design question that spans two areas, and runs the reviews he pre-approved. Any other Fable work needs his yes.
   - The Workflow's mechanics are Part 1's, not the core's (section 2).
8. **The failures the kept rules guard against.** Unchanged from the plan: its section 3, point 8 (lines 269 to 283), with its sources at line 308. The evidence paragraph adds the later clock slips of 10-13.
9. **The writing standard.**
   - Your standing brief, sections 1 to 4.
   - The seven writing principles, and the register the skill teaches for talking to him: plain short sentences with contractions, no flourish, no coda after a semicolon, a choice numbered so that he can answer "3b", and no internal shorthand.
   - Provenance goes in a new `references/sources.md`, as your standing brief says.
   - No model identifier anywhere. Name models by tier.
   - Run `python3 explorations/coordinator/tools/skills-lint.py` on your files before each commit.
10. **How your draft is checked.**
    - Step 7: a worker checks the draft against point 6's list and the outline's section 2 as the review changes it. Each kept rule and each leaving entry is found in its home, or listed as lost.
    - Step 8: the trial boot (decision 5).
    - Step 9: the cold read, by a reader given only the skill (`explorations/coordinator/skill-cold-read-brief.md`). The coordinator reviews its flags, and you fix them.
    - The curator reads each part whole, on a page. A comment marks a problem area; you fix it at the level of its paragraph or section. The coordinator settles your minor decisions not taken from the record. He is asked only where a rule would change its meaning or a new rule would enter.
11. **Your report.** As your standing brief's section 6 says, with each part you merged or split and its reason.

## 2. The map of homes

Work through the homes in order. What lands from each source is the outline's line under that home in its section 2.2, with the review's section 3.3 applied here. The outline's `POSITIONS.md:143` is P-143, and its HELD lines are 16 lower: its `HELD.md:21` is HELD 37. "(clause)" marks an entry that leaves in part; its clause ends its line, marked "(moves to …)". The protocol's rules land at the homes the review's section 3.1 names.

- **Core 1, the standing goal:** P-143; "do not re-explain", from POSITIONS's heading "History he knows (do not re-explain)"; delegation, `explorations/protocol.md:126-129`; HELD 69, 78, 95.
- **Core 2, his role and his decisions:** P-106, P-112, P-119, P-121, P-141, P-142; the side remark and the one-off go, `protocol.md:158-159`; a rule weighed by its purpose and cost, `protocol.md:5-8` and `:172-173`; HELD 37, 56, 79 to 83.
- **Core 3, talking to him:** P-107, P-126, P-134, P-140, P-141, P-144, P-145; F-197, F-213, F-214; HELD 46, 50, 65 to 73, 75, 76.
- **Core 4, the facts of this environment:** P-117 (the tiers; the session's tier his to set, for his two reasons; the current tier the boot note's), P-127, P-144; F-200, F-210, F-215.
- **Core 5, the record, what goes where:** P-116; F-194, F-211; HELD 43, 44, 57. Which skill holds what stands here only, from his rulings of 09:16 and 11:40 (the outline, lines 7 and 8).
- **Core 6, the boot:** P-32 (clause); the bounded boot, `protocol.md:129-130`; HELD 74.
- **Part 1, delegating:** P-61 (its general rule only), P-105, P-108, P-110, P-117, P-119, P-127, P-134; F-195, F-196, F-200, F-201, F-204 to F-206, F-208, F-209 (the Workflow's mechanics, their one home), F-212; HELD 37, 46, 54, 55, 135. Placed by this task: HELD 7, on Fable reviews.
- **Part 2, running and reviewing a batch:** P-39 (it stays in POSITIONS; cite it), P-102 (clause), P-103 (clause), P-104, P-106, P-109 to P-111, P-113 to P-116, P-118, P-120 to P-123 (P-123 clause), P-131, P-134 to P-136; F-66 (clause), F-111 (clause); for F-201, F-208 and F-209, say when a batch resumes and point to Part 1; HELD 72, 99, 132, 133, 139, 141.
- **Part 3, planning the road:** P-27 (clause), P-33 (clause), P-107, P-110.
- **Part 4, keeping the record:** point 2's record-keeping sources; P-87 (clause), P-128 to P-130, P-133; F-219; HELD 23, 30 to 35, 45, 47, 59, 96, 97. Placed by this task: HELD 13 to 19, his comments on the record store's design, which `pe/record-store-review.md`, section 2, answers.
- **Part 5, rewriting a skill:** P-131, P-132, P-134, P-135; F-205; HELD 43, 45. For which skill holds what, point to Core 5.
- **Part 6, analysis:** P-31, P-128; F-189, F-190, F-212; HELD 35, 48, 78, 124, 129, 131, 134.

Not this skill's text. Write none of it, and point to its home where one of your rules meets it:

- The homes in `fortress-repo` and `cloud-container` (steps 12 and 13), and the last three groups of the outline's section 2.2.
- What stays in the record: P-39, P-124, P-125, F-203, and the staying parts of the split entries.
- The held list's settled and done points.

## 3. The rule texts

Read each whole, as it stands now, for its content only.

- POSITIONS's sections "How we work" and "How he wants to be spoken to" (`explorations/coordinator/POSITIONS.md`, lines 108 to 148 at `55847bd34`): P-104 to P-122, P-126 to P-136 and P-140 to P-145, which leave whole and are not rewritten before step 12. From "The suites and the gate", the clauses of P-102, P-103 and P-123.
- The entries that leave POSITIONS from its other sections: P-31 and P-61 whole; the clauses of P-27, P-32, P-33 and P-87. P-19's clause goes to `fortress-repo`.
- FACTS: the clauses of F-66 and F-111; F-189 to F-215 but F-203, the container section; F-219, the ledger.
- The protocol, `explorations/protocol.md`, whole: its hard rules, its six principles and "What keeps going wrong".
- The held list's rules and questions that section 2 names.
- A rule with no home in POSITIONS or the protocol: the line that `pe/coordinator-shape.md`, section 4.1, gives it in the README, FACTS or the boot note, read with `git show fb1aa7c7b:PATH` (the plan, section 5, point 2).

## 4. Decisions taken at their defaults

The plan's section 4 decisions that this task depends on, each with the default taken and why.

- 2, what FACTS and POSITIONS both tell: POSITIONS the decision, FACTS the state, linked by number. Why: Part 2's item 27 builds on it.
- 3, INDEX's form: unchanged until the trial boot. Why: it shows how INDEX is read.
- 4, a length check: the script. Why: `record.py check` reports each entry over 600 characters.
- 5, the trial boot: after the draft and the check, step 8. Why: it tests the draft's boot.
- 6, the modes: the outline's six parts, merged or split with a reason. Why: they cover the five roles.
- 7, the five rules no failure search covered: all kept, each with a home. Why: the interview alone drops nothing.
- 8, the four rules with no failure found: dropped, one folded into the search. Why: no copy followed a failure.
- 9, four rules' origins: each written from its POSITIONS text, no scout. Why: his ask at 16:00 (HELD 83).
- 10, his role: "He sets the goals and decides the design and process questions put to him." Why: his comment of 00:06 (HELD 56).
- 11, record edits: "noted". Why: his own word (HELD 73).
- 12, the clock rule: the boot note's "Read the clock before writing any time". Why: the record does not say which wording worked.
- 13, a long dictated message: the held list's form, a line per point with its time. Why: the form in use.
- 14, two lessons with no rule: one line each, in Core 3 and Part 1. Why: both are his (HELD 50, 54).
- 15, `git log` at boot: one line. Why: the boot note can lag a worker's push.
- 16, a message when a batch starts: none. Why: his word at 15:38 (HELD 72).
- 17, POSITIONS's conduct entries: unchanged until step 12, then to the history with their homes named. Why: earlier, no file the boot reads would hold the rules.
- 18, where the facts live: the core, the detail in the cited notes and `FACTS-history.md`. Why: the container section leaves FACTS.
- 19, the rules he did not reach on the sort page: judged in the draft. Why: the short names did not let him judge (HELD 83).
- 20, the homes of 10-12: as settled, the boot note the one home of state. Why: his to overturn (HELD 58).
- 21, the Select-button rule: P-145's full sentence in the core. Why: a summary could not carry it (HELD 76).
- 23, FACTS's container section: moves by its homes, the coordinator's entries now, the platform's at step 13; F-203 stays. Why: his ruling of 09:16.
- 24, the git-check hook: reset at each process start and told in a line. Why: his comment of 15:42 (HELD 74).
- The review's own: P-39 stays whole, P-102 and P-103 in part. Why: his decisions on the project's suites and gate.
- Not taken here: 1 (answered), 22 and 25 (later steps).
