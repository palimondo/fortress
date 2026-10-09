---
name: fortress-repo
description: "Use this skill whenever you touch the code of the Fortress language revival (/home/user/fortress or a worktree like fortress-w4): building with ant; recompiling after editing a .fss, .fsi, Java or Scala file; running programs under walk or the bytecode compiler; running or writing tests (testFast, testSystem, harness-one.sh, junit.sh, .test files, XXX expected failures); the gate before landing; editing the interpreter, compiled checker, code generator, Library or Specification; searching the gap ledger or git history; seeding worktrees; committing a code change. Load it before even a small build, test, edit or measurement there, including long background runs you wait on, and when briefing agents for that work. Skip it for session upkeep (compaction, boot notes, reading batch results, scheduling agents: coordinator skill), Stop hooks, disk or container trouble (cloud-container), other repos, and general Fortress history."
---

# Working in the Fortress revival repository

The team at Sun Labs built the Fortress language from 2003 to 2012 and left it unfinished. This repository finishes their design from what they left: the code, the specification and the papers. The goal is the model program, microGPT, compiled to JVM bytecode and running fast.

**curator**
: Person in charge of this restoration.

**brief**
: Instructions that you were launched with. It gives your mission.

**original tree**
: What the team left in this repository: the code, the specification, the papers and their git history. On disk, it is everything outside `explorations/`, `research/`, `CLAUDE.md` and `.claude/`.

**record**
: Project's memory: the files under `explorations/` that hold what the project has established, decided and measured (below).

**walk**
: Interpreter, and the default command of `bin/fortress`: `bin/fortress P.fss` is the same as `bin/fortress walk P.fss`.

**compiled path**
: Other way to run a program: `bin/fortress compile P.fss` writes JVM bytecode, and `bin/fortress run P` runs it.

**component**
: Unit of Fortress code, in a `.fss` file of its own name. A component implements the apis that it exports, and uses the apis that it imports.

**api**
: Interface, in a `.fsi` file of its own name.

**area**
: One part of the system: the interpreter, the compiled path (the checker, the code generator and the run time), the library, or the specification.

**base**
: Commit that your work starts from.

**gate**
: Full check of a tree before it lands, when a brief asks for it. To land a tree is to commit it to `main` and push `main`.

**harness**
: Suites' own test runner. Each test is a whole Fortress program, not a JUnit test of a Java class. The harness runs the program and checks the result, as LLVM's lit does for Swift's test suite. `harness-one.sh` and `junit.sh` run it on the files that you name.

**building**
: Normal mode of work where you carry out the mission of your brief. You take the facts and the curator's decisions in the record as given.

**exploring**
: Mode of work for a question that the record does not settle. You gather evidence, first in the record and then in the original tree. You add what you found to the record, and then go back to building.

You work with three things: your brief, the record and the original tree. Building happens in one area at a time, so this skill has one part for each area.

## How a program runs

Walk and the compiled path share the parser and the phases below. After those, they share almost no code, so a fix on one path does not reach the other. If you edit a phase that both paths run, run your test on both paths. If you record a defect that the record does not hold, and its program can run on the other path, run it there too. Say in the ledger row which paths show the defect. The Java and Scala paths in this skill are under `ProjectFortress/src/com/sun/fortress/`.

### The phases

Each path runs these phases on each component, in this order (`compiler/phases/PhaseOrder.java`):

1. Parse the source into a syntax tree. This tree is the only form of the program, from the parser to the bytecode.
2. Bind each name to its declaration.
3. Expand the DSL grammars that the component imports (`references/build-and-caches.md`).
4. Check the static types. Walk's phase list holds this phase, but walk switches it off.
5. Desugar: comprehensions and big operators become calls, and getters and setters become methods.
6. Mark each call of an overloaded name.

Walk then interprets the tree. The tree has no static types, so walk finds a type error only at run time, as a failed dispatch. A program that runs under walk can be ill-typed, unlike in Java or Scala.

