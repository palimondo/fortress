# Rung A, rung-atomic-expr-field: the skeptic's check

Head judged: `150db70271` (code and tests in `67b1030c48`). Head after: this file's commit, on `fab319cdbc`. One launch of the skeptic. Verdict: **approved**, with one correction, none contested. The report's runs and tables are those of the worker's head; no code changed after it, and nothing was built here.

## What was checked

1. **The stages.** The section asks for none (STAGE_BLIND). `git diff --name-only c1ce2a35e1...150db70271` lists `compiler/codegen/CodeGen.java` and `VarCodeGen.java`, the two files the section names, six test files and the two record files. No file of the compiled checker changed, so no count stage was run here. The shadow patch, run again on the head: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` printed `shadow sources written to ...`, exit 0.
2. **Test first**, read in the worker's transcript. The failing run through the harness on the base's code, call `nuGTuy`, 00:44:54 to 00:45:05 UTC, `tree c1ce2a35e1`: `Can't compile AtomicExpr at ProjectFortress/compiler_tests/AtomicExprCompiled.fss:8.9`, `FAIL: value parameter  34631  (expected  40000 )`, `Tests run: 4,  Failures: 3,  Errors: 0`. The first edit of code is call `9FP6cB`, 00:47:38; the first build, `pw8ccC`, 00:47:50; the last change of code, `5LSUds`, 00:48:43. The passing run, call `Y7UgsZ`, 01:05:16, `tree 67b1030c48`: `OK (6 tests)`. `VarFieldCapturedCompiled` was written after the build; its failing run is on the old code through the harness, call `Rcbqo7`, 00:51:36: `after a loop's writes  5  (expected 1007)`, `Tests run: 2,  Failures: 1,  Errors: 0`. `ant testQuick` started at 00:53:26, after the commit, and ended `BUILD SUCCESSFUL`, `Total time: 7 minutes 2 seconds`; the atomic loop on `67b1030c48` counted 75 PASS and no other line.
3. **The diff, line by line.** `forAtomicExpr` builds the block the parser makes for `atomic do e end` (`ExprFactory.makeBlock(span, type, atomicBlock = true, withinDo = true, [e])`) and calls `forAtomicBlock`; it emits nothing of its own. `MutableFieldVar` overrides only `pushCell`; the constructor's write goes through `firstWrite`. A task or a closure captures the cell at the three sites that ask `isAMutableStaticBinding()` (`CodeGen.java:5192`, `:5307`, `:5372`), which are all the uses of that test. The edit is within the section's lines but for `pushCell`'s visibility, which the report names. Fork A1 is built as stated: a cell, for a `var` field and a `var` value parameter, P-169's store untouched.
4. **The precedent.** The top-level `var` (`VarCodeGen.java:313`) is the code's own way, as A1 says. No other site makes a `FieldVar` or a `MutableFieldVar` (`grep` over `ProjectFortress/src/com/sun/fortress/`).
5. **The tests.** Each exercises its defect, holds one comment line and is named by its topic.
6. **The citations of the report**, each opened: `atomic.tex:36-43`, `memory-ops.tex:48-49`, `objects.tex:35` and `:377`, `VarCodeGen.java:313`, `DelimitedExpr.rats:155-163`, `Expression.rats:737-738`, `CodeGen.java:1627`, `equalityRule.java:83`, `changes.tex:6373` and `:6418`. Each says what the report says. No sentence of the live specification speaks of the compiled path's atomic expression or of a field in a transaction; none is made false.
7. **Competing declarations.** The three test names and `firstWrite` occur only in the new files; `forAtomicExpr` is the visitor's own name.

## The differential: my programs, old against new

Each by `tmp/rung-atomic-expr-field/skeptic/go.sh P`: `bin/fortress compile` and `run` in this tree, `old-fortress.sh /home/user/fortress-base35 <private caches> compile` and `run`, and walk by the old tool, each run at `FORTRESS_THREADS=1` and `=4`. The new code's four-thread runs of SkField, SkExpr and SkBank were repeated five times, each with one output.

**SkField**: a `var` value parameter and two `var` body fields, one initialised from the parameter; a throw out of a block that wrote two fields; a swap of two fields beside a block that reads both; a singleton object's field; a generic object with a `var` value parameter and a `var` body field of type `T`, at `String`, read by a function expression and written by a loop body; an object made inside a block.

    new, threads 1 and 4, and walk, threads 1 and 4:
      after throw  10   0  caught  1     swaps: sum  25  torn  0     solo  30000     gbox  y   x   y     gbox2  z   z     fresh  5
    old, threads=4:
      after throw  19   9  caught  1     swaps: sum  26  torn  20000  solo  28044     gbox  y   x   x     gbox2  y   x     fresh  5

So on the old code a throw did not revert a field, two fields were not read as one step, updates were lost, and a closure and a loop body worked on copies; the new code gives walk's answers at both thread counts.

**SkExpr**: `atomic n := n + 1` and `atomic (n + 0)` on a field, `atomic if ... end` that writes a field, an atomic expression over a call, over a string, nested, as a first argument, in a function expression, in a loop body, and one whose body throws after a write.

    new, threads 1 and 4, and walk:  inc 20000 20000 / take 0 20000 / bumpg 10000 20000 / nested 10001 10000 ab / throw 10000 1 / fn 10001
    old:  Can't compile AtomicExpr at .../SkExpr.fss:8.17

**SkBank**: two objects, a transfer between their `var` value parameters in one block and a check `atomic (a.bal + b.bal)` beside it, 20,000 of each; a setter from outside, `a.bal := 7` and `a.bal += 3`; a trait's method over an object's getter.

    new, threads 1 and 4, and walk:  bank 600 400 moves 20000 bad 0 / setter 10
    old:  Can't compile AtomicExpr

**C1 to C4**: an atomic expression and an atomic block whose `ZZ32` value a coercion converts at `ZZ64`: new `v 3`, `v 3`, `v 4`, `v 4`, as walk; old refuses the two expressions and runs the two blocks.

## The reserved points, one program each

**SkPlain**: an object with an immutable value parameter and an immutable body field, read in a method, in a function expression and in a loop body; a local `var`; a top-level `var`; no `var` field. Old, new and walk print `4 5 9 9 50 10 13` at both thread counts. The seven class files of its jar, old and new, are byte for byte the same (`cmp` over the two unpacked jars: `7 same`). So neither reserved point is reached: an immutable field's code and a plain read or write of a local or top-level variable are unchanged. A `var` field's plain read and write did change, to the check and the cell, which is the rung's subject; the worker lists it.

## Finding, and its fix

**A numeral as the value of an atomic expression at a place of declared type.** Not in the ledger (`ledger.py find` with "numeral atomic", "AtomicExpr", "cannot be written").

    N1  f(): ZZ32 = atomic if g > 0 then 1 else 0 end       old typecheck and new compile alike:
          NaturalNumeral cannot be written in a program except as a parameter's type.          walk: v 1
    N2  f(): ZZ32 = atomic do if g > 0 then 1 else 0 end end   new: v  1     walk: v 1
    N3  f(): ZZ32 = atomic 1       old: Can't compile AtomicExpr
          new: java.lang.VerifyError: Inconsistent stackmap frames at branch target 3        walk: v 1
    N7  f(): ZZ32 = atomic do 1 end                             new: v  1     walk: v 1

The cause is the checker's, on the base and on the head alike: its join of numerals in result positions has cases for a block, `do`, `if`, `case` and `try` and none for an atomic expression (`scala_src/typechecker/impls/Functionals.scala:1304-1356`; `impls/Misc.scala:451-454`). So numeral arms keep their numeral types, and a lone numeral is converted outside the expression, with the coercion's function on the stack when the transaction starts, which is row 322's cause. The specification gives the atomic expression its body's value and type (`Specification/basic/expressions/atomic.tex`, section "Atomic Expressions"). The rung's own code is right here: the checker's files are not the rung's, and the worker's first record line, "Holds for every body the checker accepts", was too broad by this one case.

The fix, a correction (commit `fab319cdbc`, "Skeptic's fix: record the numeral body of an atomic expression, with its expected-failure tests"): home 2, by the skill's tests-writing.md, "How a defect is recorded".

- `compiler_tests/XXXAtomicExprNumeralArms.fss` and `.test` (`compile`, `compile_err_contains`).
- `compiler_tests/XXXAtomicExprNumeralBody.fss`, `AtomicExprNumeralBodyLink.test` and `XXXAtomicExprNumeralBody.test` (`run`, `run_out_does_not_contain=REACHED`).
- The row NEW-A-1 in record.md, linted with `ledger.py check --rows` under a number: `1 rows, 0 fail the template`. Row 322 has no room for a note (`ledger.py note 322 ... --check`: 47 characters left), so the new row names it as a sibling.
- record.md's finding 1, its "New rows", its handover and its first Revival-change line, and REPORT.md's "Defects, each with its home", item 7.

Through the harness on the head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic-head ProjectFortress/compiler_tests XXXAtomicExprNumeralArms.test AtomicExprNumeralBodyLink.test XXXAtomicExprNumeralBody.test`:

    # junit.sh skeptic-head 2026-11-17T02:14:59Z; ... FORTRESS_THREADS=4; tree 150db70271
     Saw expected failure
    . link ProjectFortress/compiler_tests/XXXAtomicExprNumeralBody  OK (time = 1769ms)
    Saw expected failure (Exit code != 0)
    OK (3 tests)

