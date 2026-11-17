# Climb batch 31, run 1: the judge's ruling on the red gate

The ruling is by reading only: no build, no suite and no program was run. The tree read is `main` at `280835f438`; the gate ran at `2c891b65b0`, and the three commits after it change no code (`git diff --stat 2c891b65b0..HEAD` lists `Specification/appendices/changes.tex` and files under `explorations/` only).

## Decision: repair

The gate is red on one test, `compiler_tests/XXXOverloadGenericObjectTwoParams`, an expected failure that rung X added (`1ce04203c5`). The test asserts a crash of the checker that shows or does not show by what the same JVM compiled before. No code of the batch is wrong, and no rung is dropped. The repair takes the program out of the gated folder and keeps it as the probe of its ledger row. It changes no Java, no Scala, no library file and no other test.

## The evidence

The failing case, `sed -n '180,182p;4411,4414p' ProjectFortress/TEST-RESULTS/fast-compiler/TEST-com.sun.fortress.tests.unit_tests.CompilerJUTest.txt`:

     compile /home/user/fortress/ProjectFortress/compiler_tests/XXXOverloadGenericObjectTwoParams 
     Saw failure, but did not satisfy compile_err_contains; expected
    V is not in the kind env
    Testcase: /home/user/fortress/ProjectFortress/compiler_tests/XXXOverloadGenericObjectTwoParams took 0.194 sec
    	FAILED
    Saw wrong failure. compile

What these lines show, by the harness's code:

- The compile printed nothing, on standard output or on standard error. The harness taps both streams (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:313-316`), and on this branch prints a line break and then releases both taps before its own message (`FileTests.java:402-404`). The line break is there, after the path; nothing stands between it and ' Saw failure'. A compile test runs in the suite's own JVM (`FileTests.java:762-765`, `Shell.subMain`), so no output went elsewhere.
- 'Saw failure' does not say that the compile failed. The branch is taken when the test should fail and either nothing failed or a key is unmet (`FileTests.java:394-408`), and it prints 'Saw failure, but did not satisfy' whenever a key is unmet (`:405-408`). The exit code is not printed. The skill's `references/tests-writing.md`, "How `XXX` works", says the same of this message: an `XXX` compile test with a `compile_err_contains` key "whose program compiles, reports 'Saw wrong failure'".

So in the gate's suite the compile did not reach the crash. It printed what a compile that succeeds prints: nothing. Whether it exited 0 is not on record.

The same file, elsewhere, reaches the crash:

- alone, seven times of seven on the merged tree (the gate's result: once at one thread, six times at four, private caches, each 'XXXOverloadGenericObjectTwoParams.fss:5:8-12: V is not in the kind env [][][]', rc 255);
- alone through the harness on rung X's tree ('Saw expected failure', `OK (1 test)`, `explorations/compile-ladder/rung-return-rule-object/REPORT.md:79`);
- in rung X's whole `ant testFast` (`REPORT.md:46-48`, `:135`), and in the gather's one JVM of the batch's 58 compiled tests on the merged tree, "each passing or seen as its expected failure" (`explorations/compile-ladder/climb-batch-31/RECORD.md:50`).

Two whole-suite JVMs, one green and one red, at the same thread count: what differs is the JVM's history. The suite shuffles its files, by default with the clock as the seed (`FileTests.java:1236`, `:1255-1257`; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/CompilerJUTest.java:42-43`), so each run compiles them in another order.

## The source

The program (`ProjectFortress/compiler_tests/XXXOverloadGenericObjectTwoParams.fss:8-9`, `:12`) calls `keep(Duo[\Square, Square\](Square, Square))` for `keep[\T\](x: T): T` beside `keep[\U extends Object, V extends Object\](x: Duo[\U, V\]): Duo[\U, V\]`. By reading:

1. Both declarations fit the call without coercion, and at the call each has the one parameter type `Duo[\Square, Square\]`. Candidates that fit by subtyping carry no declared arrow (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:918-929`, the last case, `:928`), so they are compared on their instances (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1154-1164`, the last case, `:1163`), which are equal.
2. For a tie "among candidates with one parameter type" the checker "keeps the sort's head" (`Functionals.scala:1104-1108`). The sort keeps the order of its input where the order does not decide (`ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala:8-12`), and its input is the list of the reference's overloadings (`Functionals.scala:1587-1592`).
3. The head's static arguments are then put into every other overloading (`STypesUtil.scala:1170-1198`). Row 1046 places the crash there: the second declaration's domain, "still holding `V`", is asked against the best arrow's (`STypesUtil.scala:1195-1197`). That happens for one head and not for the other.
4. That the head of such a tie varies with the compiling JVM is measured, on another pair: the gap ledger's history, row 499, "the direct call `f(b)` on a `Box[\Blue\]` answers `box` or `any` depending on the compiling JVM (four isolated harness runs of the pair on the base's classes answered `any`; the same test in a 29-file run answered `box`)", with the same lines of the checker named (then `Functionals.scala:741-749`).

