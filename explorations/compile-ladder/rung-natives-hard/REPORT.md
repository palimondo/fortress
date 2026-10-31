<!-- Rung H of climb batch 24 (rung-natives-hard): the compiled path's rewrite of a builtinPrimitive binding composes a binding over NN32, NN64 or Char with the six transfer helpers, and 76 bindings of NN32, NN64 and Char name their existing helpers. Written 2026-10-31 by the rung worker on branch wip/rung-natives-hard, cut from b0f6cd6b7. -->

# Rung H: the hard set's 76 over `Char`, `NN32` and `NN64`

- problem: moved onto their existing helpers as bare strings, the hard-set probe's four bindings over `NN32`, `NN64` and `Char` gave the distance 4 on the base code, 'Could not check call to function builtinPrimitive_simpleUnsignedIntArith_unsignedIntOverflowingAdd - (ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type (NN32, NN32).' (`explorations/compile-ladder/plan-24/probes/hard-set.md:8`); this rung's `NativeHelperTransferCompiled` on the base: 'File NativeHelperTransferCompiled.fss has 71 errors.' (`ProjectFortress/compiler_tests/NativeHelperTransferCompiled.fss:5`).
- spec: `Specification/basic/operators/opr-overview.tex:164-165`, "For integer results, division by zero throws a \TYP{DivisionByZero}.", for the one value that moves; for the rewrite itself none: `grep -rn 'builtinPrimitive\|nativeHelpers' Specification/basic Specification/basic-lib` prints nothing.
- precedent: the prelude's own composition through the six transfers, `opr +(self, other:NN32): NN32 = jMakeNN32FromZZ32(jUnsignedIntOverflowingAdd(jMakeZZ32FromNN32(self),jMakeZZ32FromNN32(other)))` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:768`; `:815` for `widen`, `:1112` for `toUpperCase`), and climb batch 23's rewrite that this extends (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:97-159`).
- deviation: the rung's text is the planner's `rung-H.patch` with three changes of wording and none of behaviour: the in-code comment no longer names the probe's way (`BuiltinPrimitiveRewriter.java:132-134`), the class comment says what the rewrite now does (`BuiltinPrimitiveRewriter.java:23-31`), and `declared.add(0, owner == null ? null : owner)` is written `declared.add(0, owner)` (`BuiltinPrimitiveRewriter.java:126`); the specification spells nothing here.
- historical: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:391-466`, `:612-722` and `Library/FortressLibrary.fss:917-984`, both of the team's 2012 tree (`a874948ac`); `BuiltinPrimitiveRewriter.java` is the revival's.

## 1. What changed and why

P-58 has each native binding name a static helper of `nativeHelpers/`, checked against its helper from the step that moves it. For a binding over `NN32`, `NN64` or `Char`, walk already carries the declared type in a Java `int` or `long` (F-299), but the compiled checker reads every helper's `int` as `ZZ32` and `long` as `ZZ64`, except for six transfer helpers with fixed names (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:368-390`, `:493-504`; F-298). Question 2 of the batch record took the hard-set probe's way 2b at its default (`explorations/coordinator/CLIMB-BATCH-24.md:90-100`): the compiled path's rewrite composes the call with those six transfers, as the team's prelude does.

- **The rewrite** (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java`, +95 −12). Each declaration is told its owner, the simple name of the enclosing trait or object, `""` for a generic one, `null` at the top level (`:75`, `:91`). `fn` records each argument's declared type by its simple name, `self` taking the owner's (`:113-127`). Where the string names exactly one public static method of that name and arity (`soleMethod`, `:196-206`), each argument whose helper parameter is an `int` or a `long` that `NamingCzar.fortressTypeForForeignJavaType` reads otherwise than the declared `NN32`, `NN64` or `Char` (`Character` in the compiler's prelude) is wrapped in the matching transfer, and so is the call where the declared result type differs from the reading of the helper's result (`transfer`, `:176-193`; `:135-157`). A position the helper's own name already reads at the declared type, as each transfer's, gets none. So `opr +(self,b:NN32):NN32 = builtinPrimitive("…unsignedIntOverflowingAdd")` is checked and compiled as `makeNN32FromZZ32(unsignedIntOverflowingAdd(makeZZ32FromNN32(self), makeZZ32FromNN32(b)))`. Walk is untouched: its repository has the rewrite off (F-298), and walk carries these types by the declaration (F-299).
- **The 76 strings**, each naming the binding's existing helper, line for line `explorations/compile-ladder/plan-24/probes/families-base.tsv`'s family H (a script read each of the 76 lines after the patch: 76 'ok'): value object `NN32`'s 20 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:391-466`), trait `NN64`'s 17 (`Library/FortressLibrary.fss:917-984`), value object `Char`'s 39 (`FortressBuiltin.fss:612-722`). The library now has 97 bindings that name a helper, 36 in `FortressLibrary.fss` and 61 in `FortressBuiltin.fss` (`grep -c 'builtinPrimitive("com.sun.fortress.nativeHelpers\.'`), where the base had 19 and 2.
- **Left on their glue classes**, as the brief gives them: `NN32`'s `asFloat` (`FortressBuiltin.fss:396-397`, climb batch 23's fork 12); `NN32`'s `CHOOSE` (`:448-449`), which needs rung K's helper fix and this rewrite both; `UnsignedLong`'s `asString` and `asExprString` (`:478-481`, row 326); `NN64`'s prefix `DOTMINUS` (`Library/FortressLibrary.fss:936-937`, row 860); `Char`'s `asExprString` (`FortressBuiltin.fss:614-615`, row 861).

## 2. The tests: the failing runs and the passing runs

All in the base's code state first, in my worktree before its edit was built (the library unedited for the walk run, the Java unedited for the compiled run); then after the build of the edit, the library order and no later change of code.

**Walk, on the base** (`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-hard/h-base` on the three walk guards, the two division tests and the `XXX` test, 11:21 UTC, tree `b0f6cd6b7`):

    . interpret tmp/rung-natives-hard/h-base/tests/NN32DivisionByZeroWalk
     UNEXPECTED exception
    java.lang.ArithmeticException
    Caused by: java.lang.ArithmeticException: / by zero
    Tests run: 6,  Failures: 2,  Errors: 0

The other failure is `NN64DivisionByZeroWalk`, the same lines; `NativeHelperFamilyNN32Walk`, `NativeHelperFamilyNN64Walk` and `NativeHelperFamilyCharWalk` 'OK'; `XXXNN32RemainderByZeroWalk` 'java.lang.ArithmeticException', 'OK Saw expected exception'.

**Compiled, on the base** (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests` on the three compiled guards, the rewrite's test and the row-860 pair, 11:25 UTC, tree `b0f6cd6b7`):

    . link ProjectFortress/compiler_tests/NativeHelperTransferCompiled ProjectFortress/compiler_tests/NativeHelperTransferCompiled.fss:5:34-125:
        Could not check call to function builtinPrimitive_simpleUnsignedIntArith_unsignedIntToString
        - ZZ32->JavaString is not applicable to an argument of type NN32.
    File NativeHelperTransferCompiled.fss has 71 errors.
    Tests run: 10,  Failures: 4,  Errors: 0

The 71 are the test's 71 declarations that need a transfer; its six declarations that bind the transfers themselves compiled. The three compiled guards '. link … OK' and '. run … PASS'; the row-860 pair's link 'File XXXNN64WrappingNegationHelperCompiled.fss has 1 error.', red, as expected before the rewrite.

**Compiled, after** (the same script, label `after`, 11:29 UTC, with climb batch 23's helper tests beside them):

    . link ProjectFortress/compiler_tests/NativeHelperTransferCompiled  OK (time = 4008ms)
    . run ProjectFortress/compiler_tests/NativeHelperTransferCompiled (754ms) PASS
    . run ProjectFortress/compiler_tests/XXXNN64WrappingNegationHelperCompiled (275ms) REACHED
    FAIL:  the wraparound negation of the NN64 1 is 2^64-1
    Saw expected failure (Exit code != 0)
    OK (16 tests)

The three compiled guards link and run 'PASS' again; `NativeHelperBindingCompiled` 'PASS'; `XXXNativeHelperMisfitCompiled`, `XXXNativeHelperMisspeltCompiled`, `XXXNativeHelperOutsidePackageCompiled` and `XXXNativeHelperVarargsCompiled` 'Saw expected failure', as before.

**Walk, after** (`harness-one.sh $PWD/tmp/rung-natives-hard/h-after`, 11:30 UTC, the six above with climb batch 23's seven helper tests and `ZZ32DivisionByZeroWalk`):

    . interpret tmp/rung-natives-hard/h-after/tests/NN32DivisionByZeroWalk
    NN32 DIV by zero: DivisionByZero
     OK (time = 583ms)
    NN64 DIV by zero: DivisionByZero
    OK (14 tests)

`XXXNN32RemainderByZeroWalk` still 'OK Saw expected exception' on the edit.

**The first `XXX` test red on a deliberate fix** (`XXXNN32RemainderByZeroWalk`, its `REM` changed to `DIV` for one run on the edit, where `DIV` by zero raises, then restored; `git status` clean after): ' Missing expected failure', 'Tests run: 1,  Failures: 1,  Errors: 0'.

**`CharAsStringSupplementaryWalk`**, which pins today's value (section 9), passes on both codes: on the edit 'OK (1 test)'; on the old code (`FORTRESS_HOME=/home/user/fortress-base23 /home/user/fortress-base23/explorations/compile-ladder/rung-inference-walk/harness-one.sh`, tree `1f5c49b4f`) 'OK (1 test)'.

The tests:
- walk guards `ProjectFortress/tests/NativeHelperFamilyNN32Walk.fss` (all 20 of `NN32`'s moved bindings at 0, 7, 2^16, 2^31 and 2^32-1, each overflow raising `IntegerOverflow` and each wrap asserted), `NativeHelperFamilyNN64Walk.fss` (the 17 at 0, 7, 2^32, 2^63 and 2^64-1, `narrow` keeping the low 32 bits as `basic-integers.tex`, section "Integers", gives it) and `NativeHelperFamilyCharWalk.fss` (the 39 over ASCII letters, a digit, a space, U+03A3, U+10400, both surrogates, the title-case U+01C5 and its pair, U+0378 unassigned, U+0000 and a newline; `javaDigit` through `digit`, since the api does not export it, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:253`). Not asserted, as the brief asks: `signed` above the signed half and `char` out of range (rows 856, 857), and `asString` past U+FFFF (section 9).
- compiled guards `ProjectFortress/compiler_tests/NativeHelperFamilyNN32Compiled.fss`, `…NN64Compiled.fss`, `…CharCompiled.fss` with their `.test` files: one top-level declaration per helper, 17, 15 and 39 (71 distinct helpers for the 76 bindings), at the Java types the compile reads (`ZZ32`, `ZZ64`, `Boolean`, `JavaString`), the same values asserted in their carriers, and each `Div` by zero raising `DivisionByZero`.
- the rewrite's test `ProjectFortress/compiler_tests/NativeHelperTransferCompiled.fss` with its `.test`: the same 71 helpers bound at the declared types over `NN32`, `NN64` and `Character`, `javaDigit`'s mixed `Character` and `ZZ32`, `widen` (`NN32` to `NN64`) and `narrow` (`NN64` to `NN32`) among them, and the six transfers bound at their own types, which get no transfer.
- `ProjectFortress/tests/NN32DivisionByZeroWalk.fss`, `NN64DivisionByZeroWalk.fss`; `XXXNN32RemainderByZeroWalk.fss`, owed to row 848 by the post-batch review's finding 7 (`explorations/coordinator/PLAN.md:639`).
- row 860's pair: `ProjectFortress/compiler_tests/XXXNN64WrappingNegationHelperCompiled.fss`, `NN64WrappingNegationHelperCompiledLink.test` and `XXXNN64WrappingNegationHelperCompiled.test` (`run_out_contains=REACHED`).
- `ProjectFortress/tests/CharAsStringSupplementaryWalk.fss` (section 9, home 3).

## 3. Where the fix belongs, and the precedent

The place is the record's: Question 2 took way 2b, the compiled path's rewrite (`CLIMB-BATCH-24.md:90-100`); `explorations/coordinator/map/modules-and-phases.md`, B.12, puts the compiled path's native binding in `import java` through `ForeignJava`, which the rewrite generates (F-298). The library's own way for these types is the team's: the six transfers composed around each operation's helper, written by Guy Steele for `Character` (`c2c769094`, 2011-06-24: "two trivial transfer functions … so that no one would stumble across them by accident") and copied by Jean-Baptiste Tristan for `NN32` and `NN64` (`25f7cf913`, 2011-11-23; `b22c4ac56`, 2012-01-03). In the prelude today the six transfers' aliases occur 309 times on 166 lines of `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` (`grep -o` of the six aliases, the import lines among them), and 8 lines of `Library/CompilerLibrary.fss`; the rewrite writes the same composition, so the 76 bindings keep P-58's bare form in the source.

The ways (the probe's section 4, measured on its sample of four): way 1, a helper with a special name per binding (distance 1, no name rule for `javaDigit`'s two `int`s); way 2a, the foreign-type table reading the declared types (order-dependent, distance 1); way 2b, this one (distance 0); way 3, a converting declaration written in the library (distance 0, against P-58's "it keeps that form" by the probe's Q3). Within 2b, the transfer could also be emitted as a type ascription or coercion in place of a call; not taken, since the checker reads no Java `int` as `NN32` except through the six names, and the transfers are what the prelude's compiled code already calls.

## 4. What the specification settles

`Specification/basic/operators/opr-overview.tex:164-165`: "For integer results, division by zero throws a \TYP{DivisionByZero}." It is now true under walk of `NN32`'s and `NN64`'s `DIV`, false still of their `REM` and `MOD` (row 848). `opr-overview.tex:205-209` (section "Addition and Subtraction Operators") gives the wraparound operators, which the guards assert and which row 860's pair asserts of the `NN64` helper. `Specification/basic-lib/basic-integers.tex:39-45` gives `narrow`'s low 32 bits, which the `NN64` guards assert. The specification says nothing of `builtinPrimitive` (the grep above), of a `Char`'s `asString` or of the six transfers.

## 5. Programs run old against new

- The guards, the division tests and the `XXX` test, through the harness on the base's code and on the edit (section 2).
- `ValH76`, a scratch program, not kept, written out by a short generator in the form of the planner's `ValH` (`explorations/compile-ladder/plan-24/probes/NOTES.md`, "How to run them again"), printing 2,933 results of the 76: the 20 of `NN32` over the five `NN32` values, unary and pairwise, the 17 of `NN64` over the five `NN64` values, the 39 of `Char` over 14 characters (the planner's: ASCII letters, a digit, a space, U+00E9, U+03A3, U+1F600, both surrogates, U+01C5, U+0660, U+2028, with U+10400 and U+0378), each overflow caught as `IntegerOverflow`, `DIV` by zero left out. `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 $PWD/tmp/old-caches ValH76.fss` (rc 0, 2,933 lines) and `bin/fortress ValH76.fss` (rc 0, 2,933 lines): `diff` prints nothing; 122 of the lines are `IntegerOverflow` on both.
- A scratch compiled program over the prelude's `Character`, in a private caches copy: `makeCharacter(66560).asString = makeCharacter(1024).asString` and the same for U+1F600 and U+F600 print 'true' and 'true' (section 9).