`fortress compile` runs the same phases with the static type checker, in Scala, switched on. Before the checker, it folds integer literals. After the phases, the code generator writes JVM bytecode into a jar. A type error stops the compile.

Each path has its own library today. At the switch-over, the compiled path moves onto the interpreter's library, and the compiler's prelude, three files of its library, is deleted (`references/compiler.md`). The switch-over comes when the checker accepts the interpreter's library.

### The compiled run time

`fortress run` compiles no Fortress source. It runs the jars of the program and of the library on the JVM. A jar holds JVM class files:

- the component's functions, objects and traits;
- its closures;
- one dispatch method for each overloaded name. It tests the run-time types of all the arguments, from the most specific declaration to the least specific. Walk also chooses at run time.

A generic declaration is compiled once, as a template class. The first time that a program uses an instantiation, such as `Box[\RR64\]`, the class loader makes its class. It copies the template's bytecode, puts in the static arguments, and loads the result. A static argument is a type, or a size as a descriptor from `RTTIsize.of`. These classes are never on disk. C# specialises generics in this way. Java erases them.

The class loader is code of this tree that the revival changes, so a failure while a class loads can be its defect (`references/compiler.md`).

HotSpot, the JVM's compiler, then compiles the hot bytecode to machine code. A number is a boxed object, also inside a specialised class: `RR64` is the class `FRR64`. An array is a library object, read and written through its `get` and `put` methods.

### The caches

A run keeps the results of its phases in the caches, so that a later run can reuse them. The caches are folders in `default_repository/caches/`, or in a private caches folder that a run names. An entry is one file in a cache, written for one source file.

- `interpreter_parsed_cache/`: walk's parsed tree of each file, `X-<hash>.tfi` for an api and `X-<hash>.tfs` for a component.
- `interpreter_cache/`: walk's tree of each component after the phases. Walk loads it back and interprets it. The entry is a text dump of the tree. It starts `(Component @"/home/user/fortress/Library/FlatString.fss":12:1~156:2 ...`.
- `analyzed_cache/`: the results of the phases that `fortress compile` reuses.
- `bytecode_cache/`: one jar for each compiled component.

In the first three caches, `<hash>` is a hash of the source's absolute path, and the entry holds that path. So the entries of a tree copied to another path must be renamed and rewritten. `explorations/coordinator/tools/seed-worktree.sh` does this (`references/worktrees.md`).

`references/build-and-caches.md` says when a run reuses an entry, and when the build empties the caches.

### Parallelism and mutable state

Fortress evaluates in parallel by default, not in Java's left-to-right order. The iterations of a `for` loop, the elements of a tuple, and the arguments and operands of a call can run at once. A loop is sequential only if every generator is `seq(...)`. The parallel parts run as tasks on a work-stealing pool, the fork/join pool of Doug Lea (a `java.util.concurrent.ForkJoinPool`). `FORTRESS_THREADS` sets its number of threads. Tasks, transactions and the pool are built twice, independently: for walk in `interpreter/evaluator/tasks/`, and for the compiled path in `runtimeSystem/`.

`x = e` declares an immutable variable. `var x: T = e` and `x: T := e` declare a mutable one, and `x := e` assigns to it (`Specification/basic/variables.tex`). These are Scala's `val` and `var`, or Swift's `let` and `var`. A field is immutable unless it is declared with `var`. A `value` object has only immutable fields and value semantics, like a Swift `struct`.

Parallel code stays free of races in these ways:

- Most data is immutable.
- A big operator, such as `SUM` or `BIG MAX`, combines the results of its tasks, as OpenMP's reduction clause does. No task writes a shared accumulator. The specification's reduction variables are not built.
- A write to shared state goes inside an `atomic` block. This is software transactional memory, like Haskell's `atomically` (`Specification/basic/evaluation/parallelism.tex`). The programmer writes `atomic`; the compiler adds none.
- Tasks can write different elements of one array in parallel (`Specification/basic/memory-model.tex`, "Programming Discipline").

So `acc := acc + x` inside a parallel `for`, with no `atomic`, is a race. The suites run at four threads, once each, so a race can show in them. A passing run does not prove that there is none.

