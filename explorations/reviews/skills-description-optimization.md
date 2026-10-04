# The three project skills' descriptions, optimized with the skill-creator

Done on 2026-10-04, 20:05 to 20:40 UTC. I followed the skill-creator's "Description Optimization" section and used its own scripts, unmodified:

- Each skill got an eval set of 20 queries: 10 that should trigger it and 10 near-misses that should not. I wrote each set myself, as the section describes. Nobody reviewed them, because there is no review page here.
- Each set went through `scripts.run_loop` with the session's model (Opus) and the script's defaults: at most 5 iterations, a 60/40 train/test split, 3 runs per query, and a trigger threshold of 0.5.
- The script picks the best description by its score on the held-out test set.
- Scores are given in queries passed (train out of 12, test out of 8), and also in runs correct (out of 60).
- "Before" is the loop's first iteration, which scores the description as it was. "After" is the description now in the skill.

## Results

- `fortress-repo`: before, train 10/12 and test 7/8 (52/60 runs). After, 12/12 and 8/8 (59/60 runs). **Description replaced.**
- `remote-container`: 12/12 and 8/8 (60/60 runs) at the first iteration, so the loop stopped with all queries passing. **Description kept.**
- `coordinator`: train 11/12 and test 8/8 (57/60 runs) at the first iteration. No later iteration can beat a full test score, so the script would select this one. **Description kept.**

## How the run was set up, and why

- **One worker instead of ten.** `run_eval.py` writes a temporary command, `<skill>-skill-<id>`, into `.claude/commands/` and counts a run as triggered only when the model invokes that run's own copy. With the default `--num-workers 10`, every run's skill listing held all the concurrent copies (9 in the probe), so the model often picked a sibling copy.
  - Probe on 3 should-trigger queries: 1/9 runs counted as triggered with ten workers, and 9/9 with `--num-workers 1`.
  - All loops therefore ran with `--num-workers 1`.
- **One private project root per skill.** Each loop ran from its own empty project root in the scratchpad, with `PYTHONPATH` set to the skill-creator, so the three loops could run at once without seeing each other's commands.
  - The plain invocation, from the skill-creator's folder, would make `/root` the project root. That gives the same context: the user-level skills only.
- **What the test does not include.** In the test, each description competed only with the user-level skills. The repository's `CLAUDE.md` and the other two project skills were absent.
  - So a near-miss that belongs to a sibling skill had no sibling to go to. On those queries the test is stricter than real use in the repository.
