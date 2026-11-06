<!-- The reconciled design of the gap ledger's full pass as a workflow, written 2026-11-06 by an Opus worker for the coordinator and the curator from the Opus and the Fable designs written cold that morning, the scaling archaeology of the October passes and the curator's ideas of 05:3x and 05:4x UTC: their agreements, each difference settled with its reason, each idea of the curator's taken or not with the rule that decides it; the stages and who runs each, the grouping into chunks and runs, how staleness is found, the verification, the landing between batches under a guard and a lock, the cost and the span with their ground, the pilot on section 6 and its threshold, the risks, the parameters that only the curator sets, and the one line that the coordinator puts to him; built as `explorations/coordinator/tools/ledger-pass/`, its evidence step run dry on section 6. -->

# The gap ledger's full pass: the reconciled design

Reader: the coordinator, and through the coordinator the curator. The tool that this note designs is built beside it, in `explorations/coordinator/tools/ledger-pass/` (its README says how to run it). No agent was launched and no row was written. The tree read is `main` at `b3b0d08c8`.

Sources, and how this note cites them:

- **the brief**: the brief that both designers answered, `<scratchpad>/ledger-pass/brief.md`;
- **Opus §N**: the Opus design, `<scratchpad>/ledger-pass/design-opus.md`, by section;
- **Fable §N**: the Fable design, `<scratchpad>/ledger-pass/design-fable.md`, by section;
- **archaeology N**: the scaling archaeology of the October passes, `<scratchpad>/ledger-pass/scaling-archaeology.md`, by fact;
- **the curator's words**: his messages of 05:3x and 05:4x UTC on 2026-11-06, which neither designer saw (the Opus designer saw a summary in the boot note, and says so: Opus, the disclosure before §1);
- **the dry run**: this work's run of the evidence step on section 6, `<scratchpad>/ledger-pass/dry/p-run1/` (section 14);
- the tree by file and line, at `b3b0d08c8`.

