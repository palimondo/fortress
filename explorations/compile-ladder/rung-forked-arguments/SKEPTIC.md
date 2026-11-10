<!-- The skeptic's check of rung P of climb batch 30: what was checked, the programs run old against new, the three fixes, and the verdict. -->
# Rung P, rung-forked-arguments: the skeptic's check

Head judged: ee833d736a (the worker's code final at 728c0fde79). Head after the fixes: this file's commit, on c8da2f41d0. Verdict: **approved**, with three fixes, none contested.

REPORT.md and record.md were on the branch; nothing was taken from the run's journal. The count and distance tables in REPORT.md are those of the worker's head, 728c0fde79; no stage was run after the fixes.

## What was checked

1. **The stages.** `tmp/rung-forked-arguments/checker-count-postedit.txt` holds `#total 0`, `#locations 0`, `#crash none`, and `diff` against `explorations/compile-ladder/climb-batch-29b/gate/checker-count.txt` prints nothing; `distance-postedit.txt` holds `#total 0`. Both were started at 09:46:13Z (call AhQDgL) on 728c0fde79 with a clean tree, after the last change of code (09:34:24Z, call Az5DXo). No Scala changed, so the checker was not timed.
2. **Test first.** The compiled tests were written by 08:46:01Z and run on the base's code at 08:46:15Z to 08:46:29Z (call amwzdW): 'after the catch: flag 0, later: flag 1', 'VerifyError: Bad type on operand stack', 'Inconsistent stackmap frames at branch target 5', 'at most 1 at once', 'Tests run: 12,  Failures: 5'. The walk test failed at 08:48:41Z (call 5gQh5n), '0 4 8 6 1 5 9 7 10 12 3 2 11 13 14 15  =/= ... 0 1 2 3', before `Library/RangeInternals.fss` was edited at 08:49:01Z; `CodeGen.java` was first edited at 08:50:52Z and built at 08:50:58Z. The last passing run, 09:36:40Z (call GVeshT), is after the last change of code: 'OK (16 tests)'.
3. **The diff**, line by line, against the section, P-175, forks P1 to P4 and G, and `parallelism.tex`, "Threads and Parallelism". The handler rethrows and never falls through, so the cleared stack of a handler does not meet row 322; the task locals are assigned before the covered range and disposed after it; the table entry is written after the group's code. `ParallelismAnalyzer` is unchanged. `BaseTask.java` is edited above `unsafeWorthSpawning` only.
4. **The names added** (`joinForkedArms`, `joinIfForked`, `grainSize`, the test components): one declaration each in both test corpora, the libraries and `ProjectFortress/src/com/sun/fortress/`.
5. **The provenance lines** of REPORT.md, each opened: the review's row at `:277`, `parallelism.tex:82` and `:60-64`, `Evaluator.java:275`, `BaseTask.java:117`, `CodeGen.java:1673`, `RangeInternals.fss:20`; each says what the line claims, at 728c0fde79. REPORT.md's lines of `CodeGen.java` past `:4452` are 4 lower than the tree's after the fix below; record.md's are corrected.
6. **The whole suite and the walk side.** `tmp/rung-forked-arguments/testFast2.txt`: 'Tests run: 1537, Failures: 1', 'BUILD FAILED', the failure `NumeralStaticDesignCompiled` (row 971). `demos-run.txt`: 'demos: 52 run, 52 reached their end'. `h2-parallel-tests.txt`: 'OK (43 tests)'. microGPT's quick checks, `mg1/` and `mg4/`: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', four files.

## The differential: my programs

All under `tmp/rung-forked-arguments/skeptic/`, the new code by `bin/fortress compile` and `run` of this tree, the old by `old-fortress.sh /home/user/fortress-base31 <tree>/tmp/old-caches`, each compiled run at `FORTRESS_THREADS=1` and `=4`.

- **SkD1**, forked arguments in 25 shapes: a function of two and three arguments, trait and `Any` parameters, a tuple parameter, overloads, a generic function with written and inferred static arguments, a generic trait's inherited method, an object's dotted, naked and generic methods, a constructor, a functional method and operator, nested calls, `fib(20)`, mutable and immutable locals, a typecase, a try and an atomic block in a forked argument, a call inside an atomic block, a closure, and three exceptions. The new compiled run at 1 and 4 threads prints walk's lines: 'gcall 13', 'acc 54 9', 'holder 13 40 60 1', 'nest 10', 'fib 6765', 'branchy 9 1004', 'closure -2', 'PASS'. Two lines differ, both within the specification ("the result of one of the constituent threads that completes abruptly"): compiled 'catching -1 -2 -3 0' (the first arm in order), walk 'catching -3 -3 -3 0'. The old code cannot run the program: a try in a later argument is row 322.
- **SkX**, nine groups that throw, with a slow sibling that writes a flag: a later argument throws, the first of three, an outer first with a slow inner group, an inner later with a slow outer, both throw slowly, a native's `DivisionByZero`, a dotted and a naked method call, an exception handled inside the arm. New code at 4 threads: 'first of three throws: caught 8, after: flag 11, later: flag 11', 'both throw slowly: caught 11, after: flag 2000, later: flag 2000', 'a native's exception: caught 12, after: flag 1, later: flag 1', 'PASS'; at 1 thread 'after: flag 0, later: flag 0', 'PASS'. No flag moved after a catch in 18 cases.
- **SkTop, SkTopR, SkFld**: a top-level variable and two fields bound to a call with forked arguments: 'top 5', 'r 5', 'o 1211', old and new, 1 and 4 threads.
- **SkGrain**, under walk, old and new, 1 and 4 threads: `BIG ||` over twelve `lo:hi` ranges against `seq`, among them `(2^31-41):(2^31-1)`, `(-2^31):(-2^31+20)`, `5:4`, `7:7`, `15:16`, with no difference; a nested generator, a filtered comprehension, a float sum, a mapped range, a sum of 100,000 terms, a throw and an `exit` from inside a chunk, atomic writes of an array. The four runs print the same lines: '2D 3610', 'float 5.18737751763962', 'throw 21', 'exit 33', 'arr 1225', and at 4 threads 'sum64 2016 parallel true', 'for64 parallel true'.
- **SkA, SkB, SkC, SkG and its four renamings**: the finding below.

## Findings and fixes

### 1. A binding named n, r or v whose forked right-hand side holds a numeral failed verification (a defect of the change; fixed, 9eb18a6350)

`r: ZZ32 = add(inc(k), inc(k + 1))` compiled and ran on the base and failed on the worker's head:

    == new run T=4
    Exception in thread "main" java.lang.VerifyError: Bad local variable type
        SkG.f(Lcom/sun/fortress/compiler/runtimeValues/FZZ32;)Lcom/sun/fortress/compiler/runtimeValues/FZZ32; @8: aload_1
        Type top (current frame, locals[1]) is not assignable to reference type
    == old run T=4
    f 9
    PASS

(`tmp/rung-forked-arguments/skeptic/run1.sh SkC`, `SkG`.) Renamed, the variable decides: `q` and `m` run, `n`, `r` and `v` fail. The cause is two things on the base. A numeral is a call of its coercion, `coerce[\nat n, nat r, nat v\]`, and `FreeVariables` collects the names of the static parameters in that function's type: an instrumented copy printed 'PROBE Id r', 'forStaticParam', 'forTypeInfo', 'forArrowType', 'forFnRef'. And `CodeGen.forLocalVarDecl` put the declared variable in the environment before the right-hand side (`CodeGen.java:4452` at 728c0fde79), so `getFreeVars` found `r` and the task's construction read its slot before it was set. With an operator or a tuple in that place the base fails the same way (SkB: 'VerifyError: Bad local variable type', old and new); forked arguments carried it to every call of two calls.

The ways: (a) the variable joins the environment after its right-hand side, in `forLocalVarDecl`, a caller of `forExprsParallel`; (b) `FreeVariables` stops collecting names inside a type, which is outside the rung's files and can change what closures and tasks of generic code capture; (c) a row and an XXX test, leaving working programs broken. Taken: (a), four lines (`CodeGen.java:4508-4511`). A working program cannot have relied on the early entry: a right-hand side that found its own variable read an unset slot. What (a) leaves, a spare constructor argument where the name is that of an initialized variable, is row NEW-P-2 in record.md.

Settled by P-175, "On the compiled path a call's arguments run in parallel where `ParallelismAnalyzer` judges them worth a task" (`explorations/coordinator/POSITIONS.md:31`), and by fork P4's reason, "without it, forked arguments turn working programs into classes that do not verify" (`explorations/coordinator/CLIMB-BATCH-30.md:371`).

Test: `compiler_tests/LocalBindingForkedNumeralCompiled`, five bindings (a function call, a call of a numeral, a `var` and a method call, a tuple, an operator), each asserted.

- On the worker's head, before the edit, 10:40:51Z, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh head ProjectFortress/compiler_tests LocalBindingForkedNumeralCompiled.test`: 'run ... LocalBindingForkedNumeralCompiled (190ms) Exception in thread "main" java.lang.VerifyError: Bad local variable type', 'Failed to satisfy run_out_contains; expected', 'Tests run: 2,  Failures: 1,  Errors: 0'.
- After the build, 10:42:27Z, the same script over this test and the rung's ten: 'run ... LocalBindingForkedNumeralCompiled (220ms) PASS', 'OK (18 tests)'. Directly at `FORTRESS_THREADS=1` and `=4`: 'PASS', exit 0.
- The whole tracks the edit reaches, once, on the fix's code (committed as 9eb18a6350), `ant testCompiler`, 10:43:39Z: 'Tests run: 263, Failures: 0', 'Tests run: 1539, Failures: 1', 'BUILD FAILED', 'Total time: 5 minutes 6 seconds'; the one failure is `NumeralStaticDesignCompiled`, the worker's, by row 971.

### 2. Three tests carried more than one comment line (a correction; 27890eb050)

`AlsoArmThrowsJoinsCompiled.fss` (two), `CallArgumentsForkCompiled.fss` (three) and `tests/ParRangeGrainWalk.fss` (one) had section comments beside the line that says what the test checks. Removed; no code line changes. They passed after: the compiled two in the `ant testCompiler` run above ('run ... CallArgumentsForkCompiled (2765ms) Passed', 'run ... AlsoArmThrowsJoinsCompiled (5331ms) Passed'), the walk test by `harness-one.sh`, 10:49:16Z, 'OK (1 test)'.

### 3. record.md (a correction; c8da2f41d0)

Finding 10 (the binding), row NEW-P-2, the handover line, and the three citations of `CodeGen.java` that the fix moved by four lines.

## Where I differ from the report, without a fix

- **Row 947 on this branch alone.** The review's own program, the group written inside a `try` in one function, still prints 'flag 0, later: flag 1' here: `forTry` writes its table entry before its body. The worker says so (decision 7) and saw it right on a scratch merge with rung X. The same holds for a group inside an `atomic` block of the same function, whose entry is also written first. The case is not in a test of this branch, where it would fail; it is left for the gather, on the merged tree.
- **The first exception.** The group throws the exception of the first arm in the arms' order, and the exceptions of the other arms are dropped by `quietlyJoin`. The specification allows it; walk at four threads gave another arm's ('catching -3 -3 -3 0'). A test that asserts which arm's exception a group throws would differ between the paths.
- **Which calls count.** The analyzer adds a function's name when it reaches its declaration (`ParallelismAnalyzer.forFnDeclDoFirst`), so a call of a function declared later in the file than the caller is not compute intensive, and an `atomic do … end` that holds such a call is (it is a `Do`). REPORT.md's "calls of named functions written outside the prelude's files" is broader than that. The analyzer is not this rung's to change (fork P2).

## The failure-mode question

The rung turns no error into a value. Two quiet things: at one thread, or where the pool does not fork, an arm after the one that throws does not run (fork P1; the base did the same); and the exceptions of later arms are dropped once the first leaves the group. A `VirtualMachineError` still leaves loudly, without the joins.

## The three homes

The worker's table holds; added: the binding (home 1, `compiler_tests/LocalBindingForkedNumeralCompiled`), and the capture behind it (home 3, row NEW-P-2, reproducer `none`: no program observes what remains).
