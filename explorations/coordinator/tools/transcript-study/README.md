<!-- The scripts of the process-engineering study's measuring notes (labor, checking-roles-cost, context-study, testing-practices), recovered from the transcripts of the workers that wrote them, with the proof that they are the same scripts, a runner for other batches, and the measure the old studies lacked (which skill a worker loads and which of its parts it reads). harness-cache-cost's scripts could not be recovered: that worker's transcript is in neither folder. -->

# The transcript-study tools

These are the scripts that measured where a climb batch's tokens go. The notes that used them said, each, that their scripts were in a scratch folder and not committed, and the folder is gone. They are recovered here from the transcripts of the `Agent`-tool workers that wrote the notes, and a later worker (2026-10-09, `process-engineering/skill-effect.md`) ran them again on the batches they had measured, to show that they are the same method, and then on batches 11 to 13.

This is the study's reusable process: a post-batch review runs `run-study.py` (and `skill-load.py`, `batch-measures.py`) on the new batch and the batches before it, and compares (section "Use in a post-batch review").

## What is here

- `labor/`, `checking-roles/`, `context-study/`, `testing-practices/`: the recovered scripts of the four notes, and in each an `inline/` folder with the programs the author ran as `python3 - <<EOF` and their index.
- `PROVENANCE.tsv`: for each recovered script, its author, the call that created it, the calls that edited it, and the call's place in the transcript.
- `run-study.py`: copies a note's scripts to a working folder, applies the substitutions that other batches need (printed as it goes) and runs them.
- `replay-check.py`: re-runs the author's own calls, in order, and compares each output with the stored result: the proof of sameness.
- `skill-load.py`: new. Per agent of a run: the calls that load a skill and the parts of `.claude/skills/` that it reads.
- `by-batch.py`: new, small. The labor classes of tokens, one column for each batch.

## Whose scripts, and from where

The transcripts are the `Agent`-tool workers' of session `fe616d40` (the coordinating session). They are in the backup copy, `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/agent-<id>.jsonl`; the live folder holds none of these four. A call is written "C n": the n-th tool call of that author, counted from 1 in the order of its transcript, as the notes count them. The authors were found by searching the transcripts for each note's path in a Write, an Edit or a commit.

| Note | Author agent | Task | When | Commit |
|---|---|---|---|---|
| `labor.md` | `a65c4632fd664fceb` | Measure where each role's tokens go | 2026-10-03, 06:44 to 07:16 UTC | `67497a77f` |
| `checking-roles-cost.md` | `aa122ba984c79739f` | Scout: skeptic and judge token use | 2026-10-07, 04:14 to 04:33 UTC | `a8ae6b01c` |
| `context-study.md` | `a291b83dd2cbf44d4` | Context study of batch 10 workers | 2026-10-08, 08:20 to 08:57 UTC | `a81eb954d` |
| `testing-practices.md` | `af6381052a41159c8` | Archaeology of testing practices relearned | 2026-10-08, 11:27 to 11:55 UTC | `9dd86ee7a` |

