# Climb batch 36, rung C (`rung-one-library-run-walls`): three walls of a compiled program against the one library

- problem: the onelibrary track's three expected failures, on the base compiled against the one library with the verifier on: 'NoClassDefFoundError', 'Duplicate method name "copy"', 'Duplicate method name "narrowToRange"', and 'Duplicate method name "-?0"' for the rehearsal's `Arr` and `Dot` (`explorations/compile-ladder/plan-36/probes/fixes-36.md:30-40`; `ProjectFortress/one_library_tests/XXXOneLibraryRunStringEquality.test:1` at b5a758846d)
- spec: `Specification/basic/traits.tex:581-592` (a trait inherits its supertraits' method declarations except those whose parameter type, self apart, equals that of a declaration that occurs in it; it provides what it declares or inherits); for row 994 none: the JVM name of a library's class is not the text's (`grep -rn 'javaPackage\|NoClassDefFound' Specification --include=*.tex` prints nothing)
- precedent: `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:325` (with `:513`, `:532`, `:2219`), `NamingCzar.javaPackageClassForApi`, and the switch rehearsal's W11 (`explorations/compile-ladder/plan-31/probes/switch-rehearsal.md:120-127`); for the methods written once, `74f53ec88`'s rule of one method per class in `dumpMethodChaining` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1094-1096`, `STypesUtil.allMethodsNotReplaced`) and `overrideBridges`' `bridged` set (`CodeGen.java:1234`)
- deviation: the precedent drops a declaration that a type below replaces; this edit keeps a record of the methods written by JVM name and descriptor, in the class writer (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGenClassWriter.java:40-54`, `:95-113`), a file beyond those the brief names
- deviation: the bridges, inherited forwarders and dispatch methods among inherited declarations are held and written at the class's end, so the order of a class's methods changes (`CodeGenClassWriter.java:106-113`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGenClassWriter.java`, `Specification/appendices/changes.tex` (each is in the team's last commit, `a874948ac`)

One launch worked the rung: the worktree did not exist when it started. Code commit: `7c7b040927` on `wip/rung-one-library-run-walls`, from the base `b5a758846d`.

## What changed and why

**Row 994.** `OverloadSet` named the owner of a generic overloaded function's instance table, and its template class, by the api's bare name at four places, `Naming.dotToSep(f.tagA.getText())`, where every other place asks `NamingCzar.javaPackageClassForApi`, which puts a default library's classes in the package `fortress`. The four now ask it (fork C1, the rehearsal's W11): `generateClosureTableOwner` (`OverloadSet.java:962`), `invokeArmAtTemplateParams` (`:1421`), and the two template names of `generateCall` (`:1784`, `:1788`). No bare api name is left in `OverloadSet.java`; `Naming.dotToSep` in `CodeGen.java:6412` names a payload class, not an api. A program's own component is not a default library's, so its names do not change.

**Rows 1091 and 1099.** The code generator could write a method twice into one class, under one name and descriptor; the JVM refuses such a class as it loads. An instrumented copy of `ManglingClassWriter` (in `tmp/`, never in the tree) that reported every second method of a name and descriptor, over a compile of the one library's `AnyType`, `FortressBuiltin`, `FortressLibrary`, `RangeInternals` and `List` on the base's code, found four shapes:

- a trait's own forwarder beside a narrowing bridge from a generic trait at its own type (`ImmutableArray1`'s `copy`, `tabulate`, `fill`; `Array1`, `Array2` and `Array3`'s `copy`; `Vector`'s and `Matrix`'s prefix `-`): first `dumpOverloadedMethodChaining:1679`, again `dumpMethodChaining:1124`;
- a trait's own forwarder beside a dispatch method among the trait's and its generic parent's declarations (`Vector`'s and `Matrix`'s `+` and `-`): first `generateTopLevelOverloads:8823` from `forTraitDecl`, again `dumpMethodChaining:1124`; the dispatch's two branches both called the interface's method of its own name and descriptor;
- one narrowing bridge for each of two parents that give the same (`FullScalarRange`'s, `FullRange2D`'s and `FullRange3D`'s `narrowToRange`; the object `SimpleSeqFilterGenerator`'s `seq`): both `dumpOverloadedMethodChaining:1679`;
- an inherited body's forwarder beside the class's own method at the same descriptor (`List`'s `=`, and its name mangled away from overloading): first `dumpMethodChaining:1160`, again `:1124`; and in three objects a bridge beside the object's own method (`TransposedArray2`'s `replica` and `t`, `TransposedMatrix`'s `t` and `scale`).

A scan of every class file in the jars for a method held twice by name and descriptor counts them:

    python3 -I tmp/rung-one-library-run-walls/tools/dupscan.py tmp/rung-one-library-run-walls/old-one/bytecode_cache/*.jar      (the base's fourteen jars, the base build's caches-one)
    dupscan: 2208 classes, 25 methods held twice
    python3 -I tmp/rung-one-library-run-walls/tools/dupscan.py default_repository/caches-one/bytecode_cache/*.jar                 (the same fourteen, compiled by 7c7b040927's code)
    dupscan: 2208 classes, 0 methods held twice
    python3 -I tmp/rung-one-library-run-walls/tools/dupscan.py /home/user/fortress-wsuite/default_repository/caches/bytecode_cache/*.jar   (the prelude's, on the base)
    dupscan: 476 classes, 0 methods held twice

The repair (fork C2): `CodeGenClassWriter` keeps a record of the methods that a class gets, by name and descriptor, and the methods that the code generator writes between `startBridges` and `endBridges` are bridges: it holds each in an ASM `MethodNode` until the class ends (`visitEnd`), and writes it there only where the class has no method of its name and descriptor yet. So the class's own method is written over a bridge at its own signature, as `traits.tex:581-592` has a declaration of the type itself replace an inherited one at the same parameter types, and a bridge that two parents give is written once. Every other method is written as before, a second one of a name and descriptor included, so a defect of another kind still shows as it loads. `CodeGen` marks four places as bridges: in `forObjectDeclPrePass` (`CodeGen.java:5336-5345`) and `forTraitDecl` (`:6114-6125`), the call of `dumpOverloadedMethodChaining` and of `generateTopLevelOverloads` for the type's dispatch methods; in `dumpMethodChaining` (`:1160-1165`), the forwarders to an inherited body; and `overrideBridges` (`:1235-1244`). `visitMethod` and `visitCGMethod` of `CodeGenClassWriter` now reach `visitNoMangleMethod` by a virtual call, so that every method passes the record; a bridge's instructions are mangled as they are held and replayed into the class writer unchanged. The template of a generic trait holds the duplicate already, with its static parameters in the descriptor, so the record sees it there; two methods whose descriptors differ in the template and become equal only at an instance are not seen.

What it does not change: which declaration the code generator gathers, compares or bridges. The classification in `dumpOverloadedMethodChaining` that made a bridge or a dispatch at a descriptor where the type's own declaration replaces the inherited one (its domain and return comparisons over static parameters, and a trait's `T` substituted again in the target descriptor, as `ImmutableArray1`'s bridge to `copy()` answering `ImmutableArray1⟦ImmutableArray1⟦T,b0,s0⟧,b0,s0⟧`) is left as it is: those methods are now never written.

## The tests: the failing runs and the passing runs

The base run, before the edit was first built (it ended at 03:14:11Z; the first build started at 03:25:41Z), through the harness in one JVM against the one library, the private caches copied from the base build's `caches-one`:

    cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_THREADS=4 explorations/coordinator/tools/old-fortress.sh /home/user/fortress-wsuite <worktree>/tmp/rung-one-library-run-walls/old-one junit one_library_tests/{OneLibraryStringEquality,OneLibraryConditionalReduction,OneLibraryVarargsCount,OneLibraryRunStringEquality,OneLibraryRunConditionalReduction,OneLibraryRunVarargs,OneLibraryArr,OneLibraryDot,OneLibraryVarargsArguments}.test     (2026-11-24T03:14:00Z)

echoed before it: "Expected failure: on the base's code, through fortress junit in one JVM against the one library (private caches copied from the base build's caches-one, verifier on), the three compile tests and the six compile cases of the run tests pass and the six run cases fail, 'Tests run: 15,  Failures: 6': OneLibraryRunStringEquality after REACHED with 'java.lang.NoClassDefFoundError' (row 994); OneLibraryRunConditionalReduction with 'ClassFormatError: Duplicate method name "narrowToRange"' (row 1099); OneLibraryRunVarargs and OneLibraryVarargsArguments with 'Duplicate method name "copy"' (row 1091); OneLibraryArr and OneLibraryDot with 'Duplicate method name "-?0"' (row 1091)." It printed:

    . run .../one_library_tests/OneLibraryStringEquality (738ms) REACHED
    Caused by: java.lang.NoClassDefFoundError: FortressLibrary
    F. run .../one_library_tests/OneLibraryConditionalReduction (868ms) REACHED
    java.lang.ClassFormatError: Duplicate method name "narrowToRange" with signature "(Lfortress.FortressLibrary$\=Range?...FZZ32?;)Lfortress.FortressLibrary$\=BoundedRange?...
    F. run .../one_library_tests/OneLibraryVarargsCount (768ms) REACHED
    java.lang.ClassFormatError: Duplicate method name "copy" with signature "()Lfortress.FortressLibrary$\=ImmutableArray1?...FZZ32,0,3?;" ...
    F. run .../one_library_tests/OneLibraryArr (681ms) java.lang.ClassFormatError: Duplicate method name "-?0" with signature "(Lfortress.FortressLibrary$\=Vector?...
    F. run .../one_library_tests/OneLibraryDot (828ms) java.lang.ClassFormatError: Duplicate method name "-?0" ...
    F. run .../one_library_tests/OneLibraryVarargsArguments (658ms) java.lang.ClassFormatError: Duplicate method name "copy" ...
    Tests run: 15,  Failures: 6,  Errors: 0

The range reduction test, written after the edit was built, ran on the old code (the skill's `tests-writing.md`, "The order", step 2, for a tree that holds the fix):

    cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_THREADS=4 explorations/coordinator/tools/old-fortress.sh /home/user/fortress-wsuite <worktree>/tmp/rung-one-library-run-walls/old-one junit one_library_tests/OneLibraryRangeReduction.test     (ended 03:38:21Z)
    Expected failure: ... OneLibraryRangeReduction's compile passes and its run fails with 'ClassFormatError: Duplicate method name "narrowToRange"' (row 1099): 'Tests run: 2,  Failures: 1'.
    . run .../one_library_tests/OneLibraryRangeReduction (1653ms) java.lang.ClassFormatError: Duplicate method name "narrowToRange" with signature ...
    Tests run: 2,  Failures: 1,  Errors: 0

The passing runs, on `7c7b040927`'s code (the last change of code was built at 03:31; nothing in `ProjectFortress/src` changed after):

    FORTRESS_LIBRARY=one ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after2 ProjectFortress/one_library_tests OneLibraryComponents.test OneLibraryStringEquality.test ... OneLibraryVarargsArguments.test
    . run ProjectFortress/one_library_tests/OneLibraryStringEquality (763ms) REACHED
    PASS
    . run ProjectFortress/one_library_tests/OneLibraryArr (859ms) PASS
    . run ProjectFortress/one_library_tests/OneLibraryDot (969ms) PASS
    . run ProjectFortress/one_library_tests/OneLibraryVarargsArguments (784ms) PASS

and the onelibrary track whole, last, after the test files took their final form:

    ant testOneLibrary      (2026-11-24, ended 03:43:02Z)
    Tests run: 50, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 175.754 sec
    BUILD SUCCESSFUL

The last landed gate's track ran 41 (`explorations/compile-ladder/climb-batch-35b/gate/summary.txt`, `fast-onelibrary/OneLibraryJUTest 41 0 0 0`); the nine more are the compile and run cases of `OneLibraryArr`, `OneLibraryDot`, `OneLibraryVarargsArguments` and `OneLibraryRangeReduction`, and the compile case that `OneLibraryRunStringEquality.test` adds.

Each test, failing on the base and passing after, with the verifier on (no run sets it off):

| test | row | on the base | after |
|---|---|---|---|
| `OneLibraryRunStringEquality.test` (promoted from `XXXOneLibraryRunStringEquality.test`) | 994 | 'NoClassDefFoundError: FortressLibrary' after REACHED | passes |
| `OneLibraryArr.test` (new, from `plan-34/probes/programs/Arr.fss`, asserts `a[5] = 25`) | 994 (`seq`), 1091 (`Vector`) | 'Duplicate method name "-?0"' | passes |
| `OneLibraryDot.test` (new, from `Dot.fss`, asserts the dot product `499500.0`) | 994, 1091 | 'Duplicate method name "-?0"' | passes |
| `OneLibraryVarargsArguments.test` (new: the count and the second of a varargs call's arguments) | 994 (`\|xs\|`), 1091 (`ImmutableArray1`) | 'Duplicate method name "copy"' | passes |
| `OneLibraryRangeReduction.test` (new: `SUM` and `BIG AND` over `0#n`) | 1099 | 'Duplicate method name "narrowToRange"' | passes |
| `XXXOneLibraryRunVarargs.test` (promotion tried, kept) | 1091, then 1098 | 'Duplicate method name "copy"' | expected failure: 'NoSuchMethodError: ... fortress.FortressLibrary.println(fortress.FortressLibrary$Number)' after REACHED (row 1098) |
| `XXXOneLibraryRunConditionalReduction.test` (promotion tried, kept) | 1099, then 1137 | 'Duplicate method name "narrowToRange"' | expected failure: 'VerifyError: Bad type on operand stack' in the closure of `SimpleIndexValuePairs.generate` after REACHED (row 1137) |

The plain-named run tests of the varargs and conditional programs were run after the fix, in the run above: 'Failed to satisfy run_out_WIcontains; expected REACHED 4 2 2 0' and 'Failed to satisfy run_out_contains; expected PASS', each with the message in the table. So, as fork C3 has it, each stays an expected failure, with `run_out_contains=REACHED` and its comment line naming what now stops it; the program of each is unchanged.

The reductions over a range in the conditional program pass: a probe of its first three assertions alone, against the one library on `7c7b040927`'s code, printed 'REACHED' and 'PASS' (`tmp/rung-one-library-run-walls/probe/RangeProbe.fss`), and one of its fourth alone died with the `VerifyError`.

The new expected failure, `compiler_tests/XXXGenericMethodClosureSelfThroughTrait.test` with `GenericMethodClosureSelfThroughTraitLink.test`, under the compiler's prelude in one JVM:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx1 ProjectFortress/compiler_tests GenericMethodClosureSelfThroughTraitLink.test XXXGenericMethodClosureSelfThroughTrait.test     (03:39:31Z)
    Expected failure: ... XXXGenericMethodClosureSelfThroughTrait.test's run fails after REACHED with 'java.lang.VerifyError: Bad type on operand stack' (the closure's self at Gen[\ZZ32\] not assignable to Holder), which the harness counts as the expected failure: 'OK (2 tests)'.
    Reason:
      Type 'XXXGenericMethodClosureSelfThroughTrait$\=Gen?...FZZ32?' (current frame, stack[1]) is not assignable to 'XXXGenericMethodClosureSelfThroughTrait$Holder'
    Saw expected failure (Exit code != 0)
    OK (2 tests)

