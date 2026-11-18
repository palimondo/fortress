# Context: how Fortress programs run, and how its tests are written

Two excerpts from the project's guide for contributors. Paths under `ProjectFortress/src/com/sun/fortress/` are cited without that prefix.

## How a program runs

Walk and the compiled path share the parser and the phases below. After those, they share almost no code, so a fix on one path does not reach the other. If you edit a phase that both paths run, or a class under `nativeHelpers/` that a `builtinPrimitive` string of the interpreter's library names (`references/interpreter.md`, "Natives"), run your test on both paths. `references/compiler.md`, "Natives", says how to test such a class on the compiled path. If you record a defect that the record does not hold, and its program can run on the other path, run it there too. Say in the ledger row which paths show the defect. The Java and Scala paths in this skill are under `ProjectFortress/src/com/sun/fortress/`.

### The phases

Each path runs these phases on each component, in this order (`compiler/phases/PhaseOrder.java`):

1. Parse the source into a syntax tree. This tree is the only form of the program, from the parser to the bytecode.
2. Bind each name to its declaration.
3. Expand the DSL grammars that the component imports (`references/build-and-caches.md`).
4. Fold each expression of numerals alone into one exact value: a numeral, a quotient of two numerals or a boolean (`references/revival-changes.md`, "Numbers").
5. Check the static types. Walk's phase list holds this phase, but walk switches it off.
6. Desugar: comprehensions and big operators become calls, and getters and setters become methods.
7. Mark each call of an overloaded name.

Walk then interprets the tree. The tree has no static types, so walk finds a type error only at run time, as a failed dispatch. A program that runs under walk can be ill-typed, unlike in Java or Scala.

`fortress compile` runs the same phases with the static type checker, in Scala, switched on. After the phases, the code generator writes JVM bytecode into a jar. A type error stops the compile.

Each path has its own library today. With the environment variable `FORTRESS_LIBRARY=one`, `fortress compile` reads the one library instead, and a program compiled so does not run yet (`references/build-and-caches.md`, "The caches"). At the switch-over, the compiled path moves onto the interpreter's library, and the compiler's prelude, three files of its library, is deleted (`references/compiler.md`). The compiled checker already finds no error in the interpreter's library. For the `FortressLibrary` component, the count stage shows this as a total of 0 (`references/compiler.md`). The switch-over waits for walk's natives: each function that the interpreter's library binds with `builtinPrimitive` (`references/interpreter.md`, "Natives") must first have a binding that the compiled path runs.

### The compiled runtime

`fortress run` compiles no Fortress source. It runs the jars of the program and of the library on the JVM. A jar holds JVM class files:

- the component's functions, objects and traits;
- its closures;
- one dispatch method for each overloaded name. It tests the run-time types of all the arguments, from the most specific declaration to the least specific. Walk also chooses at run time.

A generic declaration is compiled once, as a template class. The first time that a program uses an instantiation, such as `Box[\RR64\]`, the class loader makes its class. It copies the template's bytecode, puts in the static arguments, and loads the result. A static argument is a type, or a size as a descriptor from `RTTIsize.of`. These classes are never on disk. C# specialises generics in this way. Java erases them.

The class loader is code of this tree that the revival changes, so a failure while a class loads can be its defect (`references/compiler.md`).

HotSpot, the JVM's compiler, then compiles the hot bytecode to machine code. A number is a boxed object, also inside a specialised class: under the compiler's prelude, an `RR64`'s class extends `FRR64`, which holds the `double`. An array is a library object, read and written through its `get` and `put` methods.

### The caches

A run keeps the results of its phases in the caches, so that a later run can reuse them. The caches are folders in `default_repository/caches/`, in `default_repository/caches-one/` with `FORTRESS_LIBRARY=one`, or in a private caches folder that a run names. An entry is one file in a cache, written for one source file.

- `interpreter_parsed_cache/`: walk's parsed tree of each file, `X-<hash>.tfi` for an api and `X-<hash>.tfs` for a component.
- `interpreter_cache/`: walk's tree of each component after the phases. Walk loads it back and interprets it. The entry is a text dump of the tree. It starts `(Component @"`.
- `analyzed_cache/`: the results of the phases that `fortress compile` reuses.
- `bytecode_cache/`: one jar for each compiled component.

In the first three caches, `<hash>` is a hash of the source's absolute path, and the entry holds that path. So the entries of a tree copied to another path must be renamed and rewritten. `explorations/coordinator/tools/seed-worktree.sh` does this (`references/worktrees.md`).

