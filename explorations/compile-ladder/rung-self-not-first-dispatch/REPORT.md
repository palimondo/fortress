# Rung S: the dispatch method of a functional method whose self is not first

- problem: on the compiled path, where an object overloads an inherited functional method by declarations of its own whose self is not first, a call dies with `ClassCastException` (row 573) or answers the object's declaration for every argument (row 1038), measured by the planner on the base: explorations/compile-ladder/plan-35/probes/fixes-35.md:40
- spec: a functional method's parameter type holds self at its place, and a call runs the most specific declaration applicable to it at run time: Specification/basic/overloading.tex:175-181 and Specification/basic/overloading.tex:298-312
- precedent: the layout of a functional method's own locals, the receiver in local 0 and every parameter but self after it in order (`CodeGen.addParams`), which the dispatch method's descriptor already follows (`getSignature(selfIndex)`, OverloadSet.java:2565): ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3369
- deviation: none; the dispatch method of a dotted method, of a top-level function and of a functional method with self first keeps its bytecode (javap, section "Each program run old against new"): none
- historical: ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java: ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2504

One launch worked this rung. The worktree was seeded by the brief's command (exit 0, 3 s) from the base build `/home/user/fortress-base42` (at 295c215c2c, an ancestor of the base 13f4fdea75 with no difference under `ProjectFortress/` or `Library/`). Commits on `wip/rung-self-not-first-dispatch`, cut from 13f4fdea75: c03be68be8 (the three tests promoted, the self-second-of-three case), 630708ad6d (the trait case), 9d9a67df82 (the fix), and the commit of this report.

## What changed and why

The dispatch method of a functional method, in a trait's or an object's class, is an instance method of the receiver's class: self is the receiver, in local 0, and the other arguments follow in their order without self (its descriptor skips self, OverloadSet.java:2565; the forwarding wrapper pushes self as the receiver and then the others, CodeGen.java:3736-3780). `OverloadSet.generateCall` loaded the argument at place `j` of a member's parameters from local `j + offset` for its type test (OverloadSet.java:1538 on the base) and from local `j + firstArgIndex` for the arm's call (OverloadSet.java:1876 on the base), with `firstArg()` 0 for a functional method (OverloadSet.java:2491-2493). That is right only where self is first. With self second or last, the argument before self was read from the local before its own: the first argument from local 0, the receiver. So the type test tested the receiver, and the last arm, which has no test, cast the receiver to the argument's type: a `ClassCastException` where the receiver is not of that type (row 573), and the object's own declaration for every argument where it is (row 1038).

The edit adds `argumentLocal(j, first)`, the local of the argument at place `j`, `j + first` in `OverloadSet` (OverloadSet.java:2357-2363), overridden in `ForTraitOrObject` (OverloadSet.java:2495-2508): for a functional method, an argument before self's place is in the local after its place, `j + 1`, and one after self's place in the local at its place, `j + first` with `first` 0. The type test and the arm's call read it (OverloadSet.java:1538, :1876). For a dotted method (`selfIndex` is `NO_SELF`) and a top-level function the method gives what the two sites gave before. This is fork S1 of the batch (explorations/coordinator/CLIMB-BATCH-35.md:449).

The three other sites of the file that read an argument's local are unchanged, each for its reason:

- the inference branch, `ALOAD j` (OverloadSet.java:1846), loads the parameters of a generic arm that `getFunctionToCall` converted to a function with self first, so its locals are at their places; for a functional method no program reaches it, since an object's generic functional method beside a plain one stops the code generator in `getFunctionToCall` (OverloadSet.java:2782, row 724);
- the varargs arm's array, `firstArgIndex + p + j` (OverloadSet.java:2031), takes the arguments after the `p` plain ones, self among them, so it is right wherever self stands among the plain parameters (read, not measured: the compiler's prelude refuses a varargs parameter);
- `generateLeafCall` (OverloadSet.java:1990) has no caller.

## The failing runs and the passing run

