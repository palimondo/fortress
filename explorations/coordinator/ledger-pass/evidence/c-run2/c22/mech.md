# Mechanical check of c22, the writer's files, base c124c6b65

## Row 570, rewritten (1175 characters)
- lengths: row 1175 of 1,200, claim 274 of 300, notes 637 of 700
- reproducer `ProjectFortress/compiler_tests/XXXFunctionalMethodMeetObjectExpression.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:361-362` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): holds typeConses; reads: val typesInComp = compilation_unit.typeConses
  - `AbstractMethodChecker.scala:217` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala): no word to check; reads: // This doesn't work, but the eventual plan is to lift all object expressions to become top-level objects with generated names.
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:367-368`
- every check passes

## Row 416, rewritten (1183 characters)
- lengths: row 1183 of 1,200, claim 287 of 300, notes 699 of 700
- reproducer `ProjectFortress/tests/XXXNatSizeExclusionWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:589-604` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: if (unrelated != -1) {
  - `FType.java:197-210` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java): no word to check; reads: public boolean excludesOther(FType other) {
  - `Library/RangeInternals.fss:125-172` (Library/RangeInternals.fss): holds checkSelection2D, checkSelection3D; reads: checkSelection[\R extends Range[\ZZ32\]\]
- in the old line, not in the new: `FType.java:197-209`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:587-602`
- every check passes

## Row 697, rewritten (1122 characters)
- lengths: row 1122 of 1,200, claim 233 of 300, notes 695 of 700
- reproducer `ProjectFortress/tests/XXXReturnRuleObjectParamWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:511` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: distinct |= unequal && (allObjInstance1 || allObjInstance2);
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:439-444` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: /* Instances of one generic type whose static arguments may be equal: no object type for
- in the old line, not in the new: `:437-442`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:509`, `SumReduction`, `coordinator/CLIMB-BATCH-16.md`, `distribute`, `row 433`
- every check passes

## Row 785, rewritten (1065 characters)
- lengths: row 1065 of 1,200, claim 249 of 300, notes 676 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:519-527` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: completeOverloadingCheck at :273,348; reads: FType r1 = o1.getFn().getRange();
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:654` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: completeOverloadingCheck at :273,348; reads: " fails because the second parameter list is a subtype of the first, but the second result is not a subtype of the first");
  - `Library/FortressLibrary.fss:1690` (Library/FortressLibrary.fss): words moved: OPLUS at :3220,3221,3223; reads: opr =(self,_:Nothing[\T\]) = true
  - `Library/FortressLibrary.fss:1737` (Library/FortressLibrary.fss): words moved: OPLUS at :3220,3221,3223; reads: opr =(self,_:NotUnique[\T\]) = true
  - `Library/Pairs.fss:85-91` (Library/Pairs.fss): words moved: Nothing at :29,50; reads: opr BOXPLUS(self, other: SingleRange) = SingleRange(n + other.n)
  - `ProjectFortress/tests/FileConversion.fss:76` (ProjectFortress/tests/FileConversion.fss): words moved: Nothing at :55; reads: opr OPLUS(self, other:EmptySequence) = self
- in the old line, not in the new: nothing
- every check passes

