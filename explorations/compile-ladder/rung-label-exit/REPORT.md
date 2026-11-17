# Rung L, rung-label-exit: label and exit on the compiled path

- problem: the code generator had no case for a label block or an exit, 'Can't compile Label', so every declaration that holds one was refused, the one library's `Indexed.indexOf` among them (ledger row 81): `Library/FortressLibrary.fss:2189`
- spec: "Label and Exit": `Specification/basic/expressions/label.tex:12`
- precedent: walk's `forLabel` and `forExit`, an exit as a thrown Java object that the label's handler takes: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:628`
- deviation: walk matches an exit to a label by the label's name, and gives 104 where the compiled exit, which names one evaluation of the label block as fork L1 asks, gives 102 (`compiler_tests/LabelEvaluationIdentityCompiled`): `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1793`
- deviation: walk's `try` offers an exit to its `catch` clauses as the library's `LabelException`; no compiled `catch` clause takes an exit, as the specification has it: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1453`
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1776`

One launch worked this rung. Base c1ce2a35e1; the Java of the rung is commit 3accd77d82 and did not change after it; the later commits add tests and these files.

## What changed and why

`CodeGen.java` gets two members directly above `defaultCase` (`compiler/codegen/CodeGen.java:1776-1857`), and the runtime one class, `runtimeSystem/LabelExit.java`.

- `forLabel` (`CodeGen.java:1793`) makes a new `LabelExit.Target` for each evaluation of the block and keeps it in an immutable local under the label's name. The body is compiled in a nested scope that holds that local. An exception-table entry for `LabelExit`, written after the body's code so that the entries of a label, a `try` or an `atomic` block nested in the body come first, leads to a handler that calls `LabelExit.valueAt(target)`: it answers the exit's value where the exit names this evaluation and throws every other exit on. The value is cast to the label's type.
- `forExit` (`CodeGen.java:1838`) evaluates the `with` value, or pushes `()`, loads the target's local, and throws `LabelExit.of(value, target)`.
- `LabelExit` (`runtimeSystem/LabelExit.java:14`) is a Java `Error` that is no `FException`, without a stack trace. `LabelExit.Target` (`:19`) is an `FValue`, so that a closure holds it as it holds any immutable variable.

How an exit reaches its label from a loop's body. The body of a `for` is a function expression, and an arm of a parallel group a task; each takes the variables of the enclosing block that its body names from `FreeVariables`, in which every identifier counts (`compiler/codegen/FreeVariables.java:98`), the target of an exit among them. So the closure's class gets a field for the label's local with no change to `forFnExpr`, `delegate` or `forLetFn`. The checker lets no variable in scope share a label's name ('Cannot use an existing identifier … for a 'label' expression', `scala_src/typechecker/impls/Misc.scala:704`), so the name is free in the code generator's environment of locals. The exit thrown in the closure passes the library's code, and a group of forked arms joins the arms that it forked before it throws the exit on (`CodeGen.joinForkedArms`, `CodeGen.java:1657`; P-175).

## The failing run and the passing run

Failing, on the base's code, before the first build of the edit (the run ended 2026-11-17 00:32:18 UTC):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests LabelExitCompiled.test ExitOutOfAtomicCompiledLink.test XXXExitOutOfAtomicCompiled.test

    . link ProjectFortress/compiler_tests/LabelExitCompiled
     UNEXPECTED exception
    com.sun.fortress.exceptions.CompilerError:
    ProjectFortress/compiler_tests/LabelExitCompiled.fss:13:29-20:10:
        Can't compile Label at ProjectFortress/compiler_tests/LabelExitCompiled.fss:13.29
    Tests run: 4,  Failures: 3,  Errors: 0

Passing, the last run after the last change of code, at four threads (head 9e67d603d0's tests on 3accd77d82's code):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests LabelExitCompiled.test ExitOutOfAtomicCompiledLink.test XXXExitOutOfAtomicCompiled.test XXXLabelNumeralValueCompiled.test AtomicBlockLaterArgumentLink.test XXXAtomicBlockLaterArgument.test FinallyOnEscapeLink.test XXXFinallyOnEscape.test

    . run ProjectFortress/compiler_tests/LabelExitCompiled (661ms) PASS
    OK (9 tests)

and, after the test of an evaluation's identity got its own file, the same list with `LabelEvaluationIdentityCompiled.test` and `ExitAfterLabelCompletedCompiled.test` (`junit.sh final2 …`):

    . run ProjectFortress/compiler_tests/LabelExitCompiled (674ms) PASS
    . run ProjectFortress/compiler_tests/LabelEvaluationIdentityCompiled (466ms) PASS
    OK (13 tests)

At one thread and at four, directly (`cd ProjectFortress && ../bin/fortress compile compiler_tests/LabelExitCompiled.fss`, then `FORTRESS_THREADS=1 ../bin/fortress run LabelExitCompiled` and `FORTRESS_THREADS=4 …`; the same for `LabelEvaluationIdentityCompiled`): `PASS`, exit 0, each.

The whole compiled suite, once, on commit 3accd77d82 (`ant testFast`): `BUILD SUCCESSFUL`, `Total time: 8 minutes 35 seconds`; the four tracks' result files sum to 2444 tests, 0 failures, 0 errors.

The walk tests: `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-label-exit/h1 ProjectFortress/tests/XXXExitThroughCatchWalk.fss ProjectFortress/tests/XXXExitOutOfAtomicWalk.fss`: `OK Saw expected exception` twice, `OK (2 tests)`.

The first expected-failure test, shown red on a deliberate fix: with `exit done` of `XXXExitOutOfAtomicCompiled.fss` replaced by `()` for one run, `junit.sh red … ExitOutOfAtomicCompiledLink.test XXXExitOutOfAtomicCompiled.test` printed `REACHED`, `PASS`, `Did not see expected failure`, `Tests run: 2,  Failures: 1,  Errors: 0`; the file was then restored.

## Each form tested (`compiler_tests/LabelExitCompiled.fss`, and `LabelEvaluationIdentityCompiled.fss` for the identity)

Failing on the base as above, passing after at one thread and at four:

- an exit with a value out of a `while` (`outOfWhile`), and the same `while` that no exit leaves;
- an exit without a value (`noValue`), and an exit without a target (`noTarget`);
- an exit out of a `for` over a range (`outOfFor`): the label's value is one of the values that an iteration exits with; a loop that one iteration exits; a loop that none exits;
- a label nested in a label, the inner exit naming the outer or the inner (`nested`);
- a label as a function's whole body with three exits (`severalExits`);
- an exit inside a `try` whose `catch` takes every exception, which does not take it, beside a `throw` that it takes (`throughTry`);
- an exit out of a function expression called by another function (`outOfFunction`);
- the identity of an evaluation, in a test of its own because the paths differ on it: in a recursive function, the exit of a function expression made at depth 2 and called at depth 0 leaves the evaluation at depth 2, 102 and not the 104 that matching by name gives and walk prints (`descend` of `LabelEvaluationIdentityCompiled`);
- the form of the library's `indexOf`: a method of a generic trait whose `for` exits with a `Just` beside a block that ends in a `Nothing` (`Holder.indexOf`), and with an index (`Holder.find`);
- an exit out of the first arm of a `do … also do` (`outOfArm`); a label and its exit inside one `atomic` block, whose writes stay (`insideAtomic`).

## Where the fix belongs, and the precedent search

The map's row for the feature (`explorations/coordinator/map/spec-to-implementation.md`, "Feature by feature", `label` / `exit`) gives the checker's cases (`scala_src/typechecker/impls/Misc.scala:700`, `:731`), walk's members, and for the code generator "no `forLabel`, no `forExit`". The disambiguator gives every exit its target and its `with` expression (`scala_src/disambiguator/ExprDisambiguator.scala:513`), and the checker types the label, so the code generator is the only place that lacked the construct.

Precedents followed, all in `CodeGen.java`: the handler whose table entry is written after the code that it covers, at three sites, `forAtomicBlock` (`:1937`), `forTry` (`:2256`) and `joinForkedArms` (`:1685`); `forThrow` (`:2227`) for an expression that ends in `ATHROW`; `forLocalVarDecl` and `bindAndGenerateClauseBody` for a local in a nested scope. No earlier change repaired this defect elsewhere.

Names added, and the grep for a competing declaration over both test corpora and `ProjectFortress/src/com/sun/fortress/`: `LabelExit`, `LabelExit.Target`, `LABEL_EXIT`, `LABEL_EXIT_TARGET` have none; `forLabel` and `forExit` are the visitor's methods, which `CodeGen` did not override; walk's classes are `exceptions/LabelException.java` and `NamedLabelException.java`. The new tests' names have no other file. No `.test` file pinned 'Can't compile Label' or 'Can't compile Exit' (`grep -rl` over `ProjectFortress/*tests/`: nothing).

## What the specification settles

- A label's value is its body's, or the `with` value of an exit that names it; an exit without a `with` clause has `()` (`label.tex:52-66`). Built.
- The `finally` clauses of the `try` expressions between an exit and its label run, innermost first (`label.tex:72-76`). Not built: the compiled `try` runs its `finally` clause only on the paths that row 890 names.
- A group of implicit threads completes abruptly when one of its threads does, and every thread of the group has then not run, completed or been stopped early (`evaluation/parallelism.tex:95-100`). Built by the landed join of forked arms.
- An exit out of an `atomic` block retains the block's writes (`atomic.tex:60-63`). Not built: see the points.
- The specification says nothing of an exit that runs after its label block has completed, and names no `LabelException` (`grep -rn LabelException Specification/ --include=*.tex`: nothing).

## Programs run old against new

None was run on the base's code beside the failing harness run above; the base's refusal is row 81's record. The ladder subset, after the edit only: the one file of the baseline whose recorded first error names the construct, `tests/objectCC_label.fss` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv:314`: `codegen`, 'Can't compile Label at …objectCC_label.fss:123.18'). With the drivers copied under `tmp/rung-label-exit/ladder/` (`bash run-subset.sh`): `tests/objectCC_label.fss crc=1`, still at the code generator, its first error now the next wall, 'Can't compile ObjectExpr at …objectCC_label.fss:125.23'. No file moved down. The gate does not run this file.

## Sentences of the specification made false

None. No Effect of Appendix I and no note names a missing label or exit on the compiled path (`grep -n -i 'KWD{label}\|KWD{exit}' Specification/appendices/changes.tex` gives only the entry on expected types, lines 2508-2567, which speaks of the checker and stays true).

## Points to report reached

1. **exit as built.** A thrown `LabelExit` that names one evaluation of its label block (`CodeGen.java:1838-1857`, `:1793-1836`).
   - From a loop's body, a closure that can run in a task: the closure holds the evaluation's identity as a captured immutable variable; the exit passes the library's loop and each group's join. Shown at four threads by `outOfFor`, `Holder.find` and `Holder.indexOf` of the test.
   - The other iterations of a parallel loop: an arm that was forked runs to its end or to its own exit before the label takes the exit, and an arm that was never forked does not run. A probe that exits at `i = 900` of `0#1000` and counts bodies under `atomic`: at one thread `value 900, bodies run 901`, six times; at four threads `value 900, bodies run 1000`, six times. A probe in which every seventh iteration exits (`i MOD 7 = 3` of `0#1000`): at four threads `value 3` eight times, with 909 to 926 bodies run. The value is that of the first arm, in the arms' order, that exited, as `joinForkedArms` gives for exceptions; the test asserts only that it is one of the exiting values.
   - A `finally` clause between the exit and its label does not run: `throughFinally(1)` of a probe printed `1` and `log []` compiled, at one thread and at four, and `log [finally]` only where no exit left the `try`. Not built; the case is in `compiler_tests/XXXFinallyOnEscape.fss` (`exits`), row 890.
   - An exit out of an `atomic` block: not built. `compiler_tests/XXXExitOutOfAtomicCompiled` (with `ExitOutOfAtomicCompiledLink.test`) is the expected failure, `FAIL:  0 =/= 7`; new row NEW-L-1. Walk loses the writes too (`tests/XXXExitOutOfAtomicWalk.fss`, `0 =/= 7`).
2. **Each form tested**, failing on the base and passing after at one thread and at four: the list above.
3. **Every existing test whose pinned message changed:** none. Two existing expected-failure programs of the revival gained a case each and stay expected failures: `compiler_tests/XXXAtomicBlockLaterArgument.fss` (`left`, and the comment line) and `compiler_tests/XXXFinallyOnEscape.fss` (`exits`, and the comment line). The `VerifyError` of the first now names its method `left`.
4. **The distance stage's shadow patch** still applies: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress tmp/rung-label-exit/shadow` printed 'shadow sources written to tmp/rung-label-exit/shadow', exit 0, on 3accd77d82's `CodeGen.java`.
5. **Sentences of the specification made false:** none.
6. **Files edited, for STAGE_BLIND:** `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/LabelExit.java`; tests `ProjectFortress/compiler_tests/LabelExitCompiled.{fss,test}`, `LabelEvaluationIdentityCompiled.{fss,test}`, `ExitOutOfAtomicCompiledLink.test`, `XXXExitOutOfAtomicCompiled.{fss,test}`, `XXXLabelNumeralValueCompiled.{fss,test}`, `ExitAfterLabelCompletedCompiled.{fss,test}`, `XXXAtomicBlockLaterArgument.fss`, `XXXFinallyOnEscape.fss`, `ProjectFortress/tests/XXXExitOutOfAtomicWalk.fss`, `ProjectFortress/tests/XXXExitThroughCatchWalk.fss`. Neither stage ran: the section asks for none. **Beyond those named:** the two walk tests under `ProjectFortress/tests/`, and the two existing compiled test programs; no source file beyond the two named.
7. **Reserved points.** A model line: none. A change to a class name that a test or the class loader reads: none; the rung adds the classes `LabelExit` and `LabelExit$Target`, and a field named after the label in a closure or task class whose body exits, and renames nothing.

## Decisions

1. **An exit is a thrown Java object that its label's handler takes.** Ways not taken: a jump inside the method for an exit that stands in its label's own method, which needs the operand stack and the handlers between the two known and leaves a second mechanism for a closure; a table of live labels per task, which a forked task does not see. Evidence: walk's `forExit` and `forLabel`; fork L1.
2. **The identity of an evaluation is a new object in an immutable local under the label's name.** Ways not taken: walk's match by name, under which `descend(4, …)` gives 104 for 102, and which the letter of `label.tex:61-66` also allows (question 4); a static identity by the label's position, which fails the same recursion; a special argument through `forFnExpr` and `delegate`, which the section keeps out of. Evidence: fork L1; `FreeVariables.java:98`, `Misc.scala:704`; `compiler_tests/LabelEvaluationIdentityCompiled`; the same program under walk printed `104`.
3. **`LabelExit` is an `Error` that is no `FException`, has no stack trace, and has no public constructor.** Ways not taken: an `FException` with a Fortress value, which a `catch` of `Exception` would take, as walk's does; a constructor of one `Throwable` or of none, which `ForkJoinTask` uses to copy an exception that it rethrows in another thread, losing the target and the value. Evidence: `forTry` catches `FException` only (`CodeGen.java:2256`); `FException` has one constructor of an `FValue`.
4. **The local's Fortress type is `Any`, and `LabelExit.Target` extends `FValue`.** A captured immutable variable becomes a field and a constructor parameter at its type's JVM descriptor and is cast to it (`CodeGen.constructWithFreeVars`), so the object must be an `Any`. Way not taken: a `LabelType` local, for which `NamingCzar` has no descriptor.
5. **The `with` value is evaluated before anything of the exit is on the operand stack,** and a static `LabelExit.of` makes the object. Way not taken: `forThrow`'s order, `NEW`, `DUP`, then the value, which leaves an uninitialised object under a value whose own code may branch from a handler.
6. **The handler casts the exit's value to the label's type.** Without the cast the verifier joins the body's value with `Object`. A union type is erased by `generalizedCastTo`, and a `Bottom` label is not cast.
7. **An exit out of an `atomic` block is not built.** The way tried on paper: `forExit` commits the transactions between itself and its label before it throws. The block's handler then calls `BaseTask.leaveTransaction`, which takes the task's current transaction, now the block's parent, and ends it (`runtimeSystem/BaseTask.java:293-314`); so it is right only where no transaction encloses the label, and the handler is not this rung's. The section's own default: the expected failure and the row.
8. **A `finally` clause on an exit's way is not built.** A copy of the clauses' code before the throw reaches only a `try` in the exit's own method, not one around a loop whose body exits; `forTry` is not this rung's. The case joins row 890's test.
9. **A label block as a call's later argument is not built.** It fails as an `atomic` block and a `try` do there (row 322): a handler clears the operand stack. The case joins row 322's test.
10. **The test spells each number that a label block yields beside an exit's value as a typed variable.** `PLabel.fss` as the planner wrote it, `exit found with i` beside a last `-1`, does not compile after the rung: the label's type is the union of `ZZ32` and the numeral's type, and its coercion to the declared `ZZ32` crashes the code generator, row 340's 'Error trying to close method scope'. A `POP` on the fall-through of `forTypecase`, tried in a scratch copy of `CodeGen.java`, turns that crash into `VerifyError: Bad return type`, so the repair is not one line and is row 340's. Recorded as `compiler_tests/XXXLabelNumeralValueCompiled`.
11. **An exit that runs after its label block has completed stays an uncaught `LabelExit`,** with the message 'exit from a label block that has completed'. Way not taken: a throw of the library's `LabelException`, which walk's `try` offers to `catch` clauses; the specification names no such exception, and whether a program may catch it is the curator's (below).

## Defects, each with its home

1. Row 81, the refusal: repaired; home 1, `compiler_tests/LabelExitCompiled`.
2. An exit out of an `atomic` block loses the block's writes, on both paths: home 2, `compiler_tests/XXXExitOutOfAtomicCompiled` and `tests/XXXExitOutOfAtomicWalk.fss`; new row NEW-L-1.
3. Under walk a `catch` clause of `Exception` takes an exit (`leave(1)` gives 101 for 1): home 2, `tests/XXXExitThroughCatchWalk.fss`; new row NEW-L-2. Walk only; compiled, the test's `throughTry` passes.
4. Compiled, a `finally` clause between an exit and its label does not run: home 2, the case `exits` in `compiler_tests/XXXFinallyOnEscape.fss`; a note on row 890. Walk runs it (`log [caughtfinally]` shows the clause, with defect 3 beside it).
5. Compiled, a label block as a call's argument after the first fails verification, 'Current frame's stack size doesn't match stackmap': home 2, the case `left` in `compiler_tests/XXXAtomicBlockLaterArgument.fss`; row 322 rewritten. Walk prints 2 and 104 for the probe.
6. Compiled, a label block whose value joins a numeral with a `ZZ32` stops the code generator: home 2, `compiler_tests/XXXLabelNumeralValueCompiled`; row 340 rewritten.
7. An exit that runs after its label block has completed: the specification is silent and the paths differ; home 3, `compiler_tests/ExitAfterLabelCompletedCompiled` asserts today's compiled behaviour; new row NEW-L-3.

8. The paths differ on which evaluation of a label block an exit leaves where the block is evaluated again inside itself, 102 compiled and 104 under walk: the rung builds fork L1's answer, and the letter of the specification can be read for walk's; home 3, `compiler_tests/LabelEvaluationIdentityCompiled` asserts today's compiled behaviour; new row NEW-L-4.

## Questions for the curator

1. Who builds the exit out of an `atomic` block (NEW-L-1)? The compiled handler and walk both discard the writes; the specification retains them (`atomic.tex:60-63`).
2. Is an exit that passes a `try` a `LabelException` that a `catch` clause may take, as walk's `try` has it (`Evaluator.java:1453-1456`) and both libraries declare, or no exception, as `label.tex` reads and the compiled path now does (NEW-L-2, NEW-L-3)?
3. The natural spelling of a search, `exit found with i` beside a last `-1`, waits for row 340.
4. Which evaluation does an exit leave where its label block is being evaluated more than once (NEW-L-4)? Fork L1 gives each evaluation its own identity, and the rung built that: the exit leaves the evaluation in which its function was made. Walk takes the innermost running evaluation of that name. The specification scopes the target statically (`label.tex:39-46`), and also says that a label expression completes normally where its body completes abruptly with an exit whose target is its name (`label.tex:61-66`), which is true of the innermost evaluation's body.

## Commands worked out

- The ladder subset of one file: the drivers of `gate.md`, "The ladder regression", copied to `tmp/rung-label-exit/ladder/`, with `printf 'tests\tobjectCC_label.fss\n' > subset.txt` and the two copies of `default_repository/caches` under `root/`.