## 6. The suites

On the edit, after its build and the library order, once each (the brief's fork 9: the parser runs the rewrite on the compiled path's repository and both paths run the parser):

- `ant testQuick` (11:34-11:39 UTC): 'BUILD SUCCESSFUL', 'Total time: 4 minutes 51 seconds'; compiler 'Tests run: 1348, Failures: 0, Errors: 0', library 'Tests run: 86, Failures: 0, Errors: 0', othercompiler 'Tests run: 263, Failures: 0, Errors: 0'. Climb batch 23's gate: 1338, 86, 263 (`explorations/compile-ladder/climb-batch-23/gate/summary.txt:2-3`, `:55`); the 10 more are this rung's six `.test` files (four with `link` and `run`, two with one each).
- `ant testSystem` (11:39-11:43 UTC): 'BUILD SUCCESSFUL', 'Total time: 3 minutes 23 seconds'; shards 182, 167, 179 and 173, 'Failures: 0, Errors: 0' each, 701, against 694 at climb batch 23's gate (`summary.txt:57-60`); the 7 more are this rung's walk tests.
- `ant testOnly -DtestPattern=NamingCzarJUTest`: 'Tests run: 3, Failures: 0, Errors: 0', as at the gate (`summary.txt:29`).

No test's verdict changed: every test of the gate's tracks and shards passes as before; the new ones pass, the `XXX` ones as expected failures.

