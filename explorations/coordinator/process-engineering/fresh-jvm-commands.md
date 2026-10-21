<!-- Measured on 2026-10-16 from 267 worker transcripts, one-off Fortress commands that each start a fresh JVM take 6.4 % of the agents' lifetime at most, and removing their start-up saves at most 1.8 %. -->

# Fresh-JVM commands: what they take of the workers' time

## Summary

- Of 24,643 Bash calls, 913 run a one-off Fortress command (class a). By invocation there are 1,971 of them (2,682 with the literal `for` loops expanded).
- Class (a) holds 7h51m of the workers' 45h02m of Bash wall time (17.5 %), and 6.4 % of their 122h38m of lifetime. Counted only from the calls whose own command line is class (a), with no waits charged to them, it is 4h06m (9.1 % and 3.4 %).
- The fixed start-up cost, measured here: 0.041 s for `java -version`, 0.29 s for the Fortress shell with no program, 2.98 s for a walk run of a one-line program with warm caches.
- The most that a resident compiler could save by removing that start-up from every class (a) invocation is 2h13m (loops expanded, 2.98 s each): 4.9 % of the Bash wall time and 1.8 % of the lifetime. The hard cap, if class (a) cost nothing at all, is its own 7h51m: 6.4 % of the lifetime (11.6 % if every wait that I could not tie to a run were also class (a)).
- Classes (b) and (c), the suites, builds and stages, hold 47.8 % of the Bash wall time, 2.7 times class (a). The commands that the workers type are not where most of the time goes. What runs inside (b) and (c) was not examined.

## The data and the method

**Data.** 267 transcripts: 162 under `subagents/` and 105 under `subagents/workflows/` of the coordinating session's folder (`/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/`). They cover 2026-10-08 17:25Z to 2026-10-16 08:47Z (read at 08:47Z). 261 of them hold timestamped lines; the other six are empty. The coordinating session's own transcript is not in the set, and the transcript of the agent that made this measurement is left out. They hold 24,644 Bash calls; 24,643 have a result.

