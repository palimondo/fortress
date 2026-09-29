<!-- The Fable review of the batch practice for the post-mortem of 2026-09-29, written independently of the Opus review on the same brief (scratchpad/characterize/review-brief.md), read-only, from README.md, archaeology.md, characterization.md, measures-6.5b.md, reviews/batch-6.5b-review.md, the held list of 18:25 to 18:52 UTC, POSITIONS.md, protocol.md, PLAN.md, the workflow script and its manual. Nothing measured anew except four read-only git counts named where they are used. For Pavol, section 6; the rest for the coordinator and the rewrite of the practice. -->

# Review of the batch practice (Fable)

The question: what does a climb batch spend its tokens on, what does it produce and commit, is that worth it for the project, and what should replace it. The evidence is the post-mortem's four files and the batch 6.5b review; every number below is theirs unless it says "read from git today". Where I add, I say so. Pavol's own position of 18:25 and 18:42 UTC is weighed in section 2 and answered in section 6; it is his, not the starting point.

## 1. The practice as it is

### 1.1 What a batch is for

The goal is microGPT compiled to bytecode and running fast, judged by the specification (CLAUDE.md). The batches are phases 1 to 3 of the plan of 2026-09-26: the one library, the flattening, the checker toward zero errors on it, the specification revised in step. The measuring sticks the gate prints: the checker count, the distance to the switch-over, the ladder pass count, the microGPT compile phase.

What the batches bought, on those sticks (characterization, per-batch "Purpose"): the ladder from 59 to 85 passes (the eight-rung climb and batch 1, then flat); the checker count 93, 103, 125, 62, 22, 10, then 75 by design when the api's early return was cleared; the distance 1,747 to 940 to 627 to 624; `testSystem` from 382 to 451 and `testFast` from 1,401 to 1,671 tests. The microGPT phase file that the gate writes "differs only in timings" from batch to batch (batches 4, 5, 7C, 6.5): the program the project is measured by has not moved in the batch era, by design, since its compilation is phase 5. So the batches are the road toward the switch-over, and the distance is the honest measure of that road: it fell by 1,123 sites over the six batches since batch 7, and the checker count on the api from 93 to 10 before the `comprises` fix raised it by design.

### 1.2 What the batches cost

Read from the transcripts of all 19 runs of the 15 batches since 2026-09-18 (characterization, "Across all batches"):

- 269 agents, 27.4K API calls, 28.8K tool calls, 8,408 agent-minutes.
- 29.7M output tokens (estimated; 11.3M recorded, since the client under-records from batch 4), 146M tokens written to cache, 6.88B read from cache.
- In the harness's own unit, the sum of each agent's final context, the fifteen batches come to about 81M tokens (summed from the per-run "sum of final contexts" lines; the runs killed by restarts included). The wall time of the runs, summed from the per-run spans, is about 96 hours across eleven days.
- 18 agents returned nothing (killed or interrupted): 1.23M output, 10.5M cache writes, 472 agent-minutes.

Where the spend goes, by stage kind, as a share of new tokens (output plus cache writes) and of cache reads:

- rung worker 48.7% and 42.3%; it takes 52% of all cache writes and 44% of agent-minutes;
- first skeptic 11.4% and 13.9%;
- the review loop (review, its judge, its repair, second review) 14.7% and 15.9%;
- the refusal cycle on a rung (judge, repair, second skeptic) 12.9% and 12.2%;
- gather 6.1% and 12.7%, the second-largest reader;
- gate with its judge and repair 4.2% and 1.6%;
- commit 1.7% and 1.4%.

Cache writes are 83% of the new tokens, so the shares are shares of re-reading context. 45% of all cache writes, 65.5M of 146M, followed a gap of five minutes or more inside one agent, past the cache's lifetime; for rung workers it is 70% of their 75.6M. By batch the share rose from 7 to 19% (batches 1 to 3.5) to 36 to 75% from batch 4 (batch 7: 75%, 16.8M of 22.3M; 6.5b: 65%, 11.1M of 17.1M). The gaps are the waits: corpus passes of 25 to 75 minutes, LaTeX builds, ladder subsets, builds. Every ritual that makes an agent wait is paid twice, once in wall time and once in its context written back to cache.

Batch 6.5b in detail (measures-6.5b.md; the review): 17 agents, 6.15M harness tokens, 7 h 43 min, for 283 lines of library, interpreter and checker code, 90 of specification text and about 700 of tests. The two rung workers took 63% of the new tokens; each ran the interpreter corpus three times in the background, 30 to 75 minutes a run, four base runs where one pair would do; the red gate on one `.test` key cost 79 minutes and 1.2M tokens after the gate, a fifth of the run; E's refusal chain 112 minutes and 1.61M.

### 1.3 What the batches produced and committed

Summed from the fifteen per-batch sections of the characterization (their own totals; a line edited twice counts twice):

