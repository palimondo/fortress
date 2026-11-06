# Mechanical check of r2, the judge's files, base aa6e4ebee

## Row 414, rewritten (1128 characters)
- lengths: row 1128 of 1,200, claim 289 of 300, notes 631 of 700
- reproducer `ProjectFortress/compiler_tests/XXXNatExtendsTwice.test`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:297` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds definitelyExcludes; reads: if ( new_analyzer.definitelyExcludes(st, other) )
- in the old line, not in the new: nothing
- every check passes

## Row 416, rewritten (1177 characters)
- lengths: row 1177 of 1,200, claim 280 of 300, notes 700 of 700
- reproducer `ProjectFortress/tests/XXXNatSizeExclusionWalk.fss`: exists
- citations:
  - `OverloadedFunction.java:589-604` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java): no word to check; reads: if (unrelated != -1) {
  - `FType.java:197-210` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java): no word to check; reads: public boolean excludesOther(FType other) {
  - `Library/RangeInternals.fss:125-172` (Library/RangeInternals.fss): no word to check; reads: checkSelection[\R extends Range[\ZZ32\]\]
- in the old line, not in the new: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:589-604`, `checkSelection2D`, `checkSelection3D`
- every check passes

## Row 510, rewritten (1178 characters)
- lengths: row 1178 of 1,200, claim 279 of 300, notes 615 of 700
- reproducer `ProjectFortress/tests/XXXInferExpectedTypeRungK.fss`: exists
- citations: none with lines
- in the old line, not in the new: nothing
- every check passes

## Row 489, rewritten (1146 characters)
- lengths: row 1146 of 1,200, claim 230 of 300, notes 694 of 700
- reproducer `ProjectFortress/compiler_tests/XXXComprisesGenericRenamed.test`: exists
- citations:
  - `TypeHierarchyChecker.scala:333` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds subst_comprises; reads: ! isEligibleToExtend(tt, subst_comprises, new_analyzer, errors, whereBounds) &&
  - `TypeHierarchyChecker.scala:327` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): holds subst_comprises; reads: val subst_comprises = comprises.map(c => atArgs(c).asInstanceOf[NamedType])
- in the old line, not in the new: nothing
- every check passes

## Row 371, rewritten (1145 characters)
- lengths: row 1145 of 1,200, claim 217 of 300, notes 696 of 700
- reproducer `none`: exists
- citations:
  - `ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:166-190` (ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java): holds TypeHierarchyChecker; reads: if (Shell.getTypeChecking() == true) {
  - `TypeHierarchyChecker.scala:298-300` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): words moved: TypeHierarchyChecker at :46; reads: error(errors, "Types " + st + " and " + other +
  - `TypeHierarchyChecker.scala:307-308` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala): words moved: TypeHierarchyChecker at :46; reads: error(errors, "Type " + tt + " excludes " + name +
  - `FTraitOrObject.java:236-251` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java): no word to check; reads: private static TopSortItemImpl<FType> visitTrait(FType t,
- in the old line, not in the new: `object O[\nat n\] extends { Vec[\n\], Vec[\3\] }`
- every check passes

## Row 293, rewritten (864 characters)
- lengths: row 864 of 1,200, claim 163 of 300, notes 559 of 700
- reproducer `none`: exists
- citations:
  - `Library/FortressLibrary.fsi:1647` (Library/FortressLibrary.fsi): no word to check; reads: excludes { AnyMultiplicativeRing }
  - `Library/FortressLibrary.fsi:1759` (Library/FortressLibrary.fsi): no word to check; reads: excludes { AnyMultiplicativeRing }
  - `explorations/run-c4/probes/vocabulary/v01c_matrix_times.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-c4/probes/vocabulary/v02_ring_excluded.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `explorations/run-c4/probes/vocabulary/v02b_ring_juxt.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: `** bug! MethodClosure +(…) … has neither body nor def instanceof Method`, `AdditiveGroup`, `h h`
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 414: row 414: rewritten (1128 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 416: row 416: rewritten (1177 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 510: row 510: rewritten (1178 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 489: row 489: rewritten (1146 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 371: row 371: rewritten (1145 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 293: row 293: rewritten (864 characters); its earlier line is in fortress-gap-ledger-history.md
    apply.py: 6 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base aa6e4ebee on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 6 lines, 0 failing, every check passes.
