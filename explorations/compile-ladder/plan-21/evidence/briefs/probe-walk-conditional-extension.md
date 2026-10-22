<!-- Probe brief for climb batch 21's preparation, 2026-10-22, about 23:50 UTC, at the curator's word to start the probes before the weekly reset: the walk values that walk's half of conditional extension (row 774) moves. -->

# Probe: what moves under walk when walk reads an `extends` entry's `where` clause

## The problem

Under conditional extension, a trait or object extends a type under a `where` clause, and is that type only where the clause holds. The compiled checker reads it so. Walk does not: it reads such an entry as holding at every instance (gap-ledger row 774; walk's code skips the clause, `Constructor.boundsUnread` and its comment, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:725-737`). The library's `List` extends its lexicographic order only where its element type is totally ordered, so walk still gives a list of floats a `<` that the checker refuses.

Climb batch 20 held row 774's fix until a probe measures the walk values that the fix moves (`explorations/coordinator/CLIMB-BATCH-20.md`, section 4, fork 19).

## What to measure

1. Build the fix as a walk shadow that never lands: walk reads an `extends` entry's `where` clause, so a value is of the conditional parent's type only where the clause holds, at load, at a type test and at dispatch. Say what you built and its size.
2. Run with it the interpreter's suite (`ant testSystem`), the specification's examples (`ant testSpecData`), the team's demos that ran before the fix, and microGPT's quick pair (`explorations/coordinator/tools/mg-run.sh`). Report every test verdict and every printed value that moves, with why.
3. For each move, say whether the library, a team test or a team demo relies on the old reading, and the respelling that the library's own way gives, if one does.
4. Gate the fix's own behaviour with the existing expected failure `ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss`: say whether it turns green.

## What is on record

- `explorations/coordinator/tools/facts-extract.sh 'F-255' 'P-151' 'P-154'` prints the entries this probe needs; read rows 773 and 774 with the queries of the `fortress-repo` skill's records part.
- The compiled checker's half: `explorations/compile-ladder/rung-checker-conditional-extension/REPORT.md`.
- Take climb batch 20's gate as passing; do not run the suites on the unchanged tree.

## How

- Work in a worktree of your own, seeded from `main` (`0c7e7be18`, whose code is climb batch 20's landed code) by the `fortress-repo` skill's worktree part, on a branch `wip/probe-walk-cond-ext`.
- Keep every wait under 270 s: run a suite in the background with a log and poll it.
- Write your report to `explorations/perf-probes/walk-conditional-extension/REPORT.md` in your worktree, with a header comment, and keep beside it only the shadow patch that the report gives. If the Write tool refuses the report file, write it to `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/probe-walk-cond-ext-REPORT.md` and say so.
- Commit those files on your branch and push the branch. Do not touch `main`.
- End with a short final message: the report's path, the fix's size, what moved, and anything you could not settle.
