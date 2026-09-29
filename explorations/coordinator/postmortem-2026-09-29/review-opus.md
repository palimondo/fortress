<!-- The Opus reviewer's answer to the question of the post-mortem of 2026-09-29: what a climb batch spends its tokens on, what it produces and commits, whether that is worth it for the project, and what practice should replace it. Written independently of the Fable reviewer, reading only, from the post-mortem's README.md, archaeology.md, characterization.md and measures-6.5b.md, reviews/batch-6.5b-review.md, the held list's four groups of 2026-09-29 and Pavol's positions. Three things were measured for it, each because a claim had no number on file (section 0); everything else is cited. Script and manual line numbers are at 021d84347. -->

# Review of the batch practice (Opus reviewer)

Pavol: your part is section 6, the last one. It stands on its own.

## 0. What I measured, and why

The record answers most questions. Three claims had no number on file, so I measured them, reading only. The scripts are in the session scratchpad, `review-opus/`, and are not committed.

- **M1. What the rung workers were waiting on.** The characterization found that 65.5M of the runs' 146.0M cache writes follow a wait of five minutes or more inside one agent ("Where the cache writes come from"). It does not say what the agent was waiting on. For each such request I took the file named by the last `wait_for` (or the command) in the tool call before the gap, and sorted it by name: corpus comparison pass, ladder subset, microGPT check, count or distance stage, specification build, build or test run, other. Over the 19 runs my totals reproduce the characterization's 146.0M and 65.5M exactly. The sorting is by file name, so "other" (18.5M) may hide more of the same kinds. (`gaps_all.py`; for 6.5b I read each wait's target by hand, `gaps.py`.)
- **M2. The agents around the runs.** The characterization counts the Workflow runs only. I summed the harness figure (each agent's context at its last turn, the unit of the runs' "sum of final contexts") for the session's other agents whose own description names a batch record, its Fable review, an amendment or re-anchoring of a record, a `FACTS.md` consolidation, a combined or conformance review, the routing of a review, a change to the batch script, or a landing record. (`around.py`; the classification is by description.)
- **M3. What the committed records weigh in the repository, and what the live record cites.** `git rev-list --objects main | git cat-file --batch-check`, summed by path; and a grep of the `compile-ladder/` paths cited by `FACTS.md`, the ledger, `PLAN.md`, `POSITIONS.md`, `INDEX.md`, the handover, `CLAUDE.md`, the protocol, the script and its manual.

## 1. The practice as it is

### 1.1 The stages

From the script and its manual (`climb-batch-workflow.js`, `climb-batch-workflow.md`):

- Before the run: an Opus planner drafts `CLIMB-BATCH-<n>.md`, with each rung's briefing and a list of measurements; a Fable worker reviews it in place; Pavol says go.
- The run: rung workers in parallel worktrees, each on a `wip/` branch it pushes as it goes. Each is followed by a skeptic in the same worktree. A refusal goes to a judge, a repair round and a second skeptic.
- The gather composes one commit per rung on `main` from each branch's whole net change, folds each `record.md` into `FACTS.md`, the ledger and the handover, re-anchors citations, and files items for Pavol in `PLAN.md`.
- The merged-diff review runs beside the gate. A blocking review goes to a judge, a repair and a second review.
- The gate: `compileAll`, `testFast`, `testSystem`, the four-thread `atomic` runs, the ladder regression (85 files, phase and stdout), the checker count and the distance stage.
- The commit stage lands the gate's tables and the hashes, and pushes.
- After the landing: the combined post-batch review (POSITIONS 2026-09-28), a worker that routes its findings into `PLAN.md` and fixes the script, `FACTS.md` consolidated, the next record re-anchored.

### 1.2 Where the tokens go

**The runs** (characterization, "Across all batches" and "Per batch"):
- 15 batches, 19 runs, 269 agents, 8,408 agent-minutes.
- The harness figure summed over the runs is about 81M (the per-run "sum of final contexts").
- New tokens: 29.7M output (estimated) and 146.0M written to cache. 6.88B read from cache.
- By stage family, as a share of output plus cache writes: rung workers 48.9%, the merged-diff review loop 14.7%, the refusal cycle (rung judge, repair, second skeptic) 12.9%, first skeptics 11.4%, the gather 6.1%, the gate 4.2%, the commit 1.7%.

**The mechanism behind the largest share is waiting.** The cache holds an agent's context for five minutes. When an agent waits longer on one tool call, its next call writes its whole context to cache again. 44.9% of all cache writes follow such a wait, and 70.3% of the rung workers' 75.6M (characterization). M1 says what they waited on:
- the corpus output comparison's passes: 27.2M, 26.8M of it in rung workers;
- the count and distance stages: 6.9M, 4.4M of it the merged-diff review polling for the gate's count table (check 9);
- ladder subsets: 5.3M;
- the two microGPT checks under walk: 5.0M;
- builds and test runs: 2.4M; specification builds: 0.3M; other: 18.5M.

Batch 6.5b shows it plainly:
- Rung V wrote 6.47M to cache. 5.48M of it came right after twelve waits of 6 to 9 minutes on its three corpus passes: base A 09:55 to 10:43, the edit 10:54 to 12:08, base B 12:14 to 12:40 (`rung-rr32-sibling/REPORT.md` section 14). Each rewrite was 356K to 567K. The passes spanned 165 of the rung's 181 minutes.
- Rung V sat waiting on those passes for about 106 of its 181 minutes (the sum of the twelve gaps).
- Rung E wrote 4.68M. 3.35M came after six waits on its passes, about 47 minutes, and 0.61M after one on its ladder subset.
- So 8.83M of the run's 17.15M cache writes, about half, were the price of waiting on the corpus comparison. In the other batches that ran it the share was 7% (7R) to 45% (6b).
- The harness figure, 6.15M, does not show any of this. It counts each agent's last context, not the rewrites.

**Around the runs** (M2), over the session:
- 11 batch records drafted: 5.2M. 9 Fable reviews of them: 4.2M. 7 amendments and re-anchorings: 2.2M.
- 9 `FACTS.md` consolidations: 3.3M. 5 combined or conformance reviews: 2.8M. 5 routings of a review into the plan: 2.2M. 9 script changes: 2.6M. 4 landing-record workers: 1.0M.
- Total about 23.5M, 29% on top of the runs' 81M. For batch N it was 4.3M beside a 9.2M run; for 7C 2.2M beside 3.7M.

### 1.3 What it produces and commits

**The Fortress change.** Summing the characterization's per-batch figures from the eight-rung climb to 6.5b: about 12K lines of code and specification changed (1.2K of them generated Java in batch 4, 2.2K a respelling of `RangeInternals` in 7R). The revival's tests: 454 files, +7,955/−282 (characterization, tests section 2).

**Beside it**, by the same sums: about 7.6K record files and 740K lines, some 60 record lines for each line of code or specification. Per batch the ratio ran from 15 (batch 4) to 504 (6b). By kind:
- Whole build logs, most of them LaTeX, batches 5 to 6.5b: about 410K lines, more than half of every record line committed. No rule asked for them; the only word on record is "captured" (archaeology, item q), and they run against POSITIONS 2026-09-19, "no full logs committed".
- Per-file ladder outputs, hundreds per batch, most of them empty (6.5b: 344 files, 214 empty).
- Corpus comparison outputs (6b: 12 files, 5,026 lines, 38% of its record lines, none cited by any `.md`).
- The same 17-line checker table three to six times a batch; 35 copies of `run-subset.sh`; skeptic probes (batch N: 396 files, 232 cited by nothing); distance dumps; citation-check dumps; copies of tests (6.5b: 70, 45 of them byte-identical to landed tests).
- By basename about 4.1K of the 7.6K files are cited by no tracked `.md` (sum of the per-batch "uncited" counts). In 6.5b, 572 of 868.

**In the repository** (M3, archaeology section 3):
- 8,923 tracked files and 55 MB under `explorations/compile-ladder/`, 4,953 of them under `probes/`.
- `explorations/` holds 15,365 of the 21,270 tracked files, 72%.
- Packed, the ladder folder is small: its 6,347 distinct blobs are 64.5 MB raw and 8.0 MB compressed, because near-identical logs compress against each other. All of `explorations/` is about 82 MB of `main`'s roughly 289 MB of compressed objects.
- So the committed scratch costs little disk. Its cost is the work to make it, name it, check that it is tracked, cite it, re-anchor the citations when lines move, and read past it.

### 1.4 Whether the committed evidence does what it is for

The reasons on record (archaeology, sections 1 and 2):
- "The test-first discipline is made checkable by requiring the recorded failure" (`3cbcfffb6`).
- Citations in reports would dangle without the files (R2's skeptic, 09-18).
- "A report's claim cites the capture that proves it, so anyone can check it later" (the coordinator, 09-29 17:58).

What happened:
- A capture of the worker's own run proves less than the skeptic's own run of the test, and the skeptic already runs a home-1 test itself to see it pass (script check 9) but is only asked to "find that captured output" of the failure (check 3, `:1330`).
- In what I read, the one later use of committed evidence is the post-batch reviews' comparison of committed gate tables (6.5b's distance tie), and those tables stay.
- The one product of the corpus comparison meant for Pavol, the changed outputs in each rung's "What comes back to Pavol" list, did not reach him: the lists were not sent, for the fourth time running (`reviews/batch-6.5b-review.md`, Part 3).
- Pavol's own rule of 2026-09-17 already says what a commit holds: "the edit, the test, the FACTS line, the handover state line, and a note on the ledger row it closes" (`PLAN.md`, "The rule for every edit"). The practice drifted from it in the six steps the archaeology lists, none of them put to him.

## 2. What adds value and what does not

Each is judged by what it protects against what it costs (POSITIONS 2026-09-29, on rerunning the gate).

### 2.1 Stages

- **Rung worker.** Makes the Fortress change, test first, and writes the report. Every landed change came through it: keep. But about a third of its cache writes are waits on the corpus comparison (26.8M of 75.6M), and more on microGPT checks and ladder subsets. Strip those, and the scratch it is asked to commit.
- **Skeptic.** The best value per token on file. In 6.5b the skeptics caught 10 of 14 misses, including the batch record's two false claims about the compiled helpers (items 135 and 142). 11.4% of the spend. Keep. Make it the one who sees the new test fail on the base, by its own run.
- **Rung judge, repair round, second skeptic.** 12.9%. Needed when a refusal is about the change; wasted when it is about the record. E's first refusal in 6.5b carried both: seven wrong citations of 181 (`measures-6.5b.md`; item 134) beside sibling sites the rung had left (items 137 to 139). The chain took 112 minutes and 1.61M on the critical path. Keep it, but a skeptic refuses only for the change or the test; a citation off by a line is a correction.
- **Gather.** Lands the rungs and folds the record. 6.1% of new tokens and 12.7% of reads. Keep. It shrinks when it lands Fortress paths and reports only, with no per-file lists of captures and no tracked-path check.
- **Merged-diff review, with its judge, repair and second review.** 14.7% of all new tokens, 37% of batch N's. What it stopped on in the last four batches: owed tests (6.5's findings 2 to 5, 7C's row 492, N's rows 447 and 505, which Pavol let land: "we do not stop for petty reasons", POSITIONS 2026-09-29); the same red line the gate showed (6.5's `WitnessIdentityRungG`, 6.5b's `PASS` key); and one defect of the Fortress change, 7C's misstated sentence of the specification (row 490). Its waits for the gate's count table cost 4.4M over the batches (M1). Its conformance and routing work is done again by the post-batch review. Drop the in-batch loop; move its checks to the post-batch review (decision 3).
- **Gate.** 4.2%. It is Pavol's permanent check (POSITIONS 2026-09-17), and the ladder stage is the one golden-output comparison on the compiled path, the goal's path. Keep whole.
- **Commit.** 1.7%. Keep. One fix: the specification PDF is rebuilt and committed once per batch when the text changed. Batches 5, 6 and 7C each committed it twice, about 2 MB a time, and 6.5b changed the text and left the committed PDF stale (characterization).
- **Checker-count and distance stages.** They measure the distance to the switch-over, the goal's own progress measure (answer 11, POSITIONS 2026-09-26). Keep in the gate. A rung runs them only when its test is the stage (`testIsStage`). No copies of their tables in rung folders.
- **Combined post-batch review.** About 0.5M to 0.65M each, plus 0.3M to 0.6M for the worker that routes it (M2). In 6.5b it found eight things that escaped every check in the batch, among them the root cause of the red gate, one rung killing another's passes, and a settled decision put back to Pavol. Keep it, and give it the merged-diff review's checks. Its measuring scripts are copied into each review's folder and committed ("`batch-N-review/`'s scripts with the run changed"); make them one shared tool and commit only the review.

