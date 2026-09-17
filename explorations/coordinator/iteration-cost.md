<!-- Where the 8h37m of the eight-rung ladder climb went, measured from the workflow transcripts, and what would make the next climb faster. Asked for by Pavol on 2026-09-17 ("are we waiting on clean builds or where are we losing the time? ... Did we find a more time efficient way to work on these issues?") after the climb of 2026-09-17 06:01-14:38. Measurement only; the proposals in section D are priced, not taken. -->

# The cost of an iteration

## Sources

Every number below comes from one of five places, cited inline by the tag in brackets.

[T] the workflow transcripts, `/root/.claude/projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/subagents/workflows/wf_73833dfb-d25/` — one `agent-<id>.jsonl` per agent plus `journal.jsonl`; a tool call's wall time is the interval between the timestamp of the assistant message carrying the `tool_use` and the timestamp of the `tool_result` that answers it, and the parser that computed all of this is `/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad/parse.py` with `classify.py`.

[R] `ProjectFortress/TEST-RESULTS/*/TEST-*.txt` as the climb left them, which carry each suite's own `Time elapsed`.

[B] `build.xml`, targets `testFast` (line 956), `testSystem` (line 1197), `compileAll` (line 539) and the `fastTrack` (927) and `systemShard` (1167) macros.

[W] `explorations/coordinator/ladder-workflow.js`, the script that drove the climb.

[G] `git log` on `claude/handover-reading-vn8zgr`, for what each rung actually changed.

No build was re-run to produce this report; every duration is an observed one. The one measurement taken live is disk (`du`, `df`), for pricing worktrees in section D.

## A. The wall-clock budget

The climb spans 06:01:36 to 14:38:37, that is 517.0 minutes or 8h37m01s [T].

The 36 agents' own walls sum to 508.3 minutes; the remaining 8.7 minutes are the 35 gaps between one agent ending and the next starting, the orchestrator's own overhead, with no gap longer than 73 seconds [T].

Of the 508.3 agent-minutes, 294.0 were spent inside tool calls and 214.3 were not — 57.8% tool, 42.2% model thinking and generation [T].

So neither half of the question is the whole answer: the builds are a little over half the clock, and the model is a little under half, and a plan that only attacks builds cannot buy back more than 57% of anything.

Every minute of the 517 was serial. The rungs ran one at a time, the stages inside a rung ran one at a time, and no two agents ever overlapped: the sum of agent walls plus the inter-agent gaps equals the span exactly [T]. There was no concurrency to lose and none to keep.

Per stage class, with wall, tool and model split [T]:

| stage | agents | wall (min) | share | tool (min) | model (min) |
|---|---|---|---|---|---|
| implement | 8 | 241.8 | 46.8% | 185.0 | 56.8 |
| plan | 8 | 107.5 | 20.8% | 34.0 | 73.5 |
| verify | 8 | 82.4 | 15.9% | 38.3 | 44.2 |
| repair | 1 | 22.4 | 4.3% | 14.0 | 8.5 |
| final re-run | 1 | 22.3 | 4.3% | 14.1 | 8.2 |
| commit | 8 | 19.6 | 3.8% | 4.5 | 15.1 |
| verify2 | 1 | 9.6 | 1.9% | 4.0 | 5.7 |
| baseline read | 1 | 2.5 | 0.5% | 0.1 | 2.4 |
| inter-agent gaps | — | 8.7 | 1.7% | — | — |

Per rung, wall in minutes [T]: rung1 48.3, rung2 53.4, rung3 66.3, rung4 64.1, rung5 48.1, rung6 96.1, rung7 52.0, rung8 55.1, plus baseline 2.5 and the final re-run 22.3.

The stage split is the first surprise. `implement` is 76% tool time, but `plan` is 68% model time, `verify` 54%, `commit` 77%. Three of the six stage classes are dominated by thinking, not by building.

The second surprise is how regular the model time is. Fitting each agent's model minutes against its number of tool calls over all 36 agents gives a slope of 0.136 min per call — 8.2 seconds — with an intercept of −0.45 min and R² = 0.878 [T]. Per stage the slope is 8.9 s/call for plan, 7.5 for verify, 7.1 for implement, 5.4 for commit.

