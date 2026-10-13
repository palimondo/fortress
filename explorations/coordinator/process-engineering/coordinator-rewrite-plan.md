<!-- The plan of the `coordinator` skill rewrite by the method on record, written 2026-10-13 by an Opus worker for the curator: the steps from tonight's FACTS consolidation to `cloud-container`, each with what it produces, who does it, its cost and what it needs from him; where the boot note's order and POSITIONS differ; the writer's brief as a draft; his decisions with their defaults; and what stays out of the rewrite. -->

# The coordinator rewrite: the plan

This plan follows the method on record: your decision on the rewrite's goals, and your decision on how the skills are written and checked. It adds no step, rule or tool. Where the record is silent, or two entries pull different ways, it lists a decision for you with the default the record suggests.

Times are UTC, dates 2026. A cost is tokens written. A cost marked "estimate" isn't measured. The files to open: [this plan](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/process-engineering/coordinator-rewrite-plan.md), [the map](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/process-engineering/coordinator-shape.md), [sort A](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/process-engineering/rule-sort.md), [sort B](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/process-engineering/rule-sort-b.md), [the rules' origins](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/process-engineering/duplicated-rules-evidence.md), [the held list](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/HELD.md).

Words used here:

**coordinator**
: Session that talks to you, briefs the workers and keeps the record.

