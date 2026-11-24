<!-- This folder is a draft of the batch mode of the record's consolidation as one Workflow script, `record-batch.js`, which runs the steps around the clarity workflow and starts the clarity workflow itself for the writing, with one brief for each of its stages, for the curator's review; at his yes it moves to `explorations/coordinator/tools/record-batch/`. Written 2026-11-24 by an Opus worker for the coordinator, from `../../WORKFLOW-DIFF.md`, sections 0.2, 1.3 and 3.2 and adjustments 14 to 20 of section 7. Nothing in it has run. -->

# The batch mode of the record's consolidation, as one workflow (a draft)

## Terms

- **The record**: the project's memory under `explorations/coordinator/`. Here it means `FACTS.md`, what is established about the tree, and `POSITIONS.md`, the curator's decisions. The curator is the person in charge of the project. The coordinator is the session that runs the workers.
- **Entry**: one numbered line of the record, such as `F-87` or `P-48`. Its earlier texts are in `FACTS-history.md` or `POSITIONS-history.md`.
- **Consolidation**: a rewrite of entries so that each holds one subject, states the present, and reads on its own (`.claude/skills/coordinator/references/record.md`, "What an entry is" and "A consolidation"). The **incremental mode** consolidates what one landed batch wrote; it is the record-landing workflow. The **batch mode** goes over the whole record in chunks; it is this folder.
- **Chunk**: a set of entries that one writer rewrites together.
- **The clarity workflow**: the Workflow script `explorations/coordinator/tools/record-clarity/record-clarity.js`. For each chunk it runs an assessor, a writer, a cold read, a check, a fix round, a second cold read and a judge, and it hands back one folder for each chunk with an **apply file**, `final.apply`: the new entry lines, each with a provenance line, which `explorations/coordinator/tools/record.py apply` writes into the record. It applies nothing itself.
- **Stage**: one step of this workflow. A **way in** is a choice of the run's first and last stage. A **stop** is a stage after which the run always ends, because the curator or the coordinator acts next.
- **Child run**: a Workflow run that a script starts with `workflow()`. It runs inside its parent's run and shares the parent's limit of two agents at once (`.claude/skills/coordinator/references/delegating.md`, "The Workflow tool").
- **Writer stream**: the headless Opus session that writes a clarity run's chunks one after another (`record-clarity/writer-stream.sh`).
- `references/record.md` and `references/delegating.md` are parts of the `coordinator` skill, under `.claude/skills/coordinator/`.

## What it is for, and when it runs

The batch mode consolidates the whole record. It ran twice: on 2026-10-13, when FACTS and POSITIONS went from 361K to 200.6K characters, and on 2026-10-22, the clarity rewrite (`../../WORKFLOW-DIFF.md`, 0.2). Its middle step, the writing, is the clarity workflow. The steps around it were launched by hand, from briefs that were then lost: in October, and again on 2026-11-24. This script holds those steps, so that the next consolidation of the whole record is a run of a tool.

It runs when the record drifts: when entries hold claims of several subjects, keep stale or replaced text, or the whole has grown. The curator's word is "If the record starts drifting again" (`../../HIS-WORDS.md`, 4.2). No measure of drift is set (`../../WORKFLOW-DIFF.md`, section 4, gap 5). It runs only when the coordinator starts it; no landing starts it.

## The stages, in order