In other words the model time is not a property of how hard the problem was; to a good approximation it is a fixed toll of about eight seconds charged on every tool call, whatever the call does.

Coordinator's note on review, 2026-09-17: that sentence states a cause where the evidence is a cross-agent correlation, and the two are not the same — an agent on a harder rung both makes more calls and thinks longer, so some of the slope is difficulty shared between the two variables rather than a toll charged by the call. The mechanism is nonetheless real, since every tool result re-enters a context that is growing and is reasoned over afresh, and the parse behind these numbers is corroborated by the harness's own accounting for this run, which independently reports 36 agents and 1,694 tool calls. Read the slope as an upper bound on what removing a call returns, which makes D5's quoted 40-57 minutes an upper bound too, not a measurement.

That matters because 1,408 of the 1,694 tool calls returned in under two seconds, and those 1,408 calls consumed 13.8 minutes of tool time and about 192 minutes of model time [T].

## B. The expensive commands, ranked

Classified by what the command actually ran, with a guard that a command mentioning a build but returning in under 20 seconds was reading or writing about it rather than running it [T]:

| class | invocations | total (min) | median | max | which stages ran it |
|---|---|---|---|---|---|
| `ant testFast` | 14 | 101.6 | 434.2 s | 448.1 s | implement 11, verify 2, repair 1 |
| ladder driver / subset runs | 24 | 64.9 | 177.9 s | 581.9 s | implement 14, verify 5, verify2 1, plan 2, final re-run 2 |
| library-order bytecode-cache rebuild | 22 | 44.6 | 127.7 s | 162.3 s | implement 10, plan 11, repair 1 |
| `ant testSystem` | 11 | 28.9 | 147.6 s | 207.5 s | implement 8, verify 2, repair 1 |
| file reads, greps, edits, shell misc | 1,149 | 21.8 | 0.1 s | 167.7 s | plan 417, implement 333, verify 224, repair 58, final 46, commit 31, verify2 24, baseline 16 |
| `fortress junit` on one test | 51 | 12.1 | 5.3 s | 127.6 s | implement 21, plan 19, verify 9, repair 1, verify2 1 |
| git | 278 | 8.5 | 1.5 s | 166.6 s | commit 117, verify 81, implement 35, plan 19, verify2 12, final 8, repair 4, baseline 2 |
| `fortress compile` / `run` / other single invocations | 63 | 8.5 | 4.7 s | 41.2 s | plan 21, implement 23, verify 10, repair 7, verify2 2 |
| `ant compileAll` | 3 | 2.3 | 45.8 s | 46.2 s | implement 3 |
| non-Bash tools (Read, Edit, Write, Monitor, ToolSearch, StructuredOutput) | 76 | 0.1 | 0.0 s | 1.5 s | all |

The gate — `ant testFast` plus `ant testSystem` — cost 130.5 minutes, 25.2% of the climb.

`ant testFast` is 7.2 minutes because of one suite. Per-suite CPU time from the results the climb left behind [R]: `OtherCompilerJUTest` 439.6 s over 263 tests, `CompilerJUTest` 416.2 s over 644, `LibraryJUTest` 373.8 s over 69, everything else 49.6 s over 417. The target already runs those as four parallel tracks [B], so its wall is the longest single track, 440 s, and that is what was observed.

`ant testSystem` is 147.5 s for the same reason: four shards of `SystemJUTest`, 95 to 97 tests each, 108.4 to 147.5 s per shard [R][B].

`ant compileAll` was incremental throughout, 46 seconds each time, not the ~80 s of a clean build.

The library-order bytecode-cache rebuild is the recipe at `repo-internals.md:170-179`: five `fortress compile` invocations in dependency order. Twenty of the 22 rebuilds compiled all five components and took 110–162 s. The other two compiled only `CompilerLibrary`, `CompilerAlgebra` and `CompilerSystem` and took 30.4 s and 24.6 s [T]. That is the same job minus the two upstream components, 4.7× faster, and it was discovered by the rung 8 agents in the last hour of the climb.

## C. The redundancy audit

**The full gate was run 14 times for eight rungs, and 41.0 minutes of that produced no information.**

