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

Walk departs from the rules on literals in `revival-changes.md` ("Traits and objects" and "Numbers") in these ways, until each fix lands. A test of one of these cases asserts the rules' answer, as an `XXX` test (`tests-writing.md`).

- Walk keeps a float numeral bound to an `RR64` variable, parameter or field as a `FloatLiteral`. So `SEQV` finds it unequal to a computed `RR64` of the same bits (ledger row 943).
- Walk refuses `q: QQ = 0.5`, and answers `false` to `1/2 = 0.5` (ledger row 944).
- Each evaluation of a string literal makes a new string object, so `"ab" SEQV "ab"` is `false` (ledger row 945).
- Walk gives an integer numeral the Java class `Int`, `Long` or `BigNum` by its value, and a generic built from a number value instantiates at that class. So `Cell(3)` is a `Cell[\Int\]`, not a `Cell[\ZZ32\]`, and an overload declared on `Cell[\ZZ32\]` does not take it. Walk prints the class as `ZZ32`, `ZZ64` or `ZZ`, also in a static argument, but its error messages say `Int` (ledger row 364). For the same reason, `array1` and `array2` at an inferred element type give a plain array, not a `Vector` or `Matrix`, and its `+` and unary `-` fail dispatch (ledger row 721). In a program, write the static argument, as `Cell[\ZZ32\](3)`.

