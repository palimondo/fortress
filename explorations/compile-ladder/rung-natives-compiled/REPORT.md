# Climb batch 23, rung C: the compiled half of P-58, the rewrite at the parse

- problem: the compiled path has no counterpart of `builtinPrimitive`, so `fortress compile` of a binding that names a helper gives 'Variable builtinPrimitive is not defined.' (ledger row 309, `explorations/fortress-gap-ledger.md:796`; this rung's base run, `ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss:5`)
- spec: none; `grep -rln -i 'builtinPrimitive\|import java\|nativeHelpers\|native binding\|native component' Specification/ --include=*.tex` finds only Appendix I's row 560 entry (`Specification/appendices/changes.tex:2473`) and "Native Components", whose syntax and semantics are "implementation dependent" (`Specification/basic/components/source-code.tex:513-518`)
- precedent: the binding probe's shadow rewrite (`explorations/perf-probes/prelude/natives-binding-probe.md:13-126`) as the planner's text re-based it (`explorations/compile-ladder/plan-23/probes/rung-C.patch:1-346`); the parser's own `import java` node (`ProjectFortress/src/com/sun/fortress/parser/Compilation.rats:235-239`); walk's recognition of the body (`ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:164-188`); the prelude's foreign-type table (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:440-463`)
- deviation: the rewrite takes only a string under `com.sun.fortress.nativeHelpers.`, where the planner's text took any public static method of any class that loads (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:95`)
- deviation: a declaration with a varargs parameter is tested before its alias is registered, so it adds no import entry (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:105`)
- deviation: the rewrite matches only the tight juxtaposition, not walk's one-item `MathPrimary` branch, which the parser never makes (`ProjectFortress/src/com/sun/fortress/parser/Expression.rats:464-473`, `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:2053-2056`)
- deviation: no provenance in the source comments: the class's header and `NamingCzar`'s comment cite no record entry (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:14-33`, `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:464-468`)
- deviation: the binding test has one case more, a functional method whose `self` is second (`ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss:9`), and a fourth test guards a string outside the helpers' package (`ProjectFortress/compiler_tests/XXXNativeHelperOutsidePackageCompiled.fss:5`)
- deviation: the specification's spelling: none, the specification is silent (spec line above)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/Parser.java:157-159`, `:329-330`; `ProjectFortress/src/com/sun/fortress/Shell.java:102-103`; `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:369-372`, `:464-505`

## What changed and why

P-58 gives the compiled path half of the native binding: at the parse, before the checker, a library body that is exactly `builtinPrimitive("…")`, whose string names a static Java method of `nativeHelpers/`, becomes a synthetic `import java` of the helper and a call, and a string that names no helper is refused. Row 309 is the gap it closes: the compiled path had no counterpart of `builtinPrimitive` at all.

- `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:1-139`, new. `rewrite` (`:46-64`) walks a component's top-level declarations and the members of its traits and objects. `fn` (`:87-123`) takes a declaration whose body is the tight juxtaposition of `builtinPrimitive` and a string literal, the shape the parser makes for `builtinPrimitive("…")` and walk recognizes (`NativeApp.java:170-188`). A string under `com.sun.fortress.nativeHelpers.` (`:95`) that names a public static method of a class that loads becomes `builtinPrimitive_Class_method(args)`, the arguments the parameters in order, `self` first for a method of a trait or object (`:103-109`), and the component gains `import java pkg.{Class.method => builtinPrimitive_Class_method, …}` (`:53-62`). A string under that package that names no public static method throws the static error 'builtinPrimitive names no static helper: <the string>' at the string (`:96-99`). Every other string, walk's glue classes among them, is left alone, so its body stays a call of `builtinPrimitive` (row 560). A declaration with a varargs parameter is left alone (`:105`).
- `ProjectFortress/src/com/sun/fortress/compiler/Parser.java:329-330`: `parseFileConvertExn` rewrites each parsed unit. `:157-159`: `importCollector` returns the whole rewritten component for a `.fss` file whose text holds `"com.sun.fortress.nativeHelpers.`, because the repository makes the foreign api from the import collector's view of the file (`ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java:448-451`, `readCUFor` at `:1022-1025`).
- `ProjectFortress/src/com/sun/fortress/Shell.java:102-103`: `specificRepository` turns the rewrite on for every repository but walk's (`interpreterCache`), so the compile commands, `fortress junit` and the gate's two stages rewrite, and walk does not.
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:369-372`, `:464-505`: the three-argument `fortressTypeForForeignJavaType`, which `ForeignJava` and the wrapper generator call, reads a Java type as the one library's whenever the world is walk's (`WellKnownNames.fortressBuiltin()` is `FortressBuiltin`), decided at each call: `int` `FortressLibrary.ZZ32`, `long` `ZZ64`, `double` `RR64`, `String` `String`, `BigInteger` `ZZ`, `float` and `boolean` `FortressBuiltin`'s `RR32` and `Boolean`, `Object` `Any`, `void` `()`, the six special names `Char`, `NN32` and `NN64`. A type the one library lacks falls back to the prelude's reading. The prelude's table (`:440-463`) and the one-argument form stay as they are, so `NamingCzarJUTest` keeps its verdict.

I took the planner's `rung-C.patch` and changed it in four places, each listed under Decisions: the rewrite keyed to the helpers' package; the varargs test before the alias; no provenance in the source comments (the class's header and the citation of P-58 in `NamingCzar`'s comment); and one more case in the binding test, a functional method whose `self` is its second parameter, `sameAs(other:Shape, self)`, the shape the binding probe lists as not run (`natives-binding-probe.md` section 1, "Not run").

The first change answers a defect of the planner's text, measured on my tree before the change. A string outside the helpers' package that names a static method, `builtinPrimitive("java.lang.Math.abs")`, was rewritten by the text, but the import collector's hook, keyed to the helpers' package, did not fire for a file that names no helper, so the repository never made the foreign api. The compile crashed:

    $ cd tmp/rung-natives-compiled/probe && ../../../bin/fortress compile BPJavaStatic.fss     [the planner's text; FORTRESS_CACHES and -Dfortress.caches a private copy]
    Exception in thread "main" java.lang.IllegalArgumentException: Undefined API: java.lang
    	at com.sun.fortress.compiler.GlobalEnvironment$FromMap.api(GlobalEnvironment.java:88)
    	at com.sun.fortress.compiler.desugarer.CoercionLifter.putCoercionsInto(CoercionLifter.scala:114)
    rc=1

and the same string in a file that also names a helper (`BPJavaStaticMixed.fss`) compiled and ran, printing '3' and 'true': the same string bound or crashed by what else the file held. Walk's half keys its loader to the same package (`rung-W.patch`, `StaticNativeApp.isHelperString`: `s.startsWith(HELPERS)`), so walk refuses such a string as a glue class it cannot find. Keyed to the package, the rewrite now agrees with the hook and with walk: both probes give 'Variable builtinPrimitive is not defined.' at the `java.lang.Math.abs` line, as the base does. The guard `XXXNativeHelperOutsidePackageCompiled` holds this.

## The tests: the failing run and the passing run

Four `.test` files in `ProjectFortress/compiler_tests/`, five cases:

- `NativeHelperBindingCompiled` (link and run): a top-level function (`simpleIntArith.intLT`), a trait's functional method with `self` first (`equality.sEquiv`) and with `self` second, an object's dotted method with `self` passed first (`stringOps.typeName`), a helper that raises `IntegerOverflow` caught by a Fortress `catch` (`simpleIntArith.intOverflowingAdd`), and two Java overloads of one helper name, `simpleOverload.baz(String)` and `baz(int)`, each bound at its own types.
- `XXXNativeHelperMisfitCompiled` (compile): a helper that does not fit its declaration, 'Function body has type ZZ32, but declared return type is Boolean.'
- `XXXNativeHelperMisspeltCompiled` (compile): 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAddd'.
- `XXXNativeHelperOutsidePackageCompiled` (compile): a string outside the package that names a static Java method stays a call of `builtinPrimitive`, 'Variable builtinPrimitive is not defined.'

The failing run, on the base's code (the worktree's seeded base build, before my edit was first built), 2026-10-30T04:06:54Z to 04:06:57Z:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests \
          NativeHelperBindingCompiled.test XXXNativeHelperMisfitCompiled.test XXXNativeHelperMisspeltCompiled.test
    ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss:5:32-46:
        Variable builtinPrimitive is not defined.
    File NativeHelperBindingCompiled.fss has 7 errors.
    F. run ProjectFortress/compiler_tests/NativeHelperBindingCompiled (144ms) Could not load NativeHelperBindingCompiled
    Tests run: 4,  Failures: 4,  Errors: 0

Each compile test there: 'Variable builtinPrimitive is not defined.', ' Saw failure, but did not satisfy compile_err_contains'. The guard came later, with the defect of the planner's text: it is red on that text and green on the base, 2026-10-30T04:35:28Z to 04:35:32Z, before the fix was built:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh patchtext ProjectFortress/compiler_tests XXXNativeHelperOutsidePackageCompiled.test
     Did not satisfy compile_err_contains; expected
    Variable builtinPrimitive is not defined.
    java.lang.IllegalArgumentException: Undefined API: java.lang
    Tests run: 1,  Failures: 1,  Errors: 0
    $ explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXNativeHelperOutsidePackageCompiled.test
     Saw expected failure
    OK (1 test)

The passing run, the last after my last change of code (commit `3d72de41f`), 2026-10-30T04:38:30Z:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests \
          NativeHelperBindingCompiled.test XXXNativeHelperMisfitCompiled.test XXXNativeHelperMisspeltCompiled.test XXXNativeHelperOutsidePackageCompiled.test
    . run ProjectFortress/compiler_tests/NativeHelperBindingCompiled (759ms) PASS
    OK (5 tests)

The first `XXX` test, `XXXNativeHelperMisfitCompiled`, shown red on a deliberate fix, on the earlier code state (the planner's text with my other three changes), whose reading of the two compile tests' strings the last change does not touch (its declared result `ZZ32` for one run, then restored with `git checkout`); `XXXNativeHelperMisspeltCompiled` too (its string spelt right for the run):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh deliberate ProjectFortress/compiler_tests XXXNativeHelperMisfitCompiled.test XXXNativeHelperMisspeltCompiled.test
    1) ProjectFortress/compiler_tests/XXXNativeHelperMisfitCompiled(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    2) ProjectFortress/compiler_tests/XXXNativeHelperMisspeltCompiled(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 2,  Failures: 2,  Errors: 0

## The suites

After my last edit of code, once each (the parser is a phase both paths run: `tests-running.md`, "When to run a whole suite"), on commit `3d72de41f`:

    $ ant testQuick
    BUILD SUCCESSFUL
    Total time: 7 minutes 3 seconds

the compiler track 'Tests run: 1337, Failures: 0, Errors: 0', the library track 'Tests run: 86, Failures: 0, Errors: 0', the other-compiler track 'Tests run: 263, Failures: 0, Errors: 0'. Against the landed gate (`explorations/compile-ladder/climb-batch-22c/gate/summary.txt`: 1332, 86, 263), the compiler track has my five cases more, each green; no other verdict changed.

    $ ant testSystem
    BUILD SUCCESSFUL
    Total time: 4 minutes 24 seconds

its four shards 'Tests run: 178', '165', '169' and '173', each 'Failures: 0, Errors: 0', 685 tests, the landed gate's counts shard by shard; no verdict changed. Walk makes its repository with the switch off (`Shell.java:103`, `:621`, `:1221`), so no rewritten tree reaches it.

    $ ant testOnly -DtestPattern=NamingCzarJUTest
    [junit]   testForeign(com.sun.fortress.compiler.NamingCzarJUTest) OK
    [junit] Tests run: 2, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.222 sec

The parser's own unit tests, in the misc track, which `ant testQuick` does not run, once each on the final code:

    $ ant testOnly -DtestPattern=ParserJUTest
    [junit] Tests run: 188, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 2.215 sec
    $ ant testOnly -DtestPattern=ASTJUTest
    [junit] Tests run: 13, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.214 sec

the landed gate's counts (188 and 13), no failure.

An earlier code state, the planner's text with my first three changes (before the rewrite was keyed to the package), ran the same suites: `ant testQuick` 'BUILD SUCCESSFUL', 1336, 86 and 263, no failure; `ant testSystem` 'BUILD SUCCESSFUL', 178, 165, 169 and 173, no failure. They are not the final state's verdicts.

## The checker count and the distance

Both stages ran once each on the final code, after its build (commit `3d72de41f`), one after the other, into `tmp/rung-natives-compiled/`; their before is climb batch 22c's landed tables (`explorations/compile-ladder/climb-batch-22c/gate/checker-count.txt`, `distance.txt`) and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv`, which holds no site.

The count, 2026-10-30T04:52:26Z, load at start 4.05 (nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, under `nice -n 19` beside rung W):

    $ explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-compiled/checker-count-postedit.txt tmp/rung-natives-compiled/cc-post
    #total	0
    #locations	0
    #crash	none
    SECONDS=155

`diff explorations/compile-ladder/climb-batch-22c/gate/checker-count.txt tmp/rung-natives-compiled/checker-count-postedit.txt` prints nothing: every `#api` row 0, the same thirteen apis, '#shadow matches the tracked StaticChecker'. No string on this tree names a helper, so the rewrite makes no synthetic `import java`, and the table has no `com.sun.fortress.nativeHelpers` row; the planner's run of both texts has one (`explorations/coordinator/CLIMB-BATCH-23.md:233`). The change touches no checker code, so there is no speed pass; the stage took 155 s.

The distance, 2026-10-30T04:55:13Z, after the count, load at start 1.88 5.39 6.59 (the same machine), under `nice -n 19`:

    $ explorations/coordinator/tools/distance/run.sh tmp/rung-natives-compiled/distance-postedit.txt tmp/rung-natives-compiled/dist-post
    #total	0
    #crash	none
    #seconds	205	FortressLibrary 149
    #shadow	every shadow edit matched the tracked sources

every `#kind` row 0, its fourteen targets each '### done … rc=0', '### all seconds=204 rc=0', under the compile command's own setting ('#distance setting compile'). Against the landed table:

    $ explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-22c/gate/distance.txt tmp/rung-natives-compiled/distance-postedit.txt
    DISTANCE SAME   0

The stage's per-site file, `dist-post/errors.tsv`, holds its header alone, as the per-site list does (`explorations/compile-ladder/gate/distance-sites.tsv`, its header alone): no site moved, came or went. The landed table took '#seconds 238 FortressLibrary 174' at another load; one run each is no measure of a difference.

## The ladder subset

The five files whose recorded first error in the baseline names `builtinPrimitive` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`), every one a glue string: `tests/XXXarityTestFn.fss`, `XXXfailTestFn.fss`, `XXXnoclassNativeFn.fss`, `nativeTestFn.fss` and `testPrim.fss`; `testPrim` holds `bar(s:String, self)`, a functional method whose `self` is second. The gate's ladder runs none of them, and the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-22c/gate/ladder/ladder.tsv`, 85 rows) lacks them, so they are compared with the baseline's table. The drivers copied into `tmp/rung-natives-compiled/ladder/` with step 3's copies of the final build's caches (`run-subset.sh`, then `classify.py`):

    tests	XXXarityTestFn.fss	yes	disambiguate	2	builtinPrimitive			builtinPrimitive		Variable builtinPrimitive is not defined.
    tests	nativeTestFn.fss		disambiguate	2	builtinPrimitive			builtinPrimitive		Variable builtinPrimitive is not defined.
    tests	testPrim.fss		disambiguate	1	builtinPrimitive			builtinPrimitive		Variable builtinPrimitive is not defined.