**record**
: Files under `explorations/` that hold the project's memory: FACTS (what's established), POSITIONS (your decisions), INDEX (one line per note), PLAN (the working plan), the boot note (what's in flight), the held list (your points held while you read) and the history files.

**conduct rule**
: Rule about how the coordinator works. The map counts 73 of them, written in 249 places.

**map**
: Note that describes the coordinator's records before the rewrite: where each kind of content lives, its size, its repeats and the open questions.

**baseline interview**
: Eighteen questions that fresh Fable and Opus sessions answered with no record and no skill, to show what a model does by default.

**sort**
: Note that puts each conduct rule in a bucket against the interview: done by default, kept, or a rule for workers. Sort A is the coordinator's, and you commented on its page. Sort B is an Opus worker's, made without reading A.

**consolidation**
: Rewrite of FACTS or POSITIONS to the present state. Every cut sentence goes word for word to the history file, and a script checks that nothing was lost.

**writer**
: Opus session that edits the skills. It runs headless, outside this session, so its prompt cache lasts an hour. A script starts and resumes it.

**cold read**
: Reading of a rewritten skill by a fresh Opus agent given only the skill. It flags what would send its reader wrong or make it search, and edits nothing.

**mode**
: Kind of work the coordinator switches into, such as running a batch.

**core**
: Part of the skill that's always loaded.

**trial boot**
: Test the map proposes: an old boot and a new boot answer one quiz on the project's state, scored without knowing which boot answered.

## 1. The steps, in order

After tonight's 3M, the steps come to about 3.5M more. INDEX's form and the two optional scouts would add up to 2M more. Every figure is an estimate except where a step says measured.

1. **Finish FACTS tonight.**
   - Produces: FACTS slices 2 to 7 cut to what a decision needs, every cut sentence in the history file. Then one Fable check over all six.
   - Who: Opus workers, one slice at a time, then Fable.
   - Cost: about 3M, the coordinator's estimate. Slice 1 took its section from 55K to 37K characters.
   - From you: nothing. Your yes at 01:37 covers it, and Fable's check stands in for your reading.
2. **Consolidate POSITIONS.**
   - Produces: POSITIONS in the same form. Each position is stated in the present. Your words stay where they are the position. Dates and history go to its history file.
   - Who: Opus workers by slices, then a check. Fable checks it only at your word.
   - Cost: about 1M, an estimate. POSITIONS is 103K bytes, a third of FACTS before tonight. On 10-12 the coordinator put both files at 4M to 5M.
   - From you: your word to start, and decisions 1, 2 and 4, this morning. It comes before the writer, because the writer reads the rules in POSITIONS's own words.
3. **INDEX's form, if you take it.**
   - Produces: INDEX's lines grouped by topic.
   - Who: not on record. An Opus worker would match the FACTS slices.
   - Cost: about 0.5M to 1M, an estimate. INDEX is 190K bytes.
   - From you: decision 3. The boot note says "perhaps".
4. **Your held points and the decisions before the writer.**
   - Produces: an answer to each of your points of 10-12 and 10-13, and your choices in section 4.
   - Who: the coordinator, one ask per message.
   - Cost: under 0.1M, an estimate. Two Sonnet scouts are optional: one for the failures of five rules (decision 7), one for the origins you asked about (decision 9). Each would add about 0.5M, an estimate.
   - From you: your answers.
5. **The writer's brief.**
   - Produces: the brief in section 3, finished with your answers.
   - Who: the coordinator.
   - Cost: under 0.1M, an estimate.
   - From you: you read it before the writer runs, as you set on 10-12.
6. **The writer's draft.**
   - Produces: the new skill, a core and one part per mode, with a new sources file. Committed, not pushed.
   - Who: a fresh writer.
   - Cost: about 0.3M to 0.4M, an estimate. The writer's pass over every part of `fortress-repo` was about 366K by the coordinator's count.
   - From you: nothing. Check-ins 45 minutes apart watch it.
7. **The check against the kept list.**
   - Produces: each kept rule found in the draft, as a rule or a fact, or listed as lost.
   - Who: not on record (section 5, point 1).
   - Cost: about 0.1M, an estimate.
   - From you: nothing.
8. **The trial boot.**
   - Produces: evidence whether the draft's boot keeps your awareness: what's decided, what's in flight, what's measured, what mustn't be asked or measured again.
   - Who: not on record. The map proposes it.
   - Cost: about 0.7M, an estimate. A boot today takes about 0.25M to 0.32M of context.
   - From you: decision 5. The default puts it here.
9. **The cold read.**
   - Produces: flags with their confidence, the undefined terms, the traps, and the lint's output.
   - Who: an Opus reader with the standing cold-read brief.
   - Cost: about 0.1M to 0.2M, an estimate. A batch's cold read of one part was about 0.08M.
   - From you: nothing.
10. **The fixes.**
    - Produces: the draft with the flags fixed.
    - Who: the coordinator reviews the flags, and the writer fixes them.
    - Cost: under 0.1M, an estimate. Resumed within the hour, the writer reads its context from the cache: once it read 45K and wrote 109.
    - From you: nothing.
11. **Your reading.**
    - Produces: the skill as you approve it.
    - Who: the coordinator publishes it as a page. You read each part whole and comment. The coordinator briefs each comment to the writer, who fixes it at the level of its paragraph or section. The coordinator keeps the page in step.
    - Cost: about 0.1M to 0.3M a round, an estimate. A writer woken after more than an hour writes its context again. Measured: a writer run as a subagent, woken after a day, wrote 297K.
    - From you: your reading time.
12. **Retire the old homes.**
    - Produces: the protocol retired. Its worker rules that `fortress-repo` lacks go there. The README's rule sections, the boot note's standing lines and PLAN's three old rule sections are retired or folded in. The boot order points to the new skill.
    - Who: the writer for `fortress-repo`, with a cold read of the changed part. The coordinator for the record files.
    - Cost: about 0.1M to 0.2M, an estimate.
    - From you: decision 22. The record gives this step no place in the order. The default puts it after your reading, since the protocol is read at boot until the new skill holds its rules.
13. **`cloud-container`, by the `fortress-repo` method.**
    - Produces: an outline of what changes in each part, for you and then the writer. Then the skill rewritten whole by the seven writing principles, a cold read, the fixes and your reading.
    - Who: an Opus worker for the outline, then the writer and a cold reader.
    - Cost: about 0.3M to 0.5M, an estimate. The skill is 16.5K bytes with its parts. `fortress-repo`'s was 149K.
    - From you: the outline's choices, and decisions 23 and 24.

Then batch 14. PLAN holds it until both skills are done.

**References**

1. `explorations/coordinator/BOOT.md`, the night's work, steps 1, 2 and 4; `process-engineering/facts-slice-1.md`, "The size" and "The check".
2. BOOT.md, step 4 ("POSITIONS waits for his morning"); `postmortem-2026-09-19/held-list.md` line 17, the boot note of 10-12 16:34 (the consolidation for both files, "about 4M to 5M"; the writer works "from the rule texts as they stand in POSITIONS and the protocol"); `wc -c` on POSITIONS (102,874 bytes) and on FACTS at `49d78c8cd` (302,622); POSITIONS, "The Fable rule."
3. BOOT.md, "The order after tonight"; POSITIONS, "The coordinator rewrite's goals." (the open question includes a grouping by topic); `coordinator-shape.md` section 8, question 9; `wc -c` on INDEX (190,363 bytes).
4. `explorations/coordinator/HELD.md`, "Held in chat (2026-10-12)" and "Held from his page comments (2026-10-12)"; POSITIONS, "Asks and decisions."
5. The boot note of 10-12 16:34 ("The order he set ... then the writer's brief for the skill, shown to him before it runs"); BOOT.md, "The order after tonight".
6. POSITIONS, "The coordinator rewrite's goals." and "The skills are written for a reader new to the repository ..."; `explorations/coordinator/tools/skill-writer.sh`; `explorations/reviews/skills-review-style.md`, M7 (about 366K); POSITIONS, "Check-ins and stops." (a skill rewrite among the runs watched).
7. POSITIONS, "The coordinator rewrite's goals." ("A check against the sort's list after the draft").
8. POSITIONS, "The coordinator rewrite's goals." ("settled on evidence and a trial boot, not assumed"); `coordinator-shape.md` section 8, question 2; FACTS, "A boot after a compaction costs about 74K tokens of context before it reads the record, and each file it reads costs one token per 2.5 to 3.0 bytes" (a boot about 250K now); `coordinator-shape.md` section 2 (about 317K with the fixed part).
9. `explorations/coordinator/skill-cold-read-brief.md`; `process-engineering/batch-redesign.md:219` and `reviews/skills-agenda-audit.md:277` (about 0.08M).
10. POSITIONS, "The skills are written for a reader new to the repository ..." (the coordinator reviews the findings, the writer fixes them, then he reads); FACTS, "A headless `claude -p` session ... keeps its prompt cache for an hour" (44,900 read, 109 written).
11. POSITIONS, "The skills are written ..." (whole part, comments mark a problem area, the coordinator keeps the page in step), "Format." (the Select button); FACTS, the same headless entry (296,876 written).
12. POSITIONS, "The coordinator rewrite's goals." (the protocol retired, its worker rules to `fortress-repo`, the informal homes retired or folded in); `coordinator-shape.md` section 4.1, last group, and section 8, question 5; PLAN's last three rule sections (`PLAN.md:733`, `:750`, `:762`).
13. POSITIONS, "The order of the work after batch 10." (the `fortress-repo` method: "rewritten whole by the outline and the seven principles, every part cold-read and fixed"); `explorations/reviews/fortress-repo-outline.md`; `wc -c` on `.claude/skills/cloud-container/`; `coordinator-shape.md` section 3.4 (149K); `explorations/coordinator/PLAN.md`, "Where we stand", "Next" (batch 14 after both skills).

## 2. Where the record's order and its entries differ

The boot note's order after tonight: the rest of the consolidation (POSITIONS, perhaps INDEX's form), the writer's brief shown to you, the writer's draft, the check against the sort's list, the cold read, your reading, `cloud-container`, batch 14.