`references/build-and-caches.md` says when a run reuses an entry, and when the build empties the caches.

### Parallelism and mutable state

Fortress evaluates in parallel by default, not in Java's left-to-right order. The iterations of a `for` loop, the elements of a tuple, and the arguments and operands of a call can run at once. A loop is sequential only if every generator is `seq(...)`. The parallel parts run as tasks on a work-stealing pool, the fork/join pool of Doug Lea (a `java.util.concurrent.ForkJoinPool`). `FORTRESS_THREADS` sets its number of threads. Tasks, transactions and the pool are built twice, independently: for walk in `interpreter/evaluator/tasks/`, and for the compiled path in `runtimeSystem/`.

`x = e` declares an immutable variable. `var x: T = e` and `x: T := e` declare a mutable one, and `x := e` assigns to it (`Specification/basic/variables.tex`). These are Scala's `val` and `var`, or Swift's `let` and `var`. A field is immutable unless it is declared with `var`. A value object is a tuple, `()`, or an object whose declaration, or a trait that it extends, has the `value` modifier, as the library's numbers, characters and booleans do. It has only immutable fields and value semantics, like a Swift `struct`. Nothing refuses a `var` field in a value object, so give it none. Any other object, except a function, is a reference object, like an instance of a Swift class. Each construction makes a new reference object, distinct from all others (`Specification/basic/objects.tex:24-33`).

Parallel code stays free of races in these ways:

- Most data is immutable.
- A big operator, such as `SUM` or `BIG MAX`, combines the results of its tasks, as OpenMP's reduction clause does. No task writes a shared accumulator. The specification's reduction variables are not built.
- A write to shared state goes inside an `atomic` block. This is software transactional memory, like Haskell's `atomically` (`Specification/basic/evaluation/parallelism.tex`). The programmer writes `atomic`; the compiler adds none.
- Tasks can write different elements of one array in parallel (`Specification/basic/memory-model.tex`, "Programming Discipline").

So `acc := acc + x` inside a parallel `for`, with no `atomic`, is a race. The suites run at four threads, once each, so a race can show in them. A passing run does not prove that there is none.

Inside an `atomic` block, the compiled code tracks each mutable variable that the block reads or writes, an object's `var` field among them. From the switch-over, it also tracks each array element that the block reads or writes (`references/compiler.md`).

An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block.

## Fortress as a language

Each point below corrects an assumption from a language that you know. `references/tests-writing.md` gives the form of a program.