## 7. The stages and the ladder

The edit is under `ProjectFortress/src/com/sun/fortress/compiler/`, so both stages can move; each ran once, on the final code (`c4424fd10`), after the build. Their before is climb batch 23's landed tables (`explorations/compile-ladder/climb-batch-23/gate/checker-count.txt`, `distance.txt`) and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv`, which holds no site.

- **The count** (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-hard/checker-count-postedit.txt tmp/rung-natives-hard/cc-post`, 11:43-11:45 UTC, 132 s, load 4.7 at start with another rung's agent running, nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`): '#total 0', '#locations 0', '#crash none', every api row 0, `com.sun.fortress.nativeHelpers 0` among them. `diff` against climb batch 23's table prints nothing. Trait `NN64`'s 17 sit in `FortressLibrary`, which the count reads.
- **The distance** (`explorations/coordinator/tools/distance/run.sh tmp/rung-natives-hard/distance-postedit.txt tmp/rung-natives-hard/dist-post`, 11:46-11:50 UTC, load 1.22 at start): '#total 0', every `#kind` 0, '#crash none', '#seconds 170 FortressLibrary 125'. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-23/gate/distance.txt tmp/rung-natives-hard/distance-postedit.txt` prints 'DISTANCE SAME   0'; the two tables differ only in their `#seconds` and `#machine` rows. The run's `errors.tsv`, read by row against the per-site list, holds its header only, so no site came or went. `NN32`'s 20 and `Char`'s 39 sit in `FortressBuiltin`, which only the distance reads; it reads them as calls of their helpers through the transfers, as the hard-set probe's control showed on the same rewrite (two misfitting strings, distance 2; `explorations/compile-ladder/plan-24/probes/hard-set.md:65`).
- **The ladder subset**: the five files whose first error in the baseline names something this rung touched, `builtinPrimitive` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`: `XXXarityTestFn.fss`, `XXXfailTestFn.fss`, `XXXnoclassNativeFn.fss`, `nativeTestFn.fss`, `testPrim.fss`), run after the edit with the gate's drivers copied under `tmp/rung-natives-hard/ladder/` (`run-subset.sh`, then `classify.py`): 'disambiguate 5', each 'Variable builtinPrimitive is not defined.', since each string names a glue class, which the rewrite leaves alone. None is among the 85 of the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-23/gate/ladder/ladder.tsv`), nor in the baseline's `raw/`, which holds those 85; against the baseline's `ladder.tsv` rows, phase and first error, `diff` prints nothing. No move. The microGPT components' phases are the gate's: their first errors name no binding (decision 8).