Where the order of the overloadings comes from is not traced. Which head reaches the crash is not traced either; point 3 is a reading.

Nothing of this is the batch's code: the crash stands on the base (`REPORT.md:76`, the base column), the batch changes neither `Functionals.scala` nor the lines of `STypesUtil.scala` above (`git diff --stat c1ce2a35e1..HEAD -- ProjectFortress/src` lists `OverloadSet.java`, `CodeGen.java`, `VarCodeGen.java`, `FTraitOrObject.java`, `OverloadedFunction.java`, `LabelExit.java`, `OverloadingOracle.scala` and 76 added lines of `STypesUtil.scala`), and the crash is "in the type check of the call, before the overloading check" that rung X repaired (row 1046).

## What each side had right

The gate:

- Right: one red test and nothing else; the count rose, 1616 to 1668; the lone compile prints the expected message seven times of seven; the suite's log does not print what the compile did.
- Not supported: "saw a failure other than its `compile_err_contains`". The log shows that the expected text was absent and that nothing at all was printed. A failure with another message would stand in the log (`FileTests.java:402-404`).
- Not supported: "only inside the suite's shared JVM at four threads". Rung X's whole suite and the gather's one JVM were shared JVMs at four threads and saw the crash. The history differs, not the thread count.
- A side remark of the gate, right: its `atomic_runs` function returned 1 with 72 of 72 PASS, because its last `grep` for 'FAIL' matches the summary's line '# testFast: BUILD FAILED'. The atomic runs are not red.

Rung X:

- Right: the defect and its home. The pair is valid, the specification settles it, and a deferred defect that the specification settles gets a gated `XXX` test (`references/tests-writing.md`, "How a defect is recorded", way 2). The row's trace of the crash stands.
- Right, and decisive here: the rung found that the checker's answer for a call over such a set "depends on what the same JVM compiled before" (row 1047), and gave it a row only, "no gated test can show two JVM histories" (`REPORT.md:159`). It typed the call of `XXXOverloadReturnObjectDomainOtherType` as `Any` (`ProjectFortress/compiler_tests/XXXOverloadReturnObjectDomainOtherType.fss:12`), which holds whichever head is taken.
- Wrong: it did not apply that finding to row 1046's own test. The test's one assertion is a message that only one head of the same kind of tie reaches. Three JVMs agreed, and the fourth did not.

## Why not the other ways

- Deciding the tie in the checker, so that the call resolves the same in every JVM. It is the root, and it is not a gate repair. It changes the static resolution of every call tied among generic candidates, rows 499 and 1047 with it; it needs its test first, the count and the distance stages, and a skeptic; and no rung of this batch declared the call's candidate ranking. The record places row 499's repair in phase 5 (`explorations/coordinator/PLAN.md:256`).
- Another form of the gated test. None is green in both histories: an `XXX` compile test is red when the compile passes, with or without its key; a plain `link` over the component is red when the checker reports the crash as a static error, as it does ('File XXXOverloadGenericObjectTwoParams.fss has 1 error.').
- Dropping rung X. Its approach is not in question: its rule, its dispatcher cast and its other five tests are green in the gate.

## Instructions for the repair

On `main` in `/home/user/fortress`. Load the `fortress-repo` skill, and open its `references/records.md` and `references/committing.md`. Scratch goes under `tmp/gate-repair-31/`.

1. Move the program, unchanged, out of the gated folder, and remove its `.test` file (`ProjectFortress/compiler_tests/XXXOverloadGenericObjectTwoParams.test:1-3` is the only file that drives it; `git grep -n 'tests=.*OverloadGenericObjectTwoParams'` shows no other):

       mkdir -p explorations/compile-ladder/rung-return-rule-object/probes
       git mv ProjectFortress/compiler_tests/XXXOverloadGenericObjectTwoParams.fss explorations/compile-ladder/rung-return-rule-object/probes/XXXOverloadGenericObjectTwoParams.fss
       git rm ProjectFortress/compiler_tests/XXXOverloadGenericObjectTwoParams.test

   Do not edit the program and do not rename its component: the seven lone compiles of the gate are of this text.

2. Compile the probe once, alone, from its new path, with a private caches folder, as the skill's `references/compiler.md` and `references/worktrees.md` give the command. Keep its two or three output lines and its exit code for step 3 and for your result. Expected: '...XXXOverloadGenericObjectTwoParams.fss:5:8-12:', 'V is not in the kind env [][][]', 'File XXXOverloadGenericObjectTwoParams.fss has 1 error.', exit 255. If it prints anything else, do not run it again: write what it printed into the row's notes in place of "prints the crash", and say so in your result. Run no suite and no other program: no code changes, and the gate's other results stand.