Before the first build of the edit, on the seeded base build's classes, the promoted tests through the harness (`junit.sh` with `ONE_JVM=1`, four threads; the machine: 4 CPUs, Intel Xeon @ 2.30 GHz, JDK 25.0.4.1). The first call echoed:

    Expected failure: FunctionalMethodOverloadSelfLast's run fails with 'ClassCastException: class ...$C cannot be cast to class ...$N1'
    Expected failure: FunctionalMethodCoverSelfSecond's run fails with '...$Pq cannot be cast to class ...$Ka'
    Expected failure: FunctionalMethodSelfSecondReceiverTested's run fails with 'FAIL:  3 =/= 1; mark(1, Pq): only the inherited declaration applies, though the receiver is a K'
    Expected failure: FunctionalMethodMeetNarrowedSelfNotFirst's run fails with 'FAIL:  A =/= C; an argument of static type N0 that holds an N1 runs the object's own declaration'
    Expected: the four link tests pass, so 'Tests run: 8,  Failures: 4'

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh s35base ProjectFortress/compiler_tests FunctionalMethodOverloadSelfLastLink.test FunctionalMethodCoverSelfSecondLink.test FunctionalMethodSelfSecondReceiverTestedLink.test FunctionalMethodMeetNarrowedSelfNotFirstLink.test FunctionalMethodOverloadSelfLast.test FunctionalMethodCoverSelfSecond.test FunctionalMethodSelfSecondReceiverTested.test FunctionalMethodMeetNarrowedSelfNotFirst.test
    # junit.sh s35base 2026-11-23T10:53:07Z; nproc 4; ... FORTRESS_THREADS=4; tree 13f4fdea75 with the next rung applied, not yet committed
    Caused by: java.lang.ClassCastException: class FunctionalMethodOverloadSelfLast$C cannot be cast to class FunctionalMethodOverloadSelfLast$N1 (...)
    Caused by: java.lang.ClassCastException: class FunctionalMethodCoverSelfSecond$Pq cannot be cast to class FunctionalMethodCoverSelfSecond$Ka (...)
    FAIL:  3 =/= 1; mark(1, Pq): only the inherited declaration applies, though the receiver is a K
    . run ProjectFortress/compiler_tests/FunctionalMethodMeetNarrowedSelfNotFirst (292ms) PASS
    Tests run: 12,  Failures: 3,  Errors: 0

The three promoted tests failed as expected. Two expectations were wrong, and were settled before the edit:

- The count: each plain run test also holds `link`, so the call runs twelve tests, not eight.
- The case first added to `FunctionalMethodMeetNarrowedSelfNotFirst`, `pick(n, C, S1o)` with `n: N0 = N1o`, passed: the top-level dispatch among the wrappers of `pick`, a static method whose arguments are at their places, sends that call to `C`'s own body at its exact signature, `pick?1(N1, S1)`, and never reaches `C`'s dispatch method (javap of `C` on the base: the body at `pick?1(N1,S1)` beside the dispatch methods `pick?1(N0,S0)` and `pick?1(N0,S1)`). The case was replaced by `pick(N0o, C, S1o)`, which the top-level dispatch sends to `A`'s wrapper, whose interface call lands on `C`'s dispatch method `pick?1(N0, S1)`:

      Expected failure: FunctionalMethodMeetNarrowedSelfNotFirst's run fails with 'ClassCastException: class ...$C cannot be cast to class ...$N0' at pick(N0o, C, S1o), the object's dispatch method reading the receiver for the first argument
      Expected: its link passes, so 'Tests run: 2,  Failures: 1'
      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh s35base2 ProjectFortress/compiler_tests FunctionalMethodMeetNarrowedSelfNotFirstLink.test FunctionalMethodMeetNarrowedSelfNotFirst.test
      # junit.sh s35base2 2026-11-23T10:53:50Z
      Caused by: java.lang.ClassCastException: class FunctionalMethodMeetNarrowedSelfNotFirst$C cannot be cast to class FunctionalMethodMeetNarrowedSelfNotFirst$N0 (...)
      Tests run: 3,  Failures: 1,  Errors: 0

  The failure is the expected one; the count is three for the reason above.

