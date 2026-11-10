# Rung N, rung-numeral-leftovers: the numerals' leftovers under walk, in the prelude and at a program's start

- problem: the two paths still answered a numeral differently in the ways of `explorations/reviews/batch-29b-review.md:67-106` (its section 2, items 4, 8, 9, 11 and 12) and of its findings 1 and 2 (`:455-486`), and walk kept the field numerals' code in the places of `:51-56`.
- spec: `Specification/basic/expressions/literals.tex:189-197` (every number type takes a numeral through its coercion; one value per place), `:209-210` (a numeral that rounds to an infinity is a static error), `:274` (a numeral type is written only as a parameter type); `Specification/basic/conversions-coercions.tex:500`, "Coercion Resolution" (the more specific declaration applicable with coercion).
- precedent: the one library's `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = numeralRR64(v, r.asZZ32, 0)`, `Library/FortressLibrary.fss:389`, and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:214`; the generated `main` and `compute` of a component class, a pool, then a task that sets itself as the thread's task, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:654-679`; walk's range check of an integer numeral, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:356-372`; walk's load check `BuildEnvironments.checkComprisesClauses`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1204`.
- deviation: the classes of the components that a program imports are initialized before the program's `run` starts, where the JVM initialized each at its first use (`ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java:30-46`).
- deviation: walk refuses a numeral type written in the two forms only, an extended type and a static argument; the checker refuses every written form but a parameter's type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:67-72`).
- historical: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`, `Library/CompilerLibrary.fsi`, `Library/CompilerLibrary.fss`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/FortressExecutable.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java`, `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java`, `Specification/appendices/changes.tex`, `Specification/basic/conversions-coercions.tex`.

The branch is `wip/rung-numeral-leftovers`, cut from `9d0147ff9e`. Its commits: `bbbaa84198` (the prelude's two coercions), `f02e0900dd` (the component classes' initialization), `50bd2516db` (walk), `d896c5bdf1` (the specification), `7b13e86f83` (three more assertions in one test), and the commit of this report. The worktree was seeded by `seed-worktree.sh`, which exited 0; the base build is at `9a0f69e01a`, which differs from the base only under `explorations/` (`git diff --stat 9a0f69e01a 9d0147ff9e`: 13 files, all under `explorations/`).

## 1. What changed and why

All eight steps of the section are built. Rows 971, 979, 958, 967 and 974 close; row 442 loses its numeral half; row 960 has its new reproducer.

1. **An integer numeral at the prelude's RR64 and RR32** (row 442's numeral half; P-37's exception, P-174). `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:894` and `:956`, with their headers at `CompilerBuiltin.fsi:402` and `:445`:

       coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = jNumeralToDouble(v, jBigToZZ64(r).asZZ32, 0)
       coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = jNumeralToFloat(v, jBigToZZ64(r).asZZ32, 0)

   Each is its type's radix-point coercion at no digits after the point, so the value is the exact value rounded once (P-173). The fold needed no change: `NumeralCoercionFold` evaluates the body, the literal `0` included, and the class file holds the constants: `javap -p -c -constants NumeralNaturalAtFloatCompiled.class` prints `ldc2_w #85 // double 3.0d`, `ldc #104 // float 1.6777216E7f`, `ldc2_w #123 // double 1.2345678901234568E29d`, `ldc #140 // float 1.2345679E29f` and `ldc2_w #144 // double -3.0d`.
2. **A numeral coercion that starts a task** (rows 971 and 979; P-176; fork N1).
   - `MainWrapper.main` (`runtimeSystem/MainWrapper.java:92-95`) sets the program's arguments, then calls `initializeInRootTask` (`:30-46`), which reaches `FortressExecutable.initializeInRootTask` (`runtimeSystem/FortressExecutable.java:113-141`) by reflection through `icl`, the class loader's copy of the run time's classes.
   - That method makes a `FortressTaskRunnerGroup` of one thread, invokes on it a root `BaseTask` whose `compute` sets itself as the thread's task and calls `Class.forName(name, true, loader)` for each name, and shuts the pool down; `main` waits in `invoke`. What a load or an initialization throws is carried back and thrown unchanged on the main thread.
   - The names are the program's component class, then the class of each component that it imports, at any depth: `InstantiatingClassloader.componentClasses` (`runtimeSystem/InstantiatingClassloader.java:185-248`) reads the class names in the constant pools of the classes of the component's jar, and takes each top-level class whose class file is in a jar of its own name, as `NumeralCoercionSpawnImportedApi.jar!/NumeralCoercionSpawnImportedApi.class` or `fortress.CompilerBuiltin.jar!/fortress/CompilerBuiltin.class`. This is row 979's repair by the same way: every component's class is initialized inside the root task, on the pool of one thread, before `run` starts, so no place is filled on a worker of the program's pool.
   - `runtimeSystem/BaseTask.java` is unchanged, and so is `compiler/codegen/`.
