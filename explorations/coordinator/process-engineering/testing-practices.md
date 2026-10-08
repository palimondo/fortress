<!-- What the agents of climb batches 8, 9 and 10 worked out, got wrong and worked out again about building, running Fortress programs, running tests and running the gate's stages (about 3M of 119.5M input-token equivalents, 2.8%), measured from their 64 transcripts on 2026-10-08, with each practice checked against the fortress-repo skill and given a one-sentence skill line, a tool, or nothing, and the evidence on whether a library edit may run `ant testSystem` once; evidence for the curator, nothing built or run. -->

# Testing practices: what the climb batches' agents learned, and learned again

Written 2026-10-08 for the coordinating session and the curator. Read-only: no build, no test and no Fortress program was run, and no file but this note and its INDEX line was written. The extraction scripts are in a scratch folder outside the repository and are not committed.

The question: what did the agents of batches 8, 9 and 10 work out about building, running programs, running tests and running the gate's stages? For each practice: is it in the `fortress-repo` skill now, is it right there, and would a tool replace the relearning?

## Words used

- **Climb batch**: one run of `explorations/coordinator/climb-batch-workflow.js`. Batches 8, 9 and 10 ran on 2026-10-02 and 2026-10-03 (runs `wf_603242ca-111`, `wf_f747fd3e-9e4`, `wf_d5ec6194-bcc`), 64 agents in all (21, 22 and 21).
- **Roles**: a **rung worker** repairs one area on its own branch. A **skeptic** checks the worker's change, and a **second skeptic** checks a repair. A **repair round** answers a refusal. A **judge** rules. The **gather** merges the rungs, the **gate** runs the checks that decide whether the merged tree lands, the **review** reads the merged diff and the **commit stage** lands it.
- **Working agents**: rung workers, skeptics, second skeptics and repair rounds. There are 42 transcripts (13, 15 and 14). Batch 9's count includes the two rung workers that a VM restart killed and their resumed attempts. **Checking and building agents**: the working agents and the 9 judges, 51 in all. Gather, gate, review and commit are left out unless a line says so.
- **Walk** is the interpreter. The **compiled path** is `fortress compile` and `fortress run`. The **harness** is the suites' own test runner (`SKILL.md`). `harness-one.sh` runs the interpreter's harness on files you name. `junit.sh` runs the compiled path's harness on `.test` files you name.
- **The stages**: the **checker count** (`explorations/coordinator/tools/checker-count/run.sh`) counts the errors the compiled checker reports over the interpreter's library. The **distance** (`tools/distance/run.sh`) lists them by site and class, in 20 to 25 minutes on one core. The **ladder regression** is step 7 of `gate.md`. The gate runs all three. The batch script also tells each rung worker to run the count and the distance once after its last edit.
- **ITE** (input-token equivalents) is the measure of `context-study.md`: cache write 1.25, cache read 0.05, fresh input 1, output 5. A call's cost is its command (0.28 tokens a character) and its result (0.41 tokens a byte plus 110) at 1.25 plus 0.05 for each later turn of the agent, plus 5 for each token of the command as output. My totals run about a quarter below `context-study.md`'s because the transcripts store a partial output count. The written tokens (cache creation plus fresh input) equal the batch reviews': 7.72M, 6.88M and 6.26M. The three batches come to 119.5M ITE.
- **Relearning**: calls where an agent read a script or source to learn how to run something, wrote its own script to run it, or got the first attempt wrong. Doing the work (a build, a stage, a wait) is not relearning.
- **The skill** was written on 2026-10-04. These batches ran before it. Their briefs carried a 47K-character shared prefix with worker procedure (`checking-roles-cost.md`, section 3), so some of what they relearned was in their briefs and not in a skill.

## The short answer