Per rung, the gate pairs were: rung 1 implement ran `testFast` twice and `testSystem` once; rung 2 implement once each and verify once each; rung 3 implement `testFast` twice and `testSystem` once, and verify once each; rung 4 implement `testFast` twice and `testSystem` once; rungs 5, 7 and 8 implement once each; rung 6 implement once each and repair once each [T].

**The same tree state was gated twice in rungs 2 and 3.** The verify agent does not edit source files [W], so the tree it gated was byte-identical to the one implement had just gated. Rung 2's verifier ran `testFast` (430.2 s) and `testSystem` (147.4 s); rung 3's verifier ran them again (431.8 s and 147.6 s). That is 19.3 minutes. Both verifiers had first listed `ProjectFortress/TEST-RESULTS/` and then decided to re-run anyway [T]; the script tells them to read those outputs and re-run only "if they are missing or stale" [W], and it gives them no way to establish that they are fresh other than directory timestamps.

**Implement re-ran `testFast` with nothing changed in between, three times, for 21.7 minutes.** In rung 1 the two runs are at 06:18:51 and 06:26:08 with no intervening call at all; in rung 3 at 08:11:53 and 08:19:13 with two greps of `build.xml` between them; in rung 4 at 09:26:34 and 09:34:13 with an inspection of `TEST-RESULTS` between them [T]. The cause is visible in the commands: the first run in each case was piped through `tail -60` or `tail -80`, which discards the per-suite summary lines, and the rules require the agent to grep the output for zero failures rather than assume it [W]. Having thrown the output away, the only way back to a defensible "green" was to run it again. Rung 4's agent then wiped `TEST-RESULTS` before its second run, and from rung 4 onward no verifier re-gated.

**No `ant compileAll` was unnecessary.** It ran exactly three times, in rungs 1, 3 and 7, and those are exactly the three rungs whose commits touch `.java` or `.scala` files — rung 1 three of them, rung 3 two, rung 7 four [G]. Rungs 2, 4, 5, 6 and 8 changed only `.fss`/`.fsi` and correctly did not run it. This discipline held for all eight rungs and cost nothing to maintain.

**Three of the 22 cache rebuilds were genuinely forced by `compileAll`** — the one in rung 1 at 06:16:06 follows `compileAll` at 06:15:11, rung 3's at 08:05:45 follows 08:04:56, rung 7's at 12:45:05 follows `compileAll` at 12:44:08 [T]; FACTS records that `ant compileAll` empties the bytecode cache, and the rules repeat it [W]. The other 19 followed a library `.fss`/`.fsi` edit, which genuinely invalidates the cached analysis (`repo-internals.md:163`), so none of the 22 was a rebuild over a still-valid cache. What was wasteful is the *shape*: 20 of them rebuilt all five components when the edit was downstream of the first two. Rungs 2 and 4 edited only `Library/CompilerLibrary.*` [G] and between them ran five full rebuilds; at the measured 103-second difference between the five-component and three-component forms that is 8.6 minutes spent recompiling `AnyType` and `CompilerBuiltin` for no reason. Rung 6's plan stage alone ran six full rebuilds, 13.0 minutes, probing `CompilerBuiltin` variants [T].

**The ladder subset re-runs cost 51.9 minutes and the final full re-run 13.0 minutes of driver time.** The subsets split into seven "before" runs (19.9 min), ten "after" runs (36.2 min, of which the final full-ladder polls are 13.0) and five that the classifier could not label from the command line (13.7 min) [T]. Four of the "after" runs are a verify or verify2 agent re-running the subset that implement had just run on the identical tree: 181.6 s in rung 2, 182.4 s in rung 3, 171.4 s in rung 6's second verify and 180.1 s in rung 7, about 12 minutes. The overlap with the final re-run is total in coverage — the final run recomputes all 410 files, so every subset file is computed again — but not in time: the subsets were needed during the rung to decide, and the final run happened once at the end.

