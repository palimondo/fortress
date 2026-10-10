<!-- The climb batch workflow redesigned, 2026-10-08: the synthesis of the six batch-10 designs and of the
     measurements of where the batches' tokens went, written at the curator's order of the work after batch 10
     (POSITIONS, "The order of the work after batch 10."), for the coordinating session and then a Fable
     reviewer in the curator's place. Built into coordinator/climb-batch-workflow.js and its manual, with climb
     batch 11's manifest (CLIMB-BATCH-11.md, section 5; compile-ladder/plan-11/manifest/). Nothing was launched,
     built or run as a suite to write it. -->

# The climb batch workflow, redesigned for batch 11

## For the curator

- The skeptic fixes what it finds, as you recalled it: a correction, a missing test, a sibling site, a wrong line of the change. It builds and tests only its own fix. A judge runs only on a fix the skeptic marks contested, on a rung it cannot fix, or on a worker's stop. The second skeptic goes.
- Each role's brief carries what that role does in this batch and points to the `fortress-repo` skill for how. A brief is a third to a ninth of batch 10's size.
- The gather numbers new ledger rows through `ledger.py` and folds each rung's entry into the skill's part on what the revival changed. A cold reader then reads the new entries as a newcomer would and fixes their wording.
- The gate runs the suites at four threads, adds `testSpecData` with rung W, and writes the machine it ran on into its summary. The commit stage runs the quick microGPT walk check and waits for it; it holds nothing.
- Batch 11 should write about 5.2M tokens against batch 10's 6.26M, from 4.3M if no fix is contested to 6.3M if three are. A red gate adds about 0.5M to either.
- Section 9 lists every choice taken here that you or the Fable reviewer should check.

## 1. Where batch 10's tokens went

Batch 10 wrote 6.26M tokens in 21 agents and 5 h 33 min, all on Opus (`design-pricing.md`; `tools/batch-measures.py` on run `wf_d5ec6194-bcc`):

- rung workers 2.13M (4 agents, 34%);
- first skeptics 1.19M (4, 19%);
- judges 0.62M (3, 10%);
- repair rounds 0.62M (3, 10%);
- second skeptics 0.51M (3, 8%);
- gather 0.49M, merged-diff review 0.43M, commit 0.15M, gate 0.13M.

The waste was in the checking chain, not in the work:

- **The refusal chains.** Three of four rungs were refused, and their judges, repairs and second skeptics wrote 1.75M, 28% of the batch (`checking-roles-cost.md`, answer 4). G's chain (0.49M) was one missing assertion, where a correction would have cost under 0.1M. Every judge ruled repair, and every second skeptic approved, finding nothing new but two citations (`checking-roles-cost.md`, section 1).
- **The briefs.** First calls were 1.47M, 23% of the batch. A judge's brief was 142K characters, 1.75 times a worker's, and two thirds of it was the worker's result and the skeptic's verdict, of which the judge used about 30% (`checking-roles-cost.md`, section 2). The 47.1K-character prefix that every brief shared bought no cache: across agents the prompt cache serves the system prompt and tools, and the first message only when the whole prompt is identical (FACTS, "The Workflow harness runs two agents at once on this box").
- **Not the waits, not the builds.** Batch 10 had no cache refill. Its workers made 10 builds and one library order, the gate one of each; one partial stage run (12 min) repeated work against a written rule (`design-pricing.md`, section 4).

Batches 8 and 9 show the same shape: refusal chains of 1.93M (25%) and 1.40M (20%), second skeptics of 0.70M and 0.40M (section 6).

## 2. The practice, stage by stage

### Before the launch

The coordinator lands the redesigned script, its manual and the manifest, after the skill's rewrite with its part on the revival's changes. The base is `main`'s head after both. It builds the one base build there, proves a seed and the old code from it, checks the briefings on the base, generates and splices the manifest block, and runs the scenario checker. The manual's "Before the launch" and the record's section 5 give the commands; section 8 below gives the order.

No launch value is set by hand. The first free ledger row is gone from the manifest: the gather numbers rows (below).

### The brief: the batch's what, the skill's how

Every brief opens with a head of about 4K characters: the batch's intro, a pointer to the `fortress-repo` skill, the batch table, the base build, the points to report, how to cite, and what to do after a compaction. The role's part follows. The cold reader alone gets no head, because it must read cold.

Each role's brief now carries only what that role needs. Brief sizes against batch 10's, from `workflow-scenarios.js --sizes` on run `wf_d5ec6194-bcc` (mean characters of the first message; the first call by the fit 41.7K + 0.425 tokens a character, `labor.md`):

