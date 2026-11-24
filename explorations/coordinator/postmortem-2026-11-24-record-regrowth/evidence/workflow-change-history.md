<!-- The change history of the clarity workflow and the record-landing workflow after each one's first good run: every commit, its reason, who asked, whether the curator was told, each run's length, and what could not be found; from git, the coordinating session's transcripts and the workflow journals, with no judgement. -->

# The change history of the two record tools

Times are UTC. The curator reads local time, which is UTC plus one hour. Git commit times in this file are UTC too.

**Sources and how to read the references.**
- A reference such as `A3:2130` is a 1-based line of the coordinating session's backup transcript.
  `A2`, `A3` and `A4` are parts 002, 003 and 004 of `fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-11-07T23-09.jsonl.parts/`.
  `B0`, `B1` and `B2` are parts 000, 001 and 002 of `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl.parts/`.
  Both folders are under `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/`.
- Quotations are word for word. A page comment is stamped with its own time. The tool result that carried it to the coordinator has a later time.
- Runs: `wf_...` is a run folder under `subagents/workflows/` of the session (`~/.claude/projects/-home-user-fortress/fe616d40-.../` or the backup). A stage's minutes are the span of its agents' first and last timestamps in that folder. Tokens are input plus cache creation, counted once per message id, as `tools/spend.py` counts. They cover the agents of the run folder only. The two headless writer streams of the Write and Fix stages, and the skill writer, write in their own sessions and are not in them.
- Abbreviations: "the tool commit" is the last commit of the two tool folders before a run started.

**The tally of the changes after the first good run (25).**

| What the curator knew | Count | Commits |
|---|---|---|
| He asked for it, or said yes, before the commit | 14 | `18788035c0`, `9a37e8401f`, `9a27211250`, `a1d0d63c69`, `b18a3a06d8`, `2dc73945eb`, `6edff99a78`, `2cb97b6a3c`, `0ab588e3d6`, `b88d26f52e`, `551b028584`, `e95fd785e5`, `9a0f69e01a`, `4569e7c59c` |
| He was told before the commit, with no yes | 4 | `9df988bf4b`, `2c7990acea`, `403a0e60cb`, `5e6bd1b311` |
| He was told after the commit | 5 | `bedc80b01d`, `36ce6e303c`, `adbbf2051a`, `760864d794`, `49a9f1fcb1` |
| No telling found | 2 | `6026231ff5`, `3747769992` |

Six of the 25 changed the clarity workflow's folder (`6026231ff5`, `bedc80b01d`, `18788035c0`, `9a37e8401f`, `9a27211250`, `3747769992`). The other 19 changed the record-landing folder. Three of the 25 added stages (blocks 6, 10 and 13). Two changed the model tier of every agent (blocks 20 and 21). Fourteen changed the text, or an input, of a brief (blocks 2, 3, 4, 5, 7, 8, 11, 12, 17, 18, 19, 22, 23 and 25). Six are scripts, pointers or documentation (blocks 1, 9, 14, 15, 16 and 24). Block 2.0 explains where the 25 start for each tool.

The 29 commits of the brief are these 25, the clarity workflow's two first commits (`d568449911`, `913ba1cbfc`) and the landing workflow's two first commits (`f44cf4ec28`, `575d555945`).

## 1. Each tool at its first good run

### 1.1 The clarity workflow at `913ba1cbfc` (2026-10-22 09:28)

`d568449911` (08:34) made the tool: the script, five briefs, `entries.py`, a README. It ran first at 08:34 over the POSITIONS pilot and a FACTS calibration (runs `wf_d3e351c0-edc`, `wf_d4a20e43-e1d`, `wf_9d898834-f5c`, `wf_d8fdeed7-8b4`, `wf_e98f1b26-a7f`, 44 to 52 minutes each). It had no judge stage and no headless writer. `913ba1cbfc` added the judge stage, the headless writer stream (`writer-stream.sh`, `wait.py`, `judge.md`) and the orientation workflow. The four FACTS runs (`wf_9e43746d-fb4`, `wf_f594b741-c2e`, `wf_95cdd15c-0ce`, `wf_985f41e3-aa4`) started at 10:11 on that commit, took 104 to 122 minutes each, and the last finished at 12:12. The coordinator wrote at 12:16:02 that they were "applied, 15.7M written against the estimate of 9M; FACTS 142.9K to 222.8K characters, 198 to 208 entries; 13 entries held by the judges" (boot note edit, A2:10761).

The commit message says "at his yes of 10:0x UTC". The yes in the transcript is at 09:23:49, before the commit at 09:28:18: "yes, build the judge, writer streams and orientation tool" (2026-10-22 09:23:49 UTC, A2:9229)

Stages in order, for each chunk of about ten entries (`record-clarity.js`, `README.md` at that commit):

| # | Stage | Who | What its brief asks (in one line) |
|---|---|---|---|
| 1 | Assess (FACTS only) | one Opus agent | `assess.md`: mark each entry pass, fail or unresolved on six criteria (scope, present meaning, evidence, comprehension, ownership, consistency); give each a disposition: keep, reword, reorganize or investigate. Only reword and reorganize go on. |
| 2 | Write | headless Opus writer stream, driven by a Sonnet agent that only runs the command and waits | `writer.md`: rewrite each entry so that a reader who knows the language but not the work understands it; the meaning unchanged; each entry near 600 characters as a check; no handle of a past conversation; pointers get a few words. |
| 3 | ColdRead | one Opus reader, with only `CLAUDE.md` and the `fortress-repo` core | `coldread.md`: say for each entry what it means, and what could not be understood. |
| 4 | Check | one Opus checker | `check.md`: compare each new entry with its sources (fidelity), and the reader's answers with the source meaning; sort each failure as a concept, wording or uncertain fidelity. |
| 5 | Fix | the same writer stream | `fix.md`: the writer's second round, from the cold read and the check. |
| 6 | Reread | one Opus reader | `coldread.md` again on the fixed entries. |
| 7 | Judge | one Opus agent | `judge.md`: one verdict for each entry, apply or hold, once; writes `final.apply` and `queue.md`. No further round. |

Nothing is applied by the workflow. The coordinator applies `final.apply` and files `queue.md` (`README.md`, "After a chunk").

### 1.2 The record-landing workflow: first real landing at `575d555945`

