# Cold read: record-landing/clean.txt

Read with only `CLAUDE.md`, the `fortress-repo` skill's core and its allowed references (`compiler.md`, `interpreter.md`, `library.md`, `build-and-caches.md`, `records.md`, `tests-running.md`, `tests-writing.md`). Twelve entries: eleven facts, one position.

## 1. F-34 (fact)

**Established:** Under the one library (`FORTRESS_LIBRARY=one`), the code generator refuses no declaration of the fourteen components that the distance stage checks: the measure script reports 0 refused and 754 emitted, with no component failing. A test, `one_library_tests/OneLibraryComponents.test`, compiles all fourteen to jars at the start of the onelibrary track in every gate, so a declaration that the code generator refuses would turn the gate red.

**Conditions:** Measured once on code `f3439cf7ce`, under `FORTRESS_LIBRARY=one`, with the measure's patch not applied (it no longer applies whole). The result equals one taken on `285efad802` with the patch. The measure runs in the distance stage's setting (F-53). Limits: the script skips dispatch methods, so it never reaches `String`'s two calls with a type assumption at one argument (`Library/String.fss:67`, `:69`); a real compile of `String` under the selection is clean, and both calls run the `(String, String)` declaration's body (F-325). A declaration is counted only at its first wall. The script runs none of the classes it emits, so it cannot see a class that fails to load or fails the verifier (rows 1091, 1099).

**Consequence:** A worker can take it that every declaration of the fourteen emits bytecode against the one library, and that the gate guards this through `OneLibraryComponents.test`. A worker cannot conclude that the emitted classes load, verify or run: rows 1091 and 1099 stand between the jars and a run. To measure again, run `FORTRESS_LIBRARY=one explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`.

**Evidence:** One run of the measure script on each of the two codes; `OneLibraryComponents.test` (`OneLibraryJUTest.java:44`); detail in `compile-ladder/rung-first-run-one-library/REPORT.md`, `compile-ladder/plan-34/probes/measure-285efad802.txt`, `compile-ladder/plan-31/PROBES.md` section 3.

