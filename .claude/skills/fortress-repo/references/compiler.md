# The compiled checker, the code generator and the run time

**count stage**
: Script that runs the compiled checker over the interpreter's library and prints its errors: `explorations/coordinator/tools/checker-count/run.sh`.

The code of this area is in these directories:

- `scala_src/typechecker/`: the type checker, in Scala.
- `compiler/`: the disambiguator, the desugarers, overloading, `codegen/`, `NamingCzar` and `OverloadSet`.
- `runtimeSystem/`: `InstantiatingClassloader`, tasks and transactions.

The phases' names in the code are parse, PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, INTEGERLITERALFOLDING, TYPECHECK, DESUGAR, OVERLOADREWRITE and CODEGEN.

## What the two paths share

After the phases, each path has its own code for these:

- Values: walk's `interpreter/evaluator/values/` (`FInt`, `FFloat`), and the compiled `compiler/runtimeValues/` (`FZZ32`, `FRR64`).
- Number natives: walk's `interpreter/glue/prim/` (`Int.java`, `Long.java`), and the compiled `nativeHelpers/` (`simpleIntArith.java`).
- Dispatch: walk searches at run time, in `OverloadedFunction`. The compiled path calls a dispatch method that `OverloadSet` generates.
- The run: `fortress run` starts a second JVM (`bin/run`), which never enters `Shell.java`.

The phases differ too: walk turns off some desugarings that the compiled path runs (`interpreter.md`, "Where a fix of walk belongs"). A fix of one of those desugarers changes only the compiled path.

## The compiler's prelude, until the switch-over

The compiled path uses the compiler's own prelude: `LibraryBuiltin/CompilerBuiltin.fss`, `Library/CompilerLibrary.fss` and `Library/CompilerAlgebra.fss`. `Library/CompilerSystem.fss` is the compiled path's `System`.

Do not add a declaration to the three prelude files: they are deleted at the switch-over. Their tests stay.

## What the compiled path cannot compile yet

For a construct that it cannot compile yet, the code generator calls `sayWhat` or throws another `CompilerError`. Such a call or throw is a code-generator wall. The code generator has no case for these constructs:

- `label` and `exit`, `spawn`, and `atomic` used as an expression;
- a local function declaration, and an object expression;
- an array literal, such as `[1 2 3]`.

It also refuses a function, object or trait declaration with a `where` clause or a contract (`requires`, `ensures`, `invariant`). It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private` and `abstract`, such as `override` (ledger row 650).

The compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`. Its `for` loops, comprehensions and reductions work over `ZZ32` ranges only. Its reductions give a `ZZ32` or a `String`.

Until the switch-over, a compiled test uses none of these. If a test needs one, write it as an `XXX` test that names the wall (`tests-writing.md`).

## What the code generator does

`SKILL.md`, "The compiled run time", gives the jars, the dispatch methods, the templates and the boxed numbers.

- It emits no primitive `double` arithmetic.
- The class loader rewrites a template's bytes with ASM. The emitted classfiles stay at version 1.6, because this rewriting keeps no stack-map frames. Do not raise the version.
- The `value` modifier has no effect on the representation.
- An array of `RR64` values is to be stored as an unboxed `double[]`. The code generator does not build it yet (`SKILL.md`, "The compiled run time"). If your task touches how arrays are stored, print the two POSITIONS entries on arrays first (about 2 KB):

      explorations/coordinator/tools/facts-extract.sh 'positions:Storage is' 'positions:array design'

## The run time

- The class loader is `runtimeSystem/InstantiatingClassloader.java`. The revival has changed it for sizes and for the lock on a class's first load (ledger row 417). Before you investigate a failure while a class loads, read ledger rows 408 and 559, which name it (`records.md`, "Reading the record").
- The compiled code keeps each mutable variable in a cell (`compiler/runtimeValues/MutableFValue.java`). Before each read and write of the cell, the generated code asks `BaseTask.inATransaction()` (`runtimeSystem/`). Inside an `atomic` block, the access goes through the transaction. So the transaction tracks the variables that the block touches.

## Natives

`import java com.sun.fortress.nativeHelpers.{...}` in a `.fss` file binds static Java methods over plain Java values.

The wrapper generator wraps every method of a class that it is given, the private methods too. If a type has no Fortress counterpart, it fails the whole import. So give every method of a helper class a signature that maps to Fortress, also a private method.

## Traps of the compiled path