**Scripts** (all in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/measure-commands/`, run with `python3 -I`; they are scratch and not meant to be committed):

- `extract.py` reads each transcript once and keeps, per agent, its label, first and last timestamps, every Bash call (command, background flag, use time, result time, whether the result has an `EXIT=` line) and the task-notification records. No message text is kept.
- `classify.py` cuts a command line into statements and finds the invocations in each.
- `measure.py` classifies, links detached runs to their ends, and prints every table below (`measure-output.txt`). `per-agent.csv` has one row for each of the 267 agents.

**Wall time of a call** is the timestamp of its `tool_result` minus the timestamp of its `tool_use`. Trivial calls (`ls`, `pwd`, `echo`, `git status`; 147 calls) take a median 0.45 s (p10 0.31 s), so the tool itself costs about 0.3 to 0.5 s on every call.

**Class of a call**, by what its command line runs, after wrappers (`nohup`, `time`, `timeout -k`, environment assignments, `cd ... &&`, `xargs`, `bash -c '...'`, variables such as `H=.../harness-one.sh; $H`, `$( )` and backticks):

- (a) `bin/fortress` with `compile`, `run`, `walk`, `link`, `typecheck`, `junit`, `parse` or a file; `harness-one.sh`; `junit.sh`; a direct `java` of a Fortress main class (`Shell`, `MainWrapper`, the JUnit classes, the workers' own probe mains).
- (b) `ant` with any target; a direct `scalac` (`java ... scala.tools.nsc.Main`).
- (c) `checker-count/run.sh`, `distance/run.sh` (and the `DistanceMulti` JVM behind it), `mg-run.sh`, `microgpt-phase.sh`, the ladder.
- (d) everything else.

A script that a call runs by name is replaced by its body, looked up in this order: the latest `cat > file <<EOF` or Write of that name by the same agent before the call, then by another agent, then a file on disk. 2,442 script lookups were resolved, 59 not (121 calls, 614 s in all, left in (d)).

A call that chains several classes takes the class of the heaviest, in the order c, b, a. 79 calls are so mixed: 55 of (a) with (b), 6 of all three, 14 of (a) with (c), 4 of (b) with (c). The 55 (a)+(b) calls are mostly `ant compileAll` followed by the five compiles of the library order, so their time is charged to (b).

**Invocations** are counted by the text of the command, including the text of the scripts it runs: 1,971. A `for x in a b c` loop over a literal list is expanded (2,682 in all). A loop over a glob, `$(...)`, a `while read` or an `xargs` is counted once; 179 calls have such a loop, so these counts are lower bounds.

**Background and detached runs.** The Bash tool returns at once for a call with `run_in_background` (37 calls) and for the `nohup ... &` pattern that the skill prescribes. Their time is not in the call. I treat each such launch (413 with a class (a), (b) or (c) command) as one logical call, and charge to it the wall time of the waiting calls that belong to it, so the total stays the Bash wall time (162,148 s) and nothing is counted twice.

- The end of a `run_in_background` run is taken from its task-notification record (49 records in all; 35 of the 37 calls matched by tool-use id).
- A `nohup` run is matched to the later call that names its log file and shows an `EXIT=` line: 284 by `wait_for` (the end is within 5 s of the real one), 66 by another read of the log (an upper bound of the end), 25 not found, 10 with no log file named.
- A waiting call (`wait_for`, `sleep N`, `until ... sleep`) is charged to its run by log file, else by a file stem in the launch text (122 calls), else by nearness to a run that had not ended (20 calls). 148 waiting calls, 6h19m, I could not tie to any run; they stay in (d).

**Two accountings below.** "Own line" follows the brief to the letter: each call is classed by its own command line, so a `nohup` launch costs about 0 s in its class and its `wait_for` calls fall in (d). "Adjusted" charges the runs to their class. The adjusted one is the one to use.

**What the method cannot see.** A Fortress command run by a Python driver, by a script that I could not find, or by a shell function in a file that a call `source`s; the loops of unknown size above; the contents of (b) and (c). Overlap: a worker's parallel tool calls overlap, so the summed Bash wall time (45h02m) is 6.5 % more than the time covered by at least one call (42h06m).

**The agents' time.** Lifetime is the last timestamp minus the first. The sum of 122h38m is agent-hours: the agents ran in parallel. Three agents have gaps over 30 minutes (7h47m in all); without them the sum is 114h51m.

## The classes

Own line (the brief's literal reading):

| class | calls | total wall | median per call | p90 per call |
|---|---:|---:|---:|---:|
| (a) one-off Fortress commands | 913 | 4h06m (14,799 s) | 7.8 s | 32.7 s |
| (b) ant suites and builds | 289 | 0h43m (2,630 s) | 0.52 s | 27.5 s |
| (c) stages | 133 | 2h04m (7,499 s) | 0.64 s | 196 s |
| (d) everything else | 23,308 | 38h07m (137,220 s) | 0.46 s | 2.36 s |

Of (d), 754 calls (28h48m) are pure waits. The `nohup` launches of (a), (b) and (c) sit in their classes with near-zero times, which is why the medians of (b) and (c) are under a second.

Adjusted (detached runs one logical call, waits charged to the run):

| class | logical calls | total blocked time | share of Bash wall | median | p90 | of them detached runs |
|---|---:|---:|---:|---:|---:|---:|
| (a) | 913 | 7h51m (28,300 s) | 17.5 % | 10.1 s | 50.6 s | 129 |
| (b) | 289 | 9h25m (33,910 s) | 20.9 % | 46.2 s | 357 s | 204 |
| (c) | 133 | 12h07m (43,658 s) | 26.9 % | 186 s | 1,057 s | 80 |
| (d) | 22,702 | 15h38m (56,281 s) | 34.7 % | 0.46 s | 1.50 s | 0 |
| total | 24,037 | 45h02m (162,148 s) | | | | |

Of (d), 148 waiting calls (6h19m, 14.0 % of the total) belong to no run that I could find. The 606 waiting calls charged to runs hold 22h29m.

The detached runs' own durations (launch to end, where the end was found): (a) median 103 s, p90 250 s (14,392 s in all); (b) median 128 s, p90 580 s; (c) median 436 s, p90 1,597 s.

Class (a) by how it is counted:

| reading | time | share of Bash wall | share of lifetime |
|---|---:|---:|---:|
| direct calls only (own line) | 4h06m | 9.1 % | 3.4 % |
| plus waits matched by log file | 5h59m | 13.3 % | 4.9 % |
| plus waits matched by file stem or nearness (adjusted) | 7h51m | 17.5 % | 6.4 % |
| plus all 148 unattributed waits | 14h10m | 31.5 % | 11.6 % |

Class (a) calls by blocked time: under 2 s, 73 calls (75 s); 2 to 5 s, 186 (652 s); 5 to 10 s, 193 (1,412 s); 10 to 30 s, 291 (5,239 s); 30 to 100 s, 122 (6,094 s); over 100 s, 48 (14,826 s). The 259 calls under 5 s hold 12 minutes. The 48 calls over 100 s hold 4h07m, more than half: whole-library compiles and batches of tests, where the work, not the start-up, takes the time.

Classes (b) and (c) by target and stage (adjusted blocked time, calls with one such invocation): `testQuick` 19 calls 1h56m; `testSystem` 37 calls 1h41m; `compileAll` 102 calls 1h23m; `testFast` 7 calls 0h51m; `scalac` 38 calls 0h44m; `distance` 49 calls 5h33m (median 218 s); `checker-count` 40 calls 4h07m (median 255 s); `microgpt-phase` 5 calls 0h19m; `mg-run` 13 calls 0h08m. 62 calls with several ant targets or scalac runs hold 2h12m, and 18 calls with several stages 1h58m.

## Class (a) by command kind

Invocations by kind (all calls, script text included), and the 354 "pure" calls: exactly one invocation, not in a loop, not detached. Times are wall time per call.

| kind | invocations (lexical) | pure calls | median | p90 | p10 | shortest |
|---|---:|---:|---:|---:|---:|---:|
| walk (`bin/fortress P.fss` 578, `walk` 4) | 582 | 95 (+1 `walk`) | 4.96 s | 18.6 s | 3.40 s | 0.36 s |
| `compile` | 563 | 20 | 2.74 s | 3.79 s | 1.74 s | 1.54 s |
| `run` | 340 | 5 | 1.27 s | 4.74 s | | 0.74 s |
| `harness-one.sh` | 178 | 110 | 20.8 s | 35.8 s | 4.81 s | 3.61 s |
| `junit.sh` | 100 | 74 | 5.85 s | 16.0 s | 2.38 s | 1.55 s |
| `fortress junit` | 27 | 22 | 3.57 s | 10.1 s | 1.67 s | 0.69 s |
| `typecheck` | 40 | 5 | 2.49 s | 17.2 s | | 1.89 s |
| direct `java` (`Shell` 88, other mains 29) | 117 | 19 | 1.0 to 5.0 s by main (one probe main 150 s) | | | 0.88 s |
| other (variable subcommand), `parse`, `unparse` | 24 | 3 | | | | 0.86 s |

Every class (a) logical call whose invocations are all of one kind, with its blocked time (adjusted; loops and detached runs included, so "per invocation" uses the estimated count):

| kind | calls | invocations (est.) | total | median call | p90 call | mean per invocation |
|---|---:|---:|---:|---:|---:|---:|
| walk | 285 | 583 | 2h11m | 11.4 s | 50.0 s | 13.6 s |
| `harness-one.sh` | 147 | 165 | 0h58m | 21.4 s | 39.2 s | 21.1 s |
| direct `java` | 43 | 98 | 0h48m | 5.1 s | 150 s | 30.0 s |
| `compile` | 79 | 249 | 0h33m | 7.0 s | 90.9 s | 8.0 s |
| other / variable subcommand | 16 | 22 | 0h23m | 29.9 s | 271 s | 65.1 s |
| `junit.sh` | 84 | 86 | 0h17m | 6.1 s | 19.8 s | 12.5 s |
| `fortress junit` | 23 | 23 | 0h02m | 3.8 s | 10.1 s | 7.6 s |
| `typecheck` | 20 | 36 | 0h02m | 4.7 s | 12.7 s | 3.3 s |
| `run` | 10 | 22 | 0h00m | 1.3 s | 10.3 s | 1.8 s |
| several kinds in one call | 205 | | 2h32m | | | |

`run` is rare as a single kind because most compiled runs sit in a call that also compiles.

**The floor.** The shortest successful pure calls are 0.36, 0.69, 0.71, 0.74, 0.75, 0.83, 0.86 and 0.88 s. I did not read their output. They are too fast to have run a program (a walk of the one-line program takes 2.98 s, below), so they stopped early. They agree with the measured parts: 0.29 s for the Fortress shell with no program plus the tool's 0.45 s makes 0.74 s. The p10 of the 95 pure walk calls is 3.40 s, which is the 2.98 s of the one-line walk run plus the 0.45 s of the tool: the quickest tenth of the workers' walk calls is start-up and nothing else. The pure `compile` calls have p10 1.74 s and a shortest of 1.54 s, so the fixed part of a compile of a small program is at most about 1.5 s; it was not measured on its own.

## The agents' shares

An agent's role is taken from the label that the coordinator gave it at launch (`rung:X` and `skeptic:X` of the workflows, "Probe ...", "Scout ...", "Cold read of ...", "Plan ...", and so on). Most first prompts do not name a role in their first words, so the label was the better key; the keys are in `measure.py`, `role_of`. "(a) naive" is the own-line reading.

| role | agents | lifetime | Bash wall | (a) adjusted | (a) naive | (a) / Bash wall | (a) / lifetime | (b) / Bash wall | (c) / Bash wall |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| rung worker | 23 | 26h06m | 14h54m | 4h18m | 1h42m | 28.9 % | 16.5 % | 25.5 % | 41.2 % |
| writer / record | 70 | 19h28m | 2h29m | 0h05m | 0h03m | 3.8 % | 0.5 % | 28.1 % | 1.9 % |
| review (cold read, judge, audit) | 63 | 19h19m | 4h16m | 0h01m | 0h01m | 0.4 % | 0.1 % | 0.0 % | 6.2 % |
| probe | 9 | 17h04m | 12h59m | 1h23m | 1h06m | 10.8 % | 8.2 % | 20.2 % | 21.9 % |
| skeptic | 27 | 12h07m | 3h28m | 1h29m | 1h09m | 43.1 % | 12.3 % | 26.2 % | 0.4 % |
| gather (scout, archaeology, map, route) | 32 | 10h19m | 1h30m | 0h02m | 0h01m | 3.1 % | 0.4 % | 1.2 % | 0.0 % |
| planner | 10 | 9h52m | 0h21m | 0h00m | 0h00m | 0.0 % | 0.0 % | 0.0 % | 0.0 % |
| gate / commit / land | 14 | 4h49m | 3h24m | 0h10m | 0h00m | 5.3 % | 3.8 % | 34.2 % | 55.8 % |
| measure | 4 | 2h08m | 1h21m | 0h19m | 0h01m | 23.7 % | 15.1 % | 1.6 % | 67.7 % |
| other | 15 | 1h21m | 0h17m | 0h00m | 0h00m | 0.0 % | 0.0 % | 64.7 % | 0.3 % |
| **all agents** | **267** | **122h38m** | **45h02m** | **7h51m** | **4h06m** | **17.5 %** | **6.4 %** | **20.9 %** | **26.9 %** |

By the own-line reading the totals are 9.1 % of Bash wall and 3.4 % of lifetime. Bash wall time is 36.7 % of the lifetime over all agents (rung workers 57 %, probes 76 %, planners 3.5 %).

Only 76 of the 267 agents ran a class (a) command, and 67 of them ran 60 s or more. The (a) share of an agent's Bash wall time has a median of 0 %, p90 of 46 % and a maximum of 96.5 % (an agent that only measured one compiled-transaction cost). The skeptics and the rung workers are where the class sits: 43 % and 29 % of their Bash time, 12 % and 17 % of their lifetime. The twelve agents with the most (a) time hold 4h10m of the 7h51m (53 %); the top three are `rung:V` (0h38m, 26 % of its lifetime), "Probe walk's plain-bounded parameters" (0h38m, 33 %) and `rung:C` (0h29m, 33 %). The full list is `per-agent.csv`. Without the three idle gaps over 30 minutes the lifetime sum is 114h51m and the all-agents (a) share is 6.8 %.

## The fixed cost, measured once

Where: `/home/user/fortress`, main, clean (`git status` empty before and after), the VM up for 16 minutes, four CPUs, load average 0.3 to 1.1 over the runs, nobody else working in it. Setup: the four lines of the skill (`cd`, `JAVA_HOME` and `PATH` for JDK 25, `FORTRESS_HOME=$PWD FORTRESS_THREADS=1 TMPDIR=$PWD/tmp JAVA_FLAGS="-Xmx4g -Xss64m ..."`, `unset JAVA_TOOL_OPTIONS`). `/usr/bin/time` is not installed in this container, so each run is timed with the shell's `time` and `TIMEFORMAT=%R` (the same elapsed seconds).

| run | seconds |
|---|---|
| `java -version`, five runs | 0.042, 0.041, 0.045, 0.039, 0.040 (mean 0.041) |
| `bin/fortress OneLine.fss` (walk), five runs | 12.667, 3.198, 2.913, 2.785, 2.869 |
| the same, five more | 3.150, 3.152, 3.046, 2.981, 2.698 |
| `bin/fortress help` (shell, no program), three runs | 0.318, 0.280, 0.286 (mean 0.295) |

`OneLine.fss` is in the scratch folder (`startup/`): a component with `export Executable` and `run() = println("hello")`. It printed `hello` and exited 0 each time. The first run is probably cold: the program's own cache entries are written, and the disk cache after the VM's restart is cold. The nine warm runs have a mean of 2.98 s (2.70 to 3.20). The build's stamp equals the caches' stamp, so no build and no library order were needed; I ran neither. The runs wrote only gitignored cache entries for `OneLine` under `default_repository/caches/`.

Not measured: a compile of a one-line program (the brief asks for the walk run), so the compiled path's own start-up is known only from the pure `compile` calls above. The skill says not to take or record a timing of walk; this is a start-up figure for the brief's bound, not a speed claim about walk.

One difference of machine: the transcripts' times come from other sessions' VMs, and the cloud-container skill says that timings differ between sessions. The start-up cost above is from this session's.

## What a resident compiler could save, at most

The brief's bound: the number of class (a) invocations times the start-up cost. The cap: it cannot exceed class (a)'s own time (7h51m, 28,300 s), which never binds below. Shares are of the Bash wall time (162,148 s) and of the lifetime (441,490 s).

| count | start-up per invocation | saved | of Bash wall | of lifetime |
|---|---|---:|---:|---:|
| 913 class (a) calls | 0.041 s (JVM) | 37 s | 0.0 % | 0.0 % |
| | 0.29 s (JVM and shell) | 265 s | 0.2 % | 0.1 % |
| | 2.98 s (walk, warm) | 2,721 s (45 min) | 1.7 % | 0.6 % |
| 1,971 invocations, lexical | 0.041 s | 79 s | 0.0 % | 0.0 % |
| | 0.29 s | 572 s | 0.4 % | 0.1 % |
| | 2.98 s | 5,874 s (1h37m) | 3.6 % | 1.3 % |
| 2,682 invocations, literal loops expanded | 0.041 s | 107 s | 0.1 % | 0.0 % |
| | 0.29 s | 778 s | 0.5 % | 0.2 % |
| | 2.98 s | 7,992 s (2h13m) | 4.9 % | 1.8 % |

A cross-check that does not use one start-up figure for every kind: each lexical invocation saves at most the p10 of its kind's pure calls (1.74 s for compile, 2.17 s for the shell main, the walk figure 2.98 s as a cap for the kinds whose p10 is higher). That gives 4,172 s (1h09m): 2.6 % of the Bash wall time and 0.9 % of the lifetime.

So removing the start-up of each command saves at most 1.8 % of the agents' lifetime (4.9 % of their Bash time), and the likelier figure is about 1 %. If a resident process also kept the library loaded and the checker warm, so that class (a) commands cost nothing, the cap is 6.4 % of the lifetime (17.5 % of Bash time), or 11.6 % on the most generous reading of the waits. Half of the class's time is in the 48 calls over 100 s, which are work.

Caveats that push the bound up: the start-up of `compile` and `typecheck` through the Scala checker may be larger than the shell's 0.29 s and was not measured; the loops of unknown size (179 calls) are counted once; the unattributed waits (6h19m) may hold more class (a). Caveats that push it down: the 2.98 s is a walk figure applied to every kind, and the quickest compile calls show a fixed part under 1.8 s.

## Decisions not taken

- Whether to look inside classes (b) and (c), which hold 47.8 % of the Bash wall time (21h32m): `checker-count`, `distance`, `testQuick`, `testSystem` and the like start JVMs themselves. This report counts only the commands that the workers type. If a resident compiler could serve those, the bound would change by a factor I did not measure. It needs a read of the stage scripts and the ant targets, and the curator's word.
- Whether to measure the start-up of a compiled one-liner (`fortress compile`, then `run`), which would sharpen the bound for the 563 compile and 340 run invocations. It needs the compiled path's library in the caches; I did not check for the jars or run any compile.

No defect in the repository was found; no tracked file was edited; nothing was committed or pushed. The container lacks `/usr/bin/time`, which the brief names for the timing.