**Could not resolve:**
- "the checker's failures caught per declaration, and the bound `Any`": unclear wording. I cannot tell what "the bound `Any`" is the bound of (unbounded type parameters? static arguments of extended generic traits?), and whether "failures caught per declaration" means the checker goes on past a failing declaration. The entry leans on F-53 for it, which a cold reader does not have.
- "the measure's patch": the entry never says what the patch changes, so I cannot tell why the result is the same with and without it, or whether "goes on without it" means none of it or only the hunks that apply.
- "The count's check": unclear wording. "count" here means the measure's count of refused declarations, but the skill gives "count stage" and "checker count" another meaning (the checker's error total on `FortressLibrary`), so it reads two ways.
- "A declaration counts at its first wall, and some hold a second": unclear wording. With 0 refused, I cannot tell which declarations "hold a second" wall, or whether this is a warning about earlier counts.
- "both calls call the body of the `(String, String)` declaration": I cannot tell whether that is the right result (the checker's choice at the assumed types) or a departure.

## 2. F-336 (fact)

**Established:** When a compiled helper raises an exception, `Utility.makeFortressException(name, msg)` (and its `(name, e)` form, which goes through it) builds the exception of whichever library is in use. It turns the simple name the helper passes into a class through the `LibraryNames` that comes first on the class path (the prelude's class, or under the selection the one library's), and calls that class's constructor over the library's `String` with the message as an `FJavaString`. If the exception has no such constructor, as the one library's `IOFailure` and `FileNotFoundException`, it uses the constructor without parameters, and the message is lost. Each raise makes a new instance, not the exception's singleton object (row 1103). So these exceptions reach a `catch` on the compiled path.

**Conditions:** Compiled path, either library. Limits: no message for an exception without a `String` constructor; the caught value is a fresh instance, not the object (row 1103). Under walk the helper's raise becomes the library's object of the same name, without the message (F-299).

**Consequence:** A helper can raise by simple name and a compiled `catch` in a program sees it, against either library. A worker must not rely on the message for `IOFailure` or `FileNotFoundException` under the one library, nor on the caught value being the exception's object (identity), nor on any message under walk.

**Evidence:** `compiler/runtimeValues/Utility.java:34-52`; tests `compiler_tests/HelperRaiseMessageCompiled`, `one_library_tests/OneLibraryCatchHelperRaises.test`; detail in `compile-ladder/rung-runtime-threads/REPORT.md` section 1 and `compile-ladder/rung-first-run-one-library/REPORT.md`.

**Could not resolve:**
- "the name that the class path's `LibraryNames` gives the helper's simple name": unclear wording. "the helper's simple name" reads first as the helper method's own name; I take it to mean the exception's simple name that the helper passes.
- "`(name, e)`": I cannot tell what `e` is (a Java exception whose message becomes the message?).
- "So `FailCalled`, `FileNotFoundException` and `IOFailure` raised by a helper reach a `catch` on the compiled path, as `IntegerOverflow` and `FileNotFoundException` do against the one library": reads two ways. Either the first list is against the prelude and the second against the one library (but then `FileNotFoundException` is in both), or all of them hold against both libraries. The library of the first list is not named.
- Conflict with the skill: `interpreter.md`, "Natives", says a helper raises with the string `fortress.CompilerBuiltin$DivisionByZero`, naming the prelude's class. This entry (and F-353, F-24, F-312) says a helper raises by simple name. The entry reads as the newer state; a worker following the skill would write the old form.

## 3. F-353 (fact)

**Established:** A probe in a scratch tree showed that one build can serve the compiled path with either library. The prelude's thirteen run-time value classes stay as they are; a second set of classes with the same names, in a second class folder that the class path puts first, serves the one library. One JVM serves one library, chosen by one environment variable at both compile and run.

**Conditions:** Only in the scratch tree of F-352, whose hacks (nine of them behind the selector) did not land, and no test holds its runs. There: the one-line program ran against both libraries, and the `Array1` program and the dot loop against the one library, by hand and through `fortress junit`; a sample of 137 of 876 `compiler_tests` files showed nothing disturbed, but the whole compiled tracks and walk were not run. There the second set's sources equalled the first's under a map of eight names. There, the classes linking against a prelude class by name were the thirteen plus `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector` and `FStringVector`; every other mention of the prelude was a string (105 of them raise strings). On `main`: a raise string names the exception by simple name (F-336); `main` has its own selector (F-381) and builds its own second set by the same mechanism (F-396); its seven number types need no second set, because their payload classes over `FValue` serve both libraries' object classes (F-388), except for the `asString` bridge typed at the prelude's `String` (row 1101).

**Consequence:** The design is evidence for the two-set mechanism, not a gated result. A worker must not cite the scratch tree's runs as tested, and must look to F-381 and F-396 for what `main` builds. On `main`, a compiled generic that calls `asString` on a number type parameter still departs (row 1101).

**Evidence:** Runs by hand in the scratch tree; the sample of 137 tests; constant pools read in `ProjectFortress/build`; detail in `compile-ladder/plan-31/probes/probe-y.md` sections 1, 2 and 5.

**Could not resolve:**
- "the one-line program", "the `Array1` program" and "the dot loop": I cannot tell which programs these are; the entry names no file.
- "the prelude's thirteen run-time value classes": the thirteen are not listed, so I cannot tell which classes a second set must copy.
- "the classes of the build that link against a prelude class by name are the thirteen, `FValue`, ... and `FStringVector`": reads two ways at first (an appositive listing the thirteen, or the thirteen plus six); the count makes it the second. Then unclear: do those six also need a second copy, or only the thirteen?
- "under a map of eight names": I cannot tell which eight names.
- "but for the `asString` bridge": unclear wording; I read "but for" as "except for", but it can be read as "but [a second set is needed] for".
- "There ... There ... There": I could follow that each "There" means the scratch tree, but the switch to `main` mid-entry is easy to miss.

## 4. F-381 (fact)

**Established:** `fortress compile` reads the one library when `FORTRESS_LIBRARY=one` (or `-Dfortress.library=one`) selects it, keeps its caches in `default_repository/caches-one`, and its tests run in `testFast`'s onelibrary track. The selection is read once per JVM (`ProjectProperties.compiledPathUsesOneLibrary`); `Shell.useCompilerLibraries()` follows it; the two class path scripts follow only the environment variable. Unset, commands read the prelude as before. A program compiled under the selection can run against the one library's jars, as a program printing one line of text does.

**Conditions:** One selection per JVM. The class path scripts ignore the property, so the property alone leaves the run looking in the wrong caches (as `build-and-caches.md` also says). A run needs the one library's jars, which the onelibrary track compiles first (F-396). "Can run" holds for some programs only; F-396 lists the departures.

**Consequence:** Set the environment variable, not only the property. Put a test whose program compiles against the one library in `one_library_tests/`; `ant testOneLibrary` and `ant testFast` run it. A run test there is possible now (`OneLibraryRunHello.test`).

**Evidence:** Tests `OneLibraryHalf.test`, `OneLibraryPrintBig.test`, `OneLibraryRunHello.test`, `XXXOneLibraryRunHalf.test`; detail in `compile-ladder/rung-library-selector/REPORT.md` and `compile-ladder/rung-first-run-one-library/REPORT.md`.

**Could not resolve:**
- "Unset, every command reads the prelude as before": unclear wording. Walk and `test` read the interpreter's library, not the prelude (`compiler.md`, "The `fortress` commands"); I take "every command" to mean every compiled-path command.
- Conflict with the skill: `SKILL.md` ("a program compiled so does not run yet"), `build-and-caches.md` ("No compile writes the one library's jars yet", row 1062) and `tests-writing.md` ("Give a plain test there a `compile` command only") all say a program compiled under the selection cannot run. This entry and F-396 say it can. A worker cannot tell from the entry alone which to follow when writing a `one_library_tests/` test.

## 5. F-388 (fact)

**Established:** The compiler's prelude declares `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64` as `value object`s in `CompilerBuiltin`. The code generator writes each object's class as a subclass of the abstract payload class `compiler/runtimeValues/F<T>`, which holds the JVM value. Descriptors, stamped instances and the RTTI's `className()` name the type by the payload class, while the RTTI's class stays the object's, so the number type still lies below its traits at run time. A dotted call casts its receiver to the object's class. `F<T>.make` reaches the object class's `make` through the name `LibraryNames` gives; under the selection the code generator writes the one library's seven objects over the same payload classes, named by the second set's `LibraryNames`.

**Conditions:** Both libraries (prelude by default, the one library under the selection, F-396). Consequences of the types being objects: a program's object that extends a number type is refused at compile; an overload at `ZZ32` beside one at a program's trait is valid (they exclude each other); a `typecase` clause at such a trait over a number is refused as unreachable (row 1081); a number type named as a value does not compile (row 1082).

**Consequence:** Do not extend a number type in a program; do not write a `typecase` clause at a trait the number type does not extend; overloading a number type against a program's own trait is allowed. In a `VerifyError` or descriptor, expect `FZZ32` and the like, not the object's class.

**Evidence:** Tests `compiler_tests/NumberObjectsCompiled.test`, `XXXNumberTypeExtendRefusedCompiled.test`, `ComprisesMeetGenericTrait.test`; detail in `compile-ladder/rung-number-payload-objects/REPORT.md` and `compile-ladder/rung-first-run-one-library/REPORT.md`.

**Could not resolve:**
- "stamped instances": a term I lack and could not find in the skill. I guess the classes the class loader makes from a generic template with its static arguments put in (`SKILL.md`, "The compiled runtime"), but the skill never calls them "stamped".
- "the RTTI", "the RTTI's class": a term I lack (run-time type information object?); the skill does not define it, so I cannot tell what "the RTTI's class stays the object's" changes in practice.
- "`compiler_tests/XXXNumberTypeExtendRefusedCompiled.test`": reads two ways. An `XXX` prefix marks an expected failure, so this may be the refusal tested as a failing compile, or a deferred defect where the refusal is missing. The entry says the extension "is refused", which matches the first reading only.

## 6. F-390 (fact)

**Established:** The code generator passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]` of the library in use: one JVM parameter after the plain ones (`NamingCzar.varargsParamType`). The array is made at the call, or in a dispatch method's branch where another declaration of the name takes as many arguments, and is filled in order with `init`, as walk does (`CodeGen.evalVarargsArgs`, `emitVarargsArray`). A single argument of tuple type passes its elements. A call reaches the declaration by the specification's expansion rule (`OverloadSet.VarargsExpansion`). Against the prelude, which declares no `ImmutableArray`, the code generator refuses a varargs declaration.

**Conditions:** Under the selection only. Even there: the code generator stops on a varargs method, or a varargs function with static parameters, beside another declaration of its name with as many parameters (row 1086); a spread argument `f(1, ys...)` is dropped without a message on both paths (row 1085). The library's varargs declarations that a program reaches, such as `println` and `assert`, compile. With the verifier off, the array reads back its elements; with it on, the array's class does not load because it holds `ImmutableArray1`'s `copy` twice (row 1091). So no program that calls a varargs declaration runs yet.

**Consequence:** Do not write a compiled program that calls a varargs declaration and expects it to run, under either library. Give a varargs declaration its own name; pass elements, not a spread. Against the prelude, a varargs parameter is a wall.

**Evidence:** The five `one_library_tests/OneLibraryVarargs*.test`, `XXXOneLibraryRunVarargs.test`; the prelude's `compiler_tests/XXXVarargsCodeGeneration.test` and `XXXVarargsMethodCodeGeneration.test`; detail in `compile-ladder/rung-varargs/REPORT.md`, `compile-ladder/rung-first-run-one-library/REPORT.md`, `reviews/batch-33b-review.md` section 2.

**Could not resolve:**
- "since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388)": unclear wording. I cannot see why that explains the array reading back its elements with the verifier off.
- "such as `println` and `assert`" against "no program that calls a varargs declaration runs yet": reads as a contradiction with F-381 and F-396, where a program printing a line (`Hello`) runs with the verifier on. I resolve it only by guessing that `println` of one string reaches a declaration without varargs; the entry does not say which `println` calls reach the varargs declaration.
- "the specification's expansion rule": a language concept I lack in detail and could not find in the skill; I take it to be the rule that expands a varargs domain to the call's arity.
- "in a dispatch method's branch where another declaration of the name takes as many arguments": I could not tell why the array is made in the branch only in that case, nor how this sits beside row 1086 (a stop beside a declaration "with as many parameters").

## 7. F-396 (fact)

**Established:** The one library compiles to jars and runs on the compiled path. Under `FORTRESS_LIBRARY=one` the onelibrary track first compiles the one library's fourteen components in one `.test` (`OneLibraryJUTest.java:44`), and a program compiled against them runs with the verifier on, as `Hello` does. The run-time classes that name a library's types exist in two sets under one set of names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one` by `ant compileAll`, for the one library; the class path puts the second first under the selection. The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes are written over payload classes (`NamingCzar.java:637-655`); all are value objects except `FlatString`, a reference object. A helper raises by simple name, which each set's `LibraryNames` maps to its library's class.