No speed pass: the rung changes the rewrite at the parse, not the checker's code (fork 14).

## 8. Sentences made false

- `Specification/appendices/changes.tex:4466-4473`, the Effect of "A native binding that names a static helper": "Twenty-one of the 449 bindings of \library\ name a helper: …" and "The other 428 still name a glue class, which the compiled code cannot call." On this tree 97 name a helper and 352 a glue class; the 76 are `NN32`'s 20, `NN64`'s 17 and `Char`'s 39.
- `changes.tex:4484-4488`: "… and so do \EXP{\div}, \OPR{REM} and \OPR{MOD} on \EXP{\mathbb{N}32} and \EXP{\mathbb{N}64} …": `DIV` on `NN32` and `NN64` now throws `DivisionByZero`; `REM` and `MOD` on them still end the run. (The Effect is the gather's, fork 7.)
- Row 848's claim (`explorations/fortress-gap-ledger.md:547`): "`DIV`, `REM` and `MOD` by zero on `NN32` and `NN64` … end the run": `DIV` no longer does (rewritten in `record.md`).
- F-298 (`explorations/coordinator/FACTS.md:133`): "In walk's world the checker reads the helper's Java types as the one library's, `int` as `ZZ32`, `String` as `String`": still true of the reading, but a binding over `NN32`, `NN64` or `Char` is now checked as a composition through the transfers, which the entry does not say.
- F-299's count (`FACTS.md:134`): "21 of the one library's 449 live bindings name one" and "the other 428 still name glue classes": 97 and 352 on this tree.
- F-32's count (`FACTS.md:30`): "of its 449 live bindings, 428 name one": 352 on this tree.
- The `fortress-repo` skill's `compiler.md`, "Natives" (`.claude/skills/fortress-repo/references/compiler.md:85`): "So a binding over `NN32`, `NN64` or `Char` that names any other helper is a type error for the checker." It is no longer: the rewrite composes it with the transfers, and the checker reads the composition; a binding over these types whose helper's Java type is no `int` or `long` where the declaration says `NN32`, `NN64` or `Char`, or whose helper is overloaded at its arity, still is.
- The batch record's left-out line, "Rung C's limits and review-routed.1 … for the next rung that edits the natives' rewrite; no rung of this batch does." (`explorations/coordinator/CLIMB-BATCH-24.md:431`): this rung edits that rewrite (section 12).

Stays true: `builtinPrimitive`'s comment, "The compiler, before type checking, rewrites the body into a call of the helper, which the type checker checks against the helper's Java signature" (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19`): the body is still a call of the helper, inside its transfers; and `opr-overview.tex:165` becomes true of `NN32`'s and `NN64`'s `DIV`.

## 9. Defects, each with its home

- **`NN32`'s and `NN64`'s `DIV` by zero ended walk's run** (row 848's `DIV` half): home 1, repaired by the two moves, asserted in `NN32DivisionByZeroWalk` and `NN64DivisionByZeroWalk`, which failed on the base and pass on the edit.
- **`REM` and `MOD` by zero on `NN32`, `NN64` and `ZZ` end walk's run** (row 848's rest): home 2, the specification settles it (`opr-overview.tex:164-165`): `XXXNN32RemainderByZeroWalk`, an expected failure on the base and on the edit, red on a deliberate fix; set as row 848's reproducer.
- **`unsignedLongWrappingNeg` answers its operand** (row 860): home 2 (`opr-overview.tex`, section "Addition and Subtraction Operators"): the compiled pair `NN64WrappingNegationHelperCompiledLink` and `XXXNN64WrappingNegationHelperCompiled`, which this rung's rewrite makes reachable: its link passes, its run prints 'REACHED' and fails 'the wraparound negation of the NN64 1 is 2^64-1'; set as row 860's reproducer. `NN64`'s prefix `DOTMINUS` stays on its glue class.
- **`Char`'s `asString` of a character past U+FFFF answers its low 16 bits' character** (new, NEW-H-1): home 3, since the specification gives `Char` no `asString` and says only that a string is "a sequence of \unicode\ characters" (`Specification/basic/expressions/literals.tex:57-58`), while the api says "we don't presently deal gracefully with %Char%s outside the 16-bit plane" (`Library/FortressLibrary.fsi:2578-2580`) and the helper's own comment "This implementation is incorrect for supplementary characters!" (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleChar.java:17`). Measured: walk's glue (`interpreter/evaluator/values/FChar.java:100-102`, `String.valueOf((char) val)`) and the helper (`simpleChar.java:16-19`, `Character.toString((char)x)`) alike, `ValH76`'s 'c 6 asString' and 'c 12 asString' the same bytes on both codes (U+F600 and U+0400), and the compiled prelude's `Character` `asString` (`CompilerBuiltin.fss:1065`) the same, 'true' twice. Test `CharAsStringSupplementaryWalk`, today's value, on both codes; the guards do not assert it. No value moves by this rung: the glue answered the same.