and `diff` of the five rows against the baseline's, the seconds column masked, prints nothing: no file moved.

## Where the fix belongs, and the precedent

- The place: the phase map's parse, before disambiguation, as P-58 says and the binding probe measured: the repository makes the foreign api from the import collector's view of each file, and hands each `import java` to `ForeignJava.processJavaImport` there (`GraphRepository.java:448-451`, `:1022-1025`), so a later rewrite could not use the `import java` machinery (`natives-binding-probe.md` section 1, "Where it sits"). Both stages reach this parser through `Shell.compilerPhases`, which makes its repository through `Shell.specificRepository` (`Shell.java:957`), the one place both repositories are made (`:101-115`).
- The precedent: the binding probe's class, re-based by the planner; its synthetic import is the node the parser makes for a written `import java` (`Compilation.rats:235-239`, through `NodeFactory.makeImportNames`). The repository has no other synthetic import: the other callers of `makeImportNames` are the generated parsers (`parser/Fortress.java:2144`, `:2285`, `:2387`, and their template-parser copies), so there is no second site to count.
- The ways the language and the library offer: a binding written as `builtinPrimitive("…")` (P-58's form, taken); `import java` declarations written in the library (P-58's other form, not taken); a rewrite after the checker, building the typed call nodes by hand (`natives-binding-probe.md` section 1, not built); a checker rule that reads the string (none exists; P-58 puts the rewrite at the parse).