Until walk runs the checker (P-12), walk computes arithmetic on numerals, as `3 + 4`, at `ZZ32`, where the checker types it `IntLiteral`, and so does the arithmetic of the value `IntLiteral` itself (ledger row 578): interim answers, which no test asserts against.

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
  - a pair that is neither two generic declarations, nor a generic one beside a plain one, nor a generic function beside a generic trait's or object's functional method that has no static parameters of its own;
  - the instances of an explicit instantiation.

  Where it reads exclusion over the whole tuple of parameter types, at the instance that the equalities force, it reads two parameter types that still mention a static parameter as excluding only where no instances of the two can meet. Walk departs from the rules in these cases:
  - At load, it does not check two functional methods of a generic trait or object on their declared domains. It compares them at each call, on the instance that the call makes. So such a pair that breaks the rules loads, and a call can fail with "Cannot find definition for method" (ledger row 780).
  - It refuses two generic functional methods whose declared domains lie one inside the other, in a type without static parameters (ledger row 779).
  - It refuses a pair whose overlap it finds only through an instance of a supertype, also where a third declaration covers the overlap (ledger row 539).
  - It refuses overloads on two instantiations of one generic type, as `g(b: Tg[\3\])` beside `g(b: Tg[\4\])` (ledger row 416).
  - Its parameter-by-parameter check reads an object type over a static parameter as excluding a type that one of its instances is or extends. So it loads `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, which the Meet Rule refuses (ledger row 788).
  - It reads no `where` clause when it reads exclusion over the whole tuple. So it refuses such a pair where one declaration has a `where` clause of its own (ledger row 787).
  - It does not refuse a type that extends a self-typed trait `T[\A\]` and is not an `A` (`revival-changes.md`, "Traits and objects"). A call that both `T`'s operator and another declaration fit then runs one of them, without an ambiguity error (ledger row 893). Make each type that extends `T[\A\]` an `A`.
  - It loads a generic top-level function whose declared domain lies inside that of a self-typed trait's functional method of the same name, where the Return Type Rule holds. The checker refuses every top-level function more specific than a functional method of its name, a check that the specification does not state: '… is more specific than the declaration of the functional method' (ledger row 894).
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
- gives a member a type that names its trait's `comprises`-clause variable, as `E` in `AnyList`;
- names, in a `builtinPrimitive` string, a helper that walk refuses ("Natives").

Walk checks a program's declarations against the library's only when it analyses the library, not when it loads the library's entries from the cache (ledger row 342). So a program that walk refuses with an empty cache runs with a filled one. Deleting the program's own entries does not bring the check back. To see such a refusal, run with an empty cache, as `COLD_CACHE=1` gives `harness-one.sh`.

Walk compares no component with the apis that it exports. So a component that leaves out an api member, or declares it at another header, loads and runs under walk. The compiled export check refuses it (ledger row 841). `library.md`, "Designing a change", gives the step that runs the check on each component.

`tests-writing.md` says how a test names a refusal at load.

Walk's overload-ambiguity message names its two declarations in an order that varies from run to run. On one core, the order is fixed for a given library, but a library edit can change it. Do not pin or compare this order. The harness reads only that an `XXX` test fails.

## Natives

The library binds each of walk's natives by a declaration whose body is `builtinPrimitive("…")`. The string names one of these:

- A glue class, as `com.sun.fortress.interpreter.glue.prim.X`, in `interpreter/glue/prim/`. A glue class takes walk's `FValue` objects, so the compiled path cannot use it.
- A helper: a public static method of a class under `nativeHelpers/`, as `com.sun.fortress.nativeHelpers.simpleIntArith.<method>`. `interpreter/glue/StaticNativeApp.java` calls it by reflection, with a method's `self` first. The compiled path calls it too (`compiler.md`, "Natives"). Most bindings name a helper. The others name a glue class. F-299 counts both kinds (`records.md`, "Reading the record").

Walk carries each declared type of a helper's binding in one Java type:

- `ZZ32`, `NN32` and `Char` in `int`; `ZZ64` and `NN64` in `long`; `RR64` and `Float`, the library's object that extends `RR64`, in `double`; `RR32` in `float`; `Boolean` in `boolean`;
- `FlatString` and `JavaString` in `String`, and `String` too, except as a parameter other than `self`; `ZZ` in `BigInteger`; `()` in `void`; `JavaBufferedWriter` and `JavaBufferedReader`, the library's writer and reader traits, in `compiler/runtimeValues/FortressBufferedWriter` and `FortressBufferedReader`, which the checker reads back as the two traits.

In a method, walk carries `self` by the type that declares the method:

- a type of the list above, except `JavaString` and `()`, in the same Java type, but `FlatString` only where it is the library's own;
- the library's objects that extend number types, not the glue classes of the same names: `Int` (`ZZ32`) in `int`, `Long` (`ZZ64`) and `UnsignedLong` (`NN64`) in `long`, and `BigNum` (`ZZ`) in `BigInteger`.

A program can give its own type the name `FlatString` or `JavaString`. Walk tells the library's `FlatString` by the component that declares it, so a program's own type of either name carries no `self`. But walk carries a parameter declared at such a type in `String`, by the type's name alone, and does not refuse the binding. The native then receives the name of the type, not the value's text (ledger row 877). Give a program's own type another name.

Walk refuses a helper's binding at load in these cases. The message names the string, and contains the words below, which a `load_exception_contains` key can match:

- The class or the method does not exist: 'not found' or 'names no static method of'.
- The result type, or a parameter type other than `self`'s, is not carried by the first list: 'no Java type carries the declared'.
- The binding is in a method of a type that the second list does not name, as a program's own object: 'no Java type carries T, the type of self.', with the type's name as T. Match ', the type of self.' to tell it from the refusal above.
- No method of that name, or more than one, has exactly the Java types of the lists, with `self`'s first in a method: 'has no overload that fits the declaration's types', or 'overloads that fit'.

The check has two gaps:

- Walk checks the binding of a dotted method of a generic trait or object only when the program makes an instance, at run time. So a program that makes no instance loads. One that makes an instance stops there with the same message, as an `InterpreterBug` (ledger row 864). Test such a binding with a program that makes an instance.
- Walk reads the type that declares the method, not the type of the value. So a program's object that extends `ZZ32` loads. A call of a method of `ZZ32` that binds a helper then stops with 'getInt not implemented for FOrdinaryObject' (ledger row 551).

A glue class bound over `String`, and a helper bound in a method of `String` as `self`, receive the wrong text for a `CatString`: the name of the type, not its characters (ledger row 846). `||` builds a `CatString` when the joined string is longer than `maxLeafSize`, 32 characters by default. Bind such a native over `FlatString`, and beside it an overload over `String` that passes `s.asFlatString`, as `printlnWithThread` does (`Library/FortressLibrary.fss:4640-4644`). In a method of `String`, call that overload with `self`.

An `import java` written in a `.fss` file is wired under walk but unfinished, and no test uses it. The compiled path's generated `import java` (`compiler.md`, "Natives") is not this one.

A glue class raises a Fortress exception that a `catch` sees by throwing a `FortressError` that holds the exception's object. `Int.overflow()` in `interpreter/glue/prim/Int.java` makes one, and its callers throw it:

    FObject f = (FObject) Driver.getFortressLibrary().getRootValue(WellKnownNames.integerOverflowException);
    return new FortressError(f);

A helper runs on both paths, so it raises an exception as compiled code does: `throw Utility.makeFortressException("fortress.CompilerBuiltin$DivisionByZero")` (`compiler/runtimeValues/Utility.java`). A message can follow as a second argument, as in `nativeHelpers/runtime.java:53`, which raises `FailCalled`. The string names the compiler's prelude's class for the exception. Under walk, that class does not load, and `StaticNativeApp` raises the interpreter's library's object of the same name in its place, without the message. So raise from a helper only an exception that both libraries declare as an object, as `DivisionByZero`, `IntegerOverflow` and `FailCalled`. `DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raise `DivisionByZero` in this way, on both paths. So no division, remainder or modulus by zero on these types ends the run. A `catch` sees no other Java exception, so any other Java exception of a native, a glue class's included, ends the run.

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