`harness-cache-cost.md` (commit `2c0fa1291`, 2026-10-08 16:34 UTC) was written by the worker `a73f6b1aaa732ba74`, "Archaeology of harness cache-filling cost" (launched at line 868 of the session's own transcript; its hand-back is at line 994). **Its transcript is in neither folder**: there is no `agent-a73f6b1aaa732ba74` file in the live subagents folder or in the backup, and no other transcript mentions the note's path in a write. Its scripts are not recovered, and none were reinvented. What is on record of its method is its brief (line 868 of the session's transcript) and its hand-back: it walked the Bash calls of the three batches' workflow runs for `harness-one.sh`, `junit.sh`, `ant testFast`, `ant testSystem` and the tracks' classes, took each call's start and end time from the transcript, and read the printed `Time:` lines. `testing-practices/parse.py` and `testing-practices/cat1.py` (calls and their times, per agent) are the nearest recovered scripts, and `testing-practices/cost.py` counts the same kinds of call, but they do not reproduce that note's 120 runs and 248 minutes.

## The recovered scripts


### `labor/` (labor.md, author `a65c4632fd664fceb`)

| Script | Created | Edited | What it does | How to run |
|---|---|---|---|---|
| `j.py` | C 3 | - | lists the agents of each run from journal.jsonl (label, phase) | `python3 j.py` |
| `parse.py` | C 19 | C 33 | reads the agent transcripts of the runs in RUNS into agents.pkl: per turn the usage (one per message id), calls with their results, first message, attachments | `python3 parse.py` |
| `brief.py` | C 21 | - | first_msgs(run, agent): the first user message(s) of an agent; run alone it prints the brief's headings | `python3 brief.py RUN AGENT; imported by inline/c023-0.py, which writes briefs.pkl` |
| `cls.py` | C 28 | C 32 | first command classifier; its helpers (split_heredocs, files_in, kind_of_path, dirkind) are imported by cls2.py | `imported; python3 cls.py also prints a class count` |
| `cls2.py` | C 31 | C 34,C 56,C 90 | the final classifier: splits each Bash command into simple commands and classes it by verb and paths (briefing, record, spec, source, library, tests, search, diff, edits, builds, runs, waits...) | `python3 cls2.py (writes ex.pkl); imported by acct.py` |
| `acct.py` | C 35 | C 36 | the accounting: per turn, new content = context growth; the part the tool results and the call texts explain, the rest is thinking and narration, any excess a cache refill; writes acct.pkl | `python3 acct.py` |
| `tab1.py` | C 37 | - | the table of classes by role (K per agent and share): the answers 1 and 2 and the per-role sections of labor.md | `python3 tab1.py` |
| `topfiles.py` | C 43 | - | the files read most, by role | `python3 topfiles.py` |
| `explore.py` | C 45 | - | reading beyond the brief: each file read is named in the brief, in the briefing it read, on record at the batch's base commit (FACTS, INDEX, maps) or on record nowhere; writes explore.pkl | `python3 explore.py (needs git history for the BASE commits)` |
| `shared.py` | C 47 | - | shared reading: lines of 25 characters or more that an earlier agent of the batch had already been given, split into the same chain and others; writes shared.pkl | `python3 shared.py` |
| `reread.py` | C 49 | - | re-reads within one agent: results that repeat its own earlier results, read-back of its writes, identical commands | `python3 reread.py` |
| `tab2.py` | C 50 | - | one line per agent: writes and the classes in K | `python3 tab2.py` |
| `inbrief.py` | C 52 | - | results whose lines are already in the agent's own brief, by role (first version) | `python3 inbrief.py` |
| `inbrief2.py` | C 53 | - | the same with 50-character windows | `python3 inbrief2.py (needs inbrief.pkl)` |
| `topcalls.py` | C 55 | - | the dearest calls of the agents with the given batch and label | `python3 topcalls.py 8 gather 9 review` |
| `gen_matrix.py` | C 72 | - | the matrix of classes by role in K and in % (the appendix of labor.md) | `python3 gen_matrix.py` |
| `gen_agents.py` | C 74 | - | one line per agent, the classes in K (the appendix block of labor.md) | `python3 gen_agents.py` |
| `inbrief3.py` | C 79 | - | the same with the brief unescaped; the figure labor.md quotes (1% to 4%) | `python3 inbrief3.py` |

### `checking-roles/` (checking-roles-cost.md, author `aa122ba984c79739f`)

| Script | Created | Edited | What it does | How to run |
|---|---|---|---|---|
| `parse.py` | C 21 | - | labor's parse.py with the third run (batch 10) added to RUNS; the only labor script the author edited | `python3 parse.py` |
| `matrix10.py` | C 26 | - | the matrix of classes for batch 10's roles (labor's gen_matrix for one batch); argument 10, anything else prints batches 8 and 9 | `python3 matrix10.py 10` |
| `briefs10.py` | C 28 | - | the first message of every agent of batch 10 into briefs10.pkl | `python3 briefs10.py` |
| `trace.py` | C 33 | - | the calls of one agent in order with writes, class and thinking per turn | `python3 trace.py LABEL BATCH [LIMIT]` |
| `shared10.py` | C 36 | C 37 | labor's shared.py cut down to batch 10 by sed (rung letters NCGW, batch 10); writes shared10.pkl | `python3 shared10.py` |
| `echo.py` | C 43 | C 44 | how much of the sections of a judge's or skeptic's brief reappears in its own calls and ruling or in its tool results (word overlap); BD names batch 10's run | `python3 echo.py LABEL... (the author edited it once after a crash)` |
| `kinds10.py` | C 55 | - | the answers' kinds of work per checking role (start, brief, thinking, record, reports, diff, tree, running, waiting, writing) and the pooled checking roles | `python3 kinds10.py` |
| `echo2.py` | C 56 | - | the same by the brief's headings, with the shared prefix as one row | `python3 echo2.py LABEL...` |
| `explore10.py` | C 61 | - | labor's explore.py made from the text of the batch-10 file by an inline edit; briefsN.pkl as its brief source | `python3 explore10.py` |

The author copied labor's scripts into its own folder (`cp ../labor/*.py .`) and edited only `parse.py` (batch 10 added to `RUNS`). The 17 copies are not repeated here; `run-study.py` lays `labor/` and then this folder over it. `shared10.py` and `explore10.py` are labor's `shared.py` and `explore.py` cut down to batch 10 by `sed` and an inline edit (the rung letters and the base commit).

### `context-study/` (context-study.md, author `a291b83dd2cbf44d4`)

| Script | Created | Edited | What it does | How to run |
|---|---|---|---|---|
| `extract.py` | C 19 | - | one agent's transcript into json: the calls with command, result, size and turn, the turns' usage, the brief | `python3 extract.py AGENT.jsonl OUT.json (the author ran it for every agent of the run into json/)` |
| `trace.py` | C 22 | - | a text trace of one worker from its json: call, class, size, command | `python3 trace.py json/ID.json OUT.txt [WIDTH]` |
| `classify.py` | C 42 | C 43,C 45,C 46,C 47,C 48 | the call classifier: BRIEFING, RCORE (FACTS, POSITIONS, INDEX, ledger), RNOTES, TOOLS, CODE, LIB, SPEC, TEST, GIT, RUN, EDIT, SETUP; WORKERS and EDITS (first edit, first fix edit) hold batch 10's four rung workers | `python3 classify.py W 76` |
| `summarize.py` | C 48 | C 124 | OVR, the author's hand overrides of single calls, and the table of a window's calls by class | `python3 summarize.py` |
| `show.py` | C 50 | - | shows a range of one worker's calls with their results | `python3 show.py W FROM TO CMDW RESW` |
| `L.sh` | C 56 | - | greps the base record (FACTS, POSITIONS, INDEX, ledger, maps) of the batch's base commit for a pattern | `./L.sh PATTERN [MAXLINES], from the working folder that holds base/` |
| `use.py` | C 61 | - | which of the briefing's keys (POSITIONS, FACTS entries) the worker named before the fix edit and anywhere | `python3 use.py` |
| `overlap.py` | C 64 | - | how much of what a worker read by range lies inside the ranges the briefing already printed | `python3 overlap.py` |
| `skeptics.py` | C 94 | - | the skeptics' window before their first probe, by class | `python3 skeptics.py` |
| `final.py` | C 100 | C 123,C 124 | the final class tables: window A (to the first edit) and window B (to the first fix edit): calls, bytes, tokens and share of writes per class | `python3 final.py` |
| `ite.py` | C 101 | - | a worker's whole-run cost in ITE and its brief's | `python3 ite.py` |
| `verdict.py` | C 105 | C 112 | window B by what the call taught: LAB, the author's hand labels of calls (held whole H, in part Y, not on record N, a check V, gate data D, record read R); the table of the note's section 2 | `python3 verdict.py` |
| `savings.py` | C 115 | - | the ITE of each label over the four workers: the 23.5M, and 'held whole + in part + not on record' 0.93M, 4.0% | `python3 savings.py` |
| `gen_tables.py` | C 122 | - | prints the two tables of the note (table-A.md, table-B.md) the author built | `python3 gen_tables.py` |

Setup before the scripts, as the author did it: the first message of each rung worker into `brief-W.txt` ... (inline `c016-0.py`); `extract.py` over every agent of the run into `json/`; the record at the batch's base commit by `git archive 9c9e823d5 explorations | tar -x -C base`; the briefing each worker ran, reprinted from that copy with `facts-extract.sh --root base` (inline `c052-0.py`, `c058-0.py`); then `classify.py`, `summarize.py`, `final.py`, `use.py`, `overlap.py`, `skeptics.py`, `verdict.py`, `ite.py`, `savings.py`, `gen_tables.py`, in the order of the author's calls: `classify.py` (C 42 to 47), `summarize.py` (C 48), `use.py` (C 61), `overlap.py` (C 64), `skeptics.py` (C 94), `final.py` (C 100), `ite.py` (C 101), `verdict.py` (C 105), `savings.py` (C 115 and 124), `gen_tables.py` (C 122), with `show.py` and `L.sh` between. `run-study.py` does not wrap this note: `WORKERS`, `EDITS`, `ROOTS` and the hand labels of `verdict.py` and `summarize.py` are batch 10's four workers'.

### `testing-practices/` (testing-practices.md, author `af6381052a41159c8`)

| Script | Created | Edited | What it does | How to run |
|---|---|---|---|---|
| `parse.py` | C 20 | - | reads the agent transcripts of the runs in RUNS into all.pkl: per agent its calls (command, result, error flag, time), turns and usage | `python3 parse.py` |
| `cat1.py` | C 23 | - | counts, per agent, the calls of 29 kinds (ant targets, harness-one, junit.sh, fortress commands, env.sh, rm of caches...) | `python3 cat1.py` |
| `dump.py` | C 24 | C 27 | prints the build, test and run calls of one agent (index, minutes since its first call, command, result) | `python3 dump.py TAG LABEL-or-AGENT-PREFIX [CMDW RESW]` |
| `errs.py` | C 26 | - | counts build and run errors in the results (BUILD FAILED, NoSuchMethodError, NoClassDefFoundError, relink, resource not found...), per agent | `python3 errs.py` |
| `show.py` | C 37 | - | shows a range of calls of one agent with their results | `python3 show.py TAG LABEL FROM TO CMDW RESW` |
| `cat2.py` | C 43 | - | counts, per agent, the messages of the tool and the harness that the agents met (blocked sleep, command moved to the background, permission refusal, BUILD FAILED, NoSuchMethodError...) | `python3 cat2.py` |
| `cat3.py` | C 48 | - | counts, per agent, the calls that name a given artifact (harness-one.sh, junit.sh, env.sh, the stage drivers, build.xml, FileTests.java, bin/fortress...) | `python3 cat3.py` |
| `cat4.py` | C 55 | - | calls, cost and minutes by kind of call, by role and batch | `python3 cat4.py` |
| `cost.py` | C 79 | - | the ITE cost model (cache write 1.25, read 0.05, input 1, output 5) and the calls of every agent by kind (stage-run, suite-by-hand, harness-one, junit.sh, build, seed/old-code, probe-run, wait/poll, learn-by-reading) with cost and minutes, by role; the 119.5M ITE | `python3 cost.py` |
| `learn.py` | C 80 | - | the calls that read a driver, a harness script or a build file to learn how it runs, by artifact, with ITE | `python3 learn.py` |
| `wrappers.py` | C 92 | - | the shell scripts the agents wrote into their scratch folders to run something, by kind (suite, stage, probe, env, other) | `python3 wrappers.py` |
| `fails.py` | C 101 | - | the failures that recur, matched by the tool's message text: the 120 s default, sleep before another command, the relative scratch directory, the permission check, index.lock | `python3 fails.py` |
| `practices.py` | C 103 | C 104 | the eight practices of the note, each with the calls named by hand (the call numbers are the author's reading) and their ITE; the 'about 3M' | `python3 practices.py` |
| `scripts2.py` | C 117 | - | the stage scripts of practices.py grouped by kind | `python3 scripts2.py` |

### Inline programs

Each `inline/` folder holds the programs the author ran as `python3 - <<EOF` or `python3 -c`, one file for each, named `cNNN-k.py` after the call (C NNN) and the order in that call. `inline/INDEX.tsv` gives for each the call, its place in the transcript, the tool_use id, whether the heredoc was quoted, its length and its first comment or code line. 212 are kept. 18 are not: they only edited the note's own prose (labor 1, checking-roles 3, testing-practices 8, context-study 6) and are not part of the method; the index lists them as "note prose edit, not kept". An unquoted heredoc (`<<EOF`) was expanded by the shell before Python saw it (`$f`, `$S`); the file holds the text as written, and the index says which are unquoted. Programs that edited a script are marked "edits a script"; their effect is in the recovered script. Some inline programs are steps of the pipeline: `labor/inline/c023-0.py` writes `briefs.pkl`, `labor/inline/c059-0.py` is the table of all classes by batch (`by-batch.py` generalizes it), `labor/inline/c060-0.py` is the writes before the first edit, `labor/inline/c094-0.py` the reading beyond the brief, `testing-practices/inline/c102-0.py` the 119.5M ITE.

## How the text was recovered

1. For each author, every Write and Edit of a file in the author's scratch folder, and every Bash call that created or edited a file there (`cat > f <<'EOF'`, `sed -i`, `cp`, an inline program that opened a `.py` or `.sh` for writing), was replayed in the order of the transcript, in an empty folder.
2. Done twice, independently. First with the author's scratch path rewritten to a new folder in each command and the inline programs that edit a script run through a shim. Second as the commands stood, inside a mount namespace (it needs root) in which the author's scratch path was bound to the new folder (this is `replay-check.py`). The two sets of files are identical, file by file, once the rewritten path is put back.
3. Checked against the transcripts: when a later author printed a recovered script (`cat parse.py acct.py cls2.py tab1.py gen_matrix.py` in `checking-roles` C 18 to 20), the recovered text is contained in that result.

## Changes made to the recovered text

Four lines pointed into the author's own scratch folder. Each is changed to a path relative to the working folder, which is where the author ran them (`cd $S`). Nothing else in any recovered file is changed.

- `context-study/classify.py` line 132: `open(f'/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/context-study/json/{WORKERS[w]}.json')` became `open(f'json/{WORKERS[w]}.json')`.
- `context-study/show.py` line 5: the same path became `json/{W[w]}.json`.
- `context-study/summarize.py` line 3: `sys.path.insert(0,'<the scratch folder>/context-study')` became `sys.path.insert(0,'.')`.
- `context-study/L.sh` line 3: `B=<the scratch folder>/context-study/base/explorations` became `B=base/explorations`.

Two patterns that name the word "scratchpad" are regular expressions that classify the *workers'* commands (`labor/cls2.py` line 176, `context-study/skeptics.py` line 11), not paths of the author; they are unchanged. The scripts still name the live folder of the session's transcripts, `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows`, as the authors ran them; that folder no longer holds batches 8 to 10, so `run-study.py` substitutes the backup copy's path in the copy it makes, and `replay-check.py` binds the backup over the live path. Run ids, the base commit of `explore.py` and the rung letters are likewise changed only in the copies that `run-study.py` makes (it prints each change).

## Re-running: the same figures

`replay-check.py NOTE` re-ran every computational call of each author in order and compared its output with the stored one (2026-10-09):

| Note | Calls compared | Same | Differ |
|---|---|---|---|
| labor | 82 | 70 | 12 |
| checking-roles | 58 | 52 | 6 |
| testing-practices | 89 | 79 | 10 |
| context-study | 124 | 112 | 12 |

The 40 that differ, all explained: the machine or the repository is not as it was (labor C 1, 14, 15, 16, 17, 33; checking-roles C 16, 17, 22; context-study C 11, 28, 73, 96, 97, 99: a `git status`, a numpy version string, listings of scratch folders that are gone, a file date, a `time` line, and counts over the record and the skill as they are today); the last digits of a sum of floats (labor C 20, 49, 80; context-study C 133); Python 3.13 draws `~~~^^^` marks under a traceback line (labor C 90, 93; checking-roles C 27, 43; testing-practices C 37, 49); a `BrokenPipeError` that the original hit through `| head` and the replay did not (testing-practices C 58); the tool's own "Exit code 1" line (labor C 35; checking-roles C 62; testing-practices C 68); the harness had cut an output over 30K characters to a `<persisted-output>` stub and the replay prints it whole (testing-practices C 24, 28, 36, 65; context-study C 23); the order in which a Python set prints (testing-practices C 17); the Python the author ran refused an f-string with nested quotes that 3.13 accepts, so that call failed then and runs now (testing-practices C 135); and four calls that edit the note's prose and so cannot be replayed (context-study C 144, 146, 147, 149). The calls that print the figures the notes quote are among those that matched; `process-engineering/skill-effect.md`, section 2, lists them.

## Running on other batches

`python3 run-study.py NOTE WORKDIR BATCH...` for NOTE `labor`, `checking-roles` or `testing-practices`. `labor` runs `parse`, the briefs program, `cls2`, `acct`, `tab1`, `topfiles`, `explore`, `shared`, `reread`, `tab2`, `inbrief`, `inbrief2`, `inbrief3`, `gen_matrix` (only for batches up to 10: it tabulates the old roles), `gen_agents` and `by-batch.py`. `checking-roles` runs that, then for each batch `matrixN.py`, `kindsN.py` and `sharedN.py`. `testing-practices` runs `parse`, `cat1` to `cat4`, `cost`, `learn`, `wrappers`, `fails` and `errs`. The output files are in `WORKDIR/out/`, and `out/substitutions.txt` lists what was changed in the copies:

- the transcripts' folder: the live path to the folder that holds the runs asked for;
- `RUNS` (labor, testing-practices) and the run list of `j.py`; `BASE` of `explore.py` (the batch's base commit: 8 `493b4076f`, 9 `fa14a190c`, 10 `9c9e823d5`, 11 `83b1cae78`, 12 `7fa767d48`, 13 `a1a75716a`, from the first rung brief of each run);
- the role `coldread`, which batch 11 added, added to the role tables of `acct.py`, `explore.py` and `gen_matrix.py`;
- the rung letters and the batch list in `shared.py`, the briefs program, and batch 10's constants in `matrix10.py`, `kinds10.py` and `shared10.py`, once for each batch.

`checking-roles/briefs10.py`, `echo.py` and `echo2.py` split the brief of batches 8 to 10 by its headings (`  # Your role`) and are not run on batches 11 to 13, whose briefs have another form. `context-study`'s hand labels (`verdict.py` LAB, `summarize.py` OVR, `classify.py` EDITS) are the author's reading of batch 10's four workers' calls; they are not repeated for other workers.

`skill-load.py [--repo DIR] RUN_DIR...`, where `RUN_DIR` is `.../subagents/workflows/wf_<id>`: per agent, the writes, whether its brief names the skill, its `Skill` calls, the text the harness injected for them, the parts of `.claude/skills/` it read (calls and tokens, by skill and part), then a line for the run, in tokens and as input-token equivalents (ITE, as `testing-practices.md` defines them). `batch-measures.py RUN_DIR...` (in the parent folder) gives the tokens by role.

## Use in a post-batch review

For batch N with run `wf_X`, against the batches before it:

    W=/root/.claude/projects/-home-user-fortress/<session>/subagents/workflows     # or the backup copy
    python3 explorations/coordinator/tools/batch-measures.py $W/wf_X $W/wf_<earlier>...
    python3 explorations/coordinator/tools/transcript-study/skill-load.py --repo . $W/wf_X
    python3 explorations/coordinator/tools/transcript-study/run-study.py labor tmp/ls N-3 N-2 N-1 N        # the by-batch table is in tmp/ls/out/
    python3 explorations/coordinator/tools/transcript-study/run-study.py testing-practices tmp/tp N-3 N-2 N-1 N
    python3 explorations/coordinator/tools/transcript-study/run-study.py checking-roles tmp/cr N-3 N-2 N-1 N

Add `BASE[N]` and `RUN[N]` to `run-study.py` first (the base commit is in the first rung brief: "Every branch is cut from the base, <sha>, on main"). The tables of `skill-effect.md` are the form to repeat.