**Conditions:** Against the one library the compiled path still departs from walk at: a varargs call (row 1091); a reduction over a range (row 1099); `println` of a number or a boolean (row 1098); `=` of two strings or two booleans and `<` of two strings (row 994); `u.asString` in a generic body at `U extends ZZ32` (row 1101); the report of an uncaught exception (row 1102); a caught exception raised by a helper, which is not the exception's object (row 1103). The library's compile depends on what its JVM compiled before (row 1100), which is why the track compiles it first.

**Consequence:** A run test against the one library is possible, but a worker must avoid the listed constructs or record them as `XXX` tests at their rows. A Java edit to a run-time class that names a library's type may need its twin in `src-one`. Do not move the library's compile later in the track.

**Evidence:** Tests `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`; detail in `compile-ladder/rung-first-run-one-library/REPORT.md`.

**Could not resolve:**
- "which the export rule decides as much as the code generator": a term I lack. The skill has an "export check", not an "export rule", and I cannot tell how exporting decides what `println` of a number does.
- "The run time's classes that name a library's types": the entry does not list them, so I cannot tell which Java files have a twin in `src-one` and must be edited in pairs. (F-353 lists the scratch tree's, not `main`'s.)
- "departs from walk, each at a row": the entry does not say how each departs (wrong value, crash, refusal), so a worker must read every row.
- Conflict with the skill, as at F-381: `build-and-caches.md` says no compile writes the one library's jars yet (row 1062); this entry says the onelibrary track does.

