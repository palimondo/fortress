# Rung C of climb batch 33: the skeptic's verdict

One launch of the skeptic's role worked this rung. Head judged: `03b3698ca7`, the worker's last commit. The branch already carried `REPORT.md` and `record.md`, byte-equal to the run journal's texts (`journal-text.py` wrote 32,246 and 14,518 bytes to scratch; `cmp` against the branch's files printed nothing), so no commit of them was made. My fixes are four commits, `9a63964d4f`, `a0477b7256`, `56ed43009a` and `677684d547`; none changes Java or Scala, so nothing was built and no suite was run after them. The count and distance tables of `REPORT.md` are those of the worker's head (their code is that of `89819a591d`; every later commit of the worker and every commit of mine changes tests or prose only).

**Verdict: approved.** The four repairs are right, as small as their rows need, and follow their precedents; the tests were seen failing on the base's code before the first build and passing after the last change of code. What I found and fixed is the record and the tests: two lines of the change that no assertion reached, one form the change repairs that the record did not hold, a measured sibling defect without a home, and a changed refusal message the record did not name. No fix is contested.

## What I checked

1. **The stages.** The worker's files: `tmp/rung-checker-small-gaps/checker-count-postedit.txt` equals `explorations/compile-ladder/climb-batch-31b/gate/checker-count.txt` (`diff` prints nothing; `#total 0`, `#locations 0`, `#crash none`); `distance-postedit.txt` differs from climb batch 31b's `distance.txt` only in its `#seconds` and `#machine` rows, with `#total 0` and every `#kind` 0; `dist-post/errors.tsv` holds its header alone. The worker's count stage started at 18:17:25 (call `RfP3pS`) and its distance stage at 18:22:43 (`Shk5yk`), both in this tree after its last change of code, the `ExportChecker.scala` edit at 17:57:49 (`hgZ5AK`). I ran the count stage myself, with the command of the skill's `compiler.md`, "The checker's time", on the base build and on the worker's head, one after the other, on an idle machine (nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`):

       time nice -n 19 explorations/coordinator/tools/checker-count/run.sh <out> <scratch>
       base   (/home/user/fortress-base37, start 2026-11-17T20:26:51Z, load 0.80):  real 1m20.217s
       change (this tree at 03b3698ca7, start 2026-11-17T20:28:44Z, load 0.93):      real 1m21.080s

   The two tables are equal, the two `run.txt` files (33 lines each) are equal once each run's tree and scratch paths are replaced by one word, and both equal the worker's (`diff` of each pair printed nothing). The worker's times, 92 s on the base and 119 s on the change under the batch's load, are of the same size; no slowdown shows.

2. **Test first.** In the worker's transcript: the four renamed tests and the two new ones ran through `junit.sh` at 17:47:47 (call `QcyJsi`, finished by 17:47:55, `Tests run: 12,  Failures: 8,  Errors: 0`) on the seeded base build, before the first edit of code at 17:48:19 (`YUVG1r`) and its build at 17:48:26; the lines that `recordedFailure` quotes are in that output. Each repair was then built and its test run in turn (`pass1060`, `pass1005`, `pass1029`, `pass1028`: the last printed `OK (9 tests)` at 18:00:10, call `1mvfdU`). The last run after the last change of code is `ant testFast` at `b0f95e758d`, started 18:02:13: `BUILD SUCCESSFUL`, `Total time: 14 minutes 52 seconds`, and in `ProjectFortress/TEST-RESULTS/fast-*`: `Tests run: 1701, Failures: 0`, `86`, and the rest 0 failures. The dotted case added later (`c66d3d22e5`) was run on the old code and failed (`Tests run: 2,  Failures: 2`) and on the head and passed (`OK (2 tests)`).

