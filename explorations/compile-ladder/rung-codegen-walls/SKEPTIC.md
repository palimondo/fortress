# Rung C (`rung-codegen-walls`): the skeptic's verdict

Judged: `ff079d1f9` on `wip/rung-codegen-walls`, the worker's head. REPORT.md and record.md were already on the branch, so the journal step wrote nothing and made no commit. The skeptic's commits: `33cf2e541`, `6678a80d0`, `6555d011d`, then this file. No commit of the skeptic changes code: three corrections, and no fix of a defect of the change. Verdict: **approved**.

## What was checked

1. **Stages.** The report says neither stage ran. `git diff --name-only 97a416b18...ff079d1f9` lists `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` outside the listed folders. It is the code generator, not the checker's Scala or the code the build generates for the checker, so no count stage is owed (fork 13). Every other path is under `ProjectFortress/compiler_tests/`, `ProjectFortress/tests/` or `explorations/`.
2. **Test first**, read in the worker's transcript by time and call id:
   - The three tests were written by 00:56:27 (V59bTA). They failed on the base's build through `junit.sh base2` at 00:57:09 (KYMvi4), with 'Only handling some static args of generic types in extends clause', 'NYI: Forbid clauses are not yet implemented', 'Don't know how to compile this kind of FnDecl. node = twiceOfTwo():()' and 'Tests run: 6,  Failures: 6,  Errors: 0'.
   - The first `CodeGen.java` edit came at 01:00:21 (PJeH9c). The rewritten forbid test failed again at 01:04:53 (EF3dKA), with 'build-is-base' by `cmp`. The build started at 01:05:30 (yJ49HU), and `CodeGen.class` is dated 01:06:12.
   - The last code edit was at 01:01:45 (RUuDJh, python). The last pass, `junit.sh final` at 01:24:45 (aLVB6v), printed 'OK (9 tests)'. The order holds.
3. **The diff**, line by line, against the section and try.tex:
   - The AnyType branch emits Any's RTTI singleton through the non-generic path (`CodeGen.java:5759-5767`), as the section asks.
   - The other three branches keep their throw.
   - `forTry` tests the forbid types after the catch clauses, in order, and rethrows otherwise (try.tex, "Try Expressions"). Walk's `handleException` does the same (`Evaluator.java:1401-1436`).
   - A try with neither clause emits what it emitted before.
   - `fnDeclCompilableModifiers` adds `Test` only. Nothing else of the file changed.
4. **Precedent.** `throwForbiddenException` follows `forThrow`'s wrapping (`CodeGen.java:2006-2017`) and the source call's naming. The worker's `javap` comparison is in its transcript. The AnyType branch follows the IntArg branch's `continue` (row 411). I found no device the library has that the rung reinvented.
5. **The tests.** Each exercises its wall. Each message cites a file and a section. Two departures, corrected (below): extra comment lines, and tests.tex cited as a section.
6. **Differential**, my programs under `tmp/rung-codegen-walls/skeptic/`, each run four ways: walk on the rung's code, walk on the old code, compiled on the rung's code, compiled on the old code. The `diff.sh` there wraps the brief's commands.
   - `AnyDiff`: `Holder[\Any\]` beside `Holder[\ZZ32\]`, a generic trait and a generic object extending at Any, and a two-parameter trait at `(Any, ZZ32)` as separate arguments. Walk (both codes) and the rung's compiled run print the same 8 lines: 'AnyHolder HolderAny', 'ZHolder HolderZZ32', 'SubObj HolderAny', 'Gen HolderAny', 'TwoHolder neither', and so on. The old compiled code stops: 'Only handling some static args of generic types in extends clause'.
   - `ForbidDiff`:
     - Agrees with walk on 'asValue 6' (a try as a value), 'catchBodyThrows Boom' (a catch body's throw is not forbidden), 'outer Forbidden(Forbidden(Boom))' (a forbid of `Exception` around a forbidden exception) and 'method Forbidden(Fizz)' (a forbid in an object's method).
     - Disagrees on `finally`: walk prints 'withFinally Forbidden(Boom)', 'log=finally;'; compiled prints 'withFinally Forbidden(Boom)', 'log='. The same holds at `FORTRESS_THREADS=1` and `=4` (`threads4.txt`).
   - `FinallyDiff2` (no forbid clause) shows the order is the base's. A catch clause that misses gives 'catchMisses Boom', 'log=' compiled on the old code and on the rung's code, and 'log=finally;' under walk. Both threads columns agree.
   - `FinallyDiff` (a try with only `finally`) fails verification on both codes, 'java.lang.VerifyError: Bad return type'. This is D5's "by reading", now measured.
   - `TestMethodDiff`: `test mt()` on an object compiles and runs on the rung's code, 'O 7'. The old code stops with 'Don't know how to compile this kind of FnDecl. node = mt():()'. This measures D6's guard on methods.
   - `TestCallDiff`: `run()` calls `test t()`. The rung's compiled run and walk on both codes print 'in test', 'DONE'.
7. **Homes.** Rows 820, 821 and 823 are home 1. Rows 888 and 889 are home 2, as the worker wrote them. My three defects are below.
8. **Ledger and sibling sites.** `ledger.py find` for finally, try, forbid, ForbiddenException, rethrow, 'VerifyError try', 'try finally', 'test modifier' and non-test found no row for the `finally` order, the only-finally VerifyError or the test call. The tuple and arrow branches' null name (row 889) is the sibling site of the AnyType repair. The brief limits the change to the AnyType branch, so recording it, as the worker did, is right.
9. **The report's provenance lines,** opened with `sed -n`:
   - The base sites (`:5795-5796`, `:2029-2030`, `:2897-2899`), the historical sites at `a874948ac` (`:2013-2014`, `:2866-2868`, `:5753-5754`), the IntArg branch (`:5863-5873`) and the catch loop (`:2047-2063`) say what is claimed.
   - `Modifiers.java:146-147` is the comment before the sets, so I corrected it to `:148-149` in the provenance line.
   - Section 9's D6 cites `:146-147` and `:151-154`, where `AbsTraitMod`/`TraitMod` are at `:148-149` and `MdMod` at `:155`. I did not edit it, since it is the worker's account of its decision.
   - The sentences made false (section 7) check out: FACTS.md:116 (F-268), :31 (F-34), the ledger's lines 864, 865, 867 and 849, and compiler.md:44.
   - No whole suite is owed: the edit is the code generator's, and the tracks are the gate's (fork 12).