## What the specification settles

Nothing: the specification says nothing of `builtinPrimitive` or `import java`; a native component's "syntax and semantics are implementation dependent" (`Specification/basic/components/source-code.tex:513-518`). The decision is P-58's.

## Programs run old against new

- The three planner tests and the guard: above, on the base (`junit-base`, `old-fortress.sh`) and on the final code.
- `BPJavaStatic.fss` and `BPJavaStaticMixed.fss`, two probe programs in my `tmp/`, compiled with private caches: on the planner's text, the crash and the binding above; on the final code, 'Variable builtinPrimitive is not defined.' at `BPJavaStatic.fss:4:22-36` and `BPJavaStaticMixed.fss:4:22-36`, 'rc=255'; the base has no rewrite, so it gives that message for every string, as the guard's base run shows.

## Sentences made false

- Specification: none. Appendix I's row 560 entry (`Specification/appendices/changes.tex:2465-2476`) speaks of the glue strings' calls of `builtinPrimitive`, which stay. The library's printed comment on `builtinPrimitive` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-17`, typeset by `Specification/library/default-libraries.tex:37-39`) says the function "is actually recognized as a special piece of built-in magic by the Fortress interpreter" and that its argument "names a Java Class which is a subclass of `com.sun.fortress.interpreter.glue.NativeApp`". It stays true of every library string on this tree, where none names a helper; it is not true of a compiled program's string that names a helper, as the binding test's, which the compiled path now reads. Rung W revises the comment.
- The record, for the gather: F-180's "P-58 chose another way, not yet built": the compiled half is built here. F-180's "five gaps stop it": the foreign-type reading of walk's world closes gap 1, the type table, for walk itself too, so a written `import java` under walk stops at gap 3 (SKEPTIC.md; row NEW-C-1 in `record.md`). F-111's "The library names walk's natives only in strings, which only walk resolves": true on this tree, where no library string names a helper; false on the merged tree, where the stages resolve W's moved strings through this rewrite.