Inside an `atomic` block, the compiled code tracks each mutable variable that the block reads or writes (`references/compiler.md`).

## Fortress as a language

Each point below corrects an assumption from a language that you know. `references/tests-writing.md` gives the form of a program.

- **Dispatch is on every argument, at run time.** A call chooses among overloads by the run-time types of all its arguments, as in Julia, not by static types as in Java. The checker accepts two overloads only if their parameter types exclude each other, one is more specific, or a third covers their meet. The more specific one's return type must fit the other's. Walk checks part of this at load.
- **Functional methods.** A method with `self` among its parameters is called `f(x)`, not `x.f()`. It overloads with top-level functions. Most operators are declared so: `opr +(self, other: T): T`. A functional method's name is reserved in every program that imports it, so do not name a variable after it. One type must not have a dotted and a functional method of the same name.
- **Traits and objects, no classes.** A trait has methods and abstract fields, and extends several traits. An object is a leaf. `excludes {A, B}` says that no value has both types. `comprises {A, B}` says that every value has a listed type, near Scala's `sealed`. No type may extend two instantiations of one generic trait. This exclusion rule is why the number types are flat (below).
- **Static parameters.** They are written `[\T\]`, and `[i]` indexes. Their kinds are types, sizes (`nat` is an `NN32` value, `int` a `ZZ32`), `bool` and `opr`. Generics are invariant: there is no `+T` or `-T`. An unbounded type parameter is bounded by `Any`, which holds tuples, functions and `()`, as `Object` does not. A type parameter that a call does not fix takes its bound. Under walk, one whose bound names the parameter itself, such as `SUM`'s, stays open, and every value passes it. Some other cases still get the empty type `Bottom` under walk (`references/revival-changes.md`, "Static parameters").
- **Numbers are siblings, not a tower.** `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64` are siblings under `Number`. None is a subtype of another, unlike Haskell's classes or Java's widening. A wider type declares a `coerce` from each narrower one. A conversion never changes which declaration runs when one already fits. Overflow raises `IntegerOverflow`. The algebra is self-typed traits, such as `AdditiveGroup[\T\]` with `+`, not monoids over an operator parameter. `references/library.md` gives the rest: ranges, wrapping, `SUM`.
- **Loops and reductions are library code.** `for`, comprehensions and `SUM` call the library's generators and reductions (`references/library.md`).
- **Juxtaposition is an operator, and whitespace counts.** `f x` applies a function. Otherwise juxtaposition is an operator that the library overloads: `2 x` multiplies, and `"a" "b"` concatenates. How three juxtaposed items group depends on their types, unlike in Haskell. An infix operator has whitespace on both sides or on neither: `a -b` is a static error. Precedence is partial: `a + b ∪ c` needs parentheses.
- **Specified, but not built:** dimensions and units, `property` declarations, regions and complex numbers. Some constructs run only under walk (`references/compiler.md`).

## The record

The record's main files:

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

When you switch, load `references/exploring.md`. It says which choices are yours and which go to the curator.

## Rules for every task