- Before disambiguation, the compiled path bounds an unbounded type parameter by `Object`, not `Any`. Walk does not. So the compiled path rejects every generic that is instantiated at a tuple type, until the switch-over (ledger row 412).
- An api and the component that implements it must have the same name. The linker looks for a component with the api's own name. If there is none, the link fails ("Could not find an implementation for API"), and the run dies with `NoClassDefFoundError`.
- The compiled dispatch ignores the contravariance of a parameter of arrow type. The property `fortress.disable.contravariance` is true by default, so `OverloadSet` passes no variance. The team turned it off in 2012 (`c35aac139`). If a compiled call with function arguments picks another declaration than walk does, look here first.

## The `fortress` commands

`Shell.java` dispatches `bin/fortress <command>`.

- To see what an early phase makes of a program, stop after that phase: `parse` (a syntax check), `disambiguate`, `grammar`, `desugar` or `typecheck`.
- `unparse` prints the syntax tree back as Fortress source. Use it to see what a desugaring made.
- `link` links a compiled component (the `link` step of a compiled `.test` file). `api` writes a component's api. `test` runs a program's `test` declarations under walk.
- The command chooses the library. Walk and `test` call `Shell.useInterpreterLibraries()`. Every other command calls `useCompilerLibraries()`. Each call points `WellKnownNames` and `Types` to its prelude, and sets the desugaring switches.

## Running

    cd ProjectFortress
    # after an ant compileAll that started the caches again: the library order (build-and-caches.md)
    ../bin/fortress compile <path>/P.fss
    ../bin/fortress run P [args]

A small program compiles in about 5 s and runs in about 1 s.

- A crash of the checker prints one line and hides the Java stack. To see the stack, put `-debug stacktrace` before the file: `../bin/fortress compile -debug stacktrace <path>/P.fss`.
- A failed compile of a program leaves a 0-byte jar in `bytecode_cache/`. A run of the program then prints "Could not load P" and "Resource not found". Read the compile's error instead: it gives the cause.

## Before an edit

Two notes under `explorations/coordinator/map/` help you find where a fix belongs. Both date from September 2026, so a status or a line number in them can be stale. Before you rely on a status, read the ledger rows that it cites. Before you rely on a line number, grep for the method's name.

- Before you add or fix a language feature, print its row of the feature table. WORD names the feature, such as `spawn`, `coercion` or `typecase`. A row is about 1 KB. It names the feature's section of the specification, its parser rule, checker class, walk site, code-generator site, prelude declaration and ledger rows.

      explorations/coordinator/tools/facts-extract.sh 'map:spec-to-implementation.md#Feature by feature@WORD'

- If your edit is in one phase, and you need what runs before and after it on each path, print that phase's section. Name the section by its number and the first word of its title. A section is 1 to 3 KB. B.1 is the phase list, B.4 disambiguation, B.5 desugaring, B.6 type checking, B.7 overloading, B.10 the caches, B.11 the run time and B.12 the natives.

      explorations/coordinator/tools/facts-extract.sh 'map:modules-and-phases.md#B.5 Desugaring'

- Before you change the text of a diagnostic, grep the `.test` files for it. A `.test` file can pin a whole diagnostic with `compile_err_equals`, its `file:line:column` included. `grep -l 'TEXT' ProjectFortress/*tests/*.test`, with words of the diagnostic as TEXT, lists the files that pin it. Update each of those in the same commit. A line that you add to or remove from a compiler test program moves the pinned spans below it.

## Testing an edit here

- For a quick loop on an edit of the checker or the code generator, compile the edited class into a scratch directory, and run the compiler with that directory first on its class path. This takes seconds, rebuilds nothing and changes nothing tracked. Give each run a fresh copy of the caches, because nothing checks the caches against the compiler that wrote them, and a compile of an unchanged program with a jar writes nothing:

      Q=$PWD/tmp/quick ; export FORTRESS_CACHES=$Q/caches ; CP=$(bin/fortress_classpath | tail -1)
      mkdir -p $Q/classes && javac -nowarn -cp "$CP" -d $Q/classes ProjectFortress/src/com/sun/fortress/<path>/X.java
      rm -rf $Q/caches && cp -a default_repository/caches $Q/caches
      java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches=$Q/caches -cp "$Q/classes:$CP" com.sun.fortress.Shell compile P.fss
      bin/fortress run P

  For a Scala file, compile it with `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d $Q/classes -encoding UTF-8 X.scala`. Then put the edit into the tree and build it for real.
- If your change is near transactions, top-level mutable state or the class loader's first load, do the four-thread atomic runs (`gate.md`).

## The checker's time

This section is for a change of the checker: its Scala under `scala_src/`, or `ProjectFortress/astgen/Fortress.ast` and the generators under `ProjectFortress/src/com/sun/fortress/astgen/`, from which the build generates the checker's syntax tree and `Walker`.

