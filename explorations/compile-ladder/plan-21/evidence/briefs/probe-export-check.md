<!-- Probe brief for climb batch 21's preparation, 2026-10-22, about 23:50 UTC, at the curator's word to start the probes before the weekly reset: the export check of the FortressLibrary component run to its end. -->

# Probe: every difference between the `FortressLibrary` api and its component

## The problem

The compiled checker's export check compares a component with the api that it exports. On the interpreter's library it reports one error for the `FortressLibrary` component against its api, with 43 entries at climb batch 20's gate. It is one of the five sites of the distance to the switch-over.

The check names only the first member that differs in each trait: two `forall`s stop at it (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:749` and `:787`). So nobody knows how many differences the 43 entries hide. Climb batch 20's planner wrote `abstract` into the api for `Integral` alone: the check then named `Integral`'s next members, `one` and `numerator`, and the same line brought a new error in `FortressBuiltin`, since `BigNum` has no `zero` that its api shows (`explorations/coordinator/CLIMB-BATCH-20.md`, section 4, fork 18; the planner's patch `explorations/compile-ladder/plan-20/probes/export-abstract.patch`).

## What to measure

1. In a shadow of the checker that never lands, let the export check report every member that differs, not only the first in each trait. Run the distance stage on the landed library with it, and list every difference: the trait or object, the member, and what differs (a missing member, a type, an `abstract` modifier, a header).
2. Sort the differences by what would clear each. Use `explorations/reviews/array-sites-ways.md`, section 4, ways 4h (the api writes `abstract` where the component's member has no body, and the plain slips) and 4i (the check brought to the rule of the specification's `apis.tex`). Name any difference that needs neither, and any that needs a decision.
3. Write the edits of 4h as one library patch, run the distance stage with the stock checker on it, and report the sites before and after, site by site. Report each new error that a line brings in another component.
4. List, without fixing, the entries that wait elsewhere: `Maybe`'s (P-90, the bare `Nothing`) and `String`'s (P-155, the symbolic operators).

## What is on record

- `explorations/coordinator/tools/facts-extract.sh 'F-53' 'F-54' 'P-90' 'P-155'` prints the entries this probe needs.
- The last landed gate's tables are the "before": `explorations/compile-ladder/climb-batch-20/gate/distance.txt` and `explorations/compile-ladder/gate/distance-sites.tsv`. Do not run the stock distance stage on the unchanged tree to check them.
- The distance stage: `explorations/coordinator/tools/distance/run.sh`, about 161 s at the last gate.

## How

- Work in a worktree of your own, seeded from `main` (`0c7e7be18`, whose code is climb batch 20's landed code) by the `fortress-repo` skill's worktree part, on a branch `wip/probe-export-check`.
- Keep every wait under 270 s: run a stage in the background with a log and poll it.
- Write your report to `explorations/perf-probes/export-check-full/REPORT.md` in your worktree, with a header comment, and keep beside it only the shadow patch and the library patch that the report gives. If the Write tool refuses the report file, write it to `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/probe-export-check-REPORT.md` and say so.
- Commit those files on your branch and push the branch. Do not touch `main`.
- End with a short final message: the report's path, the count of differences, the sites before and after the patch, and anything you could not settle.
