<!-- The ledger pass: bring every open row of the gap ledger to the present, as Workflow runs that each take a list of chunks and go side by side: a script's evidence and mechanical checks for every row, then per chunk an Opus writer, cold reader, checker and judge, one Opus prober per run, and a guarded landing on main between batches; how to plan, launch and resume runs, what they write, how a run lands, the cost, and what the coordinator does before and after. -->

# The ledger pass

`ledger-pass.js` brings open rows of `explorations/fortress-gap-ledger.md` (`NEGATIVE-VERIFIED`, `NEGATIVE-BOUNDED`, `CONTESTED`) to the present, so that each states its gap as it stands now: a claim that names no fixed half, a reproducer that reproduces it, notes with the mechanism and no repair story. It is the full pass that the ledger's health check recommends (`explorations/coordinator/ledger-health-2026-10-22/REPORT.md`, section 6.1), built from the ledger clarity workflow (`../ledger-clarity/`). Its design, with the reasons for each choice: `explorations/coordinator/process-engineering/ledger-pass-design-2026-11-06.md`. A run writes nothing tracked. Rows are written only by `ledger.py`, at the landing.

## What runs

Before the runs, the coordinator plans them with `chunks.py`. Then each run, for its list of chunks:

1. **Evidence** (a script; a Sonnet driver only runs it and waits): `evidence.py` writes one file per row, `CHUNK/evidence/N.md`: the line as read, its latest earlier line, the template check, each cited `file:line` with its text at the base and whether it still holds the cited words, the commits named and since, the tests, the rows named, the likely overlaps, the FACTS and POSITIONS lines, the refused notes, the signals of the health check's `signals.py`, and the reproducer's run under walk where it is a program. `CHUNK/mech.tsv` sums them, `CHUNK/rows.tsv` is the landing's guard.
2. **Write** (Opus, `writer.md`): each row judged by the record's rubric from its evidence, and given keep, rewrite, close, duplicate or measure; then `mech.py`, which checks the new lines and writes `mech.md` and `clean.txt`.
3. **Read** (Opus, `read.md`): a cold reader with only the worker's skill reads the rewritten lines. Skipped when the writer rewrote nothing.
4. **Check** (Opus, `check.md`): `mech.py` again, then fidelity against the tree at the base, the cold read against the meaning, and each keep, lightly.
5. **Judge** (Opus, `judge.md`): apply or hold each row once, with no second round; the final files; `mech.py --final`.
6. **Probe** (Opus, `probe.md`): once for the run, after its chunks, when a writer asked to measure: the questions run from the main tree's build in private caches, one JVM at a time; the prober's folder, `NAME-probe/`, then takes the read, the check and the judge like a chunk.
7. **Land** (a Sonnet driver runs `land.sh`): only with `land: true` (below, "After a chunk").

The workflow runs at most two agents at once in each run; several runs go side by side, each with its own two (`coordinator` skill, `references/delegating.md`, "The Workflow tool").

## Planning the runs

    cd /home/user/fortress/explorations/coordinator/tools/ledger-pass
    python3 chunks.py --runs 4 --prefix c > /home/user/fortress/tmp/ledger-pass/runs.json      # every open row
    python3 chunks.py --section 6 --runs 1 --prefix p > /home/user/fortress/tmp/ledger-pass/pilot.json   # the pilot

`chunks.py` links the rows that likely overlap (a citation of one file within 10 lines, one reproducer, two rare backticked names, one row naming the other: the duplicate search, run first as its own step), packs linked rows into chunks of at most 12, orders the chunks by the sections' order (`--order`, default 6, 7, 10, 12, 5, 2, then the rest), and deals them to the runs so that each run starts on the sections read first. Its JSON holds, for each run, the exact arguments of its launch, and `cross`, the linked pairs that fell in different chunks. `--section` and `--rows` limit it to a part of the ledger, such as the fallback's five sections. No row moves between sections. Keep the file as the pass's `runs.json`, name it in the boot note, and add each run's ID to it after the launch.

## Launching

One run:

    Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/ledger-pass/ledger-pass.js',
               args: { name: 'c-run1', out: '/home/user/fortress/tmp/ledger-pass/c-run1/',
                       chunks: [{ name: 'c1', rows: ['349', '381'] }] } })

`args` is one element of `runs` in the plan, as written. Optional: `probe: false` leaves the questions to measure in the queue; `land: true` lands the run at its end. Several runs side by side: one Workflow call per run, in one turn, each with its own element; their rows and chunk names differ. In October 2026 the machine took four or five runs at once (`delegating.md`, "A long writing pass"). `out` lies under the main tree's `tmp/`, which git ignores, so a batch's gather still finds the main tree clean.

If the coordinator ran `evidence.py` itself before the launch, with the same chunks and `out`, its output in `OUT/evidence.log`, and touched `OUT/evidence.done`, the evidence driver only reads the log.

