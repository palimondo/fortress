# Rung S: a superscript after a dotted access and after a parenthesised call

- problem: a superscript after a dotted access is a bare `Syntax Error` on both paths (ledger row 84), and walk refuses a parenthesised call followed by `^T` (ledger row 158): explorations/fortress-gap-ledger.md:52, explorations/fortress-gap-ledger.md:67
- spec: "A tight juxtaposition is always left-associated if it contains any dot", and the reassociation's rule for an argument "immediately followed by a non-expression element": Specification/basic/operators/juxtameaning.tex:130
- precedent: `MathPrimary`'s action, which the new alternative of `PrimaryItem` repeats with the dotted primary as the front (ProjectFortress/src/com/sun/fortress/parser/Expression.rats:478); for walk, the checker's reading of a parenthesised element as one expression element: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala:81
- deviation: none from the specification's spelling; from the precedent, one: the dotted primary's own subscripts and calls stay inside `LeftAssociatedPrimary` and are not math items: ProjectFortress/src/com/sun/fortress/parser/Expression.rats:386
- historical: ProjectFortress/src/com/sun/fortress/parser/Expression.rats, ProjectFortress/src/com/sun/fortress/parser/Fortress.java, ProjectFortress/src/com/sun/fortress/parser/templateparser/TemplateParser.java, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:969

The worktree was seeded by `seed-worktree.sh` (exit 0) from `/home/user/fortress-base33`, whose head `84f1c37190` is three commits behind the base `db352c1776`; `git diff --name-only 84f1c37190 db352c1776 -- ProjectFortress Library build.xml` prints nothing, so its build is the base's code. The code commit is `21045c6c65`; `da459aaeae` adds one test and no code.

## What changed and why

1. **Walk, row 158.** `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:965-970`, in `forOpExpr`'s postfix branch: an operand that stands in parentheses (`NodeUtil.isParenthesized(arg)`) is evaluated as any operand. Before, the branch looked only at the operand's node: a tight juxtaposition went to `forTightJuxt(…, true)`, which refuses a function application (`Evaluator.java:1327-1332`, the lines after the edit), and an exponentiation was refused outright (`Evaluator.java:971-974`), whether or not parentheses stood around it. The specification's two static errors are about an element "immediately followed by a non-expression element" (`Specification/basic/operators/juxtameaning.tex:156-162`); a parenthesised expression is one expression element, and the grammar makes it a `Primary` that an `ExponentOp` may follow (`Specification/basic/expressions/operator-app.tex:29-32`). `forTightJuxt` itself is not changed: it is no longer reached for a parenthesised operand.
2. **The parser, row 84.** `ProjectFortress/src/com/sun/fortress/parser/Expression.rats:380-400`, `PrimaryItem`: a `LeftAssociatedPrimary` is followed by `MathItem*`, and is the front of those items, built as `MathPrimary` builds its own: no item, the dotted primary itself; one item, `ExprFactory.simplifyMathPrimary` (an `OpExpr`, a `SubscriptExpr` or a tight `Juxt`); more, a `MathPrimary` node. `LeftAssociatedPrimary`, `MathPrimary`, `MathItem` and `Exponentiation` are not changed. `parser/Fortress.java` and `parser/templateparser/TemplateParser.java` are the two parsers that the build generates from the grammar; `PreFortress.java` did not change. The template parser's grammar modifies the modules of `parser/*.rats` and has no copy of `PrimaryItem` to edit (`parser/templateparser/Expression.rats:15-52`).
3. **Nothing in the checker or the code generator.** The new trees are node kinds that both already take (below, "The trees").

## The failing runs and the passing runs

Row 158, walk, on the base's code (before the first build of an edit), 2026-11-16T01:35:48Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss ProjectFortress/tests/SuperscriptAfterCallRefused.fss ProjectFortress/tests/SuperscriptAfterCallRefused.test
    # harness-one 2026-11-16T01:35:48Z; tree db352c1776; ...
    com.sun.fortress.exceptions.ProgramError: tmp/h1/tests/SuperscriptAfterParenthesisedCall.fss:26:13-15:
    Syntax Error: a function argument should not be immediately followed by a non-expression element.
    . interpret tmp/h1/tests/SuperscriptAfterCallRefused
     OK Saw expected refusal at load
    Tests run: 2,  Failures: 1,  Errors: 0