## 10. Points to report

- **rung-H.patch, taken with three wording changes**, none of behaviour (the deviation line above; `BuiltinPrimitiveRewriter.java:23-31`, `:126`, `:132-134`); every one of the 76 bindings moved as `families-base.tsv` gives it; none of the 76 left on its glue class; the six of the 82 left out as the brief lists (section 1).
- **Guards, rewrite test, division tests and `XXX` tests before and after**: section 2.
- **The distance and the count on the final tree**: section 7: the count '#total 0', '#locations 0', '#crash none', its table equal to climb batch 23's, in 132 s; the distance '#total 0', '#crash none', 'DISTANCE SAME   0'; no site comes in either.
- **`ant testQuick` and `ant testSystem`**: 'BUILD SUCCESSFUL' each, no verdict changed (section 6).
- **Walk values beyond `NN32`'s and `NN64`'s `DIV` by zero**: none moves (`ValH76`, 2,933 lines, `diff` empty; the guards on both codes).
- **Row 848's rewritten line and the reproducers of rows 848 and 860**: `record.md`; reproducers `ProjectFortress/tests/XXXNN32RemainderByZeroWalk.fss` and `ProjectFortress/compiler_tests/XXXNN64WrappingNegationHelperCompiled.test`.
- **Every sentence made false**: section 8.
- **A file edited beyond those named**: none beyond the brief's files list; the new test `ProjectFortress/tests/CharAsStringSupplementaryWalk.fss` is within its "your tests". No edit of the checker's Scala, `NamingCzar`, `interpreter/` or `nativeHelpers/`: `git diff --name-only b0f6cd6b7` lists `Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java`, this folder and the tests.