- Carry out the curator's decisions as the record states them.
- If the record does not settle a question that your work meets, switch to exploring.
- Cite a source for each claim that you write: your brief, an entry of the record, or a primary source (the code, the specification, the papers or a command's output).
- Reproduce a behaviour before you explain it: run a command that shows it, unless your brief cites the command's output.
- When you probe or debug, change one thing at a time, so that each result has one cause.
- Write the test before the fix for every edit of source code in the original tree. Add the test to the test suite and see it fail through the harness. Then make the fix and see the test pass. An edit of the specification or the documentation has no test (`references/tests-writing.md`).
- Assert every value that matters inside the test, with the harness's own checks (`references/tests-writing.md`), and take the suite's pass or fail as the result. Do not compare the output of a whole run of tests with a saved copy, and do not add expected-output files. The gate's comparisons with the last landed gate and with the ladder's baseline are the exceptions (`references/gate.md`).
- Take the tree that you start from as passing: its suites passed before it landed. Do not run them to check that. Start with your own failing test.
- Reuse each result of a build, a suite, a stage of the gate, a test or a measurement that your brief cites or that your own work ran. Cite it. Run it again only after the code changes. Running a new program is not a repeat.
- Before you investigate a defect, or edit a file of the original tree, look for its rows in the gap ledger, with the queries of `references/records.md`, "Reading the record".
- After your fix, run your own tests. Run a whole suite where `references/tests-running.md`, "When to run a whole suite", asks for it, and nowhere else.
- Set up each Bash call as `references/build-and-caches.md` says, because every call starts a new shell.
- After an edit, take the step that `references/build-and-caches.md` gives for the kind of file that you edited.
- Run long commands (a build, a suite) in the background with a log under your tree's `tmp/`, and poll the log (`references/session.md`). Do not pipe `ant` through `tail`: if the Bash tool's time limit stops the command, it shows nothing.
- Before you design a change to the library, study how the library already does the same kind of thing, and follow its way (`references/library.md`).
- Do not claim credit for the revival anywhere in a committed file. If git does not record who wrote something, reconstruct the authorship from the history. Do not guess it.
- Commit only the paths that you wrote. Do not commit scratch: logs, captured output, probe programs. Do not rename a file to get it past `.gitignore`. Each agent's transcript keeps how the work was done (`references/committing.md`).
- End your work with a report. List in it the defects that you found, your decisions, and the points that your brief asks for. Put a question for the curator in it as a decision not taken (`references/records.md`).

## The parts

Load the parts below that your task touches before you run the query of the record that your brief gives. The parts give the words that you need to understand what the query prints.

The parts, in the order that work meets them:

- Setting up each call, building, the caches, what to rebuild after an edit: `references/build-and-caches.md`
- The Bash tool and its timeout, long commands and polling, waits and the prompt cache, stopping processes, interrupts and stops of the session's process, the automatic permission check: `references/session.md`
- The base and its build, worktrees seeded from it, the old code beside the new: `references/worktrees.md`
- The build failing, JDKs, scalac and ASM traps, generated sources: `references/toolchain.md`
- The interpreter area: walk's code (`interpreter/`), where a fix of walk belongs, its checks at load, its natives, running programs under walk, the microGPT check: `references/interpreter.md`
- The compiled area: the checker, the code generator, the run time, compiled runs, the `fortress` commands: `references/compiler.md`
- The library area (`Library/`, `ProjectFortress/LibraryBuiltin/`): `references/library.md`
- The specification area (`Specification/`), Appendix I, citing it: `references/specification.md`
- What the revival changed in the team's Fortress, each change with its contradiction and reason; load it when a team source, an old note or your training disagrees with this skill: `references/revival-changes.md`
- Exploring: where to search, what to record and report, which choices are yours: `references/exploring.md`
- Writing a test: `.test` keys, `XXX` expected failures and their promotion, refusals at load, how a defect that you found is recorded: `references/tests-writing.md`
- Running one test, a few, or a whole suite, and when to run a whole suite; what runs outside the gate: `references/tests-running.md`
- The gate: what it runs and writes, the atomic runs, the ladder regression: `references/gate.md`
- Committing and pushing: `references/committing.md`
- What every report holds and where it goes, findings and points to report; POSITIONS, FACTS and the gap ledger; the queries of the record and when to run each; writing the ledger with `ledger.py`; the repository's history: `references/records.md`
- This cloud platform (the machine, the disk, the network, the platform's stops, the transcript backup, a lost container): the `cloud-container` skill.

A task usually needs several parts, and every task needs `records.md`, for its queries and its report. For example, a fix of walk needs `build-and-caches.md`, `session.md`, `worktrees.md`, `interpreter.md`, `tests-writing.md`, `tests-running.md` and `committing.md`. An edit of the library needs the same parts and `library.md`.

`references/sources.md` gives the source of each fact in these parts. Use it only to maintain this skill. Do not load it for a task.