**Resume** a stopped run with `resumeFromRunId`, the same script path and the same arguments, byte for byte, from `runs.json`. Each brief finishes the files of an earlier attempt; `evidence.py` reuses its earlier reproducer runs; `land.sh` skips a change already made. If the script changed since the launch, resume from the launched copy (`delegating.md`, "Interrupts and process stops"). A disk rolled back by a VM restart loses an unlanded run's folder: launch that run again, since the journal's results point to files that are gone.

## What a run writes

In `out`: `run/` (`base.txt`, `signals.tsv`, `refused.tsv`, `repro/` with each reproducer's output, `caches/`, the private caches folder, about 27M); `evidence.log`; and per chunk, `evidence/N.md`, `mech.tsv`, `rows.tsv`, the writer's `assessment.md`, `rows.rewrite`, `closes.txt`, `dups.txt`, `questions.md`, `pairs.txt` and `silent.txt`, `mech.md`, `clean.txt`, `cold-read.md`, `check.md`, and the judge's `final.rewrite`, `final.dups`, `final.closes`, `final.silent`, `final.pairs`, `judgement.md`, `queue.md` and `mech-final.md`; the prober's `NAME-probe/` holds `runs.md` beside the same files, and its programs in `probe/`. The result's `line` is one line for the coordinator.

## After a chunk

The coordinator lands each run as it ends, one run at a time (`delegating.md`, "A long writing pass"), between batches: from a batch's launch until it lands, no tracked file of the main tree changes (`coordinator` skill, `references/batch.md`, "While it runs"), and no record-landing run may be in flight.

    bash land.sh --dry-run /home/user/fortress/tmp/ledger-pass/c-run1/     # the plan and the commands; changes nothing
    bash land.sh /home/user/fortress/tmp/ledger-pass/c-run1/

`land.sh` takes its lock (`tmp/ledger-pass-land.lock`); checks the main tree (on `main`, the ledger and its history unchanged, no other tracked file changed unless `--others-ok`); holds each change whose row no longer reads as the run read it (the guard: `ledger.py rewrite` checks nothing about the line it replaces); applies the rest through `ledger.py` (`apply.py`) on copies, then `check` and `check --base` there; applies them on `main`, then `ledger.py check`, `check --base HEAD` and `landing-check HEAD`, restoring both files on a failure; lists the applied rows whose cited files changed since the run read them; copies the run's judged files to `explorations/coordinator/ledger-pass/evidence/RUN/` with `landing.md`; commits the ledger, its history and those files by named paths with the committing part's footer; and pushes as the record-landing workflow's Push stage does. `--no-push` stops after the commit. Its last line starts `LANDED`, `NOTHING` or `STOPPED`.

With `land: true` the run's last stage runs `land.sh` itself. That is off unless the curator extends his rule of 2026-11-03, by which the record-landing workflow lands its own result (`../record-landing/README.md`, "Landing its result"), to this pass.

Then, for the landed runs: an Opus worker files the judges' `queue.md` items in `review-queue.md` (`../record-landing/queue-check.py` checks them), for several runs at once; the held rows and the rows in `landing.md`'s last list go into a later run's list; `final.silent` waits for the curator's answer to review-queue item 265, which then applies by script.

## After the pass

When every run has landed: `python3 chunks.py --reconcile /home/user/fortress/explorations/coordinator/ledger-pass/evidence/` packs the pairs that the judges upheld for it (`final.pairs`: rows in different chunks that state one defect, or share a half), whose rows are still open, into the `reconcile` run (chunks `r1`, `r2`, ...), launched and landed like the others. Each writer already saw the other row of every linked pair in its evidence; the plan's `cross` list, given instead of the folder, takes every linked pair across chunks (100 at `b3b0d08c8`, 13 chunks), at about four times the cost. Then a blind Opus audit of a sample of the landed rows by the health check's rubric (REPORT.md, sections 5.1 to 5.4), and a results note under `explorations/coordinator/ledger-pass/`, beside its `evidence/`, with its INDEX line.

## Cost

About 445K tokens written a chunk of 12 rows (370K to 580K): about 37K a row in the chunk stages, and about 22M for the 498 open rows with the evidence drivers, the probers, the reconcile, the queue and the audits; the pilot about 1.6M. A chunk takes about 40 agent-minutes, so a run of 11 chunks about 4 hours at two agents, and four runs side by side about 4.5 hours. The ground of each number is in the design note, "The cost and the span". Watch each run with `../spend.py`, and pause one that passes 1.3 times its share.

## The briefs

The five briefs beside the script are the tool's rules. A run gives the workflow data, never rules (`explorations/coordinator/process-engineering/record-landing-workflow.md`, the reuse of the clarity workflow, `18788035c`). Change a brief only at the curator's yes, and the curator's answer to item 265 enters the ledger's template, which the writer reads, not a run's arguments.