The first of them with the defect hidden for one run (the body written `atomic do if g > 0 then 1 else 0 end end`, then restored): `Saw failure, but did not satisfy compile_err_contains`, `Tests run: 1,  Failures: 1,  Errors: 0`. On the base's code, from `ProjectFortress/`, `old-fortress.sh /home/user/fortress-base35 <private caches> junit` over the same three files: `Saw expected failure`, `OK Saw expected exception` (the link meets the code generator's wall there), `Saw expected failure (Exit code != 0)`, `OK (3 tests)`. They are expected failures on both, so there is no failing and passing pair: the defect stands until the checker is repaired.

Settled by: `Specification/basic/expressions/atomic.tex:42-43`, "The value and type of an \KWD{atomic} expression are the value and type of its body expression."

## The three homes

Rows 875 and 319: home 1, as the report says. The captured copy: home 1, `VarFieldCapturedCompiled`; my SkField shows it too on a generic object (`gbox y x x` old, `gbox y x y` new). Row 112, row 397 and row 641: as the report says. The numeral body: home 2, above.

## The failure-mode question

- 'Can't compile AtomicExpr' becomes a compiled program whose value is the body's, as the specification gives it.
- For a lone numeral body the compile-time refusal becomes a `VerifyError` when the class loads: still loud, later (NEW-A-1).
- A `value` object with a `var` field, which the specification forbids and nothing refuses (row 112): `V(1) === V(1)` was `true` and is `false`, with no message. The worker reports it and writes the row's note.

## Where I differ from the worker's account

Nowhere on its decisions. One sentence of its record was too broad, corrected above.