## Row 788, rewritten (1084 characters)
- lengths: row 1084 of 1,200, claim 295 of 300, notes 556 of 700
- reproducer `ProjectFortress/tests/XXXGenericObjectInstanceBesidePlainWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:214` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java): no word to check; reads: if (cannotBeExtended() && other.cannotBeExtended()) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:236-245` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java): no word to check; reads: if (cannotBeExtended()) {
  - `OverloadedFunction.java:441` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): holds coincide; reads: boolean coincide = ownPair && instancesMayCoincide(p1, p2);
  - `OverloadedFunction.java:470` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: coincide at :441,443,444; reads: if (excludes && ownPair) {
- in the old line, not in the new: `:468`, `OverloadedFunction.java:439`
- every check passes

## Row 522, rewritten (1098 characters)
- lengths: row 1098 of 1,200, claim 208 of 300, notes 685 of 700
- reproducer `ProjectFortress/tests/XXXStridedSpanWalk.fss`: exists
- citations:
  - `Library/RangeInternals.fss:1045-1055` (Library/RangeInternals.fss): holds dist = r-l; reads: imposeStride(s:ZZ32): FullScalarRange = do
  - `Library/RangeInternals.fss:1048` (Library/RangeInternals.fss): holds dist = r-l; reads: dist = r-l
  - `Library/RangeInternals.fss:195-202` (Library/RangeInternals.fss): holds (l-r) MOD str; reads: check(): ScalarRange = do
  - `Library/RangeInternals.fss:199` (Library/RangeInternals.fss): holds (l-r) MOD str; reads: if (l-r) MOD str =/= 0 AND NOT self.isEmpty then
  - `Library/RangeInternals.fss:1713-1719` (Library/RangeInternals.fss): words moved: (l-r) MOD str at :199; reads: fullScalarRange(l:ZZ32, r:ZZ32, str:ZZ32): FullScalarRange = do
  - `Library/RangeInternals.fss:1458-1460` (Library/RangeInternals.fss): words moved: (l-r) MOD str at :199; reads: getter size(): ZZ32 =
- in the old line, not in the new: `:1196`, `:1449-1455`, `:155-163`, `:159`, `:846-856`, `:849`, `right-left`, `row 450`, `row 451`
- every check passes

## Row 127, rewritten (1009 characters)
- lengths: row 1009 of 1,200, claim 185 of 300, notes 689 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:308-313` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): words moved: ExprDisambiguator at :65; SObjectExpr at :329,342; SObjectDecl at :185,256; reads: case SVarDecl(info, lhs, init) if (!inTraitOrObject) =>
  - `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:329-348` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): words moved: ExprDisambiguator at :65; SVarDecl at :112,196,308; SObjectDecl at :185,256; reads: case SObjectExpr(info@SASTNodeInfo(span),
  - `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:185-190` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): words moved: ExprDisambiguator at :65; SVarDecl at :112,196,308; SObjectExpr at :329,342; reads: case SObjectDecl(info@SASTNodeInfo(span),
  - `explorations/run-b2/probes/g4b_two_same.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b2/probes/g4b_pollute.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b2/probes/g4b_one.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ExprDisambiguator.scala`, `ExprDisambiguator.scala:308-313`, `g4b_one.fss`, `g4b_pollute.fss`
- every check passes

## Row 128, rewritten (891 characters)
- lengths: row 891 of 1,200, claim 115 of 300, notes 642 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:340-344` (ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java): words moved: SyntaxChecker at :32,42; LocalFnMod at :286,287; FnDecl at :246; reads: public void forBlock(Block that) {
  - `ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:285-288` (ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java): words moved: SyntaxChecker at :32,42; FnDecl at :246; reads: if (inBlock) { // local function declaration
  - `explorations/run-b2/probes/g4b_capture.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b2/probes/g4b_capture2.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-b2/probes/g4b_methodonly.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `:283-289`, `SyntaxChecker.java`, `SyntaxChecker.java:339-345`, `g4b_capture2.fss`, `g4b_methodonly.fss`
- every check passes

## Row 375, rewritten (1041 characters)
- lengths: row 1041 of 1,200, claim 177 of 300, notes 656 of 700
- reproducer `ProjectFortress/compiler_tests/XXXObjExprRungS.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1675-1677` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds throw sayWhat(x); reads: public void defaultCase(Node x) {
  - `ProjectFortress/src/com/sun/fortress/Shell.java:262-264` (ProjectFortress/src/com/sun/fortress/Shell.java): words moved: fortress desugar at :177; reads: public static boolean getObjExprDesugaring(){
  - `ProjectFortress/src/com/sun/fortress/Shell.java:446` (ProjectFortress/src/com/sun/fortress/Shell.java): words moved: fortress desugar at :177; reads: setObjExprDesugaring(true);
- in the old line, not in the new: `:444`, `CompilerError: emitDesc of type AND(A,B) failed`, `ProjectFortress/src/com/sun/fortress/Shell.java:260-262`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1672-1673`, `XXXFunctionalMethodMeetObjectExpression`
- every check passes

## Row 353, rewritten (1161 characters)
- lengths: row 1161 of 1,200, claim 152 of 300, notes 691 of 700
- reproducer `ProjectFortress/compiler_tests/XXXTryAtomicCodegenRungB.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1675-1677` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds throw sayWhat(x); reads: public void defaultCase(Node x) {
  - `explorations/compile-ladder/rung-tryatomic/probes/skeptic/SkepTryAtomicVal.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/compile-ladder/rung-tryatomic/probes/skeptic/SkepTryAtomicState.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1672-1673`, `ProjectFortress/tests/tryatomicTest.fss`, `SkepTryAtomicState.fss`, `SpecData/examples/advanced/Parallel.Abort.b.fss`, `atomic`, `nestedTransactions3.fss`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 570: row 570: rewritten (1175 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 416: row 416: rewritten (1183 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 697: row 697: rewritten (1122 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 785: row 785: rewritten (1065 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 788: row 788: rewritten (1084 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 522: row 522: rewritten (1098 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 127: row 127: rewritten (1009 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 128: row 128: rewritten (891 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 375: row 375: rewritten (1041 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 353: row 353: rewritten (1161 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