3. **Walk's dead code of the field numerals**, deleted by the post-batch review's list (section 6 below gives each piece).
4. **Row 960's reproducer**, `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss`, written again: `object Digits(count: ZZ32)` with a coercion over `RadixPointNumeral[\n, m, r, v\]` that answers `Digits(n.asZZ32)`, asserting 3 for `00.5`. It is still an expected failure, now for the row's reason: 'a ZZ32: 2 =/= a ZZ32: 3'.
5. **Row 967.** `Numerals.inRange` (`interpreter/evaluator/values/Numerals.java:356-372`) answers false for a numeral, as written or folded, whose exact value rounds to an infinity at the library's `RR64` or `RR32`, so that no coercion applies and walk refuses it in the form of an integer numeral out of range: 'Type mismatch binding' at a top-level variable, 'RHS expression type ZZ is not assignable to LHS type RR32' at a local one, 'Unification error ... got arg ...:ZZ of type ZZ' at a parameter. The answer is computed once for a site (`infiniteAt`, `:309-323`; a magnitude below 2^127 is finite at once). The dispatch caches' key tells such a numeral apart (`rangeKey`, `:705-712`), since two numerals of one default type, one finite at `RR64` and one not, would otherwise share a cached choice.
6. **Row 958.** The row's note gave the mechanism wrongly: walk has no intersection type (`interpreter/evaluator/EvalType.java:405-411`). A probe that printed each declaration applicable with coercion for `2.5 + a` showed three: `RR32`'s `+` at `(RR32, RR32)`, `RR64`'s `+` at `(RR64, RR64)`, and `AdditiveGroup`'s abstract `+` at `(AdditiveGroup[\RR64\], RR64)`, which fits the numeral's default at `self`. `RR32`'s is more specific than `RR64`'s, and `RR64`'s than the abstract one, but `Coercions.noLessSpecific` does not find `RR32` below `AdditiveGroup[\RR64\]`: `RR32` extends `AdditiveGroup[\RR32\]`, and walk does not read two instances of one generic trait as excluding (row 416). So the three tied, and the tie read the numeral at its default. `OverloadedFunction.bestMatchWithCoercion` now, where no declaration is more specific than each other directly, takes the one that is so through others of them (`mostSpecificThroughOthers`, `interpreter/evaluator/values/OverloadedFunction.java:2418-2438`; called at `:2398`). A call that had one most specific declaration before has the same one now; only a call that ended in 'Ambiguous coercion' can change. Walk's rule that a declaration that fits a numeral as it is runs before one that converts it is untouched: it is the first half of `bestMatchForNumerals` (`:2306-2317`), which this change does not edit.
7. **Row 974** (fork N3). `BuildEnvironments.checkNumeralTypesWritten` (`interpreter/evaluator/BuildEnvironments.java:1175-1202`), called from `Driver.evalComponent` (`interpreter/Driver.java:227`) beside the comprises check, walks every component of the program but the three of the prelude and refuses a `NaturalNumeral` or `RadixPointNumeral` in an `extends` clause or as a static argument, with the checker's message: 'NaturalNumeral cannot be written in a program except as a parameter's type.'
8. **The whole suites**, once each on the final code (section 3).

The two comments of the compiler's library that justified `assert` by "the IntLiteral coercion" (`Library/CompilerLibrary.fsi:38-44`, `Library/CompilerLibrary.fss:90-95`) now give the reason that holds: at an `Any` parameter a numeral takes its default.

## 2. The failing runs, on the base's code

Every run below ended before the first build or compile of its fix. The worktree's build was the base's until 09:20 UTC, when `ant testOnly` built the edited test class alone; the prelude was first compiled with the two coercions at 09:21, and the run time was first built with its edit at 09:24.

- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh n1 ProjectFortress/compiler_tests NumeralNaturalAtFloatCompiled.test`, 09:15:51Z:

      ProjectFortress/compiler_tests/NumeralNaturalAtFloatCompiled.fss:15:13:
          Right-hand side has type NaturalNumeral[\1,10,3\], but declared type is RR64.
      File NumeralNaturalAtFloatCompiled.fss has 6 errors.
      Tests run: 2,  Failures: 2,  Errors: 0

- `ONE_JVM=1 .../junit.sh n1b ProjectFortress/library_tests NumeralFoldFloats.test`, 09:15:55Z:

      ProjectFortress/library_tests/NumeralFoldFloats.fss:11:15-21:
          Right-hand side has type NaturalNumeral[\8,10,16777217\], but declared type is RR32.

- `ant testOnly -DtestPattern=NumeralCoercionFoldJUTest`, ended 09:20 UTC:

      [junit]   testRR64FromNatural(com.sun.fortress.compiler.desugarer.NumeralCoercionFoldJUTest) FAIL
      [junit]   testRR32FromNatural(com.sun.fortress.compiler.desugarer.NumeralCoercionFoldJUTest) FAIL
      [junit] 3 at RR64 expected:<3.0> but was:<null>
      [junit] Tests run: 10, Failures: 2, Errors: 0, Skipped: 0, Time elapsed: 19.089 sec

- `ONE_JVM=1 .../junit.sh n2 ProjectFortress/compiler_tests NumeralCoercionSpawnCompiledLink.test NumeralCoercionSpawnCompiled.test`, 09:16:47Z:

      . run ProjectFortress/compiler_tests/NumeralCoercionSpawnCompiled (286ms) Exception in thread "main" java.lang.ExceptionInInitializerError
      Caused by: java.lang.ClassCastException: class java.lang.Thread cannot be cast to class com.sun.fortress.runtimeSystem.FortressTaskRunner
      Tests run: 3,  Failures: 1,  Errors: 0

- Row 979, under `timeout`: `ONE_JVM=1 timeout 60 .../junit.sh n3 ProjectFortress/compiler_tests NumeralCoercionSpawnImported.test`, started 09:17:00Z, printed its two header lines and no verdict, and `timeout` ended it: 'timeout exit=124'. By hand on the same code, `FORTRESS_THREADS=4 timeout 8 ../bin/fortress run NumeralCoercionSpawnImported`, three runs: 'REACHED PASS exit=0', 'REACHED exit=124', 'REACHED PASS exit=0'; at one thread, 'REACHED PASS'. With row 971's repair built and before row 979's, six runs at four threads: one 'REACHED PASS exit=0' and five 'Terminated exit=143'. The test's `.test` file was kept out of the tree until the repair was built.
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-numeral-leftovers/h1` over the four promoted walk tests and the reproducer, 09:18:58Z:

      . interpret tmp/rung-numeral-leftovers/h1/tests/NumeralTypeWrittenWalk
      REACHED: an object extends a numeral type, and a numeral type is a static argument
       Missing expected refusal at load
      F. interpret tmp/rung-numeral-leftovers/h1/tests/NumeralRoundsToInfinityWalk
      Infinity
       Missing expected refusal at load
      FAIL: J10/0:4.0 : RR64 =/= J10/0:4.0 : RR32; literals.tex, section "Literals", and conversions-coercions.tex, section "Coercion Resolution": a float numeral + RR32 by RR32's +, the numeral converting into RR32
      Tests run: 5,  Failures: 4,  Errors: 0

  The fourth failure is `NumeralFoldedRoundsToInfinityWalk` ('Infinity', 'Missing expected refusal at load'); the fifth test, the reproducer of row 960, printed 'FAIL: a ZZ32: 2 =/= a ZZ32: 3' and ' OK Saw expected exception'.
- The reproducer of row 960 shown red on a deliberate fix, its expected value set to 2 for one run: `harness-one.sh ... XXXRadixPointLeadingZerosWalk.fss` printed 'PASS', ' Missing expected failure', 'Expected failure or exception, saw none.', 'Tests run: 1,  Failures: 1,  Errors: 0'. The value was then set back to 3.
- The two tests of row 974's single forms, written after walk's first edit, on the old code: `FORTRESS_HOME=/home/user/fortress-base31 /home/user/fortress-base31/explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-numeral-leftovers/old-harness` over `NumeralTypeExtendedWalk` and `NumeralTypeStaticArgumentWalk`, 09:36:01Z:

      REACHED: a numeral type is a static argument
       Missing expected refusal at load
      REACHED: an object extends a numeral type
      Tests run: 2,  Failures: 2,  Errors: 0

The deletion of walk's dead code has no failing test: `tests/Numeral*Walk.fss` are its guards, and they pass in the suite below.

## 3. The passing runs, on the final code

The last change of code is commit `50bd2516db`; the commits after it change the specification's text and one test file.

