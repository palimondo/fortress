# Mechanical check of c31, the writer's files, base c124c6b65

## Row 592, rewritten (1078 characters)
- lengths: row 1078 of 1,200, claim 255 of 300, notes 621 of 700
- reproducer `ProjectFortress/tests/XXXInferThroughBoundWalk.fss`: exists
- citations:
  - `interpreter/evaluator/EvaluatorBase.java:458-473` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java): holds fixedThroughBounds; reads: private static Set<String> fixedThroughBounds(List<StaticParam> tparams, Set<String> fixable) {
  - `interpreter/evaluator/EvaluatorBase.java:699-703` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java): words moved: fixedThroughBounds at :369,383,458; reads: for (StaticParam tp : rechecks) {
  - `interpreter/evaluator/EvaluatorBase.java:1024-1043` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java): words moved: fixedThroughBounds at :369,383,458; reads: if (rechecks != null) {
  - `Library/CovariantCollection.fss:30` (Library/CovariantCollection.fss): holds APPCOV[\T, A extends T, B extends T\]; reads: opr APPCOV[\T, A extends T, B extends T\]
- in the old line, not in the new: `:15-28`, `:443-447`, `Empty[\R\]`, `EvaluatorBase.java`, `EvaluatorBase.java:246-261`, `upward`
- every check passes

## Row 675, rewritten (1127 characters)
- lengths: row 1127 of 1,200, claim 248 of 300, notes 676 of 700
- reproducer `ProjectFortress/compiler_tests/NatArithBeyondRun.test`: exists
- citations:
  - `runtimeSystem/Naming.java:1238-1257` (ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java): no word to check; reads: public static String foldSize(String spelled, Map<String, String> sizes) {
  - `compiler/NamingCzar.java:1951` (ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java): holds Naming.foldSize; reads: return p(Naming.XL_INTNAT, Naming.foldSize(l.accept(this).getB() + Naming.ENTER + r.accept(this).getB() + Naming.ENTER + op.getText(), null)
  - `interpreter/evaluator/EvalType.java:252-260` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java): no word to check; reads: if (a instanceof IntNat) {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1234-1253`, `compiler/NamingCzar.java:1829-1833`, `i-1`, `interpreter/evaluator/EvalType.java:256-273`
- every check passes

## Row 712, rewritten (1041 characters)
- lengths: row 1041 of 1,200, claim 285 of 300, notes 521 of 700
- reproducer `ProjectFortress/compiler_tests/XXXInferCallerTwoGroundBoundsClosedTrait.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:788-800` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): holds normConjunct; reads: protected def normConjunct(x: Iterable[Type])(implicit history: Set[hType]): List[Type] = {
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:776-779` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): holds normConjunct; reads: case i@SIntersectionType(_, e) =>
- in the old line, not in the new: `:696-699`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:708-735`, `row 686`, `row 711`
- every check passes

## Row 714, rewritten (843 characters)
- lengths: row 843 of 1,200, claim 238 of 300, notes 379 of 700
- reproducer `ProjectFortress/compiler_tests/XXXInferUnfixedSelfBoundedParam.test`: exists
- citations: none with lines
- in the old line, not in the new: `4356454a2`, `row 425`, `row 447`
- every check passes

## Row 776, rewritten (1033 characters)
- lengths: row 1033 of 1,200, claim 298 of 300, notes 570 of 700
- reproducer `ProjectFortress/compiler_tests/XXXStaticArgBoundNestedCall.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:50-56` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala): words moved: next at :43; reads: var j = 0
- in the old line, not in the new: `:13:36-46`, `row 720`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 592: row 592: rewritten (1078 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 675: row 675: rewritten (1127 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 712: row 712: rewritten (1041 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 714: row 714: rewritten (843 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 776: row 776: rewritten (1033 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 5 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 5 lines, 0 failing, every check passes.
