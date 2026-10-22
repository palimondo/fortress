<!-- Probe brief for climb batch 21's preparation, 2026-10-22, about 23:50 UTC, at the curator's word to start the probes before the weekly reset: which of the team's demos run under walk today (P-79). -->

# Probe: which of the team's demos run under walk

## The problem

The curator's decision P-79: every team demo, the programs in `ProjectFortress/demos/`, is kept running as the tree changes. No suite or gate step runs them, so nobody knows which run today. Some are known to fail, each with a gap-ledger row: rows 670, 710 and 791, and row 731's demo half.

## What to measure

1. Run every demo under walk on today's tree, one at a time, each under a time limit that you choose and state. A demo that needs input files or arguments: run it as its own comments or the team's tests run it, and say how.
2. For each demo: it runs to its end, it fails (the error, where, and its ledger row if one holds it), or it hits the limit.
3. For each failing demo, the repair by the library's own way, if one is known: try it on a copy in your worktree and say whether the demo then runs. Draft a ledger row for each failure that no row holds; file none.

## What is on record

- `explorations/coordinator/tools/facts-extract.sh 'P-79'` prints the decision; read rows 670, 710, 731 and 791 with the queries of the `fortress-repo` skill's records part.
- The repair of `BiCGSTAB.fss`'s timing line on record: `explorations/compile-ladder/rung-integer-power/SKEPTIC.md:105`.

## How

- Work in a worktree of your own, seeded from `main` (`0c7e7be18`, whose code is climb batch 20's landed code) by the `fortress-repo` skill's worktree part, on a branch `wip/probe-team-demos`. Edit no demo on `main`.
- Keep every wait under 270 s: run a long demo in the background with a log and poll it.
- Write your report to `explorations/perf-probes/team-demos/REPORT.md` in your worktree, with a header comment, and keep beside it only the patch of the repairs that the report gives. If the Write tool refuses the report file, write it to `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/probe-team-demos-REPORT.md` and say so.
- Commit those files on your branch and push the branch. Do not touch `main`.
- End with a short final message: the report's path, the counts (run, fail, limit), the repairs that worked, and anything you could not settle.