## Limits, by reading, not measured

- A component that imports a DSL grammar and names a helper: the import collector's hook parses it whole without its grammar (`Parser.java:157-159`), and `macroParse`'s grammar path, `parseWithGrammars` (`Parser.java:135`), does not apply the rewrite. No library or test component does both: on this tree only three of my four tests hold a helper string (`grep -rl '"com.sun.fortress.nativeHelpers.' --include=*.fss --include=*.fsi .`).
- On the compiled path's repository a component whose text names a helper is parsed whole four times for one analysis: the graph's visitor reads its imports and its exports through `nodeToComponent` (`GraphRepository.java:301`, `:313`), each a `readCUFor` (`:448-451`, `:1022-1025`) while the node holds no component, then `macroParse`'s import collector (`Parser.java:117`) and its `parseFileConvertExn` (`Parser.java:132`); a component that names no helper is parsed whole once, as on the base. On this tree no library file names a helper, so the stages pay nothing; on the merged tree `FortressLibrary.fss` and `FortressBuiltin.fss` do.
- The switch is one static flag, set by the repository made last in a JVM (`Shell.java:103`). `fortress parse` and `fortress api` parse without a repository (`Shell.java:561`, `:702`), so they show no rewrite.

## Points to report

Each is reversible; none holds the push.

