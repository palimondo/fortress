# Mechanical check of c12, the writer's files, base c124c6b65

## Row 650, rewritten (949 characters)
- lengths: row 949 of 1,200, claim 212 of 300, notes 517 of 700
- reproducer `ProjectFortress/compiler_tests/XXXOverrideModifierCodeGeneration.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2950-2952` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: forFnDecl at :2954,2981; reads: private static final Modifiers fnDeclCompilableModifiers =
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3019-3028` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): words moved: forFnDecl at :2954,2981; reads: boolean canCompile =
- in the old line, not in the new: `:3016-3025`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2947-2949`, `row 610`, `row 823`
- every check passes

## Row 653, rewritten (1098 characters)
- lengths: row 1098 of 1,200, claim 293 of 300, notes 642 of 700
- reproducer `none`: exists
- citations:
  - `traits.tex:670-671` (Specification/basic/traits.tex): no word to check; reads: but partial overriding of a functional declaration is not allowed.
  - `scala_src/useful/STypesUtil.scala:1701` (ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala): no word to check; reads: else if (o._1.mods.isOverride && tsa.subtypeED(pd, od)) Some(false)
  - `values/Constructor.java:699` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): no word to check; reads: " has the modifier override and does not override any inherited declaration"));
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1701`, `interpreter/evaluator/values/Constructor.java`, `interpreter/evaluator/values/Constructor.java:699`, `row 665`, `tests/OverrideNothingWalk.fss`
- every check passes

## Row 391, rewritten (1110 characters)
- lengths: row 1110 of 1,200, claim 256 of 300, notes 694 of 700
- reproducer `none`: exists
- citations:
  - `tests/unit_tests/FileTests.java:394-410` (ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java): no word to check; reads: if (shouldFail) {
  - `explorations/compile-ladder/rung-interp-coercion/probes/CompiledAmbiguous.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `FileTests.java`, `FileTests.java:384-404`, `InferNumeralTie.test`, `ProjectFortress/compiler_tests/XXXInferAmbiguousCoercion.test`, `XXX`
- every check passes

## Row 392, rewritten (1117 characters)
- lengths: row 1117 of 1,200, claim 258 of 300, notes 633 of 700
- reproducer `none`: exists
- citations:
  - `scala_src/typechecker/impls/Misc.scala:684-686` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala): words moved: typed at :78,711,954; reads: case SAsExpr(SExprInfo(span, paren, _), sub, typ) => {
  - `STypeChecker.scala:479-481` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala): words moved: typed at :451,570,584; reads: getType(checkedExpr) match {
  - `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:394-410` (ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java): no word to check; reads: if (shouldFail) {
  - `explorations/compile-ladder/rung-interp-coercion/probes/skeptic/SkAscribe.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:384-404`, `XXX`
- every check passes

## Row 693, rewritten (1183 characters)
- lengths: row 1183 of 1,200, claim 298 of 300, notes 675 of 700
- reproducer `ProjectFortress/tests/XXXOverrideObjectExpressionOverParamWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1127` (ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java): no word to check; reads: Option.<WhereClause>none(),
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1085` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java): no word to check; reads: List<FType> extends_ = new EvalType(ge).getFTypeListFromList(NodeUtil.getTypes(h.getExtendsClause()));
  - `values/Constructor.java:688` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): holds boundsUnread, symbolicDomain; reads: boundsUnread && symbolicDomain(m) && !sameParameterTypes(m, o)) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1070`
- every check passes

## Row 725, rewritten (1127 characters)
- lengths: row 1127 of 1,200, claim 298 of 300, notes 620 of 700
- reproducer `ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairsGeneric.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:135-145` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala): holds coveredByParts; reads: private def coveredByParts(domain: Type, covers: List[Type]): Boolean = {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:136-145`, `row 709`
- every check passes

## Row 728, rewritten (1013 characters)
- lengths: row 1013 of 1,200, claim 258 of 300, notes 553 of 700
- reproducer `ProjectFortress/tests/XXXAbstractMethodGenericBodyWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:431-433` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): holds definedBelow; reads: if (a instanceof FnDecl && (hasBody(pdm) || !declared || definedBelow(pdm, provided))) return;
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:480` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java): holds definedBelow; reads: private static boolean definedBelow(MethodClosure m, Set<SingleFcn> provided) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:433`, `row 666`
- every check passes

## Row 639, rewritten (956 characters)
- lengths: row 956 of 1,200, claim 193 of 300, notes 667 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:382-385` (ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java): words moved: assert at :425; reads: boolean anyFails = ! f.contains("QuickCheckTest") &&
  - `Library/FortressLibrary.fss:55` (Library/FortressLibrary.fss): words moved: assert at :297,302,307; deny at :321,323,325; reads: errorPrintln("FAIL: " s)
  - `Library/FortressLibrary.fss:1908` (Library/FortressLibrary.fss): words moved: FAIL: at :55,1785; assert at :297,302,307; deny at :321,323,325; reads: oops(s:ZZ32, l:ZZ32, sz:ZZ32, got:ZZ32):() = do
- in the old line, not in the new: `:1904`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 650: row 650: rewritten (949 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 653: row 653: rewritten (1098 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 391: row 391: rewritten (1110 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 392: row 392: rewritten (1117 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 693: row 693: rewritten (1183 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 725: row 725: rewritten (1127 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 728: row 728: rewritten (1013 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 639: row 639: rewritten (956 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 8 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 8 lines, 0 failing, every check passes.