**Other work that cost minutes and returned nothing:** rung 3's implement agent ran the subset driver "before" twice, 157.3 s and then 177.4 s, because the first run used a script it then had to patch [T]. Rung 4's implement agent spent 45.1 s polling for a backgrounded task whose output file it then read directly [T]. Across all agents, 902 tool calls were non-mutating lookups returning in under two seconds; at the measured 8.2 s of model time per call they carried about 123 minutes, and 417 of them were re-derivations of things a previous agent already knew — the gap ledger 110 times in 32 of 36 agents, `git status`/`git log` 88 times in 35 of 36, `FACTS.md` 71 times in 29 of 36, the subset driver or `ladder.tsv` 44 times, a rung's own `REPORT.md` 44 times, `TEST-RESULTS` 23 times, `PLAN.md` 18 times, `env.sh` 11 times, `repo-internals.md` 6 times [T]. That is about 57 minutes of model time spent re-reading the record. The remaining 485 cheap calls, about 66 minutes, are genuine exploration of the source, which is the work and not waste.

## D. Proposals

Savings are quoted as measured totals over the eight-rung climb and, where the thing happens every rung, as minutes per rung.

### Free — no loss of rigor

**D1. Capture the gate's full output to a file; never pipe `ant` through `tail`; wipe `TEST-RESULTS` before the gate pair.** Saves the three no-information `testFast` re-runs: 21.7 minutes, 2.7 min/rung averaged over eight. It costs nothing and it is the mechanism the next proposal needs.

**D2. Let verify read implement's recorded gate output instead of re-running it.** Saves 19.3 minutes, which is 9.7 minutes in each of the two rungs where the re-gate happened. The rigor cost is zero only if the record is self-proving: implement wipes `TEST-RESULTS`, runs the pair, and reports the commit-less `git status` hash of the tree alongside the suite summary lines; verify confirms `git status` and the file mtimes still match before reading. Without that mechanism this becomes D-T4 below, which is not free. D1 and D2 together are 41.0 minutes, 5.1 min/rung.

**D3. Rebuild only the edited library component and what is downstream of it.** Measured: three components 24.6–30.4 s against five components 110–162 s, a difference of about 103 s [T]. For the five full rebuilds in rungs 2 and 4, where only `Library/CompilerLibrary.*` changed, this is 8.6 minutes, 1.1 min/rung. For the eleven rebuilds in rungs 5, 6 and 7, which edited `LibraryBuiltin/CompilerBuiltin.fss`, only `AnyType` can be skipped and the saving is unmeasured; one timed rebuild of `AnyType` alone would settle it, and that is the one measurement this report deliberately did not take.

**D4. Fold the commit stage into the approving verify agent.** The commit stage cost 19.6 minutes over eight rungs, of which 15.1 minutes is model time and only 4.5 is tool time [T] — it is a fresh agent re-reading the rules, the plan, the diff and the ledger in order to write eight commit messages. Saves about 15 minutes, 1.9 min/rung. The rigor cost is a separation-of-duties one: the skeptic would commit what it approved rather than a third party doing it. It has already read the full diff, so nothing goes uninspected.

**D5. Hand every agent its orientation in the prompt instead of making it re-derive it.** The prompt already carries the rules; it does not carry the gap-ledger rows in scope, the current `git status`, the previous rung's recorded results, the subset driver's exact invocation, or the paths the previous agent wrote. Removing the 417 re-derivation calls at the measured 8.2 s/call is about 57 minutes, roughly 5 min/rung once the per-stage differences are allowed for; a conservative 40 minutes. No rigor cost — it removes lookups, not checks.

**D6. Run the next rung's plan stage during the current rung's implement stage, in its own worktree.** Plan is 68% model time and implement is 76% tool time [T]; they contend for almost nothing. If plan leaves the critical path entirely the saving is 107.5 minutes less the first plan, about 102.8 minutes; priced conservatively at plan's model time alone, 73.5 minutes, 9.2 min/rung. It needs a second working tree because plan mutates the shared tree — it writes and runs a failing test, edits library sources to probe, and ran eleven cache rebuilds over the climb [T]. Measured cost of a worktree: 219 MB of tracked files, plus `ProjectFortress/build` at 40 MB and `default_repository` at 34 MB once it has been built in, about 293 MB. Free space is 24 GB now; it was 3.0 GB when this report was commissioned, because a `git repack` was running, and even 3.0 GB leaves room for two or three. Disk is not the constraint.