- **Where everything is.** The workspace is outside git: `scratchpad/skills-description-optimization/` (each skill's `eval_set.json`, `loop.log`, `output.json`, and `results/<time>/results.json` and `report.html`). The skill snapshots taken before any edit are under `snapshots/`.

## fortress-repo

### Eval set

Each line gives the split ([train] or [test]), then the runs that triggered for the old description → for the applied description.

Should trigger:

- [train] 3/3 → 3/3: i just edited Library/List.fss in /home/user/fortress to add a reverse method on List[\T\]. what do i need to rebuild before i run ProjectFortress/tests/ListTest.fss under walk? i don't want to wipe the caches if i can avoid it
- [train] 3/3 → 3/3: In the fortress revival tree, ProjectFortress/tests/TupleCompare.fss started failing after my change to interpreter/evaluator/Evaluator.java. Run just that one test the way the suite runs it (not all of testSystem) and tell me what the error is.
- [test] 3/3 → 3/3: I want a test in /home/user/fortress that checks the static checker rejects `x: ZZ32 = 3.5`. Does it belong in compiler_tests/ or tests/, and how do I mark it as an expected failure with XXX until the checker fix lands?
- [test] 3/3 → 3/3: can you compile ProjectFortress/compiler_tests/atomic3.fss with the fortress bytecode compiler and run it at 4 threads a few times? want to know if the lost-update bug is back after yesterday's codegen change
- [train] 3/3 → 3/3: My branch fix/overload-resolution in the fortress repo was gated at 3f2a9c1. Since then I only touched ProjectFortress/tests/OverloadAmbig.fss and OverloadAmbig.test. Do I need to run the full gate again before it lands on main?
- [train] 3/3 → 3/3: measure the checker count and the distance to the switch-over on my worktree /home/user/fortress-w12 after my edit to TypeAnalyzer.scala in scala_src, and tell me whether either number moved
- [train] 3/3 → 3/3: The Fortress spec (Specification/, the LaTeX) says juxtaposition of two numbers binds tighter than unary minus, but the parser does the opposite. If I change the spec text to match, what form does a revision to the specification take in this repository?
- [test] 3/3 → 3/3: I'm about to start 3 agents on separate worktrees of /home/user/fortress, each fixing a different gap-ledger row. How do I set up the worktrees from one base build so they don't each spend ~200s in ant compileAll, and so I can still run the old code beside the new?
- [test] 3/3 → 3/3: ok the fix in ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java is done and the tests pass. commit it on my branch and push. which paths go in, and what footer does this project use?
- [train] 3/3 → 3/3: ant compileAll in the fortress tree fails with 'error while loading Object, class file has wrong version' from scalac after I sourced a different env. how do I get the build going again without deleting default_repository?

Should not trigger:

- [train] 0/3 → 0/3: My Claude Code session in this cloud container gets stopped after about 13 hours and the background agents die with it. After the restart, how do I resume the Workflow run instead of starting it over?
- [train] 0/3 → 0/3: df -h / says 252G size with only 10G available, and an agent's log write just failed with 'no space left on device'. How much disk does this cloud container really let a session use, and how should I read df here?
- [test] 3/3 → 1/3: I'm the coordinating session. The batch-10 worker returned its report with three decisions in it. Which of them do I put to the curator before anything is committed, and in what form do I ask?
- [test] 0/3 → 0/3: What were the main design goals of the Fortress programming language at Sun Labs, and why was the project wound down in 2012? Just a short history overview for a blog post, no code.
- [test] 0/3 → 0/3: write me a small Scala 3 example that does multiple dispatch over a sealed trait hierarchy, a bit like Fortress-style overloading. it's for my own toy project in ~/code/dispatch-demo, nothing to do with any existing repo
- [test] 0/3 → 0/3: In my company's Java monorepo (~/work/payments-svc) `ant test` takes 20 minutes. How do I run a single JUnit test class from ant without running the whole suite?
- [train] 2/3 → 0/3: At the end of every turn a git-check Stop hook in this session tells me there are untracked files and unpushed commits. What is that hook, and how should I answer its reminders?
- [train] 0/3 → 0/3: How many subagents does the Workflow harness run at once in this environment, and how long does the prompt cache live for a subagent that sits waiting on a background job?
- [train] 0/3 → 0/3: Can you explain how Haskell's Num/Fractional class hierarchy compares to algebraic traits like Monoid, Group and Ring in a language's standard library? Conceptual only, I'm writing lecture notes for a PL course.
- [train] 3/3 → 0/3: I'm the coordinator and it's 21:40 UTC; the curator wants to compact now. Rewrite the boot note so the session after the compaction knows what is in flight, and move his two open points onto the held list.

### Scores

- Iteration 1 (old description): train 10/12, test 7/8.
  - Three false triggers: the git-check Stop hook question (2/3), the coordinator's boot-note question (3/3) and the coordinator reading the batch-10 report (3/3).
- Iteration 2 (the optimizer's first proposal): train 12/12, test 8/8, 59/60 runs. The loop stopped there with all train queries passing; this is `best_description`.
- Applied text: identical except for its last sentence (see below). Scored again with the skill-creator's `run_eval.py` on all 20 queries: 20/20, 59/60 runs.
  - The only miss is the same one as in iteration 2: the batch-10 report query triggered 1/3 times, under the threshold.

### Old description (1064 characters)

> How to work safely and efficiently in the Fortress language revival repository (/home/user/fortress). Covers the ant build and the Fortress caches, what to rebuild after editing a .fss, an .fsi, Java or Scala, running programs under the interpreter (walk) or the bytecode compiler, running and writing tests (testFast, testSystem, harness-one.sh, junit.sh, .test keys, XXX expected failures), the gate, the checker count and the distance to the switch-over, the interpreter, the compiled checker and code generator, the library, the specification and its revision form, the gap ledger and the coordinator's records, what every agent's report holds (defects and their homes, decisions with their alternatives, stops met), seeding worktrees and running the old code beside the new, and committing and pushing. Load it before any build, test run, edit, measurement, commit or agent launch in this repository, even a small one, and when designing a multi-agent workflow for it. The container, the session, restarts and agents themselves are the remote-container skill.

### New description (989 characters)

> Use this skill for hands-on work on the Fortress language revival code in /home/user/fortress: building with ant and recompiling after editing a .fss, .fsi, Java or Scala file (never wiping caches); running programs under walk (the interpreter) or the bytecode compiler; running or writing tests (testFast, testSystem, harness-one.sh, junit.sh, .test keys, XXX expected failures); the gate; measuring the checker count or distance to the switch-over; changes to the interpreter, compiled checker, code generator, Library or Specification; the gap ledger or git history; seeding worktrees; committing a code change. Load it before any build, test, edit or measurement there, however small, and when planning agents for that work. Not for session housekeeping, even in this repo: Stop hooks, git-check reminders, compaction, boot or handoff notes, coordinator scheduling, held lists, restarts, disk or container limits. The container, the session and restarts are the remote-container skill.

`best_description` ended "... disk or container limits. Those belong to the remote-container skill." That sentence sends boot and handoff notes, held lists and coordinator scheduling to `remote-container`, which is wrong.

- The rules don't allow naming the `coordinator` skill instead.
- So I replaced only that sentence with "The container, the session and restarts are the remote-container skill." This echoes the old description's last sentence.
- The re-score above is of this exact text.

The value is double-quoted in the frontmatter, because it contains ": " twice and a plain YAML value cannot. The skill-creator's `quick_validate.py` passes it, and the session's skill listing shows it in full.

What the new description no longer names: what every agent's report holds, running the old code beside the new, and pushing. No query in the eval set tested these. The skill's body still carries all three.

## remote-container

### Eval set

Each line gives the split, then the runs that triggered (the old description, which is the kept one).

Should trigger:

- [train] 3/3: I need to run a 25-minute check script (./scripts/full-check.sh) in this cloud Claude Code session but the Bash tool cuts my command off at 2 minutes. How do I run it so it keeps going and I can check on it?
- [train] 3/3: my session just came back: uptime says 4 min and the 3 background agents I had running are gone. what did that kill, what's still on disk, and how do i pick the work back up?
- [test] 3/3: df -h / shows 252G size and 74% used, but writes are failing with ENOSPC. How much disk does this container actually let me use, and what should I clean first?
- [test] 3/3: I want to launch 6 agents from a Workflow script, each investigating a different failing test. How many will actually run at the same time here, and what does each one cost in tokens before it does any work?
- [train] 3/3: agent() in my workflow returned null for one agent even though its transcript shows it finished and produced its structured output. What does that mean, and should I retry it?
- [train] 3/3: The automatic permission check refused my `rm -rf /tmp/build-*` cleanup step. Can I just do the same thing another way, like find /tmp -name 'build-*' -delete?
- [train] 3/3: a worker I just launched will run for ~2 hours. should I sleep in a loop in this session until it's done, or arm a send_later check-in? I don't want to pay to re-cache my whole context every time I wake up
- [test] 3/3: The container was lost overnight and a new one got provisioned from my branch. How do I get the transcript backup going again, and how do I read what the old session was doing before it died?
- [test] 3/3: is the transcript backup actually running? I want to be sure this session's transcripts were pushed before I compact. where's its log and what does a good pass look like
- [train] 3/3: node --check passed on my Workflow script but the harness refused it at launch with a syntax error about an unterminated string. How do I check a Workflow script the way the harness parses it before launching?

Should not trigger:

- [train] 0/3: ant compileAll in /home/user/fortress finished. Which library files do I recompile before `bin/fortress run` of a compiled test, now that I edited Library/FortressLibrary.fss?
- [train] 0/3: Set up a SessionStart hook for this repo so that Claude Code on the web installs JDK 25 and runs the ant build before each session starts.
- [test] 0/3: Write a Dockerfile for a Java 21 + Scala 2.13 + Ant build image with a 4 CPU / 8GB limit, for our CI on GitHub Actions. Keep the image small.
- [test] 0/3: my laptop's Docker Desktop keeps running out of disk, `docker system df` shows ~40GB of build cache and a bunch of dangling volumes. how do i clean it up safely without losing my postgres volume?
- [test] 0/3: Add a PostToolUse hook to my ~/.claude/settings.json that runs prettier on the file after every Edit or Write.
- [test] 0/3: Our Kubernetes pod keeps getting OOMKilled at a 2Gi limit during the nightly batch. How do I find out what is eating memory and pick the right requests/limits?
- [train] 0/3: I'm the coordinating session of the Fortress revival. A worker's report came back with a decision to change a line of the model program. Does that go to the curator first, or do I land it and list it for review?
- [train] 0/3: commit my three changed files under explorations/compile-ladder in the fortress repo and push main. what's the commit footer this project wants?
- [train] 0/3: Explain how prompt caching is priced in the Anthropic API (cache writes vs reads, the 5-minute vs 1-hour TTL). I'm budgeting for a Python app that calls Claude a few thousand times a day.
- [train] 0/3: Write a bash script for my own Ubuntu server that runs a long pg_dump export in the background with nohup, logs to a file, and emails me when it finishes or fails.

### Scores

- Iteration 1: train 12/12, test 8/8, 60/60 runs. The loop stopped with all queries passing, and `best_description` is the old description.

### Old and new description (unchanged, 1125 characters)

> How the cloud container and the Claude Code session running in it behave, as distinct from the repository on it. Covers the machine's limits (CPUs, memory, the disk allowance and why df misleads), the Bash tool's timeout and running long commands in the background, agents (how many run at once, an agent's starting cost, the prompt cache's life and what it means for waits, a project agent type's system prompt shared through the cache, an agent call that returns null, checking a Workflow script), the platform's stop of the session's process about every 13 hours, idle stops, VM restarts, interrupts and what each kills, resuming a Workflow run, continuing or relaunching an Agent-tool worker, send_later check-ins across a stop, the transcript backup and its blind spots, the platform's git-check Stop hook, the compaction hook, the automatic permission check, and a lost container and its recovery. Load it before a long command, an agent launch or a long wait, after any restart, stop, interrupt or compaction, when a tool call is cut off, the disk fills or a step is refused, and when designing a multi-agent workflow.

## coordinator

### Eval set

Each line gives the split, then the runs that triggered (the old description, which is the kept one).

Should trigger:

- [train] 3/3: you were just compacted. boot up and tell me what's in flight before you do anything else
- [train] 3/3: the batch 11 workflow finished about 10 minutes ago. read its result and tell me what I need to decide. keep it short, I'm on my phone
- [test] 3/3: Brief an Opus worker to trace why row 424 of the gap ledger fails under the compiled checker, and give me your token estimate before you launch it.
- [test] 3/3: can you take this one yourself or does it need my yes: the worker wants to change the spec's wording in section 7.4 so it matches what the interpreter does
- [train] 3/3: The worker's report says it chose to keep the old overload rule instead of the one in the paper. How does that reach me: asked first, landed and listed for review, or does it hold the work?
- [train] 3/3: Should the judgement on P1's F-bounded question run on Fable now, or do you need to ask me first? Usage is at 48% for all models this week.
- [train] 3/3: put the question about retiring protocol.md to me properly: one ask, with the options and what a yes commits me to
- [test] 3/3: Record what I just decided about when a repair reruns the gate in POSITIONS, and fix the boot note so the session after the next compaction picks it up.
- [test] 3/3: I'm going to read your last few turns one at a time and come back with points. Hold anything new until I say I'm done.
- [train] 3/3: the long run you started at 19:55 was estimated at 1.5M tokens. it's been 40 minutes, check it against the estimate and tell me if it's overrunning

Should not trigger:

- [train] 0/3: You are a worker on branch rung-12. Fix the failing test ProjectFortress/tests/GenericOverload.fss in your worktree /home/user/fortress-w12 and finish with your report.
- [train] 0/3: I'm writing the report for my rung in the fortress repo. What does every agent's report have to contain here, defects with their homes, decisions with alternatives, stops met?
- [test] 0/3: The session's process was stopped after 13 hours and my Workflow run died with it. How do I resume the run from its journal instead of relaunching?
- [test] 0/3: Draft a status update email to my manager about last week's sprint: 3 features shipped, 2 bugs still open, release slipped to Friday. Short and not defensive.
- [test] 0/3: Design a multi-agent system in Python with the Anthropic SDK: one orchestrator that delegates subtasks to 4 worker agents and aggregates their answers. Show the code.
- [test] 0/3: Write me an ADR template (architecture decision record) for my team: context, options considered, decision, consequences, status.
- [train] 0/3: How many agents can a Workflow run at once in this container, and what does each one cost before it starts working?
- [train] 3/3: run the gate on /home/user/fortress-gather9 before it lands: compileAll, testFast, testSystem, the atomic runs and the ladder
- [train] 0/3: I'm a subagent the coordinator launched; I've finished fixing the parser bug in my worktree. Do I commit on my own branch and push it, or leave the commit to the coordinator?
- [train] 0/3: Summarize this Slack thread for my PM and list the open decisions with an owner for each. It's about whether we migrate the billing service to Postgres 16 this quarter.

### Scores

- Iteration 1: train 11/12 (33/36 runs), test 8/8 (24/24 runs).
  - One false trigger: "run the gate on /home/user/fortress-gather9 ..." (3/3). The query belongs to `fortress-repo`, which was absent from the test.
- The loop was stopped during iteration 2 (decision 3 below), so `best_description` is the old description.
- The optimizer's first proposal was not scored, and it is not applied. It is kept here for reference (968 characters):

> Use this skill when you are the coordinating session of the Fortress revival, the main session that delegates work to agents and answers to the curator (the person who decides what is committed and what agents are asked to do). Load it at session start, after every compaction, and before: briefing or launching agents; choosing a tier or whether a Fable judgement needs the curator's yes; watching a long run against its token estimate; reading a worker's report or a batch result; judging whether a decision is consequential and how it reaches the curator (asked, listed for review, or held); putting a question to the curator or replying while they read; editing FACTS, POSITIONS, PLAN, the review queue, the boot note or the held list. Not for hands-on repo work such as running the gate, builds or tests, fixing code, checking a worktree, committing, or writing a worker's report. That belongs to the fortress-repo skill, whoever does it. Workers never load this.

### Old and new description (unchanged, 1460 characters)

> What the coordinating session of the Fortress revival does, and how decisions that agents take reach the curator, the person who curates this restoration and decides what is committed and what the agents are asked to do. Covers the coordinator's two roles (orchestrator and executive assistant) and the records each keeps, the boot at session start and after a compaction, delegation (what goes to a worker, which tier runs what, when a Fable judgement runs without asking and when it needs the curator's yes, the judge's rulings, a brief's form), watching a long run against its estimate, estimates in tokens, reading agents' reports, what makes a decision consequential and how one taken inside a worker's report or a batch reaches the curator (asked first, landed and listed for review, or a stop that holds the work), approvals and standing goes, the ask form, talking to the curator (register, lists, numbers, time, silence while a batch runs, the git-check hook's reminders, restate and hold while the curator reads turn by turn), and keeping the record (FACTS, POSITIONS, PLAN, the review queue, the boot note, the held list). Load it in the coordinating session only: at session start and after every compaction, before briefing or launching any agent, before reading a worker's report or a batch's result, before putting anything to the curator or replying while the curator reads, and before editing the coordinator's records. Workers do not load it.

## Decisions

1. **`--num-workers 1` instead of the default 10.** The alternative was the default, which scores a run that picks a sibling copy of the test command as a miss. The evidence is the probe above.
2. **Three private project roots, run at once, instead of one root (`/root`) run three times in turn.** The test context is the same (user-level skills only), and it took about a third of the time.
3. **Stopped the `coordinator` loop during iteration 2, instead of letting it run iterations 2 to 5.**
   - `run_loop.py:218` selects `max(history, key=test_passed)`, and Python's `max` returns the first of equal scores. Iteration 1 already scored 8/8 on the test set, so no later iteration could be selected.
   - Each further iteration is 60 `claude -p` runs, about 0.55M tokens written. The loop's last line in `loop.log` records the stop.
4. **Reworded the last sentence of `fortress-repo`'s `best_description`, instead of applying it verbatim or naming the `coordinator` skill.** The reasons and the re-score are above.
5. **Added one line to all three skills' `references/sources.md`.** For `fortress-repo`, the line says the description came from the optimization. For the other two, it says the optimization ran and kept the description as written.
6. **Left the eval runs' transcripts in place, instead of deleting them.**
   - The nested `claude -p` runs inherit this session's ID. They wrote `<session-id>.jsonl` files under five `/root/.claude/projects/` folders: `-root`, the skill-creator's folder, and the three private roots. That is about 6,800 lines, and the transcript backup will copy them.
   - Most runs were killed before any assistant entry was written, so their token use is in no transcript.

## Defects found, with their homes

- **`.claude/skills/coordinator/SKILL.md:3` is not valid YAML for a strict parser.** The unquoted value contains ": " ("in the coordinating session only: at session start"), so `quick_validate.py` refuses it with "mapping values are not allowed here". Claude Code still lists the description in full. The fix is to quote the value. Not made: it was outside this task.
- **Two descriptions are longer than the 1024 characters that the skill-creator holds as the spec's limit** (`quick_validate.py`, and the improve prompt's "hard limit"): `remote-container` (1125) and `coordinator` (1460). Claude Code lists both in full. The old `fortress-repo` description was 1064; the new one is 989.
- **Two existing lines in the skills' `sources.md` carry the curator's name** inside quoted record titles: `coordinator/references/sources.md:55` (a POSITIONS title) and `fortress-repo/references/sources.md:70` (an exploration heading). The name is not in any SKILL.md or part. Not changed.
- **The skill-creator's `scripts/run_eval.py` at its default `--num-workers 10`** puts concurrent copies of the test command side by side in one skill listing, which makes trigger rates come out too low. This is outside this repository.

## Spend

About 370 `claude -p` runs in all: the two probes, the three loops, the two improve calls, the aborted and the completed re-score, and one usage probe. One run in this context measured 8.9K tokens written (cache creation) and 24.7K read. The whole task is therefore about 3.3M tokens written, an estimate from that single measurement. These runs do not appear in the transcripts that the spend is read from.

## Stops met

None. Nothing was committed, and the workspace is in the scratchpad, outside git. Changed in the tree:

- `.claude/skills/fortress-repo/SKILL.md` (the description)
- the three skills' `references/sources.md` (one line each)
- this report