- rung worker 28K against 81K (first call 54K against 76K);
- skeptic 41K against 120K (59K against 93K);
- judge 18K against 142K (49K against 102K);
- gather 35K against 108K; review 42K against 107K; gate 19K against 72K; commit 32K against 87K;
- cold reader 2K (new).

What left the briefs:

- the shared prefix's procedures, which the skill now holds: worktrees and the old code (`worktrees.md`), builds (`build-and-caches.md`), waits and stops (`session.md`), test first and the three homes of a defect (`tests-writing.md`), when to run a whole suite (`tests-running.md`), commits and pushes (`committing.md`), reports (`records.md`);
- the worker's report and record texts in the skeptic's, judge's and repair's briefs: the skeptic writes them onto the branch from the run's journal (`tools/journal-text.py`) and reads them there;
- every global map restore, the per-rung copy of the base, the one-thread pin, the stops (`pending-script-edit.md`, all applied).

What stayed: each rung's section of the record word for word, its briefing command with one reason per key at the end of the worker's brief, its points to report, and the checks sub-list for every checking role (POSITIONS, "The mission briefing.").

The briefings themselves are leaner. `lists11.py` holds what each rung's section cites: decisions, ledger rows, the specification's sections, notes and code. It holds no process position or harness fact, which the role text and the skill now carry. In batch 10 none of the 87 POSITIONS and FACTS keys the four workers were handed was named before a fix edit (`context-study.md`, section 5). Batch 11's briefings print W 39.6K, C 28.8K, E 30.1K and L 18.5K tokens, against batch 10's 53.0K, 42.5K, 27.9K and 56.6K.

Cost: about 0.4M fewer tokens written in first calls over the batch, and about 0.06M fewer in the workers' briefings. Loading the skill takes back about 0.2M (section 5).

### The rung worker

The order of work, 11 steps: seed the worktree; read the briefing; the test first, as `tests-writing.md`, "The order", says; where the fix belongs, with every way listed; the edit and the build it needs; whole suites only as `tests-running.md` says, once per code state; the count and distance stages where the section asks and the edit can move them; the three homes of every defect measured; competing declarations; the change's own ladder subset; the specification's text in the S1 form, and every sentence the change makes false listed.

Changes from batch 10:

- **No separate test commit.** The test and the fix may share a commit; the order is read in the transcript (POSITIONS, "Test first, the test kept."; the curator's yes of 2026-10-04 in `pending-script-edit.md`).
- **New rows by placeholder.** A worker writes each new row in its `record.md` in `ledger.py`'s row template, numbered `NEW-W-1`, `NEW-W-2`, and cites it so in tests and reports. It never runs `ledger.py add` or `note`. This answers the open question D7 of `gap-ledger-archaeology.md`: `ledger.py add` numbers max + 1, so two branches that each add a row would collide.
- **The revival-change entry.** `record.md` carries the rung's entry for `references/revival-changes.md` in that part's form, or the line "Revival change: none" with the reason (POSITIONS, "The delta from the original Fortress is a part of the skill, kept current.").
- **Points to report, not stops.** A rung that reaches a point to report finishes, lists it with its evidence, and lands. Only a step that cannot be undone or acts against a decision on record holds the push; the worker does not take it and reports it as a decision not taken (POSITIONS, "Reversible stops do not hold a batch."; "Which decisions taken inside the work reach Pavol, and how.").
- **Decisions with their ways.** `decisions` lists each choice with the ways not taken. The skeptic weighs its fixes against them, and a fix that overturns one is contested (below).

Cost: about the same as batch 10's workers, about 2.1M (section 5).

### The skeptic that fixes what it finds

The curator's direction, relayed on 2026-10-08: "I recall just allowing Skeptic to fix the things that it discovers and then a judge just rules on that fix or something like that." The first Opus design came closest: a repair per refusal, with no second checker and no judge, for 0.62M where batch 10's chains cost 1.75M (`design-pricing.md`, sections 3.2 and 4). That design spent a separate repair agent, with its own start and orientation, on every finding. Here the skeptic, already oriented, makes the fix itself.

The skeptic first writes the worker's `REPORT.md` and `record.md` onto the branch from the journal, if the branch lacks them. It reads the briefing's checks slice and the worker's transcript, and runs 11 checks, unchanged in substance from batch 10's. Then, for each finding:

- **A correction** (a sentence of the report or record, a citation, a provenance line, a FACTS entry, a missing assertion of a value the rung's test already reaches, a home-2 or home-3 test, a ledger row by placeholder, a sentence of the specification the change makes false): it makes it and commits it.
- **A defect of the change** (wrong, incomplete, a sibling site the repair owes, a crash where the text gives an error, a test not seen failing first): it fixes it test first, the program that measured it made a gated test or an assertion and seen failing on the worker's head before the edit; the fix where it belongs and in the library's way; built once; the test seen passing; the whole suite the fix reaches run once after its last fix when it changed the checker's, walk's or a shared phase's Java or Scala. Each fix is one commit, titled "Skeptic's fix:", pushed.
- **Settled or contested.** A fix is settled when the rung's section, the specification or a decision on record says what it makes the code do is right; the skeptic cites that sentence. A fix is contested when the worker's report argues for the behaviour it changes, or nothing on record settles it and the skeptic chose among ways, or it touches a path the section does not give the rung or reaches a point to report. A contested fix is still made, in its own commit, and listed with both arguments.
- **A refusal**, only when the rung cannot be fixed here: its approach is wrong; the fix needs a path no rung may touch or a decision of the curator; or it is larger than a repair round.

The verdict is `approved` (no fix contested), `contested`, or `refused`.

Batch 10's three refusals under this rule, by their causes (`checking-roles-cost.md`, section 4):

- G, one missing assertion: a correction, settled by the rung's own section. No judge. About 30K for the skeptic in place of a 0.49M chain.
- C, a premise of the record the worker guarded only in part: a defect of the change. The worker's report argued for its guard, so the fix is contested and a judge rules on it alone.
- N, a wrong change its worker had half seen: contested, or a refusal if the approach is wrong.

The skeptic builds nothing to check, as before: it reads test first in the worker's transcript, runs its own programs with the rung's build and the old code from the base build, and leaves the worker's suite runs and stages as they are. Its own fix is a new code state, built and tested once. This keeps POSITIONS, "Nothing is built or run twice on the same code.", whose wording says the skeptic "builds nothing"; that sentence needs the coordinator's edit (section 8).

Cost: batch 10's skeptics wrote 298K each. The brief is 33K tokens shorter, of which the worker's report, about 15K, is now read from the file; the skill's parts add about 15K; net about the same. The fixes add about 0.25M over the batch on batch 10's findings: W's six corrections about 25K, G's assertion about 30K, C's guard about 90K, N's change about 100K. These are a repair round's own work without its start and orientation (batch 10's repairs wrote 205K each, 68K of it the first call). Skeptics: about 1.44M.

### No second skeptic

The second skeptic goes. In batch 10 the three wrote 0.51M and found two citations (`checking-roles-cost.md`, section 1). A fix the skeptic makes is checked by its own test, seen failing then passing; by the merged-diff review, which reads every commit made after the worker's and the transcript of the agent that made it; and by the gate on the merged tree. A repair round after a judge's ruling is checked the same way. Second skeptics were already narrowed to the repair in batches 9 and 10 (0.20M, then 0.17M each), and what they still caught is what the review's check 2 now reads.

### The judge, only on a contested fix, a refusal or a stop

A judge runs on a rung only when its skeptic marked a fix contested, refused the rung, or when the worker stopped. On a contested fix it rules on the listed fixes and nothing else, by citation: it upholds each one or reverts it itself (`git revert --no-edit`, which takes the fix's test with it). Its decision is `stands`, `repair` (neither way right: numbered instructions for one round), `drop`, or `stop` (a fork the record reserves for the curator). On a refusal it decides the same four ways. It builds and tests nothing.

Its brief carries the question, the contested fixes with both arguments, the worker's decisions, and pointers: the checks slice, each fix's `git show`, the sections of `REPORT.md` and `SKEPTIC.md` it needs. Batch 10's judges carried the whole worker result and skeptic verdict and used about 30% (`checking-roles-cost.md`, section 2).

A first ruling runs on Opus, a second on the same rung or tree on Fable (`judgeTier`; POSITIONS, "The judge's rulings."; "The Fable rule.").

Cost: batch 10's judges wrote 208K each. With a brief 53K tokens shorter and a narrower question, about 160K. One or two rulings are expected: about 0.28M against 0.62M.

### One repair round, on the judge's word

A repair round runs only when a judge rules repair. It is the rung worker again, with the checks slice, the judge's instructions and the rung's section. No second skeptic follows; its test first, the review and the gate check it. A repair that does not land drops the rung. A second repair round is not taken (POSITIONS, "The judge's rulings.").

Cost: at most one is expected, about 0.15M against 0.62M.

### The gather

The gather applies the approved rungs' net diffs to `main` in ascending order of their lowest edited line in shared files, one commit per rung, as before. What changed:

- It writes a missing `REPORT.md` or `record.md` from the journal, and for a repaired rung always rewrites them from the repair round's texts.
- It adds each new row with `ledger.py add FILE --section TITLE`, in apply order, and replaces each `NEW-<rung>-<n>` placeholder with the number everywhere the rung's files and tests cite it, before that rung's commit. Notes go through `ledger.py note`. After the rungs, it closes each fixed row with `ledger.py close N --commit HASH --test NAME` and runs `ledger.py check` (POSITIONS, "The gap ledger's form."; `pending-script-edit.md`, "The ledger's new form").
- It folds each rung's revival-change entry into `references/revival-changes.md`, in the part's form, with a line in `sources.md` where the part has a section there. If the part is not in the tree, it folds nothing and the entries go to the coordinator as `delta-unfolded`.
- It writes the batch's `RECORD.md` once, last, with each skeptic's fixes and the contested rulings by commit.

Cost: brief 31K tokens shorter; `ledger.py`, the placeholders and the fold add about 20K. About 0.48M against 0.49M.

### What the merged-diff review checks now

The review stays once, beside the gate, as the check of the merged tree's records, the points to report and the routing before the push (POSITIONS, "A blocking second review does not hold a green batch."). The first Fable design dropped it; that position wins. Its six checks:

1. No two rungs change one declaration, or depend on each other for meaning or test; what their changes do together.
2. Each skeptic's fix and each repair commit, as the gather applied it: it does what its finding says and only that; a defect fix's test seen failing on the worker's head and then passing, in its maker's transcript; a settled fix's citation; a reverted fix gone. This is the check the second skeptic made.
3. The folded record: FACTS lines true and sourced; `ledger.py check` passes; no `NEW-` placeholder left anywhere; every closed row fixed by a landed commit; the handover consistent; the revival-change entries true of the code as landed.
4. Each sentence of the specification a rung listed as made false: corrected.
5. The points to report, each with `holdsPush`.
6. The items for the curator: each in `PLAN.md` under one of its two sections.

Blocking code findings go to a judge and one repair, as before; tests-only findings are routed to the next batch; a review that still blocks after its repair does not hold a green batch.

Cost: brief 27K tokens shorter; check 2's transcript reads add about 30K. About 0.43M.

### The gate

As batch 10's, with three changes:

- The suites run at four threads, pinned in `build.xml` (POSITIONS, "The suites run Fortress in parallel."). The atomic runs cover 14 programs, 42 lines.
- `ant testSpecData` runs after the suites once an approved rung brings it into the gate (rung W, `gateJoins`), and from then on whenever the last landed summary has a `specdata/` row. Every example must pass (POSITIONS, "The specification's examples join the gate at zero red."). If W does not land, the gate runs it only when the summary already has the row.
- `summary.txt` ends with the machine it ran on, `# machine ` lines from `rung-flat-tower/machine.sh`, so timings across batches are read against their machine. `gate_compare` skips `#` lines.

A gate reruns after a repair only for a path it reads (POSITIONS, "A tests-only repair does not rerun the gate."). Cost: about 0.11M.

### The cold read of new skill text

Wherever a batch writes skill text, it is read cold. In batch 11 that is the gather's fold into `references/revival-changes.md`. After the review, when the gather folded at least one entry, a cold reader runs beside the gate's tail. It gets no head and no report: it reads `SKILL.md` and the part as a newcomer would, and judges only the entries since the base (`git diff BASE HEAD -- <part>`). It flags each passage that would send such a reader wrong or make it search. It fixes in place a flag whose fix changes no claim: wording, a term defined, a reference made exact. It returns a flag whose fix would change a claim to the coordinator, unfixed. Its commit names its one path, since the gate runs beside it. The script waits for it before any repair on the merged tree or the commit works in the main tree. The practice is the skill rewrite's cold reads (`explorations/reviews/skills-cold-read-architecture.md`; POSITIONS, "The skills are written for a reader new to the repository, and checked against what the workers did.").

Cost: about 0.08M when it runs.

### The commit

- Step 0 starts the quick microGPT walk check in the background on the landed tree, unless an earlier attempt started it (`mg-run.sh`, the quick pair, about a minute; POSITIONS, "The microGPT walk check is quick."). The stage waits for it and returns the verdict lines. Unless both programs print `ALL PASS`, the run's result lists `microgpt-walk.1` for the coordinator. It holds nothing. Batch 10's check never ran: the permission check refused `mg-run.sh`'s `rm -rf`, which the tool no longer has (`98ed1f5c1`).
- Then, as before: the gate's outputs and the per-site list copied in; the landed figures written into FACTS; the PDF built once if the specification changed; the beside-the-gate lines; the footers checked.
- The push goes to `main`, `claude/worker-brief-fable-vnnuv8` and `blinded-fable` (the protocol's hard rules; `committing.md`).
- The push is held only by a point with `holdsPush` true, or a malformed one, from a worker, a skeptic, the review or a merged-tree repair. A reversible point is listed and holds nothing.
- The worktrees are removed with their `tmp/`, the old code's private caches folder among it. No `global.map` restore is needed, since the file is untracked.

Cost: about 0.13M.

### Stops and resumes

Unchanged: every agent goes through `callAgent`, up to three attempts, a usage-limit error stops the run with nothing decided, and a worker, skeptic or judge that returns nothing three times stops it (the manual's "An agent that comes back with nothing" and "A usage limit stops the run and decides nothing"). The new roles have their retry heads: a skeptic finds its fix commits and continues; a cold reader finds its commit or its uncommitted edits.

## 3. What was taken from the six designs, and what was not

From the priced designs (`design-pricing.md`):

- **First Opus** (5.16M): the checker that fixes in place instead of a second checker; one ruling only on a contested finding; a per-role measure of the run's cost (here `tools/batch-measures.py`, run by the post-batch review, not an agent of the run). Not taken: one checker for two library rungs (batch 11 has one library rung), and an integrator that polls the gate.
- **Blind Opus** (4.46M): briefs cut to what a role uses; no second check of a fix by a separate agent. Not taken: no judge at all, since the curator's direction keeps a judge on a contested fix; splitting a rung's work among implementers; a Sonnet finisher.
- **First Fable** (5.25M): a ruling only on disagreement. Not taken: dropping the merged-diff review, because the position keeps it ("A blocking second review does not hold a green batch."); a Sonnet gate and landing.
- **Blind Fable** (7.48M): not taken. Its 46 agents pay a start each, and its chain-end reader of the per-site list stays with the post-batch review.
- **Ultracode Opus and Fable** (31M, 37M): not taken. Agent count moves cost most, and splitting work repeats about a third of each task (`design-pricing.md`, section 4). Ultracode Opus's final "what done means" judge is the one check batch 10 lacked that it bought; here the review's checks 5 and 6 and the cold read cover the part of it that a batch can.

No Sonnet tier was adopted for a gate, commit or measure role. The designs priced 0.13M to 0.28M of Sonnet each. POSITIONS, "Which tier runs what.", names Sonnet for archaeology and pins workers to Opus; a mechanical role on Sonnet is a new kind of process choice, so it is put to the curator, not taken here (section 9).

## 4. Where a design or a direction met a position

- **"Nothing is built or run twice on the same code."** It says that the skeptic builds nothing, that the old code runs through a rung's private seeded copy of the base, and that the second skeptic checks only the repair. The skeptic now builds its own fix, once, as a new code state; it still builds nothing to check. The old code now runs from the base build with a private caches folder (`old-fortress.sh`). The second skeptic is gone. The position's purpose holds: no stage builds or runs a code state another has built or run. Its wording needs the coordinator's edit (section 8).
- **"The judge's rulings."** "A second repair round is not taken": kept. A judge now runs on fewer cases, which the position does not limit.
- **"Test first, the test kept."** The skeptic's fix keeps it: its test is seen failing on the worker's head before its edit.
- **"A blocking second review does not hold a green batch."** Kept: the review stays, once, beside the gate. The first Fable design's drop of it was not taken.
- **"Reversible stops do not hold a batch."** and **"Which decisions taken inside the work reach Pavol, and how."** Built as points to report: reversible ones are listed, and only a step that cannot be undone or acts against a decision on record holds the push.
- **"Which tier runs what."** and **"The Fable rule."** Workers and every first ruling on Opus; a second ruling on Fable; no Sonnet role (section 3).
- **"The mission briefing."** The briefing and its reasons stay whole for the worker, and the checks slice for every checking role.
- **"The coordinator watches what it launches."** No agent of the batch measures its own spend; the measures are read from the transcripts afterwards.

## 5. The cost of batch 11, against batch 10's 6.26M

Each role starts from batch 10's measured writes and changes only what this redesign changes. Batch 11 has four rungs like batch 10's: one walk rung, two checker rungs, one library rung, expected at 90 to 120 minutes each. Batch 10's measured 46 to 112.

- **Rung workers, 2.13M to 2.11M.** First call 22K shorter each by the fit; the briefing 16K shorter on average (above); the skill's parts read instead, `SKILL.md` (19K characters) and six to eight parts (55K to 65K), about 33K tokens at `facts-extract.sh`'s 0.41 a byte. Net −5K each.
- **Skeptics, 1.19M to 1.44M.** Brief net about −3K each (above); fixes about +0.25M on batch 10's findings.
- **Judges, 0.62M to 0.28M.** 1.75 rulings expected (C's and N's kind of finding), at about 160K each.
- **Repair rounds, 0.62M to 0.15M.** 0.75 expected, at batch 10's 205K.
- **Second skeptics, 0.51M to 0.**
- **Gather, 0.49M to 0.48M.** Brief −31K; `ledger.py`, placeholders and the fold +20K.
- **Review, 0.43M to 0.43M.** Brief −27K; the fixes read in their makers' transcripts +30K.
- **Gate, 0.13M to 0.11M.** Brief −22K; `testSpecData` +5K.
- **Commit, 0.15M to 0.13M.** Brief −23K; the microGPT check +5K.
- **Cold read, 0 to 0.08M.** One agent when the gather folds an entry: `SKILL.md` and the part, about 12K tokens of reading, its flags and fixes.

Total: about **5.2M**, 1.05M (17%) under batch 10, in about 16 agents against 21. The checking chain (skeptics, judges, repairs, second skeptics) goes from 2.94M to about 1.87M.

The range:

- **4.3M** if no fix is contested and no rung refused: no judge and no repair, small fixes, workers 10% below batch 10.
- **6.3M** if three rungs go to a judge and two to a repair, with workers 15% above batch 10.
- A red gate adds about 0.5M (a judge, a repair and a second gate) to either.

The estimate's weakest parts:

- The skeptics' fix costs are priced from batch 10's findings, not measured. The skeptics have never made a fix.
- The skill's load on each agent is priced from the parts' sizes, not from a run.
- Wall time should stay about 5 h: skeptics run longer, chains shorter. Not estimated further.

## 6. The measures

Batch 11's post-batch review reports these against batches 8 to 10, read from the transcripts by `tools/batch-measures.py RUN_DIR` (writes only: input plus cache creation, each message once by its id, as `labor.md` and `spend.py` count them):

- **Tokens written by role**: rung, resume, repair, skeptic, judge, skeptic2, gather, review, merged-tree judge and repair, gate, cold read, commit; and the first calls, with how many started cold.
- **Builds per worker**: shell segments that are `ant compileAll` or `ant clean`, and library order runs, per worker; and any by other roles. Batch 11 also counts the skeptics' fix builds.
- **Cache refills**: calls that write over 30K after 300 s or more since the agent's last call.
- **Refusal cycles**: per rung, the agents after its skeptic (judge, repair, resume, second skeptic) and what they wrote. For batch 11, also the skeptics' fix commits and how many were contested, from `RECORD.md`.

The comparands, from the tool on runs `wf_603242ca-111`, `wf_f747fd3e-9e4` and `wf_d5ec6194-bcc`:

- Batch 8: 7.72M, 21 agents. Rung 2.67M, skeptic 1.34M, judge 0.52M, second skeptic 0.70M, repair 0.72M, gather 0.53M, review 0.45M, merged judge and repair 0.41M, gate 0.24M (two runs), commit 0.16M. First calls 1.44M, 12 cold. Builds by workers 13 and 10 library orders; by others 14 and 6. No refill. Refusal cycles: 2 rungs, 1.93M (25%).
- Batch 9: 6.88M, 22 agents. Rung 2.69M, skeptic 1.24M, judge 0.45M, second skeptic 0.40M, repair 0.56M, gather 0.47M, review 0.42M, merged judge and repair 0.39M, gate 0.13M, commit 0.15M. First calls 1.40M, 12 cold. Builds by workers 13; by the gate 2 and 1. No refill. Refusal cycles: 2 rungs, 1.40M (20%).
- Batch 10: 6.26M, 21 agents. The roles in section 1. First calls 1.47M, 10 cold. Builds by workers 10 and 1; by others 1 and 2. No refill. Refusal cycles: 3 rungs, 1.75M (28%).

## 7. What the skill lacks that a role needs

Not edited here (the brief's rule); for the skill writer, in order of need:

1. **`gate.md`** does not name `testSpecData` as a gate step once a batch brings it, or the `# machine` lines of `summary.txt`. The script carries both for batch 11's gate; the part must say so after batch 11 lands. Then `tests-running.md`, "Outside the gate", must drop the five red examples.
2. **`records.md`, "The gap ledger"** does not say how parallel writers number a new row. The script tells workers and skeptics to use `NEW-<rung>-<n>` and the gather to number them; the rule belongs in the part, for any work run in parallel.
3. **`revival-changes.md`** shows its entry form (Original, Resolution, Reason, under a point of "Fortress as a language") only by example. A worker writing an entry into `record.md`, and the gather folding it, need it stated, with where its `sources.md` line goes. Since 2026-10-10 the gather folds no entry: the fold carried the coordinator's question handles and decision status into the part, so each rung's material now goes into the batch's `RECORD.md` and the skill writer writes the part after the landing (`reviews/skills-agenda-audit.md`).
4. **`tests-writing.md`, "The order"** speaks to the writer of a change. A checker who fixes on another's branch sees its test fail on that branch's head, not on the base; the script states this for the skeptic, and the part could say it in one line.
5. **`session.md`** gives `run_bg` and `wait_for`. It does not say how long a skeptic may wait on a whole suite run for its fix (`ant testQuick` takes several minutes). The 270 s rule covers it; no gap, noted for the reviewer.

## 8. What the coordinator does

Before the launch, in this order (the record's section 5, "Before the launch", has the commands):

1. Land the skill's rewrite with `references/revival-changes.md`, then this branch, `batch-redesign`, on `main`. Its commits touch no file the rewrite touches, apart from `INDEX.md`, where one line is added. The base is `main`'s head after both, by its full hash.
2. Build the base build in place, `/home/user/fortress-base11`; prove one seed and one `old-fortress.sh` run from it.
3. Run `lists11.py` on the base: every key matching one place.
4. Run `gen11.py` and `check11.js`, then `check11.js --write` if the block changed. Then run `workflow-scenarios.js` on the spliced script, with no `--skill` (the landed skill). Commit.
5. Check the disk and a clean main tree. Settle that the session's permission rules let the commit stage run `mg-run.sh`.
6. Arm the check-ins, 45 minutes apart (POSITIONS, "Check-ins and stops.").
7. Launch: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<full hash>', baseBuild: '/home/user/fortress-base11'}})`, the args kept byte for byte for a resume.

Owed outside the script, from `pending-script-edit.md`:

- **POSITIONS, "Nothing is built or run twice on the same code."** The old code runs from the base build with the rung's private caches folder (`old-fortress.sh`), not a private seeded copy. The skeptic builds nothing to check, and builds and tests its own fix once. The sentence on the second skeptic goes. The curator's direction above is its source.
- **POSITIONS, "The judge's rulings."** One clause: a judge rules on a rung only on a contested fix, a refusal or a stop.
- **`explorations/experiment/env.sh:6` and `tools/count-run/count-run.sh:23`** still export `FORTRESS_THREADS=1` for probes and stage runners. The suites are pinned in `build.xml` and unaffected; the stages run one thread by design. The coordinator decides whether the probes follow.
- **`junit.sh`'s clean step** finds no component for 52 of 609 `.test` files (a space after `tests=`, or the line continued).
- **`coordinator/map/README.md:128` and `map/modules-and-phases.md:217`** still say `compileAll` deletes the tracked `global.map`.
- **Protocol hard rule 4** already reads "the test written and seen failing through the harness before the fix" (`explorations/protocol.md:52`).

## 9. Decisions taken here to check

For the curator or the Fable reviewer:

1. **The contested rule.** A fix is contested when the worker argued for what it changes, when nothing on record settles it, or when it reaches beyond the rung's paths or a point to report. Too wide, and judges come back. Too narrow, and a fix the worker would dispute lands with only the review's reading.
2. **No second skeptic, and no check after a repair round but the review and the gate.** The review's check 2 reads every fix and repair commit in its maker's transcript. It is one agent reading four rungs' fixes, where three second skeptics each read one.
3. **The skeptic builds its fix and runs the whole suite that fix reaches.** That is a new code state per the skill's rule, but it puts builds in a role that had none. Batch 11's builds per skeptic will show what it costs.
4. **The skeptic commits the worker's report and record from the journal** before its checks, so the branch carries them for every later role.
5. **New rows numbered by the gather in apply order**, by placeholder; and the gather closes the fixed rows, on the rung's own passing run, before the gate.
6. **The gather folds the revival-change entries; the cold reader fixes wording only** and returns any change of claim to the coordinator. It runs after the review, beside the gate's tail, and every merged-tree repair waits for it.
7. **`codePathsOf` leaves out `.claude/`**, like `explorations/`: a change to the skill's text reruns no gate and needs no `historical:` line.
8. **`testSpecData` joins the gate with W only**; if W does not land, it runs only when a landed summary already has its row.
9. **The microGPT check is awaited in the commit stage and holds nothing**; anything but both programs passing is listed.
10. **Points to report replace stops.** `pointsReached` entries carry `holdsPush`; only a step that cannot be undone or acts against a decision on record holds the push; a malformed entry holds it too.
11. **Leaner briefings.** `lists11.py` leaves out process positions and harness facts, on the context study's reading that the workers named none of them before their fix edits. A decision that shaped a fix without being named would not show in that reading (`context-study.md`, section 5, its second reading). The rung sections' own citations are all kept.
12. **`forPavol` renamed `forCurator`**, in every schema and the script's result (POSITIONS, "The mission briefing.": neutral words).
13. **No Sonnet role.** Whether the gate, the commit or the measure should run on Sonnet is a new process choice for the curator, priced at 0.13M to 0.28M saved on the Opus pool.
14. **Agent types not used.** The roles run as the default workflow subagent with the head; a project agent type per role would need the session's process restarted to register it (the `coordinator` skill, `agents.md`). Deferred.
15. **The ledger sentence in the record** says rows are added in apply order, not manifest order (`CLIMB-BATCH-11.md`, section 5, "The ledger").

## 10. How it was checked, and what was not

Checked, with nothing launched and no build or suite run:

- The script parses under `node --check` and as the Workflow harness parses it, an async function body with its export made const. It holds no backtick outside the gate's `mg_phases` line, and no non-ASCII character.
- `check11.js`: batch 11's block, generated by `gen11.py` from the record, spliced in a scratch copy with every line outside it byte-identical. The block passes the script's own load checks. Each rung's section equals the record's section 3, and its briefing, reasons and checks equal `lists11.py`'s. 0 problems; then spliced with `--write`.
- `lists11.py` on `cd2393a08`: every key matched one place.
- `workflow-scenarios.js`: 48 checks, 0 problems. Every scenario of section 2's paths gives its expected agents in order and its landing: the skeptic's fix with no judge, a contested fix upheld and repaired, a refusal ruled to stand, repaired and dropped, a worker's stop, the cold read, `testSpecData` with and without W, a held and an unheld push, the microGPT check failing or unfinished, the merged tree's repairs, usage limits and resumes. Every brief renders without `undefined`, names no person outside `PLAN.md`'s heading, and carries the head and its role's commands. Every skill section the script cites by name is a heading of the skill, in this branch and in the main tree's rewrite.
- `--sizes` against batch 10's run, for section 2's brief sizes.
- `batch-measures.py` on batches 8, 9 and 10: their totals as recorded, and batch 10's roles and builds as `checking-roles-cost.md` and the batch-10 review have them.

Not measured:

- Any of it in a live run: an agent taking the new instructions, a skeptic making a fix, the contested rule in practice, the cold reader's flags.
- The skill's load on each role.
- The section-5 estimate beyond its inputs.

## 11. The Fable review

Reviewed in place on 2026-10-08, in the curator's stead (POSITIONS, "The order of the work after batch 10."), with nothing launched, built or run as a suite. Verdict: ready to launch.

- Section 9's decisions stand. Decisions 1 and 2 are a reading of the curator's words ("a judge just rules on that fix or something like that"), the narrowing to a contested fix supported by "Which decisions taken inside the work reach Pavol, and how." and "The new batch practice, and what he expects of it."; 3, 8, 10, 12 and 13 carry his decisions out; 4 to 7, 9, 11, 14 and 15 are engineering readings that no decision of his reverses, each listed for his review with its default.
- Fixed in the script and the manual: the worker and the skeptic are told to run the one suite `tests-running.md` names for their edit, where the briefs forbade `ant testSystem`, which that part names for a walk edit, and a brief holds over the skill; an assertion or test a skeptic adds as a correction is seen failing on the base's code through the old code tool, so that "Test first, the test kept." holds for it; no stage runs after a skeptic's fix, the gate's tables being the record; a repair round's structured result describes the whole rung, since the script keeps it in the worker's place; the review's placeholder grep leaves out the batch record and this note, which name the form as an example. The script's comment on the cold read cites the position and section 2, not words of the curator the record does not hold.
- Checked and found right: the 15 skill sections the script cites are headings in this branch's skill and in the main tree's rewrite; `lists11.py` on this tree, every key one place; `check11.js`, the tracked block equal to the generated one; the scenario checker, 48 checks, 0 problems; the script parsed as an async function body; the branch merges onto `main` at `6a4bd7178` with no conflict; every tool and file the briefs name exists, `testSpecData`'s JUnit file lands where the gate's summary reads it, `mg-run.sh` has no `rm -rf` and ends each log with `rc=`.