### Trades rigor for speed — priced, not recommended

**D-T1. Gate on `testFast` only.** Saves 147.5 s per gate [R]; `ant testSystem` ran 11 times, so about 27 minutes, 3.4 min/rung. The cost is that the 382 interpreter tests stop guarding rungs that edit `Library/` and `LibraryBuiltin/` sources the interpreter also loads — which is five of the eight rungs [G]. Not recommended.

**D-T2. Raise `FORTRESS_THREADS` above 1.** Cannot be priced from the transcripts: `experiment/env.sh` pins it to 1 and `systemShard` sets it to 1 explicitly in the JVM environment [B], so no run in the climb used anything else. The expected gain is near zero anyway, because the box has four cores and both gate targets already occupy all four with four forked JVMs [B]. Cost: nondeterminism in exactly the concurrency the interpreter tests exercise. Not recommended.

**D-T3. Sample the ladder subset rather than running it whole.** Subsets were 3 to 24 files; sampling would save proportionally out of the 51.9 minutes of subset time. The subset is the only evidence that a rung moved anything, so this trades away the rung's own result. Not recommended.

**D-T4. Trust the implementer's own reported gate with no artifact.** Saves the same 19.3 minutes as D2 but removes the skeptic's independent check instead of mechanising it. D2 is the version that keeps the check. Not recommended.

**D-T5. Run `testFast` and `testSystem` concurrently.** Measured to be worth almost nothing here, and this is the proposal from the brief that the numbers refuse. Both targets begin with `<delete quiet="true" dir="${test.caches}"/>` and share `ProjectFortress/test-tmp` and `TEST-RESULTS` [B], so they would corrupt each other without a build.xml change. More decisively, the suites sum to 1,783.5 core-seconds (1,279.2 fast, 504.3 system) [R] and the machine has four cores, so a perfect four-way packing has a floor of 445.9 s against the 583 s the two targets take serially — the entire theoretical prize is 2.3 min per gate. Worse, the three big suites are 439.6, 416.2 and 373.8 s and each must own a core, which leaves 553.8 s of work for the fourth and puts the realistic optimum at about 554 s: a saving of 29 seconds per gate, for a change to `build.xml` that would itself have to be gated. Not recommended.

### The structure itself

Per-rung git worktrees so that whole rungs run in parallel buys nothing on this machine. Two concurrent rungs means two concurrent gates, each of which already saturates all four cores [B][R], so their walls add rather than overlap. The disk cost, 293 MB per worktree, is affordable; the cores are the constraint, not the disk.

What can be overlapped is the model-bound stages against the tool-bound ones. Plan is 68% model, verify 54%, commit 77%, against implement's 24% [T]. One extra worktree carrying the plan stage one rung ahead is the shape the measurements support — D6 — and not N worktrees for N rungs.

Pipelining verify the same way does not work: verify must see the tree implement produced, so it cannot start early. What it can do is stop re-doing implement's work, which is D2.

### Forks that are Pavol's, not mine

1. Does the skeptic re-run the gate and the subset itself, or read implement's recorded outputs under a mechanism that proves they postdate the edit? D1 and D2 together, 5.1 min/rung, against the principle that the skeptic's default is to refuse [W].
2. Does the commit stage stay a separate agent? D4, 1.9 min/rung, against separation of duties.
3. May a rung's "before" subset run be taken from the previous rung's recorded "after" instead of being re-run? Seven "before" runs cost 19.9 minutes, about 2.5 min/rung, but the subsets differ per rung and the overlap between consecutive rungs was not measured here.
4. Does plan get its own worktree and run one rung ahead? D6, 9.2 min/rung, 293 MB, at the cost of a second tree to keep consistent and of plan working against a tree that is one commit behind.

## E. The single biggest win

Every tool call costs about 8.2 seconds of model time whatever it does (R² 0.878 over 36 agents), and 902 sub-two-second lookups therefore carried roughly 123 minutes of the 517 — more than the entire 101.6-minute `ant testFast` bill — so the largest single lever is cutting the number of round-trips an agent needs, by handing it what the previous agent already established instead of letting it re-derive the record.