3. Rewrite row 1046 with `python3 explorations/coordinator/tools/ledger.py rewrite 1046 FILE`, FILE under `tmp/gate-repair-31/` (`references/records.md`, "Writing to the record"; the row is `explorations/fortress-gap-ledger.md:555`). Keep the number, the claim, the status `NEGATIVE-VERIFIED`, the class, the spec citation and the found-by cell as they are. Change two cells:
   - reproducer: `explorations/compile-ladder/rung-return-rule-object/probes/XXXOverloadGenericObjectTwoParams.fss`
   - notes, at most 700 characters, shortened until the tool accepts the line; they must hold: `siblings: 789, 1047, 499` first; that the pair is valid; that the probe compiled alone prints the crash, with its exit code; that the call's two candidates tie at `Duo[\Square, Square\]` and the checker keeps the sort's head (`scala_src/typechecker/impls/Functionals.scala:1104-1108` at 280835f438), so that whether the compile reaches `STypesUtil.isDynamicallyApplicable`'s test (`scala_src/useful/STypesUtil.scala:1195-1197`) with `V` left follows the order of the overloadings, which varies with what the JVM compiled before (row 499); that as a gated `XXX` test the compile printed nothing in climb batch 31's gate suite, so no gated test holds the row until the tie is decided; and the two closing facts of today's notes, "`keep(Square)` alone compiles and runs. Not tried under walk."

4. In `explorations/compile-ladder/rung-return-rule-object/REPORT.md`, bring the three places that name the test level with the tree, changing nothing else:
   - `:76`, the table row: the name in parentheses becomes the probe's path, `probes/XXXOverloadGenericObjectTwoParams.fss`.
   - `:79`: after "the run of `XXXOverloadGenericObjectTwoParams.test` alone, 'Saw expected failure', `OK (1 test)`", add that the test was withdrawn at the gate and its program is the probe.
   - `:158`, the defect's home: in place of "2, deferred; the specification settles it (the pair is valid)" and the test's name, write that the specification settles it (the pair is valid), that it is held by row 1046 and the probe alone, since the compile reaches the crash or not by what the JVM compiled before, and point to `explorations/compile-ladder/climb-batch-31/JUDGE-gate.md`.

5. Check, and quote each result in your report:
   - `git grep -n OverloadGenericObjectTwoParams` names the probe, the ledger's row 1046, the three lines of `REPORT.md`, this ruling, and nothing under `ProjectFortress/`.
   - `python3 explorations/coordinator/tools/ledger.py landing-check c1ce2a35e1f1efabb59e0aaed9375994381512b3` prints no finding (the gather's run of it printed 'c1ce2a35e..HEAD: no finding', `RECORD.md:99`).

6. Commit the four paths in one commit, with the skill's footer; the old paths go in `git commit` only (`references/committing.md`, "How to commit"). The message says that the commit removes a test of the original tree's test folder that the batch itself added, and why. Do not push.

After the repair `fast-compiler/CompilerJUTest` holds 1667 tests, above the last landed summary's 1616, so no count falls.

## For the curator

1. **A decision taken where the record does not settle it.** Row 1046's defect is settled by the specification, and the skill's way 2 asks a gated `XXX` test for such a defect; no form of gated test holds while the checker's answer varies with the JVM's history, so the ruling keeps the row and a probe, and no gated test. The ways: (a) as ruled, the row and the probe; cost: the defect is not gated until the tie is decided. (b) Decide the tie in the checker within this batch; cost: a checker change outside every rung's declaration, on the merged tree, with its own test, count, distance and skeptic. (c) Run each compile test of the suite in a JVM of its own; cost: the suite's time, and the dependence stays in the checker.
2. **The defect under it has no place in the plan by name.** A call tied among generic candidates whose instances have one parameter type is resolved by the order of the overloadings, which varies with what the JVM compiled before (rows 499, 1047 and now 1046; `Functionals.scala:1104-1108`). The suite shuffles its files, so any gated test whose verdict hangs on that head can turn red in some order, as this one did on its fourth JVM. `PLAN.md:256` schedules row 499's dispatcher half; the checker's tie is named only in the rows' notes. The history of row 499 names the repair: compare the declarations on their declared domains. The red order can be replayed: the gate's `ant testFast` printed 'Test shuffling seed env var = FORTRESS_UNITTESTS_SEED=1a1e78bd82d_16' twice, which by the suite's two folders (`CompilerJUTest.java:42-43`) is this suite's seed; that reading is not checked by a run.
3. **Not ruled, not traced.** `ProjectFortress/compiler_tests/OverloadReturnObjectDomain.fss:26`, `b: Box[\Square\] = keep(Box[\Square\](Square))`, is a call that both the top-level `keep[\T\]` (`:16`) and the functional method `keep(self)` of `Box[\U\]` (`:10`) fit at `Box[\Square\]`, and the test asserts 'keep Box'. It was green in the three suite histories on record (rung X's `ant testFast`, the gather's one JVM, the gate). Whether its verdict can vary with the head is not established by this reading.
4. **Two tool remarks**, neither red: the gate brief's `atomic_runs` returns 1 whenever the summary holds '# testFast: BUILD FAILED'; and the harness prints 'Saw failure, but did not satisfy' also where the command did not fail, without the exit code (`FileTests.java:399-408`), which is why the gate could not say what the compile did.