The trait case added to `FunctionalMethodOverloadSelfLast`, still before the first build:

    Expected failure: FunctionalMethodOverloadSelfLast's run prints REACHED, then fails at pick(N1o, S0o, Do) with 'ClassCastException: class ...$Do cannot be cast to class ...$N1', the trait's dispatch method reading the receiver for the first argument
    Expected: its two links pass, so 'Tests run: 3,  Failures: 1'
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh s35base3 ProjectFortress/compiler_tests FunctionalMethodOverloadSelfLastLink.test FunctionalMethodOverloadSelfLast.test
    # junit.sh s35base3 2026-11-23T10:55:38Z
    . run ProjectFortress/compiler_tests/FunctionalMethodOverloadSelfLast (368ms) REACHED
    Caused by: java.lang.ClassCastException: class FunctionalMethodOverloadSelfLast$Do cannot be cast to class FunctionalMethodOverloadSelfLast$N1 (...)
    Tests run: 3,  Failures: 1,  Errors: 0

Under walk, on the old code, each of the four programs prints `PASS` (`old-fortress.sh <base> <caches> P.fss`).

The passing run, the last after the last change of code, on the committed fix: the four tests and the compiler track's tests of functional methods (`git ls-files 'ProjectFortress/compiler_tests/*FunctionalMethod*.test'`, 46 files) in one JVM:

    Expected: the four changed tests pass (PASS); every other functional method test as on the base, the XXX ones each an expected failure, XXXGenericFunctionalMethodSelfSecond (row 594) still dying with NoSuchMethodError; the verdict 'OK (64 tests)'
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh s35final ProjectFortress/compiler_tests <the 46 files>
    # junit.sh s35final 2026-11-23T11:04:06Z; nproc 4; ... FORTRESS_THREADS=4; tree 9d9a67df82
    . run ProjectFortress/compiler_tests/FunctionalMethodOverloadSelfLast (708ms) REACHED
    PASS
    OK (64 tests)

`FunctionalMethodCoverSelfSecond`, `FunctionalMethodSelfSecondReceiverTested` and `FunctionalMethodMeetNarrowedSelfNotFirst` print `PASS` in the same run. The build before it: `ant compileAll`, 'BUILD SUCCESSFUL', then the library order, five compiles with exit 0.

## Where the fix belongs, and the precedent search

The map gives the compiled path's dispatch to `OverloadSet`, which emits one dispatch method per overloaded name (explorations/coordinator/map/modules-and-phases.md, "B.7 Overloading"). The rung's section names `ForTraitOrObject` and what `generateCall` emits for it. No earlier commit repaired an argument's local in `OverloadSet.java`: of the revival's commits to the file, only e9bc2ed3e3 (varargs) added a site that reads one, `armCallsVarargsDeclaration`, which is right wherever self stands. The file has five sites that read an argument's local (OverloadSet.java:1538, :1846, :1876, :1990-2018, :2031); the edit changes two, and section "What changed and why" gives the reason for each of the other three. The layout followed is the team's own: `CodeGen.addParams` (CodeGen.java:3369-3375) gives a functional method's body the receiver in local 0 and every parameter but self after it, and `functionalForwardingMethod` (CodeGen.java:3736-3780) calls the method so. `ForTraitOrObject` already holds the other facts of that layout, `loadThisForMethods`, `firstArg()` and `selfIndex()` (OverloadSet.java:2481-2493, :2510-2513), so the override sits beside them.

## What the specification settles

A functional method declaration with self at place `i` has the parameter type `Ps` with self at its `i`th element (Specification/basic/overloading.tex:175-181), and a call dispatches to the declaration applicable to it at run time that no other applicable one is more specific than (Specification/basic/overloading.tex:298-312), more specific by the subtype relation on the whole parameter types (:353-358). So each argument is tested at its own place, whatever self's place. Walk runs each call so; the compiled path now does too.

## Each program run old against new

Compiled with the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base42 tmp/.../old-caches compile P.fss`, then `run P`) and with the fix (`bin/fortress compile` and `run` with a private caches folder), on 9d9a67df82:

| program | old | new |
|---|---|---|
| `DispatchSelfFirstProbe` (self first, a probe in the rung's tmp) | `C1`, `C0` | `C1`, `C0` |
| `FunctionalMethodOverloadSelfLast` | `ClassCastException: ...$Do cannot be cast to ...$N1` | `PASS` |
| `FunctionalMethodCoverSelfSecond` | `ClassCastException: ...$Pq cannot be cast to ...$Ka` | `PASS` |
| `FunctionalMethodSelfSecondReceiverTested` | `FAIL:  3 =/= 1; mark(1, Pq): ...` | `PASS` |
| `FunctionalMethodMeetNarrowedSelfNotFirst` | `ClassCastException: ...$C cannot be cast to ...$N0` | `PASS` |

The dispatch methods, by `javap -c -p` of the jars (constant-pool numbers left out):

- self first, `DispatchSelfFirstProbe$C.pick?0(N1, S0)`: old and new identical; the type tests read `aload_1` (n) and `aload_2` (s), the arm's call `aload_0` (receiver), `aload_1`, `aload_2`.
- self second, `FunctionalMethodSelfSecondReceiverTested$Pq.mark?1(Any)`: old `aload_0; instanceof K` and `aload_0; checkcast` for x; new `aload_1; instanceof K` and `aload_1; checkcast`, the receiver `aload_0` only as the call's target. The same in each of `FunctionalMethodCoverSelfSecond$Pq`'s `mark?1(Any)`, `mark?1(Ka)` and `mark?1(Kb)`.
- self second of three, `FunctionalMethodMeetNarrowedSelfNotFirst$C.pick?1(N0, S1)`: old n at `aload_0`, s at `aload_2`; new n at `aload_1`, s at `aload_2`.
- self last, `FunctionalMethodOverloadSelfLast$C.pick?2(N1, S0)` and the trait's `FunctionalMethodOverloadSelfLast$D$DefaultTraitMethods.pick?2(N1, S0)` (its arms called by `invokeinterface`): old n at `aload_0`, s at `aload_1`; new n at `aload_1`, s at `aload_2`.

In the self-second-of-three class the order in which the dispatch methods are written, and so the constant pool's numbering, differs between the old and the new jar; the instructions of each method are the same up to those numbers.

## The stages, and the files for STAGE_BLIND

The brief has this rung run neither stage. The one source file edited is `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, the code generator's dispatch: `generateCall` is reached only from `generateBody` in the same class, and the class's dispatch writing only from the code generator (`CodeGen`, `CodeGenerationPhase`); the count stage and the distance stage run the checker, which does not reach it. The other files: `ProjectFortress/compiler_tests/FunctionalMethodOverloadSelfLast.{fss,test}`, `FunctionalMethodOverloadSelfLastLink.test`, `FunctionalMethodCoverSelfSecond.{fss,test}`, `FunctionalMethodCoverSelfSecondLink.test`, `FunctionalMethodSelfSecondReceiverTested.{fss,test}`, `FunctionalMethodSelfSecondReceiverTestedLink.test`, the three `XXX` names of these files removed, `FunctionalMethodMeetNarrowedSelfNotFirst.fss`, and this folder. No whole suite was run: after an edit of `OverloadSet` the skill asks for one's own tests only, and the edit is not near transactions.

## The ladder subset

No file of the baseline's ladder table has a recorded first error that names a functional method with self not first: the two corpus files that declare one (`tests/setMakerTest0.fss`, `tests/testPrim.fss`) stop at `disambiguate`. The one whose first error is in an object's dispatch method of a functional method, `tests/disp2.fss` (self first, 'f FAIL' at `run` in explorations/compile-ladder/baseline-2026-09-19/ladder.tsv), was run with the drivers copied under `tmp/rung-self-not-first-dispatch/ladder/` on 9d9a67df82:

    bash tmp/rung-self-not-first-dispatch/ladder/run-subset.sh && python3 tmp/rung-self-not-first-dispatch/ladder/classify.py
    tests/disp2.fss crc=0 rrc=0 4s
    tests	disp2.fss		pass	4

It is not in the gate's 85 files (explorations/compile-ladder/climb-batch-34b/gate/ladder/ladder.tsv), so its record is the baseline's: an UP move. The move is not this rung's: on the old code, `disp2` compiles and prints `f PASS` and `g PASS` too.

## Competing names

`grep -rlw` over `ProjectFortress/tests`, `ProjectFortress/*_tests` and `ProjectFortress/src/com/sun/fortress/` finds no other declaration of `FunctionalMethodOverloadSelfLast`, `FunctionalMethodCoverSelfSecond`, `FunctionalMethodSelfSecondReceiverTested` or `argumentLocal`.

## The sentences that the change makes false

- Specification: none. `grep -rn '~573\|~1038' Specification --include=*.tex` prints nothing, on the base and after; no `\revision`, `\note` or Appendix I effect speaks of the compiled dispatch of a functional method whose self is not first (`grep -rn -i "compiled path\|code generator" Specification --include=*.tex` with self, functional method or dispatch: one line, Specification/appendices/changes.tex:4461, on `self` returned at the instance's type, which the change leaves true).
- The skill, for the gather: `.claude/skills/fortress-repo/references/compiler.md:157`, "Traps of the compiled path", "Where an object overloads an inherited functional method by declarations of its own, and `self` is not the first parameter, the compiled dispatch method tests the receiver's type ... (ledger row 573) ... (ledger row 1038). Put `self` first in such overloads." is false now.
- FACTS: F-372's clause "but an object's dispatch method still tests the receiver in place of the argument, and where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error ... (rows 1038 and 573)" is false now (record.md).

## Points to report

- The dispatch method as fixed: which local each type test and cast reads. Self first: the argument at place `j` in local `j`, unchanged (`DispatchSelfFirstProbe$C.pick?0`, identical bytecode). Self second: the argument before self in local 1 (`FunctionalMethodSelfSecondReceiverTested$Pq.mark?1`), and with three parameters the one after self in local 2 (`FunctionalMethodMeetNarrowedSelfNotFirst$C.pick?1`). Self last: the arguments at places 0 and 1 in locals 1 and 2 (`FunctionalMethodOverloadSelfLast$C.pick?2`, and the trait's springboard `$D$DefaultTraitMethods.pick?2`). The receiver is read from local 0 only as the arm's call target. Evidence: ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:2504-2508, :1538, :1876, and the javap lines above. Reversible.
- The three expected failures promoted, each failing on the base and passing after: `FunctionalMethodOverloadSelfLast`, `FunctionalMethodCoverSelfSecond`, `FunctionalMethodSelfSecondReceiverTested` (renamed by `git mv` in c03be68be8; the runs `s35base` and `s35final` above). Reversible.
- Row 594's test after the fix: still failing, as before, with the same message: `XXXGenericFunctionalMethodSelfSecond` in the run `s35final`, 'Caused by: java.lang.NoSuchMethodError: 'java.lang.Object XXXGenericFunctionalMethodSelfSecond$Shape.\=tag?1??Arrow?...?(long, java.lang.String)'', then 'Saw expected failure (Exit code != 0)'. Its site is not the dispatch method. Reversible.
- The files edited, for STAGE_BLIND: section "The stages, and the files for STAGE_BLIND". Beyond the files the section names, one: `ProjectFortress/compiler_tests/FunctionalMethodMeetNarrowedSelfNotFirst.fss`, row 571's test, gains `object N0o` and the case `pick(N0o, C, S1o)` (ProjectFortress/compiler_tests/FunctionalMethodMeetNarrowedSelfNotFirst.fss:8, :27). And `FunctionalMethodOverloadSelfLast.fss`, a promoted test, gains the trait case (ProjectFortress/compiler_tests/FunctionalMethodOverloadSelfLast.fss:19-23, :27-28). Reversible.

No step taken cannot be undone, and none acts against a decision on record.

## Decisions

1. **Where the local is computed: a method `argumentLocal(j, first)` in `OverloadSet`, overridden in `ForTraitOrObject`.** Ways not taken: an inline conditional at the two sites of `generateCall` (works, but states the layout twice in the base class, where `ForTraitOrObject` holds the layout's other facts, OverloadSet.java:2481-2493); `firstArg()` set to 1 for a functional method with the self place subtracted in `generateCall` (changes the varargs slots, OverloadSet.java:2031, and the generic arms' offset, :1523, which are right as they are); a static dispatch method with self in its place, as the top-level wrapper has (changes the method's descriptor and every interface that an object implements with it). Evidence: the javap of section "Each program run old against new". No decision on record names the mechanism; fork S1 gives the effect (CLIMB-BATCH-35.md:449).
2. **The inference branch's load (OverloadSet.java:1846) is left as it is.** It serves a generic arm converted to a function with self first, whose parameters are at their places; for a functional method no program reaches it (row 724 stops the code generator first). Way not taken: route it through `argumentLocal` too, which would be wrong for a converted arm and has no program to test it.
3. **Two cases added to existing tests rather than new files: the trait case in `FunctionalMethodOverloadSelfLast`, and self second of three in `FunctionalMethodMeetNarrowedSelfNotFirst`.** The skill adds a new case to the test that already asserts cases of its kind (tests-writing.md, "Names, comments, citations"). The trait case is placed before the object's so that its failure on the base shows (the object's case dies first otherwise). Ways not taken: new tests `FunctionalMethodTraitOverloadSelfLast` and `FunctionalMethodOverloadSelfMiddle`; no test of these shapes, which leaves the trait's springboard and an argument after self untested.
4. **The promoted programs keep their `REACHED` line**, as the precedent `NatRtTask` did (fd5cb48648, ProjectFortress/compiler_tests/NatRtTask.fss:22). Way not taken: removing it.
5. **No note on row 594.** Its line with the note "Not at row 573's site: with the dispatch method fixed (climb batch 35), the test dies with this message still." fails the notes limit, 796 characters of 700 (`ledger.py check --rows`), and the row's text stays true. Way not taken: a rewrite that cuts its notes; the fact is in this report and in record.md.
6. **Neither stage was run**, as the brief says for this rung, though the edited path is outside step 7's list: the stages run the checker, which never reaches `generateCall` (section "The stages, and the files for STAGE_BLIND").

## Defects and their homes

- Row 573 (a `ClassCastException` from the dispatch method, self second or last): home 1, repaired; `FunctionalMethodOverloadSelfLast` (object and trait), `FunctionalMethodCoverSelfSecond`, `FunctionalMethodMeetNarrowedSelfNotFirst` (self second of three).
- Row 1038 (the object's declaration for every argument, no error): home 1, repaired; `FunctionalMethodSelfSecondReceiverTested`.
- Row 594 (a generic functional method with self second, `NoSuchMethodError`): not this rung's; it keeps its home 2 test, `XXXGenericFunctionalMethodSelfSecond`, which still fails.
- No new defect was measured. The order of the dispatch methods in a class varying between two compiles is no defect: no program observes it.

## For FACTS

The fact in record.md, "FACTS".

## Commands

The javap reading of a dispatch method, from a jar of a private caches folder: `unzip -o -q <caches>/bytecode_cache/P.jar -d jx && javap -c -p 'jx/P$C.class'`.

## Not done

- A generic functional method overloaded in an object, with self not first: the code generator stops before the dispatch method (row 724); not reached.
- A varargs functional method with self not first: refused against the compiler's prelude; the varargs slots are right by reading only.
