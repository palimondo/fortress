# Rung L, rung-label-exit: the skeptic's check

Head judged: 1edc808b6b (the Java of the rung is 3accd77d82). Verdict: **approved**. Two corrections of mine follow the worker's head, 7b1c1a14cb and 702ebf6a1f; neither changes Java, and none is contested. The report's results are those of the worker's head; no count or distance stage ran, as the section asks, and none was run after my commits. One launch of the skeptic worked the rung. REPORT.md and record.md were on the branch, so no journal copy was written.

## What was checked

1. **The stages.** The section asks for none and lists the rung's files as STAGE_BLIND. `git diff --name-only c1ce2a35e1...HEAD` lists, outside tests and `explorations/`, only `compiler/codegen/CodeGen.java` and `runtimeSystem/LabelExit.java`, the two the section names. The shadow patch ran once after the last change of Java (transcript call dnVd2W, 00:53:28 UTC): `shadow sources written to tmp/rung-label-exit/shadow`, `shadow-patch exit=0`.
2. **Test first.** Transcript call f7C5mL: `junit.sh base … LabelExitCompiled.test ExitOutOfAtomicCompiledLink.test XXXExitOutOfAtomicCompiled.test` on tree c1ce2a35e1 ended 00:32:18 UTC with `Can't compile Label at ProjectFortress/compiler_tests/LabelExitCompiled.fss:13.29` and `Tests run: 4,  Failures: 3,  Errors: 0`; the first build of the edit started at 00:33:52 (call NvH8aC) and ended 00:34:37. The last harness run after the last change of code is call kNHMEb (01:01:34): `. run ProjectFortress/compiler_tests/LabelExitCompiled (674ms) PASS`, `OK (13 tests)`. `ant testFast` started 00:44:42, after the code's commit at 00:44:30: `BUILD SUCCESSFUL`, `Total time: 8 minutes 35 seconds`; `tests 2444 failures 0 errors 0` (call dnVd2W). `git diff --stat 3accd77d82..1edc808b6b -- ProjectFortress/src` is empty. The first expected-failure test was shown red on a deliberate change (call u4CaLW: `Did not see expected failure`, `Tests run: 2,  Failures: 1,  Errors: 0`).
   Two plain tests were written after the build and the transcript shows no failing run of them: `LabelEvaluationIdentityCompiled` and `ExitAfterLabelCompletedCompiled`. I ran them, with `LabelExitCompiled`, through the harness on the old code, from `ProjectFortress/`: `FORTRESS_THREADS=4 /home/user/fortress-base35/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base35 /home/user/fortress-label-exit/tmp/old-caches junit compiler_tests/LabelExitCompiled.test compiler_tests/LabelEvaluationIdentityCompiled.test compiler_tests/ExitAfterLabelCompletedCompiled.test`:

       Can't compile Label at …/compiler_tests/LabelEvaluationIdentityCompiled.fss:5.49
       Can't compile Label at …/compiler_tests/ExitAfterLabelCompletedCompiled.fss:7.14
       There were 6 failures:

3. **The diff.** `CodeGen.java` gets one hunk, directly above `defaultCase`, of two members and two constants; `forFnExpr`, `forAtomicBlock`, `forTry`, `genParallelExprs`, `BaseTask.java` and `Transaction.java` are untouched. It builds fork L1 as the record states it: an exit is an abrupt completion that names one evaluation of its label block, and a group of forked arms joins before the exit passes it (the landed `joinForkedArms`, P-175). The handler's entry is written after the body's code, the form of `forAtomicBlock`, `forTry` and `joinForkedArms`.
4. **Precedent.** Walk's `forLabel` and `forExit` (a thrown Java object that the label's handler takes) is followed; the departure, identity for name, is fork L1's.
5. **The tests.** Each file holds one comment line and is named by its topic; each specification citation names file and section.
6. **My own programs** (below). 10. **Names:** `LabelExit` occurs only in the two source files; no component of the new tests' names exists elsewhere.
9. **The report's cited lines**, each opened with `sed -n`: all say what the report claims but one, corrected (below).