- `f44cf4ec28` (2026-11-02 00:58) is its first version. Its first run was a replay of climb batch 24's landing, run `wf_9284ce63-4a1`, from 00:59:46 to 02:04:30, 64.7 minutes. It was not a real landing: it landed nothing and was compared with the hand route (see block 2.0).
- `575d555945` (2026-11-02 02:57) holds the eight fixes of that comparison.
- The first run on a real landing is **climb batch 25**, run `wf_c21ad72e-68c`, from 2026-11-03 04:30:06 to 05:04, 34.5 minutes, on tool commit `575d555945`. The coordinator launched it at A3:17731. It sorted 70 changes, and the judge applied all 70 (the coordinator's relay at 05:06:43: "Its two commits sit on their own branch with the judge's account of 70 changes, all applied.", A3:17806). This version put its commits on a branch, and the coordinator landed them.

Stages in order at `575d555945` (`record-landing.js`, its five briefs and scripts):

| # | Stage | Who | What its brief asks (in one line) |
|---|---|---|---|
| 1 | Sort | `prepare.sh` and `evidence.py` make the worktree and six evidence files; one Opus sorter | `sort.md`: list each change that the record owes after the landing, one line each, by home (FACTS, POSITIONS, history, ledger row, PLAN line, PLAN-history, queue item, INDEX, other note), kind, weight, ground and writer; every entry that the batch added or changed gets a "pass" change; each PLAN line that `plan.md` lists as looking stale gets a change. |
| 2 | Write | a Sonnet driver runs `drive.sh`: two headless Opus streams side by side, then `checks.sh 1` | `entries.md`: the new line of each FACTS entry, POSITIONS entry and ledger row, with its provenance, no more and no less than its ground; POSITIONS only by the fewest words when the tree made a sentence false (his rule of 2026-10-31); keep the gate's figures in F-53 and F-240; keep the commit that bounds a one-time measurement; an entry past 600 characters grows only by what its change owes. `routing.md`: PLAN, PLAN-history, the review queue, INDEX and other notes in line; each line moved out of PLAN word for word; an item goes to "Answered by a decision of his" only with his word on that same item. |
| 3 | Check | an Opus checker and the clarity cold reader, side by side | `check.md`: each change passes or fails in one of four classes: coverage, fidelity, form, routing. The cold reader (`record-clarity/coldread.md`) reads `clean.txt` in parts of five entries. |
| 4 | Fix | the Sonnet driver again; both writers in the same streams; `checks.sh 2` | The writers' brief's "fix round": fix each failure of `check.md`, `cold-read.md` and `mech-1.md`. No second round. |
| 5 | Judge | one Opus judge | `judge.md`: apply or hold each change once; hold an entry already past 600 characters that grows beyond its owed clause; run `final.sh` (checks, then two commits on the branch); write `diff.md` within 10,000 characters. |

The mechanical checks that `checks.sh` runs: `record.py check --base`, `ledger.py check` and `landing-check`, `check-index.sh`, `plan-moves.py` (each line out of PLAN word for word in PLAN-history, and its LOOK list), `queue-check.py` (numbers, "Needed by", counts, new items in "Answered by a decision of his"), `lengths.py`, `words-subset.py`.

## 2. Every change after the first good run, in order of time

Each block gives: what changed; the reason, with its source; who asked; what the curator knew, with his words and the time; the measured effect on a run's length. "Length: not measured" means that no run before and after isolates the change. The batch sizes differ from run to run (section 4), so no run pair is clean.

### 2.0 Before the landing workflow's first real landing (for context)

**`f44cf4ec28`, 2026-11-02 00:58, record-landing: the first version.**
- What: the script, five briefs, scripts and a README, as table 1.2 says, from the design note (`process-engineering/record-landing-workflow.md`, `5384a4f35`).
- Reason: the design note's. The commit message: "with the curator's eight defaults (his "yes to all eight" of 2026-11-02, the held list)."
- Who asked: the curator, over 10-22 to 11-02. He told the coordinator that the clarity workflow already existed and that the record's work after a landing was to be a workflow (section 3).
- The curator: said yes first. The coordinator's ask at 00:09:49: "Build its smallest first version with the eight defaults below, and prove it by replaying climb batch 24's landing?" (2026-11-02 00:09:49 UTC, A3:14739) Default 6 of the eight: "6. I land the branch, until two landings' diffs needed no correction." (2026-11-02 00:09:49 UTC, A3:14739) His answer: "Yes to all eight" (2026-11-02 00:29:16 UTC, A3:14743)

**`575d555945`, 2026-11-02 02:57, record-landing: the eight fixes after the replay.**
- What (from the commit message, with the diffs): (1) `check.md` and `entries.md`: an entry keeps the commit or code state that bounds a one-time measurement and what the fact blocks; only how the fact came about goes to the history. (2) `entries.md`, `check.md`: a claim extended to the landing's batch brings that batch's figures. (3) `plan-moves.py` lists, without failing, each PLAN line that looks stale; `evidence.py` gives the list to the sorter in `plan.md`; the sorter gets a rule to file each. (4) `routing.md`, `sort.md`, `queue-check.py`: an item goes to "Answered by a decision of his" only by his word on that same item. (5) `judge.md` and `lengths.py`: an entry already over 600 that grew is held unless the owed clause alone explains it. (6) `drive.sh`: the driver waits in steps of 240 s. (7) The cold reader writes its report in parts of five entries; `diff.md` stays within 10,000 characters. (8) The `.done` markers move to the worktree's ignored `tmp/`; `diff.md` names no hash.
- Reason: the replay's comparison, `process-engineering/record-landing-replay-24.md`, section 7. The replay took 65 minutes against 31 for the hand route, and wrote 2.06M tokens against 0.63M (section 6 of that note).
- Who asked: the coordinator, from the replay's comparison.
- The curator: told after, at 05:30:20: "The new record-landing workflow replayed batch 24's landing: as good as the hand route, not better, now fixed in eight places and ready for its first live run at batch 25's landing." (2026-11-02 05:30:20 UTC, A3:15221) His yes of 00:29:16 covered the replay and a comparison, not these fixes.
- Length: the replay (before the fixes) took 64.7 minutes; the first real landing (after them) took 34.5. The two batches differ (117 and 70 sorted changes). Not isolated.

### 2.1 The changes, one block each

**1. `6026231ff5`, 2026-10-22 12:16, clarity: `words-subset.py`.**
- What: a new script, `record-clarity/words-subset.py`: checks that a scrape of record entries only deletes words. No stage or brief changed.
- Reason: the commit message, "check that a scrape of record entries only deletes words". The coordinator's brief to the scrape worker at 12:15:50 (A2:10748) names it: "Run `python3 ... words-subset.py scrape.apply --allow row`, which fails any entry that adds a word."
- Who asked: the coordinator, for the scrape that the curator approved at 11:04:09: "Yes, to the scrape and then the report," (2026-10-22 11:04:09 UTC, A2:10112)
- The curator: no telling found. The script is named in the boot note edit of 12:16:02 (A2:10761) and in the worker's brief; no chat message names it.
- Length: not a stage; none.

**2. `bedc80b01d`, 2026-10-26 08:37, clarity: `args.extra`.**
- What: `record-clarity.js` takes `args.extra`, "a run's own brief, given to the writer, the fix round, the checker and the judge; the cold reader never sees it". The rule: the extra text is added to those four stages' launch messages. The coordinator's own brief for the run said: "Where they differ, this brief wins." (scratch file `foundations/rewrite-brief.md`, read at A3:4498).
- Reason: the coordinator wanted to run the clarity workflow on 13 POSITIONS entries after the foundations review with a brief of its own. The commit message gives none.
- Who asked: the coordinator. The curator's yes of that morning covered a rewrite of two entries and a test: "Yes, to both rewording of or refinements of P37 and P26. But we have like a clarity process workflow that you can use for writing it with a code reader." (2026-10-26 07:42:15 UTC, A3:2130) and "Yes, run the text, fix the rerun, yes." (2026-10-26 07:48:49 UTC, A3:2156) The coordinator's own account at 19:11:14 (A3:4478): at 07:49 it "widened the scope myself" and "You never approved the wider scope."
- The curator: told after. At 08:40:51 he was told the run had started, with no word on the script: "The rewrites have started, as you approved.** The clarity workflow is rewriting the reasons under the entries that the judgement names." (2026-10-26 08:40:51 UTC, A3:2987) The run brief's effect was first told at 19:17:24: "But my brief to the writer made Fable's list the target:   - each entry had to "produce every behaviour listed";   - a missing point counted as a failure for the checker;   - the brief overrode the workflow's own briefs" (2026-10-26 19:17:24 UTC, A3:4559) The script change was first named at 2026-10-27 07:50:07: "I also propose removing the hook I added to the clarity script." (2026-10-27 07:50:07 UTC, A3:5149)
- Length: run `wf_36572c60-a05` (10-26 08:38 to 09:26) took 48.7 minutes for two chunks. Not isolated.

**3. `18788035c0`, 2026-10-27 22:14, clarity: `args.extra` taken out.**
- What: the script restored "to its form before bedc80b01: no run brief (args.extra) can override its own briefs".
- Reason: the curator's order, and the coordinator's account at 22:16:36 (A3:5212): "The change had added a way for my own brief to replace the tool's rules. That is gone now."
- Who asked: the curator at 22:13:20 (answering the coordinator's proposal "I also propose removing the hook I added to the clarity script"): "Does this mean restoring it to original form that worked well for what it was designed? Yes please, undo the damage." (2026-10-27 22:13:20 UTC, A3:5165)
- The curator: said yes first (22:13:20; commit 22:14:42).
- Length: none.

**4. `9a37e8401f`, 2026-10-28 20:59, clarity: three additions to the briefs (findings).**
- What: (a) `README.md`: "To correct what a review found, put `findings.md` in each chunk's folder before the run: one block per entry, each finding with the sentence at issue, the right reading and its ground." (b) `writer.md`, "Read first", a new item: "if your folder holds `findings.md`, ... Correct each sentence that a finding names from its ground, opened at its source: there, and only there, the meaning changes. Change nothing that no finding names, and let an entry grow only by what its corrections need. Where a finding's only ground is a reviewer's reasoning, or it needs the curator's word, keep the text and write a question for the curator." Step 3 of the writer's rules gains "or a finding in `findings.md` gives it with its ground in the team's texts, library or code". (c) `check.md`: "If your folder holds `findings.md`, each finding's ground is also a source ... A change that its finding's ground holds is no fidelity failure. A change that no finding names is one, and so is a changed decision, growth beyond what the corrections need, or a sentence that tells how the decision came about." (d) `judge.md` reads `findings.md`.
- Reason: the commit message: "at his yes of 20:42 UTC, a findings input, a ground from the team's sources as a reason, the checker's check against each finding's ground". The earlier debacle of the run brief (blocks 2 and 3) set the need: correct what a review found without a brief that overrides the tool.
- Who asked: the coordinator proposed; the curator said yes twice.
- The curator: said yes first. At 20:42:16: "Yes, prepare the three additions and show me the wording." (2026-10-28 20:42:16 UTC, A3:6747) The coordinator showed the wording at 20:45:43. At 20:55:02: "Yes, apply the three edits and prepare the (trial?) run" (2026-10-28 20:55:02 UTC, A3:6802)
- Length: pilot runs after it took 42.1 minutes (`wf_6fca2a6e-cc0`, one chunk). Not comparable with the four-chunk FACTS runs (104 to 122). Not isolated.

**5. `9a27211250`, 2026-10-28 22:38, clarity: a finding's ground stays out of the entry.**
- What: `writer.md` finding clause: "State the corrected reading as the decision and its reason, and point to the FACTS entry or the report section that holds its ground; the ground's dates, counts, commits and file names go in the apply file's note line, not in the entry." `check.md`: "So is a new sentence that carries a date, a count, a commit or a file path, unless it is a pointer to an entry or a report section."
- Reason: the pilot's entries carried too much detail. The curator's comment at 22:19:09: "Regarding the pilot results. I think the positions contain too much detail and references which should be the historical record and not in the position writing which should be kept timeless and referencing the FACTS on record where needed. Do you see the difference in form between the landed consolidation and the new revisions from foundations review?" (2026-10-28 22:19:09 UTC, A3:7405)
- Who asked: the curator's remark; the coordinator drafted the two sentences.
- The curator: said yes first. At 22:29:30: "Yes, show me the two sentences" (2026-10-28 22:29:30 UTC, A3:7432) At 22:37:58: "Yes. Re-run the pilot." (2026-10-28 22:37:58 UTC, A3:7484)
- Length: pilot runs `wf_cbab4b96-2dd` (32.8 min), `wf_96f3286c-7a6` (47.1), `wf_f19921b3-005` (41.9). Not isolated.

**6. `a1d0d63c69`, 2026-11-03 06:26, record-landing: the Land stage, and the orientation update as a child workflow.**
- What: a new stage after Judge. A Sonnet "land" agent checks the judge's checks (`mech-final.md` says "Every check passes.", the worktree is clean), puts the two commits on `main` (fast-forward, or `git cherry-pick AT..BRANCH`), runs `record.py check --base`, `ledger.py landing-check` and `check-index.sh` on `main`, pushes the three refs, removes the worktree and deletes the branch. The script then runs `orientation.js` in update mode as a child workflow on the facts list of `diff.md`'s "Next". A replay lands nothing. This reverses design decision 6 (the coordinator lands the branch for the first two landings).
- Reason: the commit message: "By the curator's rule of 2026-11-03, 06:2x (HELD.md, "Held in chat (2026-11-03)"), which reverses decision 6 of the design".
- Who asked: the curator at 06:20:02: "So you should let those workers commit directly, and your review should be just looking at their commit, at the diff that they made. This is how you make the judgment. You should not hold the workers' work and then cherry picking the result. That's unnecessary work for you as a coordinator. You should run the workflow as it would run under the premise that it's written good. You are just monitoring the results by reviewing the, like, what they commit in the last diff, you check it." (2026-11-03 06:20:02 UTC, A3:18562) And: "And same with the orientation workflow, like, that runs after this update, right? Because it needs committed facts and positions, or it becomes the, like, I don't know whether a workflow can run another workflow. So why was either you run the first workflow and then run the next workflow? Like, that confusion of yours about, like, after the landing, we should have been executing a bunch of prepared workflows that update the record. That is the whole point. And there are two workflows to do this, and everything should have been automated away." (2026-11-03 06:20:02 UTC, A3:18562)
- The curator: asked first. The coordinator's account of the source at 06:22:54: "Decision 6 of the design note said the same: for the first two batches the coordinator lands the branch." (2026-11-03 06:22:54 UTC, A3:18601) (default 6 was among the eight he accepted at 00:29:16.)
- Length: adds the Land stage and the orientation child. Land: 0.6 to 3.1 minutes in the 15 runs of batches 26 to 36 without batch 30 (4.4 in batch 30), mean 1.1. Orientation: 5.8 to 106.5 minutes, median 44, mean 46 (12 to 14 agents; section 5). First run with it: batch 26, Land 1.4, orientation 13.8 minutes.

**7. `b18a3a06d8`, 2026-11-03 06:28, record-landing `judge.md`: the workflow lands on main itself.**
- What: three passages of the judge's brief now say that the coordinator "reviews this run's work once it has landed", and that "the workflow's Land stage puts them on `main`, pushes it and runs the orientation update, reading that update's entries from `diff.md`'s "Next"".
- Reason: the commit message: "The curator's ruling of 2026-11-03, 06:2x UTC ... is the yes for this brief change."
- Who asked: the same ruling (block 6). The curator: asked first.
- Length: none.

**8. `9df988bf4b`, 2026-11-03 06:29, record-landing `judge.md`: "Next" names the landed commits by `land.commits`.**
- What: the line in `diff.md`'s "Next" that gave `git -C WORKTREE log AT..BRANCH` now says that the workflow result's `land.commits` gives the two commits.
- Reason: the commit message: "The git -C WORKTREE log AT..BRANCH command no longer works after a live landing, since the Land stage removes the worktree and deletes the branch".
- Who asked: the script worker, as a follow-on of block 6.
- The curator: told before, within the ruling's scope. At 06:28:35 he was told: "The record-landing script and its README are changed and pushed: one launch now lands the record commits on main, pushes, and runs the orientation update. The same worker now fixes two stale lines in its judge's brief and marks decision 6 as reversed in the design note. The skill writer encodes your three rules of this morning into the coordinator skill." (2026-11-03 06:28:35 UTC, A3:18636)
- Length: none.

**9. `2dc73945eb`, 2026-11-05 11:15, record-landing README: a pointer.**
- What: the README sentence on what the coordinator does with a POSITIONS change now points to the coordinator skill's "Quiet times" instead of "by his rule of 2026-10-31". (The same commit changed `skill-cold-read-brief.md`.)
- Reason: the commit message: "in step with the coordinator skill of 2026-11-05".
- Who asked: the coordinator, with the skill change (`f898915bce`, "approved whole at 10:3x UTC on 2026-11-05").
- The curator: yes first, to the skill text, not to the README line. At 11:13:04: "I read the whole health rule draft. Everything as it stands is fully approved and can be incorporated into the skill" (2026-11-05 11:13:04 UTC, A4:298)
- Length: none.

**10. `6edff99a78`, 2026-11-05 13:03, record-landing: five new stages (Skills, Cold read, Fixes, Page, Push).**
- What: after the orientation update the script runs: **Skills** (`skills.sh N 1` writes the skill writer's task from `skill-task.md` and the landed files; a fresh headless Opus skill writer installs what the orientation judge accepts, brings `fortress-repo`'s other parts in line with the landing, and commits on `main`); **Cold read** (the changed parts read as a worker new to the repository); **Fixes** (`skills.sh N 2`, `skill-fixes.md`: the same writer fixes the flags); **Page** (`page.md`: update the page of `fortress-repo`'s landed changes and publish it by its URL); **Push** (`folders.sh` commits the run's `skills/` and `orientation/` folders; the three pushes). The drivers wait in steps of 230 s. New files: `skills.sh`, `folders.sh`, `skill-task.md`, `skill-fixes.md`, `page.md`. `skill-task.md` step 2 holds a rule for traps: "If the data names a trap or a wall of a row that the part has no sentence for, and a worker who follows the part would fall into it, add one sentence where the part keeps its traps." (changed by block 23).
- Reason: the commit message: "As the coordinator skill's batch.md, "The landing", step 4, says since e6bc2b83c, the workflow now runs the rest of the landing's chain after its orientation update".
- Who asked: the curator at 12:01:53 (H23): "Can we apply the same principle to the Fortress repo skill so that when post-batch landing, for example, updates the revival page, or when coordinator directs updates to Fortress repo skill post-landing, that its page gets the same treatment, or artifact page that I can review the diff from? Can we make that part of the landing batch workflows?" (2026-11-05 12:01:53 UTC, A4:832) The coordinator's plan at 12:02:27: "3. After your yes, a script worker wires the chain into the record-landing workflow: after the orientation update, the skill writer's pass over the landing's changes, its cold read and fixes, then the page's update, with no step of mine between." (2026-11-05 12:02:27 UTC, A4:837)
- The curator: said yes first, at 12:19 (draft 13, with a caveat): "this proposed change is approved with a caveat that your explanation of what changes and why says it as if the changes to Fortress repo will now wait on my word, which was not my intention with the review page. The review's page's purpose is just to give me a good working surface to check the changes whenever I want. But these should not change the procedure on how the Fortress repo fields are being updated." (page comment of 2026-11-05T12:19 UTC, read in the tool result of 12:19:42, A4:1009)
- Length: adds five stages. Skills + Cold read + Fixes: mean 11.4 minutes (4.7 to 16.5) in the 15 later runs. Page: 4.7 minutes in the first run (batch 26), 8.8 to 19.4 later, mean 13.6. Push: 0.2 to 0.5. In batch 26's run the five took 12.9 minutes of 73.3.

**11. `2cb97b6a3c`, 2026-11-05 17:00, record-landing `page.md`: only what the curator has not read.**
- What: the page agent drops the item that the boot note's "Pages" line names as read, and every older one; numbers the new items on from the last; gives an approved draft whose words did not change no item.
- Reason: his comment of 16:49 (read in the tool result at 16:50:30): "I have read everything on the page above between 15 and 19. I assume I have read the previous points before. Why aren't we, when I gave the word that I read them, and you are doing the update of this page with next batch of changes, why don't you remove what I saw before? This is now growing endlessly. So I am, when I'm giving you the word that I did some reading up until somewhere, you need to, I don't know, like make a note and by the next batch remove it when I said I read it. Because now having 19 changes here, I have trouble figuring out what I read and what I didn't. And like, I believe I have read everything before 15. So am I wrong? Do you need to check the transcript? Like, you are making this harder on me than necessary. It worked well while here were a few things. It must remain in that way. If I come here and there are 20 new things, they better be 20 new things and not accumulation of garbage that nobody threw out when I've already read it and gave my position on it. Do you get me?" (page comment of 2026-11-05T16:49 UTC, read in the tool result of 16:50:30, A4:2318)
- Who asked: the curator.
- The curator: asked first, and was told before the commit at 16:53:50: "The rule goes into the skill: your word that you read up to an item removes it and all before it at the next update, and an approved draft's landed form is not shown again unless the landing changed your words." (2026-11-05 16:53:50 UTC, A4:2380)
- Length: not measured. Page: 4.7 minutes (batch 26), 9.7 (batch 27, the next run).

**12. `0ab588e3d6`, 2026-11-05 17:01, record-landing `page.md`: the page agent names the coordinator, never "you".**
- What: one sentence added: "Every text on the page names the coordinating session as "the coordinator", in the third person, never as "you": the curator reads "you" on a page as himself."
- Reason: his comment of 16:38: "I'm confused. Who is the you in this? The coordinator? Or me, the curator? I don't understand what is this about. Did you like update the section that describes how the post-landing procedure invokes the workflows? I thought this was already like encoded in the workflow, and you are now changing the description to match, or what is going on here?" (page comment of 2026-11-05T16:38 UTC, read in the tool result of 16:50:30, A4:2318)
- Who asked: the curator. The curator: asked first; told at 16:53:50: "Yes: the workflow got its five stages first, at 13:0x at your ask of 12:0x, and the skill's description of the landing was then brought in line with it. The cold read was done in the right role. The rule that a reason names the coordinator, never "you", goes into the skill now." (2026-11-05 16:53:50 UTC, A4:2380)
- Length: none.

**13. `b88d26f52e`, 2026-11-06 04:35, record-landing: a last stage, the revival page.**
- What: stage 12, **Revival page**: after the Push stage, a Sonnet agent runs `revival-page/update.py --landing N --run-start base` in the main tree, commits the files it names, pushes; a second Sonnet agent (`revival-publish.md`) republishes `revival-story.html` with `record-growth.png` by the page's URL. Exit 2 of the script stops the run there. The same commit added one clause to the coordinator skill's `batch.md`, "The landing", step 4.
- Reason: the commit message: "stage 12 runs revival-page/update.py ...". What the coordinator did by hand after batch 26's landing (comment in the script).
- Who asked: the curator's page comment of 04:24 (read at 04:26:09): "Batch 26 has landed. Why wasn’t this updated as part of the post landing workflows yet?" (page comment of 2026-11-06T04:24 UTC, read in the tool result of 04:26:09, A4:5142)
- The curator: asked first (a question, not a yes to the design). Told after at 04:36:22: "The landing workflow now updates the revival page itself at every landing and republishes it (`b88d26f52`, pushed). The coordinator skill's landing step gained one clause saying so; its cold read and its item on the drafts page come with the next skill change." (2026-11-06 04:36:22 UTC, A4:5283) The skill clause went in before its draft was on the drafts page.
- Length: adds one stage: 0.2 to 1.5 minutes (mean 0.7) in the 14 runs that had it.

**14. `36ce6e303c`, 2026-11-06 04:51, record-landing scripts: `rows.add`, the stale list whole, marked lines skipped, `ledger.py note --check`.**
- What: `checks.sh` adds the new rows of `rows.add` (or the judge's `final.add`) with `ledger.py add`; `evidence.py` prints `plan-moves.py`'s stale list up to 40,000 characters and writes the rest to `plan-stale.txt`; `plan-moves.py` skips a line that carries "closed at the cleanup of DATE"; `ledger.py note N TEXT --check` says whether a note fits.
- Reason: the commit message: "From climb batch 26's record landing (its diff.md, "For the coordinator")": at batch 26's commit the stale list was 54,005 characters, and falls to 4 LOOK lines.
- Who asked: the coordinator, from the run's `diff.md`.
- The curator: told after, at 04:55:46: "Two of its brief changes wait for your yes, since the landing workflow's briefs change only at your word." (2026-11-06 04:55:46 UTC, A4:5434) The two brief changes (`entries.md` to mention `rows.add`; `judge.md` to name `final.add`) are not in git at the end of the 29 commits.
- Length: not measured. The Sort stage: 8.8 minutes (batch 26), 21.1 (batch 27).

**15. `3747769992`, 2026-11-06 06:11, clarity README: the cap of two agents is per run.**
- What: one sentence: "A Workflow runs at most two agents at once on this machine" becomes "The Workflow tool runs at most two agents at once in each run, not on the machine: run several runs side by side, each with its own stream."
- Reason: the coordinator's archaeology on how the October passes were scaled (A4:5990); the curator's word of 05:44:38: "That’s why I am asking for workflow that gets a list of rows to review, so that we can run several workflows in parallel. That’s how we scaled it last time. Run archeology over this, then record the techniques on coordinator skill, so that I don’t have to re-explain it again." (2026-11-06 05:44:38 UTC, A4:5951)
- Who asked: the curator asked to record the technique in the coordinator skill; the README fix is the coordinator's addition.
- The curator: no telling of this README line found.
- Length: none.

**16. `551b028584`, 2026-11-06 10:53, record-landing README and script comment: the writer brings the whole skill in line.**
- What: README item 7 and a comment of `record-landing.js` change "brings `fortress-repo`'s other parts in line" to "brings the `fortress-repo` skill in line with the landing". (The same commit changed the coordinator skill.)
- Reason: the commit message: "No change of fortress-repo or cloud-container waits for the curator ... The record-landing README and the comment in record-landing.js now say that the writer brings the whole fortress-repo skill in line."
- Who asked: the coordinator drafted it (draft 14); the curator approved.
- The curator: said yes first, at 10:42: "LGTM." (page comment of 2026-11-06 10:42 UTC on the drafts page, read in the tool results of 10:5x; the commit message: "approved by the curator at 10:42 UTC").
- Length: none.

**17. `e95fd785e5`, 2026-11-06 11:02, record-landing `page.md`: read every comment before an update.**
- What: before dropping items, the page agent reads every comment thread on the page with the ArtifactComments tool, "sent to Claude or not". A plain "LGTM", "read" or the like on an item is his word that he read it and every older item.
- Reason: the commit message: "From the curator's comment of 10:59 UTC." The comment (read in the tool result of 11:01:13, A4:7868): "I wrote the LGTM here before. Why are you bothering me with this point? Can't you read the comments?"
- Who asked: the curator.
- The curator: asked first (10:59). The coordinator told him at 11:05:30 and treated the comment as his yes to a change of the landing workflow's brief: "The rule landed too, commit `e95fd785e`: every page update now starts by reading all comments, and a plain LGTM counts as your word. It also went into the landing workflow's own page brief, which by its README changes only at your yes; I took your comment of 10:59 as that yes. Say so if not." (2026-11-06 11:05:30 UTC, A4:7941)
- Length: Page stage 9.7 minutes (batch 27) against 4.7 (batch 26). Not isolated: the page grew in items.

**18. `adbbf2051a`, 2026-11-06 11:09, record-landing `page.md`: the cold read's fixes.**
- What: threads of resolved comments are read too; the tool is loaded with ToolSearch (`select:ArtifactComments`); read marks are named ("LGTM", "Read", "Mark as read", "OK"); any other or unsure comment drops no item and is quoted to the coordinator in the result's `summary`.
- Reason: a cold read of block 17: "8 flags: 2 high, 2 medium and 4 low" (A4:7946).
- Who asked: the coordinator.
- The curator: told after: "The cold read of the new rule found two gaps: an unsent comment that is not a read mark had no route to me, and the landing workflow's page agent might not find the comments tool. The writer closes both now, and a one-agent probe checks that a workflow agent can read a page's comments. Then the rule shows as item 27 on the draft" (2026-11-06 11:09:25 UTC, A4:7967)
- Length: none measured.

**19. `760864d794`, 2026-11-06 11:10, record-landing `page.md`: list every thread by the cursor.**
- What: one sentence: "The tool lists the threads in pages under a size cap, and its result names a cursor: continue with the cursor until every thread is listed."
- Reason: the commit message: "From the coordinator's probe wf_935fa942-814": a workflow agent read 6 of 16 threads in the probe.
- Who asked: the coordinator.
- The curator: told after: "The rule's fixes are pushed, commit `adbbf2051`. One last detail is being added, then the drafts page shows the whole change as item 27." (2026-11-06 11:10:41 UTC, A4:8001)
- Length: none measured.

**20. `9a0f69e01a`, 2026-11-10 07:42, the "Fable week": every agent of the landing and orientation scripts on Fable.**
- What: `record-landing.js`, `orientation.js`, the headless writers and `tiers.sh`: flag `FABLE_WEEK = true`: every agent on Fable, at medium effort where it ran on Opus and at low effort where it ran on Sonnet. The phases' declared tiers stay.
- Reason: the curator's order of 2026-11-10 (the offer of 3 Fable resets).
- Who asked: the curator at 05:41:41: "If I understand the terms of this promotion, it makes sense to temporarily suspend our practice of heavy delegation of to work cheaper models and stay with Fable only workers for now. Use Low reasoning effort for tasks that would normally go to Sonnet." (2026-11-10 05:41:41 UTC, B0:8745) "Maybe we should replace Opus delegation with Fable 5.2 on medium reasoning effort and either consider switching the coordinator’s reasoning effort High or stay on Xhigh" (2026-11-10 05:41:41 UTC, B0:8745) And at 07:40:32: "I have switched the coordinator session's reasoning efforts to high. Please do the small updates, temporary change of workflow model assignment to the specified fable reasoning efforts we discussed before the compaction." (2026-11-10 07:40:32 UTC, B0:9504)
- The curator: asked first. The coordinator reported at 07:42:38 (B0:9561).
- Length: the two runs in the Fable week were batch 30 (11-10 13:03; Sort to Judge 46.6 minutes; its total 4,915.7 minutes includes a stop of the session until 11-13) and batch 32 (11-16 05:59; 91.4 minutes in all, Sort to Judge 44.9, orientation 23.1). Their batches sorted 90 and 93 changes. Not isolated.

**21. `4569e7c59c`, 2026-11-17 05:56, the tiers regular again.**
- What: `FABLE_WEEK = false` in the two scripts; two lines in `tiers.sh`.
- Reason: his usage panel and his message at 05:55:32 (the Fable meter at 89 percent).
- Who asked: the curator: "I guess this calls for switch of model, for workers. Potenti" (2026-11-17 05:55:32 UTC, B1:3355)
- The curator: asked first. Told at 05:56:39: "I switched the workers back to the regular tiers. No workflow was running. Workers and writers are on Opus again, and scouts are o" (2026-11-17 05:56:39 UTC, B1:3371)
- Length: none by itself.

**22. `2c7990acea`, 2026-11-17 10:35, revival page script and `routing.md`.**
- What: `update.py` takes "Next" from PLAN's batch lines under "The phases"; it adds the row of each earlier landing that `landings.csv` lacks; it accepts a label such as `31b`. `routing.md` gains a sentence: the batch's phase line and the live thread's last landed gate keep the form that `update.py` parses, "or the workflow's last stage stops".
- Reason: the commit message: climb batch 31's revival stage "stopped with exit 2 at PLAN's reworded lines", and the script "read the next batch as the landing's number plus one, which after climb batch 31b gives 32, a batch that has landed."
- Who asked: the coordinator.
- The curator: told before, with no yes. At 08:34:12: "The revival page isn't updated yet.** Its script failed on two things. First, the routing writer had reworded two PLAN lines the script parses; I've put them back in its form. Second, the script assumes batches land in number order. It would announce batch 32 as next, though 32 landed before 31, and run 2's label, 31b, would break it too." (2026-11-17 08:34:12 UTC, B1:4266)
- Length: Revival page stage 0.5 minutes in batch 31b's run.

**23. `403a0e60cb`, 2026-11-23 11:52, record-landing `skill-task.md`: a new trap is named for the coordinator.**
- What: the sentence of block 10 is replaced by: "If the data names a trap or a wall of a row that the part has no sentence for, add no sentence: name the row in your report, for the coordinator, who plans its fix (P-180: a defect is fixed, not taught as a workaround)."
- Reason: the Fable review of the process's dead ends (`explorations/reviews/process-dead-ends-2026-11-23.md`, C1, "The coordinator's own: no decision changes"); P-180; his objection of 2026-11-19: "I don't quite understand why we had to name examples of the failure types. It sounds like a recipe for ever growing rules section in a skill, whenever a new specific edge case that wasn't in the list is discovered. I find such writing style counterproductive." (2026-11-19 06:23:25 UTC, B1:9774)
- Who asked: the coordinator, from the review that the curator ordered at 11:27:40 ("Fable worker to review our overall development process, with focus on identifying and proposing fixes for dead ends in information/decision flows.", B1:12787).
- The curator: told before, with no yes: "I'm making one of my own fixes from the review now: the landing workflow will stop adding a skill sentence for each new defect." (2026-11-23 11:52:44 UTC, B1:12920)
- Length: not measured. Skills + Cold read + Fixes: 8.7 minutes (batch 35), 10.0, 7.2.

**24. `49a9f1fcb1`, 2026-11-23 16:09, record-landing: `queue-check.py` reads the triaged queue head; the lander takes over the judge's commits.**
- What: `queue-check.py` accepts the head form "N open items, all consequential" and lines "- X: K."; one sentence is added to the Land stage's prompt: "The judge's commits on the branch may have been made by the coordinator, who ran final.sh again after a stop at step 1 with the cause fixed: take them as the judge's."
- Reason: the batch 35 run (`wf_ec454fa0-c7d`) stopped before landing: "The record update stopped before landing anything. The queue check doesn't know the queue's new form from today's triage. I'm reading the workflow's instructions for this case." (2026-11-23 16:08:15 UTC, B1:13457) The queue had been triaged that day (270 open items to 92, all consequential).
- Who asked: the coordinator.
- The curator: told after, at 23:13:10 (seven hours later): "The queue check.** That's something else, not the skill drafts. The record update is the workflow that brings FACTS, POSITIONS and PLAN in line after a landing. One of its scripts checks the review queue's format, and today's triage changed that format. I taught the script the new format (`49a9f1fcb1`), and the update went on." (2026-11-23 23:13:10 UTC, B1:14674) At 23:30:32 he asked: "What do you mean that today's triage changed a format for the reviews queue?" (2026-11-23 23:30:32 UTC, B1:14714)
- Length: the run was stopped and resumed at 16:09:33. Its stage spans are in section 4.

**25. `5e6bd1b311`, 2026-11-24 01:40, record-landing: only questions are filed in the queue.**
- What: `routing.md`, `sort.md`, `check.md`, `judge.md`, `queue-check.py`, README: a queue item is filed only for a question. "A decision that is not consequential becomes no item: it closes as landed, stated in FACTS or a row." A default taken without him that is not consequential closes as landed; a consequential one stays open in (b). The routine part (c) is retired: `queue-check.py` fails an open item in (c). The README: "No stage drafts the landing's one line for each decision that landed: the coordinator names those at the landing." The orientation README: the coordinator decides each held section. (`workflow-scenarios.js` changed too.)
- Reason: the commit message: "The review queue's change of e7afa05020 in the tools" (the coordinator skill's draft B1, "approved by the curator 2026-11-24"), which came from the Fable review of 11-23 (block 23).
- Who asked: the coordinator, to bring the tools in line with the skill change.
- The curator: yes first to the skill change (00:10:18): "Apply changes to the health rule, or how is the page for the coordinator skill called? Like everything until 70. Put it in, and I will continue reading the 70 and rest tomorrow morning" (2026-11-24 00:10:18 UTC, B1:14923) Told before the tool change at 00:17:53: "The rest of B1:** a worker brings the tools that B1 names in line with what landed" (2026-11-24 00:17:53 UTC, B1:15017) His next message: "approved for the next batch with planner's defaults after Fable review. Go overnight." (2026-11-24 00:20:20 UTC, B1:15026) It names the next batch only.
- Length: none measured. Batch 36's run after it: 108.5 minutes.

### 2.2 The coordinator skill's description of the two tools

These commits changed `references/record.md` or `references/batch.md` where they describe the tools. They are not changes of the tools. Each is listed for the order of events.

| Commit | Time | What it said about the tools | The curator |
|---|---|---|---|
| `b6f5268e1d` | 10-22 09:32 | the clarity workflow and the judge, the orientation update after a landing | the same hour; his yes of 09:23:49 named the tools, not the skill text |
| `6becc28f95` | 10-22 14:26 | the cold read's flags on the parts above; the six checks named in the clarity paragraph | not found |
| `5114bfeceb` | 11-02 22:03 | step 4: the record-landing workflow consolidates the record and "hands you one diff to read and land" | drafts page version 6; his comments of 11-02 06:39 and 06:42 asked that the consolidation come after a landing; he wrote "LGTM" at 21:20 |
| `9d3ac8badb` | 11-03 06:29 | the landing in one step: the workflow lands on `main` and runs the orientation update itself | his ruling of 06:20:02 (block 6) |
| `f898915bce`, `8fa68948fb` | 11-05 11:15, 11:23 | "Run a pilot of three or four entries first ... The record-landing workflow takes no pilot"; the coordinator's review of the commits on `main` | "approved whole at 10:3x UTC" (the commit); his message at 11:13:04 |
| `e6bc2b83c4`, `b9952aba9d` | 11-05 12:21, 12:27 | step 4 gains the skill update and the page of `fortress-repo` changes | his approval of 12:19 (block 10) |
| `7aefb06acc`, `adccafbbae` | 11-05 13:08, 15:09 | the landing chain as the workflow runs it | not found |
| `7e11345b31` | 11-06 05:00 | the revival page defined; step 4 | his question of 04:24 (block 13) |
| `c612214922` | 11-07 23:29 | `pushHeld` and what waits for the curator's go | drafts 32 and 33 |
| `e7afa05020` | 11-24 00:13 | the review queue holds only questions; the coordinator decides each held section of the orientation update | "approved by the curator 2026-11-24" (block 25) |

## 3. The curator's words on the two tools

All word for word, with the time. Longer messages are cut where marked. The passages of 10-20 to 11-24 are also in `evidence/his-words/landing-workflow-order.md` (H01 to H37).

**That the clarity workflow exists and must become, or feed, the landing's process**

- 2026-10-22 08:19:30: "Like we did the workflow for the mining for the positions. Like, that one should probably be kept as a reusable piece of tooling." (2026-10-22 08:19:30 UTC, A2:8790)
- 2026-10-22 08:35:58: "So one thing I'd like to emphasize is again that the revival consolidations should be a workflow runnable that will use to consolidate it right now, but also after the landing batches should be reusing that process for transferring the records from facts and into the what was the word that Astra is using? Orientation for the revival into the fortress skill. So these tools that we will apply need to be docum" (2026-10-22 08:35:58 UTC, A2:9070)
- 2026-10-28 07:42:25: "Like, I asked specifically during this debacle that the coordinator uses the workflows for clarity. Maybe I named the wrong workflow, or maybe it used it wrong. I don't know." (2026-10-28 07:42:25 UTC, A3:5889)
- 2026-10-28 23:07:04: "But after the landing I recall I asked for workflow creation to make this reusable when needed in the future." (2026-10-28 23:07:04 UTC, A3:7598)
- 2026-10-29 09:12:17: "when I say specifically update the positions and use this clarity workflow, you followed it literally each time." (2026-10-29 09:12:17 UTC, A3:9033)
- 2026-11-01 23:10 (comment; read at 23:36:39): "But ideally the goal here would be to get the new facts and stuff from, I believe, from a report of the landed batch is also considered an input. Like maybe there is a step that gathers the evidence for the consolidation of the record that is like what those scouts prepared for each chunk. And then Opus writer consolidated. I'm not really sure what the right form is, but I'd like to have this down to a reusable workflow after the batch lands that the coordinator launches, and we get a consistent record keeping consolidation. Record consolidation process." (page comment of 2026-11-01T23:10 UTC, read in the tool result of 23:36:39, A3:14482)
- 2026-11-01 23:13 (comment): "Okay, so my previous comment is basically the modification to the clarity workflow I was describing is encoded here. So maybe we do not need to launch a worker, because as I'm reading it, I don't know why it was split into so many small chunks. I don't know. This is a whole very long review. I don't know why there are so many micro changes. And I'm at a 19, and there is still a lot more to go, so I'm getting tired." (page comment of 2026-11-01T23:13 UTC, read in the tool result of 23:36:39, A3:14482)
- 2026-11-02 06:39 (comment; read at 07:47:56): "This is good, but I think it's placed at the wrong time. Like, I believe this is the part of the... After landing a batch, that's when this should happen. And I believe other points below are about that thing as well. So maybe just I would change before each batch launches, I would say “after a batch landing”. You know, like this should be combined with the other steps. This is the part of the workflow that we try to encode." (page comment of 2026-11-02T06:39 UTC, read in the tool result of 07:47:56, A3:15263)
- 2026-11-03 19:00:54: "We've revised the clarity workflow, made it part of the post-landing workflow." (2026-11-03 19:00:54 UTC, A3:19425)
- 2026-11-24 09:20:26: "The whole purpose of the workflow was to encode that successful practice into something that runs after each landing." (2026-11-24 09:20:26 UTC, B2:1396)
- 2026-11-24 13:02:48: "I will briefly skim the results of the pilot, but I want us to execute the old method that we had before, which worked. I don't want to reinvent that method. That was a good method, and I wanted that method to have encoded in the workflow." (2026-11-24 13:02:48 UTC, B2:2916)
- 2026-11-24 14:38:03: "This is not only my order of this morning, this is my original order for creating the landing workflow, which was supposed to encode the practice that has successfully consolidated the record the first time." (2026-11-24 14:38:03 UTC, B2:3641)
- 2026-11-24 21:33 (comment, today): "Okay, that's, again, we are more aligned than we were before. I also recall that after this initial period when I had to I was telling, like, does the inventory of my words include the part where I was trying to tell you that we already had a clarity workflow and this is what needs to be the record landing, and then you started to run it? And I recall that later, like on the, there is a part of the curator skill that lets you improve your own workflow, right? And I believe you went in and changed the record landing workflow later, and you just informed me about those changes. So I'm pretty sure like the current state of the workflow is not the last one that ran during the successful coordination. So we need to check what was the later modification of the process and whether that, what issues did it address, why was it done, could it compromise the successful coordination, the successful consolidation system." (page comment of 2026-11-24T21:33 UTC, read in the tool result of 21:33:21, B2:5002)

**Why the landing takes so long, and the answer**

- 2026-11-09 12:39:53: "What’s taking so long with the post landing procedures?" (2026-11-09 12:39:53 UTC, B0:6202)
- The coordinator's answer, 12:40:46 (B0:6211), in full: "It's nearly done. As of 12:40 UTC (13:40 your time), it's on the last stages.  - **08:55 to 09:31:** the post-batch review. - **09:31 to about 11:00:** the record update. Its two commits landed and are pushed:   - `2db5619187`: FACTS, POSITIONS and the ledger.   - `5febd82a78`: PLAN and the review queue. - **About 11:00 to 12:18:** the update of the `fortress-repo` skill's section on how the revival changes Fortress, with its cold read, a quiz and a judge.   - The container restarted at about 11:55 and stopped the workflow.   - I resumed it at 11:59. Finished stages were kept, and one quiz reader ran again, which cost about 10 minutes. - **12:18 to about 12:35:** the skill writer installed the accepted text, then a cold read and the writer's fixes. - **Running now:** the page of `fortress-repo` changes. Then the pushes and the revival page, which should take about 15 to 20 more minutes.  It takes long because the workflow runs 25 agents one after another, at most two at a time. Climb batch 28's took about 3 hours too, from 08:46 to 11:56 UTC. This one will take about 3.5 hours with the restart." (2026-11-09 12:40:46 UTC, B0:6211)
- Its stage times came from the run's journal at that minute: record update 09:31 to about 11:00; orientation update about 11:00 to 12:18 (with a container restart at about 11:55 and a resume at 11:59 that re-ran one quiz reader, "about 10 minutes"); the skill writer 12:18 to about 12:35. Section 4 holds the journal's own figures for that run (batch 29, `wf_450f4ab6-51d`).
- 2026-11-24 09:20:26 (H31), on the same subject: "And it is long as hell. It is running for a long time, and it still allows the growth to go unchecked. So there, something is fucked up. Like, go focus on two things from the analysis. Go and ask that Opus Worker and this, or to go back int" (2026-11-24 09:20:26 UTC, B2:1396)
- 2026-11-24 21:33 (comment, today): "I think it was like more complicated stages into the process than we ran originally, and I think the record landing process is running very, very long now, so maybe we should like review it critically." (page comment of 2026-11-24T21:33 UTC, read in the tool result of 21:33:21, B2:5002)
- Where a report answers this from measurement: `evidence/landing-workflow-traced.md`, section 6, on run `wf_b580ea72-15e` (108.5 minutes, 3.98M tokens): the orientation update took 38.1 minutes and 1.47M tokens; the skill update 7.2 and 0.26M; the page 12.3 and 0.34M; the record stages 49.8 minutes and 1.77M tokens.

**Approvals and refusals of a change to the tools**

| Time | His words | The change |
|---|---|---|
| 2026-10-22 09:23:49 | "yes, build the judge, writer streams and orientation tool" | `913ba1cbfc` |
| 2026-10-26 07:42:15 and 07:48:49 | "Yes, to both rewording of or refinements of P37 and P26." and "Yes, run the text, fix the rerun, yes." | a rewrite of two entries and a test, not the script change (`bedc80b01d`) |
| 2026-10-27 22:13:20 | "Yes please, undo the damage." | `18788035c0` |
| 2026-10-28 20:42:16, 20:55:02 | "Yes, prepare the three additions and show me the wording." / "Yes, apply the three edits and prepare the (trial?) run" | `9a37e8401f` |
| 2026-10-28 22:29:30, 22:37:58 | "Yes, show me the two sentences" / "Yes. Re-run the pilot." | `9a27211250` |
| 2026-11-02 00:29:16 | "Yes to all eight" | `f44cf4ec28` (incl. default 6, later reversed) |
| 2026-11-02 21:20 (comment) | "LGTM" on rule 17 with rules 18, 19 and 21 | the coordinator skill's text on the record-landing workflow |
| 2026-11-03 06:20:02 | "So you should let those workers commit directly" | `a1d0d63c69`, `b18a3a06d8` |
| 2026-11-05 12:19 (comment) | "this proposed change is approved with a caveat ..." | `6edff99a78` |
| 2026-11-06 10:42 (comment) | "LGTM." | `551b028584` |
| 2026-11-10 05:41:41, 07:40:32 | the Fable week | `9a0f69e01a` |
| 2026-11-24 00:10:18 | "Apply changes to the health rule ... Like everything until 70." | the skill part of `5e6bd1b311` |
| Refusal 2026-11-03 06:10:07 | "So just a proposal in the four steps is rejected as written." (on the coordinator's process change after the landing) | none of the commits |
| Refusal 2026-11-24 07:35:17 | "Regarding your proposal on splitting the index and trimming the facts, reject it." | none of the commits |

## 4. The runs of the record-landing workflow

One line each. Batch, run folder, start (UTC), tool commit at the launch (the last of the two tool folders), changes sorted, minutes overall, then by stage. Columns: Sort, Write, Check, Fix, Judge, Land, orientation (the child workflow, 12 to 14 agents), skill update (Skills, Cold read and Fixes together), Page, Push and Revival page together, tokens written by the agents of the run folder in millions.

| Batch | Run | Start | Tool commit | Changes | Min | Sort | Write | Check | Fix | Judge | Land | Orient. | Skill | Page | Push+Rev. | Tokens (M) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 24 (replay) | 9284ce63-4a1 | 11-02 00:59 | `f44cf4ec2` | 117 | 64.7 | 17.9 | 17.6 | 15.8 | 2.5 | 10.8 | - | - | - | - | - | 1.45 |
| 25 | c21ad72e-68c | 11-03 04:30 | `575d55594` | 70 | 34.5 | 6.3 | 15.4 | 5.6 | 3 | 4.2 | - | - | - | - | - | 0.78 |
| 26 | 513fd6a7-1ae | 11-05 23:29 | `0ab588e3d` | 273 | 73.3 | 8.8 | 16.4 | 8.8 | 3.4 | 7.4 | 1.4 | 13.8 | 7.8 | 4.7 | 0.4 | 1.85 |
| 27 | 7c0f91a7-62c | 11-07 14:01 | `760864d79` | 123 | 158.2 | 21.1 | 15.5 | 18.1 | 2.9 | 13.2 | 1.2 | 61.2 | 13.6 | 9.7 | 1 | 3.69 |
| 28 | 4690d700-6c9 | 11-08 09:22 | `760864d79` | 144 | 147.7 | 18.5 | 18.4 | 18.7 | 3.1 | 9.4 | 3.1 | 47.7 | 14.9 | 13 | 0.6 | 3.62 |
| 29 | 450f4ab6-51d | 11-09 09:30 | `760864d79` | 196 | 203.0 | 31.4 | 24.8 | 19.2 | 2.7 | 12.4 | 0.8 | 77.2 | 16.5 | 16.4 | 1.3 | 4.64 |
| 29b | b5fa84b2-fbe | 11-10 01:15 | `760864d79` | 135 | 161.2 | 22.8 | 16.1 | 17.4 | 2.9 | 11.6 | 0.7 | 61.1 | 14.1 | 12.7 | 1.5 | 3.99 |
| 30 | bba18fa4-883 | 11-10 13:03 | `9a0f69e01` | 90 | 4915.7 | 14.9 | 18.6 | 5.6 | 3.4 | 4.1 | 4.4 | 4842.6 | 10.8 | 9.1 | 2.1 | 2.62 |
| 32 | f25357fb-f86 | 11-16 05:59 | `9a0f69e01` | 93 | 91.4 | 10 | 19.2 | 8.4 | 2.7 | 4.6 | 1 | 23.1 | 11.5 | 8.8 | 2 | 2.59 |
| 31 | 0ba70a19-5f8 | 11-17 06:04 | `4569e7c59` | 79 | 146.5 | 23.1 | 15.5 | 15.9 | 2.7 | 9.7 | 0.6 | 44.3 | 15.7 | 18.3 | 0.7 | 4.44 |
| 31b | f428fe5b-2d0 | 11-17 10:49 | `2c7990ace` | 182 | 173.0 | 20.2 | 17 | 13.2 | 3.4 | 6.5 | 0.7 | 106.5 | 4.7 | - | 0.8 | 3.47 |
| 33 | d55ec738-a36 | 11-17 23:12 | `2c7990ace` | 172 | 151.3 | 19.7 | 17 | 15.9 | 2.7 | 9.1 | 0.8 | 53.1 | 13.1 | 18.4 | 1.6 | 4.01 |
| 33b | 42295207-c9a | 11-18 07:13 | `2c7990ace` | 125 | 125.6 | 22 | 14.1 | 14.9 | 2.8 | 7.8 | 0.6 | 36.4 | 10.1 | 15.5 | 1.5 | 3.71 |
| 34 | df6b93cb-3bf | 11-20 19:51 | `2c7990ace` | 77 | 123.2 | 16 | 14.1 | 13.1 | 2.3 | 11.5 | 0.6 | 41.9 | 10.5 | 11.9 | 1.3 | 3.41 |
| 34b | a4427a24-bae | 11-21 01:40 | `2c7990ace` | 83 | 89.8 | 16.2 | 13.7 | 14.5 | 2.2 | 10.3 | 0.7 | 5.8 | 12.9 | 13.1 | 0.6 | 2.39 |
| 35 | ec454fa0-c7d | 11-23 15:02 | `403a0e60c` | 232 | 141.4 | 23.4 | 15.4 | 16.1 | 2.4 | 7.6 | 3.1 | 44.8 | 8.7 | 19.4 | 0.6 | 3.73 |
| 35b | 0b1e2863-560 | 11-23 21:15 | `49a9f1fcb` | 52 | 102.6 | 13.2 | 6.9 | 9.6 | 2.3 | 8.5 | 0.6 | 35.3 | 10 | 15.7 | 0.4 | 3.42 |
| 36 | b580ea72-15e | 11-24 07:23 | `5e6bd1b31` | 93 | 108.5 | 16.6 | 12.3 | 11.2 | 1.8 | 7.3 | 0.8 | 38.1 | 7.2 | 12.3 | 1 | 3.32 |

Notes on the table:
- 24 (replay) ran at `f44cf4ec28`, before the eight fixes. Its tokens with the two headless writers were 2.06M (`record-landing-replay-24.md`, section 6). The hand route for batch 24, on 2026-10-31, took 31 minutes and 0.63M tokens for two workers (same note).
- Batch 25 is the first real landing. It ran on `575d555945`.
- Batch 26 is the first with the Land stage, the orientation child and the five stages of block 10. Batch 27 is the first with the Revival page stage.
- Batch 30's total (4,915.7 minutes) includes a stop of the session from 11-10 to 11-13; its orientation stage is 4,842.6 minutes of which the work is not separable. Batches 30 and 32 ran in the Fable week (block 20).
- Batch 31's revival stage stopped with exit 2 (block 22, the commit message of `2c7990acea`). Batch 31b has no Cold read, Fixes or Page stage in its journal; the journal does not say why.
- Batches 29, 31b, 33, 35 and 35b were resumed at least once after a stop (`resumeFromRunId` in the transcript); batch 29 lost about 10 minutes to a container restart (the coordinator's answer of 12:40:46).
- Batch 36 (11-24): the traced note counts 3.98M tokens with the headless streams. The agents alone: 3.32M.
- Fully counted figures from other notes: the landing work of batches 33, 33b and 34 wrote 4.80M, 4.42M and 4.05M tokens; of batch 34's 4.05M the record was 1.64M, the orientation update 1.40M, the skill step 0.28M, the page of `fortress-repo` changes 0.50M and the revival page 0.23M (`explorations/reviews/process-dead-ends-2026-11-23.md`, "The common cause").

**How the length moved.**
- Replay of batch 24, five stages: 64.7 minutes. Batch 25, the same five stages after the eight fixes: 34.5 minutes (70 changes sorted).
- Batch 26, with the Land stage, the orientation child and five skill-chain stages: 73.3 minutes. Of those, the five original stages took 44.8, the Land stage 1.4, and the orientation update, skill update, page and push 26.7.
- Batches 27 to 36, 12 stages: 89.8 to 203.0 minutes (batch 30, which stopped, excepted). In the 15 runs after batch 25 without batch 30 (batches 26 to 36), the mean total is 133.1 minutes. The five original stages (Sort to Judge) have a mean of 60.8 minutes (40.5 to 90.5). The stages after the judge have a mean of 72.3 minutes, 53 percent of the total.
- The five original stages grew from 34.5 minutes (batch 25) to a mean of 60.8. The number of changes sorted ranged from 52 (batch 35b) to 273 (batch 26).

## 5. The stages of today against the stages of the first good run

**Clarity workflow.** The stage list is the same as at `913ba1cbfc`: Assess (FACTS only), Write, ColdRead, Check, Fix, Reread, Judge. No stage was added or removed after it. Four brief clauses were added after it (block 4 and block 5): the findings input in `writer.md`, `check.md`, `judge.md` and `README.md`; the writer's reason clause; the checker's source clause; the clause that a ground's dates, counts, commits and file names stay out of the entry. `args.extra` was added and taken out (blocks 2 and 3). Nothing else changed in the folder except `words-subset.py` (block 1) and one README sentence (block 15).

**Record-landing workflow.**

| Today's stage | In the first good run (`575d555945`)? | New since | What it added to a run's length (the 15 runs of batches 26 to 36 without 30) |
|---|---|---|---|
| Sort | yes | no (its brief changed once, `5e6bd1b311`: file only questions; its evidence file `plan.md` gained the whole stale list, `36ce6e303c`) | 18.9 minutes mean (8.8 to 31.4); 6.3 in batch 25 |
| Write | yes | no (the routing brief changed, `5e6bd1b311`) | 15.8 mean (6.9 to 24.8); 15.4 in batch 25 |
| Check | yes | no (the checker's brief changed, `5e6bd1b311`) | 14.3 mean (8.4 to 19.2); 5.6 in batch 25 |
| Fix | yes | no | 2.7 mean (1.8 to 3.4); 3.0 in batch 25 |
| Judge | yes | no (its brief gained: `b18a3a06d8`, `9df988bf4b`, `5e6bd1b311`) | 9.1 mean (4.6 to 13.2); 4.2 in batch 25 |
| Land | no | `a1d0d63c69` (11-03) | 1.1 mean (0.6 to 3.1) |
| Orientation update (child workflow, `orientation.js` update mode: admission, write, preserve, cold read, quiz author, two quiz readers, two quiz graders, fix, reread, judge) | no (a manual step of the coordinator) | `a1d0d63c69` (11-03) | 46.0 mean (5.8 to 106.5), median 44 |
| Skills | no | `6edff99a78` (11-05) | with Cold read and Fixes: 11.4 mean (4.7 to 16.5) |
| Cold read | no | `6edff99a78` | (in the 11.4) |
| Fixes | no | `6edff99a78` | (in the 11.4) |
| Page | no | `6edff99a78` (11-05), brief changed by `2cb97b6a3c`, `0ab588e3d6`, `e95fd785e5`, `adbbf2051a`, `760864d794` | 13.6 mean (4.7 to 19.4) |
| Push | no | `6edff99a78` | 0.3 mean (0.2 to 0.5) |
| Revival page | no | `b88d26f52e` (11-06) | 0.7 mean (0.2 to 1.5) |

Other files that are new since the first good run: `skills.sh`, `folders.sh`, `skill-task.md`, `skill-fixes.md`, `page.md`, `revival-publish.md`. Scripts changed: `checks.sh`, `evidence.py`, `plan-moves.py`, `queue-check.py`, `final.sh`, `ledger.py` (`note --check`). Briefs of the five original stages changed after `575d555945` only in `judge.md`, `routing.md`, `sort.md` and `check.md`. `entries.md` is unchanged since `575d555945`.

The new stages that cost the most minutes are the orientation update (mean 46.0 of the 72.3 after the judge), the page (13.6) and the skill update (11.4). In the mean run, the stages that were in the first good run took 60.8 of 133.1 minutes.

## 6. What I could not find

- The curator's yes or no for: `bedc80b01d` (the script change; only the rewrite was approved), `575d555945` (the eight fixes), `36ce6e303c`, `49a9f1fcb1`, and the tool edits of `5e6bd1b311`. For `6026231ff5` and `3747769992`, no telling at all.
- Whether the two brief changes that the coordinator named at 04:55:46 on 11-06 (`entries.md` for `rows.add`, `judge.md` for `final.add`) were asked of him later. Git shows no commit of them after `36ce6e303c`.
- Why the `913ba1cbfc` message writes "his yes of 10:0x UTC": the transcript's yes is at 09:23:49 (A2:9229), five minutes before the commit. I did not find another yes at 10:0x.
- The headless writer streams' tokens for batches 25 to 36 and the skill writer's tokens. They are not in the run folders. Only batch 24 (2.06M in all) and batch 36 (3.98M in all) have a fully counted figure in the notes.
- A pair of runs that isolates one change's effect on length. The batches differ in size (52 to 273 changes sorted) and the changes landed between runs. I report the numbers before and after, with the sizes.
- The stage minutes of batch 30's orientation update: the run stopped for three days inside it.
- The orientation workflow's own commits (it has its own folder, `tools/orientation/`) are not in this file, except where a landing commit touched it (`9a0f69e01a`, `4569e7c59c`, `5e6bd1b311`).
- Clarity runs' token counts after 10-22: not computed. Run times are in section 1.1 and blocks 2 to 5.
- A later asking of "why does the landing take so long" than 2026-11-09 12:39:53 and 11-24: I searched his messages and page comments from 10-18 to 11-24 for the words "so long", "takes long" and "how long" and found only these.