and red for one run with `viaTrait`'s parameter typed `Holder`, so that the method is called through the object's type, then restored:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx2 ProjectFortress/compiler_tests GenericMethodClosureSelfThroughTraitLink.test XXXGenericMethodClosureSelfThroughTrait.test     (03:39:50Z)
    . run ProjectFortress/compiler_tests/XXXGenericMethodClosureSelfThroughTrait (685ms) REACHED
    PASS
    Tests run: 2,  Failures: 1,  Errors: 0

Beside them, the compiled tests of `compiler_tests/` whose names hold override, bridge, narrow, forward, diamond, inherit, shadow, `SelfSecond`, `MeetNarrowed` or `ApiTraitMethodNotFirst` (56 files, 74f53ec88's among them), under the prelude in one JVM on the edit:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh bridges ProjectFortress/compiler_tests <the 56 files>
    OK (107 tests)

## Where the fix belongs, and the precedent

The place was found in the code before the edit, by the instrumented writer's stacks above; `explorations/coordinator/map/modules-and-phases.md`, read after the edit, agrees: `OverloadSet` emits the dispatch methods (B.7, `:365-375`), and every class is written through `CodeGenClassWriter` over `ManglingClassWriter` (B.9, `:389-401`). Row 994's repair is the rehearsal's; `OverloadSet.java` asks `javaPackageClassForApi` at four other places (`:325`, `:513`, `:532`, `:2219`) and now at all eight. For the methods written twice, `74f53ec88` (rows 990 and 571) made `dumpMethodChaining` gather each inherited method once by declaration; the writers that this edit reaches bypass that gathering: `dumpOverloadedMethodChaining`'s four writes (`CodeGen.java:1488`, `:1653`, `:1674-1684`, `:1687`), the type-level dispatch methods (`:5343`, `:6123`), the inherited forwarders of `dumpMethodChaining` (`:1163-1164`), and `overrideBridges` (`:1242`).

The ways weighed for rows 1091 and 1099:

- the record in the class writer, bridges held to the class's end (taken);
- repair the classification in `dumpOverloadedMethodChaining`, so that it makes no bridge or dispatch where the type's own declaration replaces the inherited one: the root of the first two shapes, but it reaches neither two parents' one bridge nor `List`'s inherited forwarder in `dumpMethodChaining`, and its domain comparisons over static parameters are the code that went wrong;
- compute, before each writer writes, the descriptor of the type's own methods and compare: four writers would each repeat the descriptor computation of the own method's writer, for traits and objects alike;
- the same record in a subclass inside `CodeGen.java`, to stay in the named file: it covers only the classes made with it, and the record is the writer's;
- the first method written wins: it keeps the bridge over the own method, wrong in three of the four shapes (a bridge to a descriptor that a trait's `T` substituted twice, a dispatch whose branches call itself);
- drop every second method of a name and descriptor, bridges or not: it would hide a defect of another kind, which today stops the class as it loads.

## What the specification settles

`Specification/basic/traits.tex:581-592`: a trait inherits its supertraits' method declarations except those overridden or whose parameter type, self apart, equals that of a declaration that occurs in it, and provides what it declares or inherits; so a class has one method at such a signature, the type's own, and a declaration that two supertraits give is provided once. The JVM name of a default library's class is the implementation's (none). No passage of the specification is changed but Appendix I's two clauses below.

## Programs run on the old code and on the new

- The nine `.test` files above: on the base, 'Tests run: 15, Failures: 6'; after, the five runs pass and two stop at later rows.
- `OneLibraryRangeReduction.test`: on the base 'Tests run: 2, Failures: 1'; after, it passes (the track above).
- The duplicate scan: 25 methods held twice in the base's one-library jars, 0 after; the prelude's 0.
- The closure of `SimpleIndexValuePairs.generate` (`Library/FortressLibrary.fss:4056`, `fn@4056!41-72`): `javap -p -c` of its template class from the base's jar and from the edit's prints the same, the source line apart; so the `VerifyError` is the base's, reached once the walls before it are gone.
- A test of two lists compared by `=` (`emptyList[\ZZ32\]().addRight(1).addRight(2)` twice), tried and not kept: on the base its run died as `List`'s class loaded, 'ClassFormatError: Duplicate method name "=?0"' ('Tests run: 2, Failures: 1', through `old-fortress.sh ... junit`); on the edit `List`'s class loads and the run dies 'NoClassDefFoundError: n#90$RTTIc', the class of a size that the checker made fresh for a `NatParam` (`addRight` grows the list's array by `enlargeRight`, through `primitiveImmutableArray`, which passes `reflect(x)`: `Library/List.fss:350-361`, `Library/FortressLibrary.fss:2548-2549`), the compiled path's known limit on a size known only at run time (rows 25 and 307; the skill's `revival-changes.md`, "Static parameters": such a call runs only under walk). So it would be an expected failure of a limit, not of these rows, and it is left out; the sixteen `n#…$RTTIc` failures of step 10 below are likely the same, not traced.
- The walk runs: `OneLibraryVarargsCount.fss` under walk on the old code prints `REACHED`, `4`, `2`, `2`, `0`; two of the closure probes (`tmp/rung-one-library-run-walls/probe/SelfClosureProbe.fss` and `SelfClosureProbe2.fss`) print `PASS` under walk, the second compiled dying with the `VerifyError`.

## The interpreter's suite on the compiled path (step 10)

The list: the 209 programs of `ProjectFortress/tests/` that `explorations/compile-ladder/gate/suite-compiled.tsv` does not hold and that stopped at link or run under the one library in the count of 2026-11-24 (`explorations/compile-ladder/suite-compiled-2026-11-24/programs.tsv`), the phase at which that count's one-library runs first met the methods held twice ('Duplicate method name' first for 173, 36 and 14 programs, `explorations/compile-ladder/suite-compiled-2026-11-24/analysis.txt:206-211`), each on two lines, under both libraries:

    explorations/coordinator/tools/suite-compiled/run.sh tmp/rung-one-library-run-walls/suite-list.tsv - tmp/rung-one-library-run-walls/suite tmp/rung-one-library-run-walls/suite-out
    LISTED	418	PASS 81	FAIL 337	LEAVES 0	GONE 0
    CANDIDATES	0	JOINS 0

The 81 that pass all pass under the one library, and none under the prelude; they join the gate's list under `one`, which grows from 197 to 278 lines (76 to 157 under the one library). Of the 128 that still fail under the one library, none dies of a method held twice or of the bare name `FortressLibrary` (`grep -l 'Duplicate method' .../suite/one/raw/tests/*.run` and `grep -l 'NoClassDefFoundError: FortressLibrary$'` print nothing); their reasons in `verdicts.tsv`, not traced here, hold (a grep each, so a line can count twice) `NoClassDefFoundError` 32 times (16 of the classes are a size's, as `n#82$RTTIc`), `AbstractMethodError` 25, 'Unable to read serialized data' 12, `NoSuchMethodError` 11, `ClassCastException` 9, `VerifyError` 9, `IncompatibleClassChangeError` 5, and 'compiled, not refused as its .test names' 5. The EXIT=1 of the run is its own rule for a listed program that fails: every line of this list was a candidate.

A guard beside it, not asked by the brief: the 197 programs that the gate's list held at the base, each under its library, on `7c7b040927`'s code, so that no listed program fails at the gate by this change:

    explorations/coordinator/tools/suite-compiled/run.sh tmp/rung-one-library-run-walls/listed-base.tsv - tmp/rung-one-library-run-walls/suite2 tmp/rung-one-library-run-walls/suite2-out      (listed-base.tsv: git show b5a758846d:explorations/compile-ladder/gate/suite-compiled.tsv)
    LISTED	197	PASS 197	FAIL 0	LEAVES 0	GONE 0
    EXIT=0

## The stages

None, as the section has it: the edit changes the code generator and its class writer, and neither the count stage nor the distance stage runs the code generator. Files, for `STAGE_BLIND`: `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGenClassWriter.java`, `Specification/appendices/changes.tex`, `explorations/compile-ladder/gate/suite-compiled.tsv`, the tests under `ProjectFortress/one_library_tests/` and `ProjectFortress/compiler_tests/` below, and this folder.

## Sentences of the specification made false, and their correction

`grep -rn '~994\|~1091\|~1099' Specification --include=*.tex` printed two lines on the base, both on row 1091; each said that no program that calls a varargs declaration runs compiled against the one library, which `OneLibraryVarargsArguments` makes false. Both are corrected, naming row 1098 where it stops a program:

- `Specification/appendices/changes.tex:4063-4067`, before: "A program compiled against \library\ can run, as one that prints a line of text does, but the class of the array of a varargs call's arguments does not load, since its template class holds the method \VAR{copy} twice (row~1091 of the revival's gap ledger), so no program that calls a declaration with a varargs parameter runs on the compiled path yet." After (`:4063-4068`): "A program compiled against \library\ that calls a declaration with a varargs parameter runs on the compiled path, as one that counts and reads the arguments of such calls does; one that prints a number by \VAR{println} still stops, since the call names the api's declaration of \VAR{println} at \TYP{Number}, which \library\ implements only at \TYP{Any} (row~1098 of the revival's gap ledger)."
- `Specification/appendices/changes.tex:6424-6426`, before: "... against \library\ it compiles one, and a program compiled against \library\ can run, as one that prints a line of text does, but not one that calls a declaration with a varargs parameter, since the class of the array of its arguments does not load (row~1091);" After (`:6425-6428`): "... against \library\ it compiles one, and a program compiled against \library\ that calls a declaration with a varargs parameter runs, except where it prints a number by \VAR{println}, whose call names a declaration that \library\ implements only at a wider parameter type (row~1098);"

After the edit the grep prints nothing. No other sentence of the specification names the three walls (`grep -rn 'does not load\|Duplicate method\|ClassFormatError\|NoClassDefFound' Specification --include=*.tex` prints only the two lines above on the base). Outside the specification, the change makes false three items of the skill's `references/compiler.md`, "What the compiled path cannot compile yet" (a varargs call, row 1091; a reduction over a range, row 1099; `=` and `<` of two strings and `=` of two booleans, row 994), and the parts of `F-396` that list them; the record folds both (record.md).

## Points to report

- Each fix as made, by file and member: `OverloadSet.java`, `generateClosureTableOwner` (`:962`), `invokeArmAtTemplateParams` (`:1421`), `generateCall` (`:1784`, `:1788`); `CodeGenClassWriter.java`, the record `written`, `bridges` and `bridging` (`:40-54`), `startBridges` and `endBridges` (`:86-93`), `visitNoMangleMethod` (`:95-104`), `visitEnd` (`:106-113`), and `visitMethod` and `visitCGMethod` (`:69-85`); `CodeGen.java`, `dumpMethodChaining` (`:1160-1165`), `overrideBridges` (`:1235-1244`), `forObjectDeclPrePass` (`:5336-5345`), `forTraitDecl` (`:6114-6125`).
- The expected failures promoted and the new run tests, each failing on the base and passing after, with the verifier on: `OneLibraryRunStringEquality` (promoted), `OneLibraryArr`, `OneLibraryDot`, `OneLibraryVarargsArguments`, `OneLibraryRangeReduction`; each that still fails: `XXXOneLibraryRunVarargs` at row 1098, `XXXOneLibraryRunConditionalReduction` at row 1137.
- The onelibrary track, `ant testOneLibrary`, on the final code: 50 tests, 0 failures, `BUILD SUCCESSFUL`.
- The files edited, for `STAGE_BLIND` (above); a file edited beyond those named: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGenClassWriter.java`; and the gate's list `explorations/compile-ladder/gate/suite-compiled.tsv`, which step 10 of the brief asks for.
- A test the revival wrote, changed: the comment lines of `XXXOneLibraryRunVarargs.test` and `XXXOneLibraryRunConditionalReduction.test` now name what stops each; before, "it fails after REACHED while the template class of ImmutableArray1 holds its copy twice" and "... while the template class of FullScalarRange holds its narrowToRange twice". Their keys and programs are unchanged.

No step taken cannot be undone or acts against a decision on record.

## Decisions

1. **The four names ask `NamingCzar.javaPackageClassForApi(f.tagA)`** (fork C1). Ways not taken: the overload set's own `packageAndClassName` (`ifNone`), which names the set's api, not the arm's; a new helper, where the existing one serves.
2. **A record of the methods written, in `CodeGenClassWriter`, with the bridges held to the class's end** (fork C2). Ways not taken, with the evidence, under "Where the fix belongs".
3. **What counts as a bridge**: the writes of `dumpOverloadedMethodChaining`, the type-level dispatch methods, the inherited forwarders of `dumpMethodChaining`, and `overrideBridges`. Ways not taken: without the forwarders of `dumpMethodChaining`, `List`'s `=` stays twice (measured: the first build marked the other three, and the conditional program's run died 'Duplicate method name "=?0"' in `List`'s class); without the type-level dispatch methods, `Vector`'s and `Matrix`'s `+` and `-` stay twice (the instrumented stacks); every write (decision 2's last way).
4. **The varargs program's run test stays an expected failure at row 1098** (fork C3): the promotion was tried and run; the program, which prints numbers, is unchanged; `OneLibraryVarargsArguments`, which asserts the count and an element of varargs calls and prints only `PASS`, is the passing test of the `copy` half of row 1091. Way not taken: rewrite `OneLibraryVarargsCount.fss` to assert in place of printing, which hides row 1098 from it.
5. **The conditional program's run test stays an expected failure, now at row 1137** (fork C3), and `OneLibraryRangeReduction` is the passing test of row 1099. Ways not taken: move the program's zip case into a program of its own so that the promoted test passes, a change of the revival's test that the brief does not ask; repair row 1137, a closure's emission outside the rung's members.
6. **Row 1137's home is 2, a gated `XXX` test in `compiler_tests/`**: the specification settles the program valid (walk runs it, the checker accepts it), and it fails verification under the prelude too, so not `one_library_tests/`. Way not taken: a ledger row only.
7. **The promoted and new run tests hold `compile` and `run`**, after the skill's promoted form (`NatRtTask.test`: `link`, `run`); way not taken: `run` alone, leaning on the plain compile test.
8. **`Arr` and `Dot` assert their values with `assert` and print `PASS`**; way not taken: keep their `println` of the value and check it with a `run_out` key.
9. **Row 1098 is left as it stands** (the brief: it waits for item 616), and the tests it stops are named here: `XXXOneLibraryRunHalf.test`, its reproducer, and `XXXOneLibraryRunVarargs.test`. Way not taken: a rewrite of its line with the second test, which does not fit its notes' limit without cutting its evidence.

## Defects and their homes

- Row 994, the bare api name: home 1, `OneLibraryRunStringEquality.test` (and the `seq` of `OneLibraryArr`, `OneLibraryDot`, the `|xs|` of `OneLibraryVarargsArguments`).
- Row 1091, a trait's own method beside a bridge or dispatch at its own type: home 1, `OneLibraryVarargsArguments.test`, `OneLibraryArr.test`, `OneLibraryDot.test`.
- Row 1099, one bridge for each of two parents: home 1, `OneLibraryRangeReduction.test`.
- `List`'s `=` held twice (an inherited body's forwarder beside the own method), the same defect as row 1091's, measured by the scan and the first build's run of the conditional program ('Duplicate method name "=?0"'): repaired, the scan's 0 its evidence; no gated test that passes loads `List`'s class yet (the conditional program's, an expected failure, now passes it and stops at row 1137, and a list test stops at a run-time size, below); no row of its own.
- The three objects' methods held twice (`TransposedArray2`, `TransposedMatrix`, `SimpleSeqFilterGenerator`): home 1 by the scan's 0; no test runs them yet.
- New, row 1137, a closure in an object's generic method called through a trait's type holds `self` at the trait's type: home 2, `compiler_tests/XXXGenericMethodClosureSelfThroughTrait.test` with its link test, and `one_library_tests/XXXOneLibraryRunConditionalReduction.test`.
- Row 1098, `println` of a number: deferred (item 616), its test unchanged; it also stops `XXXOneLibraryRunVarargs.test`.

## Commands worked out

- `tmp/rung-one-library-run-walls/tools/dupscan.py JAR...`: reads each class file's constant pool and method table and prints each method held twice by name and descriptor, and the count. Not committed (the brief admits nothing else under `explorations/`).
- The instrumented class writer: a copy of `ManglingClassWriter.java` whose `visitNoMangleMethod` keeps the name and descriptor of each method with its `CodeGen` frames and prints the two stacks of a second one, compiled with `javac` into `tmp/.../diag/classes` and put first on the class path of `java ... com.sun.fortress.Shell compile` with `FORTRESS_LIBRARY=one` and a private caches folder (the skill's `compiler.md`, "Testing an edit here"); a component whose jar and analyzed entry are removed from the folder is compiled again.

## For FACTS

See `record.md`: a new entry on the methods of a class written once by name and descriptor, and `F-396`'s list of departures, rewritten.

## Questions for the curator

None.