## My programs: walk, compiled on the rung's build at one thread and at four, and compiled on the base

All under `tmp/rung-label-exit/skeptic/`. Compiled on the rung: `cd tmp/rung-label-exit/skeptic && ../../../bin/fortress compile P.fss && FORTRESS_THREADS=t ../../../bin/fortress run P`. On the base: `old-fortress.sh /home/user/fortress-base35 /home/user/fortress-label-exit/tmp/old-caches compile P.fss` (and `… P.fss` for walk).

| program | what | walk | compiled, rung, 1 and 4 threads | compiled, base |
|---|---|---|---|---|
| SkA | a label inside a `seq` loop's body; an exit two function expressions deep; a label inside a function expression; a label in a `while`, taken ten times | `inLoop 306`, `twoDeep 6 111`, `inFn 8 0`, `manyTimes 37` | the same four lines, both | `Can't compile Label at …SkA.fss:10.15` |
| SkC | an exit's value at a type parameter's type, in a generic function and in a generic object's method out of a `for` | `first ba`, `first 2`, `Bx ov` | the same, both | `Can't compile Label at …SkC.fss:11.31` |
| SkD | a parallel `for` that writes under `atomic` and exits with a string; a label in each arm of a `do … also do`; an exit out of a loop of two generators | `par stayed`, `arms 10005 7`, `grid 42 0` | `par left count ok`, `par stayed`, `arms 10005 7`, `grid 42 0`, both | `Can't compile Label at …SkD.fss:7.24` |
| SkE | a label that only exits; an exit without a value out of a loop; one name for two labels in sequence; an exit from a `catch` clause's body; a label as an `if` branch | `always 3 4`, `unit abb abc`, `twice 22 21 11`, `thrower 11 44 3`, `cond 6 2 -1` | the same, both | `Can't compile Label at …SkE.fss:7.25` |
| SkG | a label as a top-level variable's value; a label whose body only throws, inside a `try`; an exit out of a loop in a method | `top 41`, `onlyThrows 6` | the same, both | not run |
| SkN | a label's value at a trait type from two objects; at `Any` from a `String` and a `ZZ32` | `pick circle square`, `mixed a ZZ32 a string` | the same, both | not run |
| SkO | an exit with a tuple | `pair 3 6 2 2` | the same, both | not run |
| SkJ | a label block as a call's second argument | `later 10` | `VerifyError: Instruction type does not match stack map`, `SkJ.later` | not run |
| SkK | a `finally` clause between an exit and its label | `through(1) 1 log [finally]` | `through(1) 1 log []`, both | not run |
| SkL | an exit inside a `spawn` in its label's block | hangs (row 938) | refused: `Could not find 'label' with name: out` | not run |
| SkB | a local variable in the block under the label's name, and an exit to it | not run | refused: `Target of 'exit' is not a label name: x` | not run |

In SkD's first line walk printed `count bad 0`: my program read the counter in the same expression as the call, whose operands walk runs in another order; it is no finding. SkJ and SkK confirm the worker's two limits (rows 322 and 890) each alone, since the two expected-failure programs that gained the cases stop before they reach them. SkL: the checker gives the static error that the specification asks for an exit inside a `spawn`. SkB: the checker refuses a local under the label's name once an exit names it; the refusal is the checker's, before this rung, and loud.

**The reserved point, a class name that a test or the class loader reads.** SkF holds no label: two function expressions, a generic trait's method, a parallel `for` and a `do … also do`. Compiled on the base and on the rung, it prints `3`, `12`, `160` on both, and `unzip -l` of the two jars gives the same 20 names (`diff SkF.old.names SkF.new.names`: no line). The rung renames no class; it adds `LabelExit` and `LabelExit$Target`, and a field named after the label in a closure or task class whose body exits. The other reserved point, a model line: none; the diff names no file under `explorations/run-c4` or `explorations/apl`.

**A defect my programs measured that is not the rung's.** In SkG, `Acc(0).upTo(3, 9)`, whose loop body adds to a `var` field, printed `0` compiled and `-3` under walk. Without any label the base does the same (SkH: `Acc 0`; SkI: `param inLoop 0`, `param inFn 0`, `body inLoop 0`, `body inFn 0` compiled on the base, `6`, `4`, `6`, `4` under walk): a loop body or a function expression writes a copy of the object's `var` field. Rung A of this batch measures and repairs it, with the plain test `compiler_tests/VarFieldCapturedCompiled` on `wip/rung-atomic-expr-field` (home 1 there); so I wrote no expected-failure test here, which the merged tree would turn red.

## Findings and what I did

1. **Five forms that the rung's test did not hold** and that compile through code of the rung: a label declared inside a loop's body and inside a function expression (the closure must not capture a label that it declares itself), an exit two function expressions deep, an exit's value at a type parameter's type, and an exit with a tuple. All ran right. Correction, commit 7b1c1a14cb: `labelInLoop`, `labelInFunction`, `twoDeep`, `either` and `pairOut` with eleven assertions in `compiler_tests/LabelExitCompiled.fss`. Failing on the base's code through the harness (the old code tool, `junit compiler_tests/LabelExitCompiled.test`): `Can't compile Label at …/compiler_tests/LabelExitCompiled.fss:13.29`, `Tests run: 2,  Failures: 2,  Errors: 0`. Passing on the head: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic1 ProjectFortress/compiler_tests LabelExitCompiled.test`: `. run ProjectFortress/compiler_tests/LabelExitCompiled (469ms) PASS`, `OK (2 tests)`; directly at `FORTRESS_THREADS=1` and `=4`: `PASS`, exit 0, each.
2. **A citation of REPORT.md.** "What the specification settles" cited `evaluation/parallelism.tex:86-93` for a group's abrupt completion; those lines speak of scheduling. The sentence is at `:95-100`. Correction, commit 702ebf6a1f.
3. **Two plain tests without a failing run in the transcript:** seen failing on the old code, item 2 of "What was checked". No change of a file.
4. **Line numbers in `CodeGen.java`.** REPORT.md and record.md cite the rung's members at `:1776-1857` and other members by line; rungs M and K are applied before L and edit the same file, so the gather's tree moves them. Left for the gather.
5. **The skill.** `.claude/skills/fortress-repo/references/compiler.md:40` lists `label` and `exit` among the constructs the code generator has no case for; record.md says so, and the file is not the rung's.

