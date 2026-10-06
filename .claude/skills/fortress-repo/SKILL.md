---
name: fortress-repo
description: "Use this skill whenever you touch the code of the Fortress language revival (/home/user/fortress or a worktree like fortress-w4): building with ant; recompiling after editing a .fss, .fsi, Java or Scala file; running programs under walk or the bytecode compiler; running or writing tests (testFast, testSystem, harness-one.sh, junit.sh, .test files, XXX expected failures); the gate before landing; editing the interpreter, compiled checker, code generator, Library or Specification; searching the gap ledger or git history; seeding worktrees; committing a code change. Load it before even a small build, test, edit or measurement there, including long background runs you wait on, and when briefing agents for that work. Skip it for session upkeep (compaction, boot notes, reading batch results, scheduling agents: coordinator skill), Stop hooks, disk or container trouble (cloud-container), other repos, and general Fortress history."
---

# Working in the Fortress revival repository

The team at Sun Labs built the Fortress language from 2003 to 2012 and left it unfinished. This repository finishes their design from what they left: the code, the specification and the papers. The goal is the model program, microGPT, compiled to JVM bytecode and running fast.

`bin/fortress` has two paths. They share one parser and the early phases.

- Walk is the interpreter. It interprets the syntax tree, slowly. It is the default command: `bin/fortress P.fss` is the same as `bin/fortress walk P.fss`.
- The compiled path makes JVM bytecode and runs it: `bin/fortress compile P.fss`, then `bin/fortress run P`.

Each path has its own library today. At the switch-over, the compiled path moves onto the interpreter's library, and the compiler's own library is deleted. The switch-over comes when the compiled type checker accepts the interpreter's library.

The original tree is the historical code that the work revives. It is everything outside `explorations/`, `research/`, `CLAUDE.md` and `.claude/`.

## Terms used in every part

- The curator is the person in charge of this restoration.
- The base is the commit that your work starts from.
- The gate is the full check of a tree before it lands. To land a tree is to commit it to `main` and push `main`.
- The record is the set of files under `explorations/` that hold what the project has established, decided and measured.
- The harness is the suites' own test runner. Each test is a whole Fortress program, not a JUnit test of a Java class: the harness runs the program and checks the result, as LLVM's lit does for Swift's test suite. `harness-one.sh` and `junit.sh` run it on the files that you name.

## Rules for every task

- Write the test before the fix for every edit of source code in the original tree. Add the test to the test suite and see it fail through the harness. Then make the fix and see the test pass. An edit of the specification or the documentation has no test (`references/tests-writing.md`).
- Assert every value that matters inside a test, and take the suite's pass or fail as the result. Do not compare the printed output of the tests, and do not add expected-output files. The gate's ladder stage is the one exception (`references/gate.md`).
- Take the tree that you start from as green: its suites passed before it landed. Do not run them to check that. Start with your own failing test.
- Do not run again a build, a suite, a stage or a test run whose result you already have for the same code: one that your brief cites, or one that your own work ran. Cite that result instead. A result stays valid until the code changes. A run of a new program is not a repeat.
- After your fix, run your own tests. Run a whole suite only where `references/tests-running.md` says that your edit reaches it.
- Reproduce a behaviour before you explain it, unless your brief cites such a run.
- After an edit, recompile what you edited. Do not delete the caches to fix stale code (`references/build-and-caches.md`).
- Set up each Bash call as `references/build-and-caches.md` says, because every call starts a new shell. Do not run `source explorations/experiment/env.sh` while any run may be live: the script deletes files that other runs use.
- Before you design a change to the library, study how the library already does the same kind of thing, and follow its way (`references/area-library.md`).
- If the team's own sources disagree, follow the later one. The team learned as it built, so a later paper, implementation or text outweighs an earlier one, the specification included. Revise the specification to match the later word, in the revision form (`references/area-specification.md`).
- Check every claim against a primary source: the code, the specification, the papers or a run.
- When you probe or debug, change one thing at a time, so that each result has one cause.
- Do not claim credit for the revival anywhere in a committed file. If git does not record who wrote something, reconstruct the authorship from the history. Do not guess it.
- Run long commands (a build, a suite) in the background with a log under your tree's `tmp/`, and poll the log (`references/session.md`). Do not pipe `ant` through `tail`: if the Bash tool's time limit stops the command, it shows nothing.
- Commit only the paths that you wrote. Do not commit scratch (`references/committing.md`).
- In every report, give each defect's home, each decision with its alternatives and evidence, and each point that your brief asks you to report and the work reached. Do not ask the curator anything (`references/area-records.md`, "What every report holds").

## Parts to load

Load the parts that your task touches:

- Setting up each call, building, the caches, what to rebuild after an edit: `references/build-and-caches.md`
- The build failing, JDKs, scalac and ASM traps, generated sources: `references/toolchain.md`
- The base and its build, worktrees seeded from it, the old code beside the new: `references/worktrees.md`
- Running one test, a few, or a whole suite, and when to run a whole suite; what runs outside the gate: `references/tests-running.md`
- The gate: what it runs and writes, the atomic runs, the ladder regression: `references/gate.md`
- Writing a test: `.test` keys, `XXX` expected failures and their promotion, refusals at load, the home of a measured defect: `references/tests-writing.md`
- Walk's code (`interpreter/`), its natives, running programs under walk: `references/area-interpreter.md`
- The compiled checker, the code generator, the run-time, compiled runs, the `fortress` commands: `references/area-compiler.md`
- The library (`Library/`, `ProjectFortress/LibraryBuiltin/`): `references/area-library.md`
- The specification (`Specification/`), Appendix I, citing it: `references/area-specification.md`
- The gap ledger, FACTS, POSITIONS, the maps; finding what is on record; the repository's history; points to report; what every report holds and where it goes: `references/area-records.md`
- Committing and pushing: `references/committing.md`
- The Bash tool and its timeout, long commands and polling, waits and the prompt cache, stopping processes, interrupts and stops of the session's process, the automatic permission check: `references/session.md`
- This cloud platform (the machine, the disk allowance, the network, the platform's stops, check-ins, the transcript backup, the git-check hook, a lost container): the `cloud-container` skill.

A task usually needs several parts. For example, an interpreter fix needs `area-interpreter.md`, `build-and-caches.md`, `tests-writing.md`, `tests-running.md` and `committing.md`. Every report takes the form in `area-records.md`.

`references/sources.md` gives the source of each fact in these parts. Use it only to maintain this skill. Do not load it for a task.