- `ant testSystem`, on the tree of `50bd2516db` before its commit: 'Tests run: 209', 'Tests run: 210', 'Tests run: 206', 'Tests run: 200', each with 'Failures: 0, Errors: 0'; 'BUILD SUCCESSFUL', 'Total time: 4 minutes 44 seconds'. The four shards sum to 825, the last landed gate's 822 and the three new walk tests.
- `ant testQuick`, on `d896c5bdf1`: 'Tests run: 86, Failures: 0, Errors: 0' (library), 'Tests run: 263, Failures: 0, Errors: 0' (othercompiler), 'Tests run: 1530, Failures: 0, Errors: 0' (compiler; the last landed gate's 1525 and five new cases); 'BUILD SUCCESSFUL', 'Total time: 7 minutes 44 seconds'.
- `ant testOnly -DtestPattern=NumeralCoercionFoldJUTest`: 'Tests run: 10, Failures: 0, Errors: 0, Skipped: 0', 'BUILD SUCCESSFUL'.
- `harness-one.sh tmp/rung-numeral-leftovers/h1 ProjectFortress/tests/NumeralLeftOfRR32Walk.fss`, after its three added assertions: 'PASS', 'OK (1 test)'.
- The atomic runs of `gate.md`, with the two new programs added and a run at one thread after each program's three at four: 64 lines, each 'PASS', none 'FAIL', 'NO-PASS', 'COMPILE-FAILED' or 'TIMEOUT-TWICE'; among them '# atomic NumeralCoercionSpawnCompiled run1 threads=4 PASS', '# atomic NumeralCoercionSpawnImported run3 threads=4 PASS', '# atomic NumeralCoercionSpawnImported run threads=1 PASS', '# atomic FirstLoadThreadsRungG run2 threads=4 PASS'.
- Row 979's program after its repair, `FORTRESS_THREADS=4 timeout 8 ../bin/fortress run NumeralCoercionSpawnImported`, twelve runs: '12 REACHED PASS exit=0'.
- microGPT's quick checks under walk, `explorations/coordinator/tools/mg-run.sh tmp/rung-numeral-leftovers/mg n-final 1`: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', 'rc=0', for both programs. No model line changed.
- The 52 team demos, `bash tmp/run-demos.sh tmp/demos`: 'demos: 52 run, 52 reached their end', on the tree of `7b13e86f83`.
- The specification: `./ant genSource` and `./ant tex` both 'BUILD SUCCESSFUL'; the count of unresolved references, multiply defined labels and undefined control sequences in `fortress.log` is 0.

The suites do not check the round trip of walk's caches or a behaviour above one thread that one run at four threads does not hit (`tests-running.md`); for the class loader and the pool the atomic runs and the twelve runs above are the further check.

## 4. Where the fix belongs, and the precedent search

- **The two coercions.** The prelude's number types take a numeral by a coercion in the trait's body (`CompilerBuiltin.fss`); the five other sites of the same declaration over `NaturalNumeral` in that file are `ZZ` (`:517`), `ZZ64` (`:578`), `ZZ32` (`:663`), `NN32` (`:754`) and `NN64` (`:819`). The body follows the one library's (`Library/FortressLibrary.fss:389`) through the native that the prelude's radix-point coercion binds (`CompilerBuiltin.fss:895`).
- **The root task.** `explorations/coordinator/map/modules-and-phases.md`, B.11, puts the start of a compiled program in `MainWrapper.main` and the pool in `FortressExecutable`. The record's review (`explorations/coordinator/climb-batch-30-review.md:56-136`) gives the three facts the place rests on: two copies of the run time's classes, the current task that a task's constructor reads (`runtimeSystem/BaseTask.java:83-91`), and the hang on a pool of four threads.
- **The imported components.** A component's class is initialized by the JVM at its first use, which no code of the tree sees; the only place that can initialize it earlier is the start, and the only code that knows where a component's classes are is the class loader, which reads them as resources (`InstantiatingClassloader.java:138-160`). The bytecode cache is on the class path jar by jar (`bin/run_classpath`), and a component's jar has its name.
- **Walk.** `interpreter.md`, "Where a fix of walk belongs": walk converts at dispatch in `OverloadedFunction.bestMatchWithCoercion`, and its numerals are `Numerals.java`; its load checks are in `BuildEnvironments`, called from `Driver.evalComponent`.
- **Rows read.** `ledger.py show` for 442, 971, 979, 958, 967, 974, 960 and 973; row 973 and its test `XXXNumeralEqualsNumberWalk.fss` are untouched, and so is `XXXNotEqualNumeral.fss` (row 966).
- **Competing declarations.** Each Java name added (`initializeInRootTask`, `componentClasses`, `topLevelName`, `componentJar`, `infiniteAt`, `rr32Type`, `mostSpecificThroughOthers`, `checkNumeralTypesWritten`, `refuseNumeralType`) is in the files that declare and call it only (`grep -rlw` over `ProjectFortress/src/com/sun/fortress`); each new component name has one `.fss` (and the api one `.fsi`) in the tree (`git ls-files`, `git grep -lw "component NAME"`).

## 5. What the specification settles

- An integer numeral at `RR64` and `RR32` converts by one rounding from its exact value (`literals.tex:189-191`); the compiled path's library now declares it, so the callout at `conversions-coercions.tex:91-93` and the Effect at `changes.tex:5245-5248` say so.
- A numeral that rounds to an infinity at a place that fixes a type is a static error (`literals.tex:209-210`); walk, without static types, refuses it when the place runs (P-12, P-176).
- A numeral type is written only as a parameter type (`literals.tex:274`); walk refuses the two forms that it ran.
- Of the declarations applicable with coercion the one chosen is the one than which no other is more specific ("Coercion Resolution"); the section says that the relation itself is "not necessarily transitive", and walk's reading through other applicable declarations finds that one declaration wherever the relation has no cycle (corrected by the skeptic; SKEPTIC.md, finding 3).
- The specification says nothing of the thread or the task in which a top-level declaration is initialized; `parallelism.tex:89-90` lets an implementation run a group's arms in sequence, which the pool of one thread does while a class initializes.
- It does not say what a numeral with a radix point that rounds to an infinity is where nothing fixes a type (section 12, NEW-N-1).

## 6. Walk's field-numeral code: each piece deleted, each left

Deleted (the review's items 1 to 5):
1. `Numerals.object` and the `Site.object` field.
2. `Coercions.withNumeralObjects`; its call in `OverloadedFunction.bestMatchForNumerals`, whose inner method `bestMatchForNumeralsInternal` is now `bestMatchForNumerals` itself; the `objects` field, the four-argument constructor and the objects path of `CoercedCall.convert`.
3. `Numerals.isNumeralObject`, `fieldValue`, `field`, `intField`, `sameValue` and `fractionDigits`.
4. The numeral case of `FOrdinaryObject.seqv`, with its comment.
5. The class comment of `Numerals`, rewritten to the static numerals; the comment of `Coercions.numeralCoercionFor`, which said that the coercion "receives" the "numeral object", is rewritten with it.

Item 7's two comments of the prelude are rewritten (section 1).

Left, each with its reason:
- `Numerals.numeralType`, which answers null, `Numerals.fitsAsIs` and `numeralKey` (`Numerals.java:292-302`, `:692-695`), with their calls in `Coercions.admits` and `OverloadedFunction.java:2707`: they are the static numerals' own form of "a numeral's type exists only at compile time", they are not on the review's list, and the dispatch key calls one of them.
- `interpreter/glue/prim/IntLiteral.java`, `FloatLiteral.java`, `interpreter/evaluator/values/FIntLiteral.java` and `FFloatLiteral.java`: the team's run-time numeral values, left by plan (the review's section 1).
- The comment at `compiler/codegen/CodeGen.java:6482`: `compiler/codegen/` is outside this rung's files.

## 7. Each program run old against new

- `ProjectFortress/compiler_tests/NumeralCoercionRaisesCompiled.fss`, compiled and run at four threads by `old-fortress.sh /home/user/fortress-base31 tmp/old-caches` and by the tree: both print 'coerce', then 'Exception in thread "main" FortressException: class fortress.CompilerBuiltin$DivisionByZero with string Division by zero', and exit 1. The stacks agree down to 'at java.base/java.lang.Class.forName(Class.java:547)'; below it the old one has 'at com.sun.fortress.runtimeSystem.MainWrapper.main(MainWrapper.java:64)' and the new one 'at com.sun.fortress.runtimeSystem.FortressExecutable$1.compute(FortressExecutable.java:124)' and five frames of the pool's worker. The first line of the error output did not change; the record's fork N1 allowed that it might.
- `ProjectFortress/hello.fss`: both print the same line and exit 0.
- `NumeralCoercionSpawnImported`, `NumeralCoercionSpawnCompiled`, `NumeralNaturalAtFloatCompiled`: the failing runs of section 2 are the old code's, the passing runs of section 3 the new code's.
- A probe of a top-level variable of an imported component whose initializer is an operator over two calls (`total: ZZ32 = part(1) + part(2)`), read by the importing program: six runs at four threads on the old code and six on the new, each 'REACHED PASS'; it did not hang on the old code.

## 8. The sentences of the specification

Changed, each before and after:
1. `Specification/appendices/changes.tex:5245-5248`. Before: "coercions generic over the four numbers from \TYP{NaturalNumeral} at its five integer types and from \TYP{RadixPointNumeral} at \EXP{\mathbb{R}64} and \EXP{\mathbb{R}32}". After: "coercions generic over the four numbers from \TYP{NaturalNumeral} at its five integer types, \EXP{\mathbb{R}64} and \EXP{\mathbb{R}32}, and from \TYP{RadixPointNumeral} at \EXP{\mathbb{R}64} and \EXP{\mathbb{R}32}".
2. `changes.tex:5259-5263`, added after "so a coercion that throws an exception stops the program.": "The compiled program initializes the class of its component, and after it the class of each component that it imports, before the program runs, inside a task on a pool of one thread of its own, so that a coercion whose body spawns a task, as an operator applied to two calls may, fills its place; the tasks that a coercion spawns there run one after another."
3. `changes.tex:5270-5272`. Before: "only when the place is evaluated: one outside an integer type's range, one at a type that declares no coercion". After: "only when the place is evaluated: one outside an integer type's range, one that rounds to an infinity of \EXP{\mathbb{R}64} or \EXP{\mathbb{R}32}, one at a type that declares no coercion".
4. `changes.tex:5277-5280`. Before: "It converts a numeral that rounds to an infinity of \EXP{\mathbb{R}64} or \EXP{\mathbb{R}32} into that infinity with no error (row~967); it converts a numeral at a parameter". After: "It refuses when it loads a program a numeral type written as a type that an object or a trait extends, or as a static argument. It converts a numeral at a parameter".
5. `changes.tex:5299`. Before: "row of the revival's gap ledger: the interpreter runs the operator of \EXP{\mathbb{R}64} where a floating-point numeral stands to the left of an \EXP{\mathbb{R}32} (row~958); the interpreter loads and runs a program that writes a numeral type as a type that an object or a trait extends, or as a static argument (row~974); a numeral with a radix point keeps only one of". After: "row of the revival's gap ledger: a numeral with a radix point keeps only one of".
6. `changes.tex:5306`. Before: "the coercion at each evaluation of the place (row~957); a coercion from a numeral type whose body spawns a task, as an operator applied to two calls may, stops the load of the class that holds the place, which the compiled program loads before it starts its tasks (row~971); where a \KWD{nat} or \KWD{int}". After: "the coercion at each evaluation of the place (row~957); where a \KWD{nat} or \KWD{int}".
7. `changes.tex:2717-2719`. Before: "and the result is an \EXP{\mathbb{R}32}; the interpreter departs where a floating-point numeral stands to the left of the \EXP{\mathbb{R}32}, and runs the operator of \EXP{\mathbb{R}64} (row~958 of the revival's gap ledger); an \EXP{\mathbb{R}32} is converted". After: "and the result is an \EXP{\mathbb{R}32}, on whichever side of the \EXP{\mathbb{R}32} the numeral stands; an \EXP{\mathbb{R}32} is converted".
8. `Specification/basic/conversions-coercions.tex:91-93`. Before: "The compiled path's own library declares no coercion into \EXP{\mathbb{R}64} from an integer type or from \TYP{NaturalNumeral}; there \EXP{\mathbb{Z}32}, \EXP{\mathbb{N}32} and integer numerals convert to \EXP{\mathbb{R}64} only explicitly, and the other integer types not at all." After: "The compiled path's own library declares the coercion into \EXP{\mathbb{R}64} from \TYP{NaturalNumeral} and none from an integer type; there \EXP{\mathbb{Z}32} and \EXP{\mathbb{N}32} convert to \EXP{\mathbb{R}64} only explicitly, and the other integer types not at all."

The clauses of rows 960, 963, 957, 973 and 966 are as they were.

Made false by this change and not named by the section: none found. `grep -n "rounds to an infinity\|to an infinity" -r Specification --include=*.tex` prints `literals.tex:210`, the rule, and the new clause; `grep -n "class initiali\|initialization of the class\|first use\|is loaded"` over `changes.tex` prints `:4312` (row 695), `:5118` and `:5255`, which hold; `literals.tex:281-282`, "applies the coercion at the place's first evaluation and refuses a numeral only there", speaks of a numeral and holds, the load refusal being of a numeral type.

Outside the specification, for the skill writer: `.claude/skills/fortress-repo/references/interpreter.md` lists rows 958, 967 and 974 as departures of walk, `compiler.md` rows 971 and 442's numeral half as traps of the compiled path, and `revival-changes.md`, "Numbers", says "Walk gives `Infinity` for the second (row 967)". Each is false on this branch.

## 9. The stages, the ladder and STAGE_BLIND

The section asks for no stage, and none ran. The files edited, for STAGE_BLIND:

- `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, `CompilerBuiltin.fsi`; `Library/CompilerLibrary.fsi`, `Library/CompilerLibrary.fss` (comments);
- `ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java`, `FortressExecutable.java`, `InstantiatingClassloader.java`;
- `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java`; `interpreter/evaluator/BuildEnvironments.java`; `interpreter/evaluator/values/Numerals.java`, `Coercions.java`, `OverloadedFunction.java`, `FOrdinaryObject.java`;
- `ProjectFortress/src/com/sun/fortress/compiler/desugarer/NumeralCoercionFoldJUTest.java` (a test);
- the tests under `ProjectFortress/compiler_tests/`, `library_tests/` and `tests/`; `Specification/appendices/changes.tex`, `Specification/basic/conversions-coercions.tex`.

Edited beyond the files that the section names: `interpreter/Driver.java` (one line, the call of the load check; the section names "walk's load code for step 7") and `interpreter/evaluator/BuildEnvironments.java` (the check). The count stage and the distance stage read the interpreter's library, which no edit here touches; the prelude's two files are not theirs.

The change's own ladder subset is empty: no program's recorded first error in `explorations/compile-ladder/baseline-2026-09-19/` names what the change touches. `awk -F'\t' '$11 ~ /RR64|RR32|IntLiteral|ExceptionInInitializer|clinit|FortressTaskRunner/'` over its `ladder.tsv` prints seven rows, none of an integer numeral at `RR64` or `RR32` or of a class's initialization (the nearest, `tests/simpleExp.fss`, is 'Right-hand side has type ZZ32, but declared type is RR64', a `ZZ32` value); the same pattern with `NaturalNumeral` over the newest landed `explorations/compile-ladder/climb-batch-29b/gate/ladder/ladder.tsv` prints nothing. So no driver was copied or run; `ant testQuick` ran every compiled test on the change.

## 10. Points to report

1. **The two coercions as written, and their folds.** Section 1, item 1. At the test numerals the fold gives `3.0` (a `double`) for `3` at `RR64`, `16777216.0f` for `16777217` at `RR32`, the `double` of bits 5042042089369253694 and the `float` of bits 1875342472 for `123456789012345678901234567890`, and `0.0` for `0` (`NumeralCoercionFoldJUTest.testRR64FromNatural`, `testRR32FromNatural`). The fold needed no change.
2. **Tests whose verdict or pinned message changed because RR64 and RR32 take an integer numeral.** None: `ant testQuick` has 0 failures with no test edited for it but `library_tests/NumeralFoldFloats.fss:11`, back from `h: RR32 = 16777217.0` to `h: RR32 = 16777217`, as the section asks; its pinned output is unchanged. No line of a team test changed: every test file of the diff was added by the revival (`git log --follow --diff-filter=A` dates each in 2026).
3. **Where the component class is initialized.** Inside a root `BaseTask`, on a `FortressTaskRunnerGroup` of one thread made for it and shut down after, in `FortressExecutable.initializeInRootTask` (`runtimeSystem/FortressExecutable.java:113-141`), reached from `MainWrapper.main` through `icl` (`MainWrapper.java:30-46`, `:95`). No existing test's verdict changed: `ant testQuick`, 0 failures; `NumeralCoercionOnceCompiled` still prints 'coerce', 'coerce', 'start', 'PASS', `NumeralMinusOnceCompiled` 'coerce', 'minus', 'start', 'PASS', `NumeralAcrossComponent` its eight lines, and `NumeralCoercionRaisesCompiled` its pinned lines. `runtimeSystem/BaseTask.java` did not change. `MainWrapper.cachedArgs` is now set before the classes are initialized (`MainWrapper.java:92-94`), where it was set after the main class's load: an imported component's top-level variable may read the arguments as its class is initialized.
4. **Row 979: repaired by the same way.** Section 1, item 2; the failing runs under `timeout` in section 2, the passing ones in section 3. What a program sees that it did not: the class of each imported component is initialized before `run` starts, in the order in which the jars name them, after the main component's; so a side effect of the coercion at a numeral's place in an imported component comes before the program's first output where it came at the component's first use, and one that throws stops the program before `run`. A component that the program imports and whose declarations no class of the program names is not found, and its class is not initialized; a top-level variable's initializer runs at the variable's first use, as before (corrected by the skeptic, whose probes show both; SKEPTIC.md, finding 2). No test of the three compiled tracks changed its verdict for it.
5. **Walk's field-numeral code.** Section 6.
6. **Row 974: built.** The message is the checker's: 'NaturalNumeral cannot be written in a program except as a parameter's type.', or 'RadixPointNumeral ...'. It refuses the two forms of the row; a numeral type as a variable's, a field's or a return type is refused, as before, when a numeral meets it ('Type mismatch binding 3', `tests/NumeralTypeNoValueWalk.test`).
7. **The specification's sentences.** Section 8.
8. **The files, for STAGE_BLIND.** Section 9.
9. **Walk's rule that a declaration that fits a numeral as it is runs before one that converts it.** No step changes it (section 1, item 6).
10. **A model line.** None changed. **A test of rows 973 or 966.** None touched.

## 11. Decisions

1. **The coercions' bodies are the radix-point coercion's native at no digits after the point.** Ways not taken: through `jBigToZZ64(v)` and a `ZZ64`'s conversion, which overflows past 64 bits and rounds twice; a new native. Evidence: `FortressLibrary.fss:389`; `CompilerBuiltin.fss:895`; the 30-digit cases of the test.
2. **What the initialization throws is caught in the task and thrown again, unchanged, on the main thread.** Ways not taken: leaving it to `ForkJoinPool.invoke`, which rethrows a copy made by reflection where the task ran on another thread; printing it in the task. Evidence: the old and the new run of `NumeralCoercionRaisesCompiled` print the same first line (section 7).
3. **Row 979 is repaired by initializing every component class of the program at the start, in the root task.** Ways not taken: (i) the row left open, for a repair that leaves a task unforked while a class initializes, which edits `BaseTask.java`; (ii) initializing a component's class in the class loader when it is first loaded: `InstantiatingClassloader` is not registered as parallel capable, so the JVM holds the loader's monitor through `loadClass`, and a thread of another pool that initialized the class there could load no closure or task class; (iii) only the classes that hold a numeral's place, told by their `\=numeral\%init\%` methods, which keeps the lazy initialization for every other component but makes two rules; (iv) the main class's constant pool alone, which misses a component that only a nested class of the program names. Evidence: 12 of 12 runs pass; `ant testQuick` 0 failures.
4. **The imported components are found by the class names in their jars' constant pools and the jar's own name.** Way not taken: a list that the code generator writes into the class, which edits `compiler/codegen/`, outside this rung's files. Evidence: `bin/run_classpath`; the jar listing of `NumeralCoercionSpawnImportedApi.jar`.
5. **The program's arguments are set before the classes initialize.** Way not taken: left after, where an imported component's top-level variable initialized at the start would read no arguments (`nativeHelpers/programArgs.java:10`).
6. **Row 967's refusal is in `Numerals.inRange`,** beside the integer range, cached for the site and told apart in the dispatch key. Ways not taken: in `convert` or `exactAt`, after dispatch has chosen, which gives another message and leaves the cached choice; in the native, which both paths and both libraries bind. Evidence: `NumeralRoundsToInfinityWalk`, `NumeralFoldedRoundsToInfinityWalk`.
7. **Row 958 is repaired by reading specificity through other applicable declarations, only where no declaration wins directly.** Ways not taken: (a) reading two instances of one generic trait as excluding in `noLessSpecific`, which is row 416's wider change of walk's exclusion; (b) dropping an abstract declaration that an applicable concrete one implements; (c) changing the tie's reading in `bestMatchForNumerals`, which is the reserved rule. Evidence: the probe's three candidates (section 1, item 6); `ant testSystem` 0 failures.
8. **Row 974's check reads every component but the prelude's three, and refuses the two forms only.** Ways not taken: every written form but a parameter's type, as the checker, which would refuse at load what `NumeralTypeNoValueWalk` pins at the place's run; the main component alone, as the comprises check; left until walk runs the checker (fork N3's way not taken). Evidence: fork N3's words, "the two written forms".
9. **Three tests for row 974 and two for row 967.** The promoted `NumeralTypeWrittenWalk` holds both forms, and a load refusal shows only the first; `NumeralTypeExtendedWalk` and `NumeralTypeStaticArgumentWalk` hold one each, and `NumeralFoldedRoundsToInfinityWalk` the folded constant at `RR64`.
10. **`numeralType`, `fitsAsIs` and `numeralKey` are left** (section 6). Way not taken: deleting them with their three call sites, beyond the review's list.
11. **The prelude's two comments are reworded, not deleted:** the reason for the typed `assert` still holds in another form.
12. **Both whole suites ran,** `ant testSystem` for walk's Java and `ant testQuick` because the section's step 8 says that the edits reach every compiled program's start and the points ask for each test whose verdict changed. Way not taken: the runtime's edit left to the gate (`tests-running.md`).
13. **NEW-N-1 has a ledger row and no test** (section 12).
14. **One sentence on the classes' initialization is added to the Effect,** in place of row 971's clause, since the Effect says where a place's coercion runs.

No decision of the curator covers decision 3's choice among its ways beyond fork N1's and step 2's words, which it follows; decision 7's reading follows the specification's "Coercion Resolution".

## 12. Defects, each with its home

1. Row 442's numeral half, an integer numeral refused at the prelude's `RR64` and `RR32`: home 1, `compiler_tests/NumeralNaturalAtFloatCompiled`, `library_tests/NumeralFoldFloats`, `NumeralCoercionFoldJUTest`.
2. Row 971: home 1, `compiler_tests/NumeralCoercionSpawnCompiled`.
3. Row 979: home 1, `compiler_tests/NumeralCoercionSpawnImported`.
4. Row 967: home 1, `tests/NumeralRoundsToInfinityWalk`, `tests/NumeralFoldedRoundsToInfinityWalk`.
5. Row 958: home 1, `tests/NumeralLeftOfRR32Walk`. Its note's mechanism was wrong (section 1, item 6).
6. Row 974: home 1, `tests/NumeralTypeWrittenWalk`, `NumeralTypeExtendedWalk`, `NumeralTypeStaticArgumentWalk`.
7. Row 960: home 2, the expected failure `tests/XXXRadixPointLeadingZerosWalk.fss`, rewritten; its repair is rung C's.
8. NEW-N-1: a numeral with a radix point that no place types and that rounds to an infinity at `RR64` is `Infinity` on both paths, with no error. Probe, at `7b13e86f83`: a program whose `run` binds `x = 1797...680.0`, 309 digits before the point, and prints it; `bin/fortress PInf.fss` prints 'Infinity', and `bin/fortress compile PInf.fss` then `bin/fortress run PInf` print 'Infinity'. The text is silent on it. Home 3, a ledger row; no test, since a test would pin `Infinity` as the answer, which only the curator's word on the open question makes right or wrong, and both paths agree today.

## 13. Commands worked out

- The JVM's stack of a hung compiled run: `jstack <pid>` of the `MainWrapper` process, with the JDK's `bin` on the path.
- The classes of a compiled component: `unzip -o -q default_repository/caches/bytecode_cache/<Component>.jar` into a scratch folder, then `javap -p -c -constants <Component>.class`, with `JAVA_TOOL_OPTIONS` unset.
- A hang seen through the harness without stopping the session: `ONE_JVM=1 timeout 60 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests <X>.test`; exit 124 is the hang.

## 14. Questions for the curator

1. Whether the classes of the components that a compiled program imports are to be initialized before `run` starts, as this branch does and as walk does, or at their first use as the JVM did; the second leaves row 979 to a repair in `BaseTask`.
2. Whether a numeral with a radix point that rounds to an infinity where nothing fixes a type is refused (NEW-N-1).
3. Whether walk is to refuse at load the other written forms of a numeral type, a variable's, a field's and a return type, which it refuses today only when a numeral meets them.
