# Mechanical check of c39, the writer's files, base c124c6b65

## Row 1, rewritten (1109 characters)
- lengths: row 1109 of 1,200, claim 205 of 300, notes 626 of 700
- reproducer `none`: exists
- citations:
  - `interpreter/evaluator/Evaluator.java:1181` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): words moved: SubscriptExpr at :1025,1028; evalInvocationArgs at :1064,1306,1350; reads: return evalAndInvokeMethod(front, opString, sub.getExprs(), loc);
  - `interpreter/evaluator/Evaluator.java:1064` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): words moved: SubscriptExpr at :1025,1028; evalAndInvokeMethod at :1063,1181; reads: return invokeMethod(receiver, mname, evalInvocationArgs(args), site);
  - `interpreter/evaluator/Evaluator.java:1380-1381` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): words moved: SubscriptExpr at :1025,1028; evalAndInvokeMethod at :1063,1181; reads: List<FValue> evalInvocationArgs(List<Expr> exprs) {
  - `explorations/gap-ledger-probes/g02.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/apl/base/AplCore.fss:1859` (explorations/apl/base/AplCore.fss): holds rk = rs[k]; reads: rk = rs[k]
- in the old line, not in the new: `Array[\Array[\RR64,ZZ32\],ZZ32\]`, `Evaluator.java`, `Evaluator.java:1052`, `Evaluator.java:1251-1252`, `rs[k][j]`
- every check passes

## Row 84, rewritten (1132 characters)
- lengths: row 1132 of 1,200, claim 191 of 300, notes 678 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:947-952` (Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex): no word to check; reads: &$|$& \emph{Primary}\EXP{.}\emph{Id}
  - `Specification-1.0-frozen/basic/operators/juxtameaning.tex:137-142` (Specification-1.0-frozen/basic/operators/juxtameaning.tex): no word to check; reads: the dots and identifiers, which are interpreted as selectors.  If the last
  - `ProjectFortress/src/com/sun/fortress/parser/Expression.rats:384-386` (ProjectFortress/src/com/sun/fortress/parser/Expression.rats): holds PrimaryItem, LeftAssociatedPrimary; reads: constant PureList<Expr> PrimaryItem =
  - `ProjectFortress/src/com/sun/fortress/parser/Expression.rats:388-434` (ProjectFortress/src/com/sun/fortress/parser/Expression.rats): words moved: MathItem at :463,465,467; reads: /* LeftAssociatedPrimary ::=
  - `ProjectFortress/src/com/sun/fortress/parser/Expression.rats:651-656` (ProjectFortress/src/com/sun/fortress/parser/Expression.rats): words moved: LeftAssociatedPrimary at :381,385,388; Subscripting* at :389,390,567; ParenthesisDelimited* at :389,390,566; Selector* at :389,394,403; MathItem at :463,465,467; reads: /* Exponentiation ::=
  - `ProjectFortress/src/com/sun/fortress/parser/Expression.rats:463-465` (ProjectFortress/src/com/sun/fortress/parser/Expression.rats): words moved: LeftAssociatedPrimary at :381,385,388; Subscripting* at :389,390,567; ParenthesisDelimited* at :389,390,566; Selector* at :389,394,403; reads: /* MathPrimary ::= PrimaryFront MathItem* */
  - `explorations/run-b2/probes/g4a_sub.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `Expression.rats`, `Expression.rats:384-386`, `g4a_base.fss`, `g4a_call.fss`, `g4a_expop2.fss`, `g4a_getter.fss`, `g4a_num.fss`
- every check passes

## Row 66, rewritten (1082 characters)
- lengths: row 1082 of 1,200, claim 220 of 300, notes 557 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/appendices/rendering.tex:43-47` (Specification-1.0-frozen/appendices/rendering.tex): words moved: M_{1} at :65; reads: (b) Otherwise, if the identifier has more than two characters and
  - `Specification-1.0-frozen/appendices/rendering.tex:58-66` (Specification-1.0-frozen/appendices/rendering.tex): holds M_{1}; reads: (c) Otherwise, if the identifier consists of one or more letters
  - `Specification-1.0-frozen/basic/lexical-structure.tex:1520-1530` (Specification-1.0-frozen/basic/lexical-structure.tex): no word to check; reads: 
  - `explorations/gap-ledger-probes/g13.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:885-894`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 1: row 1: rewritten (1109 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 84: row 84: rewritten (1132 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 66: row 66: rewritten (1082 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 3 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 3 lines, 0 failing, every check passes.