- The relearning came to about 3M ITE, 2.8% of the three batches. No practice is large. Together they are about two thirds of one rung worker's whole run (my model puts a batch 10 rung worker at 4.7M).
- The big items are two clusters of "how does this thing run": the stage drivers (about 1.1M) and the suites and the harness (about 0.8M). Redundant builds before the seeding script (about 0.35M, batch 8 only) were the third and are fixed.
- 27 of the 42 working agents wrote at least one shell script of their own into their scratch folder to run something. Many wrote the same script.
- The skill holds most of what they relearned. Eight of its lines need a change, and one of them is wrong in a way that would mislead a reader who has no ledger (section "Skill lines to change").
- Four things are in no part of the skill: the Java stack flag, the 120-second default of the Bash tool, the refusal of `sleep` before another command, and `harness-one.sh` deleting its scratch directory. The stages' usage is only in their script headers, which the curator chose on 2026-10-06.
- The tools worth building, in the order of what they replace: a ladder-regression driver, a one-component distance run with a line-mapped table, a suite runner, `harness-one.sh` and `junit.sh` at a stable path with a usage line, a probe runner, and a library-order checker.
- Open question: the evidence neither shows a library edit breaking a suite nor shows that it cannot (section "Evidence on the open question").

## How it was counted

- Each agent's transcript was read with a script: every Bash call with its command, its result and its time, and every turn's token usage. Run ids and agent labels come from each run's `journal.jsonl`.
- A call is "reading to learn" if it is `cat`, `sed -n`, `head`, `tail` or `grep` of one of these: `harness-one.sh`, `junit.sh`, `env.sh`, the stage drivers and their helpers (`classify.py`, `DistanceMulti.java`, `run-subset.sh`), `build.xml`, `FileTests.java`, `SystemJUTest.java` and the other `*JUTest.java` classes.
- A script is "written by the agent" if a call creates a `.sh` file with a heredoc.
- Failures are matched by the tool's message text. Each count below says what it matched.
- I read the calls around every episode I cite. Call numbers (written "C 12") are the n-th tool call of that agent, counted from 1, as in `context-study.md`.
- The classification of a command by its text is approximate. Treat every ITE figure as good to about a quarter.

## The practices, costliest first

### 1. Running the gate's measuring stages (about 1.1M ITE)

What it is: the checker count, the distance and the ladder regression, and the microGPT phase check that goes with the ladder. A rung worker runs the count and the distance once after its last edit. The gate runs all of them once.

How many agents, and at what cost:

- 21 of the 51 checking and building agents read the drivers' sources to learn how to run them: 9, 6 and 6 in the three batches. That is 92 calls and about 1.04M ITE. The briefs said "read the header of `checker-count/run.sh` first" (batch 10 brief), and the headers are 41 and 66 lines of comment.
- Four rung workers copied the ladder's subset driver and edited its paths with `sed` (I and O in batch 8, C and N in batch 10; calls I 154, O 170, C 250 and 311, N 198). Every gate agent did the same: four gate runs, one of them the second gate of batch 8 (b8 gate 19 and 21, b9 gate 25, b10 gate 15). `gate.md` step 7 now lists the same six steps.
- At least 5 agents wrote a one-component check of their own, to avoid the 20-minute full distance during development: R's `devcheck.sh` and `checkprog.sh` (batch 9, calls 87 and 207), S's `devcheck.sh` and the resumed S's `devcheck2.sh` (85 and 89), Q's `check.sh` (batch 8, 139), G's `dev-check.sh` (batch 10, 87). The batch 10 review (section 3) counts G's 12-minute partial run as a measurement repeated against a rule. Batch 9's review counts R's and S's, about 20 minutes of the machine.
- At least 6 agents wrote a script to map the distance table's sites back through their diff: Q (`sitediff.py`, batch 8, calls 167 and 168), M (175), the repair round of Q (`remap.py`, 94), R (`sitemap.py` and `remap-back.py`, batch 9, 166 and 202), G (`sitediff.py`, batch 10, 142) and, by `context-study.md`, N. The cause is ledger row 577: `classify.py` assigns a site to a class by fixed line ranges, so any edit that inserts lines in `FortressLibrary.fss` moves sites between classes. Rungs Q, M (batch 8), R (batch 9), N and G (batch 10) each reported it, and it is "a tool matter for the coordinator" in M's own words.
- Each gate agent types out the batch script's shell functions (`helpers.sh`, `gatefns.sh`, `atomic.sh`, `ladderfns.sh`, `checkerfns.sh`) from its prompt, about 7K to 8K characters a run in batches 9 and 10. The b10 gate then took 42 calls and 30 minutes with no error.
- The stages themselves are the largest block of machine time: 147 minutes of distance runs in batch 10 (`reviews/batch-10-review.md`, section 3). That is work, not relearning, and is left out of the figure above.

