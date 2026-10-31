# Climb batch 24, rung W: walk's check of `self`, the loader told the declaring type (row 847)

- problem: under walk, a helper string bound in a method of a program's own type loaded, and its call answered the length of the type's name: `Holder.len()` gave 6 (row 847; `explorations/fortress-gap-ledger.md:865`)
- spec: `Specification/library/default-libraries.tex:37-39`, the `FortressBuiltin` api typeset from `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`, whose comment says the interpreter takes "the one whose Java parameter and result types carry the declared types, %self% first" (`FortressBuiltin.fsi:19`)
- precedent: `StaticNativeApp.find`'s refusal of a declared parameter type that no Java type carries (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:129`), and the planner's text, `explorations/compile-ladder/plan-24/probes/rung-W.patch:1-147`
- deviation: under a declaring type, an overload that does not take `self` first is also skipped (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:147`)
- deviation: `FlatString` and `JavaString`, names that a program can give its own types, carry no `self` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:88`)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java:61-71`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/MethodClosure.java:36`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionalMethod.java:36`, `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:164-207`

Branch `wip/rung-natives-self`, cut from `b0f6cd6b7`, with two commits: `aa52279ea` (the planner's text with the first change, and four tests) and `d1228e1f0` (the second change, and three more tests). The worktree was seeded by `seed-worktree.sh` from `/home/user/fortress-base23` (exit 0, "seeded from /home/user/fortress-base23 (1f5c49b4f) in 3 s").

## What changed and why

Walk's native loader read a method's `self` only by the helper's Java type. `StaticNativeApp.find` checked a `self` slot only for being a Java type that it carries, because the closures never told `NativeApp.checkAndLoadNative` which type declares the method (row 847). Now:

- `MethodClosure`'s two constructors pass their `definer`, and `FunctionalMethod`'s two pass their self type. They go through two new constructors of `FunctionClosure` (`FunctionClosure.java:61-71`) to `NativeApp.checkAndLoadNative(defn, isFunctionalMethod, declarer)` (`NativeApp.java:169`), which hands the type's name to `StaticNativeApp.find(s, defn, declarer)` (`NativeApp.java:201`). The two-argument `checkAndLoadNative` passes no type (`NativeApp.java:164-166`), so a top-level function, a local function and a function expression load as before.
- `StaticNativeApp.javaForSelf` (`StaticNativeApp.java:82-96`) gives the Java type that carries `self` for a declaring type. It covers `javaFor`'s names except `FlatString`, `JavaString` and `()`, plus the objects `Int`, `Long`, `UnsignedLong`, `Float` and `BigNum`.
- `find` with a declaring type (`StaticNativeApp.java:112-160`) refuses at load a type that `javaForSelf` does not carry (`:137-141`), with the message 'Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries Holder, the type of self.' It takes only an overload that takes `self` first (`:147`) at that carrier (`:154`).

The planner's `rung-W.patch` applied clean. It is the whole change except for two lines:

1. **Self first.** The patch took `self`'s carrier only where the overload had one parameter more than the declaration (`off == 1`). So under a declaring type, a dotted method's helper that does not take `self` still loaded, and its call failed. Under a declaring type an overload must now take `self` first (`StaticNativeApp.java:147`, `:154`). This is the rule that the brief and fork 4 give ("takes only an overload whose first Java parameter is that carrier") and that `FortressBuiltin.fsi:19` states ("%self% first").
2. **Two names left out.** The patch carried `self` by `javaFor`'s names, which include `FlatString` and `JavaString`. A program can give its own type either name:
   - `JavaString` is declared only in the compiler's prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:52`).
   - `FlatString` is declared in the component `FlatString` (`Library/FlatString.fss:34`), whose name the disambiguator does not reserve for a program.

   On the patch's build, a program's own `object FlatString` or `object JavaString` with `len(): ZZ32` bound to `nativeStrlen` loaded and answered 10: row 847's symptom again. Every other name in the table is a type of `FortressLibrary` or `FortressBuiltin`, and the disambiguator refuses those as names of a program's own types. So `javaForSelf` gives those two names no carrier (`StaticNativeApp.java:88`). No binding in the library is a method of `FlatString` or `JavaString` that names a helper.

