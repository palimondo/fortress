# Mechanical check of c25, the judge's files, base c124c6b65

## Row 7, rewritten (920 characters)
- lengths: row 920 of 1,200, claim 143 of 300, notes 654 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1466-1485` (ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java): no word to check; reads: public static boolean validOp(String s) {
  - `explorations/fable-review-probes/RvwNameKeywords.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `row 78`
- every check passes

## Row 133, rewritten (1069 characters)
- lengths: row 1069 of 1,200, claim 184 of 300, notes 699 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:737-738` (Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex): no word to check; reads: &$|$& \KWD{opr} \emph{AbsValParam}
  - `ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:141-142` (ProjectFortress/src/com/sun/fortress/parser/Parameter.rats): holds caret, ExponentOp; reads: / opr w a1:ValParam w a2:(Op / ExponentOp /
  - `parser/Parameter.rats:171-172` (ProjectFortress/src/com/sun/fortress/parser/Parameter.rats): holds caret, ExponentOp; reads: / opr w a1:AbsValParam w a2:(Op / ExponentOp
  - `parser/Symbol.rats:104-106` (ProjectFortress/src/com/sun/fortress/parser/Symbol.rats): words moved: caret at :199; ExponentOp at :37,103; reads: transient private String exponentOp =
  - `explorations/run-c3/probes/g156_api_postfix/`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `(Op \| ExponentOp \| ^)`, `:115`, `:159`, `:171-172`, `AbsOpHeaderFront`, `OpHeaderFront`, `Parameter.rats`, `Parameter.rats:141-142`, `Symbol.rats`, `Symbol.rats:104-106`, `Tr1.fsi`, `Tr1.fsi:3:1`, `UseTr4.fss`, `UseTr5.fss`, `^T^`
- every check passes

## Row 144, rewritten (906 characters)
- lengths: row 906 of 1,200, claim 156 of 300, notes 593 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/operators/juxtameaning.tex:156-162` (Specification-1.0-frozen/basic/operators/juxtameaning.tex): no word to check; reads: postfix operator), determine whether it is a function.
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1132-1135` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): words moved: stepTwo at :1111,1220; reads: if (ftnInd + 2 < vs.size() && !isExpr(vs.get(ftnInd + 2).getA()))
  - `explorations/run-c/probes/g144_callsuper.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 158, rewritten (1194 characters)
- lengths: row 1194 of 1,200, claim 231 of 300, notes 697 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/operator-app.tex:29-32` (Specification-1.0-frozen/basic/expressions/operator-app.tex): holds Primary, ExponentOp; reads: \emph{Primary}
  - `Specification-1.0-frozen/basic/operators/juxtameaning.tex:156-162` (Specification-1.0-frozen/basic/operators/juxtameaning.tex): no word to check; reads: postfix operator), determine whether it is a function.
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:970-971` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): no word to check; reads: } else if (arg instanceof Juxt && ((Juxt) arg).isTight()) { // f(x)!
  - `Evaluator.java:1322-1326` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): no word to check; reads: // It is a static error if a function argument is immediately
  - `explorations/run-c/probes/q04f_callsuper.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-c/probes/q04a_varargs.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-c3/probes/lift_g4.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `(oh^T) dX`, `lift_g4.fss`, `lift_g4.fss:11:11-22`, `lift_g4b.fss`, `oh = onehot(…)`, `q04a_varargs.fss`, `q04a_varargs.fss:35:45-56`, `q04f_callsuper.fss`, `q04f_callsuper.fss:18:48-59`
- every check passes

## Row 193, rewritten (1079 characters)
- lengths: row 1079 of 1,200, claim 257 of 300, notes 688 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:117-118` (ProjectFortress/src/com/sun/fortress/parser/Symbol.rats): no word to check; reads: String OpName =
  - `nodes_util/NodeUtil.java:1466-1485` (ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java): no word to check; reads: public static boolean validOp(String s) {
  - `explorations/apl/v1-probes/p12a_oprword.sh`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `NodeUtil.java`, `NodeUtil.java:1460-1477`, `Symbol.rats`, `Symbol.rats:108-116`, `explorations/apl/v1-probes/p12_name.out.0`, `p12_g.fsi`, `p12_g.fsi:20:7: Syntax Error`
- every check passes

## Row 257, rewritten (1065 characters)
- lengths: row 1065 of 1,200, claim 286 of 300, notes 686 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: `), so row 193 bars only words of two or more capitals.`, `, and a closed-set name with an underscore must stand above its prefix in the set | NEGATIVE-VERIFIED | implementation gap (parser) | silent | none | apl microgpt rung | siblings: 193, 250. The names hold: a closed-set name may carry a digit after a capital (`, `, as row 250); the order matters because`, `holds the bare class's failure; the api is`, `terminator succeeds after the prefix.`
- every check passes

## Row 286, rewritten (985 characters)
- lengths: row 985 of 1,200, claim 196 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `explorations/apl/mg/AplMgSyntax.fsi:234` (explorations/apl/mg/AplMgSyntax.fsi): no word to check; reads: | l:AplAtom SPACE `* SPACE r:AplE => <[ pow(1.0 (l), (r)) ]>
  - `explorations/apl/mg/AplMg.fss:37` (explorations/apl/mg/AplMg.fss): holds pow, b^e; reads: pow(b: RR64, e: ZZ32): RR64 = b^e
  - `explorations/apl/mg/checks/model_run.out`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `(1.0 (l)) ^ (r)`, `.out.1`, `pow(b: RR64, e: ZZ32): RR64 = b^e`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 7: row 7: rewritten (920 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 133: row 133: rewritten (1069 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 144: row 144: rewritten (906 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 158: row 158: rewritten (1194 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 193: row 193: rewritten (1079 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 257: row 257: rewritten (1065 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 286: row 286: rewritten (985 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 7 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 7 lines, 0 failing, every check passes.
