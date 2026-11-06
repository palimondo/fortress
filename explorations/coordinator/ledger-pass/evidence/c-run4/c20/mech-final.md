# Mechanical check of c20, the judge's files, base c124c6b65

## Row 540, rewritten (1141 characters)
- lengths: row 1141 of 1,200, claim 272 of 300, notes 632 of 700
- reproducer `ProjectFortress/compiler_tests/XXXCoverageReturnMethodCall.test`: exists
- citations:
  - `CodeGen.java:6515` (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java): holds NamedType; reads: methodCall(method, (NamedType)receiverType, domain_type, range_type);
- in the old line, not in the new: `CodeGen.java:6236`, `comprises`
- every check passes

## Row 543, rewritten (1178 characters)
- lengths: row 1178 of 1,200, claim 266 of 300, notes 680 of 700
- reproducer `ProjectFortress/compiler_tests/XXXCoverageReturnGenericFamily.test`: exists
- citations:
  - `Functionals.scala:718` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): holds groundFamily; reads: val groundFamily = preCandidates.forall(pc => getStaticParams(pc.arrow).isEmpty)
- in the old line, not in the new: `Functionals.scala:688`, `explorations/compile-ladder/rung-return-type-rule/JUDGE.md`
- every check passes

## Row 559, rewritten (1194 characters)
- lengths: row 1194 of 1,200, claim 215 of 300, notes 694 of 700
- reproducer `ProjectFortress/compiler_tests/XXXCoverageReturnInferred.test`: exists
- citations:
  - `InstantiatingClassloader.java:2519` (ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java): words moved: xlationForGeneric at :280,2485,2490; reads: throw new Error("Unable to read serialized data for " + template_name + ", recommend you delete the Fortress bytecode cache and relink", e);
- in the old line, not in the new: `[\X extends Any\]`, `row 541`
- every check passes

## Row 612, rewritten (837 characters)
- lengths: row 837 of 1,200, claim 252 of 300, notes 376 of 700
- reproducer `ProjectFortress/tests/XXXInferAboveBoundMentionsParamWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:375` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java): words moved: instanceOf at :362,529,706; boundAtInstances at :399,481; reads: (rechecks == null || !rechecks.contains(tp)) && (t == null || t instanceof BottomType)) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:397-399` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java): words moved: instanceOf at :362,529,706; reads: if (!NodeUtil.isTypeParam(tp) || fixed.contains(n) || !rechecks.contains(tp) ||
- in the old line, not in the new: `row 588`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 540: row 540: rewritten (1141 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 543: row 543: rewritten (1178 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 559: row 559: rewritten (1194 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 612: row 612: rewritten (837 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 4 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 4 lines, 0 failing, every check passes.
