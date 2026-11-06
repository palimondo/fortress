# Mechanical check of c-run2-probe, the judge's files, base c124c6b65

## Row 850, rewritten (1033 characters)
- lengths: row 1033 of 1,200, claim 297 of 300, notes 585 of 700
- reproducer `none`: exists
- citations:
  - `scala_src/types/TypeAnalyzer.scala:541-555` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): holds checkP; reads: def checkP(s: TraitType, t: TraitType): CFormula = {
  - `scala_src/types/TypeAnalyzer.scala:547-551` (ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala): words moved: checkP at :541,556; reads: pOr((a1, a2).zipped.map{
  - `Papers/Variance/appendix.tex:203-206` (Papers/Variance/appendix.tex): no word to check; reads: \infrule
  - `lang.tex:393-397` (Papers/Variance/lang.tex): no word to check; reads: \infrule[Anc-Same-Trait]
- in the old line, not in the new: `:274-280`, `C[\Cat\]`, `C[\Dog\]`, `contravariant`, `covariant`, `explorations/reviews/popl2019-rules-map.md`, `object DC extends C[\DogCat\]`
- every check passes

## Row 465, rewritten (1066 characters)
- lengths: row 1066 of 1,200, claim 216 of 300, notes 687 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compile-ladder/rung-tabulate/probes/ComponentOnly.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `Library/FortressLibrary.fsi:1729-1730` (Library/FortressLibrary.fsi): no word to check; reads: opr[_:TrivialOpenRange, i1:ZZ32]: Array[\T,ZZ32\]
- in the old line, not in the new: `:2711`, `Library/FortressLibrary.fsi:1695-1732`, `Library/FortressLibrary.fss`, `Library/FortressLibrary.fss:2707`, `ProjectFortress/tests/VectorMatrixCastsWalk.fss`, `ProjectFortress/tests/VectorMatrixCastsWalk.fss:158-165`, `VectorMatrixCastsWalk`, `opr[_:TrivialOpenRange, i1:ZZ32]`, `opr[i0:ZZ32, _:TrivialOpenRange]`
- every check passes

## Row 789, rewritten (781 characters)
- lengths: row 781 of 1,200, claim 238 of 300, notes 370 of 700
- reproducer `none`: exists
- citations: none with lines
- in the old line, not in the new: `h(BoxOb, Ob[\ZZ32\])`, `h[\T\](x: Box[\T\], y: ZZ32)`
- every check passes

## Row 390, rewritten (1174 characters)
- lengths: row 1174 of 1,200, claim 272 of 300, notes 688 of 700
- reproducer `ProjectFortress/compiler_tests/XXXCoercionAnyOverloadRungC.test`: exists
- citations:
  - `scala_src/typechecker/impls/Functionals.scala:650` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala): no word to check; reads: def typedApplication(preCandidates: List[PreAppCandidate],
- in the old line, not in the new: `8dc1a74d9`, `CompilerBuiltin.fss`, `CompilerBuiltin.fss:883`, `IntLiteral`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:430-453`, `ZZ32`, `checkApplication`
- every check passes

## Row 23, rewritten (796 characters)
- lengths: row 796 of 1,200, claim 196 of 300, notes 466 of 700
- reproducer `none`: exists
- citations:
  - `explorations/fable-review-probes/RvwNatArray.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:576` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java): no word to check; reads: unificationError(val, env, errorMsg("Cannot unify ",
- in the old line, not in the new: `Cannot unify __DefaultVector[\RR64,3\] with ArrayType`
- every check passes

## Row 393, rewritten (945 characters)
- lengths: row 945 of 1,200, claim 196 of 300, notes 568 of 700
- reproducer `none`: exists
- citations:
  - `explorations/compile-ladder/rung-interp-coercion/probes/skeptic/SkCycle.fss`: not in the tree at the base (allowed for a probe the row says how to read from history)
- in the old line, not in the new: nothing
- every check passes

## Row 852, rewritten (1085 characters)
- lengths: row 1085 of 1,200, claim 243 of 300, notes 677 of 700
- reproducer `none`: exists
- citations:
  - `ExprDisambiguator.scala:837-841` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): no word to check; reads: private def extractParamNames(params: List[Param]): Set[Id] = {
  - `nodes/Id.java:54-72` (ProjectFortress/src/com/sun/fortress/nodes/Id.java): holds equals; reads: public boolean equals(Object obj) {
  - `ExprDisambiguator.scala:766-783` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): holds checkForShadowingVars, size - 2; reads: private def checkForShadowingVars(vars: Set[Id]) = {
  - `ExprDisambiguator.scala:776-777` (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala): words moved: checkForShadowingVars at :705,712,766; reads: for {i <- 0 until vars.size - 2
  - `Papers/Variance/lang.tex:168` (Papers/Variance/lang.tex): no word to check; reads: \mathit{distinct}(\rep{P})  \andalso
  - `Papers/Variance/lang.tex:187` (Papers/Variance/lang.tex): no word to check; reads: \mathit{distinct}(\bar{P})  \andalso
  - `Papers/Variance/lang.tex:211` (Papers/Variance/lang.tex): no word to check; reads: \mathit{distinct}(\bar{x})  \andalso
  - `Papers/Variance/lang.tex:215` (Papers/Variance/lang.tex): no word to check; reads: \mathit{distinct}(\bar{P},\bar{Q})  \andalso
  - `resolve.tex:10` (Papers/Variance/resolve.tex): no word to check; reads: { \mathit{distinct}\tupleb{x}  \andalso
- in the old line, not in the new: `explorations/reviews/popl2019-rules-map.md`, `f(x: ZZ32, x: ZZ32)`, `g[\T, T\](x: T)`
- every check passes

## Row 341, closed by c41c3d2b0, test none
- commit: c41c3d2b0 2026-11-05 Walk's load check reads a program's generic operators between an array and a number beside a self-typed group's own on their declared domai
- test: none
- every check passes

## Applied on copies of the ledger and its history (apply.py --keep-going)

    applied rewrite 850: row 850: rewritten (1033 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 465: row 465: rewritten (1066 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 789: row 789: rewritten (781 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 390: row 390: rewritten (1174 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 23: row 23: rewritten (796 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 393: row 393: rewritten (945 characters); its earlier line is in fortress-gap-ledger-history.md
    applied rewrite 852: row 852: rewritten (1085 characters); its earlier line is in fortress-gap-ledger-history.md
    applied close 341: row 341: FIXED by c41c3d2b0, test none; its earlier line is in fortress-gap-ledger-history.md
    apply.py: 8 applied, 0 already, 0 held

- ledger.py check on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

- ledger.py check --base c124c6b65 on the copies: exit 0
    ledger.py check: ledger.md, 903 rows, 0 fail the template

MECH: 8 lines, 0 failing, every check passes.