- **Dispatch is on every argument, at run time.** A call chooses among overloads by the run-time types of all its arguments, as in Julia, not by static types as in Java. The checker accepts two overloads only if their parameter types exclude each other, one is strictly more specific, or a third covers their meet. The more specific one's return type must fit the other's: the Return Type Rule. Walk checks part of this at load.
- **Functional methods.** A method with `self` among its parameters is called `f(x)`, not `x.f()`. It overloads with top-level functions. Most operators are declared so: `opr +(self, other: T): T`. A functional method's name is reserved in every program that imports it, so do not name a variable after it. One type must not have a dotted and a functional method of the same name.
- **Traits and objects, no classes.** A trait has methods and abstract fields, and extends several traits. An object is a leaf. `excludes {A, B}` says that no value has both types. `comprises {A, B}` says that every value has a listed type, near Scala's `sealed`. No type may extend two instantiations of one generic trait. This exclusion rule is why the number types are flat (below).
- **Static parameters.** They are written `[\T\]`, and `[i]` indexes. Their kinds are types, sizes (a `nat` or `int` parameter used as a value is a `ZZ32`, but a `ZZ` where it is one of a numeral type's numbers: `references/revival-changes.md`, "Numbers"), `bool` and `opr`. Generics are invariant: there is no `+T` or `-T`. An unbounded type parameter is bounded by `Any`, which holds tuples, functions and `()`, as `Object` does not. A type parameter that a call does not fix takes its bound. Under walk, one whose bound names the parameter itself stays open, and every value passes it. Walk instantiates a reduction or a comprehension without static arguments at the type declared for its value: a local variable's type, or a top-level or local function's return type. Without one, it uses the join, the least common supertype, of its elements' run-time types. Some other cases still get the empty type `Bottom` under walk (`references/revival-changes.md`, "Static parameters").
- **Numbers are siblings, not a tower.** `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64` are siblings under `Number`. None is a subtype of another, unlike Haskell's classes or Java's widening. A wider type declares a `coerce` from each narrower one. A conversion does not change which declaration runs when one already fits. A numeral is the one exception: it can run a more specific declaration that its coercion reaches. Overflow raises `IntegerOverflow`, but an expression of numerals alone folds exactly (`references/revival-changes.md`, "Numbers"). The algebra is self-typed traits, such as `AdditiveGroup[\T\]` with `+`, not monoids over an operator parameter. `references/library.md` gives the rest: ranges, wrapping, `SUM`.
- **Loops and reductions are library code.** `for`, comprehensions and `SUM` call the library's generators and reductions (`references/library.md`).
- **Juxtaposition is an operator, and whitespace counts.** `f x` applies a function. Otherwise juxtaposition is an operator that the library overloads: `2 x` multiplies, and `"a" "b"` concatenates. How three juxtaposed items group depends on their types, unlike in Haskell. An infix operator has whitespace on both sides or on neither: `a -b` is a static error. Precedence is partial: `a + b ∪ c` needs parentheses.
- **Specified, but not built:** dimensions and units, `property` declarations, regions and complex numbers. Some constructs run only under walk (`references/compiler.md`).


## Writing a test

**gated test**
: Test that the gate's suites run.

**green**
: Harness's report on a test that JUnit counts as passed.

**red**
: Harness's report on a test that JUnit counts as failed.

**`XXX` test**
: Gated expected failure. It asserts the answer that the specification gives, and fails today. The harness reports it green while it fails, and red when the defect is fixed.

## A test program

A test program has this form:

    component Name
    export Executable

    (* declarations *)

    run(): () = do
        assert(f(2), 4, "f(2)")
    end

    end

- `(*)` starts a comment to the end of the line. It cannot hold `*)`: the parser ends the comment there and refuses the program. `(* ... *)` comments nest.
- A compiled test with a `run` key ends `run()` with `println("PASS")`, unless a `run_out` key checks its output (below).
- Under walk, `assert(x, y, msg)` checks that `x` equals `y`. It and `=/=` call a type's own `=` only if the type extends a `FortressLibrary` trait that declares `=`, such as `Equality` (ledger row 807). Otherwise they compare by `SEQV` (`revival-changes.md`, "Traits and objects"). If a type `P` has its own `=`, make `P` extend `Equality[\P\]`, or write `assert(x = y, msg)`. The compiler's library declares the two-value `assert` only for `ZZ32`, `String` and `Character`; its `assert(flag, msg)` takes any `Boolean`.
- Do not name a variable or a parameter after a functional method of the library, such as `big`, `even`, `numerator` or `shift`. The disambiguator, the phase that binds names, refuses it: "Variable even is already declared."
- A superscript is `^` and what follows it, as the exponent in `x^2` or the transpose `^T`. It can follow a dotted access: `p.wq^T` is `(p.wq)^T`. After a call or a subscript, parenthesise first, as `(f(x))^T` and `(x[5])^2`: `f(x)^T` is a static error, and `x[5]^2` compiles, but under walk fails or gives the wrong element (ledger row 1).
- A test of run-time arithmetic or concatenation needs a variable operand, not a literal, because an expression of literals alone folds before the run (`revival-changes.md`, "Numbers").

## Where a test goes, and how it passes

Interpreter (walk): write `ProjectFortress/tests/Name.fss`, whose component is `Name`.

- Every `.fss` file there is gated, with no `.test` file needed.
- It is green if it throws no exception, exits 0, and neither its standard output nor its standard error contains `fail` or `FAIL`. A longer word counts too: `failure` fails the test. Only a file whose name contains `QuickCheckTest` is exempt.
- An api that it imports, and a helper component, go in `ProjectFortress/test_library/`. In `tests/`, a helper would run as a test.
- The harness skips files whose names end in `Syntax.fss`, `DynamicSemantics.fss` or `Satisfiability.fss`, or contain `GenomeUtil`.
- For a refusal at load, put `Name.test` beside `tests/Name.fss`, with `load_exception_contains=<message>`. A plain test is green if walk refuses the program at load as named. A failure while the top-level variables are initialised, or a static error of a phase before the run, such as the disambiguator's, counts as a refusal. An `XXX` test here records a refusal that walk misses: it is green while the program loads and runs clean, and red once walk refuses it.

Compiled: write `Name.fss` and `Name.test` in the compiled test folder that holds tests of its kind:

- `library_tests/`: the compiler's library. A test of the interpreter's library is an interpreter test (above).
- `parser_tests/`: the parser.
- `compiler_tests/`: the rest, beside the team's numbered `CompiledN` tests.
- `one_library_tests/`: a test whose program compiles against the one library, for a defect that only that library shows. Its tests compile with `FORTRESS_LIBRARY=one`, and `ant testOneLibrary` and `testFast` run them. Give a plain test there a `compile` command only: a program compiled so does not run yet (ledger row 1062).
- `other_compiler_tests/`: the team's compiled tests that do not fit the `CompiledN` series. Put no new test there.

The `.test` files are the whole list of tests: a `.fss` that no `.test` file names never runs. A `.test` file is a Java property file. It names the commands to run and the checks on their output, as lit's RUN and CHECK lines do:

    tests=Name                 the component(s) it drives; without it, the .test file's own name
    compile | link | typecheck each present command is one JUnit case; link compiles, then links
    run                        run the linked program in a subprocess (bin/fortress run)
    <command>_<stream>_<check>=text
                               command: compile, link or run; stream: out, err or exception;
                               check: contains, does_not_contain, equals, matches,
                               WIcontains (containment with runs of whitespace collapsed)

A `run` fails if the program exits non-zero or a `run_*` check fails. With no `run_out` check, its output must contain `pass` or `PASS`. With `run_exits_nonzero=true`, the run must exit non-zero, as a program whose class fails to load does. The `run_*` checks, and the `PASS` check where no `run_out` check is given, still apply. For example:

    tests=EqualityRung1
    link
    run
    run_out_WIcontains=PASS

## How `XXX` works

- Under walk, an `XXX` test is `tests/XXXName.fss`, whose component is `XXXName`. With no `.test` file, it is green when it fails as a plain test would.
- In the compiled test folders, the `XXX` prefix of a `.test` file's name applies to every command that the file drives: each must fail. So a defect at run time, whose link succeeds, needs two `.test` files ("Writing an `XXX` test").
- An unmet `run_*` check makes a run test red, whatever the prefix.
- The harness reports any link or compile exception of a component whose name contains `XXX` as expected, whatever the `.test` file's name. Only an unmet key of that command makes it red.
- An `XXX` compile test with a `compile_err_contains` key, whose program compiles, reports "Saw wrong failure", which is red.
- A green `XXX` test prints `Saw expected failure` or `OK Saw expected exception`.

## How a defect is recorded

Record every defect that you measure in one of three ways, and say in your report which:

1. Your change repairs it: an assertion in your plain gated test. It needs no `XXX` stage.
2. It is deferred, and the specification settles it: a gated `XXX` test that asserts the specification's answer. Write it in the change that measured the defect, even if a later change will repair it. If walk crashes on the program, still write the `XXX` test, unlike under 3: the harness counts the crash as the expected failure. A deferred defect of a program that the checker accepts and that then fails the JVM's verification (`VerifyError`), linkage or a range check at run time is one of these.
3. It is deferred, and the specification is silent or a conflict leaves it open (`exploring.md`): a test that asserts today's behaviour, and a row in the gap ledger (`records.md`). If no program can observe the defect, or no gated test can pass while it shows, as when walk crashes on the program, write the ledger row only. Its reproducer, the row's cell that names the test, is `none`, and its notes give the command and its output.

If your brief does not let you edit the original tree, say in your report which of the three the defect needs, and write a ledger row for it, whichever it needs. The change that next works there writes the test.

## The order: the test, its failure, the fix, the pass

1. Write the test, with a plain name. Write the essence of the defect as a clean, minimal program, not the shape in which a probe met it.
2. See the test fail through the harness (`harness-one.sh` or `junit.sh`, `tests-running.md`) on the base's code. Do this in a run that ends before you first build or compile your edit. Under walk, do it before you edit a library source that the test reads. If your tree already holds the fix, run the test through the harness on the old code, as `worktrees.md`, "Running the old code", says.
3. Make the fix. See the test pass in your last run after your last change of code.

The test needs no commit of its own. A test that comes with no fix has no failing run: see it pass through the harness.

In your report, quote two to five lines of the failing run, if there is one, and the passing line, each with its command. In an edit of the original tree, put every check into a gated test, never into a one-off script. A task that only measures may use its own script. Assert a value with `assert` in an interpreter test. In a compiled test, assert it with `assert` (above), or print it and check it with a `run_out_equals` key.

An edit of prose in `Specification/` or `Documentation/` has no test. Check it as `specification.md`, "Changing the text: the revision form", says.

## Writing an `XXX` test

In a compiled test folder, name the component `XXXName`, in its file `XXXName.fss` and in its `component` line.

- For a refusal at compile time, write one `XXX` compile test, with `compile` and `compile_err_contains=<the refusal's message>`.
- For a code-generator wall (`compiler.md`, "What the compiled path cannot compile yet"), write `XXXName.test` with `tests=XXXName`, `compile` and `compile_exception_contains=<text of the exception>`.
- For a program that compiles and fails at run time, write two `.test` files over the component:
  - `NameLink.test`, a plain name, with `tests=XXXName` and `link`. It is red if the link reports static errors, but green on an exception.
  - `XXXName.test`, with `tests=XXXName` and `run`, and no `link`. Its run uses the plain file's link, so run the two files in one call of `junit.sh` or `fortress junit`, the plain one first.
  - The program prints `REACHED` in `run()` before the part that fails. The `XXX` file checks it with `run_out_contains=REACHED`, or with `run_out_does_not_contain=REACHED` if the run dies before `run()` prints. Never use `run_out_contains=PASS`.
  - Example: `compiler_tests/XXXBoxDotSpellingsRungW.test` and `BoxDotSpellingsRungWLink.test`.

Show the first `XXX` test that your change adds, and only the first, working through the harness (`harness-one.sh`, `junit.sh` or `fortress junit`), from its place in a gated test folder. Run it twice:

1. As it is: the harness must report an expected failure.
2. Changed for one run so that the defect does not show, then restored: the harness must report it red. For example, add the missing declaration to the test program, set the expected string to what the run prints, or, in a run-time pair, remove the part that fails.

## Promoting an `XXX` test

If your change fixes a defect that has a gated `XXX` test, the fix turns that test red. To find such a test, search the gap ledger (`records.md`): a row's reproducer names it. Also list the `XXX` files: `git ls-files 'ProjectFortress/*XXX*'`. Then promote it:

1. Before you edit the code, remove the prefix: give the test a plain name by its topic. Rename each file with `git mv` (`committing.md` gives the commit), or with `mv` if the file is not committed yet. Rename each `XXX` name inside: the `component` line, and in a compiled test the `tests=` lines and keys. Change a run-time pair as below.
2. See the plain-named test fail through the harness on the base's code, as "The order", step 2, says.
3. Make the fix and see the test pass.

A run-time pair keeps its three files, renamed without `XXX`. For example, `compiler_tests/NatRtTask` was promoted so in `fd5cb4864`:

- `Name.fss`, with `component Name`. The program asserts its values, then prints `PASS` last.
- `NameLink.test`: `tests=Name` and `link`.
- `Name.test`, in place of `XXXName.test`: `tests=Name`, `link`, `run` and `run_out_contains=PASS`.

## Names, comments, citations

- Name a test by its topic. Give it one comment line that says what it checks, with no pointer to a record.
- Assert each case in one test only. Add a new case to the test that already asserts cases of its kind: `git grep` for the case's name or value finds it. A case that fails today goes in an `XXX` test, since it would turn a plain test red.
- Write an assertion's message as one short line that says what was checked. Put a reason that several assertions share in one comment line above them.
- In a test, cite the specification by file and section or entry, never by line: `opr-overview.tex, subsection "GCD, LCM, and CHOOSE Operators"`. In the library chapters, name the entry too: `basic-integers.tex, section "Integers", opr CHOOSE`.
- If your change breaks a line of a test that the team wrote, respell the line and keep the value that it checks. Keep every assertion. List each line's before and after in your report.
- If your change touches mutable state, a field, an `atomic` block, library code that writes shared state, or the Java of tasks, transactions or the class loader, run its checks at one thread and at four. `harness-one.sh`, `junit.sh` and the suites force four threads. For one thread, run the program directly with the prefix `FORTRESS_THREADS=1` (a compiled program: `compiler.md`, "Running"), and check its exit code and output.
- Under walk, a parallel range of sixteen elements or fewer, as `0#16`, runs its bodies in index order, so a test of parallelism there needs a longer range. For the compiled path, see `compiler.md`, "Traps of the compiled path".
