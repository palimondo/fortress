<!-- The skill-creator's description optimization of the three project skills, run again on 2026-10-05 after the restructuring, by an Opus worker at the curator's word; written down by the coordinating session from the worker's final message, since a subagent may not write report files. -->

# The three project skills' descriptions, optimized again with the skill-creator

Done on 2026-10-05, from 07:43 to 08:10 UTC. This is the second run of the skill-creator's "Description Optimization" section on the three project skills. It follows the restructuring of the same day: the long commands and waits went into `fortress-repo`, running agents went into `coordinator`, and `remote-container` became `cloud-container`. The skill-creator's own scripts were used, unmodified. The first run is `skills-description-optimization.md`.

- Each skill got 20 queries: 10 that should trigger it and 10 that should not. Of the 10 that should not, 8 are near-misses that belong to one of the other two skills, and 2 come from outside the project. The worker wrote the sets itself. Nobody reviewed them, because the section's review page needs a person to edit and export the set.
- `scripts.run_loop` ran with the session's model (Opus) and `--num-workers 1`. All other settings were the script's defaults: at most 5 iterations, a 60/40 train/test split, 3 runs per query, and a threshold of 0.5.
- Each loop ran from its own project root in the scratchpad. Unlike the first run, each root held the other two skills, with their old descriptions, so each near-miss had its own skill to go to (decision 1).
- At the end, `scripts.run_eval` scored each applied description again on all 20 queries. It ran in a root that held the other two skills with their applied descriptions, which is how the repository stands now. This is the "final" score below.
- Scores are given in queries passed (train out of 12, test out of 8, or all out of 20), and in runs correct (out of 60).

## Results

- `fortress-repo`: replaced. The old description, 1,065 characters, scored 20/20 (60/60 runs). The new one, 995 characters, scored 20/20 (60/60 runs) in the final re-score.
- `coordinator`: replaced. The old description, 1,667 characters, scored train 11/12 and test 8/8 (58/60 runs). The new one, 897 characters, scored 12/12 and 8/8 (60/60 runs) in the loop, and 20/20 (60/60 runs) in the final re-score.
- `cloud-container`: kept. Its description, 1,005 characters, scored 20/20 (60/60 runs) in the loop, and 20/20 (59/60 runs) in the final re-score.

No query fails any more. The one run on the wrong side of the threshold that is left is in the `cloud-container` final re-score: "I hit the stop button while ant testFast was running ..." should not trigger it, and triggered it in 1 run of 3.

For `fortress-repo` and `cloud-container`, the old descriptions already passed every run. So these eval sets cannot tell their old and new texts apart. What `fortress-repo` gains is a length under the limit and the new routing words, not a measured score.

All three descriptions are now under 1,024 characters, and all three pass the skill-creator's `quick_validate.py`. Both new values are double-quoted in the frontmatter, because `fortress-repo`'s contains ": " and the old values were quoted. Nothing else in the skills was changed. Commit `18c042aca`.

## claude -p runs

485 `claude -p` runs in all:

- 1 probe: the skill listing in a root that holds the sibling skills.
- `fortress-repo`: 60 for the loop's one iteration, 2 for `improve_description` (a proposal over 1,024 characters, then the script's own rewrite call), and 60 to score the candidate.
- `coordinator`: 60 for iteration 1, 2 for the improve step (a proposal of 1,076 characters, then the rewrite call), and 60 for iteration 2.
- `cloud-container`: 60 for the loop's one iteration.
- The final re-score: 3 × 60.

The tokens were not measured. One run measured on 2026-10-04 wrote 8.9K tokens; by that measure these runs wrote about 4.3M. These runs are not in the transcripts that `tools/spend.py` reads.

## fortress-repo

Old description (1,065 characters):

