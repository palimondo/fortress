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

**curator**
: Person in charge of this restoration.

**brief**
: Instructions that you were launched with. It gives your mission.

**original tree**
: What the team left in this repository: the code, the specification, the papers and their git history. On disk, it is everything outside `explorations/`, `research/`, `CLAUDE.md` and `.claude/`.

**record**
: Project's memory: the files under `explorations/` that hold what the project has established, decided and measured (below).

**area**
: One part of the system: the interpreter, the compiled path (the checker, the code generator and the run-time), the library, or the specification.

**base**
: Commit that your work starts from.

**gate**
: Full check of a tree before it lands. To land a tree is to commit it to `main` and push `main`.

**harness**
: Suites' own test runner. Each test is a whole Fortress program, not a JUnit test of a Java class. The harness runs the program and checks the result, as LLVM's lit does for Swift's test suite. `harness-one.sh` and `junit.sh` run it on the files that you name.

**building**
: Normal mode of work where you carry out the mission of your brief. You take the facts and the curator's decisions in the record as given.

**exploring**
: Mode of work for a question that the record does not settle. You gather evidence, first in the record and then in the original tree. You add what you found to the record, and then go back to building.

You work with three things: your brief, the record and the original tree. Building happens in one area at a time, so this skill has one part for each area.

## Fortress as a language

Fortress is not in your training in any depth. Each point below corrects an assumption from a language that you know.

- **Only the compiled path checks types.** Walk runs a program with no static types. So a program that runs under walk can be ill-typed, unlike in Java or Scala.
- **Dispatch is on every argument, at run time.** A call chooses among overloads by the run-time types of all its arguments, as in Julia, not by static types as in Java. The compiled checker accepts two overloads only if their parameter types exclude each other, one is more specific, or a third covers their meet. The more specific one's return type must fit the other's. Walk checks part of this at load.
- **Functional methods.** A method with `self` among its parameters is called `f(x)`, not `x.f()`. It overloads with top-level functions. Most operators are declared so: `opr +(self, other: T): T`. Its name is reserved in every program that imports it, so do not name a variable after it. One type must not have a dotted and a functional method of the same name.
- **Traits and objects, no classes.** A trait has methods and abstract fields, and extends several traits. An object is a leaf. `excludes {A, B}` says that no value has both types. `comprises {A, B}` says that every value has a listed type, near Scala's `sealed`. No type may extend two instantiations of one generic trait. This exclusion rule is why the number types are flat (below).
- **Static parameters.** They are written `[\T\]`, and `[i]` indexes. Their kinds are types, sizes (`nat` is an `NN32` value, `int` a `ZZ32`), `bool` and `opr`. Generics are reified, not erased as in Java. They are invariant: there is no `+T` or `-T`. An unbounded type parameter is bounded by `Any`, which holds tuples, functions and `()`, as `Object` does not. A type parameter that a call does not fix takes its bound.
- **Numbers are siblings, not a tower.** `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64` are siblings under `Number`. None is a subtype of another, unlike Haskell's classes or Java's widening. A wider type declares a `coerce` from each narrower one. A conversion never changes which declaration runs when one already fits. Overflow raises `IntegerOverflow`. The algebra is self-typed traits, such as `AdditiveGroup[\T\]` with `+`, not monoids over an operator parameter. `references/library.md` gives the rest: ranges, wrapping, `SUM`.
- **Evaluation is parallel by default.** Tuple elements, arguments, operands and `for` iterations can run at once, not in Java's left-to-right order. A loop is sequential only if every generator is `seq(...)`. A shared `var` that a loop updates is a race: use a reduction, `seq` or `atomic`. The suites run at one thread, so they do not show races.
- **Loops and reductions are library code.** `for`, comprehensions and `SUM` call the library's generators and reductions (`references/library.md`).
- **Juxtaposition is an operator, and whitespace counts.** `f x` applies a function. Otherwise juxtaposition is an operator that the library overloads: `2 x` multiplies, and `"a" "b"` concatenates. How three juxtaposed items group depends on their types, unlike in Haskell. An infix operator has whitespace on both sides or on neither: `a -b` is not `a - b`. Precedence is partial: `a + b ∪ c` needs parentheses.
- **Declarations.** `x = e` binds a name that cannot change. `var x: T = e` and `x: T := e` declare a variable, and `x := e` assigns. `references/tests-writing.md` gives the form of a program.
- **Specified, but not built:** dimensions and units, `property` declarations, regions, reduction variables and complex numbers. Some constructs run only under walk (`references/compiler.md`).

## The record

The record is kept in the repository, because a session can move to a new container. Memory outside the repository is lost then. Its main files:

- `explorations/coordinator/POSITIONS.md`: the curator's decisions.
- `explorations/coordinator/FACTS.md`: what is established about the original tree. Each fact has its source and its test.
- `explorations/coordinator/INDEX.md`: one line for each note under `explorations/`.
- `explorations/fortress-gap-ledger.md`, the gap ledger: the known gaps, one row each.