In the skill now:

- `gate.md` holds the ladder regression and the atomic runs. It does not hold the checker count or the distance. The curator took them out on 2026-10-06 (`226f47b23`): "the batch script's prompts carry how to run them", and `coordinator/references/delegation.md:37` names them.
- Is `gate.md` right? Its seven steps match what the b10 gate did (calls 4 to 36), including the two cache copies before anything else compiles. The one thing it leaves to the reader is the six-step setup of the ladder (copy five files, point two variables, write a list, run, classify, compare). Every gate agent and four rung workers did these steps by hand.

Recommendation: a tool, and a fix of a tool. No skill text, since the curator has settled where this lives.

- Tool `tools/ladder.sh <tree> <out-dir> [list-file]`. It does `gate.md` step 7 and its setup: copies the driver and the helpers into the out-dir with `OUT` and `LADDER_ROOT` set in place of the `sed` edits, takes the two cache copies if they exist (else runs the library order), runs the subset (default: the 85-file pass list), classifies, runs the microGPT phase on the 18 components, and prints DOWN, MISSING, STDOUT and UP lines against the baseline. It exits 1 on red.
- Fix `tools/distance/classify.py` to classify by declaration name, not by line range (row 577), and give `tools/distance/run.sh` a `--component NAME` option with a usage line in its header. That removes the one-component wrappers and the six line-mapping scripts.
- Put `gate_summary`, `gate_compare` and the other gate functions in one sourced file under `tools/`, so a gate prompt says "source it" and does not carry 8K characters. The batch script owes this edit (`pending-script-edit.md` has no item for it).

### 2. How the suites and the harness work, and whole suites run by hand (about 0.8M ITE)

What it is: how a walk test passes or fails, what an `XXX` test inverts, what the `.test` keys do, and how `ant testFast` and `ant testSystem` set up their JVMs (private caches, 768 MB, 32 MB stacks, one thread, four shards).

How many agents, and at what cost:

- 23 of the 51 read `FileTests.java`, `SystemJUTest.java`, `CompilerJUTest.java` or `build.xml` for it: 8, 6 and 9 in the three batches. That is 121 calls and about 0.79M ITE. The pass rule at `FileTests.java:360-420` and the `.test` keys at `:100-175` are the usual targets. Rung K read the file in four large ranges (calls 7 to 10).
- Seven agents wrote their own track or shard scripts, copying the `fastTrack` and `systemShard` macros of `build.xml`: I and O in batch 8 (`tracks.sh`, calls I 135 and O 162), K, W and the resumed W in batch 9 (`corpus.sh`, calls K 195, W 136 and W 76), and C and W in batch 10 (`tracks/run.sh`, C 206, and `shard.sh`, W 115). Each run took 3 to 18 minutes of wall time, the longest at a load of 10 to 13.
- The batch 10 brief is the cause. It said "Do NOT run ant testFast or ant testSystem" and then "Nor run a whole suite another way (a track's JUnit class over its whole corpus, ... the interpreter suite in shards), with one exception": a rung whose edit changes the checker's or walk's Java or Scala may run the suite its edit reaches, once for each code state. The only way the brief leaves is a hand-made run. A `testSystem` run is the same four JVMs with the same flags.
- These runs found real failures. I (batch 8) found one test in the compiler track, `InferO2Z64`. W (batch 9) found six interpreter tests broken by its first design. W (batch 10) found the team's `disp0`, which the first reading of "provides" refused (calls 137 to 148). The first runs of O (batch 8), K (batch 9) and C (batch 10) were green.

In the skill now:

- `tests-writing.md` holds the `.test` keys and the `XXX` rules. `tests-running.md` holds the switches (line 33), the rule for a whole suite (line 47) and a recipe for one track of the compiler, library and othercompiler suites (line 116). It has no recipe for the interpreter's shards, and does not forbid `ant testSystem`.
- Is it right? Two details are not.
  - `tests-writing.md:30` says a passing walk test "prints neither `fail` nor `FAIL`. So a passing test must not print those words." The code is a substring test over standard output and standard error: `FileTests.java:382-385` fails a test when either stream contains `fail` or `FAIL` anywhere, so "failure" or "failed" fails it. Only `QuickCheckTest` is exempt.
  - The one-track recipe (`tests-running.md:116`) omits `-Dfortress.junit.reset=false`, which `fastTrack` sets (`build.xml:925-945`). Without it the class empties its private caches folder at start (`CompilerJUTest.java:32`, `Shell.java:115-122`). This is harmless, because the recipe's folder is empty, but the macro and the recipe differ.

