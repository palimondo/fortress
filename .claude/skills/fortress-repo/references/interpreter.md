# The interpreter (walk)

Walk's code is in `interpreter/`:

- `evaluator/`: the tree walker.
- `env/`: the environments, which map names to values, and the wrappers that load components and apis.
- `rewrite/`: walk's own rewrite of the tree.
- `glue/`: the natives.

## How walk evaluates a program

After the phases (`SKILL.md`, "The phases"), walk rewrites each component in `interpreter/rewrite/`: it gives each reference to a name the lexical depth of its declaration. The evaluator looks up the name by that depth. The compiled path has no such rewrite.

At a call of a generic function, walk infers the static arguments from the run-time types of the arguments (`interpreter/evaluator/EvaluatorBase.java`, `inferAndInstantiateGenericFunction`). Each static parameter gets an interval, from a lower to an upper bound, in a `LatticeIntervalMap` (`useful/`). A type in the domain of an arrow type, such as `T` in `T -> ZZ32`, is contravariant. So its bounds go into the dual map, `LatticeIntervalMapDual`: the same table, with the order reversed. `MakeInferenceSpecific` then makes the inferences more specific, in practice only in the dual map.

Walk chooses a coercion by the value at run time. The specification and the compiled path choose it statically. Walk has no static types, so it cannot choose statically. The expected-failure tests `ProjectFortress/tests/XXXCoercionStaticRungC.fss` and `XXXCoercionStaticNarrowRungC.fss` record the difference.

## Where a fix of walk belongs

Both paths run the same desugaring phases. Inside them, switches in `Shell.java` decide which desugarings run. Walk turns off these desugarings, which the compiled path runs:

- coercion;
- chained comparisons;
- compound and tuple assignment, and subscripts;
- case expressions, typecase and type ascription;
- the marking of a bodiless declaration as abstract.

Walk evaluates those nodes itself, in `interpreter/evaluator/Evaluator.java` (`forChainExpr`, `forAssignment`, `forCaseExpr`, `forTypecase`, `forAsExpr`). It converts by coercion at dispatch, in `OverloadedFunction.bestMatchWithCoercion`. So if walk is wrong on one of these nodes, fix the evaluator, not the desugarer.

An edit of a phase that both paths run, or of the desugaring switches, can change both paths. An edit under `interpreter/` changes walk only.

## What walk checks

Walk does not check static types (`SKILL.md`, "The phases"). The commands that stop after a phase, and `unparse`, use the compiler's prelude and the compiled path's desugaring switches (`compiler.md`, "The `fortress` commands"). So `fortress typecheck` does not check a walk program, and `desugar` or `unparse` does not print the tree that walk runs. That tree is the component's entry in `interpreter_cache/` (`SKILL.md`, "The caches").

Under walk, the disambiguator, the phase that binds names, refuses a program's own top-level type that has the name of a type of `FortressLibrary`, such as `Index` or `Indexed`: "Type name may refer to: Index, FortressLibrary.Index". Give such a type another name.

At load, walk checks the overload sets, some `comprises` clauses, inherited abstract methods and `override` declarations. It lifts each object expression to the top level as an object, which takes the static parameters of an enclosing generic function, and checks it as an object. It checks a trait or object with static parameters once, through a stand-in: one type for all its instances, with a symbolic type for each static parameter (`symbolicInstance` in `interpreter/evaluator/BuildEnvironments.java`). Through the stand-in, it does not check two functional methods whose parameter types mention a symbolic type. It makes no stand-in, and so checks nothing through one, for a declaration with an `opr` static parameter, or where its static parameters, `where` clause or `extends` clause raise an error at the symbolic types. It refuses:

- two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if `comprises` clauses cover the overlap. For every pair of functions of which at least one is generic, it checks the overloading rules of `SKILL.md`, "Fortress as a language", on their declared domains (`revival-changes.md`, "Dispatch and overloading"): the No Duplicates Rule, the Meet Rule and the Return Type Rule. So it refuses two whose declared domains are equal. The message names the rule: "fails because their parameter lists have the same types", "fails the Return Type Rule" or "fails the Meet Rule". Walk keeps the team's check and messages for the pairs below. The team's check looks for a position where the two parameter types neither nest nor exclude. If a parameter type there mentions a static parameter, the message is "at least one pair of parameters must have excluding types". If neither does, it is "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present". The pairs:
  - a pair with a varargs parameter;
  - a pair whose parameter lists differ in length, only where one of them has a varargs parameter. Walk checks no other pair of lists of different lengths;
  - a pair that is neither two generic declarations nor a generic one beside a plain one;
  - the instances of an explicit instantiation.

  Where it reads exclusion over the whole tuple of parameter types, at the instance that the equalities force, it reads two parameter types that still mention a static parameter as excluding only where no instances of the two can meet. Walk departs from the rules in these cases:
  - At load, it does not check two functional methods of a generic trait or object on their declared domains. It compares them at each call, on the instance that the call makes. So such a pair that breaks the rules loads, and a call can fail with "Cannot find definition for method" (ledger row 780).
  - It refuses two generic functional methods whose declared domains lie one inside the other, in a type without static parameters (ledger row 779).
  - It refuses a pair whose overlap it finds only through an instance of a supertype, also where a third declaration covers the overlap (ledger row 539).
  - It refuses overloads on two instantiations of one generic type, as `g(b: Tg[\3\])` beside `g(b: Tg[\4\])` (ledger row 416).
  - Its parameter-by-parameter check reads an object type over a static parameter as excluding a type that one of its instances is or extends. So it loads `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, which the Meet Rule refuses (ledger row 788).
  - It reads no `where` clause when it reads exclusion over the whole tuple. So it refuses such a pair where one declaration has a `where` clause of its own (ledger row 787).
  - Where a program's own component declares both, it refuses a generic operator between an array of a number type and a number, on either side, beside the operator of a self-typed trait, as `AdditiveGroup`'s `+`: "at least one pair of parameters must have excluding types". The checker accepts such a pair, and the library's own pairs load (ledger row 804).
  - It loads a function over `Index` beside one over a pair whose element types neither lie below `Index` nor exclude it, which the Meet Rule refuses (ledger row 806).
  - It loads a type that provides two functional symbolic operators, such as two `||`, that break the Meet Rule for Functional Methods (`Specification/advanced/overloading.tex`). The checker refuses the pair (ledger row 611).

  The paths differ on `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)`, where `K comprises { A, B, C }`, `Z excludes { A, B }`, and `C` is an object that extends `Z` but not `R`. Walk refuses the pair: "fails the Meet Rule". The checker reads the bounds, finds that no value lies in both domains, and accepts it. No decision says which is right. Assert neither path's answer in a test (ledger row 713).
- two functional methods that break the Meet Rule for Functional Methods in a type that provides both, where their name is an identifier or an operator named by a word, as `MAX`.
- an overloaded function with one parameter of type `T`, where `T extends Any` is written: `f[\T extends Any\](x: T)`.
- an extender that a `comprises` clause of the program's main component does not allow. Walk does not yet check the library's clauses, another component's clauses or an object expression's clauses. Where a listed type names a bounded type `where`-clause variable, as `NBox[\E\]` in `comprises { NBox[\E\] } where [\E extends Number\]`, walk ignores the variable's bound, and runs `NBox[\String\]` (ledger row 754). In another declaration's bound, it takes a name equal to the variable's as the variable (ledger row 778).
- a trait whose `comprises` clause lists a type at a `where`-clause variable, where a member's declared type names the variable: "Missing type E" (ledger row 755).
- an object or object expression without static parameters that inherits an abstract method and does not define it. Bodies define it if they are at or below its parameter types and together cover them, with `comprises` clauses read. Walk also refuses where its search for a cover does not settle: at a cycle of `comprises` clauses, at a symbolic type, or beyond 10,000 steps or 4,096 combinations of listed types. It also refuses a valid object whose one body for the method has a static parameter of its own (ledger row 728).
- a declaration with the modifier `override`, in a trait, object or object expression, that overrides no declaration that its type's immediate supertraits provide. An `override` at an inherited declaration's own parameter types overrides nothing. At an instance of a generic trait above a declared object, equal parameter types count as overridden. Walk does not read all the bounds of the static parameters in two cases:
  - an object expression, which takes its static parameters from the function around it;
  - a generic trait or object that extends a type under a `where` clause.

  In these cases, walk does not refuse an `override` if the inherited declaration's parameter types mention a static parameter and differ from the `override`'s.

So a library edit can stop every program at load, if it does one of these:

- adds an overload;
- leaves an inherited abstract method that no bodies cover, covers it only by a body with a static parameter of its own, or covers it by bodies whose cover walk's search cannot settle;
- adds an `override` that overrides nothing;
- gives a member a type that names its trait's `comprises`-clause variable, as `E` in `AnyList`.

Walk checks a program's declarations against the library's only when it analyses the library, not when it loads the library's entries from the cache (ledger row 342). So a program that walk refuses with an empty cache runs with a filled one. Deleting the program's own entries does not bring the check back. To see such a refusal, run with an empty cache, as `COLD_CACHE=1` gives `harness-one.sh`.

Walk compares no component with the apis that it exports. So a component that leaves out an api member, or declares it at another header, loads and runs under walk. The compiled export check refuses it (ledger row 841). `library.md`, "Designing a change", gives the step that runs the check on each component.

`tests-writing.md` says how a test names a refusal at load.

Walk's overload-ambiguity message names its two declarations in an order that varies from run to run. On one core, the order is fixed for a given library, but a library edit can change it. Do not pin or compare this order. The harness reads only that an `XXX` test fails.

## Natives

The library binds each of walk's natives by a string in its `.fss` files: `builtinPrimitive("com.sun.fortress.interpreter.glue.prim.X")`. The classes are in `interpreter/glue/prim/`. They take the evaluator's boxed values, so the compiled path cannot use them. `import java`, the compiled path's way to bind natives, is wired under walk but unfinished, and no test uses it.

To raise a Fortress exception that a Fortress `catch` sees, a native throws a `FortressError` that holds the exception's object. `Int.overflow()` in `Int.java` there makes one, and its callers throw it:

    FObject f = (FObject) Driver.getFortressLibrary().getRootValue(WellKnownNames.integerOverflowException);
    return new FortressError(f);

A `catch` sees no other Java exception, so any other exception from a native ends the run, a division by zero too.

## Running a program

    bin/fortress P.fss

- If the run stops on an error, it prints the error and the Fortress stack under `Context:`. The hint below them names `-debug interpreter`, which shows nothing more. To see the Java stack too, run `bin/fortress -debug stacktrace P.fss`.
- Walk searches for imports in the current directory first (`build-and-caches.md`, "Name resolution").
- If `JAVA_FLAGS` is not set, `bin/fortress` uses `-Xmx256m -Xss32m`. Your setup gives a 4 GB heap, and the test harness uses 768 MB. A test can pass at two of these heaps and die at the third. If you claim that a run fails near a memory limit, measure the claim at 256 MB: run with `JAVA_FLAGS="-Xmx256m -Xss32m -Djava.io.tmpdir=$PWD/tmp"`.
- Your setup sets `FORTRESS_THREADS`, the size of the pool, to 1 (`SKILL.md`, "Parallelism and mutable state"). If it is unset, the pool has half the CPUs.
- A small program takes about 8 s with cold caches, and about 4 s with warm caches.
- Do not take or record a timing of walk. Do not edit anything to make walk faster.
- To check a build, run `bin/fortress explorations/claude_demo.fss`. It prints `SUM[i <- 1#100] i = 5050` among its lines, and exits 0. `ProjectFortress/hello.fss` runs only on the compiled path.

## The model program

MicroGPT runs only under walk, by hand, never in the gate. Check the model when your brief asks for it: run your tree's `explorations/coordinator/tools/mg-run.sh <work-dir> <label> [threads]`. `<work-dir>` is a folder under your tree's `tmp/`, and `threads` sets `FORTRESS_THREADS`, 1 by default. The script runs the quick pair at once, `MicroGptFlatQuick.fss` and `MicroGptAplQuick.fss`: two forward and backward passes each, against the reference values, in about 56 s for both. Each starts from an empty private cache and writes `<work-dir>/<name>.txt`. Read its `VERDICT:` line and its last line, `rc=`.

- Add the word `full` only if your brief asks for it. It runs the full pair, `MicroGptFlatCheck.fss` and `MicroGptAplCheck.fss`, with 40 checks each and a 90-minute timeout.
- If you change a line of the model, put the change in your report as a diff.