| Stage | Input | Output, under `out` | Who acts next |
|---|---|---|---|
| `claims`, the sorting, step 1 (optional) | the record as it stands, cut in chunks (`record`); earlier checks (`checks`, optional) | `sorting/claims-<chunk>.md`, one file for each chunk, each committed and pushed by its worker | the map, in the same run |
| `map`, the sorting, step 2 (optional) | the claims files; the test's scenarios (`scenarios`); entries the curator asked about (`asked`) | `sorting/MAP.md` and `map.json`, committed and pushed; the run's result holds the chunks, the pilot's cases and the second round's chunk | the scouts, in the same run |
| `scouts` | the chunks of the writing stage that this run reaches; the commit to read (`base`) | `chunks/<chunk>/scout.md`, one for each chunk | that writing stage, in the same run |
| `pilot-1`, the pilot's first round (stop) | the mix of cases that the map names (`pilot`, or the map of this run) | `chunks/pilot-1/`: the clarity workflow's files, with `final.apply` and `queue.md` | the coordinator: the page, the curator's go, the test on the pilot |
| `pilot-2`, the pilot's second round (stop) | one whole chunk (`chunks`) | `chunks/<chunk>/` | the coordinator: the page, the curator's go |
| `chunks` (stop) | this run's share of the chunks (`chunks`), its own writer stream (`stream`) | `chunks/<chunk>/` for each chunk | the coordinator applies each chunk |
| `test`, the test of decisions | the old entries' commit, and the new entries' commit or apply files (`test`); the scenarios | `test/`: the filled scenarios, `grade/answers-X.md` and `answers-Y.md`, `grade/grades.md`; the result says which of X and Y is the new entries | the leave step, in the same run, or the coordinator with `to: 'test'` |
| `leave` (stop) | the entries that leave (`leave`, or the map's dispositions) | `leave/`: an apply file, checked on a copy | the coordinator applies it |
| `sweep` (stop, where needed) | the record on `main` | `sweep/scrape.apply`, `backlinks.md`, `sizes.txt` | the coordinator applies it |

What each stage does:

1. **`claims`**: one Opus worker for each chunk of the record as it stands lists each entry's claims, each claim's subject and kind, and the entries that say the same. Brief: `briefs/claims.txt`.
2. **`map`**: one Opus worker, at `xhigh` effort, joins the claims files into one map: the subjects, the groups of overlap, each entry's disposition (stays, rewritten, merged into F-n, split, defect to a ledger row, not about the tree), the chunks for the writers, 20 to 32 entries each, and the pilot's cases. Brief: `briefs/map.txt`.
3. **`scouts`**: one Sonnet scout for each chunk gathers, for each entry, whether each report, test and ledger row that it cites exists, the heading that holds its detail, its commits, its earlier texts and the entries that cite it. Brief: `briefs/scout.txt`. The scouts always run right before a writing stage, on its chunks, unless `scouts: false`.
4. **`pilot-1`**: the clarity workflow, as a child run, on one chunk named `pilot-1` that holds every entry of the map's cases: one entry with several subjects to split, entries to merge, an entry with a defect, a stale entry, a sound entry, one whole subject. The run stops.
5. **`pilot-2`**: the clarity workflow on one whole chunk, the one the map names for the second round. The run stops.
6. **`chunks`**: the clarity workflow on this run's share of the chunks. Several runs go side by side, each with its own share and writer stream. Each run stops when its share is judged.
7. **`test`**: the record test of `explorations/coordinator/process-engineering/record-test/`, with the scenarios of its folder `2026-11-24/`: one Opus worker makes the two copies and fills the scenarios (`briefs/test-copies.txt`), two Opus readers answer, one in each copy (the kit's `brief-reader.md`, unchanged), and one Fable grader grades blind (`briefs/test-grader.txt`). In the kit's first run, each reader wrote about 0.4M tokens and the grader 0.75M.
8. **`leave`**: one Opus worker writes the apply file that takes out of the record each entry that is not about the project, where a skill already holds its rule. Brief: `briefs/leave.txt`.
9. **`sweep`**: one Opus worker writes the apply file that deletes state words ("Built.", "Still to build:") and pointers to PLAN and the review queue, and checks that it only deletes, with `explorations/coordinator/tools/record-clarity/words-subset.py`. Brief: `briefs/sweep.txt`.

Each brief file says which brief it comes from. The script only orders the stages and fills each brief's placeholders in the launch message: `@SORT@ = /abs/folder/` and so on.

## How to run it

The arguments:

- `out`: the batch folder, absolute, ending in `/`. Put it inside an `evidence/` folder, such as `explorations/coordinator/consolidation-2026-12-01/evidence/`, so that its files need no INDEX line (`references/record.md`, "INDEX and the gap ledger"). Every run of one consolidation takes the same `out`.
- `from`, `to`: the first and the last stage, of `claims`, `map`, `scouts`, `pilot-1`, `pilot-2`, `chunks`, `test`, `leave`, `sweep`. `from` is `claims` by default. A run ends at the first stop in its range, whatever `to` says.
- `base`: the commit of `main` whose record the scouts read; give `main`'s head at the launch.
- `kind`: `facts`, by default, or `positions`, for the scouts and the clarity runs. The sorting reads FACTS only.
- `record`: for `claims`, the record as it stands, cut in chunks: `[{ name, entries }]`. A list like the one of 2026-11-24 serves: `python3 -c "import json; d = json.load(open('chunks.json')); print(json.dumps([{'name': k, 'entries': v['entries']} for k, v in d.items()]))"` on `../../evidence/consolidation/chunks.json`.
- `checks`: for `claims`, the files of earlier checks of those entries, such as a scouts' file or a list of stale claims (optional).
- `asked`: for `map`, entries that the curator asked about (optional).
- `scenarios`: for `map` and `test`, the folder of the test's scenarios, absolute, ending in `/`.
- `pilot`: for `pilot-1` when the map does not run in the same run, the entries of the mix.
- `chunks`: for `pilot-2`, the one chunk of the second round; for `chunks`, this run's share. Each `{ name, entries }`, the names different across all runs.
- `stream`: the clarity run's writer stream. Give each run side by side its own.
- `scouts`: `false` when an earlier run already wrote each chunk's `scout.md`.
- `test`: `{ p, q, x }` or `{ p, applies, x }`. `p` is the commit of the old entries; `q` the commit of the new ones, or `applies` the apply files that make them in a copy of `p`; `x` says which copy the grader sees as X, `new` (the default) or `old`.
- `leave`: the entries that leave (optional; by default, each entry that `sorting/MAP.md`, section 5, marks as not about the tree).

The script checks every argument before its first agent and names each one missing.

`S` stands for the script's path, `/home/user/fortress/explorations/coordinator/postmortem-2026-11-24-record-regrowth/adjustments/record-batch/record-batch.js`, and `O` for the batch folder.

**With the sorting**, for a record whose entries are not sorted by subject. It runs `claims`, `map`, the scouts of the pilot's mix and `pilot-1`, then stops:

    Workflow({ scriptPath: S, args: { out: O, base: '<main head>', stream: 'batch-pilot',
      record: [{ name: 'exec', entries: ['F-7', 'F-9', ...] }, ...],
      checks: ['/home/user/fortress/explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/stale-claims.md'],
      asked: ['F-63'],
      scenarios: '/home/user/fortress/explorations/coordinator/process-engineering/record-test/2026-11-24/' } })

Add `to: 'map'` to stop after the map and read it first; then start the next run `from: 'scouts'`, with `pilot` from the result's `map.cases`.

**Without the sorting**, for a record already sorted by subject. The coordinator names the pilot's cases and cuts the chunks by section, 20 to 32 entries each (`references/record.md`, "A consolidation"). It runs the scouts of the mix and `pilot-1`, then stops:

    Workflow({ scriptPath: S, args: { from: 'scouts', out: O, base: '<main head>', stream: 'batch-pilot',
      pilot: ['F-252', 'F-53', 'F-396', 'F-63'] } })

**The pilot only.** Both calls above stop after the first round. The second round, after the curator's go on the first, runs the scouts of one chunk and `pilot-2`, then stops:

    Workflow({ scriptPath: S, args: { from: 'pilot-2', out: O, base: '<main head>', stream: 'batch-pilot',
      chunks: [{ name: 'harness', entries: ['F-99', 'F-107', ...] }] } })

**The chunks, after his go on the second round.** Share the other chunks evenly among several runs, write each run's exact arguments into `O/runs.json`, and launch the runs side by side, as `references/delegating.md`, "A long writing pass", says. Each runs the scouts of its share and the clarity workflow on it, then stops:

    Workflow({ scriptPath: S, args: { from: 'chunks', out: O, base: '<main head>', stream: 'batch-a',
      chunks: [{ name: 'checker-1', entries: [...] }, { name: 'checker-2', entries: [...] }] } })
    Workflow({ scriptPath: S, args: { from: 'chunks', out: O, base: '<main head>', stream: 'batch-b',
      chunks: [{ name: 'landed-1', entries: [...] }, ...] } })

**The test on the pilot**, while the curator reads the first round:

    Workflow({ scriptPath: S, args: { from: 'test', to: 'test', out: O, scenarios: '<as above>',
      test: { p: '<main head>', applies: ['<O>chunks/pilot-1/final.apply'], x: 'new' } } })

**The test on the result, then the leave step**, once every chunk is applied on `main`:

    Workflow({ scriptPath: S, args: { from: 'test', out: O, scenarios: '<as above>',
      test: { p: '<main before the first chunk was applied>', q: '<main now>', x: 'old' } } })

**The sweep**, where the chunks left state words: `{ from: 'sweep', out: O }`. The leave step alone: `{ from: 'leave', out: O }`.

A killed run is resumed, not launched again: the same script path and the same arguments, byte for byte, with `resumeFromRunId` (`references/delegating.md`, "Interrupts and process stops").

## After each stop

The run's result ends with `next`, one line on what the coordinator does. In full:

- **After `map`, if the run stopped there**: read `MAP.md`; its first two sections are for the curator. Then the first round, from `scouts`.
- **After `pilot-1`**: make a page of the round (the `coordinator` skill, `SKILL.md`, "Pages"): each entry of `chunks/pilot-1/final.apply` with its new text, its current text collapsed, and what changed and why, from `proposals.md` and `judgement.md`; the held entries from `queue.md`. Send it to the curator and wait for his go. Apply nothing before it (`../../HIS-WORDS.md`, 4.8). Meanwhile run the test on the pilot. On his go, apply `final.apply` as the clarity README says, "After a chunk".
- **After `pilot-2`**: the same page for the chunk, which he skims; on his go, apply it. Then share the other chunks among runs side by side.
- **After `chunks`**: as each run ends, apply its chunks one after another, by the clarity README, "After a chunk": `final.apply` on a copy of the record, `record.py check --base`, then on `main`; commit the record with the chunk's files, `scout.md` among them; push; file `queue.md` in the review queue; merge `concepts.md` into the concepts list that the orientation workflow reads. A chunk that splits or merges an entry that another chunk also changes goes first (the map's section 6 names the order). Measure the size of FACTS and POSITIONS after each chunk (`../../WORKFLOW-DIFF.md`, 3.2, item 4).
- **After `test`**: the result's `x` says which of X and Y is the new entries. Read `test/grade/grades.md` and report by "the new entries" and "the old entries" (the kit's README, step 9). If something critical is lost, find the middle ground entry by entry (`references/record.md`, "A consolidation").
- **After `leave`**: apply the file in `leave/` on a copy, `record.py check --base`, then on `main`; commit and push. List the entries that it kept because no skill holds their rule.
- **After `sweep`**: apply `sweep/scrape.apply` the same way; add the entry's number to each PLAN item or queue item that `backlinks.md` lists as missing it.