Recommendation: one sentence of skill text, a change of the batch script, and a tool.

- Skill text: "A walk test fails when `fail` or `FAIL` appears anywhere in its output, as part of a longer word too (`failure`), except in `QuickCheckTest` (`FileTests.java:382`)."
- Batch script: let a walk rung's one whole-suite run be `ant testSystem`, which does not compile and keeps its caches in the tree's `test-caches`. A walk rung then does not read `build.xml` or write shards. For the checker the skill's track recipe stays, because `ant testCompiler` and `ant testLibrary` run `ant compileAll` first and delete the caches (`tests-running.md:114`). `pending-script-edit.md` should carry this item.
- Tool `tools/suite.sh {walk|compiler|library|othercompiler} [i/n]`: the macros' JVM flags in one place, private caches, a trailing verdict line. It would replace the seven hand scripts and the recipe block, which today can drift from the macros.

### 3. Building before the seeding script (about 0.35M ITE, batch 8; fixed)

What it is: `ant compileAll`, the library order, and the base build that every worker needed.

Cost, from the batch reviews and my model:

- Batch 8 ran 35 builds, 22 of them of code another agent had already built, about 85 minutes of the machine (`reviews/batch-8-review.md`, section 4). My model puts all build calls of batch 8 at 0.56M ITE, 22 of 35 of which is about 0.35M.
- Batch 9 ran 16 builds, one redundant, after the seeding script and the base build. Batch 10 ran 11, one redundant (`batch-9-review.md` section 2, `batch-10-review.md` section 3).
- The library order was run by hand 16 times in batch 8 (I 5, O 4, skeptics, gates) and 4 times in batches 9 and 10 together.

In the skill now: `worktrees.md` (seeding and the old code beside the new), `build-and-caches.md` (the order, the three kinds of edit, the symptoms). Nothing here is relearned any more, since the brief carried the seeding command.