> Use this skill for hands-on work on the Fortress language revival code in /home/user/fortress: building with ant and recompiling after editing a .fss, .fsi, Java or Scala file (recompiling what changed, not wiping caches); running programs under walk (the interpreter) or the bytecode compiler; running or writing tests (testFast, testSystem, harness-one.sh, junit.sh, .test keys, XXX expected failures); the gate; measuring the checker count or distance to the switch-over; changes to the interpreter, compiled checker, code generator, Library or Specification; the gap ledger or git history; seeding worktrees; committing a code change. Load it before any build, test, edit or measurement there, however small, and when planning agents for that work. Not for session housekeeping, even in this repo: Stop hooks, git-check reminders, compaction, boot or handoff notes, coordinator scheduling, held lists, restarts, disk or container limits. Long commands and waits are here; running agents and resuming runs: coordinator skill; disk and container: cloud-container.

New description (995 characters):

> Use this skill whenever you touch the code of the Fortress language revival (/home/user/fortress or a worktree like fortress-w4): building with ant; recompiling after editing a .fss, .fsi, Java or Scala file; running programs under walk or the bytecode compiler; running or writing tests (testFast, testSystem, harness-one.sh, junit.sh, .test files, XXX expected failures); the gate before landing; measuring the checker count or distance to the switch-over; editing the interpreter, compiled checker, code generator, Library or Specification; searching the gap ledger or git history; seeding worktrees; committing a code change. Load it before even a small build, test, edit or measurement there, including long background runs you wait on, and when briefing agents for that work. Skip it for session upkeep (compaction, boot notes, reading batch results, scheduling agents: coordinator skill), Stop hooks, disk or container trouble (cloud-container), other repos, and general Fortress history.

Scores:

- The loop's iteration 1 (the old description): train 12/12, test 8/8, 60/60 runs. The loop stopped there, because all train queries passed, and returned the old description as `best_description`. That text is over the limit (decision 2).
- The candidate: `improve_description.py` worked on the loop's iteration 1 train results, as the loop does before its iteration 2. It gave 990 characters, scored by `run_eval.py` at 20/20, 60/60 runs. It is the same as the new text, except that its last sentence began "Skip it for session upkeep (hooks, compaction, ..." and had no "Stop hooks," before "disk or container trouble".
- The applied text is the candidate with one change: "hooks" moved out of the group sent to the coordinator skill and became "Stop hooks" in the group sent to `cloud-container` (decision 3). Final re-score: 20/20, 60/60 runs.

## coordinator

Old description (1,667 characters):

