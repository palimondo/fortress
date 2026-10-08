# The compiled checker, the code generator and the run time

The code of this area is in these directories:

- `scala_src/typechecker/`: the type checker, in Scala.
- `compiler/`: the disambiguator, the desugarers, overloading, `codegen/`, `NamingCzar` and `OverloadSet`.
- `runtimeSystem/`: `InstantiatingClassloader`, tasks and transactions.

The phases' names in the code are parse, PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, INTEGERLITERALFOLDING, TYPECHECK, DESUGAR, OVERLOADREWRITE and CODEGEN.

## Which desugarings run on each path

Both paths run the same desugaring phases. Inside them, switches in `Shell.java` decide which desugarings run. Walk turns off these desugarings, which the compiled path runs:

- coercion;
- chained comparisons;
- compound and tuple assignment, and subscripts;
- case expressions, typecase and type ascription;
- the marking of a bodiless declaration as abstract.

Walk evaluates those nodes itself, in `interpreter/evaluator/Evaluator.java` (`forChainExpr`, `forAssignment`, `forCaseExpr`, `forTypecase`, `forAsExpr`). It converts by coercion at dispatch, in `OverloadedFunction.bestMatchWithCoercion`. So if you fix one of these desugarers, only the compiled path changes. If walk is wrong there, fix the evaluator.

## What the two paths share

After the phases, each path has its own code for these:

- Values: walk's `interpreter/evaluator/values/` (`FInt`, `FFloat`), and the compiled `compiler/runtimeValues/` (`FZZ32`, `FRR64`).
- Number natives: walk's `interpreter/glue/prim/` (`Int.java`, `Long.java`), and the compiled `nativeHelpers/` (`simpleIntArith.java`).
- Dispatch: walk searches at run time, in `OverloadedFunction`. The compiled path calls a dispatch method that `OverloadSet` generates.
- The run: `fortress run` starts a second JVM (`bin/run`), which never enters `Shell.java`.

So a fix of a rule on one path is not a fix on the other. In your report, say which path you fixed, and whether the other path has the same defect.

## The compiler's prelude, until the switch-over

The compiled path uses the compiler's own prelude: `LibraryBuiltin/CompilerBuiltin.fss`, `Library/CompilerLibrary.fss` and `Library/CompilerAlgebra.fss`. `Library/CompilerSystem.fss` is the compiled path's `System`.

- Do not add a declaration to the three prelude files: they are deleted at the switch-over. Their tests stay.
- The record does not yet say what happens to `CompilerSystem` at the switch-over.

## What the compiled path cannot compile yet

For a construct that it cannot compile yet, the code generator calls `sayWhat` or throws another `CompilerError`. Such a call or throw is a code-generator wall. The code generator has no case for these constructs:

- `label` and `exit`, `spawn`, and `atomic` used as an expression;
- a local function declaration, and an object expression;
- an array literal, such as `[1 2 3]`.

It also refuses a function, object or trait declaration with a `where` clause or a contract (`requires`, `ensures`, `invariant`).

The compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`. Its `for` loops, comprehensions and reductions work over `ZZ32` ranges only. Its reductions give a `ZZ32` or a `String`.

Until the switch-over, a compiled test uses none of these. If a test needs one, write it as an `XXX` test that names the wall (`tests-writing.md`).

## What the code generator does

`SKILL.md`, "The compiled run time", gives the jars, the dispatch methods, the templates and the boxed numbers.

- It emits no primitive `double` arithmetic.
- The class loader rewrites a template's bytes with ASM. The emitted classfiles stay at version 1.6, because this rewriting keeps no stack-map frames. Do not raise the version.
- The `value` modifier has no effect on the representation.
- The curator decided that array storage will be an unboxed `double[]`. This is not built yet. The other questions of the array design wait until after the switch-over. If your task touches how arrays are stored, print both decisions first (about 2 KB):

      explorations/coordinator/tools/facts-extract.sh 'positions:Storage is' 'positions:array design'

## The run time

- The class loader is `runtimeSystem/InstantiatingClassloader.java`. The revival has changed it for sizes and for the lock on a class's first load (ledger row 417). Open ledger rows name it, such as rows 408 and 559.
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

Two notes under `explorations/coordinator/map/` help you find where a fix belongs. Both were written in September 2026, before the revival's batches, so a status or a line number in them can be stale. Before you rely on a status, read the ledger rows that it cites. Before you rely on a line number, grep for the method's name.

- Before you add or fix a language feature, print its row of the feature table. WORD names the feature, such as `spawn`, `coercion` or `typecase`. A row is about 1 KB. It names the feature's section of the specification, its parser rule, checker class, walk site, code-generator site, prelude declaration and ledger rows.

      explorations/coordinator/tools/facts-extract.sh 'map:spec-to-implementation.md#Feature by feature@WORD'

- If your edit is in one phase, and you need what runs before and after it on each path, print that phase's section. Name the section by its number and the first word of its title. A section is 1 to 3 KB. B.1 is the phase list, B.4 disambiguation, B.5 desugaring, B.6 type checking, B.7 overloading, B.10 the caches, B.11 the run time and B.12 the natives.

      explorations/coordinator/tools/facts-extract.sh 'map:modules-and-phases.md#B.5 Desugaring'

- Before you change the text of a diagnostic, grep the `.test` files for it. 224 of the 549 `.test` files in `compiler_tests/` pin a whole diagnostic with `compile_err_equals`, its `file:line:column` included. Update each one in the same commit. A line that you add to or remove from a compiler test program moves the pinned spans below it.

## Testing an edit here

- For a quick loop on an edit of the checker or the code generator, compile the edited class into a scratch directory. Compile it against the class path on the last line that `bin/fortress_classpath` prints. Put that directory first on the class path. This takes seconds, rebuilds nothing and changes nothing tracked.
- Give such a run its own caches (`-Dfortress.caches` and `FORTRESS_CACHES` under your `tmp/`), because nothing checks the caches against the compiler that wrote them. Then put the edit into the tree and build it for real.
- If your change is near transactions, top-level mutable state or the class loader's first load, do the four-thread atomic runs (`gate.md`).
