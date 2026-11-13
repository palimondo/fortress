<!-- Probe Y of the plan review of 2026-11-10 (its section 7.4), run 2026-11-13 by a Fable worker: whether one build of the tree can compile and run a program against the compiler's prelude and against the interpreter's library, with the prelude's run-time value classes kept and a second, re-parented set beside them; done in a scratch worktree, `/home/user/fortress-probe-y`, seeded from the base build `/home/user/fortress-base32` (`832f7d0d91`) with the rehearsal's patch applied; it works, and this note gives what ran, how the library is selected, every hack, the walls, the cost of the second set and an estimate in rungs; nothing here lands, and the scratch tree's whole diff is `probe-y.patch` beside this report. -->

# Probe Y: one build, two libraries

**The answer: yes.** One `ant compileAll` of the scratch tree gives a build that compiles and runs the one-line program against the compiler's prelude, as today, and against the interpreter's library, chosen by one environment variable at the compile and at the run. The rehearsal's `Array1` program and its dot loop also run against the interpreter's library in that build, by hand and through the test harness. A sample of the compiled tests passes against the prelude in the same build. No wall stopped the probe.

The base is `832f7d0d91`, the rehearsal's. "The rehearsal" is `switch-rehearsal.md`, beside this note; its walls are W1 to W16 and its hacks 1 to 12. "The review" is `explorations/reviews/plan-review-2026-11-10.md`. "The one library" is the interpreter's library.

Machine: nproc 4, Intel Xeon Processor @ 2.10GHz, OpenJDK 25, `FORTRESS_THREADS=1` for the runs by hand and 4 in the harness. Another workflow ran beside the probe; the load was 0.2 at the first build and up to 9.8 later. No timing here is a pair.

## 1. What ran

All in `/home/user/fortress-probe-y`, after one `ant compileAll` (43 s, `BUILD SUCCESSFUL`) and the two library orders (section 5).

The three programs are the rehearsal's by its description (its section 4); its files were not kept, so they were written again. `Hello` is `run(): () = println("Hello, one library")`.

