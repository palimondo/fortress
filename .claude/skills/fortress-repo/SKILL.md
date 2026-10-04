---
name: fortress-repo
description: How to work safely and efficiently in the Fortress language revival repository (/home/user/fortress). Covers the ant build and the Fortress caches, what to rebuild after editing a .fss, an .fsi, Java or Scala, running programs under the interpreter (walk) or the bytecode compiler, running and writing tests (testFast, testSystem, harness-one.sh, junit.sh, .test keys, XXX expected failures), the gate, the checker count and the distance to the switch-over, the interpreter, the compiled checker and code generator, the library, the specification and its revision form, the gap ledger and the coordinator's records, what every agent's report holds (defects and their homes, decisions with their alternatives, stops met), seeding worktrees and running the old code beside the new, and committing and pushing. Load it before any build, test run, edit, measurement, commit or agent launch in this repository, even a small one, and when designing a multi-agent workflow for it. The container, the session, restarts and agents themselves are the remote-container skill.
---

# Working in the Fortress revival repository

This repository revives Sun's Fortress language. Two execution paths share one parser and the early phases: walk, the interpreter (`bin/fortress P.fss`), and the bytecode compiler (`bin/fortress compile P.fss`, then `bin/fortress run P`). Each has its own library today. The goal is one library, the interpreter's, that the compiled type checker accepts and the compiler compiles (the switch-over), and then the model program, microGPT, compiled and fast. The original tree, the historical artifact being revived, is everything outside `explorations/`, `research/`, `CLAUDE.md` and `.claude/`.

## Rules that hold everywhere

- Every edit under the original tree is test first: the test written, seen failing through the harness, then the fix, then the test seen passing. The test stays in the corpus.
- The suite's verdict is the check. A value that matters is asserted inside a test. Nobody compares the corpus's printed outputs or adds expected-output files.
- Nothing is built or run twice on the same code. A measurement the record holds is cited, never repeated. A log that finished stands unless the tree changed after it.
- Never wipe the Fortress caches: recompile what you edited.
- The library's own way first. The specification is the standard, and every change to it takes the revision form.
- Every claim is checked against a primary source: the code, the specification, a run. Reproduce before explaining, and change one variable per step. Where git does not record who wrote something, the attribution is reconstructed, never guessed, and no credit is claimed for the revival anywhere committed.
- Long commands (a build, a suite, the distance stage) run in the background and are polled, as the `remote-container` skill says. Never pipe `ant` through `tail`.
- Commit only the paths you wrote: never scratch, never a model identifier. The curator decides what is committed.
- Every report names each defect's home, each decision with its alternatives and evidence, and each reserved stop the work met, and asks the curator nothing (`references/area-records.md`, "What every report holds").

## Load the part your task touches

- Building, the caches, what to rebuild after an edit: `references/build-and-caches.md`
- The build itself failing, JDKs, scalac and ASM traps, generated sources: `references/toolchain.md`
- Several worktrees from one build; the old code beside the new: `references/worktrees.md`
- Running one test, a few, or a whole suite, and when a whole suite is needed: `references/tests-running.md`
- The gate: what it runs, how long it takes, the atomic runs, the ladder regression: `references/gate.md`
- Writing a test: `.test` keys, `XXX` expected failures, refusals at load, where a measured defect goes: `references/tests-writing.md`
- The checker count and the distance; which edits cannot move them: `references/checker-measurements.md`
- Walk's code (`interpreter/`), its natives, running programs under walk: `references/area-interpreter.md`
- The compiled checker, the code generator, the run-time, compiled runs: `references/area-compiler.md`
- The library (`Library/`, `ProjectFortress/LibraryBuiltin/`): `references/area-library.md`
- The specification (`Specification/`), Appendix I, citing it: `references/area-specification.md`
- The gap ledger, FACTS, POSITIONS, the maps; finding what is on record; the repository's history and git archaeology (the session transcripts are the `remote-container` skill's); what every report holds: `references/area-records.md`
- Committing and pushing: `references/committing.md`
- Anything about the container, the session, restarts or agents (the machine's limits and the disk allowance, long commands, the prompt cache and waits, process stops and interrupts, resuming a run, the hooks, the permission check, a lost container): the `remote-container` skill.

A task usually spans several: an interpreter fix needs its area, `build-and-caches.md`, `tests-writing.md` and `tests-running.md`.

`references/sources.md` records where each fact in these parts comes from. It is for maintaining this skill when the tree changes. Do not load it for a task.