## 11. Decisions

1. **The planner's text, with three wording changes.** Taken: `rung-H.patch` as the probe built and measured it, its Java unchanged in behaviour; the in-code comment's "The hard set's way 2b:" dropped, since a source comment carries no pointer to the record (the skill's `committing.md`, "Put provenance and rationale in commit messages and reports"); the class comment extended, since it described the body as `alias(args)` only; the ternary that returned its own argument simplified. Not taken: the text as it is (its comment names a record label and its class comment would describe the rewrite short of what it does); a rework of the rewrite (none needed: every test and both stages pass on the text).
2. **The guards' values and form.** Taken: the brief's values, each binding asserted at ordinary values, at both sides of the signed half and at the type's top, each overflow by `IntegerOverflow`, through `asString` comparisons under walk (an `NN32` or `NN64` with a numeral answers another type under walk, row 484), and in their Java carriers in the compiled guards. Not taken: asserting through each type's `=` only, which would read every result through one moved binding.
3. **The rewrite's test covers all 71 helpers, and the six transfers.** Taken: every helper the 76 bindings name, at the declared types, and the six transfer bindings, which must compile unchanged. Not taken: a sample of the shapes only, which would leave a helper's composition run by no compiled test before the switch-over.
4. **`javaDigit` through `digit` in the walk guard.** Taken, as the probe's sample did: the api does not export `javaDigit` (`FortressBuiltin.fsi:253`, commented out). Not taken: a test api exporting it.
5. **The first `XXX` test's deliberate fix on the edit, not on the base.** Taken: `REM` changed to `DIV` for one run on the edit, where `DIV` raises; on the base `DIV` by zero ends the run too, so no one-token change there shows the harness's red. Not taken: a change that throws `DivisionByZero` by hand, which tests the harness and not the binding.
6. **`Char`'s `asString` past U+FFFF at home 3 with a pin.** Taken: the specification gives `Char` no `asString`, and the team called the form a known limit (section 9). Not taken: home 2 with an `XXX` test asserting the full character, which would read a rule into a specification that does not state it; or leaving it unrecorded, since the guard's omission would then hide a measured value.
7. **Row 860's reproducer, the run test.** Taken: `XXXNN64WrappingNegationHelperCompiled.test`, the test whose expected failure is the defect, with the link test named in the notes. Not taken: the link test, which passes.
8. **The ladder subset.** Taken: the five baseline files whose first error names `builtinPrimitive` (section 7). Not taken: the microGPT components, whose first errors name no binding (`explorations/compile-ladder/climb-batch-23/gate/ladder/microgpt-phase.md`: 'Array is undefined.', 'Char is undefined.', …) and which the gate runs.

## 11a. Limits of the rewrite, by reading, not measured

None is reached by a binding of the library today: each of the 76 names a helper with one public static method of its name and arity, in a non-generic owner, with a declared result type.
- A helper overloaded at one arity (`soleMethod` returns null, `BuiltinPrimitiveRewriter.java:196-206`) gets no transfer, so a binding of it over `NN32`, `NN64` or `Char` stays a type error for the checker.
- In a generic trait or object the owner is `""` (`:91`), so `self` gets no transfer.
- A declared type is read by its simple name, a trait type without static arguments or a type variable (`simpleName`, `:169-174`); a program's own trait named `NN32` or `Char` would be composed as the library's.

## 12. For the curator

- The batch record leaves "Rung C's limits and review-routed.1" to "the next rung that edits the natives' rewrite; no rung of this batch does" (`explorations/coordinator/CLIMB-BATCH-24.md:431`), and the post-batch review's finding 5 owes its probe to that rung (`explorations/coordinator/PLAN.md:638`). This rung edits the rewrite (`BuiltinPrimitiveRewriter.java:97-159`) and does not take the step, since its section does not name it: does the step stay with the next such rung, or with this one in a follow-up? Default: the next one, as the record's line says, its sentence corrected.

## 13. Commands worked out

- The 76 checked against the families table: `awk -F'\t' '$1=="H"{print $2"\t"$7}' explorations/compile-ladder/plan-24/probes/families-base.tsv`, then for each line `sed -n "$((l+1))p"` of its file grepped for `"com.sun.fortress.nativeHelpers.<helper>")`.
- The old code's walk harness on one new test: `FORTRESS_HOME=/home/user/fortress-base23 /home/user/fortress-base23/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/<dir> <tree>/ProjectFortress/tests/X.fss`, as `worktrees.md` gives it.
- A compiled scratch program in a private copy of the caches: `cp -a default_repository/caches $Q/caches; export FORTRESS_CACHES=$Q/caches`, then `java $JAVA_FLAGS -Dfortress.caches=$Q/caches -cp "$(bin/fortress_classpath | tail -1)" com.sun.fortress.Shell compile P.fss` and `bin/fortress run P` from `$Q`.
