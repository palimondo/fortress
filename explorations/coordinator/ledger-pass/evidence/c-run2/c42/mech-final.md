# Mechanical check of c42, the judge's files, base c124c6b65

## Row 59, rewritten (1089 characters)
- lengths: row 1089 of 1,200, claim 251 of 300, notes 692 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkMySumThreads.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `reduction.tex:15` (Specification/basic/evaluation/reduction.tex): no word to check; reads: \note{Reduction variables are not yet supported.}
- in the old line, not in the new: `AtomicTopLevelVar`
- every check passes

## Row 79, rewritten (1065 characters)
- lengths: row 1065 of 1,200, claim 205 of 300, notes 653 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compiler-probes/p33.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 82, rewritten (684 characters)
- lengths: row 684 of 1,200, claim 132 of 300, notes 407 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:287` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi): holds object Thread[\T\](fcn:()->T); reads: object Thread[\T\](fcn:()->T)
  - `FortressBuiltin.fss:725` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss): no word to check; reads: object Thread[\T\] (fcn:()->T)
  - `explorations/compiler-probes/p32.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `FortressBuiltin.fss:722`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:286`
- every check passes

## Row 319, rewritten (1073 characters)
- lengths: row 1073 of 1,200, claim 167 of 300, notes 693 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java:202-231` (ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java): holds PUTFIELD; reads: public static class MutableFieldVar extends NeedsType {
  - `interpreter/env/ReferenceCell.java:25-29` (ProjectFortress/src/com/sun/fortress/interpreter/env/ReferenceCell.java): no word to check; reads: * What the interpreter stores mutable things (fields, variables)
  - `CodeGen.java:4620-4636` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds MutableFieldVar; reads: if (d instanceof VarDecl) {
- in the old line, not in the new: `CodeGen.java:4343-4360`
- every check passes

## Row 463, rewritten (1156 characters)
- lengths: row 1156 of 1,200, claim 174 of 300, notes 682 of 700
- reproducer `ProjectFortress/compiler_tests/XXXIfGeneratorClause.test`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/if.tex:29-34` (Specification-1.0-frozen/basic/expressions/if.tex): no word to check; reads: \emph{GeneratorClause}
  - `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:249-289` (ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java): words moved: while at :307,309; __whileCond at :309; reads: public Node forIf(If i) {
  - `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:306-317` (ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java): words moved: __cond at :245,262,280; reads: if (g.getBind().size() > 0) {
  - `Library/FortressLibrary.fss:1270-1275` (Library/FortressLibrary.fss): holds __cond; reads: __cond[\E,R\](c:Condition[\E\], t:E->R, e:()->R): R = c.cond[\R\](t,e)
- in the old line, not in the new: `Library/FortressLibrary.fss:1269-1273`
- every check passes

## Row 480, rewritten (1101 characters)
- lengths: row 1101 of 1,200, claim 223 of 300, notes 691 of 700
- reproducer `none`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/case.tex:47-51` (Specification-1.0-frozen/basic/expressions/case.tex): holds Contains; reads: operator is omitted, it defaults to \EXP{=} or $\in$.
  - `Functionals.scala:1396-1402` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): holds Contains, ancestors(tt) + tt, Types.isContainsType; reads: def isContainsSubtype(t: Type): Boolean =
  - `Types.java:145-148` (ProjectFortress/src/com/sun/fortress/compiler/Types.java): holds Contains; reads: public static boolean isContainsType(Type t) {
  - `Evaluator.java:416` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): no word to check; reads: if (Glue.extendsGenericTrait(match.type(), WellKnownNames.containsTypeName)) {
- in the old line, not in the new: `Evaluator.java:415`, `Functionals.scala:1216-1223`, `row 476`
- every check passes

## Row 482, rewritten (1009 characters)
- lengths: row 1009 of 1,200, claim 147 of 300, notes 620 of 700
- reproducer `ProjectFortress/compiler_tests/XXXExtremumRungJ.test`: exists
- citations:
  - `Specification-1.0-frozen/basic/expressions/case.tex:74-115` (Specification-1.0-frozen/basic/expressions/case.tex): no word to check; reads: \section{Extremum Expressions}
  - `Functionals.scala:1413-1420` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): holds Types.makeTotalOperatorOrder, TotalOperatorOrder; reads: // Extremum expressions: case most < of ... end
  - `Types.java:372-377` (ProjectFortress/src/com/sun/fortress/compiler/Types.java): holds NI.nyi(), TotalOperatorOrder; reads: public static Type makeTotalOperatorOrder(Type A, Op op) {
  - `CaseExprDesugarer.java:89-92` (ProjectFortress/src/com/sun/fortress/compiler/desugarer/CaseExprDesugarer.java): words moved: CaseExprDesugarer at :36,40; reads: public Node forCaseExpr(CaseExpr x) {
  - `ProjectFortress/tests/caseTest.fss:33-85` (ProjectFortress/tests/caseTest.fss): no word to check; reads: case most > of
- in the old line, not in the new: `Functionals.scala:1233-1242`
- every check passes

## Row 746, rewritten (1006 characters)
- lengths: row 1006 of 1,200, claim 257 of 300, notes 571 of 700
- reproducer `ProjectFortress/tests/maybeTest.fss`: exists
- citations:
  - `Specification/basic/expressions/if.tex:54` (Specification/basic/expressions/if.tex): holds Boolean; reads: Otherwise, the generator clause must be an expression of type \TYP{Boolean}.
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:595` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): words moved: forIf at :582; Just at :596,613,620; Nothing at :613,620,1436; Maybe at :612,620; reads: if (maybeType(clauseVal.type())) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:617-621` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java): words moved: forIf at :582; reads: private static boolean maybeType(FType t) {
- in the old line, not in the new: `:21-22`, `basic/expressions/if.tex`, `explorations/coordinator/CLIMB-BATCH-16.md`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 59: row 59: rewritten (1089 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 79: row 79: rewritten (1065 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 82: row 82: rewritten (684 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 319: row 319: rewritten (1073 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 463: row 463: rewritten (1156 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 480: row 480: rewritten (1101 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 482: row 482: rewritten (1009 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 746: row 746: rewritten (1006 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 8 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 8 lines, 0 failing, every check passes.
