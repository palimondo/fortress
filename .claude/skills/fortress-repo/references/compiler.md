# The compiled checker, the code generator and the run time

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

This section is for a change of the checker: its Scala under `scala_src/`, or the code that the build generates for it.

The count stage, `explorations/coordinator/tools/checker-count/run.sh <out-file> <scratch>`, runs the checker over the interpreter's library. It takes about 6 minutes on an idle machine. It writes a table to the out-file: the errors of each api, the total, the number of places with errors, and the first crash. It keeps the checker's whole output in `<scratch>/run.txt`.

The checker's results are the programs that it accepts and refuses, and each error with its text and its place. A change keeps the results the same if both of these hold:

- The two tables are equal: `diff` prints nothing.
- The two `run.txt` files are equal after you replace each run's own tree path with one word, such as `TREE`.

The checker's output depends on the JVM's identity-hash sequence. Each node's hash starts from its class's identity hash. If any code asks for an identity hash at another moment, hash maps and sets of nodes iterate in another order. So an unrelated edit can reorder the checks of the apis, and the members of a union in a message. An instrumented copy can do the same. So compare outputs only between runs without instrumentation.

`Walker` in the generated `FortressAst.scala` is split into methods under HotSpot's limit of 8,000 bytes of bytecode. HotSpot does not compile a longer method, and as one method the walker set the checker's time. `WalkerJUTest` fails if a method of `Walker` grows past the limit. If it fails, lower `WALKER_CASES_PER_METHOD` in `astgen/ScalaAstGenerator.java`.

If you change the checker:

1. Before each timed run, run `ps aux`. If another build, suite or stage runs, wait until it ends.
2. Before you start, measure the base. In a call set up for the base build (`build-and-caches.md`), start the count stage in the background (`session.md`). Name the run `base`:

       nohup bash -c 's=$(date +%s); explorations/coordinator/tools/checker-count/run.sh <tree>/tmp/count/base.txt <tree>/tmp/count/base; rc=$?; echo "seconds $(( $(date +%s) - s ))"; echo EXIT=$rc' > <tree>/tmp/count-base.log 2>&1 &

3. Make the change correct, with its tests.
4. Run the count stage on your tree in the same way, with another name. Do it in the same session as the base run, because the machine's speed differs between sessions.
5. If the time rose, or a profile (below) shows a gain that is cheap to take, make a second pass that makes the checker faster.
6. After the second pass, run the count stage again. Show that the results are the same as after step 4.
7. If the pass reuses an answer that the checker computed earlier, as a memo does, audit it on one full run. In the audit, compute each reused answer again and compare the two. Report the count of reuses and of differences.
8. In your report, give each run's seconds, and the two comparisons.

To find where the time goes, use the methods of the two speed probes: JFR on the stage's checker, instrumented copies compiled into a scratch folder ahead of the build on the class path, and a scan of the build for methods over 8,000 bytes. Print their commands (about 8 KB):

    explorations/coordinator/tools/facts-extract.sh 'doc:explorations/perf-probes/checker-speed-2/REPORT.md#Decisions, findings' 'doc:explorations/perf-probes/checker-speed/REPORT.md#Decisions, findings'

If your brief asks you to review a change of the checker, run the count stage yourself on the base and on the change, in one session. Check the two times. Check that your table and output equal those of the worker's run before the second pass.