## Where I differ from the worker's account

Nowhere on a decision. On the record: the cases `left` (row 322) and `exits` (row 890), added to two existing expected-failure programs, are never reached by those programs' runs, which stop at an earlier case; my SkJ and SkK show each failing alone, and when either row is repaired its test turns red at the label's case, which the repair's rung then sees.

## The failure-mode question

The rung turns a refusal at compile time, 'Can't compile Label', into a running program. Three quiet values follow where the specification says otherwise or leaves room:

- an exit out of an `atomic` block leaves the block's writes undone (`g` is 0 for 7); the specification retains them (`atomic.tex`, "Atomic Expressions"). Expected-failure test and row NEW-L-1.
- a `finally` clause between an exit and its label does not run (`log []` for `[finally]`); the specification runs it (`label.tex`, "Label and Exit"). The case in `XXXFinallyOnEscape`, row 890.
- at more than one thread, the iterations of a parallel loop that were forked run to their end after another has exited, and their writes stay; the specification allows it (`evaluation/parallelism.tex:95-100`).

The other limits are loud: a label as a call's later argument (`VerifyError`), a numeral beside an exit's value (the code generator stops), an exit after its label block has completed (an uncaught `LabelExit`, exit status 1).

## Points to report

Those of the worker's result stand as written. Mine add: the test file changed by my correction, `ProjectFortress/compiler_tests/LabelExitCompiled.fss`, is in the section's list (the rung's tests).
