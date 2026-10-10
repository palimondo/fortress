<!-- The manual of coordinator/climb-batch-workflow.js: what it does stage by stage and the reason for each rule
     in force. Rewritten 2026-10-08 for the redesign built from process-engineering/batch-redesign.md, which holds
     the evidence and the cost of each new choice; the manual before it, with the history of every rule since
     2026-09-19, is in git at cd2393a08. -->

# The batch workflow script, stage by stage

The script runs one batch of the compile-ladder climb. Everything a batch changes lies between its `MANIFEST` and `END MANIFEST` lines, which the batch's generator writes (`explorations/compile-ladder/plan-<N>/manifest/`). The rest of the script is the same for every batch. The practice it builds, and why, is `process-engineering/batch-redesign.md`.

In one paragraph: each rung's worker does its rung test first in its own seeded worktree. Its skeptic checks it and fixes what it finds, test first. A judge rules only on a fix the skeptic marks contested, on a rung it cannot fix, or on a worker's stop, and one repair round runs only on the judge's word. The gather lands the approved rungs on `main`. The merged-diff review and the gate run side by side. The commit stage lands the gate's tables, runs the quick microGPT walk check and pushes. The batch writes no skill text: the skill writer writes the skill from the batch's revival-change material after the landing, and a cold read follows ("After the landing: the coordinator's routing", step 4). Every agent runs on Opus but a judge's second ruling on the same rung or tree, which runs on Fable (POSITIONS, "The judge's rulings.").

## The manifest and the scatter

Per rung, the manifest gives:

- `id`, `slug`, `path` (its worktree), `branch` (`wip/<slug>`) and `title`;
- `blurb`, one line for the batch table every agent reads;
- `section`, the rung's section of the batch record word for word, which every role on the rung reads;
- `pointsToReport`, the kinds of change the curator reviews after the landing;
- `briefing`, the `facts-extract.sh` keys the worker reads first, with `reasons`, one line per key, rendered at the end of the worker's brief;
- `checks`, the sub-list of the briefing that the skeptic, a judge and a repair round read;
- `expectedMinutes`, which only orders the scatter;
- `writesState`, `testIsStage`, `gateJoins` (a gate step the rung brings, such as `testSpecData`), `expectedMoves` (ladder moves declared), and the optional `landsOnlyWith`, `expectedCheckerCount` and `expectedCheckerCrash`.

The script refuses at load a rung without its required fields, a key holding a double quote, backtick, dollar sign, backslash or newline (each is rendered in double quotes), a `checks` key not in the briefing, and `reasons` that are not one line per key.

The scatter starts the longest expected worker first. Two agents run at once on this box and a freed slot goes to the next queued agent (FACTS, "The Workflow harness runs two agents at once on this box"), so the longest-first order saves up to the shortest worker's time at the end. The gather keeps the manifest's order for its own reading and applies the rungs in its own order (below).

`landsOnlyWith` names the rungs a rung lands only with. After the scatter, a rung any of whose named rungs is not approved is withheld, repeated until nothing moves; it reaches the gather as not landed, and its expected moves and checker declarations stop counting at the gate. Batch 6's T, the number chapters, landed only with F, the flat library they describe.

## What a batch commits

A batch commits on a `wip/` branch what it commits on `main`, and nothing else. That is the Fortress change (source, library, specification text, tests) and its reports: `REPORT.md`, `SKEPTIC.md`, `JUDGE.md`, a decision record where the section asks for one, and the batch's `RECORD.md`. It also commits the ledger rows, the FACTS, PLAN and handover lines, each rung's revival-change material in the batch's `RECORD.md`, and a script that is reusable. It commits nothing under `.claude/`: only the skill writer edits the skills (`reviews/skills-agenda-audit.md`). No captured output, log, probe program or copy of a script is committed. An agent's scratch lives under its worktree's `tmp/`, which git ignores and which goes with the worktree. Whether a worker wrote its test first and saw it fail is read in its transcript, which the backup keeps (POSITIONS, "What a batch commits."; "Workers commit their own files as they go.").

## Preparing a batch record

An Opus planning worker drafts `CLIMB-BATCH-<n>.md`. A Fable reviewer edits it in place with one reason per change. The coordinator reads the diff and brings the record's questions to the curator one per message. The batch launches on the answers or on the standing go (POSITIONS, "The phase-3 batches run on a standing go.").

