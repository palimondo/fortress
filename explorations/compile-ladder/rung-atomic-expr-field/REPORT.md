# Rung A, rung-atomic-expr-field: atomic as an expression, and a var field inside a transaction

- problem: the code generator refuses `Library/OneShotFlag.fss`'s `tryOnce`, 'Can't compile AtomicExpr' (ledger row 875), and `atomic do n := n + 1 end` on a field loses updates at four threads, 29,456 and 39,276 of 40,000 (ledger row 319; the batch record's section for this rung) — Library/OneShotFlag.fss:18
- spec: an atomic expression's value is its body's, and its reads and writes are one step with respect to every thread outside — Specification/basic/expressions/atomic.tex:36-43; mutable locations are mutable variables and mutable fields of reference objects — Specification/basic/evaluation/memory-ops.tex:48-49
- precedent: a top-level `var`, kept in a `MutableFValue` cell that its class's field holds, read and written through the transaction — ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:313
- deviation: none from the specification's spelling; from the precedent, the cell is reached through the object (`ALOAD 0`, `GETFIELD`) and is made in the object's constructor, not in a class initializer — ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:216-235
- historical: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java, ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java — none

One launch worked this rung. The code and the tests are in commit `67b1030c48` on `wip/rung-atomic-expr-field`; every run below that is called "new" ran on that code. The machine: 4 cores, Intel Xeon 2.10 GHz, OpenJDK 25.0.4.1.

## What changed and why

1. **The atomic expression** (`CodeGen.java:1870-1877`). The parser writes `atomic do ... end` as a `Block` marked atomic (`parser/DelimitedExpr.rats:155-163`) and `atomic e`, for any other body, as an `AtomicExpr` (`parser/Expression.rats:737-738`). The code generator compiled the first and had no case for the second, so `defaultCase` refused it. The new member `forAtomicExpr` makes the atomic block that holds the body alone, the node the parser makes for `atomic do e end`, and hands it to `forAtomicBlock`. The block's value is its last expression's (`doStatements`, `CodeGen.java:1627`), so the expression's value is its body's.
2. **A var field** (`CodeGen.java:4827-4850`, `:4865-4903`; `VarCodeGen.java:202-239`, `:325`). An object's `var` value parameter and `var` field of its body are kept in a `MutableFValue` cell. The object's JVM field holds the cell, is `public final`, and is written once, by the constructor (`MutableFieldVar.firstWrite`, `VarCodeGen.java:223`). `MutableFieldVar` is now a `MutableStaticBinding` whose cell is reached through the object, so a read and a write emit the code of a top-level `var`: the check `BaseTask.inATransaction()`, then `Transaction.TXRead`/`TXWrite` on the cell inside a transaction, or the cell's `getValue`/`setValue` outside one. A field that is not `var` is a `FieldVar`, as an immutable value parameter was, with the bytecode it had.
3. **A field captured by a loop body or a function expression.** Every nested code-generation context (a task, a closure) asks `isAMutableStaticBinding()` to decide whether it captures a cell or a copy (`CodeGen.java:5171`, `:5286`, `:5351` at the base). Because `MutableFieldVar` now is one, a loop body or a function expression inside an object's method captures the field's cell. On the base it captured a copy of the value, so a write from a loop body inside the object's own method was lost at one thread too. This defect was not in the ledger; the cell repairs it, and `compiler_tests/VarFieldCapturedCompiled` asserts it.

## The failing runs and the passing run

The tests were written first and run through the harness on the base's code, in runs that ended before the edit was first built (00:44:54 to 00:45:05 UTC; the build of the edit started after).

Command, in the tree at the base's code: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests AtomicExprCompiled.test AtomicFieldCompiled.test`

    # junit.sh base 2026-11-17T00:44:54Z; nproc 4; ... FORTRESS_THREADS=4; tree c1ce2a35e1
    ProjectFortress/compiler_tests/AtomicExprCompiled.fss:8:9-69:
        Can't compile AtomicExpr at ProjectFortress/compiler_tests/AtomicExprCompiled.fss:8.9
    F. run ProjectFortress/compiler_tests/AtomicFieldCompiled (1204ms) FAIL: value parameter  34631  (expected  40000 ), body field  80007  (expected  80007 ), torn reads  0 , generic value parameter  40000  (expected  40000 ), immutable fields
    Tests run: 4,  Failures: 3,  Errors: 0

`VarFieldCapturedCompiled` was written after the edit was built, so its failing run is on the old code through the harness. Command, from `ProjectFortress/`: `FORTRESS_THREADS=4 explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base35 <private caches> junit compiler_tests/VarFieldCapturedCompiled.test`

    . run .../compiler_tests/VarFieldCapturedCompiled (611ms) FAIL: a function's reads  11  and  11  (expected 11 and 10), after a function's write  10  (expected 15), after a loop's writes  5  (expected 1007)
    Tests run: 2,  Failures: 1,  Errors: 0

The passing run, the last run of the tests after the last change of code. Command: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests AtomicExprCompiled.test AtomicFieldCompiled.test VarFieldCapturedCompiled.test`

    # junit.sh final 2026-11-17T01:05:16Z; nproc 4; ... FORTRESS_THREADS=4; tree 67b1030c48
    . run ProjectFortress/compiler_tests/AtomicExprCompiled (659ms) PASS
    . run ProjectFortress/compiler_tests/AtomicFieldCompiled (849ms) PASS
    . run ProjectFortress/compiler_tests/VarFieldCapturedCompiled (455ms) PASS
    OK (6 tests)

At one thread and at four, by `FORTRESS_THREADS=<t> ../bin/fortress run <P>` after `../bin/fortress compile compiler_tests/<P>.fss`:

    new AtomicExprCompiled threads=1: PASS        new AtomicExprCompiled threads=4: PASS
    new AtomicFieldCompiled threads=1: PASS       new AtomicFieldCompiled threads=4: PASS
    new VarFieldCapturedCompiled threads=1: PASS  new VarFieldCapturedCompiled threads=4: PASS

The old code on `AtomicFieldCompiled`, by `old-fortress.sh`: PASS at one thread; at four threads, two runs:

    FAIL: value parameter  39220  (expected  40000 ), body field  67439  (expected  80007 ), torn reads  1 , generic value parameter  39313  (expected  40000 ), ...
    FAIL: value parameter  37347  (expected  40000 ), body field  75523  (expected  80007 ), torn reads  0 , generic value parameter  34895  (expected  40000 ), ...

So each of the three kinds of var field loses updates on the old code, and a field read twice in one block once gave two values.

## The whole compiled suite

`ant testQuick`, once, on `67b1030c48`, after the last edit of code:

    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 102.384 sec      (library)
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 151.884 sec     (othercompiler)
    [junit] Tests run: 1625, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 417.822 sec    (compiler)
    BUILD SUCCESSFUL
    Total time: 7 minutes 2 seconds

`compiler_tests/XXXTupleVarFieldCompiledRungC` (ledger row 397) is among them and still fails as expected: a tuple-typed var field's setter fails verification as before, on old and new alike (program PBoxKinds below).

## The atomic programs on the final tree

The loop of the skill's gate.md, "The atomic runs", with the batch's two new programs and `VarFieldCapturedCompiled` added: 25 programs, three runs each at four threads, on `67b1030c48`. 75 lines, each `PASS`; no FAIL, NO-PASS, COMPILE-FAILED or TIMEOUT-TWICE. For the three new programs:

    # atomic AtomicExprCompiled run1 threads=4 PASS
    # atomic AtomicFieldCompiled run1 threads=4 PASS
    # atomic VarFieldCapturedCompiled run1 threads=4 PASS

(and run2 and run3 of each the same).

## Where the fix belongs, and the precedent search

- The atomic expression belongs in the code generator: the checker types it (`fortress typecheck compiler_tests/AtomicExprCompiled.fss` exits 0 on the base), walk runs it, and only `CodeGen.defaultCase` refused it. Its place is directly below `forAtomicBlock`, as the batch record assigns.
- The field belongs where an object's fields get their code: `forObjectDeclPrePass` builds one `VarCodeGen` for each value parameter and each field of the body, and every read and write of a field in a method goes through it (`forVarRef`, `forAssignment`). A field read from outside the object goes through the getter and setter methods that the desugarer makes, which are methods of the object. No other code in `compiler/codegen/` emits `GETFIELD` or `PUTFIELD` on an object's field (`grep -n 'GETFIELD\|PUTFIELD' CodeGen.java`: task results, closure siblings and RTTI only).
- The precedent is the top-level `var` (`VarCodeGen.MutableStaticBinding`, `generateVarDeclInnerClass` in `CodeGen.java`): a cell held in a final field, the check before each access, the cast after a read. `VarCodeGen.java` holds three classes that emit that check (`LocalMutableVar`, `MutableTaskVarCodeGen`, `MutableStaticBinding`; six methods). After the change the bare `GETFIELD`/`PUTFIELD` remains in two: `FieldVar` (an immutable field) and `TaskVarCodeGen` (an immutable value captured by a task).
- The library's own way: the one library's var fields are `OneShot(var canTryIt: Boolean)` (`Library/OneShotFlag.fss:15`), the generic `Box[\T\](var val: T)` and fields of an object's body; the tests take those three forms.

## What the specification settles

- `Specification/basic/expressions/atomic.tex:36-43`: the atomic expression's value and type are its body's; all its reads and writes appear as one step. It names no kind of location that is outside.
- `Specification/basic/evaluation/memory-ops.tex:48-49`: mutable fields of reference objects are mutable locations, as mutable variables are.
- `Specification/basic/objects.tex:35`, `:377`: a value object has no mutable field. The compiled path compiles one all the same (row 112, below).

## Programs run old against new

Each compiled and run by `old-fortress.sh` on the base build and by `bin/fortress` in this tree; the programs are scratch.

| program | what it does | old | new |
|---|---|---|---|
| `compiler_tests/AtomicFieldCompiled` at four threads | above | FAIL, updates lost on each var field | PASS |
| PFieldInTask | `fill(k) = for i <- 1#k do atomic do n := n + 1 end end` inside the object, on a var value parameter and a var body field, 40,000 each | `0` and `1` at one thread and at four | `40000` and `40001` at one thread and at four, as walk gives at four threads |
| PFieldClosure | a function expression in a method reads and writes two var fields; a setter from outside, `c.n := 9` | `11 11 5 11 9` | `11 10 7 14 9` |
| PBoxKinds | `Box[\T\](var val: T)` at `String`, at a tuple type and at an arrow type; a singleton object's var field; a tuple-typed var field with a setter | `b 7 8 4`, then `VerifyError` in `Pair.pr` (row 397) | the same five results |
| PValueVar | `value object V(var n: ZZ32)`: `V(1) === V(1)`, then `a.bump()` | `true false 2` | `false false 2` |

## The bytecode

By `javap -p -c` on the classes of `AtomicFieldCompiled`'s jar, old and new.

What the object holds, `Tally(start: ZZ32)` with `var total` and `step`:

    old:  public FZZ32 \%total;              new:  public final MutableFValue \%total;
    (both) public final FZZ32 \%start;       (both) public FZZ32 \%step;

An immutable field's read, before and after, the same but for the constant-pool index:

    old:  0: aload_0     1: getfield #28  // Field "\\%start":Lcom/sun/fortress/compiler/runtimeValues/FZZ32;
    new:  0: aload_0     1: getfield #55  // Field "\\%start":Lcom/sun/fortress/compiler/runtimeValues/FZZ32;
    old:  0: aload_0     1: getfield #34  // Field "\\%step":Lcom/sun/fortress/compiler/runtimeValues/FZZ32;
    new:  0: aload_0     1: getfield #61  // Field "\\%step":Lcom/sun/fortress/compiler/runtimeValues/FZZ32;

A var field's read (the getter `sum`), the same code inside and outside a block; the run-time check chooses:

    0: invokestatic  BaseTask.inATransaction:()Z
    3: ifeq 19
    6: invokestatic  BaseTask.getCurrentTransaction:()LTransaction;
    9: aload_0      10: getfield "\\%total":LMutableFValue;
    13: invokevirtual Transaction.TXRead:(LMutableFValue;)Lfortress/AnyType$Any;      16: goto 26
    19: aload_0     20: getfield "\\%total":LMutableFValue;
    23: invokevirtual MutableFValue.getValue:()Lfortress/AnyType$Any;
    26: checkcast FZZ32

A var field's write (in `add`): the same check, then `Transaction.TXWrite(MutableFValue, Any)` or `MutableFValue.setValue(Any)`. The constructor: `MutableFValue.make(Any)`, `aload_0`, `swap`, `putfield "\\%total":LMutableFValue;`.

A var value parameter of a generic object, `Box[\T extends Object\](var val: T)`, in the template class: `public final MutableFValue \%val;` (old: `public final T \%val;`), and each read ends in `checkcast T`, which the class loader renames at an instance; PBoxKinds runs it at `String`, a tuple type and an arrow type.

## The sentences of the specification made false

None. `grep -rn 'row~875\|row~319' Specification --include=*.tex` prints nothing outside `Specification-1.0-frozen/`; the two `atomic` lines of Appendix I (`Specification/appendices/changes.tex:6373`, `:6418`) speak of the `atomic` modifier on a function, which this change does not touch; `Specification/basic/expressions/atomic.tex:15`'s note is on that modifier too.

## Points to report

1. **The atomic expression as built, and what it shares with the block's code.** `CodeGen.java:1870-1877`. It shares all of it: the member emits no instruction of its own and calls `forAtomicBlock` on a block that holds the body. So the transaction's start, the commit, the exception-table entry written after the body, `leaveTransaction`, the delay and the retry are the block's, and a later change of the block's code reaches the expression. It also shares the block's limit: as a call's argument after the first it fails verification, as the block does (row 322, not this rung's).
2. **A mutable field as built.** Above, "What changed" item 2 and "The bytecode". A var value parameter of a generic object: the same cell; the cast after a read names the type parameter.
3. **Each test failing on the base and passing after at one thread and at four; the atomic programs.** Above.
4. **The distance stage's shadow patch still applies.** `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` on `67b1030c48`: `shadow sources written to ...`, exit 0.
5. **Sentences of the specification made false:** none.
6. **The files edited, for STAGE_BLIND:** `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java`, and six test files: `ProjectFortress/compiler_tests/AtomicExprCompiled.fss`/`.test`, `AtomicFieldCompiled.fss`/`.test`, `VarFieldCapturedCompiled.fss`/`.test`. Neither stage was run: the section asks for none. **Beyond those named:** no file; inside `VarCodeGen.java`, one line of `MutableStaticBinding`, whose `pushCell` went from `private` to `protected` (`:325`), so that `MutableFieldVar` can give its own; and one test beyond the two named, `VarFieldCapturedCompiled`. In `CodeGen.java` the hunks are within the lines the batch record gives this rung (`:1868` and `:4813-4862` at the base); `AtomicExpr` is written by its full name in the new member, so that the import list, which other rungs may edit, is untouched.
7. **Reserved points.** A model line: none changed. A change to an immutable field's code: none; an immutable field of an object's body is now made by `FieldVar`, not by `MutableFieldVar`, and the two emitted the same instructions; its JVM field keeps its flags. A change to a plain read or write of a variable outside `atomic`: none for a local or a top-level variable (their classes' code is unchanged; `pushCell`'s visibility is not bytecode of a program); a var field's plain read and write did change, from a bare `GETFIELD`/`PUTFIELD` to the check and the cell's `getValue`/`setValue`, which is the rung's subject and is what row 641 measures for the other variables.
8. **Not asked for, and reached:** a loop body or a function expression inside an object's method now reads and writes the object's var field, where the base gave it a copy (above, item 3 of "What changed").

## The ladder subset

The baseline holds no file whose recorded first error names the atomic expression (`awk` over `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`: no `codegen_node` of `AtomicExpr`). The subset is the pass-list's programs that hold `atomic` or an object's var field, and `tests/atomicExpr.fss`: ten files, run after the edit only, with the drivers copied to scratch.

    tests ObjectFieldShadowing.fss pass     tests atomic0.fss pass     tests atomic2.fss pass
    tests atomic3.fss pass     tests atomic4.fss pass     tests atomicTest.fss pass
    tests nestedTransactions1.fss pass     tests nestedTransactions2.fss pass     tests nestedTransactions4.fss pass
    tests atomicExpr.fss typecheck

Each phase is that of `explorations/compile-ladder/climb-batch-32/gate/ladder/ladder.tsv` for the nine, and of the baseline's `ladder.tsv` for `atomicExpr.fss` (typecheck: its first error is the checker's, before the code generator). The nine outputs equal the baseline's `raw/` but for the `Operation took <n>ms` line.

## Competing declarations

`git ls-files | grep` and `grep -rl 'component <Name>'` over `ProjectFortress` and `Library` find `AtomicExprCompiled`, `AtomicFieldCompiled` and `VarFieldCapturedCompiled` only in the new files. `forAtomicExpr` is the visitor's own method name (`nodes/NodeVisitor_void.java:148`), which `CodeGen` now overrides; `firstWrite` occurs nowhere else under `ProjectFortress/src/com/sun/fortress/`.

## Decisions

1. **The atomic expression is the block's code on a block that holds the body.** Ways not taken: a copy of `forAtomicBlock`'s labels, handler and retry around `x.getExpr().accept(this)` (two copies of the handler to keep alike); a helper that both call, which edits `forAtomicBlock`'s own body, which the section rules out. Evidence: the parser makes the same node for `atomic do e end` (`parser/DelimitedExpr.rats:155-163`); `AtomicExprCompiled` passes.
2. **`MutableFieldVar` extends `MutableStaticBinding` and overrides only where the cell is.** Ways not taken: a class of its own with a copy of the read and the write (about 60 lines, a fourth copy of the check), which would also need three edits of `CodeGen.java` outside this rung's lines for a task or a closure to capture the cell (`:5171`, `:5286`, `:5351` at the base), or else leave the captured copy; a location keyed by the object and the field, the fork's way not taken (A1). Evidence: fork A1, "as a top-level `var` is"; PFieldInTask and PFieldClosure, old against new. The cost in naming: `isAMutableStaticBinding()` is now true for a var field.
3. **The cell is made in the constructor by a `FieldVar` whose write wraps the value** (`firstWrite`), since the constructor's code assigns each field through the `VarCodeGen` it is given (`forExprsSerial`, `genParallelExprs`). Way not taken: a flag in `MutableFieldVar.assignValue` that tells the first write, which a method's write could not be told from.
4. **An immutable field of the body becomes a `FieldVar`;** its JVM field keeps `ACC_PUBLIC` without `ACC_FINAL`, so that no flag of an existing class file changes. Way not taken: `ACC_FINAL` on it, which is right and is a change to an immutable field, a reserved point.
5. **`VarFieldCapturedCompiled` is a test of its own,** not more assertions in `AtomicFieldCompiled`. Reason: it fails at one thread on the old code, so its failing run is certain, and `AtomicFieldCompiled`'s is a race.
6. **The field test's own atomic write of `torn` is a block,** not an atomic expression, so that on the base the test fails by the field's race and not at the code generator's wall.
7. **`ant testQuick` for "the whole compiled suite":** the compiler, othercompiler and library tracks, all of which compile objects. Way not taken: `ant testCompiler`, without the library track.

## Defects, each with its home

1. Row 875, the atomic expression refused: home 1, repaired; `compiler_tests/AtomicExprCompiled`.
2. Row 319, a var field outside the transaction: home 1, repaired; `compiler_tests/AtomicFieldCompiled`.
3. Not in the ledger: a loop body or a function expression inside an object's method reads and writes a copy of the object's var field (PFieldInTask: `0` of 40,000 on the old code at one thread). Home 1, repaired; `compiler_tests/VarFieldCapturedCompiled`. No row: the change that measured it repairs it.
4. Row 112, a value object with a var field: the compiled path compiles it too, and `V(1) === V(1)` went from `true` to `false`, since `SEQV` compares a value object field by field and a cell is equal only to itself (`nativeHelpers/equalityRule.java:83`). The specification forbids the program (`objects.tex:35`), and the row holds the gap; a note for it is in record.md. No test: the row's reproducer is `none`, and what the checker should say is not written anywhere.
5. Row 397, a tuple-typed var field's setter: unchanged, its `XXX` test still an expected failure.
6. Row 641, the check before every access: now also on a var field; the row's whole new line is in record.md. Not timed.
7. Added by the rung's skeptic. Not in the ledger: the compiled checker carries no declared type into an atomic expression's body. `f(): ZZ32 = atomic if c then 1 else 0 end` is refused on the base and on this branch alike, 'NaturalNumeral cannot be written in a program except as a parameter's type.'; `f(): ZZ32 = atomic 1` was the code generator's wall on the base and now compiles to a class that fails verification, since the numeral's coercion is applied outside the expression with its function already on the stack (row 322's cause). `atomic do ... end` over the same bodies runs, and walk runs all of them. Home 2, deferred to the checker: `compiler_tests/XXXAtomicExprNumeralArms.test`, and `compiler_tests/AtomicExprNumeralBodyLink.test` with `compiler_tests/XXXAtomicExprNumeralBody.test`; the row is NEW-A-1 in record.md.

## For FACTS

In record.md.

## Commands worked out

- The object's class of a compiled test, for `javap`: `unzip default_repository/caches/bytecode_cache/<Component>.jar` into a scratch folder (the jar's names use `$`, and a generic template's name holds `⟦⟧`; copy that file to a plain name before `javap -p -c`).
- A compiled `.test` through the harness on the old code: from `ProjectFortress/`, `old-fortress.sh <base-build> <private caches> junit compiler_tests/X.test`, the skill's form.