**The prelude** (no variable set, the tree's own `default_repository/caches`):

    $ ../../bin/fortress compile Hello.fss ; ../../bin/fortress run Hello
    Hello, one library                         (both exit 0)
    $ ../../bin/fortress compile Arr.fss
    Arr.fss:5:6-10: Array1 is undefined.       (exit 255; Dot.fss alike, 2 errors)

`Arr` and `Dot` cannot compile against the prelude in any build: it has no array type (row 305).

**The one library** (`FORTRESS_LIBRARY=one`, `FORTRESS_CACHES=<tree>/default_repository/caches-one`, and for each run the rehearsal's flags that switch the verifier off, its W7):

    $ ../../bin/fortress compile Hello.fss ; ../../bin/fortress run Hello
    Hello, one library
    $ ../../bin/fortress compile Arr.fss ; ../../bin/fortress run Arr
    a[5] = 25
    $ ../../bin/fortress compile Dot.fss ; ../../bin/fortress run Dot
    dot = 499500.0                             (every command exit 0)

With `-verbose:class`, the prelude's run of `Hello` loads no class whose name holds `FortressLibrary`, `FortressBuiltin` or `FlatStringC`, and the one library's run loads none whose name holds `CompilerBuiltin` or `CompilerLibrary` (each count 0).

**Through the harness, against the one library.** Three `.test` files (`link`, `run`, `run_out_contains=` the line above) for the three programs, in one `fortress junit` run with the same three settings:

    . run .../ArrOne (1375ms) a[5] = 25
    . run .../DotOne (1826ms) dot = 499500.0
    OK (6 tests)                               (16 s)

**Through the harness, against the prelude, in the same build** (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`, on `ProjectFortress/compiler_tests`):

- Twelve files chosen for what the second set touches (helpers that raise, the `NN32`, integer, `Char` and `asFloat` helper families, a caught `FileNotFoundException`, two `atomic` tests, one refusal of the code generator): `OK (22 tests)`.
- Every seventh file of the folder's sorted list, 125 files: `Tests run: 205, Failures: 4`. The four are `XXXFortToStringRungS`, `XXXGenericFunctionalMethodSelfSecond`, `XXXGenericTraitGenericFunctionalMethod` and `XXXPowNN64CompiledRungE`, each 'Could not load …: Resource not found'. The same four files run alone on the base build's code (`old-fortress.sh … junit`) fail in the same way, `Tests run: 4, Failures: 4`: a file with only a `run` step needs its sibling's jar, which a sample leaves out. So the sample shows no test that the second set disturbed.

**What did not run, and what was not tried.** The whole compiled tracks (1,907 tests) were not run against the prelude; the sample is 137 files of 876 in one folder. Walk was not run: the rehearsal's library text breaks it in a scratch tree (its hack 4), and this probe kept that text. A matrix, the library's `DOT` and microGPT stop where the rehearsal stopped (its W15, W16 and section 4); nothing here changes that. The cheaper form that the carriers' review proposes (section 7) was not tried.

## 2. How the library is selected

One variable, `FORTRESS_LIBRARY`. Unset, everything is as today. With `FORTRESS_LIBRARY=one`:

- **At the compile.** `WellKnownNames.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java`) reads the variable once for the JVM (or `-Dfortress.library=one`). `Shell.useCompilerLibraries()` (`Shell.java`), which every compiled-path command calls, points `WellKnownNames` and `Types` at the one library's names where it is set, and at the prelude's where not.
- **At the run.** `bin/fortress_classpath` puts `ProjectFortress/build-one`, the second set's classes, before `ProjectFortress/build`. `bin/run_classpath` builds on that script, so the run's JVM finds the second set's `FZZ32` first. The compile's JVM gets the same class path.
- **The caches.** A caches folder holds one library's jars and the programs compiled against it, so the one library has its own: `default_repository/caches-one`, named by hand in `FORTRESS_CACHES`.

One JVM serves one library: `NamingCzar`'s tables are filled once, when the class loads, as on the base (`NamingCzar.fortLib`). The harness fits this: its `run` step is a process of its own that inherits the environment, so a test track against the one library is the same harness started with the three settings.

### What had to follow the selection

| what | file | how it follows |
|---|---|---|
| the names of the default library | `Shell.java`, `WellKnownNames.java` | by the variable |
| the thirteen value classes, with `FValue`, `MutableFValue`, `Utility` and `FException` | `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/`; second set in `ProjectFortress/build-one` | two sets of classes under the same names, the class path chooses |
| the stores' carriers `FJavaArrayStore`, `FJavaRR64ArrayStore`; the stubs `fortress/FortressLibrary.java`, `FortressBuiltin.java`, `FlatStringC.java` | `ProjectFortress/src-one/` | in the second set only |
| the helpers' 99 raise strings, and the six of `FortressBufferedReader` and `FortressBufferedWriter` | `runtimeValues/LibraryNames.java`, one copy in each set; `Utility.java` calls it | the strings stay the prelude's; the second set's copy maps them |
| the compile's table of carried types (the rehearsal's 15 rows) | `compiler/NamingCzar.java` | entered only where the one library is selected, since each row also enters the type's bare name (`NamingCzar.b`), and a test's own `Float` or `Char` would be taken for a carried type |
| a carried parent named by its interface (W14); `FlatString`'s class named `fortress/FlatStringC` | `compiler/NamingCzar.java` | by the variable |
| a carried type's `RTTIc` holds its carrier (W12) | `compiler/codegen/CodeGen.java` | by the variable |
| the tolerant code generator (hack 7): refused declarations left out, a method written twice, a class written twice | `CodeGen.java` (four `catch` blocks), `CodeGenClassWriter.java`, `runtimeSystem/ByteCodeWriter.java` | by the variable: the prelude keeps its refusals |
| the search of the trait table (W3) | `scala_src/typechecker/TraitTable.scala` | does not follow: it searches four prelude apis, then the one library's two, and finds only those that the compile loaded |
| the run's copy of the table; the wrapper generator's converters | `runtimeSystem/Naming.java`, `compiler/nativeInterface/FortressMethodAdapter.java` | do not follow: each is keyed by a name that holds its library, so both libraries' rows stand together |
| the dispatch method's package (W11) | `compiler/OverloadSet.java` | does not follow: the rehearsal's repair, the same for both |

The classes of the build that link against a prelude class by name, found by reading the constant pools of `ProjectFortress/build`: the thirteen, `FValue` and `MutableFValue` (their `asString()` returns `fortress.CompilerBuiltin.String`), `Utility` (the constructor it looks up takes that type), `FException` (it calls `FValue.asString()`), and the prelude's own `FZZ32Vector` and `FStringVector`. Every other mention of the prelude in the run time and the helpers is a string.

**The second set is the first set under a map of names.** The rehearsal's re-parented classes differ from the base's only in the names of the generated classes that they extend, so the scratch build makes the second set's sources from the first's: `build.xml` copies seventeen files through eight replacements (`CompilerBuiltin.RR64` to `FortressBuiltin.Float`, `CompilerBuiltin.JavaString` to `FlatStringC.FlatString`, and so on, with `CompilerBuiltin.` to `FortressLibrary.` last) and compiles them with `src-one` into `build-one`. One of the eight is a whole clause: the prelude's `FRR32` implements `RR32` and `RR64`, the rehearsal's only `RR32`.

## 3. The hacks

Each is marked `PROBE Y` in the patch. The rehearsal's twelve are all still in the tree and are not repeated here; nine of them are now behind the variable.

1. **The selector is an environment variable read in two places** (`WellKnownNames`, `bin/fortress_classpath`). Proper form: one selector, say an option of the commands that the scripts pass on, or a mark in the program's jar that the run reads, so that a program compiled against one library cannot be run on the other's classes. Today a wrong pairing fails at load with `NoClassDefFoundError`.
2. **The one library's caches folder is named by hand.** Proper form: `ProjectProperties.CACHES` and the two scripts take the folder from the selection; `ant cleanCache` and the build's stamp know both folders. Today the build stamps and empties only `default_repository/caches`, so the one library's jars go stale without notice after an edit of the code generator.
3. **The second set's sources are made by string replacement in `build.xml`,** one rule a whole clause of one file. Proper form: it depends on the carriers' decision. If the two sets stay equal up to names, the map can stand as a small table; if the one library's carriers get content of their own, they are hand-written files in `src-one`.
4. **The raise strings are mapped by prefix** (`LibraryNames.exceptionClass`): `fortress.CompilerBuiltin$X` and `fortress.CompilerLibrary$X` to `fortress.FortressLibrary$X`. Proper form: a helper names an exception by its simple name, and each set's `LibraryNames` gives the component. That edits the 105 strings once, with no change of behaviour for the prelude.
5. **The guards around the rehearsal's hacks** (`if (!compiledPathUsesOneLibrary) throw __t`, and the like). They go when the hacks they guard are repaired.
6. **`Naming.java`'s table and the converters hold both libraries' rows.** Harmless by their keys. Proper form: they follow the selection as `NamingCzar`'s does, from one table.
7. **The build's stamp does not cover `build-one`** (`build.xml`, `implementationFingerprint`). Proper form: it does.
8. **The verifier is off for every run against the one library,** as in the rehearsal (W7). With it on, `Hello` dies as there: 'VerifyError: Bad type on operand stack … FortressLibrary$QQ$DefaultTraitMethods'.

## 4. The walls, in the order met

None stopped the probe. What was met:

1. **Each row of the compile's table also enters the type's bare name.** By reading `NamingCzar.b`, before any run; passed by entering the one library's rows only where it is selected. No row; it is a property of row 874's table.
2. **`Array1 is undefined` against the prelude** for `Arr` and `Dot`. Row 305.
3. **`b[i] := 1.0 i`, with `i` a `ZZ32`, is refused against the one library:** 'Ambiguous coercion in call to operator juxtaposition: of the declarations applicable to an argument of type (RadixPointNumeral[\2,1,10,10\], ZZ32) only by coercion, none is more specific than every other: ((RR64 & {Float}), RR64)->RR64; (QQ, QQ)->QQ.' The rehearsal met it on a model line (its "For the ledger", row 533's kind). Here it is a four-line program. It is on the scratch library, whose `Float` is a trait; `Dot` uses `asFloat(i)` instead.
4. **The prelude's bytecode is not the base's, byte for byte** (section 6). No row; row 430 holds the like for walk's messages.
5. **Four `XXX` tests with only a `run` step fail in a sample** on both trees (section 1). Not a defect.
6. **The verifier** (W7; rows 307 and 695's kind), unchanged.

## 5. What the second set costs

**Source.** Against `832f7d0d91` the patch touches 28 files (the rehearsal's touched 47): the 105 raise strings and the thirteen classes are back to the base's text.

- Hand-written and new for the second set: six files, 221 lines, in `ProjectFortress/src-one/`: the three stubs (174 lines), the two stores' carriers (32) and `LibraryNames` (15). The stubs and the stores' carriers are the rehearsal's; the switch-over needs them on either road.
- New for the selection: `LibraryNames` in the first set (9 lines), 2 lines in `Utility.java`, 43 lines of `build.xml`, 9 of `bin/fortress_classpath`, 8 of `WellKnownNames.java`, 7 more in `Shell.java`, and about a dozen guards.
- Generated, not kept in git: seventeen files, 638 lines. Kept by hand instead, the second set would be those 638 lines in git, to be edited beside the first set's on every change.

**The build.** `ant compileAll` after the edits, with scalac: 43 s; the skill's figure for a build after an edit is 25 to 60 s. With nothing changed: 7.7 s at a load of 9.8, against the skill's "about 4 s"; the second `javac` compiled nothing. `build-one` holds 101 class files, 432 KB.

**The library orders**, one after the other in this build:

    prelude, five compiles          25 s    (AnyType 4, CompilerBuiltin 12, CompilerLibrary 6, CompilerAlgebra 2, CompilerSystem 1)
    one library, fourteen compiles  204 s   (AnyType 18, FortressBuiltin 12, FortressLibrary 84, RangeInternals 41, the other ten 49)

The rehearsal gives "about 200 s" for the fourteen, and the skill "100 to 110 s" for the five; the five took 25 s here, on an idle machine. The one library's caches are 70 MB against the prelude's 16 MB.

**A gate.** By the figures on file and these: a second library order adds about 200 s to each gate (the review's section 7.2 says the same), once, since the tracks' JVMs fill private caches from it or beside it; how the ant tracks would share it was not built. A test track against the one library costs what its tests cost: three tests took 16 s in one JVM here, most of it the compiles. So the standing cost is of the order of four minutes a gate while the track is small, and grows with the tests moved.

**To keep.** While both libraries live: every edit of a first-set file reaches the second through the map without work, if the two stay equal up to names; an edit that should differ between them needs the file moved to `src-one`. Every hack of section 3 that becomes a mechanism (selector, caches, stamp, names table) is code that the prelude's deletion removes again.

## 6. A finding beside the question: the prelude's jars change with any change of the compiler

To see whether the second set disturbed the first, the five prelude jars of this tree were compared with the base build's, class by class, after the tree's path was rewritten in each class's constants.

    base build's jars against the base build's code, compiled again cold:        590 classes, 590 equal
    base build's jars against the base build's code over this tree's sources:    590 equal
    base build's jars against this tree's jars:                                  558 equal, 32 differ
    this tree's CompilerBuiltin, compiled twice:                                 312 classes, 16 differ
    the base build's code with -XX:hashCode=0, and with =1:                      312 classes, 18 differ each

The classes that differ hold the same methods in another order, and their dispatch methods test the same types in another order (`javap` of `CompilerBuiltin$EqualTo` and `CompilerBuiltin`). So the order in which the code generator writes methods and dispatch tests follows the JVM's identity hashes. The base's code gives the same bytes on each compile only because the default identity hash is the same sequence in each run; a changed hash mode moves the order, and this tree's code gives a different order on each compile. Which of the tree's edits unsettles it was not traced. The rehearsal saw the same for the one library ("Which copy comes first is not stable from one compile to the next", its W6).

For probe Y it means that a comparison of bytes cannot show that the prelude is undisturbed; the tests have to. For the work it means that a compiled test can pass or fail with the order (the rehearsal's W6 was such a case), and that no two builds of different code give comparable jars.

## 7. Doing it properly, in rungs

Given the carriers' decision, which stands first on either road:

1. **The selection as a mechanism**: one selector, the caches folder and the stamp that follow it, a mark that stops a wrong pairing, the second library order and a first test track against the one library in the gate, with `Hello` as its first test. One rung. It edits `Shell.java`, `ProjectProperties.java`, the scripts, `build.xml` and the gate's script, and no file of the code generator.
2. **The second set**: the stubs, the stores' carriers, the names table for the raise strings, and the set itself, by the map or by hand as the decision says; `NamingCzar`'s, `Naming`'s and the converters' tables from one table that follows the selection. One rung, or two if the carriers are written by hand with content of their own. This is the rehearsal's W2 work done beside the prelude's classes and not in their place; it is not work added to W2.

So two rungs, perhaps three, and the review's "2 or 3 more for the second set" (its section 7.2) holds or is slightly high: most of what the second set needs, the switch-over needs anyway. After these two, each of the rehearsal's other walls that only the switch shows (W3, W4, W11, W12 to W14) is one rung with a test on the one library, on `main`, under the gate.

**Against the carriers' review** (`explorations/reviews/carriers-ways-2026-11-13.md`, way C and its point on the review's 7.1). That review says, by reading, that "one build serves one library" holds only for hand-written carriers that extend generated classes, and that under its way C in form 2 (the code generator writes the carrier over a hand-written payload class that names no library) no second set is needed. This tree's evidence agrees in part and cannot tell the rest:

- It agrees on where the tie is. The two sets differ in nothing but the names of the generated classes that the thirteen extend, and the `String` in `FValue.asString()`. A payload class that extends nothing generated has no such name.
- It adds one thing that way C's form 2 must also free: `FValue` and `MutableFValue` themselves name the prelude's `String` in `asString()`'s result, and `Utility` and `FException` link against it. A payload class that extends `FValue` inherits that name. So "names no library" needs `asString()` taken out of `FValue` or typed at `Any`; by reading, not tried.
- It cannot tell whether the code generator can write a native object over a payload class; that is way C's own three rungs and was not tried here. The session's room went to the main result, the tests and section 6.
- If way C in form 2 is taken, rung 2 above shrinks to the names table and the tables' following, and rung 1 stays as it is: the selection, the caches and the gate's second order are needed in any form.

**What I could not learn.**

- Whether all 1,907 compiled tests pass against the prelude in this build. The sample found nothing; section 6 says why bytes cannot stand in for the tests.
- Which edit makes this tree's order of methods vary from compile to compile, and whether the variation ever changes a result under the prelude.
- How the ant tracks, with their private caches, would take a second library order.
- Whether walk, the count stage and the distance stage are untouched: they run the same build, and none was run. By reading, the guards leave them as they were, since they do not set the variable; the rehearsal's library text is what breaks walk here.
- Anything about a JVM that serves both libraries at once. This design does not try it.

## Decisions

- **Two sets under the same class names, chosen by the class path,** not a second set under new names chosen inside the JVM. The alternatives: new names (a second package), which every place that names a carrier would have to follow: the code generator's literals, `equalityRule`'s `instanceof`, the converters, the loader's tables; or one class that implements both libraries' interfaces, which Java's single superclass forbids for the springboard. Evidence: the run's class path is already assembled by a script with the caches first (`bin/run_classpath`), and the run is a JVM of its own. No decision of the curator covers it; the review's 7.2 says only "a second set … chosen by the world that the compile command and the run select".
- **The second set made by a map of names in the build,** not kept by hand. Evidence: the rehearsal's seventeen files equal the base's under eight replacements (checked with `diff`, one file needing the clause). It makes the cost visible; section 3 marks it as a hack.
- **Every hack of the rehearsal's put behind the selector,** also where it looked harmless, so that the prelude's compile runs the base's code paths. `OverloadSet`'s four names (W11) were left for both: the rehearsal calls them the repair.
- **A wider sample of tests in place of the byte comparison,** once section 6 showed that bytes vary on their own.

## Defects, drafted for the ledger

- **The order in which the code generator writes a class's methods and a dispatch method's tests follows the JVM's identity hashes, so the compiled prelude differs from compile to compile once anything moves the hash sequence.** Status NEGATIVE-VERIFIED; class implementation gap (code generator). Reproducer: compile `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` cold on `832f7d0d91` twice, the second time with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0`: 18 of 312 classes differ, among them `fortress/CompilerBuiltin$EqualTo` (its `CMP` dispatch tests `Unordered` before `TotalComparison` in one and after in the other) and `fortress/CompilerBuiltin` itself. Without the flag, two compiles are equal. Seen on the compiled path only; row 430 is walk's sibling, F-232 the tree's hashes. Notes: the rehearsal's W6 ("which copy comes first is not stable") is the same cause; no site was traced.
- **A numeral with a radix point times a `ZZ32` value is tied between `RR64` and `QQ` against the one library** (row 533's kind): `a: Array1[\RR64,0,8\] = array1[\RR64,8\]()` then `a[i] := 1.0 i` in a `seq` loop. Seen under the compile command with `FORTRESS_LIBRARY=one` on the scratch library, where `Float` is a trait; the rehearsal's entry says the same of a model line and asks for a check on an unhacked library. This probe adds the small program, not that check.
- **`fortress compile` of a component whose jar is missing and whose analysis is cached writes no jar and exits 0.** Met with `old-fortress.sh`: the private caches were the base's copy, the five prelude jars were deleted, the five compiles exited 0, and `bytecode_cache/` stayed empty. From an empty caches folder the same five compiles write the five jars. The skill's `build-and-caches.md` describes "all five compiles exit 0 and a jar is missing. The cause is not known"; this may be that cause. Not traced further.

## Sentences of the specification made false

None: nothing lands.

## For FACTS

- **One build can serve the compiled path with either library: the prelude's thirteen value classes as they are, and a second set of the same names in a second class folder that the run's class path puts first; shown in a scratch tree on `832f7d0d91` with the rehearsal's hacks, where `Hello` runs on both, and an `Array1` program and a dot loop on the one library, by hand and through `fortress junit`.** It means the review's option A2 exists. No test holds it, since nothing landed; the commands and output are in section 1. The second set's classes equal the first's under a map of eight names (section 2).
- **The classes of the build that link against a prelude class by name are the thirteen value classes, `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector` and `FStringVector`; every other mention of the prelude in the run time and the helpers is a string (105 raise strings).** Shown by the constant pools of `ProjectFortress/build` on `832f7d0d91` (section 2).
- **The bytes of the compiled prelude depend on the JVM's identity hashes** (section 6): 590 of 590 classes equal between two compiles of the base's code, 18 of 312 different under another hash mode.
- **The one library's order of fourteen compiles took 204 s and the prelude's five 25 s, one after the other on an idle machine of 4 CPUs** (section 5). The skill's 100 to 110 s for the five was not seen here.

## Commands

- The second set first on the class path, for a compile or a run: `FORTRESS_LIBRARY=one FORTRESS_CACHES=<tree>/default_repository/caches-one bin/fortress compile P.fss`, and the same two settings with `JAVA_FLAGS="$JAVA_FLAGS -XX:+UnlockDiagnosticVMOptions -XX:-BytecodeVerificationRemote"` for `bin/fortress run P` and for `bin/fortress junit <files>`.
- The base build's code over another tree's sources, without touching the base build: `java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.autohome=<tree> -Dfortress.caches=<empty folder> -cp "$(FORTRESS_HOME=<base-build> <base-build>/bin/fortress_classpath | tail -1)" com.sun.fortress.Shell compile <component>.fss`, from `<tree>/ProjectFortress`.
- Two caches' jars compared class by class with one tree's path rewritten to the other's: a 35-line Python reader of the class file's constant pool over `zipfile`, not kept.
- The classes of a build that name a prelude class: `grep -rl 'fortress/Compiler' ProjectFortress/build --include=*.class`, then `javap -v -p` on each to tell a class reference from a string.

## Questions for the curator

- **Which order of the remaining work: the review's A1 or A2.** This probe removes the doubt that A2 exists. What A2 costs beyond A1, by this probe: two rungs, perhaps three, about 200 s and a small test track in every gate, a prelude that lives to the end, and four small mechanisms (selector, caches, stamp, names table) that the prelude's deletion removes again. What it buys is the review's: the walls that only the switch shows are met one at a time on `main`. Not decided here.
- **If A2: is the second set a map of names over the first, or files of its own?** It follows from the carriers' decision (`explorations/reviews/carriers-ways-2026-11-13.md`). Under a way whose hand-written classes extend generated ones, the map works today. Under way C in form 2 there may be no second set, if `FValue.asString()` is also freed of the library's name; by reading only.
- **Does the order of the code generator's output need to be made stable before the switch-over's work starts?** Section 6. With it unstable, two compiles of one tree are not comparable, and a wrong forwarder (W6) can come and go. The sources do not bear on it; it is a question of what the gate should be able to rely on.
