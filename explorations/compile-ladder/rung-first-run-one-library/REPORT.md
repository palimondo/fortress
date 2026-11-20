<!-- Rung C of climb batch 34b (rung-first-run-one-library): the first program compiled and run against the one library under the gate: the carriers of its built-in types, a second set of run-time classes, the run time's prelude names, and its fourteen components compiled to jars in the onelibrary track. -->

# Rung C: the first program compiled and run against the one library

- problem: rows 874 and 1062: the code generator refused FortressLibrary, FortressBuiltin and FlatString at their helpers' wrappers, and no program compiled against the one library ran (`explorations/fortress-gap-ledger.md:1036`, `:1077`; the failing runs below)
- spec: none: `grep -rn 'run-time class\|payload' Specification --include=*.tex | grep -v library/apis` prints no passage on how a built-in type is carried; Appendix I's Effects of the varargs entry and of the preface's list name the run (`Specification/appendices/changes.tex:4052-4057`, `:6416-6421`)
- precedent: rung N's payload class (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:22-63`) and its table (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:637-644`); the first set's carrier of a Java value (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FJavaBufferedReader.java:16`); the prelude's component test (`ProjectFortress/compiler_tests/CompilerBuiltinComponent.test:10`)
- deviation: `FValue`'s and `MutableFValue`'s `asString` typed at `FValue` in the second set only, the first set's as on the base, and `FException` in the second set too (`ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/FValue.java:22`); the fourteen compile tests in one `.test`, put first in the onelibrary track (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/OneLibraryJUTest.java:44`); `Utility` falls back to an exception's constructor without parameters (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:46-51`); the carried types' rows entered under the selection only (`NamingCzar.java:612-624`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java`, `compiler/nativeInterface/FortressMethodAdapter.java`, `runtimeSystem/Naming.java`, `compiler/runtimeValues/Utility.java`, `compiler/runtimeValues/FortressBufferedReader.java`, `compiler/runtimeValues/FortressBufferedWriter.java`, `nativeHelpers/fileOps.java`, `nativeHelpers/runtime.java`, `nativeHelpers/simpleArbitraryPrecisionArith.java`, `nativeHelpers/simpleIntArith.java`, `nativeHelpers/simpleLongArith.java`, `nativeHelpers/simpleUnsignedIntArith.java`, `nativeHelpers/simpleUnsignedLongArith.java`, `tests/unit_tests/FileTests.java`, `bin/fortress_classpath`, `build.xml`, `Specification/appendices/changes.tex` (each under `ProjectFortress/src/com/sun/fortress/` where not given whole)

One launch of this role worked the rung. The worktree was seeded from the base build (`seed-worktree.sh`, exit 0). Commits: a977c6cc43 (the tests), 1f8a67251d (the change), f3439cf7ce (the first set's `FValue` as on the base, the second set's three, the track's order); the record files follow.

## What changed and why

Under `FORTRESS_LIBRARY=one` no compile wrote the one library's jars: the wrapper generator found no converter for the one library's `String` at a helper's Java `String` (row 874), and nothing carried its built-in types at run (row 1062). The rung builds the decisions on record: each number type a value object over a payload class (P-178, fork N4), `Boolean`, `Char` and `FlatString` in the same form (fork C1), the reader, the writer and the two stores as classes of the one library's traits (P-164, P-169), and one build for both libraries, the one library's classes in a second folder first on the class path (P-33, F-353, fork C2). From the planner's patch (`explorations/compile-ladder/plan-34/probes/rehearsal-34.patch`) it took by hand the carriers, the tables, the converters, the names and the classes, and none of its stand-ins in the library's text or `OverloadSet.java`.

## The design as built (a point to report)

- **The second set and how the class path chooses it.** `ProjectFortress/src-one` holds `FBoolean`, `FCharacter`, `FJavaString` (payload classes over `boolean`, `int`, `String`), `FJavaBufferedReader`, `FJavaBufferedWriter`, `FJavaArrayStore`, `FJavaRR64ArrayStore` (each over the one library's trait, its Java value in a field), `FValue`, `MutableFValue` and `FException` (the first set's, `asString` typed at `FValue`), `LibraryNames`, and `fortress/FortressLibrary.java`, a stub of the four traits that those classes extend. `ant compileAll` compiles it into `ProjectFortress/build-one` after the first set, and whole again when the first set changed (`build.xml:853-872`); the stamp of the implementation and the sources' fingerprint cover both folders (`build.xml:402`, the two macros), and `ant clean` deletes it. `bin/fortress_classpath:27-39` puts `build-one` before `build` where `FORTRESS_LIBRARY=one`, so the compile, the run (`bin/run_classpath` builds on it) and `junit.sh` pick it; the onelibrary track's JVM takes it by `fastTrack`'s new attribute `classesFirst` (`build.xml:1236-1251`, `:1180`, `:1310`). At a run the jars come first (`bin/run_classpath`), so the stub's classes give way to `FortressLibrary`'s.
- **The payload table's rows** (`NamingCzar.java:637-655`): the prelude's seven as before, and `FortressLibrary`'s `ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`, `FortressBuiltin`'s `NN32`, `RR32`, `Boolean` (payload `Z`), `Char` (`I`), and `FlatString`'s `FlatString` (`Ljava/lang/String;`). A lookup answers only a row of the library that the compile reads, FlatString counted as one of the one library's apis under the selection (`:661-675`).
- **The carried types' rows** (`NamingCzar.java:612-624`): under the selection only, since each row also enters the bare name: `FortressLibrary`'s five numbers, `JavaBufferedReader`, `JavaBufferedWriter`, `JavaArrayStore`, `JavaRR64ArrayStore`, `FortressBuiltin`'s `Char` and `FlatString`'s `FlatString` (`Boolean`, `NN32`, `RR32` are `fortLib`'s rows there). The run's copy is `runtimeSystem/Naming.java:307-322`, keyed by library. A carried parent of an `extends` clause is named by its interface (`NamingCzar.java:911`), for `FortressBuiltin`'s private objects below `JavaArrayStore` and `JavaBufferedReader`.
- **The names that the second set's LibraryNames gives** (`ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/LibraryNames.java`): `fortress.FortressBuiltin$NN32`, `$RR32`, `$Boolean`, `$Char`; `FlatString$FlatString`; `fortress.FortressLibrary$ZZ32`, `$ZZ64`, `$ZZ`, `$NN64`, `$RR64`; an exception `fortress.FortressLibrary$<name>`; the library's String `fortress.FortressLibrary$String`. The first set's copy names the prelude (`fortress.CompilerBuiltin$`, `FailCalled` `fortress.CompilerLibrary$`) and answers no number class where the one library is selected, as before. Both reach a class through `LibraryObjects` (new, first set), the reflection that `LibraryNames` held.
- **The converters** (`compiler/nativeInterface/FortressMethodAdapter.java:77-109`, `:191-198`): a helper's Java `String` at the one library's `String` is cast to `FJavaString` and unwrapped, a result made by `FJavaString.make`; a Java `Object` at `Any` passes as it is, cast to `fortress/AnyType$Any` on the way out; `FJavaArrayStore` and `FJavaRR64ArrayStore` convert as the readers do.
- **The raise strings.** 99 strings name an exception by its simple name: 87 raises and `FAIL_CALLED` (`nativeHelpers/runtime.java:29`) in `nativeHelpers/`, 11 raises in `FortressBufferedReader` and `FortressBufferedWriter`. `Utility.makeFortressException` (`Utility.java:28-69`) maps a simple name through the set's `LibraryNames` (a whole class name passes as it is), looks up the constructor over the library's `String` by name, and for an object without one, as the one library's `IOFailure` and `FileNotFoundException` (`Library/FortressLibrary.fss:2064-2070`), the constructor without parameters. A class not found still raises `FortressImplementationError` with the class name, which walk reads (`interpreter/glue/StaticNativeApp.java:273-282`).
- **Each place that names a prelude class at run.** In the second set: none (`grep -rn 'CompilerBuiltin\|CompilerLibrary' ProjectFortress/src-one` prints nothing). In the first set, which both libraries run: the seven payload classes' `asString` bridges, typed at the prelude's `String` (the bridge of `FZZ32.asString`, `FZZ32.java:27`), and the first set's `LibraryNames` (`PRELUDE_CLASS_PREFIX`). The first set's `FBoolean`, `FCharacter`, `FJavaString`, `FJavaBufferedReader`, `FJavaBufferedWriter`, `FString`, `FZZ32Vector`, `FStringVector`, `FValue`, `MutableFValue` and `FException` are the prelude's own, which the second set shadows.

## The tests: the failing runs on the base, the passing run

The base's code is a1c244be36 (285efad802's code). Each call set up as `build-and-caches.md` says, with `FORTRESS_LIBRARY=one ONE_JVM=1` exported.

Call 1, `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base14 ProjectFortress/one_library_tests OneLibraryComponents.test`:

    Expected failure: the compiles of FortressBuiltin, FlatString and FortressLibrary red, each with 'java.lang.RuntimeException: Can't generate header for method <m> with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String' (floatToString for FortressBuiltin) and 'File <C>.fss has 1 error.', reported as 'Must satisfy FAIL or fail should not appear in output compile' (row 874); the other eleven compiles OK

    . compile ProjectFortress/one_library_tests/../LibraryBuiltin/FortressBuiltin java.lang.RuntimeException: Can't generate header for method floatToString with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String
    File FortressBuiltin.fss has 1 error.
    1) ProjectFortress/one_library_tests/../LibraryBuiltin/FortressBuiltin(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Must satisfy FAIL or fail should not appear in output compile
    Tests run: 14,  Failures: 3,  Errors: 0

FortressLibrary and FlatString failed alike, each naming `floatToString`.

Call 2, `junit.sh basehello ProjectFortress/one_library_tests OneLibraryRunHello.test`:

    Expected failure: OneLibraryRunHello's compile OK, its run red: 'Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String' and 'Failed to satisfy run_out_contains; expected Hello, one library' (row 1062)

    . compile ProjectFortress/one_library_tests/OneLibraryRunHello  OK (time = 1420ms)
    . run ProjectFortress/one_library_tests/OneLibraryRunHello (215ms) Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
    Failed to satisfy run_out_contains; expected
    Hello, one library

Call 3, the three run tests promoted for the run (renamed without `XXX`, checks the walk's output) and the catch test, `junit.sh baseruns ... OneLibraryHalf.test OneLibraryRunHalf.test OneLibraryVarargsCount.test OneLibraryRunVarargs.test OneLibraryConditionalReduction.test OneLibraryRunConditionalReduction.test OneLibraryCatchOverflow.test`:

    Expected failure: the four compiles OK; the four runs (OneLibraryRunHalf, OneLibraryRunVarargs, OneLibraryRunConditionalReduction, OneLibraryCatchOverflow) red, each dying at its first class of the one library, 'java.lang.NoClassDefFoundError: fortress/FortressLibrary...' (row 1062), reported as 'Failed to satisfy run_out_equals' or 'Failed to satisfy run_out_contains; expected PASS'

    . run ProjectFortress/one_library_tests/OneLibraryHalf (175ms) Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
    Failed to satisfy run_out_equals; expected
    Tests run: 8,  Failures: 4,  Errors: 0

The catch test then became `OneLibraryCatchHelperRaises` (a second case, a missing file's `FileNotFoundException`, of the same kind). Its first base run failed another way: the checker refused `makeJavaBufferedReader(name.asFlatString)`, 'FlatString.FlatString->JavaBufferedReader is not applicable to an argument of type String.'; the program now binds the flat string by `typecase`, as `Library/File.fss:18-21` does, and its second base run, `junit.sh baseraises2 ... OneLibraryCatchHelperRaises.test`, failed as expected:

    Expected failure: OneLibraryCatchHelperRaises's compile OK, its run red, dying at its first class of the one library, 'java.lang.NoClassDefFoundError: fortress/FortressLibrary$String' (row 1062), reported as 'Failed to satisfy run_out_contains; expected PASS'

    . compile ProjectFortress/one_library_tests/OneLibraryCatchHelperRaises  OK (time = 2005ms)
    . run ProjectFortress/one_library_tests/OneLibraryCatchHelperRaises (181ms) Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
    Failed to satisfy run_out_contains; expected

Every base run ended before the edit was first built. The passing run is the last run after the last change of code, `ant testFast` on f3439cf7ce, the onelibrary track:

    Tests run: 32, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 311.819 sec
    [junit]  run ProjectFortress/one_library_tests/OneLibraryRunHello (1433ms) Passed
    [junit]  run ProjectFortress/one_library_tests/OneLibraryCatchHelperRaises (1537ms) Passed

The JVM's verifier was on (no flag turns it off in the track).

## The fourteen compiles in the track (a point to report)

Their form: one `.test`, `ProjectFortress/one_library_tests/OneLibraryComponents.test`, `tests=` the fourteen in the probe's order (`lib14.sh`), with `compile`, as `compiler_tests/CompilerBuiltinComponent.test` compiles the prelude; fourteen JUnit cases. The track puts that file first (`FileTests.compilerSuite` with a first file, `FileTests.java:1010-1037`; `OneLibraryJUTest.java:44`), so the fourteen are the first compiles of the track's JVM. Their seconds in `ant testFast` on f3439cf7ce, four tracks at once: AnyType 42.3, FortressBuiltin 11.4, FortressLibrary 158.8, RangeInternals 59.0, NativeArray 3.7, FlatString 2.5, String 11.4, List 8.4, Stream 0.1, NatReflect 0.8, TypeProxy 0.04, Writer 0.2, CovariantCollection 1.6, OneShotFlag 0.1: 300 s in all. Alone, in `junit.sh fix1` on 1f8a67251d, they took 238 s. A run step finds the jars as every compiled test does: the compiles write them into the track's caches folder (`FORTRESS_CACHES`, `test-caches/fast-onelibrary`), and the run's `bin/run_classpath` puts that folder's `bytecode_cache/*` first; `junit.sh` and a hand run use `default_repository/caches-one`.

Why first: on 1f8a67251d the fourteen compiled after the track's other compile tests in the same JVM, and every run test of the track died, 'VerifyError: Bad type on operand stack ... fortress/FortressLibrary$QQ$DefaultTraitMethods.isFinite ... Type 'fortress/FortressLibrary$QQ' (current frame, stack[0]) is not assignable to 'fortress/FortressLibrary$Ratio'' (`ant testFast`, onelibrary track, 5 failures); the dispatch method of `denominator(self)` (`Library/FortressLibrary.fss:643`, `:729`) had taken `Ratio` for its parameter, where the jar compiled first takes `QQ` (javap of the two jars' `FortressLibrary$QQ$DefaultTraitMethods`, 1,052 lines differ). Row NEW-C-3.

## The run tests (a point to report)

- **Hello**, `OneLibraryRunHello.test`: new, failing on the base and passing after, with the verifier on: 'Hello, one library'.
- **The helpers' raises**, `OneLibraryCatchHelperRaises.test`: new; passes: `IntegerOverflow` from `ZZ32`'s `+` and `FileNotFoundException` from `makeJavaBufferedReader` are caught.
- **Varargs**, `XXXOneLibraryRunVarargs.test`: still an expected failure, its check now `run_out_contains=REACHED`: the class of the arguments' array does not load, 'ClassFormatError: Duplicate method name "copy" ... in class file fortress/FortressLibrary$\=ImmutableArray1?...FZZ32,0,1?$DefaultTraitMethods' (row 1091, rewritten to hold `ImmutableArray1`'s `copy`); with the verifier off it dies at row 994, `|xs|`.
- **The conditional reduction**, `XXXOneLibraryRunConditionalReduction.test`: still an expected failure after REACHED: 'ClassFormatError: Duplicate method name "narrowToRange"' in `RangeInternals$FullScalarRange$DefaultTraitMethods` (NEW-C-2); with the verifier off, row 994.
- **The half**, `XXXOneLibraryRunHalf.test`: still an expected failure after REACHED: `println(q)` at a `QQ` names `FortressLibrary.println(fortress.FortressLibrary$Number)`, which the component lacks, 'NoSuchMethodError' (NEW-C-1).

Each of the three was renamed without `XXX` before the edit and seen failing on the base (call 3), then, failing at these walls after the edit, given back its name (fork C6). Their programs did not change.

The varargs indices and the numerals (item 601): with the carried rows, the one library's `ZZ32` is `FZZ32` in every descriptor, so `FZZ32.make` at `CodeGen.java:8014-8015`, `:4676-4677` and `:4717-4718` agrees with the array's `init`; with the verifier off, a scratch program `first(xs: ZZ32...) = xs[0]`, `third(...) = xs[2]` printed 7 and 9 for `(7, 8, 9)` (`bin/fortress run VarargsFirst`, `FORTRESS_LIBRARY=one`, `-XX:-BytecodeVerificationRemote`); with it on, row 1091. No edit of `CodeGen.java`, so no shadow patch run.

## The whole tracks and walk's suite (a point to report)

On 1f8a67251d, `ant testFast`: 'BUILD FAILED'; the compiler track 1785 tests, 1 failure, `compiler_tests/Compiled17a`, 'NoSuchMethodError: 'fortress.CompilerBuiltin$String com.sun.fortress.compiler.runtimeValues.FZZ32.asString()'' (its `u.asString` at `U extends ZZ32` calls the payload class's bridge, which `FValue.asString` typed at `FValue` had moved to that type); the onelibrary track 32 tests, 5 failures, every run test, at NEW-C-3's `VerifyError`. Both causes are repaired in f3439cf7ce.

On f3439cf7ce, `ant testFast`: 'BUILD SUCCESSFUL', 'Total time: 11 minutes 36 seconds': compiler 1785, library 86, othercompiler 263, misc 471, onelibrary 32 (14 at the last gate), no failure. `ant testSystem`: 'BUILD SUCCESSFUL', 'Total time: 4 minutes 12 seconds', 879 tests in four shards (223, 221, 218, 217), no failure. Both ran on the same files as the commit.

## The stages (a point to report)

Both ran once on f3439cf7ce, after its build; no code changed after.

- The count, `explorations/coordinator/tools/checker-count/run.sh tmp/.../checker-count-postedit.txt tmp/.../cc-post`: `diff` against `explorations/compile-ladder/climb-batch-34/gate/checker-count.txt` prints nothing; '#crash none'.
- The distance, `explorations/coordinator/tools/distance/run.sh ...`: `compare.sh` against `explorations/compile-ladder/climb-batch-34/gate/distance.txt` prints 'DISTANCE SAME   0'; the tables differ only in their `#seconds` (206 against 200) and `#machine` lines; `dist-post/errors.tsv` holds no site, as `explorations/compile-ladder/gate/distance-sites.tsv` holds none: no site moved. The stage checks, and the edit's tables enter the compile's descriptors only under the selection, which the stage does not set.

The planner's measure (`plan-25/probes/codegen.sh`, as `plan-31/probes/planner/codegen-measure.sh` runs it) on a scratch worktree seeded at f3439cf7ce and built, with `FORTRESS_LIBRARY=one` exported, since the edit's rows stand only under the selection: without the planner's patch, 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', 'rc=0 seconds=218'. With it: `git apply --check measure-hacks.patch` fails on `NamingCzar.java`, `FortressMethodAdapter.java` and `Naming.java`, whose hunks are this rung's pieces; with its one hunk that applies, the trait table's search (`TraitTable.scala`), the same, 0 refused, 754 emitted, 'rc=0 seconds=217'. The planner's before, with the patch on 285efad802: 0 and 754 (`plan-34/probes/measure-285efad802.txt`).

The ladder subset: the two files whose baseline first error names what the change touches, the rendering of an uncaught exception by `FException` and `FValue.asString`: `tests/XXXcaseTest.fss` and `tests/XXXtypecaseTest.fss` (`baseline-2026-09-19/ladder.tsv:158`, `:190`), neither in the gate's 85. After the edit, `XXXcaseTest` reaches the run with the baseline's first error, 'FortressException: class fortress.CompilerLibrary$MatchFailure with string Match failure'; `XXXtypecaseTest` stops at the type check, 'The typecase clause, String, is unreachable.', where the baseline ran it; the base's code refuses it alike (`old-fortress.sh ... compile XXXtypecaseTest.fss`), so the move is not this change's (row 1081's refusal, landed before).

## Where the fix belongs, and the precedent

`map/modules-and-phases.md` B.11 (the runtime) and B.12 (the natives) and the walkthrough's section 6 put the carriers in `compiler/runtimeValues/`, the descriptors in `NamingCzar`, the wrappers in `nativeInterface/`, the class path in `bin/`. The precedent is rung N's payload form (`FZZ32.java:22-63`), followed by the three new payload classes line for line, and its table, given the one library's rows; the stores follow the first set's `FJavaBufferedReader`. The planner's patch held each piece; the rung took them by hand, under the selection where the patch had them unconditional (probe Y's way, F-353: a row also enters a bare name). The precedent's other sites: rung N's table had 7 rows, all the prelude's; the converters' table 15 entries, none of the one library's.

Ways the tree offered, before the choice: a second set under the same names (fork C2's default, taken); new class names for the one library's carriers (C2's way not taken, which every site that names a carrier would follow); a carrier generated whole by the code generator (form 3 of the carriers' review); hand-written classes extending the objects' generated classes (form 1, which needs stubs that Java cannot write for `FlatString`).

## What the specification settles

Nothing of the carriers: the specification leaves a native component's meaning to the implementation. Appendix I's two sentences that said no program compiled against the one library runs are corrected below. The export rule of NEW-C-1 is open between the text and a team note (`Specification/basic/components/source-code.tex:356-361`, `:364-369`).

## Programs run old against new

- Hello, the five run tests and the components: on the base (calls 1 to 3) and after (the track).
- `CoveredUse` (an api `pick(x: ZZ32)`, `pick(x: Object)`, a component `pick(x: Object)`, `pick(3)`), on the base's code against the prelude: compile and link pass, the run 'NoSuchMethodError: ... CoveredApi.pick(com.sun.fortress.compiler.runtimeValues.FZZ32)'; walk prints 1 (`old-fortress.sh`). The rung did not change it.
- `XXXtypecaseTest.fss` on the base's code, above.

## Sentences made false

Of the specification, before and after, both edited:

- `Specification/appendices/changes.tex:4052-4054`, before: "a program compiled against \library\ does not run yet, so no program with a varargs parameter runs on the compiled path." After (`:4052-4057`): "A program compiled against \library\ runs, as one that prints a line does, but the class of the array of a varargs call's arguments does not load, since its template class holds the method \VAR{copy} twice (row~1091 of the revival's gap ledger), so no program that calls a declaration with a varargs parameter runs on the compiled path yet."
- `Specification/appendices/changes.tex:6413-6414`, before: "against \library\ it compiles one, but a program compiled against \library\ does not run yet (row~1062), and \secref{revival-varargs} names the forms that it does not yet compile." After (`:6416-6420`): "against \library\ it compiles one, and a program compiled against \library\ runs, as one that prints a line does, but not one that calls a declaration with a varargs parameter, since the class of the array of its arguments does not load (row~1091); \secref{revival-varargs} names the forms that it does not yet compile."
- `grep -rn '~874\|~1062' Specification --include=*.tex` printed one line on the base, `Specification/appendices/changes.tex:6414`, the second above, which the change made false; it is corrected. No other sentence names rows 874, 1062, 995 or 1090.

Of the record and the skill, for the gather and the skill writer: F-381, F-388, F-390 and F-353 (record.md, "For FACTS"); `.claude/skills/fortress-repo/SKILL.md`, "How a program runs": "a program compiled so does not run yet"; `references/build-and-caches.md`, "The caches": "No compile writes the one library's jars yet, so a program compiled with the variable dies at its first library class: 'NoClassDefFoundError: fortress/FortressLibrary$String' (ledger row 1062)"; `references/tests-writing.md`, "Where a test goes": "Give a plain test there a `compile` command only: a program compiled so does not run yet (ledger row 1062)"; `references/compiler.md`, "What the compiled path cannot compile yet": "With `FORTRESS_LIBRARY=one`, it compiles a varargs parameter, though such a program does not run yet"; the map's walkthrough says nothing of the second set.

## Points to report reached

1. The design as built: above, "The design as built".
2. The fourteen compiles in the track: above.
3. Hello's run test, failing on the base and passing after with the verifier on; the run tests of varargs, the conditional reduction and the half, each still failing with its wall and row: above.
4. The whole compiled tracks and walk's suite: the two failures of 1f8a67251d with their causes, none on f3439cf7ce: above.
5. The two stages' tables against the comparand, and the planner's measure with and without its patch: above.
6. The two sentences of the specification, before and after: above.
7. Files edited beyond those named: `.gitignore` (the line `/ProjectFortress/build-one/`), `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:1010-1037` and `OneLibraryJUTest.java:44` (the track's order), `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/LibraryObjects.java` (new, the reflection the two `LibraryNames` share).

None of these holds the push: each is reversible, and none acts against a decision on record but the reading of fork C3 below, a default of the batch that a later commit can take back.

## Decisions

1. **`FValue.asString` and `MutableFValue.asString` typed at `FValue` in the second set, with `FException` there too; the first set's as on the base.** Ways not taken: both sets typed at `FValue` (fork C3's text, "in both sets"), which made `compiler_tests/Compiled17a` die on 1f8a67251d, since compiled generic code over `U extends ZZ32` calls the payload class's bridge at the prelude's `String`; the second set's typed at the one library's `String` (probe Y's map), which names a library class in the run time. Evidence: the testFast run of 1f8a67251d, above. Fork C3's aim, that the run time names no prelude class where the second set is in use, holds for the classes the second set holds; the seven payload classes' bridges still name the prelude's `String` (listed above).
2. **The fourteen compile tests in one `.test`, put first in the onelibrary track by `FileTests.compilerSuite` with a first file.** Ways not taken: fourteen `.test` files, which the track's shuffle orders among the other tests; an ant step before the track (fork C4's way not taken). Evidence: the track's order on 1f8a67251d made `FortressLibrary`'s code wrong (NEW-C-3); fork C4's default asks the probe's order.
3. **The carried types' rows of the one library entered only where it is selected.** Way not taken: unconditional rows, as the planner's patch had them, which enter bare names such as `Char` for the prelude's compiles too. Evidence: F-353 (probe Y did the same); `NamingCzar.b` enters the bare name (`NamingCzar.java:577-580`).
4. **A payload lookup answers only a row of the selected library, FlatString counted among the one library's apis under the selection.** Way not taken: the probe's exception for FlatString in `inSelectedLibrary` alone, with a row of either library answering an api given by name. Evidence: `NamingCzar.java:661-675`.
5. **An exception without a constructor over `String` is built by its constructor without parameters.** Way not taken: the raise strings alone, under which the one library's `IOFailure` and `FileNotFoundException`, singletons (`Library/FortressLibrary.fss:2064-2070`), raise `FortressImplementationError`. Evidence: `OneLibraryCatchHelperRaises.test`.
6. **A helper's raise names the exception by its simple name; a whole class name still passes.** Way not taken: the prelude's strings mapped by prefix (probe Y's hack 4, which it named a shortcut). Evidence: fork C3's default.
7. **The second set's carriers of `Boolean`, `Char`, `FlatString` make a new object for each value, as rung N's do.** Way not taken: two cached `Boolean` values, a speed matter for later phases.
8. **`OneLibraryHalf`'s, `OneLibraryVarargsCount`'s and `OneLibraryConditionalReduction`'s run tests back to `XXX`, their check `run_out_contains=REACHED`.** Fork C6's default. Their walls: rows NEW-C-1, 1091, NEW-C-2.
9. **No edit of `CodeGen.java`:** the carried rows make the varargs indices and numerals agree (item 601), shown with the verifier off.

No decision of the curator covers 1, 2, 4, 5 and 7 beyond the forks named; each follows the reading given.

## Defects, each with its home

- Rows 874 and 1062: home 1, repaired; `OneLibraryComponents.test`, `OneLibraryRunHello.test`.
- The one library's raises not reaching a `catch` (the prelude's class names, and the singletons): home 1, repaired; `OneLibraryCatchHelperRaises.test`.
- `ImmutableArray1`'s `copy` written twice: home 2, `XXXOneLibraryRunVarargs.test`, row 1091 rewritten to hold it (the specification's "Method Declarations" settles that a class of such a trait loads).
- `FullScalarRange`'s `narrowToRange` written twice: home 2, `XXXOneLibraryRunConditionalReduction.test`, NEW-C-2.
- A call of an api function met by a wider declaration: home 3, `XXXOneLibraryRunHalf.test` (an expected failure that asserts only that the run fails after REACHED), NEW-C-1, CONTESTED: the text and a team note disagree on the export rule.
- `FortressLibrary`'s dispatch of `denominator` by JVM history: home 3, row only, NEW-C-3: no gated test can show it while the track compiles the library first.
- Row 994 met on main's code with the verifier off: its row, rewritten with the evidence; no test can pass while it shows behind row 1091.
- Row 995, the three now one name each under the one library: rewritten, open for the other carried types.
- Row 1090's compiled half: a note.

## Commands worked out

- The planner's measure under the selection, on a scratch copy: `seed-worktree.sh <base build> <scratch> - <commit>`, `ant compileAll` there, then `FORTRESS_LIBRARY=one explorations/compile-ladder/plan-25/probes/codegen.sh <out>`; the one applying hunk of the patch: `git apply --include='ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala' measure-hacks.patch`.
- A hand run with the verifier off: `JAVA_FLAGS="$JAVA_FLAGS -XX:+UnlockDiagnosticVMOptions -XX:-BytecodeVerificationRemote" bin/fortress run P` under `FORTRESS_LIBRARY=one`.
- Run against the onelibrary track's own jars: `FORTRESS_CACHES=$PWD/ProjectFortress/test-caches/fast-onelibrary FORTRESS_LIBRARY=one bin/fortress run P`.

## Questions for the curator

- NEW-C-1: which export rule holds, the text's (`source-code.tex:356-361`: a set of declarations whose parameter types' union is the exported one's), under which the one library's component must declare `print`, `println` and `errorPrintln` at `Number` and `Boolean`, or the team note's (`:364-369`), which the checker follows (`ExportChecker.scala:281-285`) and under which the code generator must call or bridge to the covering declaration? Row 834 holds the like question for return types. Not taken: either.
- Fork C3's text has `FValue` typed at `FValue` in both sets; the rung kept the first set's (decision 1, Compiled17a). Is the first set's to follow, with the code generator calling a number's dotted methods through the object's class rather than the payload class's bridge?
