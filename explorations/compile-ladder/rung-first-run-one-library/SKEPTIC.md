<!-- The skeptic's review of rung C of climb batch 34b (rung-first-run-one-library): what was checked, the programs run old against new and walk against compiled, the corrections made, and the verdict. -->

# Rung C (climb batch 34b): the skeptic's review

Judged: the worker's head `1c62991e666fdd60e52fe6a3d1128eb6bd5635d1`. One launch of the worker and one of this role worked the rung. The branch already carried `REPORT.md` and `record.md`; each equals, byte for byte, the text that `journal-text.py` writes from the run's journal (32,214 and 18,377 bytes, `cmp` silent), so no commit of them was needed.

Verdict: **approved**. The change builds what the section asks, as the decisions on record and forks C1 to C6 state it, with the worker's reported deviation from fork C3's letter; Hello runs with the verifier on, and a program catches the helpers' raises. My commits are corrections only: four new tests that give homes to four defects that the first runs show, three ledger rows and one rewrite in `record.md`, two sentences of Appendix I, and a citation of the report. No fix of the change's code, none contested.

## What I checked

1. **The stages.** The worker's count table equals `explorations/compile-ladder/climb-batch-34/gate/checker-count.txt` (`diff` silent, '#crash none'); the distance table differs from the gate's only in `#seconds` and `#machine`, and `explorations/coordinator/tools/distance/compare.sh` prints 'DISTANCE SAME   0'. Both were started at 23:08:25 (call `vE5Ad1`), after the commit `f3439cf7ce` and after the last edit of code at 22:51:33 (call `rSxVmD`), so they ran on the final code. The diff touches no Scala under `scala_src/`, so I ran no count stage. The tables are those of the worker's head; my commits change no code.
2. **Test first.** The worker's transcript shows each `Expected failure:` line echoed before its harness command and each test failing so on the base's code before the first build (22:27:37): `OneLibraryComponents.test` at 22:12:07 (call `25hcFb`, 'Tests run: 14,  Failures: 3', FortressBuiltin, FortressLibrary and FlatString at 'Can't generate header for method floatToString'), `OneLibraryRunHello.test` at 22:14:38 (`dtaKkc`, 'NoClassDefFoundError: fortress/FortressLibrary$String'), the run tests at 22:18:51 (`BAdAfx`), `OneLibraryCatchHelperRaises.test` at 22:20:48 (`arrwtJ`), after a first run at 22:20:15 that failed another way, at the checker ('FlatString.FlatString->JavaBufferedReader is not applicable to an argument of type String.'), whose cause the worker found and whose next command echoed the line again. The passing run is `ant testFast` started at 22:51:46 (`LrhEFX`), after the last edit, on the code that `f3439cf7ce` commits: 'BUILD SUCCESSFUL', the onelibrary track 'run ProjectFortress/one_library_tests/OneLibraryRunHello (1433ms) Passed'.
3. **The diff**, line by line, against the section, P-33, P-37, P-178, P-164, F-353, F-388 and forks C1 to C6. It does what the report says. The carried types' rows enter only under the selection (F-353's rule, a row also enters a bare name, `NamingCzar.java:577-580`); a payload row answers only for the selected library (`NamingCzar.java:661-675`); the converters are the ones the table lacked (`FortressMethodAdapter.java:77-109`, `:191-198`); the 99 raise strings are 30 `DivisionByZero`, 55 `IntegerOverflow`, 11 `IOFailure`, 2 `FileNotFoundException` and `FAIL_CALLED`, and under the prelude each maps to the name it had (`fortress.CompilerBuiltin$...`, `fortress.CompilerLibrary$FailCalled`), so walk's reading of the class name (`StaticNativeApp.java:273-282`) sees the same string. Nothing to trim: `LibraryObjects` holds the reflection that both sets' `LibraryNames` share, and the two new converters need their own `convertArg` (a cast to `FJavaString` before `getValue`).
4. **Precedent.** Rung N's payload form and table, the first set's `FJavaBufferedReader`, the prelude's component test; the worker counted the sites (7 payload rows, 15 converters). The fallback to an exception's constructor without parameters follows the team's `Utility.makeFortressException(String)`, which makes the prelude's exceptions without a message so; the code generator keeps a singleton in its static field `ONLY` (`CodeGen.java:5100-5106`), so both make a second instance (1103, below).
5. **The tests** exercise the defects; each file has one comment line; no message cites the specification by line.
6. **Programs of my own**, below, under walk and compiled, old against new.
7. **Homes.** The report names `u.asString` at `U extends ZZ32` by reading only, 'Not run, and no row added': my program measures it, and it now has an `XXX` test and a row (1101). Three more defects that my programs measured have homes now (row 994's new sites, 1102, 1103).
8. **The ledger and sibling sites.** `ledger-find` for `Bogus`, `FValue asString`, `asString generic` finds row 321 (the prelude's `FValue.toString` recursion), a sibling of 1101 and 1102. `git grep 'CompilerBuiltin\|CompilerLibrary'` over `nativeHelpers/`, `runtimeValues/` and `runtimeSystem/` finds no raise string left; the first set's classes that extend the prelude's stubs are the prelude's own, which the second set shadows or which no one-library run loads.
9. **The report.** Its provenance lines and cited lines open to what they say, but one: the deviation's `src-one/.../FValue.java:22` is the `@Override` of `getRTTI`; `asString` is at `:27` (corrected). The two Appendix I sentences said 'a program compiled against \library\ runs, as one that prints a line does': a program that prints a number does not (1098), nor one that compares two strings by `=` (row 994); corrected to 'can run, as one that prints a line of text does'. The suites' verdicts are those of `f3439cf7ce`, whose code the head carries.
10. **Competing declarations** of `LibraryObjects`, `exceptionClass`, `stringClass`, `stringTraitConverter`, `anyConverter`, `oneFlatStringApi`, `oneFlatString`, `classesFirst`, `buildOne`, `srcOne` and the new test names: `git grep -l` over `ProjectFortress/src`, `src-one`, the test folders, `build.xml` and `bin` finds each only where the rung declares and uses it.
11. **Failure modes.** The rung turns 'NoClassDefFoundError: fortress/FortressLibrary$String' into runs. One quiet value: an uncaught exception's report and every Java `toString` of a one-library value read the second set's placeholder, 'Bogus value from FValue.asString()' (1102); the run still exits non-zero and names the exception's class.

## The programs

The one library's fourteen jars: no tree held them (`default_repository/caches-one/bytecode_cache` held only a 0-byte `IgnoreFlatString.jar`, and `ant testSystem` had deleted `ProjectFortress/test-caches`), so I compiled the fourteen once, each in a fresh JVM, into a private caches folder under my scratch, which leaves the rung's build and caches as they were (`FORTRESS_LIBRARY=one FORTRESS_CACHES=<private> bin/fortress compile` of each, in the probe's order: every 'rc=0', FortressLibrary 132 s). Old code: `old-fortress.sh` of `/home/user/fortress-base41`. Each program at `FORTRESS_THREADS=1`; the carriers' programs also at 4, with the same output (`md5` of each output equal at 1 and 4).

| program | walk, old | walk, new | compiled, old | compiled, new |
|---|---|---|---|---|
| `OneCarriers` (each carried type's `asString`, `||`) | 11 lines, 'ZZ 13841287201', 'String abcd 4 true true' | the same | 'NoClassDefFoundError: fortress/FortressLibrary$String' | the 9 number, boolean and char lines alike, then row 994 at `=` of strings |
| `OneRaises` (five helper raises caught) | 'IntegerOverflow Integer Overflow', ..., 'ZZ DivisionByZero Division by zero', 'PASSED' | the same, also with `FORTRESS_LIBRARY=one` | the same `NoClassDefFoundError` | the same six lines as walk |
| `OneTypecase`, `OneSeqv` (`typecase` and `SEQV` on `Boolean`, `Char`, `String`) | 'Boolean true' ... 'RR64 2.5'; 'seqv Boolean true false' ... | | `NoClassDefFoundError` | the same lines as walk |
| `OneBooleanEq`, `OneStrings` (`=`, `<`) | 'eq Boolean true'; 'eq true', 'lt true' | | | 'NoClassDefFoundError: FortressLibrary' at `fortress.FortressLibrary⚙$=⟦...String...⟧...the_function` (row 994) |
| `OneGenericAsString` | 'REACHED', '<5>' | | | 'REACHED', 'NoSuchMethodError: 'fortress.FortressLibrary$String com.sun.fortress.compiler.runtimeValues.FZZ32.asString()'' (1101) |
| `OneUncaught` | 'IntegerOverflow' with its context, exit 1 | | `NoClassDefFoundError` | 'FortressException: class fortress.FortressLibrary$IntegerOverflow with string Bogus value from FValue.asString()', exit 1 (1102) |
| `OneSingletonRaise` | 'caught is the singleton true' | | | 'caught is the singleton false' (1103) |
| `OneVarargsIndex` (`xs[1]`, `xs[2]`) | '5', 'c' | | | verifier on: row 1091's 'Duplicate method name "copy"'; off: '5', 'c' (item 601's indices agree, as the report says) |
| `OneLibraryRunHello`, `OneLibraryCatchHelperRaises` (the rung's) | 'Hello, one library'; 'REACHED', 'PASS' | | | the same lines, at 1 and 4 threads |
| `PreludeRaises`, `PreludeUncaught`, `PreludeUncaughtMessage`, `PreludeSingletonRaise` (against the prelude) | | | 'IntegerOverflow Integer overflow', 'FortressException: class fortress.CompilerBuiltin$IntegerOverflow with string Integer overflow', '... FileNotFoundException with string [File not found: ...]', 'caught is the singleton false' | the same, line for line |

So no prelude program changed its answer, and the rung's two passing run tests print walk's lines. The new plain test `OneLibraryUncaughtRaise` (below) runs and reports another line than walk on standard error, a point to report.

## What I tried and left: fork C3 in the second set

The worker typed the second set's `FValue.asString` and `MutableFValue.asString` at `FValue`, fork C3's text, and kept the first set's at the prelude's `String`, because typing it at `FValue` there made `compiler_tests/Compiled17a` die: generic code calls a number's getter on the payload class, and `FZZ32.asString`'s bridge answers the first set's type. The same holds in the second set: there is no `FZZ32.asString()` at `fortress.FortressLibrary$String` (1101), and the generated getter `asString` of a one-library object, at the library's `String`, overrides nothing in the second set's `FValue`, so `FException` and every `toString` read the placeholder (1102).

In scratch (`javac` of the second set's `FValue`, `MutableFValue` and `FException` with `asString` typed at `fortress.FortressLibrary.String`, put before `build-one` on a hand-made run class path), `OneGenericAsString` printed '<5>' and `OneUncaught` 'with string Integer Overflow'; but a program that catches `fail` of a 481-character string then died, 'java.lang.StackOverflowError', where the head prints 'caught FailCalled 487': a `CatString`'s `asString` is itself (`Library/FortressLibrary.fss:4599`), so `FValue.toString`, `this.asString().toString()`, recurses, as row 321 recurses in the prelude. So the second set under the first set's map of names is not enough; a repair chooses among ways (a `toString` that reads a non-flat string, or the code generator calling a number's getter through the object's class, the worker's second question). Nothing on record settles it, so I made no fix: the defects have homes, and the question is for the curator.

## The corrections

1. `4383f42f6a`: homes, and the rows in `record.md`.
   - `one_library_tests/OneLibraryGenericAsString.fss`, `.test` (compile) and `XXXOneLibraryRunGenericAsString.test` (run, `run_out_contains=REACHED`): 1101, home 2 (`basic/expressions/field-access.tex`, "Dotted Field Accesses").
   - `one_library_tests/OneLibraryStringEquality.fss`, `.test` and `XXXOneLibraryRunStringEquality.test`: row 994, home 2; the row's rewrite in `record.md` now names `=` and `<` of strings and `=` of booleans and takes this test as its reproducer, where it had `none`.
   - `one_library_tests/OneLibraryUncaughtRaise.fss` and `.test` (`run_exits_nonzero=true`, `run_err_contains=` the report line): 1102, home 3, since the specification does not say how a program's abrupt completion is reported (`basic/evaluation/completion.tex`, "Normal and Abrupt Completion of Evaluation", whose note asks it).
   - `record.md`: record line 5's '(not run)' replaced by the measured line; record line 6 names row 994's new sites.

   Echoed, then run on the base's code: 'Expected failure: on the base's code the three compiles OK; the runs of XXXOneLibraryRunGenericAsString, XXXOneLibraryRunStringEquality and OneLibraryUncaughtRaise red, each dying before REACHED at the one library's first class, ...'; `FORTRESS_LIBRARY=one old-fortress.sh /home/user/fortress-base41 <tree>/tmp/old-caches-one junit <the five .test files>`:

       . run .../OneLibraryGenericAsString (234ms) Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
       Failed to satisfy run_out_contains; expected
       REACHED
       Tests run: 6,  Failures: 3,  Errors: 0

   On the head, `cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES=<private, with the fourteen> ../bin/fortress junit <the five>`:

       . run one_library_tests/OneLibraryGenericAsString (1012ms) REACHED
       Caused by: java.lang.NoSuchMethodError: 'fortress.FortressLibrary$String com.sun.fortress.compiler.runtimeValues.FZZ32.asString()'
       Saw expected failure (Exit code != 0)
       FortressException: class fortress.FortressLibrary$IntegerOverflow with string Bogus value from FValue.asString()
       OK (6 tests)

   The first `XXX` test, run once with its generic call replaced by `println("<5>")` and then restored: 'Did not see expected failure', 'Tests run: 2,  Failures: 1'.
2. `509181e9c3`: Appendix I. Before (`Specification/appendices/changes.tex:4052-4053` and `:6416-6417` at the worker's head): "A program compiled against \library\ runs, as one that prints a line does, but the class of the array ..." and "and a program compiled against \library\ runs, as one that prints a line does, but not one that calls a declaration with a varargs parameter". After (`:4053-4057`, `:6417-6420`): "can run, as one that prints a line of text does". `REPORT.md` quotes the new text and cites `FValue.java:27`.
3. `f644941c3d`: `one_library_tests/OneLibraryHelperRaiseSingleton.fss`, `.test` and `XXXOneLibraryRunHelperRaiseSingleton.test`, with 1103 in `record.md`: home 2 (`basic/objects.tex`, "Object Declarations": "every instantiation of such an object with the same static arguments yields the same singleton object"). Base: 'Failed to satisfy run_out_contains; expected REACHED', 'Tests run: 2,  Failures: 1'. Head: 'REACHED', 'FAIL: the caught IntegerOverflow is the object IntegerOverflow', 'Saw expected failure (Exit code != 0)', 'OK (2 tests)'. Walk: 'REACHED', 'PASS'.

No code changed, so no build and no suite ran for them; the gate runs the onelibrary track with the six new tests.

## Where I differ from the worker

- Decision 1 (fork C3 in the second set only): the evidence the worker gives for the first set holds for the second (1101), and it costs the uncaught report (1102); I leave the code as it is, for the reason above.
- Decision 5 (the constructor without parameters): it follows the team's way, but a caught `FileNotFoundException` of the one library is then a second instance (1103), as the prelude's `IntegerOverflow` already is on the base.
- Fork B2's premise, that only `Arr` and `Dot` meet row 994, does not hold on the compiled one library: every `=` of two strings or two booleans meets it, with the verifier on (`XXXOneLibraryRunStringEquality.test`).
- The report's home 3 for 1098 is an `XXX` test, home 2's form; the program's answer, the half printed, is the same under both export rules, so the form is right, and only the rule is contested.

## For the curator

- Fork C3 in the second set: type its `FValue.asString` at the one library's `String`, as the first set's is at the prelude's, with a `toString` that reads a non-flat string; or call a number's getter through the object's class; or keep it at `FValue`? Evidence: 1101, 1102, and the scratch run's `StackOverflowError` above.