1. **The trial boot.** Your goals say the boot question is settled on evidence and a trial boot, not assumed. The question is how FACTS, POSITIONS and INDEX are kept, and which are always loaded and which looked up. The boot note's order has no trial boot. The plan adds it as step 8, for your decision.
2. **The modes first.** Your goals say the coordinator's modes are identified and described first. The boot note's order names no such step. The plan puts the candidate modes in the writer's brief, so you see them before the writer runs.
3. **POSITIONS tonight.** Your words at 01:37 covered "the rest of FACTS and POSITIONS the same way". The boot note holds POSITIONS for your morning, because its entries are your decisions in your words and you haven't seen the method applied to them.
4. **The lint.** Your order of 10-12 was the moves, then the consolidation with a new lint for the record, then the brief. At 21:00 you weren't convinced by the lint. Tonight's slices run without it.
5. **After the cold read.** POSITIONS has the coordinator review the flags and the writer fix them before you read. The boot note's order skips that. The plan follows POSITIONS, in steps 9 to 11.
6. **What the writer writes from.** Your goals say the writer works from the sort. The same entry says the two sorts carry the map's short names, not the rules' texts, and aren't what the writer judges a rule by. The boot note of 10-12 16:34 reads it as the rule texts in POSITIONS and the protocol. The brief follows that note.
7. **The drops.** Both sorts drop rules whose failures are on record: the clock, the closed-decision search, delegating, rewriting the boot note whole, and silence during a batch. Sort A also drops watching a long run's spend. Your later sentence keeps a rule when its failure is on record, and lets the interview drop nothing. The plan follows your sentence.
8. **The full boot read.** The README and POSITIONS's header say FACTS, POSITIONS and INDEX are read whole at boot, by your word of 09-30. Your goals reopen what's loaded and what's looked up. The trial boot is where the two meet.
9. **The clock and the models.** The boot note says the clock rule is for Fable, and that Fable's interview answer didn't mention the clock. Fable's per-turn answer does mention it. Only its one-shot answer doesn't. Tonight's slips came under Opus. The rule's failures are on record under both.
10. **One file or tiers.** On 10-07 and 10-10 you leaned to one skill file loaded whole. Your goals, written later, make it tiered: a core and mode parts. The later entry stands, so this needs no decision.

**References**

1. POSITIONS, "The coordinator rewrite's goals."; BOOT.md, "The order after tonight".
2. The same goals entry ("the coordinator's modes are identified and described first").
3. BOOT.md, the night's work, his words at 01:37, and step 4.
4. The boot note of 10-12 16:34 ("The order he set"; the proposed lint "that flags entries over a cap ... and entries carrying a date, a hash, a rung name"); HELD, chat, 21:00; `explorations/coordinator/tools/` has no such script.
5. POSITIONS, "The skills are written for a reader new to the repository ..."; BOOT.md, "The order after tonight".
6. POSITIONS, "The coordinator rewrite's goals." (its last two sentences); the boot note of 10-12 16:34 ("Decided, in POSITIONS").
7. `rule-sort.md` section 3; `rule-sort-b.md`, "The sort"; `duplicated-rules-evidence.md` section 11 (failures for the rules of its sections 1, 2, 3, 4, 7 and 8); POSITIONS, "The coordinator rewrite's goals." ("A rule is kept when the failure it guards against is on record"), added at `5094ded2d`, after both sorts.
8. `explorations/coordinator/README.md` lines 1 to 20; POSITIONS line 1; `coordinator-shape.md` section 6.2.
9. BOOT.md, "Evidence of 2026-10-12 for the writer's brief"; `baseline-interview/answers/fable-5.1.md`, answer 9; `answers/oneshot/fable-5.1.md`, answer 9; the boot note's header (Opus since 21:19 on 10-12).
10. `coordinator-shape.md` section 6.1; POSITIONS, "The coordinator rewrite's goals." ("The skill is tiered").

## 3. The writer's brief, a draft