## What it reuses from the clarity workflow, and what it leaves to the coordinator

It reuses the clarity workflow whole, unchanged: its script, its briefs, its seven stages for each chunk, its writer streams, its folder for each chunk, and its README's "After a chunk". The script starts it as a child run, as `record-landing.js` starts the orientation update: `workflow({ scriptPath: '.../record-clarity/record-clarity.js' }, { kind, out, stream, chunks })`, with `out` the batch folder's `chunks/`. The scouts write `scout.md` into the same chunk folder before the child run starts.

A child run shares its parent's two agents at once. So the chunks go side by side as several runs of this script, each with one child run, and not as several children of one run.

It leaves to the coordinator:

- the curator's go after each round of the pilot, and the page that he reads;
- every write to the record on `main`: each `final.apply`, the leave step's file and the sweep's file, applied with `record.py`, checked, committed and pushed;
- the shares of the chunks among runs, and `runs.json`;
- the review queue and the concepts list, from each chunk's `queue.md` and `concepts.md`;
- the decision on each held entry, and the size of the record after each chunk;
- unblinding the test.

No agent of this script writes the record. The claims and map workers commit and push their own files in `sorting/`, as their briefs of 2026-11-24 did.

## Where the briefs come from

**Taken word for word, but for the changes listed:**