`<scratchpad>` is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`.

## 1. The question

- The gap ledger holds 903 rows. 498 are open: 456 `NEGATIVE-VERIFIED`, 13 `NEGATIVE-BOUNDED`, 29 `CONTESTED` (`ledger.py count` at `b3b0d08c8`; Opus §1; Fable §0).
- Every worker reads the rows that touch its work before it edits (`fortress-repo` `SKILL.md:170`), and every batch's planner briefs rungs from them (the brief).
- The health check of 2026-10-22 read a sample of 43 open rows. By its rates, about 180 open rows need a change (about 120 to 250), and 30 to 40 need a measurement again first (`ledger-health-2026-10-22/REPORT.md:15`, `:230`). It recommends a full pass over every open row, each rewritten row checked by a reader who knows Fortress but not the batches (`REPORT.md:232`).
- The question: how that pass runs as a workflow that the coordinator can launch at opportune times, several runs side by side, each with a list of rows (the curator's words), within the record's rules.

## 2. Where the two designs agree

Each point below is in both designs. This note keeps each one.

1. **Every open row is read.** Signals cannot pick the rows: 9 of the 23 sampled rows that needed action carried no signal (`REPORT.md:94`; Opus §2, §3 way 2; Fable §0, §1 way B).
2. **Scripts do the mechanical checks, Opus does every judgement.** A string compare or a git query needs no model; a disposition, a new line and a verdict are judgements (Opus §4, "Which checks are mechanical"; Fable §2, after stage 8).
3. **The clarity run's shape is the core.** Per chunk of about 12 rows, an Opus writer, an Opus checker and one judge, with no second round. It is the one measured run of this work: 58 rows, 2.56M written, about 84 minutes, 15 agents, at most two at once (archaeology 1d; Opus §2; Fable §0).
4. **Several runs go side by side.** The cap of two agents is per Workflow run (`coordinator` `references/delegating.md:75`). The October passes ran four or five runs at once, with peaks of eight or nine agents, and the coordinator applied their outputs run by run with no conflict (archaeology 1a to 1c, 2, 3; Opus §5; Fable §3).
5. **The pass lands by `ledger.py`, not by a git merge.** `ledger.py` appends each earlier line at the end of the history file (`ledger.py:729-735`), so two branches that both wrote rows conflict there (Opus §2, §3 way 7). Both land the judged output on `main` between batches, through `ledger.py`, under a guard against a row changed since it was read (Opus §4 stage 8; Fable §2 stage 6).
6. **`XXX` reproducers need no run in the pass.** An `XXX` test turns red at the gate when its defect is fixed (`REPORT.md:87`), so a green gate that still holds for the base measured it, and the reuse rule says not to run it again (`fortress-repo` `SKILL.md:169`; Opus §2; Fable §0, §2 stage 2). 170 open rows have one (Opus §2; Fable §0).
7. **Item 265 is a parameter.** A `NEGATIVE-VERIFIED` row beside a specification cell of `silent` keeps its status; the writer records whether the row is a defect or a choice, so the curator's answer applies later by script (Opus §4 stage 1, §10 item 1; Fable §2 stage 3, §7). 93 open rows are such rows now (Opus §2; Fable §0).
8. **No writer streams.** A headless writer stream cannot run `ledger.py check --rows`, which the writer runs on every line, and the ledger's judges needed no fix round (`record-clarity/writer-stream.sh:21-25`; Opus §3 way 4; Fable §1).
9. **No Fable worker in the pass**, and no Sonnet judgement (Opus §1; Fable §2; `delegating.md:21`, `:24`).
10. **A pilot first**, then the rest at the curator's go (Opus §9; Fable §6).

## 3. Where they differ, and how each difference is settled

1. **The evidence's form.** Opus: one packet per chunk, written before the launch by `prepare.py` (Opus §4 stage 0). Fable: one file per row and a table of mechanical verdicts (Fable §2 stage 1).
   - Settled: one file per row, `CHUNK/evidence/N.md`, and one table per chunk, `CHUNK/mech.tsv`, written by `evidence.py` as the run's first stage.
   - Why: a checker, a judge or a resumed writer opens one row's file without the chunk's; and a run that writes its own evidence needs nothing of the coordinator but its arguments, which is the curator's "workflow that gets a list of rows" (section 4, idea 6).
2. **Where the runs work.** Opus: each run in a worktree seeded at the base, so that the runs never touch the main tree and can run while a batch runs (Opus §4 stage 0, §7). Fable: in the main tree, launched only between batches (Fable §5).
   - Settled: no worktree. Each run writes only into its folder under the main tree's `tmp/`, which git ignores; its scripts read the files and the ledger at the base through git (`common.py`, `Tree` and `ledger_at`); runs are launched in a window between batches.
   - Why: a gather needs `git status --porcelain` to print nothing in the main tree (`coordinator` `references/batch.md:77`), and an ignored folder keeps it so, where an untracked one would not (Opus §2). The main tree is built at its head with warm caches (the brief), which the prober needs. A worktree costs about 206 MB and a seeding per run (Opus §2) and buys only freedom from a window that the landing and the prober need anyway. The guard and the list of rows whose cited files changed (section 7) catch what moves under a run.
3. **The reproducer runs.** Opus: the prober runs what the writers ask (Opus §4 stage 6). Fable: a script runs the probe reproducers under walk before the writer (Fable §2 stage 2).
   - Settled: both. `evidence.py` runs, under walk from the main tree's build with the run's private caches folder, each reproducer that is a `.fss` probe under `explorations/`, which no gate runs, and a walk test of `ProjectFortress/tests/` only when the newest gate no longer holds for the base (`fortress-repo` `references/gate.md:19-21`); it runs no compiled test (`references/tests-running.md:115`). The prober runs what only a new program can settle.
   - Why: "reproduce before you explain" (`SKILL.md:164`) is met for a probe row at no token cost, and the reuse rule (`SKILL.md:169`) keeps a gated test out.
4. **The rows that need a new measurement.** Opus: one Opus prober per run, after the run's chunks, in its worktree (Opus §4 stage 6). Fable: a measurement round after all the sections, one agent per 8 to 10 questions, in the main tree (Fable §2 stage 8).
   - Settled: one Opus prober per run, after its chunks, from the main tree's build in the run's private caches, one JVM at a time on the machine under a lock (`tmp/ledger-pass-jvm.lock`). Its folder is a chunk of its own, which the cold reader, the checker and the judge then take. The run's argument `probe: false` leaves the questions in the queue instead.
   - Why: a row left to investigate is a row that workers still cannot trust, and a later round would read its evidence again (Opus §3 way 8). Fable's objection, a driver for each chunk and a writer that cannot be resumed after five minutes (Fable §2 stage 8), does not hold for one prober per run that waits in steps under 240 s.
5. **The cold reader.** Opus: a separate reader per chunk (Opus §4 stage 3). Fable: the checker is the reader; a true cold read only in the pilot (Fable §2 stage 4).
   - Settled: a separate cold reader per chunk, on the rewritten lines only, skipped when the writer rewrote nothing (`read.md`; `ledger-pass.js`, the Read stage).
   - Why: the health check asks for a reader who knows Fortress but not the batches (`REPORT.md:232`). The checker must read the batch sources to check that nothing true is lost (the refused notes, the history, the batch records), so it cannot also be the reader who never saw them. The record's other passes run the cold read beside the checker, who reads the reader's answers against the meaning (`record-clarity/README.md`, "What runs", steps 3 and 4; `record-landing/record-landing.js`, the Check phase).
6. **The keeps.** Opus: the checker and the judge check each keep lightly (Opus §6). Fable: a keep gets no checker; the pilot measures whether it should (Fable §4, §6).
   - Settled: the checker reads each keep against its evidence, lightly (`check.md`), and the pilot measures how often it overturns one.
   - Why: a keep is the one judgement that nothing else in the pass checks, and the signals alone cannot confirm one (`REPORT.md:94`).
7. **The grouping.** Opus: chunks packed by the code the rows cite, across sections, and a reconcile step for the overlaps left across chunks (Opus §5, §4 stage 7). Fable: by section first, clusters inside each section, overlaps across sections shown in the evidence (Fable §3).
   - Settled: packed by the code the rows cite, across sections, ordered by the sections' order of use; each row's overlaps, with the chunk each sits in, in its evidence; a reconcile run last, on the pairs that the judges uphold for it (section 6).
   - Why: the curator asked for a sort that gives the deduplication its context (section 4, idea 5). Packed by `chunks.py` at `b3b0d08c8`, 100 of the 511 linked pairs among the 498 open rows fall in different chunks; Opus's packing inside sections left 113 of its 242 pairs across chunks (Opus §5).
8. **The order.** Opus: oldest rows first, since era B rows did worst (Opus §5; `REPORT.md:156`). Fable: by use, sections 6, 7, 10, 12, 5, 2, then the rest (Fable §3).
   - Settled: by use, as the default (`chunks.py --order`); the curator sets it (section 11).
   - Why: the pass is for workers, so the rows that the next batches read come first (the brief, "The problem"). Climb batch 27's planner is next, with the integer conversions' rungs (`explorations/coordinator/BOOT.md:5` at `b3b0d08c8`), whose rows 349, 502, 856, 858 and 859 are in section 6.
9. **The pilot.** Opus: the 23 rows of the health check's sample still open, scored against the sample's assessment (Opus §9). Fable: section 6, its 24 open rows, at or under 35K a row (Fable §6).
   - Settled: section 6 (section 10).
   - Why: its rows are the next batch's, so the pilot's work is used at once; a section is the unit of the fallback and of the order; the sample's key covers only one of its rows (792), so the pilot is scored by the checker, the judge, a blind audit and the curator's own reading of the 24 old and new lines (`coordinator` `references/record.md:92`).
10. **Who lands.** Opus: the coordinator runs the landing script and pushes (Opus §4 stage 8). Fable: the coordinator by default, or a Sonnet lander in the script if the curator extends his rule of 2026-11-03 (Fable §2 stage 6, §7).
    - Settled: `land.sh`, run by the coordinator as each run ends; the workflow's Land stage is built and off. `land: true` in a run's arguments turns it on.
    - Why: "Only you write the record files" (`delegating.md:93`, `:94`). The record-landing workflow lands its own result only by the curator's rule of 2026-11-03 (`record-landing/README.md:50`), and that rule names no other workflow.
11. **The guard's input.** Opus: `rows.tsv` at the base (Opus §4 stage 0). Fable: `read-lines.txt`, the lines as the writer read them (Fable §2 stage 3).
    - Settled: `CHUNK/rows.tsv`, each row's number and the sha of its line, written by `evidence.py` from the same line that it puts in the row's evidence file, which the writer is told to work from (`writer.md`, "Your evidence").
12. **The cost.** Opus: about 22M (16M to 28M), 44K a row (Opus §8). Fable: about 20M (17M to 25M), 34K a row in the chunk stages (Fable §8).
    - Settled: about 22M (17M to 28M), 37K a row in the chunk stages (section 9). The cold reader and the light check of keeps add what Fable's figure leaves out.
13. **The audits.** Opus: a blind audit after the pilot and one at the end (Opus §6). Fable: none (Fable §4).
    - Settled: both audits, about 0.5M. Why: the pass's own measure is then the health check's measure (Opus §6), which no reader of the pass's files can give.
14. **The runs side by side.** Opus: four (Opus §5). Fable: two to four (Fable §3).
    - Settled: four for the whole pass, one for the pilot. Four or five runs ran to the end in October, and more has not been tried (`delegating.md:83`).
15. **A length aim.** Opus: the template's limits only, a tighter target the curator's (Opus §10 item 4). Fable: the writer aims at 1,000 characters (Fable §7).
    - Settled: the writer aims at about 1,000; the template's 1,200 is the rule. Why: 163 open rows stand at 1,100 or more, and a row at its limit takes no later note (Fable §0; the `ledger.py` header, decision D4).

## 4. The curator's ideas

1. **"Shaped as a workflow."** Taken: `ledger-pass.js`, one Workflow run per list of chunks.
2. **"Mechanical, maybe a Sonnet or even Haiku could be able to do this validation."** The mechanical half is taken, and given to no model: `evidence.py` and `mech.py` make every check that is a string compare or a git query (section 7), at no token cost, and every Opus agent reads their output. The verdict is not given to a cheaper tier:
   - the record's rule gives Sonnet archaeology and exact words only, "never for a judgement or a summary" (`delegating.md:21`), and has a writer of record text be Opus (`delegating.md:24`);
   - the tiers it names are Opus, Sonnet and Fable (`delegating.md:20`), so Haiku has no slot;
   - and a cheap verdict could not drop rows from the reading: the health check's unflagged rows held 9 of its 23 rows that needed action (`REPORT.md:94`), and row 44's claim was false for a month with no signal (`REPORT.md:96-99`).
   What the design does instead: the script's findings go into every row's evidence, and an Opus writer reads every row with them first.
3. **"Haiku for checking staleness, then Sonnet or Opus for bringing things up to date."** Staleness: its mechanical part by script, its judgement by the Opus writer, then the Opus checker. Bringing a row up to date: Opus, by `delegating.md:24`. Sonnet has two slots in the run, both of which judge nothing: the driver of the evidence script and the lander, which each run one command and report its output, as the record-clarity and record-landing drivers do (`record-clarity/record-clarity.js`, `drive`; `record-landing/record-landing.js`, the Land stage).
4. **"Massively parallelizable over sections of the ledger into batches."** Taken: four runs side by side, each with its own two agents, eight in all (`delegating.md:75`, `:83`; archaeology 1a to 1c). The pass is not cut by section: the runs are cut by chunks of related rows, dealt so that each run starts on the sections read first (section 6). The limits past four runs are the machine's memory for the probers' JVMs, the week's budget and what the coordinator can watch (Opus §5).
5. **"Some kind of semantic sort that groups rows by areas, so that the deduplication and reconciliation has the right context."** Taken, finer than area: `chunks.py` links two rows that cite lines of one file within 10 lines of each other, share a reproducer, share two rare backticked names, or name each other, and packs linked rows into one chunk. The area is one cell of the class, and groups less well: 129 of Opus's 242 overlap pairs cross areas (Opus §5). The sort is the duplicate search that the record asks to run first, as its own step (`references/record.md:117`). It moves no row between sections: a chunk is a reading unit, and a regroup of the ledger's rows is the curator's (`references/record.md:118`).
6. **"A workflow that gets a list of rows to review, so that we can run several workflows in parallel."** Taken: a run's arguments are its name, its folder and its chunks, each a name and a list of rows; `chunks.py` writes them for every run.
7. **"Executed at opportune times."** Taken: each run reads the base through git and writes only its ignored folder, so it can be launched in any window between batches; it lands in a few minutes by `land.sh`; a stopped run resumes from its journal.

## 5. The stages

Each run takes one list of chunks (`ledger-pass.js`). Before it, the coordinator plans the runs.

0. **Plan** (a script, `chunks.py`, run by the coordinator). Reads the ledger at the base, and the tree's files through git. Writes one JSON: each run's exact arguments, and the linked pairs that fell in different chunks. Section 6.
1. **Evidence** (a script, `evidence.py`; a Sonnet driver only runs it and waits in steps under 240 s). Reads the ledger and its history at the base, `git blame` of the ledger, the cited files at the base, the commits since the ledger's rework, FACTS and POSITIONS, the health check's `signals.py` and `refused_notes.py` run as they are, and each reproducer's run under walk where section 3, item 3, allows one. Writes into the run's folder: `run/base.txt`, `run/signals.tsv`, `run/refused.tsv`, `run/repro/N.txt`, `run/caches/`; per chunk, `evidence/N.md`, `mech.tsv` and `rows.tsv`. Section 7 lists what each row's file holds. The step ends with a line `EVIDENCE DONE`; without it the run stops.
2. **Write** (Opus, `writer.md`, one agent per chunk). Reads its rows' evidence first, then the tree, git or a batch record only where the evidence does not settle a point. Judges each row by the record's rubric adapted to a row (`explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric"; `REPORT.md`, section 6.1), and gives it keep, rewrite, close, duplicate or measure. Writes `assessment.md`, `rows.rewrite`, `closes.txt`, `dups.txt`, `questions.md`, `pairs.txt` and `silent.txt`, each line checked with `ledger.py check --rows`, then runs `mech.py`. Runs no program. Its structured result gives the counts by disposition, from which the script skips a cold read with nothing to read and a prober with nothing to measure.
3. **Mechanical check of the new lines** (a script, `mech.py`, run by the writer at its end and again by the checker first). Reads the chunk's files, the lines as read and the tree at the base. Writes `mech.md` and `clean.txt` (the rewritten lines, cell by cell, for the reader). Section 7.
4. **Read** (Opus, `read.md`, one agent per chunk with a rewrite). Reads `clean.txt` with only `CLAUDE.md` and the `fortress-repo` skill's core and parts, as `record-clarity/coldread.md` allows. Writes `cold-read.md`: for each row, the defect, where, how to reproduce it, what the status tells a worker to do, and what it could not resolve.
5. **Check** (Opus, `check.md`, one agent per chunk). Reads `mech.md`, the writer's files, `cold-read.md`, the evidence and the tree. Writes `check.md`: pass, or each failure with its source and an exact correction. Section 8.
6. **Judge** (Opus, `judge.md`, one agent per chunk, once). Reads all of the above. Writes `final.rewrite`, `final.dups`, `final.closes`, `final.silent`, `final.pairs`, `judgement.md` and `queue.md`, then runs `mech.py --final` until its last line says every check passes, holding any line that it cannot correct exactly.
7. **Probe** (Opus, `probe.md`, one agent per run, after its chunks, only when a writer asked to measure). Reads every chunk's `questions.md` and the rows' evidence. Checks first that the main tree is clean and built (`bin/fortress explorations/claude_demo.fss` prints `SUM[i <- 1#100] i = 5050`, `fortress-repo` `references/interpreter.md:138`); writes each program under its folder's `probe/`; runs it from the main tree's build, under walk in the run's private caches, or compiled in a private copy of the main tree's caches, under the JVM lock, `nice` and a timeout, each command under 230 s. Writes `runs.md` and a writer's files for the rows that the outputs settle, in `NAME-probe/`, which then takes stages 3 to 6.
8. **Land** (a script, `land.sh`, run by the coordinator; or, with `land: true`, by a Sonnet driver as the run's last stage). Section 9.

After the runs:

9. **The queue** (one Opus worker, for several runs at once). Files the judges' `queue.md` items in `review-queue.md`; `record-landing/queue-check.py` checks them, as the clarity workflow's README asks (`record-clarity/README.md`, "After a chunk").
10. **The reconcile run** (the same workflow). `chunks.py --reconcile` packs the pairs that the judges upheld in `final.pairs`, whose rows are still open, into chunks `r1`, `r2` and so on of one run; the writer of a chunk whose name starts with `r` decides each pair: duplicate, siblings, a half moved, or unrelated (`writer.md`).
11. **The blind audit** (one Opus worker who never saw the pass's files), after the pilot and at the end: a sample of landed rows by the health check's six checks (`REPORT.md`, sections 5.1 to 5.4; Opus §4 stage 9).

## 6. The grouping into chunks and runs

- **Links** (`common.py`, `links`): two open rows are linked when they cite lines of one file within 10 lines of each other, share a reproducer, share two backticked names that at most four open rows hold, or one names the other ("row N", "siblings: N"). At `b3b0d08c8` that makes 511 pairs among the 498 open rows.
- **Chunks** (`chunks.py`): a greedy clustering merges the two groups with the most link weight between them while the merged group holds at most 12 rows; the groups then fill chunks of at most 12, by the sections' order, and small neighbours merge. At `b3b0d08c8`: 45 chunks, 39 of them of 10 to 12 rows; 100 of the 511 pairs fall in different chunks; 11 chunks hold rows of one section, 34 mix two to six.
- **Size**: about 12 rows, the clarity run's chunk, whose writers wrote 187K to 279K at that size (archaeology 1d; Fable §0, §3). The README gives it, as `delegating.md:85` allows.
- **Order**: by the sections' order of use, 6, 7, 10, 12, 5, 2, then 4, 8, 9, 3, 1, 11, 13, 14, 15 (Fable §3); a chunk takes the earliest rank of its rows.
- **Runs**: the chunks are dealt in that order, each to the run with the fewest rows so far, so every run starts on the sections read first and the runs stay even: 128, 121, 123 and 126 rows in four runs at `b3b0d08c8`. The runs share no row. Chunk names differ across runs (`c1` to `c45`; the pilot's `p1`, `p2`; the reconcile's `r1`...), as `delegating.md:87` asks.
- **Section 6 alone**: two chunks of 12; 2 of its 29 linked pairs fall across them (`chunks.py --section 6 --runs 1 --prefix p`): `p1` is 349, 381, 383, 441, 502, 523, 524, 525, 581, 856, 858, 859; `p2` is 327, 348, 350, 429, 431, 500, 501, 700, 792, 797, 881, 887.
- **The fallback**: sections 6, 7, 10, 12 and 5, 166 rows, 16 chunks, 17 of 161 pairs across chunks (`chunks.py --section 6 --section 7 --section 10 --section 12 --section 5`).
- **What the grouping buys**: a writer meets most overlapping rows side by side, and can write a duplicate, a moved half or a sibling link with both rows in hand; it opens a cited file once for several rows; each row's evidence lists its other overlaps with the chunk each sits in, so a writer sees a neighbour that it does not hold; and the judges' upheld pairs, few by design, go to one reconcile run. Every linked pair across chunks given to the reconcile instead would be 140 rows in 13 chunks (`chunks.py --reconcile` on the plan's JSON), about four times the cost (section 9).

## 7. How staleness is found

**By script, before the writer** (`evidence.py`), for each row:

- the line as read and its sha, the commit that last wrote it (`git blame` of the ledger at the base), and its latest earlier line in the history;
- the template (`ledger.py`'s own lint);
- each cited `file:line`, resolved from the root, from `Specification/` or as a unique suffix of a tracked path, as `signals.py` resolves it; the cited lines' text at the base; whether they still hold the backticked words of the citation's sentence, or where those words now stand; and what git did to the cited lines since the commit that the row pins, or else since the commit that last wrote the row: unchanged, touched, shifted by N lines, or changed below;
- each commit hash: whether it resolves, its subject, whether the base's history holds it;
- the reproducer: its kind (`XXX` test, plain test, probe, other, none), whether it exists, and whether the newest gate holds for the base; each test that the notes name, and an `XXX` name that is gone with its plain twin;
- the commits since the row was written that touch its cited files, and those whose message names the row;
- the rows it names, with their status; its likely overlaps (section 6), with the chunk each sits in;
- the FACTS and POSITIONS lines that name it; the notes a gather could not write for it (`refused_notes.py` over climb batches 11 to 26); its signals (`signals.py`, run as it is);
- whether it is `NEGATIVE-VERIFIED` beside `silent` (item 265);
- its reproducer's run under walk, where section 3, item 3, allows one.

**By script, after the writer and the judge** (`mech.py`), for each new line: the template; the lengths; each citation at the base; each hash; the reproducer; the guard; the tokens of the old line that the new one lacks (paths, rows, F- and P- entries, backticked names); for a close, a commit in the base and a test that `ledger.py close` takes, and what settled a `CONTESTED` row; for a duplicate, both rows open and the kept row within its limits; then the chunk applied to copies of the ledger and its history, and `ledger.py check` and `check --base` on them.

**By Opus**: whether a claim still holds, from the code; whether a reproducer reproduces the claim; each disposition and each new line; whether two rows state one defect; what to run, and what an output shows; whether a silent-spec row records a defect or a choice; whether a cold reader's answer matches the meaning; each apply or hold. A script's verdict is a lead for the writer, never a finding (`writer.md`, "Your evidence"): a moved word can be a word used elsewhere, and a citation with no word to check proves nothing.

## 8. The verification

- **The writer** checks each line with `ledger.py check --rows` and with `mech.py`, and names in its assessment the home of every fact it drops (`writer.md`).
- **The script**, `mech.py`, at no token cost: section 7.
- **The cold reader**, who knows Fortress but not the batches, says what each rewritten row tells a worker who has only the skill (`read.md`). About 50K a chunk, an estimate: no ledger cold read has been measured (Opus §8).
- **The checker**, who knows the batches: fidelity against the tree at the base, nothing lost from `mech.md`'s list, the present tense, the reproducer, the status, the cold read against the meaning; each close, duplicate, question and pair; and each keep, lightly (`check.md`). 16K a checked row in the clarity run, measured, and about 4K a keep, an estimate (Opus §2, §6). The clarity run's checkers failed 16 of 55 new lines, mostly a lost condition or a wrong line number (Fable §0, §4).
- **The judge** applies, corrects exactly from the check's sources, or holds each row, once (`judge.md`; `delegating.md:92`). 8.6K a row in the clarity run, measured, and about 2K a keep (Opus §2, §6). The clarity run's judges held 3 of 58 rows (archaeology 1d; Opus §2).
- **A row that needs a new measurement** goes to the run's prober (section 5, stage 7), and its line then takes the same check and judge. If the main tree is not clean and built, the prober runs nothing and the questions go to the queue.

## 9. How a run lands

- **When**: between batches, as each run ends, one run at a time (`delegating.md:94`): from a batch's launch until it ends, no tracked file of the main tree may change, since the gather needs a clean main tree (`batch.md:77`); and not while a record-landing run is in flight, which writes the ledger too (Opus §7).
- **The lock**: `land.sh` takes `flock` on `tmp/ledger-pass-land.lock`, so two landings never interleave; `ledger.py`'s own lock covers one write, not an apply and its commit (`ledger.py:691-702`; Fable §2 stage 6).
- **The main tree**: on `main`, no merge or pick under way, the ledger and its history unchanged, and no other tracked file changed, since a gather under way leaves the main tree so; `--others-ok` passes the last when the files are another agent's and no gather runs.
- **The guard**: `ledger.py rewrite` refuses only an identical line and checks nothing about the line that it replaces (`ledger.py:936-968`; Fable §0). So `apply.py --guard` holds each change whose row, and for a duplicate with text the kept row too, no longer has the sha that the run's `rows.tsv` holds. A row that the landing itself changed is not held for it. A change already made is skipped, so a landing run again after a stop applies only the rest.
- **The checks**: the apply first on copies of the ledger and its history, with `ledger.py check` and `check --base HEAD` there; then on `main`, with `ledger.py check`, `check --base HEAD` and `landing-check HEAD`. On any failure both files are restored with `git checkout`. `check --base` proves that no row is lost and that every changed row's earlier line is in the history (the `ledger.py` header, `check`); `landing-check` runs the health check's landing checks that need no reading (`REPORT.md`, section 6.3).
- **Stale again**: the applied rows whose cited files changed between the run's base and the landing are listed in `landing.md`, for a later run (Opus §4 stage 8, step 7).
- **The commit**: the ledger, its history and the run's judged files, copied to `explorations/coordinator/ledger-pass/evidence/RUN/` with `landing.md`, by named paths, with the committing part's footer (`fortress-repo` `references/committing.md`). The evidence files, the logs and the caches are scratch and stay in `tmp/` (`SKILL.md:177`).
- **The pushes**: as the record-landing workflow's Push stage: `origin/main..main` must list only this commit, else a minute's wait and nothing pushed; then `main`, `main:claude/worker-brief-fable-vnnuv8` and `main:blinded-fable`, a network failure retried, a refusal ending the pushes (`record-landing/record-landing.js`, the Push stage).
- **Tested**: `land.sh --dry-run` on a scratch run of three changes printed its plan and commands and changed nothing; the same run landed for real in a detached scratch worktree of `b3b0d08c8` (`LEDGER_PASS_MAIN`, `--no-push`), with `check`, `check --base` and `landing-check` green and one commit of 12 files, and a second landing printed `NOTHING: every change was already made or held`. The worktree was removed.
- **A killed run**: resumed from its journal with the same script and arguments, byte for byte, from the pass's `runs.json` (`delegating.md`, "Interrupts and process stops"). Each brief finishes the files of an earlier attempt; `evidence.py` reuses its earlier reproducer outputs; `land.sh` skips what is applied. A VM restart that rolls the disk back loses an unlanded run's folder: that run is launched again, since its journal's results name files that are gone.

## 10. The cost and the span

**Per chunk of 12 rows**, of which about 4 change, by the sample's rates (Opus §8, about 170 of 498):

- the writer, about 200K (170K to 238K). Ground: the clarity run's writers wrote 187K to 279K, mean 238K (archaeology 1d; Fable §0), and spent most of their calls searching git and the batch records (Fable §1, way A); the evidence now holds that search, about 6.5K characters a row, 78K a chunk (the dry run, section 14), about 25K tokens at the record's 3.1 characters a token (Fable §0). The saving is an estimate, which the pilot measures;
- the cold reader, about 50K (40K to 70K), an estimate (Opus §8; Fable §6);
- the checker, about 120K (100K to 173K): 4 checked rows at 16K, 8 keeps at about 4K, and its start;
- the judge, about 75K (60K to 100K): 4 rows at 8.6K, 8 keeps at about 2K, and its start;
- in all about 445K (370K to 580K), **about 37K a row** (31K to 48K) in the chunk stages.

**The whole pass, 498 rows:**

- the chunk stages, 498 rows at 37K: about 18.4M (15.4M to 24M);
- the evidence drivers, one a run, about 50K each (an estimate: a driver that waits in two or three steps): about 0.3M;
- the probers, four at about 180K, the batch skeptics' mean for runs of small programs (Opus §8), and their 30 to 45 rows (`REPORT.md:230`) through the reader, the checker and the judge at about 25K: about 1.7M;
- the reconcile, one to three chunks at about 250K: about 0.5M, an estimate (Opus §8);
- the queue worker, about 0.3M (Opus §8; Fable §8);
- the two blind audits, about 0.5M, from the health check's 0.33M for 43 rows (Opus §8);
- **in all about 22M (17M to 28M), about 44K a row.** The clarity run's 44K a row, for rows nearly all rewritten (Fable §0), checks the figure from the other side.
- With `land: true`, about 60K more a run for the lander (Fable §8).
- The record's passes have overrun their estimates: the provenance audit wrote 19.3M against 16M to 17M, the FACTS clarity 15.7M against 9M (Opus §8, from the post-mortem's map; archaeology 2 gives the audit's 19.3M). So the coordinator watches each run with `spend.py` and pauses one that passes 1.3 times its share (Opus §8).
- **The fallback**, sections 6, 7, 10, 12 and 5: 166 rows at 37K, two runs with their drivers and probers: **about 7M (6M to 9M)**. Fable's estimate for it is about 6M (Fable §8).

**The span:**

- A chunk takes about 40 agent-minutes: the clarity run's writer 14 to 24, checker 8 to 17 and judge 2 to 4 (Opus §2, from the transcripts), and a cold read, an estimate (Opus §8).
- 45 chunks at 40 agent-minutes over eight agents: about 3.75 hours; with the evidence step at each run's start (44 s of script for 24 rows, the dry run, with its walk runs reused), the probers and their chunks, and four landings of minutes each: **about 4.5 hours for four runs side by side.**
- Or two windows of two runs each, about 4 hours each; a batch lands every one to three days and runs about six hours (Fable §0).
- The pilot: one run of two chunks, its prober and its landing, **about 1.5 hours**; the reconcile run, about an hour.

## 11. The pilot

- **The rows**: section 6, "Integer arithmetic", its 24 open rows, in one run of two chunks, `p1` and `p2` (section 6), with its prober. Of the 24: 9 have an `XXX` reproducer, 2 a plain test, 13 none; 9 are `NEGATIVE-VERIFIED` beside `silent`; one, 792, is `CONTESTED`, and the health check's sample marked it Keep (`REPORT.md`, section 5.3).
- **Its cost**: about 1.5M (1.2M to 2M): two chunks at about 445K, the driver, the prober and its rows, the blind audit of 24 rows; about 1.5 hours.
- **What it must show before the rest runs** (the threshold, which the curator sets):
  1. tokens written in the chunk stages at most 40K a row: the clarity run's 44K is the ceiling (Fable §6), and Fable's 35K for its writer, checker and judge gains about 4K a row for the cold reader here;
  2. the checker fails at most 3 in 10 new lines, and the judge holds at most 1 in 10 rows (Fable §6);
  3. the checker overturns at most 1 keep in 10 (Fable §6); more would ask for a full check of keeps;
  4. nothing lost: each token on `mech.md`'s list kept, given a home, or named false by the checker (Opus §9, item 3);
  5. the blind audit of the 24 landed lines: at most 2 fail one of the six checks (Opus §9, item 2);
  6. the landing: the guard, `check`, `check --base` and `landing-check` green on `main`, one commit, pushed (Opus §9, item 6; Fable §6);
  7. at most 50 agent-minutes a chunk (Opus §9, item 5);
  8. the curator reads the 24 old and new lines side by side, as a page, and gives his go (`references/record.md:92`).

## 12. The risks

- **Churn**: a writer rewrites rows that hold, which costs and can lose facts. Keep is a disposition that writes nothing; the pilot measures rewrites against the checker's light read (Opus §10).
- **A fact lost**: a rewrite drops a true sentence (the record-landing replay lost two so, Opus §10). `mech.py`'s list of dropped tokens, the checker, and the history's whole earlier line.
- **A wrong close**: a close needs a commit in the base's history and a test that asserts the fix, and the checker reads the test; the row says which paths show the defect (Opus §10). An `XXX` test that would now pass is not closed in the pass, since its promotion changes the tree (`writer.md`).
- **A collision with a batch**: runs write only their ignored folders; `land.sh` refuses a main tree with tracked changes and lands under its lock; the guard holds any row that changed after it was read (Fable §7; Opus §10).
- **Stale again by the landing**: `landing.md` lists the applied rows whose cited files changed since the run read them.
- **Cost overrun**: section 10.
- **A stop or a lost disk mid-run**: resume from the journal; launch soon after a process start, with check-ins 45 minutes apart (`delegating.md`, "Watching a run"); land each run as it ends, so that a rolled-back disk loses at most the runs in flight.
- **Cache misses**: every wait under 240 s; the JVMs only in the evidence step and the probers.
- **Memory**: a compiled run takes about 4 GB on a machine of about 15 GB (Opus §2): one JVM at a time on the machine, under `tmp/ledger-pass-jvm.lock`.
- **A false duplicate**: two rows merged that differ in path or construct. The checker and the judge hold unless both state one defect at one site on one path; a pair across chunks goes to the reconcile run, never to a writer who holds one row (Opus §10; Fable §7).
- **Leads read as findings**: the script's "moved" and "gone" are leads (section 7). In section 6, 35 of the 75 citations with lines had no word that the script could check (the dry run).
- **Full rows**: 163 open rows stand at 1,100 characters or more (Fable §0); the writer cuts notes and aims at 1,000.
- **The resume's call order**: `pipeline` can start agents in a different order on a resume; `delegating.md`, "Interrupts and process stops", gives the wrapper that keeps the journal's order.
- **The coordinator's attention**: four runs and their landings; each run's result ends in one `line`, and each landing in one `LANDED` line.

## 13. The parameters that only the curator sets

1. **Review-queue item 265**: which status a row takes for a defect where the specification is silent: `NEGATIVE-VERIFIED` widened, `CONTESTED`, or `POSITIVE-VERIFIED` for a behaviour that is a choice (`review-queue.md:19`). 93 open rows now. Default: the rows keep their status, and each judge's `final.silent` records defect or choice for each, so that his answer applies by script afterwards and no row is read twice for it. His answer enters the ledger's template, which the writer reads, never a run's arguments: a run gives data, never rules (`process-engineering/record-landing-workflow.md:65-67`).
2. **The sections' order**: by use, 6, 7, 10, 12, 5, 2, then 4, 8, 9, 3, 1, 11, 13, 14, 15 (the default, Fable §3); or oldest rows first, where the sample found the worst rows (Opus §5; `REPORT.md:156`).
3. **The pilot's threshold**: section 11, its eight measures.
4. **Whether the fallback or the whole pass runs** (review-queue item 267, whose default is no pass, `review-queue.md:20`): the whole pass, 498 rows, about 22M and 4.5 hours in one window or two; the fallback, sections 6, 7, 10, 12 and 5, 166 rows, about 7M; or no pass beyond the pilot, with the landing checks alone stopping new staleness (`REPORT.md:279`).

The designs name five more, each with its default here (Opus §10; Fable §7):

5. **Whether a run lands itself** (`land: true`): default off, the coordinator lands each run (section 3, item 10).
6. **The 117 `POSITIVE-VERIFIED` rows**: default not read; about 4M more at the same rate (Opus §10 item 3; Fable §7).
7. **A hard length cap below 1,200 characters**: default none; the writer aims at about 1,000 (section 3, item 15).
8. **The measurement inside each run** (`probe`): default on (section 3, item 4).
9. **The briefs**: the five beside the script change only at his yes (Opus §10 item 8; `record-landing/README.md`, "The briefs").

## 14. The dry run of the evidence step on section 6

- Command: `chunks.py --section 6 --runs 1 --prefix p`, then `evidence.py --out <scratchpad>/ledger-pass/dry/p-run1 --chunk p1=... --chunk p2=... --run-tests`, at `b3b0d08c8`. `--run-tests` ran section 6's three walk tests even though the newest gate, `a12ab5c60`, holds for the base, only to exercise the runner; a real run would not run them (section 3, item 3).
- It wrote: 24 evidence files, 156K in all, 3.9K to 11.4K a row (median 6.9K); `mech.tsv` 1.2K and 1.0K; `rows.tsv` 0.7K each; `run/signals.tsv` 100K; `run/refused.tsv` 35K; three reproducer outputs of 0.2K to 0.9K; the private caches folder, about 27M. The script took 44 s, mostly `signals.py` and `refused_notes.py`.
- The walk runs: row 856's plain test `SignedAboveSignedRangeWalk.fss` passed (exit 0); row 881's `XXX` test failed with `Operator DIVREM is not defined.` (exit 255); row 887's `XXX` test failed with `FAIL: ... ZZ 3 CHOOSE 5 is 0` (exit 1). Both `XXX` defects still reproduce. Row 327's `library_tests/ChooseTest3.fss` is a compiled test (`tests-running.md:115`); a first version of the script ran it under walk, which refused `asZZ` on a `ZZ64`, and the script now runs only `ProjectFortress/tests/` under walk.
- What the checks found, as leads for the writer: of 94 citations, 19 name a path that does not resolve at the base: probes under `explorations/`, or a probe's bare file name, which the template lets a row read from history. Of the 75 with lines in a file of the tree, 11 hold their words, 29 have a word that now stands elsewhere, and 35 have no word that the script can check. In 14 of 24 rows a cited line's words have moved: row 441 cites `simpleIntArith.java:400-406` for `Math.pow`, which stands at `:416` at the base, the lines shifted by 15 since the commit the row pins. Row 429 names a commit, `7f57b836e`, that does not resolve, in a `git show` that its notes give as the evidence. 19 of 24 rows carry a signal; 9 are `NEGATIVE-VERIFIED` beside `silent`; 2 have a note that a gather could not write.

## 15. The line for the curator

The coordinator puts this to him, with its cost:

**May the ledger pass's pilot run on section 6's 24 open rows: one run of two chunks, about 1.5M tokens and 1.5 hours between batches, landed on `main` by `land.sh`, and the rest of the pass (about 22M for the 498 open rows, or about 7M for sections 6, 7, 10, 12 and 5) wait for the curator's go after he reads the pilot's 24 old and new lines?**
