# Rung S: record lines

## For FACTS

**A superscript follows a dotted access and a parenthesised call on both paths.** `p.wq^T`, `B.n^2`, `B.f()^T` and `B.data[5]^2` parse as the operator applied to the whole dotted primary to its left, and `(f(x))^T`, `(f(x))!` and `(a^b)!` run under walk as they do compiled; `f(x)^T` and `f(x)^2` stay a static error on both paths (walk: "the argument should not be immediately followed by a non-expression element"; the checker: "Item at this location must be an expression, not an operator."). The parser reads a primary with a dot as the front of the math items that follow it (`ProjectFortress/src/com/sun/fortress/parser/Expression.rats:386-400`), so a subscript, a parenthesised item or a tight identifier after a dotted method call parses too; the one node kind it builds for a single item is the one the parenthesised spelling built, so neither the checker nor the code generator changed. Walk's postfix branch evaluates an operand in parentheses as one expression (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:965-970`). For the work: a model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx`; a selector after a superscript, `B.data^T.v`, is still a syntax error, and a subscript math item followed by a superscript, `x[5]^2` or `B.f()[5]^2`, still fails on both paths (row 1 under walk, NEW-S-1 compiled). Tests: `ProjectFortress/tests/SuperscriptAfterDottedAccess.fss`, `ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss`, `ProjectFortress/tests/SuperscriptAfterCallRefused.fss` with its `.test`, and `compiler_tests/SuperscriptAfterDottedAccessCompiled.test`, `SuperscriptAfterParenthesisedCallCompiled.test`, `XXXSuperscriptAfterCallRefusedCompiled.test`. Detail: `explorations/compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after" and "The trees".

## Ledger: rows closed

- Row 84: close, commit `21045c6c65`, test `ProjectFortress/tests/SuperscriptAfterDottedAccess.fss` (compiled: `compiler_tests/SuperscriptAfterDottedAccessCompiled.test`). All seven probes of the row run on both paths with one value each.
- Row 158: close, commit `21045c6c65`, test `ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss` (compiled guard: `compiler_tests/SuperscriptAfterParenthesisedCallCompiled.test`).
- Row 144: no change. Its refusal is pinned by `ProjectFortress/tests/SuperscriptAfterCallRefused.fss` with its `.test` and by `compiler_tests/XXXSuperscriptAfterCallRefusedCompiled.test`; the row's reproducer cell is left as it is, as the section asks.

## Ledger: rows changed