- `briefs/scout.txt`: October's scouts' template of 2026-10-13, `../../evidence/october-briefs/03-scouts-template.md`. Two changes: an entry's number is now its `F-n` or `P-n`, where October's brief took its line number at a commit (the entries had no numbers yet); and the commit `715641924` is now `@BASE@`.
- `briefs/sweep.txt`: the brief of the scrape of 2026-10-22, "Scrape status out of the record", copied from the transcript (part `B/002`, line 10748, of the folder `fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-11-07T23-09.jsonl.parts/` under `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/`); its result was commit `3822898328`. Three changes: that day's two exceptions cut (F-112's source, and F-238 and F-223 repointed), the sentence on their check cut to "Fix every failure.", and its folder made `@OUT@`.
- `briefs/test-grader.txt`: the kit's `brief-grader.md` of 2026-10-13, with the four changes that `record-test/2026-11-24/README.md`, "What the kit's grader brief needs changed", gives. "The same twelve scenarios" is written "the same scenarios", so that the brief fits any set.
- The readers' brief is the kit's `brief-reader.md`, used in place, unchanged.
- `briefs/claims.txt`: the coordinator's brief of 2026-11-24, `../../evidence/sorting-map/brief-claims.md`. Four changes: "339 entries" cut; the chunks come in the launch message, not from that night's `chunks.json`; that night's scouts' files and list of stale claims are now `@CHECKS@`; its output folder is now `@SORT@`.
- `briefs/map.txt`: the coordinator's brief of 2026-11-24, saved word for word as `../../evidence/sorting-map/brief-map.md`. Changes: that night's counts ("339", "six workers", "twelve files") cut; its paths now `@SORT@`, `@CLAIMS@` and `@SCENARIOS@`; "Include F-63 if it fits a case, since the curator asked about it." now `@ASKED@`, filled from `asked`; "in the morning" cut.

