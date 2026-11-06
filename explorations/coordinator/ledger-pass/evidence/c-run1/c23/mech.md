# Mechanical check of c23, the writer's files, base c124c6b65

## Row 542, rewritten (1070 characters)
- lengths: row 1070 of 1,200, claim 229 of 300, notes 527 of 700
- reproducer `ProjectFortress/compiler_tests/XXXOverloadReturnObjectDomain.fss`: exists
- citations:
  - `scala_src/overloading/OverloadingOracle.scala:83` (ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala): no word to check; reads: def satisfiesReturnTypeRule(x: ArrowType, y: ArrowType): Boolean =
  - `Papers/Types/overloading-check.tick:180` (Papers/Types/overloading-check.tick): holds Bottom; reads: for every instance $\arrowtype{U}{V}$ of $\sigma_{\wedge}$ with $U \not \equiv \Bottom$,
- in the old line, not in the new: `Papers/Types/overloading-check.tick:176-178`, `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:83`, `VerifyError: Bad return type`, `e2f1aa7e8`
- every check passes

## Row 566, rewritten (789 characters)
- lengths: row 789 of 1,200, claim 155 of 300, notes 383 of 700
- reproducer `ProjectFortress/compiler_tests/XXXComprisesMeetGenericTrait.test`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Row 573, rewritten (850 characters)
- lengths: row 850 of 1,200, claim 208 of 300, notes 396 of 700
- reproducer `ProjectFortress/compiler_tests/XXXFunctionalMethodOverloadSelfLast.test`: exists
- citations: none with lines
- in the old line, not in the new: `compile-ladder/rung-overloading-checker/SKEPTIC.md`
- every check passes

## Row 871, rewritten (1154 characters)
- lengths: row 1154 of 1,200, claim 298 of 300, notes 683 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Row 787, rewritten (975 characters)
- lengths: row 975 of 1,200, claim 296 of 300, notes 446 of 700
- reproducer `ProjectFortress/tests/XXXGenericPairWhereExcludesTogetherWalk.fss`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1013` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: genericMeetCovered at :956,978,1234; reads: if (NodeUtil.getWhereClause(f.getFnDecl()).isSome() || NodeUtil.getWhereClause(g.getFnDecl()).isSome()) {
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1238` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): words moved: genericMeetCovered at :956,978,1234; reads: if (NodeUtil.getWhereClause(f.getFnDecl()).isSome() || NodeUtil.getWhereClause(g.getFnDecl()).isSome()) {
- in the old line, not in the new: `:1158`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:943`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 542: row 542: rewritten (1070 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 566: row 566: rewritten (789 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 573: row 573: rewritten (850 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 871: row 871: rewritten (1154 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 787: row 787: rewritten (975 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 5 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 5 lines, 0 failing, every check passes.
