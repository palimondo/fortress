# Mechanical check of c40, the writer's files, base c124c6b65

## Row 14, rewritten (591 characters)
- lengths: row 591 of 1,200, claim 69 of 300, notes 405 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java:1158-1160` (ProjectFortress/src/com/sun/fortress/nodes_util/NodeUtil.java): words moved: validNumericLiteral at :1152,1174; reads: if (Character.isLetter(c)) {
  - `explorations/gap-ledger-probes/g06.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 177, rewritten (1062 characters)
- lengths: row 1062 of 1,200, claim 180 of 300, notes 580 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:1125-1128` (Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex): no word to check; reads: \emph{LocalVarDecl}
  - `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:1135-1137` (Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex): words moved: null at :43,68,89; reads: \emph{VarMayTypes} &::=& \emph{VarMayType} \\
  - `ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:179-181` (ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java): words moved: forLocalVarDeclOnly at :176; reads: if (that.getRhs().isNone() || lvb.isMutable()) { // a mutable variable
- in the old line, not in the new: `MicroGptFlat.fss`, `MicroGptFlat.fss:88:5-7: Variable p is not defined.`, `explorations/run-c4/probes/types/E`, `explorations/run-c4/probes/types/G`, `null…/MicroGptFlat.fss:88:9: The type of p is required.`, `row 21`
- every check passes

## Row 251, rewritten (784 characters)
- lengths: row 784 of 1,200, claim 190 of 300, notes 345 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex:712` (Specification-1.0-frozen/appendices/grammars/concrete-syntax.tex): no word to check; reads: \emph{PlainParam} &::=& \emph{BindId} \option{\emph{IsType}} \\
  - `v01_tuple.fss:25` (explorations/apl/rung-5/v01_tuple.fss): words moved: Syntax Error at :24,26; reads: opening parenthesis of the pattern (v01_tuple.out.0, `v01_tuple.fss:25:24:
  - `v01_tuple.fss:24` (explorations/apl/rung-5/v01_tuple.fss): holds Syntax Error; reads: (* (a) the same as a PATTERN in the parameter list -- a Syntax Error at the
- in the old line, not in the new: `basic/declarations.tex`, `v01_tuple.out`
- every check passes

## Row 405, rewritten (1032 characters)
- lengths: row 1032 of 1,200, claim 220 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `scala_src/typechecker/staticenv/STypeEnv.scala:200` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala): no word to check; reads: throw TypeError.make("Missing parameter type for " + name, node)
  - `scala_src/typechecker/staticenv/STypeEnv.scala:72-75` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala): no word to check; reads: def extendWithBindingsFromFnList[T <: Functional](fns:List[T]) = {
- in the old line, not in the new: nothing
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 14: row 14: rewritten (591 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 177: row 177: rewritten (1062 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 251: row 251: rewritten (784 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 405: row 405: rewritten (1032 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 4 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 4 lines, 0 failing, every check passes.