## 8. F-24 (fact)

**Established:** Under walk, a native can raise a Fortress exception that a Fortress `catch` sees: it throws a `FortressError` holding the exception's object, as `ZZ32.overflow()` does for `IntegerOverflow`. A native bound to a helper of `nativeHelpers/` that raises by simple name, such as `DivisionByZero`, raises the interpreter library's own exception, because walk reads the simple name out of the class name that `LibraryNames` gives. So `DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raise `DivisionByZero`. Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes.

**Conditions:** Walk only. A glue class raises through `FortressError`; a helper through a simple-name raise. Other Java exceptions end the run.

**Consequence:** A worker writing a native that must raise a catchable exception uses one of these two ways; a test must not expect a `catch` to take any other Java exception from a native.

**Evidence:** The `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`; `tests/NativeHelperRaiseWalk.fss`; for each of the five types `tests/<type>DivisionByZeroWalk.fss` and `tests/<type>RemainderByZeroWalk.fss`; F-132, row 347 (fixed); detail in `compile-ladder/rung-int-semantics-walk/REPORT.md` section 4.1.

**Could not resolve:**
- "since walk reads the name in the class name that the class path's `LibraryNames` gives it": unclear wording. "it" can be the helper or the simple name, and I cannot tell whether walk loads that class or only strips the simple name from the string. The skill (`interpreter.md`) says the prelude's class does not load under walk and the object of the same name is raised in its place, which is the reading I took.
- "`ProgramError`": not in the skill; I take it to be a walk error that ends the run, as `interpreter.md` says of such exceptions.

## 9. F-312 (fact)

**Established:** The ten `REM` and `MOD` bindings on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` (`Library/FortressLibrary.fss:910-913`, `:1022-1025`, `:1130-1133`, `:1248-1251`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:328-331`) now name helpers of `nativeHelpers/`, not glue classes: `simpleIntArith.intRem`/`intMod`, `simpleLongArith.longRem`/`longMod`, `simpleUnsignedIntArith.unsignedIntRem`/`unsignedIntMod`, `simpleUnsignedLongArith.unsignedLongRem`/`unsignedLongMod` (through the transfers of F-308), and `simpleArbitraryPrecisionArith.rem`/`mod`. `REM` is the remainder of the truncating division; `MOD` the remainder of the floor division, with the divisor's sign; on the natural numbers `MOD` equals `REM`. A zero divisor raises `DivisionByZero` by simple name, which `LibraryNames` maps to the compiled library's class, and walk raises the library's `DivisionByZero`.

**Conditions:** Both paths run the helpers. The new results match the old glue code on 626 printed pairs.

**Consequence:** A worker can rely on these semantics for `REM` and `MOD` on both paths, and on `DivisionByZero` being catchable at a zero divisor. For `NN32` and `NN64`, the transfers mean the checker accepts any helper (`compiler.md`, "Natives"), so test unsigned values above 2^31 and 2^63 if the binding changes.

**Evidence:** Tests `tests/ZZ32RemainderByZeroWalk`, `ZZ64RemainderByZeroWalk`, `NN32RemainderByZeroWalk`, `NN64RemainderByZeroWalk`, `ZZRemainderByZeroWalk`, `NativeHelperFamilyRemainderWalk`; `compiler_tests/NativeHelperFamilyRemainderCompiled`; 626 printed pairs; detail in `compile-ladder/rung-natives-remainders/REPORT.md`.

**Could not resolve:**
- "626 printed pairs are the old code's": unclear wording. I cannot tell what a pair is (an operand pair and its result? a `REM`/`MOD` pair?), or which program printed them.
- "keep every value the glue classes gave": "every" reads as a claim over all inputs, while the evidence is 626 pairs. I cannot tell whether "every" is that claim or only the sample.
- "on both paths": reads two ways. The library's bindings run on the compiled path only under the selection; the compiled test binds the helpers in its own declarations (`compiler.md`, "Natives"). I cannot tell whether "on both paths" means the library's bindings reach the compiled path, or only that the helpers run on both.
- The title says the helpers "throw `DivisionByZero` at a zero divisor" for `MOD` as well as `REM`, but every test listed is a "RemainderByZero" test; I cannot tell whether `MOD` by zero has its own test.

## 10. F-332 (fact)

**Established:** Walk carries `FortressLibrary`'s trait `JavaBufferedReader` in the Java class `FortressBufferedReader`. `FileReadStream`, `Reader`, `stdIn` and `FileWriteStream` are plain Fortress objects over the Java-backed traits `JavaBufferedReader` and `JavaBufferedWriter`, each holding its Java-backed value in its field `under`. The reader trait's eight methods and its two factories (over a file name, and for standard input) are natives on `nativeHelpers/fileOps` (`Library/FortressLibrary.fss:2083-2103`); walk's loader carries the trait by name through `FortressBuiltin`'s private native object `JavaBufferedReaderObject` (`interpreter/glue/StaticNativeApp.java:71`). `File` and `Reader` are plain components. `uncheckedReadChar` answers -1 at the end by the reader's `eof`, because `jbrRead` answers 0 there. `FileWriteStream` is a `WriteStream` with its `flush`. A missing file raises `FileNotFoundException`; a read after `consume` raises `IOFailure`; a `catch` sees each on both paths (F-336).

**Conditions:** Both paths for the raises (the compiled one under the selection, I infer). Per F-336, under the one library these two exceptions carry no message on the compiled path, and none under walk.

**Consequence:** Treat these streams as ordinary Fortress objects; reach their Java value through `under`; a program can catch `FileNotFoundException` and `IOFailure` from them. Do not rely on `jbrRead`'s 0 as end of input: use `eof`.

**Evidence:** Tests `tests/NativeHelperReaderWalk`, `compiler_tests/NativeHelperFamilyReaderCompiled`, `compiler_tests/FileOpsRaiseCaughtCompiled`; F-299 counts the bindings; detail in `compile-ladder/rung-io-reader/REPORT.md`.

**Could not resolve:**
- "`Reader`" appears as a plain Fortress object and as a plain component: reads two ways. I cannot tell whether the component `Reader` declares an object `Reader`, or the word means one of them in each place.
- "A `catch` sees each on both paths": the compiled path reaches `FortressLibrary`'s streams only under the selection, but `compiler_tests/FileOpsRaiseCaughtCompiled` is in the prelude's folder. I cannot tell which library the compiled half of the claim was shown against.

## 11. F-301 (fact)

**Established:** On the compiled path, a native helper is called through a generated wrapper over the box classes. A `builtinPrimitive("pkg.Class.method")` binding and a written `import java` alias compile to the same bytes: an `invokestatic` of `native.pkg.Class.method`, a class written into `nativewrapper_cache/`, which unboxes each argument with `getValue`, calls the helper, and boxes the result with `make`, a new box each time (`compiler/nativeInterface/FortressMethodAdapter.java:303-327`; `compiler/runtimeValues/FZZ32.java:40-48`, where `make` now calls the library's value object's `make` through a method handle, F-388). When the number types were traits, `ZZ32`'s `+` reached the wrapper through the dispatcher, an interface call, the springboard and the trait's static body; once the loop was hot, C2 inlined all of it, and escape analysis removed every temporary box, leaving one box per assignment to a mutable variable per iteration (16 bytes for a `ZZ32`, 24 for an `RR64`). The library's form and the prelude's allocated the same.

**Conditions:** The cost claim was observed once, while the prelude declared the number types as traits, not since they became value objects (and so not since `make` goes through a method handle); on one small program, `perf-probes/helper-calls/HelperCalls.fss`; by `javap`, C2's inlining log and JFR's allocation bytes; with no timing; on a machine at a load of 20 to 25. No test checks it.

**Consequence:** A worker can take the wrapper's shape (the bytes) as current. A worker must not take "the call costs nothing of its own" as holding today: it needs to be measured again on the value-object code before anything rests on it. Allocation per mutable assignment is the cost to expect.

**Evidence:** `javap`, C2's inlining log and JFR's byte counts on `HelperCalls.fss`, once; the cited source lines; detail in `perf-probes/helper-calls/REPORT.md` sections 2 to 5.

**Could not resolve:**
- "the springboard": a term I lack and could not find in the skill; I cannot tell what frame it is.
- "The library's form and the prelude's allocate the same": reads two ways. "form" may mean the two ways of binding (`builtinPrimitive` against a written `import java`), or the interpreter's library against the compiler's prelude.
- The title is in the present tense ("costs nothing"), while the conditions say the observation predates the value-object change; I cannot tell whether the title is meant to hold now or only for the old code.

## 12. P-164 (position)

**Decided:** The five I/O objects (`Writer`, `BufferedWriter`, `FileWriteStream`, `FileReadStream` and `Reader`) become plain Fortress objects, each holding a Java-backed value in a field, typed by one of two traits that `FortressLibrary` declares, `JavaBufferedWriter` and `JavaBufferedReader`. The traits take the compiler prelude's names and methods. Each trait method is a public native binding, in P-58's form, on a helper of `nativeHelpers/fileOps`: 17 bindings, 14 on existing helpers and 3 on new helpers for standard output, standard error and standard input, with factories over a file name and for each standard stream. Walk's loader carries the traits by name as the Java classes `FortressBufferedWriter` and `FortressBufferedReader`, through a private native object below each trait; the checker's walk-world foreign-type table in `compiler/NamingCzar.java` holds the two entries, since the checker reads the whole helper class a binding names. `stdOut` stays a `Writer`, in UTF-8. The 36 glue bindings go. Under the one library, and so at the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, the boxed-type table's two entries name the one library's types, and `fileOps`' raise strings name exceptions by simple name. No model line changes.

**Applies:** The library's file and standard streams, on walk now and on the compiled path under the selection and after the switch-over. It does not apply to natives that no bare helper reaches: those keep P-162's pair pattern. Why: it is the team's later shape for a file stream (as `BirdyLib`'s `FileReadStream`), it follows the library's pattern for a type both paths name that holds a Java value, and it maps one Java type to one Fortress type to one run-time class, as the checker's table requires.

**Requires:** Keep the streams as plain objects over a Java-backed field; bind trait methods only to `fileOps` helpers, not glue classes; keep the two foreign-type table entries; keep `stdOut` a UTF-8 `Writer`; raise from `fileOps` by simple name; change no model line.

**Unfinished:** The entry does not say. F-332 says the reader side is built on walk, and F-336 that the raises reach a compiled `catch`; whether `FJavaBufferedWriter` and `FJavaBufferedReader` already implement the one library's traits, and whether the boxed-type table names its types, I cannot tell from the position.

**Could not resolve:**
- "each over a Java-backed value in a field, of two traits": unclear wording. "of two traits" can attach to the objects (they extend the traits) or to the value (the field has a trait's type). F-332 points to the second.
- "P-58's form": I cannot read P-58; I guess the form `builtinPrimitive("com.sun.fortress.nativeHelpers.Class.method")`.
- "P-162's pair pattern" and "a bare helper": terms I lack and could not find in the skill, so I cannot tell which natives the exception covers.
- "walk-world foreign-type table" and "the boxed-type table": terms I lack. I take the first to be the table the count and distance stages use to read a helper's Java types as the interpreter library's types (`compiler.md`, "Natives"), but the second is not in the skill at all.
- "the pattern that the number types leave by P-178": I cannot read P-178; I infer the number types left the trait-with-native-object pattern when they became value objects (F-388), but the entry does not say so.
- "where the other ways leave the compiled half undesigned, decide nothing, or cost a third rung and split the standard output": the other ways are not named, so the reason cannot be checked.
- "The five I/O objects": the title does not name them; I took them from the list in the body, which differs from F-332's list (`FileReadStream`, `Reader`, `stdIn`, `FileWriteStream`).