The planner builds each rung's briefing as in-context learning: the agents were not trained on Fortress, and the language was never finished (POSITIONS, "The mission briefing."). A briefing holds what the rung's section cites: the decisions and earlier rulings it rests on, its ledger rows, the specification's sections whole by their headings, the notes on the subject by section, and the library code that is the precedent. Process positions and harness facts stay out, because the brief's role text and the skill carry them. In batch 10 the workers named none of the 87 POSITIONS and FACTS keys before their fix edits (`process-engineering/context-study.md`, section 5). Each key goes through `facts-extract.sh --check` on the base, every key matching exactly one place. Each carries one line on why it is there. The planner marks the `checks` sub-list: the decisions and rows the checks need, and the sections and precedent code they compare against.

A rung that changes what an implementation does is briefed with the Appendix I Effects and the specification's notes that its change makes false, found by a grep while the record is prepared. Batch 9's record gave rung K none, and Appendix I's `comprises` Effect was that batch's one blocking finding (`reviews/batch-9-review.md`, finding 3).

A record asks a rung for no corpus-wide output comparison, no ladder before-run, no microGPT check and no specification build log (POSITIONS, "The suite's verdict is the check."; "No re-measuring what the record holds."). Whole suites are the skill's rule (`tests-running.md`, "When to run a whole suite"). A count of the programs a change reaches, when a decision needs one, is the planner's probe, taken before the record is written. A named one-time count of changed outputs is asked only where a decision of the curator's names it for that rung. The coordinator starts its base pass before the launch (`tools/count-run/count-run.sh`).

The record's section on how it is run gives the manifest's fields rung by rung, the intro every agent reads, and the launch steps. It holds no copy of the block: the batch's generator writes the block from the record.

## Before the launch

The coordinator, in this order:

1. The script, this manual and the batch's manifest generator on `main`. The base is `main`'s head after them, by its full hash, passed as `args.base`.
2. The batch's one base build, a worktree at the base outside the main tree, built once and then left alone. Every rung worktree is seeded from it, and the old code runs from it (POSITIONS, "Nothing is built or run twice on the same code."). About 200 s, as the skill's `worktrees.md`, "Finding or building a base build", gives it:

        git -C /home/user/fortress worktree add --detach /home/user/fortress-base<N> <base>
        cd /home/user/fortress-base<N>      # then set up the call as the skill's build-and-caches.md says
        ant compileAll                      # BUILD SUCCESSFUL
        # the library order (build-and-caches.md, "The library order"), then one walk run, which warms walk's caches:
        bin/fortress ProjectFortress/tests/BooleanOps.fss
        git status --porcelain              # empty: the seed refuses a base build that is not clean

   Its path goes to the launch as `args.baseBuild`. The script refuses to start without it (scenario B1).
3. One trial seed proves the base build, about 3 s: `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base<N> /home/user/fortress-seedcheck - <base>`, then `git -C /home/user/fortress worktree remove /home/user/fortress-seedcheck`. One `old-fortress.sh /home/user/fortress-base<N> /home/user/fortress-seedcheck-caches ProjectFortress/tests/BooleanOps.fss`, run from the main tree, proves the old code runs; its folder is removed after.
4. The briefings checked on the base (`python3 explorations/compile-ladder/plan-<N>/manifest/lists<N>.py`). The block generated (`gen<N>.py`), checked in a scratch copy and spliced (`check<N>.js`, then `check<N>.js --write`). Then `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, which also checks that every skill section the script cites by name is a heading of the skill. Then the commit.
5. `df -h /` against one seeded worktree per rung (about 206 MB each) and the base build. `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `tools/mg-run.sh`.
6. Check-ins armed for the run's length, 45 minutes apart (POSITIONS, "Check-ins and stops.").

The launch: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<full hash>', baseBuild: '/home/user/fortress-base<N>'}})`. The args are kept byte for byte, since a resume needs them. The base build stays until the coordinator removes it after the landing.

## The brief, which replaced the shared prefix

Until batch 10 every brief opened with one shared prefix of 47K characters, on the premise that the agents shared its cache. They did not: across agents the prompt cache serves the system prompt and tools, and the first message only when the whole prompt is identical (FACTS, "The Workflow harness runs two agents at once on this box").

Every brief now opens with a head of about 4K characters:

- the batch's intro;
- the pointer to the `fortress-repo` skill for how to work: set up a call, build, run the old code beside the new, write and run tests, wait, stop processes, commit and report;
- the batch table, one line per rung;
- the base build and how the old code runs from it;
- the points to report;
- how to cite: the tree at `file:line`, a FACTS or POSITIONS entry by its bold title, a result by two to five quoted lines and the command;
- what to do after a compaction: re-read the brief, the first message of the agent's own transcript, and the files it wrote; the coordinator's boot is not the agent's.