3. **The diff.** `Functionals.scala`: `joinNumerals` gains `SLetExpr` (both a local declaration and a local function, the two subclasses of `LetExpr` in `ProjectFortress/astgen/Fortress.ast:694-718`), `tupleJoin` gains `SLocalVarDecl` and `SLetFn`, in the form of the `SDo` case beside them and of `joinInto`'s cases (`Functionals.scala:1373-1376`). `Operators.scala`: where the reassociation leaves one application and no element after it, it is checked at the expected type (`:362`), and a subscript item is written as `AssignmentAndSubscriptDesugarer.desugarSubscriptExpr` writes it (`AssignmentAndSubscriptDesugarer.scala:75-80`); that desugarer runs before every checker run, for both libraries (`Shell.java`, `useCompilerLibraries` and `useInterpreterLibraries` both call `setAssignmentDesugaring(true)`; `compiler/PreTypeCheckDesugarer.java:111`), so the checker never sees another form of a subscript. The `return` at `:362` is in the method's body, not in a closure. `Decls.scala:431-443` is the top-level case's text (`:324-336`) in the local case; the destructuring `val (newLhses, newRhs)` takes the second check's tree. `ExportChecker.scala:235-236`: the modifiers are compared without `var`, and the mutability still is, so an immutable api variable is not satisfied by `:=` (below). Each does what the report says, and only that.
4. **The precedents** are the right ones and the report counts their sites (the four members of `Functionals.scala` that walk a join's result positions; the two tuple-binding cases of `Decls.scala`). One remark: `equalParams`, cited for row 1028, is the subject of the CONTESTED row 844 (an object's value parameter compared without `var`). The repair does not inherit that question, since it keeps the mutability comparison that `source-code.tex:343` asks for.
5. **The tests** exercise their defects, carry one comment line each, cite the specification by file and section (each section exists: `juxtameaning.tex` "Juxtaposition", `blocks.tex` "Do Expressions", `variables.tex` "Top-Level Variable Declarations" and "Local Variable Declarations", `conversions-coercions.tex` "Coercions for Tuple and Arrow Types", `literals.tex` "Literals", `try.tex` "Try Expressions"), and are named by topic. Two lines of the change had no assertion: the `SLetFn` case of `tupleJoin`, and the top-level binding that `defaultNumeral` also reaches (fixes 1 below).
6. **My programs**, under `tmp/rung-checker-small-gaps/skeptic/progs/`, run by `drive.sh` (old code: `old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches compile|run`; new code: this tree's `bin/fortress compile|run`; walk on this tree's build, whose walk code the rung does not touch). The table below.
7. **Homes.** The worker's: rows 1005, 1028, 1029, 1060 in home 1; row 1074 in home 2 with an expected failure shown red. Mine: the tight juxtaposition after a subscript, home 1 (fix 2); the numeral tuples of a `case` or `try`, home 2 (fix 3); the `try` after a local declaration, a form of row 1074 (fix 3, a note on its row).
8. **Ledger and siblings.** `ledger-find` for subscript, superscript, intermediate nodes, tuple binding, export var and modifiers: rows 1, 3, 4, 84 (subscripts under walk and the call-then-subscript static error), 474, 988, 1026, 1031 (tuple bindings), 844 and 801 (export check); none is changed by the rung beyond its four. In the edited files the sibling sites are `tupleJoin`'s missing `case` and `try` (now row 1075) and `joinNumerals`' missing `try` (row 1074).
9. **The report.** Its five provenance lines: each cited line opened (`Functionals.scala:1373-1376`, `Decls.scala:324-336`, `AssignmentAndSubscriptDesugarer.scala:75-80`, `ExportChecker.scala:697` and `:908`, the specification's `juxtameaning.tex:145-170`, `variables.tex:60-66`, `:85-95`, `:105-112`, `:190-200`, `source-code.tex:336-346`, `literals.tex:208-218`, `blocks.tex:52-58`) says what the report says; the four files are in the 2012 tree (`git cat-file -e a874948ac:...`). No sentence of the specification is made false: Appendix I's numerals entry lists the implementations' departures (`Specification/appendices/changes.tex:5466-5480`) and names none of the four rows. The whole-suite run is `ant testFast` at `b0f95e758d`, whose code is the head's. The compiler track's 1701 against the landed 1694 is the rung's seven tests, counted as the report counts them. record.md's FACTS corrections (F-363, F-369, F-380, F-282) match those entries' present text.
10. **Names.** The seven test components the rung adds and `XXXNumeralTupleBranchesUntypedCompiled` occur only in their own files (`git ls-files`, `git grep -lw` over `ProjectFortress` and `Library`); `object Mat` is declared in other compiled tests too, each in its own component, as it was in the base's `XXXSubscriptThenSuperscriptCompiled`.
11. **Failure mode.** Every loud failure the rung removes gives the specification's value: row 1060's `NoClassDefFoundError` gives the default `ZZ32` (P-173), row 1029's `ClassCastException` a converted `ZZ64` (`conversions-coercions.tex`, "Coercions for Tuple and Arrow Types"), row 1005's stop and the code generator's crash on `x[5]k` the left-to-right application (`juxtameaning.tex:164-168`), row 1028's refusal a variable read and assigned through the api at one and four threads. In the other direction, two classes of programs that compiled are now refused (the reserved point, below).

## The differential

| program | old code, compiled | this rung, compiled | walk |
|---|---|---|---|
| `SkTupleAfterFn`: `(p, q) = do g(): ZZ32 = 3; (2, g()) end`, `c: ZZ32 = p`, `println(c + q)` | links; run dies, `NoClassDefFoundError: fortress/CompilerBuiltin$v` | 5 | 5 |
| `SkTopLevel`: top-level `topLevel = do k: ZZ32 = 3; 6 end`, `t: ZZ32 = topLevel` | links; run dies, the same | 6 | 6 |
| `SkBlockNum`: the same at the top level, an `if` after a declaration, a `ZZ64` default, a mixed `1`/`2.5` join, a float after a local function, `x2 + 1`, a `do` inside an `if`, a `case` arm, a nested `do` | compile stops: 'Error trying to close method scope.' | 4, 4, 3000000000, 1.0, 0.25, 5, 6, 8, 10 | the same nine lines |
| `SkBlockNumNN`: `x = do k: ZZ32 = 3; 4 end`, `u: NN32 = x` | links; run dies, `NoClassDefFoundError` | refused: 'Right-hand side has type ZZ32, but declared type is NN32.' | refused when it runs: 'RHS expression type ZZ32 is not assignable to LHS type NN32' |
| `SkSubSup`: `x[i]^2`, `x[5]^2 + 1`, `2 x[5]^2`, `y: ZZ64 = x[5]^2`, `m[2, 3]^2`, `x[x[1]]^2` | 'Result of typechecking still contains intermediate nodes.' | 64, 145, 288, 144, 49, 225 | 'Closure/Constructor for _[_] param 1 (i:ZZ32) got arg (): ()' (row 1) |
| `SkSubTight`: `x[5]k`, `x[1]x[2]`, `(k)x[5]` | 'Should not be a subscriptExpr here in codegen!' | 36, 72, 36 | row 1's failure |
| `SkSubGeneric`: `Box[\ZZ32\](6)[0]^2` | intermediate nodes | 36 | row 1's failure |
| `SkCallSub`: `mk()[5]^2` | 'Item at this location must be an expression, not an operator.' | the same | 'the argument should not be immediately followed by a non-expression element' (row 4, the specification's static error) |
| `SkTupleMixed`: `(a: ZZ64, b: ZZ32, c) = three()`, `(d, e: ZZ64) = if ... then two() else (5, 6) end`, `(f: ZZ64, g) = do (1, 2) end`, `(h: ZZ64, i) = t`, `(j: Object, l) = two()` | links; run dies, `ClassCastException` `FZZ32` to `FZZ64` | 3000000001, 5, 7, 3000000008, 3000000001, 2, 3000000007, 8, 7, 8 | the same ten lines |
| `SkTupleMixedRefused`: `(p, q: String) = two()` | compiles; prints 7 | refused: 'Right-hand side has type (ZZ32, ZZ32), but declared type is (ZZ32, String).' | refused when it runs: 'RHS expression type ZZ32 is not assignable to LHS type String' |
| `SkExpA`: api `tally: ZZ32`, component `tally: ZZ32 := 0` | refused, 'due to different mutabilities' | the same | not run |
| `SkExpB`: api `var tally: ZZ32`, component `tally: ZZ32 = 0` | refused, 'due to different modifiers, different mutabilities' | refused, 'due to different mutabilities' | not run |
| `SkExpC` with `SkExpCUse`: api `var counter`, `var lo`, `var hi`; component `counter: ZZ32 := 0`, `(lo, hi): ZZ32... := (1, 2)`; a parallel `for i <- 1#100` of `atomic counter += 1`, then `lo := lo + hi` | `SkExpC` refused, 'due to different modifiers' | 100, 3 at `FORTRESS_THREADS=1` and at 4 | 100, 3 at 1 and at 4 |
| `SkCaseTuple`: `(a, b) = case k of 1 => (1, 2) else => (3, 4) end` | refused: 'Right-hand side has type OR((NaturalNumeral[\1,10,3\], …), …), but left-hand side is a tuple of 2 variables.' | the same | 3 |
| `SkTryTuple`: the same with a `try` | the same refusal | the same | 3 |
| `SkTryAfterDecl`: `x = do k: ZZ32 = 3; try 4 catch e Exception => 5 end end` | compile stops: 'Error trying to close method scope.' | the same | 4 |

The commands, from this tree's root: `tmp/rung-checker-small-gaps/skeptic/drive.sh <programs>` and `drive-exp.sh`, whose lines are those of the brief (old code through `old-fortress.sh`, new code through this tree's `bin/fortress`). For example, `SkSubTight`:

    === old compile
    Exception in thread "main" java.lang.Error: Should not be a subscriptExpr here in codegen!
    === new run
    36
    72
    36

and `SkTupleAfterFn`:

    === old run
    Caused by: java.lang.NoClassDefFoundError: fortress/CompilerBuiltin$v
    === new run
    5

## Fixes

1. **`9a63964d4f`, a correction (test).** `NumeralEndsUntypedBlockCompiled` had no assertion that reaches `tupleJoin`'s new `SLetFn` case (`Functionals.scala:1293-1294`), nor the top-level binding that the repaired `defaultNumeral` also reaches (`Decls.scala:305`). Added: `(p, q) = do three(): ZZ32 = 3; (2, three()) end` with `assert(d + q, 5, ...)`, and a top-level `topLevel = do k: ZZ32 = 3; 6 end` with `assert(t, 6, ...)`; record.md's finding 4 names both. Settled by P-173, "where nothing fixes one, into the machine default, a `ZZ32`", and `literals.tex:211-216`. On the base each form compiles and its run dies (`SkTupleAfterFn`, `SkTopLevel` above); the test through the harness on the old code, then on the head:

       old-fortress.sh /home/user/fortress-base37 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/NumeralEndsUntypedBlockCompiledLink.test ... NumeralEndsUntypedBlockCompiled.test SubscriptThenSuperscriptCompiled.test XXXNumeralTupleBranchesUntypedCompiled.test
       Caused by: java.lang.NoClassDefFoundError: fortress/CompilerBuiltin$v
       Tests run: 6,  Failures: 3,  Errors: 0
       ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skpass ProjectFortress/compiler_tests NumeralEndsUntypedBlockCompiledLink.test NumeralEndsUntypedBlockCompiled.test SubscriptThenSuperscriptCompiled.test XXXNumeralTupleBranchesUntypedCompiled.test
       . run ProjectFortress/compiler_tests/NumeralEndsUntypedBlockCompiled (1062ms) PASS
       OK (6 tests)

2. **`a0477b7256`, a correction (test and record).** The rewrite of a subscript item as a method call (`Operators.scala:316-321`) also compiles a tightly juxtaposed item after a subscript, `x[5]k` and `x[1]x[2]`, which on the base crashed the code generator, 'Should not be a subscriptExpr here in codegen!' (`compiler/codegen/CodeGen.java:5729`; `SkSubTight` above). No test asserted it and no row or fact held it (`grep` of the ledger and FACTS for the message finds nothing). Added `assert(x[5]k, 36, "x[5]k")` to `SubscriptThenSuperscriptCompiled`, its comment line widened to name the form, and the form to record.md's finding 1 and its FACTS entry. Settled by `juxtameaning.tex:164-170`: the subscript applies to the element before it, and the expression elements that remain are a juxtaposition. The same two harness runs: on the old code the test's link stops, 'Result of typechecking still contains intermediate nodes.' (the first of the test's failures there; the code generator's crash is the program's above), on the head `. run ProjectFortress/compiler_tests/SubscriptThenSuperscriptCompiled (541ms) PASS`.
3. **`56ed43009a`, a correction (a home-2 test and a ledger row).** My programs measured a sibling of row 1060 in the member the rung edits: `tupleJoin` (`Functionals.scala:1277-1303`) has no case for a `case` or a `try`, so `(a, b) = case k of 1 => (1, 2) else => (3, 4) end`, and the same with a `try`, are refused on the compiled path, on the base and after the rung, where walk prints 3. The specification settles the answer (`literals.tex:211-216`; a `case`'s and a `try`'s value is its branch's), so it is an expected failure, `compiler_tests/XXXNumeralTupleBranchesUntypedCompiled.test`, with the new row 1075 in record.md (`ledger.py check --rows` fails it only on its placeholder number). The same commit notes on row 1074's row the form after a local declaration, whose compile stops in the code generator instead ('Error trying to close method scope.', on the base too, `SkTryAfterDecl`), and adds row 1075 to record.md's F-380 text and handover. The test through the harness, as it is and changed for one run to declare `(a, b): (ZZ32, ZZ32)` and `(d, e): (ZZ32, ZZ32)`, then restored (`diff` against the saved copy printed nothing):

       ONE_JVM=1 .../junit.sh skpass ... XXXNumeralTupleBranchesUntypedCompiled.test
       . compile ProjectFortress/compiler_tests/XXXNumeralTupleBranchesUntypedCompiled ... but left-hand side is a tuple of 2 variables.
        Saw expected failure
       ONE_JVM=1 .../junit.sh skxxxred ProjectFortress/compiler_tests XXXNumeralTupleBranchesUntypedCompiled.test
       1) ...XXXNumeralTupleBranchesUntypedCompiled(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
       Tests run: 1,  Failures: 1,  Errors: 0

   It is green on the old code too ('Saw expected failure' in the old-code run above): a test that comes with no fix.
4. **`677684d547`, a correction (record).** The export check's refusal of an immutable component variable under the api's `var` declaration changed its message: 'due to different mutabilities', where the base gave 'due to different modifiers, different mutabilities' (`SkExpB` above). No test pins it (`grep` of the `.test` files for 'different modifiers' finds only `XXX1an.test`, whose `test` modifier still differs). record.md's finding 3 now says so, and that an immutable api variable is still not satisfied by `:=` (`SkExpA`).

## Where I differ from the worker

- The worker's decision to record row 1074 and not repair it stands; row 1075 is recorded the same way, by fork C1's rule.
- The report's "The only static errors of the form are an exponentiation followed by a subscript or an exponentiation (`:150-151`)" reads, in its context of a subscript and a superscript after a non-function front, as true. After a call, the other static error of `juxtameaning.tex:159-160` holds: `mk()[5]^2` stays refused on both paths, as row 4 records (`SkCallSub`).
- `REPORT.md`'s "Defects and their homes" does not list the forms of fixes 2 and 3; record.md now holds them, and this file gives their evidence.

## Points to report the rung reaches

- Each repair, by file and member, and its rule: as the report lists them (`Functionals.scala:1290-1294`, `:1332-1333`; `Operators.scala:313-321`, `:360-362`; `Decls.scala:431-443`; `ExportChecker.scala:232-236`), with the changed message of fix 4 under the last.
- Rows 1005, 1028, 1029 and 1060: each expected-failure test promoted, failing on the base and passing after (item 2 above); under walk the same answers for 1028, 1029 and 1060, and row 1's failure for 1005.
- Every existing test whose pinned message changed: none.
- The two stages' tables on the final tree against the comparand, and the checker's timing: item 1 above.
- Sentences of the specification made false: none.
- A file edited beyond those named: none; my commits edit the rung's tests in `ProjectFortress/compiler_tests/` and its `record.md`.
- Reserved: a program that compiled and is now refused. `compiler_tests/LocalTupleBindingMixedRefused.fss:8` (the worker's), and my `SkTupleMixedRefused` (compiled and printed 7; now 'Right-hand side has type (ZZ32, ZZ32), but declared type is (ZZ32, String).') of the same class; `BlockNumeralAtFloatProbe` (the worker's) and my `SkBlockNumNN` (compiled and died at run time; now 'Right-hand side has type ZZ32, but declared type is NN32.') of the other. Walk refuses each when it runs.
- Reserved: a model line: none.
