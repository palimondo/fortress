# Mechanical check of c24, the judge's files, base c124c6b65

## Row 400, rewritten (1087 characters)
- lengths: row 1087 of 1,200, claim 295 of 300, notes 562 of 700
- reproducer `none`: exists
- citations:
  - `Functionals.scala:257` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): no word to check; reads: if (hasSizeInferenceVars(sargs) && !hasInferenceVars(resultArrow.getDomain))
  - `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2ArrowDomain.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `052a7c3fe`, `compile-ladder/rung-unknown-size-arm/REPORT.md`, `d65892d34`
- every check passes

## Row 446, rewritten (1125 characters)
- lengths: row 1125 of 1,200, claim 252 of 300, notes 674 of 700
- reproducer `none`: exists
- citations:
  - `MethodInstantiater.java:227` (ProjectFortress/src/com/sun/fortress/runtimeSystem/MethodInstantiater.java): holds = n; reads: BigInteger bi = new BigInteger(s.substring(1, s.length() - 1));
  - `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/SkDynZZ32Val.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `052a7c3fe`, `compile-ladder/rung-unknown-size-arm/REPORT.md`
- every check passes

## Row 682, rewritten (1166 characters)
- lengths: row 1166 of 1,200, claim 261 of 300, notes 681 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNatOpenOverloadChecker.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:287-300` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): no word to check; reads: // A trait whose comprises clause lists a type at where-clause sizes, as
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:285-298`
- every check passes

## Row 713, rewritten (1136 characters)
- lengths: row 1136 of 1,200, claim 283 of 300, notes 634 of 700
- reproducer `ProjectFortress/tests/OverloadTwoBoundsClosedTraitExclusionWalk.fss`: exists
- citations:
  - `OverloadedFunction.java:901` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: ruleFailure at :538,542,885; reads: " fails the Meet Rule: neither is found to be more specific than the other",
- in the old line, not in the new: `OverloadedFunction.java:835`
- every check passes

## Row 770, rewritten (1189 characters)
- lengths: row 1189 of 1,200, claim 282 of 300, notes 685 of 700
- reproducer `ProjectFortress/compiler_tests/XXXApiFunctionalMethodOfComprisedObject.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:139` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): words moved: toFunctionArrows at :96,110,116; reads: if (!onlyConcrete || !arrows.exists(isAbstract)) return arrows
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:140-162` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): words moved: toFunctionArrows at :96,110,116; reads: // each functional method's declaring trait or object, and the traits that it extends
- in the old line, not in the new: `:138-160`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:137`
- every check passes

## Row 786, rewritten (1166 characters)
- lengths: row 1166 of 1,200, claim 296 of 300, notes 663 of 700
- reproducer `ProjectFortress/tests/GenericPairExcludingWalk.fss`: exists
- citations:
  - `OverloadedFunction.java:1539` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: static private boolean mayBeEqual(FType x, FType y) {
- in the old line, not in the new: `OverloadedFunction.java:1420`
- every check passes

## Row 803, rewritten (1092 characters)
- lengths: row 1092 of 1,200, claim 293 of 300, notes 636 of 700
- reproducer `explorations/perf-probes/self-type-exclusion/REPORT.md`: exists
- citations:
  - `Formula.scala:282` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala): words moved: tImplies at :257,272,290; stackLevel at :306,309,310; reads: val pes = pe2.forall(e2 => pe1.exists(ta.lteq(e2, _)) || pu1.exists(t1 => primImp(p, ta.excludes(e2, t1))))
  - `Formula.scala:287-292` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala): words moved: pu1.exists(t1 => primImp(p, ta.excludes(e2, t1))) at :282; stackLevel at :306,309,310; reads: private def primImp(p: TPrimitive, c2: CFormula)(implicit ta: TypeAnalyzer): Boolean = c2 match {
  - `Formula.scala:308-314` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala): words moved: tImplies at :257,272,290; pu1.exists(t1 => primImp(p, ta.excludes(e2, t1))) at :282; reads: private def forall[S, T](as: Map[S, T], bs: Map[S,T], pred: (T, T) => Boolean, unit: T): Boolean = {
  - `TypeAnalyzer.scala:805` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): words moved: normConjunct at :778,788; reads: val l2 = l.filter(x => !isTrue(sub(a, x)))
- in the old line, not in the new: `TypeAnalyzer.scala:779`
- every check passes

## Row 894, rewritten (1144 characters)
- lengths: row 1144 of 1,200, claim 292 of 300, notes 635 of 700
- reproducer `ProjectFortress/tests/GenericInsideTraitMethodWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:413-424` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala): holds checkFancyRule; reads: private def checkFancyRule(name: IdOrOpOrAnonymousName,
- in the old line, not in the new: nothing
- every check passes

## Row 752, rewritten (1130 characters)
- lengths: row 1130 of 1,200, claim 298 of 300, notes 667 of 700
- reproducer `ProjectFortress/compiler_tests/XXXOpenTypeThroughSubtraitChecker.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:308-317` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): holds throughParent; reads: def throughParent(p: BaseType): CFormula = p match {
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:306-315`
- every check passes

## Row 893, rewritten (1031 characters)
- lengths: row 1031 of 1,200, claim 282 of 300, notes 548 of 700
- reproducer `ProjectFortress/tests/XXXSelfTypeExtenderOtherTypeWalk.fss`: exists
- citations:
  - `OverloadedFunction.java:845-867` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): holds selfTypeParameter; reads: static private FType selfTypeParameter(GenericFunctionalMethod m, List<FType> args, List<FType> d) {
  - `Specification/appendices/changes.tex:4105-4110` (Specification/appendices/changes.tex): no word to check; reads: exclude each other reads the \KWD{self} parameter of a functional method as
- in the old line, not in the new: `Specification/appendices/changes.tex:4105-4106`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 400: row 400: rewritten (1087 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 446: row 446: rewritten (1125 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 682: row 682: rewritten (1166 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 713: row 713: rewritten (1136 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 770: row 770: rewritten (1189 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 786: row 786: rewritten (1166 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 803: row 803: rewritten (1092 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 894: row 894: rewritten (1144 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 752: row 752: rewritten (1130 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 893: row 893: rewritten (1031 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 10 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 10 lines, 0 failing, every check passes.