> What the coordinating session of the Fortress revival does, and how decisions that agents take reach the curator, the person who curates this restoration and decides what is committed and what the agents are asked to do. Covers the coordinator's two roles (orchestrator and executive assistant) and the records each keeps, the boot at session start and after a compaction, delegation (what goes to a worker, which tier runs what, when a Fable judgement runs without asking and when it needs the curator's yes, the judge's rulings, a brief's form), watching a long run against its estimate, estimates in tokens, running agents (how many at once, their cost, agent types, a null result, checking a Workflow script, interrupts, resuming a Workflow run, relaunching a worker), reading agents' reports, what makes a decision consequential and how one taken inside a worker's report or a batch reaches the curator (asked first, landed and listed for review, or a stop that holds the work), approvals and standing goes, the ask form, talking to the curator (register, lists, numbers, time, silence while a batch runs, the git-check hook's reminders, restate and hold while the curator reads turn by turn), and keeping the record (FACTS, POSITIONS, PLAN, the review queue, the boot note, the held list). Load it in the coordinating session only: at session start and after every compaction, before briefing or launching any agent, after an interrupt or a stop of the process, before reading a worker's report or a batch's result, before putting anything to the curator or replying while the curator reads, and before editing the coordinator's records. Workers do not load it.

New description (897 characters):

> Use this skill in the Fortress revival's coordinating session whenever the curator (who decides what is committed and what agents do) is directing you, waiting on you, or setting how the conversation goes. Load it before replying when they ask you to boot after a compaction or stop, say what is running or waiting, read a worker's report or batch result, put a question to them, or record a decision they just made. Load it too when they say they will review your turns one by one, ask you to hold or restate something, keep quiet during a batch, or change your register or format. Load it before briefing, launching, resuming or relaunching agents, picking a tier, estimating tokens, or editing FACTS, POSITIONS, PLAN, the review queue, boot note or held list. Not for workers, build/test work (fortress-repo), container or hook faults (cloud-container), or generic multi-agent or ADR questions.

Scores:

- Iteration 1 (the old description): train 11/12, test 8/8, 58/60 runs. One query failed: "I'm going to read your last six turns one at a time and come back with points. Hold anything new until I say I'm done." It triggered in 1 run of 3.
- Iteration 2 (the optimizer's proposal, after the script's rewrite to under 1,024): train 12/12, test 8/8, 60/60 runs. The loop stopped there, because all train queries passed.
- The script's `best_description` is iteration 1: it selects by test score, and on equal scores Python's `max` returns the first. Iteration 1 is 1,667 characters, so iteration 2 is applied, verbatim (decision 4). Final re-score: 20/20, 60/60 runs.

## cloud-container

Old and new description (unchanged, 1,005 characters):

> How the cloud platform this repository is worked on behaves, apart from Claude Code and the repository: the machine (4 CPUs, about 15 GB of memory, no swap, timings that differ between sessions), the disk allowance and why df misleads, a disk full with no space left on device and what to delete, the network proxy and its blocked hosts (web.archive.org, labs.oracle.com), the platform's stop of the session's process about every 13 hours, idle stops and VM restarts, send_later check-ins that keep the session busy across a stop, the transcript backup and its blind spots, reading another session's transcript, the platform's git-check Stop hook, and a lost container: re-provisioning, re-arming the backup, recovering the work. Load it when the disk fills or df looks wrong, when a host cannot be reached, after the session's process was stopped or the VM restarted, before arming check-ins for a long wait, when the backup fails to push, and when a container is lost or a session must go on in another.

Scores:

- Iteration 1: train 12/12, test 8/8, 60/60 runs. The loop stopped with all train queries passing, and `best_description` is the old description, which is under the limit.
- Final re-score, with the other two skills' new descriptions: 20/20, 59/60 runs (the one run is given above).

## Decisions

1. Each loop's root held the other two skills, instead of being empty as on 2026-10-04. The brief asked that each description make the right one of the three load, with near-misses drawn from the other two; in an empty root a near-miss has no sibling to go to, so the test stays stricter than real use (the first report, "What the test does not include"). A probe confirmed that a nested run lists both siblings. These scores cannot be compared with the first run's.
2. For `fortress-repo`, the under-limit candidate came from the script's own improve step, not the old text or a hand trim. The old text is the loop's `best_description` but is 1,065 characters; `improve_description.py` gave the candidate from the loop's iteration 1 results and history, as the loop's own iteration 2 would, and `run_eval.py` scored it on all 20 queries.
3. One correction in `fortress-repo`'s candidate: it sent "hooks" to the coordinator skill, but the git-check Stop hook and the transcript backup belong to `cloud-container` (its `references/hooks.md`); only the compaction hook is the coordinator's. "Stop hooks" now stands in the `cloud-container` group. The final re-score is of the corrected text: 20/20, 60/60.
4. For `coordinator`, iteration 2 is applied instead of the script's `best_description` (iteration 1): the two tie on the test set (8/8), iteration 2 is better on the train set (12/12 against 11/12), and it is the only one under the limit.
5. `coordinator`'s new text is applied verbatim, including its last clause "or generic multi-agent or ADR questions". That clause names two of the eval set's near-misses (a Python multi-agent design and an ADR template), the overfitting the improve prompt warns against. It is not wrong, so it stays; dropping it or making it general would need a re-score (60 runs).
6. The three skills' `references/sources.md` lines on the description were left to the coordinating session, the brief saying to change nothing else in the skills; they are updated in the commit that adds this report.
7. This report and its INDEX line are not in commit `18c042aca`: the Write tool refuses report files to a subagent, and the worker handed the text back.
8. The nested runs' transcripts were left in place. The runs inherit this session's ID and wrote 8,813 lines under six `/root/.claude/projects/` folders whose names end in `optimization-2-root-*` and `optimization-2-final-root-*`; the transcript backup will copy them, as after the first run.

## Defects found, with their homes

- `run_loop.py` can return an over-limit description as `best_description`: it never checks the starting description against the 1,024 limit its own improve prompt calls hard, stops as soon as all train queries pass, and on equal test scores keeps the first iteration. It happened here for `fortress-repo` and `coordinator`. Home: the skill-creator, outside this repository.
- The improve step's first proposal went over 1,024 characters both times (1,076 for `coordinator`); the script's own rewrite call brought each under. Home: the skill-creator, outside this repository.
- The three `sources.md` description lines were stale; updated with this report.

## Stops met

None.

## Where the workspace is

Outside git, in the session's `scratchpad/skills-description-optimization-2/`: for each skill `eval_set.json`, `loop.log`, `output.json`, `results/<time>/`, `final_eval.json` and its log; `fortress-repo/candidate1.txt` and its eval; `snapshots/` (the three skills before any edit); `applied/` (as they are now); the six project roots.

## The eval sets

Each line gives the split, then the runs that triggered the skill: for the old description (the loop's iteration 1, with the old siblings) → for the applied description (the final re-score, with the applied siblings).

### fortress-repo

Should trigger:

- [train] 3/3 → 3/3: i just added a `reverse` method to List in Library/List.fss (the fortress repo, /home/user/fortress). what do i actually have to rebuild before running ProjectFortress/tests/ListReverse.fss under walk? don't want to nuke the caches if i can help it
- [train] 3/3 → 3/3: Start `ant testSystem` in /home/user/fortress-w4. It runs about 25 minutes, and the Bash tool cuts a call off at 10, so run it in the background, keep checking on it, and tell me which tests failed when it's done.
- [test] 3/3 → 3/3: I'm a worker agent in the fortress revival. I started ant compileAll in my worktree with nohup and it takes ~4 min. Should I sleep 600 in one call until it finishes, or poll it? I don't want my prompt cache to expire while I wait.
- [test] 3/3 → 3/3: OverloadAmbig.fss in ProjectFortress/tests started failing after my edit to interpreter/evaluator/Evaluator.java. run just that one test through the harness, not the whole suite, and show me the error
- [train] 3/3 → 3/3: Add a test to the fortress tree that checks the compiled type checker rejects `x: ZZ32 = 3.5`. The checker doesn't reject it yet, so mark it as an expected failure with XXX. Which folder does it go in, and which .test keys does it need?
- [train] 3/3 → 3/3: Run the gate on /home/user/fortress-gather11 before it lands on main: compileAll, testFast, testSystem, the atomic runs and the ladder. Report each stage's verdict.
- [train] 3/3 → 3/3: measure the checker count and the distance to the switch-over on worktree /home/user/fortress-w9 after my change to TypeAnalyzer.scala in scala_src. did either number move against the base?
- [test] 3/3 → 3/3: ok the fix in ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java and its test are done, on main. commit just my two files and push. i heard there's a second branch that has to be pushed too here?
- [test] 3/3 → 3/3: The stop button got hit while my ant testFast run was going under nohup in /home/user/fortress-w2, and tmp/testFast.log has no EXIT= line at the end. Is it still running? Do I start it again or wait for it?
- [train] 3/3 → 3/3: Compile ProjectFortress/compiler_tests/microgpt/MicroGPT.fss with the bytecode compiler and run it, then run the same program under walk, and compare the two times. I want a rough number for how far ahead the compiled path is.

Should not trigger:

- [train] 0/3 → 0/3: you were just compacted. do the boot first, then tell me in three lines what's in flight and what's waiting on me
- [train] 0/3 → 0/3: Batch 12's workflow finished twenty minutes ago. Read its result and list only the decisions the workers took that I have to see: which ones come to me first, and which are landed and listed for review?
- [test] 0/3 → 0/3: Should the judgement on whether ZZ32 literals widen implicitly run on Fable right now, or do you need my yes first? We're at 52% of the weekly usage.
- [test] 0/3 → 0/3: My Workflow run for batch 13 died when the session's process was stopped at the 13-hour mark. Resume it from its journal. Don't relaunch the six agents from scratch.
- [test] 0/3 → 0/3: df -h / says 252G with 9.6G available, and an agent's log write just failed with 'No space left on device'. How much disk does this container really give the session, and what's safe to delete first?
- [test] 0/3 → 0/3: I need the 2008 Fortress spec PDF from labs.oracle.com and the old project site from web.archive.org, but curl gets a 403 from the proxy for both. Is there any way through from this container?
- [train] 0/3 → 0/3: The container was lost overnight and the session got a new one, provisioned from claude/worker-brief-fable-vnnuv8. How do I re-arm the transcript backup, and how do I find out what the old session had in flight that wasn't pushed?
- [train] 0/3 → 0/3: Every time I end a turn, a git-check Stop hook says there are untracked files under explorations/ and an unpushed commit. Those are work in progress waiting for the curator. Do I have to commit and push to make it stop?
- [train] 0/3 → 0/3: In our payments monorepo (~/work/payments-svc) `ant test` takes 20 minutes. How do I run one JUnit test class from ant, and how do I run the full suite in the background on Jenkins without blocking the pipeline?
- [train] 0/3 → 0/3: Short history for a blog post: what was Sun's Fortress language trying to do, and why did Oracle wind it down in 2012? No code, three paragraphs.

### coordinator

Should trigger:

- [train] 3/3 → 3/3: compacted again. boot first, then tell me what's running and what's waiting for me
- [train] 3/3 → 3/3: the batch-14 workflow finished about ten minutes ago. read its result and tell me only what I have to decide. short please, I'm on my phone
- [test] 3/3 → 3/3: can you take this one yourself or does it need my yes: the judge wants a Fable judgement on whether the spec's section 7.4 wording or the interpreter's behaviour is right
- [test] 3/3 → 3/3: The worker's report says it kept the old overload rule instead of the one in the paper, and went ahead. How does that reach me: asked first, landed and listed for review, or does it hold the work?
- [train] 3/3 → 3/3: put the question about retiring protocol.md to me properly. one ask, the options, and what a yes commits me to
- [train] 3/3 → 3/3: I just decided that a repair reruns only the stage it touched, not the whole gate. Record that where it belongs, and fix the boot note so the session after the next compaction knows.
- [train] 1/3 → 3/3: I'm going to read your last six turns one at a time and come back with points. Hold anything new until I say I'm done.
- [test] 3/3 → 3/3: You launched the long run at 19:55 with an estimate of 1.5M tokens. It's been 40 minutes. Check it against the estimate and tell me whether it's overrunning.
- [test] 3/3 → 3/3: batch 15 has 9 gap-ledger rows to fix. how many agents do you launch at once, which tier runs each, and what's the token estimate before anything starts?
- [train] 3/3 → 3/3: The session's process was stopped at 02:10 and last night's batch-15 Workflow run died with it; two of its six agents had finished. Resume the run rather than relaunching everything, and tell me what landed.

Should not trigger:

- [train] 0/3 → 0/3: You are a worker on branch rung-16. Fix the failing test ProjectFortress/tests/GenericOverload.fss in your worktree /home/user/fortress-w16, run it through the harness, and finish with your report.
- [train] 0/3 → 0/3: run the gate on /home/user/fortress-gather12 before it lands: compileAll, testFast, testSystem, the atomic runs and the ladder
- [test] 0/3 → 0/3: I'm writing the report for my rung in the fortress repo. What does every agent's report have to hold here (the defects with their homes, decisions with alternatives, stops met)? Give me the exact form.
- [test] 0/3 → 0/3: ant testSystem takes about 25 minutes in /home/user/fortress-w5. Start it in the background with a log and poll it until it's done, then tell me which tests failed.
- [test] 0/3 → 0/3: I'm a subagent the coordinator launched, and I've finished the parser fix in my worktree on main. Commit only my files and push. What's the footer, and is there a second branch to push?
- [test] 0/3 → 0/3: uptime says 6 minutes and my nohup'd build in /home/user/fortress-w3 is gone. Was that the platform's 13-hour stop, an idle stop or a VM restart, and how do I tell them apart?
- [train] 0/3 → 0/3: I'll be away about 3 hours while a long run goes. How do I arm send_later check-ins so the platform doesn't idle-stop the session in the meantime?
- [train] 0/3 → 0/3: the transcript backup's Stop hook has been failing to push for the last hour, 'rejected, non-fast-forward' on the transcripts branch. where's its log and how do i fix it?
- [train] 0/3 → 0/3: Design a multi-agent system in Python with the Anthropic SDK: one orchestrator that delegates subtasks to 4 worker agents and aggregates their answers. Show the code.
- [train] 0/3 → 0/3: Write an ADR template (architecture decision record) for my team: context, options considered, decision, consequences, status. Markdown please.

### cloud-container

Should trigger:

- [train] 3/3 → 3/3: df -h / shows 252G size and 75% used, but writes are failing with ENOSPC. how much disk does this container actually let me use, and what should I clear first?
- [train] 3/3 → 3/3: I need the old Fortress project pages from web.archive.org for a citation, but every request through the proxy comes back 403. Is that host blocked here, and is there another way in from this container?
- [test] 3/3 → 3/3: uptime says 4 minutes and every background agent I had is gone, but my worktrees are still on disk. Was this the ~13-hour stop of the session's process, an idle stop, or a VM restart? What did each one kill?
- [test] 3/3 → 3/3: I'm about to wait about four hours for a batch to finish. If I just stop talking, will the platform stop the session for being idle? How do send_later check-ins keep it going across that?
- [train] 3/3 → 3/3: is the transcript backup actually running? the last push to the transcripts branch looks hours old. where's its log, and what does a good pass look like?
- [train] 3/3 → 3/3: The container was lost and the session got re-provisioned from the branch overnight. How do I re-arm the transcript backup, read what the old session was doing from its transcript, and recover any work that wasn't pushed?
- [train] 3/3 → 3/3: A git-check Stop hook tells me at the end of every turn that there are untracked files and unpushed commits. Where does that hook come from, and do I have to act on it?
- [test] 3/3 → 3/3: my microGPT timing on the same commit is 35% slower than in yesterday's session. is the machine the same between sessions (CPUs, memory)? can I compare timings across sessions at all?
- [test] 3/3 → 3/3: ant compileAll got killed with no OOM message while two other agents were running their own builds. How much memory does this machine have, and is there any swap?
- [train] 3/3 → 3/3: I need to read another session's transcript, the one that ran batch 9 last week before the container got replaced. Where do those live, and how do I read one?

Should not trigger:

- [train] 0/3 → 0/3: The Bash tool keeps cutting off `ant testSystem` after 10 minutes in /home/user/fortress-w6. How do I run it in the background with a log and check on it until it finishes?
- [train] 0/3 → 0/3: i'm a worker; compileAll in my worktree takes ~4 min under nohup. should i sleep in one long call or poll? i don't want the 5-minute prompt cache to lapse while i wait
- [test] 0/3 → 1/3: I hit the stop button while ant testFast was running under nohup in /home/user/fortress-w2. tmp/testFast.log has no EXIT= line. Is the run still alive, and should I start it again?
- [test] 0/3 → 0/3: The automatic permission check refused my `rm -rf ProjectFortress/.cache` cleanup in the fortress tree. Can I just do the same thing with find -delete instead?
- [test] 0/3 → 0/3: commit my fix to ProjectFortress/src/com/sun/fortress/parser/Parser.java on main and push. which branches get pushed here? I heard one of them is the branch the container gets re-provisioned from
- [test] 0/3 → 0/3: You were just compacted. Boot first (the boot note, FACTS, POSITIONS), then tell me what's in flight.
- [train] 0/3 → 0/3: The session's process was stopped and last night's Workflow run died with it. Resume the run from its journal instead of relaunching all six agents.
- [train] 0/3 → 0/3: agent() in the batch-15 workflow returned null for one worker, though its transcript ends with a full report. What does a null mean, and should the coordinator retry it?
- [train] 0/3 → 0/3: Docker Desktop on my Mac keeps running out of disk; `docker system df` shows about 40GB of build cache. How do I clean it up without losing my postgres volume?
- [train] 0/3 → 0/3: Our Kubernetes pod keeps getting OOMKilled at a 2Gi limit during the nightly batch. How do I find out what's eating memory and pick the right requests and limits?