Read a slice of the record with `explorations/coordinator/tools/facts-extract.sh`. `references/records.md` lists its queries.

## When to explore

Switch from building to exploring when you meet one of these:

- A gap: something missing or broken that the record does not know.
- A conflict: two of the team's sources disagree, and no decision of the curator says which one is correct. The team's sources are the specification, the papers, the library and the implementations.
- New evidence against a decision of the curator. Evidence is new only if the decision did not use it. Your own view of the evidence that it used is not new evidence.

When you switch, load `references/exploring.md`. The curator settles the question after research.

## Rules for every task

- Carry out the curator's decisions as the record states them.
- If the record does not settle a question that your work meets, switch to exploring.
- Cite a source for each claim that you write: your brief, an entry of the record, or a primary source (the code, the specification, the papers or a command's output).
- Reproduce a behaviour before you explain it: run a command that shows it, unless your brief cites the command's output.
- When you probe or debug, change one thing at a time, so that each result has one cause.
- Write the test before the fix for every edit of source code in the original tree. Add the test to the test suite and see it fail through the harness. Then make the fix and see the test pass. An edit of the specification or the documentation has no test (`references/tests-writing.md`).
- Assert every value that matters inside a test, and take the suite's pass or fail as the result. Do not compare the printed output of the tests, and do not add expected-output files. The gate's ladder stage is the one exception (`references/gate.md`).
- Take the tree that you start from as green: its suites passed before it landed. Do not run them to check that. Start with your own failing test.
- Reuse each result of a build, a suite, a stage of the gate or a test that your brief cites or that your own work ran. Cite it. Run it again only after the code changes. Running a new program is not a repeat.
- After your fix, run your own tests. Run a whole suite only where `references/tests-running.md` says that your edit reaches it.
- Set up each Bash call as `references/build-and-caches.md` says, because every call starts a new shell. Do not run `source explorations/experiment/env.sh` while a build or a Fortress program may be running: the script deletes files that they use.
- After an edit, recompile what you edited. Do not delete the caches to fix stale code (`references/build-and-caches.md`).
- Run long commands (a build, a suite) in the background with a log under your tree's `tmp/`, and poll the log (`references/session.md`). Do not pipe `ant` through `tail`: if the Bash tool's time limit stops the command, it shows nothing.
- Before you design a change to the library, study how the library already does the same kind of thing, and follow its way (`references/library.md`).
- Do not claim credit for the revival anywhere in a committed file. If git does not record who wrote something, reconstruct the authorship from the history. Do not guess it.
- Commit only the paths that you wrote. Do not commit scratch: logs, captured output, probe programs. Do not rename a file to get it past `.gitignore`. Each agent's transcript keeps how the work was done (`references/committing.md`).
- End your work with a report. List in it the defects that you found, your decisions, and the points that your brief asks for. Put a question for the curator in it as a decision not taken (`references/records.md`).

## The parts

Load the parts below that your task touches before you run the query of the record that your brief gives. The parts give the words that you need to understand what the query prints.

The parts, in the order that work meets them:

- Setting up each call: `references/build-and-caches.md`
- The Bash tool and its timeout, long commands and polling, waits and the prompt cache, stopping processes, interrupts and stops of the session's process, the automatic permission check: `references/session.md`
- The base and its build, worktrees seeded from it, the old code beside the new: `references/worktrees.md`
- Building, the caches, what to rebuild after an edit: `references/build-and-caches.md`
- The build failing, JDKs, scalac and ASM traps, generated sources: `references/toolchain.md`
- The interpreter area: walk's code (`interpreter/`), its natives, running programs under walk: `references/interpreter.md`
- The compiled area: the checker, the code generator, the run-time, compiled runs, the `fortress` commands: `references/compiler.md`
- The library area (`Library/`, `ProjectFortress/LibraryBuiltin/`): `references/library.md`
- The specification area (`Specification/`), Appendix I, citing it: `references/specification.md`
- Exploring: where to search, what to record and report, which choices are yours: `references/exploring.md`
- Writing a test: `.test` keys, `XXX` expected failures and their promotion, refusals at load, how a defect that you found is recorded: `references/tests-writing.md`
- Running one test, a few, or a whole suite, and when to run a whole suite; what runs outside the gate: `references/tests-running.md`
- The gate: what it runs and writes, the atomic runs, the ladder regression: `references/gate.md`
- Committing and pushing: `references/committing.md`
- What every report holds and where it goes, findings and points to report; the ledger, FACTS and POSITIONS; the repository's history; the queries of the record: `references/records.md`
- This cloud platform (the machine, the disk, the network, the platform's stops, the transcript backup, a lost container): the `cloud-container` skill.

A task usually needs several parts. For example, an interpreter fix needs `build-and-caches.md`, `interpreter.md`, `tests-writing.md`, `tests-running.md` and `committing.md`. Every report takes the form in `records.md`.

`references/sources.md` gives the source of each fact in these parts. Use it only to maintain this skill. Do not load it for a task.