- Fortress code and specification text: about 12.2K lines changed, of which 1,232 are regenerated AST classes (batch 4) and about 2,300 a respelling of `RangeInternals` whole (7R). Hand-written change is nearer 8.5K lines.
- Tests: +7,955 / −282 net over the whole revival (characterization §2 of the tests section), 411 new files.
- Records under `explorations/` beside them: about 743K lines added, 8,923 tracked files and 55 MB under `explorations/compile-ladder/` today, 4,953 files and 35 MB of them under `probes/` (archaeology §3). Read from git today: 21,270 tracked files in the tree, 15,365 of them under `explorations/`.
- Of the 743K record lines, about 412K, 55%, are whole `ant tex` and `ant genSource` build logs of the specification, 15K to 17K lines each, committed by every batch with a specification rung since batch 5 (batch 5: 58K lines, 69% of its records; 6: 72K, 73%; 7: 44K, 65%; 7R: 45K, 71%; 7C: 61K, 89%; 6.5: 45K, 76%; N: 67K, 56%; 6.5b: 17K, 37%). Batch 7C's ratio of record lines to code-and-spec lines is 439; without its four LaTeX logs, 46.
- The specification's PDF was rebuilt and committed about twelve times, at rung commits and at repairs, each a 2 MB blob (batch 5 two, 6 two, the calculi two, 7 one, 7R one, 7C two, 6.5 one, N one).
- Uncited by any tracked `.md`: a third to a half of the record files of every batch (batch 4: 465 of 720; batch 5: 810 of 1,018; N: 475 of 970; 6.5b: 572 of 868, 583 by the coordinator's count). Of the cited ones, most are cited once, by the report that made them.
- Byte-identical copies: every batch from 3 on commits its checker-count table three to six times, ladder before/after pairs that are identical (12 of 14 in batch 7, 17 of 24 in 7R), `run-subset.sh` 35 times, `compare-normalised.py`, `count-run.sh`, `machine.sh` copied rung to rung, and hundreds of empty files (216 in 6.5b, 214 in batch 4).
- The ratio of record lines to code-and-spec lines: 19 to 27 for the early batches (repair, 3.5), 35 to 135 for the middle ones, 95 to 504 for the late ones (6b: 504; 7C: 439; 7: 275).

### 1.4 What each stage and artifact is for, and whether it delivers

- **Rung worker.** Changes Fortress test-first, in the library's way, from a briefing. Delivers: every landed rung's code passed the gate; the misses the skeptics catch are sibling sites, ledger rows not searched, and decisions not used (6.5b: 14 in two rungs, 7 a rung; N: 5.5 a rung). What it also does, by the tails: three corpus passes, a ladder subset before and after (29 minutes in 6.5b for a "before" the landed gate already held), a 400 to 500-line `REPORT.md`, a `probes/` tree of 100 to 500 files, a LaTeX log per build.
- **Skeptic.** Refuses or approves with required corrections. Delivers: it caught 10 of 14 misses in 6.5b, and in every batch the skeptic is the check that finds sibling sites and unsearched rows. Its cost is a third to a half of the worker's. It writes a 300 to 450-line `SKEPTIC.md` and 30 to 120 probe files of its own (batch N: 396 skeptic files, 232 uncited).
- **Judge.** Rules on a refusal, a stop, a blocking review, a red gate; first ruling Opus, second Fable. Delivers on refusals: E's judge in 6.5b settled the static-arithmetic question; the review judges in N and 6.5b ruled on findings that were tests and records only, and the 09-29 `land` rule now lets them route instead of repair. Does not deliver: the gate judge of 6.5b, which ruled that the repair was already on `main` after a 30-minute prompt (42 minutes, 0.38M, a top-tier ruling), fixed in the script the same day.
- **Repair.** After a refusal or ruling. Delivers what the ruling ordered; costs 5.6%. Its new tests now run together in one JVM.
- **Gather.** Applies the branches to `main`, composes one commit per rung, re-anchors `file:line` citations that other rungs shifted, writes the records, routes items for Pavol. Delivers the commits. Its reading, 12.7% of all cache reads, is mostly the records: 195K tokens of pasted texts in N until the journal tool of 09-29; citation re-anchoring by line map (33 records and six test files in 6.5b); and it copies the branch's `probes/` to `main` "each probe and capture named one by one".
- **Merged-diff review.** One reviewer over the merged diff, beside the gate. Delivers: in 6.5b it blocked on the `XXX` key that the gate found in parallel; in N on two owed tests; in 7C a misstated Effect sentence and an ungated row. Its loop (judge, repair, second review) is 8% of the batch's new tokens on average and 35 to 37% in batches 3.5 and 6.5. What it protects that nothing else does: the records' consistency and the stops met; the code findings come from skeptics and the gate.
- **Gate.** The whole suite on the merged tree, the four-thread atomic runs, the ladder regression, the count and distance stages. Delivers: it is the check; it caught the one red of 6.5b that every earlier stage missed. 20 to 42 minutes, 4% of spend. Commits `summary.txt` (5 to 10 KB), `checker-count.txt` (17 lines), `distance.txt` and since 09-28 `distance-sites.tsv` (381 KB).
- **Commit.** Fills hashes, lands the gate's files, pushes. 1.7%. Fine.
- **Landing records.** `climb-batch-N/RECORD.md` and each rung's `record.md`. What landed, the stops, the counts. Needed for the handover; `RECORD.md` is rewritten in 7 of 8 commits of a batch (7, 6), which is churn, not content.
- **Reports.** `REPORT.md`, `SKEPTIC.md`, `JUDGE.md`, `decision-record.md`. The findings, the derivation, the precedent search. Pavol: "Reports, okay. We need those." Every one of them is cited. Their size is driven by the evidence rules, not the findings: "every differential you ran", "every citation as file:line".
- **Captures.** The failing run before the edit, the passing run after, every differential, every list for Pavol "also a capture under probes/". Their stated purpose: the test-first proof and citations that do not dangle (archaeology i, m). Whether they deliver: the proof they give is a one-off file that nobody re-runs; the permanent proof is the test in the corpus, which the gate runs every batch, and the branch history, which shows the test committed before the fix. A capture is exactly the "one-off validation" Pavol's rule of 2026-09-17 ruled out as a process, kept as a file.
- **Probes.** Programs the worker and skeptic wrote to find out what each path does. 4,953 files. The 09-19 audit counted "130 probes run by no suite" as a defect; homes 1 and 2 turned them into tests; home 3 (the specification silent) is the one case that still commits a probe. 247 in 6.5b alone, 159 uncited; 70 of them copies of test files.
- **Build logs.** 55% of the record lines. On record as never to be committed for the gate (Pavol 09-19, "Full logs never"), committed for every specification rung by a planner's "all four logs captured" that nobody weighed (archaeology q). No reader; a build's result is one line: pages, errors, warnings.
- **The output comparison.** Every interpreter test in three passes per rung, base A, edit, base B, 25 to 75 minutes each, then a normalised diff. It grew from two one-off counts Pavol agreed to into a standing stop that no one asked him about (archaeology §5). What it protects: a silent change of a printed value in a team test that asserts nothing, 115 of the 326 plain team interpreter tests. What it found: rung C's three tests differing in line numbers (nothing), rung D's flaky `XXXInheritedOverload` (a ledger row), rung F's 21 team lines the flattening changes (expected and decided by Pavol under Q1), rung V's six changed outputs with causes. What it costs: 6 corpus runs per two-rung batch, the box at load 8 to 36, one rung killing the other's runner, `ReflectiveQuickCheckTest` cut at 600 s, and the cache-expiry share above. It is not the team's practice, whose suite is pass-or-fail, and the 18 tests that vary run to run are all the team's own, random and timing tests that pass or fail correctly.
- **The count and distance stages.** The metrics of phase 3, report-only, 20 s and 13 to 24 minutes beside the gate. They deliver the one number the phase is judged by. The per-rung re-runs on the unchanged base were stopped on 09-28. The per-site table is what makes the "before" reusable; it is also 381 KB per batch, identical but for line shifts from one batch to the next.
- **The combined post-batch review.** One Opus reviewer after every landing (Pavol 09-28): conformance, process measures, routing. Delivers: the 6.5b review found the eight escapes, the kill across worktrees, the wrong default of row 528, the second judge on a red gate, and produced the day's three script corrections. Cost unmeasured by itself (the reviews do not measure their own cost); each commits 1.4K to 2K lines under `reviews/`. It is the loop that has been correcting the practice.

## 2. What adds value and what does not

Judged against two things: what the goal needs (a compiled, fast microGPT, judged by the specification, with a suite that stays green and a record that a resumed coordinator and Pavol can read), and what the team's own practice was.

**Adds value, keep.**

- The rung worker under a briefing, test-first, in the library's way. It is the only stage that changes Fortress.
- The skeptic. It is the cheapest catcher of the misses that matter (sibling sites, decisions on record, the ledger). One refusal round with a judge and a second skeptic, as now.
- The gate, whole, once per batch on the merged tree. The four rules of 09-29 (no rerun after a tests-only repair, the judge's `land`, the second review beside the commit, the gate judge only for an unanswered red) already cut its tail.
- The count and distance stages at the gate, report-only. They are the phase's measure.
- One merged-diff review, for the records' consistency, the stops and the routing; its findings that are tests and records only go to the next batch (the 09-29 rules).
- The combined post-batch review. It is where the practice has been corrected from; it should also be where each batch's cost against its Fortress change is written down, which it now does in part.
- `REPORT.md`, `SKEPTIC.md`, `JUDGE.md`, `decision-record.md`, `RECORD.md`: the findings. Shorter, because the evidence rules that inflate them go.
- The ledger rows, the FACTS entries, the PLAN lines, the handover paragraph. These are what Pavol pays for: the issues on file and the state.
- The gate's `summary.txt` and `checker-count.txt`: small, the chain of comparands.

**Adds little or nothing at its price, change or remove.**

- Captures on `main`. The test-first proof lives in the branch's commit order and in the skeptic's own run; the capture is a one-off file that nobody replays. Remove from `main`; keep on the rung's branch.
- Probes on `main`. Worker scratch. Remove from `main`; keep on the branch. Home 3's probe becomes a ledger row quoting the program and its output, or an `XXX` test pinning today's behaviour where a test can hold it.
- Build logs. Zero value; more than half of all committed record lines. Never committed; the report quotes the build's last lines.
- The PDF rebuilt at every rung commit and repair. Built and committed once per batch, at the landing, on the merged tree.
- Ladder raw outputs per rung (`ladder-before/`, `ladder-after/`, `.compile`, `.run`), and the rung's ladder "before" itself: the landed gate's ladder comparison is the before (the 6.5b review's measure 6). Remove.
- Script copies per rung (`run-subset.sh` 35 times, `count-run.sh`, `compare-normalised.py`). One copy under `coordinator/tools/`, invoked by path.
- Citation dumps, re-anchoring dry-runs, `df` captures, machine lines as files, test copies under `walkcopy/`, `cross/`, `owed/`. Scratch. Remove.
- The per-site distance table committed per batch: one path, overwritten at each landing, so the tree holds the last landed table and history one copy per batch; under the cleaner pass it leaves `main` with the rest.
- The output comparison, three passes per rung: remove as a standing rule (section 3.4). It is a ritual beside the suite, not the suite; the value it guards belongs in assertions.
- The review's in-batch judge-repair-second-review loop on findings that are tests and records only: already routed by the 09-29 rules; the manual and script should say so plainly and the second review should be the post-batch review, not a stage.
- The gate judge: only for a red the repair did not answer (built 09-29).
- Landing-record churn: `RECORD.md` written once at the commit stage from the journal, not rewritten by every stage.
- The rule "every path you cite is tracked": inverted into "every path you cite resolves on `main` or on the rung's branch at the hash you name". The current rule is what pulls scratch onto `main` (archaeology, section 1, item 4 and s).

**The tests themselves.**

The team's practice (characterization, tests §1): topic names, often numbered; a header on every file; `XXX` meaning a negative program that must be rejected (14.5% of interpreter tests) or an exact static-error golden (80% of compiler `.test`); short files, median 17 code lines, a median of zero checks and 35% of interpreter tests with no check at all; golden output in 47% of the plain compiler `.test` files; no citation of any document anywhere; comments that state intent or expected output.

The revival's (tests §2): 220 of 411 new files carry a rung letter; `XXX` is a positive program printing `REACHED` and `PASS` that pins a known gap (58% of new interpreter tests, 44% of compiler `.test`); 41 `*Link.test` companions the team never had; median 44 code lines and 12 checks in an interpreter test; 207 of 223 files point at an `explorations/` record; 73% of assertion messages cite a ledger row, a `.tex` line, POSITIONS or FACTS; 582 of the 663 test lines edited after landing only renumbered a `.tex` citation.

Judgement, item by item:

- *Checks in the program.* Good, and better than the team's: a test that asserts is what makes the gate a check. The team's own numeric tests are tables of assertions too (`RationalTest`, 703). Not cargo cult.
- *File size and scope.* The team wrote one feature per file. The revival writes one rung per file: `PowChooseLcmRungE` is `^`, `CHOOSE` and `LCM` over four widths, 50 checks, because that is what rung E did. Split by feature, name by feature, as the team did. The 50 checks are not too many; they are in the wrong unit.
- *Rung suffixes.* Useless for finding: `RungB` was introduced by seven commits in four batches, so the letter names nothing; the batch is found by `git log`. The team's corpus has no such names. Stop; rename the 220 in the cleaning pass.
- *`XXX` as a gap pin.* Defensible and useful: the suite goes red the day a gap closes, and the crash shape is pinned. But 116 of the 133 ever written are still `XXX`, and the obligation ("a home-2 test is owed in the batch that measures the defect", ruled three times) has cost owed-test arguments in six batches, one blocked landing, and a 79-minute red on a key. Narrow it: a home-2 test is owed for a defect on the plan's path (a phase names it); an off-path defect gets a ledger row and no test. That narrows Pavol's decision of 2026-09-19 and needs his word.
- *Link companions.* A harness limit (XXX applies to every command). Acceptable; a one-line harness change (a per-command `XXX` key) would remove 41 files, for a later rung.
- *Provenance in messages.* A message that names the specification's rule is good practice the team lacked. A message that names a `.tex` line number is churn: the line moves with every specification rung. A message that names a ledger row, POSITIONS or FACTS ties a Fortress test to the revival's process files, which under Pavol's plan of 2026-09-20 leave `main`. So: cite the specification by section or label, never by line; put the ledger row in the commit message and in the one comment line, not in every assertion; cite no coordinator file from a test.
- *The pointer comment* `(*) explorations/compile-ladder/rung-…/REPORT.md`. It dangles once the record leaves `main`. Replace by the ledger row number, which is stable and will map to the GitHub issue Pavol wants for the cleaner pass (POSITIONS 2026-09-22).
- *Golden output.* Adopted on 09-17 "where a value matters, applied per test", and used in 30% of link-and-run tests against the team's 47%. The corpus-wide comparison is not that technique and has partly stood in for it. Use the technique: where a rung changes a printed value that matters, the test that prints it gets `run_out_equals` (compiled corpus) or an assertion (interpreter corpus).

## 3. A proposed practice

Each change with its reason, what it protects or gives up, and its cost in the project's units (tokens as the harness counts them, agents, minutes, rungs).

### 3.1 What a batch commits to `main`

Per rung, one commit composed at the gather, holding:

- the Fortress change: source, library, `Specification/` text, tests, demos where a decision respells them;
- the findings: the rung's `REPORT.md`, `SKEPTIC.md` (both rounds in one file), `JUDGE.md` if any, `record.md`, `decision-record.md` for a specification rung;
- the record lines: ledger rows opened, closed and noted; FACTS and PLAN lines; the handover paragraph.

Per batch, one landing commit: `climb-batch-N/RECORD.md`, the review's and judges' rulings, the gate's `summary.txt`, `checker-count.txt`, `distance.txt`, and the last landed `distance-sites.tsv` at one fixed path; the PDF built once on the merged tree.

Nothing else. No `probes/`, no captures, no build logs, no ladder raw outputs, no script copies, no test copies, no citation dumps.

Reason: the archaeology shows no decision ever put scratch on `main`; the volume came from four rules (captures prove test-first, cited paths must be tracked, `.txt` escapes `.gitignore`, the gather copies the branch's whole net change). Pavol's plan of 2026-09-20 is that `main` holds the changes to Fortress and the process record lives apart. Protects: `main` readable, the goal's tree small, the citation discipline intact (below). Gives up: nothing a reader has used; 583 of 866 files of 6.5b were named by no report. Cost: a gather rule and a script list, a few lines; no tokens.

### 3.2 Where the rest goes

The rung's branch. Workers, skeptics and judges already commit their files to `wip/<slug>` as they go (POSITIONS 2026-09-18 and 2026-09-26); the branches carry every probe and capture today, and the remote copies are left after the gate because the proxy refuses their deletion. So the evidence branch exists. The change: at the commit stage the branch is pushed under `record/batch-<N>/<slug>` and named with its final hash in `RECORD.md`; the local `wip/` branch and worktree are removed as now. A report cites a probe as `record/batch-6.5b/rung-size-range:probes/repair/arith-after.txt:39`, a path git resolves for as long as the branch exists.

Reason: it is Pavol's "index, not a copy" applied to the batches, and it uses what the workflow already does. Protects: every citation resolves; the container's death loses nothing; the skeptic and judge have the evidence in the worktree they already work in. Gives up: a reader of `main` alone cannot open a probe without fetching the branch; that is the plan's intent. Cost: one `git push` per rung in the commit stage; the tracked-path check rewritten to resolve `branch:path`.

### 3.3 Test-first, kept and shown without scratch

The worker's first commit on its branch is the test alone, with its `.test` file; the second is the fix. `REPORT.md` quotes the failing run's verdict lines, three to five lines of the harness's own output (the `Tests run … Failures` line and the assertion's message), and names the two commits. The skeptic checks out the test commit, runs the test through the harness, sees it fail, then runs it at the branch's head and sees it pass (its check 3 today asks it to "find that captured output"; running is stronger and is what it does for check 9 already). The record of test-first is then git history, which nothing deletes, plus a few quoted lines, and the check is a run, not a file read.

Reason: Pavol's rule of 2026-09-17 is a permanent check in the corpus and a worker that saw its test fail; a capture is neither. Protects: the discipline, checkably, by the branch's order and the skeptic's run. Gives up: the captured file. Cost: a few minutes of the skeptic per rung, which it spends today reading the capture; two sentences in the worker's and skeptic's roles.

### 3.4 What replaces the output comparison

Remove the three-pass corpus comparison from every rung tail as a standing rule. In its place:

- A value that matters is asserted in the test that prints it: `run_out_equals` in the compiled corpora, an `assert` in the interpreter corpus. This is the technique adopted on 2026-09-17, applied per test.
- The skeptic runs, before and after the edit, the interpreter tests that use the declarations the rung changed, found by grep over `ProjectFortress/tests/` for the changed names, one JVM each with private caches, and lists any changed output with its cause. Tens of files, minutes, not 444 files three times.
- When a batch record expects changed outputs by design (a flattening, a numeral switch, a respelling of a team test), the planner asks for one edit pass over the corpus, compared against the last landed base pass, which the gate takes once per landing and keeps beside its tables on the record branch; the base is never run inside a rung, and never twice. The known list of 18 tests that vary run to run is one file under `coordinator/tools/`, not rediscovered by a base pair.
- A changed output of a stable test is a ledger row with the cause, a stop only where the batch record reserved one (POSITIONS 2026-09-26, rung D's stop).

Reason: the team's suite is pass-or-fail and self-checking; the comparison guards only the printed values nobody asserted, at 6 corpus runs per two-rung batch, the box overloaded and the workers' contexts expiring while they wait. Protects, still: a silent change in a test the rung touches (the bounded run), and the batches that change outputs on purpose (the one pass). Gives up: catching a silent change in a printed value of a test far from the rung's declarations, which the post-batch review and the next batch's bounded runs are the net for. Cost: saves two to four hours of JVM time and the largest cache-expiry gaps per batch; the bounded run costs minutes per rung.

If Pavol wants a permanent net instead, the suite is where it goes: the interpreter harness gains an optional expected-output file beside a test (`Foo.out` next to `Foo.fss`, compared when present, the `Operation took` line masked), as the compiled harness already has `run_out_equals`. One small rung in the harness and goldens added per test as rungs touch them. That is the lit and Scala `.check` way the 09-17 note weighed; the harness change is what it costs.

### 3.5 What the gate does

Unchanged in what it runs: clean build, `testFast`, `testSystem`, the four-thread atomic runs, the ladder regression against the landed baseline, the count and distance stages beside them. Changed in what it keeps: `summary.txt`, `checker-count.txt`, `distance.txt` on `main`; the per-site table at one fixed path overwritten per landing; the ladder's per-file outputs and the distance's `errors.tsv` on the record branch, never on `main`. The 09-29 rules stand: no rerun after a tests-and-records repair, the repair's tests in one JVM, no gate judge when the repair answered every red line. Two small defects the 6.5b review named are still unbuilt and belong here: the atomic stage's closing grep anchored to its own lines, and the `# repair-tests total` sentence.

Reason: the gate is the check that works; its cost, 4%, is the one worth paying. Cost of the change: the commit stage's file list.

### 3.6 Which review loops stay, and in what form

- Skeptic per rung: stays, one refusal round, judge on Opus, repair, second skeptic. It is the loop that finds the misses.
- Merged-diff review: stays, once, beside the gate. A blocking finding that touches code goes to one judge and one repair and reruns the gate; any other finding is routed to the next batch and listed for Pavol (the 09-29 `land` rule, made the default rather than a judge's fourth option). No second review inside the batch: the post-batch review is the second look, and it reads the landed tree.
- Gate judge: only for a red gate no repair answered.
- Post-batch review: stays, combined, one Opus reviewer, reading only; it adds one paragraph per batch, "what the batch spent against what it changed", in the figures the landing report gives (3.8).

Reason: the review loop is 15% of the spend and its in-batch judge-repair-review chain has twice held a green batch on tests-and-records findings (N, 6.5b). Protects: the records' consistency (the review), the stops (its check 10, which the push still waits for), the code (the gate). Gives up: a second in-batch review, whose findings go to the next batch anyway under the 09-29 rule. Cost: saves about 0.4M to 1.0M tokens and 15 to 55 minutes per batch that would have had the chain (N: 1.0M and 54 minutes; 6.5b: 1.2M and 79 minutes with the gate chain).

### 3.7 How a worker's evidence reaches a skeptic or judge

As now: the worktree and the branch. The skeptic works in the rung's worktree, reads `REPORT.md`, runs what it needs (the test at both commits, its own programs), and commits its verdict and its own probes to the same branch under `probes/skeptic/`. The judge reads the report and the verdict and the branch. Nothing needs to be on `main` for any of them; nothing in their roles reads `main` for evidence today.

The one thing that did need a capture was the harness refusing a worker's write of `REPORT.md` (batches 5 and N); since 09-29 the gather writes the report from the journal, so the rule "every list a rung hands Pavol is also a capture under probes/" (archaeology r) can go.

### 3.8 What the batch reports to Pavol at landing

One message, in this order, plain words, numbers as K or M:

- Per rung, one line: what changed in Fortress (the files and the lines, the decision it builds), the tests added (plain and `XXX`, by name), the ledger rows opened and closed.
- The gate in one line: green, the test counts, the checker count and the distance with their moves.
- What it bought: the sticks that moved, in one line.
- What it cost: agents, tokens as the harness counts them, wall time, and the estimate the record gave beside them.
- What it did not send: the rungs' lists for him, by path, and the items filed in `PLAN.md` for his review, by count.
- What went wrong, if anything, in one line each, with its cost.

Reason: 6.5b's landing gave one line per rung and no cost; the lists for him were "on file, not sent" a fourth time; he learned the file count from a question of his own. Cost: the commit stage already computes the counts; the coordinator writes eight lines.

## 4. The cleaning pass

Two stages, because the second is a history rewrite the harness refused once already (2026-09-20) and belongs to Pavol's own cleaner pass.

### 4.1 Stage one, now: the working tree

1. Create `record` at today's `main` (a branch, and a tag `record-2026-09-29` at the same commit), pushed. Every path cited anywhere then resolves at that ref forever.
2. On `main`, one commit that removes, by rule, from `explorations/compile-ladder/*/` and `explorations/compile-ladder/climb-batch-*/`: `probes/`, `raw/`, `raw-before/`, `ladder-before/`, `ladder-after/`, `logs/`, `build/`, `passes/`, `count/`, `pre/`, `post/`, `controls-*/`, `merged-tests/`, `repair-*-tests/`, `judge-repair/`, `review-repair/`, every `*.compile`, `*.run`, `*.walk`, `*.compiled`, `*.out`, `*.log`, `*-tex.txt`, `*genSource*.txt`, every `gate/distance-sites.tsv` but the last, every `gate/ladder/` raw output, every per-rung script copy, and the shadow source and `.class` copies of rung 7. Kept: every `.md`, every `gate/summary.txt`, `checker-count.txt`, `distance.txt`, `microgpt-phase.md`; the gate's own comparands (`gate-baseline/`, `baseline-2026-09-19/` whole, since the ladder stage reads its `raw/`), `coordinator/tools/`, the microGPT programs and goldens, `reviews/`, the post-mortems. The characterization's scratch scripts (`scratchpad/characterize/*/cite.py`, `classify.py`) already classify every file and can produce the list; the list is read with `git diff --cached --stat` before the commit, as the hard rule says.
3. In the same commit, one sentence at the head of the ledger, of `PLAN.md` and of `FACTS.md`: a path under `explorations/compile-ladder/…/probes/` or another removed directory resolves on branch `record` at tag `record-2026-09-29`. Read from git today: 516 ledger lines, 47 PLAN lines and 83 FACTS lines cite a `probes/` path; none needs rewriting.
4. The test files' pointer comments cite `REPORT.md`, which stays; nothing dangles.

Cost: one Opus worker session, about 0.3M to 0.5M tokens, and a gate run after it (the stage reads nothing that goes, by the list above, but the gate is the check). Frees: about 35 MB of `probes/` and most of the 55 MB from the working tree; history is untouched. What it protects: every cited line, at a ref.

### 4.2 Stage two, Pavol's cleaner pass: history

His plan of 2026-09-20: `main` holds only the changes to Fortress, and the whole process record, `explorations/` included, lives on its own branch, so that a clone of `main` carries no blobs that are not Fortress. The pass: with `record` and the transcript branches kept as they are, rewrite `main` from `a874948ac` dropping every path under `explorations/` (or keeping only the few the tree needs to build and gate, which is nothing outside `explorations/coordinator/tools/` and the gate comparands, better moved out of `explorations/` first), and dropping the intermediate PDF blobs; force-push with lease. 1,299 revival commits on `main` (read from git today). This is `git filter-repo` on his machine, an afternoon and a re-clone for every checkout, no tokens. The harness refused a smaller rewrite once; it is not done from the container.

What must be kept: `record` and the tags; `transcripts` and `transcripts-blinded`; the model names in the records as they stand (POSITIONS 2026-09-19); the ledger's row numbers, never renumbered; the tests' one comment line; the commit messages, which carry the `historical:` lines and the row numbers. After the rewrite, a test's pointer to `explorations/…/REPORT.md` resolves on `record` only, which is why section 2 says the pointer should become the row number before then.

The two things he already owns go with it: the two noise commits of 09-21 and the four verbatim transcript files still in history (held list, "Smaller items").

### 4.3 What not to clean

Not the reports, verdicts and rulings: cited by everything, and his "we need those". Not the ledger, FACTS, PLAN, POSITIONS and their histories. Not the gate's comparand files, which the gate reads. Not `reviews/`, which holds the judgements his decisions rest on. Not the tests: the renames of section 2 are a separate, reviewed commit, since 220 file names change and the ledger cites some of them.

## 5. The rules to change

Each line quoted as it stands, then its replacement. Script line numbers are at today's `main` (`e1e9d797f`).

**Protocol, hard rules.**

- "A worker commits only the paths it wrote, as it goes, in one command (`git add -- <paths> && git commit -m … -- <paths>`), never a directory copy, and pushes only after `git log origin/main..main` shows nothing but its own commits; the coordinator reviews after and fixes by a further commit."
  Replacement: "A worker commits only the paths it wrote, as it goes, in one command (`git add -- <paths> && git commit -m … -- <paths>`), never a directory copy, to its own branch. What lands on `main` is the change to Fortress, its tests and the findings (the report, the verdict, the ruling, the record lines); a worker's probes, captures and logs stay on its branch, which the landing keeps under `record/`. The coordinator reviews after and fixes by a further commit."
- "Every edit under the original tree is test first, the test seen failing before the fix, and is flagged at commit."
  Replacement: "Every edit under the original tree is test first: the test is the first commit on the worker's branch and is seen failing before the fix, the skeptic runs it at both commits, and the edit is flagged at commit."

**The manual, `climb-batch-workflow.md`.**

- "Shared prefix": "a committed capture is `.txt`, never `.out` or `.log` (`.gitignore:42,46`, item h)".
  Replacement: "a capture is evidence for the skeptic and the judge; it lives in the worktree and on the rung's branch and never lands on `main`; a cited one is cited as `record/batch-<N>/<slug>:<path>:<line>`".
- "What a measured defect is worth", home 3: "**deferred, specification silent** → a probe with a committed `.txt` capture and a ledger row, the record saying the silence is the reason (item c)."
  Replacement: "**deferred, specification silent** → a ledger row that quotes the probe program and what each path answers, or an `XXX` test that pins today's answer where a test can hold it; the probe file stays on the rung's branch; the record says the silence is the reason."
- "Gather": "Files are staged by an explicit list and `git diff --cached --stat` is read before the commit, never `git add` of a directory".
  Replacement: "Files are staged by an explicit list, which is the Fortress change, the tests, the rung's `REPORT.md`, `record.md`, `SKEPTIC.md`, `JUDGE.md` and `decision-record.md`, and the record lines; nothing under `probes/` or any other evidence directory; `git diff --cached --stat` is read before the commit, never `git add` of a directory".
- "Shared prefix": "The tracked-path check is here too: every `explorations/` path a record cites is `git ls-files --error-unmatch`'d before the rung reports (item g, gap 4)."
  Replacement: "The cited-path check is here too: every path a record cites resolves either on `main` (`git ls-files --error-unmatch`) or on the rung's branch at the hash the citation names (`git cat-file -e <hash>:<path>`) before the rung reports."
- "Gate": "The commit stage lands `distance.txt` beside `summary.txt` and `checker-count.txt`" and POSITIONS 2026-09-28 "The gate commits its per-site list, so that the 'before' is complete."
  Replacement, one sentence added: "The per-site list is written to one fixed path, `explorations/compile-ladder/gate/distance-sites.tsv`, overwritten at each landing, so the tree holds the last landed table only."
- "Preparing a batch record": add: "A rung's tail asks for no corpus comparison. Where the record expects changed outputs by design, it asks for one edit pass compared against the last landed base pass, which the gate keeps; the base is never run inside a rung."

**The script, `climb-batch-workflow.js`.**

- `:1151` "A capture you intend to commit is named .txt. Never .out and never .log: .gitignore:42,46 swallow both, which is how four probe captures cited by two ledger rows were nearly landed untracked."
  Replacement: "A capture is evidence for your skeptic and judge. Keep it in your worktree and commit it to your own branch (git add -f where .gitignore:42,46 would swallow a .out or .log); it never lands on main. Cite it as <branch>:<path>:<line>."
- `:1188` "3. **Deferred, and the specification is silent** - a probe file with its captured output, named .txt, committed under probes/, and a ledger row that cites it. This is the only home that is not a gated test, and the record says explicitly that it is here because the specification is silent, not because it was easier."
  Replacement: "3. **Deferred, and the specification is silent** - a ledger row that quotes the probe program and what each path answers, or an XXX test pinning today's answer where a test can hold it; the probe file stays on your branch. This is the only home that is not a gated test, and the record says explicitly that it is here because the specification is silent, not because it was easier."
- `:1200` "- probes/ - your probe programs and their captured outputs, every capture named .txt."
  Replacement: "- probes/ - your probe programs and their captured outputs, on your branch only; the gather does not land them."
- `:1206` to `:1212`, "## Every path you cite is tracked - check it before you report" with its `git ls-files --error-unmatch` loop.
  Replacement: "## Every path you cite resolves - check it before you report", the loop testing `git ls-files --error-unmatch` for a `main` path and `git cat-file -e "$hash:$path"` for a `<branch>:<path>` citation.
- `:1281` "3. Run it and capture the failure output to a file BEFORE the edit exists, named .txt. A report with no recorded failure is refused by your skeptic. The process this rules out is the one-off validation script: proving once by hand that something works and going ahead without leaving a permanent check in the corpus."
  Replacement: "3. Commit the test alone as the first commit on your branch and run it through the harness BEFORE the edit exists: it must fail. Quote the harness's verdict lines in REPORT.md and name the commit. A report whose test does not fail at that commit is refused by your skeptic. The process this rules out is the one-off validation script: proving once by hand that something works and going ahead without leaving a permanent check in the corpus."
- `:1330` "3. The recorded failure. The worker was required to run the new test and capture its failure BEFORE the edit existed. Find that captured output. A rung whose report has no recorded failure is refused - this is not negotiable and it is the point of the whole discipline."
  Replacement: "3. The recorded failure. Check out the test commit the report names, run the test through the harness and see it fail; then run it at the branch's head and see it pass. A rung whose test does not fail at its test commit is refused - this is not negotiable and it is the point of the whole discipline."
- `:1370` "Write your findings to explorations/compile-ladder/<slug>/SKEPTIC.md in that worktree, and your probes under explorations/compile-ladder/<slug>/probes/skeptic/, every capture named .txt. Run the tracked-path check of the shared prefix over SKEPTIC.md before you report."
  Replacement: "Write your findings to explorations/compile-ladder/<slug>/SKEPTIC.md in that worktree, and your probes under explorations/compile-ladder/<slug>/probes/skeptic/, committed to the rung's branch and never landed. Run the cited-path check of the shared prefix over SKEPTIC.md before you report."
- `:1651` "6. One commit: the applied source, the tests, the rung's files under explorations/compile-ladder/<slug>/ (REPORT.md, record.md, SKEPTIC.md, JUDGE.md if any, and each probe and capture named one by one), the three record files, and PLAN.md when step 5 wrote to it."
  Replacement: "6. One commit: the applied source, the tests, the rung's files under explorations/compile-ladder/<slug>/ (REPORT.md, record.md, SKEPTIC.md, JUDGE.md and decision-record.md if any, and nothing under probes/ or any other evidence directory), the three record files, and PLAN.md when step 5 wrote to it."
- `:1732` "8. Every path any of the landed records cites is tracked (git ls-files --error-unmatch)."
  Replacement: "8. Every path any of the landed records cites resolves, on main (git ls-files --error-unmatch) or on the rung's branch at the hash cited (git cat-file -e)."
- `:2184` "4. For each wip/ branch: confirm git -C <worktree> status -sb shows nothing ahead of its origin; then git worktree remove <worktree> and git branch -D <branch>. Leave the remote wip/ branches …"
  Replacement: "4. For each wip/ branch: confirm git -C <worktree> status -sb shows nothing ahead of its origin; push it as record/batch-<N>/<slug> (git push origin wip/<slug>:record/batch-<N>/<slug>) and write that name and its hash into RECORD.md; then git worktree remove <worktree> and git branch -D <branch>. Leave the remote wip/ branches …"
- The manifest tails (batch 6.5's `:553`, batch 7b's paragraphs at `CLIMB-BATCH-7.md:307`, `:347`, `:382`, `:412`, `:444`): "**The comparison.** … every file of ProjectFortress/tests/ except the new test, in three passes, base A, the edit, base B, one JVM per test with private caches …"
  Replacement: "**The comparison.** The interpreter tests that use the declarations this rung changes, found by grep over ProjectFortress/tests/, run before and after the edit, one JVM each with private caches; every changed output listed with its cause. No corpus pass." And for a rung whose record expects changed outputs by design: "One edit pass over ProjectFortress/tests/ with the runner under coordinator/tools/, compared against the last landed base pass the gate keeps; every changed output listed with its cause."
- `:894` (the rule of 09-26, archaeology r): "every list a rung hands Pavol is also a capture under probes/; the gather composes the file from them, as in batches 3.5, 4 and 5."
  Replacement: delete; the gather writes the report from the journal since 09-29, and a list for Pavol is a section of `REPORT.md`.

**`PLAN.md`, "The rule for every edit under the sealed tree".**

- "Test first: a program that fails today is added to the compiler's own corpus … a `.fss` that prints `PASS` plus a `.test` file naming `link`, `run`, `run_out_contains=PASS` …"
  Add one sentence: "The test is the first commit on the rung's branch, seen failing there by the worker and again by the skeptic; no captured output is committed."
- "Testing techniques adopted": "Golden output where a value matters … Applied per test, not retrofitted."
  Add: "The corpus-wide before-and-after comparison of a rung is not this technique and is not a standing rule of a rung (2026-09-29)."

**`POSITIONS.md`.**

- The 2026-09-28 entry's sentence "The gate commits its per-site list, so that the 'before' is complete." gains: "at one fixed path, overwritten per landing".
- A new dated entry for whatever he decides in section 6, in his words.

## 6. For Pavol

You asked what a batch spends and what it buys. Here it is in short.

Fifteen batches since 2026-09-18 spent about 81M tokens as the harness counts them, and about 96 hours of runs. They changed about 12K lines of Fortress code and specification and added about 8K lines of tests. Beside that they committed about 743K lines of records. More than half of those record lines are LaTeX build logs. A third to a half of the record files of every batch are named by nothing. The last batch, 6.5b, spent 6.2M tokens and nearly eight hours for about 280 lines of code, 90 of specification and 700 of tests.

The tokens go half to the rung workers, an eighth to the skeptics, an eighth to the refusal rounds, a seventh to the review loop, and small shares to the gather, the gate and the commit. Almost half of all the cache writes are agents re-reading their context after waiting five minutes or more, mostly on the corpus passes, the LaTeX builds and the ladder runs. So the rituals cost twice: the wall time and the re-reading.

What the batches bought is real. The distance to the switch-over fell from 1,747 to 624. The checker's count on the api fell to 10 before the comprises fix raised it by design. The suites grew from 1,783 to 2,122 tests, all green. MicroGPT itself has not moved, because its compilation is phase 5.

Five decisions, in the order they need taking. Each has my recommendation last.

**Decision 1. What a batch lands on main.**
Question: does a batch commit its workers' probes, captures, build logs and script copies, or only the change to Fortress, the tests and the findings?
Options: (a) as today, everything the branch carries; (b) the Fortress change, the tests, the reports, verdicts and rulings, and the record lines; the evidence stays on each rung's branch, kept under a record name, and every citation names the branch; (c) as (b), and the evidence is thrown away after the skeptic.
What each costs: (a) 55 MB and 8.9K files so far, growing 300 to 1,000 files a batch; (b) one script rule, no tokens; (c) the same, and a citation that cannot be checked.
Recommendation: (b). Test-first is then shown by the branch's commit order and the skeptic's run, not by a captured file.

**Decision 2. The output comparison.**
Question: do rungs keep running the whole interpreter corpus three times to compare printed outputs?
Options: (a) keep it; (b) drop it as a standing rule; a rung's skeptic runs the tests that use the changed declarations before and after, minutes not hours; a value that matters gets an assertion; a batch that changes outputs on purpose asks for one edit pass against a base pass the gate keeps; (c) as (b), plus a harness change so the interpreter suite can carry expected-output files per test, the way the compiler suite already can. Then the suite is the comparison.
What each costs: (a) two to four hours of JVM time per batch and the largest waits; (b) nothing to build, and a silent change far from the rung's declarations would be caught only by the post-batch review; (c) one small harness rung, then goldens added per test as rungs touch them.
Recommendation: (b) now. (c) later if you want a permanent net; it is the team's kind of answer, a test that checks its value.

**Decision 3. The review loops inside a batch.**
Question: which checks stay between a rung's landing and the push?
Options: (a) as today: skeptic, judge, repair, second skeptic; review, judge, repair, second review; gate judge and repair; (b) the skeptic loop stays; one merged-diff review; a finding that touches code gets one judge, one repair and a gate rerun; any other finding goes to the next batch and is listed for you; no second review inside the batch, the post-batch review is the second look; a gate judge only for a red the repair did not answer.
What each costs: (a) 0.4M to 1.2M tokens and 15 to 80 minutes per batch that hits the chain; (b) nothing to build beyond a default already in the script.
Recommendation: (b).

**Decision 4. The cleaning pass.**
Question: what is removed from the tree now, and what waits for your history rewrite?
Options: (a) nothing until the cleaner pass; (b) now: a branch and a tag at today's main so every cited path stays reachable, then one commit removing the probes, captures, logs, raw outputs and script copies from main's tree, with one sentence in the ledger, the plan and FACTS saying where they resolve; later, on your machine: the rewrite of main that drops the whole process record and the extra PDF blobs from history, with the record branch kept.
What each costs: (a) nothing now, a tree nobody can read; (b) one worker session of about 0.4M tokens and a gate run now; an afternoon and a re-clone at the rewrite.
Recommendation: (b), the first half now.

**Decision 5. The tests' names and messages.**
Question: do new tests keep the rung suffix, the pointers to our records, and the ledger and spec line numbers in every assertion message?
Options: (a) as today; (b) topic names as the team used, one feature per file, the specification cited by section and never by line, the ledger row in the commit message and one comment line, no coordinator file cited from a test; the 220 existing suffixed files renamed in one reviewed commit during the cleaning pass; (c) as (b) for new tests only.
What each costs: (a) 582 lines of citation renumbering so far, and pointers that dangle once the record leaves main; (b) a worker session of about 0.5M tokens for the renames and message edits; (c) nothing now, two naming styles in the corpus for good.
Recommendation: (b).

One more thing you may want to weigh, not a decision now: whether an expected-failure test is owed for every measured defect, as you decided on 2026-09-19, or only for defects on the plan's path. The obligation has cost owed-test arguments in six batches and one held landing. Narrowing it to the path is my suggestion; it is yours to change.
