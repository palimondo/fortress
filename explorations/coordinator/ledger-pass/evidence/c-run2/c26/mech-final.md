# Mechanical check of c26, the judge's files, base c124c6b65

## Row 754, rewritten (947 characters)
- lengths: row 947 of 1,200, claim 291 of 300, notes 457 of 700
- reproducer `ProjectFortress/tests/XXXComprisesWhereBoundExtender.fss`: exists
- citations:
  - `BuildEnvironments.java:1463-1467` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java): holds named; reads: // A where-clause variable before the environment: a trait without
  - `BuildEnvironments.java:1513` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java): words moved: named at :1453,1458,1467; reads: if (x.wheres.contains(s)) return new Term(null, -1, WHERE_VARIABLE + s, Collections.<Term>emptyList());
- in the old line, not in the new: nothing
- every check passes

## Row 755, rewritten (1008 characters)
- lengths: row 1008 of 1,200, claim 292 of 300, notes 516 of 700
- reproducer `ProjectFortress/tests/XXXWhereVariableMemberWalk.fss`: exists
- citations:
  - `BuildTraitEnvironment.java:126` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildTraitEnvironment.java): no word to check; reads: protected void forFnDecl3(FnDecl x) {
  - `BuildTraitEnvironment.java:148` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildTraitEnvironment.java): no word to check; reads: fcn.finishInitializing();
  - `BuildEnvironments.java:943` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java): holds processWhereClauses; reads: private static EvalType processWhereClauses(WhereClause wheres, Environment interior) {
  - `BuildEnvironments.java:948-970` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java): words moved: processWhereClauses at :915,943,1040; reads: // { N[\n\] } where [\nat n\] lists N at every n.  A type where-clause
- in the old line, not in the new: `BuildEnvironments.java:948-970`, `BuildTraitEnvironment.java:148`
- every check passes

## Row 756, rewritten (1050 characters)
- lengths: row 1050 of 1,200, claim 272 of 300, notes 672 of 700
- reproducer `none`: exists
- citations:
  - `TypeAnalyzer.scala:1077` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): no word to check; reads: env.staticParam(x).getOrElse(bug(x, x + " is not in the kind env " + env)) }
  - `TypeAnalyzer.scala:208` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): no word to check; reads: val sParam = staticParam(id)
  - `Functionals.scala:458` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): words moved: bug at :18,1083; reads: if (isSubtype(getType(checked).get, paramType))
- in the old line, not in the new: nothing
- every check passes

## Row 777, rewritten (882 characters)
- lengths: row 882 of 1,200, claim 295 of 300, notes 396 of 700
- reproducer `ProjectFortress/tests/XXXWhereBoundDottedCallWalk.fss`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Row 805, rewritten (1109 characters)
- lengths: row 1109 of 1,200, claim 295 of 300, notes 674 of 700
- reproducer `none`: exists
- citations:
  - `Functionals.scala:452` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): words moved: checkApplicableWithoutInference at :169,442; reads: val newArgsAndErrors = zipWithDomain(args, arrow.getDomain).map {
  - `Functionals.scala:494` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): words moved: checkApplicableWithoutInference at :169,442; reads: if (isSubtype(argType,arrow.getDomain) && (newArgs.size == args.size))
  - `Functionals.scala:481` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): words moved: checkApplicableWithoutInference at :169,442; reads: case _:AnyType => (args, None)
- in the old line, not in the new: nothing
- every check passes

## Row 831, rewritten (1114 characters)
- lengths: row 1114 of 1,200, claim 263 of 300, notes 697 of 700
- reproducer `none`: exists
- citations:
  - `compiler/desugarer/CoercionLifter.scala:156` (ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionLifter.scala): words moved: CoercionLifter.makeLiftedCoercion at :82; reads: val returnType = t.getSelfType.getOrElse(bug("No self type on trait "+t))
  - `scala_src/disambiguator/SelfParamDisambiguator.scala:77-78` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala): words moved: TypeDisambiguator at :34,194; reads: val self_type = comprisesC match {
  - `compiler/Disambiguator.java:149` (ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java): words moved: TypeDisambiguator at :32,152,153; reads: Api liftedApi = (Api) lifter.liftCoercions(spdResult);
  - `compiler/Disambiguator.java:304` (ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java): words moved: TypeDisambiguator at :32,152,153; reads: Component liftedComp = (Component) lifter.liftCoercions(spdResult);
- in the old line, not in the new: `explorations/perf-probes/anyintegral-comprises-where/REPORT.md`, `row 17`
- every check passes

## Row 869, rewritten (837 characters)
- lengths: row 837 of 1,200, claim 245 of 300, notes 392 of 700
- reproducer `ProjectFortress/tests/XXXWhereVariableObjectWalk.fss`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Row 17, closed by 3924e7ec3, test none
- commit: 3924e7ec3 2026-09-26 The specification states instantiation exclusion, and its refused examples take the library's shapes
- test: none
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 754: row 754: rewritten (947 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 755: row 755: rewritten (1008 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 756: row 756: rewritten (1050 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 777: row 777: rewritten (882 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 805: row 805: rewritten (1109 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 831: row 831: rewritten (1114 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 869: row 869: rewritten (837 characters); its earlier line is in fortress-gap-ledger-history.md
    applied close 17: row 17: FIXED by 3924e7ec3, test none; its earlier line is in fortress-gap-ledger-history.md
    apply.py: 8 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 8 lines, 0 failing, every check passes.