The role's own part follows. It says what the role does in this batch and where, and points to the skill's parts by name for the how. Where brief and skill differ, the brief says so and holds.

A long step a brief starts in the background (the rung's distance after, the gate's distance stage, the commit stage's microGPT walk check) is written in the literal form of the skill's `session.md`, "Long commands": `nohup bash -c '( COMMAND ) > LOG 2>&1; echo EXIT=$? >> LOG' >/dev/null 2>&1 &`, waited for with `wait_for`. No brief names `run_bg`: the session's automatic permission check refused it at all nine of its uses in climb batch 11, in eight agents, since it cannot read the command the function passes to `bash -c`, and the literal form passed (`reviews/batch-11-review.md`, section 3).

The worker reads its rung's whole briefing as its second step. The skeptic, a judge and a repair round read the `checks` sub-list. A repair on the merged tree reads the `checks` of the rungs its ruling names, and none where it names none.

A rung worker makes its own worktree: nobody makes one at the launch. The brief gives the one command, `seed-worktree.sh <base build> <worktree> <branch> <base>`. It reuses a worktree that exists and a branch already pushed, otherwise cuts the branch from the base, and seeds the build and caches in about 3 s. If it exits 2, the worker builds as `worktrees.md` says and reports it.

## Rung worker

The order of work: seed the worktree; read the briefing; the test first (`tests-writing.md`, "The order"); where the fix belongs, with every way listed; the edit and the build it needs; whole suites only as `tests-running.md` says; the count and distance stages where the section asks and the edit can move them; the three homes of every defect (`tests-writing.md`, "How a defect is recorded"); competing declarations; the change's own ladder subset (`gate.md`, "The ladder regression"); the specification's text in the S1 form, with every sentence the change makes false listed.

- The test and the fix may share a commit; the order is read in the transcript (POSITIONS, "Test first, the test kept.").
- A new ledger row goes in `record.md` in `ledger.py`'s row template, numbered `NEW-<rung>-<n>` and cited so in tests and reports. The worker never runs `ledger.py add` or `note`: `add` numbers a row max + 1, so two branches that each add a row would collide (`gap-ledger-archaeology.md`, D7). The gather numbers them.
- `record.md` carries the FACTS entry the rung earns, its ledger notes and new rows, the handover line, and a "Revival change" section, or "Revival change: none" with the reason. The section is material for the skill writer, not skill text, in two labelled parts: "The change", as evidence (the team's source and what it says or does, with `file:line`; what the tree now does, with its test; the reason, as a passage, a checker refusal or a measured failure), and "Provenance" (the question or item, the answer or default it follows, the batch). The worker is told: "Name no question, item, batch, rung or record file in the change, and give no decision's status there; provenance goes in its own part." (POSITIONS, "The delta from the original Fortress is a part of the skill, kept current."; `reviews/skills-agenda-audit.md`, "Proposed fix to the mechanism", item 2.)
- `REPORT.md` opens with five provenance lines: problem, spec, precedent, deviation, historical. The `historical:` line names every file of the 2012 tree the rung edits, for the commit message (the protocol's hard rule on the gate).
- The worker does not edit FACTS, the ledger, PLAN, POSITIONS, INDEX, the handover, the tools or `.claude/`: the gather folds `record.md` into them, since every rung would conflict there.
- It commits and pushes its own files on its branch as it goes, so a dead container loses nothing.
- Its result carries `reportText` and `recordText` word for word, since the harness often refuses a worker's write of those files; `decisions`, each with the ways not taken, which its skeptic weighs its fixes against; `pointsReached`; and `forCurator`, its questions for the curator.
- A point to report is listed with its evidence, and the rung lands. Only a step that cannot be undone or acts against a decision on record is not taken: the worker stops and says which (POSITIONS, "Reversible stops do not hold a batch.").

A rung that edits only prose has no test and no failure to see. Its text is checked against the tree and the decisions on record. A `testIsStage` rung's test is the checker count or distance stage, run once after its edit and rebuild, its before the last landed gate's table.

## Skeptic

The skeptic checks the rung and fixes what it finds, so that the rung lands right with no repair round after it (`process-engineering/batch-redesign.md`, "The skeptic that fixes what it finds").

First it writes the worker's `REPORT.md` and `record.md` onto the branch from the run's journal, where the branch lacks them (`tools/journal-text.py`), commits them alone, and reads them there. Its brief carries the worker's structured result without those texts. It reads the `checks` slice and lists the worker's transcript with two `jq` programs: one lists a transcript's edits, commits, builds and harness runs with their times and call ids, the other prints one call.

Its 11 checks:

1. the count and distance tables, or the paths that show neither stage could move;
2. test first, read in the transcript by time and call id;
3. the diff against the section, the specification and the decisions;
4. where the fix belongs, and the library's way;
5. the test and its citations;
6. its own programs on the old and new code, at one and four threads where the diff touches mutable state;
7. the three homes;
8. the ledger and the sibling sites;
9. the report, its provenance lines, the whole-suite run, the points to report, and `record.md` true as written;
10. competing declarations;
11. the failure-mode question.

It builds nothing to check. It runs its own programs with the rung's build and the old code from the base build (`worktrees.md`, "Running the old code"), and reads the worker's suite runs and stages in the transcript.

What it does with a finding:

- **A correction** it makes and commits. An assertion or a test it adds is seen failing on the base's code through the old code tool and passing on the head (`worktrees.md`, "Running the old code"): the fix is already in the tree, so the base is where it fails.
- **A defect of the change** it fixes test first: a gated test or assertion seen failing on the worker's head, the fix, one build, the test seen passing, and the whole suite the fix reaches once after its last fix. Each fix is a commit titled "Skeptic's fix:", pushed. No count or distance stage runs after a fix: the gate's tables on the merged tree are the record.
- **A settled fix** cites the sentence of the section, the specification or a decision on record that settles it.
- **A contested fix** is still made, in its own commit, and listed with the worker's argument and the skeptic's. A fix is contested when the worker's report argues for the behaviour it changes, when nothing on record settles it, or when it touches a path outside the rung's section that no cited sentence settles. A settled fix that reaches a point to report or a path outside the section is not contested for that: it lands, and the point or the path is listed for the curator (POSITIONS, "The judge's rulings.").
- **A refusal** comes only when the rung cannot be fixed here: the approach is wrong; the fix needs a path no rung may touch, or a decision of the curator; or it is larger than a repair round.

It writes `SKEPTIC.md` and commits it alone, last. Its verdict is `approved`, `contested` or `refused`. It returns `headJudged` (the worker's head), `headAfter`, its fixes and contested fixes, and `leftForGather`. Its `skepticText` is the word `committed` once `SKEPTIC.md` is committed, and the text only where the harness refused the write.

There is no second skeptic (`batch-redesign.md`, "No second skeptic"). The merged-diff review reads every fix and repair commit in its maker's transcript.

## Judge and repair round

A judge runs on a rung only on a contested fix, a refusal or a worker's stop, and on the merged tree only on a blocking review or a red gate. It builds and tests nothing. It writes `JUDGE.md` (on the rung's branch, or `JUDGE-<kind>.md` in the batch's folder) and commits it.

- On contested fixes it rules on each listed fix alone: uphold, or revert it itself with `git revert --no-edit`, which takes the fix's test with it. Its decision is `stands`, `repair` (numbered instructions for one round), `drop` or `stop`.
- On a refusal, the same four.
- On a stop, `repair` means the stop is not one: the worker resumes and its skeptic follows. Any other decision leaves the rung stopped.

Its brief carries its question, the contested fixes with both arguments, and the worker's decisions. It points to the checks slice, each fix's commit and the sections of `REPORT.md` and `SKEPTIC.md` it needs. In batch 10 a judge's brief carried the worker's whole result and the skeptic's verdict, two thirds of its 61K tokens, and the judge used about 30% of them (`process-engineering/checking-roles-cost.md`, section 2).

A first ruling on a rung or the merged tree runs on Opus; a second on the same one on Fable (`judgeTier`; POSITIONS, "The judge's rulings."; "The Fable rule.").

A repair round is the rung worker again, with the checks slice, the judge's decision and the rung's section. It carries out the instructions in order, test first, and updates `REPORT.md` and `record.md`, whose texts replace the worker's; its structured result replaces the worker's too, so it describes the whole rung as it now stands. No skeptic follows it: its own test, the review and the gate check it. A repair that does not land drops the rung. No second repair round is taken.

## Gather

The gather composes one local commit per approved rung on `main`; nothing is merged.

- **The order.** Ascending order of each rung's lowest edited line in the files two or more rungs share, so that a later hunk does not shift lines a landed record cites. Any `file:line` a record cites that an earlier hunk shifted is re-anchored by symbol. Tests cite the specification by section, never by line, so no test is re-anchored.
- **Each rung.** Its net diff is applied with `git apply --3way --index`. A conflict in unrelated regions is resolved by hand; one in the same logic is returned, not guessed. Its files are written from the journal where the branch lacks them, by the commands the brief renders per rung. For a repaired rung, `REPORT.md` and `record.md` are always rewritten from the repair round's texts.
- **The record folded.** The FACTS entry under its area. Ledger notes through `ledger.py note`. New rows through `ledger.py add FILE --section TITLE`, each `NEW-<rung>-<n>` placeholder replaced with its number everywhere the rung's files and tests cite it, before the rung's commit. The handover line. The rung's "Revival change" section is folded into no file: both its parts are copied, word for word, into the batch's `RECORD.md` (below), and nothing is written under `.claude/`. Through batch 13 the gather folded each entry into the skill's `revival-changes.md` as the rung wrote it, and the cold reader that followed made a question's handle findable instead of deleting it: that is how the coordinator's agenda reached the skill (`reviews/skills-agenda-audit.md`, "How it got there").
- **Corrections still owed.** The skeptic's `leftForGather` items. Each sentence of the specification a rung lists as made false and did not edit, corrected to what the code does, each clause checked against its code line. Batch 8's gather saw rung Q's Appendix I Effect false and let it stand, and in batch 9 no stage saw the one rung K made false. Each took a review judge and a repair, 0.53M and 0.39M (`reviews/batch-8-review.md`, section 5; `reviews/batch-9-review.md`, section 6).
- **Text mismatches.** A text mismatch the decisions do not settle is filed, not blocking ("Rules weighed by what they cost against what they protect", item 4).
- **Items for the curator.** The gather puts every item a rung, skeptic or judge returned into `PLAN.md`, under "Pavol's answers, in the order they are needed" when work waits on it, else under "Off the path, parked".
- **After the rungs.** One commit closes each row a landed rung fixed (`ledger.py close N --commit HASH --test NAME`, then `ledger.py check`). One commit writes the batch's `RECORD.md`, once, last: the order and why, each rung's commit, the rows opened and closed, each skeptic's fixes and the contested rulings by commit, the rungs that did not land, the points to report, where each item for the curator went, and last, under "Revival changes, for the skill writer", each landed rung's "Revival change" section, both parts word for word.

A rung that did not land has its `REPORT.md` and `SKEPTIC.md` taken out of its branch path by path, its findings folded under "Not landed", and its new rows added. None of its source is applied.

Files are staged by an explicit list and `git diff --cached --stat` is read before each commit. A commit touching a path outside `explorations/` and `.claude/` carries a `historical:` line.

## Review beside the gate

The review and the gate start together on the gather's commits. The review reads and never builds; the gate builds and never reads the record; the gate commits nothing, so the two never commit at once. Run side by side they took 14.7 minutes per batch off the serial tail. The review stays, once (POSITIONS, "A blocking second review does not hold a green batch."). Its six checks:

1. Overlaps between rungs, and what their changes do together.
2. Each skeptic's fix and each repair commit, as applied: it does what its finding says, its test seen failing on the worker's head and then passing in its maker's transcript, a settled fix's citation, a reverted fix gone.
3. The folded record: FACTS lines, `ledger.py check`, no `NEW-` placeholder left where a row is cited, every closed row fixed, the handover, the revival-change material in `RECORD.md` true of the landed code.
4. Each specification sentence a rung listed as made false, corrected.
5. The points to report, with `holdsPush`.
6. The items for the curator, in `PLAN.md`.

What it does with a finding:

- A record-only or mechanical defect it fixes itself, inside `explorations/`, in one commit.
- A finding settled by tests and records only it routes to the next batch, as `review-routed.N` in `PLAN.md`, with no judge.
- A finding whose repair touches source, library, checker, interpreter or specification goes to a judge, who rules `land`, `repair`, `drop` or `stop`. `land` is for a ruling settled by tests and records after all: its steps go to the next batch and no repair runs.

The review returns its heads before and after its corrections and every path outside `explorations/` they changed. A path the gate reads makes the gate beside it stale, and the gate runs again. Any other path is recorded beside the gate's summary.

A review that returns nothing after three attempts holds nothing: the batch lands on its gate, and `review-missing.1` is listed.

### A review that still blocks after its repair

There is one judge and one repair for the review, and no second review. When the review's repair returns nothing, stops or does not land, the code findings the judge upheld are listed as `review-unrepaired.N` for the next batch. They do not hold the push (POSITIONS, "A blocking second review does not hold a green batch."). A step that cannot be undone that the repair reports holds it, as a rung's does.

### A repair of tests and records only

After a repair on the merged tree, the review's or the gate's, the whole gate runs again only when the repair, or the review's corrections, changed a path the gate reads that is not a test file: under `ProjectFortress/` or `Library/`, or `build.xml` (POSITIONS, "A tests-only repair does not rerun the gate."). In batch 8 the gate ran a second time after a repair of one sentence of Appendix I, 24 minutes on the critical path, with tables identical but for timing (`reviews/batch-8-review.md`, section 4).

A test file is a `.fss`, `.fsi` or `.test` directly in `ProjectFortress/tests/` or a `ProjectFortress/*_tests/` directory.

- The repair returns its heads and changed paths. In `testRuns` it lists each test file it added or changed, run in the harness on the merged tree: the files of one corpus together in one JVM (`ONE_JVM=1 junit.sh`, and one `harness-one.sh` call for the interpreter tests).
- The gate runs again on a code path, a changed test no passing run exercises, a run that failed, or a repair that listed nothing.
- After the gate's repair it also runs again unless every red line is answered by a passing run (`failingAnswered`) and no suite count fell.
- When a red gate stood beside the review, and the review's repair of tests only answers its lines, no gate judge or gate repair runs.
- When the first gate's tables stand, the commit stage appends the runs to `summary.txt` as `# repair-tests` lines, and the paths no stage reads as `# repair-ungated` lines. `gate_compare` skips `#` lines.

`repairRerun` in the script decides.

## Gate

One run on the merged tree, its logs under `tmp/gate-batch-<N>/`, its three outputs written by fixed functions, never by hand. The functions of steps 5 and 7 (`gate_summary`, `gate_compare`, `last_landed_summary`, `ladder_filter`, `ladder_compare`, `mg_phases`) are in `tools/gate-functions.sh`, which the gate sources from the tree's root with `FORTRESS_HOME` set; until 2026-10-10 they were strings of the script (`reviews/skills-agenda-audit.md`, finding GA2). Its steps:

1. The disk.
2. `rm -rf ProjectFortress/TEST-RESULTS`, then `ant compileAll`, and at once the distance stage started in the background.
3. The library order if the build started the caches again, then two copies of the caches for the ladder.
4. `ant testFast`, then `ant testSystem`, never both at once, at four threads, pinned in `build.xml` (POSITIONS, "The suites run Fortress in parallel."). Then `ant testSpecData` once an approved rung brings it into the gate, or the last landed summary has a `specdata/` row; every example must pass (POSITIONS, "The specification's examples join the gate at zero red.").
5. `summary.txt` from `gate_summary`, one row per suite read from the plain-formatter files under `TEST-RESULTS/`, because the parallel tracks interleave their lines in the ant log. It ends with the `BUILD` and `Total time` lines and the machine it ran on (`# machine `, from `rung-flat-tower/machine.sh`), so that timings are read against their machine. `gate_compare` against the newest landed summary: a failure, an empty suite, a count that fell or a suite gone is red. The `system-<i>` shards are compared by their sum, since `testSystem` is one suite sharded by sorted index and a new file moves every later file along the shards; climb batch 2's gate went red on exactly that (`compile-ladder/climb-batch-2/JUDGE-gate.md`).
6. The four-thread atomic runs: 14 programs, three runs each, 42 lines. A FAIL, NO-PASS or compile failure is red; a timeout is re-run once.
7. The ladder regression (the skill's `gate.md`): the 85 files of the baseline's pass list compared on phase and output, the `Operation took` line masked, and the eighteen microGPT components compiled only. A DOWN, STDOUT or MISSING line is red unless a rung declared it.
8. The checker count, and 9. the distance, below.

A red gate goes to a judge, then one repair, then one more gate. A gate red after its repair stops the batch, nothing pushed.

### The checker count, and a rung whose test is that stage

The gate's step 8 runs the compiler's checker over the interpreter's library (`tools/checker-count/run.sh`, 20 s) and compares its total with the last landed one. It answers the library route: one library, the interpreter's, becomes the library the compiler checks (POSITIONS, "The library route."). The total is reported and never red (POSITIONS, "The checker count is measured, never red."). A fix can raise it, because the checker stops checking an api at its first errors, and two rungs' changes do not add. `checker_compare` is red only on a crash line no rung declared, a stale shadow (the instrumented copy no longer matching the tracked checker), or a table with no total. The overloading checker's memo is off in the stage, since it hides 27 to 35 errors depending on build order.

A `testIsStage` rung has that stage as its test: its before is the last landed table, run once after the edit and rebuild. No program can yet be compiled against the interpreter's library, so this is the one place a permanent stage stands in for a test file.

A rung whose every path lies under `explorations/`, `Specification/`, `Documentation/`, a test corpus, the test harness's sources, or walk's evaluator and natives runs neither stage. Both stages run only the compiler's phases (FACTS, "The checker-count and distance stages read only the compiler's phases ..."; `STAGE_BLIND`).

### The distance stage

The full measurement of the distance to the switch-over, reported and never red (POSITIONS, "The checker count is measured, never red."). `tools/distance/run.sh` runs every stage of the checker over the twelve prelude components in one JVM, under shadows made from the tracked sources at each run, with the compiled path's setting and the implicit bound `Any`. An edit that no longer matches stops the run, and `#shadow` says STALE. It starts beside the suites right after `compileAll` and is read last; `compare.sh` prints DISTANCE DOWN, UP or SAME and what moved, and always exits 0. The commit stage lands `distance.txt` and the per-site list, `explorations/compile-ladder/gate/distance-sites.tsv`, which the next batch's rungs read as their before.

## No skill text

The batch writes no skill text. Each rung's "Revival change" material goes into the batch's `RECORD.md`, under "Revival changes, for the skill writer". After the landing, the standing skill writer writes the skill from it, and a cold read of the changed parts follows ("After the landing: the coordinator's routing", step 4). One writer does the writing (POSITIONS, "The skills are written for a reader new to the repository ...").

Through batch 13 the gather folded each rung's entry into the skill's `revival-changes.md`, the review could correct it there, and a cold reader read it beside the gate's tail and made a handle findable instead of deleting it. That carried question handles, decision status and batch records into a part that workers load (`reviews/skills-agenda-audit.md`, "How it got there"). The batch's cold reader and its `coldread.N` and `delta-unfolded.N` items are gone with the fold.

The commit stage checks that nothing under `.claude/` changed since the base (step 2, below).

## Commit, and the push held

The commit stage:

0. Starts the quick microGPT walk check in the background, unless an earlier attempt started it (`tools/mg-run.sh`, the quick pair, about a minute; POSITIONS, "The microGPT walk check is quick."). It waits for the result before it returns. Unless both programs print `ALL PASS`, `microgpt-walk.1` is listed. It holds nothing.
1. Copies the gate's outputs into `compile-ladder/climb-batch-<N>/gate/` and the per-site list into place. It writes the landed figures into FACTS, numbers only: "The true distance to the switch-over" and "The checker-count stage's table". It builds the specification's PDF once if a landed commit changed `Specification/`.
   1a. Appends the repair runs and the paths no stage reads beside the summary, where the first gate's tables stand.
2. Checks every commit since the base: the skill's footer, no model identifier, and a `historical:` line where a commit touches the 2012 tree. Then it runs `git diff --name-only <base> HEAD -- .claude/`, which should print nothing. Each path it prints is listed as `skill-touched.N`, for the coordinator; it holds nothing.
3. Pushes `main` to `origin` and to `claude/worker-brief-fable-vnnuv8` and `blinded-fable`, retrying a failed push up to four times (the protocol's hard rules).
4. Removes each rung's worktree without `--force`, with its ignored `tmp/` and the old code's caches folder. It keeps one git refuses, and names it, since it holds uncommitted work.

The push is held when any landed rung's worker or skeptic, the review, or a merged-tree repair reports a point with `holdsPush` true, or a malformed one: a step that cannot be undone or acts against a decision on record. The stage then pushes nothing, keeps the worktrees, and writes a "Not pushed." paragraph into `RECORD.md`; the coordinator pushes once the curator lifts it. Batch 5's push went out past an unlifted stop because nothing held it (`compile-ladder/climb-batch-5/RECORD.md`). A rung that did not land holds nothing.

## Rules weighed by what they cost against what they protect

The curator's rule on gate reruns ends: "The same weighing of cost against what a rule protects applies to the other rules of the batch workflow." The rules in force from that weighing (batch N's review, `reviews/batch-N-review.md`, question 4):

1. **The review's judge may land and route.** A ruling whose every upheld finding is settled by tests and records only is `land`: no repair runs, and its steps go to the next batch. In batch N the repair and second review for two such findings held the batch 54 minutes after a green gate and cost about 1.0M.
2. *(The second review beside the commit: gone with the second review, 2026-09-29.)*
3. **The rungs' texts come from the run's journal**, by one `journal-text.py` command per file, never pasted into a brief. In batch N pasting them cost the gather 195K tokens of brief and 88K of copying. An agent after a compaction re-reads its own brief from its transcript.
4. **A text mismatch the decisions do not settle is filed, not blocking.** The text lands as the rung wrote it. The path that departs gets a ledger row and a gated `XXX` test asserting the text's rule, and the text's Appendix I entry names that row among its departures. The mismatch goes to the curator as `gather.N`. A mismatch the decisions settle is fixed on the side they settle.
5. **A rung does not run a stage its edit cannot move** (`STAGE_BLIND`, above). In batch N rung K, an interpreter-only edit, ran the checker count twice and read the landed total twice.
6. **A repair's new tests run together in one JVM**, one corpus at a time (`ONE_JVM=1 junit.sh`), since a test that passes alone can fail beside others. The next batch's gate runs them in the whole corpus.

## After the landing: the coordinator's routing

The coordinator's steps after a landing, in this order, each done whole:

1. The landing report to the curator.
2. The routing: every open row, record default and item for the curator filed with a batch or as a parked line of `PLAN.md`. Each is checked against POSITIONS and the notes `INDEX.md` lists before it is called open, put to the curator or briefed.
3. FACTS consolidated as its README says, superseded text moved to `FACTS-history.md`. The commit stage has already written the landed count and distance.
4. The skills, in three moves:
   - One task for the standing skill writer (`tools/skill-writer.sh`, its brief `skill-writer-brief.md`): the batch's revival-change material, the section "Revival changes, for the skill writer" of its `RECORD.md`; the skill sentences that the post-batch review lists as false; and any `skill-touched` item. The writer runs `tools/skills-lint.py` before each commit.
   - A cold read of the parts the writer changed, by an agent given only the skill and `skill-cold-read-brief.md`.
   - The writer fixes the cold read's flags, and the coordinator pushes its commits.
5. The next batch launched only after that, so that its workers read the updated skill (POSITIONS, "The delta from the original Fortress is a part of the skill, kept current.").
6. The combined post-batch review, started at the landing, since step 4 takes its list of false skill sentences (POSITIONS, "One review after every batch.").

The review explains every new or risen row of the checker count by a named rung edit. It reads the microGPT walk check's result. It reports the batch's measures against the batches before it with `tools/batch-measures.py` on the run's directory (`batch-redesign.md`, "The measures").

## An agent that comes back with nothing

Every `agent()` call goes through `callAgent`. A null result, an undefined one and a thrown error are treated alike, and the role runs up to two more times. A retry's prompt opens with a head saying an earlier attempt ended without its result, and listing what it may have left and how to continue from it:

- the branch's log and status, `tmp/`, a background step still running;
- for the gather, the merged-tree repairs, the gate and the commit: do not apply a patch or run a finished step twice;
- for a skeptic: its fix commits since the worker's head, and `SKEPTIC.md` if written.

Each retry's label carries its attempt number, so it gets its own journal key. In batch 6 the API's safety filter blocked a second skeptic's next message after it had returned its verdict, and the old script dropped the rung (FACTS, "`agent()` in a Workflow returns null for an agent the harness marks failed ...").

### A usage limit stops the run and decides nothing

The run stops, and decides nothing, in two cases:

- `agent()` throws an error that names a usage or rate limit (`LIMIT_ERROR`); the role is not run again.
- A rung worker, a skeptic or a judge returns nothing after its three attempts.

Once stopped, `callAgent` throws at the head of every attempt without starting an agent. No rung is marked dropped, withheld or not landed, and the gather does not start. The error says how to resume: `resumeFromRunId` with the same script and args, once the cause is gone. The finished agents come back from the journal.

In batch 7b the weekly limit returned null for every agent, and the old script read each null skeptic as a refusal and each null judge as a drop (`reviews/batch-7b-review.md`, finding 1).

The gather, the review, the gate, the commit and a merged-tree repair that return nothing, with no limit thrown, keep their own paths:

- the gather unresolved;
- `review-missing.1`;
- the gate run once more;
- `review-unrepaired.1`.

## How the script is checked

Nothing is launched to check it.

- `node explorations/coordinator/tools/workflow-scenarios.js [SCRIPT] [--sizes RUN_DIR] [--dump DIR] [--skill SKILL_DIR]` runs the script as the Workflow harness runs it, its text with `export const meta` made `const meta` as an async function body (FACTS, "`node --check` does not check the batch script as the Workflow harness parses it ..."), with its globals stubbed. It runs once per scenario and compares the agents called, in order, and the result with what the scenario expects. It also checks every brief: no `undefined`, the head and the skill named, no `run_bg`, no person named outside `PLAN.md`'s heading, each role's own commands. And it checks that every section the script cites by name is a heading of its file.
- `--sizes` compares the briefs with a real run's first messages.
- `--dump` writes every brief for reading.
- `--skill` checks the citations against another skill tree, such as one not landed yet.
- The batch's `check<N>.js` checks the manifest block in a scratch copy and splices it.