Row 84, walk, in the worktree with the walk edit built and the grammar still the base's, 2026-11-16T01:39:41Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/SuperscriptAfterDottedAccess.fss
    com.sun.fortress.exceptions.ProgramError: nulltmp/h1/tests/SuperscriptAfterDottedAccess.fss:33:29:
        Syntax Error
    Tests run: 1,  Failures: 1,  Errors: 0

Row 84, compiled, on the base build through the old code's harness:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base33 $PWD/tmp/old-caches junit $PWD/ProjectFortress/compiler_tests/SuperscriptAfterDottedAccessCompiled.test
    . link .../compiler_tests/SuperscriptAfterDottedAccessCompiled .../SuperscriptAfterDottedAccessCompiled.fss:33:29:
        Syntax Error
    File SuperscriptAfterDottedAccessCompiled.fss has 1 error.
    Tests run: 2,  Failures: 2,  Errors: 0

The compiled guard of row 158's forms passes on the base, as the section says it must (`junit.sh base … SuperscriptAfterParenthesisedCallCompiled.test XXXSuperscriptAfterCallRefusedCompiled.test`, 2026-11-16T01:36:15Z: `OK (3 tests)`).

After the last change of code (the grammar's build ended 01:40), walk:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/SuperscriptAfterDottedAccess.fss ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss ProjectFortress/tests/SuperscriptAfterCallRefused.fss ProjectFortress/tests/SuperscriptAfterCallRefused.test
    # harness-one 2026-11-16T01:40:50Z; ...
     OK Saw expected refusal at load
    OK (3 tests)

and compiled:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests SuperscriptAfterParenthesisedCallCompiled.test XXXSuperscriptAfterCallRefusedCompiled.test SuperscriptAfterDottedAccessCompiled.test XXXSubscriptThenSuperscriptCompiled.test
    . run ProjectFortress/compiler_tests/SuperscriptAfterDottedAccessCompiled (616ms) PASS
    OK (6 tests)

The first `XXX` test, `XXXSuperscriptAfterCallRefusedCompiled.test`, was shown red through the harness with its program changed for one run to `println((f(3))^T)`, which compiles: `Saw failure, but did not satisfy compile_err_contains`, `Tests run: 1,  Failures: 1`; the file was then restored (`git checkout`).

## The tests

- `ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss`: `(f(3))^T` = 104, `(f(3))^T d` = 208, `((f(3))^T) d` = 208, `(f(3))^2` = 16, `(f(3))!` = 1004, `(d^3)!` = 1008. `compiler_tests/SuperscriptAfterParenthesisedCallCompiled` asserts the same values.
- `ProjectFortress/tests/SuperscriptAfterCallRefused.fss` with `.test`: `r: ZZ32 = f(3)^T` at the top level is refused, `load_exception_contains=the argument should not be immediately followed by a non-expression element`. `compiler_tests/XXXSuperscriptAfterCallRefusedCompiled.test` over `SuperscriptAfterCallRefusedCompiled.fss`: the checker's refusal, `compile_err_contains=Item at this location must be an expression, not an operator.` Its form is that of `compiler_tests/XXXNumeralWhereRefusedCompiled.test`: in the compiled folders a refusal that is right is an `XXX`-named `.test` over a plain-named component.
- `ProjectFortress/tests/SuperscriptAfterDottedAccess.fss` and `compiler_tests/SuperscriptAfterDottedAccessCompiled`: `x.v^T` = 107, `(B.data^T).v` = 101, `B.n^2` = 9, `(B.data^*).v` = 201, after a getter 102, after a method call 101, after a method call with an argument 105, `B.h(1)^2` = 16, `B.n^T d` = 206, `d B.n^T` = 206, `B.data[5]^2` = 36, `(O.inner.data^T).v` = 101, `O.inner.n^2` = 9, `self.data^T` in a method 101, `B.n^2 + B.n^T` = 112; and the guards `B.data[5]` = 6, `(B.data!).v` = 301, `((B.data)^T).v` = 101.
- `compiler_tests/XXXSubscriptThenSuperscriptCompiled`: a defect measured, below.

## Each form on the base and after (points to report)

One program for each form, run under walk and compiled, on the old code (`tmp/…/probes/run.sh old`, through `old-fortress.sh /home/user/fortress-base33`) and on the edit (`run.sh new`). "SE" is the bare `Syntax Error` at the `^`.

| form | base, walk | base, compiled | after, walk | after, compiled |
|---|---|---|---|---|
| `x.v^T` | SE | SE | 107 | 107 |
| `(B.data^T).v` | SE | SE | 101 | 101 |
| `B.n^2` | SE | SE | 9 | 9 |
| `(B.data^*).v` | SE | SE | 201 | 201 |
| `(B.twin^T).v`, a getter | SE | SE | 102 | 102 |
| `(B.f()^T).v`, a method call | SE | SE | 101 | 101 |
| `B.n^T d` | SE | SE | 206 | 206 |
| `B.data[5]`, guard | 6 | 6 | 6 | 6 |
| `(B.data!).v`, guard | 301 | 301 | 301 | 301 |
| `(f(3))^T` | refused, "a function argument should not be immediately followed by a non-expression element" | 104 | 104 | 104 |
| `(f(3))^T d` | refused, the same | 208 | 208 | 208 |
| `((f(3))^T) d` | refused, the same | 208 | 208 | 208 |
| `(f(3))^2` | 16 | 16 | 16 | 16 |
| `f(3)^T` | refused, "Syntax Error: the argument should not be immediately followed by a non-expression element." | refused, "Item at this location must be an expression, not an operator." | the same refusal | the same refusal |
| `f(3)^2` | refused, as `f(3)^T` | refused, as `f(3)^T` | the same | the same |
| `twice(B.n)^2` | refused, as `f(3)^T` | refused, as `f(3)^T` | the same | the same |

`(f(3))^2` ran under walk on the base: the infix `^` never entered the postfix branch. `(f(3))!` and `(d^3)!` are in the test and not in this table: the probe programs of the two declared `!` on another type; on the base walk refused both ("a function argument…", "an exponentiation should not be immediately followed by a non-expression element"), which the walk test's failing run does not reach past its first assertion.

## The trees (points to report)

`bin/fortress parse -out TreeProbe.ast TreeProbe.fss`, on the edit:

- `p.wq^T`: `OpExpr` of the postfix `^T` over `FieldRef(p, wq)`.
- `p.wq^T x`: a loose `Juxt` of that `OpExpr` and `VarRef x`.
- `a.m(x)^T`: `OpExpr` of the postfix `^T` over `MethodInvocation(a, m, x)`.
- `p.wq[i]^2`: `OpExpr` of the infix `^` over `SubscriptExpr(FieldRef(p, wq), i)` and the literal 2. The subscript is the dotted primary's own (`SubscriptingLeft`), not a math item.

The compiled path compiles and runs each, with walk's values: the program prints `101`, `303`, `105`, `25` under walk and compiled (`bin/fortress TreeProbe.fss`; `bin/fortress compile TreeProbe.fss`, `bin/fortress run TreeProbe`). No file of the checker or the code generator is edited: these are the nodes that `(p.wq)^T` built before.

## Where the fix belongs, and the precedent search

- The parser is the place for row 84: the row's notes name the gap in `PrimaryItem` and `LeftAssociatedPrimary`, and the specification's grammar gives `Primary ^ Exponent`, `Primary ExponentOp`, `Primary LeftEncloser … RightEncloser`, `Primary ArgExpr` and `Primary Primary` where `Primary.Id` is itself a `Primary` (`Specification/appendices/grammars/concrete-syntax.tex:937-953`). So every math item may follow a dotted primary, not the superscript alone.
- Walk's postfix branch is the place for row 158: the row's notes name `Evaluator.java:970-971`. The checker already reads a parenthesised element as an expression element (`scala_src/typechecker/impls/Operators.scala:76-85`), which is why the compiled path ran the three forms.
- Precedent in the file: one. `MathPrimary` (`Expression.rats:478-488`) is the only production that attaches math items to a front; `ExprFactory.simplifyMathPrimary` and `makeMathPrimary` have no other caller in the grammar (`grep -n "simplifyMathPrimary\|makeMathPrimary" parser/*.rats`: lines 394, 396, 485, 487 after the edit).
- No earlier repair of this defect: neither row had a reproducer, and neither grammar production nor walk's branch was edited for it before (`git log --oneline -i --grep='row 84\|row 158'` lists only record commits).

## What the specification settles

- `p.wq^T` is `(p.wq)^T`, and `a.m(x)^T` is `(a.m(x))^T`: `Specification/basic/operators/juxtameaning.tex:130-131`; fork S1.
- `(f(x))^T` is an operator application: `Specification/basic/expressions/operator-app.tex:29-32`; the static error is only for an argument "immediately followed by a non-expression element" (`juxtameaning.tex:156-162`).
- `f(x)^T` stays a static error on both paths: fork S2, row 144. The tests pin both messages.
- `Specification/basic/expressions/operator-app.tex:72`, the note "The following examples are not yet working": no example of its list holds a dotted access, a postfix operator or a parenthesised call followed by a superscript, so the change moves none of them, and the note is not changed. I ran none of them.

## Programs run old against new

The table above (16 forms), and these, each under walk and compiled:

| form | base | after |
|---|---|---|
| `B.f()[5]`, `B.data.m(1)[5]`: a subscript after a dotted method call | SE on both | 6, 7 on both |
| `x.k(1)d`: a tight identifier after a dotted method call | SE on both | 16 on both (the juxtaposition, 8 times 2) |
| `B.n^T(d)`, `x.k(1)^T(d)`: a parenthesised item after the superscript | SE on both | 206, 216 on both |
| `B.n^(d)` | SE on both | 9 on both |
| `B.n^2^2` | SE on both | refused: walk "an exponentiation should not be immediately followed by a subscripting or an exponentiation", checker "Two consecutive ^s." |
| `B.n^T!` | SE on both | walk refuses: "an exponentiation should not be immediately followed by a non-expression element"; the checker went on to the operator's type |
| `B.data^T.v`, `B.data.v^T.asString`: a selector after the superscript | SE on both | SE on both |
| `B.data!^T`, `d^B.n` | SE on both | SE on both |
| `d^T^T` | refused on both | the same |
| `B.f()[5]^2` | SE on both | fails on both as `x[5]^2` and `(B.f())[5]^2` do on the base and after: "A defect measured" |

The first three rows are forms beyond a superscript that the edit also accepts, because the dotted primary takes every math item: each is in the specification's grammar and is left-associated by `juxtameaning.tex:130-131`. They are run, not asserted in a test.

## The suites, on the code of `21045c6c65`

- `ant testSystem`: `BUILD SUCCESSFUL`, `Total time: 5 minutes 13 seconds`; the four shards 211 + 208 + 203 + 211 = 833 tests, 0 failures, 0 errors.
- `ant testQuick`: `BUILD SUCCESSFUL`, `Total time: 7 minutes 28 seconds`; compiler 1574, library 86, othercompiler 263 tests, 0 failures, 0 errors.
- No existing test changed its verdict, its output or a pinned message, and no line of an existing test is edited.
- The 52 team demos: `bash tmp/run-demos.sh tmp/demos`, the driver of `explorations/compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out", under walk on the edit: `demos: 52 run, 52 reached their end`.
- microGPT's quick checks: `explorations/coordinator/tools/mg-run.sh tmp/rung-superscript-after/mg after`, on the edit: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0 secs=79` for `MicroGptFlatQuick.fss` and the same verdict, `rc=0 secs=71`, for `MicroGptAplQuick.fss`.

## The stages, on the code of `21045c6c65` (no change of code followed their start)

- Count: `explorations/coordinator/tools/checker-count/run.sh`: `#total 0`, `#locations 0`, `#crash none`; `diff explorations/compile-ladder/climb-batch-30/gate/checker-count.txt tmp/…/checker-count-postedit.txt` prints nothing.
- Distance: `explorations/coordinator/tools/distance/run.sh`: `#total 0`, every `#kind` 0, `#crash none`, `#seconds 147 FortressLibrary 92`; `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-30/gate/distance.txt tmp/…/distance-postedit.txt` prints `DISTANCE SAME   0`. `dist-post/errors.tsv` and `explorations/compile-ladder/gate/distance-sites.tsv` each hold their header alone: no site moved.
- The checker's time is not measured: no Scala of the checker and no code generated for it is edited.
- The ladder subset: the 14 files whose first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` is a bare `Syntax Error` at the parse phase (13 of `not_working_library_tests`, and `tests/XXXExportsEE.fss`), run after the edit only: all 14 stay at `parse`, `Syntax Error`. None is in the newest landed `ladder.tsv`, which holds the 85 passing programs, so the baseline's rows are the comparison.

## Sentences of the specification made false

None. `grep -rn -i "superscript\|non-expression element\|\^T" Specification/appendices/changes.tex` prints nothing, and the notes of `juxtameaning.tex` and `operator-app.tex` say nothing of either gap.

## Points to report reached

1. Each form of rows 84 and 158 fails on the base and passes after on each path, and `f(x)^T` is still refused on both, with its messages: the table above; `ProjectFortress/tests/SuperscriptAfterDottedAccess.fss:45-64`, `ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss:26-31`, `ProjectFortress/tests/SuperscriptAfterCallRefused.test:1`, `ProjectFortress/compiler_tests/XXXSuperscriptAfterCallRefusedCompiled.test:3`.
2. The trees: above.
3. Existing tests whose verdict, output or pinned message changed: none.
4. The count and distance tables: 0 and 0, `#crash none`, on `21045c6c65`.
5. Sentences of the specification made false: none.
6. Files edited beyond those named: `parser/Fortress.java` and `parser/templateparser/TemplateParser.java`, generated by the build from the grammar and tracked. No file of the checker or the code generator.
7. Beyond the section's forms: a dotted primary now takes every math item, so a subscript, a parenthesised item and a tight identifier or literal after a dotted method call parse where they were a `Syntax Error` (the second table). No expression without a dot changes: `twice(B.n)^2`, `f(3)^T`, `d^T^T` answer as before.

No reserved point is reached: no model line is changed, `f(x)^T` is accepted on neither path, and no expression without a dot and without parentheses reassociates differently.

## Decisions

1. **The dotted primary takes `MathItem*`, every math item.** Ways not taken: (a) `Exponentiation?` alone after a dotted primary, the smallest grammar for the row's probes, which would leave `B.n^2^2` a bare `Syntax Error` where the specification gives a named static error, and `p.wq^T(x)` unparsed; (b) `MathItem*` inside each of `LeftAssociatedPrimary`'s five alternatives, five copies of one action. Evidence: the section's words, "a dotted primary takes the math items that MathPrimary takes after its front"; `concrete-syntax.tex:937-953`.
2. **The items are built as `MathPrimary` builds them, with the dotted primary as the front,** so that one item gives the node that the parenthesised spelling gave (`(p.wq)^T` and `p.wq^T` are one `OpExpr`), and several items go through the reassociation that both paths have. Way not taken: a left fold of the items in the parser, which would read `B.n^2^2` as `(B.n^2)^2` and lose the static error.
3. **Walk: the test of parentheses stands before the three cases of the postfix branch,** so `(a^b)!` and `(f(x)^y)!` are freed with `(f(x))^T`. Way not taken: the test inside `forTightJuxt` only, which frees the call and leaves `(d^3)!` refused; the cause is one, the branch ignoring the parentheses, and the checker accepts both. Evidence: on the base `(d^3)!` is refused under walk and the compiled guard passes.
4. **The compiled refusal of `f(3)^T` is an `XXX`-named `.test` over a plain component,** after `compiler_tests/XXXNumeralWhereRefusedCompiled.test`. Way not taken: a plain `.test` with `compile_err_contains`, which the harness reports red on any `FAIL` in the compile's output (the run of 01:36:15Z).
5. **The demos and the model's quick checks were run** though the section does not list them: the skill asks for the demos after an edit of the parser, and the batch's invariant is the quick checks.
6. **Row 1 gets a note and its compiled half a new row,** not a repair: `x[5]^2` is an expression without a dot, outside the rung.

## A defect measured, and its home

- **`x[5]^2` on the compiled path** stops the compile: '** bug! Result of typechecking still contains intermediate nodes.' It is the base's behaviour for `x[5]^2` and `(B.f())[5]^2`, and the dotted `B.f()[5]^2` now reaches it instead of a `Syntax Error`. Under walk the same forms fail as row 1 says ("Unification error: Closure/Constructor for _[_] param 1 (i:ZZ32) got arg ()"). Home 2: deferred, and the specification settles it (`juxtameaning.tex`, "Juxtaposition": only an exponentiation followed by a subscripting or an exponentiation is an error). The gated `XXX` test is `ProjectFortress/compiler_tests/XXXSubscriptThenSuperscriptCompiled.test`; the new row is NEW-S-1 in record.md. Walk's half is row 1, which has no test; this rung adds none, since the row is not its own, and gives the row a note.
- Rows 84 and 158: home 1, the assertions of the plain tests above.

## Commands worked out

- The tree of a program: `bin/fortress parse -out P.ast P.fss`, a text dump of the parsed component.