October had no brief for the sorting of FACTS: its sections already stood by area, and the model of the sorting is the gap ledger's grouping of 2026-10-08 (`../../WORKFLOW-DIFF.md`, B1). So the two sorting briefs are tonight's.

**Kept in part:** `briefs/leave.txt`, from October's "Step 12: retire the old homes", `../../evidence/october-briefs/07b-step12-brief-as-edited.md`. Kept: the role line's form, the goal with the curator's words of 2026-10-13, "leaves now only where its rule already stands in that skill as it is today; otherwise it stays, and you list it with its home", the grep before each removal, the note that names the home, and the empty headings. Cut, as October's own: the outline of the coordinator skill that was its map of homes, the clauses marked "(moves to ...)", the rewrite of the record's header comments, the README and the protocol, INDEX and HELD. Changed:
  1. What leaves is `@LEAVE@`, limited to entries that are not about the project, by the curator's word of 2026-11-24 (`../../HIS-WORDS.md`, 5.3; `../../WORKFLOW-DIFF.md`, B8).
  2. October's worker applied its file on `main` and committed. Here it writes the file and checks it on a copy, in the words of the sweep's brief of 2026-10-22, and the coordinator applies it.
  3. October said to replace a pointer to a removed entry "by the skill's file and section in words". That would make a fact cite a skill, which the curator's word of 2026-11-24 forbids ("Facts can never cite skill."). The draft keeps only "drop it where the sentence stands without it", and the worker lists each pointer that it cannot drop. This change is his to confirm.

**New:**

- `briefs/test-copies.txt`: a wrapper with no rule of its own. It hands one worker the kit's README, "How to run it", steps 1 to 5, with the changes of the scenarios folder's README, and the values of the run. It also has the worker copy `questions.md` and `key.md` into the test folder, where the grader's brief looks for them.
- In the script: the order of the stages and its stops; the map returning its chunks and cases as data, through a schema, beside the final message that its brief asks for; the scouts' file in the chunk folder, as the diff's adjustment 15 names it; the pilot's mix run as one chunk named `pilot-1`; the readers writing their answers straight to `answers-X.md` and `answers-Y.md`, by `test.x`, where the kit's step 7 copied them after, with the arms given in the run's result instead of a file.

**Not used:** October's writers' briefs (`05`, `05b`, `06` in `../../evidence/october-briefs/`). The clarity workflow's writer takes their place, since the clarity workflow is the batch mode's way in (`../../WORKFLOW-DIFF.md`, 3.2). The October writers' goal and measure are adjustment 16 of `../../ADJUSTMENTS.md`, a change inside the clarity writer's brief, not here. The two trials of 2026-10-13, `01` on the largest entries and `02` on pairs of FACTS and POSITIONS entries on one ground, made the definition of an entry; the diff counts that step as done once (B2).

**Where October's scout brief and today's differ.** Today's form is `../../evidence/consolidation/scout-brief.md`. The draft keeps October's words. Today's brief also:

- prints each entry and its history by number (`facts-extract.sh 'F-87'`, `'history:F-87'`), and finds the entries that cite it by number (`grep 'F-87\b'`), with the files under `.claude/skills/`. October's finds the earlier texts and the citing entries by the title's opening words;
- gives the commit from the history's first block, where October's gives the first and the last commit by `git log -S` on the title;
- checks each test, file, script and path that the entry names, and whether the entry's words about a ledger row agree with the row's status now ("Exists today");
- greps the worker skill and FACTS for two or three of the entry's key terms, and quotes each place that says the same ("Said elsewhere");
- gives the curator's dated words for any entry, where October's does it for POSITIONS only;
- says to write no opinion on what to cut, to run no build, suite or test, to commit nothing and to launch no agents; its final message lists the entries with something not found or in disagreement, where October's is one line.

## How it was checked

- The harness's parse, as `explorations/coordinator/tools/workflow-scenarios.js` does it: the script's text, with `export const meta` made `const meta`, is accepted as the body of an async function. `node --check` passes. The script holds no backtick and no non-ASCII character, its `meta` is a pure literal, and every `phase()` title is in `meta.phases`.
- A dry run of twelve ways in, the script run with its hooks stubbed: the agents and the child run that each way in starts, in their order; each launch message names a brief that exists and gives every placeholder of that brief, and only those, with nothing undefined; the child run gets the clarity script, `out` + `chunks/`, a stream and named chunks. Ten wrong sets of arguments are refused before any agent starts, each naming what is missing. A claims worker or a map that returns nothing ends the run before the next stage.

## What a first run must prove

Nothing here has run. A first run must show:

1. That the clarity workflow runs as a child of this script. `record-landing.js` starts the orientation workflow that way; no script has started the clarity workflow that way.
2. That the map returns its chunks and its cases through the schema, and that `map.json` and `MAP.md` agree with them.
3. That the clarity workflow holds the map's chunks of 20 to 32 entries. It ran on 10-22 with chunks of 12, and its README says "about ten entries"; `references/record.md` says 20 to 32. If its writer, cold reader or checker cannot hold such a chunk, the map's chunks must be cut smaller with each subject kept in one chunk.
4. That the scouts' files reach the writers. The clarity assessor and writer read `scout.md` only once adjustment 15 of `../../ADJUSTMENTS.md` is applied (its two clauses in `record-clarity/assess.md` and `writer.md`, in `../tools.patch`). Until then the scouts' work, and the map's dispositions, reach the writers only through which entries share a chunk.
5. That October's scout brief, which finds earlier texts and citing entries by the title's words, finds them now that entries cite each other by number.
6. That the claims step works without the morning's scouts' files: on 2026-11-24 its workers copied the checks of the scouts that had run that morning on the record as it stood. In this order the scouts run after the sorting, so `checks` holds only what earlier work wrote.
7. That the claims and map workers can commit and push from inside a Workflow run while other agents commit to `main`; their briefs follow the `fortress-repo` skill's `references/committing.md` for that.
8. The test stage end to end: the copies made by one worker from the kit's steps, a second test after a first (the copies `/home/user/record-test-p` and `-q` may still exist), and the readers' answers written straight under X and Y.
9. The leave and sweep briefs after their changes; the sweep's list of words to delete is that of 2026-10-22.
10. `kind: 'positions'` for the scouts and the clarity runs; the sorting is for FACTS only.

## What waits for the curator's word

- His yes to this draft. At the move to `explorations/coordinator/tools/record-batch/`, the script's constant `B` changes to the new briefs folder. The briefs are `.txt` here so that `check-index.sh` does not count them as notes without an INDEX line; under `tools/`, which that check skips, they can take `.md` like the other tools' briefs. `tools/tier-mode.sh` does not switch this script, as it does not switch the clarity workflow's.
- Adjustment 15 of `../../ADJUSTMENTS.md`, so that the clarity writer reads the scouts' files (above, item 4), and whether the map's lines for a chunk reach its writer the same way.
- The Fable grader of the test stage. The kit has a Fable grader. `references/delegating.md`, "Which tier runs what", gives a go in advance to four kinds of Fable work, and the record test's grader is not among them.
- The leave brief's third change, on pointers to a removed entry.
- Which of today's scout items, if any, he wants beside October's.