1. **The planner's text, changed** (Decision 1): the rewrite keyed to the helpers' package (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:95`), for the crash measured on the text ('java.lang.IllegalArgumentException: Undefined API: java.lang'); the varargs test before the alias (`:105`); no provenance in the comments (`:14-33`, `NamingCzar.java:464-468`); the binding test's `sameAs(other:Shape, self)` (`ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss:9`). Fork 3's description of the text, "The rewrite itself takes any string that names a public static method of a class that loads", no longer holds; its default, the refusal keyed to the package, does.
2. **The tests before and after, through `junit.sh`**: on the base 'Tests run: 4,  Failures: 4,  Errors: 0' (the three planner tests); on the final code 'OK (5 tests)' (with the guard). The guard: red on the planner's text, green on the base and on the final code.
3. **The tables on the final tree**: the count table equal to climb batch 22c's, `diff` printing nothing, '#total 0', '#locations 0', '#crash none'; the count stage 155 s; the distance '#total 0', '#crash none', 'DISTANCE SAME   0' against climb batch 22c's table, 205 s. No site came.
4. **The suites on the final tree**: `ant testQuick` and `ant testSystem` 'BUILD SUCCESSFUL'. The verdicts that change: the five new cases, each green; no other.
5. **A parse of a file that names no helper, and the compiled tests**: no such parse changes. The import collector's hook fires only for a file whose text holds `"com.sun.fortress.nativeHelpers.` (`Parser.java:157-159`), which on this tree only three of my tests do; the rewrite touches only a string under that package (`BuiltinPrimitiveRewriter.java:95`) and returns the unit itself when it rewrites nothing (`:52`). No compiled test but my own changed its verdict (`ant testQuick` above), and the five glue-string programs of the ladder subset kept their phase and first error.
6. **Sentences made false**: none of the specification; the library's comment on `builtinPrimitive` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-17`) for a compiled program's helper string, not for any library string; F-180's "not yet built" and, on the merged tree, F-111's "which only walk resolves" ("Sentences made false").
7. **Files beyond those named**: a fourth test pair, `ProjectFortress/compiler_tests/XXXNativeHelperOutsidePackageCompiled.fss` and `.test`, in the named folder beyond the three named tests (Decision 8). No edit of `interpreter/`, `Library/`, `ProjectFortress/LibraryBuiltin/`, `nativeHelpers/`, `scala_src/` or the tools: `git diff --name-only 3cd653815 HEAD` lists the eight test files and `Shell.java`, `compiler/BuiltinPrimitiveRewriter.java`, `compiler/NamingCzar.java`, `compiler/Parser.java`.

## Competing names

`grep -rl` over `ProjectFortress/src/com/sun/fortress`, `ProjectFortress/tests`, `ProjectFortress/*_tests`, `Library` and `ProjectFortress/LibraryBuiltin` for each name the change adds (`BuiltinPrimitiveRewriter`, `builtinPrimitive_`, `NativeHelperBindingCompiled`, `NativeHelperMisfitCompiled`, `NativeHelperMisspeltCompiled`, `NativeHelperOutsidePackageCompiled`, `oneLibraryTypeForForeignJavaType`, `oneLibraryForeignJavaTranslations`, `namesHelpers`, `namesStaticMethod`, 'names no static helper') finds only the change's own files; `sameAs` is declared nowhere in the compiler's library (`Library/Compiler*.fs?`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fs?`, `AnyType.fs?`).

## Decisions

1. **The planner's text, changed in four places.** Ways not taken: the text as it is; the binding probe's own class. (a) The rewrite keyed to the helpers' package, not any loadable class's public static method: the measured crash and the binding above; walk's loader keys to the same package (`rung-W.patch`, `StaticNativeApp.isHelperString`); P-58: "Its string is to name a static Java method in `nativeHelpers/`". The way not taken with it: keep the text's wide rewrite and widen the hook's test to every string that names a static method, which would make `builtinPrimitive` a general Java binding on the compiled path that walk refuses, and cost a reflective lookup of each of the 449 glue strings at every graph build. Fork 3's own default, the refusal keyed to the package, is kept. (b) The varargs test before the alias is registered: the text registered the alias and then left the declaration alone, adding an import entry that nothing calls. (c) No provenance in the source comments (`committing.md`, "What to commit"; no source comment of the tree cites a record entry: `grep -rnE 'P-[0-9]{2,3}\b' ProjectFortress/src/com/sun/fortress --include=*.java --include=*.scala` prints nothing). (d) The binding test's case of a functional method whose `self` is second, which the binding probe did not run; `equality.sEquiv` is symmetric, so the case shows that such a declaration rewrites, compiles and runs, not the order of its arguments; no helper over `Any` and a second, other type exists to show the order (`grep -rn 'public static .*AnyType.Any' ProjectFortress/src/com/sun/fortress/nativeHelpers/`: `sEquiv`, `asString`, `typeName`, `defaultAsString`).
2. **The switch per repository** (fork 2). Ways not taken: keyed to the compiler's world, which hides every moved binding from the stages until N5; the probe's `-Dfortress.builtinPrimitive.rewrite` property.
3. **The refusal only under the helpers' package** (fork 3). Way not taken: refuse every string that names no helper, which would refuse every glue string on the compiled path before it moves.
4. **The import collector's hook only for a file whose text names a helper** (fork 4). Way not taken: the probe's whole parse of every component there.
5. **The stand-in reading in `NamingCzar`'s three-argument form** (fork 5). Way not taken: natives-shape's gap 1 patch, which rewrote the table at class load and failed `NamingCzarJUTest.testForeign` in the planner's run.
6. **A declaration with a varargs parameter left alone**, as the text does. Way not taken: refuse a helper string on such a declaration. No library binding with a varargs parameter names a helper: the three, `Library/Reflect.fss:313`, `:319`, `:389`, name glue classes over walk's `Type` objects.
7. **Only the tight juxtaposition matched**, not walk's one-item `MathPrimary` branch (`NativeApp.java:175-182`): the parser turns a one-item `MathPrimary` into a tight juxtaposition (`Expression.rats:468-471`, `ExprFactory.simplifyMathPrimary` at `ExprFactory.java:2053-2056`), and the rewrite runs on the parser's tree. Way not taken: match both shapes, as walk does after the phases.
8. **The guard as an `XXX` compile test asserting 'Variable builtinPrimitive is not defined.'**, the form of every compile-error test in `compiler_tests/` (fork 18). Ways not taken: the fix with no test; a new refusal of a string outside the package, which fork 3 does not take. At N5, when the one library declares `builtinPrimitive`, the guard's message changes, and N5 reads it.
9. **The ladder subset: the five files whose recorded first error names `builtinPrimitive`** in the baseline's `ladder.tsv` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`): `tests/XXXarityTestFn.fss`, `XXXfailTestFn.fss`, `XXXnoclassNativeFn.fss`, `nativeTestFn.fss`, `testPrim.fss`, all glue strings. No other first error names what the change touched: the parse, the import collector and the foreign-type reading in walk's world.
10. **No speed pass**: the change touches no checker code (fork 17); the count stage's seconds are reported.

## Defects, and their homes

- Row 309, the compiled path with no counterpart of `builtinPrimitive`: home 1, repaired; `NativeHelperBindingCompiled`. The gather closes it with commit `3d72de41f` (fork 14).
- The planner's text's crash on a string outside the helpers' package in a file that names no helper, and its binding of such a string beside a helper: home 1, repaired before landing; `XXXNativeHelperOutsidePackageCompiled`. It never reached the base, so it has no ledger row.
- The limits above are read, not measured; none is reachable from a library or test component on this tree, and none has a row.
- Walk's crash on a written `import java`, which the foreign-type reading moves from F-180's gap 1 to its gap 3, measured by the skeptic: home 3, row NEW-C-1 in `record.md`, with no test, since walk crashes on the program (SKEPTIC.md).

## For FACTS

**A `builtinPrimitive` body whose string names a static helper of `nativeHelpers/` compiles on the compiled path as a call of that helper.** At the parse, on every repository but walk's, the body becomes a call through a synthetic `import java`, `self` first for a method, so the checker checks it against the helper's Java signature; a string under `com.sun.fortress.nativeHelpers.` that names no public static method is a static error; every other string stays a call of `builtinPrimitive`. Test: `NativeHelperBindingCompiled`, with `XXXNativeHelperMisfitCompiled`, `XXXNativeHelperMisspeltCompiled` and `XXXNativeHelperOutsidePackageCompiled`. Detail: this report, "What changed and why".

## Commands worked out

- The probes on private caches: `Q=$PWD/tmp/rung-natives-compiled/q; cp -a default_repository/caches $Q/caches; export FORTRESS_CACHES=$Q/caches JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$Q/caches"`, then `bin/fortress compile P.fss` from the probe's folder.
- The ladder subset: `run-subset.sh` and `classify.py` copied into `tmp/rung-natives-compiled/ladder/` as `gate.md`, "The ladder regression", says, with `subset.txt` the five lines `tests<TAB>NAME.fss`.