Is it right? One figure is low. `build-and-caches.md:72` says `ant compileAll` takes "about 25 to 60 s on a built tree". In the working agents' 66 builds the median is 54 s, batch 9's median is 80 s (walk's Java is a large rebuild) and the longest is 138 s (C, batch 10, call 188). The figure holds on an idle machine. While four rungs and their skeptics run, count on one to two and a half minutes.

Recommendation: change the number in one clause: "25 to 60 s on an idle machine, up to 140 s while other agents build". Nothing else.

### 4. Running a probe, and running it on the old code (about 0.35M ITE)

What it is: a probe is a small Fortress program an agent writes to see one behaviour. Agents compile and run it on the compiled path, run it under walk, and run it again on the base build for the old behaviour.

How many agents, and at what cost:

- 19 working agents wrote a runner script for this (26 scripts, about 0.17M ITE), and 12 wrote an environment script (13 scripts, about 0.08M). 16 of the 51 read `env.sh` (about 0.10M). In all, 27 of the 42 working agents wrote at least one script into their scratch folder: 11 of 13, 7 of 15 and 9 of 14 in the three batches.
- The scripts hold the same six things. They set the environment without the `rm` of `env.sh`. They `cd` to the program's directory. They compile, then run, with `timeout`. They filter the `at ...` stack frames. They remove the probe's entries from `default_repository/caches` (`find ... -name "*$n*" -exec rm`). They run the same probe on a second build. Examples: I's `probe.sh` (batch 8, call 38), the skeptics' `run.sh` and `run3.sh` (batch 10, C 23 and W 28), G's `each.sh` (85).
- First attempts failed in small ways. I's first `probe.sh` cd'd to `ProjectFortress` and looked for the probe there ("Cannot find file ...ProjectFortress/PbSingle.fss", calls 39 and 40). Two skeptics lost a probe to the variable name `big` ("Variable big is already declared", M in batch 8 call 75 and S in batch 9 call 36). The skill names `even`, `numerator` and `shift`; `big` and `rest` are more such names.
- No transcript shows a run broken by `env.sh`'s `rm -rf /tmp/fortress*rats`, in about 300 sources of it by all roles. The hazard is real in principle. None showed.
- Per-call setup works: only 18 results in all 64 transcripts carry "Picked up JAVA_TOOL_OPTIONS", the sign of a call that skipped it.

In the skill now: `build-and-caches.md` ("Setting up each call"), `compiler.md` ("Running"), `interpreter.md` ("Running a program") and `worktrees.md` (`old-fortress.sh`) cover it. The skill does not say that a probe leaves a jar in the shared `bytecode_cache/`, or that a failed compile followed by a run prints a second, misleading error ("Could not load X ... Resource not found", 14 agents). Is it right? Yes, as far as it goes.

Recommendation: a tool, no skill text. `tools/probe.sh [--base <build>] [walk|comp|tc] P.fss...`: the environment without the `rm`, compile then run, optionally the same on a base build through `old-fortress.sh`, frames filtered, the probe's cache entries removed, the exit codes printed. It would replace 19 wrappers.

### 5. `harness-one.sh` and `junit.sh` (about 0.34M ITE)

What it is: the two scripts that run named tests through the harness. The skill documents both (`tests-running.md:72`, `:89-99`).

How many agents, and at what cost:

- 33 of the 51 read one of the two scripts (13, 10 and 10 in the three batches, 41 calls, about 0.32M ITE). The briefs name the scripts and do not print their usage. `junit.sh` lives at a path with a literal `climb-batch-N`; C found it by `ls explorations/compile-ladder | head -100` (batch 10, call 12).
- Six agents lost one call to a relative scratch directory: R (batch 9, call 71), K (17), W (84), S (95), G (batch 10, 106) and W (68). `harness-one.sh` does `rm -rf "$S"; mkdir -p "$S/tests"` and then `cd ProjectFortress`, so a relative `$S` is made under the tree's root and looked for under `ProjectFortress`: "tests does not exist". The resumed workers did not repeat it. They had read their predecessors' transcripts. Batch 8's briefs used absolute paths and had no such failure.
- The same script deletes its scratch argument at its start and at its end. A path that holds anything else loses it.

In the skill now: `tests-running.md:72` gives `harness-one.sh <tree>/tmp/h1 ...`. The `<tree>` hints at an absolute path and does not say so. The skill does not say the directory is deleted. Is it right? Yes, and incomplete in these two points.

Recommendation: one sentence, and a tool change.

- Skill text: "Give `harness-one.sh` an absolute scratch directory that holds nothing else: the script deletes it when it starts and when it ends."
- Tool: move both scripts to `explorations/coordinator/tools/` (they sit in a rung folder and a batch folder, and the cleaning commits removed thousands of files from `compile-ladder`, `ab067d9b6` among them; `batch-9-review.md` section 2 gives the rule for kept tools), take the scratch path through `realpath`, create it with `mktemp -d` when none is given, add a usage line, and let `junit.sh` set its environment without `source env.sh`.

### 6. Waiting, the Bash tool's limits, and the automatic check (about 0.18M ITE)

What it is: how to wait for a background run, and what the tool and the automatic permission check do to a command.

Counts, by message text:

- 22 calls were moved to the background at the tool's 120-second default (19 agents). Of 175 `wait_for` calls with a bound of 120 s or more, 29 passed no `timeout` argument and 11 of those were moved. The 146 that passed one were not. The functions are in `session.md`, the argument is not.
- 18 calls were refused with "Blocked: sleep N followed by ...", one in each of 18 agents. The message says to use `run_in_background` or an until-loop.
- 13 commands were refused by the automatic check, in 12 agents (batch 9: 7, batch 10: 6, batch 8: none): "passes a shell -c script that runs rm". Most held an `rm` and the `bash -c` of the `run_bg` wrapper in one command, or called a script that runs `rm`. 12 were rerun in another form, with the `rm` in its own call or the wrapper dropped, and ran (R 82 to 83, S 88 to 90, N 180 to 182, W 95 to 96 and others). One, the commit stage's `mg-run.sh`, whose script runs `rm -rf`, was reported and never rerun, and the two microGPT programs went unrun (`batch-10-review.md` section 3).

In the skill now: `session.md` holds `run_bg`, `wait_for`, the 270-second bound and the refusal rule. Is it right? It lacks the 120-second default and the refusal of `sleep`. Its refusal rule says "Do not try for the same result with another tool, by another route or in a later turn." Twelve of thirteen agents did exactly that, with success, on commands that were false positives. Whether splitting a command is "another route" is the curator's to say (question 2).

Recommendation: two sentences of skill text.

- "The Bash tool ends a call at 120 s unless you pass `timeout` (at most 600 s), and refuses `sleep N` before another command."
- If the curator allows it: "The automatic check refuses a command that holds `rm` and a `bash -c` wrapper; put the `rm` in its own call."

### 7. The Java stack of a crash (about 0.14M ITE)

What it is: the checker and walk print one line for an internal error and hide the Java stack. The flag that shows it is `-debug stacktrace` for the compiled path and `-debug interpreter` for walk.

Counts: 5 agents used a `-debug` flag in 19 calls (K 30 to 33 and W 44 and 114 in batch 9; C 36 to 56 and its skeptic 25 to 85 in batch 10; W's skeptic 41 to 44). C found the flag by reading `Shell.java` and `Debug.java` (calls 36 to 40). 32 agents saw the hint 'Turn on "-debug interpreter" for Java-level stack trace' in 103 run outputs, which names only the walk flag. The compiled checker's crash needs `stacktrace`, which no message names. The skill, the FACTS file and the ledger do not hold it (`context-study.md` section 4).

In the skill now: nothing. Recommendation: one sentence in `compiler.md`: "To see the Java stack of a crash, add `-debug stacktrace` to a compiled command (`bin/fortress compile -debug stacktrace P.fss`); for walk add `-debug interpreter`."

### 8. The library order and the cache symptoms (small, but two lines are wrong)

What it is: the five library compiles, and what the run prints when a step was skipped.

Evidence:

- "Unable to read serialized data ... relink" came up when 4 agents ran programs: rung I and its skeptic in batch 8 (six or seven runs each), and the skeptic and the second skeptic of rung W in batch 9. `build-and-caches.md:116` says it is "a stale cache, not a compiler bug. Run the library order." It is also what a genuine code-generator defect prints: ledger rows 413, 537 and 559, and `compile-ladder/baseline-2026-09-19/REPORT.md:453, 579`. None of the four cleared a cache. Rung I looked the message up in the ledger (call 109) and found the row. A reader without the ledger would run the library order and loop. The line came from `repo-internals.md:158-165`, which is older than those rows.
- A `NoSuchMethodError` on a mangled method of the program itself (for example `\=tag?1??Arrow...`, ledger row 594, met by the skeptic, the repair round and the second skeptic of rung W in batch 9) is also a defect, not a skipped step. `build-and-caches.md:115` gives two examples that are library members (`println`, `coerce_ZZ32`), and says "a component was not recompiled". Those examples hold. The rule reads wider than they do.
- Five library jars missing after a library order that exited 0: a second case beyond `build-and-caches.md:32`. In batch 8 the second skeptic of Q had `bytecode_cache/` without the library jars and with the analysed `.tfi` entries (calls 53 to 66, 16 calls). Its probes died with `NoSuchMethodError ... coerce_ZZ(IntLiteral)`. It emptied `default_repository/caches/` and ran the order again, and the five jars came. Its report says "`ant compileAll` runs emptied `bytecode_cache` but left the analysed `.tfi` files", which conflicts with `build-and-caches.md:73`, where `compileAll` deletes the whole folder. The cause is still not known. `build-and-caches.md:113` says not to delete the caches. Here the wipe was the cure.

Recommendation: two skill edits and a tool.

- `build-and-caches.md:116`: "'Unable to read serialized data ... relink' is usually a defect of the code generator (ledger rows 413, 537, 559). Run the library order only if the member it names is in a `Compiler*` or `AnyType` component."
- `build-and-caches.md:115`: add "A `NoSuchMethodError` on a method of your own program is a defect (rows 390, 594)."
- Tool `tools/library-order.sh [tree]`: the five compiles, then a check that five non-empty jars exist, with exit 1 and the message if not. It replaces the "check five jars" step of the skill and notes the second case.

## Evidence on the open question

The question: may an agent run `ant testSystem` once after an edit to the library, as it may after an edit to walk's Java (`tests-running.md:47`)? The evidence below is from the three batches only.

What a library edit reaches: a change to the interpreter's library (`Library/FortressLibrary.fss`, `List.fss` and the others) is read by every walk test, so it reaches `testSystem`. A change to the compiled path's own prelude (`Compiler*.fss`, `AnyType`) reaches the compiled tracks.

Batches 8 to 10, by edit:

- Edits of walk's or the checker's Java or Scala, with a whole suite run by the rung (first runs only): I (batch 8) found a failure in the compiler track. W (batch 9) found six interpreter tests broken. W (batch 10) found one, `disp0`. O (batch 8), K (batch 9) and C (batch 10) were green. So 3 of 6 first runs found a regression the rung's own tests had not.
- Library-only edits: rungs R and S (batch 9) and G and N (batch 10) ran no whole suite. Their brief did not allow it. They ran their own tests and a few walk tests chosen by hand (S: two runs of 6 and 2 tests).
  - N ran 4 new tests and 42 "neighbours" in three harness runs, chosen by name (a `grep` of file names for list, tuple, number, typecase, exception and range; calls 179 to 182, 186, 188 to 190 and 229): 9 calls and about 34K ITE, one refused by the automatic check. Its report says "The neighbours are the rung's choice; the gate judges every verdict on the merged tree."
  - G chose 14 tests by a `grep` for the names it had edited (calls 118 to 120, 124, 134 and 146): 6 calls and about 11K ITE. Its report says "The whole suite's verdicts are the gate's."
  - N's edits changed `assert`, `fail` and `shouldRaise`, which most tests call.
- The gates: `testSystem` passed at the first run in all three batches (504 and 516 tests in batch 10). No library-only rung's change broke a walk test in these batches. No hand-chosen subset missed a failure that the gate found.
- Rung Q (batch 8, library) ran the whole interpreter corpus three times, as a named one-time count (`count-run.sh`, one JVM for each test): 15 to 20 minutes a pass, 469 tests. It found 2 or 3 changed outputs and no changed verdict. A `testSystem` run uses one JVM for each shard and takes 3 to 4 minutes.

Cost of the run, from W's shards and the gates:

- The resumed W (batch 9, calls 76 to 86) ran four shards in 2 minutes 55 seconds at a load of 1.7: 7 calls and about 46K ITE with the reading of the failures. W (batch 10, calls 114 to 150) ran them in about 3 minutes at a load of about 4: 10 calls and about 24K ITE. The gate's `testSystem` took 3 minutes 46 seconds (batch 10) and 4 minutes 3 seconds (batch 9). The checker rung's compiler and library tracks took 8.5 minutes at a load of 1 (C's repair round, 512 seconds for the compiler track), and 14 to 18 minutes at a load of 10 to 13 (C's first and second runs, calls 206 to 265 and 301 to 310).
- A whole run takes 7 to 10 calls and 24K to 46K ITE. A hand-chosen subset takes 6 to 9 calls and 11K to 34K ITE. The calls are about the same. The subset checks one tenth of the files.
- Four rungs each running four JVMs saturate four cores. Load was 10 to 13 while C ran its tracks in batch 10, and its runs took twice as long.

What the evidence supports, and does not:

- It supports: a whole-suite run after a Java edit to walk or the checker is worth its minutes. Three of six found a regression.
- It supports: for a library edit, one `testSystem` run costs about as many calls as the hand-chosen subsets of N and G (7 to 10 against 6 to 9) and checks every file. What differs is the machine: 3 to 4 minutes of four cores.
- It does not show a library edit that broke a walk test. Four library-only rungs and three green gates are too few to say the risk is real or nil.
- It does not settle the load on the machine, nor whether the gate's own run makes the rung's run a repeat. `SKILL.md` says to reuse results and not run again after the same code; a rung's run is on a different code state from the gate's merged tree (`gate.md`, `tests-running.md:51`).

If the curator allows it, one sentence of skill text: "If your edit changes a library file that walk reads, you may run `ant testSystem` once for each code state, after your last edit." The batch script's wording would have to change with it (practice 2).

## Skill lines to change

Listed once, with the evidence above. Each is one sentence or one clause.

1. `build-and-caches.md:116` (serialized data): wrong as a rule. See practice 8.
2. `build-and-caches.md:115` (`NoSuchMethodError`): reads wider than its examples. See practice 8.
3. `build-and-caches.md:32` and `:113`: add the second case of an empty `bytecode_cache/`, and that wiping the caches cured it. See practice 8.
4. `tests-writing.md:30` (pass rule): say "as a substring, in standard output or standard error, except `QuickCheckTest`". See practice 2.
5. `tests-running.md:72` (`harness-one.sh`): absolute scratch directory, which the script deletes. See practice 5.
6. `session.md:5` and `:33`: the 120-second default, `timeout`, and the refusal of `sleep` before another command. See practice 6.
7. `build-and-caches.md:72`: the build time while other agents run. See practice 3.
8. `compiler.md`, "Running": the `-debug` flags. See practice 7.

## Not a problem

- Per-call setup (`build-and-caches.md`): 18 sightings of a skipped setup in 64 transcripts.
- The seeding script and the old code beside the new: they removed batch 8's redundant builds, and the skill holds them.
- `env.sh`'s `rm`: no broken run in any transcript.
- The `XXX` demonstration (two harness runs, one with a stand-in changed to pass): every rung did it, as the skill asks. It cannot be a tool, since the stand-in is a hand edit.
- The gate: three batches, no failure of the gate agent itself. Its prompt carries the functions. Practice 1 covers what a tool would save.

## Limits

- The classification of a call by its command text is approximate. A command that does several things lands in one class. The ITE figures are good to about a quarter.
- Thinking is not stored, so I cannot say what an agent weighed before it read a script. The count says it read it.
- Three batches before the skill existed, with briefs that already held part of the procedure. The numbers say what a reader without the skill would have to learn, less what the brief gave.
- Batch 8's agents had no seeding script and no `old-fortress.sh`. The batch 8 rows describe a state that is gone.
- The open question rests on four library-only rungs and three gates.
- I did not read the 64 transcripts whole. I read the commands of the rung workers of all three batches in compact form, the cited episodes in full, and the error classes by text search.

## Questions for the curator (decisions not taken)

1. Whether a library-only edit may run `ant testSystem` once (or the compiled tracks, for a prelude edit), as a walk-Java edit may. Alternatives: no; yes for the interpreter's library only; yes for both. Evidence: the section above. Cost of yes: 3 to 4 minutes of four cores for each library rung, and a change of the batch script's wording.
2. Whether a command refused by the automatic check may be split and rerun (12 of 13 refusals were false positives and ran when split), or must be reported as `session.md` says. Alternatives: keep the rule; allow a split of the same command; add the `rm` and wrapper hint to the skill and keep the report rule for the rest.
3. Which tools to build. In order: the ladder driver and the distance fix (practice 1), the suite runner (2), the two scripts at a stable path (5), the probe runner (4), the library-order checker (8). The first two together would take out the largest cluster of relearning and the three-batch row 577 artefact. Alternatives: none; the first two; all five.
4. Whether the batch script's text on `ant testSystem` changes with the answer to question 1 (practice 2). `pending-script-edit.md` has no item for it.

## Files

- Transcripts: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/{wf_603242ca-111,wf_f747fd3e-9e4,wf_d5ec6194-bcc}/`.
- Cited: `process-engineering/context-study.md`, `labor.md`, `checking-roles-cost.md`; `reviews/batch-8-review.md` to `batch-10-review.md`, `skills-cold-read-fortress-repo.md`; `compile-ladder/climb-batch-8/RECORD.md` to `climb-batch-10/RECORD.md` and their `gate/summary.txt`; `coordinator/pending-script-edit.md`; the skill's `build-and-caches.md`, `tests-running.md`, `tests-writing.md`, `session.md`, `gate.md`, `worktrees.md`; ledger rows 413, 537, 559, 577 and 594.
- Code read: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:360-420`, `CompilerJUTest.java`, `SystemJUTest.java`, `Shell.java:115-122`, `useful/Debug.java`, `repository/ProjectProperties.java:283`, `build.xml:925-960`, `explorations/compile-ladder/rung-inference-walk/harness-one.sh`, `compile-ladder/climb-batch-N/merged-tests/junit.sh`, `coordinator/tools/count-run/count-run.sh`.