### 2.2 Artifacts

- **Rung reports, skeptic and judge reports, the batch's landing record.** Pavol: "Reports, okay. We need those" (18:25). Keep. But shorter: 300 to 500 lines with up to 181 `file:line` citations make refusals out of citation drift. Cite the Fortress tree only; quote results instead of citing scratch.
- **`record.md`.** Its text is folded into `FACTS.md`, the ledger and the handover. Landing it too is the same text twice (protocol principle 6). Leave it on the branch.
- **Landing records.** `RECORD.md` was edited in 7 of 8 commits of batch 7 and 9 of 11 of batch 6; the handover's one-line paragraph took 394 KB of churn for 10 KB of gain in the eight-rung climb. Replace with one landing report, written once (section 3.7).
- **Captures of the failing and passing runs.** Replaced by the skeptic's own runs and a few quoted lines (section 3.2).
- **Probe programs.** Scratch. The one home that committed them on purpose, home 3 (specification silent), becomes a test that pins today's behaviour, as rung H did for row 456, or a ledger row that quotes the output.
- **Build logs.** No value committed. The report says in one line what the build gave (pages, errors, undefined references).
- **Scripts and copies of tools.** The tools take a root argument (`LADDER_ROOT`); a rung runs them from `coordinator/tools/`, never a copy.
- **Machine lines, `df` captures, load averages for walk runs.** Interpreter performance is irrelevant to every decision (POSITIONS 2026-09-19). Record a machine line only for a timing that feeds a decision.
- **The output comparison.** Three passes per rung over the whole interpreter corpus. At least 27.2M of cache writes (M1); in 6.5b about two and a half hours of passes per rung (rung V: 47.5, 74.5 and 25.3 minutes) and four base passes on one base; a runner killed across worktrees and a timeout under load (6.5b review, finding 4; row 532). What it found, in the rung reports I read (flat tower, tabulate, exclusion remainder, result bounds, inference walk, ranges ZZ32, overflow natives, wrap operators, RR32 sibling, size range, and batch 4's walk overflow): the rung's own intended change; team tests that print a value and check nothing (`commonSuper` now prints `5.0`, `BadBounds` a type name, `Region` a coercion applied); a message that names two overloads in random order (row 430); citations that moved; timeouts from the box's load. Batch 4's eleven changes all went from exit 0 to exit 1 with the edit, so the gate would have caught them (`rung-walk-overflow/REPORT.md:11`). It found no defect the suite missed. It is not the team's practice, and it is not the "golden output where a value matters, applied per test" of `PLAN.md`'s testing techniques (archaeology, section 6). Drop it (decision 2).
- **The microGPT checks under walk per rung.** About 80 minutes each (`rung-rr32-sibling/REPORT.md` section 14), run by about ten rungs since batch 6, 5.0M of cache writes after waits (M1). They check the measuring-stick program still computes: worth running, once per batch on the landed tree, as the separate non-gating stage Pavol named on 2026-09-19.
- **The ladder subset "before" per rung.** The gate compares its 85 files every batch against the baseline's committed outputs, so for those the landed gate is the before (6.5b review, measure 6), and for the others the baseline's recorded outputs are. After only.

### 2.3 The tests

Against the team's corpus at `a874948ac` (characterization, the tests section):

- **Checks.** The revival's interpreter tests have a median of 12 checks against the team's 0, and 35% of the team's plain interpreter tests check nothing. A long table over one feature is the team's own shape too: 26 of its tests have 20 or more checks, the largest 703. `PowChooseLcmRungE`'s 50 checks are a boundary table: `^`, `CHOOSE` and `LCM` on the four fixed widths, at the overflow bound, just inside it, and at the edges (`k<0`, `k>n`). That is what a spec rule for four widths needs. Keep the substance.
- **Names.** 220 of 411 new files carry `Rung<X>`, and the letter is reused: `RungB` names five different tests from four dates. The team names by topic. The suffix finds nothing `git log --diff-filter=A` does not. The path suffixes `Walk`, `Compiled`, `Checker` and `Link` say what a test exercises; keep those.
- **Provenance.** 207 of 223 new programs open with a line pointing at an `explorations/` record, and 73% of assertion messages cite a ledger row, a `.tex` line, POSITIONS or FACTS (the team: 0). 582 of the 663 test lines edited after landing only renumbered a `.tex` citation; four specification commits rewrote 106 to 161 test lines each. The protocol puts provenance "in commit messages and reports rather than source comments" (principle 1); the script's home-1 rule put it into the messages (`:1184`). And Pavol's plan to take the process record off `main` would leave all of those pointers pointing at nothing. Messages should say what is checked, in plain words.
- **XXX.** The team's XXX is a negative test: a program the language must reject, pinned by its exact diagnostic (222 of 224 compiler XXX files). The revival's is a known gap, a program that should pass and fails today: 58% of new interpreter tests, 44% of new compiler `.test` files. That is `lit`'s XFAIL, and it is Pavol's decision of 2026-09-19 (home 2). Two weak spots: an interpreter XXX test passes on any exception (`BaseTest.testFailed` returns null), so one broken for the wrong reason stays green; and a compiled run needs a link companion and a `REACHED` key (41 companions; three run tests were keyed on `PASS`, and one turned 6.5b's gate red). Prefer a key that names the failure where the harness allows one (`compile_err_contains`, `run_err_contains`), as the team pinned its diagnostics.
- **Against the goal.** The compiled XXX pairs are the switch-over's to-do list in executable form. That serves the goal directly.

Verdict: sound checks, grounded in the specification. Not a cargo cult in substance. The packaging (names, header lines, citation-laden messages) is the revival's, costs upkeep, and should go.

## 3. A proposed practice

### 3.1 What a batch commits, and where the rest goes

- **On `main`:** the Fortress change (library, interpreter, compiler, specification, tests); the reports (the rung's `REPORT.md`, the skeptic's and the judge's, the batch's landing record); the lines the batch adds to the ledger, `FACTS.md`, `PLAN.md` and the handover; the gate's tables. That is Pavol's position of 18:25 and 18:42, and his plan of 2026-09-17.
- **Scratch** (probe programs, captured outputs, build logs, copies of tools, lists, dumps) lives under the worktree's `tmp/<slug>/`, which `.gitignore:64` already ignores, so the Stop hook's reminder does not press on it (archaeology, item p). It is not committed on the `wip/` branch either. The branch still carries the test, the edit and the report as the container insurance of 2026-09-26.
- **After the landing,** the commit stage moves each worktree's `tmp/` to the session scratchpad before it removes the worktree. The coordinator deletes it once the post-batch review has landed.
- Reason: what a later reader needs is the change, the test and the report. Scratch is regenerable from the test, the commit and the command, and the transcripts hold every command and what the agent saw.
- Protects: `main` holds Fortress and findings; nothing to track, cite or re-anchor.
- Gives up: opening a capture by path after the post-batch review. The command in the report regenerates it.
- Cost: a few prompt lines; fewer steps for the worker, the skeptic and the gather.

### 3.2 Test first, kept and shown without scratch

- The worker writes the test, runs it through the harness on the unchanged code, sees it fail, and commits the test alone on its branch. Its report quotes the two to five lines that show the failure, with the command.
- The skeptic runs that test on the base itself and sees it fail, then on the edit and sees it pass. It says so in its verdict. A test it cannot see fail is refused.
- Later, anyone can check it from `main` alone: take the test from the landing commit and run it on that commit's parent.
- Reason: an independent run is stronger than a saved output of the worker's own run, and it leaves the permanent check Pavol asked for (POSITIONS 2026-09-17) with no files beside it.
- Cost: one harness run of a few minutes per rung for the skeptic, which check 9 already does for the passing half.

### 3.3 The output comparison

- Remove it. No record asks a rung for a corpus-wide comparison of outputs.
- A value that matters is asserted in the rung's own test, as Pavol said at 18:52 and as `PLAN.md`'s testing techniques already say ("golden output where a value matters … applied per test").
- When a decision needs to know how many programs a change reaches (row 379's question), the planner takes that count once, before the decision, as a probe (protocol principle 4, "a fork a probe can settle is probed before the batch is briefed").
- The reserved stop "an interpreter output a rung cannot account for" (POSITIONS 2026-09-27) goes with it. A test whose verdict changes is the gate's to see.
- The two microGPT checks run once per batch on the landed tree, beside the post-batch review, never in a rung. A failure is an item for the next batch.
- The ladder subset in a rung is run after the edit only.
- Protects: tokens (at least 27.2M over the batches, about half of 6.5b's), hours of each rung, and the box's load that caused row 532's timeout and the cross-worktree kill.
- Gives up: noticing a changed printed value in a test that checks nothing. That is fixed where Pavol said to fix it: in the test.

### 3.4 What the gate does

- As today: `compileAll`, `testFast`, `testSystem`, the four-thread `atomic` runs, the ladder regression over the 85 (phase and stdout), the checker count and the distance stage, each reported as now. Pavol's rules on a repair of tests only stand.
- The commit stage lands `summary.txt`, `checker-count.txt`, `distance.txt`, `ladder/` and `distance-sites.tsv` (POSITIONS 2026-09-28). No log.
- The commit stage rebuilds the specification PDF once, when the batch changed the specification, and commits it; the build log is not committed.

### 3.5 Which review loops stay

- **The skeptic, one per rung.** It refuses only for the change or the test: the change is wrong or does more than the test needs, the test does not test it or was not seen failing, a sibling defect has no home, a decision on record was not followed. A wrong citation, a line off or a wording is a required correction the gather or the worker's next commit fixes.
- **The judge,** only when the worker contests a refusal or a stop is met.
- **The gate,** the in-batch check of the merged tree.
- **The post-batch review** (POSITIONS 2026-09-28), with the merged-diff review's checks added: the conformance of the merged tree, the tie of each moved count row to a rung edit, the items for Pavol in `PLAN.md`, the stops met. It lands before the next batch launches, so its findings reach that batch (7C's review landed 8 minutes after batch 6.5 launched; 6.5's review, measure 2).
- **The in-batch merged-diff review, its judge, repair and second review: removed** (decision 3).
- Protects: 14.7% of all batch tokens, the 4.4M of its waits, and the tail it adds to the critical path (54 minutes in batch N).
- Gives up: a conformance defect of the merged tree, such as 7C's misstated sentence (row 490), can be pushed and repaired one batch later. The gate still stops a red tree. That is the trade Pavol accepted on 2026-09-29: "we are running reviews after the fact, so we will catch stuff".

### 3.6 How a worker's evidence reaches its skeptic and judge

- The skeptic, the repair round and the rung judge work in the rung's worktree (the script says so: "The worktree is … dirty on purpose"). They read `tmp/<slug>/` there, as they read the diff.
- The report says what each piece of scratch is and the command that made it.
- The merged-tree roles read the reports and, until the commit stage, the worktrees.
- The post-batch review reads the reports, the transcripts and the scratchpad copy.
- **A worker with a large context does not wait on a long run.** Long runs go to a script stage or a small agent. For the waits that remain (builds, test runs), `wait_for`'s default bound drops from 480 s to 270 s, so a poll stays inside the cache's five minutes and the next call reads the cache instead of writing it again. (The API prices a cache read at about a twelfth of a cache write.)

### 3.7 The landing report to Pavol

One message at landing, and the same text as the batch's `RECORD.md`, written once. Lists, numbers as K or M:
- Each rung in one line: what Fortress now does that it did not, by which rule or decision. Lines of code, specification and tests. Tests added, plain and XXX, and promoted.
- The gate: green, the suites' counts.
- What it bought toward the goal: the distance to the switch-over before and after, the checker count, the ladder's passes, ledger rows closed and opened, compiled-path defects newly gated.
- What it cost: the harness figure and the new tokens (output and cache writes), agents and hours, against the record's estimate; the share by stage family; and the number of waits over five minutes, the one signal of avoidable spend. A script computes this from the run's journal and transcripts (the characterization's parser), at no agent cost.
- What it committed: Fortress files and record files, as two numbers.
- Items for his word, each in one line with the rung's "What comes back to Pavol" list, or "none".

### 3.8 By arithmetic, on 6.5b's figures

Not a prediction; the figures are M1's.
- The corpus comparison's waits: 8.83M of the 17.15M cache writes.
- The in-batch review loop: review 1.36M, its judge 0.24M, its repair 0.19M, the second review 0.38M, about 2.2M.
- Together about 11.0M of 17.2M.
- Rung V waited on its passes for about 106 of its 181 minutes, rung E for about 47 of its 161.

## 4. The cleaning pass

### 4.1 Part A, now: take the committed scratch out of the tree

- **What goes:** under `explorations/compile-ladder/`, every file that is not in the keep list below. By the counts above, about 7K of the 8,923. The same for the post-batch reviews' script folders (`reviews/batch-*-review/`), whose review files stay.
- **What stays:**
  - the reports: `REPORT.md`, `SKEPTIC.md`, `JUDGE*.md`, `RECORD.md`, `REPAIR*.md`, `NOTE*.md`, decision records (206 files);
  - the gate's outputs, `climb-batch-*/gate/` and `gate-baseline/` (about 100 files);
  - the ladder baseline the gate reads, `baseline-2026-09-19/` (538 files);
  - every file the script, the gate or a tool reads or runs, some of which sit in rung folders (`repair-r1-atomic-static/run-subset.sh`, `climb-batch-N/merged-tests/junit.sh`, `rung-inference-walk/harness-one.sh`);
  - every file the live record cites: 817 files (703 of them not reports) and 50 directories cited by `FACTS.md`, the ledger, `PLAN.md`, `POSITIONS.md`, `INDEX.md`, the handover, `CLAUDE.md`, the protocol, the script and its manual (M3). That is the cited evidence, the ledger's home-3 probes among it.
  - Outside the ladder folder nothing is touched: the exploration era's probes are what Pavol asked to keep ("I want these experiments and learnings committed", 08-19; "the breadcrumbs of that process", 09-09).
- **How:** one Opus worker builds the keep list from those greps, removes the rest by explicit list (`git rm` by file, never a directory; `git diff --cached --stat` read), and adds one line to `compile-ladder/REPORT.md`: "Batch scratch removed at `<commit>` (post-mortem 2026-09-29); read a removed file with `git show <commit>^:<path>`." An index, not a copy (POSITIONS 2026-09-20). Then one gate run proves the keep list.
- **Cost:** about 1M tokens and an hour, plus a gate of about 40 minutes. No history rewrite, no force-push.
- **Gain:** about 7K files and most of 55 MB out of the checkout; nothing out of the packed history (8 MB). It is for readers and agents, and for Pavol's rule, not for disk.

### 4.2 Part B, later: Pavol's cleaner pass of 2026-09-20

His plan: `main` holds only the changes to Fortress, and the whole process record lives on its own branch (POSITIONS 2026-09-20; `PLAN.md`, housekeeping).
- **The shape that keeps every citation valid:** today's `main` becomes the record branch unchanged, so every hash the records cite stays true. A new `main` is rewritten from it without `explorations/` (`git filter-repo`), and the old-to-new commit map is kept on the record branch.
- **Before it:**
  - the gate's tools, the ladder baseline and `env.sh` move out of `explorations/`, or the new `main` cannot run its gate;
  - the test files' pointer lines and process citations go (decision 4);
  - `CLAUDE.md` and the boot learn to find the record in a worktree of the record branch.
- **Cost:** one or two Opus workers, 1M to 2M; a dry run on a clone; a force-push of `main` and the container branch, which needs his go and which the harness's classifier refused on 2026-09-20, so it may have to run on his machine; every clone re-clones.
- **Gain:** about 82 MB of `main`'s roughly 289 MB of compressed objects (M3), and a history of Fortress commits only. The four verbatim transcript files of 2026-09-20 leave `main`'s history with it.
- **When:** after one batch has run clean under the new rules.

### 4.3 What must be kept, whatever else is done

- Every file the live record cites, until that citation is rewritten to quote its lines.
- The gate's comparands and baselines.
- The reports.
- History itself: Part A removes nothing from it, and Part B moves it, whole, to the record branch.

## 5. The rules to change

Each quoted as it stands, then its replacement. Script lines at `021d84347`.

### Protocol (`explorations/protocol.md`)

1. Hard rules, lines 39-41: "A worker commits only the paths it wrote, as it goes, in one command (`git add -- <paths> && git commit -m … -- <paths>`), never a directory copy,"
   → "A worker commits only the paths it wrote, as it goes, in one command (`git add -- <paths> && git commit -m … -- <paths>`), never a directory copy and never its scratch: probe programs, captured outputs, build logs, lists and copies of tools stay under the worktree's `tmp/`, which is ignored,"
2. Hard rules, lines 47-48: "Every edit under the original tree is test first, the test seen failing before the fix, and is flagged at commit."
   → "Every edit under the original tree is test first: the worker sees the test fail through the harness before the fix, the skeptic sees it fail on the base and pass on the edit by its own runs, and the edit is flagged at commit. Nothing is committed to show it but the test and the report's quoted lines."
3. Principle 2, lines 73-75: "a timing names the machine it ran on (`nproc`, the CPU's model and MHz, the load at start, the JDK, `FORTRESS_THREADS`), and only a pair taken in one run measures a difference."
   → keep, and add: "A timing of the interpreter is not taken or recorded, since no decision rests on it (POSITIONS 2026-09-19)."
4. "What keeps going wrong", after "a rule is weighed by what it costs against what it protects.": add "Scratch committed as evidence, and long runs awaited by agents with large contexts, so that a batch paid more to record and to wait than to change Fortress (post-mortem 2026-09-29)."

### Script (`explorations/coordinator/climb-batch-workflow.js`)

5. `:1151`: "A capture you intend to commit is named .txt. Never .out and never .log: .gitignore:42,46 swallow both, which is how four probe captures cited by two ledger rows were nearly landed untracked."
   → "Your scratch (probe programs, captured outputs, build logs, lists, copies of tools) goes under tmp/SLUG/ in your worktree, which .gitignore:64 ignores. It is never committed, on your branch or anywhere. Your skeptic and your judge read it there. Keep any wait under five minutes: call wait_for with a bound of 270 s and call it again."
6. `:1184`, home 1: "The assert message string carries the citation - the ledger row number or the specification line - and nothing else does: no provenance comment in the source (see "What you write" below)."
   → "The assert message says what is checked and the expected answer in plain words (\"ZZ32 2^31 overflows\"). No line numbers, ledger rows or decisions in a test: they go in REPORT.md and the commit message."
7. `:1188`, home 3: "3. **Deferred, and the specification is silent** - a probe file with its captured output, named .txt, committed under probes/, and a ledger row that cites it. This is the only home that is not a gated test, …"
   → "3. **Deferred, and the specification is silent** - a plain gated test that pins today's behaviour, named for what it pins, and a ledger row naming the open question and the test; where no program can observe it, the ledger row alone, quoting the two to five output lines that show it and the command that printed them. The record says the silence is the reason."
8. `:1192`, register: "A test file carries at most ONE comment line, pointing at its REPORT.md - not a provenance essay (…)."
   → "A test file carries no pointer to a record. A comment, if any, says what the program checks, as the team's tests do."
9. `:1200`: "- probes/ - your probe programs and their captured outputs, every capture named .txt."
   → delete. After the list add: "Nothing else under explorations/: your scratch is under tmp/SLUG/."
10. `:1206-1215`, the section "## Every path you cite is tracked - check it before you report" with its loop and "Either commit it or say in your report why the citation stands without it."
   → "## What you cite\n\nCite the Fortress tree at file:line and your own REPORT.md. A result from your scratch is quoted in the report, two to five lines, with the command that produced it; never cite a file under tmp/."
11. `:1219`: "after the failing test is written and its failure captured; after the edit and the recorded pass;"
   → "after the failing test is written and seen failing, in a commit that holds the test alone, so that your skeptic can run it on the base; after the edit and the pass;"
12. `:1281`, step 3: "3. Run it and capture the failure output to a file BEFORE the edit exists, named .txt. A report with no recorded failure is refused by your skeptic."
   → "3. Run it through the harness BEFORE the edit exists and see it fail. Commit the test alone. Quote the failing lines, two to five, in REPORT.md with the command. A test your skeptic cannot see fail on the base is refused."
13. `:1285`, step 6: "6. Run the test again and capture the pass." → "6. Run the test again through the harness and see it pass."
14. `:1287`, step 8: "8. Run the ladder subset for the files your names were blocking, before and after. … copy both into explorations/compile-ladder/SLUG/, set LADDER_ROOT to a directory inside your worktree, …"
   → "8. Run the ladder subset for the files your names were blocking, after the edit only. The before is the last landed gate's ladder stage, or for a file the gate does not run, the baseline's recorded output (explorations/compile-ladder/baseline-2026-09-19/raw/); run a file on the base only when neither covers it or the tree changed under it, and say which. Run the driver where it is, with LADDER_ROOT under tmp/SLUG/; never copy it."
15. `:1330`, skeptic check 3: "3. The recorded failure. The worker was required to run the new test and capture its failure BEFORE the edit existed. Find that captured output. A rung whose report has no recorded failure is refused - this is not negotiable and it is the point of the whole discipline."
   → "3. The failure, seen by you. Check out the worker's test-only commit, or put the new test on the base alone, and run it through the harness: it must fail as the report quotes. Then run it on the edit: it must pass. A test you cannot see fail on the base is refused - this is not negotiable and it is the point of the whole discipline."
16. `:1337`, skeptic check 9: "home 3 (deferred, specification silent) must be a committed .txt capture and a ledger row," → "home 3 (deferred, specification silent) must be a test pinning today's behaviour, or a ledger row quoting the output where no program can observe it,"
17. Skeptic role, a new sentence after its checks: "Refuse only for the change or the test: the change is wrong or larger than its test needs, the test does not test it or was not seen failing, a sibling defect has no home, a decision on record was not followed. A citation off by a line, a wording, a missing cross-reference is a required correction, not a refusal."
18. `:894`: "and every list a rung hands Pavol is also a capture under probes/" → "and every list a rung hands Pavol is in REPORT.md's section for him"
19. `:1296`: "(a passage reported without choosing, an output the comparison does not account for)" → "(a passage reported without choosing, a test whose verdict changed other than the rung's own)"
20. `:1651`, gather step 6: "(REPORT.md, record.md, SKEPTIC.md, JUDGE.md if any, and each probe and capture named one by one)" → "(REPORT.md, SKEPTIC.md and JUDGE.md if any; record.md is folded, not landed; nothing else under the rung's folder)"
21. `:2654` to `:2806`, the stages `review`, `judge:review`, `repair:review` and `review2`: removed if decision 3 takes option 1. A red gate goes to `judge:gate` and `repair:gate` as before, and the commit waits only for the gate. Check 9 (count rows tied to rung edits), check 10 (stops met) and check 11 (items for Pavol) move to the post-batch review's brief.
22. `:2152`, commit step 1, add: "Before removing each worktree, move its tmp/ to the session scratchpad, under the batch's name. When the specification changed, rebuild Specification/fortress.pdf once and add it; commit no build log."

### Manual (`explorations/coordinator/climb-batch-workflow.md`)

23. Line 25: "a committed capture is `.txt`, never `.out` or `.log` (`.gitignore:42,46`, item h)" → "a worker's scratch goes under its worktree's `tmp/<slug>/` and is never committed (post-mortem 2026-09-29)".
24. Line 33: "3. **deferred, specification silent** → a probe with a committed `.txt` capture and a ledger row, the record saying the silence is the reason (item c)." → "3. **deferred, specification silent** → a test pinning today's behaviour and a ledger row; where no program can observe it, the ledger row alone, quoting the output (post-mortem 2026-09-29)."
25. Line 37: "The tracked-path check is here too: every `explorations/` path a record cites is `git ls-files --error-unmatch`'d before the rung reports (item g, gap 4)." → "A report cites the Fortress tree and quotes its results; the tracked-path check is gone with the captures (post-mortem 2026-09-29)."
26. Line 71: "Both run in one `parallel()` — the substitute the review recommended for the rejected rung chains, 14.7 minutes per batch off the serial tail." and the section after it → under option 1 of decision 3: "The gate runs alone. The conformance of the merged tree, the tie of moved count rows to rung edits, the stops met and the items for Pavol are the post-batch review's (POSITIONS 2026-09-28), which lands before the next batch launches; its findings are items for that batch."
27. Line 115: "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS 2026-09-26, rung D's stop)." → "No rung compares the corpus's outputs; the suite's verdicts are the check, and a value that matters is asserted in a test (post-mortem 2026-09-29)."
28. "Preparing a batch record", after line 21, add: "A record asks a rung for no corpus-wide output comparison, no ladder 'before', no microGPT check and no specification build log. It asks for a measurement only where a test or a decision needs it, names it once for the whole batch when two rungs share a base, and states the one new thing it is for (protocol principle 5). A count of the programs a change reaches, when a decision needs one, is the planner's probe, taken before the record is written."

### Plan (`explorations/coordinator/PLAN.md`)

29. "Testing techniques adopted", after "Not adopted: rewriting the harness on lit and FileCheck, inline diagnostic annotations. Cost without gain on the path." add: "Not adopted (post-mortem 2026-09-29): a corpus-wide comparison of outputs before and after a change. The suite is pass or fail; a value that matters is asserted in its test, and a count of the programs a change reaches is a probe taken once for a decision."
30. "The rule for every edit", "Then one commit: the edit, the test, the FACTS line, the handover state line, and a note on the ledger row it closes": the rule stands as written. Its batch line "Changed since: in a batch each rung lands as one commit composed at the gather from its branch's net change" gains: "and that net change is the edit, the test and the reports; the worker's scratch never enters the branch."
31. The batch 7b record's measurement sentences that ask for "the interpreter corpus … in three passes (base A, the edit, base B)", "The comparison. As rung F's …" and a ladder "before and after" are struck at its re-anchoring, with the planner's generator.

## 6. For Pavol

What I found.
- The biggest single cost is waiting. A worker that waits more than five minutes loses its cached memory. Its next step pays to write it all again, 350K to 650K each time. Nearly half of all the tokens written, and 70% of the rung workers', came right after such a wait.
- The longest waits are the three runs over the whole test corpus that each rung makes. In 6.5b they caused about 9M of the run's 17M new tokens. Over all batches, at least 27M.
- That comparison found no defect your tests missed, in the reports I read. It listed changes the rung meant to make, a message that prints in random order, moved citations, and timeouts from the box's load. Batch 4's eleven changed outputs were all tests that would have failed the gate anyway.
- More than half of all committed record lines are whole build logs, almost all of them LaTeX. Nobody decided that.
- The committed scratch takes little disk, about 8 MB packed. Its cost is the work around it, and a tree where 7 files in 10 are not Fortress.
- Planning, the record's Fable review, the consolidations and the review after landing add about 2M to 4M around each run, 23.5M in all.
- Your tests are sound checks. Their packaging is not the team's: rung letters in the names, a pointer to a report in the first line, and spec line numbers in almost every message. Most later edits to tests only renumbered those citations.
- Your rule of 2026-09-17 already says what a commit holds: the edit, the test, a FACTS line, a handover line, a ledger note. The practice drifted from it in six small steps nobody put to you.

The decisions, in the order they need taking. The first three come before batch 7b.

**1. What does a batch commit?**
- Option 1: the Fortress change and its tests; the reports (the rung's, the skeptic's, the judge's, the landing record); the lines it adds to the ledger, FACTS and the plan; and the gate's result tables. Nothing else is committed anywhere. Scratch stays in the worker's folder and is deleted after the review that follows the batch. Test first is shown by the skeptic: it runs the new test on the old code and sees it fail, then on the new code and sees it pass. The report quotes the few failing lines.
- Option 2: the same on main, but scratch is also kept on the worker's branch and tagged.
- Option 3: as now.
- I recommend option 1. It is your position of 18:25 and 18:42. The skeptic's own run proves more than a saved file. And anyone can re-check it later from main alone: take the test from the landing commit and run it on the commit before.

**2. The comparison of all test outputs, three runs per rung.**
- Option 1: drop it. A value that matters is asserted in the test. When a decision needs to know how many programs a change reaches, one probe counts them before the decision. The two microGPT checks under the interpreter run once per batch after it lands, not in each rung.
- Option 2: keep one comparison per batch on the merged code, against the last batch's.
- Option 3: redesign the suite so every interpreter test carries its expected output.
- I recommend option 1. In 6.5b it would have saved about half the new tokens, and one rung spent about 106 of its 181 minutes waiting on it. You give up seeing a printed value change in a test that checks nothing. Your rule already says where to fix that: in the test.

**3. The reviews inside a batch.**
- Today three reviews read each change: the skeptic for each rung, the review of the merged batch with its own judge, repair and second review, and the review after landing.
- Option 1: keep the skeptic, the gate and the review after landing. Drop the merged-batch review loop, and give its checks to the review after landing. That review finishes before the next batch starts, and what it finds goes into that batch.
- Option 2: keep the merged-batch review, but let it stop a batch only for a defect in the Fortress change.
- Option 3: as now.
- I recommend option 1. That loop took 15% of all batch tokens, and 37% of batch N's. In the last four batches it stopped mostly for owed tests, or on the same line the gate had already caught. Once it caught a real slip, a wrong sentence in the spec in 7C; under option 1 that is fixed one batch later. The gate still stops broken code, and a skeptic still checks each rung.

**4. The tests' names and messages.**
- Option 1: from now on, tests are named by topic as the team did, with no rung letter and no pointer line to a report. Messages say what is checked in plain words, with no spec line numbers or plan references. Then one checked commit renames and cleans the 220 existing files.
- Option 2: the new rule from now on only.
- Option 3: as now.
- I recommend option 1. "RungB" already names five different tests. Line numbers in messages make every spec edit touch dozens of tests. And your plan to take the process record off main would leave 207 test files pointing at files that are not there. The history of a test is in its commit message, where git finds it.

**5. The cleaning.**
- Option 1: now, one commit takes the committed scratch out of the tree, about 7K of the 8.9K files in the ladder folder. It keeps the reports, the gate's tables and baselines, the tools, and the 800 or so files the ledger, FACTS and the plan cite. History keeps everything, and one line says how to read a removed file. Your planned history split, with the process record on its own branch, comes later.
- Option 2: do the history split now.
- Option 3: remove nothing, only stop adding.
- I recommend option 1 now, about 1M tokens and an hour, and the split after one batch has run clean under the new rules. The split needs a force-push, which the harness refused before, and the gate's tools must first move out of the explorations folder.