The count stage takes `<out-file> <scratch>` and about 1.5 minutes. It writes a table to the out-file: the errors of each api, the total, the number of places with errors, and the first crash. It keeps the checker's whole output in `<scratch>/run.txt`, and its caches in `<scratch>`, so a run from the base build leaves the base build as it was.

The checker's results are the programs that it accepts and refuses, and each error with its text and its place. On the interpreter's library, a change keeps the results the same if both of these hold:

- The two tables are equal: `diff` prints nothing.
- The two `run.txt` files are equal after you replace each run's own tree path with one word, such as `TREE`. Any difference fails, except the one error of ledger row 737 (below).

A node's hash starts from its class's name, so an order in the output, such as the apis' checks or a union's members, moves only where the change itself moves it. Such a move is a difference: keep the old order, or report the difference, as for any other. The JVM gives identity hashes in one sequence, so code that asks for an identity hash at another moment changes the hashes after it. One choice of the checker still depends on them: a function whose return type is left out takes the return type of the api's first declaration of its name, in identity-hash order (ledger row 737). So an unrelated edit, or an instrumented copy, can add or remove one error: the error on the second `opr BIG LEXICO`, the one over a `Generator[\TotalComparison\]` with no written return type, at present `:130` of `Library/FortressLibrary.fss`. It reads "Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\]". If the two tables, or the two `run.txt` files, differ only by this error, count them as equal, and say so in your report.

`Walker`, in the generated `ProjectFortress/src/com/sun/fortress/scala_src/nodes/FortressAst.scala`, is split into methods under 8,000 bytes of bytecode. HotSpot does not compile a longer method, and the walker runs on every node, so one long walker method slows the whole checker. `MethodSizeJUTest` fails if a method of the build grows past the limit, except the methods that its source lists in `listed(...)` entries. Run it alone with `ant testOnly -DtestPattern=MethodSizeJUTest`. If a method of `Walker` fails, lower `WALKER_CASES_PER_METHOD` in `ProjectFortress/src/com/sun/fortress/astgen/ScalaAstGenerator.java`. If another method fails, split it under the limit. List it only if nothing in the checker or a compiled run calls it, with its size and what runs it, and name it in your report.

The timing is a smoke test. It is there to catch a slowdown of several times, or of orders of magnitude: a change that makes the checker three times slower must show. One run of each tree is enough. A small difference, or one within the noise from run to run, is not a finding. In your report, say what you saw, and do not analyse it.

If you change the checker:

1. Make the change correct, with its tests. Commit it, and name the commit in your report.
2. Time the base build and the change, named `base` and `change`. Run the base in a call set up for the base build (`build-and-caches.md`), and the change in a call set up for your tree, each in the background (`session.md`). Use the same command for both, with `N` the run's name:

       export W=<your tree> N=base ; mkdir -p $W/tmp/count
       time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N

3. Make a second pass that makes the checker faster. Start with a profile (below). Where the profile shows a gain, take it. Where it shows none, say so in your report, with the profile's top frames.
4. After the second pass, run the count stage once more with the command of step 2, named `pass`. Show that its results are the same as `change`'s. Then run `ant testQuick` once more (`tests-running.md`, "When to run a whole suite").
5. If the pass reuses an answer that the checker computed earlier, as a memo does, audit it on one full run. Put the audit in an instrumented copy ("Testing an edit here"), never in the tree. In the audit, compute each reused answer again and compare the two. If any answer differs, the reuse is wrong: fix it or drop it, then repeat step 4. Report the count of reuses and of differences.
6. In your report, give each run's seconds, the diff of the `base` and `change` tables, the comparison of their `run.txt` files, and that `pass` has the same results as `change`.

To find where the time goes, use JFR on the count stage's checker, instrumented copies compiled into a scratch folder ahead of the build on the class path, and the methods over 8,000 bytes that `MethodSizeJUTest` lists in its source. A profiled or instrumented run is neither a timed run nor a run to compare. Print the commands of two earlier speed probes (about 8 KB):

    explorations/coordinator/tools/facts-extract.sh 'doc:explorations/perf-probes/checker-speed-2/REPORT.md#Decisions, findings' 'doc:explorations/perf-probes/checker-speed/REPORT.md#Decisions, findings'

If your brief asks you to review a change of the checker, run the count stage yourself. Time the base build and the worker's commit of step 1 once each, as step 2 says, with the commit and the worker's head in worktrees seeded at them (`worktrees.md`). Check that your times are the worker's, in order of size. Check that the commit's and the head's results are the same.