`javaFor`, the parameter carry, is not changed; rung F changes it.

## The tests, before and after

The tests are in `ProjectFortress/tests/`:

- `NativeHelperUncarriedSelfWalk.fss` with `.test`: promoted from `XXXNativeHelperUncarriedSelfWalk` by `git mv`, with its `component` line renamed. Its key now names the helper and the refusal: `load_exception_contains=Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries Holder, the type of self.` The `XXX` key named only the helper. The program is unchanged: `len()` of `object Holder`, a dotted method (`MethodClosure`).
- `NativeHelperUncarriedSelfTraitWalk`: the same method in `trait Shape`, called on `object Square extends Shape`. The key names `Shape`, the declaring trait, not the object (`TraitMethod`, then `MethodClosure`).
- `NativeHelperUncarriedSelfFunctionalWalk`: `opr |self| : ZZ32` in `trait Shape` (`FunctionalMethod`'s first constructor).
- `NativeHelperUncarriedSelfGenericWalk`: `opr |self|` in `trait Shape[\T\]`, called on `Square[\ZZ32\]` (`FunctionalMethodInstance`, then `FunctionalMethod`'s second constructor).
- `NativeHelperUncarriedSelfFlatStringWalk` and `NativeHelperUncarriedSelfJavaStringWalk`: a program's own `object FlatString` and `object JavaString` with `len()`.
- `NativeHelperUncarriedSelfGenericObjectWalk`, with no `.test`: a generic `object Box[\T\]` with `len()` bound to the helper and no instance made. It loads and prints 'loaded'. This is NEW-W-1's home-3 test (below).

Which constructor each refusal passes through, read from `cd ProjectFortress && ../bin/fortress -debug stacktrace tests/<name>.fss` on the fix:

- the object case: '…MethodClosure.<init>(MethodClosure.java:36)';
- the trait case: '…MethodClosure.<init>(MethodClosure.java:36)' / '…TraitMethod.<init>(TraitMethod.java:38)';
- the functional case: '…FunctionalMethod.<init>(FunctionalMethod.java:36)';
- the generic case (a probe of the same program): '…FunctionalMethod.<init>(FunctionalMethod.java:48)' / '…FunctionalMethodInstance.<init>(FunctionalMethodInstance.java:28)'.

`MethodClosure`'s second constructor serves the instances of a method with static parameters of its own. For a program's type, the `GenericMethod` itself is refused at load first, through `MethodClosure`'s first constructor ('…MethodClosure.<init>(MethodClosure.java:36)' / '…GenericMethod.<init>(GenericMethod.java:91)'). So no program reaches the second constructor with a type that no Java type carries.

**Failing, on the base's code, before the edit was first built** (12:06:01 to 12:06:14 UTC; the first build started after), with the guards beside:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-self/h-before \
      ProjectFortress/tests/NativeHelperUncarriedSelfWalk.{fss,test} ProjectFortress/tests/NativeHelperUncarriedSelfTraitWalk.{fss,test} \
      ProjectFortress/tests/NativeHelperUncarriedSelfFunctionalWalk.{fss,test} \
      ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss ProjectFortress/tests/NativeHelperBindingWalk.fss

    # harness-one 2026-10-31T12:06:01Z; tree b0f6cd6b7; nproc=4; load 0.15 0.70 1.42; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    . interpret tmp/rung-natives-self/h-before/tests/NativeHelperUncarriedSelfWalk
    6
     Missing expected refusal at load
    Tests run: 5,  Failures: 3,  Errors: 0

The trait and functional tests printed 6 too, the length of `Square`; `NativeHelperFamilyZZ32Walk` and `NativeHelperBindingWalk` gave ' OK'.

The generic test, written after the first build, failed on the old code through the base build's harness (12:10:16 UTC):

    FORTRESS_HOME=/home/user/fortress-base23 /home/user/fortress-base23/explorations/compile-ladder/rung-inference-walk/harness-one.sh \
      $PWD/tmp/rung-natives-self/old-harness <the four tests and keys, the two guards>

    # harness-one 2026-10-31T12:10:16Z; tree 1f5c49b4f; ...; cache empty
    . interpret .../old-harness/tests/NativeHelperUncarriedSelfGenericWalk
    14
     Missing expected refusal at load
    Tests run: 6,  Failures: 4,  Errors: 0

The `FlatString` and `JavaString` tests failed twice: on the old code (12:23:36 UTC), and on the build of commit `aa52279ea` before the second edit was built (12:23:49 UTC):

    FORTRESS_HOME=/home/user/fortress-base23 .../harness-one.sh $PWD/tmp/rung-natives-self/old-harness2 <the two tests and keys, NativeHelperUncarriedSelfGenericObjectWalk.fss>
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-self/h-patch2 <the same files>

    . interpret tmp/rung-natives-self/h-patch2/tests/NativeHelperUncarriedSelfJavaStringWalk
    10
     Missing expected refusal at load
    Tests run: 3,  Failures: 2,  Errors: 0

`NativeHelperUncarriedSelfGenericObjectWalk` gave ' OK' on both. It asserts today's behaviour, so it has no failing run.

**Passing, in the last run after the last change of code**, every helper test of walk. The tree's code is that of `d1228e1f0`. The harness's header names `aa52279ea` because that was `HEAD` at the time, with the edit not yet committed.

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-self/h-final2 \
      ProjectFortress/tests/NativeHelper*Walk.* ProjectFortress/tests/ZZ32DivisionByZeroWalk.fss

    . interpret tmp/rung-natives-self/h-final2/tests/NativeHelperUncarriedSelfWalk
     OK Saw expected refusal at load
    . interpret tmp/rung-natives-self/h-final2/tests/NativeHelperUncarriedSelfFlatStringWalk
     OK Saw expected refusal at load
    OK (15 tests)

The guards are climb batch 23's `NativeHelperFamilyZZ32Walk` and `NativeHelperBindingWalk`, unchanged. They gave ' OK' on the base (above) and in this run, beside `NativeHelperRaiseWalk`, `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperNonFlatStringWalk` and `ZZ32DivisionByZeroWalk`.

## The suites

Each suite ran once on each code state, after that state's build. The final state's results (`d1228e1f0`'s code):

    ant testSystem
    [junit] Tests run: 171, Failures: 0, Errors: 0   (system-0)
    [junit] Tests run: 176, Failures: 0, Errors: 0   (system-1)
    [junit] Tests run: 168, Failures: 0, Errors: 0   (system-2)
    [junit] Tests run: 185, Failures: 0, Errors: 0   (system-3)
    BUILD SUCCESSFUL / Total time: 4 minutes 56 seconds

    ant testSpecData
    [junit] Tests run: 130, Failures: 0, Errors: 0, Skipped: 0
    BUILD SUCCESSFUL / Total time: 1 minute 11 seconds

That is 700 tests: climb batch 23's gate's 694 (`explorations/compile-ladder/climb-batch-23/gate/summary.txt`) plus the six new files, with no failure.

Verdicts that change against that gate:
- `XXXNativeHelperUncarriedSelfWalk` was green as an expected failure. It is now `NativeHelperUncarriedSelfWalk`, green as a refusal at load.
- The six new tests are green.
- No other test's verdict changes.

The first code state (`aa52279ea`) gave 'Tests run: 178', '169', '180', '170', 'Failures: 0' (697 tests), 'BUILD SUCCESSFUL', and testSpecData 130 with no failure. The second edit supersedes those runs.

Not run here:
- the demos, which are the gather's (fork 8);
- the compiled tracks, which this rung does not reach (fork 9). No file of this rung is on the compiled path: `compiler/BuiltinPrimitiveRewriter.java:17` names `NativeApp.checkAndLoadNative` in a comment only;
- microGPT, which is the commit stage's.

## The stages and the ladder

Neither stage can move, so neither ran (fork 10). Every path that the rung changes (`git diff --name-only b0f6cd6b7` and `git status --short`) is under one of:
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` (`values/FunctionClosure.java`, `values/MethodClosure.java`, `values/FunctionalMethod.java`);
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/` (`NativeApp.java`, `StaticNativeApp.java`);
- `ProjectFortress/tests/`;
- `explorations/`.

No checker code changes, so there is no speed pass.

The ladder subset is empty, so none ran: no recorded first error names code that this rung touched. `grep -iE "StaticNativeApp|NativeApp|FunctionClosure|MethodClosure|FunctionalMethod|Native helper|builtinPrimitive|interpreter" explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` prints seven rows:
- five programs whose first error is the compiled disambiguator's 'Variable builtinPrimitive is not defined.' (`XXXarityTestFn`, `XXXfailTestFn`, `XXXnoclassNativeFn`, `nativeTestFn`, `testPrim`);
- two whose file names hold "FunctionalMethod" (a `LexicographicOrder` error and an `emitDesc` error).

The same grep over the baseline's `raw/` prints nothing. The compiled path does not run walk's loader.

## Where the fix belongs, and the precedent search

The fix belongs in two places:
- Walk's natives, `interpreter/glue/` (`explorations/coordinator/map/modules-and-phases.md`, B.12, "Native code and Java interop"): a helper string is matched in `NativeApp.checkAndLoadNative` and loaded by `StaticNativeApp`.
- The closures of `interpreter/evaluator/values/` that call the loader, which know the declaring type: `MethodClosure` its `definer` (`MethodClosure.java:33`), `FunctionalMethod` its self type (`FunctionalMethod.java:32-41`).

The type comes from `FTypeTrait` and `FTypeObject`, which build their methods with themselves as `definer` (`interpreter/evaluator/types/FTypeTrait.java:101`, `FTypeObject.java:103`; `FTraitOrObjectOrGeneric.java:121` for functional methods).

Every call of the loader is in `FunctionClosure.java` (`:47`, `:52`, `:57`, `:64`, `:69`, `:78`), each reached from a closure:
- The five other `new FunctionClosure(` sites (`BuildEnvironments.java:417`, `Evaluator.java:569`, `BuildLetEnvironments.java:67`, `FGenericFunction.java:99`, `ForeignComponentWrapper.java:67`) and `ClosureInstance` (`FGenericFunction.java:98`) are functions, with no `self`.
- `FunctionClosure(TraitMethod, Environment)` (`:76-81`) passes a definition that the loader has already loaded.

The precedent is climb batch 23's loader (`640acb4a1`), which refuses a declared type that no Java type carries. Its file has two other sites where a declared type meets the carrier table: the parameters (`StaticNativeApp.java:124-131`) and the result (`:132-136`). Both already refuse. `self` was the third, and is now checked (`:137-141`) with the same message form, 'no Java type carries ...'. The library has no precedent for checking a method's receiver: the glue classes are not checked at all (`interpreter/glue/NativeMeth.java:29-31`, the team's comment).

The ways the tree offers, before the choice:

1. The closure tells the loader the declaring type. Taken; this is fork 4.
2. A refusal at the call, in `unbox` (`StaticNativeApp.java:225-234`), where the value is not of the Java type's class. Not taken: row 847 asks for a refusal at load.
3. The declaring type read from the syntax tree. Not taken: the tree has no parent links (fork 4).
4. One table shared with the parameter carry, `javaFor`. Not taken: rung F changes it (fork 4).
5. The declaring type by identity, not by name. Two forms, neither taken:
   - The declaring component read from the declaration's span. This depends on the source path, and a library file shadowed from the current directory, as in the controls below, has another path.
   - A comparison with the type that `Driver.getFortressLibrary()` binds under the name. This depends on the order in which the library's components and types are built, since the library's own methods are loaded while its environments are being built.

   The names suffice: with `FlatString` and `JavaString` left out, the disambiguator refuses each of them as the name of a program's own type (measured, below).

## What the specification settles

The specification typesets `builtinPrimitive`'s comment (`Specification/library/default-libraries.tex:37-39`, from `FortressBuiltin.fsi:14-29`). It says two things:
- the interpreter takes "the one whose Java parameter and result types carry the declared types, %self% first";
- "A string under com.sun.fortress.nativeHelpers that names no such method is an error on both."

The rung makes the first true of `self`: a method's binding takes an overload with `self` first, at the carrier of the declaring type, and no other. The comment does not say when the error is raised. Row 847's fix asks for the load, and NEW-W-1 records where walk raises it later. `grep -rn "self" Specification/library/default-libraries.tex | grep -i "native\|builtinPrimitive"` prints nothing: no other passage speaks of a native's `self`.

## Programs run on the old code and the new

Each probe is a program in the worktree's scratch. New code runs with `bin/fortress`; old code runs with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <tree>/tmp/rung-natives-self/old-caches`.

**Row 847's shapes.** On the base, by `bin/fortress` before the edit:
- a trait's dotted method: '6', rc=0;
- a trait's functional method: '6', rc=0;
- a generic object's method: 'before' / '11', rc=0 (11 is the length of `Box[\ZZ32\]`).

On the fix each is refused:
- the generic object only at its instance: 'before', then 'Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries Box, the type of self.', rc=1;
- a generic trait's dotted method the same way: 'before', then '... carries Shape, the type of self.';
- a method with a static parameter of its own, in an object or a trait, at load: '... carries Holder, the type of self.', with no 'before'.

**A program's own type named after each name in the carrier table**, written as `object T` with `len(): ZZ32` bound to `nativeStrlen`:
- `Int`, `String`, `Boolean`, `RR32`, `Float`, `ZZ32`, `NN32`, `Char`, `ZZ64`, `NN64`, `RR64`, `ZZ`, `Long`, `UnsignedLong` and `BigNum`: each rc=255, 'Type name may refer to: Int, FortressBuiltin.Int' (or `FortressLibrary.` for the library's types);
- `FlatString` and `JavaString`: rc=0, '10', on the patch's build. Hence the second change.

**Controls of the self-first rule, with a library binding changed for one run.** No program can declare a method in a type that the table carries, so the rule's other branches can be seen only through the library. Each control:
1. copies `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` into a scratch directory;
2. changes `Int`'s `getter asString()` binding there (`FortressBuiltin.fss:370-371`);
3. runs `x: ZZ32 = 5; println("asString: " x.asString)` from that directory, where the copy hides the library's file (`fortress.source.path` searches `.` first).

The library itself is not edited.

| binding of `Int.asString` | old code | new code |
|---|---|---|
| `simpleLongArith.longToString(long)`, `self` at another carried type | 'asString: 5', rc=0 | 'Native helper com.sun.fortress.nativeHelpers.simpleLongArith.longToString has no overload that fits the declaration's types.', rc=1 |
| `simpleOverload.bar()`, no `self` | 'Native public static java.lang.String com.sun.fortress.nativeHelpers.simpleOverload.bar() given 1 arguments', a `ProgramError` at the call, rc=1 | 'Native helper com.sun.fortress.nativeHelpers.simpleOverload.bar has no overload that fits the declaration's types.', at load, rc=1 |
| `simpleOverload.baz`, overloads `(String)` and `(int)` | 'Native helper com.sun.fortress.nativeHelpers.simpleOverload.baz has 2 overloads that fit the declaration's types.', rc=1 | 'asString: baz 5', rc=0 |

The second row is the first change's case. By reading, the patch as written (`off == 1 && xs[0] != selfJava`) loads it and fails at the call, as the old code does; this was not measured on a build of the patch alone. The new column was run again on the final code, with the same results.

## Each declaring type the table carries, and the library's bindings

`javaForSelf` carries `self` for fifteen names, each a type of `FortressLibrary` or `FortressBuiltin`:
- in `int`: `ZZ32`, `NN32`, `Char` and `Int`;
- in `long`: `ZZ64`, `NN64`, `Long` and `UnsignedLong`;
- in `double`: `RR64` and `Float`;
- in `float`: `RR32`;
- in `boolean`: `Boolean`;
- in `String`: `String`;
- in `BigInteger`: `ZZ` and `BigNum`.

It carries no other name; `FlatString`, `JavaString` and `()` are among those left out.

It would refuse no library binding:
- **On this tree:** the 21 bindings that name a helper load (the suites; `NativeHelperFamilyZZ32Walk`, `NativeHelperBindingWalk`).
- **For the merged tree, by reading signatures:** I compared the helpers' Java signatures (`javap -public` of `ProjectFortress/build/com/sun/fortress/nativeHelpers/*.class`) against the planner's table of the batch's bindings (`explorations/compile-ladder/plan-24/probes/families-base.tsv`: families F, Z, S, K and H, 152 bindings) and climb batch 23's 21 (`moved-base.tsv`). That is 173 bindings. 172 of them are methods of `Float`, `ZZ64`, `ZZ`, `Long`, `NN32`, `BigNum`, `Char`, `NN64`, `ZZ32` and `Int`, and each has an overload whose first Java parameter is its type's carrier. The 12 dotted ones (the getters of `Float`, `Long`, `BigNum`, `Char`, `NN32` and `Int`) each name a helper with one parameter more than the declaration, so the first change skips none of them.
- **The planner's runs:** the planner ran the patch with F, Z and S, and with H, and every binding loaded (`explorations/coordinator/CLIMB-BATCH-24.md:409`, `:415`). The two changes refuse only cases that those runs could not contain. K's two `CHOOSE` bindings were in neither run; their helpers take `int` and `long` first.

The gate on the merged tree is the run that confirms this.

## Sentences made false

- `Specification/appendices/changes.tex:4493-4498`, in the entry "A native binding that names a static helper", Effect: "The interpreter reads the \KWD{self} of a method only by the helper's Java type, since it is not told the type that declares the method: a helper bound in a method of a type that no Java type carries, as a program's own object, is not refused, and its call passes the object as that Java type reads it, the name of its type to a helper over \TYP{String} (row~847 of the revival's gap ledger)." The gather rewrites it (fork 7). What stays true: a dotted method of a generic trait or object is refused only at its instance (NEW-W-1).
- `explorations/coordinator/FACTS.md:134`, F-299: "It reads a method's `self` only by the helper's Java type, so a binding in a method of a program's own type loads (row 847)." Its citation `NativeApp.java:194-201` is now `:200-207`.
- `.claude/skills/fortress-repo/references/interpreter.md:103`, "Natives": "Walk does not check `self`. It passes `self` as the helper's first Java parameter, read as that parameter's Java type. So a binding in a method of a program's own type loads, and a `String` parameter receives the type's name (ledger row 847)." The list above it (`:97-101`) lacks the new refusal, 'no Java type carries T, the type of self.', and the self-first rule. `.claude/skills/fortress-repo/references/sources.md:941` gives "`self` not checked" and `XXXNativeHelperUncarriedSelfWalk` as that part's source.
- Still true: `FortressBuiltin.fsi:19`, "%self% first", now true of `self` as well; `explorations/coordinator/map/modules-and-phases.md:445`; `compiler/BuiltinPrimitiveRewriter.java:17`.

## Points to report

- **rung-W.patch, taken with two changes:** the self-first rule under a declaring type (`StaticNativeApp.java:147`, `:154`), and no carrier for `FlatString` and `JavaString` (`StaticNativeApp.java:88`), for the reasons above.
- **The tests before and after, through the harness:** above, in "The tests, before and after".
- **ant testSystem and ant testSpecData on the final tree:** 'BUILD SUCCESSFUL' with 700 tests and no failure; 130 tests and no failure. The verdicts that change are the promoted test's and the six new tests'.
- **Each declaring type the table carries, and any library binding it would refuse:** the fifteen names above; none refused.
- **Every sentence made false:** above.
- **A file edited beyond those named, or an edit of `StaticNativeApp.javaFor`:** not reached. `javaFor` is not edited. In the files named, only the constructors, `checkAndLoadNative`, `find` and `javaForSelf` change. The tests are seven programs, five more than the brief names: the functional, generic, `FlatString`, `JavaString` and generic-object ones.

## Decisions

1. **The planner's text, with two changes.** Ways not taken: the text as it is, which loads a dotted method's helper without `self` under a declaring type (the control's second row) and a program's own `FlatString` or `JavaString` (the name probes, '10'); a reworked mechanism, of which the patch's is fork 4's default.
2. **Under a declaring type, only an overload that takes `self` first** (`StaticNativeApp.java:147`). Ways not taken: the patch's `off == 1` guard, which lets a dotted method's helper with no `self` load and fail at its call ('given 1 arguments'); a refusal at the call. Evidence: the controls; none of the merged batch's 12 dotted bindings has such a helper.
3. **`FlatString` and `JavaString` carry no `self`**, by name. Ways not taken: keeping both, which leaves row 847's symptom for two names; an identity check of the declaring type, by its declaration's file or against the library's environment, which is heavier and depends on the source path or on the order of loading (way 5 above); leaving out only `JavaString`. Cost: a later move of `FlatString`'s five glue bindings (fork 17) onto helpers will meet 'no Java type carries FlatString, the type of self.' and will need that identity check then.
4. **Tests over every constructor that a program reaches**, each read off the stack trace: the object and trait cases (`MethodClosure`'s first), the functional case (`FunctionalMethod`'s first), the generic case (`FunctionalMethod`'s second), the two names, and NEW-W-1's home-3 test. Ways not taken: only the brief's two, which leave `FunctionalMethod`'s lines untested; one trait with both a dotted and a functional method, where only the first refusal is seen. No program reaches `MethodClosure`'s second constructor with a type that no Java type carries (above).
5. **The promoted test's key names the helper and the refusal.** Way not taken: the `XXX` file's key, the helper's name only, which a refusal for another reason ('has no overload that fits') would also satisfy.
6. **The rule's other branches shown by controls on a shadowed `FortressBuiltin.fss`, not by gated tests**, because no program can declare a method in a carried type. Ways not taken: an edit of `ProjectFortress/LibraryBuiltin/` for one run, which the brief's file list excludes; no control.
7. **NEW-W-1 recorded, not fixed:** home 3, since the specification is silent on when the error is raised. Ways not taken: a check of a generic type's helper bindings where the type is declared, which lies outside the rung's files (`BuildEnvironments.java` or `FTypeGeneric.java`); home 2, which needs the specification to settle the timing.
8. **No stage, no ladder subset, no demos run:** the paths (forks 10 and 8) and the subset's grep, above.
9. **Both suites run again after the second change**, which made a new code state. The first state's runs are kept above as superseded.

## Defects and their homes

- **Row 847**, a helper bound in a method of a type that no Java type carries loads: home 1, repaired. Tests: `NativeHelperUncarriedSelfWalk`, `NativeHelperUncarriedSelfTraitWalk`, `NativeHelperUncarriedSelfFunctionalWalk`, `NativeHelperUncarriedSelfGenericWalk`. The gather closes the row.
- **A program's own `FlatString` or `JavaString`** passed the patch's check (measured on the patch's build, '10'): home 1, repaired. Tests: `NativeHelperUncarriedSelfFlatStringWalk`, `NativeHelperUncarriedSelfJavaStringWalk`. It is a defect of the planner's text, which never landed, so it gets no row.
- **A dotted method's helper without `self`** loads and fails at its call (old code, the control's second row): home 1, repaired, without a gated test, since no program reaches it without a library edit. The control is its evidence. No binding has this form, so it gets no row.
- **NEW-W-1**, a dotted method of a generic trait or object is refused only at its instance: home 3, with `NativeHelperUncarriedSelfGenericObjectWalk` (it loads while no instance is made) and the row in `record.md`.

## For FACTS

See `record.md`: F-299 rewritten, with its row-847 sentence replaced by the check of `self`.

## Commands

- The constructor a refusal passes through: `cd ProjectFortress && ../bin/fortress -debug stacktrace tests/<name>.fss 2>&1 | grep -n "FunctionalMethod.<init>\|MethodClosure.<init>\|TraitMethod.<init>"`.
- A library binding changed for one run without editing the library: copy its `.fss` into a scratch directory, change it there, and run the program from that directory (`fortress.source.path` searches `.` first; `build-and-caches.md`, "Name resolution"). For the old code, run it through `old-fortress.sh` from the same directory.
- The helpers' Java signatures: `javap -cp ProjectFortress/build -public com.sun.fortress.nativeHelpers.<Class>`.

## Questions for the curator

None blocks the landing. One question is left open for the batch that moves `FlatString`'s bindings: whether the loader should then identify the declaring type by its declaration rather than by its name (decision 3; `StaticNativeApp.java:88`).