Row 301, the whole new line (its claim named `(onehot(ks, 5))^T dx` as row 158's refusal, which now runs), for `ledger.py rewrite 301`:

| 301 | a dotted method call may follow a call where a postfix operator may not: `onehot(ks, 5).t() dx` runs, where `onehot(ks, 5)^T dx` is row 144's static error; in parentheses the call takes the operator, `(onehot(ks, 5))^T dx` | POSITIVE-VERIFIED | — | `Specification-1.0-frozen/basic/operators/juxtameaning.tex:156-162`, "Juxtaposition" | none | run-c4 vocabulary | The rule names non-expression elements, and a dotted call is a `Primary`. A workaround of row 144 beside binding first, a `transpose` function and parentheses around the call (`ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss`): none is needed when the library has the method. The output's two lines are identical to the `transpose` spelling. Probe `explorations/run-c4/probes/vocabulary/v17_calldot.fss`, in the parent of `11bf69c39`. full text: history, row 301 |

Row 1, a note that adds a fact (the row with it is 1,183 characters, linted by `ledger.py check --rows`): 

    After a dotted call the same form, `B.f()[5]^2`, parses and fails so too.

The row's line with the note:

| 1 | `x[i][j]` and `x[i]^2` are grammatical, but walk invokes a subscript followed by a subscript or a superscript without its first index: one index fails with `args = ()`, more silently give the wrong element | NEGATIVE-VERIFIED | implementation gap (walk) | `appendices/grammars/concrete-syntax.tex`, "Expressions"; `basic/operators/precedence.tex`, "Operator Precedence and Associativity"; `basic/operators/juxtameaning.tex`, "Juxtaposition" | none | astra, blinded, review | siblings: 84. Such a primary parses as a `MathPrimary` (not `SubscriptExpr`); its subscript goes to `evalAndInvokeMethod` (`interpreter/evaluator/Evaluator.java:1181`), whose `evalInvocationArgs` (`:1064`, `:1380-1381`) takes `exprs.subList(1,…)`, right for a juxtaposition list, wrong for a subscript list. `m[3,7]^2` prints `11449`, `(m[7])^2`, not `1075369` (probe `explorations/gap-ledger-probes/g02.fss`, in the parent of `e879b6a44`). The spec forbids only `x^2[i]`. Workarounds: `(x[i])[j]`, `(x[i])^2`, or bind first, as `explorations/apl/base/AplCore.fss:1859` does (`rk = rs[k]`). After a dotted call the same form, `B.f()[5]^2`, parses and fails so too. probe and full text: history, row 1 |

## Ledger: new rows

Section "1. Syntax: lexing, expressions and declarations". Linted by `ledger.py check --rows`: only the number rule fails.

| NEW-S-1 | on the compiled path a subscript followed by a superscript, `x[5]^2`, `(B.f())[5]^2` or `B.f()[5]^2`, stops the compile: '** bug! Result of typechecking still contains intermediate nodes.' | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/operators/juxtameaning.tex`, "Juxtaposition" | `ProjectFortress/compiler_tests/XXXSubscriptThenSuperscriptCompiled.test` | climb batch 32 rung S | siblings: 1, 84. The parser builds a `MathPrimary` of two math items, a subscripting and an exponentiation (`ProjectFortress/src/com/sun/fortress/parser/Expression.rats:478-488`, at `21045c6c65`), and the checker leaves it in the tree; a single item, `x[5]` or `x^2`, is simplified by the parser and compiles. Walk fails on the same forms as row 1 says. A subscript inside a dotted primary is not such an item, so `B.data[5]^2` compiles and runs. Workaround: `(x[5])^2`, or bind the element first. |

Added by the skeptic, with its expected-failure test; linted in the same way:

| NEW-S-2 | under walk a postfix operator directly after an exponentiation, `n^2!` or `n^T!`, is refused, where the reassociation applies the operator to the power and the compiled path runs it | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/operators/juxtameaning.tex`, "Juxtaposition" | `ProjectFortress/tests/XXXPostfixAfterExponentiation.fss` | climb batch 32 rung S | siblings: 158. `Syntax Error: an exponentiation should not be immediately followed by a non-expression element.`: walk's postfix branch refuses an operand that is an exponentiation (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:971-974`, at `21045c6c65`). The section makes an error only of an exponentiation followed by a subscripting or an exponentiation. Compiled, `n^2!` is `1009` and `n^T!` is `1103` for `opr (x: ZZ32)!` adding 1000 and `^T` adding 100. After a dot, `B.n^2!`, the same on each path. Workaround: `(n^2)!`. |

## The handover line

Rung S landed on `wip/rung-superscript-after` (`21045c6c65`, a test more in `da459aaeae`): a superscript follows a dotted access on both paths and a parenthesised call under walk; rows 84 and 158 close, row 144 stays; count 0, distance 0, `#crash none`; no model line changed, so `transpose(onehot(…))` and `(p.wq)^T` in the model may now be written `(onehot(…))^T` and `p.wq^T`, each as a diff shown first (P-87). Open: NEW-S-1, `x[5]^2` on the compiled path, with row 1 under walk.

## Revival change

### The change

The team's parser gave a primary with a dot no place for a superscript: `PrimaryItem` chose between `LeftAssociatedPrimary`, which took subscripts, parenthesised items and selectors, and `MathPrimary`, the only production with math items (`ProjectFortress/src/com/sun/fortress/parser/Expression.rats:384-386` and `:463-474` at `a874948ac`), so `p.wq^T`, `B.n^2` and `B.f()^T` were a bare `Syntax Error` under walk and compiled. The team's walk refused a postfix operator after any tight juxtaposition that is a call or after any exponentiation, also where it stood in parentheses: `(f(x))^T`, `(f(x))!` and `(a^b)!` stopped with "Syntax Error: a function argument should not be immediately followed by a non-expression element." or "an exponentiation should not be immediately followed by a non-expression element." (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java`, `forOpExpr`), where the team's checker accepted them.

The tree now reads a primary with a dot as the front of the math items that follow it: `p.wq^T` is `(p.wq)^T`, `a.m(x)^T` is `(a.m(x))^T`, `p.wq^T x` is the juxtaposition of `(p.wq)^T` and `x`, and `B.n^2^2` is the static error of two exponentiations. A subscript, a parenthesised item or a tight identifier after a dotted method call parses in the same way (`B.f()[5]`). Walk evaluates a parenthesised operand of a postfix operator as one expression, so `(f(x))^T` has the value that the compiled path gives. `f(x)^T`, a call followed directly by a superscript, is still a static error on both paths. Tests: `ProjectFortress/tests/SuperscriptAfterDottedAccess.fss`, `ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss`, `ProjectFortress/tests/SuperscriptAfterCallRefused.fss`, and their compiled forms in `ProjectFortress/compiler_tests/`.

The reason: the specification. "A tight juxtaposition is always left-associated if it contains any dot" (`Specification/basic/operators/juxtameaning.tex:130-131`); its grammar gives `Primary ^ Exponent` and `Primary ExponentOp` where `Primary.Id` and a parenthesised expression are each a `Primary` (`Specification/appendices/grammars/concrete-syntax.tex:937-953`, `Specification/basic/expressions/operator-app.tex:29-32`); and its static error is for an argument "immediately followed by a non-expression element" (`juxtameaning.tex:156-162`), which a parenthesised call is not. Measured on the code before the change: `x.v^T` gives `Syntax Error` at the `^` on both paths, and `(f(3))^T` gives walk's refusal and 104 compiled.

Still so: a selector after a superscript, `B.data^T.v`, is a syntax error; write `(B.data^T).v`. A subscript followed by a superscript where the subscript is a math item, `x[5]^2` or `B.f()[5]^2`, fails on both paths; write `(x[5])^2`. `B.data[5]^2`, whose subscript belongs to the dotted primary, runs.

### Provenance

Ledger rows 84 and 158, which close; row 144, which stays. Forks S1 and S2 of `explorations/coordinator/CLIMB-BATCH-32.md`, "Forks the batch takes", both taken at their defaults; P-87 (no model line changes). Climb batch 32, rung S.