This draft speaks to the writer as "you" and calls you "the curator". The coordinator finishes it with your answers to section 4. A line that waits on a decision names it. The paths are in the references, and the coordinator puts them inline in the brief it sends. It goes after [the writer's standing brief](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/skill-writer-brief.md), and the draft is checked as [the cold-read brief](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/skill-cold-read-brief.md) says.

1. **Your task.** Write the `coordinator` skill from scratch. Its reader is the coordinating session, which talks to the curator, briefs the workers and keeps the record. The skill is that session's one home for how it works. It replaces the protocol and the README's rule sections. Write it in place, in the skill's folder. Git keeps the earlier text. Commit, and don't push. The skill holds what the model wouldn't do by itself, in this environment and this project. It keeps every role: executive assistant, batch coordinator, roadmap architect, briefer of workers and analyst. It says plainly what goes where in the record. It gives a lighter boot that keeps the curator's awareness: the coordinator knows the project without him, never asks a decision again, and never sends a worker to measure what's on record. FACTS, POSITIONS and INDEX keep serving the workers' briefs.
2. **What you get.**
   - Your standing brief, then this one, in a fresh session.
   - The method: the curator's decision on the rewrite's goals, and his decision on how skills are written and checked.
   - The rule texts: POSITIONS's sections on how we work and on how he wants to be spoken to, as consolidated, and the protocol. A rule with neither home has its line in the README, FACTS or the boot note, as the map lists it.
   - The kept list and the facts, in points 6 and 7.
   - The map, whole: the records, their repeats, the boot's size, the open questions, and where each home came from.
   - The origins of the most duplicated rules: the pattern and the record's words on duplication, and the section of any such rule you write.
   - The two sorts, for their facts and their proposed shapes, not for any rule's wording.
   - The seven writing principles.
   - The curator's points on the rules, from the held list, and the boot note's evidence paragraph.
3. **What you don't get.**
   - The existing skill. Read no file in its folder, its sources file included.
   - FACTS, INDEX and the transcripts, unless a task names an entry.
   - The register of what you read. The record is written in agent shorthand.
4. **First, the modes.** Identify the coordinator's modes before you write any rule. For each mode, describe the work, what starts it, and what it needs loaded. The record names these candidates:
   - Running and reviewing a batch: the launch on his go, the watch, the landing, the review after it.
   - Briefing and running workers outside a batch: the tier, the brief, watching a long run.
   - Keeping the record: consolidation, the history files, INDEX.
   - Rewriting a skill: the writer, the cold read, his comments on a page.
   - Process engineering: measuring how the work runs and what it costs.
   - A post-mortem: finding what happened and why, from git and the transcripts.
   - Planning the road: PLAN's phases, and the forks probed before a batch is briefed.
   - Talking with him, asking and deciding aren't a mode. They're the core.
   - Put each of the five roles in the core or a mode (decision 6).
5. **The shape.**
   - A core, always loaded, and one part per mode, loaded when the coordinator switches into it.
   - The core holds the facts of point 7 and a few general principles. The standing goal comes first: model what the curator knows and fill his gaps with the facts he needs to decide. Then his right to decide, how to talk to him in each situation, what goes where in the record, and the boot.
   - Each mode's part holds the kept rules of that work.
   - Concepts first, as a dictionary, then short procedures.
   - Keep the whole skill no longer than the 41K bytes of the skill it replaces, its sources file aside. Sort A puts the core at about 10K bytes.
   - Organize the record as the model organizes knowledge by itself. The curator calls this the rewrite's highest risk. The interview showed the model's own shape: a short current-state file, with decisions and history apart. That shape needs no instruction.
   - A rule that binds workers belongs in `fortress-repo`, not here.
6. **The kept rules.** A rule is kept when the failure it guards against is on record. The interview alone drops nothing. Write each rule from its text in POSITIONS or the protocol.
   - Talking and asking:
     - Ask one thing per message, in the context its text gives (decision 9).
     - An ask gives the question, the context, the options, what a yes commits him to and what a no costs. The recommendation comes last.
     - Don't use the dialog tool. Its prompt times out after about 60 seconds in the iOS client, so the rule lapses if the client changes.
     - Use lists, not tables. The iOS client shows a table as one scrolling line.
     - Write numbers as K or M: 5K, 1.2M.
     - Define a term that's new to him where you use it.
     - Read the clock before writing any time (decision 12).
     - Say nothing of a running batch until it lands or fails (decision 16).
     - Record edits: decision 11.
     - Answer the git-check hook's reminders silently (decision 24).
     - While he reads turn by turn, restate each of his points in a line and hold it. Reply when he says he's done. This guards against the wall-of-text spiral.
     - Send a document for his approval as a page, with a Select button per larger section and the references at the bottom (decision 21).
   - Deciding:
     - His role: decision 10. A bare go starts background work only. A batch run waits for his explicit go. For the phase-3 batches, his standing go is that go. A standing approval covers only what it names.
     - Search the record before you ask him anything or measure anything.
     - A decision inside a worker's report isn't made until he sees it. Write it from POSITIONS's text on which decisions reach him and how. `fortress-repo` tells workers which choices are theirs.
     - What makes a decision consequential, and the three ways it reaches him.
     - A reversible stop doesn't hold a batch (decision 7).
     - When something goes wrong, take a deeper pass, not a halt or a rollback.
     - Weigh a rule against its purpose and its cost.
     - A remark isn't a decision. A go is written nowhere.
   - Delegating and briefing:
     - Give reading to workers. Read their reports and the record.
     - Probe a fork before a batch is briefed (decision 7).
     - Give idle time to parked research. Discuss a new deliverable with him first.
     - A brief states the problem, not the expected answer.
     - A brief points at the research on file.
     - A brief hands over the record's measurements as findings.
     - A clean worker is clean of our options, not of our measurements.
     - Which tier runs what, the Fable rule, and a two-area decision in two steps: cheap evidence, then top-tier judgement.
     - Watch a long run against its estimate. The spend is the coordinator's to watch.
     - Give estimates in the project's units. A token count counts writes only.
     - The writer makes every skill edit, and a cold read follows. A comment marks a problem area.
   - Boot and the record:
     - The boot order. The trial boot settles what's read whole and what's looked up (decision 5).
     - FACTS read whole at boot (decision 7).
     - No directory listings at boot, and every output bounded (decision 7).
     - Whether a worker still runs: the harness's notice, and a check on its one output path.
     - What's in flight is read from the tree (decision 7).
     - The boot note is rewritten whole, never appended to.
     - One home per thing. His words are written once, in POSITIONS.
     - FACTS and POSITIONS state the present. History goes to the history files.
     - Consolidate before each batch. Run the check that nothing was lost before the commit.
     - Cite an entry by its bold title. A title that no longer holds is rewritten, its old text kept in the history and every citation updated.
   - Dropped at his word: the line about the work-in-progress branches.
   - Dropped, no failure on record (decision 8):
     - Label which part of a reply answers which.
     - Take a step a yes covers without asking again.
     - A fact enters in the commit that establishes it.
     - "Search the record for how it was done last time" folds into the search above.
   - New, at his word only (decision 14):
     - No do-nothing option among the choices.
     - A brief for an update caps its length against the version before.
7. **The facts stated instead of rules.**
   - He reads on an iPhone, often with iOS Speak at a fast rate, and writes by dictation. A repository path doesn't open there. A page link or a GitHub link does. His client can show stale state, and the tree is the truth.
   - His time zone is Central European. The container's clock is UTC.
   - The context is compacted when it grows long. The container can be lost, and only what's pushed survives.
   - The record lives in the repository.
   - The session runs in auto mode. Its permission check can refuse a step after his go.
   - The main session's prompt cache lives an hour, a subagent's five minutes, a headless session's an hour. The Workflow harness runs two agents at once on this machine.
   - The platform stops the session's process about every 13 hours. Check-ins armed with `send_later` wake the session. They're spaced 45 minutes apart.
   - A message he sends during a turn is queued. A stop during a turn kills the running agents. A stopped Workflow run resumes with `resumeFromRunId`, keeping its finished agents. A subagent killed by an interrupt is relaunched only at his ask.
   - A Workflow `agent()` call can return null after its output. A Workflow script is checked as an async body, not with `node --check`.
   - The git-check hook asks for a commit after every turn. Its reminders are advisory.
   - Cached reads are almost free on his plan, so a cost counts tokens written only.
   - The tiers: the coordinating session and the workers run on Opus. Sonnet does archaeology, and nothing he reads. Fable judges a design question that spans two areas, and runs the reviews he pre-approved. Any other Fable work needs his yes.
8. **The failures the kept rules guard against.**
   - Time written from feel: "yesterday" for that day's recovery (09-18); "yesterday morning" (09-23); "an hour before" for three minutes (10-12); "01:0x" for a commit at 00:52, and two more times inside the very command that read the clock (10-13). On 10-12 the rule stood in four files: the protocol, POSITIONS, the skill and the boot note. Tonight's slips came under Opus.
   - A decision asked again: twice on 08-23, and the library question on 09-21. On 09-28 a clean worker and a Fable judgement, about 0.7M, were briefed on a question he'd settled at 19:06.
   - The search didn't fire before measuring: on 10-12 at 16:43 the coordinator measured entry lengths that the map already held, three minutes after reading INDEX's line on the map.
   - Work not delegated: the repository traced by hand on 09-19, after earlier cases.
   - The boot note appended to 79 times in a day.
   - Progress reports during a batch: two check-in reports in a row, and overnight runs that left him a session of progress notes.
   - Spend not watched: a probe wrote 7.0M against a stated 0.5M. A brief once asked a worker to cap its own spend.
   - The wrong tier: two workers cost 1.7M.
   - Choices that offered a do-nothing option, on 10-12 at 16:45.
   - The wall-of-text spiral. Both models' default is to act on each of his answers as it comes.
   - Tables, which both models gave him.
   - A document update that grew beyond what he asked, and a brief that reframed a document by naming a second reader (10-13).
   - A compaction that left him "out of control, unaware of crucial details".
   - Of the nine failures that led to a new copy of a rule, four broke a rule that already stood in a file read at boot.
9. **The writing standard.**
   - Your standing brief: ASD-STE100 at least halfway, terms defined first, the glossary form, positive phrasing, and no rule that changes nothing. Don't take the register of what you read.
   - The seven writing principles.
   - The register the skill teaches for talking to him: plain short sentences with contractions, no flourish, no coda after a semicolon, a choice numbered so he can answer "3b", and no internal shorthand.
   - Provenance goes in the sources file, as your standing brief says.
   - No model identifier anywhere. Name models by tier.
   - Run the skills lint before each commit.
10. **How your draft is checked.**
    - A check against the kept list: each kept rule found in the draft, or listed as lost.
    - The trial boot, if decision 5 puts it here.
    - The cold read, by a reader given only the skill, reading it as the coordinating session would.
    - The coordinator reviews the flags, and you fix them.
    - The curator reads each part whole, on a page. A comment marks a problem area. The coordinator briefs each comment to you, and you fix it at the level of its paragraph or section. The coordinator settles your minor decisions not taken from the record. He's asked only where a rule would change its meaning or a new rule would enter.
11. **Your report.** As your standing brief says: the commits, each file's size before and after with what changed, the decisions not taken with their alternatives, and anything you couldn't follow.

**References**

1. POSITIONS, "The coordinator rewrite's goals." (the goals, the roles, the lighter boot, the briefs); `baseline-interview/README.md` (the skill holds only what the model wouldn't do by itself); `coordinator-shape.md` section 1.
2. `explorations/coordinator/skill-writer-brief.md`; `tools/skill-writer.sh` (`new` starts a fresh writer); POSITIONS, the goals entry and "The skills are written for a reader new to the repository ..."; POSITIONS lines 23 to 68 (the two sections); `explorations/protocol.md`; `coordinator-shape.md` sections 1 to 9, section 4.1 for each rule's lines; `duplicated-rules-evidence.md` sections 1 to 12; `rule-sort.md` sections 2 and 5, `rule-sort-b.md`, "Facts the skill should state instead", "What the interview shows that no rule covers" and "The shape of the skill"; `explorations/reviews/skills-writing-principles.md`; HELD, the two sections of 10-12; BOOT.md, "Evidence of 2026-10-12 for the writer's brief".
3. POSITIONS, the goals entry ("the writer does not read the existing skill"); `skill-writer-brief.md`, "Do not take the register of what you read" and its rule on FACTS, POSITIONS and INDEX.
4. The goals entry (the modes; "running and reviewing a batch, process engineering, a post-mortem, among others"; the five roles); `rule-sort-b.md`, "The shape of the skill" (five modes); `coordinator-shape.md` sections 4.1 and 8, question 14 (two roles in the old skill).
5. The goals entry (tiered; "a few general principles, among them how to talk to him in each situation"; the highest risk; the default shape kept without instruction); `rule-sort.md` section 5 (about 10K bytes); `rule-sort-b.md`, "The shape of the skill"; POSITIONS, "The skills are written ..." ("a rewrite never longer than what it replaces"); `coordinator-shape.md` section 3.1 (41K bytes); `skills-writing-principles.md`, principle 2.
6. The goals entry's last two sentences; `coordinator-shape.md` section 4.1 (the 73 rules by group); HELD, page comments 15:30 to 16:00; the boot note of 10-12 16:34 ("Kept at his word", "Dropped", "Recorded for the rule"); HELD, 00:06 on 10-13; README, "How they are kept" (the title rule as rewritten); `duplicated-rules-evidence.md` section 11 and "What I could not find".
7. `rule-sort.md` section 2; `rule-sort-b.md`, "Facts the skill should state instead"; POSITIONS, "While a batch runs", "Format.", "Which tier runs what.", "Estimates in the project's units.", "Check-ins and stops.", "Where the work lives."; FACTS, "The container" (the headless session, the Workflow harness, the permission check).
8. BOOT.md, "Evidence of 2026-10-12 for the writer's brief"; `duplicated-rules-evidence.md` sections 1 to 4, 7, 8 and 11; `fable-use-archaeology.md`, case 17; `process-engineering/p1-cost.md`; POSITIONS, "Which tier runs what.", "The coordinator's standing goal"; HELD, 15:32, 15:38, 15:44, and chat 00:4x and 00:22.
9. `skill-writer-brief.md`, sections 1 to 5; POSITIONS, "The register.", "Asks and decisions."; BOOT.md, "His state and register"; `explorations/coordinator/tools/skills-lint.py`.
10. The goals entry ("A check against the sort's list after the draft ... then the cold read"); `skill-cold-read-brief.md`, "Who reads each skill"; POSITIONS, "The skills are written ..." (the cold read, the comments, minor decisions).
11. `skill-writer-brief.md`, section 6.

## 4. Your decisions

Each has a default you can take without reading the argument.

This morning, for POSITIONS:

1. **Start POSITIONS.** Now, on your 01:37 words with Fable's check in place of your reading, or one slice first for you to read. Default: one slice first, as the boot note holds it. The slice costs about 0.5M of step 2's 1M, an estimate.
2. **What FACTS and POSITIONS both tell.** POSITIONS keeps the decision and a pointer, and FACTS the state of the build, as proposed on 10-12. Or both keep their text. Default: the proposal. It touches more than a third of each file.
3. **INDEX's form.** Group its lines by topic now, for about 0.5M to 1M, an estimate. Or leave it until the trial boot shows how INDEX is read. Default: leave it. You kept it loaded on 09-30.
4. **The record lint.** Build it for POSITIONS, or go on without it as tonight. Default: without it, with the check that nothing was lost and a reader's check.

Before the writer runs:

5. **Where the trial boot goes.** After the draft and the check, testing the draft's boot (default). Or before the writer, testing the record's boot read alone. Each costs about 0.7M, an estimate. After the draft, if the boot fails, its part is rewritten for about 0.1M, an estimate.
6. **The modes.** The candidates in the brief, or your own list. Default: the brief's list, which the writer may merge or split.
7. **Five rules no failure search covered.** A reversible stop doesn't hold a batch. A fork is probed before a batch is briefed. FACTS is read whole at boot. Boot reads no directory listings. What's in flight is read from the tree. Default: keep all five, since the interview alone drops nothing. A Sonnet scout could trace their failures for about 0.5M, an estimate.
8. **Four rules the scout found no failure for.** Label which part of a reply answers which. Take a step a yes covers without asking again. Search the record for how it was done last time. A fact enters in the commit that establishes it. Default: drop them, and fold the third into the kept search, since the 16:43 failure was a search that didn't fire before measuring.
9. **Your questions on origins.** You asked where four rules came from: one ask per message, "he decides what is committed", silence on record edits, and new terms against ASD-STE100. Default: answered from each rule's POSITIONS text, as you asked at 16:00. A Sonnet scout for the four origins costs about 0.5M, an estimate.
10. **Your role.** "He sets the goals and decides the design and process questions put to him", in place of "decides what is committed". Default: that wording, from the held list.
11. **Record edits.** You hear nothing. Or you hear "noted". Or you get a one-line read-back that catches a dictation slip, which both models give by default. Default: "noted", your own word.
12. **The clock rule's wording.** "Read the clock before writing any time", the boot note's line since Opus wrote it on 10-06. Or the 09-23 wording, with its reason that the model has no feel for elapsed time. You asked for "the formulation that worked", and the record doesn't say which. Default: the boot note's line. Tonight's slips happened with it in context.
13. **Holding a long dictated message.** The held list as it is, a line per point with your message's time. Or the models' default, a numbered list with a status per point. Default: the held list as it is.
14. **Two lessons with no rule.** No do-nothing option among the choices (10-12, 16:45). A brief for an update caps its length against the version before (10-13). A new rule enters only at your word. Default: one line each, in the asking and the briefing parts.
15. **git log at boot.** One line in the boot order, or none. Default: one line, as sort A says. Both models do it, and the boot note can lag a worker's push.
16. **A message when a batch starts.** None, and silence until you ask. Or one line, as both models would. Default: none, as you said at 15:38.
17. **POSITIONS's two conduct sections in the boot read** once the skill holds their rules. Default: they stay until the trial boot says otherwise. POSITIONS keeps your words, and the skill the rule.
18. **Where the facts live.** The skill's core, with FACTS keeping the measured detail. Or FACTS, with the skill pointing there. Default: the core, as both sorts' shapes put them.
19. **The rules you didn't reach on the sort page.** You stopped at the rule on a worker's decisions. Review the rest in POSITIONS's text before the writer runs, or judge them in the draft. Default: in the draft, since the short names didn't let you judge a rule.
20. **The homes of 10-12.** PLAN's first section says where the work stands. The boot note says what's in flight. The held list keeps your points. The review queue is unchanged. You weren't convinced about PLAN's section. Default: as the coordinator settled it, yours to overturn.
21. **The Select-button rule.** The full sentence from POSITIONS in the core, or a page template. Default: the sentence.

Later:

22. **The two worker rules `fortress-repo` lacks**: no model identifier in a commit, and your email for attribution only. Add both, as sort A says. Or add the first only, as sort B says, since the harness states the email rule every session. Or neither, since the writing principles cut a rule the system prompt gives. Default: the first only. When: step 12.
23. **FACTS's container section.** 18 of its 27 entries feed skill text. Keep it in FACTS, as tonight's slice 7 does. Or move what the skill needs into `cloud-container`. Or cut each entry to the fact and its source. Default: keep it, and decide at the outline. When: before step 13.
24. **The git-check hook at each process start.** The hook comes back. You switch the session to manual mode, it's made a no-op again, and you're told. Default: that ritual, with the technique in `cloud-container` and one line in the core to tell you. When: before step 13's writer, with the core's line in step 6.
25. **More evidence on the boot.** No trial of a worker that holds the record and answers questions, and no fuller archaeology of what each role reads, unless the trial boot fails. Default: neither. When: after the trial boot.

**References**

1. BOOT.md, his words at 01:37 and step 4; POSITIONS, "The Fable rule."
2. The boot note of 10-12 16:34 ("the FACTS-POSITIONS pairs split"); `coordinator-shape.md` section 4.2 (34 POSITIONS entries, 37 % of it, and 53 FACTS entries, 40 %, tied by citation) and section 8, question 8.
3. BOOT.md, "The order after tonight" ("perhaps INDEX's form"); `coordinator-shape.md` section 6.2 and section 8, questions 9 and 11.
4. HELD, chat, 21:00; the boot note of 10-12 16:34 (the lint proposed); `facts-slice-1.md`, "The script" and "The check".
5. The goals entry; `coordinator-shape.md` section 8, question 2.
6. The goals entry; `rule-sort-b.md`, "The shape of the skill"; `coordinator-shape.md` section 8, question 14.
7. `rule-sort.md` section 3 (keeps the first four, drops the fifth); `rule-sort-b.md`, rules 23, 28, 44, 45 and 47 (drops all five); `duplicated-rules-evidence.md` covers none of them; the goals entry's keep sentence.
8. `duplicated-rules-evidence.md` section 11 (rules of its sections 5, 6, 9 and 10: no copy after a failure) and "What I could not find"; BOOT.md, the evidence paragraph (16:43); `rule-sort.md` section 6, point 2.
9. HELD, page comments 15:30, 15:35, 15:40, 15:56 and 16:00.
10. HELD, 00:06 on 10-13; `explorations/protocol.md`, the first hard rule.
11. HELD, 15:40; the boot note of 10-12 16:34 ("'noted' may be an acceptable acknowledgement ... (open)"); `rule-sort-b.md`, open point 2.
12. HELD, 15:37; `duplicated-rules-evidence.md` section 2, items 3 and 8; BOOT.md, the evidence paragraph.
13. The goals entry ("holding the open items of a long dictated message"); HELD's header; `rule-sort-b.md`, open point 3.
14. BOOT.md, the evidence paragraph (16:45); HELD, chat, 00:4x on 10-13; POSITIONS, "The skills are written ..." (a new rule is put to him).
15. `rule-sort.md` section 4 and section 6, point 3.
16. HELD, 15:38; `rule-sort-b.md`, open point 4.
17. `coordinator-shape.md` section 8, question 4; the boot note of 10-12 16:34 (his to decide); `rule-sort.md` section 5.
18. `rule-sort-b.md`, open point 8; `rule-sort.md` section 2.
19. HELD, 16:00; the boot note of 10-12 16:34 ("neither page lets him judge a rule").
20. HELD, chat, 21:00; commit `cc3e59618`; PLAN, "Where we stand"; `coordinator-shape.md` section 8, question 13.
21. HELD, 15:46; POSITIONS, "Format."; `rule-sort-b.md`, rule 14.
22. `rule-sort.md` section 3, last group; `rule-sort-b.md`, rules 63 and 64; `skills-writing-principles.md`, principle 3; POSITIONS, "The record is public and names models on purpose."
23. `coordinator-shape.md` section 3.5 and section 8, question 10; BOOT.md, step 4 (slice 7, "The container").
24. HELD, 15:42; the boot note of 10-12 16:34 ("a reset ritual at each process start (he does it in manual mode)"); BOOT.md, its header (the hook made a no-op at his word, back after the restart); `.claude/skills/cloud-container/references/hooks.md:29`.
25. `coordinator-shape.md` section 6.2 and section 8, questions 1 and 12.

## 5. Points the record leaves to the coordinator

POSITIONS gives the coordinator a writer's minor decisions to settle from the record. These are of that kind.

1. Who runs the check against the kept list. The record names no one. An Opus worker given the draft and the list would match how reading is delegated.
2. The text of a rule that has no home in POSITIONS or the protocol: the line the map lists for it in the README, FACTS or the boot note.
3. The old skill's files. The writer mustn't read them, and the skill is rewritten in place. So the folder is emptied before the writer starts, git keeping the files, or the writer overwrites and deletes without reading.
4. Whether the writer opens the batch workflow's manual to point into it from the batch part.

**References**

1. POSITIONS, "The skills are written ..." ("A writer's minor decisions not taken are settled by the coordinator from the record"); the goals entry (no actor for the check).
2. `coordinator-shape.md` section 4.1 (the homes of each rule, with lines at `fb1aa7c7b`).
3. The goals entry ("the writer does not read the existing skill"); POSITIONS, "The skills are written ..." ("rewritten in place, git holding the earlier text").
4. `rule-sort.md` section 5 (the workflow stays in its script and manual); `coordinator-shape.md` section 3.3.

## 6. What stays out of the rewrite

1. **The profile of what you know.** It's a separate task, by archaeology. Its design and cost come to you first. The core keeps the standing goal it serves.
2. **The name for the files only the coordinator uses.** A brainstorm comes before a name is chosen. It's among the open asks. Until then the skill names each file.
3. **The revival story's fixes.** One Opus pass when you're done commenting. Only the update-length lesson may enter the skill, at your word (decision 14).
4. **The batch workflow's script and manual.** They stay as they are, and the batch part points to them. They change when they show a problem.
5. **`fortress-repo`'s test-first text.** Sort B asked to state only its two differences from the default. The skill already says to take the starting tree as passing and not to run the suites to check that. No change.
6. **The skill's description and its trigger tests.** The method doesn't name a new run of the description tuning of 10-05. It's yours to ask for.
7. **Batch 14.** It comes after `cloud-container`.
8. **The other open asks.** The backlog page's items, the measures judgement's next steps and the library-extension bullet don't change with the rewrite.

**References**

1. HELD, 15:53; BOOT.md, "The order after tonight"; the boot note of 10-12 16:34 ("which he called major and wants as its own task").
2. HELD, chat, 21:00; BOOT.md, "Other open asks".
3. HELD, chat, 00:4x and 00:22 on 10-13.
4. The goals entry ("The batch workflow is in scope, since it is improved whenever it shows a problem"); `rule-sort.md` section 5.
5. `rule-sort-b.md`, open point 7; `.claude/skills/fortress-repo/SKILL.md`, "Rules for every task".
6. `explorations/reviews/skills-description-optimization-2.md`; the goals entry.
7. PLAN, "Where we stand", "Next".
8. BOOT.md, "Other open asks".