10. **Competing names.** No component or file elsewhere carries the new test names. `throwForbiddenException` is declared once in `ProjectFortress/src/com/sun/fortress/`.
11. **Failure mode.**
    - The forbid wall was a compile-time throw. Its emission is right but for `finally`: a quiet skip of the `finally` block where try.tex runs it "after completion of the try block and any catch or forbid clause" (row 890).
    - The test modifier was a refusal. A non-test's call of a test now compiles and runs quietly, where the tests chapter's note makes it a static error. Walk does the same (row 892).

## Corrections (commits)

- `33cf2e541`, the worker's tests and the report:
  - `ForbidClauseCompiled.fss`, `ForbidClauseWalk.fss`, `XXXNestedTryInnerCatch.fss` and `NestedTryInnerCatchWalk.fss` lose their per-function comment lines; a test carries one.
  - `TestModifierCompiled.fss` and `TestModifierWalk.fss` cite tests.tex's chapter "Tests and Properties", which is a chapter (`Specification/basic/tests.tex:12`).
  - REPORT.md's precedent line now cites `Modifiers.java:148-149`.
  - No value changed. Through `junit.sh skeptic-head` on the head (02:26:44Z): '. run ProjectFortress/compiler_tests/ForbidClauseCompiled (488ms) PASS', '. run ProjectFortress/compiler_tests/TestModifierCompiled (264ms) PASS', '. run ProjectFortress/compiler_tests/XXXNestedTryInnerCatch (310ms) REACHED', 'Saw expected failure (Exit code != 0)', 'OK (13 tests)'.
  - Through `harness-one.sh` (02:27:18Z), the six walk guards: 'OK (6 tests)'.
  - On the old code, `old-fortress.sh /home/user/fortress-base25 <tree>/tmp/old-caches junit ...`: 'java.lang.RuntimeException: NYI: Forbid clauses are not yet implemented', 'Don't know how to compile this kind of FnDecl. node = twiceOfTwo():()', 'Tests run: 10,  Failures: 5,  Errors: 0'. ForbidClauseCompiled and TestModifierCompiled fail there, link and run.
- `6678a80d0`, row 890 and row 891, home 2 (try.tex settles both):
  - row 890: `compiler_tests/XXXFinallyOnEscape.fss`, `.test` (`run_out_contains=REACHED`) and `FinallyOnEscapeLink.test`, with walk guard `tests/FinallyOnEscapeWalk.fss`. The program asserts that `finally` runs after a missed catch clause and after a forbid clause.
  - row 891: `compiler_tests/XXXTryFinallyNoCatch.fss`, `.test` (`run_out_does_not_contain=REACHED`, since the class fails verification before `run()` prints) and `TryFinallyNoCatchLink.test`, with walk guard `tests/TryFinallyNoCatchWalk.fss`.
  - On the head: '. run ProjectFortress/compiler_tests/XXXFinallyOnEscape (554ms) REACHED', 'FAIL:   =/= finally; ...', 'Saw expected failure (Exit code != 0)'; and '. run ProjectFortress/compiler_tests/XXXTryFinallyNoCatch (213ms) Exception in thread "main" java.lang.VerifyError: Bad return type', 'Saw expected failure (Exit code != 0)'.
  - The first `XXX` test, red for one run with its expected log set to the empty string (`junit.sh skeptic-red`): '. run ProjectFortress/compiler_tests/XXXFinallyOnEscape (440ms) REACHED', 'Did not see expected failure', 'Tests run: 2,  Failures: 1,  Errors: 0'. Then it was restored, byte-equal by `cmp`.
  - On the old code, `XXXTryFinallyNoCatch` is green ('Saw expected failure (Exit code != 0)'). `XXXFinallyOnEscape` cannot link there, because its forbid half is row 821's wall ('java.lang.RuntimeException: NYI: Forbid clauses are not yet implemented'); its catch half's defect shows on the old code in `FinallyDiff2` ('catchMisses Boom', 'log=').
  - record.md gains findings 7 and 8 and the rows, which pass `ledger.py check --rows`. Its finding 3's "on a method too, by reading; not run" is replaced by the measured run.
- `6555d011d`, row 892: a ledger row only, reproducer `none`. No gated test can pass while the compiled path accepts the program, since an `XXX` compile test of a program that compiles is red. record.md gains finding 9 and the row, which passes `ledger.py check --rows`.

## Where I differ from the worker

- D5 was "not measured". It is measured now: a try with only a `finally` clause fails verification on both codes (row 891).
- The new forbid path inherits the base's skip of `finally` (row 890). It is recorded, not fixed. The repair is forTry's emission of `finally` on every abrupt path: the rethrow, the forbidden throw and a catch body that throws. That changes every compiled `try` with `finally` and needs the compiler track, beyond rows 820, 821 and 823, as D7 judged for row 888.
- D6's citations of `Modifiers.java` are off by two lines (above).

## Not run

No build, suite or stage: the skeptic changed no code. The report's tables are those of the worker's head, and the gate's on the merged tree are the record.
