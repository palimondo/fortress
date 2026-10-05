---
name: fortress-repo
description: "Use this skill for hands-on work on the Fortress language revival code in /home/user/fortress: building with ant and recompiling after editing a .fss, .fsi, Java or Scala file (recompiling what changed, not wiping caches); running programs under walk (the interpreter) or the bytecode compiler; running or writing tests (testFast, testSystem, harness-one.sh, junit.sh, .test keys, XXX expected failures); the gate; measuring the checker count or distance to the switch-over; changes to the interpreter, compiled checker, code generator, Library or Specification; the gap ledger or git history; seeding worktrees; committing a code change. Load it before any build, test, edit or measurement there, however small, and when planning agents for that work. Not for session housekeeping, even in this repo: Stop hooks, git-check reminders, compaction, boot or handoff notes, coordinator scheduling, held lists, restarts, disk or container limits. Long waits and agents: claude-session skill; disk and container: cloud-container."
---

# Working in the Fortress revival repository

The team at Sun Labs built the Fortress language from 2003 to 2012 and left it unfinished. This repository finishes their design from what they left: the code, the specification and the papers. The goal is the model program, microGPT, compiled to JVM bytecode and running fast.

`bin/fortress` has two paths. They share one parser and the early phases.

- Walk is the interpreter. It interprets the syntax tree, slowly. It is the default command: `bin/fortress P.fss` is the same as `bin/fortress walk P.fss`.
- The compiled path makes JVM bytecode and runs it: `bin/fortress compile P.fss`, then `bin/fortress run P`.

Each path has its own library today. At the switch-over, the compiled path moves onto the interpreter's library, and the compiler's own library is deleted. The switch-over comes when the compiled type checker accepts the interpreter's library.

The original tree is the historical code that the work revives. It is everything outside `explorations/`, `research/`, `CLAUDE.md` and `.claude/`.

## Who works here

The curator is the person who curates this restoration. The curator decides what is committed and what the agents do. The coordinator is the main session. It keeps the project's records and launches the agents. Your brief is the set of instructions that you were launched with.

You are one of two kinds of worker. If a passage of this skill applies to one kind only, it says which.

- A rung worker works in a batch. A batch is a set of changes, the rungs, that one Workflow script runs together: `explorations/coordinator/climb-batch-workflow.js`, with its manual beside it. The names come from the compile ladder, the record of how far each corpus program gets through the compiler's phases (`explorations/compile-ladder/`). A rung worker makes its own worktree and works only there. It commits and pushes only its own `wip/` branch. Other roles of the batch check the rung (a skeptic and a judge), merge the rungs onto `main` (the gather), run the gate on the merged tree, and land it.
- A worker launched alone is launched by the coordinator outside a batch. It works where its brief says, often in the main tree, `/home/user/fortress`, on `main`. Other agents work in the same tree. This worker commits to `main` and pushes `main` itself (`references/committing.md`).

These terms are used in every part:

- The base is the commit that the work starts from. In a batch, every rung's branch starts from it, and the brief names it (`references/worktrees.md`).
- The gate is the full check of a tree before it lands (`references/gate.md`). To land a tree is to commit it to `main` and push `main`.
- The record is the set of files under `explorations/` that hold what the project has established, decided and measured (`references/area-records.md`).
- The harness is the suites' own test runner. `harness-one.sh` and `junit.sh` run it on the files that you name (`references/tests-running.md`).
- A stop is a point that your brief names. If the work reaches a stop, your report must say so (`references/area-records.md`).

## Rules for every task

- Do every edit under the original tree test first. Write the test and see it fail through the harness. Then make the fix and see the test pass. Keep the test in the corpus. A prose edit that no test can observe has no test (`references/tests-writing.md`).
- Use the suite's verdict as the check. Assert every value that matters inside a test. Do not compare the printed output of the test corpora, and do not add expected-output files. The gate's ladder stage is the one exception (`references/gate.md`).
- Do not build or run anything twice on the same code. If the record or another agent's transcript holds the result of a build, a suite, a stage or a test run on the same code, cite that result. A finished log stays valid until the tree changes. A run of a new program, or a new measurement, is not a repeat.
- Reproduce a behaviour before you explain it, unless such a run is already on record.
- After an edit, recompile what you edited. Do not delete the caches to fix stale code (`references/build-and-caches.md`).
- Every Bash call starts a new shell. Set up each call as `references/build-and-caches.md` says. Do not source `explorations/experiment/env.sh` while any run may be live: it deletes files that other runs use.
- The specification is the standard for what the language means. Change its text only in the revision form (`references/area-specification.md`). The library's own practice is the model for how to write a change to the library (`references/area-library.md`).
- Check every claim against a primary source: the code, the specification or a run. Change one variable per step.
- Do not claim credit for the revival anywhere in a committed file. If git does not record who wrote something, reconstruct the authorship from the history. Do not guess it.
- Run long commands (a build, a suite, the distance stage) in the background with a log under your tree's `tmp/`, and poll the log (`references/session.md`). Do not pipe `ant` through `tail`.
- Commit only the paths that you wrote. Do not commit scratch or a model identifier. The curator decides what is committed.
- In every report, give each defect's home, each decision with its alternatives and evidence, and each stop that the work met. Do not ask the curator anything (`references/area-records.md`, "What every report holds").

## Parts to load

Load the parts that your task touches:

- Setting up each call, building, the caches, what to rebuild after an edit: `references/build-and-caches.md`
- The build failing, JDKs, scalac and ASM traps, generated sources: `references/toolchain.md`
- The base and its build, worktrees seeded from it, the old code beside the new: `references/worktrees.md`
- Running one test, a few, or a whole suite, and when to run a whole suite; what runs outside the gate: `references/tests-running.md`
- The gate: who runs it, what it runs and writes, the atomic runs, the ladder regression: `references/gate.md`
- Writing a test: `.test` keys, `XXX` expected failures and their promotion, refusals at load, the home of a measured defect: `references/tests-writing.md`
- The checker count and the distance; which edits cannot move them: `references/checker-measurements.md`
- Walk's code (`interpreter/`), its natives, running programs under walk: `references/area-interpreter.md`
- The compiled checker, the code generator, the run-time, compiled runs, the `fortress` commands: `references/area-compiler.md`
- The library (`Library/`, `ProjectFortress/LibraryBuiltin/`): `references/area-library.md`
- The specification (`Specification/`), Appendix I, citing it: `references/area-specification.md`
- The gap ledger, FACTS, POSITIONS, the maps; finding what is on record; the repository's history; stops; what every report holds and where it goes: `references/area-records.md`
- Committing and pushing, for each kind of worker: `references/committing.md`
- The Bash tool and its timeout, long commands and polling, waits and the prompt cache, stopping processes, interrupts and stops of the session's process, the automatic permission check: `references/session.md`
- This cloud platform (the machine, the disk allowance, the network, the platform's stops, check-ins, the transcript backup, the git-check hook, a lost container): the `cloud-container` skill.

A task usually needs several parts. For example, an interpreter fix needs `area-interpreter.md`, `build-and-caches.md`, `tests-writing.md`, `tests-running.md` and `committing.md`. Every report takes the form in `area-records.md`.

`references/sources.md` gives the source of each fact in these parts. Use it only to maintain this skill. Do not load it for a task.
